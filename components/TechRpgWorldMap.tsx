"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { organicBuildingsOf, type OrganicBuilding } from "@/lib/rpg-buildings";
import { motion, animate, useMotionValue } from "framer-motion";
import Image from "next/image";
import { bossHpPercent } from "@/lib/world-boss";
import {
  CheckCircle2,
  ChevronRight,
  LocateFixed,
  MapPin,
  Minus,
  Newspaper,
  Plus,
  ArrowLeftRight,
  ChevronLeft,
  Coins,
  Construction,
  Cpu,
  Gamepad2,
  Gauge,
  HardDrive,
  Layers,
  Lock,
  Move,
  Network,
  Radio,
  Server,
  ShoppingBag,
  Sparkles,
  Swords,
  Unplug,
  CloudCog,
  type LucideIcon,
} from "lucide-react";
import { btnPrimary, btnSecondary, Sys } from "@/components/ui/system";
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
import SystemMapPanel from "@/components/games/SystemMapPanel";
import { computeSystemMap } from "@/lib/system-map";


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
  kingdom: "THCN://SYSTEM/OPS",
  building: (id: string) => `THCN://SYSTEM/${id.toUpperCase()}`,
};
/* i18n-ignore-end */

// Mỗi dịch vụ một icon vẽ (lucide), thay cho ảnh chụp thành phố: bản đồ là sơ
// đồ hạ tầng, không phải bưu thiếp. Khoá theo id công trình đã lưu.
const BUILDING_ICONS: Record<string, LucideIcon> = {
  "world-boss": Server,
  pvp: Swords,
  arcade: Gamepad2,
  "weekly-challenge": Radio,
  "capacity-lab": Gauge,
  cards: Layers,
  shop: ShoppingBag,
  "backbone-hub": Network,
  "silicon-bay": Sparkles,
  "cloud-capital": CloudCog,
  "resource-floor": Cpu,
  "data-haven": HardDrive,
  "singapore-dock": ArrowLeftRight,
};

// Bản đồ minh hoạ: toạ độ góc trên-trái của từng thẻ, tính theo % của khung
// vẽ CANVAS_W x CANVAS_H. Ba hàng bốn cột, lệch nhẹ cho giống một thành phố
// thay vì một bảng tính. Thứ tự ở đây cũng là số 01-12 in trên thẻ.
const CANVAS_W = 1500;
const CANVAS_H = 1080;
const CARD_W_PCT = 18.5;
const CARD_POS: Record<string, { x: number; y: number }> = {
  pvp: { x: 3, y: 10 },
  "world-boss": { x: 27.5, y: 5 },
  arcade: { x: 52.5, y: 9 },
  "weekly-challenge": { x: 77.5, y: 6 },
  cards: { x: 5, y: 40 },
  "capacity-lab": { x: 29, y: 43 },
  "backbone-hub": { x: 53, y: 39 },
  "silicon-bay": { x: 77, y: 42 },
  "cloud-capital": { x: 3, y: 72 },
  "resource-floor": { x: 27.5, y: 74 },
  "data-haven": { x: 52, y: 71 },
  "singapore-dock": { x: 77.5, y: 73 },
};
const MAP_ORDER = Object.keys(CARD_POS);

// Tuyến nối giữa các khu (theo cặp id) - mỗi tuyến có một mốc vàng ở giữa.
const ROUTES: [string, string][] = [
  ["pvp", "world-boss"], ["world-boss", "arcade"], ["arcade", "weekly-challenge"],
  ["pvp", "cards"], ["world-boss", "capacity-lab"], ["arcade", "backbone-hub"], ["weekly-challenge", "silicon-bay"],
  ["cards", "capacity-lab"], ["capacity-lab", "backbone-hub"], ["backbone-hub", "silicon-bay"],
  ["cards", "cloud-capital"], ["capacity-lab", "resource-floor"], ["backbone-hub", "data-haven"], ["silicon-bay", "singapore-dock"],
  ["cloud-capital", "resource-floor"], ["resource-floor", "data-haven"], ["data-haven", "singapore-dock"],
];

function cardCenter(id: string) {
  const p = CARD_POS[id] ?? { x: 50, y: 50 };
  return { x: p.x + CARD_W_PCT / 2, y: p.y + 9 };
}

