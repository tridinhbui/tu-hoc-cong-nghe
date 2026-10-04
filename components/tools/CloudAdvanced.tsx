"use client";

/**
 * Bốn trang mở rộng của bảng điều khiển Cloud: danh tính (IAM), cân bằng tải
 * và tự mở rộng, ổ đĩa và sao lưu, ngân sách và thẻ chi phí. Tách khỏi
 * CloudSim.tsx để tệp chính không phình thêm; mọi logic nằm ở engine.ts, trang
 * chỉ gọi hàm engine rồi vẽ kết quả.
 */
import { useState } from "react";
import { AlertTriangle, Plus, Trash2 } from "lucide-react";
import { btnRun } from "@/components/tools/ToolShell";
import { panel } from "@/components/ui/system";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import {
  ASG_COOLDOWN_SECONDS,
  ASG_SCALE_IN_CPU,
  AZ_IDS,
  BUDGET_LIMIT,
  LOAD_REQUESTS,
  MAX_TAGS,
  POLICY_IDS,
  SIZE_CAPACITY,
  VM_SIZE_IDS,
  addTarget,
  asgCpu,
  asgReady,
  attachPolicy,
  attachVolume,
  budgetAlertReached,
  clearBudgetAlert,
  costByTag,
  createAutoScalingGroup,
  createIdentity,
  createLoadBalancer,
  createVolume,
  deleteAutoScalingGroup,
  deleteIdentity,
  deleteLoadBalancer,
  deleteSnapshot,
  deleteVolume,
  diskMonthly,
  detachPolicy,
  detachVolume,
  identityCan,
  isAdmin,
  lbResponse,
  lbTargets,
  liveVms,
  removeTag,
  removeTarget,
  restoreDatabase,
  setBudgetAlert,
  setLoad,
  setMfa,
  setOutage,
  setTag,
  simulateDataLoss,
  targetHealthy,
  takeSnapshot,
  taggableResources,
  type CloudErrorCode,
  type CloudState,
  type Identity,
  type IamService,
  type LoadLevel,
  type PolicyId,
  type Result,
  type TaggableKind,
  type Vm,
  type VmSizeId,
} from "@/lib/tools/cloud/engine";

export interface AdvancedCtx {
  state: CloudState;
  run: (result: Result, success?: string) => boolean;
  /** Đổi trạng thái bằng hàm không trả lỗi (giả lập sự cố, đổi tải). */
  apply: (state: CloudState, success?: string) => void;
  money: (n: number) => string;
  errorText: (code: CloudErrorCode) => string;
}

const card = panel;
const input =
  "w-full rounded-lg border border-line bg-white px-2.5 py-1.5 text-sm text-ink outline-none focus:border-brand-500 dark:bg-stone-950";
const btnPrimary = `${btnRun} px-3 py-1.5`;
const btnGhost =
  "inline-flex items-center justify-center gap-1.5 rounded-control border border-accent-line bg-surface px-2.5 py-1 text-xs font-bold text-ink transition-colors hover:bg-accent-wash hover:text-accent-strong disabled:opacity-40";
const btnDanger =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-danger-line px-2.5 py-1 text-xs font-bold text-danger hover:bg-danger-soft disabled:opacity-40";
const label = "mb-1 block text-xs font-bold text-ink-muted";

/* i18n-ignore-start: dòng trạng thái HTTP và tên cỡ máy - đúng chữ một console thật hiển thị ở mọi ngôn ngữ. */
const LB_STATUS_LINE = { 200: "200 OK", 503: "503 Service Unavailable" } as const;
/* i18n-ignore-end */

function Head({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-black text-ink">{title}</h2>
      <p className="mt-0.5 max-w-2xl text-sm text-ink-muted">{intro}</p>
    </div>
  );
}

