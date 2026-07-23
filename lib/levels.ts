/* ─── User Level System ─────────────────────────────────────────── */

export const LEVELS = [
  { level: 1, name: "Tò mò", minXp: 0, color: "stone" },
  { level: 2, name: "Học viên", minXp: 100, color: "stone" },
  { level: 3, name: "Nhà đầu tư", minXp: 300, color: "stone" },
  { level: 4, name: "Nhà phân tích", minXp: 600, color: "stone" },
  { level: 5, name: "Cố vấn Tài chính", minXp: 1200, color: "stone" },
  { level: 6, name: "Thạo thủ Tài chính", minXp: 2000, color: "emerald" },
  { level: 7, name: "Chuyên gia Tài chính", minXp: 3200, color: "emerald" },
  { level: 8, name: "Bậc thầy Tài chính", minXp: 5000, color: "amber" },
  { level: 9, name: "Chuyên viên CFA", minXp: 7000, minCfaCompleted: 5, color: "amber" },
];

/** Mở khóa tất cả mọi công trình Game Kingdom từ Level 1 */
export function getRequiredLevelForBuilding(buildingId: string): number {
  return 1; // Mở khóa trọn bộ 100% tính năng cho tất cả học viên
}

export const DOMAINS = [
  "accounting",
  "valuation",
  "corporate_finance",
  "economics",
  "investment",
  "risk_management",
  "ai_for_finance"
] as const;

export type DomainType = typeof DOMAINS[number];

export const DOMAIN_WEIGHTS: Record<DomainType, number> = {
  accounting: 1.0,
  corporate_finance: 1.0,
  valuation: 1.2,
  economics: 1.0,
  investment: 1.0,
  risk_management: 1.2,
  ai_for_finance: 1.0
};

export const DOMAIN_NAMES: Record<DomainType, string> = {
  accounting: "Accounting",
  corporate_finance: "Corporate Finance",
  valuation: "Valuation",
  economics: "Economics",
  investment: "Investment",
  risk_management: "Risk Management",
  ai_for_finance: "AI for Finance"
};

/** Công thức tính XP yêu cầu cho mỗi level của từng Domain: 200 * (L_d - 1)^1.5 + 100 */
export function getDomainXpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(200 * Math.pow(level - 1, 1.5) + 100);
}

/** Tính level của Domain dựa trên XP */
export function getDomainLevelByXp(xp: number): number {
  let level = 1;
  while (xp >= getDomainXpForLevel(level + 1)) {
    level++;
  }
  return level;
}

/** Lấy tiến trình % của Domain level hiện tại */
export function getDomainLevelProgress(xp: number): number {
  const currentLevel = getDomainLevelByXp(xp);
  const currentLevelMinXp = getDomainXpForLevel(currentLevel);
  const nextLevelMinXp = getDomainXpForLevel(currentLevel + 1);
  
  const xpInCurrentLevel = xp - currentLevelMinXp;
  const xpNeededForLevel = nextLevelMinXp - currentLevelMinXp;
  
  return Math.round((xpInCurrentLevel / xpNeededForLevel) * 100);
}

/** Tính toán Overall Finance Level từ danh sách Domain Levels */
export function calculateOverallLevel(domainLevels: Record<DomainType, number>): number {
  let weightedSum = 0;
  for (const domain of DOMAINS) {
    const lvl = domainLevels[domain] || 1;
    weightedSum += (DOMAIN_WEIGHTS[domain] ?? 1.0) * lvl;
  }
  return Math.floor(weightedSum);
}

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
  LESSON_COMPLETED: 100, // Tăng lên 100 XP cơ bản theo thiết kế mới
  QUIZ_ANSWERED: 5,
  QUIZ_PERFECT: 50, // Hoàn thành 100% quiz nhận 50 XP bonus
};

