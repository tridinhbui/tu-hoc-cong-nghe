"use client";

import { useState } from "react";
import {
  Calculator,
  TrendingUp,
  Percent,
  DollarSign,
  PieChart,
  HelpCircle,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Building2,
  Info,
} from "lucide-react";
import { calculateDCF, calculateWACC, type DCFInput, type WACCInput } from "@/lib/dcf-wacc-calculator";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

export default function ValuationDCFCalculator() {
  const { t } = useI18n();
  const [activeSubTab, setActiveSubTab] = useState<"dcf" | "wacc">("dcf");

  // DCF State (Sample defaults inspired by FPT / Vinamilk scale)
  const [dcfInput, setDcfInput] = useState<DCFInput>({
    baseFCF: 1200, // 1,200 billion VND
    forecastYears: 5,
    growthRate: 15, // 15% growth
    wacc: 10.5, // 10.5% discount rate
    perpetualGrowthRate: 2.5, // 2.5% terminal growth
    cashAndEquivalents: 4500, // 4,500 billion VND cash
    totalDebt: 2200, // 2,200 billion VND debt
    sharesOutstanding: 1270, // 1,270 million shares
    currentMarketPrice: 115000, // 115,000 VND / share
  });

  // WACC State
  const [waccInput, setWaccInput] = useState<WACCInput>({
    equityValue: 80000, // E = 80,000 billion VND
    debtValue: 20000, // D = 20,000 billion VND
    costOfEquity: 13.0, // Ke = 13.0%
    costOfDebt: 7.5, // Kd = 7.5%
    taxRate: 20.0, // Corporate tax 20%
  });

  const dcfResult = calculateDCF(dcfInput);
  const waccResult = calculateWACC(waccInput);

  return (
    <div className="space-y-6 font-sans text-stone-900 dark:text-stone-100">
      {/* Sub-tab Navigation */}
      <div className="flex items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSubTab("dcf")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeSubTab === "dcf"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800"
            }`}
          >
            <Building2 className="w-4 h-4" /> {t.dcf.tabDcf}
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("wacc")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeSubTab === "wacc"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800"
            }`}
          >
            <PieChart className="w-4 h-4" /> {t.dcf.tabWacc}
          </button>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[11px] font-black uppercase tracking-wider border border-amber-300 dark:border-amber-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> {t.dcf.standardBadge}
        </span>
      </div>

      {/* ── TAB 1: DEFINITION & SIMULATION DCF ── */}
      {activeSubTab === "dcf" && (
        <div className="space-y-6">
          {/* Hero Recommendation Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-emerald-950 text-white shadow-xl border border-stone-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  {t.dcf.resultTitle}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-stone-100 mt-1">
                  {format(t.dcf.intrinsicValue, { value: dcfResult.intrinsicValuePerShare.toLocaleString() })}
                </h2>
              </div>
              <div
                className={`px-4 py-2 rounded-2xl border text-xs font-black flex items-center gap-1.5 shrink-0 ${
                  dcfResult.recommendation === "UNDERVALUED"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : dcfResult.recommendation === "OVERVALUED"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                    : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                }`}
              >
                {dcfResult.recommendation === "UNDERVALUED" && <ArrowUpRight className="w-4 h-4 text-emerald-400" />}
                {dcfResult.recommendation === "OVERVALUED" && <ArrowDownRight className="w-4 h-4 text-rose-400" />}
                <span>
                  {dcfResult.recommendation === "UNDERVALUED" && format(t.dcf.undervalued, { sign: dcfResult.upsidePercentage > 0 ? "+" : "", percent: dcfResult.upsidePercentage })}
                  {dcfResult.recommendation === "OVERVALUED" && format(t.dcf.overvalued, { percent: dcfResult.upsidePercentage })}
                  {dcfResult.recommendation === "FAIR" && format(t.dcf.fairValue, { sign: dcfResult.upsidePercentage > 0 ? "+" : "", percent: dcfResult.upsidePercentage })}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800">
                <p className="text-[10px] font-bold text-stone-400 uppercase">{t.dcf.marketPriceLabel}</p>
                <p className="text-sm font-black text-stone-200 mt-0.5">{format(t.dcf.currency, { value: dcfInput.currentMarketPrice.toLocaleString() })}</p>
              </div>
              <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800">
                <p className="text-[10px] font-bold text-stone-400 uppercase">{t.dcf.evLabel}</p>
                <p className="text-sm font-black text-stone-200 mt-0.5">{format(t.dcf.billions, { value: dcfResult.enterpriseValue.toLocaleString() })}</p>
              </div>
              <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800">
                <p className="text-[10px] font-bold text-stone-400 uppercase">{t.dcf.equityLabel}</p>
                <p className="text-sm font-black text-emerald-400 mt-0.5">{format(t.dcf.billions, { value: dcfResult.equityValue.toLocaleString() })}</p>
              </div>
              <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800">
                <p className="text-[10px] font-bold text-stone-400 uppercase">{t.dcf.tvShareLabel}</p>
                <p className="text-sm font-black text-amber-400 mt-0.5">
                  {format(t.dcf.percentOfEv, { percent: Math.round((dcfResult.pvTerminalValue / dcfResult.enterpriseValue) * 100 || 0) })}
                </p>
              </div>
            </div>
          </div>

          {/* Form Inputs Grid */}
          <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {t.dcf.inputsTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">{t.dcf.inFcf}</label>
                <input
                  type="number"
                  value={dcfInput.baseFCF}
                  onChange={(e) => setDcfInput({ ...dcfInput, baseFCF: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 font-bold text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">{t.dcf.inGrowth}</label>
                <input
                  type="number"
                  step="0.5"
                  value={dcfInput.growthRate}
                  onChange={(e) => setDcfInput({ ...dcfInput, growthRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 font-bold text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">{t.dcf.inWacc}</label>
                <input
                  type="number"
                  step="0.1"
                  value={dcfInput.wacc}
                  onChange={(e) => setDcfInput({ ...dcfInput, wacc: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 font-bold text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">{t.dcf.inTerminalGrowth}</label>
                <input
                  type="number"
                  step="0.1"
                  value={dcfInput.perpetualGrowthRate}
                  onChange={(e) => setDcfInput({ ...dcfInput, perpetualGrowthRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 font-bold text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">{t.dcf.inCash}</label>
                <input
                  type="number"
                  value={dcfInput.cashAndEquivalents}
                  onChange={(e) => setDcfInput({ ...dcfInput, cashAndEquivalents: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 font-bold text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">{t.dcf.inDebt}</label>
                <input
                  type="number"
                  value={dcfInput.totalDebt}
                  onChange={(e) => setDcfInput({ ...dcfInput, totalDebt: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 font-bold text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">{t.dcf.inShares}</label>
                <input
                  type="number"
                  value={dcfInput.sharesOutstanding}
                  onChange={(e) => setDcfInput({ ...dcfInput, sharesOutstanding: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 font-bold text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">{t.dcf.inMarketPrice}</label>
                <input
                  type="number"
                  step="500"
                  value={dcfInput.currentMarketPrice}
                  onChange={(e) => setDcfInput({ ...dcfInput, currentMarketPrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 font-bold text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Breakdown Forecast Table */}
          <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3">
            <h3 className="text-sm font-black text-stone-900 dark:text-stone-100">
              {t.dcf.forecastTitle}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-semibold text-stone-700 dark:text-stone-300">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800 text-[10px] uppercase text-stone-400">
                    <th className="py-2 px-3">{t.dcf.colYear}</th>
                    <th className="py-2 px-3">{t.dcf.colFcf}</th>
                    <th className="py-2 px-3">{t.dcf.colDiscount}</th>
                    <th className="py-2 px-3 text-right">{t.dcf.colPv}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {dcfResult.yearlyFCF.map((row) => (
                    <tr key={row.year} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                      <td className="py-2.5 px-3 font-black text-emerald-600 dark:text-emerald-400">{format(t.dcf.rowYear, { year: row.year })}</td>
                      <td className="py-2.5 px-3 font-bold">{format(t.dcf.billionsShort, { value: row.fcf.toLocaleString() })}</td>
                      <td className="py-2.5 px-3 text-stone-400">1 / (1 + {dcfInput.wacc}%)^{row.year}</td>
                      <td className="py-2.5 px-3 text-right font-black text-stone-900 dark:text-stone-100">
                        {format(t.dcf.billionsShort, { value: row.pv.toLocaleString() })}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-500/10 font-black text-emerald-800 dark:text-emerald-300">
                    <td className="py-2.5 px-3">{t.dcf.total5Years}</td>
                    <td className="py-2.5 px-3">-</td>
                    <td className="py-2.5 px-3">-</td>
                    <td className="py-2.5 px-3 text-right text-emerald-600 dark:text-emerald-400">
                      {format(t.dcf.billionsShort, { value: dcfResult.sumPvFCF.toLocaleString() })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: WACC CALCULATOR ── */}
      {activeSubTab === "wacc" && (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-teal-950 text-white shadow-xl border border-stone-800 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-400 bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-500/30">
                  {t.dcf.waccResultTitle}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-stone-100 mt-1">
                  {format(t.dcf.waccValue, { value: waccResult.wacc })}
                </h2>
              </div>
              <span className="text-3xl">⚖️</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800">
                <p className="text-[10px] font-bold text-stone-400 uppercase">{t.dcf.equityWeight}</p>
                <p className="text-sm font-black text-teal-400 mt-0.5">{waccResult.equityWeight}%</p>
              </div>
              <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800">
                <p className="text-[10px] font-bold text-stone-400 uppercase">{t.dcf.debtWeight}</p>
                <p className="text-sm font-black text-amber-400 mt-0.5">{waccResult.debtWeight}%</p>
              </div>
              <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800">
                <p className="text-[10px] font-bold text-stone-400 uppercase">{t.dcf.afterTaxKd}</p>
                <p className="text-sm font-black text-stone-200 mt-0.5">{waccResult.afterTaxCostOfDebt}%</p>
              </div>
              <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800">
                <p className="text-[10px] font-bold text-stone-400 uppercase">{t.dcf.taxShield}</p>
                <p className="text-sm font-black text-emerald-400 mt-0.5">{format(t.dcf.taxShieldValue, { rate: waccInput.taxRate })}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="text-sm font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {t.dcf.waccInputsTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">{t.dcf.inEquity}</label>
                <input
                  type="number"
                  value={waccInput.equityValue}
                  onChange={(e) => setWaccInput({ ...waccInput, equityValue: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 font-bold text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">{t.dcf.inDebtValue}</label>
                <input
                  type="number"
                  value={waccInput.debtValue}
                  onChange={(e) => setWaccInput({ ...waccInput, debtValue: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 font-bold text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">{t.dcf.inKe}</label>
                <input
                  type="number"
                  step="0.1"
                  value={waccInput.costOfEquity}
                  onChange={(e) => setWaccInput({ ...waccInput, costOfEquity: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 font-bold text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">{t.dcf.inKd}</label>
                <input
                  type="number"
                  step="0.1"
                  value={waccInput.costOfDebt}
                  onChange={(e) => setWaccInput({ ...waccInput, costOfDebt: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 font-bold text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">{t.dcf.inTaxRate}</label>
                <input
                  type="number"
                  step="1"
                  value={waccInput.taxRate}
                  onChange={(e) => setWaccInput({ ...waccInput, taxRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 font-bold text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
