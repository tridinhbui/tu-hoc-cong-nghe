// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactElement } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import RoomDirectory, { PLACE_ICONS, directoryGroups } from "@/components/career-district/RoomDirectory";
import { civicRoomsOf, getRoom as getRoomOf } from "@/components/career-district/district-space";
import { CAREER_CATEGORY_ORDER } from "@/lib/career-categories";
import { vi as viDict } from "@/lib/i18n/dictionaries/vi";
import { I18nProvider } from "@/lib/i18n/context";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

const CIVIC_ROOMS = civicRoomsOf(viDict);
const getRoom = (id: Parameters<typeof getRoomOf>[1]) => getRoomOf(viDict, id);

function renderWithI18n(node: ReactElement) {
  return render(<I18nProvider initialLocale="vi">{node}</I18nProvider>);
}

/** Mục lục con phố.
 *
 *  Bài này dựng thật vì bảng nằm trong DistrictWorld - 900 dòng sau tường đăng
 *  nhập - nên không mở bằng trình duyệt để nhìn được. Thứ nó canh là cách chia
 *  nhóm: một căn phòng dạy rơi nhầm xuống nhóm dưới thì chìm nghỉm giữa cửa
 *  hàng và căn hộ, mà không có gì báo vì cả hai nhóm đều hợp lệ. */

afterEach(cleanup);

describe("chia nhóm", () => {
  it("mọi cửa trên phố đều xuất hiện đúng một lần", () => {
    // Chia nhóm bằng filter thì một cửa có thể lọt cả hai nhóm hoặc không nhóm
    // nào, và cả hai đều trông bình thường trên màn hình.
    const shown = directoryGroups(viDict).flatMap((g) => g.doors.map((d) => d.to as string));
    const expected = getRoom("street")
      .doorways.map((d) => d.to as string)
      .filter((t) => t !== "street" && !CAREER_CATEGORY_ORDER.includes(t as never));
    expect([...shown].sort()).toEqual([...expected].sort());
    expect(new Set(shown).size).toBe(shown.length);
  });

  it("nhóm Phòng học đúng bằng các phòng mang cờ teaching", () => {
    const teaching = CIVIC_ROOMS.filter((c) => c.teaching).map((c) => c.id as string).sort();
    const group = directoryGroups(viDict).find((g) => g.title === "Phòng học")!;
    expect(group.doors.map((d) => d.to as string).sort()).toEqual(teaching);
  });

  it("Phòng học đứng TRƯỚC Nơi khác", () => {
    // Thứ tự là cả điểm của việc chia nhóm: sáu căn đáng vào nhất phải nằm
    // trên, không phải nằm sau mười một dòng tiện ích.
    expect(directoryGroups(viDict).map((g) => g.title)).toEqual(["Phòng học", "Nơi khác"]);
  });

  it("không nhóm nào rỗng", () => {
    for (const g of directoryGroups(viDict)) expect(g.doors.length, g.title).toBeGreaterThan(0);
  });
});

describe("dựng ra màn hình", () => {
  it("hiện đủ ba nhãn nhóm", () => {
    renderWithI18n(<RoomDirectory open onGo={() => {}} />);
    for (const t of ["Phòng học", "Nơi khác", "Nhóm ngành"]) {
      expect(screen.getByText(t), t).toBeTruthy();
    }
  });

  it("mỗi phòng dạy hiện đúng ký hiệu của nó, không phải ô vuông mặc định", () => {
    // Đây là lỗi đã có thật: PLACE_ICONS thiếu cả sáu phòng dạy nên chúng đều
    // rơi về "■", tức sáu thứ đáng vào nhất là sáu dòng mờ nhạt nhất.
    renderWithI18n(<RoomDirectory open onGo={() => {}} />);
    for (const c of CIVIC_ROOMS.filter((x) => x.teaching)) {
      const row = screen.getByText(new RegExp(c.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      expect(row.textContent, c.id).toContain(PLACE_ICONS[c.id as string]);
      expect(row.textContent, `${c.id} vẫn dùng ô vuông mặc định`).not.toContain("■");
    }
  });

  it("bấm một dòng thì gọi đúng cánh cửa của phòng đó", () => {
    const go = vi.fn();
    renderWithI18n(<RoomDirectory open onGo={go} />);
    fireEvent.click(screen.getByText(/Phòng Vòng Quay Tiền/));
    expect(go).toHaveBeenCalledTimes(1);
    expect(go.mock.calls[0][0].to).toBe("vong-quay-tien");
  });

  it("ghim thì vẫn hiện ở màn rộng dù cờ đóng", () => {
    // Ngoài phố: `hidden sm:block` chứ không phải gỡ khỏi cây, vì gỡ hẳn thì
    // người dùng màn rộng cũng mất bảng.
    const { container } = renderWithI18n(<RoomDirectory open={false} pinned onGo={() => {}} />);
    const panel = container.firstElementChild as HTMLElement;
    expect(panel.className).toContain("hidden");
    expect(panel.className).toContain("sm:block");
  });

  it("không ghim thì đóng là ẩn ở MỌI cỡ màn", () => {
    // Trong phòng: ghim luôn nghĩa là một tấm bảng che góc phải suốt lúc đang
    // đọc ba báo cáo. Nếu `sm:block` sót lại ở đây thì bảng không bao giờ đóng
    // được trên máy tính bàn - và triệu chứng là "nút la bàn không ăn".
    const { container } = renderWithI18n(<RoomDirectory open={false} onGo={() => {}} />);
    const panel = container.firstElementChild as HTMLElement;
    expect(panel.className).toContain("hidden");
    expect(panel.className).not.toContain("sm:block");
  });

  it("đánh dấu đúng một dòng là phòng đang đứng", () => {
    // Không dòng nào nói "bạn đang ở đây" thì danh sách 22 dòng vẫn bắt người
    // ta ngước lên đọc lại tên phòng ở góc trên để định vị.
    renderWithI18n(<RoomDirectory open current="vong-quay-tien" onGo={() => {}} />);
    const marks = screen.getAllByText(/đang ở đây/);
    expect(marks).toHaveLength(1);
    expect(marks[0].parentElement?.textContent).toContain("Phòng Vòng Quay Tiền");
  });

  it("ở ngoài phố thì không dòng nào bị đánh dấu", () => {
    // "street" không nằm trong danh sách, nên không được có dấu nào lạc chỗ.
    renderWithI18n(<RoomDirectory open current="street" onGo={() => {}} />);
    expect(screen.queryByText(/đang ở đây/)).toBeNull();
  });
});
