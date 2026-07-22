"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Flame, Send, ThumbsUp, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase";
import EmojiPicker from "@/components/EmojiPicker";
import {
  createManualPost,
  deleteOwnPost,
  getCommunityFeed,
  reactToPost,
  removeReaction,
  subscribeToCommunityFeed,
  type CommunityFeedPost,
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

export default function CommunityFeedClient() {
  const supabase = createClient();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [posts, setPosts] = useState<CommunityFeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const userIdRef = useRef<string | null>(null);

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
        const feed = await getCommunityFeed();
        setPosts(feed);
        setHasMore(feed.length === 20);
      } catch (error) {
        console.error("Error loading community feed:", error);
      } finally {
        setLoading(false);
      }
    };
    void init();
  }, [supabase]);

  useEffect(() => {
    const unsubscribe = subscribeToCommunityFeed(() => {
      // A single new post's joined author/reaction data isn't in the
      // realtime payload - simplest correct approach is refetching the
      // freshest page rather than re-deriving it client-side.
      getCommunityFeed()
        .then((feed) => setPosts(feed))
        .catch((error) => console.error("Error refreshing community feed:", error));
    });
    return unsubscribe;
  }, []);

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
    if (!user || !content.trim() || posting) return;
    setPosting(true);
    try {
      await createManualPost(user.id, content);
      setContent("");
      const feed = await getCommunityFeed();
      setPosts(feed);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không đăng được bài. Vui lòng thử lại.");
    } finally {
      setPosting(false);
    }
  };

  const handleToggleReaction = async (post: CommunityFeedPost) => {
    if (!user) return;
    const hadReacted = !!post.my_reaction;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === post.id
          ? { ...p, my_reaction: hadReacted ? null : "👍", reaction_count: p.reaction_count + (hadReacted ? -1 : 1) }
          : p
      )
    );
    try {
      if (hadReacted) {
        await removeReaction(post.id, user.id);
      } else {
        await reactToPost(post.id, user.id, "👍");
      }
    } catch (error) {
      console.error("Error toggling reaction:", error);
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

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link href="/dashboard" className="text-stone-500 dark:text-stone-400 hover:opacity-70 text-sm font-semibold flex items-center gap-1 w-fit">
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </Link>
          <h1 className="text-2xl font-bold mt-2 text-stone-900 dark:text-stone-100">Cộng đồng</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Chia sẻ thành quả và cổ vũ những người học khác.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {user && (
          <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-4 mb-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Chia sẻ cảm nghĩ hoặc thành quả học tập hôm nay..."
              maxLength={500}
              rows={2}
              className="w-full resize-none px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-stone-500"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <EmojiPicker onSelect={(emoji) => setContent((prev) => prev + emoji)} />
                <span className="text-xs text-stone-400">{content.length}/500</span>
              </div>
              <button
                onClick={handlePost}
                disabled={posting || !content.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold disabled:opacity-40 transition"
              >
                <Send className="w-3.5 h-3.5" /> Đăng
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-center text-sm text-stone-400 py-12">Đang tải...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-sm text-stone-400 py-12">
            Chưa có bài chia sẻ nào. Hãy là người đầu tiên!
          </p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <Avatar name={post.user_name} avatarUrl={post.user_avatar} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-stone-900 dark:text-stone-100">{post.user_name}</span>
                      {post.kind === "streak" && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 px-2 py-0.5 rounded-full">
                          <Flame className="w-3 h-3" /> Streak
                        </span>
                      )}
                      <span className="text-xs text-stone-400 dark:text-stone-500">{timeAgo(post.created_at)}</span>
                    </div>
                    <p className="text-sm text-stone-800 dark:text-stone-200 mt-1 whitespace-pre-wrap break-words">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => handleToggleReaction(post)}
                        disabled={!user}
                        className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition ${
                          post.my_reaction
                            ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
                            : "text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800"
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" /> {post.reaction_count > 0 ? post.reaction_count : ""}
                      </button>
                      {user?.id === post.user_id && (
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="flex items-center gap-1 text-xs text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 px-2 py-1 rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Xoá
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

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
      </div>
    </div>
  );
}
