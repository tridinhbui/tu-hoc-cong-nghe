"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Cloud,
  Cpu,
  Database,
  ExternalLink,
  Globe,
  HardDrive,
  LayoutDashboard,
  Plus,
  Receipt,
  Server,
  Shield,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import ToolShell, { embedMissions, type ToolEmbed } from "@/components/tools/ToolShell";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import {
  BUDGET_LIMIT,
  COST_SERVICES,
  DB_ENGINES,
  DB_SIZE_IDS,
  DB_SIZES,
  FIREWALL_PORTS,
  IMAGE_IDS,
  MY_IP,
  REGIONS,
  REGION_IDS,
  SAMPLE_FILES,
  VM_SIZE_IDS,
  VM_SIZES,
  addRule,
  bucketBytes,
  costByService,
  costLines,
  cpuSeries,
  createBucket,
  createDatabase,
  dbEndpoint,
  dbMonthly,
  deleteBucket,
  deleteDatabase,
  deleteObject,
  diskMonthly,
  initialState,
  launchVm,
  isLiveWebsite,
  liveVms,
  monthlyTotal,
  parseState,
  removeRule,
  setBucketPublic,
  setBucketWebsite,
  setRegion,
  startVm,
  stopVm,
  terminateVm,
  tick,
  updateDatabase,
  uploadObject,
  validateBucketName,
  vmHourly,
  vmMonthly,
  warnings,
  websiteResponse,
  websiteUrl,
  type CloudErrorCode,
  type CloudState,
  type DbEngine,
  type DbSizeId,
  type FirewallPort,
  type ImageId,
  type RegionId,
  type Result,
  type RuleSource,
  type Vm,
  type VmSizeId,
  type Warning,
} from "@/lib/tools/cloud/engine";
import { CLOUD_MISSIONS, mergeCompleted } from "@/lib/tools/cloud/missions";
import { TOOL_STORAGE } from "@/lib/tools/progress";

const STORAGE_KEY = TOOL_STORAGE.cloud;

type PageId = "overview" | "compute" | "storage" | "database" | "networking" | "monitoring" | "billing";

const NAV: { id: PageId; icon: typeof Server }[] = [
  { id: "overview", icon: LayoutDashboard },
  { id: "compute", icon: Server },
  { id: "storage", icon: HardDrive },
  { id: "database", icon: Database },
  { id: "networking", icon: Shield },
  { id: "monitoring", icon: Activity },
  { id: "billing", icon: Receipt },
];

/* i18n-ignore-start: tên giao thức/dịch vụ chuẩn của từng cổng, dải CIDR và dòng
   trạng thái HTTP - đúng chữ mà một console đám mây thật hiển thị, ở mọi ngôn ngữ. */
const PORT_SERVICE: Record<FirewallPort, string> = {
  22: "SSH",
  80: "HTTP",
  443: "HTTPS",
  3306: "MySQL",
  5432: "PostgreSQL",
};
const SOURCE_CIDR: Record<RuleSource, string> = {
  anywhere: "0.0.0.0/0",
  myIp: `${MY_IP}/32`,
};
const HTTP_STATUS_LINE = { 200: "200 OK", 403: "403 Forbidden", 404: "404 Not Found" } as const;
/* i18n-ignore-end */

interface Model {
  cloud: CloudState;
  done: string[];
}

type ModelAction = { type: "set"; cloud: CloudState } | { type: "tick" } | { type: "load"; model: Model } | { type: "reset" };

function reducer(model: Model, action: ModelAction): Model {
  switch (action.type) {
    case "set":
      return { cloud: action.cloud, done: mergeCompleted(model.done, action.cloud) };
    case "tick": {
      const cloud = tick(model.cloud);
      return { cloud, done: mergeCompleted(model.done, cloud) };
    }
    case "load":
      return action.model;
    case "reset":
      return { cloud: initialState(), done: [] };
  }
}

type Notice = { tone: "ok" | "error" | "info"; text: string } | null;

function useMoney() {
  const { t, locale } = useI18n();
  return useMemo(() => {
    const nf = new Intl.NumberFormat(intlLocale(locale));
    return (n: number) => format(t.toolCloud.currency, { amount: nf.format(n) });
  }, [t, locale]);
}

const card = "rounded-xl border border-line bg-white dark:bg-stone-900";
const input =
  "w-full rounded-lg border border-line bg-white px-2.5 py-1.5 text-sm text-ink outline-none focus:border-brand-500 dark:bg-stone-950";
const btnPrimary =
  "inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-bold text-white hover:bg-brand-700 disabled:opacity-50";
const btnGhost =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-line px-2.5 py-1 text-xs font-bold text-ink hover:bg-surface-raised disabled:opacity-40";
const btnDanger =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-danger-line px-2.5 py-1 text-xs font-bold text-danger hover:bg-danger-soft disabled:opacity-40";
const label = "mb-1 block text-xs font-bold text-ink-muted";

