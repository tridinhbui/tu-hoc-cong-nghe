"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  // Id tổng hợp, KHÔNG phải id trong corpus. Trang này chưa có bài tương ứng
  // trong lib/lessons.ts nên không có id thật để ghi vào, còn id cũ (11) là id
  // của một bài Chặng 3 CÓ THẬT - nên tiến độ, XP, ghi chú và highlight của
  // trang này đều đổ sang bài đó. Xem lib/__tests__/bespoke-lesson-ids.test.ts.
  id: 9009, slug: "fair-value", day: 11, accent: "cyan",
  title: "Fair Value là gì?",
  subtitle: "3 cách tiếp cận để định giá bất kỳ tài sản nào",
  duration: "8 phút", difficulty: "Khó", emoji: "⚖️",
  nextSlug: "danh-gia-deal-dau-tu", nextTitle: "Đánh Giá Deal Đầu Tư",
};

const quiz: QuizQuestion[] = [
  {
    question: "Income Approach (DCF) phù hợp nhất khi nào?",
    options: [
      "Công ty mới thành lập, chưa có dòng tiền nào để chiết khấu",
      "Dòng tiền ổn định và dự báo được",
      "Khi muốn biết giá thị trường hiện tại",
      "Khi công ty có nhiều tài sản hữu hình",
    ],
    correct: 1,
    explanation: "DCF hoạt động tốt nhất với doanh nghiệp có dòng tiền ổn định, dự báo được. Với startup chưa có doanh thu, DCF rất nhạy cảm với giả định và ít đáng tin cậy.",
  },
  {
    question: "EV/EBITDA của công ty A là 12x. Ngành trung bình là 10x. Điều này ngụ ý gì?",
    options: [
      "Công ty A đang rẻ hơn ngành",
      "Thị trường đang trả giá cao hơn cho công ty A",
      "Công ty A có EBITDA cao hơn",
      "Không so được, vì EV/EBITDA đổi theo cấu trúc vốn của từng bên",
    ],
    correct: 1,
    explanation: "EV/EBITDA cao hơn ngành = thị trường đang định giá premium. Justified nếu growth nhanh hơn, moat tốt hơn, margin cao hơn. Không justified = overvalued.",
  },
  {
    question: "Football field chart trong M&A dùng để làm gì?",
    options: [
      "Phân tích thị phần của doanh nghiệp",
      "Gom kết quả nhiều phương pháp thành một dải giá",
      "Dự báo doanh thu tương lai theo từng kịch bản tăng trưởng",
      "So sánh biên lợi nhuận với đối thủ",
    ],
    correct: 1,
    explanation: "Football field chart = horizontal bar chart hiển thị implied valuation range từ DCF, Comps, Precedent Transactions, 52-week range... Banker dùng để pitch giá deal.",
  },
  {
    question: "Precedent Transactions approach cho ra giá trị thường cao hơn Trading Comps vì:",
    options: [
      "Số liệu giao dịch thật nên đáng tin hơn giá niêm yết",
      "Nó đã gồm phần trả thêm để mua đứt",
      "Chiết khấu rủi ro thấp hơn vì thương vụ đã hoàn tất",
      "Các bên trong thương vụ cùng ngành nên so sát hơn",
    ],
    correct: 1,
    explanation: "Acquisition premium thường 20-40% trên giá thị trường. Precedent transactions capture premium này → implied value cao hơn trading comps (giá standalone).",
  },
  {
    question: "Khi nào nên dùng Asset-Based approach (giá trị tài sản ròng)?",
    options: [
      "Với doanh nghiệp công nghệ tăng trưởng cao",
      "Với công ty holding, BĐS, hoặc khi thanh lý (liquidation)",
      "Với mọi loại doanh nghiệp để kiểm tra chéo",
      "Khi không có số liệu tài chính nào đáng tin",
    ],
    correct: 1,
    explanation: "Asset-based phù hợp: công ty holding (giá trị = portfolio assets), BĐS, công ty đang thanh lý. Không phù hợp với doanh nghiệp có nhiều intangible assets (brand, IP, team).",
  },
];

