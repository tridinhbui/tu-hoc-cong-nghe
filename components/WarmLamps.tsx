"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { Lightbulb, Plus, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import {
  DEFAULT_LAMP_STATE,
  LAMPS_STORAGE_KEY,
  LAMP_SIZE_LABELS,
  MAX_INTENSITY,
  MAX_LAMPS,
  MIN_INTENSITY,
  SCRIM_MASK,
  addLamp,
  bloomGradient,
  bloomSizeVmax,
  clampIntensity,
  maskSizeVmax,
  moveLamp,
  parseLampState,
  removeLamp,
  resizeLamp,
  scrimColor,
  type LampState,
} from "@/lib/warm-lamps";

/**
 * Đèn ấm - warm lamps the learner places wherever they are reading.
 *
 * Dark mode only, and that is the point rather than a limitation: on a white
 * page there is nothing to light. See lib/warm-lamps.ts for why the light is
 * drawn as a scrim with holes rather than as a glow laid on top - the short
 * version is that the obvious `screen` glow makes text harder to read exactly
 * where you aim it.
 *
 * The layers sit at z-35/36, below the navbar at z-50. Chrome stays at full
 * brightness while the page around the lamp dims, which is what keeps the
 * effect from feeling like the app has gone dim rather than cosy.
 */

// --- theme subscription -----------------------------------------------------
//
// The `dark` class is written by an inline script before hydration and toggled
// later from three places (ThemeToggle, settings, the lesson reader).
// useSyncExternalStore is the one read that is correct in all of them: false
// during SSR, matching whatever the pre-hydration script decided on the first
// client render, and re-rendering when any of those call sites flips the class
// - without a setState inside an effect, which this repo's React Compiler lint
// rejects outright.

