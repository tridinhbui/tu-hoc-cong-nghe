-- Expands the leaderboard system for a dedicated multi-type leaderboard
-- section inside /analytics (components/analytics/LeaderboardSection.tsx),
-- beyond the 5 metrics the compact dashboard widget (components/Leaderboard.tsx)
-- already covers.

-- 1. get_leaderboard: add a 'badges' branch. user_badges has no insert path
-- anywhere in the codebase (confirmed unpopulated/unreliable), so this is a
-- cheap deterministic proxy: level badges only, mirroring
-- lib/badges.ts's LEVEL_BADGE_DEFINITIONS (levels 2-6 -> up to 5 badges).
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
      limit greatest(1, least(coalesce(p_limit, 10), 50));
  elsif p_metric = 'badges' then
    return query
      select up.id,
             coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
             greatest(0, least(coalesce(up.current_level, 1) - 1, 5))::numeric as value,
             up.avatar_url
      from public.user_profiles up
      where coalesce(up.is_disabled, false) = false
        and coalesce(up.role, 'user') <> 'admin'
      order by value desc
      limit greatest(1, least(coalesce(p_limit, 10), 50));
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
      limit greatest(1, least(coalesce(p_limit, 10), 50));
  end if;
end;
$$;

revoke all on function public.get_leaderboard(text, int) from public;
grant execute on function public.get_leaderboard(text, int) to authenticated;
grant execute on function public.get_leaderboard(text, int) to anon;

-- 2. get_my_leaderboard_rank: add the 'badges' branch, and close the gap
-- where this function never got the disabled/admin exclusion that
-- get_leaderboard got in 20260724_leaderboard_exclude_disabled.sql - without
-- it, rank and list could disagree (e.g. a disabled user's rank counted
-- against everyone else even though they never appear in the list).
drop function if exists public.get_my_leaderboard_rank(text, uuid);

create or replace function public.get_my_leaderboard_rank(p_metric text, p_user_id uuid)
returns table(rank bigint, value numeric)
language plpgsql
security definer
set search_path = public
as $$
declare
  my_value numeric;
begin
  if p_metric = 'streak' then
    select s.current_streak into my_value
    from public.user_streaks s
    join public.user_profiles up on up.id = s.user_id
    where s.user_id = p_user_id
      and coalesce(up.is_disabled, false) = false
      and coalesce(up.role, 'user') <> 'admin';
    if my_value is null then return; end if;
    return query
      select (count(*) + 1)::bigint, my_value
      from public.user_streaks s
      join public.user_profiles up on up.id = s.user_id
      where s.current_streak > my_value
        and coalesce(up.is_disabled, false) = false
        and coalesce(up.role, 'user') <> 'admin';
  elsif p_metric = 'badges' then
    select greatest(0, least(coalesce(up.current_level, 1) - 1, 5))::numeric into my_value
    from public.user_profiles up
    where up.id = p_user_id
      and coalesce(up.is_disabled, false) = false
      and coalesce(up.role, 'user') <> 'admin';
    if my_value is null then return; end if;
    return query
      select (count(*) + 1)::bigint, my_value
      from public.user_profiles up
      where greatest(0, least(coalesce(up.current_level, 1) - 1, 5)) > my_value
        and coalesce(up.is_disabled, false) = false
        and coalesce(up.role, 'user') <> 'admin';
  else
    select (case p_metric
              when 'lessons' then us.total_lessons_completed
              when 'avg_score' then us.avg_quiz_score
              else us.total_xp
            end)::numeric into my_value
    from public.user_stats us
    join public.user_profiles up on up.id = us.user_id
    where us.user_id = p_user_id
      and coalesce(up.is_disabled, false) = false
      and coalesce(up.role, 'user') <> 'admin';
    if my_value is null then return; end if;
    return query
      select (count(*) + 1)::bigint, my_value
      from public.user_stats us
      join public.user_profiles up on up.id = us.user_id
      where (case p_metric
               when 'lessons' then us.total_lessons_completed
               when 'avg_score' then us.avg_quiz_score
               else us.total_xp
             end) > my_value
        and coalesce(up.is_disabled, false) = false
        and coalesce(up.role, 'user') <> 'admin';
  end if;
end;
$$;

revoke all on function public.get_my_leaderboard_rank(text, uuid) from public;
grant execute on function public.get_my_leaderboard_rank(text, uuid) to authenticated;

