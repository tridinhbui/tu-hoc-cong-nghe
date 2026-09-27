-- Đổi URL tệp R2 từ dạng tuyệt đối trên tên miền chết sang dạng tương đối.
--
-- lib/r2/server.ts từng ghép "https://tuhoccongnghe.vn" vào mọi URL tệp - một tên
-- miền không phân giải được. Đo trên D1 remote ngày 27/09/2026: 69 hàng (32
-- chat_messages.image_url, 34 user_profiles.avatar_url, 3 documents.file_url),
-- bằng đúng số tệp trong bucket thcn-files. Mã đã sửa để lưu "/api/files/..." từ
-- giờ; tệp này sửa những hàng đã lưu trước đó.
--
-- CHỈ chạm hàng khớp chính xác tiền tố "https://tuhoccongnghe.vn/api/files/", nên
-- chạy lại lần hai là vô hại (không còn hàng nào khớp). Ảnh đại diện Google
-- (lh3.googleusercontent.com) và mọi URL khác không bị động tới.
--
-- Đảo ngược, nếu cần:
--   UPDATE <bảng> SET <cột> = 'https://tuhoccongnghe.vn' || <cột>
--    WHERE <cột> LIKE '/api/files/%';
--   (chỉ đúng nếu chưa có tệp mới nào được tải lên sau khi chạy tệp này, vì tệp
--    mới cũng mang dạng /api/files/... - nên chạy đảo ngược càng sớm càng tốt)
--
-- Chạy:  npx wrangler d1 execute DB --remote --file scripts/d1/fix-relative-file-urls.sql

UPDATE user_profiles
   SET avatar_url = substr(avatar_url, length('https://tuhoccongnghe.vn') + 1)
 WHERE avatar_url LIKE 'https://tuhoccongnghe.vn/api/files/%';

UPDATE chat_messages
   SET image_url = substr(image_url, length('https://tuhoccongnghe.vn') + 1)
 WHERE image_url LIKE 'https://tuhoccongnghe.vn/api/files/%';

UPDATE documents
   SET file_url = substr(file_url, length('https://tuhoccongnghe.vn') + 1)
 WHERE file_url LIKE 'https://tuhoccongnghe.vn/api/files/%';
