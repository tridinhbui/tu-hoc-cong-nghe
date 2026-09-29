"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { XP_PER_LESSON } from "@/lib/levels";
import { roundedLessonCount } from "@/lib/track-totals";
import Logo from "@/components/Logo";
import PublicLeaderboardPreview from "@/components/login/PublicLeaderboardPreview";
import InteractiveKingdomPreview from "@/components/home/InteractiveKingdomPreview";
import ActivityPanel from "@/components/home/ActivityPanel";
import { Scramble, TypeText, useInViewOnce } from "@/components/home/v2/effects";
import { BAND, CropMarks, ID, INK, Mono, PAPER, RULE, SheetHead, Stamp } from "@/components/home/v2/kit";

/* ───────────────────────── NAV ───────────────────────── */

/**
 * Thanh điều hướng: đường dẫn tờ đang đọc, phần trăm đã cuộn, công tắc DEBUG
 * và nút vào học. Phần trăm và thanh tiến độ ghi thẳng vào DOM qua ref - cuộn
 * là sự kiện dày, dựng lại cả thanh nav mỗi khung hình thì phí.
 */
export function EditorialNav({ debug, onDebug }: { debug: boolean; onDebug: () => void }) {
  const { t } = useI18n();
  const v = t.home.v2;
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const [where, setWhere] = useState("hero");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (pctRef.current) pctRef.current.textContent = ID.pct(Math.round(p * 100));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Tờ đang đọc: section nào chiếm vạch giữa màn hình.
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("[data-dbg^='section#']")];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setWhere((e.target as HTMLElement).dataset.dbg!.slice(8));
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className={`sticky top-0 z-40 border-b-2 ${RULE} ${PAPER} ${INK}`}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <Logo size={26} />
          <span className="truncate text-[13px] font-black uppercase tracking-[0.02em] sm:text-[15px]">{t.home.brand}</span>
        </Link>
        <div className="hidden min-w-0 flex-1 items-center gap-3 md:flex">
          <span className="h-4 w-px bg-current opacity-30" />
          <Mono className="truncate opacity-70">
            {ID.path}
            <span className="text-brand-600 dark:text-brand-400">{where.toUpperCase()}</span>
          </Mono>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Mono className="hidden tabular-nums opacity-60 lg:inline">
            {v.scroll} <span ref={pctRef}>{ID.pct(0)}</span>
          </Mono>
          <button
            type="button"
            onClick={onDebug}
            aria-pressed={debug}
            aria-label={v.debugAria}
            className={`hidden border px-2 py-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.06em] transition-colors sm:inline-block ${
              debug ? "border-brand-600 bg-brand-600 text-white" : `${RULE} hover:bg-black/5 dark:hover:bg-white/10`
            }`}
          >
            {debug ? v.debugOn : v.debugOff}
          </button>
          <Link
            href="/login"
            className="group inline-flex shrink-0 items-center gap-2 bg-brand-600 px-3.5 py-2 text-[12px] font-black uppercase tracking-wide text-white transition-colors hover:bg-[#0d0e11] dark:hover:bg-brand-400 dark:hover:text-[#0d0e11]"
          >
            {t.home.navCta}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
      <div ref={barRef} aria-hidden className="absolute -bottom-[2px] left-0 h-[2px] w-full origin-left scale-x-0 bg-brand-600 dark:bg-brand-400" />
    </header>
  );
}

/* ───────────────────────── 04 · CỘNG ĐỒNG ───────────────────────── */

