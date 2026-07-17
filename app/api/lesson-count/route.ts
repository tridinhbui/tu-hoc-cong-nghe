import { NextResponse } from "next/server";
import { getLessonsMeta } from "@/lib/lessons-loader";

// Public, unauthenticated endpoint backing the homepage hero's live lesson
// count - reads the same generated lesson index the dashboard uses, so it
// always reflects the real current lesson count (no manual copy update
// needed when lessons are added/removed). No user data involved, so no
// auth check needed here.
export async function GET() {
  const lessons = await getLessonsMeta();
  return NextResponse.json({ count: lessons.length });
}
