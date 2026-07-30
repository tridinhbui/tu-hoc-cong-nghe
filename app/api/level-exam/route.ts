import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { LEVEL_EXAMS, shuffleArray } from "@/lib/level-exams";
import { signExamAnswerToken } from "@/lib/level-exam-tokens";

// Serves a promotion exam (bài thi thăng cấp). The shuffle happens HERE, not in
// the browser, and the response carries no correct index and no explanation -
// only a per-question MAC the server can grade later (lib/level-exam-tokens.ts).
// The companion writer is app/api/level-exam/submit.

export interface ServedExamQuestion {
  id: string;
  question: string;
  options: string[];
  /** Opaque answer commitment - send back with the chosen index to submit. */
  token: string;
}

export interface ServedExam {
  level: number;
  title: string;
  badgeEmoji: string;
  minPassPercentage: number;
  timeLimitSeconds: number;
  questions: ServedExamQuestion[];
}

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const level = Number(request.nextUrl.searchParams.get("level"));
  const config = LEVEL_EXAMS[level];
  if (!Number.isInteger(level) || !config) {
    return NextResponse.json({ error: "Invalid level" }, { status: 400 });
  }

  const issuedAt = Date.now();

  const questions: ServedExamQuestion[] = config.questions.map((question) => {
    const correctText = question.options[question.correctIndex];
    const options = shuffleArray(question.options);
    const correctIndex = options.indexOf(correctText);

    return {
      id: question.id,
      question: question.question,
      options,
      token: signExamAnswerToken(
        {
          qid: question.id,
          level,
          uid: user.id,
          iat: issuedAt,
          optionCount: options.length,
        },
        correctIndex
      ),
    };
  });

  const exam: ServedExam = {
    level,
    title: config.title,
    badgeEmoji: config.badgeEmoji,
    minPassPercentage: config.minPassPercentage,
    timeLimitSeconds: config.timeLimitSeconds,
    questions,
  };

  return NextResponse.json(exam, {
    // An exam is issued per attempt; a cached copy would hand out reusable
    // tokens and a stale question order.
    headers: { "Cache-Control": "no-store" },
  });
}
