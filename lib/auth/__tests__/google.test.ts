import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { buildAuthUrl, exchangeCode } from "../google";

const CLIENT_ID = "client-cua-chung-ta.apps.googleusercontent.com";

function b64url(s: string) {
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Dựng một id_token giả. Chữ ký là rác có chủ ý: mã không kiểm chữ ký, và
 *  bài kiểm này ghi lại đúng điều đó. */
function idToken(claims: Record<string, unknown>) {
  return [b64url(JSON.stringify({ alg: "RS256" })), b64url(JSON.stringify(claims)), "chu-ky-gia"].join(".");
}

const hopLe = () => ({
  iss: "https://accounts.google.com",
  aud: CLIENT_ID,
  sub: "sub-123",
  email: "ai@example.vn",
  email_verified: true,
  exp: Math.floor(Date.now() / 1000) + 3600,
});

function mockToken(claims: Record<string, unknown>) {
  vi.stubGlobal("fetch", vi.fn(async () => new Response(
    JSON.stringify({ id_token: idToken(claims) }), { status: 200 }
  )));
}

beforeEach(() => {
  process.env.GOOGLE_CLIENT_ID = CLIENT_ID;
  process.env.GOOGLE_CLIENT_SECRET = "bi-mat";
});
afterEach(() => vi.unstubAllGlobals());

describe("dựng URL uỷ quyền", () => {
  it("có state, PKCE S256, và scope openid", async () => {
    const r = await buildAuthUrl("https://x.vn/cb");
    const u = new URL(r.url);
    expect(u.searchParams.get("code_challenge_method")).toBe("S256");
    expect(u.searchParams.get("state")).toBe(r.state);
    expect(u.searchParams.get("scope")).toContain("openid");
    expect(r.verifier.length).toBeGreaterThan(40);
  });

  it("mỗi lượt sinh state và verifier khác nhau", async () => {
    const a = await buildAuthUrl("https://x.vn/cb");
    const b = await buildAuthUrl("https://x.vn/cb");
    expect(a.state).not.toBe(b.state);
    expect(a.verifier).not.toBe(b.verifier);
  });

  it("thử thách PKCE là SHA-256 của verifier, không phải chính nó", async () => {
    // Gửi thẳng verifier làm thử thách là vô hiệu hoá toàn bộ PKCE.
    const r = await buildAuthUrl("https://x.vn/cb");
    expect(new URL(r.url).searchParams.get("code_challenge")).not.toBe(r.verifier);
  });
});

describe("kiểm id_token", () => {
  it("nhận token hợp lệ", async () => {
    mockToken(hopLe());
    const id = await exchangeCode("code", "verifier", "https://x.vn/cb");
    expect(id.sub).toBe("sub-123");
    expect(id.emailVerified).toBe(true);
  });

  it("TỪ CHỐI token phát cho ứng dụng khác", async () => {
    // Token thật, chữ ký thật của Google, nhưng aud là ứng dụng khác. Không
    // kiểm là nhận token của bất kỳ ứng dụng Google nào làm bằng chứng đăng
    // nhập vào đây - và lấy một token như vậy không khó.
    mockToken({ ...hopLe(), aud: "ung-dung-khac.apps.googleusercontent.com" });
    await expect(exchangeCode("code", "v", "https://x.vn/cb")).rejects.toThrow(/ứng dụng khác/);
  });

  it("TỪ CHỐI token không phải của Google", async () => {
    mockToken({ ...hopLe(), iss: "https://ke-gian.example" });
    await expect(exchangeCode("code", "v", "https://x.vn/cb")).rejects.toThrow(/không phải của Google/);
  });

  it("từ chối token hết hạn", async () => {
    mockToken({ ...hopLe(), exp: Math.floor(Date.now() / 1000) - 10 });
    await expect(exchangeCode("code", "v", "https://x.vn/cb")).rejects.toThrow(/hết hạn/);
  });

  it("từ chối token thiếu sub hoặc email", async () => {
    mockToken({ ...hopLe(), sub: undefined });
    await expect(exchangeCode("code", "v", "https://x.vn/cb")).rejects.toThrow(/thiếu sub/);
  });

  it("email_verified dạng chuỗi \"true\" vẫn được hiểu đúng", async () => {
    // Google trả trường này khi thì boolean khi thì chuỗi. Hiểu sai theo
    // hướng false thì người dùng không ghép được tài khoản; hiểu sai theo
    // hướng true thì mở đúng lỗ hổng chiếm tài khoản đã chặn ở service.ts.
    mockToken({ ...hopLe(), email_verified: "true" });
    expect((await exchangeCode("code", "v", "https://x.vn/cb")).emailVerified).toBe(true);
    mockToken({ ...hopLe(), email_verified: "false" });
    expect((await exchangeCode("code", "v", "https://x.vn/cb")).emailVerified).toBe(false);
    mockToken({ ...hopLe(), email_verified: undefined });
    expect((await exchangeCode("code", "v", "https://x.vn/cb")).emailVerified).toBe(false);
  });

  it("điểm cuối token trả lỗi thì không lộ chi tiết ra ngoài", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("invalid_grant: chi tiet noi bo", { status: 400 })));
    await expect(exchangeCode("code", "v", "https://x.vn/cb")).rejects.toThrow(/không thành công/);
  });
});
