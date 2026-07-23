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

// Synthesizes a crisp, uplifting 2-tone "Level/XP Chime" using Web Audio API
// No mp3 asset downloading needed - works cross-device instantly.
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
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.25);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(987.77, now + 0.08);
    gain2.gain.setValueAtTime(0.2, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.45);
  } catch (err) {
    // Ignore audio autoplay restrictions if user hasn't interacted yet
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
        label: detail.label || "Thích lũy điểm kinh nghiệm",
      };

      setItems((prev) => [...prev.slice(-2), newItem]); // Keep at most 3 popups concurrently
      playXpChimeSound();

      // Auto remove popup after 2.6s
      setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== newItem.id));
      }, 2600);
    }

    window.addEventListener("thtcdn:xp-gained", handleXpGained);
    return () => {
      window.removeEventListener("thtcdn:xp-gained", handleXpGained);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="fixed top-16 right-4 sm:right-8 z-[100] flex flex-col gap-2.5 pointer-events-none select-none">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -20, scale: 0.8, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: -30, scale: 0.85, transition: { duration: 0.25 } }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 text-white shadow-[0_10px_25px_-5px_rgba(16,185,129,0.4)] border border-white/20 backdrop-blur-md"
          >
            {/* Sparkle icon circle */}
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/30 animate-pulse">
              {item.xp >= 30 ? (
                <Trophy className="w-5 h-5 text-amber-200" />
              ) : (
                <Zap className="w-5 h-5 text-yellow-200 fill-yellow-300" />
              )}
            </div>

            {/* Content */}
            <div className="min-w-0 pr-1">
              <div className="flex items-center gap-1.5 font-black text-lg tracking-tight leading-none text-white drop-shadow-xs">
                <span>+{item.xp} XP</span>
                <Sparkles className="w-4 h-4 text-amber-200 animate-spin" style={{ animationDuration: "3s" }} />
              </div>
              <p className="text-[11px] font-bold text-emerald-100/90 truncate mt-0.5 max-w-[180px]">
                {item.label}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
