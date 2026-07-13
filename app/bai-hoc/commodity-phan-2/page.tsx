"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 25, day: 25, accent: "amber",
  title: "Hàng Hóa Cơ Bản Phần 2",
  subtitle: "Cung, cầu, tồn kho - 3 yếu tố chính làm giá hàng hóa biến động",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🌍",
  nextSlug: "trai-phieu", nextTitle: "Trái Phiếu",
};

const quiz: QuizQuestion[] = [
  {
    question: "Điều nào có khả năng làm giá dầu tăng mạnh nhất?",
    options: [
      "Sản lượng dầu đá phiến Mỹ tăng mạnh",
      "OPEC cắt giảm sản lượng",
      "Tồn kho dầu tăng liên tục",
      "Nhu cầu vận tải giảm",
    ],
    correct: 1,
    explanation: "OPEC cắt giảm sản lượng làm nguồn cung giảm trong khi nhu cầu tương đối ổn định, nên giá có thể tăng. Ngược lại, sản lượng tăng, tồn kho tăng hoặc nhu cầu giảm thường gây áp lực giảm giá.",
  },
  {
    question: "Vì sao hãng hàng không thường phòng vệ rủi ro giá dầu?",
    options: [
      "Để tăng doanh thu từ giao dịch dầu",
      "Để giảm biến động chi phí nhiên liệu và lên kế hoạch giá vé ổn định hơn",
      "Để tăng sản lượng dầu",
      "Để giảm thuế doanh nghiệp",
    ],
    correct: 1,
    explanation: "Nhiên liệu máy bay thường chiếm tỷ trọng lớn trong chi phí hãng bay. Phòng vệ bằng hợp đồng tương lai dầu giúp hãng biết trước chi phí 6-12 tháng, bảo vệ biên lợi nhuận kế hoạch. Đây là quản trị rủi ro, không phải đầu cơ.",
  },
  {
    question: "Khi tồn kho hàng hóa tăng liên tục trong khi nhu cầu yếu, điều gì thường xảy ra với giá?",
    options: [
      "Giá tăng vì tồn kho nhiều nghĩa là nền kinh tế mạnh",
      "Giá giảm - tồn kho dư thừa tạo áp lực bán ra",
      "Biến động về 0",
      "Hàng hóa không bị ảnh hưởng bởi tồn kho",
    ],
    correct: 1,
    explanation: "Tồn kho cao + nhu cầu yếu = dư cung. Nhà sản xuất hoặc thương nhân phải bán để giảm tồn kho, tạo áp lực giảm giá. Ngược lại, tồn kho thấp + nhu cầu cao thường tạo áp lực tăng giá.",
  },
  {
    question: "Tại sao hàng hóa cơ bản có tính chu kỳ cao?",
    options: [
      "Vì giá hàng hóa luôn được quyết định bởi chính phủ",
      "Vì nguồn cung cần nhiều năm để điều chỉnh, trong khi nhu cầu thay đổi nhanh theo chu kỳ kinh tế",
      "Vì hàng hóa chỉ giao dịch ở các sàn đặc biệt",
      "Vì hàng hóa không thể tồn kho lâu",
    ],
    correct: 1,
    explanation: "Mở mỏ dầu hoặc xây nhà máy có thể mất nhiều năm, nhưng nhu cầu thay đổi theo kinh tế từng quý. Khi kinh tế nóng lên, cầu tăng nhanh mà cung chưa kịp tăng nên giá bật mạnh. Khi kinh tế yếu, cầu giảm nhưng nguồn cung đã xây rồi khó tắt ngay, nên giá có thể rơi sâu.",
  },
  {
    question: "Địa chính trị ảnh hưởng đến hàng hóa cơ bản như thế nào?",
    options: [
      "Không ảnh hưởng - hàng hóa là thị trường toàn cầu",
      "Chỉ ảnh hưởng vàng vì vàng là safe haven",
      "Xung đột ở vùng sản xuất hàng hóa quan trọng có thể làm gián đoạn nguồn cung và đẩy giá tăng",
      "Địa chính trị chỉ ảnh hưởng tỷ giá, không ảnh hưởng hàng hóa",
    ],
    correct: 2,
    explanation: "Nếu chiến tranh, cấm vận hoặc bất ổn xảy ra ở vùng sản xuất dầu, lúa mì, nickel, khí đốt, nguồn cung có thể bị gián đoạn và giá tăng mạnh. Đây là rủi ro rất quan trọng với hàng hóa.",
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
    if (priceSignal > 15) return { label: "Tín hiệu tăng giá mạnh", color: "text-stone-700 bg-stone-50 border-stone-200" };
    if (priceSignal > 5) return { label: "Tín hiệu nghiêng về tăng giá", color: "text-stone-700 bg-stone-50 border-stone-200" };
    if (priceSignal > -5) return { label: "➡️ Trung lập", color: "text-stone-700 bg-stone-50 border-stone-200" };
    if (priceSignal > -15) return { label: "Tín hiệu nghiêng về giảm giá", color: "text-stone-700 bg-stone-50 border-stone-200" };
    return { label: "Tín hiệu giảm giá mạnh", color: "text-stone-700 bg-stone-50 border-stone-200" };
  };

  const signal = getSignal();

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-1 text-sm">Mô phỏng tín hiệu giá hàng hóa</h3>
      <p className="text-xs text-stone-500 mb-4">Điều chỉnh cung, cầu và tồn kho để xem tín hiệu giá</p>

      <div className="space-y-3 mb-5">
        {[
          { label: `Cung (${supply})`, val: supply, set: setSupply, icon: "🏭" },
          { label: `Cầu (${demand})`, val: demand, set: setDemand, icon: "🛒" },
          { label: `Tồn kho (${inventory})`, val: inventory, set: setInventory, icon: "🏗️" },
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
            <div className="text-xs text-stone-500 mb-0.5">Cầu − Cung</div>
            <div className={`font-bold text-lg ${balance > 0 ? "text-stone-700" : balance < 0 ? "text-stone-700" : "text-stone-500"}`}>
              {balance > 0 ? "+" : ""}{balance}
            </div>
            <div className="text-xs text-stone-500">{balance > 0 ? "Thiếu hàng" : balance < 0 ? "Dư hàng" : "Cân bằng"}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-stone-500 mb-0.5">Xu hướng tồn kho</div>
            <div className={`font-bold text-lg ${invChange < 0 ? "text-stone-700" : invChange > 0 ? "text-stone-700" : "text-stone-500"}`}>
              {invChange > 0 ? "+" : ""}{invChange.toFixed(0)}
            </div>
            <div className="text-xs text-stone-500">{invChange < 0 ? "Đang giảm " : "Đang tích lũy ⚠️"}</div>
          </div>
        </div>
        <div className={`rounded-xl p-3 border text-center font-bold ${signal.color}`}>
          {signal.label}
        </div>
      </div>
      <p className="text-xs text-stone-500 text-center">Tín hiệu giá phụ thuộc vào cân bằng cung - cầu và mức tồn kho</p>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Hàng hóa cơ bản phần 2 - phân tích giá</h2>
      <p className="text-stone-600 text-sm mb-6 italic">3 yếu tố định giá hàng hóa và lý do doanh nghiệp phải phòng vệ rủi ro.</p>

      <section className="mb-8 rounded-xl border border-amber-100 bg-amber-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-amber-800 mb-2">Hiểu nhanh</h3>
        <p className="text-sm leading-relaxed text-stone-700">
          Giá hàng hóa thường xoay quanh ba câu hỏi: hàng có thiếu không, tồn kho đang tăng hay giảm, và có sự kiện chính trị/thời tiết nào làm gián đoạn nguồn cung không.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">⚙️ Cơ chế định giá cơ bản</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5 text-center mb-4">
            <div className="font-bold text-lg mb-1">Cầu &gt; Cung → Giá tăng</div>
          <div className="font-bold text-lg">Cung &gt; Cầu → Giá giảm</div>
          <p className="text-stone-700 text-sm mt-2">Đơn giản nhất, mạnh nhất, và không bao giờ thay đổi</p>
        </div>

        <div className="space-y-3">
          {[
            {
              event: "OPEC cắt giảm sản lượng dầu 1 triệu thùng/ngày",
              mechanism: "Nguồn cung giảm → khoảng thiếu hụt tăng → giá dầu tăng",
              example: "OPEC+ cắt giảm 2023 → dầu WTI từ khoảng $70 lên $90/thùng",
              icon: "🛢️",
            },
            {
              event: "Mùa vụ cà phê Brazil thuận lợi, sản lượng kỷ lục",
              mechanism: "Nguồn cung tăng đột biến → dư cung → giá cà phê giảm",
              example: "Brazil bumper crop → Arabica giảm 20-30% trong mùa thu hoạch",
              icon: "☕",
            },
            {
              event: "Dịch ASF (African Swine Fever) làm chết 50% đàn heo Trung Quốc",
              mechanism: "Nguồn cung thịt heo giảm mạnh → giá heo tăng mạnh toàn cầu",
              example: "Dịch ASF 2019 làm giá heo tăng mạnh, kéo theo giá thịt heo ở châu Á",
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
        <h3 className="text-lg font-bold text-stone-800 mb-3">3 yếu tố phân tích hàng hóa</h3>
        <div className="space-y-3">
          {[
            {
              n: "01", title: "Cung và cầu",
              points: ["Sản lượng: hạn ngạch OPEC, báo cáo mùa vụ, sản lượng khai mỏ", "Nhu cầu: tăng trưởng kinh tế, hoạt động công nghiệp, mùa vụ", "Cân bằng: thiếu hàng hay dư hàng?"],
              color: "amber",
            },
            {
              n: "02", title: "Tồn kho",
              points: ["Dữ liệu tồn kho dầu, báo cáo nông sản, số liệu kho bãi", "Tồn kho giảm + nhu cầu mạnh → tín hiệu tăng giá", "Tồn kho tăng liên tục → áp lực giảm giá"],
              color: "orange",
            },
            {
              n: "03", title: "Địa chính trị và chính sách",
              points: ["Quyết định của OPEC, cấm xuất khẩu, chiến tranh thương mại", "Thời tiết cực đoan ảnh hưởng nông sản", "Cấm vận làm gián đoạn dầu, khí đốt, lúa mì"],
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
        <h3 className="text-lg font-bold text-stone-800 mb-3">Tính chu kỳ - tại sao giá biến động mạnh?</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          Nguồn cung hàng hóa thường điều chỉnh rất chậm - xây nhà máy lọc dầu mất 3-5 năm, mở mỏ đồng mất 5-10 năm. Nhưng nhu cầu thay đổi nhanh theo chu kỳ kinh tế. Kết quả:
        </p>
        <div className="bg-stone-800 text-white rounded-xl p-5 space-y-3 text-sm">
          {[
            { phase: "Bùng nổ", desc: "Kinh tế tăng → cầu tăng nhanh → cung không kịp → giá tăng mạnh → vốn đầu tư đổ vào" },
            { phase: "Xây thêm cung", desc: "Nhà máy, mỏ, kho mới được xây nhưng mất nhiều năm mới hoàn thành" },
            { phase: "Đi xuống", desc: "Nguồn cung mới xuất hiện đúng lúc nhu cầu yếu đi → giá giảm mạnh" },
            { phase: "Phục hồi", desc: "Giá thấp khiến nhà sản xuất cắt giảm → nguồn cung giảm → chu kỳ bắt đầu lại" },
          ].map(s => (
            <div key={s.phase} className="flex gap-3">
              <span className="font-bold text-stone-700 flex-shrink-0">{s.phase}</span>
              <span className="text-stone-300">{s.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">Phòng vệ rủi ro trong doanh nghiệp Việt Nam</h3>
        <div className="space-y-2">
          {[
            { co: "Vietnam Airlines", com: "Nhiên liệu máy bay", strategy: "Dùng hợp đồng tương lai dầu 6-12 tháng để khóa một phần chi phí dự kiến" },
            { co: "Vinamilk", com: "Sữa bột", strategy: "Dùng hợp đồng kỳ hạn với nhà cung cấp nước ngoài để giảm biến động giá" },
            { co: "Masan (WinCommerce)", com: "Heo, gia cầm", strategy: "Kết hợp giá giao ngay và hợp đồng dài hạn với trang trại" },
            { co: "Tập đoàn Thép Hòa Phát", com: "Quặng sắt, than coke", strategy: "Kết hợp hợp đồng cung ứng dài hạn và mua theo giá thị trường" },
          ].map(h => (
            <div key={h.co} className="bg-stone-50 rounded-xl p-3 border border-stone-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-stone-700 text-sm">{h.co}</span>
                <span className="text-xs text-stone-500">({h.com})</span>
              </div>
              <p className="text-stone-600 text-xs">{h.strategy}</p>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