-- 3. Track leaderboards: ranks by completed user_progress rows whose
-- lesson_id falls in a track's day ranges. Scoped to 'personal' and
-- 'professional' only - both are clean contiguous id ranges (see
-- lib/track-stages.ts). CFA is deliberately excluded: its lesson-id list
-- (lib/cfa-track.ts) is a large hand-curated per-subject list with no
-- shared source of truth against SQL, and its mapped lessons already
-- overlap personal/professional content - a separate CFA rank would be
-- redundant and a sync-drift risk.
create or replace function public.get_track_leaderboard(p_track text, p_limit int default 10)
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
      and coalesce(prof.is_disabled, false) = false
      and coalesce(prof.role, 'user') <> 'admin'
      and (
        (p_track = 'personal' and (up.lesson_id between 1 and 20 or up.lesson_id between 201 and 288))
        or
        (p_track = 'professional' and (up.lesson_id between 21 and 200 or up.lesson_id = 1036))
      )
    group by up.user_id, prof.full_name, prof.email, prof.avatar_url
    order by value desc
    limit greatest(1, least(coalesce(p_limit, 10), 50));
end;
$$;

revoke all on function public.get_track_leaderboard(text, int) from public;
grant execute on function public.get_track_leaderboard(text, int) to authenticated;

create or replace function public.get_my_track_leaderboard_rank(p_track text, p_user_id uuid)
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
    and coalesce(prof.is_disabled, false) = false
    and coalesce(prof.role, 'user') <> 'admin'
    and (
      (p_track = 'personal' and (up.lesson_id between 1 and 20 or up.lesson_id between 201 and 288))
      or
      (p_track = 'professional' and (up.lesson_id between 21 and 200 or up.lesson_id = 1036))
    );

  if my_value is null or my_value = 0 then return; end if;

  return query
    select (count(*) + 1)::bigint, my_value
    from (
      select up.user_id, count(*) as cnt
      from public.user_progress up
      join public.user_profiles prof on prof.id = up.user_id
      where up.completed = true
        and coalesce(prof.is_disabled, false) = false
        and coalesce(prof.role, 'user') <> 'admin'
        and (
          (p_track = 'personal' and (up.lesson_id between 1 and 20 or up.lesson_id between 201 and 288))
          or
          (p_track = 'professional' and (up.lesson_id between 21 and 200 or up.lesson_id = 1036))
        )
      group by up.user_id
    ) ranked
    where ranked.cnt > my_value;
end;
$$;

revoke all on function public.get_my_track_leaderboard_rank(text, uuid) from public;
grant execute on function public.get_my_track_leaderboard_rank(text, uuid) to authenticated;

-- 4. XP-since leaderboards: same computation
-- app/api/cron/send-weekly-digest/route.ts's getWeeklyStats already does
-- client-side per-user (lessons*10 + quiz xp_earned + game xp_earned,
-- filtered by completed_at/created_at >= p_since), moved server-side and
-- grouped across all users. Client passes now() - interval '7 days' for
-- weekly or '30 days' for monthly - one function, two call sites.
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
  games as (
    select user_id, coalesce(sum(xp_earned), 0) as xp
    from public.game_sessions
    where created_at >= p_since
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
  select coalesce(sum(x.total_xp), 0) into my_value
  from (
    select (select count(*) * 10 from public.user_progress where user_id = p_user_id and completed = true and completed_at >= p_since) as total_xp
    union all
    select coalesce((select sum(xp_earned) from public.user_quiz_sessions where user_id = p_user_id and completed_at >= p_since), 0)
    union all
    select coalesce((select sum(xp_earned) from public.game_sessions where user_id = p_user_id and created_at >= p_since), 0)
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
        from public.game_sessions
        where created_at >= p_since
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

-- 5. Friends leaderboard: same metric-resolution CASE as get_leaderboard,
-- scoped to accepted friendships instead of everyone. No separate "my rank"
-- needed - friend lists are small enough the caller's own row is just
-- visible in the same result.
create or replace function public.get_friends_leaderboard(p_metric text)
returns table(user_id uuid, name text, value numeric, avatar_url text)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
    with friend_ids as (
      select case when user_a = auth.uid() then user_b else user_a end as friend_id
      from public.user_friendships
      where status = 'accepted' and (user_a = auth.uid() or user_b = auth.uid())
      union
      select auth.uid()
    )
    select up.id,
           coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
           (case p_metric
              when 'lessons' then coalesce(us.total_lessons_completed, 0)
              when 'avg_score' then coalesce(us.avg_quiz_score, 0)
              when 'streak' then coalesce(st.current_streak, 0)
              when 'badges' then greatest(0, least(coalesce(up.current_level, 1) - 1, 5))
              else coalesce(us.total_xp, 0)
            end)::numeric as value,
           up.avatar_url
    from friend_ids f
    join public.user_profiles up on up.id = f.friend_id
    left join public.user_stats us on us.user_id = up.id
    left join public.user_streaks st on st.user_id = up.id
    where coalesce(up.is_disabled, false) = false
      and coalesce(up.role, 'user') <> 'admin'
    order by value desc;
end;
$$;

revoke all on function public.get_friends_leaderboard(text) from public;
grant execute on function public.get_friends_leaderboard(text) to authenticated;
