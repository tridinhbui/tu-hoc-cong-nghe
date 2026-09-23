/**
 * Các thao tác tài khoản: đăng ký, đăng nhập, đổi và đặt lại mật khẩu, đăng
 * nhập bằng Google. Thay phần việc của Supabase Auth.
 *
 * TẦNG NÀY KHÔNG BIẾT GÌ VỀ HTTP. Không đọc cookie, không đặt header, không
 * chuyển hướng. Nó nhận dữ liệu và trả kết quả, nên bộ kiểm chạy được trên
 * SQLite thật mà không cần dựng một yêu cầu giả nào.
 */
import type { D1Like } from "../d1/rpc";
import { hashPassword, verifyPassword, needsRehash } from "./password";
import { createSession, revokeAllSessions } from "./session";

export class AuthError extends Error {
  constructor(message: string, readonly code: string) {
    super(message);
  }
}

/** Hạn của một liên kết đặt lại mật khẩu. Ngắn có chủ ý: liên kết nằm trong
 *  hộp thư, và hộp thư là thứ bị chiếm lại nhiều nhất. */
const RESET_TTL_MS = 60 * 60 * 1000;

async function rows<T>(db: D1Like, sql: string, ...args: unknown[]): Promise<T[]> {
  const r = await db.prepare(sql).bind(...args).all();
  return r.results as T[];
}

async function run(db: D1Like, sql: string, ...args: unknown[]): Promise<number> {
  const s = db.prepare(sql).bind(...args);
  if (s.run) return (await s.run()).meta?.changes ?? -1;
  await s.all();
  return -1;
}

function hex(b: Uint8Array) {
  return Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
}

async function sha256(s: string) {
  return hex(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s))));
}

export interface AuthUser {
  id: string;
  email: string;
}

/**
 * Đăng ký. Tạo cả bản ghi tài khoản lẫn hồ sơ.
 *
 * Supabase làm việc thứ hai bằng một trigger trên auth.users
 * (`on_auth_user_created`), thứ RPC-MIGRATION-MAP đã ghi là không port được.
 * Ở đây nó là một lệnh ghi tường minh trong cùng lô - dễ đọc hơn một trigger
 * vô hình, và quan trọng hơn là nó KHÔNG âm thầm biến mất khi đổi kho dữ liệu.
 */
export async function signUp(
  db: D1Like,
  email: string,
  password: string
): Promise<{ user: AuthUser; token: string; expiresAt: string }> {
  const e = email.trim().toLowerCase();
  if (!e.includes("@")) throw new AuthError("Email không hợp lệ.", "email_invalid");
  if (password.length < 8) throw new AuthError("Mật khẩu phải từ 8 ký tự.", "password_too_short");

  const existing = await rows<{ id: string }>(
    db, `SELECT id FROM auth_users WHERE lower(email) = ?`, e
  );
  if (existing.length) throw new AuthError("Email này đã có tài khoản.", "email_taken");

  const id = crypto.randomUUID();
  const hash = await hashPassword(password);
  try {
    await run(db, `INSERT INTO auth_users (id, email, password_hash) VALUES (?, ?, ?)`, id, e, hash);
  } catch (err) {
    // Chỉ mục duy nhất bắt được trường hợp hai yêu cầu đăng ký cùng lúc, thứ
    // phép kiểm ở trên không bắt được vì cả hai đều thấy trống.
    if (/UNIQUE|constraint/i.test(String((err as Error).message))) {
      throw new AuthError("Email này đã có tài khoản.", "email_taken");
    }
    throw err;
  }
  await run(db, `INSERT INTO user_profiles (id, email) VALUES (?, ?)`, id, e);

  const s = await createSession(db, id);
  return { user: { id, email: e }, ...s };
}

/**
 * Đăng nhập bằng mật khẩu.
 *
 * Email sai và mật khẩu sai trả về CÙNG một thông báo. Phân biệt hai trường
 * hợp là biến trang đăng nhập thành công cụ dò xem một email có tài khoản hay
 * không, và người ta dùng lại mật khẩu giữa các trang.
 */
