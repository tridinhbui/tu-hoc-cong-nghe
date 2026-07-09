-- ============================================================================
-- lesson_notes table
-- ============================================================================
-- Stores user notes for lessons. Allows users to take personal notes while
-- learning. Read/written from: lib/supabase-notes.ts, components/LessonNotes.tsx

create table if not exists public.lesson_notes (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id integer not null,
  lesson_slug text not null,
  content text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Index for faster lookups by user and lesson
create index if not exists lesson_notes_user_lesson_idx 
  on public.lesson_notes(user_id, lesson_id);

-- Index for user's all notes
create index if not exists lesson_notes_user_idx 
  on public.lesson_notes(user_id);

-- Enable RLS
alter table public.lesson_notes enable row level security;

-- Users can only read their own notes
create policy "Users can read own notes"
  on public.lesson_notes for select
  using (auth.uid() = user_id);

-- Users can insert their own notes
create policy "Users can insert own notes"
  on public.lesson_notes for insert
  with check (auth.uid() = user_id);

-- Users can update their own notes
create policy "Users can update own notes"
  on public.lesson_notes for update
  using (auth.uid() = user_id);

-- Users can delete their own notes
create policy "Users can delete own notes"
  on public.lesson_notes for delete
  using (auth.uid() = user_id);

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to auto-update updated_at
create trigger lesson_notes_updated_at
  before update on public.lesson_notes
  for each row
  execute function public.handle_updated_at();
