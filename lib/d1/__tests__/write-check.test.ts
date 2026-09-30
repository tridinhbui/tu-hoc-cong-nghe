import { describe, expect, it } from "vitest";
import { readFileSync, copyFileSync, mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { DatabaseSync } from "node:sqlite";
import {
  createD1Client,
  D1PolicyError,
  type ColumnTypes,
  type PolicyRegistry,
  type ManualPredicates,
} from "../query-builder";
import { localD1Path } from "./d1-shim";

/**
 * WITH CHECK: điều kiện quyền phải đúng trên HÀNG MỚI, không chỉ hàng cũ.
 *
 * Bộ dựng truy vấn từng đẩy vị từ của bảng "manual" vào WHERE cho mọi loại
 * lệnh. INSERT không có WHERE, nên điều kiện bị bỏ qua hoàn toàn - đo trên SQL
 * thật: gửi được tin nhắn riêng dưới tên người khác vào cuộc trò chuyện của
 * người khác, đăng bài dưới tên người khác, tự tạo đơn khiếu nại "đã duyệt".
 * UPDATE chỉ kiểm hàng cũ, nên sửa bài của mình rồi chuyển nó sang tên người
 * khác là qua.
 *
 * Mọi phép thử ở đây chạy SQL THẬT trên một bản sao D1 ghi được, và khẳng định
 * CẢ HAI thứ: lỗi trả về, và hàng thật trong bảng. Báo lỗi mà vẫn ghi thì vẫn
 * là rò - chỉ nhìn `error` là không đủ.
 */

// DB test dựng từ migration + dữ liệu giả (fixture-db.ts): luôn có.
const hasLocalData = true;

const snap = JSON.parse(readFileSync("scripts/d1/schema-snapshot.json", "utf8"));
const T = (snap.tables ?? snap) as Record<string, { columns: { name: string; format: string }[] }>;
const types: ColumnTypes = Object.fromEntries(
  Object.entries(T).map(([t, d]) => [t, Object.fromEntries(d.columns.map((c) => [c.name, c.format]))])
);
const registry: PolicyRegistry = JSON.parse(readFileSync("scripts/d1/policy-registry.json", "utf8"));
const predicates: ManualPredicates = JSON.parse(readFileSync("scripts/d1/manual-predicates.json", "utf8"));

const ALICE = "aaaaaaaa-0000-0000-0000-00000000000a";
const BOB = "bbbbbbbb-0000-0000-0000-00000000000b";
const CAROL = "cccccccc-0000-0000-0000-00000000000c";

/** Bản sao ghi được, gieo sẵn: tình bạn A-B và B-C, bài đăng của A, phòng có A. */
function world() {
  const file = join(mkdtempSync(join(tmpdir(), "d1-wc-")), "db.sqlite");
  copyFileSync(localD1Path(), file);
  const raw = new DatabaseSync(file);
  // node:sqlite BẬT khoá ngoại mặc định (khác sqlite3 CLI), nên người dùng giả
  // phải có thật trong user_profiles trước khi xuất hiện ở bảng nào khác.
  raw.exec(`
    INSERT INTO user_profiles (id, email) VALUES
      ('${ALICE}', 'alice@test.invalid'), ('${BOB}', 'bob@test.invalid'), ('${CAROL}', 'carol@test.invalid');
    INSERT INTO user_friendships (id, user_a, user_b, requested_by, status) VALUES
      (900001, '${ALICE}', '${BOB}', '${ALICE}', 'accepted'),
      (900002, '${BOB}', '${CAROL}', '${BOB}', 'accepted');
    INSERT INTO community_posts (id, user_id, kind, content) VALUES (900101, '${ALICE}', 'manual', 'bài của alice');
  `);
  const d1 = {
    prepare(sql: string) {
      return {
        bind(...args: unknown[]) {
          return { async all() { return { results: raw.prepare(sql).all(...(args as never[])) }; } };
        },
      };
    },
  };
  const as = (actor: string) => createD1Client(d1 as never, types, registry, actor, predicates);
  const count = (sql: string) => (raw.prepare(sql).all()[0] as { n: number }).n;
  return { as, count };
}

describe.skipIf(!hasLocalData)("WITH CHECK trên INSERT", () => {
  it("tin nhắn riêng: gửi đúng tên mình trong tình bạn của mình thì được", async () => {
    const w = world();
    const r = await w.as(ALICE).from("direct_messages").insert({ sender_id: ALICE, friendship_id: 900001, content: "chào bob" });
    expect(r.error).toBeNull();
    expect(w.count(`SELECT COUNT(*) n FROM direct_messages WHERE friendship_id = 900001`)).toBe(1);
  });

  it("tin nhắn riêng: KHÔNG gửi được dưới tên người khác", async () => {
    const w = world();
    const r = await w.as(ALICE).from("direct_messages").insert({ sender_id: BOB, friendship_id: 900001, content: "giả danh bob" });
    expect(r.error).toBeInstanceOf(D1PolicyError);
    expect(w.count(`SELECT COUNT(*) n FROM direct_messages WHERE friendship_id = 900001`)).toBe(0);
  });

  it("tin nhắn riêng: KHÔNG chen được vào cuộc trò chuyện của người khác", async () => {
    const w = world();
    const r = await w.as(ALICE).from("direct_messages").insert({ sender_id: ALICE, friendship_id: 900002, content: "xen vào" });
    expect(r.error).toBeInstanceOf(D1PolicyError);
    expect(w.count(`SELECT COUNT(*) n FROM direct_messages WHERE friendship_id = 900002`)).toBe(0);
  });

  it("bài cộng đồng: KHÔNG đăng được dưới tên người khác", async () => {
    const w = world();
    const r = await w.as(ALICE).from("community_posts").insert({ user_id: BOB, kind: "manual", content: "bài của bob?" });
    expect(r.error).toBeInstanceOf(D1PolicyError);
    expect(w.count(`SELECT COUNT(*) n FROM community_posts WHERE user_id = '${BOB}'`)).toBe(0);
  });

  it("đơn khiếu nại: KHÔNG tự tạo được đơn đã duyệt sẵn", async () => {
    const w = world();
    const r = await w.as(ALICE).from("lesson_completion_appeals").insert({ user_id: ALICE, lesson_id: 1, lesson_slug: "x", status: "approved" });
    expect(r.error).toBeInstanceOf(D1PolicyError);
    expect(w.count(`SELECT COUNT(*) n FROM lesson_completion_appeals WHERE user_id = '${ALICE}'`)).toBe(0);
  });

  it("đơn khiếu nại: bỏ trống status thì dùng mặc định THẬT của bảng và qua", async () => {
    // Hai lệnh chèn thật trong repo dựa vào mặc định 'pending'. Không đọc mặc
    // định từ bảng thì cột thiếu thành NULL, vị từ không qua, và đơn hợp lệ bị từ chối.
    const w = world();
    const r = await w.as(ALICE).from("lesson_completion_appeals").insert({ user_id: ALICE, lesson_id: 1, lesson_slug: "x" });
    expect(r.error).toBeNull();
    expect(w.count(`SELECT COUNT(*) n FROM lesson_completion_appeals WHERE user_id = '${ALICE}' AND status = 'pending'`)).toBe(1);
  });

  it("chèn nhiều hàng là tất-cả-hoặc-không: một hàng sai thì không hàng nào vào", async () => {
    const w = world();
    const r = await w.as(ALICE).from("direct_messages").insert([
      { sender_id: ALICE, friendship_id: 900001, content: "hợp lệ" },
      { sender_id: BOB, friendship_id: 900001, content: "giả danh" },
    ]);
    expect(r.error).toBeInstanceOf(D1PolicyError);
    expect(w.count(`SELECT COUNT(*) n FROM direct_messages WHERE friendship_id = 900001`)).toBe(0);
  });

  it("upsert vào bảng vị từ bị từ chối dưới danh nghĩa người dùng", () => {
    const w = world();
    return expect(
      w.as(ALICE).from("direct_messages").upsert({ sender_id: ALICE, friendship_id: 900001, content: "x" }, { onConflict: "id" }).run()
    ).resolves.toMatchObject({ error: expect.any(D1PolicyError) });
  });
});

describe.skipIf(!hasLocalData)("WITH CHECK trên UPDATE", () => {
  it("sửa nội dung bài của mình thì được - và không tốn lượt đọc thêm", async () => {
    const w = world();
    const r = await w.as(ALICE).from("community_posts").update({ content: "đã sửa" }).eq("id", 900101);
    expect(r.error).toBeNull();
    expect(w.count(`SELECT COUNT(*) n FROM community_posts WHERE id = 900101 AND content = 'đã sửa'`)).toBe(1);
  });

  it("KHÔNG chuyển được bài của mình sang tên người khác", async () => {
    const w = world();
    const r = await w.as(ALICE).from("community_posts").update({ user_id: BOB }).eq("id", 900101);
    expect(r.error).toBeInstanceOf(D1PolicyError);
    expect(w.count(`SELECT COUNT(*) n FROM community_posts WHERE id = 900101 AND user_id = '${ALICE}'`)).toBe(1);
  });

  it("KHÔNG sửa được bài của người khác", async () => {
    const w = world();
    const r = await w.as(BOB).from("community_posts").update({ content: "bob sửa bài alice" }).eq("id", 900101);
    expect(r.data).toEqual([]);
    expect(w.count(`SELECT COUNT(*) n FROM community_posts WHERE id = 900101 AND content = 'bài của alice'`)).toBe(1);
  });

  it("bảng owner: KHÔNG chuyển được hàng sang người khác", () => {
    const w = world();
    return expect(
      w.as(ALICE).from("lesson_notes").update({ user_id: BOB, content: "x" }).eq("id", 1).run()
    ).resolves.toMatchObject({ error: expect.any(D1PolicyError) });
  });
});

/**
 * Khung chat góp ý (chat_messages). Bảng này từng KHÔNG có chính sách nào, nên
 * lớp chính sách từ chối mọi truy vấn của người dùng - khung chat mở ra trống
 * và không gửi được tin nào, im lặng, suốt từ lúc chuyển sang D1. Chính sách
 * giờ là: đọc luồng của mình; gửi, sửa, thu hồi tin do CHÍNH MÌNH viết
 * (sender = 'user'). Tin trả lời của admin đi qua createAdminClient.
 */
describe.skipIf(!hasLocalData)("chat_messages: mỗi người một luồng", () => {
  it("gửi tin của mình thì được, và đọc lại được", async () => {
    const w = world();
    const r = await w.as(ALICE).from("chat_messages").insert({ user_id: ALICE, sender: "user", content: "chào admin" });
    expect(r.error).toBeNull();
    const { data } = await w.as(ALICE).from("chat_messages").select("*");
    expect((data as { content: string }[]).map((m) => m.content)).toEqual(["chào admin"]);
  });

  it("không đọc được luồng của người khác", async () => {
    const w = world();
    await w.as(ALICE).from("chat_messages").insert({ user_id: ALICE, sender: "user", content: "riêng tư" });
    const { data } = await w.as(BOB).from("chat_messages").select("*").eq("user_id", ALICE);
    expect(data).toEqual([]);
  });

  it("không gửi được tin vào luồng người khác", async () => {
    const w = world();
    const r = await w.as(BOB).from("chat_messages").insert({ user_id: ALICE, sender: "user", content: "giả danh" });
    expect(r.error).toBeInstanceOf(D1PolicyError);
    expect(w.count(`SELECT COUNT(*) n FROM chat_messages WHERE user_id = '${ALICE}'`)).toBe(0);
  });

  it("không tự viết được tin mang tên admin", async () => {
    const w = world();
    const r = await w.as(ALICE).from("chat_messages").insert({ user_id: ALICE, sender: "admin", content: "admin nói ok" });
    expect(r.error).toBeInstanceOf(D1PolicyError);
    expect(w.count(`SELECT COUNT(*) n FROM chat_messages WHERE user_id = '${ALICE}' AND sender = 'admin'`)).toBe(0);
  });

  it("sửa tin của mình được, nhưng không đổi được nó thành tin admin", async () => {
    const w = world();
    await w.as(ALICE).from("chat_messages").insert({ user_id: ALICE, sender: "user", content: "bản đầu" });
    const ok = await w.as(ALICE).from("chat_messages").update({ content: "bản sửa" }).eq("user_id", ALICE);
    expect(ok.error).toBeNull();
    const bad = await w.as(ALICE).from("chat_messages").update({ sender: "admin" }).eq("user_id", ALICE);
    expect(bad.error).toBeInstanceOf(D1PolicyError);
    expect(w.count(`SELECT COUNT(*) n FROM chat_messages WHERE user_id = '${ALICE}' AND sender = 'user' AND content = 'bản sửa'`)).toBe(1);
  });

  it("thu hồi được tin của mình, không xoá được tin của người khác", async () => {
    const w = world();
    await w.as(ALICE).from("chat_messages").insert({ user_id: ALICE, sender: "user", content: "a" });
    await w.as(BOB).from("chat_messages").delete().eq("user_id", ALICE);
    expect(w.count(`SELECT COUNT(*) n FROM chat_messages WHERE user_id = '${ALICE}'`)).toBe(1);
    await w.as(ALICE).from("chat_messages").delete().eq("user_id", ALICE);
    expect(w.count(`SELECT COUNT(*) n FROM chat_messages WHERE user_id = '${ALICE}'`)).toBe(0);
  });
});
