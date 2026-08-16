"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

/** `compact` để thẻ này nằm BÊN TRONG một thẻ khác (bản đồ cấp độ).
 *
 *  Bản thường là một tấm thẻ đứng riêng: viền dày, padding 20px, chữ cỡ bài
 *  đọc. Nhét nguyên nó vào trong một thẻ khác thì thành thẻ-trong-thẻ, và cái
 *  bên trong lại to giọng hơn cái bên ngoài. Bản compact bỏ viền dày, rút
 *  padding và cỡ chữ, giữ nguyên nội dung và cả hai lối ra. */
export default function DailyMotivationWidget({ userId, compact = false }: { userId: string; compact?: boolean }) {
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

  // `warmth` không còn được đọc: nó chỉ dùng để pha độ đậm của lớp phủ cam và
  // quầng sáng, cả hai đã bỏ. Giữ nguyên phép tính ở lib vì nó cũng quyết định
  // `tone`, thứ vẫn đang chọn câu chữ.
  const { message, tone } = motivation;
  // Đọc đồng hồ ở đây an toàn: khối này chỉ render sau khi fetch xong ở client
  // nên không có bản HTML từ server để lệch.
  // `getLateNightNote` chỉ còn được hỏi CÓ hay KHÔNG - chữ thì lấy từ từ điển.
  // Nó trả về null ngoài dải 23h-5h, và đó là logic chứ không phải câu chữ.
  const lateNight = getLateNightNote(new Date().getHours()) ? t.motivationLateNight : null;
  // Câu tra theo `message.id`: pool được chọn bằng hash nên vị trí không ổn định.
  const line = t.motivationLines[message.id] ?? message.text;

  return (
    <div
      // `compact` giờ là KHÔNG VỎ: thẻ này nằm bên trong một khối chung do
      // DashboardClient dựng, nên nó không tự dựng mặt phẳng nữa.
      //
      // Cả lớp trang trí cam đã đi: một lớp phủ chuyển sắc theo `warmth`, một
      // quầng `blur-3xl` đập theo nhịp 4,5 giây, một ô biểu tượng bo góc tô
      // gradient hổ phách→cam có đổ bóng và tự phóng to thu nhỏ, cộng viền màu
      // cam đậm dần. Sáu thứ trang trí cho MỘT câu động viên - và chúng đứng
      // ngay cạnh mục tiêu nghề nghiệp, thứ thật sự nói người học đang đi tới
      // đâu. Câu động viên là lời phụ, nên giờ nó trông như lời phụ.
      className={compact ? "" : "relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900"}
    >
      <Link href="/loi-nhan" className="group block">
        {lateNight && (
          <p className="mb-1 text-[11px] leading-relaxed text-stone-400 dark:text-stone-500">
            {lateNight}
          </p>
        )}
        <p className="eyebrow text-stone-400 dark:text-stone-500">
          {t.motivationToneLabel[tone] ?? MOTIVATION_TONE_LABEL[tone]}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-stone-600 dark:text-stone-400">
          {line}
        </p>
        <p className="mt-1.5 text-xs text-stone-500 underline decoration-stone-300 underline-offset-4 transition-colors group-hover:text-stone-800 dark:text-stone-400 dark:decoration-stone-600 dark:group-hover:text-stone-200">
          {t.miscUi.dailyMotivationWidget.openQuietCorner}
        </p>
      </Link>

      {!compact && (
        // `pl-[54px]` đã bỏ: nó canh với ô biểu tượng ngọn lửa 40px cộng
        // khoảng cách 14px, mà ô đó không còn. Giữ lại thì nút chia sẻ thụt vào
        // 54px so với chữ ngay trên nó, canh theo một thứ vô hình.
        <div className="relative mt-3">
          <MotivationShareCard text={line} />
        </div>
      )}
    </div>
  );
}
