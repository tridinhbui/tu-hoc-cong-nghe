import { CFA_LEVEL_1_SUBJECTS, type CfaSubject, type CfaSubjectId } from "@/lib/cfa-track";
import { parseWeight } from "@/lib/exam-weighting";
import { XP_PER_LESSON } from "@/lib/levels";

/** Tiến trình CFA Level I đọc như một CHIẾN DỊCH có thứ tự, không phải mười ô
 *  môn thi ngang nhau.
 *
 *  Cùng khuôn với lib/career-zones.ts: luật đi đường được khai ở đây, còn tiến
 *  độ thì đọc từ dữ liệu thật (bài đã hoàn thành). Không có bảng nào trong lược
 *  đồ nói môn nào khoá sau môn nào - và thay vì bịa một cột như thế vào cơ sở
 *  dữ liệu, thứ tự nằm trong mã, ngay cạnh chỗ dùng nó.
 *
 *  KHÔNG khoá cứng. `locked` ở đây nghĩa là "chưa tới lượt theo lộ trình đề
 *  nghị", và giao diện vẫn cho mở. Lý do giống hệt lib/career-zones.ts: khoá
 *  thật là LẤY ĐI quyền truy cập đang có, và một người ôn thi CFA tuần cuối
 *  cần vào thẳng môn họ yếu nhất chứ không phải đi lại từ Ethics.
 */

/** Thứ tự học đề nghị.
 *
 *  Đây là thứ tự CFA Institute in trong giáo trình, và nó không phải xếp theo
 *  trọng số: Ethics đứng đầu vì mọi môn sau đều tham chiếu bộ chuẩn mực, còn
 *  Portfolio Management đứng cuối vì nó gộp kết quả của các môn trước. Giữ đúng
 *  thứ tự này thay vì tự xếp lại theo độ khó hay theo số bài. */
export const CFA_SUBJECT_ORDER: CfaSubjectId[] = CFA_LEVEL_1_SUBJECTS.map((s) => s.id);

/** Bao nhiêu phần trăm bài của một môn thì coi là đủ để đi tiếp.
 *
 *  70 chứ không phải 100: bắt học hết 87 bài FSA mới được chạm tới Equity thì
 *  lộ trình biến thành một hàng đợi, và người học bỏ cuộc ở môn dài nhất. Đây
 *  là ngưỡng "đã nắm được", không phải ngưỡng "đã xong" - `mastered` mới là
 *  100%. */
export const SUBJECT_ADVANCE_PERCENT = 70;

export type CfaSubjectState =
  /** Chưa tới lượt theo lộ trình đề nghị. Vẫn mở được. */
  | "upcoming"
  /** Tới lượt, chưa học bài nào. */
  | "open"
  | "inProgress"
  /** Đã qua ngưỡng SUBJECT_ADVANCE_PERCENT nhưng chưa trọn. */
  | "proficient"
  | "mastered";

export interface CfaSubjectProgress {
  subject: CfaSubject;
  order: number;
  total: number;
  done: number;
  percent: number;
  state: CfaSubjectState;
  /** Trọng số chuẩn hoá về tổng 1, lấy trung điểm dải chính thức. */
  weight: number;
  /** Còn bao nhiêu bài nữa thì môn này qua ngưỡng đi tiếp. 0 khi đã qua. */
  lessonsToAdvance: number;
}

export interface CfaMilestone {
  /** Môn phải đẩy tiếp để chạm mốc. */
  subjectId: CfaSubjectId;
  /** Số bài còn thiếu. Luôn > 0 - hết mốc thì trả null ở cấp trên. */
  lessonsLeft: number;
  /** XP nhận được khi học xong đúng số bài đó. */
  xpReward: number;
  /** Môn sẽ tới lượt sau khi chạm mốc. null nếu đây là môn cuối. */
  unlocksSubjectId: CfaSubjectId | null;
}

export interface CfaCampaign {
  subjects: CfaSubjectProgress[];
  totalLessons: number;
  doneLessons: number;
  percent: number;
  /** XP đã kiếm từ riêng phần học CFA. Xem chú thích ở hàm tính. */
  xpFromCfa: number;
  /** Môn đang học: môn đầu tiên chưa qua ngưỡng theo thứ tự đề nghị. Null khi
   *  cả mười môn đã qua ngưỡng. */
  currentSubjectId: CfaSubjectId | null;
  /** Mốc gần nhất, để in một dòng "còn N bài nữa". Null khi hết mốc. */
  nextMilestone: CfaMilestone | null;
  /** Mức sẵn sàng thi, CÂN THEO TRỌNG SỐ CHÍNH THỨC chứ không phải đếm bài.
   *  Xem chú thích ở chỗ tính. */
  examReadiness: number;
}

/** Trọng số chuẩn hoá của mười môn, tính một lần.
 *
 *  Phải chuẩn hoá: CFA công bố dải chồng lấn ("11–14%"), nên cộng trung điểm
 *  mười môn lại ra 102,5% chứ không phải 100. Cùng phép tính lib/exam-weighting
 *  đã làm cho đề thi thử, và cố ý dùng lại `parseWeight` của nó thay vì đọc lại
 *  chuỗi trọng số ở đây - hai chỗ đọc cùng một chuỗi là hai chỗ để lệch nhau. */
