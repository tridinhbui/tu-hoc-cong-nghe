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
 *
 * HOW THE LIGHT IS DRAWN, and why it is not the obvious way.
 *
 * The obvious way is a warm radial gradient blended with `screen` - add light
 * on top of the dark page. Built that way first, and it is wrong, visibly so:
 * `screen` lifts near-black background fast and near-white text barely at all,
 * so text INSIDE the pool loses contrast against its own background. The lamp
 * made the page harder to read exactly where it was pointed, which is the one
 * thing a reading lamp must not do.
 *
 * So the light is drawn as a lamp in a dark room actually behaves: the pool
 * keeps the page's own full contrast, and everything outside it recedes under
 * a warm scrim. Two layers:
 *
 *   1. SCRIM - a warm near-black sheet over the page, masked so it is
 *      transparent at each lamp. Text under a lamp is untouched; text far
 *      from one dims. Multiple lamps punch multiple holes via
 *      `mask-composite: intersect`, which multiplies the mask alphas, so a
 *      hole from any one lamp survives the others.
 *   2. BLOOM - a small warm halo at the source, blended `screen`. This one is
 *      additive on purpose and stays small: it is the visible filament, the
 *      thing that says a lamp is switched on rather than a hole cut in a
 *      sheet. Small enough that no body text sits inside it.
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
 * Pool radius in `vmax` units - sized against the larger viewport axis so a
 * lamp covers a similar share of the screen in portrait and landscape.
 *
 * The smallest is a task light, roughly a paragraph. The largest washes a
 * whole column without reaching the edges, because a pool that touches every
 * edge means nothing is left in shadow and the lamp stops reading as a lamp.
 */
export const LAMP_RADII = [22, 36, 55] as const;

export const LAMP_SIZE_LABELS = ["Đèn đọc", "Đèn bàn", "Đèn phòng"] as const;

/** Three is where the metaphor breaks: past that it is stage lighting. */
export const MAX_LAMPS = 3;

export const MIN_INTENSITY = 0.2;
export const MAX_INTENSITY = 1;
export const DEFAULT_INTENSITY = 0.55;

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
    { x: 0.5, y: 0.32 },
    { x: 0.26, y: 0.62 },
    { x: 0.74, y: 0.64 },
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
  // Keeping `on: true` with nothing lit would leave the button wearing its lit
  // styling over a page with no light on it, and pressing it appears to do
  // nothing.
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

// --- how the light is drawn -------------------------------------------------

/**
 * How opaque the warm scrim gets at full distance from every lamp. Capped
 * below 1 so the page is always still legible outside the pool - the lamp is
 * meant to draw the eye somewhere, not to hide the rest of the interface.
 */
export function scrimAlpha(intensity: number): number {
  return Math.min(0.88, 0.38 + 0.68 * clampIntensity(intensity));
}

/** Deep and warm rather than neutral black, so shadow reads as lamplight. */
export function scrimColor(intensity: number): string {
  return `rgba(10, 6, 2, ${scrimAlpha(intensity).toFixed(3)})`;
}

/**
 * The mask that punches this lamp's hole in the scrim: fully transparent at
 * the middle, fully opaque at the rim.
 *
 * The plateau of transparency out to 30% matters. Without it the scrim starts
 * darkening from the very centre, and a lamp with no flat middle reads as a
 * smudge rather than as a pool with an edge somewhere.
 */
export const SCRIM_MASK =
  "radial-gradient(circle closest-side, transparent 0%, transparent 30%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.72) 76%, rgba(0,0,0,0.94) 100%)";

/**
 * Mask box size for a lamp, in vmax. The mask's transparent plateau ends at
 * 30% of the box's half-size, so a box of 4× the radius puts the clear middle
 * at 0.6× the radius and the full falloff at 2× it.
 */
export function maskSizeVmax(size: number): number {
  return LAMP_RADII[clampSize(size)] * 4;
}

/** The visible filament. Small, warm, and additive. */
export function bloomGradient(intensity: number): string {
  const a = clampIntensity(intensity);
  const stops: Array<[string, number, number]> = [
    ["255, 226, 186", 0.5, 0],
    ["255, 208, 150", 0.28, 24],
    ["255, 184, 112", 0.13, 46],
    ["255, 162, 80", 0.05, 68],
    ["255, 146, 66", 0.01, 85],
    ["255, 140, 60", 0, 100],
  ];
  const body = stops
    .map(([rgb, alpha, pos]) => `rgba(${rgb}, ${(alpha * a).toFixed(3)}) ${pos}%`)
    .join(", ");
  return `radial-gradient(circle closest-side, ${body})`;
}

/** Bloom stays inside the clear middle of the pool, so no body text sits in it. */
export function bloomSizeVmax(size: number): number {
  return LAMP_RADII[clampSize(size)] * 0.95;
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
