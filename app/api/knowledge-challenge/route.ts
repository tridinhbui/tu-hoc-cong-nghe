import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getLessonById, getLessonsMeta } from "@/lib/lessons-loader";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL, isLessonInRange } from "@/lib/track-stages";
import { CFA_LEVEL_1_SUBJECTS, type CfaSubjectId } from "@/lib/cfa-track";
import { CFA_EXAM, pickCfaWeighted, toThreeOptions } from "@/lib/cfa-exam";
import { frmLessonIds, pickFrmWeighted, type FrmPart } from "@/lib/frm-exam";
import { IB_TECHNICAL_QUESTIONS, formatCategoryLabel } from "@/lib/ib-question-bank";
import { bankCoversCareer, getTechnicalQuestionsForCareer } from "@/lib/ib-question-careers";
import { localizeIbQuestion } from "@/lib/ib-questions-i18n";
import { phaseFor, sortByPhase, type RoundPhase } from "@/lib/ib-progression";
import { type Locale } from "@/lib/i18n/locales";
import { getServerLocale } from "@/lib/i18n/server";
import { signQuestionToken } from "@/lib/quiz-tokens";
import { NextRequest, NextResponse } from "next/server";

export interface ChallengeQuestion {
  lessonId: number;
  lessonTitle: string;
  lessonSlug: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  /** Chặng của câu hỏi trong một vòng phỏng vấn: khởi động / lõi / áp lực.
   *
   *  Tính ở máy chủ chứ không ở trình duyệt, vì luật tính cần `difficulty` và
   *  `category` thô của câu hỏi - `difficulty` chưa từng được gửi xuống, và
   *  gửi thêm một trường chỉ để trình duyệt tính lại đúng phép tính này là
   *  chép luật ra hai chỗ. Chỉ có ở track `ib` và `mock-interview`.
   *
   *  Không rò rỉ gì: `correct` vốn đã nằm trong phản hồi (token là thứ chống
   *  giả mạo, không phải phần che đáp án), và tên category đã đi kèm trong
   *  `lessonTitle` từ trước. */
  phase?: RoundPhase;
  // Signed proof of `correct` for this specific delivered question -
  // submit it back (with the option the learner picked) to
  // /api/knowledge-challenge/submit so the server can grade the attempt
  // itself instead of trusting a client-computed score. See
  // lib/quiz-tokens.ts.
  token: string;
}

const QUESTION_COUNT = 5;
/** Trần số câu một lượt gọi. Đủ cho một đề thi thử đầy đủ và không hơn - mỗi
 *  câu là một lượt đọc file bài học, nên một `?count=100000` vô tình sẽ đọc
 *  sạch kho bài trong một request. */
const MAX_QUESTION_COUNT = CFA_EXAM.totalQuestions;

/* i18n-ignore-start: `difficulty` is a persisted Vietnamese string-union enum
 * value compared against lesson.difficulty (see AGENTS.md "Translating the
 * UI" - difficulty is not translatable, it's a value used across the app),
 * never sent to the client as display copy. Kept byte-identical. */
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

type PoolTrack = "personal" | "professional" | "cfa" | "frm";

/** `?subject=` chỉ có nghĩa với track `cfa`.
 *
 *  Thu hẹp về ĐÚNG một trong mười môn, để một "checkpoint Ethics" là đề ra từ
 *  bài Ethics chứ không phải đề trộn mười môn dán nhãn Ethics. Trước đây route
 *  chỉ lọc tới mức track, nên trang CFA không có cách nào hỏi một môn.
 *
 *  Giá trị lạ thì BỎ QUA, không báo lỗi: người học gõ tay một URL sai vẫn nên
 *  nhận được đề mười môn như cũ, thay vì một trang trắng. */
function cfaSubjectIds(subject: string | null): Set<number> | null {
  if (!subject) return null;
  const match = CFA_LEVEL_1_SUBJECTS.find((s) => s.id === (subject as CfaSubjectId));
  return match ? new Set(match.lessonIds) : null;
}

