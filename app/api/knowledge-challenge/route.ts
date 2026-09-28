import { NextRequest, NextResponse } from "next/server";
import { createServerCloudflareClient } from "@/lib/cloudflare-server";
import { getLessonById, getLessonsMeta } from "@/lib/lessons-loader";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL, isLessonInRange } from "@/lib/track-stages";
import {
  TECH_INTERVIEW_QUESTIONS,
  bankCoversCareer,
  getTechnicalQuestionsForCareer,
  type InterviewQuestion,
} from "@/lib/interview-bank";
import { getServerLocale } from "@/lib/i18n/server";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { signQuestionToken } from "@/lib/quiz-tokens";
import { normalizeQuizTrack } from "@/lib/cloudflare-quiz-sessions";
import { getCertTrack } from "@/lib/cert-tracks";

/**
 * Phát đề cho mọi bài trắc nghiệm đứng riêng: /kiem-tra (track personal /
 * professional, hoặc bài đã học), /phong-van-ky-thuat (track "interview" và
 * "mock-interview", đọc từ lib/interview-bank) và luyện miền thi ở /chung-chi
 * (track "cert", kèm `cert` và `domain`).
 *
 * Mỗi câu ra kèm một token đã ký chứa chỉ số đáp án đúng SAU khi xáo; route
 * nộp bài (./submit) chỉ tin token, không tin điểm client gửi lên.
 */

export interface ChallengeQuestion {
  lessonId: number;
  questionIndex: number;
  lessonTitle: string;
  lessonSlug: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  token: string;
  optionOrder: number[];
  category?: string;
}

const QUESTION_COUNT = 5;
const MAX_QUESTION_COUNT = 50;
const MOCK_INTERVIEW_QUESTION_COUNT = 10;
/** Dưới mức này thì lọc theo độ khó sẽ ra một đề lặp lại gần như y hệt mỗi lần,
 *  nên bù thêm câu ở độ khó gần nhất. */
const MIN_DIFFICULTY_POOL = 20;
const DIFFICULTY_ORDER = ["de", "trung-binh", "kho"];

/* i18n-ignore-start: giá trị tra khớp với trường `difficulty` của bài học (một
   union tiếng Việt dùng làm GIÁ TRỊ trong lib/lesson-types.ts), không phải chữ
   hiện ra màn hình - dịch chúng là lọc ra rỗng. */
const DIFFICULTY_LABELS: Record<string, string> = {
  de: "Dễ",
  "trung-binh": "Trung bình",
  kho: "Khó",
};
/* i18n-ignore-end */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function idsForTrack(track: "personal" | "professional"): Promise<number[]> {
  const allLessons = await getLessonsMeta(DEFAULT_LOCALE);
  const stages = track === "personal" ? TRACK_PERSONAL.stages : TRACK_PROFESSIONAL.stages;
  return allLessons
    .filter((l) => (l.track ? l.track === track : stages.some((stage) => isLessonInRange(l.id, stage))))
    .map((l) => l.id);
}

function withDifficultyPreferred(base: InterviewQuestion[], difficulty: string): InterviewQuestion[] {
  const exact = base.filter((q) => q.difficulty === difficulty);
  if (exact.length >= MIN_DIFFICULTY_POOL) return exact;
  const distance = (d: string) => Math.abs(DIFFICULTY_ORDER.indexOf(d) - DIFFICULTY_ORDER.indexOf(difficulty));
  const filler = shuffle(base.filter((q) => q.difficulty !== difficulty)).sort(
    (a, b) => distance(a.difficulty) - distance(b.difficulty)
  );
  return [...exact, ...filler.slice(0, MIN_DIFFICULTY_POOL - exact.length)];
}

type InterviewPoolQuestion = Omit<ChallengeQuestion, "lessonSlug" | "token" | "optionOrder"> & { category: string };

/** Câu phỏng vấn đưa vào cùng khuôn với câu bài học. `lessonId` âm (= -id câu)
 *  để không bao giờ trùng một bài học thật - chỗ ghi câu sai và chủ đề yếu
 *  phân biệt hai loại bằng dấu này. */
export function interviewQuestionsFor(
  difficulty: string | null,
  career?: string | null,
  section?: string | null
): InterviewPoolQuestion[] {
  let base = career && bankCoversCareer(career) ? getTechnicalQuestionsForCareer(career) : TECH_INTERVIEW_QUESTIONS;
  if (section) {
    const scoped = base.filter((q) => q.category === section);
    if (scoped.length > 0) base = scoped;
  }
  const questions =
    difficulty && difficulty !== "tat-ca" && DIFFICULTY_LABELS[difficulty] ? withDifficultyPreferred(base, difficulty) : base;
  return questions.map((q) => ({
    lessonId: -q.id,
    questionIndex: 0,
    lessonTitle: `Phỏng vấn · ${q.category}`,
    category: q.category,
    question: q.question,
    options: q.options,
    correct: q.correct,
    explanation: q.explanation,
  }));
}

/** Rải đều qua các chủ đề cho phỏng vấn thử: mười câu cùng một chủ đề thì
 *  không còn là một buổi phỏng vấn. */
function pickAcrossCategories(pool: InterviewPoolQuestion[], count: number): InterviewPoolQuestion[] {
  const byCategory = new Map<string, InterviewPoolQuestion[]>();
  for (const q of shuffle(pool)) {
    const bucket = byCategory.get(q.category);
    if (bucket) bucket.push(q);
    else byCategory.set(q.category, [q]);
  }
  const buckets = shuffle(Array.from(byCategory.values()));
  const picked: InterviewPoolQuestion[] = [];
  let exhausted = false;
  while (picked.length < count && !exhausted) {
    exhausted = true;
    for (const bucket of buckets) {
      if (picked.length >= count) break;
      const next = bucket.pop();
      if (next) {
        picked.push(next);
        exhausted = false;
      }
    }
  }
  return picked;
}

