import { describe, expect, it } from "vitest";
import { HubCore, type Attachment, type HubSocket } from "../realtime/hub-core";

class FakeSocket implements HubSocket {
  sent: Record<string, unknown>[] = [];
  att: Attachment | null = null;
  send(m: string) { this.sent.push(JSON.parse(m)); }
  getAttachment() { return this.att; }
  setAttachment(a: Attachment) { this.att = a; }
  last(t: string) { return [...this.sent].reverse().find((m) => m.t === t); }
}

function hub() {
  const sockets: FakeSocket[] = [];
  const core = new HubCore({ sockets: () => sockets });
  const join = (userId: string, self = false) => {
    const s = new FakeSocket();
    sockets.push(s);
    core.connect(s, userId, self);
    return s;
  };
  const leave = (s: FakeSocket) => {
    core.close(s);
    sockets.splice(sockets.indexOf(s), 1);
  };
  return { core, join, leave };
}

describe("hub realtime: danh tính do máy chủ cấp", () => {
  it("track dưới tên người khác vẫn hiện ra là chính mình", () => {
    const { core, join } = hub();
    const a = join("alice");
    const b = join("bob");
    core.message(a, JSON.stringify({ t: "track", state: { userId: "bob", name: "Giả Bob" } }));
    const state = b.last("presence")!.state as Record<string, Array<{ userId: string }>>;
    expect(Object.keys(state)).toEqual(["alice"]);
    expect(state.alice[0].userId).toBe("alice");
  });

  it("broadcast mang userId giả bị ép về người gửi thật", () => {
    const { core, join } = hub();
    const a = join("alice");
    const b = join("bob");
    core.message(a, JSON.stringify({ t: "broadcast", event: "move", payload: { userId: "bob", x: 1 } }));
    const m = b.last("broadcast")!;
    expect((m.payload as { userId: string }).userId).toBe("alice");
    expect(m.senderId).toBe("alice");
  });

  it("client KHÔNG phát được tín hiệu thay đổi dữ liệu", () => {
    // Nếu được chuyển tiếp, một client có thể khiến mọi người khác đọc lại hàng
    // tuỳ ý nó chọn. Chỉ máy chủ, qua publish(), được làm việc đó.
    const { core, join } = hub();
    const a = join("alice");
    const b = join("bob");
    core.message(a, JSON.stringify({ t: "change", signals: [{ table: "chat_messages", event: "INSERT", id: 1 }] }));
    expect(b.last("change")).toBeUndefined();
  });
});

describe("hub realtime: broadcast", () => {
  it("mặc định không vọng lại người gửi; self=true thì có", () => {
    const { core, join } = hub();
    const quiet = join("alice");
    const echo = join("bob", true);
    core.message(quiet, JSON.stringify({ t: "broadcast", event: "say", payload: { text: "a" } }));
    core.message(echo, JSON.stringify({ t: "broadcast", event: "say", payload: { text: "b" } }));
    expect(quiet.sent.filter((m) => m.t === "broadcast").map((m) => (m.payload as { text: string }).text)).toEqual(["b"]);
    expect(echo.sent.filter((m) => m.t === "broadcast").map((m) => (m.payload as { text: string }).text)).toEqual(["a", "b"]);
  });

  it("tin quá cỡ và JSON hỏng bị bỏ qua, không làm sập hub", () => {
    const { core, join } = hub();
    const a = join("alice");
    const b = join("bob");
    core.message(a, "{hỏng");
    core.message(a, JSON.stringify({ t: "broadcast", event: "x", payload: "y".repeat(20_000) }));
    expect(b.last("broadcast")).toBeUndefined();
  });
});

describe("hub realtime: presence", () => {
  it("người rời đi biến khỏi presence của người còn lại", () => {
    const { core, join, leave } = hub();
    const a = join("alice");
    const b = join("bob");
    core.message(a, JSON.stringify({ t: "track", state: { name: "A" } }));
    core.message(b, JSON.stringify({ t: "track", state: { name: "B" } }));
    leave(a);
    expect(Object.keys(b.last("presence")!.state as object)).toEqual(["bob"]);
  });

  it("hai tab của cùng một người là hai phần tử trong cùng một khoá", () => {
    const { core, join } = hub();
    const t1 = join("alice");
    const t2 = join("alice");
    core.message(t1, JSON.stringify({ t: "track", state: { tab: 1 } }));
    core.message(t2, JSON.stringify({ t: "track", state: { tab: 2 } }));
    expect((core.presence().alice ?? []).length).toBe(2);
  });

  it("người mới vào thấy ngay ai đang ở đó", () => {
    const { core, join } = hub();
    const a = join("alice");
    core.message(a, JSON.stringify({ t: "track", state: { name: "A" } }));
    const b = join("bob");
    expect(Object.keys(b.sent[0].state as object)).toEqual(["alice"]);
  });
});

describe("hub realtime: tín hiệu từ máy chủ", () => {
  it("chuyển tiếp tín hiệu hợp lệ, loại tín hiệu sai hình dạng", () => {
    const { core, join } = hub();
    const a = join("alice");
    const n = core.publish([
      { table: "chat_messages", event: "INSERT", id: 1 },
      { table: "chat_messages", event: "DROP TABLE", id: 2 },
      { table: "chat_messages", event: "UPDATE", id: "1; --" },
    ]);
    expect(n).toBe(1);
    expect(a.last("change")!.signals).toEqual([{ table: "chat_messages", event: "INSERT", id: 1 }]);
  });
});
