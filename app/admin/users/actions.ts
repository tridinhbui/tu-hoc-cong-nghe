"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { updateUserRole, setUserDisabled } from "@/lib/admin/users";

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
