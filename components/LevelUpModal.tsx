"use client";

import { useEffect, useRef, useState } from "react";
import { X, Download, Share2, Check } from "lucide-react";
import { toast } from "sonner";
import { LEVELS } from "@/lib/levels";
import { svgToPngBlob, shareOrDownloadImage } from "@/lib/share-image";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { Frame, Sys, btnPrimary, btnSecondary } from "@/components/ui/system";

interface LevelUpModalProps {
  level: number;
  userName: string;
  onClose: () => void;
}

/* i18n-ignore-start: định danh hệ thống, không phải chữ hiển thị */
const SYS = {
  path: "THCN://APP/LEVEL-UP",
  level: (n: number) => `LVL ${String(n).padStart(2, "0")}`,
  minXp: (n: number) => `MIN ${n} XP`,
};
/* i18n-ignore-end */

// Full-screen celebratory moment for leveling up - the emotional touchpoint
// this app had for lesson completion (score card, share button) but not for
// crossing a level threshold, which used to just be a quiet number change on
// the status bar. Triggered by useLevelUpWatcher (see AppNavbar) comparing
// the freshly-loaded profile's current_level against the last one seen on
// this device (localStorage), so it fires once per level gained regardless
// of which page/action caused it.
export default function LevelUpModal({ level, userName, onClose }: LevelUpModalProps) {
  const { t } = useI18n();
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
      // Cùng lý do với CertificateModal: bản cũ chép lại logic tải tệp ngay
      // tại đây, nên nó mang y nguyên lỗi thu hồi blob URL sớm và cũng không
      // bao giờ thử khay chia sẻ - thứ duy nhất lưu được ảnh trên iOS.
      const outcome = await shareOrDownloadImage(
        blob,
        cardFilename,
        format(t.levelUp.shareCaption, { level })
      );
      if (outcome === "cancelled") return;
      setDownloaded(true);
      toast.success(
        outcome === "shared"
          ? t.levelUp.toastSharedOrSaved
          : t.levelUp.toastDownloaded
      );
    } catch (error) {
      console.error("Error creating level-up card download:", error);
      toast.error(t.levelUp.toastDownloadError);
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
        levelInfo
          ? format(t.levelUp.shareCaptionWithName, { level, name: t.levelTitles[level] ?? levelInfo.name })
          : format(t.levelUp.shareCaption, { level })
      );
      if (outcome === "shared") toast.success(t.levelUp.toastShared);
      else if (outcome === "downloaded") toast.success(t.levelUp.toastSharedDownloaded);
    } catch (error) {
      console.error("Error sharing level-up card:", error);
      toast.error(t.levelUp.toastShareError);
    } finally {
      setSharing(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto px-4 py-4 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      role="dialog"
      aria-modal="true"
      aria-label={t.levelUp.dialogAriaLabel}
    >
      <div className="fixed inset-0 bg-stone-950/60" onClick={onClose} />

      <Frame
        title={SYS.path}
        meta={SYS.level(level)}
        actions={
          <button
            onClick={onClose}
            aria-label={t.levelUp.closeAriaLabel}
            className="text-ink-muted transition-colors hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        }
        className={`relative my-auto w-full max-w-sm transition-all duration-300 ${
          visible ? "translate-y-0" : "translate-y-2"
        }`}
        bodyClassName="p-6"
      >
        <div className="flex items-end justify-between gap-4 border-b border-line-strong pb-4">
          <span className="text-6xl font-black leading-none tracking-tight tabular-nums text-ink-max">{level}</span>
          {levelInfo && <Sys className="pb-1 text-ink-muted">{SYS.minXp(levelInfo.minXp)}</Sys>}
        </div>

        <p className="eyebrow mt-4 text-ink-soft">{t.levelUp.kicker}</p>
        <h2 className="mt-1 text-xl font-black tracking-tight text-ink-max">
          {levelInfo ? format(t.levelUp.headingWithName, { level, name: t.levelTitles[level] ?? levelInfo.name }) : format(t.levelUp.heading, { level })}
        </h2>
        <p className="mt-1 mb-6 text-sm text-ink-soft">
          {t.levelUp.subtitle}
        </p>

        <div className="mb-3 flex gap-2">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`${btnSecondary} flex-1 text-xs`}
          >
            {downloading ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600 dark:border-stone-600 dark:border-t-stone-200" />
            ) : downloaded ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            {t.levelUp.download}
          </button>
          <button
            onClick={handleShare}
            disabled={sharing}
            className={`${btnSecondary} flex-1 text-xs`}
          >
            {sharing ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600 dark:border-stone-600 dark:border-t-stone-200" />
            ) : (
              <Share2 className="h-3.5 w-3.5" />
            )}
            {t.levelUp.share}
          </button>
        </div>

        <button onClick={onClose} className={`${btnPrimary} w-full`}>
          {t.levelUp.confirm}
        </button>
      </Frame>

      {/* Hidden square achievement card - only rendered to be serialized
          into a shareable PNG by handleDownload/handleShare above, never
          shown on screen (the level number in the dialog above is the visual). */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 800"
        width="800"
        height="800"
        className="hidden"
        xmlns="http://www.w3.org/2000/svg"
      >

        <rect width="800" height="800" fill="#0c0a09" />
        <path d="M 50 50 L 750 50 L 750 750 L 50 750 Z" fill="none" stroke="#6c9bdc" strokeWidth="3" opacity="0.85" />
        <path d="M 62 62 L 738 62 L 738 738 L 62 738 Z" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.15" />

        <text x="400" y="140" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="900" letterSpacing="5">
          {t.levelUp.svgHeaderName}
        </text>
        <text x="400" y="185" textAnchor="middle" fill="#ffffff" fontSize="26" fontWeight="800" letterSpacing="3">
          {t.levelUp.svgTitle}
        </text>
        <line x1="300" y1="215" x2="500" y2="215" stroke="#6c9bdc" strokeWidth="1.5" />

        <circle cx="400" cy="380" r="130" fill="none" stroke="#6c9bdc" strokeWidth="3" opacity="0.9" />
        <circle cx="400" cy="380" r="115" fill="#0f1115" opacity="0.6" />
        <text x="400" y="405" textAnchor="middle" fill="#6c9bdc" fontSize="90" fontWeight="900">
          {level}
        </text>

        <text x="400" y="555" textAnchor="middle" fill="#94a3b8" fontSize="14" fontStyle="italic">
          {format(t.levelUp.svgUserAchieved, { userName })}
        </text>
        <text x="400" y="600" textAnchor="middle" fill="#ffffff" fontSize="30" fontWeight="800" letterSpacing="1">
          {levelInfo ? format(t.levelUp.svgLevelWithName, { level, name: t.levelTitles[level] ?? levelInfo.name }) : format(t.levelUp.svgLevel, { level })}
        </text>

        <line x1="220" y1="650" x2="580" y2="650" stroke="#334155" strokeWidth="0.8" />
        <text x="400" y="700" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="700" letterSpacing="1">
          {t.levelUp.svgFooter}
        </text>
      </svg>

    </div>
  );
}
