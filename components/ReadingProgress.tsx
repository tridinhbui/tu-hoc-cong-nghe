"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, PartyPopper } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { Sys } from "@/components/ui/system";

interface ReadingProgressProps {
  progress: number; // 0-100
  onMilestone?: (milestone: number) => void;
}

const CHECKPOINTS = [25, 50, 75, 100];
const AUTO_HIDE_MS = 1800;
const DRAG_DISMISS_PX = 30;

export default function ReadingProgress({ progress, onMilestone }: ReadingProgressProps) {
  const { t } = useI18n();
  const [celebratingMilestone, setCelebratingMilestone] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const previousMilestoneRef = useRef(0);
  const flashedRef = useRef<Set<number>>(new Set());
  const hideTimerRef = useRef<number | null>(null);
  const dragStartXRef = useRef<number | null>(null);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  // Expand for a short moment, then auto-hide so the track never lingers
  // over the article text while someone is trying to read.
  const flashOpen = useCallback(() => {
    clearHideTimer();
    setIsCollapsed(false);
    hideTimerRef.current = window.setTimeout(() => {
      setIsCollapsed(true);
      hideTimerRef.current = null;
    }, AUTO_HIDE_MS);
  }, [clearHideTimer]);

  useEffect(() => clearHideTimer, [clearHideTimer]);

  // Flash open once each time reading crosses near a checkpoint (25/50/75/100%),
  // instead of staying expanded for the whole +-5% window around it.
  useEffect(() => {
    const hit = CHECKPOINTS.find((cp) => Math.abs(progress - cp) <= 2 && !flashedRef.current.has(cp));
    if (hit) {
      flashedRef.current.add(hit);
      flashOpen();
    }
  }, [progress, flashOpen]);

  useEffect(() => {
    const currentMilestone = CHECKPOINTS.find((m) => progress >= m && m > previousMilestoneRef.current);

    if (!currentMilestone) return;

    const timeoutId = window.setTimeout(() => {
      setCelebratingMilestone(currentMilestone);
      onMilestone?.(currentMilestone);
    }, 0);

    previousMilestoneRef.current = currentMilestone;

    return () => window.clearTimeout(timeoutId);
  }, [progress, onMilestone]);

  useEffect(() => {
    if (celebratingMilestone === null) return;

    const timer = window.setTimeout(() => setCelebratingMilestone(null), 3000);
    return () => window.clearTimeout(timer);
  }, [celebratingMilestone]);

  // Calculate brightness based on proximity to milestones
  const isNearMilestone = CHECKPOINTS.some(cp => Math.abs(progress - cp) <= 5);

  // Collapse when clicking anywhere on the page (outside the progress bar)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const progressContainer = target.closest('[data-progress-bar]');
      if (!progressContainer && !isCollapsed) {
        clearHideTimer();
        setIsCollapsed(true);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isCollapsed, clearHideTimer]);

  // Let people swipe/drag the open track to the left to dismiss it manually.
  function handleDragStart(e: React.PointerEvent) {
    dragStartXRef.current = e.clientX;
  }
  function handleDragMove(e: React.PointerEvent) {
    if (dragStartXRef.current === null) return;
    if (e.clientX - dragStartXRef.current < -DRAG_DISMISS_PX) {
      dragStartXRef.current = null;
      clearHideTimer();
      setIsCollapsed(true);
    }
  }
  function handleDragEnd() {
    dragStartXRef.current = null;
  }

  return (
    <div data-progress-bar className={`flex flex-col items-center gap-3 transition-opacity duration-150 ${isNearMilestone ? "opacity-100" : "opacity-30"}`}>
      {/* Thu gọn: một thước nhỏ, vuông cạnh, phần đã đọc tô xanh. */}
      {isCollapsed ? (
        <button
          onClick={() => flashOpen()}
          className="group flex cursor-pointer flex-col items-center gap-1.5"
          title={t.readingProgress.open}
        >
          <span className="relative block h-20 w-2 overflow-hidden rounded-xs border border-line-strong bg-white transition-colors group-hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900">
            <motion.span
              className="absolute inset-x-0 bottom-0 block bg-brand-600 dark:bg-brand-500"
              animate={{ height: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </span>
          <Sys className="tabular-nums text-ink-muted">{progress}%</Sys>
        </button>
      ) : (
        <div
          className="flex touch-none flex-col items-center gap-3"
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
        >
          <div className={`text-ink-max transition-opacity ${progress >= 100 ? "opacity-100" : "opacity-30"}`}>
            <Flag className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </div>

          {/* Thước dọc: rãnh 1px, vạch mốc mono bên phải. */}
          <div className="relative h-72 w-2 rounded-xs border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900">
            <motion.div
              className="absolute inset-x-0 bottom-0 bg-brand-600 dark:bg-brand-500"
              animate={{ height: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {CHECKPOINTS.map((cp) => (
              <div
                key={cp}
                className="absolute left-0 flex items-center"
                style={{ bottom: `${cp}%`, transform: "translateY(50%)" }}
              >
                <span
                  aria-hidden
                  className={`block h-px w-3 ${progress >= cp ? "bg-brand-600 dark:bg-brand-500" : "bg-stone-400 dark:bg-stone-600"}`}
                />
                <Sys className={`ml-1.5 tabular-nums ${progress >= cp ? "text-ink-max" : "text-ink-faint"}`}>
                  {cp === 100 ? <Flag className="h-3 w-3" aria-hidden /> : `${cp}%`}
                </Sys>
              </div>
            ))}

            {/* Vị trí hiện tại: ô vuông mực */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              animate={{ bottom: `${Math.min(progress, 97)}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <span className="block h-2.5 w-2.5 rounded-[1px] border border-white bg-stone-950 dark:border-stone-950 dark:bg-stone-100" aria-hidden />
            </motion.div>
          </div>

          <div className="text-center">
            <p className="font-mono text-xl font-medium tabular-nums text-ink-max">{progress}%</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-ink-muted">{t.readingProgress.reading}</p>
          </div>

          <button
            onClick={() => {
              clearHideTimer();
              setIsCollapsed(true);
            }}
            className="text-[10px] font-bold uppercase tracking-[0.08em] text-ink-muted transition-colors hover:text-ink-max"
            title={t.readingProgress.closeTitle}
          >
            {t.readingProgress.close}
          </button>
        </div>
      )}

      {/* Celebration animation for milestones */}
      <AnimatePresence>
        {celebratingMilestone && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed left-1/2 top-1/4 z-50 -translate-x-1/2 rounded-md border border-stone-700 bg-stone-950 px-5 py-3.5 text-center text-white"
          >
            <div className="mb-1 flex justify-center text-brand-300">{celebratingMilestone === 100 ? <Flag className="w-6 h-6" strokeWidth={1.75} aria-hidden /> : <PartyPopper className="w-6 h-6" strokeWidth={1.75} aria-hidden />}</div>
            <p className="font-bold">
              {celebratingMilestone === 100
                ? t.readingProgress.finished
                : format(t.readingProgress.congrats, { percent: celebratingMilestone })}
            </p>
            <p className="mt-1 text-xs text-stone-300">{t.readingProgress.keepGoing}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
