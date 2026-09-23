import "server-only";
import { cookies } from "next/headers";
import { getDb } from "../d1/server";
import { verifySession, SESSION_COOKIE_NAME } from "./session";

/**
 * Người dùng của yêu cầu hiện tại, hoặc null. Thay `auth.getUser()`.
 *
 * TRẢ VỀ null CHỨ KHÔNG NÉM. 33 chỗ gọi getUser() hiện nay đều xử lý trường
 * hợp không có người dùng; ném ở đây sẽ biến một trang công khai thành lỗi
 * 500 cho khách chưa đăng nhập.
 */
export interface CurrentUser {
  id: string;
  email: string;
  role: string;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const db = getDb();
  const s = await verifySession(db, token);
  if (!s) return null;

  // Đọc thẳng bảng chứ không qua client có gác quyền: ở đây chưa biết người
  // gọi là ai, nên chưa có gì để gác. Đây là lượt đọc XÁC LẬP danh tính.
  const r = await db
    .prepare(`SELECT p.email, p.role, p.is_disabled FROM user_profiles p WHERE p.id = ?`)
    .bind(s.userId)
    .all();
  const row = r.results[0] as { email: string; role: string; is_disabled: number } | undefined;
  if (!row) return null;

  // Tài khoản bị khoá sau khi phiên được cấp. Kiểm ở MỖI yêu cầu chứ không
  // chỉ lúc đăng nhập - đó là toàn bộ lý do chọn phiên tra cơ sở dữ liệu thay
  // vì JWT tự chứng.
  if (row.is_disabled) return null;

  return { id: s.userId, email: row.email, role: row.role };
}

/** Như trên nhưng ném khi chưa đăng nhập. Dùng ở route bắt buộc đăng nhập,
 *  để không ai quên kiểm null rồi chạy tiếp với actor rỗng. */
export async function requireUser(): Promise<CurrentUser> {
  const u = await getCurrentUser();
  if (!u) throw new Error("Chưa đăng nhập.");
  return u;
}

/** Client D1 chạy dưới danh nghĩa người dùng hiện tại. Thay cho việc lấy
 *  client Supabase rồi dựa vào RLS. */
export async function getUserClient() {
  const u = await getCurrentUser();
  const { getClient } = await import("../d1/server");
  return { user: u, db: getClient(u?.id ?? null) };
}
