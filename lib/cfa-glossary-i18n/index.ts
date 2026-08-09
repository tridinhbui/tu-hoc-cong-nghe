import type { Locale } from "@/lib/i18n";
import { glossaryEn } from "./en";

/**
 * Bản dịch 118 thuật ngữ CFA trong lib/cfa-glossary-terms.ts.
 *
 * Cùng khuôn lib/finance-careers-i18n: lớp phủ khoá theo `id`, chỉ chứa chuỗi
 * đọc được, hợp nhất lúc render theo locale.
 *
 * VÌ SAO KHÔNG DÙNG `definitionEn` CÓ SẴN. Tệp gốc đã khai báo
 * `definitionEn?: string` từ trước, nên thoạt nhìn chỉ cần điền nốt 117 mục còn
 * lại. Nhưng trường đó là một trường CHẾT: được khai báo trong kiểu, điền cho
 * đúng 1 trong 118 mục, và CfaGlossaryFlashcards không đọc nó một lần nào -
 * component luôn render `definitionVi`. Điền tiếp vào một trường không ai đọc
 * thì không đổi được gì trên màn hình.
 *
 * Và kể cả có sửa component đọc nó, `definitionEn` cũng chỉ giải quyết được
 * MỘT trong bốn trường cần dịch. `cfaTip` (92 mục), `example` (7) và
 * `formula.numerator`/`denominator` (11 cặp) đều không có bản tiếng Anh. Thêm
 * `cfaTipEn`, `exampleEn`, `formulaEn` vào tệp gốc là nhân đôi kích thước một
 * tệp 1.069 dòng và trộn hai thứ tiếng trong cùng một bản ghi.
 *
 * Nên `definitionEn` được GỠ khỏi tệp gốc cùng lượt này, và mục duy nhất từng
 * có nó chuyển vào đây. Để lại thì lần sau có người điền tiếp vào nó và tưởng
 * mình đang dịch.
 *
 * `termEn` thì KHÔNG đụng tới: nó có ở cả 118 mục, đang được component hiển thị
 * làm tiêu đề thẻ, và vốn đã là tiếng Anh. Nó không phải trường chết.
 */

export interface GlossaryTranslation {
  /** Định nghĩa - trường duy nhất mọi mục đều cần. */
  definition?: string;
  /** Mẹo làm bài CFA. 92/118 mục có. */
  cfaTip?: string;
  /** Ví dụ số. 7/118 mục có. */
  example?: string;
  /** Tử và mẫu của công thức. 11/118 mục có. */
  formulaNumerator?: string;
  formulaDenominator?: string;
}

const BY_LOCALE: Record<string, Record<string, GlossaryTranslation>> = {
  en: glossaryEn,
};

export function glossaryPatch(id: string, locale: Locale): GlossaryTranslation | null {
  if (locale === "vi") return null;
  return BY_LOCALE[locale]?.[id] ?? null;
}

export function translatedGlossaryIds(locale: Locale): string[] {
  return Object.keys(BY_LOCALE[locale] ?? {});
}
