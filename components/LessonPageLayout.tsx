"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { markLessonComplete } from "@/lib/progress";
import FloatingContact from "@/components/FloatingChatbot";
import TaiTaiLesson from "@/components/TaiTaiLesson";
import BadgeToast from "@/components/BadgeToast";
import ReadingProgress from "@/components/ReadingProgress";
import { createClient } from "@/lib/supabase";
import { markLessonComplete as markLessonCompleteSupabase } from "@/lib/supabase-progress";
import { getCompletedLessons } from "@/lib/supabase-progress";
import { awardBadges, awardBadge } from "@/lib/supabase-badges";
import { getBadgesForLessonCount, getBadgeForMilestone } from "@/lib/badges";
import { BADGE_DEFINITIONS, type BadgeDefinition } from "@/lib/badges";
import { getReadingProgress, updateReadingProgress } from "@/lib/supabase-reading";

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface LessonMeta {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  emoji: string;
  day: number;
  accent: string;
  nextSlug?: string;
  nextTitle?: string;
}

interface Props {
  lesson: LessonMeta;
  quiz: QuizQuestion[];
  children: React.ReactNode;
}

const ACCENTS: Record<string, { bg: string; text: string; border: string; badge: string; bar: string; btn: string }> = {
  emerald: { bg: "bg-emerald-50",  text: "text-emerald-700", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-500", btn: "bg-emerald-600 hover:bg-emerald-700" },
  blue:    { bg: "bg-blue-50",     text: "text-blue-700",    border: "border-blue-200",    badge: "bg-blue-100 text-blue-700",    bar: "bg-blue-500",    btn: "bg-blue-600 hover:bg-blue-700" },
  violet:  { bg: "bg-violet-50",   text: "text-violet-700",  border: "border-violet-200",  badge: "bg-violet-100 text-violet-700", bar: "bg-violet-500",  btn: "bg-violet-600 hover:bg-violet-700" },
  orange:  { bg: "bg-orange-50",   text: "text-orange-700",  border: "border-orange-200",  badge: "bg-orange-100 text-orange-700", bar: "bg-orange-500",  btn: "bg-orange-600 hover:bg-orange-700" },
  teal:    { bg: "bg-teal-50",     text: "text-teal-700",    border: "border-teal-200",    badge: "bg-teal-100 text-teal-700",    bar: "bg-teal-500",    btn: "bg-teal-600 hover:bg-teal-700" },
  cyan:    { bg: "bg-cyan-50",     text: "text-cyan-700",    border: "border-cyan-200",    badge: "bg-cyan-100 text-cyan-700",    bar: "bg-cyan-500",    btn: "bg-cyan-600 hover:bg-cyan-700" },
  rose:    { bg: "bg-rose-50",     text: "text-rose-700",    border: "border-rose-200",    badge: "bg-rose-100 text-rose-700",    bar: "bg-rose-500",    btn: "bg-rose-600 hover:bg-rose-700" },
  indigo:  { bg: "bg-indigo-50",   text: "text-indigo-700",  border: "border-indigo-200",  badge: "bg-indigo-100 text-indigo-700", bar: "bg-indigo-500",  btn: "bg-indigo-600 hover:bg-indigo-700" },
  amber:   { bg: "bg-amber-50",    text: "text-amber-700",   border: "border-amber-200",   badge: "bg-amber-100 text-amber-700",  bar: "bg-amber-500",   btn: "bg-amber-600 hover:bg-amber-700" },
  purple:  { bg: "bg-purple-50",   text: "text-purple-700",  border: "border-purple-200",  badge: "bg-purple-100 text-purple-700", bar: "bg-purple-500",  btn: "bg-purple-600 hover:bg-purple-700" },
  stone:   { bg: "bg-stone-100",   text: "text-stone-600",   border: "border-stone-200",   badge: "bg-stone-200 text-stone-600",  bar: "bg-stone-500",   btn: "bg-stone-700 hover:bg-stone-800" },
};

export default function LessonPageLayout({ lesson, quiz, children }: Props) {
  const c = ACCENTS[lesson.accent] ?? ACCENTS.indigo;

  const [selected, setSelected]   = useState<(number | null)[]>(new Array(quiz.length).fill(null));
  const [submitted, setSubmitted] = useState<boolean[]>(new Array(quiz.length).fill(false));
  const [results, setResults]     = useState<boolean[]>(new Array(quiz.length).fill(false));
  const [activeQ, setActiveQ]     = useState(0);
  const [readPct, setReadPct]     = useState(0);
  const [userId, setUserId]       = useState<string | null>(null);
  const [newBadge, setNewBadge]   = useState<BadgeDefinition | null>(null);
  const articleRef = useRef<HTMLElement>(null);
  const maxReachedRef = useRef(0);
  const savedMilestonesRef = useRef<Set<number>>(new Set());

  const durationMin = parseInt(lesson.duration) || 5;

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
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
    });
  }, [lesson.id]);

  useEffect(() => {
    let saveTimer: ReturnType<typeof setTimeout> | null = null;

    function onScroll() {
      const el = articleRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const height = el.offsetHeight;
      const winH = window.innerHeight;
      const scrolled = Math.max(0, winH - top);
      const pct = Math.min(100, Math.round((scrolled / (height + winH * 0.3)) * 100));
      setReadPct(pct);

      if (pct > maxReachedRef.current) {
        maxReachedRef.current = pct;
      }

      if (saveTimer) clearTimeout(saveTimer);
      saveTimer = setTimeout(async () => {
        if (!userId) return;
        await updateReadingProgress(userId, lesson.id, maxReachedRef.current);
      }, 800);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (saveTimer) clearTimeout(saveTimer);
    };
  }, [userId, lesson.id]);

  const handleMilestone = async (milestone: number) => {
    if (!userId || savedMilestonesRef.current.has(milestone)) return;
    savedMilestonesRef.current.add(milestone);

    const badgeKey = getBadgeForMilestone(milestone);
    if (!badgeKey) return;

    const badge = await awardBadge(userId, badgeKey);
    if (badge) setNewBadge(BADGE_DEFINITIONS[badge.badge_key]);
  };

  const remainMin = Math.max(0, Math.ceil(durationMin * (1 - readPct / 100)));
  const submittedCount = submitted.filter(Boolean).length;
  const score = results.filter(Boolean).length;
  const allDone = submittedCount === quiz.length;
  const pct = quiz.length > 0 ? Math.round((submittedCount / quiz.length) * 100) : 0;

  function choose(qi: number, oi: number) {
    if (submitted[qi]) return;
    setSelected((s) => { const n = [...s]; n[qi] = oi; return n; });
  }

  function verify(qi: number) {
    const sel = selected[qi];
    if (sel === null || submitted[qi]) return;
    const ok = sel === quiz[qi].correct;
    setResults((r) => { const n = [...r]; n[qi] = ok; return n; });
    setSubmitted((s) => { const n = [...s]; n[qi] = true; return n; });
    if (qi === quiz.length - 1) {
      markLessonComplete(lesson.id, durationMin);
      const finalResults = [...results];
      finalResults[qi] = ok;
      completeLessonInSupabase(finalResults);
    }
    if (qi < quiz.length - 1) setTimeout(() => setActiveQ(qi + 1), 600);
  }

  async function completeLessonInSupabase(finalResults: boolean[]) {
    if (!userId) return;

    const finalScore =
      quiz.length > 0
        ? Math.round((finalResults.filter(Boolean).length / quiz.length) * 100)
        : 100;
    await markLessonCompleteSupabase(userId, lesson.id, finalScore, durationMin * 60);

    const completed = await getCompletedLessons(userId);
    const badgeKeys = getBadgesForLessonCount(completed.length);
    const newlyAwarded = await awardBadges(userId, badgeKeys);

    if (newlyAwarded.length > 0) {
      setNewBadge(BADGE_DEFINITIONS[newlyAwarded[0].badge_key]);
    }

    if (finalScore === 100) {
      const perfectBadges = await awardBadges(userId, ["perfect_quiz"]);
      if (perfectBadges.length > 0 && newlyAwarded.length === 0) {
        setNewBadge(BADGE_DEFINITIONS[perfectBadges[0].badge_key]);
      }
    }
  }

  const q = quiz[activeQ];
  const qSubmitted = submitted[activeQ];
  const qCorrect   = results[activeQ];
  const qSelected  = selected[activeQ];

  return (
    <div className="min-h-screen bg-[#FAFAFC] font-sans antialiased text-[#1A1A1E]">
      {/* Reading Progress Bar (Fixed Left, race track style) */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <ReadingProgress progress={readPct} onMilestone={handleMilestone} />
      </div>

      {/* Sticky header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        {/* Scroll progress bar: full width, 4px, sits at very top of header */}
        <div className="h-1.5 w-full bg-stone-100">
          <div
            className={`h-full ${c.bar} transition-all duration-150`}
            style={{ width: `${readPct}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="w-11 h-11 rounded-full border-2 border-stone-300 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:border-stone-400 bg-white transition-all text-xl font-bold"
            >
              ←
            </Link>
            <div>
              <p className="font-extrabold text-stone-900 text-lg leading-tight line-clamp-1">{lesson.title}</p>
              <p className="text-sm text-stone-500 hidden sm:block font-semibold">Day {lesson.day}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Reading progress badge */}
            <div className="hidden sm:flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5">
              <div className="w-4 h-4 rounded-full bg-stone-200 overflow-hidden flex-shrink-0 relative">
                <div
                  className={`absolute bottom-0 left-0 right-0 ${c.bar} transition-all duration-150`}
                  style={{ height: `${readPct}%` }}
                />
              </div>
              <span className="text-xs font-bold text-stone-600">
                {readPct < 100
                  ? readPct === 0
                    ? `~${durationMin} phút đọc`
                    : `${readPct}% · còn ~${remainMin} phút`
                  : "Đọc xong!"}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <div className="h-2 w-28 bg-stone-100 rounded-full overflow-hidden">
                <div className={`h-full ${c.bar} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
              </div>
              <span className="text-xs text-stone-500 font-semibold">{submittedCount}/{quiz.length}</span>
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${c.badge}`}>
              Day {lesson.day}
            </span>
          </div>
        </div>
      </header>

      {/* 2-column layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* ── LEFT: Article ─────────────────────────────────────── */}
          <article ref={articleRef} className="flex-1 min-w-0 space-y-8 pb-20 lg:pb-0">
            {/* Hero */}
            <div className={`rounded-2xl ${c.bg} border-2 ${c.border} p-8 sm:p-10`}>
              <div className={`text-sm font-extrabold uppercase tracking-widest ${c.text} mb-3`}>
                Day {lesson.day} · {lesson.difficulty}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-950 leading-tight mb-4">
                {lesson.title}
              </h1>
              <p className="text-stone-700 text-lg sm:text-xl leading-relaxed">{lesson.subtitle}</p>
              <div className="mt-7 pt-5 border-t-2 border-stone-300 space-y-4">
                <div className="flex items-center gap-4 text-base text-stone-700 font-semibold">
                  <span>{lesson.duration} đọc</span>
                  <span>·</span>
                  <span>{quiz.length} câu quiz</span>
                  <span>·</span>
                  <span className="font-bold text-stone-900">
                    {readPct === 0
                      ? "Chưa bắt đầu"
                      : readPct >= 100
                      ? "Đọc xong!"
                      : `Đã đọc ${readPct}%`}
                  </span>
                </div>
                {/* Reading progress bar inside hero */}
                <div className="h-2.5 bg-stone-300 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${c.bar} rounded-full transition-all duration-150`}
                    style={{ width: `${readPct}%` }}
                  />
                </div>
                {readPct > 0 && readPct < 100 && (
                  <p className="text-sm text-stone-700 font-semibold">
                    Còn khoảng <strong className="text-stone-900">~{remainMin} phút</strong> để đọc xong
                  </p>
                )}
              </div>
            </div>

            {/* Tài Tài auto-tip */}
            <TaiTaiLesson lessonId={lesson.id} lessonTitle={lesson.title} />

            {/* Content */}
            <div className="space-y-8 text-stone-800 leading-relaxed text-lg sm:text-xl font-medium">
              {children}
            </div>

            {/* Mobile quiz prompt */}
            <div className="lg:hidden mt-8 border-t border-stone-200 pt-6">
              <p className="text-base text-stone-500 text-center">Cuộn xuống để làm quiz →</p>
            </div>
          </article>

          {/* ── RIGHT: Quiz sidebar ────────────────────────────────── */}
          <aside className="w-full lg:w-[440px] flex-shrink-0 lg:sticky lg:top-24 space-y-4">
            {/* Quiz progress */}
            <div className="bg-white rounded-2xl border-2 border-stone-300 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-extrabold text-stone-900 uppercase tracking-wide">Kiểm tra nhanh</span>
                <span className="text-base font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-lg">{submittedCount}/{quiz.length}</span>
              </div>
              <div className="flex gap-2">
                {quiz.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveQ(i)}
                    className={`flex-1 h-3 rounded-full transition-all cursor-pointer ${
                      submitted[i]
                        ? results[i] ? "bg-emerald-500" : "bg-rose-500"
                        : i === activeQ ? `${c.bar}` : "bg-stone-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Active question */}
            {!allDone ? (
              <div className="bg-white rounded-2xl border-2 border-stone-300 p-8 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-extrabold text-stone-700 uppercase tracking-wider bg-stone-100 px-3 py-1 rounded-lg">
                      Câu {activeQ + 1} / {quiz.length}
                    </span>
                    {qSubmitted && (
                      <span className={`text-sm font-bold px-3 py-1.5 rounded-lg ${qCorrect ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
                        {qCorrect ? "✓ Đúng rồi!" : "✗ Chưa đúng"}
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-stone-900 text-lg leading-relaxed">{q.question}</p>
                </div>

                <div className="space-y-3">
                  {q.options.map((opt, oi) => {
                    const isSelected = qSelected === oi;
                    const isCorrectOpt = oi === q.correct;
                    let cls = "border-2 border-stone-300 bg-white text-stone-900 hover:border-stone-400 hover:bg-stone-50";
                    if (qSubmitted) {
                      if (isCorrectOpt) cls = "border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                      else if (isSelected) cls = "border-2 border-rose-500 bg-rose-50 text-rose-900 font-semibold";
                      else cls = "border-2 border-stone-200 bg-stone-50 text-stone-500";
                    } else if (isSelected) {
                      cls = `${c.border} ${c.bg} ${c.text} border-2 font-semibold`;
                    }
                    return (
                      <button
                        key={oi}
                        disabled={qSubmitted}
                        onClick={() => choose(activeQ, oi)}
                        className={`w-full text-left px-5 py-4 rounded-xl border transition-all flex items-center gap-4 cursor-pointer font-medium text-base ${cls}`}
                      >
                        <span className="w-8 h-8 rounded-lg text-xs font-extrabold flex items-center justify-center flex-shrink-0 bg-stone-200 text-stone-800">
                          {["A", "B", "C", "D"][oi]}
                        </span>
                        <span className="flex-1 text-base leading-snug">{opt}</span>
                        {qSubmitted && isCorrectOpt && <span className="text-emerald-600 font-bold text-xl">✓</span>}
                        {qSubmitted && isSelected && !isCorrectOpt && <span className="text-rose-600 font-bold text-xl">✗</span>}
                      </button>
                    );
                  })}
                </div>

                {qSubmitted && (
                  <div className={`rounded-xl p-4 text-sm leading-relaxed border ${qCorrect ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-rose-50 border-rose-100 text-rose-800"}`}>
                    <p className="font-bold mb-1.5">{qCorrect ? "Chính xác!" : "Giải thích:"}</p>
                    <p>{q.explanation}</p>
                  </div>
                )}

                {!qSubmitted ? (
                  <button
                    disabled={qSelected === null}
                    onClick={() => verify(activeQ)}
                    className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white transition-all cursor-pointer ${
                      qSelected !== null ? `${c.btn}` : "bg-stone-200 text-stone-500 cursor-not-allowed"
                    }`}
                  >
                    Kiểm tra →
                  </button>
                ) : (
                  activeQ < quiz.length - 1 && (
                    <button
                      onClick={() => setActiveQ(activeQ + 1)}
                      className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white ${c.btn} cursor-pointer`}
                    >
                      Câu tiếp theo →
                    </button>
                  )
                )}
              </div>
            ) : (
              /* Completion card */
              <div className={`rounded-2xl border p-7 text-center space-y-4 ${score === quiz.length ? "bg-emerald-50 border-emerald-200" : "bg-indigo-50 border-indigo-200"}`}>
                <div className="text-5xl">{score === quiz.length ? "★" : score >= quiz.length * 0.7 ? "+" : "↑"}</div>
                <div>
                  <h3 className="font-bold text-stone-900 text-xl">Hoàn thành!</h3>
                  <p className="text-stone-500 text-sm mt-1">{score}/{quiz.length} câu đúng</p>
                </div>
                <div className="flex gap-2 justify-center">
                  {results.map((ok, i) => (
                    <div key={i} className={`w-9 h-9 rounded-full text-sm flex items-center justify-center text-white font-bold ${ok ? "bg-emerald-500" : "bg-rose-400"}`}>
                      {ok ? "✓" : "✗"}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link href="/dashboard" className="py-3.5 rounded-xl border border-stone-200 text-stone-600 text-sm font-bold text-center hover:bg-stone-50 transition-colors">
                    Dashboard
                  </Link>
                  {lesson.nextSlug ? (
                    <Link href={`/bai-hoc/${lesson.nextSlug}`} className={`py-3.5 rounded-xl text-white text-sm font-bold text-center ${c.btn} transition-colors`}>
                      Bài tiếp →
                    </Link>
                  ) : (
                    <div className="py-3.5 rounded-xl bg-stone-100 text-stone-500 text-sm font-bold text-center">Sắp ra mắt</div>
                  )}
                </div>
              </div>
            )}

            {/* Mini nav between questions */}
            {!allDone && quiz.length > 1 && (
              <div className="bg-white rounded-2xl border border-stone-200 p-4">
                <div className="text-xs text-stone-500 font-bold uppercase tracking-wide mb-3">Các câu hỏi</div>
                <div className="grid grid-cols-5 gap-2">
                  {quiz.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveQ(i)}
                      className={`h-10 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                        i === activeQ
                          ? `${c.bar} text-white`
                          : submitted[i]
                          ? results[i] ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                          : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
      <FloatingContact />
      <BadgeToast badge={newBadge} onDismiss={() => setNewBadge(null)} />
    </div>
  );
}
