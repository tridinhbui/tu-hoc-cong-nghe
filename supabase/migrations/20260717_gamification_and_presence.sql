-- Combined migration: level expansion (L7/L8), streak freezes, streak
-- milestone DM tracking, and "online now" presence. Merges what were
-- previously 4 separate files (20260717_level_expansion_l7_l8.sql,
-- 20260717_streak_freezes.sql, 20260717_streak_milestone_tracking.sql,
-- 20260717_user_presence.sql) into one for easier one-shot application.

-- ============================================================================
-- 1) Level expansion: lib/levels.ts raised L5 (1000->1200) and L6
--    (1500->2000) XP thresholds and added two new tiers (L7 "Chuyên gia Tài
--    chính" 3200xp, L8 "Bậc thầy Tài chính" 5000xp). get_level_stats
--    hardcodes the old 6-level XP bucket ranges, so it must be updated in
--    lockstep or the level roadmap's per-level user counts would silently
--    stop matching what lib/levels.ts (and thus every level-up check)
--    actually computes.
-- ============================================================================

drop function if exists public.get_level_stats(uuid);

create or replace function public.get_level_stats(p_user_id uuid default null)
returns table(level int, user_count bigint, total_users bigint, my_rank bigint, top_users jsonb)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_total bigint;
  v_rank bigint;
begin
  select count(*) into v_total from public.user_stats;

  if p_user_id is not null then
    select count(*) + 1 into v_rank
    from public.user_stats
    where total_xp > coalesce((select total_xp from public.user_stats where user_id = p_user_id), -1);
  end if;

  return query
    select lvl.level,
           count(us.user_id) as user_count,
           v_total as total_users,
           v_rank as my_rank,
           coalesce((
             select jsonb_agg(t.* order by t.xp desc)
             from (
               select
                 coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
                 up.avatar_url,
                 us2.total_xp as xp
               from public.user_stats us2
               join public.user_profiles up on up.id = us2.user_id
               where us2.total_xp between lvl.min_xp and lvl.max_xp
               order by us2.total_xp desc
               limit 5
             ) t
           ), '[]'::jsonb) as top_users
    from (values
      (1, 0, 99),
      (2, 100, 299),
      (3, 300, 599),
      (4, 600, 1199),
      (5, 1200, 1999),
      (6, 2000, 3199),
      (7, 3200, 4999),
      (8, 5000, 999999999)
    ) as lvl(level, min_xp, max_xp)
    left join public.user_stats us on us.total_xp between lvl.min_xp and lvl.max_xp
    group by lvl.level, lvl.min_xp, lvl.max_xp, v_total, v_rank
    order by lvl.level;
end;
$$;

grant execute on function public.get_level_stats(uuid) to authenticated;

-- ============================================================================
-- 2) Streak freeze: a user who misses a day no longer has their streak
--    reset to 1 immediately - they get up to 3 lifetime "freezes" that
--    silently absorb a missed day (streak count stays put, the gap is
--    forgiven). Streak still resets to 1 once freezes_used reaches 3 and
--    another gap happens. See lib/supabase-streak.ts updateStreak().
-- ============================================================================

alter table public.user_streaks
  add column if not exists freezes_used integer not null default 0;

-- ============================================================================
-- 3) Streak milestone DM tracking: records the highest streak milestone
--    (7/14/21/28) a user has already been congratulated for, so the
--    milestone cron (app/api/cron/send-streak-milestones) never sends the
--    same "chúc mừng 7 ngày" DM twice.
-- ============================================================================

alter table public.user_streaks
  add column if not exists last_milestone_notified integer not null default 0;

-- ============================================================================
-- 4) "Online now" presence: a lightweight heartbeat (lib/presence.ts,
--    fired every ~60s while the app is open) bumps last_seen_at for the
--    current user - anyone whose last_seen_at is within the last 5 minutes
--    counts as online.
-- ============================================================================

alter table public.user_profiles
  add column if not exists last_seen_at timestamp with time zone;

create index if not exists user_profiles_last_seen_idx on public.user_profiles(last_seen_at);

-- user_profiles' SELECT policy only allows auth.uid() = id (see base
-- schema), so listing OTHER users who are online needs a security-definer
-- RPC - same pattern as get_level_stats/get_game_leaderboard, which only
-- return derived/aggregate fields, never raw cross-user row access.
create or replace function public.get_online_users(p_limit int default 12)
returns table (user_id uuid, name text, avatar_url text, last_seen_at timestamp with time zone)
language sql
security definer
set search_path = public
as $$
  select
    up.id as user_id,
    coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
    up.avatar_url,
    up.last_seen_at
  from public.user_profiles up
  where up.last_seen_at > now() - interval '5 minutes'
  order by up.last_seen_at desc
  limit p_limit;
$$;

grant execute on function public.get_online_users(int) to authenticated;

create or replace function public.get_online_count()
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*) from public.user_profiles where last_seen_at > now() - interval '5 minutes';
$$;

grant execute on function public.get_online_count() to authenticated;
