import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import {
  QUEST_XP_REWARDS,
  ONCE_ONLY_QUESTS,
  getQuestXpReward,
  getWeekStartKey,
  MAX_DAILY_QUEST_XP,
  WEEKLY_QUEST_XP_CAP,
} from "@/lib/quest-rewards";

describe("getWeekStartKey", () => {
  // Monday-based. Sunday is the trap: getUTCDay() returns 0 for it, so a
  // naive `- getUTCDay()` would roll Sunday forward to the *next* week's
  // Monday instead of back to the one that started six days earlier.
  it("returns the same Monday for every day of that week", () => {
    const monday = "2026-07-27";
    for (const day of [
      "2026-07-27", // Mon
      "2026-07-28", // Tue
      "2026-07-29", // Wed
      "2026-07-30", // Thu
      "2026-07-31", // Fri
      "2026-08-01", // Sat
      "2026-08-02", // Sun
    ]) {
      expect(getWeekStartKey(new Date(`${day}T12:00:00Z`))).toBe(monday);
    }
  });

  it("rolls over to the next Monday, not before it", () => {
    expect(getWeekStartKey(new Date("2026-08-02T23:59:59Z"))).toBe("2026-07-27");
    expect(getWeekStartKey(new Date("2026-08-03T00:00:00Z"))).toBe("2026-08-03");
  });

  it("is stable across times of day", () => {
    expect(getWeekStartKey(new Date("2026-07-29T00:00:00Z"))).toBe(
      getWeekStartKey(new Date("2026-07-29T23:59:59Z"))
    );
  });

  it("produces a key that sorts against day_key strings", () => {
    // The claim route filters with .gte("day_key", weekStart), which is a
    // string comparison in Postgres - so the format has to be zero-padded
    // YYYY-MM-DD for that to mean what it looks like.
    expect(getWeekStartKey(new Date("2026-01-05T12:00:00Z"))).toBe("2026-01-05");
    expect("2026-01-09" >= getWeekStartKey(new Date("2026-01-09T12:00:00Z"))).toBe(true);
    expect("2026-01-04" >= getWeekStartKey(new Date("2026-01-09T12:00:00Z"))).toBe(false);
  });
});

describe("getQuestXpReward", () => {
  it("returns the table value for known quests", () => {
    expect(getQuestXpReward("daily_1")).toBe(10);
    expect(getQuestXpReward("daily_focus")).toBe(5);
  });

  it("returns 0, not null, for quests deliberately worth nothing", () => {
    // null means "unknown quest" and is rejected with a 400; these are known
    // quests that simply don't pay, so they must stay distinguishable.
    expect(getQuestXpReward("daily_4")).toBe(0);
    expect(getQuestXpReward("daily_game")).toBe(0);
    // daily_study_group về 0 khi daily_focus thay chỗ nó: nó vẫn là nhiệm vụ
    // hợp lệ, chỉ là không trả XP nữa.
    expect(getQuestXpReward("daily_study_group")).toBe(0);
  });

  it("returns null for unknown quests so the route can reject them", () => {
    expect(getQuestXpReward("weekly_chest")).toBeNull();
    expect(getQuestXpReward("../../etc/passwd")).toBeNull();
    expect(getQuestXpReward("toString")).toBeNull();
  });
});

describe("XP economy invariants", () => {
  it("keeps every quest under the per-row DB constraint", () => {
    // 20260813_harden_quest_and_recall_xp.sql: check (xp_earned between 0 and 50)
    for (const [id, xp] of Object.entries(QUEST_XP_REWARDS)) {
      expect(xp, id).toBeGreaterThanOrEqual(0);
      expect(xp, id).toBeLessThanOrEqual(50);
    }
  });

  it("keeps a full day of dailies below a single lesson-heavy session", () => {
    // A lesson is 10 XP. Dailies were 55/day pre-rebalance; the point of the
    // change is that grinding chores can't out-earn actually studying.
    expect(MAX_DAILY_QUEST_XP).toBe(27);
    expect(MAX_DAILY_QUEST_XP).toBeLessThan(30);
  });

  it("makes the weekly cap actually bind", () => {
    // If the cap were >= 7 days of perfect claims it would never fire, and
    // adding one more quest type would silently re-inflate the economy.
    expect(WEEKLY_QUEST_XP_CAP).toBeLessThan(MAX_DAILY_QUEST_XP * 7);
  });

  it("does not put one-time quests in the repeatable budget", () => {
    for (const id of ONCE_ONLY_QUESTS) {
      expect(QUEST_XP_REWARDS, id).toHaveProperty(id);
    }
    expect(MAX_DAILY_QUEST_XP).toBe(
      Object.entries(QUEST_XP_REWARDS)
        .filter(([id]) => !ONCE_ONLY_QUESTS.has(id))
        .reduce((sum, [, xp]) => sum + xp, 0)
    );
  });
});

describe("không có bản chép thứ hai của bảng thưởng", () => {
  it("không file nào cộng XP nhiệm vụ bằng số viết tay", () => {
    // Đã có thật: nhánh dự phòng localStorage trong lib/supabase-quests.ts giữ
    // một bảng riêng và lệch hẳn sau lần siết nền kinh tế XP - daily_2 cộng 5
    // (thật ra 2), daily_news_quiz cộng 15 (thật ra 8), daily_3 cộng 15 trong
    // khi bảng thật cho 2, tức sai gấp bảy lần rưỡi. Không ai thấy vì nhánh đó
    // chỉ chạy khi Supabase lỗi.
    //
    // Bắt theo hình dạng `item === "daily_x"` đi kèm một phép cộng số: đó đúng
    // là hình dạng của một bảng chép tay, và nó không có lý do chính đáng nào.
    const src = readFileSync("lib/supabase-quests.ts", "utf8");
    const handWritten = [...src.matchAll(/=== "(daily_\w+|career_assessment)"\)\s*\w+\s*\+=\s*\d+/g)];
    expect(
      handWritten.map((m) => m[0]),
      "cộng XP bằng số viết tay - dùng getQuestXpReward() thay vì chép số"
    ).toEqual([]);
  });
});

describe("nhiệm vụ không đo được thì không hiện", () => {
  it("daily_focus bị lọc khi focus_sessions chưa tồn tại", () => {
    // Bảng focus_sessions cần migration 20260824_focus_sessions.sql. Chưa chạy
    // thì truy vấn trả PGRST205, và bản trước nuốt luôn lỗi - kết quả là 0
    // giây, giống hệt một ngày chưa học, nên nhiệm vụ đứng mãi ở 0/15. Người
    // học nhìn thấy một nhiệm vụ không bao giờ hoàn thành được và không có lý
    // do nào hiện ra.
    const src = readFileSync("lib/supabase-quests.ts", "utf8");
    expect(src, "không còn đọc mã lỗi của focus_sessions").toContain("PGRST205");
    expect(src, "không còn lọc daily_focus khi bảng thiếu").toMatch(
      /focusAvailable \|\| q\.id !== "daily_focus"/
    );
  });

  it("chỉ daily_focus phụ thuộc bảng đó, không nhiệm vụ nào khác", () => {
    // Nếu một nhiệm vụ thứ hai bám vào focus_sessions mà không được lọc thì nó
    // lặp lại đúng lỗi này, im lặng như lần đầu.
    const src = readFileSync("lib/supabase-quests.ts", "utf8");
    const uses = [...src.matchAll(/from\("focus_sessions"\)/g)];
    expect(uses).toHaveLength(1);
  });
});
