-- Same gap as get_leaderboard (see 20260724_leaderboard_exclude_disabled.sql):
-- neither the per-game nor the combined game leaderboard RPCs excluded
-- disabled/admin accounts.
drop function if exists public.get_game_leaderboard(text, int);

create or replace function public.get_game_leaderboard(p_game_type text, p_limit int default 10)
returns table(user_id uuid, name text, avatar_url text, best_score integer, best_total integer, played_at timestamp with time zone)
language sql
security definer
set search_path = public
as $$
  select
    best.user_id,
    coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
    up.avatar_url,
    best.best_score,
    best.best_total,
    best.played_at
  from (
    select distinct on (user_id)
      user_id, score as best_score, total as best_total, created_at as played_at
    from public.game_sessions
    where game_type = p_game_type
    order by user_id, score desc, created_at asc
  ) best
  join public.user_profiles up on up.id = best.user_id
  where coalesce(up.is_disabled, false) = false
    and coalesce(up.role, 'user') <> 'admin'
  order by best.best_score desc, best.played_at asc
  limit greatest(1, least(coalesce(p_limit, 10), 50));
$$;

grant execute on function public.get_game_leaderboard(text, int) to authenticated;

drop function if exists public.get_combined_game_leaderboard(int);

create or replace function public.get_combined_game_leaderboard(p_limit int default 10)
returns table(user_id uuid, name text, avatar_url text, total_xp integer, games_played integer, last_played_at timestamp with time zone)
language sql
security definer
set search_path = public
as $$
  select
    best.user_id,
    coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
    up.avatar_url,
    sum(best.best_xp)::int as total_xp,
    count(*)::int as games_played,
    max(best.played_at) as last_played_at
  from (
    select distinct on (user_id, game_type)
      user_id, game_type, xp_earned as best_xp, created_at as played_at
    from public.game_sessions
    order by user_id, game_type, xp_earned desc, created_at asc
  ) best
  join public.user_profiles up on up.id = best.user_id
  where coalesce(up.is_disabled, false) = false
    and coalesce(up.role, 'user') <> 'admin'
  group by best.user_id, up.full_name, up.email, up.avatar_url
  having sum(best.best_xp) > 0
  order by total_xp desc, last_played_at asc
  limit greatest(1, least(coalesce(p_limit, 10), 50));
$$;

revoke all on function public.get_combined_game_leaderboard(int) from public;
grant execute on function public.get_combined_game_leaderboard(int) to authenticated;
