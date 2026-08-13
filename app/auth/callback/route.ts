import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { safeNextPath } from "@/lib/safe-next-path";
import { OAUTH_NEXT_COOKIE, clearOAuthNextCookie } from "@/lib/oauth-next-cookie";

/** Đích đến sau đăng nhập.
 *
 *  COOKIE TRƯỚC, query sau. `redirectTo` của luồng Google không còn mang query
 *  - nó phải khớp chính xác danh sách Redirect URLs của Supabase, xem
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
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Ignore errors with setting cookies
            }
          },
        },
      }
    );

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (!exchangeError) {
      // Đích đến do /login gửi kèm lúc mở OAuth. Vẫn lọc lại ở đây chứ không
      // tin thứ nhận được: nó đi qua Google và quay lại, nên bất kỳ ai cũng
      // dựng được một cookie hay một URL callback với `next` tuỳ ý.
      const done = NextResponse.redirect(new URL(resolveNext(request, searchParams), request.url));
      // Dọn cookie sau khi dùng: để lại thì lần đăng nhập bằng email sau đó
      // cũng thừa hưởng đích đến của lần OAuth này.
      done.headers.append("Set-Cookie", clearOAuthNextCookie());
      return done;
    }
  }

  return NextResponse.redirect(new URL("/login", request.url));
}
