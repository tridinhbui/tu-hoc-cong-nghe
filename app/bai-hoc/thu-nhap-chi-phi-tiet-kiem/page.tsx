"use client";

import Image from "next/image";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 3, day: 3, accent: "stone",
  title: "Thu nhập, chi phí, tiết kiệm và đầu tư.",
  subtitle: "Bốn khái niệm cơ bản này xây nên toàn bộ tài chính cá nhân. Hiểu đúng chúng là bước đầu tiên.",
  duration: "6 phút", difficulty: "Dễ", emoji: "·",
  nextSlug: "dong-tien", nextTitle: "Day 4: Dòng tiền là gì?",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Người A kiếm 30 triệu/tháng và tiết kiệm được 3 triệu. Người B kiếm 15 triệu và tiết kiệm được 4 triệu. Ai có nền tảng tài chính tốt hơn?",
    options: [
      "Người A vì thu nhập cao hơn",
      "Người B vì tiết kiệm nhiều hơn về tuyệt đối",
      "Người B vì tỷ lệ tiết kiệm cao hơn (27% so với 10%)",
      "Như nhau vì đều tiết kiệm được",
    ],
    correct: 2,
    explanation: "Tỷ lệ tiết kiệm quan trọng hơn số tuyệt đối. Người B tiết kiệm 27% thu nhập, Người A chỉ 10%. Về dài hạn, tỷ lệ này quyết định tốc độ xây dựng tài sản.",
  },
  {
    question: "Sự khác nhau giữa tiết kiệm và đầu tư là gì?",
    options: [
      "Tiết kiệm thì an toàn hơn, đầu tư thì không an toàn",
      "Tiết kiệm là giữ tiền không mất, đầu tư là dùng tiền tạo ra thêm tiền chấp nhận rủi ro",
      "Tiết kiệm chỉ dùng ngân hàng, đầu tư chỉ dùng chứng khoán",
      "Chúng giống nhau, chỉ khác tên gọi",
    ],
    correct: 1,
    explanation: "Tiết kiệm bảo toàn vốn, lãi suất thường thấp hơn lạm phát. Đầu tư chấp nhận rủi ro để đổi lấy lợi nhuận cao hơn, mục tiêu là tăng trưởng tài sản thực.",
  },
  {
    question: "Chi phí nào dưới đây là chi phí biến đổi?",
    options: [
      "Tiền thuê nhà hàng tháng",
      "Tiền mua sắm quần áo tùy nhu cầu",
      "Tiền vay ngân hàng trả góp cố định",
      "Học phí trả theo học kỳ",
    ],
    correct: 1,
    explanation: "Chi phí biến đổi thay đổi tùy theo hành vi và nhu cầu. Thuê nhà, trả góp là chi phí cố định. Mua sắm quần áo phụ thuộc vào quyết định của bạn mỗi tháng.",
  },
];

const CONCEPTS = [
  { vi: "Thu nhập", en: "Income", def: "Dòng tiền vào từ lao động, đầu tư hoặc kinh doanh trong một khoảng thời gian" },
  { vi: "Chi phí cố định", en: "Fixed Cost", def: "Chi phí không thay đổi theo mức độ hoạt động: thuê nhà, trả góp, bảo hiểm" },
  { vi: "Chi phí biến đổi", en: "Variable Cost", def: "Chi phí thay đổi tùy theo hành vi và nhu cầu: ăn uống ngoài, mua sắm, giải trí" },
  { vi: "Tỷ lệ tiết kiệm", en: "Savings Rate", def: "Phần trăm thu nhập được giữ lại; quan trọng hơn số tiền tuyệt đối tiết kiệm được" },
  { vi: "Đầu tư", en: "Investment", def: "Dùng tiền để mua tài sản kỳ vọng tạo ra lợi nhuận trong tương lai, chấp nhận rủi ro" },
];

const TAKEAWAYS = [
  "Tỷ lệ tiết kiệm quan trọng hơn số tiền tiết kiệm; 20% thu nhập 15 triệu tốt hơn 5% thu nhập 50 triệu.",
  "Phân biệt chi phí cố định và biến đổi giúp biết phần nào có thể cắt giảm khi cần.",
  "Tiết kiệm bảo toàn vốn; đầu tư tăng trưởng vốn qua rủi ro có tính toán.",
  "Không có thu nhập nào quá thấp để bắt đầu tiết kiệm, chỉ có thói quen chi tiêu chưa đúng.",
];

