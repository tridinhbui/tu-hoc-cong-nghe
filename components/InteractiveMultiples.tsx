"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";

// Máy tính ước lượng dung lượng theo dịch vụ tương đương, widget cho các bài
// khai `interactiveType: "multiples"`.
//
// Thứ widget này phải dạy được là độ NHẠY: cùng một dịch vụ, đổi hệ số so sánh
// trong khoảng mà các dịch vụ tương đương thật sự trải ra cũng đủ làm số máy
// cần chuẩn bị nhảy gấp rưỡi. Đọc "ước lượng so sánh phụ thuộc vào dịch vụ bạn
// chọn để so" thì gật đầu; kéo thanh trượt rồi thấy con số nhảy thì mới thấy vì
// sao việc chọn dịch vụ tham chiếu là phần khó nhất của cả phương pháp.
//
// Cũng là chỗ tốt nhất để tách tổng dung lượng khỏi dung lượng KHẢ DỤNG: cùng
// một lượng request, hai hệ thống khác nhau về phần dự phòng cho ra số máy mỗi
// vùng rất khác.

export default function InteractiveMultiples() {
  const { t, locale } = useI18n();
  const [peakLoad, setPeakLoad] = useState(200);   // nghìn request/phút ở giờ cao điểm
  const [factor, setFactor] = useState(8); // hệ số so với dịch vụ tham chiếu
  const [headroom, setHeadroom] = useState(300); // dung lượng giữ lại làm dự phòng
  const [regions, setRegions] = useState(50);    // số vùng/cụm triển khai

  const totalCapacity = peakLoad * factor;
  const usable = totalCapacity - headroom;
  const perRegion = regions > 0 ? usable / regions : 0;

  // Dải theo hệ số ±2 - khoảng mà một nhóm dịch vụ tương đương thật thường trải ra.
  const low = (peakLoad * Math.max(1, factor - 2) - headroom) / (regions || 1);
  const high = (peakLoad * (factor + 2) - headroom) / (regions || 1);

  return (
    <div className="space-y-5 rounded-md border border-stone-300 bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
      <div>
        <h3 className="mb-1 text-lg font-black tracking-tight text-ink-max">
          {t.multiplesCalc.title}
        </h3>
        <p className="text-sm text-ink-soft">
          {t.multiplesCalc.desc}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-ink-body">{t.multiplesCalc.peakLoadLabel}</span>
            <span className="font-bold tabular-nums text-ink-max">{format(t.multiplesCalc.peakLoadAmount, { amount: peakLoad })}</span>
          </div>
          <input type="range" min={50} max={600} step={10} value={peakLoad} onChange={(e) => setPeakLoad(+e.target.value)} className="w-full" aria-label={t.multiplesCalc.peakLoadLabel} />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-ink-body">{t.multiplesCalc.factorLabel}</span>
            <span className="font-bold tabular-nums text-accent-strong">{format(t.multiplesCalc.factorAmount, { amount: factor })}</span>
          </div>
          <input type="range" min={3} max={20} value={factor} onChange={(e) => setFactor(+e.target.value)} className="w-full" aria-label={t.multiplesCalc.factorAriaLabel} />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-ink-body">{t.multiplesCalc.headroomLabel}</span>
            <span className="font-bold tabular-nums text-ink-max">{format(t.multiplesCalc.headroomAmount, { amount: headroom })}</span>
          </div>
          <input type="range" min={-200} max={1200} step={20} value={headroom} onChange={(e) => setHeadroom(+e.target.value)} className="w-full" aria-label={t.multiplesCalc.headroomAriaLabel} />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-ink-body">{t.multiplesCalc.regionsLabel}</span>
            <span className="font-bold tabular-nums text-ink-max">{format(t.multiplesCalc.regionsAmount, { amount: regions })}</span>
          </div>
          <input type="range" min={10} max={200} step={5} value={regions} onChange={(e) => setRegions(+e.target.value)} className="w-full" aria-label={t.multiplesCalc.regionsAriaLabel} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-sm border border-stone-200 bg-[#fbfaf7] p-3 dark:border-stone-800 dark:bg-stone-950">
          <p className="text-[11px] font-bold text-ink-muted">{t.multiplesCalc.totalCapacityLabel}</p>
          <p className="text-lg font-black tabular-nums text-ink">{format(t.multiplesCalc.totalCapacityAmount, { amount: totalCapacity.toLocaleString(intlLocale(locale)) })}</p>
        </div>
        <div className="rounded-sm border border-stone-200 bg-[#fbfaf7] p-3 dark:border-stone-800 dark:bg-stone-950">
          <p className="text-[11px] font-bold text-ink-muted">{t.multiplesCalc.usableLabel}</p>
          <p className={`text-lg font-black tabular-nums ${usable < 0 ? "text-alert" : "text-ink"}`}>
            {format(t.multiplesCalc.usableAmount, { amount: usable.toLocaleString(intlLocale(locale)) })}
          </p>
        </div>
        <div className="rounded-sm border border-brand-600 bg-[#fbfaf7] p-3 dark:border-brand-400 dark:bg-stone-950">
          <p className="text-[11px] font-bold text-accent-strong">{t.multiplesCalc.perRegionLabel}</p>
          <p className="text-lg font-black tabular-nums text-accent-strong">
            {format(t.multiplesCalc.perRegionAmount, { amount: perRegion.toFixed(1) })}
          </p>
        </div>
      </div>

      <div className="border-l-2 border-stone-950 pl-4 dark:border-stone-200">
        <p className="text-sm text-ink-body">
          {t.multiplesCalc.rangePart1} {format(t.multiplesCalc.rangeFactorX, { factor: Math.max(1, factor - 2) })} {t.multiplesCalc.rangePart2}{" "}
          {format(t.multiplesCalc.rangeFactorX, { factor: factor + 2 })}, {t.multiplesCalc.rangePart3}{" "}
          <b>{format(t.multiplesCalc.rangeAmount, { amount: low.toFixed(1) })}</b> {t.multiplesCalc.rangePart4}{" "}
          <b>{format(t.multiplesCalc.rangeAmountThousand, { amount: high.toFixed(1) })}</b>.
        </p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-ink-muted">
          {t.multiplesCalc.footnote}
        </p>
      </div>
    </div>
  );
}
