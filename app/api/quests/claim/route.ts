import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import {
  getQuestXpReward,
  getWeekStartKey,
  ONCE_ONLY_QUESTS,
  WEEKLY_QUEST_XP_CAP,
} from "@/lib/quest-rewards";
import { checkQuestEligibility } from "@/lib/quest-eligibility";

// Server-authoritative quest claiming. user_quest_completions used to be
// insertable straight from the browser with a client-supplied xp_earned
// (lib/supabase-quests.ts#claimQuestReward), and recalculateUserStats sums
// that column into total_xp - so devtools could mint unlimited XP. Direct
// insert from `authenticated` is revoked in
// supabase/migrations/20260813_harden_quest_and_recall_xp.sql; this route is
// the only writer now and derives the amount from lib/quest-rewards.ts
// instead of trusting the request body.

// YYYY-MM-DD, as produced by toLocaleDateString("sv-SE") on the client.
const DAY_KEY_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    questType?: string;
    dayKey?: string;
  } | null;

  const questType = body?.questType;
  const dayKey = body?.dayKey;

  if (typeof questType !== "string" || typeof dayKey !== "string") {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const xpEarned = getQuestXpReward(questType);
  if (xpEarned === null) {
    return NextResponse.json({ error: "Unknown quest" }, { status: 400 });
  }

  // One-time quests pin day_key to "once" so the unique constraint makes
  // them un-repeatable; everything else must be a real calendar day, and
  // never a future one (otherwise a client could pre-claim a year of dailies
  // in one sitting).
  if (ONCE_ONLY_QUESTS.has(questType)) {
    if (dayKey !== "once") {
      return NextResponse.json({ error: "Invalid dayKey" }, { status: 400 });
    }
  } else {
    if (!DAY_KEY_RE.test(dayKey)) {
      return NextResponse.json({ error: "Invalid dayKey" }, { status: 400 });
    }
    // The client sends its own local day, which can legitimately be a day
    // ahead of UTC. Allow that, but nothing beyond it.
    const maxDay = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    if (dayKey > maxDay) {
      return NextResponse.json({ error: "Invalid dayKey" }, { status: 400 });
    }
  }

  const admin = createAdminClient();

  // ĐÃ LÀM XONG NHIỆM VỤ CHƯA. Phép kiểm này trước đây không tồn tại ở đâu
  // ngoài giao diện: components/DailyQuestsWidget.tsx bỏ qua cú bấm khi
  // `quest.current < quest.target`, và đó là tất cả. Chú thích đầu tệp này nói
  // route "server-authoritative" - đúng, nhưng chỉ về SỐ TIỀN. Ai cũng có thể
  // POST thẳng vào đây và nhận đủ XP của một nhiệm vụ chưa hề làm.
  //
  // Đặt TRƯỚC phần tính trần tuần: một lần nhận không hợp lệ thì không nên
  // chạm vào ngân sách tuần, kể cả để đọc.
  const eligibility = await checkQuestEligibility(admin, user.id, questType, dayKey);
  if (!eligibility.eligible) {
    return NextResponse.json(
      { error: "Quest not completed", reason: eligibility.reason },
      { status: 403 }
    );
  }

  // Weekly budget for repeatable quests. Mirrors the daily cap on standalone
  // quiz sessions (STANDALONE_QUIZ_DAILY_XP_CAP): the row is still written so
  // the quest reads as claimed and can't be retried, the XP is just clamped
  // to whatever budget is left. One-time quests are outside the budget -
  // they can't be farmed, and career_assessment shouldn't be crowded out by
  // a week of dailies.
  let awardedXp = xpEarned;
  if (!ONCE_ONLY_QUESTS.has(questType) && xpEarned > 0) {
    const weekStart = getWeekStartKey();
    const { data: weekRows } = await admin
      .from("user_quest_completions")
      .select("xp_earned, quest_type")
      .eq("user_id", user.id)
      .gte("day_key", weekStart);
    const earnedThisWeek = (weekRows ?? [])
      .filter((row) => !ONCE_ONLY_QUESTS.has(row.quest_type as string))
      .reduce((sum, row) => sum + (Number(row.xp_earned) || 0), 0);
    awardedXp = Math.max(0, Math.min(xpEarned, WEEKLY_QUEST_XP_CAP - earnedThisWeek));
  }

  const { error } = await admin
    .from("user_quest_completions")
    .insert([{ user_id: user.id, quest_type: questType, day_key: dayKey, xp_earned: awardedXp }]);

  if (error) {
    // 23505 = already claimed (user_quest_completions_unique). Not an error
    // worth surfacing - the UI just shouldn't re-award.
    if (error.code === "23505") {
      return NextResponse.json({ claimed: false, xpEarned: 0 });
    }
    // `code` is passed through so the caller can keep its localStorage
    // fallback for environments where the table hasn't been migrated yet.
    return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
  }

  // awardedXp, not xpEarned - the caller shows the number actually banked, so
  // a learner who has spent the week's quest budget sees "+0 XP" instead of a
  // toast promising XP that recalculateUserStats will never count.
  return NextResponse.json({ claimed: true, xpEarned: awardedXp });
}
