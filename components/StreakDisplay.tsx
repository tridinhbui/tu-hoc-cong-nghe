"use client";

import { useState, useEffect } from "react";
import { Flame } from "lucide-react";
import { getUserStreak, hasActivityToday as checkActivityToday } from "@/lib/supabase-streak";
import { createClient } from "@/lib/supabase";

export default function StreakDisplay() {
  const [streak, setStreak] = useState(0);
  const [hasActivityToday, setHasActivityToday] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const streakData = await getUserStreak(user.id);
          const activityToday = await checkActivityToday(user.id);

          setStreak(streakData?.current_streak || 0);
          setHasActivityToday(activityToday);
        }
      } catch (error) {
        console.error("Error fetching streak:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreak();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 animate-pulse w-full sm:w-36 h-[76px]" />
    );
  }

  return (
    <div
      className="flex items-center gap-2.5 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 w-full sm:w-36"
      title={hasActivityToday ? "Đã học hôm nay" : "Chưa học hôm nay"}
    >
      <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center flex-shrink-0">
        <Flame className={`w-4 h-4 ${hasActivityToday ? "text-orange-500" : "text-stone-400 dark:text-stone-600"}`} />
      </div>
      <div className="min-w-0">
        <p className="text-lg font-bold text-stone-900 dark:text-stone-100 leading-none">{streak}</p>
        <p className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mt-0.5">
          ngày liên tiếp
        </p>
      </div>
    </div>
  );
}
