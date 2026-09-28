#!/usr/bin/env node
/**
 * Sinh SQL đồng bộ bảng `lessons` trên D1 với kho bài hiện tại (lib/lessons-data).
 *
 *   node scripts/generate-lesson-data.mjs && node scripts/d1/build-lessons-sync-sql.mjs
 *   npx wrangler d1 execute tu-hoc-cong-nghe --remote --file=backups/sync-lessons.sql
 *
 * Vì sao cần: bảng `lessons` trên D1 được nạp từ trang cũ (325 dòng, tiêu đề
 * cũ), trong khi kho bài đã là 653 bài công nghệ. Trang Thống kê
 * và trang quản trị đọc tiêu đề/slug từ bảng này, nên chúng hiện tên bài cũ.
 *
 * Cùng cách ánh xạ cột với app/api/admin/sync-lessons/route.ts - route đó cần
 * ADMIN_SYNC_SECRET, còn tệp SQL này chạy được ngay bằng wrangler.
 *
 * Upsert theo id rồi xoá các dòng không còn trong kho. Dòng nào còn được
 * lesson_videos hoặc bảng tiến độ trỏ tới thì giữ (không phá khoá ngoại).
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const DIR = "lib/lessons-data";
const q = (v) => (v === null || v === undefined ? "NULL" : `'${String(v).replace(/'/g, "''")}'`);
const j = (v) => (v === null || v === undefined ? "NULL" : q(JSON.stringify(v)));
const n = (v) => (Number.isFinite(Number(v)) ? String(Number(v)) : "NULL");

const lessons = readdirSync(DIR)
  .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
  .map((f) => JSON.parse(readFileSync(join(DIR, f), "utf8")))
  .sort((a, b) => a.id - b.id);

const cols = [
  "id", "slug", "title", "subtitle", "stage_number", "day_number", "duration", "difficulty", "emoji",
  "opening_question", "opening_options", "correct_option", "explanation", "key_takeaways", "status", "track",
];
const rows = lessons.map((l) =>
  `(${[
    n(l.id), q(l.slug), q(l.title), q(l.subtitle), n(Math.ceil(l.id / 20)), n(l.id), q(l.duration), q(l.difficulty),
    q(l.emoji), q(l.openingQuestion), j(l.openingOptions), n(l.correctOption), q(l.explanation), j(l.keyTakeaways),
    q("published"), q(l.resolvedTrack ?? l.track),
  ].join(", ")})`
);

const ids = lessons.map((l) => l.id).join(", ");
const sql = [
  `-- Sinh bởi scripts/d1/build-lessons-sync-sql.mjs - ${lessons.length} bài.`,
  "PRAGMA defer_foreign_keys = true;",
  ...rows.map(
    (r) =>
      `INSERT INTO lessons (${cols.join(", ")}) VALUES ${r}\n  ON CONFLICT(id) DO UPDATE SET ${cols
        .filter((c) => c !== "id")
        .map((c) => `${c} = excluded.${c}`)
        .join(", ")}, updated_at = CURRENT_TIMESTAMP;`
  ),
  `DELETE FROM lessons WHERE id NOT IN (${ids})
  AND id NOT IN (SELECT lesson_id FROM lesson_videos)
  AND id NOT IN (SELECT lesson_id FROM user_progress)
  AND id NOT IN (SELECT prerequisite_id FROM lessons WHERE prerequisite_id IS NOT NULL);`,
  "",
].join("\n");

mkdirSync("backups", { recursive: true });
writeFileSync("backups/sync-lessons.sql", sql);
console.log(`backups/sync-lessons.sql: ${lessons.length} bài`);
