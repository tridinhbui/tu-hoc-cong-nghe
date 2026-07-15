-- Create user quest completions table
create table if not exists public.user_quest_completions (
  id serial primary key,
  user_id uuid references public.user_profiles(id) on delete cascade not null,
  quest_type text not null,
  day_key text not null,
  xp_earned integer not null,
  created_at timestamp with time zone default now() not null,
  constraint user_quest_completions_unique unique (user_id, quest_type, day_key)
);

-- Enable RLS and setup policies
alter table public.user_quest_completions enable row level security;

create policy "Users can view their own quest completions"
  on public.user_quest_completions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own quest completions"
  on public.user_quest_completions for insert
  with check (auth.uid() = user_id);

-- Create indexes
create index if not exists user_quest_completions_user_idx on public.user_quest_completions(user_id);
create index if not exists user_quest_completions_day_idx on public.user_quest_completions(day_key);
