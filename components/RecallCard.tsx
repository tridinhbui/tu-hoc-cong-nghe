"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Check, X } from "lucide-react";
import type { RecallItem } from "@/lib/recall-schedule";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

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
export default function RecallCard({ items, title }: { items: RecallItem[]; title?: string }) {
  const { t } = useI18n();
  // Tiêu đề mặc định KHÔNG đặt ở giá trị tham số: hook chỉ gọi được trong thân
  // hàm, và một chuỗi nằm trong chữ ký hàm cũng là chỗ bộ đếm không nhìn tới.
  const heading = title ?? t.recallCard.defaultTitle;
  const [picked, setPicked] = useState<(number | null)[]>(items.map(() => null));
  const optionSets = useMemo(
    () => items.map((item, i) => shuffledOptions(item, item.fromDay * 31 + i * 7 + 11)),
    [items]
  );

  return (
    <div className="rounded-md border border-line-strong bg-[#f3f1ec] dark:bg-stone-950 p-6 space-y-4">
      <div className="eyebrow flex items-center gap-2 border-b border-line-strong pb-2 text-ink-soft">
        <RotateCcw className="w-3.5 h-3.5" />
        {heading}
      </div>
      {items.map((item, i) => {
        const options = optionSets[i];
        const answered = picked[i] !== null;
        const isCorrect = (optIndex: number) => options[optIndex].correct;
        return (
          <div key={i} className="bg-white dark:bg-stone-900 rounded-sm border border-line-strong p-4 space-y-3">
            <p className="text-sm font-semibold text-ink-heading">
              {t.recallCard.fromLabel}{" "}
              <span className="text-ink-max">
                {format(t.recallCard.dayLabel, { day: item.fromDay })}
              </span>{" "}
              {format(t.recallCard.questionSuffix, { title: item.fromTitle })}
            </p>
            <div className="space-y-2">
              {options.map((opt, optIndex) => {
                const chosen = picked[i] === optIndex;
                let stateClass = "border-line-strong hover:border-stone-950 dark:hover:border-stone-300";
                if (answered) {
                  if (isCorrect(optIndex)) {
                    stateClass = "border-brand-600 dark:border-brand-400 bg-accent-soft";
                  } else if (chosen) {
                    stateClass = "border-red-600 dark:border-red-400 bg-danger-soft";
                  } else {
                    stateClass = "border-line opacity-60";
                  }
                }
                return (
                  <button
                    key={optIndex}
                    disabled={answered}
                    onClick={() =>
                      setPicked((prev) => prev.map((v, idx) => (idx === i ? optIndex : v)))
                    }
                    className={`w-full text-left text-sm rounded-sm border px-3 py-2.5 transition-colors cursor-pointer ${stateClass} disabled:cursor-default`}
                  >
                    <span className="flex items-start gap-2">
                      {answered && isCorrect(optIndex) && <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />}
                      {answered && chosen && !isCorrect(optIndex) && <X className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />}
                      <span className="text-ink-body">{opt.text}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {answered && (
              <p
                className={`text-xs font-semibold ${
                  isCorrect(picked[i] as number)
                    ? "text-accent-strong"
                    : "text-danger"
                }`}
              >
                {isCorrect(picked[i] as number)
                  ? t.recallCard.correct
                  : t.recallCard.wrong}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
