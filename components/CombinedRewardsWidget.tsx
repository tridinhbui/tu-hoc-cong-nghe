"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Gift, Sparkles, Trophy, CheckCircle2, Flame, BookOpen, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { toast } from "sonner";
import { recalculateUserStats } from "@/lib/cloudflare-user";
import { getUserStreak } from "@/lib/cloudflare-streak";
import { getUnopenedChestCount, openNextChest, earnChest, type ChestReward } from "@/lib/chests";
import { WEEKLY_CHEST_QUESTS_REQUIRED } from "@/lib/quest-rewards";
import { createClient } from "@/lib/cloudflare";
import DailyQuestsWidget from "@/components/DailyQuestsWidget";
import { useIsClient } from "@/lib/use-is-client";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { btnPrimary, panel, tabClass } from "@/components/ui/system";

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
//    Cloudflare, and getTotalChestXp() is folded into that same formula - so
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
      const cloudflare = createClient();
      const { data } = await cloudflare
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
      const cloudflare = createClient();
      const { data: claimedRow } = await cloudflare
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
    if (weeklyClaimed || completedQuestsCount < WEEKLY_CHEST_QUESTS_REQUIRED) return;

    try {
      const cloudflare = createClient();
      const { error } = await cloudflare
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
      const cloudflare = createClient();
      // Insert-only, guarded by the same unique(user_id, quest_type, day_key)
      // constraint every other quest claim uses - a duplicate claim (e.g.
      // from a second tab, or clearing localStorage and retrying) fails here
      // instead of silently granting a second set of chests.
      const { error } = await cloudflare
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
    <div className={`${panel} overflow-hidden ${compact ? "flex flex-col" : ""}`}>
      {/* Header - Always visible, permanently expanded */}
      <div className={`w-full flex items-center ${compact ? "px-4 py-3" : "px-3.5 py-2"}`}>
        <div className="flex items-center gap-2 min-w-0">
          <Gift className="w-4.5 h-4.5 text-ink-muted" />
          <span className={`${compact ? "text-sm" : "text-[15px]"} font-black tracking-tight text-ink-max`}>{t.rewards.title}</span>
          {chestCount > 0 && (
            <span className="text-[10px] font-bold text-ink-soft border border-line-strong px-1.5 py-0.5 rounded-sm">
              {format(t.rewards.chestBadge, { count: chestCount })}
            </span>
          )}
        </div>
      </div>

      <div className={`border-t border-line-strong ${compact ? "flex-1 flex flex-col min-h-0" : ""}`}>
          {/* Tabs */}
          <div className={`flex gap-5 border-b border-line-strong overflow-x-auto scrollbar-none ${compact ? "px-4 pt-2.5" : "px-3.5 pt-2"}`}>
            <button
              onClick={() => setActiveTab("daily")}
              className={`${tabClass(activeTab === "daily")} relative shrink-0 flex items-center gap-1.5 text-[11px] sm:text-xs`}
            >
              <span>{t.rewards.tabDaily}</span>
              {dailyQuests.length > 0 && dailyQuests.some((q) => !q.claimed) && (
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-[1px] bg-amber-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("chests")}
              className={`${tabClass(activeTab === "chests")} relative shrink-0 flex items-center gap-1.5 text-[11px] sm:text-xs`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>{t.rewards.tabChests}</span>
              {chestCount > 0 && (
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-[1px] bg-brand-600 dark:bg-brand-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("weekly")}
              className={`${tabClass(activeTab === "weekly")} relative shrink-0 flex items-center gap-1.5 text-[11px] sm:text-xs`}
            >
              <span>{t.rewards.tabWeekly}</span>
            </button>
          </div>

          {/* Không `overflow-y-auto` ở đây nữa: cột chứa thẻ này đã là một vùng
          cuộn rồi, nên thanh cuộn thứ hai bên trong thẻ tạo hai vùng cuộn lồng
          nhau trên cùng một chỗ con trỏ đang đứng - lăn chuột một cái thì
          không đoán được cái nào sẽ chạy. */}
      <div className="p-2.5">
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
                  <div className="text-center py-4 bg-[#fbfaf7] dark:bg-stone-950 rounded-sm border border-line-strong space-y-3">
                    <button
                      onClick={handleOpenChest}
                      disabled={opening}
                      className={`mx-auto w-14 h-14 rounded-md border border-stone-300 bg-[#f3f1ec] text-ink-body flex items-center justify-center transition-colors hover:border-stone-950 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-300 ${
                        shaking ? "chest-shake" : ""
                      }`}
                    >
                      <Gift className="w-7 h-7" strokeWidth={1.75} aria-hidden />
                    </button>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-ink-heading">{t.rewards.hasUnopenedChest}</p>
                      <p className="text-[10px] text-ink-faint">{t.rewards.openChestHint}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-5 text-ink-faint text-[10px] leading-relaxed">
                    {t.rewards.noChests}
                  </div>
                )}

                {/* Rương tri thức tuần - Weekly Chest Tracker inside Chests Tab */}
                <div className="mt-4 pt-4 border-t border-line flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="eyebrow flex items-center gap-1.5 text-ink-soft mb-1">
                      <Gift className="w-3.5 h-3.5" /> {t.rewards.weeklyChestTitle}
                    </span>
                    <p className="text-[11.5px] font-bold text-ink-soft">
                      {format(t.rewards.weeklyChestCompleted, { count: dailyQuests.filter((q) => q.current >= q.target).length })}
                    </p>
                  </div>
                  <button
                    onClick={() => void handleWeeklyClaim()}
                    disabled={weeklyClaimed || dailyQuests.filter((q) => q.current >= q.target).length < WEEKLY_CHEST_QUESTS_REQUIRED}
                    className={`px-4 py-2 text-[10px] font-black rounded-sm transition-colors duration-200 border shrink-0 flex items-center justify-center gap-1.5 ${
                      weeklyClaimed
                        ? "bg-[#f3f1ec] text-ink-faint border-stone-300 dark:bg-stone-950 dark:border-stone-700"
                        : dailyQuests.filter((q) => q.current >= q.target).length >= 3
                        ? "bg-stone-950 text-white border-stone-950 hover:bg-brand-700 hover:border-brand-700 cursor-pointer dark:bg-stone-100 dark:text-stone-950 dark:border-stone-100 dark:hover:bg-brand-300"
                        : "text-ink-faint border-line-strong cursor-not-allowed"
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
                    <div className="flex justify-between items-center text-[10px] font-extrabold text-ink-body">
                      <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-warn" /> {t.rewards.streakQuest}</span>
                      <span>{streakProgress}/5</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-sunken rounded-xs overflow-hidden">
                      <div className={`h-full rounded-xs transition-all duration-500 ${quest1Done ? "bg-brand-600" : "bg-brand-500"}`} style={{ width: `${(streakProgress / 5) * 100}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-extrabold text-ink-body">
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-ink-muted" /> {t.rewards.lessonsQuest}</span>
                      <span>{lessonsProgress}/10</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-sunken rounded-xs overflow-hidden">
                      <div className={`h-full rounded-xs transition-all duration-500 ${quest2Done ? "bg-brand-600" : "bg-brand-500"}`} style={{ width: `${(lessonsProgress / 10) * 100}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-extrabold text-ink-body">
                      <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-ink-muted" /> {t.rewards.perfectQuizQuest}</span>
                      <span>{quizProgress}/3</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-sunken rounded-xs overflow-hidden">
                      <div className={`h-full rounded-xs transition-all duration-500 ${quest3Done ? "bg-brand-600" : "bg-brand-500"}`} style={{ width: `${(quizProgress / 3) * 100}%` }} />
                    </div>
                  </div>
                </div>

                {allQuestsDone ? (
                  isEpicClaimed ? (
                    <div className="mt-4 p-3 bg-[#f3f1ec] dark:bg-stone-950 border border-line-strong rounded-sm text-center text-[10px] text-ink-muted font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-accent" /> {t.rewards.epicClaimed}
                    </div>
                  ) : (
                    <button
                      onClick={handleClaimEpic}
                      disabled={claiming}
                      className={`${btnPrimary} mt-4 w-full cursor-pointer`}
                    >
                      <Gift className="w-4 h-4" /> {claiming ? t.rewards.claimingEpic : t.rewards.openEpicChest}
                    </button>
                  )
                ) : (
                  <div className="mt-4 p-3 bg-[#f3f1ec] dark:bg-stone-950 border border-line-strong rounded-sm text-center text-[10px] text-ink-muted font-bold">
                    {t.rewards.epicLocked}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

      {/* Reward Reveal Overlay */}
      {opening && rewardReveal && mounted && createPortal(
        <div className="fixed inset-0 bg-stone-950/60 flex items-center justify-center z-[9999] overflow-y-auto p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white dark:bg-stone-900 border border-line-strong rounded-md w-full max-w-sm my-auto p-6 text-center relative space-y-5 animate-[scaleIn_0.3s_ease-out]">
            <div className="w-14 h-14 mx-auto rounded-md border border-stone-300 bg-[#f3f1ec] text-ink-body flex items-center justify-center dark:border-stone-700 dark:bg-stone-950">
              {rewardReveal.type === "xp" ? <Zap className="w-7 h-7" /> : <Sparkles className="w-7 h-7" />}
            </div>
            <div className="space-y-1">
              <span className="eyebrow text-ink-soft">{t.rewards.youReceived}</span>
              <h3 className="text-lg font-black tracking-tight text-ink-max flex items-center justify-center gap-1.5">
                {rewardReveal.type === "title" && <Trophy className="w-5 h-5 text-ink-muted" />}
                {t.chestTitles[rewardReveal.value] ?? rewardReveal.value}
                {rewardReveal.type === "xp" && ` ${t.miscUi.combinedRewardsWidget.xpUnit}`}
              </h3>
              <p className="text-xs text-ink-muted">{t.chestDescriptions[rewardReveal.desc] ?? rewardReveal.desc}</p>
            </div>
            <button
              onClick={handleClaimReward}
              className={`${btnPrimary} w-full cursor-pointer`}
            >
              {t.rewards.collectReward} <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
