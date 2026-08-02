import { describe, expect, it } from "vitest";
import { simulatedOnlineFloor } from "@/lib/presence";

/**
 * The "N người đang học cùng lúc" widget shows a deliberate floor rather than
 * raw presence, so the number never reads as empty. That is a product decision,
 * not an accident - what this file guards is that the fabricated number behaves
 * like a real one instead of announcing itself.
 *
 * The previous implementation called Math.random() inside getOnlineCount(),
 * which the widget re-runs every 60 seconds. The displayed count jumped across
 * the whole 50-150 range every minute, which no real audience does.
 */

const MINUTE = 60_000;
/** A fixed Monday so the assertions do not drift with the real clock. */
function at(hour: number, minute = 0): number {
  return new Date(2026, 0, 5, hour, minute, 0, 0).getTime();
}

describe("simulatedOnlineFloor", () => {
  it("stays inside the advertised 50-150 band at every hour", () => {
    for (let h = 0; h < 24; h++) {
      for (const m of [0, 17, 41]) {
        const n = simulatedOnlineFloor(at(h, m));
        expect(n, `hour ${h}:${m}`).toBeGreaterThanOrEqual(50);
        expect(n, `hour ${h}:${m}`).toBeLessThanOrEqual(150);
      }
    }
  });

  it("holds the same value across a widget refresh", () => {
    // The widget polls once a minute; within one 10-minute bucket every poll
    // has to return the identical number or the count visibly twitches.
    const base = at(14, 0);
    const seen = new Set([0, 1, 2, 3, 4].map((i) => simulatedOnlineFloor(base + i * MINUTE)));
    expect(seen.size).toBe(1);
  });

  it("moves between buckets rather than being a constant", () => {
    const values = new Set(
      Array.from({ length: 12 }, (_, i) => simulatedOnlineFloor(at(9) + i * 10 * MINUTE))
    );
    expect(values.size).toBeGreaterThan(1);
  });

  it("is quieter at 4am than in the evening", () => {
    // Averaged over a few buckets so a single jitter draw cannot flip it.
    const mean = (hour: number) =>
      [0, 10, 20, 30].reduce((sum, m) => sum + simulatedOnlineFloor(at(hour, m)), 0) / 4;
    expect(mean(4)).toBeLessThan(mean(21));
  });

  it("never returns a fractional count", () => {
    for (let h = 0; h < 24; h++) {
      expect(Number.isInteger(simulatedOnlineFloor(at(h)))).toBe(true);
    }
  });
});
