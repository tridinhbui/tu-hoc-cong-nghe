"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 8, day: 8, accent: "stone",
  title: "Sức mạnh của thời gian trong tài chính.",
  subtitle: "Thời gian là tài sản quý giá nhất trong đầu tư. Không thể mua thêm, không thể lấy lại, và nó không chờ đợi bất kỳ ai.",
  duration: "6 phút", difficulty: "Dễ", emoji: "·",
  nextSlug: "lam-phat-la-gi", nextTitle: "Day 9: Lạm phát là gì?",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Người A đầu tư 5 triệu/tháng từ năm 25 đến 35 tuổi rồi dừng. Người B đầu tư 5 triệu/tháng từ năm 35 đến 65 tuổi. Lãi suất 10%/năm. Ai có nhiều tiền hơn lúc 65 tuổi?",
    options: [
      "Người B vì đầu tư 30 năm nhiều hơn",
      "Người A vì bắt đầu sớm hơn, dù chỉ đầu tư 10 năm",
      "Như nhau vì cùng số tiền mỗi tháng",
      "Không thể tính được",
    ],
    correct: 1,
    explanation: "Người A đầu tư 10 năm nhưng tiền tăng trưởng 40 năm (từ 25 đến 65). Người B đầu tư 30 năm nhưng chỉ tăng trưởng 30 năm. Thời gian tăng trưởng quyết định kết quả, không phải thời gian đóng tiền.",
  },
  {
    question: "Tại sao bắt đầu đầu tư sớm quan trọng hơn đầu tư nhiều?",
    options: [
      "Vì thị trường luôn tăng trong dài hạn",
      "Vì lãi kép cần thời gian dài để tạo ra sự khác biệt lớn; thêm 10 năm đầu có thể quan trọng hơn thêm 50% vốn",
      "Vì người trẻ chịu rủi ro tốt hơn",
      "Vì lãi suất thường cao hơn khi thị trường mới nổi",
    ],
    correct: 1,
    explanation: "Lãi kép tăng trưởng hàm mũ, không tuyến tính. 10 năm bắt đầu sớm hơn có thể tạo ra nhiều tiền hơn 20 năm đầu tư thêm về sau.",
  },
  {
    question: "Dollar Cost Averaging (DCA) là gì và tại sao phù hợp với đầu tư dài hạn?",
    options: [
      "Đầu tư toàn bộ tiền một lần khi thị trường thấp",
      "Đầu tư đều đặn một khoản cố định mỗi tháng bất kể giá thị trường",
      "Chuyển tiền sang đô la để bảo vệ tài sản",
      "Tính trung bình lãi suất nhiều khoản vay",
    ],
    correct: 1,
    explanation: "DCA loại bỏ áp lực phải chọn đúng thời điểm vào thị trường. Mua đều hàng tháng: khi giá thấp mua được nhiều, khi cao mua ít hơn. Trung bình giá mua thấp hơn đỉnh thị trường.",
  },
];

const CONCEPTS = [
  { vi: "Thời gian đầu tư", en: "Investment Horizon", def: "Khoảng thời gian bạn dự kiến giữ đầu tư; dài hơn thường cho phép chấp nhận rủi ro cao hơn" },
  { vi: "Đầu tư định kỳ", en: "Dollar Cost Averaging (DCA)", def: "Đầu tư một khoản cố định theo định kỳ bất kể giá thị trường, giảm tác động của biến động ngắn hạn" },
  { vi: "Tái đầu tư cổ tức", en: "Dividend Reinvestment", def: "Thay vì rút cổ tức ra tiêu, dùng nó mua thêm cổ phiếu để tăng cường hiệu ứng lãi kép" },
  { vi: "Chi phí chậm bắt đầu", en: "Cost of Delay", def: "Số tiền bị mất do bắt đầu đầu tư muộn; thường lớn hơn nhiều người nghĩ" },
];

const TAKEAWAYS = [
  "Bắt đầu sớm quan trọng hơn đầu tư nhiều: 10 năm đầu sớm hơn có thể vượt 20 năm đầu tư thêm.",
  "Thời gian tăng trưởng của tiền quan trọng hơn thời gian bạn bỏ tiền vào.",
  "DCA: đầu tư đều đặn hàng tháng, không cần chờ thời điểm tốt và không cần dự đoán thị trường.",
  "Mỗi năm trì hoãn bắt đầu đầu tư có chi phí cụ thể, tính được bằng công thức lãi kép.",
];

