"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 16, day: 16, accent: "purple",
  title: "Synergy trong M&A",
  subtitle: "1 + 1 = 3 - Khi nào điều này thành hiện thực?",
  duration: "8 phút", difficulty: "Khó", emoji: "🔗",
  nextSlug: "khau-hao", nextTitle: "Khấu Hao",
};

const quiz: QuizQuestion[] = [
  {
    question: "Cost synergy và revenue synergy khác nhau như thế nào về độ chắc chắn?",
    options: [
      "Revenue synergy chắc chắn hơn vì dễ tính toán",
      "Cost synergy thường chắc chắn hơn - cắt chi phí trùng lặp là việc bên trong có thể kiểm soát",
      "Hai loại như nhau về độ chắc chắn",
      "Phụ thuộc vào ngành",
    ],
    correct: 1,
    explanation: "Cost synergy (lay-off trùng lặp, đóng cửa hàng duplicate, consolidate IT systems) là việc internal - manageable. Revenue synergy (cross-sell, upsell cho customer base của nhau) phụ thuộc vào customer behavior - khó predict hơn nhiều.",
  },
  {
    question: "Acquisition premium thường được justified bằng gì?",
    options: [
      "Giá trị sổ sách của target",
      "PV của synergy kỳ vọng - bên mua trả premium vì tin rằng 1+1 > 2",
      "Cảm xúc và ego của CEO",
      "Áp lực từ investment banker",
    ],
    correct: 1,
    explanation: "Acquisition premium (20-40% trên market price) phải được justified bởi synergy. Nếu PV(synergy) > premium paid → deal creates value. Nếu không → M&A hủy giá trị (đây là lý do 50-70% M&A thất bại).",
  },
  {
    question: "Tại sao synergy thường bị overestimate?",
    options: [
      "Banker và management có incentive để make deal happen",
      "Khó tính toán synergy chính xác",
      "Integration luôn mất nhiều thời gian hơn dự kiến",
      "Tất cả đều đúng",
    ],
    correct: 3,
    explanation: "Banker có phí tư vấn, management muốn expand empire → cả hai có incentive overstate synergy. Thực tế integration phức tạp hơn nhiều: culture clash, IT systems, customer retention.",
  },
  {
    question: "Run-rate synergy là gì?",
    options: [
      "Synergy đạt được trong năm đầu tiên",
      "Tổng synergy annualized khi fully realized (không phải số trong quá trình ramp-up)",
      "Synergy từ hoạt động vận hành",
      "Revenue synergy từ cross-selling",
    ],
    correct: 1,
    explanation: "Run-rate synergy = annual synergy khi fully implemented. Ví dụ: đóng 10 văn phòng tiết kiệm 100 tỷ/năm, nhưng phải mất 18 tháng để đóng hết → run-rate 100 tỷ nhưng năm 1 chỉ realized 50 tỷ.",
  },
  {
    question: "Trong synergy analysis, 'dis-synergy' là gì?",
    options: [
      "Synergy âm - giá trị bị mất đi sau khi sáp nhập",
      "Synergy khó đo lường",
      "Synergy cần nhiều năm để achieve",
      "Không có khái niệm này trong M&A",
    ],
    correct: 0,
    explanation: "Dis-synergy = negative synergy. Ví dụ: mua lại brand xa xỉ nhưng làm mất exclusive image → revenue giảm; hay culture clash khiến key talent nghỉ việc → mất value. Phải netted off synergy estimate.",
  },
];

