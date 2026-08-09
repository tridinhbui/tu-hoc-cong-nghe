/** Request này có mang cookie phiên Supabase nào không.
 *
 *  VÌ SAO CẦN. proxy.ts gọi `supabase.auth.getUser()` trên MỌI request khớp
 *  matcher, và gọi trước khi kịp biết đường dẫn có công khai hay không. Đó là
 *  một vòng mạng ra Supabase cho từng lượt vào `/`, `/login`, `/dieu-khoan`,
 *  `/chinh-sach-bao-mat` và cả 31 route `/api/*` - kể cả khi người gọi là một
 *  con bot chưa từng đăng nhập.
 *
 *  Việc `getUser()` làm ở đó là làm mới cookie phiên, và điều đó chỉ có nghĩa
 *  khi ĐÃ CÓ cookie. Không có cookie nào thì không có gì để làm mới, và câu trả
 *  lời chắc chắn là `user === null` - biết trước mà không cần hỏi ai.
 *
 *  Tên cookie: @supabase/ssr đặt `sb-<project-ref>-auth-token`, và tách thành
 *  `...token.0`, `...token.1` khi phiên dài quá giới hạn một cookie. Cả hai đều
 *  mở đầu bằng `sb-`, và cả hai client trong repo này (`createBrowserClient` ở
 *  lib/supabase.ts, `createServerClient` ở proxy.ts) đều dùng tên mặc định chứ
 *  không đặt `cookieOptions.name`, nên tiền tố đó là thứ duy nhất cần khớp.
 *
 *  ĐOÁN SAI THEO CHIỀU NÀO THÌ AN TOÀN. Trả `true` nhầm chỉ tốn đúng một lần
 *  gọi `getUser()` như hiện tại. Trả `false` nhầm thì một người đang đăng nhập
 *  bị coi như khách - nên phép khớp ở đây rộng có chủ ý: bất kỳ cookie nào mở
 *  đầu `sb-`, không cố đoán project ref hay hậu tố. */

const SUPABASE_COOKIE_PREFIX = "sb-";

export function hasSupabaseAuthCookie(cookieNames: readonly string[]): boolean {
  return cookieNames.some((name) => name.startsWith(SUPABASE_COOKIE_PREFIX));
}
