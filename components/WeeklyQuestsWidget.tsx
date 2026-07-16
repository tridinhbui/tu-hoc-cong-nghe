"use client";

import { useState, useEffect } from "react";
import { Flame, BookOpen, Trophy, Sparkles, CheckCircle2, Gift } from "lucide-react";
import { toast } from "sonner";
import { recalculateUserStats } from "@/lib/supabase-user";

interface WeeklyQuestsWidgetProps {
  userId: string;
}

export default function WeeklyQuestsWidget({ userId }: WeeklyQuestsWidgetProps) {
  const [streak, setStreak] = useState<number>(0);
  const [weeklyLessonsCount, setWeeklyLessonsCount] = useState<number>(0);
  const [perfectQuizStreak, setPerfectQuizStreak] = useState<number>(0);
  const [isEpicClaimed, setIsEpicClaimed] = useState<boolean>(false);
  const [claiming, setClaiming] = useState<boolean>(false);

  // Storage keys
  const streakKey = `thtcdn_streak_${userId}`;
  const weeklyLessonsKey = `thtcdn_weekly_completed_lessons_${userId}`;
  const perfectQuizzesKey = `thtcdn_weekly_perfect_quizzes_${userId}`;
  const chestKey = `thtcdn_chests_${userId}`;

  // Get key for the current week to prevent multiple claims in the same week
  const getWeekKey = () => {
    const d = new Date();
    const oneJan = new Date(d.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((d.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
    return `${d.getFullYear()}_w${weekNumber}`;
  };

  const weekKey = getWeekKey();
  const epicClaimedKey = `thtcdn_weekly_epic_claimed_${userId}_${weekKey}`;

  const getMondayOfCurrentWeek = () => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    const monday = new Date(d.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday.getTime();
  };

  const loadProgress = () => {
    if (typeof window === "undefined") return;

    // 1. Streak
    const currentStreak = Number(window.localStorage.getItem(streakKey) ?? "0");
    setStreak(currentStreak);

    // 2. Weekly lessons completed since Monday
    const mondayTime = getMondayOfCurrentWeek();
    const rawLessons = window.localStorage.getItem(weeklyLessonsKey) ?? "[]";
    try {
      const lessonsList = JSON.parse(rawLessons) as { lessonId: number; timestamp: number }[];
      const activeThisWeek = lessonsList.filter((l) => l.timestamp >= mondayTime);
      // Unique lesson completions this week
      const uniqueLessonIds = new Set(activeThisWeek.map((l) => l.lessonId));
      setWeeklyLessonsCount(uniqueLessonIds.size);
    } catch (e) {
      setWeeklyLessonsCount(0);
    }

    // 3. Perfect quiz streak
    const currentPerfect = Number(window.localStorage.getItem(perfectQuizzesKey) ?? "0");
    setPerfectQuizStreak(currentPerfect);

    // 4. Epic Claimed status
    const claimed = window.localStorage.getItem(epicClaimedKey) === "true";
    setIsEpicClaimed(claimed);
  };

  useEffect(() => {
    loadProgress();

    // Listen to lesson completions and updates
    window.addEventListener("thtcdn_weekly_quests_updated", loadProgress);
    window.addEventListener("thtcdn_profile_updated", loadProgress);
    return () => {
      window.removeEventListener("thtcdn_weekly_quests_updated", loadProgress);
      window.removeEventListener("thtcdn_profile_updated", loadProgress);
    };
  }, [userId]);

  // Quests definitions
  const streakProgress = Math.min(streak, 5);
  const lessonsProgress = Math.min(weeklyLessonsCount, 10);
  const quizProgress = Math.min(perfectQuizStreak, 3);

  const quest1Done = streakProgress >= 5;
  const quest2Done = lessonsProgress >= 10;
  const quest3Done = quizProgress >= 3;

  const allQuestsDone = quest1Done && quest2Done && quest3Done;

  const handleClaimEpic = async () => {
    if (!allQuestsDone || isEpicClaimed || claiming) return;
    setClaiming(true);

    try {
      // Award +3 Reward Chests
      const currentChests = Number(window.localStorage.getItem(chestKey) ?? "0");
      window.localStorage.setItem(chestKey, String(currentChests + 3));

      // Award +100 XP
      await recalculateUserStats(userId);

      // Save claim status
      window.localStorage.setItem(epicClaimedKey, "true");
      setIsEpicClaimed(true);

      toast.success("Chúc mừng! Bạn đã mở khóa Rương Sử Thi: Nhận +3 Rương Quà & +100 XP cực lớn! 🎁🏆👑");
      
      // Dispatch events to refresh chest counters and profile rewards
      window.dispatchEvent(new Event("thtcdn_chests_updated"));
      window.dispatchEvent(new Event("thtcdn_profile_updated"));
    } catch (error) {
      console.error("Error claiming epic chest:", error);
      toast.error("Lỗi khi nhận phần thưởng. Hãy thử lại.");
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-850 rounded-3xl p-5 shadow-sm space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
        <div>
          <h4 className="text-xs font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500 animate-bounce" />
            Nhiệm Vụ Tuần Lớn
          </h4>
          <p className="text-[9px] text-stone-400 dark:text-stone-500 font-semibold mt-0.5">
            Hoàn thành cả 3 mục tiêu để nhận Rương Sử Thi
          </p>
        </div>
        <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
          { (quest1Done ? 1 : 0) + (quest2Done ? 1 : 0) + (quest3Done ? 1 : 0) }/3
        </span>
      </div>

      {/* Quests List */}
      <div className="space-y-3.5">
        {/* Quest 1: Streak */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-extrabold text-stone-700 dark:text-stone-300">
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              Chuỗi Học Tập Kiên Trì
            </span>
            <span>{streakProgress}/5 ngày</span>
          </div>
          <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${quest1Done ? "bg-orange-500" : "bg-orange-400"}`}
              style={{ width: `${(streakProgress / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Quest 2: Lesson counts */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-extrabold text-stone-700 dark:text-stone-300">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-sky-500" />
              Chinh Phục Kiến Thức
            </span>
            <span>{lessonsProgress}/10 bài học</span>
          </div>
          <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${quest2Done ? "bg-sky-500" : "bg-sky-400"}`}
              style={{ width: `${(lessonsProgress / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Quest 3: Perfect quizzes */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-extrabold text-stone-700 dark:text-stone-300">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              Bậc Thầy Trắc Nghiệm
            </span>
            <span>{quizProgress}/3 bài 100%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${quest3Done ? "bg-emerald-500" : "bg-emerald-400"}`}
              style={{ width: `${(quizProgress / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Epic Chest Claim Button */}
      {allQuestsDone ? (
        isEpicClaimed ? (
          <div className="p-3 bg-stone-50 dark:bg-stone-950 border border-stone-150 dark:border-stone-850 rounded-2xl text-center text-[10px] text-stone-450 dark:text-stone-550 font-bold flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Đã nhận phần thưởng tuần này!
          </div>
        ) : (
          <button
            onClick={handleClaimEpic}
            disabled={claiming}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95 animate-pulse"
          >
            <Gift className="w-4.5 h-4.5" />
            {claiming ? "Đang nhận quà..." : "Mở Rương Sử Thi! 🎁"}
          </button>
        )
      ) : (
        <div className="p-3 bg-stone-50 dark:bg-stone-950 border border-stone-150 dark:border-stone-850 rounded-2xl text-center text-[10px] text-stone-400 dark:text-stone-550 font-bold">
          🔒 Rương Sử Thi đang bị khóa
        </div>
      )}
    </div>
  );
}
