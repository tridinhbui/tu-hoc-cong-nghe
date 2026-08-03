import { describe, expect, it } from "vitest";
import {
  getRoomLighting,
  getRoomPhase,
  getSceneLighting,
  type RoomTimeOfDay,
} from "../study-room-lighting";

const ALL_PHASES: RoomTimeOfDay[] = [
  "dawn",
  "morning",
  "afternoon",
  "dusk",
  "night",
  "lateNight",
];

describe("getRoomPhase", () => {
  it("chia dung 24 gio, khong gio nao ro ra ngoai bang", () => {
    for (let hour = 0; hour < 24; hour++) {
      expect(ALL_PHASES).toContain(getRoomPhase(hour));
    }
  });

  it("dat dung ranh gioi cua tung khoang", () => {
    expect(getRoomPhase(0)).toBe("lateNight");
    expect(getRoomPhase(4)).toBe("lateNight");
    expect(getRoomPhase(5)).toBe("dawn");
    expect(getRoomPhase(7)).toBe("morning");
    expect(getRoomPhase(11)).toBe("afternoon");
    expect(getRoomPhase(16)).toBe("dusk");
    expect(getRoomPhase(19)).toBe("night");
    expect(getRoomPhase(23)).toBe("night");
  });

  // Một giờ hỏng không được phép trả về undefined ngay giữa lúc đang render
  // căn phòng - cả sáu trường màu sẽ thành undefined và phòng biến mất.
  it("gio hong hoac am van tra ve mot pha hop le", () => {
    expect(ALL_PHASES).toContain(getRoomPhase(-3));
    expect(ALL_PHASES).toContain(getRoomPhase(25));
    expect(getRoomPhase(-1)).toBe(getRoomPhase(23));
    expect(getRoomPhase(24)).toBe(getRoomPhase(0));
    expect(getRoomPhase(13.7)).toBe("afternoon");
  });
});

describe("getRoomLighting", () => {
  it("moi gio deu co du sau truong mau, khong truong nao rong", () => {
    for (let hour = 0; hour < 24; hour++) {
      const l = getRoomLighting(hour);
      for (const value of [
        l.label,
        l.windowSky,
        l.windowGlow,
        l.backWall,
        l.sideWallLeft,
        l.sideWallRight,
        l.floorPool,
      ]) {
        expect(typeof value).toBe("string");
        expect(value.length).toBeGreaterThan(0);
      }
    }
  });

  it("hai tuong ben huong nguoc chieu nhau", () => {
    for (const phase of ALL_PHASES) {
      const hour = { lateNight: 2, dawn: 6, morning: 9, afternoon: 13, dusk: 17, night: 21 }[phase];
      const l = getRoomLighting(hour);
      expect(l.sideWallLeft).toContain("90deg");
      expect(l.sideWallRight).toContain("270deg");
    }
  });

  // Toàn bộ giá trị của tính năng nằm ở chỗ 2h sáng nhìn KHÁC 9h sáng. Nếu hai
  // pha trả về cùng bảng màu thì đây chỉ là một hằng số đội lốt hàm.
  it("khuya va ban ngay khong dung chung bang mau", () => {
    const late = getRoomLighting(2);
    const day = getRoomLighting(13);
    expect(late.windowSky).not.toBe(day.windowSky);
    expect(late.backWall).not.toBe(day.backWall);
    expect(late.label).not.toBe(day.label);
  });

  it("cang khuya vignette cang dam, giua trua nhat nhat", () => {
    expect(getRoomLighting(2).vignette).toBeGreaterThan(getRoomLighting(21).vignette);
    expect(getRoomLighting(21).vignette).toBeGreaterThan(getRoomLighting(13).vignette);
    expect(getRoomLighting(13).vignette).toBeLessThan(getRoomLighting(6).vignette);
  });

  it("vignette luon nam trong 0 den 1", () => {
    for (let hour = 0; hour < 24; hour++) {
      const v = getRoomLighting(hour).vignette;
      expect(v).toBeGreaterThan(0);
      expect(v).toBeLessThan(1);
    }
  });

  it("nhan tieng Viet, khong lot chuoi khoa ky thuat ra man hinh", () => {
    for (const phase of ALL_PHASES) {
      const hour = { lateNight: 2, dawn: 6, morning: 9, afternoon: 13, dusk: 17, night: 21 }[phase];
      expect(getRoomLighting(hour).label).not.toBe(phase);
    }
  });
});

// Bản 3D từng có bảng giờ chép tay riêng; giờ cả hai cùng đi qua getRoomPhase.
// Test này khoá điều đó lại: nếu ai đó dựng lại một bảng thứ hai và nó trôi,
// một trong hai khung giờ sẽ lệch và chỗ này đỏ.
describe("anh sang cho canh 3D", () => {
  it("dung chung khung gio voi ban CSS", () => {
    for (let hour = 0; hour < 24; hour++) {
      const phase = getRoomPhase(hour);
      const scene = getSceneLighting(hour);
      // Cùng một phase thì phải ra cùng một cặp số, ở mọi giờ thuộc phase đó.
      for (let other = 0; other < 24; other++) {
        if (getRoomPhase(other) !== phase) continue;
        expect(getSceneLighting(other)).toEqual(scene);
      }
    }
  });

  it("cang khuya thi troi cang toi va den cang am", () => {
    expect(getSceneLighting(2).daylight).toBeLessThan(getSceneLighting(9).daylight);
    expect(getSceneLighting(21).daylight).toBeLessThan(getSceneLighting(14).daylight);
    expect(getSceneLighting(9).daylight).toBeGreaterThan(getSceneLighting(18).daylight);
  });

  it("moi gio deu co mot cap so, khong gio nao roi ra ngoai bang", () => {
    for (let hour = -5; hour < 30; hour++) {
      const l = getSceneLighting(hour);
      expect(Number.isFinite(l.daylight)).toBe(true);
      expect(l.lampColor).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});
