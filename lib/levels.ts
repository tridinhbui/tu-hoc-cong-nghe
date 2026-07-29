/* ─── User Level System ─────────────────────────────────────────── */

export const LEVELS = [
  { level: 1, name: "Tò mò", minXp: 0, color: "stone", emoji: "🌱" },
  { level: 2, name: "Học viên", minXp: 100, color: "stone", emoji: "🎒" },
  { level: 3, name: "Nhà đầu tư", minXp: 300, color: "stone", emoji: "💼" },
  { level: 4, name: "Nhà phân tích", minXp: 600, color: "stone", emoji: "📊" },
  { level: 5, name: "Cố vấn Tài chính", minXp: 1200, color: "stone", emoji: "🛡️" },
  { level: 6, name: "Thạo thủ Tài chính", minXp: 2000, color: "emerald", emoji: "👑" },
  { level: 7, name: "Chuyên gia Tài chính", minXp: 3200, color: "emerald", emoji: "🔥" },
  { level: 8, name: "Bậc thầy Tài chính", minXp: 5000, color: "amber", emoji: "💎" },
  { level: 9, name: "Chuyên viên CFA", minXp: 7500, minCfaCompleted: 5, color: "amber", emoji: "🎓" },
  { level: 10, name: "Huyền thoại Đầu tư", minXp: 10500, color: "rose", emoji: "🦁" },
  { level: 11, name: "Giám đốc Quỹ Hedge Fund", minXp: 14500, color: "purple", emoji: "🏛️" },
  { level: 12, name: "Quản lý Danh mục Chiến lược", minXp: 19500, color: "indigo", emoji: "🌐" },
  { level: 13, name: "Bậc thầy Phân tích Thị trường", minXp: 25500, color: "sky", emoji: "🚀" },
  { level: 14, name: "Lãnh đạo Tài chính Tối cao", minXp: 32500, color: "teal", emoji: "⚡" },
  { level: 15, name: "Đại Thuyền trưởng Phố Wall", minXp: 40000, color: "amber", emoji: "🔱" },
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

export function getXpToNextLevel(currentXp: number, cfaCompleted: number = 0) {
  const currentLevel = getLevelByXp(currentXp, cfaCompleted);
  const nextLevel = getNextLevel(currentLevel.level);

  if (!nextLevel) return 0; // Already at max level

  return Math.max(0, nextLevel.minXp - currentXp);
}

export function getLevelProgress(currentXp: number, cfaCompleted: number = 0) {
  const currentLevel = getLevelByXp(currentXp, cfaCompleted);
  const nextLevel = getNextLevel(currentLevel.level);

  if (!nextLevel) return 100; // Max level reached

  const xpInCurrentLevel = currentXp - currentLevel.minXp;
  const xpNeededForLevel = nextLevel.minXp - currentLevel.minXp;

  const progress = Math.round((xpInCurrentLevel / xpNeededForLevel) * 100);
  return Math.min(100, Math.max(0, progress));
}

/* ─── XP Constants (Chống lạm phát XP) ───────────────────────────────── */

export const XP_VALUES = {
  LESSON_COMPLETED: 40, // Thắt chặt lại 40 XP thay vì 100 XP
  QUIZ_ANSWERED: 2,     // 2 XP cho mỗi câu quiz đúng
  QUIZ_PERFECT: 15,     // 15 XP thưởng hoàn thành 100% quiz
};
