/**
 * Bộ máy mô phỏng bảng điều khiển đám mây (/cong-cu/cloud).
 *
 * Thuần TypeScript, không React: mọi hành động nhận một trạng thái và trả về
 * trạng thái mới (hoặc một mã lỗi), để kiểm thử được từng bước và để giao diện
 * chỉ việc vẽ lại. Thời gian là một đồng hồ giây do `tick` đẩy lên - máy ảo đi
 * từ pending sang running, cơ sở dữ liệu từ creating sang available, đúng nhịp
 * "bấm tạo rồi chờ" của đám mây thật.
 *
 * Không có chữ hiển thị nào ở đây: lỗi là mã, ghi chú hoá đơn là mã, tên vùng
 * là id. Giao diện tra chúng trong lib/i18n/dictionaries/sections/tool-cloud.ts.
 */

export const HOURS_PER_MONTH = 730;

export type RegionId = "hanoi" | "hcm" | "singapore";

/** Vùng: độ trễ tính từ người dùng ở Việt Nam, và hệ số giá so với TP.HCM. */
export const REGIONS: Record<RegionId, { latencyMs: number; priceFactor: number; zone: string }> = {
  hanoi: { latencyMs: 6, priceFactor: 1.1, zone: "vn-north-1" },
  hcm: { latencyMs: 14, priceFactor: 1, zone: "vn-south-1" },
  singapore: { latencyMs: 38, priceFactor: 0.85, zone: "sg-central-1" },
};
export const REGION_IDS = Object.keys(REGIONS) as RegionId[];

export type ImageId = "ubuntu" | "debian";
export const IMAGE_IDS: ImageId[] = ["ubuntu", "debian"];

export type VmSizeId = "nano" | "small" | "medium" | "large";
export const VM_SIZES: Record<VmSizeId, { vcpu: number; ramGb: number; hourly: number }> = {
  nano: { vcpu: 1, ramGb: 0.5, hourly: 150 },
  small: { vcpu: 1, ramGb: 2, hourly: 400 },
  medium: { vcpu: 2, ramGb: 4, hourly: 800 },
  large: { vcpu: 4, ramGb: 8, hourly: 1600 },
};
export const VM_SIZE_IDS = Object.keys(VM_SIZES) as VmSizeId[];

/** Ổ đĩa gắn theo máy ảo: vẫn tính tiền khi máy đã dừng. */
export const DISK_GB = 20;
export const DISK_PRICE_PER_GB_MONTH = 2000;

export type DbEngine = "postgres" | "mysql";
export const DB_ENGINES: DbEngine[] = ["postgres", "mysql"];
export const DB_PORTS: Record<DbEngine, number> = { postgres: 5432, mysql: 3306 };

export type DbSizeId = "micro" | "small";
export const DB_SIZES: Record<DbSizeId, { vcpu: number; ramGb: number; hourly: number }> = {
  micro: { vcpu: 1, ramGb: 1, hourly: 500 },
  small: { vcpu: 2, ramGb: 4, hourly: 1100 },
};
export const DB_SIZE_IDS = Object.keys(DB_SIZES) as DbSizeId[];
export const DB_STORAGE_GB = 20;
export const DB_STORAGE_PRICE_PER_GB_MONTH = 2500;
export const DB_BACKUP_MONTHLY = 15000;

export const BUCKET_PRICE_PER_GB_MONTH = 600;
/** Ước lượng lưu lượng ra (egress) của một trang web tĩnh nhỏ mỗi tháng. */
export const WEBSITE_TRAFFIC_MONTHLY = 20000;

export const BUDGET_LIMIT = 500000;

export const FIREWALL_PORTS = [22, 80, 443, 3306, 5432] as const;
export type FirewallPort = (typeof FIREWALL_PORTS)[number];
/** "internal" = mạng riêng của tài khoản (10.0.0.0/16): chỉ các máy bên trong gọi vào được. */
export type RuleSource = "anywhere" | "myIp" | "internal";

export const MY_IP = "113.160.24.87";
export const INTERNAL_CIDR = "10.0.0.0/16";

/** Những tên kho đã có người khác lấy - tên kho là duy nhất trên TOÀN hệ thống. */
export const TAKEN_BUCKET_NAMES = [
  "test",
  "demo",
  "website",
  "my-bucket",
  "my-website",
  "bucket",
  "static-site",
  "backup",
  "images",
  "nimbo",
];

export interface SampleFile {
  key: string;
  sizeBytes: number;
  contentType: string;
}
/* i18n-ignore-start: tên tệp và kiểu MIME mẫu - dữ liệu kỹ thuật, giống nhau ở mọi ngôn ngữ. */
export const SAMPLE_FILES: SampleFile[] = [
  { key: "index.html", sizeBytes: 1240, contentType: "text/html" },
  { key: "style.css", sizeBytes: 860, contentType: "text/css" },
  { key: "logo.png", sizeBytes: 48200, contentType: "image/png" },
  { key: "error.html", sizeBytes: 540, contentType: "text/html" },
];
/* i18n-ignore-end */

export type VmState = "pending" | "running" | "stopping" | "stopped" | "terminated";

export interface FirewallRule {
  id: string;
  port: FirewallPort;
  source: RuleSource;
}

/** Khu khả dụng: hai trung tâm dữ liệu riêng bên trong một vùng. */
export type Az = "a" | "b";
export const AZ_IDS: Az[] = ["a", "b"];
/** Mạng con công khai có đường ra Internet và IP công khai; mạng con riêng thì không. */
export type Subnet = "public" | "private";

export type Tags = Record<string, string>;
export const MAX_TAGS = 5;

export interface Vm {
  id: string;
  name: string;
  region: RegionId;
  image: ImageId;
  size: VmSizeId;
  keyPair: string | null;
  state: VmState;
  stateSince: number;
  /** Giây đồng hồ lúc máy chuyển sang running gần nhất (null nếu chưa). */
  runningSince: number | null;
  publicIp: string | null;
  privateIp: string;
  rules: FirewallRule[];
  subnet: Subnet;
  az: Az;
  tags: Tags;
}

export interface BucketObject {
  key: string;
  sizeBytes: number;
  contentType: string;
}

export interface Bucket {
  name: string;
  region: RegionId;
  objects: BucketObject[];
  publicAccess: boolean;
  website: boolean;
  /** Chặn truy cập công khai: bật là đè lên mọi cài đặt công khai khác của kho. */
  blockPublicAccess: boolean;
  tags: Tags;
}

export type DbStatus = "creating" | "available";

export interface Db {
  id: string;
  name: string;
  region: RegionId;
  engine: DbEngine;
  size: DbSizeId;
  backups: boolean;
  publiclyAccessible: boolean;
  status: DbStatus;
  statusSince: number;
  /** Dữ liệu đã bị xoá nhầm/hỏng (bấm mô phỏng sự cố). Bản khôi phục từ ảnh chụp tốt thì sạch. */
  dataLost: boolean;
  tags: Tags;
}

