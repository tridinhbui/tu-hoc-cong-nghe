import { describe, it, expect } from "vitest";
import {
  WORRY_REFRAMES,
  WORRY_SET_DOWN,
  QUIET_CORNER_QUESTIONS,
  QUIET_CORNER_CLOSING,
  QUIET_CORNER_LIMITS,
  getQuietGreeting,
  getQuietGreetingKey,
} from "@/lib/quiet-corner";
import {
  quietCornerCopyVi,
  quietCornerCopyEn,
} from "@/lib/i18n/dictionaries/sections/quiet-corner";

const DIACRITICS =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

describe("bản dịch góc yên tĩnh", () => {
  it("mọi nỗi lo đều có bản Việt khớp từng chữ", () => {
    for (const item of WORRY_REFRAMES) {
      const vi = quietCornerCopyVi.worryReframes[item.id];
      expect(vi, `thiếu ${item.id}`).toBeTruthy();
      expect(vi.worry).toBe(item.worry);
      expect(vi.reframe).toBe(item.reframe);
    }
  });

  it("mọi nỗi lo đều có bản Anh không còn dấu tiếng Việt", () => {
    for (const item of WORRY_REFRAMES) {
      const en = quietCornerCopyEn.worryReframes[item.id];
      expect(en, `${item.id} thiếu bản Anh`).toBeTruthy();
      expect(DIACRITICS.test(en.worry), `${item.id}: "${en.worry}"`).toBe(false);
      expect(DIACRITICS.test(en.reframe), `${item.id}: "${en.reframe}"`).toBe(false);
    }
  });

  it("ba câu hỏi tự gỡ cũng vậy", () => {
    for (const item of QUIET_CORNER_QUESTIONS.items) {
      expect(quietCornerCopyVi.quietQuestionItems[item.id].question).toBe(item.question);
      expect(quietCornerCopyVi.quietQuestionItems[item.id].note).toBe(item.note);
      const en = quietCornerCopyEn.quietQuestionItems[item.id];
      expect(DIACRITICS.test(en.question)).toBe(false);
      expect(DIACRITICS.test(en.note)).toBe(false);
    }
  });

  it("năm khung giờ khớp với getQuietGreeting", () => {
    // Khoá và câu phải đi cùng nhau: đổi ngưỡng giờ trong một hàm mà quên hàm
    // kia thì lời chào lệch khung giờ, và không có gì khác phát hiện được.
    for (const hour of [1, 9, 14, 20, 23]) {
      const key = getQuietGreetingKey(hour);
      expect(quietCornerCopyVi.quietGreeting[key]).toBe(getQuietGreeting(hour));
      expect(DIACRITICS.test(quietCornerCopyEn.quietGreeting[key])).toBe(false);
    }
  });

  it("phần đặt xuống, đoạn kết và ranh giới khớp bản gốc", () => {
    expect(quietCornerCopyVi.worrySetDown.action).toBe(WORRY_SET_DOWN.action);
    expect(quietCornerCopyVi.worrySetDown.done).toBe(WORRY_SET_DOWN.done);
    expect(quietCornerCopyVi.quietQuestions.title).toBe(QUIET_CORNER_QUESTIONS.title);
    expect(quietCornerCopyVi.quietQuestions.intro).toBe(QUIET_CORNER_QUESTIONS.intro);
    expect(quietCornerCopyVi.quietClosing.title).toBe(QUIET_CORNER_CLOSING.title);
    expect([
      quietCornerCopyVi.quietClosing.line1,
      quietCornerCopyVi.quietClosing.line2,
    ]).toEqual([...QUIET_CORNER_CLOSING.lines]);
    expect(quietCornerCopyVi.quietLimits.title).toBe(QUIET_CORNER_LIMITS.title);
    expect(quietCornerCopyVi.quietLimits.body).toBe(QUIET_CORNER_LIMITS.body);
  });

  it("phần ranh giới bản Anh vẫn chỉ ra ngoài ứng dụng", () => {
    // Đây là ranh giới đạo đức của trang, không phải một dòng chữ trang trí.
    // Bản dịch làm mềm nó đi thì không có gì báo, nên kiểm bằng nội dung.
    const body = quietCornerCopyEn.quietLimits.body.toLowerCase();
    expect(body).toContain("mental health");
    expect(body).toContain("isn't therapy");
    expect(quietCornerCopyEn.worryReframes["wr-16"].reframe.toLowerCase()).toContain("real person");
  });
});
