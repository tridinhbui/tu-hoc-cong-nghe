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

export type VmSizeId = "nano" | "small" | "medium";
export const VM_SIZES: Record<VmSizeId, { vcpu: number; ramGb: number; hourly: number }> = {
  nano: { vcpu: 1, ramGb: 0.5, hourly: 150 },
  small: { vcpu: 1, ramGb: 2, hourly: 400 },
  medium: { vcpu: 2, ramGb: 4, hourly: 800 },
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
export type RuleSource = "anywhere" | "myIp";

export const MY_IP = "113.160.24.87";

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
}

export type HistoryKind =
  | "vm-launched"
  | "vm-started"
  | "vm-stopped"
  | "vm-terminated"
  | "bucket-created"
  | "bucket-deleted"
  | "db-created"
  | "db-deleted";

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
  | "keyPairFormat";

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

function privateIpFor(seq: number): string {
  return `10.0.1.${((seq * 13) % 240) + 10}`;
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
  | "dbBackups";

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

/** Trang web tĩnh thật sự mở được: bật hosting, cho phép truy cập công khai, có index.html. */
export function isLiveWebsite(b: Bucket): boolean {
  return b.website && b.publicAccess && b.objects.some((o) => o.key === "index.html");
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
    publicIp: publicIpFor(seq),
    privateIp: privateIpFor(seq),
    rules,
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
    publicIp: publicIpFor(seq),
  }));
  return ok(record(state, next, "vm-started", id));
}

export function terminateVm(state: CloudState, id: string): Result {
  const vm = state.vms.find((v) => v.id === id);
  if (!vm) return fail("notFound");
  if (vm.state === "terminated") return fail("vmTerminated");
  const next = updateVm(state, id, (v) => ({
    ...v,
    state: "terminated",
    stateSince: state.clock,
    publicIp: null,
    runningSince: null,
  }));
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
  const bucket: Bucket = { name: n, region: state.region, objects: [], publicAccess: false, website: false };
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
  if (!b.publicAccess) return 403;
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
  return { ...state, clock, vms, databases };
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
  const base = (vm.size === "nano" ? 22 : vm.size === "small" ? 14 : 8) + (serving ? 10 : 0);
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
  | { kind: "overBudget"; total: number };

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
  const total = monthlyTotal(state);
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
  return s as CloudState;
}
