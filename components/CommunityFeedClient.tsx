"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  Send,
  ShieldCheck,
  SmilePlus,
  Sparkles,
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
  Pencil,
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import EmojiPicker from "@/components/EmojiPicker";
import { uploadChatImage, isAllowedChatImage } from "@/lib/supabase-chat";
import {
  COMMENT_MAX_LENGTH,
  MANUAL_POST_MAX_LENGTH,
  canEditPost,
  createComment,
  createManualPost,
  deleteOwnComment,
  deleteOwnPost,
  getCommunityFeed,
  getCommunityPostComments,
  reactToPost,
  removeReaction,
  subscribeToCommunityFeed,
  updateOwnComment,
  updateOwnPost,
  type CommunityFeedPost,
  type CommunityPostComment,
} from "@/lib/supabase-community";
import { isValidAvatar } from "@/lib/avatar-utils";
import { animateCountTo } from "@/lib/animate-count";
import { getCurrentUser, metadataString } from "@/lib/current-user";
import { timeAgo } from "@/lib/time-ago";
import FollowButton from "@/components/FollowButton";
import { useLocalStorageValue, writeLocalStorageValue } from "@/lib/use-local-storage-value";
import FeedLeaderboardCard from "@/components/FeedLeaderboardCard";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale, type Dictionary } from "@/lib/i18n";
import { isSystemPost, visibleFeedPosts } from "@/lib/community-feed-visibility";

/** Kênh báo khi một lá phiếu vừa được lưu, trong cùng tab. */
const VOTE_CHANGED_EVENT = "thtcdn:community-vote";

