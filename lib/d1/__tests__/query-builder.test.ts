import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import {
  createD1Client, D1QueryError, D1PolicyError,
  type ColumnTypes, type PolicyRegistry, type ManualPredicates,
} from "../query-builder";
import { openLocalD1 } from "./d1-shim";

// Kiểu cột lấy từ bản chụp lược đồ thật, không khai tay: khai tay thì bộ kiểm
// và mã chạy thật có thể lệch nhau mà vẫn xanh.
const snap = JSON.parse(readFileSync("scripts/d1/schema-snapshot.json", "utf8"));
const types: ColumnTypes = Object.fromEntries(
  Object.entries(snap.tables as Record<string, { columns: { name: string; format: string }[] }>).map(
    ([t, d]) => [t, Object.fromEntries(d.columns.map((c) => [c.name, c.format]))]
  )
);

const registry: PolicyRegistry = JSON.parse(readFileSync("scripts/d1/policy-registry.json", "utf8"));
const predicates: ManualPredicates = JSON.parse(readFileSync("scripts/d1/manual-predicates.json", "utf8"));

const hasLocalData = existsSync(".wrangler/state/v3/d1/miniflare-D1DatabaseObject");

// Người dùng THẬT lấy từ dữ liệu đã nạp, không phải một uuid bịa.
//
// Với chính sách đã bật, mọi truy vấn vào bảng "owner" đều bị lọc theo người
// gọi - nên một uuid bịa trả về 0 hàng ở mọi phép thử, và bộ kiểm sẽ xanh vì
// lý do sai: nó khẳng định "đọc được dữ liệu" trong khi thật ra không đọc gì.
// Chọn người có NHIỀU tiến độ nhất để các phép thử phân trang có đủ hàng.
const ACTOR = hasLocalData
  ? (openLocalD1() as never as {
      prepare(s: string): { bind(): { all(): Promise<{ results: Record<string, unknown>[] }> } };
    }) && await (async () => {
      const { DatabaseSync } = await import("node:sqlite");
      const { readdirSync } = await import("node:fs");
      const { join } = await import("node:path");
      const dir = join(process.cwd(), ".wrangler/state/v3/d1/miniflare-D1DatabaseObject");
      const f = readdirSync(dir).find((x) => x.endsWith(".sqlite") && x !== "metadata.sqlite")!;
      const db = new DatabaseSync(join(dir, f), { readOnly: true });
      const row = db.prepare(
        "SELECT user_id, COUNT(*) n FROM user_progress GROUP BY user_id ORDER BY n DESC LIMIT 1"
      ).all()[0] as { user_id: string };
      return row.user_id;
    })()
  : "00000000-0000-0000-0000-000000000001";

// Người dùng KHÔNG tồn tại, để kiểm rằng bộ lọc chủ sở hữu thật sự chặn.
const STRANGER = "00000000-0000-0000-0000-0000000000ff";

describe("bộ dựng truy vấn D1", () => {
  it("từ chối cú pháp nhúng quan hệ thay vì trả thiếu cột", () => {
    const c = createD1Client({} as never, types, registry, ACTOR, predicates);
    // `select("*, user:user_id(*)")` là cách supabase-js nối bảng. D1 không nối
    // được, và im lặng bỏ qua phần nhúng sẽ trả về hàng thiếu trường - thứ chỉ
    // lộ ra ở chỗ hiển thị, cách xa nguyên nhân.
    expect(() => c.from("user_progress").select("*, user_profiles(*)")).toThrow(D1QueryError);
  });

  it("chặn update không có WHERE", () => {
    const c = createD1Client({} as never, types, registry, ACTOR, predicates);
    // Supabase CHO PHÉP update toàn bảng, nên một `.eq()` viết thiếu ở đó là
    // ghi đè mọi hàng mà không có gì báo. Ở đây nó là lỗi ngay lập tức.
    return expect(c.from("user_progress").update({ completed: true }).run()).resolves.toMatchObject({
      error: expect.any(D1QueryError),
    });
  });

  it("chặn delete không có WHERE", () =>
    expect(createD1Client({} as never, types, registry, ACTOR, predicates).from("user_progress").delete().run()).resolves.toMatchObject({
      error: expect.any(D1QueryError),
    }));

  it("upsert thiếu onConflict là lỗi, không phải insert lặng lẽ", () => {
    const c = createD1Client({} as never, types, registry, ACTOR, predicates);
    expect(() => c.from("user_progress").upsert({ user_id: "x", lesson_id: 1 })).toThrow(D1QueryError);
  });

  it("bảng gõ nhầm bị bắt ngay", () => {
    const c = createD1Client({} as never, types, registry, ACTOR, predicates);
    expect(() => c.from("user_progres")).toThrow(D1QueryError);
  });

  it("in([]) trả mảng rỗng chứ không phải lỗi cú pháp SQL", async () => {
    if (!hasLocalData) return;
    const c = createD1Client(openLocalD1(), types, registry, ACTOR, predicates);
    const { data, error } = await c.from("user_progress").select("*").in("lesson_id", []);
    expect(error).toBeNull();
    expect(data).toEqual([]);
  });
});

