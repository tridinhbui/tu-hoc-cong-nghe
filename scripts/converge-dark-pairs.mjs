/**
 * Thống nhất bạn TỐI của mỗi sắc độ sáng về phương án ĐA SỐ.
 *
 * VẤN ĐỀ. Sau khi gộp token, còn 1.034 cặp `X dark:Y`. 86% trong số đó là bất
 * nhất chứ không phải vai trò: cùng một `bg-stone-50` đang ghép với stone-800
 * (59 lần), stone-950 (24) và stone-700 (2). Ba câu trả lời cho cùng một câu
 * hỏi, và không câu nào sai - chúng chỉ chưa bao giờ được so với nhau.
 *
 * KHÔNG ĐỘNG VÀO CẶP KHÁC HỌ MÀU. `text-stone-900 dark:text-violet-200` trông
 * như nhầm, nhưng nó là `getPodiumTone(rank)` trong Leaderboard.tsx: hạng nhất
 * vàng, hạng nhì bạc, hạng ba đồng, hạng tư tím. Gộp chúng về `stone-50` là
 * san phẳng cả bảng màu bục vinh quang. Quy tắc: chỉ thống nhất khi bạn tối
 * CÙNG HỌ MÀU với bạn đa số.
 *
 * Chạy: node scripts/converge-dark-pairs.mjs [--apply]
 */
import fs from "fs";
import path from "path";

const files = [];
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".tsx")) files.push(p);
  }
};
walk("app");
walk("components");

/* `\1` chứ không phải `\1?`.
 *
 * Bản `\1?` cho vế sáng mang một bổ ngữ mà vế tối thì không, nên nó coi
 * `hover:bg-stone-800 dark:bg-stone-100` là một cặp - trong khi đó là trạng
 * thái hover của nền sáng đứng cạnh nền CƠ SỞ của nền tối, hai thứ khác nhau.
 * Ghép chúng lại xoá mất một trong hai: tám nút mất hover ở nền sáng
 * (`hover:bg-stone-800` bị viết thành `hover:bg-stone-900`, trùng đúng lớp nền,
 * nên hover thành vô hiệu), và `OnboardingFlow` mất `dark:text-stone-600`.
 *
 * Không cái nào làm hỏng build hay đỏ một bộ kiểm nào - chúng chỉ hiện sai màu.
 * Tìm ra bằng cách quét "hover:X trùng đúng X", chứ không phải bằng cổng nào. */
const RE = /(?<![\w:/-])([a-z-]+:)?(bg|text|border|ring)-([a-z]+)-(\d{2,3})\s+dark:\1(?:)\2-([a-z]+)-(\d{2,3})(?![\w/-])/g;

// Vòng 1: đếm để tìm bạn đa số của từng lớp sáng.
const dem = {};
for (const f of files) {
  const s = fs.readFileSync(f, "utf8");
  for (const m of s.matchAll(RE)) {
    const sang = `${m[2]}-${m[3]}-${m[4]}`;
    const toi = `${m[5]}-${m[6]}`;
    (dem[sang] ??= {})[toi] = (dem[sang][toi] ?? 0) + 1;
  }
}

/* TOKEN LÀ NGUỒN QUYẾT ĐỊNH, không phải phiếu đa số của phần còn lại.
 *
 * Lần chạy đầu của script này đếm phiếu CHỈ trên các cặp chưa token hoá, và
 * nó tạo ra một bất nhất MỚI: `text-stone-700` gộp về `stone-200` (72 chỗ)
 * trong khi token `ink-body` đã định nghĩa `700 → 300` cho 144 chỗ khác. Hai
 * câu trả lời cho cùng một sắc độ, đúng thứ script sinh ra để xoá bỏ.
 *
 * Nên với mọi (thuộc tính, sắc độ sáng) đã có token, đích LÀ bạn tối của token.
 * Phiếu đa số chỉ dùng cho những sắc độ chưa ai đặt tên. */
