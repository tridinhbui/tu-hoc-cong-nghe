import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { IB_BEHAVIORAL_QUESTIONS, formatCategoryLabel } from "@/lib/ib-question-bank";

// Behavioral/fit interview prep. Deliberately NOT the knowledge-challenge
// route: there's no grading here, so there are no signed answer tokens, no
// `correct` index and no quiz session written. A question like "Walk me
// through your resume" has no single right answer - what the bank has is a
// coaching framework for answering it, which is what gets returned.
//
// Auth-gated like every other question endpoint so the bank isn't scrapeable
// by anonymous callers.

export const dynamic = "force-dynamic";

export interface BehavioralPrepQuestion {
  id: number;
  category: string;
  question: string;
  /** How to approach the answer - not an answer key. */
  framework: string;
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

  const requested = request.nextUrl.searchParams.get("category");
  const pool = requested
    ? IB_BEHAVIORAL_QUESTIONS.filter((q) => formatCategoryLabel(q.category) === requested)
    : IB_BEHAVIORAL_QUESTIONS;

  const questions: BehavioralPrepQuestion[] = pool.map((q) => ({
    id: q.id,
    category: formatCategoryLabel(q.category),
    question: q.question,
    framework: q.explanation,
  }));

  return NextResponse.json({ questions, total: questions.length });
}
