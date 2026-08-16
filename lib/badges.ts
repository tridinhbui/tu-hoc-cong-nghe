import { LEVELS } from "@/lib/levels";

export interface BadgeDefinition {
  key: string;
  name: string;
  description: string;
  icon: string;
  level?: number;
}

// Level 1 is the default starting point, so badges begin at level 2.
/* i18n-ignore-start: `name` và `description` của mọi huy hiệu đã có lớp phủ.
   Tên huy hiệu cấp độ lấy từ `t.levelTitles[level]` - CHÍNH nguồn đặt tên cấp -
   chứ không có mục riêng, để hai bên không lệch nhau; mô tả dùng mẫu
   `t.badgeLevelDescription`. Huy hiệu khác cấp độ tra `t.badges[key]`. Tất cả
   đi qua lib/badge-label.ts, dịch ở CHỖ HIỂN THỊ chứ không ở tầng đọc dữ liệu,
   vì `badge_name` là một cột trên Supabase. lib/__tests__/badges-competency-i18n.test.ts
   giữ chúng khớp nhau và chặn việc chép tên cấp sang bảng huy hiệu. */
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
    name: "Lập trình viên tập sự",
    description: "Đạt level 3",
    icon: "③",
    level: 3,
  },
  level_4: {
    key: "level_4",
    name: "Kỹ sư phần mềm",
    description: "Đạt level 4",
    icon: "④",
    level: 4,
  },
  level_5: {
    key: "level_5",
    name: "Kỹ sư chính",
    description: "Đạt level 5",
    icon: "⑤",
    level: 5,
  },
  level_6: {
    key: "level_6",
    name: "Kỹ sư cao cấp",
    description: "Đạt level 6",
    icon: "⑥",
    level: 6,
  },
  // Cấp 7-15. Bảng này từng dừng ở cấp 6 trong khi lib/levels.ts có 15 cấp, nên
  // người học qua cấp 6 thì số huy hiệu đứng yên vĩnh viễn - đúng điều một người
  // dùng báo lại ("danh hiệu cũng ko tăng"). Không có gì chặn cả: getLevelBadgeKeys
  // lọc LEVELS theo chính bảng này, nên một cấp thiếu mục ở đây là một cấp không
  // bao giờ trao huy hiệu, im lặng và không có lỗi nào.
  //
  // `name` PHẢI khớp từng chữ với levelTitlesVi.levelTitles[level] - huy hiệu
  // mang đúng tên cấp đã trao nó, và badges-competency-i18n.test.ts làm đỏ build
  // nếu hai bên lệch. Chúng cũng KHÔNG được có mục riêng trong bảng dịch huy
  // hiệu: badgeName() đọc t.levelTitles, và một mục thứ hai là một nguồn thứ hai
  // để lệch.
  level_7: {
    key: "level_7",
    name: "Chuyên gia hệ thống",
    description: "Đạt level 7",
    icon: "⑦",
    level: 7,
  },
  level_8: {
    key: "level_8",
    name: "Kiến trúc sư phần mềm",
    description: "Đạt level 8",
    icon: "⑧",
    level: 8,
  },
  level_9: {
    key: "level_9",
    name: "Ứng viên chứng chỉ AWS",
    description: "Đạt level 9",
    icon: "⑨",
    level: 9,
  },
  level_10: {
    key: "level_10",
    name: "Huyền thoại mã nguồn mở",
    description: "Đạt level 10",
    icon: "⑩",
    level: 10,
  },
  level_11: {
    key: "level_11",
    name: "Giám đốc kỹ thuật",
    description: "Đạt level 11",
    icon: "⑪",
    level: 11,
  },
  level_12: {
    key: "level_12",
    name: "Kiến trúc sư trưởng nền tảng",
    description: "Đạt level 12",
    icon: "⑫",
    level: 12,
  },
  level_13: {
    key: "level_13",
    name: "Bậc thầy thiết kế hệ thống",
    description: "Đạt level 13",
    icon: "⑬",
    level: 13,
  },
  level_14: {
    key: "level_14",
    name: "Lãnh đạo công nghệ tối cao",
    description: "Đạt level 14",
    icon: "⑭",
    level: 14,
  },
  level_15: {
    key: "level_15",
    name: "Đại thuyền trưởng Silicon Valley",
    description: "Đạt level 15",
    icon: "⑮",
    level: 15,
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

// Career-map milestones - unlike level/leaderboard badges these are keyed
// off real state in user_career_goals / user_quest_completions / user_progress
// (resolved by lib/supabase-badges.ts's getEligibleUserBadges), not level.
export const CAREER_BADGE_DEFINITIONS: Record<string, BadgeDefinition> = {
  career_goal_set: {
    key: "career_goal_set",
    name: "Đã đặt Mục tiêu Sự nghiệp",
    description: "Đặt một vị trí trong Bản đồ Việc làm làm mục tiêu sự nghiệp",
    icon: "🎯",
  },
  career_quiz_done: {
    key: "career_quiz_done",
    name: "Đã hoàn thành Trắc nghiệm Hướng nghiệp",
    description: "Hoàn thành bài trắc nghiệm hướng nghiệp 5 câu hỏi",
    icon: "🧭",
  },
  career_path_complete: {
    key: "career_path_complete",
    name: "Hoàn thành Lộ trình Sự nghiệp",
    description: "Học xong toàn bộ bài học liên quan tới mục tiêu sự nghiệp đang theo dõi",
    icon: "🏁",
  },
};

/* i18n-ignore-end */

export const BADGE_DEFINITIONS = {
  ...LEVEL_BADGE_DEFINITIONS,
  ...LEADERBOARD_BADGE_DEFINITIONS,
  ...CAREER_BADGE_DEFINITIONS,
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
