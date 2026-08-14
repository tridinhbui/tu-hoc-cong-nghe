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
  // 2026-08-24 hạ về 0 để nhường ngân sách cho daily_focus, 2026-08-09 chủ dự
  // án cho TRẢ LẠI mức 5. Lập luận cũ vẫn đúng về mặt đo lường - daily_focus
  // đo thời gian ngồi do máy chủ đếm, còn cái này chỉ cần một tin nhắn gõ
  // trong hai giây - nhưng hai nhiệm vụ không loại trừ nhau, và bỏ hẳn phần
  // thưởng của một việc người học vẫn làm là lấy đi chứ không phải cân lại.
  daily_study_group: 5, // Điểm danh Học Nhóm
  daily_2: 2, // Chơi 1 ván mini game - participation only (was 5)
  daily_3: 5, // Đạt 100% trong 1 mini game - trả lại mức cũ cùng lúc với daily_study_group
  // Zeroed by 20260812_tighten_xp_economy.sql - these two are pure
  // "you opened the page" quests, they shouldn't mint XP.
  daily_4: 0,
  // Ngồi học đủ một phiên trong thế giới 3D, thời gian do máy chủ đo.
  //
  // Năm điểm này ban đầu lấy từ trong ra (daily_study_group về 0, daily_3 về
  // 2) để tổng đứng yên ở 27. Hai khoản đó đã được trả lại, nên giờ nó LÀ
  // phần thêm vào: ngân sách ngày lên 35.
  daily_focus: 5,
  daily_game: 0,
  // Ba nhiệm vụ thêm 2026-08-13 để đẩy người học ra phố, học sâu hơn và tương
  // tác trong phòng 3D thay vì chỉ ghé qua. Cả ba đều đo bằng dữ liệu MÁY CHỦ
  // ghi, không phải cờ localStorage như daily_study_group - đó là điều kiện để
  // một nhiệm vụ đáng có phần thưởng.
  //
  // Tổng ngày lên 53, nhưng WEEKLY_QUEST_XP_CAP giữ nguyên 120: ba nhiệm vụ này
  // ĐỔI việc người học làm chứ không nới ngân sách. Đó đúng là tính chất mà
  // ghi chú của cái trần này mô tả - thêm loại nhiệm vụ mới thì nó cạnh tranh
  // trong cùng một ngân sách tuần chứ không thổi phồng nền kinh tế.
  daily_lessons_3: 8, // Học sâu: 3 bài trong ngày
  daily_street: 5, // Ra Phố Nghề: thử thách cột trụ hoặc ngồi học tại phố
  daily_room_quiz: 5, // Làm 1 quiz nhóm trong phòng 3D
  daily_news_quiz: 8, // components/DailyNewsQuizWidget.tsx - a real quiz (was 15)
  career_assessment: 50, // components/JobSearchClient.tsx - one-time (day_key "once")
};

/** Quests whose day_key is a fixed sentinel rather than a YYYY-MM-DD day -
 *  i.e. claimable once per account, not once per day. */
export const ONCE_ONLY_QUESTS = new Set(["career_assessment"]);

/** Số nhiệm vụ trong ngày phải xong để mở rương tuần.
 *
 *  Từng là số 3 viết thẳng vào hai widget, đọc trên một danh sách 7 nhiệm vụ
 *  mà 2 trong số đó tự hoàn thành ngay khi mở trang ("Đăng nhập mỗi ngày",
 *  "Khám phá Vương Quốc Game"). Điều kiện thật vì thế chỉ là MỘT việc có thật.
 *
 *  Ba nhiệm vụ 0 XP giờ đã bị lọc khỏi danh sách (lib/supabase-quests.ts), nên
 *  giữ nguyên số 3 sẽ lặng lẽ biến điều kiện thành 3 trên 4 nhiệm vụ thật -
 *  siết gấp ba mà không ai định làm thế. 2 giữ cái rương ở gần chỗ cũ nhất:
 *  vẫn phải học thật, nhưng không thành một buổi cày cả bốn nhiệm vụ. */
export const WEEKLY_CHEST_QUESTS_REQUIRED = 2;

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
