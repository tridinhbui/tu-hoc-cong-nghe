"use client";

import Image from "next/image";
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
  {
    question: "Giảm phát là gì và tại sao nó lại xấu cho nền kinh tế?",
    options: [
      "Giảm phát tốt vì giá cả rẻ hơn",
      "Giảm phát là giá chung giảm; tâm lý trì hoãn mua sắm khiến chi tiêu giảm, doanh nghiệp cắt giảm sản xuất, công nhân mất việc",
      "Giảm phát không ảnh hưởng kinh tế",
      "Giảm phát chỉ xảy ra ở nước nghèo",
    ],
    correct: 1,
    explanation: "Bài học nêu: khi giá giảm, người ta trì hoãn mua hôm nay để chờ rẻ hơn mai. Tâm lý này lan rộng tạo vòng xoáy đi xuống: chi tiêu giảm → sản xuất giảm → công nhân mất việc → suy thoái.",
  },
  {
    question: "Siêu lạm phát (hyperinflation) có tác động gì?",
    options: [
      "Chỉ làm tiền mất giá một chút",
      "Phá hủy sức mua và hệ thống tiền tệ hoàn toàn (lạm phát trên 50%/tháng)",
      "Tốt vì khuyến khích chi tiêu nhanh",
      "Chỉ ảnh hưởng đến người giàu",
    ],
    correct: 1,
    explanation: "Siêu lạm phát không chỉ làm tiền mất giá, nó phá hủy cả hệ thống tiền tệ và niềm tin vào đồng tiền. Người dân chuyển sang dùng ngoại tệ hoặc trao đổi hàng hóa trực tiếp.",
  },
  {
    question: "Từ ví dụ 500 triệu trong bài, sau 10 năm với lạm phát 7%, sức mua còn khoảng bao nhiêu?",
    options: [
      "350 triệu",
      "254 triệu (hơn một nửa bị ăn mòn)",
      "400 triệu",
      "150 triệu",
    ],
    correct: 1,
    explanation: "Theo bảng trong bài: sau 10 năm với lạm phát 7%, sức mua còn khoảng 254 triệu. Số tiền không đổi nhưng mua được ít hơn một nửa hàng hóa so với hôm nay.",
  },
  {
    question: "Bốn nguyên nhân chính của lạm phát theo bài học là gì?",
    options: [
      "Tăng thuế, tăng lương, tăng sản xuất, tăng chi tiêu",
      "Cầu kéo, chi phí đẩy, in tiền, kỳ vọng",
      "Giảm phát, siêu lạm phát, lạm phát kiềm chế, lạm phát tự do",
      "Tỷ giá, lãi suất, cung tiền, giá dầu",
    ],
    correct: 1,
    explanation: "Bài học nêu 4 nguyên nhân: cầu kéo (nhu cầu > cung), chi phí đẩy (chi phí sản xuất tăng), in tiền (tăng cung tiền quá nhanh), kỳ vọng (tâm lý tự thực hiện).",
  },
  {
    question: "CPI (Chỉ số giá tiêu dùng) được dùng để làm gì?",
    options: [
      "Đo tốc độ tăng của lương người lao động",
      "Đo lường lạm phát bằng cách theo dõi giá một rổ hàng hóa và dịch vụ tiêu biểu",
      "Đo lường sức khỏe của ngân hàng",
      "Đo lường số công nhân bị mất việc",
    ],
    correct: 1,
    explanation: "CPI là chỉ số phổ biến nhất để đo lường lạm phát. Nó theo dõi giá của thực phẩm, nhà ở, y tế, giáo dục và các mục hàng khác của người tiêu dùng.",
  },
  {
    question: "Để chống lại lạm phát, bạn nên làm gì?",
    options: [
      "Giữ toàn bộ tiền mặt trong túi",
      "Đầu tư vào tài sản thực như cổ phiếu, bất động sản, vàng để chống lạm phát",
      "Chỉ gửi tiết kiệm ngân hàng",
      "Không thể làm gì để chống lạm phát",
    ],
    correct: 1,
    explanation: "Bài học nêu: đầu tư vào tài sản thực là cách phổ biến để chống lạm phát. Các tài sản này có xu hướng tăng giá theo lạm phát, bảo vệ sức mua thực của bạn.",
  },
  {
    question: "Sức mua của tiền mất đi khi nào so với lạm phát?",
    options: [
      "Chỉ khi tiền nằm một chỗ không sinh lãi",
      "Luôn luôn bị mòn bởi lạm phát, dù tiền có sinh lãi (nếu lãi < lạm phát)",
      "Không bao giờ mất đi",
      "Chỉ mất đi nếu tiền mặt",
    ],
    correct: 1,
    explanation: "Lạm phát làm mòn sức mua liên tục. Dù có sinh lãi, nếu lãi suất < lạm phát, sức mua vẫn giảm. Đây là lý do quốc gia nào cũng cần có lạm phát chứ không thể lạm phát bằng 0.",
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
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Lạm phát là gì</h3>
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
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Lạm phát ảnh hưởng đến bạn như thế nào</h3>
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
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Lạm phát và tiết kiệm ngân hàng</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Nếu ngân hàng trả lãi 5%/năm và lạm phát là 7%, lãi suất thực của bạn là âm 2%. Tiền trong tài khoản tăng về số, nhưng sức mua thực giảm 2% mỗi năm. Đây không phải bảo toàn vốn, đây là mất vốn từ từ.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Nguyên nhân gây lạm phát</h3>
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
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Lạm phát vừa phải có lợi: tại sao</h3>
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
              src="/lessons/day9-lam-phat-la-gi.png"
              alt="Tóm tắt trực quan Day 9"
              width={1024}
              height={1536}
              className="w-full h-auto"
            />
          </div>
        </div>


        <div className="text-center space-y-2 py-4">
          <p className="text-stone-500 text-base">Lạm phát không lấy tiền trong tài khoản bạn.</p>
          <p className="text-stone-900 font-bold text-xl">Nó chỉ làm những gì tiền đó có thể mua trở nên ít đi mỗi năm một chút.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
