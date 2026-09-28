#!/usr/bin/env node
// Kiểm MỘT tệp bài học (lib/<ten>-lessons.ts) trước khi nối nó vào lib/lessons.ts.
//
// Vì sao có script này thay vì chỉ `npm run audit:lessons`: audit đọc
// lib/lessons-data, thư mục do generate-lesson-data.mjs sinh ra cho CẢ kho. Hai
// người (hoặc hai agent) viết hai chặng cùng lúc mà cùng chạy generator là ghi
// đè tệp của nhau. Script này chỉ đọc đúng tệp được chỉ định, nên chạy song
// song được, và kiểm cùng những thứ audit sẽ kiểm - cộng phân bố độ dài đáp án
// ngay trên lô vừa viết, trước khi nó hoà vào kho và bị pha loãng.
//
//   node scripts/check-lesson-file.mjs lib/work-ai-daily-lessons.ts
//
// Thoát 1 nếu có lỗi cứng. Phân bố độ dài chỉ cảnh báo: ở vài chục câu, một
// tỷ lệ nhích vài điểm vì một câu - xem MIN_QUESTIONS_FOR_SHARE_GATES trong
// scripts/audit-lesson-content.mjs.

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import vm from "node:vm";
import ts from "typescript";
import { gradeOutput } from "../lib/code-runner/grade.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = process.argv[2];
if (!file) {
  console.error("Dùng: node scripts/check-lesson-file.mjs lib/<ten>-lessons.ts");
  process.exit(2);
}

const source = readFileSync(path.resolve(root, file), "utf8").replace(/^import type .*$/gm, "");
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const mod = { exports: {} };
new Function("module", "exports", "require", js)(mod, mod.exports, () => ({}));
const arrays = Object.values(mod.exports).filter(Array.isArray);
if (arrays.length !== 1) {
  console.error(`✗ Tệp phải export đúng một mảng Lesson[] (thấy ${arrays.length}).`);
  process.exit(1);
}
const lessons = arrays[0];

// Slug/id đã có trong kho (bỏ qua chính các bài của tệp này nếu đã được sinh).
const dataDir = path.join(root, "lib/lessons-data");
const ownSlugs = new Set(lessons.map((l) => l.slug));
const ownIds = new Set(lessons.map((l) => l.id));
const taken = { slug: new Set(), id: new Set() };
for (const f of readdirSync(dataDir)) {
  if (!f.endsWith(".json") || f.startsWith("_")) continue;
  const l = JSON.parse(readFileSync(path.join(dataDir, f), "utf8"));
  if (!ownSlugs.has(l.slug)) taken.slug.add(l.slug);
  if (!ownIds.has(l.id)) taken.id.add(l.id);
}

const errors = [];
const warn = [];
const err = (l, msg) => errors.push(`${l.slug ?? l.id}: ${msg}`);
const DIFFS = new Set(["Dễ", "Trung bình", "Khó"]);
const HOLLOW_DISTRACTOR =
  /^(luôn (tốt|xấu|đúng|sai)|không (ảnh hưởng|liên quan|quan trọng|có khái niệm|cần|có lý do|thể (tính|xác định)|công thức|đổi)|tùy ý|bình thường|thứ tự không)/i;
const HOLLOW_CORRECT = /^(không|luôn|chỉ|đều|mọi|tất cả)\b/i;
const hollowD = (o) => {
  const t = String(o ?? "").trim().replace(/\.$/, "");
  return !/\d/.test(t) && t.length <= 30 && HOLLOW_DISTRACTOR.test(t);
};
const hollowC = (o) => {
  const t = String(o ?? "").trim().replace(/\.$/, "");
  return t && !/\d/.test(t) && t.split(/\s+/).length <= 5 && HOLLOW_CORRECT.test(t);
};

const questions = []; // { where, options, correct }
const seenSlug = new Set();
const seenId = new Set();

