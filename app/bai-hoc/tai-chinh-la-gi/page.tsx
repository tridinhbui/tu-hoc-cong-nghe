"use client";

import Image from "next/image";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 1, day: 1, accent: "stone",
  title: "Tài chính là gì? Vì sao tài chính không chỉ là tiền.",
  subtitle: "Tài chính là cách ra quyết định về nguồn lực có giới hạn trong điều kiện có thời gian, rủi ro và lựa chọn thay thế.",
  duration: "6 phút", difficulty: "Dễ", emoji: "·",
  nextSlug: "tien-la-gi", nextTitle: "Day 2: Tiền là gì?",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Tài chính khác kế toán ở điểm nào cơ bản nhất?",
    options: [
      "Tài chính chỉ dùng trong ngân hàng, kế toán dùng ở mọi nơi",
      "Kế toán ghi lại quá khứ, tài chính hướng đến tương lai và ra quyết định",
      "Tài chính dễ hơn kế toán",
      "Kế toán cần phần mềm, tài chính không cần",
    ],
    correct: 1,
    explanation: "Kế toán ghi chép chính xác những gì đã xảy ra. Tài chính dùng dữ liệu đó để ra quyết định về tương lai: đầu tư gì, vay bao nhiêu, phân bổ vốn ra sao.",
  },
  {
    question: "Vì sao tài chính không chỉ là tiền?",
    options: [
      "Vì tài chính bao gồm cả bất động sản",
      "Vì tài chính liên quan đến thời gian, rủi ro và cơ hội bị bỏ lỡ, không chỉ số tiền",
      "Vì tài chính còn bao gồm kỹ năng giao tiếp",
      "Vì tiền chỉ là một phần nhỏ của kinh tế",
    ],
    correct: 1,
    explanation: "Tài chính xoay quanh 3 trục: giá trị theo thời gian, mức độ rủi ro, và chi phí cơ hội. Tiền chỉ là đơn vị đo, không phải toàn bộ câu chuyện.",
  },
  {
    question: "Chi phí cơ hội là gì?",
    options: [
      "Tiền phí mở cơ hội kinh doanh mới",
      "Giá trị của lựa chọn tốt nhất bạn từ bỏ khi chọn phương án hiện tại",
      "Chi phí phát sinh khi thị trường cơ hội biến động",
      "Thuế đánh lên lợi nhuận đầu tư",
    ],
    correct: 1,
    explanation: "Nếu bạn dùng 100 triệu mua xe, chi phí cơ hội là số tiền bạn có thể kiếm được nếu đem 100 triệu đó đầu tư. Mọi quyết định đều có chi phí cơ hội.",
  },
];

const CONCEPTS = [
  {
    vi: "Tài chính",
    en: "Finance",
    def: "Khoa học ra quyết định phân bổ nguồn lực có giới hạn theo thời gian và trong điều kiện bất định",
  },
  {
    vi: "Chi phí cơ hội",
    en: "Opportunity Cost",
    def: "Giá trị của lựa chọn tốt nhất bị từ bỏ khi chọn một phương án",
  },
  {
    vi: "Rủi ro",
    en: "Risk",
    def: "Khả năng kết quả thực tế khác với kết quả kỳ vọng; đi kèm với mọi quyết định tài chính",
  },
  {
    vi: "Dòng tiền",
    en: "Cash Flow",
    def: "Tiền thực tế vào và ra trong một khoảng thời gian; khác với lợi nhuận kế toán",
  },
  {
    vi: "Giá trị thời gian của tiền",
    en: "Time Value of Money",
    def: "Cùng một số tiền có giá trị khác nhau ở các thời điểm khác nhau do khả năng đầu tư sinh lời",
  },
];

const TAKEAWAYS = [
  "Tài chính không chỉ hỏi \"có bao nhiêu tiền\" mà hỏi \"nên dùng tiền đó như thế nào, khi nào, với rủi ro gì\".",
  "Mọi quyết định tài chính đều có chi phí cơ hội: chọn cái này là từ bỏ cái khác.",
  "Kế toán ghi lại quá khứ; tài chính dùng quá khứ để ra quyết định cho tương lai.",
  "Thu nhập cao không tự động nghĩa là tài chính tốt; quản lý dòng tiền, rủi ro và phân bổ mới là cốt lõi.",
];

