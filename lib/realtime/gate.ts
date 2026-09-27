import { verifySession, SESSION_COOKIE_NAME } from "../auth/session";
import { isValidHubName } from "./watched";

/**
 * Cổng của `/realtime/*`: kiểm Origin, tên hub, phiên đăng nhập, rồi mới nối
 * vào Durable Object. Tách khỏi worker.ts để kiểm được bằng vitest - worker.ts
 * import worker do OpenNext sinh ra lúc build, thứ không có trong bộ kiểm.
 */

type DurableObjectNamespaceLike = {
  idFromName(name: string): unknown;
  get(id: unknown): { fetch(req: Request): Promise<Response> };
};

export type RealtimeEnv = {
  DB: Parameters<typeof verifySession>[0];
  REALTIME?: DurableObjectNamespaceLike;
};

export async function handleRealtime(request: Request, env: RealtimeEnv, url: URL): Promise<Response> {
  if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket", { status: 426 });
  }

  // CHẶN CROSS-SITE WEBSOCKET HIJACKING. Trình duyệt gửi cookie phiên kèm lời
  // nâng cấp WebSocket từ BẤT KỲ trang nào, và WebSocket không chịu CORS. Không
  // có dòng này thì một trang lạ mà người dùng tình cờ mở sẽ nối được vào phòng
  // học của họ, dưới danh nghĩa họ: đọc được ai đang online, phát được tin nhắn.
  // Origin là thứ trình duyệt tự đặt và trang web không sửa được.
  const origin = request.headers.get("Origin");
  if (!origin || !sameHost(origin, url.host)) {
    return new Response("Forbidden origin", { status: 403 });
  }

  let name: string;
  try {
    name = decodeURIComponent(url.pathname.slice("/realtime/".length));
  } catch {
    return new Response("Not found", { status: 404 });
  }
  if (!isValidHubName(name)) return new Response("Not found", { status: 404 });

  const token = readCookie(request.headers.get("Cookie"), SESSION_COOKIE_NAME);
  const session = await verifySession(env.DB, token);
  if (!session) return new Response("Unauthenticated", { status: 401 });

  if (!env.REALTIME) return new Response("Realtime not configured", { status: 503 });
  const stub = env.REALTIME.get(env.REALTIME.idFromName(name));

  // Dựng request MỚI thay vì chuyển tiếp request gốc. Như vậy danh tính là thứ
  // ta vừa xác thực chứ không phải header nào client tự gửi, và đường dẫn luôn
  // là /connect - một request từ trình duyệt không bao giờ tới được /publish.
  const self = url.searchParams.get("self") === "1" ? "?self=1" : "";
  return stub.fetch(
    new Request(`https://realtime-hub/connect${self}`, {
      headers: { Upgrade: "websocket", "X-Realtime-User": session.userId },
    })
  );
}

function sameHost(origin: string, host: string): boolean {
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    if (part.slice(0, i).trim() === name) {
      const v = part.slice(i + 1).trim();
      try {
        return decodeURIComponent(v);
      } catch {
        return v;
      }
    }
  }
  return null;
}
