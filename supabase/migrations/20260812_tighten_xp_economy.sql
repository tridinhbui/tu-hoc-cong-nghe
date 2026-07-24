-- Tighten XP economy after adding more game/social reward surfaces.
-- Game XP should stay a small mastery bonus, not a shortcut around lesson
-- completion and real quiz performance. Existing rows above the cap are
-- normalized so historical leaderboards use the same economy as new writes.

update public.game_sessions
set xp_earned = least(greatest(coalesce(xp_earned, 0), 0), 50)
where xp_earned is distinct from least(greatest(coalesce(xp_earned, 0), 0), 50);

alter table public.game_sessions
  drop constraint if exists game_sessions_xp_earned_check;

alter table public.game_sessions
  add constraint game_sessions_xp_earned_check
  check (xp_earned >= 0 and xp_earned <= 50);

update public.user_quest_completions
set xp_earned = 0
where quest_type in ('daily_4', 'daily_game');

with ordered_quiz as (
  select
    id,
    xp_earned,
    coalesce(
      sum(xp_earned) over (
        partition by user_id, completed_at::date
        order by completed_at, id
        rows between unbounded preceding and 1 preceding
      ),
      0
    ) as prior_xp
  from public.user_quiz_sessions
),
quiz_cap as (
  select
    id,
    greatest(0, least(xp_earned, 30 - prior_xp))::int as capped_xp
  from ordered_quiz
)
update public.user_quiz_sessions q
set xp_earned = c.capped_xp
from quiz_cap c
where q.id = c.id
  and q.xp_earned is distinct from c.capped_xp;

create or replace function public.get_xp_leaderboard_since(p_since timestamptz, p_limit int default 10)
returns table(user_id uuid, name text, value numeric, avatar_url text)
language sql
security definer
set search_path = public
as $$
  with lessons as (
    select user_id, count(*) * 10 as xp
    from public.user_progress
    where completed = true and completed_at >= p_since
    group by user_id
  ),
  quiz as (
    select user_id, coalesce(sum(xp_earned), 0) as xp
    from public.user_quiz_sessions
    where completed_at >= p_since
    group by user_id
  ),
  game_best as (
    select distinct on (user_id, game_type)
      user_id,
      game_type,
      least(greatest(coalesce(xp_earned, 0), 0), 50) as xp_earned
    from public.game_sessions
    where created_at >= p_since
    order by user_id, game_type, xp_earned desc, created_at asc
  ),
  games as (
    select user_id, coalesce(sum(xp_earned), 0) as xp
    from game_best
    group by user_id
  ),
  totals as (
    select coalesce(l.user_id, q.user_id, g.user_id) as user_id,
           coalesce(l.xp, 0) + coalesce(q.xp, 0) + coalesce(g.xp, 0) as total_xp
    from lessons l
    full outer join quiz q on q.user_id = l.user_id
    full outer join games g on g.user_id = coalesce(l.user_id, q.user_id)
  )
  select t.user_id,
         coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
         t.total_xp::numeric as value,
         up.avatar_url
  from totals t
  join public.user_profiles up on up.id = t.user_id
  where t.total_xp > 0
    and coalesce(up.is_disabled, false) = false
    and coalesce(up.role, 'user') <> 'admin'
  order by t.total_xp desc
  limit greatest(1, least(coalesce(p_limit, 10), 50));
$$;

revoke all on function public.get_xp_leaderboard_since(timestamptz, int) from public;
grant execute on function public.get_xp_leaderboard_since(timestamptz, int) to authenticated;

create or replace function public.get_my_xp_rank_since(p_since timestamptz, p_user_id uuid)
returns table(rank bigint, value numeric)
language plpgsql
security definer
set search_path = public
as $$
declare
  my_value numeric;
begin
  with my_games as (
    select distinct on (game_type)
      game_type,
      least(greatest(coalesce(xp_earned, 0), 0), 50) as xp_earned
    from public.game_sessions
    where user_id = p_user_id and created_at >= p_since
    order by game_type, xp_earned desc, created_at asc
  )
  select coalesce(sum(x.total_xp), 0) into my_value
  from (
    select (select count(*) * 10 from public.user_progress where user_id = p_user_id and completed = true and completed_at >= p_since) as total_xp
    union all
    select coalesce((select sum(xp_earned) from public.user_quiz_sessions where user_id = p_user_id and completed_at >= p_since), 0)
    union all
    select coalesce((select sum(xp_earned) from my_games), 0)
  ) x;

  if my_value is null or my_value = 0 then return; end if;

  return query
    select (count(*) + 1)::bigint, my_value
    from (
      select coalesce(l.user_id, q.user_id, g.user_id) as user_id,
             coalesce(l.xp, 0) + coalesce(q.xp, 0) + coalesce(g.xp, 0) as total_xp
      from (
        select user_id, count(*) * 10 as xp
        from public.user_progress
        where completed = true and completed_at >= p_since
        group by user_id
      ) l
      full outer join (
        select user_id, coalesce(sum(xp_earned), 0) as xp
        from public.user_quiz_sessions
        where completed_at >= p_since
        group by user_id
      ) q on q.user_id = l.user_id
      full outer join (
        select user_id, coalesce(sum(xp_earned), 0) as xp
        from (
          select distinct on (user_id, game_type)
            user_id,
            game_type,
            least(greatest(coalesce(xp_earned, 0), 0), 50) as xp_earned
          from public.game_sessions
          where created_at >= p_since
          order by user_id, game_type, xp_earned desc, created_at asc
        ) best
        group by user_id
      ) g on g.user_id = coalesce(l.user_id, q.user_id)
      join public.user_profiles up on up.id = coalesce(l.user_id, q.user_id, g.user_id)
      where coalesce(up.is_disabled, false) = false
        and coalesce(up.role, 'user') <> 'admin'
    ) ranked
    where ranked.total_xp > my_value;
end;
$$;

revoke all on function public.get_my_xp_rank_since(timestamptz, uuid) from public;
grant execute on function public.get_my_xp_rank_since(timestamptz, uuid) to authenticated;
