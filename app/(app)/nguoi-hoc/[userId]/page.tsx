import Link from "next/link";
import Image from "next/image";
import { isValidAvatar } from "@/lib/avatar-utils";
import { notFound, redirect } from "next/navigation";
import { createServerCloudflareClient } from "@/lib/cloudflare-server";
import { getPublicUserProfile } from "@/lib/public-user-profile";
import MessageUserButton from "@/components/MessageUserButton";
import FollowButton from "@/components/FollowButton";
import ProfileWallPosts from "@/components/ProfileWallPosts";
import { APP_SYS } from "@/components/analytics/system-codes";
import { Sys, textLink } from "@/components/ui/system";
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
    <div className="rounded-md border border-line-strong bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
      <p className="mb-2 border-b border-line pb-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">
        {label}
      </p>
      <p className="font-mono text-2xl font-medium tabular-nums text-ink-max">{value}</p>
      <p className="text-xs text-ink-muted mt-1">{hint}</p>
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
  const cloudflare = await createServerCloudflareClient();
  const {
    data: { user },
  } = await cloudflare.auth.getUser();

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

  // Fetched with the server client (not lib/cloudflare-follows.ts, which is
  // built for the browser client and wouldn't carry this request's auth
  // cookie) so the follow button and counts are correct on first paint -
  // no flash from an initial "not following yet" before a client fetch
  // resolves.
  const [{ count: followerCount }, { count: followingCount }, { data: followRow }] = await Promise.all([
    cloudflare.from("user_follows").select("follower_id", { count: "exact", head: true }).eq("followed_id", userId),
    cloudflare.from("user_follows").select("followed_id", { count: "exact", head: true }).eq("follower_id", userId),
    cloudflare.from("user_follows").select("follower_id").eq("follower_id", user.id).eq("followed_id", userId).maybeSingle(),
  ]);
  const isFollowing = Boolean(followRow);

  // `displayName` rỗng khi hồ sơ chưa đặt tên - lib/public-user-profile.ts trả
  // rỗng thay vì một tên tiếng Việt viết cứng, vì nó không biết ngôn ngữ nào.
  const displayName = profile.displayName || t.dashboard.defaultUserName;

  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-page dark:bg-stone-950">
      <div className="border-b border-line-strong">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between gap-4 border-b border-line pb-2">
            <Link href="/dashboard" className={`${textLink} text-xs`}>
              {t.publicProfile.backToLeaderboard}
            </Link>
            <Sys className="text-ink-muted">{APP_SYS.learner(userId)}</Sys>
          </div>
          <div className="mt-3 flex items-end justify-between gap-4">
            <h1 className="text-2xl font-black tracking-tight text-ink-max">
              {t.publicProfile.heading}
            </h1>
            <Link href="/profile" className={`${textLink} text-xs`}>
              {t.publicProfile.yourProfile}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900 p-7">
            <div className="flex items-start gap-5">
              {isValidAvatar(profile.avatarUrl) ? (
                <Image
                  src={profile.avatarUrl}
                  alt={displayName}
                  width={88}
                  height={88}
                  className="w-[88px] h-[88px] rounded-full object-cover border border-line-mid"
                />
              ) : (
                <div className="w-[88px] h-[88px] rounded-full bg-surface-sunken border border-line-strong flex items-center justify-center text-2xl font-extrabold text-ink-body">
                  {initials}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">
                  {t.publicProfile.eyebrow}
                </p>
                <h2 className="text-3xl font-black tracking-tight text-ink-max leading-tight">
                  {displayName}
                </h2>
                <p className="text-sm text-ink-muted mt-2">
                  {format(t.publicProfile.joinedAt, { date: new Date(profile.joinedAt).toLocaleDateString(intlLocale(locale)) })}
                </p>
                {profile.bio ? (
                  <p className="text-sm text-ink-body mt-4 leading-relaxed">
                    {profile.bio}
                  </p>
                ) : (
                  <p className="text-sm text-ink-muted mt-4">
                    {t.publicProfile.noBio}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-4 text-sm text-ink-muted">
                  <span>
                    <span className="font-mono tabular-nums text-ink-max">{followerCount ?? 0}</span> {t.publicProfile.followers}
                  </span>
                  <span>
                    <span className="font-mono tabular-nums text-ink-max">{followingCount ?? 0}</span> {t.publicProfile.following}
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
          <div className="rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900 p-6">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="text-base font-black tracking-tight text-ink-max">
                  {t.publicProfile.progressTitle}
                </h3>
                <p className="text-sm text-ink-muted mt-1">
                  {format(t.publicProfile.currentPriority, {
                    track:
                      profile.preferredTrack === "personal"
                        ? t.publicProfile.trackPersonal
                        : t.publicProfile.trackProfessional,
                  })}
                </p>
              </div>
              <div className="text-right text-sm text-ink-muted">
                <div>{format(t.publicProfile.studyMinutes, { minutes: profile.totalStudyMinutes })}</div>
                <div>{format(t.publicProfile.currentStreakLine, { days: profile.currentStreak })}</div>
              </div>
            </div>

            <div className="space-y-4">
              {profile.trackProgress.map((track) => (
                <div
                  key={track.track}
                  className="rounded-sm border border-line p-4"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div>
                      <p className="text-sm font-bold text-ink">
                        {track.title}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {track.subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm tabular-nums text-ink-max">
                        {track.completed}/{track.total}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {format(t.publicProfile.percentComplete, { percent: track.percent })}
                      </p>
                    </div>
                  </div>

                  <div className="h-1.5 rounded-xs bg-surface-sunken overflow-hidden mb-4">
                    <div
                      className="h-full bg-stone-950 dark:bg-stone-200"
                      style={{ width: `${track.percent}%` }}
                    />
                  </div>

                  <div className="divide-y divide-stone-200 border-t border-line dark:divide-stone-800">
                    {track.stages.map((stage) => (
                      <div key={`${track.track}-${stage.label}`} className="flex items-center justify-between gap-3 py-2 text-sm">
                        <div className="min-w-0">
                          <p className="font-semibold text-ink">
                            {stage.label}
                          </p>
                          <p className="text-xs text-ink-muted truncate">
                            {stage.name}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-mono tabular-nums text-ink-max">
                            {stage.completed}/{stage.total}
                          </p>
                          <p className="font-mono text-xs tabular-nums text-ink-muted">
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
            <div className="rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900 p-6">
              <h3 className="text-base font-black tracking-tight text-ink-max mb-4">
                {t.publicProfile.quickSummary}
              </h3>
              <div className="divide-y divide-stone-200 border-y border-line text-sm dark:divide-stone-800">
                <div className="flex items-center justify-between gap-4 py-2">
                  <span className="text-ink-muted">{t.publicProfile.currentStreak}</span>
                  <span className="font-mono tabular-nums text-ink-max">{format(t.publicProfile.days, { days: profile.currentStreak })}</span>
                </div>
                <div className="flex items-center justify-between gap-4 py-2">
                  <span className="text-ink-muted">{t.publicProfile.longestStreak}</span>
                  <span className="font-mono tabular-nums text-ink-max">{format(t.publicProfile.days, { days: profile.longestStreak })}</span>
                </div>
                <div className="flex items-center justify-between gap-4 py-2">
                  <span className="text-ink-muted">{t.publicProfile.studyTime}</span>
                  <span className="font-mono tabular-nums text-ink-max">{format(t.publicProfile.minutes, { minutes: profile.totalStudyMinutes })}</span>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900 p-6">
              <h3 className="text-base font-black tracking-tight text-ink-max mb-4">
                {t.publicProfile.recentLessons}
              </h3>
              {profile.recentLessons.length === 0 ? (
                <p className="text-sm text-ink-muted">
                  {t.publicProfile.noLessons}
                </p>
              ) : (
                <div className="space-y-3">
                  {profile.recentLessons.map((lesson) => (
                    <Link
                      key={`${lesson.id}-${lesson.completedAt ?? "pending"}`}
                      href={`/bai-hoc/${lesson.slug}`}
                      className="block rounded-sm border border-line px-4 py-3 hover:border-stone-500 hover:bg-surface-raised dark:hover:bg-stone-800/50 transition-colors"
                    >
                      <p className="text-sm font-bold text-ink">
                        {lesson.title}
                      </p>
                      <div className="mt-1 flex items-center justify-between gap-3 text-xs text-ink-muted">
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

            <div className="rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900 p-6">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="text-base font-black tracking-tight text-ink-max">
                  {t.publicProfile.recentPosts}
                </h3>
                <Link href="/bang-tin" className={`${textLink} text-xs`}>
                  {t.publicProfile.viewFeed}
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
