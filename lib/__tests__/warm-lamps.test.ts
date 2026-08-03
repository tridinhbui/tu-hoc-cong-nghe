import { describe, expect, it } from "vitest";
import {
  DEFAULT_LAMP_STATE,
  LAMP_RADII,
  MAX_INTENSITY,
  MAX_LAMPS,
  MIN_INTENSITY,
  addLamp,
  clampFraction,
  clampIntensity,
  cycleSize,
  defaultLamp,
  bloomGradient,
  bloomSizeVmax,
  maskSizeVmax,
  scrimAlpha,
  moveLamp,
  parseLampState,
  removeLamp,
  resizeLamp,
  type LampState,
} from "@/lib/warm-lamps";

function stateWith(count: number): LampState {
  let state = DEFAULT_LAMP_STATE;
  for (let i = 0; i < count; i += 1) state = addLamp(state, `lamp-${i}`);
  return state;
}

describe("lamp placement", () => {
  it("keeps a lamp inside the viewport whatever the pointer reports", () => {
    // Pointer capture keeps delivering events after the pointer leaves the
    // window, so clientX/clientY go negative or past innerWidth routinely. A
    // lamp dragged off the edge would be lost: the glow is invisible and the
    // handle is unreachable.
    expect(clampFraction(-0.4)).toBe(0);
    expect(clampFraction(1.9)).toBe(1);
    expect(clampFraction(0.42)).toBe(0.42);
  });

  it("falls back to centre rather than NaN", () => {
    // clientX / innerWidth is NaN if innerWidth is 0, which happens in a
    // hidden iframe. `left: NaN%` drops the lamp out of the layout entirely.
    expect(clampFraction(Number.NaN)).toBe(0.5);
    expect(clampFraction(Number.POSITIVE_INFINITY)).toBe(1);
  });

  it("does not stack two new lamps on the same spot", () => {
    const state = stateWith(3);
    const spots = new Set(state.lamps.map((lamp) => `${lamp.x},${lamp.y}`));
    expect(spots.size).toBe(3);
  });

  it("stores position as a fraction, so a resize cannot strand a lamp", () => {
    const state = moveLamp(stateWith(1), stateWith(1).lamps[0].id, 0.8, 0.3);
    for (const lamp of state.lamps) {
      expect(lamp.x).toBeGreaterThanOrEqual(0);
      expect(lamp.x).toBeLessThanOrEqual(1);
    }
  });
});

describe("adding and removing", () => {
  it("stops at MAX_LAMPS instead of growing without bound", () => {
    const state = addLamp(stateWith(MAX_LAMPS), "one-too-many");
    expect(state.lamps).toHaveLength(MAX_LAMPS);
  });

  it("turns the layer on when the first lamp is added", () => {
    expect(addLamp(DEFAULT_LAMP_STATE, "a").on).toBe(true);
  });

  it("turns the layer off when the last lamp is removed", () => {
    // Otherwise the button keeps its lit styling over a page with no light on
    // it, and pressing it appears to do nothing.
    const one = addLamp(DEFAULT_LAMP_STATE, "a");
    expect(removeLamp(one, "a").on).toBe(false);
  });

  it("leaves the layer on while other lamps remain", () => {
    const two = stateWith(2);
    expect(removeLamp(two, two.lamps[0].id).on).toBe(true);
  });
});

describe("size cycling", () => {
  it("wraps through every radius and returns to the start", () => {
    const seen: number[] = [];
    let size = 0;
    for (let i = 0; i < LAMP_RADII.length; i += 1) {
      seen.push(size);
      size = cycleSize(size);
    }
    expect(new Set(seen).size).toBe(LAMP_RADII.length);
    expect(size).toBe(0);
  });

  it("cycles only the lamp that was tapped", () => {
    const two = stateWith(2);
    const next = resizeLamp(two, two.lamps[0].id);
    expect(next.lamps[0].size).not.toBe(two.lamps[0].size);
    expect(next.lamps[1].size).toBe(two.lamps[1].size);
  });
});

