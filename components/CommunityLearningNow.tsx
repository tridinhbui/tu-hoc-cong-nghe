"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Users } from "lucide-react";
import type { LessonMeta } from "./DashboardClient";
import { getCommunityLearningNow, shortLearnerName, type CommunityLearner } from "@/lib/community-learning";
import { isValidAvatar } from "@/lib/avatar-utils";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

/** Cộng đồng đang học gì, bằng NGƯỜI THẬT.
 *
 *  Khối này tồn tại để thay một loại số cụ thể. Màn hình Học bài hiện "219
 *  người đang học" dưới mỗi thẻ bài, và con số đó là `getIllustrativeCount()`
 *  băm slug bài học ra một số trong khoảng cho trước - chú thích của chính file
 *  đó viết "NOT real telemetry - purely a social-proof visual". Cùng một bài
 *  luôn ra cùng một con số, kể cả khi suốt tuần không ai mở nó.
 *
 *  Ở đây mỗi thẻ là một hàng trong `user_streaks` cộng `user_progress`: một cái
 *  tên có thật, số ngày họ thật sự đã học liền, và bài họ vừa học xong. Đường
 *  đọc phải là RPC vì RLS của `user_profiles` chỉ cho `auth.uid() = id` - xem
 *  lib/community-learning.ts.
 *
 *  KHỐI TỰ ẨN khi không có ai. Đó là điểm khác quan trọng nhất so với con số
 *  bịa: một cộng đồng không ai học thì khối này không hiện, chứ không hiện một
 *  con số trông như có người. */
export default function CommunityLearningNow({ lessonsMeta }: { lessonsMeta: LessonMeta[] }) {
  const { t } = useI18n();
  const [learners, setLearners] = useState<CommunityLearner[] | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  useEffect(() => {
    let cancelled = false;
    // Trần 24 cũ cắt đúng thứ mà dòng phụ đề tuyên bố: nó đếm số dòng trả về,
    // nên một tuần có 40 người giữ chuỗi vẫn đọc ra "24 người học". Dải này
    // cuộn ngang nên số thẻ không bị giới hạn bởi chỗ hiển thị; giới hạn duy
    // nhất còn lại là kích thước phản hồi.
    getCommunityLearningNow(120, 7).then((rows) => {
      if (!cancelled) setLearners(rows);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Thanh cuộn bị ẩn (`scrollbar-none`), nên phải có thứ khác nói rằng còn thẻ
  // ở ngoài khung - không thì một dải cắt ngang trông y như một dải hỏng. Hai
  // vệt mờ chỉ hiện đúng phía còn nội dung: hiện cả hai lúc nào cũng được thì
  // vệt bên phải khi đã cuộn hết lại nói dối theo chiều ngược lại.
  const syncEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft < max - 4 });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncEdges();
    // Không chỉ nghe `scroll`: số thẻ tới sau lần dựng đầu, và chiều rộng khung
    // đổi theo cột của bảng điều khiển. Cả hai đều đổi câu trả lời "còn gì ở
    // ngoài không" mà không sinh ra một sự kiện cuộn nào.
    const observer = new ResizeObserver(syncEdges);
    observer.observe(el);
    for (const child of Array.from(el.children)) observer.observe(child);
    return () => observer.disconnect();
  }, [syncEdges, learners]);

  // `null` là chưa tải xong, `[]` là tải xong và không có ai. Hai trạng thái đó
  // phải khác nhau: gộp lại thì lần dựng đầu tiên nào cũng nháy một khối rỗng.
  if (learners === null || learners.length === 0) return null;

  const lessonById = new Map(lessonsMeta.map((lesson) => [lesson.id, lesson]));

  return (
    <section className="rounded-[22px] bg-white p-4.5 shadow-[0_14px_30px_-26px_rgba(15,23,42,0.18)] ring-1 ring-stone-100/70 dark:bg-stone-900/80 dark:ring-stone-800/60">
      <div className="mb-3 flex items-center gap-2">
        <Users className="h-4.5 w-4.5 text-emerald-500" />
        <div className="min-w-0">
          <h2 className="text-sm font-black uppercase tracking-[0.12em] text-stone-900 dark:text-stone-100">
            {t.communityLearning.title}
          </h2>
          <p className="mt-0.5 text-[11px] font-medium text-stone-500 dark:text-stone-400">
            {learners.length === 1
              ? t.communityLearning.subtitleOne
              : format(t.communityLearning.subtitle, { count: learners.length })}
          </p>
        </div>
      </div>

      <div className="relative">
        {/* `from-white` khớp nền của chính thẻ này, không phải nền trang: hai
            vệt nằm ĐÈ lên dải cuộn, nên chúng phải tan vào mặt thẻ. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-8 rounded-l-[16px] bg-gradient-to-r from-white to-transparent transition-opacity duration-200 dark:from-stone-900 ${
            edges.left ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-8 rounded-r-[16px] bg-gradient-to-l from-white to-transparent transition-opacity duration-200 dark:from-stone-900 ${
            edges.right ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          ref={scrollerRef}
          onScroll={syncEdges}
          className="-mx-1 flex snap-x snap-mandatory gap-2.5 overflow-x-auto overscroll-x-contain px-1 pb-1 scrollbar-none"
        >
        {learners.map((learner) => {
          const lesson = learner.lessonId === null ? undefined : lessonById.get(learner.lessonId);
          const name = shortLearnerName(learner.name, t.communityLearning.anonLearner);
          // Bài học chỉ bấm được khi biết slug. Một hàng có lesson_id mà kho
          // không còn bài đó (bài đã đổi id) thì vẫn hiện người, chỉ không hiện
          // dòng bài - thà thiếu một dòng hơn là một liên kết dẫn tới 404.
          const card = (
            <>
              <div className="flex items-center gap-2">
                {isValidAvatar(learner.avatarUrl) ? (
                  <Image
                    src={learner.avatarUrl}
                    alt={name}
                    width={28}
                    height={28}
                    className="h-7 w-7 shrink-0 rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-900 text-[11px] font-black text-white dark:bg-stone-100 dark:text-stone-900">
                    {name.slice(0, 1).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-stone-900 dark:text-stone-100">{name}</p>
                  <span className="mt-0.5 inline-flex items-center gap-0.5 text-[10px] font-black text-amber-600 dark:text-amber-400">
                    <Flame className="h-3 w-3" />
                    {format(t.communityLearning.streakDays, { days: learner.streak })}
                  </span>
                </div>
              </div>
              {lesson && (
                <div className="mt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    {t.communityLearning.justStudied}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[11px] font-semibold leading-snug text-stone-600 dark:text-stone-300">
                    {lesson.title}
                  </p>
                </div>
              )}
            </>
          );

          const shell =
            "w-[10.5rem] shrink-0 snap-start rounded-[16px] bg-stone-50 p-2.5 dark:bg-stone-950/60";

          return lesson ? (
            <Link
              key={learner.userId}
              href={`/bai-hoc/${lesson.slug}`}
              className={`${shell} transition hover:bg-emerald-50 dark:hover:bg-emerald-950/20`}
            >
              {card}
            </Link>
          ) : (
            <div key={learner.userId} className={shell}>
              {card}
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
