-- Lớp tài khoản và phiên, thay cho schema `auth` của Supabase.
--
-- VÌ SAO PHẢI VIẾT MỚI. Supabase giữ tài khoản trong schema `auth`, thuộc về
-- nó chứ không thuộc về ứng dụng, nên `scripts/d1/export.mjs` không xuất được
-- và `migrations-d1/0001_schema.sql` không có bảng nào chứa mật khẩu. 88/88
-- bảng dữ liệu đã sang D1, nhưng chỗ biết "người này là ai" thì chưa từng tồn
-- tại ở phía Cloudflare. Đây là khoảng trống chặn mọi thứ còn lại: 32/53 hàm
-- RPC cần `userId`, và không có lớp này thì không có gì cấp giá trị ấy.
--
-- `user_profiles.id` vốn khoá ngoại tới `auth.users(id)` bên Supabase. Ở đây
-- `auth_users.id` giữ đúng những giá trị id cũ, nên toàn bộ dữ liệu đã nạp
-- không phải đánh số lại.

CREATE TABLE IF NOT EXISTS "auth_users" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT NOT NULL,
  -- Định dạng tự mô tả: pbkdf2-sha256$<số vòng>$<muối b64>$<băm b64>.
  -- Số vòng nằm trong chuỗi chứ không phải hằng số trong mã, để nâng nó sau
  -- này không làm mọi mật khẩu cũ hết xác thực được.
  "password_hash" TEXT NOT NULL,
  "email_verified" INTEGER NOT NULL DEFAULT 0,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Trùng email không phân biệt hoa thường, đúng như Supabase vẫn làm. Đặt ở
-- tầng cơ sở dữ liệu chứ không phải trong mã đăng ký: hai yêu cầu đăng ký
-- cùng lúc thì phép kiểm trong mã đều thấy trống và cùng ghi.
CREATE UNIQUE INDEX IF NOT EXISTS "auth_users_email_lower"
  ON "auth_users" (lower("email"));

CREATE TABLE IF NOT EXISTS "auth_sessions" (
  -- SHA-256 của token, dạng hex. BẢN THÂN TOKEN KHÔNG BAO GIỜ ĐƯỢC LƯU.
  -- Lưu token thẳng thì ai đọc được bảng này là đăng nhập được thành mọi
  -- người dùng mà không cần biết một mật khẩu nào.
  "id" TEXT PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "auth_users"("id") ON DELETE CASCADE,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_used_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expires_at" TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS "auth_sessions_user" ON "auth_sessions" ("user_id");
CREATE INDEX IF NOT EXISTS "auth_sessions_expires" ON "auth_sessions" ("expires_at");
