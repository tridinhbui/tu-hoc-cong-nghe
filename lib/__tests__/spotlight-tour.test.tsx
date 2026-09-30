// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));
vi.mock("@/lib/tour-flags", () => ({ hasSeenTour: vi.fn(async () => false), markTourSeen: vi.fn(async () => {}) }));

const { default: SpotlightTour } = await import("@/components/SpotlightTour");

/* Tour hướng dẫn phủ tối cả màn hình và chặn mọi cú bấm ngoài khung của nó.
 *
 * Lỗi thật (bài xem thử cho khách, 2026-09-29): người mới cuộn tiếp trong lúc
 * tour đang mở, khung giải thích bám theo phần tử được tô sáng và trôi lên
 * y = -1214, còn lớp phủ thì ở lại. Màn hình tối, không gì bấm được, và nút
 * "Bỏ qua" nằm ngoài tầm nhìn - trông y như trang bị treo. */

const STEPS = [{ selector: "#target", title: "Tiến độ đọc bài", text: "Thanh này theo dõi bạn đã đọc đến đâu." }];

function mountWithTarget(rect: Partial<DOMRect>) {
  // Đồng hồ giả phải bật TRƯỚC khi render: hẹn giờ 500ms của tour được đặt
  // ngay trong effect lúc gắn.
  vi.useFakeTimers();
  const target = document.createElement("div");
  target.id = "target";
  target.getBoundingClientRect = () =>
    ({ top: 0, left: 40, width: 600, height: 8, bottom: 8, right: 640, x: 40, y: 0, toJSON: () => ({}), ...rect }) as DOMRect;
  target.scrollIntoView = () => {};
  document.body.appendChild(target);
  return render(
    <I18nProvider initialLocale="vi">
      <SpotlightTour steps={STEPS} storageKey="test_tour" />
    </I18nProvider>
  );
}

afterEach(() => {
  cleanup();
  document.getElementById("target")?.remove();
  window.localStorage.clear();
  vi.useRealTimers();
});

async function startTour() {
  // Hai nhịp tách nhau: 500ms để bật tour, và chỉ SAU khi lượt render đó
  // xong thì effect đo mới đặt hẹn giờ 400ms của nó. Tua một mạch 1.200ms
  // trong cùng một act thì hẹn giờ thứ hai chưa tồn tại lúc đồng hồ chạy qua.
  await act(async () => {
    await vi.advanceTimersByTimeAsync(600);
  });
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1000);
  });
}

describe("SpotlightTour", () => {
  it("neo khung giải thích vào đáy màn hình khi phần tử đã cuộn ra ngoài", async () => {
    mountWithTarget({ top: -1300, bottom: -1292 });
    await startTour();
    const tooltip = screen.getByText("Tiến độ đọc bài").closest("div.fixed") as HTMLElement;
    const top = parseFloat(tooltip.style.top);
    expect(top).toBeGreaterThan(0);
    expect(top).toBeLessThanOrEqual(window.innerHeight);
    // Neo ở đáy: kéo lên đúng bằng chiều cao của chính nó.
    expect(tooltip.style.transform).toBe("translateY(-100%)");
  });

  it("vẫn đặt khung ngay dưới phần tử khi phần tử còn trong màn hình", async () => {
    mountWithTarget({ top: 100, bottom: 108 });
    await startTour();
    const tooltip = screen.getByText("Tiến độ đọc bài").closest("div.fixed") as HTMLElement;
    expect(parseFloat(tooltip.style.top)).toBe(108 + 8 + 12);
    expect(tooltip.style.transform).toBe("");
  });

  it("Escape đóng tour", async () => {
    mountWithTarget({ top: 100, bottom: 108 });
    await startTour();
    expect(screen.queryByText("Tiến độ đọc bài")).not.toBeNull();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByText("Tiến độ đọc bài")).toBeNull();
    expect(window.localStorage.getItem("test_tour")).toBe("1");
  });
});
