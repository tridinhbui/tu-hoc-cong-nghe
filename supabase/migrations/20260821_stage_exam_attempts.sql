-- Attempt log for "thi vượt chặng", used to rate-limit retries.
--
-- Without it the exam is farmable: fail, immediately request a fresh set of
-- 15 random questions, repeat until the draw happens to be easy. That defeats
-- the 80% threshold entirely, and one pass credits a whole chặng (20+ lessons
-- and the XP for all of them). A cooldown after a failure makes brute-forcing
-- take days while a learner who actually studies just comes back later.
--
-- Written only by app/api/stage-exam using the service-role client, same
-- posture as user_quiz_sessions.

create table if not exists public.user_stage_exam_attempts (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  track text not null,
  stage_label text not null,
  score integer not null,
  total integer not null,
  passed boolean not null,
  attempted_at timestamptz not null default now()
);

-- The only read is "this user's most recent attempt at this stage".
create index if not exists user_stage_exam_attempts_lookup_idx
  on public.user_stage_exam_attempts (user_id, track, stage_label, attempted_at desc);

alter table public.user_stage_exam_attempts enable row level security;

-- Users may read their own attempt history (the panel shows when a retry
-- unlocks). No insert/update/delete policy: only the route writes, via the
-- service-role client, so a client can't erase a failure to skip the cooldown.
create policy "stage_exam_attempts_select_own" on public.user_stage_exam_attempts
  for select using (auth.uid() = user_id);