for (const l of lessons) {
  for (const k of ["id", "slug", "title", "subtitle", "duration", "difficulty", "emoji", "track", "whyItMatters", "openingQuestion", "explanation"]) {
    if (l[k] === undefined || l[k] === "") err(l, `thiếu ${k}`);
  }
  if (seenSlug.has(l.slug) || taken.slug.has(l.slug)) err(l, "slug trùng");
  if (seenId.has(l.id) || taken.id.has(l.id)) err(l, `id ${l.id} trùng`);
  seenSlug.add(l.slug);
  seenId.add(l.id);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(l.slug ?? "")) err(l, "slug phải là chữ thường không dấu, nối bằng -");
  if (!DIFFS.has(l.difficulty)) err(l, `difficulty "${l.difficulty}" không hợp lệ`);
  if ((l.explanation ?? "").length < 250) err(l, `explanation ${l.explanation?.length ?? 0} ký tự (< 250)`);
  if (!Array.isArray(l.diagram) || l.diagram.length < 2) err(l, "diagram cần ít nhất 2 nút");
  if (!l.realWorldExample?.company || !l.realWorldExample?.description) err(l, "thiếu realWorldExample");
  if (!Array.isArray(l.keyTakeaways) || l.keyTakeaways.length < 3) err(l, "keyTakeaways cần ít nhất 3");
  for (const k of ["keyIdea", "formula", "commonMistake", "action"]) if (!l.summary?.[k]) err(l, `thiếu summary.${k}`);
  if (!l.application?.title || !l.application?.message) err(l, "thiếu application");

  if (!Array.isArray(l.openingOptions) || l.openingOptions.length !== 4) err(l, "openingOptions cần đúng 4 phương án");
  else questions.push({ where: `${l.slug} mở đầu`, options: l.openingOptions, correct: l.correctOption });

  const quiz = l.quiz ?? [];
  if (quiz.length < 5) err(l, `quiz ${quiz.length} câu (< 5)`);
  quiz.forEach((q, i) => {
    if (q.options?.length !== 4) err(l, `quiz[${i}] cần đúng 4 phương án`);
    if (!(q.correct >= 0 && q.correct < 4)) err(l, `quiz[${i}] correct ngoài 0-3`);
    if ((q.explanation ?? "").length < 80) err(l, `quiz[${i}] explanation < 80 ký tự`);
    questions.push({ where: `${l.slug} quiz[${i}]`, options: q.options ?? [], correct: q.correct });
  });
  const p = l.practicePrompt;
  if (!p || p.options?.length !== 4 || !p.explanation) err(l, "practicePrompt cần question, 4 options, correct, explanation");
  else questions.push({ where: `${l.slug} practicePrompt`, options: p.options, correct: p.correct });

  const secs = l.sections ?? [];
  if (secs.length < 5) err(l, `sections ${secs.length} khối (< 5)`);
  if (secs.at(-1)?.type !== "closing") err(l, "khối cuối của sections phải là closing");
  for (const [i, b] of secs.entries()) {
    // Hình dạng khối: tsc bắt được, nhưng script này không chạy tsc - và một
    // agent viết theo mô tả bằng lời đã từng dựng `comparison` thành
    // columns/rows. Renderer không báo lỗi, chỉ vẽ ra ô trống.
    const SHAPES = {
      lead: ["text"], heading: ["text"], paragraph: ["text"], list: ["items"], callout: ["label", "text"],
      comparison: ["left", "right"], conceptTable: ["title", "concepts"], closing: ["lines"],
      code: ["language", "code"], exercise: ["language", "title", "task", "starter", "solution", "expectedOutput"],
    };
    if (b.type in SHAPES) {
      for (const k of SHAPES[b.type]) if (b[k] === undefined) err(l, `sections[${i}] ${b.type} thiếu trường "${k}"`);
      if (b.type === "comparison" && !(b.left?.label && b.left?.text && b.right?.label && b.right?.text)) err(l, `sections[${i}] comparison cần left/right {label, text}`);
      if (b.type === "conceptTable" && !(Array.isArray(b.concepts) && b.concepts.every((c) => c.vi && c.en && c.def))) err(l, `sections[${i}] conceptTable cần concepts [{vi, en, def}]`);
    } else if (!["feynman", "formula"].includes(b.type)) {
      err(l, `sections[${i}] loại khối "${b.type}" không tồn tại`);
    }
    if (b.type === "feynman" && (b.columns?.length !== 3 || b.rows?.some((r) => r.length !== 3) || !b.oneLiner)) {
      err(l, `sections[${i}] feynman phải có 3 cột, mỗi hàng 3 ô, và oneLiner`);
    }
    if (b.type === "exercise" || (b.type === "code" && b.runnable)) {
      const code = b.type === "exercise" ? b.solution : b.code;
      const r = run(b.language, code);
      if (!r.ok) err(l, `sections[${i}] ${b.type} chạy lỗi: ${r.error}`);
      else if (b.type === "exercise") {
        const g = gradeOutput(r.stdout, b.expectedOutput);
        if (!g.pass) err(l, `sections[${i}] lời giải in "${g.actualLine ?? "(thiếu)"}" ở dòng ${g.line}, đề chờ "${g.expectedLine}"`);
        const s = run(b.language, b.starter);
        if (s.ok && gradeOutput(s.stdout, b.expectedOutput).pass) err(l, `sections[${i}] mã khởi đầu đã qua sẵn`);
      }
    }
  }
}

