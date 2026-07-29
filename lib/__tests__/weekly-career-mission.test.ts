import { describe, it, expect } from "vitest";
import {
  CAREER_MISSION_PERFECT_WEEK_ID,
  CAREER_MISSION_PERFECT_WEEK_COINS,
  CAREER_MISSION_PERFECT_WEEK_XP,
  MAX_WEEKLY_CAREER_MISSION_XP,
  WEEKLY_CAREER_MISSIONS,
  buildWeeklyMissionState,
  getCareerMission,
  getCareerMissionReward,
  getWeekKey,
  getWeekStart,
  type CareerMissionCounts,
} from "@/lib/weekly-career-mission";

// The claim route (app/api/career-profile/claim/route.ts) pays out purely on
// what these functions return, so the invariants that stop a client from
// minting XP live here rather than in the route.

const allDone: CareerMissionCounts = {
  ib_questions: 20,
  valuation_lessons: 2,
  cv_bullets: 3,
  mock_interview: 1,
  company_case: 1,
};

describe("getWeekStart", () => {
  it("returns the Monday of the week for every day in it", () => {
    // 2026-07-27 is a Monday.
    for (let offset = 0; offset < 7; offset++) {
      const day = new Date(2026, 6, 27 + offset, 15, 30);
      expect(getWeekStart(day).getDate()).toBe(27);
      expect(getWeekStart(day).getMonth()).toBe(6);
    }
  });

  it("rolls Sunday back, not forward", () => {
    // getDay() === 0 for Sunday, the case a naive `- getDay()` gets wrong.
    const sunday = new Date(2026, 7, 2, 23, 0); // 2026-08-02
    expect(getWeekStart(sunday).getDate()).toBe(27);
    expect(getWeekStart(sunday).getMonth()).toBe(6); // July
  });

  it("zeroes the time so it can be used as a range bound", () => {
    const start = getWeekStart(new Date(2026, 6, 29, 18, 45, 12));
    expect([start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()]).toEqual([0, 0, 0, 0]);
  });
});

describe("getWeekKey", () => {
  it("is stable for every day of the same week", () => {
    const keys = new Set(Array.from({ length: 7 }, (_, i) => getWeekKey(new Date(2026, 6, 27 + i, 12))));
    expect(keys.size).toBe(1);
  });

  it("changes at the Monday boundary", () => {
    expect(getWeekKey(new Date(2026, 7, 2, 23, 59))).not.toBe(getWeekKey(new Date(2026, 7, 3, 0, 0)));
  });

  it("zero-pads the week number so keys sort as strings", () => {
    // week_key is CHECKed and compared as text in Postgres.
    expect(getWeekKey(new Date(2026, 0, 8, 12))).toMatch(/^\d{4}-W\d{2}$/);
  });

  it("puts late-December days in the next ISO year when the week belongs there", () => {
    // 2025-12-29 is the Monday of the ISO week whose Thursday falls in 2026.
    expect(getWeekKey(new Date(2025, 11, 29, 12))).toBe("2026-W01");
  });
});

