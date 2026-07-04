"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 2, day: 2, accent: "blue",
  title: "Free Cash Flow là gì?",
  subtitle: "Tại sao doanh nghiệp lãi mà vẫn không có tiền để dùng?",
  duration: "7 phút", difficulty: "Trung bình", emoji: "💸",
  nextSlug: "bang-can-doi-ke-toan", nextTitle: "Day 3: Balance Sheet",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Free Cash Flow (FCF) được tính như thế nào?",
    options: ["Doanh thu − Chi phí", "Net Income + D&A", "Operating Cash Flow − Capital Expenditure (CapEx)", "EBITDA − Thuế"],
    correct: 2,
    explanation: "FCF = OCF − CapEx. Đây là tiền thực sự còn lại sau khi doanh nghiệp đã đầu tư để duy trì và phát triển tài sản.",
  },
  {
    question: "Tại sao FCF quan trọng hơn Net Income?",
    options: [
      "FCF luôn lớn hơn Net Income",
      "FCF không bị ảnh hưởng bởi khấu hao và chính sách kế toán — tiền thực sự trong tay",
      "FCF bao gồm cả hoạt động đầu tư",
      "FCF được kiểm toán nghiêm ngặt hơn",
    ],
    correct: 1,
    explanation: "Net Income có thể bị điều chỉnh qua D&A, amortization, accruals. FCF là tiền mặt thực không thể làm giả — đây là lý do Warren Buffett gọi FCF là 'owner earnings'.",
  },
  {
    question: "Một công ty có OCF = 200 tỷ, CapEx = 250 tỷ. FCF là bao nhiêu và điều đó có nghĩa gì?",
    options: [
      "FCF = 450 tỷ — rất tốt",
      "FCF = −50 tỷ — đang đầu tư nhiều hơn tiền sinh ra, cần kiểm tra",
      "FCF = 200 tỷ — CapEx không tính",
      "Không tính được vì thiếu thông tin",
    ],
    correct: 1,
    explanation: "FCF = 200 − 250 = −50 tỷ. FCF âm không nhất thiết xấu nếu do đầu tư mở rộng, nhưng cần theo dõi xem doanh nghiệp tài trợ khoản âm này bằng cách nào.",
  },
  {
    question: "CapEx (Capital Expenditure) là gì?",
    options: [
      "Chi phí vận hành hàng ngày như lương, điện nước",
      "Tiền đầu tư vào tài sản dài hạn: máy móc, nhà xưởng, công nghệ",
      "Chi phí marketing và quảng cáo",
      "Tiền trả lãi vay ngân hàng",
    ],
    correct: 1,
    explanation: "CapEx là capital expenditure — chi tiêu mua tài sản dài hạn (nhà xưởng, máy móc, phần mềm) tạo ra lợi ích trong nhiều năm. Được ghi nhận trên bảng cân đối, không trực tiếp vào P&L.",
  },
  {
    question: "Doanh nghiệp nào có 'chất lượng' FCF tốt hơn?",
    options: [
      "Công ty A: FCF = 100 tỷ, cần 200 tỷ CapEx để duy trì hoạt động",
      "Công ty B: FCF = 80 tỷ, chỉ cần 20 tỷ CapEx để duy trì, phần còn lại là tăng trưởng",
      "Hai công ty tương đương vì cùng có FCF dương",
      "Không đánh giá được chỉ qua FCF",
    ],
    correct: 1,
    explanation: "Công ty B có 'maintenance CapEx' thấp — phần lớn FCF là tiền tự do thực sự. Công ty A cần đầu tư nhiều chỉ để duy trì (capital-intensive). Warren Buffett thích Công ty B hơn.",
  },
];

