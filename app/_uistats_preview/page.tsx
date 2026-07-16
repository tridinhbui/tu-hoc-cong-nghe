"use client";

import UserStats from "@/components/UserStats";

export default function UiStatsPreview() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-stone-950 p-8 flex flex-wrap gap-8 items-start">
      <div className="w-[280px]">
        <p className="text-xs font-bold mb-2 text-stone-500">sidebar=true (screenshot case)</p>
        <UserStats xp={30} lessonsCompleted={3} totalLessons={326} avgQuizScore={75} sidebar={true} />
      </div>
      <div className="w-[420px]">
        <p className="text-xs font-bold mb-2 text-stone-500">sidebar=false</p>
        <UserStats xp={30} lessonsCompleted={3} totalLessons={326} avgQuizScore={75} sidebar={false} />
      </div>
      <div className="w-[280px]">
        <p className="text-xs font-bold mb-2 text-stone-500">max level</p>
        <UserStats xp={1600} lessonsCompleted={300} totalLessons={326} avgQuizScore={92} sidebar={true} />
      </div>
    </div>
  );
}
