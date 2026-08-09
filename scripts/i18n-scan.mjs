#!/usr/bin/env node
// Reports UI files that still contain hard-coded Vietnamese, so the migration
// to lib/i18n has a number to drive down instead of a vibe.
//
//   node scripts/i18n-scan.mjs            # ranked summary
//   node scripts/i18n-scan.mjs <path>     # every string in one file
//
// Only scans UI (components/, app/). lib/lessons-data is lesson *content*,
// which is translated by a different mechanism entirely: a per-lesson patch
// under lib/lessons-i18n/<locale>/, merged by lib/lesson-translations.js. A
// dictionary is the wrong shape for it - these are 715 lessons of finance
// pedagogy, not labels - so counting those strings here would mix two backlogs
// with different units of work and no shared finish line.
//
// To measure lesson-translation progress instead:
//   ls lib/lessons-i18n/en/*.json | wc -l      # lessons translated
//   npm run audit:lessons:en                   # and whether they pass the gates

import { readFileSync, statSync } from "node:fs";
import { readdirSync } from "node:fs";
import { join, extname } from "node:path";

const VIETNAMESE =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

const ROOTS = ["components", "app"];
const SKIP_DIRS = new Set(["node_modules", ".next", "lessons-data"]);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if ([".tsx", ".ts"].includes(extname(full))) out.push(full);
  }
  return out;
}

// Quoted literals and bare JSX text. Import paths and className values are the
// main false positives; those rarely contain Vietnamese diacritics, so the
// diacritic test filters them out on its own.
//
// The JSX pattern allows NEWLINES and embedded {expressions}, which the first
// version did not (`>([^<>{}\n]{2,})<`). That made it blind to most of the copy
// on the pages that matter: prose in JSX is wrapped across lines by the
// formatter, and any line with a `{" "}` spacer or an interpolated count was
// skipped entirely. components/home/HomePage.tsx reported 102 strings while its
// hero heading, its subheading, both call-to-action buttons and the whole top
// banner were invisible - the page's real figure is roughly 40% higher.
//
// The two failure directions are worth keeping straight, because they were found
// a few minutes apart and pull opposite ways: counting comments INFLATED the
// backlog with work that does not exist, and this one DEFLATED it by hiding work
// that does. Neither is safe to leave in a number people are asked to drive down.
// Template literal cũng là câu chữ, và trước đây không có mẫu nào bắt nó.
// Đó là lý do `hint={`Kỷ lục ${n} ngày liên tiếp`}` và `${n} bài` sống sót qua
// mọi lần dọn: chúng nằm ở vị trí hiển thị, chỉ khác cặp nháy. Bộ quét in ra
// số 0 cho components/LearningAnalytics.tsx trong khi màn hình có bốn chuỗi
// tiếng Việt đập vào mắt.
//
// `${...}` bị thay bằng khoảng trắng trước khi thử, giống hệt cách xử lý
// {expression} trong JSX text, nên phần chữ quanh chỗ chèn vẫn khớp được.
const PATTERNS = [/"([^"\n]{2,})"/g, /'([^'\n]{2,})'/g, /`([^`]{2,}?)`/g, />([^<>]{2,}?)</g];

/** Strips {expressions} out of a JSX text node so the surrounding prose is still
 *  matched, and collapses the whitespace that wrapping introduced. */
