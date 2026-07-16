-- Same root cause found repeatedly this session (user_progress, user_stats,
-- lesson_notes, milestone exams, ...): the original migration for this
-- table defined RLS policies but never granted table-level privileges to
-- `authenticated` - Postgres checks GRANTs before RLS ever runs, so every
-- insert/select from a logged-in user was rejected with 42501 regardless of
-- how correct the RLS policy was. This is exactly what made claiming a
-- daily quest reward always fail ("Không thể nhận thưởng. Vui lòng thử
-- lại.") even though the quest was genuinely completed (3/3).
grant select, insert on public.user_quest_completions to authenticated;
