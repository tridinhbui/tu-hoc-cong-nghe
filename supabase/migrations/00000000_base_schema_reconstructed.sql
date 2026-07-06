-- ============================================================================
-- BEST-EFFORT RECONSTRUCTION — NOT A REAL DUMP OF THE LIVE DATABASE.
--
-- Why this file exists: supabase/migrations/ only ever tracked feature
-- migrations added after the fact (20260705_lesson_locking_and_admin.sql
-- onward). The base tables this app has always depended on — user_profiles,
-- user_progress, user_stats, lessons — were created directly against the
-- Supabase project (dashboard/SQL editor) at some earlier point and were
-- never committed. That means this repo alone cannot currently rebuild the
-- database from scratch, which is a real risk if the Supabase project is
-- ever lost or a new environment (staging, DR) needs to be stood up.
--
-- This file reconstructs the column list for each base table from every
-- field the application code actually reads/writes (grepped across
-- lib/, app/, components/) — it is NOT introspected from the live database
-- (no direct Postgres connection or Supabase CLI was available in this
-- environment). Treat it as a documented best guess, not ground truth:
--
--   1. Before relying on this for disaster recovery, diff it against the
--      live schema: `supabase db dump --schema public` (or Table Editor →
--      Definition for each table) and reconcile any differences.
--   2. Types are inferred from usage (e.g. a column only ever compared to a
--      number is typed integer/bigint) and may not match exactly — in
--      particular, default values and NOT NULL constraints beyond what the
--      code implies could be wrong.
--   3. Once verified against the real database, either replace this file's
--      contents with a true `pg_dump`/CLI-generated schema, or delete this
--      file and commit the real one in its place.
--
-- Safe to run against a *fresh* project (all `create table if not exists` /
-- `add column if not exists`) — do NOT run blindly against the existing
-- production project without diffing first, since column types/defaults
-- inferred here could differ from what's actually live.
-- ============================================================================

-- ─── user_profiles ──────────────────────────────────────────────────────
-- One row per authenticated user (id = auth.users.id). Read/written from:
-- lib/supabase-user.ts, app/api/auth/create-profile/route.ts,
-- lib/admin-auth.ts, lib/admin/users.ts.
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  bio text,
  current_level integer not null default 1,
  total_xp integer not null default 0,
  lessons_completed integer not null default 0,
  avg_quiz_score numeric not null default 0,
  current_stage integer not null default 1,
  preferred_track text not null default 'personal',
  dark_mode boolean not null default false,
  last_login_at timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- role/is_disabled were added later by 20260705_lesson_locking_and_admin.sql
-- (kept there, not duplicated here, so that migration's `alter table ...
-- add column if not exists` remains the single source of truth for them).

alter table public.user_profiles enable row level security;

drop policy if exists "Users can view their own profile" on public.user_profiles;
create policy "Users can view their own profile"
  on public.user_profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.user_profiles;
create policy "Users can insert their own profile"
  on public.user_profiles for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.user_profiles;
create policy "Users can update their own profile"
  on public.user_profiles for update
  to authenticated
  using (auth.uid() = id);

-- ─── user_progress ──────────────────────────────────────────────────────
-- Per-user, per-lesson completion record. Read/written from:
-- lib/supabase-progress.ts, lib/admin/analytics.ts, lib/lesson-locking.ts.
create table if not exists public.user_progress (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id bigint not null,
  completed boolean not null default false,
  completed_at timestamp with time zone,
  quiz_score numeric,
  time_spent_seconds integer,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique (user_id, lesson_id)
);

create index if not exists user_progress_user_id_idx on public.user_progress(user_id);
create index if not exists user_progress_lesson_id_idx on public.user_progress(lesson_id);

alter table public.user_progress enable row level security;

drop policy if exists "Users can view their own progress" on public.user_progress;
create policy "Users can view their own progress"
  on public.user_progress for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can upsert their own progress" on public.user_progress;
create policy "Users can upsert their own progress"
  on public.user_progress for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own progress" on public.user_progress;
create policy "Users can update their own progress"
  on public.user_progress for update
  to authenticated
  using (auth.uid() = user_id);

-- ─── user_stats ─────────────────────────────────────────────────────────
-- Denormalized leaderboard/stats row per user. Read/written from:
-- lib/supabase-user.ts (getLeaderboard, upsertUserStats, recalculateUserStats).
create table if not exists public.user_stats (
  id bigint generated always as identity primary key,
  user_id uuid not null unique references auth.users(id) on delete cascade,
  total_lessons_completed integer not null default 0,
  total_xp integer not null default 0,
  current_level integer not null default 1,
  avg_quiz_score numeric not null default 0,
  longest_streak integer not null default 0,
  last_lesson_date timestamp with time zone,
  total_study_time_hours numeric not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

alter table public.user_stats enable row level security;

drop policy if exists "Anyone can view stats for the leaderboard" on public.user_stats;
create policy "Anyone can view stats for the leaderboard"
  on public.user_stats for select
  to authenticated
  using (true);

drop policy if exists "Users can upsert their own stats" on public.user_stats;
create policy "Users can upsert their own stats"
  on public.user_stats for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own stats" on public.user_stats;
create policy "Users can update their own stats"
  on public.user_stats for update
  to authenticated
  using (auth.uid() = user_id);

-- ─── lessons ────────────────────────────────────────────────────────────
-- Server-side mirror of lib/lessons.ts, re-synced wholesale by
-- app/api/admin/sync-lessons (service-role, shared-secret protected). Admin
-- can additionally hand-edit is_fundamental/prerequisite_id/is_visible per
-- lesson (lib/admin/lessons.ts) without those being clobbered by the next
-- content sync (sync only writes the content columns below, not these three).
create table if not exists public.lessons (
  id bigint primary key,
  slug text not null unique,
  title text not null,
  subtitle text,
  duration text,
  difficulty text,
  emoji text,
  opening_question text,
  opening_options jsonb,
  correct_option integer,
  explanation text,
  key_takeaways jsonb,
  track text not null default 'professional',
  status text not null default 'published',
  stage_number integer,
  day_number integer,
  is_fundamental boolean not null default false,
  prerequisite_id bigint,
  is_visible boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index if not exists lessons_track_idx on public.lessons(track);
create index if not exists lessons_stage_number_idx on public.lessons(stage_number);

alter table public.lessons enable row level security;

drop policy if exists "Anyone can view lessons" on public.lessons;
create policy "Anyone can view lessons"
  on public.lessons for select
  to anon, authenticated
  using (true);

-- No insert/update/delete policy for anon/authenticated: all writes to this
-- table go through the service-role client (sync-lessons route, admin
-- lessons actions), which bypasses RLS entirely by design.
