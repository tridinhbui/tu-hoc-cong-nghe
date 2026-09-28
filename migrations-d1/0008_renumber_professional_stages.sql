-- Đánh số lại chặng của track chuyên sâu sau khi gỡ 11 chặng rỗng.
--
-- `stage_label` là KHOÁ: app/api/stage-exam và bài thi cột mốc tra theo nó.
-- lib/track-stages.ts gỡ các chặng 14, 15, 16, 17, 26 và 34-39 (không còn bài
-- nào của track chuyên sâu - vỏ của các môn FRM cũ, hoặc chặng mà mọi bài đều
-- thuộc track bổ trợ nên dashboard lọc hết), rồi đánh số lại cho liền mạch
-- (lib/__tests__/stage-numbering.test.ts yêu cầu nhãn liên tục từ 1).
--
-- Hàng của chặng đã gỡ bị xoá: chặng không còn, và giữ lại thì nhãn cũ của nó
-- (vd "Chặng 14") sẽ trùng với chặng khác được đánh số về đúng nhãn đó.
-- Đổi qua một tiền tố tạm để hai lượt đổi không giẫm lên nhau
-- ("Chặng 18" -> "Chặng 14" trong khi "Chặng 22" -> "Chặng 18").
--
-- Chỉ chạm hàng có track chuyên sâu.
--
-- KHÔNG chạy lại được. Đây là một phép đánh số lại, nên lần chạy thứ hai sẽ
-- dịch nhãn thêm một lần nữa ("Chặng 14" mới bị coi là chặng đã gỡ và bị xoá).
-- `wrangler d1 migrations apply` ghi lại migration đã chạy và không chạy lại;
-- đừng chạy tay tệp này bằng `wrangler d1 execute --file`.

DELETE FROM "user_milestone_exams" WHERE "track_id" = 'professional' AND "stage_label" IN ('Chặng 14', 'Chặng 15', 'Chặng 16', 'Chặng 17', 'Chặng 26', 'Chặng 34', 'Chặng 35', 'Chặng 36', 'Chặng 37', 'Chặng 38', 'Chặng 39');
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 14' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 18';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 15' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 19';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 16' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 20';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 17' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 21';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 18' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 22';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 19' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 23';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 20' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 24';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 21' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 25';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 22' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 27';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 23' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 28';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 24' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 29';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 25' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 30';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 26' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 31';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 27' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 32';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 28' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 33';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 29' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 40';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 30' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 41';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 31' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 42';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 32' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 43';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 33' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 44';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 34' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 45';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 35' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 46';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 36' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 47';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 37' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 48';
UPDATE "user_milestone_exams" SET "stage_label" = '__renum__Chặng 38' WHERE "track_id" = 'professional' AND "stage_label" = 'Chặng 49';
UPDATE "user_milestone_exams" SET "stage_label" = substr("stage_label", 10) WHERE "track_id" = 'professional' AND substr("stage_label", 1, 9) = '__renum__';
DELETE FROM "user_stage_exam_attempts" WHERE "track" = 'professional' AND "stage_label" IN ('Chặng 14', 'Chặng 15', 'Chặng 16', 'Chặng 17', 'Chặng 26', 'Chặng 34', 'Chặng 35', 'Chặng 36', 'Chặng 37', 'Chặng 38', 'Chặng 39');
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 14' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 18';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 15' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 19';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 16' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 20';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 17' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 21';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 18' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 22';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 19' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 23';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 20' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 24';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 21' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 25';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 22' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 27';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 23' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 28';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 24' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 29';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 25' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 30';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 26' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 31';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 27' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 32';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 28' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 33';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 29' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 40';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 30' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 41';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 31' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 42';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 32' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 43';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 33' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 44';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 34' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 45';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 35' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 46';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 36' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 47';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 37' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 48';
UPDATE "user_stage_exam_attempts" SET "stage_label" = '__renum__Chặng 38' WHERE "track" = 'professional' AND "stage_label" = 'Chặng 49';
UPDATE "user_stage_exam_attempts" SET "stage_label" = substr("stage_label", 10) WHERE "track" = 'professional' AND substr("stage_label", 1, 9) = '__renum__';
