import { describe, expect, it } from "vitest";
import { CFA_ITEM_SETS, totalItemSetQuestions, itemSetTopics } from "../cfa-item-sets";
import { CFA_ESSAYS, essayMaxPoints, totalEssayMinutes } from "../cfa-essays";

const allQuestions = CFA_ITEM_SETS.flatMap((s) => s.questions);

describe("item set - toàn vẹn dữ liệu", () => {
  it("id không trùng nhau, kể cả giữa các bộ", () => {
    const ids = allQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    const setIds = CFA_ITEM_SETS.map((s) => s.id);
    expect(new Set(setIds).size).toBe(setIds.length);
  });

  it("mỗi câu có đúng bốn phương án khác nhau và chỉ số đúng nằm trong khoảng", () => {
    for (const q of allQuestions) {
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size, `${q.id} có phương án trùng`).toBe(4);
      expect(q.correct).toBeGreaterThanOrEqual(0);
      expect(q.correct).toBeLessThan(q.options.length);
      expect(q.explanation.length, `${q.id} giải thích quá ngắn`).toBeGreaterThan(60);
    }
  });

  it("tình huống dài hơn từng câu hỏi - nếu không thì nó không phải vignette", () => {
    for (const set of CFA_ITEM_SETS) {
      expect(set.vignette.length, `${set.id}`).toBeGreaterThan(300);
      expect(set.questions.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("helper đếm khớp với dữ liệu", () => {
    expect(totalItemSetQuestions()).toBe(allQuestions.length);
    expect(itemSetTopics()).toHaveLength(CFA_ITEM_SETS.length);
  });
});

describe("item set - độ dài phương án không rò rỉ đáp án", () => {
  // Cùng một mối lo như AGENTS.md mô tả cho kho câu hỏi bài học: nếu đáp án đúng
  // luôn là phương án dài nhất thì đoán theo độ dài là ăn điểm mà không cần biết
  // gì. Bốn phương án nên tỷ lệ ngẫu nhiên là 25%; chốt trần ở 40% để có chỗ cho
  // dao động của một mẫu 20 câu, nhưng vẫn chặn được kiểu viết bị lệch hệ thống.
  const share = (pick: (lengths: number[]) => number) =>
    allQuestions.filter((q) => {
      const lengths = q.options.map((o) => o.length);
      return lengths[q.correct] === pick(lengths);
    }).length / allQuestions.length;

  it("đáp án đúng không thường xuyên là phương án dài nhất", () => {
    expect(share((l) => Math.max(...l))).toBeLessThanOrEqual(0.4);
  });

  it("đáp án đúng cũng không thường xuyên là phương án ngắn nhất", () => {
    // Sửa quá tay theo hướng kia thì "chọn cái ngắn nhất" lại thành mẹo thi.
    expect(share((l) => Math.min(...l))).toBeLessThanOrEqual(0.4);
  });
});

describe("tự luận Level III", () => {
  it("id không trùng", () => {
    const ids = CFA_ESSAYS.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("tổng điểm rubric bằng số phút - quy ước 1 điểm 1 phút của kỳ thi", () => {
    for (const essay of CFA_ESSAYS) {
      expect(essayMaxPoints(essay), `${essay.id}`).toBe(essay.minutes);
    }
  });

  it("mỗi câu có ít nhất bốn ý chấm và một lỗi thường gặp", () => {
    for (const essay of CFA_ESSAYS) {
      expect(essay.rubric.length, `${essay.id}`).toBeGreaterThanOrEqual(4);
      expect(essay.commonMistake.length, `${essay.id}`).toBeGreaterThan(60);
      for (const point of essay.rubric) {
        expect(point.points).toBeGreaterThan(0);
      }
    }
  });

  it("totalEssayMinutes khớp với tổng từng câu", () => {
    expect(totalEssayMinutes()).toBe(CFA_ESSAYS.reduce((s, e) => s + e.minutes, 0));
  });
});
