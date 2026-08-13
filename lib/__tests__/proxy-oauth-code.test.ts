import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import path from "path";

/** Mã OAuth rơi xuống trang chủ thì phải được chuyển tiếp sang /auth/callback.
 *
 *  Supabase chỉ dùng `redirect_to` khi URL ấy khớp danh sách Redirect URLs của
 *  dự án. Không khớp thì nó rơi về "Site URL" - trang chủ - và gắn `?code=` vào
 *  đó, không báo lỗi gì. Người dùng đứng ở `/?code=<uuid>` và chưa đăng nhập.
 *
 *  Bộ kiểm đọc mã nguồn chứ không gọi hàm: `proxy.ts` chạy `setInterval` ở tầng
 *  module và import `next/server`, nên nạp nó vào vitest kéo theo một bộ hẹn
 *  giờ sống mãi và một nửa runtime của Next. Thứ đáng gác ở đây là THỨ TỰ, và
 *  thứ tự đọc được từ nguồn.
 *
 *  THỨ TỰ MỚI LÀ PHẦN DỄ HỎNG. Nhánh này phải đứng TRƯỚC phép kiểm cookie
 *  phiên: người vừa đăng nhập bằng Google chưa có cookie nào cả - đó là điều
 *  họ đang cố lấy - nên nếu nhánh cookie chạy trước, request sẽ rơi vào lối
 *  "khách chưa đăng nhập", trang chủ dựng ra bình thường, và mã không bao giờ
 *  được đổi lấy phiên. Đúng cái lỗi ban đầu, chỉ khác là lần này do mình tự
 *  dựng lại. */

const source = readFileSync(path.join(process.cwd(), "proxy.ts"), "utf8");

describe("mã OAuth rơi xuống trang chủ", () => {
  it("proxy có nhánh chuyển tiếp sang /auth/callback", () => {
    expect(source).toMatch(/pathname === "\/"[\s\S]{0,80}searchParams\.has\("code"\)/);
    expect(source).toContain('new URL("/auth/callback", request.url)');
  });

  it("giữ nguyên query để `code` và `next` cùng đi tiếp", () => {
    // Dựng lại URL mà bỏ query là đổi một lần đăng nhập hỏng thành một lần
    // đăng nhập hỏng theo kiểu khác: callback không có mã thì đá thẳng /login.
    expect(source).toMatch(/callback\.search = request\.nextUrl\.search/);
  });

  it("đứng TRƯỚC phép kiểm cookie phiên", () => {
    const codeBranch = source.indexOf('searchParams.has("code")');
    const cookieBranch = source.indexOf("hasSupabaseAuthCookie(");
    expect(codeBranch, "không tìm thấy nhánh mã OAuth").toBeGreaterThan(-1);
    expect(cookieBranch, "không tìm thấy nhánh cookie phiên").toBeGreaterThan(-1);
    expect(
      codeBranch,
      "người vừa đăng nhập chưa có cookie phiên, nên nhánh cookie chạy trước sẽ nuốt mất mã"
    ).toBeLessThan(cookieBranch);
  });

  it("chỉ nhận ở trang chủ, không phải mọi đường dẫn có ?code=", () => {
    // Trang chủ là nơi DUY NHẤT Supabase rơi về. Bắt rộng hơn là nhận cả những
    // trang có tham số `code` mang nghĩa khác.
    expect(source).toMatch(/pathname === "\/" && request\.nextUrl\.searchParams\.has\("code"\)/);
  });
});
