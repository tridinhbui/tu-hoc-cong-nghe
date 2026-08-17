/* ─── User Level System ─────────────────────────────────────────── */

/** Thang cấp, đo bằng tổng XP.
 *
 *  Cân lại 09/08/2026, và cả hai đầu đều được nới vì cả hai đầu đều hỏng theo
 *  cùng một cách: thang cũ được thiết kế cho một nền kinh tế XP không tồn tại.
 *
 *  ĐẦU VÀO. L2 từng ở 100 XP. Một bài học cộng 10 (XP_PER_LESSON), nên phần
 *  thưởng đầu tiên của một người mới nằm cách đó MƯỜI bài, khoảng một giờ đọc.
 *  Người học xong bài đầu tiên nhìn thấy "Level 1 · 10/100" - đúng 10% của bậc
 *  thấp nhất - và không có gì xảy ra trong cả phiên đầu tiên. Giờ L2 ở 30 XP:
 *  ba bài, khoảng 18 phút, vẫn phải học thật.
 *
 *  ĐẦU RA. Đếm hết những gì nội dung có thể sinh ra: 720 bài × 10 = 7.200, đủ
 *  bốn chặng Active Recall cho MỌI bài × 30 = 21.600, toàn bộ bài thi chặng
 *  1.300. Tổng 30.100 XP - trong khi L15 đứng ở 40.000. Nghĩa là một người học
 *  hết sạch chương trình, không bỏ một chặng ôn nào, dừng ở L13; 9.900 XP còn
 *  lại chỉ đến từ nhiệm vụ lặp (trần 120/tuần) và quiz (trần 30/ngày), tức
 *  khoảng 30 tuần điểm danh khi đã không còn gì để học. Bảy bậc trên cùng là
 *  đồ trang trí. L15 giờ ở 27.000: chạm tới khi hoàn thành ~90% nội dung, còn
 *  3.100 XP biên cho người bỏ qua vài chặng ôn.
 *
 *  MỌI NGƯỠNG MỚI ĐỀU THẤP HƠN NGƯỠNG CŨ, và đó là ràng buộc chứ không phải
 *  tình cờ. `current_level` được recalculateUserStats tính lại từ tổng XP mỗi
 *  lần chạy, nên hạ ngưỡng chỉ có thể THĂNG cấp người đang học. Nâng bất kỳ
 *  ngưỡng nào lên sẽ tụt cấp những người đã đứng ở đó - lấy lại một thứ đã trao
 *  đi, thứ duy nhất trong hệ thống này không thể xin lỗi cho xong.
 *
 *  Ràng buộc đó được lib/__tests__/level-curve.test.ts giữ. */
/* i18n-ignore-start: `name` ở đây là dữ liệu, không phải chuỗi hiển thị chưa
   dịch. Giao diện đọc `t.levelTitles[lvl.level]` và chỉ rơi về `name` khi từ
   điển thiếu cấp đó - trường hợp mà lib/__tests__/track-stages-i18n.test.ts
   làm đỏ build. Bỏ dấu này đi thì 15 chuỗi đã dịch xong vẫn bị đếm là việc
   còn lại, và một con số như thế thì không ai còn tin. */
export const LEVELS = [
  { level: 1, name: "Tò mò", minXp: 0, color: "stone", emoji: "🌱" },
  { level: 2, name: "Học viên", minXp: 30, color: "stone", emoji: "🎒" },
  { level: 3, name: "Lập trình viên tập sự", minXp: 100, color: "stone", emoji: "💼" },
  { level: 4, name: "Kỹ sư phần mềm", minXp: 250, color: "stone", emoji: "📊" },
  { level: 5, name: "Kỹ sư chính", minXp: 500, color: "stone", emoji: "🛡️" },
  { level: 6, name: "Kỹ sư cao cấp", minXp: 900, color: "emerald", emoji: "👑" },
  { level: 7, name: "Chuyên gia hệ thống", minXp: 1500, color: "emerald", emoji: "🔥" },
  { level: 8, name: "Kiến trúc sư phần mềm", minXp: 2400, color: "amber", emoji: "💎" },
  { level: 9, name: "Ứng viên chứng chỉ AWS", minXp: 3600, minCfaCompleted: 5, color: "amber", emoji: "🎓" },
  { level: 10, name: "Huyền thoại mã nguồn mở", minXp: 5200, color: "rose", emoji: "🦁" },
  { level: 11, name: "Giám đốc kỹ thuật", minXp: 7500, color: "purple", emoji: "🏛️" },
  { level: 12, name: "Kiến trúc sư trưởng nền tảng", minXp: 10500, color: "indigo", emoji: "🌐" },
  { level: 13, name: "Bậc thầy thiết kế hệ thống", minXp: 14500, color: "sky", emoji: "🚀" },
  { level: 14, name: "Lãnh đạo công nghệ tối cao", minXp: 20000, color: "teal", emoji: "⚡" },
  { level: 15, name: "Đại thuyền trưởng Silicon Valley", minXp: 27000, color: "amber", emoji: "🔱" },
];

/** Ngưỡng của thang CŨ, giữ nguyên để bài kiểm chứng minh được rằng lần cân
 *  này không tụt cấp ai. Không dùng ở đâu khác; xoá nó đi là xoá bằng chứng. */
/* i18n-ignore-end */
export const PREVIOUS_LEVEL_MIN_XP = [
  0, 100, 300, 600, 1200, 2000, 3200, 5000, 7500, 10500, 14500, 19500, 25500, 32500, 40000,
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

// DOMAIN_NAMES đã bị gỡ: nó là export chết (không nơi nào import) và
// mang bảy tên lĩnh vực tài chính. Nhãn hiển thị thật đi qua từ điển
// (t.domains[...]), nơi corporate_finance đã là "Backend & API".
//
// Bản thân các KHOÁ - corporate_finance, ai_for_finance - thì ở lại: chúng là
// giá trị đã ghi xuống Supabase kèm ràng buộc check trong
// 20260806_gamification_system.sql, nên đổi tên là mồ côi mọi hàng đã có.

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

/** XP cho một bài học hoàn thành. Đây là NGUỒN DUY NHẤT của con số đó:
 *  recalculateUserStats nhân số bài đã xong với nó, và mọi câu chữ hứa hẹn XP
 *  cho việc học một bài phải nội suy từ đây thay vì viết số vào từ điển.
 *
 *  Chỗ này trước là `XP_VALUES = { LESSON_COMPLETED: 40, ... }`, và không một
 *  dòng mã nào đọc nó: sổ cái nhân với số 10 viết thẳng, còn hằng số thì ghi
 *  40. Nó đứng đó đủ lâu để giao diện tự bịa ra các con số riêng - trang đăng
 *  nhập hứa "+120 XP / bài", thẻ học tiếp hứa "+30 XP", quiz tin tức hứa
 *  "+15 XP" trong khi nhiệm vụ ấy trả 8. Một hằng số không ai đọc còn tệ hơn
 *  không có hằng số nào, vì nó trông như một nguồn sự thật. */
export const XP_PER_LESSON = 10;
