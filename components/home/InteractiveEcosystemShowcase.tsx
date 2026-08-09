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
import { useI18n } from "@/lib/i18n/context";
import { format, type Dictionary } from "@/lib/i18n";

type TabId = "roadmap" | "study-group" | "finsocial";

// Sample posts for the FinSocial preview. A function of the dictionary rather
// than a module constant: it is module scope, so there is no useI18n() to call
// here - the same reason getUserBadge in CommunityFeedClient takes `t` as an
// argument. Author names, avatars, levels, roles and hashtags stay as they are.
function finsocialPosts(t: Dictionary) {
  return [
  {
    id: "p1",
    /* i18n-ignore-start: tên người học minh hoạ ở bản xem trước khi chưa đăng
       nhập, và chức danh nghề đi kèm. Tên riêng là tên riêng ở mọi ngôn ngữ -
       cùng lý do leaderboardPreview.name1-6 và ecosystem.adminByline nằm trong
       INTENTIONALLY_UNTRANSLATED của dictionary-parity. */
    author: "Hà Tường Vy",
    avatar: "/avatars/avatar-1.png",
    level: 5,
    role: "CFA Level 1 Candidate",
    time: t.ecosystem.post1Time,
    topic: t.ecosystem.post1Topic,
    title: t.ecosystem.post1Title,
    content:
      t.ecosystem.post1Content,
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
    /* i18n-ignore-end */
    time: t.ecosystem.post2Time,
    topic: t.ecosystem.post2Topic,
    title: t.ecosystem.post2Title,
    content:
      t.ecosystem.post2Content,
    likes: 89,
    comments: 24,
    shares: 19,
    tags: ["#PersonalFinance", "#QuyTac503020", "#TietKiem"],
    },
  ];
}

