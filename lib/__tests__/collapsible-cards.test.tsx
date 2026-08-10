// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n/context";
import NotesShortcutCard from "@/components/NotesShortcutCard";

/** Hai thẻ trên /hoc-bai gấp/mở được, và hai chỗ dễ hỏng khi làm việc đó.
 *
 *  1. NÚT GẤP KHÔNG ĐƯỢC ĐIỀU HƯỚNG. Thẻ sổ tay trước đây là một <Link> bao
 *     trọn thẻ. Cách hiển nhiên để thêm nút gấp là nhét một <button> vào trong
 *     đó, và nó hỏng theo kiểu im lặng nhất có thể: HTML không hợp lệ (nút lồng
 *     trong liên kết), giao diện trông đúng, nhưng mỗi cú bấm "thu gọn" lại
 *     nhảy sang /ghi-chu. Bài này giữ cho cách dựng thay thế - liên kết là lớp
 *     phủ, nút nằm lớp trên - không lặng lẽ quay về hình cũ.
 *
 *  2. VÙNG BẤM CỦA THẺ PHẢI CÒN. Sửa lỗi số 1 bằng cách bỏ luôn lớp phủ thì
 *     nút chạy đúng, còn cả thẻ hết bấm được - mà "cả thẻ là một liên kết" là
 *     một quyết định có chủ ý, xem chú thích trong NotesShortcutCard.tsx.
 *
 *  Trạng thái gấp nhớ qua localStorage nên phép đọc phải nằm trong effect, chứ
 *  không phải trong useState initializer (máy chủ không có localStorage). Bài
 *  cuối kiểm đúng điều đó qua hành vi thấy được: gấp, gắn lại, vẫn gấp. */

// I18nProvider gọi useRouter() để đồng bộ cookie ngôn ngữ - cùng lý do và cùng
// cách xử lý với lib/__tests__/highlight-notebook.test.tsx.
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

// next/link thật kéo theo router của Next; ở đây chỉ cần biết cái <a> có tồn
// tại và trỏ đi đâu.
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children?: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

function renderCard() {
  return render(
    <I18nProvider initialLocale="vi">
      <NotesShortcutCard />
    </I18nProvider>
  );
}

const toggle = () => screen.getByRole("button");

beforeEach(() => window.localStorage.clear());
afterEach(cleanup);

describe("thẻ sổ tay gấp/mở được", () => {
  it("mặc định là mở", () => {
    renderCard();
    expect(toggle().getAttribute("aria-expanded")).toBe("true");
  });

  it("bấm nút thì gấp lại, bấm lần nữa thì mở ra", () => {
    renderCard();
    fireEvent.click(toggle());
    expect(toggle().getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(toggle());
    expect(toggle().getAttribute("aria-expanded")).toBe("true");
  });

  it("nút gấp KHÔNG nằm trong thẻ liên kết - bấm nó không được điều hướng", () => {
    renderCard();
    expect(toggle().closest("a")).toBeNull();
  });

  it("cả thẻ vẫn là một liên kết sang /ghi-chu", () => {
    const { container } = renderCard();
    const link = container.querySelector("a");
    expect(link?.getAttribute("href")).toBe("/ghi-chu");
  });

  it("nhớ trạng thái đã gấp sau khi gắn lại", () => {
    renderCard();
    fireEvent.click(toggle());
    expect(toggle().getAttribute("aria-expanded")).toBe("false");

    cleanup();
    renderCard();
    expect(toggle().getAttribute("aria-expanded")).toBe("false");
  });

  it("phần đã gấp bị đánh `inert` - không tab vào được, không bị đọc lên", () => {
    const { container } = renderCard();
    // Mở thì không có vùng nào bị chặn...
    expect(container.querySelectorAll("[inert]").length).toBe(0);

    // ...gấp thì cả hai vùng ẩn đều bị chặn. Nội dung vẫn nằm trong DOM (điều
    // kiện để hiệu ứng 0fr→1fr chạy được), nên không có `inert` thì phím Tab
    // vẫn nhảy vào phần vừa thu gọn.
    fireEvent.click(toggle());
    expect(container.querySelectorAll("[inert]").length).toBe(2);
  });

  it("lối vào /ghi-chu vẫn bấm được KHI ĐANG GẤP - lớp phủ nằm ngoài vùng inert", () => {
    const { container } = renderCard();
    fireEvent.click(toggle());
    const link = container.querySelector("a");
    expect(link?.getAttribute("href")).toBe("/ghi-chu");
    expect(link?.closest("[inert]")).toBeNull();
  });

  it("localStorage hỏng thì thẻ vẫn gấp mở được, chỉ là không nhớ", () => {
    const setItem = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("quota");
      });
    try {
      renderCard();
      expect(() => fireEvent.click(toggle())).not.toThrow();
      expect(toggle().getAttribute("aria-expanded")).toBe("false");
    } finally {
      setItem.mockRestore();
    }
  });
});
