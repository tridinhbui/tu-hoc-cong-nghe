"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 1038, day: 1038, accent: "emerald",
  title: "Đánh giá dự án đầu tư nội bộ: NPV, IRR và Payback",
  subtitle: "Dự án 80 triệu USD - bao lâu hòa vốn, và có đáng đầu tư không?",
  duration: "7 phút", difficulty: "Trung bình", emoji: "📊",
  nextSlug: undefined, nextTitle: undefined,
};

const quiz: QuizQuestion[] = [
  {
    question: "NPV của dự án là +2,69 triệu USD (dương). Điều này có nghĩa là gì?",
    options: [
      "Dự án chắc chắn lỗ vì số quá nhỏ so với vốn 80 triệu",
      "Sau khi đã khấu trừ hết chi phí vốn 8%/năm, dự án vẫn tạo thêm 2,69 triệu USD giá trị thặng dư theo giá trị hiện tại - đáng đầu tư",
      "Doanh nghiệp sẽ nhận đúng 2,69 triệu USD tiền mặt vào năm 0",
      "NPV dương nghĩa là dự án hòa vốn ngay năm đầu tiên",
    ],
    correct: 1,
    explanation: "NPV (Net Present Value) quy toàn bộ dòng tiền tương lai về giá trị hiện tại rồi trừ đi vốn đầu tư ban đầu, dùng đúng chi phí vốn (r = 8%) làm lãi suất chiết khấu. NPV > 0 nghĩa là dự án sinh lời CAO HƠN mức tối thiểu doanh nghiệp yêu cầu (8%) - phần dư ra chính là 2,69 triệu USD giá trị thật tăng thêm, không phải một khoản tiền mặt nhận riêng.",
  },
  {
    question: "IRR tính đến năm 2 là -44%, đến năm 4 là -2%, nhưng đến năm 5 lại đạt +9%. Vì sao IRR \"đổi chiều\" mạnh như vậy?",
    options: [
      "Vì công thức IRR bị lỗi khi dự án lỗ",
      "Vì dòng tiền các năm cuối (18, 25, 32 triệu) tăng nhanh hơn nhiều so với 2 năm đầu (15, 17 triệu) - IRR đo tỷ suất sinh lời trên TOÀN BỘ vòng đời tính đến thời điểm đó, nên cần đủ thời gian để dòng tiền lớn ở cuối bù lại",
      "Vì chi phí vốn 8% thay đổi theo từng năm",
      "Vì đây là lỗi nhập liệu, IRR không thể âm",
    ],
    correct: 1,
    explanation: "IRR dừng ở năm nào thì chỉ tính trên dòng tiền đã thu được đến năm đó so với vốn bỏ ra ban đầu. Ở năm 2, mới thu 32 triệu trên 80 triệu vốn nên IRR rất âm. Nhưng dòng tiền tăng tốc mạnh ở năm 4-5 (25 và 32 triệu) khiến IRR cải thiện nhanh và vượt mức 8% khi tính đủ 5 năm. Đây là lý do nhiều dự án nội bộ nhìn 1-2 năm đầu tưởng lỗ nhưng thực ra đang đi đúng lộ trình.",
  },
  {
    question: "Thời gian hoàn vốn (payback period) của dự án là khoảng 4,15 năm (~4 năm 2 tháng). Cách tính đúng là gì?",
    options: [
      "Lấy 80 triệu chia đều cho 5 năm",
      "Cộng dồn dòng tiền từng năm cho tới khi bằng đúng 80 triệu vốn ban đầu: sau 4 năm mới thu được 75 triệu (còn thiếu 5 triệu), sang năm 5 thu 32 triệu nên chỉ cần một phần nhỏ của năm 5 (5/32 ≈ 0,15 năm) là đủ bù hết phần còn thiếu",
      "Lấy năm có dòng tiền dương đầu tiên",
      "Payback period luôn bằng số năm có NPV dương",
    ],
    correct: 1,
    explanation: "Payback period = thời điểm dòng tiền cộng dồn vừa đủ bù lại vốn đầu tư ban đầu, không cần chiết khấu. Sau 4 năm: 15+17+18+25 = 75 triệu (thiếu 5 triệu so với 80 triệu vốn). Năm 5 thu 32 triệu, nên chỉ cần 5/32 ≈ 0,15 năm (~2 tháng) của năm 5 là đủ hòa vốn → tổng cộng khoảng 4,15 năm.",
  },
  {
    question: "Một dự án có dòng tiền âm/IRR âm trong 2-3 năm đầu. Kết luận nào đúng nhất trước khi bác bỏ dự án?",
    options: [
      "Dừng dự án ngay vì lỗ liên tục là dấu hiệu thất bại",
      "Cần nhìn toàn bộ vòng đời dự án qua NPV và IRR tính đến năm cuối, không chỉ dựa vào kết quả 1-2 năm đầu - dòng tiền tăng trưởng mạnh ở các năm sau có thể bù lại và khiến dự án vẫn đáng đầu tư",
      "Luôn tiếp tục dự án bất kể kết quả vì mọi dự án đều lỗ lúc đầu",
      "Chỉ cần xem báo cáo lợi nhuận kế toán (P&L), không cần dòng tiền",
    ],
    correct: 1,
    explanation: "Đây là bài học cốt lõi của case này: NPV/IRR/Payback phải được đánh giá trên TOÀN BỘ dòng đời dự án (ở đây là đủ 5 năm), không chỉ dựa vào 1-2 năm đầu. Case này cho thấy dự án âm nặng ở năm 2 (IRR -44%) nhưng cuối cùng vẫn đáng đầu tư (NPV dương, IRR năm 5 vượt chi phí vốn). Kết luận vội vàng dựa trên kết quả ngắn hạn có thể khiến doanh nghiệp bỏ lỡ dự án tốt.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Dự án 80 triệu USD - có đáng xuống tiền?</h2>
      <p className="text-stone-600 text-sm mb-6 italic">
        Khi làm quản lý hoặc chủ doanh nghiệp, câu hỏi &quot;công ty định rót tiền vào một dự án/hệ thống/dây chuyền mới, liệu có đáng không&quot; luôn cần trả lời bằng con số cụ thể - không phải cảm tính.
      </p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Đề bài</h3>
        <p className="text-sm text-stone-700 leading-relaxed mb-2">
          Doanh nghiệp muốn đầu tư mở nhà máy mới với chi phí ban đầu (Năm 0) là <strong>80 triệu USD</strong>.
          Chi phí vốn r = <strong>8%</strong> (tương đương lãi suất vay dài hạn hoặc tỷ suất sinh lời tối thiểu doanh nghiệp kỳ vọng).
        </p>
        <p className="text-sm text-stone-700 leading-relaxed">
          Dòng tiền thu về dự kiến mỗi năm: Năm 1: 15tr · Năm 2: 17tr · Năm 3: 18tr · Năm 4: 25tr · Năm 5: 32tr (đơn vị: triệu USD).
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Bảng dòng tiền &amp; kết quả</h3>
        <div className="bg-stone-800 text-white rounded-xl p-5 font-mono text-xs overflow-x-auto">
          <div className="text-stone-500 mb-2">{"// r = 8%"}</div>
          <table className="w-full min-w-[480px] border-collapse">
            <thead>
              <tr className="text-stone-400">
                <th className="text-left font-normal pb-2">Year</th>
                <th className="text-right font-normal pb-2">0</th>
                <th className="text-right font-normal pb-2">1</th>
                <th className="text-right font-normal pb-2">2</th>
                <th className="text-right font-normal pb-2">3</th>
                <th className="text-right font-normal pb-2">4</th>
                <th className="text-right font-normal pb-2">5</th>
              </tr>
            </thead>
            <tbody className="text-stone-200">
              <tr className="border-t border-stone-600">
                <td className="py-1.5 text-stone-400">Revenue</td>
                <td className="text-right">−</td>
                <td className="text-right">15</td>
                <td className="text-right">17</td>
                <td className="text-right">20</td>
                <td className="text-right">25</td>
                <td className="text-right">32</td>
              </tr>
              <tr>
                <td className="py-1.5 text-stone-400">Expense</td>
                <td className="text-right">(80)</td>
                <td className="text-right">−</td>
                <td className="text-right">−</td>
                <td className="text-right">−</td>
                <td className="text-right">−</td>
                <td className="text-right">−</td>
              </tr>
              <tr className="border-t border-stone-600 font-bold">
                <td className="py-1.5">CF</td>
                <td className="text-right">(80)</td>
                <td className="text-right">15</td>
                <td className="text-right">17</td>
                <td className="text-right">18</td>
                <td className="text-right">25</td>
                <td className="text-right">32</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4 pt-3 border-t border-stone-600 space-y-1">
            <div className="flex justify-between"><span className="text-stone-300">NPV</span><span className="font-bold text-white">$2.69 triệu</span></div>
            <div className="flex justify-between text-xs"><span className="text-stone-500">IRR tính đến Năm 2</span><span className="text-stone-300">-44%</span></div>
            <div className="flex justify-between text-xs"><span className="text-stone-500">IRR tính đến Năm 4</span><span className="text-stone-300">-2%</span></div>
            <div className="flex justify-between text-xs"><span className="text-stone-500">IRR tính đến Năm 5</span><span className="text-stone-300">9%</span></div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Có đáng đầu tư không?</h3>
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="font-bold text-emerald-800 mb-1">1. NPV = 2,69 triệu USD (&gt; 0) → ĐÁNG ĐẦU TƯ</div>
            <p className="text-sm text-emerald-900">
              Sau khi đã khấu trừ hết chi phí vốn (8%), dự án vẫn tạo ra thêm cho doanh nghiệp 2,69 triệu USD giá trị thặng dư theo giá trị tiền tệ hiện tại.
            </p>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl p-4">
            <div className="font-bold text-stone-800 mb-1">2. Tỷ suất sinh lời IRR qua các cột mốc</div>
            <p className="text-sm text-stone-700 leading-relaxed">
              Nếu dừng ở Năm 2: IRR là -44% (dòng tiền chưa đủ bù chi phí). Nếu dừng ở Năm 4: IRR là -2% (gần chạm điểm hòa vốn).
              Đến Năm 5: IRR đạt 9% - vượt mức chi phí vốn ban đầu 8%.
            </p>
            <p className="text-sm text-stone-700 mt-2 font-semibold">
              Bài học: nhiều dự án nội bộ nhìn 1-2 năm đầu tưởng lỗ vì IRR âm, nhưng nếu kiên trì đến năm thứ 5 mới là lúc có lời, vì dòng tiền tăng trưởng mạnh ở các năm cuối.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Sau bao lâu thì có tiền (hòa vốn)?</h3>
        <div className="bg-white border border-stone-200 rounded-xl p-4 font-mono text-xs mb-3">
          <div className="flex justify-between mb-1"><span>Tổng dòng tiền 4 năm đầu</span><span className="text-stone-700">15+17+18+25 = 75</span></div>
          <div className="flex justify-between mb-1"><span>Còn thiếu so với vốn 80tr</span><span className="text-stone-700">5 triệu</span></div>
          <div className="flex justify-between border-t pt-1"><span>Năm 5 thu về</span><span className="text-stone-700">32 triệu</span></div>
          <div className="flex justify-between border-t pt-1 font-bold"><span>Thời gian hoàn vốn</span><span className="text-emerald-700">≈ 4 năm 2 tháng (4,15 năm)</span></div>
        </div>
        <p className="text-sm text-stone-700 leading-relaxed">
          Từ sau mốc 4,15 năm, toàn bộ tiền thu về là lãi ròng bỏ túi.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Tổng số tiền thu về là bao nhiêu?</h3>
        <div className="space-y-2">
          {[
            "Con số thực thu (chưa chiết khấu): tổng dòng tiền 5 năm là 107 triệu USD. Trừ 80 triệu vốn gốc, doanh nghiệp thu về 27 triệu USD tiền lãi thực tế.",
            "Giá trị tài chính (đã quy về hiện tại): doanh nghiệp bỏ túi khoản lãi thuần 2,69 triệu USD (chính là NPV, sau khi đã trừ chi phí cơ hội/lãi vay 8%).",
            "Trước khi duyệt bất kỳ dự án nội bộ nào, cần lập bảng dòng tiền (cash flow) và tính đủ NPV, IRR theo từng năm - không chỉ nhìn 1-2 năm đầu.",
            "Doanh thu ngắn hạn âm không có nghĩa là dự án lỗ, mà cần nhìn tổng thể về tốc độ phục hồi của dòng tiền.",
          ].map((n, i) => (
            <div key={i} className="flex gap-3 bg-stone-50 rounded-lg p-3 text-sm border border-stone-200">
              <span className="text-stone-700 font-bold flex-shrink-0">{i + 1}.</span>
              <span className="text-stone-700">{n}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
