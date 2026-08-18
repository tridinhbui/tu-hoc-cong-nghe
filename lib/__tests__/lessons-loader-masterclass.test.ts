import { describe, it, expect } from "vitest";
import { getLessonsMeta, getLessonBySlug, getLessonById, getLessonsByTrack } from "@/lib/lessons-loader";
import { ADVANCED_MASTERCLASS_LESSONS } from "@/lib/advanced-masterclass-lessons";

// lib/lessons.ts spreads ADVANCED_MASTERCLASS_LESSONS into `lessons`, so the
// generator already covers those five. The loader used to ALSO check that
// array first and return its raw objects, which duplicated them in the
// listing and served them unprocessed. These tests pin both halves down.
//
// They read the real lib/lessons-data output, so they also fail if the
// generated data is stale - which is the point: the whole bug was two
// sources of truth for the same five lessons.

describe("getLessonsMeta", () => {
  it("returns no duplicate lesson ids", async () => {
    const meta = await getLessonsMeta();
    const ids = meta.map((l) => l.id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicates).toEqual([]);
  });

  it("returns no duplicate slugs", async () => {
    const meta = await getLessonsMeta();
    const slugs = meta.map((l) => l.slug);
    const duplicates = slugs.filter((slug, i) => slugs.indexOf(slug) !== i);
    expect(duplicates).toEqual([]);
  });

  it("still lists every masterclass lesson, exactly once each", async () => {
    const meta = await getLessonsMeta();
    for (const masterclass of ADVANCED_MASTERCLASS_LESSONS) {
      expect(meta.filter((l) => l.slug === masterclass.slug)).toHaveLength(1);
    }
  });
});

describe("masterclass lessons go through the generator pipeline", () => {
  it("serves the balanced quiz rather than the authored answer positions", async () => {
    for (const masterclass of ADVANCED_MASTERCLASS_LESSONS) {
      const raw = masterclass.quiz.map((q) => q.correct);
      const served = await getLessonBySlug(masterclass.slug);
      expect(served, masterclass.slug).toBeDefined();
      const balanced = served!.quiz.map((q) => q.correct);

      // The balancer spreads answers across slots, so its output differs
      // from what was authored. Equality here means the loader handed back
      // the raw object and skipped the pipeline.
      expect(balanced, `${masterclass.slug} chưa qua balancer`).not.toEqual(raw);
      expect(new Set(balanced).size, `${masterclass.slug} vẫn dồn đáp án một vị trí`).toBeGreaterThan(1);
    }
  });

  it("no longer serves any masterclass lesson with every answer in one slot", async () => {
    // Four of the five were authored entirely at index 1 - picking B blind
    // scored 100% on them. Kept as an explicit regression pin.
    const authoredDegenerate = ADVANCED_MASTERCLASS_LESSONS.filter(
      (m) => new Set(m.quiz.map((q) => q.correct)).size === 1
    );
    expect(authoredDegenerate.length).toBeGreaterThan(0);

    for (const masterclass of authoredDegenerate) {
      const served = await getLessonBySlug(masterclass.slug);
      expect(new Set(served!.quiz.map((q) => q.correct)).size, masterclass.slug).toBeGreaterThan(1);
    }
  });

  it("carries the computed reading fields the raw objects lack", async () => {
    const lesson = await getLessonBySlug(ADVANCED_MASTERCLASS_LESSONS[0].slug);
    expect(lesson?.readingMinutes).toBeGreaterThan(0);
    expect(lesson?.totalMinutes).toBeGreaterThan(0);
  });

  it("resolves the same lesson by id and by slug", async () => {
    const first = ADVANCED_MASTERCLASS_LESSONS[0];
    const bySlug = await getLessonBySlug(first.slug);
    const byId = await getLessonById(first.id);
    expect(byId?.slug).toBe(bySlug?.slug);
    expect(byId?.quiz.map((q) => q.correct)).toEqual(bySlug?.quiz.map((q) => q.correct));
  });
});

describe("answer positions survive the request path", () => {
  // getLessonBySlug used to re-run applyLessonOverrides over the generated
  // JSON, which had already had those overrides applied AND been balanced.
  // The second pass replayed the authored `correct` indices and flattened
  // the balancing: 211 of 576 lessons came back with every answer at index
  // 0. These pin the served content to the generated content.
  const SAMPLE_SLUGS = ["npv-co-ban", "annuity", "asset-turnover"];

  it("serves the exact answer positions the generator produced", async () => {
    for (const slug of SAMPLE_SLUGS) {
      const lesson = await getLessonBySlug(slug);
      expect(lesson, slug).toBeDefined();
      const positions = lesson!.quiz.map((q) => q.correct);
      expect(new Set(positions).size, `${slug} dồn hết đáp án về một vị trí`).toBeGreaterThan(1);
    }
  });

  it("leaves almost no lesson answerable by always picking the same option", async () => {
    const meta = await getLessonsMeta();
    const lessons = await Promise.all(meta.map((m) => getLessonBySlug(m.slug)));

    const degenerate = lessons.filter((lesson) => {
      const quiz = lesson?.quiz ?? [];
      return quiz.length > 1 && new Set(quiz.map((q) => q.correct)).size === 1;
    });

    // A handful survive because they are genuinely short or the balancer
    // cannot spread them; the regression being guarded turned this into
    // hundreds. Ratchet this number down, never up.
    expect(degenerate.length, degenerate.map((l) => l!.slug).join(", ")).toBeLessThanOrEqual(15);
  });
});

describe("getLessonsByTrack", () => {
  it("includes lessons whose track is derived from stage ranges, not just tagged ones", async () => {
    const professional = await getLessonsByTrack("professional");
    const untagged = professional.filter((l) => !l.track);
    // The old `l.track === track` compare returned zero of these.
    expect(untagged.length).toBeGreaterThan(0);
  });

  it("returns only explicitly tagged lessons for the bonus track", async () => {
    const bonus = await getLessonsByTrack("bonus");
    expect(bonus.length).toBeGreaterThan(0);
    expect(bonus.every((l) => l.track === "bonus")).toBe(true);
  });

  it("never puts the same lesson in both personal and professional", async () => {
    const [personal, professional] = await Promise.all([
      getLessonsByTrack("personal"),
      getLessonsByTrack("professional"),
    ]);
    const professionalIds = new Set(professional.map((l) => l.id));
    const overlap = personal.filter((l) => professionalIds.has(l.id)).map((l) => l.slug);
    expect(overlap).toEqual([]);
  });
});
