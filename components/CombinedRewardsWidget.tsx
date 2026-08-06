"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Gift, Sparkles, Trophy, CheckCircle2, Flame, BookOpen, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { toast } from "sonner";
import { recalculateUserStats } from "@/lib/supabase-user";
import { getUserStreak } from "@/lib/supabase-streak";
import { getUnopenedChestCount, openNextChest, earnChest, type ChestReward } from "@/lib/chests";
import { createClient } from "@/lib/supabase";
import DailyQuestsWidget from "@/components/DailyQuestsWidget";
import { useIsClient } from "@/lib/use-is-client";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

interface CombinedRewardsWidgetProps {
  userId: string;
  defaultExpanded?: boolean;
  compact?: boolean;
}

// Merges what used to be two separate cards ("Nhiệm vụ hàng ngày" +
// "Phần Thưởng") into one, per user request. Also fixes two real bugs found
// while doing this:
//
// 1. Chest rewards ("+30/+50/+100 XP") were pure decoration - opening one
//    only called recalculateUserStats(), which has no concept of "chest
//    XP" and recomputes total_xp purely from real activity tables. Chests
//    (and their reward-picking) now live in lib/chests.ts, persisted in
//    Supabase, and getTotalChestXp() is folded into that same formula - so
//    the XP a chest promises is now real and cross-device.
// 2. The weekly "Chuỗi Học Tập" quest tracked its own `thtcdn_streak_*`
//    localStorage key, which nothing in the entire codebase ever WROTE to -
//    it was permanently stuck at 0/5. Now reads the real streak from
//    user_streaks (the same source StreakDisplay/UserStats already show).
/** Nhiệm vụ ngày, chỉ khai phần widget này đọc. */
interface DailyQuest {
  current: number;
  target: number;
  claimed?: boolean;
}

