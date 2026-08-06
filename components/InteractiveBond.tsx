"use client";

import { useState } from "react";
import FormulaBreakdown from "@/components/FormulaBreakdown";
import { priceBond } from "@/lib/bond-pricing";

/** Số thập phân kiểu Việt: dấu phẩy, và cắt đuôi ",0" cho gọn. */
function vn(value: number, digits = 1): string {
  return value.toFixed(digits).replace(".", ",").replace(/,0+$/, "");
}

export default function InteractiveBond() {
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
        <h3 className="font-bold text-stone-800 text-lg mb-1">🏛️ Lãi suất vs Giá trái phiếu</h3>
        <p className="text-stone-500 text-sm">
          Trái phiếu này trả lãi cố định <strong>{bondRate}%/năm</strong>. Kéo lãi suất thị trường để xem giá thay đổi.
        </p>
      </div>

      {/* Bond card */}
      <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-5 text-white">
        <div className="text-xs text-stone-500 mb-3">TRÁI PHIẾU CHÍNH PHỦ</div>
        <div className="flex justify-between items-start">
          <div>
            <div className="text-stone-300 text-sm">Mệnh giá</div>
            <div className="text-2xl font-bold">{faceValue} triệu</div>
          </div>
          <div className="text-right">
            <div className="text-stone-300 text-sm">Lãi coupon cố định</div>
            <div className="text-2xl font-bold text-emerald-400">{bondRate}%/năm</div>
          </div>
        </div>
        <div className="mt-3 text-stone-500 text-xs">Đáo hạn: {years} năm · Trả lãi hàng năm</div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-stone-700">Lãi suất thị trường hiện tại</span>
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
          <span>6.5% (bình thường)</span>
          <span>12%</span>
        </div>
      </div>

      {/* Price result */}
      <div className={`rounded-2xl p-5 text-center ${isPremium ? "bg-emerald-50" : "bg-rose-50"}`}>
        <div className="text-stone-500 text-sm mb-1">Giá thị trường của trái phiếu</div>
        <div className={`text-4xl font-bold mb-1 ${isPremium ? "text-emerald-600" : "text-rose-600"}`}>
          {vn(bondPrice)} triệu
        </div>
        <div className={`text-sm font-medium ${isPremium ? "text-emerald-700" : "text-rose-700"}`}>
          {isPremium
            ? `+${vn(priceDiff)} triệu so với mệnh giá ↑`
            : `${vn(priceDiff)} triệu so với mệnh giá ↓`}
        </div>
      </div>

      <FormulaBreakdown
        formula={`Giá = C × [1 − (1 + r)⁻ⁿ] ÷ r  +  F ÷ (1 + r)ⁿ

C = tiền lãi mỗi năm = F × coupon = ${faceValue} × ${vn(bondRate)}% = ${vn(coupon)} triệu
F = mệnh giá = ${faceValue} triệu
r = lãi suất thị trường = ${vn(marketRate)}%
n = số năm còn lại = ${years}`}
        steps={[
          {
            label: "Hệ số chiết khấu (1 + r)ⁿ",
            expression: `(1 + ${vn(marketRate)}%)^${years}`,
            value: vn(discountFactor, 4),
          },
          {
            label: "Hệ số annuity",
            expression: `[1 − 1 ÷ ${vn(discountFactor, 4)}] ÷ ${vn(marketRate)}%`,
            value: vn(annuityFactor, 4),
          },
          {
            label: "PV của các khoản lãi",
            expression: `${vn(coupon)} × ${vn(annuityFactor, 4)}`,
            value: `${vn(pvCoupons, 2)} triệu`,
          },
          {
            label: "PV của mệnh giá nhận lại",
            expression: `${faceValue} ÷ ${vn(discountFactor, 4)}`,
            value: `${vn(pvFace, 2)} triệu`,
          },
        ]}
        result={{ label: "Giá trái phiếu", value: `${vn(pvCoupons, 2)} + ${vn(pvFace, 2)} = ${vn(bondPrice, 2)} triệu` }}
        note={
          <>
            Đây là giá trị hiện tại của toàn bộ dòng tiền trái phiếu trả cho bạn: {years} khoản
            lãi {vn(coupon)} triệu, cộng {faceValue} triệu mệnh giá nhận lại ở năm thứ {years} -
            tất cả chiết khấu về hôm nay theo lãi suất thị trường. Công thức rút gọn{" "}
            <code>C ÷ r</code> chỉ đúng với trái phiếu vĩnh viễn, loại không bao giờ đáo hạn.
          </>
        }
      />

      {/* Explanation */}
      <div className="space-y-2">
        {marketRate < bondRate && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 text-sm">
            <strong>Lãi suất thị trường {marketRate}% &lt; Coupon {bondRate}%</strong>
            <br />Trái phiếu này hấp dẫn hơn mới phát hành → mọi người tranh mua → giá tăng lên {vn(bondPrice)} triệu (cao hơn mệnh giá).
          </div>
        )}
        {marketRate === bondRate && (
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-stone-700 text-sm">
            <strong>Lãi suất thị trường = Coupon {bondRate}%</strong>
            <br />Trái phiếu giao dịch đúng bằng mệnh giá. Đây là điểm cân bằng.
          </div>
        )}
        {marketRate > bondRate && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-rose-800 text-sm">
            <strong>Lãi suất thị trường {marketRate}% &gt; Coupon {bondRate}%</strong>
            <br />Trái phiếu mới phát hành lãi cao hơn → không ai muốn mua trái phiếu cũ với giá mệnh giá → phải giảm giá xuống {vn(bondPrice)} triệu để bù đắp.
          </div>
        )}
      </div>

      <div className="bg-amber-50 rounded-xl p-3 text-amber-800 text-xs">
        💡 <strong>Quy tắc vàng:</strong> Lãi suất tăng → Giá trái phiếu giảm. Lãi suất giảm → Giá trái phiếu tăng. Chúng luôn ngược chiều nhau!
      </div>
    </div>
  );
}
