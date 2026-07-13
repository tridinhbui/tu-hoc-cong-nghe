"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 23, day: 23, accent: "emerald",
  title: "Hiệu Quả Sinh Lời Trên Vốn (ROIC)",
  subtitle: "Một đồng vốn bỏ vào tạo ra bao nhiêu lợi nhuận thật sau thuế",
  duration: "7 phút", difficulty: "Khó", emoji: "",
  nextSlug: "roic-phan-2", nextTitle: "ROIC Phần 2 - Liên hệ với định giá",
};

const quiz: QuizQuestion[] = [
  {
    question: "Công ty A có lợi nhuận vận hành 200, thuế 20%, nợ 500, vốn chủ 500, tiền dư 100. ROIC gần nhất là bao nhiêu?",
    options: ["16%", "20%", "18%"],
    correct: 0,
    explanation: "ROIC đo lợi nhuận sau thuế trên vốn đã đầu tư. Lợi nhuận vận hành sau thuế = 200 × (1 − 20%) = 160. Vốn đã đầu tư = nợ + vốn chủ − tiền dư = 900. ROIC ≈ 160/900 = 17.8%.",
  },
  {
    question: "Hai công ty cùng ROIC = 15%. A tái đầu tư 80% lợi nhuận, B tái đầu tư 30%. Công ty nào tăng trưởng nhanh hơn?",
    options: [
      "A - vì giữ lại nhiều vốn hơn để tiếp tục sinh lời ở ROIC 15%",
      "B - vì trả cổ tức cao, cổ đông hài lòng hơn",
      "Như nhau vì ROIC giống nhau",
    ],
    correct: 0,
    explanation: "Tốc độ tăng trưởng xấp xỉ ROIC × tỷ lệ tái đầu tư. A: 15% × 80% = 12%/năm. B: 15% × 30% = 4.5%/năm. Cùng hiệu quả vốn, công ty tái đầu tư nhiều hơn sẽ tăng trưởng nhanh hơn.",
  },
  {
    question: "Công ty ghi giảm giá trị tài sản, vốn đã đầu tư giảm, lợi nhuận không đổi, ROIC tăng. Điều này phản ánh điều gì?",
    options: [
      "Kinh doanh thực sự tốt hơn sau khi ghi giảm tài sản",
      "Chỉ số bị đẹp lên về mặt kế toán, chưa chắc hoạt động thật tốt hơn",
      "Không ảnh hưởng gì đến chất lượng phân tích",
    ],
    correct: 1,
    explanation: "Ghi giảm tài sản làm mẫu số nhỏ đi, nên ROIC có thể tăng về mặt toán học dù kinh doanh không cải thiện. Vì vậy cần đọc xu hướng nhiều năm và hiểu nguyên nhân thay đổi.",
  },
  {
    question: "ROIC > WACC có ý nghĩa gì?",
    options: [
      "Công ty đang có lãi kế toán",
      "Công ty đang tạo giá trị kinh tế - lợi nhuận trên vốn vượt chi phí vốn",
      "Cổ phiếu đang rẻ và nên mua",
      "Công ty không cần vay nợ thêm",
    ],
    correct: 1,
    explanation: "WACC là chi phí vốn bình quân, tức mức lợi nhuận tối thiểu nhà đầu tư và chủ nợ kỳ vọng. ROIC cao hơn WACC nghĩa là mỗi đồng vốn tạo ra lợi nhuận vượt chi phí vốn.",
  },
  {
    question: "Tại sao ROIC tốt hơn ROE để đánh giá hiệu quả sử dụng vốn?",
    options: [
      "ROIC luôn cao hơn ROE",
      "ROIC ít bị bóp méo bởi vay nợ - đo hiệu quả của toàn bộ vốn, không chỉ vốn chủ",
      "ROE tính sai theo GAAP",
      "ROIC dễ tính hơn ROE",
    ],
    correct: 1,
    explanation: "ROE có thể tăng chỉ vì công ty vay nợ nhiều hơn, dù kinh doanh không tốt hơn. ROIC dùng toàn bộ vốn đã đầu tư nên phản ánh thực chất hiệu quả vận hành tốt hơn.",
  },
];

