"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 55, day: 88, accent: "emerald",
  title: "Dòng Tiền Tự Do - Đọc Sâu Hơn",
  subtitle: "Từ dòng tiền kinh doanh, chi đầu tư tài sản đến vốn lưu động",
  duration: "7 phút", difficulty: "Khó", emoji: "·",
  nextSlug: undefined, nextTitle: undefined,
};

const quiz: QuizQuestion[] = [
  {
    question: "Dòng tiền tự do tính như thế nào ở dạng đơn giản nhất?",
    options: [
      "Doanh thu − Chi phí",
      "Dòng tiền kinh doanh − Chi đầu tư tài sản dài hạn",
      "Lợi nhuận ròng + Khấu hao",
      "EBIT × (1 − Thuế)",
    ],
    correct: 1,
    explanation: "Dòng tiền tự do = dòng tiền kinh doanh − chi đầu tư tài sản dài hạn. Đây là tiền còn lại sau khi doanh nghiệp đã duy trì và phát triển năng lực kinh doanh.",
  },
  {
    question: "Tại sao dòng tiền tự do quan trọng hơn lợi nhuận ròng trong nhiều trường hợp?",
    options: [
      "Vì dòng tiền tự do luôn cao hơn lợi nhuận ròng",
      "Vì dòng tiền tự do gần với tiền thật hơn, còn lợi nhuận có thể bị bóp méo bởi kế toán",
      "Vì lợi nhuận ròng không cần thiết",
      "Vì dòng tiền tự do không phụ thuộc vào doanh thu",
    ],
    correct: 1,
    explanation: "Lợi nhuận kế toán bị ảnh hưởng bởi khấu hao, ghi nhận doanh thu, dự phòng. Dòng tiền tự do nhìn vào tiền thật vào ra khỏi doanh nghiệp, nên là cách kiểm tra chất lượng lợi nhuận.",
  },
  {
    question: "Vốn lưu động tăng ảnh hưởng thế nào đến dòng tiền tự do?",
    options: [
      "Dòng tiền tự do tăng theo",
      "Dòng tiền tự do giảm - vì vốn bị kẹt trong hàng tồn kho và khoản phải thu",
      "Không ảnh hưởng",
      "Dòng tiền tự do tăng mạnh",
    ],
    correct: 1,
    explanation: "Vốn lưu động là tiền bị kẹt trong hàng tồn kho, khoản phải thu sau khi trừ khoản phải trả. Khi vốn lưu động tăng, dòng tiền kinh doanh giảm, nên dòng tiền tự do cũng giảm.",
  },
  {
    question: "Doanh nghiệp có lợi nhuận ròng 100 tỷ nhưng FCF âm 50 tỷ. Điều này có thể gợi ý gì?",
    options: [
      "Không có vấn đề gì",
      "Có thể có vấn đề về vốn lưu động, chi đầu tư tài sản lớn, hoặc chất lượng lợi nhuận kế toán",
      "Cổ phiếu chắc chắn sẽ tăng",
      "Công ty đang phát triển rất tốt",
    ],
    correct: 1,
    explanation: "Lợi nhuận dương nhưng dòng tiền tự do âm là dấu hiệu cần điều tra. Nguyên nhân có thể là bán hàng chưa thu tiền, tồn kho phình to, hoặc chi đầu tư tài sản quá lớn.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Dòng tiền tự do - đọc sâu hơn</h2>
      <p className="text-stone-500 text-sm mb-8">Tiền thật, không phải lợi nhuận kế toán - đây là cái doanh nghiệp thực sự tạo ra</p>

      <section className="mb-10 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-emerald-800 mb-2">Nói đơn giản</h3>
        <p className="text-sm leading-relaxed text-stone-700">
          Bài này đọc sâu hơn bài dòng tiền tự do cơ bản: không chỉ hỏi “còn bao nhiêu tiền”, mà hỏi tiền bị kẹt ở đâu - tài sản cố định, hàng tồn kho, khoản phải thu hay khoản phải trả.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Tại sao dòng tiền tự do quan trọng?</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Lợi nhuận trên báo cáo lãi lỗ là con số kế toán. Dòng tiền tự do gần với tiền thật hơn. Doanh nghiệp sống bằng tiền mặt, không phải bằng lợi nhuận kế toán.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Nhiều vụ sụp đổ tài chính bắt đầu từ đây: <strong>lợi nhuận đẹp nhưng dòng tiền không về</strong>. Đọc dòng tiền tự do giúp nhìn thấy sớm hơn những vấn đề mà báo cáo lãi lỗ không thể hiện.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Công thức dòng tiền tự do</h3>
        <div className="space-y-3">
          <div>
            <div className="font-bold text-stone-800 text-sm mb-1">Đơn giản</div>
            <p className="text-stone-600 text-xs font-mono bg-stone-50 p-2 rounded">Dòng tiền tự do = Dòng tiền kinh doanh − Chi đầu tư tài sản</p>
            <p className="text-stone-600 text-xs mt-1">Dòng tiền kinh doanh là tiền từ hoạt động chính. Chi đầu tư tài sản là tiền mua máy móc, nhà xưởng, phần mềm, công nghệ.</p>
          </div>
          <div>
            <div className="font-bold text-stone-800 text-sm mb-1">Đầy đủ</div>
            <p className="text-stone-600 text-xs font-mono bg-stone-50 p-2 rounded">Dòng tiền tự do = Lợi nhuận vận hành sau thuế + Khấu hao − Chi đầu tư tài sản − Tăng vốn lưu động</p>
            <p className="text-stone-600 text-xs mt-1">Công thức đầy đủ giúp biết tiền bị kẹt ở tài sản dài hạn hay ở vốn lưu động.</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Vốn lưu động</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Vốn lưu động = tài sản ngắn hạn − nợ ngắn hạn. Ba thành phần chính:
        </p>
        <div className="space-y-3 text-sm">
          <div className="border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800">Hàng tồn kho</div>
            <p className="text-stone-600 text-xs mt-1">Tăng → vốn bị kẹt. Nhà bán lẻ nhập nhiều hàng cuối năm → vốn lưu động tăng → dòng tiền tự do giảm tạm thời.</p>
          </div>
          <div className="border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800">Khoản phải thu</div>
            <p className="text-stone-600 text-xs mt-1">Tăng → bán hàng nhưng chưa thu tiền. Doanh thu ghi nhận nhưng tiền chưa về → báo cáo lãi lỗ đẹp nhưng dòng tiền yếu.</p>
          </div>
          <div className="border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800">Khoản phải trả</div>
            <p className="text-stone-600 text-xs mt-1">Tăng → doanh nghiệp đang dùng tiền nhà cung cấp lâu hơn. Điều này có thể làm dòng tiền tự do đẹp hơn trong ngắn hạn.</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Tỷ suất dòng tiền tự do</h3>
        <p className="text-stone-600 text-xs font-mono bg-stone-50 p-2 rounded mb-3">Tỷ suất dòng tiền tự do = Dòng tiền tự do / Giá trị thị trường</p>
        <div className="space-y-2 text-sm text-stone-600">
          <div> - Tỷ suất cao → tạo nhiều tiền thật so với giá → có thể bị định giá thấp</div>
          <div> - Tỷ suất thấp → thị trường đang trả giá cao → kỳ vọng tăng trưởng lớn</div>
          <div> - So sánh với lãi suất phi rủi ro để đánh giá độ hấp dẫn</div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Cách đọc dòng tiền tự do</h3>
        <div className="space-y-2 text-sm text-stone-600">
          <div>1. Lấy dòng tiền kinh doanh trừ chi đầu tư tài sản.</div>
          <div>2. So sánh dòng tiền tự do với lợi nhuận ròng - lệch lớn thì tìm hiểu tại sao.</div>
          <div>3. Nhìn vốn lưu động: phải thu và tồn kho tăng nhanh hơn doanh thu là tín hiệu cần kiểm tra.</div>
          <div>4. So sánh dòng tiền tự do qua nhiều năm - ổn định và tăng trưởng là dấu hiệu doanh nghiệp khỏe.</div>
          <div>5. Tính tỷ suất dòng tiền tự do để đánh giá giá cổ phiếu đang rẻ hay đắt tương đối.</div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
