"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Heart, Info } from "lucide-react";
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
import {
  QUIET_CORNER_CLOSING,
  QUIET_CORNER_LIMITS,
  QUIET_CORNER_QUESTIONS,
  type WorryReframe,
  WORRY_SET_DOWN,
  getQuietGreetingKey,
} from "@/lib/quiet-corner";
import MotivationShareCard from "@/components/MotivationShareCard";
import BreathingCircle from "@/components/BreathingCircle";
import QuietForestScene from "@/components/QuietForestScene";
import { FLARE_MS, flameAt } from "@/lib/quiet-flame";
import {
  WORRY_THEMES,
  WORRY_THEME_PROMPT,
  orderWorriesByTheme,
} from "@/lib/quiet-corner-themes";
import { useI18n } from "@/lib/i18n/context";
import { btnSecondary, panel } from "@/components/ui/system";

// "Góc yên tĩnh" - trang riêng đằng sau thẻ lời nhắn.
//
// Trang duy nhất trong app không có XP, không streak, không nhiệm vụ, không
// nút "học tiếp ngay". Mọi trang khác đã đẩy người dùng đi tới rồi; trang này
// tồn tại để hạ nhịp, nên bất kỳ phần thưởng nào gắn vào đây cũng sẽ biến việc
// nghỉ thành một nhiệm vụ nữa phải hoàn thành.

