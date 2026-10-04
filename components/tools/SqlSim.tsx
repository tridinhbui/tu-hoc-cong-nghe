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
  RotateCcw,
  Rows3,
  Table2,
  Trash2,
  XCircle,
} from "lucide-react";
import ToolShell, { btnRun, embedMissions, type ToolEmbed } from "@/components/tools/ToolShell";
import { chipAccent, panel } from "@/components/ui/system";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import type { SqlValue } from "@/lib/mini-sql";
import { execute, type ExecOutcome, type StatementInfo } from "@/lib/tools/sql/engine";
import { SAMPLE_SCHEMA } from "@/lib/tools/sql/sample-db";
import { SQL_MISSIONS } from "@/lib/tools/sql/missions";
import {
  createSession,
  deserializeSession,
  missionState,
  runSql,
  serializeSession,
  type SqlSession,
} from "@/lib/tools/sql/session";
import { TOOL_STORAGE } from "@/lib/tools/progress";

const KEY_PREFIX = TOOL_STORAGE.sqlPrefix;
const DONE_KEY = `${KEY_PREFIX}done`;
const HISTORY_KEY = `${KEY_PREFIX}history`;
const DRAFT_KEY = `${KEY_PREFIX}draft`;
const ARTIFACT_KEY = `${KEY_PREFIX}artifacts`;
/** Cơ sở dữ liệu của phiên (dòng dữ liệu, chỉ mục, giao dịch đang mở). Khoá mới: tiến độ cũ không đổi. */
const SESSION_KEY = `${KEY_PREFIX}session`;
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
  const [session, setSession] = useState<SqlSession>(createSession);
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
    // Phiên hỏng hoặc từ phiên bản cũ (chưa có khoá này) → bắt đầu lại từ dữ liệu mẫu.
    const saved = deserializeSession(readJson<unknown>(SESSION_KEY, null));
    if (saved) setSession(saved);
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
  useEffect(() => {
    if (loaded && !embedded) writeJson(SESSION_KEY, serializeSession(session));
  }, [session, loaded, embedded]);

  const run = useCallback(
    (text: string) => {
      const query = text.trim();
      if (!query) return;
      // Chạy trên bản sao của phiên: câu ghi dữ liệu có hiệu lực, SAMPLE_DB thì không bao giờ bị đụng.
      const { session: next, outcome: result } = runSql(session, query);
      setSession(next);
      setOutcome(result);
      setTab("results");
      const last = result.statements?.[result.statements.length - 1];
      const count = result.ok ? (last?.affected ?? result.result.rows.length) : undefined;
      setHistory((h) => [{ sql: query, ok: result.ok, rows: count, at: Date.now() }, ...h].slice(0, HISTORY_LIMIT));
      if (result.ok) {
        const state = missionState(next, result);
        const newly = SQL_MISSIONS.filter((m) => !done.includes(m.id) && m.check(state));
        if (newly.length) {
          setDone((d) => [...d, ...newly.map((m) => m.id).filter((id) => !d.includes(id))]);
          const own: SqlArtifact = {
            sql: query,
            columns: result.result.columns,
            rows: result.result.rows.slice(0, ARTIFACT_ROWS),
            total: result.result.rows.length,
          };
          // Nhiệm vụ ghi dữ liệu bàn giao bảng SAU thay đổi, không phải kết quả rỗng của câu ghi.
          const made = Object.fromEntries(
            newly.map((m) => {
              const shown = m.artifact ? execute(next.db, m.artifact) : null;
              const a: SqlArtifact =
                shown?.ok
                  ? { sql: query, columns: shown.result.columns, rows: shown.result.rows.slice(0, ARTIFACT_ROWS), total: shown.result.rows.length }
                  : own;
              return [m.id, a];
            }),
          );
          setArtifacts((a) => ({ ...a, ...made }));
        }
      } else {
        setErrorKey((k) => k + 1);
      }
    },
    [done, session],
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

  /** Chỉ đưa dữ liệu về ban đầu - tiến độ nhiệm vụ, lịch sử giữ nguyên. */
  const restoreData = () => {
    setSession(createSession());
    setOutcome(null);
  };

  const reset = () => {
    setSession(createSession());
    setDone([]);
    setHistory([]);
    setSql(STARTER_SQL);
    setOutcome(null);
    setArtifacts({});
  };

  // Tiêu chí đọc lần chạy gần nhất: lỗi thì chưa có kết quả nào để chấm.
  const current = missionState(session, outcome);
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
        <div className="overflow-hidden rounded-control border border-line-soft">
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
      <div className={`${panel} overflow-hidden`}>
        {/* Thanh công cụ */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-soft bg-surface-raised px-3 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span aria-hidden className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-control bg-accent-wash text-accent">
              <DatabaseIcon className="h-4 w-4" />
            </span>
            <span className="font-mono text-sm font-bold text-ink">{c.dbName}</span>
            <span className="truncate text-xs text-ink-muted">{c.dbLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            {session.tx && (
              <span className="inline-flex items-center gap-1 rounded-full border border-warn-line bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-warn-ink dark:bg-amber-950/30">
                <AlertTriangle className="h-3 w-3" />
                {c.inTransaction}
              </span>
            )}
            <span className="hidden font-mono text-[11px] text-ink-faint sm:inline">{c.runShortcut}</span>
            <button
              type="button"
              onClick={restoreData}
              title={c.restoreDataHint}
              aria-label={c.restoreData}
              className="inline-flex h-8 items-center gap-1.5 rounded-control border border-accent-line bg-surface px-2.5 text-xs font-bold text-ink-muted transition-colors hover:bg-accent-wash hover:text-accent-strong"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{c.restoreData}</span>
            </button>
            <button
              type="button"
              onClick={() => setSql("")}
              title={c.clear}
              aria-label={c.clear}
              className="inline-flex h-8 w-8 items-center justify-center rounded-control border border-accent-line bg-surface text-ink-muted transition-colors hover:bg-accent-wash hover:text-accent-strong"
            >
              <Eraser className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => run(sql)}
              className={`${btnRun} h-8 px-3.5`}
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              {c.run}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-[220px_minmax(0,1fr)]">
          {/* Cây bảng */}
          <aside className="max-h-64 overflow-y-auto border-b border-line-soft bg-surface-raised/50 p-2 md:max-h-none md:border-b-0 md:border-r">
            <p className="px-1.5 pb-1 text-[11px] font-black uppercase tracking-wider text-ink-muted">{c.explorer}</p>
            <ul className="space-y-0.5">
              {SAMPLE_SCHEMA.map((table) => {
                const isOpen = !!open[table.name];
                return (
                  <li key={table.name}>
                    <div className="flex items-center rounded-control transition-colors hover:bg-accent-wash">
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
                          {format(c.rowsInTable, { count: session.db[table.name].rows.length })}
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
                              className="flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left hover:bg-accent-wash"
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
                        {session.indexes
                          .filter((ix) => ix.table === table.name)
                          .map((ix) => (
                            <li key={ix.name} className="flex items-center gap-1.5 px-1 py-0.5" title={`${ix.name} (${ix.columns.join(", ")})`}>
                              <span className="h-3 w-3 shrink-0 text-center font-mono text-[9px] font-bold text-emerald-600">i</span>
                              <span className="truncate font-mono text-xs text-ink-muted">{ix.name}</span>
                              <span className="ml-auto shrink-0 font-mono text-[10px] text-ink-faint">{c.indexesLabel}</span>
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
            <div className="flex items-center justify-between border-y border-line-soft bg-surface-raised px-2">
              <div className="flex" role="tablist">
                {(["results", "history"] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    role="tab"
                    aria-selected={tab === k}
                    onClick={() => setTab(k)}
                    className={`inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-bold ${
                      tab === k ? "border-brand-600 text-accent-strong dark:border-brand-400" : "border-transparent text-ink-muted hover:text-accent-strong"
                    }`}
                  >
                    {k === "results" ? <Rows3 className="h-3.5 w-3.5" /> : <History className="h-3.5 w-3.5" />}
                    {k === "results" ? c.tabResults : c.tabHistory}
                    {k === "history" && history.length > 0 && (
                      <span className={`${chipAccent} px-1.5 py-0 text-[10px] tabular-nums`}>
                        {history.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {tab === "results" && outcome && (
                <div className="flex items-center gap-3 text-[11px] tabular-nums text-ink-muted">
                  {outcome.ok && isTableResult(outcome) && <span>{format(c.rowCount, { count: outcome.result.rows.length })}</span>}
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

/** Câu cuối cùng trả về một bảng (SELECT, EXPLAIN) chứ không phải một số dòng bị tác động. */
function isTableResult(outcome: ExecOutcome): boolean {
  const last = outcome.statements?.[outcome.statements.length - 1];
  return !last || last.kind === "select" || last.kind === "explain";
}

function StatementSummary({ statements }: { statements: StatementInfo[] }) {
  const { t } = useI18n();
  const c = t.toolSql;
  // Câu SELECT/EXPLAIN đã có bảng kết quả ngay bên dưới, không cần dòng tóm tắt.
  const shown = statements.filter((st) => st.kind !== "select" && st.kind !== "explain");
  if (shown.length === 0) return null;
  return (
    <ul className="m-3 space-y-1.5">
      {shown.map((st, i) => (
        <li
          key={i}
          className={`flex flex-wrap items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold ${
            st.noWhere && (st.affected ?? 0) > 0
              ? "border-warn-line bg-amber-50 text-warn-ink dark:bg-amber-950/30"
              : "border-accent-line bg-accent-wash text-accent-strong"
          }`}
        >
          <span className="tabular-nums">
            {format(c.statementDone[st.kind], {
              count: st.affected ?? 0,
              table: st.table ?? "",
              name: st.name ?? "",
            })}
          </span>
          {st.noWhere && (
            <span className="rounded-full bg-amber-200 px-2 py-0.5 text-[11px] font-black uppercase tracking-wide text-amber-900 dark:bg-amber-900/60 dark:text-amber-100">
              {c.noWhereBadge}
            </span>
          )}
        </li>
      ))}
    </ul>
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
        {(outcome.statements?.length ?? 0) > 0 && (
          <p className="mt-2 text-xs font-semibold text-warn-ink">
            {format(c.appliedBefore, { count: outcome.statements?.length ?? 0 })}
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
      <StatementSummary statements={outcome.statements ?? []} />
      {!isTableResult(outcome) ? null : result.rows.length === 0 ? (
        <>
          <ResultTable columns={result.columns} rows={[]} />
          <p className="p-4 text-sm text-ink-muted">{c.emptyResult}</p>
        </>
      ) : (
        <ResultTable columns={result.columns} rows={result.rows} />
      )}
      {outcome.statements?.[outcome.statements.length - 1]?.kind === "explain" && (
        <p className="border-t border-line-soft p-3 text-xs leading-relaxed text-ink-muted">{c.planNote}</p>
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
