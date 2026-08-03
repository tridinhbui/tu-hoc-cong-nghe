"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

import {
  BREATH_CYCLES,
  BREATH_CYCLE_SECONDS,
  BREATH_PHASES,
} from "@/lib/quiet-corner";

// Thở hộp 4-4-4-4, bốn chu kỳ. Cố ý không có nút bỏ qua, không có điểm, không
// ghi lại gì - chạy xong thì nó chỉ nói "xong rồi", vậy thôi.
//
// Tôn trọng prefers-reduced-motion: người bật thiết lập đó vẫn thấy đủ chữ và
// đồng hồ đếm, chỉ không có vòng tròn phình co.

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export default function BreathingCircle() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startedAt = useRef<number | null>(null);

  // useSyncExternalStore chứ không phải useEffect + setState: media query là
  // state nằm ngoài React, và đọc nó bằng effect thì lần render đầu luôn sai
  // rồi mới sửa lại.
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false, // server: mặc định là có chuyển động, client sẽ chỉnh lại
  );

  const totalSeconds = BREATH_CYCLE_SECONDS * BREATH_CYCLES;

  useEffect(() => {
    if (!running) return;
    startedAt.current = performance.now();

    // requestAnimationFrame chứ không phải setInterval: một interval 1 giây sẽ
    // trôi dần và pha thở lệch khỏi vòng tròn sau vài chu kỳ.
    let frame = 0;
    const tick = () => {
      const seconds = (performance.now() - (startedAt.current ?? 0)) / 1000;
      if (seconds >= totalSeconds) {
        setElapsed(totalSeconds);
        setRunning(false);
        return;
      }
      setElapsed(seconds);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, totalSeconds]);

  const done = !running && elapsed >= totalSeconds;

  // Pha hiện tại suy ra từ thời gian đã trôi, không giữ state riêng - một
  // nguồn sự thật duy nhất thì không có gì để lệch.
  const withinCycle = elapsed % BREATH_CYCLE_SECONDS;
  let cursor = 0;
  let phaseIndex = 0;
  for (let i = 0; i < BREATH_PHASES.length; i++) {
    cursor += BREATH_PHASES[i].seconds;
    if (withinCycle < cursor) {
      phaseIndex = i;
      break;
    }
  }
  const phase = BREATH_PHASES[phaseIndex];
  const secondsLeftInPhase = Math.ceil(cursor - withinCycle);
  const cycleNumber = Math.min(BREATH_CYCLES, Math.floor(elapsed / BREATH_CYCLE_SECONDS) + 1);

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <div className="relative flex h-52 w-52 items-center justify-center">
        <motion.div
          aria-hidden
          className="absolute h-52 w-52 rounded-full bg-gradient-to-br from-amber-300/50 to-orange-500/40 blur-xl"
          animate={
            running && !reducedMotion
              ? { scale: phase.scale, opacity: 0.5 + phase.scale * 0.35 }
              : { scale: 0.85, opacity: 0.5 }
          }
          transition={{ duration: running ? phase.seconds : 0.6, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute h-40 w-40 rounded-full border-2 border-orange-400/70 bg-white/70 dark:bg-stone-900/70"
          animate={
            running && !reducedMotion ? { scale: phase.scale } : { scale: 0.85 }
          }
          transition={{ duration: running ? phase.seconds : 0.6, ease: "easeInOut" }}
        />

        <div className="relative text-center" aria-live="polite">
          {running ? (
            <>
              <p className="text-lg font-extrabold text-stone-800 dark:text-stone-100">
                {phase.label}
              </p>
              <p className="mt-0.5 text-3xl font-black tabular-nums text-orange-600 dark:text-orange-400">
                {secondsLeftInPhase}
              </p>
              <p className="mt-1 text-[11px] font-bold text-stone-500 dark:text-stone-400">
                Vòng {cycleNumber}/{BREATH_CYCLES}
              </p>
            </>
          ) : (
            <p className="px-6 text-sm font-semibold leading-relaxed text-stone-600 dark:text-stone-300">
              {done ? "Xong rồi. Không có điểm nào cả — chỉ là một phút của bạn." : "Bốn nhịp thở, khoảng một phút"}
            </p>
          )}
        </div>
      </div>

      {!running && (
        <button
          type="button"
          onClick={() => {
            setElapsed(0);
            setRunning(true);
          }}
          className="rounded-full bg-gradient-to-br from-amber-500 to-orange-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
        >
          {done ? "Thở thêm một phút" : "Bắt đầu thở"}
        </button>
      )}

      {running && (
        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setElapsed(0);
          }}
          className="text-xs font-bold text-stone-500 underline dark:text-stone-400"
        >
          Dừng lại
        </button>
      )}
    </div>
  );
}
