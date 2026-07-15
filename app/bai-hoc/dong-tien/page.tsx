"use client";

import Image from "next/image";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 4, day: 4, accent: "stone",
  title: "Dòng tiền là gì và vì sao tài chính bắt đầu từ dòng tiền?",
  subtitle: "Lợi nhuận cho thấy hiệu quả trên báo cáo. Dòng tiền cho thấy năng lực tài chính trong thực tế.",
  duration: "7 phút", difficulty: "Dễ", emoji: "·",
  nextSlug: "tai-san-tieu-san", nextTitle: "Day 5: Tài sản và tiêu sản",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Một công ty bán được 5 tỷ đồng hàng hóa trong quý, khách hàng được trả chậm sau 90 ngày. Tháng này công ty có thể gặp vấn đề gì?",
    options: [
      "Không có vấn đề gì vì đã có doanh thu",
      "Thiếu tiền mặt để trả nhà cung cấp và lương nhân viên dù doanh thu dương",
      "Lợi nhuận sẽ âm",
      "Phải hoàn lại hàng cho khách",
    ],
    correct: 1,
    explanation: "Doanh thu ghi nhận khi bán hàng, nhưng tiền chỉ về sau 90 ngày. Trong thời gian đó, công ty vẫn phải trả lương, chi phí vận hành và các nghĩa vụ ngắn hạn. Đây là lý do dòng tiền quan trọng hơn doanh thu khi đánh giá sức khỏe tài chính ngắn hạn.",
  },
  {
    question: "Người A thu nhập 50 triệu/tháng, chi tiêu và trả nợ 55 triệu. Người B thu nhập 25 triệu, giữ lại 6 triệu mỗi tháng. Ai có nền tảng tài chính lành mạnh hơn?",
    options: [
      "Người A vì thu nhập cao hơn",
      "Người B vì dòng tiền dương - tích lũy đều đặn dù thu nhập thấp hơn",
      "Như nhau vì khác hoàn cảnh",
      "Không thể so sánh",
    ],
    correct: 1,
    explanation: "Thu nhập cao không tự động đồng nghĩa với sức khỏe tài chính tốt. Người A dòng tiền âm 5 triệu mỗi tháng - đang mất tài sản dần. Người B dòng tiền dương 6 triệu - đang xây dựng nền tảng bền vững.",
  },
  {
    question: "Tại sao dòng tiền được xem là nền tảng của tài chính?",
    options: [
      "Vì dòng tiền dễ tính hơn lợi nhuận",
      "Vì dòng tiền trả lời câu hỏi: tiền được tạo ra khi nào, mức độ chắc chắn ra sao, và có đủ đáp ứng nghĩa vụ hiện tại không",
      "Vì kế toán yêu cầu theo dõi dòng tiền",
      "Vì dòng tiền luôn lớn hơn lợi nhuận",
    ],
    correct: 1,
    explanation: "Tài chính không chỉ hỏi 'hoạt động này có sinh lời không?' mà còn hỏi 'tiền về khi nào, có chắc chắn không, và có đủ để tồn tại không?' Ba câu hỏi đó chỉ dòng tiền mới trả lời được - không phải lợi nhuận kế toán.",
  },
  {
    question: "Ngân hàng cho vay xem xét yếu tố nào quan trọng nhất?",
    options: [
      "Tài sản thế chấp là yếu tố duy nhất",
      "Lợi nhuận ròng trong năm gần nhất",
      "Khả năng tạo dòng tiền để trả nợ định kỳ",
      "Quy mô doanh nghiệp",
    ],
    correct: 2,
    explanation: "Ngân hàng biết rằng tài sản thế chấp chỉ là phương án cuối cùng. Điều họ thực sự muốn là doanh nghiệp tạo đủ dòng tiền để trả lãi và gốc đúng hạn - đây là lý do các khoản vay doanh nghiệp đều phân tích DSCR (Debt Service Coverage Ratio).",
  },
  {
    question: "\"Profit is opinion, cash is fact\" có nghĩa là gì?",
    options: [
      "Tiền mặt quan trọng hơn lợi nhuận trong mọi trường hợp",
      "Lợi nhuận phụ thuộc vào phương pháp kế toán và ước tính; tiền trong tài khoản là thực tế không thể thay đổi bằng bút toán",
      "Doanh nghiệp nên ẩn giấu lợi nhuận",
      "Lợi nhuận và tiền mặt luôn bằng nhau trong dài hạn",
    ],
    correct: 1,
    explanation: "Lợi nhuận bị ảnh hưởng bởi chính sách khấu hao, phương pháp tính hàng tồn kho, thời điểm ghi nhận doanh thu - tất cả có thể điều chỉnh hợp pháp. Tiền mặt trong tài khoản ngân hàng thì không. Đây là lý do nhà đầu tư giỏi luôn nhìn vào dòng tiền, không chỉ P&L.",
  },
];

