"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { uploadDocument } from "@/lib/admin/documents";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

// Lets any logged-in user share a document with the community. Unlike the
// admin upload flow (app/admin/documents/actions.ts), this always lands as
// 'pending' - it only becomes visible on this page (to everyone else) once
// an admin approves it from /admin/documents. The submitter can still see
// their own pending/rejected row via the documents select RLS policy.
export async function submitCommunityDocumentAction(formData: FormData) {
  // Các câu `throw` dưới đây KHÔNG phải bất biến nội bộ: CommunityUploadModal
  // đổ thẳng `err.message` vào `toast.error`, nên đây là câu chữ người dùng
  // đọc. Server action không có `useI18n()`, nên đọc locale từ cookie.
  const t = getDictionary(await getServerLocale());
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error(t.communityUpload.errNotSignedIn);

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() ?? "";
  const category = (formData.get("category") as string) || "khac";
  const file = formData.get("file") as File | null;

  if (!title) throw new Error(t.communityUpload.errNoTitle);
  if (!file || file.size === 0) throw new Error(t.communityUpload.errNoFile);
  // Lower cap than the admin flow (25MB) - open community uploads carry more
  // storage-cost risk than a small number of admin-curated files.
  if (file.size > 10 * 1024 * 1024) throw new Error(t.communityUpload.errTooLarge);

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
