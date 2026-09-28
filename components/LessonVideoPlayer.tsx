"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface LessonVideoPlayerProps {
  videoUrl?: string;
  title: string;
}

export default function LessonVideoPlayer({ videoUrl, title }: LessonVideoPlayerProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  if (!videoUrl) return null;

  // Extract YouTube video ID from various URL formats
  const getYoutubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const youtubeId = getYoutubeId(videoUrl);
  const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null;

  if (!embedUrl) return null;

  return (
    <>
      {/* Video Thumbnail Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full relative group overflow-hidden rounded-md border border-stone-800 bg-stone-950 hover:bg-stone-900 transition-colors aspect-video flex items-center justify-center mb-6"
      >
        <div className="relative flex items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-sm border border-white/30 group-hover:border-white group-hover:bg-brand-700 transition-colors flex items-center justify-center">
            <Play className="w-6 h-6 text-white fill-white" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-white">{t.miscUi.lessonVideoPlayer.watchLessonVideo}</p>
            <p className="text-xs text-white/70">{title}</p>
          </div>
        </div>
      </button>

      {/* Modal Video Player */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 flex items-center justify-center p-4">
          <div className="rounded-md border border-stone-800 bg-stone-950 overflow-hidden w-full max-w-4xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-stone-800">
              <h3 className="text-white font-semibold">{title}</h3>
              <button
                onClick={() => setIsOpen(false)}
                aria-label={t.common.close}
                className="rounded-sm text-stone-400 hover:text-white transition-colors p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full bg-black aspect-video">
              <iframe
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
