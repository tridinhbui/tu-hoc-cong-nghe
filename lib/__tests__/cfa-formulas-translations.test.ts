import { describe, it, expect } from "vitest";
import { CFA_FORMULAS_DATA } from "@/lib/cfa-formulas-data";
import { cfaFormulasEn } from "@/lib/cfa-formulas-i18n/en";
import { mergeFormula, translatedFormulaIds } from "@/lib/cfa-formulas-i18n";

const DIACRITICS =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

// Đã dịch đủ 98/98, nên cổng này chuyển từ ĐO TIẾN ĐỘ sang CHẶN HỒI QUY: thêm
// một công thức vào lib/cfa-formulas-data.ts mà quên bản Anh thì công thức đó
// hiện tiếng Việt giữa một sổ tay tiếng Anh, và không có gì khác báo.
//
// Bản trước dùng một con SÀN nâng dần trong lúc dịch dở. Giữ lại cái sàn sau
// khi đã xong là để lại một cổng luôn xanh - nó cho phép xoá mất tám bản dịch
// mà vẫn qua.

describe("bản dịch công thức CFA", () => {
  it("mọi công thức đều có bản Anh", () => {
    const ids = new Set(translatedFormulaIds("en"));
    const missing = CFA_FORMULAS_DATA.filter((f) => !ids.has(f.id)).map((f) => f.id);
    expect(missing, `Thêm vào lib/cfa-formulas-i18n/en.ts: ${missing.join(", ")}`).toEqual([]);
  });

  it("mọi công thức đều có title đã dịch", () => {
    // `title` là thứ duy nhất luôn hiện trên thẻ và là thứ ô tìm kiếm so khớp.
    // Một mục chỉ dịch `example` mà bỏ `title` vẫn qua được ca ở trên.
    const untitled = CFA_FORMULAS_DATA.filter((f) => !cfaFormulasEn[f.id]?.title).map((f) => f.id);
    expect(untitled).toEqual([]);
  });

  it("không có khoá thừa - id phải tồn tại trong bản gốc", () => {
    const ids = new Set(CFA_FORMULAS_DATA.map((f) => f.id));
    expect(Object.keys(cfaFormulasEn).filter((k) => !ids.has(k))).toEqual([]);
  });

  it("mọi chuỗi đã dịch đều không còn dấu tiếng Việt", () => {
    for (const [id, patch] of Object.entries(cfaFormulasEn)) {
      const strings = [
        patch.title,
        patch.badge,
        patch.label,
        patch.numerator,
        patch.denominator,
        patch.multiplier,
        patch.equation,
        patch.example?.title,
        patch.example?.calculation,
        patch.example?.result,
        patch.example?.explanation,
        ...(patch.variables ?? []).flatMap((v) => [v.name, v.description]),
      ].filter(Boolean) as string[];
      for (const value of strings) {
        expect(DIACRITICS.test(value), `${id}: "${value}"`).toBe(false);
      }
    }
  });

  it("mảng variables đúng số phần tử, nếu không thì cả mảng bị bỏ", () => {
    // Luật vị trí giống options của quiz: lệch độ dài thì `mergeFormula` rơi về
    // tiếng Việt thay vì trộn hai thứ tiếng. Đó là cái chốt - nhưng một mảng bị
    // bỏ âm thầm cũng là một bản dịch không bao giờ hiện ra, nên kiểm ở đây.
    const mismatched: string[] = [];
    for (const item of CFA_FORMULAS_DATA) {
      const patch = cfaFormulasEn[item.id];
      if (!patch?.variables) continue;
      if (patch.variables.length !== (item.variables?.length ?? 0)) mismatched.push(item.id);
    }
    expect(mismatched).toEqual([]);
  });

  it("mergeFormula giữ nguyên ký hiệu biến và im lặng ở tiếng Việt", () => {
    const item = CFA_FORMULAS_DATA.find((f) => f.id === "q-002")!;
    expect(mergeFormula(item, "vi")).toBe(item);
    const en = mergeFormula(item, "en");
    expect(en.title).toBe("Sharpe Ratio");
    // `symbol` là ký hiệu toán, không dịch - và bản dịch không được phép đổi nó.
    expect(en.variables?.map((v) => v.symbol)).toEqual(item.variables?.map((v) => v.symbol));
    expect(en.subjectId).toBe(item.subjectId);
  });
});
