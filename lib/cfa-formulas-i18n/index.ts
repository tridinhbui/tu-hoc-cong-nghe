import type { Locale } from "@/lib/i18n";
import type { CfaFormulaItem } from "@/lib/cfa-formulas-data";
import { mergePositional, overlayFor } from "@/lib/i18n/overlay";
import { cfaFormulasEn } from "./en";

/**
 * Bản dịch 98 công thức CFA trong lib/cfa-formulas-data.ts.
 *
 * Cùng khuôn lib/frm-formulas-i18n, và cố ý giữ nguyên từng dòng của nó: lớp phủ khoá
 * theo `id`, chỉ chứa chuỗi đọc được, hợp nhất lúc render theo locale.
 *
 * CÁI KHÔNG DỊCH, và đây là phần quan trọng nhất của tệp này:
 *
 *   - `equation`, `numerator`, `denominator`, `multiplier` khi chúng là CÔNG
 *     THỨC chứ không phải câu chữ. "σp", "√252 × σ_ngày", "PD × LGD × EAD" đọc
 *     giống nhau ở mọi ngôn ngữ. Nhưng nhiều mục viết tử/mẫu bằng lời - "Lợi
 *     suất danh mục (Rp) − Lãi suất phi rủi ro (Rf)" - và những mục ĐÓ thì
 *     phải dịch. Nên bốn trường này là tuỳ chọn ở đây: điền khi có chữ, bỏ
 *     trống khi thuần ký hiệu.
 *   - `symbol` của biến. "Rp", "βp", "σ" là ký hiệu, không phải từ.
 *   - `example.result` khi nó chỉ là con số. Nhưng "A = 0,70 · B = 1,00" phải
 *     đổi dấu thập phân thành "A = 0.70 · B = 1.00", nên nó cũng là trường tuỳ
 *     chọn chứ không bị loại hẳn.
 *   - `subjectId` và `id`: cấu trúc, đọc từ phía tiếng Việt.
 *
 * MẢNG `variables` LÀ THEO VỊ TRÍ, cùng luật với options của quiz và với
 * finance-careers-i18n: phần tử thứ i bản Anh dịch phần tử thứ i bản Việt.
 * Lệch số phần tử thì `mergeFormula` bỏ nguyên mảng và rơi về tiếng Việt thay
 * vì trộn hai thứ tiếng - đó là cái chốt, không phải giấy phép làm ẩu.
 */

export interface FormulaVariableTranslation {
  /** `symbol` không dịch; chỉ tên và mô tả. */
  name: string;
  description?: string;
}

export interface FormulaTranslation {
  title?: string;
  badge?: string;
  label?: string;
  numerator?: string;
  denominator?: string;
  multiplier?: string;
  equation?: string;
  variables?: FormulaVariableTranslation[];
  example?: {
    title?: string;
    calculation?: string;
    result?: string;
    explanation?: string;
  };
}

const BY_LOCALE: Record<string, Record<string, FormulaTranslation>> = {
  en: cfaFormulasEn,
};

export function mergeFormula(item: CfaFormulaItem, locale: Locale): CfaFormulaItem {
  const patch = overlayFor(BY_LOCALE, locale)?.[item.id];
  if (!patch) return item;

  // Mảng chỉ được dùng khi cùng độ dài với bản gốc - xem chú thích đầu tệp.
  // mergePositional giữ bộ chắn độ dài ở đúng một chỗ - xem lib/i18n/overlay.ts.
  const variables =
    (item.variables &&
      mergePositional(item.variables, patch.variables, (v, t) => ({
        ...v,
        name: t.name,
        description: t.description ?? v.description,
      }))) ??
    item.variables;

  return {
    ...item,
    title: patch.title ?? item.title,
    badge: patch.badge ?? item.badge,
    label: patch.label ?? item.label,
    numerator: patch.numerator ?? item.numerator,
    denominator: patch.denominator ?? item.denominator,
    multiplier: patch.multiplier ?? item.multiplier,
    equation: patch.equation ?? item.equation,
    variables,
    example: item.example
      ? {
          ...item.example,
          title: patch.example?.title ?? item.example.title,
          calculation: patch.example?.calculation ?? item.example.calculation,
          result: patch.example?.result ?? item.example.result,
          explanation: patch.example?.explanation ?? item.example.explanation,
        }
      : item.example,
  };
}

export function mergeFormulas(items: CfaFormulaItem[], locale: Locale): CfaFormulaItem[] {
  if (locale === "vi") return items;
  return items.map((item) => mergeFormula(item, locale));
}

export function translatedFormulaIds(locale: Locale): string[] {
  return Object.keys(BY_LOCALE[locale] ?? {});
}
