// Tự kiểm MỘT tệp bài học, không cần sinh lại lib/lessons-data.
//
//   node scripts/check-lesson-batch.mjs lib/ai-work-lessons/s30-a.ts
//
// Vì sao có: viết một đợt hàng trăm bài bằng nhiều agent song song, mỗi agent
// một tệp. `npm run audit:lessons` sinh lại toàn bộ lib/lessons-data rồi đo cả
// kho, nên hai agent chạy cùng lúc thì đọc trúng tệp nửa chừng của nhau - và
// số tổng của cả kho che mất một lô nhỏ lệch (đợt 1: đáp án đúng là phương án
// ngắn nhất ở 56% số câu trong khi audit vẫn xanh). Script này đọc thẳng tệp
// TypeScript của agent, đo RIÊNG lô đó bằng cùng ngưỡng với audit, và in đúng
// việc cần sửa. Luôn thoát 0 nếu chỉ có cảnh báo; thoát 1 nếu có lỗi cứng.
//
// Không thay thế `npm run audit:lessons`: cổng z-score của cả kho vẫn chạy ở
// đó, một lần, sau khi cả đợt xong.

import { readFileSync, readdirSync } from "fs";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";
import ts from "typescript";
import { validateInteractiveBlock, countBlockKinds } from "../lib/lesson-blocks/validate.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const file = process.argv[2];
if (!file) {
  console.error("usage: node scripts/check-lesson-batch.mjs <lib/....ts>");
  process.exit(2);
}

// Nạp tệp .ts: chỉ có `import type` nên sau khi biên dịch không còn require nào.
const source = readFileSync(path.resolve(root, file), "utf8");
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const mod = { exports: {} };
new Function("module", "exports", "require", js)(mod, mod.exports, createRequire(import.meta.url));
const lessons = Object.values(mod.exports).find(Array.isArray);
if (!lessons) {
  console.error(`${file}: không tìm thấy mảng bài học được export`);
  process.exit(1);
}

const missionIds = JSON.parse(readFileSync(path.join(root, "lib/tools/mission-ids.json"), "utf8"));
const simMissions = Object.fromEntries(Object.entries(missionIds).map(([t, ids]) => [t, new Set(ids)]));

// Slug/id đã có trong kho (bản sinh gần nhất) - để bắt trùng.
const dataDir = path.join(root, "lib/lessons-data");
let existing = [];
try {
  existing = JSON.parse(readFileSync(path.join(dataDir, "_index.json"), "utf8"));
} catch {
  /* chưa sinh - bỏ qua kiểm trùng với kho */
}
const ownIds = new Set(lessons.map((l) => l.id));
const others = existing.filter((l) => !ownIds.has(l.id));

const errors = [];
const warns = [];
const err = (l, m) => errors.push(`  [${l.id}] ${l.slug ?? "?"}: ${m}`);
const warn = (l, m) => warns.push(`  [${l.id}] ${l.slug ?? "?"}: ${m}`);

const HOLLOW = /^(luôn (đúng|tốt|có)|không (ảnh hưởng|có gì|liên quan|quan trọng)|tất cả (đều )?(đúng|sai)|không bao giờ)\b/i;
const seenSlug = new Set();
const seenId = new Set();
let Q = 0, longest = 0, shortest = 0, openQ = 0, openShortest = 0;
const kinds = { practice: 0, visual: 0 };

