import { describe, it, expect, beforeAll } from "vitest";
import { signExamAnswerToken, gradeExamAnswerToken, type ExamTokenBody } from "@/lib/level-exam-tokens";

beforeAll(() => {
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-secret-key";
});

const body: ExamTokenBody = {
  qid: "l2-q1",
  level: 2,
  uid: "user-abc",
  iat: 1_700_000_000_000,
  optionCount: 4,
};

describe("signExamAnswerToken / gradeExamAnswerToken", () => {
  it("grades the correct selection as correct", () => {
    const token = signExamAnswerToken(body, 2);
    const graded = gradeExamAnswerToken(token, 2);
    expect(graded?.correct).toBe(true);
    expect(graded?.correctIndex).toBe(2);
    expect(graded?.body).toEqual(body);
  });

  it("grades a wrong selection as wrong, while still recovering the answer for review", () => {
    const token = signExamAnswerToken(body, 2);
    const graded = gradeExamAnswerToken(token, 0);
    expect(graded?.correct).toBe(false);
    expect(graded?.correctIndex).toBe(2);
  });

  it("never puts the correct index in the readable part of the token", () => {
    // The whole point of this scheme over lib/quiz-tokens.ts: decoding the
    // token must not reveal the answer, since this exam feeds a ranking.
    const token = signExamAnswerToken(body, 3);
    const [encoded] = token.split(".");
    const decoded = JSON.parse(Buffer.from(encoded, "base64url").toString());
    expect(decoded).toEqual(body);
    expect(Object.keys(decoded)).not.toContain("correct");
    expect(Object.keys(decoded)).not.toContain("correctIndex");
  });

  it("rejects a token whose body was swapped for another question", () => {
    const token = signExamAnswerToken(body, 1);
    const [, mac] = token.split(".");
    const forged = Buffer.from(JSON.stringify({ ...body, qid: "l2-q2" })).toString("base64url");
    expect(gradeExamAnswerToken(`${forged}.${mac}`, 1)).toBeNull();
  });

  it("rejects a token whose level was escalated", () => {
    const token = signExamAnswerToken(body, 1);
    const [, mac] = token.split(".");
    const forged = Buffer.from(JSON.stringify({ ...body, level: 15 })).toString("base64url");
    expect(gradeExamAnswerToken(`${forged}.${mac}`, 1)).toBeNull();
  });

  it("rejects a tampered MAC", () => {
    const token = signExamAnswerToken(body, 1);
    const [encoded] = token.split(".");
    expect(gradeExamAnswerToken(`${encoded}.deadbeef`, 1)).toBeNull();
  });

  it("rejects malformed tokens", () => {
    expect(gradeExamAnswerToken("", 0)).toBeNull();
    expect(gradeExamAnswerToken("no-dot", 0)).toBeNull();
    expect(gradeExamAnswerToken("a.b.c", 0)).toBeNull();
    expect(gradeExamAnswerToken("!!!.!!!", 0)).toBeNull();
  });

  it("refuses an out-of-range optionCount rather than looping on it", () => {
    for (const optionCount of [0, 1, 11, 1_000_000, 1.5]) {
      const token = signExamAnswerToken({ ...body, optionCount }, 0);
      expect(gradeExamAnswerToken(token, 0)).toBeNull();
    }
  });

  it("scores an unanswered slot (-1) as wrong", () => {
    const token = signExamAnswerToken(body, 0);
    expect(gradeExamAnswerToken(token, -1)?.correct).toBe(false);
  });

  it("does not accept a token signed with a different secret", () => {
    const token = signExamAnswerToken(body, 1);
    process.env.SUPABASE_SERVICE_ROLE_KEY = "different-secret";
    try {
      expect(gradeExamAnswerToken(token, 1)).toBeNull();
    } finally {
      process.env.SUPABASE_SERVICE_ROLE_KEY = "test-secret-key";
    }
  });
});