function SynergyCalculator() {
  const [costSynergy, setCostSynergy] = useState(100);
  const [revSynergy, setRevSynergy] = useState(60);
  const [disSynergy, setDisSynergy] = useState(20);
  const [wacc] = useState(10);
  const [growth, setGrowth] = useState(3);

  const netSynergy = costSynergy + revSynergy - disSynergy;
  const pvSynergy = netSynergy / ((wacc - growth) / 100);
  const impliedPremium = (pvSynergy / 1000) * 100;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-4 text-sm">🧮 Synergy Value Calculator</h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Cost Synergy ({costSynergy} tỷ/năm)</label>
          <input type="range" min={0} max={300} step={10} value={costSynergy} onChange={e => setCostSynergy(+e.target.value)} className="w-full accent-purple-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Revenue Synergy ({revSynergy} tỷ/năm)</label>
          <input type="range" min={0} max={300} step={10} value={revSynergy} onChange={e => setRevSynergy(+e.target.value)} className="w-full accent-purple-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Dis-synergy ({disSynergy} tỷ/năm)</label>
          <input type="range" min={0} max={100} step={5} value={disSynergy} onChange={e => setDisSynergy(+e.target.value)} className="w-full accent-rose-400" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">WACC ({wacc}%) / Growth ({growth}%)</label>
          <input type="range" min={1} max={3} value={growth} onChange={e => setGrowth(+e.target.value)} className="w-full accent-purple-300" />
        </div>
      </div>

      <div className="bg-white rounded-xl p-4">
        <div className="space-y-2 text-sm mb-3 font-mono">
          <div className="flex justify-between">
            <span className="text-stone-700">+ Cost Synergy</span>
            <span className="font-bold">{costSynergy} tỷ/năm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-700">+ Revenue Synergy</span>
            <span className="font-bold">{revSynergy} tỷ/năm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-700">− Dis-synergy</span>
            <span className="font-bold text-stone-700">−{disSynergy} tỷ/năm</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-bold text-stone-700">Net Annual Synergy</span>
            <span className="font-bold text-stone-700">{netSynergy} tỷ/năm</span>
          </div>
        </div>
        <div className="bg-stone-50 rounded-xl p-3 text-center border border-stone-200">
          <div className="text-xs text-stone-500 mb-1">PV of Synergy (perpetuity, r={wacc}%, g={growth}%)</div>
          <div className="text-2xl font-bold text-stone-700">{pvSynergy.toFixed(0)} tỷ</div>
          <div className="text-xs text-stone-500 mt-1">Justified premium trên deal 1.000 tỷ: {impliedPremium.toFixed(0)}%</div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Synergy trong M&A</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Lý do tồn tại của hầu hết thương vụ mua lại - và tại sao nó thường thất vọng</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">🔍 2 loại synergy chính</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">✂️</span>
              <div>
                <div className="font-bold text-stone-800">Cost Synergy</div>
                <div className="text-xs text-stone-700 font-semibold">Chắc chắn hơn - có thể kiểm soát</div>
              </div>
            </div>
            <ul className="space-y-1.5 text-sm text-stone-600">
              <li className="flex gap-2"><span className="text-stone-700">→</span>Headcount reduction (trùng lặp bộ phận)</li>
              <li className="flex gap-2"><span className="text-stone-700">→</span>Đóng văn phòng/chi nhánh trùng lắp</li>
              <li className="flex gap-2"><span className="text-stone-700">→</span>Consolidate IT systems, vendor contracts</li>
              <li className="flex gap-2"><span className="text-stone-700">→</span>Tăng sức mua → giảm giá nguyên vật liệu</li>
            </ul>
          </div>
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl"></span>
              <div>
                <div className="font-bold text-stone-800">Revenue Synergy</div>
                <div className="text-xs text-stone-700 font-semibold">Không chắc chắn - phụ thuộc khách hàng</div>
              </div>
            </div>
            <ul className="space-y-1.5 text-sm text-stone-600">
              <li className="flex gap-2"><span className="text-stone-700">→</span>Cross-sell sản phẩm cho customer base của nhau</li>
              <li className="flex gap-2"><span className="text-stone-700">→</span>Expand vào thị trường/địa lý mới</li>
              <li className="flex gap-2"><span className="text-stone-700">→</span>Kết hợp sản phẩm → create new offerings</li>
              <li className="flex gap-2"><span className="text-stone-700">→</span>Pricing power khi market share tăng</li>
            </ul>
          </div>
        </div>
      </section>

      <SynergyCalculator />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3"> Tại sao 50-70% M&A thất bại?</h3>
        <div className="space-y-3">
          {[
            { icon: "💰", issue: "Overpay - synergy estimate quá lạc quan", detail: "Banker inflated projection + CEO muốn win deal → bên mua trả premium cao hơn PV(synergy) thực tế" },
            { icon: "🏴", issue: "Culture clash", detail: "Hai tổ chức có văn hóa khác nhau không thể tích hợp → key talent nghỉ việc, productivity giảm" },
            { icon: "⏰", issue: "Integration chậm và tốn kém hơn dự tính", detail: "IT systems không tương thích, process khác nhau, customer confusion → mất 2-3 năm thay vì 12 tháng" },
            { icon: "", issue: "Distraction từ core business", detail: "Management tập trung vào integration → core business bị neglect → thua đối thủ" },
          ].map(s => (
            <div key={s.issue} className="bg-stone-50 border border-stone-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{s.icon}</span>
                <span className="font-semibold text-stone-800 text-sm">{s.issue}</span>
              </div>
              <p className="text-stone-600 text-xs ml-7">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3"> Best practices cho synergy estimation</h3>
        <div className="space-y-2">
          {[
            "Haircut synergy estimate: chỉ dùng 50-70% số banker đưa ra",
            "Phân tách cost vs revenue synergy - weight cost synergy cao hơn",
            "Model ramp-up timeline: synergy không realized ngay trong năm 1",
            "Include integration costs: one-time costs thường bằng 1-2 năm synergy",
            "Sensitivity analysis: what if synergy thấp hơn 30%? Deal vẫn makes sense?",
          ].map((b, i) => (
            <div key={i} className="flex gap-2 bg-stone-50 rounded-lg p-3 text-sm border border-stone-200">
              <span className="text-stone-700 font-bold flex-shrink-0">{i + 1}.</span>
              <span className="text-stone-700">{b}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
