import "server-only";
import { createHmac, timingSafeEqual } from "crypto";

// Signs the correct-answer index for a single delivered quiz question so
// app/api/knowledge-challenge/submit/route.ts can grade a submission
// without trusting anything the client sends about its own score. Without
// this, score/xp_earned/challenge-pass rows were computed client-side and
// inserted directly (see the QA finding this closes) - anyone could open
// devtools and insert an arbitrary score. The token binds the correct
// answer to an HMAC only the server can produce or verify, so a forged
// token (or a `selected` value swapped after the fact) simply fails
// verification and scores as wrong instead of trusting the client.
//
// Reuses SUPABASE_SERVICE_ROLE_KEY as the HMAC secret - it's already a
// server-only secret never sent to the browser, so no new env var is
// required for this to work.
export interface QuestionTokenPayload {
  lessonId: number;
  correct: number;
  /** IB question bank category, carried so the submit route can record which
   *  topic each answer belonged to - the client never sends this, so it can't
   *  be forged to make a weak area look strong. Optional: lesson quizzes have
   *  no category, and tokens minted before this field existed must still
   *  verify rather than scoring every in-flight answer as wrong. */
  category?: string;
  /** The bank question's own id, so an attempt can be traced back to the
   *  exact question. Only set for IB questions. */
  questionId?: number;
  /** Index of the question within its lesson's quiz array.
   *
   *  Present so that two different questions can never produce the same
   *  token. Without it a payload is just {lessonId, correct} - so any two
   *  questions from the same lesson whose correct answer lands on the same
   *  index sign to byte-identical tokens, and a de-duplicating grader
   *  discards one of them as a replay. */
  questionIndex?: number;
}

function getSecret(): string {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY - required to sign quiz answer tokens");
  }
  return secret;
}

export function signQuestionToken(payload: QuestionTokenPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", getSecret()).update(body).digest("base64url");
  return `${body}.${signature}`;
}

export function verifyQuestionToken(token: string): QuestionTokenPayload | null {
  if (typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, signature] = parts;

  const expected = createHmac("sha256", getSecret()).update(body).digest("base64url");
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (
      typeof payload?.lessonId === "number" &&
      typeof payload?.correct === "number" &&
      (payload.category === undefined || typeof payload.category === "string") &&
      (payload.questionId === undefined || typeof payload.questionId === "number") &&
      (payload.questionIndex === undefined || typeof payload.questionIndex === "number")
    ) {
      return payload;
    }
    return null;
  } catch {
    return null;
  }
}
