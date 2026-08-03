import { describe, expect, it } from "vitest";
import { computeTax, SCHEDULE_2026, SCHEDULE_CURRENT } from "../vn-income-tax";

// Đối chiếu với chính những ví dụ đã in trong bài học, để widget và bài học
// không bao giờ nói hai con số khác nhau cho cùng một hồ sơ.

describe("biểu 7 bậc hiện hành", () => {
  it("lương 30 triệu, độc thân → 1.627.500 đồng (đúng ví dụ trong Chặng Thuế bài 5)", () => {
    const r = computeTax(30, 0, SCHEDULE_CURRENT);
    expect(r.insurance).toBeCloseTo(3.15, 6);
    expect(r.taxableIncome).toBeCloseTo(15.85, 6);
    expect(r.tax).toBeCloseTo(1.6275, 4);
  });

  it("cắt lát đúng ba bậc cho hồ sơ đó", () => {
    const r = computeTax(30, 0, SCHEDULE_CURRENT);
    expect(r.slices.map((s) => s.rate)).toEqual([0.05, 0.1, 0.15]);
    expect(r.slices[2].amount).toBeCloseTo(5.85, 6);
  });
});

describe("biểu 5 bậc từ 2026", () => {
  it("lương 30 triệu, độc thân → 635.000 đồng", () => {
    const r = computeTax(30, 0, SCHEDULE_2026);
    expect(r.taxableIncome).toBeCloseTo(11.35, 6);
    expect(r.tax).toBeCloseTo(0.635, 4);
  });

  it("lương 45 triệu, độc thân → 1.977.500 đồng", () => {
    const r = computeTax(45, 0, SCHEDULE_2026);
    expect(r.insurance).toBeCloseTo(4.725, 6);
    expect(r.taxableIncome).toBeCloseTo(24.775, 6);
    expect(r.tax).toBeCloseTo(1.9775, 4);
  });

  it("nhẹ hơn biểu cũ ở vùng thu nhập phổ biến", () => {
    for (const gross of [20, 30, 45, 60]) {
      expect(computeTax(gross, 0, SCHEDULE_2026).tax).toBeLessThan(
        computeTax(gross, 0, SCHEDULE_CURRENT).tax
      );
    }
  });
});

describe("tính chất của thuế luỹ tiến từng phần", () => {
  it("thuế suất hiệu dụng luôn thấp hơn thuế suất biên - đây là cả bài học", () => {
    const r = computeTax(60, 0, SCHEDULE_CURRENT);
    expect(r.effectiveRate).toBeLessThan(r.marginalRate);
  });

  it("thêm một đồng lương không bao giờ làm thu nhập ròng giảm", () => {
    let prev = -Infinity;
    for (let g = 10; g <= 120; g += 0.5) {
      const net = computeTax(g, 0, SCHEDULE_CURRENT).netIncome;
      expect(net).toBeGreaterThan(prev);
      prev = net;
    }
  });

  it("dưới ngưỡng giảm trừ thì không phải nộp thuế", () => {
    expect(computeTax(12, 0, SCHEDULE_CURRENT).tax).toBe(0);
    expect(computeTax(12, 0, SCHEDULE_CURRENT).slices).toHaveLength(0);
  });

  it("mỗi người phụ thuộc kéo thu nhập tính thuế xuống đúng mức giảm trừ", () => {
    const a = computeTax(40, 0, SCHEDULE_CURRENT);
    const b = computeTax(40, 2, SCHEDULE_CURRENT);
    expect(a.taxableIncome - b.taxableIncome).toBeCloseTo(2 * SCHEDULE_CURRENT.dependentDeduction, 6);
  });

  it("tổng các lát bằng đúng tổng thuế", () => {
    const r = computeTax(150, 1, SCHEDULE_CURRENT);
    expect(r.slices.reduce((s, x) => s + x.tax, 0)).toBeCloseTo(r.tax, 9);
  });

  it("lương 0 không sinh ra thuế hay chia cho 0", () => {
    const r = computeTax(0, 0, SCHEDULE_2026);
    expect(r.tax).toBe(0);
    expect(r.effectiveRate).toBe(0);
  });
});
