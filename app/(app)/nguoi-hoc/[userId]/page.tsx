import Link from "next/link";
import Image from "next/image";
import { isValidAvatar } from "@/lib/avatar-utils";
import { notFound, redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getPublicUserProfile } from "@/lib/public-user-profile";
import MessageUserButton from "@/components/MessageUserButton";
import FollowButton from "@/components/FollowButton";
import ProfileWallPosts from "@/components/ProfileWallPosts";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary, format, intlLocale } from "@/lib/i18n";

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
  const locale = await getServerLocale();
  const t = getDictionary(locale);
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

  // Fetched with the server client (not lib/supabase-follows.ts, which is
  // built for the browser client and wouldn't carry this request's auth
  // cookie) so the follow button and counts are correct on first paint -
  // no flash from an initial "not following yet" before a client fetch
  // resolves.
  const [{ count: followerCount }, { count: followingCount }, { data: followRow }] = await Promise.all([
    supabase.from("user_follows").select("follower_id", { count: "exact", head: true }).eq("followed_id", userId),
    supabase.from("user_follows").select("followed_id", { count: "exact", head: true }).eq("follower_id", userId),
    supabase.from("user_follows").select("follower_id").eq("follower_id", user.id).eq("followed_id", userId).maybeSingle(),
  ]);
  const isFollowing = Boolean(followRow);

  const initials = profile.displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <Link
              href="/dashboard"
              className="text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-sm font-semibold"
            >
              {t.publicProfile.backToLeaderboard}
            </Link>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-2">
              {t.publicProfile.heading}
            </h1>
          </div>
          <Link
            href="/profile"
            className="text-sm font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100"
          >
            {t.publicProfile.yourProfile}
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-7">
            <div className="flex items-start gap-5">
              {isValidAvatar(profile.avatarUrl) ? (
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
                  {t.publicProfile.eyebrow}
                </p>
                <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
                  {profile.displayName}
                </h2>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
                  {format(t.publicProfile.joinedAt, { date: new Date(profile.joinedAt).toLocaleDateString(intlLocale(locale)) })}
                </p>
                {profile.bio ? (
                  <p className="text-sm text-stone-700 dark:text-stone-300 mt-4 leading-relaxed">
                    {profile.bio}
                  </p>
                ) : (
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-4">
                    {t.publicProfile.noBio}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-4 text-sm text-stone-500 dark:text-stone-400">
                  <span>
                    <span className="font-extrabold text-stone-900 dark:text-stone-100">{followerCount ?? 0}</span> {t.publicProfile.followers}
                  </span>
                  <span>
                    <span className="font-extrabold text-stone-900 dark:text-stone-100">{followingCount ?? 0}</span> {t.publicProfile.following}
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-2.5">
                  <FollowButton currentUserId={user.id} targetUserId={userId} initialFollowing={isFollowing} size="md" />
                  <MessageUserButton targetUserId={userId} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatCard
              label={t.publicProfile.statLevel}
              value={`${profile.levelNumber}`}
              hint={profile.levelName}
            />
            <StatCard
              label={t.publicProfile.statXp}
              value={`${profile.xp}`}
              hint={t.publicProfile.statXpHint}
            />
            <StatCard
              label={t.publicProfile.statCompleted}
              value={`${profile.lessonsCompleted}`}
              hint={t.publicProfile.statCompletedHint}
            />
            <StatCard
              label={t.publicProfile.statQuiz}
              value={`${Math.round(profile.averageQuizScore)}%`}
              hint={t.publicProfile.statQuizHint}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-6">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
                  {t.publicProfile.progressTitle}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                  {format(t.publicProfile.currentPriority, {
                    track:
                      profile.preferredTrack === "personal"
                        ? t.publicProfile.trackPersonal
                        : t.publicProfile.trackProfessional,
                  })}
                </p>
              </div>
              <div className="text-right text-sm text-stone-500 dark:text-stone-400">
                <div>{format(t.publicProfile.studyMinutes, { minutes: profile.totalStudyMinutes })}</div>
                <div>{format(t.publicProfile.currentStreakLine, { days: profile.currentStreak })}</div>
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
                        {format(t.publicProfile.percentComplete, { percent: track.percent })}
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
                {t.publicProfile.quickSummary}
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-stone-500 dark:text-stone-400">{t.publicProfile.currentStreak}</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{format(t.publicProfile.days, { days: profile.currentStreak })}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-stone-500 dark:text-stone-400">{t.publicProfile.longestStreak}</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{format(t.publicProfile.days, { days: profile.longestStreak })}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-stone-500 dark:text-stone-400">{t.publicProfile.studyTime}</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{format(t.publicProfile.minutes, { minutes: profile.totalStudyMinutes })}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-6">
              <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100 mb-4">
                {t.publicProfile.recentLessons}
              </h3>
              {profile.recentLessons.length === 0 ? (
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  {t.publicProfile.noLessons}
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
                            ? new Date(lesson.completedAt).toLocaleDateString(intlLocale(locale))
                            : t.publicProfile.unknownDate}
                        </span>
                        <span>
                          {lesson.quizScore !== null && lesson.quizScore !== undefined
                            ? format(t.publicProfile.quizScore, { percent: Math.round(lesson.quizScore) })
                            : t.publicProfile.noQuiz}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-6">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
                  {t.publicProfile.recentPosts}
                </h3>
                <Link href="/finsocial" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                  {t.publicProfile.viewFinsocial}
                </Link>
              </div>
              <ProfileWallPosts userId={userId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
