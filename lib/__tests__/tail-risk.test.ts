import { describe, expect, it } from "vitest";
import { normalQuantile, tQuantile } from "../tail-risk";

// Đối chiếu với bảng tra mà mọi giáo trình FRM đều in. Nếu một trong hai hàm
// sai, widget vẫn hiện một con số trông rất gọn - nên chỗ duy nhất bắt được là
// ở đây.

describe("normalQuantile", () => {
  it("khớp các phân vị chuẩn hay dùng", () => {
    expect(normalQuantile(0.95)).toBeCloseTo(1.6449, 3);
    expect(normalQuantile(0.975)).toBeCloseTo(1.96, 3);
    expect(normalQuantile(0.99)).toBeCloseTo(2.3263, 3);
    expect(normalQuantile(0.995)).toBeCloseTo(2.5758, 3);
  });

  it("đối xứng quanh 0", () => {
    expect(normalQuantile(0.5)).toBeCloseTo(0, 6);
    expect(normalQuantile(0.05)).toBeCloseTo(-normalQuantile(0.95), 4);
  });
});

describe("tQuantile", () => {
  it("khớp bảng t ở các bậc tự do thấp", () => {
    expect(tQuantile(0.95, 10)).toBeCloseTo(1.8125, 2);
    expect(tQuantile(0.99, 4)).toBeCloseTo(3.7469, 2);
    expect(tQuantile(0.975, 20)).toBeCloseTo(2.086, 2);
  });

  it("đuôi dày hơn phân phối chuẩn ở bậc tự do thấp", () => {
    expect(tQuantile(0.99, 3)).toBeGreaterThan(normalQuantile(0.99));
  });

  it("hội tụ về chuẩn khi bậc tự do lớn - chính là điều widget muốn cho thấy", () => {
    expect(tQuantile(0.99, 200)).toBeCloseTo(normalQuantile(0.99), 1);
  });

  it("phân vị tăng theo mức tin cậy", () => {
    expect(tQuantile(0.99, 5)).toBeGreaterThan(tQuantile(0.95, 5));
  });
});
