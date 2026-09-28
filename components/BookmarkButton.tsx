"use client";

import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toggleBookmark, isLessonBookmarked } from "@/lib/cloudflare-bookmarks";
import { useI18n } from "@/lib/i18n/context";
import { getCurrentUser } from "@/lib/current-user";

interface BookmarkButtonProps {
  lessonId: number;
  lessonSlug: string;
  lessonTitle: string;
}

export default function BookmarkButton({ lessonId, lessonSlug, lessonTitle }: BookmarkButtonProps) {
  const { t } = useI18n();
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const user = await getCurrentUser();
        
        if (user) {
          const isBookmarked = await isLessonBookmarked(user.id, lessonId);
          setBookmarked(isBookmarked);
        }
      } catch (error) {
        console.error("Error checking bookmark:", error);
      } finally {
        setLoading(false);
      }
    };

    checkBookmark();
  }, [lessonId]);

  const handleToggle = async () => {
    setToggling(true);
    try {
      const user = await getCurrentUser();
      
      if (user) {
        const result = await toggleBookmark(user.id, lessonId, lessonSlug, lessonTitle);
        setBookmarked(result.bookmarked);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setToggling(false);
    }
  };

  if (loading) {
    return (
      <div className="w-10 h-10 rounded-sm bg-surface-raised animate-pulse" />
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={toggling}
      aria-pressed={bookmarked}
      className={`w-10 h-10 rounded-sm border flex items-center justify-center transition-colors ${
        bookmarked
          ? "border-brand-600 bg-accent-soft text-accent dark:border-brand-400"
          : "border-line-strong text-ink-muted hover:border-stone-950 hover:text-ink dark:hover:border-stone-200"
      } ${toggling ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      title={bookmarked ? t.miscUi.bookmarkButton.remove : t.miscUi.bookmarkButton.add}
    >
      {bookmarked ? (
        <BookmarkCheck className="w-5 h-5" />
      ) : (
        <Bookmark className="w-5 h-5" />
      )}
    </button>
  );
}