/** Ảnh chụp thủ công: sống độc lập với cơ sở dữ liệu gốc, vẫn còn sau khi xoá nó. */
export interface Snapshot {
  id: string;
  dbName: string;
  engine: DbEngine;
  size: DbSizeId;
  region: RegionId;
  backups: boolean;
  at: number;
  /** Lúc chụp dữ liệu còn nguyên. */
  intact: boolean;
}

/** Ổ đĩa rời: gắn vào máy, và KHÔNG tự mất khi máy bị xoá. */
export interface Volume {
  id: string;
  name: string;
  region: RegionId;
  attachedTo: string | null;
  tags: Tags;
}
export const VOLUME_GB = 20;

export type IamService = "storage" | "database" | "compute" | "billing";
export type PolicyId =
  | "admin-access"
  | "storage-read"
  | "storage-full"
  | "database-read"
  | "database-full"
  | "compute-full"
  | "billing-read";
export const POLICY_IDS: PolicyId[] = [
  "admin-access",
  "storage-read",
  "storage-full",
  "database-read",
  "database-full",
  "compute-full",
  "billing-read",
];
export const POLICIES: Record<PolicyId, { service: IamService | "*"; level: "read" | "full" }> = {
  "admin-access": { service: "*", level: "full" },
  "storage-read": { service: "storage", level: "read" },
  "storage-full": { service: "storage", level: "full" },
  "database-read": { service: "database", level: "read" },
  "database-full": { service: "database", level: "full" },
  "compute-full": { service: "compute", level: "full" },
  "billing-read": { service: "billing", level: "read" },
};
export interface Identity {
  name: string;
  kind: "user" | "role";
  policies: PolicyId[];
  mfa: boolean;
}

export interface LoadBalancer {
  id: string;
  name: string;
  region: RegionId;
  targets: string[];
  status: "provisioning" | "active";
  statusSince: number;
}
export const LB_MONTHLY = 40000;
export const LB_PROVISION_SECONDS = 3;

export type LoadLevel = "normal" | "spike";
/** Số yêu cầu mỗi giây mà một máy mỗi cỡ gánh được ở 100% CPU. */
export const SIZE_CAPACITY: Record<VmSizeId, number> = { nano: 25, small: 50, medium: 100, large: 200 };
/** Tổng lượng yêu cầu mỗi giây đang đổ vào dịch vụ. */
export const LOAD_REQUESTS: Record<LoadLevel, number> = { normal: 40, spike: 150 };
export const ASG_MAX_LIMIT = 6;
export const ASG_COOLDOWN_SECONDS = 5;
/** Dưới mức CPU này thì nhóm thu bớt máy (về tối thiểu). */
export const ASG_SCALE_IN_CPU = 25;
export const SNAPSHOT_MONTHLY = 3000;

export interface AutoScalingGroup {
  id: string;
  name: string;
  region: RegionId;
  size: VmSizeId;
  min: number;
  max: number;
  /** Quá ngưỡng CPU trung bình này thì thêm máy. */
  scaleOutCpu: number;
  /** Mỗi phần tử là giây đồng hồ lúc máy đó sẵn sàng nhận việc. */
  instances: number[];
  lastScaleAt: number;
}

export interface BudgetAlert {
  limit: number;
  thresholds: number[];
}

export type HistoryKind =
  | "vm-launched"
  | "vm-started"
  | "vm-stopped"
  | "vm-terminated"
  | "bucket-created"
  | "bucket-deleted"
  | "db-created"
  | "db-deleted"
  | "volume-created"
  | "volume-attached"
  | "volume-deleted"
  | "snapshot-taken"
  | "db-data-lost"
  | "db-restored"
  | "traffic-spike"
  | "scaled-out";

export interface HistoryEvent {
  kind: HistoryKind;
  at: number;
  resourceId: string;
  monthlyBefore: number;
  monthlyAfter: number;
}

export interface CloudState {
  clock: number;
  seq: number;
  region: RegionId;
  vms: Vm[];
  buckets: Bucket[];
  databases: Db[];
  keyPairs: string[];
  history: HistoryEvent[];
  volumes: Volume[];
  identities: Identity[];
  lbs: LoadBalancer[];
  asgs: AutoScalingGroup[];
  snapshots: Snapshot[];
  budgetAlert: BudgetAlert | null;
  load: LoadLevel;
  /** Khu đang giả lập mất điện: máy ở khu đó không phục vụ được. */
  outageAz: Az | null;
}

export type CloudErrorCode =
  | "nameRequired"
  | "nameFormat"
  | "nameDuplicate"
  | "bucketLength"
  | "bucketChars"
  | "bucketEdge"
  | "bucketTaken"
  | "bucketNotEmpty"
  | "notFound"
  | "vmNotStopped"
  | "vmNotRunning"
  | "vmTerminated"
  | "ruleExists"
  | "keyPairFormat"
  | "volumeInUse"
  | "volumeNotAttached"
  | "regionMismatch"
  | "policyAttached"
  | "mfaNotForRole"
  | "targetExists"
  | "dbNotAvailable"
  | "asgRange"
  | "asgThreshold"
  | "tagFormat"
  | "tagLimit"
  | "budgetLimit"
  | "budgetThresholds";

export type Result = { ok: true; state: CloudState } | { ok: false; error: CloudErrorCode };

export const PENDING_SECONDS = 4;
export const STOPPING_SECONDS = 2;
export const DB_CREATING_SECONDS = 6;
/** Máy đã terminate còn hiện trong danh sách một lúc rồi biến mất, như console thật. */
export const TERMINATED_VISIBLE_SECONDS = 60;

export function initialState(): CloudState {
  return {
    clock: 0,
    seq: 0,
    region: "hcm",
    vms: [],
    buckets: [],
    databases: [],
    keyPairs: [],
    history: [],
    volumes: [],
    identities: [],
    lbs: [],
    asgs: [],
    snapshots: [],
    budgetAlert: null,
    load: "normal",
    outageAz: null,
  };
}

const ok = (state: CloudState): Result => ({ ok: true, state });
const fail = (error: CloudErrorCode): Result => ({ ok: false, error });

function hex(n: number, width: number): string {
  return n.toString(16).padStart(width, "0").slice(-width);
}

/** IP công khai trong dải tài liệu 203.0.113.0/24 (TEST-NET-3), không trỏ tới ai thật. */
function publicIpFor(seq: number): string {
  return `203.0.113.${((seq * 37) % 250) + 2}`;
}

function privateIpFor(seq: number, subnet: Subnet = "public"): string {
  return `10.0.${subnet === "public" ? 1 : 2}.${((seq * 13) % 240) + 10}`;
}

export function validateResourceName(name: string, existing: string[]): CloudErrorCode | null {
  const n = name.trim();
  if (!n) return "nameRequired";
  if (!/^[a-z0-9][a-z0-9-]{0,31}$/.test(n)) return "nameFormat";
  if (existing.includes(n)) return "nameDuplicate";
  return null;
}

export function validateBucketName(name: string, state: CloudState): CloudErrorCode | null {
  const n = name.trim();
  if (!n) return "nameRequired";
  if (n.length < 3 || n.length > 63) return "bucketLength";
  if (!/^[a-z0-9.-]+$/.test(n)) return "bucketChars";
  if (!/^[a-z0-9].*[a-z0-9]$/.test(n)) return "bucketEdge";
  if (TAKEN_BUCKET_NAMES.includes(n) || state.buckets.some((b) => b.name === n)) return "bucketTaken";
  return null;
}

