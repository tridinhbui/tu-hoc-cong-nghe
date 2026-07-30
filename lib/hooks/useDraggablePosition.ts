"use client";

import { useEffect, useRef, useState } from "react";
import type { PanInfo } from "framer-motion";

interface Offset {
  x: number;
  y: number;
}

/**
 * Persists a floating widget's drag offset (framer-motion `drag`) across
 * reloads via localStorage, keyed per-widget so the two chat bubbles don't
 * fight over the same slot. Framer-motion resets its internal x/y motion
 * values on remount, so without this a dragged bubble snaps back to its
 * default corner on every page navigation.
 */
export function useDraggablePosition(storageKey: string) {
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const offsetRef = useRef(offset);

  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Offset;
      if (typeof parsed.x === "number" && typeof parsed.y === "number") {
        setOffset(parsed);
      }
    } catch {
      // corrupted value - ignore, fall back to default position
    }
  }, [storageKey]);

  function onDragStart() {
    setIsDragging(true);
  }

  function onDragEnd(_event: unknown, info: PanInfo) {
    const next = { x: offsetRef.current.x + info.offset.x, y: offsetRef.current.y + info.offset.y };
    setOffset(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // storage unavailable (e.g. private mode quota) - position just won't persist
    }
    setTimeout(() => setIsDragging(false), 120);
  }

  return { offset, isDragging, onDragStart, onDragEnd };
}
