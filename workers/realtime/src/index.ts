export { TopicRoom } from "./topic-room";

export interface Env {
  TOPIC_ROOM: DurableObjectNamespace;
}

/**
 * Worker RIÊNG cho realtime, tách khỏi ứng dụng Next.js chính.
 *
 * VÌ SAO TÁCH RA. `.open-next/worker.js` là tệp opennextjs-cloudflare SINH
 * LẠI mỗi lần `npm run cf:build`, không có chỗ nào để chèn thêm một class
 * Durable Object tuỳ biến vào cùng bundle mà build sau không ghi đè mất. Một
 * worker nhỏ, tự tay viết, tách biệt hoàn toàn là cách không phải đấu tranh
 * với công cụ build của người khác.
 *
 * HAI ĐƯỜNG VÀO. Trình duyệt nối WebSocket thẳng vào domain worker này
 * (/ws?topic=...) - không đi qua app chính, nên app chính không cần proxy
 * từng khung tin. Mã phía máy chủ của app chính gọi sang đây qua SERVICE
 * BINDING (khai "services" trong wrangler.jsonc gốc, trỏ vào "thcn-realtime")
 * để publish sau khi ghi D1 - xem lib/realtime/server.ts.
 *
 * ĐỊNH DANH TOPIC quyết định phòng nào: mỗi topic là MỘT instance Durable
 * Object riêng (`idFromName(topic)`), nên "chat_messages:u1" và
 * "chat_messages:u2" không bao giờ nhìn thấy tin của nhau - đúng cách
 * `uniqueRealtimeTopic()` phía Supabase cũ tách kênh theo id.
 */
export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic");
    if (!topic) return new Response("Thiếu tham số topic.", { status: 400 });

    const id = env.TOPIC_ROOM.idFromName(topic);
    const stub = env.TOPIC_ROOM.get(id);

    if (url.pathname === "/publish") return stub.fetch(req);
    if (url.pathname === "/ws") return stub.fetch(req);
    return new Response("Không tìm thấy.", { status: 404 });
  },
};
