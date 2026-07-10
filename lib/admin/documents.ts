import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";

export type DocumentStatus = "pending" | "approved" | "rejected";

export interface DocumentRow {
  id: number;
  title: string;
  description: string | null;
  category: string;
  file_url: string;
  file_name: string;
  file_size: number;
  download_count: number;
  created_at: string;
  image_url: string | null;
  status: DocumentStatus;
  uploaded_by: string | null;
}

export { DOCUMENT_CATEGORIES } from "@/lib/document-categories";

// The upload/edit form's `accept=".pdf,.doc,..."` is a UI hint only - a
// user can still pick any file, or hit these functions directly. Mirror the
// same whitelist here so the server is the actual enforcement point.
const ALLOWED_EXTENSIONS = new Set([
  "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "zip", "png", "jpg", "jpeg",
]);

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/zip",
  "application/x-zip-compressed",
  "image/png",
  "image/jpeg",
  // Some OS/browser combos report generic types for zip-based formats - // still gated by the extension check below, so this doesn't widen the
  // effective whitelist on its own.
  "application/octet-stream",
]);

function assertAllowedDocumentFile(file: File): void {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error(`Định dạng tệp ".${ext}" không được hỗ trợ.`);
  }
  if (file.type && !ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error("Loại tệp không hợp lệ.");
  }
}

const ALLOWED_IMAGE_EXTENSIONS = new Set(["png", "jpg", "jpeg", "webp"]);
const ALLOWED_IMAGE_MIME_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

function assertAllowedCoverImage(file: File): void {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_IMAGE_EXTENSIONS.has(ext)) {
    throw new Error(`Định dạng ảnh ".${ext}" không được hỗ trợ.`);
  }
  if (file.type && !ALLOWED_IMAGE_MIME_TYPES.has(file.type)) {
    throw new Error("Loại ảnh không hợp lệ.");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Ảnh minh hoạ vượt quá giới hạn 5MB.");
  }
}

// image_url (and now status/uploaded_by's constraint) were added by later
// migrations that may not be applied on every environment yet - if an
// insert/update including one of them fails because the column doesn't
// exist, retry once without it rather than failing the whole upload/edit.
// Postgres itself reports undefined column as 42703, but PostgREST's own
// schema-cache layer (which is what actually rejects the request here, since
// it validates against its cached schema before ever reaching Postgres)
// reports it as PGRST204 - both need to be treated as "missing column".
function isMissingColumnError(error: { code?: string } | null): boolean {
  return error?.code === "42703" || error?.code === "PGRST204";
}

