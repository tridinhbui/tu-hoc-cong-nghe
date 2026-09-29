"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Gamepad2, Trophy, History as HistoryIcon, ArrowLeft, ArrowRight, Crown, Volume2, VolumeX, Swords } from "lucide-react";
import Glyph from "@/components/Glyph";
import { useAuthGate } from "@/lib/use-auth-gate";
import { trackFeatureClick } from "@/lib/feature-events";
import { GAMES, GAME_DIFFICULTIES, getGameMeta, type GameType, type GameDifficulty } from "@/lib/games";
import { tabClass, Sys, SectionHead, panel } from "@/components/ui/system";
import { soundManager } from "@/lib/sounds";
import { useI18n } from "@/lib/i18n/context";
import { localizeDifficulties, localizeGameMeta, localizeGames } from "@/lib/games-i18n";
import { format } from "@/lib/i18n";
import GameLeaderboard from "@/components/games/GameLeaderboard";
import GameHistory from "@/components/games/GameHistory";
import BucketGame from "@/components/games/BucketGame";
import PairGame from "@/components/games/PairGame";
import CombinedGameLeaderboard from "@/components/games/CombinedGameLeaderboard";
import GameLessonRecommendation from "@/components/games/GameLessonRecommendation";
import PvpDuelModal from "@/components/PvpDuelModal";
import ModeLeaderboard from "@/components/games/ModeLeaderboard";

type InnerTab = "play" | "leaderboard" | "history";
type HubTab = "games" | "pvp" | "combined";

/* i18n-ignore-start: định danh hệ thống, không phải chữ hiển thị - cùng một
   chuỗi ở mọi ngôn ngữ, như đường dẫn tệp. */
const SYS = {
  arcade: "THCN://GAME/ARCADE",
  game: (id: string) => `THCN://GAME/ARCADE/${id.toUpperCase()}`,
  pvp: "THCN://GAME/PVP",
};
/* i18n-ignore-end */

/** Nút sáng trên dải mực stone-950: bản đảo màu của btnPrimary. */
const btnOnInk =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-white px-4 py-2.5 text-sm font-bold text-stone-950 transition-colors hover:bg-brand-300";

