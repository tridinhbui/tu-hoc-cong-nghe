import { describe, expect, it } from "vitest";
import { RAIN_FADE_SECONDS, RAIN_GAIN, fillWhiteNoise, startRain } from "../rain-audio";

describe("dem nhieu", () => {
  it("dien day dem trong khoang -1 den 1", () => {
    const channel = new Float32Array(256);
    fillWhiteNoise(channel);
    for (const v of channel) {
      expect(v).toBeGreaterThanOrEqual(-1);
      expect(v).toBeLessThanOrEqual(1);
    }
  });

  it("khong de sot mau nao - mot dem con 0 se nghe ra tieng lach cach khi lap", () => {
    const channel = new Float32Array(512);
    fillWhiteNoise(channel, () => 0.75);
    expect([...channel].every((v) => v === 0.5)).toBe(true);
  });
});

describe("muc am luong", () => {
  // Đây là tiếng nền chứ không phải nội dung của trang: nó phải nghe được khi
  // để ý và biến mất khi không để ý.
  it("giu o muc nen, khong lan at", () => {
    expect(RAIN_GAIN).toBeGreaterThan(0);
    expect(RAIN_GAIN).toBeLessThan(0.2);
  });

  it("bat va tat deu co doan chuyen du dai de khong giat minh", () => {
    expect(RAIN_FADE_SECONDS).toBeGreaterThanOrEqual(1);
  });
});

describe("moi truong khong co Web Audio", () => {
  // Phần hình phải chạy được kể cả khi không có tiếng. Trả về null thay vì
  // ném lỗi là điều giữ cho một trình duyệt thiếu Web Audio không làm hỏng cả
  // khối cảnh.
  it("tra ve null thay vi nem loi", () => {
    expect(startRain()).toBeNull();
  });
});
