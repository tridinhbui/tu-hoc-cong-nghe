"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import { btnSecondary } from "@/components/ui/system";

// Cặp lựa chọn của Prospect Theory, widget cho các bài khai `interactiveType:
// "prospect"`.
//
// Đây là widget duy nhất trong bộ không tính ra con số nào. Việc của nó là
// chứng minh một thiên kiến CHO CHÍNH NGƯỜI ĐANG MANG NÓ - thứ mà không đoạn
// văn nào làm được, vì đọc xong ai cũng tin mình thuộc nhóm ngoại lệ.
//
// Hai câu hỏi có giá trị kỳ vọng giống hệt nhau và chỉ khác cách đóng khung:
// một bên nói về phần được, một bên nói về phần mất. Phần lớn người chọn chắc
// chắn ở khung được và chọn cược ở khung mất - đúng hiệu ứng phản chiếu mà
// Kahneman và Tversky mô tả. Widget không nói trước điều đó; nó để người học
// chọn xong rồi mới đối chiếu.

function getQuestions(t: Dictionary) {
  const tr = t.interactiveRest.prospect;
  return [
    {
      id: "gain",
      frame: tr.gainFrame,
      safe: tr.gainSafe,
      risky: tr.gainRisky,
      safeResult: 150,
      riskyResult: 150,
    },
    {
      id: "loss",
      frame: tr.lossFrame,
      safe: tr.lossSafe,
      risky: tr.lossRisky,
      safeResult: 150,
      riskyResult: 150,
    },
  ] as const;
}

type Choice = "safe" | "risky";

export default function InteractiveProspect() {
  const { t } = useI18n();
  const tr = t.interactiveRest.prospect;
  const QUESTIONS = useMemo(() => getQuestions(t), [t]);
  const [answers, setAnswers] = useState<Record<string, Choice | undefined>>({});
  const done = QUESTIONS.every((q) => answers[q.id]);
  const flipped = done && answers.gain === "safe" && answers.loss === "risky";
  const consistent = done && answers.gain === answers.loss;

  return (
    <div className="space-y-5 rounded-md border border-stone-300 bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
      <div>
        <h3 className="mb-1 text-lg font-black tracking-tight text-ink-max">
          {tr.title}
        </h3>
        <p className="text-sm text-ink-soft">
          {tr.subtitle}
        </p>
      </div>

      {QUESTIONS.map((q) => (
        <div key={q.id} className="rounded-sm border border-stone-200 p-4 dark:border-stone-800">
          <p className="text-sm font-bold text-ink-heading">{q.frame}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(["safe", "risky"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: c }))}
                aria-pressed={answers[q.id] === c}
                className={`rounded-sm border px-3 py-2.5 text-left text-[13px] leading-snug transition-colors ${
                  answers[q.id] === c
                    ? "border-brand-600 bg-brand-50 text-brand-800 dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-200"
                    : "border-stone-200 text-ink-body hover:border-stone-400 dark:border-stone-700 dark:hover:border-stone-500"
                }`}
              >
                {c === "safe" ? q.safe : q.risky}
              </button>
            ))}
          </div>
        </div>
      ))}

      {done && (
        <div
          className={`border-l-2 pl-4 ${
            flipped ? "border-amber-500" : "border-brand-600 dark:border-brand-400"
          }`}
        >
          <p className="text-sm text-ink-body">
            {tr.resultIntroPart1} <b>{tr.resultIntroAmount}</b> {tr.resultIntroPart2}
          </p>
          {flipped ? (
            <p className="mt-2 text-sm font-semibold text-warn-ink">
              {tr.flippedText}
            </p>
          ) : consistent ? (
            <p className="mt-2 text-sm font-semibold text-accent-ink">
              {tr.consistentText}
            </p>
          ) : (
            <p className="mt-2 text-sm font-semibold text-accent-ink">
              {tr.otherText}
            </p>
          )}
          <button
            type="button"
            onClick={() => setAnswers({})}
            className={`mt-3 ${btnSecondary}`}
          >
            {tr.resetButton}
          </button>
        </div>
      )}
    </div>
  );
}
