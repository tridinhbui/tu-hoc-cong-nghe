import { FRM_SUBJECTS, type FrmSubjectId } from "@/lib/frm-track";
import {
  drawSubject as drawByWeight,
  normalisedShares,
  parseWeight,
  pickWeightedBuckets,
  subjectPlan,
  type Rng,
  type WeightedSubject,
} from "@/lib/exam-weighting";

/** Luật ra đề FRM. Cùng cơ chế cân trọng số với CFA (`lib/exam-weighting.ts`),
 *  khác ở ba điểm mà nếu bỏ qua thì đề ra sai:
 *
 *  1. HAI KỲ THI RIÊNG. Part I và Part II mỗi phần có bộ môn riêng và trọng số
 *     riêng, mỗi bộ cộng lại đúng 100%. Gộp cả mười môn vào một mẫu số là sai
 *     ngay từ phép chia - tôi đã tự mắc đúng lỗi này khi đo lần đầu và ra kết
 *     luận "mọi môn đều thiếu 10-15%", điều không thể xảy ra.
 *     Lưu ý kèm theo: 15 bài được CẢ HAI phần tham chiếu, vì Part II xây trên
 *     nền Part I. Nên không tồn tại ánh xạ "bài → phần thi"; phạm vi một phần
 *     phải tính từ MÔN đi xuống, không phải từ bài đi lên.
 *  2. BỐN LỰA CHỌN. Đề FRM giữ bốn phương án, đúng bằng kho câu hỏi của ta, nên
 *     không phải cắt bớt gì - khác CFA Level I vốn là đề ba lựa chọn.
 *  3. MỘT CA MỖI PHẦN. Part I là 100 câu trong 4 tiếng, Part II là 80 câu trong
 *     4 tiếng; không chia ca như CFA.
 *
 *  Đo trên kho hiện có, xáo đều cho ra Financial Markets and Products 43,4% số
 *  câu của Part I trong khi trọng số là 30%, và Current Issues 19,3% của Part
 *  II trong khi trọng số là 10%. Chưa ai gặp sai lệch đó vì tới giờ FRM chưa có
 *  đường luyện đề nào - file này mở đường đó ra, nên phải mở kèm phần cân. */

export type FrmPart = "I" | "II";

export type FrmSubjectWeight = WeightedSubject<FrmSubjectId>;

function weightsForPart(part: FrmPart): FrmSubjectWeight[] {
  return FRM_SUBJECTS.filter((s) => s.part === part).map((s) => ({
    id: s.id,
    ...parseWeight(s.weight),
  }));
}

export const FRM_SUBJECT_WEIGHTS: Record<FrmPart, FrmSubjectWeight[]> = {
  I: weightsForPart("I"),
  II: weightsForPart("II"),
};

export const FRM_SUBJECT_SHARE: Record<FrmPart, Array<{ id: FrmSubjectId; share: number }>> = {
  I: normalisedShares(FRM_SUBJECT_WEIGHTS.I),
  II: normalisedShares(FRM_SUBJECT_WEIGHTS.II),
};

/** Bài nào thuộc môn nào, và môn đó thuộc phần thi nào. */
export const FRM_SUBJECT_OF_LESSON: Map<number, FrmSubjectId> = new Map(
  FRM_SUBJECTS.flatMap((s) => s.lessonIds.map((id) => [id, s.id] as const))
);

export const FRM_PART_OF_SUBJECT: Map<FrmSubjectId, FrmPart> = new Map(
  FRM_SUBJECTS.map((s) => [s.id, s.part])
);

/** Các phần thi có tham chiếu tới bài này. Trả về MẢNG chứ không phải một giá
 *  trị: 15 bài nằm ở cả hai phần, và ép chúng về một phần sẽ làm hụt phạm vi
 *  của phần còn lại. */
export function frmPartsOfLesson(lessonId: number): FrmPart[] {
  const parts = new Set<FrmPart>();
  for (const s of FRM_SUBJECTS) {
    if (s.lessonIds.includes(lessonId)) parts.add(s.part);
  }
  return [...parts];
}

/** Id các bài mà một phần thi tham chiếu tới. Hai phần CÓ giao nhau - đó là
 *  đúng, không phải lỗi cần lọc đi. */
export function frmLessonIds(part: FrmPart): number[] {
  return [...new Set(FRM_SUBJECTS.filter((s) => s.part === part).flatMap((s) => s.lessonIds))];
}