describe.skipIf(!hasLocalData)("chạy trên dữ liệu thật trong D1 local", () => {
  const c = (actor: string | null = ACTOR) => createD1Client(openLocalD1(), types, registry, actor);

  it("select + eq + order + limit trả đúng hàng", async () => {
    const { data, error } = await c()
      .from("user_progress").select("*").eq("completed", true).order("id").limit(5);
    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
    expect((data as unknown[]).length).toBe(5);
  });

  it("boolean đọc ra thành true/false, không phải 1/0", async () => {
    // Đây là chỗ dễ sai nhất và im lặng nhất: SQLite lưu 0/1, mà trong JS số 0
    // là falsy còn chuỗi "0" thì TRUTHY. Đọc nhầm một lần là đảo hết logic ở
    // mọi chỗ kiểm `if (row.completed)`.
    const { data } = await c().from("user_progress").select("*").eq("completed", true).limit(1);
    expect((data as Record<string, unknown>[])[0].completed).toBe(true);
  });

  it("eq trên cột boolean khớp được hàng", async () => {
    // `.eq("completed", true)` phải thành `= 1`. Không đổi thì SQLite so 'true'
    // với 1, không khớp hàng nào, và trả mảng rỗng mà không báo lỗi gì.
    const { data } = await c().from("user_progress").select("*").eq("completed", true).limit(1);
    expect((data as unknown[]).length).toBe(1);
  });

  it("jsonb đọc ra thành object, không phải chuỗi", async () => {
    const { data } = await c().from("user_profiles").select("*").limit(1);
    const row = (data as Record<string, unknown>[])[0];
    expect(typeof row.tour_flags).toBe("object");
  });

  it("single() trên đúng một hàng", async () => {
    const { data } = await c().from("user_profiles").select("*").limit(1);
    const id = (data as Record<string, unknown>[])[0].id as string;
    const { data: one, error } = await c().from("user_profiles").select("*").eq("id", id).single();
    expect(error).toBeNull();
    expect((one as Record<string, unknown>).id).toBe(id);
  });

  it("maybeSingle() trả null khi không có hàng nào", async () => {
    const { data, error } = await c()
      .from("user_profiles").select("*").eq("id", "khong-ton-tai").maybeSingle();
    expect(error).toBeNull();
    expect(data).toBeNull();
  });

  it("single() báo lỗi khi có nhiều hơn một hàng", async () => {
    const { error } = await c().from("user_progress").select("*").single();
    expect(error).toBeInstanceOf(D1QueryError);
  });

  it("range() phân trang không trùng không lọt", async () => {
    const a = await c().from("user_progress").select("id").order("id").range(0, 4);
    const b = await c().from("user_progress").select("id").order("id").range(5, 9);
    const ids = [...(a.data as { id: number }[]), ...(b.data as { id: number }[])].map((r) => r.id);
    expect(new Set(ids).size).toBe(10);
    expect([...ids].sort((x, y) => x - y)).toEqual(ids);
  });
});

