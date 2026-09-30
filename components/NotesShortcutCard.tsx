"use client";

import Link from "next/link";
import { ChevronDown, ArrowRight, NotebookPen } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useCollapsibleCard } from "@/lib/use-collapsible-card";

// Cột phải /hoc-bai là việc PHỤ: thẻ này giữ nguyên cách dựng (lớp phủ liên
// kết + nút gập ở lớp trên, xem lib/__tests__/collapsible-cards.test.tsx) nhưng
// đã hạ xuống một hàng gọn, nền nhạt, không viền - trước đây nó là khung viền
// đậm với tiêu đề cỡ lg, nổi ngang thẻ Học tiếp.
export default function NotesShortcutCard() {
  const { t } = useI18n();
  const p = t.learningPath;

  const { collapsed, hydrated, toggle } = useCollapsibleCard("thtcdn:card-collapsed:notes");

  return (
    <div className="group relative rounded-card bg-surface-raised/70 px-3.5 py-3 overflow-hidden transition-colors hover:bg-surface-raised dark:bg-stone-900/50 dark:hover:bg-stone-900">
      <Link href="/ghi-chu" aria-label={p.notesTitle} className="absolute inset-0 z-10" />

      <div className="flex items-center gap-3 relative z-20">
        <div className="w-8 h-8 rounded-control bg-white text-ink-muted dark:bg-stone-950 flex items-center justify-center shrink-0">
          <NotebookPen className="w-4 h-4" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold leading-tight text-ink-body">
            {p.notesTitle}
          </h2>

          <div
            className={`grid ${hydrated ? "transition-all duration-200 ease-out" : ""} ${
              collapsed ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
            }`}
          >
            <div className="min-h-0 overflow-hidden" inert={collapsed}>
              <p className="mt-0.5 truncate text-xs text-ink-faint">
                {p.notesHint}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle();
          }}
          aria-expanded={!collapsed}
          title={collapsed ? p.cardExpand : p.cardCollapse}
          aria-label={collapsed ? p.cardExpand : p.cardCollapse}
          className="relative z-30 shrink-0 cursor-pointer rounded-control p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 dark:text-stone-500 dark:hover:bg-stone-800 dark:hover:text-stone-200"
        >
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${collapsed ? "-rotate-90" : ""}`} />
        </button>
      </div>

      <div
        className={`relative z-20 grid ${hydrated ? "transition-all duration-200 ease-out" : ""} ${
          collapsed ? "mt-0 grid-rows-[0fr] opacity-0" : "mt-auto grid-rows-[1fr] opacity-100"
        }`}
      >
        <div className="min-h-0 overflow-hidden" inert={collapsed}>
          <span className="inline-flex items-center gap-1.5 pt-2 pl-11 text-xs font-semibold text-ink-muted underline-offset-4 group-hover:text-accent-strong group-hover:underline">
            <span>{p.notesCta}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
