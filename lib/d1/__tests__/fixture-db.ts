import { DatabaseSync } from "node:sqlite";
import { mkdtempSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

/**
 * Cơ sở dữ liệu cho bộ kiểm D1, dựng từ ĐẦU mỗi lần chạy: toàn bộ
 * `migrations-d1/*.sql` rồi dữ liệu GIẢ.
 *
 * Trước đây các bộ kiểm đọc một bản sao của D1 local trên máy dev - tức là dữ
 * liệu người dùng thật chép từ Supabase cũ. Hai hậu quả: xoá dữ liệu cũ ở máy
 * dev là làm đỏ bộ kiểm, và CI (không có D1 local) bỏ qua toàn bộ các phép thử
 * này mà vẫn xanh. Dựng từ migration + dữ liệu giả sửa cả hai: bộ kiểm chạy ở
 * mọi nơi, và không phụ thuộc dữ liệu của ai.
 *
 * Dữ liệu giả sinh theo lược đồ: ba người học giả, mọi bảng có cột trỏ tới
 * người dùng nhận 12 hàng cho mỗi người, mọi cột được điền theo tên và kiểu.
 * Vài giá trị được chọn có chủ ý vì một phép thử gọi tên chúng - xem các nhánh
 * đặc biệt trong `valueFor` và ghi chú ở `generate`. Bảng nào bỗng trống thì
 * đọc FIXTURE_ERRORS: một hàng bị CHECK hoặc khoá ngoại từ chối được ghi ở đó.
 */

export const FIXTURE_USERS = [
  "11111111-1111-4111-8111-111111111111",
  "22222222-2222-4222-8222-222222222222",
  "33333333-3333-4333-8333-333333333333",
] as const;

const USER_COLUMNS = new Set([
  "user_id", "author_id", "follower_id", "followed_id", "sender_id", "recipient_id", "actor_id",
  "referrer_id", "referred_id", "leader_id", "user_a", "user_b", "requested_by", "created_by",
  "uploaded_by", "reviewed_by", "resolved_by", "updated_by", "claimed_by", "challenger_id",
  "opponent_id", "winner_id",
]);

type Col = { name: string; type: string; notnull: number; dflt_value: unknown; pk: number };
type Fk = { table: string; from: string; to: string };

function valueFor(col: Col, table: string, user: string, i: number, fkValue: unknown): unknown {
  if (fkValue !== undefined) return fkValue;
  if (USER_COLUMNS.has(col.name)) return user;
  const n = col.name;
  const t = col.type.toUpperCase();
  // Ngày trải đều 20 ngày gần đây, để các truy vấn "7 ngày / 14 ngày qua" có hàng.
  // Mốc "đã rời / đã xoá" để trống: một thành viên có left_at là người đã đi.
  if (!col.notnull && /^(left|deleted|archived|revoked|banned|removed|ended|edited|resolved|read)_at$/.test(n)) return null;
  if (n === "price") return 500 + i * 100;
  if (n.endsWith("_at") || n === "date" || n.endsWith("_date") || n.endsWith("_day")) {
    const d = new Date(Date.now() - (i * 3 + FIXTURE_USERS.indexOf(user as never)) * 86_400_000);
    return n.endsWith("_date") || n === "date" || n.endsWith("_day") ? d.toISOString().slice(0, 10) : d.toISOString();
  }
  if (n === "email") return `${user.slice(0, 8)}-${table}-${i}@test.invalid`;
  if (n === "emoji") return ["👍", "🔥", "💡"][i % 3];
  if (n === "status") return "accepted";
  if (n === "role") return "member";
  if (n === "kind") return "manual";
  if (n === "is_hidden" || n === "hidden" || n === "is_disabled" || n === "is_deleted") return 0;
  if (n === "active" || n === "is_active" || n === "approved" || n === "is_public" || n === "is_published") return 1;
  if (n === "completed") return 1;
  // Hai cột có CHECK trong migration (0006_*): giá trị phải nằm trong miền cho phép.
  if (n === "completion_source") return "lesson";
  if (n === "multiplier") return 1.5;
  if (t.includes("INT")) return (i + 1) * (FIXTURE_USERS.indexOf(user as never) + 2);
  if (t.includes("REAL") || t.includes("NUM") || t.includes("FLOA") || t.includes("DOUB")) return 70 + i * 5;
  if (n.endsWith("_id") || n === "id") return `${table}-${user.slice(0, 4)}-${i}`;
  return `${n} ${i + 1}`;
}

function generate(db: DatabaseSync) {
  const tables = (
    db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '\\_%' ESCAPE '\\'").all() as { name: string }[]
  ).map((r) => r.name);

  // Hồ sơ trước: gần như mọi bảng có khoá ngoại tới user_profiles.
  for (const [k, u] of FIXTURE_USERS.entries()) {
    db.prepare(
      "INSERT INTO user_profiles (id, email, full_name, total_xp, lessons_completed, avg_quiz_score, current_level, coins, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).run(u, `nguoi-hoc-${k + 1}@test.invalid`, `Người học ${k + 1}`, 900 - k * 250, 30 - k * 8, 90 - k * 10, 5 - k,
      // Người đầu giàu và có kho đồ; hai người sau không có xu.
      k === 0 ? 100_000 : 0, new Date(Date.now() - 40 * 86_400_000).toISOString());
    db.prepare("INSERT INTO auth_users (id, email, password_hash) VALUES (?, ?, ?)").run(u, `nguoi-hoc-${k + 1}@test.invalid`, "fixture$0$x$x");
  }

  // Vài vòng: bảng có khoá ngoại tới bảng chưa có hàng thì đợi vòng sau.
  const done = new Set(["user_profiles", "auth_users"]);
  for (let pass = 0; pass < 6; pass++) {
    for (const table of tables) {
      if (done.has(table) || table === "d1_migrations") continue;
      const cols = db.prepare(`SELECT * FROM pragma_table_info('${table}')`).all() as unknown as Col[];
      const fks = db.prepare(`SELECT "table", "from", "to" FROM pragma_foreign_key_list('${table}')`).all() as unknown as Fk[];
      const fkValues = new Map<string, unknown[]>();
      let blocked = false;
      for (const fk of fks) {
        if (fk.table === "user_profiles" || fk.table === "auth_users") continue;
        // Tự tham chiếu (bài tiên quyết, tin trả lời): để trống.
        if (fk.table === table) {
          fkValues.set(fk.from, []);
          continue;
        }
        const vals = (db.prepare(`SELECT "${fk.to}" v FROM "${fk.table}" LIMIT 20`).all() as { v: unknown }[]).map((r) => r.v);
        if (!vals.length) blocked = true;
        fkValues.set(fk.from, vals);
      }
      if (blocked && pass < 5) continue;
      done.add(table);
      const ownerCols = cols.filter((c) => USER_COLUMNS.has(c.name));
      // Bảng không trỏ tới người dùng (danh mục, cấu hình): vài hàng là đủ.
      // Kho đồ chỉ của người đầu: người thứ ba nghèo và chưa sở hữu gì, cho
      // phép thử "không đủ xu" và "mua lần đầu".
      const users = ownerCols.length && !["user_inventories", "user_equipments"].includes(table) ? FIXTURE_USERS : [FIXTURE_USERS[0]];
      // Đủ hàng mỗi người để phép thử phân trang (range 0-9) có trang đầy.
      const perUser = ownerCols.length ? 12 : 3;
      const autoPk = cols.filter((c) => c.pk).length === 1 && cols.find((c) => c.pk)!.type.toUpperCase() === "INTEGER";
      for (const user of users) {
        for (let i = 0; i < perUser; i++) {
          const use = cols.filter((c) => !(c.pk && autoPk));
          const values = use.map((c) => {
            const pool = fkValues.get(c.name);
            const fk = pool && pool.length ? pool[(i + FIXTURE_USERS.indexOf(user)) % pool.length] : pool ? null : undefined;
            // Cột người dùng thứ hai (user_b, followed_id, opponent_id...) trỏ sang người KHÁC.
            if (USER_COLUMNS.has(c.name) && ownerCols.length > 1 && c.name !== ownerCols[0].name) {
              return FIXTURE_USERS[(FIXTURE_USERS.indexOf(user) + 1 + (i % 2)) % FIXTURE_USERS.length];
            }
            return valueFor(c, table, user, i, fk);
          });
          try {
            db.prepare(
              `INSERT INTO "${table}" (${use.map((c) => `"${c.name}"`).join(", ")}) VALUES (${use.map(() => "?").join(", ")})`
            ).run(...(values as never[]));
          } catch (e) {
            // Ràng buộc CHECK, UNIQUE hoặc khoá ngoại: bỏ hàng này.
            FIXTURE_ERRORS.push(`${table}: ${(e as Error).message}`);
          }
        }
      }
    }
  }
}

/** Hàng sinh tự động bị từ chối - để chẩn đoán khi một bảng trống. */
export const FIXTURE_ERRORS: string[] = [];

let built: string | null = null;

/** Đường dẫn tới DB test đã dựng (một lần cho mỗi tiến trình kiểm). */
export function fixtureDbPath(): string {
  if (built) return built;
  const file = join(mkdtempSync(join(tmpdir(), "d1-fixture-")), "fixture.sqlite");
  const db = new DatabaseSync(file);
  db.exec("PRAGMA foreign_keys = ON;");
  const dir = join(process.cwd(), "migrations-d1");
  for (const f of readdirSync(dir).filter((x) => x.endsWith(".sql")).sort()) {
    db.exec(readFileSync(join(dir, f), "utf8"));
  }
  generate(db);
  db.close();
  built = file;
  return file;
}
