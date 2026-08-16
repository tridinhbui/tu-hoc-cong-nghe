import { describe, it, expect } from "vitest";
import {
  masteryTier,
  buildSectionMastery,
  rankPoints,
  rankFor,
  modeLocks,
  recommendedSection,
  nextObjective,
  phaseFor,
  sortByPhase,
  MOCK_MILESTONE_SECTIONS,
  KHO_REQUIRED_STRONG,
  MASTERY_MIN_ATTEMPTS,
  RANKS,
  type SectionMastery,
} from "@/lib/ib-progression";
import { IB_TECHNICAL_QUESTIONS, getIbCategoryCounts } from "@/lib/ib-question-bank";

const BANK = getIbCategoryCounts(IB_TECHNICAL_QUESTIONS).map((c) => ({
  category: c.category,
  label: c.label,
  count: c.count,
}));

function section(over: Partial<SectionMastery> & { category: string }): SectionMastery {
  return {
    label: over.category,
    tier: "untested",
    total: 20,
    attempted: 0,
    correct: 0,
    accuracy: 0,
    ...over,
  } as SectionMastery;
}

describe("masteryTier", () => {
  it("calls anything under the signal threshold untested, not weak", () => {
    // 0/4 is a terrible-looking record and still says nothing - four questions
    // is not a judgement about a 33-question section.
    expect(masteryTier({ attempted: 4, accuracy: 0 })).toBe("untested");
    expect(masteryTier({ attempted: 5, accuracy: 0 })).toBe("weak");
  });

  it("holds a perfect but thin record at strong, never mastered", () => {
    expect(masteryTier({ attempted: MASTERY_MIN_ATTEMPTS - 1, accuracy: 100 })).toBe("strong");
    expect(masteryTier({ attempted: MASTERY_MIN_ATTEMPTS, accuracy: 100 })).toBe("mastered");
  });

  it("puts each accuracy band in its tier", () => {
    expect(masteryTier({ attempted: 20, accuracy: 59 })).toBe("weak");
    expect(masteryTier({ attempted: 20, accuracy: 60 })).toBe("improving");
    expect(masteryTier({ attempted: 20, accuracy: 74 })).toBe("improving");
    expect(masteryTier({ attempted: 20, accuracy: 75 })).toBe("strong");
    expect(masteryTier({ attempted: 20, accuracy: 89 })).toBe("strong");
    expect(masteryTier({ attempted: 20, accuracy: 90 })).toBe("mastered");
  });
});

describe("buildSectionMastery", () => {
  it("lists every section of the bank, including ones never attempted", () => {
    const built = buildSectionMastery([], BANK);
    expect(built).toHaveLength(BANK.length);
    expect(built.every((s) => s.tier === "untested")).toBe(true);
    // Totals come from the bank, not from the attempt record.
    expect(built.reduce((n, s) => n + s.total, 0)).toBe(IB_TECHNICAL_QUESTIONS.length);
  });

  it("merges measured performance onto the matching section", () => {
    const target = BANK[0];
    const built = buildSectionMastery(
      [{ category: target.category, label: target.label, attempted: 20, correct: 19, accuracy: 95 }],
      BANK
    );
    const merged = built.find((s) => s.category === target.category)!;
    expect(merged.tier).toBe("mastered");
    expect(merged.attempted).toBe(20);
    // The others are untouched rather than dropped.
    expect(built.filter((s) => s.tier === "untested")).toHaveLength(BANK.length - 1);
  });
});

describe("rank", () => {
  it("scores untested and weak identically at zero", () => {
    const sections = [section({ category: "a", tier: "untested" }), section({ category: "b", tier: "weak" })];
    expect(rankPoints(sections)).toBe(0);
    expect(rankFor(0).id).toBe("candidate");
  });

  it("reports progress inside the current band, not overall", () => {
    const intern = RANKS[1];
    const analyst1 = RANKS[2];
    const midway = Math.round((intern.minPoints + analyst1.minPoints) / 2);
    const state = rankFor(midway);
    expect(state.id).toBe("intern");
    expect(state.nextId).toBe("analyst1");
    expect(state.pointsToNext).toBe(analyst1.minPoints - midway);
    expect(state.progressPct).toBeGreaterThan(30);
    expect(state.progressPct).toBeLessThan(70);
  });

  it("tops out without a next band", () => {
    const top = RANKS[RANKS.length - 1];
    const state = rankFor(top.minPoints + 10);
    expect(state.id).toBe(top.id);
    expect(state.nextId).toBeNull();
    expect(state.progressPct).toBe(100);
  });

  it("is reachable: mastering every section clears the top rank", () => {
    const all = BANK.map((b) => section({ category: b.category, tier: "mastered" }));
    expect(rankPoints(all)).toBeGreaterThanOrEqual(RANKS[RANKS.length - 1].minPoints);
  });
});

