"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  Award,
  BarChart3,
  Bookmark,
  Flame,
  HelpCircle,
  Image as ImageIcon,
  Lightbulb,
  MessageCircle,
  Newspaper,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  SmilePlus,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  X,
  Zap,
  Clock3,
  ChevronDown,
  ChevronUp,
  CircleGauge,
  Vote,
  CheckCircle2,
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import EmojiPicker from "@/components/EmojiPicker";
import { uploadChatImage, isAllowedChatImage } from "@/lib/supabase-chat";
import {
  createComment,
  createManualPost,
  deleteOwnComment,
  deleteOwnPost,
  getCommunityFeed,
  getCommunityPostComments,
  reactToPost,
  removeReaction,
  subscribeToCommunityFeed,
  type CommunityFeedPost,
  type CommunityPostComment,
} from "@/lib/supabase-community";
import { isValidAvatar } from "@/lib/avatar-utils";
import { animateCountTo } from "@/lib/animate-count";

interface SessionUser {
  id: string;
  user_metadata?: { full_name?: string; avatar_url?: string };
}

function AnimatedCounter({ value, className = "" }: { value: number; className?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    animateCountTo(value, setDisplayValue, cancelledRef);
    return () => {
      cancelledRef.current = true;
    };
  }, [value]);

  return <span className={`tabular-nums ${className}`}>{displayValue.toLocaleString("vi-VN")}</span>;
}

