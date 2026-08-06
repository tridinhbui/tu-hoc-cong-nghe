"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle2, XCircle, Trophy, RefreshCw, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import GoldCoinIcon from "@/components/GoldCoinIcon";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

interface MaClause {
  id: number;
  clauseKey: "workingCapital" | "debtAssumption" | "priceAdjustment";
  clauseText: string;
  isRisk: boolean;
  explanation: string;
}

const CLAUSE_DATA: { id: number; clauseKey: MaClause["clauseKey"]; isRisk: boolean }[] = [
  { id: 1, clauseKey: "workingCapital", isRisk: true },
  { id: 2, clauseKey: "debtAssumption", isRisk: false },
  { id: 3, clauseKey: "priceAdjustment", isRisk: true },
];

function buildClauses(t: Dictionary): MaClause[] {
  const c = t.games.maSpeedrun.clauses;
  return CLAUSE_DATA.map((d) => ({
    ...d,
    clauseText: c[d.clauseKey].text,
    explanation: c[d.clauseKey].explanation,
  }));
}

export default function MaSpeedrunGame({ onBack, completedLessonIds = [] }: { onBack?: () => void; completedLessonIds?: number[] }) {
  const { t } = useI18n();
  const ms = t.games.maSpeedrun;
  const CLAUSES = useMemo(() => buildClauses(t), [t]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentC = CLAUSES[currentIndex];

  const handleDecision = (flaggedAsRisk: boolean) => {
    if (flaggedAsRisk === currentC.isRisk) {
      setScore((s) => s + 100);
      toast.success(format(ms.toastCorrect, { explanation: currentC.explanation }));
    } else {
      toast.error(format(ms.toastWrong, { explanation: currentC.explanation }));
    }

    if (currentIndex < CLAUSES.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="bg-white border-2 border-indigo-300 rounded-3xl p-6 shadow-xl max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-100">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-black text-stone-600 hover:text-indigo-600 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> {ms.backButton}
          </button>
        )}
        <div className="text-center flex-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            {ms.districtBadge}
          </span>
          <h2 className="text-xl font-black text-stone-900 mt-1">
            {ms.title}
          </h2>
        </div>
        <div className="flex items-center gap-1 font-black text-indigo-600 text-sm">
          <GoldCoinIcon className="w-4 h-4" /> {format(ms.pointsLabel, { score })}
        </div>
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          <div className="bg-stone-50 p-6 rounded-3xl border-2 border-indigo-200 shadow-inner">
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block mb-2">
              {format(ms.clauseLabel, { id: currentC.id })}
            </span>
            <p className="text-base font-black text-stone-900 leading-relaxed">
              "{currentC.clauseText}"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleDecision(true)}
              className="py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 text-white font-black text-sm hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <ShieldAlert className="w-5 h-5" /> {ms.riskButton}
            </button>
            <button
              onClick={() => handleDecision(false)}
              className="py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <CheckCircle2 className="w-5 h-5" /> {ms.safeButton}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 space-y-4">
          <Trophy className="w-16 h-16 text-indigo-500 mx-auto animate-bounce" />
          <h3 className="text-2xl font-black text-stone-900">
            {ms.finishedTitle}
          </h3>
          <p className="text-sm font-bold text-indigo-600">
            {format(ms.finishedScore, { score })}
          </p>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setScore(0);
              setIsFinished(false);
            }}
            className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-black text-sm hover:scale-105 transition-all flex items-center gap-2 mx-auto cursor-pointer shadow-md"
          >
            <RefreshCw className="w-4 h-4" /> {ms.restartButton}
          </button>
        </div>
      )}
    </div>
  );
}
