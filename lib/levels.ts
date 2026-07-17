/* ─── User Level System ─────────────────────────────────────────── */

export const LEVELS = [
  { level: 1, name: "Tò mò", minXp: 0, color: "stone" },
  { level: 2, name: "Học viên", minXp: 100, color: "stone" },
  { level: 3, name: "Nhà đầu tư", minXp: 300, color: "stone" },
  { level: 4, name: "Nhà phân tích", minXp: 600, color: "stone" },
  // L5/L6 raised from 1000/1500 - and 2 new tiers (L7/L8) added on top so
  // the climb from L4 to max level takes noticeably longer, matching more
  // levels overall in the roadmap.
  { level: 5, name: "Cố vấn Tài chính", minXp: 1200, color: "stone" },
  { level: 6, name: "Thạo thủ Tài chính", minXp: 2000, color: "emerald" },
  { level: 7, name: "Chuyên gia Tài chính", minXp: 3200, color: "emerald" },
  { level: 8, name: "Bậc thầy Tài chính", minXp: 5000, color: "amber" },
  // L9 is XP-gated like every other level, but ALSO requires having
  // completed at least `minCfaCompleted` items from the CFA track (tagged
  // lessons in lib/cfa-track.ts + Book/Reading/Module completions) - pure
  // XP grinding can no longer reach the top level on its own.
  { level: 9, name: "Chuyên viên CFA", minXp: 7000, minCfaCompleted: 5, color: "amber" },
];

export function getLevelByXp(xp: number, cfaCompleted: number = 0) {
  const level = [...LEVELS]
    .reverse()
    .find((l) => xp >= l.minXp && cfaCompleted >= (l.minCfaCompleted ?? 0));
  return level || LEVELS[0];
}

/** For a level the user hasn't reached purely because of the CFA gate (XP is enough), how many more CFA items are needed. */
export function getCfaGateRemaining(level: (typeof LEVELS)[number], cfaCompleted: number): number {
  return Math.max(0, (level.minCfaCompleted ?? 0) - cfaCompleted);
}

export function getNextLevel(currentLevel: number) {
  return LEVELS.find((l) => l.level === currentLevel + 1);
}

export function getXpToNextLevel(currentXp: number) {
  const currentLevel = getLevelByXp(currentXp);
  const nextLevel = getNextLevel(currentLevel.level);

  if (!nextLevel) return 0; // Already at max level

  return nextLevel.minXp - currentXp;
}

export function getLevelProgress(currentXp: number) {
  const currentLevel = getLevelByXp(currentXp);
  const nextLevel = getNextLevel(currentLevel.level);

  if (!nextLevel) return 100; // Max level reached

  const xpInCurrentLevel = currentXp - currentLevel.minXp;
  const xpNeededForLevel = nextLevel.minXp - currentLevel.minXp;

  return Math.round((xpInCurrentLevel / xpNeededForLevel) * 100);
}

/* ─── XP Constants ──────────────────────────────────────────────── */

export const XP_VALUES = {
  LESSON_COMPLETED: 10,
  QUIZ_ANSWERED: 5,
  QUIZ_PERFECT: 15, // If all questions correct
};
