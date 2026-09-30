"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Clock,
  Database as DatabaseIcon,
  Eraser,
  History,
  KeyRound,
  Link2,
  Play,
  Rows3,
  Table2,
  Trash2,
  XCircle,
} from "lucide-react";
import ToolShell, { embedMissions, type ToolEmbed } from "@/components/tools/ToolShell";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import type { SqlValue } from "@/lib/mini-sql";
import { execute, type ExecOutcome } from "@/lib/tools/sql/engine";
import { SAMPLE_DB, SAMPLE_SCHEMA } from "@/lib/tools/sql/sample-db";
import { SQL_MISSIONS } from "@/lib/tools/sql/missions";
import { TOOL_STORAGE } from "@/lib/tools/progress";

const KEY_PREFIX = TOOL_STORAGE.sqlPrefix;
const DONE_KEY = `${KEY_PREFIX}done`;
const HISTORY_KEY = `${KEY_PREFIX}history`;
const DRAFT_KEY = `${KEY_PREFIX}draft`;
const ARTIFACT_KEY = `${KEY_PREFIX}artifacts`;
/** Số dòng tối đa cất lại cho mỗi kết quả bàn giao. */
const ARTIFACT_ROWS = 10;
const HISTORY_LIMIT = 30;
const STARTER_SQL = "SELECT * FROM customers LIMIT 10;";

interface HistoryEntry {
  sql: string;
  ok: boolean;
  rows?: number;
  at: number;
}

/** Bảng kết quả của lần chạy đã đóng một ticket - "artifact" để bàn giao. */
interface SqlArtifact {
  sql: string;
  columns: string[];
  rows: SqlValue[][];
  total: number;
}

type MissionCopy = Record<
  string,
  { title: string; hint: string; from: string; brief: string; criteria: Record<string, string> }
>;

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Trình duyệt chặn bộ nhớ (chế độ riêng tư): công cụ vẫn chạy, chỉ không nhớ tiến độ.
  }
}