/* ------------------------------------------------------------------ chi phí */

export type CostService = "compute" | "disk" | "storage" | "network" | "database";
export const COST_SERVICES: CostService[] = ["compute", "disk", "storage", "network", "database"];

export type CostNote =
  | "vmRunning"
  | "vmDisk"
  | "vmDiskStopped"
  | "bucketStorage"
  | "websiteTraffic"
  | "dbInstance"
  | "dbStorage"
  | "dbBackups"
  | "volumeAttached"
  | "volumeOrphan"
  | "lbBase"
  | "asgInstances"
  | "asgDisks"
  | "dbSnapshot";

export interface CostLine {
  service: CostService;
  resourceId: string;
  note: CostNote;
  monthly: number;
}

function isBilledRunning(vm: Vm): boolean {
  return vm.state === "pending" || vm.state === "running";
}

export function vmHourly(size: VmSizeId, region: RegionId): number {
  return Math.round(VM_SIZES[size].hourly * REGIONS[region].priceFactor);
}

export function vmMonthly(size: VmSizeId, region: RegionId): number {
  return Math.round(VM_SIZES[size].hourly * HOURS_PER_MONTH * REGIONS[region].priceFactor);
}

export function diskMonthly(region: RegionId): number {
  return Math.round(DISK_GB * DISK_PRICE_PER_GB_MONTH * REGIONS[region].priceFactor);
}

export function dbMonthly(size: DbSizeId, region: RegionId, backups: boolean): number {
  const f = REGIONS[region].priceFactor;
  return (
    Math.round(DB_SIZES[size].hourly * HOURS_PER_MONTH * f) +
    Math.round(DB_STORAGE_GB * DB_STORAGE_PRICE_PER_GB_MONTH * f) +
    (backups ? Math.round(DB_BACKUP_MONTHLY * f) : 0)
  );
}

export function bucketBytes(b: Bucket): number {
  return b.objects.reduce((s, o) => s + o.sizeBytes, 0);
}

/** Kho thật sự đọc được từ Internet: cho phép công khai VÀ không bị chặn truy cập công khai. */
export function bucketIsPublic(b: Bucket): boolean {
  return b.publicAccess && !b.blockPublicAccess;
}

/** Trang web tĩnh thật sự mở được: bật hosting, truy cập công khai không bị chặn, có index.html. */
export function isLiveWebsite(b: Bucket): boolean {
  return b.website && bucketIsPublic(b) && b.objects.some((o) => o.key === "index.html");
}

export function costLines(state: CloudState): CostLine[] {
  const lines: CostLine[] = [];
  for (const vm of state.vms) {
    if (vm.state === "terminated") continue;
    if (isBilledRunning(vm)) {
      lines.push({ service: "compute", resourceId: vm.id, note: "vmRunning", monthly: vmMonthly(vm.size, vm.region) });
    }
    lines.push({
      service: "disk",
      resourceId: vm.id,
      note: isBilledRunning(vm) ? "vmDisk" : "vmDiskStopped",
      monthly: diskMonthly(vm.region),
    });
  }
  for (const vol of state.volumes) {
    lines.push({
      service: "disk",
      resourceId: vol.id,
      note: vol.attachedTo ? "volumeAttached" : "volumeOrphan",
      monthly: diskMonthly(vol.region),
    });
  }
  for (const lb of state.lbs) {
    lines.push({ service: "network", resourceId: lb.id, note: "lbBase", monthly: Math.round(LB_MONTHLY * REGIONS[lb.region].priceFactor) });
  }
  for (const g of state.asgs) {
    if (g.instances.length === 0) continue;
    lines.push({ service: "compute", resourceId: g.id, note: "asgInstances", monthly: g.instances.length * vmMonthly(g.size, g.region) });
    lines.push({ service: "disk", resourceId: g.id, note: "asgDisks", monthly: g.instances.length * diskMonthly(g.region) });
  }
  for (const sn of state.snapshots) {
    lines.push({ service: "database", resourceId: sn.id, note: "dbSnapshot", monthly: Math.round(SNAPSHOT_MONTHLY * REGIONS[sn.region].priceFactor) });
  }
  for (const b of state.buckets) {
    const f = REGIONS[b.region].priceFactor;
    const gb = bucketBytes(b) / 1e9;
    // Làm tròn LÊN tới 1 đồng để người học thấy "có tính, nhưng rất rẻ", thay vì 0.
    if (b.objects.length > 0) {
      lines.push({
        service: "storage",
        resourceId: b.name,
        note: "bucketStorage",
        monthly: Math.max(1, Math.ceil(gb * BUCKET_PRICE_PER_GB_MONTH * f)),
      });
    }
    if (isLiveWebsite(b)) {
      lines.push({ service: "network", resourceId: b.name, note: "websiteTraffic", monthly: Math.round(WEBSITE_TRAFFIC_MONTHLY * f) });
    }
  }
  for (const db of state.databases) {
    const f = REGIONS[db.region].priceFactor;
    lines.push({ service: "database", resourceId: db.id, note: "dbInstance", monthly: Math.round(DB_SIZES[db.size].hourly * HOURS_PER_MONTH * f) });
    lines.push({ service: "database", resourceId: db.id, note: "dbStorage", monthly: Math.round(DB_STORAGE_GB * DB_STORAGE_PRICE_PER_GB_MONTH * f) });
    if (db.backups) {
      lines.push({ service: "database", resourceId: db.id, note: "dbBackups", monthly: Math.round(DB_BACKUP_MONTHLY * f) });
    }
  }
  return lines;
}

export function costByService(state: CloudState): Record<CostService, number> {
  const out: Record<CostService, number> = { compute: 0, disk: 0, storage: 0, network: 0, database: 0 };
  for (const l of costLines(state)) out[l.service] += l.monthly;
  return out;
}

export function monthlyTotal(state: CloudState): number {
  return costLines(state).reduce((s, l) => s + l.monthly, 0);
}

function record(before: CloudState, after: CloudState, kind: HistoryKind, resourceId: string): CloudState {
  return {
    ...after,
    history: [
      ...after.history,
      { kind, at: after.clock, resourceId, monthlyBefore: monthlyTotal(before), monthlyAfter: monthlyTotal(after) },
    ].slice(-100),
  };
}

/* ------------------------------------------------------------------ vùng */

export function setRegion(state: CloudState, region: RegionId): CloudState {
  return { ...state, region };
}

/* ------------------------------------------------------------------ máy ảo */

export interface LaunchVmInput {
  name: string;
  image: ImageId;
  size: VmSizeId;
  /** Tên cặp khoá: dùng lại cái có sẵn hoặc tạo mới; null = không gắn khoá. */
  keyPair: string | null;
  ports: FirewallPort[];
  sshSource: RuleSource;
  /** Mặc định: mạng con công khai. Mạng con riêng thì máy không có IP công khai. */
  subnet?: Subnet;
  /** Mặc định: khu a. */
  az?: Az;
}

