/** Đích đến sau đăng nhập, gửi qua COOKIE chứ không qua query của `redirectTo`.
 *
 *  VÌ SAO KHÔNG DÙNG QUERY. Supabase chỉ chuyển hướng tới `redirect_to` khi URL
 *  ấy khớp danh sách Redirect URLs của dự án, và phép khớp áp cho TOÀN BỘ URL
 *  chứ không riêng phần đường dẫn. Một mục đăng ký không có ký tự đại diện -
 *  `https://www.tuhoctaichinh.org/auth/callback` - vì thế KHÔNG khớp
 *  `https://www.tuhoctaichinh.org/auth/callback?next=%2Fdashboard`.
 *
 *  Và query luôn có: `safeNextPath(null)` trả "/dashboard", nên mọi lần đăng
 *  nhập Google đều gửi một URL có `?next=`. Không khớp thì Supabase rơi về
 *  "Site URL" - trang chủ - kèm `?code=`, không báo lỗi gì, và không ai đổi mã
 *  lấy phiên. Triệu chứng là mỗi lần đăng nhập lại đứng ở `/?code=<uuid>`.
 *
 *  Cách khác là thêm ký tự đại diện vào danh sách (`.../auth/callback**`).
 *  Chọn cookie thay vì thế vì nó giữ danh sách ở dạng KHỚP CHÍNH XÁC: một mục
 *  có `**` nhận mọi query, tức mọi tham số ai đó thêm sau này cũng lọt, và
 *  danh sách redirect là hàng rào chống chuyển hướng mở. Cookie cũng làm
 *  `redirectTo` thành một chuỗi cố định, không còn thứ để lệch.
 *
 *  `SameSite=Lax` là đủ và là mức chặt nhất còn dùng được: đường về từ Google
 *  là một điều hướng GET ở tầng cao nhất, và Lax gửi cookie trong đúng trường
 *  hợp đó. `Strict` sẽ nuốt nó.
 *
 *  Sống 10 phút. Đủ dài cho một vòng OAuth kể cả khi phải đăng nhập Google từ
 *  đầu, đủ ngắn để một lần bỏ dở không đổi đích đến của lần đăng nhập sau. */

export const OAUTH_NEXT_COOKIE = "thtcdn_oauth_next";

const MAX_AGE_SECONDS = 600;

/** Đặt cookie ngay trước khi rời trang sang Google. Chạy ở phía client. */
export function rememberOAuthNext(next: string) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${OAUTH_NEXT_COOKIE}=${encodeURIComponent(next)}; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

/** Chuỗi xoá cookie, để callback dọn sau khi đã dùng. Không dọn thì một lần
 *  đăng nhập sau bằng email cũng thừa hưởng đích đến của lần OAuth trước. */
export function clearOAuthNextCookie(): string {
  return `${OAUTH_NEXT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}
