"use client";

import { useMemo } from "react";
import SpotlightTour, { type TourStep } from "@/components/SpotlightTour";
import { useI18n } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

function stepsOf(t: Dictionary): TourStep[] {
  const d = t.dataRest.lessonTour;
  return [
    {
      selector: '[data-tour="lesson-progress"]',
      title: d.progressTitle,
      text: d.progressText,
    },
    {
      selector: '[data-tour="lesson-bookmark"]',
      title: d.bookmarkTitle,
      text: d.bookmarkText,
    },
    {
      selector: '[data-tour="lesson-tai-tai"]',
      title: d.taiTaiTitle,
      text: d.taiTaiText,
    },
    {
      selector: '[data-tour="lesson-quiz"]',
      title: d.quizTitle,
      text: d.quizText,
    },
  ];
}

// Same one-time spotlight walkthrough mechanism as the dashboard, but for a
// first-time visitor's very first lesson page - including the free preview
// lesson reachable without an account, which never sees the dashboard tour
// at all since it never visits /dashboard.
export default function LessonTour({ userId }: { userId?: string | null }) {
  const { t } = useI18n();
  const steps = useMemo(() => stepsOf(t), [t]);
  return <SpotlightTour steps={steps} storageKey="lesson_tour_seen_v1" userId={userId} remoteKey="lesson" />;
}