async function idsForTrack(
  track: PoolTrack,
  frmPart: FrmPart,
  cfaSubject: string | null
): Promise<Set<number>> {
  if (track === "cfa") {
    return cfaSubjectIds(cfaSubject) ?? new Set(CFA_LEVEL_1_SUBJECTS.flatMap((s) => s.lessonIds));
  }
  // FRM thu hẹp theo phần thi ngay từ khâu lấy bài: Part I và Part II là hai kỳ
  // thi riêng, và một câu Credit Risk lọt vào đề Part I là hỏi ngoài phạm vi.
  if (track === "frm") {
    return new Set(frmLessonIds(frmPart));
  }
  const allLessons = await getLessonsMeta();
  const stages = track === "personal" ? TRACK_PERSONAL.stages : TRACK_PROFESSIONAL.stages;
  const ids = allLessons
    .filter((l) => (l.track ? l.track === track : stages.some((stage) => isLessonInRange(l.id, stage))))
    .map((l) => l.id);
  return new Set(ids);
}

type IbPoolQuestion = Omit<ChallengeQuestion, "lessonSlug" | "token" | "phase"> & {
  category: string;
  /** Mức khó thô của chính câu hỏi. Chỉ dùng trong route để tính `phase`;
   *  không gửi xuống dưới dạng riêng - `phase` đã là câu trả lời. */
  difficulty: string;
};

// Draws from IB_TECHNICAL_QUESTIONS, never the full bank: behavioral
// questions ("Walk me through your resume", "Why banking?") have no single
// right answer, so scoring a multiple-choice guess at one is meaningless.
// They're served un-scored by the behavioral prep surface instead.
//
// `career` narrows the pool further to the categories that role actually
// interviews on (lib/ib-question-careers.ts) - an aspiring auditor gets the
// accounting questions without being drilled on LBO mechanics. An unknown or
// uncovered career falls back to the full technical pool rather than
// returning nothing, since a smaller relevant set is better than an empty
// drill, and the UI already tells the learner what the bank does cover.
//
// `section` narrows to a single category, which is what the "ôn lại section
// này" button after a drill uses. It has to be applied here rather than by
// filtering the response, because the pool is sliced to five questions below.
function ibQuestionsForDifficulty(
  difficulty: string | null,
  career?: string | null,
  section?: string | null,
  locale: Locale = "vi"
): IbPoolQuestion[] {
  let base =
    career && bankCoversCareer(career) ? getTechnicalQuestionsForCareer(career) : IB_TECHNICAL_QUESTIONS;

  if (section) {
    const scoped = base.filter((q) => formatCategoryLabel(q.category) === section);
    // An unknown section falls back to the unscoped pool rather than serving
    // an empty drill from a typo in a query string.
    if (scoped.length > 0) base = scoped;
  }

  const questions =
    difficulty && difficulty !== "tat-ca" && DIFFICULTY_LABELS[difficulty]
      ? base.filter((q) => q.difficulty === difficulty)
      : base;

  // Dịch ở đây, sau khi lọc và trước khi cắt lấy năm câu: lọc theo
  // `q.category` và `q.difficulty` là dữ liệu cấu trúc, còn `correct` đi
  // nguyên từ bản gốc nên thứ tự dịch không ảnh hưởng tới việc chấm.
  return questions.map((raw) => {
    const q = localizeIbQuestion(raw, locale);
    return {
      lessonId: -q.id,
      lessonTitle: `IB Question Bank · ${q.category}`,
      category: q.category,
      difficulty: raw.difficulty,
      question: q.question,
      options: q.options,
      correct: q.correct,
      explanation: q.explanation,
    };
  });
}

// How many questions one mock interview run asks. Long enough to feel like
// a real screen (and to be a meaningful "Interview readiness" signal),
// short enough to finish in one sitting.
const MOCK_INTERVIEW_QUESTION_COUNT = 10;

