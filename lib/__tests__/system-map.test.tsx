// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";
import { computeSystemMap, SYSTEM_NODES } from "@/lib/system-map";
import { TRACK_PERSONAL } from "@/lib/track-stages";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

const { default: SystemMapPanel } = await import("@/components/games/SystemMapPanel");

afterEach(cleanup);

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

// Bản đồ hệ thống ở /game: mỗi node là một chặng của track Nền tảng công nghệ,
// tính từ đúng danh sách lesson_id đã xong mà trang game vốn đọc.
describe("computeSystemMap", () => {
  it("resolves every node to a real stage of the personal track", () => {
    const status = computeSystemMap([]);
    expect(status.nodes).toHaveLength(SYSTEM_NODES.length);
    for (const def of SYSTEM_NODES) {
      expect(TRACK_PERSONAL.stages.some((s) => s.days[0] === def.stageStart)).toBe(true);
    }
    expect(status.online).toBe(0);
    expect(status.next?.key).toBe("shell");
    expect(status.nodes.every((n) => n.state === "offline" && n.total > 0)).toBe(true);
  });

  it("counts extra lesson ids and marks online / booting states", () => {
    // Chặng 1 = 263-268 + 1351-1353. Thiếu 1353 thì chưa online.
    const partial = computeSystemMap([...range(263, 268), 1351, 1352, 201]);
    const shell = partial.nodes.find((n) => n.key === "shell")!;
    expect(shell).toMatchObject({ done: 8, total: 9, state: "booting" });
    expect(partial.nodes.find((n) => n.key === "ui")!.state).toBe("booting");

    const online = computeSystemMap([...range(263, 268), 1351, 1352, 1353]);
    expect(online.nodes.find((n) => n.key === "shell")!.state).toBe("online");
    expect(online.online).toBe(1);
    expect(online.next?.key).toBe("git");
  });

  it("reports SYSTEM ONLINE only when every node is complete", () => {
    const all = TRACK_PERSONAL.stages.flatMap((s) => [...range(s.days[0], s.days[1]), ...(s.extraLessonIds ?? [])]);
    const status = computeSystemMap(all);
    expect(status.allOnline).toBe(true);
    expect(status.next).toBeNull();
    expect(status.lessonsDone).toBe(status.lessonsTotal);
  });
});

describe("SystemMapPanel", () => {
  it("shows the next node, its remaining lessons and the continue action", () => {
    render(
      <I18nProvider initialLocale="vi">
        <SystemMapPanel status={computeSystemMap(range(263, 268))} ready={false} onOpenIncident={() => {}} />
      </I18nProvider>,
    );
    expect(screen.getByText("0/9 node online")).toBeTruthy();
    expect(screen.getAllByText("Dòng lệnh & hệ điều hành").length).toBeGreaterThan(0);
    expect(screen.getByText("còn 3 bài để kết nối")).toBeTruthy();
    expect(screen.getByRole("link", { name: /Học tiếp để kết nối/ }).getAttribute("href")).toBe("/hoc-bai");
    expect(document.querySelector('[data-node="shell"]')?.getAttribute("data-state")).toBe("booting");
  });

  it("switches to SYSTEM ONLINE and the incident action when everything is up", () => {
    const all = TRACK_PERSONAL.stages.flatMap((s) => [...range(s.days[0], s.days[1]), ...(s.extraLessonIds ?? [])]);
    const onOpen = vi.fn();
    render(
      <I18nProvider initialLocale="vi">
        <SystemMapPanel status={computeSystemMap(all)} ready={false} onOpenIncident={onOpen} />
      </I18nProvider>,
    );
    expect(screen.getAllByText("SYSTEM ONLINE").length).toBeGreaterThan(0);
    expect(screen.getByText("UI online")).toBeTruthy();
    expect(screen.getByText("Backend đã kết nối")).toBeTruthy();
    screen.getByRole("button", { name: /Mở Trung tâm sự cố/ }).click();
    expect(onOpen).toHaveBeenCalled();
  });
});