const CONCEPTS = [
  {
    vi: "Dòng tiền",
    en: "Cash Flow",
    def: "Tiền thực tế vào và ra, không phải số kế toán trên giấy",
  },
  {
    vi: "Dòng tiền dương / âm",
    en: "Positive / Negative Cash Flow",
    def: "Thu vào nhiều hơn chi ra (dương) hoặc ngược lại (âm)",
  },
  {
    vi: "Lợi nhuận kế toán",
    en: "Accounting Profit / Net Income",
    def: "Doanh thu trừ chi phí theo nguyên tắc dồn tích; có thể khác tiền mặt thực",
  },
  {
    vi: "Dòng tiền từ hoạt động kinh doanh",
    en: "Operating Cash Flow (OCF)",
    def: "Tiền mặt thực tế sinh ra từ hoạt động cốt lõi của doanh nghiệp",
  },
  {
    vi: "Khoản phải thu",
    en: "Accounts Receivable",
    def: "Tiền khách hàng nợ; đã ghi doanh thu nhưng chưa thu được tiền",
  },
  {
    vi: "Thanh khoản",
    en: "Liquidity",
    def: "Khả năng chuyển tài sản thành tiền mặt để đáp ứng nghĩa vụ ngắn hạn",
  },
];

const TAKEAWAYS = [
  "Lợi nhuận là con số kế toán. Tiền mặt trong tài khoản mới là sự thật.",
  "Doanh nghiệp phá sản vì hết tiền, không phải vì báo cáo lỗ.",
  "Thu nhập cao không tự động đồng nghĩa với sức khỏe tài chính tốt.",
  "Dòng tiền trả lời: tiền về khi nào, có chắc không, và có đủ không?",
];

