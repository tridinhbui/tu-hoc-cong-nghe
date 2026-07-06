"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { uploadDocument, deleteDocument } from "@/lib/admin/documents";

export async function uploadDocumentAction(formData: FormData) {
  const session = await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() ?? "";
  const category = (formData.get("category") as string) || "khac";
  const file = formData.get("file") as File | null;

  if (!title) throw new Error("Vui lòng nhập tiêu đề tài liệu");
  if (!file || file.size === 0) throw new Error("Vui lòng chọn một tệp để tải lên");
  if (file.size > 25 * 1024 * 1024) throw new Error("Tệp vượt quá giới hạn 25MB");

  await uploadDocument({ title, description, category, file, uploadedBy: session.userId });
  revalidatePath("/admin/documents");
  revalidatePath("/tai-lieu");
}

export async function deleteDocumentAction(id: number) {
  await requireAdmin();
  await deleteDocument(id);
  revalidatePath("/admin/documents");
  revalidatePath("/tai-lieu");
}
