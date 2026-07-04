"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 47, day: 74, accent: "amber",
  title: "Phân tích Doanh nghiệp Bán lẻ",
  subtitle: "Store productivity, same-store sales growth và payback period",
  duration: "6 phút", difficulty: "Trung bình", emoji: "·",
  nextSlug: "bds-business-model", nextTitle: "4 Mô hình Kinh doanh BĐS",
};

const quiz: QuizQuestion[] = [
  {
    question: "Một chuỗi bán lẻ mở từ 500 lên 1.000 cửa hàng trong 1 năm. Điều gì cần kiểm tra thêm trước khi kết luận đây là tăng trưởng tốt?",
    options: [
      "Số lượng cửa hàng tăng bao nhiêu",
      "Doanh thu mỗi cửa hàng, biên lợi nhuận và thời gian hoàn vốn",
      "Logo thương hiệu có đẹp không",
      "Công ty có xuất hiện nhiều trên truyền thông không",
    ],
    correct: 1,
    explanation: "Số lượng cửa hàng tăng là dễ thấy nhất, nhưng không đủ. Cần kiểm tra: store productivity (doanh thu/cửa hàng), biên lợi nhuận mỗi cửa hàng, thời gian hoàn vốn, và chuỗi mở rộng nhanh có tạo áp lực dòng tiền không. Mở nhanh mà cửa hàng mới kém hiệu quả có thể phá hủy giá trị.",
  },
  {
    question: "Same-store sales growth đo điều gì?",
    options: [
      "Doanh thu từ toàn bộ cửa hàng mới",
      "Tăng trưởng doanh thu của các cửa hàng đã hoạt động từ trước",
      "Tổng số nhân viên của công ty",
      "Tốc độ tăng giá cổ phiếu",
    ],
    correct: 1,
    explanation: "Same-store sales growth (SSSG) là tăng trưởng doanh thu tại các cửa hàng đã hoạt động từ kỳ trước — tách biệt khỏi tăng trưởng do mở thêm cửa hàng mới. SSSG dương cho thấy cửa hàng hiện tại đang hoạt động tốt hơn, không phải chỉ nhờ mở rộng quy mô.",
  },
  {
    question: "Nếu một cửa hàng mới mất 36 tháng để hoàn vốn, trong khi cửa hàng cùng ngành chỉ mất 12 tháng, điều này có thể gợi ý gì?",
    options: [
      "Cửa hàng đó chắc chắn tốt hơn",
      "Cửa hàng đó có thể đang dùng vốn kém hiệu quả hơn",
      "Doanh nghiệp không cần quan tâm dòng tiền",
      "Doanh thu chắc chắn sẽ tăng mạnh",
    ],
    correct: 1,
    explanation: "Payback period dài hơn benchmark ngành là dấu hiệu cần điều tra: unit economics kém hơn, chi phí mở cửa hàng cao hơn bình thường, hoặc vị trí mới không hiệu quả. Điều này cũng có nghĩa vốn bị kẹt lâu hơn trong từng cửa hàng mới, ảnh hưởng đến khả năng tiếp tục mở rộng.",
  },
  {
    question: "Với doanh nghiệp bán lẻ, vì sao inventory turnover quan trọng?",
    options: [
      "Vì hàng tồn kho quay càng chậm thì vốn càng dễ bị kẹt",
      "Vì tồn kho càng nhiều thì doanh nghiệp càng chắc chắn có lời",
      "Vì chỉ cần doanh thu tăng là đủ",
      "Vì không liên quan đến dòng tiền",
    ],
    correct: 0,
    explanation: "Hàng tồn kho là tiền bị kẹt trong kho. Turnover thấp = vòng quay chậm = vốn mắc kẹt lâu = áp lực working capital. Với bán lẻ chuỗi lớn, nếu inventory turnover xấu đi khi mở rộng, dòng tiền sẽ bị kéo căng nghiêm trọng dù doanh thu vẫn tăng.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Phân tích Doanh nghiệp Bán lẻ</h2>
      <p className="text-stone-500 text-sm mb-8">Nhìn đúng một chuỗi: không chỉ đếm số cửa hàng</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Ba phần quan trọng nhất</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Khi phân tích doanh nghiệp bán lẻ, ba phần cần nhìn được là: <strong>hiệu quả của chuỗi hiện tại</strong>, <strong>tốc độ mở mới</strong>, và <strong>same-store sales growth</strong>.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Mở thêm cửa hàng nghe rất hấp dẫn — từ 500 lên 1.000 cửa hàng thì nhìn qua sẽ thấy tăng trưởng mạnh. Nhưng nếu doanh thu trung bình mỗi cửa hàng thấp, biên lợi nhuận yếu, chi phí vận hành cao, hoặc cửa hàng mới mất quá lâu để hòa vốn thì tốc độ mở rộng đó chưa chắc đã tốt.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Các chỉ số cần theo dõi</h3>
        <div className="space-y-4">
          <div className="border-l-2 border-stone-300 pl-4 py-2">
            <div className="font-bold text-stone-800 text-sm">Store Productivity</div>
            <p className="text-stone-600 text-sm mt-1">
              Doanh thu mỗi cửa hàng. Hai cửa hàng cùng "một cửa hàng" nhưng nếu một tạo 1 tỷ/tháng, cái kia 2 tỷ/tháng thì chất lượng rất khác nhau.
            </p>
          </div>
          <div className="border-l-2 border-stone-300 pl-4 py-2">
            <div className="font-bold text-stone-800 text-sm">Same-Store Sales Growth (SSSG)</div>
            <p className="text-stone-600 text-sm mt-1">
              Tăng trưởng doanh thu của cửa hàng cũ (không tính cửa hàng mới). SSSG dương = cửa hàng hiện tại đang tốt lên. SSSG âm trong khi mở rộng = cửa hàng cũ đang yếu.
            </p>
          </div>
          <div className="border-l-2 border-stone-300 pl-4 py-2">
            <div className="font-bold text-stone-800 text-sm">New Store Opening</div>
            <p className="text-stone-600 text-sm mt-1">
              Mở nhanh cần đi kèm khả năng vận hành. Mở quá nhanh mà cửa hàng mới kém hiệu quả = áp lực dòng tiền lớn.
            </p>
          </div>
          <div className="border-l-2 border-stone-300 pl-4 py-2">
            <div className="font-bold text-stone-800 text-sm">Payback Period</div>
            <p className="text-stone-600 text-sm mt-1">
              Thời gian cửa hàng mới hoàn vốn. So sánh với benchmark ngành để biết hiệu quả có tốt không.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Điều quan trọng nhất</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          Khi phân tích bán lẻ, số lượng cửa hàng chỉ là con số dễ nhìn. Cái thực sự quan trọng là:
        </p>
        <div className="space-y-2 text-sm text-stone-600">
          <div>— Mỗi cửa hàng tạo ra bao nhiêu tiền (doanh thu, biên lợi nhuận)</div>
          <div>— Mất bao lâu để một cửa hàng mới hoàn vốn</div>
          <div>— Khi chuỗi lớn hơn, vận hành có tốt lên không hay chi phí tăng theo</div>
          <div>— Dòng tiền có đủ để duy trì mở rộng không hay phải đi vay</div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
