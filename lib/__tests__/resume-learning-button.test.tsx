// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

const greeting = vi.fn();
vi.mock("@/app/(app)/dashboard/actions", () => ({ getDashboardGreetingAction: (...a: unknown[]) => greeting(...a) }));
vi.mock("@/lib/feature-events", () => ({ trackFeatureClick: vi.fn() }));

const { default: ResumeLearningButton } = await import("@/components/ResumeLearningButton");

afterEach(() => {
  cleanup();
  greeting.mockReset();
});

const base = {
  nextLessonCriteria: null,
  todayRecallItems: [],
  totalMinutes: 0,
  firstName: "Tri",
  topicGapSummary: [],
  criticalMistake: null,
  stageReviewInsight: null,
};

function renderCard(showCoCo?: boolean) {
  return render(
    <I18nProvider initialLocale="vi">
      <ResumeLearningButton activeTrack="personal" userId="u1" showCoCo={showCoCo} />
    </I18nProvider>
  );
}

// Thẻ "Hôm nay làm gì?": Cơ Cơ nói trước, rồi đúng một bài và một nút.
describe("ResumeLearningButton", () => {
  it("shows Cơ Cơ, the next lesson, its stage tag and one CTA", async () => {
    greeting.mockResolvedValue({
      ...base,
      nextLesson: { id: 1302, slug: "commit-dau-tien", title: "Chặng 2, Bài 2: Commit đầu tiên và vùng chờ", subtitle: "Chụp ảnh dự án", duration: "7 phút" },
      completedCount: 9,
      trackProgress: { completed: 9, total: 300, percent: 3 },
    });
    renderCard();

    await waitFor(() => expect(screen.getByRole("heading", { level: 2 })).toBeTruthy());
    expect(screen.getByText("CƠ CƠ")).toBeTruthy();
    expect(screen.getByText("HÔM NAY LÀM GÌ?")).toBeTruthy();
    // Chặng 2 của tuyến Nền tảng là Git.
    expect(screen.getByText(/GIT/)).toBeTruthy();
    expect(screen.getByRole("link").getAttribute("href")).toBe("/bai-hoc/commit-dau-tien");
  });

  it("hides Cơ Cơ when the page already has its own", async () => {
    greeting.mockResolvedValue({
      ...base,
      nextLesson: { id: 1302, slug: "commit-dau-tien", title: "Commit đầu tiên", subtitle: "", duration: "7 phút" },
      completedCount: 0,
      trackProgress: { completed: 0, total: 300, percent: 0 },
    });
    renderCard(false);

    await waitFor(() => expect(screen.getByRole("heading", { level: 2 })).toBeTruthy());
    expect(screen.queryByText("CƠ CƠ")).toBeNull();
  });
});
