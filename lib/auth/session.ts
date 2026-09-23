/**
 * Cấp, kiểm và thu hồi phiên đăng nhập. Thay `auth.getSession()` của Supabase.
 *
 * TOKEN KHÔNG BAO GIỜ ĐƯỢC LƯU. Bảng `auth_sessions` giữ SHA-256 của token
 * làm khoá chính; bản thân token chỉ tồn tại trong cookie của người dùng. Ai
 * đọc được bảng ấy - một bản sao lưu rò ra, một lỗi tiêm SQL chỉ đọc - cũng
 * không mạo danh được ai, vì từ băm không suy ngược ra token. Đây là khác biệt
 * duy nhất đáng kể giữa bảng phiên làm đúng và làm sai.
 *
 * PHIÊN TRA CƠ SỞ DỮ LIỆU, KHÔNG PHẢI JWT TỰ CHỨNG. JWT đỡ được một lượt đọc
 * mỗi yêu cầu, đổi lại KHÔNG thu hồi được trước hạn: đổi mật khẩu hay khoá tài
 * khoản mà token cũ vẫn dùng được tới lúc hết hạn. Repo này có `is_disabled`
 * trên `user_profiles` và trang quản trị khoá người dùng, nên thu hồi tức thì
 * là yêu cầu thật chứ không phải tuỳ chọn.
 */
import type { D1Like } from "../d1/rpc";

/** Hạn mặc định của một phiên. */
export const SESSION_TTL_DAYS = 30;

/**
 * Chỉ làm mới `last_used_at` khi bản ghi đã cũ hơn ngần này.
 *
 * Không có ngưỡng thì mỗi yêu cầu là một lượt GHI vào D1 chỉ để đổi dấu thời
 * gian - biến một trang đọc thuần thành trang ghi, và D1 tính tiền theo lượt
 * ghi. Một giờ đủ để biết phiên nào đã chết mà bỏ.
 */
const TOUCH_AFTER_MS = 60 * 60 * 1000;

const COOKIE_NAME = "thcn_session";

function hex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Băm token thành khoá bảng. Không có muối: token đã là 32 byte ngẫu nhiên,
 *  nên không có từ điển nào để dò và muối chỉ thêm một cột vô dụng. */
async function tokenHash(token: string): Promise<string> {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return hex(new Uint8Array(d));
}

/** 32 byte ngẫu nhiên, dạng hex. */
function newToken(): string {
  return hex(crypto.getRandomValues(new Uint8Array(32)));
}

export interface SessionRecord {
  userId: string;
  expiresAt: string;
}

/** Cấp một phiên mới. Trả token dạng thường ĐÚNG MỘT LẦN - không đọc lại được. */
export async function createSession(
  db: D1Like,
  userId: string,
  ttlDays = SESSION_TTL_DAYS
): Promise<{ token: string; expiresAt: string }> {
  const token = newToken();
  const id = await tokenHash(token);
  const expiresAt = new Date(Date.now() + ttlDays * 86_400_000).toISOString();
  const stmt = db
    .prepare(
      `INSERT INTO auth_sessions (id, user_id, expires_at) VALUES (?, ?, ?)`
    )
    .bind(id, userId, expiresAt);
  await (stmt.run ? stmt.run() : stmt.all());
  return { token, expiresAt };
}

/**
 * Đổi token lấy chủ phiên, hoặc null.
 *
 * Hạn được kiểm TRONG câu truy vấn chứ không phải trong JavaScript sau khi
 * đọc: kiểm sau thì một phiên hết hạn vẫn là một dòng đọc được, và chỉ cần
 * một nhánh quên so sánh là nó dùng được tiếp.
 */
export async function verifySession(
  db: D1Like,
  token: string | null | undefined
): Promise<SessionRecord | null> {
  if (!token) return null;
  const id = await tokenHash(token);
  const r = await db
    .prepare(
      `SELECT user_id, expires_at, last_used_at
         FROM auth_sessions
        WHERE id = ? AND expires_at > CURRENT_TIMESTAMP`
    )
    .bind(id)
    .all();
  const row = r.results[0] as
    | { user_id: string; expires_at: string; last_used_at: string }
    | undefined;
  if (!row) return null;

  const last = Date.parse(row.last_used_at.replace(" ", "T") + "Z");
  if (!Number.isNaN(last) && Date.now() - last > TOUCH_AFTER_MS) {
    const t = db
      .prepare(`UPDATE auth_sessions SET last_used_at = CURRENT_TIMESTAMP WHERE id = ?`)
      .bind(id);
    await (t.run ? t.run() : t.all());
  }
  return { userId: row.user_id, expiresAt: row.expires_at };
}

/** Thu hồi một phiên (đăng xuất trên một thiết bị). */
export async function revokeSession(db: D1Like, token: string): Promise<void> {
  const id = await tokenHash(token);
  const s = db.prepare(`DELETE FROM auth_sessions WHERE id = ?`).bind(id);
  await (s.run ? s.run() : s.all());
}

/** Thu hồi mọi phiên của một người. Gọi khi đổi mật khẩu hoặc khoá tài khoản. */
export async function revokeAllSessions(db: D1Like, userId: string): Promise<void> {
  const s = db.prepare(`DELETE FROM auth_sessions WHERE user_id = ?`).bind(userId);
  await (s.run ? s.run() : s.all());
}

/**
 * Dọn phiên đã hết hạn.
 *
 * `verifySession` đã lọc theo hạn nên phiên chết không dùng được, nhưng chúng
 * vẫn chiếm chỗ mãi mãi. Gọi định kỳ bằng Cron Trigger của Workers.
 */
export async function purgeExpiredSessions(db: D1Like): Promise<number> {
  const s = db
    .prepare(`DELETE FROM auth_sessions WHERE expires_at <= CURRENT_TIMESTAMP`);
  const b = s.bind();
  const r = b.run ? await b.run() : (await b.all(), undefined);
  return r?.meta?.changes ?? -1;
}

/** Thuộc tính cookie phiên. `httpOnly` để JavaScript trên trang không đọc được,
 *  `sameSite: lax` để một trang khác không kích hoạt được yêu cầu thay người dùng. */
export function sessionCookie(token: string, expiresAt: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
    expires: new Date(expiresAt),
  };
}

export { COOKIE_NAME as SESSION_COOKIE_NAME };
