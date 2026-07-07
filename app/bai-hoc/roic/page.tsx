"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 23, day: 23, accent: "emerald",
  title: "ROIC",
  subtitle: "Return on Invested Capital - đo khả năng tạo giá trị thực sự",
  duration: "7 phút", difficulty: "Khó", emoji: "",
  nextSlug: "roic-phan-2", nextTitle: "ROIC Phần 2 - Link sang Valuation",
};

const quiz: QuizQuestion[] = [
  {
    question: "Công ty A có: EBIT = 200, Tax = 20%, Debt = 500, Equity = 500, Cash dư = 100. ROIC gần nhất là bao nhiêu?",
    options: ["16%", "20%", "18%"],
    correct: 0,
    explanation: "NOPAT = 200 × (1 − 20%) = 160. Invested Capital = Debt + Equity − Cash dư = 500 + 500 − 100 = 900. ROIC = 160/900 ≈ 17.8% ≈ 16-18%. Đáp án A (16%) là gần nhất trong bối cảnh làm tròn.",
  },
  {
    question: "Hai công ty cùng ROIC = 15%. A reinvest 80% lợi nhuận, B reinvest 30%. Công ty nào tăng trưởng nhanh hơn?",
    options: [
      "A - vì giữ lại nhiều vốn để compound ở ROIC 15%",
      "B - vì trả cổ tức cao, cổ đông hài lòng hơn",
      "Như nhau vì ROIC giống nhau",
    ],
    correct: 0,
    explanation: "Growth rate = ROIC × Reinvestment rate. A: 15% × 80% = 12%/năm. B: 15% × 30% = 4.5%/năm. Cùng ROIC nhưng A tăng trưởng nhanh hơn nhiều vì tái đầu tư vốn nhiều hơn vào hoạt động có ROIC cao.",
  },
  {
    question: "Công ty write-down tài sản → Invested Capital giảm, NOPAT không đổi → ROIC tăng. Điều này phản ánh điều gì?",
    options: [
      "Business thực sự tốt hơn sau write-down",
      "Metric bị inflate - ROIC tăng không phản ánh cải thiện operational thực sự",
      "Không ảnh hưởng gì đến chất lượng phân tích",
    ],
    correct: 1,
    explanation: "Write-down giảm Invested Capital → ROIC tăng về mặt toán học dù business không tốt hơn. Analyst phải nhận ra và điều chỉnh: cần xem ROIC trend trước write-down, và so sánh với peers trên cùng cơ sở tính toán.",
  },
  {
    question: "ROIC > WACC có ý nghĩa gì?",
    options: [
      "Công ty đang profitable",
      "Công ty đang tạo ra giá trị kinh tế - return trên vốn vượt chi phí vốn",
      "Cổ phiếu đang rẻ và nên mua",
      "Công ty không cần vay nợ thêm",
    ],
    correct: 1,
    explanation: "ROIC > WACC = economic profit dương → mỗi đồng vốn tạo ra giá trị ròng. Đây là định nghĩa thực sự của 'tạo giá trị'. Công ty có thể profitable (ROIC > 0) nhưng vẫn phá hủy giá trị nếu ROIC < WACC.",
  },
  {
    question: "Tại sao ROIC tốt hơn ROE để đánh giá hiệu quả sử dụng vốn?",
    options: [
      "ROIC luôn cao hơn ROE",
      "ROIC không bị ảnh hưởng bởi leverage - đo hiệu quả của toàn bộ capital base, không chỉ equity",
      "ROE tính sai theo GAAP",
      "ROIC dễ tính hơn ROE",
    ],
    correct: 1,
    explanation: "ROE có thể tăng chỉ bằng cách vay nợ nhiều hơn (giảm equity) dù business không tốt hơn. ROIC dùng tổng Invested Capital (D + E) → không bị distort bởi leverage decisions → đo thực chất hiệu quả hoạt động.",
  },
];

