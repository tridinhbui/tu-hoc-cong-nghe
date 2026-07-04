"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 29, day: 29, accent: "orange",
  title: "Cap Rate trong BĐS",
  subtitle: "Property Value = NOI / Cap Rate — định giá bất động sản thương mại",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🏗️",
  nextSlug: "operating-leverage", nextTitle: "Operating Leverage",
};

const quiz: QuizQuestion[] = [
  {
    question: "NOI = 3 triệu USD, Cap Rate = 6%. Property value gần nhất là?",
    options: ["18M USD", "30M USD", "50M USD", "60M USD"],
    correct: 2,
    explanation: "Property Value = NOI / Cap Rate = 3M / 6% = 3M / 0.06 = 50M USD. Công thức đơn giản nhưng powerful — thay đổi nhỏ trong cap rate tạo ra thay đổi lớn trong valuation.",
  },
  {
    question: "Khi interest rate tăng, điều gì thường xảy ra với cap rate?",
    options: ["Giảm mạnh", "Không đổi", "Tăng", "Về 0"],
    correct: 2,
    explanation: "Cap rate và interest rate có correlation dương. Khi lãi suất tăng: (1) borrowing cost tăng → investor đòi higher return, (2) risk-free rate tăng → spread để justify BĐS risk phải tăng → cap rate tăng → property value giảm.",
  },
  {
    question: "Asset nào thường có cap rate thấp hơn?",
    options: [
      "Prime office building ở trung tâm NYC/HCM",
      "Retail center ở khu vực có rủi ro cao",
      "Warehouse cũ vùng xa",
      "Hotel đang gặp khó khăn tài chính",
    ],
    correct: 0,
    explanation: "Cap rate thấp = tài sản đẹp, ổn định, vị trí prime. Prime office ở NYC cap rate có thể 4-5% vì demand cao, stable tenants, low vacancy risk. Hotel distressed có thể 9-12% vì rủi ro vận hành cao.",
  },
  {
    question: "Cap rate tăng từ 5% lên 7%, NOI không đổi ở 2M USD. Valuation thay đổi thế nào?",
    options: ["Tăng", "Không đổi", "Giảm", "Double"],
    correct: 2,
    explanation: "V₁ = 2M/5% = 40M. V₂ = 2M/7% = 28.6M. Giảm ~28% chỉ vì cap rate tăng 2 percentage points. Đây là lý do BĐS thương mại rất sensitive với interest rate environment.",
  },
];

