"use client";

import { useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 24, day: 24, accent: "teal",
  title: "ROIC Phần 2 - Liên Hệ Với Định Giá",
  subtitle: "Vì sao hiệu quả vốn quyết định dòng tiền tự do và giá trị doanh nghiệp",
  duration: "6 phút", difficulty: "Khó", emoji: "🔗",
  nextSlug: "dinh-gia-tai-san-rong", nextTitle: "Định giá DN kiểu bán hết tài sản rồi trả nợ",
};

const quiz: QuizQuestion[] = [
  {
    question: "Nếu ROIC tăng trong khi tốc độ tăng trưởng không đổi, điều gì xảy ra với dòng tiền tự do?",
    options: [
      "Dòng tiền tự do tăng - cần ít vốn tái đầu tư hơn để đạt cùng tăng trưởng",
      "Dòng tiền tự do giảm - ROIC cao đòi hỏi tái đầu tư nhiều hơn",
      "Dòng tiền tự do không đổi",
      "Không liên quan",
    ],
    correct: 0,
    explanation: "ROIC cao nghĩa là mỗi đồng vốn tạo ra nhiều lợi nhuận hơn. Vì vậy để đạt cùng mức tăng trưởng, doanh nghiệp cần tái đầu tư ít hơn và còn lại nhiều dòng tiền tự do hơn.",
  },
  {
    question: "Công ty nào thường có định giá cao hơn nếu cùng tốc độ tăng trưởng?",
    options: [
      "Công ty A: ROIC 10%",
      "Công ty B: ROIC 20%",
      "Như nhau vì tăng trưởng bằng nhau",
    ],
    correct: 1,
    explanation: "Cùng tăng trưởng, công ty ROIC 20% cần ít vốn tái đầu tư hơn công ty ROIC 10%. Dòng tiền tự do cao hơn thường dẫn tới định giá cao hơn.",
  },
  {
    question: "Khi ROIC thấp hơn chi phí vốn, điều gì xảy ra với giá trị cổ đông?",
    options: [
      "Tạo giá trị vì doanh nghiệp vẫn có lãi",
      "Không ảnh hưởng nếu doanh thu tăng",
      "Phá hủy giá trị - tăng trưởng thực ra làm hại cổ đông",
      "Chỉ ảnh hưởng doanh thu, không ảnh hưởng giá trị",
    ],
    correct: 2,
    explanation: "Chi phí vốn là mức lợi nhuận tối thiểu nhà đầu tư kỳ vọng. Nếu ROIC thấp hơn chi phí vốn, mỗi đồng tái đầu tư tạo ra lợi nhuận không đủ bù chi phí vốn, nên tăng trưởng có thể làm giảm giá trị.",
  },
];

