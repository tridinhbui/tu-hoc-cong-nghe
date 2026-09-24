import "server-only";
import { requireAdminDb } from "@/lib/admin/db";

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
  const { db } = await requireAdminDb();

  const { data: rows, error } = await db
    .from("community_posts")
    .select("id, user_id, kind, content, is_hidden, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !rows || (rows as unknown[]).length === 0) return [];
  const typedRows = rows as { id: number; user_id: string; kind: "streak" | "manual"; content: string; is_hidden: boolean; created_at: string }[];

  const userIds = Array.from(new Set(typedRows.map((r) => r.user_id)));
  const { data: profiles } = await db.from("user_profiles").select("id, email, full_name").in("id", userIds);
  const profileById = new Map(
    ((profiles ?? []) as { id: string; email: string; full_name: string | null }[]).map((p) => [p.id, p])
  );

  return typedRows.map((row) => ({
    ...row,
    user_email: profileById.get(row.user_id)?.email ?? null,
    user_name: profileById.get(row.user_id)?.full_name ?? null,
  }));
}

export async function setPostHidden(postId: number, isHidden: boolean): Promise<void> {
  const { db } = await requireAdminDb();
  const { error } = await db.from("community_posts").update({ is_hidden: isHidden }).eq("id", postId);
  if (error) throw new Error(error.message);
}
