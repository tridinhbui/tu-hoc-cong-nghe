import { CFA_LEVEL_1_SUBJECTS, type CfaSubjectId } from "@/lib/cfa-track";

/** Luật ra đề CFA Level I: bao nhiêu câu mỗi môn, và mỗi câu mấy lựa chọn.
 *
 *  Lý do tồn tại: trước đây đường ra đề CFA gom phẳng 366 bài rồi xáo đều. Đo
 *  ra thì FSA chiếm 24,9% số câu trong khi đề thi thật cho nó 11-14%, còn
 *  Ethics - môn NẶNG NHẤT đề thi, 15-20% - chỉ được 12,1%. Sai lệch đó không
 *  dừng ở trải nghiệm luyện tập: điểm chảy thẳng vào `avg_quiz_score`, nên một
 *  người luyện toàn FSA rồi được báo là đã sẵn sàng thi.
 *
 *  Nguyên nhân gốc là số bài mỗi môn phản ánh việc ta ĐÃ VIẾT ĐƯỢC bao nhiêu,
 *  không phải đề thi HỎI bao nhiêu - và hai thứ đó không có lý do gì trùng nhau.
 *  Nên tỷ lệ phải được áp ở khâu ra đề, chứ không chờ tới lúc số bài mỗi môn tự
 *  cân bằng.
 *
 *  Toàn bộ file là hàm thuần, `rng` truyền vào được, nên kiểm được phân phối
 *  bằng cách chạy vài nghìn lượt thay vì tin vào mắt. */

export type Rng = () => number;

export interface SubjectWeight {
  id: CfaSubjectId;
  /** Cận dưới và cận trên trọng số chính thức, theo phần trăm. */
  lo: number;
  hi: number;
}

/** "15–20%" → { lo: 15, hi: 20 }. Nhận cả gạch nối lẫn gạch ngang dài, vì
 *  trong `cfa-track.ts` đang dùng en dash. */
export function parseWeight(weight: string): { lo: number; hi: number } {
  const [lo, hi] = weight.replace(/%/g, "").split(/[–—-]/).map((s) => Number(s.trim()));
  if (!Number.isFinite(lo)) throw new Error(`Trọng số môn CFA không đọc được: ${weight}`);
  return { lo, hi: Number.isFinite(hi) ? hi : lo };
}

export const SUBJECT_WEIGHTS: SubjectWeight[] = CFA_LEVEL_1_SUBJECTS.map((s) => ({
  id: s.id,
  ...parseWeight(s.weight),
}));

/** Tỷ lệ mục tiêu của từng môn, đã chuẩn hoá về tổng 1.
 *
 *  Lấy trung điểm dải rồi chia cho tổng. Cần chuẩn hoá vì các trung điểm cộng
 *  lại ra 102,5% chứ không phải 100 - CFA Institute công bố dải chứ không công
 *  bố một con số, và các dải đó chồng lấn. Sau khi chia, mỗi môn tụt khoảng
 *  2,4% giá trị của chính nó, vẫn nằm gọn trong dải của nó (kiểm trong test). */
export const SUBJECT_SHARE: Array<{ id: CfaSubjectId; share: number }> = (() => {
  const mids = SUBJECT_WEIGHTS.map((w) => ({ id: w.id, mid: (w.lo + w.hi) / 2 }));
  const total = mids.reduce((n, m) => n + m.mid, 0);
  return mids.map((m) => ({ id: m.id, share: m.mid / total }));
})();

/** Số câu mỗi môn cho một đề có kích thước cố định.
 *
 *  Dùng phương pháp phần dư lớn nhất: chia phần nguyên trước, rồi phát nốt các
 *  câu lẻ cho những môn có phần thập phân lớn nhất. Làm tròn từng môn độc lập
 *  thì tổng sẽ lệch khỏi con số yêu cầu - một đề "180 câu" ra 179 hoặc 182.
 *
 *  Chỉ dùng cho đề đủ lớn (thi thử 180 câu). Với đề 5 câu thì cách này luôn
 *  chọn đúng 5 môn nặng nhất và Quant sẽ không bao giờ xuất hiện - đó là việc
 *  của `drawSubject`. */
