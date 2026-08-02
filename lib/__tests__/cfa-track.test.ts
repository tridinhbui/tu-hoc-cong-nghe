import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { CFA_LEVEL_1_SUBJECTS } from "@/lib/cfa-track";

/**
 * The CFA track is a cross-reference layer: each subject lists ids of lessons
 * that already exist elsewhere. Nothing type-checks those ids - they are plain
 * numbers - so a lesson renumbered or removed leaves a subject quietly
 * pointing at nothing, and the page renders one fewer row than it claims.
 *
 * lib/cfa-track.ts had no tests at all before this file, while the personal
 * and professional tracks each had coverage tests. That asymmetry is how the
 * whole track ended up with no navbar entry too: nothing was watching it.
 */

interface LessonMetaRow {
  id: number;
  slug: string;
  title: string;
}

const lessons: LessonMetaRow[] = JSON.parse(
  readFileSync(new URL("../lessons-data/_index.json", import.meta.url), "utf8")
);
const byId = new Map(lessons.map((l) => [l.id, l]));

describe("CFA Level I subject map", () => {
  it("points only at lessons that exist", () => {
    const dangling: string[] = [];
    for (const subject of CFA_LEVEL_1_SUBJECTS) {
      for (const id of subject.lessonIds) {
        if (!byId.has(id)) dangling.push(`${subject.id} -> ${id}`);
      }
    }
    expect(dangling, "môn CFA trỏ tới bài học không tồn tại").toEqual([]);
  });

  it("lists no lesson twice inside one subject", () => {
    for (const subject of CFA_LEVEL_1_SUBJECTS) {
      const dupes = subject.lessonIds.filter((id, i) => subject.lessonIds.indexOf(id) !== i);
      expect(dupes, `${subject.id} lặp lại bài học`).toEqual([]);
    }
  });

  it("gives every subject a unique id and at least one lesson", () => {
    const ids = CFA_LEVEL_1_SUBJECTS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    // A subject with no lessons renders as an empty section rather than the
    // "sẽ xây trong tương lai" state, which reads as a broken page.
    for (const subject of CFA_LEVEL_1_SUBJECTS) {
      expect(subject.lessonIds.length, `${subject.id} không có bài nào`).toBeGreaterThan(0);
    }
  });

  it("keeps all ten official Level I subjects", () => {
    // Dropping one silently shrinks the syllabus a candidate is studying from.
    expect(CFA_LEVEL_1_SUBJECTS).toHaveLength(10);
    for (const id of [
      "ethics",
      "quant",
      "economics",
      "fsa",
      "corporate",
      "equity",
      "fixedIncome",
      "derivatives",
      "alternatives",
      "portfolio",
    ]) {
      expect(
        CFA_LEVEL_1_SUBJECTS.some((s) => s.id === id),
        `thiếu môn ${id}`
      ).toBe(true);
    }
  });

  it("states every weight as a parseable range", () => {
    for (const subject of CFA_LEVEL_1_SUBJECTS) {
      const match = subject.weight.match(/(\d+)\D+(\d+)\s*%/);
      expect(match, `${subject.id} có trọng số không đọc được: "${subject.weight}"`).not.toBeNull();
      const [, lo, hi] = match!;
      expect(Number(lo), subject.id).toBeLessThan(Number(hi));
    }
  });
});

describe("the CFA track is reachable", () => {
  it("has a link in the navbar, not just a prefetch", () => {
    // Prefetching a route is not the same as offering it. The navbar listed
    // "/cfa" in useRoutePrefetch while no NAV_SECTIONS entry pointed at it, so
    // the app warmed a page nobody could click to.
    const navbar = readFileSync(new URL("../../components/AppNavbar.tsx", import.meta.url), "utf8");
    const sections = navbar.slice(
      navbar.indexOf("const NAV_SECTIONS"),
      navbar.indexOf("// Single, persistent top navbar")
    );
    expect(sections).toContain('href: "/cfa"');
  });
});
