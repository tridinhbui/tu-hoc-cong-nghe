#!/usr/bin/env node
/**
 * Đối chiếu supabase/migrations/ với database thật.
 *
 * Repo này không dùng Supabase CLI và không có bảng theo dõi migration nào
 * (`supabase_migrations.schema_migrations` chỉ có khi apply bằng CLI, còn ở
 * đây migration được chạy tay qua SQL Editor). Không có gì ghi lại file nào
 * đã chạy, nên cách duy nhất để biết là hỏi chính database xem các đối tượng
 * mà migration khai báo có tồn tại không.
 *
 *   node scripts/check-migrations.mjs        # dò bảng + cột qua PostgREST
 *   node scripts/check-migrations.mjs --sql  # ghi lại supabase/checks/verify_migrations.sql
 *
 * Chỉ đọc: mọi truy vấn đều là `select ...&limit=0`. Cố ý KHÔNG gọi RPC để
 * kiểm tra function - nhiều function trong repo này có ghi dữ liệu
 * (admin_resync_all_user_stats, purchase_shop_item, apply_world_boss_damage),
 * nên "kiểm tra" bằng cách gọi chúng sẽ làm hỏng đúng thứ đang đi kiểm tra.
 * Function/policy/index/trigger vì thế thuộc phần --sql, chạy trong SQL
 * Editor nơi đọc được pg_proc/pg_policies/pg_indexes.
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const MIGRATIONS_DIR = "supabase/migrations";
const SQL_OUT = "supabase/checks/verify_migrations.sql";

function loadEnv() {
  let raw;
  try {
    raw = readFileSync(".env.local", "utf8");
  } catch {
    console.error("Không đọc được .env.local - cần NEXT_PUBLIC_SUPABASE_URL và SUPABASE_SERVICE_ROLE_KEY.");
    process.exit(1);
  }
  const env = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const i = trimmed.indexOf("=");
    env[trimmed.slice(0, i).trim()] = trimmed.slice(i + 1).trim();
  }
  return env;
}

/**
 * Rút các đối tượng mà một file migration khai báo.
 *
 * Tên bảng có thể có nháy kép: `alter table public."Module"` là bảng Module
 * viết hoa, import từ ngoài repo. Bắt buộc phải khớp cả dạng đó, nếu không
 * `(?:public\.)?([a-z0-9_]+)` sẽ khớp trúng chữ `public` và báo nhầm một
 * "bảng public" không tồn tại.
 */
const IDENT = `(?:"([A-Za-z0-9_]+)"|([a-z0-9_]+))`;

function pick(m, a, b) {
  return (m[a] ?? m[b] ?? "").trim();
}

