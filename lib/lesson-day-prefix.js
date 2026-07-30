// Moves the legacy "Day N" out of lesson titles and into the `day` field.
//
// 266 lesson titles were written as "Tự học Tài chính Day <N>: <real title>",
// where N is always exactly the lesson id (verified: 266/266 match). Because
// ids are assigned in deliberately non-contiguous blocks and stages render in
// array order - not id order - the number displayed to a learner jumped
// around: the personal track shows Day 1..20 (ids 1-20) and then immediately
// Day 201 (ids 201-220), with six of its ten stages carrying no day at all.
//
// Renumbering the titles was rejected: ids cannot be renumbered without
// breaking existing users' progress (see the comment in lib/track-stages.ts),
// stage order is independent of id order, and stages can pull in lessons from
// elsewhere via extraLessonIds - so any number baked into a title is a second
// source of truth that drifts the moment the curriculum is rearranged.
//
// The number is still needed as data: RECALL_SCHEDULE (lib/recall-schedule.ts)
// is keyed by it, so spaced repetition would silently stop working if it were
// simply deleted. Hence: strip it from the title, keep it in `day`.
//
// Runs as a generator step for the same reason lib/lesson-quiz-balance.js
// does - it is a mechanical transform over authored content, and doing it here
// means new lessons written in the old style are handled automatically.

/** Exactly the authored prefix, anchored - a lesson legitimately titled
 *  "Day 1 Readiness & Integration Playbook" (id 1260, where "Day 1" is the
 *  M&A term for closing day) must not be touched. */
const DAY_PREFIX = /^Tự học Tài chính Day (\d+):\s*/;

export function stripLessonDayPrefixes(lessons) {
  return lessons.map((lesson) => {
    if (!lesson || typeof lesson.title !== "string") return lesson;

    const match = DAY_PREFIX.exec(lesson.title);
    if (!match) return lesson;

    return {
      ...lesson,
      title: lesson.title.slice(match[0].length),
      // Never clobber a hand-authored day (ids 1261-1280 already set one).
      day: lesson.day ?? Number(match[1]),
    };
  });
}

/** Fails the build if the strip lost anything but the prefix.
 *
 *  The risk being guarded is a title becoming empty or a day going missing:
 *  an empty title renders as a blank row in the lesson list, and a missing
 *  day silently disables that lesson's spaced-repetition schedule - both are
 *  the kind of quiet breakage nobody notices for weeks. */
export function assertDayPrefixStripPreservedTitles(before, after) {
  if (before.length !== after.length) {
    throw new Error(`Day-prefix strip changed lesson count: ${before.length} -> ${after.length}`);
  }

  for (let i = 0; i < before.length; i++) {
    const a = before[i];
    const b = after[i];
    if (!a || !b) continue;

    if (a.id !== b.id || a.slug !== b.slug) {
      throw new Error(`Day-prefix strip reordered lessons at index ${i}`);
    }

    const match = typeof a.title === "string" ? DAY_PREFIX.exec(a.title) : null;

    if (!match) {
      if (a.title !== b.title) throw new Error(`Day-prefix strip altered an untouched title: ${a.slug}`);
      continue;
    }

    if (b.title !== a.title.slice(match[0].length)) {
      throw new Error(`Day-prefix strip mangled the title of ${a.slug}: "${b.title}"`);
    }
    if (!b.title.trim()) {
      throw new Error(`Day-prefix strip left ${a.slug} with an empty title`);
    }
    if (b.day !== (a.day ?? Number(match[1]))) {
      throw new Error(`Day-prefix strip lost the day of ${a.slug}: expected ${a.day ?? match[1]}, got ${b.day}`);
    }
  }
}
