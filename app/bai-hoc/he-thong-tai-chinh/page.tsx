"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 18, day: 18, accent: "stone",
  title: "Hệ thống tài chính hoạt động như thế nào.",
  subtitle: "Hệ thống tài chính là mạng lưới kết nối người có tiền thừa với người cần tiền. Hiểu nó giúp bạn biết tiền của mình đang đi đâu và ai đang kiếm tiền từ nó.",
  duration: "7 phút", difficulty: "Trung bình", emoji: "·",
  nextSlug: "thi-truong-tai-chinh", nextTitle: "Day 19: Thị trường tài chính",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Chức năng cơ bản nhất của hệ thống tài chính là gì?",
    options: [
      "Thu thuế cho chính phủ",
      "Phân bổ vốn: kết nối người có tiền thừa với người cần tiền cho những mục đích sử dụng hiệu quả nhất",
      "Kiểm soát lạm phát",
      "Phát hành tiền tệ",
    ],
    correct: 1,
    explanation: "Hệ thống tài chính là trung gian phân bổ vốn trong nền kinh tế. Không có nó, người tiết kiệm không biết ai cần vốn, và người cần vốn không tiếp cận được người tiết kiệm. Phân bổ vốn hiệu quả thúc đẩy tăng trưởng kinh tế.",
  },
  {
    question: "Ngân hàng thương mại kiếm tiền chủ yếu bằng cách nào?",
    options: [
      "Phí chuyển tiền và ATM",
      "Chênh lệch lãi suất: huy động tiền gửi với lãi thấp hơn, cho vay với lãi cao hơn",
      "Đầu tư cổ phiếu cho khách hàng",
      "Bán bảo hiểm cho khách hàng",
    ],
    correct: 1,
    explanation: "Net Interest Margin (NIM) là chênh lệch giữa lãi suất cho vay và lãi suất huy động. Đây là nguồn thu chính của ngân hàng thương mại. NIM thường 2-4%, và nhân với hàng nghìn tỷ tổng tài sản tạo ra lợi nhuận lớn.",
  },
  {
    question: "Tại sao sự ổn định của hệ thống ngân hàng quan trọng hơn sự ổn định của bất kỳ doanh nghiệp riêng lẻ nào?",
    options: [
      "Vì ngân hàng có nhiều nhân viên nhất",
      "Vì ngân hàng nắm giữ tiết kiệm của người dân và là trung tâm thanh toán; sụp đổ ngân hàng lan rộng ra toàn bộ nền kinh tế",
      "Vì chính phủ sở hữu ngân hàng",
      "Vì ngân hàng lớn nhất trong số các doanh nghiệp",
    ],
    correct: 1,
    explanation: "Rủi ro hệ thống: ngân hàng kết nối tất cả. Một ngân hàng lớn sụp đổ có thể kéo theo ngân hàng khác (do họ cho nhau vay), đóng băng tín dụng toàn nền kinh tế, và làm người dân mất tiết kiệm. Đây là lý do ngân hàng được quản lý chặt nhất trong mọi nền kinh tế.",
  },
];

const CONCEPTS = [
  { vi: "Trung gian tài chính", en: "Financial Intermediary", def: "Tổ chức kết nối người tiết kiệm với người vay: ngân hàng, quỹ đầu tư, công ty bảo hiểm" },
  { vi: "Biên lợi nhuận lãi suất", en: "Net Interest Margin (NIM)", def: "Chênh lệch giữa lãi suất cho vay và lãi suất huy động; nguồn thu chính của ngân hàng thương mại" },
  { vi: "Rủi ro hệ thống", en: "Systemic Risk", def: "Rủi ro một sự kiện tại một điểm gây ra sụp đổ dây chuyền cho toàn bộ hệ thống tài chính" },
  { vi: "Ngân hàng trung ương", en: "Central Bank", def: "Cơ quan quản lý chính sách tiền tệ và là người cho vay cuối cùng khi hệ thống ngân hàng gặp khủng hoảng" },
  { vi: "Bảo hiểm tiền gửi", en: "Deposit Insurance", def: "Cơ chế bảo vệ người gửi tiền khi ngân hàng phá sản; giảm nguy cơ bank run" },
];

const TAKEAWAYS = [
  "Hệ thống tài chính phân bổ vốn từ người thừa sang người thiếu; đây là chức năng cơ bản của nó.",
  "Ngân hàng kiếm tiền từ chênh lệch lãi suất huy động và cho vay (NIM); đây là mô hình kinh doanh cốt lõi.",
  "Rủi ro hệ thống khiến ngân hàng được quản lý chặt hơn mọi ngành khác; sụp đổ một ngân hàng lớn có thể lan rộng.",
  "Ngân hàng trung ương là người cho vay cuối cùng, neo giữ sự ổn định của toàn bộ hệ thống tài chính.",
];

