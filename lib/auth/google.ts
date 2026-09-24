import "server-only";
import { AuthError } from "./service";

/**
 * Luồng mã uỷ quyền của Google, phần Supabase Auth vẫn làm thay.
 *
 * DÙNG PKCE dù đây là client có bí mật. PKCE gắn lượt đổi mã với đúng trình
 * duyệt đã bắt đầu luồng, nên một mã bị lộ qua lịch sử duyệt web hay log
 * proxy cũng không đổi được thành token.
 *
 * `state` là thứ khác và cũng bắt buộc: nó chặn việc kẻ khác ép trình duyệt
 * của bạn hoàn tất luồng đăng nhập bằng tài khoản của họ.
 */

const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

export const GOOGLE_STATE_COOKIE = "thcn_oauth_state";
export const GOOGLE_VERIFIER_COOKIE = "thcn_oauth_verifier";

function b64url(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function rand(n = 32): string {
  return b64url(crypto.getRandomValues(new Uint8Array(n)));
}

export async function buildAuthUrl(redirectUri: string) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) throw new AuthError("Chưa cấu hình đăng nhập Google.", "oauth_not_configured");

  const state = rand();
  const verifier = rand(48);
  const challenge = b64url(
    new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)))
  );

  const u = new URL(AUTH_URL);
  u.searchParams.set("client_id", clientId);
  u.searchParams.set("redirect_uri", redirectUri);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("scope", "openid email profile");
  u.searchParams.set("state", state);
  u.searchParams.set("code_challenge", challenge);
  u.searchParams.set("code_challenge_method", "S256");
  // Không thì Google tự dùng lại tài khoản đang mở sẵn trong trình duyệt thay
  // vì hiện bộ chọn - vấn đề trên thiết bị dùng chung/nhiều tài khoản, nơi đó
  // hiếm khi là tài khoản người dùng thật sự định chọn.
  u.searchParams.set("prompt", "select_account");
  return { url: u.toString(), state, verifier };
}

export interface GoogleIdentity {
  sub: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  picture?: string;
}

/**
 * Đổi mã lấy danh tính.
 *
 * KHÔNG kiểm chữ ký của id_token, và đây là chủ ý chứ không phải bỏ sót:
 * token này lấy TRỰC TIẾP từ điểm cuối của Google qua TLS trong chính yêu cầu
 * này, nên nguồn gốc đã được TLS bảo đảm. Đặc tả OpenID Connect nói rõ là
 * trong luồng mã uỷ quyền thì bước kiểm chữ ký có thể bỏ. Vẫn phải kiểm `iss`
 * và `aud` - hai trường ấy chống trường hợp token thật nhưng của ứng dụng
 * khác, thứ TLS không nói gì.
 */
export async function exchangeCode(
  code: string,
  verifier: string,
  redirectUri: string
): Promise<GoogleIdentity> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new AuthError("Chưa cấu hình đăng nhập Google.", "oauth_not_configured");
  }

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code_verifier: verifier,
    }),
  });
  if (!res.ok) {
    console.error("[google] đổi mã hỏng:", res.status, await res.text().catch(() => ""));
    throw new AuthError("Đăng nhập Google không thành công.", "oauth_exchange_failed");
  }

  const body = (await res.json()) as { id_token?: string };
  if (!body.id_token) throw new AuthError("Google không trả về id_token.", "oauth_no_id_token");

  const parts = body.id_token.split(".");
  if (parts.length !== 3) throw new AuthError("id_token sai định dạng.", "oauth_bad_id_token");
  const payload = JSON.parse(
    new TextDecoder().decode(
      Uint8Array.from(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0))
    )
  ) as { iss?: string; aud?: string; sub?: string; email?: string; email_verified?: boolean | string; name?: string; picture?: string; exp?: number };

  if (payload.iss !== "https://accounts.google.com" && payload.iss !== "accounts.google.com") {
    throw new AuthError("id_token không phải của Google.", "oauth_bad_issuer");
  }
  if (payload.aud !== clientId) {
    // Token thật, nhưng phát cho ỨNG DỤNG KHÁC. Không kiểm là nhận token của
    // bất kỳ ứng dụng Google nào làm bằng chứng đăng nhập vào đây.
    throw new AuthError("id_token phát cho ứng dụng khác.", "oauth_bad_audience");
  }
  if (payload.exp && payload.exp * 1000 < Date.now()) {
    throw new AuthError("id_token đã hết hạn.", "oauth_expired");
  }
  if (!payload.sub || !payload.email) {
    throw new AuthError("id_token thiếu sub hoặc email.", "oauth_incomplete");
  }

  return {
    sub: payload.sub,
    email: payload.email,
    // Google trả trường này khi thì boolean khi thì chuỗi "true".
    emailVerified: payload.email_verified === true || payload.email_verified === "true",
    name: payload.name,
    picture: payload.picture,
  };
}
