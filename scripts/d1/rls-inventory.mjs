#!/usr/bin/env node
// Kiểm kê chính sách RLS của Supabase, thành danh sách việc cho tầng D1.
//
// VÌ SAO CẦN: D1 không có row level security. 197 chính sách trong
// supabase/migrations là 197 quy tắc hiện đang được cơ sở dữ liệu áp - và khi
// chuyển sang D1 chúng phải được áp ở tầng ứng dụng, từng cái một. Sót một cái
// là lộ dữ liệu mà không có gì báo: truy vấn vẫn chạy, chỉ là nó trả về cả hàng
// của người khác.
//
// Kịch bản này KHÔNG chuyển đổi gì. Nó biến "197 chính sách ở đâu đó" thành một
// danh sách phân loại, để biết cái nào phủ được bằng một cơ chế chung và cái nào
// phải đọc từng cái. Chạy lại được, nên nó không lệch khỏi migrations như một
// bảng chép tay sẽ lệch.
//
//   node scripts/d1/rls-inventory.mjs            # bảng tóm tắt
//   node scripts/d1/rls-inventory.mjs --json     # dữ liệu đầy đủ
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const DIR = "supabase/migrations";
let src = "";
for (const f of readdirSync(DIR).filter((f) => f.endsWith(".sql")).sort()) {
  src += "\n" + readFileSync(`${DIR}/${f}`, "utf8");
}

// Một chính sách có thể được tạo lại ở migration sau. Khoá theo (bảng, tên) và
// giữ bản CUỐI, vì đó là bản đang chạy - đếm thô cho 197, gom lại còn 195.
// Ten bang bat toi KHOANG TRANG roi moi kiem, thay vi bat bang mot mau dinh
// danh. Ban truoc dung mau `schema(.ten)?` voi nhom `.ten` la tuy chon, nen voi
// `on public.%I` phan `%I` khong khop, nhom rot, va no lay luon `public` lam ten
// bang: mot dong ma trong bao cao, cong voi SAU bang that trong vong lap SQL
// dong khong duoc dem. Bat tho roi kiem thi hong thanh THAY DUOC.
const re = /create\s+policy\s+(?:if\s+not\s+exists\s+)?("([^"]+)"|'([^']+)'|([a-z0-9_]+))\s+on\s+(\S+?)\s+([\s\S]*?);/gi;
const IDENT = /^(?:"[^"]+"|[a-z0-9_]+)(?:\.(?:"[^"]+"|[a-z0-9_]+))?$/i;
const last = new Map();
let raw = 0, m;
while ((m = re.exec(src))) {
  raw++;
  const rawTable = m[5];
  // `%I`, `%s` hay bat cu thu gi khong phai dinh danh = chinh sach sinh trong
  // SQL dong. Khong doan no ap cho bang nao; gom rieng de co nguoi doc tan mat.
  const dynamic = !IDENT.test(rawTable);
  const table = rawTable.replace(/"/g, "").replace(/^public\./, "");
  const name = m[2] || m[3] || m[4];
  const body = m[6].replace(/\s+/g, " ").trim();
  const cmd = (body.match(/\bfor\s+(all|select|insert|update|delete)\b/i) || [])[1] || "all";
  last.set(`${table}|${name}`, { table, name, cmd: cmd.toUpperCase(), body, dynamic });
}
const policies = [...last.values()];

const hasSubquery = (b) => /exists\s*\(|select\s+.*\s+from/i.test(b);
const ownerColumn = (b) =>
  (b.match(/auth\.uid\(\)\s*=\s*"?([a-z0-9_]+)"?/i) || [])[1] ||
  (b.match(/"?([a-z0-9_]+)"?\s*=\s*auth\.uid\(\)/i) || [])[1] || null;

function classify(p) {
  if (p.dynamic) return "dynamic";
  const b = p.body.toLowerCase();
  if (hasSubquery(b)) return "subquery";                     // phải đọc từng cái
  if (/is_admin|app_metadata|\bjwt\b|role\s*=/.test(b)) return "role";
  if (/auth\.uid\(\)/.test(b)) {
    return (b.match(/auth\.uid\(\)/g) || []).length === 1 ? "own-row" : "own-row-multi";
  }
  if (/\btrue\b/.test(b)) return "public";                   // cố ý mở, phải xác nhận
  return "other";
}

const rows = policies.map((p) => ({ ...p, kind: classify(p), owner: ownerColumn(p.body) }));
const byKind = {};
for (const r of rows) (byKind[r.kind] ??= []).push(r);

const LABEL = {
  "own-row": "chỉ hàng của mình - phủ được bằng một cơ chế chung",
  "own-row-multi": "nhiều lần auth.uid() - đọc lại từng cái",
  subquery: "truy vấn bảng khác - phải viết riêng",
  role: "kiểm tra vai trò",
  public: "công khai - phải XÁC NHẬN là cố ý",
  other: "chưa phân loại được",
  dynamic: "sinh trong SQL động - tên bảng là biến, phải đọc vòng lặp",
};

if (process.argv.includes("--json")) {
  const out = "scripts/d1/rls-inventory.json";
  writeFileSync(out, JSON.stringify({ raw, unique: rows.length, rows }, null, 2));
  console.log(`ghi ${out}: ${rows.length} chính sách`);
} else {
  console.log(`Chính sách RLS: ${raw} lần khai, ${rows.length} còn hiệu lực, trên ${new Set(rows.map((r) => r.table)).size} bảng\n`);
  for (const [k, v] of Object.entries(byKind).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`${String(v.length).padStart(4)}  ${LABEL[k] ?? k}`);
  }
  const own = byKind["own-row"] ?? [];
  const cols = {};
  for (const r of own) if (r.owner) (cols[r.owner] ??= new Set()).add(r.table);
  console.log(`\nCột chủ sở hữu của nhóm "chỉ hàng của mình":`);
  for (const [c, ts] of Object.entries(cols).sort((a, b) => b[1].size - a[1].size)) {
    console.log(`  ${String(ts.size).padStart(3)} bảng  ${c}${ts.size === 1 ? `  (${[...ts][0]})` : ""}`);
  }
  const hard = [...(byKind.subquery ?? []), ...(byKind["own-row-multi"] ?? []), ...(byKind.other ?? [])];
  console.log(`\nPhải đọc từng cái: ${hard.length} chính sách trên ${new Set(hard.map((r) => r.table)).size} bảng`);
  for (const t of [...new Set(hard.map((r) => r.table))].sort()) {
    console.log(`  ${t} (${hard.filter((r) => r.table === t).length})`);
  }
}
