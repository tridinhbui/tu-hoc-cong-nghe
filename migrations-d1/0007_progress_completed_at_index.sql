-- Chỉ mục riêng phần cho các lượt hoàn thành bài, theo thời điểm.
--
-- Phục vụ app/api/public/activity (trang chủ công khai): đếm bài hoàn thành
-- mỗi ngày trong 14 ngày. Không có chỉ mục này, câu đếm quét toàn bộ
-- user_progress (~27.000 hàng) - và từ 01/09/2026 D1 gói miễn phí TỪ CHỐI mọi
-- truy vấn của cả tài khoản khi vượt 5 triệu hàng đọc trong ngày.
--
-- RIÊNG PHẦN (`where completed = 1`) vì hàng chưa hoàn thành không bao giờ được
-- đếm, và phần lớn hàng user_progress là "đã mở, chưa xong" - chỉ mục nhỏ hơn,
-- ghi rẻ hơn. SQLite chỉ dùng chỉ mục này khi câu truy vấn có đúng
-- `completed = 1`; route kia viết đúng như vậy.
--
-- Chỉ THÊM, không đổi dữ liệu nào. Chạy lại vô hại.
CREATE INDEX IF NOT EXISTS idx_user_progress_completed_at
  ON user_progress (completed_at)
  WHERE completed = 1;
