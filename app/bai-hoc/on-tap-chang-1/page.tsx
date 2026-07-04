"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 20, day: 20, accent: "stone",
  title: "Ôn tập Chặng 1: nền tảng tài chính cá nhân.",
  subtitle: "Bạn đã đi qua 19 ngày đầu tiên của hành trình hiểu tài chính. Bài này tổng kết các nguyên lý cốt lõi và cách chúng kết nối với nhau thành một bức tranh hoàn chỉnh.",
  duration: "8 phút", difficulty: "Dễ", emoji: "·",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Sắp xếp thứ tự ưu tiên tài chính cá nhân từ cơ bản nhất đến nâng cao nhất:",
    options: [
      "Đầu tư cổ phiếu, trả nợ, tiết kiệm, làm thêm thu nhập",
      "Xây quỹ khẩn cấp, trả nợ lãi cao, tiết kiệm định kỳ, đầu tư dài hạn",
      "Mua bảo hiểm, đầu tư bất động sản, tiết kiệm, trả nợ",
      "Thu nhập thụ động trước, sau đó tiết kiệm, cuối cùng trả nợ",
    ],
    correct: 1,
    explanation: "Nền tảng: quỹ khẩn cấp (3-6 tháng chi tiêu) cho thanh khoản. Tiếp theo: trả hết nợ lãi cao (thẻ tín dụng). Sau đó: tiết kiệm định kỳ (10-20% thu nhập). Cuối cùng: đầu tư dài hạn vào tài sản. Bỏ qua bước trước thì bước sau không vững.",
  },
  {
    question: "Kết hợp những nguyên lý nào để giải thích tại sao bắt đầu đầu tư sớm với số tiền nhỏ tốt hơn bắt đầu muộn với số tiền lớn?",
    options: [
      "Lãi suất và lạm phát",
      "Lãi kép, giá trị thời gian của tiền, và sức mạnh của thời gian: tiền tăng trưởng hàm mũ theo thời gian",
      "Rủi ro thị trường và đa dạng hóa",
      "Nợ tốt và đòn bẩy tài chính",
    ],
    correct: 1,
    explanation: "Ba nguyên lý kết hợp: (1) Lãi kép tạo tăng trưởng hàm mũ; (2) Giá trị thời gian: tiền sớm có giá trị hơn tiền muộn vì có nhiều thời gian tăng trưởng hơn; (3) Sức mạnh thời gian: 10 năm bắt đầu sớm hơn có thể tạo ra kết quả lớn hơn 20 năm đầu tư thêm về sau.",
  },
  {
    question: "Nếu lạm phát 6%/năm và bạn gửi tiết kiệm với lãi 4%/năm, điều gì thực sự đang xảy ra?",
    options: [
      "Bạn đang kiếm được 4% mỗi năm",
      "Bạn đang mất sức mua 2% mỗi năm (lãi suất thực = 4% - 6% = -2%)",
      "Không ảnh hưởng vì số tiền trong tài khoản tăng",
      "Bạn đang hòa vốn",
    ],
    correct: 1,
    explanation: "Lãi suất thực = 4% - 6% = -2%. Số tiền tăng về số nhưng sức mua giảm 2% mỗi năm. Sau 10 năm, 100 triệu trong tài khoản chỉ mua được khoảng 82 triệu hàng hóa theo giá hôm nay. Đây là lý do đầu tư vào tài sản thực quan trọng trong môi trường lạm phát.",
  },
  {
    question: "Một người có tài sản 5 tỷ nhưng không có tiền mặt và không thể vay, và cần trả 200 triệu trong 3 ngày. Đây là vấn đề gì?",
    options: [
      "Vấn đề tài sản quá ít",
      "Vấn đề thanh khoản: giàu về tài sản nhưng thiếu thanh khoản ngắn hạn",
      "Vấn đề tín dụng",
      "Vấn đề quản lý chi tiêu",
    ],
    correct: 1,
    explanation: "Đây là khủng hoảng thanh khoản điển hình: tài sản ròng dương lớn nhưng không có tiền mặt sẵn có. Tài sản và thanh khoản là hai khái niệm khác nhau. Duy trì quỹ khẩn cấp bằng tài sản có tính thanh khoản cao là bảo vệ chống lại tình huống này.",
  },
  {
    question: "Đâu là ví dụ về rủi ro hệ thống mà đa dạng hóa không giúp được?",
    options: [
      "Một công ty trong danh mục của bạn bị kiện",
      "CEO của một công ty từ chức",
      "Lãi suất toàn cầu tăng mạnh, ảnh hưởng toàn bộ thị trường cổ phiếu và trái phiếu",
      "Sản phẩm của một công ty bị thu hồi",
    ],
    correct: 2,
    explanation: "Rủi ro hệ thống: ảnh hưởng toàn bộ thị trường, không phân biệt cổ phiếu nào. Lãi suất tăng mạnh là ví dụ điển hình: cổ phiếu giảm, trái phiếu giảm, bất động sản chịu áp lực. Đa dạng hóa giảm được rủi ro phi hệ thống (rủi ro từng công ty), không giảm được rủi ro hệ thống.",
  },
];

