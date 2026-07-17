"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { approveAppeal, rejectAppeal } from "@/lib/admin/appeals";

export async function approveAppealAction(appealId: number) {
  const session = await requireAdmin();
  await approveAppeal(appealId, session.userId);
  revalidatePath("/admin/appeals");
}

export async function rejectAppealAction(appealId: number, adminNote: string) {
  const session = await requireAdmin();
  await rejectAppeal(appealId, session.userId, adminNote);
  revalidatePath("/admin/appeals");
}

export async function approveMultipleAppealsAction(appealIds: number[]) {
  const session = await requireAdmin();
  await Promise.all(appealIds.map((id) => approveAppeal(id, session.userId)));
  revalidatePath("/admin/appeals");
}
