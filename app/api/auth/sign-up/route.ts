import { getDb } from "@/lib/d1/server";
import { signUp } from "@/lib/auth/service";
import { readJson, setSessionCookie, authErrorResponse } from "@/lib/auth/http";

export async function POST(req: Request) {
  try {
    const { email, password } = await readJson(req, ["email", "password"] as const);
    const r = await signUp(getDb(), email, password);
    await setSessionCookie(r.token, r.expiresAt);
    return Response.json({ user: r.user });
  } catch (err) {
    return authErrorResponse(err);
  }
}
