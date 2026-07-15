"use client";

import Image from "next/image";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 19, day: 19, accent: "stone",
  title: "Thị trường tài chính: nơi giá được định.",
  subtitle: "Thị trường tài chính là nơi người mua và người bán gặp nhau để định giá tài sản theo thông tin hiện tại. Hiểu thị trường là hiểu cơ chế khám phá giá của toàn bộ nền kinh tế.",
  duration: "7 phút", difficulty: "Trung bình", emoji: "·",
  nextSlug: "on-tap-chang-1", nextTitle: "Day 20: Ôn tập Chặng 1",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Giả thuyết thị trường hiệu quả (EMH) ở dạng mạnh cho rằng điều gì?",
    options: [
      "Thị trường luôn tăng trong dài hạn",
      "Giá tài sản đã phản ánh tất cả thông tin, kể cả thông tin nội bộ; không thể kiếm lợi nhuận vượt trội bền vững",
      "Thị trường không bao giờ sai",
      "Chỉ những nhà đầu tư chuyên nghiệp mới kiếm được lợi nhuận",
    ],
    correct: 1,
    explanation: "EMH dạng mạnh: giá phản ánh tất cả thông tin (công khai + nội bộ). Dạng trung bình: chỉ thông tin công khai. Dạng yếu: chỉ giá lịch sử. Trong thực tế, thị trường không hoàn toàn hiệu quả nhưng đủ hiệu quả để hầu hết nhà đầu tư chủ động không vượt được chỉ số trong dài hạn.",
  },
  {
    question: "Thị trường sơ cấp và thị trường thứ cấp khác nhau như thế nào?",
    options: [
      "Thị trường sơ cấp là cho người mới đầu tư, thứ cấp cho người giàu",
      "Thị trường sơ cấp: phát hành mới (IPO, trái phiếu mới), tiền đến tay doanh nghiệp. Thứ cấp: giao dịch giữa nhà đầu tư, doanh nghiệp không nhận tiền",
      "Không có sự khác biệt thực tế",
      "Thị trường sơ cấp chỉ có cổ phiếu, thứ cấp chỉ có trái phiếu",
    ],
    correct: 1,
    explanation: "IPO (lần đầu phát hành cổ phiếu ra công chúng) là thị trường sơ cấp: doanh nghiệp nhận tiền. Sau đó cổ phiếu giao dịch trên sàn chứng khoán là thị trường thứ cấp: tiền chạy giữa nhà đầu tư, doanh nghiệp không nhận được gì.",
  },
  {
    question: "Tại sao giá thị trường ngắn hạn thường không phản ánh giá trị nội tại dài hạn?",
    options: [
      "Vì thị trường luôn sai",
      "Vì giá ngắn hạn bị ảnh hưởng mạnh bởi tâm lý, thanh khoản và tin tức; giá trị nội tại phụ thuộc vào dòng tiền dài hạn ổn định hơn",
      "Vì các nhà đầu tư lớn thao túng giá",
      "Vì giá trị nội tại không thể tính được",
    ],
    correct: 1,
    explanation: "Trong ngắn hạn, thị trường là cỗ máy bỏ phiếu bị ảnh hưởng bởi cảm xúc. Trong dài hạn, nó là cỗ máy cân nặng phản ánh giá trị thực. Ben Graham, thầy của Warren Buffett, mô tả điều này. Đây là cơ sở của đầu tư giá trị.",
  },
];

const CONCEPTS = [
  { vi: "Thị trường sơ cấp", en: "Primary Market", def: "Nơi tài sản tài chính mới được phát hành; doanh nghiệp nhận vốn trực tiếp từ nhà đầu tư" },
  { vi: "Thị trường thứ cấp", en: "Secondary Market", def: "Nơi các tài sản đã phát hành được giao dịch giữa nhà đầu tư; cung cấp thanh khoản và khám phá giá liên tục" },
  { vi: "Hiệu quả thị trường", en: "Market Efficiency", def: "Mức độ mà giá thị trường phản ánh đầy đủ và nhanh chóng tất cả thông tin có sẵn" },
  { vi: "Giá trị nội tại", en: "Intrinsic Value", def: "Giá trị thực của tài sản dựa trên dòng tiền tương lai kỳ vọng; thường khác với giá thị trường ngắn hạn" },
  { vi: "Khám phá giá", en: "Price Discovery", def: "Quá trình thị trường xác định giá cân bằng thông qua tương tác giữa người mua và người bán" },
];

const TAKEAWAYS = [
  "Thị trường tài chính có hai chức năng chính: phân bổ vốn cho doanh nghiệp (sơ cấp) và cung cấp thanh khoản (thứ cấp).",
  "Giả thuyết thị trường hiệu quả: giá phản ánh thông tin hiện có; đánh bại thị trường bền vững là khó và ngày càng khó hơn.",
  "Ngắn hạn: thị trường là cỗ máy bỏ phiếu bị tâm lý chi phối. Dài hạn: là cỗ máy cân nặng phản ánh giá trị thực.",
  "Hiểu thị trường không có nghĩa là đoán được hướng ngắn hạn; có nghĩa là định vị đúng trong dài hạn.",
];

export default function ThiTruongTaiChinhPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Thị trường tài chính không chỉ là nơi mua bán cổ phiếu. Đó là cơ chế mà thông qua đó hàng triệu người tham gia cùng nhau xác định giá trị của mọi tài sản, từ cổ phiếu doanh nghiệp đến trái phiếu chính phủ đến tiền tệ các quốc gia.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Hai tầng của thị trường tài chính</h3>
          <p>
            <strong className="text-stone-900">Thị trường sơ cấp</strong> là nơi tài sản mới được tạo ra. Khi một công ty phát hành cổ phiếu lần đầu (IPO) hoặc chính phủ phát hành trái phiếu, tiền từ nhà đầu tư đi thẳng đến tổ chức phát hành. Đây là lần duy nhất trong vòng đời của tài sản mà người phát hành nhận được tiền.
          </p>
          <p>
            <strong className="text-stone-900">Thị trường thứ cấp</strong> là nơi các tài sản đó được mua đi bán lại giữa nhà đầu tư. Sàn chứng khoán là ví dụ điển hình: mọi giao dịch ở đây là tiền chạy từ người mua sang người bán, doanh nghiệp không nhận thêm gì. Chức năng chính của thị trường thứ cấp là cung cấp thanh khoản và khám phá giá liên tục.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Giá được xác định như thế nào</h3>
          <p>
            Giá thị trường tại bất kỳ thời điểm nào là điểm cân bằng giữa mọi người muốn mua và mọi người muốn bán. Không phải một người quyết định, không phải một công ty quyết định, mà là toàn bộ thị trường.
          </p>
          <p>
            Giá phản ánh tổng hợp của tất cả thông tin mà người tham gia biết và kỳ vọng của họ về tương lai. Khi tin tức tốt về một công ty được công bố, người ta muốn mua nhiều hơn, đẩy giá lên. Khi tin tức xấu, người ta muốn bán, đẩy giá xuống. Quá trình này diễn ra liên tục trong giờ giao dịch.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Tại sao giá có thể sai trong ngắn hạn</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Thị trường không phải lúc nào cũng phản ánh đúng giá trị thực. Tâm lý sợ hãi và tham lam đẩy giá lên quá cao hoặc xuống quá thấp so với giá trị nội tại. Điều này tạo ra cơ hội cho nhà đầu tư kiên nhẫn, nhưng cũng tạo ra rủi ro cho người giao dịch ngắn hạn.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Giả thuyết thị trường hiệu quả và thực tế</h3>
          <p>
            Giả thuyết thị trường hiệu quả (Efficient Market Hypothesis) cho rằng giá tài sản luôn phản ánh đầy đủ mọi thông tin có sẵn. Nếu đúng hoàn toàn, không ai có thể liên tục đánh bại thị trường vì thông tin mới lập tức được phản ánh vào giá.
          </p>
          <p>
            Thực tế phức tạp hơn. Thị trường không hoàn toàn hiệu quả, đặc biệt trong ngắn hạn khi tâm lý chi phối. Nhưng cũng đủ hiệu quả để hầu hết nhà đầu tư chủ động, tức là tự chọn cổ phiếu, không vượt được chỉ số thị trường sau khi trừ phí giao dịch trong dài hạn.
          </p>
          <p>
            Đây là một trong những lý do quan trọng nhất đằng sau sự phổ biến của quỹ chỉ số (index fund): nếu khó đánh bại thị trường, thì mua toàn bộ thị trường với chi phí thấp nhất là chiến lược hợp lý.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Các loại thị trường tài chính</h3>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Thị trường cổ phiếu", rest: ": mua bán quyền sở hữu doanh nghiệp; rủi ro cao, lợi nhuận dài hạn cao nhất" },
              { bold: "Thị trường trái phiếu", rest: ": mua bán công cụ nợ; ít rủi ro hơn cổ phiếu, lợi nhuận ổn định hơn" },
              { bold: "Thị trường ngoại hối (Forex)", rest: ": giao dịch tiền tệ giữa các quốc gia; thị trường lớn nhất thế giới" },
              { bold: "Thị trường hàng hóa", rest: ": vàng, dầu, nông sản; dùng để đầu cơ, phòng hộ rủi ro lạm phát và địa chính trị" },
              { bold: "Thị trường phái sinh", rest: ": hợp đồng dựa trên tài sản cơ sở; dùng để phòng hộ rủi ro hoặc đầu cơ với đòn bẩy" },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>
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
              src="/lessons/day19-thi-truong-tai-chinh.png"
              alt="Tóm tắt trực quan Day 19"
              width={1024}
              height={1536}
              className="w-full h-auto"
            />
          </div>
        </div>


        <div className="text-center space-y-2 py-4">
          <p className="text-stone-500 text-base">Giá thị trường là câu trả lời tạm thời cho câu hỏi giá trị vĩnh cửu.</p>
          <p className="text-stone-900 font-bold text-xl">Ngắn hạn là tâm lý, dài hạn là nền tảng. Nhà đầu tư giỏi biết khi nào cần bỏ qua cái trước để tận dụng cái sau.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
