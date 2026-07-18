// Deterministic content rotation - same for every visitor on a given day/
// week (not per-user random), so "Đang hot tuần này" actually changes week
// to week instead of being a permanently fixed slug list, while still being
// stable within that week (no flicker on every reload).

/** ISO-ish week id, unique across years (e.g. 202629 for week 29 of 2026). */
export function getWeekSeed(date: Date = new Date()): number {
  const target = new Date(date.getTime());
  target.setHours(0, 0, 0, 0);
  target.setDate(target.getDate() + 3 - ((target.getDay() + 6) % 7));
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const weekNumber =
    1 + Math.round(((target.getTime() - firstThursday.getTime()) / 86400000 - 3 + ((firstThursday.getDay() + 6) % 7)) / 7);
  return target.getFullYear() * 100 + weekNumber;
}

/** Day-of-year seed, unique across years. */
export function getDaySeed(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86400000);
  return date.getFullYear() * 1000 + dayOfYear;
}

/** Picks a rotating, wrapping window of `count` items from `pool`, offset by
 *  `seed` - same seed always yields the same window (so it's stable within
 *  a day/week), but a different seed (next day/week) shifts the window,
 *  so the same handful of items don't sit there forever. */
export function pickRotatingWindow<T>(pool: T[], count: number, seed: number): T[] {
  if (pool.length <= count) return pool;
  const offset = ((seed % pool.length) + pool.length) % pool.length;
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    result.push(pool[(offset + i) % pool.length]);
  }
  return result;
}
