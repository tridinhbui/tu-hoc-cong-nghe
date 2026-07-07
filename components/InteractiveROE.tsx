"use client";

import { useState } from "react";

export default function InteractiveROE() {
  const [profit, setProfit] = useState(20);
  const [equity, setEquity] = useState(100);

  const roe = equity > 0 ? Math.round((profit / equity) * 100 * 10) / 10 : 0;
  const bankRate = 6;
  const isWorthIt = roe > bankRate;

  const getRoeLevel = () => {
    if (roe < 5) return { label: "Yếu - kém hơn gửi ngân hàng", color: "text-rose-600", bg: "bg-rose-50" };
    if (roe < 10) return { label: "Trung bình - tương đương gửi tiết kiệm", color: "text-amber-600", bg: "bg-amber-50" };
    if (roe < 20) return { label: "Khá - tốt hơn gửi ngân hàng", color: "text-emerald-600", bg: "bg-emerald-50" };
    if (roe < 30) return { label: "Tốt - doanh nghiệp dùng vốn giỏi", color: "text-emerald-700", bg: "bg-emerald-50" };
    return { label: "Xuất sắc - hoặc đang dùng nhiều nợ", color: "text-blue-600", bg: "bg-blue-50" };
  };

  const level = getRoeLevel();

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-6">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1">📈 Tính ROE của doanh nghiệp</h3>
        <p className="text-stone-500 text-sm">ROE = Lợi nhuận ÷ Vốn chủ sở hữu × 100%</p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700">💰 Lợi nhuận ròng</span>
            <span className="font-bold text-emerald-600">{profit} triệu</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={profit}
            onChange={(e) => setProfit(+e.target.value)}
            className="w-full"
            style={{ background: `linear-gradient(to right, #059669 ${profit}%, #e5e7eb ${profit}%)` }}
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700">🏢 Vốn chủ sở hữu</span>
            <span className="font-bold text-blue-600">{equity} triệu</span>
          </div>
          <input
            type="range"
            min={10}
            max={500}
            step={10}
            value={equity}
            onChange={(e) => setEquity(+e.target.value)}
            className="w-full"
            style={{ background: `linear-gradient(to right, #2563eb ${((equity - 10) / 490) * 100}%, #e5e7eb ${((equity - 10) / 490) * 100}%)` }}
          />
        </div>
      </div>

      {/* ROE Display */}
      <div className={`rounded-2xl p-6 text-center ${level.bg}`}>
        <div className="text-stone-500 text-sm mb-1">ROE của doanh nghiệp này</div>
        <div className={`text-5xl font-bold ${level.color} mb-2`}>{roe}%</div>
        <div className={`font-semibold ${level.color}`}>{level.label}</div>
      </div>

      {/* Comparison */}
      <div className="space-y-3">
        <div className="text-sm font-semibold text-stone-700">So sánh với lựa chọn thay thế:</div>
        <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
          <div className="text-xl">🏦</div>
          <div className="flex-1">
            <div className="text-sm font-medium text-stone-700">Gửi ngân hàng</div>
            <div className="text-xs text-stone-500">An toàn, không cần làm gì</div>
          </div>
          <div className="font-bold text-stone-600">{bankRate}%</div>
        </div>

        <div className={`flex items-center gap-3 p-3 rounded-xl ${isWorthIt ? "bg-emerald-50" : "bg-rose-50"}`}>
          <div className="text-xl">📊</div>
          <div className="flex-1">
            <div className="text-sm font-medium text-stone-700">Đầu tư vào doanh nghiệp</div>
            <div className="text-xs text-stone-500">Rủi ro hơn, cần quản lý</div>
          </div>
          <div className={`font-bold ${isWorthIt ? "text-emerald-600" : "text-rose-600"}`}>{roe}%</div>
        </div>

        <div className={`text-sm p-3 rounded-xl font-medium ${isWorthIt ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"}`}>
          {isWorthIt
            ? `✅ ROE ${roe}% > Lãi ngân hàng ${bankRate}% → Đầu tư vào doanh nghiệp này hợp lý!`
            : `❌ ROE ${roe}% < Lãi ngân hàng ${bankRate}% → Gửi ngân hàng an toàn hơn và lợi hơn!`}
        </div>
      </div>

      <div className="text-xs text-stone-500 bg-stone-50 rounded-xl p-3">
        💡 <strong>Công thức:</strong> ROE = {profit} ÷ {equity} × 100 = {roe}%
        <br />Nghĩa là: cứ 100 đồng vốn cổ đông → tạo ra {roe} đồng lợi nhuận
      </div>
    </div>
  );
}
