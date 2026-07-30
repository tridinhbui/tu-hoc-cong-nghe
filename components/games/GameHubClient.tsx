"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Gamepad2, Trophy, History as HistoryIcon, ArrowLeft, Crown, Volume2, VolumeX, Swords, Building2 } from "lucide-react";
import { useAuthGate } from "@/lib/use-auth-gate";
import { trackFeatureClick } from "@/lib/feature-events";
import { GAMES, GAME_DIFFICULTIES, getGameMeta, type GameType, type GameDifficulty } from "@/lib/games";
import { recalculateUserStats } from "@/lib/supabase-user";
import { getIllustrativeCount } from "@/lib/illustrative-stats";
import { soundManager } from "@/lib/sounds";
import GameLeaderboard from "@/components/games/GameLeaderboard";
import GameHistory from "@/components/games/GameHistory";
import BucketGame from "@/components/games/BucketGame";
import PairGame from "@/components/games/PairGame";
import CombinedGameLeaderboard from "@/components/games/CombinedGameLeaderboard";
import GameLessonRecommendation from "@/components/games/GameLessonRecommendation";
import PvpDuelModal from "@/components/PvpDuelModal";
import FinancialGuildWidget from "@/components/FinancialGuildWidget";
import ModeLeaderboard from "@/components/games/ModeLeaderboard";
import WallStreetMillionaireGame from "@/components/games/WallStreetMillionaireGame";
import SnowballRacerGame from "@/components/games/SnowballRacerGame";

type InnerTab = "play" | "leaderboard" | "history";
type HubTab = "games" | "pvp" | "guild" | "combined";

const ACCENT: Record<string, { grad: string; ring: string; chip: string; glow: string; shadow: string }> = {
  emerald: {
    grad: "from-emerald-500 to-teal-500",
    ring: "hover:border-emerald-400",
    chip: "bg-emerald-50 text-emerald-700",
    glow: "bg-emerald-500/5",
    shadow: "hover:shadow-[0_16px_32px_-10px_rgba(16,185,129,0.15)]"
  },
  sky: {
    grad: "from-sky-500 to-blue-500",
    ring: "hover:border-sky-400",
    chip: "bg-sky-50 text-sky-700",
    glow: "bg-sky-500/5",
    shadow: "hover:shadow-[0_16px_32px_-10px_rgba(14,165,233,0.15)]"
  },
  amber: {
    grad: "from-amber-500 to-orange-500",
    ring: "hover:border-amber-400",
    chip: "bg-amber-50 text-amber-700",
    glow: "bg-amber-500/5",
    shadow: "hover:shadow-[0_16px_32px_-10px_rgba(245,158,11,0.15)]"
  },
  violet: {
    grad: "from-violet-500 to-purple-500",
    ring: "hover:border-violet-400",
    chip: "bg-violet-50 text-violet-700",
    glow: "bg-violet-500/5",
    shadow: "hover:shadow-[0_16px_32px_-10px_rgba(139,92,246,0.15)]"
  },
  rose: {
    grad: "from-rose-500 to-pink-500",
    ring: "hover:border-rose-400",
    chip: "bg-rose-50 text-rose-700",
    glow: "bg-rose-500/5",
    shadow: "hover:shadow-[0_16px_32px_-10px_rgba(244,63,94,0.15)]"
  },
  indigo: {
    grad: "from-indigo-500 to-blue-500",
    ring: "hover:border-indigo-400",
    chip: "bg-indigo-50 text-indigo-700",
    glow: "bg-indigo-500/5",
    shadow: "hover:shadow-[0_16px_32px_-10px_rgba(99,102,241,0.15)]"
  },
  teal: {
    grad: "from-teal-500 to-cyan-500",
    ring: "hover:border-teal-400",
    chip: "bg-teal-50 text-teal-700",
    glow: "bg-teal-500/5",
    shadow: "hover:shadow-[0_16px_32px_-10px_rgba(20,184,166,0.15)]"
  },
  cyan: {
    grad: "from-cyan-500 to-sky-500",
    ring: "hover:border-cyan-400",
    chip: "bg-cyan-50 text-cyan-700",
    glow: "bg-cyan-500/5",
    shadow: "hover:shadow-[0_16px_32px_-10px_rgba(6,182,212,0.15)]"
  },
};

