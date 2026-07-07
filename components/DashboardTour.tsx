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
    text: "Bấm vào đây để quay lại đúng bài học tiếp theo trong lộ trình — không cần tự tìm.",
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
    title: "Tài liệu miễn phí",
    text: "Ngoài bài học, bạn có thể tải thêm tài liệu tham khảo miễn phí ở đây bất cứ lúc nào.",
  },
];

// One-time spotlight walkthrough for brand-new users: dims the whole screen
// except the current step's target element (via a box-shadow "cutout"), with
// a tooltip describing why that element matters. Runs once per browser
// (localStorage flag) — returning users never see it again, so it never gets
// in the way of people who already know the UI.
export default function DashboardTour() {
  const [stepIndex, setStepIndex] = useState(-1);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(TOUR_SEEN_KEY)) return;
    // Give the dashboard a tick to finish its first render/layout before we
    // start measuring element positions.
    const t = setTimeout(() => setStepIndex(0), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (stepIndex < 0 || stepIndex >= STEPS.length) return;

    function measure() {
      const el = document.querySelector(STEPS[stepIndex].selector);
      if (!el) {
        // Target not on screen (e.g. different track selected) — skip step.
        setStepIndex((i) => i + 1);
        return;
      }
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      setTimeout(() => setRect(el.getBoundingClientRect()), 300);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [stepIndex]);

  if (stepIndex < 0 || stepIndex >= STEPS.length || !rect) return null;

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

  // Tooltip position: below the highlighted element, or above if it would
  // overflow the bottom of the viewport.
  const spaceBelow = window.innerHeight - (rect.bottom + padding);
  const tooltipBelow = spaceBelow > 180;
  const tooltipTop = tooltipBelow ? rect.bottom + padding + 12 : Math.max(12, rect.top - padding - 12);

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
        className="fixed bg-stone-900 text-white rounded-2xl shadow-2xl p-5 w-[90vw] max-w-sm"
        style={
          tooltipBelow
            ? { top: tooltipTop, left: Math.min(Math.max(rect.left, 16), window.innerWidth - 380) }
            : { top: tooltipTop, left: Math.min(Math.max(rect.left, 16), window.innerWidth - 380), transform: "translateY(-100%)" }
        }
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
            {stepIndex + 1}/{STEPS.length}
          </span>
          <button onClick={finish} className="text-xs text-stone-400 hover:text-white cursor-pointer">
            Bỏ qua
          </button>
        </div>
        <p className="font-bold text-base mb-1">{step.title}</p>
        <p className="text-sm text-stone-300 leading-relaxed mb-4">{step.text}</p>
        <div className="flex justify-end">
          <button
            onClick={next}
            className="bg-white text-stone-900 text-xs font-bold px-4 py-2 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
          >
            {isLast ? "Xong" : "Tiếp →"}
          </button>
        </div>
      </div>
    </div>
  );
}