function SectionTitle({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="mb-2 mt-6 first:mt-0">
      <h3 className="text-sm font-black uppercase tracking-wider text-ink-muted">{title}</h3>
      <p className="mt-0.5 max-w-2xl text-xs text-ink-muted">{intro}</p>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 rounded-lg border border-accent-line bg-accent-soft px-3 py-2 text-xs leading-relaxed text-accent-ink">{children}</p>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="rounded-lg border border-dashed border-line px-3 py-5 text-center text-sm text-ink-muted">{children}</p>;
}

function Badge({ tone, children }: { tone: "ok" | "warn" | "bad" | "idle"; children: React.ReactNode }) {
  const cls =
    tone === "ok"
      ? "bg-accent-soft text-accent-ink"
      : tone === "warn"
        ? "bg-warn-soft text-warn-ink"
        : tone === "bad"
          ? "bg-danger-soft text-danger"
          : "bg-surface-raised text-ink-muted";
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold ${cls}`}>{children}</span>;
}

/* ------------------------------------------------------------------ Danh tính */

const IAM_SERVICES: IamService[] = ["storage", "database", "compute", "billing"];

function levelOf(i: Identity, svc: IamService): "none" | "read" | "full" {
  return identityCan(i, svc, "full") ? "full" : identityCan(i, svc, "read") ? "read" : "none";
}

export function IdentityPage({ ctx }: { ctx: AdvancedCtx }) {
  const { t } = useI18n();
  const d = t.toolCloud.identity;
  const { state, run } = ctx;
  const [name, setName] = useState("");

  const create = (kind: Identity["kind"]) => {
    if (run(createIdentity(state, kind, name), format(d.createdMsg, { name: name.trim() }))) setName("");
  };

  return (
    <div>
      <Head title={d.title} intro={d.intro} />
      <div className={`${card} flex flex-col gap-2 p-3 sm:flex-row sm:items-end`}>
        <div className="min-w-0 flex-1">
          <label className={label} htmlFor="iam-name">
            {d.newName}
          </label>
          <input id="iam-name" className={`${input} font-mono`} value={name} placeholder={d.namePlaceholder} onChange={(e) => setName(e.target.value)} />
        </div>
        <button type="button" className={btnPrimary} onClick={() => create("user")}>
          <Plus className="h-4 w-4" />
          {d.createUser}
        </button>
        <button type="button" className={btnGhost} onClick={() => create("role")}>
          <Plus className="h-3.5 w-3.5" />
          {d.createRole}
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {state.identities.length === 0 ? (
          <Empty>{d.empty}</Empty>
        ) : (
          state.identities.map((i) => <IdentityCard key={i.name} identity={i} ctx={ctx} />)
        )}
      </div>
      <Tip>{d.tip}</Tip>
    </div>
  );
}

function IdentityCard({ identity: i, ctx }: { identity: Identity; ctx: AdvancedCtx }) {
  const { t } = useI18n();
  const d = t.toolCloud.identity;
  const { state, run } = ctx;
  const [pick, setPick] = useState<PolicyId>("storage-read");
  return (
    <div className={`${card} p-3`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink">
          <span className="font-mono">{i.name}</span>
          <Badge tone="idle">{d.kinds[i.kind]}</Badge>
          {isAdmin(i) && <Badge tone="bad">{d.adminBadge}</Badge>}
        </p>
        <button type="button" className="text-ink-faint hover:text-danger" aria-label={format(d.delete, { name: i.name })} onClick={() => run(deleteIdentity(state, i.name))}>
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {i.kind === "user" && (
        <label className="mt-2 flex cursor-pointer items-start gap-2 text-sm text-ink">
          <input type="checkbox" checked={i.mfa} onChange={(e) => run(setMfa(state, i.name, e.target.checked))} className="mt-0.5 h-4 w-4 accent-brand-600" />
          <span>
            {d.mfa}
            <span className="block text-[11px] text-ink-muted">{d.mfaHint}</span>
          </span>
        </label>
      )}

      <p className="mt-3 text-[11px] font-black uppercase tracking-wider text-ink-faint">{d.policiesTitle}</p>
      {i.policies.length === 0 ? (
        <p className="text-xs text-ink-muted">{d.noPolicies}</p>
      ) : (
        <ul className="mt-1 flex flex-wrap gap-1.5">
          {i.policies.map((p) => (
            <li key={p} className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-xs text-ink">
              {d.policyNames[p]}
              <button type="button" className="text-ink-faint hover:text-danger" aria-label={format(d.detach, { name: d.policyNames[p] })} onClick={() => run(detachPolicy(state, i.name, p))}>
                <Trash2 className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
        <select className={`${input} w-auto py-1 text-xs`} value={pick} onChange={(e) => setPick(e.target.value as PolicyId)} aria-label={d.pickPolicy}>
          {POLICY_IDS.map((p) => (
            <option key={p} value={p}>
              {d.policyNames[p]}
            </option>
          ))}
        </select>
        <button type="button" className={btnGhost} onClick={() => run(attachPolicy(state, i.name, pick))}>
          <Plus className="h-3.5 w-3.5" />
          {d.attach}
        </button>
      </div>

      <p className="mt-3 text-[11px] font-black uppercase tracking-wider text-ink-faint">{d.access}</p>
      <div className="mt-1 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {IAM_SERVICES.map((svc) => {
          const lv = levelOf(i, svc);
          return (
            <div key={svc} className="rounded-lg bg-surface-raised px-2 py-1.5">
              <p className="text-[11px] text-ink-muted">{d.services[svc]}</p>
              <p className={`text-xs font-bold ${lv === "full" ? "text-warn" : lv === "read" ? "text-accent" : "text-ink-faint"}`}>{d.levels[lv]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Cân bằng tải và tự mở rộng */

function unhealthyReason(state: CloudState, vm: Vm): "notRunning" | "outage" | "port80" {
  if (vm.state !== "running") return "notRunning";
  if (state.outageAz === vm.az) return "outage";
  return "port80";
}

export function ScalingPage({ ctx }: { ctx: AdvancedCtx }) {
  const { t } = useI18n();
  const c = t.toolCloud;
  const d = c.scaling;
  const { state, run, apply } = ctx;
  const [lbName, setLbName] = useState("web-lb");
  const outage = state.outageAz;

  return (
    <div>
      <Head title={d.title} intro={d.intro} />

      <SectionTitle title={d.lbTitle} intro={d.lbIntro} />
      <div className={`${card} flex flex-col gap-2 p-3 sm:flex-row sm:items-end`}>
        <div className="min-w-0 flex-1">
          <label className={label} htmlFor="lb-name">
            {d.lbName}
          </label>
          <input id="lb-name" className={`${input} font-mono`} value={lbName} onChange={(e) => setLbName(e.target.value)} />
        </div>
        <button type="button" className={btnPrimary} onClick={() => run(createLoadBalancer(state, lbName), format(d.lbCreatedMsg, { name: lbName.trim() }))}>
          <Plus className="h-4 w-4" />
          {d.lbCreate}
        </button>
      </div>

      {state.lbs.length > 0 && (
        <div className={`${card} mt-3 p-3`}>
          <p className="text-xs font-black text-ink">{d.outageTitle}</p>
          <p className="text-[11px] text-ink-muted">{d.outageNote}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {AZ_IDS.map((az) => (
              <button key={az} type="button" className={btnDanger} onClick={() => apply(setOutage(state, az))} disabled={outage === az}>
                <AlertTriangle className="h-3.5 w-3.5" />
                {format(d.outageButton, { zone: c.zones[az] })}
              </button>
            ))}
            {outage && (
              <>
                <Badge tone="bad">{format(d.outageActive, { zone: c.zones[outage] })}</Badge>
                <button type="button" className={btnGhost} onClick={() => apply(setOutage(state, null))}>
                  {d.outageClear}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="mt-3 space-y-3">
        {state.lbs.length === 0 ? <Empty>{d.lbEmpty}</Empty> : state.lbs.map((lb) => <LbCard key={lb.id} lbId={lb.id} ctx={ctx} />)}
      </div>

      <SectionTitle title={d.asgTitle} intro={d.asgIntro} />
      <AsgForm ctx={ctx} />
      <LoadSwitch ctx={ctx} />
      <div className="mt-3 space-y-3">
        {state.asgs.length === 0 ? <Empty>{d.asgEmpty}</Empty> : state.asgs.map((g) => <AsgCard key={g.id} groupId={g.id} ctx={ctx} />)}
      </div>
      <Tip>{d.tip}</Tip>
    </div>
  );
}

function LbCard({ lbId, ctx }: { lbId: string; ctx: AdvancedCtx }) {
  const { t } = useI18n();
  const c = t.toolCloud;
  const d = c.scaling;
  const { state, run } = ctx;
  const lb = state.lbs.find((l) => l.id === lbId);
  const [pick, setPick] = useState("");
  if (!lb) return null;
  const targets = lbTargets(state, lb);
  const candidates = liveVms(state).filter((v) => v.region === lb.region && !lb.targets.includes(v.id));
  const response = lbResponse(state, lb);
  return (
    <div className={`${card} p-3`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink">
          <span className="font-mono">{lb.name}</span>
          <Badge tone={lb.status === "active" ? "ok" : "warn"}>{d.lbStatus[lb.status]}</Badge>
          <span className="font-mono text-[11px] font-normal text-ink-muted">{lb.id}</span>
        </p>
        <button type="button" className={btnDanger} onClick={() => run(deleteLoadBalancer(state, lb.id))}>
          <Trash2 className="h-3.5 w-3.5" />
          {d.lbDelete}
        </button>
      </div>

      <p className="mt-3 text-[11px] font-black uppercase tracking-wider text-ink-faint">{d.targets}</p>
      {targets.length === 0 ? (
        <p className="text-xs text-ink-muted">{d.noTargets}</p>
      ) : (
        <ul className="mt-1 divide-y divide-line">
          {targets.map((vm) => {
            const healthy = targetHealthy(state, vm);
            return (
              <li key={vm.id} className="flex flex-wrap items-center justify-between gap-2 py-1.5">
                <span className="min-w-0 text-sm text-ink">
                  <span className="font-mono font-bold">{vm.name}</span>
                  <span className="text-xs text-ink-muted">
                    {" "}
                    · {c.zones[vm.az]} · {c.compute.subnets[vm.subnet]}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <Badge tone={healthy ? "ok" : "bad"}>{healthy ? d.healthy : d.unhealthy}</Badge>
                  {!healthy && <span className="text-[11px] text-ink-muted">{d.whyUnhealthy[unhealthyReason(state, vm)]}</span>}
                  <button type="button" className="text-ink-faint hover:text-danger" aria-label={format(d.removeTarget, { name: vm.name })} onClick={() => run(removeTarget(state, lb.id, vm.id))}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
        <select className={`${input} w-auto py-1 text-xs`} value={pick} onChange={(e) => setPick(e.target.value)} aria-label={d.pickVm}>
          <option value="">{d.pickVm}</option>
          {candidates.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} ({c.zones[v.az]})
            </option>
          ))}
        </select>
        <button
          type="button"
          className={btnGhost}
          disabled={!pick}
          onClick={() => {
            if (run(addTarget(state, lb.id, pick))) setPick("");
          }}
        >
          <Plus className="h-3.5 w-3.5" />
          {d.addTarget}
        </button>
      </div>

      <p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
        {d.response}
        <span className={`rounded-md px-2 py-0.5 font-mono font-bold ${response === 200 ? "bg-accent-soft text-accent-ink" : "bg-danger-soft text-danger"}`}>
          {LB_STATUS_LINE[response]}
        </span>
      </p>
    </div>
  );
}

function AsgForm({ ctx }: { ctx: AdvancedCtx }) {
  const { t } = useI18n();
  const d = t.toolCloud.scaling;
  const { state, run } = ctx;
  const [name, setName] = useState("web-group");
  const [size, setSize] = useState<VmSizeId>("small");
  const [min, setMin] = useState(2);
  const [max, setMax] = useState(4);
  const [thr, setThr] = useState(60);
  const num = (v: string) => Number(v);
  return (
    <div className={`${card} grid gap-2 p-3 sm:grid-cols-6 sm:items-end`}>
      <div className="sm:col-span-2">
        <label className={label} htmlFor="asg-name">
          {d.asgName}
        </label>
        <input id="asg-name" className={`${input} font-mono`} value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label className={label} htmlFor="asg-size">
          {d.asgSize}
        </label>
        <select id="asg-size" className={input} value={size} onChange={(e) => setSize(e.target.value as VmSizeId)}>
          {VM_SIZE_IDS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={label} htmlFor="asg-min">
          {d.asgMin}
        </label>
        <input id="asg-min" type="number" className={input} value={min} onChange={(e) => setMin(num(e.target.value))} />
      </div>
      <div>
        <label className={label} htmlFor="asg-max">
          {d.asgMax}
        </label>
        <input id="asg-max" type="number" className={input} value={max} onChange={(e) => setMax(num(e.target.value))} />
      </div>
      <div>
        <label className={label} htmlFor="asg-thr">
          {d.asgThreshold}
        </label>
        <input id="asg-thr" type="number" className={input} value={thr} onChange={(e) => setThr(num(e.target.value))} />
      </div>
      <div className="sm:col-span-6">
        <button
          type="button"
          className={btnPrimary}
          onClick={() => run(createAutoScalingGroup(state, { name, size, min, max, scaleOutCpu: thr }), format(d.asgCreatedMsg, { name: name.trim() }))}
        >
          <Plus className="h-4 w-4" />
          {d.asgCreate}
        </button>
      </div>
    </div>
  );
}

function LoadSwitch({ ctx }: { ctx: AdvancedCtx }) {
  const { t } = useI18n();
  const d = t.toolCloud.scaling;
  const { state, apply } = ctx;
  const levels: LoadLevel[] = ["normal", "spike"];
  return (
    <div className={`${card} mt-3 p-3`}>
      <p className="text-xs font-black text-ink">{d.loadTitle}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {levels.map((lv) => (
          <button
            key={lv}
            type="button"
            onClick={() => apply(setLoad(state, lv))}
            className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${state.load === lv ? "border-accent bg-accent-wash text-accent-strong ring-1 ring-accent" : "border-line text-ink hover:bg-accent-wash"}`}
          >
            {format(lv === "normal" ? d.loadNormal : d.loadSpike, { req: LOAD_REQUESTS[lv] })}
          </button>
        ))}
      </div>
    </div>
  );
}

