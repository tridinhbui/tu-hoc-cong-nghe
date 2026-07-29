// Single source of truth for how much XP each quest is worth.
//
// This used to live only in the quest objects built client-side by
// getDailyQuests(), and claimQuestReward() passed that number straight into
// the user_quest_completions insert - which recalculateUserStats() sums into
// total_xp. RLS on that table only checked `auth.uid() = user_id`, never the
// amount, so anyone with devtools could claim a quest for an arbitrary
// xp_earned. Same hole that supabase/migrations/20260714_harden_quiz_writes.sql
// closed for quiz sessions, left open on quests.
//
// app/api/quests/claim/route.ts now re-derives the amount from this table
// server-side and is the only writer; the client's number is display-only.

export const QUEST_XP_REWARDS: Record<string, number> = {
  daily_1: 10, // Hoàn thành 1 bài học bất kỳ
  daily_study_group: 10, // Điểm danh Học Nhóm
  daily_2: 5, // Chơi 1 ván mini game
  daily_3: 15, // Đạt 100% trong 1 mini game
  // Zeroed by 20260812_tighten_xp_economy.sql - these two are pure
  // "you opened the page" quests, they shouldn't mint XP.
  daily_4: 0,
  daily_game: 0,
  daily_news_quiz: 15, // components/DailyNewsQuizWidget.tsx
  career_assessment: 50, // components/JobSearchClient.tsx - one-time (day_key "once")
};

/** Quests whose day_key is a fixed sentinel rather than a YYYY-MM-DD day -
 *  i.e. claimable once per account, not once per day. */
export const ONCE_ONLY_QUESTS = new Set(["career_assessment"]);

export function getQuestXpReward(questType: string): number | null {
  return Object.prototype.hasOwnProperty.call(QUEST_XP_REWARDS, questType)
    ? QUEST_XP_REWARDS[questType]
    : null;
}

/** Upper bound on quest XP a single day can produce, used as a
 *  defense-in-depth cap in recalculateUserStats. Excludes the one-time
 *  quests, which are added separately. */
export const MAX_DAILY_QUEST_XP = Object.entries(QUEST_XP_REWARDS)
  .filter(([id]) => !ONCE_ONLY_QUESTS.has(id))
  .reduce((sum, [, xp]) => sum + xp, 0);
