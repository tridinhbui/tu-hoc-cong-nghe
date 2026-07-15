import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";

export interface AdminAiReportRow {
  id: number;
  user_id: string;
  lesson_id: number;
  lesson_slug: string;
  quote: string;
  created_at: string;
  user_email?: string;
  user_name?: string;
}

export async function listAiReports(): Promise<AdminAiReportRow[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("lesson_highlights")
    .select(`
      id,
      user_id,
      lesson_id,
      lesson_slug,
      quote,
      created_at,
      user_profiles (
        email,
        full_name
      )
    `)
    .eq("kind", "ai_flag")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching AI reports:", error);
    return [];
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    user_id: row.user_id,
    lesson_id: row.lesson_id,
    lesson_slug: row.lesson_slug,
    quote: row.quote,
    created_at: row.created_at,
    user_email: row.user_profiles?.email ?? "Không rõ",
    user_name: row.user_profiles?.full_name ?? "Ẩn danh",
  }));
}

export async function deleteAiReport(id: number): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("lesson_highlights")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
