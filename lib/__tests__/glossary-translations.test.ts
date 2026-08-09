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

  /** Thêm SAU KHI đủ 118/118, đúng thứ tự đã ghi trong chú thích của
   *  scripts/i18n-coverage.mjs: tách một tệp ra khỏi tổng là lời khẳng định đã
   *  hoàn thành, nên cổng bắt buộc đủ phải có TRƯỚC. Đặt cổng này lúc mới dịch
   *  10 mục thì nó đỏ suốt mười lô, và cổng đỏ thường trực là cổng bị phớt lờ. */
  it("mọi thuật ngữ đều có bản dịch - thêm thẻ mới thì phải dịch kèm", () => {
    const missing = CFA_GLOSSARY_TERMS.filter((t) => !glossaryEn[t.id]).map((t) => t.id);
    expect(
      missing,
      `chưa dịch: ${missing.join(", ")}\n` +
        `Thêm vào lib/cfa-glossary-i18n/en.ts. Thiếu thì thẻ này hiện tiếng Việt ` +
        `giữa giao diện tiếng Anh mà không có gì báo.`
    ).toEqual([]);
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

/** Hai thẻ cho CÙNG một khái niệm trong cùng một môn.
 *
 *  Tìm ra khi đang dịch: `eth-006` và `eth-010` đều là Mosaic Theory. Nghĩ là
 *  ba cặp, viết bộ dò thì ra MƯỜI SÁU - 32 trong 118 thẻ, 27% bộ bài. Bằng mắt
 *  không thấy được, vì hai thẻ cùng khái niệm nằm cách nhau vài chục vị trí và
 *  câu chữ khác nhau nên không đọc ra là bản sao.
 *
 *  VÌ SAO ĐÁNG SỬA chứ không chỉ là dư thừa: bộ thẻ chạy lặp lại ngắt quãng và
 *  đếm mỗi id là một khái niệm độc lập, nên 16 khái niệm này bị xếp lịch ôn gấp
 *  đôi. Người học tưởng mình đang ôn 118 thứ, thực ra là 102 thứ với 16 cái
 *  chiếm chỗ hai lần.
 *
 *  15 cặp cùng môn đã gộp, giữ bản viết đầy đủ hơn - và trong cả 16 cặp thì
 *  bản viết sau luôn là bản đầy đủ hơn, không có ngoại lệ.
 *
 *  CẶP KHÁC MÔN THÌ KHÔNG GỘP: `alt-009` (alternatives) và `der-010`
 *  (derivatives) cùng là contango/backwardation, nhưng giao diện lọc thẻ theo
 *  môn (`selectedSubject`), nên gỡ một cái là bộ thẻ môn kia mất bài. Đó là
 *  dạy chéo có chủ đích, không phải lỗi. */
describe("thẻ trùng khái niệm", () => {
  const normalise = (term: string) =>
    term
      .toLowerCase()
      .replace(/\([^)]*\)/g, " ") // "(MNPI)" - viết tắt trong ngoặc không tạo khái niệm mới
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // bỏ dấu: "và" -> "va"
      .replace(/\bva\b/g, "and") // rồi "va" -> "and", để "Type I và II" khớp "Type I and II"
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

  it("không có hai thẻ cùng khái niệm trong cùng một môn", () => {
    const seen = new Map<string, string[]>();
    for (const t of CFA_GLOSSARY_TERMS) {
      const key = `${t.subjectId}::${normalise(t.termEn)}`;
      if (!seen.has(key)) seen.set(key, []);
      seen.get(key)!.push(t.id);
    }
    const dups = [...seen]
      .filter(([, ids]) => ids.length > 1)
      .map(([key, ids]) => `${ids.join(" / ")} -> ${key}`);
    expect(
      dups,
      `Hai thẻ cùng khái niệm trong một môn thì lịch ôn của khái niệm đó bị nhân đôi.\n` +
        `Gộp lại, giữ bản viết đầy đủ hơn:\n${dups.join("\n")}`
    ).toEqual([]);
  });
});
