"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { organicBuildingsOf, type OrganicBuilding } from "@/lib/rpg-buildings";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, Coins, Lock, ShoppingBag, Layers, Compass, Cloud, Construction } from "lucide-react";
import { btnPrimary, btnSecondary, Sys, StatusDot } from "@/components/ui/system";
import Glyph from "@/components/Glyph";
import { createClient } from "@/lib/cloudflare";
import { getRequiredLevelForBuilding } from "@/lib/levels";
import { normalizeBuildingId } from "@/lib/legacy-ids";
import BuildingScenarioGame, { SCENARIO_BUILDINGS, type ScenarioBuildingId } from "@/components/BuildingScenarioGame";
import { toast } from "sonner";
import TechCharacterAvatar, { CharacterEquipments } from "@/components/TechCharacterAvatar";

// Sub-feature Component Imports
import CosmeticStore from "@/components/CosmeticStore";
import TechCardCollection from "@/components/TechCardCollection";
import WeeklyChallengeWidget from "@/components/WeeklyChallengeWidget";
import WorldBossRaidWidget from "@/components/WorldBossRaidWidget";
import PvpDuelModal from "@/components/PvpDuelModal";
import GameHubClient from "@/components/games/GameHubClient";
import BackboneRoutingWidget from "@/components/BackboneRoutingWidget";
import CapacitySizingWidget from "@/components/CapacitySizingWidget";
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


/* i18n-ignore-start: định danh hệ thống, không phải chữ hiển thị - cùng một
   chuỗi ở mọi ngôn ngữ, như đường dẫn tệp. Số khu là độ dài danh sách thật. */
const SYS = {
  kingdom: "THCN://GAME/KINGDOM",
  building: (id: string) => `THCN://GAME/${id.toUpperCase()}`,
  zones: (n: number) => `ZONES ${n}`,
};
/* i18n-ignore-end */

const BUILDING_AVATAR_POSITIONS: Record<string, { x: number; y: number }> = {
  "world-boss": { x: 50, y: 8 },
  pvp: { x: 18, y: 18 },
  arcade: { x: 50, y: 28 },
  "weekly-challenge": { x: 18, y: 38 },
  cards: { x: 18, y: 50 },
  shop: { x: 82, y: 50 },
  "backbone-hub": { x: 50, y: 60 },
  "silicon-bay": { x: 18, y: 70 },
  "cloud-capital": { x: 82, y: 70 },
  "resource-floor": { x: 18, y: 82 },
  "data-haven": { x: 82, y: 82 },
  "singapore-dock": { x: 50, y: 92 },
};



