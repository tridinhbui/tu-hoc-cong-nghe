"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 1036, day: 89, accent: "violet",
  title: "Định giá DN kiểu bán hết tài sản rồi trả nợ",
  subtitle: "Asset-based Valuation, NAV và RNAV - phần định giá doanh nghiệp, tiếp nối ROIC & Enterprise Value",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🏗️",
  nextSlug: "commodity", nextTitle: "Commodity",
};

const quiz: QuizQuestion[] = [
  {
    question: "DN có 10 tỷ tài sản và 4 tỷ nợ thì NAV là bao nhiêu?",
    options: ["4 tỷ", "6 tỷ", "10 tỷ", "14 tỷ"],
    correct: 1,
    explanation: "NAV = Tổng giá trị tài sản − Tổng nợ phải trả = 10 tỷ − 4 tỷ = 6 tỷ.",
  },
  {
    question: "Vì sao không nên lấy nguyên số trên báo cáo tài chính ra định giá?",
    options: [
      "Vì BCTC không có số",
      "Vì giá sổ sách (book value) có thể khác giá thị trường (fair value)",
      "Vì mọi doanh nghiệp đều không có nợ",
      "Vì giá cổ phiếu luôn tăng",
    ],
    correct: 1,
    explanation: "Giá trên sổ sách chưa chắc là giá thật hiện tại - đất mua từ lâu có thể đang ghi giá thấp dù đã tăng nhiều, nên cần điều chỉnh tài sản về fair value trước khi tính NAV.",
  },
  {
    question: "Doanh nghiệp nào phù hợp nhất với cách định giá dựa trên tài sản?",
    options: [
      "DN bất động sản có nhiều quỹ đất",
      "App mới chỉ có ý tưởng",
      "Agency dựa chủ yếu vào nhân sự",
      "Công ty phần mềm có ít tài sản vật chất",
    ],
    correct: 0,
    explanation: "Asset-based valuation phù hợp nhất khi giá trị doanh nghiệp nằm nhiều trong tài sản có thể nhìn thấy và định giá tương đối rõ - như quỹ đất và dự án của DN bất động sản.",
  },
  {
    question: "Liquidation value là gì?",
    options: [
      "Lợi nhuận dự kiến trong 10 năm",
      "Giá cổ phiếu ngày mai",
      "Số tiền còn lại sau khi bán hết tài sản và trả hết nợ",
      "Tổng doanh thu của doanh nghiệp",
    ],
    correct: 2,
    explanation: "Liquidation value là phần còn lại nếu doanh nghiệp đóng cửa, bán hết tài sản và trả hết nợ - quan trọng nhất khi DN sắp thanh lý.",
  },
];

