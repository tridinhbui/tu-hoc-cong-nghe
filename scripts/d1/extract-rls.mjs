#!/usr/bin/env node
// Tính tập chính sách RLS ĐANG SỐNG bằng cách phát lại migration theo thứ tự.
//
// Đếm thô cho 204 `create policy` và 150 `drop policy`. Cả hai con số đều vô
// nghĩa nếu lấy riêng: một chính sách bị xoá rồi tạo lại ba lần vẫn chỉ là MỘT
// chính sách đang sống. Trạng thái cuối là thứ phải dịch sang mã, và nó chỉ ra
// được bằng cách chạy lại lịch sử.
//
// Khoá là (bảng, tên chính sách) - đúng khoá mà Postgres dùng, nên "drop policy
// X on T" xoá đúng cái mà "create policy X on T" đã tạo.
//
// GIỚI HẠN PHẢI BIẾT: đây vẫn là lịch sử trong repo, không phải cơ sở dữ liệu
// đang chạy. Một chính sách tạo bằng tay trên Dashboard sẽ không có ở đây, và
// không có cách nào đọc pg_policies qua PostgREST. Con số cuối phải được đối
// chiếu với `select * from pg_policies` chạy trong SQL Editor của Supabase.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const files = ["supabase/migrations", "sql-canchay"]
  .flatMap((d) => readdirSync(d).filter((f) => f.endsWith(".sql")).map((f) => `${d}/${f}`))
  .sort();

const live = new Map();
const key = (t, n) => `${t} ${n}`;

const CREATE = /create\s+policy\s+"?([^"\s]+(?:\s+[^"\s]+)*?)"?\s+on\s+(?:public\.)?"?(\w+)"?([\s\S]*?);/gi;
const DROP = /drop\s+policy\s+(?:if\s+exists\s+)?"?([^"\s]+(?:\s+[^"\s]+)*?)"?\s+on\s+(?:public\.)?"?(\w+)"?\s*;/gi;

for (const file of files) {
  const sql = readFileSync(file, "utf8");
  // Xử lý theo THỨ TỰ XUẤT HIỆN trong tệp, không phải drop hết rồi create hết:
  // nhiều migration viết drop-rồi-create-lại ngay bên dưới, và làm sai thứ tự
  // sẽ xoá mất chính cái vừa tạo.
  const events = [];
  for (const m of sql.matchAll(CREATE)) events.push({ at: m.index, kind: "create", m });
  for (const m of sql.matchAll(DROP)) events.push({ at: m.index, kind: "drop", m });
  events.sort((a, b) => a.at - b.at);

  for (const e of events) {
    if (e.kind === "drop") {
      live.delete(key(e.m[2], e.m[1].trim()));
    } else {
      const body = e.m[3];
      const cmd = (body.match(/for\s+(all|select|insert|update|delete)/i) ?? [, "all"])[1].toLowerCase();
      const roles = (body.match(/to\s+([a-z_,\s]+?)(?:\s+using|\s+with\s+check|$)/i) ?? [, ""])[1].trim();
      const using = (body.match(/using\s*\(([\s\S]*?)\)\s*(?:with\s+check|$)/i) ?? [, ""])[1].trim();
      const check = (body.match(/with\s+check\s*\(([\s\S]*)$/i) ?? [, ""])[1].replace(/\)\s*$/, "").trim();
      live.set(key(e.m[2], e.m[1].trim()), {
        table: e.m[2], name: e.m[1].trim(), cmd, roles, using, check, file,
      });
    }
  }
}

const policies = [...live.values()].sort((a, b) => a.table.localeCompare(b.table) || a.name.localeCompare(b.name));
writeFileSync("scripts/d1/rls-policies.json", JSON.stringify(policies, null, 1) + "\n");

const byTable = {};
for (const p of policies) (byTable[p.table] ??= []).push(p);

console.log(`chinh sach dang song: ${policies.length}  (tu 204 lenh tao va 150 lenh xoa)`);
console.log(`bang duoc phu: ${Object.keys(byTable).length}`);

const byCmd = {};
for (const p of policies) byCmd[p.cmd] = (byCmd[p.cmd] || 0) + 1;
console.log("theo loai thao tac:", JSON.stringify(byCmd));

// Hinh dang dieu kien quyet dinh dich sang ma de hay kho.
const shapes = { "auth.uid() = cot": 0, "co auth.uid() phuc tap hon": 0, "hang true (cong khai)": 0, "khac": 0 };
for (const p of policies) {
  const cond = `${p.using} ${p.check}`.trim();
  if (/^true$/i.test(cond)) shapes["hang true (cong khai)"]++;
  else if (/^\(?\s*auth\.uid\(\)\s*=\s*\w+\s*\)?$/i.test(cond)) shapes["auth.uid() = cot"]++;
  else if (/auth\.uid\(\)/i.test(cond)) shapes["co auth.uid() phuc tap hon"]++;
  else shapes["khac"]++;
}
console.log("hinh dang dieu kien:");
for (const [k, v] of Object.entries(shapes)) console.log(`  ${String(v).padStart(4)}  ${k}`);
