"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 15, day: 15, accent: "stone",
  title: "Đòn bẩy tài chính: khuếch đại cả hai chiều.",
  subtitle: "Đòn bẩy khuếch đại lợi nhuận khi thắng và khuếch đại tổn thất khi thua. Đây là công cụ mạnh nhất trong tài chính và cũng là công cụ nguy hiểm nhất nếu không hiểu đúng.",
  duration: "7 phút", difficulty: "Trung bình", emoji: "·",
  nextSlug: "vay-tien-giau-hay-pha-san", nextTitle: "Day 16: Vay tiền, giàu hay phá sản?",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Bạn mua bất động sản 2 tỷ bằng 500 triệu vốn tự có và vay 1.5 tỷ. Bất động sản tăng 20%. Lợi nhuận thực trên vốn tự có là bao nhiêu?",
    options: [
      "20% vì bất động sản tăng 20%",
      "80% vì 2 tỷ x 20% = 400 triệu lãi trên 500 triệu vốn tự có",
      "40% là trung bình",
      "Không tính được vì còn phải trừ lãi vay",
    ],
    correct: 1,
    explanation: "2 tỷ x 20% = 400 triệu lãi. Vốn tự có chỉ 500 triệu. ROE = 400/500 = 80% (trước lãi vay). Đây là sức mạnh đòn bẩy: tài sản tăng 20% nhưng vốn tự có tăng 80%. Đương nhiên phải trừ thêm lãi vay để tính lợi nhuận thực.",
  },
  {
    question: "Cùng ví dụ trên, nhưng bất động sản giảm 25%. Điều gì xảy ra?",
    options: [
      "Mất 25% vốn tự có",
      "Mất 100% vốn tự có (500 triệu mất trắng) và vẫn còn nợ ngân hàng 1.5 tỷ",
      "Mất 25% tổng tài sản là 500 triệu",
      "Chỉ mất 25% của phần vay 1.5 tỷ",
    ],
    correct: 1,
    explanation: "2 tỷ x 25% = mất 500 triệu. Vốn tự có chỉ có 500 triệu. Toàn bộ vốn tự có bị xóa. Nhưng vẫn còn nợ 1.5 tỷ với ngân hàng. Đây là âm vốn chủ (negative equity): đòn bẩy làm mọi thứ tệ hơn gấp 4 lần theo chiều xuống.",
  },
  {
    question: "Tại sao các quỹ đầu tư chuyên nghiệp thường giới hạn đòn bẩy?",
    options: [
      "Vì quy định pháp luật bắt buộc",
      "Vì đòn bẩy cao có thể gây ra calls margin và buộc bán tài sản vào thời điểm tệ nhất, khuếch đại tổn thất",
      "Vì nhà đầu tư không thích đòn bẩy",
      "Vì đòn bẩy chỉ hoạt động trong thị trường tăng",
    ],
    correct: 1,
    explanation: "Margin call: khi giá trị tài sản giảm xuống dưới ngưỡng, phải nạp thêm tiền hoặc bán tài sản. Nếu buộc phải bán khi thị trường đang hoảng loạn, tổn thất có thể trở nên không kiểm soát được.",
  },
];

const CONCEPTS = [
  { vi: "Đòn bẩy tài chính", en: "Financial Leverage", def: "Sử dụng vốn vay để khuếch đại quy mô đầu tư và tiềm năng lợi nhuận (và tổn thất)" },
  { vi: "Tỷ lệ đòn bẩy", en: "Leverage Ratio", def: "Tổng tài sản chia vốn tự có; tỷ lệ 4:1 có nghĩa là 1 đồng vốn kiểm soát 4 đồng tài sản" },
  { vi: "Margin Call", en: "Margin Call", def: "Yêu cầu nạp thêm vốn hoặc bán tài sản khi giá trị tài sản giảm xuống dưới ngưỡng yêu cầu" },
  { vi: "Vốn chủ sở hữu âm", en: "Negative Equity", def: "Khi giá trị tài sản thấp hơn giá trị khoản nợ; vốn tự có thực sự đã âm" },
  { vi: "Chi phí vốn", en: "Cost of Capital", def: "Lãi suất phải trả cho vốn vay; đòn bẩy chỉ tạo ra giá trị khi lợi nhuận vượt chi phí vốn" },
];

const TAKEAWAYS = [
  "Đòn bẩy khuếch đại cả hai chiều: tăng lợi nhuận khi thắng, tăng tổn thất khi thua theo cùng hệ số.",
  "Đòn bẩy chỉ có ý nghĩa khi lợi nhuận kỳ vọng vượt chi phí vốn vay.",
  "Rủi ro đặc thù của đòn bẩy: margin call và âm vốn chủ, buộc bán tài sản vào thời điểm tệ nhất.",
  "Mức đòn bẩy hợp lý phụ thuộc vào loại tài sản, độ biến động, và khả năng chịu đựng rủi ro của bạn.",
];

