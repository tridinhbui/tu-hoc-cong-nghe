"use client";

import { useEffect, useState } from "react";

const TOUR_SEEN_KEY = "dashboard_tour_seen_v1";

interface TourStep {
  selector: string;
  title: string;
  text: string;
}

const STEPS: TourStep[] = [
  {
    selector: '[data-tour="track-selector"]',
    title: "Chọn lộ trình",
    text: "Bạn có 2 lộ trình: Tài chính cá nhân (ngắn hơn, cho người mới) và Tài chính chuyên ngành (sâu hơn). Có thể đổi qua lại bất cứ lúc nào.",
  },
  {
    selector: '[data-tour="resume-learning"]',
    title: "Học tiếp từ đâu",
    text: "Bấm vào đây để quay lại đúng bài học tiếp theo trong lộ trình, không cần tự tìm.",
  },
  {
    selector: '[data-tour="stage-list"]',
    title: "Lộ trình học",
    text: "Toàn bộ bài học được chia theo từng Chặng, mở khoá tuần tự. Bấm vào một Chặng để xem danh sách bài bên trong.",
  },
  {
    selector: '[data-tour="user-stats"]',
    title: "Tiến độ của bạn",
    text: "Theo dõi XP, cấp độ và số ngày học liên tiếp ở đây.",
  },
  {
    selector: '[data-tour="free-docs"]',
    title: "Tài liệu miễn phí & Thống kê",
    text: "Trên máy tính, hai mục này nằm ở đây. Trên điện thoại, bấm vào biểu tượng menu (☰) để mở.",
  },
];

const VIEWPORT_MARGIN = 16;
const MAX_TOOLTIP_WIDTH = 384; // matches max-w-sm

// One-time spotlight walkthrough for brand-new users: dims the whole screen
// except the current step's target element (via a box-shadow "cutout"), with
// a tooltip describing why that element matters. Runs once per browser
// (localStorage flag) - returning users never see it again, so it never gets
// in the way of people who already know the UI.
export default function DashboardTour() {
  const [stepIndex, setStepIndex] = useState(-1);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(TOUR_SEEN_KEY)) return;
    // Give the dashboard a tick to finish its first render/layout before we
    // start measuring element positions.
    const t = setTimeout(() => {
      // Mark as seen the moment the tour actually starts, not only when the
      // learner clicks through to the end - previously, navigating away
      // (e.g. tapping a lesson) mid-tour left the flag unset, so it played
      // again in full on every subsequent login.
      window.localStorage.setItem(TOUR_SEEN_KEY, "1");
      setStepIndex(0);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  // Lock page scroll while the tour is active so the spotlight can't drift
  // out of sync with its target - the tour drives scrolling itself via
  // scrollIntoView; letting the learner also scroll manually moved the
  // element without the (already-measured, viewport-relative) rect updating,
  // which smeared the highlight and tooltip away from the real element.
  useEffect(() => {
    const active = stepIndex >= 0 && stepIndex < STEPS.length;
    if (!active) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [stepIndex]);

  useEffect(() => {
    if (stepIndex < 0 || stepIndex >= STEPS.length) return;

    let settleTimer: ReturnType<typeof setTimeout> | null = null;

    function measure() {
      // Some steps have more than one element matching the selector - e.g.
      // "Tài liệu miễn phí" exists both in the desktop header (hidden on
      // mobile via a `hidden sm:flex` class) and in the mobile menu. A
      // `display: none` element is still in the DOM and still matches
      // querySelector, but getBoundingClientRect() on it returns an all-zero
      // rect, which previously spotlighted nothing in the top-left corner on
      // phones. Pick the first match that's actually rendered with size.
      const candidates = document.querySelectorAll(STEPS[stepIndex].selector);
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
    return () => {
      window.removeEventListener("resize", measure);
      if (settleTimer) clearTimeout(settleTimer);
    };
  }, [stepIndex]);

  if (stepIndex < 0 || stepIndex >= STEPS.length || !rect || viewport.width === 0) return null;

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;
  const padding = 8;

  function finish() {
    window.localStorage.setItem(TOUR_SEEN_KEY, "1");
    setStepIndex(STEPS.length);
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
        className="fixed bg-stone-900 text-white rounded-2xl shadow-2xl p-5"
        style={{
          top: tooltipTop,
          left: tooltipLeft,
          width: tooltipWidth,
          maxHeight: viewport.height - 24,
          overflowY: "auto",
          transform: tooltipBelow ? undefined : "translateY(-100%)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
            {stepIndex + 1}/{STEPS.length}
          </span>
          <button onClick={finish} className="text-xs text-stone-400 hover:text-white cursor-pointer p-1 -m-1">
            Bỏ qua
          </button>
        </div>
        <p className="font-bold text-base mb-1">{step.title}</p>
        <p className="text-sm text-stone-300 leading-relaxed mb-4">{step.text}</p>
        <div className="flex justify-end">
          <button
            onClick={next}
            className="bg-white text-stone-900 text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
          >
            {isLast ? "Xong" : "Tiếp →"}
          </button>
        </div>
      </div>
    </div>
  );
}
