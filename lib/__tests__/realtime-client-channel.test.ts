// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CloudflareRealtimeChannel } from "../realtime/client-channel";

/** WebSocket giả: mở ngay, ghi lại tin đã gửi, cho bộ kiểm đẩy tin vào. */
class FakeWS {
  static all: FakeWS[] = [];
  readyState = 0;
  sent: string[] = [];
  onopen: (() => void) | null = null;
  onmessage: ((e: { data: string }) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(readonly url: string) {
    FakeWS.all.push(this);
    queueMicrotask(() => { this.readyState = 1; this.onopen?.(); });
  }
  send(m: string) { this.sent.push(m); }
  close() { this.readyState = 3; }
  push(msg: unknown) { this.onmessage?.({ data: JSON.stringify(msg) }); }
}

beforeEach(() => {
  FakeWS.all = [];
  vi.stubGlobal("WebSocket", FakeWS);
});
afterEach(() => vi.unstubAllGlobals());

const flush = () => new Promise((r) => setTimeout(r, 0));
const sig = (table: string, event: string, id: number | null) => ({ t: "change", signals: [{ table, event, id }] });

describe("kênh realtime phía trình duyệt", () => {
  it(".on() sau subscribe() KHÔNG ném - lỗi cũ từng làm sập mọi trang có chuông", async () => {
    const ch = new CloudflareRealtimeChannel("x", {}, async () => null);
    ch.subscribe();
    expect(() => ch.on("postgres_changes", { event: "INSERT", table: "chat_messages" }, () => {})).not.toThrow();
  });

  it("đọc lại hàng qua lớp có gác quyền; không được đọc thì handler không chạy", async () => {
    const fetchRow = vi.fn(async (_t: string, id: number) => (id === 1 ? { id: 1, user_id: "me" } : null));
    const got: unknown[] = [];
    const ch = new CloudflareRealtimeChannel("x", {}, fetchRow);
    ch.on("postgres_changes", { event: "INSERT", table: "direct_messages" }, (p: { new: unknown }) => got.push(p.new)).subscribe();
    await flush();
    const ws = FakeWS.all.find((w) => w.url.includes("table%3Adirect_messages"))!;
    ws.push(sig("direct_messages", "INSERT", 1));
    ws.push(sig("direct_messages", "INSERT", 2)); // tin nhắn của người khác: policy trả null
    await flush();
    expect(fetchRow).toHaveBeenCalledTimes(2);
    expect(got).toEqual([{ id: 1, user_id: "me" }]);
  });

  it("áp filter cột=eq.giá_trị sau khi đọc lại", async () => {
    const got: unknown[] = [];
    const ch = new CloudflareRealtimeChannel("x", {}, async (_t, id) => ({ id, room_id: id === 1 ? 5 : 6 }));
    ch.on("postgres_changes", { event: "*", table: "study_room_messages", filter: "room_id=eq.5" }, (p: { new: { id: number } }) => got.push(p.new.id)).subscribe();
    await flush();
    const ws = FakeWS.all[0];
    ws.push(sig("study_room_messages", "INSERT", 1));
    ws.push(sig("study_room_messages", "INSERT", 2));
    await flush();
    expect(got).toEqual([1]);
  });

  it("id null: chỉ handler không nhận tham số được gọi", async () => {
    // Handler đọc payload.new mà nhận đối tượng rỗng sẽ chèn một tin nhắn trống
    // vào danh sách - hỏng mà trông như chạy được.
    const refetch = vi.fn();
    const needsRow = vi.fn((_p: unknown) => {});
    const ch = new CloudflareRealtimeChannel("x", {}, async () => ({ id: 1 }));
    ch.on("postgres_changes", { event: "UPDATE", table: "study_room_members" }, () => refetch())
      .on("postgres_changes", { event: "UPDATE", table: "study_room_members" }, needsRow)
      .subscribe();
    await flush();
    FakeWS.all[0].push(sig("study_room_members", "UPDATE", null));
    await flush();
    expect(refetch).toHaveBeenCalledOnce();
    expect(needsRow).not.toHaveBeenCalled();
  });

  it("DELETE chỉ mang old.id, không đọc lại", async () => {
    const fetchRow = vi.fn();
    const got: unknown[] = [];
    const ch = new CloudflareRealtimeChannel("x", {}, fetchRow);
    ch.on("postgres_changes", { event: "DELETE", table: "chat_messages" }, (p: { old: unknown }) => got.push(p.old)).subscribe();
    await flush();
    FakeWS.all[0].push(sig("chat_messages", "DELETE", 7));
    await flush();
    expect(fetchRow).not.toHaveBeenCalled();
    expect(got).toEqual([{ id: 7 }]);
  });

  it("presence: track gửi đi, sync nhận về, và khai lại sau khi nối lại", async () => {
    const syncs = vi.fn();
    const ch = new CloudflareRealtimeChannel("lobby", {}, async () => null);
    ch.on("presence", { event: "sync" }, syncs).subscribe();
    await flush();
    await ch.track({ name: "A" });
    const ws = FakeWS.all[0];
    expect(ws.url).toContain("topic%3Alobby");
    expect(JSON.parse(ws.sent.at(-1)!)).toEqual({ t: "track", state: { name: "A" } });
    ws.push({ t: "presence", state: { me: [{ name: "A" }] } });
    expect(syncs).toHaveBeenCalled();
    expect(ch.presenceState()).toEqual({ me: [{ name: "A" }] });
  });

  it("unsubscribe đóng mọi kết nối", async () => {
    const ch = new CloudflareRealtimeChannel("x", {}, async () => null);
    ch.on("postgres_changes", { table: "chat_messages" }, () => {}).on("presence", { event: "sync" }, () => {}).subscribe();
    await flush();
    await ch.unsubscribe();
    expect(FakeWS.all.every((w) => w.readyState === 3)).toBe(true);
  });
});