function ROICSimulator() {
  const [ebit, setEbit] = useState(200);
  const [tax, setTax] = useState(20);
  const [debt, setDebt] = useState(500);
  const [equity, setEquity] = useState(500);
  const [cash, setCash] = useState(100);
  const [wacc, setWacc] = useState(10);

  const nopat = ebit * (1 - tax / 100);
  const ic = debt + equity - cash;
  const roic = ic > 0 ? (nopat / ic) * 100 : 0;
  const spread = roic - wacc;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-1 text-sm">Máy tính ROIC</h3>
      <p className="text-xs text-stone-500 mb-4">Điều chỉnh các tham số để xem hiệu quả vốn so với chi phí vốn</p>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: `Lợi nhuận vận hành (${ebit})`, val: ebit, set: setEbit, min: 50, max: 500, step: 10 },
          { label: `Thuế (${tax}%)`, val: tax, set: setTax, min: 0, max: 35, step: 5 },
          { label: `Nợ (${debt})`, val: debt, set: setDebt, min: 0, max: 1000, step: 50 },
          { label: `Vốn chủ (${equity})`, val: equity, set: setEquity, min: 100, max: 1000, step: 50 },
          { label: `Cash dư (${cash})`, val: cash, set: setCash, min: 0, max: 300, step: 25 },
          { label: `Chi phí vốn (${wacc}%)`, val: wacc, set: setWacc, min: 5, max: 20, step: 1 },
        ].map(s => (
          <div key={s.label}>
            <label className="text-xs font-semibold text-stone-600 block mb-1">{s.label}</label>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.val} onChange={e => s.set(+e.target.value)} className="w-full accent-emerald-500" />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-2 font-mono text-sm mb-3">
        <div className="flex justify-between text-stone-500">
          <span>Lợi nhuận sau thuế = {ebit} × (1−{tax}%)</span>
          <span className="font-bold text-stone-700">{nopat.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-stone-500">
          <span>Vốn đã đầu tư = {debt}+{equity}−{cash}</span>
          <span className="font-bold text-stone-700">{ic.toFixed(0)}</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span className="font-bold text-stone-800">ROIC = NOPAT / IC</span>
          <span className={`font-bold text-xl ${roic >= wacc ? "text-stone-700" : "text-stone-700"}`}>{roic.toFixed(1)}%</span>
        </div>
      </div>

      <div className={`rounded-xl p-4 border ${spread >= 0 ? "bg-stone-50 border-stone-200" : "bg-stone-50 border-stone-200"}`}>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs font-semibold text-stone-500">ROIC − Chi phí vốn</div>
            <div className={`text-xl font-bold ${spread >= 0 ? "text-stone-700" : "text-stone-700"}`}>
              {spread >= 0 ? "+" : ""}{spread.toFixed(1)}%
            </div>
          </div>
          <div className="text-right">
            <div className={`text-sm font-bold ${spread >= 0 ? "text-stone-700" : "text-stone-700"}`}>
              {spread >= 5 ? "Tạo giá trị mạnh" : spread >= 0 ? "Tạo giá trị vừa" : "Phá hủy giá trị"}
            </div>
            <div className="text-xs text-stone-500 mt-0.5">WACC = {wacc}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Hiệu quả sinh lời trên vốn (ROIC)</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Chỉ số cho biết 1 đồng vốn bỏ vào tạo ra bao nhiêu lợi nhuận thật sau thuế.</p>

      <section className="mb-8 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-emerald-800 mb-2">Nói đơn giản</h3>
        <p className="text-sm leading-relaxed text-stone-700">
          ROIC trả lời câu hỏi: doanh nghiệp dùng tiền của cổ đông và chủ nợ có hiệu quả không? Nếu mỗi 100 đồng vốn tạo ra 20 đồng lợi nhuận sau thuế, ROIC là 20%.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Công thức ROIC</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5 text-center mb-4">
          <div className="font-mono text-xl font-bold mb-1">ROIC = Lợi nhuận sau thuế / Vốn đã đầu tư</div>
          <p className="text-stone-700 text-sm">Cứ 1 đồng vốn bỏ vào → tạo ra bao nhiêu lợi nhuận sau thuế?</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-2 text-sm">Lợi nhuận vận hành sau thuế</div>
            <div className="font-mono text-xs bg-white rounded p-2 border border-stone-200 mb-2">EBIT × (1 − Tax Rate)</div>
            <p className="text-xs text-stone-600">Lợi nhuận từ hoạt động kinh doanh sau thuế, chưa tính tác động của việc công ty vay nhiều hay ít.</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-2 text-sm">Vốn đã đầu tư</div>
            <div className="font-mono text-xs bg-white rounded p-2 border border-stone-200 mb-2">Debt + Equity − Cash dư</div>
            <p className="text-xs text-stone-600">Tổng vốn thực sự đưa vào kinh doanh. Trừ tiền dư vì phần tiền này chưa trực tiếp tạo ra hoạt động kinh doanh.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Mốc tham khảo ROIC theo ngành</h3>
        <div className="space-y-2">
          {[
            { label: "Phần mềm", range: "25-50%+", color: "emerald", note: "Ít tài sản hữu hình, biên lợi nhuận cao" },
            { label: "Thương hiệu tiêu dùng (Coca-Cola, Vinamilk)", range: "15-25%", color: "blue", note: "Lợi thế thương hiệu mạnh" },
            { label: "Công nghiệp / Sản xuất", range: "8-15%", color: "amber", note: "Cần nhiều nhà máy, cạnh tranh cao" },
            { label: "Điện nước / Viễn thông", range: "5-10%", color: "orange", note: "Bị quản lý giá, cần đầu tư lớn" },
            { label: "Hàng không", range: "2-8%", color: "rose", note: "Biến động theo chu kỳ và giá nhiên liệu" },
          ].map(r => (
            <div key={r.label} className={`flex items-center gap-3 bg-${r.color}-50 rounded-lg p-3 border border-${r.color}-100`}>
              <div className="flex-1">
                <div className="text-sm font-medium text-stone-700">{r.label}</div>
                <div className="text-xs text-stone-500">{r.note}</div>
              </div>
              <div className={`font-bold text-${r.color}-600 text-sm`}>{r.range}</div>
            </div>
          ))}
        </div>
      </section>

      <ROICSimulator />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">ROIC và ROE khác nhau thế nào?</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-100">
                <th className="text-left p-2 rounded-l-lg text-stone-600 text-xs">Tiêu chí</th>
                <th className="text-center p-2 text-stone-700 text-xs font-bold">ROIC</th>
                <th className="text-center p-2 rounded-r-lg text-stone-700 text-xs font-bold">ROE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[
                ["Đo cái gì?", "Hiệu quả của toàn bộ vốn", "Hiệu quả trên vốn chủ"],
                ["Bị vay nợ bóp méo?", "Ít hơn", "Có - ROE có thể tăng khi vay nhiều"],
                ["So sánh giữa ngành", "Phù hợp hơn", "Khó hơn vì tỷ lệ nợ khác nhau"],
                ["Kết hợp với", "Chi phí vốn để xem có tạo giá trị không", "Lãi suất an toàn để xem có đáng đầu tư không"],
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-2 text-stone-600 text-xs font-medium">{row[0]}</td>
                  <td className="p-2 text-center text-stone-700 text-xs">{row[1]}</td>
                  <td className="p-2 text-center text-stone-700 text-xs">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">Tăng trưởng đến từ ROIC và tái đầu tư</h3>
        <div className="bg-stone-800 text-white rounded-xl p-5">
          <div className="font-mono text-center text-lg font-bold mb-3 text-stone-700">
            Tăng trưởng = ROIC × Tỷ lệ tái đầu tư
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-bold text-white mb-1">Công ty A</div>
              <div className="text-stone-300 text-xs">ROIC 15% × tái đầu tư 80%</div>
              <div className="text-stone-700 font-bold mt-1">→ Tăng trưởng 12%/năm</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-bold text-white mb-1">Công ty B</div>
              <div className="text-stone-300 text-xs">ROIC 15% × tái đầu tư 30%</div>
              <div className="text-stone-700 font-bold mt-1">→ Tăng trưởng 4.5%/năm</div>
            </div>
          </div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
