/**
 * Nhiệm vụ của công cụ Cloud, xếp từ dễ tới khó - đúng tuần đầu đi làm với
 * đám mây: thuê một máy, mở cửa cho web, khoá SSH lại, đưa trang tĩnh lên,
 * tạo cơ sở dữ liệu an toàn, rồi học cách không để hoá đơn chạy mất kiểm soát.
 *
 * Tên và gợi ý nằm trong từ điển (toolCloud.missions.<id>). Giao diện giữ dấu
 * tích "dính": một nhiệm vụ đã xong thì không mất khi người học dọn tài nguyên
 * ở nhiệm vụ cuối.
 */
import {
  BUDGET_LIMIT,
  VM_SIZES,
  asgCpu,
  identityCan,
  isAdmin,
  isLiveWebsite,
  lbHealthyTargets,
  lbSurvivesAnyZoneOutage,
  lbTargets,
  liveVms,
  monthlyTotal,
  orphanVolumes,
  taggableResources,
  type CloudState,
  type Identity,
} from "./engine";

export interface CloudMission {
  id: string;
  check: (state: CloudState) => boolean;
  /** Tiêu chí đạt, từ yếu tới mạnh; tiêu chí cuối chính là `check`. */
  criteria: { id: string; check: (state: CloudState) => boolean }[];
}

function m(id: string, criteria: CloudMission["criteria"]): CloudMission {
  return { id, check: criteria[criteria.length - 1].check, criteria };
}

const hasIndex = (b: CloudState["buckets"][number]) => b.objects.some((o) => o.key === "index.html");
const noResources = (s: CloudState) =>
  liveVms(s).length === 0 &&
  s.buckets.length === 0 &&
  s.databases.length === 0 &&
  s.volumes.length === 0 &&
  s.lbs.length === 0 &&
  s.asgs.length === 0 &&
  s.snapshots.length === 0;

const firstIndex = (s: CloudState, kind: CloudState["history"][number]["kind"], from = 0) =>
  s.history.findIndex((h, i) => i >= from && h.kind === kind);
/** Có một sự kiện `a` rồi sau đó có `b` - thứ tự thật, không đạt được bằng cách làm bừa. */
const happenedInOrder = (s: CloudState, ...kinds: CloudState["history"][number]["kind"][]) => {
  let at = 0;
  for (const k of kinds) {
    const i = firstIndex(s, k, at);
    if (i < 0) return false;
    at = i + 1;
  }
  return true;
};

const onlyReadsStorage = (i: Identity) =>
  identityCan(i, "storage", "read") &&
  !identityCan(i, "storage", "full") &&
  !identityCan(i, "database", "read") &&
  !identityCan(i, "compute", "read") &&
  !identityCan(i, "billing", "read") &&
  !isAdmin(i);

const hasDbRule = (v: CloudState["vms"][number], source: "anywhere" | "internal") =>
  v.rules.some((r) => (r.port === 5432 || r.port === 3306) && r.source === source);

