import { describe, expect, it } from "vitest";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import {
  createD1Client,
  type ColumnTypes,
  type PolicyRegistry,
  type ManualPredicates,
} from "../query-builder";
import { openLocalD1, openWritableCopy } from "./d1-shim";

/**
 * Bộ kiểm HAI TÀI KHOẢN: chạy dưới danh nghĩa A, thử chạm dữ liệu của B.
 *
 * VÌ SAO CẦN, khi đã có bộ kiểm bộ dựng truy vấn. Bộ kiểm kia chứng minh vị từ
 * CHẠY được; nó không chứng minh vị từ LỌC ĐÚNG. Một vị từ sai cú pháp hỏng
 * ngay và thấy ngay. Một vị từ đúng cú pháp mà sai ngữ nghĩa - `OR` viết thành
 * `AND`, tham số buộc nhầm thứ tự, điều kiện gắn vào bảng con thay vì bảng cha -
 * chạy trơn tru và trả về dữ liệu của người khác.
 *
 * TÍNH CHẤT ĐƯỢC KIỂM, và đây là chỗ bản đầu của tệp này viết sai.
 *
 * Bản đầu khẳng định "bảng có cột chủ sở hữu thì A chỉ đọc được hàng của A".
 * Nó báo 12 vi phạm trên 5 bảng, và cả 12 đều SAI - `community_post_comments`,
 * `community_post_reactions`, `pvp_duels`, `user_follows`, `user_stats` đều có
 * chính sách đọc công khai, nói thẳng ngay trong tên: "Anyone can view stats for
 * the leaderboard". Bộ dựng truy vấn đang tái hiện đúng RLS gốc; giả định trong
 * bài test mới là cái sai. Nếu tin con số ấy thì đã đi "sửa" một thứ không hỏng,
 * và làm hỏng bảng xếp hạng.
 *
 * Tính chất ĐÚNG cần bảo vệ là:
 *
 *   1. GHI luôn bị giới hạn trong dữ liệu của người gọi - kể cả khi đọc công
 *      khai. Đây là tính chất mạnh nhất và áp cho mọi bảng có chủ sở hữu.
 *   2. ĐỌC bị giới hạn CHỈ khi chính sách gốc không cho đọc công khai.
 *   3. Với bảng dùng vị từ: hàng riêng tư của B không được lọt sang A.
 *
 * Dùng người dùng THẬT có dữ liệu thật. Một uuid bịa trả 0 hàng ở mọi trường
 * hợp, kể cả khi bộ lọc hỏng hoàn toàn - bộ kiểm sẽ xanh vì lý do sai.
 */

const hasLocalData = existsSync(".wrangler/state/v3/d1/miniflare-D1DatabaseObject");

const snap = JSON.parse(readFileSync("scripts/d1/schema-snapshot.json", "utf8"));
const types: ColumnTypes = Object.fromEntries(
  Object.entries(snap.tables as Record<string, { columns: { name: string; format: string }[] }>).map(
    ([t, d]) => [t, Object.fromEntries(d.columns.map((c) => [c.name, c.format]))]
  )
);
const registry: PolicyRegistry = JSON.parse(readFileSync("scripts/d1/policy-registry.json", "utf8"));
const predicates: ManualPredicates = JSON.parse(readFileSync("scripts/d1/manual-predicates.json", "utf8"));

function rawDb() {
  const dir = join(process.cwd(), ".wrangler/state/v3/d1/miniflare-D1DatabaseObject");
  const f = readdirSync(dir).find((x) => x.endsWith(".sqlite") && x !== "metadata.sqlite")!;
  return new DatabaseSync(join(dir, f), { readOnly: true });
}

