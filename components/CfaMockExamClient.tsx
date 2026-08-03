"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Clock, Flag, Loader2 } from "lucide-react";
import { CFA_EXAM, scoreBySubject, type SubjectScore } from "@/lib/cfa-exam";

/** Bài thi thử CFA Level I, đúng khuôn đề thật: 180 câu, hai ca 135 phút, ba
 *  lựa chọn mỗi câu.
 *
 *  Giữ nguyên con số thật thay vì một bản rút gọn cho dễ chịu. Cả điểm của thi
 *  thử là biết mình chịu được bao lâu và hết giờ ở câu bao nhiêu - rút xuống 30
 *  câu thì nó chỉ còn là một lượt luyện tập dài, và người học vẫn không biết
 *  ngày thi thật mình sẽ gãy ở đâu.
 *
 *  Điểm trả về TÁCH THEO MÔN. Tổng điểm chỉ nói đỗ hay trượt; "Ethics 11/31"
 *  mới nói phải học lại cái gì, và Ethics chiếm 15-20% đề nên đó là chỗ đáng
 *  sửa trước. */

interface ExamQuestion {
  lessonId: number;
  lessonTitle: string;
  lessonSlug: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  token: string;
}

type Stage = "intro" | "loading" | "error" | "running" | "break" | "done";

interface Result {
  score: number;
  total: number;
  bySubject: SubjectScore[];
}

function mmss(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return h > 0 ? `${h}:${m}:${sec}` : `${m}:${sec}`;
}

