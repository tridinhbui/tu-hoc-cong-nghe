import type { Locale } from "@/lib/i18n";
import type { LessonRoomLink } from "@/lib/lesson-room-links";
import { lessonRoomLinksEn } from "./en";

/**
 * Bản dịch nhãn nối bài học sang phòng 3D trong lib/lesson-room-links.ts.
 *
 * Cùng khuôn các lớp phủ khác: khoá theo slug bài học, chỉ chứa chữ.
 *
 * `room` KHÔNG ghi đè được - nó là id phòng, đổi là nút dẫn sang phòng khác chứ
 * không phải đổi chữ trên nút.
 *
 * MỘT ĐIỂM RIÊNG CỦA TỆP NÀY: 15 slug nhưng chỉ 14 cặp cta/why khác nhau -
 * `cash-conversion-cycle` và `cash-conversion-cycle-2` dùng chung nội dung. Bản
 * dịch giữ nguyên cấu trúc khoá-theo-slug thay vì gộp, vì gộp là đổi hình dạng
 * dữ liệu gốc; hai khoá trùng nội dung ở đây rẻ hơn một tầng gián tiếp.
 */
export interface LessonRoomLinkTranslation {
  cta?: string;
  why?: string;
}

const BY_LOCALE: Record<string, Record<string, LessonRoomLinkTranslation>> = {
  en: lessonRoomLinksEn,
};

export function mergeLessonRoomLink(
  slug: string,
  link: LessonRoomLink,
  locale: Locale
): LessonRoomLink {
  if (locale === "vi") return link;
  const patch = BY_LOCALE[locale]?.[slug];
  if (!patch) return link;
  return { ...link, cta: patch.cta ?? link.cta, why: patch.why ?? link.why };
}
