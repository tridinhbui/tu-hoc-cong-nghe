"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

function getRoeLevel(roe: number, t: Dictionary) {
  if (roe < 5) return { label: t.roeCalc.roeLevelWeak, color: "text-rose-600", bg: "bg-rose-50" };
  if (roe < 10) return { label: t.roeCalc.roeLevelAverage, color: "text-amber-600", bg: "bg-amber-50" };
  if (roe < 20) return { label: t.roeCalc.roeLevelGood, color: "text-emerald-600", bg: "bg-emerald-50" };
  if (roe < 30) return { label: t.roeCalc.roeLevelStrong, color: "text-emerald-700", bg: "bg-emerald-50" };
  return { label: t.roeCalc.roeLevelExcellent, color: "text-blue-600", bg: "bg-blue-50" };
}

export default function InteractiveROE() {
  const { t } = useI18n();
  const [profit, setProfit] = useState(20);
  const [equity, setEquity] = useState(100);

  const roe = equity > 0 ? Math.round((profit / equity) * 100 * 10) / 10 : 0;
  const bankRate = 6;
  const isWorthIt = roe > bankRate;

  const level = getRoeLevel(roe, t);

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-6">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1">{t.roeCalc.title}</h3>
        <p className="text-stone-500 text-sm">{t.roeCalc.formulaLine}</p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700">{t.roeCalc.netProfitLabel}</span>
            <span className="font-bold text-emerald-600">{format(t.roeCalc.netProfitValue, { value: profit })}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={profit}
            onChange={(e) => setProfit(+e.target.value)}
            className="w-full"
            style={{ background: `linear-gradient(to right, #059669 ${profit}%, #e5e7eb ${profit}%)` }}
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700">{t.roeCalc.equityLabel}</span>
            <span className="font-bold text-blue-600">{format(t.roeCalc.equityValue, { value: equity })}</span>
          </div>
          <input
            type="range"
            min={10}
            max={500}
            step={10}
            value={equity}
            onChange={(e) => setEquity(+e.target.value)}
            className="w-full"
            style={{ background: `linear-gradient(to right, #2563eb ${((equity - 10) / 490) * 100}%, #e5e7eb ${((equity - 10) / 490) * 100}%)` }}
          />
        </div>
      </div>

      {/* ROE Display */}
      <div className={`rounded-2xl p-6 text-center ${level.bg}`}>
        <div className="text-stone-500 text-sm mb-1">{t.roeCalc.roeOfBusinessLabel}</div>
        <div className={`text-5xl font-bold ${level.color} mb-2`}>{roe}%</div>
        <div className={`font-semibold ${level.color}`}>{level.label}</div>
      </div>

      {/* Comparison */}
      <div className="space-y-3">
        <div className="text-sm font-semibold text-stone-700">{t.roeCalc.compareTitle}</div>
        <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
          <div className="text-xl">🏦</div>
          <div className="flex-1">
            <div className="text-sm font-medium text-stone-700">{t.roeCalc.bankOptionTitle}</div>
            <div className="text-xs text-stone-500">{t.roeCalc.bankOptionSubtitle}</div>
          </div>
          <div className="font-bold text-stone-600">{bankRate}%</div>
        </div>

        <div className={`flex items-center gap-3 p-3 rounded-xl ${isWorthIt ? "bg-emerald-50" : "bg-rose-50"}`}>
          <div className="text-xl">📊</div>
          <div className="flex-1">
            <div className="text-sm font-medium text-stone-700">{t.roeCalc.businessOptionTitle}</div>
            <div className="text-xs text-stone-500">{t.roeCalc.businessOptionSubtitle}</div>
          </div>
          <div className={`font-bold ${isWorthIt ? "text-emerald-600" : "text-rose-600"}`}>{roe}%</div>
        </div>

        <div className={`text-sm p-3 rounded-xl font-medium ${isWorthIt ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"}`}>
          {isWorthIt
            ? format(t.roeCalc.worthItConclusion, { roe, bank: bankRate })
            : format(t.roeCalc.notWorthItConclusion, { roe, bank: bankRate })}
        </div>
      </div>

      <div className="text-xs text-stone-500 bg-stone-50 rounded-xl p-3">
        💡 <strong>{t.roeCalc.formulaLabel}</strong> {format(t.roeCalc.formulaBreakdown, { profit, equity, roe })}
        <br />{format(t.roeCalc.formulaMeaning, { roe })}
      </div>
    </div>
  );
}
