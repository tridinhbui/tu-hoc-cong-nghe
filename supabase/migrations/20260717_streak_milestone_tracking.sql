-- Tracks the highest streak milestone (7/14/21/28) a user has already been
-- congratulated for, so the milestone cron (app/api/cron/send-streak-
-- milestones) never sends the same "chúc mừng 7 ngày" DM twice.
alter table public.user_streaks
  add column if not exists last_milestone_notified integer not null default 0;
