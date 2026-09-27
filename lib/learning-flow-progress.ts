import { flowLessonSlugs, type LearningFlow } from "@/lib/learning-flows";

export interface FlowProgress {
  done: number;
  total: number;
  /** Chặng chứa bài tiếp theo (0-based); bằng số chặng khi đã học hết. */
  stepIndex: number;
  next: { slug: string; title: string } | null;
}

/**
 * Tiến độ của một hành trình, tính trên slug đã học.
 *
 * "Bài tiếp theo" đi theo THỨ TỰ HÀNH TRÌNH - chiến thắng đầu tiên, rồi từng
 * chặng - chứ không theo id: một hành trình nhảy qua nhiều track, và id nhỏ
 * nhất chưa học thường là một bài ở giữa hành trình, không phải bài mở đầu.
 * Bài của hai nhánh cuối không được gợi ý làm "bài tiếp theo": chọn nhánh là
 * việc của người học, không phải của bộ đếm.
 */
export function computeFlowProgress(
  flow: LearningFlow,
  completed: Set<string>,
  titleOf: (slug: string) => string | undefined,
): FlowProgress {
  const all = flowLessonSlugs(flow).filter((s) => titleOf(s) !== undefined);
  const done = all.filter((s) => completed.has(s)).length;

  const ordered: { slug: string; step: number }[] = [
    { slug: flow.firstWinSlug, step: 0 },
    ...flow.steps.flatMap((st, i) => st.lessonSlugs.map((slug) => ({ slug, step: i }))),
  ];
  const nextEntry = ordered.find((e) => !completed.has(e.slug) && titleOf(e.slug) !== undefined);

  return {
    done,
    total: all.length,
    stepIndex: nextEntry ? nextEntry.step : flow.steps.length,
    next: nextEntry ? { slug: nextEntry.slug, title: titleOf(nextEntry.slug)! } : null,
  };
}
