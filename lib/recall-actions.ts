"use server";

import { RECALL_SCHEDULE, type RecallItem } from "@/lib/recall-schedule";

// Thin Server Action wrapper around RECALL_SCHEDULE so client components
// never import the ~5000-line dataset directly (see lib/recall-schedule.ts's
// "server-only" guard). Returns only the slice for one lesson instead of
// shipping the whole schedule to the browser.
export async function getRecallItemsAction(day: number): Promise<RecallItem[]> {
  return RECALL_SCHEDULE[day] ?? [];
}

export async function getRecallCountAction(day: number | undefined): Promise<number> {
  if (!day) return 0;
  return RECALL_SCHEDULE[day]?.length ?? 0;
}