// Round-robins the shuffled pool by category so a 10-question interview
// touches as many different question types as the bank has, instead of
// asking five variations of the same behavioral prompt.
function pickAcrossCategories(pool: IbPoolQuestion[], count: number): IbPoolQuestion[] {
  const byCategory = new Map<string, IbPoolQuestion[]>();
  for (const q of shuffle(pool)) {
    const bucket = byCategory.get(q.category);
    if (bucket) bucket.push(q);
    else byCategory.set(q.category, [q]);
  }

  const buckets = shuffle(Array.from(byCategory.values()));
  const picked: IbPoolQuestion[] = [];
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

// Builds a randomized mini-quiz. Two modes:
// - No track/difficulty query params (the dashboard's quick "Thử thách
//   kiến thức" nudge): pulled from every lesson the user has actually
//   completed, so it tests what they've genuinely covered - falling back
//   to Day 1-10 for accounts with nothing completed yet.
// - track/difficulty provided (the standalone /kiem-tra page): pulled from
//   every lesson in that track matching that difficulty, regardless of
//   completion status - the whole point there is to self-test against a
//   track's material on demand, not just review what's already done.
// Runs server-side because loading full lesson bodies (including quiz
// arrays) for every source lesson would otherwise mean shipping that
// content to the client.
export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const track = searchParams.get("track");
  const difficulty = searchParams.get("difficulty");
  const career = searchParams.get("career");
  const section = searchParams.get("section");
  /** Giới hạn vào đúng một bài. Dùng cho cột bài học trong thế giới 3D: đứng
   *  trước cột nào thì được hỏi đúng bài đó.
   *
   *  Thêm tham số vào route này thay vì viết một route mới là có chủ ý: token
   *  ký câu hỏi và đường chấm điểm ở /submit đã là nơi DUY NHẤT chấm điểm được
   *  tin, và một route riêng cho thế giới 3D sẽ là nơi thứ hai - rồi lệch khỏi
   *  nơi thứ nhất ngay lần sửa cách tính điểm đầu tiên. */
  const lessonParam = searchParams.get("lesson");
  /** Số câu muốn lấy. Mặc định 5 như cũ; bài thi thử CFA gọi với 180. Kẹp trần
   *  vì mỗi câu kéo theo một lượt đọc file bài học. */
  /** Phần thi FRM. Mặc định Part I - đó là phần người học gặp trước, và một
   *  tham số sai chính tả không nên đẩy họ sang đề Part II. */
  const frmPart: FrmPart = searchParams.get("part") === "II" ? "II" : "I";
  const cfaSubject = searchParams.get("subject");
  const requestedCount = Math.min(
    MAX_QUESTION_COUNT,
    Math.max(1, Number(searchParams.get("count")) || QUESTION_COUNT)
  );
  const onlyLessonId = lessonParam ? Number(lessonParam) : null;

  let sourceIds: number[];

  if (track === "ib" || track === "mock-interview") {
    const pool = ibQuestionsForDifficulty(difficulty, career, section, await getServerLocale());
    if (pool.length === 0) {
      return NextResponse.json({ questions: [], totalAvailable: 0 });
    }
    // A mock interview is longer and deliberately spread across the bank's
    // categories (technical, behavioral, "why banking", deal experience...),
    // the way a real screen moves between topics - rather than the 5 random
    // questions the /kiem-tra drill serves, which can all land in one category.
    const picked =
      track === "mock-interview"
        ? pickAcrossCategories(pool, MOCK_INTERVIEW_QUESTION_COUNT)
        : shuffle(pool).slice(0, Math.min(QUESTION_COUNT, pool.length));
    // Sắp theo chặng trước khi trả về, nên một lượt luôn đi khởi động → lõi →
    // áp lực. Đây là thứ biến "vòng phỏng vấn" thành một mô tả đúng thay vì
    // một cái nhãn: thứ tự câu hỏi thật sự tăng dần độ khó, chứ không phải
    // chặng được gán theo vị trí của câu hỏi trong một danh sách ngẫu nhiên.
    const questions = sortByPhase(
      picked.map((q) => ({ ...q, phase: phaseFor(q.difficulty, q.category) }))
    ).map((q) => {
      const order = shuffle(q.options.map((_, i) => i));
      const correct = order.indexOf(q.correct);
      return {
        ...q,
        lessonSlug: "ib-question-bank",
        options: order.map((i) => q.options[i]),
        correct,
        // Category rides along inside the signed token rather than being
        // sent back by the client, so the per-topic record the submit route
        // writes can't be forged to hide a weak area. `lessonId` is the
        // negated bank id (see above), so flip it back for questionId.
        token: signQuestionToken({
          lessonId: q.lessonId,
          correct,
          category: q.category,
          questionId: -q.lessonId,
        }),
      };
    });
    return NextResponse.json({ questions, totalAvailable: pool.length });
  }

  if (onlyLessonId && Number.isFinite(onlyLessonId)) {
    sourceIds = [onlyLessonId];
  } else if (
    track === "personal" ||
    track === "professional" ||
    track === "cfa" ||
    track === "frm"
  ) {
    const trackIds = await idsForTrack(track, frmPart, cfaSubject);
    let candidateIds = Array.from(trackIds);
    if (difficulty && difficulty !== "tat-ca" && DIFFICULTY_LABELS[difficulty]) {
      const allLessons = await getLessonsMeta();
      const byId = new Map(allLessons.map((l) => [l.id, l]));
      candidateIds = candidateIds.filter((id) => byId.get(id)?.difficulty === DIFFICULTY_LABELS[difficulty]);
    }
    sourceIds = candidateIds;
  } else {
    const { data: progress, error: progressError } = await supabase
      .from("user_progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("completed", true);

    if (progressError) {
      return NextResponse.json({ error: progressError.message }, { status: 500 });
    }

    const completedIds = Array.from(new Set((progress ?? []).map((r) => r.lesson_id as number)));
    // Brand new accounts have nothing completed yet, which used to mean an
    // empty pool -> the modal just told them to go complete lessons first,
    // even though the whole point of opening this from the dashboard is to
    // try it right away. Fall back to the first 10 lessons (Day 1-10) so
    // there's always something to answer.
    sourceIds = completedIds.length > 0 ? completedIds : Array.from({ length: 10 }, (_, i) => i + 1);
  }

  // Fetched in parallel rather than one at a time in a loop - a track pool
  // can be 100-250 lessons (e.g. the CFA track), and each is an independent
  // file read with no ordering dependency, so awaiting them sequentially
  // just serializes disk I/O that could otherwise overlap.
  const lessons = await Promise.all(sourceIds.map((id) => getLessonById(id)));

  const pool: Omit<ChallengeQuestion, "token">[] = [];
  for (const lesson of lessons) {
    if (!lesson?.quiz?.length) continue;
    for (const q of lesson.quiz) {
      pool.push({
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        lessonSlug: lesson.slug,
        question: q.question,
        options: q.options,
        correct: q.correct,
        explanation: q.explanation ?? "",
      });
    }
  }

  if (pool.length === 0) {
    return NextResponse.json({ questions: [], totalAvailable: 0 });
  }

  const want = Math.min(requestedCount, pool.length);
  // Hai chứng chỉ đều phải cân theo trọng số môn của đề thi thật; các track còn
  // lại không có trọng số công bố nên xáo đều là đúng.
  //
  // NHƯNG khi `?subject=` đã thu kho về đúng một môn thì cân trọng số là vô
  // nghĩa - `pickCfaWeighted` chia chỉ tiêu cho mười môn, mà chín trong số đó
  // giờ không còn câu nào, nên nó trả về ít hơn số câu được yêu cầu và một
  // "checkpoint 5 câu" ra 1-2 câu. Một môn thì xáo đều mới đúng.
  const cfaNarrowed = track === "cfa" && cfaSubjectIds(cfaSubject) !== null;
  const picked =
    track === "cfa" && !cfaNarrowed
      ? pickCfaWeighted(pool, want)
      : track === "frm"
        ? pickFrmWeighted(pool, want, frmPart).map((r) => ({ ...r.item, subjectId: r.subject }))
        : shuffle(pool).slice(0, want);

  // Reshuffle each question's own options too, so revisiting the same
  // underlying quiz question in a later challenge doesn't always show the
  // correct answer in the same position as it did in the original lesson.
  const questions = picked.map((raw: (typeof pool)[number]) => {
    // Đề thi CFA Level I thật dùng BA lựa chọn. Cắt lúc giao thay vì viết lại
    // kho: viết lại thì mức đoán mò đổi từ 25% lên 33% và hai trần trong
    // scripts/audit-lesson-content.mjs - vốn hiệu chỉnh quanh 25% - phải tính
    // lại riêng cho nhóm bài CFA trong khi phần còn lại vẫn bốn lựa chọn.
    const q = track === "cfa" ? toThreeOptions(raw) : raw;
    const order = shuffle(q.options.map((_, i) => i));
    const correct = order.indexOf(q.correct);
    return {
      ...q,
      options: order.map((i) => q.options[i]),
      correct,
      token: signQuestionToken({ lessonId: q.lessonId, correct }),
    };
  });

  return NextResponse.json({ questions, totalAvailable: pool.length });
}