function normalisedWeights(): Record<CfaSubjectId, number> {
  const mid = CFA_LEVEL_1_SUBJECTS.map((s) => {
    const { lo, hi } = parseWeight(s.weight);
    return { id: s.id, value: (lo + hi) / 2 };
  });
  const sum = mid.reduce((acc, m) => acc + m.value, 0);
  const out = {} as Record<CfaSubjectId, number>;
  for (const m of mid) out[m.id] = sum > 0 ? m.value / sum : 0;
  return out;
}

const SUBJECT_WEIGHT = normalisedWeights();

/** Toàn bộ chiến dịch, tính từ tập bài đã hoàn thành.
 *
 *  Nhận `Set` chứ không nhận mảng: gọi ở đây là 404 lần tra, và trang tổng quan
 *  vốn đã giữ sẵn một Set bài đã học. */
export function buildCfaCampaign(completedLessonIds: ReadonlySet<number>): CfaCampaign {
  const byId = new Map(CFA_LEVEL_1_SUBJECTS.map((s) => [s.id, s]));

  // Lượt một: tiến độ thô của từng môn. Trạng thái phải chờ lượt hai vì
  // "tới lượt hay chưa" phụ thuộc vào các môn ĐỨNG TRƯỚC.
  const raw = CFA_SUBJECT_ORDER.map((id, order) => {
    const subject = byId.get(id)!;
    const total = subject.lessonIds.length;
    let done = 0;
    for (const lessonId of subject.lessonIds) if (completedLessonIds.has(lessonId)) done += 1;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    const needed = Math.ceil((total * SUBJECT_ADVANCE_PERCENT) / 100);
    return {
      subject,
      order,
      total,
      done,
      percent,
      weight: SUBJECT_WEIGHT[id] ?? 0,
      lessonsToAdvance: Math.max(0, needed - done),
    };
  });

  // Môn đang học = môn đầu tiên chưa qua ngưỡng. Nếu tất cả đã qua thì null.
  const currentIndex = raw.findIndex((r) => r.lessonsToAdvance > 0);
  const currentSubjectId = currentIndex === -1 ? null : raw[currentIndex].subject.id;

  const subjects: CfaSubjectProgress[] = raw.map((r, i) => {
    let state: CfaSubjectState;
    if (r.total > 0 && r.done === r.total) state = "mastered";
    else if (r.lessonsToAdvance === 0) state = "proficient";
    else if (r.done > 0) state = "inProgress";
    else if (currentIndex === -1 || i <= currentIndex) state = "open";
    else state = "upcoming";
    return { ...r, state };
  });

  const totalLessons = subjects.reduce((a, s) => a + s.total, 0);
  // Hợp, không phải tổng: hai môn có thể trỏ vào cùng một bài nền, và cộng dồn
  // sẽ đếm bài đó hai lần rồi cho ra phần trăm vượt mốc thật.
  const doneUnion = new Set<number>();
  for (const s of CFA_LEVEL_1_SUBJECTS) {
    for (const id of s.lessonIds) if (completedLessonIds.has(id)) doneUnion.add(id);
  }
  const unionTotal = new Set(CFA_LEVEL_1_SUBJECTS.flatMap((s) => s.lessonIds)).size;
  const doneLessons = doneUnion.size;

  // Sẵn sàng thi ≠ phần trăm bài đã học.
  //
  // Đếm bài thì 87 bài FSA đè bẹp 20 bài Economics, trong khi đề thi thật cho
  // FSA 11-14% và Economics 6-9%. Học hết FSA rồi bỏ trắng bốn môn nhỏ vẫn ra
  // "đã học 40%", còn khả năng qua kỳ thi thì không phải vậy. Cân theo trọng số
  // chính thức thì con số này trả lời đúng câu người học đang hỏi.
  const examReadiness = Math.round(
    subjects.reduce((acc, s) => acc + s.weight * (s.total > 0 ? s.done / s.total : 0), 0) * 100
  );

  return {
    subjects,
    totalLessons: unionTotal || totalLessons,
    doneLessons,
    percent: unionTotal > 0 ? Math.round((doneLessons / unionTotal) * 100) : 0,
    // Mỗi bài hoàn thành cộng XP_PER_LESSON vào total_xp - xem công thức trong
    // recalculateUserStats, nơi `(lessonsCompleted + cfaModulesDone)` nhân với
    // hằng số này. Nên đây là XP THẬT đã vào tài khoản, không phải điểm quy đổi
    // riêng của trang CFA.
    xpFromCfa: doneLessons * XP_PER_LESSON,
    currentSubjectId,
    nextMilestone: buildNextMilestone(subjects, currentIndex),
    examReadiness,
  };
}

function buildNextMilestone(
  subjects: CfaSubjectProgress[],
  currentIndex: number
): CfaMilestone | null {
  if (currentIndex === -1) return null;
  const current = subjects[currentIndex];
  if (current.lessonsToAdvance <= 0) return null;
  return {
    subjectId: current.subject.id,
    lessonsLeft: current.lessonsToAdvance,
    xpReward: current.lessonsToAdvance * XP_PER_LESSON,
    unlocksSubjectId: subjects[currentIndex + 1]?.subject.id ?? null,
  };
}
