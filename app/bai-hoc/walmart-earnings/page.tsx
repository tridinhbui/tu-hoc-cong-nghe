"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 38, day: 38, accent: "blue",
  title: "Walmart Earnings Story",
  subtitle: "Học cách kể chuyện tài chính từ CEO và CFO của Walmart Q1/2027",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🛒",
  nextSlug: "inventory-turnover", nextTitle: "Inventory - Hàng Tồn Kho",
};

const quiz: QuizQuestion[] = [
  {
    question: "Vì sao Advertising Revenue thường được đánh giá cao hơn doanh thu bán lẻ truyền thống?",
    options: [
      "Vì doanh thu quảng cáo luôn lớn hơn doanh thu bán hàng",
      "Vì quảng cáo thường có biên lợi nhuận cao hơn và ít phụ thuộc vào chi phí hàng tồn kho",
      "Vì quảng cáo không liên quan đến business model",
      "Vì Walmart không bán hàng nữa",
    ],
    correct: 1,
    explanation: "Advertising Revenue: gross margin 60-80% (so với retail <30%). Không cần hàng tồn kho, không có COGS truyền thống. Mỗi USD quảng cáo revenue tạo ra nhiều lợi nhuận hơn 1 USD bán hàng. Đây là lý do Amazon, Walmart đều đầu tư mạnh vào retail media.",
  },
  {
    question: "Operating Leverage nghĩa là gì trong bối cảnh Walmart?",
    options: [
      "Walmart vay nợ nhiều hơn để tăng lợi nhuận",
      "Doanh thu tăng nhưng chi phí cố định không tăng tương ứng, khiến lợi nhuận tăng nhanh hơn doanh thu",
      "Walmart giảm giá để bán được nhiều hàng hơn",
      "Walmart dùng đòn bẩy với nhà cung cấp",
    ],
    correct: 1,
    explanation: "Operating leverage trong Walmart: khi eCommerce và Marketplace scale, incremental revenue đến từ advertising và seller fees (high margin) trong khi fixed cost infrastructure (warehouses, fulfillment) đã được built. Mỗi USD incremental revenue → margin mở rộng.",
  },
  {
    question: "Khi phân tích Walmart (hay bất kỳ công ty nào), câu hỏi nào nên được đặt ra sớm nhất?",
    options: [
      "Cổ phiếu đang tăng hay giảm trong ngày",
      "Doanh nghiệp kiếm tiền từ những nguồn nào và nguồn nào có chất lượng lợi nhuận cao hơn",
      "Công ty có bao nhiêu cửa hàng",
      "CEO có kinh nghiệm không",
    ],
    correct: 1,
    explanation: "Revenue quality là điểm khởi đầu: không phải tất cả doanh thu đều như nhau. Advertising và Membership của Walmart có margin cao hơn, recurring hơn, và scalable hơn so với core grocery. Understanding revenue mix + margin profile → hiểu được giá trị thực và trajectory của business.",
  },
  {
    question: "CFO Walmart nói 'Membership và Advertising chiếm 1/3 Operating Income'. Điều này có ý nghĩa gì với valuation?",
    options: [
      "Walmart đang thu hẹp core retail",
      "Phần lớn tăng trưởng value của Walmart đến từ high-margin segments - xứng đáng được định giá premium hơn pure retailer",
      "Operating income của Walmart giảm",
      "Membership fee sẽ giảm",
    ],
    correct: 1,
    explanation: "Nếu 1/3 Operating Income đến từ Advertising (+Membership) có margin ~60-80%, thì Walmart ngày càng ít giống retailer và giống hơn platform/media company. Platform businesses được market định giá ở P/E cao hơn retailers (15-20x vs 25-30x). Business mix shift → re-rating tiềm năng.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Walmart Earnings Story - Q1/2027</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Học cách đọc earnings release như CEO/CFO kể chuyện, không chỉ đọc số</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Snapshot Q1/2027 Highlights</h3>
        <div className="bg-stone-800 text-white rounded-xl p-5 font-mono text-sm space-y-2 mb-4">
          <div className="text-stone-500 text-xs mb-2">{ '// Walmart Q1/2027 - Key Metrics' }</div>
          <div className="flex justify-between"><span className="text-stone-300">Revenue growth YoY</span><span className="text-white">+~10B USD</span></div>
          <div className="flex justify-between"><span className="text-stone-700">eCommerce growth</span><span className="text-stone-700">+26%</span></div>
          <div className="flex justify-between"><span className="text-stone-700">Marketplace growth</span><span className="text-stone-700">+~50%</span></div>
          <div className="flex justify-between"><span className="text-stone-700">Advertising Revenue</span><span className="text-stone-700">+30%+</span></div>
          <div className="flex justify-between"><span className="text-stone-700">Membership Fee Revenue</span><span className="text-stone-700">+17%+</span></div>
          <div className="flex justify-between border-t border-stone-600 pt-2">
            <span className="text-stone-300">Membership + Advertising / Op. Income</span>
            <span className="text-white font-bold">~1/3</span>
          </div>
        </div>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
          <p className="text-sm text-stone-700">
            <strong>Nếu chỉ nhìn "doanh thu tăng ~10B"</strong> → bạn đang bỏ lỡ câu chuyện quan trọng hơn: <em>nguồn doanh thu đó đến từ đâu và biên lợi nhuận ra sao</em>.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🏪 Walmart đang chuyển mình thành gì?</h3>
        <div className="space-y-3">
          {[
            {
              from: "Nhà bán lẻ truyền thống",
              to: "Commerce Platform",
              detail: "Marketplace: Walmart không tự mua hàng rồi bán - họ tạo nền tảng để hàng ngàn sellers khác đăng bán. Giống Shopee/Lazada. Ít risk tồn kho, margin cao hơn.",
              icon: "🏪→🌐",
            },
            {
              from: "Brick & Mortar Store",
              to: "eCommerce + Fulfillment Network",
              detail: "eCommerce 26%+ growth: hệ thống fulfillment 4.700 stores trở thành mini-distribution centers. Last-mile advantage vs Amazon.",
              icon: "🏬→📦",
            },
            {
              from: "Bán hàng cho khách",
              to: "Advertising Platform",
              detail: "Walmart Connect: bán quảng cáo cho brands ngay tại điểm mua hàng. Margin 60-80% vs 2-5% của grocery. 'Retail media' là battleground mới.",
              icon: "💳→📣",
            },
          ].map(s => (
            <div key={s.from} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="text-xs text-stone-500 mb-1">{s.from} → {s.to}</div>
              <p className="text-stone-600 text-xs">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">💬 CEO quote: "We're also becoming AI native."</h3>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-3">
          <p className="text-sm text-stone-700 italic mb-2">"We're also becoming AI native."- Doug McMillon, CEO Walmart</p>
          <p className="text-stone-600 text-sm">Câu này không chỉ về công nghệ. AI đang giúp Walmart:</p>
          <ul className="mt-2 space-y-1">
            {[
              "Inventory optimization - đặt hàng đúng lúc, đúng lượng, đúng cửa hàng",
              "Personalization - cá nhân hóa offer cho từng khách hàng → tăng conversion",
              "Fulfillment efficiency - optimize routing, packing, delivery",
              "Advertising targeting - khiến Walmart Connect ads hiệu quả hơn cho brands",
            ].map((p, i) => (
              <li key={i} className="flex gap-2 text-xs text-stone-600">
                <span className="text-stone-700">→</span>{p}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-600">
          <strong>Business flywheel:</strong> AI → better inventory → lower stockout → better eCommerce → more sellers on Marketplace → more advertising → more data → better AI. Virtuous cycle.
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📐 Revenue Quality Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 text-white">
                <th className="p-2 text-left rounded-tl">Revenue Stream</th>
                <th className="p-2 text-center">Gross Margin</th>
                <th className="p-2 text-center">Recurring?</th>
                <th className="p-2 text-center rounded-tr">Scale?</th>
              </tr>
            </thead>
            <tbody>
              {[
                { stream: "Grocery / Core Retail", margin: "~25%", recurring: "High (staples)", scale: "Linear" },
                { stream: "Advertising (Walmart Connect)", margin: "60-80%", recurring: "High (B2B contract)", scale: "Exponential" },
                { stream: "Membership (Walmart+)", margin: "Near 100%", recurring: "Very high (subscription)", scale: "Exponential" },
                { stream: "Marketplace (3P Sellers)", margin: "70-80% (fees)", recurring: "High (platform)", scale: "Exponential" },
              ].map((r, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                  <td className="p-2 font-medium text-stone-700 border border-stone-100">{r.stream}</td>
                  <td className={`p-2 border border-stone-100 text-center font-bold ${i > 0 ? "text-stone-700" : "text-stone-500"}`}>{r.margin}</td>
                  <td className="p-2 border border-stone-100 text-center text-stone-600">{r.recurring}</td>
                  <td className={`p-2 border border-stone-100 text-center font-medium ${i > 0 ? "text-stone-700" : "text-stone-500"}`}>{r.scale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3"> Key Lesson từ Walmart</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5">
          <p className="font-bold mb-2">Học tài chính là học cách hiểu cỗ máy kinh doanh phía sau những báo cáo đó.</p>
          <ul className="text-stone-700 text-sm space-y-1">
            <li>→ Doanh thu đến từ đâu? Nguồn nào có margin cao và recurring?</li>
            <li>→ Business mix đang thay đổi ra sao? Walmart đang ít giống retailer hơn</li>
            <li>→ Management đang đánh đổi ngắn hạn (low margin grocery) lấy dài hạn (platform, advertising)?</li>
            <li>→ CEO/CFO kể gì trong earnings call - đó là thesis đầu tư, không chỉ là con số</li>
          </ul>
        </div>
      </section>
    </LessonPageLayout>
  );
}