const TOKEN_EXACT = {
  ink: ["stone-900","stone-100"], "ink-body": ["stone-700","stone-300"],
  "ink-muted": ["stone-500","stone-400"], "ink-faint": ["stone-400","stone-500"],
  "ink-soft": ["stone-600","stone-400"], "ink-heading": ["stone-800","stone-200"],
  surface: ["stone-50","stone-900"], "surface-raised": ["stone-100","stone-800"],
  "surface-sunken": ["stone-200","stone-800"], "surface-invert": ["stone-900","stone-100"],
  line: ["stone-200","stone-800"], "line-soft": ["stone-100","stone-800"],
  "line-strong": ["stone-300","stone-700"], "line-mid": ["stone-200","stone-700"],
  accent: ["emerald-600","emerald-400"], "accent-strong": ["emerald-700","emerald-400"],
  "accent-soft": ["emerald-50","emerald-950"], "accent-line": ["emerald-200","emerald-900"],
  warn: ["amber-600","amber-400"], "warn-strong": ["amber-700","amber-400"],
  "warn-soft": ["amber-50","amber-950"], "warn-line": ["amber-200","amber-900"],
  danger: ["red-700","red-400"], "danger-soft": ["red-50","red-950"],
  "danger-line": ["red-200","red-900"],
};
const TOKEN_PROPS = {
  ink:["text"],"ink-body":["text"],"ink-muted":["text"],"ink-faint":["text"],
  "ink-soft":["text"],"ink-heading":["text"],
  surface:["bg"],"surface-raised":["bg"],"surface-sunken":["bg"],"surface-invert":["bg"],
  line:["border"],"line-soft":["border"],"line-strong":["border"],"line-mid":["border"],
  accent:["text"],"accent-strong":["text"],"accent-soft":["bg"],"accent-line":["border"],
  warn:["text"],"warn-strong":["text"],"warn-soft":["bg"],"warn-line":["border"],
  danger:["text"],"danger-soft":["bg"],"danger-line":["border"],
};
const DICH_TOKEN = {};
for (const [tok, [sang, toi]] of Object.entries(TOKEN_EXACT)) {
  for (const prop of TOKEN_PROPS[tok] ?? []) {
    // `stone-200` là `line` cho border và `surface-sunken` cho bg - nên khoá
    // phải gồm cả thuộc tính. Cái nào khai trước thắng; thứ tự trong
    // TOKEN_EXACT phản ánh cặp đông nhất đã đo.
    DICH_TOKEN[`${prop}-${sang}`] ??= toi;
  }
}

const daSo = {};
const boQuaLyDo = {};
for (const [sang, v] of Object.entries(dem)) {
  const xep = Object.entries(v).sort((a, b) => b[1] - a[1]);
  // Có token cho sắc độ này thì token quyết định, kể cả khi chỉ còn một biến thể.
  if (DICH_TOKEN[sang]) { daSo[sang] = DICH_TOKEN[sang]; continue; }
  if (xep.length < 2) continue;

  // HOÀ PHIẾU: chọn bên nào cũng tuỳ tiện. `text-stone-300` có stone-700×8 và
  // stone-600×8 - không có "đa số" nào ở đây, chỉ có một quyết định thiết kế
  // chưa ai đưa ra. Để nguyên còn hơn tung đồng xu rồi đổi 8 chỗ.
  if (xep[0][1] === xep[1][1]) { boQuaLyDo[sang] = "hoà phiếu"; continue; }

  // CẶP ĐỒNG NHẤT: `text-stone-400 dark:text-stone-400` xuất hiện 11 lần và là
  // phương án đông nhất, nhưng nó là một sự THỪA chứ không phải một lựa chọn -
  // gộp 8 chỗ còn lại về đó nghĩa là xoá luôn khả năng thích ứng chế độ tối
  // của chúng. Một cặp thừa không đáng được nhân rộng.
  const sacDoSang = sang.replace(/^(bg|text|border|ring)-/, "");
  if (xep[0][0] === sacDoSang) { boQuaLyDo[sang] = "bạn đa số là cặp đồng nhất"; continue; }

  daSo[sang] = xep[0][0];
}

// Vòng 2: viết lại các cặp thiểu số.
const apply = process.argv.includes("--apply");
let doi = 0, boQua = 0, tep = 0;
const nhatKy = {};

for (const f of files) {
  const truoc = fs.readFileSync(f, "utf8");
  const s = truoc.replace(RE, (nguyen, bien, prop, hoS, doS, hoT, doT) => {
    const sang = `${prop}-${hoS}-${doS}`;
    const dich = daSo[sang];
    if (!dich) return nguyen;
    const hienTai = `${hoT}-${doT}`;
    if (hienTai === dich) return nguyen;
    // Khác họ màu → cố ý, giữ nguyên.
    if (hoT !== dich.split("-")[0]) { boQua++; return nguyen; }
    doi++;
    const k = `${sang} : ${hienTai} → ${dich}`;
    nhatKy[k] = (nhatKy[k] ?? 0) + 1;
    return `${bien ?? ""}${prop}-${hoS}-${doS} dark:${bien ?? ""}${prop}-${dich}`;
  });
  if (s !== truoc) { tep++; if (apply) fs.writeFileSync(f, s); }
}

console.log(`${apply ? "ĐÃ ĐỔI" : "sẽ đổi"} ${doi} chỗ trong ${tep} tệp · giữ nguyên ${boQua} cặp khác họ màu`);
for (const [k, v] of Object.entries(boQuaLyDo)) console.log(`  bỏ qua ${k}: ${v}`);
for (const [k, v] of Object.entries(nhatKy).sort((a, b) => b[1] - a[1]).slice(0, 12)) {
  console.log(String(v).padStart(4), k);
}
