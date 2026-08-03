/**
 * What the flame in Góc yên tĩnh does when you set a worry down.
 *
 * It used to do nothing: `intensity` was the day's `warmth` and never moved
 * again, so the one gesture on the page - reading a reframe and pressing "đặt
 * xuống" - was answered by a struck-through line and a dot that floated up
 * past a flame which did not notice. The flame was scenery next to the only
 * thing the page asks you to do.
 *
 * Now it takes what you hand it: a flare on the moment, then a resting level
 * slightly higher than before, so by the end of a sitting the flame is
 * visibly carrying the work you did rather than burning at the same height it
 * started.
 *
 * Pure and separate from the component so the curve can be tested without a
 * DOM, and so the two properties that matter - it can never blow out, and it
 * can never gutter below where the day started - hold by construction rather
 * than by inspection.
 */

/** Bright enough to read as a flare, short of white-out. */
export const FLAME_CEILING = 0.95;

/** How much the resting level can ever rise above the day's warmth. */
const TOTAL_LIFT = 0.34;

/**
 * Diminishing returns per worry set down. The first one moves the flame most:
 * setting down the first worry is the moment the page is for, and a linear
 * ramp would make the fifth feel identical to the first while pushing the
 * flame to its ceiling for anyone who works through the whole list.
 */
const LIFT_DECAY = 0.55;

/** How high above the new resting level the flare reaches. */
const FLARE_HEIGHT = 0.3;

/** Milliseconds. Long enough to read as fire taking something, short enough
 *  not to hold the page. */
export const FLARE_MS = 1400;

/** Fraction of the flare spent rising. Fire catches fast and settles slow. */
const ATTACK = 0.18;

function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function easeOutCubic(t: number): number {
  const x = clamp01(t);
  return 1 - Math.pow(1 - x, 3);
}

/**
 * Where the flame settles after `setDownCount` worries have been set down.
 * Never below the day's warmth, never above the ceiling.
 */
export function restingIntensity(warmth: number, setDownCount: number): number {
  const base = clamp01(warmth);
  const n = Number.isFinite(setDownCount) ? Math.max(0, Math.floor(setDownCount)) : 0;
  const lift = TOTAL_LIFT * (1 - Math.pow(LIFT_DECAY, n));
  return Math.min(FLAME_CEILING, base + lift);
}

/**
 * The flame's intensity `t01` of the way through a flare that is carrying it
 * from `from` to `to`.
 *
 * Two segments rather than one curve: a fast rise to the peak, then a long
 * settle down onto the new resting level. A single symmetric ease reads as a
 * pulse - something blinking - instead of as fuel catching and burning down.
 */
export function flareIntensity(from: number, to: number, t01: number): number {
  const start = clamp01(from);
  const rest = clamp01(to);
  const peak = Math.min(FLAME_CEILING, rest + FLARE_HEIGHT);
  const t = clamp01(t01);

  if (t <= ATTACK) {
    return start + (peak - start) * easeOutCubic(t / ATTACK);
  }
  return peak + (rest - peak) * easeOutCubic((t - ATTACK) / (1 - ATTACK));
}

/**
 * The whole flare as a function of elapsed time, so the component only has to
 * feed it a clock.
 *
 * `prefersReducedMotion` skips straight to the resting level: the flare is
 * decoration on top of a state change, and the state change is the part that
 * carries the meaning.
 */
export function flameAt(
  warmth: number,
  setDownCount: number,
  elapsedMs: number,
  prefersReducedMotion = false
): number {
  const rest = restingIntensity(warmth, setDownCount);
  if (prefersReducedMotion || setDownCount <= 0) return rest;

  const previous = restingIntensity(warmth, setDownCount - 1);
  if (elapsedMs >= FLARE_MS) return rest;
  return flareIntensity(previous, rest, elapsedMs / FLARE_MS);
}
