"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 5, day: 5, accent: "teal",
  title: "Các Loại Debt Cần Biết",
  subtitle: "9 loại nợ, capital structure và thứ tự ưu tiên thanh toán",
  duration: "8 phút", difficulty: "Trung bình", emoji: "",
  nextSlug: "bao-cao-luu-chuyen-tien-te", nextTitle: "Day 6: Báo Cáo LCTT",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Tại sao Secured Debt có lãi suất thấp hơn Unsecured Debt?",
    options: [
      "Vì ngân hàng thích công ty lớn hơn",
      "Vì có tài sản đảm bảo — nếu vỡ nợ, chủ nợ có thể thu hồi tài sản → rủi ro thấp hơn → lãi thấp hơn",
      "Vì ngân hàng được nhà nước hỗ trợ lãi suất",
      "Vì secured debt có kỳ hạn ngắn hơn",
    ],
    correct: 1,
    explanation: "Risk-return luôn tỷ lệ thuận. Secured debt có tài sản đảm bảo → rủi ro thu hồi thấp → người cho vay chấp nhận lãi thấp hơn. Đây là nguyên tắc cốt lõi của tín dụng.",
  },
  {
    question: "Trong capital structure waterfall, thứ tự ưu tiên đúng là:",
    options: [
      "Equity → Senior Secured → Senior Unsecured → Subordinated",
      "Senior Secured → Senior Unsecured → Subordinated → Equity",
      "Subordinated → Senior → Equity → Secured",
      "Equity → Mezzanine → Senior → Secured",
    ],
    correct: 1,
    explanation: "Khi phá sản, Senior Secured được trả trước (có tài sản đảm bảo + ưu tiên cao), sau đó Senior Unsecured, rồi Subordinated/Mezz, cuối cùng mới đến Equity (cổ đông). Thứ tự này quyết định lãi suất của từng lớp.",
  },
  {
    question: "Revolving Credit Facility (Revolver) khác Term Loan ở điểm gì?",
    options: [
      "Revolver có lãi suất cố định, Term Loan lãi suất thả nổi",
      "Revolver là hạn mức quay vòng (rút ra trả lại rút tiếp), Term Loan là khoản vay một lần không rút lại được",
      "Revolver chỉ dành cho doanh nghiệp nhà nước",
      "Term Loan không tính lãi, Revolver có tính lãi",
    ],
    correct: 1,
    explanation: "Revolver giống thẻ tín dụng doanh nghiệp — có hạn mức tối đa, rút khi cần, trả lại rồi rút tiếp. Linh hoạt, dùng cho vốn lưu động. Term Loan là khoản vay một lần, trả dần theo lịch cố định.",
  },
  {
    question: "Convertible Note trong startup có đặc điểm gì?",
    options: [
      "Là khoản nợ không có lãi suất",
      "Là khoản vay có thể chuyển đổi thành cổ phần ở vòng huy động vốn tiếp theo",
      "Là trái phiếu chính phủ đặc biệt",
      "Là hình thức equity không có quyền biểu quyết",
    ],
    correct: 1,
    explanation: "Convertible note là debt có thể convert thành equity ở vòng sau (thường với discount 20%). Win-win: startup vay được tiền lãi thấp hơn, investor được upside nếu startup tăng trưởng mạnh.",
  },
  {
    question: "Mezzanine Debt phù hợp nhất trong tình huống nào?",
    options: [
      "Doanh nghiệp muốn vay lãi suất thấp nhất",
      "Khi ngân hàng không cho vay thêm nhưng PE muốn 'lấp chỗ trống' giữa senior debt và equity trong LBO",
      "Khi startup cần seed funding",
      "Khi chính phủ phát hành trái phiếu",
    ],
    correct: 1,
    explanation: "Mezzanine lấp khoảng trống trong capital structure của LBO. Ngân hàng chỉ cho vay đến một mức nhất định (senior debt). Phần còn lại muốn dùng debt thay equity → mezz với lãi 15-20% và thường có equity kicker (warrants).",
  },
];

