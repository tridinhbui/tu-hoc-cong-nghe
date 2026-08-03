"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Share2 } from "lucide-react";
import { toast } from "sonner";
import { svgToPngBlob, shareOrDownloadImage } from "@/lib/share-image";
import {
  getUserStreak,
  hasActivityToday as checkActivityToday,
  getStreakRestoreOffer,
} from "@/lib/supabase-streak";
import {
  getDailyMotivation,
  daysSince,
  wrapQuoteLines,
  type DailyMotivation,
} from "@/lib/daily-motivation";

/**
 * "Ngọn lửa đinh hoả" - lời nhắn mỗi ngày.
 *
 * Ngọn lửa cháy to nhất khi người học nguội nhất: streak vừa đứt hoặc vắng
 * nhiều ngày thì `warmth` gần 1, card sáng và ấm hơn hẳn ngày thường. Đây là
 * chủ ý, không phải lỗi tương phản - lúc dễ bỏ cuộc nhất là lúc cần thấy lửa.
 */

const TONE_LABEL: Record<DailyMotivation["tone"], string> = {
  rekindle: "Nhóm lại ngọn lửa",
  return: "Chào mừng quay lại",
  milestone: "Cột mốc của bạn",
  keep: "Giữ lửa hôm nay",
  steady: "Lời nhắn hôm nay",
};

export default function DailyMotivationWidget({ userId }: { userId: string }) {
  const [motivation, setMotivation] = useState<DailyMotivation | null>(null);
  const [sharing, setSharing] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

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
        "Lời nhắn hôm nay của mình trên Tự học Tài chính 🔥",
      );
      if (outcome === "shared") toast.success("Đã chia sẻ lời nhắn!");
      else if (outcome === "downloaded") {
        toast.success("Đã tải ảnh - đăng lên story/Facebook và đính kèm ảnh này nhé!");
      }
    } catch (error) {
      console.error("Error sharing daily motivation:", error);
      toast.error("Không thể tạo ảnh lúc này.");
    } finally {
      setSharing(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    Promise.all([getUserStreak(userId), checkActivityToday(userId)])
      .then(([streak, activeToday]) => {
        if (cancelled) return;
        setMotivation(
          getDailyMotivation(userId, {
            currentStreak: streak?.current_streak ?? 0,
            hasActivityToday: activeToday,
            daysSinceLastActivity: daysSince(streak?.last_activity_date),
            lostStreak: getStreakRestoreOffer(streak).lostStreak,
          }),
        );
      })
      .catch((error) => {
        console.error("Error loading daily motivation:", error);
        // Streak không đọc được thì vẫn hiện lời nhắn ngày thường - card này
        // không bao giờ nên là chỗ báo lỗi cho người học.
        if (!cancelled) {
          setMotivation(
            getDailyMotivation(userId, {
              currentStreak: 0,
              hasActivityToday: true,
              daysSinceLastActivity: 0,
              lostStreak: 0,
            }),
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (!motivation) return null;

  const { message, tone, warmth } = motivation;
  const shareLines = wrapQuoteLines(message.text);

  return (
    <div
      className="relative overflow-hidden rounded-[24px] border-2 bg-white p-5 shadow-sm dark:bg-stone-900"
      style={{ borderColor: `rgba(249, 115, 22, ${0.2 + warmth * 0.5})` }}
    >
      {/* Lớp ấm phủ trên nền theo warmth - để riêng thay vì đặt thẳng vào
          `background` của card, nhờ vậy nền gốc vẫn đổi theo light/dark và chữ
          luôn đủ tương phản ở cả hai chế độ. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(135deg, rgba(251, 146, 60, ${0.1 + warmth * 0.22}), rgba(249, 115, 22, ${0.04 + warmth * 0.12}))`,
        }}
      />

      {/* Quầng sáng của ngọn lửa - chỉ đủ thấy, không cản chữ */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-12 h-40 w-40 rounded-full blur-3xl"
        style={{ background: `rgba(251, 146, 60, ${0.25 + warmth * 0.45})` }}
        animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.08, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-start gap-3.5">
        <motion.div
          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-md"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flame className="h-5 w-5 text-white" />
        </motion.div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wide text-orange-700 dark:text-orange-300">
            {TONE_LABEL[tone]}
          </p>
          <p className="mt-1.5 text-sm font-semibold leading-relaxed text-stone-800 dark:text-stone-100">
            {message.text}
          </p>

          <button
            type="button"
            onClick={handleShare}
            disabled={sharing}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-orange-300 bg-white/80 px-3 py-1.5 text-[11px] font-bold text-orange-700 transition-colors hover:bg-orange-50 disabled:opacity-60 dark:border-orange-900 dark:bg-stone-900/80 dark:text-orange-300 dark:hover:bg-stone-800"
          >
            <Share2 className="h-3.5 w-3.5" />
            {sharing ? "Đang tạo ảnh..." : "Chia sẻ lời nhắn"}
          </button>
        </div>
      </div>

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
          TỰ HỌC TÀI CHÍNH MỖI NGÀY
        </text>
        <text x="400" y="240" textAnchor="middle" fontSize="86">
          🔥
        </text>

        {/* Câu nói được cắt dòng sẵn - SVG không tự xuống dòng. Khối chữ căn
            giữa theo chiều dọc quanh y=430 nên câu ngắn hay dài đều cân. */}
        {shareLines.map((line, index) => (
          <text
            key={line + index}
            x="400"
            y={430 - ((shareLines.length - 1) * 52) / 2 + index * 52}
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
          HỌC TÀI CHÍNH MỖI NGÀY · TUHOCTAICHINH.COM
        </text>
      </svg>
    </div>
  );
}
