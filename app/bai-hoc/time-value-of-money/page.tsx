"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 7, day: 7, accent: "rose",
  title: "Time Value of Money",
  subtitle: "1 tỷ hôm nay > 1 tỷ năm sau — tại sao?",
  duration: "7 phút", difficulty: "Trung bình", emoji: "⏳",
  nextSlug: "credit-debit-phan-1", nextTitle: "Credit vs Debit Phần 1",
};

const quiz: QuizQuestion[] = [
  {
    question: "PV = FV / (1+r)^n có nghĩa là gì?",
    options: [
      "Giá trị tương lai chia cho lãi suất",
      "Giá trị hiện tại của một khoản tiền nhận được trong tương lai",
      "Lợi nhuận hằng năm của khoản đầu tư",
      "Tổng dòng tiền qua các năm",
    ],
    correct: 1,
    explanation: "PV (Present Value) là giá trị hiện tại: 1 tỷ nhận được sau 5 năm với lãi suất 10% chỉ đáng giá khoảng 620 triệu hôm nay.",
  },
  {
    question: "Discount rate trong DCF đại diện cho điều gì?",
    options: [
      "Lãi suất ngân hàng hiện hành",
      "Chi phí vốn (WACC) — chi phí cơ hội của nhà đầu tư",
      "Tốc độ tăng trưởng doanh nghiệp",
      "Lạm phát kỳ vọng",
    ],
    correct: 1,
    explanation: "Discount rate = WACC hoặc required rate of return — chi phí của việc sử dụng vốn. Cao hơn → dòng tiền tương lai bị chiết khấu nhiều hơn → giá trị hiện tại thấp hơn.",
  },
  {
    question: "Nếu lãi suất chiết khấu tăng từ 8% lên 12%, giá trị hiện tại (PV) sẽ:",
    options: ["Tăng lên", "Giảm xuống", "Không đổi", "Tăng gấp đôi"],
    correct: 1,
    explanation: "Lãi suất chiết khấu cao hơn → mẫu số (1+r)^n lớn hơn → PV giảm. Đây là lý do khi Fed tăng lãi suất, định giá cổ phiếu giảm.",
  },
  {
    question: "NPV = -100 triệu hôm nay + PV(150 triệu sau 3 năm, r=10%). NPV dương hay âm?",
    options: [
      "Dương — nên đầu tư",
      "Âm — không nên đầu tư",
      "Cần thêm thông tin",
      "NPV = 0 trong trường hợp này",
    ],
    correct: 0,
    explanation: "PV(150 triệu, r=10%, n=3) = 150/(1.1)^3 ≈ 112.7 triệu > 100 triệu đầu tư → NPV ≈ +12.7 triệu → nên đầu tư.",
  },
  {
    question: "Công ty A tạo ra dòng tiền 50 tỷ/năm mãi mãi (perpetuity). Với discount rate 10%, giá trị doanh nghiệp là?",
    options: ["50 tỷ", "500 tỷ", "5.000 tỷ", "Không thể tính"],
    correct: 1,
    explanation: "Perpetuity value = CF / r = 50 tỷ / 10% = 500 tỷ. Đây là công thức Gordon Growth Model khi growth = 0.",
  },
];

