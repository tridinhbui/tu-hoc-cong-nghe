// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

const { default: ToolShell } = await import("@/components/tools/ToolShell");
const { default: CongCuClient } = await import("@/components/tools/CongCuClient");
import type { ToolMissionView } from "@/components/tools/ToolShell";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const missions = (doneA: boolean, criteriaMet = false): ToolMissionView[] => [
  {
    id: "a",
    title: "10 khách hàng tạo doanh thu cao nhất",
    from: "CEO",
    brief: "CEO muốn biết 10 khách hàng tạo doanh thu cao nhất.",
    hint: "GỢI Ý BÍ MẬT",
    done: doneA,
    criteria: [
      { id: "runs", label: "Câu lệnh chạy không lỗi", met: true },
      { id: "match", label: "Tên + doanh thu, xếp giảm dần", met: criteriaMet },
    ],
  },
  { id: "b", title: "Ticket thứ hai", hint: "gợi ý b", done: false },
];

function Shell({ list, ready = true }: { list: ToolMissionView[]; ready?: boolean }) {
  return (
    <I18nProvider initialLocale="vi">
      <ToolShell tool="sql" missions={list} ready={ready} renderArtifact={(id) => <p>ARTIFACT-{id}</p>}>
        <div>workspace</div>
      </ToolShell>
    </I18nProvider>
  );
}

// Khung ticket: đề bài và tiêu chí hiện ngay, gợi ý giấu sau nút, và lúc ticket
// đang mở vừa đạt thì giữ nó lại để người học thấy kết quả bàn giao.
describe("ToolShell", () => {
  it("shows the open ticket with its criteria and hides the hint behind a button", () => {
    render(<Shell list={missions(false)} />);
    expect(screen.getByRole("heading", { name: "10 khách hàng tạo doanh thu cao nhất" })).toBeTruthy();
    expect(screen.getByText("CEO")).toBeTruthy();
    expect(screen.getByText("Tên + doanh thu, xếp giảm dần")).toBeTruthy();
    expect(screen.queryByText("ARTIFACT-a")).toBeNull();

    const hint = screen.getByRole("button", { name: /Gợi ý/ });
    expect(hint.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(hint);
    expect(screen.getByRole("button", { name: /Ẩn gợi ý/ }).getAttribute("aria-expanded")).toBe("true");
  });

  it("pins a ticket that was just closed and shows the deliverable plus a next-ticket button", () => {
    const { rerender } = render(<Shell list={missions(false)} />);
    rerender(<Shell list={missions(true, true)} />);
    expect(screen.getByRole("heading", { name: "10 khách hàng tạo doanh thu cao nhất" })).toBeTruthy();
    expect(screen.getByText("ARTIFACT-a")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Ticket tiếp theo/ }));
    expect(screen.getByRole("heading", { name: "Ticket thứ hai" })).toBeTruthy();
  });

  it("does not treat progress restored from storage as a fresh completion", () => {
    const { rerender } = render(<Shell list={missions(false)} ready={false} />);
    rerender(<Shell list={missions(true, true)} ready />);
    // Ticket 1 đã xong từ trước: mở thẳng ticket kế tiếp.
    expect(screen.getByRole("heading", { name: "Ticket thứ hai" })).toBeTruthy();
  });
});

describe("CongCuClient", () => {
  it("reads per-tool progress from localStorage", () => {
    window.localStorage.setItem("thtcdn:tool-sql:done", JSON.stringify(["select-all", "where-city"]));
    window.localStorage.setItem("thtcdn:tool-api:state", JSON.stringify({ done: ["firstGet"] }));
    render(
      <I18nProvider initialLocale="vi">
        <CongCuClient />
      </I18nProvider>
    );
    expect(screen.getByText("2/28 ticket")).toBeTruthy();
    expect(screen.getByText("1/18 ticket")).toBeTruthy();
    expect(screen.getByText("3/111 ticket đã đóng")).toBeTruthy();
  });
});
