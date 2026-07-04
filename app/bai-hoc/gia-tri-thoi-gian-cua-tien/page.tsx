"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 10, day: 10, accent: "stone",
  title: "Giá trị thời gian của tiền.",
  subtitle: "Một đồng hôm nay đáng giá hơn một đồng ngày mai. Đây là nguyên lý nền tảng của mọi quyết định tài chính, từ cá nhân đến doanh nghiệp.",
  duration: "7 phút", difficulty: "Trung bình", emoji: "·",
  nextSlug: "rui-ro-la-gi", nextTitle: "Day 11: Rủi ro là gì?",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Bạn có hai lựa chọn: nhận 100 triệu hôm nay hoặc 110 triệu sau 1 năm. Lãi suất an toàn thị trường là 8%/năm. Bạn nên chọn gì?",
    options: [
      "Đợi lấy 110 triệu vì nhiều hơn",
      "Lấy 100 triệu hôm nay vì 100 triệu x (1 + 8%) = 108 triệu sau 1 năm, ít hơn 110 triệu",
      "Lấy 100 triệu hôm nay vì không chắc tương lai",
      "Đợi lấy 110 triệu vì lãi suất cao hơn 8%",
    ],
    correct: 3,
    explanation: "100 triệu hôm nay đầu tư 8% = 108 triệu sau 1 năm. Nhưng lựa chọn kia cho 110 triệu, tương đương lãi 10%. Vì 10% > 8% (lãi suất thị trường), bạn nên đợi lấy 110 triệu.",
  },
  {
    question: "Discounted Cash Flow (DCF) dùng để làm gì?",
    options: [
      "Tính lãi suất ngân hàng tốt nhất",
      "Quy dòng tiền tương lai về giá trị hiện tại để so sánh và định giá tài sản",
      "Tính chiết khấu khi mua hàng trả góp",
      "Đo tốc độ lạm phát của nền kinh tế",
    ],
    correct: 1,
    explanation: "DCF quy các dòng tiền trong tương lai về hiện tại bằng cách chia cho (1 + discount rate)^n. Dùng rộng rãi để định giá cổ phiếu, dự án đầu tư, và mọi tài sản tạo ra dòng tiền.",
  },
  {
    question: "Tại sao lãi suất cao hơn làm giảm giá trị hiện tại của dòng tiền tương lai?",
    options: [
      "Vì lạm phát tăng theo lãi suất",
      "Vì khi lãi suất cao, tiền hôm nay có thể tăng nhanh hơn, nên tiền tương lai kém hấp dẫn hơn so với giữ tiền hiện tại",
      "Vì ngân hàng tính phí cao hơn",
      "Vì rủi ro tăng theo lãi suất",
    ],
    correct: 1,
    explanation: "Lãi suất cao = cơ hội đầu tư ngay hiện tại tốt hơn. Vì vậy, tiền trong tương lai phải được chiết khấu mạnh hơn để so sánh công bằng với tiền hôm nay có thể tăng trưởng nhanh.",
  },
];

const CONCEPTS = [
  { vi: "Giá trị hiện tại", en: "Present Value (PV)", def: "Giá trị hôm nay của một khoản tiền sẽ nhận trong tương lai, sau khi chiết khấu theo lãi suất" },
  { vi: "Giá trị tương lai", en: "Future Value (FV)", def: "Giá trị của khoản tiền hiện tại sau khi tăng trưởng theo lãi suất trong một khoảng thời gian" },
  { vi: "Tỷ suất chiết khấu", en: "Discount Rate", def: "Lãi suất dùng để quy dòng tiền tương lai về hiện tại; phản ánh chi phí cơ hội và rủi ro" },
  { vi: "Dòng tiền chiết khấu", en: "Discounted Cash Flow (DCF)", def: "Phương pháp định giá tài sản bằng cách tính tổng giá trị hiện tại của tất cả dòng tiền trong tương lai" },
  { vi: "Chi phí cơ hội", en: "Opportunity Cost", def: "Giá trị của lựa chọn tốt nhất bị bỏ qua khi chọn một phương án; lý do tiền hôm nay đáng hơn tiền mai" },
];

const TAKEAWAYS = [
  "Tiền hôm nay đáng giá hơn tiền ngày mai vì có thể đầu tư và sinh lời ngay.",
  "Giá trị hiện tại (PV) quy khoản tiền tương lai về hôm nay để so sánh: PV = FV / (1 + r)^n.",
  "Lãi suất càng cao hoặc thời gian càng dài, tiền tương lai càng ít giá trị so với hôm nay.",
  "DCF là công cụ định giá cơ bản: giá trị của mọi tài sản là tổng hiện giá của dòng tiền nó tạo ra.",
];

export default function GiaTriThoiGianCuaTienPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Tại sao một đồng hôm nay lại đáng giá hơn một đồng nhận được một năm sau? Câu trả lời không phải chỉ là lạm phát, mà là một nguyên lý sâu hơn: tiền có thể tạo ra tiền, và thời gian là điều kiện để điều đó xảy ra.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Nguyên lý giá trị thời gian của tiền</h3>
          <p>
            <strong className="text-stone-900">Giá trị thời gian của tiền</strong> (Time Value of Money) là nguyên lý nền tảng nhất trong tài chính: một khoản tiền hôm nay đáng giá hơn cùng số tiền đó trong tương lai, vì tiền hôm nay có thể được đầu tư và tạo ra lợi nhuận.
          </p>
          <p>
            Nếu bạn có 100 triệu đồng và lãi suất an toàn là 8% mỗi năm, sau một năm bạn có thể có 108 triệu. Điều đó nghĩa là nhận 100 triệu hôm nay tương đương với nhận 108 triệu sau một năm. Hay nói ngược lại: 108 triệu sau một năm chỉ tương đương 100 triệu hôm nay.
          </p>
          <p>
            Đây không phải quan điểm mà là thực tế tài chính. Mọi quyết định đầu tư, mọi bài toán vay trả góp, mọi định giá doanh nghiệp đều xây dựng trên nguyên lý này.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Giá trị hiện tại và giá trị tương lai</h3>
          <p>
            Hai khái niệm cơ bản trong giá trị thời gian của tiền là giá trị hiện tại và giá trị tương lai.
          </p>
          <p>
            <strong className="text-stone-900">Giá trị tương lai (FV)</strong> trả lời câu hỏi: nếu tôi có X tiền hôm nay và đầu tư với lãi r trong n năm, tôi sẽ có bao nhiêu?
          </p>
          <p>
            Công thức: <strong className="text-stone-900">FV = PV x (1 + r)^n</strong>
          </p>
          <p>
            <strong className="text-stone-900">Giá trị hiện tại (PV)</strong> trả lời câu ngược lại: nếu tôi sẽ nhận X tiền sau n năm, khoản đó đáng giá bao nhiêu hôm nay?
          </p>
          <p>
            Công thức: <strong className="text-stone-900">PV = FV / (1 + r)^n</strong>
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-4">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Ví dụ so sánh hai lựa chọn</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Bạn nhận tiền bồi thường và có hai lựa chọn: 500 triệu ngay hôm nay, hoặc 600 triệu sau 2 năm. Lãi suất thị trường 8%/năm.
              <br /><br />
              PV của 600 triệu sau 2 năm = 600 / (1.08)^2 = 600 / 1.166 = khoảng 514 triệu.
              <br /><br />
              Vì 514 triệu lớn hơn 500 triệu, bạn nên chờ lấy 600 triệu sau 2 năm.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Ứng dụng: định giá dòng tiền chiết khấu (DCF)</h3>
          <p>
            Phương pháp DCF (Discounted Cash Flow) là ứng dụng quan trọng nhất của giá trị thời gian của tiền trong đầu tư.
          </p>
          <p>
            Khi định giá một công ty, câu hỏi cơ bản là: công ty này sẽ tạo ra bao nhiêu tiền trong tương lai, và tổng số tiền đó đáng giá bao nhiêu hôm nay? DCF trả lời bằng cách dự báo dòng tiền hàng năm trong tương lai, rồi quy tất cả về giá trị hiện tại bằng tỷ suất chiết khấu phù hợp.
          </p>
          <p>
            Đây là lý do khi lãi suất tăng, định giá cổ phiếu thường giảm: tỷ suất chiết khấu cao hơn làm cho dòng tiền tương lai ít giá trị hơn khi quy về hôm nay.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Ứng dụng trong đời sống hàng ngày</h3>
          <p>
            Giá trị thời gian của tiền không chỉ dùng trong đầu tư phức tạp. Nó hiển diện trong mọi quyết định tài chính thường ngày:
          </p>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Mua trả góp", rest: ": bạn trả nhiều hơn giá gốc vì người bán tính chi phí cơ hội của việc nhận tiền sau thay vì ngay hôm nay" },
              { bold: "Vay thế chấp", rest: ": tổng tiền bạn trả cho ngân hàng trong 20 năm có thể gấp đôi giá trị ngôi nhà vì mỗi khoản trả có thành phần lãi" },
              { bold: "Hưu trí", rest: ": đóng vào quỹ hưu trí hôm nay để nhận dòng tiền trong tương lai; giá trị hiện tại của tất cả dòng tiền đó phải lớn hơn số bạn đóng vào" },
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

        <div className="text-center space-y-2 py-4">
          <p className="text-stone-500 text-base">Mọi quyết định tài chính đều là câu hỏi về thời gian.</p>
          <p className="text-stone-900 font-bold text-xl">Khi nào nhận tiền, khi nào trả tiền, và lãi suất nào là công bằng để so sánh hai thời điểm khác nhau.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
