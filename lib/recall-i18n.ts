import "server-only";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import type { RecallItem } from "@/lib/recall-schedule";

/** Dịch thẻ "Nhớ lại" bằng cách LẦN NGƯỢC về bài học, không dịch tay.
 *
 *  `lib/recall-schedule.ts` là file SINH TỰ ĐỘNG từ `keyTakeaways` của các bài
 *  học - 1.518 chuỗi, và dòng đầu của nó bảo "regenerate via the recall-schedule
 *  generation script". Script đó KHÔNG có trong repo: `ls scripts/` không có
 *  file nào tên recall. Nên dữ liệu này trên thực tế đã đóng băng, và dịch tay
 *  nó là chép lại chính những câu đã dịch ở bài học, rồi để hai bản trôi khỏi
 *  nhau ngay lần sửa bài đầu tiên.
 *
 *  Cách ở đây: dựng một bảng tra `chuỗi tiếng Việt -> (slug, chỉ số)` từ
 *  `keyTakeaways` của bài học, rồi lấy phần tử cùng chỉ số trong bản dịch. Nhờ
 *  vậy thẻ nhớ lại tự đi theo bản dịch bài học - dịch thêm một bài là các thẻ
 *  trích từ bài đó cũng sang tiếng Anh, không phải làm gì thêm.
 *
 *  Khớp được 1.475/1.518 chuỗi (97%). Phần còn lại là những câu takeaway đã
 *  bị sửa ở bài học sau lần sinh cuối, cộng hai chuỗi trùng nhau giữa hai bài
 *  (không phân biệt được nguồn nên bỏ qua luôn). Chúng ở lại tiếng Việt - rơi
 *  về nguồn giống hệt mọi đường dịch khác trong repo, và tự khỏi khi nào ai đó
 *  viết lại script sinh.
 */

const lessonsDataDir = path.join(process.cwd(), "lib", "lessons-data");
const translationsDir = path.join(process.cwd(), "lib", "lessons-i18n");

type TakeawaySource = { slug: string; index: number };

let takeawayIndexPromise: Promise<Map<string, TakeawaySource>> | null = null;

/** Bảng tra dựng một lần cho mỗi tiến trình. Chuỗi xuất hiện ở HAI bài khác
 *  nhau bị loại hẳn: không có cách nào biết thẻ đang trích từ bài nào, và đoán
 *  sai thì thẻ hiện một câu của bài khác. */
async function getTakeawayIndex(): Promise<Map<string, TakeawaySource>> {
  if (!takeawayIndexPromise) {
    takeawayIndexPromise = (async () => {
      const map = new Map<string, TakeawaySource>();
      const ambiguous = new Set<string>();
      let files: string[] = [];
      try {
        files = (await readdir(lessonsDataDir)).filter((f) => f.endsWith(".json") && f !== "index.json");
      } catch {
        return map;
      }
      for (const file of files) {
        try {
          const raw = await readFile(path.join(lessonsDataDir, file), "utf8");
          const lesson = JSON.parse(raw) as { keyTakeaways?: string[] };
          const slug = file.replace(/\.json$/, "");
          lesson.keyTakeaways?.forEach((text, index) => {
            if (map.has(text)) ambiguous.add(text);
            else map.set(text, { slug, index });
          });
        } catch {
          // Một file hỏng không được làm hỏng cả bảng tra.
        }
      }
      for (const text of ambiguous) map.delete(text);
      return map;
    })();
  }
  return takeawayIndexPromise;
}

const translationCache = new Map<string, string[] | null>();

async function loadTranslatedTakeaways(slug: string, locale: Locale): Promise<string[] | null> {
  const key = `${locale}:${slug}`;
  if (translationCache.has(key)) return translationCache.get(key) ?? null;
  let takeaways: string[] | null = null;
  try {
    const raw = await readFile(path.join(translationsDir, locale, `${slug}.json`), "utf8");
    const parsed = JSON.parse(raw) as { keyTakeaways?: unknown };
    if (Array.isArray(parsed.keyTakeaways)) takeaways = parsed.keyTakeaways as string[];
  } catch {
    takeaways = null;
  }
  translationCache.set(key, takeaways);
  return takeaways;
}

