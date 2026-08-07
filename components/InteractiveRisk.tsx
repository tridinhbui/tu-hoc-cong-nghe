"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

// Đánh đổi rủi ro - lợi nhuận, widget cho các bài khai `interactiveType:
// "risk"`.
//
// Thứ widget này phải dạy được là điều mà một bảng số không dạy nổi: lợi
// nhuận kỳ vọng cao hơn KHÔNG có nghĩa là kết quả tốt hơn ở một lần cụ thể.
// Nên nó không hiện một con số kỳ vọng, nó hiện cả DẢI kết quả có thể xảy ra
// sau n năm - và người kéo thanh trượt thấy dải đó loe ra nhanh hơn nhiều so
// với phần giữa dịch lên.

function getProfiles(t: Dictionary) {
  return [
    { key: "safe", label: t.riskCalc.profileSafeLabel, ret: 5, vol: 1 },
    { key: "bond", label: t.riskCalc.profileBondLabel, ret: 7, vol: 6 },
    { key: "mixed", label: t.riskCalc.profileMixedLabel, ret: 9, vol: 12 },
    { key: "stock", label: t.riskCalc.profileStockLabel, ret: 11, vol: 20 },
    { key: "single", label: t.riskCalc.profileSingleLabel, ret: 12, vol: 38 },
  ] as const;
}

export default function InteractiveRisk() {
  const { t } = useI18n();
  const [index, setIndex] = useState(2);
  const [years, setYears] = useState(10);
  const profiles = useMemo(() => getProfiles(t), [t]);
  const profile = profiles[index];

  // Dải kết quả xấp xỉ bằng ±1 độ lệch chuẩn của lợi suất cộng dồn. Độ lệch
  // chuẩn nhiều năm co lại theo căn bậc hai của thời gian, còn phần giữa thì
  // tăng theo lãi kép - chính hai tốc độ khác nhau đó là bài học.
  const band = useMemo(() => {
    const mid = Math.pow(1 + profile.ret / 100, years);
    const spread = (profile.vol / 100) * Math.sqrt(years);
    return {
      mid,
      low: Math.max(0.05, mid * (1 - spread)),
      high: mid * (1 + spread),
    };
  }, [profile, years]);

  const money = (multiple: number) => format(t.riskCalc.moneyAmount, { amount: (100 * multiple).toFixed(0) });

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-6 dark:bg-stone-900 dark:border-stone-800">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1 dark:text-stone-100">
          {t.riskCalc.title}
        </h3>
        <p className="text-stone-500 text-sm dark:text-stone-400">
          {t.riskCalc.subtitle}
        </p>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-stone-700 dark:text-stone-300">{t.riskCalc.riskLevelLabel}</span>
          <span className="font-bold text-stone-800 dark:text-stone-100">{profile.label}</span>
        </div>
        <input
          type="range"
          min={0}
          max={profiles.length - 1}
          value={index}
          onChange={(e) => setIndex(+e.target.value)}
          className="w-full"
          aria-label={t.riskCalc.riskLevelAriaLabel}
        />
        <p className="mt-1 text-[11px] text-stone-400 dark:text-stone-500">
          {format(t.riskCalc.expectedReturnLine, { ret: profile.ret, vol: profile.vol })}
        </p>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-stone-700 dark:text-stone-300">{t.riskCalc.holdingYearsLabel}</span>
          <span className="font-bold text-stone-800 dark:text-stone-100">{format(t.riskCalc.holdingYearsValue, { years })}</span>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          value={years}
          onChange={(e) => setYears(+e.target.value)}
          className="w-full"
          aria-label={t.riskCalc.holdingYearsAriaLabel}
        />
      </div>

      <div className="rounded-2xl bg-stone-50 p-4 dark:bg-stone-800/60">
        <p className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          {t.riskCalc.rangeTitle}
        </p>
        <div className="mt-3 flex items-end justify-between gap-2 text-center">
          <div className="flex-1">
            <p className="text-[11px] text-stone-500 dark:text-stone-400">{t.riskCalc.worstCaseLabel}</p>
            <p className="text-base font-extrabold text-rose-600 dark:text-rose-400">{money(band.low)}</p>
          </div>
          <div className="flex-1">
            <p className="text-[11px] text-stone-500 dark:text-stone-400">{t.riskCalc.midCaseLabel}</p>
            <p className="text-lg font-extrabold text-stone-900 dark:text-stone-100">{money(band.mid)}</p>
          </div>
          <div className="flex-1">
            <p className="text-[11px] text-stone-500 dark:text-stone-400">{t.riskCalc.bestCaseLabel}</p>
            <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
              {money(band.high)}
            </p>
          </div>
        </div>
        {/* Dải vẽ theo thang log: nếu vẽ tuyến tính thì kịch bản tốt của mức
            rủi ro cao nhất đẩy mọi cột khác bẹp xuống và không so được nữa. */}
        <div className="relative mt-4 h-3 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
          <div
            className="absolute inset-y-0 rounded-full bg-gradient-to-r from-rose-400 via-stone-400 to-emerald-400"
            style={{
              left: `${Math.min(90, (Math.log(band.low) / Math.log(12)) * 100)}%`,
              right: `${Math.max(0, 100 - (Math.log(band.high) / Math.log(12)) * 100)}%`,
            }}
          />
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
        {t.riskCalc.footerText}
      </p>
    </div>
  );
}
