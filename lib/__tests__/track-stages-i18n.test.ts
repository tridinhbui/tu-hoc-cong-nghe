import { describe, it, expect } from "vitest";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL, PROFESSIONAL_BRANCHES } from "@/lib/track-stages";
import { trackStagesVi, trackStagesEn } from "@/lib/i18n/dictionaries/sections/track-stages";
import { LEVELS } from "@/lib/levels";
import { levelTitlesVi, levelTitlesEn } from "@/lib/i18n/dictionaries/sections/level-titles";

// Bản dịch chặng tra theo VỊ TRÍ, nên nó im lặng theo cả hai chiều: thêm một
// chặng vào lib/track-stages.ts mà quên thêm vào từ điển thì `stageCopy` là
// undefined và giao diện rơi về tiếng Việt - đúng cái người dùng vừa báo, và
// không có lỗi biên dịch nào. Đổi thứ tự hai chặng thì còn tệ hơn: mọi chặng
// sau đó hiện tên của chặng khác, và vẫn không có lỗi nào.
//
// Ba điều kiện dưới đây là thứ duy nhất phát hiện được chuyện đó.

const TRACKS = [
  ["personal", TRACK_PERSONAL],
  ["professional", TRACK_PROFESSIONAL],
] as const;

describe("bản dịch chặng lộ trình", () => {
  it.each(TRACKS)("bản Việt của %s khớp từng chữ với lib/track-stages.ts", (id, track) => {
    const vi = trackStagesVi.trackStages[id];
    expect(vi.title).toBe(track.title);
    expect(vi.subtitle).toBe(track.subtitle);
    expect(vi.description).toBe(track.description);
    expect(vi.pillars).toEqual(track.pillars);
    expect(vi.stages.map((s) => s.label)).toEqual(track.stages.map((s) => s.label));
    expect(vi.stages.map((s) => s.name)).toEqual(track.stages.map((s) => s.name));
    expect(vi.stages.map((s) => s.parts)).toEqual(
      track.stages.map((s) => s.parts.map((p) => p.name))
    );
  });

  it.each(TRACKS)("bản Anh của %s có cùng hình dạng", (id) => {
    const vi = trackStagesVi.trackStages[id];
    const en = trackStagesEn.trackStages[id];
    expect(en.pillars).toHaveLength(vi.pillars.length);
    expect(en.stages).toHaveLength(vi.stages.length);
    en.stages.forEach((stage, i) => {
      expect(stage.parts).toHaveLength(vi.stages[i].parts.length);
    });
  });

  it.each(TRACKS)("bản Anh của %s không còn dấu tiếng Việt", (id) => {
    // Cùng phép thử mà dictionary-parity.test.ts dùng: gõ nguyên tiếng Việt vào
    // en.ts thì `tsc` xanh, chỉ có dấu mới tố cáo. Không bắt được chuỗi không
    // dấu, nhưng tên chặng nào cũng có ít nhất một dấu.
    const diacritics = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
    const en = trackStagesEn.trackStages[id];
    const offenders: string[] = [];
    for (const value of [en.title, en.subtitle, en.description, ...en.pillars]) {
      if (diacritics.test(value)) offenders.push(value);
    }
    for (const stage of en.stages) {
      for (const value of [stage.label, stage.name, ...stage.parts]) {
        if (diacritics.test(value)) offenders.push(value);
      }
    }
    expect(offenders).toEqual([]);
  });
});

// Cùng lý do với chặng, chỉ khác là thang cấp khoá theo SỐ CẤP nên không có
// chuyện lệch thứ tự - chỉ có chuyện thiếu. Thêm cấp 16 vào lib/levels.ts mà
// quên từ điển thì `t.levelTitles[16]` là undefined, giao diện rơi về tiếng
// Việt, và không có lỗi biên dịch nào.
describe("bản dịch tên cấp", () => {
  it("bản Việt khớp từng chữ với LEVELS", () => {
    for (const lvl of LEVELS) {
      expect(levelTitlesVi.levelTitles[lvl.level]).toBe(lvl.name);
    }
  });

  it("mọi cấp đều có bản Anh, và không còn dấu tiếng Việt", () => {
    const diacritics = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
    for (const lvl of LEVELS) {
      const en = levelTitlesEn.levelTitles[lvl.level];
      expect(en, `cấp ${lvl.level} thiếu bản Anh`).toBeTruthy();
      expect(diacritics.test(en), `cấp ${lvl.level}: "${en}"`).toBe(false);
    }
  });
});

// Bảy nhánh nghề của lộ trình chuyên ngành. Chúng bị bỏ sót ở lượt dịch chặng
// vì `PROFESSIONAL_BRANCHES` nằm NGOÀI khối `i18n-ignore` bọc hai hằng số lộ
// trình - dịch xong 53 chặng mà quên đúng bộ lọc đứng ngay cạnh chúng trên
// dashboard.
describe("bản dịch nhánh nghề chuyên ngành", () => {
  const DIACRITICS =
    /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

  it("bản Việt khớp từng chữ với PROFESSIONAL_BRANCHES", () => {
    for (const branch of PROFESSIONAL_BRANCHES) {
      const vi = trackStagesVi.professionalBranches[branch.id];
      expect(vi, `thiếu ${branch.id}`).toBeTruthy();
      expect(vi.label).toBe(branch.label);
      expect(vi.subtitle).toBe(branch.subtitle);
    }
  });

  it("mọi nhánh đều có bản Anh không còn dấu tiếng Việt", () => {
    for (const branch of PROFESSIONAL_BRANCHES) {
      const en = trackStagesEn.professionalBranches[branch.id];
      expect(en, `${branch.id} thiếu bản Anh`).toBeTruthy();
      expect(DIACRITICS.test(en.label), `${branch.id}: "${en.label}"`).toBe(false);
      expect(DIACRITICS.test(en.subtitle), `${branch.id}: "${en.subtitle}"`).toBe(false);
    }
  });

  it("stageLabels KHÔNG được dịch - chúng là khoá tra chặng", () => {
    // `stageLabels` so khớp với `stage.label` để lọc chặng theo nhánh. Dịch
    // chúng sang "Stage 1" thì bộ lọc không khớp gì cả và nhánh nào cũng rỗng -
    // không lỗi, không cảnh báo, chỉ là một dashboard trống. Ca này giữ chúng
    // ở lại phía dữ liệu, và giữ chúng trỏ tới chặng có thật.
    const realLabels = new Set(TRACK_PROFESSIONAL.stages.map((s) => s.label));
    for (const branch of PROFESSIONAL_BRANCHES) {
      for (const label of branch.stageLabels) {
        expect(realLabels.has(label), `${branch.id} trỏ tới "${label}" không tồn tại`).toBe(true);
      }
    }
  });
});