const CONCEPTS = [
  { vi: "Nền tảng tài chính", en: "Financial Foundation", def: "Bộ nguyên lý cơ bản: kiểm soát dòng tiền, quỹ khẩn cấp, trả nợ xấu, tiết kiệm định kỳ, đầu tư dài hạn" },
  { vi: "Tự do tài chính", en: "Financial Freedom", def: "Trạng thái thu nhập thụ động đủ để trang trải chi tiêu; không còn phụ thuộc hoàn toàn vào thu nhập lao động" },
  { vi: "Vòng lặp tích lũy", en: "Wealth Accumulation Cycle", def: "Thu nhập tạo ra tiết kiệm, tiết kiệm đầu tư vào tài sản, tài sản tạo thu nhập thụ động, thu nhập thụ động mua thêm tài sản" },
  { vi: "Chi phí cơ hội cuộc sống", en: "Life Opportunity Cost", def: "Mọi quyết định tài chính đều có chi phí cơ hội; nhận thức được nó giúp đưa ra lựa chọn có ý thức hơn" },
];

const TAKEAWAYS = [
  "20 nguyên lý Chặng 1 kết nối với nhau: dòng tiền, thời gian, lãi kép, rủi ro, và thị trường đều là một hệ thống.",
  "Trình tự ưu tiên không thể bỏ qua: quỹ khẩn cấp, trả nợ xấu, tiết kiệm định kỳ, rồi mới đầu tư dài hạn.",
  "Thời gian là tài nguyên quan trọng nhất trong tài chính; bắt đầu sớm và kiên nhẫn là hai kỹ năng then chốt.",
  "Hiểu nguyên lý quan trọng hơn biết kỹ thuật; nguyên lý đúng sẽ dẫn đến kỹ thuật đúng theo bối cảnh.",
];

