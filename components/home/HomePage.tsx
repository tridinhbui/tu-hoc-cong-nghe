"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Users, X } from "lucide-react";
import { getTotalUserCount, getTotalCompletedLessonsCount } from "@/lib/cloudflare-user";
import { roundedLessonCount } from "@/lib/track-totals";
import { animateCountTo } from "@/lib/animate-count";
import { LEARNING_FLOWS } from "@/lib/learning-flows";
import { EditorialHero, EditorialMarquee, EditorialWorlds, EditorialOS } from "@/components/home/v2/EditorialHome";
import { EditorialNeeds } from "@/components/home/v2/EditorialNeeds";
import {
  EditorialNav,
  EditorialCommunity,
  EditorialKingdom,
  EditorialMethod,
  EditorialManifest,
  EditorialReport,
  EditorialFooter,
} from "@/components/home/v2/EditorialSections";
import { useI18n } from "@/lib/i18n/context";
import {
  dismissHomeBanner,
  getHomeBannerDismissed,
  getHomeBannerDismissedServer,
  subscribeHomeBannerDismissed,
} from "@/lib/home-banner-dismissed";

/*
 * Trang chủ cho khách chưa đăng nhập. Tệp này chỉ giữ DỮ LIỆU (ba con số thật
 * từ D1, dải cam kết) và thứ tự các tờ. Ngôn ngữ thiết kế và từng section nằm
 * trong components/home/v2/ - đọc kit.tsx trước khi thêm một section mới.
 */

/* "Đọc thử một bài" mở bài đầu của hành trình "Dùng AI làm việc nhanh hơn",
 * không phải previewSlug của Track 1. Bài kia ("Hệ điều hành làm gì khi bạn
 * không nhìn") là Chặng 1 Bài 2 và mở đầu bằng lõi CPU, tiến trình, luồng -
 * đúng cái người chưa biết gì bấm vào để xem mình có theo nổi không. Bài này
 * nói về email, biên bản họp và việc văn phòng, và là bài xem thử công khai
 * (lib/preview-lessons.ts mở bài đầu của mọi hành trình). */
const FIRST_LESSON_HREF = `/bai-hoc/${LEARNING_FLOWS.find((f) => f.id === "ai-assistant")!.firstWinSlug}`;

