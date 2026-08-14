import { createClient } from "@/lib/supabase";
import { handleSupabaseError } from "@/lib/errors";
import {
  BADGE_DEFINITIONS,
  CAREER_BADGE_DEFINITIONS,
  LEADERBOARD_BADGE_DEFINITIONS,
  getLevelBadgeKeys,
} from "@/lib/badges";
import { getLevelByXp } from "@/lib/levels";
import { getMyLeaderboardRank, type LeaderboardMetric } from "@/lib/supabase-user";
import { FINANCE_CAREERS } from "@/lib/finance-careers";

export interface UserBadge {
  id: number;
  user_id: string;
  badge_key: string;
  badge_name: string;
  badge_description: string;
  badge_icon: string;
  earned_at: string;
}

// PGRST205 = table not found in schema cache (migration not run yet on this Supabase project)
function isMissingTableError(error: { code?: string } | null) {
  return error?.code === "PGRST205";
}

export async function getUserBadges(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_badges")
    .select("*")
    .eq("user_id", userId)
    .order("earned_at", { ascending: false });

  if (error) {
    if (!isMissingTableError(error)) {
      throw handleSupabaseError(error);
    }
    return [];
  }

  return data as UserBadge[];
}

function isBadgeEarnedByCurrentState(
  badgeKey: string,
  state: {
    currentLevel: number;
  }
): boolean {
  return getLevelBadgeKeys(state.currentLevel).includes(badgeKey);
}

/**
 * Career-map milestones, derived from real tables the same way level badges
 * are derived from user_profiles - never client-awarded (see the note on
 * awardBadge below). Resolves relatedLessonSlugs -> lesson-completion via
 * the same server route the career detail view and dashboard widget use
 * (/api/career-lesson-progress), rather than duplicating that resolution
 * logic here; lib/lessons-loader.ts is server-only and can't be imported
 * into this client-callable module directly.
 */
async function getEarnedCareerBadgeKeys(
  supabase: ReturnType<typeof createClient>,
  userId: string
): Promise<string[]> {
  const earned: string[] = [];

  const [goalRow, { data: quizRow }] = await Promise.all([
    (async () => {
      try {
        const { data } = await supabase.from("user_career_goals").select("career_id").eq("user_id", userId).maybeSingle();
        return data;
      } catch {
        return null;
      }
    })(),
    supabase
      .from("user_quest_completions")
      .select("quest_type")
      .eq("user_id", userId)
      .eq("quest_type", "career_assessment")
      .maybeSingle(),
  ]);

  if (goalRow?.career_id) earned.push("career_goal_set");
  if (quizRow) earned.push("career_quiz_done");

  const goalCareer = goalRow?.career_id ? FINANCE_CAREERS.find((c) => c.id === goalRow.career_id) : null;
  if (goalCareer && goalCareer.relatedLessonSlugs.length > 0) {
    try {
      const res = await fetch("/api/career-lesson-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs: goalCareer.relatedLessonSlugs }),
      });
      if (res.ok) {
        const progress = (await res.json()) as { total: number; completed: number };
        if (progress.total > 0 && progress.completed === progress.total) {
          earned.push("career_path_complete");
        }
      }
    } catch {
      // Non-critical - a network hiccup here just means the badge doesn't
      // show up this load, not a broken profile page.
    }
  }

  return earned;
}

/** Hạng bao nhiêu thì được huy hiệu "Top 10". */
export const LEADERBOARD_BADGE_TOP_N = 10;

/** Chỉ số nào trao huy hiệu nào.
 *
 *  Khoá của bản đồ là `LeaderboardMetric`, nên bốn chỉ số phải có đủ mặt: thêm
 *  một chỉ số mới vào union mà quên ở đây là lỗi biên dịch, không phải một huy
 *  hiệu lặng lẽ không bao giờ được trao - vốn đúng là cách bốn cái này nằm chết
 *  suốt từ lúc được định nghĩa. */
export const LEADERBOARD_BADGE_BY_METRIC: Record<LeaderboardMetric, string> = {
  xp: "leaderboard_xp_top_10",
  lessons: "leaderboard_lessons_top_10",
  avg_score: "leaderboard_avg_score_top_10",
  streak: "leaderboard_streak_top_10",
};

