"use client";

import { useMemo } from "react";
import SpotlightTour, { type TourStep } from "@/components/SpotlightTour";
import { useI18n } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

// The learning path moved to its own /hoc-bai route, so the steps that point
// at it (track selector, resume card, stage list) only have targets there.
// Running one combined list on both routes would silently drop those three
// steps on the dashboard (SpotlightTour skips targets it can't find) - which
// is most of what a first-time learner needs to be shown. So each route gets
// the steps whose targets it actually renders, tracked under its own storage
// key so both play once.
function overviewStepsOf(t: Dictionary): TourStep[] {
  const d = t.dataRest.dashboardTour;
  return [
    {
      selector: '[data-tour="hoc-bai-cta"]',
      title: d.hocBaiCtaTitle,
      text: d.hocBaiCtaText,
    },
    {
      selector: '[data-tour="user-stats"]',
      title: d.userStatsTitle,
      text: d.userStatsText,
    },
    {
      selector: '[data-tour="free-docs"]',
      title: d.freeDocsTitle,
      text: d.freeDocsText,
    },
  ];
}

function lessonsStepsOf(t: Dictionary): TourStep[] {
  const d = t.dataRest.dashboardTour;
  return [
    {
      selector: '[data-tour="resume-learning"]',
      title: d.resumeLearningTitle,
      text: d.resumeLearningText,
    },
    {
      selector: '[data-tour="track-selector"]',
      title: d.trackSelectorTitle,
      text: d.trackSelectorText,
    },
    {
      selector: '[data-tour="stage-list"]',
      title: d.stageListTitle,
      text: d.stageListText,
    },
  ];
}

export default function DashboardTour({
  userId,
  view = "overview",
}: {
  userId?: string | null;
  view?: "overview" | "lessons";
}) {
  const { t } = useI18n();
  const overviewSteps = useMemo(() => overviewStepsOf(t), [t]);
  const lessonsSteps = useMemo(() => lessonsStepsOf(t), [t]);
  const isLessons = view === "lessons";
  return (
    <SpotlightTour
      steps={isLessons ? lessonsSteps : overviewSteps}
      storageKey={isLessons ? "lessons_tour_seen_v1" : "dashboard_tour_seen_v1"}
      userId={userId}
      remoteKey={isLessons ? "lessons" : "dashboard"}
    />
  );
}
