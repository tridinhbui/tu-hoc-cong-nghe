import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";
import { generateExcelPreviewPng, isExcelFileName } from "@/lib/excel-preview";

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

/**
 * When the uploader didn't provide a manual cover image and the file is a
 * modern .xlsx workbook, auto-generate one from the sheet's own content
 * (lib/excel-preview.ts) instead of leaving the giveaway card with a
 * generic file icon. Best-effort: any failure (corrupt file, legacy binary
 * .xls, encrypted workbook) just skips the cover image entirely, same as if
 * no image had been given - it must never fail the document upload itself.
 */
async function uploadAutoExcelPreview(
  supabase: ReturnType<typeof createAdminClient>,
  file: File
): Promise<string | null> {
  if (!isExcelFileName(file.name)) return null;
  try {
    const buffer = await file.arrayBuffer();
    const png = await generateExcelPreviewPng(buffer);
    if (!png) return null;

    const path = `covers/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-auto.png`;
    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(path, png, { contentType: "image/png" });
    if (uploadError) {
      console.error("Error uploading auto-generated Excel preview:", uploadError);
      return null;
    }

    const { data } = supabase.storage.from("documents").getPublicUrl(path);
    return data.publicUrl;
  } catch (err) {
    console.error("Error generating Excel preview:", err);
    return null;
  }
}

// Generate placeholder image URL based on category
function getPlaceholderImageUrl(category: string): string {
  const categoryEmojis: Record<string, string> = {
    "excel": "📊",
    "checklist": "✅",
    "ebook": "📚",
    "template": "📋",
    "guide": "📖",
    "worksheet": "📝",
    "cheat-sheet": "📄",
    "tool": "🛠️",
  };

  const emoji = categoryEmojis[(category || "").toLowerCase()] || "📄";

  // Generate a simple SVG placeholder with emoji
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="200" height="280" fill="url(#grad)"/>
    <rect x="10" y="10" width="180" height="260" rx="8" fill="white" stroke="#d1d5db" stroke-width="1"/>
    <text x="100" y="140" font-size="60" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
  </svg>`;

  const encoded = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${encoded}`;
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

  // Add placeholder images for documents missing images
  const docs = (data as DocumentRow[]) ?? [];
  return docs.map(doc => ({
    ...doc,
    image_url: doc.image_url || getPlaceholderImageUrl(doc.category),
  }));
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
    if (!imageUrl) {
      imageUrl = await uploadAutoExcelPreview(supabase, file);
    }
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

  let { data: existing, error: fetchError } = await supabase
    .from("documents")
    .select("file_url, image_url")
    .eq("id", id)
    .single();

  // If image_url column doesn't exist, retry without it
  if (fetchError && isMissingColumnError(fetchError)) {
    ({ data: existing, error: fetchError } = await supabase
      .from("documents")
      .select("file_url")
      .eq("id", id)
      .single());
  }

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
  } else if (file && file.size > 0 && !existing.image_url) {
    // The file itself was replaced, no manual cover was given, and there
    // was no existing cover to preserve - regenerate from the new file's
    // own content the same way a fresh upload would, instead of leaving
    // the card without a preview until someone edits it again.
    const autoUrl = await uploadAutoExcelPreview(supabase, file);
    if (autoUrl) fields.image_url = autoUrl;
  }

  let { error: updateError } = await supabase.from("documents").update(fields).eq("id", id);

  // If update fails due to missing columns (e.g., image_url), retry without those fields
  if (updateError && isMissingColumnError(updateError)) {
    const fieldsWithoutImage = { ...fields };
    delete fieldsWithoutImage.image_url;
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
 * Marks a pending community submission as rejected - the row itself is kept
 * (not deleted) as an admin-side audit trail, but the actual file(s) are
 * purged from Storage. The "documents" bucket is public-read, so the file
 * stayed downloadable forever by anyone who ever saw/saved its URL even
 * after being hidden from /tai-lieu - the random filename made it
 * unguessable and listing is RLS-blocked, but an unguessable-but-permanent
 * public URL is still a real content-retention gap for anything not yet
 * fully vetted. Best-effort: a failed storage removal still lets the
 * rejection go through (row status is the source of truth the app reads;
 * an orphaned object is a lesser problem than getting stuck unable to
 * reject at all).
 */
export async function rejectDocument(id: number): Promise<void> {
  const supabase = createAdminClient();

  const { data: doc, error: fetchError } = await supabase
    .from("documents")
    .select("file_url, image_url")
    .eq("id", id)
    .single();

  if (fetchError || !doc) throw new Error(fetchError?.message ?? "Không tìm thấy tài liệu");

  const pathsToRemove: string[] = [];
  const filePath = doc.file_url?.split("/documents/")[1];
  if (filePath) pathsToRemove.push(filePath);
  const imagePath = doc.image_url?.split("/documents/")[1];
  if (imagePath) pathsToRemove.push(imagePath);

  if (pathsToRemove.length > 0) {
    const { error: removeError } = await supabase.storage.from("documents").remove(pathsToRemove);
    if (removeError) console.error("Error removing rejected document files from storage:", removeError);
  }

  const { error } = await supabase.from("documents").update({ status: "rejected" }).eq("id", id);
  if (error) throw new Error(error.message);
}
