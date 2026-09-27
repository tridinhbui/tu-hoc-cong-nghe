import { getCurrentUser } from "@/lib/auth/current-user";
import { getDb } from "@/lib/d1/server";
import { createD1Rpc } from "@/lib/d1/rpc-dispatch";

/** `.rpc(tên, tham_số)` từ trình duyệt, dưới danh nghĩa người đang đăng nhập.
 *  Hàm chỉ-service_role bị createD1Rpc từ chối ở đây vì không truyền
 *  serviceRole - xem SERVICE_ROLE_ONLY trong lib/d1/rpc-dispatch.ts. */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { name?: unknown; params?: unknown } | null;
  if (!body || typeof body.name !== "string") {
    return Response.json({ data: null, error: { message: "Thiếu tên hàm." } }, { status: 400 });
  }
  const params = body.params && typeof body.params === "object" ? (body.params as Record<string, unknown>) : {};
  const user = await getCurrentUser();
  try {
    const r = await createD1Rpc(getDb(), user?.id ?? null)(body.name, params);
    return Response.json({ data: r.data, error: r.error ? { message: r.error.message } : null });
  } catch (err) {
    return Response.json({ data: null, error: { message: (err as Error).message } }, { status: 403 });
  }
}