export default function HeThongTaiChinhPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Khi bạn gửi tiền vào ngân hàng, bạn đang tham gia vào một mạng lưới khổng lồ di chuyển vốn từ nơi có thừa sang nơi đang cần. Hiểu hệ thống tài chính hoạt động như thế nào giúp bạn biết tiền của mình đang làm gì và ai đang kiếm tiền từ nó.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Chức năng cơ bản: phân bổ vốn</h3>
          <p>
            Trong bất kỳ nền kinh tế nào, luôn có hai nhóm người: người có tiền thừa và người cần tiền để đầu tư hay tiêu dùng. Hệ thống tài chính là cơ sở hạ tầng kết nối hai nhóm đó.
          </p>
          <p>
            Không có hệ thống tài chính, người nông dân tiết kiệm được 50 triệu không biết ai cần vốn để mở nhà xưởng. Người muốn mở nhà xưởng không biết ai có tiền nhàn rỗi để vay. Hệ thống tài chính giải quyết vấn đề thông tin và kết nối này, và nhận phí (dưới dạng chênh lệch lãi suất) cho dịch vụ đó.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Ngân hàng thương mại: trung gian truyền thống</h3>
          <p>
            Ngân hàng thương mại là hình thức trung gian tài chính phổ biến nhất và lâu đời nhất. Mô hình kinh doanh đơn giản: huy động tiền gửi từ hàng triệu người với lãi suất X, cho vay lại với lãi suất X+Y, và phần Y (sau chi phí hoạt động) là lợi nhuận.
          </p>
          <p>
            Biên lợi nhuận lãi suất (NIM) thường chỉ 2-4%, nhưng nhân với hàng trăm nghìn tỷ tổng tài sản thì tạo ra lợi nhuận khổng lồ. Đây là lý do ngân hàng là một trong những ngành có lợi nhuận cao và ổn định nhất trong lịch sử.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Tiền gửi của bạn đi đâu</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Bạn gửi 100 triệu vào ngân hàng với lãi 5%/năm. Ngân hàng giữ lại khoảng 10-15 triệu (dự trữ bắt buộc), cho vay 85-90 triệu với lãi 9-12%/năm. Chênh lệch lãi suất và rủi ro tín dụng (có thể có nợ xấu) là nguồn lợi nhuận của ngân hàng. Tiền của bạn đang cho ai đó vay để mua nhà, mở doanh nghiệp, hoặc tiêu dùng.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Các thành phần khác của hệ thống tài chính</h3>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Thị trường chứng khoán", rest: ": kết nối doanh nghiệp cần vốn dài hạn với nhà đầu tư muốn sở hữu cổ phần" },
              { bold: "Thị trường trái phiếu", rest: ": chính phủ và doanh nghiệp vay vốn dài hạn từ nhà đầu tư với lãi suất cố định" },
              { bold: "Công ty bảo hiểm", rest: ": thu phí bảo hiểm, đầu tư, và trả tiền bồi thường khi xảy ra sự kiện bảo hiểm" },
              { bold: "Quỹ đầu tư", rest: ": gom vốn từ nhiều nhà đầu tư nhỏ để đầu tư đa dạng hóa với quy mô lớn" },
              { bold: "Fintech và tài chính số", rest: ": công nghệ giảm chi phí trung gian, mở rộng tiếp cận tài chính cho người chưa có tài khoản ngân hàng" },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Tại sao ổn định hệ thống ngân hàng quan trọng đặc biệt</h3>
          <p>
            Hệ thống ngân hàng là trung tâm thần kinh của nền kinh tế. Khi ngân hàng hoạt động bình thường, tín dụng lưu thông, doanh nghiệp mở rộng, người dân vay mua nhà. Khi ngân hàng gặp vấn đề, mọi thứ đóng băng.
          </p>
          <p>
            Cuộc khủng hoảng tài chính 2008 là ví dụ điển hình: khi các ngân hàng lớn mất khả năng thanh khoản, tín dụng đóng cửa trên toàn thế giới, doanh nghiệp không thể vay tiền để trả lương, và kinh tế toàn cầu rơi vào suy thoái.
          </p>
          <p>
            Đây là lý do ngân hàng trung ương đóng vai trò người cho vay cuối cùng: khi không ai khác dám cho vay, ngân hàng trung ương bơm thanh khoản vào hệ thống để ngăn chặn sự sụp đổ dây chuyền.
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

        <div className="text-center space-y-2 py-4">
          <p className="text-stone-500 text-base">Tiền không bao giờ đứng yên trong hệ thống tài chính.</p>
          <p className="text-stone-900 font-bold text-xl">Nó liên tục di chuyển từ nơi có thừa sang nơi cần, và mỗi chặng đường đó ai đó kiếm được phí trung gian.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
