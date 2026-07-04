"use client";

import { useState } from "react";

export default function InteractiveSupplyDemand() {
  const [supply, setSupply] = useState(50);
  const [demand, setDemand] = useState(50);

  const balance = demand - supply;
  const priceLevel = Math.max(1, Math.min(10, 5 + Math.round(balance / 15)));

  const priceLabels: Record<number, { label: string; color: string; emoji: string }> = {
    1: { label: "Rất thấp", color: "text-blue-600", emoji: "📉" },
    2: { label: "Thấp", color: "text-blue-500", emoji: "↘️" },
    3: { label: "Hơi thấp", color: "text-cyan-600", emoji: "↘️" },
    4: { label: "Dưới trung bình", color: "text-teal-600", emoji: "⬇️" },
    5: { label: "Cân bằng", color: "text-emerald-600", emoji: "⚖️" },
    6: { label: "Hơi cao", color: "text-yellow-600", emoji: "↗️" },
    7: { label: "Cao", color: "text-amber-600", emoji: "↗️" },
    8: { label: "Rất cao", color: "text-orange-600", emoji: "📈" },
    9: { label: "Tăng mạnh", color: "text-rose-500", emoji: "🚀" },
    10: { label: "Tăng vọt!", color: "text-rose-600", emoji: "🔥" },
  };

  const price = priceLabels[priceLevel];

  const getScenario = () => {
    if (balance > 30) return { text: "Cầu cao hơn cung rất nhiều → giá tăng mạnh. Người bán có lợi thế!", bg: "bg-rose-50 border-rose-200 text-rose-800" };
    if (balance > 10) return { text: "Cầu nhỉnh hơn cung → giá tăng nhẹ. Thị trường nghiêng về phía người bán.", bg: "bg-orange-50 border-orange-200 text-orange-800" };
    if (balance < -30) return { text: "Cung cao hơn cầu rất nhiều → giá giảm mạnh. Người mua có lợi thế!", bg: "bg-blue-50 border-blue-200 text-blue-800" };
    if (balance < -10) return { text: "Cung nhỉnh hơn cầu → giá giảm nhẹ. Thị trường nghiêng về phía người mua.", bg: "bg-cyan-50 border-cyan-200 text-cyan-800" };
    return { text: "Cung = Cầu → giá ổn định. Thị trường cân bằng ⚖️", bg: "bg-emerald-50 border-emerald-200 text-emerald-800" };
  };

  const scenario = getScenario();

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-6">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1">⚖️ Cung cầu quyết định giá</h3>
        <p className="text-stone-500 text-sm">Kéo cung và cầu để xem giá thay đổi thế nào</p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700">📦 Nguồn cung (bao nhiêu hàng trên thị trường)</span>
            <span className="font-bold text-blue-600">{supply}</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={supply}
            onChange={(e) => setSupply(+e.target.value)}
            className="w-full"
            style={{ background: `linear-gradient(to right, #2563eb ${((supply - 10) / 90) * 100}%, #e5e7eb ${((supply - 10) / 90) * 100}%)` }}
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700">🛒 Nhu cầu mua (bao nhiêu người muốn mua)</span>
            <span className="font-bold text-rose-600">{demand}</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={demand}
            onChange={(e) => setDemand(+e.target.value)}
            className="w-full"
            style={{ background: `linear-gradient(to right, #ef4444 ${((demand - 10) / 90) * 100}%, #e5e7eb ${((demand - 10) / 90) * 100}%)` }}
          />
        </div>
      </div>

      {/* Visual Price Meter */}
      <div className="bg-stone-50 rounded-2xl p-6 text-center">
        <div className="text-stone-500 text-sm mb-2">Mức giá thị trường</div>
        <div className={`text-5xl font-bold ${price.color} mb-1`}>
          {price.emoji}
        </div>
        <div className={`text-xl font-bold ${price.color}`}>{price.label}</div>

        {/* Bar indicator */}
        <div className="mt-4 flex items-center gap-1 justify-center">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className={`h-3 flex-1 rounded-full transition-all duration-300 ${
                i < priceLevel
                  ? i < 3
                    ? "bg-blue-400"
                    : i < 5
                    ? "bg-emerald-400"
                    : i < 7
                    ? "bg-amber-400"
                    : "bg-rose-500"
                  : "bg-stone-200"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-stone-400 mt-1">
          <span>Rẻ nhất</span>
          <span>Đắt nhất</span>
        </div>
      </div>

      <div className={`rounded-2xl p-4 border text-sm ${scenario.bg}`}>
        {scenario.text}
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <button
          onClick={() => { setSupply(20); setDemand(80); }}
          className="bg-rose-50 text-rose-700 rounded-xl py-2 px-3 font-medium hover:bg-rose-100 transition-colors"
        >
          🏠 Nhà Hà Nội<br /><span className="text-xs font-normal">Cung thấp, cầu cao</span>
        </button>
        <button
          onClick={() => { setSupply(80); setDemand(20); }}
          className="bg-blue-50 text-blue-700 rounded-xl py-2 px-3 font-medium hover:bg-blue-100 transition-colors"
        >
          ✈️ Vé bay COVID<br /><span className="text-xs font-normal">Cung cao, cầu thấp</span>
        </button>
        <button
          onClick={() => { setSupply(50); setDemand(50); }}
          className="bg-emerald-50 text-emerald-700 rounded-xl py-2 px-3 font-medium hover:bg-emerald-100 transition-colors"
        >
          ⚖️ Cân bằng<br /><span className="text-xs font-normal">Reset</span>
        </button>
      </div>
    </div>
  );
}
