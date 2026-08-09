"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles, Trophy, Calendar, CheckCircle2, Gift, ChevronDown, ChevronUp, ArrowRight, BookOpen, Gamepad2, Award } from "lucide-react";
import { getDailyQuests, claimQuestReward, getWeeklyQuestXpBudget, type Quest } from "@/lib/supabase-quests";
import { WEEKLY_CHEST_QUESTS_REQUIRED } from "@/lib/quest-rewards";
import { earnChest } from "@/lib/chests";
import { createClient } from "@/lib/supabase";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

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
// (completion banner also has no anchor).
//
// The resume card lives on /hoc-bai, not the dashboard, so on any other route
// there is nothing to read or scroll to - navigate to /hoc-bai instead of
// silently doing nothing.
//
// Every other quest used to fall through to /game, which is where the boss
// fights are - so "Điểm danh Học Nhóm" ("gửi 1 tin nhắn check-in") and "Ngồi
// học trong thành phố" both dropped the learner into the game hub with no way
// to satisfy the quest there. Each quest now names its own destination, and
// anything unrecognised keeps the old /game default (the game quests are the
// majority, and a new quest is far likelier to be one of those than a lesson).
const QUEST_DESTINATIONS: Record<string, string> = {
  // Check-in is a message sent in the 2D group chat - lib/supabase-study-rooms.ts
  // sets the localStorage key that lib/supabase-quests.ts reads.
  daily_study_group: "/nhom-hoc",
  // Server-measured seat time. Both places that call startFocusSession() for
  // this count ("thư viện" = /cong-dong, "phòng nhóm 3D" = /nhom-hoc); send
  // them to the room, which is the one the description names second and the
  // one they are likelier to already have a group in.
  daily_focus: "/nhom-hoc",
};

