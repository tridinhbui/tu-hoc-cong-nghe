#!/usr/bin/env node
// Dich dieu kien RLS cua Postgres thanh vi tu SQLite, roi CHAY THU tung cai.
//
// Phat hien lam thay doi cach lam: 28 chinh sach dung `exists (select 1 from
// ...)` khong can ma ung dung nao ca. Chung la SQL chuan ma SQLite hieu duoc.
// Chi hai thu phai doi:
//
//   auth.uid()  ->  ?      (tham so buoc, la id nguoi goi)
//   public.X    ->  X      (SQLite khong co luoc do)
//
// Giu nguyen SQL thay vi viet lai bang ma co mot loi the quyet dinh: ban dich
// GIONG HET ban goc ve mat ngu nghia, va doc lai thi so duoc tung ky tu voi
// chinh sach dang chay. Viet lai bang TypeScript la mot lan dien dich nua, va
// moi lan dien dich la mot co hoi lam lech quyen.
//
// Moi vi tu deu duoc CHAY THAT tren D1 local. Mot vi tu dich sai cu phap se
// hong ngay o day; mot vi tu dich dung cu phap nhung sai ngu nghia thi khong -
// nen day la phep kiem cu phap, khong phai phep kiem quyen.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const policies = JSON.parse(readFileSync("scripts/d1/rls-policies.json", "utf8"));
const snap = JSON.parse(readFileSync("scripts/d1/schema-snapshot.json", "utf8"));
const registry = JSON.parse(readFileSync("scripts/d1/policy-registry.json", "utf8"));

const manual = new Set(
  Object.entries(registry).filter(([, v]) => v.kind === "manual").map(([t]) => t)
);

// Ham chi co o Postgres. Danh sach nay KHONG doan truoc - no dung dung nhung
// gi phep chay thu bat duoc, va phep chay thu la thu quyet dinh no da du chua.
// Quet toan bo vi tu cho thay chi co bon ten ham duoc dung: exists, trim,
// char_length, va cac tu khoa and/or; nen bang nay phu het.
const PG_FUNCTIONS = [
  // char_length cua Postgres la length cua SQLite. Cung ngu nghia: dem KY TU,
  // khong dem byte - quan trong voi tieng Viet, vi mot chu co dau la 2-3 byte
  // ma van phai dem la mot ky tu.
  [/\bchar_length\s*\(/gi, "length("],
];

function translate(cond) {
  let out = cond
    .replace(/\s+/g, " ")
    .replace(/\bpublic\./gi, "")
    .replace(/auth\.uid\(\)/gi, "?")
    .trim();
  for (const [from, to] of PG_FUNCTIONS) out = out.replace(from, to);
  return out;
}

// Gop dieu kien cua CUNG mot bang + CUNG mot lenh bang OR.
//
// Postgres cong don nhieu chinh sach PERMISSIVE tren cung mot lenh bang OR:
// thoa bat ky chinh sach nao la duoc phep. Gop bang AND se that chat hon ban
// goc va lam hong tinh nang - sai ve phia khoa chat thi de thay, nhung van la sai.
const merged = {};
for (const p of policies) {
  if (!snap.tables[p.table] || !manual.has(p.table)) continue;
  const cond = [...new Set([p.using, p.check].filter(Boolean))].join(" AND ");
  if (!cond) continue;
  const cmds = p.cmd === "all" ? ["select", "insert", "update", "delete"] : [p.cmd];
  for (const cmd of cmds) {
    ((merged[p.table] ??= {})[cmd] ??= []).push(translate(cond));
  }
}

const out = {};
for (const [table, byCmd] of Object.entries(merged)) {
  out[table] = {};
  for (const [cmd, list] of Object.entries(byCmd)) {
    const uniq = [...new Set(list)];
    out[table][cmd] = uniq.length === 1 ? uniq[0] : uniq.map((c) => `(${c})`).join(" OR ");
  }
}

// --- Chay thu tung vi tu tren D1 local ---
const dir = join(process.cwd(), ".wrangler/state/v3/d1/miniflare-D1DatabaseObject");
const file = readdirSync(dir).find((f) => f.endsWith(".sqlite") && f !== "metadata.sqlite");
const db = file ? new DatabaseSync(join(dir, file), { readOnly: true }) : null;

let ok = 0;
const broken = [];
if (db) {
  for (const [table, byCmd] of Object.entries(out)) {
    for (const [cmd, pred] of Object.entries(byCmd)) {
      // Chi kiem CU PHAP, nen boc trong SELECT ... WHERE va lay 0 hang.
      const n = (pred.match(/\?/g) ?? []).length;
      const sql = `SELECT 1 FROM "${table}" WHERE ${pred} LIMIT 0`;
      try {
        db.prepare(sql).all(...Array(n).fill("x"));
        ok++;
      } catch (err) {
        broken.push({ table, cmd, error: String(err.message).slice(0, 110), pred: pred.slice(0, 110) });
      }
    }
  }
}

writeFileSync("scripts/d1/manual-predicates.json", JSON.stringify(out, null, 1) + "\n");

const total = Object.values(out).reduce((n, c) => n + Object.keys(c).length, 0);
console.log(`bang manual co vi tu dich duoc: ${Object.keys(out).length}/${manual.size}`);
console.log(`vi tu (bang x lenh): ${total}`);
console.log(`chay duoc tren SQLite: ${ok}`);
console.log(`hong: ${broken.length}`);
for (const b of broken) console.log(`  ${b.table}.${b.cmd}\n     ${b.error}\n     ${b.pred}`);

const noPred = [...manual].filter((t) => !out[t]);
if (noPred.length) console.log(`\nbang manual KHONG co vi tu nao (khong co chinh sach): ${noPred.join(", ")}`);
