-- Extends admin_resync_all_user_stats (20260722) to also convert any
-- eligible pending referral (referred user has >=1 completed lesson) and
-- include referral XP in the recomputed total - same formula as
-- lib/supabase-user.ts#recalculateUserStats and lib/admin/appeals.ts, now
-- with the "Mời bạn học cùng" bonus folded in everywhere total_xp gets
-- recomputed from scratch.
create or replace function public.admin_resync_all_user_stats()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  affected_count integer;
begin
  -- Convert every still-pending referral whose referred user already has a
  -- completed lesson, before computing anyone's XP below.
  update public.referrals r
  set status = 'rewarded', rewarded_at = now()
  where r.status = 'pending'
    and exists (
      select 1 from public.user_progress up
      where up.user_id = r.referred_id and up.completed = true
    );

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
  referral_agg as (
    select user_id, coalesce(sum(bonus), 0) as referral_xp
    from (
      select referrer_id as user_id, 50 as bonus from public.referrals where status = 'rewarded'
      union all
      select referred_id as user_id, 30 as bonus from public.referrals where status = 'rewarded'
    ) x
    group by user_id
  ),
  computed as (
    select
      up.id as user_id,
      coalesce(la.lessons_completed, 0) as lessons_completed,
      coalesce(la.avg_quiz_score, 0) as avg_quiz_score,
      coalesce(la.lessons_completed, 0) * 10
        + coalesce(qa.quiz_xp, 0)
        + coalesce(ga.game_xp, 0)
        + coalesce(ra.referral_xp, 0) as total_xp
    from public.user_profiles up
    left join lesson_agg la on la.user_id = up.id
    left join quiz_agg qa on qa.user_id = up.id
    left join game_agg ga on ga.user_id = up.id
    left join referral_agg ra on ra.user_id = up.id
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
        + coalesce(ga.game_xp, 0)
        + coalesce(ra.referral_xp, 0) as total_xp
    from public.user_profiles up
    left join lesson_agg la on la.user_id = up.id
    left join quiz_agg qa on qa.user_id = up.id
    left join game_agg ga on ga.user_id = up.id
    left join referral_agg ra on ra.user_id = up.id
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
