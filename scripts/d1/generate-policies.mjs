#!/usr/bin/env node
// Dich 192 chinh sach RLS thanh mot bang tra cuu ma D1 client doc duoc.
//
// D1 KHONG CO RLS. Postgres loc theo auth.uid() ngay trong co so du lieu, nen
// mot truy van quen dieu kien chu so huu van tra dung du lieu cua nguoi goi.
// Tren D1 thi cung truy van ay tra du lieu cua MOI NGUOI, va khong co gi bao.
// Day la rui ro lon nhat cua ca cuoc chuyen doi.
//
// Cach chong lai khong phai la nho gan dieu kien o 527 cho goi - nho thi se
// quen. Bang nay bien no thanh thu D1 client TU AP, va bang nay thi sinh ra tu
// chinh cac chinh sach dang chay chu khong go tay.
//
// Ba nhom, va nhom thu ba moi la nhom quan trong:
//
//   owner  - loc duoc bang mot cot. Client tu them WHERE <cot> = <nguoi goi>.
//   public - ai cung doc duoc. Khong them gi.
//   manual - dieu kien co truy van con (EXISTS): quyen thua ke tu bang khac,
//            hoac kiem vai tro admin. KHONG the ap may moc, nen client TU CHOI
//            truy van cho toi khi cho goi khai ro rang la da tu xu ly.
//
// Nhom manual mac dinh la TU CHOI chu khong phai cho qua. Mot bang bi bo sot
// se lam hong tinh nang, va hong thi thay ngay; cho qua thi lo du lieu, va lo
// thi khong ai thay.
import { readFileSync, writeFileSync } from "node:fs";

const policies = JSON.parse(readFileSync("scripts/d1/rls-policies.json", "utf8"));
const snap = JSON.parse(readFileSync("scripts/d1/schema-snapshot.json", "utf8"));

// Chinh sach cua luoc do `storage` va mot muc bi phan tich hong: chung khong
// ung voi bang nao trong 88 bang, nen bo ra va DEM, khong bo im lang.
const known = policies.filter((p) => snap.tables[p.table]);
const skipped = policies.filter((p) => !snap.tables[p.table]);

const cond = (p) => [p.using, p.check].filter(Boolean).join(" AND ").replace(/\s+/g, " ").trim();

// `auth.uid() = user_id`, `user_id = auth.uid()`, va ca hai lap lai o using/check.
const OWNER = /^\(?\s*(?:auth\.uid\(\)\s*=\s*(\w+)|(\w+)\s*=\s*auth\.uid\(\))\s*\)?$/i;

function ownerColumn(c) {
  // Bo phan lap: `X AND X` la cung mot dieu kien viet o ca using lan with check.
  const parts = [...new Set(c.split(/\s+AND\s+/i).map((s) => s.trim()))];
  if (parts.length !== 1) return null;
  const m = parts[0].match(OWNER);
  if (!m) return null;
  return m[1] ?? m[2];
}

const byTable = {};
for (const p of known) (byTable[p.table] ??= []).push(p);

const registry = {};
const stats = { owner: 0, public: 0, manual: 0 };
const manualWhy = {};

for (const [table, list] of Object.entries(byTable)) {
  const owners = new Set();
  let anyPublic = false;
  let manual = null;

  for (const p of list) {
    const c = cond(p);
    if (/^true$/i.test(c)) { anyPublic = true; continue; }
    const col = ownerColumn(c);
    if (col) { owners.add(col); continue; }
    manual = /exists\s*\(/i.test(c) ? "EXISTS (quyen thua ke hoac kiem vai tro)" : "dieu kien khong quy ve mot cot";
  }

  if (manual) {
    registry[table] = { kind: "manual", reason: manual };
    manualWhy[table] = manual;
    stats.manual++;
  } else if (owners.size === 1) {
    // Chinh sach doc CONG KHAI di kem chinh sach ghi theo chu so huu la hinh
    // dang rat pho bien (ai cung xem duoc bai dang, chi tac gia sua duoc). Cot
    // chu so huu VAN phai ghi lai de con ap cho lenh ghi.
    registry[table] = { kind: "owner", column: [...owners][0], publicRead: anyPublic };
    stats.owner++;
  } else if (owners.size === 0 && anyPublic) {
    registry[table] = { kind: "public" };
    stats.public++;
  } else {
    registry[table] = { kind: "manual", reason: `nhieu cot chu so huu: ${[...owners].join(", ")}` };
    manualWhy[table] = registry[table].reason;
    stats.manual++;
  }
}

// Bang KHONG co chinh sach nao. Day khong phai "khong sao" - phai phan loai tay,
// va mac dinh an toan la tu choi.
const uncovered = Object.keys(snap.tables).filter((t) => !registry[t]);
for (const t of uncovered) registry[t] = { kind: "manual", reason: "khong co chinh sach RLS nao trong migration" };

writeFileSync("scripts/d1/policy-registry.json", JSON.stringify(registry, null, 1) + "\n");

console.log(`chinh sach doc duoc: ${known.length}  (bo qua ${skipped.length}: ${[...new Set(skipped.map((p) => p.table))].join(", ")})`);
console.log(`bang trong bang tra cuu: ${Object.keys(registry).length}`);
console.log();
console.log(`  owner  (client tu loc): ${stats.owner}`);
console.log(`  public (ai cung doc)  : ${stats.public}`);
console.log(`  manual (client tu choi): ${stats.manual + uncovered.length}`);
console.log();
console.log("bang phai xu ly tay:");
for (const [t, why] of Object.entries(manualWhy)) console.log(`  ${t.padEnd(28)} ${why}`);
for (const t of uncovered) console.log(`  ${t.padEnd(28)} khong co chinh sach RLS nao`);
