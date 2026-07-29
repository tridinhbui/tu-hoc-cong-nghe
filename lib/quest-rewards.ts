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

// Rebalanced 2026-07-29. The dailies had drifted to 55 XP/day, which on top
// of the 30 XP standalone-quiz cap meant 85 XP a day of repeatable filler
// against 10 XP for actually finishing a lesson - one day of chores was
// worth 8.5 lessons, and the 40,000 XP level curve was designed for a
// lesson-driven economy. Amounts now scale with how much learning the quest
// actually represents: finishing a lesson keeps its full value, pure
// attendance ("send a message", "open a game") is a token.
export const QUEST_XP_REWARDS: Record<string, number> = {
  daily_1: 10, // Hoàn thành 1 bài học - real learning, unchanged
  daily_study_group: 2, // Điểm danh Học Nhóm - one message; attendance only (was 10)
  daily_2: 2, // Chơi 1 ván mini game - participation only (was 5)
  daily_3: 5, // Đạt 100% trong 1 mini game - skill, but games are short (was 15)
  // Zeroed by 20260812_tighten_xp_economy.sql - these two are pure
  // "you opened the page" quests, they shouldn't mint XP.
  daily_4: 0,
  daily_game: 0,
  daily_news_quiz: 8, // components/DailyNewsQuizWidget.tsx - a real quiz (was 15)
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

/** Ceiling on repeatable quest XP per calendar week, enforced at write time
 *  in app/api/quests/claim (same shape as STANDALONE_QUIZ_DAILY_XP_CAP).
 *
 *  Tuning the per-quest amounts alone doesn't hold: the dailies drifted from
 *  a handful of quests to 55 XP/day precisely because each new reward surface
 *  was added in isolation, and nothing bounded the total. This cap survives
 *  that - a new quest type can be added without silently re-inflating the
 *  economy, it just competes for the same weekly budget.
 *
 *  7 x MAX_DAILY_QUEST_XP would be 175; 120 leaves a perfect week slightly
 *  short, so the ceiling actually binds rather than being decorative. */
export const WEEKLY_QUEST_XP_CAP = 120;

/** Monday-based start of the calendar week containing `date`, as YYYY-MM-DD
 *  in UTC. Used to bucket quest claims for WEEKLY_QUEST_XP_CAP. */
export function getWeekStartKey(date: Date = new Date()): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  // getUTCDay(): 0 = Sunday. Shift so Monday is day 0.
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
}
