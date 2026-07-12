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

const SUBJECT_ACCENTS: Record<string, string> = {
  ethics: "from-rose-500 to-rose-600",
  quant: "from-blue-500 to-blue-600",
  economics: "from-cyan-500 to-cyan-600",
  fsa: "from-amber-500 to-amber-600",
  corporate: "from-indigo-500 to-indigo-600",
  equity: "from-emerald-500 to-emerald-600",
  fixedIncome: "from-teal-500 to-teal-600",
  derivatives: "from-purple-500 to-purple-600",
  alternatives: "from-fuchsia-500 to-fuchsia-600",
  portfolio: "from-orange-500 to-orange-600",
};

interface Props {
  subjects: { subject: CfaSubject; lessons: LessonMeta[] }[];
}

export default function CfaTrackView({ subjects }: Props) {
  const coveredCount = subjects.filter((s) => s.lessons.length > 0).length;
  const totalLessons = subjects.reduce((sum, s) => sum + s.lessons.length, 0);

  return (
    <div>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 bg-gradient-to-br from-stone-900 via-stone-900 to-indigo-950 dark:from-stone-950 dark:via-stone-950 dark:to-indigo-950 p-6 mb-6"
      >
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="relative">
          <p className="text-[11px] font-bold text-indigo-300 uppercase tracking-widest mb-1">Track 3</p>
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
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-indigo-400"
            />
          </div>
        </div>
      </motion.div>

      {/* Subject cards */}
      <div className="space-y-4">
        {subjects.map(({ subject, lessons }, i) => {
          const Icon = SUBJECT_ICONS[subject.id] ?? PieChart;
          const accent = SUBJECT_ACCENTS[subject.id] ?? "from-stone-500 to-stone-600";
          const isEmpty = lessons.length === 0;

          return (
            <motion.section
              key={subject.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.3) }}
              className="rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm"
            >
              <div className={`px-5 py-4 bg-gradient-to-r ${accent} flex items-center gap-3`}>
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                  <Icon className="w-[18px] h-[18px] text-white" strokeWidth={2.2} />
                </div>
                <h2 className="text-white font-extrabold text-sm flex-1 min-w-0 truncate">{subject.name}</h2>
                <span className="text-xs font-bold text-white/90 bg-black/15 px-2.5 py-1 rounded-full flex-shrink-0">
                  {subject.weight}
                </span>
              </div>

              {isEmpty ? (
                <div className="relative overflow-hidden bg-white dark:bg-stone-900">
                  {/* Diagonal "under construction" stripe backdrop, subtle */}
                  <div
                    className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(135deg, currentColor 0, currentColor 2px, transparent 2px, transparent 14px)",
                      color: "var(--tw-gradient-from, #f59e0b)",
                    }}
                  />
                  <div className="relative px-6 py-9 flex flex-col items-center text-center gap-2.5">
                    <motion.div
                      animate={{ rotate: [0, -8, 8, -8, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                      className="w-11 h-11 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 flex items-center justify-center"
                    >
                      <HardHat className="w-5 h-5 text-amber-500" />
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
