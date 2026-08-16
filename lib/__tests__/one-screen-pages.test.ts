import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** The "pin to exactly one screen" contract, which is spread across four files
 *  and held together by a bare number.
 *
 *  AppNavbar's mobile header is `sticky`, so it keeps its space in normal flow.
 *  A page that asks for a full h-dvh underneath it makes the document
 *  100dvh + header tall and scrolls by that overhang - the exact thing its
 *  overflow-hidden was there to prevent. So each one-screen page subtracts the
 *  header height on mobile.
 *
 *  Nothing at runtime checks that the subtracted constant still matches the
 *  header. Change h-14 to h-16 and all three pages silently start scrolling
 *  again, which is how this got shipped the first time. These tests fail
 *  instead. */

const root = join(__dirname, "..", "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

/** Tailwind's h-14 = 3.5rem. Both spellings must move together. */
const HEADER_CLASS = "h-14";
const HEADER_SUBTRACTION = "h-[calc(100dvh-3.5rem)]";

const ONE_SCREEN_PAGES = [
  "app/(app)/kiem-tra/page.tsx",
  "app/(app)/nhom-hoc/page.tsx",
];

describe("one-screen pages stay one screen", () => {
  it("pins the mobile header to a definite height", () => {
    const navbar = read("components/AppNavbar.tsx");
    const header = navbar
      .split("\n")
      .find((line) => line.includes("<header") && line.includes("lg:hidden"));

    expect(header, "AppNavbar's mobile header disappeared or was renamed").toBeDefined();
    // Content-derived padding would make the height a guess again.
    expect(header).toContain(HEADER_CLASS);
    expect(header).toContain("sticky");
  });

  for (const page of ONE_SCREEN_PAGES) {
    it(`${page} subtracts exactly the header height on mobile`, () => {
      const source = read(page);

      expect(
        source.includes(HEADER_SUBTRACTION),
        `${page} must use ${HEADER_SUBTRACTION} so it does not scroll by the sticky header`
      ).toBe(true);

      // The desktop sidebar is `fixed` and costs no flow height, so the full
      // viewport is correct from lg up - and h-dvh, not h-screen: 100vh on
      // mobile browsers includes the retracting URL bar and overflows again.
      expect(source).toContain("lg:h-dvh");
      expect(source, `${page} should not fall back to h-screen`).not.toMatch(
        /className="[^"]*\bh-screen\b/
      );

      // Without this the subtraction just moves the scrollbar inward.
      expect(source).toContain("overflow-hidden");
    });
  }
});
