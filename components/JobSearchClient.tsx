"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ExternalLink, 
  Briefcase, 
  X, 
  Search, 
  Sparkles, 
  Clock, 
  Award, 
  Terminal, 
  Activity, 
  Heart, 
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  SearchCode,
  ThumbsUp,
  ThumbsDown,
  TrendingUp
, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { FINANCE_CAREERS, type FinanceCareer } from "@/lib/finance-careers";
import { CFA_LEVEL_1_SUBJECTS } from "@/lib/cfa-track";
import { JOB_SEARCH_SITES } from "@/lib/job-search-links";
import { createClient } from "@/lib/supabase";
import { trackFeatureClick } from "@/lib/feature-events";
import { claimQuestReward } from "@/lib/supabase-quests";
import { recalculateUserStats } from "@/lib/supabase-user";
import { getMyCareerGoal, setCareerGoal, clearCareerGoal } from "@/lib/supabase-career-goals";
import { getCareerLessonProgress, type CareerLessonProgress } from "@/lib/career-lesson-progress";
import { CheckCircle2, Circle, BookOpen } from "lucide-react";
import Image from "next/image";
import CareerRoadmapMap from "@/components/CareerRoadmapMap";
import CareerProfilePanel from "@/components/CareerProfilePanel";
import { SUGGESTED_JOB_KEYWORDS } from "@/lib/job-search-links";
import { careerCategoryLabelsOf, CAREER_CATEGORY_ORDER } from "@/lib/career-categories";
import { notifyLocalStorageChanged, useLocalStorageValue } from "@/lib/use-local-storage-value";
import { CAREER_GOAL_EVENT, CAREER_GOAL_KEY, CAREER_GOAL_STORAGE_EVENT, CAREER_ITEMS_KEY } from "@/lib/career-goal-storage";

// Beautiful custom 3D card tilt and glow component
function CareerAvatar({ career, size = 110, className = "" }: { career?: FinanceCareer | null; size?: number; className?: string }) {
  // Sub-component, nên có useI18n() riêng.
  const { t } = useI18n();
  if (!career) return null;
  return (
    <div
      className={`relative shrink-0 transition-transform duration-300 [transform-style:preserve-3d] hover:[transform:rotateY(10deg)_rotateX(-6deg)] ${className}`}
      style={{ width: size, height: size, perspective: "600px" }}
    >
      {/* Dynamic box shadow matching the accent color */}
      <div
        className="absolute inset-0 rounded-2xl opacity-40 blur-xl transition-all duration-300 group-hover:opacity-70 z-0"
        style={{
          background: `radial-gradient(circle, ${career.accentFrom || "#34d399"}, ${career.accentTo || "#0d9488"})`,
        }}
      />
      {/* Background glass sphere style */}
      <div
        className="absolute inset-0 rounded-2xl border border-white/20 dark:border-stone-800/80 overflow-hidden shadow-lg z-10"
        style={{
          background: `linear-gradient(135deg, ${career.accentFrom || "#34d399"}20, ${career.accentTo || "#0d9488"}35)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at 35% 30%, #ffffff 0%, transparent 60%)`,
          }}
        />
        {career.avatar3d ? (
          <Image
            src={career.avatar3d}
            alt={career.title || t.jobs.careerAlt}
            width={size}
            height={size}
            className="w-full h-full object-cover select-none relative z-10"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl select-none relative z-10">
            {career.emoji || "💼"}
          </div>
        )}
      </div>
    </div>
  );
}

