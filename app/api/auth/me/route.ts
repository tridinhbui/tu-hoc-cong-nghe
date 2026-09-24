import { getCurrentUser } from "@/lib/auth/current-user";

/**
 * Ai đang đăng nhập, theo cookie phiên. Thay `supabase.auth.getSession()`.
 *
 * PHẢI LÀ MỘT LƯỢT GỌI MẠNG - trình duyệt không đọc được cookie phiên (nó
 * `httpOnly`, đúng như thiết kế: JavaScript trên trang đọc được là token lộ
 * ra qua XSS). Route này là cách duy nhất phía trình duyệt biết ai đang đăng
 * nhập, và nó luôn đúng ngay lúc gọi vì getCurrentUser() kiểm is_disabled mỗi
 * lần - không có bản sao cục bộ nào có thể cũ.
 */
export async function GET() {
  const user = await getCurrentUser();
  return Response.json({ user });
}
