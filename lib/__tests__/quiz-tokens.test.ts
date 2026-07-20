import { describe, it, expect, beforeAll } from "vitest";
import { createHmac } from "crypto";
import { signQuestionToken, verifyQuestionToken } from "@/lib/quiz-tokens";

beforeAll(() => {
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-secret-key";
});

describe("signQuestionToken / verifyQuestionToken", () => {
  it("round-trips a valid payload", () => {
    const token = signQuestionToken({ lessonId: 42, correct: 2 });
    expect(verifyQuestionToken(token)).toEqual({ lessonId: 42, correct: 2 });
  });

  it("rejects a token with a tampered body", () => {
    const token = signQuestionToken({ lessonId: 42, correct: 2 });
    const [, signature] = token.split(".");
    const forgedBody = Buffer.from(JSON.stringify({ lessonId: 42, correct: 0 })).toString("base64url");
    expect(verifyQuestionToken(`${forgedBody}.${signature}`)).toBeNull();
  });

  it("rejects a token with a tampered signature", () => {
    const token = signQuestionToken({ lessonId: 42, correct: 2 });
    const [body] = token.split(".");
    expect(verifyQuestionToken(`${body}.deadbeef`)).toBeNull();
  });

  it("rejects malformed tokens", () => {
    expect(verifyQuestionToken("not-a-token")).toBeNull();
    expect(verifyQuestionToken("a.b.c")).toBeNull();
    expect(verifyQuestionToken("")).toBeNull();
  });

  it("rejects a token signed with a different secret", () => {
    const token = signQuestionToken({ lessonId: 42, correct: 2 });
    process.env.SUPABASE_SERVICE_ROLE_KEY = "different-secret";
    expect(verifyQuestionToken(token)).toBeNull();
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-secret-key";
  });

  it("rejects a body that isn't valid JSON", () => {
    const forgedBody = Buffer.from("not json").toString("base64url");
    const signature = createHmac("sha256", "test-secret-key")
      .update(forgedBody)
      .digest("base64url");
    expect(verifyQuestionToken(`${forgedBody}.${signature}`)).toBeNull();
  });
});
