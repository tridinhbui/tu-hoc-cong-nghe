"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Trophy } from "lucide-react";

interface XpEventDetail {
  xp: number;
  label?: string;
}

interface XpItem {
  id: string;
  xp: number;
  label: string;
}

// Synthesizes a crisp, uplifting 2-tone "XP Chime" using Web Audio API
function playXpChimeSound() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Play Note 1: E5 (659.25Hz) -> Note 2: B5 (987.77Hz)
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.18, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.3);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(987.77, now + 0.09);
    gain2.gain.setValueAtTime(0.22, now + 0.09);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.09);
    osc2.stop(now + 0.5);
  } catch (err) {
    console.debug("XP chime sound skipped:", err);
  }
}

export default function XpFloatingPopup() {
  const [items, setItems] = useState<XpItem[]>([]);

  useEffect(() => {
    function handleXpGained(e: Event) {
      const detail = (e as CustomEvent<XpEventDetail>).detail;
      if (!detail || typeof detail.xp !== "number" || detail.xp <= 0) return;

      const newItem: XpItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        xp: detail.xp,
        label: detail.label || "Tích lũy điểm kinh nghiệm",
      };

      setItems((prev) => [...prev.slice(-2), newItem]);
      playXpChimeSound();

      setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== newItem.id));
      }, 2800);
    }

    window.addEventListener("thtcdn:xp-gained", handleXpGained);
    return () => {
      window.removeEventListener("thtcdn:xp-gained", handleXpGained);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="fixed top-3 right-16 sm:right-36 z-[100] flex flex-col items-end gap-2 pointer-events-none select-none">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15, scale: 0.6, rotate: -4 }}
            animate={{
              opacity: [0, 1, 1, 0.9, 0],
              y: [15, -10, -25, -40, -55],
              scale: [0.6, 1.2, 1.05, 1, 0.9],
              rotate: [-4, 2, -1, 0, 0],
            }}
            transition={{ duration: 2.7, times: [0, 0.15, 0.4, 0.8, 1], ease: "easeOut" }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 text-white shadow-[0_8px_30px_rgba(16,185,129,0.5)] border-2 border-white/40 backdrop-blur-md"
          >
            {/* Sparkle Icon */}
            <div className="w-7 h-7 rounded-full bg-white/25 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/40 animate-bounce">
              {item.xp >= 30 ? (
                <Trophy className="w-4 h-4 text-amber-200" />
              ) : (
                <Zap className="w-4 h-4 text-yellow-200 fill-yellow-300" />
              )}
            </div>

            {/* XP Count & Label */}
            <div className="flex items-center gap-1.5 pr-1">
              <span className="font-black text-xl tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                +{item.xp} XP
              </span>
              <Sparkles className="w-4 h-4 text-amber-200 animate-spin" style={{ animationDuration: "2.5s" }} />
              {item.label && (
                <span className="hidden sm:inline text-xs font-bold text-emerald-100/90 pl-1 border-l border-white/20">
                  {item.label}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