interface SessionUser {
  id: string;
  user_metadata?: { full_name?: string; avatar_url?: string };
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
  // Sub-component, nên có useI18n() riêng thay vì luồn `t` qua prop.
  const { t } = useI18n();
  const initials = (name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return isValidAvatar(avatarUrl) ? (
    <Image
      src={avatarUrl}
      alt={name || t.chat.userAlt}
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

/* i18n-ignore-start: these strings are stored values, not copy. handleReact writes
   the reaction string itself into post.my_reaction and later compares it with
   ===, so a translated option would no longer match any reaction already saved. */
const REACTION_OPTIONS = ["💡 Hay", "🧠 Cần phản biện", "❓ Cùng thắc mắc", "📌 Đã lưu", "🔥 Rất thực tế"];
/* i18n-ignore-end */

// Chỉ còn icon và tông màu. Nhãn nằm ở t.feed.topics theo id, và các hashtag
// nhận diện chủ đề nằm ở lib/community-feed-visibility.ts cùng với hàm đọc
// chúng - chúng từng được chép lại ở đây trong một trường `tag` mà không dòng
// nào đọc tới, bên cạnh một hàm phân loại viết thẳng đúng những chuỗi đó.
// KHÔNG CÒN BẢNG CHỦ ĐỀ. Sáu chip lọc ở đầu trang (Tất cả / Mẹo tài chính /
// Phân tích / Hỏi đáp / Tin nóng / AI tài chính) và hộp chọn chủ đề trong ô
// soạn bài đã bị gỡ theo yêu cầu của chủ dự án: ở quy mô cộng đồng này, bắt
// người viết chọn ngăn trước khi được nói là rào cản, không phải tổ chức.
//
// Hashtag cũ vẫn nằm trong nội dung bài đã lưu và không bị đụng tới - chúng
// chỉ trở lại thành chữ thường. Xem lib/community-feed-visibility.ts.

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

// Plain function, not a component, so the dictionary is a parameter rather
// than a useI18n() call.
function getUserBadge(post: CommunityFeedPost, t: Dictionary) {
  if (post.kind === "streak") return { label: t.feed.badgeStreak, icon: Flame, tone: "emerald" as ToneKey };
  if (post.comment_count >= 3) return { label: t.feed.badgeDiscussed, icon: MessageCircle, tone: "sky" as ToneKey };
  if (post.reaction_count >= 5) return { label: t.feed.badgeFeatured, icon: Award, tone: "amber" as ToneKey };
  return { label: t.feed.memberRole, icon: ShieldCheck, tone: "emerald" as ToneKey };
}

// Mọi bài dùng chung một tông kể từ khi bỏ phân loại: tông từng đến từ chủ đề
// của bài, và không còn chủ đề nào để lấy.
function getPostAccentTone(): ToneKey {
  return "stone";
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
  const { t } = useI18n();
  const todayStr = new Date().toISOString().slice(0, 10);
  const storageKey = `thtcdn_market_sentiment_${todayStr}`;

  // Lá phiếu đã bỏ nằm ở localStorage; đọc thẳng thay vì chép vào state bằng
  // effect - bản cũ hiện hai nút chưa bình chọn một nhịp rồi mới đánh dấu lại.
  const savedVote = useLocalStorageValue(storageKey, VOTE_CHANGED_EVENT);
  const votedOption = savedVote === "bullish" || savedVote === "bearish" ? savedVote : null;
  const [stats, setStats] = useState({ bullish: 104, bearish: 48 });

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

    writeLocalStorageValue(storageKey, option, VOTE_CHANGED_EVENT);

    toast.success(
      option === "bullish"
        ? t.feed.sentimentBullish
        : t.feed.sentimentBearish
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
                {t.feed.sentimentTitle}
              </span>
              <span className="text-[10px] font-bold text-stone-400">{todayStr}</span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-stone-100 mt-0.5">
              {t.feed.sentimentQuestion}
            </h3>
          </div>
        </div>
        {votedOption && onShareSentiment && (
          <button
            type="button"
            onClick={() => {
              const text = format(t.feed.sentimentPost, {
                view: votedOption === "bullish" ? t.feed.voteBullish : t.feed.voteBearish,
                bull: bullishPct,
                bear: bearishPct,
              });
              onShareSentiment(text);
            }}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all cursor-pointer shrink-0 shadow-sm"
          >
            {t.feed.sentimentShare}
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
              <p className="font-black text-xs sm:text-sm text-stone-100">{t.feed.bullishTitle}</p>
              <p className="text-[10px] text-stone-400">{t.feed.bullishSub}</p>
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
              <p className="font-black text-xs sm:text-sm text-stone-100">{t.feed.bearishTitle}</p>
              <p className="text-[10px] text-stone-400">{t.feed.bearishSub}</p>
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
          <span>{format(t.feed.bullishVotes, { count: stats.bullish, percent: bullishPct })}</span>
          <span>{format(t.feed.totalVotes, { count: total })}</span>
          <span>{format(t.feed.bearishVotes, { count: stats.bearish, percent: bearishPct })}</span>
        </div>
      </div>
    </div>
  );
}

function InteractivePollCard({ postId, metadata }: { postId: number; metadata: PollMetadata }) {
  const { t } = useI18n();
  const storageKey = `thtcdn_poll_vote_${postId}`;
  const savedPollVote = useLocalStorageValue(storageKey, VOTE_CHANGED_EVENT);
  const userVotedId = savedPollVote === null || savedPollVote === "" ? null : Number(savedPollVote);
  const [options, setOptions] = useState<PollOption[]>(metadata.options || []);

  const handleVote = (optionId: number) => {
    if (userVotedId !== null) return;
    setOptions((prev) =>
      prev.map((opt) => (opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt))
    );
    writeLocalStorageValue(storageKey, String(optionId), VOTE_CHANGED_EVENT);
    toast.success(t.feed.pollVoted);
  };

  const totalVotes = options.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <div className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-amber-500/30 text-stone-900 dark:text-stone-100 font-sans space-y-3 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider">
          {t.feed.pollTitle}
        </span>
        <span className="text-[10px] font-bold text-stone-400">{format(t.feed.pollVoteCount, { count: totalVotes })}</span>
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
  const { t } = useI18n();
  const supabase = createClient();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [posts, setPosts] = useState<CommunityFeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [content, setContent] = useState("");
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);
  const [openComments, setOpenComments] = useState<Record<number, boolean>>({});
  // Inline post editing. Only one post is editable at a time - opening a
  // second would leave unsaved text stranded in the first.
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [commentEditDraft, setCommentEditDraft] = useState("");
  const [savingCommentEdit, setSavingCommentEdit] = useState(false);
  const [commentsByPost, setCommentsByPost] = useState<Record<number, CommunityPostComment[]>>({});
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({});
  const [loadingComments, setLoadingComments] = useState<Record<number, boolean>>({});
  const [postingComment, setPostingComment] = useState<Record<number, boolean>>({});
  const [reactionPickerFor, setReactionPickerFor] = useState<number | null>(null);
  const [reactionBurstFor, setReactionBurstFor] = useState<number | null>(null);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [isPollMode, setIsPollMode] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const userIdRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sentinelRef = useRef<HTMLButtonElement>(null);
  // Bản chụp mới nhất của `posts` cho `loadMore` đọc.
  //
  // Không để `posts` vào danh sách phụ thuộc của `loadMore`: mỗi lần nối thêm
  // một trang là `loadMore` thành một hàm mới, là effect quan sát tháo và gắn
  // lại observer, và một observer vừa gắn sẽ bắn NGAY nếu vạch canh đang nằm
  // trong khung nhìn - tức là tải trang kế tiếp trước khi người đọc kịp cuộn.
  //
  // Đồng bộ trong effect chứ không gán thẳng khi dựng: chạm vào ref lúc dựng
  // là thứ React Compiler chặn (`Cannot access refs during render`), và ở đây
  // effect là đủ - observer chỉ bắn sau khi trang đã vẽ xong.
  const postsRef = useRef<CommunityFeedPost[]>([]);
  useEffect(() => {
    postsRef.current = posts;
  }, [posts]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const invalid = isAllowedChatImage(file);
    if (invalid) {
      toast.error(t.libData.chatUpload[invalid]);
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

  // Số bài NGƯỜI VIẾT muốn có trên trang đầu, và số trang tối đa được lấy để
  // đạt được nó. Hai con số này tồn tại vì bài chuỗi ngày do hệ thống tự đăng
  // chiếm gần hết phần đầu bảng: lấy đúng một trang 20 bài rồi lọc chúng ra thì
  // dòng chính gần như rỗng, dù bên dưới vẫn còn đầy bài người viết. Đây chính
  // là lý do luật lọc bị gỡ lần trước - lỗi nằm ở chỗ lấy dữ liệu, không nằm ở
  // luật lọc.
  //
  // Giới hạn 5 trang để một cộng đồng chỉ toàn bài hệ thống không kéo theo một
  // vòng lặp không đáy; khi đó nút "xem thêm" vẫn còn và người dùng tự quyết.
  const MIN_HUMAN_POSTS = 8;
  const MAX_FILL_PAGES = 10;

  const refreshFeed = useCallback(async () => {
    // Ngưỡng "hôm nay" tính lại ở đây thay vì dùng biến ngoài, để vòng lặp
    // không phụ thuộc vào thứ tự khởi tạo trong thân component.
    const dayStart = new Date();
    dayStart.setHours(0, 0, 0, 0);

    let feed = await getCommunityFeed();
    let more = feed.length === 20;

    for (let page = 1; page < MAX_FILL_PAGES; page++) {
      if (!more) break;
      const enoughHuman = feed.filter((post) => !isSystemPost(post)).length >= MIN_HUMAN_POSTS;
      // Lấy tiếp chừng nào bài cuối cùng vẫn còn thuộc hôm nay: bảng chuỗi ngày
      // bên phải phải đếm được ĐỦ chuỗi của hôm nay, và một trang 20 bài không
      // đủ cho một ngày đông người học. Dừng ngay khi đã vượt qua ranh giới
      // ngày, vì mọi bài phía sau đều cũ hơn - danh sách sắp theo id giảm dần.
      const stillToday = new Date(feed[feed.length - 1].created_at) >= dayStart;
      if (enoughHuman && !stillToday) break;

      const next = await getCommunityFeed(feed[feed.length - 1].id);
      if (next.length === 0) {
        more = false;
        break;
      }
      feed = [...feed, ...next];
      more = next.length === 20;
    }

    setPosts(feed);
    setHasMore(more);
  }, []);

  useEffect(() => {
    const init = async () => {
      const sessionUser = await getCurrentUser();
      if (sessionUser) {
        // `user_metadata` của Supabase là `Record<string, unknown>` vì nội dung
        // do nhà cung cấp đăng nhập quyết; `metadataString` là chỗ nêu tên phép
        // ép kiểu đó đúng một lần thay vì rải ra khắp phần JSX bên dưới.
        setUser({
          id: sessionUser.id,
          user_metadata: {
            full_name: metadataString(sessionUser, "full_name") ?? undefined,
            avatar_url: metadataString(sessionUser, "avatar_url") ?? undefined,
          },
        });
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

  // `loadingRef` chứ không chỉ `loadingMore`.
  //
  // Cuộn tự động bắn nhiều lần liên tiếp: IntersectionObserver gọi lại mỗi lần
  // vạch cuối vào khung nhìn, và trong lúc `setLoadingMore(true)` chờ React vẽ
  // lại thì `loadingMore` vẫn còn là false ở lần gọi kế. Hai lượt tải cùng lúc
  // dùng chung một `oldestId`, nên cùng một trang bài được nối vào hai lần -
  // đúng loại lỗi mà nút bấm tay không bao giờ lộ ra, vì người ta không bấm
  // được hai lần trong một khung hình.
  const loadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || postsRef.current.length === 0) return;
    loadingRef.current = true;
    setLoadingMore(true);
    try {
      const oldestId = postsRef.current[postsRef.current.length - 1].id;
      const more = await getCommunityFeed(oldestId);
      setPosts((prev) => [...prev, ...more]);
      setHasMore(more.length === 20);
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      loadingRef.current = false;
      setLoadingMore(false);
    }
  }, []);

  // Cuộn tới đáy thì tự tải tiếp.
  //
  // Vạch canh đặt trước đáy 600px, không phải ĐÚNG đáy: chạm đáy rồi mới bắt
  // đầu gọi mạng thì người đọc luôn nhìn thấy một khoảng trống và một dòng
  // "đang tải" - tức là vẫn phải chờ, chỉ khác là không phải bấm. Tải trước một
  // màn hình thì bài kế đã nằm sẵn ở đó lúc cuộn tới.
  //
  // Vạch canh vẫn là một cái NÚT bấm được (xem phần JSX): trình duyệt không có
  // IntersectionObserver, hoặc người dùng đang duyệt bằng bàn phím và không hề
  // "cuộn" theo nghĩa nào cả, thì lối cũ còn nguyên.
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) void loadMore();
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const handlePost = async () => {
    if (!user) {
      toast.error(t.feed.signInToPost);
      return;
    }
    const text = content.trim();
    const hasValidPoll = isPollMode && pollQuestion.trim() && pollOptions.filter((o) => o.trim()).length >= 2;
    if (!text && !pendingImage && !hasValidPoll) {
      toast.error(t.feed.emptyPost);
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
        ...(pollData ? pollData : {}),
      });

      setContent("");
      clearPendingImage();
      setIsPollMode(false);
      setPollQuestion("");
      setPollOptions(["", ""]);
      setIsComposeModalOpen(false);
      await refreshFeed();
      toast.success(t.feed.posted);
      toast.success(t.feed.postedShare);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.feed.postFailed);
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

  // Following/unfollowing an author affects every one of their posts
  // currently in view, not just the one the click came from - FollowButton
  // already updated the server, this just keeps the rest of the feed's
  // buttons in sync so scrolling past another post by the same person shows
  // the same state instead of a stale one until the next refetch.
  const handleFollowChange = (authorId: string, following: boolean) => {
    setPosts((prev) => prev.map((p) => (p.user_id === authorId ? { ...p, is_following: following } : p)));
  };

  const handleDelete = async (postId: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    try {
      await deleteOwnPost(postId);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const startEditPost = (post: CommunityFeedPost) => {
    setEditingPostId(post.id);
    setEditDraft(post.content);
  };

  const cancelEditPost = () => {
    setEditingPostId(null);
    setEditDraft("");
  };

  const handleSaveEdit = async (postId: number) => {
    const next = editDraft.trim();
    if (!next || savingEdit) return;

    const previous = posts.find((p) => p.id === postId)?.content ?? "";
    if (next === previous) {
      cancelEditPost();
      return;
    }

    setSavingEdit(true);
    try {
      await updateOwnPost(postId, next);
      // Patched locally rather than refetching the whole feed: a refresh
      // would reset the reader's scroll position and collapse open comment
      // threads, which is a lot of disruption for a one-field change.
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, content: next, edited_at: new Date().toISOString() } : p))
      );
      cancelEditPost();
    } catch (error) {
      // updateOwnPost turns an RLS refusal into a thrown error, so this also
      // covers "the database said no" - not just network failures.
      toast.error(error instanceof Error ? error.message : t.feed.postEditFailed);
    } finally {
      setSavingEdit(false);
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
      toast.error(error instanceof Error ? error.message : t.feed.commentFailed);
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

  const startEditComment = (comment: CommunityPostComment) => {
    setEditingCommentId(comment.id);
    setCommentEditDraft(comment.content);
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setCommentEditDraft("");
  };

  const handleSaveCommentEdit = async (postId: number, commentId: number) => {
    const next = commentEditDraft.trim();
    if (!next || savingCommentEdit) return;

    const previous = (commentsByPost[postId] ?? []).find((c) => c.id === commentId)?.content ?? "";
    if (next === previous) {
      cancelEditComment();
      return;
    }

    setSavingCommentEdit(true);
    try {
      await updateOwnComment(commentId, next);
      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: (prev[postId] ?? []).map((c) =>
          c.id === commentId ? { ...c, content: next, edited_at: new Date().toISOString() } : c
        ),
      }));
      cancelEditComment();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.feed.commentEditFailed);
    } finally {
      setSavingCommentEdit(false);
    }
  };

  // Deep-link support: NotificationBell links to /finsocial?post=<id> so
  // tapping "X đã bình luận vào bài viết của bạn" lands directly on that
  // post with its thread open, instead of dumping the reader at the top of
  // a feed they'd then have to hunt through. Guarded by a ref (not just
  // "already open") because `posts` gets a new array reference on every
  // real-time refresh - without the ref, each refresh after the first would
  // re-run this and could yank the reader's scroll position back down again
  // while they're mid-read of something else entirely.
  const handledDeepLinkRef = useRef<number | null>(null);
  useEffect(() => {
    const targetId = searchParams.get("post");
    if (!targetId || posts.length === 0) return;
    const postId = Number(targetId);
    if (!Number.isFinite(postId) || handledDeepLinkRef.current === postId) return;
    if (!posts.some((p) => p.id === postId)) return;
    handledDeepLinkRef.current = postId;

    // Clear anything that might be hiding the target post from the list.
    // Bộ lọc chủ đề đã bỏ, nên chỉ còn ô tìm kiếm có thể đang giấu bài này.
    setOpenComments((prev) => ({ ...prev, [postId]: true }));

    void (async () => {
      setLoadingComments((prev) => ({ ...prev, [postId]: true }));
      try {
        const comments = await getCommunityPostComments(postId);
        setCommentsByPost((prev) => ({ ...prev, [postId]: comments }));
      } catch (error) {
        console.error("Error loading comments for deep-linked post:", error);
      } finally {
        setLoadingComments((prev) => ({ ...prev, [postId]: false }));
      }
    })();

    requestAnimationFrame(() => {
      document.getElementById(`community-post-${postId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [posts, searchParams]);

  // Quy tắc "bài thành tựu ra khỏi dòng chính" nằm ở
  // lib/community-feed-visibility.ts cùng bộ test của nó - màn hình này tự lấy
  // dữ liệu từ Supabase sau tường đăng nhập, nên đó là chỗ duy nhất kiểm được
  // nó mà không cần một phiên đăng nhập thật và vài chục bài dựng sẵn.
  // Vẫn gọi visibleFeedPosts: ngoài tìm kiếm nó còn lọc bài hệ thống ra khỏi
  // dòng (xem isSystemPost). Bỏ ô tìm kiếm chỉ làm tham số thứ hai luôn rỗng.
  const visiblePosts = visibleFeedPosts(posts, "");
  // Mọi con số và mọi bảng xếp hạng đọc từ đây, không đọc từ `posts`. Bài chuỗi
  // ngày do hệ thống tự đăng chiếm gần hết số bài mới nhất, nên để chúng trong
  // mẫu thì "sôi nổi nhất" và "tổng lượt thả cảm xúc" đang đo hoạt động của máy
  // chứ không phải của người - và bảng Trending bên phải hiện ra ba dòng "vừa
  // đạt chuỗi 7 ngày" y hệt nhau.
  const humanPosts = posts.filter((post) => !isSystemPost(post));
  // `hiddenAchievements` đã bỏ cùng quy tắc hạ ưu tiên: không bài nào bị ẩn khỏi
  // dòng chính nữa, nên một con số "đang bị ẩn" chỉ có thể sai.
  //
  // Thay vào đó là phân biệt hai trạng thái rỗng. Chúng từng dùng chung một câu,
  // và đó là chỗ làm người dùng tưởng mất bài: "không khớp bộ lọc" đúng khi có
  // bộ lọc, nhưng khi đang xem tất cả mà chưa có bài nào thì nó đọc như một lời
  // thông báo mất dữ liệu.
  // Bài chuỗi ngày của HÔM NAY, cho bảng bên phải. Chúng đã ra khỏi dòng chính
  // nhưng không biến mất - đây là chỗ chúng thuộc về: một bảng đếm được, đọc
  // lướt qua, không chen vào giữa những bài người thật viết.
  //
  // Mốc "hôm nay" theo giờ máy người đọc chứ không theo UTC: người học ở Việt
  // Nam mở lúc 7 giờ sáng phải thấy chuỗi của sáng nay, không phải một danh
  // sách đã đổi ngày từ 7 giờ tối hôm trước.
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const todayStreakPosts = posts.filter(
    (post) => isSystemPost(post) && new Date(post.created_at) >= startOfToday
  );

  const hotPosts = [...humanPosts]
    .sort((a, b) => b.reaction_count + b.comment_count * 2 - (a.reaction_count + a.comment_count * 2))
    .slice(0, 3);
  // Nền TRẮNG.
  //
  // Trước đây là #fbfaf7 - nền giấy ngà của hệ chung, cùng giá trị trang chủ
  // dùng cho `.band-paper`. Đổi sang trắng là cố ý lệch khỏi giá trị đó, nên
  // ghi lại ở đây: các thẻ bài viết trong dòng tin đều là `bg-white`, và trên
  // nền ngà chúng nổi lên bằng một bậc xám mờ tới mức chỉ còn viền và bóng đổ
  // làm việc. Nền trắng bỏ hẳn bậc đó - thẻ và nền cùng một mặt phẳng, ranh
  // giới do viền vẽ ra chứ không do hai sắc trắng khác nhau.
  const shellClass = embedded ? "" : "min-h-screen bg-white dark:bg-stone-950";

  return (
    <div className={shellClass}>
      <style>{`
        @keyframes finsocial-shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(220%); }
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
        // Dải mực của hệ chung (app/globals.css), không phải một trang bìa
        // riêng. Trước đây chỗ này là ảnh skyline ở opacity 70% phủ HAI lớp
        // gradient chồng nhau, viền dưới, và ba tấm thẻ số bo 2xl mang ba màu
        // nhấn khác nhau kèm shadow-xl - tức mọi thứ trang chủ cố ý không làm.
        // Đó là lý do FinSocial đọc như một ứng dụng khác dán vào cạnh sản
        // phẩm chứ không phải một chương của nó.
        <div className="band band-ink band-divider text-white">
          {/* Ảnh giữ lại nhưng hạ xuống mức HOA VĂN NỀN: nó mang bản sắc Sài
              Gòn, thứ đáng giữ, nhưng ở 70% nó là ảnh bìa và nuốt mất chữ. Một
              lớp phủ phẳng thay cho hai lớp chuyển sắc - dải này là một mặt
              giấy, không phải một khung cảnh. */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <Image
              src="/saigon-skyline.jpg"
              alt=""
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover opacity-[0.13]"
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-9 sm:py-12">
            {/* Liên kết chữ, không phải viên thuốc. Một đường quay lại không
                cần nền mờ, viền và bo tròn để người ta hiểu nó bấm được. */}
            <Link
              href="/dashboard"
              className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-stone-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" /> {t.feed.backToDashboard}
            </Link>

            <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                {/* Nhãn mắt dùng lớp `.eyebrow` chung: chữ và màu, không hộp.
                    Xanh lá ở đây là trạng thái "đang hoạt động", đúng vai trò
                    duy nhất nó được giữ trong hệ. */}
                <p className="eyebrow flex items-center gap-2 text-emerald-400">
                  <MessageCircle className="h-3.5 w-3.5" />
                  {t.feed.eyebrow}
                </p>
                <h1 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.08] tracking-tight text-white">
                  {t.feed.title}
                </h1>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-stone-300">
                  {t.feed.subtitle}
                </p>
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



        {user && (
          <>
            {/* Facebook-style Composer Trigger Bar */}
            <div className="mb-6 rounded-[22px] bg-white p-3.5 sm:p-4 shadow-sm ring-1 ring-stone-200/80 dark:bg-stone-900 dark:ring-stone-800 font-sans">
              <div className="flex items-center gap-3">
                <Avatar name={user.user_metadata?.full_name || t.feed.anonMember} avatarUrl={user.user_metadata?.avatar_url} />
                <button
                  type="button"
                  onClick={() => setIsComposeModalOpen(true)}
                  className="flex-1 rounded-full bg-stone-100 dark:bg-stone-800/80 px-4 py-2.5 text-left text-xs sm:text-sm font-medium text-stone-500 dark:text-stone-400 hover:bg-stone-200/70 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                >
                  {format(t.feed.composerPrompt, { name: (user.user_metadata?.full_name || t.feed.composerFallbackName).split(" ").pop() ?? "" })}
                </button>
              </div>

              <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-around sm:justify-between px-1">
                <button
                  type="button"
                  onClick={() => setIsComposeModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4 text-emerald-500" />
                  <span>{t.feed.addMedia}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsComposeModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>{t.feed.addTopic}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsComposeModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <SmilePlus className="w-4 h-4 text-yellow-500" />
                  <span>{t.feed.addFeeling}</span>
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
                        {t.feed.createPost}
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
                        <Avatar name={user?.user_metadata?.full_name || t.feed.anonMember} avatarUrl={user?.user_metadata?.avatar_url} />
                        <div>
                          <p className="text-sm font-black text-stone-900 dark:text-stone-100">
                            {user?.user_metadata?.full_name || t.feed.memberRole}
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1">

                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50">
                              {t.feed.visibilityPublic}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Main Large Text Area (Comfortable Unlimited Writing) */}
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={format(t.feed.composerPlaceholder, { name: (user?.user_metadata?.full_name || t.feed.composerFallbackName).split(" ").pop() ?? "" })}
                        rows={6}
                        autoFocus
                        className="w-full resize-none border-0 text-base sm:text-lg text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none bg-transparent"
                      />

                      {/* Image Preview Area */}
                      {imagePreview && (
                        <div className="relative overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 max-h-60">
                          <img src={imagePreview} alt={t.feed.previewAlt} className="w-full h-auto max-h-56 object-cover rounded-xl" />
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
                              {t.feed.createPoll}
                            </span>
                            <button
                              type="button"
                              onClick={() => setIsPollMode(false)}
                              className="text-[10px] font-bold text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                            >
                              {t.feed.cancel}
                            </button>
                          </div>

                          <input
                            type="text"
                            value={pollQuestion}
                            onChange={(e) => setPollQuestion(e.target.value)}
                            placeholder={t.feed.pollQuestionPlaceholder}
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
                                  placeholder={format(t.feed.pollOptionPlaceholder, { index: idx + 1 })}
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
                                {t.feed.addPollOption}
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Add-ons Toolbar Box (Facebook Style "Thêm vào bài viết của bạn") */}
                      <div className="flex items-center justify-between rounded-xl border border-stone-200 dark:border-stone-800 p-3 bg-stone-50/70 dark:bg-stone-950/40">
                        <span className="text-xs font-black text-stone-700 dark:text-stone-300">
                          {t.feed.addToPost}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 transition-colors cursor-pointer"
                            title={t.feed.addImageTitle}
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
                            title={t.feed.addPollTitle}
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
                        {posting ? t.feed.posting : t.feed.post}
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
          <div className="py-12 text-center">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {t.feed.feedEmptyNoPosts}
            </p>
            {/* Không còn ô tìm kiếm nên dòng rỗng CHỈ có thể vì chưa ai đăng
                bài. Điều kiện `emptyBecauseNoPosts` từng gác nút này - nó phân
                biệt "chưa có bài" với "tìm không ra" - và đã đi cùng ô tìm kiếm. */}
            <button
              type="button"
              onClick={() => setIsComposeModalOpen(true)}
              className="mt-3 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
            >
              {t.feed.feedEmptyWrite}
            </button>
          </div>
        ) : (
          // Bài viết là BÀI VIẾT, ngăn nhau bằng nét kẻ - không phải một chồng
          // thẻ nổi. Trước đây mỗi bài là một khối bo 24px, nền trắng, viền
          // ring, đổ bóng, và nhấc lên 4px khi rê chuột; xếp mười bài như thế
          // thì trang đọc như một bảng điều khiển đầy ô chứ như một dòng thời
          // gian để đọc. Bỏ vỏ thẻ đi thì thứ còn lại là chữ, đúng thứ người ta
          // vào đây để xem.
          //
          // Nền `bg-white/60` rất nhạt chỉ để tách bài khỏi nền giấy khi rê
          // chuột - một chỉ báo "đang ở đây", không phải một mặt phẳng mới.
          <div className="divide-y divide-stone-200/70 dark:divide-stone-800/70">
            <AnimatePresence initial={false}>
            {visiblePosts.map((post, index) => {
              const badge = getUserBadge(post, t);
              const BadgeIcon = badge.icon;
              const badgeTone = getToneStyles(badge.tone);
              return (
              <motion.div
                key={post.id}
                id={`community-post-${post.id}`}
                className="group -mx-3 px-3 py-6 transition-colors duration-150 hover:bg-white/60 sm:-mx-4 sm:px-4 dark:hover:bg-stone-900/40"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: "easeOut", delay: Math.min(index * 0.04, 0.16) }}
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
                        <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded-full">
                          <Flame className="flame-burn w-3 h-3 fill-current" /> {t.feed.streak}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-stone-400 dark:text-stone-500">
                        <Clock3 className="h-3 w-3" />
                        {timeAgo(post.created_at, t.libData.timeAgo)}
                      </span>
                      {post.edited_at && (
                        // Readers who already reacted deserve to know the text
                        // moved after they did.
                        <span
                          className="text-xs text-stone-400 dark:text-stone-500"
                          title={format(t.feed.editedAt, { when: timeAgo(post.edited_at, t.libData.timeAgo) })}
                        >
                          {t.feed.edited}
                        </span>
                      )}
                      {user && post.user_id !== user.id && (
                        <FollowButton
                          currentUserId={user.id}
                          targetUserId={post.user_id}
                          initialFollowing={post.is_following}
                          onChange={(following) => handleFollowChange(post.user_id, following)}
                        />
                      )}
                      </div>
                    </div>
                    {editingPostId === post.id ? (
                      <div className="mt-2">
                        <textarea
                          value={editDraft}
                          onChange={(e) => setEditDraft(e.target.value.slice(0, MANUAL_POST_MAX_LENGTH))}
                          rows={4}
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Escape") cancelEditPost();
                            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void handleSaveEdit(post.id);
                          }}
                          className="w-full resize-none rounded-2xl border border-stone-200 bg-white p-3 text-[15px] leading-7 text-stone-800 outline-none focus:border-emerald-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                        />
                        <div className="mt-2 flex items-center justify-between gap-3">
                          <span className="text-[11px] font-bold tabular-nums text-stone-400 dark:text-stone-500">
                            {editDraft.trim().length}/{MANUAL_POST_MAX_LENGTH}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={cancelEditPost}
                              className="rounded-full px-3.5 py-1.5 text-xs font-bold text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
                            >
                              {t.feed.cancelEdit}
                            </button>
                            <button
                              onClick={() => void handleSaveEdit(post.id)}
                              disabled={savingEdit || !editDraft.trim()}
                              className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-black text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {savingEdit ? t.feed.saving : t.feed.save}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      post.content && (
                        <p className="mt-2 whitespace-pre-wrap break-words text-[15px] leading-7 text-stone-800 dark:text-stone-100">
                          {post.content}
                        </p>
                      )
                    )}

                    {/* Special Achievement Certificate Card */}
                    {post.metadata && typeof post.metadata === "object" && "type" in post.metadata && post.metadata.type === "level_up_achievement" && (
                      <div className="mt-3.5 p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-stone-900 to-teal-950 border border-emerald-500/40 text-white space-y-2 shadow-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{String(post.metadata.emoji || "🏆")}</span>
                          <div>
                            <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-400/30">
                              {t.feed.levelCertTitle}
                            </span>
                            <h4 className="font-black text-sm text-white mt-0.5">
                              {format(t.feed.levelCertLevel, { level: String(post.metadata.level), name: String(post.metadata.level_name) })}
                            </h4>
                          </div>
                        </div>
                        <p className="text-xs text-stone-300 font-medium">
                          {t.feed.levelCertBodyPart1}
                          <strong className="text-emerald-400">{String(post.metadata.score)}%</strong>
                          {t.feed.levelCertBodyPart2}
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
                        {/* `<img>` chứ KHÔNG phải next/image, và đây là lần thứ
                            hai chỗ này quay về `<img>`.

                            Lần đầu, chú thích nói lý do là bucket không nằm
                            trong remotePatterns. Lý do đó sai và bị bác đúng:
                            uploadChatImage() ghi vào "chat-images" của chính
                            project này, tức `<ref>.supabase.co`, mà
                            remotePatterns có `*.supabase.co`. Nhưng kết luận
                            "vậy thì đổi sang next/image được" lại không được
                            KIỂM: /finsocial cần đăng nhập, không phiên nào mở
                            được nó, và ảnh chết ngay trên production sau khi
                            đổi.

                            Bài học là về thứ tự, không phải về remotePatterns:
                            bác bỏ một lý do sai không chứng minh được điều
                            ngược lại. Muốn đổi lại thì cần đúng một con số -
                            mã trạng thái của `/_next/image?url=...` với một URL
                            ảnh thật - chứ không cần thêm lập luận nào.

                            `loading`/`decoding` giữ lại: chúng không cần trình
                            tối ưu, và đây là feed cuộn vô hạn. */}
                        <img
                          src={String(post.metadata.image_url)}
                          alt={t.feed.postImageAlt}
                          loading="lazy"
                          decoding="async"
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
                            {post.reaction_count} {t.feed.reactionsSuffix}
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
                          <span>{post.my_reaction ? t.feed.reacted : t.feed.react}</span>
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
                        <span>{t.feed.comment}</span>
                        <span>{post.comment_count}</span>
                      </motion.button>

                      {/* Editing is narrower than deleting: you may delete any
                          post of yours, but only edit one you actually wrote.
                          System-generated posts (streaks, level-ups) carry the
                          platform's voice and must stay as issued. */}
                      {canEditPost(post, user?.id ?? null) && editingPostId !== post.id && (
                        <button
                          onClick={() => startEditPost(post)}
                          className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold text-stone-400 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/30"
                        >
                          <Pencil className="w-3.5 h-3.5" /> {t.feed.editComment}
                        </button>
                      )}

                      {user?.id === post.user_id && (
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold text-stone-400 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> {t.feed.deleteComment}
                        </button>
                      )}
                    </div>

                    {openComments[post.id] && (
                      <div className="mt-4 rounded-[20px] bg-stone-50 p-3.5 dark:bg-stone-950/60">
                        {user && (
                          <div className="mb-3 flex items-start gap-2">
                            <Avatar name={user.user_metadata?.full_name ?? t.feed.anonYou} avatarUrl={user.user_metadata?.avatar_url ?? null} />
                            <div className="flex-1 rounded-[18px] bg-white p-3 shadow-[0_8px_18px_-18px_rgba(15,23,42,0.16)] dark:bg-stone-900">
                              <textarea
                                value={commentDrafts[post.id] ?? ""}
                                onChange={(e) => setCommentDrafts((prev) => ({ ...prev, [post.id]: e.target.value }))}
                                placeholder={t.feed.commentPlaceholder}
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
                                    {t.feed.emojiHint}
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
                                  {t.feed.send}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {loadingComments[post.id] ? (
                          <p className="px-1 py-2 text-xs text-stone-400">{t.feed.commentsLoading}</p>
                        ) : (commentsByPost[post.id] ?? []).length === 0 ? (
                          <p className="px-1 py-2 text-xs text-stone-400">{t.feed.commentsEmpty}</p>
                        ) : (
                          <div className="space-y-2">
                            {(commentsByPost[post.id] ?? []).map((comment) => (
                              <div key={comment.id} className="flex items-start gap-3 rounded-[20px] bg-white p-3.5 shadow-[0_8px_18px_-18px_rgba(15,23,42,0.12)] dark:bg-stone-900">
                                <Avatar name={comment.user_name} avatarUrl={comment.user_avatar} />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-black text-stone-900 dark:text-stone-100">{comment.user_name}</span>
                                    <span className="text-xs text-stone-400">{timeAgo(comment.created_at, t.libData.timeAgo)}</span>
                                    {comment.edited_at && (
                                      <span className="text-xs text-stone-400" title={format(t.feed.editedAt, { when: timeAgo(comment.edited_at, t.libData.timeAgo) })}>
                                        {t.feed.edited}
                                      </span>
                                    )}
                                  </div>
                                  {editingCommentId === comment.id ? (
                                    <div className="mt-1">
                                      <textarea
                                        value={commentEditDraft}
                                        onChange={(e) => setCommentEditDraft(e.target.value.slice(0, COMMENT_MAX_LENGTH))}
                                        rows={2}
                                        autoFocus
                                        onKeyDown={(e) => {
                                          if (e.key === "Escape") cancelEditComment();
                                          if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            void handleSaveCommentEdit(post.id, comment.id);
                                          }
                                        }}
                                        className="w-full resize-none rounded-xl border border-stone-200 bg-white p-2 text-sm text-stone-700 outline-none focus:border-emerald-400 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200"
                                      />
                                      <div className="mt-1.5 flex items-center justify-between gap-2">
                                        <span className="text-[10px] font-bold tabular-nums text-stone-400">
                                          {commentEditDraft.trim().length}/{COMMENT_MAX_LENGTH}
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                          <button
                                            type="button"
                                            onClick={cancelEditComment}
                                            className="rounded-full px-2.5 py-1 text-[11px] font-bold text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
                                          >
                                            {t.feed.cancelEdit}
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => void handleSaveCommentEdit(post.id, comment.id)}
                                            disabled={savingCommentEdit || !commentEditDraft.trim()}
                                            className="rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-black text-white hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                                          >
                                            {savingCommentEdit ? t.feed.saving : t.feed.save}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="mt-1 text-sm text-stone-700 dark:text-stone-200 whitespace-pre-wrap break-words">
                                      {comment.content}
                                    </p>
                                  )}
                                </div>
                                {user?.id === comment.user_id && editingCommentId !== comment.id && (
                                  <div className="flex shrink-0 items-center gap-0.5">
                                    <button
                                      type="button"
                                      onClick={() => startEditComment(comment)}
                                      aria-label={t.feed.editCommentAria}
                                      className="rounded-full p-1.5 text-stone-400 transition duration-150 ease-out hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/30"
                                    >
                                      <Pencil className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => void handleDeleteComment(post.id, comment.id)}
                                      aria-label={t.feed.deleteCommentAria}
                                      className="rounded-full p-1.5 text-stone-400 transition duration-150 ease-out hover:bg-rose-50 hover:text-rose-500"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
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

            {/* Vạch canh CHÍNH LÀ cái nút cũ.
                Cuộn tới gần đây thì trang tự tải tiếp (xem effect quan sát ở
                trên); nhưng nó vẫn là một `<button>` thật, vẫn nhận tiêu điểm
                bàn phím và vẫn bấm được - nên khi trình duyệt không có
                IntersectionObserver, hoặc lượt tải trước vừa lỗi mạng, lối cũ
                còn nguyên thay vì cụt đường. */}
            {hasMore && (
              <button
                ref={sentinelRef}
                onClick={loadMore}
                disabled={loadingMore}
                aria-live="polite"
                className="w-full py-2.5 text-sm font-medium text-stone-400 transition hover:text-stone-900 dark:text-stone-500 dark:hover:text-stone-100"
              >
                {loadingMore ? t.feed.loading : t.feed.loadMore}
              </button>
            )}
          </div>
        )}
        </main>

        {!embedded && (
          <aside className="space-y-4 lg:sticky lg:top-24 self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1 [scrollbar-width:thin]">
            {/* Bảng xếp hạng đứng đầu cột: nó là thứ duy nhất ở đây đổi theo
                ngày và có người khác trong đó, nên nó là lý do người ta liếc
                sang cột này. Luật feed và gợi ý đăng bài đứng yên hàng tuần. */}
            <FeedLeaderboardCard />
            <div className="rounded-[22px] bg-white p-4 shadow-[0_14px_30px_-26px_rgba(15,23,42,0.18)] ring-1 ring-stone-100/70 dark:bg-stone-900/80 dark:ring-stone-800/60">
              <button
                type="button"
                onClick={() => setRulesOpen((prev) => !prev)}
                className="w-full flex items-center justify-between gap-2 text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-sm font-black uppercase tracking-[0.14em] text-stone-900 dark:text-stone-100">{t.feed.rulesTitle}</h2>
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
                    <p>{t.feed.rule1}</p>
                    <p>{t.feed.rule2}</p>
                    <p>{t.feed.rule3}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="rounded-[22px] bg-white p-4.5 shadow-[0_14px_30px_-26px_rgba(15,23,42,0.18)] ring-1 ring-stone-100/70 dark:bg-stone-900/80 dark:ring-stone-800/60">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-[0.14em] text-stone-900 dark:text-stone-100">{t.feed.streakBoardTitle}</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-black text-red-600 dark:bg-red-950/40 dark:text-red-300">
                  <Flame className="flame-burn h-3.5 w-3.5 fill-current" />
                  {todayStreakPosts.length}
                </span>
              </div>
              {todayStreakPosts.length === 0 ? (
                <p className="text-sm text-stone-400">{t.feed.streakBoardEmpty}</p>
              ) : (
                /* Cuộn riêng trong thẻ, KHÔNG cắt bớt danh sách: một ngày đông
                   người học thì đây là bảng dài nhất cột này, và cắt nó ở con số
                   nào cũng là giấu đi đúng thứ người xem mở nó ra để đếm. */
                <div className="max-h-80 space-y-2 overflow-y-auto pr-1 [scrollbar-width:thin]">
                  {todayStreakPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center gap-2.5 rounded-[16px] bg-stone-50 px-3 py-2 dark:bg-stone-950/60"
                    >
                      <Avatar name={post.user_name} avatarUrl={post.user_avatar} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-stone-900 dark:text-stone-100">{post.user_name}</p>
                        <p className="truncate text-[11px] font-medium text-stone-500 dark:text-stone-400">
                          {timeAgo(post.created_at, t.libData.timeAgo)}
                        </p>
                      </div>
                      <Flame className="flame-burn h-4 w-4 shrink-0 fill-red-500 text-red-500" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[22px] bg-white p-4.5 shadow-[0_14px_30px_-26px_rgba(15,23,42,0.18)] ring-1 ring-stone-100/70 dark:bg-stone-900/80 dark:ring-stone-800/60">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-[0.14em] text-stone-900 dark:text-stone-100">{t.feed.trendingTitle}</h2>
                <TrendingUp className="h-5 w-5 text-amber-500" />
              </div>
              {hotPosts.length === 0 ? (
                <p className="text-sm text-stone-400">{t.feed.trendingEmpty}</p>
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
                        {post.content || t.feed.postWithImage}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-[11px] font-bold text-stone-400">
                        <span>{post.reaction_count} {t.feed.reactionsSuffix}</span>
                        <span>{post.comment_count} {t.feed.commentsSuffix}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[22px] bg-white p-4.5 shadow-[0_14px_30px_-26px_rgba(15,23,42,0.18)] ring-1 ring-stone-100/70 dark:bg-stone-900/80 dark:ring-stone-800/60">
              <div className="flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-sky-600" />
                <h2 className="text-sm font-black uppercase tracking-[0.14em] text-stone-900 dark:text-stone-100">{t.feed.promptsTitle}</h2>
              </div>
              <div className="mt-4 grid gap-2">
                {[
                  t.feed.prompt1,
                  t.feed.prompt2,
                  t.feed.prompt3,
                  t.feed.prompt4,
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
