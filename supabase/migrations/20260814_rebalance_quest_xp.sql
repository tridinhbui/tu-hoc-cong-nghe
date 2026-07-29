-- Rebalances the daily-quest rewards that lib/quest-rewards.ts now defines.
--
-- The dailies had drifted to 55 XP/day. On top of the 30 XP standalone-quiz
-- cap that made 85 XP/day of repeatable filler, against 10 XP for actually
-- completing a lesson - a day of chores was worth 8.5 lessons, while the
-- 40,000 XP level curve (lib/levels.ts) assumes a lesson-driven economy.
--
-- Kept as its own migration rather than editing
-- 20260813_harden_quest_and_recall_xp.sql, which may already have been
-- applied. Applied in order the two agree: 20260813 normalizes history to the
-- old table, this one moves it to the new one.
--
-- Note this only re-prices history. The forward-looking guard is
-- WEEKLY_QUEST_XP_CAP, enforced at write time in app/api/quests/claim - a
-- per-quest number alone doesn't stop the next reward surface from
-- re-inflating the total, which is exactly how it drifted the first time.

update public.user_quest_completions
set xp_earned = case quest_type
  when 'daily_1' then 10             -- unchanged: real lesson completion
  when 'daily_study_group' then 2    -- was 10
  when 'daily_2' then 2              -- was 5
  when 'daily_3' then 5              -- was 15
  when 'daily_4' then 0
  when 'daily_game' then 0
  when 'daily_news_quiz' then 8      -- was 15
  when 'career_assessment' then 50   -- unchanged: one-time
  -- weekly_chest / weekly_epic and anything unrecognized are ledger-only.
  else 0
end
where xp_earned is distinct from case quest_type
  when 'daily_1' then 10
  when 'daily_study_group' then 2
  when 'daily_2' then 2
  when 'daily_3' then 5
  when 'daily_4' then 0
  when 'daily_game' then 0
  when 'daily_news_quiz' then 8
  when 'career_assessment' then 50
  else 0
end;
