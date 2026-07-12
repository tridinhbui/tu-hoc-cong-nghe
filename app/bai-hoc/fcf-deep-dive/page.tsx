"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 55, day: 88, accent: "emerald",
  title: "Free Cash Flow - Đọc Sâu Hơn",
  subtitle: "FCF = OCF − CapEx, NOPAT và Working Capital",
  duration: "7 phút", difficulty: "Khó", emoji: "·",
  nextSlug: undefined, nextTitle: undefined,
};

const quiz: QuizQuestion[] = [
  {
    question: "FCF (Free Cash Flow) tính như thế nào ở dạng đơn giản nhất?",
    options: [
      "Doanh thu − Chi phí",
      "Operating Cash Flow − Capital Expenditure",
      "Lợi nhuận ròng + Khấu hao",
      "EBIT × (1 − Thuế)",
    ],
    correct: 1,
    explanation: "FCF = Operating Cash Flow (OCF) − CapEx. OCF là tiền từ hoạt động kinh doanh, CapEx là tiền đầu tư vào tài sản cố định. FCF là tiền còn lại sau khi đã duy trì và phát triển năng lực kinh doanh - có thể dùng để trả nợ, trả cổ tức, hoặc mua lại cổ phiếu.",
  },
  {
    question: "Tại sao FCF quan trọng hơn lợi nhuận ròng trong nhiều trường hợp?",
    options: [
      "Vì FCF luôn cao hơn lợi nhuận ròng",
      "Vì FCF là tiền thật, còn lợi nhuận có thể bị bóp méo bởi kế toán",
      "Vì lợi nhuận ròng không cần thiết",
      "Vì FCF không phụ thuộc vào doanh thu",
    ],
    correct: 1,
    explanation: "Lợi nhuận kế toán bị ảnh hưởng bởi các quyết định kế toán: phương pháp khấu hao, ghi nhận doanh thu, dự phòng... Còn FCF là tiền thật vào ra khỏi doanh nghiệp - khó bóp méo hơn nhiều. Doanh nghiệp lợi nhuận đẹp nhưng FCF âm kéo dài là warning signal quan trọng.",
  },
  {
    question: "Working Capital tăng ảnh hưởng thế nào đến FCF?",
    options: [
      "FCF tăng theo",
      "FCF giảm - vì vốn bị kẹt trong hàng tồn kho và khoản phải thu",
      "Không ảnh hưởng",
      "FCF tăng mạnh",
    ],
    correct: 1,
    explanation: "Working Capital = Tài sản ngắn hạn − Nợ ngắn hạn (gồm hàng tồn kho, khoản phải thu, khoản phải trả). Khi WC tăng, vốn bị kẹt → OCF giảm → FCF giảm. Công thức đầy đủ: FCF = NOPAT + D&A − CapEx − ΔWorking Capital. ΔWC dương → FCF giảm.",
  },
  {
    question: "Doanh nghiệp có lợi nhuận ròng 100 tỷ nhưng FCF âm 50 tỷ. Điều này có thể gợi ý gì?",
    options: [
      "Không có vấn đề gì",
      "Có thể có vấn đề về working capital, CapEx lớn, hoặc chất lượng lợi nhuận kế toán",
      "Cổ phiếu chắc chắn sẽ tăng",
      "Công ty đang phát triển rất tốt",
    ],
    correct: 1,
    explanation: "Lợi nhuận dương nhưng FCF âm là dấu hiệu cần điều tra. Nguyên nhân có thể: khoản phải thu tăng nhanh (bán hàng nhưng chưa thu tiền), hàng tồn kho phình to, hoặc CapEx lớn. Nếu kéo dài, doanh nghiệp phải đi vay hoặc phát hành cổ phiếu mới để duy trì hoạt động.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Free Cash Flow - Đọc Sâu Hơn</h2>
      <p className="text-stone-500 text-sm mb-8">Tiền thật, không phải lợi nhuận kế toán - đây là cái doanh nghiệp thực sự tạo ra</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Tại sao FCF quan trọng?</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Lợi nhuận trên P&L là con số kế toán. FCF là tiền thật. Doanh nghiệp sống bằng tiền mặt, không phải bằng lợi nhuận kế toán.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Nhiều vụ sụp đổ tài chính bắt đầu từ đây: <strong>lợi nhuận đẹp nhưng dòng tiền không về</strong>. Đọc FCF giúp nhìn thấy sớm hơn những vấn đề mà P&L không thể hiện.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Công thức FCF</h3>
        <div className="space-y-3">
          <div>
            <div className="font-bold text-stone-800 text-sm mb-1">Đơn giản</div>
            <p className="text-stone-600 text-xs font-mono bg-stone-50 p-2 rounded">FCF = OCF − CapEx</p>
            <p className="text-stone-600 text-xs mt-1">OCF = Operating Cash Flow · CapEx = Capital Expenditure</p>
          </div>
          <div>
            <div className="font-bold text-stone-800 text-sm mb-1">Đầy đủ</div>
            <p className="text-stone-600 text-xs font-mono bg-stone-50 p-2 rounded">FCF = NOPAT + D&A − CapEx − ΔWorking Capital</p>
            <p className="text-stone-600 text-xs mt-1">NOPAT = EBIT × (1 − Thuế) · D&A = Khấu hao · ΔWC = Thay đổi vốn lưu động</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Working Capital - Vốn Lưu động</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Working Capital = Tài sản ngắn hạn − Nợ ngắn hạn. Ba thành phần chính:
        </p>
        <div className="space-y-3 text-sm">
          <div className="border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800">Hàng tồn kho</div>
            <p className="text-stone-600 text-xs mt-1">Tăng → vốn bị kẹt. Retailer nhập nhiều cuối năm → WC tăng → FCF giảm tạm thời.</p>
          </div>
          <div className="border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800">Khoản phải thu</div>
            <p className="text-stone-600 text-xs mt-1">Tăng → bán hàng nhưng chưa thu tiền. Doanh thu ghi nhận nhưng tiền chưa về → P&L đẹp nhưng dòng tiền yếu.</p>
          </div>
          <div className="border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800">Khoản phải trả</div>
            <p className="text-stone-600 text-xs mt-1">Tăng → dùng tiền nhà cung cấp lâu hơn. Walmart trả chậm → AP cao → WC thấp → FCF cao hơn.</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">FCF Yield</h3>
        <p className="text-stone-600 text-xs font-mono bg-stone-50 p-2 rounded mb-3">FCF Yield = FCF / Market Cap</p>
        <div className="space-y-2 text-sm text-stone-600">
          <div> - FCF Yield cao → tạo tiền thật so với giá → có thể undervalued</div>
          <div> - FCF Yield thấp → thị trường trả premium → kỳ vọng tăng trưởng cao</div>
          <div> - So sánh với lãi suất phi rủi ro để đánh giá độ hấp dẫn</div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Cách đọc FCF</h3>
        <div className="space-y-2 text-sm text-stone-600">
          <div>1. Lấy FCF từ Báo cáo LCTT (OCF − CapEx)</div>
          <div>2. So sánh FCF với lợi nhuận ròng - lệch lớn thì tìm hiểu tại sao</div>
          <div>3. Nhìn Working Capital: khoản phải thu, tồn kho tăng nhanh hơn doanh thu là warning</div>
          <div>4. So sánh FCF qua các năm - ổn định và tăng trưởng là dấu hiệu doanh nghiệp khỏe</div>
          <div>5. Tính FCF Yield để đánh giá định giá</div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
