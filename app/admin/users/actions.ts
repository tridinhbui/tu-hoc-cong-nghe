"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { updateUserRole, setUserDisabled, resyncAllUserStats } from "@/lib/admin/users";

export async function updateUserRoleAction(userId: string, role: "user" | "admin") {
  const session = await requireAdmin();
  if (session.userId === userId && role !== "admin") {
    throw new Error("Không thể tự hạ quyền admin của chính mình");
  }
  await updateUserRole(userId, role);
  revalidatePath("/admin/users");
}

export async function setUserDisabledAction(userId: string, isDisabled: boolean) {
  const session = await requireAdmin();
  if (session.userId === userId && isDisabled) {
    throw new Error("Không thể tự khóa tài khoản của chính mình");
  }
  await setUserDisabled(userId, isDisabled);
  revalidatePath("/admin/users");
}

// Bulk-recomputes every user's lessons_completed/total_xp/current_level from
// the real completed-lesson/quiz-session/game-session records, in one
// set-based SQL pass (admin_resync_all_user_stats RPC). Fixes anyone
// currently stuck with stale XP from a past silent write failure, right now,
// instead of waiting for each of them to log back in and trigger the
// per-account self-heal on dashboard/profile load.
export async function resyncAllUserStatsAction(): Promise<number> {
  await requireAdmin();
  const affected = await resyncAllUserStats();
  revalidatePath("/admin/users");
  return affected;
}
