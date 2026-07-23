"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { getRequiredLevelForBuilding } from "@/lib/levels";
import { toast } from "sonner";
import FinanceCharacterAvatar, { CharacterEquipments } from "@/components/FinanceCharacterAvatar";

// Sub-feature Component Imports
import CosmeticStore from "@/components/CosmeticStore";
import FinanceCardCollection from "@/components/FinanceCardCollection";
import WeeklyChallengeWidget from "@/components/WeeklyChallengeWidget";
import WorldBossRaidWidget from "@/components/WorldBossRaidWidget";
import FinancialGuildWidget from "@/components/FinancialGuildWidget";
import PvpDuelModal from "@/components/PvpDuelModal";
import GameHubClient from "@/components/games/GameHubClient";
import CandlestickGame from "@/components/games/CandlestickGame";
import MaSpeedrunGame from "@/components/games/MaSpeedrunGame";
import AlgoTraderGame from "@/components/games/AlgoTraderGame";

interface OrganicBuilding {
  id: string;
  name: string;
  subtitle: string;
  emoji: string;
  badge: string;
  bgLight: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
  posClass: string; // Legacy mobile/absolute positioning hint.
  desktopClass: string;
  imageSrc?: string;
}

interface EquipmentRow {
  slot: keyof CharacterEquipments;
  asset_key: string;
}

interface ProgressRow {
  lesson_id: string | number;
}

const ORGANIC_BUILDINGS: OrganicBuilding[] = [
  // KHU VỰC 1: SÀN GIAO DỊCH NYSE & TRADING PIT
  {
    id: "world-boss",
    name: "Sàn NYSE & Boss Phố Wall",
    subtitle: "Săn Bò Tót Tăng Trưởng 1,000,000 HP",
    emoji: "🐂",
    badge: "🏛️ NYSE CENTRAL",
    bgLight: "bg-gradient-to-b from-amber-500/10 to-red-500/10",
    borderColor: "border-amber-400",
    textColor: "text-amber-700",
    badgeBg: "bg-gradient-to-r from-amber-500 to-red-500 text-white font-black",
    posClass: "top-4 left-1/2 -translate-x-1/2 sm:top-6",
    desktopClass: "lg:col-start-2 lg:row-start-1",
    imageSrc: "/charging-bull.jpg",
  },
  {
    id: "pvp",
    name: "Đấu Trường Kiến Thức Solo",
    subtitle: "Đánh Boss bằng câu hỏi từ bài bạn đã học",
    emoji: "🧠",
    badge: "🏛️ NYSE CENTRAL",
    bgLight: "bg-gradient-to-b from-sky-50 to-emerald-50",
    borderColor: "border-sky-300",
    textColor: "text-sky-700",
    badgeBg: "bg-sky-500 text-white",
    posClass: "top-20 left-6 sm:left-12",
    desktopClass: "lg:col-start-1 lg:row-start-2",
  },
  // KHU VỰC 2: TRUNG TÂM LUYỆN TẬP BCTC & KHÁI NIỆM
  {
    id: "arcade",
    name: "🔥 TỔNG HỢP MINI GAME",
    subtitle: "Tất Cả Game Phân Loại BCTC & Nối Thuật Ngữ",
    emoji: "🏛️",
    badge: "🔥 TỔNG HỢP MINI GAME",
    bgLight: "bg-gradient-to-b from-amber-500/20 via-orange-500/20 to-red-500/20",
    borderColor: "border-amber-400 ring-4 ring-amber-500/80 shadow-[0_0_50px_rgba(245,158,11,0.85)]",
    textColor: "text-amber-700",
    badgeBg: "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-black animate-pulse",
    posClass: "top-64 left-1/2 -translate-x-1/2 sm:top-60 scale-110 sm:scale-125 z-30",
    desktopClass: "lg:col-start-2 lg:row-start-3",
    imageSrc: "/nyse-building.jpg",
  },
  {
    id: "weekly-challenge",
    name: "Quảng Trường Times Square Financial Hub",
    subtitle: "Case Study Doanh Nghiệp & Bảng Tin Neon Phố Wall",
    emoji: "🏙️",
    badge: "🏙️ TIMES SQUARE",
    bgLight: "bg-gradient-to-b from-indigo-950/80 via-purple-950/70 to-rose-950/80 text-white",
    borderColor: "border-purple-400 ring-2 ring-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.6)]",
    textColor: "text-purple-600 font-extrabold",
    badgeBg: "bg-gradient-to-r from-violet-600 via-purple-500 to-rose-600 text-white font-black animate-pulse",
    posClass: "top-[320px] left-8 sm:left-20",
    desktopClass: "lg:col-start-1 lg:row-start-4",
    imageSrc: "/times-square.jpg",
  },

  // KHU VỰC 3: QUỸ ĐẦU TƯ & DỤNG CỤ
  {
    id: "guilds",
    name: "Quỹ Đầu Tư Wall Street",
    subtitle: "Hedge Fund Clan & Đua Top Bài Học",
    emoji: "🏰",
    badge: "🏰 HEDGE FUND QUARTER",
    bgLight: "bg-gradient-to-b from-purple-50 to-indigo-50",
    borderColor: "border-purple-400",
    textColor: "text-purple-600",
    badgeBg: "bg-purple-500 text-white",
    posClass: "top-[320px] right-8 sm:right-20",
    desktopClass: "lg:col-start-3 lg:row-start-4",
  },
  {
    id: "cards",
    name: "Bảo Tàng Thẻ VN30",
    subtitle: "Bộ Sưu Tập 30 Thẻ Doanh Nghiệp",
    emoji: "📇",
    badge: "🏰 HEDGE FUND QUARTER",
    bgLight: "bg-gradient-to-b from-sky-50 to-cyan-50",
    borderColor: "border-sky-400",
    textColor: "text-sky-600",
    badgeBg: "bg-sky-500 text-white",
    posClass: "top-[480px] left-12 sm:left-28",
    desktopClass: "lg:col-start-1 lg:row-start-6",
  },
  {
    id: "shop",
    name: "Tiệm Đồ Executive Wall St.",
    subtitle: "Trang Bị Dụng Cụ & Tủ Đồ RPG",
    emoji: "💼",
    badge: "🏰 HEDGE FUND QUARTER",
    bgLight: "bg-gradient-to-b from-amber-50 to-yellow-50",
    borderColor: "border-amber-400",
    textColor: "text-amber-600",
    badgeBg: "bg-amber-500 text-white",
    posClass: "top-[480px] right-12 sm:right-28",
    desktopClass: "lg:col-start-3 lg:row-start-6",
  },
];

