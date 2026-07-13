import { LEVELS } from "@/lib/levels";

export interface BadgeDefinition {
  key: string;
  name: string;
  description: string;
  icon: string;
  level?: number;
}

// Level 1 is the default starting point, so badges begin at level 2.
export const LEVEL_BADGE_DEFINITIONS: Record<string, BadgeDefinition> = {
  level_2: {
    key: "level_2",
    name: "Học viên",
    description: "Đạt level 2",
    icon: "②",
    level: 2,
  },
  level_3: {
    key: "level_3",
    name: "Nhà đầu tư",
    description: "Đạt level 3",
    icon: "③",
    level: 3,
  },
  level_4: {
    key: "level_4",
    name: "Nhà phân tích",
    description: "Đạt level 4",
    icon: "④",
    level: 4,
  },
  level_5: {
    key: "level_5",
    name: "Cố vấn Tài chính",
    description: "Đạt level 5",
    icon: "⑤",
    level: 5,
  },
  level_6: {
    key: "level_6",
    name: "Thạo thủ Tài chính",
    description: "Đạt level 6",
    icon: "⑥",
    level: 6,
  },
};

export const LEADERBOARD_BADGE_DEFINITIONS: Record<string, BadgeDefinition> = {
  leaderboard_xp_top_10: {
    key: "leaderboard_xp_top_10",
    name: "Top 10 XP",
    description: "Lọt top 10 bảng xếp hạng XP",
    icon: "🏆",
  },
  leaderboard_lessons_top_10: {
    key: "leaderboard_lessons_top_10",
    name: "Top 10 Số bài",
    description: "Lọt top 10 bảng xếp hạng số bài học",
    icon: "📚",
  },
  leaderboard_avg_score_top_10: {
    key: "leaderboard_avg_score_top_10",
    name: "Top 10 Điểm TB",
    description: "Lọt top 10 bảng xếp hạng điểm trung bình",
    icon: "🎯",
  },
  leaderboard_streak_top_10: {
    key: "leaderboard_streak_top_10",
    name: "Top 10 Chuỗi ngày",
    description: "Lọt top 10 bảng xếp hạng chuỗi ngày",
    icon: "🔥",
  },
};

export const BADGE_DEFINITIONS = {
  ...LEVEL_BADGE_DEFINITIONS,
  ...LEADERBOARD_BADGE_DEFINITIONS,
};

export function getLevelBadgeKeys(currentLevel: number): string[] {
  return LEVELS
    .filter((level) => level.level >= 2 && level.level <= currentLevel)
    .map((level) => `level_${level.level}`)
    .filter((key) => key in LEVEL_BADGE_DEFINITIONS);
}

export const LEADERBOARD_TOP_10_BADGE_KEYS = [
  "leaderboard_xp_top_10",
  "leaderboard_lessons_top_10",
  "leaderboard_avg_score_top_10",
  "leaderboard_streak_top_10",
] as const;
