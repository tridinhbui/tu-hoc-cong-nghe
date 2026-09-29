"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ChevronDown, Highlighter, Loader2, Repeat, Trash2 } from "lucide-react";
import { deleteHighlight, type LessonHighlight } from "@/lib/lesson-highlights";
import { groupByStage } from "@/lib/highlight-stage-grouping";
import { shuffleArray } from "@/lib/level-exams";
import HighlightReview from "@/components/HighlightReview";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

interface LessonInfo {
  slug: string;
  title: string;
}

interface HighlightNotebookProps {
  highlights: LessonHighlight[];
  lessonsById: Record<number, LessonInfo>;
}

const TRACK_STYLES = {
  personal: "border-stone-300 bg-page dark:border-stone-700 dark:bg-stone-950",
  professional: "border-stone-300 bg-page dark:border-stone-700 dark:bg-stone-950",
  other: "border-stone-300 bg-page dark:border-stone-700 dark:bg-stone-950",
} as const;

const TRACK_LABEL_STYLES = {
  personal: "text-ink-muted",
  professional: "text-ink-muted",
  other: "text-ink-muted",
} as const;

export default function HighlightNotebook({ highlights, lessonsById }: HighlightNotebookProps) {
  const { t } = useI18n();
  const [rows, setRows] = useState(highlights);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [deck, setDeck] = useState<LessonHighlight[] | null>(null);

  const groups = useMemo(() => groupByStage(rows, t), [rows, t]);

  async function handleDelete(id: number) {
    setDeletingId(id);
    try {
      await deleteHighlight(id);
      setRows((prev) => prev.filter((h) => h.id !== id));
    } catch (error) {
      console.error("Error deleting highlight:", error);
      toast.error(t.highlightNotebook.deleteError);
    } finally {
      setDeletingId(null);
    }
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-line-strong p-6 text-center">
        <Highlighter className="w-6 h-6 mx-auto text-stone-300 dark:text-stone-600 mb-2" />
        <p className="text-sm font-bold text-ink-body">{t.highlightNotebook.emptyTitle}</p>
        <p className="text-xs text-ink-muted mt-1 leading-relaxed">
          {t.highlightNotebook.emptySubtitle}
        </p>
      </div>
    );
  }

  if (deck) {
    return (
      <HighlightReview
        deck={deck}
        lessonsById={lessonsById}
        onRestart={() => setDeck(shuffleArray(rows))}
        onExit={() => setDeck(null)}
      />
    );
  }

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-ink-muted">
          {format(t.highlightNotebook.countLabel, { count: rows.length })}
        </p>
        <button
          type="button"
          onClick={() => setDeck(shuffleArray(rows))}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm bg-stone-950 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-700 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-brand-300"
        >
          <Repeat className="w-3.5 h-3.5" />
          {t.highlightNotebook.reviewButton}
        </button>
      </div>

      {groups.map((group) => {
        const isCollapsed = collapsed[group.stage.key] ?? false;
        return (
          <section
            key={group.stage.key}
            className={`rounded-md border ${TRACK_STYLES[group.stage.track]} overflow-hidden`}
          >
            <button
              type="button"
              onClick={() => setCollapsed((prev) => ({ ...prev, [group.stage.key]: !isCollapsed }))}
              aria-expanded={!isCollapsed}
              className="w-full flex items-start justify-between gap-3 px-3.5 py-3 text-left cursor-pointer"
            >
              <div className="min-w-0">
                <p className={`text-[11px] font-bold uppercase tracking-[0.08em] ${TRACK_LABEL_STYLES[group.stage.track]}`}>
                  {format(t.highlightNotebook.groupCountLabel, { label: group.stage.label, count: group.items.length })}
                </p>
                <p className="mt-0.5 text-xs font-black leading-snug tracking-tight text-ink-max">
                  {group.stage.name}
                </p>
              </div>
              <ChevronDown
                className={`w-4 h-4 shrink-0 mt-0.5 text-stone-400 transition-transform ${isCollapsed ? "-rotate-90" : ""}`}
              />
            </button>

            {!isCollapsed && (
              <div className="px-2.5 pb-2.5 space-y-2">
                {group.items.map((h) => {
                  const lesson = lessonsById[h.lesson_id];
                  const href = `/bai-hoc/${lesson?.slug ?? h.lesson_slug}`;
                  return (
                    <div
                      key={h.id}
                      className="group rounded-sm border border-stone-200 bg-white px-3 py-2.5 dark:border-stone-800 dark:bg-stone-900"
                    >
                      <Link href={href} className="block">
                        <p className="text-sm leading-relaxed text-ink-heading">
                          <mark className="bg-amber-200 dark:bg-amber-900 dark:text-amber-100 rounded-xs px-0.5">
                            {h.quote}
                          </mark>
                        </p>
                        <p className="mt-1.5 text-[11px] font-bold text-accent-strong truncate">
                          {lesson?.title ?? h.lesson_slug}
                        </p>
                      </Link>
                      <div className="flex justify-end -mt-4">
                        <button
                          type="button"
                          onClick={() => handleDelete(h.id)}
                          disabled={deletingId === h.id}
                          aria-label={t.highlightNotebook.deleteAria}
                          className="p-1 rounded-sm text-ink-faint hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          {deletingId === h.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
