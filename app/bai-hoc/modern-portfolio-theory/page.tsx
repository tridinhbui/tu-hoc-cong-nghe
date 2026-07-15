"use client";

import { useMemo, useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 52, day: 85, accent: "indigo",
  title: "Lý Thuyết Danh Mục Hiện Đại",
  subtitle: "Modern Portfolio Theory: tương quan, đường biên hiệu quả và phân tán rủi ro",
  duration: "9 phút", difficulty: "Khó", emoji: "📊",
  nextSlug: "finance-as-math", nextTitle: "Tài chính quy về Công thức Toán học",
};

const quiz: QuizQuestion[] = [
  {
    question: "Tương quan âm giữa hai tài sản có nghĩa là gì?",
    options: [
      "Cả hai cùng tăng hoặc cùng giảm",
      "Khi một tài sản tăng, tài sản kia có xu hướng giảm",
      "Hai tài sản không liên quan nhau",
      "Cả hai đều không biến động",
    ],
    correct: 1,
    explanation: "Tương quan là mức độ hai tài sản di chuyển giống hoặc khác nhau. Tương quan âm nghĩa là một tài sản có xu hướng tăng khi tài sản kia giảm, giúp danh mục bớt biến động.",
  },
  {
    question: "Đa dạng hóa giúp giảm loại rủi ro nào?",
    options: [
      "Rủi ro thị trường chung",
      "Rủi ro đặc thù của từng doanh nghiệp/ngành",
      "Tất cả các loại rủi ro",
      "Không giảm loại rủi ro nào",
    ],
    correct: 1,
    explanation: "Đa dạng hóa giảm rủi ro đặc thù như quản lý yếu, sản phẩm thất bại, vụ kiện. Nhưng rủi ro thị trường chung như khủng hoảng kinh tế vẫn ảnh hưởng đến hầu hết tài sản.",
  },
  {
    question: "Đường biên hiệu quả là gì?",
    options: [
      "Danh sách cổ phiếu tốt nhất",
      "Tập hợp các danh mục đạt lợi nhuận kỳ vọng cao nhất với mức rủi ro cho trước",
      "Giới hạn pháp lý về đầu tư",
      "Công thức tính lãi suất ngân hàng",
    ],
    correct: 1,
    explanation: "Đường biên hiệu quả là tập hợp các danh mục tối ưu. Với mỗi mức rủi ro, nó chỉ ra danh mục có lợi nhuận kỳ vọng cao nhất. Danh mục nằm dưới đường này thường kém hiệu quả hơn.",
  },
  {
    question: "Beta của một cổ phiếu đo điều gì?",
    options: [
      "Tỷ suất lợi nhuận tuyệt đối",
      "Mức độ biến động của cổ phiếu so với thị trường chung",
      "Giá trị sổ sách của doanh nghiệp",
      "Số năm doanh nghiệp đã hoạt động",
    ],
    correct: 1,
    explanation: "Beta đo mức độ nhạy cảm của cổ phiếu với biến động thị trường. Beta = 1: cổ phiếu biến động như thị trường. Beta > 1: biến động mạnh hơn thị trường. Beta < 1: biến động ít hơn, ổn định hơn.",
  },
];

const PORTFOLIOS = [
  {
    id: "growth",
    name: "Danh mục tăng trưởng",
    stock: 80,
    bond: 10,
    gold: 10,
  },
  {
    id: "balanced",
    name: "Danh mục cân bằng",
    stock: 60,
    bond: 30,
    gold: 10,
  },
  {
    id: "defensive",
    name: "Danh mục phòng thủ",
    stock: 35,
    bond: 50,
    gold: 15,
  },
];

