// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ExerciseBlock from "@/components/lesson-blocks/ExerciseBlock";
import { I18nProvider } from "@/lib/i18n/context";
import type { RunResult } from "@/lib/code-runner/run";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

// jsdom không có Web Worker; bộ chạy thật đã được kiểm trong trình duyệt và
// lời giải được scripts/verify-exercises.mjs chạy bằng python3. Ở đây chỉ kiểm
// luồng giao diện: bấm → chạy → chấm → mở lời giải.
const runCode = vi.fn<(language: string, code: string) => Promise<RunResult>>();
vi.mock("@/lib/code-runner/run", () => ({
  runCode: (language: string, code: string) => runCode(language, code),
  isRunnerWarm: () => true,
  RUN_TIMEOUT_MS: { javascript: 3000, python: 8000 },
}));

afterEach(() => {
  cleanup();
  runCode.mockReset();
});

function renderBlock(onPass?: () => void) {
  return render(
    <I18nProvider initialLocale="vi">
      <ExerciseBlock
        language="python"
        title="Đổi chỗ"
        task="Đổi hai giá trị"
        starter={"a = 1"}
        solution={"print('LOI-GIAI')"}
        expectedOutput={"2\n1"}
        hints={["GOI-Y-1"]}
        onPass={onPass}
      />
    </I18nProvider>,
  );
}

describe("ExerciseBlock", () => {
  it("runs the learner's edited code, not the starter", async () => {
    runCode.mockResolvedValue({ ok: true, stdout: "2\n1" });
    renderBlock();
    fireEvent.change(screen.getByLabelText("Mã của bạn"), { target: { value: "print(2)\nprint(1)" } });
    fireEvent.click(screen.getByRole("button", { name: /Chạy và kiểm tra/ }));
    expect(await screen.findByText(/Đúng rồi!/)).toBeTruthy();
    expect(runCode).toHaveBeenCalledWith("python", "print(2)\nprint(1)");
  });

  it("reports a pass so the lesson can save it - and only a pass", async () => {
    const onPass = vi.fn();
    runCode.mockResolvedValueOnce({ ok: true, stdout: "2\n3" }).mockResolvedValueOnce({ ok: true, stdout: "2\n1" });
    renderBlock(onPass);
    fireEvent.click(screen.getByRole("button", { name: /Chạy và kiểm tra/ }));
    await screen.findByText(/Chưa khớp/);
    expect(onPass).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /Chạy và kiểm tra/ }));
    await screen.findByText(/Đúng rồi!/);
    expect(onPass).toHaveBeenCalledTimes(1);
  });

  it("names the first wrong line, and unlocks the solution only after a run", async () => {
    runCode.mockResolvedValue({ ok: true, stdout: "2\n3" });
    renderBlock();
    expect(screen.queryByRole("button", { name: /Xem một lời giải/ })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /Chạy và kiểm tra/ }));
    expect(await screen.findByText(/Chưa khớp ở dòng 2/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Xem một lời giải/ }));
    expect(screen.getByText("LOI-GIAI", { exact: false })).toBeTruthy();
  });

  it("a crash shows the error, not a misleading 'does not match'", async () => {
    runCode.mockResolvedValue({ ok: false, stdout: "", error: "NameError: name 'x' is not defined", line: 3 });
    renderBlock();
    fireEvent.click(screen.getByRole("button", { name: /Chạy và kiểm tra/ }));
    expect(await screen.findByText(/Lỗi ở dòng 3/)).toBeTruthy();
    expect(screen.queryByText(/Chưa khớp/)).toBeNull();
  });

  it("Tab indents instead of leaving the editor", () => {
    renderBlock();
    const ta = screen.getByLabelText("Mã của bạn") as HTMLTextAreaElement;
    ta.setSelectionRange(0, 0);
    fireEvent.keyDown(ta, { key: "Tab" });
    expect(ta.value).toBe("    a = 1");
  });
});
