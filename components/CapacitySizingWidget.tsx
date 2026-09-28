"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, Award, TrendingUp, DollarSign, Layers, CheckCircle2, Trophy } from "lucide-react";
import { toast } from "sonner";
import { recordCustomGameSession, MAX_GAME_XP_PER_TYPE } from "@/lib/games";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

interface CapacitySizingWidgetProps {
  userId: string;
}

/** Một case định mức dung lượng.
 *
 *  `recommendedNodes` KHÔNG phải con số gõ tay: nó là
 *  `peakRps / nodeRps * headroomMultiple`, đúng công thức mà lời giải in ra cho
 *  người học. Gõ tay một con số lệch khỏi công thức thì widget chấm người hiểu
 *  bài là sai, rồi giải thích cho họ bằng chính công thức họ vừa dùng đúng. */
interface CapacityCase {
  id: string;
  name: string;
  ticker: string;
  peakRps: number;
  nodeRps: number;
  headroomMultiple: number;
  loadDriver: string;
}

function recommendedNodes(c: CapacityCase): number {
  return Math.round((c.peakRps / c.nodeRps) * c.headroomMultiple);
}

function buildCapacityCases(t: Dictionary): CapacityCase[] {
  return [
    {
      id: "tech-corp",
      /* i18n-ignore-start: tên hai hệ thống hư cấu trong bộ dữ liệu demo của
         widget. Tên riêng, không dịch - giống guild.clanTitle. */
      name: "TechCloud AI Global",
      ticker: "TCAI",
      /* i18n-ignore-end */
      peakRps: 24000,
      nodeRps: 200,
      headroomMultiple: 1.5,
      loadDriver: t.capacityPlanning.loadAiInference,
    },
    {
      id: "retail-chain",
      /* i18n-ignore-start: như trên. */
      name: "VinMart Retail Chain",
      ticker: "VMR",
      /* i18n-ignore-end */
      peakRps: 8000,
      nodeRps: 100,
      headroomMultiple: 1.25,
      loadDriver: t.capacityPlanning.loadFlashSale,
    },
  ];
}

export default function CapacitySizingWidget({ userId }: CapacitySizingWidgetProps) {
  const { t, locale } = useI18n();
  // "24.000 req/s" với người đọc tiếng Việt, "24,000 req/s" với người đọc tiếng
  // Anh. Cùng lý do AGENTS.md bắt mọi ngày tháng đi qua intlLocale().
  const rps = (n: number) => `${n.toLocaleString(intlLocale(locale))} req/s`;
  const capacityCases = useMemo(() => buildCapacityCases(t), [t]);
  const [selectedCase, setSelectedCase] = useState<CapacityCase>(capacityCases[0]);
  const [userNodes, setUserNodes] = useState<number>(recommendedNodes(capacityCases[0]));
  const [planSubmitted, setPlanSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);

  const handleSubmitPlan = () => {
    const target = recommendedNodes(selectedCase);
    const diffPercent = Math.abs(userNodes - target) / target;

    let planScore = 100;
    if (diffPercent > 0.2) planScore = 60;
    else if (diffPercent > 0.1) planScore = 80;
    else planScore = 95;

    setScore(planScore);
    setPlanSubmitted(true);

    if (planScore >= 80) {
      toast.success(format(t.capacityPlanning.toastSuccess, { score: planScore }));
      // Qua sổ ván game (ván tốt nhất, trần 50) - gọi thẳng addXpToUser thì XP
      // bị xoá ở lần recalculateUserStats kế tiếp.
      if (userId) void recordCustomGameSession(userId, "capacity-sizing", planScore, 100, MAX_GAME_XP_PER_TYPE);
    } else {
      toast.info(format(t.capacityPlanning.toastPartial, { score: planScore }));
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-stone-950 text-white rounded-md border border-stone-800 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/15">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-sm overflow-hidden relative border border-white/15 shrink-0">
            <Image src="/rpg/silicon_valley.png" alt={t.capacityPlanning.hqAlt} fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm text-stone-300 border border-white/15">
                {t.capacityPlanning.orgBadge}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm text-stone-300 border border-white/15">
                {t.capacityPlanning.trackBadge}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white mt-1">{t.capacityPlanning.orgTitle}</h3>
            <p className="text-xs text-stone-400">{t.capacityPlanning.orgSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Chọn case */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {capacityCases.map((c) => (
          <div
            key={c.id}
            onClick={() => {
              setSelectedCase(c);
              setUserNodes(recommendedNodes(c));
              setPlanSubmitted(false);
              setScore(null);
            }}
            className={`p-4 rounded-md border cursor-pointer transition-colors ${
              selectedCase.id === c.id
                ? "bg-stone-900 border-brand-400"
                : "bg-stone-950 border-stone-800 hover:border-stone-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">{format(t.capacityPlanning.capacityCase, { ticker: c.ticker })}</span>
              <span className="text-xs tabular-nums text-stone-400">{format(t.capacityPlanning.nodeCapacity, { capacity: rps(c.nodeRps) })}</span>
            </div>
            <h4 className="text-base font-extrabold text-white mt-1">{c.name}</h4>
            <p className="text-xs text-stone-400 mt-1">{c.loadDriver}</p>
          </div>
        ))}
      </div>

      {/* Bàn làm việc định mức */}
      <div className="bg-stone-900 p-5 rounded-md border border-stone-800 space-y-4">
        <div className="flex items-center justify-between gap-3 border-b border-stone-800 pb-3">
          <div>
            <h4 className="text-sm font-extrabold text-white">{format(t.capacityPlanning.sizingTitle, { name: selectedCase.name })}</h4>
            <p className="text-xs text-stone-400 mt-0.5">{format(t.capacityPlanning.headroomFactor, { multiple: selectedCase.headroomMultiple })}</p>
          </div>
          <span className="shrink-0 text-xs font-semibold tabular-nums text-brand-300 px-2 py-1 rounded-sm border border-white/15">
            {format(t.capacityPlanning.peakBadge, { peak: rps(selectedCase.peakRps) })}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-stone-300">{t.capacityPlanning.nodeCountLabel}</span>
            <span className="text-brand-300 tabular-nums text-base font-bold">{format(t.capacityPlanning.nodeCountValue, { count: userNodes })}</span>
          </div>

          <input
            type="range"
            min={Math.round(recommendedNodes(selectedCase) * 0.5)}
            max={Math.round(recommendedNodes(selectedCase) * 1.5)}
            step={10}
            value={userNodes}
            onChange={(e) => setUserNodes(Number(e.target.value))}
            className="w-full h-2 bg-stone-800 rounded-sm appearance-none cursor-pointer accent-brand-400"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleSubmitPlan}
            className="w-full sm:w-auto rounded-sm bg-white px-4 py-2.5 text-sm font-bold text-stone-950 transition-colors hover:bg-brand-300 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{t.capacityPlanning.submitPlanButton}</span>
          </button>
        </div>

        {planSubmitted && score !== null && (
          <div className="p-4 rounded-md bg-stone-950 border border-stone-700 text-xs space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-200 uppercase tracking-wider">{t.capacityPlanning.reviewLabel}</span>
              <span className="tabular-nums font-bold text-brand-300 text-sm">{format(t.capacityPlanning.reviewScore, { score })}</span>
            </div>
            <p className="text-stone-300 leading-relaxed">
              {t.capacityPlanning.reviewNotePart1}<strong>{format(t.capacityPlanning.reviewAmount, { count: recommendedNodes(selectedCase) })}</strong>{t.capacityPlanning.reviewNotePart2}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
