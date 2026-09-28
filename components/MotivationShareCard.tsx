"use client";

import { useRef, useState } from "react";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { svgToPngBlob, shareOrDownloadImage } from "@/lib/share-image";
import { wrapQuoteLines } from "@/lib/daily-motivation";
import { useI18n } from "@/lib/i18n/context";
import { btnSecondary } from "@/components/ui/system";

// Nút chia sẻ + card PNG ẩn, gói chung một chỗ. Trước đây phần này nằm thẳng
// trong DailyMotivationWidget; khi trang /loi-nhan cần đúng tấm ảnh đó thì tách
// ra, vì hai bản SVG song song chắc chắn sẽ trôi lệch nhau sau vài lần sửa.

export default function MotivationShareCard({
  text,
  size = "sm",
}: {
  text: string;
  /** "lg" cho trang riêng, "sm" cho card nhỏ trên dashboard. */
  size?: "sm" | "lg";
}) {
  const { t } = useI18n();
  const svgRef = useRef<SVGSVGElement>(null);
  const [sharing, setSharing] = useState(false);
  const lines = wrapQuoteLines(text);

  const handleShare = async () => {
    if (!svgRef.current || sharing) return;
    setSharing(true);
    try {
      // Xuất ở 1600px (2x viewBox) cho nét trên màn hình retina, giống
      // LevelUpModal.
      const blob = await svgToPngBlob(svgRef.current, 1600, 1600);
      const outcome = await shareOrDownloadImage(
        blob,
        "loi-nhan-hom-nay.png",
        t.motivationShare.downloadedFilenameCaption,
      );
      if (outcome === "shared") toast.success(t.motivationShare.sharedToast);
      else if (outcome === "downloaded") {
        toast.success(t.motivationShare.downloadedToast);
      }
    } catch (error) {
      console.error("Error sharing daily motivation:", error);
      toast.error(t.motivationShare.errorToast);
    } finally {
      setSharing(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        disabled={sharing}
        className={
          size === "lg"
            ? `${btnSecondary} bg-white dark:bg-stone-900 cursor-pointer`
            : "inline-flex items-center gap-1.5 rounded-sm border border-line-strong bg-white px-3 py-1.5 text-[11px] font-bold text-ink-body transition-colors hover:border-stone-950 disabled:opacity-60 dark:bg-stone-900 dark:hover:border-stone-200 cursor-pointer"
        }
      >
        <Share2 className={size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5"} />
        {sharing ? t.motivationShare.generatingImage : t.motivationShare.shareMessage}
      </button>

      {/* Card vuông để xuất PNG - không bao giờ hiện trên màn hình, chỉ được
          serialize bởi handleShare. Cùng cách làm với LevelUpModal. */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 800"
        width="800"
        height="800"
        className="hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="motivationBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0c0a09" />
            <stop offset="60%" stopColor="#1c1917" />
            <stop offset="100%" stopColor="#431407" />
          </linearGradient>
          <linearGradient id="motivationAccent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <radialGradient id="motivationGlow">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="800" height="800" fill="url(#motivationBg)" />
        {/* Quầng lửa - phiên bản tĩnh của quầng sáng trên card màn hình */}
        <circle cx="400" cy="250" r="230" fill="url(#motivationGlow)" />
        <path d="M 50 50 L 750 50 L 750 750 L 50 750 Z" fill="none" stroke="url(#motivationAccent)" strokeWidth="3" opacity="0.85" />

        <text x="400" y="135" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="900" letterSpacing="5">
          {t.motivationShare.brandHeader}
        </text>
        {/* Icon ngọn lửa của Lucide, vẽ thẳng bằng path để handleShare
            serialize được - không dùng glyph emoji. */}
        <g transform="translate(364 168) scale(3)">
          <path
            d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Câu nói được cắt dòng sẵn - SVG không tự xuống dòng. Khối chữ căn
            giữa theo chiều dọc quanh y=430 nên câu ngắn hay dài đều cân. */}
        {lines.map((line, index) => (
          <text
            key={line + index}
            x="400"
            y={430 - ((lines.length - 1) * 52) / 2 + index * 52}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="34"
            fontWeight="700"
          >
            {line}
          </text>
        ))}

        <line x1="250" y1="660" x2="550" y2="660" stroke="url(#motivationAccent)" strokeWidth="1.5" opacity="0.7" />
        <text x="400" y="710" textAnchor="middle" fill="#a8a29e" fontSize="12" fontWeight="700" letterSpacing="1">
          {t.motivationShare.brandFooter}
        </text>
      </svg>
    </>
  );
}
