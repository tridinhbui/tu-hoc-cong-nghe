"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Wallet, PiggyBank, ShieldAlert } from "lucide-react";
import { useAuthGate } from "@/lib/use-auth-gate";

// Only one tab renders at a time - lazy-load each so switching tabs is what
// pulls in its code instead of every visit shipping all three up front.
// NetWorthTracker alone pulls in recharts, a sizeable chart library that two
// of the three tabs never touch.
const LOADING = <div className="py-12 text-center text-sm text-stone-400 dark:text-stone-500">Đang tải...</div>;
const NetWorthTracker = dynamic(() => import("@/components/tools/NetWorthTracker"), { loading: () => LOADING });
const BudgetCalculator = dynamic(() => import("@/components/tools/BudgetCalculator"), { loading: () => LOADING });
const EmergencyFundCalculator = dynamic(() => import("@/components/tools/EmergencyFundCalculator"), { loading: () => LOADING });

type Tab = "net-worth" | "budget" | "emergency-fund";

const TABS: { id: Tab; label: string; icon: typeof Wallet }[] = [
  { id: "net-worth", label: "Tài sản ròng", icon: Wallet },
  { id: "budget", label: "Ngân sách 50/30/20", icon: PiggyBank },
  { id: "emergency-fund", label: "Quỹ khẩn cấp", icon: ShieldAlert },
];

// Hub for the personal-finance tools that turn lesson concepts (net worth,
// budgeting, emergency fund sizing) into something learners apply to their
// own numbers, save, and revisit - instead of the concept living only in
// the lesson text. See app/bai-hoc/audit-tai-chinh-ca-nhan for the lesson
// this pairs with.
export default function CongCuClient() {
  const { userId, checking } = useAuthGate();
  const [tab, setTab] = useState<Tab>("net-worth");

  if (checking || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 dark:border-stone-700 dark:border-t-stone-100 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
            Công cụ cá nhân
          </p>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            Áp dụng lên số liệu của chính bạn
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Nhập số thật, hệ thống tính và lưu lại - không chỉ đọc lý thuyết.
          </p>
        </div>

        <div className="flex gap-1.5 mb-6 bg-stone-100 dark:bg-stone-900 rounded-xl p-1.5 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 min-w-fit flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold px-3 py-2.5 rounded-lg transition-all whitespace-nowrap ${
                tab === id
                  ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {tab === "net-worth" && <NetWorthTracker userId={userId} />}
        {tab === "budget" && <BudgetCalculator userId={userId} />}
        {tab === "emergency-fund" && <EmergencyFundCalculator userId={userId} />}
      </div>
    </div>
  );
}
