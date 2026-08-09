import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
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

/**
 * Generalises the /cfa finding. That page had a full feature behind it and no
 * inbound link - reachable only by typing the URL - and nothing caught it
 * because an unreachable page renders perfectly well on its own.
 *
 * Sweeping every route under app/(app) turned up one more of the same shape:
 * /nghe-nghiep-hoc, a 288-line career learning-path page that nothing linked
 * to. The two redirect stubs are listed explicitly rather than pattern-matched,
 * so a page that quietly becomes a stub still has to be justified here.
 */
describe("every app route is reachable", () => {
  const APP_DIR = new URL("../../app/(app)/", import.meta.url);

  // Routes that legitimately have no menu entry, with the reason.
  const EXEMPT: Record<string, string> = {
    "cua-hang": "redirect stub -> /game?building=shop",
    "bang-tin": "redirect stub -> /finsocial",
    rpg: "redirect stub -> /game?building=shop",
    "nguoi-hoc": "dynamic [userId], linked from Leaderboard rows",
    "bai-hoc": "dynamic [slug], linked from every lesson list",
    profile: "reached from the avatar menu, not a nav item",
    settings: "reached from the avatar menu, not a nav item",
  };

  it("has an inbound link, or a stated reason not to", () => {
    const routes = readdirSync(APP_DIR, { withFileTypes: true })
      .filter((e) => e.isDirectory() && !e.name.startsWith("[") && !e.name.startsWith("_"))
      .map((e) => e.name);

    // Search the component and app trees for a link to each route.
    const haystack = [
      ...collectSources(new URL("../../components/", import.meta.url)),
      ...collectSources(APP_DIR),
    ].join("\n");

    const orphans = routes.filter((r) => {
      if (EXEMPT[r]) return false;
      return !new RegExp(`["'\`]/${r}(["'\`?/])`).test(haystack);
    });
    expect(orphans, "route không có đường vào nào").toEqual([]);
  });
});

function collectSources(dir: URL): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const child = new URL(entry.name + (entry.isDirectory() ? "/" : ""), dir);
    if (entry.isDirectory()) out.push(...collectSources(child));
    else if (/\.tsx?$/.test(entry.name)) out.push(readFileSync(child, "utf8"));
  }
  return out;
}
