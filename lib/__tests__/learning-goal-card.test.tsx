// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";
import type { LearningGoalState } from "@/app/actions/learning-goal";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

const empty = { done: 0, total: 10, stepIndex: 0, next: { slug: "web-hoat-dong-the-nao", title: "Bài 201: Web hoạt động thế nào" } };
let state: LearningGoalState | null = null;
const save = vi.fn(async (_goal: unknown) => ({ ok: true }));

vi.mock("@/app/actions/learning-goal", () => ({
  getLearningGoalState: async () => state,
  saveLearningGoal: (g: unknown) => save(g),
}));

const { default: LearningGoalCard } = await import("@/components/learning-flows/LearningGoalCard");

function mount() {
  return render(
    <I18nProvider initialLocale="vi">
      <LearningGoalCard />
    </I18nProvider>
  );
}

afterEach(() => {
  cleanup();
  save.mockClear();
});

const progress = { website: empty, "ai-assistant": empty, "ai-agent": empty, "ai-marketing": empty };

describe("LearningGoalCard", () => {
  it("renders nothing for a signed-out visitor", async () => {
    state = null;
    const { container } = mount();
    await new Promise((r) => setTimeout(r, 0));
    expect(container.textContent).toBe("");
  });

  it("asks what the learner wants, and saves the pick", async () => {
    state = { goal: null, progress };
    mount();
    fireEvent.click(await screen.findByText("Làm website"));
    await waitFor(() => expect(save).toHaveBeenCalledWith("website"));
    // Sau khi chọn: thẻ tiến độ, bài tiếp theo không mang tiền tố "Bài 201:".
    expect(await screen.findByText("Web hoạt động thế nào")).toBeTruthy();
    expect(screen.getByText("Hành trình của bạn")).toBeTruthy();
  });

  it("rolls back the pick when saving fails", async () => {
    state = { goal: null, progress };
    save.mockResolvedValueOnce({ ok: false });
    mount();
    fireEvent.click(await screen.findByText("Tạo AI Agent"));
    expect(await screen.findByText("Chưa lưu được lựa chọn. Thử lại sau nhé.")).toBeTruthy();
    expect(screen.getByText("Bạn muốn làm được gì?")).toBeTruthy();
  });
});
