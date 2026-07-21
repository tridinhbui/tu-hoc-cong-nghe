-- Web Push subscriptions (VAPID). One row per browser/device - a user can
-- have several. Written by the client via lib/push-notifications.ts when
-- they opt in from Settings; read/deleted by app/api/cron/send-reminders
-- (service role) when sending or cleaning up expired subscriptions.

create table if not exists public.push_subscriptions (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamp with time zone not null default now()
);

create index if not exists push_subscriptions_user_id_idx on public.push_subscriptions(user_id);

alter table public.push_subscriptions enable row level security;

drop policy if exists "Users can view their own push subscriptions" on public.push_subscriptions;
create policy "Users can view their own push subscriptions"
  on public.push_subscriptions for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own push subscriptions" on public.push_subscriptions;
create policy "Users can insert their own push subscriptions"
  on public.push_subscriptions for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own push subscriptions" on public.push_subscriptions;
create policy "Users can delete their own push subscriptions"
  on public.push_subscriptions for delete
  to authenticated
  using (auth.uid() = user_id);

grant select, insert, delete on public.push_subscriptions to authenticated;
