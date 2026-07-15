-- Opt-in weekly email digest (lessons/XP this week + current streak),
-- separate toggle and cooldown timestamp from the daily
-- email_reminders_enabled since it's a different cadence/content.
alter table public.notification_preferences
  add column if not exists weekly_digest_enabled boolean not null default false;
alter table public.notification_preferences
  add column if not exists last_weekly_digest_sent_at timestamp with time zone;
