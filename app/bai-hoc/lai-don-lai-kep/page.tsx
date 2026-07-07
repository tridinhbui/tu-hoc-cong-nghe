"use client";

import Image from "next/image";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 7, day: 7, accent: "stone",
  title: "Lãi đơn và lãi kép.",
  subtitle: "Lãi kép là khi tiền lãi cũng được đầu tư và sinh lãi tiếp. Đây là nền tảng của mọi chiến lược tích lũy tài sản dài hạn.",
  duration: "7 phút", difficulty: "Dễ", emoji: "·",
  nextSlug: "suc-manh-thoi-gian", nextTitle: "Day 8: Sức mạnh của thời gian",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Bạn gửi 100 triệu với lãi suất 10%/năm. Sau 20 năm, lãi đơn cho bao nhiêu? Lãi kép cho bao nhiêu?",
    options: [
      "Như nhau: 200 triệu",
      "Lãi đơn: 300 triệu; Lãi kép: 672 triệu",
      "Lãi đơn: 200 triệu; Lãi kép: 400 triệu",
      "Cả hai đều cho 672 triệu",
    ],
    correct: 1,
    explanation: "Lãi đơn: 100 + (100 x 10% x 20) = 300 triệu. Lãi kép: 100 x (1.1)^20 = 672 triệu. Khoảng cách 372 triệu đến từ việc lãi được tái đầu tư sinh lãi.",
  },
  {
    question: "Tại sao lãi kép tạo ra nhiều tiền hơn lãi đơn?",
    options: [
      "Vì lãi suất của lãi kép luôn cao hơn",
      "Vì phần lãi kiếm được cũng được tái đầu tư và sinh lãi tiếp",
      "Vì ngân hàng tính lãi theo ngày thay vì theo năm",
      "Vì lãi kép áp dụng cho số tiền gốc lớn hơn",
    ],
    correct: 1,
    explanation: "Lãi đơn chỉ tính trên gốc ban đầu. Lãi kép tính trên gốc cộng toàn bộ lãi đã tích lũy. Năm này lãi trở thành gốc cho năm sau, tạo hiệu ứng bóng tuyết.",
  },
  {
    question: "Quy tắc 72 cho biết điều gì?",
    options: [
      "Tỷ lệ tiết kiệm tối ưu là 72% thu nhập",
      "Chia 72 cho lãi suất hàng năm để biết tiền tăng gấp đôi sau bao nhiêu năm",
      "Cần đầu tư 72 tháng liên tiếp mới thấy lãi kép",
      "Lãi suất 72% là mức nguy hiểm cần tránh",
    ],
    correct: 1,
    explanation: "Quy tắc 72: số năm tăng gấp đôi = 72 / lãi suất. Lãi 6%: tăng gấp đôi sau 12 năm. Lãi 10%: sau 7.2 năm. Công cụ tính nhanh không cần máy tính.",
  },
];

const CONCEPTS = [
  { vi: "Lãi đơn", en: "Simple Interest", def: "Lãi tính chỉ trên số tiền gốc ban đầu; không tái đầu tư lãi" },
  { vi: "Lãi kép", en: "Compound Interest", def: "Lãi tính trên cả gốc và lãi đã tích lũy; tạo ra tăng trưởng hàm mũ" },
  { vi: "Kỳ ghép lãi", en: "Compounding Period", def: "Tần suất tính lãi: năm, quý, tháng, ngày; ghép lãi càng thường xuyên thì cuối kỳ nhận được càng nhiều" },
  { vi: "Quy tắc 72", en: "Rule of 72", def: "Số năm để tiền tăng gấp đôi xấp xỉ bằng 72 chia cho lãi suất hàng năm" },
];

const TAKEAWAYS = [
  "Lãi đơn: lãi chỉ tính trên gốc. Lãi kép: lãi tính trên cả gốc và lãi đã tích lũy.",
  "Sau đủ nhiều năm, lãi kép tạo ra khoảng cách khổng lồ so với lãi đơn.",
  "Quy tắc 72: chia 72 cho lãi suất để biết số năm tiền tăng gấp đôi.",
  "Bắt đầu sớm và duy trì kiên nhẫn là hai yếu tố then chốt để lãi kép phát huy sức mạnh.",
];

