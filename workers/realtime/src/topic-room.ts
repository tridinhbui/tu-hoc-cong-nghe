import { DurableObject } from "cloudflare:workers";
import { RoomState, handleClientMessage, handleDisconnect, type ServerMessage } from "./topic-room-logic";

/**
 * Một phòng thời gian thực = một chủ đề (topic). Thay `supabase.channel()`.
 *
 * MỘT LỚP PHỦ CẢ BA CÁCH DÙNG trong repo cũ:
 *  - postgres_changes (social, study-rooms, community, bugs, chat): client
 *    chỉ NHẬN, server gọi POST /publish sau khi ghi D1 thành công - xem
 *    workers/realtime/src/index.ts.
 *  - broadcast có tên sự kiện (study-world "move"/"say", lobby "move"): client
 *    gửi {type:"broadcast", event, payload}, mọi người khác trong topic nhận.
 *  - presence (lobby, study-world): client gửi {type:"presence", payload},
 *    cả phòng nhận lại ảnh chụp presence tổng hợp.
 *
 * HIBERNATION API. `ctx.acceptWebSocket()` thay vì giữ closure JS cho mỗi kết
 * nối - DO có thể ngủ giữa các tin nhắn mà không tốn phí duy trì instance,
 * và Cloudflare chỉ tính phí lúc thật sự xử lý. Trạng thái mỗi kết nối (id)
 * gắn qua `serializeAttachment`, sống sót qua việc DO ngủ/thức.
 */
export class TopicRoom extends DurableObject {
  #room = new RoomState();

  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);

    // Publish từ SERVER, không qua WebSocket - dùng khi mã ứng dụng (route
    // handler, sau một lượt ghi D1) cần đẩy một sự kiện vào topic mà không tự
    // mở kết nối. Đây là đường thay postgres_changes.
    if (url.pathname === "/publish" && req.method === "POST") {
      const body = (await req.json()) as { event: string; payload: unknown };
      this.#broadcast({ type: "broadcast", event: body.event, payload: body.payload, from: "server" });
      return new Response(null, { status: 204 });
    }

    if (req.headers.get("Upgrade") !== "websocket") {
      return new Response("Cần nâng cấp WebSocket.", { status: 426 });
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair) as [WebSocket, WebSocket];
    // Nâng lên hibernatable NGAY tại đây - accept() thường sẽ giữ kết nối
    // "nóng" và không cho DO ngủ.
    this.ctx.acceptWebSocket(server);
    server.serializeAttachment({ id: crypto.randomUUID() });

    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws: WebSocket, raw: string | ArrayBuffer): Promise<void> {
    if (typeof raw !== "string") return; // Chỉ nhận văn bản JSON.
    const connId = this.#connId(ws);
    const result = handleClientMessage(this.#room, connId, raw);
    if (!result) return;
    if (result.toAll) this.#broadcast(result.toAll);
    if (result.toOthers) this.#broadcast(result.toOthers, ws);
  }

  async webSocketClose(ws: WebSocket): Promise<void> {
    const connId = this.#connId(ws);
    const msg = handleDisconnect(this.#room, connId);
    if (msg) this.#broadcast(msg, ws);
  }

  async webSocketError(ws: WebSocket): Promise<void> {
    await this.webSocketClose(ws);
  }

  #connId(ws: WebSocket): string {
    return (ws.deserializeAttachment() as { id: string } | null)?.id ?? "?";
  }

  /** Gửi cho mọi kết nối đang mở, trừ `except` nếu có. Kết nối đã đóng bị bỏ
   *  qua thay vì ném lỗi - đây là chuyện bình thường trong hibernation, không
   *  phải sự cố. */
  #broadcast(msg: ServerMessage, except?: WebSocket): void {
    const body = JSON.stringify(msg);
    for (const ws of this.ctx.getWebSockets()) {
      if (ws === except) continue;
      try {
        ws.send(body);
      } catch {
        // Kết nối vừa chết giữa lúc liệt kê và lúc gửi - bỏ qua, webSocketClose
        // sẽ tự dọn presence của nó khi Cloudflare báo đóng.
      }
    }
  }
}
