"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 54, day: 87, accent: "teal",
  title: "Samsung Q1/2026 - AI qua Lăng kính Tài chính",
  subtitle: "Bộ nhớ tốc độ cao, chu kỳ chip nhớ, quyền lực định giá và đầu tư hạ tầng AI",
  duration: "6 phút", difficulty: "Trung bình", emoji: "·",
  nextSlug: "fcf-deep-dive", nextTitle: "Dòng tiền tự do - Đọc sâu hơn",
};

const quiz: QuizQuestion[] = [
  {
    question: "Vì sao HBM (High Bandwidth Memory) quan trọng với Samsung trong chu kỳ AI hiện tại?",
    options: [
      "Vì HBM rẻ hơn bộ nhớ thông thường",
      "Vì HBM là loại bộ nhớ tốc độ cao mà chip AI cần, biên lợi nhuận cao hơn và Samsung đang bị mất thị phần vào SK Hynix",
      "Vì HBM dùng cho điện thoại di động",
      "Vì HBM không liên quan đến AI",
    ],
    correct: 1,
    explanation: "HBM là bộ nhớ băng thông cao, tức bộ nhớ tốc độ rất cao dùng cùng GPU AI. GPU là chip xử lý đồ họa/AI. SK Hynix đang dẫn đầu HBM trong khi Samsung gặp vấn đề về tỷ lệ chip đạt chuẩn và chứng nhận từ NVIDIA.",
  },
  {
    question: "Chu kỳ bộ nhớ ảnh hưởng thế nào đến tài chính Samsung?",
    options: [
      "Không ảnh hưởng vì Samsung sản xuất nhiều loại sản phẩm",
      "Ảnh hưởng trực tiếp - khi giá DRAM/NAND giảm, doanh thu và biên lợi nhuận mảng chip nhớ giảm mạnh",
      "Chỉ ảnh hưởng đến nhà cung cấp chip nhỏ",
      "Memory cycle chỉ quan trọng với ngành ô tô",
    ],
    correct: 1,
    explanation: "Chu kỳ bộ nhớ là vòng lên xuống của giá chip nhớ theo cung-cầu. Khi giá DRAM/NAND rơi, hàng tồn kho tăng và biên lợi nhuận giảm mạnh. Khi chu kỳ phục hồi, doanh nghiệp có thể tăng giá tốt hơn.",
  },
  {
    question: "Quyền lực định giá trong ngành bán dẫn liên quan đến điều gì?",
    options: [
      "Chỉ phụ thuộc vào giá USD",
      "Khả năng đặt giá cao khi nhu cầu vượt cung - đặc biệt khi sản phẩm là thành phần thiết yếu không thể thay thế",
      "Số lượng nhà máy đang xây dựng",
      "Số nhân viên nghiên cứu phát triển",
    ],
    correct: 1,
    explanation: "Quyền lực định giá là khả năng tăng giá mà khách hàng vẫn phải mua. Nó xuất hiện khi cung khan hiếm, nhu cầu bùng nổ và sản phẩm khó thay thế. HBM là ví dụ vì chỉ có vài nhà sản xuất lớn trên thế giới.",
  },
  {
    question: "Khi các công ty hạ tầng AI lớn như Microsoft, Google, Meta tăng mạnh đầu tư tài sản, điều đó gợi ý gì?",
    options: [
      "Các công ty AI đang thua lỗ",
      "Nhu cầu chip AI và hạ tầng mạnh - có thể tạo chu kỳ tăng cho nhà cung cấp bán dẫn và trung tâm dữ liệu",
      "Thị trường cổ phiếu sắp sập",
      "Không có ý nghĩa tài chính",
    ],
    correct: 1,
    explanation: "Capex là chi đầu tư tài sản dài hạn như trung tâm dữ liệu, máy chủ, chip. Khi các công ty hạ tầng AI tăng capex, nhu cầu GPU, HBM, điện, làm mát và cáp quang có thể tăng theo.",
  },
  {
    question: "Samsung Q1/2026 có thể nhìn như 'case study' về điều gì?",
    options: [
      "Cách đọc một doanh nghiệp thuần túy công nghệ",
      "Cách phân tích công ty trong hai xu hướng: tốt là đầu tư AI tăng, xấu là mất thị phần HBM và chu kỳ bộ nhớ còn rủi ro",
      "Cách đầu tư vào cổ phiếu Mỹ",
      "Cách đọc ngân hàng",
    ],
    correct: 1,
    explanation: "Samsung là ví dụ của phân tích hai chiều. Có lực hỗ trợ như đầu tư AI tăng và smartphone phục hồi, nhưng cũng có lực cản như HBM chậm hơn SK Hynix và rủi ro tồn kho chip nhớ cũ.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Samsung Q1/2026 - AI qua Lăng kính Tài chính</h2>
      <p className="text-stone-500 text-sm mb-8">Bộ nhớ tốc độ cao, chu kỳ chip nhớ và cách đọc doanh nghiệp bán dẫn trong chu kỳ AI</p>

      <section className="mb-10 rounded-xl border border-teal-100 bg-teal-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Hiểu nhanh</h3>
        <p className="text-sm leading-relaxed text-stone-700">
          Samsung không chỉ bán điện thoại. Phần biến động lớn nằm ở chip nhớ: khi nhu cầu AI tăng, chip nhớ tốc độ cao có thể rất lời; nhưng nếu Samsung chậm hơn đối thủ, lợi thế đó không tự động chuyển thành lợi nhuận.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Samsung không phải chỉ là điện thoại</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Phần lớn mọi người biết Samsung qua điện thoại Galaxy. Nhưng về mặt tài chính, phần quan trọng nhất - và biến động nhất - của Samsung là <strong>mảng Giải pháp Thiết bị (Device Solutions)</strong>: chip nhớ DRAM/NAND và chip logic.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Mảng này là ví dụ điển hình của ngành có tính chu kỳ: lợi nhuận có thể tăng rất mạnh khi giá chip nhớ lên, rồi giảm sâu khi cung vượt cầu.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Bộ nhớ băng thông cao (HBM) - thị trường Samsung đang bị dẫn trước</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          Bộ nhớ băng thông cao (HBM) là loại bộ nhớ tốc độ rất cao, cần thiết cho GPU AI như NVIDIA H100, H200, B100. Đây là phân khúc có <strong>biên lợi nhuận cao</strong> trong ngành chip nhớ, và nhu cầu tăng mạnh cùng AI.
        </p>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Vấn đề: <strong>SK Hynix đang dẫn đầu HBM</strong> trong khi Samsung gặp vấn đề về tỷ lệ chip đạt chuẩn và thời gian chứng nhận từ NVIDIA. Samsung phải lấy lại thị phần trong phân khúc quan trọng nhất của chu kỳ AI này.
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
                { item: "Thị phần HBM (2024-2025)", sam: "~30%", ski: "~50%+" },
                { item: "Chứng nhận HBM3E từ NVIDIA", sam: "Chậm hơn", ski: "Đầu tiên" },
                { item: "Thị phần DRAM tổng", sam: "~40%", ski: "~30%" },
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
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Chu kỳ bộ nhớ - ngành lên xuống theo cung cầu</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          Giá DRAM và NAND không ổn định - dao động theo chu kỳ cung-cầu. Khi nhu cầu vượt cung: giá tăng, biên lợi nhuận phục hồi mạnh. Khi cung vượt nhu cầu: giá rơi, biên âm, nhà sản xuất lỗ.
        </p>
        <div className="space-y-2 text-sm">
          {[
            { phase: "Chu kỳ đi xuống (2022-2023)", desc: "Giá DRAM/NAND rơi mạnh, mảng chip nhớ lỗ lớn, doanh nghiệp cắt giảm đầu tư" },
            { phase: "Chu kỳ phục hồi (2024)", desc: "Giá phục hồi, nhu cầu AI kéo HBM, mảng chip nhớ quay lại có lãi" },
            { phase: "Q1/2026", desc: "Đầu tư AI tiếp tục tăng, nhưng tồn kho chip nhớ truyền thống vẫn là câu hỏi" },
          ].map(s => (
            <div key={s.phase} className="border-l-2 border-stone-300 pl-3 py-1">
              <div className="font-semibold text-stone-800 text-xs">{s.phase}</div>
              <div className="text-stone-500 text-xs">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Làn sóng đầu tư AI - đọc theo chuỗi cung ứng</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Microsoft, Google, Meta, Amazon tăng chi đầu tư cho trung tâm dữ liệu AI. Đây là tín hiệu sớm cho cả chuỗi cung ứng AI.
        </p>
        <div className="space-y-1 text-sm text-stone-600">
          <div> - Các công ty hạ tầng AI tăng đầu tư → đặt hàng GPU NVIDIA</div>
          <div> - NVIDIA đặt hàng HBM → SK Hynix/Samsung hưởng lợi</div>
          <div> - Nhu cầu điện, làm mát tăng → ngành năng lượng, cơ sở hạ tầng</div>
          <div> - Trung tâm dữ liệu xây dựng → bất động sản công nghiệp, cáp quang</div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Đọc Samsung = Đọc hai chiều</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-stone-100 border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800 mb-2">Tốt</div>
            <div className="space-y-1 text-stone-700">
              <div>Đầu tư AI tăng mạnh</div>
              <div>Smartphone phục hồi</div>
              <div>Giá chip nhớ phục hồi</div>
            </div>
          </div>
          <div className="bg-stone-100 border border-stone-200 rounded-lg p-3">
            <div className="font-bold text-stone-800 mb-2">Xấu</div>
            <div className="space-y-1 text-stone-700">
              <div>Tỷ lệ chip HBM đạt chuẩn kém hơn SK Hynix</div>
              <div>Nguy cơ dư cung chip nhớ</div>
              <div>Foundry cạnh tranh TSMC</div>
            </div>
          </div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
