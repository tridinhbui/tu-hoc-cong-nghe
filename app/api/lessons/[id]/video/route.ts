import { NextResponse } from "next/server";
import { getLessonVideoUrl } from "@/lib/supabase-lesson-videos";

// Public, unauthenticated - the video player fetches this itself instead of
// lib/lessons-loader.ts's getLessonBySlug carrying a DB lookup, since that
// function is a documented hot path read on every lesson page load.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lessonId = Number(id);
  if (!Number.isFinite(lessonId)) {
    return NextResponse.json({ videoUrl: null }, { status: 400 });
  }
  const videoUrl = await getLessonVideoUrl(lessonId);
  return NextResponse.json({ videoUrl });
}
