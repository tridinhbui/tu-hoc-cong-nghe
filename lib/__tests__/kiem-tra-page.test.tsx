// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";
import { QUEST_XP_REWARDS } from "@/lib/quest-rewards";
import { QUIZ_XP_PER_CORRECT } from "@/lib/cloudflare-quiz-sessions";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));
vi.mock("@/lib/current-user", () => ({ getCurrentUserId: vi.fn(async () => null) }));
vi.mock("@/lib/cloudflare-user", () => ({ recalculateUserStats: vi.fn(async () => {}) }));
vi.mock("@/lib/cloudflare-quests", () => ({ claimQuestReward: vi.fn(async () => ({ claimed: true, xpEarned: 8 })) }));

const { default: KiemTraPage } = await import("@/app/(app)/kiem-tra/page");

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  localStorage.clear();
});

function renderPage() {
  return render(
    <I18nProvider initialLocale="vi">
      <KiemTraPage />
    </I18nProvider>
  );
}

// /kiem-tra: cột trái là DAILY SIGNAL (ngày thật, XP thật của nhiệm vụ), cột
// phải là TRAINING LAB. Sau khi trả lời một câu, phần phản hồi phải có LẬP
// LUẬN - đáp án đúng viết nguyên văn và "vì sao" - chứ không chỉ đúng/sai.
describe("/kiem-tra", () => {
  it("renders the daily signal header with the real XP and the training lab", () => {
    renderPage();
    expect(screen.getByText(/DAILY SIGNAL · \d{2}\.\d{2}\.\d{2}/)).toBeTruthy();
    expect(screen.getByText(`+${QUEST_XP_REWARDS.daily_news_quiz} XP`)).toBeTruthy();
    expect(screen.getByText("TRAINING LAB")).toBeTruthy();

    const hard = screen.getByRole("radio", { name: "Khó" });
    expect(hard.getAttribute("aria-checked")).toBe("false");
    fireEvent.click(hard);
    expect(hard.getAttribute("aria-checked")).toBe("true");
  });

  it("teaches the reasoning after an answer", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(
          JSON.stringify({
            questions: [
              {
                lessonId: 1,
                lessonTitle: "Git cơ bản",
                lessonSlug: "git-co-ban",
                question: "Lệnh nào tạo commit?",
                options: ["git commit", "git push", "git pull", "git clone"],
                correct: 0,
                explanation: "commit ghi ảnh chụp vào lịch sử cục bộ; push mới gửi lên remote.",
                token: "tok",
              },
            ],
          }),
          { status: 200 }
        )
      )
    );
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /Chạy phiên luyện/ }));
    expect(await screen.findByText("Lệnh nào tạo commit?")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /git push/ }));
    fireEvent.click(screen.getByRole("button", { name: /Kiểm tra đáp án/ }));

    expect(screen.getByText("Bạn chọn B")).toBeTruthy();
    expect(screen.getByText("Đáp án A")).toBeTruthy();
    expect(screen.getByText("Vì sao")).toBeTruthy();
    expect(screen.getByText(/commit ghi ảnh chụp/)).toBeTruthy();
    // Sai thì câu này 0 XP; mức thưởng mỗi câu vẫn đọc từ bảng thật.
    expect(screen.getByText("0 XP")).toBeTruthy();
    expect(QUIZ_XP_PER_CORRECT["tat-ca"]).toBeGreaterThan(0);
  });
});
