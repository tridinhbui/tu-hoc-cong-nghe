"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 28, day: 28, accent: "violet",
  title: "Enterprise Value",
  subtitle: "EV = Market Cap + Debt − Cash — giá thật khi mua cả công ty",
  duration: "6 phút", difficulty: "Dễ", emoji: "🏛️",
  nextSlug: "cap-rate", nextTitle: "Cap Rate trong BĐS",
};

const quiz: QuizQuestion[] = [
  {
    question: "Enterprise Value phản ánh điều gì chính xác hơn Market Cap?",
    options: [
      "Giá cổ phiếu hàng ngày",
      "Giá trị hoạt động của doanh nghiệp — bao gồm cả nợ phải gánh và tiền mặt nhận được",
      "Doanh thu năm gần nhất",
      "Lợi nhuận ròng",
    ],
    correct: 1,
    explanation: "Market Cap chỉ tính equity. EV = Market Cap + Net Debt — đây là giá thực tế phải trả nếu muốn mua toàn bộ doanh nghiệp (phải trả cho cổ đông + trả nợ thay cho họ, nhưng nhận lại tiền mặt trong công ty).",
  },
  {
    question: "Nếu cash tăng mạnh còn mọi thứ khác giữ nguyên, EV sẽ thay đổi thế nào?",
    options: ["Tăng", "Giảm", "Không đổi", "Âm"],
    correct: 1,
    explanation: "EV = Market Cap + Debt − Cash. Cash tăng → trừ đi nhiều hơn → EV giảm. Ý nghĩa: nếu mua công ty, bạn nhận lại nhiều tiền mặt hơn → giá trị hoạt động thực tế thấp hơn.",
  },
  {
    question: "Công ty: Market Cap = 500, Debt = 150, Cash = 50. EV bằng bao nhiêu?",
    options: ["450", "500", "600", "550"],
    correct: 2,
    explanation: "EV = 500 + 150 − 50 = 600. Bạn phải trả 500 cho cổ đông, trả thêm 150 nợ, nhưng nhận lại 50 tiền mặt → tổng chi = 600.",
  },
  {
    question: "Vì sao tài chính dùng EV/EBITDA thay vì P/E để so sánh doanh nghiệp?",
    options: [
      "EBITDA phản ánh hoạt động kinh doanh tốt hơn, EV phản ánh giá trị toàn công ty — loại bỏ ảnh hưởng của cấu trúc vốn và thuế",
      "Vì thuế bằng 0 với EV/EBITDA",
      "Vì công ty không có nợ",
      "Vì doanh thu không quan trọng",
    ],
    correct: 0,
    explanation: "EV/EBITDA: (1) EV capture cả debt+equity → so sánh được dù leverage khác nhau, (2) EBITDA loại trừ khấu hao, lãi vay, thuế → phản ánh operational performance. Giúp so sánh công ty có cấu trúc vốn khác nhau trên cùng cơ sở.",
  },
];

