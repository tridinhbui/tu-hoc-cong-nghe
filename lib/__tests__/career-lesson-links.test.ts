import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { FINANCE_CAREERS } from "@/lib/finance-careers";
import { CFA_LEVEL_1_SUBJECTS } from "@/lib/cfa-track";

/**
 * Every career on /su-nghiep renders a "học các bài này để chuẩn bị" study
 * plan built from `relatedLessonSlugs`, and a tracked career goal computes
 * progress from the same list (lib/supabase-career-goals.ts). A slug that
 * matches no lesson doesn't fail anywhere - it silently drops out of the plan
 * and quietly lowers the denominator of that goal's progress.
 *
 * The field's own comment says the slugs were "verified against
 * lib/lessons-data/_index.json". That was a one-time manual check by whoever
 * wrote each entry, which holds until someone renames a lesson slug - and a
 * rename is exactly the change that gives no signal. This locks it.
 *
 * Reads the generated index rather than lib/lessons.ts because that is where
 * slugs end up after generation, and because importing lessons.ts pulls the
 * whole ~68k-line corpus into the test process. `npm test` therefore assumes
 * `node scripts/generate-lesson-data.mjs` has run - which predev/prebuild both
 * do, and which `npm run audit:lessons` does explicitly.
 */

interface LessonMetaRow {
  id: number;
  slug: string;
}

const lessons: LessonMetaRow[] = JSON.parse(
  readFileSync(new URL("../lessons-data/_index.json", import.meta.url), "utf8")
);
const lessonSlugs = new Set(lessons.map((l) => l.slug));
const cfaSubjectIds = new Set(CFA_LEVEL_1_SUBJECTS.map((s) => s.id));

describe("career → lesson links", () => {
  it("resolves every relatedLessonSlug to a real lesson", () => {
    const broken: string[] = [];
    for (const career of FINANCE_CAREERS) {
      for (const slug of career.relatedLessonSlugs) {
        if (!lessonSlugs.has(slug)) broken.push(`${career.id} → ${slug}`);
      }
    }
    expect(broken, "these study-plan entries point at slugs no lesson has").toEqual([]);
  });

  it("gives every career at least one lesson to study", () => {
    const empty = FINANCE_CAREERS.filter((c) => c.relatedLessonSlugs.length === 0).map((c) => c.id);
    expect(empty, "a career with no lessons renders an empty study plan").toEqual([]);
  });

  it("resolves every relatedCfaSubjectId to a real CFA Level I subject", () => {
    const broken: string[] = [];
    for (const career of FINANCE_CAREERS) {
      for (const id of career.relatedCfaSubjectIds ?? []) {
        if (!cfaSubjectIds.has(id)) broken.push(`${career.id} → ${id}`);
      }
    }
    expect(broken, 'these render as "Liên quan CFA" tags pointing at nothing').toEqual([]);
  });

  it("keeps career ids unique", () => {
    const seen = new Set<string>();
    const duplicates: string[] = [];
    for (const career of FINANCE_CAREERS) {
      if (seen.has(career.id)) duplicates.push(career.id);
      seen.add(career.id);
    }
    // Career goals are stored by id (supabase career_goals.career_id), so a
    // duplicate would make a saved goal resolve to whichever entry happens to
    // come first in the array.
    expect(duplicates).toEqual([]);
  });

  it("has at least one career in every category the union allows", () => {
    // Adding a category to FinanceCareer["category"] means adding it to three
    // category-keyed maps in the UI; typecheck catches that. What it cannot
    // catch is the reverse - a category declared and left empty, which renders
    // as an empty group on the roadmap and an empty filter chip.
    const populated = new Set(FINANCE_CAREERS.map((c) => c.category));
    const declared: (typeof FINANCE_CAREERS)[number]["category"][] = [
      "investment",
      "accounting",
      "banking",
      "advisory",
      "data",
    ];
    expect(declared.filter((c) => !populated.has(c))).toEqual([]);
  });
});