export function launchVm(state: CloudState, input: LaunchVmInput): Result {
  const name = input.name.trim();
  const live = state.vms.filter((v) => v.state !== "terminated").map((v) => v.name);
  const nameError = validateResourceName(name, live);
  if (nameError) return fail(nameError);
  let keyPairs = state.keyPairs;
  if (input.keyPair !== null) {
    const kp = input.keyPair.trim();
    if (!/^[a-z0-9][a-z0-9-]{0,31}$/.test(kp)) return fail("keyPairFormat");
    if (!keyPairs.includes(kp)) keyPairs = [...keyPairs, kp];
  }
  const subnet: Subnet = input.subnet ?? "public";
  const seq = state.seq + 1;
  const rules: FirewallRule[] = [...new Set(input.ports)].map((port, i) => ({
    id: `sgr-${hex(seq * 16 + i, 6)}`,
    port,
    source: port === 22 ? input.sshSource : "anywhere",
  }));
  const vm: Vm = {
    id: `vm-${hex(seq * 2654435761, 8)}`,
    name,
    region: state.region,
    image: input.image,
    size: input.size,
    keyPair: input.keyPair === null ? null : input.keyPair.trim(),
    state: "pending",
    stateSince: state.clock,
    runningSince: null,
    publicIp: subnet === "private" ? null : publicIpFor(seq),
    privateIp: privateIpFor(seq, subnet),
    rules,
    subnet,
    az: input.az ?? "a",
    tags: {},
  };
  const next: CloudState = { ...state, seq, keyPairs, vms: [...state.vms, vm] };
  return ok(record(state, next, "vm-launched", vm.id));
}

function updateVm(state: CloudState, id: string, fn: (vm: Vm) => Vm): CloudState {
  return { ...state, vms: state.vms.map((v) => (v.id === id ? fn(v) : v)) };
}

export function stopVm(state: CloudState, id: string): Result {
  const vm = state.vms.find((v) => v.id === id);
  if (!vm) return fail("notFound");
  if (vm.state === "terminated") return fail("vmTerminated");
  if (vm.state !== "running" && vm.state !== "pending") return fail("vmNotRunning");
  const next = updateVm(state, id, (v) => ({ ...v, state: "stopping", stateSince: state.clock }));
  return ok(record(state, next, "vm-stopped", id));
}

export function startVm(state: CloudState, id: string): Result {
  const vm = state.vms.find((v) => v.id === id);
  if (!vm) return fail("notFound");
  if (vm.state === "terminated") return fail("vmTerminated");
  if (vm.state !== "stopped") return fail("vmNotStopped");
  const seq = state.seq + 1;
  // IP công khai tạm thời đổi mỗi lần khởi động lại - một bất ngờ kinh điển của người mới.
  const next = updateVm({ ...state, seq }, id, (v) => ({
    ...v,
    state: "pending",
    stateSince: state.clock,
    publicIp: vm.subnet === "private" ? null : publicIpFor(seq),
  }));
  return ok(record(state, next, "vm-started", id));
}

export function terminateVm(state: CloudState, id: string): Result {
  const vm = state.vms.find((v) => v.id === id);
  if (!vm) return fail("notFound");
  if (vm.state === "terminated") return fail("vmTerminated");
  // Ổ đĩa rời gắn vào máy thì được tháo ra và Ở LẠI - vẫn tính tiền, đúng như đám mây thật.
  const next = updateVm(
    { ...state, volumes: state.volumes.map((vol) => (vol.attachedTo === id ? { ...vol, attachedTo: null } : vol)) },
    id,
    (v) => ({
      ...v,
      state: "terminated",
      stateSince: state.clock,
      publicIp: null,
      runningSince: null,
    })
  );
  return ok(record(state, next, "vm-terminated", id));
}

export function addRule(state: CloudState, vmId: string, port: FirewallPort, source: RuleSource): Result {
  const vm = state.vms.find((v) => v.id === vmId);
  if (!vm) return fail("notFound");
  if (vm.state === "terminated") return fail("vmTerminated");
  if (vm.rules.some((r) => r.port === port && r.source === source)) return fail("ruleExists");
  const seq = state.seq + 1;
  const rule: FirewallRule = { id: `sgr-${hex(seq * 7919, 6)}`, port, source };
  return ok(updateVm({ ...state, seq }, vmId, (v) => ({ ...v, rules: [...v.rules, rule] })));
}

export function removeRule(state: CloudState, vmId: string, ruleId: string): Result {
  const vm = state.vms.find((v) => v.id === vmId);
  if (!vm || !vm.rules.some((r) => r.id === ruleId)) return fail("notFound");
  return ok(updateVm(state, vmId, (v) => ({ ...v, rules: v.rules.filter((r) => r.id !== ruleId) })));
}

export function liveVms(state: CloudState): Vm[] {
  return state.vms.filter((v) => v.state !== "terminated");
}

/* ------------------------------------------------------------------ kho lưu trữ */

export function createBucket(state: CloudState, name: string): Result {
  const n = name.trim();
  const err = validateBucketName(n, state);
  if (err) return fail(err);
  const bucket: Bucket = {
    name: n,
    region: state.region,
    objects: [],
    publicAccess: false,
    website: false,
    blockPublicAccess: false,
    tags: {},
  };
  return ok(record(state, { ...state, buckets: [...state.buckets, bucket] }, "bucket-created", n));
}

function updateBucket(state: CloudState, name: string, fn: (b: Bucket) => Bucket): Result {
  if (!state.buckets.some((b) => b.name === name)) return fail("notFound");
  return ok({ ...state, buckets: state.buckets.map((b) => (b.name === name ? fn(b) : b)) });
}

/** Tải lên một tệp mẫu. Trùng tên thì ghi đè, như kho đối tượng thật. */
export function uploadObject(state: CloudState, bucket: string, fileKey: string): Result {
  const file = SAMPLE_FILES.find((f) => f.key === fileKey);
  if (!file) return fail("notFound");
  return updateBucket(state, bucket, (b) => ({
    ...b,
    objects: [...b.objects.filter((o) => o.key !== file.key), { ...file }],
  }));
}

export function deleteObject(state: CloudState, bucket: string, key: string): Result {
  const b = state.buckets.find((x) => x.name === bucket);
  if (!b || !b.objects.some((o) => o.key === key)) return fail("notFound");
  return updateBucket(state, bucket, (x) => ({ ...x, objects: x.objects.filter((o) => o.key !== key) }));
}

export function setBucketPublic(state: CloudState, bucket: string, on: boolean): Result {
  return updateBucket(state, bucket, (b) => ({ ...b, publicAccess: on }));
}

export function setBlockPublicAccess(state: CloudState, bucket: string, on: boolean): Result {
  return updateBucket(state, bucket, (b) => ({ ...b, blockPublicAccess: on }));
}

export function setBucketWebsite(state: CloudState, bucket: string, on: boolean): Result {
  return updateBucket(state, bucket, (b) => ({ ...b, website: on }));
}

