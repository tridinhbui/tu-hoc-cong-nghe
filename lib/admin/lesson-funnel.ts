import { createAdminClient } from "@/lib/supabase-admin";
import { getLessonsMeta } from "@/lib/lessons-loader";

/** Phễu của từng bài học: mở ra → đọc hết thân bài → hoàn thành.
 *
 *  Cho tới nay mọi câu hỏi kiểu "bài nào cần viết lại trước" đều là phỏng
 *  đoán. Có 715 bài; viết lại 396 bài để thêm `whyItMatters` là một canh bạc
 *  đắt, và không ai biết nó có tác dụng gì.
 *
 *  Ba mốc, và hai trong ba đã được ghi từ trước:
 *    - MỞ: sự kiện `lesson_open`, mảnh duy nhất phải thêm.
 *    - ĐỌC HẾT: `lesson_free_recall_*`. Cổng nhớ lại nằm sau toàn bộ thân bài,
 *      nên chạm tới nó nghĩa là đã đọc hết - kể cả khi người học bấm bỏ qua.
 *    - HOÀN THÀNH: user_progress, đã có sẵn.
 *
 *  KHÔNG đọc nội dung người học viết ra ở bước nhớ lại, và không cần: chỉ đếm
 *  số lượt theo slug. */

export interface LessonFunnelRow {
  slug: string;
  title: string;
  opens: number;
  reachedRecall: number;
  completions: number;
  /** Bỏ dở giữa chừng: mở ra nhưng không bao giờ chạm tới cuối thân bài. */
  dropBeforeEnd: number;
}

export interface WhyItMattersSplit {
  /** Có bao nhiêu bài trong mỗi nhóm, và phễu gộp lại của nhóm đó. */
  withWhy: { lessons: number; opens: number; reachedRecall: number };
  withoutWhy: { lessons: number; opens: number; reachedRecall: number };
}

export interface LessonFunnel {
  available: boolean;
  reason?: string;
  rows: LessonFunnelRow[];
  totalOpens: number;
  /** Câu 1.3 của kế hoạch, trả lời bằng số chứ không bằng cảm giác. */
  whySplit: WhyItMattersSplit | null;
  /** Số lượt mở tối thiểu để một bài được tính vào phần so sánh. */
  minOpensForSplit: number;
}

/** Dưới ngưỡng này thì một bài chỉ là nhiễu: hai lượt mở và một lượt bỏ dở ra
 *  50%, và 50% đó không nói lên điều gì cả. */
const MIN_OPENS = 20;

const PAGE = 1000;

async function countByLabel(
  admin: ReturnType<typeof createAdminClient>,
  eventNames: string[],
  since: string
): Promise<Map<string, Set<string>>> {
  // Đếm theo (bài, người) chứ không theo số dòng: một người mở lại cùng một
  // bài năm lần không phải năm người học, và tỉ lệ tính trên số dòng sẽ bị
  // người đọc đi đọc lại kéo lệch.
  const out = new Map<string, Set<string>>();
  let page = 0;
  for (;;) {
    const { data, error } = await admin
      .from("feature_click_events")
      .select("user_id, metadata")
      .in("event_name", eventNames)
      .gte("created_at", since)
      .range(page * PAGE, page * PAGE + PAGE - 1);
    if (error) throw error;
    if (!data || data.length === 0) break;
    for (const row of data as Array<{ user_id: string | null; metadata: { label?: string } | null }>) {
      const slug = row.metadata?.label;
      if (!slug) continue;
      const set = out.get(slug) ?? new Set<string>();
      // Lượt chưa đăng nhập gộp thành một khoá riêng cho mỗi dòng, vì không
      // biết đó là một người hay nhiều người.
      set.add(row.user_id ?? `anon:${set.size}`);
      out.set(slug, set);
    }
    if (data.length < PAGE) break;
    page += 1;
  }
  return out;
}

