"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { updateLessonAdmin, type LessonUpdateFields } from "@/lib/admin/lessons";
import { resolveUnlockRequest } from "@/lib/admin/unlock-requests";

export async function updateLessonAction(id: number, fields: LessonUpdateFields) {
  await requireAdmin();
  await updateLessonAdmin(id, fields);
  revalidatePath("/admin/lessons");
  revalidatePath("/dashboard");
}

export async function resolveUnlockRequestAction(id: number, approve: boolean) {
  await requireAdmin();
  await resolveUnlockRequest(id, approve);
  revalidatePath("/admin/lessons");
}
