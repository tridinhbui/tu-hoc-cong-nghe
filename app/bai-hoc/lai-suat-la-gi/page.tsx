"use client";

import Image from "next/image";
import Link from "next/link";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const LESSON: LessonMeta = {
  id: 6, day: 6, accent: "stone",
  title: "Lãi suất là gì? Vì sao lãi suất ảnh hưởng mọi thứ.",
  subtitle: "Lãi suất là giá của tiền. Khi nó thay đổi, mọi quyết định tài chính trong nền kinh tế đều bị ảnh hưởng.",
  duration: "7 phút", difficulty: "Dễ", emoji: "·",
  nextSlug: "lai-don-lai-kep", nextTitle: "Day 7: Lãi đơn và lãi kép",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Ngân hàng Nhà nước tăng lãi suất điều hành từ 4% lên 6%. Điều gì sẽ xảy ra?",
    options: [
      "Giá cổ phiếu tăng vì ngân hàng khỏe hơn",
      "Vay tiền mua nhà đắt hơn; gửi tiết kiệm hấp dẫn hơn; doanh nghiệp đầu tư thận trọng hơn",
      "Không ảnh hưởng đến người bình thường vì đó là lãi suất liên ngân hàng",
      "Lạm phát sẽ tăng ngay lập tức",
    ],
    correct: 1,
    explanation: "Lãi suất là giá của tiền trong nền kinh tế. Khi tăng: vay đắt hơn, tiết kiệm hấp dẫn hơn, doanh nghiệp đầu tư ít hơn, giá tài sản chịu áp lực giảm.",
  },
  {
    question: "Tại sao ngân hàng trung ương tăng lãi suất khi lạm phát cao?",
    options: [
      "Để ngân hàng thương mại kiếm nhiều tiền hơn",
      "Để làm chậm chi tiêu và đầu tư, giảm áp lực cầu, từ đó hạ nhiệt lạm phát",
      "Để thu hút đầu tư nước ngoài vào trái phiếu",
      "Vì đó là quy trình bắt buộc của IMF",
    ],
    correct: 1,
    explanation: "Lãi suất cao làm vay đắt hơn, tiết kiệm hấp dẫn hơn, người tiêu dùng và doanh nghiệp chi tiêu ít hơn. Cầu giảm thì giá hạ nhiệt. Đây là cơ chế chống lạm phát cơ bản.",
  },
  {
    question: "Lãi suất thực (real interest rate) là gì?",
    options: [
      "Lãi suất ngân hàng công bố chính thức",
      "Lãi suất danh nghĩa trừ đi tỷ lệ lạm phát",
      "Lãi suất sau khi tính thuế thu nhập",
      "Lãi suất của ngân hàng trung ương",
    ],
    correct: 1,
    explanation: "Lãi suất thực = lãi suất danh nghĩa - lạm phát. Nếu ngân hàng trả 6%/năm nhưng lạm phát 7%, lãi suất thực là âm 1%. Bạn thực ra đang mất tiền dù được trả lãi.",
  },
];

const CONCEPTS = [
  { vi: "Lãi suất danh nghĩa", en: "Nominal Interest Rate", def: "Lãi suất được công bố, chưa tính đến lạm phát" },
  { vi: "Lãi suất thực", en: "Real Interest Rate", def: "Lãi suất danh nghĩa trừ lạm phát; phản ánh sức mua thực tăng hay giảm" },
  { vi: "Lãi suất điều hành", en: "Policy Rate", def: "Lãi suất do ngân hàng trung ương đặt ra để điều tiết chi phí vốn toàn nền kinh tế" },
  { vi: "Lãi suất cho vay", en: "Lending Rate", def: "Lãi suất ngân hàng thương mại áp dụng khi cho vay; thường cao hơn lãi suất điều hành" },
  { vi: "Đường cong lãi suất", en: "Yield Curve", def: "Biểu đồ lãi suất theo kỳ hạn; bình thường dốc lên, đảo ngược thường báo hiệu suy thoái" },
];

const TAKEAWAYS = [
  "Lãi suất là giá của tiền: tăng thì vay đắt hơn, tiết kiệm hấp dẫn hơn, tài sản chịu áp lực giảm giá.",
  "Ngân hàng trung ương dùng lãi suất làm công cụ chính để kiểm soát lạm phát và tăng trưởng.",
  "Lãi suất thực = lãi suất danh nghĩa trừ lạm phát; đây mới là thước đo sinh lời thực sự.",
  "Khi lãi suất tăng, định giá mọi tài sản (cổ phiếu, bất động sản, trái phiếu) đều bị ảnh hưởng.",
];

