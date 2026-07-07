"use client";

import Image from "next/image";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 14, day: 14, accent: "stone",
  title: "Nợ tốt và nợ xấu.",
  subtitle: "Không phải mọi khoản nợ đều xấu. Nợ được dùng đúng cách có thể tăng tốc xây dựng tài sản. Nợ dùng sai cách là con đường ngắn nhất đến khủng hoảng tài chính cá nhân.",
  duration: "7 phút", difficulty: "Dễ", emoji: "·",
  nextSlug: "don-bay-tai-chinh", nextTitle: "Day 15: Đòn bẩy tài chính",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Bạn vay 500 triệu lãi suất 8%/năm để mua căn hộ cho thuê với thu nhập 5 triệu/tháng (60 triệu/năm). Đây là nợ tốt hay nợ xấu?",
    options: [
      "Nợ xấu vì đang mang nợ",
      "Nợ tốt vì thu nhập từ tài sản (60 triệu/năm) vượt chi phí lãi vay (40 triệu/năm), tạo ra dòng tiền dương",
      "Không thể kết luận mà không biết giá trị bất động sản",
      "Nợ tốt vì bất động sản luôn tăng giá",
    ],
    correct: 1,
    explanation: "Lãi vay: 500 triệu x 8% = 40 triệu/năm. Thu nhập thuê: 60 triệu/năm. Dư 20 triệu/năm. Khoản vay này tạo ra dòng tiền dương, giúp bạn sở hữu tài sản nhanh hơn: đây là nợ tốt điển hình.",
  },
  {
    question: "Tại sao nợ thẻ tín dụng thường được xem là nợ xấu nhất?",
    options: [
      "Vì ngân hàng không đáng tin",
      "Vì lãi suất 2.5-3.5%/tháng (30-42%/năm) dùng để mua hàng tiêu dùng mất giá ngay; không có tài sản tương ứng",
      "Vì thẻ tín dụng dễ bị lừa đảo",
      "Vì hạn mức thẻ thường quá thấp",
    ],
    correct: 1,
    explanation: "Lãi thẻ tín dụng cực cao và dùng để mua hàng tiêu dùng không tạo ra giá trị. Đây là hai yếu tố kết hợp tệ nhất: lãi kép cao áp dụng lên tài sản mất giá.",
  },
  {
    question: "Nguyên tắc nào giúp phân biệt nợ tốt và nợ xấu?",
    options: [
      "Nợ dưới 100 triệu là tốt, trên 100 triệu là xấu",
      "Nợ có thế chấp là tốt, không thế chấp là xấu",
      "Nếu tài sản hoặc thu nhập từ khoản vay tạo ra nhiều hơn chi phí lãi, có thể là nợ tốt; ngược lại là nợ xấu",
      "Nợ ngân hàng nhà nước là tốt, ngân hàng thương mại là xấu",
    ],
    correct: 2,
    explanation: "Câu hỏi cốt lõi: khoản vay này có giúp tạo ra thu nhập hoặc tài sản lớn hơn chi phí vay không? Nếu có, đó là đòn bẩy hợp lý. Nếu không, bạn đang trả lãi cho thứ không sinh lợi.",
  },
];

const CONCEPTS = [
  { vi: "Nợ tốt", en: "Good Debt", def: "Khoản vay được dùng để đầu tư vào tài sản tạo ra thu nhập hoặc tăng giá trị vượt chi phí lãi vay" },
  { vi: "Nợ xấu", en: "Bad Debt", def: "Khoản vay dùng để mua tài sản tiêu dùng mất giá hoặc có lãi suất cao vượt quá lợi nhuận kỳ vọng" },
  { vi: "Chi phí nợ", en: "Cost of Debt", def: "Lãi suất thực tế phải trả cho khoản vay; nên so sánh với lợi nhuận kỳ vọng từ việc dùng tiền vay" },
  { vi: "Tỷ lệ nợ trên thu nhập", en: "Debt-to-Income Ratio", def: "Tổng thanh toán nợ hàng tháng chia cho thu nhập; ngưỡng an toàn thường dưới 36%" },
];

const TAKEAWAYS = [
  "Nợ tốt: chi phí vay thấp hơn lợi nhuận kỳ vọng từ tài sản hoặc thu nhập do khoản vay tạo ra.",
  "Nợ xấu: chi phí vay cao hơn lợi nhuận, hoặc dùng để mua tài sản tiêu dùng mất giá.",
  "Thẻ tín dụng chưa trả hết tháng là nợ xấu nhất: lãi 30-42%/năm trên hàng hóa tiêu dùng.",
  "Không phải mọi nợ đều cần trả nhanh nhất; nợ lãi suất thấp dùng đúng mục đích có thể nên giữ.",
];

