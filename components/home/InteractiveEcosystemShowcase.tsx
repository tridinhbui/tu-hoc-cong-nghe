"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
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
  Target,
  BookOpen,
} from "lucide-react";

type TabId = "roadmap" | "study-group" | "finsocial";

// Sample Posts for FinSocial Preview (Light Mode Theme)
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
  const [activeTab, setActiveTab] = useState<TabId>("roadmap");

  // Active Recall Quiz Sampler State for Roadmap Tab
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);

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
      <div className="grid gap-4 sm:grid-cols-3 font-sans">
        {/* Card 1: Lộ Trình Học chuẩn Active Recall */}
        <div
          onClick={() => setActiveTab("roadmap")}
          className={`group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 p-4.5 flex flex-col justify-between ${
            activeTab === "roadmap"
              ? "border-emerald-500 bg-white shadow-md ring-1 ring-emerald-400/50"
              : "border-stone-200/90 dark:border-stone-800 bg-white/80 hover:border-emerald-400/60"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-700">
                <Target className="w-3 h-3 text-emerald-600" />
                Lộ Trình Ôn Cấp
              </span>
              {activeTab === "roadmap" && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-black text-stone-900 leading-snug">
              Học tài chính theo lộ trình chặng chuẩn hóa
            </h3>
            <p className="mt-1.5 text-xs text-stone-600 leading-relaxed font-medium">
              Tích hợp Active Recall chủ động, theo dõi tiến độ từng chặng từ vỡ lòng đến chuyên sâu.
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold">
            <span className={activeTab === "roadmap" ? "text-emerald-700 font-extrabold" : "text-stone-400"}>
              {activeTab === "roadmap" ? "● Đang xem Live Preview" : "Bấm để xem thử"}
            </span>
            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${activeTab === "roadmap" ? "translate-x-1 text-emerald-600" : "text-stone-400 group-hover:translate-x-1"}`} />
          </div>
        </div>

        {/* Card 2: Học nhóm 3D */}
        <div
          onClick={() => setActiveTab("study-group")}
          className={`group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 p-4.5 flex flex-col justify-between ${
            activeTab === "study-group"
              ? "border-emerald-500 bg-white shadow-md ring-1 ring-emerald-400/50"
              : "border-stone-200/90 dark:border-stone-800 bg-white/80 hover:border-emerald-400/60"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-700">
                <Users className="w-3 h-3 text-emerald-600" />
                Học Nhóm (3D)
              </span>
              {activeTab === "study-group" && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-black text-stone-900 leading-snug">
              Phòng học chung không để bạn tự học 1 mình
            </h3>
            <p className="mt-1.5 text-xs text-stone-600 leading-relaxed font-medium">
              Bàn tròn 3D ảo, ghép nhóm theo chủ đề, check-in nhận XP và khung chat nhóm tương tác.
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold">
            <span className={activeTab === "study-group" ? "text-emerald-700 font-extrabold" : "text-stone-400"}>
              {activeTab === "study-group" ? "● Đang xem Live Preview" : "Bấm để xem thử"}
            </span>
            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${activeTab === "study-group" ? "translate-x-1 text-emerald-600" : "text-stone-400 group-hover:translate-x-1"}`} />
          </div>
        </div>

        {/* Card 3: FinSocial Feed */}
        <div
          onClick={() => setActiveTab("finsocial")}
          className={`group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 p-4.5 flex flex-col justify-between ${
            activeTab === "finsocial"
              ? "border-emerald-500 bg-white shadow-md ring-1 ring-emerald-400/50"
              : "border-stone-200/90 dark:border-stone-800 bg-white/80 hover:border-emerald-400/60"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-700">
                <MessageSquareMore className="w-3 h-3 text-emerald-600" />
                FinSocial
              </span>
              {activeTab === "finsocial" && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-black text-stone-900 leading-snug">
              Mạng xã hội học tài chính chia sẻ bài học
            </h3>
            <p className="mt-1.5 text-xs text-stone-600 leading-relaxed font-medium">
              Feed tin tức bài viết ngắn, hỏi đáp thực tế, thảo luận phân tích BCTC và thả cảm xúc.
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold">
            <span className={activeTab === "finsocial" ? "text-emerald-700 font-extrabold" : "text-stone-400"}>
              {activeTab === "finsocial" ? "● Đang xem Live Preview" : "Bấm để xem thử"}
            </span>
            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${activeTab === "finsocial" ? "translate-x-1 text-emerald-600" : "text-stone-400 group-hover:translate-x-1"}`} />
          </div>
        </div>
      </div>

      {/* Main Dynamic Stage Display (PURE LIGHT MODE THEME) */}
      <AnimatePresence mode="wait">
        {/* VIEW 1: ROADMAP & ACTIVE RECALL SAMPLER (LIGHT MODE) */}
        {activeTab === "roadmap" && (
          <motion.div
            key="roadmap-stage"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-3xl border-2 border-emerald-400/60 bg-white shadow-xl text-stone-900 p-5 sm:p-7 relative"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700 font-black">🎯</span>
                <div>
                  <h4 className="text-base font-black text-stone-900">Lộ Trình Học Tài Chính Cá Nhân & CFA</h4>
                  <p className="text-xs text-stone-500 font-medium">Thực hành Active Recall đố nhanh ngay tại chỗ</p>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 font-black text-xs">
                Điểm tích lũy: +{quizScore} XP
              </div>
            </div>

            <div className="mt-5 grid gap-6 lg:grid-cols-12 items-center">
              {/* Left Column: Progress Roadmap Steps */}
              <div className="lg:col-span-6 space-y-3">
                {[
                  { step: "Chặng 1", title: "Vỡ lòng Tài chính & Quản lý Tiền mặt", status: "Đã hoàn thành 100%", active: false },
                  { step: "Chặng 2", title: "Báo cáo Tài chính & Phân tích Chỉ số ROE/PE", status: "Đang học (80%)", active: true },
                  { step: "Chặng 3", title: "Định giá Cổ phiếu & Mô hình DCF", status: "Khóa (Cần đỗ Chặng 2)", active: false },
                ].map((item, idx) => (
                  <div
                    key={item.step}
                    className={`p-4 rounded-2xl border transition-all ${
                      item.active
                        ? "border-emerald-500 bg-emerald-50/80 shadow-md ring-2 ring-emerald-400/30"
                        : "border-stone-200 bg-stone-50/60"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-black">
                      <span className={item.active ? "text-emerald-700" : "text-stone-500"}>{item.step}</span>
                      <span className={item.active ? "text-emerald-600 bg-white px-2 py-0.5 rounded-full border border-emerald-300" : "text-stone-400"}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm font-black text-stone-900 mt-1">{item.title}</p>
                  </div>
                ))}
              </div>

              {/* Right Column: Mini Interactive Quiz Sampler */}
              <div className="lg:col-span-6 p-5 rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/60 to-teal-50/40 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-200/80 px-2.5 py-0.5 rounded-full">
                    ⚡ ACTIVE RECALL SAMPLER
                  </span>
                  <span className="text-xs font-bold text-stone-500">Câu 1/1</span>
                </div>

                <p className="text-xs sm:text-sm font-black text-stone-900 leading-snug">
                  ❓ Khi một doanh nghiệp có dòng tiền CFO âm liên tục 3 năm nhưng lợi nhuận ròng vẫn dương, đâu là nguyên nhân chính?
                </p>

                <div className="space-y-2">
                  {[
                    "Doanh nghiệp bán hàng ghi nhận doanh thu nhưng chưa thu được tiền (Phải thu tăng)",
                    "Doanh nghiệp vừa nhận khoản đầu tư lớn từ cổ đông",
                    "Doanh nghiệp chi trả cổ tức quá mức",
                  ].map((opt, oIdx) => {
                    const isCorrect = oIdx === 0;
                    const isSelected = selectedAnswer === oIdx;

                    return (
                      <button
                        key={opt}
                        onClick={() => {
                          setSelectedAnswer(oIdx);
                          if (isCorrect) setQuizScore(45);
                        }}
                        className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          isSelected
                            ? isCorrect
                              ? "bg-emerald-500 text-stone-950 border-emerald-400 shadow-md font-black"
                              : "bg-rose-500 text-white border-rose-400"
                            : "bg-white text-stone-800 border-stone-200 hover:border-emerald-400"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer !== null && (
                  <div className="p-3 rounded-xl bg-white border border-emerald-300 text-xs font-medium text-stone-800 animate-in fade-in">
                    {selectedAnswer === 0 ? (
                      <span className="text-emerald-700 font-bold">🎉 Chính xác! +45 XP. Dòng tiền CFO phản ánh tiền thực về két.</span>
                    ) : (
                      <span className="text-rose-600 font-bold">❌ Chưa chính xác. Đáp án đúng là Phải thu gia tăng mạnh!</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: HỌC NHÓM 3D & LIVE CHAT PREVIEW (LIGHT MODE) */}
        {activeTab === "study-group" && (
          <motion.div
            key="study-stage"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-3xl border-2 border-emerald-400/60 bg-white shadow-xl text-stone-900 p-4 sm:p-6 lg:p-8 relative"
          >
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
              {/* Left Column: 3D Roundtable Stage Preview (Light Theme) */}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border-2 border-emerald-300 bg-gradient-to-b from-emerald-50/80 via-teal-50/40 to-stone-50 p-5 shadow-sm relative overflow-hidden text-stone-900 min-h-[420px]">
                <div className="flex items-center justify-between shrink-0 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                    🛋️ BÀN HỌC 3D · TÀI CHÍNH CÁ NHÂN
                  </span>
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-2xl border border-stone-200 shadow-xs">
                    <span className="text-[9px] font-bold text-stone-500 mr-1">Cổ Vũ:</span>
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
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-b from-amber-100 via-amber-50 to-emerald-50 border-4 border-amber-400 shadow-xl flex flex-col items-center justify-center text-center p-3 z-10 shrink-0">
                    <span className="text-3xl mb-0.5 animate-bounce inline-block">🔮</span>
                    <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest">
                      BÀN HỌC PHÒNG #102
                    </p>
                    <p className="text-xs sm:text-sm font-black text-stone-900 mt-0.5">
                      480 / 500 XP
                    </p>
                    <span className="mt-1 inline-block text-[9px] font-extrabold text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded-full border border-emerald-400">
                      ⚡ +15% XP BONUS
                    </span>
                  </div>

                  {/* Seated Pods (Light Theme) */}
                  {[
                    { name: "Hà Tường Vy", level: 5, lessons: 42, top: true, pos: "absolute -top-1 left-1/2 -translate-x-1/2" },
                    { name: "Hà Hồng", level: 2, lessons: 6, pos: "absolute top-6 left-2 sm:left-4" },
                    { name: "Hoa Le", level: 1, lessons: 0, pos: "absolute top-6 right-2 sm:right-4" },
                    { name: "Đình Trí Bùi (Bạn)", level: 1, lessons: 8, me: true, pos: "absolute bottom-1 left-3 sm:left-6" },
                    { name: "Nguyễn Thị Thu", level: 1, lessons: 3, pos: "absolute bottom-1 right-3 sm:right-6" },
                  ].map((m) => (
                    <div
                      key={m.name}
                      className={`${m.pos} flex flex-col items-center text-center p-2 rounded-2xl border transition-all duration-300 w-24 sm:w-28 bg-white shadow-md ${
                        m.me
                          ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400/40 scale-105"
                          : "border-stone-200 hover:border-emerald-400"
                      }`}
                    >
                      {m.top && <span className="absolute -top-3 text-base animate-bounce drop-shadow-md z-30">👑</span>}
                      <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center font-black text-xs text-emerald-900 mb-0.5">
                        {m.name.slice(0, 2).toUpperCase()}
                      </div>
                      <p className="text-[9px] font-black text-stone-900 truncate max-w-[80px]">{m.name}</p>
                      <span className="text-[8px] font-extrabold text-emerald-700 mt-0.5">🔥 {m.lessons} bài</span>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 text-center text-[10px] text-stone-500 font-semibold pt-1">
                  💡 Bấm thử các nút cổ vũ phía trên để gửi tin nhắn tương tác trực tiếp!
                </div>
              </div>

              {/* Right Column: Group Chat Simulator (Light Theme) */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border-2 border-stone-200 bg-stone-50 p-4 shadow-sm text-stone-900 min-h-[420px]">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-3">
                  <h4 className="text-xs font-black uppercase text-stone-800 tracking-wider flex items-center gap-2">
                    <span>💬 Trò chuyện nhóm Live</span>
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    Online
                  </span>
                </div>

                {/* Message Log */}
                <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[280px] pr-1">
                  <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
                    <p className="text-[9px] font-black text-amber-800">Tài Tài · Quản lý nhóm</p>
                    <p className="text-[11px] text-stone-700 mt-0.5">Cập nhật hôm nay: Hà Tường Vy, Hà Hồng đã học bài. Cùng cố gắng nhé!</p>
                  </div>

                  {cheerLog.map((log) => (
                    <div
                      key={log.id}
                      className={`p-2.5 rounded-2xl text-xs shadow-xs border ${
                        log.user === "Bạn"
                          ? "bg-emerald-500 text-stone-950 font-bold border-emerald-400 ml-4"
                          : "bg-white border-stone-200 text-stone-800 mr-4"
                      }`}
                    >
                      <p className={`text-[9px] font-black ${log.user === "Bạn" ? "text-stone-950" : "text-emerald-700"}`}>
                        {log.user}
                      </p>
                      <p className="mt-0.5 leading-relaxed">{log.text}</p>
                    </div>
                  ))}
                </div>

                {/* Input Controls */}
                <div className="mt-3 pt-3 border-t border-stone-200 flex items-center gap-2">
                  <input
                    type="text"
                    value={cheerInput}
                    onChange={(e) => setCheerInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendGroupMsg()}
                    placeholder="Gửi lời chúc, hỏi bài..."
                    className="flex-1 px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-400 outline-none focus:border-emerald-400"
                  />
                  <button
                    onClick={handleSendGroupMsg}
                    className="p-2 rounded-xl bg-emerald-500 text-stone-950 font-bold hover:bg-emerald-400 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: FINSOCIAL LIVE FEED PREVIEW (LIGHT MODE) */}
        {activeTab === "finsocial" && (
          <motion.div
            key="social-stage"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-3xl border-2 border-sky-400/60 bg-white shadow-xl text-stone-900 p-5 sm:p-7 relative space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-sky-100 text-sky-700 font-black">💬</span>
                <div>
                  <h4 className="text-base font-black text-stone-900">FinSocial Feed Trực Tuyến</h4>
                  <p className="text-xs text-stone-500 font-medium">Bấm thử nút Thả tim ❤️ tương tác với bài viết thực tế</p>
                </div>
              </div>

              <Link
                href="/finsocial"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-stone-950 font-black text-xs transition-colors cursor-pointer"
              >
                <span>Vào FinSocial Feed</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Post Feed List (Light Theme) */}
            <div className="grid gap-4 sm:grid-cols-2">
              {FINSOCIAL_POSTS.map((post) => {
                const likeData = postLikes[post.id] || { count: post.likes, liked: false };
                return (
                  <div
                    key={post.id}
                    className="p-4 rounded-2xl border border-stone-200 bg-stone-50/60 shadow-sm hover:border-sky-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-400 flex items-center justify-center font-black text-xs text-sky-800">
                            {post.author.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-black text-stone-900 leading-tight">{post.author}</p>
                            <p className="text-[10px] text-stone-500 font-medium">{post.role}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full border border-sky-200">
                          {post.topic}
                        </span>
                      </div>

                      <h5 className="text-xs font-black text-stone-900 mb-1 leading-snug">{post.title}</h5>
                      <p className="text-[11px] text-stone-600 leading-relaxed line-clamp-3 mb-2">{post.content}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-[9px] font-bold text-sky-700 bg-white px-2 py-0.5 rounded-md border border-stone-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          likeData.liked
                            ? "bg-rose-500 text-white shadow-sm"
                            : "bg-white text-stone-700 border border-stone-200 hover:border-rose-400"
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${likeData.liked ? "fill-white" : "text-rose-500"}`} />
                        <span>{likeData.count}</span>
                      </button>

                      <span className="text-[10px] font-bold text-stone-500">
                        {post.comments} bình luận · {post.shares} chia sẻ
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
