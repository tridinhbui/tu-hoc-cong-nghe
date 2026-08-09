import { describe, expect, it } from "vitest";
import { CFA_ESSAYS, essayMaxPoints } from "@/lib/cfa-essays";
import { cfaEssaysEn } from "@/lib/cfa-essays-i18n/en";
import { mergeCfaEssay } from "@/lib/cfa-essays-i18n";

/** Đề tự luận CFA Level III.
 *
 *  Hai bất biến của tệp gốc mà bản dịch không được phá:
 *
 *  1. Tổng điểm rubric bằng `minutes` - quy ước một điểm một phút của kỳ thi.
 *     Lớp phủ chỉ mang `text` nên `points` không ghi đè được, và phép kiểm dưới
 *     đây xác nhận điều đó vẫn đúng sau merge.
 *  2. Rubric theo vị trí: ý thứ i đi với số điểm thứ i. Lệch số ý thì người tự
 *     chấm cộng điểm cho một ý khác với ý họ vừa đọc.
 *
 *  Và một rủi ro riêng: DẤU THẬP PHÂN. Rubric bắt người học tính
 *  (1.4 − 0.18 − 0.4) / 42, nên "1,4" dịch nhầm thành "1,4" thay vì "1.4" làm
 *  cả phép tính vô nghĩa với người đọc tiếng Anh. */

const byId = new Map(CFA_ESSAYS.map((e) => [e.id, e]));

describe("bản dịch đề tự luận CFA (en)", () => {
  it("mọi khoá trỏ vào một đề có thật, và mọi đề đều có bản dịch", () => {
    expect(Object.keys(cfaEssaysEn).filter((id) => !byId.has(id))).toEqual([]);
    expect(CFA_ESSAYS.filter((e) => !cfaEssaysEn[e.id]).map((e) => e.id)).toEqual([]);
  });

  it("số ý rubric khớp bản gốc", () => {
    const bad: string[] = [];
    for (const [id, patch] of Object.entries(cfaEssaysEn)) {
      const source = byId.get(id);
      if (!source || !patch.rubricTexts) continue;
      if (patch.rubricTexts.length !== source.rubric.length) {
        bad.push(`${id}: vi ${source.rubric.length} ý, en ${patch.rubricTexts.length} ý`);
      }
    }
    expect(bad, bad.join("\n")).toEqual([]);
  });

  it("merge giữ nguyên điểm, thời lượng, và tổng điểm vẫn bằng minutes", () => {
    for (const source of CFA_ESSAYS) {
      const merged = mergeCfaEssay(source, "en");
      expect(merged.minutes, source.id).toBe(source.minutes);
      expect(merged.rubric.map((r) => r.points), source.id).toEqual(
        source.rubric.map((r) => r.points)
      );
      expect(essayMaxPoints(merged), `${source.id}: tổng điểm phải bằng minutes`).toBe(
        source.minutes
      );
      expect(merged.vignette).not.toBe(source.vignette);
    }
  });

  it("không dùng dấu phẩy làm dấu thập phân trong bản Anh", () => {
    // "1,4 tỷ" phải thành "1.4bn". Bắt dạng số-phẩy-số, vốn là dấu thập phân
    // kiểu Việt; dấu phẩy phân cách hàng nghìn kiểu Anh luôn có ba chữ số sau
    // nên không dính.
    const VI_DECIMAL = /\d,\d(?!\d\d)/;
    const leaks: string[] = [];
    for (const [id, patch] of Object.entries(cfaEssaysEn)) {
      const probe = (label: string, text?: string) => {
        if (text && VI_DECIMAL.test(text)) leaks.push(`${id}.${label}: ${text}`);
      };
      probe("vignette", patch.vignette);
      probe("prompt", patch.prompt);
      probe("commonMistake", patch.commonMistake);
      patch.rubricTexts?.forEach((t, i) => probe(`rubric[${i}]`, t));
    }
    expect(leaks, leaks.join("\n")).toEqual([]);
  });

  it("bản Anh không còn chữ tiếng Việt ngoài tên riêng", () => {
    // Tên nhân vật giữ nguyên - tình huống đặt ở Việt Nam và đó là bối cảnh,
    // không phải chỗ dịch bị bỏ quên.
    const NAMES = ["Trần", "Lê"];
    const DIACRITICS =
      /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
    const leaks: string[] = [];
    for (const [id, patch] of Object.entries(cfaEssaysEn)) {
      const probe = (label: string, text?: string) => {
        if (!text) return;
        let stripped = text;
        for (const n of NAMES) stripped = stripped.split(n).join("");
        if (DIACRITICS.test(stripped)) leaks.push(`${id}.${label}: ${text}`);
      };
      probe("topic", patch.topic);
      probe("vignette", patch.vignette);
      probe("prompt", patch.prompt);
      probe("commonMistake", patch.commonMistake);
      patch.rubricTexts?.forEach((t, i) => probe(`rubric[${i}]`, t));
    }
    expect(leaks, leaks.join("\n")).toEqual([]);
  });

  it("locale vi trả về đúng bản gốc", () => {
    expect(mergeCfaEssay(CFA_ESSAYS[0], "vi")).toBe(CFA_ESSAYS[0]);
  });
});
