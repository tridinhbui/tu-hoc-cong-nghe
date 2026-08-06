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

interface LessonInfo {
  slug: string;
  title: string;
}

interface HighlightNotebookProps {
  highlights: LessonHighlight[];
  lessonsById: Record<number, LessonInfo>;
}

const TRACK_STYLES = {
  personal: "border-emerald-200 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/20",
  professional: "border-indigo-200 bg-indigo-50/60 dark:border-indigo-900 dark:bg-indigo-950/20",
  other: "border-stone-200 bg-stone-50/60 dark:border-stone-800 dark:bg-stone-900/40",
} as const;

const TRACK_LABEL_STYLES = {
  personal: "text-emerald-700 dark:text-emerald-400",
  professional: "text-indigo-700 dark:text-indigo-400",
  other: "text-stone-600 dark:text-stone-400",
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
      toast.error("Không thể xoá. Vui lòng thử lại.");
    } finally {
      setDeletingId(null);
    }
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 p-6 text-center">
        <Highlighter className="w-6 h-6 mx-auto text-stone-300 dark:text-stone-600 mb-2" />
        <p className="text-sm font-bold text-stone-700 dark:text-stone-300">Chưa có đoạn nào được tô</p>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
          Bôi đen một đoạn trong bài học rồi chọn &quot;Tô Highlight Quan Trọng&quot; - đoạn đó sẽ nổi
          màu ngay trong bài và xuất hiện ở đây.
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
        <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
          Đoạn đã tô · {rows.length}
        </p>
        <button
          type="button"
          onClick={() => setDeck(shuffleArray(rows))}
          className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-black text-white shadow-xs transition-colors hover:bg-amber-400 cursor-pointer"
        >
          <Repeat className="w-3.5 h-3.5" />
          Ôn tập
        </button>
      </div>

      {groups.map((group) => {
        const isCollapsed = collapsed[group.stage.key] ?? false;
        return (
          <section
            key={group.stage.key}
            className={`rounded-2xl border ${TRACK_STYLES[group.stage.track]} overflow-hidden`}
          >
            <button
              type="button"
              onClick={() => setCollapsed((prev) => ({ ...prev, [group.stage.key]: !isCollapsed }))}
              aria-expanded={!isCollapsed}
              className="w-full flex items-start justify-between gap-3 px-3.5 py-3 text-left cursor-pointer"
            >
              <div className="min-w-0">
                <p className={`text-[11px] font-black uppercase tracking-wider ${TRACK_LABEL_STYLES[group.stage.track]}`}>
                  {group.stage.label} · {group.items.length} đoạn
                </p>
                <p className="text-xs font-bold text-stone-800 dark:text-stone-200 mt-0.5 leading-snug">
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
                      className="group rounded-xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 px-3 py-2.5"
                    >
                      <Link href={href} className="block">
                        <p className="text-sm leading-relaxed text-stone-800 dark:text-stone-200">
                          <mark className="bg-amber-200 dark:bg-amber-900 dark:text-amber-100 rounded-sm px-0.5">
                            {h.quote}
                          </mark>
                        </p>
                        <p className="mt-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 truncate">
                          {lesson?.title ?? h.lesson_slug}
                        </p>
                      </Link>
                      <div className="flex justify-end -mt-4">
                        <button
                          type="button"
                          onClick={() => handleDelete(h.id)}
                          disabled={deletingId === h.id}
                          aria-label="Xoá đoạn đã tô"
                          className="p-1 rounded-lg text-stone-300 dark:text-stone-600 hover:text-rose-500 dark:hover:text-rose-400 transition-colors disabled:opacity-50 cursor-pointer"
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
