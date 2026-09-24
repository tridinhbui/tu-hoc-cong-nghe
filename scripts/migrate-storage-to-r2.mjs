#!/usr/bin/env node
// Di chuyển tệp nhị phân từ Supabase Storage sang R2, một lần duy nhất.
//
// VÌ SAO CẦN. Dữ liệu đã xuất sang D1 giữ nguyên URL Supabase Storage trong
// user_profiles.avatar_url, documents.file_url/image_url, và
// chat_messages.image_url - mã ứng dụng đã đổi để tải lên MỚI đi qua R2
// (xem lib/r2/storage.ts), nhưng tệp CŨ chưa từng được chuyển nội dung nhị
// phân. Cắt Supabase là toàn bộ số đó thành liên kết chết ngay lập tức.
//
// CƠ CHẾ. Với mỗi URL dạng .../object/public/<bucket>/<path>, tải qua fetch
// công khai (không cần khoá Supabase - bucket đều public-read), ghi vào R2
// dưới đúng khoá <bucket>/<path> bằng `wrangler r2 object put --remote`, rồi
// sinh câu UPDATE trỏ cột về /api/files/<bucket>/<path>.
//
// KHÔNG SỬA cấu trúc đường dẫn cũ (kể cả lồng "avatars/avatars/..." - lỗi có
// sẵn trong app cũ khi ghép filePath thủ công). Mục tiêu là bảo toàn nội
// dung, không phải dọn dẹp; dọn là việc khác, làm sau khi dữ liệu đã an toàn.
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const args = process.argv.slice(2);
const limit = Number(args.find((a) => a.startsWith("--limit="))?.split("=")[1] ?? Infinity);
const dryRun = args.includes("--dry-run");
const BUCKET = "thcn-files";
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://tuhoccongnghe.vn";

const SOURCES = [
  { file: "scripts/d1/data/user_profiles.jsonl", table: "user_profiles", pk: "id", column: "avatar_url" },
  { file: "scripts/d1/data/documents.jsonl", table: "documents", pk: "id", column: "file_url" },
  { file: "scripts/d1/data/documents.jsonl", table: "documents", pk: "id", column: "image_url" },
  { file: "scripts/d1/data/chat_messages.jsonl", table: "chat_messages", pk: "id", column: "image_url" },
];

const SUPA_RE = /^https:\/\/[a-z0-9]+\.supabase\.co\/storage\/v1\/object\/public\/([a-z0-9-]+)\/(.+)$/;

function readJsonl(path) {
  return readFileSync(path, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));
}
import { readFileSync } from "node:fs";

async function main() {
  const jobs = [];
  for (const src of SOURCES) {
    let rows;
    try { rows = readJsonl(src.file); } catch { continue; }
    for (const row of rows) {
      const url = row[src.column];
      if (typeof url !== "string") continue;
      const m = url.match(SUPA_RE);
      if (!m) continue;
      jobs.push({ ...src, id: row[src.pk], bucket: m[1], path: m[2], oldUrl: url });
    }
  }

  console.log(`Tổng cộng ${jobs.length} tệp cần chuyển.`);
  const slice = jobs.slice(0, limit);
  if (slice.length < jobs.length) console.log(`Giới hạn --limit: chạy ${slice.length} tệp đầu.`);

  const tmp = mkdtempSync(join(tmpdir(), "r2mig-"));
  const updates = []; // { table, pk, id, column, newUrl }
  let ok = 0, failed = 0, skippedExisting = 0;
  const seenKeys = new Set(); // tránh tải trùng khi nhiều dòng trỏ cùng một tệp

  for (const [i, job] of slice.entries()) {
    const key = `${job.bucket}/${job.path}`;
    const newUrl = `${SITE}/api/files/${key}`;
    process.stdout.write(`[${i + 1}/${slice.length}] ${key} `);

    if (dryRun) {
      console.log("(dry-run, bỏ qua tải)");
      updates.push({ ...job, newUrl });
      continue;
    }

    try {
      if (!seenKeys.has(key)) {
        const res = await fetch(job.oldUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        const contentType = res.headers.get("content-type") || "application/octet-stream";
        const localFile = join(tmp, `obj-${i}`);
        writeFileSync(localFile, buf);
        execFileSync(
          "npx",
          ["wrangler", "r2", "object", "put", `${BUCKET}/${key}`, "--file", localFile, "--content-type", contentType, "--remote"],
          { stdio: "pipe" }
        );
        seenKeys.add(key);
      }
      updates.push({ ...job, newUrl });
      ok++;
      console.log("✓");
    } catch (err) {
      failed++;
      console.log("✗ " + (err.message || err));
    }
  }

  rmSync(tmp, { recursive: true, force: true });

  console.log(`\nTải lên: ${ok} thành công, ${failed} lỗi, ${seenKeys.size} tệp duy nhất.`);

  if (updates.length) {
    const sqlPath = join(tmp === tmp ? "." : tmp, "r2-url-updates.sql");
    const lines = updates.map(
      (u) => `UPDATE "${u.table}" SET "${u.column}" = '${u.newUrl.replace(/'/g, "''")}' WHERE "${u.pk}" = '${String(u.id).replace(/'/g, "''")}';`
    );
    writeFileSync("scripts/d1/r2-url-updates.sql", lines.join("\n") + "\n");
    console.log(`Đã ghi ${lines.length} câu UPDATE vào scripts/d1/r2-url-updates.sql`);
    console.log(`Chạy: npx wrangler d1 execute tu-hoc-cong-nghe --remote --file=scripts/d1/r2-url-updates.sql`);
  }
}

main();
