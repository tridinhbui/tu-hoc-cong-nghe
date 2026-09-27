// @ts-ignore - module của runtime Workers. Không kéo kiểu của nó vào tsconfig
// chung: nạp @cloudflare/workers-types toàn cục sẽ đè kiểu DOM (Response,
// WebSocket, Request) cho TOÀN BỘ ứng dụng Next. Tệp này chỉ worker.ts nạp.
import { DurableObject } from "cloudflare:workers";
import { HubCore, type Attachment, type HubSocket } from "./hub-core";

/**
 * Durable Object cho realtime: một thực thể cho mỗi tên hub (xem
 * hubNameForTable / hubNameForTopic trong watched.ts).
 *
 * Mọi quyết định nằm trong HubCore; tệp này chỉ là vỏ nối runtime vào đó, để
 * phần đáng kiểm nhất kiểm được bằng vitest.
 *
 * Dùng WebSocket Hibernation API (`ctx.acceptWebSocket`) chứ không phải
 * `ws.accept()`: một phòng học có người ngồi yên cả tiếng mà không ai nói gì,
 * và với hibernation thì đối tượng được ngủ trong lúc đó thay vì bị tính giờ.
 * Presence sống trong attachment của từng kết nối nên sống sót qua giấc ngủ.
 */

declare const WebSocketPair: new () => { 0: WebSocket; 1: WebSocket };
declare const WebSocketRequestResponsePair: new (request: string, response: string) => unknown;

type HibernatingSocket = WebSocket & {
  serializeAttachment(value: unknown): void;
  deserializeAttachment(): unknown;
};

type Ctx = {
  acceptWebSocket(ws: WebSocket): void;
  getWebSockets(): WebSocket[];
  setWebSocketAutoResponse(pair: unknown): void;
};

export class RealtimeHub extends DurableObject {
  constructor(ctx: unknown, env: unknown) {
    super(ctx, env);
    // Nhịp tim "ping" -> "pong" được runtime trả lời thẳng mà KHÔNG đánh thức
    // đối tượng. Không có dòng này thì mỗi client giữ kết nối sẽ đánh thức hub
    // 25 giây một lần, và hibernation chẳng tiết kiệm được gì.
    (ctx as Ctx).setWebSocketAutoResponse(new WebSocketRequestResponsePair("ping", "pong"));
  }

  // Cùng một WebSocket phải luôn ra cùng một HubSocket trong một lần thức,
  // vì HubCore so sánh bằng `===` để loại kết nối đang đóng khỏi presence.
  private adapters = new WeakMap<WebSocket, HubSocket>();

  private get ctxRt(): Ctx {
    return (this as unknown as { ctx: Ctx }).ctx;
  }

  private adapt(ws: WebSocket): HubSocket {
    let a = this.adapters.get(ws);
    if (!a) {
      const h = ws as HibernatingSocket;
      a = {
        send: (m) => h.send(m),
        getAttachment: () => (h.deserializeAttachment() as Attachment | null) ?? null,
        setAttachment: (v) => h.serializeAttachment(v),
      };
      this.adapters.set(ws, a);
    }
    return a;
  }

  private core() {
    return new HubCore({
      // Chỉ kết nối còn mở. Kết nối đang đóng vẫn có thể còn trong danh sách
      // trong lúc chạy webSocketClose.
      sockets: () =>
        this.ctxRt
          .getWebSockets()
          .filter((ws) => ws.readyState === 1)
          .map((ws) => this.adapt(ws)),
    });
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // Chỉ máy chủ gọi được nhánh này, qua binding. Worker không bao giờ định
    // tuyến request của trình duyệt tới /publish - nó dựng một URL mới trỏ vào
    // /connect cho mọi kết nối từ ngoài vào.
    if (url.pathname === "/publish" && request.method === "POST") {
      const body = await request.json().catch(() => null);
      const n = this.core().publish(body);
      return new Response(JSON.stringify({ delivered: n }), { status: 200 });
    }

    if (url.pathname === "/connect") {
      if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
        return new Response("Expected WebSocket", { status: 426 });
      }
      const userId = request.headers.get("X-Realtime-User");
      if (!userId) return new Response("Unauthenticated", { status: 401 });

      const pair = new WebSocketPair();
      const client = pair[0];
      const server = pair[1];
      this.ctxRt.acceptWebSocket(server);
      this.core().connect(this.adapt(server), userId, url.searchParams.get("self") === "1");
      return new Response(null, { status: 101, webSocket: client } as ResponseInit);
    }

    return new Response("Not found", { status: 404 });
  }

  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
    this.core().message(this.adapt(ws), message);
  }

  async webSocketClose(ws: WebSocket, code: number, reason: string) {
    try {
      ws.close(code, reason);
    } catch {
      // đã đóng
    }
    this.core().close(this.adapt(ws));
  }

  async webSocketError(ws: WebSocket) {
    this.core().close(this.adapt(ws));
  }
}
