import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";

export interface UnlockRequestRow {
  id: number;
  user_id: string;
  lesson_id: number;
  note: string | null;
  status: "pending" | "approved" | "denied";
  created_at: string;
  resolved_at: string | null;
  user_email: string | null;
  user_name: string | null;
  lesson_title: string | null;
}

export async function getUnlockRequests(status: "pending" | "all" = "pending"): Promise<UnlockRequestRow[]> {
  const supabase = createAdminClient();

  let q = supabase
    .from("lesson_unlock_requests")
    .select("id, user_id, lesson_id, note, status, created_at, resolved_at");

  if (status === "pending") q = q.eq("status", "pending");

  const { data, error } = await q.order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching unlock requests:", error);
    return [];
  }

  const rows = data ?? [];
  if (rows.length === 0) return [];

  const userIds = [...new Set(rows.map((r) => r.user_id))];
  const lessonIds = [...new Set(rows.map((r) => r.lesson_id))];

  const [{ data: users }, { data: lessons }] = await Promise.all([
    supabase.from("user_profiles").select("id, email, full_name").in("id", userIds),
    supabase.from("lessons").select("id, title").in("id", lessonIds),
  ]);

  const userMap = new Map((users ?? []).map((u) => [u.id, u]));
  const lessonMap = new Map((lessons ?? []).map((l) => [l.id, l]));

  return rows.map((r) => ({
    ...r,
    status: r.status as "pending" | "approved" | "denied",
    user_email: userMap.get(r.user_id)?.email ?? null,
    user_name: userMap.get(r.user_id)?.full_name ?? null,
    lesson_title: lessonMap.get(r.lesson_id)?.title ?? null,
  }));
}

export async function resolveUnlockRequest(id: number, approve: boolean) {
  const supabase = createAdminClient();

  const { data: request, error: fetchError } = await supabase
    .from("lesson_unlock_requests")
    .select("user_id, lesson_id")
    .eq("id", id)
    .single();

  if (fetchError || !request) throw new Error(fetchError?.message ?? "Không tìm thấy yêu cầu");

  const { error: updateError } = await supabase
    .from("lesson_unlock_requests")
    .update({ status: approve ? "approved" : "denied", resolved_at: new Date().toISOString() })
    .eq("id", id);

  if (updateError) throw new Error(updateError.message);

  if (approve) {
    const { error: grantError } = await supabase
      .from("user_lesson_unlocks")
      .upsert(
        [{ user_id: request.user_id, lesson_id: request.lesson_id }],
        { onConflict: "user_id,lesson_id" }
      );
    if (grantError) throw new Error(grantError.message);
  }
}

export async function getPendingUnlockCount(): Promise<number> {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from("lesson_unlock_requests")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");
  if (error) return 0;
  return count ?? 0;
}
