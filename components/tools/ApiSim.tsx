"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, ChevronDown, Clock, Folder, KeyRound, Loader2, Plus, Send, Trash2, WandSparkles, X } from "lucide-react";
import ToolShell from "@/components/tools/ToolShell";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import {
  METHODS,
  createApiState,
  formatBytes,
  jsonError,
  paramsFromUrl,
  prettyJson,
  sendRequest,
  statusClass,
  tokenizeJson,
  urlWithParams,
  type ApiResult,
  type ApiState,
  type HistoryEntry,
  type HttpMethod,
  type JsonTokenType,
  type SentRequest,
} from "@/lib/tools/api/engine";
import { API_MISSIONS } from "@/lib/tools/api/missions";
import {
  COLLECTION,
  autoHeaders,
  bodyFor,
  buildHeaders,
  emptyDraft,
  type RequestDraft,
} from "@/lib/tools/api/collection";

const STORAGE_KEY = "thtcdn:tool-api:state";

const METHOD_COLOR: Record<HttpMethod, string> = {
  GET: "text-brand-500",
  POST: "text-amber-500",
  PUT: "text-sky-500",
  PATCH: "text-violet-500",
  DELETE: "text-rose-500",
};

const TOKEN_COLOR: Record<JsonTokenType, string> = {
  key: "text-sky-300",
  string: "text-brand-300",
  number: "text-amber-300",
  literal: "text-violet-300",
  punct: "text-stone-500",
  plain: "text-stone-300",
};

const CHEAT_CODES = [200, 201, 204, 400, 401, 403, 404, 405, 415, 429, 500] as const;
type CheatKey = `c${(typeof CHEAT_CODES)[number]}`;

type ReqTab = "params" | "headers" | "body" | "auth";
type ResTab = "body" | "headers";

interface Persisted {
  api: ApiState;
  done: string[];
  draft: RequestDraft;
}

/** Đưa một yêu cầu đã gửi (trong Lịch sử) ngược về dạng bản nháp để sửa tiếp. */
function draftFromRequest(req: SentRequest): RequestDraft {
  const skip = new Set(["user-agent", "content-type", "authorization"]);
  const lower = Object.fromEntries(Object.entries(req.headers).map(([k, v]) => [k.toLowerCase(), v]));
  const auth = lower["authorization"];
  const bearer = auth ? /^Bearer\s*(.*)$/i.exec(auth) : null;
  const ct = lower["content-type"] ?? "";
  return {
    method: req.method,
    url: req.url,
    headers: Object.entries(req.headers)
      .filter(([k]) => !skip.has(k.toLowerCase()))
      .map(([key, value]) => ({ key, value, enabled: true })),
    bodyMode: req.body ? (/json/i.test(ct) ? "json" : "text") : "none",
    body: req.body,
    authMode: bearer ? "bearer" : "none",
    token: bearer ? bearer[1] : "",
  };
}

function statusTone(status: number): string {
  const c = statusClass(status);
  if (c === "success") return "bg-brand-500/15 text-accent";
  if (c === "client") return "bg-amber-500/15 text-warn";
  if (c === "server") return "bg-red-500/15 text-danger";
  return "bg-surface-raised text-ink-muted";
}

