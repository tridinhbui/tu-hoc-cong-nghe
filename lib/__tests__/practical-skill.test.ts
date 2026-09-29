import { describe, expect, it } from "vitest";
import {
  AREA_TARGET,
  EVIDENCE_POINTS,
  EVIDENCE_SOURCES,
  SKILL_AREAS,
  SOURCE_CAP,
  STAGE_AREAS,
  computeSkillScores,
  certArea,
  interviewArea,
  parseExerciseRef,
  parseToolRef,
  stageArea,
  stageNumberOf,
  toolMissionArea,
} from "@/lib/practical-skill";
import {
  certEvidence,
  interviewEvidence,
  resolveClientEvidence,
  stageExamEvidence,
} from "@/lib/practical-skill-server";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL } from "@/lib/track-stages";
import { TECH_INTERVIEW_QUESTIONS } from "@/lib/interview-bank";
import { CERT_TRACKS } from "@/lib/cert-tracks";
import { EXERCISES } from "@/lib/exercise-index";
import { TERMINAL_MISSIONS } from "@/lib/tools/terminal/missions";
import { EDITOR_MISSION_IDS } from "@/lib/tools/editor/missions";
import { SQL_MISSION_IDS } from "@/lib/tools/sql/missions";
import { API_MISSIONS } from "@/lib/tools/api/missions";
import { CLOUD_MISSIONS } from "@/lib/tools/cloud/missions";

const rows = (area: string, source: string, n: number, points = EVIDENCE_POINTS[source as keyof typeof EVIDENCE_POINTS]) =>
  Array.from({ length: n }, () => ({ area, source, points }));

describe("computeSkillScores", () => {
  it("không có bằng chứng thì mọi lĩnh vực 0%, đủ lĩnh vực, đúng thứ tự", () => {
    const s = computeSkillScores([]);
    expect(s.map((x) => x.area)).toEqual([...SKILL_AREAS]);
    expect(s.every((x) => x.percent === 0)).toBe(true);
  });

  it("một nguồn đơn lẻ không vượt trần của nó, dù làm bao nhiêu lần", () => {
    const s = computeSkillScores(rows("frontend", "interview", 500));
    const fe = s.find((x) => x.area === "frontend")!;
    expect(fe.points).toBe(SOURCE_CAP.interview);
    expect(fe.percent).toBe(Math.round((SOURCE_CAP.interview / AREA_TARGET) * 100));
    expect(fe.counts.interview).toBe(500);
  });

  it("không nguồn nào một mình đẩy một lĩnh vực quá 35%", () => {
    for (const src of EVIDENCE_SOURCES) {
      const pct = computeSkillScores(rows("data", src, 1000)).find((x) => x.area === "data")!.percent;
      expect(pct).toBeLessThanOrEqual(35);
    }
  });

  it("cộng các nguồn, trần 100%", () => {
    const all = EVIDENCE_SOURCES.flatMap((s) => rows("cloud", s, 100));
    expect(computeSkillScores(all).find((x) => x.area === "cloud")!.percent).toBe(100);
    const some = [...rows("cloud", "stage_exam", 1), ...rows("cloud", "tool", 2)];
    // 25 + 12 = 37 điểm → 37%
    expect(computeSkillScores(some).find((x) => x.area === "cloud")!.percent).toBe(37);
  });

  it("bỏ qua lĩnh vực/nguồn lạ và điểm âm", () => {
    const s = computeSkillScores([
      { area: "finance", source: "tool", points: 50 },
      { area: "ai", source: "reading", points: 50 },
      { area: "ai", source: "tool", points: -40 },
    ]);
    expect(s.every((x) => x.percent === 0)).toBe(true);
  });
});

describe("ref", () => {
  it("parse", () => {
    expect(parseExerciseRef("1862:4")).toEqual({ lessonId: 1862, blockIndex: 4 });
    expect(parseExerciseRef("1862")).toBeNull();
    expect(parseToolRef("sql:group-count")).toEqual({ tool: "sql", missionId: "group-count" });
    expect(parseToolRef("sql:; drop")).toBeNull();
    expect(stageNumberOf("Chặng 12")).toBe(12);
  });
});