export default function CfaMockExamClient() {
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

  const perSession = CFA_EXAM.questionsPerSession;
  const sessionStart = session * perSession;
  const sessionEnd = Math.min(sessionStart + perSession, questions.length);


  const start = async () => {
    setStage("loading");
    try {
      const res = await fetch(
        `/api/knowledge-challenge?track=cfa&difficulty=tat-ca&count=${CFA_EXAM.totalQuestions}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list: ExamQuestion[] = data.questions ?? [];
      if (list.length === 0) throw new Error("Không lấy được câu hỏi nào");
      setQuestions(list);
      setAnswers(new Array(list.length).fill(null));
      setFlags(new Array(list.length).fill(false));
      setSession(0);
      setActive(0);
      setDeadline(Date.now() + CFA_EXAM.minutesPerSession * 60_000);
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

    // Câu bỏ trống vẫn gửi lên với một lựa chọn không tồn tại: server chấm
    // theo token nên nó tính là sai, và nhờ vậy tổng số câu trong báo cáo
    // đúng bằng 180 thay vì chỉ đếm những câu đã trả lời.
    const payload = questions.map((q, i) => ({ token: q.token, selected: answers[i] ?? -1 }));
    let score = 0;
    try {
      const res = await fetch("/api/knowledge-challenge/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "cfa-mock",
          track: "cfa",
          difficulty: "tat-ca",
          answers: payload,
        }),
      });
      const data = await res.json();
      score = typeof data.score === "number" ? data.score : 0;
    } catch {
      // Máy chủ không chấm được thì vẫn phải trả kết quả cho người vừa ngồi
      // 4,5 tiếng: chấm tại chỗ theo `correct` đã gửi kèm từng câu.
      score = questions.reduce((n, q, i) => n + (answers[i] === q.correct ? 1 : 0), 0);
    }

    setResult({
      score,
      total: questions.length,
      bySubject: scoreBySubject(
        questions.map((q, i) => ({ lessonId: q.lessonId, correct: answers[i] === q.correct }))
      ),
    });
    setStage("done");
  }, [questions, answers]);

  const nextSession = useCallback(() => {
    if (session + 1 >= CFA_EXAM.sessions) {
      void finish();
      return;
    }
    setSession((s) => s + 1);
    setActive((session + 1) * perSession);
    setDeadline(Date.now() + CFA_EXAM.minutesPerSession * 60_000);
    setStage("running");
  }, [session, perSession, finish]);

  /** Nhịp giây cho đồng hồ, kiêm luôn việc hết giờ.
   *
   *  Hai việc này ở CHUNG một chỗ chứ không tách thành một effect thứ hai theo
   *  dõi `now`: effect đó sẽ gọi setState ngay trong thân nó mỗi giây, tức là
   *  render xong lại kích hoạt render tiếp. Trong callback của interval thì
   *  setState là bình thường - đó là tín hiệu từ một hệ thống bên ngoài.
   *
   *  Hết giờ thì tự chuyển ca, không hỏi. Đó là điều đề thi thật làm. */
  useEffect(() => {
    if (stage !== "running") return;
    const timer = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (deadline === null || t < deadline) return;
      if (session + 1 >= CFA_EXAM.sessions) void finish();
      else setStage("break");
    }, 1000);
    return () => window.clearInterval(timer);
  }, [stage, deadline, session, finish]);

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
      <Shell>
        <div className="flex flex-col items-center gap-3 py-24 text-stone-500 dark:text-stone-400">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-sm font-medium">Đang chuẩn bị đề…</p>
        </div>
      </Shell>
    );
  }

  if (stage === "error") {
    return (
      <Shell>
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
      </Shell>
    );
  }

  if (stage === "intro") {
    return (
      <Shell>
        <div className="mx-auto max-w-xl py-10">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            Thi thử CFA Level I
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            Đúng khuôn đề thật, không rút gọn. Ngồi hết được bài này thì ngày thi
            không còn gì bất ngờ về sức bền.
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-3">
            {[
              ["Số câu", `${CFA_EXAM.totalQuestions} câu`],
              ["Số ca", `${CFA_EXAM.sessions} ca × ${CFA_EXAM.questionsPerSession} câu`],
              ["Thời gian mỗi ca", `${CFA_EXAM.minutesPerSession} phút`],
              ["Lựa chọn mỗi câu", "3 phương án"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-2xl border border-stone-200 p-4 dark:border-stone-800"
              >
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
                  {k}
                </dt>
                <dd className="mt-1 text-sm font-bold text-stone-900 dark:text-stone-100">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 rounded-2xl bg-stone-100 p-4 text-xs leading-relaxed text-stone-600 dark:bg-stone-900 dark:text-stone-400">
            Tỷ lệ câu hỏi giữa mười môn lấy đúng trọng số CFA Institute công bố -
            Ethics nặng nhất, rồi FSA, Equity và Fixed Income. Điểm cuối bài tách
            theo từng môn, vì tổng điểm chỉ nói đỗ hay trượt còn bảng theo môn
            mới nói phải học lại cái gì.
          </p>
          <button
            type="button"
            onClick={start}
            className="mt-6 w-full rounded-2xl bg-stone-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
          >
            Bắt đầu ca 1
          </button>
        </div>
      </Shell>
    );
  }

  if (stage === "break") {
    return (
      <Shell>
        <div className="mx-auto max-w-md py-20 text-center">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Hết ca 1</h2>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Đã trả lời {answers.slice(0, perSession).filter((a) => a !== null).length}/{perSession}{" "}
            câu. Ngày thi thật bạn được nghỉ giữa hai ca - nghỉ đủ rồi hãy bấm.
          </p>
          <button
            type="button"
            onClick={nextSession}
            className="mt-6 rounded-2xl bg-stone-900 px-6 py-3 text-sm font-bold text-white dark:bg-stone-100 dark:text-stone-900"
          >
            Vào ca 2
          </button>
        </div>
      </Shell>
    );
  }

  if (stage === "done" && result) {
    const ratio = result.total > 0 ? result.score / result.total : 0;
    const passed = ratio >= CFA_EXAM.passRatio;
    return (
      <Shell>
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
                ? "Trên ngưỡng 70%."
                : "Dưới ngưỡng 70%."}{" "}
              CFA Institute không công bố điểm đỗ; 70% là mốc thận trọng các đơn
              vị luyện thi dùng, không phải con số chính thức.
            </p>
          </div>

          <h3 className="mt-8 text-sm font-bold text-stone-900 dark:text-stone-100">
            Điểm theo môn
          </h3>
          <div className="mt-3 space-y-2">
            {result.bySubject.map((s) => {
              const pct = s.total > 0 ? (s.correct / s.total) * 100 : 0;
              return (
                <div key={s.id} className="flex items-center gap-3">
                  <span className="w-44 shrink-0 truncate text-xs font-medium text-stone-700 dark:text-stone-300">
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
              href="/cfa"
              className="flex-1 rounded-2xl border border-stone-300 px-5 py-3 text-center text-sm font-bold text-stone-700 dark:border-stone-700 dark:text-stone-300"
            >
              Về trang CFA
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
      </Shell>
    );
  }

  const q = questions[active];
  if (!q) return null;
  const left = deadline === null ? 0 : deadline - now;

  return (
    <Shell>
      <div className="mx-auto max-w-2xl pb-32">
        <div className="sticky top-0 z-10 -mx-6 flex items-center justify-between gap-3 border-b border-stone-200 bg-white/90 px-6 py-3 backdrop-blur dark:border-stone-800 dark:bg-stone-950/90">
          <span className="text-xs font-bold text-stone-500">
            Ca {session + 1}/{CFA_EXAM.sessions} · câu {active - sessionStart + 1}/
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
                <span className="mr-2 font-bold">{"ABC"[i]}.</span>
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

        {/* Bảng nhảy câu. Đề thi thật cho quay lại câu bất kỳ trong cùng ca,
            nên ở đây cũng vậy - và nó là chỗ duy nhất thấy được mình còn bỏ
            trống bao nhiêu câu. */}
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
              onClick={() => (session + 1 < CFA_EXAM.sessions ? setStage("break") : void finish())}
              className="flex-1 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-500"
            >
              {session + 1 < CFA_EXAM.sessions ? "Kết thúc ca 1" : "Nộp bài"}
            </button>
          )}
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-6 py-4">
          <Link
            href="/cfa"
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800"
            aria-label="Về trang CFA"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              Thi thử CFA Level I
            </h1>
            <p className="mt-0.5 text-xs text-stone-500">
              180 câu · 2 ca × 135 phút · 3 lựa chọn
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-6">{children}</div>
    </div>
  );
}
