import { describe, expect, it } from "vitest";
import { FRM_GLOSSARY_TERMS } from "@/lib/frm-glossary-terms";
import { FRM_SUBJECTS } from "@/lib/frm-track";

const SUBJECT_IDS = new Set(FRM_SUBJECTS.map((s) => s.id));

describe("the FRM deck against the FRM track", () => {
  it("files every term under a subject that exists", () => {
    // A term pointing at a subject id that was renamed disappears from every
    // filter chip while still counting toward the total - so the deck claims
    // more cards than it can ever show.
    const strays = FRM_GLOSSARY_TERMS.filter((t) => !SUBJECT_IDS.has(t.subjectId)).map((t) => t.id);
    expect(strays).toEqual([]);
  });

  it("leaves no subject without a single card", () => {
    // An empty filter chip is a dead control: it looks selectable and then
    // shows nothing.
    const empty = FRM_SUBJECTS.filter(
      (s) => !FRM_GLOSSARY_TERMS.some((t) => t.subjectId === s.id)
    ).map((s) => s.id);
    expect(empty, "these subjects have a filter chip but no cards").toEqual([]);
  });

  it("uses unique ids", () => {
    // Ids key the learned-set in localStorage, so a duplicate marks two cards
    // known when the reader has only seen one.
    const ids = FRM_GLOSSARY_TERMS.map((t) => t.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it("never lists the same English term twice", () => {
    const terms = FRM_GLOSSARY_TERMS.map((t) => t.termEn.toLowerCase());
    expect(terms.length).toBe(new Set(terms).size);
  });
});

describe("what is on a card", () => {
  it("always has both languages and a definition", () => {
    for (const term of FRM_GLOSSARY_TERMS) {
      expect(term.termEn.length, `${term.id} thiếu tên tiếng Anh`).toBeGreaterThan(1);
      expect(term.termVi.length, `${term.id} thiếu tên tiếng Việt`).toBeGreaterThan(1);
      expect(term.definitionVi.length, `${term.id} định nghĩa quá ngắn`).toBeGreaterThan(40);
    }
  });

  it("carries a trap rather than a second definition", () => {
    // frmTip is the reason this deck is worth more than a dictionary: it says
    // what people get wrong. A tip that merely restates the definition is the
    // failure mode, and the cheapest proxy for that is one that repeats the
    // definition's opening words verbatim.
    for (const term of FRM_GLOSSARY_TERMS) {
      if (!term.frmTip) continue;
      const head = term.definitionVi.slice(0, 30).toLowerCase();
      expect(term.frmTip.toLowerCase().includes(head), `${term.id}: mẹo chỉ chép lại định nghĩa`).toBe(false);
    }
  });

  it("gives most cards a trap", () => {
    const withTip = FRM_GLOSSARY_TERMS.filter((t) => t.frmTip && t.frmTip.length > 40);
    expect(withTip.length / FRM_GLOSSARY_TERMS.length).toBeGreaterThan(0.8);
  });

  it("weights the deck toward the heavier subjects", () => {
    // Foundations at 20% of the exam should not have fewer cards than Current
    // Issues at 10% - the same skew that already exists in the lesson counts,
    // and worth not repeating here.
    const cardsFor = (id: string) => FRM_GLOSSARY_TERMS.filter((t) => t.subjectId === id).length;
    const heavy = FRM_SUBJECTS.filter((s) => parseFloat(s.weight) >= 20);
    const light = FRM_SUBJECTS.filter((s) => parseFloat(s.weight) <= 10);
    const minHeavy = Math.min(...heavy.map((s) => cardsFor(s.id)));
    const maxLight = Math.max(...light.map((s) => cardsFor(s.id)));
    expect(minHeavy).toBeGreaterThanOrEqual(maxLight);
  });
});
