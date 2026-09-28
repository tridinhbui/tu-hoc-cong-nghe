"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  CheckCircle2,
  Circle,
  Cloud,
  ShieldCheck,
  Server,
  Wallet,
  Lock,
  Activity,
  Gauge,
  PiggyBank,
  BookOpen,
  Bug,
  Network,
  Radar,
  ClipboardCheck,
  Info,
  Dumbbell,
  type LucideIcon,
} from "lucide-react";
import CertHeroSection from "@/components/CertHeroSection";
import CertRoadmapStepper, { type StepperStep } from "@/components/CertRoadmapStepper";
import CertValueBadges from "@/components/CertValueBadges";
import CertMotivationBanner from "@/components/CertMotivationBanner";
import CertDomainPractice from "@/components/CertDomainPractice";
import type { LessonMeta } from "@/lib/lesson-types";
import type { CertDomain, CertTrack } from "@/lib/cert-tracks";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

/**
 * Trang một chứng chỉ: hero bài kế tiếp + vòng tiến độ, dải chặng, bốn ô giá
 * trị, danh sách miền mở/gập, và banner động viên. Hai điểm đáng chú ý:
 *
 * - Mỗi miền có TỈ TRỌNG trong đề thật, và đó là thông tin quan trọng nhất
 *   của trang: nó nói nên học miền nào trước. Nên nó đứng thành một nhãn cạnh
 *   tên miền, không chìm trong dòng phụ.
 * - Icon tra theo id miền chứ không theo vị trí. Bản gốc ánh xạ theo vị trí và
 *   tự ghi là đổi thứ tự miền mà quên mảng icon thì "không lỗi, chỉ sai".
 */

const DOMAIN_ICONS: Record<string, LucideIcon> = {
  "cloud-concepts": Cloud,
  "security-compliance": ShieldCheck,
  "technology-services": Server,
  "billing-support": Wallet,
  "secure-architectures": Lock,
  "resilient-architectures": Activity,
  "high-performing-architectures": Gauge,
  "cost-optimized-architectures": PiggyBank,
  "general-concepts": BookOpen,
  "threats-vulnerabilities": Bug,
  "security-architecture": Network,
  "security-operations": Radar,
  "program-management": ClipboardCheck,
};

interface Props {
  cert: CertTrack;
  domains: { domain: CertDomain; lessons: LessonMeta[]; completedCount: number }[];
  completedLessonIds: number[];
  distinctLessonCount: number;
}

