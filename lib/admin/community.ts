import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";

export interface AdminCommunityPost {
  id: number;
  user_id: string;
  user_email: string | null;
  user_name: string | null;
  kind: "streak" | "manual";
  content: string;
  is_hidden: boolean;
  created_at: string;
}

export async function listCommunityPosts(limit = 100): Promise<AdminCommunityPost[]> {
  const supabase = createAdminClient();

  const { data: rows, error } = await supabase
    .from("community_posts")
    .select("id, user_id, kind, content, is_hidden, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !rows || rows.length === 0) return [];

  const userIds = Array.from(new Set(rows.map((r) => r.user_id)));
  const { data: profiles } = await supabase.from("user_profiles").select("id, email, full_name").in("id", userIds);
  const profileById = new Map((profiles ?? []).map((p) => [p.id, p]));

  return rows.map((row) => ({
    ...row,
    user_email: profileById.get(row.user_id)?.email ?? null,
    user_name: profileById.get(row.user_id)?.full_name ?? null,
  }));
}

export async function setPostHidden(postId: number, isHidden: boolean): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("community_posts").update({ is_hidden: isHidden }).eq("id", postId);
  if (error) throw new Error(error.message);
}