export default function DonBayTaiChinhPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Đòn bẩy là công cụ cho phép bạn kiểm soát tài sản lớn hơn số vốn bạn thực sự có. Nó khuếch đại mọi thứ: cả lợi nhuận lẫn tổn thất. Hiểu đúng đòn bẩy là ranh giới giữa công cụ xây dựng tài sản và công cụ phá hủy tài sản.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Cơ chế khuếch đại của đòn bẩy</h3>
          <p>
            Khi bạn mua tài sản hoàn toàn bằng vốn tự có, lợi nhuận bằng với mức tăng giá tài sản. Nhưng khi dùng đòn bẩy, tức là dùng một phần vốn vay để mua, lợi nhuận trên vốn tự có được khuếch đại theo tỷ lệ đòn bẩy.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-4">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">So sánh: có và không có đòn bẩy</p>
            <div className="space-y-3 text-base text-stone-700">
              <div className="pb-3 border-b border-stone-100">
                <p className="font-semibold text-stone-900 mb-1">Không đòn bẩy</p>
                <p>Mua 1 tỷ cổ phiếu bằng 1 tỷ vốn tự có. Cổ phiếu tăng 20% = lãi 200 triệu = ROE 20%.</p>
              </div>
              <div className="pb-3 border-b border-stone-100">
                <p className="font-semibold text-stone-900 mb-1">Đòn bẩy 2:1</p>
                <p>Mua 2 tỷ cổ phiếu bằng 1 tỷ vốn tự có + 1 tỷ vay. Cổ phiếu tăng 20% = lãi 400 triệu = ROE 40% (trước lãi vay).</p>
              </div>
              <div>
                <p className="font-semibold text-stone-900 mb-1">Đòn bẩy 2:1 khi thua</p>
                <p>Cổ phiếu giảm 20% = mất 400 triệu = ROE -40% (trước lãi vay). Mất 40% vốn tự có dù tài sản chỉ giảm 20%.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Rủi ro đặc thù: margin call và âm vốn</h3>
          <p>
            Đòn bẩy không chỉ khuếch đại tổn thất, nó còn tạo ra những rủi ro không tồn tại khi đầu tư thuần vốn tự có.
          </p>
          <p>
            <strong className="text-stone-900">Margin call</strong> xảy ra khi giá trị tài sản giảm xuống dưới mức tối thiểu mà người cho vay yêu cầu. Lúc đó, bạn phải nạp thêm tiền mặt ngay lập tức hoặc bị bán tài sản. Vấn đề là margin call thường xảy ra đúng lúc thị trường hoảng loạn, khi mọi người đang bán ra và giá đang ở mức thấp nhất. Bị buộc bán vào thời điểm đó là trường hợp tệ nhất có thể.
          </p>
          <p>
            <strong className="text-stone-900">Âm vốn chủ</strong> (negative equity) xảy ra khi giá trị tài sản giảm xuống dưới giá trị khoản nợ. Trong bất động sản, điều này có nghĩa là bạn bán nhà vẫn không đủ trả nợ ngân hàng. Trong đầu tư chứng khoán ký quỹ, bạn mất toàn bộ vốn và còn nợ thêm.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Đòn bẩy khi nào hợp lý</h3>
          <p>
            Đòn bẩy không phải luôn sai. Nó hợp lý khi:
          </p>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Lợi nhuận kỳ vọng vượt chi phí vốn", rest: ": nếu tài sản kỳ vọng 15%/năm và lãi vay 8%, có margin an toàn 7%" },
              { bold: "Tài sản ít biến động", rest: ": bất động sản cho thuê biến động ít hơn cổ phiếu đơn lẻ, chịu được đòn bẩy tốt hơn" },
              { bold: "Dòng tiền dương từ tài sản", rest: ": thu nhập thuê trả lãi vay, không phụ thuộc vào việc bán tài sản" },
              { bold: "Có khả năng chịu đựng nếu tệ nhất", rest: ": nếu tài sản giảm 30%, bạn vẫn có thể tiếp tục trả lãi và không bị margin call" },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>
          <p>
            Đòn bẩy nguy hiểm nhất khi kết hợp với tài sản biến động cao (cổ phiếu), thời gian đầu tư ngắn, và không có quỹ dự phòng để duy trì vị thế khi thị trường bất lợi.
          </p>
        </section>

        <div className="rounded-2xl overflow-hidden border-2 border-stone-900 shadow-lg">
          <div className="bg-stone-900 px-6 py-4">
            <p className="text-white font-extrabold text-lg tracking-wide">Khái niệm cần nhớ</p>
            <p className="text-stone-400 text-sm mt-0.5">Chạm hoặc di chuột vào từng dòng</p>
          </div>
          <div className="divide-y divide-stone-100 bg-white">
            {CONCEPTS.map(({ vi, en, def }) => (
              <div key={en} className="group px-6 py-4 flex items-start gap-4 cursor-default transition-all duration-200 hover:bg-stone-50 hover:pl-8">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-bold text-stone-900 text-base group-hover:text-stone-700 transition-colors">{vi}</span>
                    <span className="text-sm text-stone-400 font-mono bg-stone-100 px-2 py-0.5 rounded group-hover:bg-stone-200 transition-colors">{en}</span>
                  </div>
                  <p className="text-stone-500 text-base mt-1 leading-relaxed group-hover:text-stone-700 transition-colors">{def}</p>
                </div>
                <span className="text-stone-200 group-hover:text-stone-400 transition-colors text-lg mt-0.5 flex-shrink-0">→</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-stone-900 px-6 py-5">
            <p className="text-white font-extrabold text-xl tracking-wide">Ghi nhớ nhanh</p>
            <p className="text-stone-400 text-sm mt-0.5">4 điều cốt lõi từ bài này</p>
          </div>
          <div className="bg-stone-800 divide-y divide-stone-700">
            {TAKEAWAYS.map((t, i) => (
              <div key={i} className="group flex items-start gap-4 px-6 py-5 cursor-default transition-all duration-200 hover:bg-stone-700">
                <span className="w-8 h-8 rounded-full bg-stone-600 group-hover:bg-stone-500 transition-colors flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-stone-200 group-hover:text-white text-lg leading-relaxed transition-colors font-medium">{t}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center space-y-2 py-4">
          <p className="text-stone-400 text-base">Đòn bẩy không tạo ra lợi nhuận từ không khí.</p>
          <p className="text-stone-900 font-bold text-xl">Nó chỉ dịch chuyển rủi ro từ tương lai về hiện tại và từ người cho vay sang bạn. Dùng có ý thức hay không dùng.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
