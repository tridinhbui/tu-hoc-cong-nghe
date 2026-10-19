"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getLeaderboardByMetric, type LeaderboardRow } from "@/lib/cloudflare-user";
import { isValidAvatar } from "@/lib/avatar-utils";
import { LEARNER_QUOTES } from "@/lib/learner-quotes";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import { INK, Mono, PAPER, RULE } from "@/components/home/v2/kit";

type Metric = "xp" | "streak" | "lessons";
type Card =
  | { kind: "stat"; key: string; row: LeaderboardRow; metric: Metric }
  | { kind: "quote"; key: string; text: string; name: string; role: string; result?: string };

const ACCENT: Record<Metric, string> = { xp: "border-t-brand-500", streak: "border-t-amber-500", lessons: "border-t-emerald-500" };

function Face({ name, url }: { name: string; url?: string | null }) {
  return isValidAvatar(url) ? (
    <Image src={url!} alt="" width={48} height={48} className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white dark:ring-white/10" />
  ) : (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-600 text-base font-black text-white">
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}

/**
 * Banner cuộn ngang: kết quả học thật (XP, chuỗi ngày, số bài - lấy từ bảng
 * xếp hạng công khai) xen với nhận xét của học viên khi có (lib/learner-quotes).
 * Không có dữ liệu thì không vẽ gì, và không bao giờ dựng số hay lời khen giả.
 */
export default function EditorialVoices() {
  const { t, locale } = useI18n();
  const v = t.home.v2;
  const lp = t.leaderboardPreview;
  const [stats, setStats] = useState<Card[]>([]);

  useEffect(() => {
    let cancelled = false;
    const metrics: Metric[] = ["xp", "streak", "lessons"];
    Promise.all(metrics.map((m) => getLeaderboardByMetric(m, 5).catch(() => [] as LeaderboardRow[]))).then((lists) => {
      if (cancelled) return;
      const out: Card[] = [];
      const max = Math.max(...lists.map((l) => (l ?? []).length));
      // Xen kẽ ba loại số để dải không thành ba khối cùng màu.
      for (let i = 0; i < max; i++) {
        lists.forEach((l, mi) => {
          const row = l?.[i];
          if (row && row.value > 0) out.push({ kind: "stat", key: `${metrics[mi]}-${row.user_id}`, row, metric: metrics[mi] });
        });
      }
      setStats(out);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const quotes: Card[] = LEARNER_QUOTES.map((q, i) => ({
    kind: "quote",
    key: `q-${i}`,
    text: q.text,
    name: q.name,
    role: q.role,
    result: q.result,
  }));

  // Cứ hai nhận xét lại xen một thẻ số liệu thật.
  const cards: Card[] = [];
  let si = 0;
  quotes.forEach((q, i) => {
    cards.push(q);
    if ((i + 1) % 2 === 0 && si < stats.length) cards.push(stats[si++]);
  });
  while (si < stats.length) cards.push(stats[si++]);

  if (cards.length < 3) return null;

  const unit = (metric: Metric, value: number) =>
    metric === "xp"
      ? format(lp.metricXp, { value: value.toLocaleString(intlLocale(locale)) })
      : metric === "streak"
        ? format(lp.metricStreak, { value })
        : format(lp.metricLessons, { value });

  const row = (
    <div className="flex shrink-0 items-stretch gap-4 pr-4">
      {cards.map((c) =>
        c.kind === "stat" ? (
          <div key={c.key} className={`flex w-[250px] shrink-0 items-center gap-3 border-t-2 ${ACCENT[c.metric]} bg-white/70 px-4 py-4 dark:bg-white/[0.06]`}>
            <Face name={c.row.name} url={c.row.avatarUrl} />
            <div className="min-w-0">
              <p className="truncate text-sm font-black">{c.row.name}</p>
              <p className="font-mono text-[12px] font-medium tabular-nums text-accent-strong">{unit(c.metric, c.row.value)}</p>
            </div>
          </div>
        ) : (
          <figure key={c.key} className="flex w-[320px] shrink-0 flex-col justify-between border-t-2 border-t-brand-600 bg-white/70 p-4 dark:bg-white/[0.06]">
            {c.result && <p className="mb-2 font-mono text-[11px] font-medium text-accent-strong">{c.result}</p>}
            <blockquote className="text-[14px] leading-6">{c.text}</blockquote>
            <figcaption className="mt-3 text-xs">
              <span className="font-black">{c.name}</span>
              <span className="opacity-60"> · {c.role}</span>
            </figcaption>
          </figure>
        ),
      )}
    </div>
  );

  return (
    <section data-dbg="section#voices" className={`overflow-hidden border-b-2 ${RULE} ${PAPER} ${INK} py-8`}>
      <div className="mx-auto mb-5 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Mono className="text-accent-strong">{v.voicesLabel}</Mono>
      </div>
      <div className={`thcn-marquee flex w-max hover:[animation-play-state:paused]`} style={{ animationDuration: `${Math.max(60, cards.length * 7)}s` }}>
        {row}
        <div aria-hidden className="flex">
          {row}
        </div>
      </div>
    </section>
  );
}