function goToQuestAction(questId: string, router: ReturnType<typeof useRouter>) {
  if (questId === "daily_1") {
    const resumeCard = document.querySelector('[data-tour="resume-learning"]');
    if (!resumeCard) {
      router.push("/hoc-bai");
      return;
    }
    const resumeLink = resumeCard.querySelector<HTMLAnchorElement>('a[href^="/bai-hoc/"]');
    if (resumeLink) {
      router.push(resumeLink.getAttribute("href")!);
    } else {
      resumeCard.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else {
    router.push(QUEST_DESTINATIONS[questId] ?? "/game");
  }
}

export default function DailyQuestsWidget({ userId, embedded = false, onQuestsLoaded }: DailyQuestsWidgetProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [dayKey, setDayKey] = useState<string>(() => new Date().toLocaleDateString("sv-SE"));
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [weeklyClaimed, setWeeklyClaimed] = useState(false);
  // Ngân sách XP nhiệm vụ còn lại của tuần. Giao diện phải biết con số này,
  // nếu không nó hứa mức thưởng danh nghĩa cho một người đã hết ngân sách.
  const [weeklyXpRemaining, setWeeklyXpRemaining] = useState<number | null>(null);
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

    const loadQuests = async () => {
      try {
        const list = await getDailyQuests(userId, key);
        setQuests(list);
        onQuestsLoaded?.(list);
        setWeeklyXpRemaining((await getWeeklyQuestXpBudget(userId)).remaining);

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

  /** XP nhiệm vụ này thực sự sẽ cộng, sau khi kẹp theo ngân sách tuần - đúng
   *  phép tính máy chủ làm ở app/api/quests/claim. `null` = chưa đọc xong ngân
   *  sách, khi đó hiển thị mức danh nghĩa như cũ. */
  const payoutOf = (quest: Quest) =>
    weeklyXpRemaining === null ? quest.xpReward : Math.min(quest.xpReward, weeklyXpRemaining);

  /** Phân biệt "nhiệm vụ này vốn không cộng XP" (daily_4, daily_game... đặt 0
   *  trong lib/quest-rewards.ts) với "tuần này bạn đã tiêu hết ngân sách". Hai
   *  thứ cùng ra 0 nhưng nói với người học hai điều khác hẳn nhau. */
  const isCappedOut = (quest: Quest) => quest.xpReward > 0 && payoutOf(quest) === 0;

  const handleClaim = async (quest: Quest) => {
    if (quest.claimed || quest.current < quest.target || claimingId) return;
    setClaimingId(quest.id);

    try {
      const { claimed, xpEarned } = await claimQuestReward(userId, quest.id, dayKey);
      if (claimed) {
        // xpEarned, not quest.xpReward: the weekly quest XP cap
        // (lib/quest-rewards.ts#WEEKLY_QUEST_XP_CAP) can leave the server
        // banking less than the quest's nominal reward - even 0, once the
        // week's budget is spent. Showing quest.xpReward here regardless was
        // the exact bug behind "làm nhiệm vụ mà không thấy XP": the toast
        // promised XP that never actually landed in total_xp.
        if (xpEarned > 0 && typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("thtcdn:xp-gained", { detail: { xp: xpEarned, label: t.dailyQuests.xpGainedLabel } }));
        }
        // Trừ vào ngân sách đang giữ trong state, để các nhiệm vụ còn lại trên
        // cùng màn hình cập nhật ngay thay vì đợi lần load sau.
        setWeeklyXpRemaining((prev) => (prev === null ? prev : Math.max(0, prev - xpEarned)));
        // Ba lý do khác nhau cho cùng một con số 0, và nói nhầm lý do thì
        // người học kết luận là hệ thống nuốt mất XP của mình. Cái nhãn trên
        // nút đã phân biệt được từ lần sửa trước (isCappedOut), riêng thông
        // báo sau khi bấm thì vẫn đổ hết cho trần tuần - kể cả với ba nhiệm vụ
        // vốn được đặt 0 XP trong lib/quest-rewards.ts (điểm danh, đăng nhập,
        // vào Game). Người bấm "Đăng nhập mỗi ngày" được báo là đã hết ngân
        // sách tuần, trong khi ngân sách còn nguyên và nhiệm vụ đó chưa bao
        // giờ cộng XP.
        if (xpEarned > 0) {
          toast.success(format(t.dailyQuests.claimSuccessXp, { xp: xpEarned }));
        } else if (quest.xpReward === 0) {
          toast.success(t.dailyQuests.claimSuccessNoXpQuest);
        } else {
          toast.success(t.dailyQuests.claimSuccessCapped);
        }
        setQuests((prev) => {
          const next = prev.map((q) => (q.id === quest.id ? { ...q, claimed: true } : q));
          onQuestsLoaded?.(next);
          return next;
        });
      } else {
        toast.error(t.dailyQuests.claimFailed);
      }
    } catch {
      toast.error(t.dailyQuests.claimError);
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
    if (weeklyClaimed || completedQuestsCount < WEEKLY_CHEST_QUESTS_REQUIRED) return;
    const weeklyKey = getWeeklyDayKey();

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("user_quest_completions")
        .insert([{ user_id: userId, quest_type: "weekly_chest", day_key: weeklyKey, xp_earned: 0 }]);

      if (error) {
        toast.error(t.dailyQuests.weeklyChestOpenFailed);
        return;
      }

      await earnChest(userId, "weekly_quest", 1);
      setWeeklyClaimed(true);
      toast.success(t.dailyQuests.weeklyChestOpenedToast);
      window.dispatchEvent(new Event("thtcdn_chests_updated"));
    } catch (err) {
      console.error("Error claiming weekly chest:", err);
      toast.error(t.dailyQuests.weeklyChestError);
    }
  };

  const completedQuestsCount = quests.filter((q) => q.current >= q.target).length;
  const claimedQuestsCount = quests.filter((q) => q.claimed).length;

  if (loading) {
    return (
      <div className={embedded ? "space-y-4 animate-pulse" : "rounded-[20px] border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 shadow-[0_10px_24px_-24px_rgba(15,23,42,0.2)] space-y-4 animate-pulse"}>
        <div className="h-5 skeleton-premium rounded w-1/3" />
        <div className="space-y-2">
          <div className="h-10 skeleton-premium rounded-[18px]" />
          <div className="h-10 skeleton-premium rounded-[18px]" />
          <div className="h-10 skeleton-premium rounded-[18px]" />
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
      <div className="w-full flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">{t.dailyQuests.headerTitle}</h3>
            <p className="text-[10px] text-stone-400 dark:text-stone-400 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
              <Calendar className="w-3 h-3" /> {dayKey}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-stone-50 dark:bg-stone-950/60 text-stone-600 dark:text-stone-400 border border-stone-100 dark:border-stone-800">
            {format(t.dailyQuests.doneCount, { count: completedQuestsCount })}
          </span>
        </div>
      </div>
      )}

      {/* Không cắt ở 205px rồi cuộn bên trong nữa. Cột chứa thẻ này đã là
          một vùng cuộn - chú thích trong CombinedRewardsWidget đã nêu đúng lý
          do đó khi gỡ vùng cuộn ở lớp bọc, nhưng danh sách này vẫn còn một
          cái. Hai vùng cuộn lồng nhau dưới cùng một con trỏ thì lăn chuột
          không đoán được cái nào chạy, và ở đây nó còn giấu bớt nhiệm vụ
          trong khi thẻ vẫn chừa một khoảng trắng ngay dưới. */}
      <div className="space-y-2.5 relative z-10">
        <style>{`
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 8px rgba(245, 158, 11, 0.05); }
            50% { box-shadow: 0 0 15px rgba(245, 158, 11, 0.15); }
          }
        `}</style>
        {[...quests]
          .sort((a, b) => {
            // Sắp xếp: Chưa xong/Chờ nhận thưởng -> LÊN ĐẦU, Đã nhận thưởng -> TỤT XUỐNG CUỐI
            const aReady = !a.claimed && a.current >= a.target;
            const bReady = !b.claimed && b.current >= b.target;
            if (aReady !== bReady) return aReady ? -1 : 1;

            if (a.claimed !== b.claimed) return a.claimed ? 1 : -1;
            return 0;
          })
          .map((quest) => {
          const isDone = quest.current >= quest.target;
          return (
            <div
              key={quest.id}
              className={`p-3 rounded-2xl border transition-all duration-300 group/item flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3.5 ${
                quest.claimed
                  ? "bg-stone-500/[0.01] dark:bg-stone-950/[0.01] border-stone-100 dark:border-stone-800 opacity-60"
                  : isDone
                  ? "bg-amber-500/[0.02] dark:bg-amber-500/[0.01] border-amber-300 dark:border-amber-800 shadow-sm shadow-amber-500/5 animate-[pulseGlow_2.5s_infinite]"
                  : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 hover:shadow-[0_4px_12px_-4px_rgba(16,185,129,0.06)]"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Left Icon Area */}
                <div className="shrink-0">
                  {quest.claimed ? (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/30">
                      <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
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
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-transform group-hover/item:scale-105 duration-300 ${colorClass}`}>
                          <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                        </div>
                      );
                    })()
                  )}
                </div>

                {/* Text Info */}
                <div className="min-w-0 flex-1">
                  <p className={`text-xs sm:text-sm font-extrabold transition-colors duration-250 leading-snug ${
                    quest.claimed 
                      ? "text-stone-400 line-through" 
                      : isDone 
                      ? "text-amber-600 dark:text-amber-400" 
                      : "text-stone-900 dark:text-stone-100 group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400"
                  }`}>
                    {t.questCopy[quest.id]?.title ?? quest.title}
                  </p>
                  <p className={`text-[10px] mt-0.5 leading-snug transition-colors duration-250 line-clamp-1 ${
                    quest.claimed
                      ? "text-stone-400"
                      : "text-stone-500 dark:text-stone-400 group-hover/item:text-stone-700 dark:group-hover/item:text-stone-300"
                  }`}>{t.questCopy[quest.id]?.description ?? quest.description}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="shrink-0 flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-1 sm:pt-0 border-t sm:border-t-0 border-stone-100 dark:border-stone-800/60">
                {quest.claimed ? (
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-900/30 uppercase tracking-wider">
                    {t.dailyQuests.claimed}
                  </span>
                ) : isDone ? (
                  <button
                    onClick={() => handleClaim(quest)}
                    disabled={claimingId !== null}
                className="button-premium w-full sm:w-auto justify-center px-3 py-1.5 text-[10.5px] font-black rounded-[16px] bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-[0_3px_8px_-2px_rgba(245,158,11,0.45)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center gap-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/15"
                >
                  {/* Số hiển thị phải là số SẼ nhận, không phải mức thưởng
                      danh nghĩa: máy chủ kẹp nó theo ngân sách XP còn lại của
                      tuần (WEEKLY_QUEST_XP_CAP). Hứa "+10 XP" rồi cộng 0 chính
                      là lỗi người học báo lại. */}
                  {payoutOf(quest) > 0 ? (
                    <>{format(t.dailyQuests.claimWithXp, { xp: payoutOf(quest) })} <Gift className="w-3.5 h-3.5" /></>
                  ) : (
                    <>{t.dailyQuests.claimNoXp} <Gift className="w-3.5 h-3.5" /></>
                  )}
                </button>
                ) : (
                  <>
                    <span className="text-[10px] font-black text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-950/40 px-2 py-1 rounded-lg border border-stone-200/50 dark:border-stone-800">
                      {payoutOf(quest) > 0
                        ? format(t.dailyQuests.xpWithAmount, { xp: payoutOf(quest) })
                        : isCappedOut(quest)
                          ? t.dailyQuests.xpCapReached
                          : t.dailyQuests.noXpQuest}
                    </span>
                    <button
                      onClick={() => goToQuestAction(quest.id, router)}
                      title={t.dailyQuests.doActionTitle}
                      className="button-premium group/btn inline-flex items-center gap-1.5 text-[10.5px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-[16px] transition-all duration-200 cursor-pointer shadow-[0_8px_18px_-16px_rgba(16,185,129,0.35)] active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/15"
                    >
                      {t.dailyQuests.doNow} <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
