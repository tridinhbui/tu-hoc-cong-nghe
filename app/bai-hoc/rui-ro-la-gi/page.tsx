"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 11, day: 11, accent: "stone",
  title: "Rủi ro là gì và tại sao không thể tránh hoàn toàn.",
  subtitle: "Rủi ro không phải điều cần sợ và cũng không phải điều cần bỏ qua. Nó là thực tế cần hiểu, đo lường, và quản lý một cách chủ động.",
  duration: "7 phút", difficulty: "Trung bình", emoji: "·",
  nextSlug: "loi-nhuan-ky-vong", nextTitle: "Day 12: Lợi nhuận kỳ vọng",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Rủi ro trong tài chính được đo lường như thế nào?",
    options: [
      "Bằng cảm giác lo lắng của nhà đầu tư",
      "Bằng độ lệch chuẩn (standard deviation) của lợi nhuận, tức mức độ biến động quanh giá trị kỳ vọng",
      "Bằng số lần thua lỗ trong quá khứ",
      "Bằng tỷ lệ nợ xấu của doanh nghiệp",
    ],
    correct: 1,
    explanation: "Rủi ro tài chính thường được đo bằng độ lệch chuẩn: lợi nhuận biến động bao nhiêu so với trung bình. Dao động lớn = rủi ro cao. Đây là cơ sở của lý thuyết danh mục đầu tư hiện đại.",
  },
  {
    question: "Rủi ro hệ thống (systematic risk) và rủi ro phi hệ thống (unsystematic risk) khác nhau như thế nào?",
    options: [
      "Rủi ro hệ thống là rủi ro phần mềm, phi hệ thống là rủi ro vật lý",
      "Rủi ro hệ thống ảnh hưởng toàn bộ thị trường và không thể đa dạng hóa; phi hệ thống là rủi ro riêng của từng công ty và có thể đa dạng hóa đi",
      "Không có sự khác biệt thực tế",
      "Rủi ro hệ thống chỉ xảy ra trong khủng hoảng tài chính",
    ],
    correct: 1,
    explanation: "Rủi ro hệ thống (kinh tế suy thoái, lãi suất tăng, địa chính trị) ảnh hưởng tất cả. Không thể tránh bằng đa dạng hóa. Rủi ro phi hệ thống (CEO từ chức, sản phẩm lỗi) riêng từng công ty, có thể giảm bằng cách mua nhiều loại cổ phiếu.",
  },
  {
    question: "Tại sao nhà đầu tư dài hạn thường chấp nhận được rủi ro cao hơn?",
    options: [
      "Vì người trẻ không cần tiền gấp",
      "Vì thời gian dài cho phép phục hồi từ các giai đoạn giảm giá; biến động ngắn hạn ít ảnh hưởng đến kết quả cuối cùng",
      "Vì thị trường dài hạn luôn tăng",
      "Vì rủi ro giảm dần theo tuổi tác",
    ],
    correct: 1,
    explanation: "Thời gian là bộ đệm chống rủi ro tốt nhất. Người có 30 năm đầu tư có thể trải qua 5-6 lần thị trường giảm mạnh rồi phục hồi. Người cần tiền sau 2 năm không có lựa chọn đó.",
  },
];

const CONCEPTS = [
  { vi: "Rủi ro", en: "Risk", def: "Khả năng kết quả thực tế khác với kỳ vọng; trong tài chính thường đo bằng biến động lợi nhuận" },
  { vi: "Rủi ro hệ thống", en: "Systematic Risk", def: "Rủi ro ảnh hưởng toàn bộ thị trường và không thể đa dạng hóa đi; còn gọi là rủi ro thị trường" },
  { vi: "Rủi ro phi hệ thống", en: "Unsystematic Risk", def: "Rủi ro riêng của từng công ty hoặc ngành, có thể giảm bằng cách đa dạng hóa danh mục" },
  { vi: "Khả năng chịu rủi ro", en: "Risk Tolerance", def: "Mức độ biến động mà nhà đầu tư có thể chấp nhận mà không đưa ra quyết định sai lầm do cảm xúc" },
  { vi: "Phần bù rủi ro", en: "Risk Premium", def: "Lợi nhuận thêm mà nhà đầu tư kỳ vọng nhận được khi chấp nhận rủi ro cao hơn" },
];

const TAKEAWAYS = [
  "Rủi ro là sự không chắc chắn về kết quả, không phải sự chắc chắn về tổn thất.",
  "Rủi ro hệ thống không thể tránh; rủi ro phi hệ thống có thể giảm bằng đa dạng hóa.",
  "Không có lợi nhuận cao mà không có rủi ro tương ứng; ai hứa điều ngược lại là đang lừa dối.",
  "Khả năng chịu rủi ro phụ thuộc vào thời gian đầu tư, tình trạng tài chính, và tâm lý cá nhân.",
];

