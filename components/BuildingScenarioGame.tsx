"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { computeGameXp, recordGameSession, type SpecialGameType } from "@/lib/games";

/** Toà nhà có game tình huống. Nội dung ở lib/i18n/dictionaries/sections/building-games.ts,
 *  nơi phần tử đầu của mỗi `options` là đáp án đúng. */
export type ScenarioBuildingId = "silicon-bay" | "capitol-hill" | "cme-commodities" | "swiss-haven" | "singapore-dock";

export const SCENARIO_BUILDINGS: readonly ScenarioBuildingId[] = [
  "silicon-bay",
  "capitol-hill",
  "cme-commodities",
  "swiss-haven",
  "singapore-dock",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Một lượt chơi: thứ tự tình huống và thứ tự phương án đều xáo, lưu lại chỉ số
 *  gốc để biết phương án nào là đáp án (chỉ số gốc 0). */
function buildRound(count: number) {
  return shuffle(Array.from({ length: count }, (_, i) => i)).map((scenarioIndex) => ({
    scenarioIndex,
    order: shuffle([0, 1, 2, 3]),
  }));
}

export default function BuildingScenarioGame({ buildingId, userId }: { buildingId: ScenarioBuildingId; userId: string }) {
  const { t } = useI18n();
  const copy = t.buildingGames;
  const game = copy.games[buildingId];
  const [seed, setSeed] = useState(0);
  const round = useMemo(() => buildRound(game.scenarios.length), [game.scenarios.length, seed]);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [xp, setXp] = useState(0);

  const total = round.length;
  const current = round[step];
  const scenario = game.scenarios[current.scenarioIndex];

  const pick = (originalIndex: number) => {
    if (picked !== null) return;
    setPicked(originalIndex);
    if (originalIndex === 0) setScore((s) => s + 1);
  };

  const advance = async () => {
    if (step + 1 < total) {
      setStep(step + 1);
      setPicked(null);
      return;
    }
    setDone(true);
    setXp(computeGameXp(score, total));
    if (userId) await recordGameSession(userId, `scenario-${buildingId}` as SpecialGameType, score, total).catch(() => 0);
  };

  const restart = () => {
    setSeed((s) => s + 1);
    setStep(0);
    setPicked(null);
    setScore(0);
    setDone(false);
    setXp(0);
  };

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="max-w-2xl mx-auto space-y-4">
        <header>
          <h2 className="text-xl font-black">{game.title}</h2>
          <p className="text-sm text-slate-300">{game.intro}</p>
        </header>

        {done ? (
          <div className="rounded-2xl bg-slate-800 p-5 space-y-3 text-center">
            <p className="text-lg font-black">{format(copy.resultTitle, { score, total })}</p>
            <p className={xp > 0 ? "text-brand-300 font-bold" : "text-amber-300 font-bold"}>
              {xp > 0 ? format(copy.resultXp, { xp }) : copy.resultNoXp}
            </p>
            <button onClick={restart} className="rounded-xl bg-brand-500 px-4 py-2 font-black text-slate-950 hover:bg-brand-400">
              {copy.playAgain}
            </button>
          </div>
        ) : (
          <div className="rounded-2xl bg-slate-800 p-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              {format(copy.progress, { n: step + 1, total })}
            </p>
            <p className="font-bold">{scenario.q}</p>
            <div className="grid gap-2">
              {current.order.map((originalIndex) => {
                const isPicked = picked === originalIndex;
                const reveal = picked !== null;
                const tone = !reveal
                  ? "bg-slate-700 hover:bg-slate-600"
                  : originalIndex === 0
                    ? "bg-brand-600"
                    : isPicked
                      ? "bg-rose-600"
                      : "bg-slate-700 opacity-60";
                return (
                  <button
                    key={originalIndex}
                    onClick={() => pick(originalIndex)}
                    disabled={reveal}
                    className={`text-left rounded-xl px-4 py-3 text-sm font-semibold transition ${tone}`}
                  >
                    {scenario.options[originalIndex]}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="space-y-3">
                <p className="text-sm">
                  <span className={picked === 0 ? "text-brand-300 font-black" : "text-rose-300 font-black"}>
                    {picked === 0 ? copy.correct : copy.wrong}
                  </span>{" "}
                  <span className="text-slate-200">{scenario.why}</span>
                </p>
                <button onClick={advance} className="rounded-xl bg-brand-500 px-4 py-2 font-black text-slate-950 hover:bg-brand-400">
                  {step + 1 < total ? copy.next : copy.finish}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
