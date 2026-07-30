import "server-only";
import { createHmac, timingSafeEqual } from "crypto";

// Answer tokens for the promotion exam (bài thi thăng cấp).
//
// This is deliberately NOT lib/quiz-tokens.ts. That scheme signs a payload of
// `{lessonId, correct}` as base64url - unforgeable, but *readable*: anyone can
// decode the body and see the correct index. That is acceptable there (the
// knowledge-challenge endpoint already ships `correct` to the client anyway;
// the token only stops a forged *score*). It is not acceptable here, because
// this exam is meant to feed a public ranking, so the answer must not travel
// to the browser at all.
//
// Instead the correct index is committed to as a MAC and never transmitted:
//
//   body = base64url({qid, level, uid, iat, optionCount})   <- no answer in it
//   mac  = HMAC(secret, `${body}:${correctIndex}`)
//   token = `${body}.${mac}`
//
// To grade a submitted `selected`, the server recomputes the MAC for that index
// and compares. The client cannot invert the MAC or test candidate indices,
// since producing any MAC requires the server-only secret.
//
// Reuses SUPABASE_SERVICE_ROLE_KEY as the HMAC secret - already a server-only
// secret never sent to the browser, so no new env var is needed. Same choice
// as lib/quiz-tokens.ts.

export interface ExamTokenBody {
  /** Question id from LEVEL_EXAMS, e.g. "l2-q1". */
  qid: string;
  level: number;
  /** Bound to one user, so a token cannot be shared or replayed by another. */
  uid: string;
  /** Issued-at, epoch ms - used to enforce the exam time limit server-side. */
  iat: number;
  /** How many options were served, so grading can search the index space. */
  optionCount: number;
}

function getSecret(): string {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY - required to sign level exam answer tokens");
  }
  return secret;
}

function macFor(body: string, index: number): string {
  return createHmac("sha256", getSecret()).update(`${body}:${index}`).digest("base64url");
}

function encodeBody(body: ExamTokenBody): string {
  return Buffer.from(JSON.stringify(body)).toString("base64url");
}

function decodeBody(encoded: string): ExamTokenBody | null {
  try {
    const parsed = JSON.parse(Buffer.from(encoded, "base64url").toString());
    if (
      typeof parsed?.qid === "string" &&
      typeof parsed?.level === "number" &&
      typeof parsed?.uid === "string" &&
      typeof parsed?.iat === "number" &&
      typeof parsed?.optionCount === "number"
    ) {
      return parsed as ExamTokenBody;
    }
    return null;
  } catch {
    return null;
  }
}

function macMatches(candidate: string, expected: string): boolean {
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Issues the answer token for one delivered question. */
export function signExamAnswerToken(body: ExamTokenBody, correctIndex: number): string {
  const encoded = encodeBody(body);
  return `${encoded}.${macFor(encoded, correctIndex)}`;
}

export interface ExamTokenGrade {
  body: ExamTokenBody;
  /** Whether `selected` is the correct option. */
  correct: boolean;
  /**
   * The correct index, recovered by testing each index against the MAC (only
   * the server can do this - it needs the secret). Returned so the submit
   * response can drive the answer-review UI without the exam having shipped
   * the answers up front. null if the token is malformed.
   */
  correctIndex: number | null;
}

/**
 * Grades one answer. Returns null when the token is unreadable - callers treat
 * that as a wrong answer rather than failing the whole submission, so one
 * corrupted token cannot zero out an otherwise legitimate attempt.
 */
export function gradeExamAnswerToken(token: string, selected: number): ExamTokenGrade | null {
  if (typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [encoded, mac] = parts;

  const body = decodeBody(encoded);
  if (!body) return null;
  // Bound so a malformed optionCount cannot make grading loop unboundedly.
  if (!Number.isInteger(body.optionCount) || body.optionCount < 2 || body.optionCount > 10) {
    return null;
  }

  let correctIndex: number | null = null;
  for (let index = 0; index < body.optionCount; index++) {
    if (macMatches(macFor(encoded, index), mac)) {
      correctIndex = index;
      break;
    }
  }
  // No index reproduces the MAC: the token was forged or tampered with.
  if (correctIndex === null) return null;

  return { body, correct: correctIndex === selected, correctIndex };
}
