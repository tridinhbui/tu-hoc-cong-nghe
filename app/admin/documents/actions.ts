"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { uploadDocument, updateDocument, deleteDocument, approveDocument, rejectDocument } from "@/lib/admin/documents";
import { getServerDictionary } from "@/lib/i18n/server";

export async function uploadDocumentAction(formData: FormData) {
  // Các câu `throw` dưới đây đi thẳng vào `toast.error` qua `err.message` ở
  // DocumentsManager, nên chúng là câu chữ quản trị viên đọc chứ không phải
  // bất biến nội bộ. Server Action không có useI18n() nên đọc locale từ cookie.
  const t = (await getServerDictionary()).adminTwo.documentsManager;
  const session = await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() ?? "";
  const category = (formData.get("category") as string) || "khac";
  const file = formData.get("file") as File | null;
  const image = formData.get("image") as File | null;

  if (!title) throw new Error(t.errNoTitle);
  if (!file || file.size === 0) throw new Error(t.errNoFile);
  if (file.size > 25 * 1024 * 1024) throw new Error(t.errTooLarge);

  await uploadDocument({
    title,
    description,
    category,
    file,
    image: image && image.size > 0 ? image : null,
    uploadedBy: session.userId,
  });
  revalidatePath("/admin/documents");
  revalidatePath("/tai-lieu");
}

export async function updateDocumentAction(id: number, formData: FormData) {
  const t = (await getServerDictionary()).adminTwo.documentsManager;
  await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() ?? "";
  const category = (formData.get("category") as string) || "khac";
  // The file and image inputs are optional on edit - only present in the
  // form data when the admin actually chose/dropped a replacement.
  const file = formData.get("file") as File | null;
  const image = formData.get("image") as File | null;
  const removeImage = formData.get("removeImage") === "true";

  if (!title) throw new Error(t.errNoTitle);
  if (file && file.size > 25 * 1024 * 1024) throw new Error(t.errTooLarge);

  await updateDocument({
    id,
    title,
    description,
    category,
    file: file && file.size > 0 ? file : null,
    image: image && image.size > 0 ? image : null,
    removeImage,
  });
  revalidatePath("/admin/documents");
  revalidatePath("/tai-lieu");
}

export async function deleteDocumentAction(id: number) {
  await requireAdmin();
  await deleteDocument(id);
  revalidatePath("/admin/documents");
  revalidatePath("/tai-lieu");
}

export async function approveDocumentAction(id: number) {
  await requireAdmin();
  await approveDocument(id);
  revalidatePath("/admin/documents");
  revalidatePath("/tai-lieu");
}

export async function rejectDocumentAction(id: number) {
  await requireAdmin();
  await rejectDocument(id);
  revalidatePath("/admin/documents");
  revalidatePath("/tai-lieu");
}