export default function InteractiveEcosystemShowcase() {
  const { t } = useI18n();
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
      { id: String(Date.now()), user: t.ecosystem.cheerYou, text: cheerInput.trim() },
    ]);
    setCheerInput("");
  }

  function handleQuickCheer(emojiText: string) {
    setCheerLog((prev) => [
      ...prev,
      { id: String(Date.now()), user: t.ecosystem.cheerYou, text: emojiText },
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
                {t.ecosystem.roadmapTab}
              </span>
              {activeTab === "roadmap" && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-black text-stone-900 leading-snug">
              {t.ecosystem.roadmapTitle}
            </h3>
            <p className="mt-1.5 text-xs text-stone-600 leading-relaxed font-medium">
              {t.ecosystem.roadmapBody}
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold">
            <span className={activeTab === "roadmap" ? "text-emerald-700 font-extrabold" : "text-stone-400"}>
              {activeTab === "roadmap" ? t.ecosystem.livePreview : t.ecosystem.tapToTry}
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
                {t.ecosystem.groupTab}
              </span>
              {activeTab === "study-group" && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-black text-stone-900 leading-snug">
              {t.ecosystem.groupTitle}
            </h3>
            <p className="mt-1.5 text-xs text-stone-600 leading-relaxed font-medium">
              {t.ecosystem.groupBody}
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold">
            <span className={activeTab === "study-group" ? "text-emerald-700 font-extrabold" : "text-stone-400"}>
              {activeTab === "study-group" ? t.ecosystem.livePreview : t.ecosystem.tapToTry}
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
                {t.ecosystem.finsocialTab}
              </span>
              {activeTab === "finsocial" && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-black text-stone-900 leading-snug">
              {t.ecosystem.finsocialTitle}
            </h3>
            <p className="mt-1.5 text-xs text-stone-600 leading-relaxed font-medium">
              {t.ecosystem.finsocialBody}
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold">
            <span className={activeTab === "finsocial" ? "text-emerald-700 font-extrabold" : "text-stone-400"}>
              {activeTab === "finsocial" ? t.ecosystem.livePreview : t.ecosystem.tapToTry}
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
            className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md text-stone-900 p-3.5 sm:p-4.5 relative font-sans"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-black text-sm">🎯</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-stone-900">{t.ecosystem.roadmapPanelTitle}</h4>
                  <p className="text-[11px] text-stone-500 font-medium">{t.ecosystem.roadmapPanelSub}</p>
                </div>
              </div>
              <div className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-black text-[11px]">
                {format(t.ecosystem.xpEarned, { xp: quizScore })}
              </div>
            </div>

            <div className="mt-3.5 grid gap-4 lg:grid-cols-12 items-stretch">
              {/* Left Column: Progress Roadmap Steps */}
              <div className="lg:col-span-6 space-y-2">
                {[
                  { step: t.ecosystem.stage1, title: t.ecosystem.stage1Title, status: t.ecosystem.stage1Status, active: false },
                  { step: t.ecosystem.stage2, title: t.ecosystem.stage2Title, status: t.ecosystem.stage2Status, active: true },
                  { step: t.ecosystem.stage3, title: t.ecosystem.stage3Title, status: t.ecosystem.stage3Status, active: false },
                ].map((item) => (
                  <div
                    key={item.step}
                    className={`p-2.5 sm:p-3 rounded-xl border transition-all ${
                      item.active
                        ? "border-emerald-500 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-400/30"
                        : "border-stone-200/80 bg-stone-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-black">
                      <span className={item.active ? "text-emerald-700" : "text-stone-500"}>{item.step}</span>
                      <span className={item.active ? "text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-300" : "text-stone-400"}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs font-black text-stone-900 mt-0.5">{item.title}</p>
                  </div>
                ))}
              </div>

              {/* Right Column: Mini Interactive Quiz Sampler */}
              <div className="lg:col-span-6 p-3.5 rounded-xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/40 to-teal-50/20 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full">
                    {t.ecosystem.samplerLabel}
                  </span>
                  <span className="text-[11px] font-bold text-stone-500">{t.ecosystem.samplerCounter}</span>
                </div>

                <p className="text-xs font-black text-stone-900 leading-snug">
                  {t.ecosystem.samplerQuestion}
                </p>

                <div className="space-y-1.5">
                  {[
                    t.ecosystem.samplerOptionA,
                    t.ecosystem.samplerOptionB,
                    t.ecosystem.samplerOptionC,
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
                        className={`w-full text-left p-2 sm:p-2.5 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${
                          isSelected
                            ? isCorrect
                              ? "bg-emerald-500 text-stone-950 border-emerald-400 shadow-xs font-black"
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
                  <div className="p-2 rounded-lg bg-white border border-emerald-300 text-[11px] font-medium text-stone-800 animate-in fade-in">
                    {selectedAnswer === 0 ? (
                      <span className="text-emerald-700 font-bold">{t.ecosystem.samplerCorrect}</span>
                    ) : (
                      <span className="text-rose-600 font-bold">{t.ecosystem.samplerWrong}</span>
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
                    {t.ecosystem.deskLabel}
                  </span>
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-2xl border border-stone-200 shadow-xs">
                    <span className="text-[9px] font-bold text-stone-500 mr-1">{t.ecosystem.cheerLabel}</span>
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
                      {t.ecosystem.roomLabel}
                    </p>
                    <p className="text-xs sm:text-sm font-black text-stone-900 mt-0.5">
                      {t.ecosystem.roomXp}
                    </p>
                    <span className="mt-1 inline-block text-[9px] font-extrabold text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded-full border border-emerald-400">
                      {t.ecosystem.xpBonus}
                    </span>
                  </div>

                  {/* Seated Pods (Light Theme) */}
                  {/* i18n-ignore-start: illustrative learner names for the
                      logged-out preview. Personal names are proper nouns and
                      stay as they are in any language; the "(you)" marker on the
                      viewer's own seat is the only part that is translated, via
                      t.ecosystem.youSuffix below. */}
                  {[
                    { name: "Hà Tường Vy", level: 5, lessons: 42, top: true, pos: "absolute -top-1 left-1/2 -translate-x-1/2" },
                    { name: "Hà Hồng", level: 2, lessons: 6, pos: "absolute top-6 left-2 sm:left-4" },
                    { name: "Hoa Le", level: 1, lessons: 0, pos: "absolute top-6 right-2 sm:right-4" },
                    { name: `Đình Trí Bùi ${t.ecosystem.youSuffix}`, level: 1, lessons: 8, me: true, pos: "absolute bottom-1 left-3 sm:left-6" },
                    { name: "Nguyễn Thị Thu", level: 1, lessons: 3, pos: "absolute bottom-1 right-3 sm:right-6" },
                  /* i18n-ignore-end */
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
                      <span className="text-[8px] font-extrabold text-emerald-700 mt-0.5">{format(t.ecosystem.memberLessons, { count: m.lessons })}</span>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 text-center text-[10px] text-stone-500 font-semibold pt-1">
                  {t.ecosystem.cheerHint}
                </div>
              </div>

              {/* Right Column: Group Chat Simulator (Light Theme) */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border-2 border-stone-200 bg-stone-50 p-4 shadow-sm text-stone-900 min-h-[420px]">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-3">
                  <h4 className="text-xs font-black uppercase text-stone-800 tracking-wider flex items-center gap-2">
                    <span>{t.ecosystem.chatLive}</span>
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    {t.ecosystem.online}
                  </span>
                </div>

                {/* Message Log */}
                <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[280px] pr-1">
                  <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
                    <p className="text-[9px] font-black text-amber-800">{t.ecosystem.adminByline}</p>
                    <p className="text-[11px] text-stone-700 mt-0.5">{t.ecosystem.adminMessage}</p>
                  </div>

                  {cheerLog.map((log) => (
                    <div
                      key={log.id}
                      className={`p-2.5 rounded-2xl text-xs shadow-xs border ${
                        log.user === t.ecosystem.cheerYou
                          ? "bg-emerald-500 text-stone-950 font-bold border-emerald-400 ml-4"
                          : "bg-white border-stone-200 text-stone-800 mr-4"
                      }`}
                    >
                      <p className={`text-[9px] font-black ${log.user === t.ecosystem.cheerYou ? "text-stone-950" : "text-emerald-700"}`}>
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
                    placeholder={t.ecosystem.chatPlaceholder}
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
                  <h4 className="text-base font-black text-stone-900">{t.ecosystem.feedPanelTitle}</h4>
                  <p className="text-xs text-stone-500 font-medium">{t.ecosystem.feedPanelSub}</p>
                </div>
              </div>

              <Link
                href="/finsocial"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-stone-950 font-black text-xs transition-colors cursor-pointer"
              >
                <span>{t.ecosystem.feedCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Post Feed List (Light Theme) */}
            <div className="grid gap-4 sm:grid-cols-2">
              {finsocialPosts(t).map((post) => {
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
                        {format(t.ecosystem.postStats, { comments: post.comments, shares: post.shares })}
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
