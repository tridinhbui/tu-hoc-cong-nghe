"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { DebtLessonCopy } from "@/lib/i18n/dictionaries/sections/bespoke-lessons";

const LESSON: LessonMeta = {
  // Id tổng hợp, KHÔNG phải id trong corpus. Trang này chưa có bài tương ứng
  // trong lib/lessons.ts nên không có id thật để ghi vào, còn id cũ (5) là id
  // của một bài Chặng 3 CÓ THẬT - nên tiến độ, XP, ghi chú và highlight của
  // trang này đều đổ sang bài đó. Xem lib/__tests__/bespoke-lesson-ids.test.ts.
  id: 9004, slug: "cac-loai-debt", day: 5, accent: "teal",
  title: "Các Loại Debt Cần Biết",
  subtitle: "9 loại nợ, capital structure và thứ tự ưu tiên thanh toán",
  duration: "8 phút", difficulty: "Trung bình", emoji: "",
  nextSlug: "bao-cao-luu-chuyen-tien-te", nextTitle: "Day 6: Báo Cáo LCTT",
};

/* i18n-ignore-start: `correct` là chỉ số vào mảng options và LessonPageLayout
   ghi `quiz_score` xuống Supabase - để nó trong từ điển là để một bản dịch sửa
   được đáp án. Câu hỏi, phương án và lời giải nằm ở
   lib/i18n/dictionaries/sections/bespoke-lessons.ts. */
const QUIZ_CORRECT = [1, 1, 1, 1, 1];
/* i18n-ignore-end */

/* i18n-ignore-start: `name` của chín loại nợ vốn ĐÃ là tiếng Anh trong bản gốc
   ("Secured Debt", "Mezzanine Debt") - chúng là thuật ngữ ngành, giống nhau ở
   cả hai ngôn ngữ, nên không thuộc về một từ điển hai ngôn ngữ. `risk` và
   `rate` là số vẽ thanh trượt; `emoji` không dịch. Phần chữ - `tag`, `desc`,
   `eg` - nằm trong `debtTypes` của từ điển, khớp THEO VỊ TRÍ với mảng này. */
const DEBT_TYPES = [
  { id: "secured", emoji: "🔒", name: "Secured Debt", risk: 10, rate: 5 },
  { id: "unsecured", emoji: "🔓", name: "Unsecured Debt", risk: 30, rate: 8 },
  { id: "senior", emoji: "👑", name: "Senior Debt", risk: 15, rate: 6 },
  { id: "sub", emoji: "", name: "Subordinated Debt", risk: 50, rate: 12 },
  { id: "revolver", emoji: "🔄", name: "Revolving Credit (Revolver)", risk: 20, rate: 7 },
  { id: "term", emoji: "📅", name: "Term Loan", risk: 25, rate: 7 },
  { id: "conv", emoji: "🔀", name: "Convertible Debt", risk: 45, rate: 6 },
  { id: "bond", emoji: "🏛️", name: "Bond", risk: 25, rate: 9 },
  { id: "mezz", emoji: "🔶", name: "Mezzanine Debt", risk: 65, rate: 18 },
];

/** Tên bốn tầng trong waterfall và trong bảng LBO. Cùng lý do với `name` ở
 *  trên: chúng là tên tầng vốn bằng tiếng Anh trong cả hai bản. */
const WATERFALL_LAYERS = [
  { name: "Senior Secured", amount: 200 },
  { name: "Senior Unsecured / Bond", amount: 150 },
  { name: "Subordinated / Mezz", amount: 100 },
  { name: "Equity", amount: 50 },
];

const LBO_ROWS = [
  { layer: "Senior Secured (Term Loan)", pct: "50%", rate: "SOFR+300bps" },
  { layer: "Senior Unsecured Bond", pct: "20%", rate: "~8%" },
  { layer: "Mezzanine / PIK", pct: "10%", rate: "15-20%" },
  { layer: "Equity (PE Fund)", pct: "20%", rate: "" },
];
/* i18n-ignore-end */

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
      <div className="text-sm font-bold text-stone-700">🏗️ Capital Structure Waterfall - Ai được trả khi phá sản?</div>
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
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Không phải mọi khoản nợ đều giống nhau</h2>
          <p>Khi nói về "nợ" của một doanh nghiệp, hầu hết người mới bắt đầu nghĩ đó là một con số duy nhất trên bảng cân đối. Thực tế, debt là một bức tranh đa tầng với ít nhất 9 loại khác nhau - mỗi loại có <strong>rủi ro, lãi suất, và thứ tự ưu tiên</strong> hoàn toàn khác.</p>
          <p>Hiểu điều này giúp bạn: (1) đọc balance sheet đúng hơn, (2) hiểu tại sao lãi suất khác nhau, (3) biết ai bị thiệt nhất khi công ty gặp khó khăn.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Quy tắc vàng: Risk ↔ Return</h2>
          <p>Trước khi đi vào từng loại, hãy ghi nhớ một quy tắc bất biến trong finance:</p>
          <div className="bg-stone-900 rounded-2xl p-5 text-white text-center">
            <div className="text-2xl font-bold text-stone-700 mb-2">Rủi ro càng cao → Lợi suất yêu cầu càng cao</div>
            <p className="text-stone-300 text-sm">Không ai cho vay với rủi ro cao mà chấp nhận lãi suất thấp. Đây là lý do mezzanine trả 18% trong khi senior secured chỉ 5%.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">9 loại Debt</h2>
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
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">LBO - Ứng dụng thực tế của capital structure</h2>
          <p>Leveraged Buyout (LBO) là thương vụ điển hình nhất để thấy capital structure trong hành động. PE firm mua lại công ty bằng cách kết hợp nhiều tầng nợ và ít equity nhất có thể - để khuếch đại ROI cho equity.</p>
          <div className="bg-stone-900 rounded-2xl p-5 text-sm space-y-2">
            <div className="text-stone-700 text-xs font-bold uppercase tracking-widest mb-2">Cấu trúc LBO điển hình - Mua công ty 1,000 tỷ</div>
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
          <p className="text-sm text-stone-500">PE dùng nhiều nợ để mua - nếu bán lại sau 5 năm với giá 1,500 tỷ: equity tăng từ 200 → 700 tỷ = 3.5x, tương đương ~28% IRR.</p>
        </section>

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
          <h3 className="font-bold text-stone-700 mb-3"> 3 điều cần nhớ</h3>
          <div className="space-y-2">
            {[
              "Risk ↔ Return: secured senior lãi thấp nhất, mezzanine/equity lãi cao nhất",
              "Waterfall ưu tiên: Senior Secured → Senior Unsecured → Sub → Equity - ai đứng cuối mất nhiều nhất khi phá sản",
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
