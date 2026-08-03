"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
import {
  QUIET_CORNER_CLOSING,
  QUIET_CORNER_LIMITS,
  QUIET_CORNER_QUESTIONS,
  type WorryReframe,
  WORRY_SET_DOWN,
  getQuietGreeting,
} from "@/lib/quiet-corner";
import MotivationShareCard from "@/components/MotivationShareCard";
import BreathingCircle from "@/components/BreathingCircle";
import QuietWindowScene from "@/components/QuietWindowScene";
import { FLARE_MS, flameAt } from "@/lib/quiet-flame";
import {
  WORRY_THEMES,
  WORRY_THEME_PROMPT,
  orderWorriesByTheme,
} from "@/lib/quiet-corner-themes";

// "Góc yên tĩnh" - trang riêng đằng sau thẻ lời nhắn.
//
// Trang duy nhất trong app không có XP, không streak, không nhiệm vụ, không
// nút "học tiếp ngay". Mọi trang khác đã đẩy người dùng đi tới rồi; trang này
// tồn tại để hạ nhịp, nên bất kỳ phần thưởng nào gắn vào đây cũng sẽ biến việc
// nghỉ thành một nhiệm vụ nữa phải hoàn thành.

export default function QuietCornerClient({ userId }: { userId: string }) {
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
                className="relative w-full overflow-visible rounded-2xl border border-dashed border-stone-200 px-4 py-2.5 text-left dark:border-stone-800"
              >
                <motion.span
                  aria-hidden
                  className="absolute right-5 top-1 h-1.5 w-1.5 rounded-full bg-orange-400"
                  initial={{ y: 4, opacity: 0.9, scale: 1 }}
                  animate={{ y: -22, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                />
                <span className="block text-xs font-semibold text-stone-400 line-through decoration-stone-300 dark:text-stone-500 dark:decoration-stone-600">
                  “{item.worry}”
                </span>
                <span className="mt-0.5 block text-[11px] leading-relaxed text-stone-400 dark:text-stone-500">
                  {WORRY_SET_DOWN.done}
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
              className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                open
                  ? "border-orange-300 bg-orange-50 text-stone-900 dark:border-orange-900 dark:bg-orange-950/30 dark:text-stone-100"
                  : "border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-800/50 dark:text-stone-300 dark:hover:bg-stone-800"
              }`}
            >
              “{item.worry}”
            </button>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 px-4 py-3.5 dark:from-stone-800 dark:to-stone-800/60"
              >
                <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {item.reframe}
                </p>
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setSetDownIds((prev) => new Set(prev).add(item.id));
                      setOpenWorry(null);
                    }}
                    className="rounded-full border border-orange-200 px-3.5 py-1.5 text-[11px] font-bold text-orange-700 transition-colors hover:bg-orange-100/60 dark:border-orange-900 dark:text-orange-300 dark:hover:bg-orange-950/40"
                  >
                    {WORRY_SET_DOWN.action}
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
          {/* Ngọn lửa giờ đứng trong một khung cửa sổ mưa dựng bằng WebGL, kéo
              được để nhìn nghiêng. DinhHoaFlame vẫn là thứ hiện ra trước khi
              cảnh tải xong và là thứ duy nhất hiện ra với người bật giảm
              chuyển động - nó là fallback thật, không phải mã chết. */}
          <QuietWindowScene intensity={flame} />

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
                  className="text-xs font-semibold leading-relaxed text-stone-500 dark:text-stone-400"
                >
                  {getQuietGreeting(new Date().getHours())}
                </p>,
                <p
                  key="tone"
                  className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-300"
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

      {/* Hai khối phụ: xếp dọc ở màn hẹp, đứng cạnh nhau từ lg. items-start để
          khối thở ngắn không bị kéo cao bằng danh sách nỗi lo. */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-start">
      {/* --- Một phút thở -------------------------------------------------- */}
      <section className="rounded-[28px] border border-stone-200 bg-stone-50 px-6 py-7 dark:border-stone-800 dark:bg-stone-900/50">
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
      <section className="rounded-[28px] border border-stone-200 bg-white px-5 py-7 dark:border-stone-800 dark:bg-stone-900">
        <div className="px-1 text-center">
          <h2 className="text-base font-extrabold text-stone-800 dark:text-stone-100">
            Đặt xuống một gánh nặng
          </h2>
          <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-stone-500 dark:text-stone-400">
            Chọn nỗi lo đang nằm trong đầu bạn để xem một góc nhìn khác. Đây là
            cách nghĩ, không phải lời khuyên nên mua gì hay tiêu bao nhiêu.
          </p>
        </div>

        {/* Chọn nhóm: đưa lên trước, không cắt bớt. */}
        <div className="mt-5">
          <p className="text-sm font-bold text-stone-700 dark:text-stone-200">
            {WORRY_THEME_PROMPT.question}
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
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    chosen
                      ? "border-orange-300 bg-orange-50 text-orange-800 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-200"
                      : "border-stone-200 bg-white text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400 dark:hover:bg-stone-800"
                  }`}
                >
                  {theme.label}
                </button>
              );
            })}
            {worryTheme && (
              <button
                type="button"
                onClick={() => setWorryTheme(null)}
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-stone-400 underline-offset-2 hover:underline dark:text-stone-500"
              >
                {WORRY_THEME_PROMPT.clear}
              </button>
            )}
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-stone-400 dark:text-stone-500">
            {WORRY_THEME_PROMPT.note}
          </p>
        </div>

        {matchedWorries.length > 0 && (
          <ul className="mt-4 space-y-2.5">{matchedWorries.map(renderWorry)}</ul>
        )}
        {matchedWorries.length > 0 && (
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
            {WORRY_THEME_PROMPT.restHeading}
          </p>
        )}
        <ul className="mt-3 space-y-2.5">{restWorries.map(renderWorry)}</ul>
      </section>

      </div>

      {/* --- Ba câu hỏi cho nỗi lo của riêng bạn -----------------------------
          Danh sách nỗi lo phía trên là những nỗi lo viết sẵn; khối này dành
          cho nỗi lo không nằm trong danh sách nào - phần lớn trường hợp thật. */}
      <section className="mt-6 rounded-[28px] border border-stone-200 bg-white px-5 py-7 dark:border-stone-800 dark:bg-stone-900">
        <h2 className="text-center text-base font-extrabold text-stone-800 dark:text-stone-100">
          {QUIET_CORNER_QUESTIONS.title}
        </h2>
        <p className="mx-auto mt-1.5 max-w-md text-center text-xs leading-relaxed text-stone-500 dark:text-stone-400">
          {QUIET_CORNER_QUESTIONS.intro}
        </p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-3">
          {QUIET_CORNER_QUESTIONS.items.map((item, i) => (
            <li
              key={item.id}
              className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 dark:border-stone-800 dark:bg-stone-800/50"
            >
              <span className="text-[11px] font-bold text-orange-700 dark:text-orange-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 text-sm font-bold leading-snug text-stone-800 dark:text-stone-100">
                {item.question}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                {item.note}
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
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
          {QUIET_CORNER_CLOSING.title}
        </p>
        {QUIET_CORNER_CLOSING.lines.map((line) => (
          <p
            key={line}
            className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-stone-600 dark:text-stone-300"
          >
            {line}
          </p>
        ))}
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