function FeedSkeleton() {
  return (
    <div className="space-y-4 py-2">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[24px] bg-white p-5 shadow-[0_16px_34px_-28px_rgba(15,23,42,0.22)] ring-1 ring-stone-100/70 dark:bg-stone-900/85 dark:ring-stone-800/60"
        >
          <div className="flex items-start gap-4">
            <div className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-stone-200 dark:bg-stone-800" />
            <div className="min-w-0 flex-1">
              <div className="h-4 w-36 animate-pulse rounded-full bg-stone-200 dark:bg-stone-800" />
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full animate-pulse rounded-full bg-stone-100 dark:bg-stone-800" />
                <div className="h-3 w-4/5 animate-pulse rounded-full bg-stone-100 dark:bg-stone-800" />
              </div>
              <div className="mt-5 flex gap-2">
                <div className="h-8 w-28 animate-pulse rounded-full bg-stone-100 dark:bg-stone-800" />
                <div className="h-8 w-24 animate-pulse rounded-full bg-stone-100 dark:bg-stone-800" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Avatar({ name, avatarUrl }: { name?: string | null; avatarUrl?: string | null }) {
  const initials = (name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return isValidAvatar(avatarUrl) ? (
    <Image
      src={avatarUrl}
      alt={name || "User"}
      width={40}
      height={40}
      className="rounded-full object-cover ring-2 ring-white shadow-[0_8px_18px_-16px_rgba(15,23,42,0.35)] flex-shrink-0"
    />
  ) : (
    <div className="w-11 h-11 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 font-extrabold flex items-center justify-center ring-2 ring-white shadow-[0_8px_18px_-16px_rgba(15,23,42,0.35)] flex-shrink-0">
      {initials}
    </div>
  );
}

function timeAgo(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
}

const REACTION_OPTIONS = ["💡 Hay", "🧠 Cần phản biện", "❓ Cùng thắc mắc", "📌 Đã lưu", "🔥 Rất thực tế"];
const TOPICS = [
  { id: "all", label: "Tất cả", shortLabel: "Tất cả", icon: Newspaper, tag: "", tone: "stone" },
  { id: "meo-tai-chinh", label: "Mẹo tài chính", shortLabel: "Mẹo", icon: Sparkles, tag: "#MeoTaiChinh ", tone: "emerald" },
  { id: "phan-tich", label: "Phân tích", shortLabel: "Phân tích", icon: BarChart3, tag: "#PhanTich ", tone: "sky" },
  { id: "thanh-tuu", label: "Thành tựu", shortLabel: "Thành tựu", icon: Target, tag: "#ThanhTuu ", tone: "amber" },
  { id: "hoi-dap", label: "Hỏi đáp", shortLabel: "Hỏi đáp", icon: HelpCircle, tag: "#HoiDap ", tone: "orange" },
  { id: "tin-nong", label: "Tin nóng", shortLabel: "Tin nóng", icon: Flame, tag: "#TinNong ", tone: "red" },
  { id: "ai-finance", label: "AI tài chính", shortLabel: "AI Finance", icon: Zap, tag: "#AITaiChinh ", tone: "violet" },
] as const;

type TopicId = (typeof TOPICS)[number]["id"];

const POST_TEMPLATES = [
  {
    title: "Hỏi đáp",
    topic: "hoi-dap" as TopicId,
    icon: HelpCircle,
    text: "#HoiDap Mình chưa hiểu phần này:\n- Khái niệm/câu hỏi:\n- Mình đã thử hiểu là:\n- Nhờ mọi người sửa giúp:",
  },
  {
    title: "Phân tích nhanh",
    topic: "phan-tich" as TopicId,
    icon: BarChart3,
    text: "#PhanTich Luận điểm của mình:\n- Điểm chính:\n- Số liệu/nguồn mình dùng:\n- Rủi ro cần phản biện:",
  },
  {
    title: "Take-away bài học",
    topic: "meo-tai-chinh" as TopicId,
    icon: Lightbulb,
    text: "#MeoTaiChinh Hôm nay mình học được:\n- Ý chính:\n- Ví dụ đời thực:\n- Mình sẽ áp dụng bằng cách:",
  },
  {
    title: "Khoảnh khắc tiến bộ",
    topic: "thanh-tuu" as TopicId,
    icon: Target,
    text: "#ThanhTuu Thành tựu hôm nay:\n- Mình đã hoàn thành:\n- Điều thấy tự hào:\n- Mục tiêu tiếp theo:",
  },
] as const;

function getPostCategory(post: CommunityFeedPost): TopicId {
  const metadataCategory = post.metadata && typeof post.metadata === "object" ? String(post.metadata.category ?? "") : "";
  if (TOPICS.some((topic) => topic.id === metadataCategory)) return metadataCategory as TopicId;
  const content = post.content || "";
  if (content.includes("#MeoTaiChinh")) return "meo-tai-chinh";
  if (content.includes("#PhanTich")) return "phan-tich";
  if (content.includes("#ThanhTuu")) return "thanh-tuu";
  if (content.includes("#HoiDap")) return "hoi-dap";
  if (content.includes("#TinNong")) return "tin-nong";
  if (content.includes("#AITaiChinh")) return "ai-finance";
  if (post.kind === "streak") return "thanh-tuu";
  return "all";
}

function getTopicMeta(topicId: TopicId) {
  return TOPICS.find((topic) => topic.id === topicId) ?? TOPICS[0];
}

const TONE_STYLES = {
  emerald: {
    chip: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300",
    chipActive: "border-emerald-300 bg-emerald-500 text-white shadow-[0_10px_22px_-18px_rgba(16,185,129,0.45)] dark:border-emerald-700 dark:bg-emerald-400 dark:text-stone-950",
    soft: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/35 dark:text-emerald-300",
    softSurface: "bg-emerald-50/70 dark:bg-emerald-950/20",
    icon: "text-emerald-600 dark:text-emerald-300",
    border: "border-emerald-200/70 dark:border-emerald-900/50",
  },
  sky: {
    chip: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-300",
    chipActive: "border-sky-300 bg-sky-500 text-white shadow-[0_10px_22px_-18px_rgba(59,130,246,0.45)] dark:border-sky-700 dark:bg-sky-400 dark:text-stone-950",
    soft: "bg-sky-50 text-sky-700 dark:bg-sky-950/35 dark:text-sky-300",
    softSurface: "bg-sky-50/70 dark:bg-sky-950/20",
    icon: "text-sky-600 dark:text-sky-300",
    border: "border-sky-200/70 dark:border-sky-900/50",
  },
  amber: {
    chip: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300",
    chipActive: "border-amber-300 bg-amber-500 text-white shadow-[0_10px_22px_-18px_rgba(245,158,11,0.45)] dark:border-amber-700 dark:bg-amber-400 dark:text-stone-950",
    soft: "bg-amber-50 text-amber-700 dark:bg-amber-950/35 dark:text-amber-300",
    softSurface: "bg-amber-50/70 dark:bg-amber-950/20",
    icon: "text-amber-600 dark:text-amber-300",
    border: "border-amber-200/70 dark:border-amber-900/50",
  },
  orange: {
    chip: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-300",
    chipActive: "border-orange-300 bg-orange-500 text-white shadow-[0_10px_22px_-18px_rgba(249,115,22,0.45)] dark:border-orange-700 dark:bg-orange-400 dark:text-stone-950",
    soft: "bg-orange-50 text-orange-700 dark:bg-orange-950/35 dark:text-orange-300",
    softSurface: "bg-orange-50/70 dark:bg-orange-950/20",
    icon: "text-orange-600 dark:text-orange-300",
    border: "border-orange-200/70 dark:border-orange-900/50",
  },
  red: {
    chip: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300",
    chipActive: "border-red-300 bg-red-500 text-white shadow-[0_10px_22px_-18px_rgba(239,68,68,0.45)] dark:border-red-700 dark:bg-red-400 dark:text-stone-950",
    soft: "bg-red-50 text-red-700 dark:bg-red-950/35 dark:text-red-300",
    softSurface: "bg-red-50/70 dark:bg-red-950/20",
    icon: "text-red-600 dark:text-red-300",
    border: "border-red-200/70 dark:border-red-900/50",
  },
  violet: {
    chip: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-300",
    chipActive: "border-violet-300 bg-violet-500 text-white shadow-[0_10px_22px_-18px_rgba(139,92,246,0.45)] dark:border-violet-700 dark:bg-violet-400 dark:text-stone-950",
    soft: "bg-violet-50 text-violet-700 dark:bg-violet-950/35 dark:text-violet-300",
    softSurface: "bg-violet-50/70 dark:bg-violet-950/20",
    icon: "text-violet-600 dark:text-violet-300",
    border: "border-violet-200/70 dark:border-violet-900/50",
  },
  stone: {
    chip: "border-stone-200 bg-stone-100 text-stone-600 dark:border-stone-800 dark:bg-stone-900/70 dark:text-stone-300",
    chipActive: "border-stone-300 bg-stone-200 text-stone-900 shadow-[0_8px_18px_-18px_rgba(15,23,42,0.16)] dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100",
    soft: "bg-stone-50 text-stone-600 dark:bg-stone-950/35 dark:text-stone-300",
    softSurface: "bg-stone-50/80 dark:bg-stone-950/35",
    icon: "text-stone-600 dark:text-stone-300",
    border: "border-stone-200/70 dark:border-stone-800/50",
  },
} as const;

type ToneKey = keyof typeof TONE_STYLES;

function getToneStyles(tone: string) {
  return TONE_STYLES[(tone as ToneKey) in TONE_STYLES ? (tone as ToneKey) : "stone"];
}

function getUserBadge(post: CommunityFeedPost) {
  if (post.kind === "streak") return { label: "Giữ streak", icon: Flame, tone: "emerald" as ToneKey };
  if (post.comment_count >= 3) return { label: "Đang được bàn luận", icon: MessageCircle, tone: "sky" as ToneKey };
  if (post.reaction_count >= 5) return { label: "Bài viết nổi bật", icon: Award, tone: "amber" as ToneKey };
  return { label: "Thành viên FinSocial", icon: ShieldCheck, tone: "emerald" as ToneKey };
}

function getPostAccentTone(post: CommunityFeedPost): ToneKey {
  const category = getPostCategory(post);
  return getTopicMeta(category).tone as ToneKey;
}

interface PollOption {
  id: number;
  text: string;
  votes: number;
}

interface PollMetadata {
  type: "poll";
  question: string;
  options: PollOption[];
}

function MarketSentimentWidget({ onShareSentiment }: { onShareSentiment?: (text: string) => void }) {
  const todayStr = new Date().toISOString().slice(0, 10);
  const storageKey = `thtcdn_market_sentiment_${todayStr}`;

  const [votedOption, setVotedOption] = useState<"bullish" | "bearish" | null>(null);
  const [stats, setStats] = useState({ bullish: 104, bearish: 48 });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "bullish" || saved === "bearish") {
        setVotedOption(saved);
      }
    } catch (e) {
      // ignore
    }
  }, [storageKey]);

  const handleVote = (option: "bullish" | "bearish") => {
    if (votedOption === option) return;
    setStats((prev) => {
      let newBullish = prev.bullish;
      let newBearish = prev.bearish;

      if (votedOption === "bullish") newBullish--;
      if (votedOption === "bearish") newBearish--;

      if (option === "bullish") newBullish++;
      if (option === "bearish") newBearish++;

      return { bullish: newBullish, bearish: newBearish };
    });

    setVotedOption(option);
    try {
      localStorage.setItem(storageKey, option);
    } catch (e) {}

    toast.success(
      option === "bullish"
        ? "🐂 Đã ghi nhận nhận định Biển Xanh Bullish của bạn!"
        : "🐻 Đã ghi nhận nhận định Biển Đỏ Bearish của bạn!"
    );
  };

  const total = stats.bullish + stats.bearish;
  const bullishPct = Math.round((stats.bullish / total) * 100);
  const bearishPct = 100 - bullishPct;

  return (
    <div className="mb-6 overflow-hidden rounded-[24px] bg-gradient-to-br from-stone-900 via-stone-950 to-emerald-950 p-4 sm:p-5 text-white shadow-xl border border-stone-800 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-lg shadow-sm">
            📊
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/40">
                THỊ TRƯỜNG & VĨ MÔ HÔM NAY
              </span>
              <span className="text-[10px] font-bold text-stone-400">{todayStr}</span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-stone-100 mt-0.5">
              Cộng đồng nhận định xu hướng VN-Index & Vĩ mô hôm nay thế nào?
            </h3>
          </div>
        </div>
        {votedOption && onShareSentiment && (
          <button
            type="button"
            onClick={() => {
              const text = `#PhanTich #MarketSentiment Hôm nay mình nhận định thị trường ${
                votedOption === "bullish" ? "🐂 Biển Xanh (Bullish - Tăng trưởng)" : "🐻 Biển Đỏ (Bearish - Thận trọng)"
              }. Khảo sát cộng đồng hiện đạt ${bullishPct}% Bullish vs ${bearishPct}% Bearish!`;
              onShareSentiment(text);
            }}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all cursor-pointer shrink-0 shadow-sm"
          >
            💬 Đăng nhận định
          </button>
        )}
      </div>

      {/* Voting buttons */}
      <div className="grid grid-cols-2 gap-3 my-3">
        <button
          type="button"
          onClick={() => handleVote("bullish")}
          className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
            votedOption === "bullish"
              ? "bg-emerald-500/25 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/40"
              : "bg-stone-900/80 border-stone-800 hover:border-emerald-500/50 text-stone-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🐂</span>
            <div className="text-left">
              <p className="font-black text-xs sm:text-sm text-stone-100">Biển Xanh (Bullish)</p>
              <p className="text-[10px] text-stone-400">Tích cực & Khả quan</p>
            </div>
          </div>
          <span className="font-black text-sm text-emerald-400">{bullishPct}%</span>
        </button>

        <button
          type="button"
          onClick={() => handleVote("bearish")}
          className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
            votedOption === "bearish"
              ? "bg-rose-500/25 border-rose-400 text-rose-300 ring-2 ring-rose-500/40"
              : "bg-stone-900/80 border-stone-800 hover:border-rose-500/50 text-stone-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🐻</span>
            <div className="text-left">
              <p className="font-black text-xs sm:text-sm text-stone-100">Biển Đỏ (Bearish)</p>
              <p className="text-[10px] text-stone-400">Thận trọng & Quan sát</p>
            </div>
          </div>
          <span className="font-black text-sm text-rose-400">{bearishPct}%</span>
        </button>
      </div>

      {/* Progress ratio bar */}
      <div className="space-y-1.5">
        <div className="h-3.5 w-full rounded-full bg-stone-800 overflow-hidden flex p-0.5 border border-stone-700">
          <div
            style={{ width: `${bullishPct}%` }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-l-full transition-all duration-500"
          />
          <div
            style={{ width: `${bearishPct}%` }}
            className="h-full bg-gradient-to-r from-rose-500 to-orange-500 rounded-r-full transition-all duration-500"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] font-bold text-stone-400 px-1">
          <span>🐂 {stats.bullish} phiếu ({bullishPct}%)</span>
          <span>Tổng số lượt vote: {total}</span>
          <span>🐻 {stats.bearish} phiếu ({bearishPct}%)</span>
        </div>
      </div>
    </div>
  );
}

