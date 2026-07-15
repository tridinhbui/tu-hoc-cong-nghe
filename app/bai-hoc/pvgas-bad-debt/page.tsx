"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 46, day: 71, accent: "rose",
  title: "Nợ xấu PVGas Q1/2026 - Tập đọc Bad Debts",
  subtitle: "Khoản phải thu, concentration risk và chất lượng doanh thu",
  duration: "6 phút", difficulty: "Trung bình", emoji: "·",
};

const quiz: QuizQuestion[] = [
  {
    question: "Khi đọc bảng nợ xấu, phần giá trị có thể thu hồi cho mình biết điều gì?",
    options: [
      "Công ty có bao nhiêu tiền mặt",
      "Công ty ước tính còn thu lại được bao nhiêu từ khoản nợ",
      "Công ty đã trả cổ tức bao nhiêu",
      "Công ty có bao nhiêu nhân sự",
    ],
    correct: 1,
    explanation: "Trong bảng nợ xấu, 'giá trị có thể thu hồi' (recoverable value) là ước tính của công ty về phần họ còn có thể lấy lại được. Đây là con số quan trọng hơn tổng nợ xấu vì nó cho thấy chất lượng thực của khoản phải thu - không phải tất cả nợ xấu đều mất trắng.",
  },
  {
    question: "Concentration risk trong khoản phải thu nghĩa là gì?",
    options: [
      "Công ty có quá nhiều sản phẩm",
      "Rủi ro nằm nhiều ở một vài khách hàng lớn",
      "Công ty có nhiều chi nhánh",
      "Công ty tăng trưởng quá nhanh",
    ],
    correct: 1,
    explanation: "Concentration risk = rủi ro khi doanh thu hoặc khoản phải thu tập trung vào một số ít khách hàng. Với PVGas, chỉ riêng Tổng công ty Điện lực Dầu khí Việt Nam đã chiếm ~2.891 tỷ trong tổng nợ xấu. Khi một vài đối tác lớn chậm trả, rủi ro lan rộng rất nhanh.",
  },
  {
    question: "Vì sao phải đọc thêm dự phòng và dòng tiền khi phân tích nợ xấu?",
    options: [
      "Vì như vậy mới biết lợi nhuận có chuyển thành tiền thật không",
      "Vì dòng tiền cho biết giá cổ phiếu ngày mai",
      "Vì dự phòng thay thế lợi nhuận",
      "Vì dòng tiền chỉ quan trọng với ngân hàng",
    ],
    correct: 0,
    explanation: "Doanh thu ghi nhận trên P&L không có nghĩa là tiền đã vào tài khoản. Phân tích chuỗi: khoản phải thu → nợ xấu → dự phòng → operating cash flow. Nếu doanh thu tăng nhưng OCF không tăng tương ứng, câu hỏi cần đặt ra là: tiền đang nằm ở đâu?",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Nợ xấu PVGas Q1/2026</h2>
      <p className="text-stone-500 text-sm mb-8">Tập đọc bad debts - doanh thu đã ghi nhận có thu về được không?</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Tại sao nợ xấu đáng đọc?</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Khi nhìn báo cáo tài chính, nhiều người dừng lại ở lợi nhuận. Nhưng lợi nhuận trên P&L là doanh thu đã ghi nhận theo kế toán - không có nghĩa tiền đã thực sự về tay.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Bảng nợ xấu (bad debts) trả lời câu hỏi quan trọng hơn: <strong>tiền đó có thu về được không?</strong>
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Số liệu PVGas - cuối Q1/2026</h3>
        <div className="border border-stone-200 rounded-xl overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead className="bg-stone-100">
              <tr>
                <th className="p-3 text-left text-xs font-semibold text-stone-500">Chỉ tiêu</th>
                <th className="p-3 text-right text-xs font-semibold text-stone-500">Đầu kỳ</th>
                <th className="p-3 text-right text-xs font-semibold text-stone-500">Cuối Q1/2026</th>
              </tr>
            </thead>
            <tbody>
              {[
                { item: "Tổng nợ xấu", before: "5.669 tỷ", after: "4.098 tỷ", good: true },
                { item: "Giá trị có thể thu hồi", before: "2.901 tỷ", after: "1.764 tỷ", good: false },
              ].map((r, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                  <td className="p-3 text-stone-700 text-xs font-medium">{r.item}</td>
                  <td className="p-3 text-right text-stone-500 text-xs font-mono">{r.before}</td>
                  <td className={`p-3 text-right text-xs font-mono font-bold ${r.good ? "text-stone-700" : "text-stone-700"}`}>{r.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-l-4 border-stone-200 pl-4 py-2 bg-stone-50 rounded-r-xl">
          <p className="text-stone-700 text-sm leading-relaxed">
            Nhìn sơ qua, tổng nợ xấu giảm là tín hiệu tích cực. Nhưng <strong>phần giá trị có thể thu hồi cũng giảm mạnh</strong> - từ 2.901 tỷ xuống 1.764 tỷ. Tỷ lệ thu hồi thực tế không cải thiện nhiều như con số bề mặt cho thấy.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Không chỉ nhìn tổng - nhìn chất lượng</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Khi đọc nợ xấu, tổng giảm chỉ là bước đầu. Cần nhìn thêm:
        </p>
        <div className="space-y-3">
          {[
            { step: "Tỷ lệ thu hồi", desc: "Nợ xấu giảm vì công ty thu được tiền, hay vì đã xóa nợ (write-off)? Hai trường hợp khác nhau hoàn toàn." },
            { step: "Chất lượng phần có thể thu hồi", desc: "Phần còn lại này dựa trên tài sản đảm bảo, lịch sử thanh toán của khách hàng, hay chỉ là ước tính lạc quan?" },
            { step: "Xu hướng theo thời gian", desc: "Nợ xấu giảm nhất thời hay đang trong xu hướng cải thiện bền vững? Cần so sánh ít nhất 3-4 quý." },
          ].map(s => (
            <div key={s.step} className="border-l-2 border-stone-200 pl-4 py-1">
              <div className="font-semibold text-stone-800 text-sm mb-0.5">{s.step}</div>
              <p className="text-stone-500 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Concentration Risk - rủi ro tập trung vào điện lực</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Một phần lớn nợ xấu của PVGas đến từ nhóm khách hàng điện. Riêng <strong>Tổng công ty Điện lực Dầu khí Việt Nam</strong> đã chiếm khoảng 2.891 tỷ cuối Q1/2026. Khoản liên quan đến Phú Mỹ 3 tăng từ ~401 tỷ lên hơn 833 tỷ.
        </p>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-4">
          <div className="text-xs font-bold text-stone-500 uppercase mb-3">Tại sao concentration risk nguy hiểm?</div>
          <div className="space-y-2 text-sm text-stone-600">
            <div className="flex gap-3"><span className="text-stone-500 flex-shrink-0"> - </span><span>PVGas bán cho khách hàng lớn, hợp đồng lớn - khi một vài đối tác chậm trả, khoản phải thu phình rất mạnh</span></div>
            <div className="flex gap-3"><span className="text-stone-500 flex-shrink-0"> - </span><span>Khách hàng tập trung trong ngành điện có nghĩa là rủi ro liên quan đến một ngành, một nhóm chính sách</span></div>
            <div className="flex gap-3"><span className="text-stone-500 flex-shrink-0"> - </span><span>Đọc nợ xấu cũng là đọc xem công ty đang phụ thuộc dòng tiền vào những ai</span></div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Mindset khi đọc khoản phải thu</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Đọc theo chuỗi: <strong>Khoản phải thu → Nợ xấu → Dự phòng → Operating Cash Flow</strong>. Từ chuỗi đó có thể đọc được chất lượng doanh thu, rủi ro khách hàng và độ chắc của dòng tiền.
        </p>
        <div className="space-y-2 text-sm text-stone-600">
          {[
            "Tổng nợ xấu giảm - tốt. Nhưng tỷ lệ thu hồi cải thiện không?",
            "Nợ xấu dồn vào nhóm nào? Đây là concentration risk hay rủi ro rải đều?",
            "Operating cash flow có theo kịp doanh thu không? Nếu không, tiền đang nằm ở đâu?",
            "Dự phòng có đủ bao phủ phần nợ khó thu không - hay công ty đang lạc quan quá mức?",
          ].map((s, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-stone-300 flex-shrink-0 font-mono text-xs pt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
