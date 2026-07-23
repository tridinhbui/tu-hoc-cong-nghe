"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import {
  getUserStreak,
  hasActivityToday as checkActivityToday,
  getRemainingStreakFreezes,
  type UserStreak,
} from "@/lib/supabase-streak";

export default function DashboardStreakWidget({ userId }: { userId: string }) {
  const [streak, setStreak] = useState(0);
  const [freezesLeft, setFreezesLeft] = useState(3);
  const [hasActivityToday, setHasActivityToday] = useState(false);
  const [, setStreakRow] = useState<UserStreak | null>(null);

  useEffect(() => {
    let cancelled = false;

    getUserStreak(userId)
      .then((streakData) => {
        if (cancelled) return;
        setStreak(streakData?.current_streak || 0);
        setFreezesLeft(getRemainingStreakFreezes(streakData));
        setStreakRow(streakData);
      })
      .catch((error) => console.error("Error loading streak:", error));

    checkActivityToday(userId)
      .then((todayActivity) => {
        if (!cancelled) setHasActivityToday(todayActivity);
      })
      .catch((error) => console.error("Error checking today activity:", error));

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm min-w-[220px]">
      <div className={`relative flex h-10 w-10 items-center justify-center rounded-full ${streak > 0 ? "bg-orange-50" : "bg-stone-100"}`}>
        {streak > 0 && hasActivityToday && (
          <div className="absolute inset-0 rounded-full bg-orange-500/15 animate-pulse" />
        )}
        <Flame className={`h-4 w-4 ${streak > 0 ? "text-orange-500" : "text-stone-400"}`} />
      </div>
      <div className="min-w-0">
        <span className="block text-[10px] font-black uppercase tracking-widest text-stone-500">Streak</span>
        <span className="mt-0.5 block text-sm font-black leading-none text-orange-600">{streak} ngày</span>
        <span className="mt-1 block text-[10px] font-bold leading-none text-sky-600">
          {freezesLeft} lượt bảo vệ
        </span>
      </div>
    </div>
  );
}
