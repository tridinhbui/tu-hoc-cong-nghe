"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useCollapsibleCard } from "@/lib/use-collapsible-card";

export default function NotesShortcutCard() {
  const { t } = useI18n();
  const p = t.learningPath;

  const { collapsed, hydrated, toggle } = useCollapsibleCard("thtcdn:card-collapsed:notes");

  return (
    <div className="group relative rounded-3xl border border-line bg-white dark:bg-stone-900 p-5 sm:p-6 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Background Storybook Meadow & Journal Painting on the right */}
      <div className="absolute right-0 top-0 bottom-0 w-48 sm:w-64 overflow-hidden pointer-events-none select-none opacity-90 dark:opacity-25 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/dashboard/notebook_field_art.jpg"
            alt={t.dashCards.notesAlt}
            fill
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent dark:from-stone-900 dark:via-stone-900/50" />
        </div>
      </div>

      <Link href="/ghi-chu" aria-label={p.notesTitle} className="absolute inset-0 z-10" />

      <div className="flex items-start gap-4 relative z-20">
        {/* Themed Spiral Notebook Icon */}
        <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 flex items-center justify-center shrink-0 p-2 shadow-2xs">
          <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8">
            <rect x="9" y="5" width="20" height="26" rx="2.5" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <line x1="6" y1="9" x2="12" y2="9" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
            <line x1="6" y1="14" x2="12" y2="14" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
            <line x1="6" y1="19" x2="12" y2="19" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
            <line x1="6" y1="24" x2="12" y2="24" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
            <line x1="6" y1="29" x2="12" y2="29" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
            {/* Cành lá, cùng tone brand */}
            <path d="M23 23C21 18 26 15 28 16C29 19 25 22 23 23Z" fill="#417acd" />
            <path d="M23 23C20 21 18 24 20 26C22 27 24 25 23 23Z" fill="#2961b8" />
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-ink-faint">
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
          className="relative z-30 shrink-0 cursor-pointer rounded-xl p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 dark:text-stone-500 dark:hover:bg-stone-800 dark:hover:text-stone-200"
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
          <span className="inline-flex items-center gap-1.5 pt-3.5 text-xs font-black text-brand-800 hover:text-brand-950 dark:text-brand-400 group-hover:translate-x-0.5 transition-transform">
            <span>{p.notesCta}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
