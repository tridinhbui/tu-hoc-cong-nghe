export interface Progress {
  completedLessons: number[];
  streak: number;
  lastStudiedDate: string | null;
  totalMinutes: number;
}

const STORAGE_KEY = "thtcdn_progress";

export function getProgress(): Progress {
  if (typeof window === "undefined") {
    return { completedLessons: [], streak: 0, lastStudiedDate: null, totalMinutes: 0 };
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { completedLessons: [], streak: 0, lastStudiedDate: null, totalMinutes: 0 };
  return JSON.parse(raw);
}

/**
 * Merge server-confirmed completed lesson ids (Supabase `user_progress`,
 * the source of truth) into the local snapshot. localStorage alone can't be
 * trusted across devices/browsers/incognito, so on every dashboard load we
 * union it with the server's list and persist the union — this is what
 * keeps a fresh browser session from showing 0% progress for a user who has
 * actually completed lessons elsewhere.
 */
export function mergeCompletedLessons(serverCompletedIds: number[]): Progress {
  const progress = getProgress();
  const merged = new Set(progress.completedLessons);
  let changed = false;
  for (const id of serverCompletedIds) {
    if (!merged.has(id)) {
      merged.add(id);
      changed = true;
    }
  }
  if (changed) {
    progress.completedLessons = Array.from(merged);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
  return progress;
}

export function markLessonComplete(lessonId: number, minutes: number) {
  const progress = getProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    progress.totalMinutes += minutes;
  }

  const today = new Date().toDateString();
  if (progress.lastStudiedDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (progress.lastStudiedDate === yesterday.toDateString()) {
      progress.streak += 1;
    } else if (progress.lastStudiedDate !== today) {
      progress.streak = 1;
    }
    progress.lastStudiedDate = today;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
}
