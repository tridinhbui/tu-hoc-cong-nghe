"use client";

import { useState } from "react";
import {
  BONDS,
  RHO_CASES,
  STOCKS,
  minVarianceWeight,
  mix,
  verdictFor,
} from "@/lib/portfolio-risk";

/** Phòng Rủi Ro & Phân Bổ.
 *
 *  Hiểu sai cần sửa: "trộn tài sản rủi ro 20% với tài sản rủi ro 7% thì được
 *  danh mục rủi ro 13,5%". Danh mục thật rủi ro THẤP HƠN, và phần chênh lệch
 *  không đến từ việc chọn đúng tài sản - nó đến từ việc hai thứ không cùng
 *  xuống một lúc.
 *
 *  Bất đối xứng là trọng tâm: LỢI NHUẬN cộng thẳng theo trọng số, RỦI RO thì
 *  không. Nên tấm thẻ luôn bày cả hai cạnh nhau, và luôn hỏi trước khi lật.
 *
 *  Con số ở lib/portfolio-risk.ts - chỗ duy nhất có thể sai về tài chính và là
 *  chỗ duy nhất có test. */

const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

export default function PortfolioRiskPanel({
  accent,
  onClose,
}: {
  accent: string;
  onClose: () => void;
}) {
  const [caseId, setCaseId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  // Tỉ trọng người học tự kéo. Mặc định 50/50 vì đó là danh mục người ta nghĩ
  // tới đầu tiên, không phải vì nó tối ưu.
  const [w, setW] = useState(0.5);

  const c = RHO_CASES.find((x) => x.id === caseId) ?? null;
  const r = c ? mix(STOCKS, BONDS, { w, rho: c.rho }) : null;
  const best = c ? minVarianceWeight(STOCKS, BONDS, c.rho) : null;

  return (
    <div className="pointer-events-auto absolute inset-x-3 bottom-36 z-10 max-h-[62vh] overflow-y-auto rounded-2xl border border-stone-700 bg-stone-900/95 p-4 shadow-2xl backdrop-blur sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-[26rem]">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
            Phòng Rủi Ro &amp; Phân Bổ
          </p>
          <p className="mt-0.5 text-[11px] text-stone-400">
            {STOCKS.label} {pct(STOCKS.vol)} · {BONDS.label} {pct(BONDS.vol)}
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

      <div className="mb-2 grid grid-cols-2 gap-1.5">
        {RHO_CASES.map((x) => (
          <button
            key={x.id}
            type="button"
            onClick={() => {
              setCaseId(x.id);
              setRevealed(false);
              setW(0.5);
            }}
            className={`cursor-pointer rounded-xl border px-2 py-1.5 text-left text-[11px] font-bold transition ${
              caseId === x.id
                ? "border-sky-400 bg-sky-950/50 text-sky-100"
                : "border-stone-700 bg-stone-800/50 text-stone-300 hover:border-stone-500"
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>

      {c && !revealed && (
        <div className="rounded-xl border border-sky-500/40 bg-sky-950/30 p-3">
          <p className="text-[12px] font-bold leading-snug text-sky-100">{c.question}</p>
          <p className="mt-1 text-[10px] text-stone-400">
            Trung bình có trọng số là {pct(0.5 * STOCKS.vol + 0.5 * BONDS.vol)} — đoán xem số thật
            cao hơn, thấp hơn hay bằng.
          </p>
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mt-2 w-full cursor-pointer rounded-xl px-3 py-2 text-[11px] font-black text-stone-950 transition hover:brightness-110"
            style={{ backgroundColor: accent }}
          >
            Lật đáp số
          </button>
        </div>
      )}

      {c && revealed && r && best !== null && (
        <div className="space-y-2">
          <div className="rounded-xl bg-stone-950/70 p-2.5">
            <div className="flex items-baseline justify-between text-[11px]">
              <span className="text-stone-400">Trung bình có trọng số (số ai cũng đoán)</span>
              <span className="font-mono font-bold text-amber-400">{pct(r.naiveVol)}</span>
            </div>
            <div className="flex items-baseline justify-between text-[11px]">
              <span className="text-stone-400">Rủi ro THẬT của danh mục</span>
              <span className="font-mono text-lg font-black text-sky-300">{pct(r.vol)}</span>
            </div>
            <div className="mt-1 flex items-baseline justify-between border-t border-stone-800 pt-1 text-[11px]">
              <span className="font-bold text-emerald-400">Được cho không</span>
              <span className="font-mono font-black text-emerald-300">
                {r.diversificationGain < 1e-9 ? "0,0%" : `−${pct(r.diversificationGain)}`}
              </span>
            </div>
            {/* Nửa còn lại của bài học: kéo tỉ trọng thì rủi ro nhảy, còn lợi
                nhuận đi thẳng - vì nó ĐÚNG BẰNG trung bình có trọng số. */}
            <div className="mt-1 flex items-baseline justify-between text-[11px]">
              <span className="text-stone-400">Lợi nhuận kỳ vọng</span>
              <span className="font-mono font-bold text-purple-300">{pct(r.ret)}</span>
            </div>
          </div>

          <div>
            <label className="flex items-baseline justify-between text-[10px] text-stone-400">
              <span>Tỉ trọng {STOCKS.label}</span>
              <span className="font-mono font-bold text-stone-200">{Math.round(w * 100)}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(w * 100)}
              onChange={(e) => setW(Number(e.target.value) / 100)}
              className="mt-1 w-full cursor-pointer accent-sky-400"
            />
            <button
              type="button"
              onClick={() => setW(best)}
              className="mt-1 w-full cursor-pointer rounded-lg bg-stone-800 px-2 py-1.5 text-[10px] font-bold text-stone-200 transition hover:bg-stone-700"
            >
              Nhảy tới tỉ trọng ít dao động nhất ({Math.round(best * 100)}% {STOCKS.label})
            </button>
          </div>

          <p className="text-[11px] leading-snug text-stone-300">🎲 {c.meaning}</p>
          <p className="text-[11px] font-black leading-snug" style={{ color: accent }}>
            → {verdictFor(c.rho)}
          </p>
        </div>
      )}
    </div>
  );
}
