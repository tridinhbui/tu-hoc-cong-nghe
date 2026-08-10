/** Đường dẫn tự lo phần xác thực của mình, nên proxy không cần gọi `getUser()`.
 *
 *  VÌ SAO CẦN. `supabase.auth.getUser()` LUÔN đi mạng - nó gửi một request tới
 *  `/auth/v1/user` để máy chủ xác minh JWT, khác `getSession()` vốn đọc cookie
 *  tại chỗ. proxy.ts gọi nó cho MỌI request khớp matcher có mang cookie phiên,
 *  và gọi TRƯỚC khi kịp kiểm đường dẫn có công khai hay không. Nên `/api/*` dù
 *  đã nằm trong PUBLIC_PREFIXES vẫn phải trả tiền một vòng mạng trước khi tới
 *  được dòng nói rằng nó công khai.
 *
 *  Với `/api/*` thì cùng một request HTTP bị xác minh HAI lần: proxy một lần,
 *  rồi chính route handler một lần nữa. 22 trên 31 handler gọi
 *  `auth.getUser()`, và cả 22 đều dựng client bằng `createServerSupabaseClient`.
 *
 *  VÌ SAO BỎ ĐƯỢC MÀ KHÔNG MẤT PHẦN LÀM MỚI COOKIE. Lý do proxy phải gọi
 *  `getUser()` (xem chú thích trong proxy.ts) là Server Component không ghi
 *  được cookie, nên cookie vừa làm mới không có đường về trình duyệt và phiên
 *  cứ cũ dần. Route Handler thì GHI ĐƯỢC: `createServerSupabaseClient` dựng
 *  trên `cookies()` của next/headers, và `setAll` của nó chạy thật trong ngữ
 *  cảnh handler - chỗ bị nuốt lặng là Server Component, không phải ở đây. Nên
 *  phần làm mới vẫn xảy ra với `/api/*`, chỉ là một lần thay vì hai.
 *
 *  `/auth/*` còn rõ hơn: callback OAuth và luồng đặt lại mật khẩu chạy TRƯỚC
 *  khi có phiên để mà làm mới. Hỏi "người này là ai" ở đó là hỏi vào chỗ trống.
 *
 *  ĐOÁN SAI THEO CHIỀU NÀO THÌ AN TOÀN - và câu trả lời ở đây KHÁC với
 *  lib/has-auth-cookie.ts, nên đừng chép cách nghĩ từ đó sang. Ở đó, đoán thừa
 *  chỉ tốn một lần gọi. Ở đây, thêm nhầm một tiền tố vào danh sách là gỡ luôn
 *  cổng mặc-định-từ-chối khỏi nhánh đó: proxy thoát trước khi kịp chuyển hướng
 *  ai về /login. Vì vậy danh sách là hai tiền tố CỐ ĐỊNH, không phải một mẫu
 *  khớp rộng, và cả hai đều đã nằm sẵn trong PUBLIC_PREFIXES của proxy.ts -
 *  tức là chúng vốn đã không bị cổng ấy chặn.
 *
 *  Khớp có dấu `/` ở cuối: `/api/` chứ không phải `/api`. Một route tên
 *  `/apibutnot` hay `/authentic` không được lọt vào đây chỉ vì trùng tiền tố. */

const SELF_AUTHENTICATING_PREFIXES = ["/api/", "/auth/"] as const;

export function isSelfAuthenticatingPath(pathname: string): boolean {
  return SELF_AUTHENTICATING_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
