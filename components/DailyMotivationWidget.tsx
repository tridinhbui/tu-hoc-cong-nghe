"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import {
  getUserStreak,
  hasActivityToday as checkActivityToday,
  getStreakRestoreOffer,
} from "@/lib/cloudflare-streak";
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
 * nhiều ngày thì `warmth` gần 1 và cạnh trái của thẻ thành vạch xanh. Đây là
 * chủ ý - lúc dễ bỏ cuộc nhất là lúc cần thấy lửa.
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

  const { message, tone, warmth } = motivation;
  // Đọc đồng hồ ở đây an toàn: khối này chỉ render sau khi fetch xong ở client
  // nên không có bản HTML từ server để lệch.
  // `getLateNightNote` chỉ còn được hỏi CÓ hay KHÔNG - chữ thì lấy từ từ điển.
  // Nó trả về null ngoài dải 23h-5h, và đó là logic chứ không phải câu chữ.
  const lateNight = getLateNightNote(new Date().getHours()) ? t.motivationLateNight : null;
  // Câu tra theo `message.id`: pool được chọn bằng hash nên vị trí không ổn định.
  const line = t.motivationLines[message.id] ?? message.text;

  // Lửa to khi người học nguội: bản trước phủ quầng cam và gradient theo
  // `warmth`. Hệ thiết kế không có quầng sáng, nên cùng tín hiệu giờ nói bằng
  // cạnh trái: ngày thường là nét kẻ xám, lúc streak vừa đứt hoặc vắng lâu
  // (warmth cao) nó thành vạch xanh - màu của "dữ liệu sống, nhìn vào đây".
  const hot = warmth >= 0.5;

  return (
    <div
      className={
        compact
          ? `relative border-l-2 py-0.5 pl-3 ${hot ? "border-l-accent-line-mid" : "border-l-line"}`
          : `relative rounded-md border border-l-2 bg-white p-5 dark:bg-stone-900 ${
              hot ? "border-line border-l-accent-line-mid" : "border-line"
            }`
      }
    >
      {/* Phần chữ là link sang trang riêng; nút chia sẻ nằm ngoài link, vì một
          <button> lồng trong <a> là HTML không hợp lệ và bàn phím sẽ lạc. */}
      <Link href="/loi-nhan" className={`relative flex items-start group ${compact ? "gap-3" : "gap-3.5"}`}>
        <div
          className={`mt-0.5 flex shrink-0 items-center justify-center rounded-sm bg-surface-raised dark:bg-stone-950 ${
            hot ? "text-accent" : "text-ink-faint"
          } ${compact ? "h-7 w-7" : "h-10 w-10"}`}
        >
          <Flame className={compact ? "h-4 w-4" : "h-5 w-5"} />
        </div>

        <div className="min-w-0">
          {lateNight && (
            <p className="mb-1.5 text-[11px] font-semibold leading-relaxed text-ink-muted">
              {lateNight}
            </p>
          )}
          <p className={`eyebrow text-ink-faint ${compact ? "!text-[9px]" : ""}`}>
            {t.motivationToneLabel[tone] ?? MOTIVATION_TONE_LABEL[tone]}
          </p>
          <p className={`font-medium leading-relaxed text-ink-body ${compact ? "mt-1 text-[11px]" : "mt-1.5 text-sm"}`}>
            {line}
          </p>
          <p className={`font-semibold text-ink-muted underline-offset-4 group-hover:text-accent-strong group-hover:underline ${compact ? "mt-1 text-[10px]" : "mt-2 text-[11px]"}`}>
            {t.miscUi.dailyMotivationWidget.openQuietCorner}
          </p>
        </div>
      </Link>

      {/* Nút chia sẻ chỉ có ở bản đầy đủ. Nó là hành động phụ - lời nhắn mới là
          nội dung - và ở bản gọn nó chiếm nguyên một hàng dưới cùng thẻ. Ẩn chứ
          không bỏ: đổi sang "Đầy đủ" là nó quay lại nguyên vẹn. */}
      {!compact && (
        <div className="relative mt-3 pl-[54px]">
          <MotivationShareCard text={line} />
        </div>
      )}
    </div>
  );
}