function AsgCard({ groupId, ctx }: { groupId: string; ctx: AdvancedCtx }) {
  const { t } = useI18n();
  const d = t.toolCloud.scaling;
  const { state, run } = ctx;
  const g = state.asgs.find((x) => x.id === groupId);
  if (!g) return null;
  const cpu = asgCpu(state, g);
  const hot = cpu > g.scaleOutCpu;
  return (
    <div className={`${card} p-3`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink">
          <span className="font-mono">{g.name}</span>
          <span className="font-mono text-[11px] font-normal text-ink-muted">
            {g.id} · {g.size}
          </span>
        </p>
        <button type="button" className={btnDanger} onClick={() => run(deleteAutoScalingGroup(state, g.id))}>
          <Trash2 className="h-3.5 w-3.5" />
          {d.asgDelete}
        </button>
      </div>
      <p className="mt-2 text-sm text-ink">
        {format(d.instances, { ready: asgReady(g, state.clock), total: g.instances.length, min: g.min, max: g.max })}
      </p>
      <div className="mt-2 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-raised">
          <div className={`h-full rounded-full transition-all ${hot ? "bg-red-500" : "bg-brand-500"}`} style={{ width: `${cpu}%` }} />
        </div>
        <p className={`text-xs font-bold tabular-nums ${hot ? "text-danger" : "text-ink"}`}>{format(d.cpu, { pct: cpu })}</p>
      </div>
      <p className="mt-2 text-[11px] text-ink-muted">
        {format(d.rules, { out: g.scaleOutCpu, low: ASG_SCALE_IN_CPU, cool: ASG_COOLDOWN_SECONDS })} {format(d.capacity, { size: g.size, cap: SIZE_CAPACITY[g.size] })}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ Ổ đĩa và sao lưu */

export function ProtectionPage({ ctx }: { ctx: AdvancedCtx }) {
  const { t } = useI18n();
  const d = t.toolCloud.protection;
  return (
    <div>
      <Head title={d.title} intro={d.intro} />
      <VolumesSection ctx={ctx} />
      <SnapshotsSection ctx={ctx} />
      <Tip>{d.tip}</Tip>
    </div>
  );
}

function VolumesSection({ ctx }: { ctx: AdvancedCtx }) {
  const { t } = useI18n();
  const c = t.toolCloud;
  const d = c.protection;
  const { state, run, money } = ctx;
  const [name, setName] = useState("data-01");
  const vms = liveVms(state);
  return (
    <>
      <SectionTitle title={d.volTitle} intro={d.volIntro} />
      <div className={`${card} flex flex-col gap-2 p-3 sm:flex-row sm:items-end`}>
        <div className="min-w-0 flex-1">
          <label className={label} htmlFor="vol-name">
            {d.volName}
          </label>
          <input id="vol-name" className={`${input} font-mono`} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button type="button" className={btnPrimary} onClick={() => run(createVolume(state, name), format(d.volCreatedMsg, { name: name.trim() }))}>
          <Plus className="h-4 w-4" />
          {d.volCreate}
        </button>
      </div>
      <div className="mt-3 space-y-2">
        {state.volumes.length === 0 ? (
          <Empty>{d.volEmpty}</Empty>
        ) : (
          state.volumes.map((v) => (
            <VolumeRow key={v.id} volumeId={v.id} vms={vms} ctx={ctx} money={money} />
          ))
        )}
      </div>
    </>
  );
}

function VolumeRow({ volumeId, vms, ctx, money }: { volumeId: string; vms: Vm[]; ctx: AdvancedCtx; money: (n: number) => string }) {
  const { t } = useI18n();
  const c = t.toolCloud;
  const d = c.protection;
  const { state, run } = ctx;
  const v = state.volumes.find((x) => x.id === volumeId);
  const [pick, setPick] = useState("");
  if (!v) return null;
  const host = v.attachedTo ? state.vms.find((m) => m.id === v.attachedTo) : null;
  const candidates = vms.filter((m) => m.region === v.region);
  return (
    <div className={`${card} flex flex-wrap items-center justify-between gap-2 p-3`}>
      <div className="min-w-0">
        <p className="text-sm font-bold text-ink">
          <span className="font-mono">{v.name}</span> <span className="font-mono text-[11px] font-normal text-ink-muted">{v.id}</span>
        </p>
        {v.attachedTo ? (
          <p className="text-xs text-ink-muted">{format(d.attachedTo, { name: host?.name ?? v.attachedTo })}</p>
        ) : (
          <p className="flex items-center gap-1 text-xs text-warn">
            <AlertTriangle className="h-3 w-3" />
            {d.orphan}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {v.attachedTo ? (
          <button type="button" className={btnGhost} onClick={() => run(detachVolume(state, v.id))}>
            {d.detach}
          </button>
        ) : (
          <>
            <select className={`${input} w-auto py-1 text-xs`} value={pick} onChange={(e) => setPick(e.target.value)} aria-label={d.attachPick}>
              <option value="">{d.attachPick}</option>
              {candidates.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              className={btnGhost}
              disabled={!pick}
              onClick={() => {
                if (run(attachVolume(state, v.id, pick), format(d.attachedMsg, { name: v.name }))) setPick("");
              }}
            >
              {d.attach}
            </button>
          </>
        )}
        <button type="button" className={btnDanger} onClick={() => run(deleteVolume(state, v.id))}>
          <Trash2 className="h-3.5 w-3.5" />
          {d.delete}
        </button>
        <span className="text-xs font-bold tabular-nums text-ink">{money(diskMonthly(v.region))}</span>
      </div>
    </div>
  );
}

function SnapshotsSection({ ctx }: { ctx: AdvancedCtx }) {
  const { t } = useI18n();
  const d = t.toolCloud.protection;
  const { state, run, apply } = ctx;
  const available = state.databases.filter((x) => x.status === "available");
  return (
    <>
      <SectionTitle title={d.snapTitle} intro={d.snapIntro} />
      {state.databases.length === 0 ? (
        <Empty>{d.snapNoDb}</Empty>
      ) : (
        <div className="space-y-2">
          {state.databases.map((db) => (
            <div key={db.id} className={`${card} flex flex-wrap items-center justify-between gap-2 p-3`}>
              <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink">
                <span className="font-mono">{db.name}</span>
                <Badge tone={db.dataLost ? "bad" : "ok"}>{db.dataLost ? d.dbLost : d.dbOk}</Badge>
              </p>
              <div className="flex flex-wrap gap-1.5">
                <button type="button" className={btnGhost} disabled={db.status !== "available"} onClick={() => run(takeSnapshot(state, db.id), format(d.snapTakenMsg, { db: db.name }))}>
                  {d.snapTake}
                </button>
                <button
                  type="button"
                  className={btnDanger}
                  disabled={db.status !== "available" || db.dataLost}
                  onClick={() => {
                    const r = simulateDataLoss(state, db.id);
                    if (r.ok) apply(r.state, format(d.incidentMsg, { db: db.name }));
                    else run(r);
                  }}
                >
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {format(d.incidentButton, { db: db.name })}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-3 space-y-2">
        {state.snapshots.length === 0 ? (
          available.length > 0 && <Empty>{d.snapEmpty}</Empty>
        ) : (
          state.snapshots.map((s) => <SnapshotRow key={s.id} snapId={s.id} ctx={ctx} />)
        )}
      </div>
    </>
  );
}

function SnapshotRow({ snapId, ctx }: { snapId: string; ctx: AdvancedCtx }) {
  const { t } = useI18n();
  const d = t.toolCloud.protection;
  const { state, run } = ctx;
  const s = state.snapshots.find((x) => x.id === snapId);
  const [name, setName] = useState(`${s?.dbName ?? "db"}-restored`.slice(0, 32));
  if (!s) return null;
  return (
    <div className={`${card} p-3`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="min-w-0 text-sm text-ink">
          <span className="font-mono text-xs">{format(d.snapLine, { id: s.id, db: s.dbName, at: s.at })}</span>
        </p>
        <div className="flex items-center gap-2">
          <Badge tone={s.intact ? "ok" : "bad"}>{s.intact ? d.intact : d.damaged}</Badge>
          <button type="button" className="text-ink-faint hover:text-danger" aria-label={d.delete} onClick={() => run(deleteSnapshot(state, s.id))}>
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input className={`${input} font-mono sm:max-w-xs`} value={name} onChange={(e) => setName(e.target.value)} aria-label={d.restoreName} />
        <button type="button" className={btnGhost} onClick={() => run(restoreDatabase(state, s.id, name), format(d.restoredMsg, { name: name.trim() }))}>
          {d.restore}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Ngân sách và thẻ */

const ALERT_THRESHOLDS = [25, 50, 80, 90, 100];

export function GovernancePage({ ctx }: { ctx: AdvancedCtx }) {
  const { t } = useI18n();
  const d = t.toolCloud.governance;
  return (
    <div>
      <Head title={d.title} intro={d.intro} />
      <BudgetSection ctx={ctx} />
      <TagsSection ctx={ctx} />
      <Tip>{d.tip}</Tip>
    </div>
  );
}

function BudgetSection({ ctx }: { ctx: AdvancedCtx }) {
  const { t } = useI18n();
  const d = t.toolCloud.governance;
  const { state, run, apply, money } = ctx;
  const [limit, setLimit] = useState(String(state.budgetAlert?.limit ?? BUDGET_LIMIT));
  const [picked, setPicked] = useState<number[]>(state.budgetAlert?.thresholds ?? [100]);
  const alert = state.budgetAlert;
  const reached = budgetAlertReached(state);
  const list = (ts: number[]) => ts.map((x) => format(d.thresholdOption, { pct: x })).join(", ");
  const toggle = (p: number) => setPicked((ps) => (ps.includes(p) ? ps.filter((x) => x !== p) : [...ps, p]));
  return (
    <>
      <SectionTitle title={d.budgetTitle} intro={d.budgetIntro} />
      <div className={`${card} space-y-3 p-3`}>
        <div>
          <label className={label} htmlFor="budget-limit">
            {d.budgetLimit}
          </label>
          <input id="budget-limit" inputMode="numeric" className={`${input} font-mono sm:max-w-xs`} value={limit} onChange={(e) => setLimit(e.target.value)} />
        </div>
        <div>
          <p className={label}>{d.budgetThresholds}</p>
          <div className="flex flex-wrap gap-3">
            {ALERT_THRESHOLDS.map((p) => (
              <label key={p} className="flex cursor-pointer items-center gap-1.5 text-sm text-ink">
                <input type="checkbox" checked={picked.includes(p)} onChange={() => toggle(p)} className="h-4 w-4 accent-brand-600" />
                {format(d.thresholdOption, { pct: p })}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={btnPrimary}
            onClick={() => run(setBudgetAlert(state, Number(limit.replace(/[.,\s]/g, "")), picked), format(d.budgetSavedMsg, { limit: money(Number(limit.replace(/[.,\s]/g, ""))), pct: list([...picked].sort((a, b) => a - b)) }))}
          >
            {d.budgetSave}
          </button>
          {alert && (
            <button type="button" className={btnGhost} onClick={() => apply(clearBudgetAlert(state))}>
              {d.budgetClear}
            </button>
          )}
        </div>
        <p className="text-xs text-ink-muted">
          {alert ? format(d.budgetCurrent, { limit: money(alert.limit), pct: list(alert.thresholds) }) : d.budgetNone}
          {alert && " "}
          {alert && (reached !== null ? format(d.budgetReached, { pct: reached }) : d.budgetNotReached)}
        </p>
      </div>
    </>
  );
}

function TagsSection({ ctx }: { ctx: AdvancedCtx }) {
  const { t } = useI18n();
  const d = t.toolCloud.governance;
  const { state, money } = ctx;
  const resources = taggableResources(state);
  const keys = [...new Set(resources.flatMap((r) => Object.keys(r.tags)))];
  const [key, setKey] = useState("team");
  const by = costByTag(state, key);
  const nameOf = (kind: TaggableKind, id: string) =>
    kind === "vm"
      ? (state.vms.find((v) => v.id === id)?.name ?? id)
      : kind === "db"
        ? (state.databases.find((x) => x.id === id)?.name ?? id)
        : kind === "volume"
          ? (state.volumes.find((x) => x.id === id)?.name ?? id)
          : id;
  return (
    <>
      <SectionTitle title={d.tagsTitle} intro={d.tagsIntro} />
      {resources.length === 0 ? (
        <Empty>{d.tagsEmpty}</Empty>
      ) : (
        <div className="space-y-2">
          {resources.map((r) => (
            <TagRow key={`${r.kind}-${r.id}`} kind={r.kind} id={r.id} name={nameOf(r.kind, r.id)} tags={r.tags} ctx={ctx} />
          ))}
        </div>
      )}
      <div className={`${card} mt-3 p-3`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-black uppercase tracking-wider text-ink-muted">{d.costByTag}</p>
          <label className="flex items-center gap-2 text-xs text-ink-muted">
            {d.costByTagKey}
            <select className={`${input} w-auto py-1 text-xs`} value={key} onChange={(e) => setKey(e.target.value)}>
              {[...new Set(["team", "env", ...keys])].map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </label>
        </div>
        <ul className="mt-2 divide-y divide-line">
          {Object.entries(by).map(([value, amount]) => (
            <li key={value || "__none"} className="flex items-center justify-between py-1.5 text-sm">
              <span className={value ? "font-mono text-ink" : "text-warn"}>{value ? `${key}=${value}` : d.untagged}</span>
              <span className="font-bold tabular-nums text-ink">{money(amount)}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function TagRow({ kind, id, name, tags, ctx }: { kind: TaggableKind; id: string; name: string; tags: Record<string, string>; ctx: AdvancedCtx }) {
  const { t } = useI18n();
  const d = t.toolCloud.governance;
  const { state, run } = ctx;
  const [k, setK] = useState("team");
  const [v, setV] = useState("");
  const entries = Object.entries(tags);
  return (
    <div className={`${card} p-3`}>
      <p className="text-sm font-bold text-ink">
        <span className="font-mono">{name}</span> <span className="text-xs font-normal text-ink-muted">· {d.kinds[kind]}</span>
      </p>
      {entries.length === 0 ? (
        <p className="text-xs text-warn">{d.noTags}</p>
      ) : (
        <ul className="mt-1 flex flex-wrap gap-1.5">
          {entries.map(([tk, tv]) => (
            <li key={tk} className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 font-mono text-xs text-ink">
              {tk}={tv}
              <button type="button" className="text-ink-faint hover:text-danger" aria-label={format(d.tagRemove, { key: tk })} onClick={() => run(removeTag(state, kind, id, tk))}>
                <Trash2 className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input className={`${input} font-mono sm:max-w-[9rem]`} value={k} onChange={(e) => setK(e.target.value)} aria-label={d.tagKey} placeholder={d.tagKey} />
        <input className={`${input} font-mono sm:max-w-[11rem]`} value={v} onChange={(e) => setV(e.target.value)} aria-label={d.tagValue} placeholder={d.tagValue} />
        <button
          type="button"
          className={btnGhost}
          disabled={Object.keys(tags).length >= MAX_TAGS && !(k in tags)}
          onClick={() => {
            if (run(setTag(state, kind, id, k, v))) setV("");
          }}
        >
          <Plus className="h-3.5 w-3.5" />
          {d.tagAdd}
        </button>
      </div>
    </div>
  );
}
