import "server-only";
import type { CloudflareClient } from "@/lib/cloudflare";
import { EXERCISES } from "@/lib/exercise-index";
import { getInterviewQuestionById } from "@/lib/interview-bank";
import { getCertTrack } from "@/lib/cert-tracks";
import { getTrackStages, type StageExamTrack } from "@/lib/stage-exam";
import { isLessonInRange, type Stage } from "@/lib/track-stages";
import { TERMINAL_MISSIONS } from "@/lib/tools/terminal/missions";
import { EDITOR_MISSION_IDS } from "@/lib/tools/editor/missions";
import { SQL_MISSION_IDS } from "@/lib/tools/sql/missions";
import { API_MISSIONS } from "@/lib/tools/api/missions";
import { CLOUD_MISSIONS } from "@/lib/tools/cloud/missions";
import {
  EVIDENCE_POINTS,
  certArea,
  certRef,
  exerciseRef,
  interviewArea,
  interviewRef,
  parseExerciseRef,
  parseToolRef,
  stageArea,
  stageNumberOf,
  stageRef,
  toolMissionArea,
  toolRef,
  type EvidenceRow,
  type EvidenceSource,
  type SkillArea,
} from "@/lib/practical-skill";

/**
 * Phía máy chủ của chỉ số năng lực thực hành: đối chiếu ref với danh mục thật,
 * dựng hàng bằng chứng từ dữ liệu ĐÃ XÁC MINH, và ghi/đọc user_skill_evidence.
 *
 * Mọi hàm ghi nuốt lỗi: bằng chứng là phần thêm vào trên một lượt nộp bài đã
 * chấm xong, và bảng chưa migrate (migrations-d1/0010) không được làm hỏng
 * lượt nộp đó.
 */

export const SKILL_EVIDENCE_TABLE = "user_skill_evidence";

export interface EvidenceInsert extends EvidenceRow {
  area: SkillArea;
  source: EvidenceSource;
  ref: string;
}

const TOOL_MISSION_IDS: Record<string, readonly string[]> = {
  terminal: TERMINAL_MISSIONS.map((m) => m.id),
  editor: EDITOR_MISSION_IDS,
  sql: SQL_MISSION_IDS,
  api: API_MISSIONS.map((m) => m.id),
  cloud: CLOUD_MISSIONS.map((m) => m.id),
};

function stageOfLesson(track: StageExamTrack, lessonId: number): Stage | null {
  for (const stage of getTrackStages(track)) {
    if (isLessonInRange(lessonId, stage)) return stage;
    if (stage.parts.some((p) => p.extraLessonIds?.includes(lessonId))) return stage;
  }
  return null;
}

/** Bài tập viết mã → lĩnh vực của chặng chứa nó. Không thuộc chặng nào có
 *  lĩnh vực thì vẫn là "code": tự viết được mã chạy đúng là kỹ năng lập trình. */
export function exerciseArea(lessonId: number, track: string): SkillArea {
  const t: StageExamTrack = track === "professional" ? "professional" : "personal";
  const stage = stageOfLesson(t, lessonId);
  return (stage && stageArea(t, stageNumberOf(stage.label))) ?? "code";
}

/**
 * Bằng chứng do CLIENT báo (bài tập, nhiệm vụ công cụ - hai thứ chấm trong
 * trình duyệt). Chỉ nhận ref có thật trong danh mục; điểm và lĩnh vực do máy
 * chủ quyết, client không gửi được. `null` = từ chối.
 */
export function resolveClientEvidence(source: unknown, ref: unknown): EvidenceInsert | null {
  if (typeof ref !== "string" || ref.length > 80) return null;
  if (source === "exercise") {
    const parsed = parseExerciseRef(ref);
    if (!parsed) return null;
    const ex = EXERCISES.find((e) => e.lessonId === parsed.lessonId && e.block === parsed.blockIndex);
    if (!ex) return null;
    return {
      source: "exercise",
      ref: exerciseRef(ex.lessonId, ex.block),
      area: exerciseArea(ex.lessonId, ex.track),
      points: EVIDENCE_POINTS.exercise,
    };
  }
  if (source === "tool") {
    const parsed = parseToolRef(ref);
    if (!parsed || !TOOL_MISSION_IDS[parsed.tool]?.includes(parsed.missionId)) return null;
    const area = toolMissionArea(parsed.tool, parsed.missionId);
    if (!area) return null;
    return { source: "tool", ref: toolRef(parsed.tool, parsed.missionId), area, points: EVIDENCE_POINTS.tool };
  }
  return null;
}

