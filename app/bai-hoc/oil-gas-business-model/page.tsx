"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 44, day: 44, accent: "stone",
  title: "4 Mô hình Kinh doanh Dầu khí",
  subtitle: "Mỗi mô hình kiếm tiền theo cách khác nhau - phân tích cũng phải khác",
  duration: "7 phút", difficulty: "Trung bình", emoji: "·",
};

const quiz: QuizQuestion[] = [
  {
    question: "Khi nhìn ngành dầu khí, chỉ nhìn giá dầu có đủ không?",
    options: ["Đủ - giá dầu quyết định tất cả", "Không đủ - cần nhìn thêm sản lượng, chi phí khai thác, dòng tiền và nợ vay theo từng nhóm", "Chỉ cần theo dõi tin tức thị trường", "Chỉ cần nhìn giá cổ phiếu"],
    correct: 1,
    explanation: "Giá dầu là một input, không phải toàn bộ câu chuyện. Công ty khai thác với chi phí 20/thùng vs 60/thùng sẽ phản ứng rất khác với cùng mức giá dầu. Công ty dịch vụ có backlog dài hạn sẽ ít nhạy cảm với giá dầu ngắn hạn hơn. Mỗi mô hình cần bộ metrics riêng.",
  },
  {
    question: "Backlog quan trọng với nhóm nào nhất trong ngành dầu khí?",
    options: ["Nhóm dịch vụ dầu khí - backlog cho biết có đủ việc làm trong tương lai không", "Ngân hàng thương mại", "Bán lẻ tiêu dùng", "Công ty bảo hiểm"],
    correct: 0,
    explanation: "Backlog với service companies (như PVS, Halliburton, Schlumberger) là leading indicator quan trọng nhất: hợp đồng đã ký nhưng chưa thực hiện. Backlog lớn = visibility cao về doanh thu tương lai. Backlog thu hẹp = warning signal về demand yếu.",
  },
  {
    question: "Free Cash Flow trong ngành dầu khí cho biết điều gì?",
    options: ["Giá dầu hôm nay là bao nhiêu", "Dòng tiền còn lại sau vận hành và đầu tư - thước đo thực tế nhất về sức khỏe tài chính", "Số lượng nhân viên công ty", "Số lượng cổ đông"],
    correct: 1,
    explanation: "FCF = Operating CF − CapEx. Ngành dầu khí cần CapEx liên tục để duy trì sản lượng. FCF âm không nhất thiết xấu nếu do đầu tư mở rộng, nhưng FCF dương bền vững là dấu hiệu công ty thực sự tạo ra giá trị sau khi maintain toàn bộ operations.",
  },
  {
    question: "Doanh thu lớn có chắc là tốt với công ty dầu khí không?",
    options: ["Có - doanh thu lớn là chỉ tiêu tốt nhất", "Không - phải nhìn thêm biên lợi nhuận, dòng tiền và chi phí khai thác trên mỗi đơn vị sản lượng", "Chỉ cần doanh thu tăng là đủ", "Doanh thu không liên quan đến tài chính"],
    correct: 1,
    explanation: "Ví dụ thực tế: công ty dầu đá phiến (shale) có thể có doanh thu lớn nhưng chi phí khai thác cao đến mức FCF âm. Doanh thu lớn với biên lợi nhuận mỏng + nợ cao = mô hình không bền vững. Luôn nhìn doanh thu kèm với margin và chi phí trên từng thùng.",
  },
];