export default function CombinedRewardsWidget({ userId, defaultExpanded = false, compact = false }: CombinedRewardsWidgetProps) {
  const { t } = useI18n();
  const mounted = useIsClient();
  const [activeTab, setActiveTab] = useState<"daily" | "chests" | "weekly">("daily");
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Chest state (now server-backed - see lib/chests.ts)
  const [chestCount, setChestCount] = useState<number>(0);
  const [opening, setOpening] = useState<boolean>(false);
  const [shaking, setShaking] = useState<boolean>(false);
  const [rewardReveal, setRewardReveal] = useState<ChestReward | null>(null);

  // Weekly quest state
  const [realStreak, setRealStreak] = useState<number>(0);
  const [weeklyLessonsCount, setWeeklyLessonsCount] = useState<number>(0);
  const [perfectQuizStreak, setPerfectQuizStreak] = useState<number>(0);
  const [isEpicClaimed, setIsEpicClaimed] = useState<boolean>(false);
  const [claiming, setClaiming] = useState<boolean>(false);
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>([]);
  const [weeklyClaimed, setWeeklyClaimed] = useState<boolean>(false);

  const weeklyLessonsKey = `thtcdn_weekly_completed_lessons_${userId}`;
  const perfectQuizzesKey = `thtcdn_weekly_perfect_quizzes_${userId}`;

  const getWeekKey = () => {
    const d = new Date();
    const oneJan = new Date(d.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((d.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
    return `${d.getFullYear()}-W${weekNumber}`;
  };
  const weekKey = getWeekKey();

  const getMondayOfCurrentWeek = () => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday.getTime();
  };

  const loadChests = async () => {
    try {
      setChestCount(await getUnopenedChestCount(userId));
    } catch (err) {
      console.error("Error loading chest count:", err);
    }
  };

  const loadWeeklyProgress = async () => {
    if (typeof window === "undefined") return;

    try {
      const streak = await getUserStreak(userId);
      setRealStreak(streak?.current_streak ?? 0);
    } catch (err) {
      console.error("Error loading streak for weekly quest:", err);
    }

    const mondayTime = getMondayOfCurrentWeek();
    try {
      const rawLessons = window.localStorage.getItem(weeklyLessonsKey) ?? "[]";
      const lessonsList = JSON.parse(rawLessons) as { lessonId: number; timestamp: number }[];
      const activeThisWeek = lessonsList.filter((l) => l.timestamp >= mondayTime);
      setWeeklyLessonsCount(new Set(activeThisWeek.map((l) => l.lessonId)).size);
    } catch {
      setWeeklyLessonsCount(0);
    }

    setPerfectQuizStreak(Number(window.localStorage.getItem(perfectQuizzesKey) ?? "0"));

    // Whether this week's epic reward was already claimed - checked against
    // the real DB record (user_quest_completions), not a localStorage flag
    // that clearing browser data could bypass.
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("user_quest_completions")
        .select("id")
        .eq("user_id", userId)
        .eq("quest_type", "weekly_epic")
        .eq("day_key", weekKey)
        .maybeSingle();
      setIsEpicClaimed(!!data);
    } catch (err) {
      console.error("Error checking weekly epic claim status:", err);
    }

    // Check weekly chest claim status
    try {
      const supabase = createClient();
      const { data: claimedRow } = await supabase
        .from("user_quest_completions")
        .select("id")
        .eq("user_id", userId)
        .eq("quest_type", "weekly_chest")
        .eq("day_key", weekKey)
        .maybeSingle();
      setWeeklyClaimed(!!claimedRow);
    } catch (err) {
      console.error("Error loading weekly chest claim status:", err);
    }
  };

  useEffect(() => {
    void loadChests();
    void loadWeeklyProgress();

    const events = ["thtcdn_chests_updated", "thtcdn_weekly_quests_updated"];
    const handler = () => {
      void loadChests();
      void loadWeeklyProgress();
    };
    events.forEach((event) => window.addEventListener(event, handler));
    return () => events.forEach((event) => window.removeEventListener(event, handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleOpenChest = () => {
    if (chestCount <= 0 || opening) return;
    setShaking(true);

    setTimeout(async () => {
      setShaking(false);
      setOpening(true);

      const { ok, reward } = await openNextChest(userId);
      if (!ok || !reward) {
        setOpening(false);
        toast.error(t.rewards.chestOpenFailed);
        return;
      }

      setRewardReveal(reward);
      setChestCount((c) => Math.max(0, c - 1));

      if (reward.type === "xp") {
        void recalculateUserStats(userId).catch((err) => console.error("Error applying chest XP:", err));
      }
    }, 1000);
  };

  const handleClaimReward = () => {
    setOpening(false);
    setRewardReveal(null);
    toast.success(t.rewards.rewardCollected);
  };

  const handleWeeklyClaim = async () => {
    const completedQuestsCount = dailyQuests.filter((q) => q.current >= q.target).length;
    if (weeklyClaimed || completedQuestsCount < 3) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("user_quest_completions")
        .insert([{ user_id: userId, quest_type: "weekly_chest", day_key: weekKey, xp_earned: 0 }]);

      if (error) {
        toast.error(t.rewards.weeklyChestClaimFailedTaken);
        return;
      }

      await earnChest(userId, "weekly_quest", 1);
      setWeeklyClaimed(true);
      await loadChests();
      toast.success(t.rewards.weeklyChestClaimSuccess);
      window.dispatchEvent(new Event("thtcdn_chests_updated"));
    } catch (err) {
      console.error("Error claiming weekly chest:", err);
      toast.error(t.rewards.weeklyChestClaimError);
    }
  };

  const streakProgress = Math.min(realStreak, 5);
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
      const supabase = createClient();
      // Insert-only, guarded by the same unique(user_id, quest_type, day_key)
      // constraint every other quest claim uses - a duplicate claim (e.g.
      // from a second tab, or clearing localStorage and retrying) fails here
      // instead of silently granting a second set of chests.
      const { error } = await supabase
        .from("user_quest_completions")
        .insert([{ user_id: userId, quest_type: "weekly_epic", day_key: weekKey, xp_earned: 0 }]);

      if (error) {
        toast.error(t.rewards.epicClaimFailedTaken);
        return;
      }

      await earnChest(userId, "weekly_quest", 3);
      await loadChests();

      setIsEpicClaimed(true);
      toast.success(t.rewards.epicClaimSuccess);
      window.dispatchEvent(new Event("thtcdn_chests_updated"));
    } catch (error) {
      console.error("Error claiming epic chest:", error);
      toast.error(t.rewards.epicClaimError);
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className={`bg-white dark:bg-stone-900 rounded-2xl shadow-sm overflow-hidden ${compact ? "border border-stone-200 min-h-[320px] flex flex-col" : ""}`}>
      {/* Header - Always visible, permanently expanded */}
      <div className={`w-full flex items-center ${compact ? "px-4 py-3" : "px-3.5 py-2"}`}>
        <div className="flex items-center gap-2 min-w-0">
          <Gift className="w-4.5 h-4.5 text-stone-500" />
          <span className={`${compact ? "text-sm" : "text-[15px]"} font-bold text-stone-900 dark:text-stone-100`}>{t.rewards.title}</span>
          {chestCount > 0 && (
            <span className="text-[10px] font-black bg-rose-50 text-rose-600 border border-rose-100 px-2 py-0.5 rounded-full">
              {format(t.rewards.chestBadge, { count: chestCount })}
            </span>
          )}
        </div>
      </div>

      <div className={`border-t border-stone-100 dark:border-stone-800 ${compact ? "flex-1 flex flex-col min-h-0" : ""}`}>
          {/* Tabs */}
          <div className={`flex gap-1 bg-stone-50/50 dark:bg-stone-950/35 overflow-x-auto scrollbar-none ${compact ? "p-2" : "p-1.5"}`}>
            <button
              onClick={() => setActiveTab("daily")}
              className={`flex-1 text-[10px] sm:text-[10.5px] px-1.5 sm:px-2 py-1.5 rounded-lg transition-all relative overflow-hidden shrink-0 flex items-center justify-center gap-1 ${
                activeTab === "daily"
                  ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm font-black"
                  : dailyQuests.length > 0 && dailyQuests.some((q) => !q.claimed)
                  ? "bg-amber-50/70 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/50 font-black"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 font-bold"
              }`}
            >
              <span>{t.rewards.tabDaily}</span>
              {dailyQuests.length > 0 && dailyQuests.some((q) => !q.claimed) && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute top-1 right-1.5" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("chests")}
              className={`flex-1 text-[10px] sm:text-[10.5px] font-black px-1.5 sm:px-2 py-1.5 rounded-lg transition-all relative overflow-hidden shrink-0 flex items-center justify-center gap-1.5 ${
                activeTab === "chests"
                  ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm border border-stone-200 dark:border-stone-800"
                  : chestCount > 0
                  ? "bg-rose-50/70 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 font-black"
                  : "text-stone-500 dark:text-stone-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-500/5"
              }`}
            >
              <span>{t.rewards.tabChests}</span>
              {chestCount > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 absolute top-1 right-1.5" />
              )}
              <Gift className={`w-3.5 h-3.5 ${chestCount > 0 ? "text-rose-500" : ""}`} />
            </button>
            <button
              onClick={() => setActiveTab("weekly")}
              className={`flex-1 text-[10px] sm:text-[10.5px] font-black px-1.5 sm:px-2 py-1.5 rounded-lg transition-all relative overflow-hidden shrink-0 flex items-center justify-center gap-1.5 ${
                activeTab === "weekly"
                  ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm border border-stone-200 dark:border-stone-800"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 font-bold"
              }`}
            >
              <span>{t.rewards.tabWeekly}</span>
            </button>
          </div>

          <div className={`${compact ? "p-2.5 flex-1 overflow-y-auto" : "p-2.5"}`}>
            {activeTab === "daily" && (
              <DailyQuestsWidget 
                userId={userId} 
                embedded 
                onQuestsLoaded={(list) => setDailyQuests(list)} 
              />
            )}

            {activeTab === "chests" && (
              <>
                <style>{`
                  @keyframes shake {
                    0% { transform: translate(1px, 1px) rotate(0deg); }
                    10% { transform: translate(-1px, -2px) rotate(-1deg); }
                    20% { transform: translate(-3px, 0px) rotate(1deg); }
                    30% { transform: translate(0px, 2px) rotate(0deg); }
                    40% { transform: translate(1px, -1px) rotate(1deg); }
                    50% { transform: translate(-1px, 2px) rotate(-1deg); }
                    60% { transform: translate(-3px, 1px) rotate(0deg); }
                    70% { transform: translate(2px, 1px) rotate(-1deg); }
                    80% { transform: translate(-1px, -1px) rotate(1deg); }
                    90% { transform: translate(2px, 2px) rotate(0deg); }
                    100% { transform: translate(1px, -2px) rotate(-1deg); }
                  }
                  .chest-shake { animation: shake 0.5s infinite; }
                `}</style>

                {chestCount > 0 ? (
                  <div className="text-center py-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-100 dark:border-stone-800/80 space-y-3">
                    <button
                      onClick={handleOpenChest}
                      disabled={opening}
                      className={`mx-auto w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none ${
                        shaking ? "chest-shake" : ""
                      }`}
                    >
                      <span className="text-2xl">🎁</span>
                    </button>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-stone-800 dark:text-stone-200">{t.rewards.hasUnopenedChest}</p>
                      <p className="text-[10px] text-stone-400 dark:text-stone-500">{t.rewards.openChestHint}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-5 text-stone-400 dark:text-stone-500 text-[10px] leading-relaxed">
                    {t.rewards.noChests}
                  </div>
                )}

                {/* Rương tri thức tuần - Weekly Chest Tracker inside Chests Tab */}
                <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent animate-pulse mb-1">
                      <Gift className="w-3.5 h-3.5 text-rose-500" /> {t.rewards.weeklyChestTitle}
                    </span>
                    <p className="text-[11.5px] font-bold text-stone-600 dark:text-stone-300">
                      {format(t.rewards.weeklyChestCompleted, { count: dailyQuests.filter((q) => q.current >= q.target).length })}
                    </p>
                  </div>
                  <button
                    onClick={() => void handleWeeklyClaim()}
                    disabled={weeklyClaimed || dailyQuests.filter((q) => q.current >= q.target).length < 3}
                    className={`px-4 py-2 text-[10px] font-black rounded-xl transition-all duration-200 border shrink-0 flex items-center justify-center gap-1.5 ${
                      weeklyClaimed
                        ? "bg-stone-100 dark:bg-stone-950 text-stone-400 border-stone-200 dark:border-stone-800"
                        : dailyQuests.filter((q) => q.current >= q.target).length >= 3
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white border-rose-500 shadow-[0_4px_10px_-3px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95 cursor-pointer animate-pulse"
                        : "bg-stone-50 dark:bg-stone-900 text-stone-400 border-stone-200 dark:border-stone-800 cursor-not-allowed"
                    }`}
                  >
                    {weeklyClaimed ? t.rewards.weeklyChestOpened : t.rewards.weeklyChestLocked}
                  </button>
                </div>
              </>
            )}

            {activeTab === "weekly" && (
              <>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-extrabold text-stone-700 dark:text-stone-300">
                      <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-orange-500" /> {t.rewards.streakQuest}</span>
                      <span>{streakProgress}/5</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${quest1Done ? "bg-orange-500" : "bg-orange-400"}`} style={{ width: `${(streakProgress / 5) * 100}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-extrabold text-stone-700 dark:text-stone-300">
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-sky-500" /> {t.rewards.lessonsQuest}</span>
                      <span>{lessonsProgress}/10</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${quest2Done ? "bg-sky-500" : "bg-sky-400"}`} style={{ width: `${(lessonsProgress / 10) * 100}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-extrabold text-stone-700 dark:text-stone-300">
                      <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-emerald-500" /> {t.rewards.perfectQuizQuest}</span>
                      <span>{quizProgress}/3</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${quest3Done ? "bg-emerald-500" : "bg-emerald-400"}`} style={{ width: `${(quizProgress / 3) * 100}%` }} />
                    </div>
                  </div>
                </div>

                {allQuestsDone ? (
                  isEpicClaimed ? (
                    <div className="mt-4 p-3 bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800 rounded-2xl text-center text-[10px] text-stone-400 dark:text-stone-500 font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t.rewards.epicClaimed}
                    </div>
                  ) : (
                    <button
                      onClick={handleClaimEpic}
                      disabled={claiming}
                      className="mt-4 w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95 animate-pulse"
                    >
                      <Gift className="w-4 h-4" /> {claiming ? t.rewards.claimingEpic : t.rewards.openEpicChest}
                    </button>
                  )
                ) : (
                  <div className="mt-4 p-3 bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800 rounded-2xl text-center text-[10px] text-stone-400 dark:text-stone-500 font-bold">
                    {t.rewards.epicLocked}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

      {/* Reward Reveal Overlay */}
      {opening && rewardReveal && mounted && createPortal(
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl relative space-y-5 animate-[scaleIn_0.3s_ease-out]">
            <div className="w-16 h-16 mx-auto bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
              {rewardReveal.type === "xp" ? <Zap className="w-8 h-8 text-white" /> : <Sparkles className="w-8 h-8 text-white" />}
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">{t.rewards.youReceived}</span>
              <h3 className="text-lg font-black text-stone-900 dark:text-stone-100 flex items-center justify-center gap-1.5">
                {rewardReveal.type === "title" && <Trophy className="w-5 h-5 text-amber-500" />}
                {rewardReveal.value}
                {rewardReveal.type === "xp" && " XP"}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">{rewardReveal.desc}</p>
            </div>
            <button
              onClick={handleClaimReward}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-extrabold tracking-wider uppercase transition-colors cursor-pointer"
            >
              {t.rewards.collectReward} <CheckCircle2 className="w-4 h-4 inline-block ml-1" />
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