const BUILDING_AVATAR_POSITIONS: Record<string, { x: number; y: number }> = {
  "world-boss": { x: 50, y: 13 },
  pvp: { x: 18, y: 34 },
  arcade: { x: 50, y: 50 },
  "weekly-challenge": { x: 18, y: 68 },
  guilds: { x: 82, y: 68 },
  cards: { x: 18, y: 88 },
  shop: { x: 82, y: 88 },
};

export default function FinancialRpgWorldMap() {
  const searchParams = useSearchParams();
  const initialBuilding = searchParams.get("building");

  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(initialBuilding);
  const [user, setUser] = useState<{ id?: string; email?: string } | null>(null);
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(0);
  const [equippedGear, setEquippedGear] = useState<CharacterEquipments>({});
  const [showPvpModal, setShowPvpModal] = useState(false);
  const [hoveredBuildingPos, setHoveredBuildingPos] = useState<{ x: number; y: number } | null>(null);
  const [discoveredBuildings, setDiscoveredBuildings] = useState<string[]>(() => {
    if (typeof window === "undefined") return ["world-boss", "arcade"];

    const saved = localStorage.getItem("thtcdn_discovered_buildings");
    if (!saved) return ["world-boss", "arcade"];

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : ["world-boss", "arcade"];
    } catch (e) {
      console.error("Error reading saved discovered buildings:", e);
      return ["world-boss", "arcade"];
    }
  });
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        
        supabase
          .from("user_profiles")
          .select("current_level, coins, discovered_buildings")
          .eq("id", data.user.id)
          .single()
          .then(({ data: profile }) => {
              if (profile) {
                setLevel(profile.current_level || 1);
                setCoins(profile.coins || 0);
                if (profile.discovered_buildings && Array.isArray(profile.discovered_buildings) && profile.discovered_buildings.length > 0) {
                setDiscoveredBuildings(profile.discovered_buildings);
                if (typeof window !== "undefined") {
                  localStorage.setItem("thtcdn_discovered_buildings", JSON.stringify(profile.discovered_buildings));
                }
              }
            }
          });

        supabase
          .from("user_equipments")
          .select("slot, asset_key")
          .eq("user_id", data.user.id)
          .then(({ data: equips }) => {
            if (equips) {
              const gear: CharacterEquipments = {};
              (equips as EquipmentRow[]).forEach((e) => {
                gear[e.slot] = e.asset_key;
              });
              setEquippedGear(gear);
            }
          });

        supabase
          .from("user_progress")
          .select("lesson_id")
          .eq("user_id", data.user.id)
          .eq("completed", true)
          .then(({ data: progressRows }) => {
            if (progressRows) {
              setCompletedLessonIds((progressRows as ProgressRow[]).map((r) => Number(r.lesson_id)));
            }
          });
      }
    });

    // Check URL query parameter building
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const bParam = params.get("building");
      if (bParam) {
        setSelectedBuilding(bParam);
      }
    }

    const handleCoinUpdate = (e: Event) => {
      const detail = (e as CustomEvent<{ coins: number }>).detail;
      if (detail && typeof detail.coins === "number") setCoins(detail.coins);
    };
    window.addEventListener("thtcdn:coin-updated", handleCoinUpdate);
    return () => window.removeEventListener("thtcdn:coin-updated", handleCoinUpdate);
  }, []);

  const handleCloseBuilding = () => {
    setSelectedBuilding(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("building");
      window.history.replaceState({}, "", url.toString());
    }
  };

  const handleBuildingClick = (id: string) => {
    const isDiscovered = discoveredBuildings.includes(id);

    // Fog Discovery Unveil Event & LocalStorage Persistence
    if (!isDiscovered) {
      const updated = [...discoveredBuildings, id];
      setDiscoveredBuildings(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("thtcdn_discovered_buildings", JSON.stringify(updated));
      }
      const newCoins = coins + 5;
      setCoins(newCoins);
      toast.success(`🕵️ ĐÃ GIẢI MÃ VÙNG ĐẤT BÍ ẨN! Thưởng thám hiểm +5 Coins!`);
      if (user?.id) {
        createClient().from("user_profiles").update({ coins: newCoins, discovered_buildings: updated }).eq("id", user.id).then(({ error }) => {
          if (error) console.warn("Supabase user_profiles update notice:", error.message);
        });
      }
    }

    const reqLevel = getRequiredLevelForBuilding(id);
    if (level < reqLevel) {
      toast.error(`🔒 Công trình này yêu cầu Level ${reqLevel}! Hãy hoàn thành thêm bài học để mở khóa.`);
      return;
    }

    setSelectedBuilding(id);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("building", id);
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 p-4 sm:p-6 relative overflow-x-hidden transition-colors duration-500">
      {/* Bloomberg Terminal Style Market Ticker Tape */}
      <div className="bg-stone-950 text-amber-400 py-1.5 px-4 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 mb-4 text-[11px] font-mono border-b border-amber-500/30 overflow-hidden relative z-0 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-6 whitespace-nowrap overflow-x-auto scrollbar-none">
          <span className="font-bold text-white flex items-center gap-1 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" /> WALL STREET FEED
          </span>
          <span className="shrink-0">📈 VN-INDEX: 1,285.40 (+1.45%)</span>
          <span className="shrink-0 text-amber-300 font-bold">🐂 SĂN BOSS NYSE: 1,000,000 HP</span>
          <span className="shrink-0 text-sky-300 font-bold">🧠 ĐẤU TRƯỜNG SOLO: BOSS KIẾN THỨC ĐANG CHỜ</span>
          <span className="shrink-0 text-emerald-300 font-bold">💼 HEDGE FUND CLAN: TOP #1 WALL STREET</span>
        </div>
      </div>

      {!selectedBuilding && (
        <>
          {/* Wall Street Photo Background - only on town map */}
          <div className="absolute inset-0 pointer-events-none opacity-35 z-0 overflow-hidden">
            <Image
              src="/wallstreet-bg.jpg"
              alt="Wall Street Background"
              fill
              className="object-cover blur-[1px] grayscale"
              priority
            />
          </div>

          {/* Light Theme Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60 z-0" />
        </>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto z-10 relative">
        {!selectedBuilding ? (
          <div>
            {/* World Map Header */}
            <div className="text-center mb-6">
              <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                🐂 Wall Street Trading Hub
              </span>
              <h1 className="text-2xl sm:text-3xl font-black mt-2 text-stone-900">
                Đế Chế Tài Chính Wall Street
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                Khám phá Sàn NYSE, Săn Boss Cá Mập M&A, Đua Top Quỹ Đầu Tư Hedge Fund & Tháp Kỹ Năng CFA!
              </p>
            </div>

            {/* Mobile / Tablet View: Categorized District Grids */}
            <div className="md:hidden space-y-6">
              {["🏛️ NYSE CENTRAL", "🏢 TRADER SIMULATOR", "🏰 HEDGE FUND QUARTER"].map((districtName) => {
                const districtBuildings = ORGANIC_BUILDINGS.filter((b) => b.badge === districtName);
                if (districtBuildings.length === 0) return null;
                return (
                  <div key={districtName} className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 shadow-2xs">
                        {districtName}
                      </span>
                      <div className="h-px bg-stone-200 flex-1" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {districtBuildings.map((b) => {
                        const isDiscovered = discoveredBuildings.includes(b.id);
                        return (
                          <motion.div
                            key={b.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleBuildingClick(b.id)}
                            className={`${b.bgLight} border-2 ${b.borderColor} rounded-3xl p-4 shadow-md cursor-pointer flex items-center gap-3.5 group backdrop-blur-md transition-all relative overflow-hidden active:scale-95 touch-manipulation min-h-[72px]`}
                          >
                            {!isDiscovered && (
                              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/95 to-amber-50/95 z-30 flex items-center justify-between px-4 border-2 border-dashed border-amber-400">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl animate-bounce">☁️</span>
                                  <div>
                                    <p className="text-[10px] font-black text-amber-800">VÙNG ĐẤT CHƯA GIẢI MÃ</p>
                                    <p className="text-[9px] font-extrabold text-amber-600">Click mở (+5 Coins)</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-2xl shadow-sm shrink-0 group-hover:rotate-12 transition-transform overflow-hidden relative">
                              {b.imageSrc ? (
                                <Image src={b.imageSrc} alt={b.name} fill className="object-cover" />
                              ) : (
                                b.emoji
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className={`text-sm font-black ${b.textColor} truncate`}>
                                {b.name}
                              </h3>
                              <p className="text-[10px] text-stone-500 truncate mt-0.5">
                                {b.subtitle}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop View: Grid Town Map. Real grid tracks prevent cards from overlapping at any zoom/width. */}
            <div className="hidden md:block relative max-w-4xl mx-auto rounded-3xl border-2 border-amber-300/70 p-5 shadow-2xl overflow-hidden bg-white/98 backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-5 rounded-[28px] bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.05]" />
              <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path d="M50 18 C44 26 30 26 18 34" fill="none" stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.65" />
                <path d="M18 34 C28 45 38 47 50 50" fill="none" stroke="#34d399" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.55" />
                <path d="M50 18 C58 29 73 34 82 68" fill="none" stroke="#c084fc" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.55" />
                <path d="M50 50 C36 59 26 62 18 68" fill="none" stroke="#c084fc" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.55" />
                <path d="M50 50 C62 57 74 60 82 68" fill="none" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.55" />
                <path d="M18 68 C28 78 38 84 18 88" fill="none" stroke="#0ea5e9" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.45" />
                <path d="M82 68 C76 78 72 84 82 88" fill="none" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.45" />
              </svg>
              <motion.div
                className="pointer-events-none absolute z-30 -ml-5 -mt-5"
                animate={{
                  left: `${hoveredBuildingPos?.x ?? 50}%`,
                  top: `${hoveredBuildingPos?.y ?? 50}%`,
                }}
                transition={{ type: "spring", stiffness: 95, damping: 16 }}
              >
                <div className="scale-75 drop-shadow-xl">
                  <FinanceCharacterAvatar size="md" level={level} equipments={equippedGear} />
                </div>
              </motion.div>
              <div className="relative grid grid-cols-2 gap-x-5 gap-y-6 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_auto_auto_auto]">
                {ORGANIC_BUILDINGS.map((b, idx) => {
                  const isDiscovered = discoveredBuildings.includes(b.id);
                  const isCenter = b.id === "arcade";

                  return (
                    <motion.div
                      key={b.id}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBuildingClick(b.id)}
                      onMouseEnter={() => setHoveredBuildingPos(BUILDING_AVATAR_POSITIONS[b.id] ?? null)}
                      className={`relative ${b.desktopClass} ${isCenter ? "md:col-span-2 lg:col-span-1" : ""} min-h-[100px] bg-white/95 border-2 ${b.borderColor} rounded-3xl p-4 shadow-xl cursor-pointer flex items-center gap-3 group w-full z-20 backdrop-blur-md transition-all overflow-hidden`}
                    >
                      {b.id === "arcade" && (
                        <div className="absolute -top-1 -right-1 z-40 text-base animate-bounce pointer-events-none drop-shadow-md">
                          🔥
                        </div>
                      )}
                      {b.id === "arcade" && (
                        <div className="absolute -bottom-1 -left-1 z-40 text-base animate-pulse pointer-events-none drop-shadow-md">
                          🔥
                        </div>
                      )}
                      {!isDiscovered && (
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/90 via-amber-50/95 to-amber-100/90 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-2 text-center border-2 border-dashed border-amber-400/80 group-hover:bg-amber-100/70 transition-all">
                          <span className="text-xl mb-1 animate-bounce">☁️</span>
                          <span className="text-[10px] font-black text-amber-800 leading-tight">
                            VÙNG ĐẤT CHƯA GIẢI MÃ
                          </span>
                          <span className="text-[9px] font-extrabold text-amber-600 mt-0.5">
                            Click mở sương mù (+5 Coins)
                          </span>
                        </div>
                      )}

                      <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-3xl shadow-sm shrink-0 group-hover:rotate-12 transition-transform overflow-hidden relative">
                        {b.imageSrc ? (
                          <Image src={b.imageSrc} alt={b.name} fill className="object-cover" />
                        ) : (
                          b.emoji
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className={`max-w-full truncate text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${b.badgeBg} inline-block mb-1 shadow-sm`}>
                          {b.badge}
                        </span>
                        <h3 className={`text-sm font-black ${b.textColor} truncate`}>
                          {b.name}
                        </h3>
                        <p className="text-[10px] text-stone-500 truncate">
                          {b.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Active Building Interactive View */
          <div className="min-h-[calc(100vh-8.5rem)] sm:min-h-[calc(100vh-9rem)] flex flex-col">
            <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={handleCloseBuilding}
                className="inline-flex items-center gap-2 text-xs font-extrabold text-stone-700 bg-white border border-stone-300 hover:bg-stone-100 px-4 py-2 rounded-2xl transition-all cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-4 h-4" /> Quay Lại Bản Đồ Thị Trấn
              </button>
              
              <span className="text-[11px] sm:text-xs font-black text-stone-500 uppercase tracking-widest leading-tight">
                Đang mở: {ORGANIC_BUILDINGS.find((b) => b.id === selectedBuilding)?.name}
              </span>
            </div>

            {/* Building Component Render */}
            {selectedBuilding === "pvp" ? (
              <PvpDuelModal
                userId={user?.id || ""}
                userLevel={level}
                equipments={equippedGear}
                completedLessonCount={completedLessonIds.length}
                embedded
                onClose={handleCloseBuilding}
              />
            ) : (
              <div className="flex-1 min-h-0 bg-white border border-stone-200 rounded-3xl p-3 sm:p-4 shadow-sm overflow-hidden">
                {selectedBuilding === "world-boss" && (
                <WorldBossRaidWidget userId={user?.id || ""} userLevel={level} equipments={equippedGear} />
                )}
                {selectedBuilding === "guilds" && (
                  <FinancialGuildWidget userId={user?.id || ""} />
                )}
                {selectedBuilding === "shop" && (
                  <CosmeticStore userId={user?.id || ""} onBack={handleCloseBuilding} />
                )}
                {selectedBuilding === "cards" && (
                  <FinanceCardCollection userId={user?.id || ""} />
                )}
                {selectedBuilding === "weekly-challenge" && (
                  <WeeklyChallengeWidget userId={user?.id || ""} />
                )}
                {selectedBuilding === "arcade" && (
                  <GameHubClient />
                )}
                {selectedBuilding === "candlestick-game" && (
                  <CandlestickGame onBack={handleCloseBuilding} completedLessonIds={completedLessonIds} />
                )}
                {selectedBuilding === "ma-speedrun" && (
                  <MaSpeedrunGame onBack={handleCloseBuilding} completedLessonIds={completedLessonIds} />
                )}
                {selectedBuilding === "algo-game" && (
                  <AlgoTraderGame onBack={handleCloseBuilding} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
