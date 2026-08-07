"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, 
  Sparkles, RefreshCw, Calendar, BookOpen, AlertTriangle, ShieldCheck, 
  DollarSign, PieChart, Layers, ChevronRight, Zap, CheckCircle2 
} from "lucide-react";
import { toast } from "sonner";
import { advanceMarket } from "@/lib/market-sim";
import { INITIAL_VN30_STOCKS, MARKET_NEWS_POOL, type StockItem, type MarketNewsEvent } from "@/lib/vn30-stock-data";
import { createClient } from "@/lib/supabase";
import { recalculateUserStats } from "@/lib/supabase-user";
import { recordCustomGameSession } from "@/lib/games";
import ModeLeaderboard from "@/components/games/ModeLeaderboard";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

interface PortfolioPosition {
  ticker: string;
  shares: number;
  avgPrice: number;
}

export default function FinancialGuildWidget({ userId }: { userId: string }) {
  const { t } = useI18n();
  const INITIAL_CASH = 1000000000; // 1 Tỷ VNĐ vốn ban đầu

  const [stocks, setStocks] = useState<StockItem[]>(INITIAL_VN30_STOCKS);
  const [cash, setCash] = useState<number>(INITIAL_CASH);
  const [positions, setPositions] = useState<Record<string, PortfolioPosition>>({});
  const [simulatedDay, setSimulatedDay] = useState(1);
  const [selectedSector, setSelectedSector] = useState<string>("all");

  // Trade Modal state
  const [activeTradeStock, setActiveTradeStock] = useState<StockItem | null>(null);
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [tradeShares, setTradeShares] = useState<number>(100);

  // Market News Alert
  const [currentNews, setCurrentNews] = useState<MarketNewsEvent | null>(null);

  // Financial Lessons History
  const [learnedLessons, setLearnedLessons] = useState<{ title: string; desc: string; type: "risk" | "profit" | "diversify" }[]>([]);

  // Unique Sectors
  const sectors = useMemo(() => {
    const set = new Set<string>();
    INITIAL_VN30_STOCKS.forEach((s) => set.add(s.sector));
    return ["all", ...Array.from(set)];
  }, []);

  // Total Portfolio Value
  const stockValue = useMemo(() => {
    return Object.values(positions).reduce((acc, pos) => {
      const stock = stocks.find((s) => s.ticker === pos.ticker);
      const price = stock ? stock.currentPrice : pos.avgPrice;
      return acc + pos.shares * price;
    }, 0);
  }, [positions, stocks]);

  const totalFundValue = cash + stockValue;
  const fundReturnPercent = ((totalFundValue - INITIAL_CASH) / INITIAL_CASH) * 100;

  async function recordFundSnapshot(nextStocks: StockItem[], nextCash: number, nextPositions: Record<string, PortfolioPosition>, nextDay: number) {
    if (!userId) return;

    const nextStockValue = Object.values(nextPositions).reduce((acc, pos) => {
      const stock = nextStocks.find((s) => s.ticker === pos.ticker);
      const price = stock ? stock.currentPrice : pos.avgPrice;
      return acc + pos.shares * price;
    }, 0);

    const nextFundValue = nextCash + nextStockValue;
    const returnPct = ((nextFundValue - INITIAL_CASH) / INITIAL_CASH) * 100;
    const score = Math.max(0, Math.round(returnPct * 100 + nextDay * 5));
    const xpEarned = returnPct <= 0 ? 0 : Math.min(50, Math.max(10, Math.round(returnPct * 3 + nextDay / 5)));

    try {
      await recordCustomGameSession(userId, "vn30-fund-sim", score, 5000, xpEarned);
      await recalculateUserStats(userId);
    } catch (error) {
      console.error("Error recording fund sim snapshot:", error);
    }
  }

  // Advance Time (Simulate Days)
  //
  // Toàn bộ phép mô phỏng nằm ở lib/market-sim.ts: hàm khai trong thân
  // component bị React Compiler đọc như code có thể chạy lúc render, nên
  // Math.random() ở đây bị chặn dù nó chỉ chạy từ onClick - và quan trọng
  // hơn, ở ngoài đó nó kiểm được bằng test với nguồn ngẫu nhiên ghim sẵn.
  function advanceDays(numDays: number) {
    const { stocks: newStocks, news } = advanceMarket(stocks, numDays, MARKET_NEWS_POOL);
    setCurrentNews(news);
    setStocks(newStocks);
    const nextDay = simulatedDay + numDays;
    setSimulatedDay(nextDay);
    toast.success(format(t.finalTwo.financialGuildWidget.advancedDays, { numDays }));

    // Evaluate Portfolio Risk & Generate Financial Lessons
    evaluatePortfolioLessons(newStocks);
    void recordFundSnapshot(newStocks, cash, positions, nextDay);
  }

  function evaluatePortfolioLessons(currentStocks: StockItem[]) {
    const newLessons: { title: string; desc: string; type: "risk" | "profit" | "diversify" }[] = [];

    // Check Diversification
    const posList = Object.values(positions).filter((p) => p.shares > 0);
    if (posList.length === 1 && stockValue > 200000000) {
      newLessons.push({
        title: "⚠️ Cảnh Báo Tập Trung Vốn (Concentration Risk)",
        desc: "Bạn đang dồn hơn 80% giá trị danh mục vào duy nhất 1 mã cổ phiếu. Bài học: Đa dạng hóa danh mục (Diversification) giúp giảm thiểu rủi ro phi hệ thống khi doanh nghiệp gặp tin xấu!",
        type: "diversify",
      });
    }

    // Check Unrealized Loss
    posList.forEach((pos) => {
      const stock = currentStocks.find((s) => s.ticker === pos.ticker);
      if (stock) {
        const lossPercent = ((stock.currentPrice - pos.avgPrice) / pos.avgPrice) * 100;
        if (lossPercent <= -8) {
          newLessons.push({
            title: `🛡️ Bài Học Nguyên Tắc Cắt Lỗ Stop-Loss (${pos.ticker} ${lossPercent.toFixed(1)}%)`,
            desc: `Mã ${pos.ticker} đã vi phạm mốc cắt lỗ chuẩn -8%. Bài học: Kỷ luật cắt lỗ sớm giúp bảo vệ quy mô vốn Quỹ để tái cơ cấu vào các cơ hội mới tốt hơn!`,
            type: "risk",
          });
        } else if (lossPercent >= 15) {
          newLessons.push({
            title: `🎉 Bài Học Chốt Lời Take-Profit (${pos.ticker} +${lossPercent.toFixed(1)}%)`,
            desc: `Mã ${pos.ticker} đang đạt mức sinh lời ấn tượng! Bài học: Chốt lời từng phần (Scaling Out) giúp hiện thực hóa lợi nhuận thực tế thay vì chỉ nắm giữ lãi trên giấy.`,
            type: "profit",
          });
        }
      }
    });

    if (newLessons.length > 0) {
      setLearnedLessons((prev) => [...newLessons, ...prev].slice(0, 5));
    }
  }

  // Execute Trade (Buy / Sell)
  function executeTrade() {
    if (!activeTradeStock) return;
    const ticker = activeTradeStock.ticker;
    const price = activeTradeStock.currentPrice;
    const totalCost = price * tradeShares;

    if (tradeType === "buy") {
      if (cash < totalCost) {
        toast.error(t.guild.insufficientCash);
        return;
      }
      const existing = positions[ticker] || { ticker, shares: 0, avgPrice: 0 };
      const newTotalShares = existing.shares + tradeShares;
      const newAvgPrice = Math.round((existing.shares * existing.avgPrice + totalCost) / newTotalShares);

      setCash((c) => c - totalCost);
      setPositions((prev) => ({
        ...prev,
        [ticker]: { ticker, shares: newTotalShares, avgPrice: newAvgPrice },
      }));

      toast.success(
        format(t.finalTwo.financialGuildWidget.boughtShares, {
          shares: tradeShares.toLocaleString(),
          ticker,
          price: price.toLocaleString(),
        })
      );
    } else {
      // Sell
      const existing = positions[ticker];
      if (!existing || existing.shares < tradeShares) {
        toast.error(t.guild.insufficientShares);
        return;
      }

      const newShares = existing.shares - tradeShares;
      const proceeds = price * tradeShares;
      const realizedPnL = (price - existing.avgPrice) * tradeShares;

      setCash((c) => c + proceeds);
      if (newShares === 0) {
        setPositions((prev) => {
          const copy = { ...prev };
          delete copy[ticker];
          return copy;
        });
      } else {
        setPositions((prev) => ({
          ...prev,
          [ticker]: { ...existing, shares: newShares },
        }));
      }

      if (realizedPnL >= 0) {
        toast.success(
          format(t.finalTwo.financialGuildWidget.soldProfit, {
            shares: tradeShares.toLocaleString(),
            ticker,
            pnl: realizedPnL.toLocaleString(),
          })
        );
      } else {
        toast.error(
          format(t.finalTwo.financialGuildWidget.soldLoss, {
            shares: tradeShares.toLocaleString(),
            ticker,
            pnl: realizedPnL.toLocaleString(),
          })
        );
      }
    }

    setActiveTradeStock(null);
  }

  // Reset Fund
  function resetPortfolio() {
    setCash(INITIAL_CASH);
    setPositions({});
    setStocks(INITIAL_VN30_STOCKS);
    setSimulatedDay(1);
    setLearnedLessons([]);
    toast.message(t.guild.rebalanced);
  }

  const filteredStocks = selectedSector === "all" ? stocks : stocks.filter((s) => s.sector === selectedSector);

  const [showGuide, setShowGuide] = useState(true);

  // Time Simulator Advance Buttons
  return (
    <div className="h-full min-h-0 bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-7 shadow-xl text-stone-900 relative overflow-hidden flex flex-col">
      {/* Visual Background Lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-200 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-black tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              {t.guild.clanTitle}
            </span>
            <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              {t.guild.universe}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-2">
            {t.guild.subtitle}
          </h2>
        </div>

        {/* Time Simulator Advance Buttons & Guide Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>{showGuide ? t.guild.hideGuide : t.guild.showGuide}</span>
          </button>

          <button
            onClick={() => advanceDays(7)}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Calendar className="w-4 h-4" /> {t.guild.advance7}
          </button>
          <button
            onClick={() => advanceDays(30)}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Zap className="w-4 h-4" /> {t.guild.advance30}
          </button>
          <button
            onClick={resetPortfolio}
            className="bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-bold px-3 py-2.5 rounded-xl transition-all border border-stone-200"
            title={t.guild.rebalanceTitle}
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        {/* 📖 GAME PLAY GUIDE ACCORDION BANNER */}
        <AnimatePresence>
          {showGuide && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-amber-50/80 p-4 sm:p-5 shadow-md overflow-hidden text-stone-900"
            >
              <div className="flex items-center justify-between gap-3 mb-3 border-b border-amber-200/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  <h4 className="text-sm font-black uppercase text-amber-900 tracking-wider">
                    {t.guild.guideTitle}
                  </h4>
                </div>
                <button
                  onClick={() => setShowGuide(false)}
                  className="text-stone-400 hover:text-stone-700 text-xs font-extrabold cursor-pointer"
                >
                  {t.guild.close}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="bg-white/95 border border-amber-200 rounded-xl p-3 shadow-2xs space-y-1">
                  <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider block">
                    {t.guild.step1Title}
                  </span>
                  <p className="text-stone-700 font-semibold leading-relaxed">
                    {t.guild.step1Part1}
                    <strong className="text-amber-800">{t.guild.step1Amount}</strong>
                    {t.guild.step1Part2}
                  </p>
                </div>

                <div className="bg-white/95 border border-emerald-200 rounded-xl p-3 shadow-2xs space-y-1">
                  <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block">
                    {t.guild.step2Title}
                  </span>
                  <p className="text-stone-700 font-semibold leading-relaxed">
                    {t.guild.step2Part1}
                    <strong className="text-emerald-800">{t.guild.step2Tickers}</strong>
                    {t.guild.step2Part2}
                    <strong className="text-emerald-700">{t.guild.buy}</strong>
                    {t.guild.step2Part3}
                    <strong className="text-rose-600">{t.guild.sell}</strong>
                    {t.guild.step2Part4}
                  </p>
                </div>

                <div className="bg-white/95 border border-sky-200 rounded-xl p-3 shadow-2xs space-y-1">
                  <span className="text-[10px] font-black text-sky-800 uppercase tracking-wider block">
                    {t.guild.step3Title}
                  </span>
                  <p className="text-stone-700 font-semibold leading-relaxed">
                    {t.guild.step3Part1}
                    <strong className="text-sky-800">{t.guild.advance7}</strong>
                    {t.guild.step3Part2}
                    <strong className="text-sky-800">{t.guild.step3Advance30Short}</strong>
                    {t.guild.step3Part3}
                  </p>
                </div>

                <div className="bg-white/95 border border-purple-200 rounded-xl p-3 shadow-2xs space-y-1">
                  <span className="text-[10px] font-black text-purple-800 uppercase tracking-wider block">
                    {t.guild.step4Title}
                  </span>
                  <p className="text-stone-700 font-semibold leading-relaxed">
                    {t.guild.step4Part1}
                    <strong className="text-purple-800">{t.guild.step4Board}</strong>
                    {t.guild.step4Part2}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      {/* Fund Capital Dashboard Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl">
          <span className="text-[10px] font-black uppercase text-amber-700 block mb-1">{t.guild.totalAssets}</span>
          <span className="text-lg font-black text-amber-600">{totalFundValue.toLocaleString()} {t.guild.currency}</span>
          <span className={`text-xs font-extrabold flex items-center gap-1 mt-1 ${fundReturnPercent >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
            {fundReturnPercent >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {fundReturnPercent >= 0 ? "+" : ""}{fundReturnPercent.toFixed(2)}{t.guild.percentOfFund}
          </span>
        </div>

        <div className="bg-white border border-stone-200 p-4 rounded-2xl">
          <span className="text-[10px] font-black uppercase text-stone-500 block mb-1">{t.guild.availableCash}</span>
          <span className="text-base font-black text-emerald-600">{cash.toLocaleString()} {t.guild.currency}</span>
          <span className="text-[10px] text-stone-400 block mt-1">{t.guild.buyingPowerLeft}</span>
        </div>

        <div className="bg-white border border-stone-200 p-4 rounded-2xl">
          <span className="text-[10px] font-black uppercase text-stone-500 block mb-1">{t.guild.stockValue}</span>
          <span className="text-base font-black text-sky-600">{stockValue.toLocaleString()} {t.guild.currency}</span>
          <span className="text-[10px] text-stone-400 block mt-1">{format(t.guild.holdingsCount, { count: Object.keys(positions).length })}</span>
        </div>

        <div className="bg-white border border-stone-200 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-stone-500 block mb-1">{t.guild.simulatedTime}</span>
            <span className="text-base font-black text-stone-900">{format(t.guild.dayNumber, { day: simulatedDay })}</span>
          </div>
          <Calendar className="w-8 h-8 text-amber-500 opacity-70" />
        </div>
      </div>

      <div className="mb-6">
        <ModeLeaderboard
          gameType="vn30-fund-sim"
          title={t.guild.leaderboardTitle}
          formatter={(entry) => `${(entry.bestScore / 100).toFixed(1)}%`}
        />
      </div>

      {/* Market News Flash Alert */}
      {currentNews && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-6 space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <h4 className="text-xs font-black text-amber-700">{currentNews.headline}</h4>
          </div>
          <p className="text-[11px] text-stone-600 leading-relaxed pl-6">{currentNews.explanation}</p>
        </motion.div>
      )}

      {/* Learned Investment Lessons Feed */}
      {learnedLessons.length > 0 && (
        <div className="bg-violet-50 border border-violet-200 p-4 rounded-2xl mb-6 space-y-3">
          <span className="text-[11px] font-black uppercase tracking-wider text-violet-700 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-violet-500" /> {t.guild.lessonFromPortfolio}
          </span>
          <div className="space-y-2">
            {learnedLessons.map((l, i) => (
              <div key={i} className="bg-white border border-violet-200 p-3 rounded-xl text-xs space-y-1">
                <h5 className="font-bold text-amber-700">{l.title}</h5>
                <p className="text-stone-600 text-[11px] leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sector Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-4">
        {sectors.map((sec) => (
          <button
            key={sec}
            onClick={() => setSelectedSector(sec)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition-all ${
              selectedSector === sec
                ? "bg-amber-500 text-stone-950 border-amber-400 shadow-md font-black"
                : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
            }`}
          >
            {sec === "all" ? t.guild.allVn30 : sec}
          </button>
        ))}
      </div>

      {/* Stock Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm mb-6">
        <div className="max-h-[min(62vh,720px)] overflow-auto overscroll-contain">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-stone-200 bg-stone-50 text-[10px] uppercase font-black text-stone-500">
                <th className="py-3 px-4">{t.guild.colTicker}</th>
                <th className="py-3 px-4">{t.guild.colSector}</th>
                <th className="py-3 px-4 text-right">{t.guild.colPrice}</th>
                <th className="py-3 px-4 text-right">{t.guild.colChange}</th>
                <th className="py-3 px-4 text-center">{t.guild.colHolding}</th>
                <th className="py-3 px-4 text-right">{t.guild.colPnl}</th>
                <th className="py-3 px-4 text-center">{t.guild.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-xs">
              {filteredStocks.map((stock) => {
                const priceDiff = stock.currentPrice - stock.previousPrice;
                const percentChange = stock.previousPrice > 0 ? (priceDiff / stock.previousPrice) * 100 : 0;
                const pos = positions[stock.ticker];

                let unrealizedPnL = 0;
                let unrealizedPnLPercent = 0;
                if (pos && pos.shares > 0) {
                  unrealizedPnL = (stock.currentPrice - pos.avgPrice) * pos.shares;
                  unrealizedPnLPercent = ((stock.currentPrice - pos.avgPrice) / pos.avgPrice) * 100;
                }

                return (
                  <tr key={stock.ticker} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-amber-700 text-sm bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {stock.ticker}
                        </span>
                        <div>
                          <span className="font-bold text-stone-900 block">{stock.name}</span>
                          <span className="text-[10px] text-stone-500 block truncate max-w-xs">{stock.description}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-[10px] font-extrabold bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full border border-stone-200">
                        {stock.sector}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right font-black text-stone-900">
                      {stock.currentPrice.toLocaleString()} đ
                    </td>

                    <td className="py-3 px-4 text-right font-extrabold">
                      <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded ${percentChange >= 0 ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-rose-50 text-rose-500 border border-rose-200"}`}>
                        {percentChange >= 0 ? "+" : ""}{percentChange.toFixed(1)}%
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center font-bold text-stone-600">
                      {pos && pos.shares > 0 ? (
                        <div>
                          <span className="text-amber-700 font-extrabold">{pos.shares.toLocaleString()} cp</span>
                          <span className="text-[10px] text-stone-500 block">{t.guild.costBasis} {pos.avgPrice.toLocaleString()}đ</span>
                        </div>
                      ) : (
                        <span className="text-stone-300">-</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right font-bold">
                      {pos && pos.shares > 0 ? (
                        <span className={unrealizedPnL >= 0 ? "text-emerald-600" : "text-rose-500"}>
                          {unrealizedPnL >= 0 ? "+" : ""}{unrealizedPnL.toLocaleString()} đ
                          <span className="block text-[10px]">({unrealizedPnLPercent >= 0 ? "+" : ""}{unrealizedPnLPercent.toFixed(1)}%)</span>
                        </span>
                      ) : (
                        <span className="text-stone-300">-</span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            setActiveTradeStock(stock);
                            setTradeType("buy");
                            setTradeShares(100);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black px-2.5 py-1 rounded-lg transition-all"
                        >
                          {t.guild.buy}
                        </button>
                        <button
                          disabled={!pos || pos.shares === 0}
                          onClick={() => {
                            setActiveTradeStock(stock);
                            setTradeType("sell");
                            setTradeShares(pos ? pos.shares : 100);
                          }}
                          className="bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-black px-2.5 py-1 rounded-lg transition-all disabled:opacity-30 disabled:pointer-events-none"
                        >
                          {t.guild.sell}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      </div>

      {/* Trade Modal Dialog */}
      <AnimatePresence>
        {activeTradeStock && (
          <div className="fixed inset-0 bg-white/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white border-2 border-amber-200 p-6 rounded-3xl max-w-md w-full text-stone-900 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <span className="text-xs font-black uppercase text-amber-700">
                  {tradeType === "buy" ? t.guild.buyOrderTitle : t.guild.sellOrderTitle} - {activeTradeStock.ticker}
                </span>
                <button onClick={() => setActiveTradeStock(null)} className="text-stone-400 hover:text-stone-900 text-xs font-bold">{t.guild.close}</button>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                <h4 className="font-bold text-sm text-amber-700">{activeTradeStock.name} ({activeTradeStock.ticker})</h4>
                <p className="text-xs text-stone-600">{t.guild.currentPrice} <strong className="text-emerald-600">{activeTradeStock.currentPrice.toLocaleString()} {t.guild.currency}</strong></p>
                <p className="text-[11px] text-stone-500">{activeTradeStock.description}</p>
              </div>

              {/* Trade Input Form */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-stone-600 block">{t.guild.shareCount}</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[100, 500, 1000, 5000].map((num) => (
                    <button
                      key={num}
                      onClick={() => setTradeShares(num)}
                      className={`py-1.5 text-xs font-bold rounded-xl border transition-all ${
                        tradeShares === num ? "bg-amber-500 text-stone-950 border-amber-400 font-black" : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      {num.toLocaleString()} cp
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  min={100}
                  step={100}
                  value={tradeShares}
                  onChange={(e) => setTradeShares(Math.max(100, Number(e.target.value)))}
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-sm font-bold text-stone-900 focus:outline-none focus:border-amber-500"
                />

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs space-y-1">
                  <div className="flex justify-between text-stone-500">
                    <span>{t.guild.orderTotal}</span>
                    <strong className="text-amber-700">{(activeTradeStock.currentPrice * tradeShares).toLocaleString()} {t.guild.currency}</strong>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>{t.guild.cashAvailable}</span>
                    <strong className="text-emerald-600">{cash.toLocaleString()} {t.guild.currency}</strong>
                  </div>
                </div>

                <button
                  onClick={executeTrade}
                  className={`w-full py-3.5 rounded-2xl font-black text-white text-sm shadow-lg transition-all ${
                    tradeType === "buy" ? "bg-emerald-600 hover:bg-emerald-500" : "bg-rose-600 hover:bg-rose-500"
                  }`}
                >
                  {t.guild.confirmPrefix} {tradeType === "buy" ? t.guild.buy : t.guild.sell} {tradeShares.toLocaleString()} {t.guild.confirmSuffix} {activeTradeStock.ticker}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
