import { getCurrentUser } from "@/lib/auth/current-user";
import { getDb } from "@/lib/d1/server";
import { getLessonState } from "@/lib/d1/rpc";

// Thay cho supabase.rpc("get_lesson_state") gọi trực tiếp từ trình duyệt
// (lib/supabase-dashboard-optimized.ts). Xem app/api/dashboard-summary/route.ts
// cho lý do cần một route riêng.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "unauthenticated" }, { status: 401 });

  const state = await getLessonState(getDb(), user.id);
  return Response.json(state);
}
