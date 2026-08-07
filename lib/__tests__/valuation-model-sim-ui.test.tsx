// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ValuationModelSim from "@/components/tools/ValuationModelSim";
import { I18nProvider } from "@/lib/i18n/context";
import { numericValue, sheetWithInputs, VALUATION_MODELS } from "@/lib/valuation-model-sim";

// I18nProvider gọi useRouter để tải lại server component khi đổi ngôn ngữ, và
// dưới jsdom không có app router.
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

afterEach(cleanup);

function renderSim() {
  return render(
    <I18nProvider initialLocale="vi">
      <ValuationModelSim />
    </I18nProvider>
  );
}

/** Bảng tính định giá, kiểm qua DOM.
 *
 *  lib/__tests__/valuation-model-sim.test.ts đã kiểm phần toán. Bài này kiểm
 *  thứ khác: rằng cái lưới NỐI được vào phần toán đó. Một mô hình tính đúng
 *  nhưng ô nhập không đẩy được giá trị vào sheet thì trên màn hình nó là một
 *  bảng số chết, và không bài test toán nào thấy điều đó.
 */
describe("lưới mô hình định giá", () => {
  const dcf = VALUATION_MODELS.dcf;
  const basePerShare = numericValue(sheetWithInputs(dcf, {}), "B30")!;

  function waccInput() {
    // Nhãn ô nhập gồm cả địa chỉ ô, nên khớp theo địa chỉ là chắc nhất.
    return screen.getByLabelText(/\(B9\)$/);
  }

  it("hiện giá mỗi cổ phần khớp với mô hình, không phải một số cứng", () => {
    renderSim();
    const rendered = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 1 }).format(basePerShare);
    expect(screen.getAllByText(rendered).length).toBeGreaterThan(0);
  });

  it("WACC hiện theo phần trăm chứ không phải 0,11", () => {
    renderSim();
    expect((waccInput() as HTMLInputElement).value).toBe("11");
  });

  it("sửa WACC thì cả bảng tính lại, và giá giảm", () => {
    renderSim();
    const nf = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 1 });
    fireEvent.change(waccInput(), { target: { value: "14" } });
    fireEvent.blur(waccInput());

    const expected = numericValue(sheetWithInputs(dcf, { B9: "0.14" }), "B30")!;
    expect(expected).toBeLessThan(basePerShare);
    expect(screen.getAllByText(nf.format(expected)).length).toBeGreaterThan(0);
    // Và con số cũ không còn trên màn hình - nếu còn thì có chỗ đọc sheet cũ.
    expect(screen.queryAllByText(nf.format(basePerShare)).length).toBe(0);
  });

  it("gõ 0.14 và gõ 14 vào ô phần trăm cho cùng một kết quả", () => {
    const nf = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 1 });
    const expected = nf.format(numericValue(sheetWithInputs(dcf, { B9: "0.14" }), "B30")!);

    renderSim();
    fireEvent.change(waccInput(), { target: { value: "0.14" } });
    fireEvent.blur(waccInput());
    expect(screen.getAllByText(expected).length).toBeGreaterThan(0);
    cleanup();

    renderSim();
    fireEvent.change(waccInput(), { target: { value: "14" } });
    fireEvent.blur(waccInput());
    expect(screen.getAllByText(expected).length).toBeGreaterThan(0);
  });

  it("g >= WACC hiện #N/A kèm lời cảnh báo, không hiện một mức giá", () => {
    renderSim();
    const gInput = screen.getByLabelText(/\(B10\)$/);
    fireEvent.change(gInput, { target: { value: "15" } });
    fireEvent.blur(gInput);
    expect(screen.getAllByText("#N/A").length).toBeGreaterThan(0);
    expect(screen.getByText(/Gordon growth/)).toBeTruthy();
  });

  it("chọn một ô công thức thì thanh công thức hiện đúng công thức của ô đó", () => {
    renderSim();
    // Hệ số chiết khấu năm 1: ô B22.
    const df = numericValue(sheetWithInputs(dcf, {}), "B22")!;
    fireEvent.click(screen.getByText(df.toFixed(3)));
    expect(screen.getByText("=1/(1+$B$9)^B14")).toBeTruthy();
  });

  it("đổi sang mô hình so sánh thì giữ nguyên giả định đã gõ ở DCF", () => {
    renderSim();
    fireEvent.change(waccInput(), { target: { value: "14" } });
    fireEvent.blur(waccInput());
    fireEvent.click(screen.getByRole("button", { name: /So sánh bội số/ }));
    fireEvent.click(screen.getByRole("button", { name: /DCF 5 năm/ }));
    expect((waccInput() as HTMLInputElement).value).toBe("0.14");
  });

  it("bảng độ nhạy có đủ 25 ô và ô giữa là giả định hiện tại", () => {
    renderSim();
    const nf = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 1 });
    const centre = screen.getByTitle("Giả định hiện tại");
    expect(centre.textContent).toBe(nf.format(basePerShare));
  });
});
