"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 32, day: 32, accent: "amber",
  title: "Interim Statement & OCI",
  subtitle: "Comprehensive Income = Net Income + Other Comprehensive Income",
  duration: "6 phút", difficulty: "Trung bình", emoji: "📋",
  nextSlug: "transfer-pricing", nextTitle: "Transfer Pricing",
};

const quiz: QuizQuestion[] = [
  {
    question: "Công ty có Net Income = 80M và OCI = -20M (FX translation losses). Comprehensive Income là?",
    options: ["100M", "80M", "60M", "-20M"],
    correct: 2,
    explanation: "Comprehensive Income = Net Income + OCI = 80M + (-20M) = 60M. OCI (Other Comprehensive Income) ghi nhận các khoản lãi/lỗ không đi qua P&L thông thường — FX translation, unrealized gains trên AFS securities, pension adjustments, hedge accounting.",
  },
  {
    question: "Điều nào KHÔNG thuộc OCI (Other Comprehensive Income)?",
    options: [
      "Foreign currency translation adjustments từ công ty con nước ngoài",
      "Unrealized gains/losses trên available-for-sale debt securities",
      "Revenue từ bán hàng hóa",
      "Pension obligation adjustments (actuarial gains/losses)",
    ],
    correct: 2,
    explanation: "Revenue từ bán hàng là P&L item bình thường, không phải OCI. OCI chứa: (1) FX translation adjustments, (2) Unrealized G/L trên debt securities FVOCI, (3) Pension actuarial adjustments, (4) Cash flow hedge ineffectiveness và FX forwards, (5) Revaluation surplus (IFRS).",
  },
  {
    question: "Báo cáo tài chính quý (interim statement) quan trọng vì?",
    options: [
      "Chỉ để đáp ứng yêu cầu pháp lý, không có giá trị phân tích",
      "Giúp theo dõi seasonality, business momentum, và có thể detect vấn đề sớm trước annual report",
      "Annual report là đủ, không cần đọc quý",
      "Chỉ quan trọng với công ty lỗ",
    ],
    correct: 1,
    explanation: "Interim (quarterly) reports giúp: (1) Detect revenue seasonality patterns (ví dụ retail Q4 luôn mạnh), (2) Spot business deterioration sớm, (3) Monitor working capital changes, (4) Track OCI fluctuations do FX — quan trọng với MNC. Analysts luôn đọc quarterly earnings.",
  },
  {
    question: "Accumulated OCI (AOCI) trên Balance Sheet phản ánh gì?",
    options: [
      "Tổng lợi nhuận giữ lại của công ty",
      "Tổng cộng tất cả OCI items qua các kỳ kế toán, chưa được realized vào P&L",
      "Tổng nợ ngắn hạn",
      "Doanh thu accumulated của tất cả các năm",
    ],
    correct: 1,
    explanation: "AOCI (Accumulated Other Comprehensive Income) là phần trong Equity ghi nhận tổng OCI chưa realized qua mọi kỳ. Khi items được realized (ví dụ: sell AFS securities, close FX hedge), transfer từ AOCI sang P&L — gọi là 'reclassification adjustment'.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Interim Statement & Comprehensive Income</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Lợi nhuận đầy đủ = Net Income + các khoản chưa realized qua P&L</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Công thức cốt lõi</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5 text-center mb-4">
          <div className="font-mono text-xl font-bold mb-1">Comprehensive Income = Net Income + OCI</div>
          <p className="text-stone-700 text-sm">Other Comprehensive Income = lãi/lỗ chưa qua P&L thông thường</p>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-5 font-mono text-sm">
          <div className="text-stone-400 text-xs mb-3">{ '// Statement of Comprehensive Income' }</div>
          <div className="flex justify-between mb-2 text-stone-700">
            <span>Net Income (từ P&L)</span>
            <span className="text-stone-700">+ 80M</span>
          </div>
          <div className="text-xs text-stone-400 mb-1 mt-3">Other Comprehensive Income:</div>
          <div className="flex justify-between mb-1 pl-3 text-xs">
            <span className="text-stone-500">FX translation adjustment</span>
            <span className="text-stone-700">-15M</span>
          </div>
          <div className="flex justify-between mb-1 pl-3 text-xs">
            <span className="text-stone-500">Unrealized gains on AFS securities</span>
            <span className="text-stone-700">+8M</span>
          </div>
          <div className="flex justify-between mb-1 pl-3 text-xs">
            <span className="text-stone-500">Pension actuarial loss</span>
            <span className="text-stone-700">-5M</span>
          </div>
          <div className="flex justify-between pl-3 text-xs border-t border-dashed pt-1 mb-3">
            <span className="font-semibold text-stone-600">Total OCI</span>
            <span className="font-semibold text-stone-700">-12M</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-bold">
            <span>Total Comprehensive Income</span>
            <span className="text-stone-700">68M</span>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📋 4 thành phần chính của OCI</h3>
        <div className="space-y-3">
          {[
            {
              item: "FX Translation Adjustments",
              when: "Công ty có subsidiaries ở nước ngoài",
              example: "VCB có chi nhánh tại Lào — đồng Kip giảm giá → translation loss vào OCI",
              impact: "Equity ảnh hưởng nhưng P&L không",
            },
            {
              item: "Unrealized G/L on Securities (FVOCI)",
              when: "Bond investments phân loại FVOCI",
              example: "Ngân hàng giữ TPCP → lãi suất tăng → bond price giảm → unrealized loss vào OCI",
              impact: "Khi sold → transfer sang P&L (recycling)",
            },
            {
              item: "Cash Flow Hedge",
              when: "Dùng derivatives hedge exposure tương lai",
              example: "Hãng hàng không hedge nhiên liệu → effective portion của hedge G/L vào OCI",
              impact: "Released vào P&L khi hedged item affects earnings",
            },
            {
              item: "Pension Actuarial G/L",
              when: "Defined benefit pension plans",
              example: "Discount rate thay đổi → PV of pension liability thay đổi → actuarial gain/loss vào OCI",
              impact: "Under IFRS: amortized or in OCI permanently",
            },
          ].map(s => (
            <div key={s.item} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="font-bold text-stone-700 text-sm mb-1">{s.item}</div>
              <div className="text-xs text-stone-500 mb-1"><span className="font-medium text-stone-600">Khi nào:</span> {s.when}</div>
              <div className="text-xs text-stone-500 mb-1"><span className="font-medium text-stone-600">Ví dụ:</span> {s.example}</div>
              <div className="text-xs text-stone-700 font-medium">{s.impact}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📅 Interim Statements — tại sao đọc quý?</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: "Detect seasonality", desc: "Retail: Q4 mạnh; Construction: Q2-Q3; Banking: Q1 thường chậm. Pattern quan trọng hơn số tuyệt đối." },
            { title: "Track momentum", desc: "Revenue acceleration hay deceleration? YoY và QoQ cả hai cần xem. Đừng chỉ nhìn con số một quý." },
            { title: "OCI fluctuations", desc: "Với MNC: FX OCI có thể swing lớn theo quarter — ảnh hưởng reported equity nhưng không phải economic reality." },
            { title: "Early warning", desc: "Accounts receivable tăng nhanh hơn revenue? Inventory bulge? Interim data cho thấy vấn đề sớm 3-6 tháng." },
          ].map(s => (
            <div key={s.title} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="font-bold text-stone-700 text-sm mb-1"> {s.title}</div>
              <p className="text-xs text-stone-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">🔍 AOCI trong Equity — đọc Balance Sheet</h3>
        <div className="bg-stone-800 text-white rounded-xl p-5 font-mono text-sm">
          <div className="text-stone-400 text-xs mb-3">{ '// Phần Equity trên Balance Sheet' }</div>
          <div className="flex justify-between mb-1"><span className="text-white">Common Stock</span><span className="text-stone-300">500M</span></div>
          <div className="flex justify-between mb-1"><span className="text-white">Additional Paid-in Capital</span><span className="text-stone-300">1,200M</span></div>
          <div className="flex justify-between mb-1"><span className="text-white">Retained Earnings</span><span className="text-stone-700">2,300M</span></div>
          <div className="flex justify-between mb-3"><span className="text-stone-700">Accumulated OCI (AOCI)</span><span className="text-stone-700">-85M</span></div>
          <div className="flex justify-between border-t border-stone-600 pt-2 font-bold"><span>Total Equity</span><span>3,915M</span></div>
          <div className="text-stone-400 text-xs mt-3">AOCI -85M = FX losses -120M + Unrealized bond gains +35M (accumulated)</div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
