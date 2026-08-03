import { FINANCE_CAREERS } from "@/lib/finance-careers";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL, isLessonInRange } from "@/lib/track-stages";
import { CAREER_CATEGORY_ORDER, type CareerCategory } from "@/lib/career-categories";
import { CFA_FORMULAS_DATA } from "@/lib/cfa-formulas-data";
import { FRM_FORMULAS_DATA } from "@/lib/frm-formulas-data";
import type { CfaSubjectId } from "@/lib/cfa-track";
import type { FrmSubjectId } from "@/lib/frm-track";

/** Thứ TREO TRÊN TƯỜNG trong mỗi phòng ngành: công thức của nghề, và bài học
 *  dẫn tới nó.
 *
 *  Một căn phòng đẹp mà rỗng thì đi một vòng là hết. Cái khiến người học đứng
 *  lại là thứ đọc được: công thức mà nghề này dùng hằng ngày, và đường đi thẳng
 *  từ đó tới bài học dạy nó. Cả hai đều lấy từ kho có sẵn - CFA/FRM formula
 *  sheet và relatedLessonSlugs của từng nghề - chứ không viết lại ở đây, vì một
 *  bản chép sẽ lệch khỏi bản gốc ngay lần sửa công thức đầu tiên.
 *
 *  Ánh xạ nhóm ngành → môn thi là thứ DUY NHẤT phải quyết ở đây, và nó là một
 *  Record đầy đủ: thêm một nhóm ngành mới mà quên khai công thức thì lỗi biên
 *  dịch, không phải một bức tường trống. */

const CFA_SUBJECTS_FOR: Record<CareerCategory, CfaSubjectId[]> = {
  investment: ["equity", "portfolio", "fixedIncome", "alternatives"],
  banking: ["corporate", "fixedIncome", "economics"],
  advisory: ["portfolio", "ethics", "economics"],
  accounting: ["fsa", "corporate"],
  data: ["quant", "derivatives"],
};

const FRM_SUBJECTS_FOR: Record<CareerCategory, FrmSubjectId[]> = {
  investment: ["investment-management", "market-risk"],
  banking: ["credit-risk", "liquidity-treasury"],
  advisory: ["foundations"],
  accounting: ["valuation-risk-models"],
  data: ["quant-analysis", "market-risk"],
};

export interface WallFormula {
  id: string;
  title: string;
  equation: string;
  /** Nguồn, để người học biết công thức này ở sổ tay nào. */
  source: "CFA" | "FRM";
  href: string;
}

/** Công thức treo tường của một nhóm ngành.
 *
 *  Chỉ lấy công thức CÓ `equation`: mấy công thức dạng phân số (tử/mẫu riêng)
 *  không rút được về một dòng khắc lên biển, và một tấm biển trống thì tệ hơn
 *  là không có tấm biển nào. */
export function formulasFor(category: CareerCategory, limit = 6): WallFormula[] {
  const cfa = CFA_FORMULAS_DATA.filter(
    (f) => CFA_SUBJECTS_FOR[category].includes(f.subjectId) && f.equation
  ).map(
    (f): WallFormula => ({
      id: f.id,
      title: f.title,
      equation: f.equation as string,
      source: "CFA",
      href: "/cfa/formulas",
    })
  );
  const frm = FRM_FORMULAS_DATA.filter(
    (f) => FRM_SUBJECTS_FOR[category].includes(f.subjectId) && f.equation
  ).map(
    (f): WallFormula => ({
      id: f.id,
      title: f.title,
      equation: f.equation as string,
      source: "FRM",
      href: "/frm/formulas",
    })
  );

  // Đan xen hai nguồn thay vì nối đuôi nhau: nối đuôi thì phòng nào cũng treo
  // sáu tấm CFA và không tấm FRM nào, vì kho CFA lớn hơn nhiều.
  //
  // Lọc trùng theo NỘI DUNG công thức, không theo id: hai sổ tay được viết
  // riêng nên cùng một công thức có hai id khác nhau - CAPM nằm ở cả hai, và
  // lọc theo id thì căn phòng treo nó hai lần cạnh nhau.
  const out: WallFormula[] = [];
  const seen = new Set<string>();
  const take = (f: WallFormula) => {
    const key = f.equation.replace(/\s+/g, "");
    if (seen.has(key) || out.length >= limit) return;
    seen.add(key);
    out.push(f);
  };
  for (let i = 0; out.length < limit && (i < cfa.length || i < frm.length); i += 1) {
    if (i < cfa.length) take(cfa[i]);
    if (i < frm.length) take(frm[i]);
  }
  return out;
}

