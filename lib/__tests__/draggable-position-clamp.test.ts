import { describe, it, expect } from "vitest";
import { clampOffset } from "@/lib/hooks/useDraggablePosition";

/** A widget of `size` whose top-left currently sits at (left, top). */
function rectAt(left: number, top: number, size = 56) {
  return { left, top, right: left + size, bottom: top + size };
}

const PHONE = { width: 393, height: 852 };
const DESKTOP = { width: 1920, height: 1080 };

describe("clampOffset", () => {
  it("leaves a widget that is already fully on screen alone", () => {
    const offset = { x: -40, y: -80 };
    expect(clampOffset(offset, rectAt(300, 700), PHONE)).toEqual(offset);
  });

  it("pulls a widget back from past the right and bottom edges", () => {
    // Sits at 380..436 x 830..886 on a 393x852 phone: over on both axes.
    const next = clampOffset({ x: 0, y: 0 }, rectAt(380, 830), PHONE);
    // right must land on width - margin = 385, so left ends at 329.
    expect(next).toEqual({ x: 385 - 436, y: 844 - 886 });
  });

  it("pulls a widget back from past the left and top edges", () => {
    const next = clampOffset({ x: -500, y: -300 }, rectAt(-60, -30), PHONE);
    // Near edges win: left and top are pushed to the 8px margin.
    expect(next).toEqual({ x: -500 + 68, y: -300 + 38 });
  });

  it("recovers a bubble stranded by an offset recorded on a wider screen", () => {
    // -1700 was fine on a 1920 desktop; on a 393 phone it parks the bubble
    // far off the left edge, where it can never be grabbed to drag back.
    const stranded = { x: -1700, y: 0 };
    const next = clampOffset(stranded, rectAt(-1370, 700), PHONE);
    expect(next.x).toBe(stranded.x + (8 - -1370));
    // Applying the correction puts the left edge exactly on the margin.
    expect(-1370 + (next.x - stranded.x)).toBe(8);
  });

  it("pins an axis wider than the viewport to the near edge rather than oscillating", () => {
    // 500px wide on a 393px phone: the right-edge and left-edge rules cannot
    // both be satisfied, so the near edge wins outright instead of the two
    // fighting. 500px tall still fits in 852, so y must be left alone - the
    // tie-break is per-axis, not whole-widget.
    const next = clampOffset({ x: 0, y: 0 }, rectAt(100, 100, 500), PHONE);
    expect(100 + next.x).toBe(8);
    expect(next.y).toBe(0);
  });

  it("honours a custom margin", () => {
    const next = clampOffset({ x: 0, y: 0 }, rectAt(-10, 400), DESKTOP, 24);
    expect(-10 + next.x).toBe(24);
  });

  it("is idempotent - clamping an already-corrected position changes nothing", () => {
    const first = clampOffset({ x: 0, y: 0 }, rectAt(380, 830), PHONE);
    const correctedRect = rectAt(380 + first.x, 830 + first.y);
    expect(clampOffset(first, correctedRect, PHONE)).toEqual(first);
  });
});
