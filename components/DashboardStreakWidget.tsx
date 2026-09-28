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
} from "@/lib/cloudflare-streak";
import { Frame, btnPrimary } from "@/components/ui/system";

/* i18n-ignore-start: định danh hệ thống, không phải chữ hiển thị */
const SYS = { path: "THCN://APP/STREAK" };
/* i18n-ignore-end */

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

  const featureTile =
    "flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-stone-300 bg-[#f3f1ec] font-mono text-xs font-medium text-ink-body dark:border-stone-700 dark:bg-stone-950";

  const modalContent = showModal && mounted ? (
    createPortal(
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-stone-950/60 p-4 animate-in fade-in duration-200"
        onClick={() => setShowModal(false)}
      >
        <div className="my-auto w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
          <Frame
            title={SYS.path}
            actions={
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label={t.common.close}
                className="flex h-6 w-6 items-center justify-center rounded-xs text-ink-muted transition-colors hover:bg-stone-200 hover:text-ink dark:hover:bg-stone-800 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <X className="h-4 w-4" />
              </button>
            }
            bodyClassName="max-h-[80vh] overflow-y-auto overflow-x-hidden p-6 space-y-5"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-line-strong pb-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-stone-300 bg-[#f3f1ec] text-ink-body dark:border-stone-700 dark:bg-stone-950">
                <Snowflake className="h-5 w-5" />
              </div>
              <div>
                <span className="eyebrow inline-flex items-center gap-1 text-ink-soft">
                  <ShieldCheck className="h-3 w-3" />
                  {t.streakWidget.modalBadge}
                </span>
                <h3 className="mt-1 text-xl font-black tracking-tight text-ink-max">
                  {t.streakWidget.modalTitle}
                </h3>
              </div>
            </div>

            {/* Status Summary */}
            <div className="flex items-center justify-between gap-3 rounded-sm border border-stone-300 bg-[#fbfaf7] p-4 dark:border-stone-700 dark:bg-stone-950">
              <div>
                <p className="text-xs font-black text-ink">{t.streakWidget.statusLabel}</p>
                <p className="mt-0.5 text-xs font-semibold text-ink-soft">
                  {t.streakWidget.freezesRemainingPart1}<strong className="font-mono tabular-nums text-ink-max">{freezesLeft} / {MAX_STREAK_FREEZES}</strong>{t.streakWidget.freezesRemainingPart2}
                </p>
              </div>
              <div className="text-right">
                <span className="rounded-sm border border-amber-300 px-3 py-1.5 text-xs font-black text-warn dark:border-amber-800">
                  <Flame className="inline w-3.5 h-3.5 -mt-0.5" aria-hidden /> {format(t.streakWidget.streakDaysSuffix, { count: streak })}
                </span>
              </div>
            </div>

            {/* Feature Explanations */}
            <div className="divide-y divide-stone-200 border-y border-stone-200 dark:divide-stone-800 dark:border-stone-800">
              <div className="flex items-start gap-3 py-3.5">
                <div className={featureTile}>1</div>
                <div>
                  <h4 className="text-xs font-black text-ink">{t.streakWidget.feature1Title}</h4>
                  <p className="text-xs text-ink-soft mt-1 leading-relaxed">
                    {t.streakWidget.feature1Part1}<strong>{t.streakWidget.feature1Bold1}</strong>{t.streakWidget.feature1Part2}<strong>{t.streakWidget.feature1Bold2}</strong>{t.streakWidget.feature1Part3}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 py-3.5">
                <div className={featureTile}>2</div>
                <div>
                  <h4 className="text-xs font-black text-ink">{t.streakWidget.feature2Title}</h4>
                  <p className="text-xs text-ink-soft mt-1 leading-relaxed">
                    {t.streakWidget.feature2Part1}<strong>{t.streakWidget.feature2Bold}</strong>{t.streakWidget.feature2Part2}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 py-3.5">
                <div className={featureTile}>3</div>
                <div>
                  <h4 className="text-xs font-black text-ink">{t.streakWidget.feature3Title}</h4>
                  <p className="text-xs text-ink-soft mt-1 leading-relaxed">
                    {t.streakWidget.feature3Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Freeze Action Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleManualFreeze}
                disabled={freezing || freezesLeft <= 0}
                className={`${btnPrimary} w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500`}
              >
                <Snowflake className="w-4 h-4" />
                <span>{freezing ? t.streakWidget.freezingButton : t.streakWidget.freezeButton}</span>
              </button>
            </div>
          </Frame>
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
        className="flex items-center gap-2.5 rounded-sm border border-stone-300 bg-white px-3 py-1.5 transition-colors hover:border-stone-950 cursor-pointer group select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-300"
        title={t.streakWidget.cardTitle}
      >
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border ${streak > 0 ? "border-amber-300 bg-amber-50 text-warn dark:border-amber-800 dark:bg-amber-950/30" : "border-stone-300 bg-[#f3f1ec] text-ink-faint dark:border-stone-700 dark:bg-stone-950"}`}>
          <Flame className={`h-4.5 w-4.5 ${streak > 0 ? "fill-current" : ""}`} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-muted">{t.streakWidget.streakLabel}</span>
            <span className="text-[9px] font-bold text-ink-faint">ⓘ</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-black leading-none text-warn">{format(t.streakWidget.streakDaysSuffix, { count: streak })}</span>
            <span className="flex items-center gap-0.5 font-mono text-[10px] font-medium leading-none tabular-nums text-ink-muted" title={format(t.streakWidget.freezesTooltip, { count: freezesLeft })}>
              <ShieldCheck className="w-3 h-3" />
              <span>{freezesLeft}</span>
            </span>
          </div>
        </div>
      </div>

      {modalContent}
    </>
  );
}
