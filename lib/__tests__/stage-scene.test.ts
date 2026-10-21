import { describe, it, expect } from "vitest";
import { stageSceneFor } from "@/components/workshop/stage-scene";
import { revampDashboardVi, revampDashboardEn } from "@/lib/i18n/dictionaries/sections/revamp-dashboard";

/** "Xưởng của bạn" vẽ mỗi chặng bằng một trong tám cảnh, tra theo `tag`. Cảnh
 *  `workshop` (bàn làm việc + cặp hồ sơ) là chỗ rơi về cho các chặng nghề và
 *  ngành - đúng nghĩa với chúng, nhưng nếu một đợt chặng công nghệ mới cũng rơi
 *  về đó thì trang tổng quan lại thành một dãy hình giống hệt nhau, và không có
 *  gì báo. Lúc viết: 38/216 nhãn (17,6%) rơi về, toàn bộ là nghề/ngành. */
const MAX_FALLBACK_SHARE = 0.2;

const tracks = [revampDashboardVi.revampDashboard.stages, revampDashboardEn.revampDashboard.stages];
const tags = tracks.flatMap((t) => [...t.personal, ...t.professional].map((s) => s.tag));

describe("stage scenes", () => {
  it("keeps the fallback scene for career and industry stages only", () => {
    const fallback = tags.filter((tag) => stageSceneFor(tag) === "workshop");
    expect(fallback.length / tags.length).toBeLessThanOrEqual(MAX_FALLBACK_SHARE);
  });

  it("resolves the cases where rule order matters", () => {
    expect(stageSceneFor("AI CODE")).toBe("ai");
    expect(stageSceneFor("DỮ LIỆU + AI")).toBe("data");
    expect(stageSceneFor("LINUX")).toBe("machine");
    expect(stageSceneFor("UX PSYCHOLOGY")).toBe("web");
    expect(stageSceneFor("LLM SECURITY")).toBe("shield");
    expect(stageSceneFor(undefined)).toBe("workshop");
  });

  it("draws the same scene for a stage in Vietnamese and in English", () => {
    for (const key of ["personal", "professional"] as const) {
      const vi = revampDashboardVi.revampDashboard.stages[key];
      const en = revampDashboardEn.revampDashboard.stages[key];
      const mismatched = vi
        .map((s, i) => ({ vi: s.tag, en: en[i]?.tag }))
        .filter((p) => stageSceneFor(p.vi) !== stageSceneFor(p.en));
      expect(mismatched).toEqual([]);
    }
  });
});
