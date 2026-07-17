-- Streak freeze: a user who misses a day no longer has their streak reset
-- to 1 immediately - they get up to 3 lifetime "freezes" that silently
-- absorb a missed day (streak count stays put, the gap is forgiven).
-- Streak still resets to 1 once freezes_used reaches 3 and another gap
-- happens. See lib/supabase-streak.ts updateStreak().
alter table public.user_streaks
  add column if not exists freezes_used integer not null default 0;
