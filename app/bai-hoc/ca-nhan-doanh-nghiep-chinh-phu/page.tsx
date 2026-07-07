"use client";

import Image from "next/image";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 17, day: 17, accent: "stone",
  title: "Tài chính cá nhân, doanh nghiệp và chính phủ.",
  subtitle: "Ba cấp độ tài chính vận hành theo nguyên lý giống nhau nhưng có công cụ và ràng buộc khác nhau. Hiểu sự khác biệt giúp bạn đọc tin tức kinh tế có chiều sâu hơn.",
  duration: "6 phút", difficulty: "Dễ", emoji: "·",
  nextSlug: "he-thong-tai-chinh", nextTitle: "Day 18: Hệ thống tài chính",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Tại sao chính phủ có thể chi tiêu vượt thu nhập trong thời gian dài trong khi cá nhân thì không?",
    options: [
      "Vì chính phủ không cần trả nợ",
      "Vì chính phủ có thể phát hành trái phiếu, có thẩm quyền thu thuế, và trong trường hợp cực đoan có thể in tiền để trả nợ bằng đồng nội tệ",
      "Vì ngân hàng thế giới cho chính phủ vay miễn phí",
      "Vì chính phủ không cần lo về lạm phát",
    ],
    correct: 1,
    explanation: "Chính phủ có công cụ mà cá nhân không có: quyền thu thuế (nguồn thu ổn định), phát hành trái phiếu (vay từ công chúng và nước ngoài), và trong trường hợp cực đoan là ngân hàng trung ương có thể mua trái phiếu (in tiền). Nhưng mỗi công cụ đều có giới hạn và hệ quả.",
  },
  {
    question: "Chỉ số P/E (Price-to-Earnings) trong định giá doanh nghiệp tương đương với điều gì trong tài chính cá nhân?",
    options: [
      "Tỷ lệ tiết kiệm",
      "Số năm cần thiết để hoàn vốn đầu tư từ lợi nhuận; tương tự thời gian hoàn vốn của một quyết định tài chính cá nhân",
      "Tỷ lệ nợ trên thu nhập",
      "Lãi suất ngân hàng",
    ],
    correct: 1,
    explanation: "P/E = Giá / Lợi nhuận trên cổ phiếu. P/E 20 có nghĩa là mất 20 năm lợi nhuận để hoàn vốn nếu lợi nhuận không đổi. Cá nhân cũng tính thời gian hoàn vốn khi mua thiết bị hoặc bất động sản cho thuê.",
  },
  {
    question: "Nợ công (public debt) tăng cao ảnh hưởng đến nền kinh tế như thế nào?",
    options: [
      "Không ảnh hưởng gì vì chính phủ luôn trả được",
      "Có thể làm tăng lãi suất, chèn lấn đầu tư tư nhân, và nếu vượt ngưỡng bền vững thì làm giảm niềm tin vào đồng tiền",
      "Chỉ ảnh hưởng đến thế hệ tương lai, không ảnh hưởng hiện tại",
      "Tốt vì chính phủ đang đầu tư nhiều hơn",
    ],
    correct: 1,
    explanation: "Nợ công cao: chính phủ cần huy động vốn nhiều, đẩy lãi suất tăng. Lãi suất cao chèn lấn đầu tư tư nhân (doanh nghiệp vay đắt hơn). Nếu nhà đầu tư nghi ngờ khả năng trả nợ, đồng tiền mất giá và chi phí vay tăng vọt.",
  },
];

const CONCEPTS = [
  { vi: "Thu chi chính phủ", en: "Fiscal Policy", def: "Chính sách ngân sách nhà nước: mức thu thuế và mức chi tiêu công; công cụ điều tiết kinh tế vĩ mô" },
  { vi: "Nợ công", en: "Public Debt", def: "Tổng nghĩa vụ nợ của chính phủ; thường đo bằng % GDP để so sánh giữa các quốc gia" },
  { vi: "Báo cáo tài chính doanh nghiệp", en: "Financial Statements", def: "Bộ ba: bảng cân đối kế toán (tài sản/nợ/vốn), báo cáo kết quả kinh doanh (doanh thu/chi phí/lợi nhuận), báo cáo dòng tiền" },
  { vi: "GDP", en: "Gross Domestic Product", def: "Tổng giá trị hàng hóa và dịch vụ sản xuất trong một nền kinh tế trong một kỳ; thước đo quy mô kinh tế" },
];

const TAKEAWAYS = [
  "Ba cấp độ tài chính cùng nguyên lý: thu, chi, tiết kiệm, đầu tư, nợ, nhưng công cụ và ràng buộc khác nhau.",
  "Doanh nghiệp tối ưu lợi nhuận và dòng tiền; chính phủ cân bằng giữa kích thích kinh tế và bền vững tài chính.",
  "Nợ công cao không phải tự động xấu; quan trọng là dùng để làm gì và khả năng phục vụ nợ từ GDP tương lai.",
  "Hiểu tài chính doanh nghiệp và chính phủ giúp đọc tin tức kinh tế có chiều sâu hơn và đưa ra quyết định đầu tư tốt hơn.",
];

