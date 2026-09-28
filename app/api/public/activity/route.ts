import { getDb } from "@/lib/d1/server";
import { getCommunityLearningNow } from "@/lib/d1/rpc";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { toPublicItems, fillDaily, type PublicActivity } from "@/lib/public-activity";

/**
 * Hoạt động học công khai cho trang chủ: dòng hoạt động ẨN DANH + số bài hoàn
 * thành mỗi ngày trong 14 ngày. Xem lib/public-activity.ts về lý do ẩn danh
 * phải làm ở đây chứ không ở trình duyệt.
 *
 * CHI PHÍ LÀ RÀNG BUỘC THIẾT KẾ CHÍNH. Từ 01/09/2026 D1 gói miễn phí TỪ CHỐI
 * MỌI truy vấn khi tài khoản vượt 5 triệu hàng đọc trong ngày - không riêng
 * route này, cả ứng dụng. Câu đếm theo ngày không có chỉ mục phải quét toàn bộ
 * user_progress (~27.000 hàng), tức khoảng 185 lượt vào trang chủ không đệm là
 * đủ làm sập cơ sở dữ liệu. Ba lớp chặn:
 *
 *   1. migrations-d1/0007: chỉ mục riêng phần trên completed_at, nên câu đếm
 *      14 ngày chỉ đọc hàng trong 14 ngày.
 *   2. Cache API của Cloudflare - dùng chung giữa mọi isolate trong một trung
 *      tâm dữ liệu, 30 phút.
 *   3. Bộ nhớ của isolate - cho `next dev` và cho lúc Cache API trượt.
 *
 * Với cả ba, trần là ~48 lần truy vấn mỗi ngày mỗi trung tâm dữ liệu.
 */

const TTL_SECONDS = 30 * 60;
const memo = new Map<string, { at: number; body: PublicActivity }>();

type EdgeCache = { match(r: Request): Promise<Response | undefined>; put(r: Request, res: Response): Promise<void> };
function edgeCache(): EdgeCache | null {
  const c = (globalThis as unknown as { caches?: { default?: EdgeCache } }).caches;
  return c?.default ?? null;
}

const EMPTY = (): PublicActivity => ({ items: [], daily: fillDaily([]), generatedAt: new Date().toISOString() });

function json(body: PublicActivity) {
  return Response.json(body, {
    headers: { "Cache-Control": `public, max-age=60, s-maxage=${TTL_SECONDS}` },
  });
}

async function compute(locale: "vi" | "en"): Promise<PublicActivity> {
  const db = getDb();
  const [learners, daily, lessons] = await Promise.all([
    getCommunityLearningNow(db as never, 24, 7),
    db
      .prepare(
        `select date(completed_at) as d, count(*) as n
           from user_progress
          where completed = 1
            and completed_at >= date('now', '-13 days')
          group by date(completed_at)`
      )
      .all(),
    getLessonsMeta(locale),
  ]);
  const lookup = new Map(lessons.map((l) => [l.id, { title: l.title, slug: l.slug }]));
  return {
    items: toPublicItems(learners, lookup),
    daily: fillDaily((daily.results ?? []) as { d: string; n: number }[]),
    generatedAt: new Date().toISOString(),
  };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("locale");
  const locale = isLocale(q) ? q : DEFAULT_LOCALE;

  const hit = memo.get(locale);
  if (hit && Date.now() - hit.at < TTL_SECONDS * 1000) return json(hit.body);

  // Khoá đệm chỉ gồm locale, không gồm tham số lạ nào khác - nếu không, ai cũng
  // phá được bộ đệm bằng cách thêm `?x=1`, `?x=2`... và mỗi biến thể là một lần
  // quét cơ sở dữ liệu.
  const key = new Request(`${url.origin}/api/public/activity?locale=${locale}`);
  const cache = edgeCache();
  try {
    const cached = await cache?.match(key);
    if (cached) return cached;
  } catch {
    // Cache API không có hoặc lỗi - đi tiếp xuống cơ sở dữ liệu.
  }

  let body: PublicActivity;
  try {
    body = await compute(locale);
  } catch (err) {
    console.error("[public/activity]", err);
    // Dải phụ ở trang chủ. Lỗi ở đây trả về rỗng, không 500, và KHÔNG đệm, để
    // lần sau thử lại được.
    return json(EMPTY());
  }
  memo.set(locale, { at: Date.now(), body });
  const res = json(body);
  try {
    await cache?.put(key, res.clone());
  } catch {
    // không đệm được thì thôi
  }
  return res;
}