export async function getLessonFunnel(days = 30): Promise<LessonFunnel> {
  const empty: LessonFunnel = {
    available: false,
    rows: [],
    totalOpens: 0,
    whySplit: null,
    minOpensForSplit: MIN_OPENS,
  };
  const admin = createAdminClient();
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  let opens: Map<string, Set<string>>;
  let recall: Map<string, Set<string>>;
  try {
    [opens, recall] = await Promise.all([
      countByLabel(admin, ["lesson_open"], since),
      countByLabel(
        admin,
        ["lesson_free_recall_start", "lesson_free_recall_skip", "lesson_free_recall_done"],
        since
      ),
    ]);
  } catch (e) {
    return { ...empty, reason: (e as Error).message };
  }

  if (opens.size === 0) {
    // Nói rõ vì sao trống thay vì bày ra một bảng rỗng trông như "không ai học
    // bài nào" - `lesson_open` là sự kiện mới, nên trước ngày nó lên production
    // sẽ không có một dòng nào.
    return {
      ...empty,
      /* i18n-ignore-start: thông báo vận hành cho quản trị viên, giải thích vì
         sao bảng trống - nó nói về việc triển khai (`lesson_open` là sự kiện
         mới, chưa có số cho tới khi bản mới lên production), không phải chữ
         người học đọc. Cùng loại với "Bảng focus_sessions chưa tồn tại" ở
         lib/admin/world-usage.ts. */
      reason:
        "Chưa có lượt `lesson_open` nào trong khoảng thời gian này. Sự kiện mới " +
        "được thêm - bảng này chỉ có số sau khi bản mới lên production và có " +
        "người mở một bài học.",
      /* i18n-ignore-end */
    };
  }

  const lessons = await getLessonsMeta();
  const bySlug = new Map(lessons.map((l) => [l.slug, l]));

  const rows: LessonFunnelRow[] = [];
  for (const [slug, users] of opens) {
    const meta = bySlug.get(slug);
    if (!meta) continue; // slug của bài đã bị xoá
    const reached = recall.get(slug)?.size ?? 0;
    rows.push({
      slug,
      title: meta.title,
      opens: users.size,
      reachedRecall: reached,
      completions: 0,
      dropBeforeEnd: Math.max(0, users.size - reached),
    });
  }
  rows.sort((a, b) => b.dropBeforeEnd - a.dropBeforeEnd);

  return {
    available: true,
    rows,
    totalOpens: rows.reduce((n, r) => n + r.opens, 0),
    whySplit: await buildWhySplit(rows),
    minOpensForSplit: MIN_OPENS,
  };
}

/** So bài CÓ `whyItMatters` với bài KHÔNG có, trên cùng một thước đo.
 *
 *  Đây không phải bằng chứng nhân quả - bài có `whyItMatters` cũng thường là
 *  bài được chăm hơn về mọi mặt. Nhưng nếu hai nhóm ra gần bằng nhau thì việc
 *  viết lại 396 bài gần như chắc chắn không đáng, và đó đã là một câu trả lời
 *  đủ để ra quyết định. */
async function buildWhySplit(rows: LessonFunnelRow[]): Promise<WhyItMattersSplit | null> {
  const eligible = rows.filter((r) => r.opens >= MIN_OPENS);
  if (eligible.length === 0) return null;

  const { readFile } = await import("node:fs/promises");
  const withWhy = { lessons: 0, opens: 0, reachedRecall: 0 };
  const withoutWhy = { lessons: 0, opens: 0, reachedRecall: 0 };

  for (const r of eligible) {
    let hasWhy = false;
    try {
      const raw = await readFile(`lib/lessons-data/${r.slug}.json`, "utf8");
      hasWhy = Boolean(JSON.parse(raw).whyItMatters);
    } catch {
      continue;
    }
    const bucket = hasWhy ? withWhy : withoutWhy;
    bucket.lessons += 1;
    bucket.opens += r.opens;
    bucket.reachedRecall += r.reachedRecall;
  }
  return { withWhy, withoutWhy };
}
