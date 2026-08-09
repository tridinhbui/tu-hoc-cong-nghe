import { describe, expect, it } from "vitest";
import { CFA_GLOSSARY_TERMS } from "@/lib/cfa-glossary-terms";
import { glossaryEn } from "@/lib/cfa-glossary-i18n/en";
import { glossaryPatch } from "@/lib/cfa-glossary-i18n";

/** Cùng ba lỗi âm thầm với career-translations, cùng lý do: `Record<string, …>`
 *  nhận mọi khoá, nên gõ sai id là bản dịch không bao giờ được dùng và không có
 *  gì báo.
 *
 *  KHÔNG có phép kiểm "đủ 118/118" ở đây, và đó là chủ ý. Kho mới dịch một
 *  phần; đặt cổng đủ-100% bây giờ thì nó đỏ suốt cho tới lô cuối, mà một cổng
 *  đỏ thường trực là cổng người ta học cách phớt lờ. Thêm nó vào lúc đủ, đúng
 *  như đã làm với finance-careers. */

const byId = new Map(CFA_GLOSSARY_TERMS.map((t) => [t.id, t]));

describe("bản dịch thuật ngữ CFA (en)", () => {
  it("mọi khoá đều trỏ vào một thuật ngữ có thật", () => {
    const unknown = Object.keys(glossaryEn).filter((id) => !byId.has(id));
    expect(unknown, `id không có trong CFA_GLOSSARY_TERMS: ${unknown.join(", ")}`).toEqual([]);
  });

  it("chỉ dịch những trường bản gốc thực sự có", () => {
    // Dịch `cfaTip` cho một mục không có `cfaTip` thì chuỗi đó không bao giờ
    // hiện ra - component chỉ render khối mẹo khi bản gốc có. Cùng thế với
    // `example` và công thức.
    const orphans: string[] = [];
    for (const [id, patch] of Object.entries(glossaryEn)) {
      const source = byId.get(id);
      if (!source) continue;
      if (patch.cfaTip && !source.cfaTip) orphans.push(`${id}.cfaTip`);
      if (patch.example && !source.example) orphans.push(`${id}.example`);
      if (patch.formulaNumerator && !source.formula?.numerator) orphans.push(`${id}.formulaNumerator`);
      if (patch.formulaDenominator && !source.formula?.denominator) orphans.push(`${id}.formulaDenominator`);
    }
    expect(orphans, `dịch trường mà bản gốc không có: ${orphans.join(", ")}`).toEqual([]);
  });

  it("không để sót chuỗi tiếng Việt trong bản dịch", () => {
    const DIACRITICS =
      /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
    const leaks: string[] = [];
    for (const [id, patch] of Object.entries(glossaryEn)) {
      for (const [field, value] of Object.entries(patch)) {
        if (typeof value === "string" && DIACRITICS.test(value)) leaks.push(`${id}.${field}: ${value}`);
      }
    }
    expect(leaks, leaks.join("\n")).toEqual([]);
  });

  it("locale vi không trả về bản dịch nào", () => {
    const id = Object.keys(glossaryEn)[0];
    expect(glossaryPatch(id, "vi")).toBeNull();
    expect(glossaryPatch(id, "en")).not.toBeNull();
  });

  it("definitionEn đã bị gỡ khỏi tệp dữ liệu gốc", () => {
    // Trường chết: khai báo trong kiểu, điền cho đúng 1/118 mục, component
    // không đọc lần nào. Để lại thì lần sau có người điền tiếp vào nó và tưởng
    // mình đang dịch. Nội dung của mục đó đã chuyển sang cfa-glossary-i18n.
    const withDeadField = CFA_GLOSSARY_TERMS.filter(
      (t) => (t as unknown as Record<string, unknown>).definitionEn !== undefined
    );
    expect(
      withDeadField.map((t) => t.id),
      "definitionEn quay lại tệp gốc - bản dịch thuộc về lib/cfa-glossary-i18n"
    ).toEqual([]);
  });
});
