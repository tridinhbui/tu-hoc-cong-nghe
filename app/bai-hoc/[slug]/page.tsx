"use client";

import React, { use, useState, useEffect, useRef } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { lessons } from "@/lib/lessons";
import LessonPageLayout from "@/components/LessonPageLayout";
import InteractiveWidget from "@/components/InteractiveWidget";
import ReadingProgress from "@/components/ReadingProgress";
import MidpointInteractive from "@/components/MidpointInteractive";
import BadgeToast from "@/components/BadgeToast";
import { createClient } from "@/lib/supabase";
import { updateReadingProgress, getReadingProgress } from "@/lib/supabase-reading";
import { awardBadge } from "@/lib/supabase-badges";
import { getBadgeForMilestone } from "@/lib/badges";
import type { BadgeDefinition } from "@/lib/badges";
import { BADGE_DEFINITIONS } from "@/lib/badges";

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
            btnCls = "border-[#5F5DF0] bg-[#EEEDFF] text-[#4F46E5] font-semibold border-2";
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
          className="w-full bg-[#5F5DF0] hover:bg-[#4E4CD9] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-[0.98]"
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
            {selected === correct ? "✨ Đúng rồi!" : "💡 Chưa đúng — nhưng không sao!"}
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
  const [readingProgress, setReadingProgress] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [newBadge, setNewBadge] = useState<BadgeDefinition | null>(null);
  const maxReachedRef = useRef(0);
  const savedMilestonesRef = useRef<Set<number>>(new Set());

  if (!lesson) notFound();

  const nextLesson = lessons.find((l) => l.id === lesson.id + 1);

  // Get current user + restore prior progress
  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      const existing = await getReadingProgress(user.id, lesson.id);
      if (existing) {
        maxReachedRef.current = existing.max_percent_reached;
        if (existing.milestone_25) savedMilestonesRef.current.add(25);
        if (existing.milestone_50) savedMilestonesRef.current.add(50);
        if (existing.milestone_75) savedMilestonesRef.current.add(75);
        if (existing.milestone_100) savedMilestonesRef.current.add(100);
      }
    };
    init();
  }, [lesson.id]);

  // Track reading progress + persist to Supabase (throttled) + award milestone badges
  useEffect(() => {
    let saveTimer: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const totalScroll = documentHeight - windowHeight;
      const scrolled = totalScroll > 0 ? scrollTop / totalScroll : 0;
      const progress = Math.min(Math.round(scrolled * 100), 100);

      setReadingProgress(progress);

      if (progress > maxReachedRef.current) {
        maxReachedRef.current = progress;
      }

      if (saveTimer) clearTimeout(saveTimer);
      saveTimer = setTimeout(async () => {
        if (!userId) return;
        await updateReadingProgress(userId, lesson.id, maxReachedRef.current);
      }, 800);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (saveTimer) clearTimeout(saveTimer);
    };
  }, [userId, lesson.id]);

  const handleMilestone = async (milestone: number) => {
    if (!userId || savedMilestonesRef.current.has(milestone)) return;
    savedMilestonesRef.current.add(milestone);

    // Reading finish-line (100%) has no dedicated badge — quiz completion
    // (handled in LessonPageLayout) is the true "lesson completed" signal.
    const badgeKey = getBadgeForMilestone(milestone);
    if (!badgeKey) return;

    const badge = await awardBadge(userId, badgeKey);
    if (badge) setNewBadge(BADGE_DEFINITIONS[badge.badge_key]);
  };

  const meta = {
    id: lesson.id,
    day: lesson.id,
    accent: "indigo",
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
      {/* Reading Progress Bar (Fixed Left, race track style) */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <ReadingProgress progress={readingProgress} onMilestone={handleMilestone} />
      </div>

      {/* Badge earned toast */}
      <BadgeToast badge={newBadge} onDismiss={() => setNewBadge(null)} />

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

      {/* 2. Detailed Explanation block */}
      {lesson.explanation && (
        <div className="space-y-3">
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
            Giải thích chi tiết
          </div>
          <p className="text-stone-700 leading-relaxed text-base">
            {lesson.explanation}
          </p>
        </div>
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
        <div className="space-y-3">
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
            Ví dụ thực tế
          </div>
          <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-2xl border border-indigo-100/40 p-6">
            <h4 className="font-bold text-stone-900 text-base mb-2">
              🏢 {lesson.realWorldExample.company}
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed">
              {lesson.realWorldExample.description}
            </p>
          </div>
        </div>
      )}

      {/* 6. Key Takeaways block */}
      {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
        <div className="bg-emerald-50/60 border border-emerald-100/70 rounded-2xl p-6">
          <h3 className="font-bold text-emerald-950 mb-3 flex items-center gap-2">
            <span>📌</span> Ghi nhớ nhanh
          </h3>
          <div className="space-y-2.5">
            {lesson.keyTakeaways.map((t, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-emerald-800 leading-relaxed">
                <span className="text-emerald-500 font-bold flex-shrink-0">✓</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </LessonPageLayout>
    </div>
  );
}
