"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 25, day: 25, accent: "amber",
  title: "Commodity Phần 2",
  subtitle: "Supply, Demand, Inventory — 3 yếu tố định giá hàng hóa cơ bản",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🌍",
  nextSlug: "trai-phieu", nextTitle: "Trái Phiếu",
};

const quiz: QuizQuestion[] = [
  {
    question: "Điều nào có khả năng làm giá dầu tăng mạnh nhất?",
    options: [
      "US shale production tăng mạnh",
      "OPEC cắt giảm sản lượng",
      "Tồn kho dầu tăng liên tục",
      "Nhu cầu vận tải giảm",
    ],
    correct: 1,
    explanation: "OPEC cắt giảm sản lượng → supply giảm trong khi demand tương đối ổn định → giá tăng. US shale tăng, tồn kho tăng, demand giảm đều là các yếu tố gây áp lực giảm giá.",
  },
  {
    question: "Vì sao airline companies thường hedge giá dầu?",
    options: [
      "Để tăng doanh thu từ trading dầu",
      "Để giảm biến động chi phí nhiên liệu và có thể lên kế hoạch pricing vé",
      "Để tăng sản lượng dầu",
      "Để giảm thuế doanh nghiệp",
    ],
    correct: 1,
    explanation: "Jet fuel chiếm 20-30% chi phí airline. Hedge bằng oil futures cho phép airline biết trước chi phí trong 6-12 tháng → có thể price vé ổn định, bảo vệ margin kế hoạch. Đây là risk management, không phải speculation.",
  },
  {
    question: "Khi inventory commodity tăng liên tục trong khi demand yếu, điều gì thường xảy ra với giá?",
    options: [
      "Giá commodity tăng vì inventory nhiều = sản xuất nhiều = nền kinh tế mạnh",
      "Giá commodity giảm — tồn kho dư thừa tạo áp lực bán ra",
      "Biến động về 0",
      "Commodity không bị ảnh hưởng bởi inventory",
    ],
    correct: 1,
    explanation: "Inventory cao + demand yếu = supply glut. Nhà sản xuất/trader phải bán để giảm tồn kho → áp lực downside lên giá. Đây là tín hiệu bearish trong commodity analysis. Ngược lại, inventory thấp + demand cao = supply squeeze = bullish.",
  },
  {
    question: "Tại sao commodity có tính chu kỳ cao?",
    options: [
      "Vì giá commodity được quyết định bởi chính phủ",
      "Vì cung commodity cần nhiều năm để điều chỉnh (build nhà máy, mở mỏ) nhưng demand thay đổi nhanh theo cycle kinh tế",
      "Vì commodity giao dịch ở các sàn đặc biệt",
      "Vì commodity không thể tồn kho lâu",
    ],
    correct: 1,
    explanation: "Supply-side lag: mở một mỏ dầu hay xây nhà máy đồng mất 3-7 năm. Nhưng demand tăng/giảm theo GDP cycle hàng quý. Khi boom: demand tăng nhanh, supply không kịp → giá spike. Khi bust: demand sụp, supply đã build rồi không thể tắt ngay → price crash. Đây là commodity supercycle.",
  },
  {
    question: "Geopolitics ảnh hưởng đến commodity như thế nào?",
    options: [
      "Không ảnh hưởng — commodity là global market",
      "Chỉ ảnh hưởng vàng vì vàng là safe haven",
      "Xung đột ở vùng sản xuất key commodity có thể disrupt supply và spike giá (oil, wheat, nickel)",
      "Geopolitics chỉ ảnh hưởng tỷ giá, không ảnh hưởng commodity",
    ],
    correct: 2,
    explanation: "Nga-Ukraine 2022: Nga là top producer của wheat, nickel, natural gas → supply shock → wheat +40%, gas +200%, nickel +250% trong tuần đầu. Iran sanctions → oil supply giảm → giá tăng. Geopolitics là risk factor quan trọng nhất với commodity.",
  },
];

