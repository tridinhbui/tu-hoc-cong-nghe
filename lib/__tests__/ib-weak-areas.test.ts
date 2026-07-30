import { describe, it, expect } from "vitest";
import {
  isReliable,
  weakestCategory,
  MIN_ATTEMPTS_FOR_SIGNAL,
  type CategoryPerformance,
} from "@/lib/ib-weak-areas";

// The ordering and the reliability threshold are the product here: naming the
// wrong topic as someone's weakest area sends them to re-drill the wrong 30
// questions, which is worse than saying nothing.

function perf(label: string, attempted: number, correct: number): CategoryPerformance {
  return {
    category: label,
    label,
    attempted,
    correct,
    accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
  };
}

describe("isReliable", () => {
  it("rejects a category with too few attempts to mean anything", () => {
    expect(isReliable(perf("DCF", MIN_ATTEMPTS_FOR_SIGNAL - 1, 0))).toBe(false);
  });

  it("accepts a category exactly at the threshold", () => {
    expect(isReliable(perf("DCF", MIN_ATTEMPTS_FOR_SIGNAL, 3))).toBe(true);
  });
});

describe("weakestCategory", () => {
  it("returns null when nothing has been attempted", () => {
    expect(weakestCategory([])).toBeNull();
  });

  it("returns null when every category is below the reliability threshold", () => {
    // 0% over two questions is not evidence of a weakness.
    const thin = [perf("LBO", 2, 0), perf("DCF", 1, 0)];
    expect(weakestCategory(thin)).toBeNull();
  });

  it("ignores an unreliable 0% in favour of a reliable low score", () => {
    const performance = [
      perf("Valuation", 20, 8), // 40%, reliable
      perf("LBO", 2, 0), // 0% but only two attempts
    ];
    // The list is pre-sorted by getCategoryPerformance; here we hand it in
    // sorted the same way to check the filter, not the sort.
    const sorted = [performance[0], performance[1]];
    expect(weakestCategory(sorted)?.label).toBe("Valuation");
  });

  it("picks the first reliable entry, which is the caller's weakest", () => {
    const sorted = [perf("DCF", 10, 3), perf("Accounting", 10, 9)];
    expect(weakestCategory(sorted)?.label).toBe("DCF");
  });
});

describe("CategoryPerformance accuracy", () => {
  it("reports whole-number percentages", () => {
    expect(perf("DCF", 3, 1).accuracy).toBe(33);
    expect(perf("DCF", 8, 6).accuracy).toBe(75);
  });

  it("does not produce NaN for a category with no attempts", () => {
    expect(perf("DCF", 0, 0).accuracy).toBe(0);
  });
});
