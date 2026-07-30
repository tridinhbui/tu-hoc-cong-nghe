import { describe, it, expect, beforeAll } from "vitest";
import { signQuestionToken, verifyQuestionToken } from "@/lib/quiz-tokens";

// The token gained optional `category` / `questionId` fields so the submit
// route can record which IB topic each answer belonged to. Two things must
// hold: the client can't forge them (they're inside the HMAC), and tokens
// minted before the fields existed must still verify - otherwise deploying
// this would score every in-flight answer as wrong.

beforeAll(() => {
  process.env.SUPABASE_SERVICE_ROLE_KEY ??= "test-secret-for-quiz-token-signing";
});

describe("question token with category", () => {
  it("round-trips the category and question id", () => {
    const token = signQuestionToken({
      lessonId: -160,
      correct: 2,
      category: "Accounting - Basic",
      questionId: 160,
    });
    const payload = verifyQuestionToken(token);
    expect(payload).toEqual({
      lessonId: -160,
      correct: 2,
      category: "Accounting - Basic",
      questionId: 160,
    });
  });

  it("still verifies a token with no category - lesson quizzes have none", () => {
    const token = signQuestionToken({ lessonId: 42, correct: 1 });
    const payload = verifyQuestionToken(token);
    expect(payload?.lessonId).toBe(42);
    expect(payload?.correct).toBe(1);
    expect(payload?.category).toBeUndefined();
  });

  it("rejects a token whose category was edited after signing", () => {
    // Forging a weak topic into a strong one has to fail, since the recorded
    // per-category performance is only trustworthy if the client can't touch it.
    const token = signQuestionToken({
      lessonId: -160,
      correct: 0,
      category: "Discounted Cash Flow - Basic",
      questionId: 160,
    });
    const [body, signature] = token.split(".");
    const tampered = JSON.parse(Buffer.from(body, "base64url").toString());
    tampered.category = "Accounting - Basic";
    const forgedBody = Buffer.from(JSON.stringify(tampered)).toString("base64url");

    expect(verifyQuestionToken(`${forgedBody}.${signature}`)).toBeNull();
  });

  it("rejects a payload whose category is not a string", () => {
    const forged = Buffer.from(JSON.stringify({ lessonId: 1, correct: 0, category: 7 })).toString(
      "base64url"
    );
    // Sign it properly so only the type check can reject it.
    const token = signQuestionToken({ lessonId: 1, correct: 0 });
    const signature = token.split(".")[1];
    // A correctly-signed body would be needed for this to reach the type
    // guard; an unsigned one fails earlier, which is also a rejection.
    expect(verifyQuestionToken(`${forged}.${signature}`)).toBeNull();
  });

  it("rejects a malformed token outright", () => {
    expect(verifyQuestionToken("not-a-token")).toBeNull();
    expect(verifyQuestionToken("")).toBeNull();
  });
});