export async function signInWithPassword(
  db: D1Like,
  email: string,
  password: string
): Promise<{ user: AuthUser; token: string; expiresAt: string }> {
  const e = email.trim().toLowerCase();
  const found = await rows<{ id: string; email: string; password_hash: string }>(
    db, `SELECT id, email, password_hash FROM auth_users WHERE lower(email) = ?`, e
  );
  const sai = new AuthError("Email hoặc mật khẩu không đúng.", "invalid_credentials");
  if (!found.length) {
    // Vẫn băm một lần dù không có tài khoản. Trả lời ngay lập tức ở nhánh này
    // và chậm 50 ms ở nhánh kia là tự khai email nào tồn tại, bằng đồng hồ.
    await hashPassword(password);
    throw sai;
  }
  const u = found[0];
  if (!(await verifyPassword(password, u.password_hash))) throw sai;

  // Nâng số vòng ngầm. Đây là lúc DUY NHẤT hệ thống cầm mật khẩu dạng thường
  // và có quyền ghi lại nó.
  if (needsRehash(u.password_hash)) {
    await run(db, `UPDATE auth_users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      await hashPassword(password), u.id);
  }

  const disabled = await rows<{ is_disabled: number }>(
    db, `SELECT is_disabled FROM user_profiles WHERE id = ?`, u.id
  );
  if (disabled[0]?.is_disabled) throw new AuthError("Tài khoản đã bị khoá.", "account_disabled");

  await run(db, `UPDATE user_profiles SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?`, u.id);
  const s = await createSession(db, u.id);
  return { user: { id: u.id, email: u.email }, ...s };
}

/**
 * Xin một liên kết đặt lại mật khẩu.
 *
 * LUÔN trả về như nhau, kể cả khi email không có tài khoản - cùng lý do với
 * đăng nhập. Token thường chỉ được trả cho bên gọi để gửi email; nó không bao
 * giờ được lưu.
 */
export async function requestPasswordReset(
  db: D1Like,
  email: string
): Promise<{ token: string; userId: string } | null> {
  const e = email.trim().toLowerCase();
  const found = await rows<{ id: string }>(db, `SELECT id FROM auth_users WHERE lower(email) = ?`, e);
  if (!found.length) return null;

  const token = hex(crypto.getRandomValues(new Uint8Array(32)));
  await run(
    db,
    `INSERT INTO auth_password_resets (id, user_id, expires_at) VALUES (?, ?, ?)`,
    await sha256(token), found[0].id, new Date(Date.now() + RESET_TTL_MS).toISOString()
  );
  return { token, userId: found[0].id };
}

/**
 * Dùng token để đặt mật khẩu mới.
 *
 * Đặt lại xong thì THU HỒI MỌI PHIÊN. Nếu ai đó chiếm được tài khoản, việc
 * chủ nhân đặt lại mật khẩu phải đẩy họ ra - giữ phiên cũ sống là biến thao
 * tác cứu tài khoản thành thao tác vô nghĩa.
 */
export async function resetPassword(
  db: D1Like,
  token: string,
  newPassword: string
): Promise<{ userId: string }> {
  if (newPassword.length < 8) throw new AuthError("Mật khẩu phải từ 8 ký tự.", "password_too_short");
  const id = await sha256(token);
  const found = await rows<{ user_id: string }>(
    db,
    `SELECT user_id FROM auth_password_resets
      WHERE id = ? AND used_at IS NULL AND expires_at > CURRENT_TIMESTAMP`,
    id
  );
  if (!found.length) throw new AuthError("Liên kết đã hết hạn hoặc đã dùng rồi.", "reset_invalid");

  // Đánh dấu đã dùng TRƯỚC khi đổi mật khẩu, và chỉ đi tiếp nếu chính lượt ghi
  // này là lượt đánh dấu. D1 không có transaction tương tác, nên đây là cách
  // duy nhất để hai yêu cầu cùng token không cùng đổi được mật khẩu.
  const marked = await run(
    db, `UPDATE auth_password_resets SET used_at = CURRENT_TIMESTAMP WHERE id = ? AND used_at IS NULL`, id
  );
  if (marked === 0) throw new AuthError("Liên kết đã hết hạn hoặc đã dùng rồi.", "reset_invalid");

  await run(db, `UPDATE auth_users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    await hashPassword(newPassword), found[0].user_id);
  await revokeAllSessions(db, found[0].user_id);
  return { userId: found[0].user_id };
}

/** Đổi mật khẩu khi đang đăng nhập. Cũng thu hồi mọi phiên, kể cả phiên hiện
 *  tại - bên gọi cấp phiên mới nếu muốn giữ người dùng ở lại. */
export async function changePassword(
  db: D1Like,
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> {
  if (newPassword.length < 8) throw new AuthError("Mật khẩu phải từ 8 ký tự.", "password_too_short");
  const found = await rows<{ password_hash: string }>(
    db, `SELECT password_hash FROM auth_users WHERE id = ?`, userId
  );
  if (!found.length) throw new AuthError("Không tìm thấy tài khoản.", "user_not_found");
  if (!(await verifyPassword(currentPassword, found[0].password_hash))) {
    throw new AuthError("Mật khẩu hiện tại không đúng.", "invalid_credentials");
  }
  await run(db, `UPDATE auth_users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    await hashPassword(newPassword), userId);
  await revokeAllSessions(db, userId);
}

/**
 * Đăng nhập bằng định danh bên thứ ba, sau khi bên gọi đã xác minh xong.
 *
 * Khớp theo `sub` của nhà cung cấp chứ không theo email. Email đổi được, và
 * khớp theo email nghĩa là ai chiếm được một email là chiếm được tài khoản.
 * Email chỉ dùng khi LIÊN KẾT lần đầu vào một tài khoản đã có sẵn.
 */
export async function signInWithIdentity(
  db: D1Like,
  provider: string,
  providerUserId: string,
  email: string,
  /**
   * Nhà cung cấp có khẳng định email này đã được xác minh không.
   *
   * QUYẾT ĐỊNH CẢ VIỆC CÓ ĐƯỢC GHÉP VÀO TÀI KHOẢN SẴN CÓ HAY KHÔNG, nên bắt
   * buộc phải truyền. Bản đầu của hàm này không có tham số ấy và ghép theo
   * email vô điều kiện: ai khiến nhà cung cấp phát hành một token mang email
   * chưa xác minh là chiếm được tài khoản mang email đó. Bộ kiểm bắt được.
   *
   * Google trả `email_verified` trong id token; đọc nó chứ đừng mặc định true.
   */
  emailVerified: boolean
): Promise<{ user: AuthUser; token: string; expiresAt: string; created: boolean }> {
  const e = email.trim().toLowerCase();
  const link = await rows<{ user_id: string }>(
    db, `SELECT user_id FROM auth_identities WHERE provider = ? AND provider_user_id = ?`,
    provider, providerUserId
  );

  let userId: string;
  let created = false;
  if (link.length) {
    userId = link[0].user_id;
  } else {
    // CHỈ ghép theo email khi nhà cung cấp đã xác minh nó. Chưa xác minh thì
    // email chỉ là một chuỗi người dùng tự gõ vào bên kia.
    const byEmail = emailVerified
      ? await rows<{ id: string }>(db, `SELECT id FROM auth_users WHERE lower(email) = ?`, e)
      : [];
    if (byEmail.length) {
      userId = byEmail[0].id;
    } else {
      // Email chưa xác minh mà đã thuộc về người khác: TỪ CHỐI, đừng tạo tài
      // khoản mới.
      //
      // Bản đầu rơi thẳng xuống nhánh tạo mới và đụng chỉ mục duy nhất trên
      // lower(email) - bộ kiểm bắt được bằng một lỗi ràng buộc chứ không phải
      // bằng một thông báo có nghĩa. Ba cách xử lý, và hai cách sai: ghép vào
      // tài khoản kia là cho chiếm tài khoản; tạo tài khoản thứ hai cùng email
      // là để hai người cùng một danh tính. Cách đúng là dừng lại và bảo người
      // dùng đăng nhập bằng mật khẩu rồi tự liên kết trong phần cài đặt.
      if (!emailVerified) {
        const daCo = await rows<{ id: string }>(
          db, `SELECT id FROM auth_users WHERE lower(email) = ?`, e
        );
        if (daCo.length) {
          throw new AuthError(
            "Email này đã có tài khoản. Hãy đăng nhập bằng mật khẩu rồi liên kết trong phần cài đặt.",
            "email_taken_unverified"
          );
        }
      }
      userId = crypto.randomUUID();
      // Tài khoản chỉ đăng nhập bằng Google: không có mật khẩu dùng được.
      // Ghi một chuỗi KHÔNG phải định dạng băm hợp lệ, nên verifyPassword
      // luôn trả false - khoá đường mật khẩu mà không cần thêm cột cờ.
      await run(db, `INSERT INTO auth_users (id, email, password_hash, email_verified) VALUES (?, ?, ?, ?)`,
        userId, e, "không-đăng-nhập-bằng-mật-khẩu", emailVerified ? 1 : 0);
      await run(db, `INSERT INTO user_profiles (id, email) VALUES (?, ?)`, userId, e);
      created = true;
    }
    await run(db, `INSERT INTO auth_identities (provider, provider_user_id, user_id) VALUES (?, ?, ?)`,
      provider, providerUserId, userId);
  }

  const disabled = await rows<{ is_disabled: number }>(
    db, `SELECT is_disabled FROM user_profiles WHERE id = ?`, userId
  );
  if (disabled[0]?.is_disabled) throw new AuthError("Tài khoản đã bị khoá.", "account_disabled");

  await run(db, `UPDATE user_profiles SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?`, userId);
  const s = await createSession(db, userId);
  return { user: { id: userId, email: e }, ...s, created };
}
