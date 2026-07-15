"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Check, X } from "lucide-react";
import type { RecallItem } from "@/lib/recall-schedule";

function shuffledOptions(item: RecallItem, seed: number): { text: string; correct: boolean }[] {
  const options = [
    { text: item.text, correct: true },
    ...item.distractors.map((d) => ({ text: d, correct: false })),
  ];
  // Deterministic per-item shuffle (stable across re-renders) so the correct
  // answer isn't always in the same slot across cards.
  let s = seed;
  for (let i = options.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

// Active-recall check: shown before the lesson's own content, asking the
// learner to pick which statement matches a concept from a few lessons back
// - a genuine retrieval test (right/wrong, immediate feedback), not a
// self-reported "did you remember?" which doesn't actually test recall.
export default function RecallCard({ items, title = "Nhớ lại trước khi học tiếp" }: { items: RecallItem[]; title?: string }) {
  const [picked, setPicked] = useState<(number | null)[]>(items.map(() => null));
  const optionSets = useMemo(
    () => items.map((item, i) => shuffledOptions(item, item.fromDay * 31 + i * 7 + 11)),
    [items]
  );

  return (
    <div className="rounded-2xl border-2 border-amber-200 dark:border-amber-900 bg-amber-50/60 dark:bg-amber-950/20 p-6 space-y-4">
      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-400">
        <RotateCcw className="w-3.5 h-3.5" />
        {title}
      </div>
      {items.map((item, i) => {
        const options = optionSets[i];
        const answered = picked[i] !== null;
        const isCorrect = (optIndex: number) => options[optIndex].correct;
        return (
          <div key={i} className="bg-white dark:bg-stone-900 rounded-xl border border-amber-200 dark:border-amber-900/60 p-4 space-y-3">
            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
              Từ <span className="text-amber-700 dark:text-amber-400">Day {item.fromDay}</span> ({item.fromTitle}) - ý nào dưới đây đúng?
            </p>
            <div className="space-y-2">
              {options.map((opt, optIndex) => {
                const chosen = picked[i] === optIndex;
                let stateClass = "border-stone-200 dark:border-stone-700 hover:border-amber-300 dark:hover:border-amber-800";
                if (answered) {
                  if (isCorrect(optIndex)) {
                    stateClass = "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40";
                  } else if (chosen) {
                    stateClass = "border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40";
                  } else {
                    stateClass = "border-stone-200 dark:border-stone-800 opacity-60";
                  }
                }
                return (
                  <button
                    key={optIndex}
                    disabled={answered}
                    onClick={() =>
                      setPicked((prev) => prev.map((v, idx) => (idx === i ? optIndex : v)))
                    }
                    className={`w-full text-left text-sm rounded-lg border px-3 py-2.5 transition-colors ${stateClass} disabled:cursor-default`}
                  >
                    <span className="flex items-start gap-2">
                      {answered && isCorrect(optIndex) && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />}
                      {answered && chosen && !isCorrect(optIndex) && <X className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />}
                      <span className="text-stone-700 dark:text-stone-300">{opt.text}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {answered && (
              <p
                className={`text-xs font-semibold ${
                  isCorrect(picked[i] as number)
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-rose-700 dark:text-rose-400"
                }`}
              >
                {isCorrect(picked[i] as number)
                  ? "Chính xác - kiến thức đang được củng cố."
                  : "Chưa đúng - không sao, đây chính là lúc ôn lại phát huy tác dụng."}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