export default function TechRpgWorldMap() {
  const { t } = useI18n();
  // Danh sách địa điểm giờ mang chữ theo ngôn ngữ đang xem, nên nó không còn
  // là hằng số ở module scope được nữa.
  const buildings = useMemo(() => organicBuildingsOf(t), [t]);
  const MAP_BUILDINGS = useMemo(() => buildings.filter((b) => b.id !== "shop"), [buildings]);
  const searchParams = useSearchParams();
  const initialBuilding = normalizeBuildingId(searchParams.get("building"));

  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(initialBuilding);
  const [user, setUser] = useState<{ id?: string; email?: string } | null>(null);
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(0);
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
    const cloudflare = createClient();
    void getCurrentUser().then((authUser) => {
      if (authUser) {
        setUser({ id: authUser.id, email: authUser.email ?? undefined });
        
        cloudflare
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

        cloudflare
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

        cloudflare
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
      const bParam = normalizeBuildingId(params.get("building"));
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
      toast.success(t.miscUi.techRpgWorldMap.regionDiscovered);
      if (user?.id) {
        const client = createClient();
        // Hai lượt ghi tách đôi, vì chúng có mức tin cậy khác nhau.
        //
        // `discovered_buildings` là trạng thái của người chơi, ghi thẳng được.
        // `coins` thì không: trigger 20260914 khoá cột với vai trò trình duyệt,
        // nên câu update cũ sẽ "thành công" mà tiền không nhúc nhích - im lặng
        // đúng kiểu khó lần nhất.
        //
        // `grant_coins` chốt mức +5 ở server và dùng chính khoá của khu làm
        // tham chiếu, nên khám phá lại cùng một khu không trả tiền lần hai.
        client.from("user_profiles").update({ discovered_buildings: updated }).eq("id", user.id)
          .then(({ error }) => {
            if (error) console.warn("Cloudflare user_profiles update notice:", error.message);
          });
        client.rpc("grant_coins", { p_source: "building", p_ref: id, p_amount: 5 })
          .then(({ data, error }) => {
            if (error) return;
            const row = Array.isArray(data) ? data[0] : data;
            if (row?.coins_left != null) {
              setCoins(row.coins_left);
              window.dispatchEvent(
                new CustomEvent("thtcdn:coin-updated", { detail: { coins: row.coins_left } }),
              );
            }
          });
      }
    }

    const targetBuilding = buildings.find((b) => b.id === id);
    const reqLevel = targetBuilding?.minLevel ?? getRequiredLevelForBuilding(id);

    // Allow pathfinding movement, then check level lock or proceed
    setTimeout(() => {
      setIsMoving(false);

      if (targetBuilding?.isUnderConstruction) {
        toast.info(format(t.miscUi.techRpgWorldMap.underConstruction, { name: targetBuilding.name, level: reqLevel }));
        return;
      }

      if (level < reqLevel) {
        toast.error(format(t.miscUi.techRpgWorldMap.levelLocked, { level: reqLevel }));
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

  const selected = selectedBuilding ? buildings.find((b) => b.id === selectedBuilding) : undefined;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-page p-3 font-sans text-ink sm:p-5 dark:bg-stone-950">
      {/* HUD: một thanh tiêu đề kiểu cửa sổ ứng dụng - mã định vị mono, cấp độ và
          ngân sách là số thật đọc từ user_profiles. Không gradient, không kính mờ. */}
      <div className="relative z-30 mx-auto mb-4 max-w-6xl overflow-hidden rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900">
        <div className="flex h-8 items-center justify-between gap-3 border-b border-stone-300 bg-surface-raised px-3 dark:border-stone-700 dark:bg-stone-950">
          <Sys className="truncate text-ink-muted">{selected ? SYS.building(selected.id) : SYS.kingdom}</Sys>
          <span className="inline-flex items-center gap-1.5">
            <StatusDot />
            <span className="text-[11px] font-semibold text-ink-muted">{t.worldMap.online}</span>
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 sm:p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 min-w-10 items-center justify-center rounded-sm bg-stone-950 px-1.5 font-mono text-xs font-medium tabular-nums text-white dark:bg-stone-100 dark:text-stone-950">
              {format(t.worldMap.levelShort, { level })}
            </div>
            <div>
              <h2 className="text-sm font-black text-ink-max">{t.worldMap.empireTitle}</h2>
              <p className="text-[11px] text-ink-muted">{t.worldMap.empireSub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* Tiền tệ - chỗ duy nhất được giữ màu hổ phách. */}
            <div className="flex items-center gap-2 border-l border-stone-300 pl-3 dark:border-stone-700">
              <Coins className="h-4 w-4 text-warn" aria-hidden />
              <div>
                <p className="text-[10px] font-semibold text-ink-muted leading-none">{t.worldMap.capitalLabel}</p>
                <p className="mt-0.5 font-mono text-sm font-medium tabular-nums leading-tight text-warn-ink">
                  {format(t.worldMap.coinsValue, { count: coins.toLocaleString() })}
                </p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              onClick={() => handleBuildingClick("shop")}
              className={`${btnPrimary} px-3 py-1.5 text-xs`}
              title={t.worldMap.shopTitle}
            >
              <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">{t.worldMap.shopShort}</span>
            </button>

            <button
              onClick={() => handleBuildingClick("cards")}
              className={`${btnSecondary} px-3 py-1.5 text-xs`}
              title={t.worldMap.cardsTitle}
            >
              <Layers className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">{t.worldMap.cardsShort}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dải tin chạy (uptime 99,95%, boss 850.000 HP, clan top #1) và thanh
          "Năng lượng 100%" đã gỡ: toàn là số viết cứng, không đọc từ đâu, nhưng
          trình bày như chỉ số trực tiếp. Số nào hiện trên màn hình phải là số thật. */}

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-6xl">
        {!selectedBuilding ? (
          // Bản đồ đứng trên một dải mực stone-950 - đúng như khu Game Kingdom ở
          // trang giới thiệu. Ảnh skyline là nội dung, nên nó ở lại, chỉ lùi về
          // phía sau dải mực thay vì phủ lên cả HUD.
          <div className="relative overflow-hidden rounded-md border border-stone-800 bg-stone-950">
            <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
              <Image
                src="/saigon-skyline.jpg"
                alt={t.worldMap.bgAlt}
                fill
                className="object-cover grayscale"
                priority
              />
            </div>

            <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/15 px-4 py-2.5">
              <span className="inline-flex min-w-0 items-center gap-2 text-xs font-semibold text-stone-300">
                <Compass className="h-3.5 w-3.5 shrink-0 text-stone-500" aria-hidden />
                <span className="hidden truncate md:inline">{t.worldMap.dragHint}</span>
              </span>
              <Sys className="shrink-0 text-stone-500">{SYS.zones(MAP_BUILDINGS.length)}</Sys>
            </div>

            {/* Mobile / Tablet View: Categorized District Grids */}
            <div className="relative z-10 space-y-5 p-3 md:hidden">
              {/* Nhóm theo đúng `badge` của từng toà (đã đi qua từ điển), thay vì
                  một danh sách tên khu gõ tay - danh sách cũ có tên khu lỗi thời và
                  so khớp theo từ thứ hai, nên nửa số toà
                  không rơi vào khu nào và biến mất khỏi bản đồ di động. */}
              {[...new Set(MAP_BUILDINGS.map((b) => b.badge))].map((districtBadge) => {
                const districtBuildings = MAP_BUILDINGS.filter((b) => b.badge === districtBadge);
                if (districtBuildings.length === 0) return null;
                return (
                  <div key={districtBadge} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-stone-400">
                        {districtBadge}
                      </span>
                      <div className="h-px flex-1 bg-white/15" />
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {districtBuildings.map((b) => {
                        const isDiscovered = discoveredBuildings.includes(b.id);
                        const reqLevel = b.minLevel ?? getRequiredLevelForBuilding(b.id);
                        const isLocked = level < reqLevel;

                        return (
                          <div
                            key={b.id}
                            onClick={() => handleBuildingClick(b.id)}
                            className="relative flex min-h-[80px] cursor-pointer touch-manipulation items-center gap-3 overflow-hidden rounded-md border border-stone-800 bg-stone-900 p-3 transition-colors hover:border-stone-500"
                          >
                            {!isDiscovered && (
                              <div className="absolute inset-0 z-30 flex items-center gap-2 border border-dashed border-stone-600 bg-stone-950 px-3">
                                <Cloud className="h-5 w-5 shrink-0 text-stone-500" strokeWidth={1.75} aria-hidden />
                                <div>
                                  <p className="text-[11px] font-bold text-stone-200">{t.worldMap.fogTitle}</p>
                                  <p className="text-[10px] font-semibold text-amber-300">{t.worldMap.fogHint}</p>
                                </div>
                              </div>
                            )}

                            {b.isUnderConstruction && isDiscovered && (
                              <div className="absolute inset-0 z-25 flex items-center gap-2 border border-dashed border-stone-600 bg-stone-950 px-3">
                                <Construction className="h-5 w-5 shrink-0 text-stone-500" strokeWidth={1.75} aria-hidden />
                                <div>
                                  <p className="text-[11px] font-bold uppercase text-stone-200">{t.worldMap.underConstruction}</p>
                                  <p className="text-[10px] font-semibold text-stone-400">{format(t.worldMap.lockedLevel, { level: reqLevel })}</p>
                                </div>
                              </div>
                            )}

                            {isLocked && !b.isUnderConstruction && isDiscovered && (
                              <div className="absolute inset-0 z-25 flex items-center gap-2 border border-dashed border-stone-600 bg-stone-950 px-3">
                                <Lock className="h-4 w-4 shrink-0 text-stone-500" aria-hidden />
                                <div>
                                  <p className="font-mono text-[11px] font-medium tabular-nums text-stone-200">{format(t.worldMap.lockedShort, { level: reqLevel })}</p>
                                  <p className="text-[10px] font-semibold text-stone-400">{t.worldMap.lockedNeedLessons}</p>
                                </div>
                              </div>
                            )}

                            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-stone-700 bg-stone-950 text-stone-300">
                              {b.imageSrc ? (
                                <Image src={b.imageSrc} alt={b.name} fill className="object-cover" />
                              ) : (
                                <Glyph emoji={b.emoji} className="h-7 w-7" strokeWidth={1.5} />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="truncate text-sm font-black text-white">{b.name}</h3>
                              <p className="mt-0.5 truncate text-[11px] text-stone-400">{b.subtitle}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop map: vùng kéo thả, cố định khung nhìn. */}
            <div className="relative z-10 hidden h-[720px] md:block sm:h-[780px]">
              <button
                type="button"
                onClick={() => handleBuildingClick("shop")}
                className="absolute right-4 top-4 z-[45] w-[230px] rounded-md border border-stone-700 bg-stone-950 p-3 text-left transition-colors hover:border-stone-400"
                title={t.worldMap.gearOpenTitle}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-stone-700 bg-stone-900">
                    <ShoppingBag className="h-5 w-5 text-stone-300" aria-hidden />
                    <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-xs bg-brand-600 px-0.5 font-mono text-[9px] font-medium tabular-nums text-white">
                      {Object.keys(equippedGear).length}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-stone-400">{t.worldMap.gearEyebrow}</p>
                    <h3 className="truncate text-sm font-black text-white">{t.worldMap.gearTitle}</h3>
                    <p className="mt-0.5 truncate text-[11px] text-stone-400">{t.worldMap.gearSub}</p>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between border-t border-white/15 pt-2">
                  <span className="text-[11px] font-bold text-white">{t.worldMap.gearCta}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-stone-400" aria-hidden />
                </div>
              </button>

              {/* Inner Draggable Canvas Container */}
              <motion.div
                drag
                dragConstraints={{ left: -550, right: 550, top: -1150, bottom: 550 }}
                dragElastic={0.08}
                whileTap={{ cursor: "grabbing" }}
                className="relative h-full w-full cursor-grab select-none p-6 active:cursor-grabbing sm:p-10"
                style={{ touchAction: "none" }}
              >
                {/* Lưới toạ độ 1px - nền của bản đồ, không phải chấm sáng trang trí. */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:36px_36px]" />

                {/* Đường nối giữa các khu: nét đứt một màu, không phát sáng. */}
                <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full text-stone-600" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4" vectorEffect="non-scaling-stroke">
                    <path d="M50 18 C44 26 30 26 18 34" vectorEffect="non-scaling-stroke" />
                    <path d="M18 34 C28 45 38 47 50 50" vectorEffect="non-scaling-stroke" />
                    <path d="M50 18 C58 29 73 34 82 68" vectorEffect="non-scaling-stroke" />
                    <path d="M50 50 C36 59 26 62 18 68" vectorEffect="non-scaling-stroke" />
                    <path d="M50 50 C62 57 74 60 82 68" vectorEffect="non-scaling-stroke" />
                    <path d="M18 68 C28 78 38 84 18 88" vectorEffect="non-scaling-stroke" />
                    <path d="M82 68 C76 78 72 84 82 88" vectorEffect="non-scaling-stroke" />
                  </g>
                </svg>

                {/* Nhân vật di chuyển giữa các khu (ảnh đại diện - được phép tròn). */}
                <motion.div
                  className="pointer-events-none absolute z-50 -ml-5 -mt-5"
                  animate={{
                    left: `${avatarPos.x}%`,
                    top: `${avatarPos.y}%`,
                  }}
                  transition={{ type: "spring", stiffness: 85, damping: 15 }}
                >
                  <div className="relative">
                    <div className={`relative rounded-full border bg-white p-0.5 ${isMoving ? "border-brand-400" : "border-stone-400"}`}>
                      <TechCharacterAvatar size="sm" level={level} equipments={equippedGear} />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xs border border-stone-700 bg-stone-950 px-1 py-px font-mono text-[8px] font-medium tabular-nums text-white">
                      {format(t.worldMap.levelShort, { level })}
                    </div>
                  </div>
                </motion.div>

                {/* Lưới khu vực */}
                <div className="relative grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-3">
                  {MAP_BUILDINGS.map((b) => {
                    const isDiscovered = discoveredBuildings.includes(b.id);
                    const reqLevel = b.minLevel ?? getRequiredLevelForBuilding(b.id);
                    const isLocked = level < reqLevel;
                    const isCenter = b.id === "arcade";

                    return (
                      <div
                        key={b.id}
                        onClick={() => handleBuildingClick(b.id)}
                        onMouseEnter={() => setAvatarPos(BUILDING_AVATAR_POSITIONS[b.id] ?? { x: 50, y: 50 })}
                        className={`relative ${b.desktopClass} ${isCenter ? "md:col-span-2 lg:col-span-1" : ""} group z-20 flex min-h-[130px] w-full cursor-pointer items-center gap-4 overflow-hidden rounded-md border border-stone-700 bg-stone-900 p-5 transition-colors hover:border-stone-400`}
                      >
                        {b.id === "weekly-challenge" && (
                          <span className="absolute right-2.5 top-2 z-30 rounded-xs border border-stone-600 px-1.5 py-px text-[9px] font-bold text-stone-300">
                            {t.worldMap.hotCase}
                          </span>
                        )}

                        {!isDiscovered && (
                          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center border border-dashed border-stone-600 bg-stone-950 p-2 text-center transition-colors group-hover:border-stone-400">
                            <Cloud className="mb-1 h-6 w-6 text-stone-500" strokeWidth={1.75} aria-hidden />
                            <span className="text-[11px] font-bold uppercase text-stone-200">{t.worldMap.fogTitle}</span>
                            <span className="mt-0.5 text-[10px] font-semibold text-amber-300">{t.worldMap.fogHintLong}</span>
                          </div>
                        )}

                        {b.isUnderConstruction && isDiscovered && (
                          <div className="absolute inset-0 z-25 flex flex-col items-center justify-center border border-dashed border-stone-600 bg-stone-950 p-2 text-center">
                            <Construction className="mb-1 h-6 w-6 text-stone-500" strokeWidth={1.75} aria-hidden />
                            <span className="text-xs font-bold uppercase text-stone-200">{t.worldMap.underConstruction}</span>
                            <span className="mt-0.5 text-[10px] font-semibold text-stone-400">{format(t.worldMap.lockedLevel, { level: reqLevel })}</span>
                          </div>
                        )}

                        {isLocked && !b.isUnderConstruction && isDiscovered && (
                          <div className="absolute inset-0 z-25 flex flex-col items-center justify-center border border-dashed border-stone-600 bg-stone-950 p-2 text-center">
                            <div className="flex items-center gap-1.5 text-stone-200">
                              <Lock className="h-4 w-4 text-stone-500" aria-hidden />
                              <span className="font-mono text-xs font-medium tabular-nums">{format(t.worldMap.lockedShort, { level: reqLevel })}</span>
                            </div>
                            <span className="mt-0.5 text-[10px] font-semibold text-stone-400">{t.worldMap.lockedNeedLessonsShort}</span>
                          </div>
                        )}

                        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-stone-700 bg-stone-950 text-stone-300 sm:h-20 sm:w-20">
                          {b.imageSrc ? (
                            <Image src={b.imageSrc} alt={b.name} fill className="object-cover" />
                          ) : (
                            <Glyph emoji={b.emoji} className="h-9 w-9" strokeWidth={1.5} />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="mb-1 block max-w-full truncate text-[10px] font-bold uppercase tracking-[0.06em] text-stone-400">
                            {b.badge}
                          </span>
                          <h3 className="truncate text-sm font-black text-white sm:text-base">{b.name}</h3>
                          <p className="mt-0.5 truncate text-[11px] text-stone-400 sm:text-xs">{b.subtitle}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          /* Khu đang mở */
          <div className="flex min-h-[calc(100vh-8.5rem)] flex-col sm:min-h-[calc(100vh-9rem)]">
            <div className="mb-5 flex flex-col items-start gap-3 border-b border-stone-300 pb-3 sm:flex-row sm:items-center sm:justify-between dark:border-stone-700">
              <button onClick={handleCloseBuilding} className={`${btnSecondary} px-3 py-1.5 text-xs`}>
                <ChevronLeft className="h-4 w-4" aria-hidden /> {t.worldMap.backToMap}
              </button>

              <span className="text-xs font-semibold leading-tight text-ink-muted">
                {format(t.worldMap.opening, { name: selected?.name ?? "" })}
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
              <div className="min-h-0 w-full flex-1 overflow-hidden text-ink">
                {selectedBuilding === "world-boss" && (
                  <WorldBossRaidWidget userId={user?.id || ""} userLevel={level} equipments={equippedGear} />
                )}
                {selectedBuilding === "capacity-lab" && (
                  <CapacitySizingWidget userId={user?.id || ""} />
                )}
                {selectedBuilding === "backbone-hub" && (
                  <BackboneRoutingWidget userId={user?.id || ""} />
                )}
                {selectedBuilding === "shop" && (
                  <CosmeticStore userId={user?.id || ""} onBack={handleCloseBuilding} />
                )}
                {selectedBuilding === "cards" && (
                  <TechCardCollection userId={user?.id || ""} />
                )}
                {selectedBuilding === "weekly-challenge" && (
                  <WeeklyChallengeWidget userId={user?.id || ""} />
                )}
                {selectedBuilding === "arcade" && (
                  <GameHubClient />
                )}
                {/* Năm toà nhà từng chỉ trỏ tạm về sảnh game / widget khác giờ có game
                    tình huống riêng theo chủ đề của toà (building-games.ts). */}
                {(SCENARIO_BUILDINGS as readonly string[]).includes(selectedBuilding) && (
                  <BuildingScenarioGame
                    key={selectedBuilding}
                    buildingId={selectedBuilding as ScenarioBuildingId}
                    userId={user?.id || ""}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
