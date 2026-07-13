"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 19, day: 19, accent: "amber",
  title: "Hàng Hóa Cơ Bản (Commodity)",
  subtitle: "Nguyên liệu chuẩn hóa và tác động lên chi phí của nền kinh tế",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🛢️",
  nextSlug: "trai-phieu", nextTitle: "Trái Phiếu",
};

const quiz: QuizQuestion[] = [
  {
    question: "Loại hàng hóa nào tác động trực tiếp nhất tới chi phí hãng hàng không?",
    options: ["Vàng - vì hãng bay cần vàng để sản xuất", "Dầu máy bay - thường chiếm 20-30% tổng chi phí của hãng bay", "Ngô - vì ethanol từ ngô thay thế xăng"],
    correct: 1,
    explanation: "Dầu máy bay lấy từ dầu thô, thường là khoản chi phí rất lớn của hãng bay. Khi giá dầu tăng, biên lợi nhuận bị thu hẹp ngay, nên nhiều hãng dùng hợp đồng tương lai để khóa giá trước.",
  },
  {
    question: "Giá hợp đồng tương lai cao hơn giá giao ngay thường gợi ý điều gì?",
    options: ["Nhu cầu đang giảm mạnh", "Thị trường kỳ vọng giá tăng hoặc có chi phí lưu kho/bảo hiểm", "Nguồn cung đang dư thừa"],
    correct: 1,
    explanation: "Giá giao ngay là giá mua bán hôm nay. Hợp đồng tương lai là giá thỏa thuận hôm nay cho giao dịch trong tương lai. Khi giá tương lai cao hơn giá giao ngay, thị trường có thể đang tính thêm chi phí lưu kho, bảo hiểm hoặc kỳ vọng giá tăng.",
  },
  {
    question: "Công ty sản xuất thịt sẽ bị ảnh hưởng thế nào nếu giá heo đầu vào tăng nhanh hơn giá thịt bán ra?",
    options: ["Biên lợi nhuận tăng vì họ bán được nhiều hơn", "Không đổi vì giá đầu vào và đầu ra cùng tăng", "Biên lợi nhuận giảm vì chi phí tăng nhanh hơn giá bán"],
    correct: 2,
    explanation: "Nếu giá nguyên liệu đầu vào tăng nhanh hơn giá bán đầu ra, biên lợi nhuận bị co lại. Đây gọi là co hẹp biên lợi nhuận: doanh nghiệp bán vẫn có doanh thu nhưng giữ lại ít lợi nhuận hơn.",
  },
  {
    question: "Tại sao doanh nghiệp dùng hợp đồng tương lai hàng hóa để phòng vệ rủi ro?",
    options: [
      "Để đầu cơ kiếm lời từ biến động giá",
      "Để khóa giá đầu vào/đầu ra trước, giảm bất định và bảo vệ biên lợi nhuận kế hoạch",
      "Vì sàn giao dịch yêu cầu",
    ],
    correct: 1,
    explanation: "Phòng vệ rủi ro không phải đầu cơ. Hãng bay mua hợp đồng tương lai dầu để biết trước chi phí nhiên liệu 6-12 tháng tới, từ đó lập kế hoạch giá vé và chi phí ổn định hơn.",
  },
  {
    question: "Khi giá đồng (copper) tăng mạnh, ngành nào bị tác động tiêu cực nhất?",
    options: [
      "Ngân hàng - vì lãi suất liên quan đến đồng",
      "Sản xuất điện tử, ô tô điện - đồng là nguyên liệu đầu vào quan trọng",
      "Bán lẻ thực phẩm - vì đồng dùng trong bao bì",
    ],
    correct: 1,
    explanation: "Đồng là nguyên liệu thiết yếu trong dây điện, bảng mạch, động cơ điện và xe điện. Khi giá đồng tăng, chi phí sản xuất của ngành điện tử và xe điện tăng theo.",
  },
];