export default function CloudSim({ embed }: { embed?: ToolEmbed }) {
  const embedded = !!embed;
  const { t } = useI18n();
  const c = t.toolCloud;
  const money = useMoney();
  const [model, dispatch] = useReducer(reducer, undefined, () => ({ cloud: initialState(), done: [] }));
  const [hydrated, setHydrated] = useState(false);
  const [page, setPage] = useState<PageId>("overview");
  const [notice, setNotice] = useState<Notice>(null);
  const [errorKey, setErrorKey] = useState(0);
  const state = model.cloud;

  useEffect(() => {
    if (embedded) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- bản nhúng bắt đầu từ trạng thái mới, không đọc tiến độ của /cong-cu
      setHydrated(true);
      return;
    }
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { cloud?: unknown; done?: unknown };
        const cloud = parseState(parsed.cloud);
        if (cloud) {
          const done = Array.isArray(parsed.done) ? parsed.done.filter((x): x is string => typeof x === "string") : [];
          dispatch({ type: "load", model: { cloud, done } });
        }
      }
    } catch {
      /* bộ nhớ trình duyệt bị chặn: chạy tiếp với trạng thái mới */
    }
    setHydrated(true);
  }, [embedded]);

  useEffect(() => {
    if (!hydrated || embedded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(model));
    } catch {
      /* không lưu được thì thôi - tiến độ chỉ mất khi tải lại trang */
    }
  }, [model, hydrated, embedded]);

  useEffect(() => {
    const id = window.setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => window.clearInterval(id);
  }, []);

  const run = (result: Result, success?: string): boolean => {
    if (!result.ok) {
      setNotice({ tone: "error", text: c.errors[result.error] });
      setErrorKey((k) => k + 1);
      return false;
    }
    dispatch({ type: "set", cloud: result.state });
    setNotice(success ? { tone: "ok", text: success } : null);
    return true;
  };

  const errorText = (code: CloudErrorCode) => c.errors[code];

  const missions = embedMissions(CLOUD_MISSIONS, embed).map((m) => {
    const copy = c.missions[m.id as keyof typeof c.missions];
    const labels = copy.criteria as Record<string, string>;
    return {
      id: m.id,
      title: copy.title,
      hint: copy.hint,
      from: copy.from,
      brief: copy.brief,
      done: model.done.includes(m.id),
      criteria: m.criteria.map((cr) => ({ id: cr.id, label: labels[cr.id] ?? cr.id, met: cr.check(state) })),
    };
  });

  const total = monthlyTotal(state);
  const region = REGIONS[state.region];

  const ctx: PageCtx = { state, run, setNotice, money, errorText, go: setPage };

  return (
    <ToolShell
      tool="cloud"
      missions={missions}
      ready={hydrated}
      errorKey={errorKey}
      renderArtifact={() => <InfraSummary state={state} money={money} />}
      embed={embed}
      onReset={() => {
        dispatch({ type: "reset" });
        setNotice(null);
        setPage("overview");
      }}
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm dark:bg-stone-900">
        {/* Thanh trên cùng */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 bg-stone-900 px-3 py-2 text-stone-100 dark:bg-stone-950">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-600">
              <Cloud className="h-4 w-4 text-white" />
            </span>
            <span className="text-sm font-black tracking-tight">{c.brand}</span>
            <span className="hidden text-xs text-stone-400 sm:inline">{c.consoleLabel}</span>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-1.5 text-xs text-stone-300">
              <Globe className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">{c.regionLabel}</span>
              <select
                value={state.region}
                onChange={(e) => {
                  dispatch({ type: "set", cloud: setRegion(state, e.target.value as RegionId) });
                  setNotice({
                    tone: "info",
                    text: format(c.regionChanged, { region: c.regions[e.target.value as RegionId] }),
                  });
                }}
                className="rounded-md border border-stone-700 bg-stone-800 px-2 py-1 text-xs font-bold text-stone-100 outline-none"
              >
                {REGION_IDS.map((r) => (
                  <option key={r} value={r}>
                    {c.regions[r]} ({REGIONS[r].zone})
                  </option>
                ))}
              </select>
            </label>
            <span className="rounded-md bg-stone-800 px-2 py-1 text-[11px] tabular-nums text-stone-300">
              {format(c.latency, { ms: region.latencyMs })}
            </span>
            <button
              type="button"
              onClick={() => setPage("billing")}
              className={`rounded-md px-2 py-1 text-[11px] font-bold tabular-nums ${
                total > BUDGET_LIMIT ? "bg-red-900/60 text-red-200" : "bg-brand-900/60 text-brand-100"
              }`}
            >
              {format(c.monthlyChip, { amount: money(total) })}
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <nav className="flex gap-1 overflow-x-auto border-b border-line p-2 md:w-48 md:shrink-0 md:flex-col md:border-b-0 md:border-r">
            {NAV.map(({ id, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setPage(id);
                  setNotice(null);
                }}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm font-bold ${
                  page === id ? "bg-accent-soft text-accent" : "text-ink-muted hover:bg-surface-raised hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4" />
                {c.nav[id]}
              </button>
            ))}
          </nav>

          <main className="min-w-0 flex-1 p-3 sm:p-4">
            {notice && (
              <div
                role="status"
                className={`mb-3 flex items-start justify-between gap-2 rounded-lg border px-3 py-2 text-sm ${
                  notice.tone === "error"
                    ? "border-danger-line bg-danger-soft text-danger"
                    : notice.tone === "ok"
                      ? "border-accent-line bg-accent-soft text-accent-ink"
                      : "border-line bg-surface-raised text-ink"
                }`}
              >
                <span>{notice.text}</span>
                <button type="button" onClick={() => setNotice(null)} aria-label={c.dismiss} className="shrink-0 opacity-70 hover:opacity-100">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            {page === "overview" && <OverviewPage ctx={ctx} />}
            {page === "compute" && <ComputePage ctx={ctx} />}
            {page === "storage" && <StoragePage ctx={ctx} />}
            {page === "database" && <DatabasePage ctx={ctx} />}
            {page === "networking" && <NetworkingPage ctx={ctx} />}
            {page === "monitoring" && <MonitoringPage ctx={ctx} />}
            {page === "billing" && <BillingPage ctx={ctx} />}
          </main>
        </div>
      </div>
    </ToolShell>
  );
}

interface PageCtx {
  state: CloudState;
  run: (result: Result, success?: string) => boolean;
  setNotice: (n: Notice) => void;
  money: (n: number) => string;
  errorText: (code: CloudErrorCode) => string;
  go: (page: PageId) => void;
}

/** Kết quả bàn giao của mọi ticket Cloud: hạ tầng đang có và hoá đơn tháng -
 *  đúng bản tóm tắt người ta gửi lại cho người yêu cầu. */
function InfraSummary({ state, money }: { state: CloudState; money: (n: number) => string }) {
  const { t } = useI18n();
  const r = t.revampTools.cloud;
  const vms = liveVms(state);
  const sites = state.buckets.filter(isLiveWebsite);
  const total = monthlyTotal(state);
  const row = "flex flex-wrap items-center justify-between gap-1.5 font-mono text-[11px] text-ink";
  const head = "text-[11px] font-bold text-ink-muted";
  return (
    <div className="space-y-2">
      <div>
        <p className={head}>{r.vms}</p>
        {vms.length === 0 ? (
          <p className="text-[11px] text-ink-faint">{r.none}</p>
        ) : (
          vms.map((v) => (
            <p key={v.id} className={row}>
              <span className="min-w-0 truncate">
                {v.name} · {v.size}
              </span>
              <StateBadge state={v.state} />
            </p>
          ))
        )}
      </div>
      <div>
        <p className={head}>{r.sites}</p>
        {sites.length === 0 ? (
          <p className="text-[11px] text-ink-faint">{r.none}</p>
        ) : (
          sites.map((b) => (
            <p key={b.name} className="break-all font-mono text-[11px] text-accent">
              {websiteUrl(b)}
            </p>
          ))
        )}
      </div>
      <div>
        <p className={head}>{r.dbs}</p>
        {state.databases.length === 0 ? (
          <p className="text-[11px] text-ink-faint">{r.none}</p>
        ) : (
          state.databases.map((d) => (
            <p key={d.id} className={row}>
              <span className="min-w-0 truncate">
                {d.name} · {d.engine}
              </span>
              <StateBadge state={d.status} />
            </p>
          ))
        )}
      </div>
      <div className="flex items-baseline justify-between border-t border-line pt-2">
        <p className={head}>{r.bill}</p>
        <p className="text-right">
          <span className={`font-mono text-sm font-black tabular-nums ${total > BUDGET_LIMIT ? "text-danger" : "text-ink-max"}`}>
            {money(total)}
          </span>
          <span className="block text-[10px] text-ink-faint">{format(r.budget, { limit: money(BUDGET_LIMIT) })}</span>
        </p>
      </div>
    </div>
  );
}

function PageHeader({ title, intro, action }: { title: string; intro: string; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-lg font-black text-ink">{title}</h2>
        <p className="mt-0.5 max-w-2xl text-sm text-ink-muted">{intro}</p>
      </div>
      {action}
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 rounded-lg border border-accent-line bg-accent-soft px-3 py-2 text-xs leading-relaxed text-accent-ink">{children}</p>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="rounded-lg border border-dashed border-line px-3 py-6 text-center text-sm text-ink-muted">{children}</p>;
}

function Toggle({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <label className="flex cursor-pointer items-start gap-2 text-sm text-ink">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-4 w-4 accent-brand-600" />
      <span>{children}</span>
    </label>
  );
}

function useWarningText() {
  const { t } = useI18n();
  const c = t.toolCloud;
  const money = useMoney();
  return (w: Warning, state: CloudState): string => {
    const vmName = (id: string) => state.vms.find((v) => v.id === id)?.name ?? id;
    const dbName = (id: string) => state.databases.find((d) => d.id === id)?.name ?? id;
    switch (w.kind) {
      case "sshOpenWorld":
        return format(c.warnings.sshOpenWorld, { name: vmName(w.vmId) });
      case "dbPortOpenWorld":
        return format(c.warnings.dbPortOpenWorld, { name: vmName(w.vmId), port: w.port });
      case "dbPublic":
        return format(c.warnings.dbPublic, { name: dbName(w.dbId) });
      case "dbNoBackups":
        return format(c.warnings.dbNoBackups, { name: dbName(w.dbId) });
      case "overBudget":
        return format(c.warnings.overBudget, { total: money(w.total), budget: money(BUDGET_LIMIT) });
    }
  };
}

/* ------------------------------------------------------------------ Tổng quan */

function OverviewPage({ ctx }: { ctx: PageCtx }) {
  const { t } = useI18n();
  const c = t.toolCloud;
  const { state, go, money } = ctx;
  const warningText = useWarningText();
  const ws = warnings(state);
  const counts: { page: PageId; icon: typeof Server; value: number; text: string }[] = [
    { page: "compute", icon: Server, value: liveVms(state).length, text: c.overview.countVms },
    { page: "storage", icon: HardDrive, value: state.buckets.length, text: c.overview.countBuckets },
    { page: "database", icon: Database, value: state.databases.length, text: c.overview.countDbs },
  ];
  return (
    <div>
      <PageHeader title={c.overview.title} intro={c.overview.intro} />
      <div className="grid gap-3 sm:grid-cols-4">
        {counts.map(({ page, icon: Icon, value, text }) => (
          <button key={page} type="button" onClick={() => go(page)} className={`${card} p-3 text-left hover:border-brand-400`}>
            <Icon className="h-4 w-4 text-accent" />
            <p className="mt-2 text-2xl font-black tabular-nums text-ink">{value}</p>
            <p className="text-xs text-ink-muted">{text}</p>
          </button>
        ))}
        <button type="button" onClick={() => go("billing")} className={`${card} p-3 text-left hover:border-brand-400`}>
          <Receipt className="h-4 w-4 text-accent" />
          <p className="mt-2 text-lg font-black tabular-nums text-ink">{money(monthlyTotal(state))}</p>
          <p className="text-xs text-ink-muted">{c.overview.countCost}</p>
        </button>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <div className={`${card} p-3`}>
          <p className="mb-2 text-xs font-black uppercase tracking-wider text-ink-muted">{c.overview.rentingTitle}</p>
          <ul className="space-y-1.5 text-sm text-ink">
            {c.overview.rentingPoints.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${card} p-3`}>
          <p className="mb-2 text-xs font-black uppercase tracking-wider text-ink-muted">{c.overview.healthTitle}</p>
          {ws.length === 0 ? (
            <p className="text-sm text-ink-muted">{c.overview.healthy}</p>
          ) : (
            <ul className="space-y-1.5">
              {ws.map((w, i) => (
                <li key={i} className="flex gap-2 text-sm text-warn">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{warningText(w, state)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={`${card} mt-3 p-3`}>
        <p className="mb-2 text-xs font-black uppercase tracking-wider text-ink-muted">{c.overview.regionsTitle}</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {REGION_IDS.map((r) => (
            <div
              key={r}
              className={`rounded-lg border px-3 py-2 text-sm ${r === state.region ? "border-accent-line bg-accent-soft" : "border-line"}`}
            >
              <p className="font-bold text-ink">{c.regions[r]}</p>
              <p className="font-mono text-[11px] text-ink-muted">{REGIONS[r].zone}</p>
              <p className="mt-1 text-xs text-ink-muted">
                {format(c.latency, { ms: REGIONS[r].latencyMs })} · {format(c.overview.priceIndex, { pct: Math.round(REGIONS[r].priceFactor * 100) })}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-muted">{c.overview.regionsNote}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Compute */

function StateBadge({ state }: { state: Vm["state"] | "creating" | "available" }) {
  const { t } = useI18n();
  const tone =
    state === "running" || state === "available"
      ? "bg-accent-soft text-accent-ink"
      : state === "pending" || state === "stopping" || state === "creating"
        ? "bg-warn-soft text-warn-ink"
        : state === "stopped"
          ? "bg-surface-raised text-ink-muted"
          : "bg-danger-soft text-danger";
  const pulsing = state === "pending" || state === "stopping" || state === "creating";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${tone}`}>
      <span className={`h-1.5 w-1.5 rounded-full bg-current ${pulsing ? "animate-pulse" : ""}`} />
      {t.toolCloud.states[state]}
    </span>
  );
}

function ComputePage({ ctx }: { ctx: PageCtx }) {
  const { t } = useI18n();
  const c = t.toolCloud;
  const { state, run, money } = ctx;
  const [wizard, setWizard] = useState(false);
  const [confirmTerminate, setConfirmTerminate] = useState<string | null>(null);

  return (
    <div>
      <PageHeader
        title={c.compute.title}
        intro={c.compute.intro}
        action={
          !wizard && (
            <button type="button" className={btnPrimary} onClick={() => setWizard(true)}>
              <Plus className="h-4 w-4" />
              {c.compute.launch}
            </button>
          )
        }
      />
      {wizard && <LaunchWizard ctx={ctx} onClose={() => setWizard(false)} />}

      {state.vms.length === 0 ? (
        !wizard && <Empty>{c.compute.empty}</Empty>
      ) : (
        <div className="space-y-2">
          <div className="hidden grid-cols-[1.4fr_1fr_1fr_1.2fr_auto] gap-3 px-3 text-[11px] font-black uppercase tracking-wider text-ink-faint md:grid">
            <span>{c.compute.colName}</span>
            <span>{c.compute.colState}</span>
            <span>{c.compute.colSize}</span>
            <span>{c.compute.colIp}</span>
            <span className="w-44" />
          </div>
          {state.vms.map((vm) => (
            <div key={vm.id} className={`${card} grid gap-2 p-3 md:grid-cols-[1.4fr_1fr_1fr_1.2fr_auto] md:items-center md:gap-3`}>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-ink">{vm.name}</p>
                <p className="font-mono text-[11px] text-ink-muted">
                  {vm.id} · {c.images[vm.image]} · {c.regions[vm.region]}
                </p>
              </div>
              <div>
                <StateBadge state={vm.state} />
              </div>
              <div className="text-xs text-ink">
                <span className="font-mono font-bold">{vm.size}</span>
                <span className="text-ink-muted">
                  {" "}
                  · {format(c.specs, { cpu: VM_SIZES[vm.size].vcpu, ram: VM_SIZES[vm.size].ramGb })}
                </span>
              </div>
              <div className="font-mono text-xs text-ink">
                {vm.publicIp ?? <span className="text-ink-faint">{c.compute.noIp}</span>}
                <p className="text-[11px] text-ink-muted">{format(c.compute.privateIp, { ip: vm.privateIp })}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 md:w-44 md:justify-end">
                {vm.state === "stopped" && (
                  <button type="button" className={btnGhost} onClick={() => run(startVm(state, vm.id), format(c.compute.startedMsg, { name: vm.name }))}>
                    {c.compute.start}
                  </button>
                )}
                {(vm.state === "running" || vm.state === "pending") && (
                  <button
                    type="button"
                    className={btnGhost}
                    onClick={() => {
                      const before = monthlyTotal(state);
                      const r = stopVm(state, vm.id);
                      if (r.ok) {
                        run(
                          r,
                          format(c.compute.stoppedMsg, {
                            name: vm.name,
                            before: money(before),
                            after: money(monthlyTotal(r.state)),
                          })
                        );
                      } else run(r);
                    }}
                  >
                    {c.compute.stop}
                  </button>
                )}
                {vm.state !== "terminated" &&
                  (confirmTerminate === vm.id ? (
                    <>
                      <button
                        type="button"
                        className={btnDanger}
                        onClick={() => {
                          setConfirmTerminate(null);
                          run(terminateVm(state, vm.id), format(c.compute.terminatedMsg, { name: vm.name }));
                        }}
                      >
                        {c.compute.confirmTerminate}
                      </button>
                      <button type="button" className={btnGhost} onClick={() => setConfirmTerminate(null)}>
                        {c.cancel}
                      </button>
                    </>
                  ) : (
                    <button type="button" className={btnDanger} onClick={() => setConfirmTerminate(vm.id)}>
                      {c.compute.terminate}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <Tip>{c.compute.tip}</Tip>
    </div>
  );
}

function LaunchWizard({ ctx, onClose }: { ctx: PageCtx; onClose: () => void }) {
  const { t } = useI18n();
  const c = t.toolCloud;
  const w = c.wizard;
  const { state, run, money } = ctx;
  const [name, setName] = useState(`web-0${liveVms(state).length + 1}`);
  const [image, setImage] = useState<ImageId>("ubuntu");
  const [size, setSize] = useState<VmSizeId>("nano");
  const [keyMode, setKeyMode] = useState<string>(state.keyPairs[0] ?? "__new");
  const [newKey, setNewKey] = useState("my-key");
  const [ports, setPorts] = useState<FirewallPort[]>([22]);
  const [sshSource, setSshSource] = useState<RuleSource>("anywhere");

  const monthly = vmMonthly(size, state.region) + diskMonthly(state.region);
  const togglePort = (p: FirewallPort) => setPorts((ps) => (ps.includes(p) ? ps.filter((x) => x !== p) : [...ps, p]));

  const launch = () => {
    const keyPair = keyMode === "__none" ? null : keyMode === "__new" ? newKey : keyMode;
    if (run(launchVm(state, { name, image, size, keyPair, ports, sshSource }), format(c.compute.launchedMsg, { name: name.trim() }))) {
      onClose();
    }
  };

  const section = "border-t border-line pt-3";
  return (
    <div className={`${card} mb-4 space-y-3 p-3 sm:p-4`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-black text-ink">{w.title}</p>
        <button type="button" onClick={onClose} aria-label={c.cancel} className="text-ink-muted hover:text-ink">
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs text-ink-muted">{format(w.regionNote, { region: c.regions[state.region] })}</p>

      <div>
        <label className={label} htmlFor="vm-name">
          {w.name}
        </label>
        <input id="vm-name" className={`${input} font-mono`} value={name} onChange={(e) => setName(e.target.value)} />
        <p className="mt-1 text-[11px] text-ink-faint">{w.nameHint}</p>
      </div>

      <div className={section}>
        <p className={label}>{w.image}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {IMAGE_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setImage(id)}
              className={`rounded-lg border p-2.5 text-left ${image === id ? "border-brand-500 bg-accent-soft" : "border-line hover:bg-surface-raised"}`}
            >
              <p className="text-sm font-bold text-ink">{c.images[id]}</p>
              <p className="text-[11px] text-ink-muted">{w.imageNotes[id]}</p>
            </button>
          ))}
        </div>
      </div>

      <div className={section}>
        <p className={label}>{w.size}</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {VM_SIZE_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setSize(id)}
              className={`rounded-lg border p-2.5 text-left ${size === id ? "border-brand-500 bg-accent-soft" : "border-line hover:bg-surface-raised"}`}
            >
              <p className="font-mono text-sm font-bold text-ink">{id}</p>
              <p className="text-[11px] text-ink-muted">{format(c.specs, { cpu: VM_SIZES[id].vcpu, ram: VM_SIZES[id].ramGb })}</p>
              <p className="mt-1 text-xs font-bold tabular-nums text-ink">
                {format(c.perHour, { amount: money(vmHourly(id, state.region)) })}
              </p>
              <p className="text-[11px] tabular-nums text-ink-muted">
                {format(c.perMonthApprox, { amount: money(vmMonthly(id, state.region)) })}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className={section}>
        <label className={label} htmlFor="vm-key">
          {w.keyPair}
        </label>
        <select id="vm-key" className={input} value={keyMode} onChange={(e) => setKeyMode(e.target.value)}>
          {state.keyPairs.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
          <option value="__new">{w.keyNew}</option>
          <option value="__none">{w.keyNone}</option>
        </select>
        {keyMode === "__new" && (
          <input className={`${input} mt-2 font-mono`} value={newKey} onChange={(e) => setNewKey(e.target.value)} aria-label={w.keyNewName} />
        )}
        <p className="mt-1 text-[11px] text-ink-faint">{keyMode === "__none" ? w.keyNoneWarn : w.keyHint}</p>
      </div>

      <div className={section}>
        <p className={label}>{w.firewall}</p>
        <div className="space-y-1.5">
          {([22, 80, 443] as FirewallPort[]).map((p) => (
            <Toggle key={p} checked={ports.includes(p)} onChange={() => togglePort(p)}>
              <span className="font-mono font-bold">{p}</span> {PORT_SERVICE[p]}{" "}
              <span className="text-ink-muted">- {w.portNotes[p as 22 | 80 | 443]}</span>
            </Toggle>
          ))}
        </div>
        {ports.includes(22) && (
          <div className="mt-2 flex flex-wrap items-center gap-2 pl-6 text-xs text-ink-muted">
            <span>{w.sshFrom}</span>
            <select className={`${input} w-auto py-1 text-xs`} value={sshSource} onChange={(e) => setSshSource(e.target.value as RuleSource)}>
              <option value="anywhere">
                {c.sources.anywhere} ({SOURCE_CIDR.anywhere})
              </option>
              <option value="myIp">
                {c.sources.myIp} ({SOURCE_CIDR.myIp})
              </option>
            </select>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-surface-raised px-3 py-2">
        <div className="text-xs text-ink-muted">
          <p>{w.estimate}</p>
          <p className="text-base font-black tabular-nums text-ink">{format(c.perMonth, { amount: money(monthly) })}</p>
          <p>{format(w.estimateNote, { disk: money(diskMonthly(state.region)) })}</p>
        </div>
        <button type="button" className={btnPrimary} onClick={launch}>
          <Server className="h-4 w-4" />
          {w.submit}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Storage */

function formatBytes(n: number, locale: string): string {
  const nf = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  if (n < 1024) return `${nf.format(n)} B`;
  if (n < 1024 * 1024) return `${nf.format(n / 1024)} KB`;
  return `${nf.format(n / 1024 / 1024)} MB`;
}

function StoragePage({ ctx }: { ctx: PageCtx }) {
  const { t, locale } = useI18n();
  const c = t.toolCloud;
  const s = c.storage;
  const { state, run, errorText } = ctx;
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<string | null>(state.buckets[0]?.name ?? null);
  const [file, setFile] = useState(SAMPLE_FILES[0].key);
  const [preview, setPreview] = useState(false);
  const liveError = name.trim() ? validateBucketName(name, state) : null;
  const bucket = state.buckets.find((b) => b.name === selected) ?? null;

  return (
    <div>
      <PageHeader title={s.title} intro={s.intro} />
      <div className={`${card} mb-4 p-3`}>
        <label className={label} htmlFor="bucket-name">
          {s.createLabel}
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="bucket-name"
            className={`${input} font-mono`}
            value={name}
            placeholder={s.createPlaceholder}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="button"
            className={btnPrimary}
            onClick={() => {
              const n = name.trim();
              if (run(createBucket(state, n), format(s.createdMsg, { name: n }))) {
                setSelected(n);
                setName("");
              }
            }}
          >
            <Plus className="h-4 w-4" />
            {s.create}
          </button>
        </div>
        <p className={`mt-1 text-[11px] ${liveError ? "text-danger" : "text-ink-faint"}`}>{liveError ? errorText(liveError) : s.nameRules}</p>
      </div>

      {state.buckets.length === 0 ? (
        <Empty>{s.empty}</Empty>
      ) : (
        <div className="grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)]">
          <div className="space-y-1.5">
            {state.buckets.map((b) => (
              <button
                key={b.name}
                type="button"
                onClick={() => {
                  setSelected(b.name);
                  setPreview(false);
                }}
                className={`w-full rounded-lg border px-3 py-2 text-left ${b.name === selected ? "border-brand-500 bg-accent-soft" : "border-line hover:bg-surface-raised"}`}
              >
                <p className="truncate font-mono text-sm font-bold text-ink">{b.name}</p>
                <p className="text-[11px] text-ink-muted">
                  {format(s.objectCount, { count: b.objects.length })} · {c.regions[b.region]}
                </p>
              </button>
            ))}
          </div>

          {bucket ? (
            <div className={`${card} min-w-0 p-3`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-sm font-black text-ink">{bucket.name}</p>
                <button type="button" className={btnDanger} onClick={() => run(deleteBucket(state, bucket.name), format(s.deletedMsg, { name: bucket.name }))}>
                  <Trash2 className="h-3.5 w-3.5" />
                  {s.deleteBucket}
                </button>
              </div>
              <p className="mt-0.5 text-xs text-ink-muted">
                {format(s.totalSize, { size: formatBytes(bucketBytes(bucket), intlLocale(locale)) })}
              </p>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                <select className={`${input} font-mono sm:w-48`} value={file} onChange={(e) => setFile(e.target.value)} aria-label={s.pickFile}>
                  {SAMPLE_FILES.map((f) => (
                    <option key={f.key} value={f.key}>
                      {f.key}
                    </option>
                  ))}
                </select>
                <button type="button" className={btnGhost} onClick={() => run(uploadObject(state, bucket.name, file), format(s.uploadedMsg, { file }))}>
                  <Upload className="h-3.5 w-3.5" />
                  {s.upload}
                </button>
              </div>

              <div className="mt-3 overflow-x-auto">
                {bucket.objects.length === 0 ? (
                  <Empty>{s.noObjects}</Empty>
                ) : (
                  <table className="w-full min-w-[360px] text-left text-xs">
                    <thead className="text-[11px] uppercase tracking-wider text-ink-faint">
                      <tr>
                        <th className="py-1 pr-2">{s.colKey}</th>
                        <th className="py-1 pr-2">{s.colSize}</th>
                        <th className="py-1 pr-2">{s.colType}</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {bucket.objects.map((o) => (
                        <tr key={o.key} className="border-t border-line">
                          <td className="py-1.5 pr-2 font-mono font-bold text-ink">{o.key}</td>
                          <td className="py-1.5 pr-2 tabular-nums text-ink">{formatBytes(o.sizeBytes, intlLocale(locale))}</td>
                          <td className="py-1.5 pr-2 font-mono text-ink-muted">{o.contentType}</td>
                          <td className="py-1.5 text-right">
                            <button
                              type="button"
                              className="text-ink-faint hover:text-danger"
                              aria-label={format(s.deleteObject, { file: o.key })}
                              onClick={() => run(deleteObject(state, bucket.name, o.key))}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="mt-3 space-y-2 border-t border-line pt-3">
                <Toggle checked={bucket.publicAccess} onChange={(v) => run(setBucketPublic(state, bucket.name, v))}>
                  <span className="font-bold">{s.publicToggle}</span>
                  <span className="block text-xs text-ink-muted">{s.publicNote}</span>
                </Toggle>
                <Toggle checked={bucket.website} onChange={(v) => run(setBucketWebsite(state, bucket.name, v))}>
                  <span className="font-bold">{s.websiteToggle}</span>
                  <span className="block text-xs text-ink-muted">{s.websiteNote}</span>
                </Toggle>
              </div>

              {bucket.website && (
                <div className="mt-3 rounded-lg bg-surface-raised p-2.5">
                  <p className="text-[11px] font-bold text-ink-muted">{s.websiteUrl}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <code className="min-w-0 break-all font-mono text-xs text-accent">{websiteUrl(bucket)}</code>
                    <button type="button" className={btnGhost} onClick={() => setPreview(true)}>
                      <ExternalLink className="h-3.5 w-3.5" />
                      {s.openSite}
                    </button>
                  </div>
                </div>
              )}

              {preview && bucket.website && <WebsitePreview status={websiteResponse(bucket)} url={websiteUrl(bucket)} onClose={() => setPreview(false)} />}
            </div>
          ) : (
            <Empty>{s.pickBucket}</Empty>
          )}
        </div>
      )}
      <Tip>{s.tip}</Tip>
    </div>
  );
}

function WebsitePreview({ status, url, onClose }: { status: 200 | 403 | 404; url: string; onClose: () => void }) {
  const { t } = useI18n();
  const s = t.toolCloud.storage;
  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-line">
      <div className="flex items-center gap-2 bg-surface-raised px-2 py-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-400" />
        <span className="ml-1 min-w-0 flex-1 truncate rounded bg-white px-2 py-0.5 font-mono text-[11px] text-ink-muted dark:bg-stone-950">{url}</span>
        <button type="button" onClick={onClose} aria-label={t.toolCloud.dismiss} className="text-ink-muted hover:text-ink">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      {status === 200 ? (
        <div className="bg-white p-5 text-center text-stone-900">
          <p className="text-lg font-black">{s.siteHeading}</p>
          <p className="mt-1 text-sm text-stone-600">{s.siteBody}</p>
        </div>
      ) : (
        <div className="bg-white p-4 font-mono text-xs text-stone-900">
          <p className="font-bold">{HTTP_STATUS_LINE[status]}</p>
          <p className="mt-2 font-sans text-sm text-stone-600">{status === 403 ? s.site403 : s.site404}</p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ Database */

function DatabasePage({ ctx }: { ctx: PageCtx }) {
  const { t } = useI18n();
  const c = t.toolCloud;
  const d = c.database;
  const { state, run, money } = ctx;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("app-db");
  const [engine, setEngine] = useState<DbEngine>("postgres");
  const [size, setSize] = useState<DbSizeId>("micro");
  const [backups, setBackups] = useState(false);
  const [pub, setPub] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  return (
    <div>
      <PageHeader
        title={d.title}
        intro={d.intro}
        action={
          !open && (
            <button type="button" className={btnPrimary} onClick={() => setOpen(true)}>
              <Plus className="h-4 w-4" />
              {d.create}
            </button>
          )
        }
      />
      {open && (
        <div className={`${card} mb-4 space-y-3 p-3 sm:p-4`}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-black text-ink">{d.formTitle}</p>
            <button type="button" onClick={() => setOpen(false)} aria-label={c.cancel} className="text-ink-muted hover:text-ink">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="db-name">
                {d.name}
              </label>
              <input id="db-name" className={`${input} font-mono`} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className={label} htmlFor="db-engine">
                {d.engine}
              </label>
              <select id="db-engine" className={input} value={engine} onChange={(e) => setEngine(e.target.value as DbEngine)}>
                {DB_ENGINES.map((en) => (
                  <option key={en} value={en}>
                    {c.engines[en]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <p className={label}>{d.size}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {DB_SIZE_IDS.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSize(id)}
                  className={`rounded-lg border p-2.5 text-left ${size === id ? "border-brand-500 bg-accent-soft" : "border-line hover:bg-surface-raised"}`}
                >
                  <p className="font-mono text-sm font-bold text-ink">{`db.${id}`}</p>
                  <p className="text-[11px] text-ink-muted">{format(c.specs, { cpu: DB_SIZES[id].vcpu, ram: DB_SIZES[id].ramGb })}</p>
                  <p className="mt-1 text-xs font-bold tabular-nums text-ink">
                    {format(c.perMonthApprox, { amount: money(dbMonthly(id, state.region, false)) })}
                  </p>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2 border-t border-line pt-3">
            <Toggle checked={backups} onChange={setBackups}>
              <span className="font-bold">{d.backups}</span>
              <span className="block text-xs text-ink-muted">{d.backupsNote}</span>
            </Toggle>
            <Toggle checked={pub} onChange={setPub}>
              <span className="font-bold">{d.public}</span>
              <span className="block text-xs text-ink-muted">{d.publicNote}</span>
            </Toggle>
            {pub && (
              <p className="flex gap-2 rounded-lg border border-warn-line-mid bg-warn-soft px-3 py-2 text-xs text-warn-ink">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                {d.publicWarn}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-surface-raised px-3 py-2">
            <div className="text-xs text-ink-muted">
              <p>{c.wizard.estimate}</p>
              <p className="text-base font-black tabular-nums text-ink">{format(c.perMonth, { amount: money(dbMonthly(size, state.region, backups)) })}</p>
            </div>
            <button
              type="button"
              className={btnPrimary}
              onClick={() => {
                if (run(createDatabase(state, { name, engine, size, backups, publiclyAccessible: pub }), format(d.createdMsg, { name: name.trim() }))) {
                  setOpen(false);
                }
              }}
            >
              <Database className="h-4 w-4" />
              {d.submit}
            </button>
          </div>
        </div>
      )}

      {state.databases.length === 0 ? (
        !open && <Empty>{d.empty}</Empty>
      ) : (
        <div className="space-y-2">
          {state.databases.map((db) => (
            <div key={db.id} className={`${card} p-3`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink">{db.name}</p>
                  <p className="font-mono text-[11px] text-ink-muted">
                    {db.id} · {c.engines[db.engine]} · {`db.${db.size}`} · {c.regions[db.region]}
                  </p>
                </div>
                <StateBadge state={db.status} />
              </div>
              <div className="mt-2 rounded-md bg-surface-raised px-2 py-1.5">
                <p className="text-[11px] font-bold text-ink-muted">{d.endpoint}</p>
                <code className="break-all font-mono text-xs text-ink">{db.status === "available" ? dbEndpoint(db) : d.endpointPending}</code>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                <Toggle checked={db.backups} onChange={(v) => run(updateDatabase(state, db.id, { backups: v }))}>
                  <span className="text-xs font-bold">{d.backups}</span>
                </Toggle>
                <Toggle checked={db.publiclyAccessible} onChange={(v) => run(updateDatabase(state, db.id, { publiclyAccessible: v }))}>
                  <span className="text-xs font-bold">{d.public}</span>
                </Toggle>
                <span className="ml-auto flex gap-1.5">
                  {confirmDelete === db.id ? (
                    <>
                      <button
                        type="button"
                        className={btnDanger}
                        onClick={() => {
                          setConfirmDelete(null);
                          run(deleteDatabase(state, db.id), format(d.deletedMsg, { name: db.name }));
                        }}
                      >
                        {d.confirmDelete}
                      </button>
                      <button type="button" className={btnGhost} onClick={() => setConfirmDelete(null)}>
                        {c.cancel}
                      </button>
                    </>
                  ) : (
                    <button type="button" className={btnDanger} onClick={() => setConfirmDelete(db.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                      {d.delete}
                    </button>
                  )}
                </span>
              </div>
              {db.publiclyAccessible && (
                <p className="mt-2 flex gap-2 text-xs text-warn">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  {d.publicWarn}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      <Tip>{d.tip}</Tip>
    </div>
  );
}

/* ------------------------------------------------------------------ Networking */

function NetworkingPage({ ctx }: { ctx: PageCtx }) {
  const { t } = useI18n();
  const c = t.toolCloud;
  const n = c.networking;
  const { state, run } = ctx;
  const vms = liveVms(state);
  const warningText = useWarningText();
  const ws = warnings(state).filter((w) => w.kind === "sshOpenWorld" || w.kind === "dbPortOpenWorld");

  return (
    <div>
      <PageHeader title={n.title} intro={n.intro} />
      {ws.length > 0 && (
        <ul className="mb-3 space-y-1.5 rounded-lg border border-warn-line-mid bg-warn-soft px-3 py-2">
          {ws.map((w, i) => (
            <li key={i} className="flex gap-2 text-xs text-warn-ink">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {warningText(w, state)}
            </li>
          ))}
        </ul>
      )}
      {vms.length === 0 ? (
        <Empty>{n.empty}</Empty>
      ) : (
        <div className="space-y-3">
          {vms.map((vm) => (
            <RuleTable key={vm.id} vm={vm} onAdd={(port, source) => run(addRule(state, vm.id, port, source), format(n.addedMsg, { port, name: vm.name }))} onRemove={(ruleId) => run(removeRule(state, vm.id, ruleId))} />
          ))}
        </div>
      )}
      <Tip>{n.tip}</Tip>
    </div>
  );
}

function RuleTable({ vm, onAdd, onRemove }: { vm: Vm; onAdd: (p: FirewallPort, s: RuleSource) => void; onRemove: (id: string) => void }) {
  const { t } = useI18n();
  const c = t.toolCloud;
  const n = c.networking;
  const [port, setPort] = useState<FirewallPort>(80);
  const [source, setSource] = useState<RuleSource>("anywhere");
  return (
    <div className={`${card} p-3`}>
      <p className="text-sm font-bold text-ink">
        {format(n.groupTitle, { name: vm.name })} <span className="font-mono text-[11px] font-normal text-ink-muted">{vm.id}</span>
      </p>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-xs">
          <thead className="text-[11px] uppercase tracking-wider text-ink-faint">
            <tr>
              <th className="py-1 pr-2">{n.colPort}</th>
              <th className="py-1 pr-2">{n.colService}</th>
              <th className="py-1 pr-2">{n.colSource}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {vm.rules.length === 0 && (
              <tr>
                <td colSpan={4} className="py-2 text-ink-muted">
                  {n.noRules}
                </td>
              </tr>
            )}
            {vm.rules.map((r) => (
              <tr key={r.id} className="border-t border-line">
                <td className="py-1.5 pr-2 font-mono font-bold text-ink">{r.port}</td>
                <td className="py-1.5 pr-2 text-ink">{PORT_SERVICE[r.port]}</td>
                <td className={`py-1.5 pr-2 font-mono ${r.source === "anywhere" && r.port !== 80 && r.port !== 443 ? "text-warn" : "text-ink"}`}>
                  {SOURCE_CIDR[r.source]} <span className="font-sans text-ink-muted">({c.sources[r.source]})</span>
                </td>
                <td className="py-1.5 text-right">
                  <button type="button" className="text-ink-faint hover:text-danger" aria-label={format(n.removeRule, { port: r.port })} onClick={() => onRemove(r.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex flex-col gap-2 border-t border-line pt-2 sm:flex-row sm:items-center">
        <span className="text-xs font-bold text-ink-muted">{n.addRule}</span>
        <select className={`${input} w-auto py-1 text-xs`} value={port} onChange={(e) => setPort(Number(e.target.value) as FirewallPort)} aria-label={n.colPort}>
          {FIREWALL_PORTS.map((p) => (
            <option key={p} value={p}>
              {p} ({PORT_SERVICE[p]})
            </option>
          ))}
        </select>
        <select className={`${input} w-auto py-1 text-xs`} value={source} onChange={(e) => setSource(e.target.value as RuleSource)} aria-label={n.colSource}>
          <option value="anywhere">
            {c.sources.anywhere} ({SOURCE_CIDR.anywhere})
          </option>
          <option value="myIp">
            {c.sources.myIp} ({SOURCE_CIDR.myIp})
          </option>
        </select>
        <button type="button" className={btnGhost} onClick={() => onAdd(port, source)}>
          <Plus className="h-3.5 w-3.5" />
          {n.add}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Monitoring */

function MonitoringPage({ ctx }: { ctx: PageCtx }) {
  const { t } = useI18n();
  const m = t.toolCloud.monitoring;
  const { state } = ctx;
  const running = state.vms.filter((v) => v.state === "running");
  return (
    <div>
      <PageHeader title={m.title} intro={m.intro} />
      {running.length === 0 ? (
        <Empty>{m.empty}</Empty>
      ) : (
        <div className="grid gap-3 xl:grid-cols-2">
          {running.map((vm) => (
            <CpuChart key={vm.id} vm={vm} clock={state.clock} />
          ))}
        </div>
      )}
      <Tip>{m.tip}</Tip>
    </div>
  );
}

function CpuChart({ vm, clock }: { vm: Vm; clock: number }) {
  const { t } = useI18n();
  const m = t.toolCloud.monitoring;
  const series = cpuSeries(vm, clock, 40);
  const W = 400;
  const H = 120;
  const pad = { l: 28, r: 6, t: 8, b: 16 };
  const x = (i: number) => pad.l + (i / (series.length - 1)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - v / 100) * (H - pad.t - pad.b);
  const pts = series.map((v, i) => (v === null ? null : `${x(i).toFixed(1)},${y(v).toFixed(1)}`)).filter((p): p is string => p !== null);
  const current = series[series.length - 1];
  const known = series.filter((v): v is number => v !== null);
  const avg = known.length ? Math.round(known.reduce((a, b) => a + b, 0) / known.length) : 0;
  return (
    <div className={`${card} p-3`}>
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-sm font-bold text-ink">
          <Cpu className="h-4 w-4 text-accent" />
          {vm.name}
        </p>
        <p className="text-xs tabular-nums text-ink-muted">
          {format(m.now, { pct: current ?? 0 })} · {format(m.avg, { pct: avg })}
        </p>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 h-auto w-full" role="img" aria-label={format(m.chartLabel, { name: vm.name })}>
        {[0, 50, 100].map((v) => (
          <g key={v}>
            <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} className="stroke-stone-200 dark:stroke-stone-800" strokeWidth={1} />
            <text x={pad.l - 4} y={y(v) + 3} textAnchor="end" className="fill-stone-400 text-[9px]">
              {v}%
            </text>
          </g>
        ))}
        {pts.length > 1 && (
          <>
            <polygon
              points={`${pts[0].split(",")[0]},${y(0)} ${pts.join(" ")} ${pts[pts.length - 1].split(",")[0]},${y(0)}`}
              className="fill-brand-500/15"
            />
            <polyline points={pts.join(" ")} fill="none" className="stroke-brand-500" strokeWidth={2} strokeLinejoin="round" />
          </>
        )}
        <text x={W - pad.r} y={H - 3} textAnchor="end" className="fill-stone-400 text-[9px]">
          {m.axisNow}
        </text>
        <text x={pad.l} y={H - 3} className="fill-stone-400 text-[9px]">
          {format(m.axisAgo, { s: series.length })}
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ Billing */

function BillingPage({ ctx }: { ctx: PageCtx }) {
  const { t } = useI18n();
  const c = t.toolCloud;
  const b = c.billing;
  const { state, money } = ctx;
  const total = monthlyTotal(state);
  const by = costByService(state);
  const lines = costLines(state);
  const pct = Math.min(100, (total / BUDGET_LIMIT) * 100);
  const over = total > BUDGET_LIMIT;
  const nameOf = (id: string) =>
    state.vms.find((v) => v.id === id)?.name ?? state.databases.find((d) => d.id === id)?.name ?? id;

  return (
    <div>
      <PageHeader title={b.title} intro={b.intro} />
      <div className={`${card} p-3 sm:p-4`}>
        <p className="text-xs font-bold text-ink-muted">{b.total}</p>
        <p className={`text-3xl font-black tabular-nums ${over ? "text-danger" : "text-ink"}`}>{money(total)}</p>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-surface-raised">
          <div className={`h-full rounded-full transition-all ${over ? "bg-red-500" : "bg-brand-600"}`} style={{ width: `${pct}%` }} />
        </div>
        <p className={`mt-1 text-xs ${over ? "text-danger" : "text-ink-muted"}`}>
          {format(over ? b.overBudget : b.underBudget, { budget: money(BUDGET_LIMIT), left: money(Math.abs(BUDGET_LIMIT - total)) })}
        </p>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-5">
        {COST_SERVICES.map((svc) => (
          <div key={svc} className={`${card} p-2.5`}>
            <p className="text-[11px] font-bold text-ink-muted">{b.services[svc]}</p>
            <p className="text-sm font-black tabular-nums text-ink">{money(by[svc])}</p>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-surface-raised">
              <div className="h-full bg-brand-500" style={{ width: `${total ? (by[svc] / total) * 100 : 0}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className={`${card} mt-3 p-3`}>
        <p className="mb-2 text-xs font-black uppercase tracking-wider text-ink-muted">{b.linesTitle}</p>
        {lines.length === 0 ? (
          <p className="text-sm text-ink-muted">{b.noLines}</p>
        ) : (
          <ul className="divide-y divide-line">
            {lines.map((l) => (
              <li key={`${l.resourceId}-${l.note}`} className="flex items-start justify-between gap-3 py-2">
                <div className="min-w-0">
                  <p className="text-sm text-ink">
                    <span className="font-bold">{b.notes[l.note].label}</span> · <span className="font-mono text-xs">{nameOf(l.resourceId)}</span>
                  </p>
                  <p className="text-xs text-ink-muted">{b.notes[l.note].why}</p>
                </div>
                <p className="shrink-0 text-sm font-bold tabular-nums text-ink">{money(l.monthly)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`${card} mt-3 p-3`}>
        <p className="mb-2 text-xs font-black uppercase tracking-wider text-ink-muted">{b.tipsTitle}</p>
        <ul className="space-y-1.5 text-sm text-ink">
          {b.tips.map((tip) => (
            <li key={tip} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
