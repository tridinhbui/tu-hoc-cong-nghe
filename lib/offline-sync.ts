import { createClient } from "@/lib/supabase";
import { markLessonComplete } from "@/lib/supabase-progress";

export interface OfflineCompletion {
  userId: string;
  lessonId: number;
  score: number;
  timeSpentSeconds: number;
  timestamp: number;
}

const QUEUE_KEY = "thtcdn_offline_completions";

export function queueOfflineCompletion(userId: string, lessonId: number, score: number, timeSpentSeconds: number) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    const queue: OfflineCompletion[] = raw ? JSON.parse(raw) : [];
    
    // Avoid duplicates
    const exists = queue.some(item => item.userId === userId && item.lessonId === lessonId);
    if (!exists) {
      queue.push({
        userId,
        lessonId,
        score,
        timeSpentSeconds,
        timestamp: Date.now()
      });
      localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    }
  } catch (e) {
    console.error("Error queueing offline completion:", e);
  }
}

export function removeOfflineCompletion(userId: string, lessonId: number) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    if (!raw) return;
    const queue: OfflineCompletion[] = JSON.parse(raw);
    const filtered = queue.filter(item => !(item.userId === userId && item.lessonId === lessonId));
    if (filtered.length > 0) {
      localStorage.setItem(QUEUE_KEY, JSON.stringify(filtered));
    } else {
      localStorage.removeItem(QUEUE_KEY);
    }
  } catch (e) {
    console.error("Error removing offline completion:", e);
  }
}

export async function syncOfflineQueue(userId: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    if (!raw) return false;
    const queue: OfflineCompletion[] = JSON.parse(raw);
    const userQueue = queue.filter(item => item.userId === userId);
    const otherQueue = queue.filter(item => item.userId !== userId);

    if (userQueue.length === 0) return false;

    let didSyncAny = false;
    const remainingUserQueue: OfflineCompletion[] = [];

    for (const item of userQueue) {
      try {
        // Try saving to Supabase
        await markLessonComplete(item.userId, item.lessonId, item.score, item.timeSpentSeconds);
        didSyncAny = true;
      } catch (err) {
        console.error(`Failed to sync lesson ${item.lessonId} from offline queue:`, err);
        remainingUserQueue.push(item);
      }
    }

    // Save back the combined remaining items
    const finalQueue = [...otherQueue, ...remainingUserQueue];
    if (finalQueue.length > 0) {
      localStorage.setItem(QUEUE_KEY, JSON.stringify(finalQueue));
    } else {
      localStorage.removeItem(QUEUE_KEY);
    }

    return didSyncAny;
  } catch (e) {
    console.error("Error syncing offline queue:", e);
    return false;
  }
}
