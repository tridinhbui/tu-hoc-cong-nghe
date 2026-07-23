import Link from "next/link";
import { ArrowLeft, MessageSquareMore, Users } from "lucide-react";
import StudyGroupsClient from "@/components/StudyGroupsClient";
import CommunityFeedClient from "@/components/CommunityFeedClient";

export const dynamic = "force-dynamic";

export default function StudyGroupsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg px-3 py-2 -ml-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>
          <h1 className="mt-2 text-xl font-bold text-stone-900 dark:text-stone-100">Học nhóm</h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Một bên là phòng học nhóm theo chủ đề, một bên là MXH chung để chia sẻ thành quả và trò chuyện rộng hơn.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] items-start">
          <section className="min-w-0">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.16em] text-stone-700">Phòng học nhóm</h2>
                <p className="text-xs text-stone-500">Ghép nhóm, chat nhóm và đua mục tiêu XP tuần.</p>
              </div>
            </div>
            <StudyGroupsClient embedded />
          </section>

          <section className="min-w-0">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                <MessageSquareMore className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.16em] text-stone-700">MXH chung</h2>
                <p className="text-xs text-stone-500">Feed cộng đồng mở, nơi mọi người chia sẻ streak, note và tiến bộ.</p>
              </div>
            </div>
            <CommunityFeedClient embedded />
          </section>
        </div>
      </div>
    </div>
  );
}
