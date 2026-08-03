"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { BookOpen, Loader2, ChevronRight, ArrowLeft, Library, ListChecks, CheckCircle2, Circle, PlayCircle } from "lucide-react";
import type { LessonMeta } from "@/lib/lesson-types";
import type { CfaSubject } from "@/lib/cfa-track";
// Số lượng đọc thẳng từ dữ liệu, không gõ tay vào chuỗi quảng cáo. Banner từng
// ghi "500+ thuật ngữ" trong khi bộ thẻ có 75, và "100% công thức thi CFA"
// trong khi sổ có 98 - không phải ai nói dối, mà là con số được gõ một lần rồi
// dữ liệu đi tiếp còn chuỗi thì đứng yên. Đọc từ nguồn thì nó không lệch được.
import { CFA_GLOSSARY_TERMS } from "@/lib/cfa-glossary-terms";
import { CFA_FORMULAS_DATA } from "@/lib/cfa-formulas-data";
import { toTitleCase } from "@/lib/cfa-format";
import { useRoutePrefetch } from "@/lib/use-route-prefetch";

interface Book {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  level: string;
  createdAt: string;
}

interface Reading {
  id: string;
  bookId: string;
  code: string;
  title: string;
  order: number | null;
  pageStart: number | null;
  pageEnd: number | null;
  modules?: Module[];
}

interface Module {
  id: string;
  readingId: string;
  code: string;
  title: string;
  order: number | null;
}

interface Props {
  subjects: {
    subject: CfaSubject;
    lessons: LessonMeta[];
    completedCount: number;
    nextLessonSlug: string | null;
  }[];
  completedLessonIds: number[];
}

type ViewMode = "library" | "subjects";

let cachedBooks: Book[] | null = null;

