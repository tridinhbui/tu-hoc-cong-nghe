// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));
vi.mock("@/lib/cloudflare-user", () => ({ recalculateUserStats: vi.fn(async () => {}) }));

const { default: StageSkipExamPanel } = await import("@/components/StageSkipExamPanel");

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

// Panel gắn vào /thi-vuot-chang. Bộ kiểm này giữ hai
// điều: danh sách chặng đọc đúng hình dạng mà app/api/stage-exam trả về, và
// chưa có người dùng thì panel không dựng gì (trang tự lấy id rồi mới truyền).
describe("StageSkipExamPanel (toàn trang)", () => {
  it("renders the stage list from /api/stage-exam", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(
          JSON.stringify({
            stages: [
              { stageLabel: "Chặng 1", stageName: "Máy tính đơn giản hơn bạn nghĩ", lessonCount: 9, completedCount: 0, questionCount: 45, eligible: true },
              { stageLabel: "Chặng 2", stageName: "Git đơn giản hơn bạn nghĩ", lessonCount: 8, completedCount: 8, questionCount: 40, eligible: true },
            ],
          }),
          { status: 200 }
        )
      )
    );
    render(
      <I18nProvider initialLocale="vi">
        <StageSkipExamPanel userId="u1" fullPage />
      </I18nProvider>
    );
    // Tên chặng đọc từ từ điển theo vị trí (t.trackStages), số chặng hiện "01".
    expect(await screen.findByText(/Máy tính đơn giản hơn bạn nghĩ/)).toBeTruthy();
    expect(screen.getByText("01")).toBeTruthy();
    expect(screen.getByText("02")).toBeTruthy();
  });

  it("renders nothing without a user", () => {
    const { container } = render(
      <I18nProvider initialLocale="vi">
        <StageSkipExamPanel userId={null} fullPage />
      </I18nProvider>
    );
    expect(container.textContent).toBe("");
  });
});
