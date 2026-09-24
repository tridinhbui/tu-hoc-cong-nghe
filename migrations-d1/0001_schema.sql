-- Sinh bởi scripts/d1/generate-schema.mjs - ĐỪNG sửa tay.
-- Nguồn: bản chụp PostgREST ngày 2026-08-22.
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS "Book" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "coverImage" TEXT,
  "level" TEXT,
  "createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "LessonContent" (
  "id" TEXT NOT NULL,
  "moduleId" TEXT REFERENCES "Module"("id"),
  "content" TEXT NOT NULL,
  "updatedAt" TEXT DEFAULT CURRENT_TIMESTAMP,
  "videoUrl" TEXT,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Module" (
  "id" TEXT NOT NULL,
  "readingId" TEXT REFERENCES "Reading"("id"),
  "code" TEXT,
  "title" TEXT NOT NULL,
  "order" INTEGER,
  "createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
  "videoUrl" TEXT,
  "interactiveType" TEXT,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ModuleQuizHeader" (
  "id" TEXT NOT NULL,
  "moduleId" TEXT REFERENCES "Module"("id"),
  "title" TEXT NOT NULL,
  "studyNotes" TEXT,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ModuleQuizQuestion" (
  "id" TEXT NOT NULL,
  "headerId" TEXT REFERENCES "ModuleQuizHeader"("id"),
  "questionNo" INTEGER NOT NULL,
  "prompt" TEXT NOT NULL,
  "optionA" TEXT NOT NULL,
  "optionB" TEXT NOT NULL,
  "optionC" TEXT NOT NULL,
  "correct" TEXT NOT NULL,
  "explanation" TEXT,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Reading" (
  "id" TEXT NOT NULL,
  "bookId" TEXT REFERENCES "Book"("id"),
  "code" TEXT,
  "title" TEXT NOT NULL,
  "order" INTEGER,
  "pageStart" INTEGER,
  "pageEnd" INTEGER,
  "createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "announcement_reads" (
  "announcement_id" INTEGER NOT NULL REFERENCES "announcements"("id"),
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "read_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("announcement_id", "user_id")
);

CREATE TABLE IF NOT EXISTS "announcements" (
  "id" INTEGER PRIMARY KEY,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "severity" TEXT NOT NULL DEFAULT 'info',
  "created_by" TEXT REFERENCES "user_profiles"("id"),
  "active" INTEGER NOT NULL DEFAULT 1,
  "expires_at" TEXT,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "budget_plans" (
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "monthly_income" REAL NOT NULL,
  "needs_amount" REAL NOT NULL,
  "wants_amount" REAL NOT NULL,
  "savings_amount" REAL NOT NULL,
  "updated_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("user_id")
);

CREATE TABLE IF NOT EXISTS "bug_report_messages" (
  "id" INTEGER PRIMARY KEY,
  "bug_report_id" INTEGER NOT NULL REFERENCES "bug_reports"("id"),
  "user_id" TEXT,
  "sender" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "bug_reports" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "page_path" TEXT,
  "status" TEXT NOT NULL DEFAULT 'open',
  "severity" TEXT NOT NULL DEFAULT 'medium',
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "cfa_module_bookmarks" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "module_id" TEXT NOT NULL,
  "module_title" TEXT NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "cfa_module_highlights" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "module_id" TEXT NOT NULL,
  "quote" TEXT NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "cfa_module_notes" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "module_id" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "cfa_module_progress" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "module_id" TEXT NOT NULL REFERENCES "Module"("id"),
  "completed" INTEGER NOT NULL DEFAULT 0,
  "quiz_score" INTEGER,
  "quiz_total" INTEGER,
  "completed_at" TEXT,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "cfa_module_recalls" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "module_id" TEXT NOT NULL,
  "recall_stage" INTEGER NOT NULL DEFAULT 1,
  "next_recall_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "chat_message_reactions" (
  "id" INTEGER PRIMARY KEY,
  "message_id" INTEGER NOT NULL REFERENCES "chat_messages"("id"),
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "emoji" TEXT NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "chat_messages" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "sender" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "read" INTEGER DEFAULT 0,
  "created_at" TEXT DEFAULT CURRENT_TIMESTAMP,
  "image_url" TEXT
);

CREATE TABLE IF NOT EXISTS "coin_grants" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "source" TEXT NOT NULL,
  "ref" TEXT,
  "amount" INTEGER NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "community_notifications" (
  "id" INTEGER PRIMARY KEY,
  "recipient_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "actor_id" TEXT REFERENCES "user_profiles"("id"),
  "type" TEXT NOT NULL,
  "post_id" INTEGER REFERENCES "community_posts"("id"),
  "comment_id" INTEGER REFERENCES "community_post_comments"("id"),
  "emoji" TEXT,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "read_at" TEXT,
  "lesson_slug" TEXT,
  "detail" TEXT
);

CREATE TABLE IF NOT EXISTS "community_post_comments" (
  "id" INTEGER PRIMARY KEY,
  "post_id" INTEGER NOT NULL REFERENCES "community_posts"("id"),
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "content" TEXT NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "edited_at" TEXT
);

CREATE TABLE IF NOT EXISTS "community_post_reactions" (
  "post_id" INTEGER NOT NULL REFERENCES "community_posts"("id"),
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "emoji" TEXT NOT NULL DEFAULT '👍',
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("post_id", "user_id")
);

CREATE TABLE IF NOT EXISTS "community_posts" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "kind" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "metadata" TEXT,
  "is_hidden" INTEGER NOT NULL DEFAULT 0,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "edited_at" TEXT
);

