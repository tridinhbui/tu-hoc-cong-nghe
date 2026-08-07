"use client";

import { useState } from "react";
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
    if (rate <= 4) return "text-blue-600";
    if (rate <= 7) return "text-emerald-600";
    if (rate <= 10) return "text-amber-600";
    return "text-rose-600";
  };

  const getRateLabel = () => {
    if (rate <= 4) return t.interestRateCalc.rateVeryLow;
    if (rate <= 7) return t.interestRateCalc.rateNormal;
    if (rate <= 10) return t.interestRateCalc.rateHigh;
    return t.interestRateCalc.rateVeryHigh;
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-6">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1">{t.interestRateCalc.title}</h3>
        <p className="text-stone-500 text-sm">{t.interestRateCalc.subtitle}</p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="font-medium text-stone-700">{t.interestRateCalc.rateLabel}</span>
          <span className={`text-3xl font-bold ${getRateColor()}`}>{rate}%</span>
        </div>
        <input
          type="range"
          min={1}
          max={15}
          step={0.5}
          value={rate}
          onChange={(e) => setRate(+e.target.value)}
          className="w-full"
          style={{ background: `linear-gradient(to right, #059669 ${((rate - 1) / 14) * 100}%, #e5e7eb ${((rate - 1) / 14) * 100}%)` }}
        />
        <div className="flex justify-between text-xs text-stone-500 mt-1">
          <span>1%</span>
          <span className="text-center font-medium text-stone-600">{getRateLabel()}</span>
          <span>15%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="bg-blue-50 rounded-2xl p-4 flex items-center gap-4">
          <div className="text-3xl">🏦</div>
          <div className="flex-1">
            <div className="font-semibold text-stone-800">{t.interestRateCalc.savingsTitle}</div>
            <div className="text-stone-500 text-sm">{t.interestRateCalc.savingsSubtitle}</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-blue-600">+{format(t.interestRateCalc.millionUnit, { value: savingsReturn })}</div>
            <div className="text-xs text-stone-500">{t.interestRateCalc.perYearSuffix}</div>
          </div>
        </div>

        <div className="bg-rose-50 rounded-2xl p-4 flex items-center gap-4">
          <div className="text-3xl">🏠</div>
          <div className="flex-1">
            <div className="font-semibold text-stone-800">{t.interestRateCalc.loanTitle}</div>
            <div className="text-stone-500 text-sm">{t.interestRateCalc.loanSubtitle}</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-rose-600">+{format(t.interestRateCalc.millionUnit, { value: monthlyCost })}</div>
            <div className="text-xs text-stone-500">{t.interestRateCalc.perMonthSuffix}</div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl p-4 flex items-center gap-4">
          <div className="text-3xl">🏭</div>
          <div className="flex-1">
            <div className="font-semibold text-stone-800">{t.interestRateCalc.businessTitle}</div>
            <div className="text-stone-500 text-sm">{t.interestRateCalc.businessSubtitle}</div>
          </div>
          <div className="text-right">
            <div className={`text-sm font-bold ${rate > 8 ? "text-rose-600" : "text-emerald-600"}`}>
              {rate > 10 ? t.interestRateCalc.businessVeryHard : rate > 7 ? t.interestRateCalc.businessHarder : t.interestRateCalc.businessFavorable}
            </div>
          </div>
        </div>
      </div>

      {rate >= 10 && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-800 text-sm">
          <strong>{format(t.interestRateCalc.highRateTitle, { rate })}</strong> {t.interestRateCalc.highRateBody}
        </div>
      )}

      {rate <= 3 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-blue-800 text-sm">
          <strong>{format(t.interestRateCalc.lowRateTitle, { rate })}</strong> {t.interestRateCalc.lowRateBody}
        </div>
      )}
    </div>
  );
}
