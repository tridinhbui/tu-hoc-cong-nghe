import { describe, it, expect } from "vitest";
import { IB_TECHNICAL_QUESTIONS } from "@/lib/ib-question-bank";
import { CAREER_TECHNICAL_QUESTIONS } from "@/lib/career-question-bank";
import { localizeIbQuestion, localizeIbQuestions, translatedCount } from "@/lib/ib-questions-i18n";
import { IB_QUESTIONS_EN } from "@/lib/ib-questions-i18n/en";

const ALL = [...IB_TECHNICAL_QUESTIONS, ...CAREER_TECHNICAL_QUESTIONS];

/** Ngân hàng câu hỏi kỹ thuật có chấm điểm, và câu sai còn quay lại với người
 *  học qua /on-tap-cau-sai dưới dạng `lesson_id` âm. Mọi lỗi ở đây đắt hơn một
 *  nhãn sai trên màn hình. */
describe("bản dịch ngân hàng câu hỏi kỹ thuật", () => {
  it("không đụng tới correct và id", () => {
    for (const q of ALL) {
      const en = localizeIbQuestion(q, "en");
      expect(en.correct).toBe(q.correct);
      expect(en.id).toBe(q.id);
      expect(en.difficulty).toBe(q.difficulty);
      expect(en.options).toHaveLength(q.options.length);
    }
  });

  it("locale gốc trả về đúng câu gốc", () => {
    for (const q of ALL.slice(0, 20)) expect(localizeIbQuestion(q, "vi")).toBe(q);
    expect(localizeIbQuestions(ALL, "vi")).toBe(ALL);
  });

  it("mọi id trong file dịch đều có thật trong ngân hàng", () => {
    const ids = new Set(ALL.map((q) => q.id));
    const unknown = Object.keys(IB_QUESTIONS_EN).map(Number).filter((id) => !ids.has(id));
    expect(unknown).toEqual([]);
  });

  it("mảng options trong file dịch dài đúng bằng bản gốc", () => {
    // Lệch độ dài thì merge bỏ CẢ mảng và câu đó rơi về tiếng Việt - an toàn
    // nhưng im lặng, nên bắt ngay tại đây.
    for (const [idStr, patch] of Object.entries(IB_QUESTIONS_EN)) {
      if (!patch.options) continue;
      const source = ALL.find((q) => q.id === Number(idStr))!;
      expect(patch.options, idStr).toHaveLength(source.options.length);
    }
  });

  it("câu đã dịch không còn dấu tiếng Việt sau khi merge", () => {
    const DIACRITICS = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
    const left: string[] = [];
    for (const id of Object.keys(IB_QUESTIONS_EN).map(Number)) {
      const q = localizeIbQuestion(ALL.find((x) => x.id === id)!, "en");
      if (DIACRITICS.test(q.question)) left.push(`${id}: question`);
      if (DIACRITICS.test(q.explanation)) left.push(`${id}: explanation`);
      if (DIACRITICS.test(q.category)) left.push(`${id}: category`);
      q.options.forEach((o, i) => DIACRITICS.test(o) && left.push(`${id}: options[${i}]`));
    }
    expect(left).toEqual([]);
  });

  /** Trước đây phép này chỉ đòi `> 0` vì bản dịch đang chạy theo từng lô. Lô
   *  cuối đã xong nên nó chuyển thành khẳng định phủ kín - đúng cách bộ kiểm
   *  đề thi thăng cấp đã chuyển khi cấp cuối cùng dịch xong. */
  it("mọi câu tiếng Việt trong ngân hàng đều đã có bản dịch", () => {
    const DIACRITICS = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
    // lib/ib-question-bank.ts là dữ liệu cào về và vốn đã bằng tiếng Anh, nên
    // chỉ những câu CÓ DẤU mới nằm trong phạm vi cần dịch.
    const needsTranslation = ALL.filter((q) => DIACRITICS.test(q.question));
    const missing = needsTranslation.filter((q) => !IB_QUESTIONS_EN[q.id]).map((q) => q.id);
    expect(missing).toEqual([]);
    expect(translatedCount("vi")).toBe(0);
  });

  it("không câu nào còn dấu tiếng Việt sau khi merge", () => {
    const DIACRITICS = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
    const left: string[] = [];
    for (const raw of ALL) {
      const q = localizeIbQuestion(raw, "en");
      if (DIACRITICS.test(q.question)) left.push(`${q.id}: question`);
      if (DIACRITICS.test(q.explanation)) left.push(`${q.id}: explanation`);
      if (DIACRITICS.test(q.category)) left.push(`${q.id}: category`);
      q.options.forEach((o, i) => DIACRITICS.test(o) && left.push(`${q.id}: options[${i}]`));
    }
    expect(left).toEqual([]);
  });
});
