"use client";

import { useState, useEffect } from "react";
import { Wallet, TrendingUp, Target, CheckCircle2, Shuffle } from "lucide-react";
import { toast } from "sonner";

interface GoalSelectionBannerProps {
  userId: string;
}

export type LearningGoal = "personal-finance" | "basic-investing" | "corporate-finance";

export const GOALS: { id: LearningGoal; name: string; desc: string; icon: any; color: string; bg: string }[] = [
  {
    id: "personal-finance",
    name: "Tài chính Cá nhân & Thoát nợ",
    desc: "Cách quản lý chi tiêu, quản lý nợ tốt/xấu, thiết lập quỹ khẩn cấp.",
    icon: Wallet,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/20"
  },
  {
    id: "basic-investing",
    name: "Tích lũy & Đầu tư cơ bản",
    desc: "Học về sức mạnh lãi kép, lạm phát, chứng chỉ quỹ mở, vàng.",
    icon: TrendingUp,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/20"
  },
  {
    id: "corporate-finance",
    name: "Phân tích Doanh nghiệp & Cổ phiếu",
    desc: "Đọc báo cáo tài chính, mô hình phân tích Dupont, dòng tiền FCF, chỉ số ROIC.",
    icon: Target,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/20"
  }
];

export default function GoalSelectionBanner({ userId }: GoalSelectionBannerProps) {
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal | null>(null);
  const [showSelector, setShowSelector] = useState<boolean>(false);

  const goalKey = `thtcdn_learning_goal_${userId}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(goalKey) as LearningGoal | null;
      if (saved) {
        setSelectedGoal(saved);
      } else {
        setShowSelector(true); // show options if none selected yet
      }
    }
  }, [goalKey]);

  const handleSelectGoal = (goalId: LearningGoal) => {
    setSelectedGoal(goalId);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(goalKey, goalId);
      // Dispatch event to notify DashboardRecommendations to filter
      window.dispatchEvent(new Event("thtcdn_goal_updated"));
    }
    setShowSelector(false);
    toast.success(`Đã cập nhật lộ trình học: ${GOALS.find(g => g.id === goalId)?.name}! 🎯`);
  };

  const activeGoalInfo = GOALS.find((g) => g.id === selectedGoal);

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-850 rounded-3xl overflow-hidden shadow-sm">
      {/* Active Goal Summary */}
      {!showSelector && activeGoalInfo ? (
        <div className="px-6 py-4.5 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl ${activeGoalInfo.bg} ${activeGoalInfo.color} flex items-center justify-center`}>
              <activeGoalInfo.icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 block">
                Mục tiêu hiện tại của bạn
              </span>
              <h4 className="text-xs font-black text-stone-900 dark:text-stone-150 mt-0.5">
                {activeGoalInfo.name}
              </h4>
            </div>
          </div>
          <button
            onClick={() => setShowSelector(true)}
            className="px-3.5 py-1.5 text-[10px] font-extrabold bg-stone-100 hover:bg-stone-200 dark:bg-stone-850 dark:hover:bg-stone-800 text-stone-750 dark:text-stone-300 rounded-lg transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Thay đổi mục tiêu</span>
          </button>
        </div>
      ) : (
        /* Selector view */
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-sm font-black text-stone-900 dark:text-stone-100">
              Chọn mục tiêu học tập của bạn 🎯
            </h3>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
              Hệ thống sẽ điều chỉnh lộ trình gợi ý và ưu tiên các bài học phù hợp nhất với mục tiêu của bạn.
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
                      : "border-stone-200 dark:border-stone-850 hover:border-stone-300 dark:hover:border-stone-750 bg-white dark:bg-stone-900"
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
                    <h4 className="text-xs font-black text-stone-900 dark:text-stone-150 leading-snug">
                      {g.name}
                    </h4>
                    <p className="text-[10px] text-stone-500 dark:text-stone-405 mt-1 leading-normal">
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
