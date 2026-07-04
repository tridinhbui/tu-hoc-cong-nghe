"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 52, day: 85, accent: "indigo",
  title: "Modern Portfolio Theory",
  subtitle: "Tương quan, đường biên hiệu quả và phân tán rủi ro",
  duration: "7 phút", difficulty: "Khó", emoji: "·",
  nextSlug: "finance-as-math", nextTitle: "Tài chính quy về Công thức Toán học",
};

const quiz: QuizQuestion[] = [
  {
    question: "Tương quan (correlation) âm giữa hai tài sản có nghĩa là gì?",
    options: [
      "Cả hai cùng tăng hoặc cùng giảm",
      "Khi một tài sản tăng, tài sản kia có xu hướng giảm",
      "Hai tài sản không liên quan nhau",
      "Cả hai đều không biến động",
    ],
    correct: 1,
    explanation: "Correlation âm (-1 đến 0) nghĩa là hai tài sản di chuyển ngược chiều nhau. Khi kết hợp trong danh mục, chúng giúp đối trọng nhau — giảm tổng biến động. Đây là nguyên lý cốt lõi của đa dạng hóa.",
  },
  {
    question: "Diversification (đa dạng hóa) giúp giảm loại rủi ro nào?",
    options: [
      "Systematic risk — rủi ro thị trường chung",
      "Unsystematic risk — rủi ro đặc thù của từng doanh nghiệp/ngành",
      "Tất cả các loại rủi ro",
      "Không giảm loại rủi ro nào",
    ],
    correct: 1,
    explanation: "Đa dạng hóa giảm unsystematic risk (rủi ro đặc thù: quản lý yếu, sản phẩm thất bại, vụ kiện...) vì các rủi ro này không xảy ra cùng lúc. Nhưng systematic risk (thị trường chung sập, khủng hoảng kinh tế) không giảm được bằng đa dạng hóa — nó ảnh hưởng đến tất cả.",
  },
  {
    question: "Efficient Frontier là gì?",
    options: [
      "Danh sách cổ phiếu tốt nhất",
      "Tập hợp các danh mục đạt return cao nhất với mức rủi ro cho trước",
      "Giới hạn pháp lý về đầu tư",
      "Công thức tính lãi suất ngân hàng",
    ],
    correct: 1,
    explanation: "Efficient Frontier là tập hợp các danh mục tối ưu — với mỗi mức rủi ro (standard deviation), chỉ có một danh mục đạt expected return cao nhất. Danh mục nằm ngoài đường biên này là kém hiệu quả: hoặc return thấp hơn với cùng risk, hoặc risk cao hơn với cùng return.",
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
    explanation: "Beta đo mức độ nhạy cảm của cổ phiếu với biến động thị trường. Beta = 1: cổ phiếu biến động như thị trường. Beta > 1: biến động mạnh hơn thị trường (tăng nhiều hơn khi thị trường lên, giảm nhiều hơn khi thị trường xuống). Beta < 1: biến động ít hơn, ổn định hơn.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Modern Portfolio Theory</h2>
      <p className="text-stone-500 text-sm mb-8">Harry Markowitz, 1952 — danh mục hiệu quả là gì và tại sao đa dạng hóa có giá trị</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Ý tưởng cốt lõi</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Một danh mục tốt không chỉ là tập hợp các cổ phiếu tốt. Đặt cạnh nhau các tài sản biến động theo những chiều khác nhau — khi một cái xuống thì cái khác ổn hoặc lên — có thể tạo ra danh mục có rủi ro thấp hơn từng tài sản riêng lẻ, với cùng mức lợi nhuận kỳ vọng.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Đây là nền tảng của <strong>Modern Portfolio Theory (MPT)</strong>: không nhìn rủi ro của từng cổ phiếu riêng lẻ, mà nhìn rủi ro của cả danh mục — và tối ưu hóa tỷ lệ phân bổ để đạt return cao nhất với risk thấp nhất.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Correlation — tương quan giữa các tài sản</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Correlation đo mức độ hai tài sản di chuyển cùng chiều hay ngược chiều. Giá trị từ -1 đến +1.
        </p>
        <div className="space-y-2 text-sm text-stone-600">
          <div><strong>+1:</strong> Tương quan hoàn toàn thuận — luôn tăng giảm cùng chiều. Không có lợi ích đa dạng hóa.</div>
          <div><strong>0:</strong> Không tương quan — biến động độc lập. Đa dạng hóa có lợi ích.</div>
          <div><strong>-1:</strong> Tương quan hoàn toàn nghịch — một lên thì cái kia xuống. Lý tưởng để giảm biến động.</div>
        </div>
        <p className="text-stone-600 text-xs mt-3">
          Ví dụ: cổ phiếu và vàng có tương quan thấp. Khi cổ phiếu sụt, vàng thường giữ giá hoặc tăng — tạo đối trọng.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Efficient Frontier — đường biên hiệu quả</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          Với một tập hợp tài sản, có vô số cách phân bổ tỷ trọng. Mỗi cách tạo ra một danh mục với expected return và risk (standard deviation) khác nhau.
        </p>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          <strong>Efficient Frontier</strong> là tập hợp các danh mục đạt return cao nhất với mỗi mức risk — hoặc risk thấp nhất với mỗi mức return. Danh mục nằm trong đường biên này là kém hiệu quả: có thể đạt cùng return với risk thấp hơn, hoặc return cao hơn với cùng risk.
        </p>
        <div className="border border-stone-200 rounded-xl p-4 text-sm text-stone-600">
          Ý nghĩa thực tế: khi xây danh mục, câu hỏi không phải "chọn tài sản tốt nhất" mà là "phân bổ như thế nào để danh mục nằm trên Efficient Frontier."
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Systematic vs Unsystematic Risk</h3>
        <div className="space-y-3 text-sm text-stone-600">
          <div>
            <strong>Systematic Risk — rủi ro thị trường</strong>
            <p className="mt-1">Ảnh hưởng toàn bộ thị trường: khủng hoảng kinh tế, lãi suất tăng, chiến tranh, đại dịch. Không giảm được bằng đa dạng hóa — mọi cổ phiếu đều bị ảnh hưởng.</p>
          </div>
          <div>
            <strong>Unsystematic Risk — rủi ro đặc thù</strong>
            <p className="mt-1">Riêng của từng doanh nghiệp: CEO từ chức, sản phẩm thất bại, vụ kiện, bê bối. Giảm được bằng đa dạng hóa — nắm nhiều cổ phiếu khác nhau sẽ triệt tiêu những rủi ro này.</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Beta — độ nhạy cảm với thị trường</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          Beta đo mức độ biến động của cổ phiếu so với thị trường chung. Cách đo lường systematic risk.
        </p>
        <div className="space-y-2 text-sm text-stone-600">
          <div><strong>Beta &gt; 1:</strong> Công nghệ, startup — biến động mạnh hơn thị trường, tiềm năng cao nhưng risk cao</div>
          <div><strong>Beta = 1:</strong> Biến động như thị trường</div>
          <div><strong>Beta &lt; 1:</strong> Tiện ích công cộng, y tế — ổn định, ít biến động hơn thị trường</div>
          <div><strong>Beta âm:</strong> Vàng, quỹ hedge — di chuyển ngược chiều thị trường</div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
