import { describe, expect, it, vi } from "vitest";

vi.mock("../auth/session", () => ({
  SESSION_COOKIE_NAME: "thcn_session",
  verifySession: vi.fn(async (_db: unknown, token: string | null) => (token === "tok-alice" ? { userId: "alice" } : null)),
}));

const { handleRealtime, readCookie } = await import("../realtime/gate");

function env() {
  const forwarded: Request[] = [];
  return {
    forwarded,
    env: {
      DB: {},
      REALTIME: {
        idFromName: (n: string) => n,
        get: () => ({ fetch: async (r: Request) => { forwarded.push(r); return new Response("ok"); } }),
      },
    } as never,
  };
}

function req(path: string, headers: Record<string, string>) {
  const url = new URL(`https://app.example${path}`);
  return { url, request: new Request(url, { headers }) };
}

const OK = { Upgrade: "websocket", Origin: "https://app.example", Cookie: "thcn_session=tok-alice" };

describe("cổng /realtime/*", () => {
  it("nối được khi đủ điều kiện, và danh tính là người đã xác thực", async () => {
    const e = env();
    const { url, request } = req("/realtime/topic:lobby", OK);
    const res = await handleRealtime(request, e.env, url);
    expect(res.status).toBe(200);
    expect(e.forwarded[0].headers.get("X-Realtime-User")).toBe("alice");
  });

  it("chặn Cross-Site WebSocket Hijacking: Origin khác bị từ chối dù cookie hợp lệ", async () => {
    // Trình duyệt gửi cookie kèm lời nâng cấp WebSocket từ BẤT KỲ trang nào,
    // và WebSocket không chịu CORS. Cookie hợp lệ không chứng minh được gì ở đây.
    const e = env();
    const { url, request } = req("/realtime/topic:lobby", { ...OK, Origin: "https://evil.example" });
    expect((await handleRealtime(request, e.env, url)).status).toBe(403);
    expect(e.forwarded).toHaveLength(0);
  });

  it("thiếu Origin cũng bị từ chối", async () => {
    const e = env();
    const { Origin: _o, ...noOrigin } = OK;
    const { url, request } = req("/realtime/topic:lobby", noOrigin);
    expect((await handleRealtime(request, e.env, url)).status).toBe(403);
  });

  it("không có phiên thì 401", async () => {
    const e = env();
    const { url, request } = req("/realtime/topic:lobby", { ...OK, Cookie: "thcn_session=gia" });
    expect((await handleRealtime(request, e.env, url)).status).toBe(401);
    expect(e.forwarded).toHaveLength(0);
  });

  it("header X-Realtime-User client tự gửi bị bỏ qua", async () => {
    const e = env();
    const { url, request } = req("/realtime/topic:lobby", { ...OK, "X-Realtime-User": "bob" });
    await handleRealtime(request, e.env, url);
    expect(e.forwarded[0].headers.get("X-Realtime-User")).toBe("alice");
  });

  it("trình duyệt không bao giờ chạm được /publish", async () => {
    const e = env();
    const { url, request } = req("/realtime/table:chat_messages", OK);
    await handleRealtime(request, e.env, url);
    expect(new URL(e.forwarded[0].url).pathname).toBe("/connect");
  });

  it("tên hub lạ bị từ chối - không dựng được Durable Object tuỳ ý", async () => {
    const e = env();
    for (const p of ["/realtime/table:auth_sessions", "/realtime/whatever", "/realtime/%E0%A4%A"]) {
      const { url, request } = req(p, OK);
      expect((await handleRealtime(request, e.env, url)).status).toBe(404);
    }
    expect(e.forwarded).toHaveLength(0);
  });

  it("không phải WebSocket thì 426", async () => {
    const e = env();
    const { Upgrade: _u, ...plain } = OK;
    const { url, request } = req("/realtime/topic:lobby", plain);
    expect((await handleRealtime(request, e.env, url)).status).toBe(426);
  });
});

describe("readCookie", () => {
  it("đọc đúng cookie, không nhầm tiền tố", () => {
    expect(readCookie("a=1; thcn_session=xyz; b=2", "thcn_session")).toBe("xyz");
    expect(readCookie("thcn_session_old=bad", "thcn_session")).toBeNull();
    expect(readCookie(null, "thcn_session")).toBeNull();
  });
});
