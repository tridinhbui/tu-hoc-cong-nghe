-- Run this entire file once in the Supabase SQL Editor (Project > SQL Editor > New query).
-- It is safe to re-run: every statement uses IF NOT EXISTS / OR REPLACE guards.

-- ============================================================
-- user_profiles: admin role + account status
-- ============================================================
alter table public.user_profiles add column if not exists role text not null default 'user' check (role in ('user','admin'));
alter table public.user_profiles add column if not exists is_disabled boolean not null default false;
alter table public.user_profiles add column if not exists last_login_at timestamp with time zone;
create index if not exists user_profiles_role_idx on public.user_profiles(role);

-- ============================================================
-- lessons: admin-controlled gating/visibility overrides
-- ============================================================
alter table public.lessons add column if not exists is_fundamental boolean not null default false;
alter table public.lessons add column if not exists prerequisite_id bigint references public.lessons(id) on delete set null;
alter table public.lessons add column if not exists is_visible boolean not null default true;
create index if not exists lessons_prerequisite_idx on public.lessons(prerequisite_id);

-- ============================================================
-- contact_messages: FloatingChatbot feedback form submissions
-- ============================================================
create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamp with time zone not null default now()
);
create index if not exists contact_messages_created_at_idx on public.contact_messages(created_at desc);
create index if not exists contact_messages_is_read_idx on public.contact_messages(is_read);

alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can submit a contact message" on public.contact_messages;
create policy "Anyone can submit a contact message"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can read contact messages" on public.contact_messages;
create policy "Admins can read contact messages"
  on public.contact_messages for select
  to authenticated
  using (exists (select 1 from public.user_profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "Admins can update contact messages" on public.contact_messages;
create policy "Admins can update contact messages"
  on public.contact_messages for update
  to authenticated
  using (exists (select 1 from public.user_profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "Admins can delete contact messages" on public.contact_messages;
create policy "Admins can delete contact messages"
  on public.contact_messages for delete
  to authenticated
  using (exists (select 1 from public.user_profiles p where p.id = auth.uid() and p.role = 'admin'));

grant select, insert, update, delete on public.contact_messages to authenticated;
grant insert on public.contact_messages to anon;
grant usage, select on sequence contact_messages_id_seq to authenticated, anon;

-- ============================================================
-- lesson_unlock_requests: user asks admin to unlock a locked lesson
-- ============================================================
create table if not exists public.lesson_unlock_requests (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id bigint not null references public.lessons(id) on delete cascade,
  note text,
  status text not null default 'pending' check (status in ('pending','approved','denied')),
  created_at timestamp with time zone not null default now(),
  resolved_at timestamp with time zone
);
create index if not exists lesson_unlock_requests_status_idx on public.lesson_unlock_requests(status);
create index if not exists lesson_unlock_requests_user_idx on public.lesson_unlock_requests(user_id);

alter table public.lesson_unlock_requests enable row level security;

drop policy if exists "Users can view their own unlock requests" on public.lesson_unlock_requests;
create policy "Users can view their own unlock requests"
  on public.lesson_unlock_requests for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "Users can create their own unlock requests" on public.lesson_unlock_requests;
create policy "Users can create their own unlock requests"
  on public.lesson_unlock_requests for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Admins can view all unlock requests" on public.lesson_unlock_requests;
create policy "Admins can view all unlock requests"
  on public.lesson_unlock_requests for select
  to authenticated
  using (exists (select 1 from public.user_profiles p where p.id = auth.uid() and p.role = 'admin'));

drop policy if exists "Admins can update unlock requests" on public.lesson_unlock_requests;
create policy "Admins can update unlock requests"
  on public.lesson_unlock_requests for update
  to authenticated
  using (exists (select 1 from public.user_profiles p where p.id = auth.uid() and p.role = 'admin'));

grant select, insert, update on public.lesson_unlock_requests to authenticated;
grant usage, select on sequence lesson_unlock_requests_id_seq to authenticated;

-- ============================================================
-- user_lesson_unlocks: per-user grant once an admin approves a request
-- ============================================================
create table if not exists public.user_lesson_unlocks (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id bigint not null references public.lessons(id) on delete cascade,
  created_at timestamp with time zone not null default now(),
  unique (user_id, lesson_id)
);
create index if not exists user_lesson_unlocks_user_idx on public.user_lesson_unlocks(user_id);

alter table public.user_lesson_unlocks enable row level security;

drop policy if exists "Users can view their own unlocks" on public.user_lesson_unlocks;
create policy "Users can view their own unlocks"
  on public.user_lesson_unlocks for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "Admins can manage all unlocks" on public.user_lesson_unlocks;
create policy "Admins can manage all unlocks"
  on public.user_lesson_unlocks for all
  to authenticated
  using (exists (select 1 from public.user_profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.user_profiles p where p.id = auth.uid() and p.role = 'admin'));

grant select on public.user_lesson_unlocks to authenticated;
grant usage, select on sequence user_lesson_unlocks_id_seq to authenticated;

-- ============================================================
-- user_onboarding: OnboardingFlow completion state
-- ============================================================
create table if not exists public.user_onboarding (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  completed boolean not null default false,
  selected_track text check (selected_track in ('personal','professional')),
  completed_at timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

alter table public.user_onboarding enable row level security;

drop policy if exists "Users can view their own onboarding" on public.user_onboarding;
create policy "Users can view their own onboarding"
  on public.user_onboarding for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "Users can upsert their own onboarding" on public.user_onboarding;
create policy "Users can upsert their own onboarding"
  on public.user_onboarding for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Users can update their own onboarding" on public.user_onboarding;
create policy "Users can update their own onboarding"
  on public.user_onboarding for update
  to authenticated
  using (user_id = auth.uid());

grant select, insert, update on public.user_onboarding to authenticated;

-- ============================================================
-- user_streaks: StreakDisplay daily-streak tracking
-- ============================================================
create table if not exists public.user_streaks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_activity_date date,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

alter table public.user_streaks enable row level security;

drop policy if exists "Users can view their own streak" on public.user_streaks;
create policy "Users can view their own streak"
  on public.user_streaks for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "Users can insert their own streak" on public.user_streaks;
create policy "Users can insert their own streak"
  on public.user_streaks for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Users can update their own streak" on public.user_streaks;
create policy "Users can update their own streak"
  on public.user_streaks for update
  to authenticated
  using (user_id = auth.uid());

grant select, insert, update on public.user_streaks to authenticated;

-- ============================================================
-- Done. After running this, refresh the PostgREST schema cache:
-- Project Settings > API > "Reload schema" (or wait ~60s, it auto-reloads).
-- ============================================================
