import { createClient } from "./supabase";
import { QUEST_XP_REWARDS } from "./quest-rewards";
import { recalculateUserStats } from "./supabase-user";

export interface Quest {
  id: string; // daily_1, daily_2, daily_3
  title: string;
  description: string;
  target: number;
  current: number;
  xpReward: number;
  claimed: boolean;
}

function isMissingTableError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return error.code === "PGRST116" || error.code === "42P01" || error.message?.includes("does not exist") || false;
}

// Generates daily quests and counts progress
export async function getDailyQuests(userId: string, dayKey: string): Promise<Quest[]> {
  const supabase = createClient();
  
  // 1. Fetch completed lessons today
  const { data: progressToday } = await supabase
    .from("user_progress")
    .select("completed_at")
    .eq("user_id", userId)
    .eq("completed", true);

  const completedTodayCount = (progressToday ?? []).filter((p) => {
    if (!p.completed_at) return false;
    const d = new Date(p.completed_at);
    // Convert to local YYYY-MM-DD
    const localKey = d.toLocaleDateString("sv-SE"); // sv-SE returns YYYY-MM-DD
    return localKey === dayKey;
  }).length;

  // 2. Fetch game sessions today
  const { data: gamesToday } = await supabase
    .from("game_sessions")
    .select("score, total, created_at")
    .eq("user_id", userId);

  const gamesTodayList = (gamesToday ?? []).filter((g) => {
    if (!g.created_at) return false;
    const d = new Date(g.created_at);
    const localKey = d.toLocaleDateString("sv-SE");
    return localKey === dayKey;
  });

  const gamesPlayedCount = gamesTodayList.length;
  const perfectGamesCount = gamesTodayList.filter((g) => g.total > 0 && g.score === g.total).length;

  // 3. Fetch mistake reviews today
  // Let's check how many mistakes have been solved or reviewed today. Since we don't have a direct solved logs table,
  // we can use games played or lessons finished as proxy, or simply check if they solved at least one standalone quiz.
  const solvedQuizCount = completedTodayCount; // reuse completed lessons/quizzes as indicator

  // 3b. Phiên ngồi học trong thế giới 3D hôm nay. Đọc thẳng focus_sessions -
  // bảng do /api/focus-session ghi với hai mốc thời gian server tự đặt, nên
  // con số này không giả được bằng devtools như một cờ trong localStorage.
  const startOfDay = new Date(`${dayKey}T00:00:00`);
  const { data: focusToday } = await supabase
    .from("focus_sessions")
    .select("seconds")
    .eq("user_id", userId)
    .gte("started_at", startOfDay.toISOString());
  const focusSecondsToday = (focusToday ?? []).reduce((sum, r) => sum + ((r.seconds as number) ?? 0), 0);

  // 4. Fetch claimed status from DB
  const claimedSet = new Set<string>();
  const { data: claims, error: claimsError } = await supabase
    .from("user_quest_completions")
    .select("quest_type")
    .eq("user_id", userId)
    .eq("day_key", dayKey);

  if (!claimsError && claims) {
    claims.forEach((c) => claimedSet.add(c.quest_type));
  } else if (claimsError && isMissingTableError(claimsError)) {
    // Fallback to LocalStorage if DB table hasn't been migrated yet
    if (typeof window !== "undefined") {
      const localClaims = window.localStorage.getItem(`quests_claimed_${userId}_${dayKey}`);
      if (localClaims) {
        try {
          const arr = JSON.parse(localClaims) as string[];
          arr.forEach((item) => claimedSet.add(item));
        } catch {
          // ignore
        }
      }
    }
  }

  // 5. Fetch study group check-in status today
  const checkinKey = userId ? `study_group_checkin_${userId}_${dayKey}` : `study_group_checkin_guest_${dayKey}`;
  const hasCheckedInStudyGroup = typeof window !== "undefined" && Boolean(localStorage.getItem(checkinKey));

  return [
    {
      id: "daily_1",
      title: "Khởi động ngày mới",
      description: "Hoàn thành 1 bài học bất kỳ",
      target: 1,
      current: Math.min(1, completedTodayCount),
      xpReward: QUEST_XP_REWARDS.daily_1,
      claimed: claimedSet.has("daily_1"),
    },
    {
      id: "daily_study_group",
      title: "Điểm danh Học Nhóm",
      description: "Vào học nhóm & gửi 1 tin nhắn check-in hôm nay",
      target: 1,
      current: hasCheckedInStudyGroup ? 1 : 0,
      xpReward: QUEST_XP_REWARDS.daily_study_group,
      claimed: claimedSet.has("daily_study_group"),
    },
    {
      id: "daily_2",
      title: "Thạo thủ trò chơi",
      description: "Chơi ít nhất 1 ván mini game bất kỳ",
      target: 1,
      current: Math.min(1, gamesPlayedCount),
      xpReward: QUEST_XP_REWARDS.daily_2,
      claimed: claimedSet.has("daily_2"),
    },
    {
      id: "daily_3",
      title: "Trí tuệ hoàn hảo",
      description: "Đạt điểm số 100% trong bất kỳ mini game nào",
      target: 1,
      current: Math.min(1, perfectGamesCount),
      xpReward: QUEST_XP_REWARDS.daily_3,
      claimed: claimedSet.has("daily_3"),
    },
    {
      // Auto-complete: just visiting the platform today satisfies it -
      // "current" is always 1 the moment this list is fetched, no separate
      // activity check needed like the other 3 quests.
      id: "daily_4",
      title: "Đăng nhập mỗi ngày",
      description: "Ghé thăm nền tảng hôm nay",
      target: 1,
      current: 1,
      xpReward: QUEST_XP_REWARDS.daily_4,
      claimed: claimedSet.has("daily_4"),
    },
    {
      // Mục tiêu 15 phút chứ không phải trọn 25: một phiên Pomodoro bị cắt
      // ngang vì có việc vẫn là thời gian đã ngồi học thật, và bắt phải đủ 25
      // mới tính sẽ biến nhiệm vụ thành thứ hoặc-tất-cả-hoặc-không.
      id: "daily_focus",
      title: "Ngồi học trong thành phố",
      description: "Ngồi học 15 phút ở thư viện hoặc phòng nhóm 3D",
      target: 15,
      current: Math.min(15, Math.floor(focusSecondsToday / 60)),
      xpReward: QUEST_XP_REWARDS.daily_focus,
      claimed: claimedSet.has("daily_focus"),
    },
    {
      id: "daily_game",
      title: "Khám phá Vương Quốc Game",
      description: "Tiến vào thế giới Game Tài Chính hôm nay",
      target: 1,
      current: 1,
      xpReward: QUEST_XP_REWARDS.daily_game,
      claimed: claimedSet.has("daily_game"),
    },
  ];
}