function CapRateSimulator() {
  const [noi, setNoi] = useState(2);
  const [capRate, setCapRate] = useState(5);
  const [intRate, setIntRate] = useState(4);

  const value = (noi / (capRate / 100));
  const impliedCapRate = capRate + Math.max(0, (intRate - 3) * 0.5);
  const stressedValue = noi / (impliedCapRate / 100);
  const change = ((stressedValue - value) / value * 100);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-1 text-sm">🏗️ Cap Rate Valuation Simulator</h3>
      <p className="text-xs text-stone-500 mb-4">Xem interest rate ảnh hưởng đến property value thế nào</p>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">NOI ({noi}M USD/năm)</label>
          <input type="range" min={0.5} max={10} step={0.5} value={noi} onChange={e => setNoi(+e.target.value)} className="w-full accent-orange-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Cap Rate ({capRate}%)</label>
          <input type="range" min={3} max={12} step={0.5} value={capRate} onChange={e => setCapRate(+e.target.value)} className="w-full accent-orange-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Interest Rate ({intRate}%)</label>
          <input type="range" min={1} max={10} step={0.5} value={intRate} onChange={e => setIntRate(+e.target.value)} className="w-full accent-red-400" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-4 mb-3 font-mono text-sm space-y-2">
        <div className="flex justify-between text-stone-500">
          <span>NOI</span>
          <span>{noi}M USD/năm</span>
        </div>
        <div className="flex justify-between text-stone-500">
          <span>Cap Rate (current)</span>
          <span className="text-stone-700">{capRate}%</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span className="font-bold">Property Value</span>
          <span className="font-bold text-stone-700 text-lg">{value.toFixed(1)}M USD</span>
        </div>
      </div>

      {intRate > 3 && (
        <div className={`rounded-xl p-3 border ${change < -10 ? "bg-stone-50 border-stone-200" : "bg-stone-50 border-stone-200"}`}>
          <div className="text-xs font-semibold text-stone-600 mb-1">
             Lãi suất cao ({intRate}%) → Cap rate implied: {impliedCapRate.toFixed(1)}%
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone-600">Stressed Valuation:</span>
            <span className={`font-bold ${change < 0 ? "text-stone-700" : "text-stone-700"}`}>
              {stressedValue.toFixed(1)}M ({change.toFixed(1)}%)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Cap Rate — Định Giá BĐS Thương Mại</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Công thức đơn giản nhất, quan trọng nhất trong real estate valuation</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📐 Công thức cốt lõi</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5 text-center mb-4">
          <div className="font-mono text-xl font-bold mb-1">Property Value = NOI / Cap Rate</div>
          <p className="text-stone-700 text-sm">Net Operating Income chia cho Capitalization Rate</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-2 text-sm">NOI là gì?</div>
            <p className="text-xs text-stone-600 leading-relaxed">Net Operating Income = doanh thu cho thuê − chi phí vận hành (điện, nước, bảo trì, quản lý, bảo hiểm). <strong>Không</strong> trừ lãi vay và khấu hao.</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-2 text-sm">Cap Rate là gì?</div>
            <p className="text-xs text-stone-600 leading-relaxed">Tỷ suất lợi nhuận market yêu cầu cho loại tài sản đó. Giống lãi suất của BĐS — bỏ 100 đồng mua tòa nhà, thu lại bao nhiêu mỗi năm.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Ví dụ trực quan</h3>
        <div className="bg-white border border-stone-200 rounded-xl p-5 font-mono text-sm">
          <div className="text-stone-500 text-xs mb-3">{ '// Tòa nhà văn phòng — Ho Chi Minh City' }</div>
          <div className="flex justify-between mb-1"><span className="text-stone-600">NOI hàng năm</span><span className="text-stone-700">2.000.000 USD</span></div>
          <div className="flex justify-between mb-3"><span className="text-stone-600">Market cap rate</span><span className="text-stone-700">5%</span></div>
          <div className="flex justify-between border-t pt-2 text-base font-bold">
            <span>Property Value</span>
            <span className="text-stone-700">= 2M / 0.05 = 40M USD</span>
          </div>
        </div>
      </section>

      <CapRateSimulator />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Cap Rate theo loại tài sản</h3>
        <div className="space-y-2">
          {[
            { type: "Prime Office — CBD HCM/Hà Nội", range: "4–6%", risk: "Thấp", note: "Tenant chất lượng, stable income" },
            { type: "Industrial / Logistics", range: "5–7%", risk: "Trung bình thấp", note: "Demand cao từ e-commerce" },
            { type: "Retail Malls — vị trí tốt", range: "6–8%", risk: "Trung bình", note: "Phụ thuộc footfall và anchor tenants" },
            { type: "Hotel & Hospitality", range: "7–10%", risk: "Cao", note: "Seasonal, volatile income" },
            { type: "BĐS vùng xa, risk cao", range: "9–12%+", risk: "Cao", note: "Thanh khoản thấp, risk vacancy cao" },
          ].map(r => (
            <div key={r.type} className="flex items-center gap-3 bg-stone-50 rounded-lg p-3 border border-stone-200">
              <div className="flex-1">
                <div className="text-sm font-medium text-stone-700">{r.type}</div>
                <div className="text-xs text-stone-500">{r.note}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold text-stone-700 text-sm">{r.range}</div>
                <div className="text-xs text-stone-500">{r.risk}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">⚠️ Cap Rate và Interest Rate — mối quan hệ quan trọng</h3>
        <div className="space-y-2">
          {[
            "Khi Fed/NHNN tăng lãi suất → cap rate thường tăng theo → property value giảm",
            "Spread = Cap Rate − Risk-free Rate: investor cần minimum spread ~150-200bps để justify BĐS risk",
            "Nếu cap rate thấp hơn lãi suất vay → negative leverage → deal không có sense về financial",
            "2022-2023: US office BĐS mất 30-50% value khi cap rate tăng từ 4% lên 7% do Fed hike",
          ].map((n, i) => (
            <div key={i} className="flex gap-3 bg-stone-50 rounded-lg p-3 text-sm border border-stone-200">
              <span className="text-stone-700 flex-shrink-0">⚠️</span>
              <span className="text-stone-700">{n}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
