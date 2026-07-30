import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { SKILL_DOMAINS } from "@/lib/career-competency";

/**
 * SKILL_DOMAINS assigns lessons to skill areas by hard-coded id list, and
 * those lists drive the competency percentages on /su-nghiep and the Job
 * Skill Gap panel. A lesson in no domain contributes to nothing: a learner
 * finishes it and every number they are shown stays where it was.
 *
 * That had happened to 121 lessons - every id at or above 1400, so all of
 * Chặng 16 and 22-30. Writing a stage and forgetting this file gives no
 * signal at all, because the failure mode is a number that simply does not
 * move. Two of those stages were the data track added for the data careers,
 * whose own baseline requires `quant` at 65% - a requirement the track built
 * to satisfy it fed nothing into.
 *
 * The allowlist below is deliberately tiny and explicit rather than a range:
 * a new orphan should have to argue for itself in review.
 */

interface LessonMetaRow {
  id: number;
  slug: string;
  title: string;
}

const lessons: LessonMetaRow[] = JSON.parse(
  readFileSync(new URL("../lessons-data/_index.json", import.meta.url), "utf8")
);

/** Lessons that legitimately belong to no skill domain, because they teach no
 *  skill: motivation, a sales-KPI discussion, and a careers overview. */
const NON_SKILL_LESSONS = new Set([
  1030, // 3 Điều Nản Khi Học Tài Chính
  1248, // Bán chéo sản phẩm ngân hàng & KPI của RM
  1484, // Kỹ năng nghề, Bài 4: Lộ trình nghề
]);

const domainLessonIds = new Set(SKILL_DOMAINS.flatMap((d) => d.lessonIds));

describe("skill domain coverage", () => {
  it("puts every lesson in at least one skill domain", () => {
    const orphans = lessons
      .filter((l) => !domainLessonIds.has(l.id) && !NON_SKILL_LESSONS.has(l.id))
      .map((l) => `${l.id} ${l.slug}`);

    expect(
      orphans,
      "these lessons move no competency number, so completing them shows the learner nothing"
    ).toEqual([]);
  });

  it("does not list lesson ids that no lesson has", () => {
    // The mirror failure: an id kept in a domain after the lesson was renumbered
    // or removed inflates that domain's denominator, so its coverage can never
    // reach 100% and the gap panel keeps asking for a lesson that isn't there.
    const lessonIds = new Set(lessons.map((l) => l.id));
    const ghosts = [...domainLessonIds].filter((id) => !lessonIds.has(id)).sort((a, b) => a - b);

    expect(ghosts, "these ids are in a domain but match no lesson").toEqual([]);
  });

  it("keeps every domain non-empty", () => {
    const empty = SKILL_DOMAINS.filter((d) => d.lessonIds.length === 0).map((d) => d.id);
    expect(empty).toEqual([]);
  });

  it("keeps the non-skill allowlist honest", () => {
    // If one of these gets assigned to a domain later, the entry here is dead
    // and should go - otherwise the allowlist slowly becomes a place to hide
    // orphans, which is what it exists to prevent.
    const stale = [...NON_SKILL_LESSONS].filter((id) => domainLessonIds.has(id));
    expect(stale, "allowlisted but now in a domain - drop it from the allowlist").toEqual([]);
  });
});
