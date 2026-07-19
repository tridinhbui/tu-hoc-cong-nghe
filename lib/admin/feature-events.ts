import { createAdminClient } from "@/lib/supabase-admin";

export interface FeatureEventStat {
  eventName: string;
  label: string | null;
  count: number;
}

// Reads via the service-role client (same pattern as lib/admin/analytics.ts)
// so this never needs a public-facing RPC - feature_click_events has no
// select policy for authenticated/anon at all, only this admin path can
// read it.
export async function getFeatureEventStats(sinceDays: number = 30): Promise<FeatureEventStat[]> {
  const admin = createAdminClient();
  const since = new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000).toISOString();

  const PAGE_SIZE = 1000;
  let page = 0;
  const rows: { event_name: string; metadata: { label?: string } | null }[] = [];

  while (true) {
    const { data, error } = await admin
      .from("feature_click_events")
      .select("event_name, metadata")
      .gte("created_at", since)
      .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

    if (error) throw error;
    if (!data || data.length === 0) break;
    rows.push(...(data as { event_name: string; metadata: { label?: string } | null }[]));
    if (data.length < PAGE_SIZE) break;
    page += 1;
  }

  const byKey = new Map<string, FeatureEventStat>();
  for (const row of rows) {
    const label = row.metadata?.label ?? null;
    const key = row.event_name + "::" + (label ?? "");
    const existing = byKey.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      byKey.set(key, { eventName: row.event_name, label, count: 1 });
    }
  }

  return Array.from(byKey.values()).sort((a, b) => b.count - a.count);
}
