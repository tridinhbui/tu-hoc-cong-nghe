import { cookies } from "next/headers";
import { buildAuthUrl, GOOGLE_STATE_COOKIE, GOOGLE_VERIFIER_COOKIE } from "@/lib/auth/google";
import { authErrorResponse } from "@/lib/auth/http";

function redirectUri(req: Request) {
  return new URL("/api/auth/google/callback", new URL(req.url).origin).toString();
}

export async function GET(req: Request) {
  try {
    const { url, state, verifier } = await buildAuthUrl(redirectUri(req));
    const jar = await cookies();
    // sameSite "lax" chứ không phải "strict": Google điều hướng trình duyệt
    // quay lại đây từ tên miền khác, và "strict" sẽ không gửi kèm cookie nào
    // trong lượt quay về đó - luồng hỏng ở đúng bước cuối.
    const opts = { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/", maxAge: 600 };
    jar.set({ name: GOOGLE_STATE_COOKIE, value: state, ...opts });
    jar.set({ name: GOOGLE_VERIFIER_COOKIE, value: verifier, ...opts });
    return Response.redirect(url, 302);
  } catch (err) {
    return authErrorResponse(err);
  }
}
