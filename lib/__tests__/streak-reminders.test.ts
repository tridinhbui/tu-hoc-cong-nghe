import { describe, it, expect } from "vitest";
import {
  todayDateString,
  getStreakRiskStatus,
  getInactiveDaysCount,
  decideReminder,
  reminderShownKey,
  STREAK_AT_RISK_HOUR,
} from "@/lib/streak-reminders";
import type { UserStreak } from "@/lib/supabase-streak";

function makeStreak(overrides: Partial<UserStreak>): UserStreak {
  return {
    id: "streak-1",
    user_id: "u1",
    current_streak: 1,
    longest_streak: 1,
    last_activity_date: "2026-01-01",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

describe("todayDateString", () => {
  it("formats as YYYY-MM-DD in local time", () => {
    expect(todayDateString(new Date(2026, 0, 5))).toBe("2026-01-05");
  });

  it("zero-pads single-digit month/day", () => {
    expect(todayDateString(new Date(2026, 2, 3))).toBe("2026-03-03");
  });
});

describe("getStreakRiskStatus", () => {
  it("is not at risk when there's no streak record", () => {
    const status = getStreakRiskStatus(null);
    expect(status.hasActiveStreak).toBe(false);
    expect(status.isAtRisk).toBe(false);
  });

  it("is not at risk when current_streak is 0", () => {
    const status = getStreakRiskStatus(makeStreak({ current_streak: 0 }));
    expect(status.hasActiveStreak).toBe(false);
    expect(status.isAtRisk).toBe(false);
  });

  it("is not at risk if already active today, even late in the day", () => {
    const now = new Date(2026, 0, 5, STREAK_AT_RISK_HOUR + 1);
    const status = getStreakRiskStatus(makeStreak({ current_streak: 3, last_activity_date: "2026-01-05" }), now);
    expect(status.isAtRisk).toBe(false);
  });

  it("is at risk when inactive today and past the risk hour", () => {
    const now = new Date(2026, 0, 5, STREAK_AT_RISK_HOUR + 1);
    const status = getStreakRiskStatus(makeStreak({ current_streak: 3, last_activity_date: "2026-01-04" }), now);
    expect(status.isAtRisk).toBe(true);
    expect(status.currentStreak).toBe(3);
  });

  it("is not at risk when inactive today but still early", () => {
    const now = new Date(2026, 0, 5, STREAK_AT_RISK_HOUR - 1);
    const status = getStreakRiskStatus(makeStreak({ current_streak: 3, last_activity_date: "2026-01-04" }), now);
    expect(status.isAtRisk).toBe(false);
  });
});

describe("getInactiveDaysCount", () => {
  it("returns 0 with no streak record", () => {
    expect(getInactiveDaysCount(null)).toBe(0);
  });

  it("returns 0 when last activity was today", () => {
    const now = new Date(2026, 0, 5);
    expect(getInactiveDaysCount(makeStreak({ last_activity_date: "2026-01-05" }), now)).toBe(0);
  });

  it("returns the number of days since last activity", () => {
    const now = new Date(2026, 0, 8);
    expect(getInactiveDaysCount(makeStreak({ last_activity_date: "2026-01-05" }), now)).toBe(3);
  });

  it("never returns negative for a future last_activity_date", () => {
    const now = new Date(2026, 0, 1);
    expect(getInactiveDaysCount(makeStreak({ last_activity_date: "2026-01-05" }), now)).toBe(0);
  });
});

describe("reminderShownKey", () => {
  it("includes the date and kind", () => {
    expect(reminderShownKey("streak", new Date(2026, 0, 5))).toBe("reminder-shown-2026-01-05-streak");
    expect(reminderShownKey("recall", new Date(2026, 0, 5))).toBe("reminder-shown-2026-01-05-recall");
  });
});

describe("decideReminder", () => {
  const notShownYet = () => false;
  const alreadyShownAll = () => true;

  it("returns null when nothing is due", () => {
    const result = decideReminder({
      streakRisk: { hasActiveStreak: false, isAtRisk: false, currentStreak: 0 },
      dueRecallCount: 0,
      alreadyShown: notShownYet,
    });
    expect(result).toBeNull();
  });

  it("prioritizes streak risk over recall due", () => {
    const result = decideReminder({
      streakRisk: { hasActiveStreak: true, isAtRisk: true, currentStreak: 5 },
      dueRecallCount: 3,
      alreadyShown: notShownYet,
    });
    expect(result?.kind).toBe("streak");
    expect(result?.body).toContain("5 ngày");
  });

  it("appends the motivation line to the streak reminder when given one", () => {
    const result = decideReminder({
      streakRisk: { hasActiveStreak: true, isAtRisk: true, currentStreak: 5 },
      dueRecallCount: 0,
      alreadyShown: notShownYet,
      motivationLine: "Một bài thôi là nó sống tiếp.",
    });
    expect(result?.body).toContain("5 ngày");
    expect(result?.body).toContain("🔥 Một bài thôi là nó sống tiếp.");
  });

  it("leaves the body untouched when no motivation line is passed", () => {
    const result = decideReminder({
      streakRisk: { hasActiveStreak: true, isAtRisk: true, currentStreak: 5 },
      dueRecallCount: 0,
      alreadyShown: notShownYet,
    });
    expect(result?.body).not.toContain("🔥");
  });

  it("falls back to recall reminder when streak isn't at risk", () => {
    const result = decideReminder({
      streakRisk: { hasActiveStreak: false, isAtRisk: false, currentStreak: 0 },
      dueRecallCount: 2,
      alreadyShown: notShownYet,
    });
    expect(result?.kind).toBe("recall");
    expect(result?.body).toContain("2");
  });

  it("uses singular phrasing for exactly 1 due recall item", () => {
    const result = decideReminder({
      streakRisk: { hasActiveStreak: false, isAtRisk: false, currentStreak: 0 },
      dueRecallCount: 1,
      alreadyShown: notShownYet,
    });
    expect(result?.body).toBe("Bạn có 1 bài ôn tập đến hạn hôm nay.");
  });

  it("suppresses a reminder kind already shown today", () => {
    const result = decideReminder({
      streakRisk: { hasActiveStreak: true, isAtRisk: true, currentStreak: 5 },
      dueRecallCount: 2,
      alreadyShown: alreadyShownAll,
    });
    expect(result).toBeNull();
  });

  it("falls through to recall if only the streak kind was already shown", () => {
    const result = decideReminder({
      streakRisk: { hasActiveStreak: true, isAtRisk: true, currentStreak: 5 },
      dueRecallCount: 2,
      alreadyShown: (kind) => kind === "streak",
    });
    expect(result?.kind).toBe("recall");
  });
});
