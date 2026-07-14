-- Text-selection highlights on lesson content: select a passage, right-click,
-- choose "Đánh dấu quan trọng" (yellow, personal) or "Báo là AI viết"
-- (flags a passage the learner suspects is AI-generated/needs review).
-- Stores the quoted text itself (not a DOM range/offset) - lesson content
-- comes from two different rendering pipelines (data-driven sections vs.
-- freeform case-study JSX pages), so matching by exact quoted substring is
-- the only approach that works across both without brittle DOM-position
-- bookkeeping.

create table if not exists public.lesson_highlights (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  lesson_id integer not null,
  lesson_slug text not null,
  quote text not null,
  kind text not null default 'important' check (kind in ('important', 'ai_flag')),
  created_at timestamp with time zone not null default now()
);

create index if not exists lesson_highlights_user_lesson_idx on public.lesson_highlights(user_id, lesson_id);
-- Powers a future "review AI-flagged passages" admin view - not built yet,
-- but the query pattern (all ai_flag rows for a lesson, across users) needs
-- this index regardless of who ends up querying it.
create index if not exists lesson_highlights_kind_idx on public.lesson_highlights(kind, lesson_id);

alter table public.lesson_highlights enable row level security;

drop policy if exists "Users can view their own highlights" on public.lesson_highlights;
create policy "Users can view their own highlights"
  on public.lesson_highlights for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can create their own highlights" on public.lesson_highlights;
create policy "Users can create their own highlights"
  on public.lesson_highlights for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own highlights" on public.lesson_highlights;
create policy "Users can delete their own highlights"
  on public.lesson_highlights for delete
  to authenticated
  using (auth.uid() = user_id);

grant select, insert, delete on public.lesson_highlights to authenticated;
grant usage, select on sequence lesson_highlights_id_seq to authenticated;
