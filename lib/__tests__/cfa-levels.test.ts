import { describe, it, expect } from "vitest";
import { CFA_LEVELS, CFA_LEVEL_2, CFA_LEVEL_3, weightMidpointTotal } from "@/lib/cfa-levels";

/** Bảng trọng số bịa trông y hệt bảng trọng số đúng - không lỗi biên dịch,
 *  không màn hình vỡ, chỉ có người học ôn sai tỷ lệ. Đây là phép kiểm rẻ nhất
 *  bắt được phần lớn kiểu gõ nhầm: CFA Institute thiết kế các dải sao cho
 *  trung điểm cộng lại đúng 100%, nên lệch khỏi 100 là có gì đó sai. */

describe("bảng trọng số các cấp CFA", () => {
  for (const spec of CFA_LEVELS) {
    it(`Level ${spec.level}: trung điểm các dải cộng lại đúng 100%`, () => {
      expect(weightMidpointTotal(spec)).toBeCloseTo(100, 6);
    });

    it(`Level ${spec.level}: mọi dải hợp lệ`, () => {
      for (const t of spec.topics) {
        expect(t.lo).toBeGreaterThan(0);
        expect(t.hi).toBeGreaterThanOrEqual(t.lo);
        expect(t.hi).toBeLessThanOrEqual(100);
        expect(t.name.length).toBeGreaterThan(3);
      }
    });

    it(`Level ${spec.level}: tên môn không trùng`, () => {
      expect(new Set(spec.topics.map((t) => t.name)).size).toBe(spec.topics.length);
    });

    it(`Level ${spec.level}: nói rõ vì sao chưa có đề thi thử`, () => {
      // Không có đề là một quyết định, không phải một thiếu sót bỏ quên - nên
      // nó phải kèm lý do đọc được, chứ không im lặng.
      expect(spec.noMockReason.length).toBeGreaterThan(60);
    });
  }

  it("Level II có mười môn, đúng như đề cương", () => {
    expect(CFA_LEVEL_2.topics).toHaveLength(10);
  });

  it("Level III có ba hướng chuyên sâu, và hướng đã chọn nặng nhất", () => {
    expect(CFA_LEVEL_3.pathways).toHaveLength(3);
    const heaviest = CFA_LEVEL_3.topics.reduce((a, b) => ((a.lo + a.hi) / 2 >= (b.lo + b.hi) / 2 ? a : b));
    expect(heaviest.lo).toBe(30);
  });

  it("Level II không có hướng chuyên sâu - đó là đặc thù của Level III", () => {
    expect(CFA_LEVEL_2.pathways).toBeUndefined();
  });
});
