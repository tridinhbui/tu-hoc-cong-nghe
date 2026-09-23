import { getDb } from "@/lib/d1/server";
import { signInWithPassword } from "@/lib/auth/service";
import { readJson, setSessionCookie, authErrorResponse } from "@/lib/auth/http";

export async function POST(req: Request) {
  try {
    const { email, password } = await readJson(req, ["email", "password"] as const);
    const r = await signInWithPassword(getDb(), email, password);
    await setSessionCookie(r.token, r.expiresAt);
    // KHÔNG trả token trong thân phản hồi. Cookie là httpOnly nên JavaScript
    // trên trang không đọc được; trả kèm trong JSON là xoá bỏ đúng tính chất ấy.
    return Response.json({ user: r.user });
  } catch (err) {
    return authErrorResponse(err);
  }
}