async function translateTakeaway(text: string, locale: Locale): Promise<string> {
  const source = (await getTakeawayIndex()).get(text);
  if (!source) return text;
  const translated = await loadTranslatedTakeaways(source.slug, locale);
  const candidate = translated?.[source.index];
  // Mảng lệch độ dài thì chỉ số không còn trỏ đúng chỗ - trả về bản gốc thay
  // vì trả về một câu takeaway khác của cùng bài.
  if (!candidate || !candidate.trim() || translated!.length !== (await sourceTakeawayCount(source.slug))) {
    return text;
  }
  return candidate;
}

const sourceCountCache = new Map<string, number>();

async function sourceTakeawayCount(slug: string): Promise<number> {
  const cached = sourceCountCache.get(slug);
  if (cached !== undefined) return cached;
  let count = 0;
  try {
    const raw = await readFile(path.join(lessonsDataDir, `${slug}.json`), "utf8");
    const lesson = JSON.parse(raw) as { keyTakeaways?: string[] };
    count = lesson.keyTakeaways?.length ?? 0;
  } catch {
    count = 0;
  }
  sourceCountCache.set(slug, count);
  return count;
}

/** Dịch một mẻ thẻ nhớ lại. Locale gốc thì trả về nguyên mảng. */
export async function localizeRecallItems(items: RecallItem[], locale: Locale): Promise<RecallItem[]> {
  if (locale === DEFAULT_LOCALE || items.length === 0) return items;
  return Promise.all(
    items.map(async (item) => ({
      ...item,
      // `fromTitle` cũng là chuỗi tiếng Việt, nhưng nó là TIÊU ĐỀ bài chứ không
      // phải takeaway nên không nằm trong bảng tra - xử lý riêng ở dưới.
      fromTitle: await translateLessonTitle(item.fromTitle, locale),
      text: await translateTakeaway(item.text, locale),
      distractors: await Promise.all(item.distractors.map((d) => translateTakeaway(d, locale))),
    }))
  );
}

let titleIndexPromise: Promise<Map<string, string>> | null = null;

/** Tiêu đề tiếng Việt -> slug. Cùng cách loại chuỗi trùng như bảng takeaway. */
async function getTitleIndex(): Promise<Map<string, string>> {
  if (!titleIndexPromise) {
    titleIndexPromise = (async () => {
      const map = new Map<string, string>();
      const ambiguous = new Set<string>();
      let files: string[] = [];
      try {
        files = (await readdir(lessonsDataDir)).filter((f) => f.endsWith(".json") && f !== "index.json");
      } catch {
        return map;
      }
      for (const file of files) {
        try {
          const raw = await readFile(path.join(lessonsDataDir, file), "utf8");
          const lesson = JSON.parse(raw) as { title?: string };
          if (!lesson.title) continue;
          if (map.has(lesson.title)) ambiguous.add(lesson.title);
          else map.set(lesson.title, file.replace(/\.json$/, ""));
        } catch {
          // bỏ qua file hỏng
        }
      }
      for (const title of ambiguous) map.delete(title);
      return map;
    })();
  }
  return titleIndexPromise;
}

async function translateLessonTitle(title: string, locale: Locale): Promise<string> {
  const slug = (await getTitleIndex()).get(title);
  if (!slug) return title;
  try {
    const raw = await readFile(path.join(translationsDir, locale, `${slug}.json`), "utf8");
    const parsed = JSON.parse(raw) as { title?: unknown };
    if (typeof parsed.title === "string" && parsed.title.trim()) return parsed.title;
  } catch {
    // chưa dịch bài này
  }
  return title;
}
