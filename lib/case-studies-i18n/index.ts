import type { Locale } from "@/lib/i18n";
import type { CaseStudyItem } from "@/lib/case-studies-data";
import { caseStudiesEn } from "./en";

/**
 * Bản dịch 3 case study doanh nghiệp Việt Nam trong lib/case-studies-data.ts.
 *
 * Cùng khuôn lib/finance-careers-i18n và lib/cfa-glossary-i18n.
 *
 * KHÔNG GHI ĐÈ ĐƯỢC, và ở đây danh sách dài hơn mọi bộ trước:
 *   `ticker`      mã cổ phiếu - FPT, VNM, HPG là mã trên sàn, không phải chữ.
 *   `difficulty`  giá trị enum dùng để chọn màu và lọc.
 *   `xpReward`,
 *   `coinReward`  số, và là phần thưởng thật ghi vào tài khoản người học.
 *   `correct`     chỉ số đáp án đúng.
 *   `slug`        của bài học liên quan - đổi là hỏng đường dẫn.
 *
 * `options` VÀ `relatedLessonSlugs` LÀ MẢNG THEO VỊ TRÍ, cùng luật với quiz bài
 * học: phần tử thứ i bản Anh dịch phần tử thứ i bản Việt, vì `correct` đọc từ
 * phía tiếng Việt. Lệch số phần tử thì mergeCaseStudy bỏ nguyên mảng và rơi về
 * tiếng Việt - đó là chốt để không bao giờ trỏ `correct` vào một phương án khác.
 *
 * TÊN DOANH NGHIỆP dịch phần mô tả pháp nhân, giữ tên riêng: "Công ty Cổ phần
 * Sữa Việt Nam" thành "Vietnam Dairy Products JSC" chứ không phải "Vinamilk" -
 * đó là hai thứ khác nhau và trường `company` đang giữ tên pháp nhân.
 */

export interface CaseStudyQuestionTranslation {
  prompt?: string;
  options?: string[];
  explanation?: string;
}

export interface CaseStudyTranslation {
  title?: string;
  company?: string;
  sector?: string;
  description?: string;
  /** Theo vị trí, chỉ tiêu đề bài học - `slug` đọc từ phía tiếng Việt. */
  relatedLessonTitles?: string[];
  /** Theo vị trí với mảng `questions` của bản gốc. */
  questions?: CaseStudyQuestionTranslation[];
}

const BY_LOCALE: Record<string, Record<string, CaseStudyTranslation>> = {
  en: caseStudiesEn,
};

export function mergeCaseStudy(item: CaseStudyItem, locale: Locale): CaseStudyItem {
  if (locale === "vi") return item;
  const patch = BY_LOCALE[locale]?.[item.id];
  if (!patch) return item;

  const relatedLessonSlugs =
    patch.relatedLessonTitles?.length === item.relatedLessonSlugs.length
      ? item.relatedLessonSlugs.map((l, i) => ({ ...l, title: patch.relatedLessonTitles![i] }))
      : item.relatedLessonSlugs;

  const questions =
    patch.questions?.length === item.questions.length
      ? item.questions.map((q, i) => {
          const qp = patch.questions![i];
          return {
            ...q,
            prompt: qp?.prompt ?? q.prompt,
            explanation: qp?.explanation ?? q.explanation,
            options: qp?.options?.length === q.options.length ? qp.options : q.options,
          };
        })
      : item.questions;

  return {
    ...item,
    title: patch.title ?? item.title,
    company: patch.company ?? item.company,
    sector: patch.sector ?? item.sector,
    description: patch.description ?? item.description,
    relatedLessonSlugs,
    questions,
  };
}

export function mergeCaseStudies(items: CaseStudyItem[], locale: Locale): CaseStudyItem[] {
  if (locale === "vi") return items;
  return items.map((c) => mergeCaseStudy(c, locale));
}
