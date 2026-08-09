import { describe, it, expect } from "vitest";
import { MOTIVATION_MESSAGES, MOTIVATION_TONE_LABEL } from "@/lib/daily-motivation";
import { motivationVi, motivationEn } from "@/lib/i18n/dictionaries/sections/motivation";

const DIACRITICS =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

describe("bản dịch lời nhắn hằng ngày", () => {
  it("mọi lời nhắn đều có bản Việt khớp từng chữ với pool", () => {
    for (const message of MOTIVATION_MESSAGES) {
      expect(motivationVi.motivationLines[message.id], `thiếu ${message.id}`).toBe(message.text);
    }
  });

  it("mọi lời nhắn đều có bản Anh, và không còn dấu tiếng Việt", () => {
    for (const message of MOTIVATION_MESSAGES) {
      const en = motivationEn.motivationLines[message.id];
      expect(en, `${message.id} thiếu bản Anh`).toBeTruthy();
      expect(DIACRITICS.test(en), `${message.id}: "${en}"`).toBe(false);
    }
  });

  it("không có khoá thừa - một id bị xoá khỏi pool phải xoá khỏi từ điển", () => {
    const ids = new Set(MOTIVATION_MESSAGES.map((m) => m.id));
    expect(Object.keys(motivationVi.motivationLines).filter((k) => !ids.has(k))).toEqual([]);
    expect(Object.keys(motivationEn.motivationLines).filter((k) => !ids.has(k))).toEqual([]);
  });

  it("cả năm giọng đều có nhãn ở hai ngôn ngữ", () => {
    for (const tone of Object.keys(MOTIVATION_TONE_LABEL) as (keyof typeof MOTIVATION_TONE_LABEL)[]) {
      expect(motivationVi.motivationToneLabel[tone]).toBe(MOTIVATION_TONE_LABEL[tone]);
      expect(DIACRITICS.test(motivationEn.motivationToneLabel[tone])).toBe(false);
    }
  });
});