export default function OnTapChang1Page() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Bạn vừa hoàn thành 19 ngày đầu tiên của hành trình học tài chính. Không phải ngẫu nhiên mà Chặng 1 bao gồm những khái niệm này, chúng tạo thành nền tảng mà mọi quyết định tài chính đều dựa vào.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Bức tranh toàn cảnh: mọi thứ kết nối như thế nào</h3>
          <p>
            Hãy nhìn lại 19 ngày vừa qua và thấy các mảnh ghép kết nối với nhau.
          </p>
          <p>
            Tài chính cá nhân bắt đầu từ <strong className="text-stone-900">dòng tiền</strong> (Day 4): thu nhập vào nhiều hơn chi tiêu ra. Phần dư đó là <strong className="text-stone-900">tiết kiệm</strong> (Day 3). Tiết kiệm không đơn giản là giữ tiền mặt, vì <strong className="text-stone-900">lạm phát</strong> (Day 9) làm tiền mất sức mua mỗi năm.
          </p>
          <p>
            Để bảo vệ và gia tăng tài sản, cần đầu tư. Đầu tư đòi hỏi hiểu <strong className="text-stone-900">lãi suất</strong> (Day 6), sự khác biệt giữa <strong className="text-stone-900">lãi đơn và lãi kép</strong> (Day 7), và <strong className="text-stone-900">giá trị thời gian của tiền</strong> (Day 10). Ba khái niệm này cùng giải thích tại sao <strong className="text-stone-900">thời gian</strong> (Day 8) là tài nguyên quan trọng nhất trong tài chính.
          </p>
          <p>
            Đầu tư luôn đi kèm <strong className="text-stone-900">rủi ro</strong> (Day 11). Rủi ro không phải điều tránh được, mà là điều cần quản lý thông qua <strong className="text-stone-900">lợi nhuận kỳ vọng</strong> (Day 12) và đa dạng hóa. Bên cạnh đó, <strong className="text-stone-900">thanh khoản</strong> (Day 13) đảm bảo bạn không bị ép bán tài sản sai thời điểm.
          </p>
          <p>
            Nợ là một phần của thực tế tài chính. Hiểu <strong className="text-stone-900">nợ tốt và nợ xấu</strong> (Day 14), cách <strong className="text-stone-900">đòn bẩy</strong> (Day 15) khuếch đại cả hai chiều, và cách sử dụng nợ có chủ ý (Day 16) là kỹ năng phân biệt người quản lý tài chính tốt và người rơi vào bẫy nợ.
          </p>
          <p>
            Cuối cùng, tất cả xảy ra trong bối cảnh <strong className="text-stone-900">hệ thống tài chính</strong> (Day 18) và <strong className="text-stone-900">thị trường tài chính</strong> (Day 19), nơi vốn được phân bổ và giá được khám phá.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Trình tự ưu tiên không thể bỏ qua</h3>
          <p>
            Một trong những hiểu lầm phổ biến nhất về tài chính cá nhân là bỏ qua các bước nền tảng và nhảy thẳng vào đầu tư. Nhưng không có nền tảng vững, đầu tư trở thành cờ bạc.
          </p>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Bước 1", rest: ": kiểm soát dòng tiền, biết tiền đến từ đâu và đi đâu. Không có bức tranh này, không thể làm gì tiếp theo" },
              { bold: "Bước 2", rest: ": xây quỹ khẩn cấp 3-6 tháng chi tiêu bằng tài sản có tính thanh khoản cao. Đây là đệm an toàn cho mọi thứ tiếp theo" },
              { bold: "Bước 3", rest: ": trả hết nợ lãi cao (thẻ tín dụng, vay tiêu dùng lãi suất trên 15%). Không khoản đầu tư nào đảm bảo lãi suất cao hơn để bù" },
              { bold: "Bước 4", rest: ": tiết kiệm định kỳ, ít nhất 10-20% thu nhập, tự động mỗi tháng trước khi tiêu bất cứ thứ gì" },
              { bold: "Bước 5", rest: ": đầu tư dài hạn vào tài sản phù hợp với thời gian đầu tư và khả năng chịu rủi ro của bạn" },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Ba sai lầm phổ biến nhất cần tránh</h3>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Tiêu trước, tiết kiệm sau", rest: ": hầu như không bao giờ còn gì để tiết kiệm. Tiết kiệm tự động ngay khi nhận lương là cách duy nhất hiệu quả cho đa số người" },
              { bold: "Giữ tiền mặt là an toàn", rest: ": lạm phát làm tiền mất giá mỗi năm. Không đầu tư là một hình thức thua lỗ từ từ" },
              { bold: "Chờ thời điểm tốt để bắt đầu đầu tư", rest: ": thời điểm tốt nhất là hôm nay, thời điểm tốt nhì là ngày mai. Chi phí của sự trì hoãn lớn hơn hầu hết người nghĩ" },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Điều quan trọng hơn kiến thức: hành động</h3>
          <p>
            Tài chính cá nhân không phức tạp về mặt trí tuệ, nhưng rất khó về mặt hành vi. Biết rằng tiết kiệm 15% thu nhập mỗi tháng là tốt, và thực sự làm điều đó mỗi tháng trong 20 năm, là hai điều khác nhau hoàn toàn.
          </p>
          <p>
            Chặng 1 đã cho bạn ngôn ngữ và khung tư duy để hiểu mọi quyết định tài chính. Chặng 2 và tiếp theo sẽ đi sâu hơn vào các công cụ cụ thể: cổ phiếu, trái phiếu, quỹ đầu tư, bất động sản, bảo hiểm và kế hoạch hưu trí.
          </p>
          <p>
            Nhưng công cụ chỉ hiệu quả khi nền tảng vững. Nếu bạn chưa có quỹ khẩn cấp, chưa kiểm soát dòng tiền, và chưa trả hết nợ lãi cao: đó là những điều cần làm trước. Không có shortcut nào cho bước này.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Một bài kiểm tra đơn giản cho bản thân</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Sau Chặng 1 này, hãy trả lời ba câu hỏi thật sự: (1) Tôi biết chính xác thu nhập và chi tiêu tháng trước không? (2) Tôi có quỹ khẩn cấp tương đương ít nhất 3 tháng chi tiêu không? (3) Tôi có đang trả tối thiểu cho khoản nợ nào lãi suất cao hơn 15%/năm không?
              <br /><br />
              Nếu câu trả lời cho câu 1 và 2 là không, và câu 3 là có: đây là những việc cần làm ngay, trước khi đọc bất kỳ bài nào khác.
            </p>
          </div>
        </section>

        <div className="rounded-2xl overflow-hidden border-2 border-stone-900 shadow-lg">
          <div className="bg-stone-900 px-6 py-4">
            <p className="text-white font-extrabold text-lg tracking-wide">Khái niệm cần nhớ</p>
            <p className="text-stone-400 text-sm mt-0.5">Hover vào từng dòng để xem chi tiết</p>
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
          <p className="text-stone-400 text-base">Chặng 1 không phải đích đến, đó là điểm xuất phát.</p>
          <p className="text-stone-900 font-bold text-xl">Người hiểu 20 nguyên lý này và ứng dụng chúng nhất quán sẽ có nền tài chính vững hơn 90% người xung quanh, dù thu nhập không cao hơn.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
