"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Award, CalendarDays, CheckCircle2, Compass, Flame, HelpCircle, ListChecks, ShieldAlert } from "lucide-react";
import { getDashboardGreetingAction } from "@/app/(app)/dashboard/actions";
import { saveLearningPathPrefs } from "@/app/(app)/lo-trinh/actions";
import { getLessonShortTitle } from "@/lib/lesson-labels";
import { useI18n } from "@/lib/i18n/context";
import {
  DEFAULT_PACE,
  MEDIAN_LESSON_MINUTES,
  finishDate,
  readPace,
  weeksFor,
  writePace,
  type Pace,
} from "@/lib/learning-pace";
import { format, intlLocale } from "@/lib/i18n";
import type { StageTopicId } from "@/lib/stage-topics";

type Track = "personal" | "professional";

/** Trung vị `totalMinutes` của cả kho, đo lúc viết trang này (n=722, khoảng
 *  4-11). Một con số đo được giữ được lòng tin; "nhẹ nhàng thôi" thì không.
 *  lib/__tests__/learning-path-claims.test.ts neo nó lại. */
// Nhịp và phép tính đi kèm nằm ở lib/learning-pace.ts: khối tóm tắt trên
// /hoc-bai đọc cùng khoá và in cùng câu "còn N bài, khoảng M tuần", nên hai
// bản sao của công thức sẽ lệch nhau mà không có gì báo.

/**
 * Thứ tự các phần là thứ tự câu hỏi trong đầu người mới, không phải thứ tự
 * logic của sản phẩm.
 *
 * Bản đầu đặt "hôm nay làm gì" ở phần thứ NĂM, sau khi đã giải thích lộ trình,
 * nhịp học và ba bước. Người đang bối rối thì câu duy nhất họ cần ngay là "vậy
 * giờ tôi bấm vào đâu" - để nó ở đáy nghĩa là bắt họ đọc hết bốn phần lý thuyết
 * trước khi được trả lời. Nên nó lên đầu, và mọi thứ khác xuống dưới nó.
 */
