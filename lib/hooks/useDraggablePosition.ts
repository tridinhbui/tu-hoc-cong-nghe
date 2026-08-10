"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import type { RefObject } from "react";
import { useMotionValue } from "framer-motion";

interface Offset {
  x: number;
  y: number;
}

/** Keep at least this much of the widget on screen, in px. */
const EDGE_MARGIN = 8;

interface Rect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface Viewport {
  width: number;
  height: number;
}

/**
 * The correction needed to bring `rect` (which already reflects `offset`) back
 * inside `viewport`, as a new offset. Pure and exported so the arithmetic is
 * testable without a DOM; the hook supplies the measured rect.
 */
export function clampOffset(offset: Offset, rect: Rect, viewport: Viewport, margin = EDGE_MARGIN): Offset {
  const maxX = viewport.width - margin;
  const maxY = viewport.height - margin;

  let dx = 0;
  let dy = 0;
  // Far edge is corrected first, then the near edge overrides it, so a widget
  // wider or taller than the viewport pins to top-left rather than jittering
  // between two unsatisfiable bounds.
  if (rect.right > maxX) dx = maxX - rect.right;
  if (rect.left + dx < margin) dx = margin - rect.left;
  if (rect.bottom > maxY) dy = maxY - rect.bottom;
  if (rect.top + dy < margin) dy = margin - rect.top;

  return { x: offset.x + dx, y: offset.y + dy };
}

function readStored(storageKey: string): Offset {
  if (typeof window === "undefined") return { x: 0, y: 0 };
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return { x: 0, y: 0 };
    const parsed = JSON.parse(raw) as Offset;
    if (typeof parsed.x === "number" && typeof parsed.y === "number") {
      return parsed;
    }
  } catch {
    // corrupted value - ignore, fall back to default position
  }
  return { x: 0, y: 0 };
}

/**
 * Persists a floating widget's drag offset (framer-motion `drag`) across
 * reloads via localStorage, keyed per-widget so the two chat bubbles don't
 * fight over the same slot. Framer-motion resets its internal x/y motion
 * values on remount, so without this a dragged bubble snaps back to its
 * default corner on every page navigation.
 *
 * The offset is a raw pixel delta from the widget's CSS anchor, so it only
 * means anything relative to the viewport it was recorded in. Two ways that
 * used to strand a bubble off-screen with no way to drag it back, since you
 * cannot grab what you cannot touch:
 *
 *   - Recorded on a 1920px desktop, restored on a 393px phone. An x of -1700
 *     parks the bubble far past the left edge.
 *   - `info.offset` in `onDragEnd` is the raw pointer delta, NOT the position
 *     after `dragConstraints` clamped it. Dragging repeatedly into a
 *     constraint still accumulates, so the stored value drifts past the bound
 *     that was supposed to hold it - and `animate={{ x }}` applies the stored
 *     value directly, without consulting the constraints again.
 *
 * So the offset is re-clamped against the element's real measured rect on
 * mount and on resize, rather than trusted. `elementRef` must point at the
 * draggable element for that; the caller owns the ref rather than receiving
 * one back, because a hook returning `{ ref, ... }` makes the React Compiler
 * lint read every later `.x` access on that object as a ref read.
 *
 * The position is returned as framer MotionValues to be spread into `style`,
 * NOT as numbers for `animate`. This is what makes the bubbles draggable at
 * all. `drag` and `animate={{ x, y }}` both write the same two motion values,
 * so they fight: `onDragStart` sets an `isDragging` flag, React re-renders,
 * framer re-applies the `animate` target - which still holds the pre-drag
 * offset, because that state only advances on drag *end* - and the live drag
 * is overwritten. The bubble snaps home the instant you try to move it.
 * Handing `drag` sole ownership of the values means no re-render can stomp
 * them mid-gesture, and it also makes the stored position the one framer
 * actually settled on after `dragConstraints`, rather than a running sum of
 * raw pointer deltas that drifts past the bound meant to hold it.
 *
 * `storageKey` is read once, on mount. All three call sites pass a string
 * literal; a key that changed at runtime would keep the old position.
 */
export function useDraggablePosition(storageKey: string, elementRef: RefObject<HTMLElement | null>) {
  // Read synchronously so the first paint is already in the restored position;
  // reading in an effect instead animates the bubble in from its default
  // corner and makes the clamp below measure a moving element.
  const [initial] = useState<Offset>(() => readStored(storageKey));
  const x = useMotionValue(initial.x);
  const y = useMotionValue(initial.y);
  const [isDragging, setIsDragging] = useState(false);

  const persist = useCallback(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ x: x.get(), y: y.get() }));
    } catch {
      // storage unavailable (e.g. private mode quota) - position just won't persist
    }
  }, [storageKey, x, y]);

  const clampToViewport = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return; // hidden - nothing to clamp against

    const current = { x: x.get(), y: y.get() };
    const next = clampOffset(current, rect, { width: window.innerWidth, height: window.innerHeight });
    if (next.x === current.x && next.y === current.y) return;

    x.set(next.x);
    y.set(next.y);
    persist();
  }, [elementRef, x, y, persist]);

  useLayoutEffect(() => {
    clampToViewport();
  }, [clampToViewport]);

  useEffect(() => {
    window.addEventListener("resize", clampToViewport);
    window.addEventListener("orientationchange", clampToViewport);
    return () => {
      window.removeEventListener("resize", clampToViewport);
      window.removeEventListener("orientationchange", clampToViewport);
    };
  }, [clampToViewport]);

  const onDragStart = useCallback(() => setIsDragging(true), []);

  const onDragEnd = useCallback(() => {
    // x/y already hold the position framer settled on, constraints applied.
    clampToViewport();
    persist();
    // Outlast the click that closes the gesture, so a drag doesn't also toggle
    // the panel open.
    setTimeout(() => setIsDragging(false), 120);
  }, [clampToViewport, persist]);

  return { x, y, isDragging, onDragStart, onDragEnd };
}
