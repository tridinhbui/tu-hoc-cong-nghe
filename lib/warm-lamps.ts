/**
 * Đèn ấm - warm reading lamps the learner can place anywhere in dark mode.
 *
 * Everything here is pure so the geometry and the falloff can be tested
 * without a DOM; components/WarmLamps.tsx owns the pointer handling and the
 * rendering.
 *
 * Positions are stored as FRACTIONS of the viewport (0 → 1), not pixels.
 * The floating chat bubbles store a pixel offset and needed a whole
 * clamp-on-resize path to stop a position recorded on a 1920px desktop from
 * stranding the widget off a 393px phone (see lib/hooks/useDraggablePosition.ts).
 * A lamp has no such problem to solve: "a third of the way across, near the
 * top" means the same thing on both screens, so the same placement survives a
 * rotation or a window resize with no correction at all.
 */

export interface Lamp {
  id: string;
  /** 0 → 1 across the viewport width. */
  x: number;
  /** 0 → 1 down the viewport height. */
  y: number;
  /** Index into LAMP_RADII. */
  size: number;
}

/**
 * Radius in `vmax` units. Sized against the larger viewport axis so a lamp
 * covers a similar share of the screen in portrait and landscape.
 *
 * The smallest is a task light - roughly a paragraph. The largest washes a
 * whole column without reaching the edges, because a glow that touches every
 * edge stops reading as a lamp and starts reading as a colour filter over the
 * page.
 */
export const LAMP_RADII = [22, 36, 55] as const;

export const LAMP_SIZE_LABELS = ["Đèn đọc", "Đèn bàn", "Đèn phòng"] as const;

/** Three is where the metaphor breaks: past that it is stage lighting. */
export const MAX_LAMPS = 3;

export const MIN_INTENSITY = 0.2;
/**
 * Capped well below 1. These lamps blend in `screen`, which lifts the dark
 * background faster than it lifts already-light text, so text *inside* a very
 * bright lamp loses contrast rather than gaining it. The cap keeps the
 * brightest setting on the useful side of that curve.
 */
export const MAX_INTENSITY = 0.85;
export const DEFAULT_INTENSITY = 0.5;

export const LAMPS_STORAGE_KEY = "thtcdn:warm-lamps";

export interface LampState {
  on: boolean;
  intensity: number;
  lamps: Lamp[];
}

export const DEFAULT_LAMP_STATE: LampState = { on: false, intensity: DEFAULT_INTENSITY, lamps: [] };

export function clampFraction(value: number): number {
  // Only NaN needs the fallback. An infinity means the pointer was reported
  // absurdly far past an edge, and Math.min/max already resolve that to the
  // edge itself - which is where the learner was dragging.
  if (Number.isNaN(value)) return 0.5;
  return Math.min(1, Math.max(0, value));
}

export function clampIntensity(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_INTENSITY;
  return Math.min(MAX_INTENSITY, Math.max(MIN_INTENSITY, value));
}

export function clampSize(value: number): number {
  if (!Number.isInteger(value)) return 1;
  return Math.min(LAMP_RADII.length - 1, Math.max(0, value));
}

/** Next size in the cycle, wrapping - the handle is a tap target, not a menu. */
export function cycleSize(size: number): number {
  return (clampSize(size) + 1) % LAMP_RADII.length;
}

/**
 * Where a newly added lamp lands. Staggered rather than centred: two lamps
 * dropped on the same spot look like one lamp that failed to appear, and the
 * learner has no reason to suspect they need to drag one off the other.
 */
export function defaultLamp(index: number, id: string): Lamp {
  const slots = [
    { x: 0.5, y: 0.28 },
    { x: 0.26, y: 0.6 },
    { x: 0.74, y: 0.62 },
  ];
  const slot = slots[index % slots.length];
  return { id, x: slot.x, y: slot.y, size: 1 };
}

export function addLamp(state: LampState, id: string): LampState {
  if (state.lamps.length >= MAX_LAMPS) return state;
  return { ...state, on: true, lamps: [...state.lamps, defaultLamp(state.lamps.length, id)] };
}

export function removeLamp(state: LampState, id: string): LampState {
  const lamps = state.lamps.filter((lamp) => lamp.id !== id);
  // Turning the layer off when the last lamp goes leaves the button in the
  // state its icon claims; keeping `on: true` with nothing lit would show a
  // lit button over an unlit page.
  return { ...state, on: lamps.length > 0 && state.on, lamps };
}

export function moveLamp(state: LampState, id: string, x: number, y: number): LampState {
  return {
    ...state,
    lamps: state.lamps.map((lamp) =>
      lamp.id === id ? { ...lamp, x: clampFraction(x), y: clampFraction(y) } : lamp
    ),
  };
}

export function resizeLamp(state: LampState, id: string): LampState {
  return {
    ...state,
    lamps: state.lamps.map((lamp) => (lamp.id === id ? { ...lamp, size: cycleSize(lamp.size) } : lamp)),
  };
}

/**
 * Tungsten, near 2700K, and warmer toward the edge of the pool.
 *
 * Real filament light is not one colour: the falloff runs slightly redder as
 * it fades, because the eye's blue sensitivity drops off first at low
 * luminance. Holding a single hue across every stop is the thing that makes a
 * CSS glow read as a sticker rather than as light, so each stop shifts a
 * little further toward amber as it dims.
 *
 * The alpha stops approximate inverse-square falloff rather than the linear
 * ramp a two-stop gradient gives: bright and tight in the middle, then a long
 * faint tail. The tail is most of what sells it - light with a hard edge is a
 * spotlight, and a spotlight is not cosy.
 */
export function lampGradient(intensity: number): string {
  const a = clampIntensity(intensity);
  const stops: Array<[string, number, number]> = [
    ["255, 214, 164", 0.95, 0],
    ["255, 199, 138", 0.62, 12],
    ["255, 184, 112", 0.38, 26],
    ["255, 168, 90", 0.2, 42],
    ["255, 152, 72", 0.09, 60],
    ["255, 140, 60", 0.03, 78],
    ["255, 134, 54", 0, 100],
  ];
  const body = stops
    .map(([rgb, alpha, pos]) => `rgba(${rgb}, ${(alpha * a).toFixed(3)}) ${pos}%`)
    .join(", ");
  return `radial-gradient(circle closest-side, ${body})`;
}

export function isValidLamp(value: unknown): value is Lamp {
  if (typeof value !== "object" || value === null) return false;
  const lamp = value as Record<string, unknown>;
  return (
    typeof lamp.id === "string" &&
    typeof lamp.x === "number" &&
    typeof lamp.y === "number" &&
    typeof lamp.size === "number"
  );
}

/**
 * Anything unparseable falls back to "no lamps" rather than throwing. A
 * corrupt value here should cost the learner a lamp placement, not the page.
 */
export function parseLampState(raw: string | null): LampState {
  if (!raw) return DEFAULT_LAMP_STATE;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return DEFAULT_LAMP_STATE;
    const value = parsed as Record<string, unknown>;
    const lamps = Array.isArray(value.lamps)
      ? value.lamps.filter(isValidLamp).slice(0, MAX_LAMPS).map((lamp) => ({
          ...lamp,
          x: clampFraction(lamp.x),
          y: clampFraction(lamp.y),
          size: clampSize(lamp.size),
        }))
      : [];
    return {
      on: value.on === true && lamps.length > 0,
      intensity: clampIntensity(typeof value.intensity === "number" ? value.intensity : DEFAULT_INTENSITY),
      lamps,
    };
  } catch {
    return DEFAULT_LAMP_STATE;
  }
}