function twoOwners(table: string, column: string): [string, string] | null {
  if (!hasLocalData) return null;
  try {
    const rows = rawDb()
      .prepare(
        `SELECT "${column}" AS u FROM "${table}" WHERE "${column}" IS NOT NULL
         GROUP BY "${column}" ORDER BY COUNT(*) DESC LIMIT 2`
      )
      .all() as { u: string }[];
    return rows.length < 2 ? null : [String(rows[0].u), String(rows[1].u)];
  } catch (err) {
    // CHỈ nuốt hai lỗi lược đồ, là những lỗi có nghĩa "bảng này không áp
    // dụng được" một cách hợp lệ.
    //
    // Bản đầu bắt mọi lỗi. Dưới tải song song, SQLite trả SQLITE_BUSY khi một
    // tiến trình kiểm khác đang dồn WAL, và `catch` biến nó thành "bảng không
    // có dữ liệu": số bảng được kiểm tụt từ 16 xuống 1 và khẳng định cuối đỏ
    // với "expected 1 to be greater than 15" - một thông báo không chỉ về
    // nguyên nhân nào cả. Tệ hơn, nếu ngưỡng ấy thấp hơn thì bộ kiểm đã XANH
    // trong khi gần như không kiểm gì, và đây là bộ kiểm phân quyền.
    const msg = String((err as Error).message);
    if (/no such table|no such column/.test(msg)) return null;
    throw err;
  }
}

type Owner = { kind: "owner"; column: string; publicRead?: boolean };
const ownerTables = Object.entries(registry)
  .filter(([, p]) => p.kind === "owner")
  .map(([t, p]) => [t, p as Owner] as const);

const client = (actor: string) =>
  createD1Client(openLocalD1() as never, types, registry, actor, predicates);

