"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 9, day: 9, accent: "stone",
  title: "Lạm phát là gì và tại sao nó quan trọng.",
  subtitle: "Lạm phát là kẻ trộm thầm lặng. Nó không lấy tiền trong tài khoản của bạn, nó chỉ làm tiền đó mua được ít hơn mỗi năm.",
  duration: "6 phút", difficulty: "Dễ", emoji: "·",
  nextSlug: "gia-tri-thoi-gian-cua-tien", nextTitle: "Day 10: Giá trị thời gian của tiền",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Lạm phát 7%/năm ảnh hưởng đến người giữ tiền mặt như thế nào?",
    options: [
      "Không ảnh hưởng gì vì số tiền trong tay không đổi",
      "Sau 10 năm, tiền trong tay mua được chưa đến một nửa so với hôm nay",
      "Tốt vì giá trị tiền tăng theo lạm phát",
      "Chỉ ảnh hưởng đến người nghèo",
    ],
    correct: 1,
    explanation: "Lạm phát 7%: theo quy tắc 72, tiền mất nửa sức mua sau 72/7 = khoảng 10.3 năm. 100 triệu hôm nay chỉ mua được khoảng 48 triệu hàng hóa theo giá hiện tại sau 10 năm.",
  },
  {
    question: "Ngân hàng trả lãi 5%/năm nhưng lạm phát 7%/năm. Thực chất bạn đang làm gì?",
    options: [
      "Kiếm lời 5% mỗi năm",
      "Hòa vốn vì lãi bù lạm phát",
      "Mất sức mua 2% mỗi năm, dù số tiền trong tài khoản tăng",
      "Không thể kết luận mà không biết tổng số tiền",
    ],
    correct: 2,
    explanation: "Lãi suất thực = 5% - 7% = âm 2%. Bạn nhận nhiều tiền hơn về số, nhưng mua được ít hàng hóa hơn. Đây là lý do quan trọng phải tìm kênh đầu tư có lợi nhuận vượt lạm phát.",
  },
  {
    question: "Tại sao lạm phát vừa phải (khoảng 2-3%) thường được coi là tốt cho nền kinh tế?",
    options: [
      "Vì nó giúp nhà nước thu thêm thuế",
      "Vì nó khuyến khích chi tiêu và đầu tư thay vì tích trữ tiền mặt, thúc đẩy tăng trưởng kinh tế",
      "Vì người giàu kiếm được nhiều hơn",
      "Vì nó ổn định tỷ giá hối đoái",
    ],
    correct: 1,
    explanation: "Lạm phát nhẹ khiến tiền nhàn rỗi mất giá dần, tạo động lực cho người dân đầu tư hoặc tiêu dùng thay vì cất giữ. Đây là động lực tự nhiên của vòng quay kinh tế.",
  },
];

const CONCEPTS = [
  { vi: "Lạm phát", en: "Inflation", def: "Tốc độ tăng mức giá chung trong nền kinh tế theo thời gian; đo bằng chỉ số CPI" },
  { vi: "Chỉ số giá tiêu dùng", en: "Consumer Price Index (CPI)", def: "Thước đo lạm phát phổ biến nhất; theo dõi giá một rổ hàng hóa và dịch vụ điển hình" },
  { vi: "Giảm phát", en: "Deflation", def: "Giá chung giảm xuống; có vẻ tốt nhưng thường báo hiệu suy thoái và làm trì hoãn chi tiêu" },
  { vi: "Siêu lạm phát", en: "Hyperinflation", def: "Lạm phát tăng mất kiểm soát (trên 50%/tháng); phá hủy sức mua và hệ thống tiền tệ" },
  { vi: "Lạm phát kỳ vọng", en: "Inflation Expectation", def: "Dự báo của thị trường về lạm phát tương lai; ảnh hưởng lớn đến lãi suất và hành vi chi tiêu" },
];

const TAKEAWAYS = [
  "Lạm phát làm tiền mất giá theo thời gian: 100 triệu hôm nay sẽ mua được ít hơn 10 năm tới.",
  "Lãi suất thực = lãi suất danh nghĩa trừ lạm phát; gửi tiết kiệm dưới mức lạm phát là thua lỗ thực.",
  "Lạm phát 2-3% thường tốt cho kinh tế; siêu lạm phát phá hủy tích lũy và niềm tin vào đồng tiền.",
  "Đầu tư vào tài sản thực (cổ phiếu, bất động sản, vàng) là cách phổ biến để chống lại lạm phát.",
];

