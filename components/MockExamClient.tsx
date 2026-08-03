"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Clock, Flag, Loader2 } from "lucide-react";

/** Bộ chạy bài thi thử, dùng chung cho CFA và FRM.
 *
 *  Viết ra khi FRM cần đúng màn hình này. Chép sang bản thứ hai thì hai bản trôi
 *  khỏi nhau, và cái trôi đi sẽ là cái ít người mở hơn - tức là đúng cái sẽ âm
 *  thầm đếm giờ sai hoặc nộp thiếu câu.
 *
 *  Khác biệt giữa hai kỳ thi nằm trong `ExamConfig`, không nằm trong logic:
 *  CFA Level I là 180 câu chia hai ca 135 phút với ba lựa chọn; FRM Part I là
 *  100 câu một ca 240 phút với bốn lựa chọn. Giữ nguyên con số thật thay vì rút
 *  gọn cho dễ chịu - cả điểm của thi thử là biết mình gãy ở câu bao nhiêu.
 *
 *  Điểm trả về TÁCH THEO MÔN. Tổng điểm chỉ nói đỗ hay trượt; "Market Risk
 *  6/16" mới nói phải học lại cái gì. */

export interface ExamQuestion {
  lessonId: number;
  lessonTitle: string;
  lessonSlug: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  token: string;
  /** Ô môn mà câu này lấp vào. Đường ra đề FRM gắn sẵn, vì một bài có thể thuộc
   *  nhiều môn nên tra ngược từ bài sẽ gán bừa. */
  subjectId?: string;
}

export interface ExamSubjectScore {
  id: string;
  name: string;
  correct: number;
  total: number;
}

export interface ExamSession {
  label: string;
  count: number;
  minutes: number;
}

export interface ExamConfig {
  title: string;
  subtitle: string;
  backHref: string;
  backLabel: string;
  introHeading: string;
  introBlurb: string;
  introFacts: Array<[string, string]>;
  introNote: string;
  sessions: ExamSession[];
  passRatio: number;
  passNote: string;
  /** Số câu cần lấy về, phải bằng tổng các ca. */
  totalQuestions: number;
  fetchUrl: string;
  submitMode: string;
  submitTrack: string;
  scoreBySubject(rows: Array<{ lessonId: number; subjectId?: string; correct: boolean }>): ExamSubjectScore[];
}

type Stage = "intro" | "loading" | "error" | "running" | "break" | "done";

interface Result {
  score: number;
  total: number;
  bySubject: ExamSubjectScore[];
}

function mmss(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return h > 0 ? `${h}:${m}:${sec}` : `${m}:${sec}`;
}

/** Khung trang, khai báo ở TẦNG MODULE.
 *
 *  Định nghĩa nó bên trong thân `MockExamClient` thì mỗi lần render React thấy
 *  một loại component mới và tháo toàn bộ cây con ra dựng lại - ô đang chọn,
 *  vị trí cuộn và tiêu điểm bàn phím mất sạch mỗi giây khi đồng hồ nhích. Đó là
 *  lỗi thật, không phải cảnh báo về phong cách. */
function ExamShell({ config, children }: { config: ExamConfig; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-6 py-4">
          <Link
            href={config.backHref}
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800"
            aria-label={config.backLabel}
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">{config.title}</h1>
            <p className="mt-0.5 text-xs text-stone-500">{config.subtitle}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-6">{children}</div>
    </div>
  );
}