const GROUPS = [
  {
    id: "khai-thac",
    label: "Khai thác",
    title: "Khai thác Dầu & Khí",
    earn: "Kiếm tiền từ dầu dưới lòng đất",
    model: "Sản xuất và bán dầu khí thô. Giá trị phụ thuộc vào giá hàng hóa và chi phí khai thác trên mỗi thùng.",
    metrics: [
      { m: "Chi phí khai thác/thùng", why: "Thước đo quan trọng nhất - quyết định khi nào hòa vốn và biên lợi nhuận ở mỗi mức giá dầu" },
      { m: "Giá dầu hòa vốn", why: "Break-even oil price - công ty cần giá dầu tối thiểu bao nhiêu để không lỗ" },
      { m: "Trữ lượng (Reserves)", why: "Tài nguyên có thể khai thác trong tương lai - giá trị dài hạn của công ty" },
      { m: "Sản lượng", why: "Volume đơn thuần - đọc sau cùng vì nhiều dầu mà lãi ít không phải business tốt" },
    ],
    note: "Đọc theo thứ tự: chi phí → giá hòa vốn → trữ lượng → sản lượng. Đừng bắt đầu từ sản lượng.",
  },
  {
    id: "dich-vu",
    label: "Dịch vụ",
    title: "Dịch vụ Dầu khí",
    earn: "Kiếm tiền từ dự án và hợp đồng",
    model: "Cung cấp dịch vụ, thiết bị, kỹ thuật cho các công ty khai thác. Thu nhập phụ thuộc vào hoạt động đầu tư của khách hàng.",
    metrics: [
      { m: "Backlog", why: "Hợp đồng đã ký chưa thực hiện - leading indicator tốt nhất về doanh thu tương lai" },
      { m: "Giá trị hợp đồng", why: "Revenue per contract - quyết định scale của từng dự án" },
      { m: "Biên lợi nhuận dự án", why: "Margin per project - doanh thu lớn nhưng margin mỏng thì chưa hẳn tốt" },
      { m: "Tỷ lệ sử dụng thiết bị", why: "Fleet/rig utilization - asset idle là tiền mất mà không sinh lợi" },
    ],
    note: "Backlog + margin là cặp đôi quan trọng nhất. Backlog lớn với margin thấp là cảnh báo về pricing power.",
  },
  {
    id: "van-chuyen",
    label: "Vận chuyển",
    title: "Vận chuyển, Kho chứa & Đường ống",
    earn: "Kiếm tiền từ hạ tầng",
    model: "Vận hành tài sản hạ tầng - pipeline, terminal, storage. Thu phí vận chuyển theo khối lượng. Gần giống utility hơn E&P.",
    metrics: [
      { m: "Dòng tiền từ hoạt động", why: "Stability của OCF quyết định khả năng trả nợ và cổ tức - hạ tầng cần FCF đều đặn" },
      { m: "Hợp đồng dài hạn (take-or-pay)", why: "Revenue visibility - hợp đồng càng dài càng dễ dự báo dòng tiền" },
      { m: "Nợ vay / EBITDA", why: "Nhóm này thường leverage cao vì CapEx lớn ban đầu - cần monitor kỹ" },
    ],
    note: "Nhóm này ổn định nhất nhưng cần vốn đầu tư ban đầu lớn. Đánh giá như infrastructure, không như E&P.",
  },
  {
    id: "loc-dau",
    label: "Lọc dầu",
    title: "Lọc Dầu & Phân phối",
    earn: "Kiếm tiền từ chênh lệch giá mua và giá bán",
    model: "Mua dầu thô, chế biến thành các sản phẩm tinh (xăng, diesel, hóa chất). Lợi nhuận phụ thuộc vào crack spread, không phải giá dầu tuyệt đối.",
    metrics: [
      { m: "Crack spread / Refining margin", why: "Chênh lệch giá dầu thô đầu vào và giá sản phẩm đầu ra - đây mới là lợi nhuận thực" },
      { m: "Giá nguyên liệu đầu vào", why: "Input cost - giá dầu tăng ảnh hưởng margin trực tiếp trước khi giá bán điều chỉnh" },
      { m: "Nhu cầu tiêu thụ sản phẩm", why: "Demand cho xăng, diesel theo mùa và chu kỳ kinh tế" },
      { m: "Tồn kho sản phẩm", why: "Inventory level ảnh hưởng đến pricing power ngắn hạn" },
    ],
    note: "Giá dầu tăng không tự động có lợi cho nhóm này. Quan trọng là chênh lệch - refinery margin.",
  },
];

