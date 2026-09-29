// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";
import { getDictionary } from "@/lib/i18n";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }), usePathname: () => "/phong-van-ky-thuat" }));
// Cảnh 3D cần WebGL; ở đây chỉ cần biết nó được gọi.
vi.mock("@/components/InterviewerStage", () => ({ default: () => <div data-testid="interviewer-stage" /> }));
vi.mock("@/lib/current-user", () => ({ getCurrentUserId: async () => null }));
vi.mock("@/lib/quiz-mistakes", () => ({ recordQuizMistake: async () => {} }));

const { default: TechnicalInterviewPage } = await import("@/app/(app)/phong-van-ky-thuat/page");

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const t = getDictionary("vi");
const R = t.revampInterview;

function renderPage() {
  return render(
    <I18nProvider initialLocale="vi">
      <TechnicalInterviewPage />
    </I18nProvider>
  );
}

// Trang /phong-van-ky-thuat: bốn bước là tiến độ thật, khối "buổi phỏng vấn sẽ
// được tạo" nói đúng lựa chọn, buổi phỏng vấn không có điều hướng thừa, và màn
// kết quả chỉ chấm những trục đo được.
describe("technical interview simulator", () => {
  it("turns the 01-04 strip into real progress", () => {
    renderPage();
    const stepper = screen.getByRole("list", { name: R.stepperLabel });
    const current = () => within(stepper).getAllByRole("button").findIndex((b) => b.getAttribute("aria-current") === "step");

    expect(current()).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: /Lập trình viên Frontend/ }));
    expect(current()).toBe(1);
    fireEvent.click(screen.getByRole("button", { name: new RegExp(t.interview.diffHard) }));
    expect(current()).toBe(2);
    fireEvent.click(screen.getByRole("button", { name: /^10/ }));
    expect(current()).toBe(3);

    // Khối môi trường phản ánh lựa chọn: người phỏng vấn của vòng khó.
    expect(screen.getAllByText(t.interview.roundPressure).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: new RegExp(R.startCta) })).toBeTruthy();
  });

  it("runs a distraction-free session and reports only measurable axes", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify({
          questions: [
            // -1001 là câu mức dễ, -1002 là câu mức trung bình trong kho frontend.
            { lessonId: -1001, lessonTitle: "Phỏng vấn · HTML & khả năng truy cập", category: "HTML & khả năng truy cập", question: "Câu một?", options: ["A1", "B1", "C1", "D1"], correct: 1, explanation: "Vì B1.", token: "t1" },
            { lessonId: -1002, lessonTitle: "Phỏng vấn · HTML & khả năng truy cập", category: "HTML & khả năng truy cập", question: "Câu hai?", options: ["A2", "B2", "C2", "D2"], correct: 2, explanation: "Vì C2.", token: "t2" },
          ],
        }),
        { status: 200 }
      )
    );
    vi.stubGlobal("fetch", fetchMock);
    renderPage();

    fireEvent.click(screen.getByRole("button", { name: new RegExp(R.startCta) }));
    await screen.findByText("Câu một?");

    // Trong buổi: có nút thoát, không có liên kết về dashboard.
    expect(screen.getByRole("button", { name: R.exit })).toBeTruthy();
    expect(screen.queryByRole("link", { name: t.interview.backToDashboard })).toBeNull();
    expect(screen.getByText(R.followUpPending)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /B1/ }));
    fireEvent.click(screen.getByRole("button", { name: t.interview.lockAnswer }));
    // Đúng thì người phỏng vấn hỏi vì sao không phải một phương án khác.
    expect(screen.getByText(/Vì sao không phải phương án/)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: new RegExp(t.interview.nextQuestion.replace("→", "").trim()) }));
    fireEvent.click(screen.getByRole("button", { name: /A2/ }));
    fireEvent.click(screen.getByRole("button", { name: t.interview.lockAnswer }));
    expect(screen.getByText("Phương án A sai ở đâu, và C xử lý điều đó thế nào?")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: new RegExp(t.interview.seeResult) }));
    await screen.findByText(R.resultTitle);

    expect(screen.getByText(R.axisAccuracy)).toBeTruthy();
    // Giao tiếp và chiều sâu (không có câu khó) phải là "chưa đo", không có số.
    expect(screen.getByText(R.axisCommunicationNone)).toBeTruthy();
    expect(screen.getByText(R.axisDepthNone)).toBeTruthy();
    expect(screen.getAllByText(R.notMeasured)).toHaveLength(2);
    // Kỹ năng ưu tiên là chủ đề sai nhiều nhất.
    expect(screen.getByText(R.priorityTitle)).toBeTruthy();
    expect(screen.getByRole("button", { name: new RegExp(R.priorityCta) })).toBeTruthy();
  });
});