/** Uploads an optional cover image to the same "documents" storage bucket, under a covers/ prefix. Returns its public URL, or null if no image was given. */
async function uploadCoverImage(
  supabase: ReturnType<typeof createAdminClient>,
  image: File | null | undefined
): Promise<string | null> {
  if (!image || image.size === 0) return null;
  assertAllowedCoverImage(image);

  const ext = image.name.split(".").pop() || "jpg";
  const path = `covers/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("documents")
    .upload(path, image, { contentType: image.type || "image/jpeg" });

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from("documents").getPublicUrl(path);
  return data.publicUrl;
}

export async function getDocuments(): Promise<DocumentRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
  return (data as DocumentRow[]) ?? [];
}

export async function getDocumentCount(): Promise<number> {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from("documents")
    .select("*", { count: "exact", head: true });
  if (error) return 0;
  return count ?? 0;
}

export async function uploadDocument(params: {
  title: string;
  description: string;
  category: string;
  file: File;
  image?: File | null;
  uploadedBy: string;
  // Admin uploads (app/admin/documents) publish straight to 'approved'.
  // Community submissions (app/tai-lieu) pass 'pending' so it only appears
  // publicly once an admin approves it.
  status?: DocumentStatus;
}): Promise<void> {
  const { title, description, category, file, image, uploadedBy, status = "approved" } = params;
  assertAllowedDocumentFile(file);
  const supabase = createAdminClient();

  const ext = file.name.split(".").pop() || "bin";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("documents")
    .upload(path, file, { contentType: file.type || "application/octet-stream" });

  if (uploadError) throw new Error(uploadError.message);

  let imageUrl: string | null = null;
  try {
    imageUrl = await uploadCoverImage(supabase, image);
  } catch (err) {
    // The document file already uploaded - don't leave it orphaned just
    // because the optional cover image failed.
    await supabase.storage.from("documents").remove([path]);
    throw err;
  }

  const { data: publicUrlData } = supabase.storage.from("documents").getPublicUrl(path);

  const baseRow = {
    title,
    description: description || null,
    category,
    file_url: publicUrlData.publicUrl,
    file_name: file.name,
    file_size: file.size,
    uploaded_by: uploadedBy,
    status,
  };

  let { error: insertError } = await supabase.from("documents").insert({ ...baseRow, image_url: imageUrl });
  if (insertError && isMissingColumnError(insertError)) {
    ({ error: insertError } = await supabase.from("documents").insert(baseRow));
  }
  if (insertError && isMissingColumnError(insertError)) {
    // The 20260709_community_documents.sql migration (adds `status`) hasn't
    // run on this environment either - a community submission can't be
    // marked 'pending' without it, so refuse rather than silently
    // publishing it straight to the public page.
    if (status !== "approved") {
      await supabase.storage.from("documents").remove([path]);
      throw new Error("Tính năng chia sẻ tài liệu chưa sẵn sàng (thiếu migration). Vui lòng thử lại sau.");
    }
    const { status: _status, ...baseRowWithoutStatus } = baseRow;
    void _status;
    ({ error: insertError } = await supabase.from("documents").insert(baseRowWithoutStatus));
  }

  if (insertError) {
    // Clean up the uploaded file(s) if the metadata insert fails, so storage
    // doesn't accumulate orphaned files with no corresponding row.
    await supabase.storage.from("documents").remove([path]);
    throw new Error(insertError.message);
  }
}

export async function updateDocument(params: {
  id: number;
  title: string;
  description: string;
  category: string;
  file?: File | null;
  image?: File | null;
  removeImage?: boolean;
}): Promise<void> {
  const { id, title, description, category, file, image, removeImage } = params;
  const supabase = createAdminClient();

  const fields: Record<string, unknown> = {
    title,
    description: description || null,
    category,
  };

  const { data: existing, error: fetchError } = await supabase
    .from("documents")
    .select("file_url, image_url")
    .eq("id", id)
    .single();

  if (fetchError || !existing) throw new Error(fetchError?.message ?? "Không tìm thấy tài liệu");

  const uploadedPaths: string[] = [];
  const oldPathsToCleanUp: string[] = [];

  // Replacing the file is optional - editing title/description/category
  // shouldn't require re-uploading.
  if (file && file.size > 0) {
    assertAllowedDocumentFile(file);

    const ext = file.name.split(".").pop() || "bin";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(path, file, { contentType: file.type || "application/octet-stream" });
    if (uploadError) throw new Error(uploadError.message);
    uploadedPaths.push(path);

    const { data: publicUrlData } = supabase.storage.from("documents").getPublicUrl(path);
    fields.file_url = publicUrlData.publicUrl;
    fields.file_name = file.name;
    fields.file_size = file.size;

    const oldPath = existing.file_url?.split("/documents/")[1];
    if (oldPath) oldPathsToCleanUp.push(oldPath);
  }

  // Cover image is independently optional: replace it, clear it, or leave it
  // untouched - same three states editable at once, without forcing a
  // re-upload of the document file itself.
  if (image && image.size > 0) {
    try {
      fields.image_url = await uploadCoverImage(supabase, image);
    } catch (err) {
      for (const p of uploadedPaths) await supabase.storage.from("documents").remove([p]);
      throw err;
    }
    const oldImagePath = existing.image_url?.split("/documents/")[1];
    if (oldImagePath) oldPathsToCleanUp.push(oldImagePath);
  } else if (removeImage) {
    fields.image_url = null;
    const oldImagePath = existing.image_url?.split("/documents/")[1];
    if (oldImagePath) oldPathsToCleanUp.push(oldImagePath);
  }

  let { error: updateError } = await supabase.from("documents").update(fields).eq("id", id);
  if (updateError && isMissingColumnError(updateError) && "image_url" in fields) {
    const { image_url: _imageUrl, ...fieldsWithoutImage } = fields;
    void _imageUrl;
    ({ error: updateError } = await supabase.from("documents").update(fieldsWithoutImage).eq("id", id));
  }

  if (updateError) {
    // Roll back anything newly uploaded since the row was never updated to
    // point at it.
    for (const p of uploadedPaths) await supabase.storage.from("documents").remove([p]);
    throw new Error(updateError.message);
  }

  for (const p of oldPathsToCleanUp) await supabase.storage.from("documents").remove([p]);
}

export async function deleteDocument(id: number): Promise<void> {
  const supabase = createAdminClient();

  const { data: doc, error: fetchError } = await supabase
    .from("documents")
    .select("file_url")
    .eq("id", id)
    .single();

  if (fetchError || !doc) throw new Error(fetchError?.message ?? "Không tìm thấy tài liệu");

  const path = doc.file_url.split("/documents/")[1];
  if (path) await supabase.storage.from("documents").remove([path]);

  const { error: deleteError } = await supabase.from("documents").delete().eq("id", id);
  if (deleteError) throw new Error(deleteError.message);
}

/** Publishes a pending community submission so it appears on /tai-lieu. */
export async function approveDocument(id: number): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("documents").update({ status: "approved" }).eq("id", id);
  if (error) throw new Error(error.message);
}

/**
 * Marks a pending community submission as rejected - kept in the table
 * (not deleted) so the submitter can still see it was reviewed, via the
 * "own row" clause in the documents select RLS policy.
 */
export async function rejectDocument(id: number): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("documents").update({ status: "rejected" }).eq("id", id);
  if (error) throw new Error(error.message);
}