export const CLOUD_MISSIONS: CloudMission[] = [
  m("launch-vm", [
    { id: "created", check: (s) => s.vms.some((v) => v.image === "ubuntu" && v.size === "small" && v.state !== "terminated") },
    { id: "running", check: (s) => s.vms.some((v) => v.image === "ubuntu" && v.size === "small" && v.state === "running") },
  ]),
  m("open-http", [
    { id: "rule", check: (s) => liveVms(s).some((v) => v.rules.some((r) => r.port === 80 && r.source === "anywhere")) },
    {
      id: "running",
      check: (s) => s.vms.some((v) => v.state === "running" && v.rules.some((r) => r.port === 80 && r.source === "anywhere")),
    },
  ]),
  m("ssh-my-ip", [
    { id: "mine", check: (s) => liveVms(s).some((v) => v.rules.some((r) => r.port === 22 && r.source === "myIp")) },
    {
      id: "closed",
      check: (s) =>
        liveVms(s).some(
          (v) =>
            v.rules.some((r) => r.port === 22 && r.source === "myIp") &&
            !v.rules.some((r) => r.port === 22 && r.source === "anywhere")
        ),
    },
  ]),
  m("static-website", [
    { id: "uploaded", check: (s) => s.buckets.some(hasIndex) },
    { id: "hosting", check: (s) => s.buckets.some((b) => hasIndex(b) && b.website) },
    { id: "public", check: (s) => s.buckets.some(isLiveWebsite) },
  ]),
  m("safe-database", [
    { id: "available", check: (s) => s.databases.some((d) => d.status === "available") },
    { id: "backups", check: (s) => s.databases.some((d) => d.status === "available" && d.backups) },
    {
      id: "private",
      check: (s) => s.databases.some((d) => d.status === "available" && d.backups && !d.publiclyAccessible),
    },
  ]),
  m("stop-vm", [
    { id: "stopped", check: (s) => s.history.some((h) => h.kind === "vm-stopped" && h.monthlyAfter < h.monthlyBefore) },
  ]),
  m("budget", [
    // Phải từng VƯỢT ngân sách rồi kéo về: chỉ "đang dưới mức" thì người học
    // đạt được luôn trên đường làm nhiệm vụ 4, chưa kịp học gì về cắt giảm.
    { id: "over", check: (s) => s.history.some((h) => h.monthlyAfter > BUDGET_LIMIT) },
    {
      id: "under",
      check: (s) => s.history.some((h) => h.monthlyAfter > BUDGET_LIMIT) && monthlyTotal(s) < BUDGET_LIMIT,
    },
    {
      id: "alive",
      check: (s) =>
        s.history.some((h) => h.monthlyAfter > BUDGET_LIMIT) &&
        monthlyTotal(s) < BUDGET_LIMIT &&
        s.vms.some((v) => v.state === "running") &&
        s.buckets.some(isLiveWebsite),
    },
  ]),
  m("clean-up", [
    { id: "terminated", check: (s) => s.history.some((h) => h.kind === "vm-terminated") },
    { id: "empty", check: (s) => s.history.some((h) => h.kind === "vm-terminated") && noResources(s) },
    {
      id: "zero",
      check: (s) => s.history.some((h) => h.kind === "vm-terminated") && noResources(s) && monthlyTotal(s) === 0,
    },
  ]),

  /* ---- nhiệm vụ mở rộng: danh tính, mạng, dữ liệu, chi phí, dự phòng ---- */
  m("bucket-block-public", [
    { id: "files", check: (s) => s.buckets.some((b) => b.objects.length > 0) },
    { id: "blocked", check: (s) => s.buckets.some((b) => b.objects.length > 0 && b.blockPublicAccess) },
    { id: "notServed", check: (s) => s.buckets.some((b) => b.objects.length > 0 && b.blockPublicAccess && !isLiveWebsite(b)) },
  ]),
  m("iam-mfa", [
    { id: "user", check: (s) => s.identities.some((i) => i.kind === "user") },
    { id: "mfa", check: (s) => s.identities.some((i) => i.kind === "user" && i.mfa) },
    { id: "notAdmin", check: (s) => s.identities.some((i) => i.kind === "user" && i.mfa && !isAdmin(i)) },
  ]),
  m("budget-alert", [
    { id: "created", check: (s) => s.budgetAlert !== null },
    { id: "limit", check: (s) => s.budgetAlert?.limit === BUDGET_LIMIT },
    {
      id: "early",
      check: (s) => s.budgetAlert?.limit === BUDGET_LIMIT && s.budgetAlert.thresholds.some((t) => t <= 80),
    },
    {
      id: "full",
      check: (s) =>
        s.budgetAlert?.limit === BUDGET_LIMIT &&
        s.budgetAlert.thresholds.some((t) => t <= 80) &&
        s.budgetAlert.thresholds.includes(100),
    },
  ]),
  m("db-snapshot", [
    { id: "available", check: (s) => s.databases.some((d) => d.status === "available") },
    { id: "snapshot", check: (s) => s.snapshots.length > 0 },
    { id: "intact", check: (s) => s.snapshots.some((x) => x.intact) && s.databases.some((d) => d.status === "available") },
  ]),
  m("cost-tags", [
    { id: "two", check: (s) => taggableResources(s).length >= 2 },
    { id: "team", check: (s) => taggableResources(s).length >= 2 && taggableResources(s).every((r) => !!r.tags.team) },
    {
      id: "both",
      check: (s) =>
        taggableResources(s).length >= 2 && taggableResources(s).every((r) => !!r.tags.team && !!r.tags.env),
    },
  ]),
  m("vm-fit-need", [
    { id: "enough", check: (s) => liveVms(s).some((v) => VM_SIZES[v.size].vcpu >= 2 && VM_SIZES[v.size].ramGb >= 4) },
    {
      id: "region",
      check: (s) => liveVms(s).some((v) => VM_SIZES[v.size].vcpu >= 2 && VM_SIZES[v.size].ramGb >= 4 && v.region === "hanoi"),
    },
    { id: "right", check: (s) => s.vms.some((v) => v.size === "medium" && v.region === "hanoi" && v.state === "running") },
  ]),
  m("sg-db-internal", [
    { id: "rule", check: (s) => liveVms(s).some((v) => v.rules.some((r) => r.port === 5432)) },
    { id: "internal", check: (s) => liveVms(s).some((v) => hasDbRule(v, "internal") && v.rules.some((r) => r.port === 5432 && r.source === "internal")) },
    {
      id: "closed",
      check: (s) =>
        s.vms.some(
          (v) =>
            v.state === "running" &&
            v.rules.some((r) => r.port === 5432 && r.source === "internal") &&
            !hasDbRule(v, "anywhere") &&
            !v.rules.some((r) => r.port === 22 && r.source === "anywhere")
        ),
    },
  ]),
  m("iam-least-privilege", [
    { id: "role", check: (s) => s.identities.some((i) => i.kind === "role") },
    { id: "reads", check: (s) => s.identities.some((i) => i.kind === "role" && identityCan(i, "storage", "read")) },
    { id: "only", check: (s) => s.identities.some((i) => i.kind === "role" && onlyReadsStorage(i)) },
  ]),
  m("orphan-volumes", [
    { id: "attached", check: (s) => s.history.some((h) => h.kind === "volume-attached") },
    {
      id: "orphaned",
      check: (s) => happenedInOrder(s, "volume-attached", "vm-terminated") && orphanVolumes(s).length > 0,
    },
    {
      id: "cleaned",
      check: (s) =>
        happenedInOrder(s, "volume-attached", "vm-terminated", "volume-deleted") &&
        orphanVolumes(s).length === 0 &&
        s.history.some((h) => h.kind === "volume-deleted" && h.monthlyAfter < h.monthlyBefore),
    },
  ]),
  m("two-az-lb", [
    { id: "lb", check: (s) => s.lbs.some((l) => l.status === "active") },
    { id: "targets", check: (s) => s.lbs.some((l) => l.status === "active" && lbHealthyTargets(s, l).length >= 2) },
    {
      id: "twoZones",
      check: (s) =>
        s.lbs.some((l) => l.status === "active" && lbHealthyTargets(s, l).length >= 2 && lbSurvivesAnyZoneOutage(s, l)),
    },
    {
      id: "private",
      check: (s) =>
        s.lbs.some((l) => {
          const t = lbTargets(s, l);
          return (
            l.status === "active" &&
            t.length >= 2 &&
            lbSurvivesAnyZoneOutage(s, l) &&
            t.every((v) => v.subnet === "private" && v.publicIp === null)
          );
        }),
    },
  ]),
  m("autoscale-spike", [
    { id: "group", check: (s) => s.asgs.some((g) => g.min >= 2 && g.max >= 4) },
    { id: "spike", check: (s) => s.asgs.some((g) => g.min >= 2 && g.max >= 4) && s.history.some((h) => h.kind === "traffic-spike") },
    {
      id: "scaled",
      check: (s) =>
        s.asgs.some((g) => g.min >= 2 && g.max >= 4) &&
        s.history.some((h) => h.kind === "traffic-spike") &&
        s.history.some((h) => h.kind === "scaled-out"),
    },
    {
      id: "calm",
      check: (s) =>
        s.load === "spike" &&
        s.history.some((h) => h.kind === "scaled-out") &&
        s.asgs.some(
          (g) => g.min >= 2 && g.max >= 4 && g.scaleOutCpu <= 70 && g.instances.length > g.min && asgCpu(s, g) <= g.scaleOutCpu
        ),
    },
  ]),
  m("db-restore", [
    { id: "snapshot", check: (s) => s.snapshots.some((x) => x.intact) },
    { id: "incident", check: (s) => s.snapshots.some((x) => x.intact) && s.history.some((h) => h.kind === "db-data-lost") },
    {
      id: "restored",
      check: (s) =>
        happenedInOrder(s, "snapshot-taken", "db-data-lost", "db-restored") &&
        s.databases.some((d) => d.status === "available" && !d.dataLost && s.history.some((h) => h.kind === "db-restored" && h.resourceId === d.id)),
    },
    {
      id: "cleaned",
      check: (s) =>
        happenedInOrder(s, "snapshot-taken", "db-data-lost", "db-restored") &&
        s.databases.some((d) => d.status === "available" && !d.dataLost && s.history.some((h) => h.kind === "db-restored" && h.resourceId === d.id)) &&
        !s.databases.some((d) => d.dataLost),
    },
  ]),
];

/** Gộp nhiệm vụ vừa đạt vào danh sách đã xong (không bao giờ bỏ bớt). */
export function mergeCompleted(done: string[], state: CloudState): string[] {
  const next = new Set(done);
  for (const m of CLOUD_MISSIONS) if (m.check(state)) next.add(m.id);
  return next.size === done.length ? done : CLOUD_MISSIONS.map((m) => m.id).filter((id) => next.has(id));
}
