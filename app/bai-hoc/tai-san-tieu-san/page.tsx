"use client";

import Image from "next/image";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 5, day: 5, accent: "stone",
  title: "Tài sản và tiêu sản: hiểu đúng, không cực đoan.",
  subtitle: "Tài sản bỏ tiền vào túi bạn. Tiêu sản lấy tiền ra khỏi túi bạn. Nhưng ranh giới đó không phải lúc nào cũng rõ ràng.",
  duration: "6 phút", difficulty: "Dễ", emoji: "·",
  nextSlug: "lai-suat-la-gi", nextTitle: "Day 6: Lãi suất là gì?",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Ngôi nhà bạn đang ở là tài sản hay tiêu sản?",
    options: [
      "Tài sản vì nó có giá trị",
      "Tiêu sản vì nó lấy tiền ra (thuế, bảo trì, tiền vay)",
      "Tùy thuộc vào góc nhìn",
      "Không phải tài sản cũng không phải tiêu sản",
    ],
    correct: 2,
    explanation: "Nhà ở tạo ra dòng tiền âm hàng tháng (lãi vay, thuế, bảo trì). Nhà cho thuê tạo dòng tiền dương. Cùng một tài sản có thể là tài sản hoặc tiêu sản tùy cách sử dụng.",
  },
  {
    question: "Theo định nghĩa dòng tiền, tài sản là gì?",
    options: [
      "Bất cứ thứ gì có giá trị trên thị trường",
      "Thứ bỏ tiền vào túi bạn, tức là tạo ra dòng tiền dương hoặc tăng giá trị",
      "Tài sản do nhà nước công nhận trong sổ đỏ",
      "Vàng, tiền mặt và chứng khoán",
    ],
    correct: 1,
    explanation: "Theo góc nhìn dòng tiền: tài sản là thứ làm tiền vào túi bạn. Cổ phiếu trả cổ tức, căn hộ cho thuê, kỹ năng tạo thu nhập cao hơn đều là tài sản theo nghĩa này.",
  },
  {
    question: "Điều gì sai khi áp dụng cực đoan quan điểm nhà bạn ở là tiêu sản?",
    options: [
      "Không có gì sai, quan điểm đó hoàn toàn đúng",
      "Bỏ qua giá trị phi tài chính (an cư, ổn định) và khả năng tăng giá dài hạn",
      "Quan điểm đó không phổ biến ở Việt Nam",
      "Chỉ sai với người giàu, không sai với người bình thường",
    ],
    correct: 1,
    explanation: "Tài chính cá nhân không chỉ tối ưu dòng tiền. An cư, sự ổn định tâm lý và tăng giá tài sản dài hạn đều có giá trị. Cực đoan kiểu gì cũng dẫn đến quyết định lệch.",
  },
];

const CONCEPTS = [
  { vi: "Tài sản", en: "Asset", def: "Thứ tạo ra dòng tiền dương hoặc tăng giá trị theo thời gian; bỏ tiền vào túi bạn" },
  { vi: "Tiêu sản", en: "Liability / Consumer Good", def: "Thứ tạo ra dòng tiền âm liên tục; lấy tiền ra khỏi túi bạn" },
  { vi: "Dòng tiền từ tài sản", en: "Asset Cash Flow", def: "Tiền vào đều đặn từ việc sở hữu tài sản: tiền thuê, cổ tức, lãi trái phiếu" },
  { vi: "Tỷ suất lợi nhuận", en: "Return on Asset", def: "Lợi nhuận tạo ra chia cho chi phí bỏ ra; đo hiệu quả của tài sản" },
];

const TAKEAWAYS = [
  "Tài sản tạo dòng tiền dương; tiêu sản tạo dòng tiền âm liên tục.",
  "Cùng một vật có thể là tài sản hoặc tiêu sản tùy cách bạn sử dụng nó.",
  "Xe hơi cá nhân là tiêu sản; xe taxi là tài sản. Nhà ở là tiêu sản theo dòng tiền; nhà cho thuê là tài sản.",
  "Không áp dụng cực đoan: cuộc sống không chỉ là tối ưu dòng tiền.",
];

