// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_INIT_SCRIPT,
  readLocaleCookie,
} from "@/lib/i18n/locales";

/** Script đặt `lang` trước khi trang vẽ lần đầu.
 *
 *  Từ khi root layout thôi đọc cookie (để mọi route có cơ hội nằm trên CDN),
 *  HTML đầu tiên không còn biết ngôn ngữ của người đọc. Script này là thứ duy
 *  nhất còn đặt đúng thuộc tính `lang` - và nó là một CHUỖI, nên không có gì
 *  trong tsc hay eslint nhìn thấy được khi nó hỏng.
 *
 *  Nó đã hỏng thật một lần trong lúc viết: regex bị thoát thừa một lớp gạch
 *  chéo, thành `\\s` (gạch chéo rồi chữ s) thay vì `\s` (khoảng trắng), nên
 *  cookie đứng sau dấu chấm phẩy không bao giờ khớp. Trang vẫn chạy, vẫn dựng,
 *  vẫn xanh mọi cổng - chỉ có `lang` là sai mãi với người đọc tiếng Anh. */

function run(cookie: string, startingLang = DEFAULT_LOCALE) {
  document.documentElement.lang = startingLang;
  // Xoá mọi cookie cũ giữa các ca.
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0]?.trim();
    if (name) document.cookie = `${name}=; max-age=0; path=/`;
  }
  if (cookie) document.cookie = cookie;
  new Function(LOCALE_INIT_SCRIPT)();
  return document.documentElement.lang;
}

describe("LOCALE_INIT_SCRIPT", () => {
  it("đặt lang=en khi cookie là en", () => {
    expect(run(`${LOCALE_COOKIE}=en`)).toBe("en");
  });

  it("khớp cả khi cookie đứng sau cookie khác", () => {
    // Đây chính là ca mà lỗi thoát gạch chéo làm hỏng: có khoảng trắng sau
    // dấu chấm phẩy do trình duyệt nối chuỗi cookie.
    document.cookie = "other=1";
    expect(run(`${LOCALE_COOKIE}=en`, "vi")).toBe("en");
  });

  it("giữ nguyên khi không có cookie", () => {
    expect(run("")).toBe(DEFAULT_LOCALE);
  });

  it("bỏ qua giá trị rác thay vì đặt bừa", () => {
    expect(run(`${LOCALE_COOKIE}=xx`)).toBe(DEFAULT_LOCALE);
  });
});

describe("readLocaleCookie", () => {
  it("đọc ra cùng kết quả với script", () => {
    run(`${LOCALE_COOKIE}=en`);
    expect(readLocaleCookie()).toBe("en");
  });

  it("giá trị rác trả về ngôn ngữ mặc định", () => {
    run(`${LOCALE_COOKIE}=xx`);
    expect(readLocaleCookie()).toBe(DEFAULT_LOCALE);
  });
});
