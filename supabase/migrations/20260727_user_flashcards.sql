-- Create user flashcards table for spaced repetition
create table if not exists public.user_flashcards (
  id serial primary key,
  user_id uuid references public.user_profiles(id) on delete cascade not null,
  term text not null,
  definition text not null,
  interval integer default 1 not null,
  ease_factor numeric default 2.5 not null,
  repetitions integer default 0 not null,
  next_review_at timestamp with time zone default now() not null,
  created_at timestamp with time zone default now() not null,
  constraint user_flashcards_unique unique (user_id, term)
);

-- Enable RLS and setup policies
alter table public.user_flashcards enable row level security;

create policy "Users can view their own flashcards"
  on public.user_flashcards for select
  using (auth.uid() = user_id);

create policy "Users can insert/update their own flashcards"
  on public.user_flashcards for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own flashcards"
  on public.user_flashcards for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own flashcards"
  on public.user_flashcards for delete
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists user_flashcards_user_idx on public.user_flashcards(user_id);
create index if not exists user_flashcards_next_review_idx on public.user_flashcards(next_review_at);
