import { describe, expect, it } from "vitest";
import {
  detectionProbability,
  requiredSampleSize,
  residualRisk,
  zeroErrorUpperBound,
} from "../audit-sampling";

// Kiểm bằng những kết quả đã biết của thống kê chọn mẫu, vì đây là chỗ trực
// giác sai có hệ thống - và một widget dạy sai ở đây thì dạy đúng cái sai mà
// bài học đang muốn sửa.

describe("detectionProbability", () => {
  it("mẫu 25 với tỷ lệ lỗi 2% chỉ bắt được khoảng 40% số lần", () => {
    expect(detectionProbability(25, 0.02)).toBeCloseTo(0.397, 2);
  });

  it("mẫu lớn hơn thì xác suất bắt được cao hơn", () => {
    expect(detectionProbability(100, 0.02)).toBeGreaterThan(detectionProbability(25, 0.02));
  });

  it("không kiểm mẫu nào thì không bắt được gì", () => {
    expect(detectionProbability(0, 0.5)).toBe(0);
  });

  it("lỗi ở mọi hồ sơ thì một mẫu là đủ", () => {
    expect(detectionProbability(1, 1)).toBe(1);
  });
});

describe("zeroErrorUpperBound", () => {
  it("khớp quy tắc số ba: mẫu 30 không lỗi cho cận trên ~10%", () => {
    expect(zeroErrorUpperBound(30)).toBeCloseTo(0.095, 2);
    // 3/n = 0,1 - xấp xỉ mà kiểm toán viên nhẩm trong đầu
    expect(Math.abs(zeroErrorUpperBound(30) - 3 / 30)).toBeLessThan(0.01);
  });

  it("mẫu 25 không lỗi vẫn cho phép tỷ lệ lỗi tới hơn 10%", () => {
    expect(zeroErrorUpperBound(25)).toBeGreaterThan(0.1);
  });

  it("mẫu càng lớn thì cận trên càng chặt", () => {
    expect(zeroErrorUpperBound(200)).toBeLessThan(zeroErrorUpperBound(50));
  });

  it("mức tin cậy cao hơn cho cận trên rộng hơn", () => {
    expect(zeroErrorUpperBound(50, 0.99)).toBeGreaterThan(zeroErrorUpperBound(50, 0.9));
  });
});

describe("requiredSampleSize", () => {
  it("muốn kết luận tỷ lệ lỗi dưới 5% thì cần khoảng 59 mẫu sạch", () => {
    expect(requiredSampleSize(0.05)).toBe(59);
  });

  it("ngưỡng chặt hơn đòi mẫu lớn hơn", () => {
    expect(requiredSampleSize(0.01)).toBeGreaterThan(requiredSampleSize(0.1));
  });

  it("khớp ngược với zeroErrorUpperBound", () => {
    const n = requiredSampleSize(0.05);
    expect(zeroErrorUpperBound(n)).toBeLessThanOrEqual(0.05);
  });
});

describe("residualRisk", () => {
  it("ba tầng nhân nhau chứ không cộng", () => {
    expect(residualRisk(0.2, 0.5, 0.5)).toBeCloseTo(0.05, 6);
  });

  it("ba tuyến cùng yếu vẫn để lọt nhiều hơn trực giác", () => {
    // 50% × 50% × 50% = 12,5% chứ không phải "gần như chặn hết"
    expect(residualRisk(1, 0.5, 0.5)).toBeCloseTo(0.25, 6);
  });

  it("một tầng hoàn hảo là đủ để chặn hết", () => {
    expect(residualRisk(0.9, 1, 0)).toBe(0);
  });

  it("không có kiểm soát nào thì rủi ro còn nguyên", () => {
    expect(residualRisk(0.3, 0, 0)).toBeCloseTo(0.3, 6);
  });
});