function PortfolioSimulator() {
  const [selectedId, setSelectedId] = useState("balanced");
  const selected = PORTFOLIOS.find((portfolio) => portfolio.id === selectedId) ?? PORTFOLIOS[1];

  const stats = useMemo(() => {
    const expectedReturn = selected.stock * 0.1 + selected.bond * 0.04 + selected.gold * 0.05;
    const rawRisk = selected.stock * 0.16 + selected.bond * 0.05 + selected.gold * 0.09;
    const diversificationBonus = Math.min(selected.bond, selected.gold) * 0.03 + selected.gold * 0.02;
    const estimatedRisk = Math.max(4, rawRisk / 100 - diversificationBonus / 100);

    return {
      expectedReturn: expectedReturn / 100,
      estimatedRisk,
    };
  }, [selected]);

  return (
    <div className="my-8 rounded-2xl border border-stone-200 bg-gradient-to-br from-indigo-50 to-white p-5">
      <div className="mb-4">
        <h3 className="text-sm font-extrabold uppercase tracking-widest text-indigo-700">Mô phỏng danh mục</h3>
        <p className="mt-1 text-sm leading-relaxed text-stone-600">
          Chọn một cấu trúc danh mục để thấy ngay lợi nhuận kỳ vọng và rủi ro ước tính thay đổi thế nào khi phối hợp tài sản có tương quan khác nhau.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {PORTFOLIOS.map((portfolio) => (
          <button
            key={portfolio.id}
            onClick={() => setSelectedId(portfolio.id)}
            className={`rounded-xl border p-4 text-left transition-all ${
              portfolio.id === selectedId
                ? "border-indigo-400 bg-white shadow-sm"
                : "border-stone-200 bg-stone-50 hover:border-stone-300"
            }`}
          >
            <p className="text-sm font-bold text-stone-900">{portfolio.name}</p>
            <p className="mt-2 text-xs text-stone-500">
              Cổ phiếu {portfolio.stock}% · Trái phiếu {portfolio.bond}% · Vàng {portfolio.gold}%
            </p>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-stone-500 mb-3">Tỷ trọng danh mục</p>
          <div className="overflow-hidden rounded-full bg-stone-100 h-5 flex">
            <div className="bg-indigo-500 h-full" style={{ width: `${selected.stock}%` }} />
            <div className="bg-emerald-500 h-full" style={{ width: `${selected.bond}%` }} />
            <div className="bg-amber-400 h-full" style={{ width: `${selected.gold}%` }} />
          </div>
          <div className="mt-3 grid gap-2 text-sm text-stone-600 sm:grid-cols-3">
            <div><span className="font-bold text-indigo-600">Cổ phiếu</span>: {selected.stock}%</div>
            <div><span className="font-bold text-emerald-600">Trái phiếu</span>: {selected.bond}%</div>
            <div><span className="font-bold text-amber-600">Vàng</span>: {selected.gold}%</div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-stone-600">
            Ở đây cổ phiếu là nguồn lợi nhuận chính, trái phiếu là bộ giảm xóc, còn vàng đóng vai trò đối trọng khi thị trường căng thẳng. Lý thuyết danh mục hiện đại không nói bạn phải luôn cầm đúng 3 tài sản này; nó nói <strong>sự phối hợp giữa các tài sản quan trọng hơn việc nhìn từng món riêng lẻ</strong>.
          </p>
        </div>

        <div className="rounded-xl border border-stone-200 bg-stone-900 p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-wide text-stone-400 mb-3">Ước tính danh mục</p>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-stone-400">Lợi nhuận kỳ vọng</p>
              <p className="text-2xl font-extrabold">{(stats.expectedReturn * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-xs text-stone-400">Rủi ro ước tính</p>
              <p className="text-2xl font-extrabold">{(stats.estimatedRisk * 100).toFixed(1)}%</p>
            </div>
            <p className="text-xs leading-relaxed text-stone-300">
              Rủi ro ở đây chỉ là mô phỏng trực quan để học khái niệm: khi tăng tài sản tăng trưởng, lợi nhuận kỳ vọng tăng nhưng biến động cũng tăng; khi trộn thêm tài sản tương quan thấp, tổng rủi ro có thể giảm nhiều hơn bạn tưởng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Lý thuyết danh mục hiện đại (Modern Portfolio Theory)</h2>
      <p className="text-stone-500 text-sm mb-8">Harry Markowitz, 1952 - danh mục không mạnh vì từng tài sản đều tốt, mà mạnh vì chúng phối hợp với nhau đúng cách</p>

      <section className="mb-10 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-indigo-800 mb-2">Nói đơn giản</h3>
        <p className="text-sm leading-relaxed text-stone-700">
          Đừng chỉ hỏi “mua tài sản nào tốt?”. Hãy hỏi “các tài sản này đi cùng nhau có làm danh mục bớt rung lắc mà vẫn tăng trưởng đủ không?”.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Ý tưởng cốt lõi của lý thuyết danh mục hiện đại</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Lý thuyết danh mục hiện đại bắt đầu từ một quan sát rất đơn giản nhưng cực mạnh: <strong>rủi ro của danh mục không bằng phép cộng rủi ro của từng tài sản</strong>. Nếu bạn ghép những tài sản không di chuyển giống nhau, chúng có thể triệt bớt biến động của nhau.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Đây là điểm khiến lý thuyết này khác tư duy sơ cấp kiểu "mua vài cổ phiếu tốt là đủ". Một doanh nghiệp riêng lẻ có thể tuyệt vời, nhưng danh mục gồm 5 doanh nghiệp cùng ngành, cùng nhạy với lãi suất vẫn có thể rất mong manh. Bài học là nhìn <strong>mối quan hệ giữa các tài sản</strong>, không chỉ nhìn từng tài sản độc lập.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Tương quan: linh hồn của đa dạng hóa</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Tương quan (correlation) đo mức độ hai tài sản di chuyển cùng chiều hay ngược chiều. Giá trị nằm trong khoảng từ -1 đến +1.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "+1",
              body: "Hai tài sản gần như nhảy cùng một điệu. Giữ cả hai gần như không tạo lợi ích đa dạng hóa.",
            },
            {
              title: "0",
              body: "Hai tài sản khá độc lập. Kết hợp chúng giúp danh mục bớt xóc hơn mà không phải hy sinh quá nhiều lợi nhuận kỳ vọng.",
            },
            {
              title: "-1",
              body: "Một tài sản lên khi tài sản kia xuống. Đây là trường hợp lý tưởng về mặt toán học, nhưng hiếm trong đời thực.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-lg font-extrabold text-stone-900 mb-2">{item.title}</p>
              <p className="text-sm leading-relaxed text-stone-600">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="text-stone-600 text-sm leading-relaxed mt-4">
          Ví dụ đời thường: cổ phiếu tăng trưởng, trái phiếu chính phủ và vàng không phải lúc nào cũng đi ngược nhau hoàn toàn, nhưng chúng thường phản ứng khác nhau trước lạm phát, suy thoái, hay hoảng loạn thị trường. Chính "không giống nhau hoàn toàn" đó tạo ra giá trị.
        </p>
      </section>

      <PortfolioSimulator />

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Ví dụ danh mục: vì sao 60/40 có ý nghĩa</h3>
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full min-w-[680px] text-sm">
            <thead className="bg-stone-100 text-stone-700">
              <tr>
                <th className="px-4 py-3 text-left font-bold">Danh mục</th>
                <th className="px-4 py-3 text-left font-bold">Tỷ trọng</th>
                <th className="px-4 py-3 text-left font-bold">Đọc nhanh</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["100% cổ phiếu", "100/0/0", "Return kỳ vọng cao nhưng toàn bộ biến động thị trường dội thẳng vào tài khoản."],
                ["60/40 cổ phiếu - trái phiếu", "60/40/0", "Hy sinh một phần upside để đổi lấy độ ổn định và khả năng sống sót qua chu kỳ."],
                ["60/30/10 thêm vàng", "60/30/10", "Thêm một lớp đối trọng khi thị trường stress hoặc lạm phát tăng."],
              ].map(([name, mix, note], index) => (
                <tr key={name} className={index % 2 === 0 ? "bg-white" : "bg-stone-50/60"}>
                  <td className="px-4 py-3 font-medium text-stone-800">{name}</td>
                  <td className="px-4 py-3 text-stone-600">{mix}</td>
                  <td className="px-4 py-3 text-stone-600">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-stone-600 text-sm leading-relaxed mt-4">
          Điểm hay của 60/40 không phải vì đó là tỷ lệ thần kỳ cho mọi thời đại, mà vì nó minh họa rất rõ tinh thần của lý thuyết danh mục hiện đại: thay vì hỏi "cổ phiếu nào thắng nhất", ta hỏi "mình ghép các tài sản này ra sao để danh mục chịu đựng tốt hơn mà vẫn tăng trưởng đủ".
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Đường biên hiệu quả: vùng của các danh mục hợp lý</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Nếu lấy nhiều tài sản rồi thử hàng trăm cách phân bổ khác nhau, bạn sẽ có hàng trăm cặp lợi nhuận - rủi ro. Một số điểm rõ ràng vô lý: lợi nhuận không hơn bao nhiêu nhưng biến động rất cao. Một số điểm khác tối ưu hơn - đó là vùng đường biên hiệu quả.
        </p>
        <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
          <p className="text-sm leading-relaxed text-stone-700">
            Câu hỏi của lý thuyết này là: <strong>với mức biến động bạn chịu được, đâu là danh mục có lợi nhuận kỳ vọng tốt nhất?</strong>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Danh mục nằm dưới đường biên là danh mục chưa tối ưu: hoặc đang cầm quá nhiều rủi ro cho lợi nhuận không tương xứng, hoặc đang bỏ phí cơ hội tăng lợi nhuận trong khi rủi ro không cao hơn bao nhiêu.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Rủi ro thị trường chung và rủi ro đặc thù</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-stone-200 bg-white p-4">
            <p className="text-sm font-bold text-stone-900 mb-2">Rủi ro đặc thù</p>
            <p className="text-sm leading-relaxed text-stone-600">
              Rủi ro riêng của công ty hoặc ngành: quản trị yếu, sản phẩm lỗi, vụ kiện, mất thị phần. Đây là loại rủi ro có thể giảm đáng kể nhờ đa dạng hóa.
            </p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-4">
            <p className="text-sm font-bold text-stone-900 mb-2">Rủi ro thị trường chung</p>
            <p className="text-sm leading-relaxed text-stone-600">
              Rủi ro của cả hệ thống: lãi suất, suy thoái, panic thị trường, chiến tranh. Loại này không biến mất chỉ vì bạn cầm 20 mã cổ phiếu khác nhau.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-4 uppercase tracking-wide text-xs">Beta và bài học thực chiến</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Beta là cách đo độ nhạy của một tài sản với thị trường chung. Beta lớn hơn 1 nghĩa là thường biến động mạnh hơn thị trường; nhỏ hơn 1 nghĩa là ổn định hơn. Nhưng beta không phải toàn bộ câu chuyện. Một cổ phiếu beta thấp vẫn có thể là khoản đầu tư tệ nếu kinh doanh suy thoái.
        </p>
        <div className="rounded-2xl bg-stone-900 p-5 text-white">
          <p className="font-bold mb-3">Khung nhớ cuối bài</p>
          <div className="space-y-2 text-sm text-stone-300">
            <div>1. Tài sản tốt ghép sai nhau vẫn có thể tạo danh mục tệ.</div>
            <div>2. Tương quan thấp là nhiên liệu của đa dạng hóa.</div>
            <div>3. Đường biên hiệu quả không chọn "tài sản tốt nhất", mà chọn "cách phối hợp hợp lý nhất".</div>
            <div>4. Mục tiêu cuối cùng không phải tối đa hóa lợi nhuận trên giấy, mà là tối ưu lợi nhuận - rủi ro cho con người thật của bạn.</div>
          </div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
