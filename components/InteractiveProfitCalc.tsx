"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

export default function InteractiveProfitCalc() {
  const { t } = useI18n();
  const [revenue, setRevenue] = useState(50);
  const [cost, setCost] = useState(30);
  const [cashReceived, setCashReceived] = useState(20);

  const profit = revenue - cost;
  const actualCash = cashReceived - cost;
  const isShortOfCash = actualCash < 0;

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-6">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1">{t.profitCalc.title}</h3>
        <p className="text-stone-500 text-sm">{t.profitCalc.subtitle}</p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700">{t.profitCalc.revenueLabel}</span>
            <span className="font-bold text-stone-900">{format(t.profitCalc.millionUnit, { value: revenue })}</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={revenue}
            onChange={(e) => setRevenue(+e.target.value)}
            className="w-full"
            style={{ background: `linear-gradient(to right, #059669 ${((revenue - 10) / 90) * 100}%, #e5e7eb ${((revenue - 10) / 90) * 100}%)` }}
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700">{t.profitCalc.costLabel}</span>
            <span className="font-bold text-stone-900">{format(t.profitCalc.millionUnit, { value: cost })}</span>
          </div>
          <input
            type="range"
            min={5}
            max={Math.min(90, revenue + 20)}
            value={cost}
            onChange={(e) => setCost(+e.target.value)}
            className="w-full"
            style={{ background: `linear-gradient(to right, #ef4444 ${((cost - 5) / 85) * 100}%, #e5e7eb ${((cost - 5) / 85) * 100}%)` }}
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700">{t.profitCalc.cashReceivedLabel}</span>
            <span className="font-bold text-stone-900">{format(t.profitCalc.millionUnit, { value: cashReceived })}</span>
          </div>
          <input
            type="range"
            min={0}
            max={revenue}
            value={cashReceived}
            onChange={(e) => setCashReceived(+e.target.value)}
            className="w-full"
            style={{ background: `linear-gradient(to right, #0891b2 ${(cashReceived / revenue) * 100}%, #e5e7eb ${(cashReceived / revenue) * 100}%)` }}
          />
          <p className="text-xs text-stone-500 mt-1">
            {format(t.profitCalc.remainingReceivable, { amount: revenue - cashReceived })}
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`rounded-2xl p-4 text-center ${profit >= 0 ? "bg-emerald-50" : "bg-rose-50"}`}>
          <div className="text-xs font-medium text-stone-500 mb-1">{t.profitCalc.profitResultLabel}</div>
          <div className={`text-2xl font-bold ${profit >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {profit >= 0 ? "+" : ""}{format(t.profitCalc.millionUnit, { value: profit })}
          </div>
          <div className="text-xs text-stone-500 mt-1">{profit >= 0 ? t.profitCalc.profitPositiveNote : t.profitCalc.profitNegativeNote}</div>
        </div>

        <div className={`rounded-2xl p-4 text-center ${actualCash >= 0 ? "bg-blue-50" : "bg-orange-50"}`}>
          <div className="text-xs font-medium text-stone-500 mb-1">{t.profitCalc.cashResultLabel}</div>
          <div className={`text-2xl font-bold ${actualCash >= 0 ? "text-blue-600" : "text-orange-600"}`}>
            {actualCash >= 0 ? "+" : ""}{format(t.profitCalc.millionUnit, { value: actualCash })}
          </div>
          <div className="text-xs text-stone-500 mt-1">{actualCash >= 0 ? t.profitCalc.cashPositiveNote : t.profitCalc.cashNegativeNote}</div>
        </div>
      </div>

      {profit > 0 && isShortOfCash && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-800 text-sm">
          <span className="font-bold">{t.profitCalc.shortOfCashTitle}</span>{" "}
          {format(t.profitCalc.shortOfCashBody, { profit, cash: actualCash, receivable: revenue - cashReceived })}
        </div>
      )}

      {!isShortOfCash && cashReceived === revenue && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-800 text-sm">
          {t.profitCalc.fullPaymentBody}
        </div>
      )}
    </div>
  );
}
