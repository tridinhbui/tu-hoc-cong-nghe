-- user_chests.source's check constraint only allowed 'weekly_quest' and
-- 'milestone_exam' (20260731_user_chests.sql), but lib/chests.ts's
-- ChestSource type and claimDailyLoginChest() were later extended with a
-- third source, 'daily_login', without a matching migration. Every insert
-- with source='daily_login' has been silently failing the check constraint
-- (23514) ever since - earnChest() only logs the error, so
-- claimDailyLoginChest() always returned true (nothing was ever actually
-- persisted), and the "already claimed today" lookup that gates the toast
-- always came up empty on the next reload, showing the reward toast again
-- and again instead of just once per day.
alter table public.user_chests drop constraint if exists user_chests_source_check;
alter table public.user_chests add constraint user_chests_source_check
  check (source in ('weekly_quest', 'milestone_exam', 'daily_login'));
