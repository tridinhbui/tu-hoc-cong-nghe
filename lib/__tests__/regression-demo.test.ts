import { describe, expect, it } from "vitest";
import { falsePositiveChance, fitLine, generateSample, seededRandom } from "../regression-demo";

describe("seededRandom", () => {
  it("cùng hạt cho cùng dãy - biểu đồ không nhảy mỗi lần vẽ lại", () => {
    const a = seededRandom(42);
    const b = seededRandom(42);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  it("hạt khác cho dãy khác", () => {
    expect(seededRandom(1)()).not.toBe(seededRandom(2)());
  });

  it("nằm trong [0,1)", () => {
    const r = seededRandom(7);
    for (let i = 0; i < 200; i++) {
      const v = r();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

describe("fitLine", () => {
  it("khớp chính xác một đường thẳng không nhiễu", () => {
    const pts = [0, 1, 2, 3, 4].map((x) => ({ x, y: 3 * x + 5 }));
    const f = fitLine(pts);
    expect(f.slope).toBeCloseTo(3, 6);
    expect(f.intercept).toBeCloseTo(5, 6);
    expect(f.r2).toBeCloseTo(1, 6);
  });

  it("R² bằng 0 khi y không phụ thuộc x", () => {
    const pts = [0, 1, 2, 3, 4, 5].map((x) => ({ x, y: 10 }));
    expect(fitLine(pts).r2).toBe(0);
  });

  it("mẫu lớn hồi phục được hệ số thật", () => {
    const f = fitLine(generateSample(2000, 0.8, 1, 123));
    expect(f.slope).toBeCloseTo(0.8, 1);
  });

  it("mẫu nhỏ cho ước lượng dao động mạnh hơn mẫu lớn - chính là bài học", () => {
    const spread = (n: number) => {
      const slopes = [1, 2, 3, 4, 5, 6, 7, 8].map((s) => fitLine(generateSample(n, 0.5, 2, s)).slope);
      return Math.max(...slopes) - Math.min(...slopes);
    };
    expect(spread(15)).toBeGreaterThan(spread(400));
  });

  it("sai số chuẩn nhỏ đi khi mẫu lớn lên", () => {
    expect(fitLine(generateSample(500, 0.5, 1, 9)).se).toBeLessThan(
      fitLine(generateSample(25, 0.5, 1, 9)).se
    );
  });

  it("p-value nằm trong [0,1] và nhỏ khi tín hiệu mạnh", () => {
    const strong = fitLine(generateSample(300, 2, 0.5, 11));
    expect(strong.pValue).toBeGreaterThanOrEqual(0);
    expect(strong.pValue).toBeLessThan(0.01);
  });

  it("không đủ điểm thì trả về hệ số 0 thay vì NaN", () => {
    expect(fitLine([{ x: 1, y: 1 }]).slope).toBe(0);
    expect(fitLine([]).pValue).toBe(1);
  });
});

describe("falsePositiveChance", () => {
  it("thử 20 biến ở mức 5% cho 64% khả năng có ít nhất một phát hiện giả", () => {
    expect(falsePositiveChance(20)).toBeCloseTo(0.642, 2);
  });

  it("một phép thử thì đúng bằng mức ý nghĩa", () => {
    expect(falsePositiveChance(1)).toBeCloseTo(0.05, 6);
  });

  it("không thử gì thì không có dương tính giả", () => {
    expect(falsePositiveChance(0)).toBe(0);
  });

  it("càng thử nhiều càng chắc chắn tìm ra thứ không có thật", () => {
    expect(falsePositiveChance(100)).toBeGreaterThan(0.99);
  });
});
