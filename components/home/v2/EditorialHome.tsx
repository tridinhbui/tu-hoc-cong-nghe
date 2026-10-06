"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { XP_PER_LESSON } from "@/lib/levels";
import LiveNumber from "@/components/LiveNumber";
import { Scramble, TypeText, useInViewOnce } from "@/components/ui/effects";
import { Magnetic, Parallax, Reveal, useLiveGate, usePointerVars } from "@/components/ui/motion";
import { scrollToNeeds } from "@/components/home/v2/EditorialNeeds";
import { BAND, Crosshair, ID, INK, Mono, PAPER, RULE, SheetHead, Stamp, useCrosshair } from "@/components/home/v2/kit";

/* ───────────────────────── HERO ───────────────────────── */

/**
 * Terminal khởi động: năm dòng log hiện lần lượt kèm thời gian giả lập, rồi
 * lệnh bắt đầu tự gõ và máy trả lời. Hộp có chiều cao cố định, nên chạy lại
 * log không đẩy bố cục - máy chủ kết xuất sẵn trạng thái cuối.
 */
function BootTerminal({ lessonCount }: { lessonCount: number }) {
  const { t } = useI18n();
  const v = t.home.v2;
  const reduce = useReducedMotion();
  const { ref, seen } = useInViewOnce<HTMLDivElement>();
  const lines = v.boot.lines.map((l) => format(l, { count: lessonCount }));
  const [shown, setShown] = useState(lines.length);
  const [cmdReady, setCmdReady] = useState(true);
  const [replyReady, setReplyReady] = useState(true);

  useEffect(() => {
    if (!seen || reduce) return;
    let i = 0;
    let timer: number;
    const step = () => {
      i += 1;
      setShown(i);
      if (i < lines.length) timer = window.setTimeout(step, 180 + Math.random() * 220);
      else timer = window.setTimeout(() => setCmdReady(true), 250);
    };
    timer = window.setTimeout(() => {
      setShown(0);
      setCmdReady(false);
      setReplyReady(false);
      timer = window.setTimeout(step, 250);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [seen, reduce, lines.length]);

  return (
    <div ref={ref} className={`border-2 ${RULE} ${BAND} font-mono text-[11.5px]`}>
      <div className="flex items-center justify-between border-b border-white/20 px-3 py-1.5">
        <span className="text-brand-300">{ID.os}</span>
        <span className="thcn-blink h-2 w-2 bg-brand-400" aria-hidden />
      </div>
      <ol className="h-[12.5rem] overflow-hidden px-3 py-2 leading-[1.7]">
        {lines.slice(0, shown).map((l, i) => (
          <li key={l} className="flex gap-2">
            <span className="text-brand-400">{ID.ok}</span>
            <span className="min-w-0 flex-1 truncate font-sans">{l}</span>
            <span className="opacity-40">{ID.ms(40 + ((i * 97) % 260))}</span>
          </li>
        ))}
        {cmdReady && (
          <li className="mt-1.5 flex gap-2">
            <span className="text-brand-400">{ID.prompt}</span>
            <TypeText text={v.heroCmd} speed={34} onDone={() => setReplyReady(true)} cursor={!replyReady} />
          </li>
        )}
        {cmdReady && replyReady && (
          <li className="flex gap-2 text-brand-200">
            <span>›</span>
            <TypeText text={v.heroReply} speed={18} className="font-sans" />
          </li>
        )}
      </ol>
    </div>
  );
}

export function EditorialHero({
  lessonCount,
  learners,
  lessons,
  completed,
  previewHref,
}: {
  lessonCount: number;
  learners: number;
  lessons: number;
  completed: number;
  previewHref: string;
}) {
  const { t } = useI18n();
  const v = t.home.v2;
  const reduce = useReducedMotion();
  const { ref, pos } = useCrosshair<HTMLElement>();
  usePointerVars(ref);
  useLiveGate(ref);
  const stats = (
    [
      [v.statLearners, learners],
      [v.statLessons, lessons],
      [v.statCompleted, completed],
    ] as const
  ).filter(([, value]) => value > 0);

  return (
    <section ref={ref} data-dbg="section#hero" className={`relative overflow-hidden border-b-2 ${RULE} ${PAPER} ${INK}`}>
      {/* Chiều sâu: ba orb xanh mờ trôi chậm ở các tầng parallax khác nhau.
          Chỉ transform/opacity, dừng khi hero ra khỏi màn hình hoặc tab ẩn. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax speed={-0.06} className="absolute -left-[12vw] top-[8%] h-[38vw] w-[38vw] max-h-[34rem] max-w-[34rem]">
          <div className="thcn-orb thcn-orb-a inset-0 bg-brand-500/25 dark:bg-brand-500/20" />
        </Parallax>
        <Parallax speed={0.1} className="absolute -right-[10vw] top-[28%] h-[44vw] w-[44vw] max-h-[40rem] max-w-[40rem]">
          <div className="thcn-orb thcn-orb-b inset-0 bg-brand-300/30 dark:bg-brand-600/20" />
        </Parallax>
        <Parallax speed={0.18} className="absolute bottom-[-6%] left-[38%] h-[22vw] w-[22vw] max-h-[20rem] max-w-[20rem]">
          <div className="thcn-orb thcn-orb-c inset-0 bg-brand-400/20" />
        </Parallax>
      </div>
      <div aria-hidden className="thcn-spot hidden md:block" />
      {/* Lưới bản vẽ: 12 cột kẻ mảnh, trôi ngược chiều cuộn rất nhẹ. */}
      <Parallax speed={0.05} aria-hidden className="pointer-events-none absolute -inset-y-12 inset-x-0">
        <div className="mx-auto grid h-full max-w-7xl grid-cols-6 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`border-l border-black/[0.07] dark:border-white/[0.06] ${i >= 6 ? "hidden lg:block" : ""}`} />
          ))}
        </div>
      </Parallax>
      {!reduce && <Crosshair pos={pos} />}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between gap-4 border-b ${RULE} py-2`}>
          <Mono>{ID.doc}</Mono>
          <Mono className="hidden sm:inline">{v.heroKicker}</Mono>
          <Mono>{ID.sheet(1)}</Mono>
        </div>

        <div className="grid gap-8 pb-10 pt-8 lg:grid-cols-12 lg:pb-14 lg:pt-10">
          <h1 className="relative lg:col-span-12">
            <span className="block text-[16vw] font-black uppercase leading-[0.95] tracking-[-0.045em] lg:text-[11rem]">
              <Scramble text={v.heroLine1} duration={700} />
            </span>
            <span className="-ml-[0.04em] block whitespace-nowrap text-[16vw] font-black uppercase leading-[0.95] tracking-[-0.045em] text-accent lg:text-[11rem]">
              <Scramble text={v.heroLine2} duration={1100} delay={150} />
            </span>
            <span className="mt-2 block text-[9vw] font-light italic leading-none tracking-tight lg:ml-[40%] lg:text-[5.5rem]">
              <TypeText text={v.heroLine3} speed={90} delay={900} />
            </span>
            <Stamp className="thcn-stamp absolute right-0 top-2 hidden md:inline-block">{v.stamp}</Stamp>
          </h1>

          <div className="min-w-0 lg:col-span-5 lg:col-start-1">
            <p className="thcn-rise max-w-md text-[16px] leading-7 [animation-delay:600ms]">{format(v.heroSub, { count: lessonCount })}</p>
            <div className="mt-7 flex flex-wrap items-stretch gap-0">
              {/* Nút chính cuộn xuống "Bắt đầu từ việc bạn muốn làm" thay vì
                  mở form đăng ký: người mới được thử một bài trước, và thẻ cuối
                  bài mới là chỗ mời tạo tài khoản để lưu tiến độ. Đăng ký vẫn
                  ở nút "Vào học ngay" trên thanh điều hướng. */}
              <Magnetic>
              <a
                href="#bat-dau"
                onClick={(e) => {
                  // Có JS thì tự cuộn (và cập nhật địa chỉ); không có JS thì
                  // vẫn là liên kết neo bình thường.
                  if (scrollToNeeds(!reduce)) {
                    e.preventDefault();
                    window.history.replaceState(null, "", "#bat-dau");
                  }
                }}
                className="thcn-glitch thcn-press group inline-flex items-center gap-3 bg-brand-600 px-6 py-4 text-[15px] font-black uppercase tracking-wide text-white transition-colors hover:bg-[#0d0e11] dark:hover:bg-brand-400 dark:hover:text-[#0d0e11]"
              >
                {v.ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              </Magnetic>
              <a
                href={previewHref}
                className={`thcn-press inline-flex items-center gap-2 border-2 ${RULE} px-5 py-[14px] text-[14px] font-bold transition-colors hover:bg-[#0d0e11] hover:text-[#eeebe3] dark:hover:bg-[#eeebe3] dark:hover:text-[#0d0e11]`}
              >
                {v.ctaSecondary}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-3 pl-1 font-mono text-[11px] text-accent-strong">↑ {v.annotation}</p>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-6 lg:col-start-7">
            <div className="thcn-tilt">
              <BootTerminal lessonCount={lessonCount} />
            </div>
            {/* Ba con số thật, xếp như bảng thông số cuối bản vẽ.
                Ô nào đang là 0 thì không hiện: các con số chỉ được ghi đè khi
                truy vấn trả về số khác 0, nên 0 ở đây nghĩa là "chưa tải
                được", không phải "chưa ai học" - nhưng người mới đọc "NGƯỜI
                HỌC 0+" theo nghĩa thứ hai và rời trang. */}
            {stats.length > 0 && (
            <dl className={`grid border-2 ${RULE}`} style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
              {stats.map(([label, value], i) => (
                <div key={label} className={`min-w-0 p-3 sm:p-4 ${i > 0 ? `border-l ${RULE}` : ""}`}>
                  <dt>
                    <Mono className="opacity-60">{label}</Mono>
                  </dt>
                  <dd className="mt-2 truncate font-mono text-xl font-bold tabular-nums sm:text-3xl">
                    <LiveNumber value={value} />
                  </dd>
                </div>
              ))}
            </dl>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── MARQUEE ───────────────────────── */

export function EditorialMarquee({ items, reverse = false }: { items?: string[]; reverse?: boolean }) {
  const { t } = useI18n();
  const list = items ?? t.home.v2.marquee;
  const row = (
    <div className="flex shrink-0 items-center">
      {list.map((s) => (
        <span key={s} className="flex items-center whitespace-nowrap px-6 py-1 text-2xl font-black uppercase leading-[1.15] tracking-tight sm:text-4xl">
          {s}
          <span aria-hidden className="ml-12 inline-block h-3 w-3 bg-brand-400" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden border-b-2 ${RULE} ${BAND} py-4`}>
      <div className={`thcn-marquee flex w-max ${reverse ? "[animation-direction:reverse]" : ""}`}>
        {row}
        <div aria-hidden className="flex">
          {row}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── WORLDS ───────────────────────── */

const WORLDS = [
  { key: "web", slug: "web", href: "/hoc-theo-nhu-cau/website" },
  { key: "data", slug: "data", href: "/hoc-theo-nhu-cau/data-ai" },
  { key: "ai", slug: "ai", href: "/hoc-theo-nhu-cau/ai-assistant" },
  { key: "systems", slug: "systems", href: "/hoc-theo-nhu-cau/automation" },
] as const;

/**
 * Bốn thế giới như bốn cột báo xếp cạnh nhau. Cột đang chọn giãn ra và gõ
 * lệnh mở thế giới đó; ba cột kia co lại thành gáy sách với tên dựng đứng.
 * Trên màn hẹp chúng xếp chồng và cột chọn mở ra theo chiều dọc.
 */
export function EditorialWorlds() {
  const { t } = useI18n();
  const v = t.home.v2;
  const [active, setActive] = useState(0);

  return (
    <section data-dbg="section#worlds" className={`border-b-2 ${RULE} ${PAPER} ${INK}`}>
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid items-end gap-4 lg:grid-cols-12">
          <SheetHead n={2} kicker={v.worldsKicker} title={v.worldsTitle} loading={v.loadWorlds} size="xl" className="lg:col-span-9" />
          <Reveal as="p" delay={300} className="font-mono text-[11px] opacity-60 lg:col-span-3 lg:text-right">→ {v.worldsHint}</Reveal>
        </div>
      </div>

      <Reveal y={28} className={`mx-auto mt-10 flex max-w-7xl flex-col border-t-2 ${RULE} lg:h-[540px] lg:flex-row`}>
        {WORLDS.map((w, i) => {
          const copy = v.worlds[w.key];
          const on = active === i;
          return (
            <div
              key={w.key}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`group relative flex min-w-0 cursor-pointer flex-col overflow-hidden border-b ${RULE} transition-[flex-grow,background-color] duration-500 ease-out lg:border-b-0 ${
                i > 0 ? `lg:border-l ${RULE}` : ""
              } ${on ? `${BAND} lg:flex-[4]` : "lg:flex-[1] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"}`}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <Mono className={on ? "text-brand-300" : "opacity-60"}>{ID.worldCode[i]}</Mono>
                <span className={`font-mono text-sm font-bold ${on ? "text-brand-400" : ""}`}>{ID.worldGlyph[i]}</span>
              </div>

              <div className="relative flex-1 px-4">
                <span
                  className={`block font-black uppercase leading-[0.85] tracking-[-0.05em] transition-all duration-500 ${
                    on
                      ? "text-[3.5rem] sm:text-[6rem] lg:text-[8rem]"
                      : "text-[3rem] lg:absolute lg:bottom-4 lg:left-3 lg:rotate-180 lg:text-[4.2rem] lg:[writing-mode:vertical-rl]"
                  }`}
                >
                  {on ? <Scramble key={`n-${active}`} text={copy.name} duration={450} /> : copy.name}
                </span>

                <div className={`grid transition-[grid-template-rows,opacity] duration-500 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    {/* Lệnh gõ lại mỗi lần mở - key theo cột đang chọn. */}
                    <p className="mt-4 font-mono text-[12px] text-brand-300">
                      {ID.prompt}{" "}
                      {on && <TypeText key={`c-${active}`} text={`${v.worldCmd} ${w.slug}`} speed={40} />}
                    </p>
                    <p className="mt-2 min-h-[3.5rem] max-w-md text-lg font-semibold leading-snug">
                      {on && <TypeText key={`t-${active}`} text={copy.tagline} speed={16} delay={420} cursor={false} />}
                    </p>
                    <ol className="mt-4 grid max-w-lg grid-cols-2 border-t border-white/25">
                      {copy.topics.map((topic, j) => (
                        <li
                          key={topic}
                          className={`flex items-baseline gap-3 border-b border-white/25 py-2 pr-3 ${on ? "thcn-rise" : ""}`}
                          style={{ animationDelay: `${700 + j * 90}ms` }}
                        >
                          <Mono className="text-brand-300">{String(j + 1).padStart(2, "0")}</Mono>
                          <span className="text-sm font-semibold">{topic}</span>
                        </li>
                      ))}
                    </ol>
                    <Link
                      href={w.href}
                      tabIndex={on ? 0 : -1}
                      className="mb-6 mt-6 inline-flex items-center gap-2 bg-brand-600 px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-brand-400 hover:text-[#0d0e11]"
                    >
                      {v.worldEnter} {copy.name}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mảng điểm như bản đồ bit của cột đang mở. */}
              {on && (
                <div aria-hidden className="pointer-events-none absolute right-4 top-14 hidden grid-cols-8 gap-1.5 lg:grid">
                  {Array.from({ length: 64 }).map((_, k) => (
                    <span
                      key={k}
                      className="thcn-blink h-2 w-2 bg-brand-400"
                      style={{ opacity: ((k * 37 + i * 11) % 7) / 7, animationDelay: `${(k % 9) * 120}ms` }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}

/* ───────────────────────── THCN_OS ───────────────────────── */

/**
 * Một "hệ điều hành" giả nhưng không bịa: mọi tiến trình ở đây là việc hệ
 * thống thật làm cho người học, và +XP là XP_PER_LESSON thật.
 */
export function EditorialOS() {
  const { t } = useI18n();
  const v = t.home.v2;
  const reduce = useReducedMotion();
  const { ref, seen } = useInViewOnce<HTMLDivElement>();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !seen) return;
    const id = window.setInterval(() => setTick((n) => n + 1), 1600);
    return () => window.clearInterval(id);
  }, [reduce, seen]);

  const logLines = v.osLogLines.map((l) => format(l, { xp: XP_PER_LESSON }));
  const cycle = logLines.length + 2;
  const shown = reduce ? logLines.length : Math.min((tick % cycle) + 1, logLines.length);
  const activeProc = tick % v.osProc.length;

  return (
    <section data-dbg="section#os" className={`border-b-2 ${RULE} ${BAND}`}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-20">
        <Reveal className="min-w-0 lg:col-span-4">
          <SheetHead n={3} dark kicker={v.osKicker} title={v.osTitle} loading={v.loadOs} />
          <p className="mt-5 max-w-sm text-[15px] leading-7 text-[#eeebe3]/70">{v.osSub}</p>
          <Link
            href="/login?mode=signup"
            className="thcn-press group mt-8 inline-flex items-center gap-3 border-2 border-[#eeebe3] px-5 py-3 text-sm font-black uppercase tracking-wide transition-colors hover:bg-[#eeebe3] hover:text-[#0d0e11]"
          >
            {v.osCta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <div className="mt-10">
            <Stamp className="thcn-stamp inline-block !border-brand-300 !text-brand-300 !outline-brand-300">{v.noteStamp}</Stamp>
          </div>
        </Reveal>

        <Reveal delay={150} y={26} className="min-w-0 lg:col-span-8">
        <div ref={ref} className="min-w-0 border-2 border-[#eeebe3] font-mono text-[12px]">
          <div className="flex items-center justify-between border-b-2 border-[#eeebe3] bg-[#eeebe3] px-3 py-1.5 text-[#0d0e11]">
            <span className="font-bold">{ID.os}</span>
            <span className="flex gap-1">
              <span className="h-3 w-3 border border-[#0d0e11]" />
              <span className="h-3 w-3 border border-[#0d0e11]" />
              <span className="h-3 w-3 bg-[#0d0e11]" />
            </span>
          </div>

          <div className="grid sm:grid-cols-2">
            <div className="border-b border-white/20 sm:border-r">
              <div className="border-b border-white/20 px-3 py-1.5 uppercase text-brand-300">{v.osProcesses}</div>
              <ul>
                {v.osProc.map((p, i) => (
                  <li
                    key={p}
                    className={`grid grid-cols-[3.5rem_1fr_auto] gap-2 px-3 py-1.5 transition-colors ${i === activeProc ? "bg-brand-600 text-white" : ""}`}
                  >
                    <span className="opacity-60">{ID.pid(i)}</span>
                    <span>{p}</span>
                    <span>{i === activeProc ? ID.run : ID.idle}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-b border-white/20">
              <div className="border-b border-white/20 px-3 py-1.5 uppercase text-brand-300">{v.osQueue}</div>
              <ul>
                {v.osQueueItems.map((q, i) => (
                  <li key={q} className="flex items-center justify-between gap-3 px-3 py-1.5">
                    <span className="truncate font-sans text-[13px]">{q}</span>
                    <span className="shrink-0 opacity-60">{v.osDue[i]}</span>
                  </li>
                ))}
              </ul>
              {/* Đường quên - mỗi lần ôn đẩy nó lên lại. */}
              <svg viewBox="0 0 200 48" className="mx-3 mb-3 mt-1 h-12 w-[calc(100%-1.5rem)]" aria-hidden>
                <polyline
                  className="thcn-draw"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.5"
                  strokeWidth="1"
                  pathLength={1}
                  points="0,4 30,30 40,6 80,26 92,6 150,20 162,6 200,14"
                />
                {[40, 92, 162].map((x) => (
                  <rect key={x} x={x - 2} y={4} width={4} height={4} className="fill-brand-400" />
                ))}
              </svg>
            </div>

            <div className="sm:col-span-2">
              <div className="border-b border-white/20 px-3 py-1.5 uppercase text-brand-300">{v.osLog}</div>
              <ol className="min-h-[9.5rem] px-3 py-2">
                {logLines.slice(0, shown).map((l, i) => (
                  <li key={l} className="flex gap-3 py-0.5">
                    <span className="opacity-40">{String(i + 1).padStart(3, "0")}</span>
                    <span className="font-sans text-[13px]">
                      <span className="mr-2 font-mono text-brand-400">›</span>
                      {i === shown - 1 && !reduce ? <TypeText key={`${Math.floor(tick / cycle)}-${i}`} text={l} speed={22} /> : l}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="flex justify-between border-t-2 border-[#eeebe3] px-3 py-1.5 opacity-70">
            <span>{ID.status(12 + (tick % 5) * 7)}</span>
            <span>{ID.enc}</span>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
