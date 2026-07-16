-- Same root cause as 20260730_quest_completions_grant.sql: both tables had
-- RLS policies defined but were never granted table-level privileges to
-- `authenticated`. Postgres checks GRANTs before RLS ever runs, so every
-- read/write from a logged-in user was rejected with 42501 regardless of
-- how correct the RLS policy was - this means the entire flashcard feature
-- (save on review, bulk import, delete) and the lesson-level active-recall
-- scheduler have been failing in production since they shipped, silently
-- (42501 isn't one of the "table not fully migrated yet" codes those
-- functions check for, so it never even fell back to the localStorage path).
grant select, insert, update, delete on public.user_flashcards to authenticated;
grant select, insert, update on public.user_lesson_recalls to authenticated;
