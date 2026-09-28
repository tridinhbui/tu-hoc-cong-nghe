import { getLessonsMeta } from "@/lib/lessons-loader";
import { getCompletedLessons } from "@/lib/cloudflare-progress";
import { createServerCloudflareClient } from "@/lib/cloudflare-server";
import type { Locale } from "@/lib/i18n/locales";
import type { LessonMeta } from "@/lib/lesson-types";
import { CERT_TRACKS, certLessonIds, type CertDomain, type CertTrack } from "@/lib/cert-tracks";

export interface CertDomainProgress {
  domain: CertDomain;
  lessons: LessonMeta[];
  completedCount: number;
}

export interface CertProgress {
  cert: CertTrack;
  domains: CertDomainProgress[];
  distinctLessonCount: number;
  distinctCompleted: number;
}

/**
 * Dữ liệu chung của /chung-chi và /chung-chi/<certId>: bài của từng miền (đã
 * lọc bài ẩn) và tiến độ của người đang xem. Một lần đọc user_progress cho cả
 * ba chứng chỉ - trang tổng hiện cả ba thẻ cùng lúc.
 *
 * Chưa đăng nhập thì tiến độ rỗng chứ không chuyển hướng: trang chứng chỉ là
 * chỗ người mới xem thử trước khi quyết định học.
 */
export async function loadCertProgress(locale: Locale) {
  const cloudflare = await createServerCloudflareClient();
  const {
    data: { user },
  } = await cloudflare.auth.getUser();

  const [allLessons, completedLessonIds, profileRes, streakRes] = await Promise.all([
    getLessonsMeta(locale),
    user ? getCompletedLessons(user.id, cloudflare).catch(() => [] as number[]) : Promise.resolve<number[]>([]),
    user
      ? cloudflare.from("user_profiles").select("total_xp").eq("id", user.id).maybeSingle()
      : Promise.resolve({ data: null }),
    user
      ? cloudflare.from("user_streaks").select("current_streak").eq("user_id", user.id).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const lessonById = new Map(allLessons.map((l) => [l.id, l]));
  const completedSet = new Set<number>((completedLessonIds as unknown[]).map(Number));

  const certs: CertProgress[] = CERT_TRACKS.map((cert) => {
    const domains = cert.domains.map((domain) => {
      const lessons = domain.lessonIds
        .map((id) => lessonById.get(id))
        .filter((l): l is LessonMeta => !!l && l.isVisible !== false);
      return { domain, lessons, completedCount: lessons.filter((l) => completedSet.has(l.id)).length };
    });
    const distinct = certLessonIds(cert).filter((id) => {
      const l = lessonById.get(id);
      return !!l && l.isVisible !== false;
    });
    return {
      cert,
      domains,
      distinctLessonCount: distinct.length,
      distinctCompleted: distinct.filter((id) => completedSet.has(id)).length,
    };
  });

  return {
    certs,
    completedLessonIds: [...completedSet],
    xp: Number((profileRes.data as { total_xp?: number } | null)?.total_xp ?? 0),
    streak: Number((streakRes.data as { current_streak?: number } | null)?.current_streak ?? 0),
  };
}
