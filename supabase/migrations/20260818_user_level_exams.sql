-- Moves "bài thi thăng cấp" (RigorousLevelExamModal) off localStorage and into
-- the database, with server-authoritative grading.
--
-- Before this, saveUserPassedExam wrote only to
-- localStorage.thtcdn_user_level_exams_<uid>: a passed exam was lost on cache
-- clear or a device change, and the server had no idea who had certified which
-- level - so the promotion exam could not feed the leaderboard at all.
--
-- Because this score IS meant to feed a public ranking, the browser is not
-- trusted to report it. Same shape as 20260714_harden_quiz_writes.sql: the
-- table is written ONLY by app/api/level-exam/submit (service-role), which
-- re-derives the score from signed per-question tokens it issued itself. The
-- `authenticated` role gets SELECT only - no INSERT/UPDATE - so a devtools
-- call cannot mint a passing row.
--
-- Bounds still exist as defence in depth (cf. 20260815_bound_progress_tables):
--   * level 2..15   - LEVEL_EXAMS in lib/level-exams.ts defines only these.
--   * score 75..100 - only a pass is recorded, and the loosest
--                     minPassPercentage across all levels is 75.
--   * unique (user_id, level) - a retake updates the row rather than adding
--                     one, capping this source at 14 rows per user.

create table if not exists public.user_level_exams (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  level integer not null check (level >= 2 and level <= 15),
  score integer not null check (score >= 75 and score <= 100),
  -- Provenance matters for ranking. 'legacy_local' rows were imported from a
  -- learner's localStorage (earned before this table existed) and were never
  -- graded by the server, so they are inherently unverified - keeping them
  -- means nobody loses a level they already certified, and labelling them
  -- means a future composite score can discount or exclude them instead of
  -- silently treating them as equal to a verified pass.
  source text not null default 'server_graded'
    check (source in ('server_graded', 'legacy_local')),
  passed_at timestamp with time zone not null default now(),
  created_at timestamp with time zone not null default now(),
  unique (user_id, level)
);

create index if not exists user_level_exams_user_idx
  on public.user_level_exams(user_id);

alter table public.user_level_exams enable row level security;

-- Read-only for the learner: they can see their own certifications.
drop policy if exists "Users can view their own level exams" on public.user_level_exams;
create policy "Users can view their own level exams"
  on public.user_level_exams for select
  to authenticated
  using (auth.uid() = user_id);

-- Deliberately NO insert/update policy for `authenticated`. Writes go through
-- app/api/level-exam/submit and app/api/level-exam/import-legacy using the
-- service-role client, which bypasses RLS.
revoke insert, update, delete on public.user_level_exams from authenticated;
grant select on public.user_level_exams to authenticated;
