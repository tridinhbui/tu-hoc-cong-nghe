import { describe, expect, it } from "vitest";
import { copyFileSync, existsSync, mkdtempSync, readdirSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  getChatMessageReactions,
  getMyCompetencyLeaderboardRank,
  getMyCompositeRank,
  getMyTrackLeaderboardRank,
  getMyXpRankSince,
  getLeaderboard,
  getXpLeaderboardSince,
  getCompetencyLeaderboard,
  getDailyActiveUsers,
  getStudyRoomReactions,
  getCompositeLeaderboard,
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

describe.skipIf(!hasLocalData)("getCompositeLeaderboard", () => {
  it("điểm tổng khớp công thức tính lại độc lập bằng TypeScript", async () => {
    // Bản đầu của bộ kiểm này chỉ khẳng định "điểm > 0 với người dưới 40.000
    // XP". Nó VÔ DỤNG: tôi cố tình đổi `40000.0` thành `40000` (tức bật lại
    // phép chia nguyên của SQLite) và bộ kiểm vẫn xanh, vì ba cấu phần còn lại
    // đủ kéo điểm lên dương.
    //
    // Cách duy nhất bắt được là tính lại đúng công thức ở đây rồi so từng
    // dòng. Làm vậy thì mọi sai lệch về kiểu số, thứ tự phép toán hay làm tròn
    // đều lộ ra chứ không chỉ riêng phép chia nguyên.
    const top = await getCompositeLeaderboard(db, 50);
    expect(top.length).toBeGreaterThan(0);
    // Phải có người ở dưới từng ngưỡng, nếu không phép so sánh không chạm tới
    // nhánh chia thập phân và lại thành một bộ kiểm vô dụng nữa.
    expect(top.some((r) => r.learning_xp > 0 && r.learning_xp < 40000)).toBe(true);

    for (const r of top) {
      const mong = Math.round(
        1000 *
          (0.35 * Math.min(1, r.learning_xp / 40000) +
            0.30 * Math.min(1, r.exam_points / 1400) +
            0.20 * (r.accuracy / 100) +
            0.15 * Math.min(1, r.streak_days / 100))
      );
      expect(r.composite, `user ${r.user_id}`).toBe(mong);
    }
  });

  it("sắp giảm dần và không vượt trần 50", async () => {
    const top = await getCompositeLeaderboard(db, 9999);
    expect(top.length).toBeLessThanOrEqual(50);
    const v = top.map((r) => r.composite);
    expect([...v].sort((a, b) => b - a)).toEqual(v);
  });

  it("điểm nằm trong 0..1000 và các cấu phần không âm", async () => {
    for (const r of await getCompositeLeaderboard(db, 50)) {
      expect(r.composite).toBeGreaterThanOrEqual(0);
      expect(r.composite).toBeLessThanOrEqual(1000);
      expect(r.accuracy).toBeGreaterThanOrEqual(0);
      expect(r.accuracy).toBeLessThanOrEqual(100);
      expect(r.learning_xp).toBeGreaterThanOrEqual(0);
      expect(r.streak_days).toBeGreaterThanOrEqual(0);
    }
  });
});

describe.skipIf(!hasLocalData)("getChatMessageReactions", () => {
  it("từ chối khi người gọi không phải chủ tin nhắn", async () => {
    // Hàm gốc gác bằng `and p_user_id = auth.uid()` ngay trong WHERE. Mất dòng
    // đó là ai cũng đọc được reaction trên hộp thoại của người khác.
    expect(await getChatMessageReactions(db, "nguoi-khac", "chu-hop-thoai")).toEqual([]);
    expect(await getChatMessageReactions(db, "", "")).toEqual([]);
  });

  it("gom nhóm theo message_id + emoji, giữ thứ tự theo created_at", async () => {
    const owner = (
      (await db
        .prepare("select user_id from chat_messages limit 1")
        .bind()
        .all()) as { results: { user_id: string }[] }
    ).results[0]?.user_id;
    if (!owner) return; // chưa có tin nhắn nào trong dữ liệu local

    const got = await getChatMessageReactions(db, owner, owner);
    const keys = got.map((g) => `${g.message_id}|${g.emoji}`);
    expect(new Set(keys).size).toBe(keys.length); // không nhóm nào lặp
    for (const g of got) expect(g.user_ids.length).toBeGreaterThan(0);
  });
});

describe.skipIf(!hasLocalData)("getDailyActiveUsers", () => {
  it("khung ngày liên tục, đủ số ngày, kể cả ngày không ai học", async () => {
    // Cả điểm của hàm này là ngày im lặng vẫn phải hiện ra với số 0. Nếu CTE
    // đệ quy dịch sai thành một phép JOIN thường thì những ngày ấy biến mất và
    // đồ thị co lại - không lỗi, chỉ thiếu.
    const got = await getDailyActiveUsers(db, 14);
    expect(got.length).toBe(14);
    for (let i = 1; i < got.length; i++) {
      const truoc = new Date(got[i - 1].date + "T00:00:00Z").getTime();
      const sau = new Date(got[i].date + "T00:00:00Z").getTime();
      expect(sau - truoc).toBe(86400000); // đúng một ngày, không nhảy cóc
    }
    expect(got.at(-1)!.date).toBe(new Date().toISOString().slice(0, 10));
  });

  it("kẹp tham số days để CTE đệ quy không chạy vô hạn", async () => {
    // Tính chất cần gác là CHẶN TRÊN và CHẶN DƯỚI, không phải một con số cụ
    // thể: bản gốc dựa vào generate_series tự trả rỗng với đầu vào vô lý, còn
    // CTE đệ quy thì phải tự chặn, nếu không nó chạy tới khi hết bộ nhớ.
    expect((await getDailyActiveUsers(db, 0)).length).toBe(30); // 0 → mặc định
    const am = await getDailyActiveUsers(db, -5);
    expect(am.length).toBeGreaterThanOrEqual(1);
    expect(am.length).toBeLessThanOrEqual(365);
    expect((await getDailyActiveUsers(db, 99999)).length).toBe(365); // trần
  });

  it("số đếm khớp với đếm thô trên cùng khoảng", async () => {
    const got = await getDailyActiveUsers(db, 30);
    const tong = got.reduce((a, r) => a + r.count, 0);
    const [{ c }] = (await db
      .prepare(
        `select count(*) as c from (
           select distinct user_id, date(completed_at) as d
             from user_progress
            where completed = 1
              and date(completed_at) >= date('now', '-29 days')
              and date(completed_at) <= date('now')
         )`
      )
      .bind()
      .all()
      .then((r) => r.results as { c: number }[]));
    expect(tong).toBe(c);
  });
});

describe.skipIf(!hasLocalData)("getStudyRoomReactions", () => {
  it("người ngoài phòng không đọc được reaction", async () => {
    // Bản gốc gác bằng exists(... m.user_id = auth.uid() and m.left_at is null).
    // Mất điều kiện đó là ai cũng đọc được hộp chat của mọi phòng học.
    const phong = (await db
      .prepare("select room_id from study_room_messages limit 1")
      .bind()
      .all()
      .then((r) => r.results as { room_id: number }[]))[0];
    if (!phong) return;
    expect(await getStudyRoomReactions(db, "nguoi-ngoai-phong", phong.room_id)).toEqual([]);
    expect(await getStudyRoomReactions(db, "", phong.room_id)).toEqual([]);
  });

  it("thành viên đã rời phòng cũng không đọc được", async () => {
    const daRoi = (await db
      .prepare("select room_id, user_id from study_room_members where left_at is not null limit 1")
      .bind()
      .all()
      .then((r) => r.results as { room_id: number; user_id: string }[]))[0];
    if (!daRoi) return; // dữ liệu local chưa có ai rời phòng
    expect(await getStudyRoomReactions(db, daRoi.user_id, daRoi.room_id)).toEqual([]);
  });
});

describe.skipIf(!hasLocalData)("getCompetencyLeaderboard (tham số mảng)", () => {
  const layIds = async (n: number) =>
    (await db
      .prepare(`select distinct lesson_id from user_progress where completed = 1 limit ${n}`)
      .bind()
      .all()
      .then((r) => r.results as { lesson_id: number }[])).map((x) => x.lesson_id);

  it("nở đúng số dấu hỏi theo độ dài mảng", async () => {
    for (const n of [1, 3, 25]) {
      const ids = await layIds(n);
      const got = await getCompetencyLeaderboard(db, ids, 50);
      // Sai số dấu hỏi thì SQLite ném lỗi ràng buộc chứ không trả sai lặng lẽ,
      // nên chỉ cần chạy được là đã chứng minh phần nở là đúng.
      expect(Array.isArray(got)).toBe(true);
      for (const r of got) expect(r.value).toBeGreaterThan(0);
    }
  });

  it("mảng rỗng trả rỗng thay vì ném lỗi cú pháp", async () => {
    // `in ()` là lỗi cú pháp trong SQLite; `any('{}')` của Postgres thì hợp lệ
    // và không khớp dòng nào. Phải chặn sớm để hai bên giống nhau.
    expect(await getCompetencyLeaderboard(db, [], 10)).toEqual([]);
    expect(await getCompetencyLeaderboard(db, undefined as never, 10)).toEqual([]);
  });

  it("phần tử không phải số bị loại, không lọt vào SQL", async () => {
    const ids = await layIds(2);
    const ban = ["1); drop table user_progress;--", null, NaN] as never[];
    const got = await getCompetencyLeaderboard(db, [...ids, ...ban], 10);
    expect(Array.isArray(got)).toBe(true);
    // Bảng vẫn còn nguyên sau lời gọi.
    const [{ c }] = await db
      .prepare("select count(*) as c from user_progress")
      .bind()
      .all()
      .then((r) => r.results as { c: number }[]);
    expect(c).toBeGreaterThan(0);
  });

  it("đếm khớp với truy vấn thô trên cùng tập bài", async () => {
    const ids = await layIds(5);
    const got = await getCompetencyLeaderboard(db, ids, 50);
    if (!got.length) return;
    const [{ c }] = await db
      .prepare(
        `select count(*) as c from user_progress
          where completed = 1 and user_id = ? and lesson_id in (${ids.map(() => "?").join(",")})`
      )
      .bind(got[0].user_id, ...ids)
      .all()
      .then((r) => r.results as { c: number }[]);
    expect(got[0].value).toBe(c);
  });
});

describe.skipIf(!hasLocalData)("getLeaderboard", () => {
  it("cả bốn chỉ số đều chạy, sắp giảm dần, kẹp trần 50", async () => {
    for (const m of ["streak", "lessons", "avg_score", "xp"] as const) {
      const top = await getLeaderboard(db, m, 9999);
      expect(top.length, m).toBeLessThanOrEqual(50);
      const v = top.map((r) => r.value);
      expect([...v].sort((a, b) => b - a), m).toEqual(v);
    }
  });

  it("bảng Điểm TB chỉ nhận người đã có ít nhất 30 bài được chấm", async () => {
    // Bỏ cổng này là người làm đúng một bài điểm 100 đứng đầu bảng. Đây là
    // loại lỗi không ai báo vì bảng vẫn hiện ra bình thường.
    const top = await getLeaderboard(db, "avg_score", 50);
    for (const r of top) {
      const [{ c }] = await db
        .prepare("select count(*) as c from user_progress where user_id = ? and quiz_score is not null")
        .bind(r.user_id)
        .all()
        .then((x) => x.results as { c: number }[]);
      expect(c, `user ${r.user_id}`).toBeGreaterThanOrEqual(30);
    }
  });

  it("chỉ số lạ rơi về xp thay vì ném lỗi", async () => {
    const la = await getLeaderboard(db, "khong-co-that" as never, 5);
    const xp = await getLeaderboard(db, "xp", 5);
    expect(la.map((r) => r.user_id)).toEqual(xp.map((r) => r.user_id));
  });
});

describe.skipIf(!hasLocalData)("getXpLeaderboardSince", () => {
  const MOC = "2020-01-01T00:00:00+00:00"; // đủ xa để bao trọn dữ liệu

  it("chạy được: row_number thay DISTINCT ON, union thay FULL OUTER JOIN", async () => {
    const top = await getXpLeaderboardSince(db, MOC, 50);
    expect(top.length).toBeGreaterThan(0);
    const v = top.map((r) => r.value);
    expect([...v].sort((a, b) => b - a)).toEqual(v);
    for (const r of top) expect(r.value).toBeGreaterThan(0);
  });

  it("mỗi loại game chỉ tính ván điểm cao nhất, và trần 50 mỗi ván", async () => {
    // Đây là chỗ DISTINCT ON được dịch. Nếu row_number sai phân vùng thì tổng
    // XP game phồng lên theo số ván chứ không theo số loại game.
    const top = await getXpLeaderboardSince(db, MOC, 50);
    if (!top.length) return;
    const u = top[0].user_id;

    const [{ tran }] = await db
      .prepare(
        // `max(x)` một đối số là hàm GỘP, `max(a,b)` hai đối số là hàm vô
        // hướng. Bản đầu của phép kiểm này viết `min(max(coalesce(x,0),0),50)`
        // ngay trong GROUP BY - toàn hàm vô hướng, nên SQLite lấy giá trị của
        // một dòng BẤT KỲ trong nhóm thay vì dòng lớn nhất, và con số lệch đi
        // 102 XP. Phải gộp `max()` trước rồi mới kẹp.
        `select coalesce(sum(min(max(mx, 0), 50)), 0) as tran from (
           select game_type, max(coalesce(xp_earned, 0)) as mx
             from game_sessions where user_id = ?
            group by game_type
         )`
      )
      .bind(u)
      .all()
      .then((r) => r.results as { tran: number }[]);

    const [{ bai }] = await db
      .prepare("select count(*) * 10 as bai from user_progress where user_id = ? and completed = 1")
      .bind(u)
      .all()
      .then((r) => r.results as { bai: number }[]);

    const [{ q }] = await db
      .prepare("select coalesce(sum(xp_earned),0) as q from user_quiz_sessions where user_id = ?")
      .bind(u)
      .all()
      .then((r) => r.results as { q: number }[]);

    expect(top[0].value).toBe(bai + q + tran);
  });

  it("mốc thời gian trong tương lai trả rỗng", async () => {
    expect(await getXpLeaderboardSince(db, "2099-01-01T00:00:00+00:00", 10)).toEqual([]);
  });
});

describe.skipIf(!hasLocalData)('nhóm "thứ hạng của tôi"', () => {
  it("người chưa học bài nào trả RỖNG, không phải hạng chót", async () => {
    // Bản gốc `return` sớm khi my_value = 0. Dịch thành {rank: n, value: 0} là
    // giao diện hiện "hạng 1520" cho người vừa đăng ký.
    expect(await getMyTrackLeaderboardRank(db, "personal", "khong-co-that")).toEqual([]);
    expect(await getMyCompetencyLeaderboardRank(db, [1, 2, 3], "khong-co-that")).toEqual([]);
    expect(await getMyXpRankSince(db, "2020-01-01T00:00:00+00:00", "khong-co-that")).toEqual([]);
  });

  it("người đứng đầu bảng có hạng 1 và value khớp bảng", async () => {
    const top = await getTrackLeaderboard(db, "professional", 1);
    if (!top.length) return;
    const [r] = await getMyTrackLeaderboardRank(db, "professional", top[0].user_id);
    expect(r.rank).toBe(1);
    expect(r.value).toBe(top[0].value);
  });

  it("hạng là hạng CẠNH TRANH: bằng điểm thì cùng hạng", async () => {
    // count(*)+1 trên "số người nhiều hơn mình" cho hạng cạnh tranh. Đổi sang
    // row_number là hai người bằng điểm nhận hai hạng khác nhau, và thứ tự
    // giữa họ do SQLite quyết định - tức là đổi sau mỗi lần chạy.
    const top = await getTrackLeaderboard(db, "personal", 50);
    const theoValue = new Map<number, string[]>();
    for (const r of top) theoValue.set(r.value, [...(theoValue.get(r.value) ?? []), r.user_id]);
    const nhomHoa = [...theoValue.values()].find((g) => g.length > 1);
    if (!nhomHoa) return; // dữ liệu chưa có ai bằng điểm nhau
    const hangs = await Promise.all(
      nhomHoa.map(async (u) => (await getMyTrackLeaderboardRank(db, "personal", u))[0]?.rank)
    );
    expect(new Set(hangs).size).toBe(1);
  });

  it("hạng XP khớp vị trí trong bảng xếp hạng XP", async () => {
    const MOC = "2020-01-01T00:00:00+00:00";
    const top = await getXpLeaderboardSince(db, MOC, 10);
    if (!top.length) return;
    const [r] = await getMyXpRankSince(db, MOC, top[0].user_id);
    expect(r.rank).toBe(1);
    expect(r.value).toBe(top[0].value);
  });

  it("getMyCompositeRank chỉ trả phân rã điểm cho chính chủ", async () => {
    const top = await getCompositeLeaderboard(db, 1);
    if (!top.length) return;
    const u = top[0].user_id;
    expect(await getMyCompositeRank(db, "nguoi-khac", u)).toEqual([]);
    expect(await getMyCompositeRank(db, "", u)).toEqual([]);

    const [minh] = await getMyCompositeRank(db, u, u);
    expect(minh.rank).toBe(1);
    expect(minh.value).toBe(top[0].composite);
    expect(minh.learning_xp).toBe(top[0].learning_xp);
  });
});
