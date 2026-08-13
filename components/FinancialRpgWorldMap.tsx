"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { organicBuildingsOf, type OrganicBuilding } from "@/lib/rpg-buildings";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Coins, Zap, Trophy, Lock, Flame, Shield, ShoppingBag, Layers, Activity, Clock, Crown, Compass } from "lucide-react";
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
import FedVaultWidget from "@/components/FedVaultWidget";
import GoldmanSachsWidget from "@/components/GoldmanSachsWidget";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/current-user";


interface EquipmentRow {
  slot: keyof CharacterEquipments;
  asset_key: string;
}

interface ProgressRow {
  lesson_id: string | number;
}


const BUILDING_AVATAR_POSITIONS: Record<string, { x: number; y: number }> = {
  "world-boss": { x: 50, y: 8 },
  pvp: { x: 18, y: 18 },
  arcade: { x: 50, y: 28 },
  "weekly-challenge": { x: 18, y: 38 },
  guilds: { x: 82, y: 38 },
  cards: { x: 18, y: 50 },
  shop: { x: 82, y: 50 },
  "fed-vault": { x: 50, y: 60 },
  "silicon-bay": { x: 18, y: 70 },
  "capitol-hill": { x: 82, y: 70 },
  "cme-commodities": { x: 18, y: 82 },
  "swiss-haven": { x: 82, y: 82 },
  "singapore-dock": { x: 50, y: 92 },
};



