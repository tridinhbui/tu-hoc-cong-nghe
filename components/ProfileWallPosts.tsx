"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, Heart } from "lucide-react";
import type { CommunityFeedPost } from "@/lib/supabase-community";
import { getUserCommunityPosts } from "@/lib/supabase-follows";
import { timeAgo } from "@/lib/time-ago";
import { useI18n } from "@/lib/i18n/context";

/** Read-only preview of one person's own FinSocial posts, for their public
 *  profile page (app/(app)/nguoi-hoc/[userId]/page.tsx) - the "tường" (wall)
 *  requested alongside follow. Deliberately not interactive here (no
 *  inline react/comment) - each card links to /finsocial?post=<id>, the
 *  same deep link NotificationBell uses, which opens the real feed with the
 *  full comment thread rather than duplicating that UI a second time. */
export default function ProfileWallPosts({ userId }: { userId: string }) {
  const { t } = useI18n();
  const [posts, setPosts] = useState<CommunityFeedPost[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    getUserCommunityPosts(userId, 5)
      .then((list) => {
        if (!cancelled) setPosts(list);
      })
      .catch((error) => {
        console.error("Error loading profile wall posts:", error);
        if (!cancelled) setPosts([]);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (posts === null) {
    return (
      <div className="space-y-2">
        {[0, 1].map((i) => (
          <div key={i} className="h-16 rounded-xl bg-stone-100 dark:bg-stone-800 animate-pulse" />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return <p className="text-sm text-stone-500 dark:text-stone-400">{t.finalTwo.profileWallPosts.noPosts}</p>;
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/finsocial?post=${post.id}`}
          className="block rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
        >
          {post.content && (
            <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed line-clamp-3 whitespace-pre-wrap break-words">
              {post.content}
            </p>
          )}
          {post.metadata && typeof post.metadata === "object" && "image_url" in post.metadata && Boolean(post.metadata.image_url) && (
            // Plain <img>, matching CommunityFeedClient.tsx: uploaded post
            // images come from whatever storage bucket uploadChatImage()
            // targets, which isn't in next.config.ts's remotePatterns
            // allowlist, so next/image would 400 on it.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={String(post.metadata.image_url)}
              alt=""
              className="mt-2 max-h-32 w-full rounded-lg object-cover"
            />
          )}
          <div className="mt-2 flex items-center gap-3 text-xs text-stone-400 dark:text-stone-500">
            <span>{timeAgo(post.created_at)}</span>
            <span className="inline-flex items-center gap-1">
              <Heart className="h-3 w-3" /> {post.reaction_count}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="h-3 w-3" /> {post.comment_count}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
