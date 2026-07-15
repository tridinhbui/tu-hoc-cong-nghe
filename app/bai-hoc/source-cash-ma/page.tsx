"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 15, day: 15, accent: "emerald",
  title: "Source of Cash trong M&A",
  subtitle: "Tiền mua lại doanh nghiệp đến từ đâu?",
  duration: "8 phút", difficulty: "Khó", emoji: "💼",
  nextSlug: "synergy-ma", nextTitle: "Synergy trong M&A",
};

const quiz: QuizQuestion[] = [
  {
    question: "Trong Leveraged Buyout (LBO), 'leverage' đề cập đến điều gì?",
    options: [
      "Đòn bẩy thương lượng của bên mua",
      "Sử dụng nợ vay chiếm phần lớn vốn mua lại, với tài sản/cash flow của target làm collateral",
      "Khả năng tăng giá sau khi mua",
      "Phương pháp định giá doanh nghiệp",
    ],
    correct: 1,
    explanation: "LBO dùng leverage (nợ) để amplify equity return. PE fund bỏ 30-40% equity, còn lại 60-70% là debt được tài trợ bởi lender (thường là bank và institutional investors).",
  },
  {
    question: "All-cash deal vs all-stock deal: bên bán thích deal nào hơn về mặt thuế?",
    options: [
      "All-cash - nhận tiền ngay, chắc chắn",
      "All-stock - deferral thuế capital gain cho đến khi bán cổ phiếu nhận được",
      "Hai deal ngang nhau về thuế",
      "Phụ thuộc vào jurisdiction",
    ],
    correct: 1,
    explanation: "Stock-for-stock deal trong nhiều jurisdiction được xử lý như tax-free reorganization - bên bán không phải trả thuế capital gain ngay, chỉ trả khi bán cổ phiếu nhận được từ bên mua.",
  },
  {
    question: "Accretive deal là gì?",
    options: [
      "Deal được thực hiện nhanh chóng",
      "EPS của bên mua tăng sau khi mua lại (earnings contribution > dilution cost)",
      "Deal có synergy cao",
      "Bên bán đồng ý bán với giá thấp hơn market",
    ],
    correct: 1,
    explanation: "Accretive: EPS post-deal > EPS pre-deal. Dilutive: ngược lại. Trong stock deal, bên mua phát hành cổ phiếu mới (dilution) - deal accretive khi earnings từ target bù đắp được dilution.",
  },
  {
    question: "Tại sao PE fund dùng LBO thay vì all-equity deal?",
    options: [
      "Để tiết kiệm tiền mặt",
      "Debt magnifies equity return: cùng EBITDA growth nhưng equity return cao hơn nhiều lần",
      "Lender yêu cầu PE phải dùng debt",
      "All-equity deal không được phép trong PE",
    ],
    correct: 1,
    explanation: "Ví dụ: mua 1.000 tỷ. All-equity: sau 5 năm bán 1.500 tỷ → return 50%. LBO (300 tỷ equity + 700 tỷ debt, sau 5 năm trả 400 tỷ nợ, bán 1.500 tỷ): equity return = (1.500-300)/300 - 1 = 300%. Leverage amplifies return.",
  },
  {
    question: "Earnout trong M&A là gì?",
    options: [
      "Khoản tiền bên bán phải trả nếu business không đạt target",
      "Phần giá mua phụ thuộc vào performance tương lai của target",
      "Lãi suất trên deferred payment",
      "Cổ phiếu bên mua tặng cho management target",
    ],
    correct: 1,
    explanation: "Earnout = một phần của deal consideration được trả sau dựa trên performance metrics (revenue, EBITDA). Dùng khi bên mua và bên bán không đồng ý về giá trị tương lai - chia sẻ rủi ro.",
  },
];

