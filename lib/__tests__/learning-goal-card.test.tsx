// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";
import { LEARNING_FLOWS } from "@/lib/learning-flows";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const progress = Object.fromEntries(
  LEARNING_FLOWS.map((f) => [f.id, { done: 0, total: 5, stepIndex: 0, next: null }])
);
const saveLearningGoal = vi.fn(async () => ({ ok: true }));
vi.mock("@/app/actions/learning-goal", () => ({
  getLearningGoalState: vi.fn(async () => ({ goal: null, progress })),
  saveLearningGoal: (...args: unknown[]) => saveLearningGoal(...(args as [])),
}));

const { default: LearningGoalCard } = await import("@/components/learning-flows/LearningGoalCard");

afterEach(cleanup);

// /hoc-theo-nhu-cau chuyển người đã đăng nhập về /lo-trinh, nên thẻ chọn mục
// tiêu ở đó là chỗ DUY NHẤT họ xem được một hành trình trước khi chọn nó.
describe("LearningGoalCard - thẻ chọn trên /lo-trinh", () => {
  it("mỗi nhu cầu có link xem trước, nằm ngoài nút chọn", async () => {
    render(
      <I18nProvider initialLocale="vi">
        <LearningGoalCard id="goal" />
      </I18nProvider>
    );
    const links = await screen.findAllByRole("link", { name: /Xem các chặng/ });
    expect(links.map((a) => a.getAttribute("href"))).toEqual(
      LEARNING_FLOWS.map((f) => `/hoc-theo-nhu-cau/${f.id}`)
    );
    // <a> trong <button> là HTML sai: bấm vào đâu thì trình duyệt tự chọn.
    for (const a of links) expect(a.closest("button")).toBeNull();
    expect(document.getElementById("goal")).not.toBeNull();
  });

  it("mỗi lối ghi công sức thật, kỹ năng và output - không chỉ tên môn", async () => {
    render(
      <I18nProvider initialLocale="vi">
        <LearningGoalCard effort={{ "ai-agent": { count: 18, minutes: 102 } }} />
      </I18nProvider>
    );
    // 102 phút làm tròn tới nửa giờ -> 1,5 giờ; lối không có số phút chỉ ghi số bài.
    expect(await screen.findByText("18 bài · ~1,5 giờ")).toBeTruthy();
    expect(screen.getAllByText("5 bài").length).toBe(LEARNING_FLOWS.length - 1);
    expect(screen.getByText("Agent đầu tiên của bạn, chạy thật")).toBeTruthy();
    expect(screen.getAllByText("OUTPUT").length).toBe(LEARNING_FLOWS.length);
  });

  it("chọn là hai bước: bấm thẻ chỉ đánh dấu, nút Bắt đầu mới lưu", async () => {
    saveLearningGoal.mockClear();
    render(
      <I18nProvider initialLocale="vi">
        <LearningGoalCard />
      </I18nProvider>
    );
    const card = (await screen.findByText("Tạo AI Agent")).closest("button")!;
    expect(card.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(card);
    expect(card.getAttribute("aria-pressed")).toBe("true");
    expect(saveLearningGoal).not.toHaveBeenCalled();
    // Thứ đầu tiên sẽ làm ra hiện trước khi lưu.
    expect(screen.getByText("Thứ đầu tiên bạn làm ra")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Bắt đầu: Tạo AI Agent/ }));
    expect(saveLearningGoal).toHaveBeenCalledWith("ai-agent");
  });
});
