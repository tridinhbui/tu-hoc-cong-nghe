"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, Award, TrendingUp, DollarSign, Layers, CheckCircle2, Trophy } from "lucide-react";
import { toast } from "sonner";
import { addXpToUser } from "@/lib/supabase-progress";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

interface GoldmanSachsWidgetProps {
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
      loadDriver: t.goldmanWidget.synergyTechCorp,
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
      loadDriver: t.goldmanWidget.synergyRetailChain,
    },
  ];
}

export default function GoldmanSachsWidget({ userId }: GoldmanSachsWidgetProps) {
  const { t, locale } = useI18n();
  // "24.000 req/s" với người đọc tiếng Việt, "24,000 req/s" với người đọc tiếng
  // Anh. Cùng lý do AGENTS.md bắt mọi ngày tháng đi qua intlLocale().
  const rps = (n: number) => `${n.toLocaleString(intlLocale(locale))} req/s`;
  const capacityCases = useMemo(() => buildCapacityCases(t), [t]);
  const [selectedCase, setSelectedCase] = useState<CapacityCase>(capacityCases[0]);
  const [userNodes, setUserNodes] = useState<number>(recommendedNodes(capacityCases[0]));
  const [pitchSubmitted, setPitchSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);

  const handleSubmitPitch = () => {
    const target = recommendedNodes(selectedCase);
    const diffPercent = Math.abs(userNodes - target) / target;

    let dealScore = 100;
    if (diffPercent > 0.2) dealScore = 60;
    else if (diffPercent > 0.1) dealScore = 80;
    else dealScore = 95;

    setScore(dealScore);
    setPitchSubmitted(true);

    if (dealScore >= 80) {
      toast.success(format(t.goldmanWidget.toastSuccess, { score: dealScore }));
      if (userId) void addXpToUser(userId, 120);
    } else {
      toast.info(format(t.goldmanWidget.toastPartial, { score: dealScore }));
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl overflow-hidden relative border-2 border-sky-400 shadow-md shrink-0">
            <Image src="/rpg/silicon_valley.png" alt={t.goldmanWidget.hqAlt} fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/40">
                {t.goldmanWidget.orgBadge}
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
                {t.goldmanWidget.trackBadge}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white mt-1">{t.goldmanWidget.orgTitle}</h3>
            <p className="text-xs text-slate-400">{t.goldmanWidget.orgSubtitle}</p>
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
              setPitchSubmitted(false);
              setScore(null);
            }}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedCase.id === c.id
                ? "bg-sky-950/60 border-sky-400 ring-2 ring-sky-400/30 shadow-lg"
                : "bg-slate-900 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-sky-400 tracking-wider">{format(t.goldmanWidget.dealCase, { ticker: c.ticker })}</span>
              <span className="text-xs font-bold text-slate-400">{format(t.goldmanWidget.dealEbitda, { capacity: rps(c.nodeRps) })}</span>
            </div>
            <h4 className="text-base font-extrabold text-white mt-1">{c.name}</h4>
            <p className="text-xs text-slate-400 mt-1">{c.loadDriver}</p>
          </div>
        ))}
      </div>

      {/* Bàn làm việc định mức */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-extrabold text-white">{format(t.goldmanWidget.valuationTitle, { name: selectedCase.name })}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{format(t.goldmanWidget.valuationMultiple, { multiple: selectedCase.headroomMultiple })}</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
            {format(t.goldmanWidget.revenueBadge, { peak: rps(selectedCase.peakRps) })}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300">{t.goldmanWidget.pitchLabel}</span>
            <span className="text-sky-400 font-mono text-base font-black">{format(t.goldmanWidget.pitchValue, { count: userNodes })}</span>
          </div>

          <input
            type="range"
            min={Math.round(recommendedNodes(selectedCase) * 0.5)}
            max={Math.round(recommendedNodes(selectedCase) * 1.5)}
            step={10}
            value={userNodes}
            onChange={(e) => setUserNodes(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleSubmitPitch}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 font-extrabold text-xs text-slate-950 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{t.goldmanWidget.submitPitchButton}</span>
          </button>
        </div>

        {pitchSubmitted && score !== null && (
          <div className="p-4 rounded-xl bg-slate-900 border border-sky-500/40 text-xs space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sky-300 uppercase tracking-wider">{t.goldmanWidget.reviewLabel}</span>
              <span className="font-black text-emerald-400 text-sm">{format(t.goldmanWidget.reviewScore, { score })}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {t.goldmanWidget.reviewNotePart1}<strong>{format(t.goldmanWidget.reviewAmount, { count: recommendedNodes(selectedCase) })}</strong>{t.goldmanWidget.reviewNotePart2}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