// Avatar đứng ngay trên mép thẻ đang chọn.
const BUILDING_AVATAR_POSITIONS: Record<string, { x: number; y: number }> = Object.fromEntries(
  Object.entries(CARD_POS).map(([id, p]) => [id, { x: p.x + CARD_W_PCT / 2, y: Math.max(2, p.y - 1) }]),
);
BUILDING_AVATAR_POSITIONS.shop = { x: 50, y: 50 };

interface BossSummary {
  name: string;
  max_hp: number;
  current_hp: number;
}
interface BossLeader {
  userId?: string;
  totalDamage: number;
}

function BuildingIcon({ id, className }: { id: string; className: string }) {
  const Icon = BUILDING_ICONS[id] ?? Server;
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}

export default function TechRpgWorldMap() {
  const { t } = useI18n();
  // Danh sách địa điểm giờ mang chữ theo ngôn ngữ đang xem, nên nó không còn
  // là hằng số ở module scope được nữa.
  // Tên hiển thị theo ẩn dụ hệ thống (revampGame.buildings) phủ lên tên cũ;
  // id, cấp mở khoá và mọi trường cấu trúc giữ nguyên.
  const buildings = useMemo<OrganicBuilding[]>(
    () => organicBuildingsOf(t).map((b) => ({ ...b, ...(t.revampGame.buildings[b.id] ?? {}) })),
    [t],
  );
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
  const [progressReady, setProgressReady] = useState(false);
  const systemStatus = useMemo(() => computeSystemMap(completedLessonIds), [completedLessonIds]);

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
            setProgressReady(true);
          });
      } else {
        setProgressReady(true);
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
      toast.success(t.revampGame.services.connected);
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
        toast.info(format(t.revampGame.services.underConstruction, { name: targetBuilding.name, level: reqLevel }));
        return;
      }

      if (level < reqLevel) {
        toast.error(format(t.revampGame.services.levelLocked, { level: reqLevel }));
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

  // Bản tin sự cố: số thật từ /api/world-boss. Bảng xếp hạng giả ("mock-")
  // mà route trả khi chưa có log thì không được đếm là người đã ra đòn.
  const [boss, setBoss] = useState<BossSummary | null>(null);
  const [leaders, setLeaders] = useState<BossLeader[]>([]);
  const [bossReady, setBossReady] = useState(false);
  useEffect(() => {
    let alive = true;
    fetch("/api/world-boss")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive || !data) return;
        if (data.boss) setBoss({ name: data.boss.name, max_hp: data.boss.max_hp, current_hp: data.boss.current_hp });
        const rows = (data.leaderboard ?? []) as BossLeader[];
        setLeaders(rows.filter((r) => !String(r.userId ?? "").startsWith("mock-")));
      })
      .catch(() => undefined)
      .finally(() => alive && setBossReady(true));
    return () => {
      alive = false;
    };
  }, []);
  const bossPercent = boss ? bossHpPercent(boss.current_hp, boss.max_hp) : 0;
  const myDamage = user?.id ? leaders.find((l) => l.userId === user.id)?.totalDamage ?? 0 : 0;

  const tickerItems: string[] = bossReady
    ? [
        ...(boss
          ? [format(t.revampGame.ticker.bossHp, { name: boss.name, current: boss.current_hp.toLocaleString(), max: boss.max_hp.toLocaleString() })]
          : []),
        format(t.revampGame.ticker.raiders, { count: leaders.length }),
        myDamage > 0 ? format(t.revampGame.ticker.yourDamage, { damage: myDamage.toLocaleString() }) : t.revampGame.ticker.noDamage,
        format(t.revampGame.ticker.nodes, { online: systemStatus.online, total: systemStatus.nodes.length }),
        format(t.revampGame.ticker.lessons, { done: systemStatus.lessonsDone, total: systemStatus.lessonsTotal }),
        ...(systemStatus.next ? [format(t.revampGame.ticker.next, { name: t.revampGame.systemMap.nodes[systemStatus.next.key].name })] : []),
      ]
    : [t.revampGame.ticker.loading];

  // Pan + zoom của bản đồ minh hoạ.
  const [zoom, setZoom] = useState(0.8);
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  const changeZoom = (delta: number) => setZoom((z) => Math.min(1.4, Math.max(0.5, Math.round((z + delta) * 10) / 10)));
  const recenter = () => {
    void animate(panX, 0, { type: "spring", stiffness: 120, damping: 20 });
    void animate(panY, 0, { type: "spring", stiffness: 120, damping: 20 });
    setZoom(0.8);
  };
  const halfW = (CANVAS_W * zoom) / 2;
  const halfH = (CANVAS_H * zoom) / 2;

  const cardProps = (id: string) => {
    const b = buildings.find((x) => x.id === id)!;
    const reqLevel = b.minLevel ?? getRequiredLevelForBuilding(b.id);
    return {
      building: b,
      index: MAP_ORDER.indexOf(id) + 1,
      discovered: discoveredBuildings.includes(id),
      locked: level < reqLevel,
      reqLevel,
      bossPercent: id === "world-boss" && boss ? bossPercent : null,
      onOpen: () => handleBuildingClick(id),
    };
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-page p-3 font-sans text-ink sm:p-5 dark:bg-stone-950">
      {/* Thanh trạng thái: avatar + cấp, tên hệ thống, online, số dư vàng. */}
      <div className="relative z-30 mx-auto mb-3 max-w-6xl overflow-hidden rounded-lg border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900">
        <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 sm:p-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative shrink-0">
              <div className="rounded-full border-2 border-brand-500 bg-white p-0.5">
                <TechCharacterAvatar size="sm" level={level} equipments={equippedGear} />
              </div>
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xs bg-brand-600 px-1 font-mono text-[9px] font-medium tabular-nums text-white">
                {format(t.worldMap.levelShort, { level })}
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-sm font-black text-ink-max sm:text-base">{t.revampGame.hud.title}</h2>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-cyan-300 bg-cyan-50 px-1.5 py-px text-[10px] font-bold text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 thcn-blink" aria-hidden />
                  {t.worldMap.online}
                </span>
              </div>
              <Sys className="block truncate text-ink-muted">{selected ? SYS.building(selected.id) : SYS.kingdom}</Sys>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-2.5 py-1.5 dark:border-amber-800 dark:bg-amber-950">
              <Coins className="h-4 w-4 text-warn" aria-hidden />
              <div>
                <p className="text-[10px] font-semibold leading-none text-ink-muted">{t.revampGame.hud.goldBalance}</p>
                <p className="mt-0.5 font-mono text-sm font-medium tabular-nums leading-tight text-warn-ink">
                  {format(t.revampGame.hud.coins, { count: coins.toLocaleString() })}
                </p>
              </div>
            </div>
            <span className="hidden items-center gap-1 rounded-md border border-cyan-300 px-2 py-1.5 text-[11px] font-bold text-cyan-700 sm:inline-flex dark:border-cyan-800 dark:text-cyan-300">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
              {t.revampGame.hud.ready}
            </span>
            <button onClick={() => handleBuildingClick("shop")} className={`${btnPrimary} px-3 py-1.5 text-xs`} title={t.revampGame.hud.shopTitle}>
              <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">{t.revampGame.hud.shopShort}</span>
            </button>
            <button onClick={() => handleBuildingClick("cards")} className={`${btnSecondary} px-3 py-1.5 text-xs`} title={t.revampGame.hud.cardsTitle}>
              <Layers className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">{t.revampGame.hud.cardsShort}</span>
            </button>
          </div>
        </div>

        {/* Ticker: chỉ số thật - boss, người ra đòn, sát thương của bạn, node online. */}
        <div className="flex items-center overflow-hidden border-t border-stone-800 bg-stone-950 text-xs">
          <span className="z-10 inline-flex shrink-0 items-center gap-1.5 bg-rose-600 px-3 py-1.5 font-black tracking-[0.06em] text-white">
            <Newspaper className="h-3.5 w-3.5" aria-hidden />
            {t.revampGame.ticker.label}
          </span>
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div className="thcn-marquee flex w-max whitespace-nowrap py-1.5">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                  {tickerItems.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 px-5 font-semibold text-stone-200">
                      <span className="h-1.5 w-1.5 rotate-45 bg-amber-400" aria-hidden />
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {!selectedBuilding ? (
          <>
          {/* Tiến độ học thật (user_progress) thành các node lên mạng. */}
          <SystemMapPanel
            status={systemStatus}
            ready={progressReady}
            onOpenIncident={() => handleBuildingClick("world-boss")}
          />

          {/* Mobile: danh sách thẻ có ảnh, nhóm theo khu. */}
          <div className="space-y-5 md:hidden">
            {[...new Set(MAP_ORDER.map((id) => buildings.find((b) => b.id === id)?.badge ?? ""))].map((districtBadge) => (
              <div key={districtBadge} className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-ink-muted">{districtBadge}</span>
                  <div className="h-px flex-1 bg-line" />
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {MAP_ORDER.filter((id) => buildings.find((b) => b.id === id)?.badge === districtBadge).map((id) => (
                    <MapBuildingCard key={id} {...cardProps(id)} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: bản đồ thành phố minh hoạ, kéo để di chuyển, nút zoom. */}
          <div className="relative hidden h-[760px] overflow-hidden rounded-lg border border-stone-800 bg-stone-950 md:block">
            <div className="absolute left-3 top-3 z-40 flex items-center gap-2 rounded-md border border-white/15 bg-stone-950/85 px-3 py-1.5 text-xs text-stone-200 backdrop-blur">
              <Move className="h-3.5 w-3.5 text-stone-400" aria-hidden />
              <span className="font-bold text-white">{t.revampGame.services.heading}</span>
              <span className="hidden text-stone-400 lg:inline">{t.revampGame.services.hint}</span>
            </div>
            <div className="absolute bottom-3 right-3 z-40 flex items-center gap-1 rounded-md border border-white/15 bg-stone-950/85 p-1 text-white backdrop-blur">
              <button type="button" onClick={() => changeZoom(-0.1)} className="flex h-7 w-7 items-center justify-center rounded-sm hover:bg-white/10" title={t.revampGame.map.zoomOut} aria-label={t.revampGame.map.zoomOut}>
                <Minus className="h-4 w-4" aria-hidden />
              </button>
              <span className="w-12 text-center font-mono text-xs tabular-nums">{Math.round(zoom * 100)}%</span>
              <button type="button" onClick={() => changeZoom(0.1)} className="flex h-7 w-7 items-center justify-center rounded-sm hover:bg-white/10" title={t.revampGame.map.zoomIn} aria-label={t.revampGame.map.zoomIn}>
                <Plus className="h-4 w-4" aria-hidden />
              </button>
              <button type="button" onClick={recenter} className="ml-1 inline-flex items-center gap-1 rounded-sm bg-brand-600 px-2 py-1 text-xs font-bold hover:bg-brand-500">
                <LocateFixed className="h-3.5 w-3.5" aria-hidden />
                {t.revampGame.map.center}
              </button>
            </div>

            <motion.div
              drag
              dragConstraints={{ left: -halfW, right: halfW, top: -halfH, bottom: halfH }}
              dragElastic={0.06}
              dragMomentum={false}
              style={{ x: panX, y: panY, touchAction: "none" }}
              className="absolute inset-0 cursor-grab select-none active:cursor-grabbing"
            >
              <motion.div
                animate={{ scale: zoom }}
                transition={{ type: "spring", stiffness: 160, damping: 24 }}
                className="absolute left-1/2 top-1/2"
                style={{ width: CANVAS_W, height: CANVAS_H, marginLeft: -CANVAS_W / 2, marginTop: -CANVAS_H / 2 }}
              >
                {/* Nền: skyline thành phố công nghệ, phủ một lớp lưới mạng mờ. */}
                <Image src="/rpg/city_skyline.jpg" alt="" fill sizes="1500px" className="pointer-events-none object-cover" priority draggable={false} />
                <Image src="/saigon-skyline.jpg" alt="" fill sizes="1500px" className="pointer-events-none object-cover opacity-30 mix-blend-screen" draggable={false} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-stone-950/55 via-stone-950/25 to-stone-950/70" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(125,211,252,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(125,211,252,0.08)_1px,transparent_1px)] [background-size:60px_60px]" />

                {/* Tuyến cáp giữa các khu. */}
                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <g fill="none" stroke="rgb(56 189 248 / 0.55)" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round">
                    {ROUTES.map(([a, b]) => {
                      const p = cardCenter(a);
                      const q = cardCenter(b);
                      return <line key={`${a}-${b}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} vectorEffect="non-scaling-stroke" />;
                    })}
                  </g>
                </svg>

                {/* Mốc vàng giữa các khu. */}
                {ROUTES.map(([a, b]) => {
                  const p = cardCenter(a);
                  const q = cardCenter(b);
                  return (
                    <span
                      key={`m-${a}-${b}`}
                      className="pointer-events-none absolute -ml-2 -mt-2 flex h-4 w-4 rotate-45 items-center justify-center rounded-xs border-2 border-amber-200 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.7)]"
                      style={{ left: `${(p.x + q.x) / 2}%`, top: `${(p.y + q.y) / 2}%` }}
                      aria-hidden
                    />
                  );
                })}

                {MAP_ORDER.map((id) => (
                  <div
                    key={id}
                    className="absolute z-20"
                    style={{ left: `${CARD_POS[id].x}%`, top: `${CARD_POS[id].y}%`, width: `${CARD_W_PCT}%` }}
                    onMouseEnter={() => setAvatarPos(BUILDING_AVATAR_POSITIONS[id])}
                  >
                    <MapBuildingCard {...cardProps(id)} />
                  </div>
                ))}

                {/* Nhân vật: "VỊ TRÍ CỦA BẠN". */}
                <motion.div
                  className="pointer-events-none absolute z-30 -ml-6 -mt-16"
                  animate={{ left: `${avatarPos.x}%`, top: `${avatarPos.y}%` }}
                  transition={{ type: "spring", stiffness: 85, damping: 15 }}
                >
                  <div className="flex flex-col items-center">
                    <span className="mb-1 whitespace-nowrap rounded-sm bg-brand-600 px-1.5 py-0.5 text-[10px] font-black tracking-[0.06em] text-white shadow">
                      {t.revampGame.map.youAreHere}
                    </span>
                    <div className={`relative rounded-full border-2 bg-white p-0.5 shadow-lg ${isMoving ? "border-amber-400" : "border-brand-500"}`}>
                      <TechCharacterAvatar size="sm" level={level} equipments={equippedGear} />
                      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xs bg-brand-600 px-1 font-mono text-[8px] font-medium tabular-nums text-white">
                        {format(t.worldMap.levelShort, { level })}
                      </span>
                    </div>
                    <MapPin className="-mt-0.5 h-4 w-4 text-brand-400" aria-hidden />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Kho thiết bị: thẻ nổi cố định góc phải trên. */}
            <button
              type="button"
              onClick={() => handleBuildingClick("shop")}
              className="absolute right-3 top-3 z-40 flex w-[240px] items-center gap-3 rounded-md border border-white/15 bg-stone-950/85 p-2.5 text-left backdrop-blur transition-colors hover:border-brand-400"
              title={t.revampGame.services.gearOpenTitle}
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-sm border border-white/20">
                <Image src="/rpg/city_skyline.jpg" alt="" fill sizes="44px" className="object-cover" />
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-xs bg-brand-600 px-0.5 font-mono text-[9px] font-medium tabular-nums text-white">
                  {Object.keys(equippedGear).length}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold text-stone-400">{t.revampGame.services.gearEyebrow}</p>
                <h3 className="truncate text-sm font-black text-white">{t.revampGame.services.gearTitle}</h3>
                <p className="truncate text-[11px] text-stone-400">{format(t.revampGame.services.gearSub, { count: Object.keys(equippedGear).length })}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-stone-400" aria-hidden />
            </button>
          </div>
          </>
        ) : (
          /* Khu đang mở */
          <div className="flex min-h-[calc(100vh-8.5rem)] flex-col sm:min-h-[calc(100vh-9rem)]">
            <div className="mb-5 flex flex-col items-start gap-3 border-b border-stone-300 pb-3 sm:flex-row sm:items-center sm:justify-between dark:border-stone-700">
              <button onClick={handleCloseBuilding} className={`${btnSecondary} px-3 py-1.5 text-xs`}>
                <ChevronLeft className="h-4 w-4" aria-hidden /> {t.revampGame.services.backToMap}
              </button>

              <span className="text-xs font-semibold leading-tight text-ink-muted">
                {format(t.revampGame.services.opening, { name: selected?.name ?? "" })}
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

/** Thẻ công trình trên bản đồ: ảnh bên trái, số thứ tự, chip khu, tên, phụ đề
 *  màu, mô tả hai dòng và nút hành động. Chưa kết nối = ảnh mờ + khoá. */
function MapBuildingCard({
  building: b,
  index,
  discovered,
  locked,
  reqLevel,
  bossPercent,
  onOpen,
}: {
  building: OrganicBuilding;
  index: number;
  discovered: boolean;
  locked: boolean;
  reqLevel: number;
  bossPercent: number | null;
  onOpen: () => void;
}) {
  const { t } = useI18n();
  const isBoss = b.id === "world-boss";
  const copy = t.revampGame.mapCards[b.id];
  const blocked = !discovered || b.isUnderConstruction || locked;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className={`group relative flex w-full cursor-pointer touch-manipulation gap-3 overflow-hidden rounded-lg border bg-white/95 p-2.5 text-left shadow-lg transition-all hover:-translate-y-0.5 dark:bg-stone-900/95 ${
        isBoss ? "border-rose-400 ring-2 ring-rose-500/30 dark:border-rose-700" : "border-white/60 hover:border-brand-400 dark:border-stone-700"
      }`}
    >
      <div className="relative h-[92px] w-[84px] shrink-0 overflow-hidden rounded-md bg-stone-900">
        {b.imageSrc ? (
          <Image
            src={b.imageSrc}
            alt={b.name}
            fill
            sizes="84px"
            draggable={false}
            className={`object-cover transition-transform group-hover:scale-105 ${discovered ? "" : "blur-[2px] grayscale"}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-stone-300">
            <BuildingIcon id={b.id} className="h-8 w-8" />
          </div>
        )}
        <span className="absolute left-1 top-1 rounded-xs bg-stone-950/80 px-1 font-mono text-[10px] font-bold tabular-nums text-white">
          {String(index).padStart(2, "0")}
        </span>
        {blocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-950/55">
            {!discovered ? <Unplug className="h-6 w-6 text-white" aria-hidden /> : b.isUnderConstruction ? <Construction className="h-6 w-6 text-white" aria-hidden /> : <Lock className="h-5 w-5 text-white" aria-hidden />}
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`truncate rounded-xs px-1.5 py-px text-[9px] font-black tracking-[0.06em] ${
              isBoss ? "bg-rose-600 text-white" : "bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300"
            }`}
          >
            {b.badge}
          </span>
          {b.id === "weekly-challenge" && (
            <span className="rounded-xs border border-cyan-400 px-1 text-[9px] font-bold text-cyan-600 dark:text-cyan-400">{t.revampGame.hud.live}</span>
          )}
        </div>
        <h3 className="mt-1 truncate text-sm font-black text-ink-max">{b.name}</h3>
        {copy && <p className={`truncate text-[11px] font-bold ${isBoss ? "text-alert" : "text-accent"}`}>{copy.tagline}</p>}
        <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-ink-muted">{b.subtitle}</p>

        {isBoss && bossPercent !== null && discovered && (
          <div className="mt-1.5">
            <div className="h-1.5 overflow-hidden rounded-full bg-rose-100 dark:bg-rose-950">
              <div className="h-full bg-rose-600" style={{ width: `${bossPercent}%` }} />
            </div>
            <p className="mt-0.5 font-mono text-[9px] font-medium tabular-nums text-alert">{format(t.revampGame.map.bossHp, { percent: bossPercent })}</p>
          </div>
        )}

        <div className="mt-auto pt-1.5">
          {!discovered ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-warn-ink">
              <Coins className="h-3.5 w-3.5 text-warn" aria-hidden />
              {t.revampGame.services.connectHint}
            </span>
          ) : b.isUnderConstruction ? (
            <span className="text-[11px] font-bold text-ink-muted">{format(t.revampGame.services.lockedLevel, { level: reqLevel })}</span>
          ) : locked ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-ink-muted">
              <Lock className="h-3 w-3" aria-hidden />
              {format(t.revampGame.services.lockedShort, { level: reqLevel })}
            </span>
          ) : (
            <span
              className={`inline-flex items-center gap-0.5 rounded-sm px-2 py-1 text-[11px] font-black text-white ${
                isBoss ? "bg-rose-600 group-hover:bg-rose-500" : "bg-brand-600 group-hover:bg-brand-500"
              }`}
            >
              {copy?.cta}
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
