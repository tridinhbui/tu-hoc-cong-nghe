"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FinanceCareer } from "@/lib/finance-careers";

// "Bắt đầu từ Zero" overview: a 3-level tree (root -> category -> career)
// giving a newcomer a mental map of the whole career landscape before they
// dive into the filterable grid below it. Connectors are drawn with plain
// CSS borders (a well-known "org chart" pattern) rather than SVG paths
// measured off live DOM node positions - the latter would need a
// ResizeObserver to stay correct across every viewport width/font-size,
// which is exactly the kind of thing that quietly breaks on mobile. Borders
// reflow for free.

const CATEGORY_META: Record<
  FinanceCareer["category"],
  { label: string; color: string; border: string; bg: string }
> = {
  investment: { label: "Đầu tư & Nghiên cứu", color: "#10b981", border: "border-emerald-300 dark:border-emerald-800", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  accounting: { label: "Kế toán & Kiểm soát", color: "#3b82f6", border: "border-blue-300 dark:border-blue-800", bg: "bg-blue-50 dark:bg-blue-950/30" },
  banking: { label: "Ngân hàng & Nguồn vốn", color: "#f59e0b", border: "border-amber-300 dark:border-amber-800", bg: "bg-amber-50 dark:bg-amber-950/30" },
  advisory: { label: "Dịch vụ & Tư vấn", color: "#8b5cf6", border: "border-violet-300 dark:border-violet-800", bg: "bg-violet-50 dark:bg-violet-950/30" },
};

const CATEGORY_ORDER: FinanceCareer["category"][] = ["investment", "banking", "accounting", "advisory"];

export default function CareerRoadmapMap({
  careers,
  onSelectCareer,
}: {
  careers: FinanceCareer[];
  onSelectCareer: (career: FinanceCareer) => void;
}) {
  const [expanded, setExpanded] = useState(true);

  const byCategory = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    meta: CATEGORY_META[cat],
    items: careers.filter((c) => c.category === cat),
  }));

  return (
    <div className="rounded-3xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm overflow-hidden mb-6">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 sm:px-6 sm:py-5 text-left cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="shrink-0 rounded-xl border-2 border-emerald-500 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            Bản đồ
          </span>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100">
              Bản đồ tổng quan: Bắt đầu từ Zero
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Chưa biết bắt đầu từ đâu? Đi theo nhánh để tìm hướng phù hợp.
            </p>
          </div>
        </div>
        <span className="shrink-0 text-xs font-bold text-stone-400 dark:text-stone-500">
          {expanded ? "Thu gọn" : "Mở rộng"}
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
            <div className="px-4 pb-6 sm:px-6 sm:pb-8">
              {/* Root node */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex justify-center"
              >
                <div className="inline-flex items-center gap-2 rounded-2xl border-2 border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 px-5 py-3 shadow-md">
                  <span className="text-sm font-black text-white dark:text-stone-900">Bắt đầu từ Zero</span>
                </div>
              </motion.div>

              {/* Trunk connector */}
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-stone-300 dark:bg-stone-700" />
              </div>

              {/* Category branches */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {byCategory.map(({ category, meta, items }, catIdx) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.08 * catIdx }}
                    className="flex flex-col items-center"
                  >
                    {/* Connector down from trunk to this category (visual only, decorative) */}
                    <div className="w-0.5 h-4 bg-stone-300 dark:bg-stone-700 hidden sm:block" />

                    <div
                      className={`w-full rounded-2xl border-2 ${meta.border} ${meta.bg} px-4 py-3 text-center`}
                    >
                      <span className="text-xs font-black uppercase tracking-wide" style={{ color: meta.color }}>
                        {meta.label}
                      </span>
                      <span className="block text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                        {items.length} vị trí
                      </span>
                    </div>

                    {/* Connector down to career leaves */}
                    <div className="w-0.5 h-4 bg-stone-300 dark:bg-stone-700" />

                    <div className="w-full flex flex-wrap justify-center gap-1.5 border-l-2 border-stone-200 dark:border-stone-800 pl-0 sm:pl-0">
                      {items.map((career) => (
                        <button
                          key={career.id}
                          onClick={() => onSelectCareer(career)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-950/40 px-2.5 py-1.5 text-[11px] font-bold text-stone-700 dark:text-stone-300 hover:border-stone-900 dark:hover:border-stone-100 hover:bg-white dark:hover:bg-stone-900 transition-colors cursor-pointer"
                        >
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: meta.color }} />
                          <span>{career.title}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
