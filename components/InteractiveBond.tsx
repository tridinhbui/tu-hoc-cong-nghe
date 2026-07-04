"use client";

import { useState } from "react";

export default function InteractiveBond() {
  const [marketRate, setMarketRate] = useState(6);
  const bondRate = 5; // fixed coupon
  const faceValue = 100; // 100 triệu

  // Simple bond price approximation: price ≈ faceValue * bondRate / marketRate
  const bondPrice = Math.round((faceValue * bondRate) / marketRate);
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
        <div className="mt-3 text-stone-500 text-xs">Đáo hạn: 10 năm · Trả lãi hàng năm</div>
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
          {bondPrice} triệu
        </div>
        <div className={`text-sm font-medium ${isPremium ? "text-emerald-700" : "text-rose-700"}`}>
          {isPremium ? `+${priceDiff} triệu so với mệnh giá ↑` : `${priceDiff} triệu so với mệnh giá ↓`}
        </div>
      </div>

      {/* Explanation */}
      <div className="space-y-2">
        {marketRate < bondRate && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 text-sm">
            <strong>Lãi suất thị trường {marketRate}% &lt; Coupon {bondRate}%</strong>
            <br />Trái phiếu này hấp dẫn hơn mới phát hành → mọi người tranh mua → giá tăng lên {bondPrice} triệu (cao hơn mệnh giá).
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
            <br />Trái phiếu mới phát hành lãi cao hơn → không ai muốn mua trái phiếu cũ với giá mệnh giá → phải giảm giá xuống {bondPrice} triệu để bù đắp.
          </div>
        )}
      </div>

      <div className="bg-amber-50 rounded-xl p-3 text-amber-800 text-xs">
        💡 <strong>Quy tắc vàng:</strong> Lãi suất tăng → Giá trái phiếu giảm. Lãi suất giảm → Giá trái phiếu tăng. Chúng luôn ngược chiều nhau!
      </div>
    </div>
  );
}
