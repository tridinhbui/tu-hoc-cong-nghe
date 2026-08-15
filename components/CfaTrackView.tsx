"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { BookOpen, Loader2, ChevronRight, ArrowLeft, CheckCircle2, Circle, PlayCircle } from "lucide-react";
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
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

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
  const { t } = useI18n();
  const [viewMode, setViewMode] = useState<ViewMode>("library");
  const [openSubjects, setOpenSubjects] = useState<Set<string>>(new Set());
  const completedSet = new Set(completedLessonIds);
  const [books, setBooks] = useState<Book[]>(cachedBooks ?? []);
  const [loading, setLoading] = useState(cachedBooks === null);

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loadingReadings, setLoadingReadings] = useState(false);
  const [openReadings, setOpenReadings] = useState<Set<string>>(new Set());

  /** Chỉ bài KẾ TIẾP của những môn đang mở, tối đa ba.
   *
   *  Bản trước nạp trước mọi bài của mọi môn đang mở, cộng bài kế tiếp của cả
   *  mười môn - mở hai môn là vài chục đường dẫn. Mỗi `/bai-hoc/<slug>` là một
   *  route động, nên mỗi lần nạp trước là một lần server dựng lại cả trang bài
   *  học. Đó là tiền thật trên hoá đơn, đổi lấy việc tiết kiệm vài trăm mili
   *  giây cho những bài mà người dùng gần như chắc chắn không bấm vào.
   *
   *  Ba đường dẫn là số giữ lại được phần có ích: hàng "học tiếp" của môn đang
   *  mở là thứ được bấm nhiều nhất. Những bài còn lại vẫn là `<Link>`, và Next
   *  đã tự nạp trước khi chúng lọt vào tầm nhìn. */
  const prefetchedLessonRoutes = useMemo(() => {
    if (viewMode !== "subjects") return [];

    const routes = new Set<string>();
    for (const { subject, nextLessonSlug } of subjects) {
      if (!nextLessonSlug || !openSubjects.has(subject.id)) continue;
      routes.add(`/bai-hoc/${nextLessonSlug}`);
      if (routes.size >= 3) break;
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
      {/* ─── ALWAYS VISIBLE TOP BANNERS ───
          Hai tầng chứ không phải một lưới 2×2. Thẻ tiến độ trả lời "học tiếp
          bài nào", ba thẻ còn lại là công cụ ôn - xếp chung một lưới thì cả
          bốn trông ngang hàng nhau, trong khi chỉ một cái là việc cần làm kế
          tiếp. Tầng trên nằm ngang để tiêu đề bài không còn bị line-clamp-1
          cắt giữa chừng ở khổ hẹp. */}
      <div className="mb-5 space-y-3.5">
        {/* Hàng "học tiếp", không phải thẻ.
            Bản trước xếp cùng lúc: huy hiệu nhãn, huy hiệu tiến độ, thẻ có viền
            và bóng, thanh tiến độ, rồi một nút full-width - năm lớp trang trí
            cho một câu duy nhất là "học bài này tiếp". Giờ TÊN BÀI mang gần hết
            trọng lượng thị giác, mọi thứ khác lùi xuống hàng phụ. */}
        <div className="border-t border-stone-900/10 pt-4 dark:border-stone-100/10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                {t.cfaTrack.progressBadge}
                {nextGlobalLesson && (
                  <>
                    <span className="mx-1.5 text-stone-300 dark:text-stone-700">·</span>
                    <span className="text-stone-400 dark:text-stone-500">{nextGlobalLesson.subjectName}</span>
                  </>
                )}
              </p>
              <h2 className="mt-1.5 text-lg sm:text-xl font-black leading-tight tracking-tight text-stone-900 dark:text-stone-100 line-clamp-2">
                {nextGlobalLesson ? nextGlobalLesson.title : t.cfaTrack.allDoneTitle}
              </h2>
            </div>

            {nextGlobalLesson && (
              <Link
                href={`/bai-hoc/${nextGlobalLesson.slug}`}
                className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-700 sm:self-auto"
              >
                {t.cfaTrack.continueNextLesson}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          {/* Tiến độ là một dòng chữ cộng một sợi kẻ, không phải thanh bo tròn
              đặt trong thẻ. Con số mới là thông tin; sợi kẻ chỉ để liếc qua. */}
          <div className="mt-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800">
              <div className="h-px bg-emerald-600 dark:bg-emerald-500" style={{ width: `${overallPct}%` }} />
            </div>
            <span className="shrink-0 text-[11px] tabular-nums text-stone-500 dark:text-stone-400">
              {format(t.cfaTrack.progressCount, { done: totalCompletedCfa, total: totalCfaLessons, pct: overallPct })}
            </span>
          </div>
        </div>

        {/* Ba công cụ ôn: danh sách, không phải ba thẻ tính năng.
            Bản trước lặp đúng một khuôn ba lần - nhãn nhỏ, tiêu đề, mô tả, nút
            xanh full-width - và ba khối giống hệt nhau xếp cạnh nhau là dấu hiệu
            rõ nhất của một trang được sinh tự động. Giờ mỗi công cụ là một dòng:
            cả dòng bấm được, không nút riêng, phân cách bằng kẻ mảnh. */}
        <div className="border-t border-stone-200 dark:border-stone-800">
          {[
            { href: "/cfa/flashcards", label: t.cfaTrack.flashcardBadge, title: t.cfaTrack.flashcardTitle, desc: format(t.cfaTrack.flashcardDesc, { count: CFA_GLOSSARY_TERMS.length }) },
            { href: "/cfa/formulas", label: t.cfaTrack.formulaBadge, title: t.cfaTrack.formulaTitle, desc: format(t.cfaTrack.formulaDesc, { count: CFA_FORMULAS_DATA.length }) },
            { href: "/cfa/thi-thu", label: t.cfaTrack.mockExamBadge, title: t.cfaTrack.mockExamTitle, desc: t.cfaTrack.mockExamDesc },
          ].map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-baseline gap-4 border-b border-stone-200 py-2.5 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800/40"
            >
              <span className="w-24 shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400 dark:text-stone-500">
                {tool.label}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-bold text-stone-900 dark:text-stone-100">{tool.title}</span>
                <span className="mt-0.5 block truncate text-[11px] text-stone-500 dark:text-stone-400">{tool.desc}</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 self-center text-stone-300 transition-colors group-hover:text-emerald-600 dark:text-stone-600 dark:group-hover:text-emerald-500" />
            </Link>
          ))}
        </div>
      </div>

      {/* ─── MODE SWITCHER TAB BAR ─── */}
      {/* Bộ lọc là tab gạch chân, không phải hai nút trong một hộp bo tròn.
          Hộp xám bọc ngoài là thêm một container nữa quanh thứ vốn chỉ cần hai
          chữ, và nó lặp lại đúng hình dạng đã dùng cho ba chỗ khác trên trang. */}
      <div className="flex gap-6 mb-6 border-b border-stone-200 dark:border-stone-800">
        {[
          { id: "library" as const, label: t.cfaTrack.tabLibrary },
          { id: "subjects" as const, label: t.cfaTrack.tabSubjects },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setViewMode(id)}
            className={`-mb-px border-b-2 pb-2.5 text-xs transition-colors cursor-pointer ${
              viewMode === id
                ? "border-emerald-600 font-bold text-stone-900 dark:border-emerald-500 dark:text-stone-100"
                : "border-transparent font-semibold text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
            }`}
          >
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
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{format(t.cfaTrack.weightLabel, { weight: subject.weight })}</p>
                  </div>
                  {isEmpty ? (
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-lg shrink-0">
                      {t.cfaTrack.comingSoon}
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
                        {isSubjectDone ? t.cfaTrack.subjectDone : format(t.cfaTrack.subjectProgress, { done: completedCount, total: lessons.length })}
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
                      {completedCount === 0 ? t.cfaTrack.startSubject : t.cfaTrack.continueSubject}
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
                                      {t.cfaTrack.nextLessonBadge}
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
            {t.cfaTrack.backToLibrary}
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
              <span className="text-sm text-stone-500 dark:text-stone-400">{t.cfaTrack.loadingReadings}</span>
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
                        {format(t.cfaTrack.readingModuleCount, { count: reading.modules?.length ?? 0 })}
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
              {t.cfaTrack.noReadings}
            </div>
          )}
        </div>
      ) : (
        /* Book Grid Library View */
        <div>
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="aspect-[3/4] bg-stone-200 dark:bg-stone-800 rounded-sm mb-2.5" />
                  <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {books.map((book, i) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  onClick={() => setSelectedBook(book)}
                  className="group cursor-pointer"
                >
                  <div>
                    <div className="aspect-[3/4] overflow-hidden rounded-sm bg-stone-200 dark:bg-stone-800 relative shadow-[0_1px_3px_rgba(0,0,0,0.12)] ring-1 ring-stone-900/5 dark:ring-stone-100/10">
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
                    <div className="pt-2.5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-stone-400 dark:text-stone-500">
                        {book.level}
                      </p>
                      <h4 className="mt-0.5 text-[13px] font-bold leading-snug text-stone-900 dark:text-stone-100 line-clamp-2">
                        {toTitleCase(book.title)}
                      </h4>
                      <p className="mt-0.5 text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                        {book.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-xs text-stone-400 dark:text-stone-500 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50/50 dark:bg-stone-900/20">
              {t.cfaTrack.noBooks}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
