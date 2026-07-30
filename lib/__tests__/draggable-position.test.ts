import { describe, expect, it } from "vitest";
import { clampOffset } from "@/lib/hooks/useDraggablePosition";

/**
 * The bubble is anchored bottom-right in CSS and moved by a stored pixel
 * offset, so a rect is built here from the offset the way the browser would.
 */
const BUBBLE = 56; // w-14
function rectFor(offset: { x: number; y: number }, viewport: { width: number; height: number }) {
  const right = viewport.width - 16 + offset.x; // right-4
  const bottom = viewport.height - 84 + offset.y; // bottom-21
  return { left: right - BUBBLE, right, top: bottom - BUBBLE, bottom };
}

const PHONE = { width: 393, height: 852 };
const DESKTOP = { width: 1920, height: 1080 };

describe("clampOffset", () => {
  it("leaves an in-bounds offset alone", () => {
    const offset = { x: -40, y: -60 };
    expect(clampOffset(offset, rectFor(offset, PHONE), PHONE)).toEqual(offset);
  });

  it("pulls back an offset recorded on desktop and restored on a phone", () => {
    // Dragged to the left edge of a 1920px window, then opened on a phone.
    const desktopOffset = { x: -1800, y: 0 };
    expect(rectFor(desktopOffset, PHONE).left).toBeLessThan(0); // strands off-screen

    const fixed = clampOffset(desktopOffset, rectFor(desktopOffset, PHONE), PHONE);
    const rect = rectFor(fixed, PHONE);
    expect(rect.left).toBeGreaterThanOrEqual(8);
    expect(rect.right).toBeLessThanOrEqual(PHONE.width - 8);
  });

  it("pulls back a positive offset that drifted past the right edge", () => {
    // `info.offset` accumulates raw pointer delta, so repeated drags into the
    // right-hand constraint push the stored x positive even though the
    // constraint capped the visible movement at 0.
    const drifted = { x: 500, y: 0 };
    expect(rectFor(drifted, PHONE).right).toBeGreaterThan(PHONE.width);

    const fixed = clampOffset(drifted, rectFor(drifted, PHONE), PHONE);
    expect(rectFor(fixed, PHONE).right).toBe(PHONE.width - 8);
  });

  it("clamps vertically too", () => {
    const offset = { x: 0, y: -2000 };
    const fixed = clampOffset(offset, rectFor(offset, PHONE), PHONE);
    expect(rectFor(fixed, PHONE).top).toBe(8);
  });

  it("is idempotent - clamping an already-clamped offset changes nothing", () => {
    const offset = { x: -1800, y: -2000 };
    const once = clampOffset(offset, rectFor(offset, PHONE), PHONE);
    const twice = clampOffset(once, rectFor(once, PHONE), PHONE);
    expect(twice).toEqual(once);
  });

  it("pins to the near edge when the widget cannot fit the viewport", () => {
    const tiny = { width: 40, height: 40 };
    const offset = { x: 0, y: 0 };
    const fixed = clampOffset(offset, rectFor(offset, tiny), tiny);
    const rect = rectFor(fixed, tiny);
    expect(rect.left).toBe(8);
    expect(rect.top).toBe(8);
  });

  it("does not disturb a desktop position on desktop", () => {
    const offset = { x: -1800, y: -900 };
    expect(clampOffset(offset, rectFor(offset, DESKTOP), DESKTOP)).toEqual(offset);
  });
});
