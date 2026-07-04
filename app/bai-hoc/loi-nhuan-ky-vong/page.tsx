"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 12, day: 12, accent: "stone",
  title: "Lợi nhuận kỳ vọng và sự đánh đổi.",
  subtitle: "Mọi khoản đầu tư đều là sự đánh đổi giữa lợi nhuận và rủi ro. Hiểu cách tính lợi nhuận kỳ vọng là nền tảng để so sánh các cơ hội đầu tư một cách hợp lý.",
  duration: "6 phút", difficulty: "Trung bình", emoji: "·",
  nextSlug: "thanh-khoan-la-gi", nextTitle: "Day 13: Thanh khoản là gì?",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Một khoản đầu tư: 40% khả năng lãi 20%, 60% khả năng lỗ 5%. Lợi nhuận kỳ vọng là bao nhiêu?",
    options: [
      "20% vì đó là kịch bản tích cực",
      "(40% x 20%) + (60% x (-5%)) = 8% - 3% = 5%",
      "7.5% là trung bình của 20% và (-5%)",
      "Không thể tính vì có cả lãi và lỗ",
    ],
    correct: 1,
    explanation: "Lợi nhuận kỳ vọng = tổng của (xác suất x kết quả) cho mỗi kịch bản. (0.4 x 20%) + (0.6 x -5%) = 8% - 3% = 5%. Đây là mức lợi nhuận bình quân nếu lặp lại kịch bản này nhiều lần.",
  },
  {
    question: "Tại sao lợi nhuận kỳ vọng không phải là kết quả sẽ xảy ra trong một lần cụ thể?",
    options: [
      "Vì lợi nhuận kỳ vọng không chính xác",
      "Vì đây là trung bình xác suất qua nhiều lần; một lần cụ thể có thể là bất kỳ kết quả nào trong phân phối",
      "Vì thị trường không hợp lý",
      "Vì công thức tính sai",
    ],
    correct: 1,
    explanation: "Kỳ vọng toán học là kết quả bình quân qua rất nhiều lần thực hiện. Một lần cụ thể: có thể lãi 20%, có thể lỗ 5%, không ai biết trước. Nhưng qua đủ nhiều lần, kết quả bình quân hội tụ về 5%.",
  },
  {
    question: "Sharpe Ratio đo lường điều gì?",
    options: [
      "Tổng lợi nhuận của danh mục đầu tư",
      "Lợi nhuận tính trên mỗi đơn vị rủi ro, để so sánh hiệu quả đầu tư giữa các danh mục khác nhau",
      "Khả năng thanh khoản của tài sản",
      "Mức độ đa dạng hóa của danh mục",
    ],
    correct: 1,
    explanation: "Sharpe Ratio = (lợi nhuận danh mục - lãi suất phi rủi ro) / độ lệch chuẩn. Danh mục lãi 15% với rủi ro cao có thể kém hơn danh mục lãi 10% với rủi ro thấp khi so bằng Sharpe Ratio.",
  },
];

const CONCEPTS = [
  { vi: "Lợi nhuận kỳ vọng", en: "Expected Return", def: "Lợi nhuận bình quân xác suất của một khoản đầu tư; tính bằng tổng (xác suất x kết quả) của mọi kịch bản" },
  { vi: "Phân phối lợi nhuận", en: "Return Distribution", def: "Tập hợp các kết quả có thể xảy ra và xác suất tương ứng; mô tả toàn bộ hồ sơ rủi ro-lợi nhuận" },
  { vi: "Hệ số Sharpe", en: "Sharpe Ratio", def: "Lợi nhuận vượt trội trên mỗi đơn vị rủi ro; công cụ so sánh hiệu quả đầu tư điều chỉnh theo rủi ro" },
  { vi: "Đa dạng hóa", en: "Diversification", def: "Phân bổ đầu tư vào nhiều tài sản khác nhau để giảm rủi ro phi hệ thống mà không giảm kỳ vọng lợi nhuận" },
];

const TAKEAWAYS = [
  "Lợi nhuận kỳ vọng = tổng (xác suất x kết quả); là trung bình qua nhiều lần, không phải dự đoán cho lần cụ thể.",
  "So sánh đầu tư phải tính cả rủi ro, không chỉ lợi nhuận: 15% với biến động lớn có thể tệ hơn 10% ổn định.",
  "Sharpe Ratio là thước đo hiệu quả điều chỉnh rủi ro: lợi nhuận vượt trội chia cho mức biến động.",
  "Đa dạng hóa có thể giảm rủi ro phi hệ thống mà không giảm kỳ vọng lợi nhuận, đây là bữa trưa miễn phí duy nhất trong đầu tư.",
];

