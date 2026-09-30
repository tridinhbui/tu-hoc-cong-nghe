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
  Bookmark,
  Flame,
  Image as ImageIcon,
  Lightbulb,
  MessageCircle,
  Send,
  ShieldCheck,
  SmilePlus,
  Trash2,
  TrendingUp,
  X,
  Clock3,
  ChevronDown,
  ChevronUp,
  Vote,
  CheckCircle2,
  Pencil,
  ThumbsUp,
} from "lucide-react";
import Glyph from "@/components/Glyph";
import { createClient } from "@/lib/cloudflare";
import EmojiPicker from "@/components/EmojiPicker";
import { uploadChatImage, isAllowedChatImage } from "@/lib/cloudflare-chat";
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
} from "@/lib/cloudflare-community";
import { isValidAvatar } from "@/lib/avatar-utils";
import { getCurrentUser } from "@/lib/current-user";
import { timeAgo } from "@/lib/time-ago";
import FollowButton from "@/components/FollowButton";
import { useLocalStorageValue, writeLocalStorageValue } from "@/lib/use-local-storage-value";
import FeedLeaderboardCard from "@/components/FeedLeaderboardCard";
import { useI18n } from "@/lib/i18n/context";
import { APP_SYS } from "@/components/analytics/system-codes";
import { IconTile, StatusDot, Sys, btnPrimary, btnSecondary, chipAccent, chipReward, panel, panelFocus, textLink } from "@/components/ui/system";
import { format, type Dictionary } from "@/lib/i18n";
import { isSystemPost, visibleFeedPosts } from "@/lib/community-feed-visibility";

/** Kênh báo khi một lá phiếu vừa được lưu, trong cùng tab. */
const VOTE_CHANGED_EVENT = "thtcdn:community-vote";

interface SessionUser {
  id: string;
  user_metadata?: { full_name?: string; avatar_url?: string };
}

/* Nút nhỏ của dòng tin - cùng họ với btnPrimary / btnSecondary ở
   components/ui/system.tsx, chỉ thu cỡ lại cho hàng thao tác dưới mỗi bài. */
const btnSmPrimary =
  "inline-flex items-center justify-center gap-1.5 rounded-control bg-brand-600 px-3 py-1.5 text-xs font-bold text-white shadow-[0_4px_12px_-6px_rgb(41_97_184/0.7)] transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none";
const btnSmGhost =
  "inline-flex items-center gap-1.5 rounded-control px-2.5 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-accent-wash hover:text-accent-strong disabled:cursor-not-allowed disabled:opacity-50";
const asideHead = "flex items-center justify-between gap-3 border-b border-line-soft pb-2.5";
const asideTitle = "text-sm font-black tracking-tight text-ink-max";

