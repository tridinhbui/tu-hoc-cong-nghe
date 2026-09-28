#!/usr/bin/env node
// Chạy thật mọi khối `exercise` và mọi khối `code` có `runnable` trong kho bài,
// ở cả tiếng Việt lẫn bản dịch tiếng Anh.
//
// Với mỗi bài tập, ba điều phải đúng:
//   1. `solution` chạy không lỗi và in ra đúng `expectedOutput` - nếu không thì
//      người học làm đúng vẫn bị báo sai. Cùng loại lỗi với đáp án số trần
//      không khớp lời giải trong AGENTS.md, và cùng cách gác: gác ở mức 0.
//   2. `starter` KHÔNG qua sẵn - nếu không thì bài tập chấm "đúng" trước khi
//      người học gõ một chữ nào.
//   3. Bản dịch: nếu nó thay `solution`/`expectedOutput` thì cặp mới cũng phải
//      khớp nhau.
//
// JavaScript chạy trong node:vm, Python chạy bằng python3 của máy. Bộ chạy
// thật trên trình duyệt là Pyodide - cùng CPython, nên với mã cho người mới
// kết quả trùng nhau. Không có python3 thì script DỪNG ĐỎ chứ không bỏ qua: một
// cổng tự im lặng khi thiếu công cụ là cổng không ai biết đã tắt.
//
//   node scripts/verify-exercises.mjs

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { gradeOutput } from "../lib/code-runner/grade.js";
import { mergeLessonTranslation } from "../lib/lesson-translations.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "lib/lessons-data");
const i18nDir = path.join(root, "lib/lessons-i18n");

async function runJs(code) {
  const out = [];
  const write = (...args) =>
    out.push(args.map((v) => (typeof v === "string" ? v : v === undefined ? "undefined" : JSON.stringify(v) ?? String(v))).join(" "));
  const sandbox = { console: { log: write, info: write, warn: write, error: write, debug: write } };
  try {
    const fn = vm.runInNewContext(`(async function(){\n${code}\n})`, sandbox, { timeout: 2000 });
    await fn();
    return { ok: true, stdout: out.join("\n") };
  } catch (err) {
    return { ok: false, stdout: out.join("\n"), error: String(err && err.message ? err.message : err) };
  }
}

let pythonChecked = false;
function runPython(code) {
  if (!pythonChecked) {
    const probe = spawnSync("python3", ["--version"], { encoding: "utf8" });
    if (probe.status !== 0) {
      console.error("✗ Không tìm thấy python3 - không kiểm được bài tập Python. Cài python3 rồi chạy lại.");
      process.exit(1);
    }
    pythonChecked = true;
  }
  const r = spawnSync("python3", ["-I", "-"], {
    input: code,
    encoding: "utf8",
    timeout: 5000,
    env: { PYTHONIOENCODING: "utf-8" },
  });
  if (r.error) return { ok: false, stdout: r.stdout ?? "", error: String(r.error.message) };
  const stderr = (r.stderr ?? "").trim();
  return r.status === 0
    ? { ok: true, stdout: r.stdout.replace(/\n$/, "") }
    : { ok: false, stdout: r.stdout ?? "", error: stderr.split("\n").pop() };
}

const run = (language, code) => (language === "python" ? runPython(code) : runJs(code));

async function checkLesson(lesson, label, failures) {
  let count = 0;
  for (const [i, block] of (lesson.sections ?? []).entries()) {
    const where = `${label} ${lesson.slug} sections[${i}]`;
    if (block.type === "exercise") {
      count++;
      const sol = await run(block.language, block.solution);
      if (!sol.ok) failures.push(`${where}: lời giải chạy lỗi - ${sol.error}`);
      else {
        const g = gradeOutput(sol.stdout, block.expectedOutput);
        if (!g.pass) failures.push(`${where}: lời giải in "${g.actualLine ?? "(thiếu)"}" ở dòng ${g.line}, đề chờ "${g.expectedLine}"`);
      }
      const start = await run(block.language, block.starter);
      if (start.ok && gradeOutput(start.stdout, block.expectedOutput).pass) {
        failures.push(`${where}: mã khởi đầu đã qua sẵn - bài tập không đòi người học làm gì`);
      }
    } else if (block.type === "code" && block.runnable) {
      if (block.language !== "python" && block.language !== "javascript") {
        failures.push(`${where}: runnable nhưng ngôn ngữ "${block.language}" không chạy được trong trình duyệt`);
        continue;
      }
      count++;
      const r = await run(block.language, block.code);
      if (!r.ok) failures.push(`${where}: ví dụ bấm "Chạy thử" lại báo lỗi - ${r.error}`);
    }
  }
  return count;
}

const failures = [];
let checked = 0;
const lessons = readdirSync(dataDir)
  .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
  .map((f) => JSON.parse(readFileSync(path.join(dataDir, f), "utf8")));

for (const lesson of lessons) checked += await checkLesson(lesson, "vi", failures);

if (existsSync(i18nDir)) {
  for (const locale of readdirSync(i18nDir)) {
    const dir = path.join(i18nDir, locale);
    for (const lesson of lessons) {
      const file = path.join(dir, `${lesson.slug}.json`);
      if (!existsSync(file)) continue;
      const merged = mergeLessonTranslation(lesson, JSON.parse(readFileSync(file, "utf8")), locale);
      checked += await checkLesson(merged, locale, failures);
    }
  }
}

if (failures.length) {
  console.error(`✗ ${failures.length} lỗi trong ${checked} khối mã chạy được:\n`);
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}
console.log(`✓ ${checked} khối mã chạy được - mọi lời giải khớp đầu ra, không mã khởi đầu nào qua sẵn.`);
