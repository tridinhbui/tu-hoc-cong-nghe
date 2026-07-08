"use client";

import { useEffect, useRef, useState } from "react";
import { hasSeenTour, markTourSeen } from "@/lib/tour-flags";

export interface TourStep {
  selector: string;
  title: string;
  text: string;
}

const VIEWPORT_MARGIN = 16;
const MAX_TOOLTIP_WIDTH = 384; // matches max-w-sm

interface Props {
  steps: TourStep[];
  storageKey: string;
  /** Signed-in user id, if any - enables the server-persisted "seen" flag so
   *  the tour truly plays once per account, not once per browser. */
  userId?: string | null;
  /** Key inside user_profiles.tour_flags for this specific tour, e.g. "dashboard". */
  remoteKey?: string;
}

// Generic one-time spotlight walkthrough: dims the whole screen except the
// current step's target element (via a box-shadow "cutout"), with a tooltip
// describing why that element matters. Shared by the dashboard tour and the
// lesson-page tour so the mobile positioning/scroll/bfcache fixes only live
// in one place.
//
// "Seen" is tracked in two layers: localStorage for an instant, no-network
// check on every page load, and (when userId+remoteKey are given) a
// server-persisted flag on the account itself. localStorage alone means a
// different device/browser - or even the same browser if localStorage gets
// evicted, which iOS Safari does fairly aggressively - never learns the tour
// was already seen, so it can resurface on almost every login. The server
// flag is the actual source of truth; localStorage just avoids a network
// round trip on the common case where it's already known to be seen.
export default function SpotlightTour({ steps, storageKey, userId, remoteKey }: Props) {
  const [stepIndex, setStepIndex] = useState(-1);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const markedRemote = useRef(false);

  function markSeen() {
    window.localStorage.setItem(storageKey, "1");
    if (userId && remoteKey && !markedRemote.current) {
      markedRemote.current = true;
      markTourSeen(userId, remoteKey).catch(() => {});
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(storageKey)) return;

    let cancelled = false;
    let startTimer: ReturnType<typeof setTimeout> | null = null;

    async function decide() {
      if (userId && remoteKey) {
        try {
          if (await hasSeenTour(userId, remoteKey)) {
            // Already seen on another device/session for this account -
            // cache locally so we skip the network check next load too.
            window.localStorage.setItem(storageKey, "1");
            return;
          }
        } catch {
          // Fall through and show the tour anyway - better to show it once
          // more than to silently never show it due to a transient error.
        }
      }
      if (cancelled) return;
      // Give the page a tick to finish its first render/layout before we
      // start measuring element positions.
      startTimer = setTimeout(() => {
        if (cancelled) return;
        // Mark as seen the moment the tour actually starts, not only when
        // the learner clicks through to the end - otherwise navigating away
        // mid-tour leaves the flag unset and it plays again in full next time.
        markSeen();
        setStepIndex(0);
      }, 500);
    }

    decide();
    return () => {
      cancelled = true;
      if (startTimer) clearTimeout(startTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, userId, remoteKey]);

  // The browser can restore this exact page (including this component's
  // still-mid-tour React state) straight from the back/forward cache when
  // the learner hits the Back button, instead of re-mounting it - so the
  // localStorage check above never re-runs, and a tour that was left open
  // reappears exactly where it was frozen. `pageshow` fires on every such
  // restore (event.persisted is true for a bfcache hit); force the tour
  // closed there whenever it's already been marked seen.
  useEffect(() => {
    function onPageShow(e: PageTransitionEvent) {
      if (e.persisted && window.localStorage.getItem(storageKey)) {
        setStepIndex(steps.length);
      }
    }
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    if (stepIndex < 0 || stepIndex >= steps.length) return;

    let settleTimer: ReturnType<typeof setTimeout> | null = null;
    let currentEl: Element | null = null;

    // Re-measure on scroll too (not just resize) instead of locking page
    // scroll entirely. An earlier version locked scroll with
    // `overflow: hidden` on <body>, which iOS Safari does not honor
    // reliably - toggling it while the layout viewport was mid-recalculation
    // (right as scrollIntoView animates) left the whole page rendered
    // zoomed-out with grey letterboxing. Tracking the target live as the
    // learner scrolls is simpler and has no such failure mode.
    function trackScroll() {
      if (!currentEl) return;
      setRect(currentEl.getBoundingClientRect());
    }

    function measure() {
      // Some steps have more than one element matching the selector (e.g. a
      // desktop-only vs mobile-only version of the same control). A
      // `display: none` element is still in the DOM and still matches
      // querySelector, but getBoundingClientRect() on it returns an all-zero
      // rect - pick the first match that's actually rendered with size.
      const candidates = document.querySelectorAll(steps[stepIndex].selector);
      let el: Element | null = null;
      for (const c of candidates) {
        const r = c.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          el = c;
          break;
        }
      }
      if (!el) {
        // No visible target on this screen size - skip step.
        setStepIndex((i) => i + 1);
        return;
      }
      currentEl = el;
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      // Mobile scroll (and the smooth-scroll animation itself) can take
      // longer to settle than on desktop - measure a bit later, and again
      // once more shortly after in case the first read landed mid-scroll.
      settleTimer = setTimeout(() => {
        setViewport({ width: window.innerWidth, height: window.innerHeight });
        setRect(el!.getBoundingClientRect());
        settleTimer = setTimeout(() => setRect(el!.getBoundingClientRect()), 250);
      }, 400);
    }

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", trackScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", trackScroll);
      if (settleTimer) clearTimeout(settleTimer);
    };
  }, [stepIndex, steps]);

  if (stepIndex < 0 || stepIndex >= steps.length || !rect || viewport.width === 0) return null;

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;
  const padding = 8;

  function finish() {
    markSeen();
    setStepIndex(steps.length);
  }

  function next() {
    if (isLast) finish();
    else setStepIndex((i) => i + 1);
  }

  // Tooltip width scales down on narrow viewports instead of assuming a
  // fixed 384px - on phones under ~416px wide, a hardcoded width pushed the
  // horizontal clamp negative and shoved the tooltip off-screen.
  const tooltipWidth = Math.min(MAX_TOOLTIP_WIDTH, viewport.width - VIEWPORT_MARGIN * 2);
  const tooltipLeft = Math.min(
    Math.max(rect.left, VIEWPORT_MARGIN),
    viewport.width - tooltipWidth - VIEWPORT_MARGIN
  );

  // Tooltip position: below the highlighted element, or above if it would
  // overflow the bottom of the viewport.
  const spaceBelow = viewport.height - (rect.bottom + padding);
  const tooltipBelow = spaceBelow > 200;
  const tooltipTop = tooltipBelow
    ? Math.min(rect.bottom + padding + 12, viewport.height - 24)
    : Math.max(12, rect.top - padding - 12);

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Spotlight cutout: a box around the target with a giant box-shadow
          that darkens everything else. Click-through disabled everywhere
          except the tooltip controls, so the tour can't be accidentally
          dismissed by clicking the dimmed backdrop. */}
      <div
        className="fixed rounded-xl transition-all duration-300 pointer-events-none"
        style={{
          top: rect.top - padding,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.65)",
        }}
      />

      <div
        className="fixed bg-stone-900 text-white rounded-xl shadow-2xl p-3.5"
        style={{
          top: tooltipTop,
          left: tooltipLeft,
          width: tooltipWidth,
          maxHeight: viewport.height - 24,
          overflowY: "auto",
          transform: tooltipBelow ? undefined : "translateY(-100%)",
        }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <p className="font-bold text-sm">{step.title}</p>
          <span className="text-[10px] font-bold text-stone-500 flex-shrink-0 ml-2">
            {stepIndex + 1}/{steps.length}
          </span>
        </div>
        <p className="text-xs text-stone-300 leading-snug mb-3">{step.text}</p>
        <div className="flex items-center justify-between">
          <button onClick={finish} className="text-xs text-stone-400 hover:text-white cursor-pointer p-1 -m-1">
            Bỏ qua
          </button>
          <button
            onClick={next}
            className="bg-white text-stone-900 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
          >
            {isLast ? "Xong" : "Tiếp →"}
          </button>
        </div>
      </div>
    </div>
  );
}
