import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

/** `STATIC_PAGE_LESSON_IDS` trong proxy.ts phải khớp với thư mục thật.
 *
 *  VÌ SAO BÀI NÀY TỒN TẠI. Bảng đó liệt kê các bài học có trang viết tay riêng
 *  dưới `app/bai-hoc/<slug>/page.tsx`. Next giải route tĩnh trước route dữ
 *  liệu, nên phép kiểm khoá của `app/bai-hoc/[slug]/page.tsx` không bao giờ
 *  chạy cho chúng, và proxy là chỗ DUY NHẤT chặn được trước khi trang dựng.
 *
 *  Bảng được giữ đồng bộ bằng một ghi chú bảo trì nhờ người đọc nhớ. Lúc đo,
 *  nó có GIAO BẰNG KHÔNG với thực tế: cả 38 slug trong bảng đều đã bị xoá
 *  page.tsx từ 767 commit trước và giờ đi qua route dữ liệu, còn cả 13 trang
 *  đang tồn tại thì không slug nào có mặt.
 *
 *  Không gì hỏng, chỉ vì khoá bài học đang tắt toàn site -
 *  `isLessonLockedForUser` trả `false` vô điều kiện - nên bảng này suốt thời
 *  gian qua chỉ để trang trí. Nhưng lib/lesson-locking.ts có sẵn hướng dẫn bật
 *  lại, và ngày ai đó làm theo thì 13 trang kia phục vụ trọn nội dung cho bất
 *  kỳ ai có URL, đúng cái lỗi bảng này sinh ra để chặn.
 *
 *  Một ghi chú nhờ người nhớ không phải một cổng. Bài này kiểm CẢ HAI CHIỀU,
 *  đọc thẳng thư mục, nên bảng không thể lệch lần nữa - dù trang mới được thêm
 *  hay trang cũ được chuyển sang route dữ liệu. */

const PAGES_DIR = "app/bai-hoc";

function handAuthoredSlugs(): string[] {
  return readdirSync(PAGES_DIR)
    .filter((entry) => entry !== "[slug]")
    .filter((entry) => existsSync(`${PAGES_DIR}/${entry}/page.tsx`))
    .sort();
}

function staticPageMap(): Record<string, number> {
  const source = readFileSync("proxy.ts", "utf8");
  const start = source.indexOf("const STATIC_PAGE_LESSON_IDS");
  const end = source.indexOf("};", start);
  expect(start, "không tìm thấy STATIC_PAGE_LESSON_IDS trong proxy.ts").toBeGreaterThan(-1);
  const body = source.slice(start, end);
  const map: Record<string, number> = {};
  for (const match of body.matchAll(/"([a-z0-9-]+)":\s*(\d+)/g)) {
    map[match[1]] = Number(match[2]);
  }
  return map;
}

/** Id bài học mà chính trang khai báo, dạng `id: 9010, slug: "free-cash-flow"`. */
function idDeclaredByPage(slug: string): number | null {
  const source = readFileSync(`${PAGES_DIR}/${slug}/page.tsx`, "utf8");
  const match = source.match(/\bid:\s*(\d+),\s*slug:\s*"([a-z0-9-]+)"/);
  if (!match || match[2] !== slug) return null;
  return Number(match[1]);
}

describe("bảng trang bài học viết tay trong proxy", () => {
  it("có đủ mọi trang đang tồn tại", () => {
    const missing = handAuthoredSlugs().filter((slug) => !(slug in staticPageMap()));
    expect(
      missing,
      `${missing.length} trang viết tay không có trong STATIC_PAGE_LESSON_IDS. ` +
        `Khi khoá bài học được bật lại, chúng phục vụ trọn nội dung cho bất kỳ ai ` +
        `có URL, vì route [slug] không bao giờ chạy cho chúng.`
    ).toEqual([]);
  });

  it("không giữ mục nào đã hết trang", () => {
    // Chiều này là chiều đã lệch: 38 mục sống sót sau khi trang của chúng bị
    // xoá. Một mục chết không gây hại trực tiếp, nhưng nó làm bảng trông như
    // đang được bảo trì - đó là cách chiều còn lại lệch mà không ai thấy.
    const stale = Object.keys(staticPageMap()).filter(
      (slug) => !existsSync(`${PAGES_DIR}/${slug}/page.tsx`)
    );
    expect(
      stale,
      `${stale.length} mục trỏ vào trang không còn tồn tại. Bài học đó giờ đi qua ` +
        `app/bai-hoc/[slug]/page.tsx, vốn tự kiểm khoá lấy - xoá mục khỏi proxy.ts.`
    ).toEqual([]);
  });

  it("id trong bảng khớp id chính trang khai báo", () => {
    // Một slug đúng với id sai còn tệ hơn thiếu hẳn: proxy sẽ hỏi trạng thái
    // khoá của MỘT BÀI KHÁC và cho qua theo câu trả lời của bài đó.
    const map = staticPageMap();
    const mismatched = handAuthoredSlugs()
      .filter((slug) => slug in map)
      .map((slug) => ({ slug, page: idDeclaredByPage(slug), map: map[slug] }))
      .filter((row) => row.page !== null && row.page !== row.map);
    expect(mismatched).toEqual([]);
  });
});
