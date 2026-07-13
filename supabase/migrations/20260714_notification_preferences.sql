-- Notification preferences (opt-in email reminders) - lets learners choose
-- whether they want an email nudge when they're about to lose their streak
-- or have a spaced-repetition review due. Single row per user, upserted from
-- the Settings page. `last_reminder_sent_at` is written by the reminder cron
-- job (app/api/cron/send-reminders) to avoid sending more than once a day.

create table if not exists public.notification_preferences (
  user_id uuid primary key references public.user_profiles(id) on delete cascade,
  email_reminders_enabled boolean not null default false,
  browser_reminders_enabled boolean not null default false,
  last_reminder_sent_at timestamp with time zone,
  updated_at timestamp with time zone not null default now()
);

alter table public.notification_preferences enable row level security;

drop policy if exists "Users can view their own notification preferences" on public.notification_preferences;
create policy "Users can view their own notification preferences"
  on public.notification_preferences for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can upsert their own notification preferences" on public.notification_preferences;
create policy "Users can upsert their own notification preferences"
  on public.notification_preferences for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own notification preferences" on public.notification_preferences;
create policy "Users can update their own notification preferences"
  on public.notification_preferences for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select, insert, update on public.notification_preferences to authenticated;