export function parseMigration(sql) {
  const s = sql.replace(/--[^\n]*/g, "");
  const tables = new Set();
  const columns = new Map();
  const functions = new Set();
  const droppedFunctions = new Set();
  const indexes = new Set();
  const policies = new Set();
  const triggers = new Set();
  const realtime = new Set();

  for (const m of s.matchAll(new RegExp(`create\\s+table\\s+(?:if\\s+not\\s+exists\\s+)?(?:public\\.)?${IDENT}`, "gi"))) {
    tables.add(pick(m, 1, 2));
  }
  for (const m of s.matchAll(/create\s+(?:or\s+replace\s+)?function\s+(?:public\.)?([a-z0-9_]+)/gi)) {
    functions.add(m[1].toLowerCase());
  }
  // Function bị XOÁ hẳn. Danh sách `expected_functions` từng là hợp của mọi
  // `create function` từ trước tới nay, không có phép trừ - nên một migration
  // chỉ xoá mà không tạo lại sẽ để cái tên đó nằm trong danh sách vĩnh viễn, và
  // verify_migrations.sql báo "thiếu function" trên một database ĐÃ chạy đúng
  // mọi migration. Đúng kiểu cổng kêu nhầm mà AGENTS.md nói tới.
  //
  // Chưa lộ ra lần nào vì mọi `drop function` trong repo tới giờ đều là
  // xoá-rồi-tạo-lại để đổi chữ ký (20260902_quiz_mistake_question_hash.sql đổi
  // record_quiz_mistake từ 3 lên 4 tham số). Dạng đó phải tính là CÒN, nên phép
  // trừ ở emitSql chỉ áp cho tên không được tạo lại trong cùng file.
  for (const m of s.matchAll(/drop\s+function\s+(?:if\s+exists\s+)?(?:public\.)?([a-z0-9_]+)/gi)) {
    droppedFunctions.add(m[1].toLowerCase());
  }
  for (const m of s.matchAll(/create\s+(?:unique\s+)?index\s+(?:concurrently\s+)?(?:if\s+not\s+exists\s+)?([a-z0-9_]+)/gi)) {
    indexes.add(m[1].toLowerCase());
  }
  for (const m of s.matchAll(new RegExp(`create\\s+policy\\s+"([^"]+)"\\s+on\\s+(?:public\\.)?${IDENT}`, "gi"))) {
    policies.add(`${pick(m, 2, 3)}|${m[1]}`);
  }
  for (const m of s.matchAll(/create\s+(?:or\s+replace\s+)?trigger\s+([a-z0-9_]+)/gi)) {
    triggers.add(m[1].toLowerCase());
  }
  for (const m of s.matchAll(new RegExp(`alter\\s+table\\s+(?:only\\s+)?(?:if\\s+exists\\s+)?(?:public\\.)?${IDENT}([\\s\\S]*?);`, "gi"))) {
    const table = pick(m, 1, 2);
    for (const c of m[3].matchAll(new RegExp(`add\\s+column\\s+(?:if\\s+not\\s+exists\\s+)?${IDENT}`, "gi"))) {
      if (!columns.has(table)) columns.set(table, new Set());
      columns.get(table).add(pick(c, 1, 2));
    }
  }

  // Bảng nằm trong publication `supabase_realtime`.
  //
  // Đây là loại đối tượng THỨ NĂM, và nó bị bỏ sót suốt vì nó không phải một
  // đối tượng có tên trong catalog như bốn loại kia - nó là một dòng trong
  // pg_publication_tables. Hậu quả thì im lặng đúng kiểu tệ nhất: subscribe
  // vẫn báo SUBSCRIBED, không lỗi nào ở client, chỉ là sự kiện không bao giờ
  // bắn. Chú thích đầu 20260824_realtime_publication.sql kể lại đúng lần đó
  // với chuông thông báo - và cái file kể lại nó cũng chính là file mà cả hai
  // đường kiểm ở đây đều không với tới.
  //
  // Hai dạng khai báo, vì repo dùng cả hai: `alter publication ... add table`
  // và mảng `realtime_tables text[] := array[...]` trong khối do $$ của
  // 20260824. Dạng thứ hai đọc từ chuỗi gốc chứ không từ `s` - `s` đã xoá
  // comment, mà mỗi phần tử trong mảng đó có một comment đi kèm.
  for (const m of s.matchAll(
    // `(?!\\s*\\.)` là phần bắt buộc. Câu duy nhất trong repo dùng dạng này là
    // `format('alter publication supabase_realtime add table public.%I', t)`,
    // và không có lookahead thì `(?:public\\.)?` lùi về rỗng để IDENT khớp
    // chính chữ "public" - sinh ra một bảng tên "public" không tồn tại, tức là
    // bộ kiểm tự tạo ra một phát hiện giả ngay lần chạy đầu.
    new RegExp(`alter\\s+publication\\s+supabase_realtime\\s+add\\s+table\\s+(?:public\\.)?${IDENT}(?![a-z0-9_.])`, "gi")
  )) {
    realtime.add(pick(m, 1, 2));
  }
  const arrayBlock = /realtime_tables\s+text\[\]\s*:=\s*array\s*\[([\s\S]*?)\]/i.exec(sql);
  if (arrayBlock) {
    for (const m of arrayBlock[1].matchAll(/'([a-z0-9_]+)'/gi)) realtime.add(m[1].toLowerCase());
  }

  return { tables, columns, functions, droppedFunctions, indexes, policies, triggers, realtime };
}