function FCFAnimation() {
  const [ocf, setOcf] = useState(150);
  const [capex, setCapex] = useState(80);
  const fcf = ocf - capex;

  return (
    <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 space-y-5 my-6">
      <div className="text-sm font-bold text-stone-700">🎛️ FCF = OCF − CapEx</div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-stone-600">⚙️ Operating Cash Flow (OCF)</span>
            <span className="font-bold text-stone-700">+{ocf} tỷ</span>
          </div>
          <input type="range" min={0} max={300} value={ocf} onChange={e => setOcf(+e.target.value)} className="w-full accent-emerald-600" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-stone-600">🏗️ Capital Expenditure (CapEx)</span>
            <span className="font-bold text-stone-700">−{capex} tỷ</span>
          </div>
          <input type="range" min={0} max={250} value={capex} onChange={e => setCapex(+e.target.value)} className="w-full accent-rose-500" />
        </div>
      </div>

      {/* Center-zero bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-stone-400">
          <span>FCF rất âm</span><span>Điểm 0</span><span>FCF rất dương</span>
        </div>
        <div className="h-8 bg-stone-100 rounded-full relative overflow-hidden">
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-stone-300 z-10" />
          {fcf >= 0
            ? <div className="absolute inset-y-1 rounded-full bg-stone-50 transition-all duration-500" style={{ left: "50%", width: `${Math.min(48, (fcf / 200) * 48)}%` }} />
            : <div className="absolute inset-y-1 rounded-full bg-stone-50 transition-all duration-500" style={{ right: "50%", width: `${Math.min(48, (Math.abs(fcf) / 200) * 48)}%` }} />}
        </div>
      </div>

      <div className={`rounded-2xl p-4 border-2 text-center ${fcf >= 0 ? "bg-stone-50 border-stone-200" : "bg-stone-50 border-stone-200"}`}>
        <div className="text-xs text-stone-500 mb-1">Free Cash Flow</div>
        <div className={`text-3xl font-bold ${fcf >= 0 ? "text-stone-700" : "text-stone-700"}`}>{fcf > 0 ? "+" : ""}{fcf} tỷ</div>
        <div className="text-sm mt-1 text-stone-500">
          {fcf > 100 ? "💰 Dư tiền nhiều — có thể trả cổ tức, buyback, M&A" :
           fcf > 0 ? " FCF dương — doanh nghiệp tự nuôi được mình" :
           fcf > -50 ? "⚠️ FCF âm nhẹ — đang đầu tư, cần theo dõi" :
           " FCF âm sâu — cần huy động vốn bên ngoài"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <button onClick={() => { setOcf(200); setCapex(50); }} className="border border-stone-200 rounded-xl p-2 hover:bg-stone-50 text-stone-600 text-xs">📱 Tech Company<br/><span className="text-stone-400">OCF cao, CapEx thấp</span></button>
        <button onClick={() => { setOcf(300); setCapex(280); }} className="border border-stone-200 rounded-xl p-2 hover:bg-stone-50 text-stone-600 text-xs">🏭 Manufacturing<br/><span className="text-stone-400">OCF cao nhưng CapEx lớn</span></button>
      </div>
    </div>
  );
}

export default function FreeCashFlowPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-8 text-stone-700 leading-relaxed">

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Vấn đề với lợi nhuận ròng</h2>
          <p>Sau khi hiểu OCF (bài 1), bạn biết rằng lợi nhuận ≠ tiền mặt. Nhưng ngay cả OCF cũng chưa phải câu trả lời cuối cùng. Một doanh nghiệp có OCF = 500 tỷ nhưng phải chi 480 tỷ để mua máy móc mới — thực ra còn lại rất ít tiền để làm gì khác.</p>
          <p>Đây là lý do <strong>Free Cash Flow (FCF)</strong> ra đời.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">FCF = OCF − CapEx</h2>
          <p>Free Cash Flow là tiền mặt <em>thực sự tự do</em> — sau khi doanh nghiệp đã đầu tư những gì cần thiết để duy trì và phát triển hoạt động kinh doanh.</p>
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
            <div className="text-sm font-bold text-stone-700 mb-3">Câu chuyện ThanhTech — phần mềm kế toán</div>
            {[
              { icon: "⚙️", text: "OCF năm nay: +200 tỷ (khách hàng trả tiền tốt, chi phí thấp)" },
              { icon: "🖥️", text: "CapEx: −180 tỷ (nâng cấp server, mua data center mới)" },
              { icon: "💸", text: "FCF = 200 − 180 = 20 tỷ — chỉ còn 20 tỷ để trả cổ tức hay đầu tư khác" },
              { icon: "", text: "P&L báo lãi 150 tỷ — nhưng tiền tự do thực chỉ có 20 tỷ" },
            ].map(r => (
              <div key={r.text} className="flex items-start gap-3 text-sm text-stone-600 py-1.5 border-b border-stone-100 last:border-0">
                <span className="text-lg flex-shrink-0">{r.icon}</span>{r.text}
              </div>
            ))}
          </div>
        </section>

        <FCFAnimation />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Tại sao Warren Buffett gọi FCF là "Owner Earnings"?</h2>
          <p>Buffett định nghĩa <em>owner earnings</em> là số tiền mà chủ sở hữu thực sự có thể rút ra mà không ảnh hưởng đến năng lực kinh doanh của doanh nghiệp. Về cơ bản, đó chính là FCF.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "📋", title: "Net Income (Lợi nhuận ròng)", items: ["Bị ảnh hưởng bởi D&A, accruals", "Khác nhau tùy phương pháp kế toán", "Không phản ánh nhu cầu CapEx"], color: "bg-stone-50 border-stone-200 text-stone-700" },
              { icon: "💰", title: "Free Cash Flow", items: ["Tiền mặt thực không thể làm giả", "Phản ánh đúng nhu cầu đầu tư", "Là cơ sở định giá DCF"], color: "bg-stone-50 border-stone-200 text-stone-700" },
            ].map(c => (
              <div key={c.title} className={`rounded-2xl border p-4 ${c.color}`}>
                <div className="font-bold text-sm mb-2">{c.icon} {c.title}</div>
                {c.items.map(t => <div key={t} className="text-xs opacity-80 flex gap-2 mt-1"><span>•</span>{t}</div>)}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">FCF âm có phải lúc nào cũng xấu?</h2>
          <p>Không. FCF âm có hai nguyên nhân hoàn toàn khác nhau:</p>
          <div className="space-y-3">
            {[
              { icon: "🚀", title: "FCF âm vì đầu tư tăng trưởng (Good)", desc: "Amazon giai đoạn 2012–2016 liên tục có FCF âm hoặc gần 0 vì đầu tư ồ ạt vào warehouse, AWS infrastructure. Kết quả: định giá ngày nay.", color: "bg-stone-50 border-stone-200 text-stone-700" },
              { icon: "💀", title: "FCF âm vì kinh doanh thua lỗ (Bad)", desc: "Nếu cả OCF âm lẫn CapEx cao — công ty đang đốt tiền mà không sinh ra giá trị. Cần nhìn vào xu hướng nhiều năm và lý do cụ thể.", color: "bg-stone-50 border-stone-200 text-stone-700" },
            ].map(r => (
              <div key={r.title} className={`rounded-2xl border p-4 ${r.color}`}>
                <div className="font-bold text-sm mb-1">{r.icon} {r.title}</div>
                <p className="text-sm opacity-90">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Vinamilk & FPT — So sánh FCF Yield</h2>
          <p>FCF Yield = FCF / Market Cap. Chỉ số này cho biết bạn nhận lại bao nhiêu "tiền thực" cho mỗi đồng đầu tư vào cổ phiếu:</p>
          <div className="bg-stone-900 rounded-2xl p-5 text-sm space-y-2">
            {[
              { co: "Vinamilk (VNM)", fcf: "~2,500 tỷ", mc: "~80,000 tỷ", yield: "~3.1%", note: "Consumer defensive — FCF yield thấp vì PE cao" },
              { co: "FPT Corp", fcf: "~3,000 tỷ", mc: "~120,000 tỷ", yield: "~2.5%", note: "Tech growth — thị trường trả premium" },
            ].map(r => (
              <div key={r.co} className="border-b border-stone-800 pb-3 last:border-0">
                <div className="text-white font-bold">{r.co}</div>
                <div className="text-stone-400 text-xs mt-1">FCF {r.fcf} / Market Cap {r.mc} → Yield {r.yield}</div>
                <div className="text-stone-500 text-xs">{r.note}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
          <h3 className="font-bold text-stone-700 mb-3"> 3 điều cần nhớ</h3>
          <div className="space-y-2">
            {[
              "FCF = OCF − CapEx. Tiền thực sự tự do sau khi đầu tư.",
              "FCF là nền tảng của mọi phương pháp định giá DCF.",
              "FCF âm không xấu nếu do đầu tư tăng trưởng — phải xét ngữ cảnh.",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-stone-700">
                <span className="text-stone-700 font-bold flex-shrink-0 mt-0.5"></span>{t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </LessonPageLayout>
  );
}
