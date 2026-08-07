"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  // Id tổng hợp, KHÔNG phải id trong corpus. Trang này chưa có bài tương ứng
  // trong lib/lessons.ts nên không có id thật để ghi vào, còn id cũ (20) là id
  // của một bài Chặng 3 CÓ THẬT - nên tiến độ, XP, ghi chú và highlight của
  // trang này đều đổ sang bài đó. Xem lib/__tests__/bespoke-lesson-ids.test.ts.
  id: 9005, slug: "chon-phuong-phap-dinh-gia", day: 20, accent: "violet",
  title: "Chọn Phương Pháp Định Giá",
  subtitle: "\"How do you choose the valuation method?\"- câu phỏng vấn có bẫy",
  duration: "7 phút", difficulty: "Khó", emoji: "",
  nextSlug: "discontinued-operations", nextTitle: "Discontinued Operations",
};

const quiz: QuizQuestion[] = [
  {
    question: "Interviewer hỏi 'How do you choose your valuation method?'- câu trả lời nào thể hiện tư duy tốt nhất?",
    options: [
      "Kể tên ba phương pháp chính rồi nêu ưu nhược của từng cái",
      "Chọn theo đặc điểm của chính doanh nghiệp đó",
      "Tôi dùng cả 3 phương pháp cho mọi tình huống để đảm bảo accuracy",
      "DCF luôn là phương pháp tốt nhất vì phản ánh intrinsic value",
    ],
    correct: 1,
    explanation: "Interviewer không muốn nghe định nghĩa - họ muốn thấy bạn biết chọn tool phù hợp với context. Trả lời từ 'đặc điểm doanh nghiệp → phương pháp' mới là tư duy của practitioner.",
  },
  {
    question: "Bạn đang định giá một startup SaaS, ARR tăng 80%/năm nhưng đang lỗ. Phương pháp nào ít phù hợp nhất?",
    options: [
      "EV/Revenue comps với các SaaS peers",
      "DCF với giá trị cuối kỳ chiếm phần lớn",
      "Asset-based (giá trị sổ sách)",
      "Precedent transactions từ các thương vụ SaaS gần đây",
    ],
    correct: 2,
    explanation: "Asset-based không phù hợp với SaaS - giá trị nằm ở recurring revenue, customer retention, growth rate, không phải tài sản hữu hình. Book value gần như không có ý nghĩa với software company.",
  },
  {
    question: "Precedent transactions cho implied value cao hơn trading comps vì lý do gì?",
    options: [
      "Dữ liệu precedent transactions luôn cũ hơn nên outdated",
      "Nó đã gồm phần trả thêm để mua đứt",
      "Trading comps dùng forward multiples trong khi precedent dùng trailing",
      "Không có lý do hệ thống, chỉ là ngẫu nhiên của mẫu dữ liệu",
    ],
    correct: 1,
    explanation: "Acquisition premium thường 20-40% trên market price. Khi bên mua trả premium, tất cả multiples (EV/EBITDA, EV/Revenue) trong precedent transactions đều cao hơn. Đó là lý do precedent transactions cho 'ceiling' trong football field chart.",
  },
  {
    question: "'No single method is perfect, so I triangulate.' Câu này muốn nói điều gì?",
    options: [
      "Dùng nhiều phương pháp để tính trung bình và lấy con số ở giữa",
      "Trùng nhau thì tin, lệch nhau thì phải hiểu vì sao",
      "Không phương pháp nào đúng nên chọn cái nào cũng như nhau",
      "Dùng 3 phương pháp để thuyết phục client",
    ],
    correct: 1,
    explanation: "Triangulation có nghĩa là cross-check logic. Nếu DCF cho 100 tỷ, comps cho 80 tỷ, precedent cho 120 tỷ → converge quanh 80-120 tỷ, reasonable. Nếu DCF cho 500 tỷ nhưng comps chỉ 80 tỷ → phải re-examine DCF assumptions.",
  },
  {
    question: "Khi nào nên dùng asset-based valuation?",
    options: [
      "Với mọi công ty để kiểm tra floor valuation",
      "Với công ty holding, real estate, hoặc khi công ty đang trong quá trình thanh lý",
      "Với startup chưa có đồng doanh thu nào",
      "Khi không tìm được công ty nào để so sánh",
    ],
    correct: 1,
    explanation: "Asset-based phù hợp khi: (1) Giá trị nằm ở tài sản hữu hình (BĐS, holdings), (2) Liquidation scenario, (3) Financial holding companies. Không phù hợp với business tạo ra value từ intangibles (brand, IP, human capital).",
  },
];

