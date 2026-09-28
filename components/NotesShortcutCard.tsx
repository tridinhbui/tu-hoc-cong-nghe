"use client";

import Link from "next/link";
import { ChevronDown, ArrowRight, NotebookPen } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useCollapsibleCard } from "@/lib/use-collapsible-card";

export default function NotesShortcutCard() {
  const { t } = useI18n();
  const p = t.learningPath;

  const { collapsed, hydrated, toggle } = useCollapsibleCard("thtcdn:card-collapsed:notes");

  return (
    <div className="group relative rounded-md border border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900 p-5 sm:p-6 overflow-hidden transition-colors hover:border-stone-950 dark:hover:border-stone-300">
      <Link href="/ghi-chu" aria-label={p.notesTitle} className="absolute inset-0 z-10" />

      <div className="flex items-start gap-4 relative z-20">
        <div className="w-10 h-10 rounded-sm border border-stone-300 bg-[#f3f1ec] text-ink-body dark:border-stone-700 dark:bg-stone-950 flex items-center justify-center shrink-0">
          <NotebookPen className="w-5 h-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="eyebrow text-ink-faint">
            {p.notesEyebrow}
          </p>
          <h2 className="mt-0.5 text-base sm:text-lg font-black tracking-tight text-ink-max">
            {p.notesTitle}
          </h2>

          <div
            className={`grid ${hydrated ? "transition-all duration-200 ease-out" : ""} ${
              collapsed ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
            }`}
          >
            <div className="min-h-0 overflow-hidden" inert={collapsed}>
              <p className="mt-1 text-xs text-ink-soft font-medium">
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
          className="relative z-30 shrink-0 cursor-pointer rounded-sm p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 dark:text-stone-500 dark:hover:bg-stone-800 dark:hover:text-stone-200"
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
          <span className="inline-flex items-center gap-1.5 pt-3.5 text-xs font-bold text-accent-strong underline-offset-4 group-hover:underline">
            <span>{p.notesCta}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