CREATE TABLE IF NOT EXISTS "contact_messages" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT,
  "name" TEXT NOT NULL,
  "email" TEXT,
  "subject" TEXT,
  "message" TEXT NOT NULL,
  "is_read" INTEGER NOT NULL DEFAULT 0,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "direct_messages" (
  "id" INTEGER PRIMARY KEY,
  "friendship_id" INTEGER NOT NULL REFERENCES "user_friendships"("id"),
  "sender_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "content" TEXT NOT NULL,
  "read_by_recipient" INTEGER NOT NULL DEFAULT 0,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "documents" (
  "id" INTEGER PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "category" TEXT NOT NULL DEFAULT 'khac',
  "file_url" TEXT NOT NULL,
  "file_name" TEXT NOT NULL,
  "file_size" INTEGER NOT NULL DEFAULT 0,
  "download_count" INTEGER NOT NULL DEFAULT 0,
  "uploaded_by" TEXT,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "status" TEXT NOT NULL DEFAULT 'approved',
  "image_url" TEXT
);

CREATE TABLE IF NOT EXISTS "emergency_funds" (
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "monthly_expenses" REAL NOT NULL,
  "target_months" REAL NOT NULL DEFAULT 6,
  "current_saved" REAL NOT NULL DEFAULT 0,
  "updated_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("user_id")
);

CREATE TABLE IF NOT EXISTS "feature_click_events" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT REFERENCES "user_profiles"("id"),
  "event_name" TEXT NOT NULL,
  "metadata" TEXT NOT NULL DEFAULT '{}',
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "financial_guilds" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "tag" TEXT NOT NULL,
  "logo_emoji" TEXT DEFAULT '🏰',
  "leader_id" TEXT REFERENCES "user_profiles"("id"),
  "level" INTEGER DEFAULT 1,
  "total_xp" INTEGER DEFAULT 0,
  "guild_coins" INTEGER DEFAULT 0,
  "created_at" TEXT DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "focus_sessions" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "world" TEXT NOT NULL,
  "room_key" TEXT,
  "started_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "ended_at" TEXT,
  "seconds" INTEGER,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "game_sessions" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "game_type" TEXT NOT NULL,
  "score" INTEGER NOT NULL,
  "total" INTEGER NOT NULL,
  "xp_earned" INTEGER NOT NULL DEFAULT 0,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "gamification_assets" (
  "id" TEXT NOT NULL,
  "asset_type" TEXT NOT NULL,
  "asset_key" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "rarity" TEXT NOT NULL DEFAULT 'common',
  "domain_type" TEXT,
  "image_url" TEXT,
  "metadata" TEXT,
  "created_at" TEXT DEFAULT CURRENT_TIMESTAMP,
  "price" INTEGER,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "guild_members" (
  "id" INTEGER PRIMARY KEY,
  "guild_id" TEXT NOT NULL REFERENCES "financial_guilds"("id"),
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "role" TEXT DEFAULT 'member',
  "joined_at" TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "leaderboard_cache" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "rank" INTEGER,
  "total_xp" INTEGER,
  "lessons_completed" INTEGER,
  "avg_quiz_score" REAL,
  "updated_at" TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "lesson_bookmarks" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "lesson_id" INTEGER NOT NULL,
  "lesson_slug" TEXT NOT NULL,
  "lesson_title" TEXT NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "lesson_completion_appeals" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "lesson_id" INTEGER NOT NULL,
  "lesson_slug" TEXT NOT NULL,
  "note" TEXT,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "admin_note" TEXT,
  "reviewed_by" TEXT REFERENCES "user_profiles"("id"),
  "reviewed_at" TEXT,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "lesson_feedback" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT,
  "lesson_id" INTEGER NOT NULL,
  "rating" INTEGER NOT NULL,
  "comment" TEXT,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "lesson_highlights" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "lesson_id" INTEGER NOT NULL,
  "lesson_slug" TEXT NOT NULL,
  "quote" TEXT NOT NULL,
  "kind" TEXT NOT NULL DEFAULT 'important',
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "report_status" TEXT NOT NULL DEFAULT 'open',
  "resolved_at" TEXT,
  "resolved_by" TEXT REFERENCES "user_profiles"("id")
);

CREATE TABLE IF NOT EXISTS "lesson_manual_flags" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "lesson_id" INTEGER NOT NULL,
  "lesson_slug" TEXT NOT NULL,
  "lesson_title" TEXT NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "lesson_notes" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "lesson_id" INTEGER NOT NULL,
  "lesson_slug" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "lesson_unlock_requests" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "lesson_id" INTEGER NOT NULL REFERENCES "lessons"("id"),
  "note" TEXT,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "resolved_at" TEXT
);

CREATE TABLE IF NOT EXISTS "lesson_videos" (
  "lesson_id" INTEGER PRIMARY KEY,
  "video_url" TEXT NOT NULL,
  "updated_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "lessons" (
  "id" INTEGER PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "subtitle" TEXT,
  "stage_number" INTEGER NOT NULL,
  "day_number" INTEGER NOT NULL,
  "duration" TEXT,
  "difficulty" TEXT,
  "emoji" TEXT,
  "opening_question" TEXT,
  "opening_options" TEXT,
  "correct_option" INTEGER,
  "explanation" TEXT,
  "key_takeaways" TEXT,
  "status" TEXT DEFAULT 'draft',
  "created_at" TEXT DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TEXT DEFAULT CURRENT_TIMESTAMP,
  "track" TEXT,
  "is_fundamental" INTEGER NOT NULL DEFAULT 0,
  "prerequisite_id" INTEGER REFERENCES "lessons"("id"),
  "is_visible" INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS "net_worth_snapshots" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "total_assets" REAL NOT NULL,
  "total_liabilities" REAL NOT NULL,
  "net_worth" REAL,
  "assets_breakdown" TEXT NOT NULL DEFAULT '{}',
  "liabilities_breakdown" TEXT NOT NULL DEFAULT '{}',
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "notification_preferences" (
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "email_reminders_enabled" INTEGER NOT NULL DEFAULT 0,
  "browser_reminders_enabled" INTEGER NOT NULL DEFAULT 0,
  "last_reminder_sent_at" TEXT,
  "updated_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "weekly_digest_enabled" INTEGER DEFAULT 0,
  "morning_review_enabled" INTEGER NOT NULL DEFAULT 0,
  "last_morning_review_sent_at" TEXT,
  "last_weekly_digest_sent_at" TEXT,
  PRIMARY KEY ("user_id")
);

CREATE TABLE IF NOT EXISTS "push_subscriptions" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "endpoint" TEXT NOT NULL,
  "p256dh" TEXT NOT NULL,
  "auth" TEXT NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "pvp_duels" (
  "id" TEXT NOT NULL,
  "challenger_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "opponent_id" TEXT REFERENCES "user_profiles"("id"),
  "winner_id" TEXT REFERENCES "user_profiles"("id"),
  "wager_coins" INTEGER DEFAULT 50,
  "status" TEXT DEFAULT 'completed',
  "challenger_score" INTEGER DEFAULT 0,
  "opponent_score" INTEGER DEFAULT 0,
  "created_at" TEXT DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "quiz_mistakes" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "lesson_id" INTEGER NOT NULL,
  "question_index" INTEGER NOT NULL,
  "wrong_count" INTEGER NOT NULL DEFAULT 1,
  "resolved" INTEGER NOT NULL DEFAULT 0,
  "first_wrong_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_attempt_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "question_hash" TEXT
);

CREATE TABLE IF NOT EXISTS "reading_progress" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "lesson_id" INTEGER NOT NULL,
  "scroll_percent" INTEGER DEFAULT 0,
  "max_percent_reached" INTEGER DEFAULT 0,
  "milestone_25" INTEGER DEFAULT 0,
  "milestone_50" INTEGER DEFAULT 0,
  "milestone_75" INTEGER DEFAULT 0,
  "milestone_100" INTEGER DEFAULT 0,
  "last_read_at" TEXT DEFAULT CURRENT_TIMESTAMP,
  "created_at" TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "referrals" (
  "id" INTEGER PRIMARY KEY,
  "referrer_id" TEXT NOT NULL,
  "referred_id" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "rewarded_at" TEXT
);

CREATE TABLE IF NOT EXISTS "study_room_checkins" (
  "id" INTEGER PRIMARY KEY,
  "room_id" INTEGER NOT NULL REFERENCES "study_rooms"("id"),
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "day_key" TEXT NOT NULL DEFAULT 'CURRENT_DATE',
  "source" TEXT NOT NULL DEFAULT 'chat',
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "study_room_members" (
  "id" INTEGER PRIMARY KEY,
  "room_id" INTEGER NOT NULL REFERENCES "study_rooms"("id"),
  "user_id" TEXT NOT NULL,
  "joined_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "left_at" TEXT
);

CREATE TABLE IF NOT EXISTS "study_room_message_reactions" (
  "id" INTEGER PRIMARY KEY,
  "message_id" INTEGER NOT NULL REFERENCES "study_room_messages"("id"),
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "emoji" TEXT NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "study_room_messages" (
  "id" INTEGER PRIMARY KEY,
  "room_id" INTEGER NOT NULL REFERENCES "study_rooms"("id"),
  "sender_id" TEXT REFERENCES "user_profiles"("id"),
  "content" TEXT NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "is_bot" INTEGER NOT NULL DEFAULT 0,
  "is_pinned" INTEGER NOT NULL DEFAULT 0,
  "image_url" TEXT,
  "reply_to_id" INTEGER REFERENCES "study_room_messages"("id"),
  "file_url" TEXT,
  "file_name" TEXT
);

CREATE TABLE IF NOT EXISTS "study_room_notes" (
  "id" INTEGER PRIMARY KEY,
  "room_id" INTEGER NOT NULL REFERENCES "study_rooms"("id"),
  "author_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "content" TEXT NOT NULL,
  "color" TEXT NOT NULL DEFAULT 'emerald',
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "study_room_pomodoro" (
  "room_id" INTEGER PRIMARY KEY REFERENCES "study_rooms"("id"),
  "mode" TEXT NOT NULL DEFAULT 'focus',
  "is_running" INTEGER NOT NULL DEFAULT 0,
  "duration_seconds" INTEGER NOT NULL DEFAULT 1500,
  "remaining_seconds" INTEGER NOT NULL DEFAULT 1500,
  "started_at" TEXT,
  "updated_by" TEXT REFERENCES "user_profiles"("id"),
  "updated_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "study_room_quiz_attempts" (
  "id" INTEGER PRIMARY KEY,
  "room_id" INTEGER NOT NULL REFERENCES "study_rooms"("id"),
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "track" TEXT NOT NULL DEFAULT 'personal',
  "score" INTEGER NOT NULL,
  "total" INTEGER NOT NULL,
  "percent" INTEGER NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "study_room_reward_claims" (
  "id" INTEGER PRIMARY KEY,
  "room_id" INTEGER NOT NULL REFERENCES "study_rooms"("id"),
  "week_start" TEXT NOT NULL,
  "claimed_by" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "xp_reward" INTEGER NOT NULL DEFAULT 150,
  "coin_reward" INTEGER NOT NULL DEFAULT 25,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "study_rooms" (
  "id" INTEGER PRIMARY KEY,
  "topic" TEXT NOT NULL,
  "weekly_xp_goal" INTEGER NOT NULL DEFAULT 500,
  "max_members" INTEGER NOT NULL DEFAULT 5,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "streak_weeks" INTEGER NOT NULL DEFAULT 0,
  "is_permanent" INTEGER NOT NULL DEFAULT 0,
  "leader_id" TEXT REFERENCES "user_profiles"("id"),
  "consecutive_weeks_hit" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "user_badges" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "badge_key" TEXT NOT NULL,
  "badge_name" TEXT NOT NULL,
  "badge_description" TEXT,
  "badge_icon" TEXT DEFAULT '🏆',
  "earned_at" TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_career_goals" (
  "user_id" TEXT NOT NULL,
  "career_id" TEXT NOT NULL,
  "set_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("user_id")
);

CREATE TABLE IF NOT EXISTS "user_career_mission_claims" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "week_key" TEXT NOT NULL,
  "mission_id" TEXT NOT NULL,
  "xp_earned" INTEGER NOT NULL,
  "coin_earned" INTEGER NOT NULL DEFAULT 0,
  "claimed_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_challenge_attempts" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "challenge_id" TEXT NOT NULL REFERENCES "weekly_challenges"("id"),
  "score" INTEGER NOT NULL,
  "xp_earned" INTEGER DEFAULT 0,
  "coins_earned" INTEGER DEFAULT 0,
  "completed_at" TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_challenge_passes" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "lesson_id" INTEGER NOT NULL,
  "score" INTEGER NOT NULL,
  "total" INTEGER NOT NULL,
  "passed_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_chests" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "source" TEXT NOT NULL,
  "earned_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "opened" INTEGER NOT NULL DEFAULT 0,
  "opened_at" TEXT,
  "reward_type" TEXT,
  "reward_value" TEXT,
  "xp_earned" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "user_cv_bullets" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "career_id" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_domain_mastery" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "domain_type" TEXT NOT NULL,
  "current_xp" INTEGER DEFAULT 0,
  "current_level" INTEGER DEFAULT 1,
  "updated_at" TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_equipments" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "slot" TEXT NOT NULL,
  "asset_key" TEXT NOT NULL,
  "equipped_at" TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_flashcards" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "term" TEXT NOT NULL,
  "definition" TEXT NOT NULL,
  "interval" INTEGER NOT NULL DEFAULT 1,
  "ease_factor" REAL NOT NULL DEFAULT 2.5,
  "repetitions" INTEGER NOT NULL DEFAULT 0,
  "next_review_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_follows" (
  "follower_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "followed_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("follower_id", "followed_id")
);

CREATE TABLE IF NOT EXISTS "user_friendships" (
  "id" INTEGER PRIMARY KEY,
  "user_a" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "user_b" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "requested_by" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "status" TEXT NOT NULL DEFAULT 'pending',
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "responded_at" TEXT
);

CREATE TABLE IF NOT EXISTS "user_ib_question_attempts" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "question_id" INTEGER NOT NULL,
  "category" TEXT NOT NULL,
  "correct" INTEGER NOT NULL,
  "answered_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_inventories" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "asset_id" TEXT NOT NULL REFERENCES "gamification_assets"("id"),
  "acquired_at" TEXT DEFAULT CURRENT_TIMESTAMP,
  "is_equipped" INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "user_lesson_recalls" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "lesson_id" INTEGER NOT NULL,
  "recall_stage" INTEGER NOT NULL DEFAULT 1,
  "next_recall_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_lesson_unlocks" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "lesson_id" INTEGER NOT NULL REFERENCES "lessons"("id"),
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_level_exams" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "level" INTEGER NOT NULL,
  "score" INTEGER NOT NULL,
  "source" TEXT NOT NULL DEFAULT 'server_graded',
  "passed_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_milestone_exams" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "track_id" TEXT NOT NULL,
  "stage_label" TEXT NOT NULL,
  "score" REAL NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_onboarding" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "completed" INTEGER NOT NULL DEFAULT 0,
  "selected_track" TEXT,
  "completed_at" TEXT,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "user_profiles" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "full_name" TEXT,
  "avatar_url" TEXT,
  "bio" TEXT,
  "current_level" INTEGER DEFAULT 1,
  "total_xp" INTEGER DEFAULT 0,
  "lessons_completed" INTEGER DEFAULT 0,
  "avg_quiz_score" REAL DEFAULT 0,
  "current_stage" INTEGER DEFAULT 1,
  "preferred_track" TEXT DEFAULT 'personal',
  "dark_mode" INTEGER DEFAULT 0,
  "created_at" TEXT DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TEXT DEFAULT CURRENT_TIMESTAMP,
  "role" TEXT NOT NULL DEFAULT 'user',
  "is_disabled" INTEGER NOT NULL DEFAULT 0,
  "last_login_at" TEXT,
  "tour_flags" TEXT NOT NULL DEFAULT '{}',
  "discovered_buildings" TEXT,
  "coins" INTEGER DEFAULT 0,
  "last_seen_at" TEXT,
  "preferred_locale" TEXT NOT NULL DEFAULT 'vi',
  "learning_track" TEXT,
  "learning_pace_per_day" INTEGER,
  "learning_pace_days_per_week" INTEGER,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "user_progress" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "lesson_id" INTEGER NOT NULL,
  "completed" INTEGER DEFAULT 0,
  "completed_at" TEXT,
  "quiz_score" INTEGER,
  "time_spent_seconds" INTEGER,
  "created_at" TEXT DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_quest_completions" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "quest_type" TEXT NOT NULL,
  "day_key" TEXT NOT NULL,
  "xp_earned" INTEGER NOT NULL,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_quiz_sessions" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "track" TEXT NOT NULL,
  "difficulty" TEXT NOT NULL,
  "score" INTEGER NOT NULL,
  "total" INTEGER NOT NULL,
  "xp_earned" INTEGER NOT NULL,
  "completed_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "source" TEXT
);

CREATE TABLE IF NOT EXISTS "user_stage_exam_attempts" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "track" TEXT NOT NULL,
  "stage_label" TEXT NOT NULL,
  "score" INTEGER NOT NULL,
  "total" INTEGER NOT NULL,
  "passed" INTEGER NOT NULL,
  "attempted_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user_stats" (
  "id" INTEGER PRIMARY KEY,
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "total_lessons_completed" INTEGER DEFAULT 0,
  "total_xp" INTEGER DEFAULT 0,
  "current_level" INTEGER DEFAULT 1,
  "avg_quiz_score" REAL DEFAULT 0,
  "longest_streak" INTEGER DEFAULT 0,
  "last_lesson_date" TEXT,
  "total_study_time_hours" INTEGER DEFAULT 0,
  "created_at" TEXT DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TEXT DEFAULT CURRENT_TIMESTAMP,
  "xp_spent" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "user_streaks" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "current_streak" INTEGER NOT NULL DEFAULT 0,
  "longest_streak" INTEGER NOT NULL DEFAULT 0,
  "last_activity_date" TEXT,
  "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_streak_before_break" INTEGER,
  "freezes_used" INTEGER NOT NULL DEFAULT 0,
  "last_milestone_notified" INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "weekly_challenges" (
  "id" TEXT NOT NULL,
  "week_start_date" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "difficulty" TEXT NOT NULL,
  "case_study_url" TEXT,
  "questions" TEXT NOT NULL,
  "xp_reward" INTEGER DEFAULT 200,
  "coin_reward" INTEGER DEFAULT 50,
  "created_at" TEXT DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "world_boss_damage_logs" (
  "id" INTEGER PRIMARY KEY,
  "boss_id" TEXT NOT NULL REFERENCES "world_bosses"("id"),
  "user_id" TEXT NOT NULL REFERENCES "user_profiles"("id"),
  "damage_dealt" INTEGER NOT NULL,
  "score" INTEGER NOT NULL,
  "created_at" TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "world_bosses" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "boss_emoji" TEXT DEFAULT '🐉',
  "max_hp" INTEGER NOT NULL DEFAULT 1000000,
  "current_hp" INTEGER NOT NULL DEFAULT 1000000,
  "start_date" TEXT NOT NULL,
  "end_date" TEXT NOT NULL,
  "is_active" INTEGER DEFAULT 1,
  "created_at" TEXT DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);
