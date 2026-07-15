"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 45, day: 70, accent: "amber",
  title: "Bitcoin rơi về 60k - Crypto có giá trị thật không?",
  subtitle: "Cung cầu, macro, network effect và tâm lý thị trường đằng sau giá coin",
  duration: "6 phút", difficulty: "Trung bình", emoji: "·",
  nextSlug: "pvgas-bad-debt", nextTitle: "Nợ xấu PVGas - Concentration Risk",
};

const quiz: QuizQuestion[] = [
  {
    question: "Nếu hiểu đơn giản, Bitcoin thường được ví gần nhất với hình ảnh nào?",
    options: [
      "Một cổ phiếu trả cổ tức đều mỗi năm",
      "Một loại vàng số có nguồn cung giới hạn",
      "Một stablecoin bám sát giá USD",
      "Một trái phiếu trả lãi cố định",
    ],
    correct: 1,
    explanation: "Bitcoin có tổng cung tối đa 21 triệu đồng - không thể tăng thêm. Vì nguồn cung bị giới hạn và không có tổ chức trung tâm kiểm soát, nhiều người ví nó như 'vàng số': công cụ tích trữ giá trị, không phải tiền tiêu hàng ngày. Khác cổ phiếu (có doanh thu, cổ tức) và bond (có coupon cố định).",
  },
  {
    question: "Stablecoin như USDT hoặc USDC được thiết kế chủ yếu để làm gì?",
    options: [
      "Tăng giảm mạnh hơn Bitcoin",
      "Bám sát giá một tài sản tham chiếu, thường là USD",
      "Trả cổ tức cho người nắm giữ",
      "Đại diện quyền sở hữu trong một công ty",
    ],
    correct: 1,
    explanation: "Stablecoin cố giữ giá trị ổn định, thường 1 stablecoin = 1 USD. Khác Bitcoin có thể dao động vài chục % trong thời gian ngắn. Điều quan trọng cần kiểm tra là tài sản bảo chứng phía sau (tiền mặt, trái phiếu chính phủ?) và liệu đơn vị phát hành có được kiểm toán không.",
  },
  {
    question: "Khi mua bán crypto, yếu tố nào dưới đây thường có ảnh hưởng lớn?",
    options: [
      "Cung cầu, macro, dòng tiền tổ chức và tâm lý thị trường",
      "Chỉ báo cáo lợi nhuận hàng quý",
      "Chỉ cổ tức tiền mặt",
      "Chỉ điểm tín dụng cá nhân của người mua",
    ],
    correct: 0,
    explanation: "Crypto không có cash flow như cổ phiếu nên không định giá theo DCF. Giá phụ thuộc vào: (1) cung cầu - Bitcoin nguồn cung cố định, khi demand tăng giá tăng mạnh; (2) macro - lãi suất, thanh khoản, Fed policy; (3) dòng tiền tổ chức - ETF, quỹ vào thị trường; (4) tâm lý - greed/fear cycle rất rõ trong crypto.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Bitcoin rơi về 60k - Crypto có giá trị thật không?</h2>
      <p className="text-stone-500 text-sm mb-8">Nhìn crypto từ góc độ tài chính - không phải speculation</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Từ đầu - tiền và tài sản tài chính dựa trên gì?</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Bất kỳ hệ thống tài chính nào cũng xoay quanh 4 câu hỏi: Ai ghi nhận quyền sở hữu? Ai xác nhận giao dịch? Ai được quyền sửa sổ? Và vì sao người khác tin tài sản đó có giá trị?
        </p>
        <p className="text-stone-600 leading-relaxed">
          Tài chính truyền thống tin vào ngân hàng, sàn giao dịch, nhà nước. Crypto thử xây một hệ thống khác: giao dịch được ghi lại trên <strong>mạng lưới chung</strong>, nhiều người cùng xác nhận thay vì phụ thuộc vào một bên trung gian.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Crypto là cả khu chợ - Bitcoin chỉ là một quầy</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Nhầm lẫn phổ biến nhất: đồng nhất crypto với Bitcoin. Crypto là cả thị trường tài sản số. Bitcoin chỉ là đồng đầu tiên và nổi tiếng nhất.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Bitcoin (BTC)", desc: "Đồng đầu tiên, nguồn cung giới hạn 21M, thường ví như vàng số" },
            { name: "Ethereum (ETH)", desc: "Nền tảng smart contract, gas fee, DeFi ecosystem" },
            { name: "Stablecoin (USDT/USDC)", desc: "Bám sát USD, dùng trong payments và trading" },
            { name: "Altcoins", desc: "Solana, BNB, và hàng nghìn đồng khác - rủi ro cao hơn rất nhiều" },
          ].map(s => (
            <div key={s.name} className="border border-stone-200 rounded-xl p-3">
              <div className="font-semibold text-stone-800 text-xs mb-1">{s.name}</div>
              <div className="text-stone-500 text-xs">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Tại sao Bitcoin được mua bán?</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Bitcoin không tạo ra cash flow như cổ phiếu, không trả coupon như bond. Vậy giá dựa trên gì?
        </p>
        <div className="space-y-3">
          {[
            {
              factor: "Cung cầu",
              desc: "Nguồn cung Bitcoin bị giới hạn cứng ở 21 triệu đồng. Khi nhu cầu tăng mà cung không đổi, giá tăng mạnh - và ngược lại. Halving (giảm phần thưởng đào coin) làm tốc độ cung mới giảm theo thời gian.",
            },
            {
              factor: "Macro và lãi suất",
              desc: "Crypto nhạy cảm với môi trường tiền rẻ. Khi Fed cắt giảm lãi suất, dòng tiền vào tài sản rủi ro tăng. Khi Fed tăng lãi suất, crypto thường giảm cùng với các tài sản risk-on khác.",
            },
            {
              factor: "Dòng tiền tổ chức",
              desc: "Bitcoin ETF, quỹ đầu tư lớn, công ty đưa Bitcoin vào balance sheet (như MicroStrategy). Khi tổ chức vào, thị trường có thêm legitimacy và thanh khoản - nhưng cũng thêm correlation với thị trường truyền thống.",
            },
            {
              factor: "Network effect",
              desc: "Một blockchain càng có nhiều người dùng, developer, app và thanh khoản, thì câu chuyện giá trị càng có cơ sở. Đây là lý do Bitcoin và Ethereum vẫn dominant dù có hàng nghìn đồng khác.",
            },
            {
              factor: "Tâm lý thị trường",
              desc: "Greed và fear thể hiện rất rõ trong crypto. Giá không chỉ phản ánh công nghệ mà còn phản ánh kỳ vọng, FOMO, và ảo giác làm giàu nhanh. Fear & Greed Index là công cụ nhiều trader dùng để gauge sentiment.",
            },
          ].map(s => (
            <div key={s.factor} className="border-l-2 border-stone-200 pl-4 py-1">
              <div className="font-semibold text-stone-800 text-sm mb-0.5">{s.factor}</div>
              <p className="text-stone-500 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Stablecoin - gần tài chính truyền thống hơn</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Stablecoin được thiết kế để giữ giá ổn định, thường 1 stablecoin = 1 USD. Khác Bitcoin có thể dao động vài chục % trong ngày, stablecoin cố gắng giữ nguyên giá trị.
        </p>
        <p className="text-stone-600 leading-relaxed mb-3">
          Khi tìm hiểu stablecoin, điều quan trọng không chỉ là blockchain mà là: <strong>tài sản bảo chứng phía sau là gì?</strong> (tiền mặt, trái phiếu chính phủ, hay tài sản khác) - có đủ tiền để đổi lại 1 USD khi người dùng muốn rút không - và đơn vị phát hành có được kiểm toán không?
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-stone-200 rounded-xl p-3">
            <div className="font-semibold text-stone-800 text-xs mb-1">Bitcoin</div>
            <div className="text-stone-500 text-xs">Thường được tranh luận như một tài sản đầu tư, store of value</div>
          </div>
          <div className="border border-stone-200 rounded-xl p-3">
            <div className="font-semibold text-stone-800 text-xs mb-1">Stablecoin</div>
            <div className="text-stone-500 text-xs">Gần với công cụ thanh toán hơn - đang được nhắc nhiều trong tài chính truyền thống</div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-3 uppercase tracking-wide text-xs">Chuyện người giàu lên từ crypto</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          Có người giàu lên từ crypto là hoàn toàn có thật - vào sớm, chọn đúng tài sản, giữ qua đúng chu kỳ tăng mạnh. Nhưng đây cũng là phần dễ tạo ảo giác nhất. <strong>Cùng một cơ chế đó, rất nhiều người mất tiền rất nhanh.</strong>
        </p>
        <p className="text-stone-600 text-sm leading-relaxed">
          Crypto có upside lớn nhưng downside cũng rất lớn. Volatility không phân biệt người mới và người có kinh nghiệm.
        </p>
      </section>
    </LessonPageLayout>
  );
}