function TVMAnimation() {
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(10);
  const fv = 1000;
  const pv = fv / Math.pow(1 + rate / 100, years);
  const points = Array.from({ length: years + 1 }, (_, i) => fv / Math.pow(1 + rate / 100, years - i));

  return (
    <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-4 text-sm">🕐 Minh hoạ Time Value of Money</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Số năm ({years} năm)</label>
          <input type="range" min={1} max={20} value={years} onChange={e => setYears(+e.target.value)}
            className="w-full accent-rose-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Lãi suất ({rate}%)</label>
          <input type="range" min={1} max={20} value={rate} onChange={e => setRate(+e.target.value)}
            className="w-full accent-rose-500" />
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-1 h-28 mb-3">
        {points.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
            <div
              className="w-full rounded-t transition-all duration-300"
              style={{
                height: `${(val / fv) * 100}%`,
                background: i === years ? "#f43f5e" : `rgba(244,63,94,${0.2 + (i / years) * 0.6})`,
              }}
            />
            <span className="text-[9px] text-stone-500">{i === 0 ? "PV" : i === years ? "FV" : `Y${i}`}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-3 text-center">
          <div className="text-stone-700 font-bold text-lg">{pv.toFixed(0)} triệu</div>
          <div className="text-xs text-stone-500">PV hiện tại</div>
        </div>
        <div className="bg-white rounded-xl p-3 text-center">
          <div className="text-stone-800 font-bold text-lg">1.000 triệu</div>
          <div className="text-xs text-stone-500">FV sau {years} năm</div>
        </div>
      </div>
      <p className="text-xs text-stone-500 mt-3 text-center">
        1.000 triệu nhận được sau {years} năm với lãi {rate}%/năm chỉ đáng giá <strong className="text-stone-700">{pv.toFixed(0)} triệu</strong> hôm nay
      </p>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Time Value of Money (TVM)</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Nền tảng của mọi phân tích tài chính — từ định giá cổ phiếu đến quyết định đầu tư</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🤔 Tại sao 1 tỷ hôm nay &gt; 1 tỷ năm sau?</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Đây là nguyên tắc số 1 của tài chính: <strong>tiền hôm nay có giá trị hơn tiền tương lai</strong>, vì ba lý do:
        </p>
        <ul className="space-y-2 mb-4">
          <li className="flex gap-2"><span className="text-stone-700 font-bold">1.</span><span className="text-stone-600"><strong>Cơ hội đầu tư</strong> — 1 tỷ hôm nay có thể đầu tư và sinh lời</span></li>
          <li className="flex gap-2"><span className="text-stone-700 font-bold">2.</span><span className="text-stone-600"><strong>Lạm phát</strong> — sức mua của tiền giảm theo thời gian</span></li>
          <li className="flex gap-2"><span className="text-stone-700 font-bold">3.</span><span className="text-stone-600"><strong>Rủi ro</strong> — tương lai không chắc, nhận tiền sớm hơn an toàn hơn</span></li>
        </ul>
      </section>

      <TVMAnimation />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📐 Hai công thức cốt lõi</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="text-xs font-bold text-stone-700 mb-1">FUTURE VALUE</div>
            <div className="font-mono text-sm font-bold text-stone-800 mb-2">FV = PV × (1+r)ⁿ</div>
            <p className="text-xs text-stone-600">100 triệu gửi ngân hàng 8%/năm trong 10 năm → 215 triệu</p>
          </div>
          <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
            <div className="text-xs font-bold text-pink-600 mb-1">PRESENT VALUE</div>
            <div className="font-mono text-sm font-bold text-stone-800 mb-2">PV = FV / (1+r)ⁿ</div>
            <p className="text-xs text-stone-600">Nhận 200 triệu sau 5 năm, r=10% → chỉ đáng 124 triệu hôm nay</p>
          </div>
        </div>
        <div className="bg-stone-800 rounded-xl p-4">
          <div className="text-xs font-bold text-stone-700 mb-1">NET PRESENT VALUE</div>
          <div className="font-mono text-sm font-bold text-white mb-2">NPV = Σ [CF_t / (1+r)^t] − C₀</div>
          <p className="text-xs text-stone-300">Tổng giá trị hiện tại của tất cả dòng tiền tương lai trừ đi vốn đầu tư ban đầu</p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🏗️ Ứng dụng thực tế: DCF Valuation</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          DCF (Discounted Cash Flow) là phương pháp định giá doanh nghiệp phổ biến nhất trong M&A và đầu tư:
        </p>
        <ol className="space-y-2">
          {[
            "Dự báo Free Cash Flow 5-10 năm tiếp theo",
            "Chọn discount rate (WACC) phù hợp với rủi ro doanh nghiệp",
            "Tính Terminal Value (giá trị từ năm 11 trở đi)",
            "Chiết khấu tất cả về hiện tại → Enterprise Value",
            "Trừ Net Debt → Equity Value → Chia số cổ phiếu → Giá cổ phiếu",
          ].map((step, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full bg-stone-50 text-stone-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-stone-600 text-sm">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-4">
        <h3 className="text-lg font-bold text-stone-800 mb-3">⚠️ Lỗi phổ biến khi dùng TVM</h3>
        <div className="space-y-3">
          {[
            { err: "Dùng nominal rate thay vì real rate khi có lạm phát", fix: "Điều chỉnh: Real rate ≈ Nominal − Inflation" },
            { err: "Quên điều chỉnh tần suất (monthly vs annual)", fix: "APR 12% monthly ≠ 12% annual — luôn convert về cùng kỳ" },
            { err: "Chọn discount rate quá thấp → overvalue doanh nghiệp", fix: "WACC phải phản ánh rủi ro thực sự của business" },
          ].map((item, i) => (
            <div key={i} className="bg-stone-50 border border-stone-200 rounded-xl p-4">
              <div className="text-sm font-semibold text-stone-700 mb-1">❌ {item.err}</div>
              <div className="text-xs text-stone-600"> {item.fix}</div>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
