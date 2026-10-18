// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";
import { getDictionary } from "@/lib/i18n";

/**
 * Khách làm quiz trên trang bài học: mỗi câu trả lời từng gọi RPC
 * record_quiz_mistake, RPC đó cần người gọi nên trả 403, và Next dev overlay
 * hiện "Issue" cho từng câu. Ghi câu sai chỉ có nghĩa với người có tài khoản.
 */

const user = vi.hoisted(() => ({ current: null as { id: string } | null }));
const recordQuizMistake = vi.hoisted(() => vi.fn(async () => {}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/bai-hoc/bai-thu",
}));
vi.mock("@/lib/current-user", () => ({ getCurrentUser: async () => user.current }));
vi.mock("@/lib/quiz-mistakes", () => ({ recordQuizMistake }));
vi.mock("@/lib/lesson-highlights", () => ({ getLessonHighlights: async () => [] }));
vi.mock("@/lib/cloudflare-reading", () => ({
  getReadingProgress: async () => null,
  updateReadingProgress: async () => {},
}));
vi.mock("@/lib/cloudflare-progress", () => ({
  markLessonComplete: async () => {},
  getLessonProgress: async () => null,
}));
vi.mock("@/lib/recall-actions", () => ({ getRecallItemsAction: async () => [] }));

const { default: LessonPageLayout } = await import("@/components/LessonPageLayout");

const t = getDictionary("vi");

afterEach(() => {
  cleanup();
  recordQuizMistake.mockClear();
  // saveQuizAnswers giữ câu đã nộp trong localStorage - không xoá thì bài
  // thứ hai mở ra với câu hỏi đã trả lời sẵn.
  localStorage.clear();
  vi.unstubAllGlobals();
});

function renderLesson() {
  vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 404 })));
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
  return render(
    <I18nProvider initialLocale="vi">
      <LessonPageLayout
        lesson={{ id: 990001, title: "Bài thử", subtitle: "", duration: "5 phút", difficulty: "Dễ", emoji: "", day: 1, accent: "blue", slug: "bai-thu" }}
        quiz={[{ question: "Câu thử?", options: ["Một", "Hai", "Ba", "Bốn"], correct: 1, explanation: "Vì Hai." }]}
      >
        <p>Nội dung</p>
      </LessonPageLayout>
    </I18nProvider>
  );
}

async function answerFirstQuestion() {
  fireEvent.click(await screen.findByRole("button", { name: /Một/ }));
  fireEvent.click(screen.getByRole("button", { name: new RegExp(t.lessonLayout.check) }));
}

describe("LessonPageLayout - ghi câu sai", () => {
  it("không gọi record_quiz_mistake cho khách", async () => {
    user.current = null;
    renderLesson();
    await answerFirstQuestion();
    expect(recordQuizMistake).not.toHaveBeenCalled();
  });

  it("vẫn ghi câu sai cho người đã đăng nhập", async () => {
    user.current = { id: "u-1" };
    renderLesson();
    // Chờ getCurrentUser() trả lời - trước đó userId còn null.
    await waitFor(() => expect(screen.queryByText(t.lessonLayout.check)).toBeTruthy());
    await new Promise((r) => setTimeout(r, 0));
    await answerFirstQuestion();
    expect(recordQuizMistake).toHaveBeenCalledWith(990001, 0, false, "Câu thử?");
  });
});
