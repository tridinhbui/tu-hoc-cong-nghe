// @vitest-environment jsdom
import { useRef } from "react";
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useDraggablePosition } from "@/lib/hooks/useDraggablePosition";

/**
 * Exercises the hook's wiring - that it measures the element the caller
 * handed it, corrects the restored offset before paint, persists the
 * correction, and re-runs on resize. The pure arithmetic is covered in
 * draggable-position.test.ts.
 *
 * jsdom does no layout, so getBoundingClientRect is stubbed to model the
 * bubble's CSS anchoring (bottom-right, w-14, right-4 bottom-21) shifted by
 * whatever offset is currently applied.
 */
const KEY = "test_bubble_pos";
const BUBBLE = 56;

function Bubble() {
  const ref = useRef<HTMLButtonElement>(null);
  const drag = useDraggablePosition(KEY, ref);

  return (
    <button
      ref={(el) => {
        ref.current = el;
        if (!el) return;
        // Reads the offset back off the node, which React has already
        // committed by the time layout effects (and so the hook's clamp) run.
        el.getBoundingClientRect = () => {
          const right = window.innerWidth - 16 + Number(el.dataset.x);
          const bottom = window.innerHeight - 84 + Number(el.dataset.y);
          return {
            left: right - BUBBLE,
            right,
            top: bottom - BUBBLE,
            bottom,
            width: BUBBLE,
            height: BUBBLE,
            x: right - BUBBLE,
            y: bottom - BUBBLE,
            toJSON: () => ({}),
          } as DOMRect;
        };
      }}
      data-x={drag.offset.x}
      data-y={drag.offset.y}
    />
  );
}

function setViewport(width: number, height: number) {
  Object.defineProperty(window, "innerWidth", { value: width, configurable: true });
  Object.defineProperty(window, "innerHeight", { value: height, configurable: true });
}

function readOffset(el: HTMLElement) {
  return { x: Number(el.dataset.x), y: Number(el.dataset.y) };
}

beforeEach(() => {
  localStorage.clear();
  setViewport(393, 852);
});

afterEach(cleanup);

describe("useDraggablePosition", () => {
  it("restores a stored offset that already fits", () => {
    localStorage.setItem(KEY, JSON.stringify({ x: -40, y: -60 }));
    const { container } = render(<Bubble />);
    expect(readOffset(container.firstElementChild as HTMLElement)).toEqual({ x: -40, y: -60 });
  });

  it("corrects a desktop offset restored on a phone, and persists the correction", () => {
    localStorage.setItem(KEY, JSON.stringify({ x: -1800, y: -900 }));

    const { container } = render(<Bubble />);
    const el = container.firstElementChild as HTMLElement;

    const rect = el.getBoundingClientRect();
    expect(rect.left).toBeGreaterThanOrEqual(8);
    expect(rect.right).toBeLessThanOrEqual(393 - 8);
    expect(rect.top).toBeGreaterThanOrEqual(8);

    // Written back, so the next load starts from the corrected value.
    expect(JSON.parse(localStorage.getItem(KEY)!)).toEqual(readOffset(el));
  });

  it("leaves a valid desktop offset alone on desktop", () => {
    setViewport(1920, 1080);
    localStorage.setItem(KEY, JSON.stringify({ x: -1800, y: -900 }));
    const { container } = render(<Bubble />);
    expect(readOffset(container.firstElementChild as HTMLElement)).toEqual({ x: -1800, y: -900 });
  });

  it("pulls the bubble back when the viewport shrinks under it", () => {
    setViewport(1920, 1080);
    localStorage.setItem(KEY, JSON.stringify({ x: -1500, y: -800 }));

    const { container } = render(<Bubble />);
    const el = container.firstElementChild as HTMLElement;
    expect(readOffset(el)).toEqual({ x: -1500, y: -800 });

    act(() => {
      setViewport(393, 852);
      window.dispatchEvent(new Event("resize"));
    });

    const rect = el.getBoundingClientRect();
    expect(rect.left).toBeGreaterThanOrEqual(8);
    expect(rect.right).toBeLessThanOrEqual(393 - 8);
  });

  it("ignores a corrupted stored value instead of throwing", () => {
    localStorage.setItem(KEY, "{not json");
    const { container } = render(<Bubble />);
    expect(readOffset(container.firstElementChild as HTMLElement)).toEqual({ x: 0, y: 0 });
  });

  it("settles - the clamp does not keep re-triggering itself", () => {
    localStorage.setItem(KEY, JSON.stringify({ x: -1800, y: -900 }));
    const { container } = render(<Bubble />);
    const el = container.firstElementChild as HTMLElement;
    const settled = readOffset(el);

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });
    expect(readOffset(el)).toEqual(settled);
  });
});