export default function HomePage() {
  const { t } = useI18n();
  // Công tắc DEBUG trên thanh nav: bật khung nét đứt cho mọi phần tử.
  const [debug, setDebug] = useState(false);
  const [displayedUserCount, setDisplayedUserCount] = useState(0);
  const [displayedLessonCount, setDisplayedLessonCount] = useState(0);
  const [displayedCompletedCount, setDisplayedCompletedCount] = useState(0);
  const bannerDismissed = useSyncExternalStore(
    subscribeHomeBannerDismissed,
    getHomeBannerDismissed,
    getHomeBannerDismissedServer
  );
  // Số bài làm tròn xuống, cho câu văn trong hero - con số đếm lên từ 0 đọc ổn
  // khi đứng riêng, nhưng trông như hỏng khi nằm giữa một câu.
  const [lessonCountFloor, setLessonCountFloor] = useState<number | null>(null);
  const userCountLoadedRef = useRef(false);
  const completedCountLoadedRef = useRef(false);

  useEffect(() => {
    const cancelledRef = { current: false };
    // Số THẬT, không có sàn, nạp MỘT lần - trang công khai gọi hai RPC đếm toàn
    // bảng mỗi 30 giây cho mỗi tab mở là trả giá cho một dòng trang trí.
    (async () => {
      try {
        const count = await getTotalUserCount();
        if (cancelledRef.current || !count) return;
        if (!userCountLoadedRef.current) {
          userCountLoadedRef.current = true;
          animateCountTo(count, setDisplayedUserCount, cancelledRef);
        } else {
          setDisplayedUserCount(count);
        }
      } catch (error) {
        console.error("Error loading total user count:", error);
      }
    })();
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  useEffect(() => {
    const cancelledRef = { current: false };
    fetch("/api/lesson-count")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count?: number } | null) => {
        if (cancelledRef.current || !data?.count) return;
        animateCountTo(data.count, setDisplayedLessonCount, cancelledRef);
        setLessonCountFloor(Math.floor(data.count / 10) * 10);
      })
      .catch((error) => console.error("Error loading lesson count:", error));
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  useEffect(() => {
    const cancelledRef = { current: false };
    (async () => {
      try {
        const count = await getTotalCompletedLessonsCount();
        if (cancelledRef.current || !count) return;
        if (!completedCountLoadedRef.current) {
          completedCountLoadedRef.current = true;
          animateCountTo(count, setDisplayedCompletedCount, cancelledRef);
        } else {
          setDisplayedCompletedCount(count);
        }
      } catch (error) {
        console.error("Error loading total completed lessons count:", error);
      }
    })();
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  return (
    <div
      className={`relative min-h-screen overflow-x-clip bg-[#eeebe3] text-[#0d0e11] dark:bg-[#0c0d10] dark:text-[#eeebe3] ${
        debug ? "thcn-debug" : ""
      }`}
    >
      <div className="paper-grain pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10">
        {/* ── DẢI CAM KẾT ──
            Giữ nguyên nội dung và màu cờ; bỏ ngôi sao trang trí cỡ 100px ở góc.
            Màn hình hẹp đọc bản một dòng, từ sm trở lên đọc câu đầy đủ. */}
        {!bannerDismissed && (
          <div className="bg-[#DA251D]">
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 sm:px-6 lg:px-8">
              <svg viewBox="0 0 24 24" className="hidden h-3.5 w-3.5 shrink-0 text-[#FFCD00] sm:block" fill="currentColor" aria-hidden="true">
                <path d="m12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.2 5.8 20.9l1.6-7L2 9.2l7.1-.6L12 2Z" />
              </svg>
              <p className="min-w-0 flex-1 truncate text-xs font-semibold text-white sm:overflow-visible sm:whitespace-normal sm:text-[13px]">
                <span className="sm:hidden">
                  {t.home.banner.shortPrefix}
                  <strong className="text-[#FFCD00]">{t.home.banner.freeForever}</strong>
                </span>
                <span className="hidden sm:inline">
                  {t.home.banner.part1}
                  <strong className="text-[#FFCD00]">{t.home.banner.freeForever}</strong>
                  {t.home.banner.part2}
                </span>
              </p>
              <a
                href="https://www.facebook.com/share/g/1C2jTdsgF5/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-bold text-white underline-offset-4 hover:underline sm:text-[13px]"
              >
                {/* Màn hẹp chỉ hiện biểu tượng: nhãn chữ chiếm chỗ đúng cụm "miễn
                    phí mãi mãi" - thông điệp của cả dải. Nhãn vẫn còn cho trình
                    đọc màn hình qua sr-only. */}
                <Users aria-hidden className="h-4 w-4 sm:hidden" />
                <span className="sr-only sm:not-sr-only">{t.home.banner.facebook}</span>
                <ArrowUpRight aria-hidden className="hidden h-3.5 w-3.5 sm:block" />
              </a>
              <button
                type="button"
                onClick={dismissHomeBanner}
                aria-label={t.home.banner.dismiss}
                className="shrink-0 rounded-xs p-1 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        <EditorialNav debug={debug} onDebug={() => setDebug((d) => !d)} />
        <EditorialHero
          lessonCount={lessonCountFloor ?? roundedLessonCount()}
          learners={displayedUserCount}
          lessons={displayedLessonCount}
          completed={displayedCompletedCount}
          previewHref={FIRST_LESSON_HREF}
        />
        <EditorialNeeds />
        <EditorialMarquee />
        <EditorialWorlds />
        <EditorialOS />
        <EditorialCommunity />
        <EditorialKingdom />
        <EditorialMethod />
        <EditorialMarquee items={t.home.v2.marquee.slice().reverse()} reverse />
        <EditorialManifest />
        <EditorialReport />
        <EditorialFooter />
      </div>
    </div>
  );
}
