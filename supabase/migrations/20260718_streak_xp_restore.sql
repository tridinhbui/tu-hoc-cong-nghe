-- Streak XP buy-back: once a user has used all 3 free freezes (see
-- 20260717_gamification_and_presence.sql) and their streak actually
-- resets, they can spend XP to restore it instead.
--
-- xp_spent is a permanent ledger subtracted from the derived total_xp on
-- every recalculateUserStats() call (lib/supabase-user.ts) - total_xp
-- itself is always recomputed from scratch from lessons/quiz/games/etc, so
-- a plain "subtract once" would be silently undone the next time any XP-
-- earning action ran recalculateUserStats again.
alter table public.user_stats
  add column if not exists xp_spent integer not null default 0;

-- Remembers the streak count right before it was reset to 1, so it can be
-- offered back for restoration. Cleared once restored or once the user
-- starts actively rebuilding a new streak.
alter table public.user_streaks
  add column if not exists last_streak_before_break integer;