export default function FinancialRpgWorldMap() {
  const { t } = useI18n();
  // Danh sách địa điểm giờ mang chữ theo ngôn ngữ đang xem, nên nó không còn
  // là hằng số ở module scope được nữa.
  const buildings = useMemo(() => organicBuildingsOf(t), [t]);
  const MAP_BUILDINGS = useMemo(() => buildings.filter((b) => b.id !== "shop"), [buildings]);
  const searchParams = useSearchParams();
  const initialBuilding = searchParams.get("building");

  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(initialBuilding);
  const [user, setUser] = useState<{ id?: string; email?: string } | null>(null);
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [equippedGear, setEquippedGear] = useState<CharacterEquipments>({});
  const [avatarPos, setAvatarPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isMoving, setIsMoving] = useState(false);

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
    void getCurrentUser().then((authUser) => {
      if (authUser) {
        setUser({ id: authUser.id, email: authUser.email ?? undefined });
        
        supabase
          .from("user_profiles")
          .select("current_level, coins, discovered_buildings")
          .eq("id", authUser.id)
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
          .eq("user_id", authUser.id)
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
          .eq("user_id", authUser.id)
          .eq("completed", true)
          .then(({ data: progressRows }) => {
            if (progressRows) {
              setCompletedLessonIds((progressRows as ProgressRow[]).map((r) => Number(r.lesson_id)));
            }
          });
      }
    });

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const bParam = params.get("building");
      if (bParam) {
        setSelectedBuilding(bParam);
        if (BUILDING_AVATAR_POSITIONS[bParam]) {
          setAvatarPos(BUILDING_AVATAR_POSITIONS[bParam]);
        }
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
    const targetPos = BUILDING_AVATAR_POSITIONS[id] ?? { x: 50, y: 50 };
    
    // Start Hero Movement animation towards target building
    setIsMoving(true);
    setAvatarPos(targetPos);

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
      toast.success(t.miscUi.financialRpgWorldMap.regionDiscovered);
      if (user?.id) {
        createClient().from("user_profiles").update({ coins: newCoins, discovered_buildings: updated }).eq("id", user.id).then(({ error }) => {
          if (error) console.warn("Supabase user_profiles update notice:", error.message);
        });
      }
    }

    const targetBuilding = buildings.find((b) => b.id === id);
    const reqLevel = targetBuilding?.minLevel ?? getRequiredLevelForBuilding(id);

    // Allow pathfinding movement, then check level lock or proceed
    setTimeout(() => {
      setIsMoving(false);

      if (targetBuilding?.isUnderConstruction) {
        toast.info(format(t.miscUi.financialRpgWorldMap.underConstruction, { name: targetBuilding.name, level: reqLevel }));
        return;
      }

      if (level < reqLevel) {
        toast.error(format(t.miscUi.financialRpgWorldMap.levelLocked, { level: reqLevel }));
        return;
      }

      setSelectedBuilding(id);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("building", id);
        window.history.replaceState({}, "", url.toString());
      }
    }, 450);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-stone-50 to-emerald-50/50 text-stone-900 p-3 sm:p-5 relative overflow-x-hidden transition-colors duration-500 font-sans">
      {/* 👑 Top Gaming HUD Bar (Light Mode) */}
      <div className="max-w-6xl mx-auto mb-4 bg-white/95 backdrop-blur-xl border border-amber-300/90 rounded-2xl p-2.5 sm:p-3.5 shadow-[0_10px_30px_-10px_rgba(245,158,11,0.2)] flex flex-wrap items-center justify-between gap-3 relative z-30">
        {/* Left Player Level & Info */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 p-[2px] shadow-sm">
              <div className="w-full h-full rounded-[10px] bg-amber-500 flex items-center justify-center font-black text-white text-sm shadow-xs">
                {format(t.worldMap.levelShort, { level })}
              </div>
            </div>
            <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white shadow-xs">
              <Crown className="h-2.5 w-2.5 fill-white text-white" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-black uppercase text-amber-900 tracking-wider">{t.worldMap.empireTitle}</h2>
              <span className="text-[9px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                {t.worldMap.online}
              </span>
            </div>
            <p className="text-[10px] text-stone-600 font-semibold">{t.worldMap.empireSub}</p>
          </div>
        </div>

        {/* Center Currencies & Energy Bar */}
        <div className="flex items-center gap-3 sm:gap-5 text-xs font-black">
          {/* Coins / Capital */}
          <div className="flex items-center gap-2 bg-amber-50/90 border border-amber-200/90 px-3 py-1.5 rounded-xl shadow-xs">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white shadow-xs">
              <Coins className="h-3.5 w-3.5 fill-white" />
            </div>
            <div>
              <p className="text-[9px] font-extrabold uppercase text-amber-800/80 leading-none">{t.worldMap.capitalLabel}</p>
              <p className="text-xs font-black text-amber-900 leading-tight">{format(t.worldMap.coinsValue, { count: coins.toLocaleString() })}</p>
            </div>
          </div>

          {/* Energy Bar */}
          <div className="flex items-center gap-2 bg-sky-50/90 border border-sky-200/90 px-3 py-1.5 rounded-xl shadow-xs">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-white shadow-xs">
              <Zap className="h-3.5 w-3.5 fill-white" />
            </div>
            <div>
              <p className="text-[9px] font-extrabold uppercase text-sky-800/80 leading-none">{t.worldMap.energyLabel}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-16 h-2 bg-stone-200 rounded-full overflow-hidden border border-sky-300 p-[1px]">
                  <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full w-[100%] animate-pulse" />
                </div>
                <span className="text-[10px] font-black text-sky-900">100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Quick Nav Dock */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => handleBuildingClick("shop")}
            className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-2.5 py-1.5 rounded-xl text-xs font-black shadow-md transition-all cursor-pointer active:scale-95"
            title={t.worldMap.shopTitle}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.worldMap.shopShort}</span>
          </button>

          <button
            onClick={() => handleBuildingClick("cards")}
            className="flex items-center gap-1 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 px-2.5 py-1.5 rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer active:scale-95"
            title={t.worldMap.cardsTitle}
          >
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">{t.worldMap.cardsShort}</span>
          </button>
        </div>
      </div>

      {/* Wall Street Bloomberg Terminal LED Ticker Tape (Deep Black) */}
      <div className="bg-stone-950 border-y border-emerald-500/30 text-emerald-400 py-2 px-4 -mx-3 -mt-2 sm:-mx-5 sm:-mt-3 mb-4 text-[11px] font-mono shadow-md overflow-hidden relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-6 whitespace-nowrap overflow-x-auto scrollbar-none">
          <span className="font-black text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40 flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" /> {t.worldMap.tickerLabel}
          </span>
          <span className="shrink-0 font-bold text-emerald-400">{t.worldMap.tickerIndex}</span>
          <span className="shrink-0 font-bold text-amber-300">{t.worldMap.tickerBoss}</span>
          <span className="shrink-0 font-bold text-cyan-300">{t.worldMap.tickerCase}</span>
          <span className="shrink-0 font-bold text-purple-300">{t.worldMap.tickerClan}</span>
        </div>
      </div>

      {!selectedBuilding && (
        <>
          {/* Wall Street Photo Background (Ultra Vivid & High Clarity) */}
          <div className="absolute inset-0 pointer-events-none opacity-70 z-0 overflow-hidden">
            <Image
              src="/wallstreet-bg.jpg"
              alt={t.worldMap.bgAlt}
              fill
              className="object-cover blur-0 contrast-[1.08] brightness-[1.02]"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/20 pointer-events-none z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:32px_32px] pointer-events-none opacity-[0.05] z-0" />
        </>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto z-10 relative">
        {!selectedBuilding ? (
          <div>
            {/* Mobile / Tablet View: Categorized District Grids */}
            <div className="md:hidden space-y-5">
              {/* i18n-ignore-start: district names in the game world. Nine of the ten are
                  place names that are already English and stay that way in any
                  language - NYSE, Times Square, the Fed vault, Singapore Dock.
                  The one Vietnamese label is the generic "all mini games" tile,
                  which does go through the dictionary. */}
              {["🏛️ NYSE CENTRAL", t.worldMap.zoneMiniGames, "🏙️ TIMES SQUARE", "🏰 HEDGE FUND QUARTER", "🏦 FED VAULT", "🚀 SILICON BAY", "🏛️ CAPITOL HILL", "🌾 CME COMMODITY", "💎 SWISS HAVEN", "🚢 SINGAPORE DOCK" /* i18n-ignore-end */].map((districtBadge) => {
                const districtBuildings = MAP_BUILDINGS.filter((b) => b.badge.includes(districtBadge.split(" ")[1] || districtBadge.split(" ")[0] || ""));
                if (districtBuildings.length === 0) return null;
                return (
                  <div key={districtBadge} className="space-y-2.5">
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 shadow-xs">
                        {districtBadge}
                      </span>
                      <div className="h-px bg-amber-300/40 flex-1" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {districtBuildings.map((b) => {
                        const isDiscovered = discoveredBuildings.includes(b.id);
                        const reqLevel = b.minLevel ?? getRequiredLevelForBuilding(b.id);
                        const isLocked = level < reqLevel;

                        return (
                          <motion.div
                            key={b.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleBuildingClick(b.id)}
                            className={`bg-white/95 border-2 border-amber-300/90 rounded-3xl p-4 shadow-md cursor-pointer flex items-center gap-3.5 group backdrop-blur-md transition-all relative overflow-hidden active:scale-95 touch-manipulation min-h-[90px]`}
                          >
                            {/* Fog Unveil Overlay */}
                            {!isDiscovered && (
                              <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-30 flex items-center justify-between px-4 border-2 border-dashed border-amber-400">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl animate-bounce">☁️</span>
                                  <div>
                                    <p className="text-[10px] font-black text-amber-900">{t.worldMap.fogTitle}</p>
                                    <p className="text-[9px] font-extrabold text-amber-700">{t.worldMap.fogHint}</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Under Construction Overlay */}
                            {b.isUnderConstruction && isDiscovered && (
                              <div className="absolute inset-0 bg-stone-900/85 backdrop-blur-xs z-25 flex items-center justify-between px-4 border-2 border-dashed border-amber-400 text-white">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl animate-pulse">🏗️</span>
                                  <div>
                                    <p className="text-xs font-black text-amber-300 uppercase">{t.worldMap.underConstruction}</p>
                                    <p className="text-[9px] font-bold text-stone-300">{format(t.worldMap.lockedLevel, { level: reqLevel })}</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Locked Chain Overlay */}
                            {isLocked && !b.isUnderConstruction && isDiscovered && (
                              <div className="absolute inset-0 bg-stone-100/95 backdrop-blur-xs z-25 flex items-center justify-between px-4 border-2 border-dashed border-stone-300">
                                <div className="flex items-center gap-2 text-stone-600">
                                  <Lock className="w-5 h-5 text-amber-600 animate-pulse shrink-0" />
                                  <div>
                                    <p className="text-xs font-black text-amber-800 uppercase">{format(t.worldMap.lockedShort, { level: reqLevel })}</p>
                                    <p className="text-[9px] font-bold text-stone-500">{t.worldMap.lockedNeedLessons}</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="w-15 h-15 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-md shrink-0 group-hover:rotate-12 transition-transform overflow-hidden relative">
                              {b.imageSrc ? (
                                <Image src={b.imageSrc} alt={b.name} fill className="object-cover" />
                              ) : (
                                b.emoji
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="text-sm font-black text-stone-900 truncate">
                                {b.name}
                              </h3>
                              <p className="text-[10px] text-stone-600 truncate mt-0.5">
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

            {/* Pan & Drag Hint Banner for Desktop Map */}
            <div className="hidden md:flex items-center justify-between mb-3 px-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300 text-xs font-black shadow-xs">
                <Compass className="w-4 h-4 text-amber-700 animate-spin-slow" />
                <span>{t.worldMap.dragHint}</span>
              </div>
              <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 shadow-2xs">
                {t.worldMap.zoneCount}
              </span>
            </div>

            {/* 🏰 Desktop 3D Isometric RPG World Map Container (Fixed Viewport Canva Canvas) */}
            <div className="hidden md:block relative max-w-6xl mx-auto rounded-[36px] border-2 border-amber-300 shadow-[0_20px_60px_-15px_rgba(245,158,11,0.25)] overflow-hidden bg-gradient-to-b from-white/95 via-amber-50/30 to-emerald-50/40 backdrop-blur-2xl transition-all duration-300 h-[720px] sm:h-[780px]">
              
              {/* Canva Navigation Badge Overlay */}
              <div className="absolute top-4 left-4 z-40 flex items-center gap-2 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/90 text-amber-300 text-xs font-black shadow-lg backdrop-blur-md border border-amber-500/40">
                  <span>{t.worldMap.dragHintLong}</span>
                </span>
              </div>

              <motion.button
                type="button"
                onClick={() => handleBuildingClick("shop")}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="absolute right-4 top-4 z-[45] w-[230px] rounded-[24px] border border-amber-300/90 bg-white/92 p-3 text-left shadow-[0_18px_42px_-24px_rgba(146,64,14,0.45)] backdrop-blur-xl transition-all"
                title={t.worldMap.gearOpenTitle}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 ring-1 ring-amber-300 shadow-inner">
                    <ShoppingBag className="h-6 w-6 text-amber-700" />
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-black text-white ring-2 ring-white">
                      {Object.keys(equippedGear).length}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-[0.16em] text-amber-700">{t.worldMap.gearEyebrow}</p>
                    <h3 className="truncate text-sm font-black text-stone-950">{t.worldMap.gearTitle}</h3>
                    <p className="mt-0.5 truncate text-[10px] font-semibold text-stone-500">{t.worldMap.gearSub}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between rounded-2xl bg-amber-50/80 px-3 py-2 ring-1 ring-amber-200/80">
                  <span className="text-[10px] font-extrabold text-amber-900">{t.worldMap.gearCta}</span>
                  <span className="text-[10px] font-black text-amber-700">→</span>
                </div>
              </motion.button>

              {/* Inner Draggable Canva Canvas Container */}
              <motion.div
                drag
                dragConstraints={{ left: -550, right: 550, top: -1150, bottom: 550 }}
                dragElastic={0.08}
                whileTap={{ cursor: "grabbing" }}
                className="w-full h-full cursor-grab active:cursor-grabbing relative p-6 sm:p-10 select-none"
                style={{ touchAction: "none" }}
              >
                {/* Isometric Perspective Grid Layer */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:36px_36px] opacity-[0.12]" />

                {/* ⚡ Dynamic Animated Laser Energy Flow Paths (SVG Laser Lines) */}
                <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    {/* Glowing Laser Color Gradients */}
                    <linearGradient id="laser-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#d97706" stopOpacity="1" />
                      <stop offset="100%" stopColor="#b45309" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="laser-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="laser-sky" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  {/* Animated Base Dash Paths */}
                  <path d="M50 18 C44 26 30 26 18 34" fill="none" stroke="url(#laser-sky)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="4 4" className="animate-[pulse_2s_infinite]" opacity="0.9" />
                  <path d="M18 34 C28 45 38 47 50 50" fill="none" stroke="url(#laser-sky)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="4 4" opacity="0.85" />
                  <path d="M50 18 C58 29 73 34 82 68" fill="none" stroke="url(#laser-purple)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="4 4" opacity="0.9" />
                  <path d="M50 50 C36 59 26 62 18 68" fill="none" stroke="url(#laser-purple)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="4 4" opacity="0.9" />
                  <path d="M50 50 C62 57 74 60 82 68" fill="none" stroke="url(#laser-gold)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 5" className="animate-[pulse_1.5s_infinite]" opacity="0.95" />
                  <path d="M18 68 C28 78 38 84 18 88" fill="none" stroke="url(#laser-sky)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" opacity="0.8" />
                  <path d="M82 68 C76 78 72 84 82 88" fill="none" stroke="url(#laser-gold)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="4 4" opacity="0.85" />
                </svg>

                {/* 🏃 Smooth Interactive Hero Pathfinding Marker (Slightly Smaller) */}
                <motion.div
                  className="pointer-events-none absolute z-50 -ml-5 -mt-5"
                  animate={{
                    left: `${avatarPos.x}%`,
                    top: `${avatarPos.y}%`,
                  }}
                  transition={{ type: "spring", stiffness: 85, damping: 15 }}
                >
                  <div className="relative">
                    {/* Hero Pulsing Halo Glow */}
                    <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 opacity-75 blur-xs animate-pulse" />
                    
                    <div className="relative rounded-full bg-white p-0.5 shadow-md ring-2 ring-amber-400">
                      <FinanceCharacterAvatar size="sm" level={level} equipments={equippedGear} />
                    </div>

                    {/* Hero Level Badge Pill */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full shadow ring-1 ring-white whitespace-nowrap">
                      {format(t.worldMap.levelShort, { level })}
                    </div>
                  </div>
                </motion.div>

                {/* 🏛️ 3D Isometric Building Grid (Enlarged Images & Cards) */}
                <div className="relative grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-3">
                  {MAP_BUILDINGS.map((b) => {
                    const isDiscovered = discoveredBuildings.includes(b.id);
                    const reqLevel = b.minLevel ?? getRequiredLevelForBuilding(b.id);
                    const isLocked = level < reqLevel;
                    const isCenter = b.id === "arcade";

                    return (
                      <motion.div
                        key={b.id}
                        whileHover={{ scale: 1.04, y: -6, rotate: 0.5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBuildingClick(b.id)}
                        onMouseEnter={() => setAvatarPos(BUILDING_AVATAR_POSITIONS[b.id] ?? { x: 50, y: 50 })}
                        className={`relative ${b.desktopClass} ${isCenter ? "md:col-span-2 lg:col-span-1" : ""} min-h-[130px] bg-white/95 border-2 ${b.borderColor} rounded-[28px] p-5 shadow-lg hover:shadow-2xl cursor-pointer flex items-center gap-4 group w-full z-20 backdrop-blur-xl transition-all overflow-hidden`}
                      >
                        {/* Special Effects & Flames */}
                        {b.id === "arcade" && (
                          <div className="absolute -top-1 -right-1 z-40 text-lg animate-bounce pointer-events-none drop-shadow-md">
                            🔥
                          </div>
                        )}

                        {/* 🔴 Live Status & Boss HP Badge Overlays */}
                        {b.id === "world-boss" && (
                          <div className="absolute top-2 right-2.5 z-30 flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-[9px] font-black text-red-700 border border-red-300 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                            <span>{t.worldMap.bossHp}</span>
                          </div>
                        )}

                        {b.id === "weekly-challenge" && (
                          <div className="absolute top-2 right-2.5 z-30 flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-[9px] font-black text-purple-700 border border-purple-300 shadow-xs animate-pulse">
                            <span>{t.worldMap.hotCase}</span>
                          </div>
                        )}

                        {/* Fog Unveil Overlay */}
                        {!isDiscovered && (
                          <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-2 text-center border-2 border-dashed border-amber-400 group-hover:bg-white/90 transition-all">
                            <span className="text-2xl mb-1 animate-bounce">☁️</span>
                            <span className="text-[10px] font-black text-amber-900 uppercase tracking-wider">
                              {t.worldMap.fogTitle}
                            </span>
                            <span className="text-[9px] font-extrabold text-amber-700 mt-0.5">
                              {t.worldMap.fogHintLong}
                            </span>
                          </div>
                        )}

                        {/* Under Construction Overlay */}
                        {b.isUnderConstruction && isDiscovered && (
                          <div className="absolute inset-0 bg-stone-900/85 backdrop-blur-xs z-25 flex flex-col items-center justify-center p-2 text-center border-2 border-dashed border-amber-500/80 text-white">
                            <span className="text-2xl mb-1 animate-pulse">🏗️</span>
                            <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
                              {t.worldMap.underConstruction}
                            </span>
                            <span className="text-[9px] font-extrabold text-stone-300 mt-0.5">
                              {format(t.worldMap.lockedLevel, { level: reqLevel })}
                            </span>
                          </div>
                        )}

                        {/* Locked Overlay */}
                        {isLocked && !b.isUnderConstruction && isDiscovered && (
                          <div className="absolute inset-0 bg-stone-100/95 backdrop-blur-xs z-25 flex flex-col items-center justify-center p-2 text-center border-2 border-dashed border-stone-300">
                            <div className="flex items-center gap-1.5 text-amber-700">
                              <Lock className="w-4 h-4 text-amber-600 animate-pulse" />
                              <span className="text-xs font-black uppercase">{format(t.worldMap.lockedShort, { level: reqLevel })}</span>
                            </div>
                            <span className="text-[9px] font-bold text-stone-500 mt-0.5">{t.worldMap.lockedNeedLessonsShort}</span>
                          </div>
                        )}

                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-md shrink-0 group-hover:rotate-6 transition-transform overflow-hidden relative">
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
                          <h3 className={`text-sm sm:text-base font-black text-stone-900 truncate`}>
                            {b.name}
                          </h3>
                          <p className="text-[10px] sm:text-xs text-stone-600 truncate mt-0.5">
                            {b.subtitle}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          /* Active Building Interactive Modal View (Light Mode) */
          <div className="min-h-[calc(100vh-8.5rem)] sm:min-h-[calc(100vh-9rem)] flex flex-col">
            <div className="mb-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={handleCloseBuilding}
                className="inline-flex items-center gap-2 text-xs font-extrabold text-stone-800 bg-white border border-stone-300 hover:bg-stone-50 px-4 py-2 rounded-2xl transition-all cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-4 h-4 text-amber-600" /> {t.worldMap.backToMap}
              </button>
              
              <span className="text-[11px] sm:text-xs font-black text-amber-800 uppercase tracking-widest leading-tight">
                {format(t.worldMap.opening, { name: buildings.find((b) => b.id === selectedBuilding)?.name ?? "" })}
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
              <div className="flex-1 min-h-0 w-full overflow-hidden text-stone-900">
                {selectedBuilding === "world-boss" && (
                  <WorldBossRaidWidget userId={user?.id || ""} userLevel={level} equipments={equippedGear} />
                )}
                {selectedBuilding === "goldman-sachs" && (
                  <GoldmanSachsWidget userId={user?.id || ""} />
                )}
                {selectedBuilding === "fed-vault" && (
                  <FedVaultWidget userId={user?.id || ""} />
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
                {(selectedBuilding === "algo-game" || selectedBuilding === "silicon-bay") && (
                  <AlgoTraderGame onBack={handleCloseBuilding} />
                )}
                {selectedBuilding === "capitol-hill" && (
                  <WeeklyChallengeWidget userId={user?.id || ""} />
                )}
                {selectedBuilding === "cme-commodities" && (
                  <CandlestickGame onBack={handleCloseBuilding} completedLessonIds={completedLessonIds} />
                )}
                {selectedBuilding === "swiss-haven" && (
                  <FinanceCardCollection userId={user?.id || ""} />
                )}
                {selectedBuilding === "singapore-dock" && (
                  <MaSpeedrunGame onBack={handleCloseBuilding} completedLessonIds={completedLessonIds} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
