import { NextRequest, NextResponse } from "next/server";
import { createServerCloudflareClient } from "@/lib/cloudflare-server";
import { createAdminClient } from "@/lib/cloudflare-admin";
import { applyBooster, getXpMultiplier } from "@/lib/boosters";
import { verifyQuestionToken } from "@/lib/quiz-tokens";
import { STANDALONE_QUIZ_DAILY_XP_CAP, computeQuizXp, normalizeQuizTrack } from "@/lib/cloudflare-quiz-sessions";
import { PILLAR_QUIZ_SOURCE } from "@/lib/study-session";
import { certEvidence, interviewEvidence, writeSkillEvidence } from "@/lib/practical-skill-server";

/**
 * Nộp bài cho mọi trắc nghiệm đứng riêng (/kiem-tra, /phong-van-ky-thuat,
 * luyện miền thi ở /chung-chi).
 *
 * Điểm tính lại từ token đã ký, không tin client. XP bị chặn theo trần mỗi
 * ngày (STANDALONE_QUIZ_DAILY_XP_CAP) để làm lại một đề dễ trăm lần không leo
 * bảng xếp hạng được.
 */

/** Trần số câu một lần nộp - chặn một request nhồi hàng nghìn token. */
const MAX_ANSWERS = 50;
const VALID_TRACKS = new Set(["personal", "professional", "interview", "mock-interview", "cert"]);
const VALID_DIFFICULTIES = new Set(["de", "trung-binh", "kho", "tat-ca"]);
/** Danh sách đóng cho cột `source`: một chuỗi tuỳ ý từ client không được đi
 *  thẳng xuống cơ sở dữ liệu. */
const VALID_SOURCES = new Set([PILLAR_QUIZ_SOURCE]);

interface AnswerInput {
  token: string;
  selected: number;
}

function isAnswerInput(value: unknown): value is AnswerInput {
  return (
    !!value &&
    typeof value === "object" &&
    typeof (value as AnswerInput).token === "string" &&
    typeof (value as AnswerInput).selected === "number"
  );
}

function scoreAnswers(answers: AnswerInput[]): number {
  let score = 0;
  for (const answer of answers) {
    const payload = verifyQuestionToken(answer.token);
    if (payload && payload.correct === answer.selected) score++;
  }
  return score;
}

/** Một dòng cho mỗi câu phỏng vấn đã trả lời, dựng từ token ĐÃ XÁC MINH nên
 *  chủ đề không giả được. Câu bài học (không có category) bị bỏ qua. Nuôi phần
 *  "chủ đề yếu" ở /phong-van-ky-thuat. */
function buildInterviewAttempts(userId: string, answers: AnswerInput[]) {
  const rows: { user_id: string; question_id: number; category: string; correct: boolean }[] = [];
  for (const answer of answers) {
    const payload = verifyQuestionToken(answer.token);
    if (!payload?.category || typeof payload.questionId !== "number") continue;
    rows.push({
      user_id: userId,
      question_id: payload.questionId,
      category: payload.category,
      correct: payload.correct === answer.selected,
    });
  }
  return rows;
}

export async function POST(request: NextRequest) {
  const cloudflare = await createServerCloudflareClient();
  const {
    data: { user },
    error: userError,
  } = await cloudflare.auth.getUser();
  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.answers) || body.answers.length === 0 || body.answers.length > MAX_ANSWERS) {
    return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
  }
  if (!body.answers.every(isAnswerInput)) {
    return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
  }

  const answers: AnswerInput[] = body.answers;
  const score = scoreAnswers(answers);
  const total = answers.length;

  const track = normalizeQuizTrack(body.track) ?? "";
  const difficulty = body.difficulty;
  if (!VALID_TRACKS.has(track) || !VALID_DIFFICULTIES.has(difficulty)) {
    return NextResponse.json({ error: "Invalid track/difficulty" }, { status: 400 });
  }

  const admin = createAdminClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const { data: todayRows } = await admin
    .from("user_quiz_sessions")
    .select("xp_earned")
    .eq("user_id", user.id)
    .gte("completed_at", todayStart.toISOString());
  const earnedToday = (todayRows ?? []).reduce((sum, row) => sum + (Number(row.xp_earned) || 0), 0);
  const remainingDailyXp = Math.max(0, STANDALONE_QUIZ_DAILY_XP_CAP - earnedToday);
  const xpEarned = applyBooster(Math.min(computeQuizXp(score, total), remainingDailyXp), await getXpMultiplier(cloudflare));
  const source = VALID_SOURCES.has(body.source as string) ? (body.source as string) : null;

  const { error } = await admin.from("user_quiz_sessions").insert([
    { user_id: user.id, track, difficulty, score, total, xp_earned: xpEarned, source },
  ]);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const attempts = buildInterviewAttempts(user.id, answers);
  if (attempts.length > 0) {
    const { error: attemptsError } = await admin.from("user_interview_question_attempts").insert(attempts);
    if (attemptsError) console.error("Error recording interview question attempts:", attemptsError.message);
  }

  // Năng lực thực hành (lib/practical-skill.ts): chỉ câu ĐÚNG, lấy từ token đã
  // xác minh. Câu phỏng vấn theo questionId; luyện chứng chỉ theo miền mà
  // client khai, nhưng chỉ tính câu có lessonId nằm trong miền đó.
  const correctPayloads = answers
    .map((a) => ({ payload: verifyQuestionToken(a.token), selected: a.selected }))
    .filter((x) => x.payload && x.payload.correct === x.selected)
    .map((x) => x.payload!);
  const evidence = [
    ...interviewEvidence(
      correctPayloads.filter((p) => p.category && typeof p.questionId === "number").map((p) => p.questionId!)
    ),
    ...(track === "cert"
      ? certEvidence(body.cert, body.domain, correctPayloads.filter((p) => p.lessonId > 0).map((p) => p.lessonId))
      : []),
  ];
  await writeSkillEvidence(admin, user.id, evidence);

  return NextResponse.json({ score, total, xpEarned });
}