const glossary: { vi: string; en: string; def: string }[] = [
  { vi: "Định giá dựa trên tài sản", en: "Asset-based Valuation", def: "Định giá doanh nghiệp dựa trên giá trị tài sản, thay vì dòng tiền hay lợi nhuận tương lai." },
  { vi: "Giá trị sổ sách", en: "Book Value", def: "Giá trị đang được ghi nhận trên sổ sách kế toán." },
  { vi: "Giá hợp lý", en: "Fair Value", def: "Giá hợp lý theo thị trường hiện tại, có thể khác giá trị sổ sách." },
  { vi: "Nợ phải trả", en: "Liabilities", def: "Nợ và các nghĩa vụ tài chính phải trả." },
  { vi: "Giá trị tài sản ròng", en: "NAV", def: "Net Asset Value - tổng giá trị tài sản trừ tổng nợ phải trả." },
  { vi: "NAV điều chỉnh", en: "Adjusted NAV", def: "NAV sau khi định giá lại tài sản và nợ theo giá hợp lý." },
  { vi: "NAV đánh giá lại", en: "RNAV", def: "Giá trị tài sản ròng được đánh giá lại theo từng dự án, thường dùng với doanh nghiệp bất động sản." },
  { vi: "Giá trị thanh lý", en: "Liquidation Value", def: "Phần còn lại nếu doanh nghiệp đóng cửa, bán hết tài sản và trả hết nợ." },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Định giá kiểu &quot;bán hết tài sản rồi trả nợ&quot;</h2>
      <p className="text-stone-600 text-sm mb-6 italic">
        Asset-based Valuation - nếu hôm nay bán hết tài sản của DN rồi trả sạch nợ, cổ đông còn lại bao nhiêu?
      </p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📐 Ví dụ đơn giản</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Một doanh nghiệp có <strong>10 tỷ tài sản</strong> gồm tiền, đất, máy móc… và đang nợ <strong>4 tỷ</strong>. Giá trị tài sản ròng là:
        </p>
        <div className="bg-stone-800 text-white rounded-xl p-5 text-center mb-4">
          <div className="font-mono text-xl font-bold mb-1">10 tỷ − 4 tỷ = 6 tỷ</div>
          <p className="text-stone-300 text-sm">Đây chính là cách nghĩ của Asset-based Valuation</p>
        </div>
        <p className="text-stone-600 leading-relaxed mb-4">
          Hiểu đơn giản: DN đang có gì, định giá lại hết, rồi trừ toàn bộ nợ. Phần còn lại tạm coi là giá trị thuộc về cổ đông.
        </p>
        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 font-mono text-sm text-center">
          NAV = Tổng giá trị tài sản − Tổng nợ phải trả
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">⚠️ Vì sao không thể lấy nguyên số trên báo cáo tài chính</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Vì giá trên sổ sách chưa chắc là giá thật hiện tại. Ví dụ đất mua từ lâu có thể đang được ghi giá khá thấp nhưng bây giờ đã tăng giá nhiều. Ngược lại, hàng tồn kho hay máy móc nhìn trên sổ khá đẹp nhưng bán thật chưa chắc được bấy nhiêu.
        </p>
        <p className="text-stone-600 leading-relaxed mb-4">
          Nên người ta thường điều chỉnh tài sản về <strong>fair value</strong>, tức giá hợp lý theo thị trường hiện tại. Sau khi định giá lại tài sản và nợ, mình sẽ có:
        </p>
        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 font-mono text-sm text-center">
          Adjusted NAV = Giá trị hợp lý của tài sản − Giá trị thực của nợ
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🏢 Case thật ở Việt Nam: DN bất động sản</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Với các doanh nghiệp như Vinhomes, người phân tích không chỉ nhìn lợi nhuận năm nay mà còn phải nhìn <strong>quỹ đất và các dự án tương lai</strong>.
        </p>
        <p className="text-stone-600 leading-relaxed mb-4">
          Nhưng không phải cứ có nhiều đất là tự động giá trị cao. Còn phải hỏi: đất ở đâu? Pháp lý xong chưa? Khi nào mở bán? Giá bán dự kiến bao nhiêu? Còn tốn bao nhiêu chi phí xây dựng? DN đang nợ bao nhiêu?
        </p>
        <p className="text-stone-600 leading-relaxed">
          Cùng là một khu đất lớn, nhưng đất đã có pháp lý, gần khu đông dân và sắp mở bán sẽ đáng giá khác hoàn toàn so với đất còn nằm trên kế hoạch. Đó là lý do DN bất động sản thường được định giá bằng <strong>Adjusted NAV</strong> hoặc <strong>RNAV</strong>, tức định giá từng dự án, trừ chi phí còn phải bỏ ra và trừ nợ.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">✅ Cách này thường được dùng khi nào</h3>
        <div className="space-y-2">
          {[
            { label: "DN bất động sản", note: "Vì giá trị nằm nhiều ở đất và dự án" },
            { label: "Quỹ đầu tư, holding", note: "Vì tài sản chủ yếu là tiền, cổ phiếu, trái phiếu hoặc phần vốn tại DN khác" },
            { label: "DN có nhiều tài sản thật", note: "Nhà máy, kho bãi, máy móc, mỏ, tàu thuyền…" },
            { label: "DN đang thua lỗ hoặc khó dự báo dòng tiền", note: "Khi dùng DCF rất khó thì có thể nhìn xem ít nhất tài sản đang đáng giá bao nhiêu" },
            { label: "DN sắp thanh lý", note: "Lúc này quan trọng nhất là bán tài sản, trả nợ rồi còn lại bao nhiêu (liquidation value)" },
            { label: "Mua bán DN nhỏ", note: "Ví dụ mua một cửa hàng hay xưởng sản xuất, xem tiền, hàng hóa, máy móc, đất… trừ nợ còn bao nhiêu" },
          ].map((r) => (
            <div key={r.label} className="flex items-start gap-3 bg-stone-50 rounded-lg p-3 border border-stone-100">
              <span className="mt-1 w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" />
              <div>
                <div className="text-sm font-bold text-stone-700">{r.label}</div>
                <div className="text-xs text-stone-500">{r.note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">❌ Khi nào không nên phụ thuộc quá nhiều vào cách này</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Cách này không quá hợp với <strong>tech, SaaS, consulting, agency</strong> hay các brand mạnh. Ví dụ một công ty phần mềm có thể chỉ có vài cái laptop và văn phòng. Nếu bán hết tài sản vật chất thì gần như không được bao nhiêu. Nhưng giá trị thật lại nằm ở công nghệ, data, khách hàng, đội ngũ, thương hiệu và khả năng kiếm tiền tương lai.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Nên Asset-based Valuation chỉ hợp nhất khi giá trị DN nằm nhiều trong những tài sản có thể nhìn thấy và định giá tương đối rõ.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">📚 Khái niệm quan trọng cần nhớ</h3>
        <div className="rounded-2xl overflow-hidden border-2 border-stone-900 shadow-lg">
          <div className="divide-y divide-stone-100 bg-white">
            {glossary.map(({ vi, en, def }) => (
              <div key={en} className="px-6 py-4">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-bold text-stone-900 text-base">{vi}</span>
                  <span className="text-sm text-stone-500 font-mono bg-stone-100 px-2 py-0.5 rounded">{en}</span>
                </div>
                <p className="text-stone-500 text-sm mt-1 leading-relaxed">{def}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-stone-400 text-xs mt-3">
          Nguồn tự học: IFRS Foundation – IFRS 13, Investor.gov – Net Asset Value, CFA Institute – Equity Valuation và tài liệu nhà đầu tư chính thức của Vinhomes.
        </p>
      </section>
    </LessonPageLayout>
  );
}
