import { describe, it, expect } from "vitest";
import { daylightAt, outdoorBrightnessAt, rgbToHex, sunPosition } from "@/components/lobby/daylight";

/** Ánh sáng theo giờ là hàm thuần, nên kiểm được đúng cái dễ sai nhất: đoạn
 *  vòng qua nửa đêm. Bảng mốc dừng ở 20h30 rồi quay về mốc 0h, và mọi công thức
 *  nội suy viết ẩu đều vỡ đúng ở quãng 20h30-24h. */

describe("nội suy theo giờ", () => {
  it("giữa trưa sáng hơn hẳn nửa đêm", () => {
    expect(daylightAt(12).sunIntensity).toBeGreaterThan(daylightAt(0).sunIntensity * 2);
    expect(daylightAt(12).windowGlow).toBeGreaterThan(0.8);
    expect(daylightAt(2).windowGlow).toBeLessThan(0.3);
  });

  it("đèn nhân tạo rõ về đêm, mờ giữa ban ngày", () => {
    expect(daylightAt(23).lamps).toBeGreaterThan(0.9);
    expect(daylightAt(11).lamps).toBeLessThan(0.3);
  });

  it("liền mạch qua nửa đêm - không giật một nấc", () => {
    const before = daylightAt(23.99);
    const after = daylightAt(0.01);
    expect(Math.abs(before.sunIntensity - after.sunIntensity)).toBeLessThan(0.05);
    expect(Math.abs(before.skyTop[2] - after.skyTop[2])).toBeLessThan(6);
  });

  it("không có bước nhảy đột ngột ở bất kỳ đâu trong ngày", () => {
    for (let h = 0; h < 24; h += 0.25) {
      const a = daylightAt(h);
      const b = daylightAt(h + 0.25);
      expect(Math.abs(a.sunIntensity - b.sunIntensity)).toBeLessThan(0.25);
      expect(Math.abs(a.lamps - b.lamps)).toBeLessThan(0.25);
    }
  });

  it("gói giờ ngoài khoảng về đúng chỗ", () => {
    expect(daylightAt(26).label).toBe(daylightAt(2).label);
    expect(daylightAt(-1).sunIntensity).toBeCloseTo(daylightAt(23).sunIntensity);
  });

  it("mọi giá trị nằm trong khoảng hợp lệ", () => {
    for (let h = 0; h < 24; h += 0.5) {
      const d = daylightAt(h);
      expect(d.lamps).toBeGreaterThanOrEqual(0);
      expect(d.lamps).toBeLessThanOrEqual(1);
      expect(d.windowGlow).toBeGreaterThanOrEqual(0);
      expect(d.windowGlow).toBeLessThanOrEqual(1);
      for (const ch of [...d.skyTop, ...d.skyHorizon, ...d.sunColor]) {
        expect(ch).toBeGreaterThanOrEqual(0);
        expect(ch).toBeLessThanOrEqual(255);
      }
    }
  });
});

describe("vị trí mặt trời", () => {
  it("mọc phía đông, lặn phía tây", () => {
    expect(sunPosition(7)[0]).toBeGreaterThan(0);
    expect(sunPosition(17)[0]).toBeLessThan(0);
  });

  it("giữa trưa lên cao nhất", () => {
    expect(sunPosition(12)[1]).toBeGreaterThan(sunPosition(8)[1]);
    expect(sunPosition(12)[1]).toBeGreaterThan(sunPosition(16)[1]);
  });

  it("ban đêm nguồn sáng vẫn ở trên cao - trăng dưới chân trời thì soi vào đâu", () => {
    expect(sunPosition(2)[1]).toBeGreaterThan(0);
    expect(sunPosition(23)[1]).toBeGreaterThan(0);
  });
});

describe("rgbToHex", () => {
  it("kẹp giá trị tràn thay vì sinh mã màu rác", () => {
    expect(rgbToHex([300, -20, 128])).toBe("#ff0080");
  });
});

// Phố nghề từng có bảng giờ riêng nhảy bậc tại 18:00 trong khi thư viện ngay
// cạnh nội suy mượt. Giờ cả hai cùng đọc một nguồn; test khoá lại tính chất
// làm nó đáng gộp - không có bậc nhảy nào, và luôn nằm trong [0, 1].
describe("do sang ngoai troi cho Pho nghe", () => {
  it("luon nam trong khoang 0 den 1, ke ca voi gio hong", () => {
    for (const h of [-6, 0, 6.5, 12, 18, 23.9, 30]) {
      const v = outdoorBrightnessAt(h);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });

  it("khong co buoc nhay nao trong ca ngay", () => {
    let prev = outdoorBrightnessAt(0);
    for (let h = 0; h <= 24; h += 0.25) {
      const now = outdoorBrightnessAt(h);
      // Một phần tư giờ không được đổi quá 0,15 - đủ rộng cho lúc chạng vạng
      // đổi nhanh nhất, đủ chặt để một bậc nhảy kiểu 1 → 0,45 bị bắt.
      expect(Math.abs(now - prev), `nhay bac tai ${h}h`).toBeLessThan(0.15);
      prev = now;
    }
  });

  it("giua trua sang hon nua dem", () => {
    expect(outdoorBrightnessAt(12)).toBeGreaterThan(outdoorBrightnessAt(2));
    expect(outdoorBrightnessAt(9)).toBeGreaterThan(outdoorBrightnessAt(21));
  });
});
