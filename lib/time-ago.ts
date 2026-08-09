import { format } from "@/lib/i18n";

/** "5 phút trước" / "2 giờ trước" / "3 ngày trước" style relative time.
 *
 *  Extracted from components/CommunityFeedClient.tsx's local `timeAgo` so
 *  components/NotificationBell.tsx can use the exact same wording instead of
 *  writing a second copy. (Not the only copy in the codebase -
 *  LessonPageClient.tsx and CfaModulePageClient.tsx have their own local
 *  versions too, but consolidating those is a separate, unrelated cleanup.)
 *
 *  NHẬN CHUỖI TỪ ĐIỂN CHỨ KHÔNG NHẬN CẢ `Dictionary`: hàm này gọi từ ba
 *  component, và truyền nguyên từ điển vào một hàm thuần chỉ để lấy bốn chuỗi
 *  làm chữ ký khó đọc hơn phần nó tính. */
export interface TimeAgoStrings {
  justNow: string;
  minutes: string;
  hours: string;
  days: string;
}

export function timeAgo(dateString: string, s: TimeAgoStrings): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return s.justNow;
  if (minutes < 60) return format(s.minutes, { n: minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return format(s.hours, { n: hours });
  const days = Math.floor(hours / 24);
  return format(s.days, { n: days });
}
