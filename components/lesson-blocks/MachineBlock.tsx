"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CheckCircle2, Cpu, Globe, Lightbulb, Play, RotateCcw, Send, StepForward, Timer, XCircle } from "lucide-react";
import type { LessonSectionBlock } from "@/lib/lesson-types";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import {
  MAX_STEPS,
  formatMachineError,
  initialState,
  HTTP_AUTH,
  HTTP_METHODS,
  parseProgram,
  simulateDns,
  simulateHttp,
  simulateScheduler,
  stepCpu,
} from "@/lib/lesson-blocks/machine";

/** Khối `machine` - xem lib/lesson-types.ts. Chạy trên bộ thông dịch tự viết
 *  (lib/lesson-blocks/machine.js), không eval, tài nguyên bị chặn cứng. */
export type MachineBlockProps = Extract<LessonSectionBlock, { type: "machine" }> & { onPass?: () => void };

export default function MachineBlock(props: MachineBlockProps) {
  switch (props.kind) {
    case "scheduler":
      return <SchedulerLab {...props} />;
    case "http":
      return <HttpLab {...props} />;
    case "dns":
      return <DnsLab {...props} />;
    default:
      return <CpuLab {...props} />;
  }
}

/* ── Thông tin dùng chung: tiêu đề, gợi ý, lời giải ───────────────────── */

function Shell({
  badge,
  icon,
  title,
  task,
  children,
  hints = [],
  explanation,
  attempted,
  passed,
  solutionNode,
}: {
  badge: string;
  icon: React.ReactNode;
  title: string;
  task: string;
  children: React.ReactNode;
  hints?: string[];
  explanation?: string;
  attempted: boolean;
  passed: boolean;
  solutionNode: React.ReactNode;
}) {
  const { t } = useI18n();
  const c = t.lessonMachine;
  const [hintsShown, setHintsShown] = useState(0);
  const [solutionOpen, setSolutionOpen] = useState(false);
  return (
    <section className="my-8 overflow-hidden rounded-md border border-line-strong bg-white dark:bg-stone-900" aria-label={title}>
      <header className="space-y-2 border-b border-line-strong px-4 py-3 sm:px-5">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-accent-strong">
          {icon}
          <span>{badge}</span>
        </p>
        <h3 className="text-lg font-black tracking-tight text-ink-max">{title}</h3>
        <p className="max-w-[68ch] whitespace-pre-line text-base leading-7 text-ink-body">{task}</p>
      </header>
      {children}
      <footer className="space-y-3 px-4 py-3 sm:px-5">
        {hints.slice(0, hintsShown).map((hint, i) => (
          <p key={i} className="flex items-start gap-2 text-sm leading-6 text-ink-body">
            <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden />
            <span>{hint}</span>
          </p>
        ))}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {hintsShown < hints.length ? (
            <button type="button" onClick={() => setHintsShown((n) => n + 1)} className="font-bold text-accent-strong underline-offset-4 hover:underline">
              {c.showHint} ({hintsShown + 1}/{hints.length})
            </button>
          ) : null}
          {attempted ? (
            <button type="button" onClick={() => setSolutionOpen((o) => !o)} className="font-bold text-accent-strong underline-offset-4 hover:underline">
              {solutionOpen ? c.hideSolution : c.showSolution}
            </button>
          ) : (
            <span className="text-ink-muted">{c.solutionLocked}</span>
          )}
        </div>
        {solutionOpen ? solutionNode : null}
        {explanation && (passed || solutionOpen) ? (
          <div className="rounded-sm border-l-4 border-accent bg-surface-raised px-4 py-3 dark:bg-stone-800">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-accent-strong">{c.explanationLabel}</p>
            <p className="mt-1 max-w-[68ch] text-sm leading-6 text-ink-body">{explanation}</p>
          </div>
        ) : null}
      </footer>
    </section>
  );
}

