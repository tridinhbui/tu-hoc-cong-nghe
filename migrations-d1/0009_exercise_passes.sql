-- Bài tập viết mã đã qua (khối `exercise` trong thân bài học).
--
-- Trước bảng này, mọi thước đo năng lực của người học - avg_quiz_score, số bài
-- đã xong, XP - đều đến từ trắc nghiệm và việc cuộn hết bài. Không con số nào
-- cho biết người học đã tự viết được một dòng mã chạy đúng. Bảng này ghi đúng
-- điều đó: lần đầu người học chạy bài tập và đầu ra khớp.
--
-- Khoá là (người học, bài, vị trí khối) vì một bài có thể có nhiều bài tập và
-- bài tập không có id riêng; vị trí khối ổn định vì lib/lesson-translations.js
-- giữ `sections` theo vị trí ở mọi ngôn ngữ.
--
-- Chỉ ghi qua RPC record_exercise_pass, chỉ đọc qua get_my_exercise_passes.
-- Chỉ THÊM bảng, không đổi dữ liệu nào. Chạy lại vô hại.
CREATE TABLE IF NOT EXISTS "user_exercise_passes" (
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "lesson_id" INTEGER NOT NULL,
  "block_index" INTEGER NOT NULL,
  "passed_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("user_id", "lesson_id", "block_index")
);
