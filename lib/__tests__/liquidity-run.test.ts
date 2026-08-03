import { describe, expect, it } from "vitest";
import { survivalDays } from "../liquidity-run";

// Không kiểm một con số cụ thể - mô hình là mô hình dạy học, con số đổi được.
// Kiểm các QUAN HỆ, vì đó mới là bài học, và nếu một quan hệ bị lật thì widget
// vẫn chạy mượt mà dạy ngược.

const base = { buffer: 300, pledgeable: 1200, outflow: 200, haircut: 8 };
const run = (o: Partial<typeof base> & { stress?: number } = {}) =>
  survivalDays(
    o.buffer ?? base.buffer,
    o.pledgeable ?? base.pledgeable,
    o.outflow ?? base.outflow,
    o.haircut ?? base.haircut,
    o.stress ?? 0
  );

describe("survivalDays", () => {
  it("căng thẳng thị trường rút ngắn số ngày, dù bảng cân đối không đổi", () => {
    expect(run({ stress: 100 })).toBeLessThan(run({ stress: 0 }));
  });

  it("đệm tiền mặt dày hơn thì trụ được lâu hơn", () => {
    expect(run({ buffer: 900 })).toBeGreaterThan(run({ buffer: 100 }));
  });

  it("haircut cao hơn thì trụ được ngắn hơn - tài sản vẫn nguyên nhưng đổi ra ít tiền hơn", () => {
    expect(run({ haircut: 25 })).toBeLessThan(run({ haircut: 3 }));
  });

  it("rút nhanh hơn thì chết sớm hơn", () => {
    expect(run({ outflow: 600 })).toBeLessThan(run({ outflow: 100 }));
  });

  it("không có dòng tiền ra thì không có khủng hoảng thanh khoản", () => {
    expect(run({ outflow: 0 })).toBeGreaterThan(60);
  });

  it("không tài sản, không đệm thì gục ngay ngày đầu", () => {
    expect(run({ buffer: 0, pledgeable: 0 })).toBe(1);
  });

  it("trần 60 ngày để widget không phải vẽ một con số vô hạn", () => {
    expect(run({ buffer: 100000 })).toBe(60);
  });
});
