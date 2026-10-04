"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, ChevronDown, Container, Eraser, GitBranch } from "lucide-react";
import ToolShell, { embedMissions, type ToolEmbed } from "@/components/tools/ToolShell";
import { IconTile, panel } from "@/components/ui/system";
import { useI18n } from "@/lib/i18n/context";
import { createInitialState } from "@/lib/tools/terminal/seed";
import { migrateState } from "@/lib/tools/terminal/labs";
import { INTERRUPT_ECHO, PROMPT_USER, complete, runLine } from "@/lib/tools/terminal/shell";
import { displayPath } from "@/lib/tools/terminal/fs";
import { findRepo } from "@/lib/tools/terminal/git";
import { TERMINAL_MISSIONS, completedMissionIds } from "@/lib/tools/terminal/missions";
import { HELP_GROUPS } from "@/lib/tools/terminal/reference";
import type { NoticeId, OutputLine, SpanColor, TermState } from "@/lib/tools/terminal/types";
import { TOOL_STORAGE } from "@/lib/tools/progress";
import { format } from "@/lib/i18n";

const STORAGE_STATE = TOOL_STORAGE.terminalState;
const STORAGE_DONE = TOOL_STORAGE.terminalDone;
/** Số lệnh gần nhất hiện trong kết quả bàn giao. */
const ARTIFACT_COMMANDS = 6;
const MAX_SCREEN = 800;

type ScreenEntry =
  | { k: "welcome" }
  | { k: "prompt"; path: string; cmd: string; interrupted?: boolean }
  | { k: "out"; line: OutputLine }
  | { k: "help" }
  | { k: "notice"; id: Exclude<NoticeId, "help"> }
  | { k: "options"; items: string[] };

const SPAN_CLASS: Record<SpanColor, string> = {
  dir: "font-bold text-sky-400",
  exec: "font-bold text-emerald-400",
  green: "text-emerald-400",
  red: "text-red-400",
  yellow: "text-amber-300",
  match: "font-bold text-red-400",
  bold: "font-bold text-stone-100",
  muted: "text-stone-500",
  link: "text-fuchsia-400",
};

function loadJson<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function saveJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // bộ nhớ đầy hoặc bị chặn: vẫn chạy được, chỉ không nhớ tiến độ
  }
}

function Prompt({ path }: { path: string }) {
  return (
    <>
      <span className="font-bold text-emerald-400">{PROMPT_USER}</span>
      <span className="text-stone-300">:</span>
      <span className="font-bold text-sky-400">{path}</span>
      <span className="text-stone-300">$ </span>
    </>
  );
}

