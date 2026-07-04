"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 16, day: 16, accent: "stone",
  title: "Vay tiền: giàu hay phá sản?",
  subtitle: "Vay tiền là một quyết định hai chiều. Người hiểu tài chính dùng vay để xây tài sản. Người không hiểu dùng vay để thỏa mãn tiêu dùng và rơi vào bẫy nợ.",
  duration: "7 phút", difficulty: "Trung bình", emoji: "·",
  nextSlug: "ca-nhan-doanh-nghiep-chinh-phu", nextTitle: "Day 17: Cá nhân, doanh nghiệp, chính phủ",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Bẫy nợ (debt trap) là gì?",
    options: [
      "Vay quá nhiều tiền từ ngân hàng",
      "Tình trạng phải vay mới để trả nợ cũ; lãi tích lũy nhanh hơn khả năng trả, nợ tăng dần không kiểm soát",
      "Bị ngân hàng tịch thu tài sản",
      "Vay tiền với lãi suất biến đổi",
    ],
    correct: 1,
    explanation: "Bẫy nợ bắt đầu khi không đủ khả năng trả cả gốc lẫn lãi, phải vay thêm để trả lãi cũ. Số nợ tăng, lãi tăng, và cuối cùng tổng nợ vượt khả năng trả vĩnh viễn.",
  },
  {
    question: "Quy tắc nào giúp đánh giá khả năng trả nợ an toàn?",
    options: [
      "Không vay quá 10 lần thu nhập tháng",
      "Tổng thanh toán nợ hàng tháng không quá 28-36% thu nhập gộp",
      "Chỉ vay có thế chấp bất động sản",
      "Không vay tiêu dùng, chỉ vay kinh doanh",
    ],
    correct: 1,
    explanation: "Quy tắc 28/36: không quá 28% thu nhập cho nhà ở, không quá 36% cho tổng nợ. Quá ngưỡng này, một cú sốc thu nhập nhỏ có thể dẫn đến không thể trả nợ.",
  },
  {
    question: "Tại sao người giàu thường có nhiều nợ hơn người bình thường?",
    options: [
      "Vì ngân hàng tin tưởng cho người giàu vay nhiều hơn",
      "Vì họ dùng nợ như công cụ: vay lãi suất thấp, đầu tư vào tài sản lợi nhuận cao hơn, tạo ra chênh lệch lãi suất",
      "Vì người giàu tiêu xài nhiều hơn",
      "Vì nợ giúp giảm thuế",
    ],
    correct: 1,
    explanation: "Chiến lược của nhiều người giàu: vay lãi suất 5-7% (thế chấp bất động sản), đầu tư vào tài sản sinh lợi 12-15%/năm. Chênh lệch đó là lợi nhuận thuần từ đòn bẩy. Họ không sợ nợ, họ quản lý nợ.",
  },
];

const CONCEPTS = [
  { vi: "Bẫy nợ", en: "Debt Trap", def: "Vòng xoáy phải vay mới để trả nợ cũ; nợ tăng nhanh hơn khả năng tạo ra thu nhập để trả" },
  { vi: "Quy tắc 28/36", en: "28/36 Rule", def: "Ngưỡng an toàn: không quá 28% thu nhập cho nhà ở, không quá 36% cho tổng nghĩa vụ nợ" },
  { vi: "Chênh lệch lãi suất", en: "Interest Rate Arbitrage", def: "Vay tiền với lãi suất thấp và đầu tư vào tài sản sinh lợi cao hơn, kiếm lợi nhuận từ chênh lệch" },
  { vi: "Điểm tín dụng", en: "Credit Score", def: "Chỉ số đánh giá khả năng trả nợ dựa trên lịch sử tín dụng; ảnh hưởng đến lãi suất và hạn mức vay" },
];

const TAKEAWAYS = [
  "Vay tiền không xấu; dùng tiền vay để mua gì và tạo ra gì mới quyết định kết quả.",
  "Bẫy nợ: khi phải vay mới để trả nợ cũ, tổng nợ tăng và không bao giờ trả hết được.",
  "Quy tắc 28/36: tổng nợ không quá 36% thu nhập; vượt ngưỡng này, bất kỳ cú sốc nào cũng nguy hiểm.",
  "Người dùng nợ hiệu quả: vay lãi thấp, đầu tư lợi nhuận cao hơn, sống từ chênh lệch lãi suất.",
];

export default function VayTienGiauHayPhasanPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Cùng một hành động vay tiền có thể dẫn đến hai kết quả hoàn toàn trái ngược tùy vào cách sử dụng. Người giàu thường có nhiều nợ hơn người bình thường, nhưng họ quản lý nợ theo cách hoàn toàn khác.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Hai cách dùng nợ</h3>
          <p>
            Cách thứ nhất: vay để mua điện thoại mới, đi du lịch, mua quần áo, hoặc lấp đầy khoảng trống giữa thu nhập và mong muốn tiêu dùng. Tài sản mua về mất giá nhanh, trong khi khoản nợ và lãi tích lũy theo hướng ngược lại. Đây là con đường dẫn đến bẫy nợ.
          </p>
          <p>
            Cách thứ hai: vay để mua tài sản tạo ra dòng tiền, tức là thu nhập từ tài sản đó đủ để trả lãi và còn dư. Ngôi nhà cho thuê, thiết bị sản xuất, vốn kinh doanh có doanh thu rõ ràng. Đây là cách người giàu dùng nợ như đòn bẩy.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Cùng số nợ, khác hoàn toàn</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Người A: vay 500 triệu mua xe BMW để đi làm. Xe mất giá 15%/năm, lãi vay 9%/năm. Tổng chi phí sở hữu năm đầu: 75 triệu khấu hao + 45 triệu lãi = 120 triệu.
              <br /><br />
              Người B: vay 500 triệu mua xe tải nhỏ để chạy hàng. Thu nhập: 15 triệu/tháng = 180 triệu/năm. Sau lãi vay và khấu hao: dương 15 triệu/năm.
              <br /><br />
              Cùng 500 triệu nợ, nhưng một người trả tiền cho sự thoải mái và một người xây dựng tài sản.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Bẫy nợ: khi nợ tự nhân</h3>
          <p>
            Bẫy nợ bắt đầu từ một điểm đơn giản: thu nhập không đủ để trả cả gốc lẫn lãi. Lúc đó, người ta phải vay mới để trả lãi cũ.
          </p>
          <p>
            Chu kỳ đó tự nhân nhanh. Mỗi tháng số nợ lớn hơn. Mỗi tháng lãi cao hơn. Cuối cùng, dù làm bao nhiêu cũng không đủ trả. Đây là tình trạng thường thấy ở những người dùng thẻ tín dụng trả tối thiểu nhiều năm, hoặc vay tín chấp lãi cao để trả nợ tín chấp lãi thấp hơn.
          </p>
          <p>
            Thoát khỏi bẫy nợ cần hy sinh ngắn hạn đáng kể: cắt mọi chi tiêu không thiết yếu, dùng toàn bộ thu nhập dư để trả nợ lãi cao nhất trước (phương pháp avalanche), hoặc bán tài sản để trả nợ.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Ngưỡng an toàn và cách đánh giá bản thân</h3>
          <p>
            Trước khi vay bất kỳ khoản nào, hãy tính tỷ lệ nợ trên thu nhập:
          </p>
          <p className="font-mono text-stone-900 bg-stone-100 px-4 py-3 rounded-xl text-base">
            Tỷ lệ nợ = (Tổng thanh toán nợ tháng / Thu nhập tháng) x 100%
          </p>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Dưới 28%", rest: ": vùng an toàn; còn nhiều dư địa" },
              { bold: "28-36%", rest: ": vùng thận trọng; cần quản lý chặt chi tiêu" },
              { bold: "Trên 36%", rest: ": vùng rủi ro cao; một biến cố nhỏ (giảm thu nhập, chi phí y tế) có thể kích hoạt khủng hoảng" },
              { bold: "Trên 50%", rest: ": vùng khủng hoảng; cần tái cơ cấu nợ ngay lập tức" },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Chiến lược của người dùng nợ hiệu quả</h3>
          <p>
            Nhiều người thành công về tài chính dùng chiến lược đơn giản: vay với lãi suất thấp nhất có thể (thường bằng thế chấp bất động sản hoặc dựa trên điểm tín dụng tốt), và đầu tư khoản tiền đó vào tài sản có lợi nhuận kỳ vọng cao hơn lãi vay.
          </p>
          <p>
            Chênh lệch lãi suất đó là lợi nhuận thuần từ đòn bẩy. Chiến lược này hoạt động tốt khi thị trường ổn định, và trở nên rủi ro khi thị trường giảm mạnh. Đây là lý do quan trọng để duy trì quỹ khẩn cấp và không vay quá mức dù tính toán lý thuyết cho thấy có lợi.
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
          <p className="text-stone-400 text-base">Tiền vay không có màu sắc đạo đức.</p>
          <p className="text-stone-900 font-bold text-xl">Chỉ có cách sử dụng nó là đúng hay sai với mục tiêu tài chính của bạn.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
