"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 24, day: 24, accent: "teal",
  title: "ROIC Phần 2 - Link sang Valuation",
  subtitle: "Driver cốt lõi quyết định Free Cash Flow và Enterprise Value",
  duration: "6 phút", difficulty: "Khó", emoji: "🔗",
  nextSlug: "commodity", nextTitle: "Commodity",
};

const quiz: QuizQuestion[] = [
  {
    question: "Nếu ROIC tăng (giữ growth không đổi), điều gì xảy ra với FCF?",
    options: [
      "FCF tăng - cần ít vốn reinvest hơn để đạt cùng growth → cash còn lại nhiều hơn",
      "FCF giảm - ROIC cao đòi hỏi reinvest nhiều hơn",
      "FCF không đổi",
      "Không liên quan",
    ],
    correct: 0,
    explanation: "FCF = NOPAT − Reinvestment. Reinvestment = Growth / ROIC. ROIC tăng → Reinvestment giảm → FCF tăng. High-ROIC companies như software firms cần reinvest rất ít để tăng trưởng → FCF/Revenue ratio cao.",
  },
  {
    question: "Công ty nào có valuation cao hơn (cùng growth rate)?",
    options: [
      "Công ty A: ROIC 10%",
      "Công ty B: ROIC 20%",
      "Như nhau vì growth bằng nhau",
    ],
    correct: 1,
    explanation: "Cùng growth nhưng ROIC 20% cần reinvest ít hơn → FCF cao hơn → PV of FCF cao hơn → valuation cao hơn. Đây là lý do P/FCF và EV/EBITDA của high-ROIC businesses trading premium.",
  },
  {
    question: "Khi ROIC < WACC, điều gì xảy ra với shareholder value?",
    options: [
      "Tạo value vì doanh nghiệp vẫn profitable",
      "Không ảnh hưởng nếu revenue tăng",
      "Phá hủy value - tăng trưởng thực ra làm hại cổ đông",
      "Chỉ ảnh hưởng revenue, không ảnh hưởng value",
    ],
    correct: 2,
    explanation: "Nếu ROIC < WACC, mỗi đồng reinvested tạo ra return thấp hơn chi phí vốn → economic profit âm → tăng trưởng phá hủy value. Tốt hơn là trả cổ tức hoặc buyback thay vì mở rộng. Đây là lý do growth không phải luôn luôn tốt.",
  },
];

