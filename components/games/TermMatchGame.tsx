"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { pickTermRound, recordGameSession, type TermPair } from "@/lib/games";

interface Props {
  userId: string;
  onFinished: (score: number, total: number, xpEarned: number) => void;
}

interface CardState {
  id: string; // unique id for this card in this round, e.g. "vi-3" / "en-3"
  pairIndex: number; // index into the round's TermPair[]
  matched: boolean;
  everWrong: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function TermMatchGame({ userId, onFinished }: Props) {
  const [round, setRound] = useState<TermPair[]>(() => pickTermRound(8));
  const [viOrder, setViOrder] = useState<number[]>([]);
  const [enOrder, setEnOrder] = useState<number[]>([]);
  const [viCards, setViCards] = useState<Record<number, CardState>>({});
  const [enCards, setEnCards] = useState<Record<number, CardState>>({});
  const [selectedVi, setSelectedVi] = useState<number | null>(null);
  const [selectedEn, setSelectedEn] = useState<number | null>(null);
  const [shakePair, setShakePair] = useState<{ vi: number | null; en: number | null }>({ vi: null, en: null });
  const [matchedCount, setMatchedCount] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function startNewRound() {
    const newRound = pickTermRound(8);
    const indices = newRound.map((_, i) => i);
    setRound(newRound);
    setViOrder(shuffle(indices));
    setEnOrder(shuffle(indices));
    setViCards(
      Object.fromEntries(indices.map((i) => [i, { id: `vi-${i}`, pairIndex: i, matched: false, everWrong: false }]))
    );
    setEnCards(
      Object.fromEntries(indices.map((i) => [i, { id: `en-${i}`, pairIndex: i, matched: false, everWrong: false }]))
    );
    setSelectedVi(null);
    setSelectedEn(null);
    setShakePair({ vi: null, en: null });
    setMatchedCount(0);
    setScore(0);
    setFinished(false);
    setSubmitting(false);
  }

  useEffect(() => {
    startNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function tryMatch(viIndex: number, enIndex: number) {
    const viCard = viCards[viIndex];
    const enCard = enCards[enIndex];
    if (!viCard || !enCard || viCard.matched || enCard.matched) return;

    const isCorrect = viIndex === enIndex;

    if (isCorrect) {
      const countsForScore = !viCard.everWrong && !enCard.everWrong;
      setViCards((prev) => ({ ...prev, [viIndex]: { ...prev[viIndex], matched: true } }));
      setEnCards((prev) => ({ ...prev, [enIndex]: { ...prev[enIndex], matched: true } }));
      setSelectedVi(null);
      setSelectedEn(null);

      const newScore = countsForScore ? score + 1 : score;
      const newMatchedCount = matchedCount + 1;
      setScore(newScore);
      setMatchedCount(newMatchedCount);

      if (newMatchedCount >= round.length) {
        setFinished(true);
        setSubmitting(true);
        try {
          const xpEarned = await recordGameSession(userId, "en-vi-terms", newScore, round.length);
          onFinished(newScore, round.length, xpEarned);
        } catch {
          onFinished(newScore, round.length, 0);
        } finally {
          setSubmitting(false);
        }
      }
    } else {
      setViCards((prev) => ({ ...prev, [viIndex]: { ...prev[viIndex], everWrong: true } }));
      setEnCards((prev) => ({ ...prev, [enIndex]: { ...prev[enIndex], everWrong: true } }));
      setShakePair({ vi: viIndex, en: enIndex });
      setTimeout(() => {
        setShakePair({ vi: null, en: null });
        setSelectedVi(null);
        setSelectedEn(null);
      }, 500);
    }
  }

  function handleViClick(viIndex: number) {
    if (viCards[viIndex]?.matched || (shakePair.vi !== null)) return;
    if (selectedEn !== null) {
      void tryMatch(viIndex, selectedEn);
    } else {
      setSelectedVi(viIndex === selectedVi ? null : viIndex);
    }
  }

  function handleEnClick(enIndex: number) {
    if (enCards[enIndex]?.matched || (shakePair.en !== null)) return;
    if (selectedVi !== null) {
      void tryMatch(selectedVi, enIndex);
    } else {
      setSelectedEn(enIndex === selectedEn ? null : enIndex);
    }
  }

  function handleDragStart(e: React.DragEvent, side: "vi" | "en", index: number) {
    e.dataTransfer.setData("text/plain", JSON.stringify({ side, index }));
  }

  function handleDrop(e: React.DragEvent, side: "vi" | "en", index: number) {
    e.preventDefault();
    const raw = e.dataTransfer.getData("text/plain");
    if (!raw) return;
    try {
      const data = JSON.parse(raw) as { side: "vi" | "en"; index: number };
      if (data.side === side) return; // must drop onto opposite column
      if (side === "vi") {
        void tryMatch(index, data.index);
      } else {
        void tryMatch(data.index, index);
      }
    } catch {
      // ignore malformed drag payloads
    }
  }

  function cardClass(kind: "vi" | "en", index: number, cardState: CardState | undefined, selected: boolean) {
    const base =
      "w-full text-left px-4 py-3 rounded-xl border-2 font-semibold text-sm sm:text-base transition-all cursor-pointer select-none";
    if (!cardState) return base;
    if (cardState.matched) {
      return `${base} border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 cursor-default`;
    }
    const isShaking = kind === "vi" ? shakePair.vi === index : shakePair.en === index;
    if (isShaking) {
      return `${base} border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 animate-[wiggle_0.5s_ease-in-out]`;
    }
    if (selected) {
      return `${base} border-stone-900 dark:border-stone-100 ring-2 ring-stone-900 dark:ring-stone-100 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100`;
    }
    return `${base} border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 hover:border-emerald-400 dark:hover:border-emerald-600`;
  }

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6">
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>

      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
            Đã ghép {matchedCount}/{round.length} cặp
          </p>
          <div className="w-40 sm:w-56 h-2 bg-stone-100 dark:bg-stone-800 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${round.length ? (matchedCount / round.length) * 100 : 0}%` }}
            />
          </div>
        </div>
        <button
          onClick={startNewRound}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border-2 border-stone-200 dark:border-stone-800 rounded-lg px-3 py-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Chơi lại
        </button>
      </div>

      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
        Kéo thả hoặc bấm chọn 1 thẻ Tiếng Việt rồi bấm 1 thẻ Tiếng Anh tương ứng để ghép cặp.
      </p>

      {finished ? (
        <div className="text-center py-10">
          <p className="text-lg font-bold text-stone-900 dark:text-stone-100">
            {submitting ? "Đang lưu kết quả..." : "Hoàn thành ván chơi!"}
          </p>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Điểm: {score}/{round.length}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="flex flex-col gap-2.5">
            {viOrder.map((idx) => {
              const cardState = viCards[idx];
              return (
                <div
                  key={`vi-${idx}`}
                  draggable={!cardState?.matched}
                  onDragStart={(e) => handleDragStart(e, "vi", idx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, "vi", idx)}
                  onClick={() => handleViClick(idx)}
                  className={cardClass("vi", idx, cardState, selectedVi === idx)}
                >
                  {round[idx]?.vi}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2.5">
            {enOrder.map((idx) => {
              const cardState = enCards[idx];
              return (
                <div
                  key={`en-${idx}`}
                  draggable={!cardState?.matched}
                  onDragStart={(e) => handleDragStart(e, "en", idx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, "en", idx)}
                  onClick={() => handleEnClick(idx)}
                  className={cardClass("en", idx, cardState, selectedEn === idx)}
                >
                  {round[idx]?.en}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
