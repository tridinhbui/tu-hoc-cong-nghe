import { getDb } from "@/lib/d1/server";
import { revokeSession } from "@/lib/auth/session";
import { readSessionCookie, clearSessionCookie, authErrorResponse } from "@/lib/auth/http";

export async function POST() {
  try {
    const token = await readSessionCookie();
    // Thu hồi ở phía máy chủ chứ không chỉ xoá cookie. Xoá cookie mà để phiên
    // sống nghĩa là ai đã sao được token vẫn dùng tiếp được sau khi đăng xuất.
    if (token) await revokeSession(getDb(), token);
    await clearSessionCookie();
    return Response.json({ ok: true });
  } catch (err) {
    return authErrorResponse(err);
  }
}