export function deleteBucket(state: CloudState, bucket: string): Result {
  const b = state.buckets.find((x) => x.name === bucket);
  if (!b) return fail("notFound");
  if (b.objects.length > 0) return fail("bucketNotEmpty");
  const next = { ...state, buckets: state.buckets.filter((x) => x.name !== bucket) };
  return ok(record(state, next, "bucket-deleted", bucket));
}

/* i18n-ignore-start: địa chỉ URL do hệ thống sinh ra, không phải câu chữ để dịch. */
export function websiteUrl(b: Bucket): string {
  return `http://${b.name}.website.${REGIONS[b.region].zone}.nimbo.cloud`;
}
/* i18n-ignore-end */

export type WebsiteResponse = 200 | 403 | 404;

/** Mở địa chỉ website của kho thì nhận được gì. */
export function websiteResponse(b: Bucket): WebsiteResponse {
  if (!b.website) return 404;
  if (!bucketIsPublic(b)) return 403;
  if (!b.objects.some((o) => o.key === "index.html")) return 404;
  return 200;
}

/* ------------------------------------------------------------------ cơ sở dữ liệu */

export interface CreateDbInput {
  name: string;
  engine: DbEngine;
  size: DbSizeId;
  backups: boolean;
  publiclyAccessible: boolean;
}

export function createDatabase(state: CloudState, input: CreateDbInput): Result {
  const name = input.name.trim();
  const err = validateResourceName(name, state.databases.map((d) => d.name));
  if (err) return fail(err);
  const seq = state.seq + 1;
  const db: Db = {
    id: `db-${hex(seq * 40503, 6)}`,
    name,
    region: state.region,
    engine: input.engine,
    size: input.size,
    backups: input.backups,
    publiclyAccessible: input.publiclyAccessible,
    status: "creating",
    statusSince: state.clock,
    dataLost: false,
    tags: {},
  };
  return ok(record(state, { ...state, seq, databases: [...state.databases, db] }, "db-created", db.id));
}

export function updateDatabase(
  state: CloudState,
  id: string,
  patch: Partial<Pick<Db, "backups" | "publiclyAccessible">>
): Result {
  if (!state.databases.some((d) => d.id === id)) return fail("notFound");
  return ok({ ...state, databases: state.databases.map((d) => (d.id === id ? { ...d, ...patch } : d)) });
}

export function deleteDatabase(state: CloudState, id: string): Result {
  if (!state.databases.some((d) => d.id === id)) return fail("notFound");
  const next = { ...state, databases: state.databases.filter((d) => d.id !== id) };
  return ok(record(state, next, "db-deleted", id));
}

/* i18n-ignore-start: tên máy chủ:cổng để kết nối, không phải câu chữ để dịch. */
export function dbEndpoint(db: Db): string {
  return `${db.name}.${db.id.slice(3)}.${REGIONS[db.region].zone}.db.nimbo.cloud:${DB_PORTS[db.engine]}`;
}
/* i18n-ignore-end */

/* ------------------------------------------------------------------ ổ đĩa rời */

export function createVolume(state: CloudState, name: string): Result {
  const n = name.trim();
  const err = validateResourceName(n, state.volumes.map((v) => v.name));
  if (err) return fail(err);
  const seq = state.seq + 1;
  const vol: Volume = { id: `vol-${hex(seq * 69069, 6)}`, name: n, region: state.region, attachedTo: null, tags: {} };
  return ok(record(state, { ...state, seq, volumes: [...state.volumes, vol] }, "volume-created", vol.id));
}

export function attachVolume(state: CloudState, volumeId: string, vmId: string): Result {
  const vol = state.volumes.find((v) => v.id === volumeId);
  const vm = state.vms.find((v) => v.id === vmId);
  if (!vol || !vm) return fail("notFound");
  if (vm.state === "terminated") return fail("vmTerminated");
  if (vol.attachedTo) return fail("volumeInUse");
  if (vol.region !== vm.region) return fail("regionMismatch");
  const next = { ...state, volumes: state.volumes.map((v) => (v.id === volumeId ? { ...v, attachedTo: vmId } : v)) };
  return ok(record(state, next, "volume-attached", volumeId));
}

export function detachVolume(state: CloudState, volumeId: string): Result {
  const vol = state.volumes.find((v) => v.id === volumeId);
  if (!vol) return fail("notFound");
  if (!vol.attachedTo) return fail("volumeNotAttached");
  return ok({ ...state, volumes: state.volumes.map((v) => (v.id === volumeId ? { ...v, attachedTo: null } : v)) });
}

export function deleteVolume(state: CloudState, volumeId: string): Result {
  const vol = state.volumes.find((v) => v.id === volumeId);
  if (!vol) return fail("notFound");
  if (vol.attachedTo) return fail("volumeInUse");
  const next = { ...state, volumes: state.volumes.filter((v) => v.id !== volumeId) };
  return ok(record(state, next, "volume-deleted", volumeId));
}

export function orphanVolumes(state: CloudState): Volume[] {
  return state.volumes.filter((v) => v.attachedTo === null);
}

/* ------------------------------------------------------------------ danh tính và quyền (IAM) */

export function identityCan(i: Identity, service: IamService, level: "read" | "full"): boolean {
  return i.policies.some((p) => {
    const g = POLICIES[p];
    return (g.service === "*" || g.service === service) && (g.level === "full" || level === "read");
  });
}

/** Có quyền trên MỌI dịch vụ - tương đương chìa khoá vạn năng. */
export function isAdmin(i: Identity): boolean {
  return i.policies.some((p) => POLICIES[p].service === "*");
}

export function createIdentity(state: CloudState, kind: Identity["kind"], name: string): Result {
  const n = name.trim();
  const err = validateResourceName(n, state.identities.map((i) => i.name));
  if (err) return fail(err);
  return ok({ ...state, identities: [...state.identities, { name: n, kind, policies: [], mfa: false }] });
}

function updateIdentity(state: CloudState, name: string, fn: (i: Identity) => Identity | null): Result {
  const found = state.identities.find((i) => i.name === name);
  if (!found) return fail("notFound");
  const out = fn(found);
  if (!out) return fail("mfaNotForRole");
  return ok({ ...state, identities: state.identities.map((i) => (i.name === name ? out : i)) });
}

export function attachPolicy(state: CloudState, name: string, policy: PolicyId): Result {
  if (!(policy in POLICIES)) return fail("notFound");
  const found = state.identities.find((i) => i.name === name);
  if (found?.policies.includes(policy)) return fail("policyAttached");
  return updateIdentity(state, name, (i) => ({ ...i, policies: [...i.policies, policy] }));
}

export function detachPolicy(state: CloudState, name: string, policy: PolicyId): Result {
  const found = state.identities.find((i) => i.name === name);
  if (found && !found.policies.includes(policy)) return fail("notFound");
  return updateIdentity(state, name, (i) => ({ ...i, policies: i.policies.filter((p) => p !== policy) }));
}

export function setMfa(state: CloudState, name: string, on: boolean): Result {
  return updateIdentity(state, name, (i) => (i.kind === "user" ? { ...i, mfa: on } : null));
}