export default function TaiChinhLaGiPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        {/* Mở đầu */}
        <p className="text-xl leading-relaxed">
          Khi mới bắt đầu học tài chính, nhiều người thường nghĩ đây đơn giản là chuyện tiền bạc: kiếm tiền, tiết kiệm, đầu tư hoặc quản lý chi tiêu. Cách hiểu này không sai, nhưng chưa đủ.
        </p>

        <p>
          Tài chính, ở mức nền tảng, là cách con người, doanh nghiệp và tổ chức <strong className="text-stone-900">ra quyết định với nguồn lực có giới hạn theo thời gian và rủi ro</strong>.
        </p>

        {/* Section 1 */}
        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Tài chính không chỉ hỏi: mình có bao nhiêu tiền?</h3>
          <p>
            Tài chính còn hỏi những câu phức tạp hơn nhiều:
          </p>
          <ul className="space-y-3 pl-1">
            {[
              "Số tiền đó đến từ đâu?",
              "Nên dùng vào việc gì?",
              "Dùng hôm nay hay để dành cho tương lai?",
              "Nếu đầu tư thì rủi ro là gì?",
              "Nếu vay nợ thì có đủ khả năng trả không?",
              "Một tài sản hôm nay đáng giá bao nhiêu so với dòng tiền nó tạo ra sau này?",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p>
            Đây là những câu hỏi mà tiền mặt trong tay không tự trả lời được. Muốn trả lời chúng, cần tư duy tài chính.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Ví dụ: 10 tỷ đồng và vô số lựa chọn</h3>
          <p>
            Một doanh nghiệp có 10 tỷ đồng tiền mặt. Giữ tiền trong tài khoản là một lựa chọn. Dùng tiền để mở thêm cửa hàng là một lựa chọn khác. Trả nợ, mua máy móc, tuyển nhân sự, hoặc đầu tư vào sản phẩm mới cũng đều là lựa chọn tài chính.
          </p>
          <p>
            Điểm quan trọng là mỗi lựa chọn đều có <strong className="text-stone-900">chi phí cơ hội</strong>. Nếu dùng tiền để mở rộng, doanh nghiệp có thể tăng trưởng nhanh hơn, nhưng cũng chịu rủi ro cao hơn. Nếu giữ tiền mặt, doanh nghiệp an toàn hơn, nhưng có thể bỏ lỡ cơ hội sinh lời.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Chi phí cơ hội</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Chi phí cơ hội là giá trị của <strong className="text-stone-900">lựa chọn tốt nhất bị từ bỏ</strong> khi bạn chọn một phương án. Nếu bạn dùng 100 triệu đồng mua xe, chi phí cơ hội là số tiền bạn có thể kiếm được nếu đem 100 triệu đó đầu tư với mức lãi suất thị trường. Mọi quyết định đều có chi phí cơ hội, dù mình không nhìn thấy nó trên hóa đơn.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Bốn trụ cột của tư duy tài chính</h3>
          <p>
            Vì vậy, tài chính không chỉ là "có tiền hay không". Tài chính là cách đánh giá bốn yếu tố sau để đưa ra quyết định hợp lý hơn:
          </p>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Dòng tiền", rest: ": tiền thực tế vào và ra, không phải số trên giấy tờ kế toán" },
              { bold: "Thời gian", rest: ": cùng một số tiền có giá trị khác nhau ở các thời điểm khác nhau" },
              { bold: "Rủi ro", rest: ": mọi quyết định đều có khả năng kết quả thực tế khác kỳ vọng" },
              { bold: "Chi phí cơ hội", rest: ": lựa chọn cái này là từ bỏ cái khác tốt nhất" },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Tài chính cá nhân và tài chính doanh nghiệp: cùng một logic</h3>
          <p>
            Trong đời sống cá nhân cũng vậy. Một người có thu nhập cao chưa chắc có nền tài chính tốt nếu chi tiêu vượt quá khả năng, vay nợ quá nhiều hoặc không có khoản dự phòng. Ngược lại, một người thu nhập vừa phải nhưng quản lý dòng tiền tốt, biết tiết kiệm, đầu tư và kiểm soát rủi ro có thể có nền tài chính lành mạnh hơn rất nhiều.
          </p>
          <p>
            Từ tài chính cá nhân đến tài chính doanh nghiệp, logic cốt lõi vẫn giống nhau: <strong className="text-stone-900">nguồn lực luôn có giới hạn, còn nhu cầu sử dụng tiền thì gần như vô hạn</strong>. Tài chính giúp trả lời câu hỏi nên phân bổ nguồn lực đó như thế nào.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-stone-200 rounded-2xl p-6 space-y-3">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Cá nhân</p>
              <p className="text-base text-stone-600 leading-relaxed">
                Thu nhập hàng tháng là nguồn lực có giới hạn. Quyết định chi tiêu hôm nay, tiết kiệm hay đầu tư, vay thêm hay trả nợ đều là quyết định tài chính.
              </p>
            </div>
            <div className="border border-stone-200 rounded-2xl p-6 space-y-3">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Doanh nghiệp</p>
              <p className="text-base text-stone-600 leading-relaxed">
                Vốn của doanh nghiệp là nguồn lực có giới hạn. Quyết định đầu tư vào đâu, huy động vốn thế nào, trả cổ tức hay tái đầu tư đều là tài chính doanh nghiệp.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Tài chính khác kế toán như thế nào?</h3>
          <p>
            Kế toán và tài chính thường bị nhầm lẫn, nhưng bản chất rất khác nhau.
          </p>
          <p>
            <strong className="text-stone-900">Kế toán</strong> ghi lại những gì đã xảy ra: bán bao nhiêu, chi bao nhiêu, lãi lỗ như thế nào. Đây là nhìn về quá khứ.
          </p>
          <p>
            <strong className="text-stone-900">Tài chính</strong> dùng dữ liệu đó để đặt câu hỏi về tương lai: năm tới nên đầu tư không, vay thêm có hợp lý không, dự án này có tạo ra giá trị không? Đây là nhìn về tương lai.
          </p>
          <p>
            Một doanh nghiệp cần cả hai. Kế toán tốt cung cấp dữ liệu chính xác. Tư duy tài chính tốt dùng dữ liệu đó để ra quyết định đúng.
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
              src="/lessons/day1-tai-chinh-la-gi.png"
              alt="Tóm tắt trực quan: Tài chính là gì? Vì sao tài chính không chỉ là tiền."
              width={1024}
              height={1536}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Closing */}
        <div className="text-center space-y-2 py-4">
          <p className="text-stone-500 text-base">Tiền là đối tượng của tài chính.</p>
          <p className="text-stone-900 font-bold text-xl">Nhưng tài chính là cách ra quyết định về tiền trong điều kiện có thời gian, rủi ro và lựa chọn thay thế.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
