#!/usr/bin/env node
// Đối chiếu từng TRƯỜNG giữa dữ liệu nguồn và D1, không chỉ đếm hàng.
//
// Số hàng khớp gần như không chứng minh gì: mọi lỗi chuyển kiểu đều giữ nguyên
// số hàng. Một cột boolean đọc ra chuỗi "0", một jsonb thành "[object Object]",
// một timestamp mất múi giờ - tất cả đều cho đúng số hàng và sai dữ liệu.
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const snap = JSON.parse(readFileSync("scripts/d1/schema-snapshot.json", "utf8"));
const table = process.argv[2];
// Cỡ mẫu mặc định co giãn theo kích thước bảng.
//
// Một con số cố định 200 nghe như nhau ở mọi bảng nhưng không phải: nó là 100%
// của một bảng 150 hàng và 0,6% của reading_progress với 31.265 hàng. Bốn bảng
// lớn nhất - và chúng đúng là bốn bảng giữ tiến độ học, thứ mất thì không dựng
// lại được - từng chỉ được kiểm 0,6-1,6%.
//
// Công thức: ít nhất 200 hàng, hoặc 5% bảng, trần 2.000 để một lượt chạy đầy đủ
// còn kết thúc trong thời gian người ta chịu ngồi đợi. Truyền tham số thứ hai để
// ghi đè khi cần kiểm sâu một bảng cụ thể.
const sampleFor = (n) => Math.min(n, Math.max(200, Math.min(2000, Math.ceil(n * 0.05))));

const cols = snap.tables[table].columns;
const fmt = Object.fromEntries(cols.map((c) => [c.name, c.format]));
const pk = cols.filter((c) => c.primaryKey).map((c) => c.name);

const SAMPLE = Number(process.argv[3] ?? 0);
const src = readFileSync(`scripts/d1/data/${table}.jsonl`, "utf8").split("\n").filter(Boolean).map(JSON.parse);

// Mẫu NGẪU NHIÊN có hạt giống, không phải bước cố định.
//
// Bản trước lấy mỗi hàng thứ N (`i % step === 0`). Nó tránh được lỗi "chỉ lấy N
// hàng đầu", nhưng đổi một thiên lệch lấy một thiên lệch khác: nếu hỏng hóc
// tương quan với vị trí - một lô nạp lỗi, một biên chunk sai, một đợt di trú cũ -
// thì bước cố định hoặc trượt sạch hoặc trúng sạch, và không cách nào biết là
// cái nào. Mẫu ngẫu nhiên thì mỗi hàng có xác suất được chọn như nhau, nên
// "200 hàng khớp" nói được một điều về 27.000 hàng còn lại.
//
// Hạt giống cố định để chạy lại cho cùng kết quả: một lần chạy đỏ phải tái hiện
// được, nếu không thì không sửa rồi xác nhận được.
function rng(seed) {
  let x = seed >>> 0;
  return () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 0x100000000; };
}
const rand = rng(Number(process.env.VERIFY_SEED ?? 20260818));
const idx = src.map((_, i) => i);
for (let i = idx.length - 1; i > 0; i--) {
  const j = Math.floor(rand() * (i + 1));
  [idx[i], idx[j]] = [idx[j], idx[i]];
}
const N = SAMPLE || sampleFor(src.length);
const sample = idx.slice(0, Math.min(N, src.length)).sort((a, b) => a - b).map((i) => src[i]);

// So khớp theo TOÀN BỘ khoá chính, không chỉ cột đầu.
//
// Bản đầu của script này lấy `WHERE pk[0] IN (...)` rồi lập chỉ mục theo pk[0].
// Với khoá ghép thì một giá trị pk[0] trỏ tới nhiều hàng, nên nó bốc đại một hàng
// và báo lệch ở mọi cột còn lại. Ba bảng "sai dữ liệu" - announcement_reads,
// community_post_reactions, user_follows - hoá ra đều là khoá ghép, và dữ liệu
// của chúng đúng cả. Sai ở phép đo, không sai ở dữ liệu.
const key = (r) => pk.map((c) => String(r[c])).join("\u0000");

// Chia lô truy vấn thay vì một chuỗi OR dài.
//
// Bản trước dựng `WHERE (a AND b) OR (a AND b) OR ...` một lần cho cả mẫu. Với
// mẫu 200 nó còn chạy, nhưng đây đúng loại giới hạn mà đợt nạp đã đụng hai lần
// (`UNION ALL`, rồi `UNION`): D1 giới hạn độ sâu biểu thức rất thấp. Nâng mẫu
// lên cho các bảng lớn - việc cần làm để phép kiểm nói được điều gì - sẽ làm nó
// vỡ, và vỡ theo kiểu khó đoán chứ không phải một thông báo rõ ràng.
//
// 50 mệnh đề mỗi lô là mức thận trọng, đổi lấy vài lần gọi thêm.
const BATCH = 50;
const byId = {};
for (let i = 0; i < sample.length; i += BATCH) {
  const chunk = sample.slice(i, i + BATCH);
  const where = chunk
    .map((r) => "(" + pk.map((c) => `"${c}" = '${String(r[c]).replace(/'/g, "''")}'`).join(" AND ") + ")")
    .join(" OR ");
  const raw = execFileSync("npx", ["wrangler", "d1", "execute", "DB", "--local", "--json",
    "--command", `SELECT * FROM "${table}" WHERE ${where};`], { encoding: "utf8", maxBuffer: 1 << 28 });
  for (const r of JSON.parse(raw.slice(raw.indexOf("[")))[0].results) byId[key(r)] = r;
}

let checked = 0, bad = [];
for (const s of sample) {
  const d = byId[key(s)];
  if (!d) { bad.push([key(s), "(thiếu hẳn hàng)", "", ""]); continue; }
  for (const c of cols) {
    const want = s[c.name], have = d[c.name];
    checked++;
    let ok;
    if (want === null || want === undefined) ok = have === null || have === undefined;
    else switch (fmt[c.name]) {
      case "boolean": ok = have === (want ? 1 : 0); break;
      case "jsonb": case "json": case "text[]":
        ok = JSON.stringify(want) === String(have); break;
      case "numeric": case "double precision": case "real":
        ok = Math.abs(Number(want) - Number(have)) < 1e-9; break;
      case "integer": case "bigint": case "smallint":
        ok = Number(want) === Number(have); break;
      default: ok = String(want) === String(have);
    }
    if (!ok) bad.push([key(s), c.name, JSON.stringify(want), JSON.stringify(have)]);
  }
}

console.log(`${table}: đối chiếu ${checked} giá trị trên ${sample.length} hàng mẫu`);
if (!bad.length) console.log("  KHỚP HẾT");
else {
  console.log(`  LỆCH: ${bad.length}`);
  bad.slice(0, 12).forEach(([id, c, w, h]) => console.log(`    ${id} ${c}\n       nguồn: ${String(w).slice(0,90)}\n       D1   : ${String(h).slice(0,90)}`));
}
process.exit(bad.length ? 1 : 0);
