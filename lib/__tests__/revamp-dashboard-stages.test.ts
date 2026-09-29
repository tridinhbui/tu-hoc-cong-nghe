import { describe, it, expect } from "vitest";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL } from "@/lib/track-stages";
import { revampDashboardVi, revampDashboardEn } from "@/lib/i18n/dictionaries/sections/revamp-dashboard";

// "Sau chặng này bạn có thể" tra theo VỊ TRÍ chặng, giống t.trackStages. Thêm
// một chặng vào lib/track-stages.ts mà quên ở đây thì chặng đó mất dòng kết
// quả; đổi chỗ hai chặng thì mọi chặng sau hiện kết quả của chặng khác - và
// không có lỗi biên dịch nào cho cả hai trường hợp.

const TRACKS = [
  ["personal", TRACK_PERSONAL],
  ["professional", TRACK_PROFESSIONAL],
] as const;

const diacritics = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

describe("kết quả từng chặng (revampDashboard.stages)", () => {
  it.each(TRACKS)("%s: vi và en có đúng một mục cho mỗi chặng", (id, track) => {
    expect(revampDashboardVi.revampDashboard.stages[id]).toHaveLength(track.stages.length);
    expect(revampDashboardEn.revampDashboard.stages[id]).toHaveLength(track.stages.length);
  });

  it.each(TRACKS)("%s: mục nào cũng đủ tag, headline, outcome", (id) => {
    for (const dict of [revampDashboardVi, revampDashboardEn]) {
      for (const s of dict.revampDashboard.stages[id]) {
        expect(s.tag.trim()).not.toBe("");
        expect(s.headline.trim()).not.toBe("");
        // Ít nhất hai việc cụ thể, ngăn bằng " · " - giao diện tách theo dấu này.
        expect(s.outcome.split(" · ").length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it.each(TRACKS)("%s: bản en không còn dấu tiếng Việt", (id) => {
    const offenders = revampDashboardEn.revampDashboard.stages[id]
      .flatMap((s) => [s.tag, s.headline, s.outcome])
      .filter((v) => diacritics.test(v));
    expect(offenders).toEqual([]);
  });
});
