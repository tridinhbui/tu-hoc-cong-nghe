-- Run this entire file once in the Supabase SQL Editor (Project > SQL Editor > New query).
-- It is safe to re-run: every statement uses IF NOT EXISTS / OR REPLACE guards.

-- ============================================================
-- lesson_feedback: 5-star rating + optional comment shown once
-- a learner finishes a lesson's quiz.
-- ============================================================
create table if not exists public.lesson_feedback (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  lesson_id integer not null,
  rating smallint not null check (rating between 1 and 5),
  comment text,
  created_at timestamp with time zone not null default now()
);
create index if not exists lesson_feedback_lesson_id_idx on public.lesson_feedback(lesson_id);
create index if not exists lesson_feedback_created_at_idx on public.lesson_feedback(created_at desc);

alter table public.lesson_feedback enable row level security;

drop policy if exists "Anyone can submit lesson feedback" on public.lesson_feedback;
create policy "Anyone can submit lesson feedback"
  on public.lesson_feedback for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can read lesson feedback" on public.lesson_feedback;
create policy "Admins can read lesson feedback"
  on public.lesson_feedback for select
  to authenticated
  using (exists (select 1 from public.user_profiles p where p.id = auth.uid() and p.role = 'admin'));

grant select, insert on public.lesson_feedback to authenticated;
grant insert on public.lesson_feedback to anon;
grant usage, select on sequence lesson_feedback_id_seq to authenticated, anon;
