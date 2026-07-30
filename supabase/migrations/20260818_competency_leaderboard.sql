-- Leaderboards scoped to a "năng lực tài chính" (financial competency) from
-- lib/career-competency.ts, e.g. Valuation or CFA readiness. Ranked by count
-- of completed lessons whose id is in the competency's lesson set (the same
-- simple metric get_track_leaderboard uses), not the full weighted
-- computeCompetencyScores formula - that formula also folds in quiz/mock
-- interview signals and only ever runs for the current user, so replaying it
-- in SQL to rank every user would duplicate and risk drifting from the
-- client-side scoring logic. The lesson-id set is passed in by the caller
-- (lib/competency-leaderboard.ts) rather than duplicated here, mirroring how
-- get_track_leaderboard's day ranges are the only place that owns track
-- membership.

create or replace function public.get_competency_leaderboard(p_lesson_ids bigint[], p_limit int default 10)
returns table(user_id uuid, name text, value numeric, avatar_url text)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
    select up.user_id,
           coalesce(nullif(prof.full_name, ''), split_part(prof.email, '@', 1), 'Người học') as name,
           count(*)::numeric as value,
           prof.avatar_url
    from public.user_progress up
    join public.user_profiles prof on prof.id = up.user_id
    where up.completed = true
      and up.lesson_id = any(p_lesson_ids)
      and coalesce(prof.is_disabled, false) = false
      and coalesce(prof.role, 'user') <> 'admin'
    group by up.user_id, prof.full_name, prof.email, prof.avatar_url
    order by value desc
    limit greatest(1, least(coalesce(p_limit, 10), 50));
end;
$$;

revoke all on function public.get_competency_leaderboard(bigint[], int) from public;
grant execute on function public.get_competency_leaderboard(bigint[], int) to authenticated;

create or replace function public.get_my_competency_leaderboard_rank(p_lesson_ids bigint[], p_user_id uuid)
returns table(rank bigint, value numeric)
language plpgsql
security definer
set search_path = public
as $$
declare
  my_value numeric;
begin
  select count(*) into my_value
  from public.user_progress up
  join public.user_profiles prof on prof.id = up.user_id
  where up.user_id = p_user_id
    and up.completed = true
    and up.lesson_id = any(p_lesson_ids)
    and coalesce(prof.is_disabled, false) = false
    and coalesce(prof.role, 'user') <> 'admin';

  if my_value is null or my_value = 0 then return; end if;

  return query
    select (count(*) + 1)::bigint, my_value
    from (
      select up.user_id, count(*) as cnt
      from public.user_progress up
      join public.user_profiles prof on prof.id = up.user_id
      where up.completed = true
        and up.lesson_id = any(p_lesson_ids)
        and coalesce(prof.is_disabled, false) = false
        and coalesce(prof.role, 'user') <> 'admin'
      group by up.user_id
    ) ranked
    where ranked.cnt > my_value;
end;
$$;

revoke all on function public.get_my_competency_leaderboard_rank(bigint[], uuid) from public;
grant execute on function public.get_my_competency_leaderboard_rank(bigint[], uuid) to authenticated;
