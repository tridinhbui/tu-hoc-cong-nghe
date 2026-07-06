"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Play, BookOpen, Clock } from "lucide-react";
import { getResumeLessonAction } from "@/app/dashboard/actions";
import { createClient } from "@/lib/supabase";

interface ResumeLearningButtonProps {
  activeTrack: "personal" | "professional";
}

export default function ResumeLearningButton({ activeTrack }: ResumeLearningButtonProps) {
  const [nextLesson, setNextLesson] = useState<{ id: number; slug: string; title: string; duration: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeLesson = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const lesson = await getResumeLessonAction(user.id, activeTrack);
          setNextLesson(lesson);
        }
      } catch (error) {
        console.error("Error fetching resume lesson:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeLesson();
  }, [activeTrack]);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white animate-pulse">
        <div className="h-6 bg-white/20 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-white/20 rounded w-2/3"></div>
      </div>
    );
  }

  if (!nextLesson) {
    return (
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg">Chúc mừng!</p>
            <p className="text-sm text-white/90">Bạn đã hoàn thành tất cả bài học</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/bai-hoc/${nextLesson.slug}`}
      className="block bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <Play className="w-6 h-6 ml-1" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
            Tiếp tục học
          </p>
          <p className="font-bold text-lg truncate">{nextLesson.title}</p>
          <div className="flex items-center gap-3 mt-1 text-sm text-white/90">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {nextLesson.duration}
            </span>
            <span>Day {nextLesson.id}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
