-- Gỡ các bảng còn sót lại từ bản tài chính cũ.
--
-- Không mã nào còn đọc hay ghi các bảng này:
--   - thư viện module chứng chỉ cũ (Book, Reading, Module, LessonContent,
--     ModuleQuizHeader, ModuleQuizQuestion) và năm bảng tiến độ/ghi chú/đánh
--     dấu/ôn tập theo module;
--   - bang hội cũ (financial_guilds, guild_members) và bảng điểm theo lĩnh vực
--     tài chính (user_domain_mastery);
--   - ba bảng tài chính cá nhân (ngân sách, quỹ khẩn cấp, ảnh chụp tài sản).
--
-- Bảng lượt trả lời câu phỏng vấn vẫn dùng (/phong-van-ky-thuat), chỉ đổi tên
-- sang user_interview_question_attempts: tạo bảng mới, chép dữ liệu, xoá bảng cũ.
--
-- Thứ tự xoá: bảng con trước bảng cha, vì D1 bật khoá ngoại.
-- Chạy lại vô hại (IF EXISTS / IF NOT EXISTS). Riêng lệnh INSERT chỉ chạy được
-- khi bảng cũ còn, nên nếu chạy lại sau khi đã xoá bảng cũ, hãy bỏ qua lỗi
-- "no such table" của đúng lệnh đó - hoặc chạy cả tệp một lần như bình thường.

CREATE TABLE IF NOT EXISTS "user_interview_question_attempts" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "question_id" INTEGER NOT NULL,
  "category" TEXT NOT NULL,
  "correct" INTEGER NOT NULL,
  "answered_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO "user_interview_question_attempts" ("id", "user_id", "question_id", "category", "correct", "answered_at")
  SELECT "id", "user_id", "question_id", "category", "correct", "answered_at" FROM "user_ib_question_attempts";

DROP TABLE IF EXISTS "user_ib_question_attempts";

DROP TABLE IF EXISTS "cfa_module_progress";
DROP TABLE IF EXISTS "cfa_module_bookmarks";
DROP TABLE IF EXISTS "cfa_module_highlights";
DROP TABLE IF EXISTS "cfa_module_notes";
DROP TABLE IF EXISTS "cfa_module_recalls";

DROP TABLE IF EXISTS "LessonContent";
DROP TABLE IF EXISTS "ModuleQuizQuestion";
DROP TABLE IF EXISTS "ModuleQuizHeader";
DROP TABLE IF EXISTS "Module";
DROP TABLE IF EXISTS "Reading";
DROP TABLE IF EXISTS "Book";

DROP TABLE IF EXISTS "guild_members";
DROP TABLE IF EXISTS "financial_guilds";
DROP TABLE IF EXISTS "user_domain_mastery";

DROP TABLE IF EXISTS "budget_plans";
DROP TABLE IF EXISTS "emergency_funds";
DROP TABLE IF EXISTS "net_worth_snapshots";

-- Đổi các giá trị id cũ đã lưu sang id công nghệ (mã đọc cũng ánh xạ id cũ
-- qua lib/legacy-ids.ts và normalizeQuizTrack, nên thứ tự deploy/migrate không
-- quan trọng). OR IGNORE: coin_grants có unique (user_id, source, ref).
UPDATE "game_sessions" SET "game_type" = 'capacity-sizing' WHERE "game_type" = 'goldman-pitch';
UPDATE "game_sessions" SET "game_type" = 'backbone-routing' WHERE "game_type" = 'fed-vault-sim';
UPDATE "game_sessions" SET "game_type" = 'scenario-resource-floor' WHERE "game_type" = 'scenario-cme-commodities';
UPDATE "game_sessions" SET "game_type" = 'scenario-data-haven' WHERE "game_type" = 'scenario-swiss-haven';
UPDATE "game_sessions" SET "game_type" = 'scenario-cloud-capital' WHERE "game_type" = 'scenario-capitol-hill';

UPDATE OR IGNORE "coin_grants" SET "ref" = 'capacity-lab' WHERE "source" = 'building' AND "ref" = 'goldman-sachs';
UPDATE OR IGNORE "coin_grants" SET "ref" = 'backbone-hub' WHERE "source" = 'building' AND "ref" = 'fed-vault';
UPDATE OR IGNORE "coin_grants" SET "ref" = 'resource-floor' WHERE "source" = 'building' AND "ref" = 'cme-commodities';
UPDATE OR IGNORE "coin_grants" SET "ref" = 'data-haven' WHERE "source" = 'building' AND "ref" = 'swiss-haven';
UPDATE OR IGNORE "coin_grants" SET "ref" = 'cloud-capital' WHERE "source" = 'building' AND "ref" = 'capitol-hill';

UPDATE "user_quiz_sessions" SET "track" = 'interview' WHERE "track" = 'ib';
UPDATE "user_profiles" SET "preferred_track" = 'certification' WHERE "preferred_track" = 'cfa';
UPDATE "study_rooms" SET "topic" = 'certification' WHERE "topic" = 'cfa';

-- Năm danh hiệu rương mang tên cũ → tên hiện hành (lib/chests.ts).
UPDATE "user_chests" SET "reward_value" = 'Chiến thần commit' WHERE "reward_type" = 'title' AND "reward_value" = 'Chiến thần tích lũy';
UPDATE "user_chests" SET "reward_value" = 'Kẻ hủy diệt nợ kỹ thuật' WHERE "reward_type" = 'title' AND "reward_value" = 'Kẻ hủy diệt nợ nần';
UPDATE "user_chests" SET "reward_value" = 'Sói già Silicon Valley' WHERE "reward_type" = 'title' AND "reward_value" = 'Sói già phố Wall';
UPDATE "user_chests" SET "reward_value" = 'Đại gia thông lượng' WHERE "reward_type" = 'title' AND "reward_value" = 'Đại gia lãi kép';
UPDATE "user_chests" SET "reward_value" = 'Bậc thầy gỡ lỗi' WHERE "reward_type" = 'title' AND "reward_value" = 'Bậc thầy định giá';

-- Thẻ sưu tập: asset_key từng là mã cổ phiếu (card-fpt, card-vcb...), đổi theo công nghệ của thẻ.
UPDATE gamification_assets SET asset_key = 'card-python' WHERE asset_key = 'card-fpt';
UPDATE gamification_assets SET asset_key = 'card-postgresql' WHERE asset_key = 'card-vnm';
UPDATE gamification_assets SET asset_key = 'card-linux' WHERE asset_key = 'card-vcb';
UPDATE gamification_assets SET asset_key = 'card-docker' WHERE asset_key = 'card-hpg';
UPDATE gamification_assets SET asset_key = 'card-react' WHERE asset_key = 'card-mwg';
UPDATE gamification_assets SET asset_key = 'card-kubernetes' WHERE asset_key = 'card-msn';
UPDATE gamification_assets SET asset_key = 'card-aws' WHERE asset_key = 'card-vhm';
UPDATE gamification_assets SET asset_key = 'card-javascript' WHERE asset_key = 'card-ssi';
UPDATE gamification_assets SET asset_key = 'card-redis' WHERE asset_key = 'card-gas';
UPDATE gamification_assets SET asset_key = 'card-git' WHERE asset_key = 'card-vic';
