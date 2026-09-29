"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { computeGameXp, recordGameSession, type SpecialGameType } from "@/lib/games";
import { btnPrimary } from "@/components/ui/system";

/** Toà nhà có game tình huống. Nội dung ở lib/i18n/dictionaries/sections/building-games.ts,
 *  nơi phần tử đầu của mỗi `options` là đáp án đúng. */
export type ScenarioBuildingId = "silicon-bay" | "cloud-capital" | "resource-floor" | "data-haven" | "singapore-dock";

export const SCENARIO_BUILDINGS: readonly ScenarioBuildingId[] = [
  "silicon-bay",
  "cloud-capital",
  "resource-floor",
  "data-haven",
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
    <div className="h-full overflow-y-auto bg-page p-4 text-ink sm:p-6 dark:bg-stone-950">
      <div className="max-w-2xl mx-auto space-y-4">
        <header>
          <h2 className="text-xl font-black tracking-tight text-ink-max">{game.title}</h2>
          <p className="mt-1 text-sm text-ink-soft">{game.intro}</p>
        </header>

        {done ? (
          <div className="rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900 space-y-3 p-5 text-center">
            <p className="text-lg font-black tabular-nums tracking-tight text-ink-max">{format(copy.resultTitle, { score, total })}</p>
            <p className={xp > 0 ? "font-bold text-accent-strong" : "font-bold text-warn-strong"}>
              {xp > 0 ? format(copy.resultXp, { xp }) : copy.resultNoXp}
            </p>
            <button onClick={restart} className={btnPrimary}>
              {copy.playAgain}
            </button>
          </div>
        ) : (
          <div className="rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900 space-y-4 p-5">
            <p className="text-xs font-bold uppercase tracking-wide tabular-nums text-ink-muted">
              {format(copy.progress, { n: step + 1, total })}
            </p>
            <p className="font-bold text-ink-max">{scenario.q}</p>
            <div className="grid gap-2">
              {current.order.map((originalIndex) => {
                const isPicked = picked === originalIndex;
                const reveal = picked !== null;
                const tone = !reveal
                  ? "border-stone-300 text-ink-body hover:border-stone-400 dark:border-stone-700 dark:hover:border-stone-200"
                  : originalIndex === 0
                    ? "border-brand-600 bg-brand-50 text-brand-800 dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-200"
                    : isPicked
                      ? "border-red-500 bg-red-50 text-red-800 dark:border-red-700 dark:bg-red-950/40 dark:text-red-200"
                      : "border-stone-200 text-ink-faint dark:border-stone-800";
                return (
                  <button
                    key={originalIndex}
                    onClick={() => pick(originalIndex)}
                    disabled={reveal}
                    className={`rounded-sm border px-4 py-3 text-left text-sm font-semibold transition-colors ${tone}`}
                  >
                    {scenario.options[originalIndex]}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="space-y-3">
                <p className="text-sm">
                  <span className={picked === 0 ? "font-black text-accent-strong" : "font-black text-red-600 dark:text-red-400"}>
                    {picked === 0 ? copy.correct : copy.wrong}
                  </span>{" "}
                  <span className="text-ink-body">{scenario.why}</span>
                </p>
                <button onClick={advance} className={btnPrimary}>
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
