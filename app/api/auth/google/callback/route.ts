import { cookies } from "next/headers";
import { getDb } from "@/lib/d1/server";
import { signInWithIdentity, AuthError } from "@/lib/auth/service";
import { exchangeCode, GOOGLE_STATE_COOKIE, GOOGLE_VERIFIER_COOKIE } from "@/lib/auth/google";
import { setSessionCookie } from "@/lib/auth/http";
import { OAUTH_NEXT_COOKIE, clearOAuthNextCookie } from "@/lib/oauth-next-cookie";
import { safeNextPath } from "@/lib/safe-next-path";

/** Về trang đăng nhập kèm mã lỗi, thay vì trả JSON: đây là một lượt điều
 *  hướng của trình duyệt, người dùng đang nhìn một trang chứ không đọc JSON. */
function loi(req: Request, code: string, next: string) {
  const u = new URL("/login", new URL(req.url).origin);
  u.searchParams.set("error", code);
  u.searchParams.set("next", next);
  const res = Response.redirect(u.toString(), 302);
  res.headers.append("Set-Cookie", clearOAuthNextCookie());
  return res;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const jar = await cookies();

  const state = jar.get(GOOGLE_STATE_COOKIE)?.value;
  const verifier = jar.get(GOOGLE_VERIFIER_COOKIE)?.value;
  // Đọc TRƯỚC khi xoá, dùng cả trên nhánh lỗi lẫn nhánh thành công - đúng cách
  // app/auth/callback/route.ts (bản Supabase cũ) từng làm, để một lần OAuth
  // lỗi giữa chừng không làm mất đích đến khi người dùng thử lại.
  //
  // decodeURIComponent ném URIError trên một chuỗi phần trăm không hợp lệ -
  // cookie cũ từ một phiên bản khác, hoặc bị cắt bớt - và dòng này chạy trước
  // try/catch bên dưới, nên trước đây một cookie hỏng làm cả route trả 500
  // thô thay vì redirect về /login?error=... như mọi nhánh lỗi khác.
  const rawNext = jar.get(OAUTH_NEXT_COOKIE)?.value;
  let decodedNext: string | null = null;
  if (rawNext) {
    try {
      decodedNext = decodeURIComponent(rawNext);
    } catch {
      decodedNext = null;
    }
  }
  const next = safeNextPath(decodedNext);
  jar.delete(GOOGLE_STATE_COOKIE);
  jar.delete(GOOGLE_VERIFIER_COOKIE);

  if (url.searchParams.get("error")) return loi(req, "oauth_denied", next);

  const code = url.searchParams.get("code");
  const returned = url.searchParams.get("state");
  if (!code || !returned || !state || !verifier) return loi(req, "oauth_incomplete", next);

  // So state trước khi đụng tới bất cứ thứ gì khác. Không so là để kẻ khác ép
  // trình duyệt này hoàn tất đăng nhập bằng tài khoản Google của họ.
  if (returned !== state) return loi(req, "oauth_state_mismatch", next);

  try {
    const redirectUri = new URL("/api/auth/google/callback", url.origin).toString();
    const id = await exchangeCode(code, verifier, redirectUri);
    const r = await signInWithIdentity(getDb(), "google", id.sub, id.email, id.emailVerified, { name: id.name, picture: id.picture });
    await setSessionCookie(r.token, r.expiresAt);
    const done = Response.redirect(new URL(next, url.origin).toString(), 302);
    done.headers.append("Set-Cookie", clearOAuthNextCookie());
    return done;
  } catch (err) {
    if (err instanceof AuthError) return loi(req, err.code, next);
    console.error("[google callback]", err);
    return loi(req, "internal", next);
  }
}
