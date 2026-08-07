"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import {
  getUserStreak,
  hasActivityToday as checkActivityToday,
  getStreakRestoreOffer,
} from "@/lib/supabase-streak";
import {
  getDailyMotivation,
  daysSince,
  MOTIVATION_TONE_LABEL,
  type DailyMotivation,
} from "@/lib/daily-motivation";
import { getLateNightNote } from "@/lib/quiet-corner";
import MotivationShareCard from "@/components/MotivationShareCard";
import { useI18n } from "@/lib/i18n/context";

/**
 * "Ngọn lửa đinh hoả" - lời nhắn mỗi ngày.
 *
 * Ngọn lửa cháy to nhất khi người học nguội nhất: streak vừa đứt hoặc vắng
 * nhiều ngày thì `warmth` gần 1, card sáng và ấm hơn hẳn ngày thường. Đây là
 * chủ ý, không phải lỗi tương phản - lúc dễ bỏ cuộc nhất là lúc cần thấy lửa.
 */

export default function DailyMotivationWidget({ userId }: { userId: string }) {
  const { t } = useI18n();
  const [motivation, setMotivation] = useState<DailyMotivation | null>(null);

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
  // Đọc đồng hồ ở đây an toàn: khối này chỉ render sau khi fetch xong ở client
  // nên không có bản HTML từ server để lệch.
  const lateNight = getLateNightNote(new Date().getHours());

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

      {/* Phần chữ là link sang trang riêng; nút chia sẻ nằm ngoài link, vì một
          <button> lồng trong <a> là HTML không hợp lệ và bàn phím sẽ lạc. */}
      <Link href="/loi-nhan" className="relative flex items-start gap-3.5 group">
        <motion.div
          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-md"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flame className="h-5 w-5 text-white" />
        </motion.div>

        <div className="min-w-0">
          {lateNight && (
            <p className="mb-1.5 text-[11px] font-semibold leading-relaxed text-stone-500 dark:text-stone-400">
              {lateNight}
            </p>
          )}
          <p className="text-[10px] font-bold uppercase tracking-wide text-orange-700 dark:text-orange-300">
            {MOTIVATION_TONE_LABEL[tone]}
          </p>
          <p className="mt-1.5 text-sm font-semibold leading-relaxed text-stone-800 dark:text-stone-100">
            {message.text}
          </p>
          <p className="mt-2 text-[11px] font-bold text-orange-600 dark:text-orange-400 group-hover:underline">
            {t.miscUi.dailyMotivationWidget.openQuietCorner}
          </p>
        </div>
      </Link>

      <div className="relative mt-3 pl-[54px]">
        <MotivationShareCard text={message.text} />
      </div>
    </div>
  );
}
