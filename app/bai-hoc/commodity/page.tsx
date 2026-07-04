"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 19, day: 19, accent: "amber",
  title: "Commodity là gì?",
  subtitle: "Hàng hóa chuẩn hóa — cost driver của toàn bộ nền kinh tế",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🛢️",
  nextSlug: "trai-phieu", nextTitle: "Trái Phiếu",
};

const quiz: QuizQuestion[] = [
  {
    question: "Commodity nào impact trực tiếp nhất tới airline cost?",
    options: ["Gold — vì airline cần vàng để sản xuất", "Oil (Jet Fuel) — chiếm 20-30% tổng chi phí của hãng bay", "Corn — vì corn ethanol thay thế xăng"],
    correct: 1,
    explanation: "Jet fuel (từ dầu thô) chiếm 20–30% chi phí vận hành của hãng hàng không. Khi oil tăng 10%, margin airline bị ăn mòn ngay lập tức — lý do các hãng dùng futures để hedge.",
  },
  {
    question: "Futures price cao hơn spot price thường imply điều gì?",
    options: ["Demand đang giảm mạnh", "Kỳ vọng giá tăng trong tương lai hoặc có cost of carry (lưu kho, bảo hiểm)", "Supply đang dư thừa"],
    correct: 1,
    explanation: "Khi futures > spot, thị trường đang ở trạng thái 'contango' — phản ánh cost of carry (lưu kho, bảo hiểm, tài chính) hoặc kỳ vọng giá tăng. Ngược lại, futures < spot là 'backwardation' — thường xảy ra khi cầu spot đang rất cao.",
  },
  {
    question: "Công ty sản xuất thịt sẽ bị ảnh hưởng thế nào nếu hog price tăng nhanh hơn pork price?",
    options: ["Margin tăng — vì họ bán được nhiều hơn", "Không đổi — giá đầu vào và đầu ra cùng tăng", "Margin giảm — chi phí nguyên liệu tăng nhanh hơn giá bán được"],
    correct: 2,
    explanation: "Công ty chế biến thịt mua heo (input) và bán thịt heo (output). Nếu hog price tăng nhanh hơn pork price → cost tăng nhanh hơn revenue → margin bị squeeze. Đây gọi là 'margin compression' trong commodity-dependent business.",
  },
  {
    question: "Tại sao doanh nghiệp dùng commodity futures để hedge?",
    options: [
      "Để đầu cơ kiếm lời từ biến động giá",
      "Để khóa giá đầu vào/đầu ra trước, giảm uncertainty và bảo vệ margin kế hoạch",
      "Vì sàn giao dịch yêu cầu",
    ],
    correct: 1,
    explanation: "Hedging ≠ speculation. Airline mua futures dầu để biết trước chi phí fuel cho 6-12 tháng tới → có thể lên kế hoạch kinh doanh và pricing vé máy bay ổn định hơn. Mục tiêu là reduce risk, không phải kiếm lời từ commodity.",
  },
  {
    question: "Khi giá đồng (copper) tăng mạnh, ngành nào bị tác động tiêu cực nhất?",
    options: [
      "Ngân hàng — vì lãi suất liên quan đến đồng",
      "Sản xuất điện tử, ô tô điện — đồng là nguyên liệu đầu vào quan trọng",
      "Bán lẻ thực phẩm — vì đồng dùng trong bao bì",
    ],
    correct: 1,
    explanation: "Copper (đồng) là nguyên liệu thiết yếu trong dây điện, PCB, motor điện, pin EV. Khi copper tăng, chi phí sản xuất của ngành điện tử và xe điện tăng theo — lý do copper được gọi là 'Dr. Copper', chỉ báo sức khỏe kinh tế.",
  },
];