export default function ApiSim() {
  const { t } = useI18n();
  const c = t.toolApi;

  const [api, setApi] = useState<ApiState>(createApiState);
  const [draft, setDraft] = useState<RequestDraft>(emptyDraft);
  const [done, setDone] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [sending, setSending] = useState(false);
  const [reqTab, setReqTab] = useState<ReqTab>("params");
  const [resTab, setResTab] = useState<ResTab>("body");
  const [sideTab, setSideTab] = useState<"collection" | "history">("collection");
  const [methodOpen, setMethodOpen] = useState(false);
  const [pendingValue, setPendingValue] = useState("");
  const [tokenApplied, setTokenApplied] = useState(false);
  const generation = useRef(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Persisted>;
        if (saved.api && Array.isArray(saved.api.products) && Array.isArray(saved.api.history)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- khôi phục tiến độ đã lưu trong localStorage sau khi mount
          setApi(saved.api);
        }
        if (Array.isArray(saved.done)) setDone(saved.done);
        if (saved.draft && typeof saved.draft.url === "string") setDraft(saved.draft);
      }
    } catch {
      // localStorage bị chặn hoặc dữ liệu hỏng: bắt đầu từ trạng thái mới.
    }
    setLoaded(true);
  }, []);

  const liveDone = useMemo(() => API_MISSIONS.filter((m) => m.check(api)).map((m) => m.id as string), [api]);
  const allDone = useMemo(() => Array.from(new Set([...done, ...liveDone])), [done, liveDone]);

  useEffect(() => {
    if (!loaded) return;
    try {
      const payload: Persisted = { api, done: allDone, draft };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Không lưu được thì thôi - mô phỏng vẫn chạy trong phiên này.
    }
  }, [api, allDone, draft, loaded]);

  const missions = API_MISSIONS.map((m) => ({
    id: m.id,
    title: c.missions[m.id].title,
    hint: c.missions[m.id].hint,
    done: allDone.includes(m.id),
  }));

  const update = (patch: Partial<RequestDraft>) => setDraft((d) => ({ ...d, ...patch }));

  async function send() {
    if (sending || !draft.url.trim()) return;
    const req: SentRequest = {
      method: draft.method,
      url: draft.url.trim(),
      headers: buildHeaders(draft),
      body: bodyFor(draft),
    };
    const { state: next, result: res } = sendRequest(api, req, Date.now());
    const gen = ++generation.current;
    setSending(true);
    setTokenApplied(false);
    await new Promise((r) => setTimeout(r, res.timeMs));
    if (gen !== generation.current) return;
    setApi(next);
    setResult(res);
    setSending(false);
    setResTab("body");
  }

  function reset() {
    generation.current++;
    setApi(createApiState());
    setDraft(emptyDraft());
    setDone([]);
    setResult(null);
    setSending(false);
    setReqTab("params");
    setTokenApplied(false);
  }

  function loadDraft(d: RequestDraft) {
    setDraft({ ...d, headers: d.headers.map((h) => ({ ...h })) });
    setReqTab(d.bodyMode !== "none" ? "body" : d.authMode === "bearer" ? "auth" : "params");
    setMethodOpen(false);
  }

  // ---- Params (luôn khớp với URL)
  const params = paramsFromUrl(draft.url);
  const setParams = (next: [string, string][]) => update({ url: urlWithParams(draft.url, next) });

  // ---- Body
  const bodyError = draft.bodyMode === "json" ? jsonError(draft.body) : null;
  const canFormat = draft.bodyMode === "json" && draft.body.trim() !== "" && bodyError === null;

  const auto = autoHeaders(draft);

  // ---- Response
  const httpResult = result && result.kind === "http" ? result : null;
  const token = useMemo(() => {
    if (!httpResult || httpResult.status !== 200) return null;
    try {
      const parsed = JSON.parse(httpResult.body) as { token?: unknown };
      return typeof parsed.token === "string" ? parsed.token : null;
    } catch {
      return null;
    }
  }, [httpResult]);
  const pretty = httpResult ? prettyJson(httpResult.body) : "";
  const tokens = useMemo(() => tokenizeJson(pretty), [pretty]);
  const lineCount = pretty ? pretty.split("\n").length : 0;
  const cheatKey = httpResult ? (`c${httpResult.status}` as CheatKey) : null;
  const meaning = cheatKey && cheatKey in c.cheatSheet.codes ? c.cheatSheet.codes[cheatKey] : null;

  const history = [...api.history].reverse();

  const tabBtn = (active: boolean) =>
    `relative px-3 py-2 text-xs font-bold transition-colors ${
      active
        ? "text-ink after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:rounded-full after:bg-brand-600"
        : "text-ink-muted hover:text-ink"
    }`;

  const inputCls =
    "w-full min-w-0 rounded-md border border-line bg-white px-2 py-1.5 font-mono text-xs text-ink outline-none placeholder:text-ink-faint focus:border-brand-500 dark:bg-stone-950";

  return (
    <ToolShell tool="api" missions={missions} onReset={reset}>
      <div className="overflow-hidden rounded-2xl border border-line bg-white dark:bg-stone-900">
        <div className="grid md:grid-cols-[220px_minmax(0,1fr)]">
          {/* ------------------------------------------------ Sidebar */}
          <aside className="border-b border-line bg-stone-50 dark:bg-stone-950/40 md:border-b-0 md:border-r">
            <div className="flex border-b border-line">
              {(["collection", "history"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSideTab(tab)}
                  className={`flex flex-1 items-center justify-center gap-1.5 ${tabBtn(sideTab === tab)}`}
                >
                  {tab === "collection" ? <Folder className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                  {tab === "collection" ? c.sidebar.collection : c.sidebar.history}
                </button>
              ))}
            </div>
            <div className="max-h-56 overflow-y-auto p-2 md:max-h-[640px]">
              {sideTab === "collection" ? (
                <>
                  <p className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-bold text-ink">
                    <Folder className="h-3.5 w-3.5 text-accent" />
                    {c.sidebar.collectionName}
                  </p>
                  <ul className="space-y-0.5">
                    {COLLECTION.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => loadDraft(item.request)}
                          className="flex w-full items-center gap-2 rounded-md py-1.5 pl-4 pr-2 text-left text-xs text-ink-body hover:bg-surface-raised"
                        >
                          <span className={`w-11 shrink-0 font-mono text-[10px] font-black ${METHOD_COLOR[item.request.method]}`}>
                            {item.request.method}
                          </span>
                          <span className="truncate">{c.collection[item.id]}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : history.length === 0 ? (
                <p className="px-2 py-3 text-xs leading-relaxed text-ink-muted">{c.sidebar.emptyHistory}</p>
              ) : (
                <>
                  <ul className="space-y-0.5">
                    {history.map((h: HistoryEntry) => (
                      <li key={h.id}>
                        <button
                          type="button"
                          onClick={() => loadDraft(draftFromRequest(h.request))}
                          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs hover:bg-surface-raised"
                        >
                          <span className={`w-11 shrink-0 font-mono text-[10px] font-black ${METHOD_COLOR[h.request.method]}`}>
                            {h.request.method}
                          </span>
                          <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-ink-body">
                            {h.path ? h.request.url.replace(/^https?:\/\/[^/]+/, "") : h.request.url}
                          </span>
                          <span className={`shrink-0 rounded px-1 font-mono text-[10px] font-bold ${statusTone(h.status)}`}>
                            {h.status || c.sidebar.networkError}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => setApi((s) => ({ ...s, history: [] }))}
                    className="mt-2 inline-flex items-center gap-1 px-2 text-[11px] font-bold text-ink-muted hover:text-ink"
                  >
                    <Trash2 className="h-3 w-3" />
                    {c.sidebar.clearHistory}
                  </button>
                </>
              )}
            </div>
          </aside>

          {/* ------------------------------------------------ Main */}
          <div className="min-w-0">
            {/* URL bar */}
            <form
              className="flex flex-col gap-2 border-b border-line p-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
            >
              <div className="flex min-w-0 flex-1 rounded-lg border border-line bg-white focus-within:border-brand-500 dark:bg-stone-950">
                <div className="relative">
                  <button
                    type="button"
                    aria-label={c.request.methodLabel}
                    aria-expanded={methodOpen}
                    onClick={() => setMethodOpen((o) => !o)}
                    className={`flex h-full items-center gap-1 border-r border-line px-3 py-2 font-mono text-xs font-black ${METHOD_COLOR[draft.method]}`}
                  >
                    {draft.method}
                    <ChevronDown className="h-3.5 w-3.5 text-ink-muted" />
                  </button>
                  {methodOpen && (
                    <button type="button" aria-hidden tabIndex={-1} className="fixed inset-0 z-10 cursor-default" onClick={() => setMethodOpen(false)} />
                  )}
                  {methodOpen && (
                    <ul className="absolute left-0 top-full z-20 mt-1 w-32 overflow-hidden rounded-lg border border-line bg-white py-1 shadow-lg dark:bg-stone-900">
                      {METHODS.map((m) => (
                        <li key={m}>
                          <button
                            type="button"
                            onClick={() => {
                              update({ method: m });
                              setMethodOpen(false);
                            }}
                            className={`block w-full px-3 py-1.5 text-left font-mono text-xs font-black hover:bg-surface-raised ${METHOD_COLOR[m]}`}
                          >
                            {m}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <input
                  aria-label={c.request.urlLabel}
                  value={draft.url}
                  onChange={(e) => update({ url: e.target.value })}
                  placeholder={c.request.urlPlaceholder}
                  spellCheck={false}
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 font-mono text-xs text-ink outline-none placeholder:text-ink-faint"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-5 py-2 text-sm font-bold text-white hover:bg-brand-700 disabled:opacity-70"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {sending ? c.request.sending : c.request.send}
              </button>
            </form>

            {/* Request tabs */}
            <div className="flex overflow-x-auto border-b border-line px-1">
              {(["params", "headers", "body", "auth"] as const).map((tab) => {
                const count =
                  tab === "params"
                    ? params.length
                    : tab === "headers"
                      ? draft.headers.filter((h) => h.enabled && h.key.trim()).length + auto.length
                      : 0;
                return (
                  <button key={tab} type="button" onClick={() => setReqTab(tab)} className={tabBtn(reqTab === tab)}>
                    {c.request.tabs[tab]}
                    {count > 0 && <span className="ml-1 text-[10px] font-bold text-accent">{count}</span>}
                    {tab === "body" && draft.bodyMode !== "none" && draft.method !== "GET" && (
                      <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-500 align-middle" />
                    )}
                    {tab === "auth" && draft.authMode === "bearer" && (
                      <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-500 align-middle" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="min-h-[170px] p-3">
              {reqTab === "params" && (
                <div>
                  <p className="mb-2 text-[11px] leading-relaxed text-ink-muted">{c.request.paramsNote}</p>
                  <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_28px] gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">{c.request.key}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">{c.request.value}</span>
                    <span />
                    {params.map(([k, v], i) => (
                      <ParamRow
                        key={i}
                        k={k}
                        v={v}
                        inputCls={inputCls}
                        keyLabel={c.request.key}
                        valueLabel={c.request.value}
                        removeLabel={c.request.removeRow}
                        onKey={(nk) => setParams(params.map((p, j) => (j === i ? [nk, p[1]] : p)))}
                        onValue={(nv) => setParams(params.map((p, j) => (j === i ? [p[0], nv] : p)))}
                        onRemove={() => setParams(params.filter((_, j) => j !== i))}
                      />
                    ))}
                    <input
                      aria-label={c.request.newKey}
                      placeholder={c.request.newKey}
                      value=""
                      onChange={(e) => {
                        if (!e.target.value) return;
                        setParams([...params, [e.target.value, pendingValue]]);
                        setPendingValue("");
                      }}
                      className={inputCls}
                    />
                    <input
                      aria-label={c.request.newValue}
                      placeholder={c.request.newValue}
                      value={pendingValue}
                      onChange={(e) => setPendingValue(e.target.value)}
                      className={inputCls}
                    />
                    <span />
                  </div>
                </div>
              )}

              {reqTab === "headers" && (
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">{c.request.autoHeaders}</p>
                    <p className="mb-1.5 text-[11px] text-ink-muted">{c.request.autoHeadersNote}</p>
                    <div className="space-y-1">
                      {auto.map((h) => (
                        <div key={h.key} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-1.5 font-mono text-xs text-ink-muted">
                          <span className="truncate rounded-md bg-surface-raised px-2 py-1.5">{h.key}</span>
                          <span className="truncate rounded-md bg-surface-raised px-2 py-1.5">{h.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-faint">{c.request.customHeaders}</p>
                    <div className="space-y-1.5">
                      {draft.headers.map((h, i) => (
                        <div key={i} className="grid grid-cols-[20px_minmax(0,1fr)_minmax(0,1.4fr)_28px] items-center gap-1.5">
                          <input
                            type="checkbox"
                            aria-label={c.request.enableRow}
                            checked={h.enabled}
                            onChange={(e) =>
                              update({ headers: draft.headers.map((x, j) => (j === i ? { ...x, enabled: e.target.checked } : x)) })
                            }
                            className="h-3.5 w-3.5 accent-brand-600"
                          />
                          <input
                            aria-label={c.request.key}
                            placeholder={c.request.key}
                            value={h.key}
                            onChange={(e) =>
                              update({ headers: draft.headers.map((x, j) => (j === i ? { ...x, key: e.target.value } : x)) })
                            }
                            className={inputCls}
                          />
                          <input
                            aria-label={c.request.value}
                            placeholder={c.request.value}
                            value={h.value}
                            onChange={(e) =>
                              update({ headers: draft.headers.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)) })
                            }
                            className={inputCls}
                          />
                          <button
                            type="button"
                            aria-label={c.request.removeRow}
                            title={c.request.removeRow}
                            onClick={() => update({ headers: draft.headers.filter((_, j) => j !== i) })}
                            className="flex h-7 w-7 items-center justify-center rounded-md text-ink-faint hover:bg-surface-raised hover:text-ink"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => update({ headers: [...draft.headers, { key: "", value: "", enabled: true }] })}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {c.request.addHeader}
                    </button>
                  </div>
                </div>
              )}

              {reqTab === "body" && (
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    {(["none", "json", "text"] as const).map((mode) => (
                      <label key={mode} className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-ink-body">
                        <input
                          type="radio"
                          name="api-body-mode"
                          checked={draft.bodyMode === mode}
                          onChange={() => update({ bodyMode: mode })}
                          className="accent-brand-600"
                        />
                        {mode === "none" ? c.request.bodyNone : mode === "json" ? c.request.bodyJson : c.request.bodyText}
                      </label>
                    ))}
                    {draft.bodyMode === "json" && (
                      <button
                        type="button"
                        disabled={!canFormat}
                        onClick={() => update({ body: prettyJson(draft.body) })}
                        className="ml-auto inline-flex items-center gap-1 rounded-md border border-line px-2 py-1 text-[11px] font-bold text-ink-body hover:bg-surface-raised disabled:opacity-40"
                      >
                        <WandSparkles className="h-3.5 w-3.5" />
                        {c.request.formatJson}
                      </button>
                    )}
                  </div>
                  {draft.method === "GET" ? (
                    <p className="rounded-lg bg-surface-raised px-3 py-2 text-xs text-ink-muted">{c.request.bodyGetNote}</p>
                  ) : draft.bodyMode === "none" ? (
                    <p className="rounded-lg bg-surface-raised px-3 py-2 text-xs text-ink-muted">{c.request.bodyNoneNote}</p>
                  ) : (
                    <>
                      <textarea
                        aria-label={c.request.tabs.body}
                        value={draft.body}
                        onChange={(e) => update({ body: e.target.value })}
                        spellCheck={false}
                        rows={8}
                        className="w-full resize-y rounded-lg border border-stone-800 bg-stone-950 p-3 font-mono text-xs leading-relaxed text-stone-100 outline-none focus:border-brand-500"
                      />
                      {draft.bodyMode === "json" ? (
                        <p
                          className={`mt-1 text-[11px] font-semibold ${
                            bodyError ? "text-danger" : "text-ink-muted"
                          }`}
                        >
                          {draft.body.trim() === ""
                            ? c.request.jsonEmpty
                            : bodyError
                              ? format(c.request.jsonInvalid, { error: bodyError })
                              : c.request.jsonValid}
                        </p>
                      ) : (
                        <p className="mt-1 text-[11px] text-ink-muted">{c.request.bodyTextNote}</p>
                      )}
                    </>
                  )}
                </div>
              )}

              {reqTab === "auth" && (
                <div className="grid gap-3 sm:grid-cols-[180px_minmax(0,1fr)]">
                  <label className="block">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-ink-faint">{c.request.authType}</span>
                    <select
                      value={draft.authMode}
                      onChange={(e) => update({ authMode: e.target.value as RequestDraft["authMode"] })}
                      className={inputCls}
                    >
                      <option value="none">{c.request.authNone}</option>
                      <option value="bearer">{c.request.authBearer}</option>
                    </select>
                  </label>
                  {draft.authMode === "bearer" ? (
                    <label className="block">
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-ink-faint">{c.request.tokenLabel}</span>
                      <input
                        value={draft.token}
                        onChange={(e) => update({ token: e.target.value })}
                        placeholder={c.request.tokenPlaceholder}
                        spellCheck={false}
                        className={inputCls}
                      />
                      <span className="mt-1 block font-mono text-[11px] text-ink-muted">
                        {format(c.request.authBearerNote, { token: draft.token })}
                      </span>
                    </label>
                  ) : (
                    <p className="self-end text-xs text-ink-muted">{c.request.authNoneNote}</p>
                  )}
                </div>
              )}
            </div>

            {/* ------------------------------------------------ Response */}
            <div className="border-t border-line">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line px-3 py-2">
                <span className="text-xs font-black uppercase tracking-wider text-ink-muted">{c.response.title}</span>
                {httpResult && !sending && (
                  <div className="ml-auto flex flex-wrap items-center gap-3 text-xs">
                    <span className={`rounded-md px-2 py-0.5 font-mono font-black ${statusTone(httpResult.status)}`}>
                      {httpResult.status} {httpResult.statusText}
                    </span>
                    <span className="text-ink-muted">
                      {c.response.time}{" "}
                      <b className="font-mono text-accent">
                        {format(c.response.timeValue, { ms: httpResult.timeMs })}
                      </b>
                    </span>
                    <span className="text-ink-muted">
                      {c.response.size}{" "}
                      <b className="font-mono text-accent">{formatBytes(httpResult.sizeBytes)}</b>
                    </span>
                  </div>
                )}
              </div>

              {sending ? (
                <div className="flex min-h-[220px] items-center justify-center gap-2 text-sm text-ink-muted">
                  <Loader2 className="h-4 w-4 animate-spin text-accent" />
                  {c.response.waiting}
                </div>
              ) : !result ? (
                <div className="flex min-h-[220px] flex-col items-center justify-center gap-1 px-4 text-center">
                  <Send className="h-6 w-6 text-ink-faint" />
                  <p className="text-sm font-bold text-ink">{c.response.empty}</p>
                  <p className="text-xs text-ink-muted">{c.response.emptyHint}</p>
                </div>
              ) : result.kind === "error" ? (
                <div className="m-3 rounded-lg border border-danger-line bg-danger-soft p-3">
                  <p className="text-sm font-bold text-danger">
                    {result.code === "INVALID_URL"
                      ? c.response.invalidUrlTitle
                      : format(c.response.hostNotFoundTitle, { host: result.host ?? "" })}
                  </p>
                  <p className="mt-1 text-xs text-ink-body">
                    {result.code === "INVALID_URL" ? c.response.invalidUrlBody : c.response.hostNotFoundBody}
                  </p>
                </div>
              ) : (
                <>
                  {meaning && (
                    <p className="mx-3 mt-3 rounded-lg bg-surface-raised px-3 py-2 text-xs text-ink-body">
                      <b className="mr-1 text-ink">{c.response.meaning}</b>
                      <span className="mr-1.5 font-mono font-bold">{httpResult!.status}</span>
                      {meaning}
                    </p>
                  )}
                  {token && (
                    <div className="mx-3 mt-2 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          update({ authMode: "bearer", token });
                          setTokenApplied(true);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-md border border-accent-line bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent"
                      >
                        <KeyRound className="h-3.5 w-3.5" />
                        {c.response.useToken}
                      </button>
                      {tokenApplied && <span className="text-[11px] text-ink-muted">{c.response.tokenApplied}</span>}
                    </div>
                  )}
                  <div className="flex border-b border-line px-1 pt-1">
                    <button type="button" onClick={() => setResTab("body")} className={tabBtn(resTab === "body")}>
                      {c.response.tabs.body}
                    </button>
                    <button type="button" onClick={() => setResTab("headers")} className={tabBtn(resTab === "headers")}>
                      {format(c.response.headerCount, { count: httpResult!.headers.length })}
                    </button>
                  </div>
                  <div className="p-3">
                    {resTab === "body" ? (
                      httpResult!.body === "" ? (
                        <p className="rounded-lg bg-surface-raised px-3 py-6 text-center text-xs text-ink-muted">
                          {httpResult!.status === 204 ? c.response.noBody204 : c.response.noBody}
                        </p>
                      ) : (
                        <div className="flex max-h-[420px] overflow-auto rounded-lg bg-stone-950 font-mono text-xs leading-relaxed">
                          <div aria-hidden className="select-none border-r border-stone-800 px-2 py-3 text-right text-stone-600">
                            {Array.from({ length: lineCount }, (_, i) => (
                              <div key={i}>{i + 1}</div>
                            ))}
                          </div>
                          <pre className="min-w-0 flex-1 whitespace-pre p-3">
                            {tokens.map((tk, i) => (
                              <span key={i} className={TOKEN_COLOR[tk.type]}>
                                {tk.text}
                              </span>
                            ))}
                          </pre>
                        </div>
                      )
                    ) : (
                      <table className="w-full table-fixed text-left font-mono text-xs">
                        <thead>
                          <tr className="text-[10px] uppercase tracking-wider text-ink-faint">
                            <th className="w-2/5 pb-1 font-bold">{c.request.key}</th>
                            <th className="pb-1 font-bold">{c.request.value}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {httpResult!.headers.map(([k, v], i) => (
                            <tr key={i} className="border-t border-line align-top">
                              <td className="break-words py-1.5 pr-2 font-bold text-ink">{k}</td>
                              <td className="break-all py-1.5 text-ink-body">{v}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------ Cheat sheet */}
      <details className="group mt-4 rounded-2xl border border-line bg-white p-4 dark:bg-stone-900">
        <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-black text-ink">
          <BookOpen className="h-4 w-4 text-accent" />
          {c.cheatSheet.title}
          <ChevronDown className="ml-auto h-4 w-4 text-ink-muted transition-transform group-open:rotate-180" />
        </summary>
        <p className="mt-2 text-xs text-ink-muted">{c.cheatSheet.subtitle}</p>
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          {CHEAT_CODES.map((code) => (
            <div key={code} className="flex gap-2 rounded-lg border border-line p-2">
              <dt className={`h-fit shrink-0 rounded-md px-1.5 py-0.5 font-mono text-xs font-black ${statusTone(code)}`}>
                {code}
              </dt>
              <dd className="text-xs text-ink-body">{c.cheatSheet.codes[`c${code}`]}</dd>
            </div>
          ))}
        </dl>
      </details>
    </ToolShell>
  );
}

function ParamRow({
  k,
  v,
  inputCls,
  keyLabel,
  valueLabel,
  removeLabel,
  onKey,
  onValue,
  onRemove,
}: {
  k: string;
  v: string;
  inputCls: string;
  keyLabel: string;
  valueLabel: string;
  removeLabel: string;
  onKey: (k: string) => void;
  onValue: (v: string) => void;
  onRemove: () => void;
}) {
  return (
    <>
      <input aria-label={keyLabel} value={k} onChange={(e) => onKey(e.target.value)} className={inputCls} spellCheck={false} />
      <input aria-label={valueLabel} value={v} onChange={(e) => onValue(e.target.value)} className={inputCls} spellCheck={false} />
      <button
        type="button"
        aria-label={removeLabel}
        title={removeLabel}
        onClick={onRemove}
        className="flex h-7 w-7 items-center justify-center rounded-md text-ink-faint hover:bg-surface-raised hover:text-ink"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </>
  );
}
