import { describe, it, expect } from "vitest";
import { getLevelByXp, getXpToNextLevel, getLevelProgress, getNextLevel, LEVELS } from "@/lib/levels";

describe("getLevelByXp", () => {
  it("returns level 1 for 0 xp", () => {
    expect(getLevelByXp(0).level).toBe(1);
  });

  it("returns the highest level whose minXp is met", () => {
    // Ngưỡng lấy từ LEVELS chứ không chép số vào đây: thang được cân lại
    // 09/08/2026 và bài này khoá cứng 100/300/600 nên nó đỏ vì con số đổi, chứ
    // không phải vì hàm sai. Điều cần kiểm là "trả về bậc CAO NHẤT đã đạt", và
    // câu đó không phụ thuộc con số nào.
    for (let i = 1; i < LEVELS.length; i++) {
      const min = LEVELS[i].minXp;
      expect(getLevelByXp(min).level, `${min} XP`).toBe(LEVELS[i].level);
      expect(getLevelByXp(min - 1).level, `${min - 1} XP`).toBe(LEVELS[i - 1].level);
    }
  });

  it("never returns below level 1 for negative/garbage xp", () => {
    expect(getLevelByXp(-100).level).toBe(1);
  });
});

describe("getNextLevel", () => {
  it("returns the next level definition", () => {
    expect(getNextLevel(1)?.level).toBe(2);
  });

  it("returns undefined past the max level", () => {
    const maxLevel = LEVELS[LEVELS.length - 1].level;
    expect(getNextLevel(maxLevel)).toBeUndefined();
  });
});

describe("getXpToNextLevel", () => {
  it("returns the xp gap to the next level's threshold", () => {
    const level2Xp = LEVELS[1].minXp;
    expect(getXpToNextLevel(0)).toBe(level2Xp);
    expect(getXpToNextLevel(level2Xp - 10)).toBe(10);
  });

  it("returns 0 once at max level", () => {
    const maxLevelXp = LEVELS[LEVELS.length - 1].minXp;
    expect(getXpToNextLevel(maxLevelXp)).toBe(0);
  });
});

describe("getLevelProgress", () => {
  it("returns 0% right at a level's threshold", () => {
    expect(getLevelProgress(LEVELS[1].minXp)).toBe(0);
  });

  it("returns 100% at max level", () => {
    const maxLevelXp = LEVELS[LEVELS.length - 1].minXp;
    expect(getLevelProgress(maxLevelXp)).toBe(100);
  });

  it("returns a proportional percentage mid-level", () => {
    // Nửa đường từ L1 lên L2 là 50%, dù ngưỡng L2 bằng bao nhiêu.
    expect(getLevelProgress(LEVELS[1].minXp / 2)).toBe(50);
  });

});


