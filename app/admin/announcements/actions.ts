"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { createAnnouncement, deactivateAnnouncement, type CreateAnnouncementInput } from "@/lib/admin/announcements";

export async function createAnnouncementAction(input: CreateAnnouncementInput) {
  const session = await requireAdmin();
  await createAnnouncement(session.userId, input);
  revalidatePath("/admin/announcements");
}

export async function deactivateAnnouncementAction(id: number) {
  await requireAdmin();
  await deactivateAnnouncement(id);
  revalidatePath("/admin/announcements");
}
