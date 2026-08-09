import type { Locale } from "@/lib/i18n";
import type { CfaEssay } from "@/lib/cfa-essays";
import { cfaEssaysEn } from "./en";

/**
 * Bản dịch 4 đề tự luận CFA Level III trong lib/cfa-essays.ts.
 *
 * KHÔNG GHI ĐÈ ĐƯỢC: `id`, `minutes`, và `points` của từng ý rubric. Chú thích
 * trong tệp gốc ghi rõ tổng điểm rubric phải bằng `minutes` - đúng quy ước một
 * điểm một phút của kỳ thi. Cho bản dịch sửa điểm là cho nó phá bất biến ấy,
 * nên `rubric` trong lớp phủ chỉ mang `text`.
 *
 * `rubric` LÀ MẢNG THEO VỊ TRÍ. Lệch số ý thì bỏ cả mảng và rơi về tiếng Việt:
 * ý thứ i phải đi với số điểm thứ i, và trộn lệch thì người tự chấm cộng điểm
 * cho một ý khác với ý họ vừa đọc.
 */
export interface CfaEssayTranslation {
  topic?: string;
  vignette?: string;
  prompt?: string;
  /** Theo vị trí với `rubric`; chỉ phần chữ, `points` đọc từ bản gốc. */
  rubricTexts?: string[];
  commonMistake?: string;
}

const BY_LOCALE: Record<string, Record<string, CfaEssayTranslation>> = {
  en: cfaEssaysEn,
};

export function mergeCfaEssay(essay: CfaEssay, locale: Locale): CfaEssay {
  if (locale === "vi") return essay;
  const patch = BY_LOCALE[locale]?.[essay.id];
  if (!patch) return essay;
  return {
    ...essay,
    topic: patch.topic ?? essay.topic,
    vignette: patch.vignette ?? essay.vignette,
    prompt: patch.prompt ?? essay.prompt,
    commonMistake: patch.commonMistake ?? essay.commonMistake,
    rubric:
      patch.rubricTexts?.length === essay.rubric.length
        ? essay.rubric.map((r, i) => ({ ...r, text: patch.rubricTexts![i] }))
        : essay.rubric,
  };
}

export function mergeCfaEssays(essays: CfaEssay[], locale: Locale): CfaEssay[] {
  if (locale === "vi") return essays;
  return essays.map((e) => mergeCfaEssay(e, locale));
}
