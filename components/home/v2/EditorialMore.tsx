"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { Scramble, useInViewOnce } from "@/components/ui/effects";
import { Magnetic, Reveal, usePointerVars } from "@/components/ui/motion";
import { ID, INK, Mono, PAPER, RULE, SheetHead } from "@/components/home/v2/kit";

/*
 * Các tờ bổ sung của trang chủ: lộ trình bốn bước, sáu cam kết, câu hỏi hay
 * gặp, và thẻ mời bắt đầu. Cùng ngôn ngữ biên tập với kit.tsx - đường kẻ,
 * không bo góc, không bóng - và cùng luật chuyển động của components/ui/motion:
 * chỉ transform/opacity, giá trị động đi qua CSS variable, đứng yên khi
 * prefers-reduced-motion.
 */

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Ghi --p (0..1) lên phần tử: đoạn của phần tử đã đi qua giữa màn hình. Một
 * bộ nghe scroll passive + rAF, không setState theo frame.
 */
function useScrollProgress<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      el.style.setProperty("--p", "1");
      return;
    }
    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (mid - r.top) / Math.max(1, r.height)));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

/* ───────────────────────── THANH TIẾN ĐỘ CUỘN ───────────────────────── */

/** Vạch xanh mảnh ở mép trên, dài ra theo phần trang đã đọc. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]">
      <div ref={ref} className="h-full origin-left scale-x-0 bg-brand-600 will-change-transform dark:bg-brand-400" />
    </div>
  );
}

/* ───────────────────────── LỘ TRÌNH BỐN BƯỚC ───────────────────────── */

function JourneyStep({ i, tag, title, desc, meta }: { i: number; tag: string; title: string; desc: string; meta: string }) {
  const { ref, seen } = useInViewOnce<HTMLLIElement>("0px 0px -25% 0px");
  return (
    <li ref={ref} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 pb-10 last:pb-0 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-6">
      {/* Nút trên trục: đặc xanh khi bước đi vào màn hình, kèm một nhịp ping. */}
      <div className="relative z-10 flex justify-center">
        <span
          className={`mt-1 flex h-9 w-9 items-center justify-center border-2 font-mono text-[12px] font-bold transition-colors duration-500 sm:h-11 sm:w-11 sm:text-[13px] ${
            seen
              ? "border-brand-600 bg-brand-600 text-white dark:border-brand-400 dark:bg-brand-400 dark:text-[#0d0e11]"
              : `${RULE} ${PAPER}`
          }`}
        >
          {String(i + 1).padStart(2, "0")}
        </span>
      </div>
      <Reveal delay={60} y={24} className="min-w-0">
        <div className={`thcn-lift border-2 ${RULE} ${PAPER} p-5 hover:bg-black/[0.03] dark:hover:bg-white/[0.04] sm:p-6`}>
          <div className="flex items-center justify-between gap-3">
            <Mono className="text-accent-strong">{tag}</Mono>
            <Mono className="opacity-50">{meta}</Mono>
          </div>
          <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight sm:text-3xl">{title}</h3>
          <p className="mt-3 max-w-xl text-[15px] leading-7 opacity-80">{desc}</p>
        </div>
      </Reveal>
    </li>
  );
}