export default function CertTrackView({ cert, domains, completedLessonIds, distinctLessonCount }: Props) {
  const { t } = useI18n();
  const s = t.certTracks.shared;
  const c = t.certTracks.certs[cert.id];
  const [openDomains, setOpenDomains] = useState<Set<string>>(new Set());
  const [practiceDomain, setPracticeDomain] = useState<string | null>(null);
  const completedSet = new Set(completedLessonIds);

  // Đếm theo Ô như bản gốc: một bài nằm ở hai miền thì thanh của mỗi miền đều
  // tính nó, và thanh tổng phải là tổng các thanh miền.
  const totalSlots = domains.reduce((sum, d) => sum + d.lessons.length, 0);
  const totalCompleted = domains.reduce((sum, d) => sum + d.completedCount, 0);
  const overallPct = totalSlots > 0 ? Math.round((totalCompleted / totalSlots) * 100) : 0;
  const completedDomains = domains.filter((d) => d.lessons.length > 0 && d.completedCount >= d.lessons.length).length;

  const nextLesson = domains.flatMap((d) => d.lessons).find((l) => !completedSet.has(l.id)) ?? null;
  const nextDomainId = domains.find((d) => d.lessons.some((l) => l.id === nextLesson?.id))?.domain.id;
  const firstSlug = domains[0]?.lessons[0]?.slug ?? null;

  // Chặng theo tiến độ thật: "Nắm nền tảng" xong khi miền đầu tiên xong, "Ôn
  // theo miền" xong khi mọi miền xong. Chặng thi thật không bao giờ "xong" ở
  // đây - web không biết người học đã thi hay chưa.
  const firstDomainDone = domains[0] ? domains[0].completedCount >= domains[0].lessons.length : false;
  const allDone = totalSlots > 0 && totalCompleted >= totalSlots;
  const steps: StepperStep[] = [
    {
      title: s.stepFoundations,
      status: firstDomainDone ? "completed" : "active",
      statusText: firstDomainDone ? s.stepperOpen : s.stepperActive,
      iconType: "shield",
    },
    {
      title: s.stepDomains,
      status: allDone ? "completed" : "active",
      statusText: allDone ? s.stepperOpen : s.stepperActive,
      iconType: "flag",
    },
    { title: s.stepReview, status: "active", statusText: s.stepperOpen, iconType: "flag" },
    { title: s.stepExam, status: "locked", statusText: s.stepExamStatus, iconType: "trophy" },
  ];

  function toggleDomain(id: string) {
    setOpenDomains((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="min-h-0 flex-1 space-y-7 overflow-y-auto pr-0.5 font-sans [scrollbar-width:thin]">
      <CertHeroSection
        categoryLabel={
          nextDomainId ? t.certTracks.domains[nextDomainId as keyof typeof t.certTracks.domains].title.toUpperCase() : format(s.heroCurriculumLabel, { code: cert.examCode })
        }
        lessonTitle={nextLesson ? nextLesson.title : cert.name}
        lessonSubtitle={c.heroSubtitle}
        lessonSlug={nextLesson?.slug ?? firstSlug}
        heroImageSrc="/images/dashboard/checkpoint_hero_mountain.jpg"
        heroImageAlt={s.heroImageAlt}
        overallPct={overallPct}
        completedTopics={completedDomains}
        totalTopics={domains.length}
        completedLessons={totalCompleted}
        totalLessons={totalSlots}
        remainingText={format(s.heroRemaining, {
          count: Math.max(0, domains.length - completedDomains),
          code: cert.examCode,
        })}
      />

      <CertRoadmapStepper title={format(s.roadmapTitle, { code: cert.examCode })} steps={steps} />

      <CertValueBadges
        items={[
          { icon: "target", title: format(s.valueRoadmapTitle, { code: cert.examCode }), desc: s.valueRoadmapDesc },
          { icon: "book", title: s.valueCoreTitle, desc: s.valueCoreDesc },
          { icon: "pen", title: s.valuePracticeTitle, desc: s.valuePracticeDesc },
          { icon: "chart", title: s.valueProgressTitle, desc: s.valueProgressDesc },
        ]}
      />

      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-2 border-b border-stone-200/90 pb-3 sm:flex-row sm:items-center dark:border-stone-800">
          <h2 className="font-mono text-xs font-black tracking-wider text-stone-900 uppercase dark:text-stone-100">
            {format(s.libraryTitle, { code: cert.examCode })}
          </h2>
          <span className="text-xs font-medium text-ink-muted">
            {format(s.summary, { domains: domains.length, count: distinctLessonCount })}
          </span>
        </div>

        <div className="divide-y divide-stone-100 overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-xs dark:divide-stone-800 dark:border-stone-800 dark:bg-stone-900">
          {domains.map(({ domain, lessons, completedCount }, idx) => {
            const isOpen = openDomains.has(domain.id);
            const isEmpty = lessons.length === 0;
            const IconComponent = DOMAIN_ICONS[domain.id] ?? BookOpen;
            const copy = t.certTracks.domains[domain.id as keyof typeof t.certTracks.domains];
            const pct = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

            return (
              <div key={domain.id}>
                <button
                  type="button"
                  onClick={() => !isEmpty && toggleDomain(domain.id)}
                  aria-expanded={isOpen}
                  aria-controls={`domain-panel-${domain.id}`}
                  disabled={isEmpty}
                  className={`flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left transition-colors sm:p-5 ${
                    isEmpty ? "cursor-default opacity-50" : "hover:bg-stone-50/70 dark:hover:bg-stone-800/60"
                  }`}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-200/80 bg-brand-50 font-mono text-sm font-black text-brand-800 dark:border-brand-900/60 dark:bg-brand-950/60 dark:text-brand-300">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-stone-200/90 bg-stone-50 sm:flex dark:border-stone-800 dark:bg-stone-800">
                      <IconComponent className="h-5 w-5 text-accent-strong" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-sm font-black text-ink-max">{copy.title}</h3>
                        <span className="shrink-0 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-300">
                          {format(s.weightBadge, { weight: domain.weight })}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-ink-muted">{copy.focus}</p>
                      {isEmpty && (
                        <span className="mt-1 inline-block rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-500 dark:bg-stone-800 dark:text-stone-400">
                          {s.emptySubject}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-4">
                    <div className="hidden flex-col items-end gap-1 sm:flex">
                      <span className="font-mono text-xs font-bold text-ink-body">
                        {format(s.lessonsProgress, { done: completedCount, total: lessons.length })}
                      </span>
                      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-stone-100 sm:w-36 dark:bg-stone-800">
                        <div
                          className="h-full rounded-full bg-brand-600 transition-all dark:bg-brand-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-10 text-right font-mono text-xs font-black text-ink-heading">
                      {pct}%
                    </span>
                    <ChevronRight className={`h-4 w-4 text-stone-400 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && !isEmpty && (
                    <motion.div
                      id={`domain-panel-${domain.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="divide-y divide-stone-100 overflow-hidden border-t border-stone-100 bg-stone-50/50 dark:divide-stone-800/60 dark:border-stone-800 dark:bg-stone-950/40"
                    >
                      {lessons.map((lesson) => {
                        const isDone = completedSet.has(lesson.id);
                        return (
                          <Link
                            key={lesson.id}
                            href={`/bai-hoc/${lesson.slug}`}
                            prefetch={false}
                            className="group flex items-center justify-between gap-3 px-6 py-3 transition-colors hover:bg-brand-50/50 sm:px-8 dark:hover:bg-brand-950/20"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              {isDone ? (
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" />
                              ) : (
                                <Circle className="h-4 w-4 shrink-0 text-stone-300 dark:text-stone-600" />
                              )}
                              <span className="truncate text-xs font-bold text-stone-800 group-hover:text-brand-700 dark:text-stone-200 dark:group-hover:text-brand-400">
                                {lesson.title}
                              </span>
                            </div>
                            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-stone-300 transition-colors group-hover:text-brand-600" />
                          </Link>
                        );
                      })}
                      <div className="px-6 py-3 sm:px-8">
                        <button
                          type="button"
                          onClick={() => setPracticeDomain(domain.id)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-brand-200 bg-white px-4 py-2 text-xs font-black text-brand-800 transition-colors hover:border-brand-400 hover:bg-brand-50 dark:border-brand-900/60 dark:bg-stone-900 dark:text-brand-300 dark:hover:bg-brand-950/40"
                        >
                          <Dumbbell className="h-3.5 w-3.5" />
                          {t.certTracks.practice.cta}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900">
        <h3 className="font-mono text-xs font-black tracking-wider text-stone-900 uppercase dark:text-stone-100">
          {s.examInfoTitle}
        </h3>
        <dl className="mt-3 grid grid-cols-3 gap-3">
          {[
            { label: s.examInfoQuestions, value: String(cert.questions) },
            { label: s.examInfoMinutes, value: format(s.examInfoMinutesValue, { n: cert.minutes }) },
            { label: s.examInfoPassing, value: cert.passingScore },
          ].map((row) => (
            <div key={row.label} className="rounded-xl bg-stone-50 px-3 py-2.5 dark:bg-stone-800/60">
              <dt className="text-[10.5px] font-bold text-stone-500 uppercase dark:text-stone-400">{row.label}</dt>
              <dd className="mt-0.5 font-mono text-sm font-black text-ink-max">{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {s.examInfoNote}
        </p>
      </div>

      <CertMotivationBanner
        quoteTitle={s.motivationTitle}
        quoteSubtitle={c.motivationSubtitle}
        ctaText={s.ctaLearnNow}
        nextLessonSlug={nextLesson?.slug ?? firstSlug}
      />

      {practiceDomain && (
        <CertDomainPractice
          certId={cert.id}
          domainId={practiceDomain}
          domainTitle={t.certTracks.domains[practiceDomain as keyof typeof t.certTracks.domains].title}
          onClose={() => setPracticeDomain(null)}
        />
      )}
    </div>
  );
}
