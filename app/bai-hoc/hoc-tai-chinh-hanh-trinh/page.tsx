"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 50, day: 79, accent: "stone",
  title: "3 Điều Nản Khi Học Tài Chính",
  subtitle: "Và vì sao vẫn nên tiếp tục",
  duration: "4 phút", difficulty: "Dễ", emoji: "·",
  nextSlug: "wealth-management", nextTitle: "Wealth Management là gì?",
};

const quiz: QuizQuestion[] = [
  {
    question: "Khi học tài chính, mình hay cảm thấy \"hiểu nhưng không dùng được\". Lý do phổ biến nhất là gì?",
    options: [
      "Không đủ thông minh",
      "Thiếu thực hành - chỉ đọc lý thuyết mà chưa áp dụng vào số thật",
      "Ngành tài chính quá bí mật",
      "Không cần học thực tế",
    ],
    correct: 1,
    explanation: "Hiểu khái niệm và áp dụng được là hai kỹ năng khác nhau. DCF nghe quen thuộc, nhưng ngồi xuống mở báo cáo thật và thử tính - rất khác. Thực hành với số liệu thật mới chuyển kiến thức thành phản xạ.",
  },
  {
    question: "\"Học xong rồi quên\" thường xảy ra vì điều gì?",
    options: [
      "Kiến thức tài chính không thực dụng",
      "Không ôn lại và không kết nối với tình huống thực tế",
      "Học quá nhanh là tốt nhất",
      "Chỉ cần đọc một lần là nhớ mãi",
    ],
    correct: 1,
    explanation: "Không có gì đặc biệt về bộ nhớ - kiến thức chỉ giữ lại khi được kết nối với tình huống, ôn lại đúng lúc, và áp dụng vào bối cảnh cụ thể. Đọc báo tài chính hàng ngày và cố nhận ra các khái niệm đã học là cách hiệu quả nhất.",
  },
  {
    question: "Cảm giác \"biết nhiều thứ nhưng không biết mình đang ở đâu\" trong hành trình học tài chính có nghĩa là gì?",
    options: [
      "Nên dừng lại",
      "Thiếu một cái khung tổng thể để hiểu mình đang học phần nào của bức tranh lớn",
      "Học quá nhiều là sai",
      "Tài chính không phù hợp với mình",
    ],
    correct: 1,
    explanation: "Cảm giác \"biết nhưng không biết mình đang ở đâu\" là triệu chứng của việc học từng mảnh riêng lẻ mà thiếu cái map tổng. Khi có framework - biết macro kết nối với ngành, ngành kết nối với doanh nghiệp, doanh nghiệp kết nối với valuation - từng mảnh sẽ có chỗ đứng rõ hơn.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">3 Điều Nản Khi Học Tài Chính</h2>
      <p className="text-stone-500 text-sm mb-8">Phản chiếu sau 79 ngày - học gì, mắc đâu, và điều gì thực sự giúp ích</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Dừng lại để nhìn lại</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Sau 79 ngày học tài chính, có những thứ mình đã hiểu hơn. Nhưng cũng có những thứ vẫn cứ mắc. Và có lẽ, phần hay nhất của việc học là nhận ra mình đang mắc ở đâu.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Dưới đây là 3 điều nản hay gặp nhất trong hành trình học tài chính - không chỉ của một người, mà rất nhiều người cùng trải qua.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-6 uppercase tracking-wide text-xs">3 điều nản hay gặp</h3>

        <div className="space-y-8">
          <div>
            <div className="text-xs font-mono text-stone-300 mb-1">01</div>
            <h4 className="font-bold text-stone-800 dark:text-stone-200 mb-3 text-base">Hiểu nhưng không dùng được</h4>
            <p className="text-stone-600 text-sm leading-relaxed mb-3">
              Đọc xong bài về DCF, cảm giác hiểu. Nhưng ngồi xuống mở báo cáo tài chính thật và thử tính - hoàn toàn khác. Biết công thức là một chuyện. Biết số nào lấy từ đâu, tại sao lại dùng con số này chứ không phải con số kia - là chuyện khác.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              <strong>Thực hành mới chuyển kiến thức thành phản xạ.</strong> Đọc lý thuyết là cần thiết, nhưng chưa đủ. Phải thử áp dụng với số thật thì mới thấy mình thực sự hiểu hay chưa.
            </p>
          </div>

          <div>
            <div className="text-xs font-mono text-stone-300 mb-1">02</div>
            <h4 className="font-bold text-stone-800 dark:text-stone-200 mb-3 text-base">Học xong rồi quên</h4>
            <p className="text-stone-600 text-sm leading-relaxed mb-3">
              Tuần trước đọc bài về working capital, tuần này hỏi lại thì mờ dần. Điều này không phải vì bộ nhớ kém - mà vì kiến thức chưa được kết nối với bối cảnh cụ thể nào.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Cách đơn giản nhất là đọc tin tức kinh tế hàng ngày và cố nhận ra: "Ồ đây là working capital cycle, là concentration risk, là operating leverage..." Khi thấy khái niệm xuất hiện trong thực tế, nó sẽ ở lại lâu hơn.
            </p>
          </div>

          <div>
            <div className="text-xs font-mono text-stone-300 mb-1">03</div>
            <h4 className="font-bold text-stone-800 dark:text-stone-200 mb-3 text-base">Biết nhiều thứ nhưng không biết đang ở đâu</h4>
            <p className="text-stone-600 text-sm leading-relaxed mb-3">
              Học xong macro, học xong phân tích ngành, học xong đọc báo cáo tài chính - nhưng không biết ba phần đó nối với nhau thế nào. Cảm giác như có nhiều mảnh ghép nhưng chưa có bức tranh tổng.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Khi có framework tổng - <strong>macro → ngành → doanh nghiệp → valuation</strong> - từng phần nhỏ sẽ có chỗ đứng rõ hơn. Biết mình đang ở phần nào của bức tranh giúp việc học bớt bơ vơ.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Vì sao vẫn nên tiếp tục?</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Tài chính không phải là môn học xong là xong. Nó là cách nhìn thế giới. Cách nhìn đó được xây dựng từ từ - từng bài, từng con số, từng lần mắc lỗi.
        </p>
        <div className="space-y-2 text-sm text-stone-600">
          <div> - Không cần hiểu tất cả ngay, chỉ cần hiểu đúng và nhớ được</div>
          <div> - Mỗi lần đọc tin kinh tế, cố nhận ra một khái niệm đã học</div>
          <div> - Áp dụng vào doanh nghiệp cụ thể sẽ giúp nhớ lâu hơn</div>
          <div> - Sai và nhận ra sai là một phần của quá trình học</div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
