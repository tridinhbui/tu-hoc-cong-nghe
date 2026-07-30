-- Opt-in for the 7:30 "10 câu buổi sáng" push
-- (app/api/cron/morning-review). Two new columns on the existing
-- notification_preferences row rather than a table of its own - it is the
-- same shape as the evening reminder the table was built for.
--
-- Kept SEPARATE from browser_reminders_enabled / last_reminder_sent_at on
-- purpose. Those belong to the 19:00 streak reminder; sharing either column
-- would mean the two jobs suppress each other through the shared cooldown,
-- and would silently opt every existing streak-reminder subscriber into a
-- second daily notification they never asked for. Push permission is easy
-- to lose and hard to win back, so this defaults to false and has to be
-- turned on from Settings.

alter table public.notification_preferences
  add column if not exists morning_review_enabled boolean not null default false;

alter table public.notification_preferences
  add column if not exists last_morning_review_sent_at timestamp with time zone;

-- Lets the cron pull only the opted-in rows instead of scanning the table.
create index if not exists notification_preferences_morning_review_idx
  on public.notification_preferences(user_id)
  where morning_review_enabled = true;

comment on column public.notification_preferences.morning_review_enabled is
  'Opt-in for the 7:30 interleaved review push. Independent of browser_reminders_enabled (19:00 streak reminder).';
comment on column public.notification_preferences.last_morning_review_sent_at is
  'Written by app/api/cron/morning-review to enforce at most one send per day.';
