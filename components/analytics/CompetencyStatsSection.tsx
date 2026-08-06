"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { COMPETENCIES, type CompetencyScore } from "@/lib/career-competency";
import { fetchCareerProfile } from "@/lib/career-profile";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

// Same GET /api/career-profile the /su-nghiep radar reads (see
// components/CareerProfilePanel.tsx) - just the competency card grid, none
// of that panel's skill-gap/mission/CV-bullet surfaces, since this is meant
// as a quick "how am I doing per skill" glance inside /analytics rather than
// a career-planning workspace.

const SCORE_BY_ID = (scores: CompetencyScore[]) => new Map(scores.map((s) => [s.id, s]));

function Bar({ percent, color }: { percent: number; color: string }) {
  return (
    <div className="h-2 w-full rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.max(2, percent)}%`, background: color }}
      />
    </div>
  );
}

interface CompetencyStatsSectionProps {
  userId?: string;
}

export default function CompetencyStatsSection({ userId }: CompetencyStatsSectionProps) {
  const { t } = useI18n();
  const [scores, setScores] = useState<Map<CompetencyScore["id"], CompetencyScore> | null>(null);
  const [totalLessonsCompleted, setTotalLessonsCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!userId) {
        if (!cancelled) setLoading(false);
        return;
      }
      try {
        const data = await fetchCareerProfile();
        if (cancelled) return;
        setScores(SCORE_BY_ID(data.competencies));
        setTotalLessonsCompleted(data.totalLessonsCompleted);
        setFailed(false);
      } catch (error) {
        console.error("Error loading competency stats:", error);
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white/95 dark:bg-stone-900 p-5 sm:p-6">
        <p className="text-sm text-stone-400 dark:text-stone-500">{t.finalTwo.competencyStatsSection.loading}</p>
      </div>
    );
  }

  if (!userId || failed || !scores) {
    return (
      <div className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white/95 dark:bg-stone-900 p-5 sm:p-6">
        <p className="text-sm text-stone-500 dark:text-stone-400">{t.finalTwo.competencyStatsSection.failed}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white/95 dark:bg-stone-900 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          {t.finalTwo.competencyStatsSection.title}
        </h3>
        <span className="text-[11px] font-bold text-stone-400 dark:text-stone-500">
          {format(t.finalTwo.competencyStatsSection.lessonsCompletedSuffix, { count: totalLessonsCompleted })}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {COMPETENCIES.map((competency) => {
          const score = scores.get(competency.id);
          return (
            <div
              key={competency.id}
              className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950/40"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-black text-stone-900 dark:text-stone-100">{competency.label}</span>
                <span className="text-lg font-black tabular-nums" style={{ color: competency.color }}>
                  {score?.score ?? 0}%
                </span>
              </div>
              <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">{competency.blurb}</p>
              <div className="mt-2.5">
                <Bar percent={score?.score ?? 0} color={competency.color} />
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                {(score?.parts ?? []).map((part) => (
                  <span key={part.label} className="text-[10px] font-bold text-stone-400 dark:text-stone-500">
                    {part.label}: <span className="text-stone-600 dark:text-stone-300">{part.value}</span>
                  </span>
                ))}
              </div>
              <Link
                href={competency.actionHref}
                className="inline-block mt-3 text-[11px] font-black text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {competency.actionLabel} →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
