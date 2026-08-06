"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Wallet, PiggyBank, ShieldAlert, TrendingUp, Sparkles, Building2 } from "lucide-react";
import { useAuthGate } from "@/lib/use-auth-gate";
import { useI18n } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

function Loading() {
  const { t } = useI18n();
  return (
    <div className="py-12 text-center text-sm text-stone-400 dark:text-stone-500">
      {t.dataTables.toolsIndex.loading}
    </div>
  );
}

// Only one tab renders at a time - lazy-load each so switching tabs is what
// pulls in its code instead of every visit shipping all three up front.
// NetWorthTracker alone pulls in recharts, a sizeable chart library that two
// of the three tabs never touch.
const NetWorthTracker = dynamic(() => import("@/components/tools/NetWorthTracker"), { loading: Loading });
const BudgetCalculator = dynamic(() => import("@/components/tools/BudgetCalculator"), { loading: Loading });
const EmergencyFundCalculator = dynamic(() => import("@/components/tools/EmergencyFundCalculator"), { loading: Loading });
const CompoundInterestSimulator = dynamic(() => import("@/components/tools/CompoundInterestSimulator"), { loading: Loading });
const FirePlanner = dynamic(() => import("@/components/tools/FirePlanner"), { loading: Loading });
const ValuationDCFCalculator = dynamic(() => import("@/components/tools/ValuationDCFCalculator"), { loading: Loading });
type Tab = "net-worth" | "budget" | "emergency-fund" | "compound-interest" | "fire-planner" | "valuation-dcf";

// Structural shape of the tab list: id and icon. Labels come from
// `t.dataTables.toolsIndex.tabs`; see `tabsOf`.
const TAB_ICONS: { id: Tab; icon: typeof Wallet }[] = [
  { id: "net-worth", icon: Wallet },
  { id: "budget", icon: PiggyBank },
  { id: "emergency-fund", icon: ShieldAlert },
  { id: "compound-interest", icon: TrendingUp },
  { id: "fire-planner", icon: Sparkles },
  { id: "valuation-dcf", icon: Building2 },
];

function tabsOf(t: Dictionary): { id: Tab; label: string; icon: typeof Wallet }[] {
  const copy = t.dataTables.toolsIndex.tabs;
  return [
    { ...TAB_ICONS[0], label: copy.netWorth },
    { ...TAB_ICONS[1], label: copy.budget },
    { ...TAB_ICONS[2], label: copy.emergencyFund },
    { ...TAB_ICONS[3], label: copy.compoundInterest },
    { ...TAB_ICONS[4], label: copy.firePlanner },
    { ...TAB_ICONS[5], label: copy.valuationDcf },
  ];
}

// Hub for the personal-finance & corporate-valuation tools that turn lesson
// concepts into interactive calculators.
export default function CongCuClient() {
  const { userId, checking } = useAuthGate();
  const { t } = useI18n();
  const TABS = useMemo(() => tabsOf(t), [t]);
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
            {t.dataTables.toolsIndex.eyebrow}
          </p>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {t.dataTables.toolsIndex.title}
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            {t.dataTables.toolsIndex.subtitle}
          </p>
        </div>

        <div className="flex gap-1.5 mb-6 bg-stone-100 dark:bg-stone-900 rounded-xl p-1.5 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 min-w-fit flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold px-3 py-2.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
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
        {tab === "compound-interest" && <CompoundInterestSimulator />}
        {tab === "fire-planner" && <FirePlanner />}
        {tab === "valuation-dcf" && <ValuationDCFCalculator />}
      </div>
    </div>
  );
}
