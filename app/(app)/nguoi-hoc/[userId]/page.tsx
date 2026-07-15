import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getPublicUserProfile } from "@/lib/public-user-profile";

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5">
      <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-2">
        {label}
      </p>
      <p className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">{value}</p>
      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{hint}</p>
    </div>
  );
}

export default async function PublicUserProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { userId } = await params;

  if (userId === user.id) {
    redirect("/profile");
  }

  const profile = await getPublicUserProfile(userId);
  if (!profile) {
    notFound();
  }

  const initials = profile.displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 sticky top-0 bg-white/95 dark:bg-stone-950/95 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <Link
              href="/dashboard"
              className="text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-sm font-semibold"
            >
              ← Quay lại bảng xếp hạng
            </Link>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-2">
              Hồ sơ người học
            </h1>
          </div>
          <Link
            href="/profile"
            className="text-sm font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100"
          >
            Hồ sơ của bạn
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-7">
            <div className="flex items-start gap-5">
              {profile.avatarUrl ? (
                <Image
                  src={profile.avatarUrl}
                  alt={profile.displayName}
                  width={88}
                  height={88}
                  className="w-[88px] h-[88px] rounded-full object-cover border-2 border-stone-200 dark:border-stone-700"
                />
              ) : (
                <div className="w-[88px] h-[88px] rounded-full bg-stone-200 dark:bg-stone-700 border-2 border-stone-300 dark:border-stone-600 flex items-center justify-center text-2xl font-extrabold text-stone-700 dark:text-stone-300">
                  {initials}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-2">
                  Người học trên BXH
                </p>
                <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
                  {profile.displayName}
                </h2>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
                  Tham gia từ {new Date(profile.joinedAt).toLocaleDateString("vi-VN")}
                </p>
                {profile.bio ? (
                  <p className="text-sm text-stone-700 dark:text-stone-300 mt-4 leading-relaxed">
                    {profile.bio}
                  </p>
                ) : (
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-4">
                    Chưa có phần giới thiệu cá nhân.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatCard
              label="Level"
              value={`${profile.levelNumber}`}
              hint={profile.levelName}
            />
            <StatCard
              label="XP"
              value={`${profile.xp}`}
              hint="Tổng kinh nghiệm"
            />
            <StatCard
              label="Hoàn thành"
              value={`${profile.lessonsCompleted}`}
              hint="Bài học đã xong"
            />
            <StatCard
              label="Điểm quiz"
              value={`${Math.round(profile.averageQuizScore)}%`}
              hint="Điểm trung bình"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-6">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
                  Tiến độ học tập
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                  Ưu tiên hiện tại: {profile.preferredTrack === "personal" ? "Tài chính cá nhân" : "Tài chính chuyên ngành"}
                </p>
              </div>
              <div className="text-right text-sm text-stone-500 dark:text-stone-400">
                <div>{profile.totalStudyMinutes} phút học</div>
                <div>{profile.currentStreak} ngày streak hiện tại</div>
              </div>
            </div>

            <div className="space-y-4">
              {profile.trackProgress.map((track) => (
                <div
                  key={track.track}
                  className="rounded-xl border border-stone-200 dark:border-stone-800 p-4 bg-stone-50/70 dark:bg-stone-950/40"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div>
                      <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                        {track.title}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {track.subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                        {track.completed}/{track.total}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {track.percent}% hoàn thành
                      </p>
                    </div>
                  </div>

                  <div className="h-2.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden mb-4">
                    <div
                      className="h-full rounded-full bg-stone-900 dark:bg-stone-100"
                      style={{ width: `${track.percent}%` }}
                    />
                  </div>

                  <div className="space-y-2">
                    {track.stages.map((stage) => (
                      <div key={`${track.track}-${stage.label}`} className="flex items-center justify-between gap-3 text-sm">
                        <div className="min-w-0">
                          <p className="font-semibold text-stone-900 dark:text-stone-100">
                            {stage.label}
                          </p>
                          <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                            {stage.name}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-stone-900 dark:text-stone-100">
                            {stage.completed}/{stage.total}
                          </p>
                          <p className="text-xs text-stone-500 dark:text-stone-400">
                            {stage.percent}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-6">
              <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100 mb-4">
                Tóm tắt nhanh
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-stone-500 dark:text-stone-400">Chuỗi hiện tại</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{profile.currentStreak} ngày</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-stone-500 dark:text-stone-400">Chuỗi dài nhất</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{profile.longestStreak} ngày</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-stone-500 dark:text-stone-400">Thời gian học</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{profile.totalStudyMinutes} phút</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-6">
              <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100 mb-4">
                Bài học gần đây
              </h3>
              {profile.recentLessons.length === 0 ? (
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Người học này chưa có bài hoàn thành nào để hiển thị.
                </p>
              ) : (
                <div className="space-y-3">
                  {profile.recentLessons.map((lesson) => (
                    <Link
                      key={`${lesson.id}-${lesson.completedAt ?? "pending"}`}
                      href={`/bai-hoc/${lesson.slug}`}
                      className="block rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                    >
                      <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                        {lesson.title}
                      </p>
                      <div className="mt-1 flex items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
                        <span>
                          {lesson.completedAt
                            ? new Date(lesson.completedAt).toLocaleDateString("vi-VN")
                            : "Chưa rõ ngày"}
                        </span>
                        <span>
                          {lesson.quizScore !== null && lesson.quizScore !== undefined
                            ? `${Math.round(lesson.quizScore)}% quiz`
                            : "Không có quiz"}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
