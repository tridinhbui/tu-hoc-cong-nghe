import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { isLessonInRange, TRACK_PERSONAL, TRACK_PROFESSIONAL } from "@/lib/track-stages";

/**
 * A lesson reaches the learner only through a stage: the dashboard filters
 * `isLessonInRange(lesson.id, stage)` at stage level. So a lesson in no stage
 * is written, generated, shipped - and unreachable.
 *
 * That is not hypothetical. Chặng 12 declared a part covering 1250-1252 while
 * the stage span itself stopped at 1243, and since membership is decided at
 * stage level first, those three behavioural-finance lessons belonged to no
 * stage at all. Nothing failed; they were simply invisible.
 */

interface LessonMetaRow {
  id: number;
  slug: string;
  title: string;
  track?: string;
}

const lessons: LessonMetaRow[] = JSON.parse(
  readFileSync(new URL("../lessons-data/_index.json", import.meta.url), "utf8")
);

const ALL_STAGES = [
  ...TRACK_PERSONAL.stages.map((s) => ({ track: "personal", ...s })),
  ...TRACK_PROFESSIONAL.stages.map((s) => ({ track: "professional", ...s })),
];

function stagesFor(lessonId: number) {
  return ALL_STAGES.filter((stage) => isLessonInRange(lessonId, stage));
}

describe("track stage coverage", () => {
  it("routes every personal and professional lesson through some stage", () => {
    // `bonus` is reached from case-study surfaces rather than the day-by-day
    // path, so it is legitimately outside the stage ranges.
    const routed = lessons.filter((l) => l.track === "personal" || l.track === "professional");
    const orphans = routed.filter((l) => stagesFor(l.id).length === 0);

    expect(
      orphans.map((l) => `${l.id} ${l.slug}`),
      "these lessons exist but no stage lists them, so nothing links to them"
    ).toEqual([]);
  });

  it("does not let two stages claim the same lesson", () => {
    const shared = lessons
      .map((l) => ({ lesson: l, stages: stagesFor(l.id) }))
      .filter((x) => x.stages.length > 1);

    expect(
      shared.map((x) => `${x.lesson.id} in ${x.stages.map((s) => `${s.track}/${s.label}`).join(" + ")}`)
    ).toEqual([]);
  });

  it("has no stage without lessons", () => {
    const empty = ALL_STAGES.filter(
      (stage) => !lessons.some((l) => isLessonInRange(l.id, stage))
    );
    expect(empty.map((s) => `${s.track}/${s.label}`)).toEqual([]);
  });

  it("has no stage part whose lessons the parent stage excludes", () => {
    // The exact shape of the Chặng 12 bug: a part pointing at ids the stage
    // itself does not cover, so the part renders empty however many lessons
    // its own range names.
    const stranded: string[] = [];
    for (const stage of ALL_STAGES) {
      for (const part of stage.parts ?? []) {
        for (const lesson of lessons) {
          if (isLessonInRange(lesson.id, part) && !isLessonInRange(lesson.id, stage)) {
            stranded.push(`${stage.track}/${stage.label} · "${part.name}" lists ${lesson.id}`);
          }
        }
      }
    }
    expect(stranded).toEqual([]);
  });
});
