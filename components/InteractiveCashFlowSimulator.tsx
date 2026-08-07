"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

export default function InteractiveCashFlowSimulator() {
  const { t } = useI18n();
  const [revenue, setRevenue] = useState(100);
  const [cogs, setCogs] = useState(60);
  const [opex, setOpex] = useState(20);
  const [receivables, setReceivables] = useState(30);
  const [payables, setPayables] = useState(20);

  const calculateMetrics = () => {
    const grossProfit = revenue - cogs;
    const operatingIncome = grossProfit - opex;
    const netIncome = operatingIncome;

    // Cash flow calculation
    const cashFromSales = revenue - receivables;
    const cashPaidForCOGS = cogs - payables;
    const cashPaidForOpex = opex;
    const netCashFlow = cashFromSales - cashPaidForCOGS - cashPaidForOpex;

    return {
      grossProfit,
      operatingIncome,
      netIncome,
      cashFromSales,
      cashPaidForCOGS,
      cashPaidForOpex,
      netCashFlow,
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-6">
      <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">
        {t.cashFlowSim.title}
      </h3>
      <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
        {t.cashFlowSim.subtitle}
      </p>

      {/* Input Controls */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2 block">
            {format(t.cashFlowSim.revenueLabel, { value: revenue })}
          </label>
          <input
            type="range"
            min="50"
            max="200"
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2 block">
            {format(t.cashFlowSim.cogsLabel, { value: cogs })}
          </label>
          <input
            type="range"
            min="20"
            max="150"
            value={cogs}
            onChange={(e) => setCogs(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2 block">
            {format(t.cashFlowSim.opexLabel, { value: opex })}
          </label>
          <input
            type="range"
            min="5"
            max="50"
            value={opex}
            onChange={(e) => setOpex(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2 block">
            {format(t.cashFlowSim.receivablesLabel, { value: receivables })}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={receivables}
            onChange={(e) => setReceivables(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2 block">
            {format(t.cashFlowSim.payablesLabel, { value: payables })}
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={payables}
            onChange={(e) => setPayables(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase">
              {t.cashFlowSim.accountingProfitLabel}
            </span>
          </div>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            {format(t.cashFlowSim.amountMillion, { amount: metrics.netIncome })}
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            {t.cashFlowSim.accountingProfitFormula}
          </p>
        </div>

        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">
              {t.cashFlowSim.realCashFlowLabel}
            </span>
          </div>
          <p className={`text-2xl font-bold ${metrics.netCashFlow >= 0 ? "text-emerald-900 dark:text-emerald-100" : "text-rose-900 dark:text-rose-100"}`}>
            {format(t.cashFlowSim.amountMillion, { amount: metrics.netCashFlow })}
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
            {t.cashFlowSim.realCashFlowFormula}
          </p>
        </div>
      </div>

      {/* Explanation */}
      <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-xl">
        <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100 mb-3">
          {t.cashFlowSim.whyDifferenceTitle}
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-stone-500 mt-0.5 flex-shrink-0" />
            <p className="text-stone-700 dark:text-stone-300">
              <strong>{t.cashFlowSim.profitLineLabel}</strong>{" "}
              {format(t.cashFlowSim.profitLineFormula, { revenue, cogs, opex, result: metrics.netIncome })}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-stone-500 mt-0.5 flex-shrink-0" />
            <p className="text-stone-700 dark:text-stone-300">
              <strong>{t.cashFlowSim.cashFlowLineLabel}</strong>{" "}
              {format(t.cashFlowSim.cashFlowLineFormula, {
                revenue,
                receivables,
                cogs,
                payables,
                opex,
                result: metrics.netCashFlow,
              })}
            </p>
          </div>
        </div>

        {metrics.netCashFlow < metrics.netIncome && (
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              ⚠️ {format(t.cashFlowSim.profitButNoCashWarning, { amount: receivables })}
            </p>
          </div>
        )}

        {metrics.netCashFlow > metrics.netIncome && (
          <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900">
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              ✅ {format(t.cashFlowSim.cashBetterThanProfitNote, { amount: payables })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