const CATEGORIES = [
  {
    name: "Năng lượng", icon: "", color: "orange",
    items: ["Dầu thô (WTI, Brent)", "Khí tự nhiên", "Dầu máy bay", "Than"],
    impact: "Airline, vận tải, hóa chất, nhựa",
    example: "Dầu tăng 10% → chi phí hãng bay tăng → biên lợi nhuận bị ăn mòn",
  },
  {
    name: "Kim loại", icon: "🔩", color: "slate",
    items: ["Vàng (Gold)", "Đồng (Copper)", "Nhôm (Aluminum)", "Thép (Steel)"],
    impact: "Điện tử, xây dựng, ô tô, hàng không",
    example: "Đồng tăng → chi phí xe điện tăng, biên lợi nhuận bị co lại",
  },
  {
    name: "Nông sản", icon: "🌽", color: "green",
    items: ["Ngô (Corn)", "Lúa mì (Wheat)", "Đậu nành (Soybean)", "Đường (Sugar)"],
    impact: "Thực phẩm, chăn nuôi, nhiên liệu sinh học, hàng tiêu dùng",
    example: "Corn ↑ → chi phí thức ăn chăn nuôi ↑ → thịt đắt hơn",
  },
  {
    name: "Chăn nuôi", icon: "🐷", color: "rose",
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

function HangHoaImpactSimulator() {
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
      <h3 className="font-bold text-stone-700 mb-1 text-sm">Mô phỏng tác động của hàng hóa</h3>
      <p className="text-xs text-stone-500 mb-4">Kéo thanh trượt để xem giá hàng hóa ảnh hưởng tới biên lợi nhuận ngành</p>

      <div className="space-y-3 mb-5">
        {[
          { label: "Dầu / nhiên liệu máy bay", val: oilChange, set: setOilChange, icon: "🛢️" },
          { label: "Corn (thức ăn chăn nuôi)", val: cornChange, set: setCornChange, icon: "🌽" },
          { label: "Hog (heo sống)", val: hogChange, set: setHogChange, icon: "🐷" },
        ].map(s => (
          <div key={s.label}>
            <div className="flex justify-between text-xs text-stone-600 mb-1">
              <span className="font-semibold">{s.icon} {s.label}</span>
              <span className={`font-bold ${s.val > 0 ? "text-stone-700" : s.val < 0 ? "text-stone-700" : "text-stone-500"}`}>
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
          { label: "✈️ Biên hãng bay", val: Number(airlineImpact), sub: "theo giá dầu" },
          { label: "🐄 Chi phí chăn nuôi", val: Number(livestockCost), sub: "theo giá ngô", invert: true },
          { label: "🥩 Biên công ty thịt", val: Number(meatMargin), sub: "heo đầu vào" },
        ].map(s => {
          const bad = s.invert ? s.val > 0 : s.val < 0;
          const good = s.invert ? s.val < 0 : s.val > 0;
          return (
            <div key={s.label} className={`rounded-xl p-3 text-center border ${bad ? "bg-stone-50 border-stone-200" : good ? "bg-stone-50 border-stone-200" : "bg-white border-stone-100"}`}>
              <div className={`text-lg font-bold ${bad ? "text-stone-700" : good ? "text-stone-700" : "text-stone-500"}`}>
                {fmt(s.val)}
              </div>
              <div className="text-[10px] text-stone-500 mt-0.5 font-medium">{s.label}</div>
              <div className="text-[9px] text-stone-500">{s.sub}</div>
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
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Hàng hóa cơ bản (Commodity)</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Nhóm nguyên liệu chuẩn hóa âm thầm quyết định chi phí và biên lợi nhuận của nhiều ngành.</p>

      <section className="mb-8 rounded-xl border border-amber-100 bg-amber-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-amber-800 mb-2">Hiểu nhanh</h3>
        <p className="text-sm leading-relaxed text-stone-700">
          Hàng hóa cơ bản là dầu, vàng, đồng, ngô, lúa mì, heo... Khi giá các nguyên liệu này thay đổi, lợi nhuận của hãng bay, nhà máy thực phẩm, công ty điện tử hay doanh nghiệp xây dựng cũng thay đổi theo.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Hàng hóa cơ bản là gì?</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Hàng hóa cơ bản (commodity) là hàng hóa <strong>chuẩn hóa</strong>: người mua chủ yếu quan tâm chất lượng đạt chuẩn, không quan tâm nhiều đến thương hiệu. Ví dụ dầu WTI đạt cùng chuẩn thì có thể giao dịch như nhau; vàng 99.9% từ nhiều nơi vẫn tương đương về mặt hàng hóa.
        </p>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-4">
          <p className="text-sm text-stone-700 leading-relaxed">
            <strong>Ý chính:</strong> Hàng hóa cơ bản là nguồn chi phí lớn của nền kinh tế. Khi giá dầu, đồng, ngô hay heo tăng, ảnh hưởng sẽ lan ra cả chuỗi cung ứng - từ nhà máy đến siêu thị.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">4 nhóm hàng hóa cơ bản chính</h3>
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

      <HangHoaImpactSimulator />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Giá giao ngay và giá tương lai</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-stone-800 text-white rounded-xl p-4">
            <div className="font-bold text-stone-700 mb-1 text-sm">Giá giao ngay (Spot Price)</div>
            <p className="text-stone-300 text-xs leading-relaxed">Giá giao dịch ngay lập tức, nhận hàng ngay. Phản ánh cung cầu thực tế <em>hôm nay</em>.</p>
            <div className="mt-3 font-mono text-xs text-stone-500">Dầu WTI giao ngay = $82/thùng</div>
          </div>
          <div className="bg-stone-50 text-white rounded-xl p-4">
            <div className="font-bold text-stone-700 mb-1 text-sm">Giá tương lai (Futures Price)</div>
            <p className="text-stone-700 text-xs leading-relaxed">Giá thỏa thuận hôm nay để mua/bán trong tương lai. Có thể bao gồm kỳ vọng giá, chi phí lưu kho, bảo hiểm và vốn.</p>
            <div className="mt-3 font-mono text-xs text-stone-700">Dầu WTI giao tháng 12 = $84/thùng</div>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { term: "Contango", def: "Giá tương lai cao hơn giá giao ngay - thường do chi phí lưu kho, bảo hiểm hoặc kỳ vọng giá tăng.", color: "rose" },
            { term: "Backwardation", def: "Giá tương lai thấp hơn giá giao ngay - thường do nhu cầu hàng ngay đang rất cao hoặc thiếu hụt ngắn hạn.", color: "emerald" },
          ].map(s => (
            <div key={s.term} className={`flex gap-3 bg-${s.color}-50 border border-${s.color}-100 rounded-xl p-3`}>
              <span className={`font-bold text-${s.color}-700 text-sm flex-shrink-0`}>{s.term}:</span>
              <span className="text-stone-600 text-sm">{s.def}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Cách phân tích: hưởng lợi hay bị hại?</h3>
        <p className="text-stone-600 text-sm mb-4">Khi đọc tin tức hàng hóa, câu hỏi đầu tiên là: <strong>công ty này bị động nhận giá thị trường, hay có quyền tự đặt giá bán?</strong></p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-100">
                <th className="text-left p-2 rounded-l-lg font-semibold text-stone-600 text-xs">Hàng hóa</th>
                <th className="text-left p-2 font-semibold text-stone-700 text-xs">❌ Bị hại khi tăng</th>
                <th className="text-left p-2 rounded-r-lg font-semibold text-stone-700 text-xs"> Hưởng lợi khi tăng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[
                { com: "🛢️ Dầu", hurt: "Hãng bay, logistics, nhựa, hóa chất", gain: "PetroVietnam, công ty khai thác dầu" },
                { com: "🥇 Gold", hurt: "Người không nắm vàng", gain: "Công ty khai thác vàng, nhà đầu tư" },
                { com: "🌽 Ngô", hurt: "Công ty chăn nuôi, nhà sản xuất nhiên liệu sinh học", gain: "Nông dân, công ty giao dịch nông sản" },
                { com: "🐷 Heo", hurt: "Nhà máy chế biến thịt nếu giá bán không tăng theo", gain: "Trang trại chăn nuôi heo" },
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
        <h3 className="text-lg font-bold text-stone-800 mb-3">Phòng vệ rủi ro giá - công cụ bảo vệ biên lợi nhuận</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          Doanh nghiệp phụ thuộc hàng hóa không thể kiểm soát giá thị trường, nhưng có thể <strong>khóa giá trước</strong> thông qua hợp đồng tương lai hoặc quyền chọn:
        </p>
        <div className="space-y-2">
          {[
            { co: "Vietnam Airlines", strategy: "Mua hợp đồng tương lai dầu để khóa giá nhiên liệu máy bay cho 6-12 tháng tới" },
            { co: "Masan (MEATDeli)", strategy: "Khóa trước giá heo đầu vào để lập kế hoạch chi phí và giữ biên lợi nhuận ổn định" },
            { co: "Vinamilk", strategy: "Phòng vệ giá sữa bột nguyên liệu nhập khẩu bằng hợp đồng kỳ hạn" },
          ].map(h => (
            <div key={h.co} className="flex gap-3 bg-stone-50 rounded-lg p-3 border border-stone-200">
              <span className="font-bold text-stone-700 text-sm flex-shrink-0 min-w-fit">{h.co}:</span>
              <span className="text-stone-600 text-sm">{h.strategy}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-stone-800 text-white rounded-xl p-4">
          <p className="text-sm text-stone-300">
            <span className="text-stone-700 font-bold">Ghi nhớ:</span> Phòng vệ rủi ro không nhằm kiếm lời từ giá hàng hóa. Mục tiêu là giảm bất định, biết trước chi phí và tránh bị biến động giá làm vỡ kế hoạch kinh doanh.
          </p>
        </div>
      </section>
    </LessonPageLayout>
  );
}
