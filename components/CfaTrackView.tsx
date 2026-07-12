"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Scale,
  Sigma,
  Globe2,
  ClipboardList,
  Building2,
  LineChart,
  Landmark,
  Shuffle,
  Gem,
  PieChart,
  HardHat,
  type LucideIcon,
} from "lucide-react";
import type { LessonMeta } from "@/lib/lesson-types";
import type { CfaSubject } from "@/lib/cfa-track";

const SUBJECT_ICONS: Record<string, LucideIcon> = {
  ethics: Scale,
  quant: Sigma,
  economics: Globe2,
  fsa: ClipboardList,
  corporate: Building2,
  equity: LineChart,
  fixedIncome: Landmark,
  derivatives: Shuffle,
  alternatives: Gem,
  portfolio: PieChart,
};

interface Props {
  subjects: { subject: CfaSubject; lessons: LessonMeta[] }[];
}

export default function CfaTrackView({ subjects }: Props) {
  const coveredCount = subjects.filter((s) => s.lessons.length > 0).length;
  const totalLessons = subjects.reduce((sum, s) => sum + s.lessons.length, 0);

  return (
    <div>
      {/* Hero - monochrome */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-900 dark:bg-stone-950 p-6 mb-6"
      >
        <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-stone-900 bg-white px-2.5 py-1 rounded-full uppercase tracking-wide mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-900 animate-pulse" />
          Mới ra mắt · Đang xây dựng · Liên tục nâng cấp
        </div>
        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-1">Track 3</p>
        <p className="text-sm text-stone-300 leading-relaxed max-w-lg">
          Ánh xạ các bài học đã có trong <strong className="text-white">Tài chính cá nhân</strong> và{" "}
          <strong className="text-white">Tài chính chuyên ngành</strong> vào đúng 10 môn thi CFA Level I
          chính thức. Bài học không bị di chuyển hay đổi số ngày.
        </p>

        <div className="flex items-center gap-6 mt-5">
          <div>
            <div className="text-2xl font-extrabold text-white">{coveredCount}/10</div>
            <div className="text-[11px] text-stone-400 uppercase tracking-wide">Môn đã có bài</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <div className="text-2xl font-extrabold text-white">{totalLessons}</div>
            <div className="text-[11px] text-stone-400 uppercase tracking-wide">Bài học liên quan</div>
          </div>
        </div>

        <div className="mt-4 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(coveredCount / 10) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="h-full rounded-full bg-white"
          />
        </div>
      </motion.div>

      {/* Subject cards - monochrome */}
      <div className="space-y-4">
        {subjects.map(({ subject, lessons }, i) => {
          const Icon = SUBJECT_ICONS[subject.id] ?? PieChart;
          const isEmpty = lessons.length === 0;

          return (
            <motion.section
              key={subject.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.3) }}
              className="rounded-2xl border-2 border-stone-900 dark:border-stone-100 overflow-hidden shadow-sm"
            >
              <div className="px-5 py-4 bg-stone-900 dark:bg-stone-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/15 dark:bg-stone-900/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-[18px] h-[18px] text-white dark:text-stone-900" strokeWidth={2.2} />
                </div>
                <h2 className="text-white dark:text-stone-900 font-extrabold text-sm flex-1 min-w-0 truncate">{subject.name}</h2>
                <span className="text-xs font-bold text-white/90 dark:text-stone-900/80 bg-white/10 dark:bg-stone-900/10 px-2.5 py-1 rounded-full flex-shrink-0">
                  {subject.weight}
                </span>
              </div>

              {isEmpty ? (
                <div className="relative overflow-hidden bg-white dark:bg-stone-900">
                  {/* Diagonal "under construction" stripe backdrop, subtle */}
                  <div
                    className="absolute inset-0 opacity-[0.06] dark:opacity-[0.1] text-stone-900 dark:text-stone-100"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(135deg, currentColor 0, currentColor 2px, transparent 2px, transparent 14px)",
                    }}
                  />
                  <div className="relative px-6 py-9 flex flex-col items-center text-center gap-2.5">
                    <motion.div
                      animate={{ rotate: [0, -8, 8, -8, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                      className="w-11 h-11 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 flex items-center justify-center"
                    >
                      <HardHat className="w-5 h-5 text-stone-500 dark:text-stone-400" />
                    </motion.div>
                    <p className="text-sm font-bold text-stone-500 dark:text-stone-400">Sẽ xây trong tương lai</p>
                    <p className="text-xs text-stone-400 dark:text-stone-600">Chưa có bài học nào khớp với môn này</p>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-stone-100 dark:divide-stone-800 bg-white dark:bg-stone-900">
                  {lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/bai-hoc/${lesson.slug}`}
                      className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors group"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 truncate group-hover:text-stone-950 dark:group-hover:text-white transition-colors">
                          {lesson.title}
                        </p>
                        <p className="text-xs text-stone-400 dark:text-stone-500 truncate mt-0.5">{lesson.subtitle}</p>
                      </div>
                      <span className="text-xs text-stone-400 dark:text-stone-500 flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                        {lesson.duration}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
