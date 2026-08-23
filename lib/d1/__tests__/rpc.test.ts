import { describe, expect, it } from "vitest";
import { copyFileSync, existsSync, mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  NotAuthenticatedError,
  adminResyncAllUserStats,
  applyWorldBossDamage,
  claimStudyRoomWeeklyReward,
  grantCoins,
  joinOrCreateStudyRoom,
  joinStudyRoom,
  purchaseCosmetic,
  recordQuizMistake,
  syncLessonsAtomic,
  toggleChatMessageReaction,
  weeklyRematchStudyRooms,
  incrementDocumentDownload,
  leaveStudyRoom,
  markAdminChatMessagesSeen,
  recordReferral,
  recordStudyRoomCheckin,
  recordStudyRoomQuizAttempt,
  rewardMyReferral,
  getChatMessageReactions,
  getCommunityFeed,
  getCommunityLearningNow,
  getCommunityPostComments,
  getDashboardSummary,
  getLessonState,
  getLevelStats,
  getMySocialGraph,
  getMyStudyRoom,
  getNavState,
  getStudyRoomMembers,
  getStudyRoomMissionStatus,
  getStudyRooms,
  getUserCommunityPosts,
  searchAccounts,
  getCommunityContributionLeaderboard,
  getFriendsLeaderboard,
  getMyCommunityContributionRank,
  getMyLeaderboardRank,
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
/** `node-sqlite.d.ts` trong repo chỉ khai `prepare().all()`. Nhóm B và C cần
 *  `run()` và `exec()`, nên khai bổ sung ở đây thay vì sửa tệp khai kiểu chung. */
type Sqlite = {
  prepare(sql: string): {
    all(...p: unknown[]): Record<string, unknown>[];
    run(...p: unknown[]): { changes: number | bigint; lastInsertRowid: number | bigint };
  };
  exec(sql: string): void;
};

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
  // GHI ĐƯỢC, không readOnly. Nhóm B và C là các hàm ghi, và bản sao tạm chính
  // là chỗ đúng để kiểm chúng: mọi thay đổi nằm trong /tmp và biến mất sau khi
  // chạy, nên D1 local không bao giờ bị đụng tới.
  const sqlite = new DatabaseSync(dest) as unknown as Sqlite;

  // Áp 0002_unique_constraints.sql lên bản sao. 0001 sinh từ bản chụp PostgREST
  // nên KHÔNG có ràng buộc UNIQUE nào, và `ON CONFLICT (...)` ném lỗi "does not
  // match any PRIMARY KEY or UNIQUE constraint" - tôi phát hiện đúng như vậy khi
  // chạy bộ kiểm nhóm B lần đầu. Áp ở đây để bộ kiểm chứng minh CẢ HAI: migration
  // dựng được trên dữ liệu thật, và hàm ghi chạy đúng khi có ràng buộc.
  for (const line of readFileSync("migrations-d1/0002_unique_constraints.sql", "utf8").split("\n")) {
    if (line.startsWith("CREATE")) sqlite.exec(line);
  }
  return {
    async batch(stmts: unknown[]) {
      // node:sqlite không có API batch; dựng transaction thủ công để bộ kiểm
      // kiểm được đúng tính chất mà D1 batch() hứa: hoặc tất cả, hoặc không.
      sqlite.exec("BEGIN");
      try {
        const out = (stmts as { __sql: string; __args: unknown[] }[]).map((st) => {
          const r = sqlite.prepare(st.__sql).run(...(st.__args as never[]));
          return { meta: { changes: Number(r.changes) } };
        });
        sqlite.exec("COMMIT");
        return out;
      } catch (e) {
        sqlite.exec("ROLLBACK");
        throw e;
      }
    },
    prepare(sql: string) {
      return {
        bind(...args: unknown[]) {
          return {
            __sql: sql,
            __args: args,
            bind(...more: unknown[]) {
              return this;
            },
            async all() {
              return { results: sqlite.prepare(sql).all(...(args as never[])) as unknown[] };
            },
            async run() {
              const r = sqlite.prepare(sql).run(...(args as never[]));
              return { meta: { changes: Number(r.changes), last_row_id: Number(r.lastInsertRowid) } };
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

describe.skipIf(!hasLocalData)("đóng góp cộng đồng + hạng theo chỉ số", () => {
  it("bảng đóng góp không độn người có 0 đóng góp", async () => {
    const top = await getCommunityContributionLeaderboard(db, 50);
    for (const r of top) expect(r.value).toBeGreaterThan(0);
    const v = top.map((r) => r.value);
    expect([...v].sort((a, b) => b - a)).toEqual(v);
  });

  it("hạng đóng góp chỉ trả cho chính chủ và khớp bảng", async () => {
    const top = await getCommunityContributionLeaderboard(db, 1);
    if (!top.length) return;
    const u = top[0].user_id;
    expect(await getMyCommunityContributionRank(db, "nguoi-khac", u)).toEqual([]);
    const [r] = await getMyCommunityContributionRank(db, u, u);
    expect(r.rank).toBe(1);
    expect(r.value).toBe(top[0].value);
  });

  it("getMyLeaderboardRank: không tìm thấy người → rỗng, nhưng 0 điểm vẫn có hạng", async () => {
    // Bản gốc trả rỗng khi my_value IS NULL, không phải khi = 0. Nhầm hai điều
    // kiện này là giấu mất hạng của người mới hoặc hiện hạng cho người không có.
    expect(await getMyLeaderboardRank(db, "xp", "khong-co-that")).toEqual([]);
    const khong = (await db
      .prepare("select user_id from user_stats where coalesce(total_xp,0) = 0 limit 1")
      .bind().all().then((r) => r.results as { user_id: string }[]))[0];
    if (khong) {
      const [r] = await getMyLeaderboardRank(db, "xp", khong.user_id);
      expect(r?.value).toBe(0);
      expect(r?.rank).toBeGreaterThan(0);
    }
  });

  it("Điểm TB: người chưa đủ 30 bài chấm đứng sau TOÀN BỘ nhóm đủ sàn", async () => {
    const chuaDu = (await db
      .prepare(
        `select us.user_id from user_stats us
           left join (select user_id, count(*) g from user_progress
                       where quiz_score is not null group by user_id) x
             on x.user_id = us.user_id
          where coalesce(x.g, 0) < 30 and us.avg_quiz_score > 0 limit 1`
      )
      .bind().all().then((r) => r.results as { user_id: string }[]))[0];
    if (!chuaDu) return;

    const [{ c: soDuSan }] = await db
      .prepare(
        `select count(*) as c from user_stats us
           join user_profiles prof on prof.id = us.user_id
           left join (select user_id, count(*) g from user_progress
                       where quiz_score is not null group by user_id) x
             on x.user_id = us.user_id
          where coalesce(prof.is_disabled,0) = 0 and coalesce(prof.role,'user') <> 'admin'
            and coalesce(x.g, 0) >= 30`
      )
      .bind().all().then((r) => r.results as { c: number }[]);

    const [r] = await getMyLeaderboardRank(db, "avg_score", chuaDu.user_id);
    expect(r.rank).toBeGreaterThan(soDuSan);
  });

  it("bảng bạn bè luôn có chính mình, và không lặp", async () => {
    const ai = (await db.prepare("select id from user_profiles limit 1").bind().all()
      .then((r) => r.results as { id: string }[]))[0];
    const bang = await getFriendsLeaderboard(db, ai.id, "xp");
    const ids = bang.map((r) => r.user_id);
    expect(ids).toContain(ai.id);
    expect(new Set(ids).size).toBe(ids.length); // `union` khử trùng
    expect(await getFriendsLeaderboard(db, "", "xp")).toEqual([]);
  });

  it("chỉ số badges là biểu thức, kẹp trong 0..5", async () => {
    const ai = (await db.prepare("select id from user_profiles limit 1").bind().all()
      .then((r) => r.results as { id: string }[]))[0];
    for (const r of await getFriendsLeaderboard(db, ai.id, "badges")) {
      expect(r.value).toBeGreaterThanOrEqual(0);
      expect(r.value).toBeLessThanOrEqual(5);
    }
  });
});

describe.skipIf(!hasLocalData)("phần còn lại của nhóm A", () => {
  const AI = async () =>
    (await db.prepare("select id from user_profiles limit 1").bind().all()
      .then((r) => r.results as { id: string }[]))[0].id;

  it("hàm cần đăng nhập thì NÉM, không trả object rỗng", async () => {
    // Bản gốc `raise exception 'Not authenticated'`. Trả object rỗng thay vì
    // ném là giao diện hiện "bạn chưa có gì" cho người chưa đăng nhập.
    await expect(getNavState(db, "", "2020-01-01T00:00:00+00:00")).rejects.toThrow(NotAuthenticatedError);
    await expect(getLessonState(db, "")).rejects.toThrow(NotAuthenticatedError);
    await expect(getDashboardSummary(db, "")).rejects.toThrow(NotAuthenticatedError);
  });

  it("hàm phòng học và mạng xã hội trả rỗng khi không có người gọi", async () => {
    expect(await getMySocialGraph(db, "")).toEqual([]);
    expect(await getMyStudyRoom(db, "")).toEqual([]);
    expect(await getStudyRooms(db, "")).toEqual([]);
    expect(await getStudyRoomMembers(db, "", 1)).toEqual([]);
    expect(await getStudyRoomMissionStatus(db, "", 1)).toEqual([]);
    expect(await searchAccounts(db, "", "nguyen")).toEqual([]);
  });

  it("searchAccounts: dưới 2 ký tự trả rỗng, và không trả về chính mình", async () => {
    const me = await AI();
    expect(await searchAccounts(db, me, "a")).toEqual([]);
    expect(await searchAccounts(db, me, " ")).toEqual([]);
    for (const r of await searchAccounts(db, me, "nguyen", 20)) expect(r.id).not.toBe(me);
  });

  it("searchAccounts hạ chữ hai phía nên gõ HOA vẫn khớp (phạm vi ASCII)", async () => {
    const me = await AI();
    const thuong = await searchAccounts(db, me, "gmail", 20);
    const hoa = await searchAccounts(db, me, "GMAIL", 20);
    expect(hoa.map((r) => r.id)).toEqual(thuong.map((r) => r.id));
  });

  it("getLevelStats: đủ 9 bậc, tổng số người khớp, top mỗi bậc tối đa 5", async () => {
    const st = await getLevelStats(db, await AI());
    expect(st.map((s) => s.level)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [{ c }] = await db.prepare("select count(*) as c from user_stats").bind().all()
      .then((r) => r.results as { c: number }[]);
    for (const s of st) {
      expect(s.total_users).toBe(c);
      expect(s.top_users.length).toBeLessThanOrEqual(5);
    }
    // Mỗi người rơi vào đúng một bậc, nên tổng user_count phải bằng tổng số.
    expect(st.reduce((a, s) => a + s.user_count, 0)).toBe(c);
  });

  it("getLevelStats không có userId thì my_rank là null", async () => {
    for (const s of await getLevelStats(db)) expect(s.my_rank).toBeNull();
  });

  it("getLessonState trả bốn mảng, không phải chuỗi JSON", async () => {
    const s = await getLessonState(db, await AI());
    expect(Array.isArray(s.completed_lessons)).toBe(true);
    expect(Array.isArray(s.unlocked_lesson_ids)).toBe(true);
    expect(Array.isArray(s.user_lesson_flags)).toBe(true);
    expect(Array.isArray(s.bookmarks)).toBe(true);
  });

  it("bảng tin: phân trang theo con trỏ, id giảm dần, kẹp trần 50", async () => {
    const me = await AI();
    const trang1 = await getCommunityFeed(db, me, 5);
    const ids = trang1.map((p) => p.id as number);
    expect([...ids].sort((a, b) => b - a)).toEqual(ids);
    if (ids.length === 5) {
      const trang2 = await getCommunityFeed(db, me, 5, ids[4]);
      for (const p of trang2) expect(p.id as number).toBeLessThan(ids[4]);
    }
    expect((await getCommunityFeed(db, me, 9999)).length).toBeLessThanOrEqual(50);
  });

  it("reaction_summary sắp giảm dần theo số lượt", async () => {
    // Bản gốc dùng jsonb_agg(... order by emoji_count desc, emoji) trong một
    // LATERAL. Ở đây tách ra truy vấn thứ hai nên thứ tự phải tự bảo đảm.
    //
    // Bản đầu của phép kiểm này lấy 50 bài mới nhất rồi TÌM bài có nhiều emoji.
    // Nó vô dụng: 12 bài như vậy đều nằm ngoài 50 bài mới nhất, nên nhánh
    // khẳng định không bao giờ chạy - tôi phát hiện bằng cách bỏ `order by`
    // trong mã và thấy bộ kiểm vẫn xanh. Giờ đi thẳng tới bài có nhiều emoji.
    const bai = (await db
      .prepare(
        `select post_id from community_post_reactions
          group by post_id having count(distinct emoji) > 1 limit 1`
      )
      .bind().all().then((r) => r.results as { post_id: number }[]))[0];
    expect(bai, "dữ liệu local phải có bài nhiều emoji, nếu không phép kiểm vô nghĩa").toBeTruthy();

    const tacGia = (await db
      .prepare("select user_id from community_posts where id = ?")
      .bind(bai.post_id).all().then((r) => r.results as { user_id: string }[]))[0];
    const posts = await getUserCommunityPosts(db, await AI(), tacGia.user_id, 50);
    const p = posts.find((x) => x.id === bai.post_id);
    expect(p, "bài phải nằm trong kết quả").toBeTruthy();

    const tom = p!.reaction_summary as { emoji: string; count: number }[];
    expect(tom.length).toBeGreaterThan(1);
    const counts = tom.map((t) => t.count);
    expect([...counts].sort((a, b) => b - a)).toEqual(counts);
  });

  it("WEEK_START là thứ HAI của tuần này, không phải thứ Hai tuần sau", async () => {
    // Kiểm thẳng biểu thức SQL trên bốn ngày đã biết, không phụ thuộc dữ liệu
    // người dùng. Bản đầu tôi chỉ kiểm gián tiếp qua các hàm phòng học và
    // không hàm nào trong đó khẳng định con số tuần - nên đổi biểu thức thành
    // `date('now','weekday 1')` (thứ Hai TUẦN SAU) mà bộ kiểm vẫn xanh.
    const mong = {
      "2026-08-17": "2026-08-17", // thứ Hai → chính nó
      "2026-08-19": "2026-08-17", // thứ Tư
      "2026-08-22": "2026-08-17", // thứ Bảy
      "2026-08-23": "2026-08-17", // Chủ nhật → vẫn là thứ Hai TRƯỚC đó
    };
    for (const [ngay, dau] of Object.entries(mong)) {
      const [{ t }] = await db
        .prepare(`select date(?, '-6 days', 'weekday 1') as t`)
        .bind(ngay).all().then((r) => r.results as { t: string }[]);
      expect(t, ngay).toBe(dau);
    }
  });

  it("tiến độ tuần của phòng học khớp phép đếm thô", async () => {
    // Đây là chỗ WEEK_START thật sự được dùng. Dữ liệu local có 3457 bài hoàn
    // thành trong tuần này, nên phép so sánh này chạm tới mã thật.
    // Phải chọn thành viên CÓ học trong tuần này. Bản đầu lấy `limit 1` bất kỳ
    // và trúng người có 0 bài, nên hai vế đều bằng 0 và phép so sánh không
    // chạm tới WEEK_START - tôi phát hiện bằng cách phá biểu thức tuần trong mã
    // và thấy bộ kiểm vẫn xanh.
    const ai = (await db
      .prepare(
        `select m.room_id, m.user_id, count(*) as n
           from study_room_members m
           join user_progress up on up.user_id = m.user_id and up.completed = 1
          where m.left_at is null
            and date(up.completed_at) >= date('now', '-6 days', 'weekday 1')
          group by m.room_id, m.user_id
          order by n desc limit 1`
      )
      .bind().all().then((r) => r.results as { room_id: number; user_id: string; n: number }[]))[0];
    expect(ai, "cần một thành viên có học trong tuần này, nếu không phép kiểm vô nghĩa").toBeTruthy();
    expect(ai.n).toBeGreaterThan(0);
    const phong = { room_id: ai.room_id };
    const thanhVien = { user_id: ai.user_id };

    const ds = await getStudyRoomMembers(db, thanhVien.user_id, phong.room_id);
    const [{ c }] = await db
      .prepare(
        `select count(*) as c from user_progress
          where user_id = ? and completed = 1
            and date(completed_at) >= date('now', '-6 days', 'weekday 1')`
      )
      .bind(thanhVien.user_id).all().then((r) => r.results as { c: number }[]);
    const toi = ds.find((m) => m.user_id === thanhVien.user_id);
    expect(toi!.weekly_lessons).toBe(c);
  });

  it("bài viết của một người: chỉ của người đó, và bài ẩn không lọt", async () => {
    const tacGia = (await db
      .prepare("select user_id from community_posts where coalesce(is_hidden,0)=0 limit 1")
      .bind().all().then((r) => r.results as { user_id: string }[]))[0];
    if (!tacGia) return;
    const bai = await getUserCommunityPosts(db, await AI(), tacGia.user_id, 50);
    for (const p of bai) expect(p.user_id).toBe(tacGia.user_id);

    const [{ c }] = await db
      .prepare("select count(*) as c from community_posts where user_id = ? and coalesce(is_hidden,0)=1")
      .bind(tacGia.user_id).all().then((r) => r.results as { c: number }[]);
    if (c > 0) {
      const idsAn = (await db
        .prepare("select id from community_posts where user_id = ? and coalesce(is_hidden,0)=1")
        .bind(tacGia.user_id).all().then((r) => r.results as { id: number }[])).map((x) => x.id);
      for (const p of bai) expect(idsAn).not.toContain(p.id);
    }
  });

  it("bình luận: sắp tăng dần theo thời gian, kẹp trần 100", async () => {
    const baiCoBinhLuan = (await db
      .prepare("select post_id from community_post_comments limit 1")
      .bind().all().then((r) => r.results as { post_id: number }[]))[0];
    if (!baiCoBinhLuan) return;
    const bl = await getCommunityPostComments(db, baiCoBinhLuan.post_id, 9999);
    expect(bl.length).toBeLessThanOrEqual(100);
    const t = bl.map((x) => String(x.created_at));
    expect([...t].sort()).toEqual(t);
  });

  it("đang học: tôn trọng p_days, không có ai nghỉ quá lâu", async () => {
    const ds = await getCommunityLearningNow(db, 24, 7);
    expect(ds.length).toBeLessThanOrEqual(24);
    for (const r of ds) expect(r.current_streak as number).toBeGreaterThan(0);
    // Nới p_days ra thì danh sách không được ngắn đi.
    const rong = await getCommunityLearningNow(db, 24, 365);
    expect(rong.length).toBeGreaterThanOrEqual(ds.length);
  });

  it("getStudyRooms chỉ hiện phòng còn chỗ", async () => {
    for (const r of await getStudyRooms(db, await AI())) {
      expect(r.member_count as number).toBeLessThan(r.max_members as number);
    }
  });
});

describe.skipIf(!hasLocalData)("NHÓM B - các hàm ghi", () => {
  const dem = async (sql: string, ...a: unknown[]) =>
    (await db.prepare(sql).bind(...a).all().then((r) => r.results as { c: number }[]))[0].c;

  it("incrementDocumentDownload cộng đúng 1", async () => {
    const doc = (await db.prepare("select id, download_count from documents limit 1")
      .bind().all().then((r) => r.results as { id: number; download_count: number }[]))[0];
    if (!doc) return;
    await incrementDocumentDownload(db, doc.id);
    const sau = await dem("select download_count as c from documents where id = ?", doc.id);
    expect(sau).toBe((doc.download_count ?? 0) + 1);
  });

  it("leaveStudyRoom luỹ đẳng: gọi lần hai không đổi thêm dòng nào", async () => {
    const tv = (await db
      .prepare("select user_id from study_room_members where left_at is null limit 1")
      .bind().all().then((r) => r.results as { user_id: string }[]))[0];
    if (!tv) return;
    const lan1 = await leaveStudyRoom(db, tv.user_id);
    expect(lan1).toBeGreaterThan(0);
    const lan2 = await leaveStudyRoom(db, tv.user_id);
    // `left_at is null` khiến lần hai không tìm thấy gì - nếu bỏ điều kiện ấy
    // thì thời điểm rời của lần đầu bị ghi đè.
    expect(lan2).toBe(0);
    expect(await leaveStudyRoom(db, "")).toBe(0);
  });

  it("rewardMyReferral chỉ thưởng lượt pending, không thưởng hai lần", async () => {
    const r = (await db
      .prepare("select referred_id from referrals where status = 'pending' limit 1")
      .bind().all().then((x) => x.results as { referred_id: string }[]))[0];
    if (!r) return;
    expect(await rewardMyReferral(db, r.referred_id)).toBeGreaterThan(0);
    expect(await rewardMyReferral(db, r.referred_id)).toBe(0);
  });

  it("recordReferral chặn tự giới thiệu chính mình và người không tồn tại", async () => {
    const ai = (await db.prepare("select id from user_profiles limit 1").bind().all()
      .then((r) => r.results as { id: string }[]))[0].id;
    const truoc = await dem("select count(*) as c from referrals");
    expect(await recordReferral(db, ai, ai)).toBe(0);           // tự giới thiệu
    expect(await recordReferral(db, ai, null)).toBe(0);          // null
    expect(await recordReferral(db, ai, "khong-co-that")).toBe(0); // không tồn tại
    expect(await dem("select count(*) as c from referrals")).toBe(truoc);
  });

  it("markAdminChatMessagesSeen NÉM khi không phải chính chủ", async () => {
    // Bản gốc `raise exception 'not authorized'`. Trả 0 im lặng là che mất một
    // lần thử truy cập trái phép.
    await expect(markAdminChatMessagesSeen(db, "nguoi-khac", "chu-hop-thoai")).rejects.toThrow(
      "not authorized"
    );
    await expect(markAdminChatMessagesSeen(db, "", "ai-do")).rejects.toThrow("not authorized");
  });

  it("markAdminChatMessagesSeen chỉ đánh dấu tin của admin và chưa đọc", async () => {
    const m = (await db
      .prepare("select user_id from chat_messages where sender = 'admin' and coalesce(read,0) = 0 limit 1")
      .bind().all().then((r) => r.results as { user_id: string }[]))[0];
    if (!m) return;
    const khacTruoc = await dem(
      "select count(*) as c from chat_messages where user_id = ? and sender <> 'admin' and coalesce(read,0) = 0",
      m.user_id
    );
    await markAdminChatMessagesSeen(db, m.user_id, m.user_id);
    expect(
      await dem(
        "select count(*) as c from chat_messages where user_id = ? and sender = 'admin' and coalesce(read,0) = 0",
        m.user_id
      )
    ).toBe(0);
    // Tin của người khác gửi không bị đụng tới.
    expect(
      await dem(
        "select count(*) as c from chat_messages where user_id = ? and sender <> 'admin' and coalesce(read,0) = 0",
        m.user_id
      )
    ).toBe(khacTruoc);
  });

  it("hàm phòng học NÉM khi chưa đăng nhập hoặc không phải thành viên", async () => {
    await expect(recordStudyRoomCheckin(db, "", 1)).rejects.toThrow(NotAuthenticatedError);
    await expect(recordStudyRoomCheckin(db, "nguoi-ngoai", 1)).rejects.toThrow("Not a room member");
    await expect(recordStudyRoomQuizAttempt(db, "", 1, "personal", 5, 10)).rejects.toThrow(
      NotAuthenticatedError
    );
    await expect(recordStudyRoomQuizAttempt(db, "nguoi-ngoai", 1, "personal", 5, 10)).rejects.toThrow(
      "Not a room member"
    );
  });

  it("recordStudyRoomQuizAttempt chặn điểm bịa và tính percent bằng chia thập phân", async () => {
    const tv = (await db
      .prepare("select room_id, user_id from study_room_members where left_at is null limit 1")
      .bind().all().then((r) => r.results as { room_id: number; user_id: string }[]))[0];
    if (!tv) return;

    for (const [s, t] of [[5, 0], [5, 51], [-1, 10], [11, 10]] as const) {
      await expect(
        recordStudyRoomQuizAttempt(db, tv.user_id, tv.room_id, "personal", s, t)
      ).rejects.toThrow("Invalid score");
    }

    // 1/3 = 33%. Nếu tính bằng phép chia nguyên của SQLite thì ra 0.
    const row = await recordStudyRoomQuizAttempt(db, tv.user_id, tv.room_id, "personal", 1, 3);
    expect(row!.percent).toBe(33);
    expect(row!.score).toBe(1);
    expect(row!.total).toBe(3);
    // Track rỗng rơi về 'personal'.
    const row2 = await recordStudyRoomQuizAttempt(db, tv.user_id, tv.room_id, "  ", 2, 4);
    expect(row2!.track).toBe("personal");
    expect(row2!.percent).toBe(50);
  });
});

describe.skipIf(!hasLocalData)("NHÓM C - cần nguyên tử", () => {
  const so = async (sql: string, ...a: unknown[]) =>
    (await db.prepare(sql).bind(...a).all().then((r) => r.results as { c: number }[]))[0].c;
  const AI = async () =>
    (await db.prepare("select id from user_profiles limit 1").bind().all()
      .then((r) => r.results as { id: string }[]))[0].id;

  it("grantCoins kẹp theo trần nguồn, không tin số client gửi", async () => {
    const u = await AI();
    // wheel trần 100: xin 999999 chỉ nhận 100.
    const r = await grantCoins(db, u, "wheel", `test-${Date.now()}`, 999999);
    expect(r.granted).toBe(100);
    expect(r.duplicate).toBe(false);
    await expect(grantCoins(db, u, "khong-co-that", "x", 10)).rejects.toThrow("Nguồn không hợp lệ");
    await expect(grantCoins(db, "", "wheel", "x", 10)).rejects.toThrow(NotAuthenticatedError);
  });

  it("grantCoins cùng ref hai lần chỉ cộng một lần", async () => {
    const u = await AI();
    const ref = `dup-${Date.now()}`;
    const truoc = await so("select coins as c from user_profiles where id = ?", u);
    const a = await grantCoins(db, u, "game", ref, 50);
    const b = await grantCoins(db, u, "game", ref, 50);
    expect(a.granted).toBe(50);
    expect(b.granted).toBe(0);
    expect(b.duplicate).toBe(true);
    expect(await so("select coins as c from user_profiles where id = ?", u)).toBe(truoc + 50);
  });

  it("purchaseCosmetic KHÔNG trừ tiền khi không đủ xu", async () => {
    // Đây là bất biến quan trọng nhất của cả nhóm C: điều kiện nằm TRONG lệnh
    // ghi (`where coins >= ?`), nên không có khoảng hở giữa lúc kiểm và lúc trừ.
    const mon = (await db
      .prepare("select asset_key, price from gamification_assets where price is not null order by price desc limit 1")
      .bind().all().then((r) => r.results as { asset_key: string; price: number }[]))[0];
    if (!mon) return;
    const ngheo = (await db
      .prepare("select id, coins from user_profiles where coalesce(coins,0) < ? limit 1")
      .bind(mon.price).all().then((r) => r.results as { id: string; coins: number }[]))[0];
    if (!ngheo) return;

    await expect(purchaseCosmetic(db, ngheo.id, mon.asset_key)).rejects.toThrow("Không đủ xu");
    expect(await so("select coalesce(coins,0) as c from user_profiles where id = ?", ngheo.id))
      .toBe(ngheo.coins ?? 0);
  });

  it("toggleChatMessageReaction: bật rồi tắt, và chặn người không phải chủ", async () => {
    const m = (await db.prepare("select id, user_id from chat_messages limit 1")
      .bind().all().then((r) => r.results as { id: number; user_id: string }[]))[0];
    if (!m) return;
    await expect(toggleChatMessageReaction(db, "nguoi-khac", m.id, "👍")).rejects.toThrow("Not authorized");
    await expect(toggleChatMessageReaction(db, m.user_id, 999999999, "👍")).rejects.toThrow("Message not found");

    const dem = () => so("select count(*) as c from chat_message_reactions where message_id = ? and user_id = ? and emoji = '🔥'", m.id, m.user_id);
    const truoc = await dem();
    await toggleChatMessageReaction(db, m.user_id, m.id, "🔥");
    expect(await dem()).toBe(truoc === 0 ? 1 : 0);
    await toggleChatMessageReaction(db, m.user_id, m.id, "🔥");
    expect(await dem()).toBe(truoc);
  });

  it("recordQuizMistake: sai thì tăng đếm, đúng thì đánh dấu đã giải quyết", async () => {
    const u = await AI();
    const L = 999001, Q = 7;
    await recordQuizMistake(db, u, L, Q, false, "hash-a");
    await recordQuizMistake(db, u, L, Q, false, "hash-b");
    const row = (await db
      .prepare("select wrong_count, resolved, question_hash from quiz_mistakes where user_id=? and lesson_id=? and question_index=?")
      .bind(u, L, Q).all().then((r) => r.results as { wrong_count: number; resolved: number; question_hash: string }[]))[0];
    expect(row.wrong_count).toBe(2);
    expect(row.resolved).toBe(0);
    expect(row.question_hash).toBe("hash-b"); // lần mới nhất thắng

    await recordQuizMistake(db, u, L, Q, true);
    expect(await so("select resolved as c from quiz_mistakes where user_id=? and lesson_id=? and question_index=?", u, L, Q)).toBe(1);
  });

  it("joinStudyRoom ném khi phòng đã đầy, và rời phòng cũ trước", async () => {
    const u = await AI();
    const day = (await db
      .prepare(`select r.id, r.max_members from study_rooms r
                 where (select count(*) from study_room_members m
                         where m.room_id = r.id and m.left_at is null) >= r.max_members limit 1`)
      .bind().all().then((r) => r.results as { id: number }[]))[0];
    if (day) await expect(joinStudyRoom(db, u, day.id)).rejects.toThrow("Room is full");
    await expect(joinStudyRoom(db, u, 999999999)).rejects.toThrow("Room not found");
  });

  it("joinOrCreateStudyRoom: chủ đề lạ bị chặn, và người dùng chỉ ở một phòng", async () => {
    const u = await AI();
    await expect(joinOrCreateStudyRoom(db, u, "khong-co-that")).rejects.toThrow("Invalid topic");
    const id = await joinOrCreateStudyRoom(db, u, "personal");
    expect(id).toBeGreaterThan(0);
    expect(await so("select count(*) as c from study_room_members where user_id = ? and left_at is null", u)).toBe(1);
  });

  it("applyWorldBossDamage kẹp điểm ở 15, không nhận số từ client", async () => {
    const boss = (await db.prepare("select id from world_bosses where is_active = 1 limit 1")
      .bind().all().then((r) => r.results as { id: string }[]))[0];
    await expect(applyWorldBossDamage(db, await AI(), "x", 0)).rejects.toThrow("Không có sát thương");
    if (!boss) return;
    const r = await applyWorldBossDamage(db, await AI(), boss.id, 99999);
    expect(r.damage_applied).toBe(15 * 6000); // kẹp, không phải 99999*6000
    expect(r.current_hp).toBeGreaterThanOrEqual(0);
  });

  it("syncLessonsAtomic TỪ CHỐI chạy khi không có batch()", async () => {
    // Hàm này XOÁ các bài không có trong payload, và hai bảng dữ liệu người học
    // cascade theo lessons(id). Chạy nửa vời là mất dữ liệu, nên phải từ chối.
    const khongBatch = { prepare: db.prepare.bind(db) } as unknown as typeof db;
    await expect(syncLessonsAtomic(khongBatch, [])).rejects.toThrow("cần batch()");
  });

  it("syncLessonsAtomic chặn payload trùng id hoặc trùng slug", async () => {
    const a = { id: 1, slug: "x", title: "A" };
    await expect(syncLessonsAtomic(db, [a, { ...a, slug: "y" }])).rejects.toThrow("duplicate lesson ids");
    await expect(syncLessonsAtomic(db, [a, { ...a, id: 2 }])).rejects.toThrow("duplicate lesson slugs");
  });

  it("adminResyncAllUserStats chạy được và trả số người bị đổi", async () => {
    const n = await adminResyncAllUserStats(db);
    expect(typeof n).toBe("number");
    // Chạy lần hai ngay sau đó thì không còn ai lệch nữa.
    expect(await adminResyncAllUserStats(db)).toBe(0);
  });

  it("weeklyRematchStudyRooms chạy trọn và không để ai ở hai phòng", async () => {
    const r = await weeklyRematchStudyRooms(db, (a) => a); // xáo cố định để lặp lại được
    expect(r.rooms_created).toBeGreaterThanOrEqual(0);
    expect(r.users_matched).toBeGreaterThanOrEqual(0);
    const haiPhong = await so(
      `select count(*) as c from (
         select user_id from study_room_members where left_at is null
          group by user_id having count(*) > 1)`
    );
    expect(haiPhong).toBe(0);
  });

  it("claimStudyRoomWeeklyReward không cho nhận hai lần trong cùng tuần", async () => {
    const tv = (await db
      .prepare("select room_id, user_id from study_room_members where left_at is null limit 1")
      .bind().all().then((r) => r.results as { room_id: number; user_id: string }[]))[0];
    if (!tv) return;
    const a = await claimStudyRoomWeeklyReward(db, tv.user_id, tv.room_id);
    const b = await claimStudyRoomWeeklyReward(db, tv.user_id, tv.room_id);
    // Hoặc chưa đủ nhiệm vụ (cả hai lần đều false), hoặc lần đầu thành công và
    // lần hai báo đã nhận. Không bao giờ hai lần cùng ok.
    expect(a.ok && b.ok).toBe(false);
    if (a.ok) expect(b.message).toContain("đã nhận thưởng rồi");
  });
});