describe("chính sách truy cập - thứ thay cho RLS", () => {
  const c = (actor: string | null = ACTOR) =>
    createD1Client(openLocalD1() as never, types, registry, actor, predicates);

  it("bảng owner tự lọc theo người gọi, dù truy vấn không nêu điều kiện nào", async () => {
    if (!hasLocalData) return;
    // Đây là toàn bộ lý do bảng tra cứu tồn tại. Trên Postgres, truy vấn này
    // trả đúng dữ liệu của người gọi vì RLS lọc ở tầng cơ sở dữ liệu. Trên D1
    // không có gì lọc, nên cùng câu lệnh ấy sẽ trả dữ liệu của MỌI NGƯỜI.
    // Người gọi CÓ dữ liệu thì đọc được dữ liệu của chính mình...
    const mine = await c().from("user_progress").select("*");
    expect(mine.error).toBeNull();
    expect((mine.data as unknown[]).length).toBeGreaterThan(0);

    // ...và người lạ đọc được 0 hàng, chứ KHÔNG phải 27.412 hàng của mọi người.
    // Đây là toàn bộ lý do bảng tra cứu tồn tại: trên Postgres câu lệnh này an
    // toàn nhờ RLS lọc trong cơ sở dữ liệu; trên D1 không có gì lọc.
    const theirs = await c(STRANGER).from("user_progress").select("*");
    expect(theirs.data).toEqual([]);
  });

  it("bảng owner từ chối khi chạy không có người dùng", () => {
    expect(() => c(null).from("user_progress").select("*").run()).rejects;
    return expect(c(null).from("user_progress").select("*").run()).resolves.toMatchObject({
      error: expect.any(D1PolicyError),
    });
  });

  it("insert bị ÉP cột chủ sở hữu, không chỉ bị lọc", async () => {
    if (!hasLocalData) return;
    // WHERE không chặn được INSERT. Nếu chỉ lọc mà không ép, một chỗ gọi truyền
    // user_id của người khác - vô tình hoặc cố ý - sẽ ghi được vào tên họ.
    const b = c().from("user_progress").insert({ user_id: "nguoi-khac", lesson_id: 1 });
    const sql = (b as unknown as { build(): { args: unknown[] } }).build();
    expect(sql.args).toContain(ACTOR);
    expect(sql.args).not.toContain("nguoi-khac");
  });

  it("bảng manual CÓ vị từ thì được ép tự động, không cần khai gì", async () => {
    if (!hasLocalData) return;
    // 22/30 bảng manual có điều kiện dịch thẳng được sang SQLite. Chúng chạy
    // được ngay, và điều kiện quyền vẫn được áp - đây là khác biệt lớn nhất so
    // với bản trước, nơi cả 30 bảng đều đòi khai tay.
    const { error } = await c().from("study_room_messages").select("*").limit(1);
    expect(error).toBeNull();
  });

  it("vị từ manual thật sự lọc, không phải cho qua", async () => {
    if (!hasLocalData) return;
    // Người lạ không ở phòng nào thì không đọc được tin nhắn phòng nào.
    const { data } = await c(STRANGER).from("study_room_messages").select("*").limit(5);
    expect(data).toEqual([]);
  });

  it("bảng manual KHÔNG có vị từ vẫn bị từ chối", () => {
    // Tám bảng thật sự không có chính sách RLS nào trong migration. Mặc định an
    // toàn là từ chối: bỏ sót thì hỏng tính năng và thấy ngay, cho qua thì lộ
    // dữ liệu và không ai thấy.
    return expect(c().from("chat_messages").select("*").run()).resolves.toMatchObject({
      error: expect.any(D1PolicyError),
    });
  });

  it("lời khai suông không được chấp nhận", () => {
    expect(() => c().from("chat_messages").select("*").unsafeManualPolicy("ok")).toThrow(D1PolicyError);
  });

  it("bảng không vị từ chạy được sau khi khai đầy đủ lý do", async () => {
    if (!hasLocalData) return;
    const { error } = await c()
      .from("chat_messages")
      .select("*")
      .unsafeManualPolicy("Route quản trị, đã kiểm getAdminSession() trước khi gọi tới đây")
      .limit(1);
    expect(error).toBeNull();
  });

  it("bảng công khai đọc được mà không cần người dùng", async () => {
    if (!hasLocalData) return;
    const { data, error } = await c(null).from("lessons").select("*").limit(3);
    expect(error).toBeNull();
    expect((data as unknown[]).length).toBeGreaterThan(0);
  });

  it("bảng có trong lược đồ mà thiếu trong bảng tra cứu thì bị từ chối", () => {
    // Xảy ra khi thêm bảng mới mà quên chạy lại generate-policies.mjs. Cho qua
    // ở đây nghĩa là mọi bảng mới đều mở toang.
    const partial = { lessons: registry.lessons } as PolicyRegistry;
    const client = createD1Client(openLocalD1() as never, types, partial, ACTOR, predicates);
    expect(() => client.from("user_progress")).toThrow(D1PolicyError);
  });
});
