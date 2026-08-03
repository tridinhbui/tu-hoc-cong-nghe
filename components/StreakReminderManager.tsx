"use client";

import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import { getUserStreak } from "@/lib/supabase-streak";
import {
  decideReminder,
  getInactiveDaysCount,
  getStreakRiskStatus,
  reminderShownKey,
  type ReminderKind,
} from "@/lib/streak-reminders";
import { getMotivationLine } from "@/lib/daily-motivation";
import { getRecallCountAction } from "@/lib/recall-actions";

const BANNER_DISMISSED_KEY = "notif-banner-dismissed_v1";

/**
 * Invisible-by-default manager for browser (client-side, Notification API)
 * reminders: streak-about-to-break and spaced-repetition due-today nudges.
 *
 * No Service Worker, no server push - this only fires while the tab is open
 * or when the user switches back to it (visibilitychange). If permission
 * hasn't been asked yet, it shows a small dismissible opt-in banner instead
 * of calling requestPermission() unprompted.
 */
export default function StreakReminderManager({
  userId,
  nextLessonId,
}: {
  userId: string;
  nextLessonId?: number;
}) {
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(true);

  // Resolve initial permission + banner-dismissed state (client-only).
  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    setPermission(Notification.permission);
    setBannerDismissed(window.localStorage.getItem(BANNER_DISMISSED_KEY) === "1");
  }, []);

  const dismissBanner = () => {
    setBannerDismissed(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(BANNER_DISMISSED_KEY, "1");
    }
  };

  const requestNotificationPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    } finally {
      dismissBanner();
    }
  };

  // Check-and-fire logic, run once on mount and again every time the tab
  // becomes visible again.
  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    if (Notification.permission !== "granted") return;

    let cancelled = false;

    // The decide-then-mark-shown sequence below reads then writes
    // localStorage - with 2+ tabs open, both can read "not shown yet"
    // before either writes, firing the same notification twice. Web Locks
    // serializes this across tabs (same-origin, all browsers since ~2020);
    // where it's unavailable this just runs unlocked, same as before -
    // a rare duplicate notification, not a data-integrity issue.
    const withLock = (fn: () => Promise<void>) =>
      "locks" in navigator ? navigator.locks.request("thtcdn-reminder-check", fn) : fn();

    const runCheck = async () => {
      try {
        const streak = await getUserStreak(userId);
        if (cancelled) return;

        const streakRisk = getStreakRiskStatus(streak);
        const dueRecallCount = await getRecallCountAction(nextLessonId);
        // Not currently surfaced in a notification, but computed here per
        // spec (c) - "days in a row without studying" - so future callers
        // (e.g. a re-engagement banner) can read it without recomputation.
        void getInactiveDaysCount(streak);

        await withLock(async () => {
          const alreadyShown = (kind: ReminderKind) =>
            window.localStorage.getItem(reminderShownKey(kind)) === "1";

          const decision = decideReminder({
            streakRisk,
            dueRecallCount,
            alreadyShown,
            // Giọng "giữ lửa": người dùng vẫn còn streak, chỉ là hôm nay chưa
            // học - đúng trạng thái mà getStreakRiskStatus báo isAtRisk.
            motivationLine: getMotivationLine(userId, "keep").text,
          });
          if (!decision) return;

          // Mark shown before firing, still inside the lock, so a second
          // tab that queues behind this one sees it as already-shown the
          // moment it gets the lock.
          window.localStorage.setItem(reminderShownKey(decision.kind), "1");

          const notification = new Notification(decision.title, {
            body: decision.body,
            icon: "/tai-tai-avatar.jpg",
            tag: `thtcdn-reminder-${decision.kind}`,
          });
          notification.onclick = () => {
            window.focus();
            window.location.href = "/dashboard";
          };
        });
      } catch (error) {
        console.error("Error checking streak/recall reminders:", error);
      }
    };

    runCheck();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        runCheck();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [userId, nextLessonId, permission]);

  if (permission !== "default" || bannerDismissed) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto mb-6">
      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3.5 flex items-center gap-3 flex-wrap">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
          <Bell className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
            Bật nhắc nhở để không quên streak và bài ôn tập
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Chỉ nhắc khi bạn đang mở hoặc quay lại tab này.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={requestNotificationPermission}
            className="px-3 py-2 text-sm font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
          >
            Bật thông báo
          </button>
          <button
            onClick={dismissBanner}
            className="px-3 py-2 text-sm font-bold rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors"
          >
            Để sau
          </button>
          <button
            onClick={dismissBanner}
            aria-label="Đóng"
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