export default function CfaTrackView({ subjects, completedLessonIds }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>("library");
  const [openSubjects, setOpenSubjects] = useState<Set<string>>(new Set());
  const completedSet = new Set(completedLessonIds);
  const [books, setBooks] = useState<Book[]>(cachedBooks ?? []);
  const [loading, setLoading] = useState(cachedBooks === null);

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loadingReadings, setLoadingReadings] = useState(false);
  const [openReadings, setOpenReadings] = useState<Set<string>>(new Set());

  const prefetchedLessonRoutes = useMemo(() => {
    if (viewMode !== "subjects") return [];

    const routes = new Set<string>();
    for (const { subject, lessons, nextLessonSlug } of subjects) {
      if (nextLessonSlug) {
        routes.add(`/bai-hoc/${nextLessonSlug}`);
      }

      if (!openSubjects.has(subject.id)) continue;
      for (const lesson of lessons) {
        routes.add(`/bai-hoc/${lesson.slug}`);
      }
    }

    return [...routes];
  }, [openSubjects, subjects, viewMode]);

  useRoutePrefetch(prefetchedLessonRoutes, {
    enabled: prefetchedLessonRoutes.length > 0,
    delayMs: 80,
  });

  useEffect(() => {
    if (cachedBooks !== null) return;
    async function fetchBooks() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("Book")
          .select("*")
          .order("id", { ascending: true });
        if (!error && data) {
          const primaryBooks = data.filter((b: Book) => b.id.startsWith("book-"));
          cachedBooks = primaryBooks;
          setBooks(primaryBooks);
        }
      } catch (err) {
        console.error("Error loading books:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    if (!selectedBook) {
      setReadings([]);
      return;
    }

    const bookId = selectedBook.id;

    async function fetchReadingsAndModules() {
      setLoadingReadings(true);
      try {
        const supabase = createClient();

        const { data: readingsData, error: readingsError } = await supabase
          .from("Reading")
          .select("*")
          .eq("bookId", bookId)
          .order("order", { ascending: true });

        if (readingsError) throw readingsError;

        if (readingsData && readingsData.length > 0) {
          const readingIds = readingsData.map((r) => r.id);

          const { data: modulesData, error: modulesError } = await supabase
            .from("Module")
            .select("*")
            .in("readingId", readingIds)
            .order("order", { ascending: true });

          if (modulesError) throw modulesError;

          const readingsWithModules = readingsData.map((reading) => ({
            ...reading,
            modules: (modulesData || []).filter((m) => m.readingId === reading.id),
          }));

          setReadings(readingsWithModules);
          setOpenReadings(readingsWithModules[0] ? new Set([readingsWithModules[0].id]) : new Set());
        } else {
          setReadings([]);
        }
      } catch (err) {
        console.error("Error loading readings and modules:", err);
      } finally {
        setLoadingReadings(false);
      }
    }

    fetchReadingsAndModules();
  }, [selectedBook]);

  function toggleReading(id: string) {
    setOpenReadings((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSubject(id: string) {
    setOpenSubjects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const { totalCfaLessons, totalCompletedCfa, overallPct, nextGlobalLesson } = useMemo(() => {
    let total = 0;
    let completed = 0;
    let nextLessonInfo: { slug: string; title: string; subjectName: string } | null = null;

    for (const item of subjects) {
      total += item.lessons.length;
      completed += item.completedCount;
      if (!nextLessonInfo && item.nextLessonSlug) {
        const nextL = item.lessons.find((l) => !completedSet.has(l.id));
        if (nextL) {
          nextLessonInfo = {
            slug: nextL.slug,
            title: nextL.title,
            subjectName: item.subject.name,
          };
        }
      }
    }

    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { totalCfaLessons: total, totalCompletedCfa: completed, overallPct: pct, nextGlobalLesson: nextLessonInfo };
  }, [subjects, completedSet]);

  return (
    <div className="py-2">
      {/* ─── ALWAYS VISIBLE TOP BANNERS (LIGHT MODE, LOW HEIGHT 1/3 EACH) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-5">
        {/* 🎯 CFA Global Continuation Summary Banner (1/3) */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/60">
                🎯 TIẾN ĐỘ CFA LEVEL I
              </span>
              <span className="text-[9px] font-extrabold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-md">
                {totalCompletedCfa}/{totalCfaLessons} ({overallPct}%)
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-100 leading-snug line-clamp-1">
              {nextGlobalLesson ? `Bài tiếp: ${nextGlobalLesson.title}` : "🎉 Đã hoàn thành lộ trình CFA!"}
            </h2>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1">
              {nextGlobalLesson ? `Môn: ${nextGlobalLesson.subjectName}` : "Hoàn thành tất cả bài học CFA Level I."}
            </p>

            <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden mt-1.5">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${overallPct}%` }}
              />
            </div>
          </div>

          {nextGlobalLesson && (
            <Link
              href={`/bai-hoc/${nextGlobalLesson.slug}`}
              className="mt-3 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 font-bold text-xs text-white rounded-xl transition-all shadow-2xs shrink-0 cursor-pointer flex items-center justify-center gap-1.5 w-full text-center active:scale-95"
            >
              <PlayCircle className="w-3.5 h-3.5 text-white" />
              <span>Học tiếp bài tiếp theo →</span>
            </Link>
          )}
        </div>

        {/* 📇 CFA Glossary Flashcards Banner (1/3) */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-lg">📇</span>
              <span className="text-[9px] font-black uppercase text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-200/60 dark:border-amber-800/60">
                FLASHCARD 3D
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-100 leading-snug">
              Bộ Thẻ Thuật Ngữ CFA Song Ngữ
            </h3>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-normal">
              {/* Một biểu thức duy nhất thay vì `{số} chữ`: JSX cắt khoảng
                  trắng quanh biểu thức theo luật riêng của nó, và ở đây kết
                  quả render ra "118thuật ngữ" - dính liền. Ghép sẵn trong
                  chuỗi thì không còn khoảng trắng nào để ai cắt. */}
              {`${CFA_GLOSSARY_TERMS.length} thuật ngữ En-Vi kèm định nghĩa, công thức & phát âm En-US.`}
            </p>
          </div>

          <Link
            href="/cfa/flashcards"
            className="mt-3 px-3 py-2 bg-amber-500 hover:bg-amber-600 font-bold text-xs text-white rounded-xl transition-all shadow-2xs shrink-0 cursor-pointer flex items-center justify-center gap-1.5 w-full text-center active:scale-95"
          >
            <span>Mở Flashcard 3D →</span>
          </Link>
        </div>

        {/* 📐 CFA Formula Cheat Sheet Banner (1/3) */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-lg">📐</span>
              <span className="text-[9px] font-black uppercase text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md border border-indigo-200/60 dark:border-indigo-800/60">
                CHEAT SHEET
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-100 leading-snug">
              Sổ Tay Công Thức CFA Level 1
            </h3>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-normal">
              {`${CFA_FORMULAS_DATA.length} công thức trọng yếu (TVM, WACC, DuPont, Duration, CAPM...).`}
            </p>
          </div>

          <Link
            href="/cfa/formulas"
            className="mt-3 px-3 py-2 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-xs rounded-xl transition-all shadow-2xs shrink-0 cursor-pointer flex items-center justify-center gap-1.5 w-full text-center active:scale-95"
          >
            <span>Xem Sổ Tay Công Thức →</span>
          </Link>
        </div>

        {/* 📝 Thi thử - đứng cùng hàng với sổ công thức và flashcard vì cả ba
            đều là "công cụ ôn", nhưng đây là cái duy nhất trả lời được câu hỏi
            "tôi đã sẵn sàng chưa". */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-lg">📝</span>
              <span className="text-[9px] font-black uppercase text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-md border border-rose-200/60 dark:border-rose-800/60">
                THI THỬ
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-100 leading-snug">
              Đề Thi Thử CFA Level I Đầy Đủ
            </h3>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-normal">
              180 câu · 2 ca × 135 phút · 3 lựa chọn · chấm tách theo từng môn.
            </p>
          </div>

          <Link
            href="/cfa/thi-thu"
            className="mt-3 px-3 py-2 bg-rose-600 hover:bg-rose-700 font-bold text-xs text-white rounded-xl transition-all shadow-2xs shrink-0 cursor-pointer flex items-center justify-center gap-1.5 w-full text-center active:scale-95"
          >
            <span>Vào thi thử →</span>
          </Link>
        </div>
      </div>

      {/* ─── MODE SWITCHER TAB BAR ─── */}
      <div className="flex gap-1 mb-6 bg-stone-100 dark:bg-stone-900 rounded-xl p-1 max-w-md">
        {[
          { id: "library" as const, label: "Thư viện giáo trình", icon: Library },
          { id: "subjects" as const, label: "Ôn theo môn thi CFA", icon: ListChecks },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setViewMode(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
              viewMode === id
                ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* ─── TAB CONTENT (SWITCHES INLINE BELOW BANNER BAR) ─── */}
      {viewMode === "subjects" ? (
        <div className="space-y-3">
          {subjects.map(({ subject, lessons, completedCount, nextLessonSlug }) => {
            const isOpen = openSubjects.has(subject.id);
            const isEmpty = lessons.length === 0;
            const isSubjectDone = !isEmpty && completedCount === lessons.length;
            return (
              <div key={subject.id} className="rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
                <button
                  onClick={() => !isEmpty && toggleSubject(subject.id)}
                  disabled={isEmpty}
                  className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                    isEmpty ? "cursor-default opacity-60" : "hover:bg-stone-50 dark:hover:bg-stone-900/50 cursor-pointer"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-extrabold text-stone-900 dark:text-stone-100 leading-snug">{subject.name}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Tỷ trọng đề thi: {subject.weight}</p>
                  </div>
                  {isEmpty ? (
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-lg shrink-0">
                      Sẽ xây trong tương lai
                    </span>
                  ) : (
                    <>
                      <span
                        className={`text-sm font-bold px-3 py-1 rounded-lg shrink-0 ${
                          isSubjectDone
                            ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
                            : "text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800"
                        }`}
                      >
                        {isSubjectDone ? "✓ Hoàn thành" : `${completedCount}/${lessons.length} bài`}
                      </span>
                      <ChevronRight className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                    </>
                  )}
                </button>

                {!isEmpty && !isSubjectDone && nextLessonSlug && (
                  <div className="px-4 pb-4 -mt-1">
                    <Link
                      href={`/bai-hoc/${nextLessonSlug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      {completedCount === 0 ? "Bắt đầu môn này" : "Học tiếp"}
                    </Link>
                  </div>
                )}

                <AnimatePresence initial={false}>
                  {isOpen && !isEmpty && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 space-y-2.5">
                        {(() => {
                          const nextUndoneId = lessons.find((l) => !completedSet.has(l.id))?.id;
                          return lessons.map((lesson) => {
                            const isDone = completedSet.has(lesson.id);
                            const isNext = lesson.id === nextUndoneId;
                            return (
                              <Link
                                key={lesson.id}
                                href={`/bai-hoc/${lesson.slug}`}
                                className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all group ${
                                  isNext
                                    ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-sm ring-2 ring-emerald-500/20"
                                    : "border-stone-100 dark:border-stone-800/70 bg-stone-50/60 dark:bg-stone-900/40 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-white dark:hover:bg-stone-900"
                                }`}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                ) : isNext ? (
                                  <PlayCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 animate-pulse" />
                                ) : (
                                  <Circle className="w-4 h-4 text-stone-300 dark:text-stone-700 shrink-0" />
                                )}
                                <span className="flex-1 min-w-0 text-sm font-bold text-stone-800 dark:text-stone-200 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between gap-2">
                                  <span>{lesson.title}</span>
                                  {isNext && (
                                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-200/80 dark:bg-emerald-900 px-2 py-0.5 rounded-full shrink-0">
                                      👉 BÀI TIẾP THEO
                                    </span>
                                  )}
                                </span>
                                <ChevronRight className="w-4 h-4 text-stone-300 dark:text-stone-600 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                              </Link>
                            );
                          });
                        })()}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      ) : selectedBook ? (
        /* Book Detail View */
        <div>
          <button
            onClick={() => setSelectedBook(null)}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách giáo trình
          </button>

          <div className="flex items-start gap-5 mb-8">
            <div className="w-24 sm:w-28 aspect-[3/4] rounded-xl overflow-hidden shadow-md bg-stone-200 dark:bg-stone-800 relative flex-shrink-0">
              {selectedBook.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={selectedBook.coverImage} alt={selectedBook.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400 dark:text-stone-600">
                  <BookOpen className="w-8 h-8" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-stone-900 dark:text-stone-900 bg-stone-200 dark:bg-stone-100 px-2.5 py-0.5 rounded uppercase">
                {selectedBook.level}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white mt-2 leading-snug">
                {toTitleCase(selectedBook.title)}
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
                {selectedBook.description}
              </p>
            </div>
          </div>

          {loadingReadings ? (
            <div className="flex flex-col justify-center items-center gap-2 py-16">
              <Loader2 className="w-6 h-6 animate-spin text-stone-500 dark:text-stone-400" />
              <span className="text-sm text-stone-500 dark:text-stone-400">Đang tải bài đọc...</span>
            </div>
          ) : readings.length > 0 ? (
            <div className="space-y-4">
              {readings.map((reading) => {
                const isOpen = openReadings.has(reading.id);
                return (
                  <div key={reading.id} id={`reading-${reading.id}`}>
                    <button
                      onClick={() => toggleReading(reading.id)}
                      className="w-full flex items-center gap-3 cursor-pointer text-left border-b border-stone-100 dark:border-stone-800/40 pb-3 mb-4 transition-all"
                    >
                      <span className="text-xs font-extrabold px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 shrink-0">
                        {reading.code}
                      </span>
                      <span className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100 flex-1 leading-snug">
                        {toTitleCase(reading.title)}
                      </span>
                      <span className="text-sm font-bold px-3 py-1 rounded-lg text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 shrink-0">
                        {reading.modules?.length ?? 0} bài
                      </span>
                      <ChevronRight className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-3 mb-6">
                            {(reading.modules ?? []).map((mod) => (
                              <Link
                                key={mod.id}
                                href={`/cfa/${mod.id}`}
                                className="flex items-center gap-4 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-md transition-all group"
                              >
                                <span className="w-9 h-9 rounded-full border-3 border-stone-300 dark:border-stone-700 flex items-center justify-center text-[10px] font-black text-stone-500 dark:text-stone-400 shrink-0 group-hover:border-emerald-400 dark:group-hover:border-emerald-600">
                                  {mod.code}
                                </span>
                                <span className="flex-1 min-w-0 text-base font-bold text-stone-900 dark:text-stone-100 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                  {toTitleCase(mod.title)}
                                </span>
                                <ChevronRight className="w-5 h-5 text-stone-300 dark:text-stone-600 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-sm text-stone-400 dark:text-stone-500 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50/50 dark:bg-stone-900/20">
              Chưa có Reading nào trong cuốn sách này.
            </div>
          )}
        </div>
      ) : (
        /* Book Grid Library View */
        <div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 p-4 animate-pulse">
                  <div className="aspect-[3/4] bg-stone-200 dark:bg-stone-800 rounded-lg mb-3" />
                  <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {books.map((book, i) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  onClick={() => setSelectedBook(book)}
                  className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  <div>
                    <div className="aspect-[3/4] overflow-hidden bg-stone-200 dark:bg-stone-800 relative">
                      {book.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-400 dark:text-stone-600">
                          <BookOpen className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="text-xs font-extrabold text-stone-900 dark:text-white line-clamp-1 mb-1">
                        {toTitleCase(book.title)}
                      </h4>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                        {book.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-4 pt-1">
                    <span className="text-[9px] font-bold text-stone-900 dark:text-stone-900 bg-stone-200 dark:bg-stone-100 px-2 py-0.5 rounded uppercase">
                      {book.level}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-xs text-stone-400 dark:text-stone-500 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50/50 dark:bg-stone-900/20">
              Chưa có giáo trình nào được lưu.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
