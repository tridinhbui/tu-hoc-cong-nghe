import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";

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
}

export { DOCUMENT_CATEGORIES } from "@/lib/document-categories";

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
  uploadedBy: string;
}): Promise<void> {
  const { title, description, category, file, uploadedBy } = params;
  const supabase = createAdminClient();

  const ext = file.name.split(".").pop() || "bin";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("documents")
    .upload(path, file, { contentType: file.type || "application/octet-stream" });

  if (uploadError) throw new Error(uploadError.message);

  const { data: publicUrlData } = supabase.storage.from("documents").getPublicUrl(path);

  const { error: insertError } = await supabase.from("documents").insert({
    title,
    description: description || null,
    category,
    file_url: publicUrlData.publicUrl,
    file_name: file.name,
    file_size: file.size,
    uploaded_by: uploadedBy,
  });

  if (insertError) {
    // Clean up the uploaded file if the metadata insert fails, so storage
    // doesn't accumulate orphaned files with no corresponding row.
    await supabase.storage.from("documents").remove([path]);
    throw new Error(insertError.message);
  }
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