/** Bài học của cả nhóm ngành: gộp lộ trình của mọi nghề trong nhóm, giữ thứ tự
 *  xuất hiện và bỏ trùng. Đây là "kệ sách" của phòng. */
export function lessonSlugsFor(category: CareerCategory, limit = 12): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const career of FINANCE_CAREERS) {
    if (career.category !== category) continue;
    for (const slug of career.relatedLessonSlugs) {
      if (seen.has(slug)) continue;
      seen.add(slug);
      out.push(slug);
      if (out.length >= limit) return out;
    }
  }
  return out;
}

/** Lộ trình bài học của riêng một nghề - hiện trên thẻ khi đứng trước bàn. */
export function lessonSlugsForCareer(careerId: string, limit = 8): string[] {
  const career = FINANCE_CAREERS.find((c) => c.id === careerId);
  return career ? career.relatedLessonSlugs.slice(0, limit) : [];
}

/** Mọi slug bài học mà cả khu phố cần biết tên - trang server nạp đúng chừng
 *  này thay vì cả 1.500 bài. */
export function allDistrictLessonSlugs(): string[] {
  const seen = new Set<string>();
  for (const category of CAREER_CATEGORY_ORDER) {
    for (const slug of lessonSlugsFor(category, 999)) seen.add(slug);
  }
  for (const career of FINANCE_CAREERS) {
    for (const slug of career.relatedLessonSlugs) seen.add(slug);
  }
  return [...seen];
}

// ── Chặng học tài chính ─────────────────────────────────────────────────────

export interface StageIndexEntry {
  key: string;
  track: "personal" | "professional";
  trackTitle: string;
  label: string;
  name: string;
  slugs: string[];
  available: boolean;
}

/** Chặng học đổ ra thành danh sách bài, dựng ở PHÍA SERVER.
 *
 *  Chặng khai bằng dải id bài (`days`) chứ không bằng danh sách slug, nên phải
 *  có bảng bài học mới đổi ra được. Bảng đó là dữ liệu server; làm việc này ở
 *  client đồng nghĩa với gửi cả 1.500 bài xuống trình duyệt để rồi dùng vài
 *  trăm. */
export function buildStageIndex(
  lessons: ReadonlyArray<{ id: number; slug: string }>,
  perStageLimit = 20
): StageIndexEntry[] {
  const sorted = [...lessons].sort((a, b) => a.id - b.id);
  const out: StageIndexEntry[] = [];
  for (const track of [TRACK_PERSONAL, TRACK_PROFESSIONAL]) {
    track.stages.forEach((stage, i) => {
      const slugs = sorted
        .filter(
          (l) =>
            isLessonInRange(l.id, stage) ||
            stage.parts.some((part) => isLessonInRange(l.id, part))
        )
        .slice(0, perStageLimit)
        .map((l) => l.slug);
      // Chặng không có bài nào thì không dựng phòng: một hành lang rỗng nói
      // với người học rằng chỗ này hỏng, chứ không phải rằng chặng chưa mở.
      if (slugs.length === 0) return;
      out.push({
        key: `chang-${track.id}-${i}`,
        track: track.id as "personal" | "professional",
        trackTitle: track.title,
        label: stage.label,
        name: stage.name,
        slugs,
        available: stage.available,
      });
    });
  }
  return out;
}