export default function GameHubClient() {
  const { userId, checking } = useAuthGate();
  const [activeGame, setActiveGame] = useState<GameType | null>(null);
  const [difficulty, setDifficulty] = useState<GameDifficulty>("trung-binh");
  const [innerTab, setInnerTab] = useState<InnerTab>("play");
  const [hubTab, setHubTab] = useState<HubTab>("games");
  const [soundsEnabled, setSoundsEnabled] = useState(() => soundManager.isEnabled());
  const [showPvpModal, setShowPvpModal] = useState(false);
  const [showMillionaireModal, setShowMillionaireModal] = useState(false);
  const [showRacerModal, setShowRacerModal] = useState(false);

  const [lastResult, setLastResult] = useState<{ gameType: GameType; score: number; total: number } | null>(null);

  if (checking || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" />
      </div>
    );
  }

  function handleFinished(score: number, total: number, xpEarned: number) {
    if (activeGame) {
      setLastResult({ gameType: activeGame, score, total });
    }
    if (xpEarned > 0) toast.success(`Hoàn thành! ${score}/${total} đúng - nhận +${xpEarned} XP`);
    else toast.info(`Được ${score}/${total} - cần đúng ít nhất 70% để nhận XP. Thử lại nhé!`);
    // Fold the game's best-per-game XP into the user's real total_xp/level
    // right away (best-effort - the session is already saved regardless).
    if (userId) void recalculateUserStats(userId).catch(() => {});
    setInnerTab("leaderboard");
  }

  if (!activeGame) {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-emerald-700">
                <Gamepad2 className="w-3.5 h-3.5" /> Mini Game
              </span>
            </div>
            <button
              onClick={() => {
                const next = !soundsEnabled;
                soundManager.setEnabled(next);
                setSoundsEnabled(next);
                if (next) soundManager.playCorrect();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 p-2 rounded-lg hover:bg-stone-100 transition-colors"
              title={soundsEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
            >
              {soundsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundsEnabled ? "Âm thanh" : "Tắt âm"}</span>
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">Chơi để ghi nhớ kiến thức</h1>
          <p className="text-sm text-stone-500 mt-1.5 mb-6">
            Kéo thả nhanh, nhớ lâu - vượt 70% mỗi ván để nhận XP và leo bảng xếp hạng riêng của từng game.
          </p>

          <div className="flex gap-1 sm:gap-1.5 mb-5 bg-stone-100 rounded-xl p-1 sm:p-1.5 max-w-lg overflow-x-auto scrollbar-none">
            {[
              { id: "games" as const, label: "Các game", icon: Gamepad2 },
              { id: "pvp" as const, label: "Solo PVP 1v1", icon: Swords },
              { id: "guild" as const, label: "Quỹ Mô Phỏng", icon: Building2 },
              { id: "combined" as const, label: "BXH tổng hợp", icon: Crown },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setHubTab(id);
                  trackFeatureClick("game_hub_tab_click", { label: id });
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-bold px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all shrink-0 ${
                  hubTab === id
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {label}
              </button>
            ))}
          </div>

          {hubTab === "combined" ? (
            <CombinedGameLeaderboard />
          ) : hubTab === "pvp" ? (
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl group min-h-[220px] flex flex-col justify-end p-6 sm:p-8">
                <Image
                  src="/images/dau-truong-kien-thuc.jpg"
                  alt="Đấu Trường Kiến Thức"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />

                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                  <div className="space-y-1.5 max-w-xl">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/40 backdrop-blur-md">
                      ⚔️ ĐẤU TRƯỜNG TRI THỨC 1V1
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
                      Thách đấu Solo PVP & Đo đạc Tỷ lệ Thắng
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-200 font-medium leading-relaxed drop-shadow">
                      Thi đấu kiến thức trực tiếp 1v1, tích lũy trận thắng và leo bảng xếp hạng Cao thủ Solo PVP.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPvpModal(true)}
                    className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm rounded-2xl shadow-xl hover:scale-105 transition-all shrink-0 cursor-pointer flex items-center gap-2 border border-amber-300/50"
                  >
                    <Swords className="w-5 h-5 text-stone-950" />
                    <span>Vào trận Solo 1v1 ngay →</span>
                  </button>
                </div>
              </div>

              <ModeLeaderboard
                gameType="pvp-duel"
                title="⚔️ BXH Cao thủ Thách đấu Solo PVP (Số trận thắng & Winrate %)"
                emptyLabel="Chưa có dữ liệu thách đấu. Hãy bấm nút phía trên để bắt đầu ván Solo PVP đầu tiên!"
              />
            </div>
          ) : hubTab === "guild" ? (
            <div className="space-y-6">
              <FinancialGuildWidget userId={userId} />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Featured Wall Street Quiz Millionaire Banner */}
              <div
                onClick={() => {
                  setShowMillionaireModal(true);
                  trackFeatureClick("game_open_millionaire", { label: "wall-street-millionaire" });
                }}
                className="relative rounded-3xl overflow-hidden border-2 border-amber-500/50 bg-gradient-to-r from-slate-900 via-amber-950/60 to-slate-950 p-6 sm:p-7 shadow-xl cursor-pointer group hover:border-amber-400 hover:shadow-amber-500/20 transition-all duration-300"
              >
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-400/60 flex items-center justify-center text-3xl shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      💰
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 text-[10px] font-black text-amber-300 uppercase tracking-widest mb-1">
                        🏆 GAME SHOW ĐẶC BIỆT
                      </div>
                      <h2 className="text-lg sm:text-xl font-black text-amber-100 group-hover:text-amber-300 transition-colors">
                        Ai Là Triệu Phú Phố Wall
                      </h2>
                      <p className="text-xs text-stone-300 mt-1 max-w-lg leading-relaxed">
                        15 câu hỏi chinh phục $1,000,000 vốn đầu tư! Sử dụng 3 quyền trợ giúp: 50:50, Hỏi Mascot Tài Tài & Khảo sát 1,000 Chuyên viên.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs sm:text-sm shadow-lg group-hover:scale-105 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Vào Game Show</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>

              {/* Featured Snowball Racer Banner */}
              <div
                onClick={() => {
                  setShowRacerModal(true);
                  trackFeatureClick("game_open_racer", { label: "snowball-racer" });
                }}
                className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/50 bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-950 p-6 sm:p-7 shadow-xl cursor-pointer group hover:border-emerald-400 hover:shadow-emerald-500/20 transition-all duration-300"
              >
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400/60 flex items-center justify-center text-3xl shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      🏎️
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 text-[10px] font-black text-emerald-300 uppercase tracking-widest mb-1">
                        ⚡ GAME TỐC ĐỘ TÀI SẢN
                      </div>
                      <h2 className="text-lg sm:text-xl font-black text-emerald-100 group-hover:text-emerald-300 transition-colors">
                        Đua Xe Lãi Kép & Hòn Tuyết Lăn
                      </h2>
                      <p className="text-xs text-stone-300 mt-1 max-w-lg leading-relaxed">
                        Lựa chọn chiến lược phân bổ vốn (An toàn, Cân bằng, Tăng trưởng, Đòn bẩy), vượt biến động thị trường để đạt $1,000,000!
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-stone-950 font-black text-xs sm:text-sm shadow-lg group-hover:scale-105 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Tăng Tốc Ngay</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>

              {/* Standard Mini Games Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
              {GAMES.map((g) => {
                const a = ACCENT[g.accent] ?? ACCENT.emerald;
                return (
                  <button
                    key={g.id}
                    onClick={() => {
                      setActiveGame(g.id);
                      setDifficulty("trung-binh");
                      setInnerTab("play");
                      trackFeatureClick("game_open", { label: g.id });
                    }}
                    className={`group text-left rounded-2xl border border-stone-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${a.ring} ${a.shadow}`}
                  >
                    {/* Glowing background spot in the corner */}
                    <div className={`absolute -bottom-8 -right-8 w-24 h-24 ${a.glow} rounded-full blur-xl pointer-events-none transition-transform duration-500 group-hover:scale-125`} />
                    
                    <div className="flex items-start gap-4 relative z-10">
                      <span className={`flex-shrink-0 w-13 h-13 rounded-2xl bg-gradient-to-br ${a.grad} text-white text-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2`}>
                        {g.emoji}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-extrabold text-stone-900 group-hover:text-stone-950 transition-colors">{g.title}</p>
                          <span className="text-[9px] font-extrabold uppercase tracking-wider text-stone-400 shrink-0 bg-stone-50 px-1.5 py-0.5 rounded">
                            {g.mechanic === "bucket" ? "Phân loại 📥" : "Ghép cặp 🔗"}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">{g.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                            ⭐ Tối đa +50 XP/ván
                          </span>
                          <span className="text-[10px] font-bold text-stone-400 flex items-center gap-1">
                            👥 {getIllustrativeCount(g.id, 8, 140)} đang chơi
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-center justify-between mt-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-2 rounded-xl transition-all duration-300 ${a.chip} group-hover:shadow-sm`}>
                        Chơi ngay
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
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

        {showMillionaireModal && (
          <WallStreetMillionaireGame
            userId={userId}
            onClose={() => setShowMillionaireModal(false)}
          />
        )}

        {showRacerModal && (
          <SnowballRacerGame
            userId={userId}
            onClose={() => setShowRacerModal(false)}
          />
        )}
      </div>
    );
  }

  const meta = getGameMeta(activeGame);
  const a = ACCENT[meta.accent] ?? ACCENT.emerald;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <button
          onClick={() => setActiveGame(null)}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-500 hover:text-stone-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Chọn game khác
        </button>

        <div className="mb-4 sm:mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${a.grad} text-white text-xl flex items-center justify-center flex-shrink-0`}>
              {meta.emoji}
            </span>
            <h1 className="text-lg sm:text-xl font-bold text-stone-900">{meta.title}</h1>
          </div>
          <button
            onClick={() => {
              const next = !soundsEnabled;
              soundManager.setEnabled(next);
              setSoundsEnabled(next);
              if (next) soundManager.playCorrect();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 p-2 rounded-lg hover:bg-stone-100 transition-colors"
            title={soundsEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
          >
            {soundsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundsEnabled ? "Âm thanh" : "Tắt âm"}</span>
          </button>
        </div>

        {innerTab === "play" && (
          <div className="mb-4 sm:mb-6">
            <p className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest mb-2">Độ khó</p>
            <div className="flex flex-wrap gap-2">
              {GAME_DIFFICULTIES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDifficulty(d.id)}
                  title={d.hint}
                  className={`text-xs font-bold px-3 py-2 rounded-xl border-2 transition-all ${
                    difficulty === d.id
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-200 text-stone-600 hover:border-stone-400"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-1 sm:gap-1.5 mb-4 sm:mb-6 bg-stone-100 rounded-xl p-1 sm:p-1.5">
          {[
            { id: "play" as const, label: "Chơi", short: "Chơi", icon: Gamepad2 },
            { id: "leaderboard" as const, label: "Bảng xếp hạng", short: "BXH", icon: Trophy },
            { id: "history" as const, label: "Lịch sử", short: "LS", icon: HistoryIcon },
          ].map(({ id, label, short, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setInnerTab(id);
                trackFeatureClick("game_inner_tab_click", { label: id });
              }}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all ${
                innerTab === id
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
