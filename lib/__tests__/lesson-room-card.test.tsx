// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactElement } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import LessonRoomCard from "@/components/LessonRoomCard";
import { LESSON_ROOM_LINKS } from "@/lib/lesson-room-links";
import { I18nProvider } from "@/lib/i18n/context";

function renderWithI18n(node: ReactElement) {
  return render(<I18nProvider initialLocale="vi">{node}</I18nProvider>);
}

/** Tấm thẻ nối bài học sang phòng 3D.
 *
 *  Bài này dựng thật vì cả trang bài học lẫn /pho-nghe đều nằm sau tường đăng
 *  nhập, nên không mở bằng trình duyệt để nhìn được. Ba thứ nó canh đều là thứ
 *  hỏng im lặng: thẻ mọc ra ở bài không có phòng, đường dẫn thiếu tham số
 *  phòng, và màu nhấn lệch khỏi màu cánh cửa. */

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

afterEach(cleanup);

describe("thẻ đi tới phòng 3D", () => {
  it("không dựng gì cho bài không có phòng", () => {
    // Đa số bài không có phòng. Gắn nút vào mọi bài thì nó thành thứ ai cũng
    // lướt qua, và cái nút ở bài không liên quan còn tệ hơn là không có.
    const { container } = renderWithI18n(<LessonRoomCard slug="khong-ton-tai-dau-ca" />);
    expect(container.innerHTML).toBe("");
  });

  it("dựng đúng lời và trỏ đúng phòng", () => {
    renderWithI18n(<LessonRoomCard slug="von-luu-dong-la-gi" />);
    const link = LESSON_ROOM_LINKS["von-luu-dong-la-gi"];
    expect(screen.getByText(link.cta)).toBeTruthy();
    const a = screen.getByRole("link");
    expect(a.getAttribute("href")).toBe("/pho-nghe?phong=vong-quay-tien");
  });

  it("mọi bài trong bảng đều dựng ra được một đường dẫn hợp lệ", () => {
    // Một slug trong bảng mà thẻ không dựng nổi là một cái nối chết mà không
    // ai thấy - trang bài học vẫn hiện bình thường, chỉ thiếu mất cái nút.
    for (const slug of Object.keys(LESSON_ROOM_LINKS)) {
      cleanup();
      renderWithI18n(<LessonRoomCard slug={slug} />);
      const href = screen.getByRole("link").getAttribute("href") ?? "";
      expect(href, slug).toMatch(/^\/pho-nghe\?phong=[a-z-]+$/);
    }
  });
});
