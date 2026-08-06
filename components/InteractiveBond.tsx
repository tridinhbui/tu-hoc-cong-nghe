"use client";

import { useState } from "react";
import FormulaBreakdown from "@/components/FormulaBreakdown";
import { priceBond } from "@/lib/bond-pricing";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

/** Số thập phân kiểu Việt: dấu phẩy, và cắt đuôi ",0" cho gọn. Dành cho
 *  locale vi; locale en dùng dấu chấm chuẩn qua `en()`. */
function vn(value: number, digits = 1): string {
  return value.toFixed(digits).replace(".", ",").replace(/,0+$/, "");
}

/** Số thập phân kiểu Anh: dấu chấm, cắt đuôi ".0". */
function en(value: number, digits = 1): string {
  return value.toFixed(digits).replace(/\.0+$/, "");
}

export default function InteractiveBond() {
  const { t, locale } = useI18n();
  const num = locale === "en" ? en : vn;
  const [marketRate, setMarketRate] = useState(6);
  const bondRate = 5; // coupon cố định, %/năm
  const faceValue = 100; // triệu
  const years = 10; // phải khớp với dòng "Đáo hạn" in trên thẻ bên dưới

  // Chiết khấu dòng tiền thật, không phải C/r.
  //
  // Bản cũ tính `faceValue * bondRate / marketRate` và gọi đó là "simple bond
  // price approximation". Nó không phải xấp xỉ của công thức này - nó là công
  // thức của một trái phiếu VĨNH VIỄN, loại không bao giờ đáo hạn. Đem áp cho
  // một trái phiếu ghi rõ "Đáo hạn: 10 năm" ngay trên thẻ thì ra 83,3 triệu
  // trong khi giá đúng là 92,6 - lệch gần 10 triệu, và lệch theo hướng làm bài
  // học phóng đại hẳn mức nhạy cảm của giá với lãi suất.
  //
  // Một người học nhắn lại hỏi "83tr tính trên công thức nào" và không ai trả
  // lời được từ màn hình, vì widget chỉ in ra con số. Đó là lý do phép tính
  // giờ hiện ra ở FormulaBreakdown bên dưới: một con số không giải thích được
  // thì sai bao lâu cũng không ai biết.
  const { coupon, discountFactor, annuityFactor, pvCoupons, pvFace, price: bondPrice } =
    priceBond(faceValue, bondRate, marketRate, years);
  const priceDiff = bondPrice - faceValue;
  const isPremium = bondPrice > faceValue;

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-6">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1">{t.bondCalc.title}</h3>
        <p className="text-stone-500 text-sm">
          {t.bondCalc.descPart1} <strong>{format(t.bondCalc.descCouponRate, { rate: bondRate })}</strong>. {t.bondCalc.descPart2}
        </p>
      </div>

      {/* Bond card */}
      <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-5 text-white">
        <div className="text-xs text-stone-500 mb-3">{t.bondCalc.cardLabel}</div>
        <div className="flex justify-between items-start">
          <div>
            <div className="text-stone-300 text-sm">{t.bondCalc.faceValueLabel}</div>
            <div className="text-2xl font-bold">{format(t.bondCalc.faceValueAmount, { amount: faceValue })}</div>
          </div>
          <div className="text-right">
            <div className="text-stone-300 text-sm">{t.bondCalc.couponLabel}</div>
            <div className="text-2xl font-bold text-emerald-400">{format(t.bondCalc.couponAmount, { rate: bondRate })}</div>
          </div>
        </div>
        <div className="mt-3 text-stone-500 text-xs">{format(t.bondCalc.maturityLine, { years })}</div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-stone-700">{t.bondCalc.marketRateLabel}</span>
          <span className="text-2xl font-bold text-stone-800">{marketRate}%</span>
        </div>
        <input
          type="range"
          min={1}
          max={12}
          step={0.5}
          value={marketRate}
          onChange={(e) => setMarketRate(+e.target.value)}
          className="w-full"
          style={{ background: `linear-gradient(to right, #059669 ${((marketRate - 1) / 11) * 100}%, #e5e7eb ${((marketRate - 1) / 11) * 100}%)` }}
        />
        <div className="flex justify-between text-xs text-stone-500 mt-1">
          <span>1%</span>
          <span>{t.bondCalc.sliderNormal}</span>
          <span>12%</span>
        </div>
      </div>

      {/* Price result */}
      <div className={`rounded-2xl p-5 text-center ${isPremium ? "bg-emerald-50" : "bg-rose-50"}`}>
        <div className="text-stone-500 text-sm mb-1">{t.bondCalc.priceLabel}</div>
        <div className={`text-4xl font-bold mb-1 ${isPremium ? "text-emerald-600" : "text-rose-600"}`}>
          {format(t.bondCalc.priceAmount, { amount: num(bondPrice) })}
        </div>
        <div className={`text-sm font-medium ${isPremium ? "text-emerald-700" : "text-rose-700"}`}>
          {isPremium
            ? format(t.bondCalc.priceAbovePar, { amount: num(priceDiff) })
            : format(t.bondCalc.priceBelowPar, { amount: num(priceDiff) })}
        </div>
      </div>

      <FormulaBreakdown
        formula={format(t.bondCalc.formula, {
          faceValue,
          couponRate: num(bondRate),
          coupon: num(coupon),
          marketRate: num(marketRate),
          years,
        })}
        steps={[
          {
            label: t.bondCalc.stepDiscountFactor,
            expression: `(1 + ${num(marketRate)}%)^${years}`,
            value: num(discountFactor, 4),
          },
          {
            label: t.bondCalc.stepAnnuityFactor,
            expression: `[1 − 1 ÷ ${num(discountFactor, 4)}] ÷ ${num(marketRate)}%`,
            value: num(annuityFactor, 4),
          },
          {
            label: t.bondCalc.stepPvCoupons,
            expression: `${num(coupon)} × ${num(annuityFactor, 4)}`,
            value: format(t.bondCalc.faceValueAmount, { amount: num(pvCoupons, 2) }),
          },
          {
            label: t.bondCalc.stepPvFace,
            expression: `${faceValue} ÷ ${num(discountFactor, 4)}`,
            value: format(t.bondCalc.faceValueAmount, { amount: num(pvFace, 2) }),
          },
        ]}
        result={{
          label: t.bondCalc.resultLabel,
          value: format(t.bondCalc.resultFormula, {
            pvCoupons: num(pvCoupons, 2),
            pvFace: num(pvFace, 2),
            price: num(bondPrice, 2),
          }),
        }}
        note={
          <>
            {format(t.bondCalc.noteText, { years, coupon: num(coupon), faceValue })}{" "}
            {/* i18n-ignore-start: formula symbol, not language text */}
            <code>C ÷ r</code>
            {/* i18n-ignore-end */} {t.bondCalc.noteTextEnd}
          </>
        }
      />

      {/* Explanation */}
      <div className="space-y-2">
        {marketRate < bondRate && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 text-sm">
            <strong>{format(t.bondCalc.belowParTitle, { market: marketRate, coupon: bondRate })}</strong>
            <br />{format(t.bondCalc.belowParBody, { price: num(bondPrice) })}
          </div>
        )}
        {marketRate === bondRate && (
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-stone-700 text-sm">
            <strong>{format(t.bondCalc.equalParTitle, { coupon: bondRate })}</strong>
            <br />{t.bondCalc.equalParBody}
          </div>
        )}
        {marketRate > bondRate && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-rose-800 text-sm">
            <strong>{format(t.bondCalc.abovePartTitle, { market: marketRate, coupon: bondRate })}</strong>
            <br />{format(t.bondCalc.abovePartBody, { price: num(bondPrice) })}
          </div>
        )}
      </div>

      <div className="bg-amber-50 rounded-xl p-3 text-amber-800 text-xs">
        💡 <strong>{t.bondCalc.goldenRule}</strong> {t.bondCalc.goldenRuleBody}
      </div>
    </div>
  );
}
