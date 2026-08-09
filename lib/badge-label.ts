import { LEVEL_BADGE_DEFINITIONS } from "@/lib/badges";
import { format } from "@/lib/i18n";

/** Chỉ phần chữ cần cho một huy hiệu; nhận thẳng hàng từ Supabase. */
interface StoredBadge {
  badge_key: string;
  badge_name: string;
  badge_description: string;
}

interface BadgeCopy {
  badges: Record<string, { name: string; description: string }>;
  levelTitles: Record<number, string>;
  badgeLevelDescription: string;
}

// Tên và mô tả huy hiệu, dịch tại CHỖ HIỂN THỊ chứ không ở lib/supabase-badges.
//
// Lý do: `badge_name`/`badge_description` là cột của hàng huy hiệu trên
// Supabase. Dịch ở tầng đọc dữ liệu nghĩa là chuỗi tiếng Anh đi vào chính hình
// dạng được ghi ngược lên bảng - và một người đổi ngôn ngữ sẽ ghi đè huy hiệu
// đã lưu của họ. Ở đây thì bản ghi giữ nguyên, chỉ màn hình đổi.
//
// HUY HIỆU CẤP ĐỘ lấy tên từ `t.levelTitles` chứ không có mục riêng: huy hiệu
// `level_2` tên đúng bằng tên cấp 2. Chép sang một bảng thứ hai thì hai bên sẽ
// lệch, và lệch ở đây nghĩa là huy hiệu mang tên khác với cấp vừa trao nó.
export function badgeName(badge: StoredBadge, t: BadgeCopy): string {
  const level = LEVEL_BADGE_DEFINITIONS[badge.badge_key]?.level;
  if (level !== undefined) return t.levelTitles[level] ?? badge.badge_name;
  return t.badges[badge.badge_key]?.name ?? badge.badge_name;
}

export function badgeDescription(badge: StoredBadge, t: BadgeCopy): string {
  const level = LEVEL_BADGE_DEFINITIONS[badge.badge_key]?.level;
  if (level !== undefined) return format(t.badgeLevelDescription, { level });
  return t.badges[badge.badge_key]?.description ?? badge.badge_description;
}
