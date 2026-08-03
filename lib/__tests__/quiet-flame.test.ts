import { describe, expect, it } from "vitest";
import {
  FLAME_CEILING,
  FLARE_MS,
  flameAt,
  flareIntensity,
  restingIntensity,
} from "@/lib/quiet-flame";

describe("where the flame settles", () => {
  it("starts at the day's warmth when nothing has been set down", () => {
    for (const warmth of [0, 0.3, 0.5, 0.8, 1]) {
      expect(restingIntensity(warmth, 0)).toBeCloseTo(Math.min(FLAME_CEILING, warmth), 5);
    }
  });

  it("rises with each worry set down", () => {
    let previous = restingIntensity(0.5, 0);
    for (let n = 1; n <= 6; n += 1) {
      const next = restingIntensity(0.5, n);
      expect(next).toBeGreaterThan(previous);
      previous = next;
    }
  });

  it("gives the first worry the largest step", () => {
    // The first one is the moment the page exists for. A linear ramp would
    // make the fifth feel the same as the first and push the flame to its
    // ceiling for anyone who works the whole list.
    const steps = [1, 2, 3, 4, 5].map((n) => restingIntensity(0.5, n) - restingIntensity(0.5, n - 1));
    for (let i = 1; i < steps.length; i += 1) {
      expect(steps[i]).toBeLessThan(steps[i - 1]);
    }
  });

  it("never blows out, however many are set down", () => {
    // The flame is drawn from this number: past 1 the gradients clip to white
    // and it stops looking like fire.
    expect(restingIntensity(0.95, 500)).toBeLessThanOrEqual(FLAME_CEILING);
    expect(restingIntensity(1, 500)).toBeLessThanOrEqual(FLAME_CEILING);
  });

  it("never gutters below where the day started", () => {
    for (const warmth of [0.1, 0.5, 0.9]) {
      for (const n of [0, 1, 5, 20]) {
        expect(restingIntensity(warmth, n)).toBeGreaterThanOrEqual(Math.min(warmth, FLAME_CEILING));
      }
    }
  });

  it("survives nonsense counts rather than producing NaN", () => {
    // A NaN reaches the gradients as `rgba(..., NaN)`, which browsers drop -
    // the flame would vanish rather than degrade.
    for (const n of [-3, 2.7, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(Number.isFinite(restingIntensity(0.5, n))).toBe(true);
    }
  });
});

describe("the flare itself", () => {
  it("rises above the level it settles at", () => {
    const rest = restingIntensity(0.5, 1);
    const peak = Math.max(...Array.from({ length: 60 }, (_, i) => flareIntensity(0.5, rest, i / 59)));
    expect(peak).toBeGreaterThan(rest);
  });

  it("catches faster than it settles", () => {
    // Fire takes fuel quickly and burns down slowly. A symmetric curve reads
    // as something blinking rather than as something being consumed.
    const rest = restingIntensity(0.5, 1);
    const samples = Array.from({ length: 200 }, (_, i) => flareIntensity(0.5, rest, i / 199));
    const peakAt = samples.indexOf(Math.max(...samples)) / 199;
    expect(peakAt).toBeLessThan(0.35);
  });

  it("lands exactly on the resting level", () => {
    // Any gap here is a visible step at the end of the animation.
    const rest = restingIntensity(0.5, 2);
    expect(flareIntensity(0.4, rest, 1)).toBeCloseTo(rest, 6);
  });

  it("stays inside the ceiling even from a hot start", () => {
    for (let i = 0; i <= 40; i += 1) {
      expect(flareIntensity(0.95, 0.95, i / 40)).toBeLessThanOrEqual(FLAME_CEILING);
    }
  });

  it("clamps a time outside the flare instead of extrapolating", () => {
    const rest = restingIntensity(0.5, 1);
    expect(flareIntensity(0.5, rest, -2)).toBeCloseTo(0.5, 6);
    expect(flareIntensity(0.5, rest, 9)).toBeCloseTo(rest, 6);
  });
});

describe("the flame over a whole sitting", () => {
  it("does not move until something is set down", () => {
    expect(flameAt(0.5, 0, 0)).toBeCloseTo(0.5, 6);
    expect(flameAt(0.5, 0, 99_999)).toBeCloseTo(0.5, 6);
  });

  it("is brighter right after a set-down than once it settles", () => {
    const justAfter = flameAt(0.5, 1, FLARE_MS * 0.2);
    const settled = flameAt(0.5, 1, FLARE_MS);
    expect(justAfter).toBeGreaterThan(settled);
  });

  it("holds the higher resting level after the flare is over", () => {
    // The point of the gesture is that the flame keeps what you gave it. If
    // it fell back to the day's warmth, setting a worry down would leave no
    // trace at all - which is where this started.
    expect(flameAt(0.5, 1, FLARE_MS + 10_000)).toBeGreaterThan(flameAt(0.5, 0, 0));
  });

  it("skips the flare under reduced motion but keeps the level", () => {
    const reduced = flameAt(0.5, 1, FLARE_MS * 0.2, true);
    expect(reduced).toBeCloseTo(restingIntensity(0.5, 1), 6);
    expect(reduced).toBeGreaterThan(flameAt(0.5, 0, 0, true));
  });
});
