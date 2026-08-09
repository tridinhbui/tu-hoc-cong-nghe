"use server";

import { RECALL_SCHEDULE, type RecallItem } from "@/lib/recall-schedule";
import { localizeRecallItems } from "@/lib/recall-i18n";
import { getServerLocale } from "@/lib/i18n/server";

// Thin Server Action wrapper around RECALL_SCHEDULE so client components
// never import the ~5000-line dataset directly (see lib/recall-schedule.ts's
// "server-only" guard). Returns only the slice for one lesson instead of
// shipping the whole schedule to the browser.
export async function getRecallItemsAction(day: number): Promise<RecallItem[]> {
  // Dịch ở ĐÂY chứ không ở component: thẻ nhớ lại được render bởi một client
  // component, mà bản dịch phải đọc file bài học ở server. Server Action này
  // vốn đã là cửa duy nhất dữ liệu đi qua.
  return localizeRecallItems(RECALL_SCHEDULE[day] ?? [], await getServerLocale());
}

export async function getRecallCountAction(day: number | undefined): Promise<number> {
  if (!day) return 0;
  return RECALL_SCHEDULE[day]?.length ?? 0;
}
