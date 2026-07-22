"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BarChart3, TrendingUp, Users, Trophy, Zap, Award, RefreshCw } from "lucide-react";
import { getGameSessionStats } from "./actions";

interface GameStats {
  totalGamesPlayed: number;
  totalPlayersEngaged: number;
  averageScorePerGame: number;
  totalXpFromGames: number;
  mostPlayedGame: string;
  dailyActiveGamers: number;
  gameTypeStats: Array<{
    gameType: string;
    timesPlayed: number;
    totalXp: number;
    averageXp: number;
    averageScore: number;
  }>;
}

export default function GamesAdminClient() {
  const [stats, setStats] = useState<GameStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<"overview" | "players" | "performance" | "earnings">("overview");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadGameStats();
  }, []);

  const loadGameStats = async () => {
    try {
      setLoading(true);
      const data = await getGameSessionStats();
      setStats(data);
    } catch (error) {
      console.error("Error loading game stats:", error);
      toast.error("Không thể tải thống kê trò chơi");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await loadGameStats();
      toast.success("Đã cập nhật thống kê");
    } catch (error) {
      toast.error("Lỗi khi cập nhật thống kê");
    } finally {
      setRefreshing(false);
    }
  };

  const statCards = [
    {
      label: "Trò chơi được chơi",
      value: stats?.totalGamesPlayed ?? 0,
      icon: Gamepad2,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/40",
    },
    {
      label: "Người chơi tích cực",
      value: stats?.totalPlayersEngaged ?? 0,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/40",
    },
    {
      label: "Điểm trung bình",
      value: stats?.averageScorePerGame ?? 0,
      icon: Trophy,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
    },
    {
      label: "XP từ trò chơi",
      value: stats?.totalXpFromGames ?? 0,
      icon: Zap,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-stone-300 dark:border-stone-700 border-t-stone-900 dark:border-t-stone-100 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 font-semibold text-sm transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          Cập nhật
        </button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 hover:border-stone-300 dark:hover:border-stone-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{card.value.toLocaleString()}</p>
              <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-2">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl">
        <div className="flex border-b border-stone-200 dark:border-stone-800">
          {[
            { id: "overview", label: "Tổng quan", icon: BarChart3 },
            { id: "players", label: "Người chơi", icon: Users },
            { id: "performance", label: "Hiệu suất", icon: TrendingUp },
            { id: "earnings", label: "Thu nhập XP", icon: Award },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = selectedMetric === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedMetric(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  isActive
                    ? "border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400"
                    : "border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {selectedMetric === "overview" && (
            <div className="space-y-4">
              <h3 className="font-bold text-stone-900 dark:text-stone-100">Tổng quan trò chơi</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-stone-50 dark:bg-stone-950/50 rounded-lg">
                  <p className="text-xs text-stone-500 dark:text-stone-400">Trò chơi phổ biến nhất</p>
                  <p className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-1">{stats?.mostPlayedGame}</p>
                </div>
                <div className="p-4 bg-stone-50 dark:bg-stone-950/50 rounded-lg">
                  <p className="text-xs text-stone-500 dark:text-stone-400">Người chơi hôm nay</p>
                  <p className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-1">{stats?.dailyActiveGamers}</p>
                </div>
              </div>

              {/* Game Type Breakdown */}
              <div className="mt-6">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">Thống kê từng trò chơi</h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {stats?.gameTypeStats && stats.gameTypeStats.length > 0 ? (
                    stats.gameTypeStats.map((game) => (
                      <div
                        key={game.gameType}
                        className="p-3 bg-stone-50 dark:bg-stone-950/50 rounded-lg border border-stone-200 dark:border-stone-800"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm capitalize">
                            {game.gameType.replace(/-/g, " ")}
                          </p>
                          <span className="text-xs bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 px-2 py-1 rounded">
                            {game.timesPlayed} lần
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <p className="text-stone-500 dark:text-stone-400">Tổng XP</p>
                            <p className="font-bold text-stone-900 dark:text-stone-100">{game.totalXp.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-stone-500 dark:text-stone-400">XP trung bình</p>
                            <p className="font-bold text-stone-900 dark:text-stone-100">{game.averageXp}</p>
                          </div>
                          <div>
                            <p className="text-stone-500 dark:text-stone-400">Điểm TB</p>
                            <p className="font-bold text-stone-900 dark:text-stone-100">{game.averageScore}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-stone-500 dark:text-stone-400 text-center py-4">Chưa có dữ liệu trò chơi</p>
                  )}
                </div>
              </div>

              <p className="text-xs text-stone-500 dark:text-stone-400 mt-4">
                💡 Tip: Theo dõi các trò chơi có tỷ lệ hoàn thành thấp để cải thiện trải nghiệm người dùng
              </p>
            </div>
          )}

          {selectedMetric === "players" && (
            <div className="space-y-4">
              <h3 className="font-bold text-stone-900 dark:text-stone-100">Phân tích người chơi</h3>
              <div className="p-4 bg-stone-50 dark:bg-stone-950/50 rounded-lg">
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Hiện có <span className="font-bold text-stone-900 dark:text-stone-100">{stats?.totalPlayersEngaged}</span> người chơi đã tham gia trò chơi trong khoảng thời gian này.
                </p>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-4">
                📊 Tính năng chi tiết sẽ sớm được thêm
              </p>
            </div>
          )}

          {selectedMetric === "performance" && (
            <div className="space-y-4">
              <h3 className="font-bold text-stone-900 dark:text-stone-100">Hiệu suất trò chơi</h3>
              <div className="p-4 bg-stone-50 dark:bg-stone-950/50 rounded-lg">
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Điểm trung bình mỗi trò chơi: <span className="font-bold text-stone-900 dark:text-stone-100">{stats?.averageScorePerGame.toLocaleString()}</span>
                </p>
              </div>

              {/* Performance by Game Type */}
              {stats?.gameTypeStats && stats.gameTypeStats.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">Hiệu suất chi tiết</h4>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {stats.gameTypeStats.map((game) => (
                      <div
                        key={game.gameType}
                        className="p-3 bg-stone-50 dark:bg-stone-950/50 rounded-lg border border-stone-200 dark:border-stone-800"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-stone-900 dark:text-stone-100 text-sm capitalize">
                            {game.gameType.replace(/-/g, " ")}
                          </p>
                          <div className="flex gap-4 text-xs">
                            <div className="text-right">
                              <p className="text-stone-500 dark:text-stone-400">Điểm TB</p>
                              <p className="font-bold text-emerald-600 dark:text-emerald-400">{game.averageScore}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-stone-500 dark:text-stone-400">Tỷ lệ</p>
                              <p className="font-bold text-amber-600 dark:text-amber-400">
                                {game.timesPlayed > 0 ? ((game.averageScore / 10000) * 100).toFixed(1) : "0"}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-stone-500 dark:text-stone-400 mt-4">
                📈 Dữ liệu được cập nhật từ trò chơi thực tế
              </p>
            </div>
          )}

          {selectedMetric === "earnings" && (
            <div className="space-y-4">
              <h3 className="font-bold text-stone-900 dark:text-stone-100">Thu nhập XP từ trò chơi</h3>
              <div className="p-4 bg-stone-50 dark:bg-stone-950/50 rounded-lg">
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Tổng XP được tặng từ trò chơi: <span className="font-bold text-stone-900 dark:text-stone-100">{stats?.totalXpFromGames.toLocaleString()}</span>
                </p>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-4">
                💰 Công cụ quản lý phần thưởng sẽ được cập nhật sớm
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6">
        <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4">Hành động</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-colors">
            🎮 Kiểm tra trạng thái trò chơi
          </button>
          <button className="px-4 py-2 rounded-lg bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 font-semibold text-sm transition-colors">
            📊 Xuất báo cáo
          </button>
          <button className="px-4 py-2 rounded-lg bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 font-semibold text-sm transition-colors">
            ⚙️ Cấu hình trò chơi
          </button>
        </div>
      </div>
    </div>
  );
}
