"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles, Trophy, Calendar, CheckCircle2, Gift, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { getDailyQuests, claimQuestReward, type Quest } from "@/lib/supabase-quests";
import { earnChest } from "@/lib/chests";
import { createClient } from "@/lib/supabase";

interface DailyQuestsWidgetProps {
  userId: string;
  /** When true, renders without its own outer card/background/header - for
   *  embedding inside another card (CombinedRewardsWidget's "Nhiệm vụ ngày"
   *  tab) that already provides one. */
  embedded?: boolean;
}

// Where "Làm ngay →" sends the learner for each quest - daily_1 (complete a
// lesson) scrolls to the resume-learning card already on this same
// dashboard page (data-tour="resume-learning") rather than navigating
// anywhere, since it's already right there; the game quests route to /game.
function goToQuestAction(questId: string, router: ReturnType<typeof useRouter>) {
  if (questId === "daily_1") {
    document.querySelector('[data-tour="resume-learning"]')?.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    router.push("/game");
  }
}

export default function DailyQuestsWidget({ userId, embedded = false }: DailyQuestsWidgetProps) {
  const router = useRouter();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [dayKey, setDayKey] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [weeklyClaimed, setWeeklyClaimed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

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

        // Load weekly chest claim status from the real DB record.
        const weeklyKey = getWeeklyDayKey();
        const supabase = createClient();
        const { data: claimedRow } = await supabase
          .from("user_quest_completions")
          .select("id")
          .eq("user_id", userId)
          .eq("quest_type", "weekly_chest")
          .eq("day_key", weeklyKey)
          .maybeSingle();
        setWeeklyClaimed(!!claimedRow);
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

  // Previously localStorage-only: set a flag and showed a "+25 XP" toast
  // that never actually added any XP anywhere. Now persists the claim via
  // user_quest_completions (same unique(user_id, quest_type, day_key)
  // guard every other quest claim uses - clearing localStorage and
  // reclaiming no longer works) and awards a real chest via lib/chests.ts,
  // whose XP is real and folded into recalculateUserStats.
  const handleWeeklyClaim = async () => {
    if (weeklyClaimed || completedQuestsCount < 3) return;
    const weeklyKey = getWeeklyDayKey();

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("user_quest_completions")
        .insert([{ user_id: userId, quest_type: "weekly_chest", day_key: weeklyKey, xp_earned: 0 }]);

      if (error) {
        toast.error("Không thể mở rương - có thể bạn đã mở rồi.");
        return;
      }

      await earnChest(userId, "weekly_quest", 1);
      setWeeklyClaimed(true);
      toast.success("Rương tri thức tuần đã mở! Kiểm tra tab Rương Quà để nhận thưởng. 🎁✨");
      window.dispatchEvent(new Event("thtcdn_chests_updated"));
    } catch (err) {
      console.error("Error claiming weekly chest:", err);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const completedQuestsCount = quests.filter((q) => q.current >= q.target).length;
  const claimedQuestsCount = quests.filter((q) => q.claimed).length;

  if (loading) {
    return (
      <div className={embedded ? "space-y-4 animate-pulse" : "rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 shadow-sm space-y-4 animate-pulse"}>
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
    <div className={embedded ? "relative" : "rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900 p-5 shadow-sm relative overflow-hidden group"}>
      {/* Dynamic background lights */}
      {!embedded && (
        <>
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-500/[0.02] rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      {!embedded && (
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="w-full flex items-center justify-between mb-4 relative z-10 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-450 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-150">Nhiệm vụ hàng ngày</h3>
            <p className="text-[10px] text-stone-450 dark:text-stone-400 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
              <Calendar className="w-3 h-3" /> {dayKey}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-stone-50 dark:bg-stone-950/60 text-stone-600 dark:text-stone-450 border border-stone-100 dark:border-stone-800">
            Đạt {completedQuestsCount}/3
          </span>
          {collapsed ? (
            <ChevronDown className="w-4 h-4 text-stone-400 dark:text-stone-500" />
          ) : (
            <ChevronUp className="w-4 h-4 text-stone-400 dark:text-stone-500" />
          )}
        </div>
      </button>
      )}

      {(embedded || !collapsed) && (
      <div className="space-y-3 relative z-10">
        {quests.map((quest) => {
          const isDone = quest.current >= quest.target;
          return (
            <div
              key={quest.id}
              className={`p-2.5 rounded-xl border transition-all duration-300 group/item ${
                quest.claimed
                  ? "bg-stone-50/30 dark:bg-stone-950/10 border-stone-150 dark:border-stone-850 opacity-65"
                  : isDone
                  ? "bg-amber-50/20 dark:bg-amber-950/10 border-amber-250/30 dark:border-amber-900/25 shadow-sm shadow-amber-500/5"
                  : "bg-white dark:bg-stone-900/50 border-stone-150/80 dark:border-stone-800/80 hover:border-amber-500/40 dark:hover:border-amber-500/30 hover:shadow-md hover:shadow-amber-500/[0.03]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    {quest.claimed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isDone ? "bg-amber-500 animate-pulse" : "bg-stone-350 dark:bg-stone-700"}`} />
                    )}
                    <p className={`text-[11px] font-black transition-colors duration-250 ${
                      quest.claimed 
                        ? "text-stone-400 line-through" 
                        : isDone 
                        ? "text-amber-600 dark:text-amber-450" 
                        : "text-stone-900 dark:text-stone-100 group-hover/item:text-amber-550 dark:group-hover/item:text-amber-400"
                    }`}>
                      {quest.title}
                    </p>
                  </div>
                  <p className={`text-[10px] mt-0.5 leading-snug transition-colors duration-250 ${
                    quest.claimed
                      ? "text-stone-400"
                      : "text-stone-500 dark:text-stone-400 group-hover/item:text-stone-700 dark:group-hover/item:text-stone-300"
                  }`}>{quest.description}</p>
                </div>

                <div className="shrink-0 flex items-center gap-1.5">
                  {quest.claimed ? (
                    <span className="text-[9px] font-extrabold text-stone-450 dark:text-stone-400 bg-stone-100 dark:bg-stone-950/40 px-2 py-1 rounded-lg border border-stone-200/50 dark:border-stone-850">
                      Đã nhận
                    </span>
                  ) : isDone ? (
                    <button
                      onClick={() => handleClaim(quest)}
                      disabled={claimingId !== null}
                      className="px-2.5 py-1 text-[10px] font-extrabold rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_3px_8px_-2px_rgba(245,158,11,0.4)] hover:shadow-[0_4px_10px_-1px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all animate-bounce cursor-pointer"
                    >
                      +{quest.xpReward} XP 🎁
                    </button>
                  ) : (
                    <>
                      <span className="text-[9px] font-extrabold text-stone-500 bg-stone-50 dark:bg-stone-950/40 px-2 py-1.5 rounded-lg border border-stone-200/40 dark:border-stone-850">
                        +{quest.xpReward} XP
                      </span>
                      <button
                        onClick={() => goToQuestAction(quest.id, router)}
                        title="Đi làm nhiệm vụ này ngay"
                        className="inline-flex items-center gap-1.5 text-[10.5px] font-black text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 px-3.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 animate-pulse shrink-0"
                      >
                        Làm ngay <ArrowRight className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}

      {/* Weekly Chest Tracker */}
      <div className="mt-4 pt-4 border-t border-stone-150 dark:border-stone-800/80 relative z-10">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent shrink-0">
            <Gift className="w-3.5 h-3.5 text-rose-500" /> Rương tri thức tuần
          </span>
          <span className="text-[10px] font-extrabold text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-950/60 px-2 py-0.5 rounded border border-stone-200/60 dark:border-stone-800">
            {completedQuestsCount}/3 nhiệm vụ
          </span>
        </div>
        
        {/* Unified Connected Progress Bar & Button Unit */}
        <div className="flex items-center">
          <div className="flex-1 h-8 bg-stone-50 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 border-r-0 rounded-l-xl overflow-hidden shadow-inner relative flex items-center px-1">
            <div
              className="h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-l-lg transition-all duration-500 flex items-center justify-end px-2"
              style={{ width: `${Math.min(100, (completedQuestsCount / 3) * 100)}%` }}
            >
              {completedQuestsCount > 0 && (
                <span className="text-[9px] font-black text-white whitespace-nowrap">
                  {Math.round((completedQuestsCount / 3) * 100)}%
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => void handleWeeklyClaim()}
            disabled={weeklyClaimed || completedQuestsCount < 3}
            className={`h-8 px-4 text-[10px] font-extrabold rounded-r-xl transition-all duration-200 border shrink-0 flex items-center justify-center ${
              weeklyClaimed
                ? "bg-stone-100 dark:bg-stone-950 text-stone-450 border-stone-200 dark:border-stone-850"
                : completedQuestsCount >= 3
                ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white border-rose-500 shadow-[0_4px_10px_-3px_rgba(244,63,94,0.4)] hover:scale-102 active:scale-98 cursor-pointer animate-pulse"
                : "bg-stone-50 dark:bg-stone-900 text-stone-400 border-stone-200 dark:border-stone-800 cursor-not-allowed"
            }`}
          >
            {weeklyClaimed ? "Đã mở 🎁" : "Mở rương 🔒"}
          </button>
        </div>
      </div>
    </div>
  );
}
