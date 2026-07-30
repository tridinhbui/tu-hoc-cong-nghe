-- Per-question record of IB interview drill answers.
--
-- user_quiz_sessions only stores an aggregate score/total per run, so
-- "which IB topic am I weakest in?" was unanswerable - the category was
-- known while serving the question and then thrown away. This table keeps
-- one row per answered question so the drill can surface weak areas and
-- offer a targeted re-drill.
--
-- Written only by app/api/knowledge-challenge/submit, from the category
-- carried inside the signed answer token - never from anything the client
-- sends. Same posture as user_quiz_sessions: no direct insert grant for
-- `authenticated`, service-role writes on the verified user's behalf.

create table if not exists public.user_ib_question_attempts (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  -- Id of the question in lib/ib-question-bank.ts. Not a foreign key: the
  -- bank is source code, not a table.
  question_id integer not null,
  category text not null,
  correct boolean not null,
  answered_at timestamptz not null default now()
);

-- The read pattern is always "this user's recent attempts, grouped by
-- category", so lead with user_id and keep answered_at for the time window.
create index if not exists user_ib_question_attempts_user_time_idx
  on public.user_ib_question_attempts (user_id, answered_at desc);

create index if not exists user_ib_question_attempts_user_category_idx
  on public.user_ib_question_attempts (user_id, category);

alter table public.user_ib_question_attempts enable row level security;

-- Users may read their own attempts (the weak-areas panel queries client
-- side). No insert/update/delete policy: the submit route uses the
-- service-role client, which bypasses RLS, and nothing else may write.
create policy "ib_attempts_select_own" on public.user_ib_question_attempts
  for select using (auth.uid() = user_id);
