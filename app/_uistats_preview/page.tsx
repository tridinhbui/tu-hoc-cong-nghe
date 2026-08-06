"use client";

import UserStats from "@/components/UserStats";
import { useI18n } from "@/lib/i18n/context";

export default function UiStatsPreview() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-stone-950 p-8 flex flex-wrap gap-8 items-start">
      <div className="w-[280px]">
        <p className="text-xs font-bold mb-2 text-stone-500">{t.finalTwo.uistatsPreview.sidebarTrueLabel}</p>
        <UserStats xp={30} lessonsCompleted={3} totalLessons={326} avgQuizScore={75} sidebar={true} />
      </div>
      <div className="w-[420px]">
        <p className="text-xs font-bold mb-2 text-stone-500">{t.finalTwo.uistatsPreview.sidebarFalseLabel}</p>
        <UserStats xp={30} lessonsCompleted={3} totalLessons={326} avgQuizScore={75} sidebar={false} />
      </div>
      <div className="w-[280px]">
        <p className="text-xs font-bold mb-2 text-stone-500">{t.finalTwo.uistatsPreview.maxLevelLabel}</p>
        <UserStats xp={1600} lessonsCompleted={300} totalLessons={326} avgQuizScore={92} sidebar={true} />
      </div>
    </div>
  );
}
