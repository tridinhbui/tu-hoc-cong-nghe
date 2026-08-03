import { describe, expect, it } from "vitest";
import { WORRY_REFRAMES } from "@/lib/quiet-corner";
import { WORRY_THEMES, orderWorriesByTheme } from "@/lib/quiet-corner-themes";

const ALL_IDS = WORRY_REFRAMES.map((w) => w.id);

describe("the theme map against the worry list", () => {
  it("covers every worry", () => {
    // A worry belonging to no theme is invisible whenever anything is
    // selected: it drops to "Những điều khác" for every reader, which is the
    // one bucket nobody scrolls to.
    const mapped = new Set(WORRY_THEMES.flatMap((t) => t.worryIds));
    const orphans = ALL_IDS.filter((id) => !mapped.has(id));
    expect(orphans, "these worries belong to no theme").toEqual([]);
  });

  it("points at no worry that has been deleted", () => {
    // The map lives in a different file from the content, so a worry removed
    // there leaves a dangling id here and the theme quietly gets smaller.
    const known = new Set(ALL_IDS);
    const dangling = WORRY_THEMES.flatMap((t) => t.worryIds).filter((id) => !known.has(id));
    expect(dangling, "these theme entries point at worries that no longer exist").toEqual([]);
  });

  it("never files one worry under two themes", () => {
    // Picking a theme would then show the same row twice once it also appears
    // in the rest, and the reader cannot tell which one they already read.
    const all = WORRY_THEMES.flatMap((t) => t.worryIds);
    expect(all.length).toBe(new Set(all).size);
  });

  it("gives every theme something to show", () => {
    for (const theme of WORRY_THEMES) {
      expect(theme.worryIds.length, `${theme.id} is empty`).toBeGreaterThan(0);
    }
  });

  it("uses unique theme ids", () => {
    const ids = WORRY_THEMES.map((t) => t.id);
    expect(ids.length).toBe(new Set(ids).size);
  });
});

describe("ordering", () => {
  it("leaves the page unchanged until something is chosen", () => {
    for (const theme of [null, "", "khong-ton-tai"]) {
      const { matched, rest } = orderWorriesByTheme(theme);
      expect(matched).toEqual([]);
      expect(rest).toEqual(WORRY_REFRAMES);
    }
  });

  it("hides nothing - every worry survives the sort", () => {
    // This is the whole difference between ordering and filtering. Someone who
    // picks "công việc" should still be able to reach the line about the bank
    // balance, because those are usually the same worry.
    for (const theme of WORRY_THEMES) {
      const { matched, rest } = orderWorriesByTheme(theme.id);
      const shown = [...matched, ...rest].map((w) => w.id).sort();
      expect(shown).toEqual([...ALL_IDS].sort());
    }
  });

  it("puts exactly the chosen theme first", () => {
    for (const theme of WORRY_THEMES) {
      const { matched } = orderWorriesByTheme(theme.id);
      expect(matched.map((w) => w.id)).toEqual([...theme.worryIds]);
    }
  });

  it("keeps the original order inside each group", () => {
    // The list was written in a deliberate sequence; a theme should lift rows
    // out of it, not reshuffle them.
    for (const theme of WORRY_THEMES) {
      const { matched, rest } = orderWorriesByTheme(theme.id);
      for (const group of [matched, rest]) {
        const positions = group.map((w) => ALL_IDS.indexOf(w.id));
        expect(positions).toEqual([...positions].sort((a, b) => a - b));
      }
    }
  });

  it("never repeats a worry across the two groups", () => {
    for (const theme of WORRY_THEMES) {
      const { matched, rest } = orderWorriesByTheme(theme.id);
      const ids = [...matched, ...rest].map((w) => w.id);
      expect(ids.length).toBe(new Set(ids).size);
    }
  });
});
