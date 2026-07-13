-- Adds avatar_url to the leaderboard RPC's output so Leaderboard.tsx can
-- show each learner's avatar instead of just initials. Replaces the
-- function from 20260711_leaderboard_rpc.sql with the same
-- SECURITY DEFINER reasoning (user_profiles' RLS only allows
-- `auth.uid() = id`, so a plain client join would drop every row but the
-- caller's own).

-- CREATE OR REPLACE can't change a function's return columns (Postgres
-- error 42P13: "Row type defined by OUT parameters is different") - must
-- drop the old 3-column version before creating the new 4-column one.
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
      order by value desc
      limit p_limit;
  end if;
end;
$$;

grant execute on function public.get_leaderboard(text, int) to authenticated;
