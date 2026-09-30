"use client";

import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { BarChart3 } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { LessonSectionBlock } from "@/lib/lesson-types";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import { Sys } from "@/components/ui/system";
import { evalExpr, parseExpr, xValues } from "@/lib/lesson-blocks/expr.js";

/** Khối `chart` - xem lib/lesson-types.ts. Hai hình dạng: "series" (biểu thức
 *  + thanh trượt, tính bằng lib/lesson-blocks/expr.js - không eval, CSP trang
 *  bài học cấm) và "data" (bảng số viết sẵn). */
export type ChartBlockProps = Extract<LessonSectionBlock, { type: "chart" }> & { onPass?: () => void };
type SeriesChart = Extract<ChartBlockProps, { series: unknown }>;
type DataChart = Extract<ChartBlockProps, { data: unknown }>;

/* Dải xanh brand, đổi bậc ở chế độ tối để vẫn đọc được trên nền tối. Mỗi
 * series là một biến CSS --s0..--s3 đặt trên khung bao. */
const SERIES_VARS =
  "[--s0:var(--color-brand-600)] [--s1:var(--color-brand-300)] [--s2:var(--color-brand-900)] [--s3:var(--color-brand-500)] " +
  "dark:[--s0:var(--color-brand-400)] dark:[--s1:var(--color-brand-700)] dark:[--s2:var(--color-brand-200)] dark:[--s3:var(--color-brand-300)]";
const colorOf = (i: number) => `var(--s${i % 4})`;
const AXIS = { fontSize: 11, fill: "currentColor" };

function subscribeReducedMotion(cb: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener?.("change", cb);
  return () => mq.removeEventListener?.("change", cb);
}
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

function useNumberFormat() {
  const { locale } = useI18n();
  return useMemo(() => {
    const nf = new Intl.NumberFormat(intlLocale(locale), { maximumFractionDigits: 1 });
    return (v: number) => (Number.isFinite(v) ? nf.format(v) : "-");
  }, [locale]);
}

export default function ChartBlock(props: ChartBlockProps) {
  return "data" in props && props.data ? <DataChartView {...(props as DataChart)} /> : <SeriesChartView {...(props as SeriesChart)} />;
}

function Frame({ title, caption, children }: { title: string; caption: string; children: React.ReactNode }) {
  const { t } = useI18n();
  return (
    <figure className={`my-6 rounded-card border border-line bg-surface p-4 sm:p-5 ${SERIES_VARS}`}>
      <div className="mb-3 flex items-center gap-2 text-accent-strong">
        <BarChart3 className="h-4 w-4" aria-hidden />
        <Sys>{t.lessonBlockVisual.chartBadge}</Sys>
      </div>
      <h4 className="mb-3 text-base font-bold text-ink-max">{title}</h4>
      {children}
      <figcaption className="mt-3 text-sm text-ink-muted">{caption}</figcaption>
    </figure>
  );
}

