"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

// Máy tính tăng / pha loãng EPS, widget cho các bài khai `interactiveType:
// "accretion"`.
//
// Đây là phép tính đầu tiên của mọi thương vụ, và là chỗ quy tắc so P/E hiện
// ra thành số: bên mua có P/E cao hơn bên bán thì thương vụ toàn cổ phiếu
// làm tăng EPS, thấp hơn thì pha loãng. Kéo hai thanh P/E qua nhau rồi xem
// dấu đổi là hiểu quy tắc đó, thay vì học thuộc.
//
// Widget cố ý hiện thêm một dòng cảnh báo: EPS tăng KHÔNG đồng nghĩa thương
// vụ tạo giá trị. Bài học đó nằm ngay cạnh phép tính vì đây đúng là chỗ người
// mới nhầm nhiều nhất.

export function combinedEps(
  acquirerNetIncome: number,
  targetNetIncome: number,
  acquirerShares: number,
  newShares: number,
  afterTaxInterestLost: number
): number {
  const shares = acquirerShares + newShares;
  if (shares <= 0) return 0;
  return (acquirerNetIncome + targetNetIncome - afterTaxInterestLost) / shares;
}

export default function InteractiveAccretion() {
  const { t } = useI18n();
  const [acquirerPe, setAcquirerPe] = useState(18);
  const [targetPe, setTargetPe] = useState(12);
  const [cashShare, setCashShare] = useState(0);

  // Giữ quy mô cố định để người học chỉ nhìn MỘT biến đổi tại một thời điểm:
  // thêm một thanh trượt cho lợi nhuận nữa thì quy tắc P/E bị chìm đi.
  const acquirerNetIncome = 100;
  const targetNetIncome = 40;
  const acquirerShares = 100;
  const acquirerPrice = (acquirerPe * acquirerNetIncome) / acquirerShares;

  const result = useMemo(() => {
    const dealValue = targetPe * targetNetIncome;
    const cash = (dealValue * cashShare) / 100;
    const stock = dealValue - cash;
    const newShares = acquirerPrice > 0 ? stock / acquirerPrice : 0;
    // Tiền mặt dùng để mua thì mất phần lãi tiền gửi; lấy 4% trước thuế, thuế 20%.
    const interestLost = cash * 0.04 * 0.8;

    const standalone = acquirerNetIncome / acquirerShares;
    const combined = combinedEps(acquirerNetIncome, targetNetIncome, acquirerShares, newShares, interestLost);
    return {
      standalone,
      combined,
      change: standalone > 0 ? ((combined - standalone) / standalone) * 100 : 0,
      newShares,
      dealValue,
    };
  }, [acquirerPe, targetPe, cashShare, acquirerPrice]);

  const accretive = result.change > 0.05;
  const dilutive = result.change < -0.05;

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-5 dark:bg-stone-900 dark:border-stone-800">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1 dark:text-stone-100">
          {t.accretionCalc.title}
        </h3>
        <p className="text-stone-500 text-sm dark:text-stone-400">
          {t.accretionCalc.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700 dark:text-stone-300">{t.accretionCalc.acquirerPeLabel}</span>
            <span className="font-bold text-stone-800 dark:text-stone-100">{acquirerPe}x</span>
          </div>
          <input type="range" min={5} max={30} value={acquirerPe} onChange={(e) => setAcquirerPe(+e.target.value)} className="w-full" aria-label={t.accretionCalc.acquirerPeAria} />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700 dark:text-stone-300">{t.accretionCalc.targetPeLabel}</span>
            <span className="font-bold text-stone-800 dark:text-stone-100">{targetPe}x</span>
          </div>
          <input type="range" min={5} max={30} value={targetPe} onChange={(e) => setTargetPe(+e.target.value)} className="w-full" aria-label={t.accretionCalc.targetPeAria} />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700 dark:text-stone-300">{t.accretionCalc.cashShareLabel}</span>
            <span className="font-bold text-stone-800 dark:text-stone-100">{cashShare}%</span>
          </div>
          <input type="range" min={0} max={100} step={10} value={cashShare} onChange={(e) => setCashShare(+e.target.value)} className="w-full" aria-label={t.accretionCalc.cashShareAria} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-stone-50 p-3 dark:bg-stone-800/60">
          <p className="text-[11px] font-bold text-stone-500 dark:text-stone-400">{t.accretionCalc.epsBeforeLabel}</p>
          <p className="text-lg font-extrabold text-stone-900 dark:text-stone-100">{result.standalone.toFixed(2)}</p>
        </div>
        <div className="rounded-2xl bg-stone-50 p-3 dark:bg-stone-800/60">
          <p className="text-[11px] font-bold text-stone-500 dark:text-stone-400">{t.accretionCalc.epsAfterLabel}</p>
          <p className="text-lg font-extrabold text-stone-900 dark:text-stone-100">{result.combined.toFixed(2)}</p>
        </div>
        <div
          className={`rounded-2xl p-3 ${
            accretive ? "bg-emerald-50 dark:bg-emerald-950/30" : dilutive ? "bg-rose-50 dark:bg-rose-950/30" : "bg-stone-50 dark:bg-stone-800/60"
          }`}
        >
          <p className="text-[11px] font-bold text-stone-500 dark:text-stone-400">{t.accretionCalc.changeLabel}</p>
          <p className={`text-lg font-extrabold ${accretive ? "text-emerald-700 dark:text-emerald-300" : dilutive ? "text-rose-700 dark:text-rose-300" : "text-stone-900 dark:text-stone-100"}`}>
            {result.change >= 0 ? "+" : ""}
            {result.change.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-stone-50 p-4 dark:bg-stone-800/60">
        <p className="text-sm text-stone-700 dark:text-stone-200">
          {cashShare === 0 ? (
            format(t.accretionCalc.allStockPrefix, {
              acquirerPe,
              targetPe,
              comparison:
                acquirerPe > targetPe
                  ? t.accretionCalc.comparisonHigher
                  : acquirerPe < targetPe
                    ? t.accretionCalc.comparisonLower
                    : t.accretionCalc.comparisonEqual,
            })
          ) : (
            format(t.accretionCalc.cashDealNarrative, { cashShare, newShares: result.newShares.toFixed(1) })
          )}
        </p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
          {t.accretionCalc.footnote}
        </p>
      </div>
    </div>
  );
}
