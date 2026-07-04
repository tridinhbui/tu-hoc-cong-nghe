"use client";

import { useState } from "react";

export default function InteractiveInterestRate() {
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
    if (rate <= 4) return "Rất thấp — nền kinh tế cần kích thích";
    if (rate <= 7) return "Bình thường — cân bằng tốt";
    if (rate <= 10) return "Cao — đang kiểm soát lạm phát";
    return "Rất cao — vay vốn rất khó khăn";
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-6">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1">📊 Lãi suất thay đổi → mọi thứ thay đổi</h3>
        <p className="text-stone-500 text-sm">Kéo thanh lãi suất để xem tác động thực tế</p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="font-medium text-stone-700">Lãi suất ngân hàng</span>
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
        <div className="flex justify-between text-xs text-stone-400 mt-1">
          <span>1%</span>
          <span className="text-center font-medium text-stone-600">{getRateLabel()}</span>
          <span>15%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="bg-blue-50 rounded-2xl p-4 flex items-center gap-4">
          <div className="text-3xl">🏦</div>
          <div className="flex-1">
            <div className="font-semibold text-stone-800">Gửi tiết kiệm 500 triệu</div>
            <div className="text-stone-500 text-sm">Mỗi năm bạn nhận được</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-blue-600">+{savingsReturn} triệu</div>
            <div className="text-xs text-stone-400">/năm</div>
          </div>
        </div>

        <div className="bg-rose-50 rounded-2xl p-4 flex items-center gap-4">
          <div className="text-3xl">🏠</div>
          <div className="flex-1">
            <div className="font-semibold text-stone-800">Vay mua nhà 1 tỷ</div>
            <div className="text-stone-500 text-sm">Tiền lãi mỗi tháng phải trả thêm</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-rose-600">+{monthlyCost} triệu</div>
            <div className="text-xs text-stone-400">/tháng</div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl p-4 flex items-center gap-4">
          <div className="text-3xl">🏭</div>
          <div className="flex-1">
            <div className="font-semibold text-stone-800">Doanh nghiệp vay vốn</div>
            <div className="text-stone-500 text-sm">Lãi suất cao → chi phí vốn tăng</div>
          </div>
          <div className="text-right">
            <div className={`text-sm font-bold ${rate > 8 ? "text-rose-600" : "text-emerald-600"}`}>
              {rate > 10 ? "Rất khó vay ❌" : rate > 7 ? "Khó vay hơn ⚠️" : "Thuận lợi ✅"}
            </div>
          </div>
        </div>
      </div>

      {rate >= 10 && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-800 text-sm">
          <strong>Lãi suất {rate}% — rất cao!</strong> Doanh nghiệp khó vay, thị trường bất động sản đóng băng, nhưng người gửi tiết kiệm rất hài lòng.
        </div>
      )}

      {rate <= 3 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-blue-800 text-sm">
          <strong>Lãi suất {rate}% — rất thấp!</strong> Vay tiền rẻ, doanh nghiệp đầu tư nhiều hơn, nhưng người gửi tiết kiệm nhận được rất ít.
        </div>
      )}
    </div>
  );
}
