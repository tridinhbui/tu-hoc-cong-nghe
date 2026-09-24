import { describe, it, expect } from "vitest";
import { RoomState, handleClientMessage, handleDisconnect } from "../topic-room-logic";

describe("tin presence", () => {
  it("phát presence_sync cho TẤT CẢ, gồm cả người vừa gửi", () => {
    const room = new RoomState();
    const r = handleClientMessage(room, "conn1", JSON.stringify({ type: "presence", payload: { x: 1 } }));
    expect(r?.toAll?.type).toBe("presence_sync");
    expect(r?.toOthers).toBeUndefined();
  });

  it("presence_sync chứa mọi kết nối đang có mặt, khoá theo id kết nối", () => {
    const room = new RoomState();
    handleClientMessage(room, "conn1", JSON.stringify({ type: "presence", payload: { userId: "u1" } }));
    const r = handleClientMessage(room, "conn2", JSON.stringify({ type: "presence", payload: { userId: "u2" } }));
    const state = (r!.toAll as { state: Record<string, unknown> }).state;
    expect(Object.keys(state).sort()).toEqual(["conn1", "conn2"]);
  });

  it("presence mới của cùng kết nối GHI ĐÈ, không cộng dồn", () => {
    const room = new RoomState();
    handleClientMessage(room, "conn1", JSON.stringify({ type: "presence", payload: { x: 1 } }));
    const r = handleClientMessage(room, "conn1", JSON.stringify({ type: "presence", payload: { x: 2 } }));
    const state = (r!.toAll as unknown as { state: Record<string, { x: number }> }).state;
    expect(Object.keys(state)).toHaveLength(1);
    expect(state.conn1.x).toBe(2);
  });
});

describe("tin broadcast", () => {
  it("chỉ phát cho NGƯỜI KHÁC, không vọng lại người gửi", () => {
    // Đúng hành vi mặc định của Supabase Realtime - khác presence_sync ở
    // trên. Lẫn lộn hai cái này là client tự nhận lại tin mình vừa gửi.
    const room = new RoomState();
    const r = handleClientMessage(room, "conn1", JSON.stringify({ type: "broadcast", event: "move", payload: { x: 1 } }));
    expect(r?.toOthers?.type).toBe("broadcast");
    expect(r?.toAll).toBeUndefined();
  });

  it("mang theo id người gửi để client tự lọc gói của chính mình khi cần", () => {
    const room = new RoomState();
    const r = handleClientMessage(room, "conn7", JSON.stringify({ type: "broadcast", event: "say", payload: "hi" }));
    expect((r?.toOthers as { from: string }).from).toBe("conn7");
  });

  it("thiếu event thì bị bỏ qua thay vì phát một tin rỗng", () => {
    const room = new RoomState();
    const r = handleClientMessage(room, "conn1", JSON.stringify({ type: "broadcast", payload: 1 }));
    expect(r).toBeNull();
  });
});

describe("tin hỏng và loại lạ", () => {
  it("JSON hỏng trả về null, không ném lỗi", () => {
    // Một kết nối gửi rác không được làm sập cả Durable Object, ảnh hưởng
    // tới mọi người khác trong cùng phòng.
    const room = new RoomState();
    expect(handleClientMessage(room, "conn1", "{ khong phai json")).toBeNull();
  });

  it("type lạ trả về null", () => {
    const room = new RoomState();
    expect(handleClientMessage(room, "conn1", JSON.stringify({ type: "hack_the_planet" }))).toBeNull();
  });
});

describe("ngắt kết nối", () => {
  it("người có presence rời đi thì phát lại sync KHÔNG còn họ", () => {
    const room = new RoomState();
    handleClientMessage(room, "conn1", JSON.stringify({ type: "presence", payload: { userId: "u1" } }));
    const msg = handleDisconnect(room, "conn1");
    expect(msg?.type).toBe("presence_sync");
    const state = (msg as { state: Record<string, unknown> }).state;
    expect(state.conn1).toBeUndefined();
  });

  it("người CHƯA từng gửi presence rời đi thì không phát gì cả", () => {
    // Một kết nối chỉ dùng cho postgres_changes (không có presence) đóng lại
    // không cần làm phiền các phòng có presence khác - vì nó còn chẳng ở
    // trong RoomState presence nào.
    const room = new RoomState();
    expect(handleDisconnect(room, "conn-khong-ton-tai")).toBeNull();
  });

  it("rời đi hai lần không phát tin lần thứ hai", () => {
    const room = new RoomState();
    handleClientMessage(room, "conn1", JSON.stringify({ type: "presence", payload: {} }));
    handleDisconnect(room, "conn1");
    expect(handleDisconnect(room, "conn1")).toBeNull();
  });
});
