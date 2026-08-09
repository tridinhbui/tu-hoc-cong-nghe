import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getLessonsMeta } from "@/lib/lessons-loader";

// Một trang bài học viết tay khai `id` của riêng nó, và id đó là thứ
// LessonPageLayout ghi vào user_progress:
//
//   const persistedLessonId = lesson.slug
//     ? CANONICAL_LESSON_IDS_BY_SLUG[lesson.slug] ?? lesson.id
//     : lesson.id;
//
// Nếu id ấy trùng id của một bài CÓ THẬT, học xong trang này sẽ đánh dấu bài
// kia hoàn thành - cộng XP cho nó, và gắn ghi chú, highlight, phản hồi của
// trang này vào nó. Cả 17 trang từng ở đúng tình trạng đó: chúng khai id 2-17
// và 20, tức nguyên dải Chặng 3 của track cá nhân. Không trang nào khai `slug`
// và không slug nào có trong CANONICAL_LESSON_IDS_BY_SLUG, nên cả hai nhánh
// của lá chắn trên đều trượt và nó rơi thẳng về lesson.id.
//
// Không có gì bắt được: `id` là number nên tsc thấy hợp lệ, và không test nào
// đọc các trang này.

const DIR = "app/bai-hoc";

/** Id tổng hợp cho trang chưa có bài tương ứng trong corpus. Cố ý nằm rất xa
 *  id lớn nhất hiện tại (1745) để corpus lớn lên cũng không đụng lại. */
const SYNTHETIC_MIN = 9001;

interface Bespoke {
  slug: string;
  id: number;
  declaredSlug: string | null;
}

function bespokePages(): Bespoke[] {
  const out: Bespoke[] = [];
  for (const slug of readdirSync(DIR)) {
    if (slug.startsWith("[")) continue;
    const file = path.join(DIR, slug, "page.tsx");
    if (!existsSync(file)) continue;
    const src = readFileSync(file, "utf8");
    const id = /const (?:meta|LESSON): LessonMeta = \{[\s\S]*?\bid:\s*(\d+)/.exec(src);
    if (!id) continue;
    const declared = /const (?:meta|LESSON): LessonMeta = \{[\s\S]*?\bslug:\s*"([^"]+)"/.exec(src);
    out.push({ slug, id: Number(id[1]), declaredSlug: declared?.[1] ?? null });
  }
  return out;
}

describe("id của trang bài học viết tay", () => {
  const pages = bespokePages();

  it("có trang để kiểm - nếu không, test này vô nghĩa", () => {
    // Ngưỡng là 0, không phải một con số cố định. Số trang viết tay đang GIẢM
    // dần khi từng trang được kéo về lib/lessons.ts, nên mọi ngưỡng cứng sẽ tự
    // đỏ khi migration tiến lên - bản đầu đòi > 10 và đỏ đúng lúc trang thứ
    // bảy được migrate. Khi trang cuối cùng đi, cả file test này nên đi theo:
    // không còn trang nào thì không còn id nào để đụng.
    expect(pages.length).toBeGreaterThan(0);
  });

  it("không id nào trùng một bài có thật trong corpus", async () => {
    // Bất biến quan trọng nhất. Một trang viết tay CÓ THỂ dùng id của bài cùng
    // slug - đó là điều CANONICAL_LESSON_IDS_BY_SLUG làm cho 36 trang khác.
    // Cái không được phép là mang id của bài mang slug KHÁC.
    const lessons = await getLessonsMeta();
    const slugById = new Map(lessons.map((l) => [l.id, l.slug]));
    const clashes = pages
      .filter((p) => slugById.has(p.id) && slugById.get(p.id) !== p.slug)
      .map((p) => `${p.slug} (id ${p.id}) đang ghi đè lên bài "${slugById.get(p.id)}"`);
    expect(clashes, "trang viết tay ghi tiến độ vào bài khác").toEqual([]);
  });

  it("mỗi trang khai slug, và slug khớp đúng thư mục của nó", () => {
    // `slug` là nhánh đầu của lá chắn trong LessonPageLayout. Thiếu nó thì id
    // của trang không bao giờ được ánh xạ lại, kể cả sau khi bài thật đã tồn
    // tại - nên một trang được migrate sẽ vẫn ghi vào id tổng hợp.
    const wrong = pages
      .filter((p) => p.declaredSlug !== p.slug)
      .map((p) => `${p.slug}: khai slug ${p.declaredSlug ?? "(thiếu)"}`);
    expect(wrong, "slug trong meta phải khớp tên thư mục").toEqual([]);
  });

  it("id tổng hợp không đụng nhau", () => {
    const synthetic = pages.filter((p) => p.id >= SYNTHETIC_MIN);
    const ids = synthetic.map((p) => p.id);
    expect(new Set(ids).size, "hai trang dùng chung một id tổng hợp").toBe(ids.length);
  });
});
