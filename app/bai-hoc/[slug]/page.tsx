"use client";

import React, { use, useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { lessons } from "@/lib/lessons";
import LessonPageLayout from "@/components/LessonPageLayout";
import InteractiveWidget from "@/components/InteractiveWidget";
import MidpointInteractive from "@/components/MidpointInteractive";
import LessonSections from "@/components/LessonSections";

function OpeningQuestionBlock({
  question,
  options,
  correct,
  explanation,
}: {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-4">
      <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
        Bắt đầu bằng một câu hỏi
      </div>
      <p className="text-stone-800 font-semibold leading-relaxed text-base">
        {question}
      </p>

      <div className="space-y-2.5">
        {options.map((opt, i) => {
          let btnCls = "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50/30";
          if (submitted) {
            if (i === correct) btnCls = "border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold";
            else if (i === selected) btnCls = "border-rose-500 bg-rose-50 text-rose-800";
            else btnCls = "border-stone-100 bg-stone-50/20 text-stone-400 opacity-60";
          } else if (selected === i) {
            btnCls = "border-stone-900 bg-stone-100 text-stone-900 font-semibold border-2";
          }

          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-all flex items-center gap-3 cursor-pointer ${btnCls}`}
            >
              <span className={`w-5 h-5 rounded-lg text-[10px] font-bold flex items-center justify-center border ${
                selected === i ? "bg-white/80 border-current" : "bg-stone-50 text-stone-500 border-stone-200"
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
          className="w-full bg-stone-900 hover:bg-stone-800 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-[0.98]"
        >
          Xác nhận câu trả lời
        </button>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-4 text-xs leading-relaxed border ${
            selected === correct ? "bg-emerald-50/50 border-emerald-100 text-emerald-800" : "bg-rose-50/40 border-rose-100 text-rose-800"
          }`}
        >
          <p className="font-semibold mb-1">
            {selected === correct ? "Đúng rồi!" : "Chưa đúng — nhưng không sao!"}
          </p>
          <p>{explanation}</p>
        </motion.div>
      )}
    </div>
  );
}

function getLessonBySlug(slug: string) {
  return lessons.find((l) => l.slug === slug);
}

export default function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();

  const nextLesson = lessons.find((l) => l.id === lesson.id + 1);

  const meta = {
    id: lesson.id,
    day: lesson.id,
    accent: "stone",
    title: lesson.title,
    subtitle: lesson.subtitle,
    duration: lesson.duration,
    difficulty: lesson.difficulty,
    emoji: lesson.emoji,
    nextSlug: nextLesson?.slug,
    nextTitle: nextLesson ? `Day ${nextLesson.id}: ${nextLesson.title}` : undefined,
  };

  const midpointQuestion = lesson.quiz && lesson.quiz.length > 0 ? lesson.quiz[0] : null;

  return (
    <div className="relative">
      <LessonPageLayout lesson={meta} quiz={lesson.quiz}>
      {/* 1. Opening Question block */}
      {lesson.openingQuestion && (
        <OpeningQuestionBlock
          question={lesson.openingQuestion}
          options={lesson.openingOptions}
          correct={lesson.correctOption}
          explanation={lesson.explanation}
        />
      )}

      {/* 2. Rich hand-written body (preferred) or fallback thin explanation block */}
      {lesson.sections && lesson.sections.length > 0 ? (
        <LessonSections sections={lesson.sections} />
      ) : (
        lesson.explanation && (
          <div className="space-y-3">
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              Giải thích chi tiết
            </div>
            <p className="text-stone-700 leading-relaxed text-base">
              {lesson.explanation}
            </p>
          </div>
        )
      )}

      {/* 2.5. Midpoint Interactive Activity (custom question per lesson, at ~50% of content) */}
      {midpointQuestion && <MidpointInteractive question={midpointQuestion} />}

      {/* 3. Diagram block */}
      {lesson.diagram && lesson.diagram.length > 0 && (
        <div className="space-y-4">
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
            Sơ đồ trực quan
          </div>
          <div className="flex flex-col items-center py-4 bg-stone-50/50 rounded-2xl border border-stone-100">
            {lesson.diagram.map((node, i) => (
              <React.Fragment key={i}>
                <div className="bg-white border border-stone-200/80 rounded-xl px-5 py-3.5 text-stone-700 font-semibold text-sm text-center w-full max-w-xs shadow-sm">
                  {node.label}
                </div>
                {node.arrow && i < lesson.diagram.length - 1 && (
                  <div className="text-stone-300 text-lg my-1">↓</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* 4. Interactive Simulation block */}
      {lesson.interactiveType && (
        <div className="space-y-3">
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
            Thử nghiệm tương tác
          </div>
          <InteractiveWidget type={lesson.interactiveType as any} />
        </div>
      )}

      {/* 5. Real-life Example block */}
      {lesson.realWorldExample && lesson.realWorldExample.company && (
        <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
            Ví dụ thực tế · {lesson.realWorldExample.company}
          </p>
          <p className="text-stone-700 text-base leading-relaxed">
            {lesson.realWorldExample.description}
          </p>
        </div>
      )}

      {/* 6. Key Takeaways block */}
      {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-stone-900 px-6 py-5">
            <p className="text-white font-extrabold text-xl tracking-wide">Ghi nhớ nhanh</p>
          </div>
          <div className="bg-stone-800 divide-y divide-stone-700">
            {lesson.keyTakeaways.map((t, i) => (
              <div key={i} className="flex items-start gap-4 px-6 py-5">
                <span className="w-8 h-8 rounded-full bg-stone-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-stone-200 text-base leading-relaxed font-medium">{t}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </LessonPageLayout>
    </div>
  );
}