function readManifest() {
  return readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort()
    .map((file) => ({ file, ...parseMigration(readFileSync(`${MIGRATIONS_DIR}/${file}`, "utf8")) }));
}

async function probeAll(manifest, env) {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY trong .env.local.");
    process.exit(1);
  }

  const cache = new Map();
  async function probe(table, column) {
    const cacheKey = `${table}.${column ?? "*"}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);
    const res = await fetch(`${url}/rest/v1/${encodeURIComponent(table)}?select=${encodeURIComponent(column ?? "*")}&limit=0`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    let out;
    if (res.ok) out = { ok: true };
    else {
      const body = await res.json().catch(() => ({}));
      out = { ok: false, code: body.code ?? String(res.status) };
    }
    cache.set(cacheKey, out);
    return out;
  }

  const rows = [];
  for (const m of manifest) {
    const missing = [];
    for (const t of m.tables) {
      const r = await probe(t, null);
      if (!r.ok) missing.push(`bảng ${t} (${r.code})`);
    }
    for (const [t, cols] of m.columns) {
      const tr = await probe(t, null);
      if (!tr.ok) {
        missing.push(`bảng ${t} (${tr.code})`);
        continue;
      }
      for (const c of cols) {
        const r = await probe(t, c);
        if (!r.ok) missing.push(`${t}.${c} (${r.code})`);
      }
    }
    const checkable = m.tables.size > 0 || m.columns.size > 0;
    rows.push({ file: m.file, missing, checkable });
  }
  return rows;
}

function quote(s) {
  return `'${s.replace(/'/g, "''")}'`;
}

function emitSql(manifest) {
  const functions = new Set();
  const indexes = new Set();
  const policies = new Set();
  const triggers = new Set();
  const realtime = new Set();
  // `manifest` đã sắp theo tên file, tức là theo thứ tự chạy, nên cộng-rồi-trừ
  // theo từng file cho ra trạng thái cuối. Phép trừ bỏ qua tên nào được tạo lại
  // ngay trong cùng file đó (dạng xoá-rồi-tạo-lại để đổi chữ ký).
  for (const m of manifest) {
    for (const v of m.functions) functions.add(v);
    for (const v of m.droppedFunctions ?? []) {
      if (!m.functions.has(v)) functions.delete(v);
    }
    for (const v of m.indexes) indexes.add(v);
    for (const v of m.policies) policies.add(v);
    for (const v of m.triggers) triggers.add(v);
    for (const v of m.realtime ?? []) realtime.add(v);
  }

  const values = (items) => (items.length ? items.map((i) => `    (${i})`).join(",\n") : "    (null)");

  const sql = `-- SINH TỰ ĐỘNG bởi scripts/check-migrations.mjs --sql. Đừng sửa tay:
-- chạy lại lệnh đó sau khi thêm migration mới.
--
-- Dán toàn bộ file này vào Supabase SQL Editor. Nó liệt kê những function,
-- index, policy, trigger và bảng realtime mà supabase/migrations/ có khai báo nhưng
-- database không có - tức là phần migration chưa chạy mà
-- scripts/check-migrations.mjs không tự dò được (PostgREST chỉ thấy bảng và
-- cột; kiểm tra function bằng cách gọi thì nguy hiểm vì nhiều hàm có ghi).
--
-- Không trả về dòng nào = mọi thứ đã có mặt.

with expected_functions(name) as (values
${values([...functions].sort().map(quote))}
), expected_indexes(name) as (values
${values([...indexes].sort().map(quote))}
), expected_policies(tablename, policyname) as (values
${values([...policies].sort().map((p) => {
  const i = p.indexOf("|");
  return `${quote(p.slice(0, i))}, ${quote(p.slice(i + 1))}`;
}))}
), expected_triggers(name) as (values
${values([...triggers].sort().map(quote))}
), expected_realtime(name) as (values
${values([...realtime].sort().map(quote))}
)
select 'function' as loai, name as ten, null as tren_bang
  from expected_functions
 where name is not null
   and not exists (
     select 1 from pg_proc p
       join pg_namespace n on n.oid = p.pronamespace
      where n.nspname = 'public' and p.proname = expected_functions.name)
union all
select 'index', name, null
  from expected_indexes
 where name is not null
   and not exists (
     select 1 from pg_indexes i
      where i.schemaname = 'public' and i.indexname = expected_indexes.name)
union all
select 'policy', policyname, tablename
  from expected_policies
 where policyname is not null
   and not exists (
     select 1 from pg_policies p
      where p.schemaname = 'public'
        and p.tablename = expected_policies.tablename
        and p.policyname = expected_policies.policyname)
union all
select 'trigger', name, null
  from expected_triggers
 where name is not null
   and not exists (
     select 1 from pg_trigger t
       join pg_class c on c.oid = t.tgrelid
       join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and not t.tgisinternal and t.tgname = expected_triggers.name)
union all
-- Bảng có tồn tại nhưng KHÔNG nằm trong publication. Lọc theo pg_class trước
-- để một bảng thuộc migration chưa chạy không bị báo hai lần - phần thiếu bảng
-- đã do lượt dò PostgREST nói rồi.
select 'realtime', name, null
  from expected_realtime
 where name is not null
   and exists (
     select 1 from pg_class c
       join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relname = expected_realtime.name and c.relkind = 'r')
   and not exists (
     select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = expected_realtime.name)
order by loai, ten;
`;

  writeFileSync(SQL_OUT, sql);
  console.log(
    `Đã ghi ${SQL_OUT} - ${functions.size} function, ${indexes.size} index, ${policies.size} policy, ` +
      `${triggers.size} trigger, ${realtime.size} bảng realtime.`
  );
  console.log("Dán file đó vào Supabase SQL Editor để kiểm tra phần này.");
}

