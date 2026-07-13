"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 36, day: 36, accent: "teal",
  title: "Phân Tích DuPont",
  subtitle: "Tách ROE thành biên lợi nhuận, vòng quay tài sản và đòn bẩy",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🔬",
  nextSlug: "dividend", nextTitle: "Cổ tức",
};

const quiz: QuizQuestion[] = [
  {
    question: "Giá nguyên liệu tăng nhưng công ty chưa tăng giá bán ngay. Phần nào của DuPont dễ giảm nhất?",
    options: ["Biên lợi nhuận ròng", "Vòng quay tài sản", "Hệ số đòn bẩy vốn chủ", "Doanh thu"],
    correct: 0,
    explanation: "Biên lợi nhuận ròng = lợi nhuận ròng / doanh thu. Khi giá vốn tăng mà giá bán chưa tăng, lợi nhuận bị co lại trước tiên.",
  },
  {
    question: "Hàng tồn kho tăng mạnh nhưng doanh thu không tăng nhiều. Phần nào của DuPont dễ giảm?",
    options: ["Biên lợi nhuận ròng", "Vòng quay tài sản", "Hệ số đòn bẩy vốn chủ", "Thuế suất"],
    correct: 1,
    explanation: "Vòng quay tài sản = doanh thu / tổng tài sản. Tồn kho tăng làm tổng tài sản tăng, nhưng doanh thu không tăng tương ứng, nên công ty đang dùng tài sản kém hiệu quả hơn.",
  },
  {
    question: "Hai công ty cùng ROE 15%. Điều nào ĐÚNG hơn?",
    options: [
      "Hai công ty hoạt động giống nhau",
      "Hai công ty chắc chắn lãi bằng nhau",
      "Hai công ty có thể đạt ROE 15% qua con đường hoàn toàn khác nhau",
      "Hai công ty dùng cùng lượng nợ",
    ],
    correct: 2,
    explanation: "Đây là ý chính của DuPont. Một công ty có ROE cao vì biên lợi nhuận tốt; công ty khác có ROE cao vì quay vòng tài sản nhanh hoặc dùng nhiều nợ. Cùng ROE nhưng chất lượng rất khác nhau.",
  },
  {
    question: "Tyson Foods: biên lợi nhuận ròng khoảng 0.6%, vòng quay tài sản khoảng 0.4 lần, đòn bẩy bình thường. ROE thấp vì sao?",
    options: [
      "Nợ quá nhiều",
      "Biên lợi nhuận thấp + tài sản quay chậm - đặc trưng ngành chế biến thịt",
      "Không đủ doanh thu",
      "Thuế suất quá cao",
    ],
    correct: 1,
    explanation: "Chế biến thịt là ngành biên lợi nhuận thấp và cần nhiều nhà máy, kho lạnh, logistics. DuPont cho thấy ROE thấp vì cả biên lợi nhuận và vòng quay tài sản đều yếu.",
  },
];

