import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import BuildingScenarioGame, { SCENARIO_BUILDINGS } from "@/components/BuildingScenarioGame";
import { I18nProvider } from "@/lib/i18n/context";
import { buildingGamesEn, buildingGamesVi } from "@/lib/i18n/dictionaries/sections/building-games";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }), usePathname: () => "/game" }));

describe("game tình huống toà nhà", () => {
  it("mỗi toà render được tiêu đề và tình huống đầu, cả hai ngôn ngữ", () => {
    for (const locale of ["vi", "en"] as const) {
      const copy = (locale === "vi" ? buildingGamesVi : buildingGamesEn).buildingGames;
      for (const id of SCENARIO_BUILDINGS) {
        const html = renderToStaticMarkup(
          <I18nProvider initialLocale={locale}>
            <BuildingScenarioGame buildingId={id} userId="" />
          </I18nProvider>
        );
        expect(html).toContain(copy.games[id].title);
        // Đủ 4 nút phương án của tình huống đang hiện.
        expect(html.match(/<button/g)?.length).toBe(4);
      }
    }
  });

  it("vi và en có cùng số tình huống, mỗi tình huống đúng 4 phương án", () => {
    for (const id of SCENARIO_BUILDINGS) {
      const vi = buildingGamesVi.buildingGames.games[id].scenarios;
      const en = buildingGamesEn.buildingGames.games[id].scenarios;
      expect(en.length).toBe(vi.length);
      for (const s of [...vi, ...en]) expect(s.options).toHaveLength(4);
    }
  });

  // Đáp án (phần tử 0) không được là phương án dài nhất một cách có hệ thống -
  // cùng mẹo độ dài mà AGENTS.md đo trên quiz bài học.
  it("đáp án đúng không phải phương án dài nhất ở phần lớn tình huống", () => {
    for (const bank of [buildingGamesVi, buildingGamesEn]) {
      const all = Object.values(bank.buildingGames.games).flatMap((g) => g.scenarios);
      const longest = all.filter((s) => {
        const lens = s.options.map((o) => o.length);
        return lens[0] > Math.max(...lens.slice(1));
      }).length;
      expect(longest / all.length).toBeLessThanOrEqual(0.3);
    }
  });
});