export default function LearningPathClient({
  counts,
  done,
  userId,
  topicEntry,
  savedTrack,
  savedPace,
}: {
  counts: Record<Track, number>;
  done: Record<Track, number>;
  userId: string;
  topicEntry: Record<Track, Partial<Record<StageTopicId, { slug: string; title: string }>>>;
  savedTrack: Track | null;
  savedPace: Pace | null;
}) {
  const { t, locale } = useI18n();
  const p = t.learningPath;

  // Giá trị từ server là trạng thái ban đầu, không phải giá trị chờ effect.
  // Dựng bằng "personal" rồi để một effect sửa lại sau khi hydrate nghĩa là ai
  // đã chọn Nghề tài chính vẫn thấy Tiền của tôi sáng lên trong một nhịp - và
  // trên kết nối chậm thì nhịp ấy đủ dài để bấm nhầm.
  const [track, setTrack] = useState<Track>(savedTrack ?? "personal");
  const [pace, setPace] = useState<Pace>(savedPace ?? DEFAULT_PACE);
  const [greeting, setGreeting] = useState<Awaited<ReturnType<typeof getDashboardGreetingAction>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<"idle" | "saved" | "failed">("idle");
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // localStorage chỉ còn là đường DỰ PHÒNG, cho tài khoản có lựa chọn từ
    // trước khi hai cột kia tồn tại. Server thắng khi cả hai cùng có: nó là thứ
    // theo được người dùng sang máy khác.
    if (savedTrack === null) {
      const local = window.localStorage.getItem("activeTrack");
      if (local === "professional" || local === "personal") setTrack(local);
    }
    if (savedPace === null) setPace(readPace());
    setToday(new Date());
  }, [savedTrack, savedPace]);

  /** Ghi lên server, và nói thật kết quả.
   *
   *  Trước đây mọi thay đổi ghi thẳng localStorage rồi im lặng. Viên nhịp đổi
   *  màu ngay dù việc ghi có thành công hay không, nên một lần lưu hỏng trông
   *  y hệt một lần lưu được - triệu chứng duy nhất là lần sau mở lại thấy nhịp
   *  cũ, mà lúc đó không còn gì để lần ra nguyên nhân. */
  const persist = (input: Parameters<typeof saveLearningPathPrefs>[0]) => {
    setSaveState("idle");
    saveLearningPathPrefs(input)
      .then((r) => setSaveState(r.ok ? "saved" : "failed"))
      .catch(() => setSaveState("failed"));
  };

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getDashboardGreetingAction(userId, track)
      .then((r) => alive && setGreeting(r))
      .catch(() => alive && setGreeting(null))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [userId, track]);

  /** Ghi CẢ HAI khoá, như DashboardClient.setActiveTrack.
   *
   *  Dashboard đọc `activeTrack` để chọn chặng nào hiện và `activeDashboardTab`
   *  để chọn thẻ track nào sáng lên. Ghi một mà quên cái kia thì màn hình tự
   *  mâu thuẫn - chặng chuyên ngành dưới một thẻ "Cá nhân" đang sáng - và
   *  comment ở DashboardClient ghi rõ onboarding từng là đúng một cái ghi
   *  thiếu như thế. */
  const pickTrack = (next: Track) => {
    setTrack(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("activeTrack", next);
      window.localStorage.setItem("activeDashboardTab", next);
    }
    persist({ track: next });
  };

  const savePace = (next: Pace) => {
    setPace(next);
    writePace(next);
    persist({ perDay: next.perDay, daysPerWeek: next.daysPerWeek });
  };

  const total = counts[track];
  const remaining = Math.max(0, total - done[track]);
  const weeks = weeksFor(remaining, pace.perDay, pace.daysPerWeek);
  const nextLesson = greeting?.nextLesson ?? null;
  const gaps = greeting?.topicGapSummary ?? [];
  // Mốc "hôm nay" lấy SAU KHI mount, không phải lúc dựng.
  //
  // "use client" không có nghĩa là chỉ chạy ở client: component vẫn được dựng
  // một lần ở server để ra HTML đầu tiên. Gọi `new Date()` thẳng trong thân
  // hàm nghĩa là server dùng giờ server còn client dùng giờ máy người đọc, và
  // ở ranh giới tháng hai bên ra hai chuỗi khác nhau - React báo lệch hydrate,
  // và thứ hỏng là một dòng chữ không ai ngờ tới.
  //
  // `null` cho tới khi mount xong, nên lần dựng ở server và lần dựng đầu ở
  // client cho ra cùng một kết quả: không có dòng nào.
  const finishAt = today ? finishDate(remaining, pace, today) : null;

  return (
    // pb-28 chứ không pb-8: ConnectMenu là một nút tròn `fixed bottom-6` cao
    // 56px, mount toàn app từ app/layout.tsx. Nội dung chạy sát đáy thì thẻ
    // cuối nằm dưới nó, và trên màn hình hẹp cái bị che là đúng phần "chủ đề
    // yếu nhất" - phần vừa được cho link để bấm.
    <div className="mx-auto max-w-2xl space-y-4 px-4 pt-8 pb-28">
      <header className="space-y-1.5">
        {/* Lối ra. Trang này là một trang riêng chứ không phải tab dashboard,
            nên không có gì đưa người dùng về ngoài nút Back của trình duyệt -
            mà vào đây bằng cách bấm thẻ trên dashboard thì Back là thao tác
            người ta phải NGHĨ ra, không phải thao tác nhìn thấy. */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
        >
          <ArrowLeft className="h-4 w-4" />
          {p.backToDashboard}
        </Link>
        <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100">{p.title}</h1>
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">{p.subtitle}</p>
      </header>

      {/* Mục lục. Sáu khối, và người quay lại lần thứ hai gần như luôn chỉ muốn
          sửa nhịp - trước đây họ phải cuộn qua bốn khối để tới đó.

          Dùng <a href="#..."> chứ không phải <Link>: đây là nhảy trong cùng
          một trang, và next/link sẽ chạy qua router cho một việc mà trình duyệt
          làm sẵn tốt hơn - kèm cả `scroll-margin` khi quay lại bằng nút Back. */}
      <nav aria-label={p.tocTitle} className="rounded-2xl border border-stone-200 bg-white p-3.5 dark:border-stone-800 dark:bg-stone-900">
        <p className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">
          {p.tocTitle}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[
            ["pick", p.stepPickTitle],
            ["pace", p.stepPaceTitle],
            ["how", p.stepHowTitle],
            ["worry", p.stepWorryTitle],
            ["check", p.stepCheckTitle],
            ["adjust", p.stepAdjustTitle],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-lg border border-stone-200 px-2.5 py-1 text-xs font-bold text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Câu trả lời trước tiên: mỗi ngày 6 phút, và hôm nay là bài này. */}
      <section className="rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-5 dark:border-emerald-900 dark:from-emerald-950/40 dark:to-stone-900">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 shrink-0 text-orange-500" />
          <p className="text-xl font-black text-stone-900 dark:text-stone-100">{p.heroMinutes}</p>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">{p.heroBody}</p>

        <div className="mt-4 rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
          {loading ? (
            <p className="text-sm text-stone-500 dark:text-stone-400">{p.heroLoading}</p>
          ) : !nextLesson ? (
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">{p.heroNoLesson}</p>
          ) : (
            <>
              <p className="text-xs font-bold text-stone-500 dark:text-stone-400">{p.heroTodayLabel}</p>
              <p className="mt-1 text-base font-bold leading-snug text-stone-900 dark:text-stone-100">
                {getLessonShortTitle({ title: nextLesson.title })}
              </p>
              <Link
                href={`/bai-hoc/${nextLesson.slug}`}
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
              >
                {p.heroOpen} <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>
      </section>

      <Card id="pick" icon={<Compass className="h-4 w-4" />} title={p.stepPickTitle} hint={p.stepPickHint}>
        <div className="grid gap-3 sm:grid-cols-2">
          {(["personal", "professional"] as const).map((id) => {
            const picked = track === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => pickTrack(id)}
                aria-pressed={picked}
                className={`cursor-pointer rounded-2xl border p-4 text-left transition-all ${
                  picked
                    ? "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40"
                    : "border-stone-200 bg-white hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-base font-black text-stone-900 dark:text-stone-100">
                    {id === "personal" ? p.trackPersonalName : p.trackProfessionalName}
                  </span>
                  {picked && <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {id === "personal" ? p.trackPersonalFor : p.trackProfessionalFor}
                </p>
                {/* Thẻ ĐANG CHỌN đếm số bài còn lại, thẻ kia đếm tổng.
                    Trước đây cả hai đếm tổng, nên thẻ đang chọn ghi "137 bài ·
                    khoảng 28 tuần" ngay phía trên ô ước lượng ghi "còn 97 bài ·
                    khoảng 20 tuần". Hai con số đúng theo hai cách đo khác nhau,
                    đặt cách nhau ba dòng, không cái nào nói mình đang đo gì.

                    Thẻ CHƯA chọn vẫn dùng tổng, và đó không phải cẩu thả: câu
                    hỏi ở đó là "hướng này to cỡ nào", không phải "tôi còn bao
                    nhiêu" - người đọc chưa học bài nào của nó. */}
                <p className="mt-3 text-xs font-bold text-stone-500 dark:text-stone-400">
                  {picked
                    ? format(p.trackLessonsLeft, { count: Math.max(0, counts[id] - done[id]) })
                    : format(p.trackLessons, { count: counts[id] })}{" "}
                  ·{" "}
                  {format(p.trackTime, {
                    weeks: weeksFor(
                      picked ? Math.max(0, counts[id] - done[id]) : counts[id],
                      pace.perDay,
                      pace.daysPerWeek,
                    ),
                  })}
                </p>
                {/* Thẻ đã chọn: một nhãn trạng thái. Thẻ chưa chọn: một viên
                    trông bấm được.

                    Cả hai từng là cùng một dòng chữ xanh đậm, tức "Chọn hướng
                    này" đọc như một liên kết nằm trong thẻ - nhưng nó không
                    phải, cả thẻ mới là nút. Người dùng nhắm vào đúng mấy chữ đó
                    thì vẫn trúng, nên lỗi này không bao giờ lộ ra thành khiếu
                    nại; nó chỉ làm chỗ bấm trông nhỏ hơn thực tế. */}
                {picked ? (
                  <p className="mt-2 text-xs font-black text-emerald-700 dark:text-emerald-400">{p.trackPicked}</p>
                ) : (
                  <span className="mt-2 inline-flex rounded-lg border border-stone-300 px-2.5 py-1 text-xs font-bold text-stone-700 dark:border-stone-700 dark:text-stone-300">
                    {p.trackPick}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {track === "professional" && (
          <p className="mt-3 rounded-xl border-l-2 border-amber-400 bg-amber-50 p-3 text-sm leading-relaxed text-stone-700 dark:bg-amber-950/30 dark:text-stone-300">
            {p.proNote}
          </p>
        )}

        {/* CFA và FRM, dưới một tiêu đề riêng và KHÔNG phải thẻ chọn được.
            Navbar coi chúng là lối học song song, còn trang này - trang duy
            nhất trả lời "học gì" - trước đây không nhắc tới chúng một chữ, nên
            người mới đọc xong tưởng cả app chỉ có hai đường.

            Không cho chúng vào dãy chọn phía trên: `pickTrack` ghi
            `activeTrack`, mà dashboard đọc đúng khoá đó để chọn chặng nào hiện.
            Nhét "cfa" vào đấy là đưa một giá trị mà dashboard không biết đọc
            vào một khoá dùng chung - đúng loại bẫy mà DASHBOARD_TABS đã để lại
            một lần rồi. Chúng là hai ĐƯỜNG DẪN, nên chúng là hai link. */}
        <div className="mt-5 border-t border-stone-200 pt-4 dark:border-stone-800">
          <p className="text-sm font-bold text-stone-800 dark:text-stone-200">{p.parallelTitle}</p>
          <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{p.parallelHint}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              { href: "/cfa", icon: Award, name: p.parallelCfaName, desc: p.parallelCfaFor },
              { href: "/frm", icon: ShieldAlert, name: p.parallelFrmName, desc: p.parallelFrmFor },
            ].map(({ href, icon: Icon, name, desc }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-start gap-2.5 rounded-xl border border-stone-200 bg-white p-3 transition-colors hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-600"
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-stone-500 dark:text-stone-400" />
                <span className="min-w-0">
                  <span className="flex items-center gap-1 text-sm font-bold text-stone-900 dark:text-stone-100">
                    {name}
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                    {desc}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Card>

      <Card id="pace" icon={<CalendarDays className="h-4 w-4" />} title={p.stepPaceTitle} hint={p.stepPaceHint}>
        <div className="flex flex-wrap gap-5">
          <Field label={p.paceLessonsPerDay}>
            {([1, 2] as const).map((n) => (
              <Pill key={n} active={pace.perDay === n} onClick={() => savePace({ ...pace, perDay: n })}>
                {n === 1 ? p.paceOne : p.paceTwo}
              </Pill>
            ))}
          </Field>
          <Field label={p.paceDaysPerWeek}>
            {[3, 4, 5, 6, 7].map((d) => (
              <Pill key={d} active={pace.daysPerWeek === d} onClick={() => savePace({ ...pace, daysPerWeek: d })}>
                {format(p.paceDays, { days: d })}
              </Pill>
            ))}
          </Field>
        </div>
        <div className="mt-4 rounded-xl bg-stone-50 p-3.5 dark:bg-stone-950/50">
          <p className="text-sm font-bold text-stone-800 dark:text-stone-200">
            {format(p.paceEstimate, { count: remaining, weeks })}
          </p>
          <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
            {format(p.paceMinutes, { minutes: pace.perDay * MEDIAN_LESSON_MINUTES })}
          </p>
          {/* Một ngày cụ thể, cạnh con số tuần. "Khoảng 28 tuần" đòi người đọc
              tự mở lịch ra cộng; phần lớn sẽ không cộng, và con số ấy trôi qua
              mà không neo vào đâu cả.

              Giữ CẢ HAI chứ không thay: số tuần là thứ so sánh được giữa hai
              hướng học ngay trên màn hình này, còn ngày thì không - hai hướng
              cùng "xong khoảng tháng 3" không nói được cái nào ngắn hơn.

              Ngày đi qua intlLocale, không phải "vi-VN" viết cứng: bản tiếng
              Anh dùng en-GB để giữ thứ tự ngày trước tháng, nếu không thì 03/04
              đổi nghĩa giữa hai ngôn ngữ mà không ai thấy. */}
          {finishAt && (
            <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
              {format(p.paceFinishBy, {
                date: finishAt.toLocaleDateString(intlLocale(locale), { month: "long", year: "numeric" }),
              })}
            </p>
          )}
        </div>
        {/* Trạng thái ghi. Viên nhịp đổi màu ngay khi bấm, và màu ấy chỉ nói
            "đang chọn" chứ không nói "đã lưu" - hai chuyện khác nhau kể từ khi
            nhịp đi lên server. */}
        {saveState !== "idle" && (
          <p
            role="status"
            className={`mt-2 text-xs font-bold ${
              saveState === "saved"
                ? "text-emerald-700 dark:text-emerald-400"
                : "text-rose-700 dark:text-rose-400"
            }`}
          >
            {saveState === "saved" ? p.paceSaved : p.paceSaveFailed}
          </p>
        )}
        <Disclosure question={p.paceWarnTitle} answer={p.paceWarnBody} />
      </Card>

      <Card id="how" icon={<ListChecks className="h-4 w-4" />} title={p.stepHowTitle}>
        <ol className="space-y-3.5">
          {[
            [p.howReadTitle, p.howReadBody],
            [p.howQuizTitle, p.howQuizBody],
            [p.howPracticeTitle, p.howPracticeBody],
          ].map(([title, body], i) => (
            <li key={title} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-stone-800 text-xs font-black text-white dark:bg-stone-700">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      {/* Trả lời cả điều họ chưa hỏi nhưng đang lo. */}
      <Card id="worry" icon={<HelpCircle className="h-4 w-4" />} title={p.stepWorryTitle}>
        <div className="space-y-1">
          <Disclosure question={p.worrySkipQ} answer={p.worrySkipA} />
          <Disclosure question={p.worrySlowQ} answer={p.worrySlowA} />
          <Disclosure question={p.worryWrongQ} answer={p.worryWrongA} />
        </div>
      </Card>

      <Card id="check" icon={<CheckCircle2 className="h-4 w-4" />} title={p.stepCheckTitle}>
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">{p.stepCheckBody}</p>
        <p className="mt-4 text-sm font-bold text-stone-800 dark:text-stone-200">{p.weekRhythmTitle}</p>
        <ul className="mt-1.5 space-y-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          <li>· {format(p.weekStudy, { days: Math.max(1, pace.daysPerWeek - 1) })}</li>
          <li>· {p.weekReview}</li>
          <li>· {p.weekRest}</li>
        </ul>
      </Card>

      <Card id="adjust" icon={<Flame className="h-4 w-4" />} title={p.stepAdjustTitle}>
        {loading ? (
          <p className="text-sm text-stone-500 dark:text-stone-400">{p.adjustLoading}</p>
        ) : !nextLesson ? (
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">{p.adjustNoData}</p>
        ) : (
          <div className="space-y-3.5">
            <p className="text-sm font-bold text-stone-800 dark:text-stone-200">
              {format(p.adjustProgress, { done: done[track], total })}
            </p>
            {/* Hai <div> trần không nói gì với trình đọc màn hình, mà đây là
                con số chính của cả trang: dòng chữ ngay trên nó ghi "đã học X
                trên Y", còn thanh này thì hoàn toàn im lặng. `aria-valuenow`
                cho nó tiếng nói, và `aria-label` nói con số đó là gì. */}
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={done[track]}
              aria-label={format(p.progressAria, { done: done[track], total })}
              className="h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800"
            >
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${total > 0 ? Math.round((done[track] / total) * 100) : 0}%` }}
              />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-800 dark:text-stone-200">{p.adjustWeakest}</p>
              {gaps.length === 0 ? (
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{p.adjustEmptyGaps}</p>
              ) : (
                <>
                  {/* Mỗi viên dẫn thẳng tới bài CHƯA HỌC đầu tiên của chủ đề
                      đó. Trước đây chúng là <span>: đỏ, nổi bật, bấm không
                      được. Đây là phần duy nhất trên trang nói về điểm yếu của
                      riêng người đọc, và nó là phần duy nhất không có đường đi
                      tiếp - nêu vấn đề rồi để họ tự đi tìm.

                      Chủ đề không tra được bài nào thì vẫn là <span>, không
                      phải một link chết. Xảy ra khi mọi bài của chủ đề đó đã
                      học xong mà điểm vẫn còn yếu - lúc ấy thứ cần là ôn lại,
                      không phải một bài mới, và trang chưa có chỗ nào làm việc
                      đó nên nói ít hơn là đúng hơn. */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {gaps.map((g: { topicId: StageTopicId; count: number }) => {
                      const entry = topicEntry[track]?.[g.topicId];
                      const chip =
                        "rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300";
                      return entry ? (
                        <Link
                          key={g.topicId}
                          href={`/bai-hoc/${entry.slug}`}
                          title={`${p.adjustWeakestOpen}: ${entry.title}`}
                          className={`${chip} inline-flex items-center gap-1 transition-colors hover:border-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/40`}
                        >
                          {t.topics[g.topicId]}
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      ) : (
                        <span key={g.topicId} className={chip}>
                          {t.topics[g.topicId]}
                        </span>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                    {p.adjustWeakestHint}
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function Card({
  id,
  icon,
  title,
  hint,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    // `scroll-mt-6` để tiêu đề khối không dính sát mép trên sau khi nhảy neo -
    // không có nó thì dòng chữ đầu tiên nằm đúng ranh giới khung nhìn và đọc
    // như bị cắt.
    <section id={id} className="scroll-mt-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
          {icon}
        </span>
        <h2 className="text-base font-black text-stone-900 dark:text-stone-100">{title}</h2>
      </div>
      {hint && <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{hint}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold text-stone-500 dark:text-stone-400">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`cursor-pointer rounded-full px-3.5 py-2 text-sm font-bold transition-colors ${
        active
          ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
          : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300"
      }`}
    >
      {children}
    </button>
  );
}

/** Câu hỏi mở ra câu trả lời. Dùng `details` của trình duyệt thay vì state:
 *  không cần JavaScript, đọc được bằng trình đọc màn hình, và câu hỏi vẫn thấy
 *  được khi đóng - nên người học biết ở đây có gì mà không phải mở ra. */
function Disclosure({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-stone-100 py-2.5 last:border-0 dark:border-stone-800">
      <summary className="cursor-pointer list-none text-sm font-bold text-stone-800 marker:content-none dark:text-stone-200">
        <span className="mr-1.5 inline-block text-stone-400 transition-transform group-open:rotate-90">›</span>
        {question}
      </summary>
      <p className="mt-2 pl-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{answer}</p>
    </details>
  );
}