export default function LoiNhuanKyVongPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Trong tài chính, không thể biết chắc kết quả của một khoản đầu tư cụ thể. Nhưng có thể tính toán hợp lý về kết quả <em>kỳ vọng</em> dựa trên xác suất của các kịch bản. Đây là nền tảng của mọi quyết định đầu tư có cơ sở.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Lợi nhuận kỳ vọng: định nghĩa và cách tính</h3>
          <p>
            Lợi nhuận kỳ vọng là giá trị bình quân xác suất của tất cả các kết quả có thể xảy ra. Công thức cơ bản:
          </p>
          <p className="font-mono text-stone-900 bg-stone-100 px-4 py-3 rounded-xl text-base">
            Kỳ vọng = (P1 x R1) + (P2 x R2) + ... + (Pn x Rn)
          </p>
          <p>
            Trong đó P là xác suất và R là lợi nhuận của mỗi kịch bản.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Ví dụ cụ thể</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Khoản đầu tư A: 30% khả năng lãi 30%, 50% khả năng lãi 10%, 20% khả năng lỗ 15%.
              <br /><br />
              Kỳ vọng = (0.3 x 30%) + (0.5 x 10%) + (0.2 x -15%) = 9% + 5% - 3% = 11%/năm
              <br /><br />
              Đây không có nghĩa là khoản đầu tư này sẽ cho 11% năm tới. Có 20% xác suất bạn lỗ 15%. Nhưng nếu thực hiện kịch bản này 100 lần, trung bình bạn nhận được khoảng 11%/năm.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">So sánh đầu tư: phải tính cả rủi ro</h3>
          <p>
            Sai lầm phổ biến nhất khi so sánh đầu tư là chỉ nhìn vào lợi nhuận mà bỏ qua rủi ro. Đây là lý do tại sao cần công cụ so sánh điều chỉnh theo rủi ro.
          </p>
          <p>
            Giả sử có hai danh mục: Danh mục A lãi 15%/năm nhưng biến động rất mạnh, có thể giảm 40% trong năm xấu. Danh mục B lãi 11%/năm và biến động ít hơn nhiều. Danh mục nào tốt hơn?
          </p>
          <p>
            Câu trả lời phụ thuộc vào khả năng chịu rủi ro và thời gian đầu tư. Nhưng công cụ đo lường khách quan là <strong className="text-stone-900">Sharpe Ratio</strong>: lợi nhuận vượt trội chia cho mức biến động. Danh mục có Sharpe Ratio cao hơn là hiệu quả hơn theo từng đơn vị rủi ro chấp nhận.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Đa dạng hóa: bữa trưa miễn phí duy nhất trong đầu tư</h3>
          <p>
            Harry Markowitz, người đặt nền móng lý thuyết danh mục đầu tư hiện đại, từng nói rằng đa dạng hóa là "bữa trưa miễn phí duy nhất" trong tài chính. Ý ông là: đây là cách duy nhất để giảm rủi ro mà không phải trả giá bằng lợi nhuận kỳ vọng.
          </p>
          <p>
            Khi bạn giữ nhiều loại cổ phiếu không tương quan chặt với nhau, rủi ro phi hệ thống của từng cổ phiếu triệt tiêu lẫn nhau theo thống kê. Biến động tổng danh mục thấp hơn biến động bình quân của từng cổ phiếu riêng lẻ, trong khi lợi nhuận kỳ vọng vẫn giữ nguyên là bình quân gia quyền.
          </p>
          <p>
            Giới hạn của đa dạng hóa là rủi ro hệ thống: dù bạn giữ 500 cổ phiếu khác nhau, khi thị trường toàn cầu sụp đổ, tất cả đều giảm cùng nhau.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Kỳ vọng trong thực tế: không phải mọi năm đều như nhau</h3>
          <p>
            Một điều quan trọng khi áp dụng lợi nhuận kỳ vọng là hiểu rằng đây là con số dài hạn. Trong ngắn hạn, kết quả thực tế có thể rất khác.
          </p>
          <p>
            Cổ phiếu Mỹ có lợi nhuận trung bình khoảng 10%/năm trong 100 năm qua. Nhưng trong năm 2008, thị trường giảm 37%. Trong năm 2013, tăng 32%. Kỳ vọng 10% không có nghĩa là mỗi năm đều được 10%. Nó có nghĩa là qua đủ nhiều năm, trung bình về gần 10%.
          </p>
          <p>
            Hiểu điều này giúp nhà đầu tư dài hạn không hoảng loạn trong những năm thị trường giảm mạnh, vì họ biết đó là biến động ngắn hạn trong phân phối lợi nhuận dài hạn.
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
          <p className="text-stone-400 text-base">Không thể biết trước kết quả của một lần đầu tư cụ thể.</p>
          <p className="text-stone-900 font-bold text-xl">Nhưng có thể hiểu phân phối xác suất của nó và quyết định xem đó có phải đánh đổi hợp lý không.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
