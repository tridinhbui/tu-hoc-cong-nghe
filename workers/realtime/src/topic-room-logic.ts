/**
 * Logic THUẦN của TopicRoom, tách khỏi runtime Durable Object.
 *
 * VÌ SAO TÁCH RIÊNG. Lớp DO thật (topic-room.ts) gọi các API chỉ có trong
 * môi trường Workers thật: `ctx.getWebSockets()`, `ws.serializeAttachment()`,
 * WebSocket Hibernation. Không mô phỏng được rẻ trong vitest thường. Logic
 * ĐÁNG kiểm nhất - ai nhận được gói gì, presence tổng hợp ra sao khi có
 * người rời phòng - không phụ thuộc runtime nào cả, nên đặt ở đây và kiểm
 * bằng vitest thường, còn lớp DO chỉ còn việc gọi đúng các hàm này.
 */

export type Presence = Record<string, unknown>;

export interface ClientMessage {
  type: "presence" | "broadcast";
  /** Bắt buộc với "broadcast", bỏ qua với "presence". */
  event?: string;
  payload?: unknown;
}

export type ServerMessage =
  | { type: "presence_sync"; state: Record<string, Presence> }
  | { type: "broadcast"; event: string; payload: unknown; from: string };

/**
 * Trạng thái phòng: map từ id kết nối sang presence hiện tại của nó.
 *
 * Presence là OPTIONAL - một kết nối chỉ dùng cho postgres_changes (không
 * presence, không topic phòng người) sẽ không bao giờ gửi "presence", nên
 * không bao giờ xuất hiện trong `state`. Đây là lý do một lớp DO phủ được cả
 * hai kiểu dùng mà không cần cấu hình gì khác nhau.
 */
export class RoomState {
  private presence = new Map<string, Presence>();

  setPresence(connId: string, value: Presence): void {
    this.presence.set(connId, value);
  }

  removeConnection(connId: string): void {
    this.presence.delete(connId);
  }

  hasPresence(connId: string): boolean {
    return this.presence.has(connId);
  }

  /** Ảnh chụp presence, khoá bằng id KẾT NỐI. Client tự dùng payload.userId
   *  bên trong (nếu có) để nhóm nhiều kết nối cùng một người - đúng cách
   *  Supabase Presence để phần đó cho client, DO không giả định hình dạng. */
  syncMessage(): ServerMessage {
    return { type: "presence_sync", state: Object.fromEntries(this.presence) };
  }
}

/**
 * Xử lý một tin từ client, trả về (a) tin cần phát cho TẤT CẢ kết nối trong
 * phòng bao gồm cả người gửi (presence_sync luôn phát cho tất cả, để người
 * gửi cũng thấy trạng thái tổng hợp mới nhất) và (b) tin chỉ phát cho NGƯỜI
 * KHÁC (broadcast không vọng lại người gửi - đúng hành vi Supabase Realtime
 * mặc định, và tránh việc client phải tự lọc echo).
 */
export function handleClientMessage(
  room: RoomState,
  connId: string,
  raw: string
): { toAll?: ServerMessage; toOthers?: ServerMessage } | null {
  let msg: ClientMessage;
  try {
    msg = JSON.parse(raw);
  } catch {
    return null;
  }

  if (msg.type === "presence") {
    room.setPresence(connId, (msg.payload as Presence) ?? {});
    return { toAll: room.syncMessage() };
  }

  if (msg.type === "broadcast" && typeof msg.event === "string") {
    return { toOthers: { type: "broadcast", event: msg.event, payload: msg.payload, from: connId } };
  }

  return null;
}

/** Gọi khi một kết nối đóng. Chỉ phát sync lại nếu người đó THỰC SỰ có mặt
 *  trong presence - một kết nối postgres_changes đóng lại không cần làm
 *  phiền mọi người trong các phòng có presence khác đâu (nó còn chẳng ở
 *  trong RoomState nào có presence, nhưng kiểm tường minh cho rõ ý). */
export function handleDisconnect(room: RoomState, connId: string): ServerMessage | null {
  const had = room.hasPresence(connId);
  room.removeConnection(connId);
  return had ? room.syncMessage() : null;
}
