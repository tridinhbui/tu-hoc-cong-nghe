"use client";

import Image from "next/image";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 13, day: 13, accent: "stone",
  title: "Thanh khoản là gì và tại sao nó quan trọng.",
  subtitle: "Thanh khoản là tốc độ và khả năng chuyển đổi tài sản thành tiền mặt mà không mất giá đáng kể. Đây là yếu tố thường bị bỏ qua cho đến khi bạn thực sự cần tiền gấp.",
  duration: "6 phút", difficulty: "Dễ", emoji: "·",
  nextSlug: "no-tot-no-xau", nextTitle: "Day 14: Nợ tốt và nợ xấu",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Bạn có bất động sản trị giá 3 tỷ nhưng đang cần 200 triệu gấp trong 3 ngày. Vấn đề tài chính ở đây là gì?",
    options: [
      "Không có vấn đề vì bạn có đủ tài sản",
      "Vấn đề thanh khoản: tài sản đủ lớn nhưng không thể chuyển thành tiền nhanh",
      "Vấn đề tín dụng: ngân hàng không tin tưởng bạn",
      "Vấn đề giá trị tài sản thấp hơn thực",
    ],
    correct: 1,
    explanation: "Đây là khủng hoảng thanh khoản điển hình: tài sản có giá trị nhưng không thể thanh lý nhanh. Nhiều doanh nghiệp phá sản không phải vì mất vốn mà vì mất thanh khoản ngắn hạn.",
  },
  {
    question: "Xếp hạng thanh khoản từ cao đến thấp: bất động sản, tiền mặt, cổ phiếu blue-chip, vàng vật chất.",
    options: [
      "Tiền mặt, cổ phiếu blue-chip, vàng vật chất, bất động sản",
      "Cổ phiếu blue-chip, tiền mặt, vàng vật chất, bất động sản",
      "Tiền mặt, vàng vật chất, cổ phiếu blue-chip, bất động sản",
      "Tất cả đều như nhau",
    ],
    correct: 0,
    explanation: "Tiền mặt: thanh khoản tuyệt đối. Cổ phiếu blue-chip: bán trong giờ giao dịch, T+2. Vàng vật chất: bán được nhưng cần đến tiệm, giá spread. Bất động sản: có thể mất vài tháng đến vài năm.",
  },
  {
    question: "Tại sao nên giữ quỹ khẩn cấp bằng tiền mặt hoặc tài khoản tiết kiệm thay vì đầu tư vào cổ phiếu?",
    options: [
      "Vì cổ phiếu không sinh lời",
      "Vì cổ phiếu có thể giảm giá đúng lúc bạn cần tiền; cần đảm bảo giá trị không giảm khi rút gấp",
      "Vì ngân hàng an toàn hơn thị trường chứng khoán",
      "Vì lãi tiết kiệm cao hơn lợi nhuận cổ phiếu",
    ],
    correct: 1,
    explanation: "Quỹ khẩn cấp phải sẵn sàng khi cần, với giá trị ổn định. Cổ phiếu có thể giảm 30-40% đúng lúc bạn mất việc hoặc gặp cấp cứu y tế. Ưu tiên của quỹ này là khả dụng, không phải lợi nhuận.",
  },
];

const CONCEPTS = [
  { vi: "Thanh khoản", en: "Liquidity", def: "Khả năng chuyển đổi tài sản thành tiền mặt nhanh chóng mà không mất giá đáng kể" },
  { vi: "Rủi ro thanh khoản", en: "Liquidity Risk", def: "Rủi ro không thể bán tài sản kịp thời hoặc phải bán với giá thấp hơn giá trị thực do thiếu người mua" },
  { vi: "Chênh lệch mua bán", en: "Bid-Ask Spread", def: "Khoảng cách giữa giá mua và giá bán; tài sản kém thanh khoản có spread rộng hơn, chi phí giao dịch cao hơn" },
  { vi: "Quỹ khẩn cấp", en: "Emergency Fund", def: "Tiền dự phòng 3-6 tháng chi phí sinh hoạt; giữ ở dạng có thanh khoản cao để dùng ngay khi cần" },
];

const TAKEAWAYS = [
  "Thanh khoản là tốc độ chuyển đổi tài sản thành tiền mà không mất giá lớn.",
  "Tài sản có giá trị nhưng kém thanh khoản có thể gây khủng hoảng khi cần tiền gấp.",
  "Quỹ khẩn cấp phải giữ ở dạng có thanh khoản cao, ưu tiên khả dụng hơn lợi nhuận.",
  "Thanh khoản thấp thường đi kèm lợi nhuận cao hơn vì nhà đầu tư yêu cầu phần bù cho sự bất tiện.",
];

export default function ThanhKhoanLaGiPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Nhiều người nhầm lẫn giàu có và thanh khoản. Bạn có thể giàu trên giấy tờ nhưng vẫn gặp khủng hoảng tài chính nếu không có tiền mặt sẵn sàng khi cần. Đây là bài học mà nhiều người chỉ học được trong các tình huống khó khăn.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Thanh khoản là gì</h3>
          <p>
            <strong className="text-stone-900">Thanh khoản</strong> là khả năng chuyển đổi tài sản thành tiền mặt một cách nhanh chóng và mà không phải chấp nhận mức giá thấp hơn đáng kể so với giá trị thực.
          </p>
          <p>
            Tiền mặt có thanh khoản tuyệt đối vì nó đã là tiền. Cổ phiếu niêm yết có thanh khoản cao vì có thể bán trong giờ giao dịch và nhận tiền sau 2 ngày. Bất động sản có thanh khoản thấp vì có thể mất vài tháng đến vài năm để bán được.
          </p>
          <p>
            Tài sản kém thanh khoản không phải là tài sản xấu, nhưng việc nắm giữ quá nhiều tài sản kém thanh khoản mà không có đệm tiền mặt là rủi ro tài chính thực sự.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Khủng hoảng thanh khoản: khi giàu mà vẫn vỡ nợ</h3>
          <p>
            Nhiều doanh nghiệp và cá nhân phá sản không phải vì thiếu tài sản, mà vì thiếu thanh khoản ngắn hạn.
          </p>
          <p>
            Hãy tưởng tượng: bạn có 5 tỷ đồng bất động sản, doanh nghiệp đang hoạt động tốt, nhưng đến cuối tháng phải trả 300 triệu tiền lương và 200 triệu tiền thuê mặt bằng. Nếu khách hàng chậm thanh toán và ngân hàng không cho vay ngắn hạn, bạn có thể mất doanh nghiệp dù về mặt giá trị ròng bạn vẫn dương.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Ví dụ lịch sử</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Khủng hoảng tài chính 2008: nhiều ngân hàng lớn sụp đổ không phải vì tài sản mất giá hoàn toàn, mà vì khủng hoảng thanh khoản. Họ nắm giữ tài sản dài hạn (chứng khoán thế chấp) nhưng phụ thuộc vào nguồn vốn ngắn hạn. Khi thị trường ngắn hạn đóng băng, họ không thể trả nợ dù tài sản vẫn còn giá trị.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Phổ thanh khoản của các tài sản phổ biến</h3>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Tiền mặt và tài khoản thanh toán", rest: ": thanh khoản tức thì, không mất giá" },
              { bold: "Tiết kiệm có kỳ hạn ngắn", rest: ": 1-3 tháng rút được, có thể mất một phần lãi nếu rút sớm" },
              { bold: "Cổ phiếu niêm yết lớn", rest: ": bán trong giờ giao dịch, nhận tiền T+2, spread nhỏ" },
              { bold: "Vàng vật chất", rest: ": bán được tại tiệm, nhưng có spread mua-bán và phụ thuộc giờ mở cửa" },
              { bold: "Trái phiếu doanh nghiệp", rest: ": thị trường thứ cấp kém thanh khoản, có thể phải bán chiết khấu" },
              { bold: "Bất động sản", rest: ": có thể mất vài tháng đến vài năm, và phải chấp nhận thương lượng giá" },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Quỹ khẩn cấp: phần không thể thiếu</h3>
          <p>
            Nguyên tắc cơ bản: trước khi đầu tư vào bất kỳ tài sản nào, cần có một quỹ khẩn cấp tương đương 3-6 tháng chi phí sinh hoạt, giữ ở dạng có thanh khoản cao.
          </p>
          <p>
            Quỹ này không tối ưu về lợi nhuận, nhưng không phải mục đích của nó là sinh lời. Mục đích là đảm bảo bạn không phải bán tài sản đầu tư trong thời điểm tệ nhất (thị trường giảm mạnh đúng lúc bạn mất việc hoặc có cấp cứu y tế) để trả các chi phí ngắn hạn.
          </p>
          <p>
            Thanh khoản thấp trong đầu tư thường được bù đắp bởi lợi nhuận cao hơn. Bất động sản, private equity, các quỹ kém thanh khoản thường cho lợi nhuận dài hạn tốt hơn, một phần vì nhà đầu tư yêu cầu <strong className="text-stone-900">phần bù thanh khoản</strong> để chấp nhận không thể rút tiền tùy ý.
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
              src="/lessons/day13-thanh-khoan-la-gi.png"
              alt="Tóm tắt trực quan Day 13"
              width={1024}
              height={1536}
              className="w-full h-auto"
            />
          </div>
        </div>


        <div className="text-center space-y-2 py-4">
          <p className="text-stone-500 text-base">Tài sản và tiền mặt không phải một.</p>
          <p className="text-stone-900 font-bold text-xl">Giàu tài sản nhưng thiếu thanh khoản vẫn có thể dẫn đến khủng hoảng. Quản lý cả hai là quản lý tài chính thực sự.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