export default function RuiRoLaGiPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Hầu hết người ta nghĩ về rủi ro theo một trong hai thái cực: hoặc sợ nó đến mức tê liệt, hoặc bỏ qua nó hoàn toàn. Cả hai đều dẫn đến quyết định tài chính tệ. Hiểu đúng rủi ro là bước đầu tiên để đưa ra quyết định đúng.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Rủi ro là gì trong tài chính</h3>
          <p>
            Rủi ro trong tài chính không phải là sự chắc chắn về tổn thất. Nó là <strong className="text-stone-900">sự không chắc chắn về kết quả</strong>: kết quả thực tế có thể tốt hơn hoặc tệ hơn so với kỳ vọng.
          </p>
          <p>
            Một cổ phiếu có thể tăng mạnh hơn kỳ vọng, đó là rủi ro theo chiều tích cực. Nó cũng có thể giảm mạnh hơn kỳ vọng, đó là rủi ro tiêu cực. Về mặt kỹ thuật, cả hai đều là rủi ro vì đều là sự lệch khỏi kết quả dự kiến.
          </p>
          <p>
            Trong thực tế, khi nói đến quản lý rủi ro, người ta thường quan tâm đến rủi ro giảm giá trị (downside risk), tức khả năng mất tiền hoặc không đạt được mục tiêu tài chính.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Hai loại rủi ro cần phân biệt</h3>
          <p>
            Lý thuyết danh mục đầu tư hiện đại phân chia rủi ro thành hai loại:
          </p>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Rủi ro hệ thống (systematic risk)", rest: ": rủi ro ảnh hưởng toàn bộ thị trường. Kinh tế suy thoái, lãi suất tăng, chiến tranh, khủng hoảng tài chính toàn cầu. Không thể đa dạng hóa đi, vì mọi cổ phiếu đều chịu tác động" },
              { bold: "Rủi ro phi hệ thống (unsystematic risk)", rest: ": rủi ro riêng của từng công ty hoặc ngành. CEO từ chức, sản phẩm bị thu hồi, công nghệ lỗi thời, đối thủ cạnh tranh mới. Có thể giảm đáng kể bằng cách đa dạng hóa danh mục" },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>
          <p>
            Hệ quả thực tế: đa dạng hóa danh mục đầu tư (mua nhiều loại cổ phiếu, nhiều ngành) có thể loại bỏ gần hết rủi ro phi hệ thống mà không cần loại bỏ kỳ vọng lợi nhuận.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Mối quan hệ giữa rủi ro và lợi nhuận</h3>
          <p>
            Đây là một trong những quy luật cơ bản nhất của tài chính: <strong className="text-stone-900">lợi nhuận kỳ vọng cao hơn đi kèm với rủi ro cao hơn</strong>. Không có ngoại lệ bền vững nào.
          </p>
          <p>
            Cổ phiếu sinh lợi hơn trái phiếu trong dài hạn vì biến động mạnh hơn nhiều. Cổ phiếu nhỏ lẻ sinh lợi hơn cổ phiếu blue-chip vì rủi ro phá sản cao hơn. Trái phiếu doanh nghiệp trả lãi cao hơn trái phiếu chính phủ vì khả năng mất tiền cao hơn.
          </p>
          <p>
            Nếu ai đó hứa lợi nhuận rất cao mà rủi ro thấp, có hai khả năng: họ đang hiểu lầm về rủi ro ẩn trong khoản đầu tư đó, hoặc họ đang lừa dối.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Phần bù rủi ro trong thực tế</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Lãi suất ngân hàng Việt Nam khoảng 5-7%/năm là điểm tham chiếu không rủi ro. Cổ phiếu Việt Nam trong dài hạn kỳ vọng 12-15%/năm. Khoảng cách 6-8% đó là phần bù rủi ro mà thị trường trả cho nhà đầu tư chấp nhận biến động lớn hơn.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900">Đánh giá khả năng chịu rủi ro của bản thân</h3>
          <p>
            Không có mức rủi ro đúng hay sai tuyệt đối, chỉ có mức phù hợp hay không phù hợp với từng người tại từng thời điểm. Khả năng chịu rủi ro phụ thuộc vào:
          </p>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Thời gian đầu tư", rest: ": 30 năm còn có thể phục hồi từ khủng hoảng; 2 năm thì không" },
              { bold: "Tình trạng tài chính", rest: ": có quỹ khẩn cấp, không có nợ cao lãi thì chịu được rủi ro tốt hơn" },
              { bold: "Thu nhập ổn định", rest: ": công việc ổn định cho phép chịu rủi ro đầu tư cao hơn" },
              { bold: "Tâm lý cá nhân", rest: ": nếu thị trường giảm 30% khiến bạn không ngủ được và bán ra, thì danh mục rủi ro cao không phù hợp với bạn dù về mặt lý thuyết bạn có thể chịu được" },
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
            <p className="text-stone-400 text-sm mt-0.5">Hover vào từng dòng để xem chi tiết</p>
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
          <p className="text-stone-400 text-base">Rủi ro không phải điều cần tránh tuyệt đối.</p>
          <p className="text-stone-900 font-bold text-xl">Tránh hoàn toàn rủi ro cũng là một loại rủi ro: rủi ro không đạt được mục tiêu tài chính dài hạn.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
