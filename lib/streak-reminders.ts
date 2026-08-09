// Pure logic (no React, no DOM) for the client-side browser-notification
// reminder system. Kept separate from StreakReminderManager.tsx so the
// decision logic ("should we nag the user right now?") can be reasoned
// about/tested without touching the Notification API or localStorage.
//
// Reuses lib/supabase-streak.ts's UserStreak (current_streak,
// last_activity_date). Recall-item counting used to live here too (reading
// lib/recall-schedule.ts's RECALL_SCHEDULE directly), but that's a ~5000-line
// generated dataset - importing it here pulled the whole thing into the
// client bundle of every component that imports this file (this one is
// imported by the client-side StreakReminderManager.tsx). Moved to
// lib/recall-actions.ts's getRecallCountAction, a Server Action that returns
// just the count.

import type { UserStreak } from "@/lib/supabase-streak";

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

export type ReminderKind = "streak" | "recall";

/** localStorage key so a reminder kind is shown at most once per calendar day. */
export function reminderShownKey(kind: ReminderKind, now: Date = new Date()): string {
  return `reminder-shown-${todayDateString(now)}-${kind}`;
}

export interface ReminderStrings {
  streakTitle: string;
  /** Chứa {days}. */
  streakBody: string;
  recallTitle: string;
  recallBodyOne: string;
  /** Chứa {count}. */
  recallBodyMany: string;
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
  /** Lời nhắn "ngọn lửa đinh hoả" kèm theo, nếu caller có userId để chọn được
   *  một câu (lib/daily-motivation.ts). Bỏ trống thì thông báo giữ nguyên như
   *  cũ - hàm này vẫn thuần và test được mà không cần dựng pool. */
  motivationLine?: string;
  /** Chữ của thông báo. Nhận vào thay vì viết cứng: hàm này chạy ở client và
   *  người đọc có thể đang dùng tiếng Anh, còn bản thân nó phải thuần để test
   *  được mà không dựng cả từ điển. */
  strings: ReminderStrings;
}): ReminderDecision | null {
  const { streakRisk, dueRecallCount, alreadyShown, motivationLine, strings } = params;
  const withMotivation = (body: string) =>
    motivationLine ? `${body}\n🔥 ${motivationLine}` : body;

  if (streakRisk.isAtRisk && !alreadyShown("streak")) {
    return {
      kind: "streak",
      title: strings.streakTitle,
      body: withMotivation(
        strings.streakBody.replace("{days}", String(streakRisk.currentStreak))
      ),
    };
  }

  if (dueRecallCount > 0 && !alreadyShown("recall")) {
    return {
      kind: "recall",
      title: strings.recallTitle,
      body: (dueRecallCount === 1 ? strings.recallBodyOne : strings.recallBodyMany).replace(
        "{count}",
        String(dueRecallCount)
      ),
    };
  }

  return null;
}