/** Câu phỏng vấn trả lời ĐÚNG, từ token đã xác minh (questionId không giả được). */
export function interviewEvidence(correctQuestionIds: readonly number[]): EvidenceInsert[] {
  const out: EvidenceInsert[] = [];
  for (const id of new Set(correctQuestionIds)) {
    const q = getInterviewQuestionById(id);
    const area = q ? interviewArea(q.career, q.category) : null;
    if (q && area) out.push({ source: "interview", ref: interviewRef(q.id), area, points: EVIDENCE_POINTS.interview });
  }
  return out;
}

/**
 * Luyện miền chứng chỉ: `cert`/`domain` do client gửi, nhưng chỉ câu đúng có
 * lessonId (từ token đã ký) NẰM TRONG miền đó mới được tính - nên khai sai miền
 * không đổi được câu của miền khác thành bằng chứng. Một bằng chứng cho mỗi
 * (miền, bài): trả lời đúng lại cùng bài không cộng thêm.
 */
export function certEvidence(certId: unknown, domainId: unknown, correctLessonIds: readonly number[]): EvidenceInsert[] {
  if (typeof certId !== "string" || typeof domainId !== "string") return [];
  const domain = getCertTrack(certId)?.domains.find((d) => d.id === domainId);
  const area = domain ? certArea(certId, domain.id) : null;
  if (!domain || !area) return [];
  const inDomain = new Set(domain.lessonIds);
  return [...new Set(correctLessonIds)]
    .filter((id) => inDomain.has(id))
    .map((id) => ({ source: "cert" as const, ref: certRef(certId, domain.id, id), area, points: EVIDENCE_POINTS.cert }));
}

/** Bài thi vượt chặng ĐÃ ĐẠT. */
export function stageExamEvidence(track: string, stageLabel: string): EvidenceInsert[] {
  const n = stageNumberOf(stageLabel);
  const area = stageArea(track, n);
  if (!area || n === null) return [];
  return [{ source: "stage_exam", ref: stageRef(track, n), area, points: EVIDENCE_POINTS.stage_exam }];
}

function isMissingTable(message: string | undefined): boolean {
  return /no such table|không có trong lược đồ|khong co trong bang tra cuu/i.test(message ?? "");
}

/**
 * Ghi bằng chứng; trùng (user, source, ref) thì chỉ cập nhật area/points, giữ
 * created_at lần đầu. Không bao giờ ném.
 */
export async function writeSkillEvidence(
  admin: CloudflareClient,
  userId: string,
  rows: readonly EvidenceInsert[]
): Promise<void> {
  if (!userId || rows.length === 0) return;
  try {
    const { error } = await admin.from(SKILL_EVIDENCE_TABLE).upsert(
      rows.map((r) => ({ user_id: userId, area: r.area, source: r.source, ref: r.ref, points: r.points })),
      { onConflict: "user_id,source,ref" }
    );
    if (error && !isMissingTable(error.message)) console.error("Error recording skill evidence:", error.message);
  } catch (e) {
    if (!isMissingTable((e as Error)?.message)) console.error("Error recording skill evidence:", (e as Error)?.message);
  }
}

/** Mọi bằng chứng của một người học. Bảng chưa có → rỗng. */
export async function readSkillEvidence(
  admin: CloudflareClient,
  userId: string
): Promise<{ area: string; source: string; ref: string; points: number }[]> {
  try {
    const { data, error } = await admin
      .from(SKILL_EVIDENCE_TABLE)
      .select("area, source, ref, points")
      .eq("user_id", userId);
    if (error) {
      if (!isMissingTable(error.message)) console.error("Error reading skill evidence:", error.message);
      return [];
    }
    return (data ?? []) as { area: string; source: string; ref: string; points: number }[];
  } catch (e) {
    if (!isMissingTable((e as Error)?.message)) console.error("Error reading skill evidence:", (e as Error)?.message);
    return [];
  }
}