const CATEGORIES = [
  {
    name: "Energy", icon: "", color: "orange",
    items: ["Dầu thô (WTI, Brent)", "Natural Gas", "Jet Fuel", "Coal"],
    impact: "Airline, vận tải, hóa chất, nhựa",
    example: "Oil ↑ 10% → airline cost ↑ 2-3% → margin bị ăn mòn",
  },
  {
    name: "Metals", icon: "🔩", color: "slate",
    items: ["Vàng (Gold)", "Đồng (Copper)", "Nhôm (Aluminum)", "Thép (Steel)"],
    impact: "Điện tử, xây dựng, ô tô, aerospace",
    example: "Copper ↑ → chi phí sản xuất EV tăng, margin bị squeeze",
  },
  {
    name: "Agriculture", icon: "🌽", color: "green",
    items: ["Ngô (Corn)", "Lúa mì (Wheat)", "Đậu nành (Soybean)", "Đường (Sugar)"],
    impact: "Thực phẩm, chăn nuôi, ethanol, FMCG",
    example: "Corn ↑ → chi phí thức ăn chăn nuôi ↑ → thịt đắt hơn",
  },
  {
    name: "Livestock", icon: "🐷", color: "rose",
    items: ["Heo (Hog/Pork)", "Bò (Cattle/Beef)", "Gà (Poultry)"],
    impact: "Công ty chế biến thịt, chuỗi nhà hàng, siêu thị",
    example: "Hog ↑ → Vissan, CPV mua nguyên liệu đắt hơn",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  orange: { bg: "bg-stone-50", border: "border-stone-200", text: "text-stone-700", badge: "bg-stone-50 text-stone-700" },
  slate:  { bg: "bg-slate-50",  border: "border-slate-200",  text: "text-slate-700",  badge: "bg-slate-100 text-slate-700"  },
  green:  { bg: "bg-stone-50",  border: "border-stone-200",  text: "text-stone-700",  badge: "bg-stone-50 text-stone-700"  },
  rose:   { bg: "bg-stone-50",   border: "border-stone-200",   text: "text-stone-700",   badge: "bg-stone-50 text-stone-700"   },
};

function CommodityImpactSimulator() {
  const [oilChange, setOilChange] = useState(0);
  const [cornChange, setCornChange] = useState(0);
  const [hogChange, setHogChange] = useState(0);

  const airlineImpact = -(oilChange * 0.25).toFixed(1);
  const livestockCost = (cornChange * 0.4).toFixed(1);
  const meatMargin = -(hogChange * 0.6 - cornChange * 0.1).toFixed(1);

  const fmt = (v: number | string) => {
    const n = Number(v);
    return (n > 0 ? "+" : "") + n.toFixed(1) + "%";
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-1 text-sm">⚙️ Commodity Impact Simulator</h3>
      <p className="text-xs text-stone-500 mb-4">Kéo slider để xem commodity ảnh hưởng tới margin ngành</p>

      <div className="space-y-3 mb-5">
        {[
          { label: "Oil / Jet Fuel", val: oilChange, set: setOilChange, icon: "🛢️" },
          { label: "Corn (thức ăn chăn nuôi)", val: cornChange, set: setCornChange, icon: "🌽" },
          { label: "Hog (heo sống)", val: hogChange, set: setHogChange, icon: "🐷" },
        ].map(s => (
          <div key={s.label}>
            <div className="flex justify-between text-xs text-stone-600 mb-1">
              <span className="font-semibold">{s.icon} {s.label}</span>
              <span className={`font-bold ${s.val > 0 ? "text-stone-700" : s.val < 0 ? "text-stone-700" : "text-stone-400"}`}>
                {s.val > 0 ? "+" : ""}{s.val}%
              </span>
            </div>
            <input type="range" min={-30} max={30} value={s.val}
              onChange={e => s.set(+e.target.value)}
              className="w-full accent-amber-500" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "✈️ Airline margin", val: Number(airlineImpact), sub: "vs oil" },
          { label: "🐄 Chăn nuôi cost", val: Number(livestockCost), sub: "vs corn", invert: true },
          { label: "🥩 Meat co. margin", val: Number(meatMargin), sub: "hog vs pork" },
        ].map(s => {
          const bad = s.invert ? s.val > 0 : s.val < 0;
          const good = s.invert ? s.val < 0 : s.val > 0;
          return (
            <div key={s.label} className={`rounded-xl p-3 text-center border ${bad ? "bg-stone-50 border-stone-200" : good ? "bg-stone-50 border-stone-200" : "bg-white border-stone-100"}`}>
              <div className={`text-lg font-bold ${bad ? "text-stone-700" : good ? "text-stone-700" : "text-stone-400"}`}>
                {fmt(s.val)}
              </div>
              <div className="text-[10px] text-stone-500 mt-0.5 font-medium">{s.label}</div>
              <div className="text-[9px] text-stone-400">{s.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Commodity — Hàng Hóa Chuẩn Hóa</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Cost driver thầm lặng của mọi ngành kinh tế — biết commodity là biết margin của doanh nghiệp</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🤔 Commodity là gì?</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Commodity là hàng hóa <strong>chuẩn hóa</strong> — người mua không quan tâm nguồn gốc hay thương hiệu, chỉ cần đạt chuẩn chất lượng. Dầu WTI từ Texas và dầu WTI từ Oklahoma là như nhau; vàng 99.9% từ bất kỳ đâu đều tương đương.
        </p>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-4">
          <p className="text-sm text-stone-700 leading-relaxed">
            <strong>Key insight:</strong> Commodity = cost driver của nền kinh tế. Khi commodity tăng giá, ảnh hưởng lan ra toàn bộ chuỗi cung ứng — từ nhà máy đến siêu thị. Phân tích doanh nghiệp mà bỏ qua commodity exposure là thiếu sót lớn.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📦 4 nhóm commodity chính</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CATEGORIES.map(cat => {
            const c = colorMap[cat.color];
            return (
              <div key={cat.name} className={`${c.bg} rounded-xl p-4 border ${c.border}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className={`font-bold text-stone-800`}>{cat.name}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ml-auto ${c.badge}`}>4 loại chính</span>
                </div>
                <ul className="space-y-0.5 mb-3">
                  {cat.items.map(item => (
                    <li key={item} className="text-xs text-stone-600 flex gap-1.5">
                      <span className={c.text}>·</span>{item}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/60 pt-2 space-y-1">
                  <div className="text-xs text-stone-500"><span className="font-semibold">Ảnh hưởng:</span> {cat.impact}</div>
                  <div className={`text-xs font-medium ${c.text} italic`}>"{cat.example}"</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CommodityImpactSimulator />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Spot vs Futures</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-stone-800 text-white rounded-xl p-4">
            <div className="font-bold text-stone-700 mb-1 text-sm">SPOT PRICE</div>
            <p className="text-stone-300 text-xs leading-relaxed">Giá giao dịch ngay lập tức, nhận hàng ngay. Phản ánh cung cầu thực tế <em>hôm nay</em>.</p>
            <div className="mt-3 font-mono text-xs text-stone-400">Dầu WTI spot = $82/barrel</div>
          </div>
          <div className="bg-stone-50 text-white rounded-xl p-4">
            <div className="font-bold text-stone-700 mb-1 text-sm">FUTURES PRICE</div>
            <p className="text-stone-700 text-xs leading-relaxed">Giá thỏa thuận hôm nay để mua/bán trong tương lai. Phản ánh kỳ vọng và cost of carry.</p>
            <div className="mt-3 font-mono text-xs text-stone-700">Dầu WTI Dec-futures = $84/barrel</div>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { term: "Contango", def: "Futures > Spot — kỳ vọng giá tăng hoặc có cost of carry (lưu kho, bảo hiểm)", color: "rose" },
            { term: "Backwardation", def: "Futures < Spot — cầu spot đang cực cao, hoặc shortage trong ngắn hạn", color: "emerald" },
          ].map(s => (
            <div key={s.term} className={`flex gap-3 bg-${s.color}-50 border border-${s.color}-100 rounded-xl p-3`}>
              <span className={`font-bold text-${s.color}-700 text-sm flex-shrink-0`}>{s.term}:</span>
              <span className="text-stone-600 text-sm">{s.def}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🧠 Mindset phân tích: hưởng lợi hay bị hại?</h3>
        <p className="text-stone-600 text-sm mb-4">Khi đọc tin tức commodity, câu hỏi đầu tiên phải là: <strong>"Công ty này là price taker hay price maker?"</strong></p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-100">
                <th className="text-left p-2 rounded-l-lg font-semibold text-stone-600 text-xs">Commodity</th>
                <th className="text-left p-2 font-semibold text-stone-700 text-xs">❌ Bị hại khi tăng</th>
                <th className="text-left p-2 rounded-r-lg font-semibold text-stone-700 text-xs"> Hưởng lợi khi tăng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[
                { com: "🛢️ Oil", hurt: "Airline, logistics, nhựa, hóa chất", gain: "PetroVietnam, công ty khai thác dầu" },
                { com: "🥇 Gold", hurt: "Người không nắm vàng", gain: "Công ty khai thác vàng, nhà đầu tư" },
                { com: "🌽 Corn", hurt: "Công ty chăn nuôi, ethanol producers", gain: "Nông dân, trading houses" },
                { com: "🐷 Hog", hurt: "Nhà máy chế biến thịt (nếu pork price không tăng theo)", gain: "Trang trại chăn nuôi heo" },
              ].map(r => (
                <tr key={r.com}>
                  <td className="p-2 font-semibold text-stone-700 text-xs">{r.com}</td>
                  <td className="p-2 text-stone-700 text-xs">{r.hurt}</td>
                  <td className="p-2 text-stone-700 text-xs">{r.gain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">🛡️ Hedging — Công cụ bảo vệ margin</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          Doanh nghiệp commodity-dependent không thể kiểm soát giá thị trường, nhưng có thể <strong>khóa giá trước</strong> thông qua futures và options:
        </p>
        <div className="space-y-2">
          {[
            { co: "Vietnam Airlines", strategy: "Mua oil futures để khóa giá jet fuel cho 6-12 tháng tới" },
            { co: "Masan (MEATDeli)", strategy: "Dùng hog futures để plan cost nguyên liệu, đảm bảo margin ổn định" },
            { co: "Vinamilk", strategy: "Hedge giá sữa bột nguyên liệu nhập khẩu bằng forward contracts" },
          ].map(h => (
            <div key={h.co} className="flex gap-3 bg-stone-50 rounded-lg p-3 border border-stone-200">
              <span className="font-bold text-stone-700 text-sm flex-shrink-0 min-w-fit">{h.co}:</span>
              <span className="text-stone-600 text-sm">{h.strategy}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-stone-800 text-white rounded-xl p-4">
          <p className="text-sm text-stone-300">
            <span className="text-stone-700 font-bold">Note:</span> Hedging không kiếm lời từ commodity — mục tiêu là <em>reduce uncertainty</em>, không phải maximize profit. Airline hedge oil để biết chi phí trước, không phải để "cá cược" giá dầu.
          </p>
        </div>
      </section>
    </LessonPageLayout>
  );
}