/**
 * Huy hiệu bảng xếp hạng, SUY RA từ thứ hạng hiện tại chứ không phải đọc từ
 * hàng đã lưu.
 *
 * Đây không phải lựa chọn phong cách. `awardBadge` trong file này là một hàm
 * rỗng có chủ ý ("Client-side badge awarding is intentionally disabled"), và
 * 20260713_badges_and_social_privacy_hardening.sql đã `revoke insert` quyền ghi
 * user_badges của `authenticated` - trình duyệt không thể tự trao huy hiệu, và
 * đó là điều đúng. Chú thích của chính migration ấy chỉ ra lối đi còn lại:
 * "Profile UI already derives currently-eligible level badges defensively, so
 * direct table writes are unnecessary." Huy hiệu cấp đã đi lối đó từ lâu; bốn
 * huy hiệu này chỉ là chưa ai nối vào.
 *
 * Hệ quả phải nói thẳng: huy hiệu này MẤT khi rời top 10. Nó là vị trí đang
 * đứng, không phải cột mốc đã qua - giống hệt huy hiệu cấp biến mất nếu cấp tụt.
 * Muốn nó thành cột mốc vĩnh viễn thì cần một đường ghi phía máy chủ và một cột
 * mốc thời gian, chứ không phải nới quyền ghi cho trình duyệt.
 *
 * Một truy vấn lỗi chỉ làm mất huy hiệu đó của lần tải này, không làm hỏng cả
 * trang cá nhân - cùng cách `getEarnedCareerBadgeKeys` xử lý.
 */
export async function getEarnedLeaderboardBadgeKeys(userId: string): Promise<string[]> {
  const entries = Object.entries(LEADERBOARD_BADGE_BY_METRIC) as [LeaderboardMetric, string][];

  const resolved = await Promise.all(
    entries.map(async ([metric, badgeKey]) => {
      try {
        const mine = await getMyLeaderboardRank(metric, userId);
        return mine !== null && mine.rank <= LEADERBOARD_BADGE_TOP_N ? badgeKey : null;
      } catch {
        return null;
      }
    })
  );

  return resolved.filter((key): key is string => key !== null);
}

/**
 * Read badges defensively. `user_badges` is historical state, and production
 * has had progress rows reset/deleted while badge rows survived, leaving
 * orphaned badges that the learner no longer qualifies for. Profile display
 * should reflect the current source-of-truth tables, not stale badge rows.
 */
export async function getEligibleUserBadges(userId: string) {
  const supabase = createClient();
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("current_level, total_xp")
    .eq("id", userId)
    .single();

  if (profileError) throw handleSupabaseError(profileError);

  const currentLevel =
    profile?.current_level && profile.current_level > 0
      ? profile.current_level
      : getLevelByXp(profile?.total_xp ?? 0).level;

  const [badges, earnedCareerBadgeKeys, earnedLeaderboardBadgeKeys] = await Promise.all([
    getUserBadges(userId),
    getEarnedCareerBadgeKeys(supabase, userId),
    getEarnedLeaderboardBadgeKeys(userId),
  ]);
  const state = { currentLevel };
  const existingByKey = new Map(badges.map((badge) => [badge.badge_key, badge]));

  const allowedBadgeKeys = [
    ...getLevelBadgeKeys(currentLevel),
    ...earnedCareerBadgeKeys,
    ...earnedLeaderboardBadgeKeys,
  ];

  return allowedBadgeKeys
    .map((badgeKey, index) => {
      const existing = existingByKey.get(badgeKey);
      const def = BADGE_DEFINITIONS[badgeKey];

      return (
        existing ?? {
          id: -(index + 1),
          user_id: userId,
          badge_key: def.key,
          badge_name: def.name,
          badge_description: def.description,
          badge_icon: def.icon,
          earned_at: new Date(0).toISOString(),
        }
      );
    })
    .filter(
      (badge) =>
        badge.badge_key in CAREER_BADGE_DEFINITIONS ||
        // Không có dòng này thì bốn huy hiệu bảng xếp hạng vừa được suy ra ở
        // trên sẽ bị chính bộ lọc này loại ngay: isBadgeEarnedByCurrentState
        // chỉ biết huy hiệu cấp, nên mọi khoá lạ đều rơi về false.
        badge.badge_key in LEADERBOARD_BADGE_DEFINITIONS ||
        isBadgeEarnedByCurrentState(badge.badge_key, state)
    );
}

/**
 * Client-side badge awarding is intentionally disabled.
 * Earned badges must be written only from trusted server-side code / SQL
 * after verifying the user's real state, never from the browser.
 */
export async function awardBadge(userId: string, badgeKey: string) {
  void userId;
  void badgeKey;
  return null;
}

export async function awardBadges(userId: string, badgeKeys: string[]) {
  void userId;
  void badgeKeys;
  return [] as UserBadge[];
}
