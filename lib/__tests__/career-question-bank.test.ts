import { describe, expect, it } from "vitest";
import { CAREER_TECHNICAL_QUESTIONS } from "@/lib/career-question-bank";
import { IB_QUESTION_BANK } from "@/lib/ib-question-bank";
import {
  IB_CATEGORY_CAREERS,
  MIN_QUESTIONS_FOR_CAREER_DRILL,
  bankCoversCareer,
  getTechnicalQuestionsForCareer,
} from "@/lib/ib-question-careers";
import { FINANCE_CAREERS } from "@/lib/finance-careers";

describe("career question bank", () => {
  it("uses ids that cannot collide with the IB bank", () => {
    // app/(app)/on-tap-cau-sai stores a wrong answer as a NEGATIVE lesson_id
    // carrying the question id, and looks the question back up by that id
    // alone. A duplicate id across the two banks would make a learner's saved
    // mistake render some other question's text - silently, and only for the
    // people who got something wrong.
    const ibIds = new Set(IB_QUESTION_BANK.map((q) => q.id));
    const collisions = CAREER_TECHNICAL_QUESTIONS.filter((q) => ibIds.has(q.id)).map((q) => q.id);
    expect(collisions, "id trùng với bộ IB").toEqual([]);
  });

  it("uses ids that are unique within itself", () => {
    const seen = new Map<number, number>();
    for (const q of CAREER_TECHNICAL_QUESTIONS) seen.set(q.id, (seen.get(q.id) ?? 0) + 1);
    expect([...seen].filter(([, n]) => n > 1).map(([id]) => id)).toEqual([]);
  });

  it("maps every category it defines onto at least one career", () => {
    // A question whose category is missing from IB_CATEGORY_CAREERS is
    // written, shipped and unreachable - getTechnicalQuestionsForCareer
    // filters on exactly that map, so nobody is ever served it.
    const unmapped = [
      ...new Set(
        CAREER_TECHNICAL_QUESTIONS.filter((q) => !IB_CATEGORY_CAREERS[q.category]).map(
          (q) => q.category
        )
      ),
    ];
    expect(unmapped, "category chưa được gán cho nghề nào").toEqual([]);
  });

  it("gives every career it claims to cover a full drill's worth", () => {
    const claimed = new Set(Object.values(IB_CATEGORY_CAREERS).flat());
    const short = [...claimed]
      .filter((careerId) => {
        const n = getTechnicalQuestionsForCareer(careerId).length;
        return n > 0 && n < MIN_QUESTIONS_FOR_CAREER_DRILL;
      })
      .map((careerId) => `${careerId} (${getTechnicalQuestionsForCareer(careerId).length} câu)`);
    // A career with a handful of questions is worse than one with none: the
    // UI opens a drill that repeats itself within a single round.
    expect(short, "nghề có câu hỏi nhưng không đủ một lượt").toEqual([]);
  });

  it("only names careers that actually exist", () => {
    const real = new Set((FINANCE_CAREERS as { id: string }[]).map((c) => c.id));
    const ghosts = [...new Set(Object.values(IB_CATEGORY_CAREERS).flat())].filter(
      (id) => !real.has(id)
    );
    expect(ghosts, "career id không có trong FINANCE_CAREERS").toEqual([]);
  });

  it("covers three careers the IB bank could not reach", () => {
    for (const careerId of ["fund-manager", "treasury", "compliance-officer"]) {
      expect(bankCoversCareer(careerId), careerId).toBe(true);
    }
  });
});