export function deleteIdentity(state: CloudState, name: string): Result {
  if (!state.identities.some((i) => i.name === name)) return fail("notFound");
  return ok({ ...state, identities: state.identities.filter((i) => i.name !== name) });
}

/* ------------------------------------------------------------------ cân bằng tải */

export function createLoadBalancer(state: CloudState, name: string): Result {
  const n = name.trim();
  const err = validateResourceName(n, state.lbs.map((l) => l.name));
  if (err) return fail(err);
  const seq = state.seq + 1;
  const lb: LoadBalancer = {
    id: `lb-${hex(seq * 31337, 6)}`,
    name: n,
    region: state.region,
    targets: [],
    status: "provisioning",
    statusSince: state.clock,
  };
  return ok({ ...state, seq, lbs: [...state.lbs, lb] });
}

function updateLb(state: CloudState, id: string, fn: (l: LoadBalancer) => Result | LoadBalancer): Result {
  const lb = state.lbs.find((l) => l.id === id);
  if (!lb) return fail("notFound");
  const out = fn(lb);
  if ("ok" in out) return out;
  return ok({ ...state, lbs: state.lbs.map((l) => (l.id === id ? out : l)) });
}

export function addTarget(state: CloudState, lbId: string, vmId: string): Result {
  const vm = state.vms.find((v) => v.id === vmId);
  if (!vm) return fail("notFound");
  if (vm.state === "terminated") return fail("vmTerminated");
  return updateLb(state, lbId, (lb) => {
    if (lb.targets.includes(vmId)) return fail("targetExists");
    if (lb.region !== vm.region) return fail("regionMismatch");
    return { ...lb, targets: [...lb.targets, vmId] };
  });
}

export function removeTarget(state: CloudState, lbId: string, vmId: string): Result {
  return updateLb(state, lbId, (lb) => (lb.targets.includes(vmId) ? { ...lb, targets: lb.targets.filter((t) => t !== vmId) } : fail("notFound")));
}

export function deleteLoadBalancer(state: CloudState, lbId: string): Result {
  if (!state.lbs.some((l) => l.id === lbId)) return fail("notFound");
  return ok({ ...state, lbs: state.lbs.filter((l) => l.id !== lbId) });
}

/** Giả lập mất điện cả một khu khả dụng (hoặc null = hết sự cố). */
export function setOutage(state: CloudState, az: Az | null): CloudState {
  return { ...state, outageAz: az };
}

/** Máy đạt kiểm tra sức khoẻ: đang chạy, không nằm ở khu mất điện, và cổng 80 mở cho bộ cân bằng tải. */
export function targetHealthy(state: CloudState, vm: Vm): boolean {
  return (
    vm.state === "running" &&
    state.outageAz !== vm.az &&
    vm.rules.some((r) => r.port === 80 && (r.source === "anywhere" || r.source === "internal"))
  );
}

export function lbTargets(state: CloudState, lb: LoadBalancer): Vm[] {
  return lb.targets.map((id) => state.vms.find((v) => v.id === id)).filter((v): v is Vm => !!v && v.state !== "terminated");
}

export function lbHealthyTargets(state: CloudState, lb: LoadBalancer): Vm[] {
  return lbTargets(state, lb).filter((v) => targetHealthy(state, v));
}

/** Khách gọi vào bộ cân bằng tải thì nhận 200 (có máy khoẻ nhận việc) hay 503 (không máy nào). */
export function lbResponse(state: CloudState, lb: LoadBalancer): 200 | 503 {
  return lb.status === "active" && lbHealthyTargets(state, lb).length > 0 ? 200 : 503;
}

/** Vẫn phục vụ được dù MỘT khu bất kỳ mất điện - phép thử dự phòng thật sự. */
export function lbSurvivesAnyZoneOutage(state: CloudState, lb: LoadBalancer): boolean {
  return AZ_IDS.every((az) => lbResponse({ ...state, outageAz: az }, lb) === 200);
}

/* ------------------------------------------------------------------ tự mở rộng */

export interface CreateAsgInput {
  name: string;
  size: VmSizeId;
  min: number;
  max: number;
  scaleOutCpu: number;
}

export function createAutoScalingGroup(state: CloudState, input: CreateAsgInput): Result {
  const name = input.name.trim();
  const err = validateResourceName(name, state.asgs.map((g) => g.name));
  if (err) return fail(err);
  const { min, max, scaleOutCpu } = input;
  if (!Number.isInteger(min) || !Number.isInteger(max) || min < 1 || max < min || max > ASG_MAX_LIMIT) return fail("asgRange");
  if (!Number.isInteger(scaleOutCpu) || scaleOutCpu < 30 || scaleOutCpu > 90) return fail("asgThreshold");
  const seq = state.seq + 1;
  const g: AutoScalingGroup = {
    id: `asg-${hex(seq * 48271, 6)}`,
    name,
    region: state.region,
    size: input.size,
    min,
    max,
    scaleOutCpu,
    instances: Array.from({ length: min }, () => state.clock + PENDING_SECONDS),
    lastScaleAt: state.clock,
  };
  return ok(record(state, { ...state, seq, asgs: [...state.asgs, g] }, "vm-launched", g.id));
}

export function deleteAutoScalingGroup(state: CloudState, id: string): Result {
  if (!state.asgs.some((g) => g.id === id)) return fail("notFound");
  return ok({ ...state, asgs: state.asgs.filter((g) => g.id !== id) });
}

/** Đổi mức tải đổ vào dịch vụ: bình thường hoặc đột biến (chiến dịch, flash sale). */
export function setLoad(state: CloudState, load: LoadLevel): CloudState {
  const next = { ...state, load };
  return load === "spike" && state.load !== "spike" ? record(state, next, "traffic-spike", "load") : next;
}

export function asgReady(g: AutoScalingGroup, clock: number): number {
  return g.instances.filter((t) => t <= clock).length;
}

/** % CPU trung bình của nhóm: tải chia đều cho các máy ĐÃ sẵn sàng. */
export function asgCpu(state: CloudState, g: AutoScalingGroup): number {
  const ready = asgReady(g, state.clock);
  if (ready === 0) return 100;
  return Math.min(100, Math.round((LOAD_REQUESTS[state.load] / (ready * SIZE_CAPACITY[g.size])) * 100));
}

/* ------------------------------------------------------------------ thẻ chi phí */

export type TaggableKind = "vm" | "bucket" | "db" | "volume";

const TAG_KEY = /^[a-z][a-z0-9-]{0,19}$/;
const TAG_VALUE = /^[a-z0-9][a-z0-9-]{0,29}$/;

function mapTags(state: CloudState, kind: TaggableKind, id: string, fn: (t: Tags) => Tags | null): Result {
  let found = false;
  let failed = false;
  const apply = <T extends { tags: Tags }>(item: T): T => {
    found = true;
    const out = fn(item.tags);
    if (!out) {
      failed = true;
      return item;
    }
    return { ...item, tags: out };
  };
  const next: CloudState =
    kind === "vm"
      ? { ...state, vms: state.vms.map((x) => (x.id === id ? apply(x) : x)) }
      : kind === "bucket"
        ? { ...state, buckets: state.buckets.map((x) => (x.name === id ? apply(x) : x)) }
        : kind === "db"
          ? { ...state, databases: state.databases.map((x) => (x.id === id ? apply(x) : x)) }
          : { ...state, volumes: state.volumes.map((x) => (x.id === id ? apply(x) : x)) };
  if (!found) return fail("notFound");
  if (failed) return fail("tagLimit");
  return ok(next);
}

