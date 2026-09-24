-- Ràng buộc UNIQUE, trích từ 127 migration trong supabase/migrations.
-- ĐỪNG sửa tay: chạy lại scripts/d1/generate-unique-indexes.mjs.
--
-- VÌ SAO CẦN TỆP NÀY. 0001_schema.sql sinh từ bản chụp PostgREST, mà PostgREST
-- KHÔNG phơi index lẫn ràng buộc duy nhất - nên lược đồ D1 có 88 bảng và 0
-- UNIQUE. Hậu quả không phải hiệu năng mà là tính đúng đắn:
--
--   * `ON CONFLICT (...)` NÉM LỖI 'does not match any PRIMARY KEY or UNIQUE
--     constraint'. Chín chỗ trong các hàm RPC dùng nó.
--   * Không có UNIQUE thì mọi upsert nhân bản dòng, và unique index KHÔNG
--     thêm được sau khi dữ liệu trùng đã lọt vào.
--
-- Nên tệp này phải chạy TRƯỚC khi nạp dữ liệu, không phải sau.

CREATE UNIQUE INDEX IF NOT EXISTS "cfa_module_bookmarks_user_id_module_id_uidx" ON "cfa_module_bookmarks" ("user_id", "module_id");
CREATE UNIQUE INDEX IF NOT EXISTS "cfa_module_progress_user_id_module_id_uidx" ON "cfa_module_progress" ("user_id", "module_id");
CREATE UNIQUE INDEX IF NOT EXISTS "cfa_module_recalls_user_id_module_id_uidx" ON "cfa_module_recalls" ("user_id", "module_id");
CREATE UNIQUE INDEX IF NOT EXISTS "chat_message_reactions_message_id_user_id_emoji_uidx" ON "chat_message_reactions" ("message_id", "user_id", "emoji");
CREATE UNIQUE INDEX IF NOT EXISTS "coin_grants_once_per_ref" ON "coin_grants" ("user_id", "source", "ref") where ref is not null;
CREATE UNIQUE INDEX IF NOT EXISTS "financial_guilds_name_uidx" ON "financial_guilds" ("name");
CREATE UNIQUE INDEX IF NOT EXISTS "focus_sessions_one_open_per_user" ON "focus_sessions" ("user_id") where ended_at is null;
CREATE UNIQUE INDEX IF NOT EXISTS "gamification_assets_asset_key_uidx" ON "gamification_assets" ("asset_key");
CREATE UNIQUE INDEX IF NOT EXISTS "guild_members_user_id_uidx" ON "guild_members" ("user_id");
CREATE UNIQUE INDEX IF NOT EXISTS "lesson_bookmarks_user_id_lesson_id_uidx" ON "lesson_bookmarks" ("user_id", "lesson_id");
CREATE UNIQUE INDEX IF NOT EXISTS "lesson_completion_appeals_user_id_lesson_id_status_uidx" ON "lesson_completion_appeals" ("user_id", "lesson_id", "status");
CREATE UNIQUE INDEX IF NOT EXISTS "lesson_manual_flags_user_id_lesson_id_uidx" ON "lesson_manual_flags" ("user_id", "lesson_id");
CREATE UNIQUE INDEX IF NOT EXISTS "lessons_slug_uidx" ON "lessons" ("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "push_subscriptions_endpoint_uidx" ON "push_subscriptions" ("endpoint");
CREATE UNIQUE INDEX IF NOT EXISTS "quiz_mistakes_user_lesson_question_key" ON "quiz_mistakes" ("user_id", "lesson_id", "question_index");
CREATE UNIQUE INDEX IF NOT EXISTS "reading_progress_user_id_lesson_id_uidx" ON "reading_progress" ("user_id", "lesson_id");
CREATE UNIQUE INDEX IF NOT EXISTS "referrals_referred_id_key" ON "referrals" ("referred_id");
CREATE UNIQUE INDEX IF NOT EXISTS "study_room_checkins_room_id_user_id_day_key_uidx" ON "study_room_checkins" ("room_id", "user_id", "day_key");
CREATE UNIQUE INDEX IF NOT EXISTS "study_room_members_one_active_idx" ON "study_room_members" ("user_id") where left_at is null;
CREATE UNIQUE INDEX IF NOT EXISTS "study_room_message_reactions_message_id_user_id_emoji_uidx" ON "study_room_message_reactions" ("message_id", "user_id", "emoji");
CREATE UNIQUE INDEX IF NOT EXISTS "study_room_reward_claims_room_id_week_start_uidx" ON "study_room_reward_claims" ("room_id", "week_start");
CREATE UNIQUE INDEX IF NOT EXISTS "user_career_mission_claims_user_id_week_key_mission_id_uidx" ON "user_career_mission_claims" ("user_id", "week_key", "mission_id");
CREATE UNIQUE INDEX IF NOT EXISTS "user_challenge_attempts_user_id_challenge_id_uidx" ON "user_challenge_attempts" ("user_id", "challenge_id");
CREATE UNIQUE INDEX IF NOT EXISTS "user_challenge_passes_user_id_lesson_id_uidx" ON "user_challenge_passes" ("user_id", "lesson_id");
CREATE UNIQUE INDEX IF NOT EXISTS "user_domain_mastery_user_id_domain_type_uidx" ON "user_domain_mastery" ("user_id", "domain_type");
CREATE UNIQUE INDEX IF NOT EXISTS "user_equipments_user_id_slot_uidx" ON "user_equipments" ("user_id", "slot");
CREATE UNIQUE INDEX IF NOT EXISTS "user_flashcards_user_id_term_uidx" ON "user_flashcards" ("user_id", "term");
CREATE UNIQUE INDEX IF NOT EXISTS "user_friendships_pair_idx" ON "user_friendships" ("user_a", "user_b");
CREATE UNIQUE INDEX IF NOT EXISTS "user_inventories_user_id_asset_id_uidx" ON "user_inventories" ("user_id", "asset_id");
CREATE UNIQUE INDEX IF NOT EXISTS "user_lesson_recalls_user_id_lesson_id_uidx" ON "user_lesson_recalls" ("user_id", "lesson_id");
CREATE UNIQUE INDEX IF NOT EXISTS "user_lesson_unlocks_user_id_lesson_id_uidx" ON "user_lesson_unlocks" ("user_id", "lesson_id");
CREATE UNIQUE INDEX IF NOT EXISTS "user_level_exams_user_id_level_uidx" ON "user_level_exams" ("user_id", "level");
CREATE UNIQUE INDEX IF NOT EXISTS "user_milestone_exams_user_id_track_id_stage_label_uidx" ON "user_milestone_exams" ("user_id", "track_id", "stage_label");
CREATE UNIQUE INDEX IF NOT EXISTS "user_onboarding_user_id_uidx" ON "user_onboarding" ("user_id");
CREATE UNIQUE INDEX IF NOT EXISTS "user_progress_user_id_lesson_id_uidx" ON "user_progress" ("user_id", "lesson_id");
CREATE UNIQUE INDEX IF NOT EXISTS "user_quest_completions_user_id_quest_type_day_key_uidx" ON "user_quest_completions" ("user_id", "quest_type", "day_key");
CREATE UNIQUE INDEX IF NOT EXISTS "user_stats_user_id_uidx" ON "user_stats" ("user_id");
CREATE UNIQUE INDEX IF NOT EXISTS "user_streaks_user_id_uidx" ON "user_streaks" ("user_id");
