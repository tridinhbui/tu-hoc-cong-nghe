#!/usr/bin/env node
// Dịch bản chụp lược đồ Postgres sang DDL SQLite cho D1.
//
// SQLite chỉ có năm kiểu lưu trữ, nên mọi thứ giàu hơn thế đều mất đi và phải
// được canh lại trong mã ứng dụng. Bảng dưới ghi rõ từng chỗ mất, vì cái nguy
// hiểm không phải là mất mà là mất mà không ai ghi lại.
import { readFileSync, writeFileSync } from "node:fs";

const snap = JSON.parse(readFileSync("scripts/d1/schema-snapshot.json", "utf8"));

// PostgREST bỏ sót đúng một dạng mặc định: jsonb. Bốn cột NOT NULL kiểu jsonb có
// `default '{}'::jsonb` trong Postgres mà OpenAPI khai là không có, nên nếu tin
// bản chụp thì D1 sẽ từ chối đúng những lệnh chèn mà Postgres vẫn nhận.
// scripts/d1/defaults-from-migrations.mjs dựng lại phần thiếu ấy từ migration.
// Nếu bản vá lệch với bản chụp thì chạy lại cả hai script, đừng sửa tay tệp JSON.
const patch = JSON.parse(readFileSync("scripts/d1/defaults-patch.json", "utf8"));
let patched = 0;
for (const [key, value] of Object.entries(patch)) {
  const [t, c] = key.split(".");
  const col = snap.tables[t]?.columns.find((x) => x.name === c);
  if (!col) throw new Error(`bản vá nhắc tới ${key} nhưng bản chụp không có cột đó`);
  col.default = value;
  patched++;
}

// uuid/timestamptz/date/jsonb/text[] đều thành TEXT. Postgres kiểm tính hợp lệ
// của chúng; SQLite thì không, nên một uuid sai định dạng hay một json hỏng sẽ
// ghi được im lặng. Đây là ràng buộc chuyển từ DB sang lớp kho dữ liệu.
const TYPE = {
  "text": "TEXT",
  "uuid": "TEXT",
  "date": "TEXT",
  "timestamp with time zone": "TEXT",
  "timestamp without time zone": "TEXT",
  "jsonb": "TEXT",
  "json": "TEXT",
  "text[]": "TEXT",
  "integer": "INTEGER",
  "bigint": "INTEGER",
  "smallint": "INTEGER",
  "boolean": "INTEGER",
  "numeric": "REAL",
  "double precision": "REAL",
  "real": "REAL",
};

// numeric -> REAL là chỗ mất mát THẬT chứ không chỉ hình thức: numeric của
// Postgres là thập phân chính xác, REAL là dấu phẩy động nhị phân. Nếu bất kỳ
// cột numeric nào đang giữ tiền thì phép cộng sẽ sai ở chữ số cuối. Script in
// riêng danh sách cột numeric để soát bằng mắt.
const numericCols = [];

function sqliteDefault(col) {
  const d = col.default;
  if (d === undefined) return null;
  if (d === "now()" || d === "CURRENT_TIMESTAMP") return "CURRENT_TIMESTAMP";
  // gen_random_uuid() không có ở SQLite. Bỏ mặc định và để lớp kho dữ liệu sinh
  // uuid - cố tình, vì một mặc định lặng lẽ biến mất còn tệ hơn không có.
  if (typeof d === "string" && /gen_random_uuid|uuid_generate/.test(d)) return null;
  if (typeof d === "boolean") return d ? "1" : "0";
  if (typeof d === "number") return String(d);
  if (typeof d === "string") {
    if (/^'.*'::/.test(d)) return d.replace(/::.*$/, "");   // 'x'::text -> 'x'
    if (/^-?\d+(\.\d+)?$/.test(d)) return d;
    if (/\(|\)/.test(d)) return null;                        // biểu thức khác: bỏ
    return `'${d.replace(/'/g, "''")}'`;
  }
  return null;
}

const out = [];
const notes = { noUuidDefault: [], droppedDefault: [], arrays: [], jsonb: [] };

out.push("-- Sinh bởi scripts/d1/generate-schema.mjs - ĐỪNG sửa tay.");
out.push(`-- Nguồn: bản chụp PostgREST ngày ${snap.takenAt}.`);
out.push("PRAGMA foreign_keys = ON;");
out.push("");

