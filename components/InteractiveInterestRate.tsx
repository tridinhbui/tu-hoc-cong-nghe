"use client";

import { useState } from "react";
import { Factory, Home, Landmark } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

export default function InteractiveInterestRate() {
  const { t } = useI18n();
  const [rate, setRate] = useState(6);
  const loan = 1000; // 1 tỷ
  const savings = 500; // 500 triệu

  const annualLoanCost = Math.round((loan * rate) / 100);
  const monthlyCost = Math.round(annualLoanCost / 12);
  const savingsReturn = Math.round((savings * rate) / 100);

  const getRateColor = () => {
    if (rate <= 7) return "text-ink-max";
    if (rate <= 10) return "text-warn-strong";
    return "text-red-600 dark:text-red-400";
  };

  const getRateLabel = () => {
    if (rate <= 4) return t.interestRateCalc.rateVeryLow;
    if (rate <= 7) return t.interestRateCalc.rateNormal;
    if (rate <= 10) return t.interestRateCalc.rateHigh;
    return t.interestRateCalc.rateVeryHigh;
  };

  return (
    <div className="space-y-6 rounded-md border border-stone-300 bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
      <div>
        <h3 className="mb-1 text-lg font-black tracking-tight text-ink-max">{t.interestRateCalc.title}</h3>
        <p className="text-sm text-ink-soft">{t.interestRateCalc.subtitle}</p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="font-medium text-ink-body">{t.interestRateCalc.rateLabel}</span>
          <span className={`font-mono text-3xl font-medium tabular-nums ${getRateColor()}`}>{rate}%</span>
        </div>
        <input
          type="range"
          min={1}
          max={15}
          step={0.5}
          value={rate}
          onChange={(e) => setRate(+e.target.value)}
          className="w-full"
          style={{ background: `linear-gradient(to right, #2961b8 ${((rate - 1) / 14) * 100}%, #e5e7eb ${((rate - 1) / 14) * 100}%)` }}
        />
        <div className="flex justify-between mt-1 font-mono text-xs tabular-nums text-ink-muted">
          <span>1%</span>
          <span className="text-center font-sans font-medium text-ink-soft">{getRateLabel()}</span>
          <span>15%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y divide-stone-200 rounded-sm border border-stone-200 dark:divide-stone-800 dark:border-stone-800">
        <div className="flex items-center gap-4 p-4">
          <div className="rounded-sm border border-stone-200 p-2 text-ink-muted dark:border-stone-800"><Landmark aria-hidden className="h-7 w-7" strokeWidth={1.75} /></div>
          <div className="flex-1">
            <div className="font-bold text-ink-max">{t.interestRateCalc.savingsTitle}</div>
            <div className="text-sm text-ink-soft">{t.interestRateCalc.savingsSubtitle}</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-black tabular-nums text-accent-strong">+{format(t.interestRateCalc.millionUnit, { value: savingsReturn })}</div>
            <div className="text-xs text-ink-muted">{t.interestRateCalc.perYearSuffix}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4">
          <div className="rounded-sm border border-stone-200 p-2 text-ink-muted dark:border-stone-800"><Home aria-hidden className="h-7 w-7" strokeWidth={1.75} /></div>
          <div className="flex-1">
            <div className="font-bold text-ink-max">{t.interestRateCalc.loanTitle}</div>
            <div className="text-sm text-ink-soft">{t.interestRateCalc.loanSubtitle}</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-black tabular-nums text-red-600 dark:text-red-400">+{format(t.interestRateCalc.millionUnit, { value: monthlyCost })}</div>
            <div className="text-xs text-ink-muted">{t.interestRateCalc.perMonthSuffix}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4">
          <div className="rounded-sm border border-stone-200 p-2 text-ink-muted dark:border-stone-800"><Factory aria-hidden className="h-7 w-7" strokeWidth={1.75} /></div>
          <div className="flex-1">
            <div className="font-bold text-ink-max">{t.interestRateCalc.businessTitle}</div>
            <div className="text-sm text-ink-soft">{t.interestRateCalc.businessSubtitle}</div>
          </div>
          <div className="text-right">
            <div className={`text-sm font-bold ${rate > 8 ? "text-red-600 dark:text-red-400" : "text-accent-strong"}`}>
              {rate > 10 ? t.interestRateCalc.businessVeryHard : rate > 7 ? t.interestRateCalc.businessHarder : t.interestRateCalc.businessFavorable}
            </div>
          </div>
        </div>
      </div>

      {rate >= 10 && (
        <div className="border-l-2 border-red-600 pl-4 text-sm text-ink-body dark:border-red-500">
          <strong>{format(t.interestRateCalc.highRateTitle, { rate })}</strong> {t.interestRateCalc.highRateBody}
        </div>
      )}

      {rate <= 3 && (
        <div className="border-l-2 border-stone-950 pl-4 text-sm text-ink-body dark:border-stone-200">
          <strong>{format(t.interestRateCalc.lowRateTitle, { rate })}</strong> {t.interestRateCalc.lowRateBody}
        </div>
      )}
    </div>
  );
}