export function buildLessonQuestionPool(
  lessons: ({ id: number; title: string; slug: string; quiz?: { question: string; options: string[]; correct: number; explanation?: string }[] } | undefined)[]
): Omit<ChallengeQuestion, "token" | "optionOrder">[] {
  const pool: Omit<ChallengeQuestion, "token" | "optionOrder">[] = [];
  for (const lesson of lessons) {
    if (!lesson?.quiz?.length) continue;
    for (const [questionIndex, q] of lesson.quiz.entries()) {
      pool.push({
        lessonId: lesson.id,
        questionIndex,
        lessonTitle: lesson.title,
        lessonSlug: lesson.slug,
        question: q.question,
        options: q.options,
        correct: q.correct,
        explanation: q.explanation ?? "",
      });
    }
  }
  return pool;
}

export async function GET(request: NextRequest) {
  const cloudflare = await createServerCloudflareClient();
  const {
    data: { user },
    error: userError,
  } = await cloudflare.auth.getUser();
  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const track = normalizeQuizTrack(searchParams.get("track"));
  const difficulty = searchParams.get("difficulty");
  const lessonParam = searchParams.get("lesson");
  const requestedCount = Math.min(MAX_QUESTION_COUNT, Math.max(1, Number(searchParams.get("count")) || QUESTION_COUNT));
  const onlyLessonId = lessonParam ? Number(lessonParam) : null;

  if (track === "interview" || track === "mock-interview") {
    let pool = interviewQuestionsFor(difficulty, searchParams.get("career"), searchParams.get("section"));

    // Làm lại đúng những câu đã sai: client gửi danh sách id.
    const idsParam = searchParams.get("ids");
    if (idsParam) {
      const wanted = new Set(
        idsParam
          .split(",")
          .slice(0, MAX_QUESTION_COUNT)
          .map((v) => Number(v.trim()))
          .filter((v) => Number.isInteger(v))
      );
      pool = pool.filter((q) => wanted.has(-q.lessonId));
    }

    if (pool.length === 0) return NextResponse.json({ questions: [], totalAvailable: 0 });

    const picked =
      track === "mock-interview"
        ? pickAcrossCategories(pool, MOCK_INTERVIEW_QUESTION_COUNT)
        : shuffle(pool).slice(0, Math.min(requestedCount, pool.length));
    const questions: ChallengeQuestion[] = picked.map((q) => {
      const order = shuffle(q.options.map((_, i) => i));
      const correct = order.indexOf(q.correct);
      return {
        ...q,
        lessonSlug: "interview-bank",
        options: order.map((i) => q.options[i]),
        correct,
        optionOrder: order,
        token: signQuestionToken({ lessonId: q.lessonId, correct, category: q.category, questionId: -q.lessonId }),
      };
    });
    return NextResponse.json({ questions, totalAvailable: pool.length });
  }

  let sourceIds: number[];
  if (track === "cert") {
    // Luyện một miền thi: nhận id chứng chỉ + id miền chứ không nhận danh sách
    // id bài từ client, để request không tự chọn được bài ngoài miền đó.
    const domain = getCertTrack(searchParams.get("cert") ?? "")?.domains.find((d) => d.id === searchParams.get("domain"));
    if (!domain) return NextResponse.json({ error: "Unknown cert domain" }, { status: 400 });
    sourceIds = domain.lessonIds;
  } else if (onlyLessonId && Number.isFinite(onlyLessonId)) {
    sourceIds = [onlyLessonId];
  } else if (track === "personal" || track === "professional") {
    let candidateIds = await idsForTrack(track);
    if (difficulty && difficulty !== "tat-ca" && DIFFICULTY_LABELS[difficulty]) {
      const byId = new Map((await getLessonsMeta(DEFAULT_LOCALE)).map((l) => [l.id, l]));
      candidateIds = candidateIds.filter((id) => byId.get(id)?.difficulty === DIFFICULTY_LABELS[difficulty]);
    }
    sourceIds = candidateIds;
  } else {
    // Không chọn track: rút từ bài người học đã xong (tối đa 60 bài để một
    // lượt gọi không phải đọc cả kho), hoặc 10 bài đầu nếu chưa học bài nào.
    const { data: progress, error: progressError } = await cloudflare
      .from("user_progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("completed", true);
    if (progressError) {
      return NextResponse.json({ error: progressError.message }, { status: 500 });
    }
    const completedIds: number[] = Array.from(new Set((progress ?? []).map((r) => Number(r.lesson_id))));
    const base = completedIds.length > 0 ? completedIds : Array.from({ length: 10 }, (_, i) => i + 1);
    sourceIds = base.length > 60 ? shuffle(base).slice(0, 60) : base;
  }

  const locale = await getServerLocale();
  const lessons = await Promise.all(sourceIds.map((id) => getLessonById(id, locale)));
  const pool = buildLessonQuestionPool(lessons);
  if (pool.length === 0) return NextResponse.json({ questions: [], totalAvailable: 0 });

  const picked = shuffle(pool).slice(0, Math.min(requestedCount, pool.length));
  const questions: ChallengeQuestion[] = picked.map((q) => {
    const order = shuffle(q.options.map((_, i) => i));
    const correct = order.indexOf(q.correct);
    return {
      ...q,
      options: order.map((i) => q.options[i]),
      correct,
      optionOrder: order,
      token: signQuestionToken({ lessonId: q.lessonId, correct }),
    };
  });
  return NextResponse.json({ questions, totalAvailable: pool.length });
}
