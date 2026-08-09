import type { FinanceCareer } from "@/lib/finance-careers";
import type { Locale } from "@/lib/i18n";
import { careersEn } from "./en";

/**
 * Bản dịch 47 nghề trong lib/finance-careers.ts.
 *
 * VÌ SAO KHÔNG ĐƯA VÀO lib/i18n/dictionaries/. Từ điển UI là các chuỗi cố
 * định, viết tay, một khoá một câu. Đây là DỮ LIỆU: 47 bản ghi cùng hình dạng,
 * mỗi bản ghi 16 trường dịch được trong đó có bốn mảng dài. Nhét vào từ điển
 * thì `vi.ts` và `en.ts` mỗi tệp phồng thêm hơn nghìn dòng, và cổng
 * dictionary-parity vốn so từng khoá một sẽ báo 1.239 dòng cho một thay đổi
 * duy nhất. Cùng lý do lib/lessons-i18n/ tách riêng khỏi từ điển.
 *
 * CHỈ CHỨA CHUỖI ĐỌC ĐƯỢC, giống lessons-i18n. Mọi thứ cấu trúc - `id`,
 * `emoji`, `accentFrom`/`accentTo`, `avatar3d`, `relatedLessonSlugs`,
 * `relatedCfaSubjectIds`, và ba thang điểm `entryDifficulty`/`stressLevel`/
 * `wlb` - đọc từ phía tiếng Việt và KHÔNG ghi đè được. Một bản dịch đổi
 * `relatedLessonSlugs` là đổi luôn kế hoạch học và tiến độ mục tiêu nghề của
 * người dùng, chứ không phải đổi chữ trên màn hình.
 *
 * `englishTitle` cũng không nằm ở đây: nó đã là tiếng Anh sẵn trong dữ liệu
 * gốc và hiện làm phụ đề dưới `title` ở CẢ HAI ngôn ngữ. Bản tiếng Anh dịch
 * `title`, còn `englishTitle` giữ nguyên vai trò phụ đề.
 *
 * MẢNG LÀ THEO VỊ TRÍ, cùng luật với options của quiz: phần tử thứ i của
 * `responsibilities` bản Anh phải dịch phần tử thứ i bản Việt. Lệch số phần tử
 * thì `mergeCareer` bỏ nguyên mảng và rơi về tiếng Việt thay vì trộn hai thứ
 * tiếng - đó là cái chốt, không phải giấy phép làm ẩu.
 */

/** Những trường được phép dịch. Mọi trường khác đọc từ bản tiếng Việt. */
export type TranslatableCareerFields = Pick<
  FinanceCareer,
  | "title"
  | "summary"
  | "responsibilities"
  | "skills"
  | "entryLevel"
  | "salaryHint"
  | "searchKeyword"
  | "dayInLife"
  | "careerPath"
  | "requiredTools"
  | "certifications"
  | "pros"
  | "cons"
  | "applicationTips"
>;

export type CareerTranslation = Partial<TranslatableCareerFields>;

const BY_LOCALE: Record<string, Record<string, CareerTranslation>> = {
  en: careersEn,
};

/** Mảng dịch chỉ được dùng khi cùng độ dài với bản gốc. */
function mergeArray(source: string[], translated: string[] | undefined): string[] {
  if (!translated || translated.length !== source.length) return source;
  return translated;
}

export function mergeCareer(career: FinanceCareer, locale: Locale): FinanceCareer {
  if (locale === "vi") return career;
  const patch = BY_LOCALE[locale]?.[career.id];
  if (!patch) return career;
  return {
    ...career,
    title: patch.title ?? career.title,
    summary: patch.summary ?? career.summary,
    entryLevel: patch.entryLevel ?? career.entryLevel,
    salaryHint: patch.salaryHint ?? career.salaryHint,
    searchKeyword: patch.searchKeyword ?? career.searchKeyword,
    dayInLife: patch.dayInLife ?? career.dayInLife,
    pros: patch.pros ?? career.pros,
    cons: patch.cons ?? career.cons,
    applicationTips: patch.applicationTips ?? career.applicationTips,
    responsibilities: mergeArray(career.responsibilities, patch.responsibilities),
    skills: mergeArray(career.skills, patch.skills),
    careerPath: mergeArray(career.careerPath, patch.careerPath),
    requiredTools: mergeArray(career.requiredTools, patch.requiredTools),
    certifications: mergeArray(career.certifications, patch.certifications),
  };
}

export function mergeCareers(careers: FinanceCareer[], locale: Locale): FinanceCareer[] {
  if (locale === "vi") return careers;
  return careers.map((c) => mergeCareer(c, locale));
}

/** Bao nhiêu nghề đã có bản dịch cho locale này - dùng cho bộ kiểm tiến độ. */
export function translatedCareerIds(locale: Locale): string[] {
  return Object.keys(BY_LOCALE[locale] ?? {});
}