export function examSubjectPlan(total: number): Map<CfaSubjectId, number> {
  const raw = SUBJECT_SHARE.map((s) => ({ id: s.id, exact: s.share * total }));
  const plan = new Map<CfaSubjectId, number>(raw.map((r) => [r.id, Math.floor(r.exact)]));
  let left = total - [...plan.values()].reduce((a, b) => a + b, 0);
  const byRemainder = [...raw].sort(
    (a, b) => (b.exact - Math.floor(b.exact)) - (a.exact - Math.floor(a.exact))
  );
  for (let i = 0; left > 0; i += 1, left -= 1) {
    const s = byRemainder[i % byRemainder.length];
    plan.set(s.id, (plan.get(s.id) ?? 0) + 1);
  }
  return plan;
}

/** Bốc một môn theo trọng số, cho những đề quá ngắn để chia phần.
 *
 *  Với 5 câu thì không có cách chia nào phản ánh được mười tỷ lệ. Bốc ngẫu
 *  nhiên theo trọng số thì từng phiên vẫn khác nhau, còn trung bình qua nhiều
 *  phiên hội tụ đúng về tỷ lệ đề thi - mà "nhiều phiên" mới là thứ người học
 *  thực sự trải qua. */
export function drawSubject(rng: Rng = Math.random): CfaSubjectId {
  let r = rng();
  for (const s of SUBJECT_SHARE) {
    r -= s.share;
    if (r <= 0) return s.id;
  }
  return SUBJECT_SHARE[SUBJECT_SHARE.length - 1].id;
}

/** Bài nào thuộc môn nào. Một bài chỉ nằm ở đúng một môn (đã kiểm trong test),
 *  nên map một-một là đủ. */
export const SUBJECT_OF_LESSON: Map<number, CfaSubjectId> = new Map(
  CFA_LEVEL_1_SUBJECTS.flatMap((s) => s.lessonIds.map((id) => [id, s.id] as const))
);

/** Xáo mảng. Nhận rng để phân phối kiểm được bằng test thay vì bằng mắt. */
function shuffle<T>(arr: T[], rng: Rng): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Chọn câu cho track CFA theo TRỌNG SỐ MÔN của đề thi thật.
 *
 *  Trước đây chỗ này là `shuffle(pool).slice(0, n)` trên cả 366 bài gộp lại.
 *  Đo ra: FSA chiếm 24,9% số câu trong khi đề thi cho nó 11-14%, còn Ethics -
 *  môn nặng nhất, 15-20% - chỉ được 12,1%. Số bài mỗi môn phản ánh việc ta đã
 *  viết được bao nhiêu chứ không phải đề thi hỏi bao nhiêu, nên xáo đều là xáo
 *  theo sai phân phối.
 *
 *  Đề dài thì chia phần cố định (chính xác tuyệt đối, hợp cho thi thử); đề
 *  ngắn thì bốc từng câu theo trọng số, vì 5 câu không chia nổi cho 10 môn mà
 *  vẫn giữ được tỷ lệ. Môn nào cạn câu thì phần thiếu lấy bù từ các môn còn
 *  lại - thà lệch tỷ lệ còn hơn trả về đề ngắn hơn số câu đã hứa. */
export function pickCfaWeighted<T extends { lessonId: number }>(
  pool: T[],
  count: number,
  rng: Rng = Math.random
): T[] {
  const bySubject = new Map<string, T[]>();
  for (const q of pool) {
    const subject = SUBJECT_OF_LESSON.get(q.lessonId);
    if (!subject) continue;
    const list = bySubject.get(subject) ?? [];
    list.push(q);
    bySubject.set(subject, list);
  }
  for (const [id, list] of bySubject) bySubject.set(id, shuffle(list, rng));

  const taken = new Set<T>();
  const out: T[] = [];
  const takeFrom = (subject: string): boolean => {
    const list = bySubject.get(subject);
    if (!list) return false;
    while (list.length > 0) {
      const q = list.pop()!;
      if (taken.has(q)) continue;
      taken.add(q);
      out.push(q);
      return true;
    }
    return false;
  };

  if (count >= CFA_LEVEL_1_SUBJECTS.length) {
    for (const [subject, want] of examSubjectPlan(count)) {
      for (let i = 0; i < want; i += 1) if (!takeFrom(subject)) break;
    }
  } else {
    for (let i = 0; i < count; i += 1) takeFrom(drawSubject(rng));
  }

  // Bù phần thiếu từ bất kỳ câu nào chưa dùng.
  if (out.length < count) {
    for (const q of shuffle(pool, rng)) {
      if (out.length >= count) break;
      if (!taken.has(q)) {
        taken.add(q);
        out.push(q);
      }
    }
  }
  return shuffle(out, rng).slice(0, count);
}

// ── Định dạng câu hỏi ──────────────────────────────────────────────────────