export default function Page() {
  const [active, setActive] = useState("khai-thac");
  const group = GROUPS.find(g => g.id === active)!;

  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">4 Mô hình Kinh doanh Ngành Dầu khí</h2>
      <p className="text-stone-500 text-sm mb-8">Mỗi nhóm kiếm tiền theo cơ chế khác nhau - phân tích tài chính cũng phải khác nhau</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Tại sao cần phân nhóm?</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Khi nghe "công ty dầu khí," nhiều người nghĩ ngay đến giá dầu. Nhưng <strong>cùng một biến động giá dầu có thể làm nhóm này hưởng lợi trong khi nhóm khác thiệt hại</strong> - vì cơ chế tạo ra doanh thu của chúng hoàn toàn khác nhau.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Nhóm lọc dầu mua dầu thô làm nguyên liệu đầu vào - giá dầu tăng có thể làm margin của họ bị ép lại. Trong khi đó, nhóm khai thác bán dầu thô - giá tăng là lợi nhuận tăng thẳng. Cùng một tin tức, hai kết quả ngược chiều nhau.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-3 uppercase tracking-wide text-xs">Khám phá 4 nhóm</h3>
        <div className="flex gap-2 mb-5 flex-wrap">
          {GROUPS.map(g => (
            <button
              key={g.id}
              onClick={() => setActive(g.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active === g.id ? "bg-stone-800 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className="border border-stone-200 rounded-xl p-5">
          <div className="mb-4">
            <div className="font-bold text-stone-800 text-base mb-0.5">{group.title}</div>
            <div className="text-stone-500 text-xs uppercase tracking-wide">{group.earn}</div>
          </div>
          <p className="text-stone-600 text-sm leading-relaxed mb-5">{group.model}</p>

          <div className="mb-4">
            <div className="text-xs font-bold text-stone-500 uppercase mb-3">Metrics quan trọng - và tại sao</div>
            <div className="space-y-3">
              {group.metrics.map(s => (
                <div key={s.m} className="border-l-2 border-stone-200 pl-3">
                  <div className="font-semibold text-stone-800 text-sm">{s.m}</div>
                  <div className="text-stone-500 text-xs mt-0.5">{s.why}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-stone-100 pt-3 mt-3">
            <div className="text-xs text-stone-500 italic">{group.note}</div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Tóm tắt - ai kiếm tiền từ đâu</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="p-3 text-left font-semibold text-stone-500 uppercase">Nhóm</th>
                <th className="p-3 text-left font-semibold text-stone-500 uppercase">Nguồn lợi nhuận</th>
                <th className="p-3 text-left font-semibold text-stone-500 uppercase">Nhạy cảm với</th>
              </tr>
            </thead>
            <tbody>
              {[
                { g: "Khai thác", source: "Giá bán dầu khí thô", sensitive: "Giá dầu, chi phí khai thác/thùng" },
                { g: "Dịch vụ", source: "Phí dịch vụ, hợp đồng dự án", sensitive: "Hoạt động đầu tư của E&P companies, backlog" },
                { g: "Vận chuyển", source: "Phí vận chuyển, lưu kho", sensitive: "Volume throughput, hợp đồng dài hạn" },
                { g: "Lọc dầu", source: "Crack spread = giá sản phẩm − giá đầu vào", sensitive: "Refining margin, không phải giá dầu tuyệt đối" },
              ].map((r, i) => (
                <tr key={i} className={`border-b border-stone-100 ${i % 2 === 0 ? "" : "bg-stone-50"}`}>
                  <td className="p-3 font-semibold text-stone-800">{r.g}</td>
                  <td className="p-3 text-stone-600">{r.source}</td>
                  <td className="p-3 text-stone-500">{r.sensitive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Checklist phân tích - trước khi nhìn số</h3>
        <div className="space-y-2 text-sm text-stone-600">
          {[
            "Doanh thu đến từ mảng nào trong 4 nhóm trên?",
            "Sản lượng hoặc backlog có tăng không - leading indicator của doanh thu tương lai",
            "Chi phí có kiểm soát được không - margin trend theo quý",
            "Dòng tiền kinh doanh có dương không - operating cash flow, không phải net income",
            "Công ty có phải đầu tư lớn không - CapEx intensity ảnh hưởng đến FCF",
            "Nợ vay có an toàn không - Net Debt/EBITDA theo chuẩn ngành",
            "Giá cổ phiếu đã phản ánh kỳ vọng hiện tại chưa - valuation đang ở đâu trong cycle",
          ].map((s, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-stone-300 flex-shrink-0 font-mono text-xs pt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
