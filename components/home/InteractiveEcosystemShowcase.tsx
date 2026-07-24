"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  Users,
  MessageSquareMore,
  ArrowRight,
  CheckCircle2,
  Heart,
  MessageCircle,
  Share2,
  Flame,
  Sparkles,
  Send,
  Crown,
  Zap,
  TrendingUp,
  ThumbsUp,
  Bookmark,
} from "lucide-react";
import InteractiveKingdomPreview from "@/components/home/InteractiveKingdomPreview";

type TabId = "game" | "study-group" | "finsocial";

// Sample Posts for FinSocial Preview
const FINSOCIAL_POSTS = [
  {
    id: "p1",
    author: "Hà Tường Vy",
    avatar: "/avatars/avatar-1.png",
    level: 5,
    role: "CFA Level 1 Candidate",
    time: "2 giờ trước",
    topic: "Phân tích BCTC",
    title: "💡 Bí quyết đọc nhanh Báo cáo lưu chuyển tiền tệ (Cash Flow) trong 5 phút",
    content:
      "Nhiều bạn mới học tài chính thường bỏ qua báo cáo lưu chuyển tiền tệ mà chỉ nhìn lợi nhuận trên Báo cáo KQKD. Nhớ quy tắc: Lợi nhuận có thể là sổ sách, nhưng Dòng tiền từ HĐKD (CFO) mới là dòng máu thực sự của doanh nghiệp!",
    likes: 42,
    comments: 12,
    shares: 8,
    tags: ["#CashFlow", "#DocBCTC", "#Dautu"],
  },
  {
    id: "p2",
    author: "Đình Trí Bùi",
    avatar: "/avatars/avatar-2.png",
    level: 7,
    role: "Financial Planner",
    time: "4 giờ trước",
    topic: "Tài chính cá nhân",
    title: "📊 Quy tắc 50/30/20 có còn phù hợp với bối cảnh lạm phát hiện tại?",
    content:
      "50% Nhu cầu thiết yếu - 30% Sở thích - 20% Tiết kiệm & Đầu tư. Nếu chi phí sinh hoạt tăng cao, hãy ưu tiên cố định 20% Tiết kiệm trước (Pay Yourself First) rồi mới phân bổ 80% còn lại!",
    likes: 89,
    comments: 24,
    shares: 19,
    tags: ["#PersonalFinance", "#QuyTac503020", "#TietKiem"],
  },
];

