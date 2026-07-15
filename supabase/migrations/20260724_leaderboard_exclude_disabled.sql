-- get_leaderboard never excluded banned/disabled accounts (is_disabled,
-- set via /admin/users "Khóa tài khoản") - a disabled user still ranked on
-- every public leaderboard. Also excludes admins, who otherwise appear
-- oddly next to real learners on a leaderboard meant to celebrate students,
-- not staff. Neither total_xp/lessons_completed nor game_sessions XP are
-- affected by any of this - confirmed via grep that updateStreak() (and the
-- whole streak system) is only ever called from lesson completion, never
-- from a mini-game or quiz session, so playing games cannot put someone on
-- this leaderboard on its own.
drop function if exists public.get_leaderboard(text, int);

create or replace function public.get_leaderboard(p_metric text, p_limit int default 10)
returns table(user_id uuid, name text, value numeric, avatar_url text)
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_metric = 'streak' then
    return query
      select s.user_id,
             coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
             s.current_streak::numeric as value,
             up.avatar_url
      from public.user_streaks s
      join public.user_profiles up on up.id = s.user_id
      where coalesce(up.is_disabled, false) = false
        and coalesce(up.role, 'user') <> 'admin'
      order by s.current_streak desc
      limit p_limit;
  else
    return query
      select us.user_id,
             coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
             (case p_metric
                when 'lessons' then us.total_lessons_completed
                when 'avg_score' then us.avg_quiz_score
                else us.total_xp
              end)::numeric as value,
             up.avatar_url
      from public.user_stats us
      join public.user_profiles up on up.id = us.user_id
      where coalesce(up.is_disabled, false) = false
        and coalesce(up.role, 'user') <> 'admin'
      order by value desc
      limit p_limit;
  end if;
end;
$$;

grant execute on function public.get_leaderboard(text, int) to authenticated;
