"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ListChecks, CheckCircle2, Circle, PlayCircle } from "lucide-react";
import type { LessonMeta } from "@/lib/lesson-types";
import type { FrmSubject } from "@/lib/frm-track";

interface Props {
  subjects: {
    subject: FrmSubject;
    lessons: LessonMeta[];
    completedCount: number;
    nextLessonSlug: string | null;
  }[];
  completedLessonIds: number[];
}

// Subjects-only view of the FRM track - no book-library mode like CFA's,
// since GARP's official FRM books aren't cross-referenced here (yet).
export default function FrmTrackView({ subjects, completedLessonIds }: Props) {
  const [openSubjects, setOpenSubjects] = useState<Set<string>>(new Set());
  const completedSet = new Set(completedLessonIds);

  const totalFrmLessons = subjects.reduce((sum, s) => sum + s.lessons.length, 0);
  const totalCompletedFrm = subjects.reduce((sum, s) => sum + s.completedCount, 0);
  const overallPct = totalFrmLessons > 0 ? Math.round((totalCompletedFrm / totalFrmLessons) * 100) : 0;

  function toggleSubject(id: string) {
    setOpenSubjects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const partI = subjects.filter((s) => s.subject.part === "I");
  const partII = subjects.filter((s) => s.subject.part === "II");

  function renderSubjectCard({ subject, lessons, completedCount, nextLessonSlug }: Props["subjects"][number]) {
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
  }

  return (
    <div className="py-2">
      <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-4 shadow-2xs mb-6 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            <span className="text-[9px] font-black uppercase tracking-wider bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-md border border-sky-200/60 dark:border-sky-800/60">
              🎯 TIẾN ĐỘ FRM
            </span>
            <span className="text-[9px] font-extrabold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-md">
              {totalCompletedFrm}/{totalFrmLessons} ({overallPct}%)
            </span>
          </div>
          <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 rounded-full transition-all duration-500"
              style={{ width: `${overallPct}%` }}
            />
          </div>
        </div>
        <ListChecks className="w-8 h-8 text-sky-500 shrink-0" />
      </div>

      <div className="space-y-5">
        <div>
          <h2 className="text-sm font-black uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2.5">
            FRM Part I
          </h2>
          <div className="space-y-3">{partI.map(renderSubjectCard)}</div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2.5">
            FRM Part II
          </h2>
          <div className="space-y-3">{partII.map(renderSubjectCard)}</div>
        </div>
      </div>
    </div>
  );
}