describe("the light itself", () => {
  const alphasOf = (css: string) =>
    [...css.matchAll(/rgba\([^)]*?,\s*([\d.]+)\)/g)].map((m) => Number(m[1]));

  it("fades monotonically outward", () => {
    // A stop that gets brighter further from the source reads as a ring, not
    // as light. This has to hold at every intensity.
    const alphas = alphasOf(bloomGradient(0.6));
    expect(alphas.length).toBeGreaterThan(4);
    for (let i = 1; i < alphas.length; i += 1) {
      expect(alphas[i]).toBeLessThanOrEqual(alphas[i - 1]);
    }
  });

  it("reaches fully transparent at the edge", () => {
    // Any alpha left at the last stop draws a visible disc boundary, which is
    // the difference between a lamp and a sticker.
    const alphas = alphasOf(bloomGradient(MAX_INTENSITY));
    expect(alphas[alphas.length - 1]).toBe(0);
  });

  it("scales the filament with intensity", () => {
    expect(alphasOf(bloomGradient(MAX_INTENSITY))[0]).toBeGreaterThan(alphasOf(bloomGradient(MIN_INTENSITY))[0]);
  });

  it("keeps the page legible outside the pool at every setting", () => {
    // The scrim is what dims the rest of the app. Fully opaque would hide the
    // interface rather than draw the eye to one part of it.
    for (const i of [MIN_INTENSITY, 0.5, MAX_INTENSITY, 99, -5]) {
      expect(scrimAlpha(i)).toBeLessThan(0.9);
      expect(scrimAlpha(i)).toBeGreaterThan(0);
    }
  });

  it("darkens the surroundings more as the lamp gets stronger", () => {
    expect(scrimAlpha(MAX_INTENSITY)).toBeGreaterThan(scrimAlpha(MIN_INTENSITY));
  });

  it("keeps the filament inside the clear middle of the pool", () => {
    // The bloom blends in `screen`, which costs contrast for any text under
    // it. Staying inside the mask's transparent plateau (0.6x the radius, per
    // maskSizeVmax) is what keeps body text out of it.
    for (let size = 0; size < LAMP_RADII.length; size += 1) {
      const plateauRadius = (maskSizeVmax(size) / 2) * 0.3;
      expect(bloomSizeVmax(size) / 2).toBeLessThanOrEqual(plateauRadius);
    }
  });

  it("grows the hole with the lamp size", () => {
    expect(maskSizeVmax(2)).toBeGreaterThan(maskSizeVmax(1));
    expect(maskSizeVmax(1)).toBeGreaterThan(maskSizeVmax(0));
  });
});

describe("restoring what was saved", () => {
  it("survives a corrupt or empty value", () => {
    expect(parseLampState(null)).toEqual(DEFAULT_LAMP_STATE);
    expect(parseLampState("not json")).toEqual(DEFAULT_LAMP_STATE);
    expect(parseLampState("[1,2,3]")).toEqual(DEFAULT_LAMP_STATE);
  });

  it("drops lamp entries that are the wrong shape", () => {
    const raw = JSON.stringify({ on: true, intensity: 0.5, lamps: [{ id: "a", x: 0.2, y: 0.2, size: 1 }, { id: 5 }, null] });
    expect(parseLampState(raw).lamps).toHaveLength(1);
  });

  it("re-clamps values that were stored out of range", () => {
    const raw = JSON.stringify({ on: true, intensity: 99, lamps: [{ id: "a", x: -3, y: 8, size: 40 }] });
    const state = parseLampState(raw);
    expect(state.intensity).toBe(MAX_INTENSITY);
    expect(state.lamps[0]).toMatchObject({ x: 0, y: 1, size: LAMP_RADII.length - 1 });
  });

  it("refuses to restore 'on' with no lamps to light", () => {
    expect(parseLampState(JSON.stringify({ on: true, intensity: 0.5, lamps: [] })).on).toBe(false);
  });

  it("caps a stored list that grew past the limit", () => {
    const lamps = Array.from({ length: 9 }, (_, i) => defaultLamp(i, `l${i}`));
    expect(parseLampState(JSON.stringify({ on: true, intensity: 0.5, lamps })).lamps).toHaveLength(MAX_LAMPS);
  });
});
