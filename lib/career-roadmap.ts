import { CFA_LEVEL_1_SUBJECTS } from "@/lib/cfa-track";
import type { FinanceCareer } from "@/lib/finance-careers";

/** Lộ trình bài học của một nghề, và của cả một nhóm nghề.
 *
 *  Tách khỏi CareerLearningPathClient vì phép dựng này giờ cần ở HAI chỗ:
 *  bước chọn nghề (một nghề) và bước chọn nhóm (hợp của mọi nghề trong nhóm).
 *  Trước đây nó nằm trong một `useMemo` chỉ chạy cho nghề đang chọn, nên màn
 *  hình đầu tiên - màn hình người dùng nhìn thấy trước hết - không có cách nào
 *  biết họ đã đi được bao xa vào từng nhóm, dù dữ liệu để tính đã nằm sẵn
 *  trong props.
 *
 *  Hai nguồn bài, gộp lại và khử trùng: `relatedLessonSlugs` viết tay cho từng
 *  nghề, và `relatedCfaSubjectIds` trỏ sang các môn CFA Level I - `lessonIds`
 *  của chúng chỉ về đúng các bài trong lib/lessons.ts chứ không phải một kho
 *  nội dung riêng, nên một bài có thể tới từ cả hai đường và chỉ được đếm một
 *  lần. */

export interface LessonRef {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
}

export interface LessonIndex {
  bySlug: Record<string, LessonRef>;
  byId: Record<number, LessonRef>;
}

/** Bài học của một nghề, giữ nguyên thứ tự: slug viết tay trước, rồi tới CFA. */
export function buildCareerRoadmap(career: FinanceCareer, index: LessonIndex): LessonRef[] {
  const seen = new Set<number>();
  const rows: LessonRef[] = [];

  const push = (lesson: LessonRef | undefined) => {
    if (!lesson || seen.has(lesson.id)) return;
    seen.add(lesson.id);
    rows.push(lesson);
  };

  for (const slug of career.relatedLessonSlugs) push(index.bySlug[slug]);
  for (const subjectId of career.relatedCfaSubjectIds ?? []) {
    const subject = CFA_LEVEL_1_SUBJECTS.find((s) => s.id === subjectId);
    for (const id of subject?.lessonIds ?? []) push(index.byId[id]);
  }

  return rows;
}

export interface CategoryProgress {
  /** Số bài KHÁC NHAU trong cả nhóm. */
  total: number;
  done: number;
  /** Phần trăm làm tròn, 0 khi nhóm chưa có bài nào. */
  percent: number;
}

/** Tiến độ của cả một nhóm nghề.
 *
 *  Hợp của các lộ trình, không phải tổng. Hai nghề trong cùng nhóm dùng chung
 *  rất nhiều bài nền, nên cộng dồn sẽ đếm những bài đó nhiều lần và cho ra một
 *  mẫu số lớn hơn số bài người học thật sự phải học. */
export function categoryProgress(
  careers: readonly FinanceCareer[],
  index: LessonIndex,
  completed: ReadonlySet<number>
): CategoryProgress {
  const union = new Set<number>();
  for (const career of careers) {
    for (const lesson of buildCareerRoadmap(career, index)) union.add(lesson.id);
  }

  let done = 0;
  for (const id of union) if (completed.has(id)) done += 1;

  return {
    total: union.size,
    done,
    percent: union.size ? Math.round((done / union.size) * 100) : 0,
  };
}
