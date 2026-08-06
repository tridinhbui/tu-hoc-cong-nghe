import { Play } from "lucide-react";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { getAllLessonVideoUrls } from "@/lib/supabase-lesson-videos";
import VideosAdminClient from "./VideosAdminClient";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function VideosAdminPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const tp = t.adminThree.videosPage;
  const [lessonsMeta, videoUrls] = await Promise.all([getLessonsMeta(), getAllLessonVideoUrls()]);
  const lessonsWithVideo = lessonsMeta.map((l) => ({ ...l, videoUrl: videoUrls[l.id] }));

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
          <Play className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">{tp.title}</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">{tp.subtitle}</p>
        </div>
      </div>

      <VideosAdminClient lessonsMeta={lessonsWithVideo} />
    </div>
  );
}