function FeedSkeleton() {
  // Khối tĩnh, không nhấp nháy: khung chờ là chỗ trống nhạt, không phải một
  // hiệu ứng (cùng cách ActivityPanel ở trang chủ chờ dữ liệu).
  return (
    <div aria-hidden className="space-y-3">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className={`${panel} p-4 sm:p-5`}>
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 shrink-0 rounded-full bg-surface-sunken" />
            <div className="min-w-0 flex-1">
              <div className="h-3.5 w-36 rounded-xs bg-surface-sunken" />
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full rounded-xs bg-surface-raised" />
                <div className="h-3 w-4/5 rounded-xs bg-surface-raised" />
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
      className="h-10 w-10 shrink-0 rounded-full object-cover"
    />
  ) : (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-wash text-sm font-extrabold text-accent-strong">
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
// KHÔNG CÒN BẢNG CHỦ ĐỀ. Các chip lọc ở đầu trang và hộp chọn chủ đề trong ô
// soạn bài đã bị gỡ theo yêu cầu của chủ dự án: ở quy mô cộng đồng này, bắt
// người viết chọn ngăn trước khi được nói là rào cản, không phải tổ chức.
//
// Hashtag cũ vẫn nằm trong nội dung bài đã lưu và không bị đụng tới - chúng
// chỉ trở lại thành chữ thường. Xem lib/community-feed-visibility.ts.

// Nhãn vai trò cạnh tên người viết. Từng mang năm tông màu (xanh, trời, hổ
// phách, cam, tím) - màu để trang trí chứ không nói gì thêm, nên giờ tất cả
// đi bằng một nhãn viền 1px xám. Nhãn vẫn là dữ liệu thật: nó suy ra từ loại
// bài và số bình luận / cảm xúc.
// Plain function, not a component, so the dictionary is a parameter rather
// than a useI18n() call.
function getUserBadge(post: CommunityFeedPost, t: Dictionary) {
  if (post.kind === "streak") return { label: t.feed.badgeStreak, icon: Flame };
  if (post.comment_count >= 3) return { label: t.feed.badgeDiscussed, icon: MessageCircle };
  if (post.reaction_count >= 5) return { label: t.feed.badgeFeatured, icon: Award };
  return { label: t.feed.memberRole, icon: ShieldCheck };
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

// Ô "tâm lý thị trường" (bullish / bearish) đã gỡ khỏi đầu dòng tin: nó khởi
// đầu từ hai con số viết cứng (104 / 48) không ai từng bỏ phiếu, và lá phiếu
// chỉ nằm trong localStorage của máy người bấm - tức một tỷ lệ bịa hiện như
// dữ liệu cộng đồng. Luật 5 của hệ thiết kế: siêu dữ liệu không bịa.

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
    <div className="mt-3 space-y-3 rounded-control bg-surface-raised p-3.5">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-accent-strong">
          <Vote className="h-3.5 w-3.5" aria-hidden />
          {t.feed.pollTitle}
        </span>
        <span className="font-mono text-[11px] tabular-nums text-ink-faint">
          {format(t.feed.pollVoteCount, { count: totalVotes })}
        </span>
      </div>

      <p className="text-sm font-black leading-snug text-ink-max">{metadata.question}</p>

      <div className="space-y-1.5">
        {options.map((opt) => {
          const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
          const isMyChoice = userVotedId === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleVote(opt.id)}
              disabled={userVotedId !== null}
              aria-pressed={isMyChoice}
              className={`relative w-full cursor-pointer overflow-hidden rounded-control border bg-surface p-2.5 text-left text-xs font-semibold transition-colors disabled:cursor-default ${
                isMyChoice
                  ? "border-accent text-accent-strong"
                  : "border-transparent text-ink-body hover:border-accent-line"
              }`}
            >
              {/* Thanh tỷ lệ: xanh cho lựa chọn của bạn (chức năng), đá cho phần còn lại. */}
              <div
                style={{ width: `${pct}%` }}
                className={`absolute inset-y-0 left-0 ${
                  isMyChoice ? "bg-accent-wash" : "bg-surface-sunken/70"
                }`}
                aria-hidden
              />
              <div className="relative flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5">
                  {isMyChoice && <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden />}
                  {opt.text}
                </span>
                <span className="shrink-0 font-mono tabular-nums text-ink-muted">
                  {pct}% ({opt.votes})
                </span>
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
  const cloudflare = createClient();
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
        // Giữ nguyên hình dạng `user_metadata` cục bộ ở đây dù lib/current-user.ts
        // giờ trả fullName/avatarUrl trực tiếp - đổi hình dạng này thì phải sửa
        // theo cả sáu chỗ đọc user_metadata bên dưới, ngoài phạm vi lần sửa này.
        setUser({
          id: sessionUser.id,
          user_metadata: {
            full_name: sessionUser.fullName ?? undefined,
            avatar_url: sessionUser.avatarUrl ?? undefined,
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
  }, [refreshFeed, cloudflare]);

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
              // Bắt đầu từ 0 phiếu. Bản trước gieo 1-5 phiếu ngẫu nhiên cho mỗi
              // lựa chọn - một kết quả bình chọn bịa, hiện như ý kiến thật.
              .map((opt, idx) => ({ id: idx, text: opt.trim(), votes: 0 })),
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

  // Deep-link support: NotificationBell links to /bang-tin?post=<id> so
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
  // dữ liệu từ Cloudflare sau tường đăng nhập, nên đó là chỗ duy nhất kiểm được
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
  // Canvas xanh băng (`bg-page`) của hệ chung: các bài viết là thẻ trắng
  // `bg-surface` nổi lên trên nó bằng bóng mảnh, nên thứ bậc đến từ hai sắc
  // nền chứ không từ viền xám (2026-09-30). Trước đây là nền trắng phẳng, thẻ
  // và nền cùng một mặt phẳng.
  const shellClass = embedded ? "" : "min-h-screen bg-page";

  return (
    <div className={shellClass}>
      {!embedded && (
        // Dải mực của hệ chung (app/globals.css), không phải một trang bìa
        // riêng. Trước đây chỗ này là ảnh skyline ở opacity 70% phủ HAI lớp
        // gradient chồng nhau, viền dưới, và ba tấm thẻ số bo 2xl mang ba màu
        // nhấn khác nhau kèm shadow-xl - tức mọi thứ trang chủ cố ý không làm.
        <div className="band band-ink band-divider text-white">
          {/* Ảnh giữ lại nhưng hạ xuống mức HOA VĂN NỀN: nó mang bản sắc Sài
              Gòn, thứ đáng giữ, nhưng ở 70% nó là ảnh bìa và nuốt mất chữ. */}
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
            <Link
              href="/dashboard"
              className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-200 transition-colors hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden /> {t.feed.backToDashboard}
            </Link>

            <div className="mt-7 max-w-2xl">
              {/* Mã định vị + nhãn mắt trên một đường kẻ 1px, như đầu section
                  của trang chủ trên dải mực. */}
              <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-2">
                <Sys className="text-brand-200">{APP_SYS.feed}</Sys>
                <span className="eyebrow text-right text-brand-100">{t.feed.eyebrow}</span>
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-[1.08] tracking-tight text-white">
                {t.feed.title}
              </h1>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-brand-100">
                {t.feed.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={`${embedded ? "" : "max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8"} px-4 sm:px-6 py-6`}>
        <main className="min-w-0">
        {user && (
          <>
            {/* Ô gọi soạn bài: ĐIỂM NHẤN của màn (panelFocus) - việc chính ở
                đây là viết, nên chỉ khối này mang nền băng + viền xanh. */}
            <div className={`mb-6 p-3.5 sm:p-4 ${panelFocus}`}>
              <div className="flex items-center gap-3">
                <Avatar name={user.user_metadata?.full_name || t.feed.anonMember} avatarUrl={user.user_metadata?.avatar_url} />
                <button
                  type="button"
                  onClick={() => setIsComposeModalOpen(true)}
                  className="flex-1 cursor-pointer rounded-control border border-accent-line bg-surface px-3.5 py-2.5 text-left text-xs font-medium text-ink-muted shadow-xs transition-colors hover:border-accent hover:text-ink-body sm:text-sm"
                >
                  {format(t.feed.composerPrompt, { name: (user.user_metadata?.full_name || t.feed.composerFallbackName).split(" ").pop() ?? "" })}
                </button>
              </div>

              <div className="mt-3 flex items-center justify-around gap-1 border-t border-accent-line/60 pt-2.5 sm:justify-start">
                <button type="button" onClick={() => setIsComposeModalOpen(true)} className={`${btnSmGhost} cursor-pointer`}>
                  <ImageIcon className="h-4 w-4 text-accent" aria-hidden />
                  <span>{t.feed.addMedia}</span>
                </button>
                <button type="button" onClick={() => setIsComposeModalOpen(true)} className={`${btnSmGhost} cursor-pointer`}>
                  <Lightbulb className="h-4 w-4 text-accent" aria-hidden />
                  <span>{t.feed.addTopic}</span>
                </button>
                <button type="button" onClick={() => setIsComposeModalOpen(true)} className={`${btnSmGhost} cursor-pointer`}>
                  <SmilePlus className="h-4 w-4 text-accent" aria-hidden />
                  <span>{t.feed.addFeeling}</span>
                </button>
              </div>
            </div>

            {/* Hộp soạn bài: lớp phủ phẳng (không mờ nền), khung viền 1px với
                thanh tiêu đề sắc độ #f3f1ec như Frame của hệ. */}
            <AnimatePresence>
              {isComposeModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/55 p-3 sm:p-4">
                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label={t.feed.createPost}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-card border border-line-soft bg-surface shadow-2xl"
                  >
                    <div className="flex h-11 items-center justify-between gap-3 bg-surface-raised px-4">
                      <h3 className="flex items-center gap-2 text-sm font-black tracking-tight text-ink-max">
                        <Pencil className="h-3.5 w-3.5 text-accent" aria-hidden />
                        {t.feed.createPost}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsComposeModalOpen(false)}
                        aria-label={t.feed.cancel}
                        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-control text-ink-soft transition-colors hover:bg-surface hover:text-ink"
                      >
                        <X className="w-4 h-4" aria-hidden />
                      </button>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto p-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={user?.user_metadata?.full_name || t.feed.anonMember} avatarUrl={user?.user_metadata?.avatar_url} />
                        <div>
                          <p className="text-sm font-black text-ink-max">
                            {user?.user_metadata?.full_name || t.feed.memberRole}
                          </p>
                          <span className={`mt-1 ${chipAccent}`}>
                            <StatusDot />
                            {t.feed.visibilityPublic}
                          </span>
                        </div>
                      </div>

                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={format(t.feed.composerPlaceholder, { name: (user?.user_metadata?.full_name || t.feed.composerFallbackName).split(" ").pop() ?? "" })}
                        rows={6}
                        autoFocus
                        className="w-full resize-none border-0 bg-transparent text-base text-ink placeholder:text-ink-faint focus:outline-none sm:text-lg"
                      />

                      {imagePreview && (
                        <div className="relative max-h-60 overflow-hidden rounded-control bg-surface-raised">
                          <img src={imagePreview} alt={t.feed.previewAlt} className="h-auto max-h-56 w-full object-cover" />
                          <button
                            type="button"
                            onClick={clearPendingImage}
                            aria-label={t.feed.cancel}
                            className="absolute right-2 top-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm bg-stone-950/80 text-white transition-colors hover:bg-stone-950"
                          >
                            <X className="w-4 h-4" aria-hidden />
                          </button>
                        </div>
                      )}

                      {isPollMode && (
                        <div className="space-y-3 rounded-control border border-accent-line bg-accent-wash p-3">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-xs font-black text-ink-max">
                              <Vote className="w-4 h-4 text-accent" aria-hidden />
                              {t.feed.createPoll}
                            </span>
                            <button
                              type="button"
                              onClick={() => setIsPollMode(false)}
                              className="text-[11px] font-bold text-ink-muted hover:text-ink"
                            >
                              {t.feed.cancel}
                            </button>
                          </div>

                          <input
                            type="text"
                            value={pollQuestion}
                            onChange={(e) => setPollQuestion(e.target.value)}
                            placeholder={t.feed.pollQuestionPlaceholder}
                            className="w-full rounded-control border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                          />

                          <div className="space-y-2">
                            {pollOptions.map((opt, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <span className="w-5 shrink-0 font-mono text-[11px] tabular-nums text-ink-faint">
                                  {APP_SYS.rank(idx + 1)}
                                </span>
                                <input
                                  type="text"
                                  value={opt}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setPollOptions((prev) => prev.map((o, i) => (i === idx ? val : o)));
                                  }}
                                  placeholder={format(t.feed.pollOptionPlaceholder, { index: idx + 1 })}
                                  className="flex-1 rounded-control border border-line bg-surface px-3 py-1.5 text-xs text-ink focus:border-brand-500 focus:outline-none"
                                />
                                {pollOptions.length > 2 && (
                                  <button
                                    type="button"
                                    onClick={() => setPollOptions((prev) => prev.filter((_, i) => i !== idx))}
                                    className="cursor-pointer rounded-control p-1 text-ink-faint hover:bg-energy-soft hover:text-energy-strong"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" aria-hidden />
                                  </button>
                                )}
                              </div>
                            ))}
                            {pollOptions.length < 4 && (
                              <button
                                type="button"
                                onClick={() => setPollOptions((prev) => [...prev, ""])}
                                className={`${textLink} cursor-pointer text-xs`}
                              >
                                {t.feed.addPollOption}
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between rounded-control bg-surface-raised p-2 pl-3">
                        <span className="text-xs font-bold text-ink-body">{t.feed.addToPost}</span>
                        <div className="flex items-center gap-1">
                          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="cursor-pointer rounded-control p-2 text-accent transition-colors hover:bg-surface hover:text-accent-strong"
                            title={t.feed.addImageTitle}
                          >
                            <ImageIcon className="w-5 h-5" aria-hidden />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsPollMode((prev) => !prev);
                              if (!pollQuestion) setPollQuestion("");
                            }}
                            aria-pressed={isPollMode}
                            className={`cursor-pointer rounded-control p-2 transition-colors ${
                              isPollMode
                                ? "bg-accent text-white shadow-xs dark:text-page"
                                : "text-accent hover:bg-surface hover:text-accent-strong"
                            }`}
                            title={t.feed.addPollTitle}
                          >
                            <Vote className="w-5 h-5" aria-hidden />
                          </button>
                          <EmojiPicker onSelect={(emoji) => setContent((prev) => prev + emoji)} />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-line-soft p-3">
                      <button
                        type="button"
                        onClick={handlePost}
                        disabled={posting || (!content.trim() && !pendingImage && !(isPollMode && pollQuestion.trim()))}
                        className={`${btnPrimary} w-full cursor-pointer`}
                      >
                        <Send className="w-4 h-4" aria-hidden />
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
          <div className={`${panel} flex flex-col items-center px-6 py-12 text-center`}>
            <IconTile className="mb-3 h-11 w-11">
              <MessageCircle className="h-5 w-5" />
            </IconTile>
            <p className="text-sm text-ink-muted">
              {t.feed.feedEmptyNoPosts}
            </p>
            {/* Không còn ô tìm kiếm nên dòng rỗng CHỈ có thể vì chưa ai đăng bài. */}
            <button
              type="button"
              onClick={() => setIsComposeModalOpen(true)}
              className={`mt-4 ${btnSecondary} cursor-pointer`}
            >
              {t.feed.feedEmptyWrite}
            </button>
          </div>
        ) : (
          // Mỗi bài là một thẻ trắng nổi trên canvas băng bằng bóng mảnh, thay
          // cho nét kẻ xám giữa các bài (2026-09-30: "nhạt, phẳng"). Rê chuột
          // chỉ đậm bóng, không nhấc.
          <div className="space-y-3">
            <AnimatePresence initial={false}>
            {visiblePosts.map((post) => {
              const badge = getUserBadge(post, t);
              const BadgeIcon = badge.icon;
              return (
              <motion.div
                key={post.id}
                id={`community-post-${post.id}`}
                className="group rounded-card bg-surface p-4 shadow-card transition-shadow duration-150 hover:shadow-card-hover sm:p-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <div className="flex items-start gap-4">
                  <Avatar name={post.user_name} avatarUrl={post.user_avatar} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                      <span className="text-sm font-black text-ink-max">{post.user_name}</span>
                      <span className={post.kind === "streak" ? chipReward : chipAccent}>
                        <BadgeIcon className="h-3 w-3" aria-hidden />
                        {badge.label}
                      </span>
                      {post.kind === "streak" && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-reward-strong">
                          <Flame className="h-3 w-3 text-reward" aria-hidden /> {t.feed.streak}
                        </span>
                      )}
                      <time dateTime={post.created_at} className="flex items-center gap-1 text-xs text-ink-faint">
                        <Clock3 className="h-3 w-3" aria-hidden />
                        {timeAgo(post.created_at, t.libData.timeAgo)}
                      </time>
                      {post.edited_at && (
                        // Readers who already reacted deserve to know the text
                        // moved after they did.
                        <span
                          className="text-xs text-ink-faint"
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
                          className="w-full resize-none rounded-control border border-line bg-surface p-3 text-[15px] leading-7 text-ink-heading outline-none focus:border-brand-500"
                        />
                        <div className="mt-2 flex items-center justify-between gap-3">
                          <span className="font-mono text-[11px] tabular-nums text-ink-faint">
                            {editDraft.trim().length}/{MANUAL_POST_MAX_LENGTH}
                          </span>
                          <div className="flex items-center gap-2">
                            <button type="button" onClick={cancelEditPost} className={btnSmGhost}>
                              {t.feed.cancelEdit}
                            </button>
                            <button
                              type="button"
                              onClick={() => void handleSaveEdit(post.id)}
                              disabled={savingEdit || !editDraft.trim()}
                              className={btnSmPrimary}
                            >
                              {savingEdit ? t.feed.saving : t.feed.save}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      post.content && (
                        <p className="mt-2 whitespace-pre-wrap break-words text-[15px] leading-7 text-ink-heading">
                          {post.content}
                        </p>
                      )
                    )}

                    {/* Chứng nhận lên cấp: thành tích nên đi bằng tông vàng
                        `reward` - nền nhạt, không gradient. Điểm số là dữ liệu
                        nên đi bằng mono. */}
                    {post.metadata && typeof post.metadata === "object" && "type" in post.metadata && post.metadata.type === "level_up_achievement" && (
                      <div className="mt-3.5 rounded-control border border-reward-line bg-reward-soft p-3.5">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-surface shadow-xs">
                            <Glyph emoji={String(post.metadata.emoji || "🏆")} className="h-5 w-5" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-reward-strong">{t.feed.levelCertTitle}</p>
                            <h4 className="mt-0.5 text-sm font-black text-ink-max">
                              {format(t.feed.levelCertLevel, { level: String(post.metadata.level), name: String(post.metadata.level_name) })}
                            </h4>
                          </div>
                        </div>
                        <p className="mt-2 text-xs font-medium text-ink-soft">
                          {t.feed.levelCertBodyPart1}
                          <strong className="font-mono tabular-nums text-reward-strong">{String(post.metadata.score)}%</strong>
                          {t.feed.levelCertBodyPart2}
                        </p>
                      </div>
                    )}

                    {post.metadata && typeof post.metadata === "object" && "type" in post.metadata && post.metadata.type === "poll" && (
                      <InteractivePollCard postId={post.id} metadata={post.metadata as unknown as PollMetadata} />
                    )}

                    {post.metadata && typeof post.metadata === "object" && "image_url" in post.metadata && Boolean(post.metadata.image_url) && (
                      <div className="mt-4 relative overflow-hidden rounded-control bg-surface-raised">
                        {/* `<img>` chứ KHÔNG phải next/image, và đây là lần thứ
                            hai chỗ này quay về `<img>`.

                            Lần đầu, chú thích nói lý do là bucket không nằm
                            trong remotePatterns. Lý do đó sai và bị bác đúng:
                            uploadChatImage() ghi vào "chat-images" của chính
                            project này, tức `<ref>.cloudflare.co`, mà
                            remotePatterns có `*.cloudflare.co`. Nhưng kết luận
                            "vậy thì đổi sang next/image được" lại không được
                            KIỂM: /bang-tin cần đăng nhập, không phiên nào mở
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

                    {/* Cảm xúc là dữ liệu người dùng - giữ nguyên emoji. Ô của
                        chính bạn tô xanh vì đó là trạng thái của bạn. */}
                    {post.reaction_summary.length > 0 && (
                      <div className="mt-4 flex flex-wrap items-center gap-1.5">
                        {post.reaction_summary.slice(0, 4).map((reaction) => (
                          <span
                            key={`${post.id}-${reaction.emoji}`}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                              post.my_reaction === reaction.emoji
                                ? "border-accent-line bg-accent-wash text-accent-strong"
                                : "border-transparent bg-surface-raised text-ink-body"
                            }`}
                          >
                            <span>{reaction.emoji}</span>
                            <span className="font-mono tabular-nums">{reaction.count}</span>
                          </span>
                        ))}
                        {post.reaction_count > 0 && (
                          <span className="ml-1 text-xs font-medium text-ink-faint">
                            <span className="font-mono tabular-nums">{post.reaction_count}</span> {t.feed.reactionsSuffix}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap items-center gap-1 border-t border-line-soft pt-3">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            if (!user) return;
                            setReactionPickerFor((current) => (current === post.id ? null : post.id));
                          }}
                          disabled={!user}
                          aria-expanded={reactionPickerFor === post.id}
                          className={`${btnSmGhost} cursor-pointer ${post.my_reaction ? "bg-accent-wash text-accent-strong" : ""}`}
                        >
                          {post.my_reaction ? (
                            <span className="text-sm leading-none">{post.my_reaction}</span>
                          ) : (
                            <ThumbsUp className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                          )}
                          <span>{post.my_reaction ? t.feed.reacted : t.feed.react}</span>
                        </button>

                        {reactionPickerFor === post.id && user && (
                          <div className="absolute bottom-full left-0 z-50 mb-2 flex items-center gap-1 whitespace-nowrap rounded-card border border-line-soft bg-surface p-1 shadow-lg">
                            {REACTION_OPTIONS.map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => {
                                  void handleReact(post, item);
                                  setReactionPickerFor(null);
                                }}
                                aria-pressed={post.my_reaction === item}
                                className={`flex shrink-0 cursor-pointer items-center gap-1 rounded-control px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                                  post.my_reaction === item
                                    ? "bg-accent-wash text-accent-strong"
                                    : "text-ink-body hover:bg-accent-wash hover:text-accent-strong"
                                }`}
                              >
                                <span>{item}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => void toggleComments(post.id)}
                        aria-expanded={!!openComments[post.id]}
                        className={`${btnSmGhost} cursor-pointer`}
                      >
                        <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                        <span>{t.feed.comment}</span>
                        <span className="font-mono tabular-nums">{post.comment_count}</span>
                      </button>

                      {/* Editing is narrower than deleting: you may delete any
                          post of yours, but only edit one you actually wrote.
                          System-generated posts (streaks, level-ups) carry the
                          platform's voice and must stay as issued. */}
                      {canEditPost(post, user?.id ?? null) && editingPostId !== post.id && (
                        <button type="button" onClick={() => startEditPost(post)} className={btnSmGhost}>
                          <Pencil className="w-3.5 h-3.5" aria-hidden /> {t.feed.editComment}
                        </button>
                      )}

                      {user?.id === post.user_id && (
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id)}
                          className={`${btnSmGhost} hover:bg-energy-soft hover:text-energy-strong`}
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden /> {t.feed.deleteComment}
                        </button>
                      )}
                    </div>

                    {openComments[post.id] && (
                      <div className="mt-3 rounded-control bg-surface-raised p-3">
                        {user && (
                          <div className="mb-3 flex items-start gap-2.5">
                            <Avatar name={user.user_metadata?.full_name ?? t.feed.anonYou} avatarUrl={user.user_metadata?.avatar_url ?? null} />
                            <div className="flex-1 rounded-control border border-line bg-surface p-2.5 focus-within:border-brand-500">
                              <textarea
                                value={commentDrafts[post.id] ?? ""}
                                onChange={(e) => setCommentDrafts((prev) => ({ ...prev, [post.id]: e.target.value }))}
                                placeholder={t.feed.commentPlaceholder}
                                rows={2}
                                maxLength={300}
                                className="w-full resize-none bg-transparent text-sm text-ink outline-none"
                              />
                              <div className="mt-2 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-xs text-ink-faint">
                                  <button
                                    type="button"
                                    onClick={() => setCommentDrafts((prev) => ({ ...prev, [post.id]: `${prev[post.id] ?? ""}` }))}
                                    className="inline-flex items-center gap-1 rounded-control px-1.5 py-1 transition-colors hover:bg-accent-wash hover:text-accent-strong"
                                  >
                                    <SmilePlus className="h-3.5 w-3.5" aria-hidden />
                                    {t.feed.emojiHint}
                                  </button>
                                  <span className="font-mono tabular-nums">{(commentDrafts[post.id] ?? "").length}/300</span>
                                </div>
                                <button
                                  type="button"
                                  disabled={postingComment[post.id] || !(commentDrafts[post.id] ?? "").trim()}
                                  onClick={() => void handleComment(post.id)}
                                  className={btnSmPrimary}
                                >
                                  <Send className="h-3.5 w-3.5" aria-hidden />
                                  {t.feed.send}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {loadingComments[post.id] ? (
                          <p className="px-1 py-2 text-xs text-ink-faint">{t.feed.commentsLoading}</p>
                        ) : (commentsByPost[post.id] ?? []).length === 0 ? (
                          <p className="px-1 py-2 text-xs text-ink-faint">{t.feed.commentsEmpty}</p>
                        ) : (
                          <div className="divide-y divide-line">
                            {(commentsByPost[post.id] ?? []).map((comment) => (
                              <div key={comment.id} className="flex items-start gap-3 py-3">
                                <Avatar name={comment.user_name} avatarUrl={comment.user_avatar} />
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-black text-ink-max">{comment.user_name}</span>
                                    <time dateTime={comment.created_at} className="text-xs text-ink-faint">
                                      {timeAgo(comment.created_at, t.libData.timeAgo)}
                                    </time>
                                    {comment.edited_at && (
                                      <span className="text-xs text-ink-faint" title={format(t.feed.editedAt, { when: timeAgo(comment.edited_at, t.libData.timeAgo) })}>
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
                                        className="w-full resize-none rounded-control border border-line bg-surface p-2 text-sm text-ink-body outline-none focus:border-brand-500"
                                      />
                                      <div className="mt-1.5 flex items-center justify-between gap-2">
                                        <span className="font-mono text-[10.5px] tabular-nums text-ink-faint">
                                          {commentEditDraft.trim().length}/{COMMENT_MAX_LENGTH}
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                          <button type="button" onClick={cancelEditComment} className={btnSmGhost}>
                                            {t.feed.cancelEdit}
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => void handleSaveCommentEdit(post.id, comment.id)}
                                            disabled={savingCommentEdit || !commentEditDraft.trim()}
                                            className={btnSmPrimary}
                                          >
                                            {savingCommentEdit ? t.feed.saving : t.feed.save}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="mt-1 text-sm text-ink-body whitespace-pre-wrap break-words">
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
                                      className="rounded-control p-1.5 text-ink-faint transition-colors hover:bg-accent-wash hover:text-accent-strong"
                                    >
                                      <Pencil className="h-3.5 w-3.5" aria-hidden />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => void handleDeleteComment(post.id, comment.id)}
                                      aria-label={t.feed.deleteCommentAria}
                                      className="rounded-control p-1.5 text-ink-faint transition-colors hover:bg-energy-soft hover:text-energy-strong"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" aria-hidden />
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
                className={`${btnSecondary} w-full cursor-pointer`}
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

            <div className={`${panel} p-4`}>
              <button
                type="button"
                onClick={() => setRulesOpen((prev) => !prev)}
                aria-expanded={rulesOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-2 text-left"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent" aria-hidden />
                  <h2 className={asideTitle}>{t.feed.rulesTitle}</h2>
                </span>
                {rulesOpen ? <ChevronUp className="h-4 w-4 text-ink-faint" aria-hidden /> : <ChevronDown className="h-4 w-4 text-ink-faint" aria-hidden />}
              </button>

              {rulesOpen && (
                <ol className="mt-3 divide-y divide-line-soft border-t border-line-soft text-xs font-medium text-ink-soft">
                  {[t.feed.rule1, t.feed.rule2, t.feed.rule3].map((rule, i) => (
                    <li key={i} className="flex gap-3 py-2">
                      <span className="font-mono tabular-nums text-accent">{APP_SYS.rank(i + 1)}</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            <div className={`${panel} p-4`}>
              <div className={asideHead}>
                <h2 className={asideTitle}>{t.feed.streakBoardTitle}</h2>
                <span className={`${chipReward} font-mono tabular-nums`}>
                  <Flame className="h-3.5 w-3.5 text-reward" aria-hidden />
                  {todayStreakPosts.length}
                </span>
              </div>
              {todayStreakPosts.length === 0 ? (
                <p className="pt-3 text-sm text-ink-muted">{t.feed.streakBoardEmpty}</p>
              ) : (
                /* Cuộn riêng trong thẻ, KHÔNG cắt bớt danh sách: một ngày đông
                   người học thì đây là bảng dài nhất cột này, và cắt nó ở con số
                   nào cũng là giấu đi đúng thứ người xem mở nó ra để đếm. */
                <ul className="max-h-80 divide-y divide-line-soft overflow-y-auto pr-1 [scrollbar-width:thin]">
                  {todayStreakPosts.map((post) => (
                    <li key={post.id} className="flex items-center gap-2.5 py-2">
                      <Avatar name={post.user_name} avatarUrl={post.user_avatar} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-ink">{post.user_name}</p>
                        <time dateTime={post.created_at} className="block truncate text-[11px] font-medium text-ink-muted">
                          {timeAgo(post.created_at, t.libData.timeAgo)}
                        </time>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={`${panel} p-4`}>
              <div className={asideHead}>
                <h2 className={asideTitle}>{t.feed.trendingTitle}</h2>
                <TrendingUp className="h-4 w-4 text-accent" aria-hidden />
              </div>
              {hotPosts.length === 0 ? (
                <p className="pt-3 text-sm text-ink-muted">{t.feed.trendingEmpty}</p>
              ) : (
                <ol className="divide-y divide-line-soft">
                  {hotPosts.map((post, index) => (
                    <li key={post.id} className="flex gap-3 py-2.5">
                      <span className={`w-5 shrink-0 pt-0.5 font-mono text-xs font-bold tabular-nums ${index === 0 ? "text-accent-strong" : "text-ink-faint"}`}>{APP_SYS.rank(index + 1)}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-ink">{post.user_name}</p>
                        <p className="mt-1 line-clamp-2 text-xs font-medium leading-relaxed text-ink-muted">
                          {post.content || t.feed.postWithImage}
                        </p>
                        <p className="mt-1.5 flex items-center gap-3 text-[11px] text-ink-faint">
                          <span>
                            <span className="font-mono tabular-nums text-ink-body">{post.reaction_count}</span> {t.feed.reactionsSuffix}
                          </span>
                          <span>
                            <span className="font-mono tabular-nums text-ink-body">{post.comment_count}</span> {t.feed.commentsSuffix}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            <div className={`${panel} p-4`}>
              <div className={asideHead}>
                <h2 className={asideTitle}>{t.feed.promptsTitle}</h2>
                <Bookmark className="h-4 w-4 text-accent" aria-hidden />
              </div>
              <div className="mt-3 grid gap-1.5">
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
                    className="cursor-pointer rounded-control bg-surface-raised px-3 py-2 text-left text-xs font-semibold text-ink-body transition-colors hover:bg-accent-wash hover:text-accent-strong"
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