function InteractivePollCard({ postId, metadata }: { postId: number; metadata: PollMetadata }) {
  const storageKey = `thtcdn_poll_vote_${postId}`;
  const [userVotedId, setUserVotedId] = useState<number | null>(null);
  const [options, setOptions] = useState<PollOption[]>(metadata.options || []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) {
        setUserVotedId(Number(saved));
      }
    } catch (e) {}
  }, [storageKey]);

  const handleVote = (optionId: number) => {
    if (userVotedId !== null) return;
    setOptions((prev) =>
      prev.map((opt) => (opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt))
    );
    setUserVotedId(optionId);
    try {
      localStorage.setItem(storageKey, String(optionId));
    } catch (e) {}
    toast.success("🎉 Đã ghi nhận bình chọn của bạn!");
  };

  const totalVotes = options.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <div className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-amber-500/30 text-stone-900 dark:text-stone-100 font-sans space-y-3 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider">
          📊 THĂM DÒ Ý KIẾN CỘNG ĐỒNG
        </span>
        <span className="text-[10px] font-bold text-stone-400">{totalVotes} lượt bình chọn</span>
      </div>

      <p className="font-black text-sm text-stone-900 dark:text-stone-100 leading-snug">
        {metadata.question}
      </p>

      <div className="space-y-2">
        {options.map((opt) => {
          const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
          const isMyChoice = userVotedId === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleVote(opt.id)}
              disabled={userVotedId !== null}
              className={`relative w-full text-left p-3 rounded-xl border text-xs font-bold transition-all overflow-hidden cursor-pointer ${
                isMyChoice
                  ? "border-emerald-500 bg-emerald-500/15 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400/40"
                  : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-stone-400"
              }`}
            >
              {/* Animated Progress Fill Bar */}
              <div
                style={{ width: `${pct}%` }}
                className={`absolute inset-y-0 left-0 transition-all duration-500 opacity-20 ${
                  isMyChoice ? "bg-emerald-500" : "bg-stone-400 dark:bg-stone-600"
                }`}
              />
              <div className="relative z-10 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold">
                  {isMyChoice && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                  {opt.text}
                </span>
                <span className="font-black text-stone-500 dark:text-stone-400">{pct}% ({opt.votes})</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CommunityFeedClient({ embedded = false }: { embedded?: boolean }) {
  const supabase = createClient();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [posts, setPosts] = useState<CommunityFeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [content, setContent] = useState("");
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicId>("meo-tai-chinh");
  const [feedFilter, setFeedFilter] = useState<TopicId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [posting, setPosting] = useState(false);
  const [openComments, setOpenComments] = useState<Record<number, boolean>>({});
  const [commentsByPost, setCommentsByPost] = useState<Record<number, CommunityPostComment[]>>({});
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({});
  const [loadingComments, setLoadingComments] = useState<Record<number, boolean>>({});
  const [postingComment, setPostingComment] = useState<Record<number, boolean>>({});
  const [reactionPickerFor, setReactionPickerFor] = useState<number | null>(null);
  const [reactionBurstFor, setReactionBurstFor] = useState<number | null>(null);
  const [topicMenuOpen, setTopicMenuOpen] = useState(false);
  const [templateMenuOpen, setTemplateMenuOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [isPollMode, setIsPollMode] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const userIdRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const invalid = isAllowedChatImage(file);
    if (invalid) {
      toast.error(invalid);
      return;
    }
    setPendingImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearPendingImage = () => {
    setPendingImage(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const refreshFeed = useCallback(async () => {
    const feed = await getCommunityFeed();
    setPosts(feed);
    setHasMore(feed.length === 20);
  }, []);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user: sessionUser },
      } = await supabase.auth.getUser();
      if (sessionUser) {
        setUser(sessionUser);
        userIdRef.current = sessionUser.id;
      }

      try {
        await refreshFeed();
      } catch (error) {
        console.error("Error loading community feed:", error);
      } finally {
        setLoading(false);
      }
    };
    void init();
  }, [refreshFeed, supabase]);

  useEffect(() => {
    const unsubscribe = subscribeToCommunityFeed(() => {
      refreshFeed()
        .then(async () => {
          const openIds = Object.entries(openComments)
            .filter(([, isOpen]) => isOpen)
            .map(([postId]) => Number(postId));
          if (openIds.length === 0) return;
          const entries = await Promise.all(openIds.map(async (postId) => [postId, await getCommunityPostComments(postId)] as const));
          setCommentsByPost((prev) => {
            const next = { ...prev };
            entries.forEach(([postId, comments]) => {
              next[postId] = comments;
            });
            return next;
          });
        })
        .catch((error) => console.error("Error refreshing community feed:", error));
    });
    return unsubscribe;
  }, [openComments, refreshFeed]);

  const loadMore = useCallback(async () => {
    if (loadingMore || posts.length === 0) return;
    setLoadingMore(true);
    try {
      const oldestId = posts[posts.length - 1].id;
      const more = await getCommunityFeed(oldestId);
      setPosts((prev) => [...prev, ...more]);
      setHasMore(more.length === 20);
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, posts]);

  const handlePost = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để đăng bài.");
      return;
    }
    const text = content.trim();
    const hasValidPoll = isPollMode && pollQuestion.trim() && pollOptions.filter((o) => o.trim()).length >= 2;
    if (!text && !pendingImage && !hasValidPoll) {
      toast.error("Vui lòng nhập nội dung, chọn hình ảnh hoặc điền thông tin thăm dò ý kiến.");
      return;
    }
    setPosting(true);
    try {
      let imageUrl: string | undefined = undefined;
      if (pendingImage) {
        imageUrl = await uploadChatImage(user.id, pendingImage);
      }
      const pollData = hasValidPoll
        ? {
            type: "poll",
            question: pollQuestion.trim(),
            options: pollOptions
              .filter((o) => o.trim())
              .map((opt, idx) => ({ id: idx, text: opt.trim(), votes: Math.floor(Math.random() * 5) + 1 })),
          }
        : null;

      await createManualPost(user.id, content, imageUrl, {
        category: selectedTopic,
        ...(pollData ? pollData : {}),
      });

      setContent("");
      clearPendingImage();
      setIsPollMode(false);
      setPollQuestion("");
      setPollOptions(["", ""]);
      setIsComposeModalOpen(false);
      await refreshFeed();
      toast.success("Đã đăng bài thành công!");
      toast.success("Đã đăng bài chia sẻ!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không đăng được bài. Vui lòng thử lại.");
    } finally {
      setPosting(false);
    }
  };

  const handleReact = async (post: CommunityFeedPost, emoji: string) => {
    if (!user) return;
    const previousReaction = post.my_reaction;
    const sameReaction = previousReaction === emoji;

    const nextSummaryMap = new Map(post.reaction_summary.map((item) => [item.emoji, item.count]));
    if (previousReaction) {
      const previousCount = nextSummaryMap.get(previousReaction) ?? 0;
      if (previousCount <= 1) nextSummaryMap.delete(previousReaction);
      else nextSummaryMap.set(previousReaction, previousCount - 1);
    }
    if (!sameReaction) {
      nextSummaryMap.set(emoji, (nextSummaryMap.get(emoji) ?? 0) + 1);
    }

    setPosts((prev) =>
      prev.map((p) =>
        p.id === post.id
          ? {
              ...p,
              my_reaction: sameReaction ? null : emoji,
              reaction_count: Math.max(0, p.reaction_count + (previousReaction ? -1 : 0) + (sameReaction ? 0 : 1)),
              reaction_summary: Array.from(nextSummaryMap.entries())
                .map(([emojiKey, count]) => ({ emoji: emojiKey, count }))
                .sort((a, b) => b.count - a.count || a.emoji.localeCompare(b.emoji)),
            }
          : p
      )
    );

    setReactionPickerFor(null);
    if (!sameReaction) {
      setReactionBurstFor(post.id);
      window.setTimeout(() => setReactionBurstFor((current) => (current === post.id ? null : current)), 650);
    }
    try {
      if (sameReaction) {
        await removeReaction(post.id, user.id);
      } else {
        await reactToPost(post.id, user.id, emoji);
      }
    } catch (error) {
      console.error("Error updating reaction:", error);
      void refreshFeed();
    }
  };

  const handleDelete = async (postId: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    try {
      await deleteOwnPost(postId);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const toggleComments = async (postId: number) => {
    const willOpen = !openComments[postId];
    setOpenComments((prev) => ({ ...prev, [postId]: willOpen }));
    if (!willOpen || commentsByPost[postId] || loadingComments[postId]) return;

    setLoadingComments((prev) => ({ ...prev, [postId]: true }));
    try {
      const comments = await getCommunityPostComments(postId);
      setCommentsByPost((prev) => ({ ...prev, [postId]: comments }));
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setLoadingComments((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleComment = async (postId: number) => {
    if (!user) return;
    const draft = commentDrafts[postId]?.trim() ?? "";
    if (!draft || postingComment[postId]) return;

    setPostingComment((prev) => ({ ...prev, [postId]: true }));
    try {
      await createComment(postId, user.id, draft);
      setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));
      const comments = await getCommunityPostComments(postId);
      setCommentsByPost((prev) => ({ ...prev, [postId]: comments }));
      await refreshFeed();
      setOpenComments((prev) => ({ ...prev, [postId]: true }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không gửi được bình luận.");
    } finally {
      setPostingComment((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleDeleteComment = async (postId: number, commentId: number) => {
    setCommentsByPost((prev) => ({
      ...prev,
      [postId]: (prev[postId] ?? []).filter((comment) => comment.id !== commentId),
    }));
    try {
      await deleteOwnComment(commentId);
      await refreshFeed();
    } catch (error) {
      console.error("Error deleting comment:", error);
      const comments = await getCommunityPostComments(postId);
      setCommentsByPost((prev) => ({ ...prev, [postId]: comments }));
    }
  };

  const visiblePosts = posts.filter((post) => {
    const category = getPostCategory(post);
    const matchesTopic = feedFilter === "all" || category === feedFilter;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      post.content.toLowerCase().includes(query) ||
      post.user_name.toLowerCase().includes(query);
    return matchesTopic && matchesSearch;
  });
  const totalReactions = posts.reduce((sum, post) => sum + post.reaction_count, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comment_count, 0);
  const activeTopics = TOPICS.filter((topic) => posts.some((post) => getPostCategory(post) === topic.id && topic.id !== "all")).length;
  const featuredStreak = posts.find((post) => post.kind === "streak")?.reaction_count ?? 0;
  const hotPosts = [...posts]
    .sort((a, b) => b.reaction_count + b.comment_count * 2 - (a.reaction_count + a.comment_count * 2))
    .slice(0, 3);
  const questionPost = posts.find((post) => getPostCategory(post) === "hoi-dap");
  const analysisPost = posts.find((post) => getPostCategory(post) === "phan-tich");
  const achievementPost = posts.find((post) => getPostCategory(post) === "thanh-tuu" || post.kind === "streak");
  const spotlightItems = [
    questionPost && { label: "Câu hỏi cần trả lời", post: questionPost, icon: HelpCircle },
    analysisPost && { label: "Phân tích đáng đọc", post: analysisPost, icon: BarChart3 },
    achievementPost && { label: "Thành tựu mới", post: achievementPost, icon: Target },
  ].filter((item): item is { label: string; post: CommunityFeedPost; icon: typeof HelpCircle } => Boolean(item));
  const shellClass = embedded ? "" : "min-h-screen bg-stone-50 dark:bg-stone-950";

  return (
    <div className={shellClass}>
      <style>{`
        @keyframes finsocial-gradient-drift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes finsocial-shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(220%); }
        }
        .finsocial-hero-gradient {
          background-size: 220% 220%;
          animation: finsocial-gradient-drift 18s ease-in-out infinite alternate;
        }
        .finsocial-progress-shimmer {
          position: relative;
          overflow: hidden;
        }
        .finsocial-progress-shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 42%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.42), transparent);
          animation: finsocial-shimmer 2.6s ease-in-out infinite;
        }
      `}</style>
      {!embedded && (
        <div className="relative overflow-hidden border-b border-stone-800 bg-stone-950 text-white">
          {/* Saigon Skyline Background Image (Crisp & High Clarity) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <Image
              src="/saigon-skyline.jpg"
              alt="Saigon Skyline background"
              fill
              priority
              quality={95}
              sizes="100vw"
              className="object-cover opacity-70 brightness-105 contrast-105 scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/55 to-emerald-950/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/30" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
            <Link href="/dashboard" className="text-stone-300 hover:text-white text-sm font-semibold flex items-center gap-1.5 w-fit bg-stone-900/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-stone-800 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Về Dashboard
            </Link>
            <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/80 px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-300 backdrop-blur-md shadow-lg">
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                  Mạng Xã Hội Học Tài Chính
                </div>
                <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-md">
                  FinSocial Feed
                </h1>
                <p className="mt-2.5 max-w-xl text-sm sm:text-base leading-relaxed text-stone-200 drop-shadow-sm font-medium">
                  Nơi cộng đồng chia sẻ bản tin ngắn, câu hỏi, phân tích BCTC thực tế và ăn mừng thành tựu học tập mỗi ngày.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:min-w-[420px]">
                {[
                  { label: "Bài viết", value: posts.length, color: "text-sky-300 bg-stone-900/80 border-sky-500/30" },
                  { label: "Cảm xúc", value: totalReactions, color: "text-amber-300 bg-stone-900/80 border-amber-500/30" },
                  { label: "Bình luận", value: totalComments, color: "text-emerald-300 bg-stone-900/80 border-emerald-500/30" },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    className={`rounded-2xl px-4 py-3.5 text-center border backdrop-blur-md shadow-xl ${item.color}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 360, damping: 26 }}
                  >
                    <p className={`text-2xl sm:text-3xl font-black ${item.color.split(" ")[0]}`}>
                      <AnimatedCounter value={item.value} />
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-300 mt-0.5">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`${embedded ? "" : "max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6"} px-4 sm:px-6 py-6`}>
        <main className="min-w-0">
          {!embedded && (
            <MarketSentimentWidget
              onShareSentiment={(text) => {
                setContent(text);
                setIsComposeModalOpen(true);
              }}
            />
          )}

          {!embedded && spotlightItems.length > 0 && (
          <div className="mb-5 rounded-[24px] bg-white/90 p-4 shadow-[0_14px_30px_-26px_rgba(15,23,42,0.2)] ring-1 ring-stone-100/60 dark:bg-stone-900/75 dark:ring-stone-800/60">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-[18px] bg-stone-100 text-stone-700 shadow-[0_8px_18px_-18px_rgba(15,23,42,0.2)] ring-1 ring-stone-200 dark:bg-stone-800 dark:text-stone-200 dark:ring-stone-700">
                  <Sparkles className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-[0.14em] text-stone-950 dark:text-stone-50">Nổi bật hôm nay</h2>
                  <p className="text-xs font-medium text-stone-500 dark:text-stone-400">Các bài đáng mở đầu để bắt nhịp nhanh</p>
                </div>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {spotlightItems.map(({ label, post, icon: Icon }) => (
                (() => {
                  const spotlightTone = getToneStyles(getPostAccentTone(post));
                  return (
                    <motion.button
                      key={`${label}-${post.id}`}
                      type="button"
                      onClick={() => void toggleComments(post.id)}
                      className={`group rounded-[20px] p-3 text-left shadow-[0_8px_18px_-18px_rgba(15,23,42,0.18)] transition duration-200 ease-out hover:-translate-y-1 hover:bg-white dark:hover:bg-stone-900 ${spotlightTone.softSurface} ${spotlightTone.border}`}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 360, damping: 26 }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${spotlightTone.icon}`} />
                        <span className={`text-[10px] font-black uppercase tracking-wide ${spotlightTone.icon}`}>{label}</span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs font-medium leading-relaxed text-stone-700 dark:text-stone-300">
                        {post.content || "Bài viết có hình ảnh"}
                      </p>
                      <p className="mt-2 text-[10px] font-medium text-stone-400">{post.user_name} · {post.reaction_count} cảm xúc</p>
                    </motion.button>
                  );
                })()
              ))}
            </div>
          </div>
        )}

        {!embedded && (
          <div className="mb-4 rounded-[24px] bg-white p-3.5 shadow-[0_14px_30px_-26px_rgba(15,23,42,0.22)] ring-1 ring-stone-100/70 dark:bg-stone-900/85 dark:ring-stone-800/60">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm bài viết, người đăng, chủ đề..."
                  className="w-full rounded-[18px] bg-stone-100/80 py-3 pl-10 pr-3 text-sm font-medium text-stone-900 outline-none transition duration-200 ease-out focus:bg-white focus:ring-2 focus:ring-emerald-400/25 dark:bg-stone-950/75 dark:text-stone-100"
                />
              </div>
              <motion.button
                type="button"
                onClick={() => void refreshFeed()}
                className="inline-flex items-center justify-center gap-2 rounded-[18px] bg-stone-100 px-4 py-2.5 text-sm font-bold text-stone-700 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
              >
                <RefreshCw className="h-4 w-4" />
                Làm mới
              </motion.button>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {TOPICS.map((topic) => {
                const Icon = topic.icon;
                const topicTone = getToneStyles(topic.tone);
                const isActive = feedFilter === topic.id;
                return (
                  <motion.button
                    key={topic.id}
                    type="button"
                    onClick={() => setFeedFilter(topic.id)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black transition duration-200 ease-out ${
                      isActive ? topicTone.chipActive : topicTone.chip
                    }`}
                    layout
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  >
                    <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white dark:text-stone-950" : topicTone.icon}`} />
                    {topic.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {user && (
          <>
            {/* Facebook-style Composer Trigger Bar */}
            <div className="mb-6 rounded-[22px] bg-white p-3.5 sm:p-4 shadow-sm ring-1 ring-stone-200/80 dark:bg-stone-900 dark:ring-stone-800 font-sans">
              <div className="flex items-center gap-3">
                <Avatar name={user.user_metadata?.full_name || "Thành viên"} avatarUrl={user.user_metadata?.avatar_url} />
                <button
                  type="button"
                  onClick={() => setIsComposeModalOpen(true)}
                  className="flex-1 rounded-full bg-stone-100 dark:bg-stone-800/80 px-4 py-2.5 text-left text-xs sm:text-sm font-medium text-stone-500 dark:text-stone-400 hover:bg-stone-200/70 dark:hover:bg-stone-750 transition-colors cursor-pointer"
                >
                  {(user.user_metadata?.full_name || "Bạn").split(" ").pop()} ơi, bạn đang nghĩ gì thế?
                </button>
              </div>

              <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-around sm:justify-between px-1">
                <button
                  type="button"
                  onClick={() => setIsComposeModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4 text-emerald-500" />
                  <span>Ảnh / Video</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsComposeModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Chủ đề</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsComposeModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <SmilePlus className="w-4 h-4 text-yellow-500" />
                  <span>Cảm xúc</span>
                </button>
              </div>
            </div>

            {/* ── FACEBOOK-STYLE CREATE POST MODAL POPUP ── */}
            <AnimatePresence>
              {isComposeModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs font-sans">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 12 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-stone-900 shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]"
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100 dark:border-stone-800 relative">
                      <h3 className="w-full text-center text-base font-black text-stone-900 dark:text-stone-100">
                        Tạo bài viết
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsComposeModalOpen(false)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Modal Body (Scrollable) */}
                    <div className="p-4 overflow-y-auto space-y-4 flex-1">
                      {/* User Profile & Audience Dropdowns */}
                      <div className="flex items-center gap-3">
                        <Avatar name={user?.user_metadata?.full_name || "Thành viên"} avatarUrl={user?.user_metadata?.avatar_url} />
                        <div>
                          <p className="text-sm font-black text-stone-900 dark:text-stone-100">
                            {user?.user_metadata?.full_name || "Thành viên FinSocial"}
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1">
                            {/* Topic Dropdown */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setTopicMenuOpen((open) => !open)}
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-[11px] font-extrabold text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                              >
                                <span>💡 {getTopicMeta(selectedTopic).label}</span>
                                <ChevronDown className="w-3 h-3 opacity-60" />
                              </button>
                              <AnimatePresence>
                                {topicMenuOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                                    className="absolute left-0 top-full z-40 mt-1 w-52 rounded-xl bg-white p-1 shadow-lg ring-1 ring-stone-200 dark:bg-stone-900 dark:ring-stone-800"
                                  >
                                    {TOPICS.filter((item) => item.id !== "all").map((item) => (
                                      <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => {
                                          setSelectedTopic(item.id);
                                          setTopicMenuOpen(false);
                                        }}
                                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                                      >
                                        {item.label}
                                      </button>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50">
                              🌐 Công khai
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Main Large Text Area (Comfortable Unlimited Writing) */}
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`${(user?.user_metadata?.full_name || "Bạn").split(" ").pop()} ơi, bạn đang nghĩ gì thế?`}
                        rows={6}
                        autoFocus
                        className="w-full resize-none border-0 text-base sm:text-lg text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none bg-transparent"
                      />

                      {/* Image Preview Area */}
                      {imagePreview && (
                        <div className="relative overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 max-h-60">
                          <img src={imagePreview} alt="Preview" className="w-full h-auto max-h-56 object-cover rounded-xl" />
                          <button
                            type="button"
                            onClick={clearPendingImage}
                            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-stone-900/80 text-white hover:bg-stone-950 transition-colors cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Interactive Poll Creator Box */}
                      {isPollMode && (
                        <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                              <Vote className="w-4 h-4" />
                              Tạo bình chọn / Thăm dò ý kiến
                            </span>
                            <button
                              type="button"
                              onClick={() => setIsPollMode(false)}
                              className="text-[10px] font-bold text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                            >
                              Hủy
                            </button>
                          </div>

                          <input
                            type="text"
                            value={pollQuestion}
                            onChange={(e) => setPollQuestion(e.target.value)}
                            placeholder="Nhập câu hỏi thăm dò ý kiến (Ví dụ: Fed sẽ hạ bao nhiêu bps lãi suất?)"
                            className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-semibold text-stone-900 dark:text-stone-100 focus:outline-none"
                          />

                          <div className="space-y-2">
                            {pollOptions.map((opt, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={opt}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setPollOptions((prev) => prev.map((o, i) => (i === idx ? val : o)));
                                  }}
                                  placeholder={`Lựa chọn ${idx + 1}`}
                                  className="flex-1 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
                                />
                                {pollOptions.length > 2 && (
                                  <button
                                    type="button"
                                    onClick={() => setPollOptions((prev) => prev.filter((_, i) => i !== idx))}
                                    className="p-1 text-stone-400 hover:text-rose-500 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            ))}
                            {pollOptions.length < 4 && (
                              <button
                                type="button"
                                onClick={() => setPollOptions((prev) => [...prev, ""])}
                                className="text-xs font-black text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                              >
                                + Thêm lựa chọn
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Add-ons Toolbar Box (Facebook Style "Thêm vào bài viết của bạn") */}
                      <div className="flex items-center justify-between rounded-xl border border-stone-200 dark:border-stone-800 p-3 bg-stone-50/70 dark:bg-stone-950/40">
                        <span className="text-xs font-black text-stone-700 dark:text-stone-300">
                          Thêm vào bài viết của bạn
                        </span>
                        <div className="flex items-center gap-1.5">
                          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 transition-colors cursor-pointer"
                            title="Thêm ảnh"
                          >
                            <ImageIcon className="w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsPollMode((prev) => !prev);
                              if (!pollQuestion) setPollQuestion("");
                            }}
                            className={`p-2 rounded-full transition-colors cursor-pointer ${
                              isPollMode
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                                : "hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-600 dark:text-amber-400"
                            }`}
                            title="Thêm thăm dò ý kiến"
                          >
                            <Vote className="w-5 h-5" />
                          </button>
                          <EmojiPicker onSelect={(emoji) => setContent((prev) => prev + emoji)} />
                        </div>
                      </div>
                    </div>

                    {/* Modal Footer / Submit Button */}
                    <div className="p-3 border-t border-stone-100 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-950/20">
                      <button
                        type="button"
                        onClick={handlePost}
                        disabled={posting || (!content.trim() && !pendingImage && !(isPollMode && pollQuestion.trim()))}
                        className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-black text-sm py-2.5 transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        {posting ? "Đang đăng..." : "Đăng bài"}
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </>
        )}

        {loading ? (
          <FeedSkeleton />
        ) : visiblePosts.length === 0 ? (
          <p className="text-center text-sm text-stone-400 py-12">
            Chưa có bài chia sẻ nào phù hợp bộ lọc này.
          </p>
        ) : (
          <div className="space-y-4">
            <AnimatePresence initial={false}>
            {visiblePosts.map((post, index) => {
              const category = getPostCategory(post);
              const topic = getTopicMeta(category);
              const TopicIcon = topic.icon;
              const topicTone = getToneStyles(topic.tone);
              const badge = getUserBadge(post);
              const BadgeIcon = badge.icon;
              const badgeTone = getToneStyles(badge.tone);
              return (
              <motion.div
                key={post.id}
                className="group rounded-[24px] bg-white p-5 shadow-[0_16px_34px_-28px_rgba(15,23,42,0.22)] ring-1 ring-stone-100/70 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_20px_42px_-26px_rgba(15,23,42,0.28)] dark:bg-stone-900/85 dark:ring-stone-800/60"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 340, damping: 28, delay: Math.min(index * 0.08, 0.32) }}
              >
                <div className="flex items-start gap-4">
                  <Avatar name={post.user_name} avatarUrl={post.user_avatar} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-black text-stone-950 dark:text-stone-50">{post.user_name}</span>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black ${badgeTone.soft}`}>
                        <BadgeIcon className="h-3 w-3" />
                        {badge.label}
                      </span>
                      {post.kind === "streak" && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">
                          <Flame className="w-3 h-3" /> Streak
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-stone-400 dark:text-stone-500">
                        <Clock3 className="h-3 w-3" />
                        {timeAgo(post.created_at)}
                      </span>
                      </div>
                      {category !== "all" && (
                        <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${topicTone.chip}`}>
                          <TopicIcon className={`h-3 w-3 ${topicTone.icon}`} />
                          {topic.shortLabel}
                        </span>
                      )}
                    </div>
                    {post.content && (
                      <p className="mt-2 whitespace-pre-wrap break-words text-[15px] leading-7 text-stone-800 dark:text-stone-100">
                        {post.content}
                      </p>
                    )}

                    {/* Special Achievement Certificate Card */}
                    {post.metadata && typeof post.metadata === "object" && "type" in post.metadata && post.metadata.type === "level_up_achievement" && (
                      <div className="mt-3.5 p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-stone-900 to-teal-950 border border-emerald-500/40 text-white space-y-2 shadow-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{String(post.metadata.emoji || "🏆")}</span>
                          <div>
                            <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-400/30">
                              Chứng Nhận Thăng Cấp
                            </span>
                            <h4 className="font-black text-sm text-white mt-0.5">
                              Cấp {String(post.metadata.level)}: {String(post.metadata.level_name)}
                            </h4>
                          </div>
                        </div>
                        <p className="text-xs text-stone-300 font-medium">
                          Đạt thành tích vượt qua Bài thi thăng cấp khắt khe với kết quả chính xác <strong className="text-emerald-400">{String(post.metadata.score)}%</strong>!
                        </p>
                      </div>
                    )}

                    {/* Interactive Poll Card Rendering */}
                    {post.metadata && typeof post.metadata === "object" && "type" in post.metadata && post.metadata.type === "poll" && (
                      <InteractivePollCard postId={post.id} metadata={post.metadata as unknown as PollMetadata} />
                    )}

                    {/* Attached Image Rendering */}
                    {post.metadata && typeof post.metadata === "object" && "image_url" in post.metadata && Boolean(post.metadata.image_url) && (
                      <div className="mt-4 relative overflow-hidden rounded-[20px] bg-stone-950/5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.22)] dark:bg-stone-950/40">
                        <img
                          src={String(post.metadata.image_url)}
                          alt="Bài đăng của người dùng"
                          className="w-full h-auto max-h-96 object-contain"
                        />
                      </div>
                    )}

                    {post.reaction_summary.length > 0 && (
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {post.reaction_summary.slice(0, 4).map((reaction) => (
                          <span
                            key={`${post.id}-${reaction.emoji}`}
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold shadow-[0_8px_18px_-18px_rgba(15,23,42,0.16)] transition duration-200 ease-out hover:-translate-y-0.5 ${
                              post.my_reaction === reaction.emoji
                                ? "bg-stone-200 text-stone-900 dark:bg-stone-700 dark:text-stone-50"
                                : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300"
                            }`}
                          >
                            <span>{reaction.emoji}</span>
                            <span>{reaction.count}</span>
                          </span>
                        ))}
                        {post.reaction_count > 0 && (
                          <span className="text-xs font-medium text-stone-400">
                            {post.reaction_count} cảm xúc
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-stone-100 pt-4 dark:border-stone-800">
                      <div className="relative">
                        <motion.button
                          type="button"
                          onClick={() => {
                            if (!user) return;
                            setReactionPickerFor((current) => (current === post.id ? null : post.id));
                          }}
                          disabled={!user}
                          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition duration-200 ease-out cursor-pointer ${
                            post.my_reaction
                              ? "bg-emerald-50 text-emerald-700 shadow-[0_10px_20px_-18px_rgba(16,185,129,0.35)]"
                              : "bg-stone-100 text-stone-600 hover:-translate-y-0.5 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300"
                          }`}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ type: "spring", stiffness: 420, damping: 24 }}
                        >
                          <span className="text-sm leading-none">{post.my_reaction ?? "👍"}</span>
                          <span>{post.my_reaction ? "Đã thả cảm xúc" : "Thả cảm xúc"}</span>
                        </motion.button>

                        <AnimatePresence>
                          {reactionBurstFor === post.id && (
                            <div className="pointer-events-none absolute left-6 top-0 z-20">
                              {["bg-emerald-400", "bg-sky-400", "bg-amber-400", "bg-violet-400", "bg-red-400"].map((color, particleIndex) => (
                                <motion.span
                                  key={`${post.id}-${color}`}
                                  className={`absolute h-1.5 w-1.5 rounded-full ${color}`}
                                  initial={{ opacity: 0.9, scale: 0.9, x: 0, y: 0 }}
                                  animate={{
                                    opacity: 0,
                                    scale: [1, 1.35, 0.7],
                                    x: [-18, -7, 7, 18, 26][particleIndex],
                                    y: [-18, -30, -24, -34, -20][particleIndex],
                                  }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.62, ease: "easeOut" }}
                                />
                              ))}
                            </div>
                          )}
                        </AnimatePresence>

                        {reactionPickerFor === post.id && user && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            className="absolute left-0 bottom-full z-50 mb-2.5 flex items-center gap-1.5 rounded-2xl bg-white/95 dark:bg-stone-900/95 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.3)] border border-stone-200 dark:border-stone-700 backdrop-blur-md whitespace-nowrap"
                          >
                            {REACTION_OPTIONS.map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => {
                                  void handleReact(post, item);
                                  setReactionPickerFor(null);
                                }}
                                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer shrink-0 ${
                                  post.my_reaction === item
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                                    : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700"
                                }`}
                              >
                                <span>{item}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </div>

                      <motion.button
                        type="button"
                        onClick={() => void toggleComments(post.id)}
                        className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3.5 py-2 text-xs font-semibold text-stone-600 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 420, damping: 24 }}
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Bình luận</span>
                        <span>{post.comment_count}</span>
                      </motion.button>

                      {user?.id === post.user_id && (
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold text-stone-400 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Xoá
                        </button>
                      )}
                    </div>

                    {openComments[post.id] && (
                      <div className="mt-4 rounded-[20px] bg-stone-50 p-3.5 dark:bg-stone-950/60">
                        {user && (
                          <div className="mb-3 flex items-start gap-2">
                            <Avatar name={user.user_metadata?.full_name ?? "Bạn"} avatarUrl={user.user_metadata?.avatar_url ?? null} />
                            <div className="flex-1 rounded-[18px] bg-white p-3 shadow-[0_8px_18px_-18px_rgba(15,23,42,0.16)] dark:bg-stone-900">
                              <textarea
                                value={commentDrafts[post.id] ?? ""}
                                onChange={(e) => setCommentDrafts((prev) => ({ ...prev, [post.id]: e.target.value }))}
                                placeholder="Viết bình luận ngắn, kiểu status reply..."
                                rows={2}
                                maxLength={300}
                                className="w-full resize-none bg-transparent text-sm text-stone-900 outline-none dark:text-stone-100"
                              />
                              <div className="mt-2 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-xs text-stone-400">
                                  <button
                                    type="button"
                                    onClick={() => setCommentDrafts((prev) => ({ ...prev, [post.id]: `${prev[post.id] ?? ""}✨` }))}
                                  className="inline-flex items-center gap-1 rounded-full px-2 py-1 transition hover:bg-stone-100 dark:hover:bg-stone-800"
                                >
                                    <SmilePlus className="h-3.5 w-3.5" />
                                    Gợi ý emoji
                                  </button>
                                  <span>{(commentDrafts[post.id] ?? "").length}/300</span>
                                </div>
                                <button
                                  type="button"
                                  disabled={postingComment[post.id] || !(commentDrafts[post.id] ?? "").trim()}
                                  onClick={() => void handleComment(post.id)}
                                  className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-3.5 py-2 text-xs font-bold text-white shadow-[0_10px_22px_-18px_rgba(15,23,42,0.35)] transition duration-200 ease-out hover:-translate-y-0.5 disabled:opacity-40 dark:bg-stone-100 dark:text-stone-900"
                                >
                                  <Send className="h-3.5 w-3.5" />
                                  Gửi
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {loadingComments[post.id] ? (
                          <p className="px-1 py-2 text-xs text-stone-400">Đang tải bình luận...</p>
                        ) : (commentsByPost[post.id] ?? []).length === 0 ? (
                          <p className="px-1 py-2 text-xs text-stone-400">Chưa có bình luận nào. Mở hàng câu đầu tiên đi.</p>
                        ) : (
                          <div className="space-y-2">
                            {(commentsByPost[post.id] ?? []).map((comment) => (
                              <div key={comment.id} className="flex items-start gap-3 rounded-[20px] bg-white p-3.5 shadow-[0_8px_18px_-18px_rgba(15,23,42,0.12)] dark:bg-stone-900">
                                <Avatar name={comment.user_name} avatarUrl={comment.user_avatar} />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-black text-stone-900 dark:text-stone-100">{comment.user_name}</span>
                                    <span className="text-xs text-stone-400">{timeAgo(comment.created_at)}</span>
                                  </div>
                                  <p className="mt-1 text-sm text-stone-700 dark:text-stone-200 whitespace-pre-wrap break-words">
                                    {comment.content}
                                  </p>
                                </div>
                                {user?.id === comment.user_id && (
                                  <button
                                    type="button"
                                    onClick={() => void handleDeleteComment(post.id, comment.id)}
                                    className="rounded-full p-1.5 text-stone-400 transition duration-150 ease-out hover:bg-rose-50 hover:text-rose-500"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )})}
            </AnimatePresence>

            {hasMore && (
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="w-full py-2.5 text-sm font-semibold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition"
              >
                {loadingMore ? "Đang tải..." : "Tải thêm"}
              </button>
            )}
          </div>
        )}
        </main>

        {!embedded && (
          <aside className="space-y-4 lg:sticky lg:top-24 self-start">
            <div className="rounded-[22px] bg-white p-4 shadow-[0_14px_30px_-26px_rgba(15,23,42,0.18)] ring-1 ring-stone-100/70 dark:bg-stone-900/80 dark:ring-stone-800/60">
              <button
                type="button"
                onClick={() => setRulesOpen((prev) => !prev)}
                className="w-full flex items-center justify-between gap-2 text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-sm font-black uppercase tracking-[0.14em] text-stone-900 dark:text-stone-100">Luật feed</h2>
                </div>
                {rulesOpen ? <ChevronUp className="h-4 w-4 text-stone-400" /> : <ChevronDown className="h-4 w-4 text-stone-400" />}
              </button>

              <AnimatePresence>
                {rulesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2 text-xs font-medium text-stone-600 dark:text-stone-300"
                  >
                    <p>• Hữu ích, tích cực, tôn trọng nhau.</p>
                    <p>• Không khuyến nghị chắc chắn, không chia sẻ dữ liệu mật.</p>
                    <p>• Ưu tiên bài viết chi tiết, có ví dụ hoặc nguồn cần kiểm chứng.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="rounded-[22px] bg-white p-4.5 shadow-[0_14px_30px_-26px_rgba(15,23,42,0.18)] ring-1 ring-stone-100/70 dark:bg-stone-900/80 dark:ring-stone-800/60">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-[0.14em] text-stone-900 dark:text-stone-100">Đang nổi bật</h2>
                <TrendingUp className="h-5 w-5 text-amber-500" />
              </div>
              {hotPosts.length === 0 ? (
                <p className="text-sm text-stone-400">Chưa có bài nổi bật.</p>
              ) : (
                <div className="space-y-3">
                  {hotPosts.map((post, index) => (
                    <div key={post.id} className="rounded-[18px] bg-stone-50 p-3 dark:bg-stone-950/60">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-900 text-xs font-black text-white dark:bg-stone-100 dark:text-stone-900">
                          {index + 1}
                        </span>
                        <p className="truncate text-sm font-bold text-stone-900 dark:text-stone-100">{post.user_name}</p>
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs font-medium leading-relaxed text-stone-500 dark:text-stone-400">
                        {post.content || "Bài viết có hình ảnh"}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-[11px] font-bold text-stone-400">
                        <span>{post.reaction_count} cảm xúc</span>
                        <span>{post.comment_count} bình luận</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[22px] bg-white p-4.5 shadow-[0_14px_30px_-26px_rgba(15,23,42,0.18)] ring-1 ring-stone-100/70 dark:bg-stone-900/80 dark:ring-stone-800/60">
              <div className="flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-sky-600" />
                <h2 className="text-sm font-black uppercase tracking-[0.14em] text-stone-900 dark:text-stone-100">Gợi ý đăng bài</h2>
              </div>
              <div className="mt-4 grid gap-2">
                {[
                  "Hôm nay mình hiểu ra...",
                  "Mình đang kẹt ở câu hỏi...",
                  "Một mẹo học BCTC của mình là...",
                  "Ảnh thành quả/streak hôm nay:",
                ].map((idea) => (
                  <button
                    key={idea}
                    type="button"
                    onClick={() => setContent((prev) => (prev ? prev : idea))}
                    className="rounded-[18px] border border-stone-200 bg-stone-50 px-3 py-2 text-left text-xs font-bold text-stone-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300"
                  >
                    {idea}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
