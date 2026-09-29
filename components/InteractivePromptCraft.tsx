"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

// Ghép câu lệnh theo khung R-C-T-O, widget cho các bài khai `interactiveType:
// "prompt-craft"`.
//
// Bài học viết ra bốn chữ cái thì ai cũng nhớ được. Cái không nhớ được bằng
// cách đọc là mỗi mảnh THIẾU thì hỏng ở đâu - và đó là thứ duy nhất đáng dạy,
// vì người mới không hỏng ở chỗ không biết khung, họ hỏng ở chỗ bỏ Context rồi
// than AI trả lời chung chung.
//
// Nên widget không chấm điểm câu lệnh. Nó dựng câu lệnh từ những mảnh bạn
// chọn, rồi với mỗi mảnh còn trống thì nói thẳng hậu quả cụ thể. Bỏ trống hết
// vẫn ra một câu lệnh chạy được - đúng như thực tế, và đó mới là cái bẫy.

interface Slot {
  key: "role" | "context" | "task" | "output";
  label: string;
  letter: string;
  options: string[];
  /** Hậu quả cụ thể khi bỏ trống, không phải "câu lệnh sẽ kém đi". */
  cost: string;
}

function getSlots(t: Dictionary): Slot[] {
  const tr = t.interactiveRest.promptCraft;
  return [
    {
      key: "role",
      letter: "R",
      label: tr.roleLabel,
      options: [tr.roleOption1, tr.roleOption2, tr.roleOption3],
      cost: tr.roleCost,
    },
    {
      key: "context",
      letter: "C",
      label: tr.contextLabel,
      options: [tr.contextOption1, tr.contextOption2, tr.contextOption3],
      cost: tr.contextCost,
    },
    {
      key: "task",
      letter: "T",
      label: tr.taskLabel,
      options: [tr.taskOption1, tr.taskOption2, tr.taskOption3],
      cost: tr.taskCost,
    },
    {
      key: "output",
      letter: "O",
      label: tr.outputLabel,
      options: [tr.outputOption1, tr.outputOption2, tr.outputOption3],
      cost: tr.outputCost,
    },
  ];
}

export default function InteractivePromptCraft() {
  const { t } = useI18n();
  const tr = t.interactiveRest.promptCraft;
  const SLOTS = useMemo(() => getSlots(t), [t]);
  const [picked, setPicked] = useState<Partial<Record<Slot["key"], string>>>({});
  const missing = SLOTS.filter((s) => !picked[s.key]);
  const assembled = SLOTS.map((s) => picked[s.key])
    .filter(Boolean)
    .join("\n");

  return (
    <div className="rounded-md border border-line-strong bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
      <h3 className="text-base font-black tracking-tight text-ink-max">
        {tr.title}
      </h3>

      <div className="mt-4 space-y-4">
        {SLOTS.map((slot) => (
          <div key={slot.key}>
            <div className="flex items-center gap-2">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-xs font-mono text-[10px] font-medium ${
                  picked[slot.key]
                    ? "bg-brand-600 text-white dark:bg-brand-500"
                    : "bg-stone-200 text-stone-500 dark:bg-stone-700 dark:text-stone-400"
                }`}
              >
                {slot.letter}
              </span>
              <span className="text-xs font-bold text-ink-body">{slot.label}</span>
            </div>
            <div className="mt-1.5 space-y-1">
              {slot.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setPicked((prev) => ({
                      ...prev,
                      [slot.key]: prev[slot.key] === option ? undefined : option,
                    }))
                  }
                  aria-pressed={picked[slot.key] === option}
                  className={`block w-full cursor-pointer rounded-sm border px-3 py-1.5 text-left text-[11px] leading-snug ${
                    picked[slot.key] === option
                      ? "border-brand-600 bg-brand-50 text-brand-800 dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-200"
                      : "border-stone-200 text-stone-600 hover:border-stone-400 dark:border-stone-700 dark:text-stone-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 border-l-2 border-stone-300 pl-4 dark:border-stone-700">
        <p className="text-[10px] font-black uppercase tracking-widest text-ink-muted">
          {tr.assembledLabel}
        </p>
        {assembled ? (
          <pre className="mt-1.5 overflow-x-auto whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed text-ink-body">
            {assembled}
          </pre>
        ) : (
          <p className="mt-1.5 text-[11px] italic text-ink-faint">
            {tr.assembledEmpty}
          </p>
        )}
      </div>

      {missing.length > 0 ? (
        <div className="mt-3 space-y-2">
          {missing.map((slot) => (
            <p
              key={slot.key}
              className="border-l-2 border-amber-500 pl-3 text-[11px] leading-relaxed text-ink-body"
            >
              <span className="font-bold">{format(tr.missingPrefix, { letter: slot.letter })}</span>
              {slot.cost}
            </p>
          ))}
        </div>
      ) : (
        <p className="mt-3 border-l-2 border-brand-600 pl-3 text-[11px] leading-relaxed text-ink-body dark:border-brand-400">
          {tr.allSlotsFilled}
        </p>
      )}
    </div>
  );
}
