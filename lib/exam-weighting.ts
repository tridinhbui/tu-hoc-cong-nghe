/** Cân đề theo trọng số môn thi - dùng chung cho CFA và FRM.
 *
 *  Tách ra khỏi `cfa-exam.ts` khi FRM cần đúng cơ chế này. Chép sang một bản
 *  thứ hai thì hai bản sẽ trôi khỏi nhau, và cái trôi đi sẽ là cái ít người
 *  nhìn hơn - tức là đúng cái sẽ âm thầm phục vụ sai tỷ lệ.
 *
 *  Vấn đề chung của cả hai chứng chỉ: số bài mỗi môn phản ánh việc ta ĐÃ VIẾT
 *  ĐƯỢC bao nhiêu, không phải đề thi HỎI bao nhiêu. Xáo đều trên toàn bộ kho là
 *  xáo theo sai phân phối, và điểm thu được chảy thẳng vào các chỉ số "sẵn sàng
 *  thi" hiển thị cho người học. Nên tỷ lệ phải được áp ở khâu ra đề. */

export type Rng = () => number;

export interface WeightedSubject<Id extends string> {
  id: Id;
  /** Cận dưới và cận trên trọng số chính thức, theo phần trăm. Trọng số cố
   *  định (FRM công bố một con số) thì hai cận bằng nhau. */
  lo: number;
  hi: number;
}

/** "15–20%" → { lo: 15, hi: 20 }; "30%" → { lo: 30, hi: 30 }.
 *  Nhận cả gạch nối lẫn gạch ngang dài vì dữ liệu đang dùng en dash. */
export function parseWeight(weight: string): { lo: number; hi: number } {
  const [lo, hi] = weight
    .replace(/%/g, "")
    .split(/[–—-]/)
    .map((s) => Number(s.trim()));
  if (!Number.isFinite(lo)) throw new Error(`Trọng số môn thi không đọc được: ${weight}`);
  return { lo, hi: Number.isFinite(hi) ? hi : lo };
}

/** Tỷ lệ mục tiêu của từng môn, chuẩn hoá về tổng 1.
 *
 *  Lấy trung điểm dải rồi chia cho tổng. Bước chia là bắt buộc: CFA công bố
 *  dải chồng lấn nên các trung điểm cộng lại ra 102,5% chứ không phải 100.
 *  FRM công bố số cố định nên tổng đã là 100 và phép chia không đổi gì - cùng
 *  một hàm chạy đúng cho cả hai. */
export function normalisedShares<Id extends string>(
  subjects: Array<WeightedSubject<Id>>
): Array<{ id: Id; share: number }> {
  const mids = subjects.map((w) => ({ id: w.id, mid: (w.lo + w.hi) / 2 }));
  const total = mids.reduce((n, m) => n + m.mid, 0);
  if (total <= 0) throw new Error("Tổng trọng số bằng 0 - không chia đề được");
  return mids.map((m) => ({ id: m.id, share: m.mid / total }));
}

