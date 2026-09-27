import { createClient } from "@/lib/cloudflare";
import { handleCloudflareError } from "@/lib/errors";

// "Table not found in schema cache" (PostgREST) or "relation does not
// exist" (raw Postgres) - degrade to "no announcements" instead of
// crashing the dashboard if this migration isn't applied yet.
function isMissingTableError(error: { code?: string } | null): boolean {
  return error?.code === "PGRST205" || error?.code === "42P01";
}

export interface Announcement {
  id: number;
  title: string;
  body: string;
  severity: "info" | "warning" | "critical";
  createdAt: string;
}

/** Active, non-expired announcements the given user hasn't dismissed yet. */
export async function getUnreadAnnouncements(userId: string): Promise<Announcement[]> {
  const cloudflare = createClient();
  const nowIso = new Date().toISOString();

  const [{ data: active, error: activeError }, { data: reads, error: readsError }] = await Promise.all([
    cloudflare
      .from("announcements")
      .select("id, title, body, severity, created_at")
      .eq("active", true)
      .or(`expires_at.is.null,expires_at.gt.${nowIso}`)
      .order("created_at", { ascending: false }),
    cloudflare.from("announcement_reads").select("announcement_id").eq("user_id", userId),
  ]);

  if (activeError) {
    if (isMissingTableError(activeError)) return [];
    throw handleCloudflareError(activeError);
  }
  if (readsError && !isMissingTableError(readsError)) {
    throw handleCloudflareError(readsError);
  }

  const readIds = new Set((reads ?? []).map((r) => r.announcement_id as number));

  return (active ?? [])
    .filter((row) => !readIds.has(row.id))
    .map((row) => ({
      id: row.id,
      title: row.title,
      body: row.body,
      severity: row.severity as Announcement["severity"],
      createdAt: row.created_at,
    }));
}

export async function markAnnouncementRead(userId: string, announcementId: number): Promise<void> {
  const cloudflare = createClient();
  const { error } = await cloudflare
    .from("announcement_reads")
    .upsert([{ announcement_id: announcementId, user_id: userId }], { onConflict: "announcement_id,user_id" });

  if (error && !isMissingTableError(error)) throw handleCloudflareError(error);
}