export default function InteractiveEcosystemShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>("game");

  // Study Group Interactive Mock State
  const [cheerLog, setCheerLog] = useState<{ id: string; user: string; text: string }[]>([
    { id: "1", user: "Hà Hồng", text: "Hôm nay mình vừa hoàn thành bài P/E rồi nhé! 🔥" },
    { id: "2", user: "Nguyễn Thị Thu", text: "Tuyệt vời! Cùng đua 500 XP tuần này nào! 🚀" },
  ]);
  const [cheerInput, setCheerInput] = useState("");

  // FinSocial Interactive Mock State
  const [postLikes, setPostLikes] = useState<Record<string, { count: number; liked: boolean }>>({
    p1: { count: 42, liked: false },
    p2: { count: 89, liked: false },
  });

  function handleSendGroupMsg() {
    if (!cheerInput.trim()) return;
    setCheerLog((prev) => [
      ...prev,
      { id: String(Date.now()), user: "Bạn", text: cheerInput.trim() },
    ]);
    setCheerInput("");
  }

  function handleQuickCheer(emojiText: string) {
    setCheerLog((prev) => [
      ...prev,
      { id: String(Date.now()), user: "Bạn", text: emojiText },
    ]);
  }

  function toggleLike(postId: string) {
    setPostLikes((prev) => {
      const current = prev[postId] || { count: 0, liked: false };
      const newLiked = !current.liked;
      return {
        ...prev,
        [postId]: {
          count: newLiked ? current.count + 1 : current.count - 1,
          liked: newLiked,
        },
      };
    });
  }

  return (
    <div className="space-y-8">
      {/* Top 3 Interactive Feature Selection Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Card 1: Game Kingdom */}
        <div
          onClick={() => setActiveTab("game")}
          className={`animated-border-card group cursor-pointer overflow-hidden rounded-[22px] border-2 transition-all duration-300 backdrop-blur-md p-5 flex flex-col justify-between ${
            activeTab === "game"
              ? "border-amber-400 bg-amber-950/20 dark:bg-amber-950/40 shadow-[0_12px_36px_-16px_rgba(245,158,11,0.35)] ring-2 ring-amber-400/40 scale-[1.01]"
              : "border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 hover:border-amber-400/60 hover:bg-white dark:hover:bg-stone-900"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-500/10 px-3 py-1 text-[11px] font-black uppercase text-amber-600 dark:text-amber-300">
                <Gamepad2 className="w-3.5 h-3.5 text-amber-500" />
                Game Kingdom
              </span>
              {activeTab === "game" && (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-black text-stone-950 dark:text-stone-50 leading-snug">
              Học tài chính như mở bản đồ vương quốc
            </h3>
            <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Làm nhiệm vụ, thử thách mini game, tích lũy XP và mở khóa các công trình tài chính thực tế.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between text-xs font-black">
            <span className={activeTab === "game" ? "text-amber-600 dark:text-amber-400" : "text-stone-400"}>
              {activeTab === "game" ? "● Đang xem Live Preview" : "Bấm để xem thử"}
            </span>
            <ArrowRight className={`w-4 h-4 transition-transform ${activeTab === "game" ? "translate-x-1 text-amber-500" : "text-stone-400 group-hover:translate-x-1"}`} />
          </div>
        </div>

        {/* Card 2: Học nhóm */}
        <div
          onClick={() => setActiveTab("study-group")}
          className={`animated-border-card group cursor-pointer overflow-hidden rounded-[22px] border-2 transition-all duration-300 backdrop-blur-md p-5 flex flex-col justify-between ${
            activeTab === "study-group"
              ? "border-emerald-400 bg-emerald-950/20 dark:bg-emerald-950/40 shadow-[0_12px_36px_-16px_rgba(16,185,129,0.35)] ring-2 ring-emerald-400/40 scale-[1.01]"
              : "border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 hover:border-emerald-400/60 hover:bg-white dark:hover:bg-stone-900"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-black uppercase text-emerald-600 dark:text-emerald-300">
                <Users className="w-3.5 h-3.5 text-emerald-500" />
                Học Nhóm (3D)
              </span>
              {activeTab === "study-group" && (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-black text-stone-950 dark:text-stone-50 leading-snug">
              Phòng học chung không để bạn tự học 1 mình
            </h3>
            <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Bàn tròn 3D ảo, ghép nhóm theo chủ đề, check-in nhận XP và khung chat nhóm tương tác.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between text-xs font-black">
            <span className={activeTab === "study-group" ? "text-emerald-600 dark:text-emerald-400" : "text-stone-400"}>
              {activeTab === "study-group" ? "● Đang xem Live Preview" : "Bấm để xem thử"}
            </span>
            <ArrowRight className={`w-4 h-4 transition-transform ${activeTab === "study-group" ? "translate-x-1 text-emerald-500" : "text-stone-400 group-hover:translate-x-1"}`} />
          </div>
        </div>

        {/* Card 3: FinSocial */}
        <div
          onClick={() => setActiveTab("finsocial")}
          className={`animated-border-card group cursor-pointer overflow-hidden rounded-[22px] border-2 transition-all duration-300 backdrop-blur-md p-5 flex flex-col justify-between ${
            activeTab === "finsocial"
              ? "border-sky-400 bg-sky-950/20 dark:bg-sky-950/40 shadow-[0_12px_36px_-16px_rgba(56,189,248,0.35)] ring-2 ring-sky-400/40 scale-[1.01]"
              : "border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 hover:border-sky-400/60 hover:bg-white dark:hover:bg-stone-900"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/40 bg-sky-500/10 px-3 py-1 text-[11px] font-black uppercase text-sky-600 dark:text-sky-300">
                <MessageSquareMore className="w-3.5 h-3.5 text-sky-500" />
                FinSocial
              </span>
              {activeTab === "finsocial" && (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500" />
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-black text-stone-950 dark:text-stone-50 leading-snug">
              Mạng xã hội học tài chính chia sẻ bài ngắn
            </h3>
            <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Feed tin tức bài viết ngắn, hỏi đáp thực tế, thảo luận phân tích BCTC và thả cảm xúc.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between text-xs font-black">
            <span className={activeTab === "finsocial" ? "text-sky-600 dark:text-sky-400" : "text-stone-400"}>
              {activeTab === "finsocial" ? "● Đang xem Live Preview" : "Bấm để xem thử"}
            </span>
            <ArrowRight className={`w-4 h-4 transition-transform ${activeTab === "finsocial" ? "translate-x-1 text-sky-500" : "text-stone-400 group-hover:translate-x-1"}`} />
          </div>
        </div>
      </div>

      {/* Main Dynamic Stage Display */}
      <AnimatePresence mode="wait">
        {/* VIEW 1: GAME KINGDOM */}
        {activeTab === "game" && (
          <motion.div
            key="game-stage"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <InteractiveKingdomPreview />
          </motion.div>
        )}

        {/* VIEW 2: HỌC NHÓM 3D & LIVE CHAT PREVIEW */}
        {activeTab === "study-group" && (
          <motion.div
            key="study-stage"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-3xl border-2 border-emerald-500/40 bg-stone-950 shadow-[0_24px_60px_-20px_rgba(16,185,129,0.3)] text-white relative p-4 sm:p-6 lg:p-8"
          >
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src="/images/study-group-cover.jpg"
                alt="Study group background"
                fill
                sizes="100vw"
                className="object-cover opacity-25 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-stone-950/90 via-stone-950/80 to-emerald-950/90" />
            </div>

            <div className="relative z-10 grid gap-6 lg:grid-cols-12 items-stretch">
              {/* Left Column: 3D Roundtable Stage Preview */}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-b from-stone-900 via-stone-950 to-emerald-950/80 p-5 shadow-2xl relative overflow-hidden text-white min-h-[420px]">
                <div className="flex items-center justify-between shrink-0 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40 backdrop-blur-md">
                    🛋️ BÀN HỌC 3D · TÀI CHÍNH CÁ NHÂN
                  </span>
                  <div className="flex items-center gap-1 bg-stone-900/80 backdrop-blur-md px-2 py-1 rounded-2xl border border-stone-700/60 shadow-md">
                    <span className="text-[9px] font-bold text-stone-400 mr-1">Nút Cổ Vũ:</span>
                    {["👋", "❤️", "🔔", "🔥"].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleQuickCheer(`${emoji} Cổ vũ cả nhóm học tốt!`)}
                        className="hover:scale-130 transition-transform p-1 text-xs cursor-pointer"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Center 3D Roundtable */}
                <div className="relative flex-1 min-h-[260px] flex items-center justify-center my-auto">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-b from-stone-800/90 via-amber-950/90 to-stone-900 border-4 border-amber-500/60 shadow-[0_0_60px_rgba(245,158,11,0.3)] flex flex-col items-center justify-center text-center p-3 z-10 shrink-0">
                    <div className="absolute inset-2 rounded-full border border-dashed border-amber-400/40 animate-spin-slow pointer-events-none" />
                    <span className="text-3xl mb-0.5 animate-bounce inline-block">🔮</span>
                    <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest">
                      BÀN HỌC PHÒNG #102
                    </p>
                    <p className="text-xs sm:text-sm font-black text-white mt-0.5">
                      480 / 500 XP
                    </p>
                    <span className="mt-1 inline-block text-[9px] font-extrabold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                      ⚡ +15% XP BONUS
                    </span>
                  </div>

                  {/* Seated Pods */}
                  {[
                    { name: "Hà Tường Vy", level: 5, lessons: 42, top: true, pos: "absolute -top-1 left-1/2 -translate-x-1/2" },
                    { name: "Hà Hồng", level: 2, lessons: 6, pos: "absolute top-6 left-2 sm:left-4" },
                    { name: "Hoa Le", level: 1, lessons: 0, pos: "absolute top-6 right-2 sm:right-4" },
                    { name: "Đình Trí Bùi (Bạn)", level: 1, lessons: 8, me: true, pos: "absolute bottom-1 left-3 sm:left-6" },
                    { name: "Nguyễn Thị Thu", level: 1, lessons: 3, pos: "absolute bottom-1 right-3 sm:right-6" },
                  ].map((m) => (
                    <div
                      key={m.name}
                      className={`${m.pos} flex flex-col items-center text-center p-2 rounded-2xl border transition-all duration-300 w-24 sm:w-28 bg-stone-900/90 backdrop-blur-md ${
                        m.me
                          ? "border-emerald-400 bg-emerald-950/80 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105"
                          : "border-stone-700/80 hover:border-amber-400/60"
                      }`}
                    >
                      {m.top && <span className="absolute -top-3 text-base animate-bounce drop-shadow-md z-30">👑</span>}
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center font-black text-xs text-white mb-0.5">
                        {m.name.slice(0, 2).toUpperCase()}
                      </div>
                      <p className="text-[9px] font-black text-white truncate max-w-[80px]">{m.name}</p>
                      <span className="text-[8px] font-extrabold text-emerald-400 mt-0.5">🔥 {m.lessons} bài</span>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 text-center text-[10px] text-stone-400 font-semibold pt-1">
                  💡 Bấm thử các nút cổ vũ phía trên để gửi tin nhắn tương tác trực tiếp sang khung chat!
                </div>
              </div>

              {/* Right Column: Group Chat Simulator */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border-2 border-stone-800 bg-stone-900 p-4 shadow-xl text-white min-h-[420px]">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-3">
                  <h4 className="text-xs font-black uppercase text-stone-200 tracking-wider flex items-center gap-2">
                    <span>💬 Trò chuyện nhóm Live</span>
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                    Online
                  </span>
                </div>

                {/* Message Log */}
                <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[280px] pr-1 scrollbar-thin">
                  <div className="p-2.5 rounded-2xl bg-amber-950/40 border border-amber-900 text-xs">
                    <p className="text-[9px] font-black text-amber-400">Tài Tài · Quản lý nhóm</p>
                    <p className="text-[11px] text-stone-200 mt-0.5">Cập nhật hôm nay: Hà Tường Vy, Hà Hồng đã học bài. Cùng cố gắng nhé!</p>
                  </div>

                  {cheerLog.map((item) => (
                    <div
                      key={item.id}
                      className={`flex flex-col ${item.user === "Bạn" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`rounded-2xl px-3 py-2 text-xs max-w-[85%] ${
                          item.user === "Bạn"
                            ? "bg-emerald-600 text-white rounded-tr-xs"
                            : "bg-stone-800 text-stone-100 rounded-tl-xs border border-stone-700"
                        }`}
                      >
                        {item.user !== "Bạn" && (
                          <p className="text-[9px] font-bold text-emerald-400 mb-0.5">{item.user}</p>
                        )}
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Input Bar */}
                <div className="mt-3 pt-3 border-t border-stone-800 flex items-center gap-2">
                  <input
                    type="text"
                    value={cheerInput}
                    onChange={(e) => setCheerInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendGroupMsg()}
                    placeholder="Viết tin nhắn thử nghiệm..."
                    className="flex-1 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    onClick={handleSendGroupMsg}
                    className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black cursor-pointer transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: FINSOCIAL FEED PREVIEW */}
        {activeTab === "finsocial" && (
          <motion.div
            key="finsocial-stage"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-3xl border-2 border-sky-500/40 bg-stone-950 shadow-[0_24px_60px_-20px_rgba(56,189,248,0.3)] text-white relative p-4 sm:p-6 lg:p-8"
          >
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src="/wallstreet-bg.jpg"
                alt="FinSocial background"
                fill
                sizes="100vw"
                className="object-cover opacity-20 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-stone-950/90 via-stone-950/80 to-sky-950/90" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-950/80 px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-sky-300 backdrop-blur-md">
                    <MessageSquareMore className="h-3.5 w-3.5 text-sky-400" />
                    <span>FINSOCIAL FEED · BÀI VIẾT & HỎI ĐÁP THỰC TẾ</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                    Cộng đồng thảo luận kiến thức tài chính
                  </h3>
                </div>

                <Link
                  href="/login?mode=signup"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-emerald-400 px-4.5 py-2.5 text-xs font-black text-stone-950 shadow-md hover:brightness-110 transition-all cursor-pointer"
                >
                  <span>Tham gia FinSocial ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Feed Posts List */}
              <div className="grid gap-4 sm:grid-cols-2">
                {FINSOCIAL_POSTS.map((post) => {
                  const likeData = postLikes[post.id] || { count: post.likes, liked: false };
                  return (
                    <motion.div
                      key={post.id}
                      whileHover={{ scale: 1.015 }}
                      className="rounded-3xl border-2 border-stone-800 bg-stone-900/90 p-5 backdrop-blur-xl shadow-xl flex flex-col justify-between"
                    >
                      <div>
                        {/* Author Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center font-black text-xs text-sky-300">
                              {post.author.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-xs font-black text-white flex items-center gap-1.5">
                                {post.author}
                                <span className="text-[9px] font-extrabold text-sky-400 bg-sky-950 px-1.5 py-0.2 rounded-full border border-sky-800">
                                  Lv.{post.level}
                                </span>
                              </p>
                              <p className="text-[10px] text-stone-400">{post.role} · {post.time}</p>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <h4 className="text-sm font-black text-white mb-2 leading-snug">
                          {post.title}
                        </h4>
                        <p className="text-xs text-stone-300 leading-relaxed bg-stone-950/50 p-3 rounded-2xl border border-stone-800/80 mb-3">
                          {post.content}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {post.tags.map((t) => (
                            <span key={t} className="text-[10px] font-bold text-sky-300 bg-sky-950/60 border border-sky-500/30 px-2 py-0.5 rounded-md">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Actions Footer */}
                      <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs font-bold text-stone-400">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                            likeData.liked
                              ? "bg-rose-950/80 border-rose-500 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                              : "bg-stone-950 border-stone-800 hover:border-rose-400/50 hover:text-rose-300"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${likeData.liked ? "fill-rose-500 text-rose-500" : ""}`} />
                          <span>{likeData.count} Thả tim</span>
                        </button>

                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 hover:text-stone-200">
                            <MessageCircle className="w-3.5 h-3.5" />
                            {post.comments}
                          </span>
                          <span className="flex items-center gap-1 hover:text-stone-200">
                            <Share2 className="w-3.5 h-3.5" />
                            {post.shares}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
