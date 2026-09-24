import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

/**
 * Tầng token màu trong `app/globals.css` hoạt động theo hai lớp:
 *
 *   @theme  --color-ink: var(--ink);      ← Tailwind sinh utility `text-ink`
 *   :root   --ink: <sắc độ sáng>;
 *   .dark   --ink: <sắc độ tối>;
 *
 *  Lớp giữa tồn tại vì token trong `@theme` KHÔNG tự đổi theo `.dark` được.
 *  Nhờ đó `text-ink` tự đúng ở cả hai chế độ, và cặp
 *  `text-stone-900 dark:text-stone-100` gộp lại còn một class.
 *
 *  CHẾ ĐỘ HỎNG mà bộ kiểm này gác: thêm một token vào `@theme` và `:root` rồi
 *  QUÊN khối `.dark`. Không có gì báo lỗi - CSS vẫn biên dịch, giao diện sáng
 *  vẫn đúng, và ở chế độ tối phần tử ấy giữ nguyên màu sáng. Với chữ trên nền
 *  tối thì đó là chữ đen trên nền đen: không ai thấy cho tới khi có người bật
 *  dark mode và chụp màn hình gửi lại.
 */
const css = readFileSync("app/globals.css", "utf8");

/** Lấy tên các biến trung gian mà `@theme` trỏ tới: `--color-x: var(--y)` → y. */
function tokensInTheme(): string[] {
  const theme = css.slice(css.indexOf("@theme"), css.indexOf("\n}", css.indexOf("@theme")));
  return [...theme.matchAll(/--color-[a-z-]+:\s*var\(--([a-z-]+)\)/g)].map((m) => m[1]);
}

/** Các biến được định nghĩa trong một khối chọn tử cụ thể. */
function definedIn(selector: string): Set<string> {
  const start = css.indexOf(`\n${selector} {`);
  if (start === -1) return new Set();
  const block = css.slice(start, css.indexOf("\n}", start));
  return new Set([...block.matchAll(/^\s*--([a-z-]+):/gm)].map((m) => m[1]));
}

describe("token màu theo vai trò", () => {
  const tokens = tokensInTheme();

  it("có token để gác - nếu 0 thì bộ kiểm này vô nghĩa", () => {
    expect(tokens.length).toBeGreaterThan(10);
  });

  it("mọi token đều có giá trị ở chế độ SÁNG", () => {
    const root = definedIn(":root");
    expect(tokens.filter((t) => !root.has(t))).toEqual([]);
  });

  it("mọi token đều có giá trị ở chế độ TỐI", () => {
    // Thiếu ở đây là chữ đen trên nền đen, và không có lỗi nào báo.
    const dark = definedIn(".dark");
    expect(tokens.filter((t) => !dark.has(t))).toEqual([]);
  });

  it("không token nào có cùng giá trị ở hai chế độ", () => {
    // Bằng nhau gần như luôn là chép nhầm dòng: một token màu chữ hay màu nền
    // mà không đổi giữa hai chế độ thì hoặc thừa, hoặc quên sửa.
    const val = (selector: string, name: string) => {
      const start = css.indexOf(`\n${selector} {`);
      const block = css.slice(start, css.indexOf("\n}", start));
      return new RegExp(`--${name}:\\s*([^;]+);`).exec(block)?.[1].trim();
    };
    const trung = tokens.filter((t) => {
      const a = val(":root", t);
      const b = val(".dark", t);
      return a && b && a === b;
    });
    expect(trung).toEqual([]);
  });
});
