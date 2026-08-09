import type { Locale } from "@/lib/i18n";
import type { CfaLevelSpec } from "@/lib/cfa-levels";
import { cfaLevelsEn } from "./en";

/**
 * Bản dịch mô tả CFA Level II và III trong lib/cfa-levels.ts.
 *
 * Cùng khuôn các lớp phủ khác, nhưng tệp này CHỦ YẾU đã là tiếng Anh sẵn nên
 * phần dịch nhỏ hơn con số bộ đếm báo. Cụ thể, ba nhóm KHÔNG dịch:
 *
 *   `topics[].name`  Tên môn thi chính thức của CFA Institute - "Fixed Income",
 *                    "Portfolio Management". Đây là tên riêng của môn trong đề
 *                    thi, và người học phải nhận ra đúng chuỗi ấy trên trang
 *                    của CFA Institute. Ngoại lệ duy nhất là "Hướng chuyên sâu
 *                    đã chọn" - đó là câu mô tả, không phải tên môn.
 *   `pathways`       Ba hướng chuyên sâu, cũng là tên chính thức.
 *   `label`          "CFA Level II" - đã là tiếng Anh.
 *
 * MỌI CON SỐ ĐỀU GIỮ NGUYÊN, và đây là chỗ đáng cẩn thận nhất trong tệp này.
 * Chú thích đầu lib/cfa-levels.ts ghi rõ: số liệu lấy từ trang candidate
 * resources của CFA Institute, và "một bảng trọng số bịa trông y hệt một bảng
 * trọng số đúng". Bản dịch chỉ đổi chữ quanh con số - "2 giờ 12 phút" thành
 * "2 hours 12 minutes" - chứ không đụng `lo`/`hi`, vốn không nằm trong lớp phủ
 * này nên không ghi đè được kể cả khi muốn.
 *
 * `facts` VÀ `topics` LÀ MẢNG THEO VỊ TRÍ. Lệch số phần tử thì bỏ nguyên mảng
 * và rơi về tiếng Việt, không trộn hai thứ tiếng trong một bảng.
 */

export interface CfaLevelTranslation {
  format?: string;
  /** Theo vị trí với `facts`: mỗi phần tử là [nhãn, giá trị]. */
  facts?: Array<[string, string]>;
  /** Theo vị trí với `topics`; chỉ `name`, còn `lo`/`hi` đọc từ bản gốc. */
  topicNames?: string[];
  noMockReason?: string;
}

const BY_LOCALE: Record<string, Record<string, CfaLevelTranslation>> = {
  en: cfaLevelsEn,
};

export function mergeCfaLevel(spec: CfaLevelSpec, locale: Locale): CfaLevelSpec {
  if (locale === "vi") return spec;
  const patch = BY_LOCALE[locale]?.[spec.level];
  if (!patch) return spec;
  return {
    ...spec,
    format: patch.format ?? spec.format,
    noMockReason: patch.noMockReason ?? spec.noMockReason,
    facts: patch.facts?.length === spec.facts.length ? patch.facts : spec.facts,
    topics:
      patch.topicNames?.length === spec.topics.length
        ? spec.topics.map((t, i) => ({ ...t, name: patch.topicNames![i] }))
        : spec.topics,
  };
}

export function mergeCfaLevels(specs: CfaLevelSpec[], locale: Locale): CfaLevelSpec[] {
  if (locale === "vi") return specs;
  return specs.map((s) => mergeCfaLevel(s, locale));
}
