import { describe, it, expect } from "vitest";
import { BADGE_DEFINITIONS, LEVEL_BADGE_DEFINITIONS } from "@/lib/badges";
import { COMPETENCIES, computeCompetencyScores } from "@/lib/career-competency";
import { LEVELS } from "@/lib/levels";
import { badgeName, badgeDescription } from "@/lib/badge-label";
import {
  badgesCompetencyVi,
  badgesCompetencyEn,
} from "@/lib/i18n/dictionaries/sections/badges-competency";
import { levelTitlesVi, levelTitlesEn } from "@/lib/i18n/dictionaries/sections/level-titles";

const DIACRITICS =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

/** Huy hiệu KHÔNG phải cấp độ - những cái duy nhất cần mục riêng. */
const NON_LEVEL = Object.values(BADGE_DEFINITIONS).filter(
  (b) => LEVEL_BADGE_DEFINITIONS[b.key] === undefined
);

describe("bản dịch huy hiệu và năng lực", () => {
  it("mọi huy hiệu không phải cấp độ đều có bản Việt khớp từng chữ", () => {
    for (const badge of NON_LEVEL) {
      const vi = badgesCompetencyVi.badges[badge.key];
      expect(vi, `thiếu ${badge.key}`).toBeTruthy();
      expect(vi.name).toBe(badge.name);
      expect(vi.description).toBe(badge.description);
    }
  });

  it("huy hiệu cấp độ KHÔNG có mục riêng - chúng dùng lại t.levelTitles", () => {
    // Hai nguồn cho cùng một chuỗi sẽ lệch nhau, và lệch ở đây nghĩa là huy
    // hiệu mang tên khác với cấp vừa trao nó. Ca này chặn việc ai đó "bổ sung
    // cho đủ" bằng cách chép tên cấp sang bảng huy hiệu.
    for (const key of Object.keys(LEVEL_BADGE_DEFINITIONS)) {
      expect(badgesCompetencyVi.badges[key], `${key} không nên có mục riêng`).toBeUndefined();
      expect(badgesCompetencyEn.badges[key]).toBeUndefined();
    }
  });

  it("badgeName lấy tên cấp từ levelTitles, và tên khác từ bảng huy hiệu", () => {
    const t = {
      badges: badgesCompetencyEn.badges,
      levelTitles: levelTitlesEn.levelTitles,
      badgeLevelDescription: badgesCompetencyEn.badgeLevelDescription,
    };
    const levelBadge = LEVEL_BADGE_DEFINITIONS.level_2;
    const stored = {
      badge_key: levelBadge.key,
      badge_name: levelBadge.name,
      badge_description: levelBadge.description,
    };
    expect(badgeName(stored, t)).toBe(levelTitlesEn.levelTitles[2]);
    expect(badgeDescription(stored, t)).toBe("Reached level 2");

    const other = BADGE_DEFINITIONS.leaderboard_xp_top_10;
    const stored2 = {
      badge_key: other.key,
      badge_name: other.name,
      badge_description: other.description,
    };
    expect(badgeName(stored2, t)).toBe("Top 10 XP");
  });

  it("mọi huy hiệu cấp độ đều trỏ tới một cấp có thật", () => {
    const levels = new Set(LEVELS.map((l) => l.level));
    for (const def of Object.values(LEVEL_BADGE_DEFINITIONS)) {
      expect(def.level !== undefined && levels.has(def.level), `${def.key}`).toBe(true);
    }
    // Và bản Việt của tên huy hiệu vẫn khớp tên cấp - nếu một bên đổi mà bên
    // kia không, ca này đỏ trước khi người học nhìn thấy hai cái tên khác nhau.
    for (const def of Object.values(LEVEL_BADGE_DEFINITIONS)) {
      expect(levelTitlesVi.levelTitles[def.level!]).toBe(def.name);
    }
  });

  it("trục nào có nhãn tiếng Anh sẵn thì KHÔNG được chép vào lớp phủ", () => {
    // Chép một chuỗi đã là tiếng Anh sang cả hai bản tạo ra một cặp giống hệt
    // nhau - dictionary-parity không phân biệt được nó với bản dịch bỏ quên.
    const alreadyEnglish = ["valuation", "interview_readiness", "cfa_readiness"];
    for (const id of alreadyEnglish) {
      expect(badgesCompetencyVi.competencies[id].label, id).toBeUndefined();
      expect(badgesCompetencyEn.competencies[id].label, id).toBeUndefined();
    }
  });

  it("mọi trục năng lực đều có bản Việt khớp và bản Anh không dấu", () => {
    for (const c of COMPETENCIES) {
      const vi = badgesCompetencyVi.competencies[c.id];
      expect(vi, `thiếu ${c.id}`).toBeTruthy();
      // `label` chỉ có ở trục có nhãn tiếng Việt; sáu trục còn lại vốn đã là
      // tiếng Anh nên cố ý không có mặt - xem chú thích ở badges-competency.ts.
      if (vi.label !== undefined) expect(vi.label).toBe(c.label);
      expect(vi.blurb).toBe(c.blurb);
      expect(vi.actionLabel).toBe(c.actionLabel);
      const en = badgesCompetencyEn.competencies[c.id];
      for (const value of [en.label, en.blurb, en.actionLabel].filter(Boolean) as string[]) {
        expect(DIACRITICS.test(value), `${c.id}: "${value}"`).toBe(false);
      }
    }
  });
});

describe("bản dịch phần chi tiết năng lực", () => {
  const DIA =
    /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

  // `computeCompetencyScores` chạy ở route API rồi gửi chuỗi xuống client, nên
  // nó gửi kèm `key`. Ca này chạy thật hàm đó với tín hiệu rỗng để lấy đúng bộ
  // khoá mà production sinh ra - liệt kê tay sẽ lệch ngay lần thêm một phần mới.
  const parts = computeCompetencyScores({
    completedLessonIds: [],
    quizSessions: [],
    completedCfaModuleIds: [],
    totalCfaModules: 0,
    cfaLessonIds: [],
    frmLessonIds: [],
  }).flatMap((c) => c.parts);

  it("mọi key đều có bản Việt khớp từng chữ với label dự phòng", () => {
    for (const p of parts) {
      expect(badgesCompetencyVi.competencyParts[p.key], `thiếu ${p.key}`).toBe(p.label);
    }
  });

  it("mọi key đều có bản Anh không còn dấu tiếng Việt", () => {
    for (const p of parts) {
      const en = badgesCompetencyEn.competencyParts[p.key];
      expect(en, `${p.key} thiếu bản Anh`).toBeTruthy();
      expect(DIA.test(en), `${p.key}: "${en}"`).toBe(false);
    }
  });

  it("mọi đơn vị được dùng đều có trong bảng đơn vị", () => {
    // `unit` tách khỏi `value` để chữ "bài"/"câu" dịch được. Một đơn vị mới mà
    // quên khai ở đây sẽ hiện nguyên khoá ("lessons") trên màn hình.
    for (const p of parts) {
      if (!p.unit) continue;
      expect(badgesCompetencyVi.competencyUnits[p.unit], `thiếu đơn vị ${p.unit}`).toBeTruthy();
      expect(badgesCompetencyEn.competencyUnits[p.unit]).toBeTruthy();
    }
  });
});
