"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 39, day: 39, accent: "amber",
  title: "Inventory — Hàng Tồn Kho",
  subtitle: "Inventory Turnover, DSI, DOH và liên kết với Supply Chain",
  duration: "6 phút", difficulty: "Trung bình", emoji: "📦",
  nextSlug: "post-ipo-dividend", nextTitle: "Post-IPO: Nên Trả Cổ Tức?",
};

const quiz: QuizQuestion[] = [
  {
    question: "Công ty có COGS = 720M USD, Average Inventory = 120M USD. Inventory Turnover bằng bao nhiêu?",
    options: ["4x", "5x", "6x", "8x"],
    correct: 2,
    explanation: "Inventory Turnover = COGS / Average Inventory = 720 / 120 = 6x. Nghĩa là trong năm, công ty đã 'thay mới' toàn bộ lượng tồn kho 6 lần. Turnover cao = hàng bán nhanh, vốn lưu thông tốt.",
  },
  {
    question: "Công ty có Average Inventory = 100M, COGS = 730M. Days on Hand (DOH/DSI) gần bằng bao nhiêu?",
    options: ["30 ngày", "50 ngày", "73 ngày", "100 ngày"],
    correct: 1,
    explanation: "DOH = Average Inventory / (COGS / 365) = 100 / (730/365) = 100 / 2 = 50 ngày. Hoặc: DOH = 365 / Inventory Turnover = 365 / (730/100) = 365 / 7.3 ≈ 50 ngày. Tức trung bình 50 ngày từ khi hàng vào kho đến khi bán.",
  },
  {
    question: "Công ty tăng DOH từ 40 ngày lên 70 ngày, Gross Margin ổn định, và chủ động mua nguyên liệu trước mùa cao điểm. Giải thích hợp lý nhất?",
    options: [
      "Doanh nghiệp đang bán chậm",
      "Công ty đang quản lý tồn kho kém",
      "Công ty chủ động tăng inventory để giảm rủi ro nguồn cung",
      "Doanh nghiệp chắc chắn gặp vấn đề dòng tiền",
    ],
    correct: 2,
    explanation: "DOH tăng không luôn xấu. Context là key: nếu Gross Margin ổn định (không phải bán rẻ để xả hàng) + công ty có lý do chiến lược (mùa cao điểm, supply chain risk) → đây là safety stock build-up, không phải inventory deterioration.",
  },
  {
    question: "Một nhà máy: Demand 100 units/ngày, Lead time 8 ngày, Safety stock 200 units. Reorder Point (ROP) là?",
    options: ["800", "900", "1000", "1200"],
    correct: 1,
    explanation: "ROP = (Demand × Lead Time) + Safety Stock = (100 × 8) + 200 = 800 + 200 = 1.000. Khi tồn kho xuống đến 1.000 units → đặt hàng ngay. 200 units safety stock là buffer để cover demand variability trong lead time.",
  },
  {
    question: "Doanh số tăng 5%, nhà phân phối tăng đặt hàng 25%, nhà máy tăng sản xuất 40%. Hiện tượng này gọi là?",
    options: ["Just-in-Time", "Service Level", "Safety Stock", "Bullwhip Effect"],
    correct: 3,
    explanation: "Bullwhip Effect: amplification của demand signal dọc theo supply chain. Retail +5% → distributor +25% → manufacturer +40%. Nguyên nhân: overreaction, batch ordering, forecast error, promotion effects. Giải pháp: demand signal sharing (VMI), Collaborative Planning (CPFR).",
  },
];

