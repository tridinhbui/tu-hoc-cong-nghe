-- Mục tiêu học theo nhu cầu: website, ai-assistant, ai-agent, ai-marketing.
--
-- Giá trị là id hành trình trong lib/learning-flows.ts. Để TEXT không CHECK:
-- danh sách hành trình sẽ còn dài thêm (xem KE-HOACH-HOC-THEO-NHU-CAU.md), và
-- một CHECK ở cột thì thêm hành trình nào cũng phải kèm một migration. Server
-- action kiểm id với LEARNING_FLOWS trước khi ghi - đó là lưới đầu.
--
-- NULL = chưa chọn. Người dùng cũ đều NULL và không bị hỏi lại bằng modal; câu
-- hỏi chỉ nằm trên /lo-trinh, chờ họ tự tới.
ALTER TABLE "user_profiles" ADD COLUMN "learning_goal" TEXT;