export default function GameHubClient() {
  const { t, locale } = useI18n();
  // Dịch danh sách trò và danh sách độ khó một lần cho cả màn hình. Không dịch
  // ở chỗ vẽ: `GAMES` còn được dùng để đếm và để tra, nên hai nơi cùng đọc một
  // danh sách đã dịch thì mới không lệch nhau.
  const localizedGames = useMemo(() => localizeGames(GAMES, locale), [locale]);
  const localizedDifficulties = useMemo(
    () => localizeDifficulties(GAME_DIFFICULTIES, locale),
    [locale]
  );
  const gameHub = t.games.gameHub;
  const { userId, checking } = useAuthGate();
  const [activeGame, setActiveGame] = useState<GameType | null>(null);
  const [difficulty, setDifficulty] = useState<GameDifficulty>("trung-binh");
  const [innerTab, setInnerTab] = useState<InnerTab>("play");
  const [hubTab, setHubTab] = useState<HubTab>("games");
  const [soundsEnabled, setSoundsEnabled] = useState(() => soundManager.isEnabled());
  const [showPvpModal, setShowPvpModal] = useState(false);

  const [lastResult, setLastResult] = useState<{ gameType: GameType; score: number; total: number } | null>(null);

  if (checking || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-stone-900 dark:border-stone-700 dark:border-t-stone-100" />
      </div>
    );
  }

  function handleFinished(score: number, total: number, xpEarned: number) {
    if (activeGame) {
      setLastResult({ gameType: activeGame, score, total });
    }
    if (xpEarned > 0) toast.success(format(gameHub.finishedSuccess, { score, total, xp: xpEarned }));
    else toast.info(format(gameHub.finishedFail, { score, total }));
    // Không còn bước gộp XP lên máy chủ: `recordGameSession` đã ghi phiên vào
    // kho cục bộ, và `getTotalGameXp` tính lại tổng từ chính kho đó mỗi lần
    // đọc, nên không có bản sao nào để đồng bộ nữa.
    setInnerTab("leaderboard");
  }

  const soundToggle = (
    <button
      onClick={() => {
        const next = !soundsEnabled;
        soundManager.setEnabled(next);
        setSoundsEnabled(next);
        if (next) soundManager.playCorrect();
      }}
      className="inline-flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-xs font-bold text-ink-muted transition-colors hover:text-ink"
      title={soundsEnabled ? gameHub.soundOffTitle : gameHub.soundOnTitle}
    >
      {soundsEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      <span className="hidden sm:inline">{soundsEnabled ? gameHub.soundOnLabel : gameHub.soundOffLabel}</span>
    </button>
  );

  if (!activeGame) {
    return (
      <div className="min-h-screen bg-page dark:bg-stone-950">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <SectionHead
              code={SYS.arcade}
              eyebrow={gameHub.miniGameBadge}
              title={gameHub.title}
              sub={gameHub.subtitle}
              className="min-w-0 flex-1"
            />
          </div>

          <div className="mb-6 mt-5 flex items-end justify-between gap-3 border-b border-line-strong">
            <div className="flex gap-5 overflow-x-auto scrollbar-none" role="tablist">
              {[
                { id: "games" as const, label: gameHub.gamesTab, icon: Gamepad2 },
                { id: "pvp" as const, label: gameHub.pvpTab, icon: Swords },
                { id: "combined" as const, label: gameHub.combinedTab, icon: Crown },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={hubTab === id}
                  onClick={() => {
                    setHubTab(id);
                    trackFeatureClick("game_hub_tab_click", { label: id });
                  }}
                  className={`${tabClass(hubTab === id)} inline-flex shrink-0 items-center gap-1.5`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {label}
                </button>
              ))}
            </div>
            <div className="-mb-px pb-1">{soundToggle}</div>
          </div>

          {hubTab === "combined" ? (
            <CombinedGameLeaderboard />
          ) : hubTab === "pvp" ? (
            <div className="space-y-6">
              {/* Ảnh đấu trường là nội dung; lớp phủ phẳng chỉ để chữ đọc được. */}
              <div className="relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-md border border-stone-800 bg-stone-950 p-6 sm:p-8">
                <Image
                  src="/images/dau-truong-kien-thuc.jpg"
                  alt={gameHub.pvpImageAlt}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-stone-950/75" />

                <div className="relative z-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                  <div className="max-w-xl">
                    <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-2">
                      <Sys className="text-stone-400">{SYS.pvp}</Sys>
                      <span className="eyebrow text-stone-300">{gameHub.pvpBadge}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                      {gameHub.pvpTitle}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-stone-300 sm:text-sm">
                      {gameHub.pvpDesc}
                    </p>
                  </div>
                  <button onClick={() => setShowPvpModal(true)} className={btnOnInk}>
                    <Swords className="h-4 w-4" aria-hidden />
                    <span>{gameHub.pvpButton}</span>
                  </button>
                </div>
              </div>

              <ModeLeaderboard
                gameType="pvp-duel"
                title={gameHub.pvpLeaderboardTitle}
                emptyLabel={gameHub.pvpLeaderboardEmpty}
              />
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {localizedGames.map((g, i) => (
                <button
                  key={g.id}
                  onClick={() => {
                    setActiveGame(g.id);
                    setDifficulty("trung-binh");
                    setInnerTab("play");
                    trackFeatureClick("game_open", { label: g.id });
                  }}
                  className={`${panel} group flex flex-col p-4 text-left transition-colors hover:border-line-firm`}
                >
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-brand-600 text-white">
                      <Glyph emoji={g.emoji} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <Sys className="text-ink-faint">{`G${String(i + 1).padStart(2, "0")}`}</Sys>
                        <span className="shrink-0 rounded-xs border border-line-strong px-1.5 py-px text-[10px] font-semibold text-ink-muted dark:border-stone-700">
                          {g.mechanic === "bucket" ? gameHub.bucketMechanic : gameHub.pairMechanic}
                        </span>
                      </div>
                      <p className="mt-1 font-black text-ink-max">{t.gameMeta[g.id]?.title ?? g.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-soft">{t.gameMeta[g.id]?.description ?? g.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-200 pt-3 dark:border-stone-800">
                    <span className="text-[11px] font-semibold text-ink-muted">{gameHub.xpBadge}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-accent-strong">
                      {gameHub.playNow}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {showPvpModal && (
          <PvpDuelModal
            userId={userId}
            userLevel={1}
            onClose={() => setShowPvpModal(false)}
          />
        )}
      </div>
    );
  }

  const meta = localizeGameMeta(getGameMeta(activeGame), locale);

  return (
    <div className="min-h-screen bg-page dark:bg-stone-950">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <button
          onClick={() => setActiveGame(null)}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> {gameHub.backButton}
        </button>

        <div className="mb-4 flex items-center justify-between gap-4 border-b border-line-strong pb-2">
          <Sys className="truncate text-ink-muted">{SYS.game(meta.id)}</Sys>
          {soundToggle}
        </div>
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-brand-600 text-white">
            <Glyph emoji={meta.emoji} className="h-5 w-5" />
          </span>
          <h1 className="text-xl font-black tracking-tight text-ink-max sm:text-2xl">{t.gameMeta[meta.id]?.title ?? meta.title}</h1>
        </div>

        {innerTab === "play" && (
          <div className="mb-5">
            <p className="eyebrow mb-2 text-ink-soft">{gameHub.difficultyLabel}</p>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={gameHub.difficultyLabel}>
              {localizedDifficulties.map((d) => (
                <button
                  key={d.id}
                  role="radio"
                  aria-checked={difficulty === d.id}
                  onClick={() => setDifficulty(d.id)}
                  title={t.gameDifficulties[d.id]?.hint ?? d.hint}
                  className={`rounded-sm border px-3 py-1.5 text-xs font-bold transition-colors ${
                    difficulty === d.id
                      ? "border-brand-600 bg-brand-50 text-brand-800 dark:border-brand-400 dark:bg-brand-950 dark:text-brand-200"
                      : "border-stone-300 text-ink-soft hover:border-stone-400 dark:border-stone-700 dark:hover:border-stone-600"
                  }`}
                >
                  {t.gameDifficulties[d.id]?.label ?? d.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-5 flex gap-5 border-b border-line-strong" role="tablist">
          {[
            { id: "play" as const, label: gameHub.playTabLabel, short: gameHub.playTabShort, icon: Gamepad2 },
            { id: "leaderboard" as const, label: gameHub.leaderboardTabLabel, short: gameHub.leaderboardTabShort, icon: Trophy },
            { id: "history" as const, label: gameHub.historyTabLabel, short: gameHub.historyTabShort, icon: HistoryIcon },
          ].map(({ id, label, short, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={innerTab === id}
              onClick={() => {
                setInnerTab(id);
                trackFeatureClick("game_inner_tab_click", { label: id });
              }}
              className={`${tabClass(innerTab === id)} inline-flex items-center gap-1.5`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{short}</span>
            </button>
          ))}
        </div>

        {innerTab === "play" &&
          (meta.mechanic === "bucket" ? (
            <BucketGame key={`${activeGame}-${difficulty}`} userId={userId} gameType={activeGame} difficulty={difficulty} onFinished={handleFinished} />
          ) : (
            <PairGame key={`${activeGame}-${difficulty}`} userId={userId} gameType={activeGame} difficulty={difficulty} onFinished={handleFinished} />
          ))}
        {innerTab === "leaderboard" && <GameLeaderboard gameType={activeGame} />}
        {innerTab === "history" && <GameHistory userId={userId} gameType={activeGame} />}

        {/* Display related lesson recommendations if played or on leaderboard/history */}
        <GameLessonRecommendation
          gameType={activeGame}
          score={lastResult?.gameType === activeGame ? lastResult.score : undefined}
          total={lastResult?.gameType === activeGame ? lastResult.total : undefined}
          className="mt-6"
        />
      </div>
    </div>
  );
}
