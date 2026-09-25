import { getCurrentUser } from "@/lib/auth/current-user";
import { getDb } from "@/lib/d1/server";
import { getDashboardSummary } from "@/lib/d1/rpc";

// Thay cho supabase.rpc("get_dashboard_summary") gọi trực tiếp từ trình
// duyệt (lib/supabase-dashboard-optimized.ts). Client không có binding D1,
// nên hàm trong lib/d1/rpc.ts phải chạy ở đây rồi trả JSON xuống - cùng hình
// dạng { profile, stats, has_completed_onboarding, passed_milestones,
// challenge_passed_ids } mà bản Supabase từng trả.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "unauthenticated" }, { status: 401 });

  const summary = await getDashboardSummary(getDb(), user.id);
  return Response.json(summary);
}
