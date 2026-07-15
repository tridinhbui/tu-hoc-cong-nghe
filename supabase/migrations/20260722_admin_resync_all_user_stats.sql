-- One-shot bulk backfill: recompute lessons_completed/total_xp/current_level/
-- avg_quiz_score for EVERY user in one set-based pass, using the exact same
-- formula as lib/supabase-user.ts#recalculateUserStats (lessons*10 + quiz XP
-- + best-per-game-type XP). Exists because the per-user self-heal (recompute
-- on dashboard/profile load) only fixes an account the next time that person
-- logs in - this lets an admin fix everyone who's already affected right
-- now, in one call, instead of waiting for each of them to visit again.
--
-- service_role only (never authenticated) - this rewrites every user's XP,
-- not just the caller's own, so it must only run from the admin server
-- action via the service-role client, same trust boundary as every other
-- admin.* RPC in this project.
create or replace function public.admin_resync_all_user_stats()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  affected_count integer;
begin
  with lesson_agg as (
    select user_id, count(*) as lessons_completed,
           avg(quiz_score) filter (where quiz_score is not null) as avg_quiz_score
    from public.user_progress
    where completed = true
    group by user_id
  ),
  quiz_agg as (
    select user_id, coalesce(sum(xp_earned), 0) as quiz_xp
    from public.user_quiz_sessions
    group by user_id
  ),
  game_best as (
    select distinct on (user_id, game_type) user_id, game_type, xp_earned
    from public.game_sessions
    order by user_id, game_type, xp_earned desc, created_at asc
  ),
  game_agg as (
    select user_id, coalesce(sum(xp_earned), 0) as game_xp
    from game_best
    group by user_id
  ),
  computed as (
    select
      up.id as user_id,
      coalesce(la.lessons_completed, 0) as lessons_completed,
      coalesce(la.avg_quiz_score, 0) as avg_quiz_score,
      coalesce(la.lessons_completed, 0) * 10
        + coalesce(qa.quiz_xp, 0)
        + coalesce(ga.game_xp, 0) as total_xp
    from public.user_profiles up
    left join lesson_agg la on la.user_id = up.id
    left join quiz_agg qa on qa.user_id = up.id
    left join game_agg ga on ga.user_id = up.id
  ),
  updated_profiles as (
    update public.user_profiles up
    set
      lessons_completed = c.lessons_completed,
      total_xp = c.total_xp,
      current_level = floor(c.total_xp / 150) + 1,
      avg_quiz_score = round(c.avg_quiz_score::numeric, 2)
    from computed c
    where c.user_id = up.id
      and (
        up.lessons_completed is distinct from c.lessons_completed
        or up.total_xp is distinct from c.total_xp
        or up.current_level is distinct from floor(c.total_xp / 150) + 1
      )
    returning up.id
  )
  select count(*) into affected_count from updated_profiles;

  -- user_stats mirrors user_profiles - upsert every computed row (cheap,
  -- table is small relative to user_profiles) so it never lags behind.
  insert into public.user_stats (user_id, total_lessons_completed, total_xp, current_level, avg_quiz_score)
  select
    c.user_id,
    c.lessons_completed,
    c.total_xp,
    floor(c.total_xp / 150) + 1,
    round(c.avg_quiz_score::numeric, 2)
  from (
    select
      up.id as user_id,
      coalesce(la.lessons_completed, 0) as lessons_completed,
      coalesce(la.avg_quiz_score, 0) as avg_quiz_score,
      coalesce(la.lessons_completed, 0) * 10
        + coalesce(qa.quiz_xp, 0)
        + coalesce(ga.game_xp, 0) as total_xp
    from public.user_profiles up
    left join lesson_agg la on la.user_id = up.id
    left join quiz_agg qa on qa.user_id = up.id
    left join game_agg ga on ga.user_id = up.id
  ) c
  on conflict (user_id) do update set
    total_lessons_completed = excluded.total_lessons_completed,
    total_xp = excluded.total_xp,
    current_level = excluded.current_level,
    avg_quiz_score = excluded.avg_quiz_score;

  return affected_count;
end;
$$;

revoke all on function public.admin_resync_all_user_stats() from public, anon, authenticated;
grant execute on function public.admin_resync_all_user_stats() to service_role;
