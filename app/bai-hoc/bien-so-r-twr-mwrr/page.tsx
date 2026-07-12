"use client";

import { useMemo, useState } from "react";
import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 1037, day: 90, accent: "violet",
  title: "Biến số r: TWR vs MWRR trong thẩm định & đầu tư",
  subtitle: "IRR, Discount Rate, YTM đều là r - và vì sao hiệu suất Quỹ cần nhìn qua cả hai lăng kính TWR và MWRR",
  duration: "8 phút", difficulty: "Khó", emoji: "📐",
};

const quiz: QuizQuestion[] = [
  {
    question: "TWR (Time-weighted return) đo lường điều gì?",
    options: [
      "Số tiền tuyệt đối nhà đầu tư kiếm được",
      "Khả năng chọn tài sản/cổ phiếu của Quỹ, không bị ảnh hưởng bởi việc nhà đầu tư nộp hay rút tiền",
      "Chi phí quản lý quỹ hàng năm",
      "Tổng số năm Quỹ đã hoạt động",
    ],
    correct: 1,
    explanation: "TWR tính bằng tích các (1 + return từng giai đoạn) rồi khai căn theo số kỳ - loại bỏ hoàn toàn ảnh hưởng của thời điểm và quy mô dòng tiền vào/ra, nên phản ánh đúng năng lực chọn tài sản thuần túy của người quản lý quỹ.",
  },
  {
    question: "Trong ví dụ Quỹ A (TWR = 8.824%, MWRR ≈ 5.64%), vì sao MWRR thấp hơn TWR khá nhiều?",
    options: [
      "Vì Quỹ tính sai công thức",
      "Vì phí quản lý quá cao",
      "Vì Quỹ để AUM cao nhất đúng vào năm lỗ nặng nhất (-15%) và rút bớt vốn ngay trước năm lãi cao nhất (+25%) - lỗi market timing",
      "Vì TWR luôn cao hơn MWRR trong mọi trường hợp",
    ],
    correct: 2,
    explanation: "MWRR bị kéo thấp vì cách phân bổ dòng tiền theo thời gian: vốn lớn nhất (8M) rơi đúng năm hiệu suất tệ nhất (-15%), còn năm bùng nổ nhất (+25%) thì vốn đã bị rút bớt. Đây là bad timing chứ không phải bản thân chiến lược đầu tư kém.",
  },
  {
    question: "r trong các mô hình tài chính có thể mang tên gọi khác nhau tùy bối cảnh. Cặp nào SAI?",
    options: [
      "Đánh giá dự án nội bộ doanh nghiệp hoặc hiệu suất Quỹ → IRR",
      "Chiết khấu dòng tiền khi định giá tài sản/doanh nghiệp → Discount Rate",
      "Lợi suất nắm giữ trái phiếu đến đáo hạn → YTM",
      "Đo hiệu suất chọn tài sản thuần túy, không bị ảnh hưởng bởi dòng tiền vào/ra → IRR",
    ],
    correct: 3,
    explanation: "Đo hiệu suất chọn tài sản thuần túy (không bị ảnh hưởng bởi dòng tiền vào/ra) chính là TWR, không phải IRR. IRR/MWRR lại là thước đo BỊ ảnh hưởng bởi thời điểm và quy mô dòng tiền - đây là điểm khác biệt cốt lõi giữa hai khái niệm.",
  },
  {
    question: "Áp dụng tư duy TWR vs MWRR vào một doanh nghiệp: một sản phẩm cốt lõi có biên lợi nhuận rất tốt (tương tự TWR cao) nhưng doanh nghiệp vẫn kiệt quệ tài chính. Nguyên nhân nhiều khả năng nhất là gì?",
    options: [
      "Sản phẩm đó thực chất không tốt",
      "Người điều hành phân bổ vốn sai thời điểm - bơm vốn mở rộng đúng lúc thị trường tạo đỉnh, hoặc rút vốn ngay trước giai đoạn bùng nổ",
      "Chi phí kế toán bị ghi nhận sai",
      "Không có nguyên nhân nào phù hợp, đây là nghịch lý không thể xảy ra",
    ],
    correct: 1,
    explanation: "Đây chính là điểm tương đồng giữa Quỹ và doanh nghiệp: bản thân sản phẩm/chiến lược tốt (TWR cao) không đảm bảo hiệu quả dòng tiền tốt (IRR/MWRR thấp) nếu quyết định phân bổ vốn (mở rộng, rút vốn) rơi vào sai thời điểm.",
  },
];

