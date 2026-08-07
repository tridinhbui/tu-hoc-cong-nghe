// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactElement } from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import HighlightNotebook from "@/components/HighlightNotebook";
import type { LessonHighlight } from "@/lib/lesson-highlights";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL } from "@/lib/track-stages";
import { I18nProvider } from "@/lib/i18n/context";

// The component only needs these for delete; the notebook under test never
// reaches the network in these cases.
vi.mock("@/lib/lesson-highlights", () => ({ deleteHighlight: vi.fn() }));
vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));
// I18nProvider calls useRouter() to keep the locale cookie in sync; there is
// no app router mounted in this test environment.
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

// HighlightReview (rendered by HighlightNotebook in review mode) calls
// useI18n(), so every render here needs the provider - see
// lib/__tests__/room-directory.test.tsx for the same pattern.
function renderWithI18n(node: ReactElement) {
  return render(<I18nProvider initialLocale="vi">{node}</I18nProvider>);
}

const personalStage = TRACK_PERSONAL.stages[0];
const professionalStage = TRACK_PROFESSIONAL.stages[0];

function highlight(id: number, lessonId: number, quote: string): LessonHighlight {
  return {
    id,
    user_id: "u1",
    lesson_id: lessonId,
    lesson_slug: `bai-${lessonId}`,
    quote,
    kind: "important",
    created_at: new Date().toISOString(),
  };
}

const HIGHLIGHTS = [
  highlight(1, personalStage.days[0], "Quỹ khẩn cấp nên đủ sáu tháng chi tiêu"),
  highlight(2, personalStage.days[0], "Trả nợ lãi cao trước"),
  highlight(3, professionalStage.days[0], "Kế toán là ngôn ngữ của kinh doanh"),
];

const LESSONS = {
  [personalStage.days[0]]: { slug: "audit-tai-chinh", title: "Audit tài chính cá nhân" },
  [professionalStage.days[0]]: { slug: "ke-toan-la-gi", title: "Kế toán là gì" },
};

afterEach(cleanup);

describe("HighlightNotebook", () => {
  it("shows an empty state when nothing has been highlighted", () => {
    renderWithI18n(<HighlightNotebook highlights={[]} lessonsById={LESSONS} />);
    expect(screen.getByText("Chưa có đoạn nào được tô")).toBeDefined();
  });

  it("groups highlights under their chặng, personal track first", () => {
    renderWithI18n(<HighlightNotebook highlights={HIGHLIGHTS} lessonsById={LESSONS} />);

    const headings = screen.getAllByRole("button", { expanded: true });
    expect(headings).toHaveLength(2);
    expect(headings[0].textContent).toContain(personalStage.label);
    expect(headings[0].textContent).toContain("2 đoạn");
    expect(headings[1].textContent).toContain(professionalStage.label);
    expect(headings[1].textContent).toContain("1 đoạn");
  });

  it("links each highlight back to its lesson, labelled with the lesson title", () => {
    renderWithI18n(<HighlightNotebook highlights={HIGHLIGHTS} lessonsById={LESSONS} />);

    const link = screen.getByText("Quỹ khẩn cấp nên đủ sáu tháng chi tiêu").closest("a");
    expect(link?.getAttribute("href")).toBe("/bai-hoc/audit-tai-chinh");
    expect(within(link as HTMLElement).getByText("Audit tài chính cá nhân")).toBeDefined();
  });

  it("falls back to the stored slug when the lesson is not in metadata", () => {
    renderWithI18n(<HighlightNotebook highlights={[highlight(9, personalStage.days[0], "đoạn mồ côi")]} lessonsById={{}} />);
    const link = screen.getByText("đoạn mồ côi").closest("a");
    expect(link?.getAttribute("href")).toBe(`/bai-hoc/bai-${personalStage.days[0]}`);
  });

  it("collapses and expands a stage", () => {
    renderWithI18n(<HighlightNotebook highlights={HIGHLIGHTS} lessonsById={LESSONS} />);
    const heading = screen.getAllByRole("button", { expanded: true })[0];

    fireEvent.click(heading);
    expect(screen.queryByText("Quỹ khẩn cấp nên đủ sáu tháng chi tiêu")).toBeNull();

    fireEvent.click(heading);
    expect(screen.getByText("Quỹ khẩn cấp nên đủ sáu tháng chi tiêu")).toBeDefined();
  });
});

describe("review mode", () => {
  function startReview() {
    renderWithI18n(<HighlightNotebook highlights={HIGHLIGHTS} lessonsById={LESSONS} />);
    fireEvent.click(screen.getByRole("button", { name: /Ôn tập/ }));
  }

  it("hides the source until revealed, then links to the lesson", () => {
    startReview();
    expect(screen.getByText(/Ôn tập · 1\/3/)).toBeDefined();
    // No lesson title on screen while the learner is still recalling.
    expect(screen.queryByText("Audit tài chính cá nhân")).toBeNull();
    expect(screen.queryByText("Kế toán là gì")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /Đoạn này ở bài nào/ }));

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toMatch(/^\/bai-hoc\//);
  });

  it("shows the chặng the passage came from on reveal", () => {
    startReview();
    fireEvent.click(screen.getByRole("button", { name: /Đoạn này ở bài nào/ }));
    const labels = [personalStage.label, professionalStage.label];
    expect(labels.some((l) => screen.queryByText(new RegExp(l)) !== null)).toBe(true);
  });

  it("counts only the passages marked as recalled", () => {
    startReview();

    for (let i = 0; i < 3; i++) {
      fireEvent.click(screen.getByRole("button", { name: /Đoạn này ở bài nào/ }));
      // Recall the first, miss the other two.
      const label = i === 0 ? /Nhớ rồi|Nhớ · Kết thúc/ : /Chưa nhớ/;
      fireEvent.click(screen.getByRole("button", { name: label }));
    }

    expect(screen.getByText("1/3")).toBeDefined();
  });

  it("returns to the notebook on exit", () => {
    startReview();
    fireEvent.click(screen.getByRole("button", { name: "Thoát ôn tập" }));
    expect(screen.getByText(/Đoạn đã tô · 3/)).toBeDefined();
  });
});
