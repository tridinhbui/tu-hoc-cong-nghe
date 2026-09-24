#!/usr/bin/env node
// PostgREST KHÔNG báo cáo mọi giá trị mặc định. Ví dụ đã bắt được:
// user_profiles.tour_flags có `default '{}'::jsonb` trong migration, còn bản chụp
// OpenAPI thì trống - nên DDL sinh ra là NOT NULL không mặc định, và mọi lệnh
// chèn không nêu cột đó sẽ hỏng. Postgres nhận, D1 từ chối.
//
// Script này đọc supabase/migrations để vá đúng phần thiếu ấy, và CHỈ phần ấy:
// nó không thay bản chụp làm nguồn tin cậy, vì migration là lịch sử và một cột
// có thể được đổi mặc định ở tệp sau. Nó lấy lần khai BÁO CUỐI CÙNG theo thứ tự
// tên tệp, vốn là thứ tự thời gian trong repo này.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const dirs = ["supabase/migrations", "sql-canchay"];
const files = dirs.flatMap((d) =>
  readdirSync(d).filter((f) => f.endsWith(".sql")).map((f) => `${d}/${f}`)
).sort();

const found = {}; // "table.column" -> default text

for (const file of files) {
  const sql = readFileSync(file, "utf8");

  // alter table X add column [if not exists] col type ... default V ...;
  for (const m of sql.matchAll(
    /alter\s+table\s+(?:only\s+)?(?:public\.)?"?(\w+)"?[\s\S]*?add\s+column\s+(?:if\s+not\s+exists\s+)?"?(\w+)"?\s+([^;]*?)default\s+([^;]+?)(?:\s+not\s+null)?\s*;/gi
  )) {
    found[`${m[1]}.${m[2]}`] = m[4].trim();
  }

  // create table X ( ... ); - quét từng dòng cột bên trong
  for (const m of sql.matchAll(/create\s+table\s+(?:if\s+not\s+exists\s+)?(?:public\.)?"?(\w+)"?\s*\(([\s\S]*?)\n\s*\)\s*;/gi)) {
    const table = m[1];
    for (const line of m[2].split("\n")) {
      const c = line.match(/^\s*"?(\w+)"?\s+[\w\s()\[\]]*?\bdefault\s+(.+?)(?:\s+not\s+null)?\s*,?\s*$/i);
      if (c && !/^(primary|foreign|unique|constraint|check)$/i.test(c[1])) {
        found[`${table}.${c[1]}`] = c[2].trim();
      }
    }
  }
}

const snap = JSON.parse(readFileSync("scripts/d1/schema-snapshot.json", "utf8"));
const patch = {};
let missing = 0;
for (const [t, d] of Object.entries(snap.tables))
  for (const c of d.columns)
    if (c.notNull && c.default === undefined && !c.primaryKey) {
      const key = `${t}.${c.name}`;
      if (found[key]) patch[key] = found[key];
      else missing++;
    }

writeFileSync("scripts/d1/defaults-patch.json", JSON.stringify(patch, null, 1) + "\n");
console.log(`mặc định tìm lại được từ migration: ${Object.keys(patch).length}`);
console.log(`cột NOT NULL vẫn không có mặc định ở đâu cả: ${missing}  (đúng - ứng dụng phải luôn truyền giá trị)`);
console.log();
for (const [k, v] of Object.entries(patch)) console.log(`  ${k} = ${v}`);
