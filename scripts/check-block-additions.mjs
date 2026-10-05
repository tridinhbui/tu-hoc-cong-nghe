// Tự kiểm MỘT tệp khối thêm (lib/lesson-block-additions/pNN.ts) mà không cần
// sinh lại lib/lessons-data - nhiều agent chạy song song được.
//
//   node scripts/check-block-additions.mjs lib/lesson-block-additions/p01.ts
//
// Với mỗi slug trong tệp, đối chiếu với bài thật trong lib/lessons-data (bản
// sinh gần nhất) và kiểm:
//   - slug có thật; chỉ gồm loại khối được phép;
//   - mỗi khối tương tác qua validateInteractiveBlock (cùng luật với CI);
//   - bài đang THIẾU thực hành / hình ảnh thì sau khi thêm phải đủ;
//   - bài tập code: lời giải chạy ra đúng expectedOutput, mã khởi đầu KHÔNG
//     qua sẵn (cùng luật với npm run audit:exercises);
//   - khối `sim` trỏ tới nhiệm vụ có thật;
//   - phương án `good` của aiLab / lối chọn của scenario không lộ ra bằng độ dài.
// Thoát 1 nếu có lỗi cứng; cảnh báo thì thoát 0.
//
// Không thay cho `npm run audit:lessons` + `npm run audit:exercises`, chạy một
// lần sau khi cả đợt xong.

import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { validateInteractiveBlock, countBlockKinds } from "../lib/lesson-blocks/validate.js";
import { gradeOutput } from "../lib/code-runner/grade.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = process.argv[2];
if (!file) {
  console.error("usage: node scripts/check-block-additions.mjs lib/lesson-block-additions/pNN.ts");
  process.exit(2);
}

const source = readFileSync(path.resolve(root, file), "utf8");
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const mod = { exports: {} };
new Function("module", "exports", "require", js)(mod, mod.exports, createRequire(import.meta.url));
const record = Object.values(mod.exports).find((v) => v && typeof v === "object" && !Array.isArray(v));
if (!record) {
  console.error(`${file}: không tìm thấy bản ghi được export`);
  process.exit(1);
}

const missionIds = JSON.parse(readFileSync(path.join(root, "lib/tools/mission-ids.json"), "utf8"));
const simMissions = Object.fromEntries(Object.entries(missionIds).map(([t, ids]) => [t, new Set(ids)]));
const dataDir = path.join(root, "lib/lessons-data");

const ALLOWED = new Set(["heading", "paragraph", "callout", "list", "feynman", "code", "exercise", "sim", "aiLab", "scenario", "chart", "flow"]);
// Khối dẫn chữ chỉ để nối - không được là thứ DUY NHẤT một bài nhận thêm.
const CONNECTIVE = new Set(["heading", "paragraph", "callout", "list"]);

const errors = [];
const warns = [];
const err = (slug, m) => errors.push(`  ${slug}: ${m}`);
const warn = (slug, m) => warns.push(`  ${slug}: ${m}`);

function runJs(code) {
  const out = [];
  const write = (...a) => out.push(a.map((v) => (typeof v === "string" ? v : v === undefined ? "undefined" : JSON.stringify(v) ?? String(v))).join(" "));
  try {
    vm.runInNewContext(`(function(){\n${code}\n})()`, { console: { log: write, info: write, warn: write, error: write } }, { timeout: 2000 });
    return { ok: true, stdout: out.join("\n") };
  } catch (e) {
    return { ok: false, stdout: out.join("\n"), error: String(e?.message ?? e) };
  }
}
function runPy(code) {
  const r = spawnSync("python3", ["-I", "-"], { input: code, encoding: "utf8", timeout: 5000, env: { PYTHONIOENCODING: "utf-8" } });
  if (r.error) return { ok: false, stdout: "", error: String(r.error.message) };
  return r.status === 0 ? { ok: true, stdout: r.stdout.replace(/\n$/, "") } : { ok: false, stdout: r.stdout ?? "", error: (r.stderr ?? "").trim().split("\n").pop() };
}
const run = (lang, code) => (lang === "python" ? runPy(code) : runJs(code));

let lessonsChecked = 0, practiceAdded = 0, visualAdded = 0, goodLongest = 0, goodTotal = 0;