export default function SqlSim({ embed }: { embed?: ToolEmbed }) {
  const embedded = !!embed;
  const { t, locale } = useI18n();
  const c = t.toolSql;
  const r = t.revampTools.sql;
  const missionCopy = c.missions as MissionCopy;

  const [sql, setSql] = useState(STARTER_SQL);
  const [outcome, setOutcome] = useState<ExecOutcome | null>(null);
  const [tab, setTab] = useState<"results" | "history">("results");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const [artifacts, setArtifacts] = useState<Record<string, SqlArtifact>>({});
  const [errorKey, setErrorKey] = useState(0);
  const [open, setOpen] = useState<Record<string, boolean>>({ customers: true });
  const [loaded, setLoaded] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (embedded) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- bản nhúng bắt đầu từ trạng thái mới, không đọc tiến độ của /cong-cu
      setLoaded(true);
      return;
    }
    setDone(readJson<string[]>(DONE_KEY, []));
    setHistory(readJson<HistoryEntry[]>(HISTORY_KEY, []));
    setSql(readJson<string>(DRAFT_KEY, STARTER_SQL));
    setArtifacts(readJson<Record<string, SqlArtifact>>(ARTIFACT_KEY, {}));
    setLoaded(true);
  }, [embedded]);

  useEffect(() => {
    if (loaded && !embedded) writeJson(DONE_KEY, done);
  }, [done, loaded, embedded]);
  useEffect(() => {
    if (loaded && !embedded) writeJson(HISTORY_KEY, history);
  }, [history, loaded, embedded]);
  useEffect(() => {
    if (loaded && !embedded) writeJson(DRAFT_KEY, sql);
  }, [sql, loaded, embedded]);
  useEffect(() => {
    if (loaded && !embedded) writeJson(ARTIFACT_KEY, artifacts);
  }, [artifacts, loaded, embedded]);

  const run = useCallback(
    (text: string) => {
      const query = text.trim();
      if (!query) return;
      const result = execute(SAMPLE_DB, query);
      setOutcome(result);
      setTab("results");
      setHistory((h) =>
        [{ sql: query, ok: result.ok, rows: result.ok ? result.result.rows.length : undefined, at: Date.now() }, ...h].slice(
          0,
          HISTORY_LIMIT,
        ),
      );
      if (result.ok) {
        const newly = SQL_MISSIONS.filter((m) => !done.includes(m.id) && m.check({ result: result.result })).map((m) => m.id);
        if (newly.length) {
          setDone((d) => [...d, ...newly.filter((id) => !d.includes(id))]);
          const artifact: SqlArtifact = {
            sql: query,
            columns: result.result.columns,
            rows: result.result.rows.slice(0, ARTIFACT_ROWS),
            total: result.result.rows.length,
          };
          setArtifacts((a) => ({ ...a, ...Object.fromEntries(newly.map((id) => [id, artifact])) }));
        }
      } else {
        setErrorKey((k) => k + 1);
      }
    },
    [done],
  );

  const insertAtCursor = (text: string) => {
    const el = editorRef.current;
    if (!el) {
      setSql((s) => s + text);
      return;
    }
    const start = el.selectionStart ?? sql.length;
    const end = el.selectionEnd ?? sql.length;
    const next = sql.slice(0, start) + text + sql.slice(end);
    setSql(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + text.length, start + text.length);
    });
  };

  const previewTable = (name: string) => {
    const query = `SELECT * FROM ${name} LIMIT 10;`;
    setSql(query);
    run(query);
    editorRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      run(sql);
      return;
    }
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      insertAtCursor("  ");
    }
  };

  const reset = () => {
    setDone([]);
    setHistory([]);
    setSql(STARTER_SQL);
    setOutcome(null);
    setArtifacts({});
  };

  // Tiêu chí đọc lần chạy gần nhất: lỗi thì chưa có kết quả nào để chấm.
  const current = { result: outcome?.ok ? outcome.result : null };
  const missions = embedMissions(SQL_MISSIONS, embed).map((m) => {
    const copy = missionCopy[m.id];
    return {
      id: m.id,
      title: copy?.title ?? m.id,
      hint: copy?.hint ?? "",
      from: copy?.from,
      brief: copy?.brief,
      done: done.includes(m.id),
      criteria: m.criteria.map((cr) => ({
        id: cr.id,
        label:
          cr.id === "runs" ? r.runs : cr.id === "rows" ? format(r.rows, { n: m.expectedRowCount() }) : (copy?.criteria[cr.id] ?? cr.id),
        met: cr.check(current),
      })),
    };
  });

  const renderArtifact = (id: string) => {
    const a = artifacts[id];
    if (!a) return <p className="text-xs text-ink-muted">{r.missing}</p>;
    return (
      <div className="space-y-2">
        <pre className="max-h-24 overflow-auto whitespace-pre-wrap rounded-md bg-stone-950 px-2.5 py-2 font-mono text-[11px] leading-relaxed text-stone-100">
          {a.sql}
        </pre>
        <div className="overflow-hidden rounded-md border border-line">
          <ResultTable columns={a.columns} rows={a.rows} compact />
        </div>
        <p className="text-[11px] tabular-nums text-ink-muted">
          {format(r.rowCount, { count: a.total })}
          {a.total > a.rows.length && <> {format(r.more, { count: a.total - a.rows.length })}</>}
        </p>
      </div>
    );
  };

  const lineCount = Math.max(sql.split("\n").length, 1);
  const timeFmt = useMemo(
    () => new Intl.DateTimeFormat(intlLocale(locale), { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    [locale],
  );

  return (
    <ToolShell
      tool="sql"
      missions={missions}
      onReset={reset}
      ready={loaded}
      errorKey={errorKey}
      renderArtifact={renderArtifact}
      embed={embed}
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm dark:bg-stone-900">
        {/* Thanh công cụ */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-raised px-3 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <DatabaseIcon className="h-4 w-4 shrink-0 text-accent" />
            <span className="font-mono text-sm font-bold text-ink">{c.dbName}</span>
            <span className="truncate text-xs text-ink-muted">{c.dbLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden font-mono text-[11px] text-ink-faint sm:inline">{c.runShortcut}</span>
            <button
              type="button"
              onClick={() => setSql("")}
              title={c.clear}
              aria-label={c.clear}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink-muted hover:text-ink"
            >
              <Eraser className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => run(sql)}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-brand-600 px-3 text-sm font-bold text-white hover:bg-brand-700"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              {c.run}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-[220px_minmax(0,1fr)]">
          {/* Cây bảng */}
          <aside className="max-h-64 overflow-y-auto border-b border-line p-2 md:max-h-none md:border-b-0 md:border-r">
            <p className="px-1.5 pb-1 text-[11px] font-black uppercase tracking-wider text-ink-muted">{c.explorer}</p>
            <ul className="space-y-0.5">
              {SAMPLE_SCHEMA.map((table) => {
                const isOpen = !!open[table.name];
                return (
                  <li key={table.name}>
                    <div className="flex items-center rounded-md hover:bg-surface-raised">
                      <button
                        type="button"
                        onClick={() => setOpen((o) => ({ ...o, [table.name]: !isOpen }))}
                        aria-expanded={isOpen}
                        aria-label={table.name}
                        className="p-1 text-ink-faint hover:text-ink"
                      >
                        {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => previewTable(table.name)}
                        className="flex min-w-0 flex-1 items-center gap-1.5 py-1 pr-1.5 text-left"
                      >
                        <Table2 className="h-3.5 w-3.5 shrink-0 text-accent" />
                        <span className="truncate font-mono text-[13px] font-semibold text-ink">{table.name}</span>
                        <span className="ml-auto shrink-0 text-[10px] tabular-nums text-ink-faint">
                          {format(c.rowsInTable, { count: SAMPLE_DB[table.name].rows.length })}
                        </span>
                      </button>
                    </div>
                    {isOpen && (
                      <ul className="mb-1 ml-5 border-l border-line pl-2">
                        {table.columns.map((col) => (
                          <li key={col.name}>
                            <button
                              type="button"
                              onClick={() => insertAtCursor(col.name)}
                              title={
                                col.key === "pk"
                                  ? c.primaryKey
                                  : col.key === "fk"
                                    ? format(c.foreignKey, { table: col.ref ?? "" })
                                    : undefined
                              }
                              className="flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left hover:bg-surface-raised"
                            >
                              {col.key === "pk" ? (
                                <KeyRound className="h-3 w-3 shrink-0 text-amber-500" />
                              ) : col.key === "fk" ? (
                                <Link2 className="h-3 w-3 shrink-0 text-accent" />
                              ) : (
                                <span className="h-3 w-3 shrink-0" />
                              )}
                              <span className="truncate font-mono text-xs text-ink">{col.name}</span>
                              <span className="ml-auto shrink-0 font-mono text-[10px] text-ink-faint">{col.type}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-2 px-1.5 text-[11px] leading-relaxed text-ink-faint">{c.explorerHint}</p>
          </aside>

          <div className="min-w-0">
            {/* Trình soạn câu lệnh */}
            <label htmlFor="sql-editor" className="sr-only">
              {c.editorLabel}
            </label>
            <div className="flex bg-stone-950 font-mono text-[13px] leading-6">
              <div
                ref={gutterRef}
                aria-hidden="true"
                className="h-44 select-none overflow-hidden border-r border-stone-800 px-2 py-2 text-right text-stone-600"
              >
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                id="sql-editor"
                ref={editorRef}
                value={sql}
                onChange={(e) => setSql(e.target.value)}
                onKeyDown={onKeyDown}
                onScroll={(e) => {
                  if (gutterRef.current) gutterRef.current.scrollTop = e.currentTarget.scrollTop;
                }}
                placeholder={c.placeholder}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                className="h-44 min-w-0 flex-1 resize-none bg-transparent px-3 py-2 text-stone-100 caret-brand-400 outline-none placeholder:text-stone-600"
              />
            </div>

            {/* Tab kết quả / lịch sử */}
            <div className="flex items-center justify-between border-y border-line bg-surface-raised px-2">
              <div className="flex" role="tablist">
                {(["results", "history"] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    role="tab"
                    aria-selected={tab === k}
                    onClick={() => setTab(k)}
                    className={`inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-bold ${
                      tab === k ? "border-brand-600 text-ink" : "border-transparent text-ink-muted hover:text-ink"
                    }`}
                  >
                    {k === "results" ? <Rows3 className="h-3.5 w-3.5" /> : <History className="h-3.5 w-3.5" />}
                    {k === "results" ? c.tabResults : c.tabHistory}
                    {k === "history" && history.length > 0 && (
                      <span className="rounded-full bg-brand-100 px-1.5 text-[10px] tabular-nums text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                        {history.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {tab === "results" && outcome && (
                <div className="flex items-center gap-3 text-[11px] tabular-nums text-ink-muted">
                  {outcome.ok && <span>{format(c.rowCount, { count: outcome.result.rows.length })}</span>}
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {format(c.elapsed, { ms: outcome.ms.toFixed(1) })}
                  </span>
                </div>
              )}
              {tab === "history" && history.length > 0 && (
                <button
                  type="button"
                  onClick={() => setHistory([])}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-ink-muted hover:text-ink"
                >
                  <Trash2 className="h-3 w-3" />
                  {c.clearHistory}
                </button>
              )}
            </div>

            <div className="min-h-[220px]">
              {tab === "results" ? (
                <ResultsPanel outcome={outcome} />
              ) : history.length === 0 ? (
                <p className="p-4 text-sm text-ink-muted">{c.historyEmpty}</p>
              ) : (
                <ul className="max-h-[360px] divide-y divide-line overflow-y-auto">
                  {history.map((h, i) => (
                    <li key={`${h.at}-${i}`}>
                      <button
                        type="button"
                        onClick={() => {
                          setSql(h.sql);
                          editorRef.current?.focus();
                        }}
                        className="flex w-full items-start gap-2 px-3 py-2 text-left hover:bg-surface-raised"
                      >
                        {h.ok ? (
                          <Play className="mt-0.5 h-3 w-3 shrink-0 fill-current text-accent" />
                        ) : (
                          <XCircle className="mt-0.5 h-3 w-3 shrink-0 text-red-500" />
                        )}
                        <code className="min-w-0 flex-1 truncate font-mono text-xs text-ink">{h.sql}</code>
                        <span className="shrink-0 text-[10px] tabular-nums text-ink-faint">
                          {h.ok ? format(c.rowCount, { count: h.rows ?? 0 }) : c.historyError} · {timeFmt.format(h.at)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}

function ResultsPanel({ outcome }: { outcome: ExecOutcome | null }) {
  const { t } = useI18n();
  const c = t.toolSql;

  if (!outcome) return <p className="p-4 text-sm text-ink-muted">{c.notRunYet}</p>;

  if (!outcome.ok) {
    const { error } = outcome;
    return (
      <div className="m-3 rounded-xl border border-danger-line bg-red-50 p-3 dark:bg-red-950/30">
        <p className="flex items-center gap-1.5 text-sm font-bold text-danger">
          <XCircle className="h-4 w-4" />
          {c.errorTitle}
        </p>
        <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-ink-muted">{c.engineSays}</p>
        <pre className="mt-1 whitespace-pre-wrap rounded-lg bg-stone-950 px-3 py-2 font-mono text-xs text-red-300">
          {error.message}
        </pre>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          {format(c.errorHints[error.kind], { name: error.name ?? "" })}
        </p>
        {error.suggestion && (
          <p className="mt-1 text-sm font-semibold text-ink">
            {format(c.suggestion, { name: error.suggestion })}
          </p>
        )}
      </div>
    );
  }

  const { result, warnings } = outcome;
  return (
    <div>
      {warnings.length > 0 && (
        <div className="m-3 rounded-xl border border-warn-line bg-amber-50 p-3 dark:bg-amber-950/30">
          <p className="flex items-center gap-1.5 text-sm font-bold text-warn-ink">
            <AlertTriangle className="h-4 w-4" />
            {c.warningTitle}
          </p>
          {warnings.map((w) => (
            <p key={w} className="mt-1 text-sm leading-relaxed text-ink">
              {c.warnings[w]}
            </p>
          ))}
        </div>
      )}
      {result.rows.length === 0 ? (
        <>
          <ResultTable columns={result.columns} rows={[]} />
          <p className="p-4 text-sm text-ink-muted">{c.emptyResult}</p>
        </>
      ) : (
        <ResultTable columns={result.columns} rows={result.rows} />
      )}
    </div>
  );
}

function ResultTable({ columns, rows, compact = false }: { columns: string[]; rows: SqlValue[][]; compact?: boolean }) {
  const { t } = useI18n();
  const c = t.toolSql;
  return (
    <div className={`overflow-auto ${compact ? "max-h-56" : "max-h-[360px]"}`}>
      <table className={`w-full border-collapse font-mono ${compact ? "text-[11px]" : "text-xs"}`}>
        <thead>
          <tr>
            <th className="sticky top-0 z-10 w-10 border-b border-r border-line bg-surface-raised px-2 py-1.5 text-right font-semibold text-ink-faint">
              {c.rowNumber}
            </th>
            {columns.map((col, i) => (
              <th
                key={`${col}-${i}`}
                className="sticky top-0 z-10 whitespace-nowrap border-b border-r border-line bg-surface-raised px-3 py-1.5 text-left font-bold text-ink"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="even:bg-stone-50/60 hover:bg-brand-50/60 dark:even:bg-stone-800/30 dark:hover:bg-brand-950/30">
              <td className="border-b border-r border-line px-2 py-1 text-right tabular-nums text-ink-faint">{r + 1}</td>
              {row.map((v, i) => (
                <td
                  key={i}
                  className={`whitespace-nowrap border-b border-r border-line px-3 py-1 ${
                    typeof v === "number" ? "text-right tabular-nums text-ink" : "text-ink"
                  }`}
                >
                  {v === null ? <span className="italic text-ink-faint">{c.nullValue}</span> : String(v)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
