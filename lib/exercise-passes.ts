/** Bài tập viết mã đã qua - phía client. Máy chủ: `record_exercise_pass` và
 *  `get_my_exercise_passes` trong lib/d1/rpc.ts, bảng ở migrations-d1/0009.
 *
 *  Ghi là "bắn rồi quên": người chưa đăng nhập (bài xem thử) vẫn làm bài tập
 *  được, chỉ là không có gì để lưu, và lỗi mạng không được làm hỏng khoảnh
 *  khắc "Đúng rồi!" của người học. */
import { createClient } from "@/lib/cloudflare";
import { exerciseRef } from "@/lib/practical-skill";
import { recordSkillEvidence } from "@/lib/practical-skill-client";

export interface ExercisePass {
  lesson_id: number;
  block_index: number;
  passed_at: string;
}

export async function recordExercisePass(lessonId: number, blockIndex: number): Promise<void> {
  // Bằng chứng năng lực thực hành (lib/practical-skill.ts) - bắn rồi quên.
  recordSkillEvidence("exercise", exerciseRef(lessonId, blockIndex));
  try {
    await createClient().rpc("record_exercise_pass", { p_lesson_id: lessonId, p_block_index: blockIndex });
  } catch {
    // Không đăng nhập hoặc mất mạng: bài tập vẫn chấm đúng, chỉ không được lưu.
  }
}

export async function getMyExercisePasses(): Promise<ExercisePass[]> {
  try {
    const { data, error } = await createClient().rpc("get_my_exercise_passes", {});
    if (error || !Array.isArray(data)) return [];
    return data as ExercisePass[];
  } catch {
    return [];
  }
}
