-- Bằng chứng năng lực thực hành (lib/practical-skill.ts, /api/skill-evidence).
--
-- Mọi con số năng lực có trước bảng này - số bài đã xong, avg_quiz_score, XP -
-- đều tăng khi người học ĐỌC. Bảng này chỉ nhận thứ người học đã LÀM được và
-- máy đã xác nhận: bài tập viết mã chạy ra đúng đầu ra, nhiệm vụ trong công cụ
-- mô phỏng, câu phỏng vấn kỹ thuật trả lời đúng (chấm bằng token đã ký), câu
-- luyện miền chứng chỉ trả lời đúng, và bài thi vượt chặng đã đạt.
--
-- Khoá chính (user_id, source, ref): làm lại đúng một thứ không cộng thêm lần
-- nữa. `ref` là định danh của thứ đã làm trong danh mục của nguồn đó (ví dụ
-- "sql:group-count", "1862:4", "aws-cloud-practitioner:billing-support:322").
--
-- `points` là trọng số tại lúc ghi (EVIDENCE_POINTS trong lib/practical-skill.ts);
-- phần trăm tính lúc đọc, có trần theo từng nguồn - xem computeSkillScores.
--
-- Chỉ ghi/đọc phía máy chủ qua createAdminClient; chính sách "manual" trong
-- scripts/d1/policy-registry.json chặn client tự ghi bằng chứng cho mình.
-- Chỉ THÊM bảng, không đổi dữ liệu nào. Chạy lại vô hại.
CREATE TABLE IF NOT EXISTS "user_skill_evidence" (
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "area" TEXT NOT NULL,
  "source" TEXT NOT NULL CHECK ("source" IN ('exercise', 'tool', 'interview', 'cert', 'stage_exam')),
  "ref" TEXT NOT NULL,
  "points" INTEGER NOT NULL DEFAULT 1,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("user_id", "source", "ref")
);

CREATE INDEX IF NOT EXISTS "user_skill_evidence_user_area_idx"
  ON "user_skill_evidence" ("user_id", "area");
