import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";

export interface AdminAnnouncement {
  id: number;
  title: string;
  body: string;
  severity: "info" | "warning" | "critical";
  active: boolean;
  expiresAt: string | null;
  createdAt: string;
  createdByEmail: string | null;
  readCount: number;
}

export async function listAnnouncements(): Promise<AdminAnnouncement[]> {
  const supabase = createAdminClient();

  const { data: rows, error } = await supabase
    .from("announcements")
    .select("id, title, body, severity, active, expires_at, created_at, created_by")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  if (!rows || rows.length === 0) return [];

  const creatorIds = Array.from(new Set(rows.map((r) => r.created_by).filter((id): id is string => !!id)));
  const [{ data: profiles }, { data: reads }] = await Promise.all([
    creatorIds.length > 0
      ? supabase.from("user_profiles").select("id, email").in("id", creatorIds)
      : Promise.resolve({ data: [] as { id: string; email: string | null }[] }),
    supabase.from("announcement_reads").select("announcement_id"),
  ]);

  const emailById = new Map((profiles ?? []).map((p) => [p.id, p.email]));
  const readCountById = new Map<number, number>();
  for (const r of reads ?? []) {
    const id = r.announcement_id as number;
    readCountById.set(id, (readCountById.get(id) ?? 0) + 1);
  }

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    body: row.body,
    severity: row.severity as AdminAnnouncement["severity"],
    active: row.active,
    expiresAt: row.expires_at,
    createdAt: row.created_at,
    createdByEmail: row.created_by ? (emailById.get(row.created_by) ?? null) : null,
    readCount: readCountById.get(row.id) ?? 0,
  }));
}

export interface CreateAnnouncementInput {
  title: string;
  body: string;
  severity: "info" | "warning" | "critical";
  expiresAt: string | null;
}

export async function createAnnouncement(adminId: string, input: CreateAnnouncementInput): Promise<void> {
  const title = input.title.trim().slice(0, 200);
  const body = input.body.trim().slice(0, 2000);
  if (!title || !body) {
    throw new Error("Tiêu đề và nội dung không được để trống.");
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("announcements").insert({
    title,
    body,
    severity: input.severity,
    expires_at: input.expiresAt,
    created_by: adminId,
  });

  if (error) throw new Error(error.message);
}

/** Retracting a broadcast - flips `active` off so it stops showing up for
 *  anyone who hasn't already dismissed it, without deleting the audit trail. */
export async function deactivateAnnouncement(id: number): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("announcements").update({ active: false }).eq("id", id);
  if (error) throw new Error(error.message);
}