export default function LaiSuatLaGiPage() {
  return (
    <LessonPageLayout lesson={LESSON} quiz={QUIZ}>
      <div className="space-y-10 text-stone-700 leading-relaxed text-lg">

        <p className="text-xl leading-relaxed">
          Nếu tài chính có một khái niệm quan trọng nhất mà mọi người cần hiểu, đó có thể là lãi suất. Không phải vì nó phức tạp, mà vì nó ảnh hưởng đến mọi quyết định tài chính, từ việc bạn có nên gửi tiết kiệm hay không, đến giá bất động sản, đến định giá cổ phiếu, đến tỷ giá hối đoái.
        </p>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Lãi suất là giá của tiền</h3>
          <p>
            Trong nền kinh tế thị trường, mọi thứ đều có giá. Lao động có mức lương. Hàng hóa có giá bán. Và tiền cũng có giá, đó chính là <strong className="text-stone-900">lãi suất</strong>.
          </p>
          <p>
            Khi bạn vay tiền, bạn đang thuê tiền của người khác trong một khoảng thời gian. Lãi suất là chi phí thuê đó. Khi bạn gửi tiết kiệm, bạn đang cho ngân hàng thuê tiền của bạn. Lãi suất là khoản thu bạn nhận được.
          </p>
          <p>
            Giá của tiền không phải cố định mà thay đổi theo cung cầu vốn trong nền kinh tế, kỳ vọng lạm phát, và quyết định của ngân hàng trung ương.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Lãi suất tăng kéo theo điều gì</h3>
          <p>
            Khi lãi suất tăng, phản ứng dây chuyền diễn ra trên toàn nền kinh tế:
          </p>
          <ul className="space-y-3 pl-1">
            {[
              { bold: "Vay tiền đắt hơn", rest: ": tiền góp mua nhà tăng, doanh nghiệp trả lãi nhiều hơn, chi phí tín dụng tiêu dùng tăng" },
              { bold: "Tiết kiệm hấp dẫn hơn", rest: ": lãi suất gửi ngân hàng tăng, người dân có xu hướng tiết kiệm thay vì chi tiêu" },
              { bold: "Đầu tư thận trọng hơn", rest: ": doanh nghiệp tính lại dự án vì chi phí vốn cao hơn, nhiều dự án không còn khả thi" },
              { bold: "Giá tài sản chịu áp lực", rest: ": cổ phiếu, bất động sản thường giảm giá khi lãi suất tăng vì discount rate tăng" },
            ].map(({ bold, rest }) => (
              <li key={bold} className="flex items-start gap-3 text-stone-600 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span><strong className="text-stone-900">{bold}</strong>{rest}</span>
              </li>
            ))}
          </ul>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Ví dụ thực tế: Fed 2022-2023</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Cục Dự trữ Liên bang Mỹ tăng lãi suất từ 0.25% lên 5.25% trong vòng 18 tháng để chống lạm phát. Kết quả: lãi suất thế chấp nhà tăng từ 3% lên 7%, cổ phiếu công nghệ giảm 40-70%, và hàng loạt doanh nghiệp startup phải cắt giảm nhân sự vì chi phí vốn tăng quá cao.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Ngân hàng trung ương và lãi suất điều hành</h3>
          <p>
            Ngân hàng Nhà nước Việt Nam, Cục Dự trữ Liên bang Mỹ (Fed), Ngân hàng Trung ương Châu Âu (ECB) đều có một công cụ chính để điều tiết nền kinh tế: lãi suất điều hành.
          </p>
          <p>
            Khi lạm phát cao, ngân hàng trung ương tăng lãi suất điều hành. Chi phí vay vốn tăng, người dân và doanh nghiệp chi tiêu ít hơn, cầu trong nền kinh tế giảm xuống, giá cả hạ nhiệt.
          </p>
          <p>
            Khi kinh tế suy thoái, ngân hàng trung ương giảm lãi suất. Vay vốn rẻ hơn, chi tiêu và đầu tư tăng, kinh tế phục hồi.
          </p>
          <p>
            Đây là công cụ mạnh nhất trong tay các ngân hàng trung ương, nhưng cũng có độ trễ đáng kể. Thay đổi lãi suất hôm nay thường mất 12-18 tháng để lan thấm hết qua nền kinh tế.
          </p>
        </section>

        <section className="space-y-5">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Lãi suất thực: thước đo đúng hơn</h3>
          <p>
            Lãi suất ngân hàng bạn thấy trên bảng quảng cáo là <strong className="text-stone-900">lãi suất danh nghĩa</strong>. Nhưng con số quan trọng hơn là <strong className="text-stone-900">lãi suất thực</strong>, tức là phần tăng sức mua thật sự sau khi trừ đi lạm phát.
          </p>
          <p>
            Nếu ngân hàng trả 7% mỗi năm và lạm phát là 4%, lãi suất thực là 3%. Sức mua của bạn thực sự tăng 3% mỗi năm, không phải 7%.
          </p>
          <p>
            Nguy hiểm hơn là khi lãi suất danh nghĩa thấp hơn lạm phát. Nếu ngân hàng trả 4% nhưng lạm phát 6%, lãi suất thực là âm 2%. Dù tiền trong tài khoản tăng về số, sức mua thực của bạn đang giảm mỗi năm.
          </p>

          <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Lạm phát là gì, nói ngắn gọn</p>
            <p className="text-stone-700 text-base leading-relaxed">
              Lạm phát là mức độ giá cả hàng hoá, dịch vụ tăng lên theo thời gian - cùng một số tiền, sau này mua được ít hơn. Đó là lý do "lãi suất danh nghĩa" (con số ngân hàng công bố) không đủ để biết bạn thực sự lời hay lỗ: phải trừ đi phần giá cả đã tăng (lạm phát) mới ra "lãi suất thực" - con số phản ánh đúng sức mua của bạn. Bài <Link href="/bai-hoc/lam-phat-la-gi" className="underline font-semibold text-stone-900">Lạm phát là gì? Vì sao tiền mất giá</Link> (Day 9) sẽ đi sâu vào khái niệm này.
            </p>
          </div>
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
              src="/lessons/day6-lai-suat-la-gi.png"
              alt="Tóm tắt trực quan Day 6"
              width={1024}
              height={1536}
              className="w-full h-auto"
            />
          </div>
        </div>


        <div className="text-center space-y-2 py-4">
          <p className="text-stone-500 text-base">Lãi suất là giá của tiền.</p>
          <p className="text-stone-900 font-bold text-xl">Khi giá của tiền thay đổi, mọi quyết định trong nền kinh tế đều phải điều chỉnh theo.</p>
        </div>

      </div>
    </LessonPageLayout>
  );
}
