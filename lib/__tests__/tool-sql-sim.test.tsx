// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

const { default: SqlSim } = await import("@/components/tools/SqlSim");

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const mount = () =>
  render(
    <I18nProvider initialLocale="vi">
      <SqlSim />
    </I18nProvider>,
  );

const type = (sql: string) => fireEvent.change(screen.getByLabelText("Câu lệnh SQL"), { target: { value: sql } });
const run = () => fireEvent.click(screen.getByRole("button", { name: /^Chạy$/ }));

// Giao diện của SQL Console sau khi engine ghi được dữ liệu: số dòng bị tác động hiện
// rõ, dữ liệu giữ qua lần chạy sau và qua tải lại, và nút khôi phục đưa mọi thứ về mẫu.
describe("SqlSim ghi dữ liệu", () => {
  it("DELETE báo số dòng, dữ liệu giữ cho lần chạy sau, và lưu qua tải lại trang", async () => {
    const first = mount();
    type("DELETE FROM orders WHERE status = 'cancelled'");
    run();
    expect(await screen.findByText(/Đã xoá 2 dòng khỏi orders/)).toBeTruthy();

    type("SELECT COUNT(*) AS n FROM orders");
    run();
    expect((await screen.findAllByText("14")).length).toBeGreaterThan(0);

    first.unmount();
    mount();
    // Cây bảng bên trái đọc số dòng thật của phiên đã lưu, chưa cần chạy gì.
    expect((await screen.findAllByText("14 dòng")).length).toBe(1);
  });

  it("UPDATE không WHERE hiện cảnh báo và nhãn toàn bộ bảng; Khôi phục dữ liệu mẫu hoàn lại", async () => {
    mount();
    type("UPDATE products SET price = 1");
    run();
    expect(await screen.findByText(/Đã sửa 12 dòng của products/)).toBeTruthy();
    expect(screen.getByText("Không có WHERE - toàn bộ bảng")).toBeTruthy();
    expect(screen.getByText(/nó đã chạy thật/)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Khôi phục dữ liệu mẫu" }));
    type("SELECT MAX(price) AS p FROM products");
    run();
    expect((await screen.findAllByText("24490000")).length).toBeGreaterThan(0);
  });

  it("BEGIN hiện nhãn đang trong giao dịch; ROLLBACK hoàn tác và xoá nhãn", async () => {
    mount();
    type("BEGIN; DELETE FROM orders");
    run();
    expect(await screen.findByText("Đang trong giao dịch - chưa COMMIT")).toBeTruthy();
    type("ROLLBACK");
    run();
    expect(await screen.findByText(/ROLLBACK: đã hoàn tác 16 dòng/)).toBeTruthy();
    expect(screen.queryByText("Đang trong giao dịch - chưa COMMIT")).toBeNull();
  });

  it("phiên đã lưu bị hỏng thì bắt đầu lại từ dữ liệu mẫu, tiến độ cũ không bị đụng", async () => {
    window.localStorage.setItem("thtcdn:tool-sql:session", "{không phải json");
    window.localStorage.setItem("thtcdn:tool-sql:done", JSON.stringify(["select-all"]));
    mount();
    type("SELECT COUNT(*) AS n FROM orders");
    run();
    expect((await screen.findAllByText("16")).length).toBeGreaterThan(0);
    expect(JSON.parse(window.localStorage.getItem("thtcdn:tool-sql:done")!)).toContain("select-all");
  });

  it("hoàn thành nhiệm vụ ghi dữ liệu ghi id vào tiến độ cũ (cùng khoá)", async () => {
    mount();
    type("DELETE FROM orders WHERE status = 'cancelled'");
    run();
    await screen.findByText(/Đã xoá 2 dòng khỏi orders/);
    expect(JSON.parse(window.localStorage.getItem("thtcdn:tool-sql:done")!)).toContain("delete-cancelled");
  });
});