function ValuationFootballField() {
  const [scenario, setScenario] = useState<"base" | "bull" | "bear">("base");

  const scenarios = {
    base: { dcf: [80, 120], comps: [90, 110], precedent: [100, 130], label: "Base Case" },
    bull: { dcf: [110, 160], comps: [105, 130], precedent: [120, 160], label: "Bull Case" },
    bear: { dcf: [50, 80], comps: [60, 85], precedent: [70, 100], label: "Bear Case" },
  };

  const s = scenarios[scenario];
  const min = 40, max = 180;
  const toPercent = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/30 dark:to-teal-950/20 rounded-2xl p-5 border border-cyan-200 dark:border-cyan-900/60 my-6">
      <h3 className="font-bold text-cyan-900 dark:text-cyan-200 mb-4 text-sm">⚽ Football Field Valuation Chart</h3>
      <div className="flex gap-2 mb-5">
        {(["base", "bull", "bear"] as const).map(s => (
          <button key={s} onClick={() => setScenario(s)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${scenario === s ? "bg-cyan-600 text-white" : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800"}`}>
            {s === "base" ? " Base" : s === "bull" ? "🐂 Bull" : "🐻 Bear"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {[
          { label: "DCF", range: s.dcf, color: "#06b6d4" },
          { label: "Trading Comps", range: s.comps, color: "#0891b2" },
          { label: "Precedent Tx", range: s.precedent, color: "#0e7490" },
        ].map(item => (
          <div key={item.label}>
            <div className="flex justify-between text-xs text-stone-600 dark:text-stone-400 mb-1">
              <span className="font-semibold">{item.label}</span>
              <span>{item.range[0]}–{item.range[1]} nghìn tỷ</span>
            </div>
            <div className="h-6 bg-stone-100 dark:bg-stone-800 rounded-lg relative overflow-hidden">
              <div className="absolute h-full rounded-lg transition-all duration-500"
                style={{
                  left: `${toPercent(item.range[0])}%`,
                  width: `${toPercent(item.range[1]) - toPercent(item.range[0])}%`,
                  background: item.color,
                  opacity: 0.8,
                }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-stone-500 dark:text-stone-400 mt-2 px-1">
        <span>40</span><span>80</span><span>120</span><span>160</span><span>180</span>
      </div>
      <p className="text-xs text-stone-600 dark:text-stone-400 text-center mt-2">{s.label}: giá trị mục tiêu trong nghìn tỷ VNĐ</p>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Fair Value - 3 Cách Định Giá</h2>
      <p className="text-stone-600 dark:text-stone-400 text-sm mb-6 italic">Không có con số định giá "đúng" - chỉ có giả định tốt và giả định tệ</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3"> Fair Value là gì?</h3>
        <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
          Fair Value = giá mà một tài sản sẽ được giao dịch giữa hai bên hiểu biết, sẵn lòng và không bị ép buộc. Trong thực tế, định giá là <strong>nghệ thuật</strong> nhiều hơn khoa học - kết quả phụ thuộc vào giả định.
        </p>

        <div className="grid grid-cols-1 gap-4">
          {[
            {
              num: "01", title: "Income Approach", method: "DCF",
              desc: "Chiết khấu tất cả dòng tiền tương lai về hiện tại. Phản ánh intrinsic value.",
              pros: "Fundamental, không phụ thuộc thị trường", cons: "Rất nhạy cảm với discount rate và terminal value",
            },
            {
              num: "02", title: "Market Approach", method: "Trading Comps / Precedent Tx",
              desc: "So sánh với doanh nghiệp tương đương đang giao dịch hoặc đã được mua lại.",
              pros: "Reflect thực tế thị trường, dễ justify", cons: "Cần tìm được peer group thực sự tương đồng",
            },
            {
              num: "03", title: "Asset Approach", method: "NAV / Book Value",
              desc: "Giá trị = tổng tài sản trừ tổng nợ. Phù hợp với holding company, BĐS.",
              pros: "Rõ ràng, dựa trên số liệu thực", cons: "Bỏ qua earning power và intangible assets",
            },
          ].map(a => (
            <div key={a.num} className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-5 border border-emerald-200 dark:border-emerald-900/50">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-200 dark:bg-emerald-900/60 px-2 py-1 rounded-full">{a.num}</span>
                <div>
                  <div className="font-bold text-stone-800 dark:text-stone-100">{a.title}</div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">{a.method}</div>
                </div>
              </div>
              <p className="text-stone-700 dark:text-stone-300 text-sm mb-3">{a.desc}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-2 text-stone-700 dark:text-stone-300"><span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ </span>{a.pros}</div>
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-2 text-stone-700 dark:text-stone-300"><span className="text-rose-600 dark:text-rose-400 font-bold">✗ </span>{a.cons}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ValuationFootballField />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3"> Multiples phổ biến nhất</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-100 dark:bg-stone-800">
                <th className="text-left p-2 rounded-l-lg font-semibold text-stone-700 dark:text-stone-300">Multiple</th>
                <th className="text-left p-2 font-semibold text-stone-700 dark:text-stone-300">Công thức</th>
                <th className="text-left p-2 rounded-r-lg font-semibold text-stone-700 dark:text-stone-300">Dùng cho</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {[
                { m: "EV/EBITDA", f: "Enterprise Value / EBITDA", use: "Phổ biến nhất trong M&A" },
                { m: "P/E", f: "Price / EPS", use: "So sánh cổ phiếu ngành consumer" },
                { m: "EV/Revenue", f: "Enterprise Value / Revenue", use: "Startup, SaaS chưa có lợi nhuận" },
                { m: "P/B", f: "Price / Book Value", use: "Ngân hàng, BĐS" },
              ].map(r => (
                <tr key={r.m}>
                  <td className="p-2 font-mono font-bold text-cyan-600 dark:text-cyan-400">{r.m}</td>
                  <td className="p-2 text-stone-700 dark:text-stone-300 text-xs">{r.f}</td>
                  <td className="p-2 text-stone-600 dark:text-stone-400 text-xs">{r.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">⚠️ Pitfall thường gặp trong định giá</h3>
        <div className="space-y-2">
          {[
            "Anchoring: bắt đầu từ giá thị trường hiện tại → bias kết quả DCF",
            "Dùng terminal growth rate quá cao (> GDP dài hạn) → inflate value",
            "Peer group không thực sự comparable - khác ngành, khác cycle",
            "Quên điều chỉnh cho illiquidity discount (công ty private)",
          ].map((p, i) => (
            <div key={i} className="flex gap-3 bg-stone-50 dark:bg-stone-900 rounded-lg p-3 text-sm border border-stone-200 dark:border-stone-800">
              <span className="text-amber-500">⚠️</span>
              <span className="text-stone-700 dark:text-stone-300">{p}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
