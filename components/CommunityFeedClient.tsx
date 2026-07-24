"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

interface SessionUser {
  id: string;
  user_metadata?: { full_name?: string; avatar_url?: string };
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
      className="rounded-full object-cover border border-stone-200 dark:border-stone-700 flex-shrink-0"
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 font-extrabold flex items-center justify-center border border-stone-300 dark:border-stone-600 flex-shrink-0">
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
  { id: "hoi-dap", label: "Hỏi đáp", shortLabel: "Hỏi đáp", icon: HelpCircle, tag: "#HoiDap ", tone: "rose" },
  { id: "tin-nong", label: "Tin nóng", shortLabel: "Tin nóng", icon: Flame, tag: "#TinNong ", tone: "orange" },
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

function getUserBadge(post: CommunityFeedPost) {
  if (post.kind === "streak") return { label: "Giữ streak", icon: Flame, className: "bg-orange-50 text-orange-700 dark:bg-orange-950/35 dark:text-orange-300" };
  if (post.comment_count >= 3) return { label: "Đang được bàn luận", icon: MessageCircle, className: "bg-sky-50 text-sky-700 dark:bg-sky-950/35 dark:text-sky-300" };
  if (post.reaction_count >= 5) return { label: "Bài viết nổi bật", icon: Award, className: "bg-amber-50 text-amber-700 dark:bg-amber-950/35 dark:text-amber-300" };
  return { label: "Thành viên FinSocial", icon: ShieldCheck, className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/35 dark:text-emerald-300" };
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
    if (!user || (!content.trim() && !pendingImage) || posting) return;
    setPosting(true);
    try {
      let imageUrl: string | undefined = undefined;
      if (pendingImage) {
        imageUrl = await uploadChatImage(user.id, pendingImage);
      }
      await createManualPost(user.id, content, imageUrl, {
        category: selectedTopic,
      });
      setContent("");
      clearPendingImage();
      await refreshFeed();
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
      {!embedded && (
        <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
            <Link href="/dashboard" className="text-stone-500 dark:text-stone-400 hover:opacity-70 text-sm font-semibold flex items-center gap-1 w-fit">
              <ArrowLeft className="w-4 h-4" /> Về Dashboard
            </Link>
            <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                  <MessageCircle className="h-3.5 w-3.5" />
                  FinSocial
                </div>
                <h1 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-stone-950 dark:text-stone-50">
                  FinSocial
                </h1>
                <p className="mt-1.5 max-w-2xl text-sm font-medium text-stone-500 dark:text-stone-400">
                  Mạng xã hội học tài chính: đăng bản tin ngắn, câu hỏi, phân tích, ảnh thành tựu và cập nhật học tập của mọi người.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:min-w-[360px]">
                {[
                  { label: "Bài viết", value: posts.length },
                  { label: "Cảm xúc", value: totalReactions },
                  { label: "Bình luận", value: totalComments },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2 text-center dark:border-stone-800 dark:bg-stone-900">
                    <p className="text-lg font-black text-stone-950 dark:text-stone-50">{item.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-stone-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`${embedded ? "" : "max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6"} px-4 sm:px-6 py-6`}>
        <main className="min-w-0">
        {!embedded && spotlightItems.length > 0 && (
          <div className="mb-4 rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 shadow-sm dark:border-emerald-900/60 dark:from-emerald-950/35 dark:to-teal-950/20">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-100 dark:bg-stone-950/60 dark:text-emerald-300 dark:ring-emerald-900">
                  <Sparkles className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-[0.14em] text-stone-950 dark:text-stone-50">Nổi bật hôm nay</h2>
                  <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">Các bài đáng đọc để bắt nhịp cộng đồng nhanh hơn</p>
                </div>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {spotlightItems.map(({ label, post, icon: Icon }) => (
                <button
                  key={`${label}-${post.id}`}
                  type="button"
                  onClick={() => void toggleComments(post.id)}
                  className="rounded-2xl border border-white/70 bg-white/80 p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 dark:border-stone-800 dark:bg-stone-950/45"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                    <span className="text-[10px] font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-300">{label}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs font-semibold leading-relaxed text-stone-700 dark:text-stone-300">
                    {post.content || "Bài viết có hình ảnh"}
                  </p>
                  <p className="mt-2 text-[10px] font-bold text-stone-400">{post.user_name} · {post.reaction_count} cảm xúc</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {!embedded && (
          <div className="mb-4 rounded-3xl border border-stone-200 bg-white p-3 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm bài viết, người đăng, chủ đề..."
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-2.5 pl-10 pr-3 text-sm font-medium text-stone-900 outline-none transition focus:border-emerald-500 focus:bg-white dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>
              <button
                type="button"
                onClick={() => void refreshFeed()}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-bold text-stone-600 transition hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"
              >
                <RefreshCw className="h-4 w-4" />
                Làm mới
              </button>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {TOPICS.map((topic) => {
                const Icon = topic.icon;
                const isActive = feedFilter === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setFeedFilter(topic.id)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black transition ${
                      isActive
                        ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                        : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-400 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {topic.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {user && (
          <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-3xl p-4 sm:p-5 mb-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">Tạo bài viết</p>
                <h2 className="mt-1 text-lg font-black text-stone-950 dark:text-stone-50">Bạn học được gì hôm nay?</h2>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-black uppercase text-stone-500 dark:bg-stone-800 dark:text-stone-400">
                Public feed
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <span className="text-[10px] font-black uppercase text-stone-400 mr-1">Chủ đề:</span>
              {TOPICS.filter((topic) => topic.id !== "all").map((topic) => {
                const Icon = topic.icon;
                const isActive = selectedTopic === topic.id;
                return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => {
                    setSelectedTopic(topic.id);
                    setContent((prev) => (topic.tag && !prev.includes(topic.tag) ? `${topic.tag}${prev.replace(/^#\\S+\\s*/, "")}` : prev));
                  }}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold transition-colors cursor-pointer ${
                    isActive
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                      : "border-transparent bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-emerald-950"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {topic.label}
                </button>
              )})}
            </div>

            <div className="mb-3 rounded-2xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-950/50">
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">Mẫu đăng nhanh</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {POST_TEMPLATES.map((template) => {
                  const Icon = template.icon;
                  return (
                    <button
                      key={template.title}
                      type="button"
                      onClick={() => {
                        setSelectedTopic(template.topic);
                        setContent(template.text);
                      }}
                      className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 text-left text-xs font-bold text-stone-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {template.title}
                    </button>
                  );
                })}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Chia sẻ cảm nghĩ, mẹo đầu tư hoặc hình ảnh thành quả học tập hôm nay..."
              maxLength={500}
              rows={2.5}
              className="w-full resize-none px-3.5 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />

            {/* Image Preview Thumbnail */}
            {imagePreview && (
              <div className="relative mt-2.5 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 max-h-48 bg-stone-100 dark:bg-stone-800 w-fit">
                <img src={imagePreview} alt="Preview" className="h-44 w-auto object-cover rounded-2xl" />
                <button
                  type="button"
                  onClick={clearPendingImage}
                  className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-stone-900/70 text-white hover:bg-stone-900 transition-colors cursor-pointer"
                  title="Xóa ảnh"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1.5">
                <EmojiPicker onSelect={(emoji) => setContent((prev) => prev + emoji)} />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-emerald-600 dark:text-stone-400 dark:hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
                  title="Đính kèm hình ảnh"
                >
                  <ImageIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="hidden sm:inline">Thêm ảnh</span>
                </button>
                <span className={`text-xs ml-1 ${content.length > 440 ? "text-amber-600 font-bold" : "text-stone-400"}`}>{content.length}/500</span>
              </div>
              <button
                onClick={handlePost}
                disabled={posting || (!content.trim() && !pendingImage)}
                className="flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-black disabled:opacity-40 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> {posting ? "Đang tải ảnh..." : "Đăng"}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-center text-sm text-stone-400 py-12">Đang tải...</p>
        ) : visiblePosts.length === 0 ? (
          <p className="text-center text-sm text-stone-400 py-12">
            Chưa có bài chia sẻ nào phù hợp bộ lọc này.
          </p>
        ) : (
          <div className="space-y-4">
            {visiblePosts.map((post) => {
              const category = getPostCategory(post);
              const topic = getTopicMeta(category);
              const TopicIcon = topic.icon;
              const badge = getUserBadge(post);
              const BadgeIcon = badge.icon;
              return (
              <div key={post.id} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-4 sm:p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <Avatar name={post.user_name} avatarUrl={post.user_avatar} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-stone-900 dark:text-stone-100">{post.user_name}</span>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black ${badge.className}`}>
                        <BadgeIcon className="h-3 w-3" />
                        {badge.label}
                      </span>
                      {post.kind === "streak" && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 px-2 py-0.5 rounded-full">
                          <Flame className="w-3 h-3" /> Streak
                        </span>
                      )}
                      <span className="text-xs text-stone-400 dark:text-stone-500">{timeAgo(post.created_at)}</span>
                      </div>
                      {category !== "all" && (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-black uppercase text-stone-500 dark:bg-stone-800 dark:text-stone-400">
                          <TopicIcon className="h-3 w-3" />
                          {topic.shortLabel}
                        </span>
                      )}
                    </div>
                    {post.content && (
                      <p className="text-sm text-stone-800 dark:text-stone-200 mt-1 whitespace-pre-wrap break-words">
                        {post.content}
                      </p>
                    )}

                    {/* Attached Image Rendering */}
                    {post.metadata && typeof post.metadata === "object" && "image_url" in post.metadata && Boolean(post.metadata.image_url) && (
                      <div className="mt-3 relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 max-h-96 bg-stone-950/5 dark:bg-stone-950/40">
                        <img
                          src={String(post.metadata.image_url)}
                          alt="Bài đăng của người dùng"
                          className="w-full h-auto max-h-96 object-contain rounded-2xl"
                        />
                      </div>
                    )}

                    {post.reaction_summary.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {post.reaction_summary.slice(0, 4).map((reaction) => (
                          <span
                            key={`${post.id}-${reaction.emoji}`}
                            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                              post.my_reaction === reaction.emoji
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : "border-stone-200 bg-stone-50 text-stone-600"
                            }`}
                          >
                            <span>{reaction.emoji}</span>
                            <span>{reaction.count}</span>
                          </span>
                        ))}
                        {post.reaction_count > 0 && (
                          <span className="text-xs text-stone-400">
                            {post.reaction_count} cảm xúc
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-stone-100 pt-3 dark:border-stone-800">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            if (!user) return;
                            setReactionPickerFor((current) => (current === post.id ? null : post.id));
                          }}
                          disabled={!user}
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                            post.my_reaction
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300"
                          }`}
                        >
                          <span className="text-sm leading-none">{post.my_reaction ?? "👍"}</span>
                          <span>{post.my_reaction ? "Đã thả cảm xúc" : "Thả cảm xúc"}</span>
                        </button>

                        {reactionPickerFor === post.id && user && (
                          <div className="absolute left-0 bottom-full mb-1.5 z-30 flex items-center gap-1.5 rounded-full border border-stone-200 bg-white p-1.5 shadow-xl dark:border-stone-700 dark:bg-stone-900 animate-in fade-in zoom-in-95 duration-150">
                            {REACTION_OPTIONS.map((emoji) => (
                              <button
                                key={emoji}
                                type="button"
                                onClick={() => {
                                  void handleReact(post, emoji);
                                  setReactionPickerFor(null);
                                }}
                                className={`rounded-full p-1.5 text-lg transition hover:scale-125 hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-95 cursor-pointer ${
                                  post.my_reaction === emoji ? "bg-emerald-100/70" : ""
                                }`}
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => void toggleComments(post.id)}
                        className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-600 transition hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Bình luận</span>
                        <span>{post.comment_count}</span>
                      </button>

                      {user?.id === post.user_id && (
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-stone-400 transition hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Xoá
                        </button>
                      )}
                    </div>

                    {openComments[post.id] && (
                      <div className="mt-4 rounded-2xl bg-stone-50 p-3 dark:bg-stone-950/60">
                        {user && (
                          <div className="mb-3 flex items-start gap-2">
                            <Avatar name={user.user_metadata?.full_name ?? "Bạn"} avatarUrl={user.user_metadata?.avatar_url ?? null} />
                            <div className="flex-1 rounded-2xl border border-stone-200 bg-white p-2 dark:border-stone-700 dark:bg-stone-900">
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
                                    className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-stone-100 dark:hover:bg-stone-800"
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
                                  className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-3 py-1.5 text-xs font-bold text-white transition disabled:opacity-40 dark:bg-stone-100 dark:text-stone-900"
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
                              <div key={comment.id} className="flex items-start gap-2 rounded-2xl bg-white p-3 dark:bg-stone-900">
                                <Avatar name={comment.user_name} avatarUrl={comment.user_avatar} />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-bold text-stone-900 dark:text-stone-100">{comment.user_name}</span>
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
                                    className="rounded-full p-1.5 text-stone-400 transition hover:bg-rose-50 hover:text-rose-500"
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
              </div>
            )})}

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
            <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <h2 className="text-sm font-black uppercase tracking-[0.14em] text-stone-900 dark:text-stone-100">Luật feed</h2>
              </div>
              <div className="mt-4 space-y-3 text-sm font-medium text-stone-600 dark:text-stone-300">
                <p>Viết ngắn, có ích, tôn trọng người học khác.</p>
                <p>Không đăng khuyến nghị mua bán chắc chắn, không chia sẻ dữ liệu cá nhân hoặc tài liệu mật.</p>
                <p>Một bài hay nên có: điều học được, ví dụ, câu hỏi hoặc nguồn cần kiểm chứng.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-[0.14em] text-stone-900 dark:text-stone-100">Đang nổi bật</h2>
                <TrendingUp className="h-5 w-5 text-amber-500" />
              </div>
              {hotPosts.length === 0 ? (
                <p className="text-sm text-stone-400">Chưa có bài nổi bật.</p>
              ) : (
                <div className="space-y-3">
                  {hotPosts.map((post, index) => (
                    <div key={post.id} className="rounded-2xl bg-stone-50 p-3 dark:bg-stone-950/60">
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

            <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
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
                    className="rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2 text-left text-xs font-bold text-stone-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300"
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
