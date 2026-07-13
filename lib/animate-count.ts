"use client";

// Counts a displayed number up from 0 to `target` with an ease-out curve -
// shared by every "live number" on the marketing pages (homepage hero,
// login page) so they all animate identically on mount.
export function animateCountTo(target: number, setValue: (n: number) => void, cancelledRef: { current: boolean }) {
  const durationMs = 700;
  const start = performance.now();
  const tick = (now: number) => {
    if (cancelledRef.current) return;
    const progress = Math.min(1, (now - start) / durationMs);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    setValue(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
