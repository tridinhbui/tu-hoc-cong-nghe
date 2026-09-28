-- Tách "đã mở khoá do thi vượt chặng" khỏi "đã thực sự học".
--
-- Port từ bản tài chính (supabase/migrations/20260926_completion_source.sql).
-- app/api/stage-exam/route.ts ghi `completed = 1` cho mọi bài của chặng khi
-- thi đạt; không có cột này thì giao diện không còn cách nào nói bài nào người
-- học đã đọc thật - /hoc-bai đánh dấu riêng các bài 'stage_exam'.
--
-- Không có bước truy hồi dữ liệu cũ như bản Postgres, vì không có gì để truy
-- hồi: đo trên D1 remote ngày 2026-09-27, user_stage_exam_attempts có 0 dòng.
ALTER TABLE "user_progress" ADD COLUMN "completion_source" TEXT NOT NULL DEFAULT 'lesson'
  CHECK ("completion_source" IN ('lesson', 'stage_exam'));

CREATE INDEX IF NOT EXISTS "user_progress_user_source_idx"
  ON "user_progress" ("user_id", "completion_source");
