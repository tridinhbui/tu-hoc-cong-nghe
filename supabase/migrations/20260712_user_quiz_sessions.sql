-- ============================================================================
-- user_quiz_sessions table
-- ============================================================================
-- Tracks completions of the standalone "Kiểm tra" quiz page (app/kiem-tra),
-- separate from user_challenge_passes (which only tracks the gate-mode
-- challenge used to unlock a specific locked lesson). Each row is one
-- finished quiz run - track/difficulty the user picked, their score, and
-- the XP awarded for it. Read/written from: lib/supabase-quiz-sessions.ts.
--
-- lib/supabase-user.ts#recalculateUserStats sums xp_earned from this table
-- on top of the usual lessons-completed XP, so quiz XP survives future
-- recalculations instead of being silently overwritten. Everything that
-- reads this table treats a missing table as "0 bonus XP" (see
-- isMissingTableError in lib/supabase-quiz-sessions.ts) rather than
-- failing, so the app keeps working even before this migration is applied
-- - it just won't award/persist quiz XP until it is.

create table if not exists public.user_quiz_sessions (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  track text not null check (track in ('personal', 'professional', 'cfa')),
  difficulty text not null check (difficulty in ('de', 'trung-binh', 'kho', 'tat-ca')),
  score integer not null,
  total integer not null,
  xp_earned integer not null,
  completed_at timestamp with time zone not null default now()
);

create index if not exists user_quiz_sessions_user_idx
  on public.user_quiz_sessions(user_id);

alter table public.user_quiz_sessions enable row level security;

drop policy if exists "Users can read own quiz sessions" on public.user_quiz_sessions;
create policy "Users can read own quiz sessions"
  on public.user_quiz_sessions for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own quiz sessions" on public.user_quiz_sessions;
create policy "Users can insert own quiz sessions"
  on public.user_quiz_sessions for insert
  with check (auth.uid() = user_id);

grant select, insert on public.user_quiz_sessions to authenticated;
