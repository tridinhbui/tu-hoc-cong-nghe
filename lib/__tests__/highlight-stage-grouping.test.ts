import { describe, expect, it } from "vitest";
import { groupByStage, resolveStage, UNGROUPED } from "@/lib/highlight-stage-grouping";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL } from "@/lib/track-stages";

const firstPersonal = TRACK_PERSONAL.stages[0];
const firstProfessional = TRACK_PROFESSIONAL.stages[0];

describe("resolveStage", () => {
  it("maps a lesson to its personal-track stage", () => {
    const stage = resolveStage(firstPersonal.days[0]);
    expect(stage.track).toBe("personal");
    expect(stage.label).toBe(firstPersonal.label);
    expect(stage.name).toBe(firstPersonal.name);
  });

  it("maps a lesson to its professional-track stage", () => {
    const stage = resolveStage(firstProfessional.days[0]);
    expect(stage.track).toBe("professional");
    expect(stage.label).toBe(firstProfessional.label);
  });

  it("keys the two tracks apart even when the labels collide", () => {
    // Both tracks number their stages from "Chặng 1", so the label alone
    // cannot be the grouping key.
    const personal = TRACK_PERSONAL.stages.find((s) => s.label === "Chặng 1");
    const professional = TRACK_PROFESSIONAL.stages.find((s) => s.label === "Chặng 1");
    expect(personal).toBeDefined();
    expect(professional).toBeDefined();
    expect(resolveStage(personal!.days[0]).key).not.toBe(resolveStage(professional!.days[0]).key);
  });

  it("falls back to the ungrouped bucket for an id in no stage", () => {
    expect(resolveStage(999_999)).toEqual(UNGROUPED);
  });

  it("sorts every personal stage before every professional one", () => {
    const personalOrders = TRACK_PERSONAL.stages.map((s) => resolveStage(s.days[0]).order);
    const professionalOrders = TRACK_PROFESSIONAL.stages.map((s) => resolveStage(s.days[0]).order);
    expect(Math.max(...personalOrders)).toBeLessThan(Math.min(...professionalOrders));
  });
});

describe("groupByStage", () => {
  it("groups highlights and orders the groups by stage order", () => {
    const items = [
      { id: 1, lesson_id: firstProfessional.days[0] },
      { id: 2, lesson_id: firstPersonal.days[0] },
      { id: 3, lesson_id: firstPersonal.days[0] },
    ];
    const groups = groupByStage(items);

    expect(groups.map((g) => g.stage.track)).toEqual(["personal", "professional"]);
    expect(groups[0].items.map((i) => i.id)).toEqual([2, 3]);
    expect(groups[1].items.map((i) => i.id)).toEqual([1]);
  });

  it("preserves the caller's ordering inside a group", () => {
    const lesson = firstPersonal.days[0];
    const items = [
      { id: 3, lesson_id: lesson },
      { id: 1, lesson_id: lesson },
      { id: 2, lesson_id: lesson },
    ];
    expect(groupByStage(items)[0].items.map((i) => i.id)).toEqual([3, 1, 2]);
  });

  it("omits stages with no highlights", () => {
    const groups = groupByStage([{ id: 1, lesson_id: firstPersonal.days[0] }]);
    expect(groups).toHaveLength(1);
  });

  it("sorts the ungrouped bucket last", () => {
    const groups = groupByStage([
      { id: 1, lesson_id: 999_999 },
      { id: 2, lesson_id: firstPersonal.days[0] },
    ]);
    expect(groups[groups.length - 1].stage.key).toBe(UNGROUPED.key);
  });

  it("returns nothing for no highlights", () => {
    expect(groupByStage([])).toEqual([]);
  });
});
