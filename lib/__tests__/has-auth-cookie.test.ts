import { describe, expect, it } from "vitest";
import { hasSupabaseAuthCookie } from "@/lib/has-auth-cookie";

/** Phép đoán này quyết định proxy có gọi Supabase hay không, nên nó phải sai
 *  về đúng một phía: thừa một lần gọi thì chỉ tốn tiền, thiếu một lần gọi thì
 *  một người đang đăng nhập bị đá về /login. */

describe("nhận ra cookie phiên Supabase", () => {
  it("cookie chuẩn của @supabase/ssr", () => {
    expect(hasSupabaseAuthCookie(["sb-abcdefgh-auth-token"])).toBe(true);
  });

  it("cookie bị tách khi phiên dài quá một cookie", () => {
    // Phiên dài thì thư viện tách thành `.0`, `.1` - và khi đó KHÔNG còn
    // cookie nào mang đúng tên gốc, nên khớp chính xác sẽ trượt.
    expect(hasSupabaseAuthCookie(["sb-abcdefgh-auth-token.0", "sb-abcdefgh-auth-token.1"])).toBe(true);
  });

  it("lẫn giữa các cookie khác vẫn nhận ra", () => {
    expect(hasSupabaseAuthCookie(["theme", "locale", "sb-xyz-auth-token", "_vercel_jwt"])).toBe(true);
  });

  it("bất kỳ project ref nào cũng khớp", () => {
    // Không cố đoán ref: đổi dự án Supabase không được làm mọi người bị đăng
    // xuất một cách im lặng.
    for (const ref of ["a", "zzzzzzzzzzzzzzzzzzzz", "proj-123"]) {
      expect(hasSupabaseAuthCookie([`sb-${ref}-auth-token`])).toBe(true);
    }
  });
});

describe("không có phiên nào", () => {
  it("hoàn toàn không có cookie", () => {
    expect(hasSupabaseAuthCookie([])).toBe(false);
  });

  it("chỉ có cookie không liên quan tới đăng nhập", () => {
    // Đây là hình dạng của một con bot hay một khách lần đầu vào trang chủ -
    // đúng nhóm request mà phép đoán này sinh ra để khỏi phải hỏi Supabase.
    expect(hasSupabaseAuthCookie(["theme", "locale", "NEXT_LOCALE"])).toBe(false);
  });

  it("tên chứa 'sb-' ở giữa thì không tính", () => {
    expect(hasSupabaseAuthCookie(["my-sb-token", "xsb-auth"])).toBe(false);
  });
});
