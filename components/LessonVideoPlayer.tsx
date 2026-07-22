"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

interface LessonVideoPlayerProps {
  videoUrl?: string;
  title: string;
}

export default function LessonVideoPlayer({ videoUrl, title }: LessonVideoPlayerProps) {
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
        className="w-full relative group overflow-hidden rounded-2xl bg-stone-900 hover:bg-stone-800 transition-colors aspect-video flex items-center justify-center mb-6"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-emerald-600/20 group-hover:from-purple-600/30 group-hover:to-emerald-600/30 transition-all" />
        <div className="relative flex items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white transition-colors flex items-center justify-center">
            <Play className="w-6 h-6 text-purple-600 fill-purple-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-white">Xem video bài học</p>
            <p className="text-xs text-white/70">{title}</p>
          </div>
        </div>
      </button>

      {/* Modal Video Player */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-stone-900 rounded-2xl overflow-hidden w-full max-w-4xl">
            <div className="flex items-center justify-between p-4 border-b border-stone-800">
              <h3 className="text-white font-semibold">{title}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-white transition-colors p-1"
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
