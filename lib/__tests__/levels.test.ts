import { describe, it, expect } from "vitest";
import { getLevelByXp, getXpToNextLevel, getLevelProgress, getNextLevel, getCfaGateRemaining, LEVELS, getDomainLevelByXp, getDomainLevelProgress, calculateOverallLevel } from "@/lib/levels";

describe("getLevelByXp", () => {
  it("returns level 1 for 0 xp", () => {
    expect(getLevelByXp(0).level).toBe(1);
  });

  it("returns the highest level whose minXp is met", () => {
    expect(getLevelByXp(100).level).toBe(2);
    expect(getLevelByXp(299).level).toBe(2);
    expect(getLevelByXp(300).level).toBe(3);
  });

  it("gates level 9 behind minCfaCompleted even with enough XP", () => {
    // 7000+ XP alone isn't enough - level 9 also requires 5 CFA items done.
    expect(getLevelByXp(9000, 0).level).toBe(8);
    expect(getLevelByXp(9000, 4).level).toBe(8);
    expect(getLevelByXp(9000, 5).level).toBe(9);
  });

  it("never returns below level 1 for negative/garbage xp", () => {
    expect(getLevelByXp(-100).level).toBe(1);
  });
});

describe("getCfaGateRemaining", () => {
  it("returns 0 for levels with no CFA requirement", () => {
    const level4 = LEVELS.find((l) => l.level === 4)!;
    expect(getCfaGateRemaining(level4, 0)).toBe(0);
  });

  it("returns the remaining count needed to clear the gate", () => {
    const level9 = LEVELS.find((l) => l.level === 9)!;
    expect(getCfaGateRemaining(level9, 2)).toBe(3);
    expect(getCfaGateRemaining(level9, 5)).toBe(0);
  });

  it("never returns negative when the user has more than required", () => {
    const level9 = LEVELS.find((l) => l.level === 9)!;
    expect(getCfaGateRemaining(level9, 10)).toBe(0);
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
    expect(getXpToNextLevel(0)).toBe(100);
    expect(getXpToNextLevel(50)).toBe(50);
  });

  it("returns 0 once at max level (XP alone, ignoring the CFA gate)", () => {
    const maxLevelXp = LEVELS[LEVELS.length - 1].minXp;
    expect(getXpToNextLevel(maxLevelXp)).toBe(0);
  });
});

describe("getLevelProgress", () => {
  it("returns 0% right at a level's threshold", () => {
    expect(getLevelProgress(100)).toBe(0);
  });

  it("returns 100% at max level", () => {
    const maxLevelXp = LEVELS[LEVELS.length - 1].minXp;
    expect(getLevelProgress(maxLevelXp)).toBe(100);
  });

  it("returns a proportional percentage mid-level", () => {
    // Level 1 -> 2 spans 0-100 xp; 50 xp in is 50%.
    expect(getLevelProgress(50)).toBe(50);
  });

  it("clamps progress at 100% when XP is past a gated next level", () => {
    expect(getLevelProgress(9000, 0)).toBe(100);
  });
});

describe("Domain Mastery Calculations", () => {
  it("calculates correct domain level based on domain XP", () => {
    expect(getDomainLevelByXp(0)).toBe(1);
    expect(getDomainLevelByXp(100)).toBe(1);
    expect(getDomainLevelByXp(300)).toBe(2);
    expect(getDomainLevelByXp(666)).toBe(3);
  });

  it("calculates domain progress % accurately", () => {
    // Level 1 to 2: spans 0 to 300 XP. 150 XP is 50%
    expect(getDomainLevelProgress(150)).toBe(50);
  });

  it("calculates overall level from weighted domain levels", () => {
    const domainLevels = {
      accounting: 2,
      valuation: 3,
      corporate_finance: 2,
      economics: 1,
      investment: 1,
      risk_management: 1,
      ai_for_finance: 1,
    };
    expect(calculateOverallLevel(domainLevels)).toBe(11);
  });
});

