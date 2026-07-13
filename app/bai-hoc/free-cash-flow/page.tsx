"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 2, day: 2, accent: "blue",
  title: "Dòng Tiền Tự Do (Free Cash Flow)",
  subtitle: "Tại sao doanh nghiệp lãi mà vẫn không có tiền để dùng?",
  duration: "7 phút", difficulty: "Trung bình", emoji: "💸",
  nextSlug: "bang-can-doi-ke-toan", nextTitle: "Day 3: Bảng cân đối kế toán",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Dòng tiền tự do được tính đơn giản như thế nào?",
    options: ["Doanh thu − Chi phí", "Lợi nhuận ròng + khấu hao", "Dòng tiền kinh doanh − tiền đầu tư tài sản dài hạn", "EBITDA − Thuế"],
    correct: 2,
    explanation: "Dòng tiền tự do, viết tắt là FCF, bằng dòng tiền kinh doanh trừ tiền đầu tư tài sản dài hạn. Đây là tiền còn lại sau khi doanh nghiệp đã chi để duy trì và phát triển tài sản.",
  },
  {
    question: "Tại sao dòng tiền tự do thường quan trọng hơn lợi nhuận ròng?",
    options: [
      "Dòng tiền tự do luôn lớn hơn lợi nhuận ròng",
      "Dòng tiền tự do gần với tiền thật trong tay hơn lợi nhuận kế toán",
      "Dòng tiền tự do bao gồm cả hoạt động đầu tư",
      "Dòng tiền tự do được kiểm toán nghiêm ngặt hơn",
    ],
    correct: 1,
    explanation: "Lợi nhuận ròng có thể bị ảnh hưởng bởi khấu hao, phân bổ và cách ghi nhận kế toán. Dòng tiền tự do gần với tiền thật hơn, nên giúp kiểm tra chất lượng lợi nhuận.",
  },
  {
    question: "Một công ty có dòng tiền kinh doanh 200 tỷ, chi đầu tư tài sản 250 tỷ. Dòng tiền tự do là bao nhiêu?",
    options: [
      "450 tỷ - rất tốt",
      "−50 tỷ - đang đầu tư nhiều hơn tiền sinh ra, cần kiểm tra",
      "200 tỷ - tiền đầu tư tài sản không tính",
      "Không tính được vì thiếu thông tin",
    ],
    correct: 1,
    explanation: "Dòng tiền tự do = 200 − 250 = −50 tỷ. Âm không nhất thiết xấu nếu do đầu tư mở rộng, nhưng cần xem doanh nghiệp lấy tiền ở đâu để bù phần thiếu.",
  },
  {
    question: "Chi đầu tư tài sản dài hạn là gì?",
    options: [
      "Chi phí vận hành hàng ngày như lương, điện nước",
      "Tiền đầu tư vào tài sản dài hạn: máy móc, nhà xưởng, công nghệ",
      "Chi phí marketing và quảng cáo",
      "Tiền trả lãi vay ngân hàng",
    ],
    correct: 1,
    explanation: "Chi đầu tư tài sản dài hạn, tiếng Anh là CapEx, là tiền mua nhà xưởng, máy móc, phần mềm hoặc công nghệ dùng trong nhiều năm.",
  },
  {
    question: "Doanh nghiệp nào có chất lượng dòng tiền tự do tốt hơn?",
    options: [
      "Công ty A: dòng tiền tự do 100 tỷ, cần 200 tỷ đầu tư tài sản để duy trì hoạt động",
      "Công ty B: dòng tiền tự do 80 tỷ, chỉ cần 20 tỷ đầu tư tài sản để duy trì",
      "Hai công ty tương đương vì cùng có dòng tiền tự do dương",
      "Không đánh giá được chỉ qua dòng tiền tự do",
    ],
    correct: 1,
    explanation: "Công ty B cần ít tiền để duy trì năng lực kinh doanh, nên phần tiền còn lại tự do hơn. Công ty A tạo tiền nhưng phải tái đầu tư nhiều chỉ để đứng yên.",
  },
];

