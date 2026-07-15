"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 47, day: 74, accent: "amber",
  title: "Phân tích Doanh nghiệp Bán lẻ",
  subtitle: "Store productivity, same-store sales growth và payback period",
  duration: "8 phút", difficulty: "Trung bình", emoji: "🛒",
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
    explanation: "Same-store sales growth (SSSG) là tăng trưởng doanh thu tại các cửa hàng đã hoạt động từ kỳ trước - tách biệt khỏi tăng trưởng do mở thêm cửa hàng mới. SSSG dương cho thấy cửa hàng hiện tại đang hoạt động tốt hơn, không phải chỉ nhờ mở rộng quy mô.",
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
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Phân tích Doanh nghiệp Bán lẻ</h2>
      <p className="text-stone-500 text-sm mb-8">Nhìn đúng một chuỗi: không chỉ đếm số cửa hàng mà phải đọc unit economics của từng điểm bán</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Ý tưởng cốt lõi</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Khi phân tích doanh nghiệp bán lẻ, sai lầm phổ biến nhất là nhìn thấy chuỗi mở thêm hàng trăm cửa hàng rồi kết luận ngay rằng công ty đang tăng trưởng mạnh. Trong bán lẻ, <strong>tăng số cửa hàng chỉ là tăng "container"</strong>; thứ quyết định giá trị là mỗi container đó tạo ra bao nhiêu doanh thu, bao nhiêu lợi nhuận, quay vòng hàng nhanh hay chậm, và mất bao lâu để hoàn vốn.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Một chuỗi mở nhanh có thể thực sự rất tốt nếu từng cửa hàng mới hoàn vốn nhanh, giữ được biên lợi nhuận và không kéo căng working capital. Ngược lại, chuỗi cũng có thể đang đốt tiền nếu doanh thu cửa hàng cũ chững lại, tồn kho phình ra, và cửa hàng mới phải mất 2-3 năm mới gỡ vốn.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Framework 4 câu hỏi phải trả lời</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              title: "1. Cửa hàng cũ còn khỏe không?",
              body: "Đọc same-store sales growth (SSSG). Nếu chuỗi tăng trưởng chủ yếu nhờ mở mới trong khi cửa hàng cũ đi ngang hoặc âm, đó là tín hiệu chất lượng tăng trưởng đang xấu đi.",
            },
            {
              title: "2. Mỗi cửa hàng kiếm được bao nhiêu?",
              body: "Nhìn store productivity: doanh thu/cửa hàng, EBITDA/cửa hàng, lợi nhuận cửa hàng trưởng thành. Không phải mọi cửa hàng đều có chất lượng như nhau.",
            },
            {
              title: "3. Mở mới có đáng tiền không?",
              body: "Kiểm tra capex cho một cửa hàng mới, thời gian hoàn vốn, và lợi nhuận sau khi cửa hàng đi vào trạng thái ổn định. Mở nhanh nhưng hoàn vốn chậm là dấu hiệu dùng vốn kém.",
            },
            {
              title: "4. Dòng tiền có chịu nổi tốc độ mở rộng không?",
              body: "Bán lẻ là game của tồn kho, thuê mặt bằng, nhân sự, logistics. Doanh thu tăng mà dòng tiền hoạt động âm kéo dài thường nghĩa là tăng trưởng đang bị tài trợ bằng vốn lưu động hoặc nợ.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-sm font-bold text-stone-900 mb-2">{item.title}</p>
              <p className="text-sm leading-relaxed text-stone-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Bộ chỉ số cần theo dõi</h3>
        <div className="space-y-4">
          <div className="border-l-2 border-amber-300 pl-4 py-1">
            <div className="font-bold text-stone-800 text-sm">Store Productivity</div>
            <p className="text-stone-600 text-sm mt-1">
              Doanh thu mỗi cửa hàng và lợi nhuận mỗi cửa hàng. Nếu chuỗi tăng từ 300 lên 500 cửa hàng nhưng doanh thu/cửa hàng giảm đều, có thể công ty đang mở vào vị trí xấu hơn hoặc cannibalize doanh thu lẫn nhau.
            </p>
          </div>
          <div className="border-l-2 border-amber-300 pl-4 py-1">
            <div className="font-bold text-stone-800 text-sm">Same-Store Sales Growth (SSSG)</div>
            <p className="text-stone-600 text-sm mt-1">
              SSSG tách tăng trưởng hữu cơ của cửa hàng cũ khỏi tăng trưởng nhờ mở mới. Đây là cách biết khách quay lại nhiều hơn, ticket size tăng hơn, hay chuỗi chỉ đang đẩy số cửa hàng để giữ headline đẹp.
            </p>
          </div>
          <div className="border-l-2 border-amber-300 pl-4 py-1">
            <div className="font-bold text-stone-800 text-sm">Payback Period</div>
            <p className="text-stone-600 text-sm mt-1">
              Thời gian hoàn vốn của một cửa hàng mới. 12-18 tháng có thể rất tốt trong nhiều mô hình convenience/pharmacy; 30-36 tháng cần đặt câu hỏi liệu ROI còn hấp dẫn hay không.
            </p>
          </div>
          <div className="border-l-2 border-amber-300 pl-4 py-1">
            <div className="font-bold text-stone-800 text-sm">Inventory Turnover và Gross Margin</div>
            <p className="text-stone-600 text-sm mt-1">
              Turnover tốt cho thấy công ty bán được hàng nhanh, ít bị kẹt vốn. Gross margin cho biết sức mạnh định giá, mix sản phẩm và áp lực khuyến mãi. Nhiều chuỗi "tăng trưởng" thực chất chỉ hy sinh margin để đẩy doanh thu.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Ví dụ đơn giản: cùng mở 100 cửa hàng, chất lượng rất khác</h3>
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-stone-100 text-stone-700">
              <tr>
                <th className="px-4 py-3 text-left font-bold">Chỉ tiêu</th>
                <th className="px-4 py-3 text-left font-bold">Chuỗi A</th>
                <th className="px-4 py-3 text-left font-bold">Chuỗi B</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Số cửa hàng mở mới", "100", "100"],
                ["Doanh thu/cửa hàng/tháng", "1,8 tỷ", "1,1 tỷ"],
                ["Gross margin", "28%", "22%"],
                ["Payback period", "14 tháng", "32 tháng"],
                ["SSSG cửa hàng cũ", "+8%", "-3%"],
                ["Inventory turnover", "9x", "5x"],
              ].map(([label, a, b], index) => (
                <tr key={label} className={index % 2 === 0 ? "bg-white" : "bg-stone-50/60"}>
                  <td className="px-4 py-3 font-medium text-stone-800">{label}</td>
                  <td className="px-4 py-3 text-stone-600">{a}</td>
                  <td className="px-4 py-3 text-stone-600">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-stone-600 text-sm leading-relaxed mt-4">
          Cả hai chuỗi đều có cùng headline "mở thêm 100 cửa hàng", nhưng Chuỗi A đang mở rộng trên nền mô hình đã chứng minh được economics. Chuỗi B có vẻ đang dùng tăng trưởng cửa hàng mới để che việc cửa hàng cũ yếu đi và vốn quay chậm hơn.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Những bẫy dễ dính khi đọc doanh nghiệp bán lẻ</h3>
        <div className="space-y-3">
          {[
            {
              title: "Đếm số cửa hàng thay vì đọc hiệu quả từng cửa hàng",
              body: "Scale không cứu được unit economics tệ. Nếu từng cửa hàng không tạo return tốt, mở nhiều hơn chỉ nhân lỗi lên lớn hơn.",
            },
            {
              title: "Nhìn doanh thu mà quên working capital",
              body: "Bán lẻ có thể tăng doanh thu rất nhanh bằng cách bơm tồn kho và mở rộng footprint. Nếu CFO không theo kịp, tăng trưởng đó tiêu tiền thay vì tạo tiền.",
            },
            {
              title: "Không tách cửa hàng trưởng thành với cửa hàng mới",
              body: "Store base mới mở thường có productivity thấp trong giai đoạn đầu. Phải tách mature stores ra mới biết cỗ máy lõi còn khỏe không.",
            },
            {
              title: "Bỏ qua chất lượng vị trí",
              body: "Một chuỗi thường lấy vị trí đẹp trước, nên các lô mở sau có thể lợi nhuận thấp hơn. Càng về sau, growth có thể khó hơn và ROI giảm dần.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-stone-200 bg-white p-4">
              <p className="text-sm font-bold text-stone-900 mb-1">{item.title}</p>
              <p className="text-sm leading-relaxed text-stone-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Checklist cuối cùng</h3>
        <div className="rounded-2xl bg-stone-900 p-5 text-white">
          <p className="font-bold mb-3">Trước khi kết luận một chuỗi bán lẻ là tốt, hãy tự hỏi:</p>
          <div className="space-y-2 text-sm text-stone-300">
            <div>1. Cửa hàng cũ có đang bán tốt hơn năm trước không?</div>
            <div>2. Mỗi cửa hàng mới mất bao lâu để hoàn vốn?</div>
            <div>3. Gross margin và inventory turnover có giữ được khi mở rộng không?</div>
            <div>4. Dòng tiền hoạt động có tài trợ được tăng trưởng không?</div>
            <div>5. Tăng trưởng đến từ economics tốt hơn hay chỉ từ mở thêm nhiều điểm bán?</div>
          </div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
