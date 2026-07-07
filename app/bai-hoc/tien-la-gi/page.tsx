"use client";

import Image from "next/image";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 2, day: 2, accent: "stone",
  title: "Tiền là gì? Tiền khác tài sản như thế nào.",
  subtitle: "Tiền mạnh ở khả năng sử dụng ngay. Tài sản mạnh ở khả năng lưu trữ và tạo ra giá trị.",
  duration: "6 phút", difficulty: "Dễ", emoji: "·",
  nextSlug: "thu-nhap-chi-phi-tiet-kiem", nextTitle: "Day 3: Thu nhập, chi phí, tiết kiệm và đầu tư",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Tiền và tài sản khác nhau ở điểm gì quan trọng nhất?",
    options: [
      "Tiền có thể tiêu, tài sản thì không",
      "Tiền là thanh khoản tuyệt đối, tài sản phải bán mới thành tiền",
      "Tài sản luôn có giá trị hơn tiền",
      "Tiền do ngân hàng tạo ra, tài sản do doanh nghiệp tạo ra",
    ],
    correct: 1,
    explanation: "Tiền mặt là tài sản có thanh khoản cao nhất: dùng được ngay. Cổ phiếu, bất động sản, vàng đều là tài sản nhưng cần thời gian và chi phí để chuyển thành tiền.",
  },
  {
    question: "Net worth (tài sản ròng) của bạn là gì?",
    options: [
      "Tổng thu nhập mỗi năm",
      "Tổng tài sản trừ tổng nợ phải trả",
      "Số tiền trong tài khoản ngân hàng",
      "Giá trị ngôi nhà bạn đang ở",
    ],
    correct: 1,
    explanation: "Net worth = Assets - Liabilities. Người thu nhập 100 triệu/tháng nhưng nợ 5 tỷ có thể có net worth âm. Người thu nhập 15 triệu tích lũy 10 năm có thể có net worth dương.",
  },
  {
    question: "Lạm phát ảnh hưởng đến tiền mặt và tài sản khác nhau thế nào?",
    options: [
      "Lạm phát không ảnh hưởng nếu bạn gửi ngân hàng",
      "Tiền mặt mất sức mua theo lạm phát; tài sản thực thường giữ hoặc tăng giá trị thực",
      "Lạm phát làm tất cả tài sản mất giá đều nhau",
      "Chỉ tiền mặt ở nước ngoài mới bị ảnh hưởng",
    ],
    correct: 1,
    explanation: "Giữ tiền mặt khi lạm phát 6% nghĩa là mỗi năm mất 6% sức mua. Đây là lý do cần đầu tư: để lợi nhuận vượt lạm phát và bảo toàn giá trị thực.",
  },
];

const CONCEPTS = [
  {
    vi: "Tiền",
    en: "Money",
    def: "Phương tiện trao đổi được xã hội chấp nhận rộng rãi; có tính thanh khoản tuyệt đối",
  },
  {
    vi: "Tài sản",
    en: "Asset",
    def: "Thứ có giá trị kinh tế và có thể tạo ra lợi ích trong hiện tại hoặc tương lai",
  },
  {
    vi: "Thanh khoản",
    en: "Liquidity",
    def: "Khả năng chuyển tài sản thành tiền mặt nhanh chóng mà không mất nhiều giá trị",
  },
  {
    vi: "Tài sản ròng",
    en: "Net Worth",
    def: "Tổng tài sản trừ tổng nợ; thước đo thực sự của sức khỏe tài chính",
  },
  {
    vi: "Sức mua",
    en: "Purchasing Power",
    def: "Lượng hàng hóa và dịch vụ mà một đơn vị tiền có thể mua; giảm theo lạm phát",
  },
];

const TAKEAWAYS = [
  "Tiền là một dạng tài sản nhưng có thanh khoản cao nhất; không phải tài sản nào cũng là tiền.",
  "Giàu không phải là có nhiều tiền mặt; là có tài sản tạo ra giá trị và quản lý được thanh khoản.",
  "Net worth = tổng tài sản trừ tổng nợ; đây mới là thước đo tài chính đúng nghĩa.",
  "Tiền mặt mất sức mua theo lạm phát; cần đầu tư để bảo toàn giá trị thực theo thời gian.",
];