describe("modeLocks", () => {
  it("leaves the two entry modes open so a new account has something to run", () => {
    const locks = modeLocks(buildSectionMastery([], BANK));
    expect(locks.de.unlocked).toBe(true);
    expect(locks["tat-ca"].unlocked).toBe(true);
    expect(locks.kho.unlocked).toBe(false);
    expect(locks.mock.unlocked).toBe(false);
  });

  it("opens the pressure round at exactly KHO_REQUIRED_STRONG strong sections", () => {
    const strong = (n: number) =>
      BANK.map((b, i) => section({ category: b.category, tier: i < n ? "strong" : "untested" }));
    expect(modeLocks(strong(KHO_REQUIRED_STRONG - 1)).kho.unlocked).toBe(false);
    expect(modeLocks(strong(KHO_REQUIRED_STRONG - 1)).kho.remaining).toBe(1);
    expect(modeLocks(strong(KHO_REQUIRED_STRONG)).kho.unlocked).toBe(true);
  });

  it("gates the mock on the accounting + valuation sections specifically", () => {
    // Every OTHER section mastered still does not open it - the milestone names
    // four sections, and mastery elsewhere is not a substitute for them.
    const elsewhere = BANK.map((b) =>
      section({
        category: b.category,
        tier: MOCK_MILESTONE_SECTIONS.includes(b.category) ? "untested" : "mastered",
      })
    );
    expect(modeLocks(elsewhere).mock.unlocked).toBe(false);
    expect(modeLocks(elsewhere).mock.remaining).toBe(MOCK_MILESTONE_SECTIONS.length);

    const milestone = BANK.map((b) =>
      section({
        category: b.category,
        tier: MOCK_MILESTONE_SECTIONS.includes(b.category) ? "strong" : "untested",
      })
    );
    expect(modeLocks(milestone).mock.unlocked).toBe(true);
  });

  it("names milestone sections that actually exist in the bank", () => {
    // A typo here would silently make the mock unreachable forever.
    for (const category of MOCK_MILESTONE_SECTIONS) {
      expect(BANK.some((b) => b.category === category)).toBe(true);
    }
  });
});

describe("recommendedSection", () => {
  it("prefers a measured weak section over an untested one", () => {
    const sections = [
      section({ category: "untested-big", tier: "untested", total: 40 }),
      section({ category: "weak", tier: "weak", attempted: 10, accuracy: 30 }),
    ];
    expect(recommendedSection(sections)!.category).toBe("weak");
  });

  it("falls back to the largest untested section for a brand new account", () => {
    const sections = [
      section({ category: "small", tier: "untested", total: 3 }),
      section({ category: "big", tier: "untested", total: 33 }),
    ];
    expect(recommendedSection(sections)!.category).toBe("big");
  });

  it("returns null only for an empty bank", () => {
    expect(recommendedSection([])).toBeNull();
    expect(recommendedSection(buildSectionMastery([], BANK))).not.toBeNull();
  });
});

describe("nextObjective", () => {
  it("names the nearest locked thing first", () => {
    const fresh = buildSectionMastery([], BANK);
    expect(nextObjective(fresh, rankFor(rankPoints(fresh))).kind).toBe("unlock-kho");

    const strongEnough = BANK.map((b, i) => section({ category: b.category, tier: i < 4 ? "strong" : "untested" }));
    expect(nextObjective(strongEnough, rankFor(rankPoints(strongEnough))).kind).toBe("unlock-mock");
  });

  it("moves on to the rank once everything is unlocked", () => {
    const sections = BANK.map((b) => section({ category: b.category, tier: "strong" }));
    const objective = nextObjective(sections, rankFor(rankPoints(sections)));
    expect(objective.kind).toBe("next-rank");
    expect(objective.remaining).toBeGreaterThan(0);
  });
});

describe("round phases", () => {
  it("derives the phase from difficulty and the Basic/Advanced axis", () => {
    expect(phaseFor("de", "Accounting - Basic")).toBe("warmup");
    expect(phaseFor("de", "Accounting - Advanced")).toBe("core");
    expect(phaseFor("kho", "LBO Model - Basic")).toBe("core");
    expect(phaseFor("kho", "LBO Model - Advanced")).toBe("pressure");
    expect(phaseFor("de", "Brain Teaser")).toBe("warmup");
  });

  it("gives every phase real questions in the actual bank", () => {
    // The reason the phase rule uses two axes: the bank has zero `trung-binh`
    // questions, so a difficulty-only split would leave the middle phase empty.
    const counts = { warmup: 0, core: 0, pressure: 0 };
    for (const q of IB_TECHNICAL_QUESTIONS) counts[phaseFor(q.difficulty, q.category)]++;
    expect(counts.warmup).toBeGreaterThan(0);
    expect(counts.core).toBeGreaterThan(0);
    expect(counts.pressure).toBeGreaterThan(0);
  });

  it("orders a run warm-up first and pressure last", () => {
    const run = [
      { id: 1, phase: "pressure" as const },
      { id: 2, phase: "warmup" as const },
      { id: 3, phase: "core" as const },
      { id: 4, phase: "warmup" as const },
    ];
    expect(sortByPhase(run).map((q) => q.id)).toEqual([2, 4, 3, 1]);
  });
});
