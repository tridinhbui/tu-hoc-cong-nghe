-- Định danh bên thứ ba và token đặt lại mật khẩu.
--
-- Tách khỏi 0003 vì đây là hai việc khác nhau: 0003 dựng tài khoản và phiên,
-- còn đây là hai đường VÀO tài khoản ngoài cặp email/mật khẩu.

-- Đăng nhập Google. App đang gọi signInWithOAuth({provider:"google"}) và
-- Supabase lo toàn bộ phần bắt tay; bỏ Supabase thì phần ấy phải tự dựng.
--
-- Bảng riêng chứ không phải cột google_id trên auth_users: một người có thể
-- có nhiều định danh (Google hôm nay, thứ khác sau này), và khoá duy nhất
-- phải đặt trên cặp (nhà cung cấp, id bên đó) chứ không phải trên người dùng.
CREATE TABLE IF NOT EXISTS "auth_identities" (
  "provider" TEXT NOT NULL,
  -- `sub` mà nhà cung cấp trả về. KHÔNG dùng email làm khoá: email đổi được,
  -- và ở vài nhà cung cấp nó còn dùng lại được sau khi tài khoản bị xoá.
  "provider_user_id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL REFERENCES "auth_users"("id") ON DELETE CASCADE,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("provider", "provider_user_id")
);

CREATE INDEX IF NOT EXISTS "auth_identities_user" ON "auth_identities" ("user_id");

-- Token đặt lại mật khẩu.
--
-- Cần ngay từ đầu chứ không phải tính năng để sau: 3.652 tài khoản hiện có
-- nằm trong Supabase Auth, và băm mật khẩu của họ không xuất sang được. Đặt
-- lại mật khẩu là đường DUY NHẤT để họ vào lại tài khoản của mình.
--
-- Giống auth_sessions: lưu BĂM của token chứ không phải token. Ai đọc được
-- bảng này mà lấy được token thường thì đặt lại được mật khẩu của bất kỳ ai.
CREATE TABLE IF NOT EXISTS "auth_password_resets" (
  "id" TEXT PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "auth_users"("id") ON DELETE CASCADE,
  "expires_at" TEXT NOT NULL,
  -- Đánh dấu đã dùng thay vì xoá: một token dùng hai lần cần phân biệt được
  -- với một token chưa từng tồn tại, để còn lần ra khi có chuyện.
  "used_at" TEXT,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "auth_password_resets_user" ON "auth_password_resets" ("user_id");
CREATE INDEX IF NOT EXISTS "auth_password_resets_expires" ON "auth_password_resets" ("expires_at");