// "Học các bài này để chuẩn bị cho nghề X" - turns a career profile into an
// actual study plan by linking career.relatedLessonSlugs to real lesson
// pages, instead of the career page and the learning content staying two
// disconnected islands. Fetches its own real completion status per career
// (not the self-reported skills/certs checklist above) via
// /api/career-lesson-progress, so a signed-in user sees which of these are
// already done. Renders nothing for a logged-out visitor or a career with
// no linked lessons yet.
function RelatedLessonsPanel({ career }: { career: FinanceCareer }) {
  const { t } = useI18n();
  const [progress, setProgress] = useState<CareerLessonProgress | null>(null);
  // Suy ra từ nghề nào đã tải xong. Nghề không có bài liên quan thì không có
  // gì để tải, nên cũng không bao giờ ở trạng thái đang tải - bản cũ phải tắt
  // cờ bằng một setState đồng bộ ngay trong nhánh thoát sớm của effect.
  const [loadedCareerId, setLoadedCareerId] = useState<string | null>(null);
  const loading = career.relatedLessonSlugs.length > 0 && loadedCareerId !== career.id;

  useEffect(() => {
    if (career.relatedLessonSlugs.length === 0) return;
    let cancelled = false;
    getCareerLessonProgress(career.relatedLessonSlugs)
      .then((p) => {
        if (!cancelled) setProgress(p);
      })
      .catch(() => {
        if (!cancelled) setProgress(null);
      })
      .finally(() => {
        if (!cancelled) setLoadedCareerId(career.id);
      });
    return () => {
      cancelled = true;
    };
  }, [career.id, career.relatedLessonSlugs.length]);

  const cfaSubjects = (career.relatedCfaSubjectIds ?? [])
    .map((id) => CFA_LEVEL_1_SUBJECTS.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => !!s);

  if (career.relatedLessonSlugs.length === 0 && cfaSubjects.length === 0) return null;

  return (
    <div className="mt-5 p-5 rounded-2xl bg-emerald-500/5 border-2 border-dashed border-emerald-500/20">
      {cfaSubjects.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-4 pb-4 border-b border-dashed border-emerald-500/20">
          <span className="text-[10px] font-black uppercase text-stone-400 dark:text-stone-500 tracking-wider mr-1">
            {t.jobs.cfaRelated}
          </span>
          {cfaSubjects.map((s) => (
            <span
              key={s.id}
              title={format(t.jobs.examWeightTitle, { weight: s.weight })}
              className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300"
            >
              {s.name}
            </span>
          ))}
        </div>
      )}
      {career.relatedLessonSlugs.length === 0 ? null : (
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h4 className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
            {t.jobs.studyTheseLessons}
          </h4>
        </div>
        {progress && (
          <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
            {progress.completed}/{progress.total}
          </span>
        )}
      </div>
      )}
      {career.relatedLessonSlugs.length === 0 ? null : loading ? (
        <p className="text-[11px] text-stone-400">{t.jobs.loading}</p>
      ) : progress && progress.lessons.length > 0 ? (
        <div className="space-y-1.5">
          {progress.lessons.map((l) => (
            <Link
              key={l.slug}
              href={`/bai-hoc/${l.slug}`}
              className="flex items-center gap-2.5 p-2.5 rounded-lg border border-stone-200/60 dark:border-stone-800/60 bg-white/60 dark:bg-stone-900/40 hover:border-emerald-400 dark:hover:border-emerald-700 transition-colors group"
            >
              {l.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-stone-300 dark:text-stone-700 shrink-0" />
              )}
              <span
                className={`text-[11px] font-bold flex-1 ${
                  l.completed ? "text-stone-500 dark:text-stone-500 line-through" : "text-stone-700 dark:text-stone-300"
                }`}
              >
                {l.title}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-300 dark:text-stone-700 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-stone-400">{t.jobs.signInForProgress}</p>
      )}
      {/* /nghe-nghiep-hoc had no inbound link anywhere in the app - a full
          page answering "which lessons should I study for this career",
          reachable only by typing the URL. This is its natural entry point:
          the reader is already looking at exactly that question here, in a
          panel too small to hold the whole list. */}
      {career.relatedLessonSlugs.length > 0 && (
        <Link
          href="/nghe-nghiep-hoc"
          className="mt-2.5 flex items-center justify-center gap-1.5 rounded-lg border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/60 dark:bg-emerald-950/30 px-3 py-2 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100/70 dark:hover:bg-emerald-950/50 transition-colors"
        >
          {t.jobs.fullTrackLink}
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}

// Sub-component for individual metric progress bars
function MetricBar({ 
  label, 
  value, 
  max = 5, 
  color = "bg-emerald-500", 
  icon: Icon 
}: { 
  label: string; 
  value: number; 
  max?: number; 
  color?: string; 
  icon: LucideIcon 
}) {
  const percentage = (value / max) * 100;
  return (
    <div className="bg-stone-50 dark:bg-stone-900/40 p-4 rounded-2xl border border-stone-200/60 dark:border-stone-800/50 shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-1.5 text-stone-400 dark:text-stone-500 mb-2">
        <Icon className="w-4 h-4 shrink-0" />
        <span className="text-[10px] font-extrabold uppercase tracking-wider">{label}</span>
      </div>
      <div>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-xl font-black text-stone-800 dark:text-stone-200">{value}</span>
          <span className="text-xs text-stone-400">/{max}</span>
        </div>
        <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <motion.div 
            className={`h-full ${color} rounded-full`} 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}

// Each question's four options map 1:1 (by index) onto this fixed type
// order - the type drives quiz scoring and is structural, so it stays here
// rather than in the dictionary. Copy in t.dataRest.jobSearchClient.quizQuestions.
const QUIZ_OPTION_TYPES = ["Analytical", "Compliance", "Client-facing", "Quantitative"] as const;

function quizQuestionsOf(t: Dictionary) {
  return t.dataRest.jobSearchClient.quizQuestions.map((q) => ({
    question: q.question,
    options: q.options.map((text, i) => ({ text, type: QUIZ_OPTION_TYPES[i] })),
  }));
}

// Tên nhóm ngành suy ra từ lib/career-categories.ts thay vì khai lại ở đây:
// một nhóm mới thêm vào FinanceCareer["category"] sẽ tự có nút lọc, thay vì
// lặng lẽ không lọc ra được ở màn hình này.
function categoriesOf(t: Dictionary) {
  return [
    { id: "all" as const, label: t.dataRest.jobSearchClient.allCategoriesLabel },
    ...CAREER_CATEGORY_ORDER.map((id) => ({ id, label: careerCategoryLabelsOf(t)[id] })),
  ];
}

// SVG Radar Chart for role traits visualization
function CareerRadarChart({ traits, color = "#0d9488" }: { traits?: { analytical?: number; compliance?: number; clientFacing?: number; quantitative?: number } | null; color?: string }) {
  const { t } = useI18n();
  const safeTraits = {
    analytical: traits?.analytical ?? 3,
    compliance: traits?.compliance ?? 3,
    clientFacing: traits?.clientFacing ?? 3,
    quantitative: traits?.quantitative ?? 3,
  };
  const cx = 100;
  const cy = 100;
  const R = 70;
  
  const pAnalytical = { x: cx, y: cy - R * (safeTraits.analytical / 5) };
  const pQuantitative = { x: cx + R * (safeTraits.quantitative / 5), y: cy };
  const pClientFacing = { x: cx, y: cy + R * (safeTraits.clientFacing / 5) };
  const pCompliance = { x: cx - R * (safeTraits.compliance / 5), y: cy };
  
  const pointsString = `${pAnalytical.x},${pAnalytical.y} ${pQuantitative.x},${pQuantitative.y} ${pClientFacing.x},${pClientFacing.y} ${pCompliance.x},${pCompliance.y}`;
  
  return (
    <div className="flex flex-col items-center justify-center bg-stone-50 dark:bg-stone-900/40 p-5 rounded-2xl border border-stone-200/60 dark:border-stone-800/50 shadow-sm relative overflow-hidden shrink-0">
      <span className="text-[9px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-4 block text-center">{t.jobs.radarTitle}</span>
      <svg className="w-36 h-36 overflow-visible" viewBox="0 0 200 200">
        {[1, 2, 3, 4, 5].map((lvl) => {
          const r = R * (lvl / 5);
          return (
            <polygon
              key={lvl}
              points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`}
              fill="none"
              stroke="currentColor"
              className="text-stone-200 dark:text-stone-800/50"
              strokeWidth="1"
              strokeDasharray={lvl < 5 ? "2,2" : "none"}
            />
          );
        })}
        <line x1={cx - R} y1={cy} x2={cx + R} y2={cy} stroke="currentColor" className="text-stone-200 dark:text-stone-800" strokeWidth="1" />
        <line x1={cx} y1={cy - R} x2={cx} y2={cy + R} stroke="currentColor" className="text-stone-200 dark:text-stone-800" strokeWidth="1" />
        
        <text x={cx} y={cy - R - 6} textAnchor="middle" className="text-[8px] font-black fill-stone-500 dark:fill-stone-400">{t.jobs.axisAnalysis}</text>
        <text x={cx + R + 6} y={cy + 3} textAnchor="start" className="text-[8px] font-black fill-stone-500 dark:fill-stone-400">{t.jobs.axisQuantShort}</text>
        <text x={cx} y={cy + R + 12} textAnchor="middle" className="text-[8px] font-black fill-stone-500 dark:fill-stone-400">{t.jobs.axisCommunication}</text>
        <text x={cx - R - 6} y={cy + 3} textAnchor="end" className="text-[8px] font-black fill-stone-500 dark:fill-stone-400">{t.jobs.axisCompliance}</text>
        
        <polygon
          points={pointsString}
          fill={`${color}20`}
          stroke={color}
          strokeWidth="2"
          className="transition-all duration-500 ease-out"
        />
        <circle cx={pAnalytical.x} cy={pAnalytical.y} r="3" fill={color} />
        <circle cx={pQuantitative.x} cy={pQuantitative.y} r="3" fill={color} />
        <circle cx={pClientFacing.x} cy={pClientFacing.y} r="3" fill={color} />
        <circle cx={pCompliance.x} cy={pCompliance.y} r="3" fill={color} />
      </svg>
    </div>
  );
}

// Sidebar or modal component to compare two careers
function ComparisonModal({ 
  open, 
  onClose, 
  careerA 
}: { 
  open: boolean; 
  onClose: () => void; 
  careerA: FinanceCareer
}) {
  const { t } = useI18n();
  const [careerBId, setCareerBId] = useState<string>("");
  const careerB = FINANCE_CAREERS.find((c) => c.id === careerBId);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div 
        className="bg-white dark:bg-stone-900 rounded-3xl border-2 border-stone-200 dark:border-stone-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-lg font-black text-stone-900 dark:text-stone-50 mb-6 flex items-center gap-2">
          {t.jobs.compareTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/30">
            <div className="flex gap-4 items-center mb-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm shrink-0">
                <Image
                  src={careerA.avatar3d}
                  alt={careerA.title}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">{t.jobs.current}</span>
                <h3 className="text-base font-black text-stone-900 dark:text-stone-50 leading-tight mt-0.5">{careerA.title}</h3>
                <p className="text-xs text-stone-400 dark:text-stone-500 font-bold">{careerA.englishTitle}</p>
              </div>
            </div>
            <div className="space-y-4 text-xs">
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-semibold italic">"{careerA.summary}"</p>
              
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-stone-200/50 dark:border-stone-800/50">
                <div className="text-center">
                  <span className="text-[10px] text-stone-400 block font-bold">{t.jobs.difficulty}</span>
                  <span className="text-sm font-black text-stone-800 dark:text-stone-200">{careerA.entryDifficulty}/5</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-stone-400 block font-bold">{t.jobs.pressure}</span>
                  <span className="text-sm font-black text-stone-800 dark:text-stone-200">{careerA.stressLevel}/5</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-stone-400 block font-bold">{t.jobs.balance}</span>
                  <span className="text-sm font-black text-stone-800 dark:text-stone-200">{careerA.wlb}/5</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <div>
                  <span className="font-extrabold text-stone-400 block text-[9px] uppercase tracking-wider">{t.jobs.expectedSalary}</span>
                  <span className="font-black text-stone-800 dark:text-stone-200">{careerA.salaryHint}</span>
                </div>
                <div>
                  <span className="font-extrabold text-stone-400 block text-[9px] uppercase tracking-wider">{t.jobs.mainCertificates}</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {careerA.certifications.map(c => (
                      <span key={c} className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-[10px] font-bold text-stone-600 dark:text-stone-400">{c}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-extrabold text-stone-400 block text-[9px] uppercase tracking-wider">{t.jobs.mainTools}</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {careerA.requiredTools.map(t => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/20 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/30">
            <div className="mb-4">
              <label className="text-[9px] font-black uppercase tracking-wider text-stone-400 block mb-1.5">{t.jobs.pickToCompare}</label>
              <select
                value={careerBId}
                onChange={(e) => setCareerBId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-800 dark:text-stone-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="">{t.jobs.pickPlaceholder}</option>
                {FINANCE_CAREERS.filter(c => c.id !== careerA.id).map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            {careerB ? (
              <div className="space-y-4 text-xs">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm shrink-0">
                    <Image
                      src={careerB.avatar3d}
                      alt={careerB.title}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-stone-900 dark:text-stone-50 leading-tight">{careerB.title}</h3>
                    <p className="text-xs text-stone-400 dark:text-stone-500 font-bold">{careerB.englishTitle}</p>
                  </div>
                </div>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-semibold italic">"{careerB.summary}"</p>
                
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-stone-200/50 dark:border-stone-800/50">
                  <div className="text-center">
                    <span className="text-[10px] text-stone-400 block font-bold">{t.jobs.difficulty}</span>
                    <span className="text-sm font-black text-stone-800 dark:text-stone-200">{careerB.entryDifficulty}/5</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-stone-400 block font-bold">{t.jobs.pressure}</span>
                    <span className="text-sm font-black text-stone-800 dark:text-stone-200">{careerB.stressLevel}/5</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-stone-400 block font-bold">{t.jobs.balance}</span>
                    <span className="text-sm font-black text-stone-800 dark:text-stone-200">{careerB.wlb}/5</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <div>
                    <span className="font-extrabold text-stone-400 block text-[9px] uppercase tracking-wider">{t.jobs.expectedSalary}</span>
                    <span className="font-black text-stone-800 dark:text-stone-200">{careerB.salaryHint}</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-stone-400 block text-[9px] uppercase tracking-wider">{t.jobs.mainCertificates}</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {careerB.certifications.map(c => (
                        <span key={c} className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-[10px] font-bold text-stone-600 dark:text-stone-400">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-extrabold text-stone-400 block text-[9px] uppercase tracking-wider">{t.jobs.mainTools}</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {careerB.requiredTools.map(t => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/20 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-stone-400 dark:text-stone-600 text-xs font-semibold border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900/30">
                {t.jobs.pickSecond}
              </div>
            )}
          </div>
        </div>

        {careerB && (
          <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col items-center">
            <span className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-4 block text-center">
              {t.jobs.radarOverlayTitle}
            </span>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <svg className="w-48 h-48 overflow-visible" viewBox="0 0 200 200">
                {[1, 2, 3, 4, 5].map((lvl) => {
                  const r = 70 * (lvl / 5);
                  return (
                    <polygon
                      key={lvl}
                      points={`100,${100 - r} ${100 + r},100 ${100},${100 + r} ${100 - r},100`}
                      fill="none"
                      stroke="currentColor"
                      className="text-stone-200 dark:text-stone-800"
                      strokeWidth="1"
                      strokeDasharray={lvl < 5 ? "2,2" : "none"}
                    />
                  );
                })}
                <line x1={30} y1={100} x2={170} y2={100} stroke="currentColor" className="text-stone-200 dark:text-stone-800" strokeWidth="1" />
                <line x1={100} y1={30} x2={100} y2={170} stroke="currentColor" className="text-stone-200 dark:text-stone-800" strokeWidth="1" />

                <text x={100} y={22} textAnchor="middle" className="text-[8px] font-black fill-stone-500 dark:fill-stone-400">{t.jobs.axisAnalysis}</text>
                <text x={178} y={103} textAnchor="start" className="text-[8px] font-black fill-stone-500 dark:fill-stone-400">{t.jobs.axisQuant}</text>
                <text x={100} y={184} textAnchor="middle" className="text-[8px] font-black fill-stone-500 dark:fill-stone-400">{t.jobs.axisCommunication}</text>
                <text x={22} y={103} textAnchor="end" className="text-[8px] font-black fill-stone-500 dark:fill-stone-400">{t.jobs.axisCompliance}</text>

                <polygon
                  points={`100,${100 - 70 * (careerA.traits.analytical / 5)} ${100 + 70 * (careerA.traits.quantitative / 5)},100 ${100},${100 + 70 * (careerA.traits.clientFacing / 5)} ${100 - 70 * (careerA.traits.compliance / 5)},100`}
                  fill={`${careerA.accentTo}15`}
                  stroke={careerA.accentTo}
                  strokeWidth="2"
                />

                <polygon
                  points={`100,${100 - 70 * (careerB.traits.analytical / 5)} ${100 + 70 * (careerB.traits.quantitative / 5)},100 ${100},${100 + 70 * (careerB.traits.clientFacing / 5)} ${100 - 70 * (careerB.traits.compliance / 5)},100`}
                  fill="#6366f115"
                  stroke="#6366f1"
                  strokeWidth="2"
                />
              </svg>

              <div className="flex flex-row sm:flex-col gap-4 text-xs font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1.5 rounded" style={{ backgroundColor: careerA.accentTo }} />
                  <span className="text-stone-700 dark:text-stone-300">{careerA.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1.5 rounded bg-indigo-500" />
                  <span className="text-stone-700 dark:text-stone-300">{careerB.title}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/** Hai dãy tab (bản rộng và bản gọn) cùng chọn từ tập này. Đặt tên union thay
 *  vì liệt kê tay ở ba chỗ, để thêm một tab không lặng lẽ trượt qua. */
type JobTab = "daily" | "insights" | "path" | "skills" | "profile" | "search";

/** `embedded` để trang này nằm bên trong một trang khác.
 *
 *  Nó được nhúng xuống dưới các ô chọn nghề ở /nghe-nghiep-hoc, và khi đó cái
 *  vỏ trang riêng của nó là thứ phải bỏ đi: `min-h-screen` đẩy nội dung bên
 *  trên ra khỏi màn hình, thanh tiêu đề dính (sticky) chồng lên thanh của
 *  trang chủ, và "Quay lại dashboard" nằm giữa trang thì trỏ sai chỗ - người
 *  đọc đang ở giữa trang Học theo nghề chứ không phải ở đầu một trang riêng. */
export default function JobSearchClient({ embedded = false }: { embedded?: boolean } = {}) {
  const { t } = useI18n();
  const quizQuestions = useMemo(() => quizQuestionsOf(t), [t]);
  const categories = useMemo(() => categoriesOf(t), [t]);
  const [selected, setSelected] = useState<FinanceCareer>(FINANCE_CAREERS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categoryTabsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<JobTab>("daily");
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  
  // Custom states for P2 features
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [selectedPathStep, setSelectedPathStep] = useState<number | null>(0);
  // Mục tiêu nghề và danh sách mục đã hoàn thành sống trong localStorage, và
  // AppNavbar cũng đọc cùng khoá đó. Đọc thẳng từ nguồn thay vì chép sang
  // state trong một effect lúc mount: giá trị đúng ngay lần render đầu, và
  // mọi lần ghi ở dưới chỉ cần báo một tiếng là cả hai nơi cùng đổi.
  const trackedGoal = useLocalStorageValue(CAREER_GOAL_KEY, CAREER_GOAL_STORAGE_EVENT);
  const completedRaw = useLocalStorageValue(CAREER_ITEMS_KEY, CAREER_GOAL_STORAGE_EVENT);
  const completedItems = useMemo<string[]>(() => {
    if (!completedRaw) return [];
    try {
      const parsed = JSON.parse(completedRaw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [completedRaw]);

  // Career Fit Quiz State
  const [userId, setUserId] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<string | null>(null);
  const [quizRecommendedCareerIds, setQuizRecommendedCareerIds] = useState<string[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        
        // Check local storage first for quick display
        const localClaim = localStorage.getItem(`career_quiz_completed_${user.id}`);
        if (localClaim) {
          setQuizCompleted(true);
          setQuizResult(localClaim);
          const localRecommended = localStorage.getItem(`career_quiz_recommended_${user.id}`);
          if (localRecommended) {
            try {
              setQuizRecommendedCareerIds(JSON.parse(localRecommended) as string[]);
            } catch {
              setQuizRecommendedCareerIds([]);
            }
          }
        } else {
          // Check from supabase quest completions
          const { data } = await supabase
            .from("user_quest_completions")
            .select("quest_type")
            .eq("user_id", user.id)
            .eq("quest_type", "career_assessment")
            .maybeSingle();
          if (data) {
            setQuizCompleted(true);
            setQuizResult(t.jobs.quizDone);
          }
        }
      }
    });
  }, []);


  // Reconciles the local (instant-first-paint) goal with the real
  // server-side one once we know who's signed in - the server value wins if
  // they've set a goal on another device, so this doesn't stay stuck
  // showing stale localStorage from before that upgrade.
  useEffect(() => {
    if (!userId) return;
    getMyCareerGoal(userId)
      .then((serverGoal) => {
        if (serverGoal) {
          // Ghi rồi báo. Bản cũ chỉ ghi, nên khi server và máy này lệch nhau
          // thì AppNavbar giữ nguyên mục tiêu cũ cho tới lần tải trang sau.
          localStorage.setItem(CAREER_GOAL_KEY, serverGoal);
          notifyLocalStorageChanged(CAREER_GOAL_STORAGE_EVENT);
          window.dispatchEvent(new CustomEvent(CAREER_GOAL_EVENT, { detail: { careerId: serverGoal } }));
        }
      })
      .catch((error) => console.error("Error loading career goal:", error));
  }, [userId]);

  const handleTrackGoal = (careerId: string) => {
    if (trackedGoal === careerId) {
      localStorage.removeItem(CAREER_GOAL_KEY);
      localStorage.removeItem("thtcdn_career_goal");
      localStorage.removeItem(CAREER_ITEMS_KEY);
      notifyLocalStorageChanged(CAREER_GOAL_STORAGE_EVENT);
      toast.info(t.jobs.goalCleared);
      window.dispatchEvent(new CustomEvent(CAREER_GOAL_EVENT, { detail: { careerId: null } }));
      if (userId) {
        void clearCareerGoal(userId).catch((error) => {
          console.error("Error clearing career goal:", error);
          toast.error(t.jobs.goalClearedLocalOnly);
        });
      }
    } else {
      localStorage.setItem(CAREER_GOAL_KEY, careerId);
      localStorage.setItem("thtcdn_career_goal", careerId);
      localStorage.setItem(CAREER_ITEMS_KEY, JSON.stringify([]));
      notifyLocalStorageChanged(CAREER_GOAL_STORAGE_EVENT);
      toast.success(t.miscUi.jobSearchClient.goalSetSuccess);
      window.dispatchEvent(new CustomEvent(CAREER_GOAL_EVENT, { detail: { careerId } }));
      // A failed write used to be logged and forgotten while the success
      // toast above stood - so a goal that never left the browser looked
      // saved. Report it instead; the local copy still works for this device.
      if (userId) {
        void setCareerGoal(userId, careerId).catch((error) => {
          console.error("Error saving career goal:", error);
          toast.error(t.jobs.goalSaveFailed);
        });
      }
    }
  };

  const handleToggleItem = (item: string) => {
    const next = completedItems.includes(item)
      ? completedItems.filter(i => i !== item)
      : [...completedItems, item];
    localStorage.setItem(CAREER_ITEMS_KEY, JSON.stringify(next));
    notifyLocalStorageChanged(CAREER_GOAL_STORAGE_EVENT);
  };

  const startQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setShowQuiz(true);
  };

  const handleAnswerSelect = (optionType: string) => {
    const nextAnswers = [...quizAnswers, optionType];
    setQuizAnswers(nextAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate top personality type
      const counts: Record<string, number> = {
        Analytical: 0,
        Compliance: 0,
        "Client-facing": 0,
        Quantitative: 0
      };

      nextAnswers.forEach((ans) => {
        counts[ans] = (counts[ans] || 0) + 1;
      });

      let topType = "Analytical";
      let maxScore = 0;
      Object.entries(counts).forEach(([type, score]) => {
        if (score > maxScore) {
          maxScore = score;
          topType = type;
        }
      });

      const bucket = (["Analytical", "Compliance", "Client-facing", "Quantitative"] as const).includes(
        topType as "Analytical" | "Compliance" | "Client-facing" | "Quantitative"
      )
        ? (topType as "Analytical" | "Compliance" | "Client-facing" | "Quantitative")
        : "Quantitative";
      const resultString = format(t.jobs.quizResultLine, {
        type: t.jobs.quizTypeLabel[bucket],
        roles: t.jobs.quizTypeRoles[bucket],
      });
      setQuizResult(resultString);
      setQuizCompleted(true);
      setShowQuiz(false);

      // Rank every career by similarity between the quiz's answer-count
      // vector and its own `traits` (same 4 dimensions: analytical,
      // compliance, clientFacing, quantitative) instead of only surfacing a
      // generic text blurb for the winning bucket - reuses data every
      // career already has, no new fields needed.
      const answerVector = {
        analytical: counts.Analytical,
        compliance: counts.Compliance,
        clientFacing: counts["Client-facing"],
        quantitative: counts.Quantitative,
      };
      const ranked = [...FINANCE_CAREERS]
        .map((career) => ({
          career,
          score:
            answerVector.analytical * career.traits.analytical +
            answerVector.compliance * career.traits.compliance +
            answerVector.clientFacing * career.traits.clientFacing +
            answerVector.quantitative * career.traits.quantitative,
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((r) => r.career.id);
      setQuizRecommendedCareerIds(ranked);

      if (userId) {
        localStorage.setItem(`career_quiz_completed_${userId}`, resultString);
        localStorage.setItem(`career_quiz_recommended_${userId}`, JSON.stringify(ranked));

        // Claim the 50 XP quest reward. One-time (ONCE_ONLY_QUESTS), so it's
        // outside the weekly quest XP cap - xpEarned here is always either
        // 50 or 0 (already claimed), never a partial amount.
        claimQuestReward(userId, "career_assessment", "once")
          .then(({ claimed, xpEarned }) => {
            if (claimed && xpEarned > 0) {
              toast.success(format(t.miscUi.jobSearchClient.quizRewardSuccess, { xp: xpEarned }));
              void recalculateUserStats(userId).catch(() => {});
            }
          })
          .catch((err) => {
            console.error("Error claiming career quiz XP:", err);
          });
      }
    }
  };

  const filteredCareers = FINANCE_CAREERS.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.searchKeyword.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  function handleSelectCareer(career: FinanceCareer) {
    setSelected(career);
    setMobileDetailOpen(true);
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const el = document.getElementById("career-detail-panel");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    }
  }

  function getStressColor(level: number) {
    if (level <= 3) return "bg-emerald-500";
    if (level <= 4) return "bg-amber-500";
    return "bg-rose-500";
  }

  function getWlbColor(level: number) {
    if (level >= 3.5) return "bg-emerald-500";
    if (level >= 2.5) return "bg-amber-500";
    return "bg-rose-500";
  }

  function getDifficultyColor(level: number) {
    if (level <= 3) return "bg-sky-500";
    if (level <= 4) return "bg-indigo-500";
    return "bg-violet-500";
  }

  return (
    <div className={`bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans transition-colors duration-300 ${embedded ? "" : "min-h-screen"}`}>
      
      {/* Top Header Bar */}
      <div className={`z-30 border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md ${embedded ? "" : "sticky top-0"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            {!embedded && (
              <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                {t.jobs.backToDashboard}
              </Link>
            )}
            <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100 mt-1.5 flex items-center gap-2.5">
              <Briefcase className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
              {t.jobs.pageTitle}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            {/* Lối vào phố nghề 3D. Đặt ngay cạnh tiêu đề chứ không giấu dưới
                cuối trang: cả khu phố dựng từ chính danh sách nghề của trang
                này, và người không biết nó tồn tại thì sẽ không bao giờ vào. */}
            <Link
              href="/pho-nghe"
              className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-3.5 py-1.5 text-xs font-extrabold text-amber-200 shadow-md transition-colors hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700"
            >
              {t.jobs.walk3d}
            </Link>
            <div className="max-w-sm text-xs text-stone-500 dark:text-stone-400">
              {t.jobs.pageSubtitle}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ── HIGHLIGHTED TARGET CAREER GOAL BANNER AT TOP ───────────────── */}
        {trackedGoal ? (
          (() => {
            const goalCareer = FINANCE_CAREERS.find((c) => c.id === trackedGoal);
            if (!goalCareer) return null;
            return (
              <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-emerald-950 border-2 border-emerald-500/60 rounded-3xl p-6 text-white shadow-xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                      {goalCareer.emoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
                          {t.jobs.goalChosen}
                        </span>
                        {goalCareer.id === "non-finance-learner" && (
                          <span className="text-[10px] font-black uppercase text-amber-300 tracking-widest bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/40">
                            {t.jobs.goalOutsider}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                        {goalCareer.title} <span className="text-stone-400 text-base font-normal">({goalCareer.englishTitle})</span>
                      </h2>
                      <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
                        {goalCareer.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
                    <button
                      onClick={() => handleSelectCareer(goalCareer)}
                      className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 font-bold text-xs rounded-xl transition-all shadow-md text-stone-950 cursor-pointer"
                    >
                      {t.jobs.goalDetailLink}
                    </button>
                    <button
                      onClick={() => handleTrackGoal(goalCareer.id)}
                      className="px-3.5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs rounded-xl border border-stone-700 transition-colors cursor-pointer"
                    >
                      {t.jobs.goalClear}
                    </button>
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
          <div className="bg-amber-500/10 dark:bg-amber-950/40 border-2 border-amber-400/60 dark:border-amber-700/60 rounded-3xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <span className="text-3xl p-2.5 bg-amber-500/20 rounded-2xl shrink-0">🎯</span>
              <div>
                <h3 className="text-sm font-black text-amber-900 dark:text-amber-200">
                  {t.jobs.noGoalTitle}
                </h3>
                <p className="text-xs text-amber-800/80 dark:text-amber-300 mt-0.5 leading-relaxed">
                  {t.jobs.noGoalPart1}
                <strong>{t.jobs.noGoalOptionName}</strong>
                {t.jobs.noGoalPart2}
                </p>
              </div>
            </div>
          </div>
        )}

        <CareerRoadmapMap careers={FINANCE_CAREERS} onSelectCareer={handleSelectCareer} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: Careers List & Filters */}
          <div className="md:col-span-5 lg:col-span-4 space-y-4">
            
            {/* Search Input Box */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-600" />
              <input
                type="text"
                placeholder={t.jobs.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 text-sm font-semibold placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="p-4 sm:p-5 rounded-2xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
              
              {!quizCompleted ? (
                <div>
                  <div className="flex items-center gap-2 text-stone-900 dark:text-stone-500">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-pulse animate-duration-1000" />
                    <h4 className="text-xs font-black uppercase tracking-wider">{t.jobs.quizTitle}</h4>
                  </div>
                  <p className="hidden sm:block text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
                    {t.jobs.quizBlurbPart1}
                    <strong className="text-emerald-600 dark:text-emerald-400 font-black">{t.jobs.quizXpReward}</strong>
                    {t.jobs.quizBlurbPart2}
                  </p>
                  <p className="sm:hidden text-[10px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                    {t.jobs.quizBlurbShortPart1}
                    <strong className="text-emerald-600 dark:text-emerald-400 font-black">{t.jobs.quizXpReward}</strong>
                    {t.jobs.quizBlurbPart2}
                  </p>
                  <button
                    onClick={startQuiz}
                    className="w-full mt-2.5 sm:mt-3 py-1.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-50 dark:hover:bg-emerald-400 text-white text-xs font-black shadow-sm transition-all cursor-pointer text-center"
                  >
                    {t.jobs.quizStart}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 text-stone-900 dark:text-stone-500">
                    <SearchCode className="w-4 h-4 text-emerald-500" />
                    <h4 className="text-xs font-black uppercase tracking-wider">{t.jobs.quizResultTitle}</h4>
                  </div>
                  <div className="mt-2 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-950/30 border border-stone-200/40 dark:border-stone-800 text-xs">
                    <span className="text-[9px] font-black uppercase text-stone-400 dark:text-stone-500 block mb-0.5">{t.jobs.quizBestMatch}</span>
                    <span className="font-extrabold text-stone-800 dark:text-stone-200 block leading-tight">{quizResult?.split(" - ")[0]}</span>
                  </div>

                  {quizRecommendedCareerIds.length > 0 && (
                    <div className="mt-2.5 space-y-1.5">
                      {quizRecommendedCareerIds
                        .map((id) => FINANCE_CAREERS.find((c) => c.id === id))
                        .filter((c): c is FinanceCareer => Boolean(c))
                        .map((career) => (
                          <button
                            key={career.id}
                            onClick={() => {
                              handleSelectCareer(career);
                              trackFeatureClick("career_quiz_recommendation_click", { label: career.id });
                            }}
                            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950/20 hover:border-emerald-400 dark:hover:border-emerald-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-colors text-left cursor-pointer"
                          >
                            <span className="text-sm shrink-0">{career.emoji}</span>
                            <span className="text-[11px] font-bold text-stone-700 dark:text-stone-300 truncate">{career.title}</span>
                          </button>
                        ))}
                    </div>
                  )}

                  <button
                    onClick={startQuiz}
                    className="w-full mt-2.5 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 text-[10px] font-bold hover:bg-stone-50 dark:hover:bg-stone-950 transition-all cursor-pointer text-center"
                  >
                    {t.jobs.quizRetake}
                  </button>
                </div>
              )}
            </div>

            {/* Category Filter Tabs - the row scrolls horizontally but gave
                no visual hint that it does, so it looked cut off/broken
                (especially once several category pills push past the
                sidebar width). Left/right arrow buttons make the
                scrollability obvious at a glance, not just discoverable by
                accidentally swiping. */}
            <div className="relative">
              <button
                type="button"
                onClick={() => categoryTabsRef.current?.scrollBy({ left: -160, behavior: "smooth" })}
                aria-label={t.jobs.scrollLeft}
                className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-sm flex items-center justify-center text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <div
                ref={categoryTabsRef}
                className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none px-7"
              >
                {categories.map((cat) => {
                  const isCatSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer select-none ${
                        isCatSelected
                          ? "bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm"
                          : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800/80 hover:bg-stone-50 dark:hover:bg-stone-800"
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => categoryTabsRef.current?.scrollBy({ left: 160, behavior: "smooth" })}
                aria-label={t.jobs.scrollRight}
                className="absolute -right-1 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-sm flex items-center justify-center text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Careers Scroll List */}
            <div className="space-y-2.5 max-h-[70vh] md:max-h-[50vh] overflow-y-auto pr-1">
              {filteredCareers.length > 0 ? (
                filteredCareers.map((career) => {
                  const isSelected = selected.id === career.id;
                  return (
                    <button
                      key={career.id}
                      onClick={() => {
                        handleSelectCareer(career);
                        trackFeatureClick("career_card_click", { label: career.id });
                      }}
                      className={`w-full group text-left flex items-center gap-4 p-4 rounded-2xl border-2 transition-all relative overflow-hidden select-none ${
                        isSelected
                          ? "bg-white dark:bg-stone-900 border-emerald-500 dark:border-emerald-400 shadow-md translate-x-1"
                          : "bg-white dark:bg-stone-900/60 border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-white dark:hover:bg-stone-900"
                      }`}
                    >
                      {/* Selected Glow Bar */}
                      {isSelected && (
                        <div 
                          className="absolute left-0 top-0 bottom-0 w-1.5 rounded-r"
                          style={{
                            background: `linear-gradient(to bottom, ${career.accentFrom}, ${career.accentTo})`
                          }}
                        />
                      )}
                      
                      {/* Avatar container */}
                      <div className="relative shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm">
                        <Image
                          src={career.avatar3d}
                          alt={career.title}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover relative z-10"
                        />
                      </div>

                      {/* Info text */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-black text-stone-950 dark:text-stone-500 leading-tight flex items-center gap-1.5">
                          {career.title}
                        </h3>
                        <p className="text-xs text-stone-400 dark:text-stone-500 font-bold mt-0.5">{career.englishTitle}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 uppercase tracking-wide">
                            {career.salaryHint.split(" • ")[0]}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                        isSelected 
                          ? "text-emerald-500 dark:text-emerald-400 translate-x-0.5" 
                          : "text-stone-300 dark:text-stone-700 group-hover:text-stone-500"
                      }`} />
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-white dark:bg-stone-900/60 rounded-3xl border border-dashed border-stone-200 dark:border-stone-800 px-6">
                  <SearchCode className="w-10 h-10 mx-auto text-stone-300 dark:text-stone-700 mb-3" />
                  <p className="text-sm font-bold text-stone-500 dark:text-stone-400">{t.jobs.noResults}</p>
                  <p className="text-xs text-stone-400 dark:text-stone-600 mt-1">{t.jobs.noResultsHint}</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Detail View (Desktop) */}
          <div id="career-detail-panel" className="hidden md:block md:col-span-7 lg:col-span-8">
            <div className="bg-white dark:bg-stone-900/80 rounded-3xl border-2 border-stone-200 dark:border-stone-800/80 p-8 shadow-xl relative overflow-hidden backdrop-blur-md min-h-[70vh]">
              {/* Background gradient blur */}
              <div 
                className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${selected.accentFrom}, ${selected.accentTo})`
                }}
              />
              
              {/* Header Details Panel */}
              <div className="flex flex-col lg:flex-row gap-6 items-start pb-6 border-b border-stone-100 dark:border-stone-800">
                <CareerAvatar career={selected} size={110} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span 
                      className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                      style={{
                        background: `linear-gradient(135deg, ${selected.accentFrom}, ${selected.accentTo})`
                      }}
                    >
                      {selected.entryLevel.split(" - ")[0]}
                    </span>
                    <span className="text-xs text-stone-400 dark:text-stone-500 font-extrabold">{format(t.jobs.salaryRange, { range: selected.salaryHint })}</span>
                  </div>
                  <p className="text-[10px] text-stone-300 dark:text-stone-600 font-semibold mt-1">
                    {t.jobs.salaryDisclaimer}
                  </p>
                  <h2 className="text-2xl font-black text-stone-900 dark:text-stone-50 mt-2 leading-tight">
                    {selected.title}
                  </h2>
                  <p className="text-sm text-stone-400 dark:text-stone-500 font-bold mt-0.5">{selected.englishTitle}</p>
                  <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mt-4 bg-stone-50/50 dark:bg-stone-950/30 p-3.5 rounded-xl border border-stone-200/40 dark:border-stone-800/30">
                    {selected.summary}
                  </p>
                </div>
              </div>

              {/* Metrics & Radar Chart Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 pb-6 border-b border-stone-100 dark:border-stone-800">
                {/* Left Side: Stats & Goal Tracking */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <MetricBar 
                      label={t.jobs.difficultyFull} 
                      value={selected.entryDifficulty} 
                      color={getDifficultyColor(selected.entryDifficulty)} 
                      icon={GraduationCap} 
                    />
                    <MetricBar 
                      label={t.jobs.pressureFull} 
                      value={selected.stressLevel} 
                      color={getStressColor(selected.stressLevel)} 
                      icon={Activity} 
                    />
                    <MetricBar 
                      label={t.jobs.balanceFull} 
                      value={selected.wlb} 
                      color={getWlbColor(selected.wlb)} 
                      icon={Heart} 
                    />
                  </div>
                  
                  {/* Action buttons (Track Goal & Compare) */}
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={() => handleTrackGoal(selected.id)}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer text-center select-none flex items-center justify-center gap-1.5 ${
                        trackedGoal === selected.id
                          ? "bg-amber-500 text-white shadow-md border border-amber-400"
                          : "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm hover:opacity-90 active:scale-[0.98]"
                      }`}
                    >
                      🎯 {trackedGoal === selected.id ? t.jobs.goalSet : t.jobs.goalSetAction}
                    </button>
                    <button
                      onClick={() => {
                        setCompareModalOpen(true);
                      }}
                      className="py-2.5 px-4 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-black hover:bg-stone-50 dark:hover:bg-stone-950 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                    >
                      {t.jobs.compareShort}
                    </button>
                  </div>
                </div>

                {/* Right Side: Radar Chart */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                  <CareerRadarChart traits={selected.traits} color={selected.accentTo} />
                </div>
              </div>

              {/* Active Goal Checklist Box */}
              {trackedGoal === selected.id && (
                <div className="mt-5 p-5 rounded-2xl bg-amber-500/5 border-2 border-dashed border-amber-500/20 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🏆</span>
                      <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">{t.jobs.prepProgress}</h4>
                    </div>
                    <span className="text-xs font-black text-amber-600 dark:text-amber-400">
                      {Math.round(((completedItems.filter(i => [...(selected.skills || []), ...(selected.certifications || [])].includes(i)).length) / ((selected.skills?.length || 0) + (selected.certifications?.length || 0) || 1)) * 100)}%
                    </span>
                  </div>
                  
                  <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="h-full bg-amber-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((completedItems.filter(i => [...(selected.skills || []), ...(selected.certifications || [])].includes(i)).length) / ((selected.skills?.length || 0) + (selected.certifications?.length || 0) || 1)) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-normal mb-3 font-semibold">
                    {t.jobs.prepProgressHint}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
                    {[...(selected.skills || []), ...(selected.certifications || [])].map((item) => {
                      const isChecked = completedItems.includes(item);
                      const isCert = (selected.certifications || []).includes(item);
                      return (
                        <label 
                          key={item}
                          className={`flex items-start gap-2.5 p-2 rounded-lg border text-[11px] font-bold transition-all cursor-pointer select-none ${
                            isChecked
                              ? "bg-white dark:bg-stone-900 border-amber-400 text-stone-800 dark:text-stone-200 shadow-sm"
                              : "bg-white/40 dark:bg-stone-900/20 border-stone-200/50 dark:border-stone-800/50 text-stone-400 hover:border-stone-300"
                          }`}
                        >
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleItem(item)}
                            className="mt-0.5 rounded border-stone-300 text-amber-500 focus:ring-amber-500 h-3.5 w-3.5 cursor-pointer accent-amber-500"
                          />
                          <span className="leading-tight flex-1">
                            {isCert ? "🎓 " : "⚡ "}{item}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              <RelatedLessonsPanel career={selected} />

              {/* Detail Navigation Tabs */}
              <div className="flex border-b border-stone-200 dark:border-stone-800 mt-8 gap-2 overflow-x-auto scrollbar-none">
                {[
                  { id: "daily", label: t.jobs.tabDuties, icon: Clock },
                  { id: "insights", label: t.jobs.tabAdvice, icon: Lightbulb },
                  { id: "path", label: t.jobs.tabPath, icon: Award },
                  { id: "skills", label: t.jobs.tabSkills, icon: Terminal },
                  { id: "profile", label: t.jobs.tabProfile, icon: TrendingUp },
                  { id: "search", label: t.jobs.tabFindJobs, icon: Search }
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as JobTab)}
                      className={`flex items-center gap-1.5 px-4 py-3 text-xs font-black uppercase tracking-wider relative transition-colors ${
                        isActive ? "text-emerald-500 dark:text-emerald-400" : "text-stone-400 dark:text-stone-500 hover:text-stone-600"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                      {isActive && (
                        <motion.div 
                          layoutId="activeTabUnderline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Tab Contents */}
              <div className="py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab + "_" + selected.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "daily" && (
                      <div className="space-y-6">
                        {/* Day in life narrative */}
                        <div className="bg-emerald-50/40 dark:bg-emerald-950/10 p-5 rounded-2xl border border-emerald-500/10 flex gap-4">
                          <Lightbulb className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <div className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                            <span className="font-extrabold text-stone-900 dark:text-stone-100 block mb-1">{t.jobs.typicalDay}</span>
                            <span className="italic">"{selected.dayInLife}"</span>
                          </div>
                        </div>

                        {/* Specific Responsibilities */}
                        <div>
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            {t.jobs.jobDescription}
                          </h3>
                          <ul className="space-y-3">
                            {selected.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-stone-700 dark:text-stone-300">
                                <span className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: selected.accentTo }} />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {activeTab === "insights" && (
                      <div className="space-y-6">
                        {/* Pros & Cons split layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="bg-emerald-50/20 dark:bg-emerald-950/10 p-5 rounded-2xl border border-emerald-500/10 shadow-sm">
                            <h4 className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider mb-2 flex items-center gap-1.5">
                              <ThumbsUp className="w-4 h-4" />
                              {t.jobs.pros}
                            </h4>
                            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                              {selected.pros}
                            </p>
                          </div>
                          
                          <div className="bg-rose-50/20 dark:bg-rose-950/10 p-5 rounded-2xl border border-rose-500/10 shadow-sm">
                            <h4 className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 tracking-wider mb-2 flex items-center gap-1.5">
                              <ThumbsDown className="w-4 h-4" />
                              {t.jobs.cons}
                            </h4>
                            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                              {selected.cons}
                            </p>
                          </div>
                        </div>

                        {/* Application Advice box */}
                        <div className="bg-amber-50/30 dark:bg-amber-950/10 p-5 rounded-2xl border border-amber-500/10 flex gap-4 shadow-sm">
                          <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                          <div className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                            <span className="font-extrabold text-stone-900 dark:text-stone-100 block mb-1">{t.jobs.applyTips}</span>
                            <span>{selected.applicationTips}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "path" && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Career progression timeline */}
                        <div>
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4">
                            {t.jobs.careerPath}
                          </h3>
                          <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold mb-3 italic">
                            {t.jobs.careerPathHint}
                          </p>
                          <div className="relative border-l-2 border-stone-200 dark:border-stone-800 ml-4 pl-6 space-y-4 py-2">
                            {selected.careerPath.map((step, idx) => {
                              const isStepActive = selectedPathStep === idx;
                              return (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedPathStep(idx)}
                                  className={`relative w-full text-left flex flex-col p-2.5 rounded-xl transition-all cursor-pointer border ${
                                    isStepActive 
                                      ? "bg-indigo-50/40 dark:bg-indigo-950/10 border-indigo-500/30 translate-x-1" 
                                      : "bg-transparent border-transparent hover:bg-stone-50 dark:hover:bg-stone-900/40"
                                  }`}
                                >
                                  <div 
                                    className={`absolute -left-[35px] top-3 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-sm transition-transform ${
                                      isStepActive ? "scale-110" : "scale-100"
                                    }`}
                                    style={{
                                      background: `linear-gradient(135deg, ${selected.accentFrom}, ${selected.accentTo})`
                                    }}
                                  >
                                    {idx + 1}
                                  </div>
                                  <h4 className={`text-sm font-black transition-colors ${isStepActive ? "text-indigo-600 dark:text-indigo-400" : "text-stone-900 dark:text-stone-100"}`}>{step}</h4>
                                  <p className="text-[9px] uppercase font-black tracking-wider text-stone-400 dark:text-stone-500 mt-0.5">
                                    {idx === 0 ? t.jobs.ladderStart : idx === selected.careerPath.length - 1 ? t.jobs.ladderEnd : t.jobs.ladderMiddle}
                                  </p>
                                </button>
                              );
                            })}
                          </div>

                          {selectedPathStep !== null && (
                            <motion.div 
                              key={selectedPathStep}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-5 p-4 rounded-2xl bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/20 text-xs"
                            >
                              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-indigo-500/10">
                                <span className="font-extrabold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                                  {format(t.jobs.pathStep, { step: selectedPathStep + 1, name: selected.careerPath[selectedPathStep] })}
                                </span>
                                <span className="font-black text-stone-400 uppercase tracking-widest text-[9px]">
                                  {selectedPathStep === 0 ? t.jobs.years0 : selectedPathStep === 1 ? t.jobs.years1 : selectedPathStep === 2 ? t.jobs.years2 : t.jobs.years3}
                                </span>
                              </div>
                              <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-2 font-semibold">
                                <strong className="text-stone-800 dark:text-stone-200">{t.jobs.pathFocus}</strong>
                                {selectedPathStep === 0 
                                  ? t.jobs.focus0 
                                  : selectedPathStep === 1 
                                    ? t.jobs.focus1
                                    : selectedPathStep === 2
                                      ? t.jobs.focus2
                                      : t.jobs.focus3}
                              </p>
                              <div className="flex items-start gap-1.5 text-stone-500 dark:text-stone-400 italic">
                                <Lightbulb className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                                <span>
                                  <strong>{t.jobs.pathTip}</strong>
                                  {selectedPathStep === 0 
                                    ? t.jobs.tip0
                                    : selectedPathStep === 1
                                      ? t.jobs.tip1
                                      : selectedPathStep === 2
                                        ? t.jobs.tip2
                                        : t.jobs.tip3}
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Key Certifications recommended */}
                        <div>
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4">
                            {t.jobs.certifications}
                          </h3>
                          <div className="space-y-3">
                            {selected.certifications.map((cert, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-3.5 bg-stone-50 dark:bg-stone-950/40 rounded-xl border border-stone-200/50 dark:border-stone-800">
                                <Award className="w-5 h-5 text-amber-500 shrink-0" />
                                <span className="text-xs font-bold text-stone-700 dark:text-stone-300">{cert}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "skills" && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Skills Required */}
                        <div>
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4">
                            {t.jobs.skills}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selected.skills.map((skill) => (
                              <span 
                                key={skill}
                                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/40 dark:border-stone-800"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Software & Systems Tools */}
                        <div>
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4">
                            {t.jobs.tools}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selected.requiredTools.map((tool) => (
                              <span 
                                key={tool}
                                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30 flex items-center gap-1.5"
                              >
                                <Terminal className="w-3.5 h-3.5" />
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "profile" && (
                      <CareerProfilePanel userId={userId} careerId={selected.id} />
                    )}

                    {activeTab === "search" && (
                      <div className="space-y-6">
                        <div className="bg-stone-50 dark:bg-stone-950/40 p-5 rounded-2xl border border-stone-200/40 dark:border-stone-800">
                          <h4 className="text-xs font-black uppercase text-stone-400 dark:text-stone-500">{t.jobs.keywordsTitle}</h4>
                          <p className="text-lg font-black text-stone-800 dark:text-stone-200 mt-1">"{selected.searchKeyword}"</p>
                          <p className="text-xs text-stone-400 mt-1">{t.jobs.keywordsHint}</p>
                        </div>

                        <div>
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3.5">
                            {t.jobs.findJobs}
                          </h3>
                          <div className="grid grid-cols-3 gap-3">
                            {JOB_SEARCH_SITES.map((site) => (
                              <button
                                key={site.id}
                                onClick={() => window.open(site.buildUrl(selected.searchKeyword), "_blank", "noopener,noreferrer")}
                                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-black hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer"
                              >
                                {site.label}
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3.5">
                            {t.jobs.otherPositions}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {SUGGESTED_JOB_KEYWORDS.map((keyword) => (
                              <button
                                key={keyword}
                                onClick={() => window.open(JOB_SEARCH_SITES[0].buildUrl(keyword), "_blank", "noopener,noreferrer")}
                                className="px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 text-[11px] font-bold text-stone-600 dark:text-stone-400 hover:border-emerald-400 dark:hover:border-emerald-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                              >
                                {keyword}
                              </button>
                            ))}
                          </div>
                        </div>

                        <p className="text-[10px] text-stone-400 dark:text-stone-500 italic mt-4 text-center">
                          {t.jobs.cvReminder}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* MOBILE FULL-SCREEN BOTTOM SHEET / MODAL */}
      <AnimatePresence>
        {mobileDetailOpen && selected && (
          <motion.div 
            className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-sm flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileDetailOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-stone-950 w-full max-h-[92vh] rounded-t-3xl overflow-y-auto p-6 relative border-t-2 border-stone-200 dark:border-stone-800"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close indicator/pull handle */}
              <div className="w-12 h-1 bg-stone-300 dark:bg-stone-800 rounded-full mx-auto mb-4" onClick={() => setMobileDetailOpen(false)} />
              
              {/* Close Button */}
              <button
                onClick={() => setMobileDetailOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Mobile Header */}
              <div className="flex gap-4 items-center pb-5 border-b border-stone-100 dark:border-stone-800">
                <CareerAvatar career={selected} size={80} />
                <div className="min-w-0 flex-1">
                  <span 
                    className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white inline-block"
                    style={{
                      background: `linear-gradient(135deg, ${selected.accentFrom}, ${selected.accentTo})`
                    }}
                  >
                    {selected.entryLevel.split(" - ")[0]}
                  </span>
                  <h2 className="text-lg font-black text-stone-950 dark:text-stone-50 leading-snug mt-1">
                    {selected.title}
                  </h2>
                  <p className="text-xs text-stone-400 dark:text-stone-500 font-bold">{selected.englishTitle}</p>
                </div>
              </div>

              {/* Mobile summary */}
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mt-4 bg-stone-50 dark:bg-stone-900/30 p-3 rounded-xl">
                {selected.summary}
              </p>

              {/* Mobile stats */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-stone-50 dark:bg-stone-900/40 p-3 rounded-xl border border-stone-200/50 dark:border-stone-800 text-center">
                  <p className="text-[9px] uppercase font-bold text-stone-400">{t.jobs.difficulty}</p>
                  <p className="text-sm font-black text-stone-800 dark:text-stone-200 mt-1">{selected.entryDifficulty}/5</p>
                </div>
                <div className="bg-stone-50 dark:bg-stone-900/40 p-3 rounded-xl border border-stone-200/50 dark:border-stone-800 text-center">
                  <p className="text-[9px] uppercase font-bold text-stone-400">{t.jobs.pressure}</p>
                  <p className="text-sm font-black text-stone-800 dark:text-stone-200 mt-1">{selected.stressLevel}/5</p>
                </div>
                <div className="bg-stone-50 dark:bg-stone-900/40 p-3 rounded-xl border border-stone-200/50 dark:border-stone-800 text-center">
                  <p className="text-[9px] uppercase font-bold text-stone-400">{t.jobs.balance}</p>
                  <p className="text-sm font-black text-stone-800 dark:text-stone-200 mt-1">{selected.wlb}/5</p>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleTrackGoal(selected.id)}
                  className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-black transition-all cursor-pointer text-center select-none flex items-center justify-center gap-1.5 ${
                    trackedGoal === selected.id
                      ? "bg-amber-500 text-white shadow-md border border-amber-400"
                      : "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm hover:opacity-90 active:scale-[0.98]"
                  }`}
                >
                  🎯 {trackedGoal === selected.id ? t.jobs.goalSetShort : t.jobs.goalSetActionShort}
                </button>
                <button
                  onClick={() => {
                    setCompareModalOpen(true);
                  }}
                  className="py-2 px-3 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-[10px] font-black hover:bg-stone-50 dark:hover:bg-stone-950 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                >
                  {t.jobs.compareShortest}
                </button>
              </div>

              {/* Mobile Active Goal Checklist Box */}
              {trackedGoal === selected.id && (
                <div className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-dashed border-amber-500/20 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">🏆</span>
                      <h4 className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">{t.jobs.prepProgress}</h4>
                    </div>
                    <span className="text-[10px] font-black text-amber-600 dark:text-amber-400">
                      {Math.round(((completedItems.filter(i => [...(selected.skills || []), ...(selected.certifications || [])].includes(i)).length) / ((selected.skills?.length || 0) + (selected.certifications?.length || 0) || 1)) * 100)}%
                    </span>
                  </div>
                  
                  <div className="w-full h-1 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-300"
                      style={{ width: `${((completedItems.filter(i => [...(selected.skills || []), ...(selected.certifications || [])].includes(i)).length) / ((selected.skills?.length || 0) + (selected.certifications?.length || 0) || 1)) * 100}%` }}
                    />
                  </div>
                  
                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {[...(selected.skills || []), ...(selected.certifications || [])].map((item) => {
                      const isChecked = completedItems.includes(item);
                      const isCert = (selected.certifications || []).includes(item);
                      return (
                        <label 
                          key={item}
                          className={`flex items-start gap-2 p-1.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer select-none ${
                            isChecked
                              ? "bg-white dark:bg-stone-900 border-amber-400 text-stone-800 dark:text-stone-200 shadow-sm"
                              : "bg-white/40 dark:bg-stone-900/20 border-stone-200/50 dark:border-stone-800/50 text-stone-400"
                          }`}
                        >
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleItem(item)}
                            className="mt-0.5 rounded border-stone-300 text-amber-500 focus:ring-amber-500 h-3 w-3 cursor-pointer accent-amber-500"
                          />
                          <span className="leading-tight flex-1">
                            {isCert ? "🎓 " : "⚡ "}{item}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              <RelatedLessonsPanel career={selected} />

              {/* Mobile tabs container */}
              <div className="flex border-b border-stone-200 dark:border-stone-800 mt-5 gap-1 overflow-x-auto scrollbar-none">
                {[
                  { id: "daily", label: t.jobs.tabDutiesShort, icon: Clock },
                  { id: "insights", label: t.jobs.tabAdviceShort, icon: Lightbulb },
                  { id: "path", label: t.jobs.tabPathShort, icon: Award },
                  { id: "skills", label: t.jobs.tabSkillsShort, icon: Terminal },
                  { id: "profile", label: t.jobs.tabProfileShort, icon: TrendingUp },
                  { id: "search", label: t.jobs.tabFindJobsShort, icon: Search }
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as JobTab)}
                      className={`flex items-center gap-1.5 px-3.5 py-2.5 text-[10px] font-black uppercase tracking-wider relative shrink-0 transition-colors select-none ${
                        isActive ? "text-emerald-500 dark:text-emerald-400" : "text-stone-400 dark:text-stone-500 hover:text-stone-600"
                      }`}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      {tab.label}
                      {isActive && (
                        <motion.div 
                          layoutId="activeMobileTabUnderline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Mobile Tabbed Contents */}
              <div className="py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={"mobile_" + activeTab + "_" + selected.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                  >
                    {activeTab === "daily" && (
                      <div className="space-y-4">
                        <div className="bg-emerald-50/40 dark:bg-emerald-950/10 p-4 rounded-xl border border-emerald-500/10 text-xs italic leading-relaxed text-stone-700 dark:text-stone-300">
                          <span className="font-extrabold text-stone-900 dark:text-stone-100 block mb-1">{t.jobs.typicalDayShort}</span>
                          "{selected.dayInLife}"
                        </div>
                        <div>
                          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            {t.jobs.jobDescriptionShort}
                          </h4>
                          <ul className="space-y-2">
                            {selected.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300">
                                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: selected.accentTo }} />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {activeTab === "insights" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="p-4 bg-emerald-50/20 dark:bg-emerald-950/10 rounded-2xl border border-emerald-500/10">
                            <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 block mb-1 flex items-center gap-1">
                              <ThumbsUp className="w-3.5 h-3.5" />
                              {t.jobs.prosShort}
                            </span>
                            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{selected.pros}</p>
                          </div>
                          <div className="p-4 bg-rose-50/20 dark:bg-rose-950/10 rounded-2xl border border-rose-500/10">
                            <span className="text-[9px] font-black text-rose-600 dark:text-rose-400 block mb-1 flex items-center gap-1">
                              <ThumbsDown className="w-3.5 h-3.5" />
                              {t.jobs.consShort}
                            </span>
                            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{selected.cons}</p>
                          </div>
                        </div>
                        <div className="p-4 bg-amber-50/20 dark:bg-amber-950/10 rounded-2xl border border-amber-500/10 text-xs flex gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <div className="text-stone-700 dark:text-stone-300 leading-relaxed">
                            <span className="font-extrabold text-stone-900 dark:text-stone-100 block mb-0.5">{t.jobs.applyTipsShort}</span>
                            {selected.applicationTips}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "path" && (
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">{t.jobs.careerPathShort}</h4>
                          <p className="text-[9px] text-stone-400 dark:text-stone-500 font-bold mb-3 italic">
                            {t.jobs.careerPathHintShort}
                          </p>
                          <div className="relative border-l border-stone-200 dark:border-stone-800 ml-3 pl-5 space-y-3 py-1">
                            {selected.careerPath.map((step, idx) => {
                              const isStepActive = selectedPathStep === idx;
                              return (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedPathStep(idx)}
                                  className={`relative w-full text-left flex flex-col p-2 rounded-xl transition-all cursor-pointer border ${
                                    isStepActive 
                                      ? "bg-indigo-50/40 dark:bg-indigo-950/10 border-indigo-500/30" 
                                      : "bg-transparent border-transparent hover:bg-stone-50 dark:hover:bg-stone-900/40"
                                  }`}
                                >
                                  <div 
                                    className={`absolute -left-[26px] top-2.5 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[8px] font-black text-white ${
                                      isStepActive ? "scale-110" : "scale-100"
                                    }`}
                                    style={{
                                      background: `linear-gradient(135deg, ${selected.accentFrom}, ${selected.accentTo})`
                                    }}
                                  >
                                    {idx + 1}
                                  </div>
                                  <h4 className={`text-xs font-black transition-colors ${isStepActive ? "text-indigo-600 dark:text-indigo-400" : "text-stone-900 dark:text-stone-100"}`}>{step}</h4>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {selectedPathStep !== null && (
                          <motion.div 
                            key={selectedPathStep}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3.5 rounded-xl bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/20 text-[11px]"
                          >
                            <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-indigo-500/10">
                              <span className="font-extrabold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                                {format(t.jobs.pathStep, { step: selectedPathStep + 1, name: selected.careerPath[selectedPathStep] })}
                              </span>
                              <span className="font-black text-stone-400 uppercase tracking-widest text-[8px]">
                                {selectedPathStep === 0 ? t.jobs.years0Short : selectedPathStep === 1 ? t.jobs.years1Short : selectedPathStep === 2 ? t.jobs.years2Short : t.jobs.years3}
                              </span>
                            </div>
                            <p className="text-stone-600 dark:text-stone-300 leading-normal mb-1.5 font-semibold">
                              <strong>{t.jobs.pathFocus}</strong>
                              {selectedPathStep === 0 
                                ? t.jobs.focus0Short 
                                : selectedPathStep === 1 
                                  ? t.jobs.focus1Short
                                  : selectedPathStep === 2
                                    ? t.jobs.focus2Short
                                    : t.jobs.focus3Short}
                            </p>
                            <div className="flex items-start gap-1 text-stone-500 dark:text-stone-400 italic">
                              <Lightbulb className="w-3 h-3 text-indigo-500 shrink-0 mt-0.5" />
                              <span>
                                <strong>{t.jobs.pathTip}</strong>
                                {selectedPathStep === 0 
                                  ? t.jobs.tip0Short
                                  : selectedPathStep === 1
                                    ? t.jobs.tip1Short
                                    : selectedPathStep === 2
                                      ? t.jobs.tip2Short
                                      : t.jobs.tip3Short}
                              </span>
                            </div>
                          </motion.div>
                        )}
                        <div className="pt-3 border-t border-stone-100 dark:border-stone-800">
                          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">{t.jobs.certificationsShort}</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {selected.certifications.map((cert) => (
                              <span key={cert} className="text-[10px] font-bold px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center gap-1">
                                <Award className="w-3.5 h-3.5 text-amber-500" />
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "skills" && (
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">{t.jobs.skills}</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {selected.skills.map((skill) => (
                              <span key={skill} className="text-[10px] font-semibold px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">{t.jobs.toolsShort}</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {selected.requiredTools.map((tool) => (
                              <span key={tool} className="text-[10px] font-semibold px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30 flex items-center gap-1">
                                <Terminal className="w-3 h-3" />
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "profile" && (
                      <CareerProfilePanel userId={userId} careerId={selected.id} />
                    )}

                    {activeTab === "search" && (
                      <div className="space-y-4">
                        <div className="bg-stone-50 dark:bg-stone-900/40 p-4 rounded-xl border border-stone-200/50 dark:border-stone-800">
                          <span className="text-[9px] font-bold text-stone-400 uppercase">{t.jobs.keywordsTitle}</span>
                          <p className="text-sm font-black text-stone-800 dark:text-stone-200 mt-0.5">"{selected.searchKeyword}"</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">{t.jobs.findJobsShort}</h4>
                          <div className="grid grid-cols-3 gap-2">
                            {JOB_SEARCH_SITES.map((site) => (
                              <button
                                key={site.id}
                                onClick={() => window.open(site.buildUrl(selected.searchKeyword), "_blank", "noopener,noreferrer")}
                                className="flex items-center justify-center gap-1 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[10px] font-black shadow-md cursor-pointer"
                              >
                                {site.label}
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">{t.jobs.otherPositionsShort}</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {SUGGESTED_JOB_KEYWORDS.map((keyword) => (
                              <button
                                key={keyword}
                                onClick={() => window.open(JOB_SEARCH_SITES[0].buildUrl(keyword), "_blank", "noopener,noreferrer")}
                                className="px-2.5 py-1 rounded-full border border-stone-200 dark:border-stone-800 text-[10px] font-bold text-stone-600 dark:text-stone-400 cursor-pointer"
                              >
                                {keyword}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUIZ MODAL */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-stone-900 rounded-3xl border-2 border-stone-200 dark:border-stone-800 w-full max-w-lg p-6 relative shadow-2xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
            >
              <button
                onClick={() => setShowQuiz(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                  {format(t.jobs.quizQuestionCounter, { current: quizStep + 1, total: quizQuestions.length })}
                </span>
                <h3 className="text-base font-black text-stone-900 dark:text-stone-50 mt-3 leading-snug">
                  {quizQuestions[quizStep].question}
                </h3>
              </div>
              
              <div className="space-y-2.5">
                {quizQuestions[quizStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswerSelect(opt.type)}
                    className="w-full text-left p-4 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-emerald-500 dark:hover:border-emerald-400 hover:bg-stone-50 dark:hover:bg-stone-900/60 transition-all font-semibold text-xs text-stone-800 dark:text-stone-200 cursor-pointer flex items-start"
                  >
                    <span className="inline-block w-5 h-5 rounded-full bg-stone-100 dark:bg-stone-800 text-center leading-5 text-[10px] font-bold mr-3 text-stone-500 dark:text-stone-400 shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ComparisonModal
        open={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        careerA={selected}
      />
    </div>
  );
}
