// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }), usePathname: () => "/bai-hoc/x" }));

const { default: SimBlock } = await import("@/components/lesson-blocks/SimBlock");

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

function mount(tool: "terminal" | "sql", mission: string, onPass: () => void) {
  return render(
    <I18nProvider initialLocale="vi">
      <SimBlock type="sim" tool={tool} mission={mission} title="Tiêu đề khối" task="Việc cần làm" onPass={onPass} />
    </I18nProvider>
  );
}

// Khối `sim` nhúng một nhiệm vụ của công cụ /cong-cu: chấm bằng chính `check`
// của nhiệm vụ, báo onPass đúng một lần, và không đụng tiến độ của trang công cụ.
describe("SimBlock", () => {
  it("terminal: gõ pwd thì đạt, onPass gọi đúng một lần kể cả sau Làm lại", async () => {
    const onPass = vi.fn();
    mount("terminal", "pwd", onPass);
    const input = await screen.findByLabelText("Dòng lệnh");
    expect(screen.getByText("Tiêu đề khối")).toBeTruthy();
    expect(screen.queryByText("Đạt!")).toBeNull();

    fireEvent.change(input, { target: { value: "pwd" } });
    fireEvent.keyDown(input, { key: "Enter" });
    await screen.findByText("Đạt!");
    expect(onPass).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: /Làm lại/ }));
    await waitFor(() => expect(screen.queryByText("Đạt!")).toBeNull());
    fireEvent.change(input, { target: { value: "pwd" } });
    fireEvent.keyDown(input, { key: "Enter" });
    await screen.findByText("Đạt!");
    expect(onPass).toHaveBeenCalledTimes(1);
    // bản nhúng không ghi đè tiến độ của /cong-cu/terminal
    expect(window.localStorage.length).toBe(0);
  });

  it("sql: câu sai chưa đạt, câu đúng thì đạt và onPass gọi một lần", async () => {
    const onPass = vi.fn();
    const { container } = mount("sql", "where-city", onPass);
    await screen.findByRole("button", { name: /Chạy/ });
    const editor = container.querySelector<HTMLTextAreaElement>("#sql-editor")!;

    fireEvent.change(editor, { target: { value: "SELECT name FROM customers" } });
    fireEvent.click(screen.getByRole("button", { name: /Chạy/ }));
    await waitFor(() => expect(container.querySelector('li[data-met="true"]')).toBeTruthy());
    expect(screen.queryByText("Đạt!")).toBeNull();
    expect(onPass).not.toHaveBeenCalled();

    fireEvent.change(editor, { target: { value: "SELECT name FROM customers WHERE city = 'Hà Nội'" } });
    fireEvent.click(screen.getByRole("button", { name: /Chạy/ }));
    await screen.findByText("Đạt!");
    fireEvent.click(screen.getByRole("button", { name: /Chạy/ }));
    expect(onPass).toHaveBeenCalledTimes(1);
  });

  it("nhiệm vụ không có thì báo, không vỡ", async () => {
    mount("terminal", "khong-co", vi.fn());
    await screen.findByText("Không tìm thấy nhiệm vụ này trong công cụ.");
  });
});