function DuPontSimulator() {
  const [margin, setMargin] = useState(0.6);
  const [at, setAT] = useState(0.4);
  const [em, setEM] = useState(2.5);

  const roe = margin * at * em;

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-1 text-sm">Mô phỏng DuPont</h3>
      <p className="text-xs text-stone-500 mb-4">Điều chỉnh 3 yếu tố để thấy tác động lên ROE</p>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Biên lợi nhuận ròng ({margin}%)</label>
          <input type="range" min={0.1} max={30} step={0.1} value={margin} onChange={e => setMargin(+e.target.value)} className="w-full accent-teal-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Vòng quay tài sản ({at}x)</label>
          <input type="range" min={0.1} max={5} step={0.1} value={at} onChange={e => setAT(+e.target.value)} className="w-full accent-teal-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Hệ số đòn bẩy vốn chủ ({em}x)</label>
          <input type="range" min={1} max={8} step={0.1} value={em} onChange={e => setEM(+e.target.value)} className="w-full accent-cyan-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-4 font-mono text-sm mb-3">
        <div className="flex items-center gap-2 justify-center text-stone-600 mb-3 text-xs">
          <span className="text-stone-700 font-bold">{margin}%</span>
          <span>×</span>
          <span className="text-stone-700 font-bold">{at}x</span>
          <span>×</span>
          <span className="text-cyan-600 font-bold">{em}x</span>
          <span>=</span>
          <span className={`font-bold text-lg ${roe > 15 ? "text-stone-700" : roe > 8 ? "text-stone-700" : "text-stone-700"}`}>{roe.toFixed(2)}%</span>
        </div>
        <div className="text-center text-xs text-stone-500">Biên lợi nhuận × Vòng quay tài sản × Đòn bẩy = ROE</div>
      </div>

      <div className={`rounded-xl p-3 text-center text-xs font-medium border ${roe > 15 ? "bg-stone-50 border-stone-200 text-stone-700" : roe > 8 ? "bg-stone-50 border-stone-200 text-stone-700" : "bg-stone-50 border-stone-200 text-stone-700"}`}>
        {roe > 15 ? `ROE ${roe.toFixed(1)}% - tốt. Cần xem nguồn gốc: từ biên lợi nhuận, vòng quay tài sản hay đòn bẩy?` :
         roe > 8 ? `ROE ${roe.toFixed(1)}% - trung bình. Yếu tố nào có thể cải thiện?` :
         `⚠️ ROE ${roe.toFixed(1)}% - Thấp. Cần DuPont để hiểu tại sao và nơi nào cần cải thiện.`}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Phân tích DuPont</h2>
      <p className="text-stone-600 text-sm mb-6 italic">ROE giống điểm thi cuối kỳ - DuPont cho biết yếu ở môn nào</p>

      <section className="mb-8 rounded-xl border border-teal-100 bg-teal-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Hiểu nhanh</h3>
        <p className="text-sm leading-relaxed text-stone-700">
          ROE cao chưa chắc tốt. DuPont tách ROE thành 3 nguồn: bán hàng giữ lại được bao nhiêu lợi nhuận, dùng tài sản hiệu quả không, và có đang vay nợ nhiều để làm đẹp chỉ số không.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Công thức DuPont 3 yếu tố</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5 text-center mb-4">
          <div className="font-mono text-lg font-bold mb-1">ROE = Biên lợi nhuận × Vòng quay tài sản × Đòn bẩy</div>
          <div className="font-mono text-sm text-stone-700">= (Lợi nhuận/Doanh thu) × (Doanh thu/Tài sản) × (Tài sản/Vốn chủ)</div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          {[
            { label: "Biên lợi nhuận ròng", formula: "Lợi nhuận / Doanh thu", question: "Bán 100đ giữ lại bao nhiêu?", example: "Apple: 25%, Tyson: 0.6%", color: "teal" },
            { label: "Vòng quay tài sản", formula: "Doanh thu / Tài sản", question: "1đ tài sản tạo bao nhiêu doanh thu?", example: "Bán lẻ: 2x, sản xuất: 0.5x", color: "cyan" },
            { label: "Đòn bẩy vốn chủ", formula: "Tài sản / Vốn chủ", question: "Dùng bao nhiêu nợ?", example: "3x nghĩa là tài sản gấp 3 lần vốn chủ", color: "blue" },
          ].map(c => (
            <div key={c.label} className={`bg-${c.color}-50 rounded-xl p-3 border border-${c.color}-100`}>
              <div className={`font-bold text-${c.color}-700 mb-1`}>{c.label}</div>
              <div className={`font-mono text-${c.color}-600 text-xs mb-1`}>{c.formula}</div>
              <div className="text-stone-500">{c.question}</div>
              <div className="text-stone-500 italic mt-1">{c.example}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Ví dụ: Tyson Foods</h3>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-3">
          <p className="text-sm text-stone-700 mb-3">Hệ thống phân tích báo cáo: <span className="font-mono bg-stone-200 px-1 rounded text-xs">Biên lợi nhuận: 0.6% | Vòng quay tài sản: 0.4x | ROE thấp</span></p>
          <p className="text-stone-600 text-sm">Thay vì nói: <em>"ROE = 5% - công ty hoạt động không tốt"</em></p>
          <p className="text-stone-600 text-sm mt-1">Phân tích DuPont nói: <em>"ROE thấp chủ yếu vì biên lợi nhuận chỉ 0.6% và vòng quay tài sản 0.4 lần. Ngành chế biến thịt cần nhiều nhà máy, kho lạnh, logistics. Đòn bẩy không quá bất thường. Muốn cải thiện ROE, công ty cần tăng biên lợi nhuận hoặc dùng tài sản hiệu quả hơn."</em></p>
        </div>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm">
          <span className="font-bold text-stone-700">Ý chính:</span> <span className="text-stone-600">DuPont không chỉ nói ROE cao hay thấp, mà kể được câu chuyện tại sao và cần cải thiện ở đâu.</span>
        </div>
      </section>

      <DuPontSimulator />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Mô hình kinh doanh khác nhau → cấu trúc DuPont khác nhau</h3>
        <div className="space-y-2">
          {[
            { company: "Apple", margin: "25%", at: "1.0x", em: "3.5x", roe: "~88%", note: "Biên lợi nhuận cao + đòn bẩy vừa phải" },
            { company: "Walmart", margin: "2.4%", at: "2.5x", em: "5x", roe: "~30%", note: "Biên mỏng nhưng quay vòng nhanh" },
            { company: "Tyson Foods", margin: "0.6%", at: "0.4x", em: "2.5x", roe: "~1%", note: "Biên thấp + tài sản quay chậm" },
            { company: "Công ty phần mềm", margin: "20%", at: "0.7x", em: "2x", roe: "~28%", note: "Biên cao nhưng vòng quay tài sản thấp" },
          ].map(c => (
            <div key={c.company} className="flex items-center gap-3 bg-stone-50 rounded-lg p-3 border border-stone-200 text-xs">
              <div className="w-28 font-bold text-stone-700 flex-shrink-0">{c.company}</div>
              <div className="flex-1 font-mono text-stone-500">{c.margin} × {c.at} × {c.em}</div>
              <div className="font-bold text-stone-700 flex-shrink-0">ROE {c.roe}</div>
              <div className="text-stone-500 flex-shrink-0 max-w-32 hidden md:block">{c.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Khi nào dùng DuPont?</h3>
        <div className="space-y-2">
          {[
            "So sánh 2 công ty cùng ngành: ROE khác nhau vì biên lợi nhuận, vòng quay tài sản hay đòn bẩy?",
            "Theo dõi xu hướng qua thời gian: yếu tố nào đang yếu đi, cần cải thiện ở đâu?",
            "Phân tích đối thủ: Walmart, Amazon, Costco có mô hình rất khác nhau dù cùng bán lẻ",
            "Kiểm tra luận điểm đầu tư: ban lãnh đạo đang cải thiện ROE bằng vận hành tốt hơn hay chỉ vay nợ nhiều hơn?",
          ].map((u, i) => (
            <div key={i} className="flex gap-3 bg-stone-50 rounded-lg p-3 text-sm border border-stone-200">
              <span className="text-stone-700 font-bold flex-shrink-0">→</span>
              <span className="text-stone-700">{u}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
