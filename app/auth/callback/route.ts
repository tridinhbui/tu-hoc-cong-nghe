import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { safeNextPath } from "@/lib/safe-next-path";

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
    back.searchParams.set("next", safeNextPath(searchParams.get("next")));
    return NextResponse.redirect(back);
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
      // tin tham số: nó đi qua Google và quay lại, nên bất kỳ ai cũng dựng
      // được một URL callback với `next` tuỳ ý.
      return NextResponse.redirect(new URL(safeNextPath(searchParams.get("next")), request.url));
    }
  }

  return NextResponse.redirect(new URL("/login", request.url));
}
