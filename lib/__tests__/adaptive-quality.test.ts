import { describe, expect, it } from "vitest";
import {
  applyLevel,
  createGovernor,
  FAST_STREAK,
  MAX_LEVEL,
  MAX_UPGRADES,
  observeFrame,
  SLOW_STREAK,
  type GovernorState,
} from "../adaptive-quality";

/** Nạp cùng một thời lượng khung n lần. */
function feed(state: GovernorState, frameMs: number, n: number): GovernorState {
  let s = state;
  for (let i = 0; i < n; i++) s = observeFrame(s, frameMs);
  return s;
}

const SLOW = 40;
const FAST = 12;
const MIDDLE = 26;

describe("hạ mức khi khung hình chậm", () => {
  it("một khung chậm lẻ không hạ gì", () => {
    expect(observeFrame(createGovernor(), SLOW).level).toBe(0);
  });

  it("chuỗi khung chậm đủ dài thì hạ đúng một mức", () => {
    expect(feed(createGovernor(), SLOW, SLOW_STREAK).level).toBe(1);
  });

  it("một khung nhanh chen vào là xoá chuỗi - không hạ vì một lần giật", () => {
    let s = feed(createGovernor(), SLOW, SLOW_STREAK - 1);
    s = observeFrame(s, FAST);
    s = feed(s, SLOW, SLOW_STREAK - 1);
    expect(s.level).toBe(0);
  });

  it("chậm mãi thì dừng ở mức thấp nhất, không hạ vô hạn", () => {
    const s = feed(createGovernor(), SLOW, SLOW_STREAK * 10);
    expect(s.level).toBe(MAX_LEVEL);
  });
});

describe("nâng lại khó hơn hạ", () => {
  it("chuỗi nhanh bằng đúng chuỗi hạ thì chưa đủ để nâng", () => {
    const lowered = feed(createGovernor(), SLOW, SLOW_STREAK);
    expect(feed(lowered, FAST, SLOW_STREAK).level).toBe(1);
  });

  it("chuỗi nhanh đủ dài thì nâng lại một mức", () => {
    const lowered = feed(createGovernor(), SLOW, SLOW_STREAK);
    expect(feed(lowered, FAST, FAST_STREAK).level).toBe(0);
  });

  it("mỗi phiên chỉ nâng lại một số lần có hạn", () => {
    let s = feed(createGovernor(), SLOW, SLOW_STREAK);
    s = feed(s, FAST, FAST_STREAK);
    expect(s.upgrades).toBe(MAX_UPGRADES);
    // Hạ rồi nâng lần nữa: lần hạ vẫn xảy ra, lần nâng thì không.
    s = feed(s, SLOW, SLOW_STREAK);
    expect(s.level).toBe(1);
    s = feed(s, FAST, FAST_STREAK * 3);
    expect(s.level).toBe(1);
  });
});

describe("khoảng đệm giữa hai ngưỡng", () => {
  it("khung ở vùng giữa không đẩy chuỗi nào", () => {
    const s = feed(createGovernor(), MIDDLE, 1000);
    expect(s).toEqual(createGovernor());
  });

  it("cảnh dao động quanh ngưỡng không làm mức nhảy qua nhảy lại", () => {
    let s = createGovernor();
    for (let i = 0; i < 2000; i++) s = observeFrame(s, i % 2 === 0 ? SLOW : FAST);
    expect(s.level).toBe(0);
  });
});

describe("bỏ qua khung bất thường", () => {
  it("khung nửa giây - chuyển tab về, dựng cảnh - không tính là máy yếu", () => {
    let s = feed(createGovernor(), SLOW, SLOW_STREAK - 1);
    s = observeFrame(s, 900);
    expect(s.slow).toBe(0);
    expect(s.level).toBe(0);
  });

  it("giá trị không phải số không làm hỏng trạng thái", () => {
    expect(observeFrame(createGovernor(), Number.NaN).level).toBe(0);
  });
});

describe("applyLevel", () => {
  const base = { shadows: true, dpr: [1, 1.75] as [number, number] };

  it("mức 0 giữ nguyên chất lượng gốc", () => {
    expect(applyLevel(base, 0)).toBe(base);
  });

  it("mức 1 tắt bóng đổ và giữ nguyên độ phân giải", () => {
    expect(applyLevel(base, 1)).toEqual({ shadows: false, dpr: [1, 1.75] });
  });

  it("mức 2 hạ thêm độ phân giải", () => {
    expect(applyLevel(base, 2)).toEqual({ shadows: false, dpr: [1, 1] });
  });

  it("không nâng độ phân giải của máy vốn đã bị hạ", () => {
    const weak = { shadows: false, dpr: [1, 1.25] as [number, number] };
    expect(applyLevel(weak, 2).dpr[1]).toBe(1);
  });
});
