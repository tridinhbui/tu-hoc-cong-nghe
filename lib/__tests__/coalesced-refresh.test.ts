import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createCoalescer } from "@/lib/coalesced-refresh";

/** Gộp sự kiện feed cộng đồng.
 *
 *  Ba kênh realtime không lọc đều gọi cùng một hàm tải lại, nên một người thả
 *  cảm xúc làm mọi người đang mở /bang-tin chạy một truy vấn feed. Bộ gộp này
 *  là chỗ chặn, và nó chỉ được phép cắt những lần tải lại KHÔNG đổi thứ người
 *  dùng nhìn thấy - vì thế nửa số bài dưới đây kiểm rằng nó vẫn chạy. */

describe("gộp trong cửa sổ thời gian", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("mười sự kiện dồn dập chỉ tải lại một lần", () => {
    const run = vi.fn();
    const c = createCoalescer(run, { windowMs: 1000, isVisible: () => true });
    for (let i = 0; i < 10; i++) c.trigger();
    expect(run).not.toHaveBeenCalled(); // chưa hết cửa sổ
    vi.advanceTimersByTime(1000);
    expect(run).toHaveBeenCalledTimes(1);
  });

  it("sự kiện ở cửa sổ sau vẫn được tải lại", () => {
    // Cắt lần tải lại thứ hai mới là mất dữ liệu; gộp chỉ được cắt trùng lặp.
    const run = vi.fn();
    const c = createCoalescer(run, { windowMs: 1000, isVisible: () => true });
    c.trigger();
    vi.advanceTimersByTime(1000);
    c.trigger();
    vi.advanceTimersByTime(1000);
    expect(run).toHaveBeenCalledTimes(2);
  });

  it("không có sự kiện thì không tự chạy", () => {
    const run = vi.fn();
    createCoalescer(run, { windowMs: 1000, isVisible: () => true });
    vi.advanceTimersByTime(10_000);
    expect(run).not.toHaveBeenCalled();
  });

  it("huỷ thì lần tải lại đang treo không chạy", () => {
    const run = vi.fn();
    const c = createCoalescer(run, { windowMs: 1000, isVisible: () => true });
    c.trigger();
    c.cancel();
    vi.advanceTimersByTime(5000);
    expect(run).not.toHaveBeenCalled();
  });
});

describe("tab bị ẩn", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("không tải lại gì khi tab đang ẩn", () => {
    const run = vi.fn();
    const c = createCoalescer(run, { windowMs: 1000, isVisible: () => false });
    for (let i = 0; i < 50; i++) c.trigger();
    vi.advanceTimersByTime(60_000);
    expect(run).not.toHaveBeenCalled();
  });

  it("hiện lại thì tải đúng MỘT lần cho mọi sự kiện đã bỏ lỡ", () => {
    // Đây là phần phải đúng: hoãn được phép, nhưng nuốt luôn thì người dùng
    // quay lại và nhìn một feed cũ.
    const run = vi.fn();
    let visible = false;
    const c = createCoalescer(run, { windowMs: 1000, isVisible: () => visible });
    for (let i = 0; i < 50; i++) c.trigger();
    visible = true;
    c.onVisible();
    expect(run).toHaveBeenCalledTimes(1);
  });

  it("hiện lại mà không bỏ lỡ gì thì không tải lại", () => {
    const run = vi.fn();
    const c = createCoalescer(run, { windowMs: 1000, isVisible: () => true });
    c.onVisible();
    expect(run).not.toHaveBeenCalled();
  });

  it("ẩn đi giữa lúc hẹn giờ đang chạy thì hoãn lại, không mất", () => {
    const run = vi.fn();
    let visible = true;
    const c = createCoalescer(run, { windowMs: 1000, isVisible: () => visible });
    c.trigger();
    visible = false;
    vi.advanceTimersByTime(1000); // hẹn giờ nổ trong lúc tab đã ẩn
    expect(run).not.toHaveBeenCalled();
    visible = true;
    c.onVisible();
    expect(run).toHaveBeenCalledTimes(1);
  });

  it("hiện lại hai lần liên tiếp chỉ tải một lần", () => {
    const run = vi.fn();
    let visible = false;
    const c = createCoalescer(run, { windowMs: 1000, isVisible: () => visible });
    c.trigger();
    visible = true;
    c.onVisible();
    c.onVisible();
    expect(run).toHaveBeenCalledTimes(1);
  });

  it("huỷ rồi hiện lại thì không tải lại", () => {
    const run = vi.fn();
    let visible = false;
    const c = createCoalescer(run, { windowMs: 1000, isVisible: () => visible });
    c.trigger();
    c.cancel();
    visible = true;
    c.onVisible();
    expect(run).not.toHaveBeenCalled();
  });

  it("mặc định coi là đang hiện khi không có document", () => {
    // Module này bị import cả ở phía server; không có `document` thì không
    // được im lặng nuốt mọi lần tải lại.
    const run = vi.fn();
    const c = createCoalescer(run, { windowMs: 1000 });
    c.trigger();
    vi.advanceTimersByTime(1000);
    expect(run).toHaveBeenCalledTimes(1);
  });
});
