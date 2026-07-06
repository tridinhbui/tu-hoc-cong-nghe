"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { markMessageRead, deleteMessage } from "@/lib/admin/messages";
import { sendAdminChatReply, markThreadRead, getChatThreadMessages } from "@/lib/admin/chat";

export async function markMessageReadAction(id: number, isRead: boolean) {
  await requireAdmin();
  await markMessageRead(id, isRead);
  revalidatePath("/admin/messages");
}

export async function deleteMessageAction(id: number) {
  await requireAdmin();
  await deleteMessage(id);
  revalidatePath("/admin/messages");
}

export async function sendAdminChatReplyAction(userId: string, content: string) {
  await requireAdmin();
  await sendAdminChatReply(userId, content);
  revalidatePath("/admin/messages");
}

export async function markThreadReadAction(userId: string) {
  await requireAdmin();
  await markThreadRead(userId);
  revalidatePath("/admin/messages");
}

export async function getChatThreadMessagesAction(userId: string) {
  await requireAdmin();
  return getChatThreadMessages(userId);
}
