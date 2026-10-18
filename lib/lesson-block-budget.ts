import type { LessonSectionBlock } from "@/lib/lesson-types";

// Ngân sách khối của một trang bài (F-8 trong DEEP-UX-USABILITY-AUDIT.md).
//
// Mỗi đợt cải tiến THÊM một khối vào bài - lib/lesson-block-additions đảm bảo
// mọi bài có khối thực hành + khối hình - và không đợt nào bớt. Kết quả đo được
// là ~7 khối tương tác và gần 15 màn hình ở 390px cho một bài "10-15 phút".
//
// Đây chỉ là chuyện TRÌNH BÀY: không khối nào bị xoá, mọi khối vẫn ở trong
// `sections` và vẫn qua các gate của scripts/audit-lesson-content.mjs. Hàm này
// chỉ chia chỉ số khối thành hai nhóm - mạch chính, và mục gập "Học sâu hơn"
// mà LessonPageClient dựng ở cuối bài. Chỉ số giữ nguyên chỉ số gốc, vì
// exercise_passes khoá theo (bài, vị trí khối).

const PRACTICE: ReadonlySet<LessonSectionBlock["type"]> = new Set(["exercise", "sim", "aiLab", "scenario", "machine"]);
const VISUAL: ReadonlySet<LessonSectionBlock["type"]> = new Set(["chart", "flow"]);

export interface LessonBlockPlan {
  /** Khối ở mạch chính, theo thứ tự tác giả viết. */
  main: number[];
  /** Khối dời vào "Học sâu hơn", theo thứ tự tác giả viết. */
  deep: number[];
  /** Mạch chính có chart/flow - khi đó sơ đồ tĩnh `lesson.diagram` là bản lặp. */
  hasMainVisual: boolean;
  /** Mạch chính có khối thực hành - khi đó `practicePrompt` là câu thêm. */
  hasMainPractice: boolean;
}

export function planLessonBlocks(sections: readonly LessonSectionBlock[]): LessonBlockPlan {
  // Khối thực hành chính: bài tập viết mã nếu có (ở track lập trình đó là phần
  // chính của bài, còn tình huống thường là khối thêm sau), nếu không thì khối
  // thực hành đầu tiên tác giả đặt.
  const exerciseAt = sections.findIndex((b) => b.type === "exercise");
  const mainPractice = exerciseAt >= 0 ? exerciseAt : sections.findIndex((b) => PRACTICE.has(b.type));
  const mainVisual = sections.findIndex((b) => VISUAL.has(b.type));

  const main: number[] = [];
  const deep: number[] = [];
  sections.forEach((b, i) => {
    const extra =
      b.type === "feynman" ||
      (PRACTICE.has(b.type) && i !== mainPractice) ||
      (VISUAL.has(b.type) && i !== mainVisual);
    (extra ? deep : main).push(i);
  });
  return { main, deep, hasMainVisual: mainVisual >= 0, hasMainPractice: mainPractice >= 0 };
}