export function frmSubjectPlan(part: FrmPart, total: number): Map<FrmSubjectId, number> {
  return subjectPlan(FRM_SUBJECT_SHARE[part], total);
}

export function drawFrmSubject(part: FrmPart, rng: Rng = Math.random): FrmSubjectId {
  return drawByWeight(FRM_SUBJECT_SHARE[part], rng);
}

/** Chọn câu cho một phần thi FRM theo trọng số môn.
 *
 *  Gom rổ từ MÔN đi xuống, không tra ngược từ bài lên môn. Tra ngược thì 16 bài
 *  nằm ở nhiều môn sẽ bị gán bừa vào một môn, và tỷ lệ hỏng ngay - đây chính là
 *  chỗ giả định "mỗi bài một môn" của tôi bị test bắt.
 *
 *  Trả kèm `subject` là ô mà câu đó lấp vào. Đó mới là môn đúng để chấm điểm:
 *  cùng một câu có thể đứng ở ô Market Risk trong đề này và ô Valuation and
 *  Risk Models trong đề khác. */
export function pickFrmWeighted<T extends { lessonId: number }>(
  pool: T[],
  count: number,
  part: FrmPart,
  rng: Rng = Math.random
): Array<{ item: T; subject: FrmSubjectId }> {
  const byLesson = new Map<number, T[]>();
  for (const q of pool) {
    const list = byLesson.get(q.lessonId) ?? [];
    list.push(q);
    byLesson.set(q.lessonId, list);
  }

  const buckets = new Map<FrmSubjectId, T[]>();
  for (const s of FRM_SUBJECTS) {
    if (s.part !== part) continue;
    const list: T[] = [];
    for (const id of s.lessonIds) list.push(...(byLesson.get(id) ?? []));
    buckets.set(s.id, list);
  }
  return pickWeightedBuckets(buckets, count, FRM_SUBJECT_SHARE[part], rng);
}

/** Kích thước đề thi thật của từng phần.
 *
 *  Giữ nguyên con số thật. Bốn tiếng là một phần lớn của bài thi FRM, và biết
 *  mình gãy ở câu bao nhiêu chính là thứ một bài thi thử rút gọn không nói được. */
/* i18n-ignore-start: "FRM Part I/II" là tên chính thức của hai phần thi trong
   tài liệu GARP. Đã là tiếng Anh và giữ nguyên ở cả hai ngôn ngữ, cùng lý do
   như FRM_SUBJECTS trong lib/frm-track.ts: người học đối chiếu với tài liệu
   gốc, dịch sang tiếng Việt là làm họ tra không ra. */
export const FRM_EXAM: Record<FrmPart, { questions: number; minutes: number; label: string }> = {
  I: { questions: 100, minutes: 240, label: "FRM Part I" },
  II: { questions: 80, minutes: 240, label: "FRM Part II" },
};
/* i18n-ignore-end */

/** Đề FRM giữ bốn lựa chọn - đúng bằng kho câu hỏi, nên không cắt bớt gì. */
export const FRM_OPTION_COUNT = 4;

/** GARP không công bố điểm đỗ; đây là mốc thận trọng các đơn vị luyện thi dùng,
 *  và giao diện phải nói rõ đó là ước lượng chứ không phải con số chính thức. */
export const FRM_PASS_RATIO = 0.7;

export interface FrmSubjectScore {
  id: FrmSubjectId;
  name: string;
  correct: number;
  total: number;
}

/** Điểm tách theo môn. Tổng điểm chỉ nói đỗ hay trượt; "Market Risk 6/16" nói
 *  phải học lại cái gì. */
export function frmScoreBySubject(
  answers: Array<{ subject: FrmSubjectId; correct: boolean }>
): FrmSubjectScore[] {
  const acc = new Map<FrmSubjectId, { correct: number; total: number }>();
  for (const a of answers) {
    const subject = a.subject;
    if (!FRM_PART_OF_SUBJECT.has(subject)) continue;
    const cur = acc.get(subject) ?? { correct: 0, total: 0 };
    cur.total += 1;
    if (a.correct) cur.correct += 1;
    acc.set(subject, cur);
  }
  // Giữ nguyên thứ tự môn của đề cương, không sắp theo điểm: người học đọc bảng
  // này nhiều lần và cần tìm được môn mình quan tâm ở cùng một chỗ.
  return FRM_SUBJECTS.filter((s) => acc.has(s.id)).map((s) => ({
    id: s.id,
    name: s.name,
    correct: acc.get(s.id)!.correct,
    total: acc.get(s.id)!.total,
  }));
}