export default function DongTienPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        {/* Intro */}
        <p className="text-xl leading-relaxed">
          Trong tài chính, <strong className="text-stone-900">dòng tiền</strong> là sự vận động thực tế của tiền vào
          và tiền ra trong một cá nhân, doanh nghiệp hoặc dự án. Khác với doanh thu hay lợi nhuận kế toán,
          dòng tiền phản ánh <strong className="text-stone-900">khả năng tạo ra và sử dụng tiền thật</strong> tại một
          thời điểm cụ thể.
        </p>

        {/* Section 1 */}
        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Doanh thu ≠ Tiền mặt</h3>
          <p className="text-lg">
            Một doanh nghiệp có thể ghi nhận doanh thu cao nhưng chưa chắc có dòng tiền tốt. Khi doanh nghiệp
            đã bán hàng nhưng khách hàng <strong className="text-stone-900">chưa thanh toán</strong>, khoản doanh thu
            đó chưa trở thành tiền mặt, trong khi các nghĩa vụ sau đây vẫn phải trả ngay:
          </p>
          <ul className="space-y-3 pl-1">
            {[
              "Lương nhân viên cuối tháng",
              "Tiền thuê mặt bằng, văn phòng",
              "Lãi vay ngân hàng đến kỳ",
              "Thanh toán cho nhà cung cấp",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Ví dụ thực tế</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Một công ty bán được <strong className="text-stone-900">5 tỷ đồng</strong> hàng hóa trong quý,
              nhưng khách hàng được trả chậm sau 90 ngày. Trên báo cáo, công ty có doanh thu. Nhưng trong
              ngắn hạn, công ty vẫn có thể thiếu tiền để trả nhà cung cấp và lương nhân viên.
            </p>
            <p className="text-stone-500 text-base mt-2">
              Vấn đề không nằm ở doanh số mà nằm ở <strong className="text-stone-700">thời điểm tiền thật được thu về</strong>.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Tại sao dòng tiền là nền tảng của tài chính</h3>
          <p className="text-lg">
            Tài chính không chỉ quan tâm một hoạt động có tạo ra lợi nhuận hay không. Tài chính còn quan tâm:
          </p>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Khi nào", rest: " tiền được tạo ra: hôm nay hay sau 6 tháng?" },
              { bold: "Mức độ chắc chắn", rest: ": tiền có về đúng hẹn không?" },
              { bold: "Có đủ", rest: " để đáp ứng các nghĩa vụ tài chính hiện tại không?" },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3: Business vs Personal */}
        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Với doanh nghiệp và với cá nhân</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-stone-200 rounded-2xl p-6 space-y-3">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Doanh nghiệp</p>
              <p className="text-base text-stone-600 leading-relaxed">
                Một công ty có thể tăng trưởng doanh thu nhanh nhưng vẫn rơi vào khó khăn nếu chi trước
                quá nhiều cho hàng tồn kho, mở rộng hệ thống, marketing, trong khi tiền thu về chậm.
              </p>
              <p className="text-base text-stone-700 font-semibold">
                Dòng tiền ổn định = nền tảng tài chính bền vững.
              </p>
            </div>

            <div className="border border-stone-200 rounded-2xl p-6 space-y-3">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Cá nhân</p>
              <div className="space-y-3 text-base text-stone-600">
                <div className="flex justify-between border-b border-stone-100 pb-3">
                  <span>Thu nhập 50 triệu, chi 55 triệu</span>
                  <span className="font-bold text-stone-900">Âm 5 tr</span>
                </div>
                <div className="flex justify-between">
                  <span>Thu nhập 25 triệu, giữ lại 6 triệu</span>
                  <span className="font-bold text-stone-900">+6 tr</span>
                </div>
              </div>
              <p className="text-base text-stone-700 font-semibold">
                Thu nhập cao không tự động = sức khỏe tài chính tốt.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Applications */}
        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Dòng tiền kết nối với những gì?</h3>
          <p className="text-lg">Từ dòng tiền, các khái niệm tài chính quan trọng được hình thành:</p>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Định giá doanh nghiệp", rest: ": nhà đầu tư nhìn vào dòng tiền tương lai, không chỉ lợi nhuận hiện tại" },
              { bold: "Cho vay ngân hàng", rest: ": đánh giá khả năng tạo dòng tiền để trả nợ, không chỉ tài sản thế chấp" },
              { bold: "Vốn lưu động", rest: ": quản lý tiền vào và ra trong ngắn hạn" },
              { bold: "Quản trị rủi ro", rest: ": dự báo kịch bản dòng tiền âm và chuẩn bị trước" },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ===== KHÁI NIỆM CẦN NHỚ ===== */}
        <div className="rounded-2xl overflow-hidden border-2 border-stone-900 shadow-lg">
          <div className="bg-stone-900 px-6 py-4">
            <p className="text-white font-extrabold text-lg tracking-wide">Khái niệm cần nhớ</p>
            <p className="text-stone-500 text-sm mt-0.5">Chạm hoặc di chuột vào từng dòng</p>
          </div>
          <div className="divide-y divide-stone-100 bg-white">
            {CONCEPTS.map(({ vi, en, def }) => (
              <div
                key={en}
                className="group px-6 py-4 flex items-start gap-4 cursor-default transition-all duration-200 hover:bg-stone-50 hover:pl-8"
              >
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

        {/* ===== GHI NHỚ NHANH ===== */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-stone-900 px-6 py-5">
            <p className="text-white font-extrabold text-xl tracking-wide">Ghi nhớ nhanh</p>
            <p className="text-stone-500 text-sm mt-0.5">4 điều cốt lõi bạn cần nhớ từ bài này</p>
          </div>
          <div className="bg-stone-800 divide-y divide-stone-700">
            {TAKEAWAYS.map((t, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 px-6 py-5 cursor-default transition-all duration-200 hover:bg-stone-700"
              >
                <span className="w-8 h-8 rounded-full bg-stone-600 group-hover:bg-stone-500 transition-colors flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-stone-200 group-hover:text-white text-lg leading-relaxed transition-colors font-medium">{t}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing quote */}
        {/* Tóm tắt trực quan */}
        <div className="space-y-3">
          <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
            Tóm tắt trực quan
          </div>
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-lg">
            <Image
              src="/lessons/day4-dong-tien.png"
              alt="Tóm tắt trực quan Day 4"
              width={1024}
              height={1536}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="text-center space-y-2 py-4">
          <p className="text-stone-500 text-base">Lợi nhuận cho thấy hiệu quả trên báo cáo.</p>
          <p className="text-stone-900 font-bold text-xl">Dòng tiền cho thấy năng lực tài chính trong thực tế.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