export default function MockExamClient({ config }: { config: ExamConfig }) {
  const [stage, setStage] = useState<Stage>("intro");
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [flags, setFlags] = useState<boolean[]>([]);
  const [session, setSession] = useState(0);
  const [active, setActive] = useState(0);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [result, setResult] = useState<Result | null>(null);
  const [errorText, setErrorText] = useState("");
  const submitting = useRef(false);

  /** Câu đầu của mỗi ca, cộng dồn - các ca có thể khác độ dài. */
  const sessionStarts = useMemo(() => {
    const out: number[] = [];
    let n = 0;
    for (const s of config.sessions) {
      out.push(n);
      n += s.count;
    }
    return out;
  }, [config.sessions]);

  const sessionStart = sessionStarts[session] ?? 0;
  const sessionEnd = Math.min(sessionStart + (config.sessions[session]?.count ?? 0), questions.length);
  const lastSession = session + 1 >= config.sessions.length;

  const start = async () => {
    setStage("loading");
    try {
      const res = await fetch(config.fetchUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list: ExamQuestion[] = data.questions ?? [];
      if (list.length === 0) throw new Error("Không lấy được câu hỏi nào");
      setQuestions(list);
      setAnswers(new Array(list.length).fill(null));
      setFlags(new Array(list.length).fill(false));
      setSession(0);
      setActive(0);
      setDeadline(Date.now() + config.sessions[0].minutes * 60_000);
      setStage("running");
    } catch (e) {
      setErrorText(e instanceof Error ? e.message : "Lỗi không rõ");
      setStage("error");
    }
  };

  const finish = useCallback(async () => {
    // Chặn nộp hai lần: hết giờ và bấm "Nộp bài" có thể xảy ra trong cùng một
    // khoảnh khắc, và lần nộp thứ hai sẽ ghi thêm một phiên rỗng.
    if (submitting.current) return;
    submitting.current = true;
    setStage("loading");

    // Câu bỏ trống vẫn gửi lên với một lựa chọn không tồn tại: server chấm theo
    // token nên nó tính là sai, và nhờ vậy tổng số câu trong báo cáo đúng bằng
    // số câu của đề chứ không chỉ đếm những câu đã trả lời.
    const payload = questions.map((q, i) => ({ token: q.token, selected: answers[i] ?? -1 }));
    let score = 0;
    try {
      const res = await fetch("/api/knowledge-challenge/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: config.submitMode,
          track: config.submitTrack,
          difficulty: "tat-ca",
          answers: payload,
        }),
      });
      const data = await res.json();
      score = typeof data.score === "number" ? data.score : 0;
    } catch {
      // Máy chủ không chấm được thì vẫn phải trả kết quả cho người vừa ngồi
      // mấy tiếng: chấm tại chỗ theo `correct` đã gửi kèm từng câu.
      score = questions.reduce((n, q, i) => n + (answers[i] === q.correct ? 1 : 0), 0);
    }

    setResult({
      score,
      total: questions.length,
      bySubject: config.scoreBySubject(
        questions.map((q, i) => ({
          lessonId: q.lessonId,
          subjectId: q.subjectId,
          correct: answers[i] === q.correct,
        }))
      ),
    });
    setStage("done");
  }, [questions, answers, config]);

  const nextSession = useCallback(() => {
    if (lastSession) {
      void finish();
      return;
    }
    const next = session + 1;
    setSession(next);
    setActive(sessionStarts[next]);
    setDeadline(Date.now() + config.sessions[next].minutes * 60_000);
    setStage("running");
  }, [session, lastSession, sessionStarts, config.sessions, finish]);

  /** Nhịp giây cho đồng hồ, kiêm luôn việc hết giờ.
   *
   *  Hai việc ở CHUNG một chỗ chứ không tách thành một effect thứ hai theo dõi
   *  `now`: effect đó sẽ gọi setState ngay trong thân nó mỗi giây, tức render
   *  xong lại kích hoạt render tiếp. Trong callback của interval thì setState là
   *  bình thường - đó là tín hiệu từ một hệ thống bên ngoài.
   *
   *  Hết giờ thì tự chuyển ca, không hỏi. Đó là điều đề thi thật làm. */
  useEffect(() => {
    if (stage !== "running") return;
    const timer = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (deadline === null || t < deadline) return;
      if (lastSession) void finish();
      else setStage("break");
    }, 1000);
    return () => window.clearInterval(timer);
  }, [stage, deadline, lastSession, finish]);

  const answeredInSession = useMemo(
    () => answers.slice(sessionStart, sessionEnd).filter((a) => a !== null).length,
    [answers, sessionStart, sessionEnd]
  );

  const pick = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[active] = optionIndex;
      return next;
    });
  };

  if (stage === "loading") {
    return (
      <ExamShell config={config}>
        <div className="flex flex-col items-center gap-3 py-24 text-stone-500 dark:text-stone-400">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-sm font-medium">Đang chuẩn bị đề…</p>
        </div>
      </ExamShell>
    );
  }

  if (stage === "error") {
    return (
      <ExamShell config={config}>
        <div className="py-20 text-center">
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
            Không mở được đề thi thử.
          </p>
          <p className="mt-1 text-xs text-stone-500">{errorText}</p>
          <button
            type="button"
            onClick={() => setStage("intro")}
            className="mt-5 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-bold text-white dark:bg-stone-100 dark:text-stone-900"
          >
            Thử lại
          </button>
        </div>
      </ExamShell>
    );
  }

  if (stage === "intro") {
    return (
      <ExamShell config={config}>
        <div className="mx-auto max-w-xl py-10">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {config.introHeading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            {config.introBlurb}
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-3">
            {config.introFacts.map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-stone-200 p-4 dark:border-stone-800">
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
                  {k}
                </dt>
                <dd className="mt-1 text-sm font-bold text-stone-900 dark:text-stone-100">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 rounded-2xl bg-stone-100 p-4 text-xs leading-relaxed text-stone-600 dark:bg-stone-900 dark:text-stone-400">
            {config.introNote}
          </p>
          <button
            type="button"
            onClick={start}
            className="mt-6 w-full rounded-2xl bg-stone-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
          >
            Bắt đầu {config.sessions[0].label.toLowerCase()}
          </button>
        </div>
      </ExamShell>
    );
  }

  if (stage === "break") {
    const done = answers.slice(sessionStart, sessionEnd).filter((a) => a !== null).length;
    return (
      <ExamShell config={config}>
        <div className="mx-auto max-w-md py-20 text-center">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            Hết {config.sessions[session].label.toLowerCase()}
          </h2>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Đã trả lời {done}/{sessionEnd - sessionStart} câu. Ngày thi thật bạn được nghỉ giữa hai
            ca - nghỉ đủ rồi hãy bấm.
          </p>
          <button
            type="button"
            onClick={nextSession}
            className="mt-6 rounded-2xl bg-stone-900 px-6 py-3 text-sm font-bold text-white dark:bg-stone-100 dark:text-stone-900"
          >
            Vào {config.sessions[session + 1]?.label.toLowerCase() ?? "phần tiếp"}
          </button>
        </div>
      </ExamShell>
    );
  }

  if (stage === "done" && result) {
    const ratio = result.total > 0 ? result.score / result.total : 0;
    const passed = ratio >= config.passRatio;
    return (
      <ExamShell config={config}>
        <div className="mx-auto max-w-xl py-10">
          <div
            className={`rounded-3xl border-2 p-6 text-center ${
              passed
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                : "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
            }`}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Kết quả thi thử
            </p>
            <p className="mt-2 text-4xl font-black tabular-nums text-stone-900 dark:text-stone-100">
              {result.score}/{result.total}
            </p>
            <p className="mt-1 text-sm font-bold text-stone-700 dark:text-stone-300">
              {(ratio * 100).toFixed(1)}%
            </p>
            <p className="mt-3 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
              {passed
                ? `Trên ngưỡng ${Math.round(config.passRatio * 100)}%.`
                : `Dưới ngưỡng ${Math.round(config.passRatio * 100)}%.`}{" "}
              {config.passNote}
            </p>
          </div>

          <h3 className="mt-8 text-sm font-bold text-stone-900 dark:text-stone-100">Điểm theo môn</h3>
          <div className="mt-3 space-y-2">
            {result.bySubject.map((s) => {
              const pct = s.total > 0 ? (s.correct / s.total) * 100 : 0;
              return (
                <div key={s.id} className="flex items-center gap-3">
                  <span
                    className="w-40 shrink-0 truncate text-xs font-medium text-stone-700 dark:text-stone-300 sm:w-56"
                    title={s.name}
                  >
                    {s.name}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
                    <div
                      className={`h-full rounded-full ${
                        pct >= 70 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-rose-500"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-14 shrink-0 text-right text-xs font-bold tabular-nums text-stone-600 dark:text-stone-400">
                    {s.correct}/{s.total}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex gap-3">
            <Link
              href={config.backHref}
              className="flex-1 rounded-2xl border border-stone-300 px-5 py-3 text-center text-sm font-bold text-stone-700 dark:border-stone-700 dark:text-stone-300"
            >
              {config.backLabel}
            </Link>
            <button
              type="button"
              onClick={() => {
                submitting.current = false;
                setResult(null);
                setStage("intro");
              }}
              className="flex-1 rounded-2xl bg-stone-900 px-5 py-3 text-sm font-bold text-white dark:bg-stone-100 dark:text-stone-900"
            >
              Thi lại
            </button>
          </div>
        </div>
      </ExamShell>
    );
  }

  const q = questions[active];
  if (!q) return null;
  const left = deadline === null ? 0 : deadline - now;

  return (
    <ExamShell config={config}>
      <div className="mx-auto max-w-2xl pb-32">
        <div className="sticky top-0 z-10 -mx-6 flex items-center justify-between gap-3 border-b border-stone-200 bg-white/90 px-6 py-3 backdrop-blur dark:border-stone-800 dark:bg-stone-950/90">
          <span className="text-xs font-bold text-stone-500">
            {config.sessions[session].label} · câu {active - sessionStart + 1}/
            {sessionEnd - sessionStart}
          </span>
          <span
            className={`flex items-center gap-1.5 font-mono text-sm font-bold tabular-nums ${
              left < 5 * 60_000 ? "text-rose-500" : "text-stone-700 dark:text-stone-300"
            }`}
          >
            <Clock className="h-4 w-4" />
            {mmss(left)}
          </span>
        </div>

        <p className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-stone-400">
          {q.lessonTitle}
        </p>
        <h2 className="mt-1.5 text-base font-bold leading-relaxed text-stone-900 dark:text-stone-100">
          {q.question}
        </h2>

        <div className="mt-5 space-y-2.5">
          {q.options.map((opt, i) => {
            const chosen = answers[active] === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => pick(i)}
                className={`w-full rounded-2xl border-2 px-4 py-3.5 text-left text-sm leading-relaxed transition ${
                  chosen
                    ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                    : "border-stone-200 text-stone-700 hover:border-stone-400 dark:border-stone-800 dark:text-stone-300"
                }`}
              >
                <span className="mr-2 font-bold">{"ABCDE"[i]}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Không hiện đáp án đúng giữa chừng: đề thi thật không hiện, và biết
            ngay mình vừa sai sẽ đổi cách làm những câu sau. */}
        <div className="mt-6 flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setFlags((prev) => {
                const next = [...prev];
                next[active] = !next[active];
                return next;
              })
            }
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition ${
              flags[active]
                ? "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                : "border-stone-300 text-stone-500 dark:border-stone-700"
            }`}
          >
            <Flag className="h-3.5 w-3.5" />
            {flags[active] ? "Đã đánh dấu" : "Đánh dấu xem lại"}
          </button>
          <span className="text-xs text-stone-400">
            {answeredInSession}/{sessionEnd - sessionStart} câu đã trả lời
          </span>
        </div>

        {/* Bảng nhảy câu. Đề thi thật cho quay lại câu bất kỳ trong cùng ca, nên
            ở đây cũng vậy - và nó là chỗ duy nhất thấy được mình còn bỏ trống
            bao nhiêu câu. */}
        <div className="mt-8 grid grid-cols-10 gap-1.5">
          {Array.from({ length: sessionEnd - sessionStart }, (_, i) => {
            const idx = sessionStart + i;
            const state = answers[idx] !== null;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActive(idx)}
                aria-label={`Câu ${i + 1}`}
                className={`relative h-8 rounded-lg text-[11px] font-bold tabular-nums transition ${
                  idx === active
                    ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                    : state
                      ? "bg-stone-300 text-stone-700 dark:bg-stone-700 dark:text-stone-200"
                      : "bg-stone-100 text-stone-400 dark:bg-stone-900"
                }`}
              >
                {i + 1}
                {flags[idx] && (
                  <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-stone-200 bg-white/95 px-6 py-3 backdrop-blur dark:border-stone-800 dark:bg-stone-950/95">
        <div className="mx-auto flex max-w-2xl items-center gap-3 pb-[env(safe-area-inset-bottom)]">
          <button
            type="button"
            disabled={active <= sessionStart}
            onClick={() => setActive((a) => Math.max(sessionStart, a - 1))}
            className="rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-bold text-stone-600 disabled:opacity-30 dark:border-stone-700 dark:text-stone-400"
          >
            Trước
          </button>
          {active + 1 < sessionEnd ? (
            <button
              type="button"
              onClick={() => setActive((a) => a + 1)}
              className="flex-1 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-bold text-white dark:bg-stone-100 dark:text-stone-900"
            >
              Câu tiếp
            </button>
          ) : (
            <button
              type="button"
              onClick={() => (lastSession ? void finish() : setStage("break"))}
              className="flex-1 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-500"
            >
              {lastSession ? "Nộp bài" : `Kết thúc ${config.sessions[session].label.toLowerCase()}`}
            </button>
          )}
        </div>
      </div>
    </ExamShell>
  );
}