function normalizeJsxText(text) {
  return text
    .replace(/\$\{[^{}]*\}/g, " ")
    .replace(/\{[^{}]*\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Regions a file has declared out of scope:
//
//   /* i18n-ignore-start: why */
//   ...
//   /* i18n-ignore-end */
//
// This exists because the count above was overstating the backlog by enough to
// make it useless as a target. components/Leaderboard.tsx reported 303 strings
// while being one of the three files already fully translated: 253 of them were
// the per-rank nicknames and badge names ("Hiền giả Phố Wall", "Kẻ hủy diệt đáp
// án"), which lib/i18n/dictionaries/vi.ts has always documented as deliberately
// NOT translated - they are Vietnamese finance-meme wordplay, where a literal
// translation reads as nonsense and a good one is a creative-writing pass rather
// than a dictionary lookup.
//
// A scanner that keeps counting work nobody intends to do teaches people to
// ignore its number. The marker makes that decision visible in the file it
// applies to, and requires a reason, so "out of scope" cannot be a silent way to
// make the figure look better.
const IGNORE_BLOCK = /\/\*\s*i18n-ignore-start:[\s\S]*?i18n-ignore-end\s*\*\//g;

// Comments are stripped before matching, because a comment is never rendered.
// This repo comments heavily and in Vietnamese, and the comments quote the
// strings they are explaining - components/DashboardClient.tsx has a note
// reading `65% of lessons say "6 phút" or "7 phút"`, which the scanner counted
// as two strings needing translation. Every such hit is work that does not
// exist, and they are concentrated in exactly the well-documented files someone
// would pick up first.
//
// Block comments first, then line comments. The line-comment pattern requires
// the `//` to be preceded by start-of-line or whitespace so it does not eat the
// `//` inside a URL literal ("https://...") and take the rest of that line's
// real strings with it.
const BLOCK_COMMENT = /\/\*[\s\S]*?\*\//g;
const LINE_COMMENT = /(^|\s)\/\/[^\n]*/g;

// `throw new Error("...")` is NOT excluded, and the attempt to exclude it is
// worth recording so nobody repeats it. The reasoning looked sound - a throw
// reaches a developer through a stack trace - and it is true for an invariant
// guard like room-textures' canvas-context checks. It is false for a server
// action: app/(app)/tai-lieu/actions.ts throws "Vui lòng nhập tiêu đề tài
// liệu", and CommunityUploadModal renders `err.message` straight into
// `toast.error`. That string is the copy the user reads.
//
// So the shape does not decide it; where the throw sits does. An invariant
// guard belongs in an i18n-ignore block with its reason, which is a reviewed
// claim rather than a blanket rule.

function stringsIn(src) {
  const scannable = src
    .replace(IGNORE_BLOCK, "")
    .replace(BLOCK_COMMENT, "")
    .replace(LINE_COMMENT, "$1");
  const found = [];
  for (const re of PATTERNS) {
    for (const m of scannable.matchAll(re)) {
      const text = normalizeJsxText(m[1]);
      if (text.length >= 2 && VIETNAMESE.test(text)) found.push(text);
    }
  }
  return found;
}

/** How many strings a file put out of scope, so the exclusions stay countable
 *  rather than just disappearing. */
function ignoredIn(src) {
  let n = 0;
  for (const block of src.match(IGNORE_BLOCK) ?? []) {
    // Same comment stripping as stringsIn, so the excluded count is measured on
    // the same basis as the remaining one and the two can be added up.
    const body = block.replace(BLOCK_COMMENT, "").replace(LINE_COMMENT, "$1");
    for (const re of PATTERNS) {
      for (const m of body.matchAll(re)) {
        const text = normalizeJsxText(m[1]);
        if (text.length >= 2 && VIETNAMESE.test(text)) n++;
      }
    }
  }
  return n;
}

const target = process.argv.slice(2).find((a) => !a.startsWith("--"));

if (target) {
  const src = readFileSync(target, "utf8");
  const hits = stringsIn(src);
  const skipped = ignoredIn(src);
  console.log(
    `${target} - ${hits.length} chuỗi` +
      (skipped ? ` (+${skipped} nằm trong khối i18n-ignore)` : "") +
      "\n"
  );
  for (const h of [...new Set(hits)].sort()) console.log(`  ${h}`);
  process.exit(0);
}

// Categories, because one number over 340 files hid the fact that most of the
// backlog is not the same KIND of work. Lesson content in a hand-authored page
// is a lesson-translation job (see AGENTS.md "Translating lessons"), an API
// route has to return a key for the client to translate rather than a sentence,
// and an admin screen is read by staff. That last justification has since gone
// stale and is kept only as a category, not as an excuse: 18 files under
// app/admin/ call useI18n() and three dictionary sections exist for them
// (adminOne/Two/Three), so the admin UI IS translated. What was left when this
// note was written were six server-action error strings, and they were left
// because the category sounded like a decision rather than a backlog. Reporting
// them together made the learner-facing figure look nearly twice its real size.
function categorize(file) {
  if (file.startsWith("app/bai-hoc/")) return "lesson content (hand-authored pages)";
  if (file.startsWith("app/api/")) return "api routes (need keys, not strings)";
  if (file.startsWith("app/admin/")) return "admin screens (staff-facing)";
  if (file.startsWith("components/games/")) return "games";
  return "learner-facing UI";
}

const rows = [];
let ignored = 0;
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const src = readFileSync(file, "utf8");
    ignored += ignoredIn(src);
    const count = stringsIn(src).length;
    if (count) rows.push({ file, count, category: categorize(file) });
  }
}
rows.sort((a, b) => b.count - a.count);

const total = rows.reduce((s, r) => s + r.count, 0);
console.log(`Còn ${total} chuỗi tiếng Việt trong ${rows.length} file`);
if (ignored) console.log(`(${ignored} chuỗi khác nằm trong khối i18n-ignore, cố ý không dịch)`);

const byCategory = new Map();
for (const row of rows) {
  const prev = byCategory.get(row.category) ?? { count: 0, files: 0 };
  byCategory.set(row.category, { count: prev.count + row.count, files: prev.files + 1 });
}
console.log("\nTheo loại việc:");
for (const [category, { count, files }] of [...byCategory].sort((a, b) => b[1].count - a[1].count)) {
  console.log(`  ${String(count).padStart(4)}  ${category}  (${files} file)`);
}

const learner = rows.filter((r) => r.category === "learner-facing UI");
// `--all` in ra HẾT thay vì 15 file nặng nhất. Bản rút gọn hợp lý khi đang
// triage, nhưng lúc dọn cả một hạng mục thì cái đuôi mới là phần còn lại của
// việc - và một danh sách bị cắt trông y hệt một danh sách đã xong.
const limit = process.argv.includes("--all") ? learner.length : 15;
console.log("\nNặng nhất trong learner-facing UI:");
for (const { file, count } of learner.slice(0, limit)) {
  console.log(`  ${String(count).padStart(4)}  ${file}`);
}
console.log(`\nChi tiết một file:  node scripts/i18n-scan.mjs ${learner[0]?.file ?? "<path>"}`);
