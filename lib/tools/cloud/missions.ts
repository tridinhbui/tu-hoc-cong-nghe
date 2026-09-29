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
  isLiveWebsite,
  liveVms,
  monthlyTotal,
  type CloudState,
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
const noResources = (s: CloudState) => liveVms(s).length === 0 && s.buckets.length === 0 && s.databases.length === 0;

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
];

/** Gộp nhiệm vụ vừa đạt vào danh sách đã xong (không bao giờ bỏ bớt). */
export function mergeCompleted(done: string[], state: CloudState): string[] {
  const next = new Set(done);
  for (const m of CLOUD_MISSIONS) if (m.check(state)) next.add(m.id);
  return next.size === done.length ? done : CLOUD_MISSIONS.map((m) => m.id).filter((id) => next.has(id));
}