function subscribeToTheme(onChange: () => void): () => void {
  if (typeof MutationObserver === "undefined") return () => {};
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function isDarkNow(): boolean {
  return document.documentElement.classList.contains("dark");
}

function isDarkOnServer(): boolean {
  return false;
}

function useIsDark(): boolean {
  return useSyncExternalStore(subscribeToTheme, isDarkNow, isDarkOnServer);
}

// --- state ------------------------------------------------------------------

function readStoredState(): LampState {
  if (typeof window === "undefined") return DEFAULT_LAMP_STATE;
  try {
    return parseLampState(localStorage.getItem(LAMPS_STORAGE_KEY));
  } catch {
    return DEFAULT_LAMP_STATE;
  }
}

function persist(state: LampState) {
  try {
    localStorage.setItem(LAMPS_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage unavailable (private mode quota) - lamps just won't persist
  }
}

let lampCounter = 0;
function nextLampId(): string {
  lampCounter += 1;
  return `lamp-${lampCounter}`;
}

export default function WarmLamps() {
  const { t } = useI18n();
  const isDark = useIsDark();
  // Read synchronously so a learner who left two lamps on does not watch the
  // room brighten for a frame before they come back.
  const [state, setState] = useState<LampState>(readStoredState);
  const [panelOpen, setPanelOpen] = useState(false);
  const draggingRef = useRef<string | null>(null);
  const movedRef = useRef(false);

  const commit = useCallback((next: LampState) => {
    setState(next);
    persist(next);
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault();
    draggingRef.current = id;
    movedRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLButtonElement>, id: string) => {
    if (draggingRef.current !== id) return;
    movedRef.current = true;
    setState((current) =>
      moveLamp(current, id, event.clientX / window.innerWidth, event.clientY / window.innerHeight)
    );
  }, []);

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLButtonElement>, id: string) => {
    if (draggingRef.current !== id) return;
    draggingRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setState((current) => {
      // A press that never moved cycles the size; a drag just keeps where it
      // was let go. One handle, two gestures, no extra chrome over the page.
      const next = movedRef.current ? current : resizeLamp(current, id);
      persist(next);
      return next;
    });
  }, []);

  // Nothing to light on a white page.
  if (!isDark) return null;

  const lit = state.on && state.lamps.length > 0;

  return (
    <>
      {lit && (
        <>
          {/*
            The scrim. One element, one hole per lamp, composited with
            `intersect` so the mask alphas multiply - a hole belonging to any
            lamp survives every other lamp's mask. Stacking one scrim per lamp
            instead would darken the overlaps, which is backwards.
          */}
          <div
            className="fixed inset-0 z-[35] pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundColor: scrimColor(state.intensity),
              maskImage: state.lamps.map(() => SCRIM_MASK).join(", "),
              WebkitMaskImage: state.lamps.map(() => SCRIM_MASK).join(", "),
              maskPosition: state.lamps.map((l) => `${l.x * 100}% ${l.y * 100}%`).join(", "),
              WebkitMaskPosition: state.lamps.map((l) => `${l.x * 100}% ${l.y * 100}%`).join(", "),
              maskSize: state.lamps.map((l) => `${maskSizeVmax(l.size)}vmax ${maskSizeVmax(l.size)}vmax`).join(", "),
              WebkitMaskSize: state.lamps
                .map((l) => `${maskSizeVmax(l.size)}vmax ${maskSizeVmax(l.size)}vmax`)
                .join(", "),
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />

          {/* The filaments. */}
          <div className="fixed inset-0 z-[35] pointer-events-none" aria-hidden="true">
            {state.lamps.map((lamp) => (
              <div
                key={lamp.id}
                className="absolute rounded-full"
                style={{
                  left: `${lamp.x * 100}%`,
                  top: `${lamp.y * 100}%`,
                  width: `${bloomSizeVmax(lamp.size)}vmax`,
                  height: `${bloomSizeVmax(lamp.size)}vmax`,
                  transform: "translate(-50%, -50%)",
                  backgroundImage: bloomGradient(state.intensity),
                  mixBlendMode: "screen",
                }}
              />
            ))}
          </div>

          {/* Handles, above the light so the source is grabbable. Real buttons:
              keyboard-reachable, and they say what they do. */}
          <div className="fixed inset-0 z-[36] pointer-events-none">
            {state.lamps.map((lamp) => (
              <div
                key={lamp.id}
                className="absolute pointer-events-auto"
                style={{ left: `${lamp.x * 100}%`, top: `${lamp.y * 100}%`, transform: "translate(-50%, -50%)" }}
              >
                <button
                  type="button"
                  onPointerDown={(event) => handlePointerDown(event, lamp.id)}
                  onPointerMove={(event) => handlePointerMove(event, lamp.id)}
                  onPointerUp={(event) => handlePointerUp(event, lamp.id)}
                  onKeyDown={(event) => {
                    const step = 0.02;
                    if (event.key === "ArrowLeft") commit(moveLamp(state, lamp.id, lamp.x - step, lamp.y));
                    else if (event.key === "ArrowRight") commit(moveLamp(state, lamp.id, lamp.x + step, lamp.y));
                    else if (event.key === "ArrowUp") commit(moveLamp(state, lamp.id, lamp.x, lamp.y - step));
                    else if (event.key === "ArrowDown") commit(moveLamp(state, lamp.id, lamp.x, lamp.y + step));
                    else return;
                    event.preventDefault();
                  }}
                  title={format(t.warmLamps.lampTitle, { size: LAMP_SIZE_LABELS[lamp.size] })}
                  aria-label={format(t.warmLamps.lampAria, { size: LAMP_SIZE_LABELS[lamp.size] })}
                  className="group grid h-7 w-7 cursor-grab touch-none place-items-center rounded-full transition active:cursor-grabbing"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,214,166,0.8) 0%, rgba(255,182,104,0.22) 55%, transparent 72%)",
                  }}
                >
                  <span className="h-2 w-2 rounded-full bg-amber-200/90 shadow-[0_0_10px_3px_rgba(255,190,120,0.7)] transition group-hover:h-2.5 group-hover:w-2.5" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Control. Bottom-LEFT: the chatbot, the admin chat and the study-group
          bubble already share the bottom-right corner. */}
      <div className="fixed bottom-4 left-4 z-[37] flex flex-col items-start gap-2 lg:left-[17.5rem]">
        {panelOpen && (
          <div className="w-60 rounded-2xl border border-stone-800 bg-stone-950/95 p-3.5 shadow-2xl backdrop-blur">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-amber-200/80">{t.warmLamps.title}</span>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label={t.warmLamps.close}
                className="rounded-lg p-1 text-stone-500 transition hover:bg-stone-900 hover:text-stone-300"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <label className="block text-[11px] font-semibold text-stone-400" htmlFor="warm-lamp-intensity">
              {t.warmLamps.intensity}
            </label>
            <input
              id="warm-lamp-intensity"
              type="range"
              min={MIN_INTENSITY}
              max={MAX_INTENSITY}
              step={0.05}
              value={state.intensity}
              onChange={(event) => commit({ ...state, intensity: clampIntensity(Number(event.target.value)) })}
              className="mt-1.5 w-full accent-amber-400"
            />

            <div className="mt-3 flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => commit(addLamp(state, nextLampId()))}
                disabled={state.lamps.length >= MAX_LAMPS}
                className="inline-flex items-center gap-1 rounded-xl border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 text-[11px] font-bold text-amber-200 transition hover:bg-amber-500/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="h-3 w-3" /> {t.warmLamps.addLamp}
              </button>
              {state.lamps.map((lamp, index) => (
                <button
                  key={lamp.id}
                  type="button"
                  onClick={() => commit(removeLamp(state, lamp.id))}
                  className="inline-flex items-center gap-1 rounded-xl border border-stone-800 px-2.5 py-1.5 text-[11px] font-semibold text-stone-400 transition hover:border-stone-700 hover:text-stone-200"
                >
                  <X className="h-3 w-3" /> {t.warmLamps.lamp} {index + 1}
                </button>
              ))}
            </div>

            <p className="mt-2.5 text-[11px] leading-relaxed text-stone-500">
              {t.warmLamps.hint}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            // The first press has to light something. Flipping `on` with an
            // empty list would light nothing and read as a dead button.
            if (state.lamps.length === 0) commit(addLamp(state, nextLampId()));
            else commit({ ...state, on: !state.on });
            setPanelOpen(true);
          }}
          aria-pressed={lit}
          aria-label={lit ? t.warmLamps.turnOff : t.warmLamps.turnOn}
          title={lit ? t.warmLamps.turnOff : t.warmLamps.turnOn}
          className={`grid h-11 w-11 place-items-center rounded-full border shadow-lg transition ${
            lit
              ? "border-amber-400/40 bg-amber-500/20 text-amber-200 shadow-[0_0_20px_rgba(255,180,90,0.35)]"
              : "border-stone-800 bg-stone-950/90 text-stone-500 hover:text-stone-300"
          }`}
        >
          <Lightbulb className="h-5 w-5" />
        </button>
      </div>
    </>
  );
}