function SupplyDemandSimulator() {
  const [supply, setSupply] = useState(100);
  const [demand, setDemand] = useState(100);
  const [inventory, setInventory] = useState(50);

  const balance = demand - supply;
  const invChange = -balance * 0.3;
  const priceSignal = balance * 0.5 - (inventory - 50) * 0.2;

  const getSignal = () => {
    if (priceSignal > 15) return { label: " Bullish mạnh", color: "text-stone-700 bg-stone-50 border-stone-200" };
    if (priceSignal > 5) return { label: " Nhẹ bullish", color: "text-stone-700 bg-stone-50 border-stone-200" };
    if (priceSignal > -5) return { label: "➡️ Trung lập", color: "text-stone-700 bg-stone-50 border-stone-200" };
    if (priceSignal > -15) return { label: " Nhẹ bearish", color: "text-stone-700 bg-stone-50 border-stone-200" };
    return { label: " Bearish mạnh", color: "text-stone-700 bg-stone-50 border-stone-200" };
  };

  const signal = getSignal();

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-1 text-sm"> Commodity Market Signal Simulator</h3>
      <p className="text-xs text-stone-500 mb-4">Điều chỉnh supply, demand và inventory để xem tín hiệu giá</p>

      <div className="space-y-3 mb-5">
        {[
          { label: `Supply (${supply})`, val: supply, set: setSupply, icon: "🏭" },
          { label: `Demand (${demand})`, val: demand, set: setDemand, icon: "🛒" },
          { label: `Inventory (${inventory})`, val: inventory, set: setInventory, icon: "🏗️" },
        ].map(s => (
          <div key={s.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-stone-600">{s.icon} {s.label}</span>
            </div>
            <input type="range" min={60} max={140} value={s.val} onChange={e => s.set(+e.target.value)} className="w-full accent-amber-500" />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-4 mb-3">
        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
          <div className="text-center">
            <div className="text-xs text-stone-500 mb-0.5">Demand − Supply</div>
            <div className={`font-bold text-lg ${balance > 0 ? "text-stone-700" : balance < 0 ? "text-stone-700" : "text-stone-500"}`}>
              {balance > 0 ? "+" : ""}{balance}
            </div>
            <div className="text-xs text-stone-400">{balance > 0 ? "Thiếu hàng" : balance < 0 ? "Dư hàng" : "Cân bằng"}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-stone-500 mb-0.5">Inventory trend</div>
            <div className={`font-bold text-lg ${invChange < 0 ? "text-stone-700" : invChange > 0 ? "text-stone-700" : "text-stone-500"}`}>
              {invChange > 0 ? "+" : ""}{invChange.toFixed(0)}
            </div>
            <div className="text-xs text-stone-400">{invChange < 0 ? "Đang giảm " : "Đang tích lũy ⚠️"}</div>
          </div>
        </div>
        <div className={`rounded-xl p-3 border text-center font-bold ${signal.color}`}>
          {signal.label}
        </div>
      </div>
      <p className="text-xs text-stone-400 text-center">Price signal = f(supply/demand balance, inventory level)</p>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Commodity Phần 2 — Phân Tích Giá</h2>
      <p className="text-stone-600 text-sm mb-6 italic">3 yếu tố định giá commodity và tại sao doanh nghiệp phải hedge</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">⚙️ Cơ chế định giá cơ bản</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5 text-center mb-4">
          <div className="font-bold text-lg mb-1">Demand &gt; Supply → Giá tăng</div>
          <div className="font-bold text-lg">Supply &gt; Demand → Giá giảm</div>
          <p className="text-stone-700 text-sm mt-2">Đơn giản nhất, mạnh nhất, và không bao giờ thay đổi</p>
        </div>

        <div className="space-y-3">
          {[
            {
              event: "OPEC cắt giảm sản lượng dầu 1 triệu thùng/ngày",
              mechanism: "Supply giảm → demand/supply gap tăng → giá dầu tăng",
              example: "OPEC+ cut 2023 → WTI từ $70 lên $90/barrel",
              icon: "🛢️",
            },
            {
              event: "Mùa vụ cà phê Brazil thuận lợi, sản lượng kỷ lục",
              mechanism: "Supply tăng đột biến → dư cung → giá cà phê giảm",
              example: "Brazil bumper crop → Arabica giảm 20-30% trong mùa thu hoạch",
              icon: "☕",
            },
            {
              event: "Dịch ASF (African Swine Fever) làm chết 50% đàn heo Trung Quốc",
              mechanism: "Supply thịt heo giảm mạnh → giá hog spike toàn cầu",
              example: "ASF 2019: hog futures tăng 70%, kéo theo giá thịt heo toàn châu Á",
              icon: "🐷",
            },
          ].map(s => (
            <div key={s.event} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{s.icon}</span>
                <div>
                  <div className="font-semibold text-stone-800 text-sm mb-1">{s.event}</div>
                  <div className="text-stone-600 text-xs mb-1">→ {s.mechanism}</div>
                  <div className="text-stone-700 text-xs italic">{s.example}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SupplyDemandSimulator />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📦 3 yếu tố phân tích commodity</h3>
        <div className="space-y-3">
          {[
            {
              n: "01", title: "Supply & Demand",
              points: ["Production data: OPEC quotas, crop reports, mining output", "Demand: GDP growth, industrial activity, seasonal patterns", "Balance: deficit hay surplus?"],
              color: "amber",
            },
            {
              n: "02", title: "Inventory (Tồn kho)",
              points: ["Weekly EIA data (dầu), USDA reports (nông sản)", "Inventory giảm + demand mạnh → bullish signal", "Inventory tăng liên tục → bearish pressure"],
              color: "orange",
            },
            {
              n: "03", title: "Geopolitics & Policy",
              points: ["OPEC decisions, export bans, trade wars", "Weather events (El Niño ảnh hưởng nông sản)", "Sanctions (Iran oil, Russia wheat)"],
              color: "rose",
            },
          ].map(f => (
            <div key={f.n} className={`bg-${f.color}-50 border border-${f.color}-100 rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-bold text-${f.color}-600 bg-${f.color}-100 px-2 py-0.5 rounded-full`}>{f.n}</span>
                <span className="font-bold text-stone-800">{f.title}</span>
              </div>
              <ul className="space-y-1">
                {f.points.map((p, i) => (
                  <li key={i} className="flex gap-2 text-xs text-stone-600">
                    <span className={`text-${f.color}-500 flex-shrink-0`}>·</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Commodity Cyclicality — Tại sao giá biến động mạnh?</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          Supply của commodity có <strong>lag dài</strong> — xây nhà máy lọc dầu mất 3-5 năm, mở mỏ đồng mất 5-10 năm. Nhưng demand thay đổi nhanh theo GDP cycle. Kết quả:
        </p>
        <div className="bg-stone-800 text-white rounded-xl p-5 space-y-3 text-sm">
          {[
            { phase: " Boom", desc: "GDP tăng → demand tăng nhanh → supply không kịp → giá spike → attracts investment" },
            { phase: "🏗️ Build", desc: "Investment đổ vào → new capacity được xây → nhưng mất nhiều năm" },
            { phase: " Bust", desc: "New supply đổ ra → boom kết thúc → demand giảm theo GDP → giá crash" },
            { phase: "🔄 Recovery", desc: "Giá thấp → producers cut → capacity giảm → cycle bắt đầu lại" },
          ].map(s => (
            <div key={s.phase} className="flex gap-3">
              <span className="font-bold text-stone-700 flex-shrink-0">{s.phase}</span>
              <span className="text-stone-300">{s.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">🛡️ Hedging trong thực tế doanh nghiệp Việt Nam</h3>
        <div className="space-y-2">
          {[
            { co: "Vietnam Airlines", com: "Jet fuel (oil)", strategy: "Oil futures 6-12 tháng, thường hedge 40-60% nhu cầu dự kiến" },
            { co: "Vinamilk", com: "Sữa bột (dairy)", strategy: "Forward contracts với nhà cung cấp New Zealand/EU" },
            { co: "Masan (WinCommerce)", com: "Heo, gia cầm", strategy: "Spot market chủ yếu + hợp đồng dài hạn với farms" },
            { co: "Tập đoàn Thép Hòa Phát", com: "Quặng sắt, than coke", strategy: "Long-term supply contracts + spot kết hợp" },
          ].map(h => (
            <div key={h.co} className="bg-stone-50 rounded-xl p-3 border border-stone-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-stone-700 text-sm">{h.co}</span>
                <span className="text-xs text-stone-400">({h.com})</span>
              </div>
              <p className="text-stone-600 text-xs">{h.strategy}</p>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
