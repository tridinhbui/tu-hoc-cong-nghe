-- Mini-game gamification: 2 drag-and-drop games (financial-statement-match,
-- en-vi-terms), each with its own XP rule, leaderboard, and play history.
-- CHECK constraints are a light safety net (score/total sanity) - grading
-- itself happens client-side, unlike the anti-cheat token system built for
-- the main lesson quiz (lib/quiz-tokens.ts). That level of hardening is
-- overkill for a casual side mini-game; if these leaderboards ever become a
-- real target for cheating, revisit with the same signed-token approach.

create table if not exists public.game_sessions (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  game_type text not null check (game_type in ('financial-statement-match', 'en-vi-terms')),
  score integer not null check (score >= 0),
  total integer not null check (total > 0),
  xp_earned integer not null default 0 check (xp_earned >= 0 and xp_earned <= 50),
  created_at timestamp with time zone not null default now(),
  constraint game_sessions_score_le_total check (score <= total)
);

create index if not exists game_sessions_user_idx on public.game_sessions(user_id, game_type, created_at desc);
create index if not exists game_sessions_leaderboard_idx on public.game_sessions(game_type, score desc);

alter table public.game_sessions enable row level security;

drop policy if exists "Users can view their own game sessions" on public.game_sessions;
create policy "Users can view their own game sessions"
  on public.game_sessions for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own game sessions" on public.game_sessions;
create policy "Users can insert their own game sessions"
  on public.game_sessions for insert
  to authenticated
  with check (auth.uid() = user_id);

grant select, insert on public.game_sessions to authenticated;
grant usage, select on sequence game_sessions_id_seq to authenticated;

-- Best-score-per-user leaderboard for one game. SECURITY DEFINER because
-- game_sessions' RLS only lets each user see their own rows - same reason
-- get_leaderboard (20260711_leaderboard_rpc.sql) exists for the XP board.
-- Never returns email, only what the leaderboard UI needs.
create or replace function public.get_game_leaderboard(p_game_type text, p_limit int default 10)
returns table(user_id uuid, name text, avatar_url text, best_score integer, best_total integer, played_at timestamp with time zone)
language sql
security definer
set search_path = public
as $$
  select
    best.user_id,
    coalesce(nullif(up.full_name, ''), split_part(up.email, '@', 1), 'Người học') as name,
    up.avatar_url,
    best.best_score,
    best.best_total,
    best.played_at
  from (
    select distinct on (user_id)
      user_id, score as best_score, total as best_total, created_at as played_at
    from public.game_sessions
    where game_type = p_game_type
    order by user_id, score desc, created_at asc
  ) best
  join public.user_profiles up on up.id = best.user_id
  order by best.best_score desc, best.played_at asc
  limit greatest(1, least(coalesce(p_limit, 10), 50));
$$;

grant execute on function public.get_game_leaderboard(text, int) to authenticated;
