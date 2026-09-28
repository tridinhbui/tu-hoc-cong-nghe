import { describe, expect, it } from "vitest";
import { TECH_CAREERS, TECH_INTERVIEW_QUESTIONS, TECH_BEHAVIORAL_CARDS } from "@/lib/interview-bank";

/**
 * Gác kho câu hỏi phỏng vấn công nghệ. Câu kỹ thuật có chấm điểm và ghi XP,
 * nên chúng chịu đúng các quy tắc quiz trong AGENTS.md. Bộ kiểm này đo những
 * quy tắc đo được bằng máy; quy tắc 3 và 5 (mỗi phương án nhiễu là một lỗi hiểu
 * có thật, không mâu thuẫn bài học) vẫn là việc của người viết.
 */

const RANGES: Record<string, [number, number]> = {
  frontend: [1001, 1999],
  backend: [2001, 2999],
  data: [3001, 3999],
  devops: [4001, 4999],
  "ai-engineer": [5001, 5999],
  qa: [6001, 6999],
  mobile: [7001, 7999],
};

const HOLLOW = /^(luôn (đúng|tốt|sai)|không (ảnh hưởng|có|liên quan)|tất cả (đều )?(đúng|sai)|không có đáp án)/i;

function tag(q: { options: string[]; correct: number }) {
  const len = q.options.map((o) => o.length);
  const c = len[q.correct];
  if (len.filter((l) => l === Math.max(...len)).length === 1 && c === Math.max(...len)) return "longest";
  if (len.filter((l) => l === Math.min(...len)).length === 1 && c === Math.min(...len)) return "shortest";
  return "other";
}

describe("kho câu hỏi phỏng vấn công nghệ", () => {
  it("id duy nhất và nằm trong dải của nghề", () => {
    const ids = TECH_INTERVIEW_QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of TECH_INTERVIEW_QUESTIONS) {
      const r = RANGES[q.career];
      expect(r, `nghề lạ ${q.career} ở câu ${q.id}`).toBeTruthy();
      expect(q.id >= r[0] && q.id <= r[1], `câu ${q.id} ngoài dải ${q.career}`).toBe(true);
    }
  });

  it("mỗi nghề có ít nhất 12 câu, đủ cả ba độ khó", () => {
    for (const c of TECH_CAREERS) {
      const qs = TECH_INTERVIEW_QUESTIONS.filter((q) => q.career === c.id);
      expect(qs.length, c.id).toBeGreaterThanOrEqual(12);
      for (const d of ["de", "trung-binh", "kho"]) {
        expect(qs.some((q) => q.difficulty === d), `${c.id} thiếu độ khó ${d}`).toBe(true);
      }
    }
  });

  it("hình dạng câu: 4 phương án, đáp án hợp lệ, lời giải đủ dài, không phương án rỗng", () => {
    for (const q of TECH_INTERVIEW_QUESTIONS) {
      expect(q.options, `câu ${q.id}`).toHaveLength(4);
      expect(q.correct >= 0 && q.correct < 4, `câu ${q.id}`).toBe(true);
      expect(new Set(q.options).size, `câu ${q.id} trùng phương án`).toBe(4);
      expect(q.explanation.length, `câu ${q.id} lời giải ngắn`).toBeGreaterThanOrEqual(120);
      for (const o of q.options) {
        expect(!(o.length < 30 && !/\d/.test(o) && HOLLOW.test(o.trim())), `câu ${q.id} phương án rỗng: ${o}`).toBe(true);
      }
    }
  });

  // Quy tắc 6: bốn phương án cùng một dải độ dài. Dài nhất không quá gấp đôi
  // ngắn nhất - lỏng hơn ±20% vì câu ngắn có phương án 25 ký tự, nhưng đủ chặn
  // đúng kiểu mách nước "9 ký tự đứng cạnh 177 ký tự".
  it("độ dài bốn phương án không chênh quá gấp đôi", () => {
    for (const q of TECH_INTERVIEW_QUESTIONS) {
      const len = q.options.map((o) => o.length);
      expect(Math.max(...len) / Math.min(...len), `câu ${q.id}: ${len.join(",")}`).toBeLessThanOrEqual(2);
    }
  });

  // Mẹo độ dài theo cả hai chiều, và chiều "ở giữa" (xem AGENTS.md: sửa chiều
  // này mà quên chiều kia là đổi mách nước này lấy mách nước khác).
  it("đáp án đúng không thiên về dài nhất, ngắn nhất hay ở giữa", () => {
    const n = TECH_INTERVIEW_QUESTIONS.length;
    const count = (t: string) => TECH_INTERVIEW_QUESTIONS.filter((q) => tag(q) === t).length / n;
    expect(count("longest"), "dài nhất").toBeLessThanOrEqual(0.35);
    expect(count("shortest"), "ngắn nhất").toBeLessThanOrEqual(0.35);
    expect(count("other"), "ở giữa").toBeLessThanOrEqual(0.65);
  });

  it("thẻ hành vi đủ phần và id trong dải 9001-9999", () => {
    expect(TECH_BEHAVIORAL_CARDS.length).toBeGreaterThanOrEqual(10);
    for (const c of TECH_BEHAVIORAL_CARDS) {
      expect(c.id >= 9001 && c.id <= 9999).toBe(true);
      expect(c.framework.length).toBeGreaterThanOrEqual(3);
      expect(c.whatTheyWant.length).toBeGreaterThan(40);
    }
  });
});
