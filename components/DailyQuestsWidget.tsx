"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles, Trophy, Calendar, CheckCircle2, Gift, ChevronDown, ChevronUp, ArrowRight, BookOpen, Gamepad2, Award } from "lucide-react";
import { getDailyQuests, claimQuestReward, type Quest } from "@/lib/supabase-quests";
import { earnChest } from "@/lib/chests";
import { createClient } from "@/lib/supabase";

interface DailyQuestsWidgetProps {
  userId: string;
  /** When true, renders without its own outer card/background/header - for
   *  embedding inside another card (CombinedRewardsWidget's "Nhiệm vụ ngày"
   *  tab) that already provides one. */
  embedded?: boolean;
  onQuestsLoaded?: (quests: Quest[]) => void;
}

// Where "Làm ngay →" sends the learner for each quest - daily_1 (complete a
// lesson) jumps straight into the in-progress lesson rather than just
// scrolling to the resume-learning card (components/ResumeLearningButton.tsx)
// and leaving a second tap to actually get there. That card is a Link
// straight to /bai-hoc/<slug> once its own async greeting fetch resolves, so
// read its href directly off the DOM instead of re-fetching the same data
// here. Falls back to scrolling into view if the card hasn't finished
// loading yet (skeleton has no anchor) or every lesson is already done
// (completion banner also has no anchor). Game quests still route to /game.
function goToQuestAction(questId: string, router: ReturnType<typeof useRouter>) {
  if (questId === "daily_1") {
    const resumeLink = document.querySelector<HTMLAnchorElement>('[data-tour="resume-learning"] a[href^="/bai-hoc/"]');
    if (resumeLink) {
      router.push(resumeLink.getAttribute("href")!);
    } else {
      document.querySelector('[data-tour="resume-learning"]')?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else {
    router.push("/game");
  }
}

export default function DailyQuestsWidget({ userId, embedded = false, onQuestsLoaded }: DailyQuestsWidgetProps) {
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
        onQuestsLoaded?.(list);

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

    // Quest progress (lesson done / game played) can change while this
    // widget is already mounted - e.g. finishing a game in another tab of
    // CombinedRewardsWidget, or completing a lesson without navigating away
    // from the dashboard. Without this, "current" stays stale at its
    // mount-time value and a satisfied quest keeps showing "Làm ngay"
    // instead of the claim button until a full page reload.
    window.addEventListener("thtcdn_weekly_quests_updated", loadQuests);
    window.addEventListener("thtcdn_game_session_recorded", loadQuests);
    return () => {
      window.removeEventListener("thtcdn_weekly_quests_updated", loadQuests);
      window.removeEventListener("thtcdn_game_session_recorded", loadQuests);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleClaim = async (quest: Quest) => {
    if (quest.claimed || quest.current < quest.target || claimingId) return;
    setClaimingId(quest.id);

    try {
      const ok = await claimQuestReward(userId, quest.id, dayKey, quest.xpReward);
      if (ok) {
        toast.success(`Chúc mừng! Nhận thành công +${quest.xpReward} XP học thuật! 🌟`);
        setQuests((prev) => {
          const next = prev.map((q) => (q.id === quest.id ? { ...q, claimed: true } : q));
          onQuestsLoaded?.(next);
          return next;
        });
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
        <style>{`
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 8px rgba(245, 158, 11, 0.05); }
            50% { box-shadow: 0 0 15px rgba(245, 158, 11, 0.15); }
          }
        `}</style>
        {quests.map((quest) => {
          const isDone = quest.current >= quest.target;
          return (
            <div
              key={quest.id}
              className={`p-3 rounded-2xl border transition-all duration-300 group/item flex items-center gap-3.5 ${
                quest.claimed
                  ? "bg-stone-500/[0.01] dark:bg-stone-950/[0.01] border-stone-150 dark:border-stone-850 opacity-60"
                  : isDone
                  ? "bg-amber-500/[0.02] dark:bg-amber-500/[0.01] border-amber-300 dark:border-amber-800 shadow-sm shadow-amber-500/5 animate-[pulseGlow_2.5s_infinite]"
                  : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 hover:shadow-[0_4px_12px_-4px_rgba(16,185,129,0.06)]"
              }`}
            >
              {/* Left Icon Area */}
              <div className="shrink-0">
                {quest.claimed ? (
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/30">
                    <CheckCircle2 className="w-4.5 h-4.5" />
                  </div>
                ) : (
                  (() => {
                    let IconComponent = BookOpen;
                    let colorClass = "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500 border-indigo-100 dark:border-indigo-900/20";
                    if (quest.id === "daily_2") {
                      IconComponent = Gamepad2;
                      colorClass = "bg-sky-50 dark:bg-sky-950/30 text-sky-500 border-sky-100 dark:border-sky-900/20";
                    } else if (quest.id === "daily_3") {
                      IconComponent = Award;
                      colorClass = "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/20";
                    }
                    return (
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-transform group-hover/item:scale-105 duration-300 ${colorClass}`}>
                        <IconComponent className="w-4.5 h-4.5" />
                      </div>
                    );
                  })()
                )}
              </div>

              {/* Text Info */}
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-extrabold transition-colors duration-250 ${
                  quest.claimed 
                    ? "text-stone-400 line-through" 
                    : isDone 
                    ? "text-amber-600 dark:text-amber-450" 
                    : "text-stone-900 dark:text-stone-100 group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-450"
                }`}>
                  {quest.title}
                </p>
                <p className={`text-[10px] mt-0.5 leading-snug transition-colors duration-250 ${
                  quest.claimed
                    ? "text-stone-400"
                    : "text-stone-500 dark:text-stone-400 group-hover/item:text-stone-700 dark:group-hover/item:text-stone-355"
                }`}>{quest.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="shrink-0 flex items-center gap-2">
                {quest.claimed ? (
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-900/30 uppercase tracking-wider">
                    Đã nhận
                  </span>
                ) : isDone ? (
                  <button
                    onClick={() => handleClaim(quest)}
                    disabled={claimingId !== null}
                    className="px-3 py-1.5 text-[10.5px] font-black rounded-lg bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-[0_3px_8px_-2px_rgba(245,158,11,0.45)] hover:scale-105 active:scale-95 transition-all animate-bounce cursor-pointer flex items-center gap-1"
                  >
                    Nhận +{quest.xpReward} XP <Gift className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <>
                    <span className="text-[10px] font-black text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-950/40 px-2.5 py-1.5 rounded-lg border border-stone-200/50 dark:border-stone-850">
                      +{quest.xpReward} XP
                    </span>
                    <button
                      onClick={() => goToQuestAction(quest.id, router)}
                      title="Đi làm nhiệm vụ này ngay"
                      className="group/btn inline-flex items-center gap-1.5 text-[10.5px] font-black text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 px-3.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer shadow-md shadow-emerald-500/20 hover:scale-105 active:scale-95 shrink-0"
                    >
                      Làm ngay <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
}