function FCFAnimation() {
  const [ocf, setOcf] = useState(150);
  const [capex, setCapex] = useState(80);
  const fcf = ocf - capex;

  return (
    <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 space-y-5 my-6">
      <div className="text-sm font-bold text-stone-700">Dòng tiền tự do = Dòng tiền kinh doanh − Chi đầu tư tài sản</div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-stone-600">Dòng tiền kinh doanh</span>
            <span className="font-bold text-stone-700">+{ocf} tỷ</span>
          </div>
          <input type="range" min={0} max={300} value={ocf} onChange={e => setOcf(+e.target.value)} className="w-full accent-emerald-600" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-stone-600">Chi đầu tư tài sản dài hạn</span>
            <span className="font-bold text-stone-700">−{capex} tỷ</span>
          </div>
          <input type="range" min={0} max={250} value={capex} onChange={e => setCapex(+e.target.value)} className="w-full accent-rose-500" />
        </div>
      </div>

      {/* Center-zero bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-stone-500">
          <span>Âm nhiều</span><span>Điểm 0</span><span>Dương nhiều</span>
        </div>
        <div className="h-8 bg-stone-100 rounded-full relative overflow-hidden">
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-stone-300 z-10" />
          {fcf >= 0
            ? <div className="absolute inset-y-1 rounded-full bg-stone-50 transition-all duration-500" style={{ left: "50%", width: `${Math.min(48, (fcf / 200) * 48)}%` }} />
            : <div className="absolute inset-y-1 rounded-full bg-stone-50 transition-all duration-500" style={{ right: "50%", width: `${Math.min(48, (Math.abs(fcf) / 200) * 48)}%` }} />}
        </div>
      </div>

      <div className={`rounded-2xl p-4 border-2 text-center ${fcf >= 0 ? "bg-stone-50 border-stone-200" : "bg-stone-50 border-stone-200"}`}>
        <div className="text-xs text-stone-500 mb-1">Dòng tiền tự do</div>
        <div className={`text-3xl font-bold ${fcf >= 0 ? "text-stone-700" : "text-stone-700"}`}>{fcf > 0 ? "+" : ""}{fcf} tỷ</div>
        <div className="text-sm mt-1 text-stone-500">
          {fcf > 100 ? "Dư tiền nhiều - có thể trả cổ tức, mua lại cổ phiếu hoặc mua công ty khác" :
           fcf > 0 ? "Dương - doanh nghiệp tự nuôi được mình" :
           fcf > -50 ? "Âm nhẹ - đang đầu tư, cần theo dõi" :
           "Âm sâu - có thể cần huy động vốn bên ngoài"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <button onClick={() => { setOcf(200); setCapex(50); }} className="border border-stone-200 rounded-xl p-2 hover:bg-stone-50 text-stone-600 text-xs">Công ty phần mềm<br/><span className="text-stone-500">Tạo tiền cao, đầu tư tài sản thấp</span></button>
        <button onClick={() => { setOcf(300); setCapex(280); }} className="border border-stone-200 rounded-xl p-2 hover:bg-stone-50 text-stone-600 text-xs">Nhà máy sản xuất<br/><span className="text-stone-500">Tạo tiền cao nhưng phải đầu tư lớn</span></button>
      </div>
    </div>
  );
}

export default function FreeCashFlowPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-8 text-stone-700 leading-relaxed">

        <section className="space-y-4">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-blue-800 mb-2">Hiểu nhanh</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              Dòng tiền tự do là số tiền doanh nghiệp còn lại sau khi đã chi phần cần thiết để duy trì và phát triển hoạt động. Lãi trên giấy chưa đủ; quan trọng là cuối cùng còn bao nhiêu tiền thật.
            </p>
          </div>
          <h2 className="text-xl font-bold text-stone-900">Vấn đề với lợi nhuận ròng</h2>
          <p>Sau khi hiểu dòng tiền kinh doanh, bạn biết rằng lợi nhuận không giống tiền mặt. Nhưng ngay cả dòng tiền kinh doanh cũng chưa phải câu trả lời cuối cùng. Một doanh nghiệp tạo ra 500 tỷ tiền từ kinh doanh nhưng phải chi 480 tỷ mua máy móc mới thì thực ra còn lại rất ít tiền để làm việc khác.</p>
          <p>Đây là lý do <strong>dòng tiền tự do</strong> ra đời.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Công thức đơn giản</h2>
          <p>Dòng tiền tự do là tiền mặt <em>thực sự tự do</em> - sau khi doanh nghiệp đã đầu tư những gì cần thiết để duy trì và phát triển hoạt động kinh doanh.</p>
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
            <div className="text-sm font-bold text-stone-700 mb-3">Câu chuyện ThanhTech - phần mềm kế toán</div>
            {[
              { icon: "⚙️", text: "Dòng tiền kinh doanh năm nay: +200 tỷ (khách hàng trả tiền tốt, chi phí thấp)" },
              { icon: "🖥️", text: "Chi đầu tư tài sản: −180 tỷ (nâng cấp máy chủ, mua trung tâm dữ liệu mới)" },
              { icon: "💸", text: "Dòng tiền tự do = 200 − 180 = 20 tỷ - chỉ còn 20 tỷ để trả cổ tức hay đầu tư khác" },
              { icon: "", text: "Báo cáo lãi 150 tỷ - nhưng tiền tự do thực chỉ có 20 tỷ" },
            ].map(r => (
              <div key={r.text} className="flex items-start gap-3 text-sm text-stone-600 py-1.5 border-b border-stone-100 last:border-0">
                <span className="text-lg flex-shrink-0">{r.icon}</span>{r.text}
              </div>
            ))}
          </div>
        </section>

        <FCFAnimation />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Vì sao nhà đầu tư thích nhìn dòng tiền tự do?</h2>
          <p>Warren Buffett hay nói về tiền mà chủ sở hữu thực sự có thể rút ra mà không làm yếu doanh nghiệp. Về cơ bản, đó chính là dòng tiền tự do.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "📋", title: "Lợi nhuận ròng", items: ["Bị ảnh hưởng bởi khấu hao và ghi nhận kế toán", "Khác nhau tùy phương pháp kế toán", "Chưa phản ánh nhu cầu đầu tư tài sản"], color: "bg-stone-50 border-stone-200 text-stone-700" },
              { icon: "💰", title: "Dòng tiền tự do", items: ["Gần với tiền mặt thực hơn", "Phản ánh đúng nhu cầu đầu tư", "Là nền tảng của nhiều cách định giá"], color: "bg-stone-50 border-stone-200 text-stone-700" },
            ].map(c => (
              <div key={c.title} className={`rounded-2xl border p-4 ${c.color}`}>
                <div className="font-bold text-sm mb-2">{c.icon} {c.title}</div>
                {c.items.map(t => <div key={t} className="text-xs opacity-80 flex gap-2 mt-1"><span>•</span>{t}</div>)}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Dòng tiền tự do âm có phải lúc nào cũng xấu?</h2>
          <p>Không. Dòng tiền tự do âm có hai nguyên nhân hoàn toàn khác nhau:</p>
          <div className="space-y-3">
            {[
              { icon: "🚀", title: "Âm vì đầu tư tăng trưởng", desc: "Doanh nghiệp đang chi mạnh để mở rộng. Điều này có thể chấp nhận được nếu khoản đầu tư tạo ra dòng tiền tốt hơn sau này.", color: "bg-stone-50 border-stone-200 text-stone-700" },
              { icon: "💀", title: "Âm vì kinh doanh yếu", desc: "Nếu dòng tiền kinh doanh âm và vẫn phải chi đầu tư lớn, công ty đang đốt tiền. Cần nhìn xu hướng nhiều năm và lý do cụ thể.", color: "bg-stone-50 border-stone-200 text-stone-700" },
            ].map(r => (
              <div key={r.title} className={`rounded-2xl border p-4 ${r.color}`}>
                <div className="font-bold text-sm mb-1">{r.icon} {r.title}</div>
                <p className="text-sm opacity-90">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Vinamilk & FPT - so sánh tiền thật với giá cổ phiếu</h2>
          <p>Tỷ suất dòng tiền tự do = dòng tiền tự do / giá trị thị trường. Chỉ số này cho biết bạn nhận lại bao nhiêu "tiền thực" cho mỗi đồng đầu tư vào cổ phiếu:</p>
          <div className="bg-stone-900 rounded-2xl p-5 text-sm space-y-2">
            {[
              { co: "Vinamilk (VNM)", fcf: "~2,500 tỷ", mc: "~80,000 tỷ", yield: "~3.1%", note: "Consumer defensive - FCF yield thấp vì PE cao" },
              { co: "FPT Corp", fcf: "~3,000 tỷ", mc: "~120,000 tỷ", yield: "~2.5%", note: "Tech growth - thị trường trả premium" },
            ].map(r => (
              <div key={r.co} className="border-b border-stone-800 pb-3 last:border-0">
                <div className="text-white font-bold">{r.co}</div>
                <div className="text-stone-500 text-xs mt-1">Dòng tiền tự do {r.fcf} / Giá trị thị trường {r.mc} → Tỷ suất {r.yield}</div>
                <div className="text-stone-500 text-xs">{r.note}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
          <h3 className="font-bold text-stone-700 mb-3"> 3 điều cần nhớ</h3>
          <div className="space-y-2">
            {[
              "Dòng tiền tự do = dòng tiền kinh doanh − chi đầu tư tài sản.",
              "Đây là số tiền gần với tiền thật mà doanh nghiệp còn lại sau khi duy trì hoạt động.",
              "Dòng tiền tự do âm không luôn xấu; phải xem âm vì tăng trưởng hay vì kinh doanh yếu.",
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
