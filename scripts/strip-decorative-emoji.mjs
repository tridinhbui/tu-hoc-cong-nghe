#!/usr/bin/env node
/**
 * Gỡ emoji TRANG TRÍ khỏi chữ hiển thị. Chạy: node scripts/strip-decorative-emoji.mjs [--apply]
 *
 * Quy tắc, theo từng chuỗi (literal "…", '…', `…`, chữ JSX giữa > và <, chuỗi JSON):
 *  - chuỗi CÓ chữ/số ngoài emoji  → xoá emoji, gộp khoảng trắng thừa;
 *  - chuỗi CHỈ là emoji            → để nguyên. Đó là trường icon (`emoji`,
 *    `iconEmoji`…), được vẽ thành icon Lucide qua components/Glyph.tsx lúc
 *    hiển thị; nhiều giá trị trong số đó đã nằm trong cơ sở dữ liệu làm khoá.
 *
 * KHÔNG phải emoji và được giữ: ✓ ✔ ✗ ✘ ★ ☆ và mũi tên → ← ↑ ↓ (dấu câu), trừ
 * khi mũi tên mang bộ chọn biến thể U+FE0F (↗️) - khi đó nó là emoji.
 *
 * Bỏ qua có chủ ý - emoji ở đây là DỮ LIỆU người dùng chọn, không phải trang trí:
 *  - EmojiPicker, avatar-customizer-types (avatar ghép bằng emoji);
 *  - mọi dòng có `REACTION` (REACTION_OPTIONS đã được ghi vào
 *    community_posts.my_reaction và so bằng ===, đổi chữ là mồ côi dữ liệu);
 *  - mọi dòng có `_PREFIX` (QUOTE_REPLY_PREFIX là định dạng lưu tin nhắn, bộ
 *    đọc so bằng startsWith - xem ChatWithAdminWidget);
 *  - lib/d1/rpc.ts.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const APPLY = process.argv.includes("--apply");
const ROOTS = ["app", "components", "lib"];
const SKIP_FILES = [/EmojiPicker\.tsx$/, /avatar-customizer-types\.ts$/, /lib\/d1\/rpc\.ts$/, /__tests__\//, /lessons-data\//];

const KEEP = new Set(["✓", "✔", "✗", "✘", "★", "☆"]);
const PICTO =
  "(?:[\\u{1F1E6}-\\u{1F1FF}]{2}|[\\u{1F000}-\\u{1FAFF}]|[\\u{2600}-\\u{27BF}]|[\\u{2B00}-\\u{2BFF}]|[\\u{231A}\\u{231B}\\u{2328}\\u{23CF}\\u{23E9}-\\u{23FA}]|[\\u{2190}-\\u{21FF}\\u{2934}\\u{2935}\\u{3030}\\u{303D}\\u{3297}\\u{3299}\\u{00A9}\\u{00AE}\\u{2122}](?=\\u{FE0F}))";
const EMOJI = new RegExp(`${PICTO}(?:\\u{FE0F}|\\u{20E3}|[\\u{1F3FB}-\\u{1F3FF}]|\\u{200D}${PICTO})*`, "gu");

function stripOne(text) {
  let changed = false;
  const out = text.replace(EMOJI, (m) => {
    const base = m.replace(/\u{FE0F}/gu, "");
    if (KEEP.has(base)) return m;
    changed = true;
    return "\u0000";
  });
  if (!changed) return text;
  const rest = out.replace(/\u0000/g, "");
  // Chỉ còn khoảng trắng / dấu câu → chuỗi icon thuần, để nguyên.
  if (!/[\p{L}\p{N}]/u.test(rest)) return text;
  return out
    .replace(/[ \t]*\u0000[ \t]*/g, (m, off, s) => {
      const before = s[off - 1];
      const after = s[off + m.length];
      // Ở đầu/cuối chuỗi hoặc cạnh dấu câu/ngoặc: không cần khoảng trắng.
      if (before === undefined || after === undefined) return "";
      // Ngay sau một escape (\n, \t) là đầu dòng - không chèn khoảng trắng.
      if (s[off - 2] === "\\" && /[ntr]/.test(before)) return "";
      if (/[\s({\["'`>]/.test(before) || /[\s)}\]"'`<.,:;!?]/.test(after)) return "";
      return " ";
    })
    .replace(/\u0000/g, "");
}

const STR = /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g;
const JSX_TEXT = />([^<>{}]*)</g;

function processSource(src, isJson, isTsx) {
  const lines = src.split("\n");
  let n = 0;
  const outLines = lines.map((line) => {
    if (/REACTION|_PREFIX\b/.test(line)) return line;
    let next = line.replace(STR, (lit) => {
      const q = lit[0];
      const inner = lit.slice(1, -1);
      const s = stripOne(inner);
      if (s !== inner) n++;
      return q + s + q;
    });
    // Chữ JSX bị formatter bẻ xuống dòng riêng: một dòng .tsx không có ký tự
    // mã nào (= ; ( ) { } < > và dấu nháy) thì cả dòng là chữ hiển thị.
    if (!isJson && isTsx && next.trim() && !/[=;(){}<>"'`]/.test(next)) {
      const s = stripOne(next);
      if (s !== next) n++;
      return s;
    }
    if (!isJson) {
      next = next.replace(JSX_TEXT, (m, inner) => {
        const s = stripOne(inner);
        if (s !== inner) n++;
        return `>${s}<`;
      });
    }
    return next;
  });
  return { out: outLines.join("\n"), n };
}

function walk(dir, acc) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (/\.(tsx?|json)$/.test(name)) acc.push(p);
  }
  return acc;
}

let total = 0;
const touched = [];
for (const root of ROOTS) {
  for (const file of walk(root, [])) {
    if (SKIP_FILES.some((re) => re.test(file))) continue;
    if (file.endsWith(".json") && !file.includes("lessons-i18n")) continue;
    const src = readFileSync(file, "utf8");
    const { out, n } = processSource(src, file.endsWith(".json"), file.endsWith(".tsx"));
    if (n) {
      total += n;
      touched.push(`${n}\t${file}`);
      if (APPLY) writeFileSync(file, out);
    }
  }
}
console.log(touched.sort((a, b) => parseInt(b) - parseInt(a)).join("\n"));
console.log(`${APPLY ? "đã đổi" : "sẽ đổi"} ${total} chuỗi trong ${touched.length} tệp`);
