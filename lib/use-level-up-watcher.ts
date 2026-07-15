"use client";

import { useEffect, useState } from "react";

const LAST_SEEN_LEVEL_KEY = "thtcdn_last_seen_level";

/** Compares a freshly-loaded current_level against the last one seen on
 *  this device (localStorage) and returns a level to celebrate if it went
 *  up. Call with `undefined` while the real level hasn't loaded yet - it
 *  won't record/compare anything until a real number arrives, so a
 *  loading-state flicker (undefined -> real value) can't be mistaken for a
 *  level change.
 *
 *  First-ever call for a browser (no stored value at all) just records the
 *  current level silently instead of celebrating - otherwise every existing
 *  user would get a level-up popup the moment this feature shipped. */
export function useLevelUpWatcher(currentLevel: number | undefined) {
  const [celebrateLevel, setCelebrateLevel] = useState<number | null>(null);

  useEffect(() => {
    if (currentLevel === undefined) return;

    const stored = window.localStorage.getItem(LAST_SEEN_LEVEL_KEY);
    const lastSeen = stored !== null ? Number(stored) : null;

    if (lastSeen !== null && currentLevel > lastSeen) {
      setCelebrateLevel(currentLevel);
    }
    if (lastSeen === null || currentLevel !== lastSeen) {
      window.localStorage.setItem(LAST_SEEN_LEVEL_KEY, String(currentLevel));
    }
  }, [currentLevel]);

  return { celebrateLevel, dismiss: () => setCelebrateLevel(null) };
}
