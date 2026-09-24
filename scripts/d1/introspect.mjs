#!/usr/bin/env node
// Chụp lược đồ SỐNG từ PostgREST và lưu vào scripts/d1/schema-snapshot.json.
//
// Vì sao đọc PostgREST chứ không đọc 380 tệp trong supabase/migrations: migration
// là LỊCH SỬ, không phải trạng thái. Một cột bị đổi kiểu ở tệp thứ 200 thì tệp thứ
// 40 vẫn khai kiểu cũ, và không có gì trong repo nói tệp nào thắng. PostgREST mô tả
// đúng cái đang chạy - kèm khoá chính, khoá ngoại, kiểu, mặc định và cho phép rỗng.
//
// Cái nó KHÔNG thấy: chính sách RLS, trigger, index, ràng buộc CHECK, thân hàm RPC.
// Những thứ đó phải lấy từ supabase/migrations, và đó là việc riêng.
import { writeFileSync } from "node:fs";
import { readFileSync } from "node:fs";

for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] ??= m[2];
}
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("thiếu NEXT_PUBLIC_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY trong .env.local");

const res = await fetch(`${url}/rest/v1/`, {
  headers: { apikey: key, Authorization: `Bearer ${key}` },
});
if (!res.ok) throw new Error(`PostgREST trả ${res.status}`);
const spec = await res.json();

const tables = {};
for (const [name, def] of Object.entries(spec.definitions ?? {})) {
  const required = new Set(def.required ?? []);
  const columns = Object.entries(def.properties ?? {}).map(([col, p]) => {
    const d = p.description ?? "";
    const fk = d.match(/<fk table='([^']+)' column='([^']+)'\/>/);
    return {
      name: col,
      format: p.format,
      notNull: required.has(col),
      primaryKey: /<pk\//.test(d),
      default: p.default,
      foreignKey: fk ? { table: fk[1], column: fk[2] } : null,
    };
  });
  tables[name] = { columns };
}

const rpcs = Object.keys(spec.paths ?? {})
  .filter((p) => p.startsWith("/rpc/"))
  .map((p) => p.slice(5))
  .sort();

const snapshot = { takenAt: new Date().toISOString().slice(0, 10), tables, rpcs };
writeFileSync("scripts/d1/schema-snapshot.json", JSON.stringify(snapshot, null, 1) + "\n");

const cols = Object.values(tables).reduce((n, t) => n + t.columns.length, 0);
console.log(`đã chụp: ${Object.keys(tables).length} bảng, ${cols} cột, ${rpcs.length} RPC`);
