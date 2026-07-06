"use client";

import { useState } from "react";
import { RotateCcw, Check, X } from "lucide-react";
import type { RecallItem } from "@/lib/recall-schedule";

// Active-recall flashcard: shown before the lesson's own content, asking the
// learner to self-test on a concept from a few lessons back BEFORE revealing
// the answer — retrieval practice is what makes spaced repetition effective,
// not just re-reading old material.
export default function RecallCard({ items }: { items: RecallItem[] }) {
  const [revealed, setRevealed] = useState<boolean[]>(items.map(() => false));
  const [rated, setRated] = useState<(boolean | null)[]>(items.map(() => null));

  return (
    <div className="rounded-2xl border-2 border-amber-200 dark:border-amber-900 bg-amber-50/60 dark:bg-amber-950/20 p-6 space-y-4">
      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-400">
        <RotateCcw className="w-3.5 h-3.5" />
        Nhớ lại trước khi học tiếp
      </div>
      {items.map((item, i) => (
        <div key={i} className="bg-white dark:bg-stone-900 rounded-xl border border-amber-200 dark:border-amber-900/60 p-4 space-y-3">
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
            Từ <span className="text-amber-700 dark:text-amber-400">Day {item.fromDay}</span> ({item.fromTitle}) — bạn còn nhớ ý chính không?
          </p>
          {!revealed[i] ? (
            <button
              onClick={() => setRevealed((prev) => prev.map((v, idx) => (idx === i ? true : v)))}
              className="text-sm font-bold text-amber-700 dark:text-amber-400 hover:underline"
            >
              Chạm để xem lại →
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-stone-600 dark:text-stone-400 italic">{item.text}</p>
              {rated[i] === null ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500 dark:text-stone-500">Bạn có nhớ đúng không?</span>
                  <button
                    onClick={() => setRated((prev) => prev.map((v, idx) => (idx === i ? true : v)))}
                    className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-950/70"
                  >
                    <Check className="w-3 h-3" /> Có nhớ
                  </button>
                  <button
                    onClick={() => setRated((prev) => prev.map((v, idx) => (idx === i ? false : v)))}
                    className="flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950/70"
                  >
                    <X className="w-3 h-3" /> Quên rồi
                  </button>
                </div>
              ) : rated[i] ? (
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Tốt — kiến thức đang được củng cố.</p>
              ) : (
                <p className="text-xs font-semibold text-rose-700 dark:text-rose-400">Không sao — đây chính là lúc ôn lại phát huy tác dụng. Bạn vừa mới nhớ lại nó.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
