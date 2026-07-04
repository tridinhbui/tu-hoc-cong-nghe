/* ─── User Level System ─────────────────────────────────────────── */

export const LEVELS = [
  { level: 1, name: "Tò mò", minXp: 0, color: "stone" },
  { level: 2, name: "Học viên", minXp: 100, color: "stone" },
  { level: 3, name: "Lập trình viên", minXp: 300, color: "stone" },
  { level: 4, name: "Nhà phân tích", minXp: 600, color: "stone" },
  { level: 5, name: "Chiến lược gia", minXp: 1000, color: "stone" },
  { level: 6, name: "Huyền thoại", minXp: 1500, color: "emerald" },
];

export function getLevelByXp(xp: number) {
  const level = [...LEVELS].reverse().find((l) => xp >= l.minXp);
  return level || LEVELS[0];
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
