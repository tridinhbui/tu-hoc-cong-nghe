// @vitest-environment jsdom
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

beforeAll(() => {
  // ResponsiveContainer cần kích thước thật; jsdom không có layout.
  class RO {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal("ResizeObserver", RO);
});

const { default: ChartBlock } = await import("@/components/lesson-blocks/ChartBlock");
const { default: FlowBlock } = await import("@/components/lesson-blocks/FlowBlock");

afterEach(() => cleanup());

const wrap = (ui: React.ReactNode) => render(<I18nProvider initialLocale="vi">{ui}</I18nProvider>);

describe("ChartBlock", () => {
  it("series: moving a slider updates the readout at the last x", () => {
    wrap(
      <ChartBlock
        type="chart"
        title="Thời gian tiết kiệm"
        caption="c"
        kind="line"
        xLabel="Tuần"
        yLabel="Phút"
        x={{ from: 1, to: 4, step: 1 }}
        params={[{ id: "rate", label: "Phút mỗi tuần", min: 0, max: 100, step: 5, value: 10, unit: "phút" }]}
        series={[{ label: "Tích luỹ", expr: "x * rate" }]}
      />
    );
    expect(screen.getByTestId("readout-0").textContent).toBe("40");
    fireEvent.change(screen.getByLabelText("Phút mỗi tuần"), { target: { value: "25" } });
    expect(screen.getByTestId("readout-0").textContent).toBe("100");
  });

  it("data: renders an accessible table of the plotted numbers", () => {
    wrap(
      <ChartBlock
        type="chart"
        title="So sánh"
        caption="minh hoạ"
        kind="bar"
        yLabel="Phút"
        data={[
          { label: "Email", values: [20, 8] },
          { label: "Báo cáo", values: [90, 35.5] },
        ]}
        seriesLabels={["Làm tay", "Cùng AI"]}
      />
    );
    const table = screen.getByRole("table");
    expect(table.textContent).toContain("Báo cáo");
    expect(table.textContent).toContain("35,5"); // định dạng số tiếng Việt
    expect(screen.getByText("Số liệu của biểu đồ: So sánh")).toBeTruthy();
  });
});

describe("FlowBlock", () => {
  it("advances and swaps the detail text", () => {
    const onPass = vi.fn();
    wrap(
      <FlowBlock
        type="flow"
        title="Luồng"
        onPass={onPass}
        steps={[
          { label: "A", detail: "chi tiết A" },
          { label: "B", detail: "chi tiết B" },
          { label: "C", detail: "chi tiết C" },
        ]}
      />
    );
    expect(screen.getByTestId("flow-detail").textContent).toBe("chi tiết A");
    fireEvent.click(screen.getByRole("button", { name: /Bước tiếp/ }));
    expect(screen.getByTestId("flow-detail").textContent).toBe("chi tiết B");
    fireEvent.click(screen.getByRole("button", { name: /Bước trước/ }));
    expect(screen.getByTestId("flow-detail").textContent).toBe("chi tiết A");
    fireEvent.keyDown(screen.getByRole("list"), { key: "End" });
    expect(screen.getByTestId("flow-detail").textContent).toBe("chi tiết C");
    expect(onPass).toHaveBeenCalledTimes(1);
  });
});
