"use client";

import { useMemo, useState } from "react";

/** Phòng Tầng Vốn: thứ tự ưu tiên thanh toán, ở dạng một chồng thật.
 *
 *  Cấu trúc vốn theo nghĩa đen là một chồng - nợ ưu tiên dưới cùng, vốn chủ
 *  trên cùng - và thứ tự đó quyết định ai mất tiền trước khi doanh nghiệp bán
 *  đi không đủ trả. Sinh viên nhớ sai thứ tự này suốt, vì trên giấy nó chỉ là
 *  một danh sách gạch đầu dòng, không có trên với dưới.
 *
 *  Kéo thanh "giá trị bán được" xuống và nhìn các tầng bị xoá từ TRÊN xuống:
 *  vốn chủ mất sạch trước khi nợ ưu tiên mất đồng nào. */

interface Tranche {
  id: string;
  label: string;
  amount: number;
  color: string;
  note: string;
}

const STACK: Tranche[] = [
  { id: "senior", label: "Nợ ưu tiên (Senior)", amount: 500, color: "#60a5fa", note: "Có tài sản bảo đảm, trả trước tiên" },
  { id: "mezz", label: "Nợ thứ cấp (Mezzanine)", amount: 200, color: "#c084fc", note: "Lãi cao hơn vì trả sau senior" },
  { id: "equity", label: "Vốn chủ sở hữu", amount: 300, color: "#4ade80", note: "Nhận phần còn lại - có thể là 0" },
];

const TOTAL = STACK.reduce((s, t) => s + t.amount, 0);

/** Chia số tiền bán được theo thứ tự ưu tiên: dưới lên trên. */
function waterfall(proceeds: number) {
  let left = proceeds;
  // Trả từ đáy chồng lên: senior trước, vốn chủ cuối.
  const paid: Record<string, number> = {};
  for (const t of STACK) {
    const p = Math.min(left, t.amount);
    paid[t.id] = p;
    left -= p;
  }
  return paid;
}

export default function CapitalStackPanel({
  accent,
  onClose,
}: {
  accent: string;
  onClose: () => void;
}) {
  const [proceeds, setProceeds] = useState(TOTAL);
  const paid = useMemo(() => waterfall(proceeds), [proceeds]);

  return (
    <div className="pointer-events-auto absolute inset-x-3 bottom-36 z-10 max-h-[58vh] overflow-y-auto rounded-2xl border border-stone-700 bg-stone-900/95 p-4 shadow-2xl backdrop-blur sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-[24rem]">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
            Phòng Tầng Vốn
          </p>
          <p className="mt-0.5 text-[11px] text-stone-400">
            Doanh nghiệp bán đi được bao nhiêu — ai nhận trước
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer text-[10px] font-bold text-stone-500 hover:text-stone-300"
        >
          đóng
        </button>
      </div>

      <label className="mb-2 block">
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
          Bán được: {proceeds} tỷ (vốn bỏ vào {TOTAL} tỷ)
        </span>
        <input
          type="range"
          min={0}
          max={TOTAL}
          step={10}
          value={proceeds}
          onChange={(e) => setProceeds(Number(e.target.value))}
          className="mt-1 w-full accent-pink-400"
        />
      </label>

      {/* Chồng vẽ TỪ TRÊN XUỐNG để đúng với hình dung: vốn chủ trên đỉnh. */}
      <div className="space-y-1">
        {[...STACK].reverse().map((t) => {
          const got = paid[t.id];
          const ratio = got / t.amount;
          const wiped = got === 0;
          return (
            <div
              key={t.id}
              className={`rounded-xl border p-2 transition ${
                wiped ? "border-stone-800 bg-stone-950/60 opacity-45" : "border-stone-700 bg-stone-800/40"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[11px] font-black" style={{ color: wiped ? "#78716c" : t.color }}>
                  {t.label}
                </span>
                <span className="font-mono text-[11px] tabular-nums text-stone-300">
                  {got}/{t.amount} tỷ
                </span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-stone-900">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${ratio * 100}%`, backgroundColor: t.color }}
                />
              </div>
              <p className="mt-0.5 text-[10px] text-stone-500">
                {wiped ? "Mất trắng" : ratio < 1 ? `Mất ${Math.round((1 - ratio) * 100)}%` : t.note}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-2 text-[11px] leading-snug text-stone-300">
        {proceeds >= TOTAL
          ? "Bán đủ giá: ai cũng nhận đủ, và phần dôi ra thuộc về vốn chủ."
          : paid.equity === 0 && paid.mezz === 0
          ? "Vốn chủ và nợ thứ cấp đã mất trắng trước khi nợ ưu tiên mất đồng nào."
          : paid.equity === 0
          ? "Vốn chủ mất sạch đầu tiên — đó là cái giá của việc đứng trên cùng chồng."
          : "Vốn chủ chịu lỗ trước, và chịu toàn bộ phần lỗ cho tới khi hết sạch."}
      </p>
      <p className="mt-1 text-[11px] leading-snug" style={{ color: accent }}>
        → Đứng càng cao trên chồng thì lời càng nhiều khi thuận lợi, và mất trước tiên khi không.
      </p>
    </div>
  );
}