export default function TienLaGiPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        {/* Mở đầu */}
        <p className="text-xl leading-relaxed">
          Sau khi hiểu tài chính không chỉ là tiền, câu hỏi tiếp theo là: <strong className="text-stone-900">tiền thật ra là gì?</strong>
        </p>

        <p>
          Tiền là một phương tiện được xã hội chấp nhận rộng rãi để trao đổi, đo lường giá trị và lưu trữ sức mua trong ngắn hạn. Nói đơn giản, tiền giúp mọi giao dịch trở nên dễ hơn.
        </p>

        <p>
          Nếu không có tiền, một người muốn mua gạo có thể phải đổi bằng cá, vải, công sức lao động hoặc một hàng hóa khác. Vấn đề là người bán gạo chưa chắc cần đúng thứ người kia có. Tiền giải quyết vấn đề đó bằng cách trở thành vật trung gian mà cả hai bên đều chấp nhận.
        </p>

        {/* Section 1 */}
        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Ba chức năng của tiền</h3>
          <p>
            Tiền thực hiện ba chức năng cơ bản trong nền kinh tế:
          </p>
          <ul className="space-y-4 pl-1">
            {[
              { bold: "Phương tiện trao đổi", rest: ". Tiền giúp mua bán hàng hóa và dịch vụ mà không cần trao đổi trực tiếp hàng lấy hàng." },
              { bold: "Đơn vị đo lường giá trị", rest: ". Nhờ có tiền, mình có thể so sánh giá trị của một chiếc điện thoại, một bữa ăn, một căn nhà hay một giờ lao động." },
              { bold: "Công cụ lưu trữ giá trị", rest: ". Tiền có thể giữ lại để sử dụng sau, dù khả năng lưu trữ giá trị của tiền bị giảm bởi lạm phát." },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Tiền khác tài sản như thế nào</h3>
          <p>
            Tiền là một dạng tài sản có <strong className="text-stone-900">tính thanh khoản rất cao</strong>, nghĩa là có thể dùng ngay để thanh toán. Nhưng không phải mọi tài sản đều là tiền.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-4">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Ví dụ về tài sản</p>
            <ul className="space-y-2 text-stone-600 text-base">
              {["Một căn nhà là tài sản.", "Một cổ phiếu là tài sản.", "Một trái phiếu là tài sản.", "Một chiếc xe cũng có thể là tài sản."].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-stone-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-stone-600 text-base leading-relaxed pt-1">
              Nhưng các tài sản này không thể lúc nào cũng dùng ngay để thanh toán như tiền mặt. Muốn biến chúng thành tiền, phải bán, chuyển nhượng hoặc thanh lý. Quá trình đó có thể mất thời gian, phát sinh chi phí và chịu rủi ro giá thay đổi.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Có nhiều tài sản chưa chắc đã an toàn</h3>
          <p>
            Một người sở hữu căn nhà trị giá 5 tỷ đồng có thể được xem là có tài sản lớn. Nhưng nếu trong tài khoản chỉ còn 5 triệu đồng, người đó vẫn có thể gặp khó khăn khi cần trả chi phí sinh hoạt hoặc thanh toán khoản nợ ngắn hạn. Vấn đề không nằm ở tổng tài sản, mà nằm ở <strong className="text-stone-900">thanh khoản</strong>.
          </p>
          <p>
            Đây là điểm khác biệt quan trọng:
          </p>
          <ul className="space-y-3 pl-1">
            {[
              "Giữ quá nhiều tiền mặt: tài sản mất sức mua do lạm phát.",
              "Giữ quá ít tiền mặt: thiếu khả năng thanh toán khi cần.",
              "Sở hữu nhiều tài sản nhưng tài sản khó bán: giàu trên giấy nhưng thiếu tiền trong thực tế.",
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p>
            Vì vậy, một người hoặc doanh nghiệp không chỉ cần có tài sản, mà còn cần quản lý tỷ lệ hợp lý giữa tiền mặt, tài sản đầu tư, nợ và dòng tiền.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Tài sản tốt tạo ra dòng tiền</h3>
          <p>
            Một tài sản tốt không chỉ giữ giá trị mà còn <strong className="text-stone-900">tạo ra dòng tiền trong tương lai</strong>. Nhà cho thuê tạo tiền thuê hàng tháng. Cổ phiếu có thể tạo cổ tức. Trái phiếu tạo lãi định kỳ. Một doanh nghiệp tạo ra lợi nhuận và dòng tiền.
          </p>
          <p>
            Đây chính là lý do người làm tài chính không chỉ nhìn vào giá trị của tài sản hôm nay, mà luôn hỏi: <strong className="text-stone-900">tài sản này có thể tạo ra bao nhiêu tiền trong tương lai, với mức độ rủi ro như thế nào?</strong>
          </p>
          <p>
            Giá trị của một tài sản thường phụ thuộc vào khả năng tạo tiền trong tương lai, mức độ rủi ro và nhu cầu thị trường. Một mảnh đất giá trị không nằm ở mảnh đất đó, mà nằm ở những gì mảnh đất đó có thể tạo ra.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Tiền mặt và lạm phát</h3>
          <p>
            Một điểm nhiều người bỏ qua: tiền mặt không phải là nơi trú ẩn an toàn trong dài hạn. Lạm phát làm giảm sức mua của tiền theo từng năm. Nếu lạm phát 6% mỗi năm và bạn giữ 100 triệu trong két, sau 10 năm số tiền đó chỉ còn giá trị tương đương khoảng 56 triệu đồng theo sức mua thực tế.
          </p>
          <p>
            Đây là lý do mục tiêu đầu tư không chỉ là kiếm lợi nhuận mà còn là <strong className="text-stone-900">bảo toàn giá trị thực của tài sản</strong> trước tác động của lạm phát. Tiền gửi ngân hàng với lãi suất thấp hơn lạm phát về bản chất là đang mất tiền mỗi ngày.
          </p>
        </section>

        {/* Khái niệm cần nhớ */}
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

        {/* Ghi nhớ nhanh */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-stone-900 px-6 py-5">
            <p className="text-white font-extrabold text-xl tracking-wide">Ghi nhớ nhanh</p>
            <p className="text-stone-500 text-sm mt-0.5">4 điều cốt lõi từ bài này</p>
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
        {/* Tóm tắt trực quan */}
        <div className="space-y-3">
          <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
            Tóm tắt trực quan
          </div>
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-lg">
            <Image
              src="/lessons/day2-tien-la-gi.png"
              alt="Tóm tắt trực quan Day 2"
              width={1024}
              height={1536}
              className="w-full h-auto"
            />
          </div>
        </div>


        {/* Closing */}
        <div className="text-center space-y-2 py-4">
          <p className="text-stone-500 text-base">Tiền là công cụ thanh toán có tính thanh khoản cao nhất.</p>
          <p className="text-stone-900 font-bold text-xl">Nhưng giàu không phải là có nhiều tiền mặt. Giàu là có tài sản tạo ra giá trị và biết quản lý thanh khoản.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
