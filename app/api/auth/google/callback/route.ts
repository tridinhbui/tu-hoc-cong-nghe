import { cookies } from "next/headers";
import { getDb } from "@/lib/d1/server";
import { signInWithIdentity, AuthError } from "@/lib/auth/service";
import { exchangeCode, GOOGLE_STATE_COOKIE, GOOGLE_VERIFIER_COOKIE } from "@/lib/auth/google";
import { setSessionCookie } from "@/lib/auth/http";

/** Về trang đăng nhập kèm mã lỗi, thay vì trả JSON: đây là một lượt điều
 *  hướng của trình duyệt, người dùng đang nhìn một trang chứ không đọc JSON. */
function loi(req: Request, code: string) {
  const u = new URL("/login", new URL(req.url).origin);
  u.searchParams.set("error", code);
  return Response.redirect(u.toString(), 302);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const jar = await cookies();

  const state = jar.get(GOOGLE_STATE_COOKIE)?.value;
  const verifier = jar.get(GOOGLE_VERIFIER_COOKIE)?.value;
  jar.delete(GOOGLE_STATE_COOKIE);
  jar.delete(GOOGLE_VERIFIER_COOKIE);

  if (url.searchParams.get("error")) return loi(req, "oauth_denied");

  const code = url.searchParams.get("code");
  const returned = url.searchParams.get("state");
  if (!code || !returned || !state || !verifier) return loi(req, "oauth_incomplete");

  // So state trước khi đụng tới bất cứ thứ gì khác. Không so là để kẻ khác ép
  // trình duyệt này hoàn tất đăng nhập bằng tài khoản Google của họ.
  if (returned !== state) return loi(req, "oauth_state_mismatch");

  try {
    const redirectUri = new URL("/api/auth/google/callback", url.origin).toString();
    const id = await exchangeCode(code, verifier, redirectUri);
    const r = await signInWithIdentity(getDb(), "google", id.sub, id.email, id.emailVerified);
    await setSessionCookie(r.token, r.expiresAt);
    return Response.redirect(new URL("/", url.origin).toString(), 302);
  } catch (err) {
    if (err instanceof AuthError) return loi(req, err.code);
    console.error("[google callback]", err);
    return loi(req, "internal");
  }
}
