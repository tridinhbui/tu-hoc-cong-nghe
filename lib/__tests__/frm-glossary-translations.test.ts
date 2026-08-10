import { describe, it, expect } from "vitest";
import { FRM_GLOSSARY_TERMS } from "@/lib/frm-glossary-terms";
import { frmGlossaryEn } from "@/lib/cfa-glossary-i18n/frm-en";
import { glossaryPatch } from "@/lib/cfa-glossary-i18n";

const DIACRITICS =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

// Bộ thẻ FRM đã dịch đủ 92/92, nên cổng này chặn HỒI QUY chứ không đo tiến độ:
// thêm một thẻ vào lib/frm-glossary-terms.ts mà quên bản Anh thì thẻ đó hiện
// tiếng Việt giữa một bộ tiếng Anh, và không có gì khác báo.
describe("bản dịch thẻ thuật ngữ FRM", () => {
  it("mọi thẻ đều có bản Anh", () => {
    const missing = FRM_GLOSSARY_TERMS.filter((t) => !frmGlossaryEn[t.id]).map((t) => t.id);
    expect(missing, `Thêm vào lib/cfa-glossary-i18n/frm-en.ts: ${missing.join(", ")}`).toEqual([]);
  });

  it("mọi định nghĩa đều có và không còn dấu tiếng Việt", () => {
    for (const term of FRM_GLOSSARY_TERMS) {
      const en = frmGlossaryEn[term.id];
      expect(en.definition, `${term.id} thiếu definition`).toBeTruthy();
      expect(DIACRITICS.test(en.definition!), `${term.id}: "${en.definition}"`).toBe(false);
      if (en.frmTip) expect(DIACRITICS.test(en.frmTip), `${term.id} tip`).toBe(false);
      if (en.example) expect(DIACRITICS.test(en.example), `${term.id} example`).toBe(false);
    }
  });

  it("thẻ nào có frmTip ở bản gốc thì bản Anh cũng phải có", () => {
    // `frmTip` là chỗ ghi cái bẫy của thẻ, không phải phần trang trí. Dịch
    // definition mà bỏ tip là bỏ đúng phần dạy nhiều nhất.
    const dropped = FRM_GLOSSARY_TERMS.filter((t) => t.frmTip && !frmGlossaryEn[t.id]?.frmTip).map(
      (t) => t.id
    );
    expect(dropped).toEqual([]);
  });

  it("không có khoá thừa", () => {
    const ids = new Set(FRM_GLOSSARY_TERMS.map((t) => t.id));
    expect(Object.keys(frmGlossaryEn).filter((k) => !ids.has(k))).toEqual([]);
  });

  it("glossaryPatch tra được cả hai bộ, và im lặng ở tiếng Việt", () => {
    const id = FRM_GLOSSARY_TERMS[0].id;
    expect(glossaryPatch(id, "vi")).toBeNull();
    expect(glossaryPatch(id, "en")).not.toBeNull();
    // Bộ CFA vẫn tra được sau khi gộp hai map.
    expect(glossaryPatch("fsa-001", "en")).not.toBeNull();
  });
});
