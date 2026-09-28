// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
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
vi.mock("@/app/actions/learning-goal", () => ({
  getLearningGoalState: vi.fn(async () => ({ goal: null, progress })),
  saveLearningGoal: vi.fn(async () => ({ ok: true })),
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
});