export interface ClaimQuestResult {
  /** false only means "already claimed today" - not an error. */
  claimed: boolean;
  /** What the server actually banked. Can be LESS than the quest's nominal
   *  QUEST_XP_REWARDS value (even 0) if WEEKLY_QUEST_XP_CAP was already hit
   *  this week - a learner can complete every daily quest correctly and
   *  still see 0 XP from the later ones once the weekly budget runs out.
   *  Callers must show THIS number, not the nominal one, or the toast
   *  promises XP that recalculateUserStats will never actually add - which
   *  is exactly the "did the quest, XP didn't move" report this was added
   *  to fix. */
  xpEarned: number;
}

// Records quest completion claim via the server-authoritative route.
//
// The XP amount is NOT sent - app/api/quests/claim derives it from
// lib/quest-rewards.ts. This used to insert straight into
// user_quest_completions with a client-supplied xp_earned, which
// recalculateUserStats sums into total_xp, so devtools could mint arbitrary
// XP. Direct insert is revoked in
// supabase/migrations/20260813_harden_quest_and_recall_xp.sql.
export async function claimQuestReward(
  userId: string,
  questType: string,
  dayKey: string
): Promise<ClaimQuestResult> {
  const res = await fetch("/api/quests/claim", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questType, dayKey }),
  });
  const payload = (await res.json().catch(() => null)) as
    | { claimed?: boolean; xpEarned?: number; error?: string; code?: string }
    | null;

  let xpEarned = 0;

  if (res.ok) {
    // claimed: false = already claimed; no XP moved, so skip the recompute.
    if (!payload?.claimed) return { claimed: false, xpEarned: 0 };
    xpEarned = payload.xpEarned ?? 0;
  } else {
    const error = { code: payload?.code, message: payload?.error };
    if (isMissingTableError(error)) {
      // Fallback: save to LocalStorage. No server to ask "how much is left
      // in the weekly budget," so this degraded path can't cap the amount -
      // the caller gets the nominal reward, same as the pre-hardening
      // behavior. Acceptable: this path only runs if the table itself is
      // missing (an unmigrated environment), not in normal operation.
      const { getQuestXpReward } = await import("./quest-rewards");
      xpEarned = getQuestXpReward(questType) ?? 0;
      if (typeof window !== "undefined") {
        const storeKey = `quests_claimed_${userId}_${dayKey}`;
        const localClaims = window.localStorage.getItem(storeKey);
        let claimsArr: string[] = [];
        if (localClaims) {
          try { claimsArr = JSON.parse(localClaims) as string[]; } catch {}
        }
        if (!claimsArr.includes(questType)) {
          claimsArr.push(questType);
          window.localStorage.setItem(storeKey, JSON.stringify(claimsArr));
        }
      }
    } else {
      console.error("Error saving quest claim:", error);
      return { claimed: false, xpEarned: 0 };
    }
  }

  // Instantly recalculate user stats to reflect in total_xp
  void recalculateUserStats(userId).catch(() => {});
  return { claimed: true, xpEarned };
}

// Calculates overall quest XP claimed by user
export async function getTotalQuestXp(userId: string): Promise<number> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_quest_completions")
    .select("xp_earned")
    .eq("user_id", userId);

  if (error) {
    console.warn("Supabase Quest Total XP read failed, falling back to localStorage:", error);
    if (typeof window !== "undefined") {
      let total = 0;
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith(`quests_claimed_${userId}_`)) {
          try {
            const items = JSON.parse(window.localStorage.getItem(key) ?? "[]") as string[];
            items.forEach((item) => {
              if (item === "daily_1") total += 10;
              else if (item === "daily_2") total += 5;
              else if (item === "daily_3") total += 15;
              else if (item === "daily_news_quiz") total += 15;
            });
          } catch {}
        }
      }
      return total;
    }
    return 0;
  }

  return (data ?? []).reduce((sum, item) => sum + item.xp_earned, 0);
}