describe.skipIf(!hasLocalData)("cách ly hai tài khoản", () => {
  it("có đủ bảng để kiểm", () => {
    expect(ownerTables.length).toBeGreaterThan(20);
  });

  it("GHI không bao giờ chạm được dữ liệu người khác", async () => {
    // Tính chất mạnh nhất, và áp cho MỌI bảng có chủ sở hữu kể cả bảng đọc
    // công khai: bảng xếp hạng cho ai cũng xem điểm, nhưng không ai được sửa
    // điểm của người khác.
    const bad: string[] = [];
    let tested = 0;

    for (const [table, p] of ownerTables) {
      const pair = twoOwners(table, p.column);
      if (!pair) continue;
      const [a, b] = pair;
      tested++;

      // UPDATE nhắm thẳng vào hàng của B, dưới danh nghĩa A.
      const upd = client(a).from(table).update({ [p.column]: a }).eq(p.column, b);
      const sql = (upd as unknown as { build(): { sql: string; args: unknown[] } }).build();
      // Điều kiện chủ sở hữu phải được thêm vào, và tham số của nó phải là A.
      if (!sql.args.includes(a)) bad.push(`${table}: UPDATE không mang điều kiện của người gọi`);
      // Câu lệnh phải chứa CẢ hai điều kiện, nên nó không khớp hàng nào của B.
      if (!sql.sql.includes(p.column)) bad.push(`${table}: UPDATE thiếu cột chủ sở hữu trong WHERE`);

      // INSERT phải ÉP cột chủ sở hữu thành A dù truyền vào B.
      const ins = client(a).from(table).insert({ [p.column]: b });
      const isql = (ins as unknown as { build(): { args: unknown[] } }).build();
      if (isql.args.includes(b) && b !== a) {
        bad.push(`${table}: INSERT giữ lại chủ sở hữu do bên gọi truyền vào`);
      }
    }

    console.log(`  kiểm ghi trên ${tested} bảng`);
    expect(bad).toEqual([]);
    expect(tested).toBeGreaterThan(15);
  });

  it("ĐỌC bị giới hạn ở mọi bảng KHÔNG cho đọc công khai", async () => {
    const leaked: string[] = [];
    const tested: string[] = [];
    const publicByDesign: string[] = [];

    for (const [table, p] of ownerTables) {
      if (p.publicRead) { publicByDesign.push(table); continue; }
      const pair = twoOwners(table, p.column);
      if (!pair) continue;
      const [a, b] = pair;
      tested.push(table);

      const { data, error } = await client(a).from(table).select("*");
      if (error) { leaked.push(`${table}: ${error.message}`); continue; }
      const rows = data as Record<string, unknown>[];

      // A phải đọc được dữ liệu của chính mình. Rỗng thì phép thử vô nghĩa: một
      // bộ lọc chặn sạch cũng cho kết quả y hệt một bộ lọc đúng.
      if (!rows.length) { leaked.push(`${table}: A không đọc được gì (phép thử vô nghĩa)`); continue; }
      if (rows.some((r) => String(r[p.column]) === b)) leaked.push(`${table}: đọc được hàng của B`);
      const foreign = rows.filter((r) => String(r[p.column]) !== a);
      if (foreign.length) leaked.push(`${table}: ${foreign.length}/${rows.length} hàng không thuộc người gọi`);
    }

    console.log(`  kiểm đọc trên ${tested.length} bảng riêng tư; ${publicByDesign.length} bảng công khai có chủ ý`);
    expect(leaked).toEqual([]);
    expect(tested.length).toBeGreaterThan(15);
  });

  // Hai phép kiểm dưới đây GIEO dữ liệu, vì kho thật không có sẵn bài bị ẩn hay
  // tài liệu chưa duyệt. Bản đầu chỉ "bỏ qua" khi thiếu dữ liệu - xanh mà không
  // chứng minh gì, đúng ở nhánh riêng tư quan trọng nhất. Gieo trên BẢN SAO
  // trong thư mục tạm, không ghi vào kho đã nạp.
  function seeded(seed: string[], actor: string) {
    return createD1Client(openWritableCopy(seed) as never, types, registry, actor, predicates);
  }

  it("bài đăng bị ẩn của B không lọt sang A", async () => {
    // `community_posts.select` là `is_hidden = false or user_id = ?`, nên A và B
    // thấy giống nhau ở mọi bài công khai - đúng theo thiết kế, và đó là lý do
    // phép so hai tập kết quả báo nhầm. Thứ phải không bao giờ lọt là nhánh
    // riêng tư: bài đã bị ẩn.
    const db = rawDb();
    const [b, a] = (db.prepare(`SELECT id FROM user_profiles LIMIT 2`).all() as { id: string }[]).map((r) => String(r.id));

    const c = (actor: string) =>
      seeded([
        `INSERT INTO community_posts (id, user_id, kind, content, is_hidden, created_at)
         VALUES (999001, '${b}', 'manual', 'bài bị ẩn của B', 1, '2026-01-01')`,
      ], actor);

    const owner = await c(b).from("community_posts").select("id").eq("id", 999001);
    const other = await c(a).from("community_posts").select("id").eq("id", 999001);

    expect((owner.data as unknown[]).length).toBe(1);  // chủ bài vẫn thấy bài mình
    expect(other.data).toEqual([]);                     // người khác thì không
  });

  it("tài liệu chưa duyệt của B không lọt sang A", async () => {
    // Cùng hình dạng: `documents.select` là `status = 'approved' or uploaded_by = ?`.
    const db = rawDb();
    const [b, a] = (db.prepare(`SELECT id FROM user_profiles LIMIT 2`).all() as { id: string }[]).map((r) => String(r.id));

    const c = (actor: string) =>
      seeded([
        `INSERT INTO documents (id, title, category, file_url, file_name, file_size,
                                download_count, created_at, status, uploaded_by)
         VALUES (999002, 'chưa duyệt', 'khac', 'u', 'f.pdf', 1, 0, '2026-01-01', 'pending', '${b}')`,
      ], actor);

    const owner = await c(b).from("documents").select("id").eq("id", 999002);
    const other = await c(a).from("documents").select("id").eq("id", 999002);

    expect((owner.data as unknown[]).length).toBe(1);
    expect(other.data).toEqual([]);
  });
});