function ROICValuationLink() {
  const [roicA, setRoicA] = useState(10);
  const [roicB, setRoicB] = useState(20);
  const [growth, setGrowth] = useState(10);
  const [wacc] = useState(10);
  const nopat = 100;

  const reinvestA = growth / roicA;
  const reinvestB = growth / roicB;
  const fcfA = nopat * (1 - reinvestA);
  const fcfB = nopat * (1 - reinvestB);
  const termGrowth = 3;
  const pvA = fcfA / ((wacc - termGrowth) / 100);
  const pvB = fcfB / ((wacc - termGrowth) / 100);

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-1 text-sm">🔗 ROIC → FCF → Valuation</h3>
      <p className="text-xs text-stone-500 mb-4">So sánh 2 công ty cùng growth nhưng ROIC khác nhau</p>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">ROIC A ({roicA}%)</label>
          <input type="range" min={5} max={30} value={roicA} onChange={e => setRoicA(+e.target.value)} className="w-full accent-teal-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">ROIC B ({roicB}%)</label>
          <input type="range" min={5} max={40} value={roicB} onChange={e => setRoicB(+e.target.value)} className="w-full accent-emerald-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Growth ({growth}%)</label>
          <input type="range" min={2} max={20} value={growth} onChange={e => setGrowth(+e.target.value)} className="w-full accent-blue-400" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Công ty A", roic: roicA, ri: reinvestA, fcf: fcfA, pv: pvA, color: "orange" },
          { label: "Công ty B", roic: roicB, ri: reinvestB, fcf: fcfB, pv: pvB, color: "teal" },
        ].map(co => (
          <div key={co.label} className={`bg-${co.color}-50 rounded-xl p-4 border border-${co.color}-100`}>
            <div className={`font-bold text-${co.color}-700 mb-3`}>{co.label} (ROIC {co.roic}%)</div>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-stone-500">NOPAT</span>
                <span>{nopat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Reinvest rate</span>
                <span>{(co.ri * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Reinvestment</span>
                <span className="text-stone-700">−{(nopat * co.ri).toFixed(0)}</span>
              </div>
              <div className="flex justify-between border-t pt-1.5">
                <span className="font-bold text-stone-700">FCF</span>
                <span className={`font-bold ${co.fcf >= 0 ? `text-${co.color}-700` : "text-stone-700"}`}>{co.fcf.toFixed(0)}</span>
              </div>
              <div className="flex justify-between border-t pt-1.5">
                <span className="font-bold text-stone-700">Valuation (PV)</span>
                <span className={`font-bold text-lg ${co.pv > 0 ? `text-${co.color}-700` : "text-stone-700"}`}>
                  {co.pv > 0 ? co.pv.toFixed(0) : "N/A"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pvA > 0 && pvB > 0 && (
        <div className="mt-3 bg-white rounded-xl border border-stone-200 p-3 text-center text-sm">
          <span className="text-stone-600">Cùng growth {growth}%, ROIC cao hơn cho valuation </span>
          <span className="font-bold text-stone-700">{(pvB / pvA).toFixed(1)}× cao hơn</span>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">ROIC Phần 2 - Link sang Valuation</h2>
      <p className="text-stone-600 text-sm mb-6 italic">ROIC không chỉ là chỉ số hiệu quả - nó là driver cốt lõi của FCF và enterprise value</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Insight cốt lõi</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5 mb-4">
          <p className="text-lg font-bold text-center mb-2">
            Giá trị doanh nghiệp phụ thuộc vào khả năng tạo lợi nhuận trên vốn <em>so với</em> chi phí vốn
          </p>
          <p className="text-stone-700 text-sm text-center">ROIC vs WACC - đây là mối quan hệ cốt lõi nhất trong valuation</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { cond: "ROIC > WACC", label: "Tạo value ", desc: "Tăng trưởng làm tăng giá trị", color: "emerald" },
            { cond: "ROIC = WACC", label: "Trung hoà ➡️", desc: "Tăng trưởng không tạo thêm value", color: "amber" },
            { cond: "ROIC < WACC", label: "Phá hủy value ❌", desc: "Tăng trưởng làm giảm giá trị", color: "rose" },
          ].map(s => (
            <div key={s.cond} className={`bg-${s.color}-50 border border-${s.color}-100 rounded-xl p-3 text-center`}>
              <div className={`font-mono text-xs font-bold text-${s.color}-700 mb-1`}>{s.cond}</div>
              <div className={`font-bold text-sm text-${s.color}-700 mb-1`}>{s.label}</div>
              <div className="text-xs text-stone-500">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🔗 Link từ ROIC đến FCF đến Valuation</h3>
        <div className="space-y-3">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 text-sm mb-2">Bước 1: Reinvestment Rate từ ROIC và Growth</div>
            <div className="font-mono text-sm bg-white rounded p-3 border border-stone-200">
              Reinvestment Rate = Growth Rate / ROIC
            </div>
            <p className="text-xs text-stone-500 mt-2">ROIC 20%, growth 10% → cần reinvest 50% NOPAT. ROIC 10%, growth 10% → phải reinvest 100% NOPAT!</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 text-sm mb-2">Bước 2: FCF từ NOPAT và Reinvestment</div>
            <div className="font-mono text-sm bg-white rounded p-3 border border-stone-200">
              FCF = NOPAT × (1 − Reinvestment Rate)
            </div>
            <p className="text-xs text-stone-500 mt-2">High ROIC = high FCF margin. Đây là lý do software companies có FCF/Revenue 30-40% trong khi manufacturing chỉ 5-10%.</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 text-sm mb-2">Bước 3: Valuation từ FCF</div>
            <div className="font-mono text-sm bg-white rounded p-3 border border-stone-200">
              Value = FCF / (WACC − g)
            </div>
            <p className="text-xs text-stone-500 mt-2">FCF cao + ROIC cao → Valuation cao. Growth không create value nếu ROIC ≤ WACC - đây là điểm nhiều investor bỏ qua.</p>
          </div>
        </div>
      </section>

      <ROICValuationLink />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🏢 Case study: Tại sao Google/Microsoft trading premium?</h3>
        <div className="bg-stone-800 text-white rounded-xl p-5">
          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-stone-700 font-bold mb-1">Google (Alphabet)</div>
              <div className="text-stone-300 text-xs space-y-0.5">
                <div>ROIC: ~25-30%</div>
                <div>Reinvest rate thấp (asset-light)</div>
                <div>FCF margin: 20%+</div>
              </div>
              <div className="text-stone-700 font-bold mt-2">EV/EBITDA: 18-22x</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-stone-700 font-bold mb-1">Airlines trung bình</div>
              <div className="text-stone-300 text-xs space-y-0.5">
                <div>ROIC: ~5-8%</div>
                <div>Reinvest rate cao (fleet)</div>
                <div>FCF margin: 2-5%</div>
              </div>
              <div className="text-stone-700 font-bold mt-2">EV/EBITDA: 4-7x</div>
            </div>
          </div>
          <p className="text-stone-300 text-xs">
            Cùng growth rate, Google trading tại premium 3-4x so với airlines. Lý do: ROIC cao hơn → FCF cao hơn → per đồng vốn tạo ra nhiều value hơn.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Takeaway</h3>
        <div className="space-y-2">
          {[
            "Growth không tạo value nếu ROIC < WACC - phải reinvest nhiều hơn return tạo ra",
            "High ROIC → ít reinvestment cần → FCF cao → valuation premium",
            "ROIC > WACC spread là 'economic moat' indicator - công ty nào duy trì được lâu dài thì đáng định giá cao",
          ].map((t, i) => (
            <div key={i} className="flex gap-3 bg-stone-50 rounded-lg p-3 border border-stone-200 text-sm">
              <span className="text-stone-700 font-bold flex-shrink-0">{i + 1}.</span>
              <span className="text-stone-700">{t}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
