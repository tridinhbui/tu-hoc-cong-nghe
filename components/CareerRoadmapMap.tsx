"use client";

import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackFeatureClick } from "@/lib/feature-events";
import type { FinanceCareer } from "@/lib/finance-careers";
import { useI18n } from "@/lib/i18n/context";
import { mergeCareer } from "@/lib/finance-careers-i18n";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

// "Bắt đầu từ Zero" overview: a 3-level tree (root -> category -> career)
// giving a newcomer a mental map of the whole career landscape before they
// dive into the filterable grid below it. Connectors are drawn with plain
// CSS borders (a well-known "org chart" pattern) rather than SVG paths
// measured off live DOM node positions - the latter would need a
// ResizeObserver to stay correct across every viewport width/font-size,
// which is exactly the kind of thing that quietly breaks on mobile. Borders
// reflow for free.
//
// The tree is laid out on a fixed-size canvas wider/taller than its
// viewport and panned/zoomed via pointer drag + wheel (Canva/Figma-style),
// instead of relying on native scroll - this keeps all four category
// branches visually connected to one root as you explore, rather than
// scrolling them out of view of their trunk connector.

function categoryMeta(
  t: Dictionary
): Record<FinanceCareer["category"], { label: string; color: string; border: string; bg: string }> {
  return {
    investment: { label: t.careerRoadmap.catInvestmentLabel, color: "#10b981", border: "border-emerald-300 dark:border-emerald-800", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
    accounting: { label: t.careerRoadmap.catAccountingLabel, color: "#3b82f6", border: "border-blue-300 dark:border-blue-800", bg: "bg-blue-50 dark:bg-blue-950/30" },
    banking: { label: t.careerRoadmap.catBankingLabel, color: "#f59e0b", border: "border-amber-300 dark:border-amber-800", bg: "bg-amber-50 dark:bg-amber-950/30" },
    advisory: { label: t.careerRoadmap.catAdvisoryLabel, color: "#8b5cf6", border: "border-violet-300 dark:border-violet-800", bg: "bg-violet-50 dark:bg-violet-950/30" },
    data: { label: t.careerRoadmap.catDataLabel, color: "#0ea5e9", border: "border-sky-300 dark:border-sky-800", bg: "bg-sky-50 dark:bg-sky-950/30" },
  };
}

const CATEGORY_ORDER: FinanceCareer["category"][] = ["investment", "banking", "accounting", "advisory", "data"];

const MIN_SCALE = 0.5;
const MAX_SCALE = 1.6;
const CANVAS_WIDTH = 1180;

export default function CareerRoadmapMap({
  careers,
  onSelectCareer,
}: {
  careers: FinanceCareer[];
  onSelectCareer: (career: FinanceCareer) => void;
}) {
  const { t, locale } = useI18n();
  const CATEGORY_META = useMemo(() => categoryMeta(t), [t]);
  const [expanded, setExpanded] = useState(true);
  const [view, setView] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ pointerX: number; pointerY: number; viewX: number; viewY: number } | null>(null);

  const byCategory = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    meta: CATEGORY_META[cat],
    items: careers.filter((c) => c.category === cat),
  }));

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragStart.current = { pointerX: e.clientX, pointerY: e.clientY, viewX: view.x, viewY: view.y };
    setIsDragging(true);
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.pointerX;
    const dy = e.clientY - dragStart.current.pointerY;
    setView((v) => ({ ...v, x: dragStart.current!.viewX + dx, y: dragStart.current!.viewY + dy }));
  }

  function handlePointerUp() {
    dragStart.current = null;
    setIsDragging(false);
  }

  function handleWheel(e: ReactWheelEvent<HTMLDivElement>) {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setView((v) => ({ ...v, scale: Math.min(MAX_SCALE, Math.max(MIN_SCALE, v.scale + delta)) }));
  }

  function zoomBy(delta: number) {
    setView((v) => ({ ...v, scale: Math.min(MAX_SCALE, Math.max(MIN_SCALE, v.scale + delta)) }));
  }

  function resetView() {
    setView({ x: 0, y: 0, scale: 1 });
  }

  return (
    <div className="rounded-3xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm overflow-hidden mb-6">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 sm:px-6 sm:py-5 text-left cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="shrink-0 rounded-xl border-2 border-emerald-500 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            {t.careerRoadmap.mapBadge}
          </span>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100">
              {t.careerRoadmap.mapHeading}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              {t.careerRoadmap.mapSubheading}
            </p>
          </div>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-stone-900 dark:bg-stone-100 px-3.5 py-2 text-xs font-black text-white dark:text-stone-900 shadow-sm hover:opacity-90 transition-opacity">
          {expanded ? t.careerRoadmap.collapseCta : t.careerRoadmap.expandCta}
          <span
            className={`inline-block transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            ▾
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="relative">
              {/* Zoom/reset controls, overlaid top-right of the canvas viewport */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full border border-stone-200 dark:border-stone-700 bg-white/90 dark:bg-stone-900/90 backdrop-blur px-1 py-1 shadow-sm">
                <button
                  onClick={() => zoomBy(-0.15)}
                  aria-label={t.careerRoadmap.zoomOutAria}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-black text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  −
                </button>
                <button
                  onClick={resetView}
                  aria-label={t.careerRoadmap.resetAria}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  ⟳
                </button>
                <button
                  onClick={() => zoomBy(0.15)}
                  aria-label={t.careerRoadmap.zoomInAria}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-black text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Draggable/zoomable viewport - fixed height so vertical pan has
                  somewhere to go, touch-none so mobile drag doesn't also
                  scroll the page underneath it. */}
              <div
                className={`relative h-[340px] sm:h-[380px] overflow-hidden bg-stone-50/50 dark:bg-stone-950/30 touch-none ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onWheel={handleWheel}
              >
                <div
                  className="absolute top-6 left-1/2"
                  style={{
                    width: CANVAS_WIDTH,
                    marginLeft: -CANVAS_WIDTH / 2,
                    transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
                    transformOrigin: "top center",
                    transition: isDragging ? "none" : "transform 0.15s ease-out",
                  }}
                >
                  {/* Root node */}
                  <div className="flex justify-center">
                    <div className="inline-flex items-center gap-2 rounded-2xl border-2 border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 px-5 py-3 shadow-md select-none">
                      <span className="text-sm font-black text-white dark:text-stone-900">{t.careerRoadmap.rootNodeLabel}</span>
                    </div>
                  </div>

                  {/* Trunk connector */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-stone-300 dark:bg-stone-700" />
                  </div>

                  {/* Category branches */}
                  <div className="flex items-start justify-center gap-5">
                    {byCategory.map(({ category, meta, items }) => (
                      <div key={category} className="flex flex-col items-center" style={{ width: 260 }}>
                        <div className="w-0.5 h-4 bg-stone-300 dark:bg-stone-700" />

                        <div className={`w-full rounded-2xl border-2 ${meta.border} ${meta.bg} px-4 py-3 text-center select-none`}>
                          <span className="text-xs font-black uppercase tracking-wide" style={{ color: meta.color }}>
                            {meta.label}
                          </span>
                          <span className="block text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                            {format(t.careerRoadmap.positionCount, { count: items.length })}
                          </span>
                        </div>

                        <div className="w-0.5 h-4 bg-stone-300 dark:bg-stone-700" />

                        <div className="w-full flex flex-wrap justify-center gap-1.5">
                          {items.map((career) => (
                            <button
                              key={career.id}
                              onClick={() => {
                                onSelectCareer(career);
                                trackFeatureClick("career_roadmap_node_click", { label: career.id });
                              }}
                              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-950/40 px-2.5 py-1.5 text-[11px] font-bold text-stone-700 dark:text-stone-300 hover:border-stone-900 dark:hover:border-stone-100 hover:bg-white dark:hover:bg-stone-900 transition-colors cursor-pointer"
                            >
                              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: meta.color }} />
                              <span>{mergeCareer(career, locale).title}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
