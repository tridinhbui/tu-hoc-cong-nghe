import { describe, expect, it } from "vitest";
import {
  AWAY_MS,
  POMODORO_MS,
  formatCountdown,
  isSessionComplete,
  remainingMs,
  shouldEndForAway,
} from "../study-session";

describe("dong ho phien", () => {
  it("chua ngoi thi con nguyen mot phien", () => {
    expect(remainingMs(null, Date.now(), POMODORO_MS)).toBe(POMODORO_MS);
    expect(isSessionComplete(null, Date.now(), POMODORO_MS)).toBe(false);
  });

  it("khong bao gio dem xuong duoi 0", () => {
    const start = 1_000_000;
    expect(remainingMs(start, start + POMODORO_MS * 3, POMODORO_MS)).toBe(0);
  });

  it("xong dung tai moc, khong som mot mili giay nao", () => {
    const start = 1_000_000;
    expect(isSessionComplete(start, start + POMODORO_MS - 1, POMODORO_MS)).toBe(false);
    expect(isSessionComplete(start, start + POMODORO_MS, POMODORO_MS)).toBe(true);
  });

  it("dinh dang mm:ss va lam tron xuong", () => {
    expect(formatCountdown(25 * 60 * 1000)).toBe("25:00");
    expect(formatCountdown(61_999)).toBe("01:01");
    expect(formatCountdown(0)).toBe("00:00");
    expect(formatCountdown(-5000)).toBe("00:00");
  });
});

describe("roi di thi dung phien", () => {
  it("tab dang hien thi khong bao gio dung phien", () => {
    expect(shouldEndForAway(null, Date.now())).toBe(false);
  });

  // Mở nhanh một tab tra cứu rồi quay lại là việc xảy ra liên tục khi đang
  // học. Nếu ngưỡng này bắt quá sớm thì phiên bị cắt oan, và người học sẽ
  // không tin con số thời gian nữa.
  it("an tab mot lat khong bi tinh la roi di", () => {
    const hiddenAt = 1_000_000;
    expect(shouldEndForAway(hiddenAt, hiddenAt + 30_000)).toBe(false);
    expect(shouldEndForAway(hiddenAt, hiddenAt + AWAY_MS - 1)).toBe(false);
  });

  it("an tab qua nguong thi dung", () => {
    const hiddenAt = 1_000_000;
    expect(shouldEndForAway(hiddenAt, hiddenAt + AWAY_MS)).toBe(true);
    expect(shouldEndForAway(hiddenAt, hiddenAt + AWAY_MS * 10)).toBe(true);
  });

  // Ngưỡng vắng mặt phải ngắn hơn hẳn một phiên: dài bằng hoặc hơn thì nó
  // không bao giờ kịp bảo vệ điều nó sinh ra để bảo vệ.
  it("nguong vang mat ngan hon mot phien", () => {
    expect(AWAY_MS).toBeLessThan(POMODORO_MS / 2);
  });
});