describe("ánh xạ phủ đủ danh mục thật", () => {
  it("mọi chặng của hai tuyến có mục trong STAGE_AREAS (kể cả null có chủ đích)", () => {
    for (const [track, def] of [["personal", TRACK_PERSONAL], ["professional", TRACK_PROFESSIONAL]] as const) {
      for (const st of def.stages) {
        const n = stageNumberOf(st.label);
        expect(n, st.label).not.toBeNull();
        expect(Object.prototype.hasOwnProperty.call(STAGE_AREAS[track], n!), `${track} ${st.label}`).toBe(true);
      }
    }
  });

  it("mọi nhiệm vụ công cụ có lĩnh vực và được API chấp nhận", () => {
    const all: [string, readonly string[]][] = [
      ["terminal", TERMINAL_MISSIONS.map((m) => m.id)],
      ["editor", EDITOR_MISSION_IDS],
      ["sql", SQL_MISSION_IDS],
      ["api", API_MISSIONS.map((m) => m.id)],
      ["cloud", CLOUD_MISSIONS.map((m) => m.id)],
    ];
    for (const [tool, ids] of all) {
      for (const id of ids) {
        expect(toolMissionArea(tool, id), `${tool}:${id}`).not.toBeNull();
        expect(resolveClientEvidence("tool", `${tool}:${id}`), `${tool}:${id}`).not.toBeNull();
      }
    }
  });

  it("mọi bài tập viết mã trong lib/lessons-data được chấp nhận", () => {
    expect(EXERCISES.length).toBeGreaterThan(0);
    for (const e of EXERCISES) {
      const ev = resolveClientEvidence("exercise", `${e.lessonId}:${e.block}`);
      expect(ev, e.slug).not.toBeNull();
      expect(ev!.points).toBe(EVIDENCE_POINTS.exercise);
    }
    // Bài lập trình đầu tiên (chặng 3 tuyến cá nhân) là "code".
    const first = EXERCISES.find((e) => e.lessonId === 1)!;
    expect(resolveClientEvidence("exercise", `1:${first.block}`)!.area).toBe("code");
  });

  it("mọi câu phỏng vấn ngoài QA có lĩnh vực", () => {
    for (const q of TECH_INTERVIEW_QUESTIONS) {
      if (q.career === "qa") continue;
      expect(interviewArea(q.career, q.category), `${q.id}`).not.toBeNull();
    }
  });

  it("mọi miền chứng chỉ có lĩnh vực", () => {
    for (const cert of CERT_TRACKS) for (const d of cert.domains) expect(certArea(cert.id, d.id)).not.toBeNull();
  });
});

describe("API chỉ nhận thứ có thật", () => {
  it("từ chối ref không có trong danh mục và nguồn không được phép từ client", () => {
    expect(resolveClientEvidence("tool", "sql:khong-co")).toBeNull();
    expect(resolveClientEvidence("tool", "photoshop:layer")).toBeNull();
    expect(resolveClientEvidence("exercise", "999999:0")).toBeNull();
    expect(resolveClientEvidence("interview", "1001")).toBeNull();
    expect(resolveClientEvidence("stage_exam", "personal:3")).toBeNull();
    expect(resolveClientEvidence("tool", { ref: "sql:select-all" })).toBeNull();
  });

  it("phỏng vấn: theo id câu, bỏ trùng, bỏ id lạ", () => {
    const fe = TECH_INTERVIEW_QUESTIONS.find((q) => q.career === "frontend" && q.category === "React")!;
    const ev = interviewEvidence([fe.id, fe.id, 987654]);
    expect(ev).toEqual([{ source: "interview", ref: String(fe.id), area: "frontend", points: EVIDENCE_POINTS.interview }]);
  });

  it("chứng chỉ: chỉ tính bài nằm trong miền đã khai", () => {
    const ev = certEvidence("aws-cloud-practitioner", "billing-support", [322, 322, 121]);
    expect(ev.map((e) => e.ref)).toEqual(["aws-cloud-practitioner:billing-support:322"]);
    expect(ev[0].area).toBe("cloud");
    expect(certEvidence("aws-cloud-practitioner", "khong-co", [322])).toEqual([]);
    expect(certEvidence(undefined, undefined, [322])).toEqual([]);
  });

  it("thi vượt chặng: chặng kỹ thuật có lĩnh vực, chặng nghề nghiệp thì không", () => {
    expect(stageExamEvidence("personal", "Chặng 4")).toEqual([
      { source: "stage_exam", ref: "personal:4", area: "frontend", points: EVIDENCE_POINTS.stage_exam },
    ]);
    expect(stageExamEvidence("personal", "Chặng 11")).toEqual([]);
    expect(stageArea("professional", 34)).toBe("ai");
  });
});
