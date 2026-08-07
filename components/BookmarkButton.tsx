"use client";

import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toggleBookmark, isLessonBookmarked } from "@/lib/supabase-bookmarks";
import { createClient } from "@/lib/supabase";
import { useI18n } from "@/lib/i18n/context";

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
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
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
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
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
      <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 animate-pulse" />
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={toggling}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
        bookmarked
          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
          : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
      } ${toggling ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
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
