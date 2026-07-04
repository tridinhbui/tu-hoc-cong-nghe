"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 35, day: 35, accent: "blue",
  title: "Tesla Q1/2026 Cash Flow",
  subtitle: "Net Income 491M vs OCF 3.94B — tại sao chênh nhau nhiều vậy?",
  duration: "6 phút", difficulty: "Trung bình", emoji: "",
  nextSlug: "dupont-analysis", nextTitle: "DuPont Analysis",
};

const quiz: QuizQuestion[] = [
  {
    question: "Net Income giảm nhưng Operating Cash Flow tăng mạnh. Nguyên nhân hợp lý nhất là?",
    options: [
      "Công ty chắc chắn tăng trưởng mạnh",
      "Non-cash expenses (D&A, SBC) lớn hoặc working capital thay đổi thuận lợi",
      "Công ty sắp phá sản",
      "Doanh thu tăng mạnh bất ngờ",
    ],
    correct: 1,
    explanation: "OCF = Net Income + Non-cash items (D&A, SBC) ± Working Capital changes. Tesla Q1/2026: Net Income 491M → OCF 3.94B (8x!). Phần lớn đến từ D&A lớn (do CapEx intensive từ Gigafactories) và SBC cho nhân viên — cả hai không phải tiền mặt ra nhưng reduce Net Income.",
  },
  {
    question: "Hàng tồn kho tăng mạnh (2.26B USD) ảnh hưởng thế nào tới dòng tiền?",
    options: [
      "Tiền mặt tăng",
      "Không ảnh hưởng",
      "Tiền mặt giảm — phải bỏ tiền mua nguyên liệu/sản xuất nhưng chưa bán được",
      "Vốn chủ sở hữu giảm",
    ],
    correct: 2,
    explanation: "Tồn kho tăng = tiền mặt bị 'lock' trong kho. Tesla bỏ tiền mua materials, sản xuất xe, nhưng xe chưa được bán → Working Capital tăng → OCF giảm đi (2.26B USD 'hút' vào inventory). Tồn kho cao có thể do demand yếu hơn hoặc chuẩn bị launch model mới.",
  },
  {
    question: "Với công ty sản xuất như Tesla, yếu tố nào ảnh hưởng mạnh nhất tới Operating Cash Flow?",
    options: [
      "EPS",
      "Biên lợi nhuận gộp",
      "Working Capital (tồn kho, khoản phải thu, khoản phải trả)",
      "Giá trị vốn hóa",
    ],
    correct: 2,
    explanation: "Với manufacturers: Working Capital = cash conversion cycle. Tồn kho cao = tiền bị kẹt. AR cao = đã bán nhưng chưa thu. AP cao = được trả chậm cho nhà cung cấp (tốt cho cash). Tesla's 2.26B inventory build là major cash drain trong Q1/2026.",
  },
  {
    question: "Tesla đầu tư ~4.5B USD vào CapEx, AI và SpaceX trong Q1. Điều này phản ánh gì?",
    options: [
      "Tesla đang khó khăn tài chính",
      "Tesla chọn reinvest thay vì accumulate cash — typical cho growth/capital-intensive companies",
      "Elon Musk đang rút tiền công ty",
      "CapEx không ảnh hưởng gì đến Cash Flow",
    ],
    correct: 1,
    explanation: "High CapEx trong FCF statement = investing for future capacity. Tesla build thêm Gigafactory capacity, invest vào FSD/AI, fund SpaceX. OCF 3.94B − CapEx 4.5B ≈ FCF âm — nhưng đây là growth reinvestment, không phải distress. Consistent với Tesla's long-term build-out strategy.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Tesla Q1/2026 — Net Income vs Cash Flow</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Lợi nhuận nhìn bình thường, nhưng tiền thật vẫn chảy rất mạnh — tại sao?</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Q1/2026 Snapshot</h3>
        <div className="bg-stone-800 text-white rounded-xl p-5 font-mono text-sm space-y-2">
          <div className="text-stone-500 text-xs mb-2">{ '// Tesla Q1/2026 — Cash Flow Highlights' }</div>
          <div className="flex justify-between">
            <span className="text-stone-300">Net Income</span>
            <span className="text-white font-bold">491M USD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-700">Operating Cash Flow (OCF)</span>
            <span className="text-stone-700 font-bold">3,940M USD 🚀</span>
          </div>
          <div className="flex justify-between text-xs text-stone-500 mt-1">
            <span>OCF / Net Income multiple</span>
            <span>~8x !</span>
          </div>
          <div className="mt-3 pt-3 border-t border-stone-600 space-y-1">
            <div className="text-stone-500 text-xs">OCF Drivers:</div>
            <div className="flex justify-between text-xs">
              <span className="text-stone-500">+ D&A (Depreciation & Amortization)</span>
              <span className="text-stone-700">Large</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-stone-500">+ SBC (Stock-Based Comp)</span>
              <span className="text-stone-700">Significant</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-stone-500">− Inventory increase</span>
              <span className="text-stone-700">-2,260M USD</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-stone-600">
            <div className="flex justify-between">
              <span className="text-stone-700">CapEx + AI + SpaceX</span>
              <span className="text-stone-700 font-bold">~4,500M USD</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Tại sao OCF gấp 8x Net Income?</h3>
        <div className="space-y-3">
          {[
            {
              item: "D&A (Depreciation & Amortization)",
              explain: "Tesla đầu tư hàng chục tỷ vào Gigafactories — tài sản này được khấu hao mỗi năm. D&A là chi phí phi tiền mặt (reduce Net Income) nhưng cộng trở lại trong OCF vì tiền không thực sự ra.",
              impact: "+",
              color: "emerald",
            },
            {
              item: "SBC (Stock-Based Compensation)",
              explain: "Tesla thưởng cổ phiếu cho nhân viên. Đây là expense trên P&L (giảm Net Income) nhưng không phải tiền mặt ra. Nên cộng lại trong OCF. 'Non-cash expense' không dùng tiền thật.",
              impact: "+",
              color: "blue",
            },
            {
              item: "Inventory Build (+2.26B USD)",
              explain: "Tesla sản xuất nhiều xe hơn bán ra trong Q1 → tồn kho tăng 2.26B. Tiền đã chi để mua materials và sản xuất, nhưng chưa thu về từ khách hàng → cash drain trong OCF.",
              impact: "−",
              color: "rose",
            },
          ].map(s => (
            <div key={s.item} className={`bg-${s.color}-50 rounded-xl p-4 border border-${s.color}-100`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-${s.color}-600 font-bold text-lg`}>{s.impact}</span>
                <span className={`font-bold text-${s.color}-700 text-sm`}>{s.item}</span>
              </div>
              <p className="text-stone-600 text-xs">{s.explain}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🏭 Inventory tăng 2.26B — đáng lo không?</h3>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-3">
          <p className="text-sm text-stone-700 leading-relaxed">
            Inventory build có thể là: (1) <strong>Demand yếu</strong> — xe bán chậm hơn dự kiến, (2) <strong>Strategic preparation</strong> — chuẩn bị launch model mới hoặc đẩy mạnh delivery vào cuối năm. Cần xem kỳ tiếp theo inventory có normalize không.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200">
            <div className="font-bold text-stone-700 mb-1">⚠️ Bearish interpretation</div>
            <p className="text-stone-600">Market xe điện Mỹ/Châu Âu tăng chậm hơn. Cạnh tranh từ BYD, giá cao, lãi suất vay xe cao → demand pressure.</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200">
            <div className="font-bold text-stone-700 mb-1"> Bullish interpretation</div>
            <p className="text-stone-600">Tesla đang build inventory trước một major launch hoặc seasonal delivery push Q2/Q3. Front-load production = efficiency.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📐 Cash Flow Reconciliation</h3>
        <div className="bg-white border border-stone-200 rounded-xl p-4 font-mono text-xs">
          <div className="text-stone-500 mb-2">{ '// Net Income → OCF bridge' }</div>
          <div className="flex justify-between mb-1"><span>Net Income</span><span className="text-stone-600">+491M</span></div>
          <div className="flex justify-between mb-1"><span className="text-stone-700">+ D&A (non-cash)</span><span className="text-stone-700">+Large</span></div>
          <div className="flex justify-between mb-1"><span className="text-stone-700">+ SBC (non-cash)</span><span className="text-stone-700">+Significant</span></div>
          <div className="flex justify-between mb-1"><span className="text-stone-700">− Inventory build</span><span className="text-stone-700">-2,260M</span></div>
          <div className="flex justify-between mb-1"><span className="text-stone-500">± Other working capital</span><span className="text-stone-500">Net positive</span></div>
          <div className="flex justify-between border-t pt-1 font-bold"><span>Operating Cash Flow</span><span className="text-stone-700">+3,940M</span></div>
          <div className="flex justify-between mt-2 text-stone-500"><span>− CapEx &amp; Investments</span><span className="text-stone-700">~-4,500M</span></div>
          <div className="flex justify-between border-t pt-1 font-bold"><span>Free Cash Flow (approx)</span><span className="text-stone-700">~-560M</span></div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Bài học từ Tesla Q1</h3>
        <div className="space-y-2">
          {[
            "Net Income kể câu chuyện accounting. Operating Cash Flow kể câu chuyện tiền mặt thực tế.",
            "Non-cash expenses (D&A, SBC) lớn → khoảng cách OCF và Net Income lớn — bình thường với capital-intensive companies.",
            "Working Capital là critical factor cho manufacturers: tồn kho, AR, AP — cả ba move cash lớn.",
            "FCF âm không tự động xấu nếu nguyên nhân là CapEx cho growth capacity — cần xem cash position và debt headroom.",
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