function InventorySimulator() {
  const [cogs, setCogs] = useState(730);
  const [avgInv, setAvgInv] = useState(100);

  const turnover = avgInv > 0 ? cogs / avgInv : 0;
  const doh = turnover > 0 ? 365 / turnover : 0;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-1 text-sm">📦 Inventory Metrics Calculator</h3>
      <p className="text-xs text-stone-500 mb-4">Điều chỉnh COGS và Average Inventory để tính Turnover và DOH</p>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">COGS ({cogs}M)</label>
          <input type="range" min={100} max={2000} step={10} value={cogs} onChange={e => setCogs(+e.target.value)} className="w-full accent-amber-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Avg Inventory ({avgInv}M)</label>
          <input type="range" min={10} max={500} step={5} value={avgInv} onChange={e => setAvgInv(+e.target.value)} className="w-full accent-amber-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl border border-stone-200 p-4 text-center">
          <div className="text-xs text-stone-400 mb-1">Inventory Turnover</div>
          <div className="font-bold text-2xl text-stone-700">{turnover.toFixed(1)}x</div>
          <div className="text-xs text-stone-400 mt-1">{turnover > 8 ? "Nhanh — lean inventory" : turnover > 4 ? "Trung bình" : "Chậm — xem xét lại"}</div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4 text-center">
          <div className="text-xs text-stone-400 mb-1">Days on Hand (DOH)</div>
          <div className="font-bold text-2xl text-stone-700">{doh.toFixed(0)} ngày</div>
          <div className="text-xs text-stone-400 mt-1">{doh < 30 ? "Rất nhanh" : doh < 60 ? "Bình thường" : "Cần kiểm tra context"}</div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Inventory — Hàng Tồn Kho</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Current asset trên Balance Sheet — nhưng quản lý kém thì trở thành gánh nặng</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📐 2 chỉ số cốt lõi</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-stone-50 text-white rounded-xl p-4 text-center">
            <div className="font-bold text-lg mb-1">Inventory Turnover</div>
            <div className="font-mono text-sm text-stone-700 mb-2">COGS / Average Inventory</div>
            <p className="text-stone-700 text-xs">1 năm thay mới hàng tồn kho bao nhiêu lần</p>
          </div>
          <div className="bg-stone-50 text-white rounded-xl p-4 text-center">
            <div className="font-bold text-lg mb-1">Days on Hand (DOH/DSI)</div>
            <div className="font-mono text-sm text-stone-700 mb-2">365 / Inventory Turnover</div>
            <p className="text-stone-700 text-xs">Hàng nằm trong kho bao nhiêu ngày trước khi bán</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Ví dụ: Inventory Turnover = 5</h3>
        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-sm">
          <p className="text-stone-700 mb-2">→ Trung bình trong năm, công ty đã thay mới lượng tồn kho <strong>5 lần</strong></p>
          <p className="text-stone-600 mb-2">→ DOH = 365 / 5 = <strong>73 ngày</strong> — trung bình mỗi sản phẩm nằm kho 73 ngày trước khi được bán</p>
          <p className="text-stone-500 text-xs italic">Lưu ý: DSI cao hay thấp còn tùy chiến lược. Retail fashion: 30-60 ngày. Luxury goods: 180+ ngày. Aerospace: hơn 1 năm.</p>
        </div>
      </section>

      <InventorySimulator />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🔗 Supply Chain Link: Forecast → Inventory → Cash Flow</h3>
        <div className="space-y-2">
          {[
            { step: "Demand Forecast", desc: "Dự báo demand → quyết định cần đặt bao nhiêu hàng" },
            { step: "Inventory Level", desc: "Đặt hàng quá nhiều → DOH cao → cash locked. Quá ít → stockout → lost sales" },
            { step: "Days on Hand (DOH/DSI)", desc: "KPI cho thấy balance giữa service level và cash efficiency" },
            { step: "Working Capital", desc: "WC = Inventory + AR − AP. Inventory cao → WC cao → cash drain" },
            { step: "Cash Flow", desc: "Cash Conversion Cycle = DIO + DSO − DPO. Lower = better cash conversion" },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3 bg-stone-50 rounded-lg p-3 border border-stone-200">
              <div className="w-24 text-xs font-bold text-stone-700 flex-shrink-0 pt-0.5">{s.step}</div>
              <div className="text-xs text-stone-600">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">⚠️ DOH tăng: Tốt hay Xấu?</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-2 text-sm">❌ DOH tăng vì xấu</div>
            <ul className="space-y-1">
              {["Demand yếu — hàng bán chậm", "Sản phẩm lỗi thời / không còn relevant", "Cần giảm giá để xả hàng → Gross Margin giảm", "Quản lý forecast kém"].map((i, k) => (
                <li key={k} className="text-xs text-stone-600 flex gap-1.5"><span className="text-stone-700">·</span>{i}</li>
              ))}
            </ul>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-2 text-sm"> DOH tăng là chiến lược</div>
            <ul className="space-y-1">
              {["Build safety stock trước mùa cao điểm", "Phòng đứt gãy supply chain", "Mua trước khi giá nguyên liệu tăng", "Gross Margin vẫn ổn định → không phải bán rẻ"].map((i, k) => (
                <li key={k} className="text-xs text-stone-600 flex gap-1.5"><span className="text-stone-700">·</span>{i}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-xs text-stone-400 mt-2 italic text-center">Signal là DOH + Gross Margin cùng nhau. DOH tăng + GM giảm = bad. DOH tăng + GM stable = context-dependent.</p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">🌊 Bullwhip Effect — cạm bẫy trong Supply Chain</h3>
        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
          <div className="space-y-2 font-mono text-xs">
            {[
              { actor: "Retail Customer", change: "+5%", color: "emerald" },
              { actor: "Retailer", change: "+15%", color: "amber" },
              { actor: "Distributor", change: "+25%", color: "orange" },
              { actor: "Manufacturer", change: "+40%", color: "rose" },
            ].map(s => (
              <div key={s.actor} className="flex items-center gap-2">
                <div className="w-28 text-stone-500 text-xs">{s.actor}</div>
                <div className={`h-3 bg-${s.color}-400 rounded`} style={{ width: `${parseInt(s.change) * 4}px` }} />
                <span className={`text-${s.color}-600 font-bold`}>{s.change}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-stone-500 mt-3 italic">Mỗi level trong supply chain overorder vì không chắc chắn về demand → amplification effect. Giải pháp: real-time demand sharing, VMI (Vendor Managed Inventory).</p>
        </div>
      </section>
    </LessonPageLayout>
  );
}