/** Xáo mảng. Nhận rng để phân phối kiểm được bằng test thay vì bằng mắt. */
export function shuffle<T>(arr: T[], rng: Rng = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Số câu mỗi môn cho một đề có kích thước cố định.
 *
 *  Phương pháp phần dư lớn nhất: chia phần nguyên trước, rồi phát nốt các câu
 *  lẻ cho những môn có phần thập phân lớn nhất. Làm tròn từng môn độc lập thì
 *  tổng lệch khỏi con số yêu cầu - một đề "100 câu" ra 99 hoặc 102.
 *
 *  PHÁ HOÀ NGẪU NHIÊN khi nhiều môn cùng phần dư. Không có bước này thì bài
 *  luyện ngắn ra y hệt nhau mãi mãi: FRM Part I có bốn môn 20/20/30/30, đề 5
 *  câu cho phần dư 0/0/0,5/0,5 và câu lẻ luôn rơi vào cùng một môn - đo ra
 *  Thị trường 40% trong mọi phiên, không bao giờ hội tụ về 30%. Đề dài
 *  hiếm khi hoà nên bước này không đụng tới độ chính xác của thi thử. */
export function subjectPlan<Id extends string>(
  shares: Array<{ id: Id; share: number }>,
  total: number,
  rng: Rng = Math.random
): Map<Id, number> {
  const raw = shares.map((s) => ({ id: s.id, exact: s.share * total }));
  const plan = new Map<Id, number>(raw.map((r) => [r.id, Math.floor(r.exact)]));
  let left = total - [...plan.values()].reduce((a, b) => a + b, 0);

  const rem = (r: { exact: number }) => r.exact - Math.floor(r.exact);
  // Xáo trước rồi mới sắp: sort ổn định nên các phần tử hoà nhau giữ nguyên thứ
  // tự đã xáo, tức là hoà được phá ngẫu nhiên mà thứ hạng vẫn đúng.
  const byRemainder = shuffle(raw, rng).sort((a, b) => rem(b) - rem(a));

  for (let i = 0; left > 0; i += 1, left -= 1) {
    const s = byRemainder[i % byRemainder.length];
    plan.set(s.id, (plan.get(s.id) ?? 0) + 1);
  }
  return plan;
}

/** Bốc một môn theo trọng số, cho những đề quá ngắn để chia phần.
 *
 *  Từng phiên vẫn khác nhau, còn trung bình qua nhiều phiên hội tụ đúng về tỷ
 *  lệ đề thi - mà "nhiều phiên" mới là thứ người học thực sự trải qua. */
export function drawSubject<Id extends string>(
  shares: Array<{ id: Id; share: number }>,
  rng: Rng = Math.random
): Id {
  let r = rng();
  for (const s of shares) {
    r -= s.share;
    if (r <= 0) return s.id;
  }
  return shares[shares.length - 1].id;
}

/** Chọn câu theo trọng số môn, từ các rổ đã gom sẵn theo môn.
 *
 *  Nhận RỔ chứ không nhận hàm `item → môn`, vì một câu hỏi có thể thuộc nhiều
 *  môn. Trong FRM có 16 bài được nhiều môn cùng tham chiếu và 15 trong số đó
 *  bắc qua cả hai phần thi - Part II xây trên nền Part I nên chuyện đó là đúng,
 *  không phải lỗi dữ liệu. Một hàm tra ngược "bài này thuộc môn nào" sẽ phải
 *  chọn bừa một môn và làm hỏng cả tỷ lệ lẫn bảng điểm theo môn.
 *
 *  Trả kèm môn mà câu đó được bốc CHO, vì đó mới là thông tin đúng: cùng một
 *  câu hỏi có thể đứng ở ô Market Risk trong đề này và ô Valuation trong đề
 *  khác.
 *
 *  Đề dài thì chia phần cố định (chính xác tuyệt đối, hợp cho thi thử); đề ngắn
 *  thì bốc từng câu theo trọng số. Môn nào cạn câu thì phần thiếu lấy bù từ các
 *  môn còn lại - thà lệch tỷ lệ còn hơn trả về đề ngắn hơn số đã hứa. */
export function pickWeightedBuckets<T, Id extends string>(
  buckets: Map<Id, T[]>,
  count: number,
  shares: Array<{ id: Id; share: number }>,
  rng: Rng = Math.random
): Array<{ item: T; subject: Id }> {
  const remaining = new Map<Id, T[]>();
  for (const [id, list] of buckets) remaining.set(id, shuffle(list, rng));

  const taken = new Set<T>();
  const out: Array<{ item: T; subject: Id }> = [];
  const takeFrom = (subject: Id): boolean => {
    const list = remaining.get(subject);
    if (!list) return false;
    while (list.length > 0) {
      const item = list.pop()!;
      // Câu đã dùng ở môn khác thì bỏ qua: một câu chỉ được xuất hiện một lần
      // trong đề, dù nó nằm trong rổ của hai môn.
      if (taken.has(item)) continue;
      taken.add(item);
      out.push({ item, subject });
      return true;
    }
    return false;
  };

  if (count >= shares.length) {
    for (const [subject, want] of subjectPlan(shares, count, rng)) {
      for (let i = 0; i < want; i += 1) if (!takeFrom(subject)) break;
    }
  } else {
    for (let i = 0; i < count; i += 1) takeFrom(drawSubject(shares, rng));
  }

  // Bù phần thiếu từ bất kỳ môn nào còn câu.
  if (out.length < count) {
    for (const subject of shuffle([...remaining.keys()], rng)) {
      while (out.length < count && takeFrom(subject)) {
        // takeFrom đã đẩy vào out
      }
      if (out.length >= count) break;
    }
  }
  return shuffle(out, rng).slice(0, count);
}

/** Bản rút gọn cho trường hợp mỗi câu chỉ thuộc đúng một môn (CFA). */
export function pickWeighted<T, Id extends string>(
  pool: T[],
  count: number,
  shares: Array<{ id: Id; share: number }>,
  subjectOf: (item: T) => Id | undefined,
  rng: Rng = Math.random
): T[] {
  const buckets = new Map<Id, T[]>();
  for (const q of pool) {
    const subject = subjectOf(q);
    if (subject === undefined) continue;
    const list = buckets.get(subject) ?? [];
    list.push(q);
    buckets.set(subject, list);
  }
  return pickWeightedBuckets(buckets, count, shares, rng).map((r) => r.item);
}

/** Cắt bớt phương án SAI để câu hỏi về đúng số lựa chọn của đề thi.
 *
 *  Cắt lúc giao câu hỏi chứ không viết lại kho: viết lại thì mức đoán mò đổi,
 *  và hai trần trong `scripts/audit-lesson-content.mjs` - hiệu chỉnh quanh mốc
 *  4 lựa chọn - phải tính lại riêng cho nhóm bài đó trong khi phần còn lại giữ
 *  nguyên.
 *
 *  Bỏ ngẫu nhiên chứ không theo quy tắc cố định: bỏ theo quy tắc (ngắn nhất
 *  chẳng hạn) là tự tạo ra một manh mối mới, đúng loại lỗi mà cổng kiểm chất
 *  lượng quiz sinh ra để chặn. */
export function trimOptions<T extends { options: string[]; correct: number }>(
  question: T,
  keep: number,
  rng: Rng = Math.random
): T {
  if (question.options.length <= keep) return question;

  const wrong = question.options.map((_, i) => i).filter((i) => i !== question.correct);
  const dropCount = question.options.length - keep;
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