const METHODS = [
  {
    name: "DCF", full: "Discounted Cash Flow",
    when: "Cash flow ổn định, dự báo được",
    companies: "Mature companies: utilities, FMCG, manufacturing",
    why: "Phản ánh intrinsic value - không phụ thuộc thị trường",
    weakness: "Rất nhạy cảm với discount rate và terminal value assumptions",
    color: "blue",
  },
  {
    name: "Trading Comps", full: "Comparable Company Analysis",
    when: "Muốn phản ánh market pricing hiện tại",
    companies: "Mọi công ty có peers niêm yết tương đồng",
    why: "Market view - thị trường đang trả bao nhiêu cho business tương tự",
    weakness: "Phụ thuộc vào market sentiment; peers không bao giờ 100% comparable",
    color: "emerald",
  },
  {
    name: "Precedent Tx", full: "Precedent Transactions",
    when: "Có M&A gần đây, cần hiểu control premium",
    companies: "Bất kỳ deal M&A nào; đặc biệt hữu ích khi target công ty private",
    why: "Phản ánh deal context - bao gồm acquisition premium",
    weakness: "Data cũ, market conditions có thể khác; ít precedents trong ngành nhỏ",
    color: "violet",
  },
  {
    name: "Asset-Based", full: "Net Asset Value / Book Value",
    when: "Asset-heavy hoặc distressed scenario",
    companies: "Real estate, holding companies, liquidation",
    why: "Giá trị floor dựa trên tài sản thực có thể thanh lý",
    weakness: "Bỏ qua earning power và intangibles; thường undervalue growing businesses",
    color: "orange",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300",
  emerald: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300",
  violet: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300",
  orange: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300",
};

function MethodSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  const m = METHODS.find(x => x.name === selected);

  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 my-6">
      <h3 className="font-bold text-stone-800 dark:text-stone-100 mb-1 text-sm">🧩 Method Selection Guide</h3>
      <p className="text-xs text-stone-600 dark:text-stone-400 mb-4">Chọn phương pháp để xem khi nào nên dùng</p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {METHODS.map(x => (
          <button key={x.name} onClick={() => setSelected(x.name === selected ? null : x.name)}
            className={`text-left p-3 rounded-xl border-2 transition-all ${x.name === selected ? `${colorMap[x.color]} border-current` : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700"}`}>
            <div className="font-bold text-stone-800 dark:text-stone-100 text-sm">{x.name}</div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{x.full}</div>
          </button>
        ))}
      </div>

      {m ? (
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-4 space-y-3">
          <div>
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide">Dùng khi</span>
            <p className="text-sm text-stone-700 dark:text-stone-200 mt-0.5">{m.when}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide">Loại công ty</span>
            <p className="text-sm text-stone-700 dark:text-stone-200 mt-0.5">{m.companies}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">Tại sao (the "why")</span>
            <p className="text-sm text-stone-700 dark:text-stone-200 mt-0.5">{m.why}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">Điểm yếu</span>
            <p className="text-sm text-stone-700 dark:text-stone-200 mt-0.5">{m.weakness}</p>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-dashed border-stone-200 dark:border-stone-800 p-5 text-center text-stone-500 dark:text-stone-400 text-sm">
          Chọn một phương pháp để xem chi tiết
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Chọn Phương Pháp Định Giá</h2>
      <p className="text-stone-600 dark:text-stone-400 text-sm mb-6 italic">Interviewer không hỏi định nghĩa - họ muốn xem bạn có reasoning hay không</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">🎤 Câu trả lời mẫu - ngắn gọn, có structure</h3>
        <div className="bg-stone-900 text-white rounded-2xl p-5 text-sm leading-relaxed space-y-3 border border-stone-800">
          <p className="text-amber-400 italic text-xs mb-4"> -"How do you choose your valuation method?"</p>
          <p>
            <span className="text-emerald-400 font-semibold">"Tôi chọn dựa trên đặc điểm của doanh nghiệp, không phải quy tắc cứng.</span>
          </p>
          <p>
            Với công ty có <span className="text-emerald-300 font-semibold">dòng tiền ổn định và dự báo được</span>, tôi ưu tiên <span className="text-amber-300 font-bold">DCF</span> vì phản ánh intrinsic value.
          </p>
          <p>
            Với công ty chịu ảnh hưởng nhiều từ thị trường, tôi dùng <span className="text-amber-300 font-bold">trading comps</span> - P/E hoặc EV/EBITDA - để phản ánh market pricing hiện tại.
          </p>
          <p>
            Nếu có <span className="text-amber-300 font-bold">M&A gần đây</span> trong ngành, tôi sẽ xem <span className="text-amber-300 font-bold">precedent transactions</span> để hiểu control premium.
          </p>
          <p>
            Với <span className="text-amber-300 font-bold">asset-heavy hoặc distressed</span>, tôi dùng asset-based approach.
          </p>
          <p className="text-emerald-400 font-semibold">
            Trong thực tế, tôi không dùng một phương pháp duy nhất - tôi triangulate để đưa ra một khoảng định giá hợp lý và hiểu tại sao các phương pháp có thể diverge."
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3"> Công thức nhớ: Context → Method → Why → Cross-check</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { step: "1", label: "Context", desc: "Đặc điểm doanh nghiệp là gì?", icon: "🔍" },
            { step: "2", label: "Method", desc: "Chọn tool phù hợp", icon: "🛠️" },
            { step: "3", label: "Why", desc: "Giải thích reasoning", icon: "💬" },
            { step: "4", label: "Cross-check", desc: "Triangulate, explain gaps", icon: "⚖️" },
          ].map(s => (
            <div key={s.step} className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="font-bold text-sm mb-1">{s.label}</div>
              <div className="text-xs text-stone-500 dark:text-stone-400">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <MethodSelector />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">🚫 Sai lầm thường gặp trong interview</h3>
        <div className="space-y-3">
          {[
            {
              mistake: "Chỉ định nghĩa từng phương pháp",
              bad: "DCF là phương pháp chiết khấu dòng tiền về hiện tại...",
              fix: "Nối ngay với 'khi nào dùng': 'DCF phù hợp khi cash flow dự báo được, như mature utilities'",
            },
            {
              mistake: "Không gắn với loại công ty cụ thể",
              bad: "Tôi dùng tất cả phương pháp cho mọi tình huống",
              fix: "Context-driven: 'Với startup SaaS, EV/Revenue comps thường phù hợp hơn DCF vì chưa có positive FCF'",
            },
            {
              mistake: "Không nói về trade-off",
              bad: "DCF là tốt nhất vì phản ánh intrinsic value",
              fix: "'DCF cho intrinsic value nhưng rất nhạy cảm với discount rate - lý do tôi luôn cross-check với comps'",
            },
          ].map(s => (
            <div key={s.mistake} className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4">
              <div className="font-semibold text-rose-600 dark:text-rose-400 text-sm mb-2">❌ {s.mistake}</div>
              <div className="font-mono text-xs text-stone-600 dark:text-stone-300 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded p-2 mb-2">"{s.bad}"</div>
              <div className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded p-2">✓ {s.fix}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3"> One-liner để nhớ</h3>
        <div className="bg-emerald-900 text-white border border-emerald-800 rounded-xl p-5 text-center">
          <p className="text-lg font-bold mb-2">"DCF for intrinsic value, comps for market view, transactions for deal context."</p>
          <p className="text-emerald-200 text-sm">Và luôn kết bằng: "No single method is perfect - I triangulate to sanity-check."</p>
        </div>
      </section>
    </LessonPageLayout>
  );
}
