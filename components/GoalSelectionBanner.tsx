"use client";

import { useState, useEffect, useMemo } from "react";
import { Wallet, TrendingUp, Target, CheckCircle2, Shuffle, ChevronDown, ChevronUp, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { notifyLocalStorageChanged, useLocalStorageValue } from "@/lib/use-local-storage-value";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

interface GoalSelectionBannerProps {
  userId: string;
}

export type LearningGoal = "personal-finance" | "basic-investing" | "corporate-finance";

export function goalsOf(t: Dictionary): { id: LearningGoal; name: string; desc: string; icon: LucideIcon; color: string; bg: string }[] {
  const d = t.dataRest.goalSelectionBanner.goals;
  return [
    {
      id: "personal-finance",
      name: d.personalFinance.name,
      desc: d.personalFinance.desc,
      icon: Wallet,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      id: "basic-investing",
      name: d.basicInvesting.name,
      desc: d.basicInvesting.desc,
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/20"
    },
    {
      id: "corporate-finance",
      name: d.corporateFinance.name,
      desc: d.corporateFinance.desc,
      icon: Target,
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-950/20"
    }
  ];
}

/** Kênh báo đổi lộ trình học trong cùng một tab. */
export const GOAL_UPDATED_EVENT = "thtcdn_goal_updated";

export default function GoalSelectionBanner({ userId }: GoalSelectionBannerProps) {
  const { t } = useI18n();
  const GOALS = useMemo(() => goalsOf(t), [t]);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const goalKey = `thtcdn_learning_goal_${userId}`;
  // Đọc thẳng từ localStorage ở mỗi lần render. Bản cũ chép sang state trong
  // một effect, nên lần tải nào cũng vẽ banner "chưa chọn lộ trình" một nhịp
  // rồi mới thay bằng lộ trình đã lưu.
  const selectedGoal = useLocalStorageValue(goalKey, GOAL_UPDATED_EVENT) as LearningGoal | null;

  // Mở bảng chọn khi chưa có lộ trình, hoặc khi người dùng bấm đổi.
  const [selectorOpen, setSelectorOpen] = useState(false);
  const showSelector = selectorOpen || !selectedGoal;
  const setShowSelector = setSelectorOpen;

  const handleSelectGoal = (goalId: LearningGoal) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(goalKey, goalId);
      // Báo cho mọi nơi đang đọc khoá này - DashboardRecommendations và chính
      // component này - biết giá trị vừa đổi.
      notifyLocalStorageChanged(GOAL_UPDATED_EVENT);
    }
    setShowSelector(false);
    toast.success(format(t.dataRest.goalSelectionBanner.updatedToast, { goal: GOALS.find(g => g.id === goalId)?.name ?? "" }));
  };

  const activeGoalInfo = GOALS.find((g) => g.id === selectedGoal);

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm">
      {/* Active Goal Summary - Collapsible */}
      {!showSelector && activeGoalInfo ? (
        <>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full px-6 py-4.5 flex items-center justify-between flex-wrap gap-4 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-950/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl ${activeGoalInfo.bg} ${activeGoalInfo.color} flex items-center justify-center`}>
                <activeGoalInfo.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 block">
                  {t.dataRest.goalSelectionBanner.currentGoalLabel}
                </span>
                <h4 className="text-xs font-black text-stone-900 dark:text-stone-100 mt-0.5">
                  {activeGoalInfo.name}
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSelector(true);
                }}
                className="px-3.5 py-1.5 text-[10px] font-extrabold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>{t.dataRest.goalSelectionBanner.changeButton}</span>
              </button>
              {isCollapsed ? <ChevronDown className="w-4 h-4 text-stone-400 dark:text-stone-500" /> : <ChevronUp className="w-4 h-4 text-stone-400 dark:text-stone-500" />}
            </div>
          </button>
          {!isCollapsed && (
            <div className="px-6 pb-4.5 pt-0">
              <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                {activeGoalInfo.desc}
              </p>
            </div>
          )}
        </>
      ) : (
        /* Selector view */
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-sm font-black text-stone-900 dark:text-stone-100">
              {t.dataRest.goalSelectionBanner.selectorTitle}
            </h3>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
              {t.dataRest.goalSelectionBanner.selectorSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {GOALS.map((g) => {
              const isSelected = selectedGoal === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => handleSelectGoal(g.id)}
                  className={`text-left p-4.5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 cursor-pointer focus:outline-none ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-500/[0.03] dark:bg-emerald-950/20"
                      : "border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-900"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`w-9 h-9 rounded-xl ${g.bg} ${g.color} flex items-center justify-center`}>
                      <g.icon className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-stone-900 dark:text-stone-100 leading-snug">
                      {g.name}
                    </h4>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1 leading-normal">
                      {g.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
