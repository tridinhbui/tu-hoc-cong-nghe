"use client";

import { useState } from "react";

// So sánh dư địa TRÊN GIẤY với dư địa THẬT, widget cho các bài khai
// `interactiveType: "profit-calc"`.
//
// Cùng phép trừ chạy hai lần trên hai con số khác nhau: công suất được cấp trừ
// phần đã chiếm cho ra con số trên bảng theo dõi, còn công suất thật sự dùng
// được ở giờ cao điểm trừ đúng phần ấy mới là con số quyết định hệ thống có vỡ
// hay không. Người kéo thanh trượt thấy hai kết quả tách dấu nhau - và đó là
// tình huống bảng báo còn chỗ trong khi hệ thống đã hết chỗ.
//
// Phép tính giữ nguyên từ bản trước (lợi nhuận so với tiền mặt); chỉ đổi tên
// các đại lượng và phần diễn giải.
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
    <div className="space-y-6 rounded-md border border-line-strong bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
      <div>
        <h3 className="mb-1 text-lg font-black tracking-tight text-ink-max">{t.profitCalc.title}</h3>
        <p className="text-sm text-ink-soft">{t.profitCalc.subtitle}</p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-ink-body">{t.profitCalc.revenueLabel}</span>
            <span className="font-bold tabular-nums text-ink-max">{format(t.profitCalc.millionUnit, { value: revenue })}</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={revenue}
            onChange={(e) => setRevenue(+e.target.value)}
            className="w-full"
            style={{ background: `linear-gradient(to right, #2961b8 ${((revenue - 10) / 90) * 100}%, #e5e7eb ${((revenue - 10) / 90) * 100}%)` }}
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-ink-body">{t.profitCalc.costLabel}</span>
            <span className="font-bold tabular-nums text-ink-max">{format(t.profitCalc.millionUnit, { value: cost })}</span>
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
            <span className="font-medium text-ink-body">{t.profitCalc.cashReceivedLabel}</span>
            <span className="font-bold tabular-nums text-ink-max">{format(t.profitCalc.millionUnit, { value: cashReceived })}</span>
          </div>
          <input
            type="range"
            min={0}
            max={revenue}
            value={cashReceived}
            onChange={(e) => setCashReceived(+e.target.value)}
            className="w-full"
            style={{ background: `linear-gradient(to right, #57534e ${(cashReceived / revenue) * 100}%, #e5e7eb ${(cashReceived / revenue) * 100}%)` }}
          />
          <p className="mt-1 text-xs text-ink-muted">
            {format(t.profitCalc.remainingReceivable, { amount: revenue - cashReceived })}
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`rounded-sm border bg-page p-4 text-center dark:bg-stone-950 ${profit >= 0 ? "border-line-strong" : "border-red-500 dark:border-red-700"}`}>
          <div className="mb-1 text-xs font-bold text-ink-muted">{t.profitCalc.profitResultLabel}</div>
          <div className={`text-2xl font-black tabular-nums ${profit >= 0 ? "text-accent-strong" : "text-red-600 dark:text-red-400"}`}>
            {profit >= 0 ? "+" : ""}{format(t.profitCalc.millionUnit, { value: profit })}
          </div>
          <div className="mt-1 text-xs text-ink-muted">{profit >= 0 ? t.profitCalc.profitPositiveNote : t.profitCalc.profitNegativeNote}</div>
        </div>

        <div className={`rounded-sm border bg-page p-4 text-center dark:bg-stone-950 ${actualCash >= 0 ? "border-line-strong" : "border-red-500 dark:border-red-700"}`}>
          <div className="mb-1 text-xs font-bold text-ink-muted">{t.profitCalc.cashResultLabel}</div>
          <div className={`text-2xl font-black tabular-nums ${actualCash >= 0 ? "text-accent-strong" : "text-red-600 dark:text-red-400"}`}>
            {actualCash >= 0 ? "+" : ""}{format(t.profitCalc.millionUnit, { value: actualCash })}
          </div>
          <div className="mt-1 text-xs text-ink-muted">{actualCash >= 0 ? t.profitCalc.cashPositiveNote : t.profitCalc.cashNegativeNote}</div>
        </div>
      </div>

      {profit > 0 && isShortOfCash && (
        <div className="border-l-2 border-amber-500 pl-4 text-sm text-ink-body">
          <span className="font-bold">{t.profitCalc.shortOfCashTitle}</span>{" "}
          {format(t.profitCalc.shortOfCashBody, { profit, cash: actualCash, receivable: revenue - cashReceived })}
        </div>
      )}

      {!isShortOfCash && cashReceived === revenue && (
        <div className="border-l-2 border-stone-950 pl-4 text-sm text-ink-body dark:border-stone-200">
          {t.profitCalc.fullPaymentBody}
        </div>
      )}
    </div>
  );
}