describe("buildWeeklyMissionState", () => {
  it("marks nothing claimable with no progress", () => {
    const state = buildWeeklyMissionState({}, []);
    expect(state.completedCount).toBe(0);
    expect(state.missions.every((m) => !m.completed && !m.claimable && !m.claimed)).toBe(true);
    expect(state.perfectWeek.unlocked).toBe(false);
    expect(state.perfectWeek.claimable).toBe(false);
  });

  it("treats a mission as complete only at or above its target", () => {
    const justUnder = buildWeeklyMissionState({ ib_questions: 19 }, []);
    expect(justUnder.missions.find((m) => m.id === "ib_questions")?.completed).toBe(false);

    const exact = buildWeeklyMissionState({ ib_questions: 20 }, []);
    expect(exact.missions.find((m) => m.id === "ib_questions")?.completed).toBe(true);

    const over = buildWeeklyMissionState({ ib_questions: 999 }, []);
    expect(over.missions.find((m) => m.id === "ib_questions")?.completed).toBe(true);
  });

  it("clamps negative counts to zero rather than reading them as progress", () => {
    const state = buildWeeklyMissionState({ cv_bullets: -5 }, []);
    expect(state.missions.find((m) => m.id === "cv_bullets")?.current).toBe(0);
  });

  it("stops a completed mission being claimable twice", () => {
    const state = buildWeeklyMissionState(allDone, ["mock_interview"]);
    const mock = state.missions.find((m) => m.id === "mock_interview");
    expect(mock?.completed).toBe(true);
    expect(mock?.claimed).toBe(true);
    expect(mock?.claimable).toBe(false);
  });

  it("unlocks the perfect week only when every mission is complete", () => {
    const missingOne = buildWeeklyMissionState({ ...allDone, company_case: 0 }, []);
    expect(missingOne.perfectWeek.unlocked).toBe(false);
    expect(missingOne.perfectWeek.claimable).toBe(false);

    const complete = buildWeeklyMissionState(allDone, []);
    expect(complete.completedCount).toBe(WEEKLY_CAREER_MISSIONS.length);
    expect(complete.perfectWeek.unlocked).toBe(true);
    expect(complete.perfectWeek.claimable).toBe(true);
  });

  it("does not re-offer an already-claimed perfect week", () => {
    const state = buildWeeklyMissionState(allDone, [CAREER_MISSION_PERFECT_WEEK_ID]);
    expect(state.perfectWeek.claimed).toBe(true);
    expect(state.perfectWeek.claimable).toBe(false);
  });

  it("counts completion independently of claim status", () => {
    const state = buildWeeklyMissionState(allDone, WEEKLY_CAREER_MISSIONS.map((m) => m.id));
    expect(state.completedCount).toBe(WEEKLY_CAREER_MISSIONS.length);
    expect(state.perfectWeek.unlocked).toBe(true);
  });

  it("ignores claim ids that aren't missions", () => {
    const state = buildWeeklyMissionState(allDone, ["not_a_mission", "__proto__"]);
    expect(state.missions.every((m) => !m.claimed)).toBe(true);
    expect(state.perfectWeek.claimed).toBe(false);
  });
});

describe("getCareerMissionReward", () => {
  it("returns null for unknown ids so the route can 400 instead of paying", () => {
    expect(getCareerMissionReward("nope")).toBeNull();
    expect(getCareerMissionReward("")).toBeNull();
    // Map lookups must not resolve inherited Object keys into a payout.
    expect(getCareerMissionReward("toString")).toBeNull();
    expect(getCareerMissionReward("constructor")).toBeNull();
  });

  it("matches the definition for every real mission", () => {
    for (const mission of WEEKLY_CAREER_MISSIONS) {
      expect(getCareerMissionReward(mission.id)).toEqual({ xp: mission.xpReward, coins: mission.coinReward });
    }
  });

  it("pays the perfect-week bonus under its own id", () => {
    expect(getCareerMissionReward(CAREER_MISSION_PERFECT_WEEK_ID)).toEqual({
      xp: CAREER_MISSION_PERFECT_WEEK_XP,
      coins: CAREER_MISSION_PERFECT_WEEK_COINS,
    });
  });
});

describe("mission definitions", () => {
  it("has unique ids", () => {
    const ids = WEEKLY_CAREER_MISSIONS.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("does not collide with the perfect-week id", () => {
    expect(getCareerMission(CAREER_MISSION_PERFECT_WEEK_ID)).toBeNull();
  });

  it("keeps every target positive so completion is reachable and percent is finite", () => {
    for (const mission of WEEKLY_CAREER_MISSIONS) {
      expect(mission.target).toBeGreaterThan(0);
    }
  });

  it("caps weekly XP at the sum of the missions", () => {
    const summed = WEEKLY_CAREER_MISSIONS.reduce((sum, m) => sum + m.xpReward, 0);
    expect(MAX_WEEKLY_CAREER_MISSION_XP).toBe(summed);
  });
});
