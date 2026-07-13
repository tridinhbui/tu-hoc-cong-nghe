-- ============================================================================
-- lesson_manual_flags table
-- ============================================================================
-- User-controlled "I have already studied this" flag. This is intentionally
-- separate from real completion/progress so it never affects XP, badges, or
-- leaderboard ranks.

create table if not exists public.lesson_manual_flags (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id integer not null,
  lesson_slug text not null,
  lesson_title text not null,
  created_at timestamp with time zone not null default now(),
  unique (user_id, lesson_id)
);

create index if not exists lesson_manual_flags_user_idx
  on public.lesson_manual_flags(user_id);

alter table public.lesson_manual_flags enable row level security;

drop policy if exists "Users can read own lesson flags" on public.lesson_manual_flags;
create policy "Users can read own lesson flags"
  on public.lesson_manual_flags for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own lesson flags" on public.lesson_manual_flags;
create policy "Users can insert own lesson flags"
  on public.lesson_manual_flags for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own lesson flags" on public.lesson_manual_flags;
create policy "Users can delete own lesson flags"
  on public.lesson_manual_flags for delete
  to authenticated
  using (auth.uid() = user_id);

grant select, insert, delete on public.lesson_manual_flags to authenticated;
