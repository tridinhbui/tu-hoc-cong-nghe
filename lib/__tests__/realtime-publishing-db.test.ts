import { describe, expect, it, vi } from "vitest";
import { withRealtimePublishing } from "../realtime/publishing-db";
import type { ChangeSignal } from "../realtime/watched";

/** D1 giả: ghi lại câu đã chạy, trả kết quả theo kịch bản. */
function fakeDb(result: unknown = { results: [{ id: 9 }], meta: { changes: 1 } }, fail = false) {
  const ran: string[] = [];
  const mk = (sql: string, args: unknown[] = []) => ({
    sql,
    args,
    bind: (...a: unknown[]) => mk(sql, a),
    run: async () => { if (fail) throw new Error("D1 hỏng"); ran.push(sql); return result; },
    all: async () => { if (fail) throw new Error("D1 hỏng"); ran.push(sql); return result; },
    first: async () => { ran.push(sql); return (result as { results?: unknown[] })?.results?.[0] ?? null; },
  });
  const db = {
    ran,
    prepare: (sql: string) => mk(sql),
    batch: vi.fn(async (stmts: Array<{ sql: string }>) => {
      // D1 thật từ chối câu lệnh không phải của nó - kiểm đúng điều đó.
      for (const s of stmts) if (!("sql" in s)) throw new Error("không phải câu lệnh D1 thật");
      return stmts.map(() => result);
    }),
  };
  return db;
}

describe("vỏ bọc D1 phát tín hiệu realtime", () => {
  it("câu không ghi vào bảng được theo dõi trả về ĐÚNG đối tượng gốc", () => {
    const db = fakeDb();
    const wrapped = withRealtimePublishing(db, () => {});
    const plain = db.prepare("select 1");
    const viaWrap = wrapped.prepare("select * from auth_sessions");
    // Cùng hình dạng, không có Proxy nào chen vào: lớp auth không trả giá gì.
    expect(Object.getPrototypeOf(viaWrap)).toBe(Object.getPrototypeOf(plain));
    expect(typeof (viaWrap as { sql: string }).sql).toBe("string");
  });

  it("phát tín hiệu SAU khi ghi thành công", async () => {
    const db = fakeDb();
    const got: ChangeSignal[][] = [];
    const wrapped = withRealtimePublishing(db, (s) => got.push(s));
    await wrapped.prepare("insert into chat_messages (a) values (?) returning *").bind(1).all();
    expect(db.ran).toHaveLength(1);
    expect(got).toEqual([[{ table: "chat_messages", event: "INSERT", id: 9 }]]);
  });

  it("ghi hỏng thì không phát gì, và lỗi D1 vẫn nổi lên nguyên vẹn", async () => {
    const publish = vi.fn();
    const wrapped = withRealtimePublishing(fakeDb(undefined, true), publish);
    await expect(wrapped.prepare("update chat_messages set x = 1 where id = 1").run()).rejects.toThrow("D1 hỏng");
    expect(publish).not.toHaveBeenCalled();
  });

  it("publish ném lỗi KHÔNG làm hỏng lệnh ghi", async () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    const wrapped = withRealtimePublishing(fakeDb(), () => {
      throw new Error("hub sập");
    });
    const r = await wrapped.prepare("delete from chat_messages where id = ? returning *").bind(9).all();
    expect(r).toEqual({ results: [{ id: 9 }], meta: { changes: 1 } });
    err.mockRestore();
  });

  it("batch() đưa câu lệnh THẬT cho D1 rồi mới phát", async () => {
    const db = fakeDb({ results: [], meta: { changes: 1, last_row_id: 5 } });
    const got: ChangeSignal[][] = [];
    const wrapped = withRealtimePublishing(db, (s) => got.push(s));
    await wrapped.batch!([
      wrapped.prepare("insert into study_room_members (room_id) values (?)").bind(1),
      wrapped.prepare("select 1"),
    ] as never);
    expect(db.batch).toHaveBeenCalledOnce();
    expect(got).toEqual([[{ table: "study_room_members", event: "INSERT", id: 5 }]]);
  });

  it("UPDATE khớp 0 hàng không đánh thức ai", async () => {
    const publish = vi.fn();
    const wrapped = withRealtimePublishing(fakeDb({ results: [], meta: { changes: 0 } }), publish);
    await wrapped.prepare("update chat_messages set read = 1 where user_id = ?").bind("u").run();
    expect(publish).not.toHaveBeenCalled();
  });
});
