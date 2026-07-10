"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { uploadDocument } from "@/lib/admin/documents";

// Lets any logged-in user share a document with the community. Unlike the
// admin upload flow (app/admin/documents/actions.ts), this always lands as
// 'pending' - it only becomes visible on this page (to everyone else) once
// an admin approves it from /admin/documents. The submitter can still see
// their own pending/rejected row via the documents select RLS policy.
export async function submitCommunityDocumentAction(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Vui lòng đăng nhập để chia sẻ tài liệu.");

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() ?? "";
  const category = (formData.get("category") as string) || "khac";
  const file = formData.get("file") as File | null;

  if (!title) throw new Error("Vui lòng nhập tiêu đề tài liệu");
  if (!file || file.size === 0) throw new Error("Vui lòng chọn một tệp để tải lên");
  // Lower cap than the admin flow (25MB) - open community uploads carry more
  // storage-cost risk than a small number of admin-curated files.
  if (file.size > 10 * 1024 * 1024) throw new Error("Tệp vượt quá giới hạn 10MB");

  await uploadDocument({
    title,
    description,
    category,
    file,
    uploadedBy: user.id,
    status: "pending",
  });

  revalidatePath("/tai-lieu");
  revalidatePath("/admin/documents");
}