export default function LaiDonLaiKepPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Một trong những khái niệm quan trọng nhất trong tài chính cũng là một trong những khái niệm bị đánh giá thấp nhất: sự khác biệt giữa lãi đơn và lãi kép. Nắm được điều này thay đổi hoàn toàn cách bạn nghĩ về đầu tư và thời gian.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Lãi đơn: tuyến tính và có giới hạn</h3>
          <p>
            <strong className="text-stone-900">Lãi đơn</strong> là lãi suất tính chỉ trên số tiền gốc ban đầu, không thay đổi qua các năm.
          </p>
          <p>
            Nếu bạn gửi 100 triệu với lãi đơn 10% mỗi năm, mỗi năm bạn nhận được đúng 10 triệu, không nhiều hơn không ít hơn. Sau 20 năm, tổng lãi nhận được là 200 triệu, cộng gốc 100 triệu, bạn có 300 triệu.
          </p>
          <p>
            Tăng trưởng lãi đơn là <strong className="text-stone-900">tuyến tính</strong>, tức là cứ thêm một năm thì cộng thêm một khoản cố định. Không có hiệu ứng tích lũy.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Lãi kép: hàm mũ và sức mạnh tích lũy</h3>
          <p>
            <strong className="text-stone-900">Lãi kép</strong> xảy ra khi phần lãi kiếm được không được rút ra mà được tái đầu tư, tức là cộng vào gốc để tiếp tục sinh lãi trong kỳ tiếp theo.
          </p>
          <p>
            Với 100 triệu và lãi 10% mỗi năm theo lãi kép: năm đầu bạn có 110 triệu. Năm hai lãi 10% tính trên 110 triệu, bạn có 121 triệu. Năm ba lãi tính trên 121 triệu. Cứ thế tiếp tục. Sau 20 năm, bạn có khoảng 672 triệu, gấp hơn 2 lần so với lãi đơn (300 triệu).
          </p>
          <p>
            Tăng trưởng lãi kép là <strong className="text-stone-900">hàm mũ</strong>: chậm ở những năm đầu, nhưng tăng tốc dữ dội ở những năm sau. Đây là lý do tài sản của những người đầu tư lâu dài thường tăng mạnh nhất trong những thập kỷ cuối.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-4">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">100 triệu, lãi suất 10%/năm</p>
            <div className="space-y-2 text-base text-stone-700">
              {[
                { year: "Sau 10 năm", simple: "200 triệu", compound: "259 triệu" },
                { year: "Sau 20 năm", simple: "300 triệu", compound: "672 triệu" },
                { year: "Sau 30 năm", simple: "400 triệu", compound: "1.74 tỷ" },
              ].map(r => (
                <div key={r.year} className="flex gap-4 border-b border-stone-100 pb-2 last:border-0 last:pb-0">
                  <span className="font-semibold text-stone-600 w-28 flex-shrink-0">{r.year}</span>
                  <span className="text-stone-500 flex-1">Lãi đơn: {r.simple}</span>
                  <span className="text-stone-900 font-semibold flex-1">Lãi kép: {r.compound}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Quy tắc 72: công cụ tính nhanh</h3>
          <p>
            Quy tắc 72 là cách tính nhanh trong đầu mà không cần máy tính: <strong className="text-stone-900">chia 72 cho lãi suất hàng năm để biết tiền sẽ tăng gấp đôi sau bao nhiêu năm</strong>.
          </p>
          <ul className="space-y-3 pl-1">
            {[
              "Lãi suất 6%: tiền gấp đôi sau 72 / 6 = 12 năm",
              "Lãi suất 8%: tiền gấp đôi sau 72 / 8 = 9 năm",
              "Lãi suất 10%: tiền gấp đôi sau 72 / 10 = 7.2 năm",
              "Lãi suất 12%: tiền gấp đôi sau 72 / 12 = 6 năm",
            ].map(i => (
              <li key={i} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                {i}
              </li>
            ))}
          </ul>
          <p>
            Quy tắc này cũng áp dụng ngược: nếu lạm phát 7% mỗi năm, sức mua của tiền bạn sẽ giảm một nửa sau khoảng 10 năm (72 / 7 = 10.3 năm).
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Lãi kép cũng hoạt động ngược lại</h3>
          <p>
            Lãi kép không chỉ có lợi khi bạn là người tiết kiệm. Nó cũng hoạt động bất lợi khi bạn là người đi vay.
          </p>
          <p>
            Thẻ tín dụng thường tính lãi kép theo tháng với lãi suất 2.5-3.5%/tháng, tương đương khoảng 30-42%/năm. Nếu bạn quẹt thẻ 10 triệu và chỉ trả tối thiểu mỗi tháng, sau 3 năm khoản nợ đó có thể lên đến 25-30 triệu.
          </p>
          <p>
            Đây là lý do hiểu lãi kép quan trọng không chỉ với người đầu tư, mà còn với bất kỳ ai sử dụng tín dụng.
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
              src="/lessons/day7-lai-don-lai-kep.png"
              alt="Tóm tắt trực quan Day 7"
              width={1024}
              height={1536}
              className="w-full h-auto"
            />
          </div>
        </div>


        <div className="text-center space-y-2 py-4">
          <p className="text-stone-500 text-base">Lãi đơn tăng trưởng theo đường thẳng.</p>
          <p className="text-stone-900 font-bold text-xl">Lãi kép tăng trưởng theo đường cong. Và sự khác biệt giữa hai đường đó là toàn bộ câu chuyện về tích lũy tài sản dài hạn.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