export default function QuietCornerClient({ userId }: { userId: string }) {
  const { t } = useI18n();
  const [motivation, setMotivation] = useState<DailyMotivation | null>(null);
  const [openWorry, setOpenWorry] = useState<string | null>(null);
  // Nỗi lo đã "đặt xuống" trong phiên này. Cố ý không lưu đi đâu: sang mai
  // nỗi lo có thể quay lại, và trang không có quyền giả vờ rằng nó đã hết.
  const [setDownIds, setSetDownIds] = useState<ReadonlySet<string>>(new Set());
  // Nhóm nỗi lo người đọc vừa nói là đang nặng nhất. Chỉ sống trong phiên,
  // như mọi thứ khác trên trang này.
  const [worryTheme, setWorryTheme] = useState<string | null>(null);

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

  // Ngọn lửa nhận lấy thứ vừa được đặt xuống: bùng lên một nhịp rồi đứng lại
  // ở mức cao hơn trước. Trước đây nó cháy đúng một độ suốt cả trang, nên cử
  // chỉ duy nhất trang này mời người ta làm lại không được đáp lại bằng gì.
  //
  // Mức nghỉ tính từ số nỗi lo đã đặt xuống chứ không lưu đi đâu, đúng theo
  // ghi chú ở setDownIds: sang mai nỗi lo có thể quay lại, và ngọn lửa không
  // có quyền giữ lại một thành tích mà người học chưa chắc còn.
  const setDownCount = setDownIds.size;
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [flareIntensity, setFlareIntensity] = useState<number | null>(null);

  useEffect(() => {
    if (setDownCount === 0 || prefersReducedMotion) return;
    // requestAnimationFrame chứ không phải transition CSS: DinhHoaFlame đọc
    // intensity thẳng vào chuỗi gradient, nên giá trị phải tự đi qua từng
    // bước - gán một con số mới sẽ là một cú nhảy.
    let raf = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startedAt;
      setFlareIntensity(flameAt(warmth, setDownCount, elapsed, false));
      if (elapsed < FLARE_MS) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setDownCount, warmth, prefersReducedMotion]);

  const flame = flareIntensity ?? flameAt(warmth, setDownCount, FLARE_MS, prefersReducedMotion);

  const { matched: matchedWorries, rest: restWorries } = orderWorriesByTheme(worryTheme);

  // Một mục nỗi lo. Tách ra khỏi JSX vì danh sách giờ vẽ thành hai nhóm -
  // nhóm người đọc vừa chọn, rồi phần còn lại - và hai nhánh dùng chung y
  // hệt một cách vẽ là điều kiện để "xếp lại" không âm thầm thành "vẽ lại".
  const renderWorry = (item: WorryReframe) => {
        const open = openWorry === item.id;
        const isSetDown = setDownIds.has(item.id);

        // Trạng thái "đã đặt xuống": mục lún xuống thành một dòng mờ với
        // một tàn lửa bay lên - cùng ngôn ngữ với ngọn lửa đầu trang. Nỗi
        // lo không biến mất (trang không có quyền giả vờ thế), nó chỉ
        // được phép nằm im; bấm vào là cầm lên xem lại được.
        if (isSetDown) {
          return (
            <li key={item.id}>
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() =>
                  setSetDownIds((prev) => {
                    const next = new Set(prev);
                    next.delete(item.id);
                    return next;
                  })
                }
                className="relative w-full overflow-visible rounded-sm border border-dashed border-line-strong px-4 py-2.5 text-left cursor-pointer"
              >
                <motion.span
                  aria-hidden
                  className="absolute right-5 top-1 h-1.5 w-1.5 rounded-[1px] bg-ink-faint"
                  initial={{ y: 4, opacity: 0.9, scale: 1 }}
                  animate={{ y: -22, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                />
                <span className="block text-xs font-semibold text-stone-400 line-through decoration-stone-300 dark:text-stone-500 dark:decoration-stone-600">
                  “{t.worryReframes[item.id]?.worry ?? item.worry}”
                </span>
                <span className="mt-0.5 block text-[11px] leading-relaxed text-ink-faint">
                  {t.worrySetDown.done}
                </span>
              </motion.button>
            </li>
          );
        }

        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setOpenWorry(open ? null : item.id)}
              aria-expanded={open}
              className={`w-full rounded-sm border px-4 py-3 text-left text-sm font-semibold transition-colors cursor-pointer ${
                open
                  ? "border-brand-600 bg-accent-soft text-ink-max dark:border-brand-400"
                  : "border-line-strong bg-white text-ink-body hover:border-stone-950 dark:bg-stone-900 dark:hover:border-stone-200"
              }`}
            >
              “{t.worryReframes[item.id]?.worry ?? item.worry}”
            </button>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 rounded-sm border border-line-strong border-l-2 border-l-stone-950 bg-[#f3f1ec] px-4 py-3.5 dark:border-l-stone-200 dark:bg-stone-950"
              >
                <p className="text-sm leading-relaxed text-ink-body">
                  {t.worryReframes[item.id]?.reframe ?? item.reframe}
                </p>
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setSetDownIds((prev) => new Set(prev).add(item.id));
                      setOpenWorry(null);
                    }}
                    className={`${btnSecondary} !px-3.5 !py-1.5 !text-[11px] cursor-pointer`}
                  >
                    {t.worrySetDown.action}
                  </button>
                </div>
              </motion.div>
            )}
          </li>
        );
  };

  return (
    // Cột chữ giữ nguyên bề rộng đọc được ở mobile và tablet; từ lg trở lên
    // container nới ra để hai khối phụ nằm cạnh nhau thay vì xếp dọc giữa một
    // màn hình rộng với hai bên trống hoác. Bề rộng dòng chữ vẫn bị các
    // max-w-md/max-w-lg bên trong giữ lại, nên nới container không làm dòng dài ra.
    <div className="mx-auto max-w-2xl px-4 py-6 sm:py-10 lg:max-w-5xl">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t.quietCorner.home}
      </Link>

      {/* --- Lời nhắn hôm nay --------------------------------------------- */}
      {/* Nền tối gần như đen chứ không phải stone-900 phủ lớp cam: phủ ấm lên
          nền xám cho ra một mảng nâu đục, và ngọn lửa mất hết chiều sâu. Ở đây
          nền lùi hẳn xuống để quầng lửa là nguồn sáng duy nhất của khối. */}
      <section
        className="relative mt-4 overflow-hidden rounded-md border border-line-strong bg-white px-6 py-12 text-center dark:bg-[#0a0806]"
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
          {/* Ngọn lửa giờ đứng trong một khung cửa sổ mưa dựng bằng WebGL, kéo
              được để nhìn nghiêng. DinhHoaFlame vẫn là thứ hiện ra trước khi
              cảnh tải xong và là thứ duy nhất hiện ra với người bật giảm
              chuyển động - nó là fallback thật, không phải mã chết. */}
          <QuietForestScene intensity={flame} setDownCount={setDownCount} />

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
                // Khối này chỉ render sau khi fetch xong ở client, nên đọc
                // đồng hồ máy người dùng ở đây không gây lệch hydrate.
                <p
                  key="greeting"
                  className="text-xs font-semibold leading-relaxed text-ink-muted"
                >
                  {t.quietGreeting[getQuietGreetingKey(new Date().getHours())]}
                </p>,
                <p
                  key="tone"
                  className="eyebrow mt-4 text-ink-soft"
                >
                  {MOTIVATION_TONE_LABEL[motivation.tone]}
                </p>,
                <p
                  key="text"
                  className="mx-auto mt-4 max-w-lg text-lg font-bold leading-relaxed text-ink-heading sm:text-xl"
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

      {/* Hai khối phụ: xếp dọc ở màn hẹp, đứng cạnh nhau từ lg. items-start để
          khối thở ngắn không bị kéo cao bằng danh sách nỗi lo. */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-start">
      {/* --- Một phút thở -------------------------------------------------- */}
      <section className="rounded-md border border-line-strong bg-[#f3f1ec] px-6 py-7 dark:bg-stone-950">
        <h2 className="text-center text-base font-extrabold text-ink-heading">
          {t.quietCorner.breatheTitle}
        </h2>
        <p className="mx-auto mt-1.5 max-w-md text-center text-xs leading-relaxed text-ink-muted">
          {t.quietCorner.breatheBlurb}
        </p>
        <BreathingCircle />
      </section>

      {/* --- Đặt xuống một gánh nặng --------------------------------------- */}
      <section className={`${panel} px-5 py-7`}>
        <div className="px-1 text-center">
          <h2 className="text-base font-extrabold text-ink-heading">
            {t.quietCorner.burdenTitle}
          </h2>
          <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-ink-muted">
            {t.quietCorner.burdenBlurb}
          </p>
        </div>

        {/* Chọn nhóm: đưa lên trước, không cắt bớt. */}
        <div className="mt-5">
          <p className="text-sm font-bold text-ink-body">
            {t.worryThemePrompt.question}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {WORRY_THEMES.map((theme) => {
              const chosen = worryTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  aria-pressed={chosen}
                  onClick={() => setWorryTheme(chosen ? null : theme.id)}
                  className={`rounded-sm border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    chosen
                      ? "border-brand-600 bg-accent-soft text-ink-max dark:border-brand-400"
                      : "border-line-strong bg-white text-ink-soft hover:border-stone-950 hover:text-ink dark:bg-stone-900 dark:hover:border-stone-200"
                  }`}
                >
                  {t.worryThemes[theme.id] ?? theme.label}
                </button>
              );
            })}
            {worryTheme && (
              <button
                type="button"
                onClick={() => setWorryTheme(null)}
                className="rounded-sm px-3 py-1.5 text-xs font-semibold text-ink-faint underline-offset-2 hover:underline cursor-pointer"
              >
                {t.worryThemePrompt.clear}
              </button>
            )}
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-ink-faint">
            {t.worryThemePrompt.note}
          </p>
        </div>

        {matchedWorries.length > 0 && (
          <ul className="mt-4 space-y-2.5">{matchedWorries.map(renderWorry)}</ul>
        )}
        {matchedWorries.length > 0 && (
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-faint">
            {t.worryThemePrompt.restHeading}
          </p>
        )}
        <ul className="mt-3 space-y-2.5">{restWorries.map(renderWorry)}</ul>
      </section>

      </div>

      {/* --- Ba câu hỏi cho nỗi lo của riêng bạn -----------------------------
          Danh sách nỗi lo phía trên là những nỗi lo viết sẵn; khối này dành
          cho nỗi lo không nằm trong danh sách nào - phần lớn trường hợp thật. */}
      <section className={`${panel} mt-6 px-5 py-7`}>
        <h2 className="text-center text-base font-extrabold text-ink-heading">
          {t.quietQuestions.title}
        </h2>
        <p className="mx-auto mt-1.5 max-w-md text-center text-xs leading-relaxed text-ink-muted">
          {t.quietQuestions.intro}
        </p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-3">
          {QUIET_CORNER_QUESTIONS.items.map((item, i) => (
            <li
              key={item.id}
              className="rounded-sm border border-line-strong px-4 py-4"
            >
              <span className="font-mono text-[10.5px] font-medium text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 text-sm font-bold leading-snug text-ink-heading">
                {t.quietQuestionItems[item.id]?.question ?? item.question}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                {t.quietQuestionItems[item.id]?.note ?? item.note}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* --- Điểm hạ cánh ---------------------------------------------------
          Không viền, không nền - đây không phải một "khối tính năng" nữa mà
          là lời cuối của trang trước khi trở về. Disclaimer vẫn đứng sau nó,
          nhưng ấn tượng khép lại nên là một lời cho phép, không phải một lời
          cảnh báo. */}
      <section className="mt-10 px-6 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">
          {t.quietClosing.title}
        </p>
        {[t.quietClosing.line1, t.quietClosing.line2].map((line) => (
          <p
            key={line}
            className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-ink-soft"
          >
            {line}
          </p>
        ))}
      </section>

      {/* --- Ranh giới ------------------------------------------------------
          Luôn hiện, không gập lại được, không đặt sau một cú bấm. Nếu người
          đọc chỉ nhìn trang này một lần thì đây là phần họ cần đọc nhất. */}
      <section className="mt-6 mb-4 rounded-md border border-line-strong bg-[#f3f1ec] px-5 py-6 dark:bg-stone-950">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
          <div>
            <h2 className="text-sm font-extrabold text-ink-body">
              {t.quietLimits.title}
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
              {t.quietLimits.body}
            </p>
          </div>
        </div>
      </section>

      <p className="flex items-center justify-center gap-1.5 pb-6 text-[11px] font-semibold text-ink-faint">
        <Heart className="h-3 w-3" />
        {t.quietCorner.noXp}
      </p>
    </div>
  );
}
