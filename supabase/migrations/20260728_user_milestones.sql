-- Create user milestone exams completion table
create table if not exists public.user_milestone_exams (
  id serial primary key,
  user_id uuid references public.user_profiles(id) on delete cascade not null,
  track_id text not null,
  stage_label text not null,
  score numeric not null check (score >= 0 and score <= 1),
  created_at timestamp with time zone default now() not null,
  constraint user_milestone_exams_unique unique (user_id, track_id, stage_label)
);

-- Enable RLS and setup policies
alter table public.user_milestone_exams enable row level security;

create policy "Users can view their own milestone completions"
  on public.user_milestone_exams for select
  using (auth.uid() = user_id);

create policy "Users can insert their own milestone completions"
  on public.user_milestone_exams for insert
  with check (auth.uid() = user_id);

-- Create index
create index if not exists user_milestone_exams_user_idx on public.user_milestone_exams(user_id);
