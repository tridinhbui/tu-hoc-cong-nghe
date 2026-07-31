import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { isLessonInRange, TRACK_PERSONAL, TRACK_PROFESSIONAL } from "@/lib/track-stages";
import { FINANCE_CAREERS } from "@/lib/finance-careers";

/**
 * A stage reaches learners two ways: the day-by-day dashboard, and the study
 * plan of some career on /nghe-nghiep-hoc. The second is how anyone browsing by
 * job ever discovers it. A stage no career points at is invisible to that whole
 * entry path, and nothing reports it.
 *
 * That had happened to eleven stages, including several written for a specific
 * job: all six Định lượng lessons with a `quant` career in the catalog, all four
 * Private markets lessons with a `pe-vc-analyst` career, the whole VN
 * accounting-standards stage with `tax-advisory` and `accountant` sitting there.
 *
 * Deliberately NOT asserted: that every lesson is reachable. relatedLessonSlugs
 * is a curated 5-14 item shortlist per career, not an index - 381 of 563 lessons
 * are in no plan and that is the intended design. The invariant is one level up:
 * every stage contributes at least one lesson to at least one career.
 */

interface LessonMetaRow {
  id: number;
  slug: string;
}

const lessons: LessonMetaRow[] = JSON.parse(
  readFileSync(new URL("../lessons-data/_index.json", import.meta.url), "utf8")
);

const inSomePlan = new Set(FINANCE_CAREERS.flatMap((c) => c.relatedLessonSlugs));

const ALL_STAGES = [
  ...TRACK_PERSONAL.stages.map((s) => ({ track: "personal", ...s })),
  ...TRACK_PROFESSIONAL.stages.map((s) => ({ track: "professional", ...s })),
];

describe("stage → career reachability", () => {
  it("gives every stage at least one lesson some career points at", () => {
    const unreachable = ALL_STAGES.filter((stage) => {
      const stageLessons = lessons.filter((l) => isLessonInRange(l.id, stage));
      // An empty stage is track-stage-coverage.test.ts's problem, not this one.
      if (stageLessons.length === 0) return false;
      return !stageLessons.some((l) => inSomePlan.has(l.slug));
    }).map((s) => `${s.track}/${s.label} — ${s.name}`);

    expect(
      unreachable,
      "no career links to any lesson in these stages, so browsing by job never surfaces them"
    ).toEqual([]);
  });

  it("keeps study plans short enough to still be a plan", () => {
    // The cheap way to satisfy the test above is to staple every new stage onto
    // one career. A plan past ~16 entries stops reading as "study these" and
    // starts reading as a category listing, which is what the stage view is for.
    const bloated = FINANCE_CAREERS.filter((c) => c.relatedLessonSlugs.length > 16).map(
      (c) => `${c.id} (${c.relatedLessonSlugs.length})`
    );
    expect(bloated).toEqual([]);
  });
});