export function setTag(state: CloudState, kind: TaggableKind, id: string, key: string, value: string): Result {
  const k = key.trim();
  const v = value.trim();
  if (!TAG_KEY.test(k) || !TAG_VALUE.test(v)) return fail("tagFormat");
  return mapTags(state, kind, id, (tags) => (k in tags || Object.keys(tags).length < MAX_TAGS ? { ...tags, [k]: v } : null));
}

export function removeTag(state: CloudState, kind: TaggableKind, id: string, key: string): Result {
  return mapTags(state, kind, id, (tags) => Object.fromEntries(Object.entries(tags).filter(([k]) => k !== key)));
}

/** Mọi tài nguyên gắn thẻ được còn sống: máy, kho, cơ sở dữ liệu, ổ đĩa rời. */
export function taggableResources(state: CloudState): { kind: TaggableKind; id: string; tags: Tags }[] {
  return [
    ...liveVms(state).map((v) => ({ kind: "vm" as const, id: v.id, tags: v.tags })),
    ...state.buckets.map((b) => ({ kind: "bucket" as const, id: b.name, tags: b.tags })),
    ...state.databases.map((d) => ({ kind: "db" as const, id: d.id, tags: d.tags })),
    ...state.volumes.map((v) => ({ kind: "volume" as const, id: v.id, tags: v.tags })),
  ];
}

/** Hoá đơn gộp theo giá trị của một thẻ. Khoản không có thẻ rơi vào khoá "" (không rõ chủ). */
export function costByTag(state: CloudState, key: string): Record<string, number> {
  const owner = new Map(taggableResources(state).map((r) => [r.id, r.tags[key] ?? ""]));
  const out: Record<string, number> = {};
  for (const l of costLines(state)) {
    const v = owner.get(l.resourceId) ?? "";
    out[v] = (out[v] ?? 0) + l.monthly;
  }
  return out;
}

/* ------------------------------------------------------------------ ảnh chụp và khôi phục */

export function takeSnapshot(state: CloudState, dbId: string): Result {
  const db = state.databases.find((d) => d.id === dbId);
  if (!db) return fail("notFound");
  if (db.status !== "available") return fail("dbNotAvailable");
  const seq = state.seq + 1;
  const snap: Snapshot = {
    id: `snap-${hex(seq * 52711, 6)}`,
    dbName: db.name,
    engine: db.engine,
    size: db.size,
    region: db.region,
    backups: db.backups,
    at: state.clock,
    intact: !db.dataLost,
  };
  return ok(record(state, { ...state, seq, snapshots: [...state.snapshots, snap] }, "snapshot-taken", snap.id));
}

export function deleteSnapshot(state: CloudState, snapId: string): Result {
  if (!state.snapshots.some((x) => x.id === snapId)) return fail("notFound");
  return ok({ ...state, snapshots: state.snapshots.filter((x) => x.id !== snapId) });
}

/** Mô phỏng sự cố: ai đó chạy lệnh xoá không có điều kiện lọc. */
export function simulateDataLoss(state: CloudState, dbId: string): Result {
  const db = state.databases.find((d) => d.id === dbId);
  if (!db) return fail("notFound");
  if (db.status !== "available") return fail("dbNotAvailable");
  const next = { ...state, databases: state.databases.map((d) => (d.id === dbId ? { ...d, dataLost: true } : d)) };
  return ok(record(state, next, "db-data-lost", dbId));
}

/** Khôi phục LUÔN tạo một cơ sở dữ liệu MỚI từ ảnh chụp, không ghi đè cái cũ. */
export function restoreDatabase(state: CloudState, snapId: string, newName: string): Result {
  const snap = state.snapshots.find((x) => x.id === snapId);
  if (!snap) return fail("notFound");
  const name = newName.trim();
  const err = validateResourceName(name, state.databases.map((d) => d.name));
  if (err) return fail(err);
  const seq = state.seq + 1;
  const db: Db = {
    id: `db-${hex(seq * 40503, 6)}`,
    name,
    region: snap.region,
    engine: snap.engine,
    size: snap.size,
    backups: snap.backups,
    publiclyAccessible: false,
    status: "creating",
    statusSince: state.clock,
    dataLost: !snap.intact,
    tags: {},
  };
  return ok(record(state, { ...state, seq, databases: [...state.databases, db] }, "db-restored", db.id));
}

/* ------------------------------------------------------------------ cảnh báo ngân sách */

export function setBudgetAlert(state: CloudState, limit: number, thresholds: number[]): Result {
  if (!Number.isInteger(limit) || limit < 1000 || limit > 100_000_000) return fail("budgetLimit");
  const set = [...new Set(thresholds)].sort((a, b) => a - b);
  if (set.length === 0 || set.length > 5 || set.some((t) => !Number.isInteger(t) || t < 1 || t > 100)) return fail("budgetThresholds");
  return ok({ ...state, budgetAlert: { limit, thresholds: set } });
}

export function clearBudgetAlert(state: CloudState): CloudState {
  return { ...state, budgetAlert: null };
}

/** Ngưỡng cao nhất đã chạm (theo % ngân sách của cảnh báo), hoặc null. */
export function budgetAlertReached(state: CloudState): number | null {
  const a = state.budgetAlert;
  if (!a) return null;
  const pct = (monthlyTotal(state) / a.limit) * 100;
  const hit = a.thresholds.filter((t) => pct >= t);
  return hit.length ? Math.max(...hit) : null;
}

/* ------------------------------------------------------------------ thời gian */

/** Đẩy đồng hồ lên `seconds` giây và cho các tài nguyên đi tiếp vòng đời. */
export function tick(state: CloudState, seconds = 1): CloudState {
  let s = state;
  for (let i = 0; i < seconds; i++) s = tickOnce(s);
  return s;
}

function tickOnce(state: CloudState): CloudState {
  const clock = state.clock + 1;
  const vms = state.vms
    .map((v): Vm => {
      const age = clock - v.stateSince;
      if (v.state === "pending" && age >= PENDING_SECONDS) {
        return { ...v, state: "running", stateSince: clock, runningSince: clock };
      }
      if (v.state === "stopping" && age >= STOPPING_SECONDS) {
        return { ...v, state: "stopped", stateSince: clock, publicIp: null, runningSince: null };
      }
      return v;
    })
    .filter((v) => !(v.state === "terminated" && clock - v.stateSince > TERMINATED_VISIBLE_SECONDS));
  const databases = state.databases.map((d): Db =>
    d.status === "creating" && clock - d.statusSince >= DB_CREATING_SECONDS
      ? { ...d, status: "available", statusSince: clock }
      : d
  );
  const lbs = state.lbs.map((l): LoadBalancer =>
    l.status === "provisioning" && clock - l.statusSince >= LB_PROVISION_SECONDS ? { ...l, status: "active", statusSince: clock } : l
  );
  let next: CloudState = { ...state, clock, vms, databases, lbs };
  for (const g of state.asgs) next = scaleGroup(next, g.id);
  return next;
}

