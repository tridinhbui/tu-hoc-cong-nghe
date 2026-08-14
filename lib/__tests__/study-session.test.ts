import { describe, expect, it } from "vitest";
import {
  AWAY_MS,
  POMODORO_MS,
  formatCountdown,
  isSessionComplete,
  remainingMs,
  shouldEndForAway,
  earliestSessionStart,
  focusMinutesToday,
  DAILY_FOCUS_TARGET_MINUTES,
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

describe("earliestSessionStart", () => {
  it("lấy mốc sớm nhất trong số người đang ngồi", () => {
    expect(earliestSessionStart([5000, 2000, 9000])).toBe(2000);
  });

  it("bỏ qua người không ngồi", () => {
    expect(earliestSessionStart([null, 7000, undefined])).toBe(7000);
  });

  it("bàn trống thì không có phiên nào", () => {
    expect(earliestSessionStart([])).toBe(null);
    expect(earliestSessionStart([null, null])).toBe(null);
  });

  it("người ngồi xuống muộn không mở phiên riêng - vẫn là mốc của người đầu", () => {
    const first = 1_000_000;
    const later = first + 8 * 60_000;
    expect(earliestSessionStart([first, later])).toBe(first);
  });

  it("giá trị hỏng không được thắng mốc thật", () => {
    expect(earliestSessionStart([Number.NaN, 4000])).toBe(4000);
  });
});

/** Mốc nhiệm vụ `daily_focus` hiện trên HUD phòng 3D.
 *
 *  Chỗ dễ sai nhất, và đã suýt sai: `focus_sessions.seconds` chỉ được ghi lúc
 *  ĐÓNG phiên, nên tổng lấy từ máy chủ KHÔNG chứa phiên người ta đang ngồi.
 *  Quên cộng phần đang trôi thì đồng hồ đứng im ở con số của lần trước suốt cả
 *  phiên - đúng lúc người ngồi nhìn nó nhiều nhất. */
describe("phut ngoi hoc hom nay", () => {
  const start = 1_000_000;

  it("chua ngoi thi chi tinh cac phien da dong", () => {
    expect(focusMinutesToday(600, null, start)).toBe(10);
  });

  it("cong ca phien dang mo vao tong cua may chu", () => {
    // 10 phut da dong + 5 phut dang ngoi = 15
    expect(focusMinutesToday(600, start, start + 5 * 60_000)).toBe(15);
  });

  it("lam tron xuong, khong bao gio nhay truoc mot phut", () => {
    expect(focusMinutesToday(0, start, start + 59_000)).toBe(0);
    expect(focusMinutesToday(0, start, start + 60_000)).toBe(1);
  });

  it("dong ho he thong chay lui khong lam so am", () => {
    expect(focusMinutesToday(120, start, start - 90_000)).toBe(2);
  });

  it("moc thuong 15 phut khac han mot phien Pomodoro 25 phut", () => {
    expect(DAILY_FOCUS_TARGET_MINUTES).toBe(15);
    expect(DAILY_FOCUS_TARGET_MINUTES * 60_000).toBeLessThan(POMODORO_MS);
  });
});