export default function ThuNhapChiPhiPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Bốn khái niệm thu nhập, chi phí, tiết kiệm và đầu tư tưởng như ai cũng biết. Nhưng phần lớn vấn đề tài chính cá nhân xuất phát từ việc hiểu sai hoặc không áp dụng đúng bốn khái niệm này.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Thu nhập: không chỉ là tiền lương</h3>
          <p>
            Thu nhập là tổng dòng tiền vào trong một khoảng thời gian, từ tất cả các nguồn. Nhiều người chỉ tính lương từ công việc chính, nhưng thu nhập có thể đến từ nhiều nguồn khác nhau:
          </p>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Thu nhập từ lao động", rest: ": lương, thưởng, thu nhập tự do (freelance)" },
              { bold: "Thu nhập từ đầu tư", rest: ": cổ tức, tiền thuê nhà, lãi trái phiếu" },
              { bold: "Thu nhập từ kinh doanh", rest: ": lợi nhuận từ doanh nghiệp hoặc bán sản phẩm" },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>
          <p>
            Người có nền tài chính vững chắc thường không chỉ phụ thuộc vào một nguồn thu nhập duy nhất. Khi thu nhập từ lao động bị gián đoạn, các nguồn khác vẫn tiếp tục chảy vào.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Chi phí: cố định và biến đổi</h3>
          <p>
            Không phải tất cả chi phí đều như nhau. Hiểu được sự khác biệt giữa <strong className="text-stone-900">chi phí cố định</strong> và <strong className="text-stone-900">chi phí biến đổi</strong> là bước đầu tiên để kiểm soát ngân sách.
          </p>
          <p>
            Chi phí cố định là những khoản phải trả mỗi tháng bất kể bạn làm gì: tiền thuê nhà, tiền trả góp vay ngân hàng, bảo hiểm, học phí. Chúng không thể cắt giảm ngay lập tức và thường chiếm phần lớn ngân sách.
          </p>
          <p>
            Chi phí biến đổi là những khoản thay đổi tùy theo hành vi: ăn uống ngoài hàng, mua sắm quần áo, giải trí, đi lại. Đây là phần bạn có thể kiểm soát nhanh nhất khi cần điều chỉnh ngân sách.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Tại sao phân biệt quan trọng</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Khi thu nhập giảm, bạn không thể ngừng trả tiền thuê nhà hay tiền vay ngân hàng ngay lập tức. Nhưng bạn có thể giảm ăn ngoài, tạm dừng mua sắm, cắt các dịch vụ giải trí. Biết rõ chi phí nào là cố định giúp bạn đánh giá được mức thu nhập tối thiểu cần có để duy trì cuộc sống, từ đó xây dựng quỹ dự phòng phù hợp.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Tiết kiệm: tỷ lệ quan trọng hơn con số</h3>
          <p>
            Nhiều người nghĩ rằng tiết kiệm ít vì thu nhập thấp. Nhưng thực tế cho thấy tỷ lệ tiết kiệm quan trọng hơn số tiền tuyệt đối.
          </p>
          <p>
            Một người tiết kiệm được 4 triệu đồng mỗi tháng từ thu nhập 15 triệu, tức tỷ lệ tiết kiệm 27%, sẽ xây dựng tài sản nhanh hơn người tiết kiệm 3 triệu từ thu nhập 30 triệu, tỷ lệ chỉ 10%. Sau 10 năm, với lãi kép, sự chênh lệch về tỷ lệ đó tạo ra khoảng cách tài sản rất lớn.
          </p>
          <p>
            Quy tắc phổ biến nhất là <strong className="text-stone-900">50/30/20</strong>: dành 50% thu nhập cho nhu cầu thiết yếu, 30% cho những thứ muốn có, và 20% cho tiết kiệm và đầu tư. Đây không phải quy tắc tuyệt đối, nhưng là điểm khởi đầu tốt để kiểm tra xem mình đang phân bổ ngân sách hợp lý chưa.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Tiết kiệm khác đầu tư như thế nào</h3>
          <p>
            Tiết kiệm và đầu tư thường bị dùng lẫn lộn, nhưng bản chất khác nhau hoàn toàn.
          </p>
          <p>
            <strong className="text-stone-900">Tiết kiệm</strong> là giữ lại tiền không tiêu hết, thường ở các hình thức an toàn như tài khoản tiết kiệm hoặc tiền gửi ngân hàng. Mục tiêu là bảo toàn vốn và giữ tính thanh khoản. Lãi suất tiết kiệm thường thấp, đôi khi thấp hơn cả lạm phát.
          </p>
          <p>
            <strong className="text-stone-900">Đầu tư</strong> là dùng tiền để mua tài sản kỳ vọng tạo ra lợi nhuận cao hơn trong tương lai: cổ phiếu, trái phiếu, bất động sản, quỹ đầu tư. Đầu tư chấp nhận rủi ro để đổi lấy khả năng tăng trưởng thực sự, tức là vượt lạm phát và tăng giá trị tài sản theo thời gian.
          </p>
          <p>
            Về mặt thực hành, hai việc này bổ sung cho nhau. Tiết kiệm trước để có quỹ dự phòng và tính thanh khoản. Sau đó dùng phần còn lại để đầu tư dài hạn.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Vòng tròn cơ bản của tài chính cá nhân</h3>
          <p>
            Bốn khái niệm này tạo thành một vòng tròn: thu nhập vào, chi phí ra, phần còn lại là tiết kiệm, và tiết kiệm được đưa vào đầu tư để tạo ra thu nhập thụ động trong tương lai.
          </p>
          <p>
            Vấn đề của hầu hết mọi người không phải là thu nhập quá thấp, mà là chi phí tăng theo tỷ lệ với thu nhập. Khi lương tăng, chi tiêu cũng tăng, tỷ lệ tiết kiệm không thay đổi. Đây gọi là <strong className="text-stone-900">lifestyle inflation</strong>, và đây là lý do nhiều người có thu nhập cao nhưng không tích lũy được tài sản.
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
              src="/lessons/day3-thu-nhap-chi-phi-tiet-kiem.png"
              alt="Tóm tắt trực quan Day 3"
              width={1024}
              height={1536}
              className="w-full h-auto"
            />
          </div>
        </div>


        <div className="text-center space-y-2 py-4">
          <p className="text-stone-500 text-base">Không có thu nhập nào quá thấp để bắt đầu.</p>
          <p className="text-stone-900 font-bold text-xl">Vấn đề không phải kiếm bao nhiêu, mà là giữ được bao nhiêu phần trăm trong số đó.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
