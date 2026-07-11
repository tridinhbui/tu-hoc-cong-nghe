-- ============================================================================
-- user_challenge_passes table
-- ============================================================================
-- Tracks which challenge-gated lessons (lib/lesson-lock-rule.ts#isChallengeGated)
-- a user has unlocked by passing the randomized knowledge-check challenge
-- (components/KnowledgeChallengeModal.tsx in gate mode). Read/written from:
-- lib/supabase-challenges.ts.

create table if not exists public.user_challenge_passes (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id integer not null,
  score integer not null,
  total integer not null,
  passed_at timestamp with time zone not null default now(),
  unique (user_id, lesson_id)
);

create index if not exists user_challenge_passes_user_idx
  on public.user_challenge_passes(user_id);

alter table public.user_challenge_passes enable row level security;

create policy "Users can read own challenge passes"
  on public.user_challenge_passes for select
  using (auth.uid() = user_id);

create policy "Users can insert own challenge passes"
  on public.user_challenge_passes for insert
  with check (auth.uid() = user_id);

grant select, insert on public.user_challenge_passes to authenticated;
