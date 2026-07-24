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
import { useRoutePrefetch } from "@/lib/use-route-prefetch";
import { getLeaderboardByMetric, type LeaderboardRow } from "@/lib/supabase-user";

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
    text: "Người muốn hiểu tiền, tiết kiệm, đầu tư, nợ, ngân sách và cách ra quyết định tài chính hằng ngày.",
  },
  {
    title: "Người học CFA",
    text: "Ai cần nền tảng kiến thức chắc hơn để học CFA, luyện tư duy phân tích và tăng độ bền kiến thức.",
  },
  {
    title: "Financial planner",
    text: "Người làm tư vấn hoặc lập kế hoạch tài chính cần hệ thống hóa kiến thức để tư vấn tự tin hơn.",
  },
  {
    title: "Investor",
    text: "Nhà đầu tư cá nhân muốn hiểu doanh nghiệp, định giá, dòng tiền và chất lượng tài sản sâu hơn.",
  },
  {
    title: "Kế toán mới vào nghề",
    text: "Người mới đi làm cần củng cố nền tảng để đọc số liệu, hiểu báo cáo và giao tiếp tài chính tốt hơn.",
  },
  {
    title: "Tài chính chuyên nghiệp mới vào nghề",
    text: "Nhân sự finance/FP&A/analysis mới vào nghề cần một hệ thống học nhanh, rõ và bền hơn.",
  },
] as const;

