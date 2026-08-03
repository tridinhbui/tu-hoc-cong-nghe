import { describe, expect, it } from "vitest";
import { CFA_FORMULAS_DATA } from "@/lib/cfa-formulas-data";

/**
 * The formula sheet at /cfa/formulas is one of three things the CFA track
 * offers besides lessons, and it had no tests. It also had 15 formulas for ten
 * subjects - Derivatives, the most formula-heavy subject on the exam, had one,
 * and Economics and Alternatives had none at all.
 *
 * Nothing surfaced that: an empty subject renders as an empty filter result,
 * which looks like a page that works.
 */

const SUBJECTS = [
  "quant",
  "fsa",
  "corporate",
  "equity",
  "fixed-income",
  "derivatives",
  "portfolio",
  "econ",
  "alt",
  "ethics",
] as const;

describe("CFA formula sheet", () => {
  it("has no duplicate ids", () => {
    const ids = CFA_FORMULAS_DATA.map((f) => f.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes, "id công thức bị trùng").toEqual([]);
  });

  it("only uses subject ids the page can filter on", () => {
    const unknown = CFA_FORMULAS_DATA.filter(
      (f) => !(SUBJECTS as readonly string[]).includes(f.subjectId)
    ).map((f) => `${f.id} -> ${f.subjectId}`);
    expect(unknown, "subjectId không thuộc danh sách môn").toEqual([]);
  });

  it("gives every formula something to render", () => {
    // FormulaBlock draws either a single equation or a numerator over a
    // denominator. A formula with neither renders as a title and blank space.
    const empty = CFA_FORMULAS_DATA.filter(
      (f) => !f.equation && !(f.numerator && f.denominator)
    ).map((f) => f.id);
    expect(empty, "công thức không có equation lẫn tử/mẫu").toEqual([]);
  });

  it("covers every subject that has formulas at all", () => {
    // Ethics is the one legitimate exception - it is a reasoning subject with
    // nothing to compute. Every other subject appearing empty on the page is a
    // gap, not a design choice.
    const counts = new Map<string, number>();
    for (const f of CFA_FORMULAS_DATA) counts.set(f.subjectId, (counts.get(f.subjectId) ?? 0) + 1);
    const missing = SUBJECTS.filter((s) => s !== "ethics" && !counts.has(s));
    expect(missing, "môn không có công thức nào").toEqual([]);
  });

  it("gives each covered subject enough to be worth opening", () => {
    const counts = new Map<string, number>();
    for (const f of CFA_FORMULAS_DATA) counts.set(f.subjectId, (counts.get(f.subjectId) ?? 0) + 1);
    const thin = [...counts].filter(([s, n]) => s !== "ethics" && n < 3).map(([s, n]) => `${s} (${n})`);
    // Derivatives sat at one formula for a long time, which is how a filter
    // that technically works can still be useless.
    expect(thin, "môn có quá ít công thức").toEqual([]);
  });

  it("labels every worked example with a result", () => {
    const broken = CFA_FORMULAS_DATA.filter((f) => f.example && !f.example.result).map((f) => f.id);
    expect(broken).toEqual([]);
  });
});
