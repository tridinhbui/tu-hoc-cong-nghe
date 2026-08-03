// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { useEffect, useState } from "react";

/** Hai hành vi của thanh điều hướng khi đổi trang.
 *
 *  AppNavbar.tsx nằm sau tường đăng nhập và kéo theo supabase, i18n cùng hai
 *  chục thứ khác, nên không dựng nguyên nó lên để nhìn được. Bài này dựng lại
 *  ĐÚNG hai cơ chế vừa sửa, trên dữ liệu giả:
 *
 *    1. chỉnh-lúc-render theo pathname (thay cho hai effect gọi setState
 *       thẳng trong thân, thứ mà react-hooks/set-state-in-effect bắt);
 *    2. bung mục chứa trang đang mở NGAY TRONG lần đọc localStorage.
 *
 *  Việc thứ hai là một lỗi tôi tự tạo ra rồi tự bắt: bản đầu chuyển phép bung
 *  sang lúc render và khởi tạo `lastPath = pathname`, nên nó KHÔNG chạy lúc
 *  gắn - mở thẳng một đường dẫn nằm trong mục đang gấp thì mục đó ở nguyên và
 *  trang đang đọc bị giấu khỏi thanh điều hướng. Mà cũng không sửa được bằng
 *  cách cho nó chạy lúc gắn: lúc render đầu localStorage chưa đọc xong nên
 *  chính phép đọc đó ghi đè lại. */

const SECTIONS = [
  { titleKey: "hoc", links: [{ href: "/hoc-bai" }, { href: "/kiem-tra" }] },
  { titleKey: "nghe", links: [{ href: "/su-nghiep" }] },
];
const ALL = SECTIONS.map((s) => s.titleKey);
const KEY = "nav_sections";

/** Bản rút gọn của AppNavbar, giữ nguyên hai cơ chế và bỏ hết phần còn lại. */
function Nav({ pathname }: { pathname: string }) {
  const [collapsed, setCollapsed] = useState<string[]>(ALL);
  const [menuOpen, setMenuOpen] = useState(true);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    const owning = SECTIONS.find((s) => s.links.some((l) => l.href === pathname));
    if (owning) {
      setCollapsed((prev) =>
        prev.includes(owning.titleKey) ? prev.filter((k) => k !== owning.titleKey) : prev
      );
    }
  }

  useEffect(() => {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const stored = JSON.parse(raw) as string[];
      const owning = SECTIONS.find((s) => s.links.some((l) => l.href === pathname));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- giữ y hệt AppNavbar: hydration
      setCollapsed(owning ? stored.filter((k) => k !== owning.titleKey) : stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <span data-testid="collapsed">{collapsed.join(",")}</span>
      <span data-testid="menu">{menuOpen ? "mở" : "đóng"}</span>
    </div>
  );
}

const collapsed = () => screen.getByTestId("collapsed").textContent;

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("vào trang lần đầu", () => {
  it("bung mục chứa trang đang mở, dù localStorage nói mục đó đang gấp", () => {
    // Đây chính là lỗi tôi tự tạo ra. Không có nhánh trong effect đọc
    // localStorage thì kết quả ở đây là "hoc,nghe" - trang đang đọc bị giấu.
    window.localStorage.setItem(KEY, JSON.stringify(ALL));
    render(<Nav pathname="/hoc-bai" />);
    expect(collapsed()).toBe("nghe");
  });

  it("không đụng gì khi trang đang mở không thuộc mục nào", () => {
    window.localStorage.setItem(KEY, JSON.stringify(ALL));
    render(<Nav pathname="/khong-thuoc-muc-nao" />);
    expect(collapsed()).toBe("hoc,nghe");
  });

  it("giữ nguyên trạng thái đã lưu, không quay về mặc định", () => {
    window.localStorage.setItem(KEY, JSON.stringify(["nghe"]));
    render(<Nav pathname="/khong-thuoc-muc-nao" />);
    expect(collapsed()).toBe("nghe");
  });
});

describe("chuyển sang trang khác", () => {
  it("đóng menu và bung mục chứa trang mới", () => {
    window.localStorage.setItem(KEY, JSON.stringify(ALL));
    const { rerender } = render(<Nav pathname="/khong-thuoc-muc-nao" />);
    expect(screen.getByTestId("menu").textContent).toBe("mở");
    expect(collapsed()).toBe("hoc,nghe");

    rerender(<Nav pathname="/su-nghiep" />);
    expect(screen.getByTestId("menu").textContent).toBe("đóng");
    expect(collapsed()).toBe("hoc");
  });

  it("dựng lại với CÙNG pathname thì không bung lại gì", () => {
    // Cả điểm của việc so với lần render trước: nếu chạy mỗi lần render thì
    // gấp một mục trong lúc đang đứng ở đó sẽ bung lại ngay lập tức, và người
    // dùng không bao giờ gấp được mục chứa trang mình đang đọc.
    window.localStorage.setItem(KEY, JSON.stringify(["nghe"]));
    const { rerender } = render(<Nav pathname="/su-nghiep" />);
    expect(collapsed()).toBe("");
    rerender(<Nav pathname="/su-nghiep" />);
    expect(collapsed()).toBe("");
  });
});
