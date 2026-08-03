"use client";

import { useMemo, useState } from "react";

// Biểu đồ lãi lỗ tại đáo hạn, widget cho các bài khai `interactiveType:
// "payoff"`.
//
// Lãi lỗ của quyền chọn là một hàm GÃY KHÚC, và đó chính là thứ mà chữ không
// truyền được: đọc "lỗ tối đa bằng phí đã trả" thì phải tin, còn nhìn đường
// gãy nằm ngang ở phía dưới thì hiểu ngay vì sao. Đường vẽ ở đây là lãi lỗ
// tại NGÀY ĐÁO HẠN - trước đó còn giá trị thời gian, và đó là chuyện của bài
// về Greeks chứ không phải của biểu đồ này.

const POSITIONS = [
  { key: "long-call", label: "Mua quyền chọn mua" },
  { key: "short-call", label: "Bán quyền chọn mua" },
  { key: "long-put", label: "Mua quyền chọn bán" },
  { key: "short-put", label: "Bán quyền chọn bán" },
  { key: "forward", label: "Hợp đồng kỳ hạn (mua)" },
] as const;

type PositionKey = (typeof POSITIONS)[number]["key"];

/** Lãi lỗ tại đáo hạn cho một mức giá cơ sở. Thuần và tách riêng để đọc được
 *  công thức mà không phải đọc phần vẽ. */
export function payoffAt(position: PositionKey, spot: number, strike: number, premium: number): number {
  switch (position) {
    case "long-call":
      return Math.max(0, spot - strike) - premium;
    case "short-call":
      return premium - Math.max(0, spot - strike);
    case "long-put":
      return Math.max(0, strike - spot) - premium;
    case "short-put":
      return premium - Math.max(0, strike - spot);
    case "forward":
      return spot - strike;
  }
}

const WIDTH = 320;
const HEIGHT = 160;
const MAX_SPOT = 200;

export default function InteractivePayoff() {
  const [position, setPosition] = useState<PositionKey>("long-call");
  const [strike, setStrike] = useState(100);
  const [premium, setPremium] = useState(8);

  const { path, zeroY, worst, breakeven } = useMemo(() => {
    const points: Array<[number, number]> = [];
    for (let spot = 0; spot <= MAX_SPOT; spot += 2) {
      points.push([spot, payoffAt(position, spot, strike, premium)]);
    }
    const values = points.map((p) => p[1]);
    const lo = Math.min(...values, -premium - 5);
    const hi = Math.max(...values, premium + 5);
    const toY = (v: number) => HEIGHT - ((v - lo) / (hi - lo || 1)) * (HEIGHT - 10) - 5;
    const path = points
      .map(([s, v], i) => `${i === 0 ? "M" : "L"}${((s / MAX_SPOT) * WIDTH).toFixed(1)},${toY(v).toFixed(1)}`)
      .join(" ");

    // Điểm hoà vốn: nơi đường cắt trục 0. Với vị thế kỳ hạn thì đó chính là
    // giá thực hiện; với quyền chọn thì lệch đi đúng bằng phí.
    const be =
      position === "forward"
        ? strike
        : position.endsWith("call")
          ? strike + premium
          : strike - premium;

    return { path, zeroY: toY(0), worst: Math.min(...values), breakeven: be };
  }, [position, strike, premium]);

  const isOption = position !== "forward";
  const lossCapped = position === "long-call" || position === "long-put";

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-5 dark:bg-stone-900 dark:border-stone-800">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1 dark:text-stone-100">
          📐 Lãi lỗ tại ngày đáo hạn
        </h3>
        <p className="text-stone-500 text-sm dark:text-stone-400">
          Trục ngang là giá tài sản cơ sở lúc đáo hạn. Đường nằm ngang nghĩa là giá đổi mà lãi lỗ
          không đổi.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {POSITIONS.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setPosition(p.key)}
            aria-pressed={position === p.key}
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${
              position === p.key
                ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="Biểu đồ lãi lỗ tại đáo hạn">
        <line x1={0} y1={zeroY} x2={WIDTH} y2={zeroY} className="stroke-stone-300 dark:stroke-stone-600" strokeWidth={1} />
        <line
          x1={(strike / MAX_SPOT) * WIDTH}
          y1={0}
          x2={(strike / MAX_SPOT) * WIDTH}
          y2={HEIGHT}
          className="stroke-stone-200 dark:stroke-stone-700"
          strokeDasharray="3 3"
          strokeWidth={1}
        />
        <path d={path} fill="none" className="stroke-emerald-500" strokeWidth={2.5} />
      </svg>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-stone-700 dark:text-stone-300">Giá thực hiện</span>
            <span className="font-bold text-stone-800 dark:text-stone-100">{strike}</span>
          </div>
          <input type="range" min={40} max={160} value={strike} onChange={(e) => setStrike(+e.target.value)} className="w-full" aria-label="Giá thực hiện" />
        </div>
        {isOption && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-stone-700 dark:text-stone-300">Phí quyền chọn</span>
              <span className="font-bold text-stone-800 dark:text-stone-100">{premium}</span>
            </div>
            <input type="range" min={1} max={30} value={premium} onChange={(e) => setPremium(+e.target.value)} className="w-full" aria-label="Phí quyền chọn" />
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-stone-50 p-4 dark:bg-stone-800/60">
        <p className="text-sm text-stone-700 dark:text-stone-200">
          Hoà vốn ở mức <b>{breakeven.toFixed(0)}</b>.{" "}
          {lossCapped ? (
            <>
              Lỗ tối đa <b>{Math.abs(worst).toFixed(0)}</b> - đúng bằng phí đã trả, dù giá đi xa tới đâu.
            </>
          ) : isOption ? (
            <>
              Lãi tối đa chỉ bằng phí thu được, còn phần lỗ thì không có trần trong vùng vẽ được.
            </>
          ) : (
            <>Không có phí, cũng không có trần ở cả hai phía - lãi lỗ đi thẳng theo giá.</>
          )}
        </p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
          Đổi qua lại giữa mua và bán cùng một quyền chọn: hai đường là ảnh gương của nhau qua trục
          ngang. Đó là lý do người bán quyền chọn thu tiền đều đặn và thỉnh thoảng lỗ rất sâu - hình
          dạng đó làm mọi thước đo dựa trên độ lệch chuẩn đánh giá sai rủi ro.
        </p>
      </div>
    </div>
  );
}
