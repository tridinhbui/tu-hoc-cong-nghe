import { describe, it, expect, vi, beforeEach } from "vitest";
import { BADGE_DEFINITIONS, LEADERBOARD_TOP_10_BADGE_KEYS } from "@/lib/badges";

/** Bốn huy hiệu "Top 10" và đường trao chúng.
 *
 *  Chúng được định nghĩa, được dịch đủ hai thứ tiếng, và có test giữ i18n khớp -
 *  nhưng KHÔNG BAO GIỜ được trao: getEligibleUserBadges chỉ ghép huy hiệu cấp
 *  với huy hiệu nghề, và `awardBadge` là hàm rỗng có chủ ý vì quyền insert vào
 *  user_badges đã bị thu hồi khỏi `authenticated`. Nội dung chết mà vẫn xanh
 *  test, nên không có gì kêu.
 *
 *  Bộ test này canh cả hai nửa: bản đồ chỉ số -> huy hiệu phải trỏ vào huy hiệu
 *  CÓ THẬT, và ngưỡng hạng phải đúng là "top 10". */

const getMyLeaderboardRank = vi.fn();

vi.mock("@/lib/supabase", () => ({ createClient: () => ({}) }));
vi.mock("@/lib/supabase-user", () => ({
  getMyLeaderboardRank: (...args: unknown[]) => getMyLeaderboardRank(...args),
}));

const { LEADERBOARD_BADGE_BY_METRIC, LEADERBOARD_BADGE_TOP_N, getEarnedLeaderboardBadgeKeys } =
  await import("@/lib/supabase-badges");

beforeEach(() => {
  getMyLeaderboardRank.mockReset();
});

describe("bản đồ chỉ số -> huy hiệu bảng xếp hạng", () => {
  it("mọi khoá trỏ tới một huy hiệu CÓ THẬT trong BADGE_DEFINITIONS", () => {
    // Đây là ca quan trọng nhất file này. getEligibleUserBadges làm
    // `BADGE_DEFINITIONS[badgeKey].key` không kiểm tra gì, nên một khoá gõ sai
    // ("...top10" thay vì "...top_10") không phải là một huy hiệu bị thiếu -
    // nó là TypeError làm vỡ cả trang cá nhân. Kiểu Record<LeaderboardMetric,
    // string> bắt được chỉ số thiếu, nhưng không bắt được chuỗi sai chính tả.
    for (const [metric, badgeKey] of Object.entries(LEADERBOARD_BADGE_BY_METRIC)) {
      expect(BADGE_DEFINITIONS[badgeKey], `${metric} -> ${badgeKey}`).toBeDefined();
    }
  });

  it("phủ đúng bộ LEADERBOARD_TOP_10_BADGE_KEYS, không thừa không thiếu", () => {
    expect(new Set(Object.values(LEADERBOARD_BADGE_BY_METRIC))).toEqual(
      new Set(LEADERBOARD_TOP_10_BADGE_KEYS)
    );
  });
});

describe("suy ra huy hiệu từ thứ hạng", () => {
  it("hạng trong ngưỡng thì được huy hiệu của đúng chỉ số đó", async () => {
    getMyLeaderboardRank.mockImplementation(async (metric: string) =>
      metric === "streak" ? { rank: 3, value: 30 } : null
    );

    expect(await getEarnedLeaderboardBadgeKeys("u1")).toEqual(["leaderboard_streak_top_10"]);
  });

  it("đúng hạng biên vẫn được, hạng ngay dưới biên thì không", async () => {
    getMyLeaderboardRank.mockImplementation(async (metric: string) =>
      metric === "xp"
        ? { rank: LEADERBOARD_BADGE_TOP_N, value: 1 }
        : metric === "lessons"
          ? { rank: LEADERBOARD_BADGE_TOP_N + 1, value: 1 }
          : null
    );

    // Biên là <=, không phải <: hạng 10 nằm TRONG top 10.
    expect(await getEarnedLeaderboardBadgeKeys("u1")).toEqual(["leaderboard_xp_top_10"]);
  });

  it("không có hạng nào thì không có huy hiệu nào", async () => {
    getMyLeaderboardRank.mockResolvedValue(null);
    expect(await getEarnedLeaderboardBadgeKeys("u1")).toEqual([]);
  });

  it("một chỉ số lỗi chỉ mất huy hiệu của nó, không kéo đổ ba cái còn lại", async () => {
    // Cùng cách getEarnedCareerBadgeKeys nuốt lỗi mạng: một trang cá nhân thiếu
    // một huy hiệu thì đọc được, còn một trang ném lỗi thì không.
    getMyLeaderboardRank.mockImplementation(async (metric: string) => {
      if (metric === "avg_score") throw new Error("RPC down");
      return { rank: 1, value: 1 };
    });

    const keys = await getEarnedLeaderboardBadgeKeys("u1");
    expect(keys).toHaveLength(3);
    expect(keys).not.toContain("leaderboard_avg_score_top_10");
  });
});
