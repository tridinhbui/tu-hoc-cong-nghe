import { describe, expect, it } from "vitest";
import {
  MOTIVATION_MESSAGES,
  getDailyMotivation,
  selectTone,
  warmthFor,
  wrapQuoteLines,
  type MotivationSignals,
} from "../daily-motivation";

const base: MotivationSignals = {
  currentStreak: 5,
  hasActivityToday: true,
  daysSinceLastActivity: 0,
  lostStreak: 0,
};

describe("selectTone", () => {
  it("uu tien streak vua dut hon ca viec vang mat", () => {
    expect(
      selectTone({ ...base, currentStreak: 0, lostStreak: 12, daysSinceLastActivity: 5 }),
    ).toBe("rekindle");
  });

  it("vang tu 3 ngay tro len thi doi sang giong quay lai", () => {
    const away = { ...base, hasActivityToday: false, currentStreak: 0 };
    expect(selectTone({ ...away, daysSinceLastActivity: 3 })).toBe("return");
    expect(selectTone({ ...away, daysSinceLastActivity: 2 })).not.toBe("return");
  });

  // Hai tín hiệu này đọc từ hai nguồn khác nhau nên lệch nhau được: bảng streak
  // cập nhật khi hoàn thành bài, còn hoạt động hôm nay ghi nhận sớm hơn. Khi
  // lệch, người vừa học xong hôm nay từng bị chào "chào mừng quay lại".
  it("da hoc hom nay thi khong bao gio nhan giong quay lai", () => {
    expect(
      selectTone({ ...base, hasActivityToday: true, daysSinceLastActivity: 9 }),
    ).not.toBe("return");
  });

  it("chi an mung moc khi da hoc trong hom nay", () => {
    expect(selectTone({ ...base, currentStreak: 7, hasActivityToday: true })).toBe("milestone");
    expect(selectTone({ ...base, currentStreak: 7, hasActivityToday: false })).toBe("keep");
  });

  it("ngay thuong da hoc roi thi ve giong steady", () => {
    expect(selectTone(base)).toBe("steady");
  });
});

describe("warmth", () => {
  it("cang nguoi thi cang am", () => {
    expect(warmthFor("rekindle")).toBeGreaterThan(warmthFor("return"));
    expect(warmthFor("return")).toBeGreaterThan(warmthFor("keep"));
    expect(warmthFor("keep")).toBeGreaterThan(warmthFor("steady"));
  });
});

describe("getDailyMotivation", () => {
  it("on dinh trong cung mot ngay va doi sang ngay hom sau", () => {
    const a = getDailyMotivation("user-1", base, "2026-08-02");
    const b = getDailyMotivation("user-1", base, "2026-08-02");
    expect(a.message.id).toBe(b.message.id);

    const nextDays = ["2026-08-03", "2026-08-04", "2026-08-05", "2026-08-06"].map(
      (d) => getDailyMotivation("user-1", base, d).message.id,
    );
    expect(nextDays.some((id) => id !== a.message.id)).toBe(true);
  });

  it("luon tra ve loi nhan dung tone", () => {
    const result = getDailyMotivation("user-2", { ...base, currentStreak: 0, lostStreak: 9 });
    expect(result.tone).toBe("rekindle");
    expect(result.message.tone).toBe("rekindle");
  });
});

describe("wrapQuoteLines", () => {
  it("khong bao gio che doi mot tu", () => {
    for (const message of MOTIVATION_MESSAGES) {
      const lines = wrapQuoteLines(message.text);
      expect(lines.join(" ")).toBe(message.text.split(/\s+/).join(" "));
    }
  });

  it("giu moi dong trong gioi han tru khi ban than tu da dai hon", () => {
    for (const message of MOTIVATION_MESSAGES) {
      for (const line of wrapQuoteLines(message.text, 34)) {
        const isSingleLongWord = !line.includes(" ");
        expect(line.length <= 34 || isSingleLongWord).toBe(true);
      }
    }
  });

  it("moi cau deu vua trong card chia se (toi da 8 dong)", () => {
    for (const message of MOTIVATION_MESSAGES) {
      expect(wrapQuoteLines(message.text).length).toBeLessThanOrEqual(8);
    }
  });

  it("chuoi rong tra ve mang rong", () => {
    expect(wrapQuoteLines("   ")).toEqual([]);
  });
});

describe("pool", () => {
  it("moi tone deu co du cau va khong trung id", () => {
    const ids = new Set(MOTIVATION_MESSAGES.map((m) => m.id));
    expect(ids.size).toBe(MOTIVATION_MESSAGES.length);

    for (const tone of ["rekindle", "return", "milestone", "keep", "steady"] as const) {
      expect(MOTIVATION_MESSAGES.filter((m) => m.tone === tone).length).toBeGreaterThanOrEqual(6);
    }
  });
});