const DEBT_TYPES = [
  { id: "secured", emoji: "🔒", name: "Secured Debt", tag: "Có tài sản đảm bảo", risk: 10, rate: 5, color: "text-stone-700 bg-stone-50 border-stone-200", desc: "Người vay thế chấp tài sản cụ thể (nhà máy, bất động sản, phải thu). Nếu không trả được, chủ nợ thu hồi tài sản đó. Rủi ro thấp → lãi suất thấp nhất trong cấu trúc vốn.", eg: "Vay ngân hàng thế chấp sổ đỏ, vay mua ô tô thế chấp xe" },
  { id: "unsecured", emoji: "🔓", name: "Unsecured Debt", tag: "Không tài sản đảm bảo", risk: 30, rate: 8, color: "text-stone-700 bg-stone-50 border-stone-200", desc: "Không có tài sản cụ thể làm đảm bảo. Nếu vỡ nợ, chủ nợ phải xếp hàng tranh chấp tài sản còn lại. Rủi ro cao hơn → lãi cao hơn.", eg: "Thẻ tín dụng, trái phiếu doanh nghiệp không có tài sản đảm bảo" },
  { id: "senior", emoji: "👑", name: "Senior Debt", tag: "Ưu tiên trả trước", risk: 15, rate: 6, color: "text-stone-700 bg-stone-50 border-stone-200", desc: "Được ưu tiên thanh toán trước tất cả trong thứ tự phân phối khi phá sản. Không nhất thiết có tài sản đảm bảo — senior đề cập đến thứ tự ưu tiên, không phải loại đảm bảo.", eg: "Term loan từ ngân hàng thường là senior secured — vừa có tài sản vừa ưu tiên" },
  { id: "sub", emoji: "", name: "Subordinated Debt", tag: "Đứng sau senior", risk: 50, rate: 12, color: "text-stone-700 bg-stone-50 border-stone-200", desc: "Chỉ được thanh toán sau khi senior debt đã được trả đầy đủ. Trong LBO, thường là junior bonds hoặc PIK notes. Rủi ro thực sự cao hơn → spread 3-5% so với senior.", eg: "Junior bonds, PIK notes, second-lien loans trong LBO" },
  { id: "revolver", emoji: "🔄", name: "Revolving Credit (Revolver)", tag: "Hạn mức quay vòng", risk: 20, rate: 7, color: "text-cyan-700 bg-cyan-50 border-cyan-200", desc: "Như thẻ tín dụng cho doanh nghiệp. Có hạn mức tối đa, rút ra khi cần, trả lại rồi có thể rút tiếp. Linh hoạt nhất trong các loại debt, thường dùng cho vốn lưu động.", eg: "Retailer dùng revolver nhập hàng trước Tết, sau bán xong trả lại" },
  { id: "term", emoji: "📅", name: "Term Loan", tag: "Vay có kỳ hạn cố định", risk: 25, rate: 7, color: "text-stone-700 bg-stone-50 border-stone-200", desc: "Vay một lần, trả dần theo lịch định sẵn (monthly/quarterly). Không rút lại được sau khi trả. Dùng để mua tài sản cố định hoặc tài trợ M&A.", eg: "Vay 5 năm mua dây chuyền sản xuất, trả gốc + lãi mỗi quý" },
  { id: "conv", emoji: "🔀", name: "Convertible Debt", tag: "Chuyển được thành cổ phần", risk: 45, rate: 6, color: "text-stone-700 bg-stone-50 border-stone-200", desc: "Người cho vay có quyền chuyển khoản nợ thành cổ phần. Lãi thấp hơn debt thông thường nhưng investor được upside. Phổ biến ở startup vì tránh định giá sớm.", eg: "Startup huy động $1M convertible note, lãi 6%, convert ở Series A với 20% discount" },
  { id: "bond", emoji: "🏛️", name: "Bond (Trái phiếu)", tag: "Vay từ thị trường vốn", risk: 25, rate: 9, color: "text-stone-700 bg-stone-50 border-stone-200", desc: "Doanh nghiệp/chính phủ phát hành ra thị trường, nhiều nhà đầu tư mua. Lãi coupon cố định, hoàn gốc khi đáo hạn. Phân tán rủi ro, không cần qua ngân hàng.", eg: "Vingroup phát hành trái phiếu 3,000 tỷ lãi 10%/năm kỳ hạn 3 năm" },
  { id: "mezz", emoji: "🔶", name: "Mezzanine Debt", tag: "Lai giữa nợ và vốn", risk: 65, rate: 18, color: "text-stone-700 bg-stone-50 border-stone-200", desc: "Đứng giữa senior debt và equity. Lãi suất rất cao (15-25%) hoặc có equity kicker (warrants). Phổ biến trong LBO để 'lấp chỗ trống' khi ngân hàng không cho vay thêm.", eg: "PE dùng mezz trong LBO: senior 50% + mezz 20% + equity 30%" },
];

