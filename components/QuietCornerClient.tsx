"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Info } from "lucide-react";
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
import { QUIET_CORNER_LIMITS, WORRY_REFRAMES } from "@/lib/quiet-corner";
import MotivationShareCard from "@/components/MotivationShareCard";
import BreathingCircle from "@/components/BreathingCircle";
import DinhHoaFlame from "@/components/DinhHoaFlame";

// "Góc yên tĩnh" - trang riêng đằng sau thẻ lời nhắn.
//
// Trang duy nhất trong app không có XP, không streak, không nhiệm vụ, không
// nút "học tiếp ngay". Mọi trang khác đã đẩy người dùng đi tới rồi; trang này
// tồn tại để hạ nhịp, nên bất kỳ phần thưởng nào gắn vào đây cũng sẽ biến việc
// nghỉ thành một nhiệm vụ nữa phải hoàn thành.

export default function QuietCornerClient({ userId }: { userId: string }) {
  const [motivation, setMotivation] = useState<DailyMotivation | null>(null);
  const [openWorry, setOpenWorry] = useState<string | null>(null);

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
        console.error("Error loading quiet corner motivation:", error);
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

  const warmth = motivation?.warmth ?? 0.5;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:py-10">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 transition-colors hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Về trang chủ
      </Link>

      {/* --- Lời nhắn hôm nay --------------------------------------------- */}
      {/* Nền tối gần như đen chứ không phải stone-900 phủ lớp cam: phủ ấm lên
          nền xám cho ra một mảng nâu đục, và ngọn lửa mất hết chiều sâu. Ở đây
          nền lùi hẳn xuống để quầng lửa là nguồn sáng duy nhất của khối. */}
      <section
        className="relative mt-4 overflow-hidden rounded-[28px] border-2 bg-white px-6 py-12 text-center shadow-sm dark:bg-[#0a0806]"
        style={{ borderColor: `rgba(249, 115, 22, ${0.18 + warmth * 0.42})` }}
      >
        {/* Sáng: nền kem ấm. Tối: chỉ một vầng sáng rất nhạt hắt từ chỗ ngọn
            lửa đứng, phần còn lại để nguyên đen. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 dark:hidden"
          style={{
            background: `linear-gradient(160deg, rgba(251, 146, 60, ${0.1 + warmth * 0.2}), rgba(249, 115, 22, ${0.03 + warmth * 0.09}))`,
          }}
        />
        {/* Vầng sáng nền thở theo một nhịp riêng, chậm hơn mọi lớp trong
            DinhHoaFlame - cả khối vì thế sáng lên và lùi xuống rất chậm thay
            vì đứng yên làm phông. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden dark:block"
          style={{
            background: `radial-gradient(120% 70% at 50% 22%, rgba(249, 115, 22, ${0.14 + warmth * 0.2}) 0%, rgba(120, 53, 15, ${0.06 + warmth * 0.08}) 38%, rgba(0,0,0,0) 72%)`,
          }}
          animate={{ opacity: [0.82, 1, 0.88, 0.82] }}
          transition={{ duration: 11, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        />

        <div className="relative">
          <div className="flex justify-center">
            <DinhHoaFlame intensity={warmth} />
          </div>

          {motivation ? (
            // Vào chậm và nối tiếp nhau chứ không hiện cùng lúc: nhãn trước,
            // rồi lời nhắn, rồi nút chia sẻ. Người đọc bắt được nhịp đó và
            // đọc chậm theo, thay vì quét cả khối trong một cái liếc.
            <motion.div
              initial="hidden"
              animate="shown"
              variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.55, delayChildren: 0.35 } } }}
            >
              {[
                <p
                  key="tone"
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-300"
                >
                  {MOTIVATION_TONE_LABEL[motivation.tone]}
                </p>,
                <p
                  key="text"
                  className="mx-auto mt-4 max-w-lg text-lg font-bold leading-relaxed text-stone-800 sm:text-xl dark:text-stone-100"
                >
                  {motivation.message.text}
                </p>,
                <div key="share" className="mt-6">
                  <MotivationShareCard text={motivation.message.text} size="lg" />
                </div>,
              ].map((child, i) => (
                <motion.div
                  key={child.key}
                  className={i === 0 ? "mt-5" : undefined}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    shown: { opacity: 1, y: 0, transition: { duration: 1.4, ease: [0.4, 0, 0.2, 1] } },
                  }}
                >
                  {child}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Chỗ giữ chỗ cùng chiều cao để trang không giật khi lời nhắn về.
            <div className="mt-5 h-[168px]" aria-hidden />
          )}
        </div>
      </section>

      {/* --- Một phút thở -------------------------------------------------- */}
      <section className="mt-6 rounded-[28px] border border-stone-200 bg-stone-50 px-6 py-7 dark:border-stone-800 dark:bg-stone-900/50">
        <h2 className="text-center text-base font-extrabold text-stone-800 dark:text-stone-100">
          Một phút thở
        </h2>
        <p className="mx-auto mt-1.5 max-w-md text-center text-xs leading-relaxed text-stone-500 dark:text-stone-400">
          Nhịp 4-4-4-4, bốn vòng. Không tính điểm, không lưu lại, không ai biết
          bạn có làm hay không.
        </p>
        <BreathingCircle />
      </section>

      {/* --- Đặt xuống một gánh nặng --------------------------------------- */}
      <section className="mt-6 rounded-[28px] border border-stone-200 bg-white px-5 py-7 dark:border-stone-800 dark:bg-stone-900">
        <div className="px-1 text-center">
          <h2 className="text-base font-extrabold text-stone-800 dark:text-stone-100">
            Đặt xuống một gánh nặng
          </h2>
          <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-stone-500 dark:text-stone-400">
            Chọn nỗi lo đang nằm trong đầu bạn để xem một góc nhìn khác. Đây là
            cách nghĩ, không phải lời khuyên nên mua gì hay tiêu bao nhiêu.
          </p>
        </div>

        <ul className="mt-5 space-y-2.5">
          {WORRY_REFRAMES.map((item) => {
            const open = openWorry === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setOpenWorry(open ? null : item.id)}
                  aria-expanded={open}
                  className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                    open
                      ? "border-orange-300 bg-orange-50 text-stone-900 dark:border-orange-900 dark:bg-orange-950/30 dark:text-stone-100"
                      : "border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-800/50 dark:text-stone-300 dark:hover:bg-stone-800"
                  }`}
                >
                  “{item.worry}”
                </button>
                {open && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 px-4 py-3.5 text-sm leading-relaxed text-stone-700 dark:from-stone-800 dark:to-stone-800/60 dark:text-stone-300"
                  >
                    {item.reframe}
                  </motion.p>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* --- Ranh giới ------------------------------------------------------
          Luôn hiện, không gập lại được, không đặt sau một cú bấm. Nếu người
          đọc chỉ nhìn trang này một lần thì đây là phần họ cần đọc nhất. */}
      <section className="mt-6 mb-4 rounded-[28px] border border-stone-200 bg-stone-50 px-5 py-6 dark:border-stone-800 dark:bg-stone-900/50">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
          <div>
            <h2 className="text-sm font-extrabold text-stone-700 dark:text-stone-200">
              {QUIET_CORNER_LIMITS.title}
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
              {QUIET_CORNER_LIMITS.body}
            </p>
          </div>
        </div>
      </section>

      <p className="flex items-center justify-center gap-1.5 pb-6 text-[11px] font-semibold text-stone-400">
        <Heart className="h-3 w-3" />
        Không có XP nào ở trang này. Đó là chủ ý.
      </p>
    </div>
  );
}