/** Số lựa chọn của một câu hỏi CFA. Đề thi thật dùng ba, kho câu hỏi của ta
 *  dùng bốn. */
export const CFA_OPTION_COUNT = 3;

/** Bỏ bớt phương án sai để câu hỏi về đúng ba lựa chọn như đề thi.
 *
 *  Cắt lúc GIAO câu hỏi chứ không viết lại kho. Viết lại thì phải sửa 3.494
 *  câu của cả corpus, và quan trọng hơn: mức đoán mò đổi từ 25% lên 33%, tức
 *  hai trần `MAX_TELL_SHARE` và `MAX_SHORTEST_SHARE` trong
 *  `scripts/audit-lesson-content.mjs` - vốn hiệu chỉnh quanh mốc 25% - đều phải
 *  tính lại cho riêng nhóm bài CFA trong khi phần còn lại vẫn 4 lựa chọn. Cắt
 *  lúc giao thì kho và cổng kiểm của nó không phải biết gì về chuyện này.
 *
 *  Bỏ một phương án SAI ngẫu nhiên, không phải phương án theo một quy tắc cố
 *  định: bỏ theo quy tắc (ngắn nhất chẳng hạn) là tự tạo ra một manh mối mới,
 *  đúng loại lỗi mà cả cổng kiểm chất lượng quiz sinh ra để chặn. */
export function toThreeOptions<T extends { options: string[]; correct: number }>(
  question: T,
  rng: Rng = Math.random
): T {
  if (question.options.length <= CFA_OPTION_COUNT) return question;

  const wrong = question.options.map((_, i) => i).filter((i) => i !== question.correct);
  const dropCount = question.options.length - CFA_OPTION_COUNT;
  const dropped = new Set<number>();
  const pool = [...wrong];
  for (let i = 0; i < dropCount && pool.length > 0; i += 1) {
    const at = Math.floor(rng() * pool.length);
    dropped.add(pool[at]);
    pool.splice(at, 1);
  }

  const kept = question.options.map((_, i) => i).filter((i) => !dropped.has(i));
  return {
    ...question,
    options: kept.map((i) => question.options[i]),
    correct: kept.indexOf(question.correct),
  };
}

// ── Thi thử ────────────────────────────────────────────────────────────────

/** Đề thi CFA Level I thật: 180 câu, hai ca, mỗi ca 135 phút.
 *
 *  Giữ đúng con số thật thay vì một bản rút gọn cho dễ chịu: cả điểm của một
 *  bài thi thử là biết mình chịu được bao lâu, và 90 câu trong 135 phút là
 *  đúng cái sức bền đó. */
export const CFA_EXAM = {
  totalQuestions: 180,
  sessions: 2,
  get questionsPerSession() {
    return this.totalQuestions / this.sessions;
  },
  minutesPerSession: 135,
  /** Ngưỡng đỗ CFA Institute không công bố; 70% là mốc các đơn vị luyện thi
   *  dùng làm chuẩn thận trọng, và ta nói rõ đó là ước lượng chứ không phải
   *  con số chính thức. */
  passRatio: 0.7,
} as const;

export interface SubjectScore {
  id: CfaSubjectId;
  name: string;
  correct: number;
  total: number;
}

/** Điểm tách theo môn. Đây mới là thứ dùng được sau một bài thi thử: tổng điểm
 *  chỉ nói đỗ hay trượt, còn "Ethics 8/27" nói cần học lại cái gì. */
export function scoreBySubject(
  answers: Array<{ lessonId: number; correct: boolean }>
): SubjectScore[] {
  const nameOf = new Map(CFA_LEVEL_1_SUBJECTS.map((s) => [s.id, s.name]));
  const acc = new Map<CfaSubjectId, { correct: number; total: number }>();
  for (const a of answers) {
    const subject = SUBJECT_OF_LESSON.get(a.lessonId);
    if (!subject) continue;
    const cur = acc.get(subject) ?? { correct: 0, total: 0 };
    cur.total += 1;
    if (a.correct) cur.correct += 1;
    acc.set(subject, cur);
  }
  // Giữ nguyên thứ tự môn của đề cương, không sắp theo điểm: người học đọc
  // bảng này nhiều lần và cần tìm được môn mình quan tâm ở cùng một chỗ.
  return CFA_LEVEL_1_SUBJECTS.filter((s) => acc.has(s.id)).map((s) => ({
    id: s.id,
    name: nameOf.get(s.id) ?? s.id,
    correct: acc.get(s.id)!.correct,
    total: acc.get(s.id)!.total,
  }));
}
