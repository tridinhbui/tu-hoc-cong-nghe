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
}

export const CLOUD_MISSIONS: CloudMission[] = [
  {
    id: "launch-vm",
    check: (s) => s.vms.some((v) => v.image === "ubuntu" && v.size === "small" && v.state === "running"),
  },
  {
    id: "open-http",
    check: (s) => s.vms.some((v) => v.state === "running" && v.rules.some((r) => r.port === 80 && r.source === "anywhere")),
  },
  {
    id: "ssh-my-ip",
    check: (s) =>
      liveVms(s).some(
        (v) =>
          v.rules.some((r) => r.port === 22 && r.source === "myIp") &&
          !v.rules.some((r) => r.port === 22 && r.source === "anywhere")
      ),
  },
  {
    id: "static-website",
    check: (s) => s.buckets.some(isLiveWebsite),
  },
  {
    id: "safe-database",
    check: (s) => s.databases.some((d) => d.status === "available" && d.backups && !d.publiclyAccessible),
  },
  {
    id: "stop-vm",
    check: (s) => s.history.some((h) => h.kind === "vm-stopped" && h.monthlyAfter < h.monthlyBefore),
  },
  {
    id: "budget",
    // Phải từng VƯỢT ngân sách rồi kéo về: chỉ "đang dưới mức" thì người học
    // đạt được luôn trên đường làm nhiệm vụ 4, chưa kịp học gì về cắt giảm.
    check: (s) =>
      s.history.some((h) => h.monthlyAfter > BUDGET_LIMIT) &&
      monthlyTotal(s) < BUDGET_LIMIT &&
      s.vms.some((v) => v.state === "running") &&
      s.buckets.some(isLiveWebsite),
  },
  {
    id: "clean-up",
    check: (s) =>
      s.history.some((h) => h.kind === "vm-terminated") &&
      liveVms(s).length === 0 &&
      s.buckets.length === 0 &&
      s.databases.length === 0 &&
      monthlyTotal(s) === 0,
  },
];

/** Gộp nhiệm vụ vừa đạt vào danh sách đã xong (không bao giờ bỏ bớt). */
export function mergeCompleted(done: string[], state: CloudState): string[] {
  const next = new Set(done);
  for (const m of CLOUD_MISSIONS) if (m.check(state)) next.add(m.id);
  return next.size === done.length ? done : CLOUD_MISSIONS.map((m) => m.id).filter((id) => next.has(id));
}