for (const [slug, blocks] of Object.entries(record)) {
  const lf = path.join(dataDir, `${slug}.json`);
  if (!existsSync(lf)) { err(slug, "không có bài nào mang slug này trong lib/lessons-data"); continue; }
  const lesson = JSON.parse(readFileSync(lf, "utf8"));
  lessonsChecked++;
  if (!Array.isArray(blocks) || blocks.length === 0) { err(slug, "danh sách khối rỗng"); continue; }
  if (blocks.every((b) => CONNECTIVE.has(b.type))) err(slug, "chỉ có khối chữ nối - phải có ít nhất một khối thực hành / hình ảnh thật");

  // Đợt hai (tệp qNN): chỉ khối sim, tối đa MỘT khối sim mỗi bài (đã tính khối sim
  // đang có), và bỏ qua bài đã có bản dịch tiếng Anh - thêm khối làm lệch vị trí
  // sections của bản dịch, nên bài đó phải đi qua bước dịch riêng.
  const simBefore = (lesson.sections ?? []).filter((x) => x.type === "sim").length;
  const simNew = blocks.filter((x) => x.type === "sim").length;
  if (simNew > 0 && simBefore + simNew > 1) err(slug, `bài sẽ có ${simBefore + simNew} khối sim (đã có ${simBefore}) - tối đa 1`);
  if (path.basename(file).startsWith("q")) {
    // ALLOW_TEACHING=1 (q06): được kèm đoạn dạy ngắn (heading/paragraph/list/callout) đứng
    // trước khối sim, cho bài mà kho CHƯA dạy chủ đề của nhiệm vụ.
    const onlySim = (x) => x.type === "sim" || (process.env.ALLOW_TEACHING && CONNECTIVE.has(x.type));
    if (blocks.some((x) => !onlySim(x))) err(slug, "tệp qNN chỉ được chứa khối sim");
    if (!process.env.ALLOW_TRANSLATED && existsSync(path.join(root, "lib/lessons-i18n/en", `${slug}.json`))) err(slug, "bài đã có bản dịch tiếng Anh - bỏ qua (khối thêm làm lệch bản dịch)");
  }

  // Đợt rNN: đúng MỘT khối mô phỏng (sim | aiLab | scenario) cho bài chưa có loại nào.
  if (path.basename(file).startsWith("r")) {
    const SIMLIKE = new Set(["sim", "aiLab", "scenario"]);
    if ((lesson.sections ?? []).some((x) => SIMLIKE.has(x.type))) err(slug, "bài đã có khối mô phỏng (sim/aiLab/scenario) - không thuộc đợt này");
    if (blocks.length !== 1 || !SIMLIKE.has(blocks[0].type)) err(slug, "tệp rNN: mỗi bài đúng MỘT khối, thuộc sim | aiLab | scenario");
    if (!process.env.ALLOW_TRANSLATED && existsSync(path.join(root, "lib/lessons-i18n/en", `${slug}.json`))) err(slug, "bài đã có bản dịch tiếng Anh - để đợt dịch riêng (ALLOW_TRANSLATED=1)");
  }

  const before = countBlockKinds(lesson.sections);
  const after = countBlockKinds([...(lesson.sections ?? []), ...blocks]);
  if (before.practice === 0 && after.practice === 0) err(slug, "bài đang thiếu thực hành (exercise/sim/aiLab/scenario) mà đợt này không thêm");
  if (before.visual === 0 && after.visual === 0) err(slug, "bài đang thiếu hình ảnh (chart/flow/feynman) mà đợt này không thêm");
  practiceAdded += after.practice - before.practice;
  visualAdded += after.visual - before.visual;

  const existingTitles = new Set((lesson.sections ?? []).map((s) => s.title).filter(Boolean));
  blocks.forEach((b, i) => {
    const where = `khối ${i} (${b.type})`;
    if (!ALLOWED.has(b.type)) { err(slug, `${where}: loại khối không được phép trong khối thêm`); return; }
    for (const e of validateInteractiveBlock(b, { simMissions })) err(slug, `${where}: ${e}`);
    if (b.title && existingTitles.has(b.title)) warn(slug, `${where}: tiêu đề trùng một khối đã có trong bài`);
    if (/\b(bài|lesson)\s*\d{3,4}\b/i.test(JSON.stringify(b))) err(slug, `${where}: nhắc tới id nội bộ của bài (vd "bài 2704")`);
    if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(JSON.stringify(b))) err(slug, `${where}: có emoji - UI không vẽ emoji`);

    if (b.type === "feynman" && (b.columns?.length !== 3 || !b.rows?.length || b.rows.some((r) => r.length !== 3) || !b.oneLiner)) {
      err(slug, `${where}: feynman phải đúng 3 cột và mỗi hàng 3 ô (FeynmanCard vẽ đúng ba cột) + có oneLiner`);
    }
    if (b.type === "exercise") {
      const sol = run(b.language, b.solution);
      if (!sol.ok) err(slug, `${where}: lời giải chạy lỗi - ${sol.error}`);
      else {
        const g = gradeOutput(sol.stdout, b.expectedOutput);
        if (!g.pass) err(slug, `${where}: lời giải in "${g.actualLine ?? "(thiếu)"}" ở dòng ${g.line}, đề chờ "${g.expectedLine}"`);
      }
      const st = run(b.language, b.starter);
      if (st.ok && gradeOutput(st.stdout, b.expectedOutput).pass) err(slug, `${where}: mã khởi đầu đã qua sẵn`);
      if (String(b.starter).trim() === String(b.solution).trim()) err(slug, `${where}: starter giống solution`);
    }
    if (b.type === "aiLab" && b.mode === "prompt") {
      for (const p of b.parts ?? []) {
        const len = (p.options ?? []).map((o) => o.text.length);
        const g = (p.options ?? []).findIndex((o) => o.good);
        if (g >= 0 && len.length >= 3) {
          goodTotal++;
          if (len[g] === Math.max(...len) && len.filter((x) => x === len[g]).length === 1) goodLongest++;
        }
      }
    }
  });
}

console.log(`${file}: ${lessonsChecked} bài · +${practiceAdded} khối thực hành · +${visualAdded} khối hình ảnh`);
if (goodTotal >= 6 && goodLongest / goodTotal > 0.5) {
  warn("(cả tệp)", `aiLab: phương án tốt là phương án DÀI nhất ở ${goodLongest}/${goodTotal} phần - người học đoán được. Viết lại phương án nhiễu cho dài hơn / đáp án gọn hơn.`);
}
if (warns.length) console.log(`CẢNH BÁO (${warns.length}):\n${warns.slice(0, 40).join("\n")}`);
if (errors.length) {
  console.log(`LỖI (${errors.length}):\n${errors.slice(0, 80).join("\n")}`);
  process.exit(1);
}
console.log("OK - qua các kiểm tra riêng của tệp này (chưa thay cho npm run audit:lessons / audit:exercises).");