interface YearInput {
  aum: number;
  returnPct: number;
}

const DEFAULT_YEARS: YearInput[] = [
  { aum: 2000000, returnPct: 20 },
  { aum: 5000000, returnPct: 10 },
  { aum: 8000000, returnPct: -15 },
  { aum: 6000000, returnPct: 25 },
];

function computeCashFlows(years: YearInput[]): number[] {
  const cf: number[] = [-years[0].aum];
  let endBalance = years[0].aum * (1 + years[0].returnPct / 100);
  for (let i = 1; i < years.length; i++) {
    // A positive diff (AUM this year > organic end-of-last-year balance) means
    // the fund took in a new contribution - cash OUT of the investor's pocket
    // (negative CF). A negative diff means the fund paid out a withdrawal -
    // cash IN to the investor (positive CF).
    const diff = years[i].aum - endBalance;
    cf.push(-diff);
    endBalance = years[i].aum * (1 + years[i].returnPct / 100);
  }
  cf.push(endBalance); // final liquidation, always cash back to the investor
  return cf;
}

function npv(rate: number, cashFlows: number[]): number {
  return cashFlows.reduce((sum, cf, t) => sum + cf / Math.pow(1 + rate, t), 0);
}

// Bisection - simple and stable enough for a 4-6 period fund cash flow series.
function solveIRR(cashFlows: number[]): number | null {
  let lo = -0.99;
  let hi = 10;
  let npvLo = npv(lo, cashFlows);
  let npvHi = npv(hi, cashFlows);
  if (Number.isNaN(npvLo) || Number.isNaN(npvHi) || npvLo * npvHi > 0) return null;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    const npvMid = npv(mid, cashFlows);
    if (Math.abs(npvMid) < 1e-6) return mid;
    if (npvLo * npvMid < 0) {
      hi = mid;
      npvHi = npvMid;
    } else {
      lo = mid;
      npvLo = npvMid;
    }
  }
  return (lo + hi) / 2;
}

function fmt(n: number): string {
  return new Intl.NumberFormat("vi-VN").format(Math.round(n));
}

