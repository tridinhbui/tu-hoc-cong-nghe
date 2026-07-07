"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 54, day: 87, accent: "teal",
  title: "Samsung Q1/2026 - AI qua Lăng kính Tài chính",
  subtitle: "HBM, memory cycle, pricing power và capex AI",
  duration: "6 phút", difficulty: "Trung bình", emoji: "·",
  nextSlug: "fcf-deep-dive", nextTitle: "Free Cash Flow - Đọc sâu hơn",
};

const quiz: QuizQuestion[] = [
  {
    question: "Vì sao HBM (High Bandwidth Memory) quan trọng với Samsung trong chu kỳ AI hiện tại?",
    options: [
      "Vì HBM rẻ hơn bộ nhớ thông thường",
      "Vì HBM là loại bộ nhớ được AI chip yêu cầu, biên lợi nhuận cao hơn và Samsung đang bị mất thị phần vào SK Hynix",
      "Vì HBM dùng cho điện thoại di động",
      "Vì HBM không liên quan đến AI",
    ],
    correct: 1,
    explanation: "HBM là bộ nhớ tốc độ cao dùng trong GPU AI (NVIDIA H100/H200). SK Hynix đang dẫn đầu HBM trong khi Samsung gặp vấn đề về yield và chứng nhận. Đây là lý do Samsung bị mất market share trong phân khúc có biên lợi nhuận cao nhất của ngành memory.",
  },
  {
    question: "Memory cycle (chu kỳ bộ nhớ) ảnh hưởng thế nào đến tài chính Samsung?",
    options: [
      "Không ảnh hưởng vì Samsung sản xuất nhiều loại sản phẩm",
      "Ảnh hưởng trực tiếp - khi giá DRAM/NAND giảm, doanh thu và biên lợi nhuận của DS division giảm mạnh",
      "Chỉ ảnh hưởng đến nhà cung cấp chip nhỏ",
      "Memory cycle chỉ quan trọng với ngành ô tô",
    ],
    correct: 1,
    explanation: "DS (Device Solutions) division là phần lớn nhất và biến động nhất của Samsung. Khi memory cycle xuống: giá DRAM/NAND rơi, inventory tích lũy, biên lợi nhuận âm. Khi cycle lên: pricing power quay lại, biên phục hồi mạnh. Samsung là ví dụ điển hình của doanh nghiệp cyclical.",
  },
  {
    question: "Pricing power trong ngành semiconductor liên quan đến điều gì?",
    options: [
      "Chỉ phụ thuộc vào giá USD",
      "Khả năng đặt giá cao khi nhu cầu vượt cung - đặc biệt khi sản phẩm là thành phần thiết yếu không thể thay thế",
      "Số lượng nhà máy đang xây dựng",
      "Số nhân viên nghiên cứu phát triển",
    ],
    correct: 1,
    explanation: "Pricing power xuất hiện khi: cung thắt chặt (capex chu kỳ trước thấp), nhu cầu bùng nổ (AI boom), và khách hàng không có lựa chọn thay thế. HBM là ví dụ: chỉ 3 nhà sản xuất toàn cầu (Samsung, SK Hynix, Micron), AI lab sẵn sàng trả premium để có chip đúng hạn.",
  },
  {
    question: "Khi AI hyperscalers (Microsoft, Google, Meta) tăng mạnh capex, đọc từ góc độ tài chính thì có thể gợi ý điều gì?",
    options: [
      "Các công ty AI đang thua lỗ",
      "Nhu cầu AI chip và hạ tầng mạnh - có thể tạo ra chu kỳ tăng cho nhà cung cấp semiconductor và data center",
      "Thị trường cổ phiếu sắp sập",
      "Không có ý nghĩa tài chính",
    ],
    correct: 1,
    explanation: "Capex của hyperscalers là leading indicator cho chuỗi cung ứng AI. Microsoft/Google/Meta/Amazon đầu tư mạnh vào data center → nhu cầu AI chip (NVIDIA GPU, HBM) tăng → nhu cầu điện, làm mát, cáp quang tăng. Nhà đầu tư theo dõi capex guidance của hyperscalers để dự báo chu kỳ của các ngành liên quan.",
  },
  {
    question: "Samsung Q1/2026 có thể nhìn như 'case study' về điều gì?",
    options: [
      "Cách đọc một doanh nghiệp thuần túy công nghệ",
      "Cách phân tích công ty trong hai xu hướng: tốt (AI capex boom) và xấu (HBM market share loss, memory cycle) cùng lúc",
      "Cách đầu tư vào cổ phiếu Mỹ",
      "Cách đọc ngân hàng",
    ],
    correct: 1,
    explanation: "Samsung là ví dụ thực tế của việc phân tích không chỉ nhìn một chiều. Cùng lúc có tailwind (AI capex bùng nổ, smartphone phục hồi) và headwind (HBM yield issue, SK Hynix dẫn đầu, legacy memory inventory). Phân tích tốt là đọc được cả hai và đánh giá phần nào mạnh hơn.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Samsung Q1/2026 - AI qua Lăng kính Tài chính</h2>
      <p className="text-stone-500 text-sm mb-8">HBM, memory cycle và cách đọc doanh nghiệp semiconductor trong chu kỳ AI</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Samsung không phải chỉ là điện thoại</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Phần lớn mọi người biết Samsung qua điện thoại Galaxy. Nhưng về mặt tài chính, phần quan trọng nhất - và biến động nhất - của Samsung là <strong>DS Division (Device Solutions)</strong>: chip nhớ (DRAM, NAND) và chip logic.
        </p>
        <p className="text-stone-600 leading-relaxed">
          DS Division là một trong những ví dụ điển hình nhất của ngành <strong>cyclical</strong>: lợi nhuận có thể dao động từ hàng trăm nghìn tỷ won một năm xuống lỗ lớn năm sau, tùy vào chu kỳ bộ nhớ.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">HBM - Thị trường Samsung đang thua</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          High Bandwidth Memory (HBM) là loại bộ nhớ tốc độ cao, cần thiết cho GPU AI (NVIDIA H100, H200, B100). Đây là phân khúc có <strong>biên lợi nhuận cao nhất</strong> trong ngành memory - và nhu cầu bùng nổ cùng với AI.
        </p>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Vấn đề: <strong>SK Hynix đang dẫn đầu HBM</strong> trong khi Samsung gặp vấn đề về yield và thời gian chứng nhận từ NVIDIA. Samsung đứng trước áp lực phải lấy lại thị phần trong phân khúc quan trọng nhất của chu kỳ AI này.
        </p>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-stone-100">
              <tr>
                <th className="p-3 text-left font-semibold text-stone-500">Chỉ tiêu</th>
                <th className="p-3 text-center font-semibold text-stone-500">Samsung</th>
                <th className="p-3 text-center font-semibold text-stone-500">SK Hynix</th>
              </tr>
            </thead>
            <tbody>
              {[
                { item: "HBM Market Share (2024-2025)", sam: "~30%", ski: "~50%+" },
                { item: "HBM3E Certification (NVIDIA)", sam: "Chậm hơn", ski: "Đầu tiên" },
                { item: "DRAM Market Share (tổng)", sam: "~40%", ski: "~30%" },
              ].map((r, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                  <td className="p-3 text-stone-600">{r.item}</td>
                  <td className="p-3 text-center text-stone-600">{r.sam}</td>
                  <td className="p-3 text-center text-stone-800 font-semibold">{r.ski}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Memory Cycle - Ngành Cyclical</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          Giá DRAM và NAND không ổn định - dao động theo chu kỳ cung-cầu. Khi nhu cầu vượt cung: giá tăng, biên lợi nhuận phục hồi mạnh. Khi cung vượt nhu cầu: giá rơi, biên âm, nhà sản xuất lỗ.
        </p>
        <div className="space-y-2 text-sm">
          {[
            { phase: "Cycle xuống (2022-2023)", desc: "Giá DRAM/NAND rơi mạnh, Samsung DS lỗ kỷ lục, cutback capex" },
            { phase: "Cycle phục hồi (2024)", desc: "Giá phục hồi, AI demand kéo HBM, DS quay lại có lãi" },
            { phase: "Q1/2026", desc: "AI capex boom tiếp tục, nhưng legacy memory inventory vẫn là câu hỏi" },
          ].map(s => (
            <div key={s.phase} className="border-l-2 border-stone-300 pl-3 py-1">
              <div className="font-semibold text-stone-800 text-xs">{s.phase}</div>
              <div className="text-stone-500 text-xs">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">AI Capex Boom - Đọc theo chuỗi cung ứng</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Microsoft, Google, Meta, Amazon tăng capex cho AI data center. Capex của hyperscalers là leading indicator cho cả chuỗi cung ứng AI.
        </p>
        <div className="space-y-1 text-sm text-stone-600">
          <div> - Hyperscaler tăng capex → đặt hàng GPU NVIDIA</div>
          <div> - NVIDIA đặt hàng HBM → SK Hynix/Samsung hưởng lợi</div>
          <div> - Nhu cầu điện, làm mát tăng → ngành năng lượng, cơ sở hạ tầng</div>
          <div> - Data center xây dựng → bất động sản công nghiệp, cáp quang</div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Đọc Samsung = Đọc hai chiều</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-stone-100 border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800 mb-2">Tốt</div>
            <div className="space-y-1 text-stone-700">
              <div>AI capex tăng mạnh</div>
              <div>Smartphone phục hồi</div>
              <div>Memory pricing phục hồi</div>
            </div>
          </div>
          <div className="bg-stone-100 border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800 mb-2">Xấu</div>
            <div className="space-y-1 text-stone-700">
              <div>HBM yield kém vs SK Hynix</div>
              <div>Memory oversupply</div>
              <div>Foundry cạnh tranh TSMC</div>
            </div>
          </div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