for (const [table, def] of Object.entries(snap.tables).sort()) {
  const pks = def.columns.filter((c) => c.primaryKey);
  const lines = [];

  for (const col of def.columns) {
    const type = TYPE[col.format];
    if (!type) throw new Error(`chưa biết dịch kiểu ${col.format} (${table}.${col.name})`);
    if (col.format === "numeric" || col.format === "double precision") numericCols.push(`${table}.${col.name}`);
    if (col.format === "text[]") notes.arrays.push(`${table}.${col.name}`);
    if (col.format === "jsonb" || col.format === "json") notes.jsonb.push(`${table}.${col.name}`);

    // Trích dẫn MỌI định danh, không chỉ những cái trùng từ khoá. Danh sách từ
    // khoá của SQLite dài và còn dài thêm theo phiên bản; một bảng có cột "order"
    // đã đủ làm hỏng cả tệp, và cách duy nhất không phải bảo trì danh sách ấy là
    // trích dẫn tất cả. Tên bảng cũng vậy - có bảng viết camelCase.
    let line = `  "${col.name}" ${type}`;

    // Khoá chính nguyên đơn: dùng INTEGER PRIMARY KEY để trùng rowid, nên nó tự
    // tăng giống identity của Postgres. KHÔNG thêm AUTOINCREMENT - từ khoá đó
    // dựng thêm một bảng nội bộ và chỉ đổi hành vi tái dùng id sau khi xoá.
    const solePk = pks.length === 1 && pks[0] === col;
    if (solePk && type === "INTEGER") {
      line += " PRIMARY KEY";
    } else {
      if (col.notNull) line += " NOT NULL";
    }
    if (col.default !== undefined && typeof col.default === "string" && /gen_random_uuid|uuid_generate/.test(col.default)) {
      notes.noUuidDefault.push(`${table}.${col.name}`);
    }
    const def_ = sqliteDefault(col);
    if (def_ && !(solePk && type === "INTEGER")) line += ` DEFAULT ${def_}`;
    else if (col.default !== undefined && !def_ && !/gen_random_uuid|uuid_generate/.test(String(col.default)))
      notes.droppedDefault.push(`${table}.${col.name} = ${col.default}`);

    if (col.foreignKey) {
      // auth.users nằm ở lược đồ auth của Supabase và KHÔNG đi cùng sang D1.
      // Giai đoạn xác thực sẽ dựng bảng người dùng riêng; tới lúc đó khoá ngoại
      // này mới nối được, nên giờ để nguyên tên bảng đích và kiểm ở đó.
      line += ` REFERENCES "${col.foreignKey.table}"("${col.foreignKey.column}")`;
    }
    lines.push(line);
  }

  if (pks.length > 1 || (pks.length === 1 && TYPE[pks[0].format] !== "INTEGER")) {
    lines.push(`  PRIMARY KEY (${pks.map((c) => `"${c.name}"`).join(", ")})`);
  }

  out.push(`CREATE TABLE IF NOT EXISTS "${table}" (`);
  out.push(lines.join(",\n"));
  out.push(");");
  out.push("");
}

writeFileSync("migrations-d1/0001_schema.sql", out.join("\n"));

console.log(`đã sinh: ${Object.keys(snap.tables).length} bảng -> migrations-d1/0001_schema.sql`);
console.log(`  mặc định jsonb vá từ migration: ${patched}`);
console.log(`  cột numeric/float cần soát tay: ${numericCols.length}`);
console.log(`  cột uuid mất mặc định gen_random_uuid: ${notes.noUuidDefault.length}`);
console.log(`  cột mảng text[] phải mã hoá JSON: ${notes.arrays.length}`);
console.log(`  cột jsonb phải mã hoá JSON: ${notes.jsonb.length}`);
console.log(`  mặc định bị bỏ vì là biểu thức: ${notes.droppedDefault.length}`);
if (notes.droppedDefault.length) notes.droppedDefault.forEach((s) => console.log(`     ${s}`));
console.log("\ncột numeric (kiểm xem có cột nào giữ TIỀN không - REAL sẽ sai chữ số cuối):");
numericCols.forEach((c) => console.log(`     ${c}`));
