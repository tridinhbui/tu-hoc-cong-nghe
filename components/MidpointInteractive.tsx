"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { QuizQuestion } from "@/lib/lesson-types";

interface MidpointInteractiveProps {
  question: QuizQuestion;
  onComplete?: () => void;
}

export default function MidpointInteractive({
  question,
  onComplete,
}: MidpointInteractiveProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === question.correct;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-stone-50 dark:bg-stone-900/50 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-6 my-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">Dừng & Kiểm tra</h3>
        <span className="ml-auto text-xs font-bold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full">
          Điểm giữa bài
        </span>
      </div>

      <p className="text-stone-800 dark:text-stone-300 font-semibold mb-4">{question.question}</p>

      <div className="space-y-2 mb-4">
        {question.options.map((opt, i) => (
          <button
            key={i}
            disabled={submitted}
            onClick={() => setSelected(i)}
            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
              selected === i
                ? "border-stone-900 dark:border-stone-100 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-semibold"
                : submitted
                  ? i === question.correct
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-400"
                    : "border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 text-stone-600 dark:text-stone-400 opacity-50"
                  : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-600"
            }`}
          >
            <span className="font-bold text-sm">{String.fromCharCode(65 + i)}.</span>{" "}
            {opt}
          </button>
        ))}
      </div>

      {selected !== null && !submitted && (
        <button
          onClick={() => setSubmitted(true)}
          className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 py-2.5 rounded-xl font-bold text-sm transition"
        >
          Kiểm tra
        </button>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mt-4 p-4 rounded-xl ${
            isCorrect
              ? "bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-900"
              : "bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
          }`}
        >
          <p className={`font-bold ${isCorrect ? "text-emerald-900 dark:text-emerald-400" : "text-stone-900 dark:text-stone-100"}`}>
            {isCorrect ? "Chính xác!" : "Chưa đúng - xem giải thích"}
          </p>
          <p className={`text-sm mt-1 ${isCorrect ? "text-emerald-800 dark:text-emerald-400" : "text-stone-700 dark:text-stone-300"}`}>
            {question.explanation}
          </p>
          <button
            onClick={() => {
              setSelected(null);
              setSubmitted(false);
              onComplete?.();
            }}
            className="mt-3 text-sm font-bold text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 underline"
          >
            Tiếp tục đọc →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
