-- Three more mini-games (ratio-category, term-definition, formula-match)
-- added on top of the original two. game_sessions.game_type had a CHECK
-- constraint listing only the first two, so inserts for the new types would
-- be rejected. Widen it. get_game_leaderboard takes game_type as a plain
-- text arg with no constraint, so it needs no change.

alter table public.game_sessions drop constraint if exists game_sessions_game_type_check;
alter table public.game_sessions
  add constraint game_sessions_game_type_check
  check (game_type in (
    'financial-statement-match',
    'en-vi-terms',
    'ratio-category',
    'term-definition',
    'formula-match'
  ));
