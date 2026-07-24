"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Gauge,
  Sparkles,
  Brain,
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  CheckCircle2,
  Gamepad2,
  Users,
  MessageSquareMore,
  Crown,
  Trophy,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getTotalUserCount, getTotalCompletedLessonsCount } from "@/lib/supabase-user";
import { animateCountTo } from "@/lib/animate-count";
import { TRACKS, type TrackId } from "@/lib/tracks";
import Logo from "@/components/Logo";
import LiveNumber from "@/components/LiveNumber";
import ScrollReveal from "@/components/home/ScrollReveal";
import ProductPreview from "@/components/home/ProductPreview";
import TrackPreviewPanel from "@/components/login/TrackPreviewPanel";
import PublicLeaderboardPreview from "@/components/login/PublicLeaderboardPreview";
import InteractiveKingdomPreview from "@/components/home/InteractiveKingdomPreview";
import InteractiveEcosystemShowcase from "@/components/home/InteractiveEcosystemShowcase";
import ScrollPinnedSection from "@/components/home/ScrollPinnedSection";
import ScrollytellingPinnedSection from "@/components/home/ScrollytellingPinnedSection";
import { useRoutePrefetch } from "@/lib/use-route-prefetch";

// Each pain point is framed as the visitor's actual internal objection
// before signing up for yet another "learn finance" product - not a
// generic feature list. Answering the objection directly (in the same
// card) is what makes this read as understanding the customer instead of
// just listing capabilities.
const PAIN_POINTS = [
  {
    icon: Brain,
    worry: "Học xong rồi vài tuần sau quên sạch",
    answer:
      "Hệ thống tự chèn câu hỏi ôn lại đúng lúc sắp quên (Spaced Repetition) - không phải đọc một lần rồi thôi.",
  },
  {
    icon: Sparkles,
    worry: "Sợ đóng tiền một khoá đắt rồi bỏ dở",
    answer: "Toàn bộ {count}+ bài học - 100% miễn phí mãi mãi, không có bài trả phí hay bản nâng cấp ẩn phía sau.",
  },
  {
    icon: GraduationCap,
    worry: "Không biết nên bắt đầu từ đâu",
    answer: "Lộ trình chia theo chặng rõ ràng, từ vỡ lòng đến chuyên sâu, theo đúng thứ tự cần học.",
  },
  {
    icon: Gauge,
    worry: "Tự học một mình, không ai kiểm tra mình có hiểu không",
    answer: "Quiz sau mỗi bài, điểm XP, bảng xếp hạng thật - biết ngay mình đã hiểu đúng hay chưa.",
  },
] as const;

const METHOD_STEPS = [
  { step: "1", title: "Học một bài ngắn", text: "5-7 phút mỗi bài, đủ để không quá tải nhưng đủ sâu để hiểu bản chất." },
  { step: "2", title: "Làm quiz ngay sau đó", text: "Active recall - tự nhớ lại thay vì đọc lại, giúp kiến thức bám sâu hơn." },
  { step: "3", title: "Hệ thống nhắc ôn đúng lúc", text: "Trước khi bạn kịp quên (~5 và ~12 bài sau), một câu hỏi ôn lại xuất hiện." },
  { step: "4", title: "Nhớ lâu, không học vẹt", text: "Kiến thức được củng cố nhiều lần theo đúng đường cong quên lãng (forgetting curve)." },
] as const;

const FEATURE_SHOWCASE = [
  {
    eyebrow: "Game Kingdom",
    title: "Học tài chính như mở bản đồ vương quốc",
    text:
      "Vào Game Kingdom để làm nhiệm vụ, mở công trình, thử mini game tài chính và kiếm XP. Người mới không chỉ đọc lý thuyết, mà được luyện phản xạ qua tình huống ngắn: phân loại tài sản, ghép khái niệm, xử lý câu hỏi nhanh và theo dõi điểm.",
    image: "/rpg/empire_state_building.jpg",
    alt: "Thành phố tài chính dùng làm bối cảnh cho Game Kingdom",
    icon: Gamepad2,
    href: "/login?mode=signup",
    cta: "Khám phá Game Kingdom",
    bullets: ["Nhiệm vụ hằng ngày", "Mini game có điểm XP", "Bảng xếp hạng game thủ"],
  },
  {
    eyebrow: "Học nhóm",
    title: "Có phòng học chung để không phải tự học một mình",
    text:
      "Hệ thống ghép bạn vào phòng học theo chủ đề, có check-in mỗi ngày và trò chuyện nhóm. Đây là nơi hỏi nhanh, chia sẻ tiến độ, nhắc nhau học đều và biến việc tự học tài chính thành một thói quen có đồng đội.",
    image: "/images/study-group-cover.jpg",
    alt: "Không gian học nhóm tài chính với bối cảnh giao dịch phố Wall",
    icon: Users,
    href: "/login?mode=signup",
    cta: "Vào học nhóm",
    bullets: ["Ghép nhóm theo chủ đề", "Check-in nhận XP", "Chat nhóm có bot hỗ trợ"],
  },
  {
    eyebrow: "FinSocial",
    title: "Mạng xã hội học tài chính cho bài viết ngắn và câu hỏi thật",
    text:
      "FinSocial là feed riêng để đăng bản tin học tập, câu hỏi, phân tích ngắn, ảnh thành tựu và bình luận. Người mới có thể đọc cách người khác suy nghĩ, còn người học sâu hơn có nơi luyện viết phân tích tài chính bằng ngôn ngữ dễ hiểu.",
    image: "/wallstreet-bg.jpg",
    alt: "Bối cảnh phố Wall đại diện cho mạng xã hội học tài chính FinSocial",
    icon: MessageSquareMore,
    href: "/login?mode=signup",
    cta: "Tham gia FinSocial",
    bullets: ["Đăng bản tin ngắn", "Lọc chủ đề", "Bình luận và thả cảm xúc"],
  },
] as const;

