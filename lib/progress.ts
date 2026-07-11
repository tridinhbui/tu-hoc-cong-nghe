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
 * Reconcile the local snapshot with Supabase `user_progress` (the source of
 * truth) by replacing `completedLessons` with the server's list. This used
 * to union the two lists instead of replacing, which meant a lesson marked
 * complete locally but never actually saved server-side (e.g. during the
 * window before progress-saving was fixed, or a completion attempt that
 * failed silently) stayed "completed" in that browser's localStorage
 * forever - inflating the completed-lesson count and XP shown on that one
 * device, and disagreeing with every other device/browser for the same
 * account, which only ever saw the server's real count. Replacing keeps the
 * fast local paint before this resolves, but afterward each device
 * converges on the same server truth.
 */
export function mergeCompletedLessons(serverCompletedIds: number[]): Progress {
  const progress = getProgress();
  progress.completedLessons = [...serverCompletedIds];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
}

export interface QuizAnswers {
  selected: (number | null)[];
  submitted: boolean[];
  results: boolean[];
}

const QUIZ_KEY_PREFIX = "thtcdn_quiz_";

/**
 * Remembers exactly which option was picked for each quiz question, so
 * revisiting a lesson can show precisely which one was wrong (and what was
 * picked) instead of guessing. The Supabase-persisted `quiz_score` is only
 * an aggregate count, not per-question - restoring from it alone had no way
 * to know *which* questions were right, so it arbitrarily marked the first
 * `quiz_score` questions "correct", which usually didn't match what the
 * learner actually got wrong.
 */
export function saveQuizAnswers(lessonId: number, answers: QuizAnswers) {
  if (typeof window === "undefined") return;
  localStorage.setItem(QUIZ_KEY_PREFIX + lessonId, JSON.stringify(answers));
}

export function getQuizAnswers(lessonId: number): QuizAnswers | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(QUIZ_KEY_PREFIX + lessonId);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as QuizAnswers;
  } catch {
    return null;
  }
}

export function clearQuizAnswers(lessonId: number) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(QUIZ_KEY_PREFIX + lessonId);
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
