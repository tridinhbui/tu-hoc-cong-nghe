// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { scrollToNeeds, NEEDS_SECTION_ID } from "@/components/home/v2/EditorialNeeds";

/* Nút "Bắt đầu học miễn phí" ở đầu trang chủ cuộn xuống khu #bat-dau. Có báo
 * cáo nút bấm không hoạt động: liên kết neo trần hỏng im lặng ở một số trình
 * duyệt, và cuộn MƯỢT không chạy khi trang không hiển thị (đo được: scrollY mắc
 * ở 0 trong tab ẩn trong khi cuộn tức thì tới ngay). */
function mountSection(top: number) {
  const el = document.createElement("section");
  el.id = NEEDS_SECTION_ID;
  el.getBoundingClientRect = () => ({ top }) as DOMRect;
  const spy = vi.fn();
  el.scrollIntoView = spy;
  document.body.appendChild(el);
  return spy;
}
function visibility(v: "visible" | "hidden") {
  Object.defineProperty(document, "visibilityState", { value: v, configurable: true });
}

afterEach(() => {
  document.getElementById(NEEDS_SECTION_ID)?.remove();
  vi.useRealTimers();
  visibility("visible");
});

describe("scrollToNeeds", () => {
  it("trả false khi khu không có trong trang", () => {
    expect(scrollToNeeds()).toBe(false);
  });

  it("cuộn mượt khi trang đang hiển thị", () => {
    visibility("visible");
    const spy = mountSection(0);
    expect(scrollToNeeds(true)).toBe(true);
    expect(spy).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  });

  it("cuộn TỨC THÌ khi trang ẩn, vì cuộn mượt sẽ đứng yên", () => {
    visibility("hidden");
    const spy = mountSection(900);
    scrollToNeeds(true);
    expect(spy).toHaveBeenCalledWith({ behavior: "auto", block: "start" });
  });

  it("nhảy thẳng nếu cuộn mượt đã chạy mà khu vẫn ở xa mép trên", () => {
    vi.useFakeTimers();
    visibility("visible");
    const spy = mountSection(900);
    scrollToNeeds(true);
    expect(spy).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(1200);
    expect(spy).toHaveBeenLastCalledWith({ behavior: "auto", block: "start" });
  });

  it("không nhảy thêm khi cuộn mượt đã tới nơi", () => {
    vi.useFakeTimers();
    visibility("visible");
    const spy = mountSection(64);
    scrollToNeeds(true);
    vi.advanceTimersByTime(1200);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