export function EditorialCommunity() {
  const { t } = useI18n();
  const v = t.home.v2;
  const [queryDone, setQueryDone] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section data-dbg="section#community" className={`border-b-2 ${RULE} ${PAPER} ${INK}`}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-20">
        {/* Chữ bên PHẢI trên desktop - section duy nhất đặt minh hoạ trước chữ. */}
        <div className="min-w-0 lg:order-2 lg:col-span-4 lg:col-start-9">
          <SheetHead n={4} kicker={v.communityKicker} title={t.home.social.title} loading={v.loadCommunity} />
          <p className="mt-5 text-[15px] leading-7 opacity-80">{t.home.social.sub}</p>
          <ActivityPanel />
        </div>

        <div className={`relative min-w-0 border-2 ${RULE} lg:order-1 lg:col-span-7`}>
          <CropMarks className="border-brand-600" />
          <div className={`flex items-center justify-between border-b-2 ${RULE} px-3 py-1.5`}>
            <Mono>{ID.sqlFile}</Mono>
            <Mono className={queryDone ? "text-brand-600 dark:text-brand-400" : "opacity-50"}>{queryDone || reduce ? v.done : "…"}</Mono>
          </div>
          <div className={`border-b ${RULE} ${BAND} px-3 py-3 font-mono text-[12px]`}>
            <span className="text-brand-400">{ID.prompt} </span>
            <TypeText text={ID.sql} speed={20} onDone={() => setQueryDone(true)} />
            <p className={`mt-1 text-[#eeebe3]/60 transition-opacity duration-300 ${queryDone || reduce ? "opacity-100" : "opacity-0"}`}>
              › {v.communityRows}
            </p>
          </div>
          <div className={`p-3 transition-opacity duration-500 sm:p-4 ${queryDone || reduce ? "opacity-100" : "opacity-30"}`}>
            <PublicLeaderboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 05 · GAME KINGDOM ───────────────────────── */

export function EditorialKingdom() {
  const { t } = useI18n();
  const v = t.home.v2;
  return (
    <section data-dbg="section#kingdom" className={`relative overflow-hidden border-b-2 ${RULE} ${BAND}`}>
      {/* Chữ viền khổng lồ cắt mép phía sau - chỉ trang trí. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[4vw] top-6 select-none whitespace-nowrap text-[22vw] font-black uppercase leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(108_155_220_/_0.35)] lg:text-[16rem]"
      >
        {v.kingdomWord}
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-12">
          <SheetHead n={5} dark kicker={t.home.kingdom.eyebrow} title={t.home.kingdom.title} loading={v.loadKingdom} className="lg:col-span-7" />
          <p className="self-end text-[15px] leading-7 text-[#eeebe3]/70 lg:col-span-4 lg:col-start-9">{t.home.kingdom.sub}</p>
        </div>
        <div className="relative mt-10 border-2 border-[#eeebe3] p-2 sm:p-3">
          <CropMarks className="border-brand-400" />
          <InteractiveKingdomPreview />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 06 · PHƯƠNG PHÁP: DEBUGGER ───────────────────────── */

/* i18n-ignore-start: mã giả trong khung gỡ lỗi - tên hàm và biến, như mã nguồn. */
const METHOD_CODE = [
  { code: "function hocMotBai(bai) {", step: -1 },
  { code: "  const kienThuc = doc(bai, { phut: 5 });", step: 0 },
  { code: "  const diem = tuNhoLai(kienThuc); // quiz", step: 1 },
  { code: "  lichOn.hen(kienThuc, sapQuen());", step: 2 },
  { code: "  return khacSau(kienThuc);", step: 3 },
  { code: "}", step: -1 },
];
/* i18n-ignore-end */

// Mô hình minh hoạ đường quên (ghi rõ trên giao diện): mức nhớ theo từng bước,
// điểm vẽ trên đồ thị, và ngày hẹn ôn tiếp theo.
const METHOD_STATE = [
  { ret: 100, due: 0, xp: 0, pts: "0,6 60,40" },
  { ret: 84, due: 1, xp: XP_PER_LESSON, pts: "0,6 30,24 34,10 60,26" },
  { ret: 92, due: 3, xp: XP_PER_LESSON, pts: "0,6 30,24 34,10 70,30 74,8 110,20" },
  { ret: 96, due: 7, xp: XP_PER_LESSON, pts: "0,6 30,24 34,10 70,30 74,8 110,20 114,6 200,12" },
];

export function EditorialMethod() {
  const { t } = useI18n();
  const v = t.home.v2;
  const steps = t.dataTables.scrollytelling.panels.panel1.items;
  const reduce = useReducedMotion();
  const { ref, seen } = useInViewOnce<HTMLDivElement>("0px 0px -25% 0px");
  const [pc, setPc] = useState(reduce ? 3 : 0);
  const [running, setRunning] = useState(false);
  const autoRan = useRef(false);

  const step = useCallback(() => setPc((p) => Math.min(p + 1, 3)), []);

  useEffect(() => {
    if (!seen || reduce || autoRan.current) return;
    autoRan.current = true;
    const id = window.setTimeout(() => setRunning(true), 400);
    return () => window.clearTimeout(id);
  }, [seen, reduce]);

  // "Đang chạy" suy ra từ pc thay vì tự tắt trong effect: tới dòng cuối là dừng.
  const isRunning = running && pc < 3;
  useEffect(() => {
    if (!isRunning) return;
    const id = window.setTimeout(step, 1300);
    return () => window.clearTimeout(id);
  }, [isRunning, pc, step]);

  const s = METHOD_STATE[pc];
  const activeLine = METHOD_CODE.findIndex((l) => l.step === pc);
  const finished = pc >= 3;

  return (
    <section data-dbg="section#method" className={`border-b-2 ${RULE} ${PAPER} ${INK}`}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-20">
        <div className="min-w-0 lg:col-span-4">
          <SheetHead n={6} kicker={v.methodKicker} title={v.methodTitle} loading={v.loadMethod} />
          <p className="mt-5 text-[15px] leading-7 opacity-80">{v.methodSub}</p>
          <div className="mt-8 flex flex-wrap gap-0">
            <button
              type="button"
              onClick={() => {
                setRunning(false);
                step();
              }}
              disabled={pc >= 3}
              className="bg-brand-600 px-4 py-2.5 font-mono text-[12px] font-bold uppercase text-white transition-colors hover:bg-[#0d0e11] disabled:opacity-40 dark:hover:bg-brand-400 dark:hover:text-[#0d0e11]"
            >
              ▸ {v.methodStep}
            </button>
            <button
              type="button"
              onClick={() => setRunning(true)}
              disabled={pc >= 3 || isRunning}
              className={`border-2 ${RULE} px-4 py-2 font-mono text-[12px] font-bold uppercase transition-colors hover:bg-black/5 disabled:opacity-40 dark:hover:bg-white/10`}
            >
              ▸▸ {v.methodRun}
            </button>
            <button
              type="button"
              onClick={() => {
                setPc(0);
                setRunning(false);
              }}
              className={`border-2 border-l-0 ${RULE} px-4 py-2 font-mono text-[12px] font-bold uppercase transition-colors hover:bg-black/5 dark:hover:bg-white/10`}
            >
              ↺ {v.methodReset}
            </button>
          </div>
        </div>

        {/* Cửa sổ gỡ lỗi: mã với điểm dừng ở trái, biến và ngăn xếp ở phải. */}
        <div ref={ref} className={`min-w-0 border-2 ${RULE} font-mono text-[12px] lg:col-span-8`}>
          <div className={`flex items-center justify-between border-b-2 ${RULE} ${BAND} px-3 py-1.5`}>
            <span>{ID.debuggerFile}</span>
            <span className={finished ? "text-brand-300" : "text-brand-400"}>
              {finished ? v.methodFinished : format(v.methodPaused, { line: activeLine + 1 })}
            </span>
          </div>
          <div className="grid md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <ol className={`border-b py-2 md:border-b-0 md:border-r ${RULE}`}>
              {METHOD_CODE.map((l, i) => {
                const here = i === activeLine;
                const past = l.step >= 0 && l.step < pc;
                return (
                  <li
                    key={i}
                    className={`grid grid-cols-[1.25rem_1.75rem_minmax(0,1fr)] items-center gap-1 py-1 pr-3 transition-colors ${
                      here ? "bg-brand-600 text-white" : ""
                    }`}
                  >
                    <span className="flex justify-center">
                      {l.step >= 0 && <span className={`h-2 w-2 rounded-full ${here ? "bg-white" : past ? "bg-brand-600 dark:bg-brand-400" : "border border-current opacity-40"}`} />}
                    </span>
                    <span className="text-right opacity-40">{i + 1}</span>
                    <span className="overflow-x-auto whitespace-pre pl-2">{l.code}</span>
                  </li>
                );
              })}
              <li className="mt-3 px-3 font-sans text-[13px] leading-6">
                <span className="font-mono text-brand-600 dark:text-brand-400">{"// "}</span>
                <strong>{steps[pc].title}</strong> - <TypeText key={pc} text={steps[pc].desc} speed={14} cursor={false} />
              </li>
            </ol>

            <div>
              <div className={`border-b ${RULE} px-3 py-1.5 uppercase opacity-60`}>{v.methodVars}</div>
              <dl className="px-3 py-2">
                {(
                  [
                    ["tri_nho", `${s.ret}%`],
                    ["on_lai_sau", s.due ? `${s.due}d` : "-"],
                    ["xp", `+${s.xp}`],
                  ] as const
                ).map(([k, val]) => (
                  <div key={k} className="flex justify-between py-0.5">
                    <dt className="opacity-60">{k}</dt>
                    <dd className="font-bold tabular-nums text-brand-700 dark:text-brand-300">
                      <Scramble key={`${k}-${val}`} text={val} duration={300} />
                    </dd>
                  </div>
                ))}
              </dl>
              <svg viewBox="0 0 200 48" className="mx-3 h-14 w-[calc(100%-1.5rem)]" aria-hidden>
                <line x1="0" y1="46" x2="200" y2="46" stroke="currentColor" strokeOpacity="0.25" />
                <polyline fill="none" stroke="currentColor" strokeWidth="1.25" points={s.pts} className="text-brand-600 dark:text-brand-400" />
              </svg>
              <p className="px-3 pb-1 text-[10px] opacity-50">{v.methodModel}</p>
              <div className={`border-y ${RULE} px-3 py-1.5 uppercase opacity-60`}>{v.methodStack}</div>
              <ol className="px-3 py-2">
                {steps
                  .slice(0, pc + 1)
                  .reverse()
                  .map((st, i) => (
                    <li key={st.title} className={`truncate py-0.5 ${i === 0 ? "font-bold" : "opacity-50"}`}>
                      {i === 0 ? "▸ " : "  "}
                      {st.title}
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 07 · HỆ SINH THÁI: MANIFEST ───────────────────────── */

export function EditorialManifest() {
  const { t } = useI18n();
  const v = t.home.v2;
  const features = [
    t.home.ticker.liveXp,
    t.home.ticker.weeklyBoard,
    t.home.ticker.spacedRepetition,
    t.home.ticker.gameKingdom,
    t.home.ticker.feed,
    t.home.ticker.studyGroup,
  ];
  const audience = t.dataTables.scrollytelling.panels.panel2.items;

  return (
    <section data-dbg="section#manifest" className={`border-b-2 ${RULE} ${PAPER} ${INK}`}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <SheetHead
          n={7}
          kicker={v.manifestKicker}
          title={`${t.home.ecosystem.titlePart1} ${t.home.ecosystem.titleHighlight}`}
          loading={v.loadManifest}
          className="max-w-5xl"
        />
        <p className="mt-5 max-w-2xl text-[15px] leading-7 opacity-80">{t.home.ecosystem.sub}</p>

        <div className={`mt-12 grid border-2 ${RULE} lg:grid-cols-12`}>
          {/* Cột trái: tính năng, đánh số như danh mục linh kiện. */}
          <div className={`border-b-2 ${RULE} lg:col-span-5 lg:border-b-0 lg:border-r-2`}>
            <div className={`border-b ${RULE} ${BAND} px-4 py-2`}>
              <Mono>{v.manifestFeatures}</Mono>
            </div>
            <ol>
              {features.map((f, i) => (
                <li
                  key={f}
                  className={`group grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-black/15 px-4 py-3.5 transition-colors last:border-b-0 hover:bg-brand-600 hover:text-white dark:border-white/15`}
                >
                  <Mono className="opacity-50 group-hover:opacity-100">{ID.featureId(i + 1)}</Mono>
                  <span className="text-[17px] font-black tracking-tight">{f}</span>
                  <span className="h-2 w-2 bg-brand-600 group-hover:bg-white dark:bg-brand-400" />
                </li>
              ))}
            </ol>
          </div>
          {/* Cột phải: dành cho ai - bảng dày chữ, có nhãn phân loại. */}
          <div className="lg:col-span-7">
            <div className={`border-b ${RULE} px-4 py-2`}>
              <Mono>{v.manifestAudience}</Mono>
            </div>
            <div className="grid sm:grid-cols-2">
              {audience.map((a, i) => (
                <div
                  key={a.title}
                  className={`relative border-black/15 p-5 dark:border-white/15 ${i % 2 === 0 ? "sm:border-r" : ""} ${i < 2 ? "border-b" : i === 2 ? "border-b sm:border-b-0" : ""}`}
                >
                  <Mono className="text-brand-700 dark:text-brand-300">{"tag" in a ? (a as { tag?: string }).tag : ""}</Mono>
                  <p className="mt-2 text-2xl font-black leading-tight tracking-tight">{a.title}</p>
                  <p className="mt-2 text-[14px] leading-6 opacity-75">{a.desc}</p>
                  <span className="absolute right-4 top-4 font-mono text-[40px] font-black leading-none opacity-[0.08]">{String(i + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 08 · BÁO CÁO + CTA ───────────────────────── */

/**
 * Ba con số phải đọc CẠNH nhau mới có nghĩa, nên chúng là một bảng - và bảng
 * có cột NGUỒN. Nguồn chi tiết: 11% ManpowerGroup Total Workforce Index; 7/10
 * VnEconomy; 1,2 triệu Bộ KH&CN. Đổi số thì đổi cả nguồn trong từ điển.
 */
export function EditorialReport() {
  const { t } = useI18n();
  const v = t.home.v2;
  const vi = t.home.vision;
  const rows = [
    { label: vi.stat1Label, value: "11%", note: vi.stat1Note, source: vi.stat1Source, key: true },
    { label: vi.stat2Label, value: "7/10", note: vi.stat2Note, source: vi.stat2Source, key: false },
    { label: vi.stat3Label, value: vi.stat3Value, note: vi.stat3Note, source: vi.stat3Source, key: false },
  ];

  return (
    <>
      <section data-dbg="section#report" className={`border-b-2 ${RULE} ${PAPER} ${INK}`}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-20">
          <div className="min-w-0 lg:col-span-7">
            <SheetHead n={8} kicker={vi.eyebrow} title={vi.title} loading={v.loadReport} />
            <div className="relative mt-10">
              <Stamp className="thcn-stamp absolute -top-5 right-2 z-10 inline-block bg-[#eeebe3] dark:bg-[#0c0d10]">{v.noteStamp}</Stamp>
              {/* Ba số xếp thành ba dòng lớn thay vì bảng nhỏ: số là nhân vật chính. */}
              <ol className={`border-t-2 ${RULE}`}>
                {rows.map((r) => (
                  <li key={r.label} className={`grid gap-x-6 gap-y-1 border-b ${RULE} py-5 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]`}>
                    <span
                      className={`text-5xl font-black leading-none tracking-[-0.04em] sm:text-6xl ${r.key ? "text-brand-600 dark:text-brand-400" : ""} ${
                        /^[\d.,/%\s]+$/.test(r.value) ? "font-mono" : ""
                      }`}
                    >
                      <Scramble text={r.value} duration={700} />
                    </span>
                    <span>
                      <span className="block text-sm font-black uppercase tracking-wide">{r.label}</span>
                      <span className="mt-1 block text-[14px] leading-6 opacity-80">{r.note}</span>
                      <Mono className="mt-1 block normal-case opacity-50">↳ {r.source}</Mono>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-4 lg:col-start-9 lg:pt-24">
            <div className={`relative border-2 ${RULE}`}>
              <CropMarks className="border-brand-600" />
              <div className={`flex justify-between border-b-2 ${RULE} ${BAND} px-3 py-1.5`}>
                <Mono>{ID.readme}</Mono>
                <Mono className="text-brand-300">{v.done}</Mono>
              </div>
              <div className="p-5">
                <Mono className="opacity-60">{vi.missionLabel}</Mono>
                <p className="mt-3 min-h-[9rem] text-[16px] leading-7">
                  <TypeText text={vi.missionBody} speed={12} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA lớn: chữ tràn mép trên nền xanh - khoảnh khắc duy nhất trang dùng
          xanh làm nền cả dải. */}
      <section data-dbg="section#start" className={`relative overflow-hidden border-b-2 ${RULE} bg-brand-600 text-white`}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="whitespace-nowrap text-[24vw] font-black uppercase leading-[0.85] tracking-[-0.06em] lg:text-[17rem]">
            <Scramble text={v.ctaBig} duration={900} />
          </p>
          <div className="mt-8 flex flex-col gap-6 border-t-2 border-white pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-lg font-semibold leading-snug">{v.ctaBigSub}</p>
            <Link
              href="/login?mode=signup"
              className="thcn-glitch group inline-flex items-center justify-center gap-3 bg-[#0d0e11] px-7 py-4 text-[15px] font-black uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-[#0d0e11]"
            >
              {vi.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ───────────────────────── FOOTER ───────────────────────── */

export function EditorialFooter() {
  const { t } = useI18n();
  const f = t.home.footer;
  const cols = [
    {
      dir: "lo-trinh",
      title: f.tracksTitle,
      links: [
        ["/dashboard", f.trackPersonal],
        ["/dashboard", f.trackCorporate],
        ["/dashboard", f.trackCertification],
        ["/game", f.trackGame],
      ],
    },
    {
      dir: "he-sinh-thai",
      title: f.ecoTitle,
      links: [
        ["/nhom-hoc", f.ecoStudyRoom],
        ["/bang-tin", f.ecoFeed],
        ["/cua-hang", f.ecoShop],
      ],
    },
    {
      dir: "ho-tro",
      title: f.supportTitle,
      links: [
        ["/dieu-khoan", f.terms],
        ["/chinh-sach-bao-mat", f.privacy],
        ["/login", f.login],
      ],
    },
  ];

  return (
    <footer data-dbg="section#footer" className={`overflow-hidden ${BAND}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/20 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <Logo size={28} />
              <span className="text-base font-black uppercase tracking-tight">{t.home.brand}</span>
            </div>
            <p className="mt-4 max-w-sm text-[13px] leading-6 text-[#eeebe3]/60">{f.blurb}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#eeebe3]/60">
              <span className="thcn-blink h-2 w-2 bg-brand-400" aria-hidden />
              {format(f.community, { count: roundedLessonCount() })}
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.dir} className="lg:col-span-2 lg:first-of-type:col-start-7">
              <Mono className="text-brand-300">{ID.dir(col.dir)}</Mono>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.1em]">{col.title}</p>
              <ul className="mt-4 space-y-2.5 text-[13px] font-semibold">
                {col.links.map(([href, label]) => (
                  <li key={label}>
                    <Link href={href} className="group inline-flex items-center gap-1.5 text-[#eeebe3]/60 transition-colors hover:text-white">
                      <span className="font-mono text-brand-400 opacity-0 transition-opacity group-hover:opacity-100">›</span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Khẳng định chủ quyền: giữ nguyên nội dung và màu cờ. */}
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2.5 text-[13px] font-bold">
            <span className="inline-flex h-4 w-6 items-center justify-center bg-[#DA251D]" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-[#FFCD00]" fill="currentColor">
                <path d="m12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.2 5.8 20.9l1.6-7L2 9.2l7.1-.6L12 2Z" />
              </svg>
            </span>
            {f.sovereignty}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#eeebe3]/50">
            <span>{f.copyright}</span>
            <span className="hidden sm:inline">{f.tagline}</span>
            <Mono className="text-[#eeebe3]/40">{ID.build}</Mono>
          </div>
        </div>
      </div>
      {/* Chữ ký khổng lồ cắt nửa dưới - trang kết thúc như gáy một cuốn sách. */}
      <p aria-hidden className="-mb-[0.14em] mt-4 select-none whitespace-nowrap px-2 text-center text-[8.4vw] font-black uppercase leading-none tracking-[-0.06em] text-brand-600">
        {t.home.brand}
      </p>
    </footer>
  );
}
