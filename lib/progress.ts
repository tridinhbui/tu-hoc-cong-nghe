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
