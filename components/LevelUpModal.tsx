"use client";

import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { LEVELS } from "@/lib/levels";

interface LevelUpModalProps {
  level: number;
  onClose: () => void;
}

const CONFETTI_COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ec4899", "#8b5cf6", "#14b8a6"];

// Deterministic-per-mount confetti pieces (no external library - a burst of
// small divs animated via CSS custom properties for random-looking start
// position/drift/rotation, generated once and never re-derived on re-render).
function useConfettiPieces(count: number) {
  const [pieces] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 2.2 + Math.random() * 1.2,
      drift: (Math.random() - 0.5) * 160,
      rotate: Math.random() * 720 - 360,
      size: 6 + Math.random() * 6,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    }))
  );
  return pieces;
}

// Full-screen celebratory moment for leveling up - the emotional touchpoint
// this app had for lesson completion (score card, share button) but not for
// crossing a level threshold, which used to just be a quiet number change on
// the status bar. Triggered by useLevelUpWatcher (see AppNavbar) comparing
// the freshly-loaded profile's current_level against the last one seen on
// this device (localStorage), so it fires once per level gained regardless
// of which page/action caused it.
export default function LevelUpModal({ level, onClose }: LevelUpModalProps) {
  const confetti = useConfettiPieces(48);
  const levelInfo = LEVELS.find((l) => l.level === level);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Lên cấp"
    >
      <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {confetti.map((p) => (
          <span
            key={p.id}
            className="absolute top-0 rounded-sm animate-[confetti-fall_var(--dur)_ease-in_var(--delay)_forwards]"
            style={
              {
                left: `${p.left}%`,
                width: p.size,
                height: p.size * 1.6,
                backgroundColor: p.color,
                "--dur": `${p.duration}s`,
                "--delay": `${p.delay}s`,
                "--drift": `${p.drift}px`,
                "--rot": `${p.rotate}deg`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div
        className={`relative w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl p-8 text-center shadow-2xl transition-all duration-300 ${
          visible ? "scale-100 translate-y-0" : "scale-90 translate-y-4"
        }`}
      >
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-24 h-24 mx-auto mb-5">
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-emerald-500 animate-ping opacity-30" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 via-emerald-500 to-teal-500 flex items-center justify-center shadow-lg animate-[level-pop_0.5s_ease-out]">
            <span className="text-4xl font-extrabold text-white">{level}</span>
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-7 h-7 text-amber-400 animate-pulse" />
        </div>

        <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1.5">
          Lên cấp!
        </p>
        <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 mb-1">
          Level {level}{levelInfo ? ` · ${levelInfo.name}` : ""}
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
          Kiến thức tài chính của bạn đang tích luỹ thật sự. Tiếp tục phát huy nhé!
        </p>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-sm hover:bg-stone-800 dark:hover:bg-white transition-colors"
        >
          Tuyệt vời! 🎉
        </button>
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-10px) translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) translateX(var(--drift)) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes level-pop {
          0% { transform: scale(0.5); }
          60% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
