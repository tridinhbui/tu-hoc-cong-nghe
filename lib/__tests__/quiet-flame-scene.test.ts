import { describe, expect, it } from "vitest";
import {
  KINDLE_SECONDS,
  ambientWind,
  flameMotion,
  gustAt,
  kindleProgress,
  springBack,
} from "../quiet-flame-scene";

describe("gio nen", () => {
  it("nam trong bien do doc duoc, khong bao gio vuot 1", () => {
    for (let t = 0; t < 600; t += 0.37) {
      expect(Math.abs(ambientWind(t))).toBeLessThanOrEqual(1);
    }
  });

  // Giá trị của gió nền nằm ở chỗ nó KHÔNG lặp trong khoảng thời gian một
  // người ngồi lại trang này. Ba chu kỳ chia hết cho nhau thì mắt bắt được
  // điểm lặp và chuyển động đọc ra là chạy vòng chứ không phải thở.
  it("khong lap lai trong vai phut dau", () => {
    const head = ambientWind(0);
    let closest = Infinity;
    for (let t = 5; t < 240; t += 0.05) {
      closest = Math.min(closest, Math.abs(ambientWind(t) - head));
    }
    // Có thể đi ngang qua giá trị cũ, nhưng không được trùng khớp hoàn toàn.
    expect(closest).toBeGreaterThan(0);
  });
});

describe("con giat khi keo", () => {
  it("manh nhat ngay luc phat sinh roi tat dan", () => {
    expect(gustAt(1, 0)).toBe(1);
    expect(gustAt(1, 1)).toBeLessThan(1);
    expect(gustAt(1, 3)).toBeLessThan(gustAt(1, 1));
  });

  it("gan nhu bien mat sau vai giay", () => {
    expect(gustAt(1, 5)).toBeLessThan(0.01);
  });

  it("khong tra ve gia tri cho thoi diem am hoac khong hop le", () => {
    expect(gustAt(1, -1)).toBe(0);
    expect(gustAt(1, Number.NaN)).toBe(0);
  });
});

describe("nhen lua", () => {
  it("di tu 0 toi 1 va dung o do", () => {
    expect(kindleProgress(0)).toBe(0);
    expect(kindleProgress(-1)).toBe(0);
    expect(kindleProgress(KINDLE_SECONDS)).toBe(1);
    expect(kindleProgress(KINDLE_SECONDS * 4)).toBe(1);
  });

  it("khong bao gio ra ngoai khoang 0 den 1", () => {
    for (let t = 0; t <= KINDLE_SECONDS; t += 0.01) {
      const p = kindleProgress(t);
      expect(p).toBeGreaterThanOrEqual(0);
      expect(p).toBeLessThanOrEqual(1);
    }
  });

  // Nhịp chững ở giữa là toàn bộ lý do hàm này không phải một phép nội suy:
  // lửa nhen thật bén được rồi gần như lụi, rồi mới bắt hẳn.
  it("co mot nhip chung o giua chu khong tang deu", () => {
    const around = kindleProgress(KINDLE_SECONDS * 0.4);
    const linearish = 1 - Math.pow(1 - 0.4, 2.2);
    expect(around).toBeLessThan(linearish);
  });
});

describe("ngon lua phan ung voi gio", () => {
  it("nghieng theo chieu gio", () => {
    expect(flameMotion(1, 1, 0).tilt).toBeGreaterThan(0);
    expect(flameMotion(-1, 1, 0).tilt).toBeLessThan(0);
    expect(flameMotion(0, 1, 0).tilt).toBe(0);
  });

  // Điều kiện thiết kế của cả trang: ngọn lửa ở Góc yên tĩnh không bao giờ
  // tắt. Nếu một cú kéo chuột đủ mạnh thổi tắt được nó thì trang vừa nói
  // ngược lại chính điều nó muốn nói.
  it("gio manh toi dau cung khong thoi tat duoc lua da nhen", () => {
    for (const wind of [2, 5, 50, -50, Number.POSITIVE_INFINITY]) {
      const m = flameMotion(wind, 1, 0);
      expect(m.glow).toBeGreaterThan(0);
      expect(m.stretch).toBeGreaterThan(0);
      expect(Number.isFinite(m.tilt)).toBe(true);
    }
  });

  it("lua moi nhen thi mong manh hon lua da bat han", () => {
    const young = flameMotion(1, 0.2, 0);
    const grown = flameMotion(1, 1, 0);
    expect(Math.abs(young.tilt)).toBeGreaterThan(Math.abs(grown.tilt));
  });

  it("chua nhen thi chua sang", () => {
    expect(flameMotion(0, 0, 0).glow).toBeLessThan(0.3);
    expect(flameMotion(0, 1, 0).glow).toBeGreaterThan(0.6);
  });

  it("khong vo hinh voi dau vao khong hop le", () => {
    const m = flameMotion(Number.NaN, 1, 0);
    expect(Number.isFinite(m.tilt)).toBe(true);
    expect(Number.isFinite(m.stretch)).toBe(true);
  });
});

describe("ve vi tri nghi sau khi tha tay", () => {
  it("tien ve 0 va chot han o 0", () => {
    let angle = 0.5;
    for (let i = 0; i < 200; i++) angle = springBack(angle, 1 / 60);
    expect(angle).toBe(0);
  });

  it("khong vot qua 0 du delta lon bat thuong", () => {
    expect(springBack(0.5, 10)).toBe(0);
    expect(springBack(-0.5, 10)).toBe(0);
  });
});
