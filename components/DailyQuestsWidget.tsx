"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sparkles, Trophy, Calendar, CheckCircle2, Gift } from "lucide-react";
import { getDailyQuests, claimQuestReward, type Quest } from "@/lib/supabase-quests";

interface DailyQuestsWidgetProps {
  userId: string;
}

export default function DailyQuestsWidget({ userId }: DailyQuestsWidgetProps) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [dayKey, setDayKey] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [weeklyClaimed, setWeeklyClaimed] = useState(false);

  // Get Swedish ISO date string (YYYY-MM-DD) local to the user
  const getLocalDayKey = () => {
    return new Date().toLocaleDateString("sv-SE");
  };

  const getWeeklyDayKey = () => {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
    const weekNum = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    return `${today.getFullYear()}-W${weekNum}`;
  };

  useEffect(() => {
    const key = getLocalDayKey();
    setDayKey(key);

    const loadQuests = async () => {
      try {
        const list = await getDailyQuests(userId, key);
        setQuests(list);

        // Load weekly chest status
        if (typeof window !== "undefined") {
          const weeklyKey = getWeeklyDayKey();
          const savedWeekly = window.localStorage.getItem(`weekly_quest_claimed_${userId}_${weeklyKey}`);
          setWeeklyClaimed(!!savedWeekly);
        }
      } catch (error) {
        console.error("Error loading quests:", error);
      } finally {
        setLoading(false);
      }
    };

    void loadQuests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleClaim = async (quest: Quest) => {
    if (quest.claimed || quest.current < quest.target || claimingId) return;
    setClaimingId(quest.id);

    try {
      const ok = await claimQuestReward(userId, quest.id, dayKey, quest.xpReward);
      if (ok) {
        toast.success(`Chúc mừng! Nhận thành công +${quest.xpReward} XP học thuật! 🌟`);
        setQuests((prev) =>
          prev.map((q) => (q.id === quest.id ? { ...q, claimed: true } : q))
        );
      } else {
        toast.error("Không thể nhận thưởng. Vui lòng thử lại.");
      }
    } catch {
      toast.error("Có lỗi xảy ra khi nhận thưởng.");
    } finally {
      setClaimingId(null);
    }
  };

  const handleWeeklyClaim = () => {
    if (weeklyClaimed || completedQuestsCount < 3) return;
    const weeklyKey = getWeeklyDayKey();

    if (typeof window !== "undefined") {
      window.localStorage.setItem(`weekly_quest_claimed_${userId}_${weeklyKey}`, "true");
      setWeeklyClaimed(true);
      toast.success("Rương tri thức tuần đã mở! Nhận +25 XP học thuật! 🎁✨");
    }
  };

  const completedQuestsCount = quests.filter((q) => q.current >= q.target).length;
  const claimedQuestsCount = quests.filter((q) => q.claimed).length;

  if (loading) {
    return (
      <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 shadow-sm space-y-4 animate-pulse">
        <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded w-1/3" />
        <div className="space-y-2">
          <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded-xl" />
          <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded-xl" />
          <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-5 shadow-sm relative overflow-hidden group">
      {/* Dynamic background lights */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-500/[0.02] rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-450 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-150">Nhiệm vụ hàng ngày</h3>
            <p className="text-[10px] text-stone-450 dark:text-stone-400 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
              <Calendar className="w-3 h-3" /> {dayKey}
            </p>
          </div>
        </div>
        <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-stone-50 dark:bg-stone-950/60 text-stone-600 dark:text-stone-450 border border-stone-100 dark:border-stone-800">
          Đạt {completedQuestsCount}/3
        </span>
      </div>

      <div className="space-y-3 relative z-10">
        {quests.map((quest) => {
          const isDone = quest.current >= quest.target;
          return (
            <div
              key={quest.id}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                quest.claimed
                  ? "bg-stone-50/50 dark:bg-stone-950/20 border-stone-200/60 dark:border-stone-850 opacity-70"
                  : isDone
                  ? "bg-amber-50/20 dark:bg-amber-950/10 border-amber-300/40 dark:border-amber-900/30"
                  : "bg-white dark:bg-stone-900/50 border-stone-200 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    {quest.claimed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isDone ? "bg-amber-500 animate-pulse" : "bg-stone-300 dark:bg-stone-700"}`} />
                    )}
                    <p className={`text-xs font-extrabold ${quest.claimed ? "text-stone-500 line-through" : "text-stone-900 dark:text-stone-150"}`}>
                      {quest.title}
                    </p>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">{quest.description}</p>
                </div>

                <div className="shrink-0">
                  {quest.claimed ? (
                    <span className="text-[10px] font-extrabold text-stone-450 dark:text-stone-400 bg-stone-100 dark:bg-stone-950/40 px-2 py-1.5 rounded-lg border border-stone-200/50 dark:border-stone-850">
                      Đã nhận
                    </span>
                  ) : isDone ? (
                    <button
                      onClick={() => handleClaim(quest)}
                      disabled={claimingId !== null}
                      className="px-3 py-1.5 text-[11px] font-extrabold rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_4px_10px_-3px_rgba(245,158,11,0.4)] hover:shadow-[0_4px_12px_-2px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all animate-bounce cursor-pointer"
                    >
                      +{quest.xpReward} XP 🎁
                    </button>
                  ) : (
                    <span className="text-[10px] font-extrabold text-stone-500 bg-stone-50 dark:bg-stone-950/40 px-2.5 py-1.5 rounded-lg border border-stone-200/40 dark:border-stone-850">
                      +{quest.xpReward} XP
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Chest Tracker */}
      <div className="mt-4 pt-4 border-t border-stone-150 dark:border-stone-800/80 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1">
            <Gift className="w-3.5 h-3.5 text-rose-500" /> Rương tri thức tuần
          </span>
          <span className="text-[11px] font-extrabold text-stone-600 dark:text-stone-400">
            {completedQuestsCount}/3 nhiệm vụ
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500"
              style={{ width: `${Math.min(100, (completedQuestsCount / 3) * 100)}%` }}
            />
          </div>
          <button
            onClick={handleWeeklyClaim}
            disabled={weeklyClaimed || completedQuestsCount < 3}
            className={`px-3 py-1.5 text-[10px] font-extrabold rounded-lg transition-all duration-200 ${
              weeklyClaimed
                ? "bg-stone-100 dark:bg-stone-950 text-stone-450 border border-stone-200/40 dark:border-stone-850"
                : completedQuestsCount >= 3
                ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-[0_4px_10px_-3px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95 cursor-pointer animate-pulse"
                : "bg-stone-50 dark:bg-stone-950/40 text-stone-400 border border-stone-200/40 dark:border-stone-800 cursor-not-allowed"
            }`}
          >
            {weeklyClaimed ? "Đã mở 🎁" : "Mở rương 🔒"}
          </button>
        </div>
      </div>
    </div>
  );
}