export default function TaiSanTieuSanPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Một trong những khái niệm được phổ biến rộng rãi nhất trong tài chính cá nhân là sự phân biệt giữa tài sản và tiêu sản. Ý tưởng cơ bản rất đơn giản nhưng thường bị hiểu lệch hoặc áp dụng quá cứng nhắc.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Định nghĩa theo dòng tiền</h3>
          <p>
            Trong tài chính cá nhân, phân biệt tài sản và tiêu sản thường dựa trên dòng tiền chúng tạo ra, không phải giá trị danh nghĩa.
          </p>
          <p>
            <strong className="text-stone-900">Tài sản</strong> là thứ bỏ tiền vào túi bạn. Nó tạo ra dòng tiền dương theo thời gian hoặc tăng giá trị đủ để vượt chi phí nắm giữ.
          </p>
          <p>
            <strong className="text-stone-900">Tiêu sản</strong> là thứ lấy tiền ra khỏi túi bạn. Nó tạo ra dòng tiền âm liên tục thông qua chi phí vận hành, bảo trì, lãi vay hoặc khấu hao.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-stone-200 rounded-2xl p-6 space-y-3">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Ví dụ tài sản</p>
              <ul className="space-y-2 text-stone-600 text-base">
                {["Căn hộ cho thuê", "Cổ phiếu trả cổ tức", "Trái phiếu doanh nghiệp", "Kỹ năng tạo thu nhập thụ động"].map(i => (
                  <li key={i} className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-stone-400 flex-shrink-0" />{i}</li>
                ))}
              </ul>
            </div>
            <div className="border border-stone-200 rounded-2xl p-6 space-y-3">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Ví dụ tiêu sản</p>
              <ul className="space-y-2 text-stone-600 text-base">
                {["Xe hơi cá nhân", "Đồ điện tử tiêu dùng", "Quần áo hàng hiệu", "Khoản vay mua hàng tiêu dùng"].map(i => (
                  <li key={i} className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-stone-400 flex-shrink-0" />{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Cùng một vật, hai bản chất khác nhau</h3>
          <p>
            Điểm thú vị là cùng một vật có thể là tài sản hoặc tiêu sản tùy cách bạn sử dụng.
          </p>
          <p>
            Một chiếc xe hơi dùng để đi làm cá nhân là tiêu sản điển hình: tiền bảo hiểm, xăng, bảo trì, phí đường, và khấu hao khoảng 15-20% giá trị mỗi năm đều chảy ra khỏi túi bạn. Nhưng chiếc xe đó nếu được dùng để chạy taxi hay giao hàng thì tạo ra dòng tiền dương, trở thành tài sản.
          </p>
          <p>
            Tương tự, ngôi nhà bạn đang ở có chi phí nắm giữ rõ ràng: lãi vay, thuế nhà đất, bảo trì, bảo hiểm. Đây là dòng tiền ra liên tục. Nếu bạn cho thuê căn nhà đó, nó tạo ra dòng tiền vào và trở thành tài sản theo nghĩa dòng tiền.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Vấn đề với cách áp dụng cực đoan</h3>
          <p>
            Một số người sau khi hiểu khái niệm này kết luận rằng không nên mua nhà để ở, không nên mua xe, và mọi chi tiêu không tạo ra dòng tiền đều là sai lầm. Đây là cách hiểu quá cứng nhắc.
          </p>
          <p>
            Ngôi nhà để ở tạo ra giá trị phi tài chính rất thực: sự ổn định, an toàn, không bị chủ nhà đuổi, khả năng cải tạo theo ý muốn, và sự gắn kết cộng đồng. Những giá trị này không xuất hiện trong bảng tính dòng tiền nhưng ảnh hưởng lớn đến chất lượng cuộc sống.
          </p>
          <p>
            Ngoài ra, bất động sản ở nhiều khu vực tăng giá đủ mạnh để bù đắp toàn bộ chi phí nắm giữ và còn tạo ra lợi nhuận thực. Khi đó, việc gọi nhà ở là tiêu sản trở nên không còn chính xác.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Nguyên tắc thực tế</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Thay vì hỏi một thứ là tài sản hay tiêu sản, hãy hỏi: <strong className="text-stone-900">tỷ suất lợi nhuận của thứ này là bao nhiêu và có phù hợp với mục tiêu tài chính của mình không?</strong> Mua xe 500 triệu để đi làm khi có thể đi phương tiện công cộng tốt hơn là quyết định đáng xem xét. Nhưng mua xe 300 triệu khi xe giúp bạn kiếm thêm 10 triệu mỗi tháng là quyết định hoàn toàn khác.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Xây dựng tài sản: nguyên tắc cơ bản</h3>
          <p>
            Mục tiêu tài chính dài hạn của hầu hết mọi người là xây dựng đủ tài sản để tạo ra thu nhập thụ động, tức là tiền chảy vào dù bạn có làm việc hay không.
          </p>
          <p>
            Quá trình đó bắt đầu từ bước đơn giản: dùng thu nhập từ lao động để mua tài sản, để tài sản tạo ra thu nhập thụ động, rồi dùng thu nhập thụ động để mua thêm tài sản. Đây là vòng lặp tích lũy mà người có nền tài chính vững chắc đang theo.
          </p>
          <p>
            Phần lớn tiêu sản không phải vấn đề nếu bạn đủ tài sản để tạo ra dòng tiền bù đắp. Vấn đề là khi người ta mua tiêu sản trước khi có đủ tài sản, và dùng nợ vay để mua tiêu sản.
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
              src="/lessons/day5-tai-san-tieu-san.png"
              alt="Tóm tắt trực quan Day 5"
              width={1024}
              height={1536}
              className="w-full h-auto"
            />
          </div>
        </div>


        <div className="text-center space-y-2 py-4">
          <p className="text-stone-500 text-base">Tài sản bỏ tiền vào túi bạn. Tiêu sản lấy tiền ra.</p>
          <p className="text-stone-900 font-bold text-xl">Nhưng đường đến tự do tài chính không phải là không bao giờ mua tiêu sản, mà là xây đủ tài sản trước.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
