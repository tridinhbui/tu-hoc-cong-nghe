import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * A nav badge only works if the row carrying it is on screen.
 *
 * The sidebar's sections all start folded, and only the section owning the
 * current page unfolds. So an entry inside a section is invisible on every
 * page but its own - fine for a shelf of destinations, wrong for a row with a
 * live prompt on it. Học nhóm pulses a CHECK-IN badge and Kiểm tra pulses
 * "Tin mới" when a news quiz is waiting; both were animating inside a folded
 * group, which is a prompt that effectively does not exist.
 *
 * There are two valid ways to fix that, and this file deliberately accepts
 * either: put the row above the sections, or force its section open for as
 * long as the prompt is live. The first was tried and reverted - five flat
 * rows above the groups cost more than the badges were worth - so the shipped
 * answer is the second. Pinning the test to one mechanism would have made a
 * better design fail the build, so the rule it enforces is the outcome:
 *
 *   a row that renders a badge must be reachable without the reader
 *   opening anything.
 *
 * Nothing in the type system says so. Both arrangements compile, and deleting
 * the force-open list leaves a navbar that looks entirely reasonable in a diff
 * while silently hiding every prompt again. Hence a source contract.
 */

const source = readFileSync(join(__dirname, "..", "..", "components/AppNavbar.tsx"), "utf8");

/** Text of the array literal assigned to a top-level const, brace-matched. */
function arrayLiteral(name: string): string {
  const start = source.indexOf(`const ${name}`);
  expect(start, `${name} not found in AppNavbar.tsx`).toBeGreaterThan(-1);
  // Anchor on the assignment, not on the first bracket: a type annotation like
  // `: NavLink[] =` carries a pair of its own, and matching from there returns
  // an empty string that then passes every "does not contain" assertion.
  const open = source.indexOf("[", source.indexOf("=", start));
  let depth = 0;
  for (let i = open; i < source.length; i += 1) {
    if (source[i] === "[") depth += 1;
    else if (source[i] === "]") {
      depth -= 1;
      if (depth === 0) return source.slice(open, i + 1);
    }
  }
  throw new Error(`unterminated array literal for ${name}`);
}

/** Source of a top-level const declaration, up to the next one. */
function declarationOf(name: string): string {
  const start = source.indexOf(`const ${name}`);
  expect(start, `${name} not found in AppNavbar.tsx`).toBeGreaterThan(-1);
  const next = source.indexOf("\n  const ", start + 1);
  return source.slice(start, next === -1 ? source.length : next);
}

const topLevel = arrayLiteral("TOP_LEVEL_LINKS");
const sections = arrayLiteral("NAV_SECTIONS");
const forcedOpen = arrayLiteral("badgedHrefs");

/** CHỈ lấy giá trị của `href:`, không lấy mọi chuỗi trông giống đường dẫn.
 *
 *  Bản cũ khớp bất kỳ `"/..."` nào trong khối, và điều đó đúng khi mỗi mục chỉ
 *  có một trường mang đường dẫn. Mục "Chứng chỉ" phá giả định ấy: nó dẫn tới
 *  /cfa và khai thêm `activePrefixes: ["/cfa", "/frm"]` để dòng vẫn sáng khi
 *  đang ở FRM. Đọc thô thì /cfa hiện hai lần và bộ kiểm báo trùng đích - trong
 *  khi vẫn chỉ có MỘT dòng dẫn tới đó.
 *
 *  Điều bộ kiểm này muốn nói là "không hai DÒNG cho một trang", nên nó phải
 *  đếm đúng cái quyết định dòng đi đâu. Sửa ở LUẬT chứ không thêm ngoại lệ. */
const hrefsIn = (block: string) => [...block.matchAll(/href:\s*"(\/[^"]*)"/g)].map((m) => m[1]);

/** Mọi đường dẫn trong một mảng CHUỖI TRẦN (`badgedHrefs`), nơi không có
 *  `href:` để bám vào. Tách khỏi `hrefsIn` chứ không nới nó ra: nới thì mục
 *  "Chứng chỉ" lại đếm hai lần đúng như trước. */
