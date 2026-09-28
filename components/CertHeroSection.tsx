"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface CertHeroSectionProps {
  categoryLabel: string;
  lessonTitle: string;
  lessonSubtitle: string;
  lessonSlug: string | null;
  heroImageSrc: string;
  heroImageAlt: string;
  overallPct: number;
  completedTopics: number;
  totalTopics: number;
  completedLessons: number;
  totalLessons: number;
  remainingText: string;
}

export default function CertHeroSection({
  categoryLabel,
  lessonTitle,
  lessonSubtitle,
  lessonSlug,
  heroImageSrc,
  heroImageAlt,
  overallPct,
  completedTopics,
  totalTopics,
  completedLessons,
  totalLessons,
  remainingText,
}: CertHeroSectionProps) {
  const { t } = useI18n();
  // SVG Donut calculation
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallPct / 100) * circumference;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* ── LEFT CARD: In-progress Lesson 3D Banner (~68% width on lg) ── */}
      <div className="lg:col-span-8 rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-xs flex flex-col xl:flex-row items-stretch">
        {/* Left deep forest green content */}
        <div className="flex-1 bg-brand-900 dark:bg-brand-900/95 text-white p-6 sm:p-7 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="inline-block text-[10.5px] font-mono font-bold uppercase tracking-wider text-brand-300">
              {categoryLabel}
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
              {lessonTitle}
            </h2>
            <p className="text-xs text-brand-100/80 font-medium leading-relaxed max-w-md">
              {lessonSubtitle}
            </p>
          </div>

          <div className="pt-2">
            {lessonSlug ? (
              <Link
                href={`/bai-hoc/${lessonSlug}`}
                className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-brand-50 text-stone-950 font-black text-xs px-5 py-2.5 transition-all shadow-sm hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>{t.dashCards.certHeroContinue}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-900/60 text-brand-200 text-xs font-bold px-4 py-2">
                {t.dashCards.certHeroAllDone}
              </span>
            )}
          </div>
        </div>

        {/* Ảnh là ảnh chụp chứ không phải cảnh 3D nền trong như bản tài chính,
            nên phủ kín khung (object-cover) thay vì đặt giữa trên nền màu. */}
        <div className="relative w-full xl:w-72 shrink-0 bg-brand-100 dark:bg-stone-800/80 overflow-hidden min-h-[180px]">
          <Image
            src={heroImageSrc}
            alt={heroImageAlt}
            fill
            sizes="(min-width: 1280px) 288px, 100vw"
            className="object-cover select-none"
            priority
          />
        </div>
      </div>

      {/* ── RIGHT CARD: General Progress (TIẾN ĐỘ CHUNG) (~32% width on lg) ── */}
      <div className="lg:col-span-4 rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 shadow-xs flex flex-col justify-between space-y-4">
        <div>
          <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-ink-muted mb-3">
            {t.dashCards.certHeroProgressTitle}
          </span>

          <div className="flex items-center gap-4">
            {/* Donut Chart */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  className="text-stone-100 dark:text-stone-800"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  className="text-accent-strong transition-all duration-700 ease-out"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-base font-black text-ink-max font-mono">
                  {overallPct}%
                </span>
              </div>
            </div>

            {/* Counts */}
            <div className="space-y-1.5">
              <p className="text-xs font-bold text-ink-heading">
                <span className="text-sm font-black text-ink-max font-mono">{completedTopics} / {totalTopics}</span>{" "}
                <span className="text-stone-500 font-medium">{t.dashCards.certHeroTopicsUnit}</span>
              </p>
              <p className="text-xs font-bold text-ink-heading">
                <span className="text-sm font-black text-ink-max font-mono">{completedLessons} / {totalLessons}</span>{" "}
                <span className="text-stone-500 font-medium">{t.dashCards.certHeroLessonsUnit}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal bar & remaining notice */}
        <div className="space-y-2 pt-2 border-t border-line-soft">
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-raised">
            <div
              className="h-full rounded-full bg-brand-600 dark:bg-brand-500 transition-all duration-500"
              /* Giá trị THẬT, không phải Math.max(3, overallPct): sàn 3% vẽ một
                 vạch xanh cho người ở 0%, tức thanh tiến độ nói đã có tiến độ
                 trong khi con số ngay trên nó nói 0%. */
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <p className="text-[11px] font-medium text-ink-muted">
            {remainingText}
          </p>
        </div>
      </div>
    </div>
  );
}
