"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { QuizQuestion } from "@/lib/lessons";

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
      className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-indigo-200 rounded-2xl p-6 my-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">⏸️</span>
        <h3 className="text-base font-bold text-indigo-900">Dừng & Kiểm tra</h3>
        <span className="ml-auto text-xs font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
          Điểm giữa bài
        </span>
      </div>

      <p className="text-stone-800 font-semibold mb-4">{question.question}</p>

      <div className="space-y-2 mb-4">
        {question.options.map((opt, i) => (
          <button
            key={i}
            disabled={submitted}
            onClick={() => setSelected(i)}
            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
              selected === i
                ? "border-indigo-500 bg-white text-indigo-900 font-semibold"
                : submitted
                  ? i === question.correct
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                    : "border-stone-200 bg-stone-50 text-stone-600 opacity-50"
                  : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
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
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-bold text-sm transition"
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
              ? "bg-emerald-100 border border-emerald-300"
              : "bg-blue-100 border border-blue-300"
          }`}
        >
          <p className={`font-bold ${isCorrect ? "text-emerald-900" : "text-blue-900"}`}>
            {isCorrect ? "✨ Chính xác!" : "💡 Chưa đúng — xem giải thích"}
          </p>
          <p className={`text-sm mt-1 ${isCorrect ? "text-emerald-800" : "text-blue-800"}`}>
            {question.explanation}
          </p>
          <button
            onClick={() => {
              setSelected(null);
              setSubmitted(false);
              onComplete?.();
            }}
            className="mt-3 text-sm font-bold text-indigo-600 hover:text-indigo-700 underline"
          >
            Tiếp tục đọc →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
