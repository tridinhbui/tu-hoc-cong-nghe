"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

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
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-5 dark:bg-stone-900 dark:border-stone-800">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1 dark:text-stone-100">
          {tr.title}
        </h3>
        <p className="text-stone-500 text-sm dark:text-stone-400">
          {tr.subtitle}
        </p>
      </div>

      {QUESTIONS.map((q) => (
        <div key={q.id} className="rounded-2xl border border-stone-200 p-4 dark:border-stone-800">
          <p className="text-sm font-bold text-stone-800 dark:text-stone-100">{q.frame}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(["safe", "risky"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: c }))}
                aria-pressed={answers[q.id] === c}
                className={`rounded-xl border px-3 py-2.5 text-left text-[13px] leading-snug transition-colors ${
                  answers[q.id] === c
                    ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                    : "border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800/60 dark:text-stone-200 dark:hover:bg-stone-800"
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
          className={`rounded-2xl p-4 ${
            flipped ? "bg-amber-50 dark:bg-amber-950/30" : "bg-emerald-50 dark:bg-emerald-950/30"
          }`}
        >
          <p className="text-sm text-stone-700 dark:text-stone-200">
            {tr.resultIntroPart1} <b>{tr.resultIntroAmount}</b> {tr.resultIntroPart2}
          </p>
          {flipped ? (
            <p className="mt-2 text-sm font-semibold text-amber-800 dark:text-amber-200">
              {tr.flippedText}
            </p>
          ) : consistent ? (
            <p className="mt-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
              {tr.consistentText}
            </p>
          ) : (
            <p className="mt-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
              {tr.otherText}
            </p>
          )}
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="mt-3 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold text-stone-700 shadow-2xs dark:bg-stone-800 dark:text-stone-200"
          >
            {tr.resetButton}
          </button>
        </div>
      )}
    </div>
  );
}