for (const l of lessons) {
  if (seenSlug.has(l.slug)) err(l, "slug trùng trong tệp");
  if (seenId.has(l.id)) err(l, "id trùng trong tệp");
  seenSlug.add(l.slug);
  seenId.add(l.id);
  if (others.some((o) => o.slug === l.slug)) err(l, "slug trùng với bài đã có trong kho");
  if (others.some((o) => o.id === l.id)) err(l, "id trùng với bài đã có trong kho");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(l.slug ?? "")) err(l, "slug phải là kebab-case không dấu");
  if (others.some((o) => (o.title ?? "").trim() === (l.title ?? "").trim())) err(l, "tiêu đề trùng với bài đã có");

  if ((l.quiz ?? []).length < 5) err(l, `quiz ${l.quiz?.length ?? 0} < 5 câu`);
  if ((l.explanation ?? "").length < 250) err(l, `explanation ${l.explanation?.length ?? 0} < 250 ký tự`);
  if ((l.diagram ?? []).length < 2) err(l, "diagram < 2 nút");
  if ((l.sections ?? []).length < 9) warn(l, `chỉ ${l.sections?.length ?? 0} khối trong sections (đích >= 9)`);
  if (!l.openingQuestion || (l.openingOptions ?? []).length !== 4) err(l, "openingQuestion cần đúng 4 openingOptions");
  if (!l.application?.message) err(l, "thiếu application.message (thẻ 'Hôm qua bạn thử chưa?' đọc trường này)");
  if (!l.realWorldExample?.company) err(l, "thiếu realWorldExample");
  if (l.sections?.[0]?.type !== "lead") err(l, "khối đầu phải là lead");
  if (l.sections?.[1]?.type !== "feynman") err(l, "khối thứ hai phải là feynman");

  (l.sections ?? []).forEach((b, i) => {
    for (const e of validateInteractiveBlock(b, { simMissions })) err(l, `khối ${i}: ${e}`);
  });
  const k = countBlockKinds(l.sections);
  if (k.practice < 1) err(l, "thiếu khối thực hành (exercise/sim/aiLab/scenario)");
  if (!(l.sections ?? []).some((b) => b.type === "chart" || b.type === "flow")) err(l, "thiếu chart hoặc flow");
  kinds.practice += k.practice;
  kinds.visual += k.visual;

  const ol = (l.openingOptions ?? []).map((o) => o.length);
  if (ol.length === 4) {
    openQ++;
    const c = ol[l.correctOption];
    if (c === Math.min(...ol) && ol.filter((x) => x === c).length === 1) openShortest++;
  }

  let lLong = 0;
  (l.quiz ?? []).forEach((q, qi) => {
    const opts = q.options ?? [];
    if (opts.length !== 4) err(l, `quiz[${qi}] cần đúng 4 phương án`);
    if (!(q.correct >= 0 && q.correct < opts.length)) err(l, `quiz[${qi}] correct ngoài phạm vi`);
    if ((q.explanation ?? "").trim().length < 80 && !/[=×÷+\d]{3}/.test(q.explanation ?? "")) warn(l, `quiz[${qi}] giải thích mỏng (< 80 ký tự)`);
    if (HOLLOW.test((opts[q.correct] ?? "").trim()) || opts.some((o) => HOLLOW.test((o ?? "").trim()) && o.length < 30)) {
      err(l, `quiz[${qi}] có phương án rỗng nghĩa ("Luôn đúng", "Không ảnh hưởng"...)`);
    }
    const len = opts.map((o) => o.length), c = len[q.correct];
    const mean = len.reduce((a, b) => a + b, 0) / len.length;
    if (len.some((x) => Math.abs(x - mean) > 0.45 * mean) && !opts.every((o) => /^[\d.,\s%A-Za-z]{1,12}$/.test(o))) {
      warn(l, `quiz[${qi}] độ dài phương án lệch xa trung bình (${len.join("/")}) - luật 6`);
    }
    Q++;
    if (c === Math.max(...len) && len.filter((x) => x === c).length === 1) { longest++; lLong++; }
    if (c === Math.min(...len) && len.filter((x) => x === c).length === 1) shortest++;
  });
  if ((l.quiz ?? []).length >= 2 && lLong / l.quiz.length >= 0.75) err(l, "đáp án đúng là phương án dài nhất ở >= 75% câu");
}

const pct = (n, d) => (d ? Math.round((100 * n) / d) : 0);
const pl = pct(longest, Q), ps = pct(shortest, Q);
console.log(`${file}: ${lessons.length} bài · ${Q} câu · đáp án đúng là DÀI nhất ${pl}% · NGẮN nhất ${ps}% (đích mỗi bên 18-32%) · câu mở đầu ngắn nhất ${openShortest}/${openQ}`);
if (Q >= 15 && (pl < 15 || pl > 35)) errors.push(`  đáp án đúng dài nhất ${pl}% - ngoài khoảng 15-35%`);
if (Q >= 15 && (ps < 15 || ps > 35)) errors.push(`  đáp án đúng ngắn nhất ${ps}% - ngoài khoảng 15-35%. Sửa bằng cách viết lại PHƯƠNG ÁN NHIỄU (ngắn hơn nếu đang quá ít "dài nhất", dài hơn nếu đang quá nhiều "ngắn nhất"), KHÔNG kéo dài hay cắt đáp án đúng.`);
if (openQ >= 4 && openShortest / openQ > 0.5) warns.push(`  câu mở đầu: đáp án đúng ngắn nhất ở ${openShortest}/${openQ} bài`);
if (warns.length) console.log(`CẢNH BÁO (${warns.length}):\n${warns.slice(0, 40).join("\n")}`);
if (errors.length) {
  console.log(`LỖI (${errors.length}):\n${errors.slice(0, 60).join("\n")}`);
  process.exit(1);
}
console.log("OK - qua các kiểm tra riêng của tệp này (chưa thay cho npm run audit:lessons).");