const manifest = readManifest();

if (process.argv.includes("--sql")) {
  emitSql(manifest);
} else {
  const rows = await probeAll(manifest, loadEnv());
  const missing = rows.filter((r) => r.missing.length);
  const ok = rows.filter((r) => r.checkable && !r.missing.length);
  const unknown = rows.filter((r) => !r.checkable);

  if (missing.length === 0) {
    console.log("Mọi bảng/cột mà migration khai báo đều có trên database.");
  } else {
    console.log(`CHƯA CHẠY (${missing.length} file):\n`);
    for (const r of missing) console.log(`  ${r.file}\n     → ${r.missing.join("\n     → ")}`);
  }

  // `--list` in ra TÊN FILE chứ không chỉ con số. Không có bảng theo dõi
  // migration nào trong repo này (xem chú thích đầu file), nên khi cần trả lời
  // "tôi đã chạy những file nào" thì đây là câu trả lời gần nhất có được - và
  // nó là SUY RA từ việc bảng/cột có tồn tại, không phải một bản ghi lịch sử.
  // Hai chỗ nó không kết luận được, cố ý tách riêng thay vì gộp vào "đã chạy":
  // file chỉ chứa function/policy/index/grant (phải dùng --sql), và file mà
  // bảng của nó có thể do một migration khác tạo ra trước đó.
  if (process.argv.includes("--list")) {
    console.log(`\nĐÃ CHẠY - suy ra từ bảng/cột có thật (${ok.length} file):\n`);
    for (const r of ok) console.log(`  ${r.file}`);
    console.log(`\nKHÔNG KẾT LUẬN ĐƯỢC BẰNG CÁCH DÒ BẢNG (${unknown.length} file):\n`);
    for (const r of unknown) console.log(`  ${r.file}`);
    console.log("");
  }

  console.log(
    `\n${ok.length} file đã có đủ bảng/cột · ${missing.length} file thiếu · ` +
      `${unknown.length} file chỉ chứa function/policy/index/grant`
  );
  console.log(`Kiểm tra ${unknown.length} file còn lại bằng: node scripts/check-migrations.mjs --sql`);
  if (!process.argv.includes("--list")) {
    console.log("Xem tên từng file bằng: node scripts/check-migrations.mjs --list");
  }
  process.exitCode = missing.length > 0 ? 1 : 0;
}