function run(language, code) {
  if (language === "python") {
    const r = spawnSync("python3", ["-I", "-"], { input: code, encoding: "utf8", timeout: 5000, env: { PYTHONIOENCODING: "utf-8" } });
    return r.status === 0 ? { ok: true, stdout: r.stdout } : { ok: false, error: (r.stderr || String(r.error)).trim().split("\n").pop() };
  }
  if (language === "javascript") {
    const out = [];
    const w = (...a) => out.push(a.map((v) => (typeof v === "string" ? v : JSON.stringify(v))).join(" "));
    try {
      vm.runInNewContext(code, { console: { log: w, info: w, warn: w, error: w } }, { timeout: 2000 });
      return { ok: true, stdout: out.join("\n") };
    } catch (e) {
      return { ok: false, error: String(e.message ?? e) };
    }
  }
  return { ok: false, error: `ngôn ngữ ${language} không chạy được` };
}

// ── Phương án ────────────────────────────────────────────────────────────────
let longest = 0, shortest = 0, middle = 0, wideBand = 0;
for (const q of questions) {
  q.options.forEach((o, i) => {
    if (i !== q.correct && hollowD(o)) errors.push(`${q.where}: phương án rỗng "${o}" (AGENTS.md quy tắc 4)`);
  });
  if (hollowC(q.options[q.correct])) errors.push(`${q.where}: đáp án đúng rỗng "${q.options[q.correct]}"`);
  const lens = q.options.map((o) => String(o).length);
  const c = lens[q.correct];
  const max = Math.max(...lens), min = Math.min(...lens);
  const isLongest = c === max && lens.filter((x) => x === max).length === 1;
  const isShortest = c === min && lens.filter((x) => x === min).length === 1;
  if (isLongest) longest++;
  else if (isShortest) shortest++;
  else middle++;
  const mean = lens.reduce((a, b) => a + b, 0) / lens.length;
  if (max > mean * 1.45 || min < mean * 0.55) {
    wideBand++;
    warn.push(`${q.where}: độ dài ${lens.join("/")} lệch xa trung bình ${Math.round(mean)} (quy tắc 6)`);
  }
}
const n = questions.length;
const pct = (x) => `${((100 * x) / n).toFixed(0)}%`;
console.log(`${lessons.length} bài · ${n} câu hỏi (quiz + mở đầu + tự kiểm)`);
console.log(`Đáp án đúng là phương án DÀI NHẤT: ${longest} (${pct(longest)}) · NGẮN NHẤT: ${shortest} (${pct(shortest)}) · Ở GIỮA: ${middle} (${pct(middle)})`);
console.log(`  mục tiêu gần may rủi: dài nhất ~25%, ngắn nhất ~25%, ở giữa ~50%.`);
if (n >= 20) {
  if (longest / n > 0.33) warn.unshift(`Đáp án đúng quá hay là phương án dài nhất (${pct(longest)}) - kéo dài một phương án SAI bằng chính lỗi sai của nó.`);
  if (shortest / n > 0.33) warn.unshift(`Đáp án đúng quá hay là phương án ngắn nhất (${pct(shortest)}) - làm phương án sai ngắn nhất dài ra.`);
  if (middle / n > 0.62) warn.unshift(`Đáp án đúng quá hay nằm ở giữa (${pct(middle)}) - cho khoảng một phần tư số câu có đáp án đúng dài nhất.`);
}
if (warn.length) {
  console.log(`\n⚠ ${warn.length} cảnh báo (${wideBand} câu lệch dải độ dài):`);
  for (const w of warn.slice(0, 40)) console.log("  " + w);
}
if (errors.length) {
  console.error(`\n✗ ${errors.length} lỗi:`);
  for (const e of errors) console.error("  " + e);
  process.exit(1);
}
console.log("\n✓ Không có lỗi cứng.");
