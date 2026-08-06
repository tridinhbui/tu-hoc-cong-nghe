"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

// Ba báo cáo tài chính nối vào nhau, widget cho các bài khai
// `interactiveType: "process"`.
//
// Diagram tĩnh ở mỗi bài đã vẽ được các bước; thứ nó không làm được là cho
// thấy một thay đổi CHẢY qua các bước. Ở đây người học chọn một giao dịch rồi
// bấm từng bước, và thấy đúng dòng nào trên báo cáo nào nhúc nhích - kể cả
// những dòng mà trực giác nói là không liên quan.

function getFlows(t: Dictionary) {
  const tr = t.interactiveRest.process;
  return [
    {
      key: "sale",
      label: tr.saleFlowLabel,
      steps: [
        { at: tr.saleStep1At, text: tr.saleStep1Text },
        { at: tr.saleStep2At, text: tr.saleStep2Text },
        { at: tr.saleStep3At, text: tr.saleStep3Text },
        { at: tr.saleStep4At, text: tr.saleStep4Text },
      ],
    },
    {
      key: "capex",
      label: tr.capexFlowLabel,
      steps: [
        { at: tr.capexStep1At, text: tr.capexStep1Text },
        { at: tr.capexStep2At, text: tr.capexStep2Text },
        { at: tr.capexStep3At, text: tr.capexStep3Text },
        { at: tr.capexStep4At, text: tr.capexStep4Text },
      ],
    },
    {
      key: "loan",
      label: tr.loanFlowLabel,
      steps: [
        { at: tr.loanStep1At, text: tr.loanStep1Text },
        { at: tr.loanStep2At, text: tr.loanStep2Text },
        { at: tr.loanStep3At, text: tr.loanStep3Text },
        { at: tr.loanStep4At, text: tr.loanStep4Text },
      ],
    },
  ] as const;
}

export default function InteractiveProcess() {
  const { t } = useI18n();
  const tr = t.interactiveRest.process;
  const FLOWS = useMemo(() => getFlows(t), [t]);
  const [flowIndex, setFlowIndex] = useState(0);
  const [step, setStep] = useState(0);
  const flow = FLOWS[flowIndex];
  const atEnd = step >= flow.steps.length - 1;

  const pick = (i: number) => {
    setFlowIndex(i);
    setStep(0);
  };

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

      <div className="flex flex-wrap gap-2">
        {FLOWS.map((f, i) => (
          <button
            key={f.key}
            type="button"
            onClick={() => pick(i)}
            aria-pressed={i === flowIndex}
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${
              i === flowIndex
                ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ol className="space-y-2">
        {flow.steps.map((s, i) => {
          const reached = i <= step;
          return (
            <li
              key={s.at}
              className={`rounded-2xl border px-4 py-3 transition-colors ${
                reached
                  ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900 dark:bg-emerald-950/25"
                  : "border-stone-200 bg-stone-50 opacity-55 dark:border-stone-800 dark:bg-stone-800/40"
              }`}
            >
              <p className="text-[11px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">
                {s.at}
              </p>
              <p className="mt-0.5 text-sm leading-relaxed text-stone-700 dark:text-stone-200">
                {reached ? s.text : tr.pendingStepText}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setStep(atEnd ? 0 : step + 1)}
          className="rounded-full bg-stone-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
        >
          {atEnd ? tr.runAgainButton : tr.nextStepButton}
        </button>
        <span className="text-[11px] text-stone-400 dark:text-stone-500">
          {format(tr.stepCounter, { current: step + 1, total: flow.steps.length })}
        </span>
      </div>
    </div>
  );
}