export default function HomePage() {
  const [displayedUserCount, setDisplayedUserCount] = useState(0);
  const [displayedLessonCount, setDisplayedLessonCount] = useState(0);
  const [displayedCompletedCount, setDisplayedCompletedCount] = useState(0);
  const [publicLeaderboard, setPublicLeaderboard] = useState<LeaderboardRow[]>([]);
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
  const heroChartBars = [
    {
      label: "Người học",
      value: displayedUserCount,
      max: Math.max(displayedUserCount, displayedCompletedCount, displayedLessonCount, 1000),
      tone: "from-emerald-300 to-emerald-500",
    },
    {
      label: "Bài học",
      value: displayedLessonCount,
      max: Math.max(displayedUserCount, displayedCompletedCount, displayedLessonCount, 1000),
      tone: "from-cyan-300 to-emerald-400",
    },
    {
      label: "Hoàn thành",
      value: displayedCompletedCount,
      max: Math.max(displayedUserCount, displayedCompletedCount, displayedLessonCount, 1000),
      tone: "from-amber-200 to-amber-400",
    },
    {
      label: "Top XP",
      value: publicLeaderboard[0]?.value ?? 0,
      max: Math.max(displayedUserCount, displayedCompletedCount, displayedLessonCount, publicLeaderboard[0]?.value ?? 0, 1000),
      tone: "from-orange-300 to-amber-500",
    },
  ];

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

  useEffect(() => {
    let cancelled = false;
    getLeaderboardByMetric("xp", 4)
      .then((rows) => {
        if (!cancelled) setPublicLeaderboard(rows);
      })
      .catch((error) => console.error("Error loading homepage leaderboard data:", error));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white dark:bg-stone-950 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:20px_20px] transition-colors duration-300">
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
      <div className="pointer-events-none absolute inset-0 landing-drift-grid bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:28px_28px] z-0" />
      <div className="pointer-events-none absolute inset-0 landing-aurora z-0 opacity-70">
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
        <div className="relative overflow-hidden bg-[#DA251D]">
          <div className="pointer-events-none absolute -top-8 -right-8 text-[100px] leading-none text-[#FFCD00]/10 select-none">
            ★
          </div>
          <div className="relative max-w-6xl mx-auto px-6 py-2.5 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-3 sm:text-left">
            <span className="hidden sm:inline text-lg leading-none text-[#FFCD00]" aria-hidden="true">
              ★
            </span>
            <p className="text-sm font-semibold text-white/90 leading-relaxed">
              Cam kết toàn bộ bài học tại đây <strong className="text-[#FFCD00]">miễn phí mãi mãi</strong> vì sự phát
              triển của cộng đồng học tài chính cá nhân, CFA, lập kế hoạch tài chính, đầu tư, và người làm tài chính
              tại Việt Nam.
            </p>
            <a
              href="https://www.facebook.com/share/g/1C2jTdsgF5/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-sm font-black text-white hover:underline whitespace-nowrap"
            >
              Tham gia group Facebook
              <ArrowRight className="icon-micro w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ── NAV ── */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-stone-950/80 backdrop-blur-sm border-b border-stone-100 dark:border-stone-900">
          <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Logo size={26} />
              <span className="text-sm font-black text-stone-700 dark:text-stone-300 uppercase tracking-widest hidden sm:inline-flex items-center gap-2">
                Tự Học Tài Chính
                <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200/50">
                  🇻🇳 VIỆT NAM
                </span>
              </span>
            </div>
            <Link
              href="/login"
              className="cta-electric group inline-flex items-center gap-2 rounded-[20px] border border-emerald-200/80 dark:border-emerald-800 bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-sm font-bold text-white shadow-[0_12px_28px_-20px_rgba(16,185,129,0.35)] transition-all hover:shadow-[0_16px_34px_-22px_rgba(16,185,129,0.45)]"
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

          <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-14 lg:pt-20 lg:pb-20">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-white/80 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700 backdrop-blur-sm dark:border-emerald-900 dark:bg-stone-950/55 dark:text-emerald-300"
                >
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
                  </span>
                  Kiến thức chuẩn quốc tế · Bản sắc thực tế Việt Nam 🇻🇳
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.06 }}
                  className="mb-4 max-w-3xl text-[3.25rem] font-black leading-[0.92] tracking-tight text-stone-950 dark:text-stone-50 lg:text-[4.6rem]"
                >
                  Bước vào thế giới{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-300 dark:to-teal-200">
                    tài chính
                  </span>
                  ,<br />học như đang lên cấp
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
                  className="mb-8 max-w-xl text-[15px] leading-7 text-stone-650 dark:text-stone-300 sm:text-lg"
                >
                  {lessonCountFloor ?? 360}+ bài học - 100% miễn phí vĩnh viễn - giáo trình thiết kế riêng cho người Việt học tài chính cá
                  nhân, CFA, lập kế hoạch tài chính, đầu tư, kế toán và tài chính chuyên nghiệp. Học theo phương pháp
                  Spaced Repetition khoa học.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: 0.18 }}
                  className="mb-10 flex flex-wrap items-center gap-3"
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
                  className="relative hidden justify-center lg:flex"
                >
                <div className="landing-float relative w-full max-w-[520px] overflow-hidden rounded-[20px] border border-stone-200/80 bg-stone-950 text-white shadow-[0_18px_44px_-30px_rgba(15,23,42,0.36)] dark:border-stone-800 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_22px_50px_-28px_rgba(15,23,42,0.4)]">
                  <div className="absolute inset-0">
                    <Image
                      src="/charging-bull.jpg"
                      alt="Charging bull"
                      fill
                      sizes="520px"
                      className="object-cover object-center opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-950/92 via-stone-950/58 to-emerald-950/55" />
                  </div>

                  <div
                      className="relative p-6"
                      style={{
                        transform: `perspective(1200px) translate3d(${heroParallaxX * 0.5}px, ${heroParallaxY * 0.35}px, 0)`,
                      }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200 backdrop-blur">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                        Trung tâm chỉ huy
                      </div>
                      <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-amber-100">
                        Live Mode
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-[1.15fr_0.85fr]">
                      <div
                        className="rounded-[1.6rem] border border-white/12 bg-white/10 p-4 backdrop-blur-sm"
                        style={{
                          transform: `perspective(1200px) translate3d(${heroParallaxX * 0.8}px, ${heroParallaxY * 0.6}px, 0) rotateY(${heroParallaxX * 0.45}deg)`,
                        }}
                      >
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-stone-400">Biểu đồ 3D</p>
                            <p className="mt-1 text-sm font-black text-white">Tiến độ học trong tuần</p>
                          </div>
                          <div className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-black text-emerald-200">
                            72% tiến độ
                          </div>
                        </div>
                        <div className="flex h-44 items-end gap-2 rounded-[1.35rem] border border-white/10 bg-stone-950/45 px-4 pb-4 pt-6">
                          {heroChartBars.map((bar, index) => (
                            <div key={bar.label} className="group flex flex-1 flex-col items-center gap-2">
                              <div className="relative h-full w-full">
                                <div className="absolute inset-x-1 bottom-0 h-full rounded-t-[18px] bg-white/5" />
                                <div
                                  className={`absolute inset-x-1 bottom-0 rounded-t-[18px] bg-gradient-to-t ${bar.tone} shadow-[0_18px_24px_-20px_rgba(16,185,129,0.45)]`}
                                  style={{
                                    height: `${Math.max(16, (bar.value / bar.max) * 100)}%`,
                                    transform: `perspective(600px) translate3d(${(index - 2.5) * 1.2}px, ${(heroParallaxY * index) / 18}px, 0) rotateX(16deg)`,
                                    transformOrigin: "bottom center",
                                  }}
                                />
                                <div className="absolute inset-x-1 bottom-0 h-4 rounded-b-[18px] bg-white/15 blur-[1px]" />
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-[0.14em] text-stone-300">{bar.label}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {[
                            ["Bài học", displayedLessonCount.toLocaleString("vi-VN")],
                            ["Quiz đúng", `${Math.max(72, Math.min(98, (displayedCompletedCount % 100) || 78))}%`],
                            ["XP top", `${publicLeaderboard[0]?.value?.toLocaleString("vi-VN") ?? "0"} XP`],
                          ].map(([label, value]) => (
                            <div key={label} className="rounded-[16px] border border-white/10 bg-white/8 px-3 py-2">
                              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-stone-400">{label}</p>
                              <p className="mt-1 text-sm font-black text-white">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div
                          className="rounded-[1.45rem] border border-white/12 bg-white/10 p-4 backdrop-blur-sm"
                          style={{
                            transform: `perspective(1200px) translate3d(${heroParallaxX * 1.1}px, ${heroParallaxY * 0.8}px, 0) rotateY(${heroParallaxX * 0.7}deg)`,
                          }}
                        >
                          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-stone-300">Cộng đồng</p>
                          <p className="mt-2 text-sm font-black text-white">FinSocial + Học nhóm</p>
                          <p className="mt-1 text-xs leading-relaxed text-stone-300">Đọc phân tích ngắn, hỏi đáp nhanh, giữ nhịp với nhóm học mỗi ngày.</p>
                        </div>
                        <div
                          className="rounded-[1.45rem] border border-white/12 bg-white/10 p-4 backdrop-blur-sm"
                          style={{
                            transform: `perspective(1200px) translate3d(${heroParallaxX * 1.6}px, ${heroParallaxY * 1.15}px, 0) rotateY(${heroParallaxX * 0.9}deg)`,
                          }}
                        >
                          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-stone-300">Game Kingdom</p>
                          <p className="mt-2 text-sm font-black text-white">Mở khóa bằng kiến thức</p>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div className="preview-progress-live h-full w-3/4 rounded-full bg-gradient-to-r from-amber-300 to-emerald-300" />
                          </div>
                        </div>
                        <div className="rounded-[1.45rem] border border-emerald-300/20 bg-emerald-400/10 p-4 backdrop-blur-sm">
                          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200">Bản xem trước</p>
                          <p className="mt-2 text-sm font-black text-white">Card lơ lửng + parallax</p>
                          <p className="mt-1 text-xs leading-relaxed text-stone-300">Di chuột qua hero để thấy lớp sáng và độ nổi thay đổi nhẹ theo vị trí con trỏ.</p>
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
          <div className="max-w-6xl mx-auto px-6">
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
        <section className="landing-band landing-band-glass landing-band-divider backdrop-blur-sm py-16 lg:py-20 relative border-y border-stone-150/40 dark:border-stone-850/40">
          <div className="max-w-6xl mx-auto px-6 grid gap-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(360px,360px)] lg:items-stretch">
            <ScrollReveal className="h-full">
              <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                Cộng đồng thật
              </p>
              <h2 className="max-w-3xl text-3xl font-black text-stone-900 dark:text-stone-100 mb-4 leading-snug">
                Học viên nổi bật đang học mỗi ngày, từ tài chính cá nhân đến CFA và nghề nghiệp tài chính
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-stone-600 dark:text-stone-400 mb-5">
                Đây không phải bảng số liệu trang trí. Người mới vào có thể nhìn ngay ai đang học thật, ai giữ được nhịp đều,
                và cảm giác tiến bộ trong hệ thống trông ra sao.
              </p>
              <PublicLeaderboardPreview />
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="h-full">
              <div className="animated-border-card flex h-full flex-col rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
                  <Sparkles className="icon-bounce h-3.5 w-3.5" />
                  Vì sao cộng đồng này giữ chân người học
                </div>

                <div className="mt-4 flex-1 space-y-3">
                  {[
                    "Không dùng thử giới hạn ngày",
                    "Không quảng cáo xen giữa bài học",
                    "Nội dung được cập nhật và mở rộng liên tục",
                  ].map((line) => (
                    <div key={line} className="flex items-start gap-2.5 rounded-[18px] border border-stone-100 bg-stone-50/80 px-3.5 py-3 dark:border-stone-800 dark:bg-stone-950/40">
                      <CheckCircle2 className="icon-micro w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-stone-600 dark:text-stone-400 font-medium leading-relaxed">{line}</span>
                    </div>
                  ))}

                  <div className="grid gap-2 pt-1 sm:grid-cols-2">
                    {[
                      { label: "Bục vinh quang", value: "Top 3 theo XP thật" },
                      { label: "Huy hiệu", value: "Preview thành tích học tập" },
                      { label: "Cập nhật live", value: "Người đang hoạt động" },
                      { label: "Nhịp học", value: "Giữ đều mỗi ngày" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-[18px] border border-emerald-100 bg-emerald-50/60 px-3.5 py-3 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-bold text-stone-900 dark:text-stone-100">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/login?mode=signup"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[18px] bg-stone-900 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-600 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-emerald-300"
                >
                  Vào học cùng cộng đồng
                  <ArrowRight className="icon-micro w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── GAME KINGDOM PREVIEW ── */}
        <section className="landing-band landing-band-dark landing-band-divider relative py-14 lg:py-18">
          <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal className="max-w-3xl mb-8">
            <p className="text-xs font-black text-amber-200 uppercase tracking-widest mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
              Xem trước Game Kingdom
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.72)]">
              Một vương quốc tài chính để bạn mở khóa bằng kiến thức
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)] sm:text-base">
              Game Kingdom biến việc học thành nhiệm vụ: hoàn thành bài, làm quiz, chơi mini game và mở dần các công trình
              tài chính. Hình ảnh bên dưới dùng trực tiếp các asset trong game để người mới thấy rõ mình sẽ bước vào đâu.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="overflow-hidden rounded-[20px] border border-stone-200/80 bg-white shadow-[0_18px_44px_-30px_rgba(120,53,15,0.24)] dark:border-stone-800 dark:bg-stone-900">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-stone-100 bg-stone-50 px-4 py-2.5 dark:border-stone-850 dark:bg-stone-950/60">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex shrink-0 gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                  </div>
                  <div className="min-w-0 flex-1 truncate rounded-full border border-stone-200 bg-white px-4 py-1 text-center text-[11px] font-semibold text-stone-400 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-500">
                    tuhoctaichinh.vn/game
                  </div>
                </div>
                <div className="flex shrink-0 gap-1 rounded-full border border-stone-200 bg-white p-0.5 dark:border-stone-800 dark:bg-stone-900">
                  <span className="rounded-full bg-stone-900 px-2.5 py-1 text-[10px] font-bold text-white dark:bg-stone-100 dark:text-stone-900">
                    Kingdom
                  </span>
                  <span className="rounded-full px-2.5 py-1 text-[10px] font-bold text-stone-400 dark:text-stone-500">
                    Mini game
                  </span>
                </div>
              </div>

              <div className="relative min-h-[520px] overflow-hidden bg-stone-950 p-4 sm:p-6 lg:p-8">
                <Image
                  src="/wallstreet-nyse-header.jpg"
                  alt="Sàn giao dịch tài chính làm nền cho Game Kingdom"
                  fill
                  sizes="100vw"
                  className="object-cover opacity-45"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-stone-950/95 via-stone-950/55 to-amber-950/45" />
                <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:22px_22px] opacity-20" />

                <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_340px]">
                  <div className="min-w-0">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/45 bg-amber-300/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-amber-100 shadow-[0_10px_26px_-18px_rgba(251,191,36,0.35)]">
                          <Crown className="h-3.5 w-3.5" />
                          Vương quốc Game Tài Chính
                        </div>
                        <h3 className="mt-3 text-2xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:text-3xl">
                          Bản đồ nhiệm vụ hôm nay
                        </h3>
                      </div>
                      <div className="rounded-[18px] border border-emerald-400/35 bg-emerald-400/12 px-4 py-3 text-right backdrop-blur shadow-[0_12px_28px_-22px_rgba(16,185,129,0.35)]">
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-100">XP phiên chơi</p>
                        <p className="mt-1 text-2xl font-black tabular-nums text-white">+240 XP</p>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {KINGDOM_BUILDINGS.map((building, i) => (
                        <div
                          key={building.name}
                          className="group overflow-hidden rounded-[20px] border border-white/15 bg-white/10 shadow-[0_16px_34px_-26px_rgba(0,0,0,0.4)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-300/60"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={building.image}
                              alt={`${building.name} trong Game Kingdom`}
                              fill
                              sizes="(max-width: 1024px) 100vw, 24vw"
                              className="object-cover transition duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-3 right-3">
                              <p className="text-sm font-black text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">{building.name}</p>
                              <p className="text-[11px] font-semibold text-amber-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]">{building.label}</p>
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.12em] text-stone-300">
                              <span>Mở khóa</span>
                              <span className="text-amber-200">{building.progress}</span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                              <div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-emerald-300" style={{ width: building.progress }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {[
                        ["Mini game", "Ghép khái niệm, phân loại tài sản, trả lời nhanh"],
                        ["Nhiệm vụ", "Hoàn thành bài học để nhận XP và mở công trình"],
                        ["Danh hiệu", "Leo hạng Game thủ và khoe thành tích học tập"],
                      ].map(([title, text]) => (
                        <div key={title} className="rounded-[18px] border border-white/10 bg-stone-950/45 p-4 backdrop-blur">
                          <p className="text-sm font-black text-white">{title}</p>
                          <p className="mt-1 text-xs leading-relaxed text-stone-300">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <aside className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
                    <div className="relative mx-auto mb-4 h-36 w-36">
                      <div className="absolute inset-0 rounded-full bg-amber-300/25 blur-2xl" />
                      <Image
                        src="/charging-bull-3d.png"
                        alt="Linh vật bò tài chính trong Game Kingdom"
                        fill
                        sizes="144px"
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                    <div className="rounded-[18px] border border-amber-300/30 bg-amber-300/10 p-4">
                      <div className="flex items-center gap-2">
                        <Trophy className="icon-bounce h-4 w-4 text-amber-100" />
                        <p className="text-sm font-black text-white">Nhiệm vụ nổi bật</p>
                      </div>
                      <div className="mt-3 space-y-2">
                        {[
                          "Hoàn thành 1 bài học tài chính",
                          "Thắng 1 mini game bất kỳ",
                          "Đạt 100% ở quiz nhanh",
                        ].map((task, i) => (
                          <div key={task} className="flex items-center gap-2 rounded-[16px] bg-stone-950/45 px-3 py-2 text-xs font-semibold text-stone-200">
                            <span className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-emerald-300" : "bg-amber-300"}`} />
                            {task}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Link
                      href="/login?mode=signup"
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[18px] bg-white px-5 py-3 text-sm font-black text-stone-950 shadow-[0_12px_28px_-20px_rgba(15,23,42,0.24)] transition hover:-translate-y-0.5 hover:bg-amber-50"
                    >
                      <Zap className="h-4 w-4 text-amber-500" />
                      Vào Game Kingdom
                    </Link>
                  </aside>
                </div>
              </div>
            </div>
          </ScrollReveal>
          </div>
        </section>

        {/* ── FEATURE SHOWCASE ── */}
        <section className="landing-band landing-band-emerald landing-band-divider relative py-16 lg:py-20 border-y border-stone-150/40 dark:border-stone-850/40">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal className="max-w-3xl mb-10">
              <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                Không chỉ là bài học
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-stone-900 dark:text-stone-100">
                Học, chơi, hỏi đáp và chia sẻ trong cùng một hệ sinh thái tài chính
              </h2>
              <p className="mt-3 max-w-xl text-sm text-stone-600 dark:text-stone-400 leading-relaxed sm:text-base">
                Sau khi tạo tài khoản, bạn không chỉ đi qua lộ trình bài học. Bạn còn có Game Kingdom để luyện phản xạ,
                Học nhóm để giữ nhịp, và FinSocial để trao đổi kiến thức với cộng đồng.
              </p>
            </ScrollReveal>

            <div className="grid gap-5 lg:grid-cols-3">
              {FEATURE_SHOWCASE.map(({ eyebrow, title, text, image, alt, icon: Icon, href, cta, bullets }, i) => (
                <ScrollReveal key={eyebrow} delay={i * 0.08}>
                  <article className="animated-border-card group h-full overflow-hidden rounded-[20px] border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-950 shadow-[0_10px_24px_-24px_rgba(15,23,42,0.2)] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_14px_30px_-24px_rgba(16,185,129,0.22)]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-900">
                      <Image
                        src={image}
                        alt={alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent" />
                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-[18px] border border-white/25 bg-stone-950/70 px-3 py-2 text-xs font-black text-white backdrop-blur">
                        <Icon className="h-4 w-4 text-emerald-300" />
                        {eyebrow}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-black leading-tight text-stone-950 dark:text-stone-50">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                        {text}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {bullets.map((bullet) => (
                          <span
                            key={bullet}
                            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300"
                          >
                            <CheckCircle2 className="icon-micro h-3.5 w-3.5" />
                            {bullet}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={href}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-black text-stone-950 transition-colors hover:text-emerald-700 dark:text-stone-100 dark:hover:text-emerald-300"
                      >
                        {cta}
                        <ArrowRight className="icon-micro h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PAIN POINTS / TRUST ── */}
        <section className="landing-band landing-band-soft relative py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal className="max-w-2xl mb-10">
            <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
              Vì sao học viên chọn ở lại
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-stone-900 dark:text-stone-100">
              Những lo lắng thường gặp khi tự học tài chính
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {PAIN_POINTS.map(({ icon: Icon, worry, answer }, i) => (
              <ScrollReveal key={worry} delay={i * 0.08}>
                <div className="animated-border-card h-full rounded-[20px] border border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 backdrop-blur-md p-6 hover:border-emerald-500/50 dark:hover:border-emerald-850 hover:shadow-[0_12px_28px_-24px_rgba(15,23,42,0.18)] transition-all duration-200 ease-out group hover:-translate-y-1">
                  <span className="inline-flex w-12 h-12 rounded-[18px] bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/20 items-center justify-center mb-4 border border-emerald-100/60 dark:border-emerald-900/30 transition-transform duration-200 ease-out group-hover:scale-[1.02]">
                    <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </span>
                  <p className="text-sm font-bold text-stone-500 dark:text-stone-500 italic mb-2">“{worry}”</p>
                  <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                    {answer.replace("{count}", String(lessonCountFloor ?? 360))}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          </div>
        </section>

        {/* ── METHOD (Spaced Repetition) ── */}
        <section className="bg-stone-50/50 dark:bg-stone-900/20 backdrop-blur-sm py-16 lg:py-20 border-y border-stone-150/40 dark:border-stone-850/40">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal className="max-w-2xl mb-10">
              <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                Phương pháp học
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-stone-900 dark:text-stone-100 mb-3">
                Spaced Repetition - học ít, nhớ lâu
              </h2>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed font-medium">
                Không phải mẹo riêng của chúng tôi - đây là phương pháp ôn tập ngắt quãng được khoa học nhận thức
                nghiên cứu kỹ nhất, dựa trên đường cong quên lãng (Ebbinghaus forgetting curve).
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {METHOD_STEPS.map(({ step, title, text }, i) => (
                <ScrollReveal key={step} delay={i * 0.08}>
                  <div className="animated-border-card h-full rounded-[20px] bg-white/70 dark:bg-stone-900/60 backdrop-blur-md border border-stone-200/80 dark:border-stone-800 p-6 hover:shadow-[0_12px_28px_-24px_rgba(15,23,42,0.18)] hover:-translate-y-1 transition-all duration-200 ease-out">
                    <div className="w-8 h-8 rounded-[14px] bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm flex items-center justify-center mb-4 shadow-[0_10px_22px_-18px_rgba(16,185,129,0.35)] transition-transform duration-200 ease-out group-hover:scale-[1.02]">
                      {step}
                    </div>
                    <p className="font-extrabold text-stone-900 dark:text-stone-100 mb-2">{title}</p>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-medium">{text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO IT IS FOR ── */}
        <section className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <ScrollReveal className="max-w-2xl mb-10">
            <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
              Đối tượng phù hợp
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-stone-900 dark:text-stone-100">
              Nền tảng này dành cho ai?
            </h2>
            <p className="mt-3 text-stone-600 dark:text-stone-400 leading-relaxed">
              Mục tiêu của chúng tôi là đem kiến thức tài chính đến với nhiều nhóm người học khác nhau, từ tự học cá
              nhân đến lộ trình nghề nghiệp chuyên sâu.
            </p>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCES.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.05}>
                <div className="animated-border-card h-full rounded-[20px] border border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 backdrop-blur-md p-6 hover:border-emerald-500/50 dark:hover:border-emerald-800/80 hover:shadow-[0_12px_28px_-24px_rgba(16,185,129,0.16)] transition-all duration-200 ease-out hover:-translate-y-1.5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/70 dark:border-emerald-900/40 dark:bg-emerald-950/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300 mb-4">
                    Phù hợp
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── VISION & MISSION ── */}
        <section className="relative max-w-6xl mx-auto px-6 pb-16 lg:pb-20">
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

        {/* ── TRACKS ── */}
        <section className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <ScrollReveal className="max-w-2xl mb-8">
            <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
              Lộ trình
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100">
              Chọn lộ trình phù hợp với bạn
            </h2>
          </ScrollReveal>

          <ScrollReveal className="max-w-2xl">
            <TrackPreviewPanel previewTrack={previewTrack} setPreviewTrack={setPreviewTrack} />
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[18px] border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/70 dark:bg-emerald-950/20 px-5 py-4">
              <div>
                <p className="text-sm font-bold text-stone-900 dark:text-stone-100">Chưa chắc nên đi track nào?</p>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                  Tạo tài khoản và vào thẳng bài đầu tiên, hệ thống sẽ giúp bạn chỉnh lại hành trình sau.
                </p>
              </div>
              <Link
                href="/login?mode=signup"
                className="inline-flex items-center justify-center gap-2 rounded-[18px] bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white px-5 py-3 text-sm font-bold text-white dark:text-stone-900 transition-colors whitespace-nowrap"
              >
                Tạo hành trình học
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="relative overflow-hidden bg-stone-900 dark:bg-stone-950">
          <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-emerald-500/20 blur-2xl" />
          <ScrollReveal className="relative max-w-3xl mx-auto px-6 py-20 text-center">
            <ShieldCheck className="icon-bounce w-10 h-10 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Sẵn sàng hiểu tiền bạc của chính mình?</h2>
            <p className="text-stone-300 leading-relaxed mb-8 max-w-xl mx-auto">
              Không mất phí, không cần thẻ, học ngay trong 30 giây.
            </p>
            <Link
              href="/login?mode=signup"
              className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-900 font-bold px-7 py-4 rounded-[18px] transition-all shadow-[0_12px_28px_-20px_rgba(15,23,42,0.24)] active:scale-[0.98]"
            >
              Bắt đầu học miễn phí
              <ArrowRight className="icon-micro w-4 h-4" />
            </Link>
          </ScrollReveal>
        </section>

        {/* ── FOOTER ── */}
        <footer className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400 dark:text-stone-600">
          <div className="flex items-center gap-2">
            <Logo size={18} />
            Tự Học Tài Chính
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dieu-khoan" className="hover:text-stone-600 dark:hover:text-stone-400">
              Điều khoản sử dụng
            </Link>
            <Link href="/chinh-sach-bao-mat" className="hover:text-stone-600 dark:hover:text-stone-400">
              Chính sách bảo mật
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
