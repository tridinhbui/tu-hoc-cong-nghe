"use client";

import { useState } from "react";
import { TrendingDown, Calculator, AlertTriangle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

export default function InteractiveInflationCalculator() {
  const { t } = useI18n();
  const [amount, setAmount] = useState(100);
  const [years, setYears] = useState(10);
  const [inflationRate, setInflationRate] = useState(6);

  const calculatePurchasingPower = () => {
    const purchasingPower = amount / Math.pow(1 + inflationRate / 100, years);
    const loss = amount - purchasingPower;
    const lossPercentage = ((loss / amount) * 100).toFixed(1);

    return {
      purchasingPower: purchasingPower.toFixed(2),
      loss: loss.toFixed(2),
      lossPercentage,
    };
  };

  const result = calculatePurchasingPower();

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-6">
      <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">
        {t.inflationCalc.title}
      </h3>
      <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
        {t.inflationCalc.subtitle}
      </p>

      {/* Input Controls */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2 block">
            {format(t.inflationCalc.amountLabel, { amount })}
          </label>
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2 block">
            {format(t.inflationCalc.yearsLabel, { years })}
          </label>
          <input
            type="range"
            min="1"
            max="30"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2 block">
            {format(t.inflationCalc.rateLabel, { rate: inflationRate })}
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={inflationRate}
            onChange={(e) => setInflationRate(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-stone-600 dark:text-stone-400" />
            <span className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase">
              {t.inflationCalc.currentValueLabel}
            </span>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {format(t.inflationCalc.millionSuffix, { amount })}
          </p>
        </div>

        <div className="p-4 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase">
              {format(t.inflationCalc.valueAfterYearsLabel, { years })}
            </span>
          </div>
          <p className="text-2xl font-bold text-rose-900 dark:text-rose-100">
            {format(t.inflationCalc.millionSuffix, { amount: result.purchasingPower })}
          </p>
        </div>
      </div>

      {/* Loss Summary */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-sm font-bold text-amber-800 dark:text-amber-300">
            {t.inflationCalc.lossTitle}
          </span>
        </div>
        <p className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-1">
          {format(t.inflationCalc.millionSuffix, { amount: result.loss })}
        </p>
        <p className="text-sm text-amber-700 dark:text-amber-400">
          {format(t.inflationCalc.lossPercentOfOriginal, { pct: result.lossPercentage })}
        </p>
      </div>

      {/* Explanation */}
      <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-xl">
        <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100 mb-3">
          {t.inflationCalc.formulaTitle}
        </h4>
        <div className="space-y-2 text-sm">
          <p className="text-stone-700 dark:text-stone-300 font-mono">
            {t.inflationCalc.formulaLine}
          </p>
          <p className="text-stone-700 dark:text-stone-300">
            {format(t.inflationCalc.formulaApplied, {
              amount,
              rate: inflationRate / 100,
              years,
              result: result.purchasingPower,
            })}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700">
          <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100 mb-2">
            {t.inflationCalc.meaningTitle}
          </h4>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {format(t.inflationCalc.meaningBody, {
              amount,
              years,
              rate: inflationRate,
              result: result.purchasingPower,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
