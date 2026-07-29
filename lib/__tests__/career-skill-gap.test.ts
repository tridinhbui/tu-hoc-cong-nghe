import { describe, it, expect } from "vitest";
import type { SkillDomainId } from "@/lib/career-competency";
import {
  CERTIFICATION_TARGETS,
  computeSkillGap,
  getRequirementsForTarget,
  type CareerLike,
  type SkillRequirement,
} from "@/lib/career-skill-gap";

// The gap panel is a to-do list: the ordering and the readiness number are the
// product, so they're what's pinned here.

type Coverage = Record<SkillDomainId, { done: number; total: number; percent: number }>;

/** Coverage map where every unlisted domain is 0%. */
function coverageOf(entries: Partial<Record<SkillDomainId, { done: number; total: number; percent: number }>>): Coverage {
  return new Proxy(entries as Coverage, {
    get: (target, prop: string) => target[prop as SkillDomainId] ?? { done: 0, total: 0, percent: 0 },
  });
}

const meta = new Proxy({} as Record<SkillDomainId, { label: string; gapHint: string }>, {
  get: (_t, prop: string) => ({ label: `label:${prop}`, gapHint: `hint:${prop}` }),
});

const must = (domain: SkillDomainId, target: number): SkillRequirement => ({ domain, target, priority: "must" });
const should = (domain: SkillDomainId, target: number): SkillRequirement => ({ domain, target, priority: "should" });

describe("computeSkillGap", () => {
  it("reports a met requirement with no gap and nothing left to study", () => {
    const gap = computeSkillGap(
      [must("valuation", 60)],
      coverageOf({ valuation: { done: 8, total: 10, percent: 80 } }),
      meta
    );
    const item = gap.items[0];
    expect(item.met).toBe(true);
    expect(item.gap).toBe(0);
    expect(item.lessonsToGo).toBe(0);
    expect(gap.readiness).toBe(100);
  });

  it("floors the gap at zero when coverage overshoots the target", () => {
    const gap = computeSkillGap(
      [must("accounting", 50)],
      coverageOf({ accounting: { done: 10, total: 10, percent: 100 } }),
      meta
    );
    expect(gap.items[0].gap).toBe(0);
    // Overshooting must not push readiness above 100.
    expect(gap.readiness).toBe(100);
  });

  it("rounds lessonsToGo up - a partial lesson still needs taking", () => {
    // 70% of 10 lessons = 7 needed, 3 done => 4 to go.
    const gap = computeSkillGap(
      [must("ma", 70)],
      coverageOf({ ma: { done: 3, total: 10, percent: 30 } }),
      meta
    );
    expect(gap.items[0].lessonsToGo).toBe(4);
    expect(gap.items[0].gap).toBe(40);
  });

  it("sorts unmet before met, must before should, then biggest gap first", () => {
    const gap = computeSkillGap(
      [
        should("ethics", 40), // unmet, should, gap 40
        must("valuation", 60), // met
        must("ma", 80), // unmet, must, gap 80
        must("accounting", 60), // unmet, must, gap 30
      ],
      coverageOf({
        valuation: { done: 7, total: 10, percent: 70 },
        accounting: { done: 3, total: 10, percent: 30 },
      }),
      meta
    );
    expect(gap.items.map((i) => i.domain)).toEqual(["ma", "accounting", "ethics", "valuation"]);
  });

  it("weights must requirements twice as heavily as should", () => {
    // One `must` fully met, one `should` at zero: 2/(2+1) = 67%.
    const gap = computeSkillGap(
      [must("valuation", 50), should("ethics", 50)],
      coverageOf({ valuation: { done: 5, total: 10, percent: 50 } }),
      meta
    );
    expect(gap.readiness).toBe(67);
  });

  it("returns zero readiness with no requirements rather than dividing by zero", () => {
    const gap = computeSkillGap([], coverageOf({}), meta);
    expect(gap.items).toEqual([]);
    expect(gap.readiness).toBe(0);
    expect(Number.isFinite(gap.readiness)).toBe(true);
  });

  it("treats a zero-target requirement as already satisfied, not NaN", () => {
    const gap = computeSkillGap([must("quant", 0)], coverageOf({}), meta);
    expect(gap.items[0].met).toBe(true);
    expect(gap.readiness).toBe(100);
  });

  it("handles a domain with no lessons without producing NaN", () => {
    const gap = computeSkillGap(
      [must("derivatives_risk", 60)],
      coverageOf({ derivatives_risk: { done: 0, total: 0, percent: 0 } }),
      meta
    );
    expect(gap.items[0].lessonsToGo).toBe(0);
    expect(Number.isFinite(gap.readiness)).toBe(true);
  });

  it("carries the domain label and hint through for the panel", () => {
    const gap = computeSkillGap([must("ethics", 90)], coverageOf({}), meta);
    expect(gap.items[0].label).toBe("label:ethics");
    expect(gap.items[0].gapHint).toBe("hint:ethics");
  });
});

describe("getRequirementsForTarget", () => {
  const career = (over: Partial<CareerLike> = {}): CareerLike => ({
    id: "some-career",
    category: "investment",
    ...over,
  });

  it("returns nothing for no target so the panel prompts instead of guessing", () => {
    expect(getRequirementsForTarget(null)).toEqual([]);
  });

  it("resolves a certification id ahead of any career lookup", () => {
    expect(getRequirementsForTarget(null, "cfa-level-1")).toEqual(CERTIFICATION_TARGETS["cfa-level-1"].requirements);
  });

  it("falls back to the category baseline for a career with no hand-written profile", () => {
    const reqs = getRequirementsForTarget(career({ id: "not-hand-written" }));
    expect(reqs.length).toBeGreaterThan(0);
    expect(reqs.map((r) => r.domain)).toContain("valuation");
  });

  it("uses the hand-written profile when one exists", () => {
    const reqs = getRequirementsForTarget(career({ id: "investment-banking", category: "investment" }));
    const ma = reqs.find((r) => r.domain === "ma");
    expect(ma).toEqual({ domain: "ma", target: 80, priority: "must" });
  });

  it("adds domains implied by the career's CFA subjects", () => {
    const reqs = getRequirementsForTarget(
      career({ id: "not-hand-written", relatedCfaSubjectIds: ["ethics", "derivatives"] })
    );
    expect(reqs.map((r) => r.domain)).toEqual(expect.arrayContaining(["ethics", "derivatives_risk"]));
  });

  it("deduplicates domains, keeping the higher target and the stronger priority", () => {
    // investment-banking already requires accounting at 70/must; "fsa" maps to
    // accounting at 50/should and must not weaken or duplicate it.
    const reqs = getRequirementsForTarget(
      career({ id: "investment-banking", relatedCfaSubjectIds: ["fsa"] })
    );
    const accounting = reqs.filter((r) => r.domain === "accounting");
    expect(accounting).toHaveLength(1);
    expect(accounting[0]).toEqual({ domain: "accounting", target: 70, priority: "must" });
  });

  it("ignores CFA subject ids it has no domain mapping for", () => {
    const reqs = getRequirementsForTarget(
      career({ id: "not-hand-written", relatedCfaSubjectIds: ["not-a-subject"] })
    );
    expect(reqs.every((r) => typeof r.domain === "string")).toBe(true);
  });

  it("produces one requirement per domain for every real career shape", () => {
    for (const category of ["investment", "accounting", "banking", "advisory"] as const) {
      const reqs = getRequirementsForTarget(career({ id: `x-${category}`, category }));
      const domains = reqs.map((r) => r.domain);
      expect(new Set(domains).size).toBe(domains.length);
    }
  });
});
