"use client";

import Link from "next/link";
import Image from "next/image";
import { Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface CertMotivationBannerProps {
  quoteTitle?: string;
  quoteSubtitle: string;
  ctaText?: string;
  nextLessonSlug?: string | null;
}

export default function CertMotivationBanner({
  quoteTitle,
  quoteSubtitle,
  ctaText,
  nextLessonSlug,
}: CertMotivationBannerProps) {
  const { t } = useI18n();
  const title = quoteTitle ?? t.certTracks.shared.motivationTitle;
  const subtitle = quoteSubtitle;
  const cta = ctaText ?? t.certTracks.shared.ctaLearnNow;
  return (
    <div className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-brand-50/70 dark:bg-stone-900 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-12 h-12 rounded-xl bg-white dark:bg-stone-800 border border-brand-200/80 dark:border-brand-900/60 p-1 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
          <Image
            src="/images/potted_plant_3d.jpg"
            alt={t.dashCards.certBannerPlantAlt}
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-black text-ink-max truncate">
            {title}
          </h3>
          <p className="text-xs font-medium text-ink-soft mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {nextLessonSlug && (
        <Link
          href={`/bai-hoc/${nextLessonSlug}`}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-brand-900 hover:bg-brand-700 text-white font-black text-xs px-5 py-3 transition-all shadow-xs active:scale-95 cursor-pointer self-stretch sm:self-auto justify-center"
        >
          <span>{cta}</span>
          <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
        </Link>
      )}
    </div>
  );
}
