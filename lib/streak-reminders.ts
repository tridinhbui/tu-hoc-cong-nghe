// Pure logic (no React, no DOM) for the client-side browser-notification
// reminder system. Kept separate from StreakReminderManager.tsx so the
// decision logic ("should we nag the user right now?") can be reasoned
// about/tested without touching the Notification API or localStorage.
//
// Reuses the existing streak/recall data instead of re-deriving it:
// - lib/supabase-streak.ts's UserStreak (current_streak, last_activity_date)
// - lib/recall-schedule.ts's RECALL_SCHEDULE, keyed by the same "Day N" used
//   by lesson.recallDay (see lib/lesson-labels.ts's getLessonRecallDay).

import type { UserStreak } from "@/lib/supabase-streak";
import { RECALL_SCHEDULE } from "@/lib/recall-schedule";

// After this local hour, an active streak with no activity yet today is
// treated as "about to be lost" - the whole rest of the evening is prime
// time for a nudge instead of a single arbitrary instant.
export const STREAK_AT_RISK_HOUR = 20;

/** YYYY-MM-DD in the browser's local timezone (matches last_activity_date). */
export function todayDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function daysBetween(fromDateString: string, toDateString: string): number {
  const from = new Date(`${fromDateString}T00:00:00`);
  const to = new Date(`${toDateString}T00:00:00`);
  return Math.round((to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000));
}

export interface StreakRiskStatus {
  /** User has a streak of 1+ days going. */
  hasActiveStreak: boolean;
  /** Streak is active, no activity recorded yet today, and it's late enough
   *  in the day that it's worth warning about losing it. */
  isAtRisk: boolean;
  currentStreak: number;
}

/**
 * Whether the user's current streak is in danger of breaking today.
 * "At risk" = streak > 0, no activity logged for today's date yet, and the
 * local clock is past STREAK_AT_RISK_HOUR.
 */
export function getStreakRiskStatus(
  streak: UserStreak | null,
  now: Date = new Date()
): StreakRiskStatus {
  const currentStreak = streak?.current_streak ?? 0;
  const hasActiveStreak = currentStreak > 0;

  if (!hasActiveStreak || !streak) {
    return { hasActiveStreak, isAtRisk: false, currentStreak };
  }

  const today = todayDateString(now);
  const activeToday = streak.last_activity_date === today;
  const isLateEnough = now.getHours() >= STREAK_AT_RISK_HOUR;

  return {
    hasActiveStreak,
    isAtRisk: !activeToday && isLateEnough,
    currentStreak,
  };
}

/**
 * How many days in a row the user has NOT studied, based on their last
 * recorded activity date. 0 means they studied today or have no streak
 * record at all (nothing to warn about).
 */
export function getInactiveDaysCount(streak: UserStreak | null, now: Date = new Date()): number {
  if (!streak?.last_activity_date) return 0;
  const today = todayDateString(now);
  const gap = daysBetween(streak.last_activity_date, today);
  return Math.max(0, gap);
}

/**
 * Number of spaced-repetition recall items due for the next lesson the user
 * hasn't completed yet. Reuses RECALL_SCHEDULE (the same table RecallCard
 * reads from) instead of re-deriving the "which lessons attach a recall
 * check" mapping - a lesson's recall items become "due" the moment that
 * lesson is next up in the queue.
 */
export function getDueRecallCount(nextLessonId: number | undefined): number {
  if (!nextLessonId) return 0;
  return RECALL_SCHEDULE[nextLessonId]?.length ?? 0;
}

export type ReminderKind = "streak" | "recall";

/** localStorage key so a reminder kind is shown at most once per calendar day. */
export function reminderShownKey(kind: ReminderKind, now: Date = new Date()): string {
  return `reminder-shown-${todayDateString(now)}-${kind}`;
}

export interface ReminderDecision {
  kind: ReminderKind;
  title: string;
  body: string;
}

/**
 * Decide which single notification (if any) should fire right now, given
 * streak risk + due recall counts and which reminder kinds have already
 * been shown today. Streak risk takes priority since it's time-sensitive;
 * recall reminders are evergreen for the day.
 */
export function decideReminder(params: {
  streakRisk: StreakRiskStatus;
  dueRecallCount: number;
  alreadyShown: (kind: ReminderKind) => boolean;
}): ReminderDecision | null {
  const { streakRisk, dueRecallCount, alreadyShown } = params;

  if (streakRisk.isAtRisk && !alreadyShown("streak")) {
    return {
      kind: "streak",
      title: "Sắp hết ngày rồi!",
      body: `Học 1 bài để giữ streak ${streakRisk.currentStreak} ngày của bạn nhé.`,
    };
  }

  if (dueRecallCount > 0 && !alreadyShown("recall")) {
    return {
      kind: "recall",
      title: "Có bài ôn tập đến hạn",
      body:
        dueRecallCount === 1
          ? "Bạn có 1 bài ôn tập đến hạn hôm nay."
          : `Bạn có ${dueRecallCount} bài ôn tập đến hạn hôm nay.`,
    };
  }

  return null;
}
