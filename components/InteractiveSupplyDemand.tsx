"use client";

import { createElement, useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Flame, Rocket, Scale, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

function getPriceLabels(t: Dictionary): Record<number, { label: string; color: string; icon: LucideIcon }> {
  return {
    1: { label: t.supplyDemand.priceLevel1, color: "text-ink-max", icon: TrendingDown },
    2: { label: t.supplyDemand.priceLevel2, color: "text-ink-max", icon: ArrowDownRight },
    3: { label: t.supplyDemand.priceLevel3, color: "text-ink-max", icon: ArrowDownRight },
    4: { label: t.supplyDemand.priceLevel4, color: "text-accent-strong", icon: ArrowDown },
    5: { label: t.supplyDemand.priceLevel5, color: "text-accent-strong", icon: Scale },
    6: { label: t.supplyDemand.priceLevel6, color: "text-warn-strong", icon: ArrowUpRight },
    7: { label: t.supplyDemand.priceLevel7, color: "text-warn-strong", icon: ArrowUpRight },
    8: { label: t.supplyDemand.priceLevel8, color: "text-warn-strong", icon: TrendingUp },
    9: { label: t.supplyDemand.priceLevel9, color: "text-red-600 dark:text-red-400", icon: Rocket },
    10: { label: t.supplyDemand.priceLevel10, color: "text-red-600 dark:text-red-400", icon: Flame },
  };
}

export default function InteractiveSupplyDemand() {
  const { t } = useI18n();
  const [supply, setSupply] = useState(50);
  const [demand, setDemand] = useState(50);

  const balance = demand - supply;
  const priceLevel = Math.max(1, Math.min(10, 5 + Math.round(balance / 15)));

  const priceLabels = getPriceLabels(t);
  const price = priceLabels[priceLevel];

  const getScenario = () => {
    if (balance > 30) return { text: t.supplyDemand.scenarioMuchHigherDemand, bg: "border-red-600 dark:border-red-400" };
    if (balance > 10) return { text: t.supplyDemand.scenarioHigherDemand, bg: "border-amber-500" };
    if (balance < -30) return { text: t.supplyDemand.scenarioMuchHigherSupply, bg: "border-stone-950 dark:border-stone-300" };
    if (balance < -10) return { text: t.supplyDemand.scenarioHigherSupply, bg: "border-stone-950 dark:border-stone-300" };
    return { text: t.supplyDemand.scenarioBalanced, bg: "border-brand-600 dark:border-brand-400" };
  };

  const scenario = getScenario();

  return (
    <div className="space-y-6 rounded-md border border-line-strong bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
      <div>
        <h3 className="mb-1 text-lg font-black tracking-tight text-ink-max">{t.supplyDemand.title}</h3>
        <p className="text-sm text-ink-soft">{t.supplyDemand.subtitle}</p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-ink-body">{t.supplyDemand.supplyLabel}</span>
            <span className="font-mono font-medium tabular-nums text-ink-max">{supply}</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={supply}
            onChange={(e) => setSupply(+e.target.value)}
            className="w-full"
            style={{ background: `linear-gradient(to right, #2563eb ${((supply - 10) / 90) * 100}%, #e5e7eb ${((supply - 10) / 90) * 100}%)` }}
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-ink-body">{t.supplyDemand.demandLabel}</span>
            <span className="font-mono font-medium tabular-nums text-ink-max">{demand}</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={demand}
            onChange={(e) => setDemand(+e.target.value)}
            className="w-full"
            style={{ background: `linear-gradient(to right, #ef4444 ${((demand - 10) / 90) * 100}%, #e5e7eb ${((demand - 10) / 90) * 100}%)` }}
          />
        </div>
      </div>

      {/* Visual Price Meter */}
      <div className="rounded-sm border border-stone-200 bg-page p-6 text-center dark:border-stone-800 dark:bg-stone-950">
        <div className="mb-2 text-sm text-ink-muted">{t.supplyDemand.priceMeterTitle}</div>
        <div className={`flex justify-center ${price.color} mb-1`}>
          {createElement(price.icon, { "aria-hidden": true, className: "h-12 w-12", strokeWidth: 1.5 })}
        </div>
        <div className={`text-xl font-black tracking-tight ${price.color}`}>{price.label}</div>

        {/* Bar indicator */}
        <div className="mt-4 flex items-center gap-1 justify-center">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-xs transition-colors duration-300 ${
                i < priceLevel
                  ? "bg-brand-600 dark:bg-brand-500"
                  : "bg-surface-sunken"
              }`}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-xs text-ink-muted">
          <span>{t.supplyDemand.cheapestLabel}</span>
          <span>{t.supplyDemand.mostExpensiveLabel}</span>
        </div>
      </div>

      <div className={`border-l-2 pl-4 text-sm text-ink-body ${scenario.bg}`}>
        {scenario.text}
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <button
          onClick={() => { setSupply(20); setDemand(80); }}
          className="rounded-sm border border-line-strong px-3 py-2 font-bold text-ink-body transition-colors hover:border-stone-950 dark:border-stone-700 dark:hover:border-stone-200"
        >
          {t.supplyDemand.presetHousingTitle}<br /><span className="text-xs font-normal text-ink-muted">{t.supplyDemand.presetHousingSubtitle}</span>
        </button>
        <button
          onClick={() => { setSupply(80); setDemand(20); }}
          className="rounded-sm border border-line-strong px-3 py-2 font-bold text-ink-body transition-colors hover:border-stone-950 dark:border-stone-700 dark:hover:border-stone-200"
        >
          {t.supplyDemand.presetFlightsTitle}<br /><span className="text-xs font-normal text-ink-muted">{t.supplyDemand.presetFlightsSubtitle}</span>
        </button>
        <button
          onClick={() => { setSupply(50); setDemand(50); }}
          className="rounded-sm border border-line-strong px-3 py-2 font-bold text-ink-body transition-colors hover:border-stone-950 dark:border-stone-700 dark:hover:border-stone-200"
        >
          {t.supplyDemand.presetBalancedTitle}<br /><span className="text-xs font-normal text-ink-muted">{t.supplyDemand.presetBalancedSubtitle}</span>
        </button>
      </div>
    </div>
  );
}
