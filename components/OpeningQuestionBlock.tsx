"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface OpeningQuestionBlockProps {
  question: React.ReactNode;
  options: React.ReactNode[];
  correct: number;
  explanation: React.ReactNode;
}

// Shared by regular lessons (LessonPageClient) and CFA modules
// (CfaModulePageClient) - accepts ReactNode rather than plain strings so CFA
// content (rendered through CfaContentRenderer for markdown/LaTeX) can reuse
// the exact same opening-question UI instead of a second hand-rolled copy.
export default function OpeningQuestionBlock({
  question,
  options,
  correct,
  explanation,
}: OpeningQuestionBlockProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-4">
      <div className="text-[10px] font-extrabold text-stone-500 dark:text-stone-300 uppercase tracking-widest">
        Bắt đầu bằng một câu hỏi
      </div>
      <p className="text-stone-800 dark:text-stone-300 font-semibold leading-relaxed text-base">
        {question}
      </p>

      <div className="space-y-2.5">
        {options.map((opt, i) => {
          let btnCls = "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-stone-50/30 dark:hover:bg-stone-800/30";
          if (submitted) {
            if (i === correct) btnCls = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 font-semibold";
            else if (i === selected) btnCls = "border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-400";
            else btnCls = "border-stone-100 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-900/20 text-stone-500 dark:text-stone-400 opacity-60";
          } else if (selected === i) {
            btnCls = "border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold border-2";
          }

          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-all flex items-center gap-3 cursor-pointer ${btnCls}`}
            >
              <span className={`w-5 h-5 rounded-lg text-[10px] font-bold flex items-center justify-center border ${
                selected === i ? "bg-white/80 dark:bg-stone-900/80 border-current" : "bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700"
              }`}>
                {["A", "B", "C", "D"][i]}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {selected !== null && !submitted && (
        <button
          onClick={() => setSubmitted(true)}
          className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-[0.98]"
        >
          Xác nhận câu trả lời
        </button>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-4 text-xs leading-relaxed border ${
            selected === correct ? "bg-emerald-50/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900 text-emerald-800 dark:text-emerald-400" : "bg-rose-50/40 dark:bg-rose-950/50 border-rose-100 dark:border-rose-900 text-rose-800 dark:text-rose-400"
          }`}
        >
          <p className="font-semibold mb-1">
            {selected === correct ? "Đúng rồi!" : "Chưa đúng - nhưng không sao!"}
          </p>
          <p>{explanation}</p>
        </motion.div>
      )}
    </div>
  );
}
