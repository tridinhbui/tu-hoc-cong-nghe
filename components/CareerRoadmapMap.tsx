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
    dealmaking: { label: t.careerRoadmap.catDealmakingLabel, color: "#0284c7", border: "border-sky-300 dark:border-sky-800", bg: "bg-sky-50 dark:bg-sky-950/30" },
    risk: { label: t.careerRoadmap.catRiskLabel, color: "#e11d48", border: "border-rose-300 dark:border-rose-800", bg: "bg-rose-50 dark:bg-rose-950/30" },
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
    <div className="mb-6 overflow-hidden rounded-lg border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left sm:px-6"
      >
        <div className="min-w-0">
          {/* Nhãn "BẢN ĐỒ" từ viên thuốc viền xanh 2px xuống chữ mào. Nó là
              nhãn phân loại của khối, không phải một trạng thái - và màu xanh
              để dành cho lựa chọn hiện tại trong chính bản đồ bên dưới. */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400 dark:text-stone-500">
            {t.careerRoadmap.mapBadge}
          </p>
          <h2 className="text-base font-bold tracking-tight text-stone-900 sm:text-lg dark:text-stone-100">
            {t.careerRoadmap.mapHeading}
          </h2>
          <p className="text-xs text-stone-500 sm:text-sm dark:text-stone-400">
            {t.careerRoadmap.mapSubheading}
          </p>
        </div>
        {/* Nút gập từ viên thuốc nền đen đặc xuống chữ + mũi tên. Nó là một
            công tắc phụ, không phải hành động chính của trang. */}
        <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-stone-500 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">
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
                  {/* BẢN ĐỒ THÔNG TIN, KHÔNG PHẢI MỘT DÀN NÚT.
                      Trước đây: một nút gốc nền đen bo 16px có shadow, bảy hộp
                      nhóm mỗi hộp viền 2px và nền màu riêng, rồi ba mươi sáu
                      viên thuốc bo tròn hoàn toàn - mỗi chức danh trông y hệt
                      một cái nút bấm, và bảy màu nền cạnh nhau thành cầu vồng.
                      Không có gì trong đó nói cho mắt biết cái nào là gốc, cái
                      nào là nhánh, cái nào là lá.
                      Giờ cấp bậc do CHỮ và ĐƯỜNG KẺ dựng: gốc là một dòng chữ
                      hoa nhỏ, mỗi nhóm là một cột có tiêu đề trên một đường kẻ,
                      chức danh là chữ trần xếp dọc. Màu nhóm còn đúng một chấm
                      3px cạnh tiêu đề cột. */}
                  <div className="flex justify-center">
                    <span className="select-none text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                      {t.careerRoadmap.rootNodeLabel}
                    </span>
                  </div>

                  {/* Đường trục: mảnh hơn, chỉ để mắt lần được từ gốc xuống các
                      cột - không phải một thanh trang trí. */}
                  <div className="flex justify-center">
                    <div className="h-6 w-px bg-stone-300 dark:bg-stone-700" />
                  </div>

                  <div className="flex items-start justify-center gap-8">
                    {byCategory.map(({ category, meta, items }) => (
                      <div key={category} className="flex flex-col" style={{ width: 210 }}>
                        <div className="mx-auto h-4 w-px bg-stone-300 dark:bg-stone-700" />

                        {/* Tiêu đề cột: chấm màu + tên nhóm + số vị trí, trên
                            một đường kẻ. Không hộp, không nền. */}
                        <div className="mt-1 border-b border-stone-300 pb-1.5 dark:border-stone-700">
                          <div className="flex items-baseline gap-1.5">
                            <span
                              aria-hidden
                              className="h-[3px] w-[3px] shrink-0 translate-y-[-2px] rounded-full"
                              style={{ backgroundColor: meta.color }}
                            />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-200">
                              {meta.label}
                            </span>
                            <span className="ml-auto shrink-0 text-[10px] tabular-nums text-stone-400 dark:text-stone-500">
                              {format(t.careerRoadmap.positionCount, { count: items.length })}
                            </span>
                          </div>
                        </div>

                        {/* Chức danh: nút thật (vẫn bấm được y như cũ) nhưng
                            KHÔNG trông như nút. Không viền, không nền, không bo
                            góc. Xanh chỉ xuất hiện lúc rê chuột hoặc lấy tiêu
                            điểm - tức lúc nó là mục đang được chọn. */}
                        <div className="mt-1.5 flex flex-col items-start">
                          {items.map((career) => (
                            <button
                              key={career.id}
                              onClick={() => {
                                onSelectCareer(career);
                                trackFeatureClick("career_roadmap_node_click", { label: career.id });
                              }}
                              className="w-full cursor-pointer py-[3px] text-left text-[11px] leading-snug text-stone-600 transition-colors hover:text-emerald-700 focus-visible:text-emerald-700 dark:text-stone-400 dark:hover:text-emerald-400 dark:focus-visible:text-emerald-400"
                            >
                              {mergeCareer(career, locale).title}
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
