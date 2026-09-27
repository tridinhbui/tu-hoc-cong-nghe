import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const fetchMock = vi.fn();
beforeEach(() => { fetchMock.mockReset(); vi.stubGlobal("fetch", fetchMock); });
afterEach(() => vi.unstubAllGlobals());

async function fresh() {
  vi.resetModules();
  return (await import("@/lib/cloudflare")).createClient();
}

describe("client D1 phía trình duyệt", () => {
  it("gửi đúng bảng và đúng chuỗi thao tác theo thứ tự đã viết", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ data: [{ id: 1 }], error: null, count: null })));
    const c = await fresh();
    const r = await c.from("lesson_notes").select("id, content").eq("user_id", "u1").order("id", { ascending: false }).limit(5);
    expect(r.data).toEqual([{ id: 1 }]);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/db");
    expect(JSON.parse(init.body)).toEqual({
      table: "lesson_notes",
      ops: [["select", "id, content"], ["eq", "user_id", "u1"], ["order", "id", { ascending: false }], ["limit", 5]],
    });
  });

  it("KHÔNG còn trả rỗng giả - lỗi máy chủ đi ra thành { error }", async () => {
    // Đây là toàn bộ lý do bản này tồn tại: stub cũ trả { data: [], error:
    // null } cho mọi thứ, nên một ứng dụng không có dữ liệu trông y hệt một
    // ứng dụng chạy đúng.
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ data: null, error: { message: "bị chặn" }, count: null }), { status: 403 }));
    const c = await fresh();
    const r = await c.from("user_profiles").update({ coins: 9 }).eq("id", "u1");
    expect(r.error?.message).toBe("bị chặn");
  });

  it("mạng hỏng thì trả lỗi, không ném và không giả vờ thành công", async () => {
    fetchMock.mockRejectedValue(new Error("offline"));
    const c = await fresh();
    const r = await c.from("x").select("*");
    expect(r.data).toBeNull();
    expect(r.error?.message).toBe("offline");
  });

  it("một truy vấn chỉ gửi đúng một lần dù được await nhiều lần", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ data: [], error: null })));
    const c = await fresh();
    const q = c.from("x").select("*");
    await q; await q;
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("rpc gửi tới /api/db/rpc với tên và tham số", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ data: 3, error: null })));
    const c = await fresh();
    const r = await c.rpc("get_total_user_count");
    expect(r.data).toBe(3);
    expect(fetchMock.mock.calls[0][0]).toBe("/api/db/rpc");
  });

  it("storage cũ ném lỗi chỉ đường thay vì trả rỗng", async () => {
    const c = await fresh();
    expect(() => c.storage.from("avatars")).toThrow(/api\/uploads/);
  });
});
