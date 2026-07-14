"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Highlighter, Flag, Trash2 } from "lucide-react";
import { deleteHighlight, type LessonHighlight } from "@/lib/lesson-highlights";

export default function LessonHighlightsList({
  highlights,
  onDeleted,
}: {
  highlights: LessonHighlight[];
  onDeleted: (id: number) => void;
}) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  if (highlights.length === 0) return null;

  async function handleDelete(id: number) {
    setDeletingId(id);
    try {
      await deleteHighlight(id);
      onDeleted(id);
    } catch (error) {
      console.error("Error deleting highlight:", error);
      toast.error("Không thể xoá. Vui lòng thử lại.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5">
      <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-3">
        Đoạn bạn đã đánh dấu trong bài này
      </p>
      <div className="space-y-2.5">
        {highlights.map((h) => {
          const isFlag = h.kind === "ai_flag";
          return (
            <div
              key={h.id}
              className={`group flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm leading-relaxed ${
                isFlag
                  ? "border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20"
                  : "border-amber-200 dark:border-amber-900 bg-amber-50/60 dark:bg-amber-950/20"
              }`}
            >
              {isFlag ? (
                <Flag className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              ) : (
                <Highlighter className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              )}
              <p className="flex-1 min-w-0 text-stone-700 dark:text-stone-300 italic">&quot;{h.quote}&quot;</p>
              <button
                type="button"
                onClick={() => handleDelete(h.id)}
                disabled={deletingId === h.id}
                aria-label="Xoá đánh dấu"
                className="flex-shrink-0 p-1 rounded-lg text-stone-300 dark:text-stone-600 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-stone-900 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