function EVCalculator() {
  const [mktCap, setMktCap] = useState(4200);
  const [debt, setDebt] = useState(85);
  const [cash, setCash] = useState(69);
  const [ebitda, setEbitda] = useState(130);

  const ev = mktCap + debt - cash;
  const evEbitda = ebitda > 0 ? ev / ebitda : 0;

  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-1 text-sm">🧮 EV Calculator (tỷ USD)</h3>
      <p className="text-xs text-stone-500 mb-4">Apple như ví dụ — điều chỉnh để thấy EV thay đổi</p>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: `Market Cap (${mktCap})`, val: mktCap, set: setMktCap, min: 100, max: 5000, step: 100 },
          { label: `Total Debt (${debt})`, val: debt, set: setDebt, min: 0, max: 500, step: 5 },
          { label: `Cash & Equivalents (${cash})`, val: cash, set: setCash, min: 0, max: 400, step: 5 },
          { label: `EBITDA (${ebitda})`, val: ebitda, set: setEbitda, min: 10, max: 300, step: 10 },
        ].map(s => (
          <div key={s.label}>
            <label className="text-xs font-semibold text-stone-600 block mb-1">{s.label}</label>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.val} onChange={e => s.set(+e.target.value)} className="w-full accent-violet-500" />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-2 font-mono text-sm mb-3">
        <div className="flex justify-between text-stone-500">
          <span>Market Cap (equity)</span>
          <span className="text-stone-700 font-bold">{mktCap}B</span>
        </div>
        <div className="flex justify-between text-stone-500">
          <span>+ Total Debt</span>
          <span className="text-stone-700 font-bold">+{debt}B</span>
        </div>
        <div className="flex justify-between text-stone-500">
          <span>− Cash & Equivalents</span>
          <span className="text-stone-700 font-bold">−{cash}B</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span className="font-bold text-stone-800">Enterprise Value</span>
          <span className="font-bold text-xl text-stone-700">{ev}B</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="bg-stone-50 rounded-xl p-3 border border-stone-200">
          <div className="text-xs text-stone-500 mb-0.5">EV/EBITDA</div>
          <div className="font-bold text-stone-700 text-lg">{evEbitda.toFixed(1)}x</div>
          <div className="text-xs text-stone-500">{evEbitda > 20 ? "Premium (growth)" : evEbitda > 10 ? "Typical" : "Value/distressed"}</div>
        </div>
        <div className="bg-stone-50 rounded-xl p-3 border border-stone-200">
          <div className="text-xs text-stone-500 mb-0.5">Net Debt</div>
          <div className="font-bold text-stone-700 text-lg">{debt - cash}B</div>
          <div className="text-xs text-stone-500">{debt - cash > 0 ? "Net leveraged" : "Net cash position"}</div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Enterprise Value (EV)</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Giá trị thật của toàn bộ doanh nghiệp — không chỉ là giá cổ phiếu</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🍎 Apple là ví dụ trực quan nhất</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Nếu muốn mua cả Apple, bạn không chỉ trả Market Cap cho cổ đông. Bạn còn phải <strong>gánh nợ</strong> của Apple — nhưng đổi lại <strong>nhận luôn tiền mặt</strong> trong công ty.
        </p>
        <div className="bg-stone-800 text-white rounded-xl p-5 font-mono text-sm">
          <div className="text-stone-500 text-xs mb-3">{ '// Apple EV (2024)' }</div>
          <div className="flex justify-between mb-1"><span className="text-white">Market Cap</span><span className="text-stone-700">4.200 tỷ USD</span></div>
          <div className="flex justify-between mb-1"><span className="text-stone-300">+ Total Debt</span><span className="text-stone-700">+85 tỷ USD</span></div>
          <div className="flex justify-between mb-3"><span className="text-stone-300">− Cash & Equivalents</span><span className="text-stone-700">−69 tỷ USD</span></div>
          <div className="flex justify-between border-t border-stone-600 pt-2 text-lg">
            <span className="font-bold">Enterprise Value</span>
            <span className="font-bold text-stone-700">≈ 4.216 tỷ USD</span>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📐 Công thức EV</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5 text-center mb-4">
          <div className="font-mono text-xl font-bold mb-1">EV = Market Cap + Net Debt</div>
          <div className="font-mono text-sm text-stone-700">= Equity Value + Debt − Cash</div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          {[
            { comp: "Market Cap", sign: "+", desc: "Giá trị equity — trả cho cổ đông", color: "violet" },
            { comp: "Debt", sign: "+", desc: "Nợ phải gánh thay cho bên bán", color: "rose" },
            { comp: "Cash", sign: "−", desc: "Tiền mặt nhận lại khi mua", color: "emerald" },
          ].map(c => (
            <div key={c.comp} className={`bg-${c.color}-50 rounded-xl p-3 border border-${c.color}-100`}>
              <div className={`text-2xl font-bold text-${c.color}-600 mb-1`}>{c.sign}</div>
              <div className="font-semibold text-stone-800 text-xs">{c.comp}</div>
              <div className="text-stone-500 text-xs mt-0.5">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <EVCalculator />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> EV/EBITDA — multiple phổ biến nhất trong M&A</h3>
        <div className="space-y-3">
          {[
            { why: "Tại sao EV thay vì Market Cap?", ans: "EV capture cả debt — 2 công ty cùng EBITDA nhưng leverage khác nhau sẽ có Market Cap khác nhau. EV cho cùng starting point." },
            { why: "Tại sao EBITDA thay vì Net Income?", ans: "EBITDA loại trừ D&A (non-cash), lãi vay (cấu trúc vốn), thuế (jurisdiction) → so sánh được operational performance thuần." },
            { why: "Benchmark EV/EBITDA theo ngành?", ans: "Tech/SaaS: 15-30x. Consumer/FMCG: 12-18x. Industrials: 8-12x. Utilities: 8-10x. BĐS: dùng EV/NOI hoặc Cap Rate." },
          ].map(s => (
            <div key={s.why} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="font-semibold text-stone-700 text-sm mb-1">Q: {s.why}</div>
              <div className="text-stone-600 text-sm">A: {s.ans}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Key reminders</h3>
        <div className="space-y-2">
          {[
            "EV = giá phải trả thực tế để sở hữu 100% business",
            "Net cash company (Cash > Debt): EV < Market Cap",
            "High leverage company (Debt >> Cash): EV > Market Cap",
            "Trong M&A: luôn dùng EV làm starting point, sau đó bridge sang Equity Value bằng cách trừ Net Debt",
          ].map((r, i) => (
            <div key={i} className="flex gap-3 bg-stone-50 rounded-lg p-3 text-sm border border-stone-200">
              <span className="text-stone-700 font-bold flex-shrink-0">{i + 1}.</span>
              <span className="text-stone-700">{r}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