function SeriesChartView(b: SeriesChart) {
  const { t } = useI18n();
  const fmt = useNumberFormat();
  const reduced = usePrefersReducedMotion();
  const idBase = useId();
  const params = useMemo(() => b.params ?? [], [b.params]);
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(params.map((p) => [p.id, p.value]))
  );
  const xs = useMemo(() => xValues(b.x), [b.x]);
  // Parse một lần; kéo thanh trượt chỉ tính lại cây.
  const trees = useMemo(() => {
    const names = params.map((p) => p.id);
    return b.series.map((s) => {
      try {
        return parseExpr(s.expr, names);
      } catch {
        return null;
      }
    });
  }, [b.series, params]);

  const rows = useMemo(
    () =>
      xs.map((x) => {
        const row: Record<string, number> = { x };
        trees.forEach((tree, i) => {
          const y = tree ? evalExpr(tree, { ...values, x }) : NaN;
          row[`s${i}`] = Number.isFinite(y) ? Math.round(y * 100) / 100 : 0;
        });
        return row;
      }),
    [xs, trees, values]
  );
  const last = rows[rows.length - 1];

  const common = { data: rows, margin: { top: 8, right: 12, bottom: 4, left: 0 } };
  const anim = { isAnimationActive: !reduced, animationDuration: 350 };
  const marks = b.series.map((s, i) => {
    const key = `s${i}`;
    if (b.kind === "bar") return <Bar key={key} dataKey={key} name={s.label} fill={colorOf(i)} {...anim} />;
    if (b.kind === "area")
      return <Area key={key} type="monotone" dataKey={key} name={s.label} stroke={colorOf(i)} fill={colorOf(i)} fillOpacity={0.15} strokeWidth={2} {...anim} />;
    return <Line key={key} type="monotone" dataKey={key} name={s.label} stroke={colorOf(i)} strokeWidth={2} dot={false} {...anim} />;
  });
  const axes = (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line, #e5e7eb)" vertical={false} />
      <XAxis dataKey="x" tick={AXIS} tickFormatter={fmt} label={{ value: b.xLabel, position: "insideBottom", offset: -2, fontSize: 11, fill: "currentColor" }} height={36} />
      <YAxis tick={AXIS} tickFormatter={fmt} width={48} />
      <Tooltip formatter={(v) => fmt(Number(v))} labelFormatter={(l) => `${b.xLabel}: ${fmt(Number(l))}`} />
      {b.series.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
    </>
  );
  const chart =
    b.kind === "bar" ? (
      <BarChart {...common}>{axes}{marks}</BarChart>
    ) : b.kind === "area" ? (
      <AreaChart {...common}>{axes}{marks}</AreaChart>
    ) : (
      <LineChart {...common}>{axes}{marks}</LineChart>
    );

  return (
    <Frame title={b.title} caption={b.caption}>
      {params.length > 0 && (
        <div className="mb-4 space-y-3">
          <p className="text-xs text-ink-muted">{t.lessonBlockVisual.chartTry}</p>
          {params.map((p) => {
            const id = `${idBase}-${p.id}`;
            const v = values[p.id];
            return (
              <div key={p.id}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <label htmlFor={id} className="font-medium text-ink">{p.label}</label>
                  <output htmlFor={id} className="font-mono text-sm font-bold tabular-nums text-accent-strong">
                    {fmt(v)}{p.unit ? ` ${p.unit}` : ""}
                  </output>
                </div>
                <input
                  id={id}
                  type="range"
                  min={p.min}
                  max={p.max}
                  step={p.step}
                  value={v}
                  aria-valuetext={`${fmt(v)}${p.unit ? ` ${p.unit}` : ""}`}
                  onChange={(e) => setValues((cur) => ({ ...cur, [p.id]: Number(e.target.value) }))}
                  className="mt-1 w-full accent-[var(--color-brand-600)]"
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="h-64 w-full text-ink-muted" aria-hidden>
        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 480, height: 256 }}>
          {chart}
        </ResponsiveContainer>
      </div>

      {last && (
        <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-2" aria-live="polite">
          {b.series.map((s, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: colorOf(i) }} />
              <dt className="text-xs text-ink-muted">
                {s.label} · {format(t.lessonBlockVisual.readoutAt, { x: `${b.xLabel} ${fmt(last.x)}` })}
              </dt>
              <dd className="font-mono text-lg font-bold tabular-nums text-ink-max" data-testid={`readout-${i}`}>
                {fmt(last[`s${i}`])}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <table className="sr-only">
        <caption>{format(t.lessonBlockVisual.tableCaption, { title: b.title })}</caption>
        <thead>
          <tr>
            <th scope="col">{b.xLabel}</th>
            {b.series.map((s, i) => <th key={i} scope="col">{s.label} ({b.yLabel})</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.x}>
              <th scope="row">{fmt(r.x)}</th>
              {b.series.map((_, i) => <td key={i}>{fmt(r[`s${i}`])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}

function DataChartView(b: DataChart) {
  const { t } = useI18n();
  const fmt = useNumberFormat();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  // Hiện dần khi cuộn tới: trước đó các cột nằm ở 0, vào khung nhìn thì mọc lên.
  useEffect(() => {
    if (reduced || typeof IntersectionObserver === "undefined") return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const shown = seen || reduced || typeof IntersectionObserver === "undefined";
  const rows = useMemo(
    () =>
      b.data.map((r) => {
        const row: Record<string, string | number> = { label: r.label };
        b.seriesLabels.forEach((_, i) => (row[`s${i}`] = shown ? r.values[i] ?? 0 : 0));
        return row;
      }),
    [b.data, b.seriesLabels, shown]
  );
  const anim = { isAnimationActive: !reduced, animationDuration: 700 };
  const common = { data: rows, margin: { top: 8, right: 12, bottom: 4, left: 0 } };
  const axes = (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line, #e5e7eb)" vertical={false} />
      <XAxis dataKey="label" tick={AXIS} interval={0} height={40} />
      <YAxis tick={AXIS} tickFormatter={fmt} width={48} label={{ value: b.yLabel, angle: -90, position: "insideLeft", fontSize: 11, fill: "currentColor" }} />
      <Tooltip formatter={(v) => fmt(Number(v))} />
      {b.seriesLabels.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
    </>
  );

  return (
    <Frame title={b.title} caption={b.caption}>
      <div ref={ref} className="h-64 w-full text-ink-muted" aria-hidden>
        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 480, height: 256 }}>
          {b.kind === "line" ? (
            <LineChart {...common}>
              {axes}
              {b.seriesLabels.map((l, i) => (
                <Line key={i} type="monotone" dataKey={`s${i}`} name={l} stroke={colorOf(i)} strokeWidth={2} {...anim} />
              ))}
            </LineChart>
          ) : (
            <BarChart {...common}>
              {axes}
              {b.seriesLabels.map((l, i) => (
                <Bar key={i} dataKey={`s${i}`} name={l} fill={colorOf(i)} radius={[3, 3, 0, 0]} {...anim} />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <table className="sr-only">
        <caption>{format(t.lessonBlockVisual.tableCaption, { title: b.title })}</caption>
        <thead>
          <tr>
            <th scope="col">{b.xLabel ?? ""}</th>
            {b.seriesLabels.map((l, i) => <th key={i} scope="col">{l} ({b.yLabel})</th>)}
          </tr>
        </thead>
        <tbody>
          {b.data.map((r, ri) => (
            <tr key={ri}>
              <th scope="row">{r.label}</th>
              {b.seriesLabels.map((_, i) => <td key={i}>{fmt(r.values[i])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}
