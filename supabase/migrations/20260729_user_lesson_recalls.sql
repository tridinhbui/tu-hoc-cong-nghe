-- Create user lesson active recalls table for spaced repetition at lesson level
create table if not exists public.user_lesson_recalls (
  id serial primary key,
  user_id uuid references public.user_profiles(id) on delete cascade not null,
  lesson_id integer not null,
  recall_stage integer default 1 not null, -- 1 (day 1), 2 (day 3), 3 (day 7), 4 (day 30)
  next_recall_at timestamp with time zone default now() not null,
  created_at timestamp with time zone default now() not null,
  constraint user_lesson_recalls_unique unique (user_id, lesson_id)
);

-- Enable RLS and setup policies
alter table public.user_lesson_recalls enable row level security;

create policy "Users can view their own lesson recalls"
  on public.user_lesson_recalls for select
  using (auth.uid() = user_id);

create policy "Users can insert/update their own lesson recalls"
  on public.user_lesson_recalls for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own lesson recalls"
  on public.user_lesson_recalls for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Create index
create index if not exists user_lesson_recalls_user_idx on public.user_lesson_recalls(user_id);
create index if not exists user_lesson_recalls_next_idx on public.user_lesson_recalls(next_recall_at);