export function EditorialJourney({ n }: { n: number }) {
  const { t } = useI18n();
  const v = t.home.v2;
  const spineRef = useRef<HTMLOListElement>(null);
  useScrollProgress(spineRef);

  return (
    <section data-dbg="section#journey" className={`border-b-2 ${RULE} ${PAPER} ${INK}`}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-20">
        <Reveal className="min-w-0 lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
          <SheetHead n={n} kicker={v.journeyKicker} title={v.journeyTitle} loading={v.loadJourney} />
          <p className="mt-5 max-w-md text-[15px] leading-7 opacity-80">{v.journeySub}</p>
        </Reveal>

        <ol ref={spineRef} className="relative min-w-0 lg:col-span-7">
          {/* Trục: nền mờ cố định, phần xanh vẽ dài ra theo scroll (--p). */}
          <span aria-hidden className="absolute bottom-6 left-5 top-6 w-px bg-black/15 dark:bg-white/15 sm:left-7" />
          <span
            aria-hidden
            className="absolute bottom-6 left-5 top-6 w-0.5 -translate-x-px origin-top bg-brand-600 dark:bg-brand-400 sm:left-7"
            style={{ transform: "scaleY(var(--p, 1))" }}
          />
          {v.journeySteps.map((s, i) => (
            <JourneyStep key={s.tag} i={i} {...s} />
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── SÁU CAM KẾT ───────────────────────── */

function PromiseCard({ figure, title, desc, index }: { figure: string; title: string; desc: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  usePointerVars(ref);
  return (
    <Reveal as="li" delay={(index % 3) * 90} y={22} className="min-w-0">
      {/* Mỗi thẻ có một vệt sáng xanh đi theo con trỏ (--mx/--my do usePointerVars ghi). */}
      <div
        ref={ref as unknown as React.RefObject<HTMLDivElement>}
        className={`group relative h-full overflow-hidden ${PAPER} p-6 transition-colors duration-300 hover:bg-[#0d0e11] hover:text-[#eeebe3] dark:hover:bg-[#eeebe3] dark:hover:text-[#0d0e11] sm:p-7`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-data-[hover='1']:opacity-100"
          style={{ background: "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgb(41 97 184 / 0.35), transparent 70%)" }}
        />
        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <p className="font-mono text-5xl font-black leading-none tracking-[-0.05em] text-accent sm:text-6xl">
              <Scramble text={figure} duration={800} />
            </p>
            <Mono className="opacity-40">{ID.featureId(index + 1)}</Mono>
          </div>
          <h3 className="mt-5 text-lg font-black tracking-tight">{title}</h3>
          <p className="mt-2 text-[14px] leading-6 opacity-75">{desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function EditorialPromises({ n }: { n: number }) {
  const { t } = useI18n();
  const v = t.home.v2;
  return (
    <section data-dbg="section#promises" className={`border-b-2 ${RULE} ${PAPER} ${INK}`}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <SheetHead n={n} kicker={v.promisesKicker} title={v.promisesTitle} loading={v.loadPromises} className="max-w-4xl" />
        <ul className={`mt-10 grid gap-px border-2 ${RULE} bg-[#0d0e11] dark:bg-[#eeebe3] sm:grid-cols-2 lg:grid-cols-3`}>
          {v.promisesItems.map((p, i) => (
            <PromiseCard key={p.title} index={i} {...p} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────── CÂU HỎI HAY GẶP ───────────────────────── */

export function EditorialFaq({ n }: { n: number }) {
  const { t } = useI18n();
  const v = t.home.v2;
  const [open, setOpen] = useState(0);

  return (
    <section data-dbg="section#faq" className={`border-b-2 ${RULE} ${PAPER} ${INK}`}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-20">
        <Reveal className="min-w-0 lg:col-span-4">
          <SheetHead n={n} kicker={v.faqKicker} title={v.faqTitle} loading={v.loadFaq} />
          <p className="mt-6 text-[14px] font-semibold opacity-70">{v.faqStillAsking}</p>
          <a
            href="https://www.facebook.com/groups/4402614233328401"
            target="_blank"
            rel="noopener noreferrer"
            className="thcn-ul mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-bold underline-offset-4 hover:underline"
          >
            {v.faqAskCta}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        <Reveal delay={120} y={24} className="min-w-0 lg:col-span-8">
          <ul className={`border-t-2 ${RULE}`}>
            {v.faqItems.map((item, i) => {
              const on = open === i;
              return (
                <li key={item.q} className={`border-b ${RULE}`}>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(on ? -1 : i)}
                    className={`group flex min-h-14 w-full items-center gap-4 py-4 pr-1 text-left transition-colors ${
                      on ? "text-accent-strong" : "hover:text-accent-strong"
                    }`}
                  >
                    <Mono className="w-7 shrink-0 opacity-50">{String(i + 1).padStart(2, "0")}</Mono>
                    <span className="min-w-0 flex-1 text-lg font-black leading-snug tracking-tight sm:text-xl">{item.q}</span>
                    <Plus
                      aria-hidden
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${on ? "rotate-45" : ""}`}
                    />
                  </button>
                  {/* Mở bằng grid-template-rows 0fr -> 1fr: không cần đo chiều cao. */}
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-5 pl-11 pr-4 text-[15px] leading-7 opacity-80">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── THẺ MỜI BẮT ĐẦU ───────────────────────── */

/**
 * Dải xanh cuối trang: chữ BẮT ĐẦU tràn mép, trôi chậm theo scroll, kèm hai
 * lối - tạo tài khoản, hoặc đọc thử một bài trước.
 */
export function EditorialFinalCta({ previewHref }: { previewHref: string }) {
  const { t } = useI18n();
  const v = t.home.v2;
  const wordRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = wordRef.current;
    if (!el || prefersReduced()) return;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const k = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      el.style.transform = `translate3d(${((k - 0.5) * -6).toFixed(2)}vw, 0, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section data-dbg="section#start" className={`relative overflow-hidden border-b-2 ${RULE} bg-brand-600 text-white`}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p ref={wordRef} className="whitespace-nowrap text-[24vw] font-black uppercase leading-[0.85] tracking-[-0.06em] will-change-transform lg:text-[17rem]">
          <Scramble text={v.ctaBig} duration={900} />
        </p>
        <div className="mt-8 flex flex-col gap-6 border-t-2 border-white pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-md text-lg font-semibold leading-snug">{v.ctaBigSub}</p>
          <div className="flex flex-wrap items-stretch gap-0">
            <Magnetic>
              <Link
                href="/login?mode=signup"
                className="thcn-glitch thcn-press group inline-flex items-center justify-center gap-3 bg-[#0d0e11] px-7 py-4 text-[15px] font-black uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-[#0d0e11]"
              >
                {t.home.vision.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Link
              href={previewHref}
              className="thcn-press inline-flex items-center gap-2 border-2 border-white px-5 py-[14px] text-[14px] font-bold transition-colors hover:bg-white hover:text-brand-700"
            >
              {v.ctaSecondaryBig}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
