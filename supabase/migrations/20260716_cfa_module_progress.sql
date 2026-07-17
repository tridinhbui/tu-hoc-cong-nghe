-- CFA modules live in the separate Book/Reading/Module tables (not
-- lib/lessons-data), so their ids share no guaranteed disjoint range with
-- lesson_id in user_progress/lesson_bookmarks/etc. Track CFA quiz results
-- and completion in a dedicated table keyed by module_id instead of
-- reusing user_progress, to avoid id collisions.
create table if not exists public.cfa_module_progress (
  id serial primary key,
  user_id uuid references public.user_profiles(id) on delete cascade not null,
  module_id text not null,
  completed boolean default false not null,
  quiz_score integer,
  quiz_total integer,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  constraint cfa_module_progress_unique unique (user_id, module_id)
);

alter table public.cfa_module_progress enable row level security;

create policy "Users can view their own CFA module progress"
  on public.cfa_module_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own CFA module progress"
  on public.cfa_module_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own CFA module progress"
  on public.cfa_module_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists cfa_module_progress_user_idx on public.cfa_module_progress(user_id);
create index if not exists cfa_module_progress_module_idx on public.cfa_module_progress(module_id);
