"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 12, day: 12, accent: "orange",
  title: "Đánh Giá Thương Vụ Đầu Tư",
  subtitle: "Cách đọc một thương vụ mua lại doanh nghiệp như nhà đầu tư chuyên nghiệp",
  duration: "9 phút", difficulty: "Khó", emoji: "🤝",
  nextSlug: "on-tap-npv", nextTitle: "Ôn Tập NPV",
};

const quiz: QuizQuestion[] = [
  {
    question: "Khi trình bày một thương vụ mua lại dùng nợ vay (LBO), câu đầu tiên nhà đầu tư thường hỏi là gì?",
    options: [
      "Doanh thu là bao nhiêu?",
      "Mua vào và bán ra ở mức định giá bao nhiêu lần lợi nhuận vận hành?",
      "Bao nhiêu nhân viên?",
      "Lãi suất vay là bao nhiêu?",
    ],
    correct: 1,
    explanation: "LBO là thương vụ mua doanh nghiệp bằng nhiều nợ vay. Nhà đầu tư nhìn rất kỹ mức định giá lúc mua vào và bán ra: mua ở bao nhiêu lần EBITDA, bán ở bao nhiêu lần EBITDA. EBITDA là lợi nhuận trước lãi vay, thuế, khấu hao và phân bổ.",
  },
  {
    question: "3 nguồn tạo lợi nhuận chính trong một thương vụ LBO là gì?",
    options: [
      "Tăng doanh thu, cắt chi phí, tái cấp vốn",
      "Tăng lợi nhuận vận hành, trả bớt nợ, bán ra ở mức định giá cao hơn",
      "Bán tài sản, rút cổ tức bằng nợ, IPO",
      "Tăng trưởng nội bộ, mua bán sáp nhập, tăng thị phần",
    ],
    correct: 1,
    explanation: "Trong LBO, lợi nhuận thường đến từ 3 nguồn: doanh nghiệp kiếm nhiều tiền hơn, dùng dòng tiền để trả bớt nợ, và bán lại công ty ở mức định giá cao hơn lúc mua.",
  },
  {
    question: "Tại sao quỹ đầu tư tư nhân thích doanh nghiệp có doanh thu lặp lại?",
    options: [
      "Doanh thu lặp lại luôn cao hơn doanh thu một lần",
      "Dự đoán được, ổn định → có thể vay nợ nhiều hơn vì bên cho vay tin tưởng hơn",
      "Doanh thu lặp lại không bị thuế",
      "Nhà đầu tư chỉ thích mô hình thuê bao",
    ],
    correct: 1,
    explanation: "Doanh thu lặp lại là doanh thu có khả năng quay lại đều đặn, ví dụ hợp đồng thuê bao hoặc hợp đồng dài hạn. Dòng tiền dễ dự báo làm bên cho vay tự tin hơn, nên thương vụ có thể dùng nợ vay an toàn hơn.",
  },
  {
    question: "Nhân 3 lần vốn trong 5 năm tương đương tỷ suất sinh lời hằng năm khoảng bao nhiêu?",
    options: ["~15%", "~25%", "~50%", "~60%"],
    correct: 1,
    explanation: "MOIC là số lần nhân vốn: bỏ 1 đồng thu về 3 đồng là MOIC 3x. IRR là tỷ suất sinh lời hằng năm. MOIC 3x trong 5 năm tương đương IRR khoảng 25%.",
  },
  {
    question: "Dấu hiệu cảnh báo nào có thể khiến nhà đầu tư bỏ qua một thương vụ ngay?",
    options: [
      "Biên lợi nhuận vận hành dưới 20%",
      "Phụ thuộc hoàn toàn vào 1-2 cá nhân chủ chốt",
      "Công ty chưa niêm yết",
      "Revenue dưới 500 tỷ",
    ],
    correct: 1,
    explanation: "Rủi ro phụ thuộc cá nhân chủ chốt nghĩa là nếu CEO hoặc founder rời đi, doanh nghiệp có thể suy yếu mạnh. Nhà đầu tư thích mô hình có thể vận hành bền vững, không phụ thuộc quá nặng vào một người.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Đánh giá thương vụ đầu tư - thực chiến</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Khung phân tích một thương vụ như nhà đầu tư tư nhân: hiểu doanh nghiệp, đọc số, soi rủi ro và chọn điểm thoát.</p>

      <section className="mb-8 rounded-xl border border-orange-100 bg-orange-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-orange-800 mb-2">Nói đơn giản</h3>
        <p className="text-sm leading-relaxed text-stone-700">
          Một thương vụ tốt không chỉ là “công ty hay”. Nhà đầu tư phải biết mua với giá nào, dùng bao nhiêu nợ, dòng tiền có trả được nợ không, và sau vài năm có thể bán lại cho ai.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Khung 5 bước phân tích thương vụ</h3>
        <div className="space-y-3">
          {[
            {
              n: 1, title: "Hiểu mô hình kinh doanh",
              questions: ["Công ty kiếm tiền bằng cách nào?", "Doanh thu đến từ đâu?", "Lợi thế cạnh tranh nằm ở đâu?", "Ngành đang tăng hay giảm?"],
            },
            {
              n: 2, title: "Phân tích tài chính",
              questions: ["Doanh thu 3-5 năm tăng ra sao?", "Biên lợi nhuận vận hành đi lên hay đi xuống?", "Lợi nhuận có chuyển thành tiền mặt không?", "Có cần nhiều vốn lưu động không?"],
            },
            {
              n: 3, title: "Cấu trúc thương vụ",
              questions: ["Giá mua bằng bao nhiêu lần lợi nhuận vận hành?", "Vay nợ bao nhiêu so với lợi nhuận vận hành?", "Nhà đầu tư bỏ vốn thật bao nhiêu?", "Ban điều hành có tiếp tục góp vốn không?"],
            },
            {
              n: 4, title: "Kế hoạch tạo giá trị",
              questions: ["Tăng trưởng tự thân đến từ đâu?", "Có thể cải thiện vận hành gì?", "Có thể mua thêm công ty nhỏ không?", "3-5 năm nữa bán cho ai?"],
            },
            {
              n: 5, title: "Đánh giá rủi ro",
              questions: ["Rủi ro chính là gì?", "Kịch bản xấu nhất ra sao?", "Có còn dư địa trả nợ không?", "Dấu hiệu cảnh báo nào?"],
            },
          ].map(step => (
            <div key={step.n} className="border border-stone-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 bg-stone-800 text-white rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0">{step.n}</div>
                <div className="font-bold text-stone-800 text-sm">{step.title}</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {step.questions.map((q, i) => (
                  <div key={i} className="text-xs text-stone-600 flex gap-1">
                    <span className="text-stone-500">→</span>{q}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Nguồn tạo lợi nhuận trong LBO</h3>
        <div className="space-y-2">
          {[
            { title: "Tăng lợi nhuận vận hành", desc: "Doanh thu tăng hoặc biên lợi nhuận tốt hơn → EBITDA cao hơn" },
            { title: "Trả bớt nợ", desc: "Dòng tiền dùng để giảm nợ → phần giá trị thuộc về cổ đông tăng lên" },
            { title: "Bán ra ở định giá cao hơn", desc: "Mua vào rẻ hơn, bán ra ở mức định giá tốt hơn" },
          ].map(d => (
            <div key={d.title} className="bg-stone-800 rounded-xl p-4">
              <div className="text-white font-bold text-xs mb-1">{d.title}</div>
              <div className="text-stone-500 text-xs">{d.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Câu hỏi phỏng vấn thực chiến</h3>
        <div className="space-y-3">
          {[
            {
              q: "Hãy giải thích một mô hình LBO",
              a: "Bước 1: mua công ty bằng vốn chủ và nợ vay. Bước 2: dùng dòng tiền tự do để trả nợ và cải thiện EBITDA. Bước 3: bán sau 3-5 năm. Lợi nhuận đến từ phần vốn chủ tăng lên sau khi nợ giảm và công ty có giá trị cao hơn.",
            },
            {
              q: "Doanh nghiệp nào phù hợp với LBO?",
              a: "Dòng tiền ổn định, nhu cầu đầu tư tài sản không quá lớn, vị thế thị trường tốt, còn dư địa cải thiện vận hành, đội ngũ quản lý đáng tin và có người mua lại trong tương lai.",
            },
            {
              q: "Tại sao IRR quan trọng hơn MOIC?",
              a: "MOIC cho biết nhân vốn bao nhiêu lần, còn IRR cho biết tốc độ sinh lời mỗi năm. Nhân 3 lần vốn trong 3 năm tốt hơn nhiều so với nhân 3 lần vốn trong 7 năm.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-xl p-4">
              <div className="font-semibold text-stone-800 text-sm mb-2">Q: {item.q}</div>
              <div className="text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-2 mt-2">A: {item.a}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Dấu hiệu cảnh báo cần chú ý</h3>
        <div className="border-l-2 border-stone-300 pl-4 space-y-2">
          <div className="space-y-1 text-sm text-stone-700">
            {[
              "Một khách hàng chiếm hơn 30% doanh thu",
              "Phụ thuộc quá nhiều vào một cá nhân chủ chốt",
              "Doanh thu giảm hoặc mất thị phần",
              "Khả năng trả lãi yếu ngay từ lúc mua",
              "Ngành đang bị disruption",
              "Số liệu kế toán có dấu hiệu bất thường",
            ].map((f, i) => (
              <div key={i}> - {f}</div>
            ))}
          </div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