function FundPerformanceCalculator() {
  const [years, setYears] = useState<YearInput[]>(DEFAULT_YEARS);

  const twr = useMemo(() => {
    const product = years.reduce((acc, y) => acc * (1 + y.returnPct / 100), 1);
    return (Math.pow(product, 1 / years.length) - 1) * 100;
  }, [years]);

  const cashFlows = useMemo(() => computeCashFlows(years), [years]);
  const mwrr = useMemo(() => {
    const r = solveIRR(cashFlows);
    return r === null ? null : r * 100;
  }, [cashFlows]);

  function updateYear(index: number, field: keyof YearInput, value: number) {
    setYears((prev) => prev.map((y, i) => (i === index ? { ...y, [field]: value } : y)));
  }

  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-5 border border-stone-200 my-6">
      <h3 className="font-bold text-stone-700 mb-1 text-sm">🧮 Fund Performance Calculator</h3>
      <p className="text-xs text-stone-500 mb-4">Chỉnh AUM đầu năm và Return từng năm để xem TWR và MWRR thay đổi thế nào</p>

      <div className="space-y-3 mb-5">
        {years.map((y, i) => (
          <div key={i} className="bg-white rounded-xl border border-stone-200 p-3">
            <div className="text-xs font-bold text-stone-600 mb-2">Năm {i + 1}</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">AUM đầu năm ({fmt(y.aum)})</label>
                <input
                  type="range" min={500000} max={12000000} step={100000}
                  value={y.aum}
                  onChange={(e) => updateYear(i, "aum", +e.target.value)}
                  className="w-full accent-violet-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Return ({y.returnPct}%)</label>
                <input
                  type="range" min={-40} max={40} step={1}
                  value={y.returnPct}
                  onChange={(e) => updateYear(i, "returnPct", +e.target.value)}
                  className="w-full accent-violet-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 text-center mb-3">
        <div className="bg-white rounded-xl p-4 border border-stone-200">
          <div className="text-xs text-stone-500 mb-0.5">TWR (năng lực chọn tài sản)</div>
          <div className="font-bold text-stone-700 text-xl">{twr.toFixed(2)}%</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200">
          <div className="text-xs text-stone-500 mb-0.5">MWRR / IRR (hiệu suất dòng tiền thực tế)</div>
          <div className="font-bold text-stone-700 text-xl">{mwrr === null ? "—" : `${mwrr.toFixed(2)}%`}</div>
        </div>
      </div>

      <div className="bg-stone-900 text-white rounded-xl p-3 font-mono text-xs">
        <div className="text-stone-400 mb-1">Dòng tiền từ góc nhìn nhà đầu tư (CF0 → CF{years.length})</div>
        <div className="flex flex-wrap gap-2">
          {cashFlows.map((cf, i) => (
            <span key={i} className={cf >= 0 ? "text-emerald-400" : "text-rose-400"}>
              {cf >= 0 ? "+" : ""}{fmt(cf)}
            </span>
          ))}
        </div>
      </div>

      <p className="text-xs text-stone-500 mt-3">
        {mwrr !== null && Math.abs(twr - mwrr) > 1
          ? twr > mwrr
            ? "TWR > MWRR: chiến lược chọn tài sản tốt, nhưng thời điểm nộp/rút vốn đang kéo hiệu suất thực tế xuống (bad timing)."
            : "MWRR > TWR: thời điểm nộp/rút vốn đang giúp hiệu suất thực tế cao hơn năng lực chọn tài sản thuần túy (good timing)."
          : "TWR và MWRR gần bằng nhau: dòng tiền vào/ra không tạo lệch đáng kể so với năng lực chọn tài sản thuần túy."}
      </p>
    </div>
  );
}

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Biến số r - thước đo cốt lõi trong thẩm định & đầu tư</h2>
      <p className="text-stone-600 text-sm mb-6 italic">
        Khi đánh giá tính khả thi của một dự án doanh nghiệp hay thẩm định hiệu suất đầu tư của một Quỹ, biến số quan trọng nhất luôn là r (lợi suất/suất chiết khấu).
      </p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📛 r mang nhiều tên gọi khác nhau</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Tùy vào mục đích sử dụng, r sẽ mang những tên gọi và ý nghĩa khác nhau. Tựu chung lại, bản chất của r là đưa các dòng tiền thu về trong tương lai về mặt giá trị hiện tại để đánh giá hiệu quả.
        </p>
        <div className="space-y-2">
          {[
            { name: "IRR", label: "Internal Rate of Return - Tỷ suất hoàn vốn nội bộ", desc: "Dùng để đánh giá hiệu suất/chiến lược đầu tư của một Quỹ (Fund), hoặc đo lường tính khả thi của dự án nội bộ doanh nghiệp." },
            { name: "Discount Rate", label: "Suất chiết khấu", desc: "Dùng làm tỷ lệ chiết khấu dòng tiền trong các bài toán định giá tài sản/doanh nghiệp." },
            { name: "YTM", label: "Yield to Maturity - Lợi suất đáo hạn", desc: "Dùng để đánh giá mức sinh lời thực tế khi đầu tư trái phiếu nếu nắm giữ đến ngày đáo hạn." },
          ].map((r) => (
            <div key={r.name} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="flex items-baseline gap-2 flex-wrap mb-1">
                <span className="font-bold text-stone-900 text-sm">{r.name}</span>
                <span className="text-xs text-stone-500 font-mono">{r.label}</span>
              </div>
              <p className="text-stone-600 text-sm">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">📊 Bài toán thực tế: Đánh giá hiệu suất của Quỹ A</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Giả sử Quỹ A nhận thêm vốn vào đầu mỗi năm và tạo ra hiệu suất qua 4 năm như sau:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-100">
                <th className="text-left p-2 rounded-l-lg text-stone-600 text-xs">Year</th>
                <th className="text-center p-2 text-stone-700 text-xs font-bold">Tài sản quản lý/year (AUM)</th>
                <th className="text-center p-2 rounded-r-lg text-stone-700 text-xs font-bold">Lợi suất trong năm (Return)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[
                ["1", "2,000,000", "20%"],
                ["2", "5,000,000", "10%"],
                ["3", "8,000,000", "-15%"],
                ["4", "6,000,000", "25%"],
              ].map((row) => (
                <tr key={row[0]}>
                  <td className="p-2 text-stone-600 text-xs font-medium">{row[0]}</td>
                  <td className="p-2 text-center text-stone-700 text-xs">{row[1]}</td>
                  <td className="p-2 text-center text-stone-700 text-xs">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-stone-600 leading-relaxed">Để đánh giá toàn diện hiệu suất của Quỹ, chúng ta thực hiện theo 4 bước.</p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Bước 1: Tính TWR (Time-weighted return)</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          TWR phản ánh khả năng chọn cổ phiếu/tài sản của Quỹ mà không bị ảnh hưởng bởi việc nhà đầu tư nộp/rút tiền.
        </p>
        <div className="bg-stone-800 text-white rounded-xl p-5 text-center">
          <div className="font-mono text-sm mb-1">TWR = [(1+20%)×(1+10%)×(1−15%)×(1+25%)]^0.25 − 1</div>
          <div className="font-mono text-xl font-bold text-emerald-400">= 8.824%</div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Bước 2: Tính dòng tiền thực tế Quỹ nhận/trả mỗi năm</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Vì số AUM đầu mỗi năm là số lũy kế, ta cần tìm dòng tiền (nộp thêm/rút ra) thực tế ở đầu mỗi giai đoạn:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-100">
                <th className="text-left p-2 rounded-l-lg text-stone-600 text-xs">Year</th>
                <th className="text-right p-2 text-stone-700 text-xs font-bold">Tài sản quản lý/year (AUM)</th>
                <th className="text-left p-2 text-stone-600 text-xs">Công thức</th>
                <th className="text-right p-2 rounded-r-lg text-stone-700 text-xs font-bold">CF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr>
                <td className="p-2 text-stone-600 text-xs font-medium">1</td>
                <td className="p-2 text-right text-stone-700 text-xs font-mono">(2,000,000)</td>
                <td className="p-2 text-stone-400 text-xs"></td>
                <td className="p-2 text-right text-stone-700 text-xs font-mono">CF0</td>
              </tr>
              <tr>
                <td className="p-2 text-stone-600 text-xs font-medium">2</td>
                <td className="p-2 text-right text-stone-700 text-xs font-mono">(2,600,000)</td>
                <td className="p-2 text-stone-400 text-xs italic">= Y2 − (Y1×(1+% return Y1))</td>
                <td className="p-2 text-right text-stone-700 text-xs font-mono">CF1</td>
              </tr>
              <tr>
                <td className="p-2 text-stone-600 text-xs font-medium">3</td>
                <td className="p-2 text-right text-stone-700 text-xs font-mono">(2,500,000)</td>
                <td className="p-2 text-stone-400 text-xs italic">= Y3 − (Y2×(1+% return Y2))</td>
                <td className="p-2 text-right text-stone-700 text-xs font-mono">CF2</td>
              </tr>
              <tr>
                <td className="p-2 text-stone-600 text-xs font-medium">4</td>
                <td className="p-2 text-right text-stone-700 text-xs font-mono">800,000</td>
                <td className="p-2 text-stone-400 text-xs italic">= Y4 − (Y3×(1+% return Y3))</td>
                <td className="p-2 text-right text-stone-700 text-xs font-mono">CF3</td>
              </tr>
              <tr>
                <td className="p-2 text-stone-600 text-xs font-medium" colSpan={2}>Số tiền ở năm Y4 rút</td>
                <td className="p-2 text-stone-400 text-xs italic">= Y4×(1+% return Y4)</td>
                <td className="p-2 text-right text-stone-700 text-xs font-mono">7,500,000 (CF4)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="space-y-2 text-sm">
          <div className="bg-stone-50 rounded-lg p-3 border border-stone-200"><strong>CF0 (Đầu Y1):</strong> −2M (bỏ vốn ban đầu)</div>
          <div className="bg-stone-50 rounded-lg p-3 border border-stone-200"><strong>CF1 (Đầu Y2):</strong> Cuối Y1 Quỹ có 2M × 1.2 = 2.4M. Đầu Y2 AUM là 5M → Fund nộp thêm 5M − 2.4M = 2.6M (dòng tiền ra: −2.6M).</div>
          <div className="bg-stone-50 rounded-lg p-3 border border-stone-200"><strong>CF2 (Đầu Y3):</strong> Cuối Y2 Quỹ có 5M × 1.1 = 5.5M. Đầu Y3 AUM là 8M → Fund nộp thêm 8M − 5.5M = 2.5M (dòng tiền ra: −2.5M).</div>
          <div className="bg-stone-50 rounded-lg p-3 border border-stone-200"><strong>CF3 (Đầu Y4):</strong> Cuối Y3 Quỹ có 8M × (1−15%) = 6.8M. Đầu Y4 AUM giảm còn 6M → Fund thực tế đã rút vốn 6.8M − 6M = 0.8M (dòng tiền vào: +0.8M).</div>
        </div>
        <p className="text-stone-400 text-xs mt-2">Lưu ý: Quỹ rút 0.8M chứ không phải 2M, vì tài sản đã tự sụt giảm 15% trước đó.</p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Bước 3 & 4: Giá trị cuối kỳ và tính MWRR/IRR</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          CF4 (cuối Y4): 6M × (1+25%) = +7.5M. Quét toàn bộ dòng tiền từ CF0 đến CF4: [−2M, −2.6M, −2.5M, +0.8M, +7.5M] vào hàm =IRR() trong Excel:
        </p>
        <div className="bg-stone-800 text-white rounded-xl p-5 text-center">
          <div className="font-mono text-sm mb-1">IRR([-2M, -2.6M, -2.5M, +0.8M, +7.5M])</div>
          <div className="font-mono text-xl font-bold text-emerald-400">MWRR (IRR) ≈ 5.64%</div>
        </div>
      </section>

      <FundPerformanceCalculator />

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🔍 Vì sao TWR (8.824%) &gt; MWRR (5.64%)?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-1 text-sm">Về năng lực chọn tài sản (TWR tốt)</div>
            <p className="text-stone-600 text-sm">Mức TWR 8.824% chứng minh bản thân chiến lược đầu tư của Fund hoạt động khá hiệu quả qua 4 năm nếu xét độc lập với yếu tố dòng tiền.</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="font-bold text-stone-700 mb-1 text-sm">Về năng lực chọn thời điểm (Timing tệ)</div>
            <p className="text-stone-600 text-sm">MWRR bị kéo thấp xuống chỉ còn ~5.64% do lỗi market timing: AUM đạt đỉnh (8M) đúng năm hiệu suất tệ nhất (-15%), và rút bớt vốn (800k) ngay trước năm bùng nổ nhất (+25%).</p>
          </div>
        </div>
        <p className="text-stone-600 leading-relaxed mt-4">
          Kết luận: Chính quyết định phân bổ quy mô vốn sai thời điểm (bad timing) đã kéo hiệu suất dòng tiền thực tế (MWRR) xuống thấp hơn năng lực đầu tư thuần túy (TWR) của Quỹ.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">🏢 Từ câu chuyện của Quỹ, nhìn về bài toán doanh nghiệp</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          Tư duy bóc tách này hoàn toàn tương đồng với việc quản trị một doanh nghiệp. Khi đánh giá hiệu quả, nhà quản trị cần phân biệt rõ:
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-3 bg-stone-50 rounded-lg p-3 border border-stone-100">
            <span className="mt-1 w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" />
            <div>
              <div className="text-sm font-bold text-stone-700">Hiệu suất của bản thân dự án/sản phẩm (tương tự TWR)</div>
              <div className="text-xs text-stone-500">Dự án này có biên lợi nhuận tốt không? Mô hình kinh doanh có hiệu quả không, nếu bỏ qua yếu tố cấu trúc vốn? Vế này thường được đánh giá qua NPV & IRR so với chi phí cơ hội r.</div>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-stone-50 rounded-lg p-3 border border-stone-100">
            <span className="mt-1 w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" />
            <div>
              <div className="text-sm font-bold text-stone-700">Hiệu quả sử dụng vốn của doanh nghiệp (tương tự IRR/MWRR)</div>
              <div className="text-xs text-stone-500">Doanh nghiệp có đang bơm vốn vào mở rộng đúng lúc thị trường tạo đỉnh, hoặc siết vốn/rút tiền ngay trước khi dự án vào pha bùng nổ hay không?</div>
            </div>
          </div>
        </div>
        <p className="text-stone-900 font-bold text-center">
          Một sản phẩm cốt lõi rất tốt (TWR cao) vẫn có thể khiến doanh nghiệp kiệt quệ về mặt tài chính (IRR thấp) nếu người điều hành bị áp lực, vội vàng phân bổ dòng tiền sai thời điểm.
        </p>
        <p className="text-stone-400 text-xs mt-4">Nguồn tự học: CFA Institute - Performance Evaluation, tài liệu GIPS (Global Investment Performance Standards).</p>
      </section>
    </LessonPageLayout>
  );
}
