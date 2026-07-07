"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 31, day: 31, accent: "purple",
  title: "Income từ Affiliates & JV",
  subtitle: "Equity method (20-50%) vs Consolidation (>50%) - khi nào dùng cái nào?",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🤝",
  nextSlug: "interim-comprehensive-income", nextTitle: "Interim Statement & Comprehensive Income",
};

const quiz: QuizQuestion[] = [
  {
    question: "Công ty sở hữu 35% cổ phần JV. JV báo lãi 100M. Ghi nhận thế nào?",
    options: [
      "Ghi nhận 100M vào doanh thu",
      "Ghi nhận 35M vào Income Statement theo equity method",
      "Ghi nhận toàn bộ tài sản/nợ của JV vào Balance Sheet",
      "Không ghi nhận gì",
    ],
    correct: 1,
    explanation: "20-50% ownership → equity method. Ghi nhận 35% × 100M = 35M vào P&L dưới dòng 'Share of profits from associates'. Không consolidate toàn bộ tài sản/nợ - chỉ ghi share of profit.",
  },
  {
    question: "Tại sao khi mua >50% thì phải consolidate toàn bộ tài sản/nợ của công ty con?",
    options: [
      "Vì luật kế toán yêu cầu báo cáo nhiều hơn",
      "Vì sở hữu đa số → kiểm soát (control) → phải phản ánh toàn bộ resources và obligations trong BCTC hợp nhất",
      "Vì muốn doanh thu cao hơn",
      "Vì công ty con lỗ",
    ],
    correct: 1,
    explanation: "Nguyên tắc consolidation: khi có control (>50%), economic substance là bạn đang điều hành toàn bộ công ty con - mọi tài sản, nợ, doanh thu, chi phí đều thuộc về nhóm. Minority interest (phần của cổ đông thiểu số) được trình bày riêng trong equity.",
  },
  {
    question: "Sở hữu <20%: phương pháp kế toán phù hợp nhất là?",
    options: [
      "Equity method",
      "Full consolidation",
      "Financial investment - ghi nhận theo giá trị hợp lý (fair value) hoặc cost",
      "Proportionate consolidation",
    ],
    correct: 2,
    explanation: "<20% → không có significant influence → không dùng equity method. Xử lý như financial investment: mark-to-market (FVTPL/FVOCI) nếu có giá thị trường, hoặc cost method. Chỉ ghi nhận dividend khi nhận, không ghi share of profit.",
  },
  {
    question: "JV lỗ 200M, bạn sở hữu 40%. Tác động lên P&L của bạn?",
    options: [
      "+80M (ghi lãi vì nhận được tiền mặt)",
      "-80M (ghi nhận 40% × 200M = 80M lỗ theo equity method)",
      "-200M (ghi nhận toàn bộ lỗ)",
      "Không ảnh hưởng vì không consolidate",
    ],
    correct: 1,
    explanation: "Equity method: ghi nhận proportional share của cả lãi lẫn lỗ. 40% × (-200M) = -80M vào P&L. Đồng thời, carrying value của investment giảm 80M trên Balance Sheet. Nếu carrying value về 0 mà JV vẫn lỗ, không ghi nhận thêm (trừ khi có legal obligation).",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Income từ Affiliates & Joint Ventures</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Ba ngưỡng sở hữu, ba cách kế toán hoàn toàn khác nhau</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> 3 ngưỡng quan trọng</h3>
        <div className="space-y-3">
          {[
            {
              threshold: "< 20%",
              method: "Financial Investment",
              treatment: "Fair value (mark-to-market) hoặc cost. Chỉ ghi nhận dividend khi nhận.",
              color: "stone",
              badge: "Passive",
            },
            {
              threshold: "20% – 50%",
              method: "Equity Method",
              treatment: "Ghi nhận % lãi/lỗ vào P&L. Không consolidate tài sản/nợ. Investment trên BS được điều chỉnh.",
              color: "purple",
              badge: "Significant Influence",
            },
            {
              threshold: "> 50%",
              method: "Full Consolidation",
              treatment: "Hợp nhất toàn bộ tài sản, nợ, doanh thu, chi phí. Minority interest trình bày riêng.",
              color: "emerald",
              badge: "Control",
            },
          ].map(s => (
            <div key={s.threshold} className={`bg-${s.color === "stone" ? "stone" : s.color}-50 rounded-xl p-4 border border-${s.color === "stone" ? "stone" : s.color}-100`}>
              <div className="flex items-center gap-3 mb-2">
                <span className={`font-mono text-lg font-bold text-${s.color === "stone" ? "stone-700" : s.color + "-700"}`}>{s.threshold}</span>
                <span className={`text-xs font-bold bg-${s.color === "stone" ? "stone-200 text-stone-600" : s.color + "-100 text-" + s.color + "-700"} px-2 py-0.5 rounded`}>{s.badge}</span>
                <span className="font-bold text-stone-800 text-sm">{s.method}</span>
              </div>
              <p className="text-xs text-stone-600">{s.treatment}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📐 Equity Method - cách hoạt động</h3>
        <div className="bg-stone-800 text-white rounded-xl p-5 font-mono text-sm space-y-2">
          <div className="text-stone-500 text-xs mb-2">{ '// Ví dụ: Sở hữu 35% JV, JV profit = 100M USD' }</div>
          <div className="flex justify-between mb-1">
            <span className="text-stone-300">JV Net Income</span>
            <span className="text-stone-700">100M USD</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-stone-300">Ownership %</span>
            <span className="text-stone-700">35%</span>
          </div>
          <div className="flex justify-between border-t border-stone-600 pt-2">
            <span className="text-white font-bold">Share of Profit (P&L)</span>
            <span className="text-white font-bold">35M USD</span>
          </div>
          <div className="mt-3 pt-3 border-t border-stone-600 text-xs text-stone-500">
            <div>Balance Sheet: Investment carrying value +35M</div>
            <div>Khi nhận dividend từ JV: BS Investment -dividend amount</div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🏢 Ví dụ thực tế ở Việt Nam</h3>
        <div className="space-y-3">
          {[
            {
              company: "VNPT",
              jv: "Sở hữu 49% JV viễn thông ở Lào",
              method: "Equity Method",
              note: "Ghi nhận 49% lãi của JV vào 'Thu nhập từ công ty liên kết'",
            },
            {
              company: "Masan Group",
              jv: "Sở hữu 70% Masan Consumer",
              method: "Full Consolidation",
              note: "Consolidate toàn bộ doanh thu, chi phí, tài sản của Masan Consumer vào BCTC hợp nhất",
            },
            {
              company: "Vinamilk",
              jv: "Sở hữu 25% Angkor Dairy ở Campuchia",
              method: "Equity Method",
              note: "25% ownership → ghi nhận share of profit theo equity method",
            },
          ].map(e => (
            <div key={e.company} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-stone-700 text-sm">{e.company}</span>
                <span className="text-xs bg-stone-50 text-stone-700 px-2 py-0.5 rounded font-mono">{e.method}</span>
              </div>
              <div className="text-xs text-stone-500 mb-1">{e.jv}</div>
              <div className="text-xs text-stone-600">{e.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Ảnh hưởng lên các Financial Statements</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 text-white">
                <th className="p-2 text-left rounded-tl">Method</th>
                <th className="p-2 text-center">P&L</th>
                <th className="p-2 text-center">Balance Sheet</th>
                <th className="p-2 text-center rounded-tr">Cash Flow</th>
              </tr>
            </thead>
            <tbody>
              {[
                { m: "Financial Investment", pl: "Dividend only", bs: "Fair value", cf: "Dividend → CFI" },
                { m: "Equity Method", pl: "Share of profit/loss", bs: "Investment adjusted ± profit/div", cf: "Div → CFI; profit = non-cash" },
                { m: "Full Consolidation", pl: "All revenue/expense", bs: "All assets/liabilities + minority", cf: "All cash flows consolidated" },
              ].map((r, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                  <td className="p-2 font-semibold text-stone-700 border border-stone-100">{r.m}</td>
                  <td className="p-2 text-stone-600 border border-stone-100 text-center">{r.pl}</td>
                  <td className="p-2 text-stone-600 border border-stone-100 text-center">{r.bs}</td>
                  <td className="p-2 text-stone-600 border border-stone-100 text-center">{r.cf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Key reminders khi đọc BCTC</h3>
        <div className="space-y-2">
          {[
            "Tìm dòng 'Share of profit/(loss) of associates/JVs' trong P&L - đây là equity method income",
            "Dòng tiền từ equity method investment = dividend nhận được (trong CFI), KHÔNG phải share of profit",
            "Nếu JV lỗ liên tục → carrying value giảm về 0 → không ghi lỗ thêm (trừ khi guaranteed)",
            "Impairment test: nếu investment value bị suy giảm, ghi nhận impairment loss",
          ].map((n, i) => (
            <div key={i} className="flex gap-3 bg-stone-50 rounded-lg p-3 text-sm border border-stone-200">
              <span className="text-stone-700 font-bold flex-shrink-0">{i + 1}.</span>
              <span className="text-stone-700">{n}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
