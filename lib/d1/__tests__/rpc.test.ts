import { describe, expect, it } from "vitest";
import { copyFileSync, existsSync, mkdtempSync, readdirSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  getTrackLeaderboard,
  getFollowCounts,
  getTotalCompletedLessonsCount,
  getTotalUserCount,
  type D1Like,
} from "../rpc";

// Cùng cách gác với query-builder.test.ts: không có D1 local thì bỏ qua chứ
// không đỏ, vì một bản checkout sạch chưa chạy scripts/d1 thì không có tệp.
const hasLocalData = existsSync(".wrangler/state/v3/d1/miniflare-D1DatabaseObject");

// Đối chiếu bản dịch với SQL thô chạy trên cùng cơ sở dữ liệu, chứ không với
// một con số chép tay. Chép tay thì bộ kiểm đỏ mỗi lần nạp lại dữ liệu, và
// người ta sẽ sửa con số thay vì sửa lỗi.
/** Đọc trên một BẢN SAO của D1 local, không dùng chung `openLocalD1()`.
 *
 *  Hai lý do, cái thứ hai mới là cái quan trọng:
 *   1. D1 local đang có WAL nóng ~26 MB. Vitest chạy các tệp kiểm song song,
 *      nên tệp này và query-builder.test.ts mở hai kết nối từ hai tiến trình
 *      và SQLite báo "database is locked". Lỗi chỉ hiện khi chạy CẢ BỘ, không
 *      hiện khi chạy riêng - đúng loại lỗi dễ bỏ qua nhất.
 *   2. Bản sao còn khiến bộ kiểm không đọc phải trạng thái nửa chừng nếu có ai
 *      đang nạp lại dữ liệu vào D1 local trong lúc bộ kiểm chạy.
 *
 *  Phải chép cả tệp `-wal`: thiếu nó thì bản sao chỉ có phần đã checkpoint,
 *  tức là thiếu dữ liệu mà không báo lỗi gì.
 */
function openCopyOfLocalD1(): D1Like {
  const dir = join(process.cwd(), ".wrangler/state/v3/d1/miniflare-D1DatabaseObject");
  const name = readdirSync(dir).find((f) => f.endsWith(".sqlite") && f !== "metadata.sqlite")!;
  const tmp = mkdtempSync(join(tmpdir(), "d1-rpc-"));
  const dest = join(tmp, name);
  copyFileSync(join(dir, name), dest);
  for (const suffix of ["-wal", "-shm"]) {
    const src = join(dir, name + suffix);
    if (existsSync(src)) copyFileSync(src, dest + suffix);
  }
  const sqlite = new DatabaseSync(dest, { readOnly: true });
  return {
    prepare(sql: string) {
      return {
        bind(...args: unknown[]) {
          return {
            async all() {
              return { results: sqlite.prepare(sql).all(...(args as never[])) as unknown[] };
            },
          };
        },
      };
    },
  };
}

const db = (hasLocalData ? openCopyOfLocalD1() : null) as unknown as D1Like;

describe.skipIf(!hasLocalData)("RPC nhóm A trên D1 local", () => {

  const raw = async (sql: string, ...args: unknown[]) => {
    const r = await db.prepare(sql).bind(...args).all();
    return r.results as Record<string, number>[];
  };

  it("getTotalUserCount khớp count(*) trên user_profiles", async () => {
    const [{ c }] = await raw("select count(*) as c from user_profiles");
    expect(await getTotalUserCount(db)).toBe(c);
    expect(c).toBeGreaterThan(0);
  });

  it("getTotalCompletedLessonsCount đọc đúng boolean đã đổi thành 0/1", async () => {
    // Chỗ dễ sai nhất của cả hàm này: Postgres lưu `completed` là boolean,
    // SQLite lưu số nguyên. Dịch thẳng `completed = true` sang SQLite thì
    // SQLite hiểu `true` là 1 nên vẫn chạy - nhưng nếu bộ nạp từng ghi chuỗi
    // 'true' thì câu lệnh trả 0 mà không báo lỗi. Khẳng định kiểu lưu ở đây để
    // lần nạp sau đổi cách ghi thì bộ kiểm đỏ ngay.
    const kinds = await raw(
      "select typeof(completed) as t, count(*) as c from user_progress group by typeof(completed)"
    );
    expect(kinds.map((k) => k.t)).toEqual(["integer"]);

    const [{ c }] = await raw("select count(*) as c from user_progress where completed = 1");
    expect(await getTotalCompletedLessonsCount(db)).toBe(c);
    expect(c).toBeGreaterThan(0);
  });

  it("getFollowCounts đếm đúng hai chiều và không lẫn chiều", async () => {
    // Lấy một người thật đang có ít nhất một lượt theo dõi, thay vì uuid bịa:
    // với uuid bịa thì hàm trả 0/0 và bộ kiểm xanh kể cả khi hai chiều bị đảo.
    const [{ followed_id: target }] = (await raw(
      "select followed_id from user_follows limit 1"
    )) as unknown as { followed_id: string }[];

    const [{ c: followers }] = await raw(
      "select count(*) as c from user_follows where followed_id = ?",
      target
    );
    const [{ c: following }] = await raw(
      "select count(*) as c from user_follows where follower_id = ?",
      target
    );

    const got = await getFollowCounts(db, target);
    expect(got).toEqual({ followers, following });
    expect(followers).toBeGreaterThan(0);
  });

  it("getFollowCounts trả 0/0 cho người không tồn tại thay vì ném lỗi", async () => {
    expect(await getFollowCounts(db, "khong-co-that")).toEqual({ followers: 0, following: 0 });
  });
});

describe.skipIf(!hasLocalData)("getTrackLeaderboard", () => {

  it("trả về đúng số dòng, sắp giảm dần, và tôn trọng trần 50", async () => {
    const top = await getTrackLeaderboard(db, "professional", 5);
    expect(top.length).toBeLessThanOrEqual(5);
    const vals = top.map((r) => r.value);
    expect([...vals].sort((a, b) => b - a)).toEqual(vals);

    // `limit` do client gửi lên phải bị kẹp, giống `least(..., 50)` bản gốc.
    const huge = await getTrackLeaderboard(db, "professional", 9999);
    expect(huge.length).toBeLessThanOrEqual(50);
  });

  it("không có tên rỗng - nhánh split_part đã dịch đúng", async () => {
    // Bản gốc dựng tên bằng `split_part(email,'@',1)`; SQLite không có hàm đó
    // nên nó được thay bằng substr+instr. Nếu dịch sai thì cột name ra chuỗi
    // rỗng hoặc null chứ không ném lỗi, nên phải khẳng định ở đây.
    const top = await getTrackLeaderboard(db, "personal", 20);
    for (const r of top) {
      expect(typeof r.name).toBe("string");
      expect(r.name.length).toBeGreaterThan(0);
      expect(r.name).not.toContain("@");
    }
  });

  it("loại admin và tài khoản bị khoá", async () => {
    const ids = new Set((await getTrackLeaderboard(db, "personal", 50)).map((r) => r.user_id));
    const banned = (await db
      .prepare(
        `select id from user_profiles
          where coalesce(is_disabled, 0) = 1 or coalesce(role, 'user') = 'admin'`
      )
      .bind()
      .all()) as { results: { id: string }[] };
    for (const b of banned.results) expect(ids.has(b.id)).toBe(false);
  });
});
