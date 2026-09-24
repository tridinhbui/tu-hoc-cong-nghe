#!/usr/bin/env node
// Xuất dữ liệu Supabase ra tệp JSONL, một tệp mỗi bảng.
//
// Tách xuất khỏi nạp là cố ý: xuất đọc mạng và chậm, nạp thì chạy đi chạy lại
// nhiều lần trong lúc sửa lược đồ. Gộp hai việc lại thì mỗi lần sửa một cột phải
// tải lại 236 nghìn hàng.
//
// PostgREST trả tối đa 1000 hàng mỗi lần, nên phải phân trang. Phân trang theo
// OFFSET cần một thứ tự ỔN ĐỊNH, nếu không hàng sẽ trùng hoặc lọt: sắp theo khoá
// chính chứ không để mặc định, vì mặc định của Postgres là thứ tự vật lý và nó
// đổi khi có ai ghi vào giữa chừng.
import { readFileSync, writeFileSync, mkdirSync, appendFileSync } from "node:fs";

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] ??= m[2];
}
const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const H = { apikey: KEY, Authorization: `Bearer ${KEY}` };

const snap = JSON.parse(readFileSync("scripts/d1/schema-snapshot.json", "utf8"));
const DIR = "scripts/d1/data";
mkdirSync(DIR, { recursive: true });

// Bảng telemetry: 90.070 hàng, 38% toàn bộ dữ liệu, và là chuỗi sự kiện chứ
// không phải trạng thái. D1 sai công cụ cho nó - Analytics Engine mới đúng.
const SKIP = new Set(["feature_click_events"]);

const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const tables = (only.length ? only : Object.keys(snap.tables)).filter((t) => !SKIP.has(t));

for (const table of tables) {
  const cols = snap.tables[table].columns;
  const pk = cols.filter((c) => c.primaryKey).map((c) => c.name);
  const order = (pk.length ? pk : [cols[0].name]).join(",");

  const path = `${DIR}/${table}.jsonl`;
  writeFileSync(path, "");
  let from = 0, total = 0;
  for (;;) {
    const res = await fetch(
      `${URL_}/rest/v1/${table}?select=*&order=${order}&limit=1000&offset=${from}`,
      { headers: H }
    );
    if (!res.ok) throw new Error(`${table}: HTTP ${res.status} ${await res.text()}`);
    const rows = await res.json();
    if (!rows.length) break;
    appendFileSync(path, rows.map((r) => JSON.stringify(r)).join("\n") + "\n");
    total += rows.length;
    if (rows.length < 1000) break;
    from += 1000;
  }
  console.log(`${String(total).padStart(7)}  ${table}`);
}
