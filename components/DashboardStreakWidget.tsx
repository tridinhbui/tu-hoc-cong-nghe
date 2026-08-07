"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Flame, ShieldCheck, Snowflake, X } from "lucide-react";
import { toast } from "sonner";
import { useIsClient } from "@/lib/use-is-client";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import {
  getUserStreak,
  hasActivityToday as checkActivityToday,
  getRemainingStreakFreezes,
  freezeStreakManually,
  MAX_STREAK_FREEZES,
  type UserStreak,
} from "@/lib/supabase-streak";

export default function DashboardStreakWidget({ userId }: { userId: string }) {
  const { t } = useI18n();
  const [streak, setStreak] = useState(0);
  const [freezesLeft, setFreezesLeft] = useState(3);
  const [hasActivityToday, setHasActivityToday] = useState(false);
  const [streakRow, setStreakRow] = useState<UserStreak | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [freezing, setFreezing] = useState(false);
  const mounted = useIsClient();

  useEffect(() => {
    let cancelled = false;

    getUserStreak(userId)
      .then((streakData) => {
        if (cancelled) return;
        setStreak(streakData?.current_streak || 0);
        setFreezesLeft(getRemainingStreakFreezes(streakData));
        setStreakRow(streakData);
      })
      .catch((error) => console.error("Error loading streak:", error));

    checkActivityToday(userId)
      .then((todayActivity) => {
        if (!cancelled) setHasActivityToday(todayActivity);
      })
      .catch((error) => console.error("Error checking today activity:", error));

    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!showModal) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  const handleManualFreeze = async () => {
    if (freezesLeft <= 0) {
      toast.error(t.streakWidget.toastNoFreezesLeft);
      return;
    }
    setFreezing(true);
    try {
      const updated = await freezeStreakManually(userId);
      setStreakRow(updated);
      setFreezesLeft(getRemainingStreakFreezes(updated));
      setHasActivityToday(true);
      toast.success(t.streakWidget.toastFreezeActivated);
    } catch (error) {
      console.error("Error freezing streak:", error);
      toast.error(error instanceof Error ? error.message : t.streakWidget.toastFreezeFailed);
    } finally {
      setFreezing(false);
    }
  };

  const modalContent = showModal && mounted ? (
    createPortal(
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-stone-950/80 p-4 backdrop-blur-md animate-in fade-in duration-200"
        onClick={() => setShowModal(false)}
      >
        <div
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-[24px] border border-sky-300/80 dark:border-sky-800 bg-white p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] dark:bg-stone-900 space-y-5 my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 transition-all duration-200 ease-out hover:scale-105 cursor-pointer focus-visible:outline-none"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-white shadow-[0_12px_24px_-18px_rgba(59,130,246,0.35)] shrink-0">
              <Snowflake className="h-6 w-6 animate-spin-slow" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                <ShieldCheck className="w-3 h-3 text-sky-600" />
                {t.streakWidget.modalBadge}
              </span>
              <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 mt-1">
                {t.streakWidget.modalTitle}
              </h3>
            </div>
          </div>

          {/* Status Summary Pill */}
          <div className="rounded-[18px] border border-sky-200 dark:border-sky-900 bg-gradient-to-r from-sky-50 via-blue-50/50 to-indigo-50 dark:from-sky-950/40 dark:to-stone-900 p-4 flex items-center justify-between shadow-xs">
            <div>
              <p className="text-xs font-black text-stone-900 dark:text-stone-100">{t.streakWidget.statusLabel}</p>
              <p className="text-xs font-extrabold text-sky-700 dark:text-sky-300 mt-0.5">
                {t.streakWidget.freezesRemainingPart1}<strong>{freezesLeft} / {MAX_STREAK_FREEZES}</strong>{t.streakWidget.freezesRemainingPart2}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-orange-600 dark:text-orange-400 bg-white dark:bg-stone-800 px-3 py-1.5 rounded-[16px] border border-orange-200 dark:border-orange-900 shadow-xs">
                🔥 {format(t.streakWidget.streakDaysSuffix, { count: streak })}
              </span>
            </div>
          </div>

          {/* Feature Explanations */}
          <div className="space-y-3">
            <div className="rounded-[18px] border border-stone-200 dark:border-stone-800 p-3.5 flex items-start gap-3 bg-stone-50/50 dark:bg-stone-800/40">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[14px] bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-300 font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="text-xs font-black text-stone-900 dark:text-stone-100">{t.streakWidget.feature1Title}</h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                  {t.streakWidget.feature1Part1}<strong>{t.streakWidget.feature1Bold1}</strong>{t.streakWidget.feature1Part2}<strong>{t.streakWidget.feature1Bold2}</strong>{t.streakWidget.feature1Part3}
                </p>
              </div>
            </div>

            <div className="rounded-[18px] border border-stone-200 dark:border-stone-800 p-3.5 flex items-start gap-3 bg-stone-50/50 dark:bg-stone-800/40">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[14px] bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="text-xs font-black text-stone-900 dark:text-stone-100">{t.streakWidget.feature2Title}</h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                  {t.streakWidget.feature2Part1}<strong>{t.streakWidget.feature2Bold}</strong>{t.streakWidget.feature2Part2}
                </p>
              </div>
            </div>

            <div className="rounded-[18px] border border-stone-200 dark:border-stone-800 p-3.5 flex items-start gap-3 bg-stone-50/50 dark:bg-stone-800/40">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[14px] bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300 font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="text-xs font-black text-stone-900 dark:text-stone-100">{t.streakWidget.feature3Title}</h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                  {t.streakWidget.feature3Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Freeze Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleManualFreeze}
              disabled={freezing || freezesLeft <= 0}
              className="button-premium w-full py-3.5 rounded-[18px] font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 disabled:opacity-50 transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 focus-visible:outline-none"
            >
              <Snowflake className="w-4 h-4" />
              <span>{freezing ? t.streakWidget.freezingButton : t.streakWidget.freezeButton}</span>
            </button>
          </div>
        </div>
      </div>,
      document.body
    )
  ) : null;

  return (
    <>
      {/* Interactive Streak Card Button */}
      <div
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2.5 rounded-[18px] border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-3 py-1.5 shadow-[0_8px_18px_-18px_rgba(15,23,42,0.14)] hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-200 ease-out hover:-translate-y-0.5 cursor-pointer group select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-500/10"
        title={t.streakWidget.cardTitle}
      >
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${streak > 0 ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-2xs" : "bg-stone-100 dark:bg-stone-800 text-stone-400"}`}>
          <Flame className={`h-4.5 w-4.5 ${streak > 0 ? "fill-white text-white" : "fill-current"}`} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">{t.streakWidget.streakLabel}</span>
            <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400">ⓘ</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-black leading-none text-orange-600 dark:text-orange-400">{format(t.streakWidget.streakDaysSuffix, { count: streak })}</span>
            <span className="flex items-center gap-0.5 text-[10px] font-semibold leading-none text-sky-600 dark:text-sky-400" title={format(t.streakWidget.freezesTooltip, { count: freezesLeft })}>
              <ShieldCheck className="w-3 h-3 text-sky-500" />
              <span>{freezesLeft}</span>
            </span>
          </div>
        </div>
      </div>

      {modalContent}
    </>
  );
}
