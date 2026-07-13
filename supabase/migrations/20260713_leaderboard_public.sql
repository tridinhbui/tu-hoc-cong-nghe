-- Lets signed-out visitors see the homepage's public leaderboard preview.
-- get_leaderboard only ever returns name/avatar_url/value (see
-- 20260711_leaderboard_rpc.sql and 20260713_leaderboard_avatar.sql) - no
-- email or other PII - so it's safe to grant to `anon` the same way
-- get_total_user_count and get_lesson_count already are.

grant execute on function public.get_leaderboard(text, int) to anon;