/** Một lượt đánh giá chính sách: CPU vượt ngưỡng thì thêm máy, rảnh quá thì bớt, có thời gian nghỉ giữa hai lần. */
function scaleGroup(state: CloudState, id: string): CloudState {
  const g = state.asgs.find((x) => x.id === id);
  if (!g || state.clock - g.lastScaleAt < ASG_COOLDOWN_SECONDS) return state;
  const cpu = asgCpu(state, g);
  const put = (ng: AutoScalingGroup) => ({ ...state, asgs: state.asgs.map((x) => (x.id === id ? ng : x)) });
  if (cpu > g.scaleOutCpu && g.instances.length < g.max) {
    const ng = { ...g, instances: [...g.instances, state.clock + PENDING_SECONDS], lastScaleAt: state.clock };
    return record(state, put(ng), "scaled-out", id);
  }
  if (cpu < ASG_SCALE_IN_CPU && g.instances.length > g.min) {
    return put({ ...g, instances: g.instances.slice(0, -1), lastScaleAt: state.clock });
  }
  return state;
}

/* ------------------------------------------------------------------ giám sát */

function hash(n: number): number {
  let x = n | 0;
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b);
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b);
  x ^= x >>> 16;
  return (x >>> 0) / 0xffffffff;
}

function seedOf(id: string): number {
  let h = 17;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) | 0;
  return h;
}

/**
 * Chuỗi % CPU của `points` giây gần nhất, sinh tất định từ id máy và đồng hồ.
 * Giây nào máy chưa chạy thì là null (biểu đồ để trống chỗ đó). Máy mở cổng
 * web bận hơn một chút - có "khách" ghé thăm.
 */
export function cpuSeries(vm: Vm, clock: number, points = 30): (number | null)[] {
  const seed = seedOf(vm.id);
  const serving = vm.rules.some((r) => r.port === 80 || r.port === 443);
  const base = (vm.size === "nano" ? 22 : vm.size === "small" ? 14 : vm.size === "medium" ? 8 : 5) + (serving ? 10 : 0);
  const out: (number | null)[] = [];
  for (let t = clock - points + 1; t <= clock; t++) {
    if (vm.runningSince === null || t < vm.runningSince) {
      out.push(null);
      continue;
    }
    const sinceBoot = t - vm.runningSince;
    const boot = sinceBoot < 5 ? 45 - sinceBoot * 8 : 0; // khởi động thì CPU vọt lên
    const wave = Math.sin((t + (seed % 17)) / 4) * 6;
    const noise = hash(seed + t * 101) * 10;
    const spike = hash(seed * 3 + Math.floor(t / 7)) > 0.9 ? 30 : 0;
    out.push(Math.max(1, Math.min(100, Math.round(base + boot + wave + noise + spike))));
  }
  return out;
}

/* ------------------------------------------------------------------ cảnh báo */

export type Warning =
  | { kind: "sshOpenWorld"; vmId: string }
  | { kind: "dbPortOpenWorld"; vmId: string; port: FirewallPort }
  | { kind: "dbPublic"; dbId: string }
  | { kind: "dbNoBackups"; dbId: string }
  | { kind: "overBudget"; total: number }
  | { kind: "identityAdmin"; name: string }
  | { kind: "userNoMfa"; name: string }
  | { kind: "orphanVolume"; volumeId: string }
  | { kind: "lbSingleZone"; lbId: string }
  | { kind: "budgetAlert"; pct: number; total: number };

export function warnings(state: CloudState): Warning[] {
  const out: Warning[] = [];
  for (const vm of liveVms(state)) {
    if (vm.rules.some((r) => r.port === 22 && r.source === "anywhere")) out.push({ kind: "sshOpenWorld", vmId: vm.id });
    for (const r of vm.rules) {
      if ((r.port === 3306 || r.port === 5432) && r.source === "anywhere") {
        out.push({ kind: "dbPortOpenWorld", vmId: vm.id, port: r.port });
      }
    }
  }
  for (const db of state.databases) {
    if (db.publiclyAccessible) out.push({ kind: "dbPublic", dbId: db.id });
    if (!db.backups) out.push({ kind: "dbNoBackups", dbId: db.id });
  }
  for (const i of state.identities) {
    if (isAdmin(i)) out.push({ kind: "identityAdmin", name: i.name });
    if (i.kind === "user" && !i.mfa) out.push({ kind: "userNoMfa", name: i.name });
  }
  for (const v of orphanVolumes(state)) out.push({ kind: "orphanVolume", volumeId: v.id });
  for (const lb of state.lbs) {
    const zones = new Set(lbHealthyTargets(state, lb).map((v) => v.az));
    if (lb.targets.length > 0 && zones.size < 2) out.push({ kind: "lbSingleZone", lbId: lb.id });
  }
  const total = monthlyTotal(state);
  const reached = budgetAlertReached(state);
  if (reached !== null) out.push({ kind: "budgetAlert", pct: reached, total });
  if (total > BUDGET_LIMIT) out.push({ kind: "overBudget", total });
  return out;
}

/** Đọc lại trạng thái đã lưu; hình dạng lạ thì bắt đầu lại từ đầu. */
export function parseState(raw: unknown): CloudState | null {
  if (typeof raw !== "object" || raw === null) return null;
  const s = raw as Partial<CloudState>;
  if (
    typeof s.clock !== "number" ||
    typeof s.seq !== "number" ||
    typeof s.region !== "string" ||
    !(s.region in REGIONS) ||
    !Array.isArray(s.vms) ||
    !Array.isArray(s.buckets) ||
    !Array.isArray(s.databases) ||
    !Array.isArray(s.keyPairs) ||
    !Array.isArray(s.history)
  ) {
    return null;
  }
  // Trạng thái lưu từ phiên bản cũ chưa có các trường mới: điền mặc định thay vì bỏ.
  const base = initialState();
  const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
  return {
    ...base,
    ...(s as CloudState),
    vms: (s.vms as Partial<Vm>[]).map((v) => ({ subnet: "public", az: "a", tags: {}, ...v }) as Vm),
    buckets: (s.buckets as Partial<Bucket>[]).map((b) => ({ blockPublicAccess: false, tags: {}, ...b }) as Bucket),
    databases: (s.databases as Partial<Db>[]).map((d) => ({ dataLost: false, tags: {}, ...d }) as Db),
    volumes: arr<Partial<Volume>>(s.volumes).map((v) => ({ tags: {}, ...v }) as Volume),
    identities: arr<Identity>(s.identities),
    lbs: arr<LoadBalancer>(s.lbs),
    asgs: arr<AutoScalingGroup>(s.asgs),
    snapshots: arr<Snapshot>(s.snapshots),
    budgetAlert: s.budgetAlert ?? null,
    load: s.load === "spike" ? "spike" : "normal",
    outageAz: s.outageAz === "a" || s.outageAz === "b" ? s.outageAz : null,
  };
}