export default function NoTotNoXauPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Ở Việt Nam, nhiều người lớn lên với quan niệm rằng mọi khoản nợ đều xấu và cần tránh bằng mọi giá. Quan niệm đó không sai hoàn toàn, nhưng nếu áp dụng tuyệt đối thì có thể bỏ lỡ cơ hội xây dựng tài sản hợp pháp và hiệu quả.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Nợ tốt: đòn bẩy cho tài sản</h3>
          <p>
            Nợ tốt là khoản vay mà chi phí vay (lãi suất) thấp hơn lợi nhuận hoặc giá trị mà khoản vay đó tạo ra.
          </p>
          <p>
            Ví dụ điển hình nhất là vay mua bất động sản cho thuê. Nếu bạn vay 700 triệu lãi suất 9%/năm (63 triệu/năm) để mua căn hộ cho thuê thu 7 triệu/tháng (84 triệu/năm), dư 21 triệu/năm sau lãi vay. Khoản vay này đang tự trả lãi và còn sinh lời thêm. Đó là nợ tốt.
          </p>
          <p>
            Vay để học đại học hoặc nâng cao kỹ năng cũng có thể là nợ tốt nếu dẫn đến thu nhập tăng đủ để bù đắp chi phí vay. Vay để khởi nghiệp một mô hình kinh doanh có cơ sở cũng vậy.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Nợ xấu: trả lãi cho thứ mất giá</h3>
          <p>
            Nợ xấu là khoản vay có chi phí cao hơn lợi ích tạo ra, hoặc dùng để mua hàng hóa tiêu dùng mất giá ngay khi mua.
          </p>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Nợ thẻ tín dụng", rest: ": lãi 2.5-3.5%/tháng (30-42%/năm), dùng cho mua sắm tiêu dùng, nhà hàng, du lịch" },
              { bold: "Vay mua xe cá nhân", rest: ": xe giảm giá 15-20%/năm, lãi vay 8-12%, tổng chi phí sở hữu cực cao" },
              { bold: "Vay tiêu dùng lãi cao", rest: ": các gói vay cấp tốc từ fintech với lãi suất 20-36%/năm" },
              { bold: "Vay để đầu tư chứng khoán ngắn hạn", rest: ": kết hợp rủi ro thị trường với áp lực trả lãi, công thức dẫn đến thua lỗ" },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Nợ thẻ tín dụng: tốc độ nhân</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Mua điện thoại 20 triệu bằng thẻ, trả tối thiểu mỗi tháng 500 nghìn với lãi 2.5%/tháng: sau 5 năm, bạn có thể trả tổng cộng 30-35 triệu cho chiếc điện thoại đó, trong khi giá trị thực của nó đã về gần 0.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Nguyên tắc quản lý nợ</h3>
          <p>
            Không phải mọi nợ lãi suất thấp đều nên trả nhanh. Nếu bạn vay mua nhà lãi suất 7%/năm nhưng có khả năng đầu tư khoản tiền thừa vào quỹ chỉ số với kỳ vọng 12%/năm, về mặt toán học bạn nên đầu tư thay vì trả nợ nhanh.
          </p>
          <p>
            Ngược lại, nợ thẻ tín dụng và nợ tiêu dùng lãi cao nên được ưu tiên trả trước mọi khoản đầu tư, vì không khoản đầu tư nào có thể đảm bảo lãi suất 30-40%/năm để bù đắp chi phí lãi vay.
          </p>
          <p>
            Tỷ lệ nợ trên thu nhập là thước đo sức khỏe tài chính quan trọng: <strong className="text-stone-900">tổng thanh toán nợ hàng tháng không nên vượt quá 36% thu nhập</strong>. Vượt ngưỡng này, rủi ro khủng hoảng thanh khoản khi thu nhập giảm trở nên đáng kể.
          </p>
        </section>

        <div className="rounded-2xl overflow-hidden border-2 border-stone-900 shadow-lg">
          <div className="bg-stone-900 px-6 py-4">
            <p className="text-white font-extrabold text-lg tracking-wide">Khái niệm cần nhớ</p>
            <p className="text-stone-500 text-sm mt-0.5">Chạm hoặc di chuột vào từng dòng</p>
          </div>
          <div className="divide-y divide-stone-100 bg-white">
            {CONCEPTS.map(({ vi, en, def }) => (
              <div key={en} className="group px-6 py-4 flex items-start gap-4 cursor-default transition-all duration-200 hover:bg-stone-50 hover:pl-8">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-bold text-stone-900 text-base group-hover:text-stone-700 transition-colors">{vi}</span>
                    <span className="text-sm text-stone-500 font-mono bg-stone-100 px-2 py-0.5 rounded group-hover:bg-stone-200 transition-colors">{en}</span>
                  </div>
                  <p className="text-stone-500 text-base mt-1 leading-relaxed group-hover:text-stone-700 transition-colors">{def}</p>
                </div>
                <span className="text-stone-200 group-hover:text-stone-500 transition-colors text-lg mt-0.5 flex-shrink-0">→</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-stone-900 px-6 py-5">
            <p className="text-white font-extrabold text-xl tracking-wide">Ghi nhớ nhanh</p>
            <p className="text-stone-500 text-sm mt-0.5">4 điều cốt lõi từ bài này</p>
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
        {/* Tóm tắt trực quan */}
        <div className="space-y-3">
          <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
            Tóm tắt trực quan
          </div>
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-lg">
            <Image
              src="/lessons/day14-no-tot-no-xau.png"
              alt="Tóm tắt trực quan Day 14"
              width={1024}
              height={1536}
              className="w-full h-auto"
            />
          </div>
        </div>


        <div className="text-center space-y-2 py-4">
          <p className="text-stone-500 text-base">Câu hỏi không phải là có nên vay không.</p>
          <p className="text-stone-900 font-bold text-xl">Câu hỏi là khoản vay này tạo ra giá trị gì, với chi phí bao nhiêu, và có xứng đáng không.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
