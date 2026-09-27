"use server";

import { createServerCloudflareClient } from "@/lib/cloudflare-server";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { getServerLocale } from "@/lib/i18n/server";
import { LEARNING_FLOWS, getLearningFlow, type FlowId } from "@/lib/learning-flows";
import { computeFlowProgress, type FlowProgress } from "@/lib/learning-flow-progress";

/** Ghi mục tiêu "Bạn muốn làm gì?" lên user_profiles.learning_goal.
 *
 *  Server action vì cùng lý do với saveLearningPathPrefs: id người dùng lấy từ
 *  phiên ở server, không nhận từ client. `null` là "bỏ chọn" - cho phép người
 *  học đổi ý mà không bị kẹt với lựa chọn đầu. Id được kiểm với LEARNING_FLOWS
 *  ở đây vì cột không có CHECK (xem migrations-d1/0005_learning_goal.sql). */
export async function saveLearningGoal(goal: FlowId | null): Promise<{ ok: boolean }> {
  if (goal !== null && !getLearningFlow(goal)) return { ok: false };

  const cloudflare = await createServerCloudflareClient();
  const {
    data: { user },
  } = await cloudflare.auth.getUser();
  if (!user) return { ok: false };

  const { error } = await cloudflare.from("user_profiles").update({ learning_goal: goal }).eq("id", user.id);
  return { ok: !error };
}

export interface LearningGoalState {
  goal: FlowId | null;
  /** Tiến độ của MỌI hành trình, để thẻ chọn mục tiêu cũng cho thấy người học
   *  đã đi được bao xa ở từng hướng trước khi chọn. */
  progress: Record<FlowId, FlowProgress>;
}

/** Trạng thái cho LearningGoalCard. `null` khi chưa đăng nhập. */
export async function getLearningGoalState(): Promise<LearningGoalState | null> {
  const cloudflare = await createServerCloudflareClient();
  const {
    data: { user },
  } = await cloudflare.auth.getUser();
  if (!user) return null;

  const [metas, { data: progressRows }, { data: profile }] = await Promise.all([
    getLessonsMeta(await getServerLocale()),
    cloudflare.from("user_progress").select("lesson_id").eq("user_id", user.id).eq("completed", true),
    cloudflare.from("user_profiles").select("learning_goal").eq("id", user.id).maybeSingle(),
  ]);

  const doneIds = new Set((progressRows ?? []).map((r) => r.lesson_id as number));
  const titleBySlug = new Map(metas.map((m) => [m.slug, m.title]));
  const completed = new Set(metas.filter((m) => doneIds.has(m.id)).map((m) => m.slug));

  const progress = Object.fromEntries(
    LEARNING_FLOWS.map((f) => [f.id, computeFlowProgress(f, completed, (s) => titleBySlug.get(s))]),
  ) as Record<FlowId, FlowProgress>;

  const saved = (profile as { learning_goal?: string | null } | null)?.learning_goal ?? null;
  const goal = saved && getLearningFlow(saved) ? (saved as FlowId) : null;
  return { goal, progress };
}
