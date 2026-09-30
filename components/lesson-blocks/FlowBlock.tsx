"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Play, RotateCcw, Workflow } from "lucide-react";
import type { LessonSectionBlock } from "@/lib/lesson-types";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { Sys, btnPrimary, btnSecondary } from "@/components/ui/system";

/** Khối `flow` - xem lib/lesson-types.ts. Sơ đồ chạy từng bước: ngang trên
 *  máy tính, dọc trên điện thoại; một chấm chạy dọc đường nối tới bước đang mở. */
export type FlowBlockProps = Extract<LessonSectionBlock, { type: "flow" }> & { onPass?: () => void };

const RUN_INTERVAL_MS = 1100;

function subscribeReducedMotion(cb: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener?.("change", cb);
  return () => mq.removeEventListener?.("change", cb);
}
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export default function FlowBlock({ title, steps, onPass }: FlowBlockProps) {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const reduced = usePrefersReducedMotion();
  const passed = useRef(false);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = steps.length;
  const lastIdx = n - 1;

  useEffect(() => {
    if (active === lastIdx && !passed.current) {
      passed.current = true;
      onPass?.();
    }
  }, [active, lastIdx, onPass]);

  // "Chạy hết": tự bước từng khâu một, dừng ở cuối.
  useEffect(() => {
    if (!running || active >= lastIdx) return;
    const id = window.setTimeout(() => {
      const next = Math.min(active + 1, lastIdx);
      setActive(next);
      if (next >= lastIdx) setRunning(false);
    }, RUN_INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [running, active, lastIdx]);

  const go = (i: number, focus = false) => {
    setRunning(false);
    const next = Math.max(0, Math.min(lastIdx, i));
    setActive(next);
    if (focus) nodeRefs.current[next]?.focus();
  };

  const runAll = () => {
    if (active >= lastIdx) {
      setActive(0);
      setRunning(!reduced);
      return;
    }
    if (reduced) setActive(lastIdx);
    else setRunning(true);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(active + 1, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(active - 1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      go(lastIdx, true);
    }
  };

  const motion = reduced ? "" : "transition-all duration-700 ease-out";
  const current = steps[active];

  return (
    <section className="my-6 rounded-card border border-line bg-surface p-4 sm:p-5" aria-label={title}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-accent-strong">
          <Workflow className="h-4 w-4" aria-hidden />
          <Sys>{t.lessonBlockVisual.flowBadge}</Sys>
        </div>
        <Sys className="text-ink-muted">{format(t.lessonBlockVisual.stepOf, { n: active + 1, total: n })}</Sys>
      </div>
      <h4 className="mb-4 text-base font-bold text-ink-max">{title}</h4>

      <ol aria-label={t.lessonBlockVisual.stepListLabel} onKeyDown={onKey} className="flex flex-col sm:flex-row">
        {steps.map((s, i) => {
          const done = i < active;
          const isActive = i === active;
          const segFilled = i < active;
          const dotHere = i === active - 1;
          return (
            <li key={i} className="relative flex flex-row gap-3 pb-6 last:pb-0 sm:flex-1 sm:flex-col sm:items-center sm:gap-2 sm:pb-0 sm:text-center">
              {i < lastIdx && (
                <span
                  aria-hidden
                  className="absolute left-4 top-9 bottom-1 w-0.5 -translate-x-1/2 bg-line sm:left-[calc(50%+22px)] sm:right-auto sm:top-4 sm:bottom-auto sm:h-0.5 sm:w-[calc(100%-44px)] sm:translate-x-0 sm:-translate-y-1/2"
                >
                  <span
                    className={`absolute left-0 top-0 w-full bg-brand-600 dark:bg-brand-500 sm:h-full ${motion} ${
                      segFilled ? "h-full sm:w-full" : "h-0 sm:w-0"
                    }`}
                  >
                    {dotHere && (
                      <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-600 dark:bg-brand-500 sm:bottom-auto sm:left-auto sm:right-0 sm:top-1/2 sm:translate-x-1/2 sm:-translate-y-1/2" />
                    )}
                  </span>
                </span>
              )}
              <button
                type="button"
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                onClick={() => go(i)}
                aria-current={isActive ? "step" : undefined}
                tabIndex={isActive ? 0 : -1}
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm font-bold ${
                  reduced ? "" : "transition-colors duration-300"
                } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                  isActive
                    ? "border-brand-600 bg-brand-600 text-white dark:border-brand-400 dark:bg-brand-400 dark:text-[#0d0e11]"
                    : done
                      ? "border-brand-600 bg-accent-soft text-accent-strong dark:border-brand-400"
                      : "border-line-strong bg-surface text-ink-muted"
                }`}
              >
                {isActive && !reduced && (
                  <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-brand-500 opacity-30" />
                )}
                <span className="relative">{i + 1}</span>
              </button>
              <span
                className={`pt-1 text-sm sm:px-1 sm:pt-0 ${isActive ? "font-bold text-ink-max" : done ? "text-ink" : "text-ink-muted"}`}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 rounded-control border border-accent-line bg-accent-soft p-3 sm:p-4" aria-live="polite">
        <p className="mb-1 text-sm font-bold text-accent-strong">
          {active + 1}. {current?.label}
        </p>
        <p key={active} className="text-sm leading-relaxed text-ink" data-testid="flow-detail">
          {current?.detail}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={btnSecondary} onClick={() => go(active - 1)} disabled={active === 0}>
          <ChevronLeft className="h-4 w-4" aria-hidden />
          {t.lessonBlockVisual.prev}
        </button>
        <button type="button" className={btnPrimary} onClick={() => go(active + 1)} disabled={active >= lastIdx}>
          {t.lessonBlockVisual.next}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
        <button type="button" className={btnSecondary} onClick={runAll} disabled={running}>
          {active >= lastIdx ? <RotateCcw className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
          {active >= lastIdx ? t.lessonBlockVisual.restart : t.lessonBlockVisual.runAll}
        </button>
      </div>
    </section>
  );
}
