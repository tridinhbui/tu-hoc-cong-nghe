#!/usr/bin/env node
// Ghi một bản dịch bài học (lib/lessons-i18n/<locale>/<slug>.json) từ một bản
// NHÁP, và làm đúng cái bước mà tay người dễ bỏ qua: đặt đáp án đúng vào ĐÚNG
// VỊ TRÍ của bản tiếng Việt.
//
// Vì sao có: 19 bản dịch từng được ghi với đáp án đúng ở vị trí 0 (cách viết
// tự nhiên của một câu hỏi), trong khi `correct` đọc từ bản Việt - đã bị
// balanceLessonQuizzes xáo - nên mọi câu bị chấm sai (xem AGENTS.md, "Rule 2 was
// violated in all 19 translations"). Bản nháp ở đây KHÔNG viết mảng `options`
// theo vị trí; nó viết
//
//   "options": { "correct": "<phương án đúng>", "distractors": ["<nhiễu 1>", "<nhiễu 2>", "<nhiễu 3>"] }
//
// với các phương án nhiễu theo ĐÚNG THỨ TỰ chúng xuất hiện trong bản Việt
// (bỏ qua phương án đúng). Script chèn đáp án đúng vào chỉ số `correct` của bản
// Việt, nên phần tử i của bản dịch dịch phần tử i của bản Việt - kể cả nhiễu.
// Áp cho `openingOptions`, `quiz[i].options` và `practicePrompt.options`.
//
//   node scripts/author-translation.mjs <bản-nháp.json> [locale=en]
//
// Script từ chối ghi khi: slug không có; số câu/mảng lệch bản Việt; chuỗi còn
// dấu tiếng Việt; chuỗi rỗng; khối `sections` khác loại so với bản Việt.

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const [draftPath, locale = "en"] = process.argv.slice(2);
if (!draftPath) {
  console.error("Cách dùng: node scripts/author-translation.mjs <bản-nháp.json> [locale]");
  process.exit(2);
}

const draft = JSON.parse(readFileSync(draftPath, "utf8"));
const slug = draft.slug;
if (!slug) fail("bản nháp thiếu `slug`");
const vi = JSON.parse(readFileSync(path.join(root, "lib/lessons-data", `${slug}.json`), "utf8"));
const lesson = Array.isArray(vi) ? vi[0] : vi;

const VI_CHARS = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

function fail(msg) {
  console.error(`✗ ${slug ?? "?"}: ${msg}`);
  process.exit(1);
}

/** Dựng mảng phương án theo vị trí của bản Việt từ {correct, distractors}. */
function place(spec, viOptions, correctIdx, where) {
  if (Array.isArray(spec)) fail(`${where}: viết {correct, distractors}, không viết mảng theo vị trí`);
  if (!spec || typeof spec.correct !== "string" || !Array.isArray(spec.distractors)) fail(`${where}: thiếu correct/distractors`);
  if (spec.distractors.length !== viOptions.length - 1) fail(`${where}: cần ${viOptions.length - 1} phương án nhiễu, có ${spec.distractors.length}`);
  const out = [...spec.distractors];
  out.splice(correctIdx, 0, spec.correct);
  return out;
}

const patch = { ...draft };

if (draft.openingOptions !== undefined) {
  patch.openingOptions = place(draft.openingOptions, lesson.openingOptions, lesson.correctOption, "openingOptions");
}
if (draft.quiz !== undefined) {
  if (draft.quiz.length !== lesson.quiz.length) fail(`quiz: ${draft.quiz.length} câu, bản Việt có ${lesson.quiz.length}`);
  patch.quiz = draft.quiz.map((q, i) => ({ ...q, options: place(q.options, lesson.quiz[i].options, lesson.quiz[i].correct, `quiz[${i}]`) }));
}
if (draft.practicePrompt !== undefined) {
  patch.practicePrompt = {
    ...draft.practicePrompt,
    options: place(draft.practicePrompt.options, lesson.practicePrompt.options, lesson.practicePrompt.correct, "practicePrompt"),
  };
}

if (draft.sections !== undefined) {
  if (draft.sections.length !== lesson.sections.length) fail(`sections: ${draft.sections.length} khối, bản Việt có ${lesson.sections.length}`);
  draft.sections.forEach((b, i) => {
    if (b.type !== lesson.sections[i].type) fail(`sections[${i}]: loại "${b.type}", bản Việt là "${lesson.sections[i].type}"`);
  });
}
for (const key of ["diagram", "keyTakeaways"]) {
  if (draft[key] !== undefined && draft[key].length !== lesson[key].length) fail(`${key}: lệch độ dài so với bản Việt`);
}

// Không còn dấu tiếng Việt, không có chuỗi rỗng.
const bad = [];
(function walk(v, p) {
  if (typeof v === "string") {
    if (v.trim() === "") bad.push(`${p}: chuỗi rỗng`);
    else if (p !== "slug" && VI_CHARS.test(v)) bad.push(`${p}: còn dấu tiếng Việt: ${v.slice(0, 50)}`);
  } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${p}[${i}]`));
  else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, p ? `${p}.${k}` : k);
})(patch, "");
if (bad.length) fail(`\n  ${bad.slice(0, 12).join("\n  ")}${bad.length > 12 ? `\n  ... và ${bad.length - 12} chỗ nữa` : ""}`);

// Đo mách nước độ dài của CHÍNH bản dịch này (AGENTS.md: bản dịch trôi về phía
// "đáp án đúng dài nhất" vì một đáp án đúng viết thành câu hay dài hơn nhiễu).
// Chỉ in, không chặn: gate thật là `node scripts/audit-lesson-content.mjs --locale=en`.
{
  const groups = [[patch.openingOptions ?? lesson.openingOptions, lesson.correctOption]];
  (patch.quiz ?? []).forEach((q, i) => groups.push([q.options, lesson.quiz[i].correct]));
  if (patch.practicePrompt) groups.push([patch.practicePrompt.options, lesson.practicePrompt.correct]);
  let longest = 0, shortest = 0;
  for (const [opts, c] of groups) {
    const L = opts.map((o) => o.length);
    const max = Math.max(...L), min = Math.min(...L);
    if (L[c] === max && L.filter((x) => x === max).length === 1) longest++;
    if (L[c] === min && L.filter((x) => x === min).length === 1) shortest++;
  }
  console.log(`  đáp án đúng là dài nhất ${longest}/${groups.length}, ngắn nhất ${shortest}/${groups.length} (đích mỗi bên ~1/4; trần dài nhất ~1/3)`);
}

const out = path.join(root, "lib/lessons-i18n", locale, `${slug}.json`);
writeFileSync(out, JSON.stringify(patch, null, 2) + "\n");
console.log(`✓ ${path.relative(root, out)}`);
