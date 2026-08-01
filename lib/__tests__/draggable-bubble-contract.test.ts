import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** The rule that makes the two floating chat bubbles draggable at all.
 *
 *  `drag` and `animate={{ x, y }}` write the same two framer motion values, so
 *  they fight. onDragStart sets an isDragging flag, React re-renders, framer
 *  re-applies the animate target - which still holds the pre-drag offset,
 *  because that state only advances on drag *end* - and the live gesture is
 *  overwritten. The bubble snaps home the instant you try to move it. That was
 *  the shipped bug.
 *
 *  The fix gives `drag` sole ownership: x/y are MotionValues spread into
 *  `style`, and never appear in initial/animate/exit. Nothing in the type
 *  system says so - `animate={{ x, y }}` type-checks perfectly and builds
 *  clean, it just silently kills dragging. Hence a source contract.
 *
 *  Both files already carry a comment saying only scale is animated; this is
 *  the version that fails the build instead of being read and ignored. */

const root = join(__dirname, "..", "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

const BUBBLES = [
  { file: "components/FloatingStudyGroupChat.tsx", key: "thtcdn_study_group_chat_bubble_pos" },
  { file: "components/ChatWithAdminWidget.tsx", key: "thtcdn_admin_chat_bubble_pos" },
];

/** The opening tag of the element carrying `drag`, and only that one.
 *
 *  Scoping matters: the chat *panel* in both files legitimately animates y
 *  (`animate={{ opacity: 1, y: 0 }}` to slide it in). It owns no drag gesture,
 *  so there is nothing to fight. Only the bubble is under this rule. */
function draggableOpeningTag(source: string, file: string): string {
  const lines = source.split("\n");
  const dragLine = lines.findIndex((l) => /^\s*drag$/.test(l));
  expect(dragLine, `${file}: no element with a bare \`drag\` prop`).toBeGreaterThan(-1);

  const tagStart = lines.slice(0, dragLine).findLastIndex((l) => /<motion\./.test(l));
  const tagEnd = lines.findIndex((l, i) => i > dragLine && /^\s*>\s*$/.test(l));
  expect(tagEnd, `${file}: could not find the end of the draggable opening tag`).toBeGreaterThan(-1);

  return lines.slice(tagStart, tagEnd + 1).join("\n");
}

/** Every `initial|animate|exit={{ ... }}` prop body in a chunk of source. */
function motionTargets(source: string): string[] {
  return [...source.matchAll(/\b(?:initial|animate|exit)=\{\{([^}]*)\}\}/g)].map((m) => m[1]);
}

describe("floating chat bubbles stay draggable", () => {
  for (const { file, key } of BUBBLES) {
    describe(file, () => {
      const source = read(file);

      it("hands the drag gesture sole ownership of x and y via style", () => {
        expect(source).toContain("style={{ x: bubbleDrag.x, y: bubbleDrag.y }}");
        expect(source).toMatch(/^\s+drag$/m);
      });

      it("never animates x or y, which would stomp the live gesture", () => {
        const tag = draggableOpeningTag(source, file);
        const offenders = motionTargets(tag).filter((body) => /(^|[\s,{])[xy]\s*:/.test(body));
        expect(
          offenders,
          `animating x/y fights \`drag\` for the same motion values and the bubble ` +
            `snaps back mid-drag. Move them to style. Offending props: ${JSON.stringify(offenders)}`
        ).toEqual([]);
      });

      it("reports the gesture to the hook so the position is clamped and persisted", () => {
        expect(source).toContain("bubbleDrag.onDragStart()");
        expect(source).toContain("bubbleDrag.onDragEnd()");
      });

      it("uses its own storage key", () => {
        expect(source).toContain(`useDraggablePosition("${key}"`);
      });
    });
  }

  it("gives the two bubbles different keys so they do not share one slot", () => {
    const keys = new Set(BUBBLES.map((b) => b.key));
    expect(keys.size).toBe(BUBBLES.length);
  });
});
