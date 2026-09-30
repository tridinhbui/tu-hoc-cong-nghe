import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { resolveLocale, type Locale } from "@/lib/i18n/locales";

/**
 * Bộ não của chatbot Cơ Cơ (components/CoCoChatbot.tsx).
 *
 * Hai tầng, theo thứ tự:
 *  1. Workers AI (binding `AI` trong wrangler.jsonc) trả lời câu hỏi, với vài
 *     bài học khớp từ khoá được nhét vào lời dặn hệ thống để nó gợi ý đúng bài
 *     có thật trong app thay vì bịa tên bài.
 *  2. Thiếu binding (chạy `next dev` không qua worker) hoặc AI lỗi: vẫn trả về
 *     các bài khớp từ khoá kèm một câu dẫn. Chatbot hỏng thì vẫn là một ô tìm
 *     bài, không phải một thông báo lỗi.
 *
 * Phản hồi trả về TRỌN câu một lần, không stream: hiệu ứng gõ chữ làm ở phía
 * client (TypingText), nên nhịp gõ đều nhau dù mạng nhanh hay chậm.
 */

const MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
const MAX_MESSAGE_CHARS = 1000;
const MAX_HISTORY = 10;

// Chặn spam rẻ tiền: mỗi isolate giữ bộ đếm riêng nên không phải giới hạn
// chính xác toàn cục, nhưng đủ để một vòng lặp gọi API không đốt hết quota AI.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 20;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

type ChatMessage = { role: "user" | "assistant"; content: string };
type LessonLink = { title: string; slug: string };

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");
}

const STOPWORDS = new Set(
  "la gi the nao lam sao cach cua cho voi va hay khong co duoc toi minh ban em anh chi mot nhung cac nay do thi ma de ve tu trong khi nao sao what how is are the a an of to for and or in on do does i you me my can with about".split(" ")
);

async function findLessons(query: string, locale: Locale, limit = 3): Promise<LessonLink[]> {
  const words = normalize(query)
    .split(/[^a-z0-9+#.]+/)
    .filter((w) => w.length >= 2 && !STOPWORDS.has(w));
  if (words.length === 0) return [];

  const lessons = await getLessonsMeta(locale);
  const scored: { lesson: LessonLink; score: number }[] = [];
  for (const l of lessons) {
    if (l.isVisible === false) continue;
    const title = normalize(l.title);
    const sub = normalize(l.subtitle ?? "");
    let score = 0;
    for (const w of words) {
      if (title.includes(w)) score += 3;
      else if (sub.includes(w)) score += 1;
    }
    if (score > 0) scored.push({ lesson: { title: l.title, slug: l.slug }, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.lesson);
}

async function currentLessonTitle(pathname: string, locale: Locale): Promise<string | null> {
  const m = /^\/bai-hoc\/([^/?#]+)/.exec(pathname);
  if (!m) return null;
  const lessons = await getLessonsMeta(locale);
  return lessons.find((l) => l.slug === decodeURIComponent(m[1]))?.title ?? null;
}

function systemPrompt(locale: Locale, pathname: string, lessonTitle: string | null, links: LessonLink[]): string {
  const vi = locale === "vi";
  const lines = vi
    ? [
        "Bạn là Cơ Cơ, linh vật trợ lý học của Tự Học Công Nghệ - app dạy công nghệ cho người mới bắt đầu (lập trình, web, dữ liệu, AI, DevOps).",
        "Xưng \"tớ\", gọi \"bạn\". Trả lời bằng tiếng Việt, ngắn gọn (tối đa khoảng 150 từ), thân thiện, giải thích như cho người chưa biết gì.",
        "Chỉ dùng văn bản thường: không markdown, không dấu **, không tiêu đề #, không emoji. Có thể xuống dòng và gạch đầu dòng bằng dấu \"-\".",
        "Khi người học hỏi bài tập, gợi ý hướng nghĩ trước thay vì đưa ngay đáp án.",
        "Không bịa tên bài học. Chỉ nhắc tới bài học nếu nó có trong danh sách dưới đây.",
        `Người học đang ở trang: ${pathname}.`,
      ]
    : [
        "You are Cơ Cơ, the study-buddy mascot of Tự Học Công Nghệ - an app teaching tech to complete beginners (programming, web, data, AI, DevOps).",
        "Reply in English, briefly (about 150 words max), friendly, explaining as if to someone with no background.",
        "Plain text only: no markdown, no **, no # headings, no emoji. Line breaks and \"-\" bullets are fine.",
        "When the learner asks about an exercise, nudge their thinking before handing over the answer.",
        "Never invent lesson names. Only mention a lesson if it appears in the list below.",
        `The learner is on page: ${pathname}.`,
      ];
  if (lessonTitle) lines.push(vi ? `Họ đang học bài: "${lessonTitle}".` : `They are studying the lesson: "${lessonTitle}".`);
  if (links.length > 0) {
    lines.push(vi ? "Bài học liên quan trong app:" : "Related lessons in the app:");
    for (const l of links) lines.push(`- ${l.title}`);
  }
  return lines.join("\n");
}

// Mô hình đôi khi vẫn chèn markdown dù đã dặn; bong bóng chat hiện văn bản
// thô nên dấu ** sẽ lộ ra nguyên xi.
function cleanReply(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*\*\s+/gm, "- ")
    .replace(/`([^`\n]+)`/g, "$1")
    .trim();
}

export async function POST(req: Request) {
  let body: { messages?: unknown; locale?: unknown; pathname?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const locale = resolveLocale(body.locale);
  const pathname = typeof body.pathname === "string" ? body.pathname.slice(0, 200) : "/";
  const messages: ChatMessage[] = Array.isArray(body.messages)
    ? body.messages
        .filter(
          (m): m is ChatMessage =>
            !!m &&
            typeof m === "object" &&
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string" &&
            m.content.trim().length > 0
        )
        .slice(-MAX_HISTORY)
        .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }))
    : [];

  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for") ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const [links, lessonTitle] = await Promise.all([
    findLessons(last.content, locale).catch(() => []),
    currentLessonTitle(pathname, locale).catch(() => null),
  ]);

  let ai: CloudflareEnv["AI"] | undefined;
  try {
    ai = getCloudflareContext().env.AI;
  } catch {
    ai = undefined;
  }

  if (ai) {
    try {
      const result = (await ai.run(MODEL as never, {
        messages: [{ role: "system", content: systemPrompt(locale, pathname, lessonTitle, links) }, ...messages],
        max_tokens: 600,
      } as never)) as { response?: string };
      const reply = cleanReply(result?.response ?? "");
      if (reply) return NextResponse.json({ reply, links, mode: "ai" });
    } catch (err) {
      console.error("[coco-chat] Workers AI lỗi:", err);
    }
  }

  return NextResponse.json({ reply: null, links, mode: "offline" });
}
