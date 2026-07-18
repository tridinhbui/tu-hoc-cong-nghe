"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Download, Share2, Check } from "lucide-react";
import { toast } from "sonner";
import { LEVELS } from "@/lib/levels";
import { svgToPngBlob, shareOrDownloadImage } from "@/lib/share-image";

interface LevelUpModalProps {
  level: number;
  userName: string;
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
export default function LevelUpModal({ level, userName, onClose }: LevelUpModalProps) {
  const confetti = useConfettiPieces(48);
  const levelInfo = LEVELS.find((l) => l.level === level);
  const [visible, setVisible] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [sharing, setSharing] = useState(false);

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

  const cardFilename = `len_cap_${level}.png`;

  const handleDownload = async () => {
    if (!svgRef.current || downloading) return;
    setDownloading(true);
    try {
      const blob = await svgToPngBlob(svgRef.current, 1600, 1600);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = cardFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloaded(true);
      toast.success("Đã tải ảnh thành tích! Đăng lên story/Facebook khoe ngay nào 🎉");
    } catch (error) {
      console.error("Error creating level-up card download:", error);
      toast.error("Không thể tạo ảnh lúc này.");
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!svgRef.current || sharing) return;
    setSharing(true);
    try {
      const blob = await svgToPngBlob(svgRef.current, 1600, 1600);
      const outcome = await shareOrDownloadImage(
        blob,
        cardFilename,
        `Mình vừa lên Level ${level}${levelInfo ? ` - ${levelInfo.name}` : ""} trên Tự học Tài chính! 🎉`
      );
      if (outcome === "shared") toast.success("Đã chia sẻ thành tích!");
      else if (outcome === "downloaded") toast.success("Đã tải ảnh - đăng lên Facebook/story và đính kèm ảnh này nhé!");
    } catch (error) {
      console.error("Error sharing level-up card:", error);
      toast.error("Không thể chia sẻ lúc này.");
    } finally {
      setSharing(false);
    }
  };

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

        <div className="flex gap-2 mb-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-1.5"
          >
            {downloading ? (
              <span className="w-3.5 h-3.5 border-2 border-stone-300 border-t-stone-600 dark:border-stone-600 dark:border-t-stone-200 rounded-full animate-spin" />
            ) : downloaded ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            Tải ảnh
          </button>
          <button
            onClick={handleShare}
            disabled={sharing}
            className="flex-1 py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-1.5"
          >
            {sharing ? (
              <span className="w-3.5 h-3.5 border-2 border-stone-300 border-t-stone-600 dark:border-stone-600 dark:border-t-stone-200 rounded-full animate-spin" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
            Chia sẻ
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-sm hover:bg-stone-800 dark:hover:bg-white transition-colors"
        >
          Tuyệt vời! 🎉
        </button>
      </div>

      {/* Hidden square achievement card - only rendered to be serialized
          into a shareable PNG by handleDownload/handleShare above, never
          shown on screen (the celebratory circle above is the visual). */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 800"
        width="800"
        height="800"
        className="hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="levelBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0c0a09" />
            <stop offset="55%" stopColor="#0f1115" />
            <stop offset="100%" stopColor="#052e2b" />
          </linearGradient>
          <linearGradient id="levelAccent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>

        <rect width="800" height="800" fill="url(#levelBg)" />
        <path d="M 50 50 L 750 50 L 750 750 L 50 750 Z" fill="none" stroke="url(#levelAccent)" strokeWidth="3" opacity="0.85" />
        <path d="M 62 62 L 738 62 L 738 738 L 62 738 Z" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.15" />

        <text x="400" y="140" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="900" letterSpacing="5">
          TỰ HỌC TÀI CHÍNH MỖI NGÀY
        </text>
        <text x="400" y="185" textAnchor="middle" fill="#ffffff" fontSize="26" fontWeight="800" letterSpacing="3">
          THÀNH TÍCH LÊN CẤP
        </text>
        <line x1="300" y1="215" x2="500" y2="215" stroke="url(#levelAccent)" strokeWidth="1.5" />

        <circle cx="400" cy="380" r="130" fill="none" stroke="url(#levelAccent)" strokeWidth="3" opacity="0.9" />
        <circle cx="400" cy="380" r="115" fill="#0f1115" opacity="0.6" />
        <text x="400" y="405" textAnchor="middle" fill="url(#levelAccent)" fontSize="90" fontWeight="900">
          {level}
        </text>

        <text x="400" y="555" textAnchor="middle" fill="#94a3b8" fontSize="14" fontStyle="italic">
          {userName} vừa đạt
        </text>
        <text x="400" y="600" textAnchor="middle" fill="#ffffff" fontSize="30" fontWeight="800" letterSpacing="1">
          Level {level}{levelInfo ? ` · ${levelInfo.name}` : ""}
        </text>

        <line x1="220" y1="650" x2="580" y2="650" stroke="#334155" strokeWidth="0.8" />
        <text x="400" y="700" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="700" letterSpacing="1">
          HỌC TÀI CHÍNH MỖI NGÀY · TUHOCTAICHINH.COM
        </text>
      </svg>

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
