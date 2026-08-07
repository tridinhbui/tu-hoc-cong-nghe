"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EyeOff, Eye, Users2 } from "lucide-react";
import type { AdminCommunityPost } from "@/lib/admin/community";
import EmptyState from "@/components/admin/EmptyState";
import { listCommunityPostsAction, setPostHiddenAction } from "./actions";
import { useI18n } from "@/lib/i18n/context";
import { intlLocale } from "@/lib/i18n";

export default function CommunityModerationPanel() {
  const { t, locale } = useI18n();
  const tc = t.adminThree.communityModerationPanel;
  const [posts, setPosts] = useState<AdminCommunityPost[] | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    listCommunityPostsAction()
      .then(setPosts)
      .catch((error) => {
        console.error("Error loading community posts:", error);
        setPosts([]);
      });
  }, []);

  async function toggleHidden(post: AdminCommunityPost) {
    setUpdatingId(post.id);
    try {
      await setPostHiddenAction(post.id, !post.is_hidden);
      setPosts((prev) => (prev ?? []).map((p) => (p.id === post.id ? { ...p, is_hidden: !p.is_hidden } : p)));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : tc.updateFailed);
    } finally {
      setUpdatingId(null);
    }
  }

  if (posts === null) {
    return <p className="text-sm text-stone-400 p-4">{tc.loading}</p>;
  }

  if (posts.length === 0) {
    return <EmptyState icon={Users2} title={tc.emptyTitle} description={tc.emptyDescription} />;
  }

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl divide-y divide-stone-200 dark:divide-stone-800">
      {posts.map((post) => (
        <div key={post.id} className={`p-4 flex items-start justify-between gap-4 ${post.is_hidden ? "opacity-50" : ""}`}>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                {post.user_name || post.user_email || tc.unknownUser}
              </span>
              <span className="text-[10px] font-bold uppercase text-stone-400">{post.kind}</span>
              {post.is_hidden && (
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 px-1.5 py-0.5 rounded">
                  {tc.hidden}
                </span>
              )}
            </div>
            <p className="text-sm text-stone-700 dark:text-stone-300 mt-1">{post.content}</p>
            <p className="text-[10px] text-stone-400 mt-1">{new Date(post.created_at).toLocaleString(intlLocale(locale))}</p>
          </div>
          <button
            onClick={() => toggleHidden(post)}
            disabled={updatingId === post.id}
            title={post.is_hidden ? tc.showPost : tc.hidePost}
            className="flex-shrink-0 p-2 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition disabled:opacity-40"
          >
            {post.is_hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
      ))}
    </div>
  );
}
