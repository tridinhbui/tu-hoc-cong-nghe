import { getDb } from "@/lib/d1/server";
import { signUp } from "@/lib/auth/service";
import { readJson, setSessionCookie, authErrorResponse } from "@/lib/auth/http";

export async function POST(req: Request) {
  try {
    // Nhân bản TRƯỚC khi readJson() tiêu thụ thân yêu cầu - thân của Request
    // chỉ đọc được một lần, và readJson() gọi req.json() ngay bên trong nó.
    const nameBody = (await req.clone().json().catch(() => ({}))) as { name?: unknown };
    const name = typeof nameBody.name === "string" ? nameBody.name : undefined;

    const { email, password } = await readJson(req, ["email", "password"] as const);
    const r = await signUp(getDb(), email, password, name);
    await setSessionCookie(r.token, r.expiresAt);
    return Response.json({ user: r.user });
  } catch (err) {
    return authErrorResponse(err);
  }
}
