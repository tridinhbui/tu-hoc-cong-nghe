"use client";

import { useState } from "react";
import { SCENARIOS, cycle, verdict, type CycleScenario } from "@/lib/cash-cycle";

/** Phòng Vòng Quay Tiền.
 *
 *  Hiểu sai mà căn phòng này sinh ra để sửa: "vòng quay càng ngắn càng tốt".
 *  Câu đó bỏ mất DẤU. Vòng quay ÂM nghĩa là khách hàng đang tài trợ cho doanh
 *  nghiệp, và đó là toàn bộ mô hình của siêu thị lẫn phần mềm thuê bao - hai
 *  trong bốn kịch bản ở đây.
 *
 *  Nên nó HỎI TRƯỚC: chọn mô hình, đọc câu hỏi, tự đoán, rồi mới lật. Cho xem
 *  đáp số ngay thì người học gật đầu và quên.
 *
 *  Con số không tính ở đây - chúng đến từ lib/cash-cycle.ts, chỗ duy nhất có
 *  thể sai về tài chính và là chỗ duy nhất có test. */

type Phase = "choose" | "guess" | "reveal";

/** Ba vế của vòng quay, vẽ theo tỉ lệ ngày.
 *
 *  Vế phải trả chạy NGƯỢC chiều và nằm dưới - đó là cả bài học trong một hình:
 *  DSO và DIO đẩy vòng dài ra, DPO kéo nó ngắn lại. */
function Bars({ s, revealed }: { s: CycleScenario; revealed: boolean }) {
  const { dso, dio, dpo } = s.inputs;
  const span = Math.max(dso + dio, dpo, 1);
  const pct = (n: number) => `${(n / span) * 100}%`;
  return (
    <div className="space-y-1">
      <div className="flex h-5 overflow-hidden rounded bg-stone-800">
        <div className="flex items-center justify-center bg-amber-500/80 text-[9px] font-black text-stone-950" style={{ width: pct(dio) }}>
          {dio > 6 ? `kho ${dio}` : ""}
        </div>
        <div className="flex items-center justify-center bg-sky-500/80 text-[9px] font-black text-stone-950" style={{ width: pct(dso) }}>
          {dso > 6 ? `thu ${dso}` : ""}
        </div>
      </div>
      <div className="flex h-5 overflow-hidden rounded bg-stone-800">
        <div className="flex items-center justify-center bg-lime-500/80 text-[9px] font-black text-stone-950" style={{ width: pct(dpo) }}>
          {dpo > 6 ? `được nợ ${dpo}` : ""}
        </div>
      </div>
      {revealed && (
        <p className="text-center text-[10px] text-stone-400">
          hai vạch trên đẩy dài ra · vạch dưới kéo ngắn lại
        </p>
      )}
    </div>
  );
}

const VERDICT_TEXT = {
  "duoc-tai-tro": { label: "Khách hàng đang tài trợ", color: "#a3e635" },
  "can-von": { label: "Phải bỏ vốn ra nuôi vòng quay", color: "#fb7185" },
  "trung-tinh": { label: "Hoà - không ai tài trợ ai", color: "#94a3b8" },
} as const;

export default function CashCyclePanel({
  accent,
  onClose,
}: {
  accent: string;
  onClose: () => void;
}) {
  const [id, setId] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("choose");

  const s = SCENARIOS.find((x) => x.id === id) ?? null;
  const reveal = phase === "reveal";
  const r = s ? cycle(s.inputs) : null;
  const v = r ? VERDICT_TEXT[verdict(r.ccc)] : null;

  return (
    <div className="pointer-events-auto absolute inset-x-3 bottom-36 z-10 max-h-[62vh] overflow-y-auto rounded-2xl border border-stone-700 bg-stone-900/95 p-4 shadow-2xl backdrop-blur sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-[26rem]">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
            Phòng Vòng Quay Tiền
          </p>
          <p className="mt-0.5 text-[11px] text-stone-400">
            Tiền về trước hay tiền đi trước — và ai đang tài trợ cho ai
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
        {SCENARIOS.map((x) => (
          <button
            key={x.id}
            type="button"
            onClick={() => {
              setId(x.id);
              setPhase("guess");
            }}
            className={`cursor-pointer rounded-xl border px-2 py-1.5 text-left text-[11px] font-bold transition ${
              id === x.id
                ? "border-lime-400 bg-lime-950/50 text-lime-100"
                : "border-stone-700 bg-stone-800/50 text-stone-300 hover:border-stone-500"
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>

      {s && (
        <div className="space-y-2">
          <Bars s={s} revealed={reveal} />

          {/* Bước đoán. Bỏ nó đi thì căn phòng chỉ còn là một cái máy tính có
              màu - và người học không bao giờ phát hiện ra mình đang tin câu
              "ngắn thì tốt". */}
          {phase === "guess" && (
            <div className="rounded-xl border border-lime-500/40 bg-lime-950/30 p-3">
              <p className="text-[12px] font-bold leading-snug text-lime-100">{s.question}</p>
              <p className="mt-1 text-[10px] text-stone-400">
                Tự trả lời trong đầu trước đã — kể cả dấu âm hay dương.
              </p>
              <button
                type="button"
                onClick={() => setPhase("reveal")}
                className="mt-2 w-full cursor-pointer rounded-xl px-3 py-2 text-[11px] font-black text-stone-950 transition hover:brightness-110"
                style={{ backgroundColor: accent }}
              >
                Lật đáp số
              </button>
            </div>
          )}

          {reveal && r && v && (
            <div className="space-y-2">
              <div className="rounded-xl bg-stone-950/70 p-2.5 text-center">
                <p className="font-mono text-2xl font-black" style={{ color: v.color }}>
                  {r.ccc > 0 ? "+" : ""}
                  {r.ccc} ngày
                </p>
                <p className="text-[10px] font-bold" style={{ color: v.color }}>
                  {v.label}
                </p>
                <p className="mt-1 font-mono text-[10px] text-stone-500">
                  {s.inputs.dso} thu + {s.inputs.dio} kho − {s.inputs.dpo} được nợ
                </p>
                {/* Ngày là con số người ta nhớ; tiền là thứ làm doanh nghiệp
                    chết. Bày cả hai cạnh nhau vì đó là bước nhảy còn thiếu. */}
                <p className="mt-1 text-[10px] text-stone-400">
                  Với doanh thu 100 triệu/ngày:{" "}
                  <span className="font-mono font-bold text-stone-200">
                    {r.workingCapitalNeed > 0 ? "cần sẵn " : "dư ra "}
                    {Math.abs(r.workingCapitalNeed).toLocaleString("vi-VN")} triệu
                  </span>
                </p>
              </div>
              <p className="text-[11px] leading-snug text-stone-300">🏭 {s.why}</p>
              <p className="text-[11px] font-black leading-snug" style={{ color: accent }}>
                → {s.punchline}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