const pathsIn = (block: string) => [...block.matchAll(/"(\/[^"]*)"/g)].map((m) => m[1]);

/** The hrefs the component gives a conditional, prompt-style badge to. */
const BADGED_HREFS = ["/nhom-hoc", "/kiem-tra"];

describe("nav rows that carry a badge", () => {
  it("renders a badge for exactly the hrefs this test claims", () => {
    // Guards the list above against drifting from the component. A third badge
    // appearing fails here, so its author has to decide how it stays visible
    // rather than silently inheriting a hidden one.
    const badged = [...source.matchAll(/const (is\w+) = href === "([^"]+)"/g)]
      .filter(([, flag]) => new RegExp(`${flag} && has\\w+`).test(source))
      .map(([, , href]) => href);
    expect([...new Set(badged)].sort()).toEqual([...BADGED_HREFS].sort());
  });

  it("keeps every badged row reachable without opening anything", () => {
    const flat = hrefsIn(topLevel);
    const forced = pathsIn(forcedOpen);
    for (const href of BADGED_HREFS) {
      const reachable = flat.includes(href) || forced.includes(href);
      expect(
        reachable,
        `${href} renders a badge, so it must either sit above the sections or force its section open`
      ).toBe(true);
    }
  });

  it("actually applies the force-open list to the fold state", () => {
    // The list existing is not enough - it has to win over the stored
    // collapsed preference, or the badge stays folded away regardless.
    expect(/collapsedSections\.includes\([^)]*\)\s*&&\s*!forcedOpenKeys\.includes/.test(source)).toBe(true);
  });

  it("lets an explicit click beat the force-open", () => {
    // The bug this catches shipped: hasPendingNewsQuiz defaults to true until
    // the day's news quiz is answered, so Kiểm tra held Học tập force-open for
    // most of most days, and pressing the Học tập header did nothing at all.
    // Force-open exists to override the STORED preference, not a click the
    // reader is making right now.
    //
    // Matched inside each construct rather than by proximity: both bodies open
    // with a long comment, and a distance window would fail on the comment
    // getting longer rather than on the behaviour changing.
    expect(
      declarationOf("forcedOpenKeys"),
      "forcedOpenKeys must drop sections the reader has toggled this session"
    ).toContain("manuallyToggled");
    expect(
      declarationOf("toggleSection"),
      "toggling a section must record that the reader acted on it"
    ).toContain("setManuallyToggled");
  });

  it("derives the force-open list at render instead of writing it to storage", () => {
    // The fold state is the reader's preference. A prompt should override it
    // while the prompt lasts, not overwrite it - otherwise finishing a
    // check-in leaves the section permanently unfolded against their wishes.
    // No `s` flag: the pattern uses no `.`, and the flag needs an es2018 target
    // this tsconfig does not set - it type-errors rather than being ignored.
    const effectWriting = /useEffect\([^)]*setCollapsedSections\([^)]*forcedOpen/.test(source);
    expect(effectWriting).toBe(false);
  });
});

describe("the nav as a whole", () => {
  it("never lists the same destination twice", () => {
    // Two rows for one page is not a compile error and reads as a bug: the
    // active highlight lands on one of them and not the other.
    const all = [...hrefsIn(topLevel), ...hrefsIn(sections)];
    expect(all.length).toBe(new Set(all).size);
  });

  it("has no section left empty", () => {
    // Moving entries out of a group and leaving the header behind renders a
    // fold that opens onto nothing.
    const blocks = sections.split(/titleKey:/).slice(1);
    for (const block of blocks) {
      expect(hrefsIn(block).length, `an empty section remains: ${block.slice(0, 40)}`).toBeGreaterThan(0);
    }
  });

  it("still reaches Dashboard without opening anything", () => {
    expect(hrefsIn(topLevel)).toContain("/dashboard");
  });
});
