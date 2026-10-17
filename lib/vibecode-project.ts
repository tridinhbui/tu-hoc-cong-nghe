/**
 * Dự án xuyên suốt của Chặng 67 (hành trình vibecode): mười bước, mỗi bước là
 * MỘT bài tập chạy được nằm trong một bài (id 2740-2749). Bài tập được viết ở
 * lib/ai-work-lessons/s67-project.ts và chấm theo đầu ra, không gọi LLM.
 *
 * Tiến độ KHÔNG có bảng riêng: `recordExercisePass(bài, vị trí khối)` đã ghi
 * mỗi lần một bài tập đạt (components/LessonSections.tsx), chỉ khi đạt - bỏ
 * qua bài tập thì không có bản ghi nào. Bảng tiến độ chỉ đọc lại các bản ghi
 * đó, nên "bước này xong" nghĩa đúng là "bài tập của bước này đã chạy ra đúng
 * kết quả", không phải "đã mở bài".
 *
 * Giới hạn đã biết: bài tập chấm trong trình duyệt (Web Worker), máy chủ không
 * chạy lại được lời giải của người học, nên bản ghi là lời khai của client -
 * xem ghi chú ở `recordExercisePass` trong lib/d1/rpc.ts.
 */
import type { LessonSectionBlock } from "@/lib/lesson-types";

export const VIBECODE_PROJECT_LESSON_IDS = [2740, 2741, 2742, 2743, 2744, 2745, 2746, 2747, 2748, 2749] as const;

/** Vị trí khối bài tập của dự án trong `sections` của bài, hoặc -1 nếu bài
 *  không có. Mỗi bài của chặng có đúng một khối `exercise`; bài tập khác thêm
 *  về sau phải nằm SAU khối của dự án, hoặc đổi hàm này. */
export function projectExerciseIndex(sections: readonly Pick<LessonSectionBlock, "type">[] | undefined): number {
  return sections ? sections.findIndex((b) => b.type === "exercise") : -1;
}

export interface ProjectStep {
  lessonId: number;
  slug: string;
  title: string;
  blockIndex: number;
  done: boolean;
}

/** Gộp danh sách bài đã tải với các lần qua bài tập của người học. */
export function buildProjectSteps(
  lessons: readonly { id: number; slug: string; title: string; sections?: readonly Pick<LessonSectionBlock, "type">[] }[],
  passes: readonly { lesson_id: number; block_index: number }[]
): ProjectStep[] {
  const passed = new Set(passes.map((p) => `${p.lesson_id}:${p.block_index}`));
  return VIBECODE_PROJECT_LESSON_IDS.flatMap((id) => {
    const l = lessons.find((x) => x.id === id);
    if (!l) return [];
    const blockIndex = projectExerciseIndex(l.sections);
    if (blockIndex < 0) return [];
    return [{ lessonId: id, slug: l.slug, title: l.title, blockIndex, done: passed.has(`${id}:${blockIndex}`) }];
  });
}
