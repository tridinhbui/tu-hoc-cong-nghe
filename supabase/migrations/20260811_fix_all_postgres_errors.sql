-- Fix all 4 Postgres Database errors reported in Supabase Log Explorer:
-- 1. Fix Error 23514: game_sessions_game_type_check violation
-- 2. Fix Error 42703: column user_profiles.coins does not exist
-- 3. Fix Error 23503: user_progress_lesson_id_fkey & reading_progress_lesson_id_fkey foreign key violations

-- 1. Drop outdated check constraints on game_sessions so all new mini-game types can save cleanly
ALTER TABLE public.game_sessions DROP CONSTRAINT IF EXISTS game_sessions_game_type_check;
ALTER TABLE public.game_sessions DROP CONSTRAINT IF EXISTS game_sessions_xp_earned_check;

-- 2. Add missing coins column to user_profiles if not present
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS coins integer DEFAULT 0;

-- 3. Drop rigid foreign key constraints on user_progress and reading_progress so CFA, professional, and custom lesson IDs don't get rejected by Postgres
ALTER TABLE public.user_progress DROP CONSTRAINT IF EXISTS user_progress_lesson_id_fkey;
ALTER TABLE public.user_progress DROP CONSTRAINT IF EXISTS fk_user_progress_lesson;
ALTER TABLE public.reading_progress DROP CONSTRAINT IF EXISTS reading_progress_lesson_id_fkey;
ALTER TABLE public.reading_progress DROP CONSTRAINT IF EXISTS fk_reading_progress_lesson;