function ROICValuationLink() {
  const [roicA, setRoicA] = useState(10);
  const [roicB, setRoicB] = useState(20);
  const [growth, setGrowth] = useState(10);
  const [wacc] = useState(10);
  const nopat = 100;

  const reinvestA = growth / roicA;
  const reinvestB = growth / roicB;
  const fcfA = nopat * (1 - reinvestA);
  const fcfB = nopat * (1 - reinvestB);
  const termGrowth = 3;
  const pvA = fcfA / ((wacc - termGrowth) / 100);
  const pvB = fcfB / ((wacc - termGrowth) / 100);

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-1 text-sm">ROIC → Dòng tiền tự do → Định giá</h3>
      <p className="text-xs text-stone-500 mb-4">So sánh 2 công ty cùng tăng trưởng nhưng hiệu quả vốn khác nhau</p>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">ROIC A ({roicA}%)</label>
          <input type="range" min={5} max={30} value={roicA} onChange={e => setRoicA(+e.target.value)} className="w-full accent-teal-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">ROIC B ({roicB}%)</label>
          <input type="range" min={5} max={40} value={roicB} onChange={e => setRoicB(+e.target.value)} className="w-full accent-emerald-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-600 block mb-1">Tăng trưởng ({growth}%)</label>
          <input type="range" min={2} max={20} value={growth} onChange={e => setGrowth(+e.target.value)} className="w-full accent-blue-400" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Công ty A", roic: roicA, ri: reinvestA, fcf: fcfA, pv: pvA, color: "orange" },
          { label: "Công ty B", roic: roicB, ri: reinvestB, fcf: fcfB, pv: pvB, color: "teal" },
        ].map(co => (
          <div key={co.label} className={`bg-${co.color}-50 rounded-xl p-4 border border-${co.color}-100`}>
            <div className={`font-bold text-${co.color}-700 mb-3`}>{co.label} (ROIC {co.roic}%)</div>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-stone-500">Lợi nhuận sau thuế</span>
                <span>{nopat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Tỷ lệ tái đầu tư</span>
                <span>{(co.ri * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Vốn tái đầu tư</span>
                <span className="text-stone-700">−{(nopat * co.ri).toFixed(0)}</span>
              </div>
              <div className="flex justify-between border-t pt-1.5">
                <span className="font-bold text-stone-700">Dòng tiền tự do</span>
                <span className={`font-bold ${co.fcf >= 0 ? `text-${co.color}-700` : "text-stone-700"}`}>{co.fcf.toFixed(0)}</span>
              </div>
              <div className="flex justify-between border-t pt-1.5">
                <span className="font-bold text-stone-700">Định giá ước tính</span>
                <span className={`font-bold text-lg ${co.pv > 0 ? `text-${co.color}-700` : "text-stone-700"}`}>
                  {co.pv > 0 ? co.pv.toFixed(0) : "N/A"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pvA > 0 && pvB > 0 && (
        <div className="mt-3 bg-white rounded-xl border border-stone-200 p-3 text-center text-sm">
          <span className="text-stone-600">Cùng tăng trưởng {growth}%, ROIC cao hơn cho định giá </span>
          <span className="font-bold text-stone-700">{(pvB / pvA).toFixed(1)}× cao hơn</span>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">ROIC phần 2 - liên hệ với định giá</h2>
      <p className="text-stone-600 text-sm mb-6 italic">ROIC không chỉ là chỉ số hiệu quả - nó quyết định doanh nghiệp cần bao nhiêu vốn để tăng trưởng.</p>

      <section className="mb-8 rounded-xl border border-teal-100 bg-teal-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-teal-800 mb-2">Nói đơn giản</h3>
        <p className="text-sm leading-relaxed text-stone-700">
          Hai công ty cùng tăng trưởng 10% chưa chắc đáng giá như nhau. Công ty nào cần ít vốn hơn để tạo ra mức tăng trưởng đó sẽ còn lại nhiều tiền tự do hơn, nên thường đáng giá hơn.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Ý chính cốt lõi</h3>
        <div className="bg-stone-50 text-white rounded-xl p-5 mb-4">
          <p className="text-lg font-bold text-center mb-2">
            Giá trị doanh nghiệp phụ thuộc vào khả năng tạo lợi nhuận trên vốn <em>so với</em> chi phí vốn
          </p>
          <p className="text-stone-700 text-sm text-center">ROIC so với chi phí vốn - đây là mối quan hệ cốt lõi trong định giá</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { cond: "ROIC > Chi phí vốn", label: "Tạo giá trị", desc: "Tăng trưởng làm tăng giá trị", color: "emerald" },
            { cond: "ROIC = Chi phí vốn", label: "Trung hòa", desc: "Tăng trưởng không tạo thêm giá trị", color: "amber" },
            { cond: "ROIC < Chi phí vốn", label: "Phá hủy giá trị", desc: "Tăng trưởng làm giảm giá trị", color: "rose" },
          ].map(s => (
            <div key={s.cond} className={`bg-${s.color}-50 border border-${s.color}-100 rounded-xl p-3 text-center`}>
              <div className={`font-mono text-xs font-bold text-${s.color}-700 mb-1`}>{s.cond}</div>
              <div className={`font-bold text-sm text-${s.color}-700 mb-1`}>{s.label}</div>
              <div className="text-xs text-stone-500">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Từ ROIC đến dòng tiền tự do và định giá</h3>
        <div className="space-y-3">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 text-sm mb-2">Bước 1: Tỷ lệ tái đầu tư từ ROIC và tăng trưởng</div>
            <div className="font-mono text-sm bg-white rounded p-3 border border-stone-200">
              Tỷ lệ tái đầu tư = Tăng trưởng / ROIC
            </div>
            <p className="text-xs text-stone-500 mt-2">ROIC 20%, tăng trưởng 10% → cần tái đầu tư khoảng 50% lợi nhuận. ROIC 10%, tăng trưởng 10% → phải tái đầu tư gần như toàn bộ lợi nhuận.</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 text-sm mb-2">Bước 2: Dòng tiền tự do từ lợi nhuận và tái đầu tư</div>
            <div className="font-mono text-sm bg-white rounded p-3 border border-stone-200">
              Dòng tiền tự do = Lợi nhuận sau thuế × (1 − Tỷ lệ tái đầu tư)
            </div>
            <p className="text-xs text-stone-500 mt-2">ROIC cao thường dẫn tới dòng tiền tự do cao vì doanh nghiệp cần ít vốn hơn để tăng trưởng.</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 text-sm mb-2">Bước 3: Định giá từ dòng tiền tự do</div>
            <div className="font-mono text-sm bg-white rounded p-3 border border-stone-200">
              Giá trị = Dòng tiền tự do / (Chi phí vốn − Tăng trưởng dài hạn)
            </div>
            <p className="text-xs text-stone-500 mt-2">Dòng tiền tự do cao + ROIC cao → định giá thường cao hơn. Tăng trưởng không tạo giá trị nếu ROIC thấp hơn chi phí vốn.</p>
          </div>
        </div>
      </section>

      <ROICValuationLink />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Ví dụ: tại sao Google/Microsoft thường được định giá cao?</h3>
        <div className="bg-stone-800 text-white rounded-xl p-5">
          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-stone-700 font-bold mb-1">Google (Alphabet)</div>
              <div className="text-stone-300 text-xs space-y-0.5">
                <div>ROIC: ~25-30%</div>
                <div>Cần tái đầu tư ít vốn hơn</div>
                <div>Biên dòng tiền tự do: 20%+</div>
              </div>
              <div className="text-stone-700 font-bold mt-2">EV/EBITDA: 18-22x</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-stone-700 font-bold mb-1">Airlines trung bình</div>
              <div className="text-stone-300 text-xs space-y-0.5">
                <div>ROIC: ~5-8%</div>
                <div>Cần tái đầu tư nhiều vào đội bay</div>
                <div>Biên dòng tiền tự do: 2-5%</div>
              </div>
              <div className="text-stone-700 font-bold mt-2">EV/EBITDA: 4-7x</div>
            </div>
          </div>
          <p className="text-stone-300 text-xs">
            Cùng tốc độ tăng trưởng, Google thường được thị trường trả giá cao hơn nhiều so với hàng không. Lý do: ROIC cao hơn → dòng tiền tự do cao hơn → mỗi đồng vốn tạo ra nhiều giá trị hơn.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">Điểm cần nhớ</h3>
        <div className="space-y-2">
          {[
            "Tăng trưởng không tạo giá trị nếu ROIC thấp hơn chi phí vốn.",
            "ROIC cao → cần ít tái đầu tư hơn → dòng tiền tự do cao hơn → định giá thường cao hơn.",
            "Công ty duy trì ROIC cao hơn chi phí vốn trong thời gian dài thường có lợi thế cạnh tranh thật.",
          ].map((t, i) => (
            <div key={i} className="flex gap-3 bg-stone-50 rounded-lg p-3 border border-stone-200 text-sm">
              <span className="text-stone-700 font-bold flex-shrink-0">{i + 1}.</span>
              <span className="text-stone-700">{t}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
