import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { openLocalD1 } from "./d1-shim";
import {
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
describe.skipIf(!hasLocalData)("RPC nhóm A trên D1 local", () => {
  const db = (hasLocalData ? openLocalD1() : null) as D1Like;

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
