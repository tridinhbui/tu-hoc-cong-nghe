import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * A nav badge only works if the row carrying it is on screen.
 *
 * The sidebar's sections all start folded (`useState(ALL_SECTION_KEYS)`), and
 * only the section owning the current page unfolds. So an entry inside a
 * section is invisible on every page but its own. That is fine for a shelf of
 * destinations and wrong for a row with a live prompt on it: Học nhóm pulses a
 * CHECK-IN badge and Kiểm tra pulses "Tin mới" when a news quiz is waiting.
 * Both were animating away inside a folded group, which is a prompt that
 * effectively does not exist.
 *
 * Nothing in the type system ties "renders a badge" to "is reachable without
 * opening something". Both arrangements compile and both look reasonable in a
 * diff, so this is a source contract instead: move one of these back into a
 * section and the build says why that is a mistake.
 */

const source = readFileSync(join(__dirname, "..", "..", "components/AppNavbar.tsx"), "utf8");

/** Text of the array literal assigned to a top-level const, brace-matched. */
function arrayLiteral(name: string): string {
  const start = source.indexOf(`const ${name}`);
  expect(start, `${name} not found in AppNavbar.tsx`).toBeGreaterThan(-1);
  // Anchor on the assignment, not on the first bracket: the type annotation
  // `: NavLink[] =` carries a pair of its own, and matching from there returns
  // an empty string that then passes every "does not contain" assertion below.
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

const topLevel = arrayLiteral("TOP_LEVEL_LINKS");
const sections = arrayLiteral("NAV_SECTIONS");

const hrefsIn = (block: string) => [...block.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]);

/** Every href the component gives a badge to, keyed off its own conditions. */
const BADGED_HREFS = ["/nhom-hoc", "/kiem-tra"];

describe("nav rows that carry a badge", () => {
  it("renders a badge for exactly the hrefs this test claims", () => {
    // Guards the list above against drifting from the component. If a third
    // badge appears, this fails and the author has to decide where it lives
    // rather than silently gaining a hidden prompt.
    const badged = [...source.matchAll(/const is\w+ = href === "([^"]+)"/g)]
      .map((m) => m[1])
      .filter((href) => {
        const flag = source.match(new RegExp(`const (is\\w+) = href === "${href.replace("/", "\\/")}"`));
        return flag ? new RegExp(`${flag[1]} && has\\w+`).test(source) : false;
      });
    expect(badged.sort()).toEqual([...BADGED_HREFS].sort());
  });

  it("keeps every badged row outside the folded sections", () => {
    const inSections = hrefsIn(sections);
    for (const href of BADGED_HREFS) {
      expect(inSections, `${href} carries a badge, so it cannot live in a collapsed section`).not.toContain(href);
    }
  });

  it("lists every badged row at the top level", () => {
    const flat = hrefsIn(topLevel);
    for (const href of BADGED_HREFS) {
      expect(flat).toContain(href);
    }
  });
});

describe("the nav as a whole", () => {
  it("never lists the same destination twice", () => {
    // Two rows for one page is not a compile error and reads as a bug to the
    // learner: the active highlight lands on one of them and not the other.
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