export default function TerminalSim({ embed }: { embed?: ToolEmbed }) {
  const embedded = !!embed;
  const { t } = useI18n();
  const c = t.toolTerminal;

  const [state, setState] = useState<TermState>(() => createInitialState(Date.now()));
  const [savedDone, setSavedDone] = useState<string[]>([]);
  const [screen, setScreen] = useState<ScreenEntry[]>([{ k: "welcome" }]);
  const [input, setInput] = useState("");
  const [cheatOpen, setCheatOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errorKey, setErrorKey] = useState(0);

  const histIndex = useRef<number | null>(null);
  const draft = useRef("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Đọc tiến độ đã lưu sau khi gắn vào trang (localStorage không có lúc render phía máy chủ).
  useEffect(() => {
    if (embedded) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- bản nhúng bắt đầu từ trạng thái mới, không đọc tiến độ của /cong-cu
      setLoaded(true);
      return;
    }
    const stored = loadJson<TermState>(STORAGE_STATE);
    const done = loadJson<string[]>(STORAGE_DONE);
    if (stored && stored.version === 1 && stored.root) setState(migrateState(stored, Date.now()));
    if (Array.isArray(done)) setSavedDone(done);
    setLoaded(true);
  }, [embedded]);

  const doneIds = useMemo(() => {
    const ids = new Set(savedDone);
    for (const id of completedMissionIds(state)) ids.add(id);
    return ids;
  }, [state, savedDone]);

  useEffect(() => {
    if (!loaded || embedded) return;
    saveJson(STORAGE_STATE, state);
    saveJson(STORAGE_DONE, [...doneIds]);
  }, [state, doneIds, loaded, embedded]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [screen]);

  const push = useCallback((entries: ScreenEntry[], reset = false) => {
    setScreen((prev) => {
      const next = reset ? entries : [...prev, ...entries];
      return next.length > MAX_SCREEN ? next.slice(-MAX_SCREEN) : next;
    });
  }, []);

  const path = displayPath(state.cwd);
  const repo = useMemo(() => findRepo(state, state.cwd, false), [state]);
  const running = state.docker.containers.filter((x) => x.status === "running");

  const submit = () => {
    const line = input;
    const echo: ScreenEntry = { k: "prompt", path, cmd: line };
    histIndex.current = null;
    draft.current = "";
    setInput("");
    if (!line.trim()) {
      push([echo]);
      return;
    }
    const { state: next, result } = runLine(state, line, Date.now());
    setState(next);
    const lastRun = next.log.length > state.log.length ? next.log[next.log.length - 1] : null;
    if (lastRun && lastRun.code !== 0) setErrorKey((k) => k + 1);
    const entries: ScreenEntry[] = result.lines.map((l) => ({ k: "out", line: l }));
    for (const n of result.notices) entries.push(n === "help" ? { k: "help" } : { k: "notice", id: n });
    if (result.clear) push(entries, true);
    else push([echo, ...entries]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const res = complete(state, input);
      if (res.options.length) push([{ k: "prompt", path, cmd: input }, { k: "options", items: res.options }]);
      else setInput(res.line);
      return;
    }
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const hist = state.history;
      if (!hist.length) return;
      let idx = histIndex.current;
      if (e.key === "ArrowUp") {
        if (idx === null) {
          draft.current = input;
          idx = hist.length - 1;
        } else idx = Math.max(0, idx - 1);
      } else {
        if (idx === null) return;
        idx = idx + 1;
        if (idx >= hist.length) {
          histIndex.current = null;
          setInput(draft.current);
          return;
        }
      }
      histIndex.current = idx;
      setInput(hist[idx]);
      return;
    }
    if (e.ctrlKey && (e.key === "l" || e.key === "L")) {
      e.preventDefault();
      push([], true);
      return;
    }
    if (e.ctrlKey && (e.key === "c" || e.key === "C") && !window.getSelection()?.toString()) {
      e.preventDefault();
      push([{ k: "prompt", path, cmd: input, interrupted: true }]);
      setInput("");
      histIndex.current = null;
    }
  };

  const focusInput = () => {
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  };

  const showHelp = () => {
    push([{ k: "prompt", path, cmd: "help" }, { k: "help" }]);
    inputRef.current?.focus();
  };

  const insertCommand = (code: string) => {
    setInput(code);
    inputRef.current?.focus();
  };

  const onReset = () => {
    setState(createInitialState(Date.now()));
    setSavedDone([]);
    setInput("");
    histIndex.current = null;
    push([{ k: "welcome" }], true);
    if (embedded) return;
    try {
      window.localStorage.removeItem(STORAGE_STATE);
      window.localStorage.removeItem(STORAGE_DONE);
    } catch {
      // không xoá được bộ nhớ: lần lưu kế tiếp sẽ ghi đè
    }
  };

  const missions = embedMissions(TERMINAL_MISSIONS, embed).map((m) => {
    const copy = c.missions[m.id as keyof typeof c.missions];
    const labels = copy.criteria as Record<string, string>;
    return {
      id: m.id,
      title: copy.title,
      hint: copy.hint,
      from: copy.from,
      brief: copy.brief,
      done: doneIds.has(m.id),
      criteria: m.criteria.map((cr) => ({ id: cr.id, label: labels[cr.id] ?? cr.id, met: cr.check(state) })),
    };
  });

  // Kết quả bàn giao: những lệnh vừa gõ, kèm trạng thái Git / Docker nếu có -
  // đúng thứ người ta dán vào ticket để báo "đã làm".
  const renderArtifact = () => {
    const r = t.revampTools.terminal;
    const recent = state.history.slice(-ARTIFACT_COMMANDS);
    return (
      <div className="space-y-2">
        <p className="text-[11px] font-bold text-ink-muted">{r.commands}</p>
        <div className="rounded-md bg-stone-950 px-2.5 py-2 font-mono text-[11px] leading-relaxed text-stone-100">
          {recent.length === 0 ? (
            <p className="text-stone-500">{r.empty}</p>
          ) : (
            recent.map((cmd, i) => (
              <p key={i} className="break-all">
                <span className="text-emerald-400">$ </span>
                {cmd}
              </p>
            ))
          )}
        </div>
        {repo && (
          <p className="flex items-center gap-1.5 font-mono text-[11px] text-ink">
            <GitBranch className="h-3.5 w-3.5 text-accent" />
            {format(r.branch, { branch: repo.head })} · {format(r.commits, { count: Object.keys(repo.commits).length })}
          </p>
        )}
        {running.length > 0 && (
          <div>
            <p className="text-[11px] font-bold text-ink-muted">{r.containers}</p>
            {running.map((x) => (
              <p key={x.id} className="flex items-center gap-1.5 font-mono text-[11px] text-ink">
                <Container className="h-3.5 w-3.5 text-accent" />
                {x.name} · {x.image} · {x.ports.map((p) => `${p.host}→${p.container}`).join(", ")}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderEntry = (entry: ScreenEntry, i: number) => {
    switch (entry.k) {
      case "welcome":
        return (
          <div key={i} className="mb-2 text-stone-400">
            <p>{c.welcome}</p>
            <p>{c.welcomeHelp}</p>
          </div>
        );
      case "prompt":
        return (
          <div key={i} className="whitespace-pre-wrap break-all">
            <Prompt path={entry.path} />
            <span className="text-stone-100">{entry.cmd}</span>
            {entry.interrupted && <span className="text-stone-400">{INTERRUPT_ECHO}</span>}
          </div>
        );
      case "out":
        return (
          <div key={i} className={`min-h-[1.35em] whitespace-pre-wrap break-all ${entry.line.err ? "text-red-300" : "text-stone-200"}`}>
            {entry.line.spans.map((s, j) => (
              <span key={j} className={s.c ? SPAN_CLASS[s.c] : undefined}>
                {s.t}
              </span>
            ))}
          </div>
        );
      case "options":
        return (
          <div key={i} className="flex flex-wrap gap-x-5 text-stone-200">
            {entry.items.map((o) => (
              <span key={o} className={o.endsWith("/") ? "font-bold text-sky-400" : undefined}>
                {o}
              </span>
            ))}
          </div>
        );
      case "notice":
        return (
          <div key={i} className="my-1 border-l-2 border-sky-500 bg-sky-500/10 px-3 py-1.5 font-sans text-[12.5px] leading-relaxed text-sky-100">
            {c.notices[entry.id]}
          </div>
        );
      case "help":
        return (
          <div key={i} className="my-1 text-stone-200">
            <p className="text-stone-400">{c.helpTitle}</p>
            {HELP_GROUPS.map((g) => (
              <div key={g.id} className="mt-2">
                <p className="font-bold text-amber-300">{c.groups[g.id]}</p>
                {g.items.map((it) => (
                  <div key={it.id} className="grid gap-x-4 sm:grid-cols-[minmax(0,19rem)_1fr]">
                    <span className="break-all text-emerald-300">{`  ${it.code}`}</span>
                    <span className="pl-4 font-sans text-[12.5px] text-stone-400 sm:pl-0">{c.commands[it.id as keyof typeof c.commands]}</span>
                  </div>
                ))}
              </div>
            ))}
            <p className="mt-2 text-stone-500">{c.helpFooter}</p>
          </div>
        );
    }
  };

  return (
    <ToolShell
      tool="terminal"
      missions={missions}
      onReset={onReset}
      ready={loaded}
      errorKey={errorKey}
      renderArtifact={renderArtifact}
      embed={embed}
    >
      <div className="space-y-3">
        <div className="overflow-hidden rounded-card border border-stone-800 bg-stone-950 shadow-card-hover ring-1 ring-brand-500/10">
          <div className="flex items-center gap-2 border-b border-stone-800 bg-stone-900 px-3 py-2">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </span>
            <p className="min-w-0 flex-1 truncate text-center font-mono text-xs text-stone-400">
              {`${PROMPT_USER}: ${path}`}
            </p>
            <button
              type="button"
              onClick={showHelp}
              title={c.helpButton}
              aria-label={c.helpButton}
              className="rounded-md p-1 text-stone-400 hover:bg-stone-800 hover:text-stone-100"
            >
              <BookOpen className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => push([], true)}
              title={c.clearButton}
              aria-label={c.clearButton}
              className="rounded-md p-1 text-stone-400 hover:bg-stone-800 hover:text-stone-100"
            >
              <Eraser className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={scrollRef}
            onClick={focusInput}
            className={`${embedded ? "h-[300px]" : "h-[420px] sm:h-[520px]"} cursor-text overflow-y-auto px-3 py-3 font-mono text-[12.5px] leading-[1.35] sm:text-[13px]`}
          >
            {screen.map(renderEntry)}
            <div className="flex items-start">
              <span className="shrink-0 whitespace-pre">
                <Prompt path={path} />
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  histIndex.current = null;
                }}
                onKeyDown={onKeyDown}
                aria-label={c.inputLabel}
                autoFocus={!embedded}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent p-0 font-mono text-stone-100 caret-emerald-400 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-stone-800 bg-stone-900 px-3 py-1.5 font-mono text-[11px] text-stone-400">
            {repo && (
              <span className="inline-flex items-center gap-1 text-fuchsia-300">
                <GitBranch className="h-3.5 w-3.5" />
                {repo.head}
              </span>
            )}
            <span className="inline-flex min-w-0 items-center gap-1" title={c.containersTitle}>
              <Container className="h-3.5 w-3.5 shrink-0" />
              {running.length ? (
                <span className="truncate text-emerald-300">
                  {running.map((x) => `${x.name}${x.ports.length ? ` (${x.ports.map((p) => `:${p.host}`).join(", ")})` : ""}`).join("  ")}
                </span>
              ) : (
                <span className="font-sans">{c.containersEmpty}</span>
              )}
            </span>
          </div>
        </div>

        {!embedded && <div className={panel}>
          <button
            type="button"
            onClick={() => setCheatOpen((v) => !v)}
            aria-expanded={cheatOpen}
            className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
          >
            <span className="flex items-center gap-2.5">
              <IconTile className="h-7 w-7">
                <BookOpen className="h-3.5 w-3.5" />
              </IconTile>
              <span className="text-sm font-black text-ink">{c.cheatTitle}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-accent-strong">
              {cheatOpen ? c.cheatHide : c.cheatShow}
              <ChevronDown className={`h-4 w-4 transition-transform ${cheatOpen ? "rotate-180" : ""}`} />
            </span>
          </button>
          {cheatOpen && (
            <div className="border-t border-line-soft px-4 pb-4 pt-3">
              <p className="mb-3 text-xs text-ink-muted">{c.cheatTryHint}</p>
              <div className="grid gap-4 md:grid-cols-2">
                {HELP_GROUPS.map((g) => (
                  <div key={g.id}>
                    <p className="mb-1.5 text-xs font-black uppercase tracking-wider text-accent">{c.groups[g.id]}</p>
                    <ul className="space-y-1">
                      {g.items.map((it) => (
                        <li key={it.id}>
                          <button
                            type="button"
                            onClick={() => insertCommand(it.code)}
                            className="group w-full rounded-control px-2 py-1 text-left transition-colors hover:bg-accent-wash"
                          >
                            <code className="block break-all font-mono text-[12px] font-bold text-ink group-hover:text-accent">{it.code}</code>
                            <span className="block text-xs text-ink-muted">{c.commands[it.id as keyof typeof c.commands]}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>}
      </div>
    </ToolShell>
  );
}
