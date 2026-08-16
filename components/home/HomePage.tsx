"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, PlayCircle, X } from "lucide-react";
import { getTotalUserCount, getTotalCompletedLessonsCount } from "@/lib/supabase-user";
import { roundedLessonCount } from "@/lib/track-totals";
import { animateCountTo } from "@/lib/animate-count";
import { TRACKS } from "@/lib/tracks";
import Logo from "@/components/Logo";
import LiveNumber from "@/components/LiveNumber";
import ScrollReveal from "@/components/home/ScrollReveal";
import ProductPreview from "@/components/home/ProductPreview";
import PublicLeaderboardPreview from "@/components/login/PublicLeaderboardPreview";
import InteractiveKingdomPreview from "@/components/home/InteractiveKingdomPreview";
import InteractiveEcosystemShowcase from "@/components/home/InteractiveEcosystemShowcase";
import ScrollytellingPinnedSection from "@/components/home/ScrollytellingPinnedSection";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import {
  dismissHomeBanner,
  getHomeBannerDismissed,
  getHomeBannerDismissedServer,
  subscribeHomeBannerDismissed,
} from "@/lib/home-banner-dismissed";

/** Vạch ngăn giữa hai section không nằm trong hệ `band`.
 *
 *  Bản cũ là một dải cao 48px tô chuyển sắc xanh ở giữa - một vùng phát sáng.
 *  Giờ nó là một nét kẻ mảnh thu hẹp vào giữa, đúng bằng thứ mà
 *  `.band-divider::after` vẽ, để hai kiểu ngăn chương trên cùng một
 *  trang không nói hai giọng khác nhau. */
function SoftFadeDivider() {
  return (
    <div className="mx-auto h-px w-[min(88vw,1120px)] bg-gradient-to-r from-transparent via-stone-300/70 to-transparent dark:via-stone-700/70" />
  );
}

/**
 * Đề mục một section, đặt như đầu một chương sách.
 *
 * VÌ SAO GOM VỀ MỘT CHỖ. Năm section trước đây tự viết lại cùng một khuôn:
 * một dòng eyebrow chữ hoa tô xanh (hoặc hổ phách ở khu tối), một `<h2>`
 * font-black, một đoạn phụ. Cùng khuôn nhưng lệch nhau ở mọi chi tiết - cỡ
 * chữ eyebrow chạy từ 11px tới 12px, tiêu đề từ `text-2xl` tới `text-4xl`,
 * khoảng cách dưới từ `mb-3` tới `mb-8`. Đọc dọc trang thì năm section trông
 * như năm trang khác nhau ghép lại.
 *
 * SỐ CHƯƠNG là thứ thêm mới, và nó làm một việc mà eyebrow màu không làm
 * được: nói cho người đọc biết họ đang ở đâu trong một trình tự. Đây là sản
 * phẩm học, nên trang giới thiệu nó nên đọc như mục lục chứ như một dãy thẻ
 * tính năng.
 *
 * `index` là số, không phải chuỗi - nên chỗ này không sinh ra chữ cứng nào cho
 * scripts/i18n-coverage.mjs phải bắt. Mọi chữ vẫn đến từ từ điển.
 */