function CapitalStructureAnimation() {
  const [scenario, setScenario] = useState<"normal" | "distress">("normal");
  const assets = scenario === "normal" ? 600 : 280;
  const layers = [
    { name: "Senior Secured", amount: 200, color: "bg-stone-50", text: "text-stone-700" },
    { name: "Senior Unsecured / Bond", amount: 150, color: "bg-stone-50", text: "text-stone-700" },
    { name: "Subordinated / Mezz", amount: 100, color: "bg-stone-50", text: "text-stone-700" },
    { name: "Equity (Cổ đông)", amount: 50, color: "bg-stone-50", text: "text-stone-700" },
  ];
  let remaining = assets;
  const payouts = layers.map(l => { const p = Math.min(remaining, l.amount); remaining = Math.max(0, remaining - l.amount); return p; });

  return (
    <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 space-y-4 my-6">
      <div className="text-sm font-bold text-stone-700">🏗️ Capital Structure Waterfall — Ai được trả khi phá sản?</div>
      <div className="bg-stone-100 rounded-2xl p-1.5 flex gap-1.5">
        {(["normal", "distress"] as const).map(s => (
          <button key={s} onClick={() => setScenario(s)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${scenario === s ? "bg-white text-stone-800 shadow-sm" : "text-stone-500"}`}>
            {s === "normal" ? " Bình thường (Tài sản 600 tỷ)" : "🔥 Khó khăn (Tài sản 280 tỷ)"}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {layers.map((layer, i) => {
          const pct = (payouts[i] / layer.amount) * 100;
          const fullPaid = payouts[i] >= layer.amount;
          return (
            <div key={layer.name} className={`rounded-2xl p-4 border-2 transition-all ${fullPaid ? "bg-stone-50 border-stone-100" : "bg-stone-50 border-stone-200"}`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`font-semibold text-sm ${layer.text}`}>{layer.name}</span>
                <span className={`text-sm font-bold ${fullPaid ? "text-stone-700" : "text-stone-700"}`}>
                  {payouts[i]}/{layer.amount} tỷ {fullPaid ? "" : "❌"}
                </span>
              </div>
              <div className="h-3 bg-stone-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${fullPaid ? layer.color : "bg-stone-50"}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className={`rounded-2xl p-4 text-sm font-medium border-2 ${scenario === "normal" ? "bg-stone-50 border-stone-200 text-stone-700" : "bg-stone-50 border-stone-200 text-stone-700"}`}>
        {scenario === "normal"
          ? " Tài sản 600 tỷ > Tổng nợ 450 tỷ → Tất cả được trả đầy đủ. Cổ đông nhận thêm 150 tỷ."
          : "🔥 Tài sản 280 tỷ < Tổng nợ 450 tỷ → Senior secured đủ, từ tầng 3 trở đi: không còn tiền. Cổ đông mất trắng."}
      </div>
    </div>
  );
}

export default function CacLoaiDebtPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-8 text-stone-700 leading-relaxed">

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Không phải mọi khoản nợ đều giống nhau</h2>
          <p>Khi nói về "nợ" của một doanh nghiệp, hầu hết người mới bắt đầu nghĩ đó là một con số duy nhất trên bảng cân đối. Thực tế, debt là một bức tranh đa tầng với ít nhất 9 loại khác nhau — mỗi loại có <strong>rủi ro, lãi suất, và thứ tự ưu tiên</strong> hoàn toàn khác.</p>
          <p>Hiểu điều này giúp bạn: (1) đọc balance sheet đúng hơn, (2) hiểu tại sao lãi suất khác nhau, (3) biết ai bị thiệt nhất khi công ty gặp khó khăn.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">Quy tắc vàng: Risk ↔ Return</h2>
          <p>Trước khi đi vào từng loại, hãy ghi nhớ một quy tắc bất biến trong finance:</p>
          <div className="bg-stone-900 rounded-2xl p-5 text-white text-center">
            <div className="text-2xl font-bold text-stone-700 mb-2">Rủi ro càng cao → Lợi suất yêu cầu càng cao</div>
            <p className="text-stone-300 text-sm">Không ai cho vay với rủi ro cao mà chấp nhận lãi suất thấp. Đây là lý do mezzanine trả 18% trong khi senior secured chỉ 5%.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">9 loại Debt</h2>
          <div className="space-y-2">
            {DEBT_TYPES.map(d => (
              <div key={d.id} className="w-full text-left rounded-2xl border p-4 bg-white border-stone-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl flex-shrink-0">{d.emoji}</span>
                    <div>
                      <div className="font-bold text-sm text-stone-800">{d.name}</div>
                      <div className="text-xs mt-0.5 text-stone-500">{d.tag} · Lãi ~{d.rate}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <div className="h-2 w-16 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-current rounded-full" style={{ width: `${d.risk}%`, opacity: 0.5 }} />
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <p className="text-sm leading-relaxed text-stone-700">{d.desc}</p>
                  <div className="bg-stone-50 rounded-xl p-3 text-xs text-stone-500 border border-stone-100">{d.eg}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CapitalStructureAnimation />

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900">LBO — Ứng dụng thực tế của capital structure</h2>
          <p>Leveraged Buyout (LBO) là thương vụ điển hình nhất để thấy capital structure trong hành động. PE firm mua lại công ty bằng cách kết hợp nhiều tầng nợ và ít equity nhất có thể — để khuếch đại ROI cho equity.</p>
          <div className="bg-stone-900 rounded-2xl p-5 text-sm space-y-2">
            <div className="text-stone-700 text-xs font-bold uppercase tracking-widest mb-2">Cấu trúc LBO điển hình — Mua công ty 1,000 tỷ</div>
            {[
              { layer: "Senior Secured (Term Loan)", pct: "50%", amount: "500 tỷ", rate: "SOFR+300bps", color: "text-stone-700" },
              { layer: "Senior Unsecured Bond", pct: "20%", amount: "200 tỷ", rate: "~8%", color: "text-stone-700" },
              { layer: "Mezzanine / PIK", pct: "10%", amount: "100 tỷ", rate: "15-20%", color: "text-stone-700" },
              { layer: "Equity (PE Fund)", pct: "20%", amount: "200 tỷ", rate: "Target 25%+ IRR", color: "text-stone-700" },
            ].map(r => (
              <div key={r.layer} className="flex items-center gap-3 py-1.5 border-b border-stone-800 last:border-0">
                <div className={`w-1 h-8 rounded-full flex-shrink-0 ${r.layer.includes("Senior Sec") ? "bg-stone-50" : r.layer.includes("Unsec") ? "bg-stone-50" : r.layer.includes("Mezz") ? "bg-stone-50" : "bg-stone-50"}`} />
                <div className="flex-1">
                  <div className={`font-semibold text-xs ${r.color}`}>{r.layer}</div>
                  <div className="text-stone-500 text-xs">{r.pct} · {r.amount} · {r.rate}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-stone-500">PE dùng nhiều nợ để mua — nếu bán lại sau 5 năm với giá 1,500 tỷ: equity tăng từ 200 → 700 tỷ = 3.5x, tương đương ~28% IRR.</p>
        </section>

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
          <h3 className="font-bold text-stone-700 mb-3"> 3 điều cần nhớ</h3>
          <div className="space-y-2">
            {[
              "Risk ↔ Return: secured senior lãi thấp nhất, mezzanine/equity lãi cao nhất",
              "Waterfall ưu tiên: Senior Secured → Senior Unsecured → Sub → Equity — ai đứng cuối mất nhiều nhất khi phá sản",
              "Hiểu capital structure = hiểu tại sao mỗi loại nợ có giá (lãi suất) khác nhau",
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
