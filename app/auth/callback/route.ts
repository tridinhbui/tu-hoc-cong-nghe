import { NextRequest, NextResponse } from "next/server";
import { safeNextPath } from "@/lib/safe-next-path";
import { OAUTH_NEXT_COOKIE, clearOAuthNextCookie } from "@/lib/oauth-next-cookie";

/** Đích đến sau đăng nhập.
 *
 *  COOKIE TRƯỚC, query sau. `redirectTo` của luồng Google không còn mang query
 *  - nó phải khớp chính xác danh sách Redirect URLs của dịch vụ xác thực cũ, xem
 *  lib/oauth-next-cookie.ts - nên `next` đi bằng cookie.
 *
 *  Vẫn đọc `?next=` làm đường lui: nhánh lỗi ngay bên dưới tự gắn tham số đó
 *  khi đá người dùng về /login, và một liên kết callback cũ còn nằm đâu đó vẫn
 *  phải đi đúng chỗ thay vì im lặng đổ về /dashboard.
 *
 *  `safeNextPath` chạy trên bất kỳ nguồn nào trong hai: cả cookie lẫn query đều
 *  do trình duyệt gửi lên, nên không nguồn nào đáng tin hơn nguồn nào. */
function resolveNext(request: NextRequest, searchParams: URLSearchParams): string {
  const fromCookie = request.cookies.get(OAUTH_NEXT_COOKIE)?.value;
  if (fromCookie) return safeNextPath(decodeURIComponent(fromCookie));
  return safeNextPath(searchParams.get("next"));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const error_description = searchParams.get("error_description");

  if (error) {
    // Giữ luôn `next` trên nhánh lỗi: người dùng sẽ thử lại ngay tại form đó,
    // và lần thử thứ hai không có lý do gì phải quên mất họ định đi đâu.
    const back = new URL("/login", request.url);
    back.searchParams.set("error", error_description || error);
    back.searchParams.set("next", resolveNext(request, searchParams));
    const failed = NextResponse.redirect(back);
    failed.headers.append("Set-Cookie", clearOAuthNextCookie());
    return failed;
  }

  if (code) {
    const done = NextResponse.redirect(new URL(resolveNext(request, searchParams), request.url));
    done.headers.append("Set-Cookie", clearOAuthNextCookie());
    return done;
  }

  return NextResponse.redirect(new URL("/login", request.url));
}