export default function LamPhatLaGiPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Lạm phát không cướp tiền từ tài khoản ngân hàng của bạn. Nó làm điều gì đó tinh vi hơn và khó nhận ra hơn: nó làm cho số tiền bạn có mua được ít thứ hơn theo thời gian.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Lạm phát là gì</h3>
          <p>
            Lạm phát là tốc độ tăng của mức giá chung trong nền kinh tế. Khi lạm phát 7% một năm, điều đó có nghĩa là một rổ hàng hóa và dịch vụ điển hình năm nay đắt hơn 7% so với năm ngoái.
          </p>
          <p>
            Về thực chất, lạm phát là sự suy giảm sức mua của đồng tiền. 100 nghìn đồng năm 2010 mua được nhiều thứ hơn đáng kể so với 100 nghìn đồng năm 2024. Số tiền như nhau, nhưng giá trị thực khác nhau hoàn toàn.
          </p>
          <p>
            Đo lường lạm phát phổ biến nhất là qua <strong className="text-stone-900">chỉ số giá tiêu dùng (CPI)</strong>, theo dõi giá của một rổ hàng hóa và dịch vụ tiêu biểu từ thực phẩm, nhà ở, y tế đến giáo dục.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Lạm phát ảnh hưởng đến bạn như thế nào</h3>
          <p>
            Giả sử bạn có 500 triệu đồng tiền mặt và không làm gì với nó. Lạm phát 7% mỗi năm đồng nghĩa với:
          </p>
          <ul className="space-y-3 pl-1">
            {[
              "Sau 5 năm: sức mua còn khoảng 357 triệu (theo giá hôm nay)",
              "Sau 10 năm: sức mua còn khoảng 254 triệu (hơn một nửa bị ăn mòn)",
              "Sau 20 năm: sức mua còn khoảng 129 triệu (mất ba phần tư)",
            ].map(i => (
              <li key={i} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                {i}
              </li>
            ))}
          </ul>
          <p>
            Số tiền trong tài khoản không thay đổi, nhưng những gì nó có thể mua được thì giảm dần mỗi năm.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Lạm phát và tiết kiệm ngân hàng</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Nếu ngân hàng trả lãi 5%/năm và lạm phát là 7%, lãi suất thực của bạn là âm 2%. Tiền trong tài khoản tăng về số, nhưng sức mua thực giảm 2% mỗi năm. Đây không phải bảo toàn vốn, đây là mất vốn từ từ.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Nguyên nhân gây lạm phát</h3>
          <p>
            Lạm phát có thể đến từ nhiều phía:
          </p>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Cầu kéo", rest: ": khi nhu cầu vượt cung, người mua tranh nhau mua và đẩy giá lên" },
              { bold: "Chi phí đẩy", rest: ": khi chi phí sản xuất tăng (giá dầu, lương nhân công), doanh nghiệp tăng giá bán" },
              { bold: "In tiền", rest: ": khi ngân hàng trung ương tăng cung tiền nhanh hơn tăng trưởng kinh tế" },
              { bold: "Kỳ vọng", rest: ": khi người dân tin giá sẽ tăng và tăng chi tiêu sớm, tạo ra vòng lặp tự thực hiện" },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Lạm phát vừa phải có lợi: tại sao</h3>
          <p>
            Nghe có vẻ nghịch lý, nhưng lạm phát hoàn toàn bằng không hoặc giảm phát thực ra không tốt cho kinh tế.
          </p>
          <p>
            Khi giá ổn định hoặc giảm, người ta có xu hướng trì hoãn mua sắm: nếu giá rẻ hơn vào tháng sau, tại sao phải mua hôm nay? Tâm lý này lan rộng khiến chi tiêu trong nền kinh tế giảm mạnh, doanh nghiệp giảm sản xuất, công nhân mất việc làm, và vòng xoáy đi xuống bắt đầu.
          </p>
          <p>
            Lạm phát khoảng 2-3% mỗi năm tạo ra động lực nhẹ để chi tiêu và đầu tư hơn là tích trữ tiền mặt, đồng thời duy trì dư địa để ngân hàng trung ương cắt giảm lãi suất khi kinh tế cần kích thích.
          </p>
        </section>

        <div className="rounded-2xl overflow-hidden border-2 border-stone-900 shadow-lg">
          <div className="bg-stone-900 px-6 py-4">
            <p className="text-white font-extrabold text-lg tracking-wide">Khái niệm cần nhớ</p>
            <p className="text-stone-400 text-sm mt-0.5">Chạm hoặc di chuột vào từng dòng</p>
          </div>
          <div className="divide-y divide-stone-100 bg-white">
            {CONCEPTS.map(({ vi, en, def }) => (
              <div key={en} className="group px-6 py-4 flex items-start gap-4 cursor-default transition-all duration-200 hover:bg-stone-50 hover:pl-8">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-bold text-stone-900 text-base group-hover:text-stone-700 transition-colors">{vi}</span>
                    <span className="text-sm text-stone-400 font-mono bg-stone-100 px-2 py-0.5 rounded group-hover:bg-stone-200 transition-colors">{en}</span>
                  </div>
                  <p className="text-stone-500 text-base mt-1 leading-relaxed group-hover:text-stone-700 transition-colors">{def}</p>
                </div>
                <span className="text-stone-200 group-hover:text-stone-400 transition-colors text-lg mt-0.5 flex-shrink-0">→</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-stone-900 px-6 py-5">
            <p className="text-white font-extrabold text-xl tracking-wide">Ghi nhớ nhanh</p>
            <p className="text-stone-400 text-sm mt-0.5">4 điều cốt lõi từ bài này</p>
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
          <p className="text-stone-400 text-base">Lạm phát không lấy tiền trong tài khoản bạn.</p>
          <p className="text-stone-900 font-bold text-xl">Nó chỉ làm những gì tiền đó có thể mua trở nên ít đi mỗi năm một chút.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
