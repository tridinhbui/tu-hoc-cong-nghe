export interface BadgeDefinition {
  key: string;
  name: string;
  description: string;
  icon: string;
}

export const BADGE_DEFINITIONS: Record<string, BadgeDefinition> = {
  first_lesson: {
    key: "first_lesson",
    name: "Bước đầu tiên",
    description: "Hoàn thành bài học đầu tiên",
    icon: "🌱",
  },
  first_quarter: {
    key: "first_quarter",
    name: "Khởi động",
    description: "Đọc 25% một bài học lần đầu tiên",
    icon: "🔹",
  },
  first_half: {
    key: "first_half",
    name: "Nửa chặng đường",
    description: "Đọc 50% một bài học lần đầu tiên",
    icon: "⚡",
  },
  first_three_quarter: {
    key: "first_three_quarter",
    name: "Gần về đích",
    description: "Đọc 75% một bài học lần đầu tiên",
    icon: "🔥",
  },
  lessons_5: {
    key: "lessons_5",
    name: "Kiên trì",
    description: "Hoàn thành 5 bài học",
    icon: "📚",
  },
  lessons_10: {
    key: "lessons_10",
    name: "Chăm chỉ",
    description: "Hoàn thành 10 bài học",
    icon: "🎯",
  },
  lessons_20: {
    key: "lessons_20",
    name: "Chặng 1 hoàn thành",
    description: "Hoàn thành 20 bài học đầu tiên",
    icon: "🏅",
  },
  lessons_50: {
    key: "lessons_50",
    name: "Học giả",
    description: "Hoàn thành 50 bài học",
    icon: "🎓",
  },
  lessons_100: {
    key: "lessons_100",
    name: "Chuyên gia",
    description: "Hoàn thành 100 bài học",
    icon: "💎",
  },
  lessons_200: {
    key: "lessons_200",
    name: "Bậc thầy tài chính",
    description: "Hoàn thành toàn bộ lộ trình 200 ngày",
    icon: "👑",
  },
  perfect_quiz: {
    key: "perfect_quiz",
    name: "Điểm tuyệt đối",
    description: "Đạt điểm 100% trong một bài quiz",
    icon: "⭐",
  },
  streak_3: {
    key: "streak_3",
    name: "3 ngày liên tiếp",
    description: "Học liên tục 3 ngày",
    icon: "🔗",
  },
  streak_7: {
    key: "streak_7",
    name: "1 tuần liên tiếp",
    description: "Học liên tục 7 ngày",
    icon: "🔥",
  },
};

export function getBadgesForLessonCount(count: number): string[] {
  const badges: string[] = [];
  if (count >= 1) badges.push("first_lesson");
  if (count >= 5) badges.push("lessons_5");
  if (count >= 10) badges.push("lessons_10");
  if (count >= 20) badges.push("lessons_20");
  if (count >= 50) badges.push("lessons_50");
  if (count >= 100) badges.push("lessons_100");
  if (count >= 200) badges.push("lessons_200");
  return badges;
}

export function getBadgeForMilestone(milestone: number): string | null {
  if (milestone === 25) return "first_quarter";
  if (milestone === 50) return "first_half";
  if (milestone === 75) return "first_three_quarter";
  return null;
}