export default function CaNhanDoanNghiepChinhPhuPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Những khái niệm tài chính bạn đã học, từ dòng tiền, nợ, đến lãi suất và đòn bẩy, đều tồn tại ở ba cấp độ khác nhau: cá nhân, doanh nghiệp, và chính phủ. Nguyên lý giống nhau, nhưng quy mô, công cụ và ràng buộc khác nhau đáng kể.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Tài chính cá nhân: nền tảng đơn giản nhất</h3>
          <p>
            Tài chính cá nhân vận hành theo logic đơn giản nhất: thu nhập trừ chi tiêu bằng tiết kiệm. Tiết kiệm được đầu tư, đầu tư tạo ra thu nhập thụ động, và vòng lặp đó tích lũy theo thời gian.
          </p>
          <p>
            Ràng buộc của cá nhân là ngặt nghèo nhất: không thể in tiền, không thể ép người khác trả thuế cho mình, và nếu không trả được nợ thì bị xiết tài sản hoặc phá sản cá nhân. Đây là lý do quản lý tài chính cá nhân đòi hỏi kỷ luật thực sự.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Tài chính doanh nghiệp: phức tạp hơn nhưng cùng nguyên lý</h3>
          <p>
            Doanh nghiệp có thêm một lớp phức tạp: cần huy động vốn từ cổ đông và chủ nợ, quản lý vốn lưu động, tối ưu cấu trúc vốn, và báo cáo cho nhiều bên liên quan.
          </p>
          <p>
            Bộ ba báo cáo tài chính của doanh nghiệp là công cụ đo lường sức khỏe tương tự bạn đo tài chính cá nhân:
          </p>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Bảng cân đối kế toán", rest: ": tài sản = nợ + vốn chủ sở hữu (giống bảng thu chi cá nhân)" },
              { bold: "Báo cáo kết quả kinh doanh", rest: ": doanh thu - chi phí = lợi nhuận (giống thu nhập - chi tiêu = tiết kiệm)" },
              { bold: "Báo cáo dòng tiền", rest: ": tiền vào/ra thực tế, quan trọng hơn lợi nhuận kế toán" },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Tài chính chính phủ: quy mô và công cụ đặc biệt</h3>
          <p>
            Chính phủ hoạt động theo logic khác: mục tiêu không phải tối đa hóa lợi nhuận mà là ổn định kinh tế, tăng trưởng, và phân phối lợi ích xã hội.
          </p>
          <p>
            Chính phủ có ba công cụ đặc biệt mà cá nhân và doanh nghiệp không có. Thứ nhất, quyền thu thuế, tức là thu nhập bắt buộc từ toàn bộ nền kinh tế. Thứ hai, phát hành trái phiếu chính phủ, tức là vay từ trong nước và quốc tế với lãi suất thấp hơn vì được coi là rủi ro thấp nhất. Thứ ba, trong trường hợp cực đoan, thông qua ngân hàng trung ương để tiếp cận nguồn tiền cuối cùng.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Nợ công và bền vững tài chính</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Nợ công đo bằng % GDP cho phép so sánh giữa các quốc gia. Nhật Bản có nợ công 260% GDP nhưng vẫn ổn định vì hầu hết là nợ trong nước và bằng đồng nội tệ. Hy Lạp năm 2010 có nợ 130% GDP bằng đồng Euro (không thể in), dẫn đến khủng hoảng. Chất lượng nợ quan trọng hơn số lượng.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Tại sao hiểu ba cấp độ này quan trọng</h3>
          <p>
            Khi đọc tin tức kinh tế, bạn thường thấy: ngân hàng trung ương tăng lãi suất, chính phủ tăng thâm hụt ngân sách, doanh nghiệp báo cáo lợi nhuận. Nếu chỉ hiểu tài chính cá nhân, những tin tức này không có nhiều ý nghĩa.
          </p>
          <p>
            Nhưng khi hiểu ba cấp độ, bạn thấy mối liên hệ: lãi suất tăng làm chi phí vay của chính phủ tăng, thâm hụt ngân sách cao hơn. Thâm hụt tăng, chính phủ phát hành nhiều trái phiếu hơn, đẩy lãi suất tăng thêm. Lãi suất cao làm chi phí vốn của doanh nghiệp tăng, lợi nhuận giảm. Tất cả đều liên kết với nhau.
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
              src="/lessons/day17-ca-nhan-doanh-nghiep-chinh-phu.png"
              alt="Tóm tắt trực quan Day 17"
              width={1024}
              height={1536}
              className="w-full h-auto"
            />
          </div>
        </div>


        <div className="text-center space-y-2 py-4">
          <p className="text-stone-500 text-base">Mọi tin tức kinh tế đều là tài chính ở một quy mô khác.</p>
          <p className="text-stone-900 font-bold text-xl">Khi bạn hiểu nguyên lý cơ bản, tin tức vĩ mô trở thành thông tin hữu ích thay vì tiếng ồn.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
