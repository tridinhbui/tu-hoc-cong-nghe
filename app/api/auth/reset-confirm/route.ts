import { getDb } from "@/lib/d1/server";
import { resetPassword } from "@/lib/auth/service";
import { readJson, clearSessionCookie, authErrorResponse } from "@/lib/auth/http";

export async function POST(req: Request) {
  try {
    const { token, password } = await readJson(req, ["token", "password"] as const);
    await resetPassword(getDb(), token, password);
    // resetPassword đã thu hồi mọi phiên phía máy chủ; xoá nốt cookie ở đây để
    // trình duyệt này không giữ lại một token đã chết.
    await clearSessionCookie();
    return Response.json({ ok: true });
  } catch (err) {
    return authErrorResponse(err);
  }
}
