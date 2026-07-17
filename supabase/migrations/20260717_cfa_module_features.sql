-- Bookmark/highlight/note/recall tables for CFA modules, mirroring
-- lesson_bookmarks/lesson_highlights/lesson_notes/user_lesson_recalls but
-- keyed by module_id (text, from the separate Book/Reading/Module tables)
-- instead of lesson_id (integer, from lib/lessons-data) - reusing the
-- personal-finance tables would risk id collisions since the two id spaces
-- aren't guaranteed disjoint (see 20260716_cfa_module_progress.sql).

create table if not exists public.cfa_module_bookmarks (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null,
  module_title text not null,
  created_at timestamp with time zone not null default now(),
  unique (user_id, module_id)
);

create index if not exists cfa_module_bookmarks_user_idx on public.cfa_module_bookmarks(user_id);

alter table public.cfa_module_bookmarks enable row level security;

create policy "Users can read own CFA bookmarks"
  on public.cfa_module_bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can insert own CFA bookmarks"
  on public.cfa_module_bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own CFA bookmarks"
  on public.cfa_module_bookmarks for delete
  using (auth.uid() = user_id);

grant select, insert, delete on public.cfa_module_bookmarks to authenticated;


create table if not exists public.cfa_module_notes (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null,
  content text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index if not exists cfa_module_notes_user_module_idx on public.cfa_module_notes(user_id, module_id);

alter table public.cfa_module_notes enable row level security;

create policy "Users can read own CFA notes"
  on public.cfa_module_notes for select
  using (auth.uid() = user_id);

create policy "Users can insert own CFA notes"
  on public.cfa_module_notes for insert
  with check (auth.uid() = user_id);

create policy "Users can update own CFA notes"
  on public.cfa_module_notes for update
  using (auth.uid() = user_id);

create policy "Users can delete own CFA notes"
  on public.cfa_module_notes for delete
  using (auth.uid() = user_id);

grant select, insert, update, delete on public.cfa_module_notes to authenticated;

create trigger cfa_module_notes_updated_at
  before update on public.cfa_module_notes
  for each row
  execute function public.handle_updated_at();


create table if not exists public.cfa_module_highlights (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null,
  quote text not null,
  created_at timestamp with time zone not null default now()
);

create index if not exists cfa_module_highlights_user_module_idx on public.cfa_module_highlights(user_id, module_id);

alter table public.cfa_module_highlights enable row level security;

create policy "Users can read own CFA highlights"
  on public.cfa_module_highlights for select
  using (auth.uid() = user_id);

create policy "Users can insert own CFA highlights"
  on public.cfa_module_highlights for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own CFA highlights"
  on public.cfa_module_highlights for delete
  using (auth.uid() = user_id);

grant select, insert, delete on public.cfa_module_highlights to authenticated;


create table if not exists public.cfa_module_recalls (
  id serial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null,
  recall_stage integer default 1 not null,
  next_recall_at timestamp with time zone default now() not null,
  created_at timestamp with time zone default now() not null,
  constraint cfa_module_recalls_unique unique (user_id, module_id)
);

alter table public.cfa_module_recalls enable row level security;

create policy "Users can view their own CFA recalls"
  on public.cfa_module_recalls for select
  using (auth.uid() = user_id);

create policy "Users can insert their own CFA recalls"
  on public.cfa_module_recalls for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own CFA recalls"
  on public.cfa_module_recalls for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists cfa_module_recalls_user_idx on public.cfa_module_recalls(user_id);
create index if not exists cfa_module_recalls_next_idx on public.cfa_module_recalls(next_recall_at);