export default function SucManhThoiGianPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Trong tài chính, thời gian không chỉ là một con số trên lịch. Thời gian là tài nguyên có giá trị thực sự, và giống như mọi tài nguyên có giá trị, nó có thể bị lãng phí nếu không được sử dụng đúng cách.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Thí nghiệm tư duy: ai giàu hơn?</h3>
          <p>
            Hãy xem xét hai người, cùng đầu tư 5 triệu đồng mỗi tháng vào quỹ chỉ số với lãi suất bình quân 10% mỗi năm.
          </p>
          <p>
            Người A bắt đầu lúc 25 tuổi và dừng lúc 35 tuổi. Tổng cộng họ bỏ vào 600 triệu đồng trong 10 năm, rồi không đụng đến nữa.
          </p>
          <p>
            Người B bắt đầu lúc 35 tuổi và đầu tư đều đặn cho đến năm 65 tuổi. Tổng cộng họ bỏ vào 1.8 tỷ đồng trong 30 năm.
          </p>
          <p>
            Đến 65 tuổi, ai nhiều tiền hơn? Câu trả lời là Người A, dù chỉ đầu tư một phần ba thời gian và một phần ba số tiền.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Tại sao lại như vậy</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Tiền của Người A có 40 năm để tăng trưởng theo lãi kép, từ lúc 25 đến 65 tuổi. Tiền của Người B chỉ có tối đa 30 năm. Trong tài chính, <strong className="text-stone-900">thời gian tăng trưởng quan trọng hơn thời gian đóng tiền</strong>. Đây là bài học mà hầu hết mọi người học quá muộn.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Chi phí của việc chậm bắt đầu</h3>
          <p>
            Nhiều người trì hoãn đầu tư với lý do: chờ đến khi có đủ tiền hơn, chờ thị trường ổn định hơn, hoặc chờ đến khi hiểu rõ hơn. Nhưng mỗi năm trì hoãn đều có chi phí cụ thể.
          </p>
          <p>
            Nếu bạn 25 tuổi và bắt đầu đầu tư 3 triệu mỗi tháng với lãi 10% mỗi năm, đến 65 tuổi bạn có khoảng 19 tỷ đồng. Nếu bạn bắt đầu lúc 35 tuổi, con số đó giảm xuống còn khoảng 7 tỷ. Mười năm trì hoãn làm mất đi 12 tỷ đồng, dù số tiền đóng hàng tháng hoàn toàn giống nhau.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Đầu tư định kỳ: không cần dự đoán thị trường</h3>
          <p>
            Một trong những trở ngại lớn nhất của người mới bắt đầu đầu tư là câu hỏi: <em>khi nào là thời điểm tốt để vào?</em> Câu trả lời thực tế là: hầu như không ai dự đoán được thời điểm tốt nhất một cách nhất quán.
          </p>
          <p>
            <strong className="text-stone-900">Dollar Cost Averaging (DCA)</strong> giải quyết vấn đề này bằng cách đơn giản: đầu tư một khoản cố định mỗi tháng, bất kể thị trường đang ở đâu. Khi giá thấp, số tiền cố định mua được nhiều đơn vị hơn. Khi giá cao, mua được ít hơn. Trung bình giá mua theo thời gian thấp hơn đỉnh thị trường.
          </p>
          <p>
            Chiến lược này không tối ưu về mặt toán học trong mọi kịch bản, nhưng nó loại bỏ nhu cầu phải dự đoán thị trường và loại bỏ áp lực tâm lý khi vào thị trường đúng thời điểm. Với hầu hết người đầu tư dài hạn, đó là lợi thế đủ lớn.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Kiên nhẫn là kỹ năng tài chính thực sự</h3>
          <p>
            Sức mạnh của thời gian chỉ phát huy khi bạn không rút ra sớm. Thị trường tài chính thường xuyên trải qua những giai đoạn biến động mạnh khiến nhiều người hoảng loạn và bán ra đúng lúc tệ nhất.
          </p>
          <p>
            Nhà đầu tư trung bình trong lịch sử có lợi nhuận thấp hơn nhiều so với chính các quỹ họ đầu tư, vì họ mua vào khi thị trường cao và bán ra khi thị trường thấp. Điều đó có nghĩa là kiên nhẫn và kỷ luật, duy trì đầu tư qua các giai đoạn thị trường xấu, thực ra là kỹ năng tạo ra nhiều giá trị tài chính nhất.
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
          <p className="text-stone-400 text-base">Thời gian là tài sản duy nhất không thể mua thêm.</p>
          <p className="text-stone-900 font-bold text-xl">Bắt đầu sớm không phải lời khuyên lịch sự. Đó là sự khác biệt giữa kết quả tốt và kết quả rất tốt.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