function ChapterHeading({
  index,
  eyebrow,
  title,
  sub,
  tone = "light",
  className = "",
}: {
  index: number;
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={className}>
      <div className="flex items-baseline gap-3">
        {/* Số chương ở cỡ lớn nhưng nhạt: nó định vị, không tranh chỗ với tiêu
            đề. `tabular-nums` để 01 và 02 rộng bằng nhau, nếu không mép trái
            của các section sẽ lệch nhau vài pixel khi cuộn qua. */}
        <span
          className={`shrink-0 font-black tabular-nums leading-none text-[1.75rem] sm:text-[2rem] ${
            dark ? "text-white/25" : "text-stone-300 dark:text-stone-700"
          }`}
        >
          {String(index).padStart(2, "0")}
        </span>
        <span
          className={`eyebrow ${
            dark ? "text-emerald-300/90" : "text-emerald-700 dark:text-emerald-400"
          }`}
        >
          {eyebrow}
        </span>
      </div>

      {/* Nét kẻ ngang chạy hết chiều rộng khối - dấu hiệu bắt đầu chương. */}
      <div
        className={`mt-3 h-px w-full ${
          dark ? "bg-white/15" : "bg-stone-300/70 dark:bg-stone-700/70"
        }`}
      />

      <h2
        className={`mt-4 text-[1.7rem] font-black leading-[1.12] tracking-tight sm:text-[2.1rem] lg:text-[2.4rem] ${
          dark ? "text-white" : "text-stone-950 dark:text-stone-50"
        }`}
      >
        {title}
      </h2>

      {sub && (
        <p
          className={`mt-3 max-w-xl text-sm leading-7 sm:text-[15px] ${
            dark ? "text-stone-300" : "text-stone-600 dark:text-stone-400"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export default function HomePage() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  // Hiệu ứng vào của hero. Trước đây mỗi khối tự khai initial/animate/transition,
  // và tổng độ trễ dồn lại thành ~0,9 giây trước khi màn hình đầu đọc được -
  // chụp hai ảnh liên tiếp lúc tải thì ảnh đầu gần như trắng chữ. Gom về một
  // chỗ để (1) rút delay xuống còn một nửa và (2) tắt hẳn khi người dùng đã
  // bật prefers-reduced-motion, thay vì mỗi khối một kiểu.
  const heroReveal = (delay: number, y = 16) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, ease: "easeOut" as const, delay },
        };
  const [displayedUserCount, setDisplayedUserCount] = useState(0);
  const [displayedLessonCount, setDisplayedLessonCount] = useState(0);
  const [displayedCompletedCount, setDisplayedCompletedCount] = useState(0);
  // Vị trí con trỏ trong hero, chỉ dùng để nghiêng bản mô phỏng bài học.
  // Tên cũ là `heroSpotlight` vì nó từng điều khiển một vệt sáng; vệt sáng đã
  // bỏ, nên cái tên cũng phải đi theo - một biến tên "spotlight" mà không còn
  // spotlight nào là thứ khiến lần đọc sau đi tìm một hiệu ứng không tồn tại.
  const [heroPointer, setHeroPointer] = useState({ x: 50, y: 35 });
  const bannerDismissed = useSyncExternalStore(
    subscribeHomeBannerDismissed,
    getHomeBannerDismissed,
    getHomeBannerDismissedServer
  );
  // Plain (non-animated) rounded-down count for inline copy ("360+ bài
  // học..." in the hero paragraph and pain-point card) - the animated
  // displayedLessonCount above counts up from 0 on load, which reads fine
  // as a standalone hero stat but looks broken mid-sentence in body text.
  const [lessonCountFloor, setLessonCountFloor] = useState<number | null>(null);
  const userCountLoadedRef = useRef(false);
  const completedCountLoadedRef = useRef(false);
  const heroParallaxX = (heroPointer.x - 50) / 10;
  const heroParallaxY = (heroPointer.y - 35) / 10;


  useEffect(() => {
    const cancelledRef = { current: false };
    const loadUserCount = async () => {
      try {
        const count = await getTotalUserCount();
        if (cancelledRef.current || !count) return;
        // Số THẬT, không có sàn. Trước đây chỗ này là Math.max(count, 1000):
        // một người học thứ 40 vẫn được trang chủ báo là người thứ 1.000. Sàn
        // như vậy không phải làm tròn cho đẹp mà là nói sai với người chưa đăng
        // ký - đúng nhóm người không có cách nào kiểm chứng.
        const safeCount = count;
        if (!userCountLoadedRef.current) {
          userCountLoadedRef.current = true;
          animateCountTo(safeCount, setDisplayedUserCount, cancelledRef);
        } else {
          setDisplayedUserCount(safeCount);
        }
      } catch (error) {
        console.error("Error loading total user count:", error);
      }
    };

    // Nạp MỘT lần, không lặp.
    //
    // Trước đây chỗ này gọi lại mỗi 30 giây. Đây là trang chủ công khai, nên
    // mỗi tab để mở - kể cả tab bị bỏ quên và mỗi bot chạy JS - gọi hai RPC
    // ĐẾM TOÀN BẢNG hai lần mỗi phút, mãi mãi. Con số nó nuôi là một dòng
    // trang trí ("Hơn X người học đã tham gia") thay đổi vài đơn vị mỗi ngày:
    // không có câu hỏi nào mà việc làm mới nó sau 30 giây trả lời được.
    void loadUserCount();

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
    const loadCompletedCount = async () => {
      try {
        const count = await getTotalCompletedLessonsCount();
        if (cancelledRef.current || !count) return;
        // Số THẬT, không có sàn - xem ghi chú ở phần đếm người học.
        const safeCount = count;
        if (!completedCountLoadedRef.current) {
          completedCountLoadedRef.current = true;
          animateCountTo(safeCount, setDisplayedCompletedCount, cancelledRef);
        } else {
          setDisplayedCompletedCount(safeCount);
        }
      } catch (error) {
        console.error("Error loading total completed lessons count:", error);
      }
    };

    // Nạp một lần - xem ghi chú ở phần đếm người học phía trên.
    void loadCompletedCount();

    return () => {
      cancelledRef.current = true;
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fbfaf7] transition-colors duration-300 dark:bg-stone-950">
      <div className="relative overflow-hidden bg-[#fbfaf7] dark:bg-stone-950">
        {/* TẦNG TRANG TRÍ THỨ HAI, đã gỡ.
            Chú thích cũ của nó tự khai luôn nguồn gốc: "Stripe-style Ambient
            Radial Glow Beam, Grid Mesh & Floating Blur Orbs". Một chùm sáng
            1100×650, bốn quả cầu mờ 500-700px (một quả `animate-pulse`), và
            một lưới 3rem có mặt nạ hình elip.
            Nó nằm CHỒNG lên tầng trang trí ở khối dưới - hai bộ hiệu ứng độc
            lập cùng phủ lên một trang, đó là lý do trang cũ sáng đều một màu
            xanh bất kể section đang nói gì. */}
      {/* MẶT GIẤY CỦA CẢ TRANG - đúng MỘT lớp.
          Chỗ này từng có tám lớp chồng lên nhau: một lớp vân, một lớp ba vòng
          radial màu, một lưới ô 28px tự trôi, ba quầng aurora tự dạt, và ba
          quả cầu mờ 450-550px tự đập theo nhịp. Chúng phủ lên mọi section bên
          dưới, nên dù từng section muốn nói gì thì mắt vẫn đọc ra "trang chủ
          của một công ty phần mềm".

          Bỏ hết, giữ lại đúng lớp mô tả một BỀ MẶT chứ không phải một nguồn
          sáng: hạt giấy mịn. Nó nay là `.paper-grain` trong app/globals.css -
          trước đây tên `.landing-texture` và sống trong một khối `<style jsx>`
          ngay trong tệp này, tức bốn trang còn lại của sản phẩm không với tới
          được. Khối ấy đã xoá; trang này không còn CSS inline nào.

          Chiều sâu của trang giờ đến từ sắc độ giấy giữa các dải, từ đường kẻ
          mảnh ngăn chương, và từ chính các khối minh hoạ tương tác - chứ không
          từ ánh sáng phủ lên tất cả. */}
      <div className="paper-grain pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10">
        {/* Top banner - pushed to the very top of the page per request, in
            Vietnamese-flag red/yellow, same commitment message previously
            further down in the Social Proof section (moved here, not
            duplicated).

            Ở 375×812 bản cũ chiếm ~200px, tức một phần tư màn hình đầu, vì
            câu cam kết đầy đủ xuống bốn dòng và cụm flex-col xếp thêm liên
            kết Facebook xuống dòng nữa. Giờ màn hình hẹp đọc bản rút gọn một
            dòng (`shortPrefix` + "miễn phí mãi mãi"), còn câu đầy đủ giữ
            nguyên từ breakpoint sm trở lên.

            Nút đóng ghi vào localStorage. Banner vẫn kết xuất phía máy chủ và
            chỉ ẩn sau khi effect chạy - người đã đóng thấy nó chớp một nhịp,
            đổi lại người chưa đóng không bị đẩy nội dung xuống sau khi trang
            đã vẽ. */}
        {!bannerDismissed && (
        <div className="relative overflow-hidden bg-[#DA251D]">
          <div className="pointer-events-none absolute -top-8 -right-8 text-[100px] leading-none text-[#FFCD00]/10 select-none">
            ★
          </div>
          <div className="relative max-w-7xl mx-auto flex items-center gap-2 px-4 sm:px-6 lg:px-8 py-2 sm:gap-3 sm:justify-center">
            <span className="hidden sm:inline text-lg leading-none text-[#FFCD00]" aria-hidden="true">
              ★
            </span>
            {/* `flex-1` ở mọi cỡ, không `sm:flex-none`. `flex: none` cho chiều
                ngang bằng max-content, nên `sm:whitespace-normal` không bao giờ
                có gì để xuống dòng: câu dài ra 1255px trong khung 753px, khung
                cha `overflow-hidden` cắt cụt cả hai đầu vì `sm:justify-center`,
                và thứ nằm giữa - chữ "miễn phí mãi mãi" - là thứ bị mất. Đúng
                cái lỗi mà chú thích của nút Facebook bên dưới nói là đã tránh
                được ở màn hình hẹp. */}
            <p className="min-w-0 flex-1 truncate text-xs font-semibold text-white/95 sm:overflow-visible sm:whitespace-normal sm:text-sm sm:leading-relaxed">
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
              className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-black text-white hover:underline whitespace-nowrap shrink-0"
            >
              {/* Nhãn ngắn ở màn hình hẹp: nhãn đầy đủ chiếm hai phần ba chiều
                  ngang và cắt cụt đúng cụm "miễn phí mãi mãi" - tức là cắt mất
                  chính thông điệp của banner. */}
              <span className="sm:hidden">{t.home.banner.facebookShort}</span>
              <span className="hidden sm:inline">{t.home.banner.facebook}</span>
              <ArrowRight className="icon-micro w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={dismissHomeBanner}
              aria-label={t.home.banner.dismiss}
              className="shrink-0 rounded-full p-1 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        )}

        {/* ── NAV ── */}
        <header className="sticky top-0 z-40 border-b border-stone-300/70 bg-[#fbfaf7] dark:border-stone-800 dark:bg-stone-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Logo size={28} />
              <span className="text-sm sm:text-base font-black text-stone-800 dark:text-stone-200 uppercase tracking-widest flex items-center gap-2">
                {t.home.brand}
                <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200/50 hidden xs:inline-block">
                  {t.home.brandBadge}
                </span>
              </span>
            </div>
            <Link
              href="/login"
              className="group inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              {t.home.navCta}
              <ArrowRight className="icon-micro w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </header>

        {/* ── HERO ── */}
        {/* `onMouseMove` GIỮ LẠI, nhưng giờ chỉ nuôi đúng một thứ: độ nghiêng
            của bản mô phỏng bài học ở cột phải. Trước đây nó nuôi hai thứ -
            độ nghiêng, và một vệt sáng trắng-xanh chạy theo con trỏ khắp hero.
            Vệt sáng đã bỏ; độ nghiêng thì ở lại, vì nó làm tấm mô phỏng có
            khối chứ không phải làm nền trang loé lên. */}
        <section
          className="relative overflow-hidden band band-paper"
          onMouseMove={(e) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            setHeroPointer({
              x: Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100)),
              y: Math.max(10, Math.min(90, ((e.clientY - rect.top) / rect.height) * 100)),
            });
          }}
        >
          {/* Hero không còn lớp nền riêng nào.
              Ở đây từng có bốn thứ chồng lên nhau: ảnh Quảng trường Thời Đại
              mờ 16%, hai vòng radial xanh/hổ phách, một lưới ô 32px, và một
              vệt sáng chạy theo con trỏ. Ảnh New York là hình cổ động cho một
              ngành nghề, không phải cho việc học - và ba lớp còn lại là hiệu
              ứng thuần tuý.
              Bỏ hết thì mặt giấy của trang lộ ra, và thứ sáng nhất trong khung
              hình đầu tiên trở thành bản mô phỏng bài học thật ở cột phải -
              đúng thứ đáng làm nhân vật chính. */}

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-10">
            <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7 max-w-2xl">
                {/* Dòng đề, kiểu chạy đầu trang sách - không phải viên thuốc.
                    Bản cũ là một pill bo tròn: viền xanh, nền trắng mờ,
                    backdrop-blur, kèm một chấm `animate-ping`. Chấm nhấp nháy
                    là quy ước của "đang trực tuyến"; ở đây nó gắn vào một câu
                    khẩu hiệu không có gì trực tiếp cả, nên nó chỉ là chuyển
                    động để gây chú ý.
                    Thay bằng một nét kẻ ngắn màu xanh học thuật rồi tới chữ.
                    Nét kẻ làm đúng việc của pill - tách dòng đề khỏi tiêu đề -
                    mà không dựng thêm một cái hộp nào. */}
                <motion.div
                  {...heroReveal(0)}
                  className="eyebrow mb-5 flex items-center gap-3 text-stone-500 dark:text-stone-400"
                >
                  <span aria-hidden className="h-px w-8 bg-emerald-600 dark:bg-emerald-500" />
                  {t.home.hero.badge}
                </motion.div>

                <motion.h1
                  {...heroReveal(0.03, 18)}
                  className="mb-4 text-[2.5rem] sm:text-[3.6rem] lg:text-[3.8rem] xl:text-[4.4rem] font-black leading-[1.02] tracking-tight text-stone-950 dark:text-stone-50"
                >
                  {t.home.hero.titlePart1}{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-black">
                    {t.home.hero.titleHighlight}
                  </span>
                  ,<br />
                  {t.home.hero.titlePart2}
                </motion.h1>

                <motion.p
                  {...heroReveal(0.06, 18)}
                  className="mb-8 max-w-xl text-[15px] leading-7 text-stone-600 [filter:none] dark:text-stone-300 sm:text-lg"
                >
                  {format(t.home.hero.sub, { count: lessonCountFloor ?? 360 })}
                </motion.p>

                <motion.div
                  {...heroReveal(0.09, 18)}
                  className="mb-10 flex flex-wrap items-center gap-3 [filter:none]"
                >
                  <Link
                    href="/login?mode=signup"
                    className="group inline-flex items-center gap-2 rounded-lg bg-stone-950 px-6 py-3.5 text-base font-black text-white transition-colors hover:bg-stone-800 active:bg-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
                  >
                    {t.home.hero.ctaPrimary}
                    <ArrowRight className="icon-micro w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href={`/bai-hoc/${TRACKS.personal.previewSlug}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-stone-400/70 px-5 py-3 text-sm font-bold text-stone-900 transition-colors hover:border-stone-900 hover:bg-stone-900 hover:text-white dark:border-stone-600 dark:text-stone-100 dark:hover:border-stone-100 dark:hover:bg-stone-100 dark:hover:text-stone-900"
                  >
                    <PlayCircle className="w-4 h-4" />
                    {t.home.hero.ctaSecondary}
                  </a>
                </motion.div>

                {/* Ba con số, đặt như dòng thống kê ở chân một trang sách.
                    Bản cũ bọc chúng trong một tấm kính: bo 1,35rem, nền trắng
                    mờ, backdrop-blur, đổ bóng xanh 44px. Ba con số THẬT - đọc
                    từ cơ sở dữ liệu, đếm lên khi tải - không cần một tấm thẻ
                    nổi để được tin; tấm thẻ chỉ làm chúng trông như một widget
                    tiếp thị.
                    Giờ chúng ngồi thẳng trên giấy, ngăn cách bởi một nét kẻ
                    ngang phía trên và các nét dọc mảnh giữa từng cột. Nhãn
                    "đang cập nhật" vẫn còn nhưng thành chữ thường, không chấm
                    nhấp nháy - xem chú thích ở dòng đề phía trên. */}
                <motion.div
                  {...heroReveal(0.12, 14)}
                  className="w-full border-t border-stone-300/70 pt-4 dark:border-stone-700/70 sm:w-fit"
                >
                  <div className="eyebrow mb-3 flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                    <span aria-hidden className="h-px w-4 bg-emerald-600/70 dark:bg-emerald-500/70" />
                    {t.home.hero.liveLabel}
                  </div>
                  <div className="flex items-stretch divide-x divide-stone-300/70 dark:divide-stone-700/70">
                    <div className="min-w-0 pr-3 sm:pr-6">
                      <LiveNumber value={displayedUserCount} className="text-lg sm:text-2xl" />
                      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400 sm:text-[11px]">{t.home.hero.statLearners}</p>
                    </div>
                    <div className="min-w-0 px-3 sm:px-6">
                      <LiveNumber value={displayedLessonCount} className="text-lg sm:text-2xl" />
                      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400 sm:text-[11px]">{t.home.hero.statLessons}</p>
                    </div>
                    <div className="min-w-0 pl-3 sm:pl-6">
                      <LiveNumber value={displayedCompletedCount} className="text-lg sm:text-2xl" />
                      <p className="mt-0.5 whitespace-nowrap text-[10px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400 sm:whitespace-normal sm:text-[11px]">{t.home.hero.statCompleted}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, x: 24, scale: 0.96, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease: "easeOut", delay: 0.09 }}
                  className="lg:col-span-5 relative flex justify-center w-full mt-6 lg:mt-0"
                >
                {/* Khung đứng YÊN. Bản cũ mang `landing-float` - bập bênh
                    5,5 giây một nhịp, vĩnh viễn - cộng hover nhấc lên và phóng
                    to. Đây là bản mô phỏng một trang bài học: một tài liệu thì
                    không trôi nổi, và chuyển động vô cớ ngay cạnh tiêu đề là
                    thứ kéo mắt khỏi chính chữ cần đọc.
                    Giữ lại đúng một lớp bóng nhẹ để nó vẫn nổi khỏi mặt giấy -
                    brief muốn còn chiều sâu, không muốn cực tiểu. */}
                <div className="relative w-full max-w-[590px] overflow-hidden rounded-xl border border-stone-300/70 bg-stone-950 text-white shadow-[0_18px_48px_-30px_rgba(15,23,42,0.45)] dark:border-stone-800">
                  <div className="absolute inset-0">
                    <Image
                      src="/boss-wallstreet-bull.png"
                      alt={t.home.card.bullAlt}
                      fill
                      sizes="520px"
                      className="object-cover object-center opacity-55"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.24),transparent_28%),linear-gradient(115deg,rgba(15,23,42,0.96),rgba(15,23,42,0.76)_44%,rgba(6,78,59,0.62))]" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-stone-950/90 to-transparent" />
                  </div>

                  <div
                      className="relative p-5 xl:p-6"
                      style={{
                        transform: `perspective(1200px) translate3d(${heroParallaxX * 0.5}px, ${heroParallaxY * 0.35}px, 0)`,
                      }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 rounded border border-emerald-300/25 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                        {t.home.card.studyingNow}
                      </div>
                      <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-amber-100">
                        {t.home.card.lessonNo}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 xl:grid-cols-[minmax(0,1.08fr)_minmax(190px,0.82fr)]">
                      <div
                        className="rounded-xl border border-white/10 bg-white/[0.05] p-3.5 xl:p-4"
                        style={{
                          transform: `perspective(1200px) translate3d(${heroParallaxX * 0.8}px, ${heroParallaxY * 0.6}px, 0) rotateY(${heroParallaxX * 0.45}deg)`,
                        }}
                      >
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200">{t.home.card.todayLabel}</p>
                            <p className="mt-1 text-base font-black leading-tight text-white xl:text-lg">{t.home.card.todayTitle}</p>
                          </div>
                          <div className="shrink-0 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-black text-emerald-200">
                            {t.home.card.comprehension}
                          </div>
                        </div>
                        <div className="rounded-lg border border-white/10 bg-stone-950/45 p-3">
                          <div className="rounded-md bg-white/8 p-2.5">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-stone-400">{t.home.card.exampleLabel}</p>
                                <p className="mt-1 text-[13px] font-bold leading-snug text-white">
                                  {t.home.card.exampleText}
                                </p>
                              </div>
                              <div className="rounded-full bg-amber-300/15 px-2 py-1 text-[10px] font-black text-amber-100">{t.finalOne.homePage.bigOBadge}</div>
                            </div>
                            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                              {[
                                [t.home.card.priceLabel, t.home.card.priceValue],
                                [t.finalOne.homePage.stepsLabel, t.home.card.epsValue],
                                [t.finalOne.homePage.bigOBadge, t.home.card.peValue],
                              ].map(([label, value]) => (
                                <div key={label} className="rounded-md bg-stone-950/45 px-1.5 py-2">
                                  <p className="text-[9px] font-black uppercase tracking-[0.12em] text-stone-500">{label}</p>
                                  <p className="mt-1 text-[13px] font-black leading-tight text-white">{value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-3 space-y-2">
                            {[
                              ["1", t.home.card.tip1],
                              ["2", t.home.card.tip2],
                              ["3", t.home.card.tip3],
                            ].map(([step, text]) => (
                              <div key={step} className="flex items-center gap-2 rounded-md bg-white/7 px-2.5 py-2 text-[11px] font-bold leading-snug text-stone-200">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-300/15 text-[10px] text-emerald-100">{step}</span>
                                {text}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {[
                            [t.home.card.metaLesson, t.home.card.metaLessonValue],
                            // Ô này từng hiện "Quiz đúng: N%" với N tính bằng
                            // (số bài đã hoàn thành % 100) rồi kẹp vào 72-98.
                            // Đó không phải một tỷ lệ được đo từ đâu cả - nó là
                            // một con số trông giống thống kê. Thay bằng thứ
                            // kiểm chứng được: mỗi bài có 5 câu hỏi.
                            [t.finalOne.homePage.quizLabel, t.home.card.metaQuizValue],
                            [t.home.card.metaReview, t.home.card.metaReviewValue],
                          ].map(([label, value]) => (
                            <div key={label} className="rounded-lg border border-white/10 bg-white/8 px-3 py-2">
                              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-stone-400">{label}</p>
                              <p className="mt-1 text-[13px] font-black leading-tight text-white">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3 xl:block xl:space-y-3">
                        <div
                          className="rounded-xl border border-white/10 bg-white/[0.05] p-3.5 xl:p-4"
                          style={{
                            transform: `perspective(1200px) translate3d(${heroParallaxX * 1.1}px, ${heroParallaxY * 0.8}px, 0) rotateY(${heroParallaxX * 0.7}deg)`,
                          }}
                        >
                          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-stone-300">{t.home.card.quizLabel}</p>
                          <p className="mt-2 text-sm font-black text-white">{t.home.card.quizQuestion}</p>
                          <div className="mt-3 space-y-2">
                            <div className="rounded-full bg-emerald-300/18 px-3 py-2 text-xs font-black text-emerald-100">{t.home.card.quizRight}</div>
                            <div className="rounded-full bg-white/8 px-3 py-2 text-xs font-bold text-stone-300">{t.home.card.quizWrong}</div>
                          </div>
                        </div>
                        <div
                          className="rounded-xl border border-white/10 bg-white/[0.05] p-3.5 xl:p-4"
                          style={{
                            transform: `perspective(1200px) translate3d(${heroParallaxX * 1.6}px, ${heroParallaxY * 1.15}px, 0) rotateY(${heroParallaxX * 0.9}deg)`,
                          }}
                        >
                          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-stone-300">{t.finalOne.homePage.flashcardLabel}</p>
                          <p className="mt-2 text-sm font-black text-white">{t.home.card.flashQuestion}</p>
                          <p className="mt-1 text-xs leading-relaxed text-stone-300">{t.home.card.flashAnswer}</p>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div className="preview-progress-live h-full w-3/4 rounded-full bg-gradient-to-r from-amber-300 to-emerald-300" />
                          </div>
                        </div>
                        <div className="rounded-xl border border-emerald-300/20 bg-emerald-400/[0.07] p-3.5 xl:p-4">
                          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200">{t.home.card.noteLabel}</p>
                          <p className="mt-2 text-sm font-black text-white">{t.home.card.noteTitle}</p>
                          <p className="mt-1 text-xs leading-relaxed text-stone-300">{t.home.card.noteBody}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PRODUCT PREVIEW ── */}
        <section className="band band-paper band-divider relative py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-2xl mb-8">
            <ChapterHeading
              index={1}
              eyebrow={t.home.preview.eyebrow}
              title={t.home.preview.title}
              sub={t.home.preview.sub}
            />
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <ProductPreview />
          </ScrollReveal>
          {/* MỤC LỤC CHƯƠNG, không phải bảng chạy chữ.
              Sáu dòng này là tên sáu tính năng thật, và bản cũ cho chúng trôi
              ngang trong một viên thuốc bo tròn - `animation: ticker-drift 26s
              linear infinite`. Chữ đang trôi thì không đọc được: muốn biết
              dòng thứ tư nói gì phải đứng chờ nó quay lại. Một danh sách sáu
              mục mà người đọc không đọc nổi thì nó không còn là thông tin, chỉ
              còn là chuyển động.

              Xếp tĩnh, xuống dòng tự nhiên, mỗi mục mở đầu bằng một gạch ngắn
              xanh - cùng ngôn ngữ với dòng đề ở hero và số chương. Đọc như
              dòng "trong chương này" ở đầu một chương sách. */}
          <ul className="eyebrow mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-stone-300/70 pt-4 text-stone-500 dark:border-stone-700/70 dark:text-stone-400">
            {[
              t.home.ticker.liveXp,
              t.home.ticker.weeklyBoard,
              t.home.ticker.spacedRepetition,
              t.home.ticker.gameKingdom,
              t.home.ticker.finsocial,
              t.home.ticker.studyGroup,
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden className="h-px w-3 bg-emerald-600/80 dark:bg-emerald-500/80" />
                {item}
              </li>
            ))}
          </ul>
          </div>
        </section>

        {/* ── SOCIAL PROOF ── */}
        <section className="bg-white dark:bg-stone-950 py-5 sm:py-6 relative border-y border-stone-200/80 dark:border-stone-800/80 font-sans">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Căn TRÁI, không còn căn giữa. Đây là section duy nhất trước
                đây căn giữa, nên khi cuộn qua nó là một lần mắt phải nhảy vào
                giữa rồi quay lại mép trái ở section sau. Mục lục sách thì
                thẳng một cột. */}
            <ScrollReveal className="mb-5">
              <ChapterHeading
                index={2}
                eyebrow={t.home.social.eyebrow}
                title={t.home.social.title}
                sub={t.home.social.sub}
              />
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <PublicLeaderboardPreview />
            </ScrollReveal>
          </div>
        </section>

        {/* ── GAME KINGDOM PREVIEW ── */}
        <section className="band band-ink band-divider relative py-5 sm:py-6 font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dải này là khu trò chơi nên nền vẫn tối - giữ nguyên, vì brief
              muốn phần gamification còn ra chất. Chỉ bỏ ba lớp `drop-shadow`
              đổ bóng chữ: nền giờ là một mặt mực phẳng, chữ trắng trên đó đã
              đủ tương phản, và bóng chữ là thứ chỉ cần khi đặt chữ lên ảnh. */}
          <ScrollReveal className="max-w-3xl mb-4">
            <ChapterHeading
              index={3}
              tone="dark"
              eyebrow={t.home.kingdom.eyebrow}
              title={t.home.kingdom.title}
              sub={t.home.kingdom.sub}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <InteractiveKingdomPreview />
          </ScrollReveal>
        </div>
      </section>

        {/* ── FEATURE SHOWCASE ── */}
        <section className="band band-academic band-divider relative py-5 sm:py-6 font-sans border-y border-stone-200/80 dark:border-stone-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="max-w-3xl mb-4">
              <ChapterHeading
                index={4}
                eyebrow={t.home.ecosystem.eyebrow}
                sub={t.home.ecosystem.sub}
                title={
                  <>
                    {t.home.ecosystem.titlePart1}{" "}
                    <span className="text-emerald-700 dark:text-emerald-400">
                      {t.home.ecosystem.titleHighlight}
                    </span>
                  </>
                }
              />
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <InteractiveEcosystemShowcase />
            </ScrollReveal>
          </div>
        </section>

        <SoftFadeDivider />

        {/* ── UNIFIED 3-PANEL PINNED SCROLLYTELLING SECTION (QUICK & FLUID 160VH) ── */}
        <ScrollytellingPinnedSection />

        {/* ── VISION & MISSION ── */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <ScrollReveal>
            {/* KHÔNG CÒN THẺ BỌC. Chỗ này từng là một `animated-border-card`:
                viền chạy sáng, nền trắng 70%, backdrop-blur, bo 20px, đổ bóng -
                và bên trong nó lại là ba thẻ bo góc nữa. Ba tầng hộp lồng nhau
                cho một đoạn nói về tầm nhìn.
                Giờ nội dung nằm thẳng trên giấy, ngăn với section trên bằng một
                nét kẻ. Cùng cách mà một chương sách mở đầu. */}
            <div className="border-t border-stone-300/70 pt-8 dark:border-stone-700/70">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.95fr)] lg:items-center">
                <div>
                  <p className="mb-2 inline-flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs shadow-xs border border-emerald-200/80 dark:bg-emerald-950/40 dark:border-emerald-900/50">
                      🇻🇳
                    </span>
                    {t.home.vision.eyebrow}
                  </p>
                  <h2 className="max-w-xl text-xl sm:text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100 leading-snug">
                    {t.home.vision.title}
                  </h2>

                  {/* Bảng số liệu, không phải ba tấm thẻ. Ba con số này phải
                      đọc CẠNH nhau để có nghĩa - quy mô ngành, tỷ lệ tay nghề
                      cao, và phần ra trường chưa làm được việc; bọc mỗi con số
                      trong một thẻ riêng có viền và nền màu là tách chúng ra
                      đúng lúc cần so sánh. Vạch ngăn dọc mảnh giữ chúng là một
                      bảng.

                      Nguồn, mỗi con số một nguồn khác nhau (bản cũ là ba con số
                      cùng một khảo sát về hiểu biết tài chính - đổi chủ đề thì
                      không còn khảo sát nào phủ cả ba):
                      - 11%: ManpowerGroup, Total Workforce Index, dẫn lại ở
                        news.laodong.vn/cong-doan/3-khoang-trong-cua-nhan-luc-so
                        -tai-viet-nam-1570470.ldo (Malaysia 29%, Philippines
                        18%, Thái Lan 14%).
                      - 7/10: khoảng 30% sinh viên CNTT ra trường làm được việc
                        ngay, 70% còn lại cần 3-6 tháng đào tạo thêm (vneconomy).
                      - 1,2 triệu: số lao động trong 74.000 doanh nghiệp CNTT,
                        theo Bộ Khoa học và Công nghệ.
                      Con số nào đổi thì đổi cả chú thích ở đây. */}
                  <div className="mt-6 grid gap-y-5 border-t border-stone-300/70 pt-5 dark:border-stone-700/70 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-stone-300/70 sm:dark:divide-stone-700/70">
                    <div className="sm:pr-5">
                      <div className="text-[9px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                        {t.home.vision.stat1Label}
                      </div>
                      <div className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        11%
                      </div>
                      <p className="mt-1 text-[11px] leading-snug text-stone-600 dark:text-stone-300">
                        {t.home.vision.stat1Note}
                      </p>
                    </div>
                    <div className="sm:px-5">
                      <div className="text-[9px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">
                        {t.home.vision.stat2Label}
                      </div>
                      <div className="mt-1 text-2xl font-black text-stone-800 dark:text-stone-100">
                        7/10
                      </div>
                      <p className="mt-1 text-[11px] leading-snug text-stone-600 dark:text-stone-300">
                        {t.home.vision.stat2Note}
                      </p>
                    </div>
                    <div className="sm:pl-5">
                      <div className="text-[9px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">
                        {t.home.vision.stat3Label}
                      </div>
                      <div className="mt-1 text-2xl font-black text-stone-800 dark:text-stone-100">
                        1,2 triệu
                      </div>
                      <p className="mt-1 text-[11px] leading-snug text-stone-600 dark:text-stone-300">
                        {t.home.vision.stat3Note}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="rounded-xl border border-emerald-200/70 dark:border-emerald-900/40 bg-gradient-to-b from-emerald-50/50 to-teal-50/30 dark:from-emerald-950/20 dark:to-teal-950/10 p-4 shadow-xs">
                    <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-widest">
                      <span>🇻🇳</span>
                      {t.home.vision.missionLabel}
                    </p>
                    <p className="text-xs leading-relaxed text-stone-700 dark:text-stone-300 font-medium">
                      {t.home.vision.missionBody}
                    </p>
                    <div className="mt-3">
                      <Link
                        href="/login?mode=signup"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-stone-950 px-4 py-2 text-xs font-black text-white transition-colors hover:bg-stone-800 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-500"
                      >
                        {t.home.vision.cta}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>

        {/* ── RICH FOOTER ── */}
        <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 relative z-10 pt-6 pb-6 font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-12 pb-6 border-b border-stone-800">
              {/* Col 1: Brand Info */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2.5">
                  <Logo size={32} />
                  <span className="text-lg font-black tracking-tight text-white">{t.home.brand}</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
                  {t.home.footer.blurb}
                </p>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3 py-1 text-[11px] font-bold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{format(t.home.footer.community, { count: roundedLessonCount() })}</span>
                </div>
              </div>

              {/* Col 2: Lộ trình */}
              <div className="lg:col-span-2 space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-white">{t.home.footer.tracksTitle}</p>
                <ul className="space-y-2 text-xs text-stone-400 font-semibold">
                  <li>
                    <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">{t.home.footer.trackPersonal}</Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">{t.home.footer.trackCorporate}</Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">{t.home.footer.trackCfa}</Link>
                  </li>
                  <li>
                    <Link href="/game" className="hover:text-emerald-400 transition-colors">{t.home.footer.trackGame}</Link>
                  </li>
                </ul>
              </div>

              {/* Col 3: Hệ sinh thái */}
              <div className="lg:col-span-3 space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-white">{t.home.footer.ecoTitle}</p>
                <ul className="space-y-2 text-xs text-stone-400 font-semibold">
                  <li>
                    <Link href="/nhom-hoc" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                      <span>{t.home.footer.ecoStudyRoom}</span>
                      <span className="text-[9px] font-bold text-amber-400 bg-amber-950 px-1.5 py-0.2 rounded-md">{t.home.footer.ecoHot}</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/finsocial" className="hover:text-emerald-400 transition-colors">{t.home.footer.ecoFinsocial}</Link>
                  </li>
                  <li>
                    <Link href="/cua-hang" className="hover:text-emerald-400 transition-colors">{t.home.footer.ecoShop}</Link>
                  </li>
                </ul>
              </div>

              {/* Col 4: Pháp lý & Hỗ trợ */}
              <div className="lg:col-span-2 space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-white">{t.home.footer.supportTitle}</p>
                <ul className="space-y-2 text-xs text-stone-400 font-semibold">
                  <li>
                    <Link href="/dieu-khoan" className="hover:text-emerald-400 transition-colors">{t.home.footer.terms}</Link>
                  </li>
                  <li>
                    <Link href="/chinh-sach-bao-mat" className="hover:text-emerald-400 transition-colors">{t.home.footer.privacy}</Link>
                  </li>
                  <li>
                    <Link href="/login" className="hover:text-emerald-400 transition-colors">{t.home.footer.login}</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Khẩu hiệu chủ quyền. Ngôi sao vẽ bằng SVG chứ không dùng emoji
                ⭐: emoji sao vàng trên nền đỏ render khác nhau tuỳ hệ điều
                hành, và trên Windows nó ra màu cam. */}
            <div className="pt-6 flex justify-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-gradient-to-r from-red-800 to-red-700 px-4 py-2 text-xs font-bold text-white shadow-lg">
                <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 text-yellow-300" fill="currentColor" aria-hidden="true">
                  <path d="m12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.2 5.8 20.9l1.6-7L2 9.2l7.1-.6L12 2Z" />
                </svg>
                {t.home.footer.sovereignty}
              </p>
            </div>

            {/* Bottom copyright line */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 font-semibold">
              <p>{t.home.footer.copyright}</p>
              <p className="flex items-center gap-1 text-[11px] text-stone-400">
                <span>{t.home.footer.tagline}</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