function PassBanner({ children }: { children: React.ReactNode }) {
  return (
    <p role="status" className="flex items-start gap-2 border-t border-line-strong bg-brand-50 px-4 py-3 text-sm font-bold text-brand-800 dark:bg-brand-950/40 dark:text-brand-200 sm:px-5">
      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
      {children}
    </p>
  );
}

/* ── CPU ──────────────────────────────────────────────────────────────── */

type CpuProps = Extract<MachineBlockProps, { kind: "cpu" }>;

function CpuLab({ title, task, memory, starter, solution, goal, hints, explanation, onPass }: CpuProps) {
  const { t } = useI18n();
  const c = t.lessonMachine;
  const editorId = useId();
  const [code, setCode] = useState(starter.join("\n"));
  const [state, setState] = useState(() => initialState(memory));
  const [attempted, setAttempted] = useState(false);
  const passed = useRef(false);

  const lines = useMemo(() => code.split("\n"), [code]);
  const prog = useMemo(() => parseProgram(lines), [lines]);
  const parseError = prog.errors[0] ? formatMachineError(prog.errors[0], c.err) : null;
  const runtimeError = state.error ? formatMachineError(state.error, c.err) : null;

  const goalCells = goal.cells.map((g) => ({ ...g, actual: state.mem[g.cell] }));
  const met = state.halted && !state.error && goalCells.every((g) => g.actual === g.value);

  useEffect(() => {
    if (met && !passed.current) {
      passed.current = true;
      onPass?.();
    }
  }, [met, onPass]);

  // Sửa mã thì máy về trạng thái ban đầu: kết quả cũ không còn thuộc về mã này.
  const edit = (next: string) => {
    setCode(next);
    setState(initialState(memory));
  };
  const doStep = () => {
    if (parseError) return;
    setAttempted(true);
    setState((s) => stepCpu(s, prog));
  };
  const doRun = () => {
    if (parseError) return;
    setAttempted(true);
    setState((s) => {
      let cur = s;
      while (!cur.halted && !cur.error) cur = stepCpu(cur, prog);
      return cur;
    });
  };
  const reset = () => setState(initialState(memory));

  const lastText = state.line !== null ? lines[state.line]?.trim() : "";
  const finished = state.halted || !!state.error;

  return (
    <Shell
      badge={c.cpuBadge}
      icon={<Cpu className="h-3.5 w-3.5" aria-hidden />}
      title={title}
      task={task}
      hints={hints}
      explanation={explanation}
      attempted={attempted}
      passed={met}
      solutionNode={
        <pre className="overflow-x-auto rounded-sm bg-[#1e1e1e] px-4 py-3 font-mono text-[13px] leading-6 text-stone-100">{solution.join("\n")}</pre>
      }
    >
      <div className="border-b border-line-strong px-4 py-3 sm:px-5">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{c.goal}</p>
        <p className="font-mono text-sm text-ink-max">{goal.cells.map((g) => format(c.goalCell, g)).join(" · ")}</p>
      </div>

      <div className="bg-[#1e1e1e]">
        <div className="border-b border-stone-700 px-4 py-2">
          <label htmlFor={editorId} className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-stone-400">
            {c.program}
          </label>
        </div>
        <textarea
          id={editorId}
          value={code}
          onChange={(e) => edit(e.target.value)}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          rows={Math.min(Math.max(lines.length, 4), 16)}
          className="block w-full resize-y bg-transparent px-4 py-3 font-mono text-[13px] leading-6 text-stone-100 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-400"
        />
        <p className="border-t border-stone-700 px-4 py-2 text-xs leading-5 text-stone-400">{c.cpuGuide}</p>
        <div className="flex flex-wrap items-center gap-2 border-t border-stone-700 px-4 py-2">
          <button type="button" onClick={doStep} disabled={!!parseError || finished} className="inline-flex items-center gap-1.5 rounded-sm bg-brand-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-500 disabled:opacity-60">
            <StepForward className="h-3.5 w-3.5" aria-hidden />
            {c.step}
          </button>
          <button type="button" onClick={doRun} disabled={!!parseError || finished} className="inline-flex items-center gap-1.5 rounded-sm bg-brand-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-500 disabled:opacity-60">
            <Play className="h-3.5 w-3.5" aria-hidden />
            {c.runAll}
          </button>
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-bold text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-100">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            {c.reset}
          </button>
          <button type="button" onClick={() => edit(starter.join("\n"))} className="ml-auto rounded-sm px-3 py-1.5 text-xs font-bold text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-100">
            {c.resetCode}
          </button>
        </div>
      </div>

      {parseError ? (
        <p role="alert" className="flex items-start gap-2 border-t border-line-strong bg-red-50 px-4 py-3 text-sm text-red-900 dark:bg-red-950/40 dark:text-red-100 sm:px-5">
          <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
          {parseError}
        </p>
      ) : null}

      <div className="grid gap-4 px-4 py-4 sm:grid-cols-2 sm:px-5">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{c.registers}</p>
          <dl className="grid grid-cols-4 gap-2">
            {state.regs.map((v, i) => (
              <div key={i} className="rounded-sm border border-line-strong px-2 py-1.5 text-center">
                <dt className="font-mono text-[11px] text-ink-muted">R{i}</dt>
                <dd className="font-mono text-base font-bold text-ink-max">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{c.memory}</p>
          <dl className="grid grid-cols-4 gap-2">
            {state.mem.map((v, i) => {
              const isGoal = goal.cells.some((g) => g.cell === i);
              return (
                <div key={i} className={`rounded-sm border px-2 py-1.5 text-center ${isGoal ? "border-brand-600 bg-accent-soft" : "border-line-strong"}`}>
                  <dt className="font-mono text-[11px] text-ink-muted">{i}</dt>
                  <dd className="font-mono text-base font-bold text-ink-max">{v}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>

      <div className="space-y-1 border-t border-line-strong px-4 py-3 text-sm sm:px-5" aria-live="polite">
        {runtimeError ? (
          <p role="alert" className="flex items-start gap-2 font-bold text-danger">
            <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
            {runtimeError}
          </p>
        ) : state.steps === 0 ? (
          <p className="text-ink-muted">{c.notStarted}</p>
        ) : (
          <p className="text-ink-body">
            {state.line !== null ? <span className="font-mono">{format(c.running, { line: state.line + 1, text: lastText ?? "" })}</span> : null}{" "}
            <span className="text-ink-muted">
              {c.steps}: {state.steps}/{MAX_STEPS}
            </span>
          </p>
        )}
        {state.halted && !state.error ? (
          <p className="text-ink-body">
            {format(c.halted, { steps: state.steps })}{" "}
            {!met ? (
              <span className="font-bold text-danger">
                {goalCells
                  .filter((g) => g.actual !== g.value)
                  .map((g) => format(c.goalMissCell, g))
                  .join("; ")}
                .
              </span>
            ) : null}
          </p>
        ) : null}
      </div>
      {met ? <PassBanner>{c.passCpu}</PassBanner> : null}
    </Shell>
  );
}

/* ── Bộ lập lịch ──────────────────────────────────────────────────────── */

type SchedProps = Extract<MachineBlockProps, { kind: "scheduler" }>;

// Màu theo chỉ số tiến trình; ngoài màu còn có tên trên thanh và trong bảng,
// nên không ai phải phân biệt tiến trình chỉ bằng màu.
const PROC_COLORS = ["bg-brand-600 text-white", "bg-amber-500 text-black", "bg-emerald-600 text-white", "bg-violet-600 text-white", "bg-rose-600 text-white", "bg-sky-600 text-white"];

function SchedulerLab({ title, task, procs, switchCost, quantum, solutionQuantum, goal, hints, explanation, onPass }: SchedProps) {
  const { t } = useI18n();
  const c = t.lessonMachine;
  const sliderId = useId();
  const [q, setQ] = useState(quantum.value);
  const [touched, setTouched] = useState(false);
  const passed = useRef(false);

  const sim = useMemo(() => simulateScheduler(procs, q, switchCost), [procs, q, switchCost]);
  const okResponse = sim.avgResponse <= goal.maxAvgResponse;
  const okTotal = sim.total <= goal.maxTotal;
  const met = okResponse && okTotal;
  const colorOf = (name: string) => PROC_COLORS[procs.findIndex((p) => p.name === name) % PROC_COLORS.length];

  useEffect(() => {
    if (touched && met && !passed.current) {
      passed.current = true;
      onPass?.();
    }
  }, [touched, met, onPass]);

  const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

  return (
    <Shell
      badge={c.schedBadge}
      icon={<Timer className="h-3.5 w-3.5" aria-hidden />}
      title={title}
      task={task}
      hints={hints}
      explanation={explanation}
      attempted={touched}
      passed={met && touched}
      solutionNode={<p className="rounded-sm bg-stone-100 px-3 py-2 font-mono text-sm text-ink-max dark:bg-stone-800">{format(c.quantum, { q: solutionQuantum })}</p>}
    >
      <div className="space-y-2 border-b border-line-strong px-4 py-3 sm:px-5">
        <label htmlFor={sliderId} className="block text-sm font-bold text-ink-max">
          {format(c.quantum, { q })}
        </label>
        <input
          id={sliderId}
          type="range"
          min={quantum.min}
          max={quantum.max}
          step={1}
          value={q}
          onChange={(e) => {
            setTouched(true);
            setQ(Number(e.target.value));
          }}
          className="w-full accent-brand-600"
        />
        <p className="text-xs leading-5 text-ink-muted">{format(c.quantumHint, { cost: switchCost })}</p>
      </div>

      <div className="space-y-3 px-4 py-4 sm:px-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{c.gantt}</p>
        <div className="flex h-10 w-full overflow-hidden rounded-sm border border-line-strong" aria-hidden>
          {sim.segments.map((s, i) => {
            const pct = ((s.to - s.from) / sim.total) * 100;
            const label = s.kind === "run" ? s.who : s.kind === "switch" ? "" : "";
            return (
              <div
                key={i}
                style={{ width: `${pct}%` }}
                title={s.kind === "run" ? `${s.who}: ${s.from}–${s.to}` : `${s.kind}: ${s.from}–${s.to}`}
                className={`flex min-w-0 items-center justify-center overflow-hidden border-r border-white/40 text-[11px] font-bold ${
                  s.kind === "run" ? colorOf(s.who as string) : s.kind === "switch" ? "bg-stone-400 dark:bg-stone-600" : "bg-transparent"
                }`}
              >
                {pct >= 7 ? label : ""}
              </div>
            );
          })}
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-body">
          {procs.map((p) => (
            <li key={p.name} className="flex items-center gap-1.5">
              <span className={`inline-block h-3 w-3 rounded-sm ${colorOf(p.name).split(" ")[0]}`} aria-hidden />
              {p.name}
            </li>
          ))}
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-sm bg-stone-400 dark:bg-stone-600" aria-hidden />
            {c.switchLabel}
          </li>
        </ul>
        {/* Bản chữ của dòng thời gian cho người đọc màn hình. */}
        <ol className="sr-only">
          {sim.segments.map((s, i) => (
            <li key={i}>
              {s.kind === "run"
                ? format(c.segRun, { who: s.who as string, from: s.from, to: s.to })
                : s.kind === "switch"
                  ? format(c.segSwitch, { from: s.from, to: s.to })
                  : format(c.segIdle, { from: s.from, to: s.to })}
            </li>
          ))}
        </ol>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[20rem] text-left text-sm">
            <caption className="sr-only">{c.procTable}</caption>
            <thead>
              <tr className="border-b border-line-strong text-[11px] uppercase tracking-[0.06em] text-ink-muted">
                <th scope="col" className="py-1 pr-2 font-bold">{c.colName}</th>
                <th scope="col" className="py-1 pr-2 font-bold">{c.colArrival}</th>
                <th scope="col" className="py-1 pr-2 font-bold">{c.colBurst}</th>
                <th scope="col" className="py-1 pr-2 font-bold">{c.colResponse}</th>
                <th scope="col" className="py-1 font-bold">{c.colFinish}</th>
              </tr>
            </thead>
            <tbody className="font-mono text-ink-max">
              {procs.map((p, i) => (
                <tr key={p.name} className="border-b border-line">
                  <th scope="row" className="py-1 pr-2 font-sans font-bold">{p.name}</th>
                  <td className="py-1 pr-2">{p.arrival}</td>
                  <td className="py-1 pr-2">{p.burst}</td>
                  <td className="py-1 pr-2">{sim.per[i].response}</td>
                  <td className="py-1">{sim.per[i].finish}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <dl className="grid gap-2 sm:grid-cols-3">
          <Metric label={c.avgResponse} value={fmt(sim.avgResponse)} ok={okResponse} limit={format(c.limitResponse, { n: goal.maxAvgResponse })} />
          <Metric label={c.total} value={String(sim.total)} ok={okTotal} limit={format(c.limitTotal, { n: goal.maxTotal })} />
          <div className="rounded-sm border border-line-strong px-3 py-2">
            <dt className="text-xs text-ink-muted">{c.switches}</dt>
            <dd className="font-mono text-lg font-bold text-ink-max">{sim.switches}</dd>
          </div>
        </dl>
      </div>
      {met && touched ? <PassBanner>{c.passSched}</PassBanner> : null}
    </Shell>
  );
}

function Metric({ label, value, ok, limit }: { label: string; value: string; ok: boolean; limit: string }) {
  return (
    <div className={`rounded-sm border px-3 py-2 ${ok ? "border-brand-600 bg-accent-soft" : "border-line-strong"}`}>
      <dt className="text-xs text-ink-muted">{label}</dt>
      <dd className="font-mono text-lg font-bold text-ink-max">{value}</dd>
      <dd className={`flex items-center gap-1 text-xs font-bold ${ok ? "text-accent-strong" : "text-danger"}`}>
        {ok ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> : <XCircle className="h-3.5 w-3.5" aria-hidden />}
        {limit}
      </dd>
    </div>
  );
}

/* ── HTTP ─────────────────────────────────────────────────────────────── */

type HttpProps = Extract<MachineBlockProps, { kind: "http" }>;
type HttpReq = HttpProps["starter"];

function rawRequest(req: HttpReq, bearer: Record<string, string>) {
  const lines = [`${req.method} ${req.path || "/"} HTTP/1.1`, "Host: api.example.test"];
  if (req.auth !== "none") lines.push(`Authorization: Bearer ${bearer[req.auth]}`);
  if (req.body.trim()) lines.push("Content-Type: application/json", "", req.body);
  return lines.join("\n");
}

function HttpLab({ title, task, server, starter, solution, goal, hints, explanation, onPass }: HttpProps) {
  const { t } = useI18n();
  const c = t.lessonMachine;
  const ids = { method: useId(), path: useId(), auth: useId(), body: useId() };
  const [req, setReq] = useState<HttpReq>(starter);
  const [sent, setSent] = useState<{ status: number; code: string; field?: string; allow?: string } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const passed = useRef(false);
  const met = sent?.status === goal.status;
  const edit = (patch: Partial<HttpReq>) => {
    setReq((r) => ({ ...r, ...patch }));
    setSent(null);
  };
  useEffect(() => {
    if (met && !passed.current) {
      passed.current = true;
      onPass?.();
    }
  }, [met, onPass]);
  // Mã thật gắn với một lý do bằng lời: người học học cách ĐỌC lỗi, không đoán.
  const tokens = { none: "", bad: "expired-token", good: "demo-token" };
  const field = "block w-full rounded-sm border border-line-strong bg-white px-2 py-1.5 font-mono text-sm text-ink-max dark:bg-stone-800";
  const label = "mb-1 block text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted";
  const ok = sent && sent.status < 300;

  return (
    <Shell
      badge={c.httpBadge}
      icon={<Globe className="h-3.5 w-3.5" aria-hidden />}
      title={title}
      task={task}
      hints={hints}
      explanation={explanation}
      attempted={attempts > 0}
      passed={!!met}
      solutionNode={<pre className="overflow-x-auto rounded-sm bg-[#1e1e1e] px-4 py-3 font-mono text-[13px] leading-6 text-stone-100">{rawRequest(solution, tokens)}</pre>}
    >
      <div className="border-b border-line-strong px-4 py-3 sm:px-5">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{c.goal}</p>
        <p className="font-mono text-sm text-ink-max">{format(c.httpGoal, { status: goal.status })}</p>
      </div>
      <div className="grid gap-3 px-4 py-4 sm:grid-cols-2 sm:px-5">
        <div>
          <label htmlFor={ids.method} className={label}>{c.httpMethod}</label>
          <select id={ids.method} value={req.method} onChange={(e) => edit({ method: e.target.value })} className={field}>
            {HTTP_METHODS.map((m: string) => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={ids.path} className={label}>{c.httpPath}</label>
          <input id={ids.path} value={req.path} onChange={(e) => edit({ path: e.target.value })} spellCheck={false} autoCapitalize="off" autoCorrect="off" className={field} />
        </div>
        <div>
          <label htmlFor={ids.auth} className={label}>{c.httpAuth}</label>
          <select id={ids.auth} value={req.auth} onChange={(e) => edit({ auth: e.target.value as HttpReq["auth"] })} className={field}>
            {HTTP_AUTH.map((a: string) => <option key={a} value={a}>{c.httpAuthOptions[a as "none" | "bad" | "good"]}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={ids.body} className={label}>{c.httpBody}</label>
          <textarea id={ids.body} value={req.body} onChange={(e) => edit({ body: e.target.value })} rows={3} spellCheck={false} autoCapitalize="off" autoCorrect="off" className={field} />
        </div>
      </div>
      <div className="space-y-2 px-4 pb-4 sm:px-5">
        <p className={label}>{c.httpRaw}</p>
        <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-sm bg-stone-100 px-3 py-2 font-mono text-[13px] leading-6 text-ink-max dark:bg-stone-800">{rawRequest(req, tokens)}</pre>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setSent(simulateHttp(server, req));
              setAttempts((n) => n + 1);
            }}
            className="inline-flex items-center gap-1.5 rounded-sm bg-brand-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-500"
          >
            <Send className="h-3.5 w-3.5" aria-hidden />
            {c.httpSend}
          </button>
          <button type="button" onClick={() => edit(starter)} className="inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-bold text-ink-muted hover:bg-surface-raised">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            {c.resetCode}
          </button>
        </div>
      </div>
      <div className="border-t border-line-strong px-4 py-3 text-sm sm:px-5" aria-live="polite">
        {sent ? (
          <div className={`rounded-sm border px-3 py-2 ${ok ? "border-brand-600 bg-accent-soft" : "border-red-300 bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-100"}`}>
            <p className="font-mono text-base font-bold">{format(c.httpStatusLine, { status: sent.status, text: c.httpReason[String(sent.status) as keyof typeof c.httpReason] ?? "" })}</p>
            <p className="mt-1 leading-6">{format(c.httpExplain[sent.code as keyof typeof c.httpExplain] ?? "", { field: sent.field ?? "", allow: sent.allow ?? "" })}</p>
          </div>
        ) : (
          <p className="text-ink-muted">{c.httpNotSent}</p>
        )}
      </div>
      {met ? <PassBanner>{c.passHttp}</PassBanner> : null}
    </Shell>
  );
}

/* ── DNS ──────────────────────────────────────────────────────────────── */

type DnsProps = Extract<MachineBlockProps, { kind: "dns" }>;

function DnsLab({ title, task, zone, ttl, solutionTtl, goal, hints, explanation, onPass }: DnsProps) {
  const { t } = useI18n();
  const c = t.lessonMachine;
  const sliderId = useId();
  const [v, setV] = useState(ttl.value);
  const [touched, setTouched] = useState(false);
  const passed = useRef(false);
  const sim = useMemo(() => simulateDns(zone, v), [zone, v]);
  const okStale = sim.staleCount <= goal.maxStale;
  const okQ = sim.authQueries <= goal.maxQueries;
  const met = okStale && okQ;
  useEffect(() => {
    if (touched && met && !passed.current) {
      passed.current = true;
      onPass?.();
    }
  }, [touched, met, onPass]);

  return (
    <Shell
      badge={c.dnsBadge}
      icon={<Globe className="h-3.5 w-3.5" aria-hidden />}
      title={title}
      task={task}
      hints={hints}
      explanation={explanation}
      attempted={touched}
      passed={met && touched}
      solutionNode={<p className="rounded-sm bg-stone-100 px-3 py-2 font-mono text-sm text-ink-max dark:bg-stone-800">{format(c.dnsTtl, { ttl: solutionTtl })}</p>}
    >
      <div className="space-y-2 border-b border-line-strong px-4 py-3 sm:px-5">
        <p className="font-mono text-sm text-ink-max">{format(c.dnsRecord, { name: zone.name, oldIp: zone.oldIp, newIp: zone.newIp, at: zone.changeAt })}</p>
        <label htmlFor={sliderId} className="block text-sm font-bold text-ink-max">{format(c.dnsTtl, { ttl: v })}</label>
        <input
          id={sliderId}
          type="range"
          min={ttl.min}
          max={ttl.max}
          step={ttl.step}
          value={v}
          onChange={(e) => {
            setTouched(true);
            setV(Number(e.target.value));
          }}
          className="w-full accent-brand-600"
        />
        <p className="text-xs leading-5 text-ink-muted">{c.dnsTtlHint}</p>
      </div>
      <div className="px-4 py-4 sm:px-5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[20rem] text-left text-sm">
            <caption className="sr-only">{c.dnsTable}</caption>
            <thead>
              <tr className="border-b border-line-strong text-[11px] uppercase tracking-[0.06em] text-ink-muted">
                <th scope="col" className="py-1 pr-2 font-bold">{c.dnsTime}</th>
                <th scope="col" className="py-1 pr-2 font-bold">{c.dnsSource}</th>
                <th scope="col" className="py-1 font-bold">{c.dnsAnswer}</th>
              </tr>
            </thead>
            <tbody className="font-mono text-ink-max">
              {sim.rows.map((r) => (
                <tr key={r.t} className={`border-b border-line ${r.stale ? "bg-red-50 dark:bg-red-950/30" : ""}`}>
                  <th scope="row" className="py-1 pr-2 font-mono font-normal">{r.t}s</th>
                  <td className="py-1 pr-2">{r.source === "cache" ? c.dnsCache : c.dnsAuth}</td>
                  <td className="py-1">
                    {r.answer}
                    {r.stale ? <span className="ml-2 font-sans text-xs font-bold text-danger">{c.dnsStale}</span> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          <Metric label={c.dnsStaleCount} value={String(sim.staleCount)} ok={okStale} limit={format(c.limitStale, { n: goal.maxStale })} />
          <Metric label={c.dnsQueries} value={String(sim.authQueries)} ok={okQ} limit={format(c.limitQueries, { n: goal.maxQueries })} />
        </dl>
      </div>
      {met && touched ? <PassBanner>{c.passDns}</PassBanner> : null}
    </Shell>
  );
}
