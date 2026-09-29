import { TRACK_PERSONAL, type Stage } from "@/lib/track-stages";

/**
 * Bản đồ hệ thống của Game Kingdom: mỗi node là một chặng của track Nền tảng
 * công nghệ, và nó "lên mạng" khi người học đã xong mọi bài của chặng đó.
 *
 * Tiến độ đọc từ đúng thứ trang game đã có - danh sách `lesson_id` đã hoàn
 * thành trong `user_progress` - nên không có bảng nào mới, không ghi gì thêm.
 *
 * Node trỏ tới chặng bằng id bài ĐẦU dải (`days[0]`) chứ không bằng `label`:
 * id bài là thứ tiến độ của người học được ghi theo, nên nó không đổi; còn
 * chuỗi "Chặng N" là chữ tiếng Việt, và đặt nó trong một hằng số ở đây là
 * đúng kiểu khoá-bằng-câu-chữ mà lib/stage-topics.ts ghi lại ba lần vỡ.
 */

export type SystemNodeKey =
  | "shell"
  | "git"
  | "runtime"
  | "ui"
  | "interaction"
  | "logic"
  | "api"
  | "storage"
  | "deploy";

export type SystemLayerKey = "workstation" | "app" | "infra";

export type NodeState = "online" | "booting" | "offline";

interface SystemNodeDef {
  key: SystemNodeKey;
  layer: SystemLayerKey;
  /** `days[0]` của chặng trong TRACK_PERSONAL. */
  stageStart: number;
}

/** Thứ tự ở đây là thứ tự khởi động: đúng thứ tự chặng của track. */
export const SYSTEM_NODES: readonly SystemNodeDef[] = [
  { key: "shell", layer: "workstation", stageStart: 263 },
  { key: "git", layer: "workstation", stageStart: 1301 },
  { key: "runtime", layer: "workstation", stageStart: 1 },
  { key: "ui", layer: "app", stageStart: 201 },
  { key: "interaction", layer: "app", stageStart: 221 },
  { key: "logic", layer: "app", stageStart: 241 },
  { key: "api", layer: "infra", stageStart: 269 },
  { key: "storage", layer: "infra", stageStart: 279 },
  { key: "deploy", layer: "infra", stageStart: 289 },
];

export const SYSTEM_LAYERS: readonly SystemLayerKey[] = ["workstation", "app", "infra"];

export interface SystemNodeStatus {
  key: SystemNodeKey;
  layer: SystemLayerKey;
  done: number;
  total: number;
  state: NodeState;
}

export interface SystemMapStatus {
  nodes: SystemNodeStatus[];
  online: number;
  lessonsDone: number;
  lessonsTotal: number;
  /** Node đầu tiên chưa online theo thứ tự khởi động; null khi cả hệ thống đã lên. */
  next: SystemNodeStatus | null;
  allOnline: boolean;
}

function stageLessonIds(stage: Stage): number[] {
  const ids: number[] = [];
  for (let id = stage.days[0]; id <= stage.days[1]; id++) ids.push(id);
  for (const id of stage.extraLessonIds ?? []) if (!ids.includes(id)) ids.push(id);
  return ids;
}

export function computeSystemMap(
  completedLessonIds: Iterable<number>,
  stages: readonly Stage[] = TRACK_PERSONAL.stages,
): SystemMapStatus {
  const completed = new Set(completedLessonIds);
  const nodes: SystemNodeStatus[] = [];

  for (const def of SYSTEM_NODES) {
    const stage = stages.find((s) => s.days[0] === def.stageStart);
    // Một chặng biến mất khỏi track thì node của nó biến mất theo, thay vì
    // hiện một node 0/0 không bao giờ lên được.
    if (!stage) continue;
    const ids = stageLessonIds(stage);
    const done = ids.filter((id) => completed.has(id)).length;
    const total = ids.length;
    const state: NodeState = total > 0 && done >= total ? "online" : done > 0 ? "booting" : "offline";
    nodes.push({ key: def.key, layer: def.layer, done, total, state });
  }

  const online = nodes.filter((n) => n.state === "online").length;
  return {
    nodes,
    online,
    lessonsDone: nodes.reduce((s, n) => s + n.done, 0),
    lessonsTotal: nodes.reduce((s, n) => s + n.total, 0),
    next: nodes.find((n) => n.state !== "online") ?? null,
    allOnline: nodes.length > 0 && online === nodes.length,
  };
}
