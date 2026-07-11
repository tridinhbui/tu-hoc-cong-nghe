-- ============================================================================
-- lesson_bookmarks table
-- ============================================================================
-- The bookmark button (components/BookmarkButton.tsx, lib/supabase-bookmarks.ts)
-- has always targeted this table, but no migration ever created it - every
-- add/remove bookmark call has been failing with "table not found"
-- (PGRST205) since the feature was built.

create table if not exists public.lesson_bookmarks (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id integer not null,
  lesson_slug text not null,
  lesson_title text not null,
  created_at timestamp with time zone not null default now(),
  unique (user_id, lesson_id)
);

create index if not exists lesson_bookmarks_user_idx
  on public.lesson_bookmarks(user_id);

alter table public.lesson_bookmarks enable row level security;

create policy "Users can read own bookmarks"
  on public.lesson_bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
  on public.lesson_bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
  on public.lesson_bookmarks for delete
  using (auth.uid() = user_id);

grant select, insert, delete on public.lesson_bookmarks to authenticated;