const KINGDOM_BUILDINGS = [
  {
    name: "Goldman Sachs",
    label: "Đấu trường định giá",
    image: "/rpg/goldman_sachs.png",
    progress: "72%",
  },
  {
    name: "Fed Reserve",
    label: "Thử thách lãi suất",
    image: "/rpg/fed_reserve.jpg",
    progress: "48%",
  },
  {
    name: "Singapore Dock",
    label: "Cảng dòng tiền",
    image: "/rpg/singapore_dock.jpg",
    progress: "65%",
  },
] as const;

const AUDIENCES = [
  {
    title: "Tài chính cá nhân",
    icon: "💰",
    tag: "Quản lý dòng tiền",
    text: "Người muốn hiểu tiền, tiết kiệm, đầu tư, nợ, ngân sách và cách ra quyết định tài chính hằng ngày.",
  },
  {
    title: "Người học CFA",
    icon: "🎓",
    tag: "CFA Candidate",
    text: "Ai cần nền tảng kiến thức chắc hơn để học CFA, luyện tư duy phân tích và tăng độ bền kiến thức.",
  },
  {
    title: "Financial planner",
    icon: "📋",
    tag: "Tư vấn tài chính",
    text: "Người làm tư vấn hoặc lập kế hoạch tài chính cần hệ thống hóa kiến thức để tư vấn tự tin hơn.",
  },
  {
    title: "Investor",
    icon: "📈",
    tag: "Nhà đầu tư thực chiến",
    text: "Nhà đầu tư cá nhân muốn hiểu doanh nghiệp, định giá, dòng tiền và chất lượng tài sản sâu hơn.",
  },
  {
    title: "Kế toán mới vào nghề",
    icon: "📑",
    tag: "Phân tích BCTC",
    text: "Người mới đi làm cần củng cố nền tảng để đọc số liệu, hiểu báo cáo và giao tiếp tài chính tốt hơn.",
  },
  {
    title: "Tài chính chuyên nghiệp",
    icon: "💼",
    tag: "Finance / FP&A",
    text: "Nhân sự finance/FP&A/analysis mới vào nghề cần một hệ thống học nhanh, rõ và bền hơn.",
  },
] as const;

function SubtleWaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none opacity-45 dark:opacity-20 my-[-1px] ${flip ? "rotate-180" : ""}`}>
      <svg
        className="relative block w-full h-7 sm:h-10 text-emerald-500/30 dark:text-emerald-400/15"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function SoftFadeDivider() {
  return (
    <div className="w-full h-12 pointer-events-none bg-gradient-to-b from-transparent via-emerald-500/10 dark:via-emerald-400/5 to-transparent my-[-1px]" />
  );
}

function HorizontalSnapSlider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const amount = containerRef.current.clientWidth * 0.75;
    containerRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group/slider">
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollByAmount("left")}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 dark:bg-stone-800/90 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 shadow-md backdrop-blur-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
          aria-label="Cuộn trái"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollByAmount("right")}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 dark:bg-stone-800/90 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 shadow-md backdrop-blur-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
          aria-label="Cuộn phải"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      <div
        ref={containerRef}
        className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth pb-3 pt-1 px-1"
      >
        {children}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [displayedUserCount, setDisplayedUserCount] = useState(0);
  const [displayedLessonCount, setDisplayedLessonCount] = useState(0);
  const [displayedCompletedCount, setDisplayedCompletedCount] = useState(0);
  const [heroSpotlight, setHeroSpotlight] = useState({ x: 50, y: 35 });
  // Plain (non-animated) rounded-down count for inline copy ("360+ bài
  // học..." in the hero paragraph and pain-point card) - the animated
  // displayedLessonCount above counts up from 0 on load, which reads fine
  // as a standalone hero stat but looks broken mid-sentence in body text.
  const [lessonCountFloor, setLessonCountFloor] = useState<number | null>(null);
  const [previewTrack, setPreviewTrack] = useState<TrackId>("personal");
  const userCountLoadedRef = useRef(false);
  const completedCountLoadedRef = useRef(false);
  const heroParallaxX = (heroSpotlight.x - 50) / 10;
  const heroParallaxY = (heroSpotlight.y - 35) / 10;

  useRoutePrefetch(["/login", "/login?mode=signup", `/bai-hoc/${TRACKS.personal.previewSlug}`], { delayMs: 500 });

  useEffect(() => {
    const cancelledRef = { current: false };
    const loadUserCount = async () => {
      try {
        const count = await getTotalUserCount();
        if (cancelledRef.current || !count) return;
        const safeCount = Math.max(count, 1000);
        if (!userCountLoadedRef.current) {
          userCountLoadedRef.current = true;
          animateCountTo(safeCount, setDisplayedUserCount, cancelledRef);
        } else {
          setDisplayedUserCount(safeCount);
        }
      } catch (error) {
        console.error("Error loading total user count:", error);
      }
    };

    void loadUserCount();
    const intervalId = window.setInterval(() => {
      void loadUserCount();
    }, 30000);

    return () => {
      cancelledRef.current = true;
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const cancelledRef = { current: false };
    fetch("/api/lesson-count")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count?: number } | null) => {
        if (cancelledRef.current || !data?.count) return;
        animateCountTo(data.count, setDisplayedLessonCount, cancelledRef);
        setLessonCountFloor(Math.floor(data.count / 10) * 10);
      })
      .catch((error) => console.error("Error loading lesson count:", error));
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  useEffect(() => {
    const cancelledRef = { current: false };
    const loadCompletedCount = async () => {
      try {
        const count = await getTotalCompletedLessonsCount();
        if (cancelledRef.current || !count) return;
        const safeCount = Math.max(count, 8000);
        if (!completedCountLoadedRef.current) {
          completedCountLoadedRef.current = true;
          animateCountTo(safeCount, setDisplayedCompletedCount, cancelledRef);
        } else {
          setDisplayedCompletedCount(safeCount);
        }
      } catch (error) {
        console.error("Error loading total completed lessons count:", error);
      }
    };

    void loadCompletedCount();
    const intervalId = window.setInterval(() => {
      void loadCompletedCount();
    }, 30000);

    return () => {
      cancelledRef.current = true;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-stone-950 transition-colors duration-300">
      <div className="bg-stone-50/60 dark:bg-stone-950 relative overflow-hidden">
        {/* Stripe-style Ambient Radial Glow Beam, Grid Mesh & Floating Blur Orbs */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Top Radial Beam */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(16,185,129,0.22),rgba(20,184,166,0.08)_50%,transparent_100%)] opacity-90" />

          {/* Floating Glowing Blur Orbs (● blur) */}
          <div className="absolute -top-36 -left-36 w-[560px] h-[560px] rounded-full bg-emerald-400/22 blur-[130px] animate-pulse" />
          <div className="absolute top-[380px] -right-36 w-[500px] h-[500px] rounded-full bg-teal-400/20 blur-[130px]" />
          <div className="absolute top-[42%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-emerald-400/15 blur-[150px]" />
          <div className="absolute top-[70%] -left-44 w-[580px] h-[580px] rounded-full bg-sky-400/15 blur-[140px]" />

          {/* Stripe SVG Fine Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98112_1px,transparent_1px),linear-gradient(to_bottom,#10b98112_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_65%,transparent_100%)]" />
        </div>
      <style>{`
        @keyframes landing-aurora-drift {
          0% { transform: translate3d(-2%, -1%, 0) scale(1); }
          50% { transform: translate3d(2%, 1.5%, 0) scale(1.03); }
          100% { transform: translate3d(-1%, 2%, 0) scale(1.01); }
        }
        @keyframes landing-orbit-drift {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          100% { transform: translate3d(0, -16px, 0) rotate(360deg); }
        }
        @keyframes landing-grid-drift {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(24px, 18px, 0); }
        }
        @keyframes landing-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes landing-pulse-glow {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.78; transform: scale(1.08); }
        }
        @keyframes ticker-drift {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes spotlight-sweep {
          0% { transform: translateX(-130%) skewX(-18deg); opacity: 0; }
          20% { opacity: 0.18; }
          100% { transform: translateX(240%) skewX(-18deg); opacity: 0; }
        }
        .landing-texture::before {
          content: "";
          position: absolute;
          inset: -5%;
          background-image:
            radial-gradient(circle at 20% 25%, rgba(16,185,129,0.08), transparent 24%),
            radial-gradient(circle at 78% 18%, rgba(245,158,11,0.08), transparent 22%),
            radial-gradient(circle at 62% 72%, rgba(20,184,166,0.07), transparent 26%);
          pointer-events: none;
        }
        .landing-texture::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.08;
          background-image:
            radial-gradient(rgba(15,23,42,0.35) 0.6px, transparent 0.6px),
            linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.8) 45%, transparent 100%);
          background-size: 16px 16px, 100% 100%;
          mix-blend-mode: multiply;
          pointer-events: none;
        }
        .landing-drift-grid {
          animation: landing-grid-drift 18s linear infinite alternate;
        }
        .landing-aurora {
          animation: landing-aurora-drift 16s ease-in-out infinite alternate;
        }
        .landing-orbit {
          animation: landing-orbit-drift 24s linear infinite;
        }
        .landing-glow {
          animation: landing-pulse-glow 8s ease-in-out infinite;
        }
        .landing-float {
          animation: landing-float 5.5s ease-in-out infinite;
        }
        .landing-ticker {
          animation: ticker-drift 26s linear infinite;
          width: max-content;
          will-change: transform;
          transform: translateZ(0);
        }
        .cta-electric {
          position: relative;
          overflow: hidden;
        }
        .cta-electric::after {
          content: "";
          position: absolute;
          inset: -40%;
          background: linear-gradient(110deg, transparent 34%, rgba(255,255,255,0.32) 48%, transparent 62%);
          transform: translateX(-140%) skewX(-18deg);
          animation: spotlight-sweep 3.8s ease-in-out infinite;
          pointer-events: none;
        }
        .cta-electric:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 18px 44px -22px rgba(16,185,129,0.65);
        }
        .landing-band {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .landing-band::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .landing-band > * {
          position: relative;
          z-index: 1;
        }
        .landing-band-soft::before {
          background:
            linear-gradient(180deg, rgba(255,255,255,0.78), rgba(248,250,252,0.45)),
            radial-gradient(circle at 18% 22%, rgba(16,185,129,0.08), transparent 26%),
            radial-gradient(circle at 82% 74%, rgba(20,184,166,0.07), transparent 24%);
        }
        .landing-band-glass::before {
          background:
            linear-gradient(180deg, rgba(248,250,252,0.88), rgba(255,255,255,0.58)),
            linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px);
          background-size: auto, 30px 30px, 30px 30px;
        }
        .landing-band-emerald::before {
          background:
            linear-gradient(180deg, rgba(236,253,245,0.92), rgba(255,255,255,0.68)),
            radial-gradient(circle at 20% 30%, rgba(16,185,129,0.12), transparent 24%),
            radial-gradient(circle at 78% 72%, rgba(5,150,105,0.08), transparent 22%);
        }
        .landing-band-dark::before {
          background:
            linear-gradient(180deg, rgba(12,18,28,0.92), rgba(12,18,28,0.78)),
            radial-gradient(circle at 18% 24%, rgba(245,158,11,0.12), transparent 20%),
            radial-gradient(circle at 78% 68%, rgba(16,185,129,0.1), transparent 24%);
        }
        .landing-band-divider::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -1px;
          width: min(92vw, 1120px);
          height: 96px;
          transform: translateX(-50%);
          background: linear-gradient(180deg, rgba(255,255,255,0), rgba(16,185,129,0.06) 48%, rgba(255,255,255,0));
          filter: blur(18px);
          pointer-events: none;
          z-index: 0;
        }
      `}</style>
      {/* Ambient background glows - fixed page-level, not nested inside any section */}
      <div className="pointer-events-none absolute inset-0 landing-texture z-0" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_12%_18%,rgba(16,185,129,0.12),transparent_28%),radial-gradient(circle_at_78%_12%,rgba(20,184,166,0.10),transparent_26%),linear-gradient(180deg,rgba(236,253,245,0.28),rgba(255,255,255,0.18)_38%,rgba(240,253,250,0.34))]" />
      <div className="pointer-events-none absolute inset-0 landing-drift-grid bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:28px_28px] z-0" />
      <div className="pointer-events-none absolute inset-0 landing-aurora z-0 opacity-90">
        <div className="absolute left-[8%] top-[8%] h-[22rem] w-[22rem] rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-500/10" />
        <div className="absolute right-[12%] top-[20%] h-[20rem] w-[20rem] rounded-full bg-teal-400/10 blur-[120px] dark:bg-teal-500/10" />
        <div className="absolute left-[46%] top-[48%] h-[26rem] w-[26rem] rounded-full bg-amber-400/10 blur-[140px] dark:bg-amber-400/10" />
      </div>
      <div className="pointer-events-none absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] z-0 landing-glow" />
      <div className="pointer-events-none absolute top-[45%] right-[8%] w-[550px] h-[550px] rounded-full bg-teal-500/10 dark:bg-teal-500/5 blur-[150px] z-0 landing-glow" />
      <div className="pointer-events-none absolute top-[75%] left-[12%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[130px] z-0 landing-glow" />

      <div className="relative z-10">
        {/* Top banner - pushed to the very top of the page per request, in
            Vietnamese-flag red/yellow, same commitment message previously
            further down in the Social Proof section (moved here, not
            duplicated). */}
        {/* Top banner - pushed to the very top of the page per request, in
            Vietnamese-flag red/yellow */}
        <div className="relative overflow-hidden bg-[#DA251D]">
          <div className="pointer-events-none absolute -top-8 -right-8 text-[100px] leading-none text-[#FFCD00]/10 select-none">
            ★
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col gap-1.5 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-3 sm:text-left">
            <span className="hidden sm:inline text-lg leading-none text-[#FFCD00]" aria-hidden="true">
              ★
            </span>
            <p className="text-xs sm:text-sm font-semibold text-white/95 leading-relaxed">
              Cam kết toàn bộ bài học tại đây <strong className="text-[#FFCD00]">miễn phí mãi mãi</strong> vì sự phát
              triển của cộng đồng học tài chính cá nhân, CFA, lập kế hoạch tài chính, đầu tư, và người làm tài chính
              tại Việt Nam.
            </p>
            <a
              href="https://www.facebook.com/share/g/1C2jTdsgF5/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-black text-white hover:underline whitespace-nowrap shrink-0"
            >
              Tham gia group Facebook
              <ArrowRight className="icon-micro w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ── NAV ── */}
        <header className="sticky top-0 z-40 bg-white/85 dark:bg-stone-950/85 backdrop-blur-md border-b border-stone-100 dark:border-stone-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Logo size={28} />
              <span className="text-sm sm:text-base font-black text-stone-800 dark:text-stone-200 uppercase tracking-widest flex items-center gap-2">
                Tự Học Tài Chính
                <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200/50 hidden xs:inline-block">
                  🇻🇳 VIỆT NAM
                </span>
              </span>
            </div>
            <Link
              href="/login"
              className="cta-electric group inline-flex items-center gap-2 rounded-2xl border border-emerald-200/80 dark:border-emerald-800 bg-gradient-to-r from-emerald-500 to-teal-500 px-4.5 py-2.5 text-sm font-bold text-white shadow-[0_12px_28px_-20px_rgba(16,185,129,0.35)] transition-all hover:shadow-[0_16px_34px_-22px_rgba(16,185,129,0.45)]"
            >
              Vào học ngay
              <ArrowRight className="icon-micro w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </header>

        {/* ── HERO ── */}
        <section
          className="relative overflow-hidden landing-band landing-band-soft"
          onMouseMove={(e) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setHeroSpotlight({
              x: Math.max(10, Math.min(90, x)),
              y: Math.max(10, Math.min(90, y)),
            });
          }}
        >
          <div className="absolute inset-0">
            <Image
              src="/times-square.jpg"
              alt="Bối cảnh tài chính hiện đại"
              fill
              sizes="100vw"
              className="object-cover object-center opacity-[0.16]"
              priority
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.16),transparent_26%),radial-gradient(circle_at_85%_25%,rgba(245,158,11,0.15),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.9),rgba(247,250,252,0.8)_40%,rgba(240,253,250,0.62)_100%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_26%),radial-gradient(circle_at_85%_25%,rgba(245,158,11,0.16),transparent_24%),linear-gradient(135deg,rgba(9,9,11,0.92),rgba(15,23,42,0.84)_40%,rgba(6,78,59,0.46)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
            <div
              className="pointer-events-none absolute inset-0 opacity-70 transition-[background-position] duration-300 ease-out"
              style={{
                background: `radial-gradient(circle at ${heroSpotlight.x}% ${heroSpotlight.y}%, rgba(255,255,255,0.34), transparent 22%), radial-gradient(circle at ${heroSpotlight.x}% ${heroSpotlight.y}%, rgba(16,185,129,0.14), transparent 32%)`,
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
            <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7 max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-white/80 px-3.5 py-1 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.14em] text-emerald-700 backdrop-blur-sm dark:border-emerald-900 dark:bg-stone-950/55 dark:text-emerald-300"
                >
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
                  </span>
                  Kiến thức chuẩn quốc tế · Bản sắc thực tế Việt Nam 🇻🇳
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.06 }}
                  className="mb-4 text-[2.5rem] sm:text-[3.6rem] lg:text-[3.8rem] xl:text-[4.4rem] font-black leading-[1.02] tracking-tight text-stone-950 dark:text-stone-50"
                >
                  Bước vào thế giới{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-black">
                    tài chính
                  </span>
                  ,<br />cùng bắt đầu từ con số 0
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
                  className="mb-8 max-w-xl text-[15px] leading-7 text-stone-650 [filter:none] dark:text-stone-300 sm:text-lg"
                >
                  {lessonCountFloor ?? 360}+ bài học - 100% miễn phí vĩnh viễn - giáo trình thiết kế riêng cho người Việt học tài chính cá
                  nhân, CFA, lập kế hoạch tài chính, đầu tư, kế toán và tài chính chuyên nghiệp. Học theo phương pháp
                  Spaced Repetition khoa học.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: 0.18 }}
                  className="mb-10 flex flex-wrap items-center gap-3 [filter:none]"
                >
                  <Link
                    href="/login?mode=signup"
                    className="cta-electric group inline-flex items-center gap-2 rounded-[20px] bg-stone-950 px-6 py-3.5 text-base font-black text-white shadow-[0_16px_34px_-24px_rgba(15,23,42,0.38)] transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.015] active:scale-[0.98] hover:bg-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
                  >
                    Bắt đầu học miễn phí
                    <ArrowRight className="icon-micro w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href={`/bai-hoc/${TRACKS.personal.previewSlug}`}
                    className="inline-flex items-center gap-2 rounded-[20px] border border-stone-200/80 bg-white/70 px-5 py-3 text-sm font-bold text-stone-900 backdrop-blur transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.015] hover:bg-white dark:border-stone-700 dark:bg-stone-950/45 dark:text-stone-100 dark:hover:bg-stone-900"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Xem thử bài học
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.24 }}
                  className="w-full rounded-[1.35rem] border border-stone-200/80 bg-white/70 px-4 py-3.5 shadow-[0_22px_44px_-30px_rgba(16,185,129,0.35)] backdrop-blur-sm dark:border-stone-800 dark:bg-stone-950/45 sm:w-fit sm:px-5"
                >
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:border-emerald-900/50 dark:bg-stone-900/60 dark:text-emerald-300">
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
                    </span>
                    Live cập nhật trực tiếp
                  </div>
                  <div className="flex items-stretch divide-x divide-stone-200 dark:divide-stone-800">
                    <div className="min-w-0 pr-3 sm:pr-6">
                      <LiveNumber value={displayedUserCount} className="text-lg sm:text-2xl" />
                      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400 sm:text-[11px]">người học</p>
                    </div>
                    <div className="min-w-0 px-3 sm:px-6">
                      <LiveNumber value={displayedLessonCount} className="text-lg sm:text-2xl" />
                      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400 sm:text-[11px]">bài học</p>
                    </div>
                    <div className="min-w-0 pl-3 sm:pl-6">
                      <LiveNumber value={displayedCompletedCount} className="text-lg sm:text-2xl" />
                      <p className="mt-0.5 whitespace-nowrap text-[10px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400 sm:whitespace-normal sm:text-[11px]">đã hoàn thành</p>
                    </div>
                  </div>
                </motion.div>
              </div>

                <motion.div
                  initial={{ opacity: 0, x: 24, scale: 0.96, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}
                  className="lg:col-span-5 relative flex justify-center w-full mt-6 lg:mt-0"
                >
                <div className="landing-float relative w-full max-w-[590px] overflow-hidden rounded-[20px] border border-stone-200/80 bg-stone-950 text-white shadow-[0_26px_70px_-34px_rgba(15,23,42,0.58)] dark:border-stone-800 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_30px_78px_-34px_rgba(15,23,42,0.62)]">
                  <div className="absolute inset-0">
                    <Image
                      src="/boss-wallstreet-bull.png"
                      alt="Wall Street bull boss"
                      fill
                      sizes="520px"
                      className="object-cover object-center opacity-55"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.24),transparent_28%),linear-gradient(115deg,rgba(15,23,42,0.96),rgba(15,23,42,0.76)_44%,rgba(6,78,59,0.62))]" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-stone-950/90 to-transparent" />
                  </div>

                  <div
                      className="relative p-5 xl:p-6"
                      style={{
                        transform: `perspective(1200px) translate3d(${heroParallaxX * 0.5}px, ${heroParallaxY * 0.35}px, 0)`,
                      }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200 backdrop-blur">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                        Đang học thật
                      </div>
                      <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-amber-100">
                        Bài 24
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 xl:grid-cols-[minmax(0,1.08fr)_minmax(190px,0.82fr)]">
                      <div
                        className="rounded-[1.6rem] border border-white/12 bg-white/10 p-3.5 backdrop-blur-sm xl:p-4"
                        style={{
                          transform: `perspective(1200px) translate3d(${heroParallaxX * 0.8}px, ${heroParallaxY * 0.6}px, 0) rotateY(${heroParallaxX * 0.45}deg)`,
                        }}
                      >
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200">Bài học hôm nay</p>
                            <p className="mt-1 text-base font-black leading-tight text-white xl:text-lg">Đọc chỉ số P/E trong 5 phút</p>
                          </div>
                          <div className="shrink-0 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-black text-emerald-200">
                            72% hiểu bài
                          </div>
                        </div>
                        <div className="rounded-[1.35rem] border border-white/10 bg-stone-950/45 p-3">
                          <div className="rounded-[18px] bg-white/8 p-2.5">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-stone-400">Ví dụ trong bài</p>
                                <p className="mt-1 text-[13px] font-bold leading-snug text-white">
                                  Công ty A có EPS = 5.000đ, giá cổ phiếu = 75.000đ. P/E bằng bao nhiêu?
                                </p>
                              </div>
                              <div className="rounded-full bg-amber-300/15 px-2 py-1 text-[10px] font-black text-amber-100">P/E</div>
                            </div>
                            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                              {[
                                ["Giá", "75.000đ"],
                                ["EPS", "5.000đ"],
                                ["P/E", "15 lần"],
                              ].map(([label, value]) => (
                                <div key={label} className="rounded-[14px] bg-stone-950/45 px-1.5 py-2">
                                  <p className="text-[9px] font-black uppercase tracking-[0.12em] text-stone-500">{label}</p>
                                  <p className="mt-1 text-[13px] font-black leading-tight text-white">{value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-3 space-y-2">
                            {[
                              ["1", "P/E thấp chưa chắc rẻ nếu lợi nhuận giảm"],
                              ["2", "So sánh P/E trong cùng ngành sẽ ý nghĩa hơn"],
                              ["3", "Kiểm tra chất lượng lợi nhuận bằng dòng tiền"],
                            ].map(([step, text]) => (
                              <div key={step} className="flex items-center gap-2 rounded-[14px] bg-white/7 px-2.5 py-2 text-[11px] font-bold leading-snug text-stone-200">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-300/15 text-[10px] text-emerald-100">{step}</span>
                                {text}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {[
                            ["Bài học", "5 phút"],
                            ["Quiz đúng", `${Math.max(72, Math.min(98, (displayedCompletedCount % 100) || 78))}%`],
                            ["Ôn lại", "Sau 5 bài"],
                          ].map(([label, value]) => (
                            <div key={label} className="rounded-[16px] border border-white/10 bg-white/8 px-3 py-2">
                              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-stone-400">{label}</p>
                              <p className="mt-1 text-[13px] font-black leading-tight text-white">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3 xl:block xl:space-y-3">
                        <div
                          className="rounded-[1.45rem] border border-white/12 bg-white/10 p-3.5 backdrop-blur-sm xl:p-4"
                          style={{
                            transform: `perspective(1200px) translate3d(${heroParallaxX * 1.1}px, ${heroParallaxY * 0.8}px, 0) rotateY(${heroParallaxX * 0.7}deg)`,
                          }}
                        >
                          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-stone-300">Quiz nhanh</p>
                          <p className="mt-2 text-sm font-black text-white">P/E = Giá / EPS?</p>
                          <div className="mt-3 space-y-2">
                            <div className="rounded-full bg-emerald-300/18 px-3 py-2 text-xs font-black text-emerald-100">Đúng: 15 lần</div>
                            <div className="rounded-full bg-white/8 px-3 py-2 text-xs font-bold text-stone-300">Sai: 0,15 lần</div>
                          </div>
                        </div>
                        <div
                          className="rounded-[1.45rem] border border-white/12 bg-white/10 p-3.5 backdrop-blur-sm xl:p-4"
                          style={{
                            transform: `perspective(1200px) translate3d(${heroParallaxX * 1.6}px, ${heroParallaxY * 1.15}px, 0) rotateY(${heroParallaxX * 0.9}deg)`,
                          }}
                        >
                          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-stone-300">Flashcard</p>
                          <p className="mt-2 text-sm font-black text-white">P/E là gì?</p>
                          <p className="mt-1 text-xs leading-relaxed text-stone-300">Số năm lợi nhuận hiện tại cần để hoàn vốn nếu mọi thứ giữ nguyên.</p>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div className="preview-progress-live h-full w-3/4 rounded-full bg-gradient-to-r from-amber-300 to-emerald-300" />
                          </div>
                        </div>
                        <div className="rounded-[1.45rem] border border-emerald-300/20 bg-emerald-400/10 p-3.5 backdrop-blur-sm xl:p-4">
                          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200">Ghi chú mẫu</p>
                          <p className="mt-2 text-sm font-black text-white">Không mua chỉ vì P/E thấp</p>
                          <p className="mt-1 text-xs leading-relaxed text-stone-300">Luôn hỏi: lợi nhuận có bền không, dòng tiền có thật không?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PRODUCT PREVIEW ── */}
        <section className="landing-band landing-band-soft landing-band-divider relative py-14 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-2xl mb-8">
            <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
              Xem trước giao diện thật
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-stone-900 dark:text-stone-100">
              Đây là những gì bạn sẽ dùng mỗi ngày
            </h2>
            <p className="mt-3 max-w-xl text-sm text-stone-600 dark:text-stone-400 leading-relaxed sm:text-base">
              Không chỉ là bài đọc dài - dashboard theo dõi tiến độ thật, quiz sau mỗi bài, và cấp độ/XP để biết mình đang ở đâu.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <ProductPreview />
          </ScrollReveal>
          <div className="mt-5 overflow-hidden rounded-full border border-stone-200/80 bg-white/80 px-3 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-stone-500 shadow-sm dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-400">
            <div className="landing-ticker flex items-center gap-10">
              {[
                "Live XP cập nhật",
                "Bảng xếp hạng theo tuần",
                "Hệ thống ôn tập ngắt quãng",
                "Game Kingdom mở theo tiến độ",
                "FinSocial phản biện ý tưởng",
                "Học nhóm giữ nhịp mỗi ngày",
              ]
                .concat([
                  "Live XP cập nhật",
                  "Bảng xếp hạng theo tuần",
                  "Hệ thống ôn tập ngắt quãng",
                  "Game Kingdom mở theo tiến độ",
                  "FinSocial phản biện ý tưởng",
                  "Học nhóm giữ nhịp mỗi ngày",
                ])
                .map((item, index) => (
                  <span key={`${item}-${index}`} className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {item}
                  </span>
                ))}
            </div>
          </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ── */}
        <section className="bg-white dark:bg-stone-950 py-8 sm:py-10 relative border-y border-stone-200/80 dark:border-stone-850/80 font-sans">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-5">
              <p className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
                Cộng đồng thật
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 mb-2 leading-snug">
                Học viên nổi bật đang học mỗi ngày
              </h2>
              <p className="max-w-xl mx-auto text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Đây không phải bảng số liệu trang trí. Người mới vào có thể nhìn ngay ai đang học thật, ai giữ được nhịp đều,
                và cảm giác tiến bộ trong hệ thống trông ra sao.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <PublicLeaderboardPreview />
            </ScrollReveal>
          </div>
        </section>

        <SoftFadeDivider />

        {/* ── GAME KINGDOM PREVIEW ── */}
        <section className="landing-band landing-band-dark landing-band-divider relative py-6 sm:py-8 font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl mb-3">
            <p className="text-[11px] font-black text-amber-200 uppercase tracking-widest mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
              Xem trước Game Kingdom
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.72)]">
              Một vương quốc tài chính để bạn mở khóa bằng kiến thức
            </h2>
            <p className="mt-1.5 max-w-xl text-xs sm:text-sm leading-relaxed text-stone-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]">
              Game Kingdom biến việc học thành nhiệm vụ: hoàn thành bài, làm quiz, chơi mini game và mở dần các công trình
              tài chính.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <InteractiveKingdomPreview />
          </ScrollReveal>
        </div>
      </section>

        <SubtleWaveDivider />

        {/* ── FEATURE SHOWCASE ── */}
        <section className="landing-band landing-band-emerald landing-band-divider relative py-6 sm:py-8 font-sans border-y border-stone-200/80 dark:border-stone-850/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="max-w-3xl mb-4">
              <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                Không chỉ là bài học
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-stone-900 dark:text-stone-100">
                Học, chơi, hỏi đáp và chia sẻ trong cùng một{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  hệ sinh thái tài chính
                </span>
              </h2>
              <p className="mt-3 max-w-xl text-sm text-stone-600 dark:text-stone-400 leading-relaxed sm:text-base">
                Sau khi tạo tài khoản, bạn không chỉ đi qua lộ trình bài học. Bạn còn có Lộ trình Active Recall ôn tập chủ động,
                Học nhóm 3D để giữ nhịp, và FinSocial để trao đổi kiến thức với cộng đồng.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <InteractiveEcosystemShowcase />
            </ScrollReveal>
          </div>
        </section>

        <SoftFadeDivider />

        {/* ── PAIN POINTS / TRUST (STICKY SCROLL PINNED SECTION) ── */}
        <ScrollPinnedSection
          badge={
            <p className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              Vì sao học viên chọn ở lại
            </p>
          }
          title={
            <>
              Những lo lắng thường gặp khi tự học{" "}
              <span className="text-emerald-600 dark:text-emerald-400">tài chính</span>
            </>
          }
          theme="soft"
        >
          {PAIN_POINTS.map(({ icon: Icon, worry, answer }, i) => (
            <motion.div
              key={worry}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="h-full rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 sm:p-5 shadow-sm hover:border-emerald-400/80 hover:shadow-md transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950 items-center justify-center border border-emerald-300/60 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-300 shadow-xs group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Giải pháp #0{i + 1}
                  </span>
                </div>

                <p className="text-sm font-black text-stone-900 dark:text-stone-100 mb-2 leading-snug">
                  “{worry}”
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/70 dark:bg-stone-950/40 -mx-4 -mb-4 p-3.5">
                <p className="text-xs font-medium text-stone-700 dark:text-stone-300 leading-relaxed flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{answer.replace("{count}", String(lessonCountFloor ?? 360))}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </ScrollPinnedSection>

        {/* ── METHOD / SPACED REPETITION (STICKY SCROLL PINNED SECTION) ── */}
        <ScrollPinnedSection
          badge={
            <p className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              Phương pháp học
            </p>
          }
          title="Spaced Repetition - học ít, nhớ lâu"
          description="Không phải mẹo riêng của chúng tôi - đây là phương pháp ôn tập ngắt quãng được khoa học nhận thức nghiên cứu kỹ nhất, dựa trên đường cong quên lãng (Ebbinghaus forgetting curve)."
          theme="light"
        >
          {METHOD_STEPS.map(({ step, title, text }) => (
            <div
              key={step}
              className="h-full rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs flex items-center justify-center mb-3 shadow-xs">
                  {step}
                </div>
                <p className="font-black text-stone-900 dark:text-stone-100 text-sm mb-1.5">{title}</p>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-medium">{text}</p>
              </div>
            </div>
          ))}
        </ScrollPinnedSection>

        {/* ── 3-PANEL FULL SCREEN SCROLLYTELLING PINNED SECTION ── */}
        <ScrollytellingPinnedSection />

        {/* ── VISION & MISSION ── */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20">
          <ScrollReveal>
            <div className="animated-border-card rounded-[20px] border border-stone-200/80 dark:border-stone-800/85 bg-white/70 dark:bg-stone-900/60 backdrop-blur-sm p-8 lg:p-10 shadow-[0_14px_34px_-26px_rgba(28,25,23,0.12)] dark:shadow-[0_14px_34px_-26px_rgba(0,0,0,0.28)]">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.95fr)] lg:items-start">
                <div>
                  <p className="mb-4 inline-flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-sm shadow-sm ring-1 ring-emerald-200/80 dark:bg-emerald-950/40 dark:ring-emerald-900/50">
                      🇻🇳
                    </span>
                    Vì sao chúng tôi làm
                  </p>
                  <h2 className="max-w-2xl text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
                    Hiểu biết tài chính ở Việt Nam đang cải thiện, nhưng khoảng trống nền tảng vẫn còn rất lớn.
                  </h2>

                  <div className="mt-7 grid gap-4 sm:grid-cols-3">
                    <div className="animated-border-card rounded-[18px] border border-emerald-200/50 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 px-5 py-5 transition-all duration-200 ease-out hover:scale-[1.02]">
                      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                        Hiểu biết cơ bản
                      </div>
                      <div className="mt-3 text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                        24%
                      </div>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                        đạt ngưỡng hiểu biết tài chính cơ bản.
                      </p>
                    </div>
                    <div className="animated-border-card rounded-[18px] border border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 px-5 py-5 transition-all duration-200 ease-out hover:scale-[1.02]">
                      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                        Khoảng trống còn lại
                      </div>
                      <div className="mt-3 text-4xl sm:text-5xl font-black tracking-tight text-stone-800 dark:text-stone-100">
                        3/4
                      </div>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                        vẫn chưa đạt mức nền tảng.
                      </p>
                    </div>
                    <div className="animated-border-card rounded-[18px] border border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 px-5 py-5 transition-all duration-200 ease-out hover:scale-[1.02]">
                      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                        Tiếp cận năm 2024
                      </div>
                      <div className="mt-3 text-4xl sm:text-5xl font-black tracking-tight text-stone-800 dark:text-stone-100">
                        70,6%
                      </div>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                        đã có tài khoản tài chính hoặc tiền di động.
                      </p>
                    </div>
                  </div>

                  <div className="animated-border-card mt-6 rounded-[18px] bg-stone-50/60 dark:bg-stone-900/30 px-5 py-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400 border border-stone-150/40 dark:border-stone-850/40">
                    Vấn đề không nằm ở việc người học thiếu cố gắng, mà ở chỗ kiến thức tài chính thường còn khó, rời
                    rạc và xa nhu cầu thực tế.
                  </div>
                </div>

                <div className="lg:self-center lg:translate-y-4">
                  <div className="animated-border-card rounded-[20px] border border-emerald-200/70 dark:border-emerald-900/40 bg-gradient-to-b from-emerald-50/50 to-teal-50/30 dark:from-emerald-950/20 dark:to-teal-950/10 p-6 shadow-[0_14px_30px_-26px_rgba(16,185,129,0.18)] backdrop-blur-sm">
                    <p className="mb-4 inline-flex items-center gap-2 text-xs font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-widest">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-sm shadow-sm ring-1 ring-emerald-200/80 dark:bg-stone-950/30 dark:ring-emerald-900/40">
                        🇻🇳
                      </span>
                      Tầm nhìn và sứ mệnh
                    </p>
                    <div className="grid gap-3.5">
                      <div className="rounded-[18px] bg-white/60 dark:bg-stone-950/20 px-4 py-4 border border-stone-150/30 dark:border-stone-850/30">
                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                          Mục tiêu
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                          Xây giáo trình miễn phí, rõ ràng và đủ sâu cho người học cá nhân lẫn người đi theo nghề.
                        </p>
                      </div>
                      <div className="rounded-[18px] bg-emerald-100/45 dark:bg-emerald-900/20 px-4 py-4 border border-emerald-200/20">
                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                          Tinh thần
                        </div>
                        <p className="mt-2 text-sm leading-relaxed font-bold text-emerald-750 dark:text-emerald-300">
                          Làm vì cộng đồng, duy trì miễn phí và giúp kiến thức tài chính trở nên gần gũi hơn với mọi
                          người.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>


      </div>

      {/* ── FINAL CTA ── */}
        <section className="relative overflow-hidden bg-stone-950 border-t border-stone-850">
          <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-emerald-500/15 blur-2xl" />
          <ScrollReveal className="relative max-w-3xl mx-auto px-6 py-8 sm:py-10 text-center">
            <ShieldCheck className="icon-bounce w-7 h-7 text-emerald-400 mx-auto mb-2" />
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-1.5">Sẵn sàng hiểu tiền bạc của chính mình?</h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4 max-w-xl mx-auto font-medium">
              Không mất phí, không cần thẻ, học ngay trong 30 giây.
            </p>
            <Link
              href="/login?mode=signup"
              className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-950 font-black px-6 py-2.5 rounded-2xl transition-all shadow-md active:scale-[0.98] text-xs sm:text-sm cursor-pointer"
            >
              Bắt đầu học miễn phí
              <ArrowRight className="icon-micro w-4 h-4" />
            </Link>
          </ScrollReveal>
        </section>

        {/* ── RICH FOOTER ── */}
        <footer className="bg-stone-950 text-stone-300 border-t border-stone-850 relative z-10 pt-6 pb-6 font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-12 pb-6 border-b border-stone-850">
              {/* Col 1: Brand Info */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2.5">
                  <Logo size={32} />
                  <span className="text-lg font-black tracking-tight text-white">Tự Học Tài Chính</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
                  Nền tảng tự học tài chính cá nhân, tài chính doanh nghiệp và CFA miễn phí 100%. Giúp người Việt làm chủ tiền bạc bằng phương pháp Spaced Repetition và Game Kingdom.
                </p>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3 py-1 text-[11px] font-bold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Cộng đồng 430+ bài học & Quiz tương tác</span>
                </div>
              </div>

              {/* Col 2: Lộ trình */}
              <div className="lg:col-span-2 space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-white">Lộ trình học</p>
                <ul className="space-y-2 text-xs text-stone-400 font-semibold">
                  <li>
                    <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">Tài chính cá nhân</Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">Tài chính doanh nghiệp</Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">Chứng chỉ CFA Level 1</Link>
                  </li>
                  <li>
                    <Link href="/game" className="hover:text-emerald-400 transition-colors">Game Kingdom RPG</Link>
                  </li>
                </ul>
              </div>

              {/* Col 3: Hệ sinh thái */}
              <div className="lg:col-span-3 space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-white">Hệ sinh thái</p>
                <ul className="space-y-2 text-xs text-stone-400 font-semibold">
                  <li>
                    <Link href="/nhom-hoc" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                      <span>Phòng Học Nhóm (3D)</span>
                      <span className="text-[9px] font-bold text-amber-400 bg-amber-950 px-1.5 py-0.2 rounded-md">Hot</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/finsocial" className="hover:text-emerald-400 transition-colors">FinSocial - Feed Bài Viết</Link>
                  </li>
                  <li>
                    <Link href="/su-nghiep" className="hover:text-emerald-400 transition-colors">Bản Đồ Sự Nghiệp Tài Chính</Link>
                  </li>
                  <li>
                    <Link href="/shop" className="hover:text-emerald-400 transition-colors">Cửa Hàng Cosmetic & Avatar</Link>
                  </li>
                </ul>
              </div>

              {/* Col 4: Pháp lý & Hỗ trợ */}
              <div className="lg:col-span-2 space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-white">Hỗ trợ & Pháp lý</p>
                <ul className="space-y-2 text-xs text-stone-400 font-semibold">
                  <li>
                    <Link href="/dieu-khoan" className="hover:text-emerald-400 transition-colors">Điều khoản sử dụng</Link>
                  </li>
                  <li>
                    <Link href="/chinh-sach-bao-mat" className="hover:text-emerald-400 transition-colors">Chính sách bảo mật</Link>
                  </li>
                  <li>
                    <Link href="/login" className="hover:text-emerald-400 transition-colors">Đăng nhập / Đăng ký</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom copyright line */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 font-semibold">
              <p>© 2026 Tự Học Tài Chính. Tất cả quyền được bảo lưu.</p>
              <p className="flex items-center gap-1 text-[11px] text-stone-400">
                <span>Học tài chính miễn phí cho người Việt 🇻🇳</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