function FundingStructure() {
  const [debtPct, setDebtPct] = useState(60);
  const equityPct = 100 - debtPct;
  const dealSize = 1000;
  const debt = (debtPct / 100) * dealSize;
  const equity = (equityPct / 100) * dealSize;

  const exitMultiple = 10;
  const entryEbitda = 80;
  const exitEbitda = entryEbitda * 1.5;
  const exitEV = exitMultiple * exitEbitda;
  const remainingDebt = debt * 0.5;
  const exitEquity = exitEV - remainingDebt;
  const moic = exitEquity / equity;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-4 text-sm">⚙️ LBO Capital Structure Simulator</h3>
      <div className="mb-4">
        <label className="text-xs font-semibold text-stone-600 block mb-1">Tỷ lệ Debt ({debtPct}% / {equityPct}% equity)</label>
        <input type="range" min={20} max={80} value={debtPct} onChange={e => setDebtPct(+e.target.value)} className="w-full accent-emerald-500" />
      </div>

      <div className="bg-white rounded-xl p-4 mb-4">
        <div className="font-semibold text-stone-600 text-xs mb-3">Deal Size: {dealSize} tỷ</div>
        <div className="h-8 rounded-lg overflow-hidden flex mb-3">
          <div className="bg-stone-50 flex items-center justify-center text-white text-xs font-bold transition-all" style={{ width: `${equityPct}%` }}>
            {equityPct}% Equity
          </div>
          <div className="bg-stone-600 flex items-center justify-center text-white text-xs font-bold transition-all" style={{ width: `${debtPct}%` }}>
            {debtPct}% Debt
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center text-sm">
          <div className="bg-stone-50 rounded-lg p-2">
            <div className="text-stone-700 font-bold">{equity.toFixed(0)} tỷ</div>
            <div className="text-xs text-stone-500">Equity (PE fund)</div>
          </div>
          <div className="bg-stone-50 rounded-lg p-2">
            <div className="text-stone-700 font-bold">{debt.toFixed(0)} tỷ</div>
            <div className="text-xs text-stone-500">Debt (bank/bond)</div>
          </div>
        </div>
      </div>

      <div className="bg-stone-800 rounded-xl p-4">
        <div className="text-xs font-semibold text-stone-500 mb-2">Sau 5 năm (giả định EBITDA +50%, trả 50% nợ):</div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-stone-300">Exit EV ({exitMultiple}x × {exitEbitda} tỷ EBITDA)</span>
          <span className="text-white font-bold">{exitEV.toFixed(0)} tỷ</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-stone-300">Remaining Debt</span>
          <span className="text-stone-700">−{remainingDebt.toFixed(0)} tỷ</span>
        </div>
        <div className="flex justify-between text-sm border-t border-stone-600 pt-2">
          <span className="text-stone-700 font-bold">MOIC (equity return)</span>
          <span className="text-stone-700 font-bold text-lg">{moic.toFixed(1)}x</span>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Source of Cash trong M&A</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Tiền mua acquisition đến từ đâu - và cấu trúc nào tối ưu hóa return?</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">💰 4 nguồn vốn chính trong M&A</h3>
        <div className="space-y-3">
          {[
            {
              type: "Cash on Hand", icon: "💵",
              desc: "Dùng tiền mặt sẵn có trên bảng cân đối. Đơn giản nhất, không dilute shareholders.",
              example: "Apple mua lại startup AI bằng cash reserve hàng trăm tỷ USD",
              pro: "Không dilution, execution nhanh", con: "Cơ hội cost cao nếu có use tốt hơn",
            },
            {
              type: "Debt Financing", icon: "",
              desc: "Vay ngân hàng hoặc phát hành bond để tài trợ acquisition. Dùng leverage để amplify return.",
              example: "LBO: PE fund vay 60-70% deal size từ bank syndicate",
              pro: "Leverage tăng equity return, lãi được khấu trừ thuế", con: "Tăng rủi ro tài chính, ICR phải maintain",
            },
            {
              type: "Stock Consideration", icon: "",
              desc: "Phát hành cổ phiếu mới của bên mua để trả cho bên bán. Bên bán trở thành cổ đông.",
              example: "Merger of equals: hai công ty lớn sáp nhập, trao đổi cổ phiếu",
              pro: "Không cần tiền mặt, có thể tax-advantaged cho bên bán", con: "Dilute existing shareholders",
            },
            {
              type: "Earnout + Hybrid", icon: "🔗",
              desc: "Kết hợp cash + stock + earnout (phần trả thêm nếu đạt KPI tương lai).",
              example: "Mua startup: 70% cash khi close + 30% earnout sau 2 năm nếu đạt revenue target",
              pro: "Bridge valuation gap giữa bên mua và bên bán", con: "Phức tạp trong thực thi và monitoring",
            },
          ].map(s => (
            <div key={s.type} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{s.icon}</span>
                <span className="font-bold text-stone-800">{s.type}</span>
              </div>
              <p className="text-stone-600 text-sm mb-2">{s.desc}</p>
              <div className="bg-white rounded-lg p-2 mb-2 text-xs text-stone-500 italic">{s.example}</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex gap-1"><span className="text-stone-700"></span><span className="text-stone-600">{s.pro}</span></div>
                <div className="flex gap-1"><span className="text-stone-700">✗</span><span className="text-stone-600">{s.con}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FundingStructure />

      <section>
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">📋 Checklist khi phân tích deal financing</h3>
        <div className="space-y-2">
          {[
            "Bên mua có đủ tiền/capacity để thực hiện deal không?",
            "Debt/EBITDA post-deal sẽ là bao nhiêu? Lender comfortable không?",
            "Deal accretive hay dilutive cho EPS bên mua?",
            "Tax implications cho cả hai bên?",
            "Integration cost và synergy realization timeline?",
          ].map((c, i) => (
            <div key={i} className="flex gap-3 bg-stone-50 rounded-lg p-3 text-sm border border-stone-200">
              <span className="w-5 h-5 bg-stone-50 text-stone-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
              <span className="text-stone-700">{c}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
