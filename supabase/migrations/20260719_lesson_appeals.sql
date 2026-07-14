-- Safety net for the "self-marked" (Tự đánh dấu) vs "actually completed"
-- (Xong) distinction: if a learner genuinely did the reading + quiz but the
-- automatic completion check doesn't recognize it (a real bug class - see
-- the completion-restore fix in the same release), they can appeal to have
-- an admin manually convert their self-marked flag into a real completion
-- (with XP) instead of being stuck redoing an already-finished lesson.

create table if not exists public.lesson_completion_appeals (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  lesson_id integer not null,
  lesson_slug text not null,
  note text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  admin_note text,
  reviewed_by uuid references public.user_profiles(id) on delete set null,
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  -- One open appeal per (user, lesson) at a time - resubmitting after a
  -- rejection is a product decision for later, not blocked at the DB level
  -- since status can differ; this only prevents duplicate *pending* rows.
  unique (user_id, lesson_id, status)
);

create index if not exists lesson_completion_appeals_status_idx on public.lesson_completion_appeals(status, created_at);
create index if not exists lesson_completion_appeals_user_idx on public.lesson_completion_appeals(user_id);

alter table public.lesson_completion_appeals enable row level security;

drop policy if exists "Users can view their own appeals" on public.lesson_completion_appeals;
create policy "Users can view their own appeals"
  on public.lesson_completion_appeals for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can submit their own appeals" on public.lesson_completion_appeals;
create policy "Users can submit their own appeals"
  on public.lesson_completion_appeals for insert
  to authenticated
  with check (auth.uid() = user_id and status = 'pending');

grant select, insert on public.lesson_completion_appeals to authenticated;
grant usage, select on sequence lesson_completion_appeals_id_seq to authenticated;

-- Reads/updates for the admin review queue happen via the service-role
-- client (lib/admin/appeals.ts, same pattern as every other admin table in
-- this schema) - no update/delete grant needed for `authenticated`.