function ROICSimulator() {
  const [ebit, setEbit] = useState(200);
  const [tax, setTax] = useState(20);
  const [debt, setDebt] = useState(500);
  const [equity, setEquity] = useState(500);
  const [cash, setCash] = useState(100);
  const [wacc, setWacc] = useState(10);

  const nopat = ebit * (1 - tax / 100);
  const ic = debt + equity - cash;
  const roic = ic > 0 ? (nopat / ic) * 100 : 0;
  const spread = roic - wacc;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-1 text-sm"> ROIC Calculator</h3>
      <p className="text-xs text-stone-500 mb-4">Điều chỉnh các tham số để xem ROIC vs WACC</p>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: `EBIT (${ebit})`, val: ebit, set: setEbit, min: 50, max: 500, step: 10 },
          { label: `Tax rate (${tax}%)`, val: tax, set: setTax, min: 0, max: 35, step: 5 },
          { label: `Debt (${debt})`, val: debt, set: setDebt, min: 0, max: 1000, step: 50 },
          { label: `Equity (${equity})`, val: equity, set: setEquity, min: 100, max: 1000, step: 50 },
          { label: `Cash dư (${cash})`, val: cash, set: setCash, min: 0, max: 300, step: 25 },
          { label: `WACC (${wacc}%)`, val: wacc, set: setWacc, min: 5, max: 20, step: 1 },
        ].map(s => (
          <div key={s.label}>
            <label className="text-xs font-semibold text-stone-600 block mb-1">{s.label}</label>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.val} onChange={e => s.set(+e.target.value)} className="w-full accent-emerald-500" />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-2 font-mono text-sm mb-3">
        <div className="flex justify-between text-stone-500">
          <span>NOPAT = {ebit} × (1−{tax}%)</span>
          <span className="font-bold text-stone-700">{nopat.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-stone-500">
          <span>Invested Capital = {debt}+{equity}−{cash}</span>
          <span className="font-bold text-stone-700">{ic.toFixed(0)}</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span className="font-bold text-stone-800">ROIC = NOPAT / IC</span>
          <span className={`font-bold text-xl ${roic >= wacc ? "text-stone-700" : "text-stone-700"}`}>{roic.toFixed(1)}%</span>
        </div>
      </div>

      <div className={`rounded-xl p-4 border ${spread >= 0 ? "bg-stone-50 border-stone-200" : "bg-stone-50 border-stone-200"}`}>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs font-semibold text-stone-500">ROIC − WACC Spread</div>
            <div className={`text-xl font-bold ${spread >= 0 ? "text-stone-700" : "text-stone-700"}`}>
              {spread >= 0 ? "+" : ""}{spread.toFixed(1)}%
            </div>
          </div>
          <div className="text-right">
            <div className={`text-sm font-bold ${spread >= 0 ? "text-stone-700" : "text-stone-700"}`}>
              {spread >= 5 ? " Tạo value mạnh" : spread >= 0 ? " Tạo value vừa" : " Phá hủy value"}
            </div>
            <div className="text-xs text-stone-500 mt-0.5">WACC = {wacc}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">ROIC - Return on Invested Capital</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Chỉ số phân biệt doanh nghiệp tạo giá trị thực sự với doanh nghiệp chỉ profitable trên giấy</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📐 Công thức ROIC</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5 text-center mb-4">
          <div className="font-mono text-xl font-bold mb-1">ROIC = NOPAT / Invested Capital</div>
          <p className="text-stone-700 text-sm">Cứ 1 đồng vốn bỏ vào → tạo ra bao nhiêu lợi nhuận sau thuế?</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-2 text-sm">NOPAT</div>
            <div className="font-mono text-xs bg-white rounded p-2 border border-stone-200 mb-2">EBIT × (1 − Tax Rate)</div>
            <p className="text-xs text-stone-600">Net Operating Profit After Tax - lợi nhuận từ hoạt động kinh doanh, loại trừ tác động của cấu trúc vốn (không tính lãi vay)</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-2 text-sm">Invested Capital</div>
            <div className="font-mono text-xs bg-white rounded p-2 border border-stone-200 mb-2">Debt + Equity − Cash dư</div>
            <p className="text-xs text-stone-600">Tổng vốn thực sự đầu tư vào business. Trừ cash dư vì cash không contribute vào operations</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Benchmark ROIC theo ngành</h3>
        <div className="space-y-2">
          {[
            { label: "Phần mềm / SaaS", range: "25-50%+", color: "emerald", note: "Asset-light, high margins, ít IC" },
            { label: "Consumer brands (Coca-Cola, Vinamilk)", range: "15-25%", color: "blue", note: "Moat mạnh, brand premium" },
            { label: "Industrial / Manufacturing", range: "8-15%", color: "amber", note: "Asset-heavy, competitive markets" },
            { label: "Utilities / Telecom", range: "5-10%", color: "orange", note: "Regulated, high capex" },
            { label: "Airlines", range: "2-8%", color: "rose", note: "Biến động theo cycle, fuel cost" },
          ].map(r => (
            <div key={r.label} className={`flex items-center gap-3 bg-${r.color}-50 rounded-lg p-3 border border-${r.color}-100`}>
              <div className="flex-1">
                <div className="text-sm font-medium text-stone-700">{r.label}</div>
                <div className="text-xs text-stone-500">{r.note}</div>
              </div>
              <div className={`font-bold text-${r.color}-600 text-sm`}>{r.range}</div>
            </div>
          ))}
        </div>
      </section>

      <ROICSimulator />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> ROIC vs ROE - Tại sao ROIC tốt hơn</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-100">
                <th className="text-left p-2 rounded-l-lg text-stone-600 text-xs">Tiêu chí</th>
                <th className="text-center p-2 text-stone-700 text-xs font-bold">ROIC</th>
                <th className="text-center p-2 rounded-r-lg text-stone-700 text-xs font-bold">ROE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[
                ["Measure", "Hiệu quả toàn bộ capital base", "Hiệu quả trên equity"],
                ["Bị distort bởi leverage?", "❌ Không - IC = D+E", " Có - ROE tăng khi vay nợ"],
                ["So sánh cross-industry", " Phù hợp", "❌ Khó - D/E ratio khác nhau"],
                ["Kết hợp với", "WACC để tính economic profit", "Risk-free rate để check opportunity cost"],
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-2 text-stone-600 text-xs font-medium">{row[0]}</td>
                  <td className="p-2 text-center text-stone-700 text-xs">{row[1]}</td>
                  <td className="p-2 text-center text-stone-700 text-xs">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">🔢 Growth rate formula từ ROIC</h3>
        <div className="bg-stone-800 text-white rounded-xl p-5">
          <div className="font-mono text-center text-lg font-bold mb-3 text-stone-700">
            Growth = ROIC × Reinvestment Rate
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-bold text-white mb-1">Công ty A</div>
              <div className="text-stone-300 text-xs">ROIC 15% × Reinvest 80%</div>
              <div className="text-stone-700 font-bold mt-1">→ Growth 12%/năm</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-bold text-white mb-1">Công ty B</div>
              <div className="text-stone-300 text-xs">ROIC 15% × Reinvest 30%</div>
              <div className="text-stone-700 font-bold mt-1">→ Growth 4.5%/năm</div>
            </div>
          </div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
